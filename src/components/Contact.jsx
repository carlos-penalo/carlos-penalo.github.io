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
    <section id="contact" className="section contact">
      <div className="container contact-inner glass">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 14 }}
          whileInView={reduce ? false : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: reduce ? 0 : 0.45 }}
          className="contact-copy"
        >
          <p className="eyebrow">Contact</p>
          <h2 className="section-title">{siteConfig.contact.headline}</h2>
          <p className="section-lead">{siteConfig.contact.subhead}</p>

          <div className="contact-actions">
            {phoneTel ? (
              <a className="btn btn--primary" href={phoneTel}>
                <Phone size={18} aria-hidden />
                {phone}
              </a>
            ) : null}
            <a className={`btn ${phoneTel ? "btn--ghost" : "btn--primary"}`} href={`mailto:${siteConfig.contact.email}`}>
              <Mail size={18} aria-hidden />
              Email me
            </a>
            <a className="btn btn--ghost" href={siteConfig.contact.linkedinUrl} target="_blank" rel="noreferrer">
              <Linkedin size={18} aria-hidden />
              LinkedIn
            </a>
            {showInstagram ? (
              <a className="btn btn--ghost" href={siteConfig.contact.instagramUrl} target="_blank" rel="noreferrer">
                <Instagram size={18} aria-hidden />
                Instagram
              </a>
            ) : null}
            <button type="button" className="btn btn--ghost" onClick={copyEmail} aria-describedby={statusId}>
              <Copy size={18} aria-hidden />
              Copy email
            </button>
          </div>
          <p id={statusId} className="copy-status" role="status">
            {copied ? "Email copied to clipboard." : "\u00a0"}
          </p>
        </motion.div>

        <motion.form
          className="contact-form"
          action={siteConfig.contact.formspreeEndpoint}
          method="POST"
          initial={reduce ? false : { opacity: 0, y: 14 }}
          whileInView={reduce ? false : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: reduce ? 0 : 0.45, delay: reduce ? 0 : 0.05 }}
        >
          <p className="form-note">
            Form posts to Formspree. Replace <code>formspreeEndpoint</code> in{" "}
            <code>src/config/siteConfig.js</code> with your form URL.
          </p>
          <label className="field">
            <span>Name</span>
            <input name="name" type="text" autoComplete="name" required />
          </label>
          <label className="field">
            <span>Email</span>
            <input name="email" type="email" autoComplete="email" required />
          </label>
          <label className="field">
            <span>Message</span>
            <textarea name="message" rows={4} required />
          </label>
          <button type="submit" className="btn btn--primary form-submit">
            Send message
          </button>
        </motion.form>
      </div>
      <style>{`
        .contact-inner {
          border-radius: var(--radius-lg);
          padding: var(--space-8);
          border: 1px solid var(--border);
          display: grid;
          gap: var(--space-10);
        }
        @media (min-width: 960px) {
          .contact-inner {
            grid-template-columns: 1fr 0.9fr;
            align-items: start;
          }
        }
        .contact-actions {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-3);
          margin-top: var(--space-4);
        }
        .copy-status {
          min-height: 1.4em;
          margin: var(--space-3) 0 0;
          font-size: var(--text-sm);
          color: var(--accent);
        }
        .contact-form {
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
        }
        .form-note {
          margin: 0;
          font-size: var(--text-sm);
          color: var(--text-muted);
        }
        .form-note code {
          font-size: 0.9em;
          color: var(--text);
        }
        .field {
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
          font-size: var(--text-sm);
          color: var(--text-muted);
        }
        .field input,
        .field textarea {
          border-radius: var(--radius-md);
          border: 1px solid var(--border);
          background: rgba(0, 0, 0, 0.35);
          color: var(--text);
          font: inherit;
          padding: var(--space-3) var(--space-4);
        }
        .field input:focus-visible,
        .field textarea:focus-visible {
          border-color: rgba(124, 156, 255, 0.55);
          outline: none;
          box-shadow: 0 0 0 3px var(--accent-soft);
        }
        .form-submit {
          align-self: flex-start;
        }
      `}</style>
    </section>
  );
}
