-- ============================================================================
-- Skykapital Academy — Supabase schema
-- Paste this whole file into the Supabase SQL Editor (see SETUP-SUPABASE.md)
-- and run it once. It creates the tables, security rules and the sign-up hook.
--
-- Design note: module & document CONTENT stays in the app code (data.js) for
-- now. This schema stores only per-learner RECORDS (progress, quiz attempts,
-- signatures). Moving content into the DB (for an admin editor) is a later step.
-- ============================================================================

-- 1) PROFILES ---------------------------------------------------------------
-- One row per user, linked to Supabase Auth. Holds name + role.
create table if not exists public.profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  full_name   text,
  role        text not null default 'learner'    -- 'learner' | 'manager' | 'admin'
              check (role in ('learner', 'manager', 'admin')),
  created_at  timestamptz not null default now()
);

-- 2) MODULE PROGRESS --------------------------------------------------------
-- Current status/score for each learner × module (module_id is the code key
-- from data.js, e.g. 'lm4'). One row per learner per module.
create table if not exists public.module_progress (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references public.profiles (id) on delete cascade,
  module_id   text not null,
  status      text not null default 'not_started'
              check (status in ('not_started', 'in_progress', 'completed')),
  earned      int,
  total       int,
  updated_at  timestamptz not null default now(),
  unique (user_id, module_id)
);

-- 3) QUIZ ATTEMPTS ----------------------------------------------------------
-- Full history of every quiz submission (for audit / analytics).
create table if not exists public.quiz_attempts (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references public.profiles (id) on delete cascade,
  module_id   text not null,
  correct     int not null,
  total       int not null,
  score       int not null,          -- points awarded
  created_at  timestamptz not null default now()
);

-- 4) ACKNOWLEDGEMENTS -------------------------------------------------------
-- Read-and-agree e-signatures for documents (e.g. the Code of Conduct).
create table if not exists public.acknowledgements (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references public.profiles (id) on delete cascade,
  doc_id       text not null,
  doc_title    text not null,
  signed_name  text not null,
  signed_at    timestamptz not null default now(),
  unique (user_id, doc_id)
);

-- ============================================================================
-- ROW LEVEL SECURITY  — learners see only their own data; managers/admins all.
-- ============================================================================
alter table public.profiles          enable row level security;
alter table public.module_progress   enable row level security;
alter table public.quiz_attempts     enable row level security;
alter table public.acknowledgements  enable row level security;

-- Helper: is the current user a manager or admin?
create or replace function public.is_staff()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role in ('manager', 'admin')
  );
$$;

-- PROFILES: read/update your own; staff can read all.
drop policy if exists profiles_self_select on public.profiles;
create policy profiles_self_select on public.profiles
  for select using (id = auth.uid() or public.is_staff());
drop policy if exists profiles_self_update on public.profiles;
create policy profiles_self_update on public.profiles
  for update using (id = auth.uid());

-- Generic owner policy applied to the three record tables.
do $$
declare t text;
begin
  foreach t in array array['module_progress', 'quiz_attempts', 'acknowledgements']
  loop
    execute format('drop policy if exists %I_owner_all on public.%I;', t, t);
    execute format($f$
      create policy %I_owner_all on public.%I
        for all
        using (user_id = auth.uid() or public.is_staff())
        with check (user_id = auth.uid());
    $f$, t, t);
  end loop;
end $$;

-- ============================================================================
-- SIGN-UP HOOK  — auto-create a profile row when a new auth user is created.
-- ============================================================================
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', new.email));
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 5) DISCUSSION COMMENTS ------------------------------------------------------
-- Per-module workshop discussion. Signed-in learners read all, post as themselves.
create table if not exists public.comments (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references public.profiles (id) on delete cascade,
  module_id   text not null,
  author_name text not null,
  body        text not null check (char_length(body) between 1 and 2000),
  created_at  timestamptz not null default now()
);
alter table public.comments enable row level security;
drop policy if exists comments_read_all on public.comments;
create policy comments_read_all on public.comments
  for select using (auth.role() = 'authenticated');
drop policy if exists comments_insert_own on public.comments;
create policy comments_insert_own on public.comments
  for insert with check (user_id = auth.uid());
drop policy if exists comments_delete_own on public.comments;
create policy comments_delete_own on public.comments
  for delete using (user_id = auth.uid() or public.is_staff());

-- ============================================================================
-- SECURITY HARDENING (run once) — prevent role self-escalation.
-- Without this, a user could UPDATE their own profiles.role to 'admin' via
-- the REST API. Column-level grants limit self-service to full_name only.
-- ============================================================================
revoke update on public.profiles from authenticated, anon;
grant update (full_name) on public.profiles to authenticated;

-- ============================================================================
-- ADMIN CONSOLE (run once) — client documents + role management RPC + storage.
-- ============================================================================
create table if not exists public.client_documents (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  note        text,
  category    text not null default 'Other',
  path        text not null,
  url         text not null,
  created_at  timestamptz not null default now()
);
alter table public.client_documents enable row level security;
drop policy if exists client_docs_read on public.client_documents;
create policy client_docs_read on public.client_documents
  for select using (auth.role() = 'authenticated');
drop policy if exists client_docs_staff_write on public.client_documents;
create policy client_docs_staff_write on public.client_documents
  for all using (public.is_staff()) with check (public.is_staff());

-- Role changes go through this admin-only function (direct updates are revoked).
create or replace function public.set_user_role(target uuid, new_role text)
returns void language plpgsql security definer set search_path = public as $$
begin
  if not exists (select 1 from public.profiles where id = auth.uid() and role = 'admin') then
    raise exception 'Only the administrator can change roles.';
  end if;
  if new_role not in ('learner','manager','admin') then
    raise exception 'Invalid role.';
  end if;
  update public.profiles set role = new_role where id = target;
end;
$$;

-- Storage bucket for the client documents (public read; staff write).
insert into storage.buckets (id, name, public)
values ('client-docs', 'client-docs', true)
on conflict (id) do nothing;
drop policy if exists client_docs_upload on storage.objects;
create policy client_docs_upload on storage.objects
  for insert to authenticated
  with check (bucket_id = 'client-docs' and public.is_staff());
drop policy if exists client_docs_delete on storage.objects;
create policy client_docs_delete on storage.objects
  for delete to authenticated
  using (bucket_id = 'client-docs' and public.is_staff());
