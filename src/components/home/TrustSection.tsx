const TRUST_POINTS = [
  {
    title: "We explain what's happening",
    description: "SBA notices are confusing by design. We translate them into plain English so you know exactly where you stand.",
  },
  {
    title: "We handle the paperwork",
    description: "Disputes, recalls, and payment requests all require specific forms submitted the right way. We prepare and file them for you.",
  },
  {
    title: "We've seen your situation before",
    description: "This isn't theoretical. We've handled EIDL cases across every stage — from first notice to resolution.",
  },
];

export default function TrustSection() {
  return (
    <>
      <style>{`
        .sbr-trust-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
          text-align: left;
        }
        @media (max-width: 700px) {
          .sbr-trust-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
        }
      `}</style>

      <section
        aria-labelledby="trust-heading"
        style={{
          padding: "clamp(64px, 8vw, 100px) 20px",
          background: "var(--color-bg)",
        }}
      >
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "clamp(36px, 5vw, 52px)" }}>
            <h2
              id="trust-heading"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.6rem, 4vw, 2.3rem)",
                fontWeight: 400,
                color: "var(--color-text)",
                letterSpacing: "-0.02em",
                marginBottom: 14,
              }}
            >
              How we help
            </h2>

            <p style={{
              fontSize: "clamp(0.9rem, 1.8vw, 1rem)",
              color: "var(--color-text-secondary)",
              maxWidth: 480,
              margin: "0 auto",
              lineHeight: 1.7,
              fontFamily: "var(--font-body)",
              padding: "0 8px",
            }}>
              We've worked with hundreds of small business owners in the same
              situation. Here's what we actually do.
            </p>
          </div>

          <div className="sbr-trust-grid">
            {TRUST_POINTS.map((point) => (
              <div
                key={point.title}
                style={{
                  padding: "clamp(24px, 3vw, 32px) clamp(20px, 2.5vw, 24px)",
                  borderTop: "2px solid var(--color-brand-green)",
                }}
              >
                <h3 style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 16,
                  fontWeight: 600,
                  color: "var(--color-text)",
                  marginBottom: 10,
                  lineHeight: 1.3,
                }}>
                  {point.title}
                </h3>
                <p style={{
                  fontSize: 15,
                  color: "var(--color-text-secondary)",
                  lineHeight: 1.7,
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
