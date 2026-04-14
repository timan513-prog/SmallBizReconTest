import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Clock, Shield } from "lucide-react";

const DETAILS = [
  { icon: Calendar, text: "30 minutes on Zoom or phone" },
  { icon: Clock, text: "We explain your situation in plain language" },
  { icon: Shield, text: "No contracts, no upsell" },
];

export default function ConsultationSection() {
  return (
    <>
      <style>{`
        .sbr-consult-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: center;
        }
        @media (max-width: 768px) {
          .sbr-consult-layout {
            grid-template-columns: 1fr;
            gap: 32px;
          }
        }
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
          padding: "clamp(64px, 8vw, 100px) 20px",
          background: "var(--color-bg-warm)",
        }}
      >
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div className="sbr-consult-layout">
            <div>
              <h2
                id="consultation-heading"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.6rem, 4vw, 2.3rem)",
                  fontWeight: 400,
                  color: "var(--color-text)",
                  letterSpacing: "-0.02em",
                  marginBottom: 16,
                  lineHeight: 1.15,
                }}
              >
                Talk to someone who{" "}
                <span style={{ fontStyle: "italic" }}>actually</span>{" "}
                understands.
              </h2>

              <p style={{
                fontSize: "clamp(0.9rem, 1.8vw, 1.05rem)",
                color: "var(--color-text-secondary)",
                lineHeight: 1.75,
                fontFamily: "var(--font-body)",
                marginBottom: 28,
                maxWidth: 480,
              }}>
                In 30 minutes, we'll review your loan situation, explain what the
                SBA has done (and why), and give you a clear plan — even if you
                decide to handle it yourself.
              </p>

              <Link
                to="/consultation"
                className="sbr-consult-cta sbr-btn-primary"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "14px 30px",
                  borderRadius: 10,
                  color: "#FAF9F6",
                  fontSize: 15,
                  fontWeight: 600,
                  textDecoration: "none",
                  fontFamily: "var(--font-body)",
                  minHeight: 48,
                }}
              >
                Schedule a Free Call
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>

            <div style={{
              background: "var(--color-bg-card)",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--color-border-light)",
              padding: "clamp(28px, 4vw, 40px)",
              boxShadow: "var(--shadow-md)",
            }}>
              <ul style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: 20,
              }}>
                {DETAILS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li
                      key={item.text}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 14,
                        fontSize: 15,
                        color: "var(--color-text-secondary)",
                        fontFamily: "var(--font-body)",
                        lineHeight: 1.5,
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
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
