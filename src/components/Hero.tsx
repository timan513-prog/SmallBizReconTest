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
          padding: "clamp(64px, 12vw, 120px) 20px clamp(56px, 10vw, 100px)",
          background: "var(--color-bg)",
        }}
      >
        <div style={{
          maxWidth: 720,
          margin: "0 auto",
          textAlign: "center",
        }}>
          {/* Eyebrow — only one on the entire homepage */}
          <div
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
              For Small Business Owners With EIDL Loans
            </span>
          </div>

          <h1 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 5.5vw, 3.25rem)",
            fontWeight: 400,
            color: "var(--color-text)",
            lineHeight: 1.1,
            letterSpacing: "-0.025em",
            margin: "0 0 22px",
          }}>
            Got a letter from Treasury about your{" "}
            <span style={{
              fontStyle: "italic",
              color: "var(--color-brand-green)",
            }}>
              EIDL loan?
            </span>
          </h1>

          <p style={{
            fontSize: "clamp(1rem, 2vw, 1.1rem)",
            color: "var(--color-text-secondary)",
            lineHeight: 1.75,
            maxWidth: 520,
            margin: "0 auto 40px",
            fontFamily: "var(--font-body)",
            padding: "0 4px",
          }}>
            You're not in trouble — you have options. We'll help you understand
            what's happening with your loan, what it means, and what to do next.
            No legal jargon, no runaround.
          </p>

          <div className="sbr-hero-ctas">
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
              See Where You Stand
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
              Talk to Someone Who Gets It
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>

          <div
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
            <span>Free</span>
            <span style={{ color: "var(--color-border)" }}>·</span>
            <span>No account needed</span>
            <span style={{ color: "var(--color-border)" }}>·</span>
            <span>No sales pitch</span>
          </div>
        </div>
      </section>
    </>
  );
}
