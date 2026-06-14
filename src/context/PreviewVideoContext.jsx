import { createContext, useCallback, useContext, useRef } from "react";

const PreviewVideoContext = createContext(null);

export function PreviewVideoProvider({ children }) {
  const mapRef = useRef(new Map());

  const register = useCallback((id, el) => {
    if (!id) return;
    if (el) mapRef.current.set(id, el);
    else mapRef.current.delete(id);
  }, []);

  const pauseOthers = useCallback((exceptId) => {
    mapRef.current.forEach((videoEl, key) => {
      if (key === exceptId || !videoEl) return;
      try {
        videoEl.pause();
        videoEl.currentTime = 0;
      } catch {
        /* ignore */
      }
    });
  }, []);

  const pause = useCallback((id) => {
    const videoEl = mapRef.current.get(id);
    if (!videoEl) return;
    try {
      videoEl.pause();
      videoEl.currentTime = 0;
    } catch {
      /* ignore */
    }
  }, []);

  const playPreview = useCallback(
    (id) => {
      pauseOthers(id);
      const videoEl = mapRef.current.get(id);
      if (!videoEl) return;
      videoEl.muted = true;
      videoEl.play().catch(() => {});
    },
    [pauseOthers]
  );

  const value = { register, pauseOthers, pause, playPreview };
  return <PreviewVideoContext.Provider value={value}>{children}</PreviewVideoContext.Provider>;
}

export function usePreviewVideo() {
  const ctx = useContext(PreviewVideoContext);
  if (!ctx) {
    throw new Error("usePreviewVideo must be used within PreviewVideoProvider");
  }
  return ctx;
}
