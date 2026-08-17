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
  return { id: data.user?.id ?? null };
}
