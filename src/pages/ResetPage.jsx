import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo.jsx";
import MaterialIcon from "../components/MaterialIcon.jsx";
import { supabase } from "../lib/supabase.js";
import { useAuth } from "../AuthContext.jsx";
import { platform } from "../data.js";

// Landing page for the password-reset email link. The link signs the user in
// with a temporary recovery session; here they choose a new password.
export default function ResetPage() {
  const navigate = useNavigate();
  const { session } = useAuth();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setError(null);
    if (password.length < 10)
      return setError("Password must be at least 10 characters.");
    if (!/[a-zA-Z]/.test(password) || !/[0-9]/.test(password))
      return setError("Password must contain both letters and numbers.");
    if (password !== confirm) return setError("Passwords do not match.");
    setBusy(true);
    const { error: err } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (err) return setError(err.message);
    setDone(true);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-margin-mobile">
      <div className="w-full max-w-md rounded-2xl border border-outline-variant bg-surface-container-lowest p-stack-lg shadow-xl md:p-12">
        <div className="mb-stack-md flex items-center gap-2.5">
          <Logo className="h-8 w-8 text-primary-container" />
          <span className="text-headline-md font-bold text-primary">
            {platform.brand}
          </span>
        </div>

        {done ? (
          <div className="text-center">
            <MaterialIcon name="check_circle" fill className="text-5xl text-emerald-500" />
            <h1 className="mt-2 text-headline-md text-primary">Password updated</h1>
            <p className="mt-1 text-body-md text-on-surface-variant">
              You're signed in with your new password.
            </p>
            <button
              onClick={() => navigate("/")}
              className="mt-stack-md w-full rounded-lg bg-primary py-3.5 text-label-md font-bold text-on-primary transition-opacity hover:opacity-90"
            >
              Go to my dashboard
            </button>
          </div>
        ) : !session ? (
          <div className="text-center">
            <MaterialIcon name="link_off" className="text-5xl text-outline" />
            <h1 className="mt-2 text-headline-md text-primary">Link expired</h1>
            <p className="mt-1 text-body-md text-on-surface-variant">
              This reset link is no longer valid. Request a new one from the
              sign-in page.
            </p>
            <button
              onClick={() => navigate("/")}
              className="mt-stack-md w-full rounded-lg bg-primary py-3.5 text-label-md font-bold text-on-primary transition-opacity hover:opacity-90"
            >
              Back to sign in
            </button>
          </div>
        ) : (
          <>
            <h1 className="text-headline-md text-primary">Choose a new password</h1>
            <p className="mt-1 text-caption text-on-surface-variant">
              10+ characters with letters and numbers. You'll stay signed in.
            </p>
            <form onSubmit={submit} className="mt-stack-md space-y-stack-md">
              <label className="block">
                <span className="mb-1 block text-label-md text-on-surface-variant">
                  New password
                </span>
                <div className="relative">
                  <input
                    type={show ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                    className="w-full rounded-lg border border-outline-variant bg-white px-4 py-3 pr-12 text-body-md focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20"
                    placeholder="10+ characters, letters and numbers"
                  />
                  <button
                    type="button"
                    onClick={() => setShow(!show)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-primary"
                    title={show ? "Hide password" : "Show password"}
                  >
                    <MaterialIcon name={show ? "visibility_off" : "visibility"} className="text-[20px]" />
                  </button>
                </div>
              </label>
              <label className="block">
                <span className="mb-1 block text-label-md text-on-surface-variant">
                  Confirm new password
                </span>
                <input
                  type={show ? "text" : "password"}
                  required
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  autoComplete="new-password"
                  className="w-full rounded-lg border border-outline-variant bg-white px-4 py-3 text-body-md focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20"
                  placeholder="Repeat it"
                />
              </label>
              {error && (
                <p className="flex items-start gap-2 rounded-lg bg-rose-50 p-3 text-caption text-rose-700">
                  <MaterialIcon name="error" className="text-[16px]" /> {error}
                </p>
              )}
              <button
                type="submit"
                disabled={busy}
                className="w-full rounded-lg bg-gradient-to-r from-primary-container to-[#1c3a63] py-3.5 text-label-md font-bold text-white transition-all hover:brightness-110 disabled:opacity-60"
              >
                {busy ? "Saving…" : "Save new password"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
