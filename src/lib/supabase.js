import { createClient } from "@supabase/supabase-js";

// Reads config from a local .env file (see .env.example). The anon key is
// safe to ship in the frontend — it's public by design and access is enforced
// by Row Level Security in the database.
const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

// True once the two env vars are set. Until then the app keeps running in its
// current local (localStorage) mode, so nothing breaks before setup is done.
export const isSupabaseConfigured = Boolean(url && key);

export const supabase = isSupabaseConfigured ? createClient(url, key) : null;

// Creates a learner account from the admin console WITHOUT an Edge Function.
// Uses a transient client so the admin's own session is untouched.
// Requires "Allow new users to sign up" ON in Supabase Auth settings;
// accounts are usable immediately when "Confirm email" is OFF.
export async function adminCreateAccount(email, password, fullName) {
  if (!isSupabaseConfigured) return { error: "Platform not configured." };
  const { createClient } = await import("@supabase/supabase-js");
  const temp = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data, error } = await temp.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName } },
  });
  if (error) return { error: error.message };
  // Supabase quirk: signing up an EXISTING email silently succeeds but
  // changes nothing (the returned user has no identities). Without this
  // check the admin would hand out a password that does not work.
  if (data.user && (data.user.identities?.length ?? 0) === 0) {
    return {
      error:
        "An account with this email ALREADY EXISTS — the shown password would not work. Delete the old account first (Supabase dashboard → Authentication → Users → delete), then create it again here.",
    };
  }
  // "Confirm email" ON also breaks sign-in: the account exists but can't log
  // in until the email is confirmed — surface that instead of a fake success.
  if (data.user && !data.session) {
    return {
      error:
        'Account created BUT "Confirm email" is ON in Supabase (Authentication → Sign In / Up) — the person cannot sign in until you turn it OFF.',
    };
  }
  return { id: data.user?.id ?? null };
}
