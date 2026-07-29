import { useState } from "react";
import MaterialIcon from "../MaterialIcon.jsx";

// A guided branching scenario: a situation → pick an action → see the
// consequence → continue. Reinforces judgment, not just recall.
export default function ScenarioActivity({ activity, accent = "#0d1c32" }) {
  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState(null);
  const [goodCount, setGoodCount] = useState(0);
  const [done, setDone] = useState(false);

  const s = activity.steps[step];
  const isLast = step === activity.steps.length - 1;

  function choose(i) {
    if (picked !== null) return;
    setPicked(i);
    if (s.options[i].outcome === "good") setGoodCount((n) => n + 1);
  }

  function next() {
    if (isLast) {
      setDone(true);
      return;
    }
    setStep((n) => n + 1);
    setPicked(null);
  }

  function restart() {
    setStep(0);
    setPicked(null);
    setGoodCount(0);
    setDone(false);
  }

  if (done) {
    return (
      <div className="rounded-lg border border-outline-variant bg-white p-stack-lg text-center">
        <div
          className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full text-white"
          style={{ background: accent }}
        >
          <MaterialIcon name="workspace_premium" fill />
        </div>
        <h3 className="text-headline-md text-primary">Scenario complete</h3>
        <p className="mt-1 text-body-md text-on-surface-variant">
          You made {goodCount} of {activity.steps.length} best-practice decisions.
        </p>
        <button
          onClick={restart}
          className="mt-stack-md inline-flex items-center gap-1 text-label-md font-bold text-secondary hover:underline"
        >
          <MaterialIcon name="refresh" className="text-[18px]" /> Try again
        </button>
      </div>
    );
  }

  const chosen = picked !== null ? s.options[picked] : null;

  return (
    <div>
      <h3 className="flex items-center gap-2 text-label-md font-bold uppercase tracking-wide text-primary">
        <MaterialIcon name="alt_route" style={{ color: accent }} />
        {activity.title}
      </h3>

      {step === 0 && activity.intro && (
        <p className="mt-2 rounded-lg bg-surface-container px-4 py-3 text-body-md italic text-on-surface">
          {activity.intro}
        </p>
      )}

      <p className="mt-stack-md text-body-md font-semibold text-on-surface">
        {s.prompt}
      </p>

      <div className="mt-stack-md space-y-2">
        {s.options.map((o, i) => {
          const isChosen = picked === i;
          const reveal = picked !== null;
          let cls = "border-outline-variant bg-white hover:border-secondary";
          if (reveal && isChosen)
            cls =
              o.outcome === "good"
                ? "border-emerald-400 bg-emerald-50"
                : "border-rose-300 bg-rose-50";
          else if (reveal) cls = "border-outline-variant opacity-60";
          return (
            <button
              key={o.text}
              onClick={() => choose(i)}
              disabled={reveal}
              className={`flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-left text-body-md transition-all disabled:cursor-default ${cls}`}
            >
              <span className="flex-1 text-on-surface">{o.text}</span>
              {reveal && isChosen && (
                <MaterialIcon
                  name={o.outcome === "good" ? "check_circle" : "cancel"}
                  fill
                  className={o.outcome === "good" ? "text-emerald-600" : "text-rose-500"}
                />
              )}
            </button>
          );
        })}
      </div>

      {chosen && (
        <div
          className={`animate-fade-up mt-stack-md rounded-lg p-stack-md ${
            chosen.outcome === "good"
              ? "bg-emerald-50 text-emerald-900"
              : "bg-rose-50 text-rose-900"
          }`}
        >
          <p className="text-label-md">
            {chosen.outcome === "good" ? "Good call." : "Risky choice."}
          </p>
          <p className="mt-1 text-caption">{chosen.feedback}</p>
        </div>
      )}

      <div className="mt-stack-md flex items-center justify-between">
        <span className="text-caption text-outline">
          Step {step + 1} of {activity.steps.length}
        </span>
        {picked !== null && (
          <button
            onClick={next}
            className="flex items-center gap-1 rounded-lg px-5 py-2 text-label-md font-bold text-white transition-opacity hover:opacity-90 active:scale-95"
            style={{ background: accent }}
          >
            {isLast ? "Finish" : "Continue"}
            <MaterialIcon name="arrow_forward" className="text-[18px]" />
          </button>
        )}
      </div>
    </div>
  );
}
