# Launching the Academy for a new client (white-label guide)

One codebase → one parallel platform per client. Each client gets its own
URL, its own database (users, progress, evidence fully separated), and its
own branding — all from this single repository.

## How it works

- `src/config/clients.js` holds one config block per client (name, course
  title, Code of Conduct details/PDF).
- The active client is chosen **at build time** by the `VITE_CLIENT`
  environment variable. No env var = `hitech`.
- Each client deployment is a **separate Vercel project** pointing at this
  same GitHub repo, and a **separate Supabase project** — so client data can
  never mix.

## Launch checklist for a new client (~30 minutes)

1. **Add the client config** — duplicate a block in
   `src/config/clients.js` (key, `clientShort`, `clientLegal`, course title,
   Code of Conduct ref/owner). Commit & push.

2. **Client documents** — drop their signed Code of Conduct PDF into
   `public/docs/` and set its path in the config (`codeOfConduct.pdf`).
   No PDF yet? Set `pdf: null` — the reading works, download buttons hide.

3. **New Supabase project** (supabase.com → New project, free tier):
   - SQL Editor → run ALL of `supabase/schema.sql` (tables, security,
     sign-up hook, discussion, role-hardening).
   - Authentication → URL Configuration → add
     `https://<their-deployment>.vercel.app/reset` to Redirect URLs.
   - Authentication → Providers → Email → enable "Confirm email".

4. **New Vercel project** (vercel.com → Add New → Project → import this
   repo again) with three environment variables:
   - `VITE_CLIENT` = the config key (e.g. `acme`)
   - `VITE_SUPABASE_URL` = the new project's URL
   - `VITE_SUPABASE_ANON_KEY` = the new project's anon key
   Deploy. Optionally attach a custom domain (e.g. `acme.skykapital.com`).

5. **Smoke test** — sign up, check the client name on the login page &
   Code of Conduct, complete one lesson section, run one quiz question.

## What is shared vs. per-client (today)

| Shared (same for all clients)            | Per-client                        |
|-------------------------------------------|-----------------------------------|
| The 6 ESG modules, quizzes, games, capstone| Name/branding across the platform |
| Photos, videos, library guides             | Code of Conduct (PDF + details)   |
| Platform features & security               | Users, progress, evidence (own DB)|

Deeper per-client content (their own policies as extra modules, their legal
jurisdiction in M2, their logo image) = extend the client config the same
way — ask Claude to "add X to the client config".
