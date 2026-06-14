import { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export function VideoModal({ open, playlist, activeIndex, onClose, onNavigate }) {
  const reduce = useReducedMotion();
  const closeBtnRef = useRef(null);
  const dialogRef = useRef(null);
  const videoRef = useRef(null);
  const project = playlist[activeIndex];

  const cycle = useCallback(
    (delta) => {
      if (!playlist.length) return;
      const next = (activeIndex + delta + playlist.length) % playlist.length;
      onNavigate(next);
    },
    [activeIndex, onNavigate, playlist.length]
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") cycle(-1);
      if (e.key === "ArrowRight") cycle(1);
      if (e.key !== "Tab" || !dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll(
        'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const list = Array.from(focusable);
      if (!list.length) return;
      const first = list[0];
      const last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose, cycle]);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => closeBtnRef.current?.focus(), 30);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.clearTimeout(t);
    };
  }, [open]);

  useEffect(() => {
    const v = videoRef.current;
    if (!open || !v) return;
    v.muted = false;
    const p = v.play();
    if (p && typeof p.catch === "function") p.catch(() => {});
    return () => {
      try {
        v.pause();
        v.currentTime = 0;
      } catch {
        /* ignore */
      }
    };
  }, [open, activeIndex, project?.id]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && project ? (
        <motion.div
          className="modal-layer"
          role="presentation"
          initial={reduce ? false : { opacity: 0 }}
          animate={reduce ? false : { opacity: 1 }}
          exit={reduce ? false : { opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.22 }}
        >
          <button
            type="button"
            className="modal-backdrop"
            aria-label="Close viewer"
            tabIndex={-1}
            onClick={onClose}
          />

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="video-modal-title"
            className="modal-dialog glass"
            initial={reduce ? false : { opacity: 0, y: 16, scale: 0.98 }}
            animate={reduce ? false : { opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? false : { opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: reduce ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-toolbar">
              <div className="modal-titles">
                <p className="modal-eyebrow">{project.category}</p>
                <h2 id="video-modal-title" className="modal-title">
                  {project.title}
                </h2>
              </div>
              <button ref={closeBtnRef} type="button" className="icon-btn" onClick={onClose} aria-label="Close">
                <X size={22} />
              </button>
            </div>

            <div className="modal-player">
              <video
                ref={videoRef}
                key={project.id}
                className="modal-video"
                src={project.src}
                poster={project.poster ?? undefined}
                controls
                playsInline
                preload="metadata"
              />
            </div>

            {project.description ? <p className="modal-desc">{project.description}</p> : null}

            <div className="modal-nav">
              <button type="button" className="btn btn--ghost modal-nav-btn" onClick={() => cycle(-1)}>
                <ChevronLeft size={18} aria-hidden />
                Previous
              </button>
              <span className="modal-counter" aria-live="polite">
                {activeIndex + 1} / {playlist.length}
              </span>
              <button type="button" className="btn btn--ghost modal-nav-btn" onClick={() => cycle(1)}>
                Next
                <ChevronRight size={18} aria-hidden />
              </button>
            </div>
          </motion.div>

          <style>{`
            .modal-layer {
              position: fixed;
              inset: 0;
              z-index: 2000;
              display: grid;
              place-items: center;
              padding: var(--space-4);
            }
            .modal-backdrop {
              position: absolute;
              inset: 0;
              border: 0;
              margin: 0;
              background: rgba(0, 0, 0, 0.72);
              cursor: pointer;
            }
            .modal-dialog {
              position: relative;
              z-index: 1;
              width: min(1040px, 100%);
              max-height: min(92vh, 900px);
              display: flex;
              flex-direction: column;
              border-radius: var(--radius-lg);
              border: 1px solid var(--border);
              overflow: hidden;
              box-shadow: var(--shadow-soft);
            }
            .modal-toolbar {
              display: flex;
              align-items: flex-start;
              justify-content: space-between;
              gap: var(--space-4);
              padding: var(--space-4) var(--space-5);
              border-bottom: 1px solid var(--border);
            }
            .modal-eyebrow {
              margin: 0 0 var(--space-2);
              font-size: var(--text-xs);
              letter-spacing: 0.14em;
              text-transform: uppercase;
              color: var(--text-subtle);
            }
            .modal-title {
              margin: 0;
              font-size: var(--text-xl);
              letter-spacing: -0.02em;
            }
            .icon-btn {
              width: 44px;
              height: 44px;
              border-radius: 12px;
              border: 1px solid var(--border);
              background: rgba(255, 255, 255, 0.04);
              color: var(--text);
              display: inline-flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
            }
            .icon-btn:hover {
              border-color: var(--border-strong);
              background: rgba(255, 255, 255, 0.08);
            }
            .modal-player {
              background: #000;
              flex: 1;
              min-height: 0;
            }
            .modal-video {
              width: 100%;
              height: 100%;
              max-height: min(62vh, 640px);
              object-fit: contain;
              background: #000;
            }
            .modal-desc {
              margin: 0;
              padding: var(--space-4) var(--space-5) 0;
              color: var(--text-muted);
              font-size: var(--text-sm);
            }
            .modal-nav {
              display: flex;
              align-items: center;
              justify-content: space-between;
              gap: var(--space-3);
              padding: var(--space-4) var(--space-5) var(--space-5);
            }
            .modal-nav-btn {
              flex: 1;
              max-width: 200px;
            }
            .modal-counter {
              font-size: var(--text-sm);
              color: var(--text-subtle);
            }
          `}</style>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body
  );
}
