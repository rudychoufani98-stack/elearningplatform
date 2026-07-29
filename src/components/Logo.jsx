// Skykapital mark — a four-pointed concave star.
// Uses currentColor so it inherits text color; size via className (e.g. h-8 w-8).
export default function Logo({ className = "" }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="currentColor"
      role="img"
      aria-label="Skykapital"
    >
      <path d="M3 3 Q50 50 97 3 Q50 50 97 97 Q50 50 3 97 Q50 50 3 3 Z" />
    </svg>
  );
}
