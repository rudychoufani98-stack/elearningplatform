import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import MaterialIcon from "../components/MaterialIcon.jsx";
import { useCourse, statusMeta, isUnlocked } from "../CourseContext.jsx";
import { libraryByModule } from "../data.js";
import { docsRead } from "../lib/readingProgress.js";
import SortActivity from "../components/activities/SortActivity.jsx";
import ScenarioActivity from "../components/activities/ScenarioActivity.jsx";
import SliderActivity from "../components/activities/SliderActivity.jsx";
import FillBlankActivity from "../components/activities/FillBlankActivity.jsx";
import HotspotActivity from "../components/activities/HotspotActivity.jsx";
import ChecklistActivity from "../components/activities/ChecklistActivity.jsx";
import MatchActivity from "../components/activities/MatchActivity.jsx";
import SwipeActivity from "../components/activities/SwipeActivity.jsx";
import MemoryActivity from "../components/activities/MemoryActivity.jsx";
import Discussion from "../components/Discussion.jsx";

// Maps an activity `type` to its component.
function renderActivity(a, accent) {
  const props = { activity: a, accent };
  switch (a.type) {
    case "memory":
      return <MemoryActivity {...props} />;
    case "swipe":
      return <SwipeActivity {...props} />;
    case "scenario":
      return <ScenarioActivity {...props} />;
    case "slider":
      return <SliderActivity {...props} />;
    case "fillblank":
      return <FillBlankActivity {...props} />;
    case "hotspot":
      return <HotspotActivity {...props} />;
    case "checklist":
      return <ChecklistActivity {...props} />;
    case "match":
      return <MatchActivity {...props} />;
    default:
      return <SortActivity {...props} />; // order / categorize
  }
}

export default function LessonPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { modules, progress, completeModule, showToast } = useCourse();
  const [tab, setTab] = useState("notes");

  // "Mark as read" per lesson section, persisted per module.
  const readKey = `skykapital-read-${id}`;
  const [readSections, setReadSections] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(readKey) || "[]");
    } catch {
      return [];
    }
  });
  useEffect(() => {
    try {
      setReadSections(JSON.parse(localStorage.getItem(`skykapital-read-${id}`) || "[]"));
    } catch {
      setReadSections([]);
    }
  }, [id]);
  // Sections tick themselves as the learner scrolls through them — no
  // clicking required (the manual toggle still works as an override).
  useEffect(() => {
    const key = `skykapital-read-${id}`;
    let ticking = false;
    function check() {
      ticking = false;
      const line = window.innerHeight * 0.65;
      document.querySelectorAll("[data-sec]").forEach((el) => {
        if (el.getBoundingClientRect().top < line) {
          const h = el.getAttribute("data-sec");
          setReadSections((prev) => {
            if (prev.includes(h)) return prev;
            const next = [...prev, h];
            try {
              localStorage.setItem(key, JSON.stringify(next));
            } catch {
              /* ignore */
            }
            return next;
          });
        }
      });
    }
    function onScroll() {
      if (ticking) return;
      ticking = true;
      setTimeout(check, 120);
    }
    const t = setTimeout(check, 400); // catch sections already on screen
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener("scroll", onScroll);
    };
  }, [id]);

  function toggleRead(heading) {
    setReadSections((prev) => {
      const next = prev.includes(heading)
        ? prev.filter((h) => h !== heading)
        : [...prev, heading];
      try {
        localStorage.setItem(readKey, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }

  const module = modules.find((m) => m.id === id);
  // A completed module counts as read (progress can come from another
  // device, where the local reading ticks don't exist).
  const allRead =
    module?.status === "completed" ||
    !module?.lesson?.length ||
    module.lesson.every((s) => readSections.includes(s.heading));
  const readCount = module?.lesson
    ? module.lesson.filter((s) => readSections.includes(s.heading)).length
    : 0;

  // THE COURSE = this module's Library readings. They must all be opened,
  // along with the lesson, before the games and the quiz unlock.
  const moduleDocs = (libraryByModule[module?.id] ?? []).filter((d) => d.doc);
  const docsReadList = docsRead();
  const docsReadCount = moduleDocs.filter((d) => docsReadList.includes(d.doc)).length;
  const allDocsRead =
    module?.status === "completed" ||
    moduleDocs.length === 0 ||
    docsReadCount === moduleDocs.length;
  const readingDone = allRead && allDocsRead;
  if (!module) {
    return (
      <div className="mx-auto max-w-[1280px] p-stack-lg">
        <p className="text-body-lg text-on-surface-variant">Module not found.</p>
        <Link to="/course" className="text-secondary hover:underline">
          Back to the syllabus
        </Link>
      </div>
    );
  }

  const idx = modules.findIndex((m) => m.id === id);
  const prev = modules[idx - 1];
  const next = modules[idx + 1];
  const meta = statusMeta(module);

  // Enforce the path: a locked module can't be studied until the previous
  // one is completed.
  if (!isUnlocked(modules, module)) {
    return (
      <div className="mx-auto flex max-w-[640px] flex-col items-center gap-4 p-margin-desktop text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-surface-container-high text-outline">
          <MaterialIcon name="lock" className="text-3xl" />
        </div>
        <h1 className="text-headline-md text-primary">This module is locked</h1>
        <p className="text-body-md text-on-surface-variant">
          Complete <strong>{prev ? prev.title : "the previous module"}</strong>{" "}
          first to unlock “{module.title}”. The pathway is designed to be taken
          in order.
        </p>
        <div className="flex gap-stack-md">
          {prev && (
            <button
              onClick={() => navigate(`/module/${prev.id}`)}
              className="bg-primary px-6 py-3 text-label-md text-on-primary transition-opacity hover:opacity-90"
            >
              Go to {prev.code}
            </button>
          )}
          <Link
            to="/course"
            className="border border-primary px-6 py-3 text-label-md text-primary transition-colors hover:bg-surface-container-low"
          >
            Back to syllabus
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1400px] p-margin-mobile md:p-stack-lg">
      {/* Breadcrumb */}
      <div className="mb-stack-md flex items-center gap-2 text-on-surface-variant">
        <Link to="/course" className="text-label-md hover:text-primary">
          Sustainability Pathway
        </Link>
        <MaterialIcon name="chevron_right" className="text-[16px]" />
        <span className="text-label-md">{module.code}</span>
        <MaterialIcon name="chevron_right" className="text-[16px]" />
        <span className="text-label-md font-bold text-primary">{module.title}</span>
      </div>

      {/* Title + prev/next */}
      <div className="mb-stack-lg flex flex-col justify-between gap-stack-md md:flex-row md:items-end">
        <div>
          <h1 className="mb-1 text-headline-lg text-on-background">
            {module.order}. {module.title}
          </h1>
          <p className="text-body-md text-on-surface-variant">
            {module.duration} · {module.metaNote ?? module.type} ·{" "}
            <span className={meta.iconClass}>{meta.label}</span>
          </p>
        </div>
        <div className="flex gap-stack-md">
          <button
            disabled={!prev}
            onClick={() => prev && navigate(`/module/${prev.id}`)}
            className="flex items-center rounded-lg border border-primary px-6 py-3 text-label-md text-primary transition-colors hover:bg-surface-container-high disabled:cursor-not-allowed disabled:opacity-40"
          >
            <MaterialIcon name="chevron_left" className="mr-2" /> Previous
          </button>
          <button
            disabled={!next || !isUnlocked(modules, next)}
            title={next && !isUnlocked(modules, next) ? "Pass this module's quiz to unlock the next one" : undefined}
            onClick={() => next && isUnlocked(modules, next) && navigate(`/module/${next.id}`)}
            className="flex items-center rounded-lg bg-primary px-6 py-3 text-label-md text-on-primary transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {next && !isUnlocked(modules, next) && <MaterialIcon name="lock" className="mr-2 text-[16px]" />}
            Next Module <MaterialIcon name="chevron_right" className="ml-2" />
          </button>
        </div>
      </div>

      {/* The 3-step path — one order, enforced: read, then play, then quiz */}
      <div className="mb-stack-lg flex flex-col gap-2 rounded-xl border border-outline-variant bg-surface-container-lowest p-stack-md sm:flex-row sm:items-center">
        <a
          href="#lesson-notes"
          className={`flex flex-1 items-center gap-2 rounded-lg px-3 py-2 transition-colors hover:bg-surface-container-low ${
            readingDone ? "" : "ring-2 ring-secondary/60"
          }`}
        >
          <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-caption font-bold text-white ${readingDone ? "bg-emerald-500" : "bg-primary-container"}`}>
            {readingDone ? <MaterialIcon name="check" fill className="text-[16px]" /> : "1"}
          </span>
          <span className="min-w-0">
            <span className="block text-label-md font-semibold text-primary">Read the course</span>
            {!readingDone && (
              <span className="text-caption text-secondary">
                You are here
                {moduleDocs.length > 0 ? ` · ${docsReadCount}/${moduleDocs.length} readings` : ""}
                {" · "}{readCount}/{module.lesson?.length ?? 0} sections
              </span>
            )}
          </span>
        </a>
        <MaterialIcon name="chevron_right" className="hidden text-outline sm:block" />
        {readingDone ? (
          <a href="#practice" className="flex flex-1 items-center gap-2 rounded-lg px-3 py-2 ring-2 ring-secondary/60 transition-colors hover:bg-surface-container-low">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-container text-caption font-bold text-white">2</span>
            <span className="min-w-0">
              <span className="block text-label-md font-semibold text-primary">Practice with the games</span>
              <span className="text-caption text-secondary">You are here · not graded</span>
            </span>
          </a>
        ) : (
          <div className="flex flex-1 items-center gap-2 rounded-lg px-3 py-2 opacity-60">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-surface-container-high text-outline">
              <MaterialIcon name="lock" className="text-[14px]" />
            </span>
            <span className="min-w-0">
              <span className="block text-label-md font-semibold text-on-surface-variant">Practice with the games</span>
              <span className="text-caption text-outline">Finish the course first</span>
            </span>
          </div>
        )}
        <MaterialIcon name="chevron_right" className="hidden text-outline sm:block" />
        {readingDone ? (
          <button
            onClick={() => navigate(module.type === "capstone" ? "/capstone" : `/quiz/${module.id}`)}
            className="flex flex-1 items-center gap-2 rounded-lg px-3 py-2 text-left transition-colors hover:bg-surface-container-low"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary text-caption font-bold text-white">3</span>
            <span className="text-label-md font-semibold text-primary">
              {module.type === "capstone" ? "Run the simulation" : "Pass the quiz (80%)"}
            </span>
          </button>
        ) : (
          <div className="flex flex-1 items-center gap-2 rounded-lg px-3 py-2 opacity-60">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-surface-container-high text-outline">
              <MaterialIcon name="lock" className="text-[14px]" />
            </span>
            <span className="min-w-0">
              <span className="block text-label-md font-semibold text-on-surface-variant">
                {module.type === "capstone" ? "Run the simulation" : "Pass the quiz (80%)"}
              </span>
              <span className="text-caption text-outline">Unlocks after the course</span>
            </span>
          </div>
        )}
      </div>

      {/* Content grid */}
      <div className="grid grid-cols-12 gap-gutter">
        {/* Media + meta */}
        <div className="col-span-12 lg:col-span-8">
          <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-xl bg-primary-container shadow-sm">
            <img
              src={module.image}
              alt={module.title}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div
              className="pointer-events-none absolute inset-0 opacity-75 mix-blend-multiply"
              style={{
                background: `linear-gradient(135deg, ${module.accent}, #0d1c32)`,
              }}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <MaterialIcon
              name={module.icon}
              className="relative text-8xl text-white/90 drop-shadow"
            />
            <div className="absolute bottom-6 left-6 text-white">
              <p className="text-label-md text-secondary-fixed">
                {module.code} · {module.type === "read" ? "Reading" : "Lesson + quiz"}
              </p>
              <p className="text-headline-md">{module.title}</p>
            </div>
          </div>

          {/* Watch — short explainer video */}
          {module.video && (
            <div className="mt-stack-lg overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest">
              <div className="flex items-center gap-2 px-stack-md py-3">
                <MaterialIcon name="play_circle" fill style={{ color: module.accent }} />
                <p className="text-label-md font-bold text-primary">
                  Watch: {module.video.title}
                </p>
                <span className="ml-auto text-caption text-outline">~3 min</span>
              </div>
              <div className="aspect-video w-full bg-black">
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube-nocookie.com/embed/${module.video.id}`}
                  title={module.video.title}
                  allow="accelerometer; encrypted-media; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>
          )}

          {/* STEP 1 — THE COURSE: this module's Library readings, first */}
          {moduleDocs.length > 0 && (
            <div className="mt-stack-lg rounded-xl border border-outline-variant bg-surface-container-lowest p-stack-lg">
              <div className="mb-1 flex items-center gap-2">
                <span className="rounded-full bg-primary-container px-3 py-1 text-caption font-bold uppercase tracking-widest text-white">Step 1</span>
                <span className="text-label-md font-bold text-primary">Read the course</span>
                <span className="ml-auto text-caption font-bold" style={{ color: module.accent }}>
                  {docsReadCount}/{moduleDocs.length} read
                </span>
              </div>
              <p className="mb-stack-md text-caption text-on-surface-variant">
                These readings are the course for this module — open each one. They unlock the games and the quiz.
              </p>
              <div className="grid grid-cols-1 gap-stack-md sm:grid-cols-2">
                {moduleDocs.map((d, i) => {
                  const isRead = module.status === "completed" || docsReadList.includes(d.doc);
                  return (
                    <Link
                      key={d.doc}
                      to={`/library/${d.doc}`}
                      className="lift group flex items-center gap-3 rounded-xl border border-outline-variant bg-white p-stack-md"
                    >
                      <span
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-white ${isRead ? "bg-emerald-500" : ""}`}
                        style={isRead ? undefined : { background: module.accent }}
                      >
                        <MaterialIcon name={isRead ? "check" : d.icon ?? "menu_book"} fill={isRead} className="text-[22px]" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-label-md font-semibold text-primary group-hover:text-secondary">
                          {i + 1}. {d.title}
                        </span>
                        <span className={`text-caption ${isRead ? "font-bold text-emerald-600" : "text-on-surface-variant"}`}>
                          {isRead ? "Read ✓" : "Not read yet — open it"}
                        </span>
                      </span>
                      <MaterialIcon name="arrow_forward" className="shrink-0 text-outline group-hover:text-secondary" />
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          <div className="mt-stack-lg flex items-center gap-2">
            <span className="rounded-full bg-primary-container px-3 py-1 text-caption font-bold uppercase tracking-widest text-white">Step 1</span>
            <span className="text-label-md font-bold text-primary">Then the lesson — sections tick as you scroll</span>
            <MaterialIcon name="arrow_downward" className="text-[18px] text-secondary" />
          </div>
          <div id="lesson-notes" className="mt-2 scroll-mt-24 overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest">
            <div className="flex border-b border-outline-variant">
              <button
                onClick={() => setTab("notes")}
                className={`flex-1 py-4 text-label-md transition-colors ${
                  tab === "notes"
                    ? "border-b-2 border-primary bg-surface-container-low text-primary"
                    : "text-on-surface-variant hover:bg-surface-container-low"
                }`}
              >
                📖 The Lesson
              </button>
              <button
                onClick={() => setTab("objectives")}
                className={`flex-1 py-4 text-label-md transition-colors ${
                  tab === "objectives"
                    ? "border-b-2 border-primary bg-surface-container-low text-primary"
                    : "text-on-surface-variant hover:bg-surface-container-low"
                }`}
              >
                Objectives
              </button>
            </div>

            <div className="p-stack-lg">
              {tab === "notes" ? (
                <>
                  {module.tldr && (
                    <div
                      className="mb-4 rounded-xl border p-stack-md"
                      style={{
                        borderColor: `${module.accent}55`,
                        background: `${module.accent}0d`,
                      }}
                    >
                      <p className="mb-1 flex items-center gap-1.5 text-caption font-bold uppercase tracking-widest" style={{ color: module.accent }}>
                        <MaterialIcon name="wb_incandescent" className="text-[16px]" />
                        In plain words
                      </p>
                      <p className="text-body-md leading-relaxed text-on-surface">
                        {module.tldr}
                      </p>
                    </div>
                  )}
                  <p className="mb-6 text-body-md leading-relaxed text-on-surface-variant">
                    {module.overview}
                  </p>
                  {module.glossary?.length > 0 && (
                    <GlossaryChips glossary={module.glossary} accent={module.accent} />
                  )}

                  {module.lesson?.length > 0 && (
                    <div className="mb-4">
                      <div className="mb-1 flex items-center justify-between text-caption text-on-surface-variant">
                        <span>Your reading — sections tick automatically as you scroll</span>
                        <span className="font-semibold" style={{ color: module.accent }}>
                          {module.lesson.filter((s) => readSections.includes(s.heading)).length}
                          /{module.lesson.length} sections read
                        </span>
                      </div>
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-container-high">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${(module.lesson.filter((s) => readSections.includes(s.heading)).length / module.lesson.length) * 100}%`,
                            background: module.accent,
                          }}
                        />
                      </div>
                    </div>
                  )}
                  {module.lesson?.map((section) => (
                    <div key={section.heading} data-sec={section.heading} className="mb-6">
                      <h3 className="mb-2 flex items-center gap-2 text-label-md font-bold uppercase tracking-wide text-primary">
                        <span
                          className="h-2.5 w-2.5 rounded-full"
                          style={{ background: module.accent }}
                        />
                        <span className="flex-1">{section.heading}</span>
                        <button
                          onClick={() => toggleRead(section.heading)}
                          title={
                            readSections.includes(section.heading)
                              ? "Read — tap to unmark"
                              : "Mark this section as read"
                          }
                          className="shrink-0 transition-transform active:scale-90"
                        >
                          <MaterialIcon
                            name="check_circle"
                            fill={readSections.includes(section.heading)}
                            className={`text-[20px] ${
                              readSections.includes(section.heading)
                                ? "text-emerald-500"
                                : "text-outline-variant hover:text-emerald-400"
                            }`}
                          />
                        </button>
                      </h3>
                      {section.body && (
                        <p className="text-body-md leading-relaxed text-on-surface-variant">
                          {section.body}
                        </p>
                      )}
                      {section.points && (
                        <ul className="mt-2 space-y-2">
                          {section.points.map((p) => (
                            <li key={p} className="flex items-start gap-2">
                              <MaterialIcon
                                name="chevron_right"
                                className="mt-0.5 text-[16px]"
                                style={{ color: module.accent }}
                              />
                              <span className="text-body-md text-on-surface-variant">
                                {p}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}
                      {section.image && (
                        <figure className="mt-3">
                          <div className="h-40 w-full overflow-hidden rounded-lg border border-outline-variant bg-surface-container">
                            <img
                              src={section.image}
                              alt={section.caption ?? section.heading}
                              loading="lazy"
                              className="h-full w-full object-cover"
                            />
                          </div>
                          {section.caption && (
                            <figcaption className="mt-1.5 text-caption italic text-outline">
                              {section.caption}
                            </figcaption>
                          )}
                        </figure>
                      )}
                    </div>
                  ))}

                  {module.quote && (
                    <div className="mb-2 border-l-4 border-secondary bg-surface-container px-4 py-3">
                      <p className="text-body-md italic text-on-surface">
                        “{module.quote}”
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <h3 className="mb-4 text-headline-md text-on-background">
                    Learning objectives
                  </h3>
                  <ul className="space-y-3">
                    {module.objectives?.map((o) => (
                      <li key={o} className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                        <span className="text-body-md text-on-surface-variant">{o}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>



          {/* Practice & apply — locked until the reading is finished, so the
              order is always: read, then play, then quiz. */}
          {module.activities?.length > 0 && (
            <div id="practice" className="mt-stack-lg scroll-mt-24 rounded-xl border border-outline-variant bg-surface-container-lowest p-stack-lg">
              <div className="mb-1 flex items-center gap-2">
                <span className="rounded-full bg-primary-container px-3 py-1 text-caption font-bold uppercase tracking-widest text-white">Step 2</span>
                <span className="text-label-md font-bold text-primary">Practice with the games — not graded</span>
              </div>
              {readingDone ? (
                <>
                  <h2 className="mb-stack-md text-headline-md text-primary">
                    Practice &amp; apply
                  </h2>
                  <div className="space-y-stack-lg">
                    {module.activities.map((a, i) => (
                      <div
                        key={i}
                        className={
                          i > 0 ? "border-t border-outline-variant pt-stack-lg" : ""
                        }
                      >
                        {renderActivity(a, module.accent)}
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center gap-3 rounded-xl border-2 border-dashed border-outline-variant bg-surface-container-low px-stack-md py-stack-lg text-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-surface-container-high text-outline">
                    <MaterialIcon name="lock" className="text-3xl" />
                  </span>
                  <p className="text-label-md font-bold text-primary">
                    The games unlock when the course is read
                  </p>
                  <p className="max-w-sm text-caption text-on-surface-variant">
                    {moduleDocs.length > 0 ? `Readings: ${docsReadCount}/${moduleDocs.length} opened · ` : ""}Lesson: {readCount}/{module.lesson?.length ?? 0} sections — open every reading above and scroll the lesson to the end.
                  </p>
                  <a
                    href="#lesson-notes"
                    className="mt-1 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-label-md font-bold text-on-primary transition-opacity hover:opacity-90"
                  >
                    <MaterialIcon name="menu_book" className="text-[18px]" /> Continue the course
                  </a>
                </div>
              )}
            </div>
          )}
          <Discussion moduleId={module.id} accent={module.accent} />

          {/* Bottom CTA — finish the module without scrolling back up */}
          {module.status !== "completed" && (
            <div className="mt-stack-lg rounded-xl bg-gradient-to-r from-primary-container to-[#1c3a63] p-stack-lg text-center text-white">
              <span className="rounded-full bg-white/15 px-3 py-1 text-caption font-bold uppercase tracking-widest text-secondary-fixed">Step 3</span>
              <p className="mt-2 text-headline-md">{module.type === "capstone" ? "Run the simulation" : "Take the quiz"}</p>
              <p className="mx-auto mt-1 max-w-md text-body-md text-white/80">
                {module.type === "capstone"
                  ? "Run the simulation — 10 good calls out of 12 keeps the financing flowing."
                  : "Score 80% on the quiz to complete this module and unlock the next one."}
              </p>
              {readingDone ? (
                <button
                  onClick={() => navigate(module.type === "capstone" ? "/capstone" : `/quiz/${module.id}`)}
                  className="mt-stack-md inline-flex items-center gap-2 rounded-lg bg-secondary-container px-10 py-3.5 text-label-md font-bold text-on-secondary-container transition-transform hover:opacity-90 active:scale-95"
                >
                  <MaterialIcon name={module.type === "capstone" ? "sports_esports" : "quiz"} />
                  {module.type === "capstone" ? "Launch the simulation" : "Take the quiz"}
                </button>
              ) : (
                <a
                  href="#lesson-notes"
                  className="mt-stack-md inline-flex items-center gap-2 rounded-lg border-2 border-dashed border-white/40 px-10 py-3.5 text-label-md font-bold text-white/90 transition-colors hover:bg-white/10"
                >
                  <MaterialIcon name="lock" />
                  Finish the course first{moduleDocs.length > 0 ? ` — readings ${docsReadCount}/${moduleDocs.length}` : ""} · sections {readCount}/{module.lesson.length}
                </a>
              )}
            </div>
          )}
        </div>

        {/* Sidebar: notes / transcript + progress */}
        <div className="col-span-12 space-y-gutter lg:col-span-4">
          {/* Progress card */}
          <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-stack-md">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-label-md text-primary">Course Progress</span>
              <span className="text-label-md text-secondary">{progress.percent}%</span>
            </div>
            <div className="mb-4 h-1.5 w-full overflow-hidden rounded-full bg-surface-container">
              <div
                className="h-full bg-secondary-container transition-[width] duration-700"
                style={{ width: `${progress.percent}%` }}
              />
            </div>
            <p className="text-caption text-on-surface-variant">
              {progress.completed} of {progress.total} modules completed in{" "}
              <strong>the Sustainability Pathway</strong>.
            </p>
          </div>

          {/* Complete action */}
          <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-stack-md">
            {module.status === "completed" ? (
              <div className="flex items-center gap-2 text-label-md font-bold text-secondary">
                <MaterialIcon name="check_circle" fill /> Module completed
              </div>
            ) : module.type === "read" ? (
              <button
                onClick={() => {
                  completeModule(module.id);
                  navigate("/course");
                }}
                className="w-full bg-primary py-3 text-label-md text-on-primary transition-opacity hover:opacity-90"
              >
                Mark as read & complete
              </button>
            ) : module.type === "capstone" ? (
              <button
                onClick={() => navigate("/capstone")}
                className="flex w-full items-center justify-center gap-2 bg-primary py-3 text-label-md text-on-primary transition-opacity hover:opacity-90"
              >
                <MaterialIcon name="sports_esports" /> Launch the capstone
              </button>
            ) : (
              <button
                onClick={() => {
                  if (!readingDone) {
                    showToast(`Finish the course first — readings ${docsReadCount}/${moduleDocs.length}, sections ${readCount}/${module.lesson.length}`);
                    return;
                  }
                  navigate(`/quiz/${module.id}`);
                }}
                className={`flex w-full items-center justify-center gap-2 py-3 text-label-md transition-opacity ${readingDone ? "bg-primary text-on-primary hover:opacity-90" : "cursor-not-allowed bg-surface-container-high text-on-surface-variant"}`}
              >
                <MaterialIcon name={readingDone ? "quiz" : "lock"} />
                {readingDone ? "Take the quiz to complete" : "Finish the course first"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Tap-to-reveal jargon buster: each chip flips open to show the term in
// plain language. Keeps beginners moving without a trip to a glossary page.
function GlossaryChips({ glossary, accent }) {
  const [open, setOpen] = useState(null);
  return (
    <div className="mb-6">
      <p className="mb-2 flex items-center gap-1.5 text-caption font-bold uppercase tracking-widest text-on-surface-variant">
        <MaterialIcon name="translate" className="text-[16px]" style={{ color: accent }} />
        Jargon buster — tap a word
      </p>
      <div className="flex flex-wrap gap-1.5">
        {glossary.map((g, i) => (
          <button
            key={g.term}
            onClick={() => setOpen(open === i ? null : i)}
            className={`rounded-full border px-3 py-1 text-caption font-semibold transition-all ${
              open === i
                ? "text-white"
                : "border-outline-variant bg-white text-on-surface hover:border-secondary"
            }`}
            style={open === i ? { background: accent, borderColor: accent } : {}}
          >
            {g.term}
          </button>
        ))}
      </div>
      {open != null && (
        <div
          className="animate-fade-up mt-2 rounded-lg border p-3"
          style={{ borderColor: `${accent}55`, background: `${accent}0d` }}
        >
          <p className="text-caption leading-relaxed text-on-surface">
            <strong style={{ color: accent }}>{glossary[open].term}</strong>{" "}
            — {glossary[open].plain}
          </p>
        </div>
      )}
    </div>
  );
}
