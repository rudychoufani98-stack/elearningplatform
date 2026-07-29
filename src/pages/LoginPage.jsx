import { useState } from "react";
import Logo from "../components/Logo.jsx";
import MaterialIcon from "../components/MaterialIcon.jsx";
import { useAuth } from "../AuthContext.jsx";
import { platform, course } from "../data.js";

// Branded sign-in / sign-up screen shown before anything else when auth is on.
export default function LoginPage() {
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState("signin"); // "signin" | "signup"
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState(null);
  const [notice, setNotice] = useState(null);
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setError(null);
    setNotice(null);
    if (mode === "signup" && fullName.trim().length < 2)
      return setError("Please enter your full name.");
    if (password.length < 8)
      return setError("Password must be at least 8 characters.");
    if (mode === "signup" && password !== confirm)
      return setError("Passwords do not match.");
    setBusy(true);
    const err =
      mode === "signin"
        ? await signIn(email.trim(), password)
        : await signUp(email.trim(), password, fullName.trim());
    setBusy(false);
    if (err) return setError(err);
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
          <div>
            <p className="text-caption font-bold uppercase tracking-widest text-secondary-fixed">
              {platform.center}
            </p>
            <h1 className="mt-2 text-headline-lg leading-tight">
              {course.title}
            </h1>
            <p className="mt-3 max-w-sm text-body-md text-white/80">
              Six interactive modules, real policies, games and a capstone
              simulation — your ESG pathway starts here.
            </p>
          </div>
          <p className="text-caption text-white/60">
            {platform.series} · progress is saved to your account
          </p>
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
          <p className="mb-stack-md mt-1 text-body-md text-on-surface-variant">
            {mode === "signin"
              ? "Sign in to continue your learning."
              : "Your progress and certificates will be saved to this account."}
          </p>

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
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete={mode === "signin" ? "current-password" : "new-password"}
                className="w-full rounded-lg border border-outline-variant bg-white px-4 py-3 text-body-md focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20"
                placeholder="At least 8 characters"
              />
            </label>
            {mode === "signup" && (
              <label className="block">
                <span className="mb-1 block text-label-md text-on-surface-variant">
                  Confirm password
                </span>
                <input
                  type="password"
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
            {mode === "signin" ? "New here?" : "Already have an account?"}{" "}
            <button
              onClick={() => {
                setMode(mode === "signin" ? "signup" : "signin");
                setConfirm("");
                setError(null);
                setNotice(null);
              }}
              className="font-bold text-secondary hover:underline"
            >
              {mode === "signin" ? "Create an account" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
