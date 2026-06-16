import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/siteConfig.js";
import { driveFilePreviewUrl } from "@/lib/googleDrive.js";

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Hero({ heroVideoProject }) {
  const reduce = useReducedMotion();
  const h = siteConfig.hero;

  return (
    <section id="top" className="hero section section--tight-top">
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-bg__grid" />
        <div className="hero-bg__glow" />
        <div className="hero-bg__tracks">
          <span />
          <span />
          <span />
        </div>
      </div>

      <div className="container hero-inner">
        <motion.div
          className="hero-copy"
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={reduce ? false : { opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          {h.urgency ? <p className="hero-urgency">{h.urgency}</p> : null}
          <h1 className="hero-title">
            <span className="hero-title__a">{h.headline}</span>{" "}
            <span className="hero-title__b">{h.headlineAccent}</span>
          </h1>
          <p className="hero-sub">{h.subhead}</p>
          <div className="hero-actions">
            <button type="button" className="btn btn--primary" onClick={() => scrollToId("work")}>
              {h.primaryCta}
              <ArrowRight size={18} aria-hidden />
            </button>
            <button type="button" className="btn btn--ghost" onClick={() => scrollToId("contact")}>
              {h.secondaryCta}
            </button>
          </div>
          {h.statValue ? (
            <div className="hero-stat glass" aria-label={`${h.statValue} ${h.statLabel}`}>
              <span className="hero-stat__value">{h.statValue}</span>
              <span className="hero-stat__label">{h.statLabel}</span>
            </div>
          ) : null}
        </motion.div>

        {heroVideoProject && (
          <motion.div
            className="hero-reel glass"
            initial={reduce ? false : { opacity: 0, y: 22 }}
            animate={reduce ? false : { opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0 : 0.6, delay: reduce ? 0 : 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="hero-reel__chrome">
              <span className="hero-reel__dot" />
              <span className="hero-reel__dot" />
              <span className="hero-reel__dot" />
              <span className="hero-reel__label">Featured preview</span>
            </div>
            <div className="hero-reel__media">
              {heroVideoProject.googleDriveFileId ? (
                <>
                  {heroVideoProject.poster ? (
                    <img
                      className="hero-reel__thumb"
                      src={heroVideoProject.poster}
                      alt=""
                      loading="eager"
                      decoding="async"
                      draggable={false}
                      aria-hidden
                    />
                  ) : null}
                  <iframe
                    title=""
                    className="hero-reel__video hero-reel__embed"
                    src={driveFilePreviewUrl(heroVideoProject.googleDriveFileId, { autoplay: !reduce, loop: !reduce })}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </>
              ) : (
                <video
                  className="hero-reel__video"
                  src={heroVideoProject.src}
                  poster={heroVideoProject.poster ?? undefined}
                  muted
                  playsInline
                  loop
                  preload="metadata"
                  controls={false}
                  autoPlay={!reduce}
                />
              )}
              <div className="hero-reel__vignette" aria-hidden />
            </div>
            <p className="hero-reel__caption">{heroVideoProject.category}</p>
          </motion.div>
        )}
      </div>

      <style>{`
        .hero {
          position: relative;
          overflow: hidden;
          padding-bottom: var(--space-24);
        }
        .hero-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        .hero-bg__grid {
          position: absolute;
          inset: -20% -10% auto -10%;
          height: 70%;
          background-image: linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
          background-size: 48px 48px;
          opacity: 0.35;
          mask-image: radial-gradient(circle at 50% 0%, black, transparent 70%);
        }
        .hero-bg__glow {
          position: absolute;
          width: 520px;
          height: 520px;
          left: 50%;
          top: -120px;
          transform: translateX(-50%);
          background: radial-gradient(circle, rgba(124, 156, 255, 0.22), transparent 65%);
          filter: blur(4px);
        }
        .hero-bg__tracks {
          position: absolute;
          inset: auto 8% 12% 8%;
          display: flex;
          flex-direction: column;
          gap: 10px;
          opacity: 0.25;
        }
        .hero-bg__tracks span {
          height: 3px;
          border-radius: 999px;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.35), transparent);
        }
        .hero-inner {
          position: relative;
          display: grid;
          gap: var(--space-12);
          align-items: center;
        }
        @media (min-width: 960px) {
          .hero-inner {
            grid-template-columns: 1.05fr 0.95fr;
          }
        }
        .hero-urgency {
          margin: 0 0 var(--space-4);
          font-size: var(--text-xs);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--accent);
          font-weight: 600;
        }
        .hero-title {
          font-size: clamp(2.1rem, 6vw, 3.75rem);
          line-height: 1.02;
          letter-spacing: -0.035em;
          margin: 0 0 var(--space-4);
          font-weight: 650;
        }
        .hero-title__a {
          color: var(--text);
        }
        .hero-title__b {
          color: rgba(244, 244, 246, 0.92);
          background: linear-gradient(120deg, #fff 0%, rgba(124, 156, 255, 0.95) 45%, rgba(124, 156, 255, 0.65) 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .hero-sub {
          margin: 0 0 var(--space-8);
          color: var(--text-muted);
          font-size: clamp(1rem, 2.8vw, var(--text-lg));
          max-width: 52ch;
          line-height: 1.55;
        }
        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-3);
        }
        .hero-stat {
          margin-top: var(--space-8);
          display: inline-flex;
          align-items: center;
          gap: var(--space-4);
          padding: var(--space-3) var(--space-5);
          border-radius: 999px;
          border: 1px solid var(--border);
          max-width: 100%;
        }
        .hero-stat__value {
          font-size: var(--text-xl);
          font-weight: 750;
          letter-spacing: -0.03em;
        }
        .hero-stat__label {
          font-size: var(--text-xs);
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          line-height: 1.35;
        }
        .hero-reel {
          border-radius: var(--radius-lg);
          overflow: hidden;
          border: 1px solid var(--border);
          box-shadow: var(--shadow-card);
        }
        .hero-reel__chrome {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 10px 12px;
          border-bottom: 1px solid var(--border);
          background: rgba(0, 0, 0, 0.25);
        }
        .hero-reel__dot {
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.18);
        }
        .hero-reel__label {
          margin-left: auto;
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-subtle);
        }
        .hero-reel__media {
          position: relative;
          aspect-ratio: 16 / 9;
          background: #000;
        }
        .hero-reel__thumb {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 0;
        }
        .hero-reel__video {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .hero-reel__embed {
          border: 0;
          position: relative;
          z-index: 1;
        }
        .hero-reel__vignette {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.45), transparent 50%),
            radial-gradient(ellipse 80% 60% at 50% 40%, transparent 40%, rgba(0, 0, 0, 0.25));
        }
        .hero-reel__caption {
          margin: 0;
          padding: var(--space-4);
          font-size: var(--text-xs);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-muted);
          border-top: 1px solid var(--border);
        }
      `}</style>
    </section>
  );
}
