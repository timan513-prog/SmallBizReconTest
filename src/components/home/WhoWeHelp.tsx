import { AlertTriangle, Scale, HelpCircle } from "lucide-react";

const CARDS = [
  {
    icon: AlertTriangle,
    title: "Your loan went to Treasury",
    description:
      "You got a letter saying your EIDL was referred to the Treasury Offset Program — or a collection agency called. You're wondering if you can stop it, reverse it, or negotiate.",
  },
  {
    icon: Scale,
    title: "Something's wrong on your credit",
    description:
      "Your credit report shows a derogatory mark from the SBA you weren't expecting. Or you've been told to \"dispute it\" but don't know how or with whom.",
  },
  {
    icon: HelpCircle,
    title: "You don't know what's happening",
    description:
      "You got a confusing notice, missed a payment you didn't know about, or simply can't get a straight answer from the SBA. You just want someone to explain it clearly.",
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
          <div style={{ textAlign: "center", marginBottom: "clamp(36px, 5vw, 52px)" }}>
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
              Does this sound like you?
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
              Hundreds of small business owners have come to us with these
              exact situations. You're not alone — and you have options.
            </p>
          </div>

          <div className="sbr-help-grid">
            {CARDS.map((card) => {
              const Icon = card.icon;
              return (
                <article
                  key={card.title}
                  className="sbr-card"
                  style={{
                    padding: "clamp(28px, 4vw, 36px) clamp(24px, 3vw, 32px)",
                  }}
                >
                  <Icon
                    size={20}
                    style={{
                      color: "var(--color-brand-green)",
                      marginBottom: 18,
                      display: "block",
                    }}
                    aria-hidden="true"
                  />
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
