import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Clock, Shield } from "lucide-react";

const DETAILS = [
  { icon: Calendar, text: "30-minute introductory session" },
  { icon: Clock, text: "Understand your situation and options" },
  { icon: Shield, text: "No obligation, no pressure" },
];

export default function ConsultationSection() {
  return (
    <>
      <style>{`
        @media (max-width: 520px) {
          .sbr-consult-cta {
            width: 100%;
            justify-content: center;
            text-align: center;
          }
        }
      `}</style>

      <section
        aria-labelledby="consultation-heading"
        style={{
          padding: "clamp(56px, 8vw, 100px) 20px",
          background: "var(--color-bg-warm)",
        }}
      >
        <div style={{
          maxWidth: 680,
          margin: "0 auto",
        }}>
          <h2
            id="consultation-heading"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.6rem, 4vw, 2.3rem)",
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
            fontSize: "clamp(0.9rem, 1.8vw, 1rem)",
            color: "var(--color-text-secondary)",
            lineHeight: 1.7,
            fontFamily: "var(--font-body)",
            marginBottom: 24,
            maxWidth: 560,
          }}>
            Book a free consultation with our team. We'll walk through your EIDL
            situation, explain what's happening, and outline clear next steps —
            whether that means working with us or handling it on your own.
          </p>

          <ul style={{
            listStyle: "none",
            padding: 0,
            margin: "0 0 28px",
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}>
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
                  <Icon
                    size={18}
                    style={{ color: "var(--color-brand-green)", flexShrink: 0 }}
                    aria-hidden="true"
                  />
                  {item.text}
                </li>
              );
            })}
          </ul>

          <Link
            to="/consultation"
            className="sbr-consult-cta"
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
              minHeight: 48,
            }}
          >
            Book Your Free Consultation
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
