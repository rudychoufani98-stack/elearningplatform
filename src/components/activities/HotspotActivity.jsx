import { useState } from "react";
import MaterialIcon from "../MaterialIcon.jsx";

// "Image à zones cliquables" — click the markers on a site photo to identify
// each E&S issue. Each hotspot: { x, y (percent), kind: "E"|"S", label, detail }.
export default function HotspotActivity({ activity, accent = "#0d1c32" }) {
  const [found, setFound] = useState({}); // index -> true
  const [active, setActive] = useState(null);
  const total = activity.hotspots.length;
  const foundCount = Object.keys(found).length;
  const kindColor = { E: "#10b981", S: "#a855f7" };

  return (
    <div>
      <h3 className="flex items-center gap-2 text-label-md font-bold uppercase tracking-wide text-primary">
        <MaterialIcon name="ads_click" style={{ color: accent }} />
        {activity.title}
      </h3>
      <p className="mt-1 text-body-md text-on-surface-variant">
        {activity.prompt}{" "}
        <span className="font-semibold" style={{ color: accent }}>
          Found {foundCount}/{total}
        </span>
      </p>

      <div className="relative mt-stack-md aspect-video w-full overflow-hidden rounded-xl bg-surface-container">
        <img
          src={activity.image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        {activity.hotspots.map((h, i) => {
          const isFound = found[i];
          return (
            <button
              key={i}
              onClick={() => {
                setFound((f) => ({ ...f, [i]: true }));
                setActive(active === i ? null : i);
              }}
              className="absolute flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white text-white shadow-lg transition-transform hover:scale-110"
              style={{
                left: `${h.x}%`,
                top: `${h.y}%`,
                background: isFound ? kindColor[h.kind] : "rgba(13,28,50,0.75)",
                animation: isFound ? "none" : "pop-in 1.2s ease-in-out infinite alternate",
              }}
              aria-label={h.label}
            >
              <MaterialIcon
                name={isFound ? (h.kind === "E" ? "eco" : "groups") : "help"}
                className="text-[18px]"
              />
            </button>
          );
        })}
      </div>

      {active != null && (
        <div
          className="animate-fade-up mt-stack-md rounded-lg border-l-4 p-stack-md"
          style={{
            borderColor: kindColor[activity.hotspots[active].kind],
            background: `${kindColor[activity.hotspots[active].kind]}12`,
          }}
        >
          <p className="text-label-md font-bold text-primary">
            {activity.hotspots[active].kind === "E" ? "Environmental" : "Social"} ·{" "}
            {activity.hotspots[active].label}
          </p>
          <p className="mt-1 text-body-md text-on-surface-variant">
            {activity.hotspots[active].detail}
          </p>
        </div>
      )}

      {foundCount === total && (
        <p className="mt-stack-md flex items-center gap-1 text-label-md font-bold text-emerald-700">
          <MaterialIcon name="verified" fill /> You found every issue on the site.
        </p>
      )}
    </div>
  );
}
