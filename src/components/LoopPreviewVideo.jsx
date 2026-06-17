import { forwardRef, useCallback, useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

function mergeRefs(...refs) {
  return (node) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    });
  };
}

/** Muted inline preview that keeps playing in a seamless loop. */
export const LoopPreviewVideo = forwardRef(function LoopPreviewVideo(
  { className = "", src, preload = "auto", ...rest },
  forwardedRef,
) {
  const reduce = useReducedMotion();
  const localRef = useRef(null);

  const tryPlay = useCallback((el) => {
    if (!el || reduce) return;
    el.loop = true;
    if (el.paused) {
      const p = el.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    }
  }, [reduce]);

  useEffect(() => {
    const el = localRef.current;
    if (!el || reduce) return;

    const onEnded = () => {
      el.currentTime = 0;
      tryPlay(el);
    };

    const onPause = () => {
      if (el.ended) return;
      window.requestAnimationFrame(() => tryPlay(el));
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") tryPlay(el);
    };

    el.loop = true;
    tryPlay(el);
    el.addEventListener("ended", onEnded);
    el.addEventListener("pause", onPause);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      el.removeEventListener("ended", onEnded);
      el.removeEventListener("pause", onPause);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [src, reduce, tryPlay]);

  return (
    <video
      ref={mergeRefs(localRef, forwardedRef)}
      className={className}
      src={src}
      muted
      playsInline
      loop
      preload={preload}
      controls={false}
      autoPlay={!reduce}
      {...rest}
    />
  );
});
