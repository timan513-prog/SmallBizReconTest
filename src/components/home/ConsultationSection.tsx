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
            {/* Left — Copy */}
            <div>
              <p style={{
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--color-text-muted)",
                marginBottom: 14,
                fontFamily: "var(--font-body)",
              }}>
                Free consultation
              </p>

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
                Book a free consultation with our team. We'll walk through your EIDL
                situation, explain what's happening, and outline clear next steps —
                whether that means working with us or handling it on your own.
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
                Book Your Free Consultation
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>

            {/* Right — Feature card */}
            <div style={{
              background: "var(--color-bg-card)",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--color-border-light)",
              padding: "clamp(28px, 4vw, 40px)",
              boxShadow: "var(--shadow-md)",
            }}>
              <h3 style={{
                fontFamily: "var(--font-body)",
                fontSize: 14,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "var(--color-text-muted)",
                marginBottom: 24,
              }}>
                What to expect
              </h3>

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
                        alignItems: "flex-start",
                        gap: 14,
                        fontSize: 15,
                        color: "var(--color-text-secondary)",
                        fontFamily: "var(--font-body)",
                        lineHeight: 1.5,
                      }}
                    >
                      <div style={{
                        width: 40,
                        height: 40,
                        borderRadius: 10,
                        background: "rgba(59, 74, 44, 0.05)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}>
                        <Icon
                          size={18}
                          style={{ color: "var(--color-brand-green)" }}
                          aria-hidden="true"
                        />
                      </div>
                      <span style={{ paddingTop: 9 }}>{item.text}</span>
                    </li>
                  );
                })}
              </ul>

              <div style={{
                marginTop: 24,
                paddingTop: 20,
                borderTop: "1px solid var(--color-border-light)",
                fontSize: 13,
                color: "var(--color-text-muted)",
                fontFamily: "var(--font-body)",
                lineHeight: 1.6,
              }}>
                Video or phone call — your choice. We'll send you a confirmation with everything you need.
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
