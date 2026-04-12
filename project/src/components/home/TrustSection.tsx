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
    <section
      aria-labelledby="trust-heading"
      style={{
        padding: "clamp(60px, 8vw, 100px) 24px",
        background: "var(--color-bg)",
      }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        <h2
          id="trust-heading"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.8rem, 4vw, 2.4rem)",
            fontWeight: 400,
            color: "var(--color-text)",
            letterSpacing: "-0.02em",
            marginBottom: 14,
          }}
        >
          What you can expect
        </h2>

        <p style={{
          fontSize: 16,
          color: "var(--color-text-secondary)",
          maxWidth: 520,
          margin: "0 auto 48px",
          lineHeight: 1.7,
          fontFamily: "var(--font-body)",
        }}>
          We don't offer legal advice and we're not your lawyer. Here's what we
          do provide.
        </p>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 24,
          textAlign: "left",
        }}>
          {TRUST_POINTS.map((point) => (
            <div
              key={point.title}
              style={{
                padding: "28px 24px",
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
  );
}
