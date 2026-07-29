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
        <button className="relative rounded-full p-2 text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-primary">
          <MaterialIcon name="notifications" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-secondary ring-2 ring-white" />
        </button>
        <button className="rounded-full p-2 text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-primary">
          <MaterialIcon name="help" />
        </button>
        <div
          className="ml-stack-sm flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-secondary to-[#9a7a00] text-label-md font-bold text-white shadow-sm ring-2 ring-white"
          title={displayName}
        >
          {initial}
        </div>
        {enabled && (
          <button
            onClick={() => {
              if (window.confirm("Sign out of Skykapital Academy?")) signOut();
            }}
            title="Sign out"
            className="rounded-full p-2 text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-error"
          >
            <MaterialIcon name="logout" />
          </button>
        )}
      </div>
    </header>
  );
}
