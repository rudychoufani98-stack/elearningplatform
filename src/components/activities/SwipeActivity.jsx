import { useState } from "react";
import MaterialIcon from "../MaterialIcon.jsx";

// "Myth or fact?" — a quick-fire card deck. One statement at a time; the
// learner calls it Myth or Fact, gets instant feedback, then moves on.
export default function SwipeActivity({ activity, accent = "#c99a2e" }) {
  const cards = activity.cards ?? [];
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState(null); // true = "Fact", false = "Myth"
  const [right, setRight] = useState(0);
  const [done, setDone] = useState(false);

  const card = cards[index];
  const isLast = index === cards.length - 1;
  const answered = picked !== null;
  const correct = answered && picked === card.truth;

  function choose(val) {
    if (answered) return;
    setPicked(val);
    if (val === card.truth) setRight((r) => r + 1);
  }
  function next() {
    if (isLast) return setDone(true);
    setIndex((i) => i + 1);
    setPicked(null);
  }
  function restart() {
    setIndex(0);
    setPicked(null);
    setRight(0);
    setDone(false);
  }

  return (
    <div className="rounded-xl border border-outline-variant bg-white p-stack-lg">
      <h2 className="mb-1 flex items-center gap-2 text-headline-md text-primary">
        <MaterialIcon name="style" style={{ color: accent }} />
        {activity.title ?? "Myth or fact?"}
      </h2>
      <p className="mb-stack-md text-body-md text-on-surface-variant">
        {activity.prompt ?? "Call each statement: myth or fact?"}
      </p>

      {done ? (
        <div className="animate-pop rounded-xl bg-surface-container-low p-stack-lg text-center">
          <MaterialIcon
            name={right === cards.length ? "military_tech" : "sports_score"}
            fill
            className="text-4xl"
            style={{ color: accent }}
          />
          <p className="mt-2 text-headline-md text-primary">
            {right} / {cards.length} correct
          </p>
          <p className="mx-auto mt-1 max-w-sm text-body-md text-on-surface-variant">
            {right === cards.length
              ? "Perfect — no myth survives you."
              : "Review the tips and run the deck again."}
          </p>
          <button
            onClick={restart}
            className="mt-stack-md inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-label-md text-on-primary transition-opacity hover:opacity-90"
          >
            <MaterialIcon name="refresh" className="text-[18px]" /> Play again
          </button>
        </div>
      ) : (
        <>
          {/* Progress dots */}
          <div className="mb-stack-md flex items-center gap-1.5">
            {cards.map((_, i) => (
              <span
                key={i}
                className="h-1.5 flex-1 rounded-full transition-colors"
                style={{
                  background:
                    i < index ? accent : i === index ? `${accent}88` : "#e0e3e5",
                }}
              />
            ))}
          </div>

          {/* The card */}
          <div
            className={`rounded-xl border-2 p-stack-lg text-center transition-colors ${
              answered
                ? correct
                  ? "border-emerald-400 bg-emerald-50"
                  : "border-rose-300 bg-rose-50"
                : "border-outline-variant bg-surface-container-lowest"
            }`}
          >
            <p className="text-caption font-bold uppercase tracking-widest text-outline">
              Statement {index + 1} of {cards.length}
            </p>
            <p className="mx-auto mt-2 max-w-md text-body-lg font-semibold leading-snug text-on-surface">
              “{card.text}”
            </p>

            {answered ? (
              <div className="animate-fade-up mt-stack-md">
                <p
                  className={`text-label-md font-bold ${
                    correct ? "text-emerald-700" : "text-rose-700"
                  }`}
                >
                  {correct ? "Correct!" : "Not quite."} It's a{" "}
                  {card.truth ? "FACT ✓" : "MYTH ✗"}
                </p>
                <p className="mx-auto mt-1 max-w-md text-caption text-on-surface-variant">
                  {card.tip}
                </p>
                <button
                  onClick={next}
                  className="mt-stack-md inline-flex items-center gap-1 rounded-lg bg-primary px-6 py-2.5 text-label-md text-on-primary transition-opacity hover:opacity-90"
                >
                  {isLast ? "See my score" : "Next card"}
                  <MaterialIcon name="arrow_forward" className="text-[18px]" />
                </button>
              </div>
            ) : (
              <div className="mt-stack-md flex justify-center gap-stack-md">
                <button
                  onClick={() => choose(false)}
                  className="flex items-center gap-2 rounded-xl border-2 border-rose-300 bg-white px-6 py-3 text-label-md font-bold text-rose-600 transition-all hover:bg-rose-50 active:scale-95"
                >
                  <MaterialIcon name="close" /> Myth
                </button>
                <button
                  onClick={() => choose(true)}
                  className="flex items-center gap-2 rounded-xl border-2 border-emerald-400 bg-white px-6 py-3 text-label-md font-bold text-emerald-700 transition-all hover:bg-emerald-50 active:scale-95"
                >
                  <MaterialIcon name="check" /> Fact
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
