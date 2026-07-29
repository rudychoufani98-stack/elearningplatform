import MaterialIcon from "../MaterialIcon.jsx";
import { ifcStandards } from "../../data.js";

// The eight IFC Performance Standards as cards — plain meaning + an example.
export default function PSCards() {
  return (
    <div className="rounded-xl border border-outline-variant bg-white p-stack-lg">
      <h2 className="mb-stack-md flex items-center gap-2 text-headline-md text-primary">
        <MaterialIcon name="account_balance" style={{ color: "#f59e0b" }} />
        The 8 IFC Performance Standards
      </h2>
      <div className="grid grid-cols-1 gap-stack-md sm:grid-cols-2">
        {ifcStandards.map((ps) => (
          <div
            key={ps.n}
            className="flex flex-col rounded-lg border border-outline-variant bg-surface-container-lowest p-stack-md"
          >
            <div className="mb-2 flex items-center gap-2">
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-label-md font-bold text-white"
                style={{ background: "#f59e0b" }}
              >
                {ps.n}
              </span>
              <span className="text-label-md font-bold text-primary">
                PS{ps.n} · {ps.title}
              </span>
            </div>
            <p className="text-body-md text-on-surface-variant">{ps.plain}</p>
            <div
              className="mt-2 rounded-lg border-l-4 p-2.5"
              style={{ borderColor: "#f59e0b", background: "#f59e0b0f" }}
            >
              <p className="text-caption text-on-surface">
                <strong>Example:</strong> {ps.example}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
