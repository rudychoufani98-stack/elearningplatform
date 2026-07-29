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
