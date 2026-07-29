import MaterialIcon from "../MaterialIcon.jsx";

// Visual of the "two layers" rule: local law is the floor, international
// standards sit on top, and where they differ the stricter one applies.
export default function RegFrameworkChart() {
  return (
    <div className="rounded-xl border border-outline-variant bg-white p-stack-lg">
      <h2 className="mb-stack-md flex items-center gap-2 text-headline-md text-primary">
        <MaterialIcon name="stacked_bar_chart" style={{ color: "#f59e0b" }} />
        Two layers of rules
      </h2>

      <div className="flex items-end gap-6" style={{ height: 200 }}>
        {/* Local law — the floor */}
        <div className="flex h-full flex-1 flex-col items-center justify-end">
          <div
            className="flex w-full items-center justify-center rounded-t-lg text-center text-caption font-semibold text-white"
            style={{ height: "55%", background: "#8a8f96" }}
          >
            Legal minimum
          </div>
          <span className="mt-2 text-center text-label-md font-bold text-primary">
            Nigerian law
          </span>
          <span className="text-center text-caption text-on-surface-variant">
            EIA Act · NESREA · permits
          </span>
        </div>

        {/* International standards — the higher bar */}
        <div className="relative flex h-full flex-1 flex-col items-center justify-end">
          <div
            className="flex w-full items-center justify-center rounded-t-lg text-center text-caption font-semibold text-white"
            style={{ height: "100%", background: "#f59e0b" }}
          >
            Required level
          </div>
          <span className="mt-2 text-center text-label-md font-bold text-primary">
            International standards
          </span>
          <span className="text-center text-caption text-on-surface-variant">
            IFC PS · Equator Principles
          </span>
        </div>
      </div>

      <div
        className="mt-stack-md flex items-start gap-2 rounded-lg border-l-4 p-stack-md"
        style={{ borderColor: "#f59e0b", background: "#f59e0b0f" }}
      >
        <MaterialIcon name="rule" style={{ color: "#f59e0b" }} />
        <p className="text-body-md text-on-surface">
          <strong>The stricter-standard rule:</strong> local law is the floor
          everyone must reach; lenders require the international standards on top.
          Where the two differ, the project applies whichever gives{" "}
          <strong>greater protection</strong> — usually the international standard.
        </p>
      </div>
    </div>
  );
}
