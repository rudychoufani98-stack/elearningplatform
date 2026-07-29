import { Link, useNavigate } from "react-router-dom";
import MaterialIcon from "../components/MaterialIcon.jsx";
import { useCourse, statusMeta, isUnlocked } from "../CourseContext.jsx";
import { course, libraryItems } from "../data.js";

export default function CoursePage() {
  const navigate = useNavigate();
  const { modules, progress } = useCourse();

  const current =
    modules.find((m) => m.status === "in_progress") ||
    modules.find((m) => m.status === "not_started") ||
    modules[0];

  return (
    <div className="mx-auto max-w-[1280px] px-margin-mobile py-stack-lg md:px-margin-desktop">
      {/* Breadcrumb + header */}
      <section className="mb-stack-lg">
        <nav className="mb-stack-md flex items-center gap-2 text-caption text-outline">
          <Link to="/" className="hover:text-primary">
            Dashboard
          </Link>
          <MaterialIcon name="chevron_right" className="text-[14px]" />
          <span className="text-on-surface">{course.title}</span>
        </nav>

        {/* Hero banner */}
        <div className="relative mb-stack-lg h-48 overflow-hidden rounded-xl md:h-64">
          <img
            src={course.hero}
            alt="Public infrastructure skyline"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-container via-primary-container/50 to-transparent" />
          <div className="absolute bottom-0 left-0 p-stack-lg">
            <span className="text-label-md uppercase tracking-widest text-secondary-fixed">
              {course.subtitle}
            </span>
            <h2 className="mt-1 text-headline-md font-bold text-white md:text-headline-lg">
              Building E&amp;S performance into every project
            </h2>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-stack-lg lg:flex-row">
          <div className="flex-1">
            <h1 className="mb-4 text-headline-lg text-primary md:text-headline-xl">
              {course.title}
            </h1>
            <div className="flex flex-wrap items-center gap-stack-md text-label-md text-on-surface-variant">
              <span className="flex items-center gap-1">
                <MaterialIcon name="timer" className="text-[18px]" /> {course.duration}
              </span>
              <span className="flex items-center gap-1">
                <MaterialIcon name="signal_cellular_alt" className="text-[18px]" />{" "}
                {course.level}
              </span>
              <span className="flex items-center gap-1">
                <MaterialIcon name="workspace_premium" className="text-[18px]" />{" "}
                {course.accreditation}
              </span>
            </div>
          </div>

          {/* Progress / resume card */}
          <div className="flex w-full flex-col gap-stack-md border border-outline-variant bg-white p-stack-md custom-shadow lg:w-80">
            <div className="space-y-2">
              <div className="flex justify-between text-label-md">
                <span>Your Progress</span>
                <span>{progress.percent}%</span>
              </div>
              <div className="h-1 w-full overflow-hidden bg-surface-container-high">
                <div
                  className="h-full bg-secondary transition-[width] duration-700"
                  style={{ width: `${progress.percent}%` }}
                />
              </div>
              <p className="text-caption text-on-surface-variant">
                {progress.completed} of {progress.total} modules ·{" "}
                {progress.earnedQuizPoints}/{progress.totalQuizPoints} quiz points
              </p>
            </div>
            <button
              onClick={() => navigate(`/module/${current.id}`)}
              className="flex w-full items-center justify-center gap-2 bg-primary py-4 text-label-md text-on-primary transition-opacity hover:opacity-90"
            >
              <MaterialIcon name="play_arrow" /> RESUME LEARNING
            </button>
          </div>
        </div>
      </section>

      {/* Bento content */}
      <section className="grid grid-cols-1 gap-gutter lg:grid-cols-12">
        {/* Main column */}
        <div className="space-y-gutter lg:col-span-8">
          {/* Overview */}
          <div className="border border-outline-variant bg-white p-stack-lg">
            <h3 className="mb-stack-md border-b border-outline-variant pb-2 text-headline-md">
              Course Overview
            </h3>
            <p className="max-w-[720px] text-body-lg text-on-surface-variant">
              {course.overview}
            </p>
          </div>

          {/* Syllabus */}
          <div className="border border-outline-variant bg-white p-stack-lg">
            <h3 className="mb-stack-md border-b border-outline-variant pb-2 text-headline-md">
              Module Syllabus
            </h3>
            <div className="space-y-4">
              {modules.map((m) => {
                const isCurrent = m.status === "in_progress";
                const unlocked = isUnlocked(modules, m);
                const locked = !unlocked;
                return (
                  <div
                    key={m.id}
                    className={`relative flex items-start gap-4 overflow-hidden p-4 ${
                      isCurrent
                        ? "border-2 border-secondary bg-white"
                        : locked
                        ? "border border-outline-variant bg-white opacity-60"
                        : "border border-outline-variant bg-surface-container-low"
                    }`}
                  >
                    {isCurrent && (
                      <div
                        className="absolute bottom-0 left-0 top-0 w-1"
                        style={{ background: m.accent }}
                      />
                    )}
                    <div
                      className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                      style={
                        locked
                          ? { background: "#e6e8ea", color: "#8a8f96" }
                          : { background: `${m.accent}1a`, color: m.accent }
                      }
                    >
                      <MaterialIcon
                        name={locked ? "lock" : m.icon}
                        className="text-[22px]"
                      />
                      {m.status === "completed" && (
                        <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-secondary text-white">
                          <MaterialIcon name="check" className="text-[12px]" fill />
                        </span>
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-label-md text-primary">
                        {String(m.order).padStart(2, "0")}: {m.title}
                      </h4>
                      <p className="text-caption text-on-surface-variant">
                        {m.summary}
                      </p>
                      {isCurrent && (
                        <div className="mt-4 flex items-center gap-2">
                          <button
                            onClick={() => navigate(`/module/${m.id}`)}
                            className="bg-primary px-4 py-1 text-caption font-bold text-on-primary"
                          >
                            RESUME
                          </button>
                          {m.progress && (
                            <span className="self-center text-caption text-outline">
                              {m.progress.current} of {m.progress.total} sections
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    {m.status === "completed" && (
                      <span className="text-caption font-bold uppercase text-secondary">
                        Completed
                      </span>
                    )}
                    {locked && (
                      <span className="flex items-center gap-1 self-center text-caption font-bold uppercase text-outline">
                        <MaterialIcon name="lock" className="text-[14px]" /> Locked
                      </span>
                    )}
                    {!locked && m.status !== "completed" && !isCurrent && (
                      <Link
                        to={`/module/${m.id}`}
                        className="self-center text-caption font-bold text-primary hover:underline"
                      >
                        Open
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sidebar column */}
        <div className="space-y-gutter lg:col-span-4">
          {/* What's included — the Library */}
          <div className="border border-outline-variant bg-primary-container p-stack-lg text-on-primary-container">
            <h3 className="mb-stack-md text-label-md uppercase tracking-widest opacity-70">
              The Library — what's included
            </h3>
            <ul className="space-y-4">
              {libraryItems.slice(0, 5).map((item) => (
                <li key={item.title} className="flex items-center gap-3">
                  <MaterialIcon name={item.icon} className="text-secondary-fixed" />
                  <span className="text-body-md text-white/90">{item.title}</span>
                </li>
              ))}
            </ul>
            <Link
              to="/library"
              className="mt-stack-md inline-flex items-center gap-1 text-label-md text-secondary-fixed hover:underline"
            >
              Browse the full library <MaterialIcon name="arrow_forward" className="text-sm" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
