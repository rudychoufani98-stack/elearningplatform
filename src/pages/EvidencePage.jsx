import { Link } from "react-router-dom";
import MaterialIcon from "../components/MaterialIcon.jsx";
import { useCourse } from "../CourseContext.jsx";
import { course } from "../data.js";
import { useAuth } from "../AuthContext.jsx";

// Training-evidence register — completed modules logged as project record.
export default function EvidencePage() {
  const { modules, progress, acknowledgements, resetProgress } = useCourse();
  const { profile, user } = useAuth();
  const learnerName =
    profile?.full_name || user?.user_metadata?.full_name || user?.email?.split("@")[0] || course.learner;
  const completed = modules.filter((m) => m.status === "completed");

  return (
    <div className="mx-auto max-w-[1280px] px-margin-mobile py-stack-lg md:px-margin-desktop">
      <nav className="mb-stack-md flex items-center gap-2 text-caption text-outline">
        <Link to="/" className="hover:text-primary">
          Dashboard
        </Link>
        <MaterialIcon name="chevron_right" className="text-[14px]" />
        <span className="text-on-surface">Training Evidence</span>
      </nav>

      <div className="mb-stack-lg flex flex-col justify-between gap-stack-md md:flex-row md:items-start">
        <div>
          <h1 className="mb-2 text-headline-lg text-primary md:text-headline-xl">
            Training Evidence
          </h1>
          <p className="max-w-2xl text-body-lg text-on-surface-variant">
            Every completed module and signed declaration is logged here — name,
            score and date — as a record for the project's training-evidence
            register. Your progress is saved on this device.
          </p>
        </div>
        <button
          onClick={() => {
            if (
              window.confirm(
                "Reset all saved progress and acknowledgements on this device?"
              )
            )
              resetProgress();
          }}
          className="flex shrink-0 items-center gap-2 self-start rounded-lg border border-outline-variant px-4 py-2 text-label-md text-on-surface-variant transition-colors hover:border-error hover:text-error"
        >
          <MaterialIcon name="restart_alt" className="text-[18px]" /> Reset progress
        </button>
      </div>

      <div className="mb-stack-lg flex flex-wrap gap-gutter">
        <div className="rounded-xl border border-outline-variant bg-surface-container-lowest px-stack-lg py-stack-md">
          <p className="text-caption uppercase tracking-wider text-on-surface-variant">
            Modules complete
          </p>
          <p className="text-headline-lg text-primary">
            {progress.completed}
            <span className="text-headline-md text-outline">/{progress.total}</span>
          </p>
        </div>
        <div className="rounded-xl border border-outline-variant bg-surface-container-lowest px-stack-lg py-stack-md">
          <p className="text-caption uppercase tracking-wider text-on-surface-variant">
            Quiz points earned
          </p>
          <p className="text-headline-lg text-primary">
            {progress.earnedQuizPoints}
            <span className="text-headline-md text-outline">
              /{progress.totalQuizPoints}
            </span>
          </p>
        </div>
        <div className="rounded-xl border border-outline-variant bg-surface-container-lowest px-stack-lg py-stack-md">
          <p className="text-caption uppercase tracking-wider text-on-surface-variant">
            Declarations signed
          </p>
          <p className="text-headline-lg text-primary">{acknowledgements.length}</p>
        </div>
      </div>

      {/* Certificate — appears once the whole pathway is complete */}
      {progress.percent === 100 ? (
        <div className="relative mb-stack-lg overflow-hidden rounded-xl bg-gradient-to-br from-primary-container to-[#1c3a63] p-stack-lg text-white shadow-xl">
          <MaterialIcon
            name="workspace_premium"
            fill
            className="pointer-events-none absolute -right-6 -top-6 text-[160px] text-white/10"
          />
          <p className="text-caption font-bold uppercase tracking-widest text-secondary-fixed">
            Certificate of completion
          </p>
          <h2 className="mt-1 text-headline-lg">{learnerName}</h2>
          <p className="mt-1 max-w-xl text-body-md text-white/80">
            has completed all {progress.total} modules of “{course.title}” —
            passing every assessment and the capstone simulation.
          </p>
          <div className="mt-stack-md flex flex-wrap items-center gap-stack-md">
            <span className="flex items-center gap-1 text-caption text-white/80">
              <MaterialIcon name="event" className="text-[16px]" />
              {completed.map((m) => m.completedOn).filter(Boolean).sort().slice(-1)[0] ?? "—"}
            </span>
            <span className="flex items-center gap-1 text-caption text-white/80">
              <MaterialIcon name="stars" className="text-[16px]" />
              {progress.earnedQuizPoints}/{progress.totalQuizPoints} quiz points
            </span>
            <button
              onClick={() => window.print()}
              className="ml-auto flex items-center gap-2 rounded-lg bg-secondary-container px-5 py-2.5 text-label-md font-bold text-on-secondary-container transition-transform hover:opacity-90 active:scale-95"
            >
              <MaterialIcon name="print" className="text-[18px]" /> Print certificate
            </button>
          </div>
        </div>
      ) : (
        <div className="mb-stack-lg flex items-center gap-3 rounded-xl border border-dashed border-outline-variant bg-surface-container-low p-stack-md">
          <MaterialIcon name="workspace_premium" className="text-3xl text-outline" />
          <p className="text-body-md text-on-surface-variant">
            Complete all {progress.total} modules to unlock your{" "}
            <strong>certificate of completion</strong> —{" "}
            {progress.total - progress.completed} to go.
          </p>
        </div>
      )}

      {/* Completed modules — visual cards */}
      {completed.length > 0 && (
        <div className="mb-stack-lg grid grid-cols-1 gap-gutter sm:grid-cols-2 lg:grid-cols-3">
          {completed.map((m) => {
            const pct = m.score?.total
              ? Math.round((m.score.earned / m.score.total) * 100)
              : null;
            return (
              <div
                key={m.id}
                className="soft-shadow overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest"
              >
                <div className="relative h-24 overflow-hidden">
                  <img
                    src={m.image}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div
                    className="absolute inset-0 opacity-75 mix-blend-multiply"
                    style={{ background: `linear-gradient(135deg, ${m.accent}, #0d1c32)` }}
                  />
                  <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-emerald-500 px-2.5 py-0.5 text-caption font-bold text-white">
                    <MaterialIcon name="check" className="text-[14px]" /> Completed
                  </span>
                  {pct != null && (
                    <span className="absolute bottom-3 right-3 rounded-full bg-white/90 px-2.5 py-0.5 text-caption font-bold text-primary">
                      {pct}%
                    </span>
                  )}
                </div>
                <div className="p-stack-md">
                  <p className="text-caption font-bold uppercase tracking-wider" style={{ color: m.accent }}>
                    {m.code}
                  </p>
                  <p className="truncate text-label-md font-semibold text-primary">
                    {m.title}
                  </p>
                  <div className="mt-3 flex items-center gap-3">
                    <Link
                      to={`/module/${m.id}`}
                      className="text-caption font-bold text-secondary hover:underline"
                    >
                      Review
                    </Link>
                    {m.type === "quiz" && (
                      <Link
                        to={`/quiz/${m.id}`}
                        className="text-caption font-bold text-secondary hover:underline"
                      >
                        Retake quiz
                      </Link>
                    )}
                    {m.type === "capstone" && (
                      <Link
                        to="/capstone"
                        className="text-caption font-bold text-secondary hover:underline"
                      >
                        Replay
                      </Link>
                    )}
                    <span className="ml-auto text-caption text-outline">
                      {m.completedOn ?? ""}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="overflow-x-auto rounded-xl border border-outline-variant bg-surface-container-lowest">
        <table className="w-full min-w-[560px] text-left">
          <thead>
            <tr className="border-b border-outline-variant text-caption uppercase tracking-wider text-on-surface-variant">
              <th className="px-stack-md py-stack-sm font-semibold">Learner</th>
              <th className="px-stack-md py-stack-sm font-semibold">Module</th>
              <th className="px-stack-md py-stack-sm font-semibold">Score</th>
              <th className="px-stack-md py-stack-sm font-semibold">Date</th>
            </tr>
          </thead>
          <tbody>
            {completed.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-stack-md py-stack-lg text-center text-on-surface-variant">
                  No completed modules yet — finish a module to log evidence.
                </td>
              </tr>
            ) : (
              completed.map((m) => (
                <tr
                  key={m.id}
                  className="border-b border-surface-container last:border-0"
                >
                  <td className="px-stack-md py-stack-md text-body-md text-primary">
                    {learnerName}
                  </td>
                  <td className="px-stack-md py-stack-md text-body-md text-on-surface-variant">
                    {m.code} · {m.title}
                  </td>
                  <td className="px-stack-md py-stack-md text-body-md text-on-surface-variant">
                    {m.score ? `${m.score.earned}/${m.score.total}` : "Read"}
                  </td>
                  <td className="px-stack-md py-stack-md text-body-md text-on-surface-variant">
                    {m.completedOn ?? "—"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Signed declarations / acknowledgements */}
      <h2 className="mb-stack-md mt-stack-lg text-headline-md text-primary">
        Signed declarations
      </h2>
      <div className="overflow-x-auto rounded-xl border border-outline-variant bg-surface-container-lowest">
        <table className="w-full min-w-[560px] text-left">
          <thead>
            <tr className="border-b border-outline-variant text-caption uppercase tracking-wider text-on-surface-variant">
              <th className="px-stack-md py-stack-sm font-semibold">Signed by</th>
              <th className="px-stack-md py-stack-sm font-semibold">Document</th>
              <th className="px-stack-md py-stack-sm font-semibold">Date</th>
            </tr>
          </thead>
          <tbody>
            {acknowledgements.length === 0 ? (
              <tr>
                <td
                  colSpan={3}
                  className="px-stack-md py-stack-lg text-center text-on-surface-variant"
                >
                  No signed declarations yet — open a document in the Library and
                  confirm you've read it.
                </td>
              </tr>
            ) : (
              acknowledgements.map((a) => (
                <tr
                  key={a.id}
                  className="border-b border-surface-container last:border-0"
                >
                  <td className="px-stack-md py-stack-md text-body-md text-primary">
                    <span className="inline-flex items-center gap-1">
                      <MaterialIcon
                        name="verified"
                        fill
                        className="text-[16px] text-secondary"
                      />
                      {a.name}
                    </span>
                  </td>
                  <td className="px-stack-md py-stack-md text-body-md text-on-surface-variant">
                    {a.title}
                  </td>
                  <td className="px-stack-md py-stack-md text-body-md text-on-surface-variant">
                    {a.date}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
