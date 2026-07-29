import { useState } from "react";
import MaterialIcon from "../MaterialIcon.jsx";

// "Texte à trous" — a sentence with dropdown blanks. `segments` is an array
// where a string is literal text and an object { options, correct } is a blank.
export default function FillBlankActivity({ activity, accent = "#0d1c32" }) {
  const blanks = activity.segments.filter((s) => typeof s === "object");
  const [picks, setPicks] = useState({}); // blankIndex -> option index
  const [checked, setChecked] = useState(false);

  let bi = -1;
  const allFilled = blanks.every((_, i) => picks[i] != null);
  const allCorrect = blanks.every((b, i) => picks[i] === b.correct);

  return (
    <div>
      <h3 className="flex items-center gap-2 text-label-md font-bold uppercase tracking-wide text-primary">
        <MaterialIcon name="edit_note" style={{ color: accent }} />
        {activity.title}
      </h3>
      {activity.prompt && (
        <p className="mt-1 text-body-md text-on-surface-variant">{activity.prompt}</p>
      )}

      <p className="mt-stack-md text-body-lg leading-loose text-on-surface">
        {activity.segments.map((seg, si) => {
          if (typeof seg === "string") return <span key={si}>{seg}</span>;
          bi += 1;
          const idx = bi;
          const val = picks[idx];
          const ok = checked && val === seg.correct;
          const bad = checked && val !== seg.correct;
          return (
            <select
              key={si}
              value={val ?? ""}
              disabled={checked}
              onChange={(e) =>
                setPicks((p) => ({ ...p, [idx]: Number(e.target.value) }))
              }
              className={`mx-1 rounded-md border-2 bg-white px-2 py-1 text-body-md ${
                ok
                  ? "border-emerald-500 bg-emerald-50"
                  : bad
                  ? "border-rose-400 bg-rose-50"
                  : "border-outline-variant"
              }`}
            >
              <option value="" disabled>
                choose…
              </option>
              {seg.options.map((opt, oi) => (
                <option key={oi} value={oi}>
                  {opt}
                </option>
              ))}
            </select>
          );
        })}
      </p>

      <div className="mt-stack-md flex items-center gap-stack-md">
        {(!checked || !allCorrect) && (
          <button
            onClick={() => setChecked(true)}
            disabled={!allFilled}
            className="rounded-lg px-5 py-2 text-label-md font-bold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
            style={{ background: accent }}
          >
            Check
          </button>
        )}
        <button
          onClick={() => {
            setPicks({});
            setChecked(false);
          }}
          className="flex items-center gap-1 text-label-md text-on-surface-variant hover:text-primary"
        >
          <MaterialIcon name="refresh" className="text-[18px]" /> Reset
        </button>
        {checked && allCorrect && (
          <span className="ml-auto flex items-center gap-1 text-label-md font-bold text-emerald-700">
            <MaterialIcon name="verified" fill /> Correct!
          </span>
        )}
      </div>
      {checked && !allCorrect && activity.tip && (
        <p className="mt-2 text-caption text-rose-700">{activity.tip}</p>
      )}
    </div>
  );
}
