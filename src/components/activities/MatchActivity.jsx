import { useState } from "react";
import MaterialIcon from "../MaterialIcon.jsx";
import { psMatchItems } from "../../data.js";

// "Choose the right Standard for each example" — an inline practice exercise.
// Each row: a scenario + options; pick one and get instant feedback.
export default function MatchActivity({ activity, accent = "#f59e0b" }) {
  const items = activity?.items ?? psMatchItems;
  const [picks, setPicks] = useState({}); // itemIndex -> chosen option index

  const answered = Object.keys(picks).length;
  const correct = items.reduce(
    (n, it, i) => n + (picks[i] === it.correct ? 1 : 0),
    0
  );

  return (
    <div className="rounded-xl border border-outline-variant bg-white p-stack-lg">
      <h2 className="mb-1 flex items-center gap-2 text-headline-md text-primary">
        <MaterialIcon name="extension" style={{ color: accent }} />
        {activity?.title ?? "Practice: match the example to the Standard"}
      </h2>
      <p className="mb-stack-md text-body-md text-on-surface-variant">
        {activity?.prompt ?? "For each situation, choose the Performance Standard it belongs to."}
        {answered > 0 && (
          <span className="ml-1 font-semibold" style={{ color: accent }}>
            {correct}/{items.length} correct
          </span>
        )}
      </p>

      <div className="space-y-stack-lg">
        {items.map((it, i) => {
          const picked = picks[i];
          const revealed = picked != null;
          return (
            <div key={i} className="rounded-lg border border-outline-variant p-stack-md">
              <p className="mb-3 text-body-md font-semibold text-on-surface">
                {i + 1}. {it.prompt}
              </p>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {it.options.map((opt, oi) => {
                  const isPicked = picked === oi;
                  const isCorrect = it.correct === oi;
                  let cls =
                    "border-outline-variant bg-white hover:border-secondary";
                  if (revealed) {
                    if (isCorrect) cls = "border-emerald-500 bg-emerald-50";
                    else if (isPicked) cls = "border-rose-400 bg-rose-50";
                    else cls = "border-outline-variant opacity-60";
                  }
                  return (
                    <button
                      key={oi}
                      disabled={revealed}
                      onClick={() => setPicks((p) => ({ ...p, [i]: oi }))}
                      className={`flex items-center justify-between gap-2 rounded-lg border px-3 py-2 text-left text-body-md text-on-surface transition-all disabled:cursor-default ${cls}`}
                    >
                      {opt}
                      {revealed && isCorrect && (
                        <MaterialIcon name="check_circle" fill className="text-emerald-600" />
                      )}
                      {revealed && isPicked && !isCorrect && (
                        <MaterialIcon name="cancel" fill className="text-rose-500" />
                      )}
                    </button>
                  );
                })}
              </div>
              {revealed && (
                <p
                  className={`mt-2 text-caption ${
                    picked === it.correct ? "text-emerald-700" : "text-rose-700"
                  }`}
                >
                  {picked === it.correct ? "Correct — " : "Not quite. "}
                  {it.tip}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
