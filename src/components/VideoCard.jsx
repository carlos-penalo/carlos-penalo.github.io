import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Play } from "lucide-react";
import { usePreviewVideo } from "@/context/PreviewVideoContext.jsx";
import { useHoverCapable } from "@/hooks/useHoverCapable.js";

export function VideoCard({ project, onOpen, variant = "grid" }) {
  const reduce = useReducedMotion();
  const hoverCapable = useHoverCapable();
  const { register, pause, playPreview } = usePreviewVideo();
  const rootRef = useRef(null);
  const videoRef = useRef(null);
  const hoverTimerRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const inView = useInView(rootRef, { amount: 0.35, margin: "0px 0px -12% 0px" });

  useEffect(() => {
    register(project.id, videoRef.current);
    return () => register(project.id, null);
  }, [project.id, register]);

  useEffect(() => {
    if (!inView) pause(project.id);
  }, [inView, pause, project.id]);

  const clearHoverTimer = () => {
    if (hoverTimerRef.current) {
      window.clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
  };

  const onEnter = () => {
    if (!hoverCapable) return;
    clearHoverTimer();
    hoverTimerRef.current = window.setTimeout(() => {
      playPreview(project.id);
    }, 260);
  };

  const onLeave = () => {
    clearHoverTimer();
    pause(project.id);
  };

  useEffect(() => () => clearHoverTimer(), []);

  const mediaAspect = variant === "featured" ? "21 / 9" : "16 / 9";

  return (
    <article ref={rootRef} className={`video-card ${variant === "featured" ? "video-card--featured" : ""}`}>
      <div
        className="video-card__media"
        style={{ aspectRatio: mediaAspect }}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
      >
        {!loaded && <div className="skeleton" aria-hidden />}
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
        <div className="video-card__shine" aria-hidden />
        <div className="video-card__icons" aria-hidden>
          <span className="play-badge">
            <Play size={18} />
          </span>
        </div>
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
        whileHover={reduce ? undefined : { scale: 1.01 }}
        whileTap={reduce ? undefined : { scale: 0.995 }}
      />

      <style>{`
        .video-card {
          position: relative;
          border-radius: var(--radius-lg);
          overflow: hidden;
          border: 1px solid var(--border);
          background: rgba(255, 255, 255, 0.02);
          box-shadow: var(--shadow-card);
          transition: border-color var(--transition-med), transform var(--transition-med),
            box-shadow var(--transition-med);
        }
        @media (hover: hover) and (pointer: fine) {
          .video-card:hover {
            border-color: rgba(255, 255, 255, 0.22);
            transform: translateY(-3px);
            box-shadow: 0 22px 60px rgba(0, 0, 0, 0.45);
          }
        }
        .video-card__media {
          position: relative;
          background: #000;
          overflow: hidden;
        }
        .video-card--featured .video-card__media {
          min-height: 220px;
        }
        .video-card__video {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .video-card__shine {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.12), transparent 40%, transparent 70%, rgba(124, 156, 255, 0.12));
          opacity: 0;
          transition: opacity var(--transition-med);
          pointer-events: none;
        }
        @media (hover: hover) and (pointer: fine) {
          .video-card:hover .video-card__shine {
            opacity: 1;
          }
        }
        .video-card__icons {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: flex-end;
          justify-content: flex-end;
          padding: var(--space-4);
          pointer-events: none;
        }
        .play-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 999px;
          background: rgba(0, 0, 0, 0.45);
          border: 1px solid rgba(255, 255, 255, 0.18);
          color: var(--text);
        }
        .video-card__body {
          position: relative;
          padding: var(--space-5);
          border-top: 1px solid var(--border);
          background: linear-gradient(to bottom, rgba(10, 10, 12, 0.2), rgba(10, 10, 12, 0.92));
        }
        .video-card__title {
          margin: 0 0 var(--space-2);
          font-size: var(--text-base);
          letter-spacing: -0.02em;
        }
        .video-card__cat {
          margin: 0;
          font-size: var(--text-xs);
          letter-spacing: 0.12em;
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
        }
      `}</style>
    </article>
  );
}
