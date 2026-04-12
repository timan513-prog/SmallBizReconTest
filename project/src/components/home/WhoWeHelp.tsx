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
    <section
      aria-labelledby="who-we-help-heading"
      style={{
        padding: "clamp(60px, 8vw, 100px) 24px",
        background: "var(--color-bg-warm)",
      }}
    >
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <h2
            id="who-we-help-heading"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
              fontWeight: 400,
              color: "var(--color-text)",
              letterSpacing: "-0.02em",
              marginBottom: 14,
            }}
          >
            Who we help
          </h2>
          <p style={{
            fontSize: 16,
            color: "var(--color-text-secondary)",
            maxWidth: 520,
            margin: "0 auto",
            lineHeight: 1.7,
            fontFamily: "var(--font-body)",
          }}>
            Small business owners dealing with SBA COVID EIDL servicing issues
            they weren't prepared for.
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 24,
        }}>
          {CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <article
                key={card.title}
                style={{
                  padding: "32px 28px",
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
                  marginBottom: 20,
                }}>
                  <Icon size={22} style={{ color: "var(--color-brand-green)" }} aria-hidden="true" />
                </div>
                <h3 style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 17,
                  fontWeight: 600,
                  color: "var(--color-text)",
                  marginBottom: 10,
                }}>
                  {card.title}
                </h3>
                <p style={{
                  fontSize: 15,
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
  );
}
