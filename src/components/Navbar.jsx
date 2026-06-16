import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/config/siteConfig.js";

function scrollToHash(hash) {
  const id = hash.replace("#", "");
  const el = document.getElementById(id);
  el?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Navbar() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);
  const firstLinkRef = useRef(null);
  const { nav } = siteConfig;

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => firstLinkRef.current?.focus(), 50);
    return () => window.clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
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
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  const navLink = (href, label, refFirst = false) => (
    <a
      key={href}
      href={href}
      ref={refFirst ? firstLinkRef : undefined}
      className="nav-link"
      onClick={(e) => {
        e.preventDefault();
        scrollToHash(href);
        closeMenu();
      }}
    >
      {label}
    </a>
  );

  return (
    <header className="nav-header">
      <div className="container nav-inner glass">
        <a
          className="wordmark"
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
            closeMenu();
          }}
        >
          <span className="wordmark__name">{siteConfig.name}</span>
          <span className="wordmark__role">{siteConfig.role}</span>
        </a>

        <nav className="nav-desktop" aria-label="Primary">
          {nav.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                scrollToHash(l.href);
              }}
            >
              {l.label}
            </a>
          ))}
          <a
            className="btn btn--primary nav-cta"
            href={nav.cta.href}
            onClick={(e) => {
              e.preventDefault();
              scrollToHash(nav.cta.href);
            }}
          >
            {nav.cta.label}
          </a>
        </nav>

        <button
          type="button"
          className="nav-burger"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={panelRef}
            className="nav-mobile-panel glass"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={reduce ? false : { opacity: 0, y: -8 }}
            animate={reduce ? false : { opacity: 1, y: 0 }}
            exit={reduce ? false : { opacity: 0, y: -8 }}
            transition={{ duration: reduce ? 0 : 0.22 }}
          >
            <div className="nav-mobile-links">
              {nav.links.map((l, i) => navLink(l.href, l.label, i === 0))}
              <a
                className="btn btn--primary nav-mobile-cta"
                href={nav.cta.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToHash(nav.cta.href);
                  closeMenu();
                }}
              >
                {nav.cta.label}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .nav-header {
          position: sticky;
          top: 0;
          z-index: 1000;
          padding: var(--space-4) var(--space-4) 0;
        }
        .nav-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--space-4);
          padding: var(--space-3) var(--space-4);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-soft);
        }
        .wordmark {
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 0;
        }
        .wordmark__name {
          font-weight: 700;
          letter-spacing: -0.02em;
          font-size: var(--text-sm);
          white-space: nowrap;
        }
        .wordmark__role {
          font-size: var(--text-xs);
          color: var(--text-subtle);
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }
        .nav-desktop {
          display: none;
          align-items: center;
          gap: var(--space-4);
        }
        @media (min-width: 960px) {
          .nav-desktop {
            display: flex;
          }
          .nav-burger {
            display: none;
          }
        }
        .nav-link {
          font-size: var(--text-sm);
          color: var(--text-muted);
          padding: var(--space-2) var(--space-2);
          border-radius: var(--radius-sm);
          transition: color var(--transition-fast), background var(--transition-fast);
        }
        .nav-link:hover {
          color: var(--text);
          background: rgba(255, 255, 255, 0.06);
        }
        .nav-cta {
          padding-inline: var(--space-5);
          text-transform: capitalize;
        }
        .nav-burger {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 12px;
          border: 1px solid var(--border);
          background: rgba(255, 255, 255, 0.04);
          color: var(--text);
          cursor: pointer;
        }
        .nav-burger:hover {
          border-color: var(--border-strong);
          background: rgba(255, 255, 255, 0.07);
        }
        .nav-mobile-panel {
          margin: var(--space-3) var(--space-4) 0;
          border-radius: var(--radius-lg);
          padding: var(--space-4);
          border: 1px solid var(--border);
        }
        @media (min-width: 960px) {
          .nav-mobile-panel {
            display: none;
          }
        }
        .nav-mobile-links {
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
        }
        .nav-mobile-links .nav-link {
          padding: var(--space-3) var(--space-3);
        }
        .nav-mobile-cta {
          margin-top: var(--space-2);
          width: 100%;
          text-transform: capitalize;
        }
      `}</style>
    </header>
  );
}
