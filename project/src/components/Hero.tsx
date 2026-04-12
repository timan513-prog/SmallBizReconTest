import { Link } from "react-router-dom";
import { ArrowRight, ClipboardCheck } from "lucide-react";

export default function Hero() {
  return (
    <section
      aria-label="SmallBiz Recon — SBA EIDL servicing guidance"
      style={{
        padding: "clamp(80px, 12vw, 140px) 24px clamp(60px, 10vw, 100px)",
        background: "var(--color-bg)",
        position: "relative",
      }}
    >
      <div style={{
        maxWidth: 780,
        margin: "0 auto",
        textAlign: "center",
      }}>
        {/* Eyebrow */}
        <p style={{
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--color-gold)",
          marginBottom: 20,
          fontFamily: "var(--font-body)",
        }}>
          SBA COVID EIDL Guidance
        </p>

        {/* Headline */}
        <h1 style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2.2rem, 5.5vw, 3.5rem)",
          fontWeight: 400,
          color: "var(--color-text)",
          lineHeight: 1.1,
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
          fontSize: "clamp(1rem, 2vw, 1.15rem)",
          color: "var(--color-text-secondary)",
          lineHeight: 1.7,
          maxWidth: 580,
          margin: "0 auto 36px",
          fontFamily: "var(--font-body)",
        }}>
          SmallBiz Recon helps small business owners understand and resolve SBA
          COVID EIDL servicing issues — from Treasury referrals and collections
          to disputes, recalls, and structured next steps.
        </p>

        {/* CTAs */}
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 14,
          marginBottom: 32,
        }}>
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
        }}>
          No login required &middot; No cost to get started &middot; Educational guidance, not legal advice
        </p>
      </div>
    </section>
  );
}
