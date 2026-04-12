import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Clock, Shield } from "lucide-react";

const DETAILS = [
  { icon: Calendar, text: "30-minute introductory session" },
  { icon: Clock, text: "Understand your situation and options" },
  { icon: Shield, text: "No obligation, no pressure" },
];

export default function ConsultationSection() {
  return (
    <section
      aria-labelledby="consultation-heading"
      style={{
        padding: "clamp(60px, 8vw, 100px) 24px",
        background: "var(--color-bg-warm)",
      }}
    >
      <div style={{
        maxWidth: 800,
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: 40,
        alignItems: "center",
      }}
        className="consultation-grid"
      >
        <div>
          <h2
            id="consultation-heading"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.8rem, 4vw, 2.4rem)",
              fontWeight: 400,
              color: "var(--color-text)",
              letterSpacing: "-0.02em",
              marginBottom: 14,
            }}
          >
            Talk to someone who understands{" "}
            <span style={{ fontStyle: "italic" }}>your situation.</span>
          </h2>

          <p style={{
            fontSize: 16,
            color: "var(--color-text-secondary)",
            lineHeight: 1.7,
            fontFamily: "var(--font-body)",
            marginBottom: 28,
            maxWidth: 560,
          }}>
            Book a free consultation with our team. We'll walk through your EIDL
            situation, explain what's happening, and outline clear next steps —
            whether that means working with us or handling it on your own.
          </p>

          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px", display: "flex", flexDirection: "column", gap: 14 }}>
            {DETAILS.map((item) => {
              const Icon = item.icon;
              return (
                <li
                  key={item.text}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    fontSize: 15,
                    color: "var(--color-text-secondary)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  <Icon size={18} style={{ color: "var(--color-brand-green)", flexShrink: 0 }} aria-hidden="true" />
                  {item.text}
                </li>
              );
            })}
          </ul>

          <Link
            to="/consultation"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "14px 28px",
              borderRadius: 8,
              background: "var(--color-brand-green)",
              color: "#FAF9F6",
              fontSize: 15,
              fontWeight: 600,
              textDecoration: "none",
              fontFamily: "var(--font-body)",
            }}
          >
            Book Your Free Consultation
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .consultation-grid {
            max-width: 800px !important;
          }
        }
      `}</style>
    </section>
  );
}
