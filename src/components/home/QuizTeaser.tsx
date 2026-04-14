import { Link } from "react-router-dom";
import { ArrowRight, Clock, Lock } from "lucide-react";

export default function QuizTeaser() {
  return (
    <>
      <style>{`
        .sbr-quiz-cta {
          min-height: 48px;
        }
        @media (max-width: 520px) {
          .sbr-quiz-cta {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>

      <section
        aria-labelledby="quiz-teaser-heading"
        style={{
          padding: "clamp(56px, 8vw, 100px) 20px",
          background: "var(--color-bg)",
        }}
      >
        <div style={{
          maxWidth: 720,
          margin: "0 auto",
          padding: "clamp(40px, 6vw, 64px) clamp(28px, 5vw, 52px)",
          background: "var(--color-brand-green)",
          borderRadius: "var(--radius-lg)",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
          boxShadow: "0 20px 50px rgba(59, 74, 44, 0.2)",
        }}>
          {/* Subtle texture */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(ellipse at 20% 50%, rgba(255,255,255,0.04) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(191, 155, 48, 0.06) 0%, transparent 40%)",
              pointerEvents: "none",
            }}
          />

          <div style={{ position: "relative" }}>
            <h2
              id="quiz-teaser-heading"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.6rem, 4vw, 2.2rem)",
                fontWeight: 400,
                color: "#FAF9F6",
                letterSpacing: "-0.02em",
                marginBottom: 14,
              }}
            >
              Not sure where you stand?
            </h2>

            <p style={{
              fontSize: "clamp(0.9rem, 1.8vw, 1.05rem)",
              color: "rgba(250, 249, 246, 0.7)",
              maxWidth: 460,
              margin: "0 auto 32px",
              lineHeight: 1.75,
              fontFamily: "var(--font-body)",
              padding: "0 4px",
            }}>
              Our short case evaluator asks a few simple questions about your EIDL
              situation and gives you a clear picture of where things stand — with
              recommended next steps.
            </p>

            {/* Quick trust points */}
            <div style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "8px 24px",
              marginBottom: 32,
            }}>
              {[
                { icon: Clock, label: "Takes 2 minutes" },
                { icon: Lock, label: "No login required" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <span
                    key={item.label}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      fontSize: 13,
                      color: "rgba(250, 249, 246, 0.55)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    <Icon size={14} aria-hidden="true" />
                    {item.label}
                  </span>
                );
              })}
            </div>

            <Link
              to="/case-evaluator"
              className="sbr-btn-inverse sbr-quiz-cta"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                padding: "14px 32px",
                borderRadius: 10,
                fontSize: 15,
                fontWeight: 600,
                textDecoration: "none",
                fontFamily: "var(--font-body)",
              }}
            >
              Start the Short Quiz
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
