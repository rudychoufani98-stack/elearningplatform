import { useState } from "react";
import { Link } from "react-router-dom";
import MaterialIcon from "../components/MaterialIcon.jsx";
import Confetti from "../components/Confetti.jsx";
import { capstoneSim } from "../data.js";
import { useCourse, isUnlocked } from "../CourseContext.jsx";

// One scene-setting photo per decision, in step order.
const STEP_IMAGES = [
  "/images/esg-pollution.jpg", // washout / discharge
  "/images/lm4.jpg", // workers on site
  "/images/esg-social.jpg", // community
  "/images/lm8.jpg", // the street
  "/images/esg-reporting.jpg", // the report
  "/images/esg-governance.jpg", // community elder meeting
  "/images/lm9.jpg", // IESC site visit
  "/images/lm11.jpg", // waste piling up
  "/images/lm13.jpg", // scaffolding / working at height
  "/images/lm2.jpg", // the standards
  "/images/esg-reporting.jpg", // the hidden-report call
  "/images/esg-social.jpg", // the zero-grievances call
];

// The capstone (Module 6): ten ESG decisions that together decide if the
// financing holds. Unlocks only once Module 5 is complete.
export default function CapstonePage() {
  const { modules, completeModule } = useCourse();
  const module = modules.find((m) => m.id === "m6");
  const locked = module ? !isUnlocked(modules, module) : false;
  const prev = modules.find((m) => m.id === "m5");

  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState(null);
  const [good, setGood] = useState(0);
  const [done, setDone] = useState(false);

  const total = capstoneSim.steps.length;
  const s = capstoneSim.steps[step];
  const isLast = step === total - 1;
  // Financing health: starts at 60%, each answered step nudges it.
  const answeredCount = done ? total : step + (picked != null ? 1 : 0);
  const health = Math.max(
    0,
    Math.min(100, 60 + good * 12 - (answeredCount - good) * 18)
  );
  const passed = good >= capstoneSim.passNeeded;

  function choose(i) {
    if (picked != null) return;
    setPicked(i);
    if (s.options[i].good) setGood((g) => g + 1);
  }
  function next() {
    if (isLast) {
      setDone(true);
      if (good >= capstoneSim.passNeeded) completeModule("m6", good);
      return;
    }
    setStep((n) => n + 1);
    setPicked(null);
  }
  function restart() {
    setStep(0);
    setPicked(null);
    setGood(0);
    setDone(false);
  }

  const chosen = picked != null ? s.options[picked] : null;

  if (locked) {
    return (
      <div className="mx-auto max-w-[760px] px-margin-mobile py-stack-lg md:px-margin-desktop">
        <nav className="mb-stack-md flex items-center gap-2 text-caption text-outline">
          <Link to="/" className="hover:text-primary">Home</Link>
          <MaterialIcon name="chevron_right" className="text-[14px]" />
          <span className="text-on-surface">Capstone simulation</span>
        </nav>
        <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-stack-lg text-center">
          <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-surface-container-high text-outline">
            <MaterialIcon name="lock" fill className="text-3xl" />
          </div>
          <h1 className="text-headline-md text-primary">Capstone locked</h1>
          <p className="mx-auto mt-2 max-w-sm text-body-md text-on-surface-variant">
            The capstone is the final module. Complete{" "}
            {prev ? prev.code : "the previous module"} — {prev?.title} — to
            unlock it.
          </p>
          <Link
            to={prev ? `/module/${prev.id}` : "/course"}
            className="mt-stack-lg inline-flex items-center justify-center gap-2 bg-primary px-8 py-3 text-label-md text-on-primary transition-transform hover:opacity-90 active:scale-95"
          >
            Go to {prev ? prev.code : "the course"}
            <MaterialIcon name="arrow_forward" className="text-[18px]" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[760px] px-margin-mobile py-stack-lg md:px-margin-desktop">
      <nav className="mb-stack-md flex items-center gap-2 text-caption text-outline">
        <Link to="/" className="hover:text-primary">Home</Link>
        <MaterialIcon name="chevron_right" className="text-[14px]" />
        <span className="text-on-surface">Capstone simulation</span>
      </nav>

      <h1 className="mb-1 text-headline-lg text-primary md:text-headline-xl">
        Capstone: keep the financing flowing
      </h1>
      <p className="mb-stack-lg text-body-lg text-on-surface-variant">
        {total} ESG decisions on a live PPP project. Make at least{" "}
        {capstoneSim.passNeeded} good calls to keep the lenders on side.
      </p>

      {/* Financing health meter */}
      <div className="mb-stack-lg rounded-xl border border-outline-variant bg-surface-container-lowest p-stack-md">
        <div className="mb-2 flex items-center justify-between text-label-md">
          <span className="flex items-center gap-1 text-primary">
            <MaterialIcon name="account_balance" className="text-[18px]" /> Financing health
          </span>
          <span className="font-bold" style={{ color: health >= 60 ? "#10b981" : health >= 40 ? "#f59e0b" : "#f43f5e" }}>
            {health}%
          </span>
        </div>
        <div className="h-3 w-full overflow-hidden rounded-full bg-surface-container-high">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${health}%`, background: health >= 60 ? "#10b981" : health >= 40 ? "#f59e0b" : "#f43f5e" }}
          />
        </div>
      </div>

      {done ? (
        <div className="animate-pop relative overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest p-stack-lg text-center shadow-xl">
          {passed && <Confetti />}
          <div
            className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full text-white"
            style={{ background: passed ? "#10b981" : "#f43f5e" }}
          >
            <MaterialIcon name={passed ? "verified" : "gpp_bad"} fill className="text-3xl" />
          </div>
          <h2 className="text-headline-md text-primary">
            {passed ? "Financing approved" : "Financing withheld"}
          </h2>
          <p className="mx-auto mt-2 max-w-sm text-body-md text-on-surface-variant">
            You made {good} of {total} good ESG decisions.{" "}
            {passed
              ? "The lenders are confident — disbursements continue."
              : `You need ${capstoneSim.passNeeded} good calls. Restart and protect the project's ESG performance.`}
          </p>
          <div className="mt-stack-lg flex flex-col justify-center gap-stack-md sm:flex-row">
            <button
              onClick={restart}
              className="flex items-center justify-center gap-2 bg-primary px-8 py-3 text-label-md text-on-primary transition-transform hover:opacity-90 active:scale-95"
            >
              <MaterialIcon name="refresh" /> Run it again
            </button>
            <Link
              to="/course"
              className="flex items-center justify-center gap-2 border border-primary px-8 py-3 text-label-md text-primary transition-colors hover:bg-surface-container-low"
            >
              Back to the course
            </Link>
          </div>
        </div>
      ) : (
        <div className="ambient-shadow overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest">
          <div className="relative h-40 w-full overflow-hidden bg-surface-container">
            <img
              src={STEP_IMAGES[step % STEP_IMAGES.length]}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <p className="absolute bottom-3 left-4 text-caption font-bold uppercase tracking-widest text-white drop-shadow">
              Decision {step + 1} of {total}
            </p>
          </div>
          <div className="p-stack-lg">
          <h2 className="text-headline-md leading-snug text-primary">{s.prompt}</h2>

          <div className="mt-stack-md space-y-2">
            {s.options.map((o, i) => {
              const isChosen = picked === i;
              const reveal = picked != null;
              let cls = "border-outline-variant bg-white hover:border-secondary";
              if (reveal && isChosen)
                cls = o.good ? "border-emerald-500 bg-emerald-50" : "border-rose-400 bg-rose-50";
              else if (reveal) cls = "border-outline-variant opacity-60";
              return (
                <button
                  key={i}
                  onClick={() => choose(i)}
                  disabled={reveal}
                  className={`flex w-full items-center gap-3 rounded-lg border p-stack-md text-left text-body-md text-on-surface transition-all disabled:cursor-default ${cls}`}
                >
                  <span className="flex-1">{o.text}</span>
                  {reveal && isChosen && (
                    <MaterialIcon name={o.good ? "check_circle" : "cancel"} fill className={o.good ? "text-emerald-600" : "text-rose-500"} />
                  )}
                </button>
              );
            })}
          </div>

          {chosen && (
            <div
              className={`animate-fade-up mt-stack-md rounded-lg p-stack-md ${
                chosen.good ? "bg-emerald-50 text-emerald-900" : "bg-rose-50 text-rose-900"
              }`}
            >
              <p className="text-caption">{chosen.feedback}</p>
            </div>
          )}

          {picked != null && (
            <button
              onClick={next}
              className="mt-stack-md flex items-center gap-1 rounded-lg bg-primary px-6 py-3 text-label-md text-on-primary transition-opacity hover:opacity-90"
            >
              {isLast ? "See outcome" : "Next decision"}
              <MaterialIcon name="arrow_forward" className="text-[18px]" />
            </button>
          )}
          </div>
        </div>
      )}
    </div>
  );
}
