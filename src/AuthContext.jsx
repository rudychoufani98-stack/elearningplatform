import { createContext, useContext, useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "./lib/supabase.js";

// Session + profile state for the whole app. When Supabase isn't configured
// (no env vars), auth is disabled and the app runs in local demo mode.
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(isSupabaseConfigured);

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session ?? null);
      setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  // Load the user's profile row (name + role) once signed in.
  useEffect(() => {
    if (!session?.user) {
      setProfile(null);
      return;
    }
    supabase
      .from("profiles")
      .select("*")
      .eq("id", session.user.id)
      .single()
      .then(({ data }) => setProfile(data ?? null));
  }, [session?.user?.id]);

  async function signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    // Sign-in history: one row per successful login (admin console reads it).
    if (!error && data?.user?.id) {
      supabase.from("login_events").insert({ user_id: data.user.id }).then(() => {});
    }
    return error?.message ?? null;
  }
  async function signUp(email, password, fullName) {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });
    return error?.message ?? null;
  }
  async function signOut() {
    await supabase.auth.signOut();
  }

  const value = {
    enabled: isSupabaseConfigured,
    loading,
    session,
    user: session?.user ?? null,
    profile,
    signIn,
    signUp,
    signOut,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
