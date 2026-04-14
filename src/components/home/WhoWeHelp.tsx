import { AlertTriangle, Scale, HelpCircle } from "lucide-react";

const CARDS = [
  {
    icon: AlertTriangle,
    title: "Sent to Treasury or Collections",
    description:
      "Your EIDL was referred to the Treasury Offset Program or a private collection agency — and you need to understand your options.",
    accent: "var(--color-gold)",
  },
  {
    icon: Scale,
    title: "Disputes, Recalls & Credit Issues",
    description:
      "You're dealing with a credit bureau report, a recall situation, or need to dispute an action taken against your loan.",
    accent: "var(--color-brand-green)",
  },
  {
    icon: HelpCircle,
    title: "Confused About Next Steps",
    description:
      "You received a notice, missed a payment, or aren't sure what's happening with your EIDL — and no one is giving you clear answers.",
    accent: "var(--color-brand-green-light)",
  },
];

export default function WhoWeHelp() {
  return (
    <>
      <style>{`
        .sbr-help-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        @media (max-width: 900px) {
          .sbr-help-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 600px) {
          .sbr-help-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
        }
      `}</style>

      <section
        aria-labelledby="who-we-help-heading"
        style={{
          padding: "clamp(64px, 8vw, 100px) 20px",
          background: "var(--color-bg-warm)",
        }}
      >
        <div style={{ maxWidth: 1040, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "clamp(40px, 6vw, 60px)" }}>
            <p style={{
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--color-text-muted)",
              marginBottom: 12,
              fontFamily: "var(--font-body)",
            }}>
              Who this is for
            </p>
            <h2
              id="who-we-help-heading"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
                fontWeight: 400,
                color: "var(--color-text)",
                letterSpacing: "-0.02em",
                marginBottom: 14,
              }}
            >
              We help small business owners like you
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
              Dealing with SBA COVID EIDL servicing issues you weren't prepared for?
              You're not alone — and you have options.
            </p>
          </div>

          <div className="sbr-help-grid">
            {CARDS.map((card, i) => {
              const Icon = card.icon;
              return (
                <article
                  key={card.title}
                  className={`sbr-card sbr-stagger-${i + 1}`}
                  style={{
                    padding: "clamp(28px, 4vw, 36px) clamp(24px, 3vw, 32px)",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Top accent line */}
                  <div
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 3,
                      background: card.accent,
                      borderRadius: "12px 12px 0 0",
                    }}
                  />
                  <div style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: "rgba(59, 74, 44, 0.05)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 20,
                  }}>
                    <Icon size={22} style={{ color: "var(--color-brand-green)" }} aria-hidden="true" />
                  </div>
                  <h3 style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "clamp(1rem, 1.5vw, 1.1rem)",
                    fontWeight: 600,
                    color: "var(--color-text)",
                    marginBottom: 10,
                    lineHeight: 1.3,
                  }}>
                    {card.title}
                  </h3>
                  <p style={{
                    fontSize: "clamp(0.875rem, 1.4vw, 0.938rem)",
                    color: "var(--color-text-secondary)",
                    lineHeight: 1.7,
                    fontFamily: "var(--font-body)",
                    margin: 0,
                  }}>
                    {card.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
