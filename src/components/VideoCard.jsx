import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { usePreviewVideo } from "@/context/PreviewVideoContext.jsx";
import { useHoverCapable } from "@/hooks/useHoverCapable.js";
import { driveFilePreviewUrl, driveThumbnailUrl } from "@/lib/googleDrive.js";

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

  const thumbSrc =
    (typeof project.poster === "string" && project.poster.trim()) ||
    (project.googleDriveFileId ? driveThumbnailUrl(project.googleDriveFileId, 1200) : "");

  /**
   * Drive motion preview:
   * - Featured row: play as soon as the card is in view (desktop + mobile), with loop hint.
   * - Portfolio grid: in view on touch; on desktop also needs hover/focus (limits many iframes).
   */
  const wantDriveEmbed =
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

  /** Featured strip: native clips autoplay muted in view on all devices. */
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

  return (
    <article
      ref={rootRef}
      className={`video-card ${variant === "featured" ? "video-card--featured" : ""} ${variant === "grid" ? "video-card--grid" : ""}`}
      onFocusCapture={() => setFocusWithin(true)}
      onBlurCapture={(e) => {
        if (!rootRef.current?.contains(e.relatedTarget)) setFocusWithin(false);
      }}
    >
      <div className="video-card__media">
        {isDrive ? (
          <>
            {thumbSrc && !thumbFailed ? (
              <img
                className={`video-card__poster ${!reduce && variant !== "featured" ? "video-card__poster--motion" : ""}`}
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
              <div className="video-card__drive-idle" aria-hidden>
                <span className="video-card__drive-idle__lines" />
                <span className="video-card__drive-idle__glow" />
              </div>
            ) : null}
            {!thumbSrc && !driveIframeSrc ? (
              <div className="video-card__drive-idle" aria-hidden>
                <span className="video-card__drive-idle__lines" />
                <span className="video-card__drive-idle__glow" />
              </div>
            ) : null}
            {driveIframeSrc ? (
              <iframe
                title=""
                key={driveIframeSrc}
                src={driveIframeSrc}
                loading="lazy"
                className="video-card__embed video-card__embed--layer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : null}
            {driveShowSkeleton ? <div className="skeleton skeleton--embed" aria-hidden /> : null}
          </>
        ) : (
          <>
            {!nativeReady ? <div className="skeleton" aria-hidden /> : null}
            <video
              ref={videoRef}
              src={project.src}
              poster={project.poster ?? undefined}
              muted
              playsInline
              loop
              preload="auto"
              loading="lazy"
              className="video-card__video"
              onLoadedData={() => setNativeReady(true)}
            />
          </>
        )}
        <div className="video-card__shine" aria-hidden />
      </div>

      <div className={`video-card__body ${footerCategoryOnly ? "video-card__body--cat-only" : ""}`}>
        <div>
          {!footerCategoryOnly ? <h3 className="video-card__title">{project.title}</h3> : null}
          <p className={`video-card__cat ${footerCategoryOnly ? "video-card__cat--solo" : ""}`}>{project.category}</p>
          {!footerCategoryOnly && project.description ? <p className="video-card__desc">{project.description}</p> : null}
        </div>
      </div>

      <motion.button
        type="button"
        className="video-card__hit"
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
        whileHover={reduce ? undefined : { scale: 1.008 }}
        whileTap={reduce ? undefined : { scale: 0.996 }}
      />

      <style>{`
        @keyframes videoCardKen {
          from {
            transform: scale(1) translate(0, 0);
          }
          to {
            transform: scale(1.08) translate(-1.2%, -0.8%);
          }
        }
        .video-card__poster {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 0;
          transform-origin: 50% 40%;
        }
        .video-card__poster--motion {
          animation: videoCardKen 14s ease-in-out infinite alternate;
        }
        @media (prefers-reduced-motion: reduce) {
          .video-card__poster--motion {
            animation: none;
          }
        }
        .video-card--grid {
          flex: 1 1 auto;
          display: flex;
          flex-direction: column;
          min-height: 0;
        }
        .video-card--grid .video-card__media {
          flex: 1 1 auto;
          min-height: 11rem;
        }
        .video-card--grid .video-card__body {
          flex-shrink: 0;
        }
        .video-card {
          position: relative;
          border-radius: var(--radius-lg);
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: linear-gradient(165deg, rgba(255, 255, 255, 0.05) 0%, rgba(12, 12, 16, 0.92) 42%, rgba(6, 6, 8, 0.98) 100%);
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.03) inset;
          transition: border-color 0.35s ease, transform 0.35s ease, box-shadow 0.35s ease;
        }
        @media (hover: hover) and (pointer: fine) {
          .video-card:hover {
            border-color: rgba(124, 156, 255, 0.35);
            transform: translateY(-4px);
            box-shadow: 0 20px 56px rgba(0, 0, 0, 0.5), 0 0 48px rgba(124, 156, 255, 0.08);
          }
        }
        .video-card:focus-within {
          border-color: rgba(124, 156, 255, 0.45);
          box-shadow: 0 0 0 2px rgba(124, 156, 255, 0.2), 0 20px 50px rgba(0, 0, 0, 0.45);
        }
        .video-card__media {
          position: relative;
          background: radial-gradient(ellipse 120% 80% at 50% 0%, #1a1d2e 0%, #050508 55%);
          overflow: hidden;
        }
        .video-card--featured .video-card__media {
          aspect-ratio: 16 / 9;
          min-height: 11.5rem;
        }
        @media (min-width: 480px) {
          .video-card--featured .video-card__media {
            min-height: 13rem;
          }
        }
        @media (min-width: 960px) {
          .video-card--featured .video-card__media {
            aspect-ratio: 21 / 9;
            min-height: 12.5rem;
          }
        }
        .video-card__video,
        .video-card__embed {
          width: 100%;
          height: 100%;
          min-height: 160px;
          border: 0;
          object-fit: cover;
        }
        .video-card__embed {
          object-fit: cover;
          pointer-events: none;
        }
        .video-card__embed--layer {
          position: absolute;
          inset: 0;
          z-index: 3;
          min-height: 0;
        }
        .video-card__drive-idle {
          position: absolute;
          inset: 0;
          overflow: hidden;
          z-index: 0;
        }
        .video-card__drive-idle__glow {
          position: absolute;
          width: 140%;
          height: 80%;
          left: -20%;
          top: 35%;
          background: radial-gradient(ellipse, rgba(124, 156, 255, 0.18), transparent 70%);
          opacity: 0.85;
        }
        .video-card__drive-idle__lines {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            -12deg,
            transparent,
            transparent 10px,
            rgba(255, 255, 255, 0.03) 10px,
            rgba(255, 255, 255, 0.03) 11px
          );
          mask-image: linear-gradient(to bottom, black 30%, transparent);
        }
        .video-card__shine {
          position: absolute;
          inset: 0;
          z-index: 1;
          background: linear-gradient(
            125deg,
            rgba(255, 255, 255, 0.14) 0%,
            transparent 38%,
            transparent 62%,
            rgba(124, 156, 255, 0.1) 100%
          );
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }
        @media (hover: hover) and (pointer: fine) {
          .video-card:hover .video-card__shine {
            opacity: 1;
          }
        }
        .video-card__body {
          position: relative;
          padding: var(--space-5) var(--space-5) var(--space-6);
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          background: linear-gradient(to bottom, rgba(8, 8, 10, 0.15), rgba(6, 6, 8, 0.96));
        }
        .video-card__body--cat-only {
          padding: var(--space-3) var(--space-4);
        }
        @media (min-width: 480px) {
          .video-card__body--cat-only {
            padding: var(--space-4) var(--space-5);
          }
        }
        .video-card__cat--solo {
          margin: 0;
          font-size: clamp(0.7rem, 2.8vw, var(--text-sm));
          letter-spacing: clamp(0.06em, 0.8vw, 0.16em);
          font-weight: 600;
          text-transform: uppercase;
          color: var(--text-muted);
          line-height: 1.35;
          overflow-wrap: anywhere;
          hyphens: auto;
        }
        .video-card__title {
          margin: 0 0 var(--space-2);
          font-size: var(--text-base);
          letter-spacing: -0.02em;
          font-weight: 600;
        }
        .video-card__cat {
          margin: 0;
          font-size: var(--text-xs);
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--text-subtle);
        }
        .video-card__desc {
          margin: var(--space-3) 0 0;
          color: var(--text-muted);
          font-size: var(--text-sm);
        }
        .video-card__hit {
          position: absolute;
          inset: 0;
          border: none;
          padding: 0;
          margin: 0;
          background: transparent;
          cursor: pointer;
          border-radius: inherit;
          z-index: 6;
        }
        .skeleton--embed {
          position: absolute;
          inset: 0;
          z-index: 3;
          pointer-events: none;
        }
      `}</style>
    </article>
  );
}
