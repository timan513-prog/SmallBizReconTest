import { Link } from "react-router-dom";
import { ArrowRight, ClipboardCheck } from "lucide-react";

export default function Hero() {
  return (
    <>
      <style>{`
        .sbr-hero-ctas {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 12px;
          margin-bottom: 32px;
        }
        .sbr-hero-ctas a {
          min-height: 48px;
        }
        @media (max-width: 520px) {
          .sbr-hero-ctas {
            flex-direction: column;
            align-items: stretch;
          }
          .sbr-hero-ctas a {
            justify-content: center;
            width: 100%;
            text-align: center;
          }
        }
      `}</style>

      <section
        aria-label="SmallBiz Recon — SBA EIDL servicing guidance"
        style={{
          padding: "clamp(72px, 12vw, 140px) 20px clamp(56px, 10vw, 100px)",
          background: "var(--color-bg)",
          position: "relative",
        }}
      >
        <div style={{
          maxWidth: 740,
          margin: "0 auto",
          textAlign: "center",
        }}>
          {/* Eyebrow */}
          <p style={{
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--color-gold)",
            marginBottom: 18,
            fontFamily: "var(--font-body)",
          }}>
            SBA COVID EIDL Guidance
          </p>

          {/* Headline */}
          <h1 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.9rem, 5.5vw, 3.25rem)",
            fontWeight: 400,
            color: "var(--color-text)",
            lineHeight: 1.12,
            letterSpacing: "-0.02em",
            margin: "0 0 20px",
          }}>
            Your SBA loan shouldn't feel{" "}
            <span style={{ fontStyle: "italic", color: "var(--color-brand-green)" }}>
              impossible to navigate.
            </span>
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: "clamp(0.95rem, 2vw, 1.1rem)",
            color: "var(--color-text-secondary)",
            lineHeight: 1.7,
            maxWidth: 560,
            margin: "0 auto 36px",
            fontFamily: "var(--font-body)",
            padding: "0 4px",
          }}>
            SmallBiz Recon helps small business owners understand and resolve SBA
            COVID EIDL servicing issues — from Treasury referrals and collections
            to disputes, recalls, and structured next steps.
          </p>

          {/* CTAs */}
          <div className="sbr-hero-ctas">
            <Link
              to="/case-evaluator"
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
              <ClipboardCheck size={18} aria-hidden="true" />
              Take the Short Quiz
            </Link>

            <Link
              to="/consultation"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "14px 28px",
                borderRadius: 8,
                background: "transparent",
                border: "1.5px solid var(--color-border)",
                color: "var(--color-text)",
                fontSize: 15,
                fontWeight: 600,
                textDecoration: "none",
                fontFamily: "var(--font-body)",
              }}
            >
              Book a Free Consultation
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>

          {/* Trust strip */}
          <p style={{
            fontSize: 13,
            color: "var(--color-text-muted)",
            fontFamily: "var(--font-body)",
            lineHeight: 1.6,
            padding: "0 8px",
          }}>
            No login required · No cost to get started · Educational guidance, not legal advice
          </p>
        </div>
      </section>
    </>
  );
}
