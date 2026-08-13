import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import MaterialIcon from "../MaterialIcon.jsx";
import Logo from "../Logo.jsx";
import { platform, documents, libraryByModule } from "../../data.js";
import { useCourse } from "../../CourseContext.jsx";
import { useAuth } from "../../AuthContext.jsx";

// Live search across modules, library documents and glossary terms.
function useSearchIndex() {
  const { modules } = useCourse();
  return useMemo(() => {
    const items = [];
    for (const m of modules) {
      items.push({
        icon: m.icon,
        label: `${m.code} · ${m.title}`,
        sub: "Module",
        to: `/module/${m.id}`,
        text: `${m.code} ${m.title} ${m.summary}`.toLowerCase(),
      });
      for (const g of m.glossary ?? []) {
        items.push({
          icon: "translate",
          label: g.term,
          sub: `Term · ${m.code}`,
          to: `/module/${m.id}`,
          text: `${g.term} ${g.plain}`.toLowerCase(),
        });
      }
    }
    for (const [modId, docs] of Object.entries(libraryByModule)) {
      for (const d of docs) {
        if (!d.doc) continue;
        const doc = documents[d.doc];
        items.push({
          icon: d.icon ?? "description",
          label: doc?.title ?? d.title,
          sub: `Library · ${modId.toUpperCase()}`,
          to: `/library/${d.doc}`,
          text: `${d.title} ${doc?.title ?? ""} ${doc?.intro ?? ""}`.toLowerCase(),
        });
      }
    }
    return items;
  }, [modules]);
}

export default function TopNav() {
  const navigate = useNavigate();
  const { enabled, profile, user, signOut } = useAuth();
  const displayName = profile?.full_name || user?.email || "Learner";
  const initial = (displayName[0] || "A").toUpperCase();
  const index = useSearchIndex();
  const [q, setQ] = useState("");
  const [focused, setFocused] = useState(false);

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (needle.length < 2) return [];
    return index.filter((it) => it.text.includes(needle)).slice(0, 8);
  }, [q, index]);

  const open = focused && q.trim().length >= 2;

  function go(item) {
    setQ("");
    navigate(item.to);
  }

  return (
    <header className="glass-bar fixed top-0 left-0 right-0 z-50 flex h-20 items-center justify-between border-b border-outline-variant/70 px-margin-mobile md:px-margin-desktop">
      <div className="flex items-center gap-stack-md">
        <button
          onClick={() => navigate("/")}
          title="Back to the dashboard"
          className="flex items-center gap-2.5 transition-opacity hover:opacity-80 active:scale-[0.98]"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-container to-[#1c3a63] shadow-sm">
            <Logo className="h-6 w-6 text-white" />
          </span>
          <span className="text-headline-md font-bold text-primary">
            {platform.brand}
          </span>
        </button>
        <div className="mx-unit hidden h-6 w-px bg-outline-variant md:block" />
        <span className="hidden text-label-md uppercase tracking-wider text-on-surface-variant lg:block">
          {platform.center}
        </span>
      </div>

      <div className="flex items-center gap-stack-md">
        <div className="group relative hidden sm:block">
          <MaterialIcon
            name="search"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-outline transition-colors group-focus-within:text-secondary"
          />
          <input
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 150)}
            placeholder="Search modules, docs, terms…"
            className="w-64 rounded-full border border-outline-variant bg-surface-container-low/70 py-2.5 pl-10 pr-4 text-body-md transition-all focus:w-72 focus:border-secondary focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-secondary/20"
          />
          {open && (
            <div className="absolute right-0 top-full mt-2 w-[26rem] max-w-[80vw] overflow-hidden rounded-xl border border-outline-variant bg-white shadow-xl">
              {results.length === 0 ? (
                <p className="px-4 py-3 text-caption text-on-surface-variant">
                  Nothing found for “{q.trim()}”.
                </p>
              ) : (
                results.map((r, i) => (
                  <button
                    key={`${r.to}-${r.label}-${i}`}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      go(r);
                    }}
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-surface-container-low"
                  >
                    <MaterialIcon
                      name={r.icon}
                      className="shrink-0 text-[20px] text-secondary"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-body-md text-on-surface">
                        {r.label}
                      </span>
                      <span className="text-caption text-outline">{r.sub}</span>
                    </span>
                    <MaterialIcon
                      name="north_east"
                      className="shrink-0 text-[16px] text-outline"
                    />
                  </button>
                ))
              )}
            </div>
          )}
        </div>
        <NextStepMenu />
        <HelpMenu />
        <AccountMenu
          enabled={enabled}
          displayName={displayName}
          initial={initial}
          email={user?.email}
          role={profile?.role}
          onSignOut={signOut}
          onGoEvidence={() => navigate("/evidence")}
        />
      </div>
    </header>
  );
}

// The bell: no fake notifications — it tells the learner their real next step.
function NextStepMenu() {
  const navigate = useNavigate();
  const { modules, progress } = useCourse();
  const [open, setOpen] = useState(false);
  const next =
    modules.find((m) => m.status === "in_progress") ||
    modules.find((m) => m.status !== "completed");
  const done = !next;
  return (
    <div
      className="relative"
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false);
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        title="Your next step"
        className={`relative rounded-full p-2 transition-colors hover:bg-surface-container-high hover:text-primary ${open ? "bg-surface-container-high text-primary" : "text-on-surface-variant"}`}
      >
        <MaterialIcon name="notifications" />
        {!done && (
          <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-secondary text-[9px] font-bold text-white ring-2 ring-white">
            1
          </span>
        )}
      </button>
      {open && (
        <div className="animate-fade-up absolute right-0 top-full z-50 mt-2 w-80 overflow-hidden rounded-xl border border-outline-variant bg-white shadow-xl">
          <div className="border-b border-outline-variant bg-surface-container-low px-stack-md py-3">
            <p className="text-label-md font-bold text-primary">Your next step</p>
          </div>
          {done ? (
            <div className="p-stack-md text-center">
              <MaterialIcon name="celebration" fill className="text-4xl text-secondary" />
              <p className="mt-1 text-label-md font-bold text-primary">
                Pathway complete!
              </p>
              <button
                onMouseDown={(e) => {
                  e.preventDefault();
                  setOpen(false);
                  navigate("/evidence");
                }}
                className="mt-2 w-full rounded-lg bg-primary py-2.5 text-label-md font-bold text-on-primary hover:opacity-90"
              >
                View your certificate
              </button>
            </div>
          ) : (
            <button
              onMouseDown={(e) => {
                e.preventDefault();
                setOpen(false);
                navigate(next.type === "capstone" ? "/capstone" : `/module/${next.id}`);
              }}
              className="flex w-full items-start gap-3 p-stack-md text-left transition-colors hover:bg-surface-container-low"
            >
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-white"
                style={{ background: next.accent ?? "#0d1c32" }}
              >
                <MaterialIcon name={next.icon} className="text-[22px]" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-label-md font-bold text-primary">
                  {next.status === "in_progress" ? "Continue" : "Start"} {next.code}: {next.title}
                </span>
                <span className="mt-0.5 block text-caption text-on-surface-variant">
                  {progress.completed} of {progress.total} modules done · {next.duration}
                </span>
              </span>
              <MaterialIcon name="arrow_forward" className="shrink-0 self-center text-secondary" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// The "?" button: a quick how-it-works refresher for anyone who feels lost.
function HelpMenu() {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="relative"
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false);
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        title="How it works"
        className={`rounded-full p-2 transition-colors hover:bg-surface-container-high hover:text-primary ${open ? "bg-surface-container-high text-primary" : "text-on-surface-variant"}`}
      >
        <MaterialIcon name="help" />
      </button>
      {open && (
        <div className="animate-fade-up absolute right-0 top-full z-50 mt-2 w-80 overflow-hidden rounded-xl border border-outline-variant bg-white shadow-xl">
          <div className="border-b border-outline-variant bg-surface-container-low px-stack-md py-3">
            <p className="text-label-md font-bold text-primary">How the platform works</p>
          </div>
          <div className="space-y-3 p-stack-md">
            {[
              ["menu_book", "Read the lesson", "Open a module and tick each section as you read it."],
              ["extension", "Play the practice games", "Puzzles and cards to make it stick — nothing is graded."],
              ["quiz", "Pass the quiz", "80% completes the module and unlocks the next one."],
              ["workspace_premium", "Finish all 6 modules", "Your certificate appears in Training Evidence."],
            ].map(([ic, t, d]) => (
              <div key={t} className="flex items-start gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-container-low">
                  <MaterialIcon name={ic} className="text-[18px] text-secondary" />
                </span>
                <span>
                  <span className="block text-label-md font-bold text-primary">{t}</span>
                  <span className="block text-caption text-on-surface-variant">{d}</span>
                </span>
              </div>
            ))}
            <p className="rounded-lg bg-surface-container-low p-3 text-caption text-on-surface-variant">
              <strong>Stuck on a word?</strong> Tap the jargon-buster chips at the
              top of any lesson. <strong>Stuck on a question?</strong> Look for the
              "Need a hint?" button.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// Avatar with a dropdown: account details, quick links, and a styled
// sign-out confirmation — everything hangs under the initial.
function AccountMenu({ enabled, displayName, initial, email, role, onSignOut, onGoEvidence }) {
  const [open, setOpen] = useState(false);
  const [confirming, setConfirming] = useState(false);

  function close() {
    setOpen(false);
    setConfirming(false);
  }

  return (
    <div
      className="relative ml-stack-sm"
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) close();
      }}
    >
      <button
        onClick={() => (open ? close() : setOpen(true))}
        title={displayName}
        className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-secondary to-[#9a7a00] text-label-md font-bold text-white shadow-sm ring-2 transition-all hover:brightness-110 active:scale-95 ${
          open ? "ring-secondary" : "ring-white"
        }`}
      >
        {initial}
      </button>

      {open && (
        <div className="animate-fade-up absolute right-0 top-full z-50 mt-2 w-72 overflow-hidden rounded-xl border border-outline-variant bg-white shadow-xl">
          {confirming ? (
            <div className="p-stack-md text-center">
              <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-rose-50">
                <MaterialIcon name="logout" className="text-2xl text-rose-500" />
              </div>
              <p className="text-label-md font-bold text-primary">Sign out?</p>
              <p className="mt-1 text-caption text-on-surface-variant">
                Your progress is saved to your account — you can pick up right
                where you left off.
              </p>
              <div className="mt-stack-md flex gap-2">
                <button
                  onMouseDown={(e) => {
                    e.preventDefault();
                    close();
                  }}
                  className="flex-1 rounded-lg border border-outline-variant py-2.5 text-label-md text-on-surface transition-colors hover:bg-surface-container-low"
                >
                  Cancel
                </button>
                <button
                  onMouseDown={(e) => {
                    e.preventDefault();
                    close();
                    onSignOut();
                  }}
                  className="flex-1 rounded-lg bg-rose-500 py-2.5 text-label-md font-bold text-white transition-colors hover:bg-rose-600"
                >
                  Sign out
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3 border-b border-outline-variant bg-surface-container-low px-stack-md py-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-secondary to-[#9a7a00] text-label-md font-bold text-white">
                  {initial}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-label-md font-bold text-primary">
                    {displayName}
                  </span>
                  {email && (
                    <span className="block truncate text-caption text-on-surface-variant">
                      {email}
                    </span>
                  )}
                  {role && (
                    <span className="mt-0.5 inline-block rounded-full bg-primary-container px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                      {role}
                    </span>
                  )}
                </span>
              </div>
              <button
                onMouseDown={(e) => {
                  e.preventDefault();
                  close();
                  onGoEvidence();
                }}
                className="flex w-full items-center gap-3 px-stack-md py-3 text-left text-body-md text-on-surface transition-colors hover:bg-surface-container-low"
              >
                <MaterialIcon name="verified" className="text-secondary" />
                My progress & evidence
              </button>
              {enabled && (
                <button
                  onMouseDown={(e) => {
                    e.preventDefault();
                    setConfirming(true);
                  }}
                  className="flex w-full items-center gap-3 border-t border-outline-variant px-stack-md py-3 text-left text-body-md text-rose-600 transition-colors hover:bg-rose-50"
                >
                  <MaterialIcon name="logout" />
                  Sign out
                </button>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
