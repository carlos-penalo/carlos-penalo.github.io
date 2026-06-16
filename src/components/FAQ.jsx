import { siteConfig } from "@/config/siteConfig.js";

export function FAQ() {
  const { faq } = siteConfig;

  return (
    <section id="faq" className="section faq">
      <div className="container">
        <p className="eyebrow">{faq.eyebrow}</p>
        <h2 className="section-title">{faq.title}</h2>
        <p className="section-lead faq-lead">{faq.lead}</p>
        <div className="faq-list">
          {faq.items.map((item) => (
            <details key={item.q} className="faq-item glass">
              <summary className="faq-item__summary">{item.q}</summary>
              <p className="faq-item__a">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
      <style>{`
        .faq-lead {
          margin-bottom: var(--space-8);
        }
        .faq-list {
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
          max-width: 52rem;
        }
        .faq-item {
          border-radius: var(--radius-md);
          border: 1px solid var(--border);
          padding: 0;
          overflow: hidden;
        }
        .faq-item__summary {
          cursor: pointer;
          list-style: none;
          padding: var(--space-4) var(--space-5);
          font-weight: 600;
          font-size: var(--text-sm);
          color: var(--text);
        }
        .faq-item__summary::-webkit-details-marker {
          display: none;
        }
        .faq-item__summary::after {
          content: "+";
          float: right;
          color: var(--text-subtle);
          font-weight: 500;
        }
        .faq-item[open] .faq-item__summary::after {
          content: "–";
        }
        .faq-item__a {
          margin: 0;
          padding: 0 var(--space-5) var(--space-5);
          color: var(--text-muted);
          font-size: var(--text-sm);
          line-height: 1.6;
        }
      `}</style>
    </section>
  );
}
