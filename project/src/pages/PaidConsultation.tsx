import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, ArrowLeft } from "lucide-react";

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
            padding: "clamp(48px, 10vw, 100px) 20px clamp(40px, 8vw, 80px)",
            background: "var(--color-bg)",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: 640, margin: "0 auto" }}>
            <Link
              to="/home"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: 14,
                color: "var(--color-text-muted)",
                textDecoration: "none",
                marginBottom: 24,
                minHeight: 44,
              }}
            >
              <ArrowLeft size={16} aria-hidden="true" />
              Back to Home
            </Link>

            <h1
              id="consultation-page-heading"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.8rem, 5vw, 2.8rem)",
                fontWeight: 400,
                color: "var(--color-text)",
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                marginBottom: 14,
              }}
            >
              Free Consultation
            </h1>

            <p style={{
              fontSize: "clamp(0.95rem, 2vw, 1.06rem)",
              color: "var(--color-text-secondary)",
              lineHeight: 1.7,
              maxWidth: 520,
              margin: "0 auto 32px",
              padding: "0 4px",
            }}>
              A 30-minute introductory session to help you understand your SBA EIDL
              situation, your options, and what to do next.
            </p>

            <button
              type="button"
              onClick={openCalendly}
              className="sbr-consult-btn"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "14px 32px",
                borderRadius: 8,
                background: "var(--color-brand-green)",
                color: "#FAF9F6",
                fontSize: 16,
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
                fontFamily: "var(--font-body)",
              }}
            >
              Book Your Free Session
              <ArrowRight size={16} aria-hidden="true" />
            </button>

            <p style={{
              fontSize: 13,
              color: "var(--color-text-muted)",
              marginTop: 14,
            }}>
              No cost · No obligation · Video or phone call
            </p>
          </div>
        </section>

        {/* Divider */}
        <div style={{
          height: 1,
          background: "var(--color-border-light)",
          maxWidth: 720,
          margin: "0 auto",
          marginLeft: "auto",
          marginRight: "auto",
        }} />

        {/* Content sections */}
        <div style={{
          maxWidth: 680,
          margin: "0 auto",
          padding: "clamp(40px, 8vw, 72px) 20px",
          display: "flex",
          flexDirection: "column",
          gap: "clamp(40px, 6vw, 56px)",
        }}>
          {/* What We Cover */}
          <section aria-labelledby="what-we-cover">
            <h2 id="what-we-cover" style={sectionHeadingStyle}>
              What the consultation covers
            </h2>
            <ul style={listStyle}>
              {WHAT_WE_COVER.map((item) => (
                <li key={item} style={checkListItemStyle}>
                  <CheckCircle size={18} style={{ color: "var(--color-brand-green)", flexShrink: 0, marginTop: 2 }} aria-hidden="true" />
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
              <Link to="/case-evaluator" style={{ color: "var(--color-brand-green)", fontWeight: 500 }}>
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
              {WHAT_TO_PREPARE.map((item) => (
                <li key={item} style={checkListItemStyle}>
                  <span style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "var(--color-gold)",
                    flexShrink: 0,
                    marginTop: 8,
                  }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Important to Know */}
          <section
            aria-labelledby="important-to-know"
            style={{
              padding: "clamp(20px, 3vw, 28px) clamp(18px, 3vw, 24px)",
              background: "var(--color-bg-warm)",
              borderRadius: 12,
              border: "1px solid var(--color-border-light)",
            }}
          >
            <h2 id="important-to-know" style={{ ...sectionHeadingStyle, marginBottom: 12 }}>
              Important to know
            </h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
              {NOT_INCLUDED.map((item) => (
                <li key={item} style={{
                  fontSize: 15,
                  color: "var(--color-text-secondary)",
                  lineHeight: 1.6,
                }}>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* Bottom CTA */}
          <div style={{ textAlign: "center", paddingTop: 4 }}>
            <button
              type="button"
              onClick={openCalendly}
              className="sbr-consult-btn"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "14px 32px",
                borderRadius: 8,
                background: "var(--color-brand-green)",
                color: "#FAF9F6",
                fontSize: 16,
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
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
  fontSize: "clamp(1.2rem, 3vw, 1.5rem)",
  fontWeight: 400,
  color: "var(--color-text)",
  marginBottom: 16,
};

const paragraphStyle: React.CSSProperties = {
  fontSize: 15,
  color: "var(--color-text-secondary)",
  lineHeight: 1.7,
  marginBottom: 12,
};

const listStyle: React.CSSProperties = {
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",
  flexDirection: "column",
  gap: 12,
};

const checkListItemStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "flex-start",
  gap: 12,
  fontSize: 15,
  color: "var(--color-text-secondary)",
  lineHeight: 1.6,
};
