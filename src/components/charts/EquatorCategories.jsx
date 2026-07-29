import MaterialIcon from "../MaterialIcon.jsx";
import { equatorCategories } from "../../data.js";

// The Equator Principles A / B / C risk categories, as a tiered chart.
export default function EquatorCategories() {
  return (
    <div className="rounded-xl border border-outline-variant bg-white p-stack-lg">
      <h2 className="mb-stack-md flex items-center gap-2 text-headline-md text-primary">
        <MaterialIcon name="signal_cellular_alt" style={{ color: "#f59e0b" }} />
        How lenders categorise a project (A / B / C)
      </h2>
      <p className="mb-stack-md text-body-md text-on-surface-variant">
        Under the Equator Principles, banks sort every project by the magnitude of
        its E&amp;S risk — which decides how much scrutiny it gets.
      </p>

      <div className="space-y-stack-md">
        {equatorCategories.map((c) => (
          <div
            key={c.id}
            className="flex items-stretch overflow-hidden rounded-lg border border-outline-variant"
          >
            <div
              className="flex w-20 shrink-0 flex-col items-center justify-center text-white"
              style={{ background: c.color }}
            >
              <span className="text-headline-md font-bold">{c.id}</span>
              <span className="text-caption">{c.level}</span>
            </div>
            <div className="flex-1 p-stack-md">
              <p className="text-body-md text-on-surface">{c.desc}</p>
              <p className="mt-1 text-caption text-on-surface-variant">
                <strong>Example:</strong> {c.example}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
