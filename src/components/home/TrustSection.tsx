const TRUST_POINTS = [
  {
    title: "Educational Guidance",
    description: "We explain SBA processes in plain language so you can make informed decisions about your loan.",
  },
  {
    title: "Structured Help",
    description: "We ensure the correct requests and documents are prepared and submitted on your behalf.",
  },
  {
    title: "Real Experience",
    description: "Our guidance comes from direct, hands-on experience with SBA EIDL servicing — not theory.",
  },
];

export default function TrustSection() {
  return (
    <>
      <style>{`
        .sbr-trust-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          text-align: left;
        }
        @media (max-width: 700px) {
          .sbr-trust-grid {
            grid-template-columns: 1fr;
            gap: 0;
          }
        }
      `}</style>

      <section
        aria-labelledby="trust-heading"
        style={{
          padding: "clamp(56px, 8vw, 100px) 20px",
          background: "var(--color-bg)",
        }}
      >
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <h2
            id="trust-heading"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.6rem, 4vw, 2.3rem)",
              fontWeight: 400,
              color: "var(--color-text)",
              letterSpacing: "-0.02em",
              marginBottom: 12,
            }}
          >
            What you can expect
          </h2>

          <p style={{
            fontSize: "clamp(0.9rem, 1.8vw, 1rem)",
            color: "var(--color-text-secondary)",
            maxWidth: 500,
            margin: "0 auto clamp(32px, 5vw, 48px)",
            lineHeight: 1.7,
            fontFamily: "var(--font-body)",
            padding: "0 8px",
          }}>
            We don't offer legal advice and we're not your lawyer. Here's what we
            do provide.
          </p>

          <div className="sbr-trust-grid">
            {TRUST_POINTS.map((point) => (
              <div
                key={point.title}
                style={{
                  padding: "clamp(20px, 3vw, 28px) clamp(16px, 2.5vw, 24px)",
                  borderTop: "2px solid var(--color-brand-green)",
                }}
              >
                <h3 style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 16,
                  fontWeight: 600,
                  color: "var(--color-text)",
                  marginBottom: 8,
                }}>
                  {point.title}
                </h3>
                <p style={{
                  fontSize: 15,
                  color: "var(--color-text-secondary)",
                  lineHeight: 1.65,
                  fontFamily: "var(--font-body)",
                  margin: 0,
                }}>
                  {point.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
