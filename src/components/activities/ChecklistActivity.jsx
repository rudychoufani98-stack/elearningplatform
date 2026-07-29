import { useState } from "react";
import MaterialIcon from "../MaterialIcon.jsx";

// "Checklist interactive à pièges" — tick the items that are actually required.
// Each item: { text, required (bool), note }. Some are traps (not required).
export default function ChecklistActivity({ activity, accent = "#0d1c32" }) {
  const [ticked, setTicked] = useState({});
  const [checked, setChecked] = useState(false);

  const correct = activity.items.filter(
    (it, i) => Boolean(ticked[i]) === it.required
  ).length;
  const allRight = correct === activity.items.length;

  return (
    <div>
      <h3 className="flex items-center gap-2 text-label-md font-bold uppercase tracking-wide text-primary">
        <MaterialIcon name="fact_check" style={{ color: accent }} />
        {activity.title}
      </h3>
      <p className="mt-1 text-body-md text-on-surface-variant">{activity.prompt}</p>

      <div className="mt-stack-md space-y-2">
        {activity.items.map((it, i) => {
          const isTicked = Boolean(ticked[i]);
          const right = checked && isTicked === it.required;
          const wrong = checked && isTicked !== it.required;
          return (
            <div
              key={i}
              className={`rounded-lg border p-stack-md ${
                right
                  ? "border-emerald-400 bg-emerald-50"
                  : wrong
                  ? "border-rose-400 bg-rose-50"
                  : "border-outline-variant bg-white"
              }`}
            >
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={isTicked}
                  disabled={checked}
                  onChange={(e) =>
                    setTicked((t) => ({ ...t, [i]: e.target.checked }))
                  }
                  className="mt-0.5 h-5 w-5"
                  style={{ accentColor: accent }}
                />
                <span className="text-body-md text-on-surface">{it.text}</span>
                {checked && (
                  <MaterialIcon
                    name={
                      it.required ? "check_circle" : isTicked ? "cancel" : "block"
                    }
                    fill
                    className={`ml-auto ${
                      it.required ? "text-emerald-600" : "text-rose-500"
                    }`}
                  />
                )}
              </label>
              {checked && it.note && (
                <p className="ml-8 mt-1 text-caption text-on-surface-variant">
                  {it.required ? "Required — " : "Not required (trap) — "}
                  {it.note}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-stack-md flex items-center gap-stack-md">
        {(!checked || !allRight) && (
          <button
            onClick={() => setChecked(true)}
            className="rounded-lg px-5 py-2 text-label-md font-bold text-white transition-opacity hover:opacity-90"
            style={{ background: accent }}
          >
            Check the list
          </button>
        )}
        <button
          onClick={() => {
            setTicked({});
            setChecked(false);
          }}
          className="flex items-center gap-1 text-label-md text-on-surface-variant hover:text-primary"
        >
          <MaterialIcon name="refresh" className="text-[18px]" /> Reset
        </button>
        {checked && (
          <span
            className={`ml-auto text-label-md font-bold ${
              allRight ? "text-emerald-700" : "text-rose-600"
            }`}
          >
            {correct}/{activity.items.length} right
          </span>
        )}
      </div>
    </div>
  );
}
