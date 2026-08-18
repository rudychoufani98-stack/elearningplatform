import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MaterialIcon from "../components/MaterialIcon.jsx";
import { useCourse, isUnlocked } from "../CourseContext.jsx";
import { course } from "../data.js";
import { useAuth } from "../AuthContext.jsx";

// Home — one story, one action. A single "continue" card, then the pathway
// as a numbered checklist. No duplicate shortcuts: everything a learner can
// do from here is visible in one glance, top to bottom.
export default function DashboardPage() {
  const navigate = useNavigate();
  const { modules, progress } = useCourse();
  const { profile, user } = useAuth();
  const learnerName =
    profile?.full_name || user?.user_metadata?.full_name || user?.email?.split("@")[0] || course.learner;
  const firstName = learnerName.split(" ")[0];

  const [welcomed, setWelcomed] = useState(() => {
    try { return localStorage.getItem("skk-welcome-v1") === "1"; } catch { return true; }
  });
  function dismissWelcome(go) {
    try { localStorage.setItem("skk-welcome-v1", "1"); } catch {}
    setWelcomed(true);
    if (go) navigate("/module/m1");
  }

  const current =
    modules.find((m) => m.status === "in_progress") ||
    modules.find((m) => m.status === "not_started") ||
    modules[0];
  const done = progress.percent === 100;
  const started = progress.completed > 0 || current.status === "in_progress";

  return (
    <div className="mx-auto max-w-[820px] px-margin-mobile py-stack-lg md:px-margin-desktop">
      {/* First-visit welcome */}
      {!welcomed && progress.completed === 0 && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-[#0d1c32]/70 px-6 backdrop-blur-sm">
          <div className="animate-pop w-full max-w-md overflow-hidden rounded-2xl bg-white text-center shadow-2xl">
            <div className="bg-gradient-to-br from-primary-container to-[#1c3a63] px-stack-lg py-stack-lg text-white">
              <MaterialIcon name="school" fill className="text-5xl text-secondary-fixed" />
              <h2 className="mt-2 text-headline-md">Welcome to your ESG pathway</h2>
              <p className="mt-1 text-body-md text-white/80">
                6 modules · games &amp; quizzes · one certificate
              </p>
            </div>
            <div className="space-y-3 p-stack-lg text-left">
              {[
                ["menu_book", "Read each short, illustrated lesson"],
                ["extension", "Play the practice games — they don't count"],
                ["quiz", "Pass the quiz (80%) to unlock the next module"],
              ].map(([ic, t], i) => (
                <p key={i} className="flex items-center gap-3 text-body-md text-on-surface">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-container-low">
                    <MaterialIcon name={ic} className="text-[18px] text-secondary" />
                  </span>
                  {t}
                </p>
              ))}
              <button
                onClick={() => dismissWelcome(true)}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-primary-container to-[#1c3a63] py-3.5 text-label-md font-bold text-white transition-all hover:brightness-110 active:scale-[0.98]"
              >
                Start Module 1 <MaterialIcon name="arrow_forward" />
              </button>
              <button
                onClick={() => dismissWelcome(false)}
                className="w-full py-1 text-caption text-on-surface-variant hover:text-primary"
              >
                I'll look around first
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Greeting */}
      <section className="mb-stack-lg animate-fade-up">
        <h1 className="mb-2 text-headline-lg text-primary md:text-headline-xl">
          Welcome back, {firstName} 👋
        </h1>
        <span className="mb-3 mt-1 block h-1 w-24 rounded-full bg-gradient-to-r from-secondary to-transparent" />
        <p className="text-body-lg text-on-surface-variant">
          {done
            ? "You have completed your certification — congratulations!"
            : started
            ? `You are on ${current.code} — ${progress.completed} of ${progress.total} modules done.`
            : "Your ESG training starts here. One module at a time."}
        </p>
      </section>

      {/* THE one action */}
      {done ? (
        <Link
          to="/evidence"
          className="mb-stack-lg flex items-center gap-stack-md rounded-xl bg-gradient-to-r from-primary-container to-[#1c3a63] p-stack-lg text-white shadow-lg transition-all hover:brightness-110"
        >
          <MaterialIcon name="workspace_premium" fill className="text-5xl text-secondary-fixed" />
          <span className="flex-1">
            <span className="block text-headline-md">Your certificate is ready</span>
            <span className="text-body-md text-white/80">Open “My progress” to download your PDF certificate.</span>
          </span>
          <MaterialIcon name="arrow_forward" className="text-3xl" />
        </Link>
      ) : (
        <button
          onClick={() => navigate(`/module/${current.id}`)}
          className="mb-stack-lg flex w-full items-center gap-stack-md rounded-xl bg-gradient-to-r from-primary-container to-[#1c3a63] p-stack-lg text-left text-white shadow-lg transition-all hover:brightness-110 active:scale-[0.99]"
        >
          <span
            className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl text-white"
            style={{ background: current.accent }}
          >
            <MaterialIcon name={current.icon} className="text-3xl" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-caption font-bold uppercase tracking-widest text-secondary-fixed">
              {started ? "Continue where you left off" : "Start here"}
            </span>
            <span className="block truncate text-headline-md">
              {current.order} · {current.title}
            </span>
            <span className="mt-1 flex flex-wrap items-center gap-1.5 text-caption text-white/85">
              <span className="rounded-full bg-white/15 px-2.5 py-0.5">1 · Lesson</span>
              <MaterialIcon name="chevron_right" className="text-[14px] text-white/60" />
              <span className="rounded-full bg-white/15 px-2.5 py-0.5">2 · Practice games</span>
              <MaterialIcon name="chevron_right" className="text-[14px] text-white/60" />
              <span className="rounded-full bg-white/15 px-2.5 py-0.5">3 · Quiz (80%)</span>
              <span className="ml-1 text-white/70">{current.duration}</span>
            </span>
          </span>
          <MaterialIcon name="play_circle" fill className="shrink-0 text-5xl text-secondary-fixed" />
        </button>
      )}

      {/* How it works — only before anything is completed */}
      {progress.completed === 0 && (
        <section className="animate-fade-up mb-stack-lg rounded-xl border border-outline-variant bg-gradient-to-br from-surface-container-lowest via-surface-container-lowest to-[#fcf6e8] p-stack-lg">
          <p className="mb-stack-md text-caption font-bold uppercase tracking-widest text-secondary">
            New here? How it works
          </p>
          <div className="grid grid-cols-1 gap-stack-md sm:grid-cols-3">
            {[
              { n: "1", icon: "menu_book", t: "Read the lesson", d: "Each module starts with a short, illustrated lesson." },
              { n: "2", icon: "extension", t: "Play the practice games", d: "Puzzles and games to make it stick — no grades here." },
              { n: "3", icon: "quiz", t: "Pass the quiz", d: "Score 80% to complete the module and unlock the next." },
            ].map((s) => (
              <div key={s.n} className="flex items-start gap-3 rounded-lg bg-surface-container-low p-stack-md">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-container text-label-md font-bold text-white">
                  {s.n}
                </span>
                <span>
                  <span className="flex items-center gap-1 text-label-md font-bold text-primary">
                    <MaterialIcon name={s.icon} className="text-[18px] text-secondary" /> {s.t}
                  </span>
                  <span className="mt-0.5 block text-caption text-on-surface-variant">{s.d}</span>
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* The pathway — every step in order, nothing else */}
      <section className="rounded-xl border border-outline-variant bg-surface-container-lowest p-stack-lg shadow-sm">
        <div className="mb-stack-md flex items-center justify-between">
          <h2 className="text-headline-md text-primary">Your pathway</h2>
          <span className="text-caption font-bold text-on-surface-variant">
            {progress.completed}/{progress.total} done
          </span>
        </div>
        <div className="mb-stack-md h-2 w-full overflow-hidden rounded-full bg-surface-container-high">
          <div
            className="h-full rounded-full bg-gradient-to-r from-secondary to-[#e9c176] transition-[width] duration-700"
            style={{ width: `${progress.percent}%` }}
          />
        </div>

        <ol className="space-y-2">
          {modules.map((m) => {
            const unlocked = isUnlocked(modules, m);
            const isDone = m.status === "completed";
            const isCurrent = !isDone && unlocked && m.id === current.id;
            const row = (
              <>
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-label-md font-bold ${
                    isDone
                      ? "bg-emerald-100 text-emerald-700"
                      : isCurrent
                      ? "text-white"
                      : "bg-surface-container-high text-outline"
                  }`}
                  style={isCurrent ? { background: m.accent } : undefined}
                >
                  {isDone ? (
                    <MaterialIcon name="check" fill className="text-[22px]" />
                  ) : unlocked ? (
                    m.order
                  ) : (
                    <MaterialIcon name="lock" className="text-[18px]" />
                  )}
                </span>
                <span className="min-w-0 flex-1">
                  <span
                    className={`block truncate text-label-md font-bold ${
                      unlocked ? "text-primary" : "text-outline"
                    }`}
                  >
                    {m.type === "capstone" ? `${m.title} — final simulation` : m.title}
                  </span>
                  <span className="text-caption text-on-surface-variant">
                    {isDone
                      ? `Completed${m.completedOn ? ` on ${m.completedOn}` : ""}${
                          m.score ? ` · ${m.score.earned}/${m.score.total} pts` : ""
                        }`
                      : unlocked
                      ? `${m.duration} · Lesson → Practice games → Quiz`
                      : "Finish the previous module to unlock"}
                  </span>
                </span>
                {isCurrent && (
                  <span className="flex shrink-0 items-center gap-1 rounded-lg bg-primary px-4 py-2 text-caption font-bold text-on-primary">
                    {started ? "Continue" : "Start"} <MaterialIcon name="arrow_forward" className="text-[14px]" />
                  </span>
                )}
                {isDone && (
                  <span className="shrink-0 text-caption font-bold text-on-surface-variant">Review</span>
                )}
              </>
            );
            return (
              <li key={m.id}>
                {unlocked ? (
                  <Link
                    to={`/module/${m.id}`}
                    className={`flex items-center gap-stack-md rounded-xl p-3 transition-colors ${
                      isCurrent
                        ? "border-2 border-secondary bg-[#fdfaf3]"
                        : "border border-transparent hover:bg-surface-container-low"
                    }`}
                  >
                    {row}
                  </Link>
                ) : (
                  <div className="flex items-center gap-stack-md rounded-xl border border-transparent p-3 opacity-70">
                    {row}
                  </div>
                )}
              </li>
            );
          })}

          {/* Final step: the certificate */}
          <li>
            {done ? (
              <Link
                to="/evidence"
                className="flex items-center gap-stack-md rounded-xl border border-transparent p-3 transition-colors hover:bg-surface-container-low"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-secondary text-white">
                  <MaterialIcon name="workspace_premium" fill className="text-[22px]" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-label-md font-bold text-primary">Your certificate</span>
                  <span className="text-caption text-on-surface-variant">Download your PDF certificate</span>
                </span>
                <MaterialIcon name="download" className="shrink-0 text-primary" />
              </Link>
            ) : (
              <div className="flex items-center gap-stack-md rounded-xl p-3 opacity-70">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-surface-container-high text-outline">
                  <MaterialIcon name="workspace_premium" className="text-[20px]" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-label-md font-bold text-outline">Your certificate</span>
                  <span className="text-caption text-on-surface-variant">
                    Complete all {progress.total} modules to earn it
                  </span>
                </span>
              </div>
            )}
          </li>
        </ol>
      </section>
    </div>
  );
}
