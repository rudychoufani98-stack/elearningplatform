import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MaterialIcon from "../components/MaterialIcon.jsx";
import { useCourse, statusMeta } from "../CourseContext.jsx";
import { AnimatedNumber } from "../useCountUp.jsx";
import { course } from "../data.js";

export default function DashboardPage() {
  const navigate = useNavigate();
  const { modules, progress } = useCourse();

  // Drives mount animations (bars grow, ring fills).
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(t);
  }, []);

  const current =
    modules.find((m) => m.status === "in_progress") ||
    modules.find((m) => m.status === "not_started") ||
    modules[0];

  const upNext = modules.filter((m) => m.status !== "completed").slice(0, 3);
  const scored = modules.filter((m) => m.score && m.score.total);

  // Circular ring geometry (r = 58).
  const r = 58;
  const circumference = 2 * Math.PI * r;
  const dashoffset = mounted ? circumference * (1 - progress.percent / 100) : circumference;

  return (
    <div className="mx-auto max-w-[1280px] px-margin-mobile py-stack-lg md:px-margin-desktop">
      {/* Welcome */}
      <section className="mb-stack-lg animate-fade-up">
        <h1 className="mb-2 text-headline-lg text-primary md:text-headline-xl">
          Welcome back, {course.learner}.
        </h1>
        <p className="text-body-lg text-on-surface-variant">
          You have completed{" "}
          <AnimatedNumber
            value={progress.percent}
            suffix="%"
            className="font-bold text-secondary"
          />{" "}
          of your “{course.title}” certification.
        </p>
      </section>

      {/* Bento grid */}
      <div className="grid grid-cols-1 gap-gutter lg:grid-cols-12">
        {/* Performance chart */}
        <div className="group relative overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest p-stack-lg shadow-sm transition-colors hover:border-secondary lg:col-span-8">
          <div className="mb-stack-lg flex items-center justify-between">
            <h3 className="text-headline-md text-primary">Quiz Performance</h3>
            <span className="text-caption text-on-surface-variant">
              score as % of max points
            </span>
          </div>
          <div className="relative h-64 border-b border-l border-outline-variant chart-grid">
            <div className="absolute inset-0 flex items-end justify-around gap-3 px-4 pb-px">
              {scored.map((m, i) => {
                const pct = Math.round((m.score.earned / m.score.total) * 100);
                return (
                  <div
                    key={m.id}
                    className="flex h-full flex-1 flex-col items-center justify-end"
                    title={`${m.code} — ${m.title}: ${m.score.earned}/${m.score.total}`}
                  >
                    <div className="flex w-full flex-1 items-end justify-center">
                      <div
                        className="w-8 origin-bottom rounded-t-sm transition-[height,transform] duration-700 ease-out hover:scale-x-110 hover:brightness-110"
                        style={{
                          height: `${mounted ? Math.max(pct, 3) : 0}%`,
                          background: m.accent,
                          transitionDelay: `${i * 70}ms`,
                        }}
                      />
                    </div>
                    <span className="mt-2 text-caption font-semibold text-on-surface-variant">
                      {m.code}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Up next */}
        <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-stack-lg shadow-sm transition-colors hover:border-secondary lg:col-span-4">
          <h3 className="mb-stack-md text-headline-md text-primary">
            Up next in your path
          </h3>
          <div className="space-y-stack-md">
            {upNext.map((m) => {
              const meta = statusMeta(m);
              return (
                <Link
                  key={m.id}
                  to={`/module/${m.id}`}
                  className="group flex gap-stack-md border-b border-surface-container pb-stack-sm"
                >
                  <div
                    className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-lg text-white transition-transform group-hover:scale-105"
                    style={{ background: m.accent }}
                  >
                    <MaterialIcon name={m.icon} className="text-[22px]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-label-md text-primary group-hover:text-secondary">
                      {m.title}
                    </p>
                    <p className="flex items-center gap-1 text-caption text-on-surface-variant">
                      <MaterialIcon
                        name={meta.icon}
                        className={`text-[14px] ${meta.iconClass}`}
                      />
                      {m.duration} · {m.type}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
          <Link
            to="/course"
            className="mt-stack-md flex w-full items-center justify-center gap-1 text-caption font-bold text-primary hover:underline"
          >
            View full syllabus <MaterialIcon name="open_in_new" className="text-sm" />
          </Link>
        </div>

        {/* Current course progress */}
        <div className="relative flex flex-col items-center gap-gutter overflow-hidden rounded-xl bg-primary-container p-stack-lg text-on-primary-container md:flex-row lg:col-span-12">
          <div className="pointer-events-none absolute right-0 top-0 h-full w-1/3 opacity-10">
            <svg className="h-full w-full fill-secondary-container" viewBox="0 0 200 200">
              <path
                d="M47.7,-62.3C59.9,-54.6,66.6,-38.4,70.5,-22C74.3,-5.7,75.3,10.8,69.5,25C63.7,39.1,51.1,51,36.5,59.3C21.9,67.6,5.3,72.3,-11.6,70.1C-28.5,67.9,-45.7,58.8,-57.8,45C-69.8,31.2,-76.6,12.7,-75,-5.1C-73.4,-22.9,-63.3,-40,-48.9,-48.1C-34.4,-56.3,-15.7,-55.5,1.9,-58C19.5,-60.5,35.5,-70,47.7,-62.3Z"
                transform="translate(100 100)"
              />
            </svg>
          </div>

          <div className="md:w-1/4">
            <div className="relative mx-auto h-32 w-32">
              <svg className="h-full w-full -rotate-90" viewBox="0 0 128 128">
                <circle
                  className="text-on-primary-fixed-variant"
                  cx="64"
                  cy="64"
                  r={r}
                  fill="transparent"
                  stroke="currentColor"
                  strokeWidth="8"
                />
                <circle
                  cx="64"
                  cy="64"
                  r={r}
                  fill="transparent"
                  stroke="#fed65b"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={dashoffset}
                  style={{ transition: "stroke-dashoffset 1.1s ease" }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <AnimatedNumber
                  value={progress.percent}
                  suffix="%"
                  className="text-2xl font-bold text-white"
                />
              </div>
            </div>
          </div>

          <div className="flex-1 text-center md:text-left">
            <span className="mb-2 inline-block rounded bg-secondary px-3 py-1 text-label-md text-on-secondary">
              IN PROGRESS
            </span>
            <h3 className="mb-2 text-headline-md text-white">{course.title}</h3>
            <p className="mb-4 max-w-xl text-body-md text-on-primary-container">
              {course.subtitle} — {course.overview.split(".")[0]}.
            </p>
            <div className="flex flex-wrap justify-center gap-4 md:justify-start">
              <span className="flex items-center gap-1 text-caption">
                <MaterialIcon name="schedule" className="text-sm" /> {course.duration}
              </span>
              <span className="flex items-center gap-1 text-caption">
                <MaterialIcon name="menu_book" className="text-sm" />{" "}
                {progress.completed}/{progress.total} modules
              </span>
              <span className="flex items-center gap-1 text-caption">
                <MaterialIcon name="workspace_premium" className="text-sm" />{" "}
                {course.accreditation}
              </span>
            </div>
          </div>

          <div className="w-full md:w-auto">
            <button
              onClick={() => navigate(`/module/${current.id}`)}
              className="w-full whitespace-nowrap rounded bg-secondary-container px-8 py-3 font-bold text-on-secondary-container shadow-sm transition-transform hover:opacity-90 active:scale-95 md:w-auto"
            >
              Resume {current.code}
            </button>
          </div>
        </div>

        {/* Continue your path */}
        <div className="mt-stack-md lg:col-span-12">
          <h3 className="text-headline-md text-primary">Continue your path</h3>
        </div>

        {modules.slice(0, 3).map((m) => {
          const meta = statusMeta(m);
          return (
            <Link
              key={m.id}
              to={`/module/${m.id}`}
              className="lift group overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest shadow-sm lg:col-span-4"
            >
              <div className="relative h-36 overflow-hidden">
                <img
                  src={m.image}
                  alt={m.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div
                  className="absolute inset-0 opacity-80 mix-blend-multiply"
                  style={{
                    background: `linear-gradient(135deg, ${m.accent}, #0d1c32)`,
                  }}
                />
                <MaterialIcon
                  name={m.icon}
                  className="absolute inset-0 flex items-center justify-center text-5xl text-white/95 drop-shadow"
                  style={{ display: "flex" }}
                />
              </div>
              <div className="p-stack-md">
                <span
                  className="text-caption font-bold uppercase tracking-wider"
                  style={{ color: m.accent }}
                >
                  {m.order} · {m.code}
                </span>
                <h4 className="mt-1 text-headline-md text-primary">{m.title}</h4>
                <p className="mt-2 line-clamp-2 text-body-md text-on-surface-variant">
                  {m.summary}
                </p>
                <div className="mt-4 flex items-center justify-between border-t border-surface-container pt-4">
                  <span className="flex items-center gap-1 text-caption text-on-surface-variant">
                    <MaterialIcon
                      name={meta.icon}
                      className={`text-[16px] ${meta.iconClass}`}
                    />
                    {meta.label}
                  </span>
                  <MaterialIcon
                    name="arrow_forward"
                    className="text-primary transition-transform group-hover:translate-x-1"
                  />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
