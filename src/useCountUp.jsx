import { useEffect, useRef, useState } from "react";

const easeOut = (p) => 1 - Math.pow(1 - p, 3);

// Animates a number from 0 up to `target` over `duration` ms.
export function useCountUp(target, duration = 900) {
  const [value, setValue] = useState(0);
  const frame = useRef();

  useEffect(() => {
    let start;
    function tick(t) {
      if (start === undefined) start = t;
      const p = Math.min((t - start) / duration, 1);
      setValue(Math.round(target * easeOut(p)));
      if (p < 1) frame.current = requestAnimationFrame(tick);
    }
    frame.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame.current);
  }, [target, duration]);

  return value;
}

// Convenience component: <AnimatedNumber value={42} suffix="%" />
export function AnimatedNumber({ value, duration, suffix = "", className }) {
  const v = useCountUp(value, duration);
  return (
    <span className={className}>
      {v}
      {suffix}
    </span>
  );
}
