import { useState } from "react";
import MaterialIcon from "../MaterialIcon.jsx";

// "Question à curseur" — estimate a number, then reveal the real value.
export default function SliderActivity({ activity, accent = "#0d1c32" }) {
  const { min = 0, max = 100, step = 1, answer, unit = "", prompt, tip } = activity;
  const [value, setValue] = useState(Math.round((min + max) / 2));
  const [revealed, setRevealed] = useState(false);

  const off = Math.abs(value - answer);
  const close = off <= (max - min) * 0.1;

  return (
    <div>
      <h3 className="flex items-center gap-2 text-label-md font-bold uppercase tracking-wide text-primary">
        <MaterialIcon name="tune" style={{ color: accent }} />
        {activity.title}
      </h3>
      <p className="mt-1 text-body-md text-on-surface-variant">{prompt}</p>

      <div className="mt-stack-md">
        <div className="mb-2 text-center">
          <span className="text-headline-lg font-bold" style={{ color: accent }}>
            {value}
          </span>
          <span className="ml-1 text-body-md text-on-surface-variant">{unit}</span>
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          disabled={revealed}
          onChange={(e) => setValue(Number(e.target.value))}
          className="w-full"
          style={{ accentColor: accent }}
        />
        <div className="flex justify-between text-caption text-outline">
          <span>{min}{unit}</span>
          <span>{max}{unit}</span>
        </div>
      </div>

      {revealed ? (
        <div
          className={`animate-fade-up mt-stack-md rounded-lg p-stack-md ${
            close ? "bg-emerald-50 text-emerald-900" : "bg-amber-50 text-amber-900"
          }`}
        >
          <p className="text-label-md">
            {close ? "Great estimate!" : "Not far off — "}
            the real figure is about <strong>{answer}{unit}</strong>{" "}
            (you said {value}{unit}).
          </p>
          <p className="mt-1 text-caption">{tip}</p>
        </div>
      ) : (
        <button
          onClick={() => setRevealed(true)}
          className="mt-stack-md rounded-lg px-5 py-2 text-label-md font-bold text-white transition-opacity hover:opacity-90"
          style={{ background: accent }}
        >
          Reveal the answer
        </button>
      )}
    </div>
  );
}
