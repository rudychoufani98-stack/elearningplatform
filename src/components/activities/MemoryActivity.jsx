import { useState } from "react";
import MaterialIcon from "../MaterialIcon.jsx";

function shuffle(a) {
  const r = [...a];
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [r[i], r[j]] = [r[j], r[i]];
  }
  return r;
}

// Memory pairs: find each term's matching meaning. Two cards up at a time;
// a match stays open, a miss flips back.
export default function MemoryActivity({ activity, accent = "#c99a2e" }) {
  const pairs = activity.pairs ?? [];
  const build = () =>
    shuffle(
      pairs.flatMap((p, i) => [
        { pairIdx: i, text: p.a, kind: "term" },
        { pairIdx: i, text: p.b, kind: "meaning" },
      ])
    );
  const [cards, setCards] = useState(build);
  const [up, setUp] = useState([]); // indices currently face-up (max 2)
  const [matched, setMatched] = useState([]); // pairIdx values found
  const [moves, setMoves] = useState(0);
  const [lock, setLock] = useState(false);

  const won = matched.length === pairs.length;

  function flip(i) {
    if (lock || up.includes(i) || matched.includes(cards[i].pairIdx)) return;
    const next = [...up, i];
    setUp(next);
    if (next.length === 2) {
      setMoves((m) => m + 1);
      const [a, b] = next.map((x) => cards[x]);
      if (a.pairIdx === b.pairIdx) {
        setMatched((prev) => [...prev, a.pairIdx]);
        setUp([]);
      } else {
        setLock(true);
        setTimeout(() => {
          setUp([]);
          setLock(false);
        }, 900);
      }
    }
  }

  function restart() {
    setCards(build());
    setUp([]);
    setMatched([]);
    setMoves(0);
    setLock(false);
  }

  return (
    <div className="rounded-xl border border-outline-variant bg-white p-stack-lg">
      <h2 className="mb-1 flex items-center gap-2 text-headline-md text-primary">
        <MaterialIcon name="joystick" style={{ color: accent }} />
        {activity.title ?? "Memory: match term and meaning"}
      </h2>
      <p className="mb-stack-md text-body-md text-on-surface-variant">
        {activity.prompt ??
          "Flip two cards at a time — pair each term with its meaning."}
        <span className="ml-2 font-semibold" style={{ color: accent }}>
          {matched.length}/{pairs.length} pairs · {moves} moves
        </span>
      </p>

      {won ? (
        <div className="animate-pop rounded-xl bg-surface-container-low p-stack-lg text-center">
          <MaterialIcon name="celebration" fill className="text-4xl" style={{ color: accent }} />
          <p className="mt-2 text-headline-md text-primary">
            All {pairs.length} pairs in {moves} moves!
          </p>
          <button
            onClick={restart}
            className="mt-stack-md inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-label-md text-on-primary transition-opacity hover:opacity-90"
          >
            <MaterialIcon name="refresh" className="text-[18px]" /> Shuffle & replay
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
          {cards.map((c, i) => {
            const faceUp = up.includes(i) || matched.includes(c.pairIdx);
            const isMatched = matched.includes(c.pairIdx);
            return (
              <button
                key={i}
                onClick={() => flip(i)}
                disabled={faceUp}
                className={`min-h-[76px] rounded-lg border-2 p-2 text-center transition-all active:scale-95 ${
                  isMatched
                    ? "border-emerald-400 bg-emerald-50"
                    : faceUp
                    ? "bg-white"
                    : "border-transparent hover:brightness-110"
                }`}
                style={
                  faceUp
                    ? isMatched
                      ? {}
                      : { borderColor: accent, background: `${accent}0d` }
                    : { background: `linear-gradient(135deg, ${accent}, #0d1c32)` }
                }
              >
                {faceUp ? (
                  <span
                    className={`text-caption leading-snug ${
                      c.kind === "term" ? "font-bold text-primary" : "text-on-surface-variant"
                    }`}
                  >
                    {c.text}
                  </span>
                ) : (
                  <MaterialIcon name="help" className="text-white/90" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
