import { useId, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Copy, Instagram, Linkedin, Mail, Phone } from "lucide-react";
import { siteConfig } from "@/config/siteConfig.js";

export function Contact() {
  const reduce = useReducedMotion();
  const [copied, setCopied] = useState(false);
  const statusId = useId();

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.contact.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const showInstagram = Boolean(siteConfig.contact.instagramUrl?.trim());
  const phone = typeof siteConfig.contact.phone === "string" ? siteConfig.contact.phone.trim() : "";
  const phoneTel = phone ? `tel:+${phone.replace(/\D/g, "")}` : "";

  return (
    <section id="contact" className="scroll-mt-28 px-4 py-20 md:px-6 md:py-28">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-12 rounded-3xl border border-white/10 bg-card/80 p-8 shadow-card backdrop-blur-md md:gap-14 md:p-12 lg:grid-cols-[1fr_0.95fr]">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 14 }}
            whileInView={reduce ? false : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: reduce ? 0 : 0.45 }}
          >
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">Contact</p>
            <h2 className="font-medium tracking-tight text-fg text-[clamp(2rem,4vw,3rem)]">{siteConfig.contact.headline}</h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">{siteConfig.contact.subhead}</p>

            <div className="mt-8 flex flex-col flex-wrap gap-3 sm:flex-row">
              {phoneTel ? (
                <a
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-[0_0_32px_rgba(255,23,23,0.25)] transition hover:scale-[1.02]"
                  href={phoneTel}
                >
                  <Phone className="h-4 w-4" aria-hidden />
                  {phone}
                </a>
              ) : null}
              <a
                className={`inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold transition hover:border-white/25 hover:bg-white/[0.05] ${
                  phoneTel ? "bg-transparent text-fg" : "bg-accent text-white shadow-[0_0_32px_rgba(255,23,23,0.25)]"
                }`}
                href={`mailto:${siteConfig.contact.email}`}
              >
                <Mail className="h-4 w-4" aria-hidden />
                Email me
              </a>
              <a
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-fg transition hover:border-white/25 hover:bg-white/[0.05]"
                href={siteConfig.contact.linkedinUrl}
                target="_blank"
                rel="noreferrer"
              >
                <Linkedin className="h-4 w-4" aria-hidden />
                LinkedIn
              </a>
              {showInstagram ? (
                <a
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-fg transition hover:border-white/25 hover:bg-white/[0.05]"
                  href={siteConfig.contact.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Instagram className="h-4 w-4" aria-hidden />
                  Instagram
                </a>
              ) : null}
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-fg transition hover:border-white/25 hover:bg-white/[0.05]"
                onClick={copyEmail}
                aria-describedby={statusId}
              >
                <Copy className="h-4 w-4" aria-hidden />
                Copy email
              </button>
            </div>
            <p id={statusId} className="mt-3 min-h-[1.25em] text-sm text-accent" role="status">
              {copied ? "Email copied to clipboard." : "\u00a0"}
            </p>
          </motion.div>

          <motion.form
            className="flex flex-col gap-4"
            action={siteConfig.contact.formspreeEndpoint}
            method="POST"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            whileInView={reduce ? false : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: reduce ? 0 : 0.45, delay: reduce ? 0 : 0.05 }}
          >
            <p className="m-0 text-sm text-muted">
              I’ll get back to you as soon as I can — usually within a couple of business days.
            </p>
            <label className="flex flex-col gap-2 text-sm text-muted">
              <span>Name</span>
              <input
                name="name"
                type="text"
                autoComplete="name"
                required
                className="rounded-2xl border border-white/12 bg-black/40 px-4 py-3 text-fg outline-none transition focus:border-accent/60 focus:ring-2 focus:ring-accent/25"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm text-muted">
              <span>Email</span>
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                className="rounded-2xl border border-white/12 bg-black/40 px-4 py-3 text-fg outline-none transition focus:border-accent/60 focus:ring-2 focus:ring-accent/25"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm text-muted">
              <span>Message</span>
              <textarea
                name="message"
                rows={4}
                required
                className="resize-y rounded-2xl border border-white/12 bg-black/40 px-4 py-3 text-fg outline-none transition focus:border-accent/60 focus:ring-2 focus:ring-accent/25"
              />
            </label>
            <button
              type="submit"
              className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-white shadow-[0_0_32px_rgba(255,23,23,0.25)] transition hover:scale-[1.02] sm:w-auto"
            >
              Send message
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
