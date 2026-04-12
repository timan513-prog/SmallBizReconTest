import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Check,
  ShieldCheck,
  FileStack,
  ArrowRight,
  Crosshair,
  Calendar,
} from "lucide-react";

/* ───────────────────────────────────────────
   PrimaryTrustPaths — 2026 Premium Editorial
   w/ Calendly Free Consultation Integration
   ─────────────────────────────────────────── */

/* ── Intersection Observer hook for scroll reveals ── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ── Floating particles (gold + green mix) ── */
function SectionParticles() {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {Array.from({ length: 16 }).map((_, i) => {
        const isGold = i % 3 === 0;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              width: `${1 + Math.random() * 2.5}px`,
              height: `${1 + Math.random() * 2.5}px`,
              borderRadius: "50%",
              background: isGold
                ? "rgba(200, 168, 78, 0.25)"
                : "rgba(126, 168, 94, 0.15)",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `ptFloat ${9 + Math.random() * 14}s ease-in-out infinite`,
              animationDelay: `${Math.random() * -12}s`,
              boxShadow: isGold ? "0 0 8px rgba(200,168,78,0.2)" : "none",
            }}
          />
        );
      })}
    </div>
  );
}

/* ── Premium card component ── */
const TrustCard: React.FC<{
  icon: React.ReactNode;
  badge: string;
  badgeVariant: "gold" | "silver";
  title: React.ReactNode;
  description: string;
  features: string[];
  ctaText: string;
  ctaTo: string;
  ctaVariant: "gold" | "glass";
  disclaimer: string;
  delay: number;
  inView: boolean;
}> = ({ icon, badge, badgeVariant, title, description, features, ctaText, ctaTo, ctaVariant, disclaimer, delay, inView }) => {
  const [hovered, setHovered] = useState(false);

  const isGold = badgeVariant === "gold";
  const accentColor = isGold ? "#cda349" : "#8a9878";
  const checkColor = isGold ? "#cda349" : "#8a9878";

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        overflow: "hidden",
        background: "rgba(22, 26, 18, 0.6)",
        backdropFilter: "blur(28px)",
        WebkitBackdropFilter: "blur(28px)",
        border: `1px solid ${hovered
          ? (isGold ? "rgba(200,168,78,0.25)" : "rgba(138,152,120,0.2)")
          : "rgba(200,168,78,0.06)"}`,
        borderRadius: 28,
        padding: 0,
        boxShadow: hovered
          ? (isGold
            ? "0 32px 80px -16px rgba(200,168,78,0.12), 0 0 0 1px rgba(200,168,78,0.08)"
            : "0 32px 80px -16px rgba(0,0,0,0.3)")
          : "0 8px 40px rgba(0,0,0,0.2)",
        transform: hovered ? "translateY(-10px)" : "translateY(0)",
        transition: "all 0.7s cubic-bezier(0.23,1,0.32,1)",
        display: "flex",
        flexDirection: "column",
        opacity: inView ? 1 : 0,
        animation: inView ? `fadeSlideUp 0.8s cubic-bezier(0.23,1,0.32,1) ${delay}s both` : "none",
      }}
    >
      {/* Top accent line */}
      <div style={{
        height: 2,
        borderRadius: "28px 28px 0 0",
        background: `linear-gradient(90deg, transparent, ${accentColor}${hovered ? "88" : "33"}, transparent)`,
        transition: "all 0.5s ease",
      }} />

      {/* Hover glow orb */}
      <div style={{
        position: "absolute",
        top: -120,
        right: -120,
        width: 280,
        height: 280,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${accentColor}${hovered ? "14" : "06"}, transparent 60%)`,
        transition: "all 0.6s ease",
        pointerEvents: "none",
      }} />

      <div style={{ position: "relative", zIndex: 1, padding: "40px 40px 36px", flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Icon + Badge row */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 32 }}>
          <div style={{
            width: 60,
            height: 60,
            borderRadius: 20,
            background: `${accentColor}12`,
            border: `1px solid ${accentColor}25`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.3s ease",
            ...(hovered ? { background: `${accentColor}20`, borderColor: `${accentColor}40` } : {}),
          }}>
            {icon}
          </div>

          <span style={{
            fontSize: 10,
            fontWeight: 700,
            padding: "5px 14px",
            borderRadius: 100,
            background: `${accentColor}12`,
            border: `1px solid ${accentColor}25`,
            color: accentColor,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            fontFamily: "var(--font-body)",
          }}>
            {badge}
          </span>
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily: "var(--font-display)",
          fontSize: 28,
          fontWeight: 400,
          color: "#eaf0e4",
          lineHeight: 1.2,
          marginBottom: 14,
        }}>
          {title}
        </h3>

        {/* Description */}
        <p style={{
          fontSize: 15,
          color: "#8a9878",
          lineHeight: 1.7,
          fontFamily: "var(--font-body)",
          marginBottom: 32,
        }}>
          {description}
        </p>

        {/* Features */}
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 16 }}>
          {features.map((text, i) => (
            <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 14, fontSize: 14, color: "#b5c4a8", fontFamily: "var(--font-body)", lineHeight: 1.55 }}>
              <span style={{
                width: 22,
                height: 22,
                borderRadius: "50%",
                background: `${checkColor}15`,
                border: `1px solid ${checkColor}30`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                marginTop: 1,
              }}>
                <Check size={12} style={{ color: checkColor }} strokeWidth={2.5} />
              </span>
              <span>{text}</span>
            </li>
          ))}
        </ul>

        {/* Spacer */}
        <div style={{ flex: 1, minHeight: 40 }} />

        {/* CTA */}
        <Link
          to={ctaTo}
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
            textDecoration: "none",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            transition: "all 0.3s ease",
            ...(ctaVariant === "gold"
              ? {
                  background: "linear-gradient(135deg, rgba(200,168,78,0.3), rgba(200,168,78,0.1))",
                  border: "1px solid rgba(200,168,78,0.4)",
                  color: "#eaf0e4",
                  boxShadow: "0 0 24px rgba(200,168,78,0.06)",
                }
              : {
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#b5c4a8",
                }),
          }}
        >
          <span>{ctaText}</span>
          <ArrowRight size={16} style={{ transition: "transform 0.3s ease" }} />
        </Link>

        {/* Disclaimer */}
        <p style={{
          marginTop: 16,
          textAlign: "center",
          fontSize: 11,
          color: "#4a5a3e",
          lineHeight: 1.5,
          fontFamily: "var(--font-body)",
        }}>
          {disclaimer}
        </p>
      </div>
    </div>
  );
};

/* ── Main Section ── */
const PrimaryTrustPaths: React.FC = () => {
  const headerObs = useInView(0.2);
  const cardsObs = useInView(0.1);
  const missionObs = useInView(0.15);
  const [missionHovered, setMissionHovered] = useState(false);

  return (
    <>
      <style>{`
        :root {
          --font-display: 'Instrument Serif', Georgia, serif;
          --font-body: 'DM Sans', sans-serif;
        }

        @keyframes ptFloat {
          0%, 100% { transform: translate(0,0) scale(1); opacity:0.3; }
          25% { transform: translate(12px,-18px) scale(1.15); opacity:0.6; }
          50% { transform: translate(-8px,-28px) scale(0.85); opacity:0.18; }
          75% { transform: translate(14px,-10px) scale(1.08); opacity:0.45; }
        }
        @keyframes fadeSlideUp {
          from { opacity:0; transform:translateY(40px); }
          to { opacity:1; transform:translateY(0); }
        }
        @keyframes goldPulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.7; }
        }
        @keyframes shimmerSlide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes calPulse {
          0%, 100% { box-shadow: 0 0 20px rgba(200,168,78,0.08), 0 0 0 0 rgba(200,168,78,0.15); }
          50% { box-shadow: 0 0 30px rgba(200,168,78,0.15), 0 0 0 6px rgba(200,168,78,0.04); }
        }

        @media (max-width: 1024px) {
          .trust-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .trust-section-title { font-size: 34px !important; }
          .trust-mission-title { font-size: 28px !important; }
          .trust-mission-ctas { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <section style={{
        position: "relative",
        overflow: "hidden",
        background: "#0e100c",
        padding: "120px 0 100px",
        isolation: "isolate",
      }}>
        {/* ── Ambient layers ── */}
        <div style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: "radial-gradient(ellipse 65% 50% at 20% 0%, rgba(200,168,78,0.04) 0%, transparent 60%), radial-gradient(ellipse 50% 55% at 85% 100%, rgba(126,168,94,0.04) 0%, transparent 55%)",
        }} />

        {/* Grid overlay */}
        <div style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          opacity: 0.02,
        }}>
          <svg width="100%" height="100%">
            <defs>
              <pattern id="trustGrid" width="52" height="52" patternUnits="userSpaceOnUse">
                <path d="M 52 0 L 0 0 0 52" fill="none" stroke="#cda349" strokeWidth="0.4" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#trustGrid)" />
          </svg>
        </div>

        {/* Grain */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            opacity: 0.025,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />

        <SectionParticles />

        <div style={{ position: "relative", zIndex: 10, maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          {/* ── Section Header ── */}
          <div
            ref={headerObs.ref}
            style={{
              marginBottom: 72,
              textAlign: "center",
              opacity: headerObs.inView ? 1 : 0,
              animation: headerObs.inView ? "fadeSlideUp 0.8s cubic-bezier(0.23,1,0.32,1) both" : "none",
            }}
          >
            {/* Eyebrow */}
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "6px 18px",
              borderRadius: 100,
              background: "rgba(200,168,78,0.06)",
              border: "1px solid rgba(200,168,78,0.12)",
              marginBottom: 28,
            }}>
              <span style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#cda349",
                boxShadow: "0 0 8px rgba(200,168,78,0.5)",
              }} />
              <span style={{
                fontSize: 11,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.18em",
                color: "#8a9878",
                fontFamily: "var(--font-body)",
              }}>
                Core Resources
              </span>
            </div>

            {/* Title */}
            <h2
              className="trust-section-title"
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
              <span style={{ fontStyle: "italic", color: "#cda349" }}>One mission.</span>
            </h2>

            <p style={{
              maxWidth: 580,
              margin: "0 auto",
              fontSize: 16,
              color: "#6a7a5e",
              lineHeight: 1.75,
              fontFamily: "var(--font-body)",
            }}>
              Everything a borrower needs — toolkits built from real servicing
              experience, plus every official SBA form in one organized library.
            </p>
          </div>

          {/* ── Card Grid ── */}
          <div
            ref={cardsObs.ref}
            className="trust-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 28,
            }}
          >
            <TrustCard
              icon={<ShieldCheck size={26} style={{ color: "#cda349" }} strokeWidth={1.5} />}
              badge="Most Popular"
              badgeVariant="gold"
              title={<>SBA-Compliant Servicing <span style={{ fontStyle: "italic", color: "#cda349" }}>Toolkits</span></>}
              description="Informational resources aligned with public SBA guidance — helping you understand and prepare servicing requests the right way the first time."
              features={[
                "15,000+ SBA cases reviewed for practical insight",
                "Created by professionals with direct SBA servicing experience",
                "Designed to help you avoid common submission mistakes",
              ]}
              ctaText="Explore Toolkits"
              ctaTo="/toolkits/sba-toolkits"
              ctaVariant="gold"
              disclaimer="For informational purposes only. Not legal, financial, or SBA advice. Policies can change without notice."
              delay={0.1}
              inView={cardsObs.inView}
            />

            <TrustCard
              icon={<FileStack size={26} style={{ color: "#8a9878" }} strokeWidth={1.5} />}
              badge="Official Sources"
              badgeVariant="silver"
              title={<>SBA Forms <span style={{ fontStyle: "italic", color: "#8a9878" }}>Library</span></>}
              description="Curated SBA forms sourced directly from official SBA publications — organized in one place so you never have to hunt for the right document."
              features={[
                "Up-to-date forms sourced from official SBA publications",
                "Direct links to required borrower & servicing documents",
                "No login required — no confusion, no friction",
              ]}
              ctaText="View SBA Forms"
              ctaTo="/sba-forms"
              ctaVariant="glass"
              disclaimer="Forms provided via public SBA sources. SmallBiz Recon™ is not affiliated with or endorsed by the SBA."
              delay={0.2}
              inView={cardsObs.inView}
            />
          </div>

          {/* ── Mission CTA ── */}
          <div
            ref={missionObs.ref}
            style={{ marginTop: 80 }}
          >
            <div
              onMouseEnter={() => setMissionHovered(true)}
              onMouseLeave={() => setMissionHovered(false)}
              style={{
                position: "relative",
                overflow: "hidden",
                maxWidth: 1000,
                margin: "0 auto",
                background: "rgba(22, 26, 18, 0.6)",
                backdropFilter: "blur(28px)",
                WebkitBackdropFilter: "blur(28px)",
                borderRadius: 28,
                border: `1px solid ${missionHovered ? "rgba(200,168,78,0.2)" : "rgba(200,168,78,0.06)"}`,
                boxShadow: missionHovered
                  ? "0 36px 90px -20px rgba(200,168,78,0.1)"
                  : "0 8px 40px rgba(0,0,0,0.15)",
                transform: missionHovered ? "translateY(-6px)" : "translateY(0)",
                transition: "all 0.7s cubic-bezier(0.23,1,0.32,1)",
                opacity: missionObs.inView ? 1 : 0,
                animation: missionObs.inView ? "fadeSlideUp 0.8s cubic-bezier(0.23,1,0.32,1) 0.3s both" : "none",
              }}
            >
              {/* Shimmer line */}
              <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 1,
                overflow: "hidden",
              }}>
                <div style={{
                  width: "50%",
                  height: "100%",
                  background: "linear-gradient(90deg, transparent, rgba(200,168,78,0.35), transparent)",
                  animation: "shimmerSlide 5s ease-in-out infinite",
                }} />
              </div>

              {/* Corner glows */}
              <div style={{
                position: "absolute",
                top: -60,
                left: -60,
                width: 160,
                height: 160,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(200,168,78,0.06), transparent 60%)",
                pointerEvents: "none",
              }} />
              <div style={{
                position: "absolute",
                bottom: -60,
                right: -60,
                width: 160,
                height: 160,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(126,168,94,0.05), transparent 60%)",
                pointerEvents: "none",
              }} />

              <div style={{ position: "relative", padding: "56px 48px", textAlign: "center" }}>
                {/* Pill */}
                <div style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "6px 18px",
                  borderRadius: 100,
                  background: "rgba(200,168,78,0.06)",
                  border: "1px solid rgba(200,168,78,0.12)",
                  marginBottom: 28,
                }}>
                  <Crosshair size={12} style={{ color: "#cda349" }} strokeWidth={2} />
                  <span style={{
                    fontSize: 11,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.18em",
                    color: "#8a9878",
                    fontFamily: "var(--font-body)",
                  }}>
                    Mission Note
                  </span>
                </div>

                {/* Title */}
                <h3
                  className="trust-mission-title"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 40,
                    fontWeight: 400,
                    color: "#eaf0e4",
                    lineHeight: 1.15,
                    letterSpacing: "-0.015em",
                    maxWidth: 700,
                    margin: "0 auto 18px",
                  }}
                >
                  Built from{" "}
                  <span style={{ fontStyle: "italic", color: "#cda349" }}>real SBA servicing experience</span>
                  , not scraped summaries.
                </h3>

                <p style={{
                  maxWidth: 560,
                  margin: "0 auto 20px",
                  fontSize: 15,
                  color: "#6a7a5e",
                  lineHeight: 1.75,
                  fontFamily: "var(--font-body)",
                }}>
                  Educational resources designed to help you submit complete
                  packets and avoid avoidable delays.
                </p>

                {/* Free consultation value prop pill */}
                <div style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "8px 20px",
                  borderRadius: 100,
                  background: "rgba(200,168,78,0.08)",
                  border: "1px solid rgba(200,168,78,0.15)",
                  marginBottom: 16,
                }}>
                  <Calendar size={13} style={{ color: "#cda349" }} strokeWidth={2} />
                  <span style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#cda349",
                    fontFamily: "var(--font-body)",
                    letterSpacing: "0.02em",
                  }}>
                    Book a free consultation — includes a free paid guide
                  </span>
                </div>

                {/* Two-tier consultation options */}
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 14,
                  maxWidth: 640,
                  margin: "0 auto 24px",
                }}
                  className="trust-mission-ctas"
                >
                  {/* Free tier */}
                  <Link
                    to="/contact"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 6,
                      padding: "20px 20px 18px",
                      borderRadius: 18,
                      background: "linear-gradient(135deg, rgba(200,168,78,0.2), rgba(200,168,78,0.06))",
                      border: "1px solid rgba(200,168,78,0.3)",
                      textDecoration: "none",
                      transition: "all 0.3s ease",
                      animation: "calPulse 3s ease-in-out infinite",
                    }}
                  >
                    <span style={{
                      fontSize: 10,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.14em",
                      color: "#8a9878",
                      fontFamily: "var(--font-body)",
                    }}>
                      Free
                    </span>
                    <span style={{
                      fontSize: 15,
                      fontWeight: 600,
                      color: "#eaf0e4",
                      fontFamily: "var(--font-body)",
                    }}>
                      30-Min Consultation
                    </span>
                    <span style={{
                      fontSize: 11,
                      color: "#6a7a5e",
                      fontFamily: "var(--font-body)",
                    }}>
                      + free access to one paid guide
                    </span>
                  </Link>

                  {/* Paid tier */}
                  <Link
                    to="/consultation"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 6,
                      padding: "20px 20px 18px",
                      borderRadius: 18,
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      textDecoration: "none",
                      transition: "all 0.3s ease",
                      position: "relative",
                    }}
                  >
                    <span style={{
                      fontSize: 10,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.14em",
                      color: "#cda349",
                      fontFamily: "var(--font-body)",
                    }}>
                      $167
                    </span>
                    <span style={{
                      fontSize: 15,
                      fontWeight: 600,
                      color: "#b5c4a8",
                      fontFamily: "var(--font-body)",
                    }}>
                      60-Min Advanced
                    </span>
                    <span style={{
                      fontSize: 11,
                      color: "#6a7a5e",
                      fontFamily: "var(--font-body)",
                    }}>
                      deep-dive + $167 service credit
                    </span>
                  </Link>
                </div>

                {/* Disclaimer */}
                <p style={{
                  marginTop: 20,
                  fontSize: 11,
                  color: "#3e4a34",
                  fontFamily: "var(--font-body)",
                  lineHeight: 1.5,
                }}>
                  For informational purposes only. SmallBiz Recon™ is not affiliated with the SBA.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PrimaryTrustPaths;