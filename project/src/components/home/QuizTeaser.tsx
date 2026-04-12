import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function QuizTeaser() {
  return (
    <section
      aria-labelledby="quiz-teaser-heading"
      style={{
        padding: "clamp(60px, 8vw, 100px) 24px",
        background: "var(--color-bg)",
      }}
    >
      <div style={{
        maxWidth: 720,
        margin: "0 auto",
        padding: "clamp(36px, 5vw, 56px) clamp(28px, 5vw, 48px)",
        background: "var(--color-brand-green)",
        borderRadius: 16,
        textAlign: "center",
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
          fontSize: 16,
          color: "rgba(250, 249, 246, 0.75)",
          maxWidth: 480,
          margin: "0 auto 32px",
          lineHeight: 1.7,
          fontFamily: "var(--font-body)",
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
            gap: 8,
            padding: "14px 28px",
            borderRadius: 8,
            background: "#FAF9F6",
            color: "var(--color-brand-green)",
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
    </section>
  );
}
