import { useState } from "react";
import { Link } from "react-router-dom";
import MaterialIcon from "../components/MaterialIcon.jsx";
import { useCourse, isUnlocked } from "../CourseContext.jsx";
import { libraryByModule } from "../data.js";

// "The Library" — one line per module, unlocked in sequence. A module's
// documents open only once the previous module is completed.
export default function LibraryPage() {
  const { modules } = useCourse();
  const [open, setOpen] = useState(modules[0]?.id ?? null);

  return (
    <div className="mx-auto max-w-[1000px] px-margin-mobile py-stack-lg md:px-margin-desktop">
      <nav className="mb-stack-md flex items-center gap-2 text-caption text-outline">
        <Link to="/" className="hover:text-primary">
          Dashboard
        </Link>
        <MaterialIcon name="chevron_right" className="text-[14px]" />
        <span className="text-on-surface">The Library</span>
      </nav>

      <h1 className="mb-2 text-headline-lg text-primary md:text-headline-xl">
        The Library
      </h1>
      <p className="mb-stack-lg max-w-2xl text-body-lg text-on-surface-variant">
        Modules teach, the library proves. Each module's documents unlock once
        you complete the module before it.
      </p>

      <div className="overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest">
        {modules.map((m, idx) => {
          const docs = libraryByModule[m.id] ?? [];
          const unlocked = isUnlocked(modules, m);
          const locked = !unlocked;
          const prev = modules[idx - 1];
          const isOpen = open === m.id && unlocked;
          return (
            <div
              key={m.id}
              className={idx > 0 ? "border-t border-outline-variant" : ""}
            >
              {/* One line per module */}
              <button
                onClick={() => !locked && setOpen(isOpen ? null : m.id)}
                disabled={locked}
                className={`flex w-full items-center gap-4 px-stack-md py-stack-md text-left transition-colors ${
                  locked ? "cursor-not-allowed opacity-60" : "hover:bg-surface-container-low"
                }`}
              >
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-white"
                  style={{ background: locked ? "#8a8f96" : m.accent }}
                >
                  <MaterialIcon
                    name={locked ? "lock" : m.icon}
                    className="text-[22px]"
                  />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="text-caption font-bold uppercase tracking-wider text-outline">
                    {m.code}
                  </span>
                  <span className="block truncate text-label-md font-semibold text-primary">
                    {m.title}
                  </span>
                </span>
                {locked ? (
                  <span className="flex shrink-0 items-center gap-1 text-caption font-semibold text-outline">
                    <MaterialIcon name="lock" className="text-[16px]" />
                    Complete {prev ? prev.code : "the previous module"}
                  </span>
                ) : (
                  <>
                    <span className="shrink-0 text-caption text-on-surface-variant">
                      {docs.length} {docs.length === 1 ? "doc" : "docs"}
                    </span>
                    <MaterialIcon
                      name={isOpen ? "expand_less" : "expand_more"}
                      className="shrink-0 text-on-surface-variant"
                    />
                  </>
                )}
              </button>

              {/* Documents for this module */}
              {isOpen && (
                <ul className="space-y-1 bg-surface-container-low px-stack-md pb-stack-md pt-1">
                  {docs.length === 0 && (
                    <li className="py-2 text-caption text-outline">
                      No documents for this module yet.
                    </li>
                  )}
                  {docs.map((d) => {
                    const target = d.to ?? (d.doc ? `/library/${d.doc}` : null);
                    const available = Boolean(target);
                    const isLaunch = Boolean(d.to);
                    const Row = available ? Link : "div";
                    const rowProps = available ? { to: target } : {};
                    return (
                      <Row
                        key={d.title}
                        {...rowProps}
                        className={`flex items-center gap-3 rounded-lg bg-white px-4 py-3 ${
                          available
                            ? "group cursor-pointer border border-outline-variant transition-colors hover:border-secondary"
                            : "border border-transparent opacity-70"
                        }`}
                      >
                        <MaterialIcon
                          name={d.icon}
                          className="shrink-0"
                          style={{ color: m.accent }}
                        />
                        <span className="min-w-0 flex-1 text-body-md text-on-surface">
                          {d.title}
                        </span>
                        {available ? (
                          <span className="flex shrink-0 items-center gap-1 text-label-md font-semibold text-secondary">
                            {isLaunch ? "Start" : "Read"}
                            <MaterialIcon
                              name={isLaunch ? "play_arrow" : "arrow_forward"}
                              className="text-[16px] transition-transform group-hover:translate-x-1"
                            />
                          </span>
                        ) : (
                          <span className="shrink-0 rounded-full bg-surface-container-high px-2.5 py-0.5 text-caption font-semibold text-on-surface-variant">
                            Coming soon
                          </span>
                        )}
                      </Row>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
