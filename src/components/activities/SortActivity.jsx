import { useState } from "react";
import MaterialIcon from "../MaterialIcon.jsx";

// Fisher–Yates shuffle (returns a new array).
function shuffle(a) {
  const r = [...a];
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [r[i], r[j]] = [r[j], r[i]];
  }
  return r;
}

// Drag-based activity. `type: "order"` = reorder into the correct sequence;
// `type: "categorize"` = drag items into the right buckets.
export default function SortActivity({ activity, accent = "#0d1c32" }) {
  return activity.type === "order" ? (
    <OrderGame activity={activity} accent={accent} />
  ) : (
    <CategorizeGame activity={activity} accent={accent} />
  );
}

function Header({ title, prompt, accent }) {
  return (
    <div className="mb-stack-md">
      <h3 className="flex items-center gap-2 text-label-md font-bold uppercase tracking-wide text-primary">
        <MaterialIcon name="drag_indicator" style={{ color: accent }} />
        {title}
      </h3>
      <p className="mt-1 text-body-md text-on-surface-variant">{prompt}</p>
    </div>
  );
}

function OrderGame({ activity, accent }) {
  const [order, setOrder] = useState(() => {
    let s = shuffle(activity.items);
    let tries = 0;
    while (s.every((x, i) => x === activity.items[i]) && tries < 6) {
      s = shuffle(activity.items);
      tries++;
    }
    return s;
  });
  const [drag, setDrag] = useState(null);
  const [checked, setChecked] = useState(false);

  function onDrop(i) {
    if (drag === null || drag === i) return;
    setOrder((prev) => {
      const arr = [...prev];
      const [m] = arr.splice(drag, 1);
      arr.splice(i, 0, m);
      return arr;
    });
    setDrag(null);
    setChecked(false);
  }

  const allCorrect = order.every((it, i) => it === activity.items[i]);

  return (
    <div>
      <Header title={activity.title} prompt={activity.prompt} accent={accent} />
      <ol className="space-y-2">
        {order.map((it, i) => {
          const ok = checked && it === activity.items[i];
          const bad = checked && it !== activity.items[i];
          return (
            <li
              key={it}
              draggable
              onDragStart={() => setDrag(i)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => onDrop(i)}
              className={`flex cursor-grab items-center gap-3 rounded-lg border bg-white px-4 py-3 active:cursor-grabbing ${
                ok
                  ? "border-emerald-400 bg-emerald-50"
                  : bad
                  ? "border-rose-300 bg-rose-50"
                  : "border-outline-variant hover:border-secondary"
              }`}
            >
              <MaterialIcon name="drag_indicator" className="text-outline" />
              <span className="text-outline">{i + 1}.</span>
              <span className="flex-1 text-body-md text-on-surface">{it}</span>
              {checked &&
                (ok ? (
                  <MaterialIcon name="check_circle" fill className="text-emerald-600" />
                ) : (
                  <MaterialIcon name="cancel" fill className="text-rose-500" />
                ))}
            </li>
          );
        })}
      </ol>
      <Controls
        checked={checked}
        allCorrect={allCorrect}
        onCheck={() => setChecked(true)}
        onReset={() => {
          setOrder(shuffle(activity.items));
          setChecked(false);
        }}
        accent={accent}
      />
    </div>
  );
}

function CategorizeGame({ activity, accent }) {
  const [placement, setPlacement] = useState({}); // itemId -> catId
  const [drag, setDrag] = useState(null);
  const [checked, setChecked] = useState(false);

  function place(catId) {
    if (!drag) return;
    setPlacement((p) => ({ ...p, [drag]: catId }));
    setDrag(null);
    setChecked(false);
  }

  const pool = activity.items.filter((it) => !placement[it.id]);
  const allPlaced = activity.items.every((it) => placement[it.id]);
  const allCorrect = activity.items.every((it) => placement[it.id] === it.cat);

  const Chip = ({ it, ok, bad }) => (
    <span
      draggable
      onDragStart={() => setDrag(it.id)}
      className={`flex cursor-grab items-center gap-1 rounded-lg border px-3 py-1.5 text-body-md active:cursor-grabbing ${
        ok
          ? "border-emerald-400 bg-emerald-50"
          : bad
          ? "border-rose-300 bg-rose-50"
          : "border-outline-variant bg-white hover:border-secondary"
      }`}
    >
      <MaterialIcon name="drag_indicator" className="text-[16px] text-outline" />
      {it.text}
      {ok && <MaterialIcon name="check" className="text-[16px] text-emerald-600" />}
      {bad && <MaterialIcon name="close" className="text-[16px] text-rose-500" />}
    </span>
  );

  return (
    <div>
      <Header title={activity.title} prompt={activity.prompt} accent={accent} />

      {/* Pool */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={() => place(null)}
        className="mb-stack-md flex min-h-[52px] flex-wrap gap-2 rounded-lg border border-dashed border-outline-variant bg-surface-container-low p-3"
      >
        {pool.length === 0 ? (
          <span className="text-caption text-outline">All items placed.</span>
        ) : (
          pool.map((it) => <Chip key={it.id} it={it} />)
        )}
      </div>

      {/* Category buckets */}
      <div className="grid grid-cols-1 gap-stack-md sm:grid-cols-2">
        {activity.categories.map((cat) => (
          <div
            key={cat.id}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => place(cat.id)}
            className="rounded-lg border border-outline-variant bg-white p-3"
          >
            <p
              className="mb-2 text-label-md font-bold"
              style={{ color: accent }}
            >
              {cat.label}
            </p>
            <div className="flex min-h-[44px] flex-wrap gap-2">
              {activity.items
                .filter((it) => placement[it.id] === cat.id)
                .map((it) => (
                  <Chip
                    key={it.id}
                    it={it}
                    ok={checked && it.cat === cat.id}
                    bad={checked && it.cat !== cat.id}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>

      <Controls
        checked={checked}
        allCorrect={allCorrect}
        canCheck={allPlaced}
        onCheck={() => setChecked(true)}
        onReset={() => {
          setPlacement({});
          setChecked(false);
        }}
        accent={accent}
      />
    </div>
  );
}

function Controls({ checked, allCorrect, canCheck = true, onCheck, onReset, accent }) {
  return (
    <div className="mt-stack-md flex items-center gap-stack-md">
      {!checked || !allCorrect ? (
        <button
          onClick={onCheck}
          disabled={!canCheck}
          className="rounded-lg px-5 py-2 text-label-md font-bold text-white transition-opacity hover:opacity-90 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
          style={{ background: accent }}
        >
          Check answer
        </button>
      ) : null}
      <button
        onClick={onReset}
        className="flex items-center gap-1 text-label-md text-on-surface-variant hover:text-primary"
      >
        <MaterialIcon name="refresh" className="text-[18px]" /> Reset
      </button>
      {checked && allCorrect && (
        <span className="ml-auto flex items-center gap-1 text-label-md font-bold text-emerald-700">
          <MaterialIcon name="verified" fill /> Correct!
        </span>
      )}
      {checked && !allCorrect && (
        <span className="ml-auto text-caption text-rose-600">
          Not quite — adjust and check again.
        </span>
      )}
    </div>
  );
}
