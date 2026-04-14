import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, ArrowLeft, Phone, Video } from "lucide-react";

function useCalendlyPopup() {
  useEffect(() => {
    if (!document.querySelector('link[href*="calendly.com/assets/external/widget.css"]')) {
      const link = document.createElement("link");
      link.href = "https://assets.calendly.com/assets/external/widget.css";
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }
    if (!document.querySelector('script[src*="calendly.com/assets/external/widget.js"]')) {
      const script = document.createElement("script");
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  const open = () => {
    if ((window as any).Calendly) {
      (window as any).Calendly.initPopupWidget({
        url: "https://calendly.com/smallbizrecon1/smallbiz-recon-advanced-sba-eidl-info-session?hide_event_type_details=1&background_color=faf9f6&text_color=2b2e2a&primary_color=3b4a2c",
      });
    }
  };

  return open;
}

const WHAT_WE_COVER = [
  "Review your current EIDL loan status and any notices you've received",
  "Explain what actions have been taken and what they mean",
  "Outline your options and recommended next steps",
  "Answer your questions about the process",
];

const WHAT_TO_PREPARE = [
  "Your SBA loan number (if available)",
  "Any letters or notices you've received from the SBA, Treasury, or collection agencies",
  "A brief summary of your situation — when things started, what's happened since",
];

const NOT_INCLUDED = [
  "We do not provide legal advice",
  "We are not attorneys and do not represent you in legal matters",
  "This session is educational and informational in nature",
];

export default function PaidConsultation() {
  const openCalendly = useCalendlyPopup();

  return (
    <>
      <style>{`
        .sbr-consult-btn {
          min-height: 48px;
        }
        @media (max-width: 520px) {
          .sbr-consult-btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>

      <div style={{ background: "var(--color-bg)", fontFamily: "var(--font-body)" }}>
        {/* Hero */}
        <section
          aria-labelledby="consultation-page-heading"
          style={{
            padding: "clamp(48px, 10vw, 100px) 20px clamp(48px, 8vw, 80px)",
            background: "var(--color-bg)",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Decorative bg */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "-20%",
              left: "50%",
              transform: "translateX(-50%)",
              width: "80%",
              height: "100%",
              background: "radial-gradient(ellipse at center, rgba(59, 74, 44, 0.02) 0%, transparent 60%)",
              pointerEvents: "none",
            }}
          />

          <div style={{ maxWidth: 640, margin: "0 auto", position: "relative" }}>
            <Link
              to="/home"
              className="sbr-footer-link"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: 14,
                color: "var(--color-text-muted)",
                textDecoration: "none",
                marginBottom: 28,
                minHeight: 44,
              }}
            >
              <ArrowLeft size={16} aria-hidden="true" />
              Back to Home
            </Link>

            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "5px 14px",
              borderRadius: 20,
              background: "rgba(59, 74, 44, 0.06)",
              marginBottom: 20,
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--color-brand-green)",
            }}>
              No cost · No obligation
            </div>

            <h1
              id="consultation-page-heading"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 5vw, 3rem)",
                fontWeight: 400,
                color: "var(--color-text)",
                letterSpacing: "-0.025em",
                lineHeight: 1.1,
                marginBottom: 16,
              }}
            >
              Free Consultation
            </h1>

            <p style={{
              fontSize: "clamp(1rem, 2vw, 1.1rem)",
              color: "var(--color-text-secondary)",
              lineHeight: 1.75,
              maxWidth: 500,
              margin: "0 auto 36px",
              padding: "0 4px",
            }}>
              A 30-minute introductory session to help you understand your SBA EIDL
              situation, your options, and what to do next.
            </p>

            <button
              type="button"
              onClick={openCalendly}
              className="sbr-consult-btn sbr-btn-primary"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "14px 36px",
                borderRadius: 10,
                color: "#FAF9F6",
                fontSize: 16,
                fontWeight: 600,
                fontFamily: "var(--font-body)",
              }}
            >
              Book Your Free Session
              <ArrowRight size={16} aria-hidden="true" />
            </button>

            <div style={{
              display: "flex",
              justifyContent: "center",
              gap: 20,
              marginTop: 20,
              fontSize: 13,
              color: "var(--color-text-muted)",
            }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
                <Video size={14} aria-hidden="true" /> Video call
              </span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
                <Phone size={14} aria-hidden="true" /> Phone call
              </span>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="sbr-section-divider" />

        {/* Content sections */}
        <div style={{
          maxWidth: 680,
          margin: "0 auto",
          padding: "clamp(48px, 8vw, 72px) 20px",
          display: "flex",
          flexDirection: "column",
          gap: "clamp(44px, 6vw, 60px)",
        }}>
          {/* What We Cover */}
          <section aria-labelledby="what-we-cover">
            <h2 id="what-we-cover" style={sectionHeadingStyle}>
              What the consultation covers
            </h2>
            <ul style={listStyle}>
              {WHAT_WE_COVER.map((item) => (
                <li key={item} style={checkListItemStyle}>
                  <div style={{
                    width: 24,
                    height: 24,
                    borderRadius: 6,
                    background: "rgba(59, 74, 44, 0.06)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    marginTop: 1,
                  }}>
                    <CheckCircle size={14} style={{ color: "var(--color-brand-green)" }} aria-hidden="true" />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Who It's For */}
          <section aria-labelledby="who-its-for">
            <h2 id="who-its-for" style={sectionHeadingStyle}>
              Who this is for
            </h2>
            <p style={paragraphStyle}>
              This consultation is for small business owners who have an SBA COVID
              EIDL loan and are experiencing servicing issues — whether you've been
              sent to Treasury, placed in collections, received confusing notices,
              or simply don't know what's happening with your loan.
            </p>
            <p style={paragraphStyle}>
              If you're unsure whether this applies to you, take our{" "}
              <Link to="/case-evaluator" style={{
                color: "var(--color-brand-green)",
                fontWeight: 600,
                textDecoration: "underline",
                textDecorationColor: "rgba(59, 74, 44, 0.3)",
                textUnderlineOffset: "3px",
              }}>
                short case evaluator quiz
              </Link>{" "}
              first — it's free, takes 2 minutes, and will give you a clearer picture.
            </p>
          </section>

          {/* What to Prepare */}
          <section aria-labelledby="what-to-prepare">
            <h2 id="what-to-prepare" style={sectionHeadingStyle}>
              What to have ready
            </h2>
            <ul style={listStyle}>
              {WHAT_TO_PREPARE.map((item, i) => (
                <li key={item} style={checkListItemStyle}>
                  <div style={{
                    width: 24,
                    height: 24,
                    borderRadius: 6,
                    background: "rgba(191, 155, 48, 0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    marginTop: 1,
                    fontSize: 11,
                    fontWeight: 700,
                    color: "var(--color-gold)",
                  }}>
                    {i + 1}
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Important to Know */}
          <section
            aria-labelledby="important-to-know"
            style={{
              padding: "clamp(24px, 3vw, 32px) clamp(22px, 3vw, 28px)",
              background: "var(--color-bg-warm)",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--color-border-light)",
            }}
          >
            <h2 id="important-to-know" style={{ ...sectionHeadingStyle, marginBottom: 14 }}>
              Important to know
            </h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              {NOT_INCLUDED.map((item) => (
                <li key={item} style={{
                  fontSize: 15,
                  color: "var(--color-text-secondary)",
                  lineHeight: 1.65,
                  paddingLeft: 16,
                  borderLeft: "2px solid var(--color-border)",
                }}>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* Bottom CTA */}
          <div style={{
            textAlign: "center",
            padding: "32px 24px",
            background: "var(--color-bg-warm)",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--color-border-light)",
          }}>
            <p style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.2rem, 3vw, 1.5rem)",
              color: "var(--color-text)",
              marginBottom: 20,
              fontWeight: 400,
            }}>
              Ready to talk through your situation?
            </p>
            <button
              type="button"
              onClick={openCalendly}
              className="sbr-consult-btn sbr-btn-primary"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "14px 36px",
                borderRadius: 10,
                color: "#FAF9F6",
                fontSize: 16,
                fontWeight: 600,
                fontFamily: "var(--font-body)",
              }}
            >
              Book Your Free Consultation
              <ArrowRight size={16} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

const sectionHeadingStyle: React.CSSProperties = {
  fontFamily: "var(--font-display)",
  fontSize: "clamp(1.3rem, 3vw, 1.6rem)",
  fontWeight: 400,
  color: "var(--color-text)",
  marginBottom: 18,
  letterSpacing: "-0.01em",
};

const paragraphStyle: React.CSSProperties = {
  fontSize: 15,
  color: "var(--color-text-secondary)",
  lineHeight: 1.75,
  marginBottom: 14,
};

const listStyle: React.CSSProperties = {
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",
  flexDirection: "column",
  gap: 14,
};

const checkListItemStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "flex-start",
  gap: 14,
  fontSize: 15,
  color: "var(--color-text-secondary)",
  lineHeight: 1.65,
};
