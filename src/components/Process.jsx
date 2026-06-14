import { motion, useReducedMotion } from "framer-motion";
import { Clapperboard, MessageCircle, Rocket, Send } from "lucide-react";
import { siteConfig } from "@/config/siteConfig.js";

const icons = [MessageCircle, Clapperboard, Rocket, Send];

export function Process() {
  const reduce = useReducedMotion();
  const steps = siteConfig.process.map((s, i) => ({
    ...s,
    icon: icons[i] ?? MessageCircle,
  }));

  return (
    <section id="process" className="section process">
      <div className="container">
        <p className="eyebrow">How it flows</p>
        <h2 className="section-title">Process</h2>
        <p className="section-lead">A simple loop that keeps projects moving without surprises.</p>

        <ol className="process-track">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.li
                key={s.title}
                className="process-step glass"
                initial={reduce ? false : { opacity: 0, y: 12 }}
                whileInView={reduce ? false : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-12% 0px" }}
                transition={{ duration: reduce ? 0 : 0.4, delay: reduce ? 0 : i * 0.07 }}
              >
                <div className="process-step__icon" aria-hidden>
                  <Icon size={20} strokeWidth={1.75} />
                </div>
                <div>
                  <h3 className="process-step__title">{s.title}</h3>
                  <p className="process-step__desc">{s.description}</p>
                </div>
                {i < steps.length - 1 ? <span className="process-connector" aria-hidden /> : null}
              </motion.li>
            );
          })}
        </ol>
      </div>
      <style>{`
        .process-track {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          gap: var(--space-4);
          grid-template-columns: 1fr;
        }
        @media (min-width: 900px) {
          .process-track {
            grid-template-columns: repeat(4, minmax(0, 1fr));
            gap: var(--space-3);
            align-items: stretch;
          }
        }
        .process-step {
          position: relative;
          border-radius: var(--radius-lg);
          padding: var(--space-5);
          border: 1px solid var(--border);
          display: flex;
          gap: var(--space-4);
          align-items: flex-start;
        }
        @media (min-width: 900px) {
          .process-step {
            flex-direction: column;
            min-height: 100%;
          }
        }
        .process-step__icon {
          width: 44px;
          height: 44px;
          border-radius: 14px;
          display: grid;
          place-items: center;
          border: 1px solid var(--border);
          background: rgba(255, 255, 255, 0.04);
          color: var(--accent);
          flex-shrink: 0;
        }
        .process-step__title {
          margin: 0 0 var(--space-2);
          font-size: var(--text-base);
        }
        .process-step__desc {
          margin: 0;
          color: var(--text-muted);
          font-size: var(--text-sm);
        }
        .process-connector {
          display: none;
        }
        @media (min-width: 900px) {
          .process-connector {
            display: block;
            position: absolute;
            top: 50%;
            right: -14px;
            width: 28px;
            height: 2px;
            background: linear-gradient(90deg, rgba(124, 156, 255, 0.1), rgba(124, 156, 255, 0.55), rgba(124, 156, 255, 0.1));
            transform: translateY(-50%);
            z-index: 2;
          }
        }
      `}</style>
    </section>
  );
}
