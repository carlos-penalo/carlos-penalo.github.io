import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Clapperboard, Menu, X } from "lucide-react";
import { siteConfig } from "@/config/siteConfig.js";

function scrollToHash(hash) {
  const id = hash.replace("#", "");
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Navbar() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const panelRef = useRef(null);
  const firstLinkRef = useRef(null);
  const { nav } = siteConfig;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
      className="rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors duration-300 hover:bg-white/[0.06] hover:text-fg"
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
    <header className="sticky top-0 z-[1000] px-4 pt-4 md:px-6">
      <div className="mx-auto w-full max-w-[min(96vw,860px)]">
        <div
          className={`flex items-center justify-between gap-2 rounded-full border border-white/10 bg-black/55 px-3 shadow-card backdrop-blur-xl transition-all duration-300 sm:gap-3 md:gap-4 md:px-5 ${
            scrolled ? "min-h-[56px] py-2" : "min-h-[68px] py-2.5"
          }`}
        >
          <a
            className="flex shrink-0 items-center gap-3"
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
              closeMenu();
            }}
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent text-white shadow-[0_0_24px_rgba(255,23,23,0.35)]">
              <Clapperboard className="h-5 w-5" aria-hidden />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="whitespace-nowrap font-semibold tracking-tight text-fg">{siteConfig.name}</span>
              <span className="whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">
                {siteConfig.role}
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
            {nav.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-full px-2.5 py-2 text-sm font-semibold text-muted transition-colors duration-300 hover:text-fg md:px-3"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToHash(l.href);
                }}
              >
                {l.label}
              </a>
            ))}
            <a
              className="ml-1 inline-flex items-center justify-center whitespace-nowrap rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-white shadow-[0_0_32px_rgba(255,23,23,0.25)] transition duration-300 hover:scale-[1.04] hover:shadow-[0_0_44px_rgba(255,23,23,0.4)] md:px-5"
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
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] text-fg transition hover:border-white/25 hover:bg-white/[0.07] md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={panelRef}
            className="mx-4 mt-3 rounded-3xl border border-white/10 bg-black/70 p-4 shadow-card backdrop-blur-xl md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={reduce ? false : { opacity: 0, y: -8 }}
            animate={reduce ? false : { opacity: 1, y: 0 }}
            exit={reduce ? false : { opacity: 0, y: -8 }}
            transition={{ duration: reduce ? 0 : 0.22 }}
          >
            <div className="flex flex-col gap-1">
              {nav.links.map((l, i) => navLink(l.href, l.label, i === 0))}
              <a
                className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-accent py-3 text-sm font-semibold text-white"
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
    </header>
  );
}
