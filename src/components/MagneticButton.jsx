import { useCallback, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Subtle cursor-follow on primary CTAs. Disabled when reduced motion is on.
 */
export function MagneticButton({ className = "", children, ...rest }) {
  const reduce = useReducedMotion();
  const rootRef = useRef(null);
  const [shift, setShift] = useState({ x: 0, y: 0 });

  const onMove = useCallback(
    (e) => {
      if (reduce) return;
      const el = rootRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      setShift({
        x: (e.clientX - cx) * 0.12,
        y: (e.clientY - cy) * 0.12,
      });
    },
    [reduce]
  );

  const onLeave = useCallback(() => {
    setShift({ x: 0, y: 0 });
  }, []);

  return (
    <button
      ref={rootRef}
      type="button"
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={
        reduce
          ? undefined
          : {
              transform: `translate3d(${shift.x}px, ${shift.y}px, 0)`,
            transition: "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
            }
      }
      {...rest}
    >
      {children}
    </button>
  );
}
