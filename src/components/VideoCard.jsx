import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { usePreviewVideo } from "@/context/PreviewVideoContext.jsx";
import { useHoverCapable } from "@/hooks/useHoverCapable.js";
import { driveFilePreviewUrl } from "@/lib/googleDrive.js";

export function VideoCard({ project, onOpen, variant = "grid" }) {
  const reduce = useReducedMotion();
  const hoverCapable = useHoverCapable();
  const { register, pause, playPreview } = usePreviewVideo();
  const rootRef = useRef(null);
  const videoRef = useRef(null);
  const hoverTimerRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [pointerOver, setPointerOver] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);

  const inView = useInView(rootRef, { amount: 0.28, margin: "0px 0px -10% 0px" });
  const isDrive = Boolean(project.googleDriveFileId);

  /** Desktop: load / play preview on hover or keyboard focus. Touch: when card is on screen. */
  const previewActive = hoverCapable ? pointerOver || focusWithin : inView;

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
    if (!isDrive) pause(project.id);
  };

  useEffect(() => () => clearHoverTimer(), []);

  const mediaAspect = variant === "featured" ? "21 / 9" : "16 / 9";

  const driveIframeSrc =
    isDrive && previewActive
      ? driveFilePreviewUrl(project.googleDriveFileId, { autoplay: !reduce })
      : "";

  const showDriveIdle = isDrive && !driveIframeSrc;

  useEffect(() => {
    if (!isDrive) return;
    if (!driveIframeSrc) setLoaded(false);
  }, [driveIframeSrc, isDrive]);

  return (
    <article
      ref={rootRef}
      className={`video-card ${variant === "featured" ? "video-card--featured" : ""}`}
      onFocusCapture={() => setFocusWithin(true)}
      onBlurCapture={(e) => {
        if (!rootRef.current?.contains(e.relatedTarget)) setFocusWithin(false);
      }}
    >
      <div className="video-card__media" style={{ aspectRatio: mediaAspect }}>
        {isDrive ? (
          <>
            {driveIframeSrc ? (
              <iframe
                title=""
                key={driveIframeSrc}
                src={driveIframeSrc}
                loading="lazy"
                className="video-card__embed"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                onLoad={() => setLoaded(true)}
              />
            ) : (
              <div className="video-card__drive-idle" aria-hidden>
                <span className="video-card__drive-idle__lines" />
                <span className="video-card__drive-idle__glow" />
              </div>
            )}
            {!loaded && driveIframeSrc ? <div className="skeleton skeleton--embed" aria-hidden /> : null}
          </>
        ) : (
          <>
            {!loaded ? <div className="skeleton" aria-hidden /> : null}
            <video
              ref={videoRef}
              src={project.src}
              poster={project.poster ?? undefined}
              muted
              playsInline
              loop
              preload="metadata"
              loading="lazy"
              className="video-card__video"
              onLoadedMetadata={() => setLoaded(true)}
            />
          </>
        )}
        <div className="video-card__shine" aria-hidden />
        {showDriveIdle && hoverCapable ? (
          <div className="video-card__idle-label">Hover to preview</div>
        ) : null}
      </div>

      <div className="video-card__body">
        <div>
          <h3 className="video-card__title">{project.title}</h3>
          <p className="video-card__cat">{project.category}</p>
          {project.description ? <p className="video-card__desc">{project.description}</p> : null}
        </div>
      </div>

      <motion.button
        type="button"
        className="video-card__hit"
        aria-label={`Open ${project.title} in viewer`}
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
          min-height: 220px;
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
        .video-card__drive-idle {
          position: absolute;
          inset: 0;
          overflow: hidden;
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
        .video-card__idle-label {
          position: absolute;
          right: var(--space-4);
          bottom: var(--space-4);
          font-size: 10px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.35);
          pointer-events: none;
        }
        @media (prefers-reduced-motion: reduce) {
          .video-card__idle-label {
            display: none;
          }
        }
        .video-card__body {
          position: relative;
          padding: var(--space-5) var(--space-5) var(--space-6);
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          background: linear-gradient(to bottom, rgba(8, 8, 10, 0.15), rgba(6, 6, 8, 0.96));
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
          z-index: 2;
        }
        .skeleton--embed {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
        }
      `}</style>
    </article>
  );
}
