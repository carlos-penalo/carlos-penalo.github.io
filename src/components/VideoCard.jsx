import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { BadgeCheck } from "lucide-react";
import { usePreviewVideo } from "@/context/PreviewVideoContext.jsx";
import { useHoverCapable } from "@/hooks/useHoverCapable.js";
import { driveFilePreviewUrl, driveThumbnailUrl } from "@/lib/googleDrive.js";
import { LoopPreviewVideo } from "@/components/LoopPreviewVideo.jsx";

function initialsFromTitle(title) {
  const parts = String(title || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase().slice(0, 2);
  return String(title || "CP")
    .replace(/[^a-zA-Z0-9]/g, "")
    .slice(0, 2)
    .toUpperCase() || "CP";
}

export function VideoCard({ project, onOpen, variant = "grid", footerCategoryOnly = false }) {
  const reduce = useReducedMotion();
  const hoverCapable = useHoverCapable();
  const { register, pause, playPreview } = usePreviewVideo();
  const rootRef = useRef(null);
  const videoRef = useRef(null);
  const hoverTimerRef = useRef(null);
  const [nativeReady, setNativeReady] = useState(false);
  const [thumbLoaded, setThumbLoaded] = useState(false);
  const [thumbFailed, setThumbFailed] = useState(false);
  const [pointerOver, setPointerOver] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);

  const inView = useInView(rootRef, { amount: 0.22, margin: "0px 0px -8% 0px" });
  const isDrive = Boolean(project.googleDriveFileId);

  /** Optional local looping clip shown as the always-on preview (click still opens the full video). */
  const previewSrc =
    typeof project.previewSrc === "string" && project.previewSrc.trim() ? project.previewSrc.trim() : "";
  const hasLoopPreview = Boolean(previewSrc);

  const thumbSrc =
    (typeof project.poster === "string" && project.poster.trim()) ||
    (project.googleDriveFileId ? driveThumbnailUrl(project.googleDriveFileId, 1200) : "");

  const wantDriveEmbed =
    !hasLoopPreview &&
    isDrive &&
    inView &&
    !reduce &&
    (variant === "featured" || !hoverCapable || pointerOver || focusWithin);

  const driveIframeSrc = wantDriveEmbed
    ? driveFilePreviewUrl(project.googleDriveFileId, {
        autoplay: true,
        loop: variant === "featured",
      })
    : "";

  useEffect(() => {
    setThumbLoaded(false);
    setThumbFailed(false);
    setNativeReady(false);
  }, [project.id]);

  useEffect(() => {
    if (isDrive) {
      register(project.id, null);
      return () => register(project.id, null);
    }
    register(project.id, videoRef.current);
    return () => register(project.id, null);
  }, [project.id, register, isDrive]);

  useEffect(() => {
    if (isDrive) return;
    if (variant !== "featured") return;
    if (reduce) return;
    if (!inView) {
      pause(project.id);
      return;
    }
    const t = window.setTimeout(() => playPreview(project.id), 100);
    return () => window.clearTimeout(t);
  }, [isDrive, variant, reduce, inView, playPreview, pause, project.id]);

  useEffect(() => {
    if (isDrive) return;
    if (hoverCapable) return;
    if (!inView) pause(project.id);
  }, [inView, pause, project.id, isDrive, hoverCapable]);

  useEffect(() => {
    if (isDrive) return;
    if (hoverCapable) return;
    if (reduce) return;
    if (!inView) return;
    const t = window.setTimeout(() => {
      playPreview(project.id);
    }, 140);
    return () => window.clearTimeout(t);
  }, [inView, hoverCapable, reduce, isDrive, playPreview, project.id]);

  const clearHoverTimer = () => {
    if (hoverTimerRef.current) {
      window.clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
  };

  const startNativeHoverPreview = () => {
    if (isDrive || !hoverCapable) return;
    clearHoverTimer();
    hoverTimerRef.current = window.setTimeout(() => {
      playPreview(project.id);
    }, 180);
  };

  const stopNativeHoverPreview = () => {
    clearHoverTimer();
    if (!isDrive && variant !== "featured") pause(project.id);
  };

  useEffect(() => () => clearHoverTimer(), []);

  const driveShowSkeleton = isDrive && thumbSrc && !thumbLoaded && !thumbFailed;
  const driveIdleFallback = isDrive && thumbFailed && !driveIframeSrc;

  const isFeatured = variant === "featured";
  const chromeTitle = footerCategoryOnly ? project.category : project.title;
  const chromeSub = footerCategoryOnly ? "Featured lane" : project.category;

  const aspectClass = isFeatured ? "aspect-[16/9] min-h-[11.5rem] sm:min-h-[13rem] lg:aspect-[21/9] lg:min-h-[12.5rem]" : "aspect-[4/5] min-h-[14rem]";

  return (
    <article
      ref={rootRef}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-card shadow-card ring-1 ring-white/[0.04] transition duration-500 ease-out hover:-translate-y-1 hover:border-accent/35 hover:shadow-[0_28px_80px_rgba(0,0,0,0.55)]"
      onFocusCapture={() => setFocusWithin(true)}
      onBlurCapture={(e) => {
        if (!rootRef.current?.contains(e.relatedTarget)) setFocusWithin(false);
      }}
    >
      <div className="relative z-[5] flex items-center gap-3 border-b border-white/10 bg-black/35 px-4 py-3 backdrop-blur-sm">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-white/10 to-transparent text-xs font-bold text-fg">
          {initialsFromTitle(chromeTitle)}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold tracking-tight text-fg">{chromeTitle}</p>
          <p className="truncate text-[11px] font-medium uppercase tracking-[0.14em] text-muted">{chromeSub}</p>
        </div>
        <BadgeCheck className="h-5 w-5 shrink-0 text-sky-400/90" aria-hidden />
      </div>

      <div className={`relative flex-1 overflow-hidden bg-black ${aspectClass}`}>
        {hasLoopPreview ? (
          <LoopPreviewVideo
            src={previewSrc}
            preload="metadata"
            className="absolute inset-0 z-[1] h-full w-full object-cover"
          />
        ) : isDrive ? (
          <>
            {thumbSrc && !thumbFailed ? (
              <img
                className={`absolute inset-0 z-0 h-full w-full object-cover ${!reduce && variant !== "featured" ? "video-card-ken" : ""}`}
                src={thumbSrc}
                alt=""
                loading="lazy"
                decoding="async"
                draggable={false}
                onLoad={() => setThumbLoaded(true)}
                onError={() => {
                  setThumbFailed(true);
                  setThumbLoaded(true);
                }}
              />
            ) : null}
            {driveIdleFallback ? (
              <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden>
                <span
                  className="absolute inset-0 opacity-85"
                  style={{
                    background: "radial-gradient(ellipse, rgba(255,23,23,0.15), transparent 70%)",
                  }}
                />
                <span
                  className="absolute inset-0 opacity-60"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(-12deg, transparent, transparent 10px, rgba(255,255,255,0.03) 10px, rgba(255,255,255,0.03) 11px)",
                    maskImage: "linear-gradient(to bottom, black 30%, transparent)",
                  }}
                />
              </div>
            ) : null}
            {!thumbSrc && !driveIframeSrc ? (
              <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden>
                <span
                  className="absolute inset-0 opacity-60"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(-12deg, transparent, transparent 10px, rgba(255,255,255,0.03) 10px, rgba(255,255,255,0.03) 11px)",
                  }}
                />
              </div>
            ) : null}
            {driveIframeSrc ? (
              <iframe
                title=""
                key={driveIframeSrc}
                src={driveIframeSrc}
                loading="lazy"
                className="pointer-events-none absolute inset-0 z-[3] h-full w-full min-h-0 border-0 object-cover"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : null}
            {driveShowSkeleton ? <div className="skeleton absolute inset-0 z-[3]" aria-hidden /> : null}
          </>
        ) : (
          <>
            {!nativeReady ? <div className="skeleton absolute inset-0 z-0" aria-hidden /> : null}
            <video
              ref={videoRef}
              src={project.src}
              poster={project.poster ?? undefined}
              muted
              playsInline
              loop
              preload="auto"
              loading="lazy"
              className="absolute inset-0 z-[1] h-full w-full object-cover"
              onLoadedData={() => setNativeReady(true)}
            />
          </>
        )}

        <div
          className="pointer-events-none absolute inset-0 z-[4] bg-gradient-to-t from-black/70 via-transparent to-black/20 opacity-0 transition duration-500 group-hover:opacity-100 group-focus-within:opacity-100"
          aria-hidden
        />

        <div className="pointer-events-none absolute inset-0 z-[4] flex flex-col justify-end p-5 opacity-0 transition duration-500 group-hover:opacity-100 group-focus-within:opacity-100">
          {!footerCategoryOnly && project.description ? (
            <p className="mb-2 line-clamp-2 text-sm text-muted">{project.description}</p>
          ) : null}
          <div className="flex items-end justify-between gap-3">
            <h3 className="m-0 text-lg font-medium tracking-tight text-fg">{project.title}</h3>
            <span className="shrink-0 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-fg backdrop-blur-sm">
              View project
            </span>
          </div>
        </div>
      </div>

      <motion.button
        type="button"
        className="absolute inset-0 z-[6] cursor-pointer rounded-[inherit] border-0 bg-transparent p-0"
        aria-label={footerCategoryOnly ? `Open ${project.category} piece in viewer` : `Open ${project.title} in viewer`}
        onClick={() => onOpen()}
        onMouseEnter={() => {
          setPointerOver(true);
          startNativeHoverPreview();
        }}
        onMouseLeave={() => {
          setPointerOver(false);
          stopNativeHoverPreview();
        }}
        whileHover={reduce ? undefined : { scale: 1.002 }}
        whileTap={reduce ? undefined : { scale: 0.998 }}
      />

    </article>
  );
}
