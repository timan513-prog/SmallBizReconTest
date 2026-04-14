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
          boxShadow: "var(--shadow-lg)",
        }}>
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
            margin: "0 auto 28px",
            lineHeight: 1.75,
            fontFamily: "var(--font-body)",
            padding: "0 4px",
          }}>
            Answer 5 quick questions about your EIDL loan. We'll tell you what
            stage you're in, what it means, and what your options are — in plain
            English.
          </p>

          <div style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "8px 24px",
            marginBottom: 28,
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
            Check My Situation
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
