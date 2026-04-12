import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function QuizTeaser() {
  return (
    <section
      aria-labelledby="quiz-teaser-heading"
      style={{
        padding: "clamp(48px, 8vw, 100px) 20px",
        background: "var(--color-bg)",
      }}
    >
      <div style={{
        maxWidth: 700,
        margin: "0 auto",
        padding: "clamp(32px, 5vw, 52px) clamp(24px, 5vw, 44px)",
        background: "var(--color-brand-green)",
        borderRadius: "clamp(12px, 2vw, 16px)",
        textAlign: "center",
      }}>
        <h2
          id="quiz-teaser-heading"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.5rem, 4vw, 2.1rem)",
            fontWeight: 400,
            color: "#FAF9F6",
            letterSpacing: "-0.02em",
            marginBottom: 12,
          }}
        >
          Not sure where you stand?
        </h2>

        <p style={{
          fontSize: "clamp(0.9rem, 1.8vw, 1rem)",
          color: "rgba(250, 249, 246, 0.75)",
          maxWidth: 460,
          margin: "0 auto 28px",
          lineHeight: 1.7,
          fontFamily: "var(--font-body)",
          padding: "0 4px",
        }}>
          Our short case evaluator asks a few simple questions about your EIDL
          situation and gives you a clear picture of where things stand — with
          recommended next steps. Takes about 2 minutes. No login, no cost.
        </p>

        <Link
          to="/case-evaluator"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            padding: "14px 28px",
            borderRadius: 8,
            background: "#FAF9F6",
            color: "var(--color-brand-green)",
            fontSize: 15,
            fontWeight: 600,
            textDecoration: "none",
            fontFamily: "var(--font-body)",
            minHeight: 48,
          }}
        >
          Start the Short Quiz
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
