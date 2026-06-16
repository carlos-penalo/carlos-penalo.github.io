import { useCallback, useEffect, useId, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

function clamp(n, min, max) {
  return Math.min(max, Math.max(min, n));
}

/**
 * Before/after slider. Pass `beforeSrc` / `afterSrc` (e.g. "/services/grade-before.png").
 * Falls back to decorative gradients when no images are provided.
 */
export function BeforeAfter({ className = "", beforeSrc = "", afterSrc = "" }) {
  const reduce = useReducedMotion();
  const id = useId();
  const hasImages = Boolean(beforeSrc && afterSrc);
  const rootRef = useRef(null);
  const dragging = useRef(false);
  const [pct, setPct] = useState(52);

  const setFromClientX = useCallback((clientX) => {
    const el = rootRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = clamp(((clientX - r.left) / r.width) * 100, 4, 96);
    setPct(x);
  }, []);

  useEffect(() => {
    const onUp = () => {
      dragging.current = false;
    };
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, []);

  const onPointerDown = (e) => {
    dragging.current = true;
    setFromClientX(e.clientX);
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!dragging.current) return;
    setFromClientX(e.clientX);
  };

  return (
    <div
      ref={rootRef}
      className={`relative isolate min-h-[220px] w-full overflow-hidden rounded-2xl border border-white/10 md:min-h-[280px] ${className}`}
      onPointerMove={onPointerMove}
    >
      <span className="pointer-events-none absolute left-4 top-4 z-20 rounded-full bg-black/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted backdrop-blur-sm">
        Before
      </span>
      <span className="pointer-events-none absolute right-4 top-4 z-20 rounded-full bg-black/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-fg backdrop-blur-sm">
        After
      </span>

      {/* After (full) */}
      {hasImages ? (
        <img
          src={afterSrc}
          alt="After color grade"
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
          decoding="async"
          draggable={false}
        />
      ) : (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a0a0a] via-[#120606] to-[#050505]" aria-hidden />
          <div
            className="absolute inset-0 opacity-90 mix-blend-screen"
            style={{
              background:
                "radial-gradient(ellipse 80% 70% at 70% 40%, rgba(255,23,23,0.22), transparent 60%), radial-gradient(circle at 30% 80%, rgba(255,255,255,0.06), transparent 45%)",
            }}
            aria-hidden
          />
        </>
      )}

      {/* Before — full-size overlay clipped to the left of the handle */}
      {hasImages ? (
        <img
          src={beforeSrc}
          alt="Before color grade"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }}
          loading="lazy"
          decoding="async"
          draggable={false}
          aria-hidden
        />
      ) : (
        <div
          className="absolute inset-y-0 left-0 overflow-hidden border-r border-white/25"
          style={{ width: `${pct}%` }}
          aria-hidden
        >
          <div
            className="absolute inset-0 bg-gradient-to-br from-[#111] via-[#0a0a0a] to-black"
            style={{ filter: reduce ? undefined : "saturate(0.35) contrast(0.92) brightness(0.72)" }}
          />
          <div
            className="absolute inset-0 opacity-50"
            style={{
              backgroundImage:
                "repeating-linear-gradient(-18deg, transparent, transparent 10px, rgba(255,255,255,0.03) 10px, rgba(255,255,255,0.03) 11px)",
            }}
          />
        </div>
      )}

      {/* Divider + handle */}
      <div
        className="pointer-events-none absolute inset-y-0 z-10 w-px bg-white/80 shadow-[0_0_24px_rgba(255,255,255,0.35)]"
        style={{ left: `${pct}%`, transform: "translateX(-50%)" }}
        aria-hidden
      />
      <button
        type="button"
        className="absolute z-20 flex h-11 w-11 -translate-x-1/2 cursor-ew-resize items-center justify-center rounded-full border border-white/30 bg-white text-canvas shadow-lg touch-manipulation"
        style={{ left: `${pct}%`, top: "50%", transform: "translate(-50%, -50%)" }}
        aria-label="Drag to compare before and after"
        aria-controls={`${id}-before`}
        onPointerDown={onPointerDown}
      >
        <span className="h-0.5 w-3 rounded-full bg-canvas" aria-hidden />
      </button>
      <span id={`${id}-before`} className="visually-hidden">
        Comparison slider at {Math.round(pct)} percent
      </span>
    </div>
  );
}
