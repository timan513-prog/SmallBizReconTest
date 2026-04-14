import { BookOpen, FileCheck, Compass } from "lucide-react";

const TRUST_POINTS = [
  {
    icon: BookOpen,
    title: "Educational Guidance",
    description: "We explain SBA processes in plain language so you can make informed decisions about your loan.",
    num: "01",
  },
  {
    icon: FileCheck,
    title: "Structured Help",
    description: "We ensure the correct requests and documents are prepared and submitted on your behalf.",
    num: "02",
  },
  {
    icon: Compass,
    title: "Real Experience",
    description: "Our guidance comes from direct, hands-on experience with SBA EIDL servicing — not theory.",
    num: "03",
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
          <div style={{ textAlign: "center", marginBottom: "clamp(40px, 6vw, 56px)" }}>
            <p style={{
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--color-text-muted)",
              marginBottom: 12,
              fontFamily: "var(--font-body)",
            }}>
              Our approach
            </p>
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
              What you can expect from us
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
              We don't offer legal advice and we're not your lawyer. Here's what we
              do provide.
            </p>
          </div>

          <div className="sbr-trust-grid">
            {TRUST_POINTS.map((point) => {
              const Icon = point.icon;
              return (
                <div
                  key={point.title}
                  style={{
                    padding: "clamp(24px, 3vw, 32px) clamp(20px, 2.5vw, 28px)",
                    background: "var(--color-bg-warm)",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid var(--color-border-light)",
                    position: "relative",
                  }}
                >
                  {/* Number badge */}
                  <span style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: "var(--color-text-muted)",
                    letterSpacing: "0.05em",
                    fontFamily: "var(--font-body)",
                    marginBottom: 16,
                    display: "block",
                    opacity: 0.5,
                  }}>
                    {point.num}
                  </span>

                  <div style={{
                    width: 44,
                    height: 44,
                    borderRadius: 10,
                    background: "rgba(59, 74, 44, 0.06)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 18,
                  }}>
                    <Icon size={20} style={{ color: "var(--color-brand-green)" }} aria-hidden="true" />
                  </div>

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
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
