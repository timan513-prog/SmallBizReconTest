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
          gap: 14px;
          margin-bottom: 36px;
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
          padding: "clamp(80px, 14vw, 160px) 20px clamp(64px, 10vw, 120px)",
          background: "var(--color-bg)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle decorative gradient orb */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "-20%",
            right: "-10%",
            width: "50%",
            height: "80%",
            background: "radial-gradient(ellipse at center, rgba(59, 74, 44, 0.03) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: "-10%",
            left: "-10%",
            width: "40%",
            height: "60%",
            background: "radial-gradient(ellipse at center, rgba(191, 155, 48, 0.03) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div style={{
          maxWidth: 720,
          margin: "0 auto",
          textAlign: "center",
          position: "relative",
        }}>
          {/* Eyebrow */}
          <div
            className="animate-fade-in"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 16px",
              borderRadius: 20,
              background: "rgba(191, 155, 48, 0.08)",
              border: "1px solid rgba(191, 155, 48, 0.15)",
              marginBottom: 24,
            }}
          >
            <div style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "var(--color-gold)",
            }} />
            <span style={{
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--color-gold)",
              fontFamily: "var(--font-body)",
            }}>
              SBA COVID EIDL Guidance
            </span>
          </div>

          {/* Headline */}
          <h1
            className="animate-fade-in"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 5.5vw, 3.4rem)",
              fontWeight: 400,
              color: "var(--color-text)",
              lineHeight: 1.1,
              letterSpacing: "-0.025em",
              margin: "0 0 22px",
            }}
          >
            Your SBA loan shouldn't feel{" "}
            <span style={{
              fontStyle: "italic",
              color: "var(--color-brand-green)",
              textDecoration: "underline",
              textDecorationColor: "rgba(59, 74, 44, 0.15)",
              textUnderlineOffset: "6px",
              textDecorationThickness: "2px",
            }}>
              impossible to navigate.
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className="animate-fade-in"
            style={{
              fontSize: "clamp(1rem, 2vw, 1.125rem)",
              color: "var(--color-text-secondary)",
              lineHeight: 1.75,
              maxWidth: 560,
              margin: "0 auto 40px",
              fontFamily: "var(--font-body)",
              padding: "0 4px",
            }}
          >
            SmallBiz Recon helps small business owners understand and resolve SBA
            COVID EIDL servicing issues — from Treasury referrals and collections
            to disputes, recalls, and structured next steps.
          </p>

          {/* CTAs */}
          <div className="sbr-hero-ctas animate-fade-in">
            <Link
              to="/case-evaluator"
              className="sbr-btn-primary"
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
              }}
            >
              <ClipboardCheck size={18} aria-hidden="true" />
              Take the Short Quiz
            </Link>

            <Link
              to="/consultation"
              className="sbr-btn-secondary"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "14px 30px",
                borderRadius: 10,
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
          <div
            className="animate-fade-in"
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "6px 20px",
              fontSize: 13,
              color: "var(--color-text-muted)",
              fontFamily: "var(--font-body)",
              lineHeight: 1.6,
            }}
          >
            <span>No login required</span>
            <span style={{ color: "var(--color-border)" }}>·</span>
            <span>No cost to get started</span>
            <span style={{ color: "var(--color-border)" }}>·</span>
            <span>Educational guidance, not legal advice</span>
          </div>
        </div>
      </section>
    </>
  );
}
