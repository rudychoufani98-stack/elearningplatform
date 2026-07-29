// Thin wrapper around a Material Symbols glyph.
// `fill` toggles the filled variant; size/color come from className.
export default function MaterialIcon({ name, className = "", fill = false, style }) {
  return (
    <span
      className={`material-symbols-outlined ${className}`}
      style={fill ? { fontVariationSettings: "'FILL' 1", ...style } : style}
      aria-hidden="true"
    >
      {name}
    </span>
  );
}
