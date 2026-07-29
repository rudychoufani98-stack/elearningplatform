# Connecting Skykapital Academy to Supabase (Track B)

This turns the prototype into a real platform: each person logs in, and their
progress, quiz results and signatures are stored centrally (not just in one
browser). Follow these steps once — it takes ~10 minutes.

## 1. Create a free Supabase project
1. Go to **https://supabase.com** and sign up (free tier is fine).
2. Click **New project**. Give it a name (e.g. `skykapital-academy`), set a
   database password (save it somewhere), pick a region near your users.
3. Wait ~2 minutes for it to finish provisioning.

## 2. Create the database tables
1. In your project, open **SQL Editor** (left sidebar) → **New query**.
2. Open the file **`supabase/schema.sql`** from this project, copy everything,
   paste it into the editor, and click **Run**.
3. You should see "Success". This creates the tables, security rules and the
   sign-up hook.

## 3. Turn on email login
1. Go to **Authentication → Providers → Email**.
2. Make sure **Email** is enabled. For easy testing, you can turn **"Confirm
   email"** OFF for now (turn it back on before real use).

## 4. Get your API keys
1. Go to **Project Settings → API**.
2. Copy the **Project URL** and the **anon public** key.

## 5. Add the keys to the app
1. In this project, copy `.env.example` to a new file named **`.env`**.
2. Paste your values:
   ```
   VITE_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```
3. Save. (The `.env` file is git-ignored, so keys aren't committed.)

## 6. Tell me it's ready
Send me a message once steps 1–5 are done (you can paste the **Project URL**
and the **anon** key — the anon key is meant to be public and is protected by
the database's Row Level Security). Then I'll:
- add a **login / sign-up screen**,
- switch the app from browser storage to your database,
- make the first person an **admin**, and
- build the **admin** (manage content) and **manager reporting / evidence
  export** views.

> Security note: the **anon key is safe to expose** in a frontend app — that's
> how Supabase is designed. The keys you must NEVER share are the `service_role`
> key and your database password. I will never ask for those.
