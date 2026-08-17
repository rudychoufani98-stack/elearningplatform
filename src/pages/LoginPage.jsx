import { useState } from "react";
import Logo from "../components/Logo.jsx";
import MaterialIcon from "../components/MaterialIcon.jsx";
import { useAuth } from "../AuthContext.jsx";
import { supabase, isSupabaseConfigured } from "../lib/supabase.js";
import { platform, course } from "../data.js";

// Branded sign-in / sign-up screen shown before anything else when auth is on.
export default function LoginPage() {
  const { signIn, signUp } = useAuth();
  // Public sign-up is disabled: accounts are created by the Skykapital
  // administrator for each client company. Learners only sign in.
  const mode = "signin";
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState(null);
  const [notice, setNotice] = useState(null);
  const [busy, setBusy] = useState(false);
  const [showPw, setShowPw] = useState(false);
  // Failed-attempt lockout is tracked PER ACCOUNT (email), not per device.
  const [failCounts, setFailCounts] = useState({});
  const [locks, setLocks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("skk-login-locks") || "{}");
    } catch {
      return {};
    }
  });
  function lockKey() {
    return email.trim().toLowerCase();
  }
  function saveLocks(next) {
    setLocks(next);
    try {
      localStorage.setItem("skk-login-locks", JSON.stringify(next));
    } catch {
      /* ignore */
    }
  }

  async function forgotPassword() {
    setError(null);
    setNotice(null);
    if (!email.trim())
      return setError("Type your email above first, then click Forgot password.");
    if (!isSupabaseConfigured) return;
    const { error: err } = await supabase.auth.resetPasswordForEmail(
      email.trim(),
      { redirectTo: window.location.origin + "/reset" }
    );
    if (err) return setError(err.message);
    setNotice("Reset link sent — check your inbox (and spam folder).");
  }

  async function submit(e) {
    e.preventDefault();
    setError(null);
    setNotice(null);
    const lockedUntil = locks[lockKey()] || 0;
    if (mode === "signin" && Date.now() < lockedUntil)
      return setError(
        `Too many failed attempts for this account. Try again in ${Math.ceil((lockedUntil - Date.now()) / 60000)} minute(s).`
      );
    if (mode === "signup" && fullName.trim().length < 2)
      return setError("Please enter your full name.");
    if (mode === "signup") {
      if (password.length < 10)
        return setError("Password must be at least 10 characters.");
      if (!/[a-zA-Z]/.test(password) || !/[0-9]/.test(password))
        return setError("Password must contain both letters and numbers.");
      if (/^(password|azerty|qwerty|12345|admin)/i.test(password))
        return setError("That password is too common — pick something unique.");
      if (email && password.toLowerCase().includes(email.split("@")[0].toLowerCase()))
        return setError("Password must not contain your email name.");
    }
    if (mode === "signup" && password !== confirm)
      return setError("Passwords do not match.");
    setBusy(true);
    const err =
      mode === "signin"
        ? await signIn(email.trim(), password)
        : await signUp(email.trim(), password, fullName.trim());
    setBusy(false);
    if (err) {
      if (mode === "signin") {
        const k = lockKey();
        const n = (failCounts[k] || 0) + 1;
        if (n >= 5) {
          saveLocks({ ...locks, [k]: Date.now() + 2 * 60 * 1000 });
          setFailCounts({ ...failCounts, [k]: 0 });
          return setError("Too many failed attempts — this account is locked for 2 minutes.");
        }
        setFailCounts({ ...failCounts, [k]: n });
        return setError(`${err} (${5 - n} attempts left before a temporary lock)`);
      }
      return setError(err);
    }
    {
      const k = lockKey();
      if (failCounts[k] || locks[k]) {
        setFailCounts({ ...failCounts, [k]: 0 });
        const nl = { ...locks };
        delete nl[k];
        saveLocks(nl);
      }
    }
    if (mode === "signup")
      setNotice(
        "Account created. If email confirmation is enabled, check your inbox — otherwise you are now signed in."
      );
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-surface px-margin-mobile py-stack-lg">
      {/* Backdrop */}
      <img
        src="/images/course-hero.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#0d1c32]/95 via-[#0d1c32]/85 to-[#1c3a63]/80" />

      <div className="relative grid w-full max-w-4xl overflow-hidden rounded-2xl shadow-2xl md:grid-cols-2">
        {/* Left: brand panel */}
        <div className="hidden flex-col justify-between bg-white/5 p-stack-lg text-white backdrop-blur-sm md:flex">
          <div className="flex items-center gap-2.5">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
              <Logo className="h-7 w-7 text-white" />
            </span>
            <span className="text-headline-md font-bold">{platform.brand}</span>
          </div>
          <h1 className="text-headline-lg leading-tight">{course.title}</h1>
          <p className="text-caption text-white/60">{platform.center}</p>
        </div>

        {/* Right: the form */}
        <div className="bg-surface-container-lowest p-stack-lg md:p-12">
          <div className="mb-stack-md flex items-center gap-2.5 md:hidden">
            <Logo className="h-8 w-8 text-primary-container" />
            <span className="text-headline-md font-bold text-primary">
              {platform.brand}
            </span>
          </div>
          <h2 className="text-headline-md text-primary">
            {mode === "signin" ? "Welcome back" : "Create your account"}
          </h2>
          <div className="mb-stack-md" />

          <form onSubmit={submit} className="space-y-stack-md">
            {mode === "signup" && (
              <label className="block">
                <span className="mb-1 block text-label-md text-on-surface-variant">
                  Full name
                </span>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  autoComplete="name"
                  className="w-full rounded-lg border border-outline-variant bg-white px-4 py-3 text-body-md focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20"
                  placeholder="e.g. Amina Bello"
                />
              </label>
            )}
            <label className="block">
              <span className="mb-1 block text-label-md text-on-surface-variant">
                Work email
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                className="w-full rounded-lg border border-outline-variant bg-white px-4 py-3 text-body-md focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20"
                placeholder="you@company.com"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-label-md text-on-surface-variant">
                Password
              </span>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete={mode === "signin" ? "current-password" : "new-password"}
                  className="w-full rounded-lg border border-outline-variant bg-white px-4 py-3 pr-12 text-body-md focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20"
                  placeholder={mode === "signin" ? "Your password" : "10+ characters, letters and numbers"}
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-primary"
                  title={showPw ? "Hide password" : "Show password"}
                >
                  <MaterialIcon name={showPw ? "visibility_off" : "visibility"} className="text-[20px]" />
                </button>
              </div>
              {mode === "signin" && (
                <button
                  type="button"
                  onClick={forgotPassword}
                  className="mt-1.5 text-caption font-semibold text-secondary hover:underline"
                >
                  Forgot password?
                </button>
              )}
            </label>
            {mode === "signup" && (
              <label className="block">
                <span className="mb-1 block text-label-md text-on-surface-variant">
                  Confirm password
                </span>
                <input
                  type={showPw ? "text" : "password"}
                  required
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  autoComplete="new-password"
                  className={`w-full rounded-lg border bg-white px-4 py-3 text-body-md focus:outline-none focus:ring-2 ${
                    confirm && confirm !== password
                      ? "border-rose-400 focus:border-rose-400 focus:ring-rose-200"
                      : "border-outline-variant focus:border-secondary focus:ring-secondary/20"
                  }`}
                  placeholder="Repeat your password"
                />
                {confirm && confirm !== password && (
                  <span className="mt-1 block text-caption text-rose-600">
                    Passwords do not match yet.
                  </span>
                )}
              </label>
            )}

            {error && (
              <p className="flex items-start gap-2 rounded-lg bg-rose-50 p-3 text-caption text-rose-700">
                <MaterialIcon name="error" className="text-[16px]" /> {error}
              </p>
            )}
            {notice && (
              <p className="flex items-start gap-2 rounded-lg bg-emerald-50 p-3 text-caption text-emerald-700">
                <MaterialIcon name="check_circle" className="text-[16px]" /> {notice}
              </p>
            )}

            <button
              type="submit"
              disabled={busy}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-primary-container to-[#1c3a63] py-3.5 text-label-md font-bold text-white transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-60"
            >
              {busy ? "One moment…" : mode === "signin" ? "Sign in" : "Create account"}
              <MaterialIcon name="arrow_forward" className="text-[18px]" />
            </button>
          </form>

          <p className="mt-stack-md text-center text-caption text-on-surface-variant">
            No account yet? Access is set up by your training administrator —
            contact them to be added.
          </p>
        </div>
      </div>
    </div>
  );
}
