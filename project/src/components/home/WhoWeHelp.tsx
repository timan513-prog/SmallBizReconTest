import { AlertTriangle, Scale, HelpCircle } from "lucide-react";

const CARDS = [
  {
    icon: AlertTriangle,
    title: "Sent to Treasury or Collections",
    description:
      "Your EIDL was referred to the Treasury Offset Program or a private collection agency — and you need to understand your options.",
  },
  {
    icon: Scale,
    title: "Disputes, Recalls & Credit Issues",
    description:
      "You're dealing with a credit bureau report, a recall situation, or need to dispute an action taken against your loan.",
  },
  {
    icon: HelpCircle,
    title: "Confused About Next Steps",
    description:
      "You received a notice, missed a payment, or aren't sure what's happening with your EIDL — and no one is giving you clear answers.",
  },
];

export default function WhoWeHelp() {
  return (
    <>
      <style>{`
        .sbr-help-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
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
          padding: "clamp(56px, 8vw, 100px) 20px",
          background: "var(--color-bg-warm)",
        }}
      >
        <div style={{ maxWidth: 1040, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "clamp(36px, 5vw, 56px)" }}>
            <h2
              id="who-we-help-heading"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
                fontWeight: 400,
                color: "var(--color-text)",
                letterSpacing: "-0.02em",
                marginBottom: 12,
              }}
            >
              Who we help
            </h2>
            <p style={{
              fontSize: "clamp(0.9rem, 1.8vw, 1rem)",
              color: "var(--color-text-secondary)",
              maxWidth: 500,
              margin: "0 auto",
              lineHeight: 1.7,
              fontFamily: "var(--font-body)",
              padding: "0 8px",
            }}>
              Small business owners dealing with SBA COVID EIDL servicing issues
              they weren't prepared for.
            </p>
          </div>

          <div className="sbr-help-grid">
            {CARDS.map((card) => {
              const Icon = card.icon;
              return (
                <article
                  key={card.title}
                  style={{
                    padding: "clamp(24px, 4vw, 32px) clamp(20px, 3vw, 28px)",
                    background: "white",
                    border: "1px solid var(--color-border-light)",
                    borderRadius: 12,
                  }}
                >
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
                    <Icon size={22} style={{ color: "var(--color-brand-green)" }} aria-hidden="true" />
                  </div>
                  <h3 style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "clamp(1rem, 1.5vw, 1.06rem)",
                    fontWeight: 600,
                    color: "var(--color-text)",
                    marginBottom: 8,
                  }}>
                    {card.title}
                  </h3>
                  <p style={{
                    fontSize: "clamp(0.875rem, 1.4vw, 0.938rem)",
                    color: "var(--color-text-secondary)",
                    lineHeight: 1.65,
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
