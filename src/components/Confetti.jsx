// Lightweight CSS confetti burst — no dependencies. Rendered on the quiz
// results screen for a bit of delight.
const COLORS = ["#f59e0b", "#10b981", "#06b6d4", "#f43f5e", "#a855f7", "#3b82f6"];

const PIECES = Array.from({ length: 28 }, (_, i) => ({
  left: (i * 37) % 100,
  color: COLORS[i % COLORS.length],
  delay: (i % 7) * 0.12,
  duration: 1.6 + ((i * 13) % 9) / 10,
  size: 6 + ((i * 5) % 6),
}));

export default function Confetti() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {PIECES.map((p, i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            top: 0,
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 0.5,
            background: p.color,
            borderRadius: 1,
            animation: `confetti-fall ${p.duration}s ease-in ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
