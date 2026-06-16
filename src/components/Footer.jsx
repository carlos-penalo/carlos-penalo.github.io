import { ArrowUp } from "lucide-react";
import { siteConfig } from "@/config/siteConfig.js";

export function Footer() {
  const year = new Date().getFullYear();

  const showInstagram = Boolean(siteConfig.contact.instagramUrl?.trim());
  const phone = typeof siteConfig.contact.phone === "string" ? siteConfig.contact.phone.trim() : "";
  const phoneTel = phone ? `tel:+${phone.replace(/\D/g, "")}` : "";

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <p className="footer-name">{siteConfig.name}</p>
          <p className="footer-role">{siteConfig.role}</p>
        </div>
        <div className="footer-links">
          <a href={siteConfig.contact.linkedinUrl} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          {showInstagram ? (
            <a href={siteConfig.contact.instagramUrl} target="_blank" rel="noreferrer">
              Instagram
            </a>
          ) : null}
          <a href={`mailto:${siteConfig.contact.email}`}>Email</a>
          {phoneTel ? (
            <a href={phoneTel}>
              {phone}
            </a>
          ) : null}
        </div>
        <div className="footer-meta">
          <span>© {year}</span>
          <button type="button" className="to-top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <ArrowUp size={18} aria-hidden />
            Back to top
          </button>
        </div>
      </div>
      <style>{`
        .footer {
          padding: var(--space-12) 0 var(--space-10);
          border-top: 1px solid var(--border);
          background: rgba(0, 0, 0, 0.35);
        }
        .footer-inner {
          display: grid;
          gap: var(--space-6);
        }
        @media (min-width: 900px) {
          .footer-inner {
            grid-template-columns: 1fr auto 1fr;
            align-items: center;
          }
        }
        .footer-name {
          margin: 0;
          font-weight: 700;
        }
        .footer-role {
          margin: var(--space-2) 0 0;
          color: var(--text-muted);
          font-size: var(--text-sm);
        }
        .footer-links {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-4);
          font-size: var(--text-sm);
          color: var(--text-muted);
        }
        .footer-links a:hover {
          color: var(--text);
        }
        .footer-meta {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-4);
          align-items: center;
          color: var(--text-subtle);
          font-size: var(--text-sm);
        }
        @media (min-width: 900px) {
          .footer-meta {
            justify-self: end;
          }
        }
        .to-top {
          display: inline-flex;
          align-items: center;
          gap: var(--space-2);
          border: 1px solid var(--border);
          background: rgba(255, 255, 255, 0.04);
          color: var(--text);
          border-radius: 999px;
          padding: 8px 14px;
          font: inherit;
          font-size: var(--text-sm);
          cursor: pointer;
        }
        .to-top:hover {
          border-color: var(--border-strong);
        }
      `}</style>
    </footer>
  );
}
