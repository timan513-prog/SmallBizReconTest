import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FolderCheck,
  FileText,
  Check,
  ArrowRight,
} from "lucide-react";

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function PathCard({
  icon,
  badge,
  title,
  titleAccent,
  description,
  features,
  ctaText,
  ctaTo,
  ctaVariant,
  tag,
  delay,
  inView,
}: {
  icon: React.ReactNode;
  badge: string;
  title: string;
  titleAccent: string;
  description: string;
  features: string[];
  ctaText: string;
  ctaTo: string;
  ctaVariant: "gold" | "outline";
  tag?: string;
  delay: number;
  inView: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const isGold = ctaVariant === "gold";

  return (
    <Link
      to={ctaTo}
      style={{ display: "block", height: "100%", textDecoration: "none", color: "inherit" }}
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: "relative",
          overflow: "hidden",
          height: "100%",
          background: "rgba(22,26,18,0.6)",
          backdropFilter: "blur(28px)",
          WebkitBackdropFilter: "blur(28px)",
          border: `1px solid ${hovered ? "rgba(200,168,78,0.25)" : "rgba(200,168,78,0.06)"}`,
          borderRadius: 28,
          padding: 0,
          boxShadow: hovered
            ? "0 32px 80px -16px rgba(200,168,78,0.12), 0 0 0 1px rgba(200,168,78,0.08)"
            : "0 8px 40px rgba(0,0,0,0.2)",
          transform: hovered ? "translateY(-10px)" : "translateY(0)",
          transition: "all 0.7s cubic-bezier(0.23,1,0.32,1)",
          display: "flex",
          flexDirection: "column" as const,
          opacity: inView ? 1 : 0,
          animation: inView
            ? `tpFadeIn 0.8s cubic-bezier(0.23,1,0.32,1) ${delay}s both`
            : "none",
        }}
      >
        <div
          style={{
            height: 2,
            borderRadius: "28px 28px 0 0",
            background: `linear-gradient(90deg, transparent, rgba(200,168,78,${hovered ? "0.5" : "0.2"}), transparent)`,
            transition: "all 0.5s ease",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: -120,
            right: -120,
            width: 280,
            height: 280,
            borderRadius: "50%",
            background: `radial-gradient(circle, rgba(200,168,78,${hovered ? "0.08" : "0.03"}), transparent 60%)`,
            transition: "all 0.6s ease",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 1,
            padding: "40px 40px 36px",
            flex: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              marginBottom: 32,
            }}
          >
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: 20,
                background: "rgba(200,168,78,0.08)",
                border: "1px solid rgba(200,168,78,0.18)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.3s ease",
                ...(hovered
                  ? {
                      background: "rgba(200,168,78,0.15)",
                      borderColor: "rgba(200,168,78,0.3)",
                    }
                  : {}),
              }}
            >
              {icon}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {tag && (
                <span
                  style={{
                    fontSize: 9,
                    fontWeight: 700,
                    padding: "3px 10px",
                    borderRadius: 100,
                    background: "rgba(200,168,78,0.12)",
                    border: "1px solid rgba(200,168,78,0.25)",
                    color: "#c8a84e",
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {tag}
                </span>
              )}
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  padding: "5px 14px",
                  borderRadius: 100,
                  background: "rgba(200,168,78,0.08)",
                  border: "1px solid rgba(200,168,78,0.18)",
                  color: "#c8a84e",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  fontFamily: "var(--font-body)",
                }}
              >
                {badge}
              </span>
            </div>
          </div>

          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 28,
              fontWeight: 400,
              color: "#eaf0e4",
              lineHeight: 1.2,
              marginBottom: 14,
            }}
          >
            {title}{" "}
            <span style={{ fontStyle: "italic", color: "#c8a84e" }}>
              {titleAccent}
            </span>
          </h3>

          <p
            style={{
              fontSize: 15,
              color: "#8a9878",
              lineHeight: 1.7,
              fontFamily: "var(--font-body)",
              marginBottom: 32,
            }}
          >
            {description}
          </p>

          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            {features.map((text, i) => (
              <li
                key={i}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 14,
                  fontSize: 14,
                  color: "#b5c4a8",
                  fontFamily: "var(--font-body)",
                  lineHeight: 1.55,
                }}
              >
                <span
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    background: "rgba(200,168,78,0.1)",
                    border: "1px solid rgba(200,168,78,0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    marginTop: 1,
                  }}
                >
                  <Check
                    size={12}
                    style={{ color: "#c8a84e" }}
                    strokeWidth={2.5}
                  />
                </span>
                <span>{text}</span>
              </li>
            ))}
          </ul>

          <div style={{ flex: 1, minHeight: 40 }} />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              padding: "16px 28px",
              borderRadius: 16,
              fontSize: 14,
              fontWeight: 600,
              fontFamily: "var(--font-body)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              transition: "all 0.3s ease",
              ...(isGold
                ? {
                    background:
                      "linear-gradient(135deg, rgba(200,168,78,0.3), rgba(200,168,78,0.1))",
                    border: "1px solid rgba(200,168,78,0.4)",
                    color: "#eaf0e4",
                    boxShadow: "0 0 24px rgba(200,168,78,0.06)",
                  }
                : {
                    background: "transparent",
                    border: "1px solid rgba(200,168,78,0.35)",
                    color: "#c8a84e",
                  }),
            }}
          >
            <span>{ctaText}</span>
            <ArrowRight
              size={16}
              style={{ transition: "transform 0.3s ease" }}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function TwoPathsSection() {
  const headerObs = useInView(0.2);
  const cardsObs = useInView(0.1);

  return (
    <>
      <style>{`
        @keyframes tpFadeIn {
          from { opacity:0; transform:translateY(40px); }
          to { opacity:1; transform:translateY(0); }
        }
        @media (max-width: 1024px) {
          .tp-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .tp-section-title { font-size: 34px !important; }
        }
      `}</style>

      <section
        style={{
          position: "relative",
          overflow: "hidden",
          background: "#0e100c",
          padding: "120px 0 100px",
          isolation: "isolate",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "radial-gradient(ellipse 65% 50% at 20% 0%, rgba(200,168,78,0.04) 0%, transparent 60%), radial-gradient(ellipse 50% 55% at 85% 100%, rgba(126,168,94,0.04) 0%, transparent 55%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            opacity: 0.02,
          }}
        >
          <svg width="100%" height="100%">
            <defs>
              <pattern
                id="tpGrid"
                width="52"
                height="52"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 52 0 L 0 0 0 52"
                  fill="none"
                  stroke="#cda349"
                  strokeWidth="0.4"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#tpGrid)" />
          </svg>
        </div>

        <div
          style={{
            position: "relative",
            zIndex: 10,
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 24px",
          }}
        >
          <div
            ref={headerObs.ref}
            style={{
              marginBottom: 72,
              textAlign: "center",
              opacity: headerObs.inView ? 1 : 0,
              animation: headerObs.inView
                ? "tpFadeIn 0.8s cubic-bezier(0.23,1,0.32,1) both"
                : "none",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "6px 18px",
                borderRadius: 100,
                background: "rgba(200,168,78,0.06)",
                border: "1px solid rgba(200,168,78,0.12)",
                marginBottom: 28,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#cda349",
                  boxShadow: "0 0 8px rgba(200,168,78,0.5)",
                }}
              />
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.18em",
                  color: "#8a9878",
                  fontFamily: "var(--font-body)",
                }}
              >
                Core Resources
              </span>
            </div>

            <h2
              className="tp-section-title"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 52,
                fontWeight: 400,
                color: "#eaf0e4",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                marginBottom: 18,
              }}
            >
              Two paths.{" "}
              <span style={{ fontStyle: "italic", color: "#cda349" }}>
                One mission.
              </span>
            </h2>

            <p
              style={{
                maxWidth: 580,
                margin: "0 auto",
                fontSize: 16,
                color: "#6a7a5e",
                lineHeight: 1.75,
                fontFamily: "var(--font-body)",
              }}
            >
              Everything a borrower needs — self-serve toolkits built from real
              servicing experience, plus professional dispute and recall
              services.
            </p>
          </div>

          <div
            ref={cardsObs.ref}
            className="tp-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 28,
            }}
          >
            <PathCard
              icon={
                <FolderCheck
                  size={26}
                  style={{ color: "#c8a84e" }}
                  strokeWidth={1.5}
                />
              }
              badge="SELF-SERVE"
              title="DIY"
              titleAccent="Toolkits"
              description="Step-by-step guides, SBA forms, checklists, and educational resources — everything you need to navigate servicing actions on your own."
              features={[
                "COVID EIDL toolkit collection",
                "SBA Forms Library with direct links",
                "Plain-language servicing guides",
                "No login required",
              ]}
              ctaText="Explore Toolkits"
              ctaTo="/toolkits/sba-toolkits"
              ctaVariant="outline"
              delay={0.1}
              inView={cardsObs.inView}
            />

            <PathCard
              icon={
                <FileText
                  size={26}
                  style={{ color: "#c8a84e" }}
                  strokeWidth={1.5}
                />
              }
              badge="PROFESSIONAL SERVICE"
              tag="HUMAN-REVIEWED"
              title="Treasury Recall &"
              titleAccent="Dispute Letter"
              description="Professional dispute and recall letter service — human-reviewed, SBA-formatted, submission-ready packages built from direct servicing experience."
              features={[
                "Treasury offset dispute",
                "Credit bureau recall",
                "Detailed case review",
                "SBA-formatted documents",
              ]}
              ctaText="Learn More"
              ctaTo="/dispute-recall-service"
              ctaVariant="gold"
              delay={0.2}
              inView={cardsObs.inView}
            />
          </div>
        </div>
      </section>
    </>
  );
}
