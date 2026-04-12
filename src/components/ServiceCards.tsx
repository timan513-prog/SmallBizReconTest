import React, { useRef, useEffect, useState, useCallback } from "react";
import {
  BookOpen,
  Wrench,
  Scale,
  Star,
  ArrowRight,
  Lock,
  Zap,
  Shield,
  FileCheck,
  Sparkles,
  Check,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../i18n/LanguageContext";

/* ═══════════════════════════════════════════════════════════
   ServiceCards — 2026 Army-Editorial Edition
   Olive-drab base · Warm amber accents · Instrument Serif
   Glass cards · Scroll reveals · Distinct from TrustPaths
   ═══════════════════════════════════════════════════════════ */

/* ── Types ── */
interface CardData {
  icon: React.ReactNode;
  accent: string;        // primary card accent
  accentDim: string;     // dimmed version for backgrounds
  title: string;
  titleAccent?: string;  // italic colored portion
  subtitle: string;
  highlights: string[];
  stat: { value: string; label: string };
  buttonText: string;
  route: string;
  isComingSoon?: boolean;
  badge?: string;
}

/* ── Card Data (built from translations) ── */
function buildCards(t: (k: string) => string): CardData[] {
  return [
    {
      icon: <BookOpen size={26} strokeWidth={1.5} />,
      accent: "#7ea85e",
      accentDim: "rgba(126,168,94,",
      title: t("card1_title"),
      titleAccent: t("card1_title_italic"),
      subtitle: t("card1_subtitle"),
      highlights: [t("card1_bullet1"), t("card1_bullet2"), t("card1_bullet3")],
      stat: { value: t("card1_stat").split(" ")[0], label: t("card1_stat").split(" ").slice(1).join(" ") || "" },
      buttonText: t("card1_cta"),
      route: "/toolkits/sba-101-quick-guide",
      badge: t("card1_badge"),
    },
    {
      icon: <Wrench size={26} strokeWidth={1.5} />,
      accent: "#d4a24c",
      accentDim: "rgba(212,162,76,",
      title: t("card2_title"),
      titleAccent: t("card2_title_italic"),
      subtitle: t("card2_subtitle"),
      highlights: [t("card2_bullet1"), t("card2_bullet2"), t("card2_bullet3"), t("card2_bullet4")],
      stat: { value: t("card2_stat").split(" ")[0], label: t("card2_stat").split(" ").slice(1).join(" ") || "" },
      buttonText: t("card2_cta"),
      route: "/covid-eidl-toolkits",
      badge: t("card2_badge"),
    },
    {
      icon: <Scale size={26} strokeWidth={1.5} />,
      accent: "#5d9ecf",
      accentDim: "rgba(93,158,207,",
      title: t("card3_title"),
      titleAccent: t("card3_title_italic"),
      subtitle: t("card3_subtitle"),
      highlights: [t("card3_bullet1"), t("card3_bullet2"), t("card3_bullet3"), t("card3_bullet4")],
      stat: { value: t("card3_stat").split(" ")[0], label: t("card3_stat").split(" ").slice(1).join(" ") || "" },
      buttonText: t("card3_cta"),
      route: "/dispute-recall-service",
      badge: t("card3_badge"),
    },
    {
      icon: <Star size={26} strokeWidth={1.5} />,
      accent: "#9e7ec8",
      accentDim: "rgba(158,126,200,",
      title: t("card4_title"),
      titleAccent: t("card4_title_italic"),
      subtitle: t("card4_subtitle"),
      highlights: [t("card4_bullet1"), t("card4_bullet2"), t("card4_bullet3")],
      stat: { value: t("card4_stat").split(" ")[0], label: t("card4_stat").split(" ").slice(1).join(" ") || "" },
      buttonText: t("card4_cta"),
      route: "/coming-soon",
      isComingSoon: true,
    },
  ];
}

/* ── Intersection Observer hook ── */
function useInView(threshold = 0.12) {
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

/* ── Olive/amber floating particles ── */
function OliveParticles() {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {Array.from({ length: 18 }).map((_, i) => {
        const isAmber = i % 4 === 0;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              width: `${1 + Math.random() * 2.2}px`,
              height: `${1 + Math.random() * 2.2}px`,
              borderRadius: "50%",
              background: isAmber
                ? "rgba(212, 162, 76, 0.22)"
                : "rgba(75, 83, 32, 0.18)",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `scFloat ${10 + Math.random() * 14}s ease-in-out infinite`,
              animationDelay: `${Math.random() * -12}s`,
              boxShadow: isAmber ? "0 0 6px rgba(212,162,76,0.15)" : "none",
            }}
          />
        );
      })}
    </div>
  );
}

/* ── Premium Service Card ── */
const ServiceCard: React.FC<{ card: CardData; index: number; inView: boolean; t: (k: string) => string }> = ({ card, index, inView, t }) => {
  const [hovered, setHovered] = useState(false);
  const { accent, accentDim, isComingSoon } = card;

  const cardContent = (
    <div
      onMouseEnter={() => !isComingSoon && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        overflow: "hidden",
        background: "rgba(26, 30, 20, 0.65)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: `1px solid ${hovered ? `${accentDim}0.22)` : "rgba(75,83,32,0.08)"}`,
        borderRadius: 24,
        padding: 0,
        height: "100%",
        display: "flex",
        flexDirection: "column" as const,
        boxShadow: hovered
          ? `0 32px 72px -16px ${accentDim}0.12), 0 0 0 1px ${accentDim}0.06)`
          : "0 6px 32px rgba(0,0,0,0.2)",
        transform: hovered ? "translateY(-10px) scale(1.01)" : "translateY(0) scale(1)",
        transition: "all 0.7s cubic-bezier(0.23,1,0.32,1)",
        opacity: isComingSoon ? 0.5 : (inView ? 1 : 0),
        animation: inView ? `scFadeIn 0.7s cubic-bezier(0.23,1,0.32,1) ${0.1 + index * 0.1}s both` : "none",
        filter: isComingSoon ? "saturate(0.4)" : "none",
      }}
    >
      {/* Top accent line */}
      <div style={{
        height: 2,
        borderRadius: "24px 24px 0 0",
        background: `linear-gradient(90deg, transparent, ${accent}${hovered ? "77" : "33"}, transparent)`,
        transition: "all 0.5s ease",
      }} />

      {/* Hover glow */}
      <div style={{
        position: "absolute",
        top: -100,
        right: -100,
        width: 240,
        height: 240,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${accentDim}${hovered ? "0.1" : "0.03"}), transparent 60%)`,
        transition: "all 0.6s ease",
        pointerEvents: "none",
      }} />

      <div style={{
        position: "relative",
        zIndex: 1,
        padding: "36px 36px 32px",
        flex: 1,
        display: "flex",
        flexDirection: "column",
      }}>
        {/* Header: icon + badge + stat */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 28 }}>
          {/* Icon */}
          <div style={{
            width: 56,
            height: 56,
            borderRadius: 18,
            background: `${accentDim}0.08)`,
            border: `1px solid ${accentDim}0.18)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: isComingSoon ? "#4a5a3e" : accent,
            transition: "all 0.3s ease",
            ...(hovered ? { background: `${accentDim}0.15)`, borderColor: `${accentDim}0.3)` } : {}),
          }}>
            {card.icon}
          </div>

          {/* Badge + Stat */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
            {card.badge && (
              <span style={{
                fontSize: 10,
                fontWeight: 700,
                padding: "4px 12px",
                borderRadius: 100,
                background: `${accentDim}0.08)`,
                border: `1px solid ${accentDim}0.18)`,
                color: isComingSoon ? "#4a5a3e" : accent,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                fontFamily: "var(--font-body)",
              }}>
                {card.badge}
              </span>
            )}
            <div style={{ textAlign: "right" }}>
              <span style={{
                display: "block",
                fontFamily: "var(--font-display)",
                fontSize: 28,
                fontWeight: 400,
                color: isComingSoon ? "#3a4a2e" : accent,
                lineHeight: 1,
              }}>
                {card.stat.value}
              </span>
              <span style={{
                display: "block",
                fontSize: 10,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "#4a5a3e",
                fontFamily: "var(--font-body)",
                marginTop: 3,
              }}>
                {card.stat.label}
              </span>
            </div>
          </div>
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily: "var(--font-display)",
          fontSize: 26,
          fontWeight: 400,
          color: isComingSoon ? "#4a5a3e" : "#e8ede2",
          lineHeight: 1.2,
          marginBottom: 6,
        }}>
          {card.title}{" "}
          {card.titleAccent && (
            <span style={{ fontStyle: "italic", color: isComingSoon ? "#3a4a2e" : accent }}>
              {card.titleAccent}
            </span>
          )}
        </h3>

        {/* Accent divider */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "18px 0 16px" }}>
          <div style={{
            height: 2,
            width: 40,
            borderRadius: 2,
            background: isComingSoon ? "rgba(75,83,32,0.1)" : `linear-gradient(90deg, ${accent}, transparent)`,
          }} />
          <div style={{ height: 1, flex: 1, background: "rgba(75,83,32,0.08)" }} />
        </div>

        {/* Subtitle */}
        <p style={{
          fontSize: 14,
          color: isComingSoon ? "#3a4a2e" : "#7a8a6e",
          lineHeight: 1.7,
          fontFamily: "var(--font-body)",
          marginBottom: 24,
        }}>
          {card.subtitle}
        </p>

        {/* Highlights */}
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 14 }}>
          {card.highlights.map((text, i) => (
            <li key={i} style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 12,
              fontSize: 13,
              color: isComingSoon ? "#3a4a2e" : "#a8b89c",
              fontFamily: "var(--font-body)",
              lineHeight: 1.55,
            }}>
              <span style={{
                width: 20,
                height: 20,
                borderRadius: "50%",
                background: `${accentDim}${isComingSoon ? "0.04" : "0.1"})`,
                border: `1px solid ${accentDim}${isComingSoon ? "0.06" : "0.2"})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                marginTop: 2,
              }}>
                <Check size={11} style={{ color: isComingSoon ? "#3a4a2e" : accent }} strokeWidth={2.5} />
              </span>
              <span>{text}</span>
            </li>
          ))}
        </ul>

        {/* Spacer */}
        <div style={{ flex: 1, minHeight: 32 }} />

        {/* CTA */}
        <div style={{ marginTop: "auto" }}>
          {isComingSoon ? (
            <div style={{ textAlign: "center" }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                padding: "14px 24px",
                borderRadius: 14,
                background: "rgba(75,83,32,0.06)",
                border: "1px solid rgba(75,83,32,0.1)",
                color: "#3a4a2e",
                fontSize: 13,
                fontWeight: 600,
                fontFamily: "var(--font-body)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}>
                <Lock size={15} />
                {card.buttonText}
              </div>
              <p style={{
                fontSize: 11,
                color: "#3a4a2e",
                fontFamily: "var(--font-body)",
                marginTop: 10,
              }}>
                {t("card4_stat")}
              </p>
            </div>
          ) : (
            <>
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                padding: "15px 24px",
                borderRadius: 14,
                background: `linear-gradient(135deg, ${accentDim}0.28), ${accentDim}0.1))`,
                border: `1px solid ${accentDim}0.38)`,
                color: "#e8ede2",
                fontSize: 13,
                fontWeight: 600,
                fontFamily: "var(--font-body)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                transition: "all 0.3s ease",
                boxShadow: `0 0 20px ${accentDim}0.06)`,
                cursor: "pointer",
              }}>
                <span>{card.buttonText}</span>
                <ArrowRight size={15} style={{ transition: "transform 0.3s ease" }} />
              </div>
              <p style={{
                marginTop: 12,
                textAlign: "center",
                fontSize: 11,
                color: "#3e4a34",
                fontFamily: "var(--font-body)",
                lineHeight: 1.5,
              }}>
                DIY guides, checklists, and packet-ready structure.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );

  if (isComingSoon) return <div style={{ height: "100%" }}>{cardContent}</div>;
  return <Link to={card.route} style={{ display: "block", height: "100%", textDecoration: "none", color: "inherit" }}>{cardContent}</Link>;
};

/* ═══════════════════════════════════════════
   Main Section
   ═══════════════════════════════════════════ */
const ServiceCards: React.FC = () => {
  const headerObs = useInView(0.2);
  const gridObs = useInView(0.08);
  const { t } = useLanguage();
  const cards = buildCards(t);

  return (
    <>
      <style>{`
        :root {
          --font-display: 'Instrument Serif', Georgia, serif;
          --font-body: 'DM Sans', sans-serif;
        }

        @keyframes scFloat {
          0%, 100% { transform: translate(0,0) scale(1); opacity:0.25; }
          25% { transform: translate(10px,-16px) scale(1.12); opacity:0.5; }
          50% { transform: translate(-6px,-26px) scale(0.88); opacity:0.15; }
          75% { transform: translate(12px,-10px) scale(1.06); opacity:0.4; }
        }
        @keyframes scFadeIn {
          from { opacity:0; transform:translateY(36px) scale(0.98); }
          to { opacity:1; transform:translateY(0) scale(1); }
        }
        @keyframes scHeaderIn {
          from { opacity:0; transform:translateY(28px); }
          to { opacity:1; transform:translateY(0); }
        }
        @keyframes amberPulse {
          0%, 100% { opacity: 0.35; }
          50% { opacity: 0.7; }
        }

        @media (max-width: 768px) {
          .sc-grid { grid-template-columns: 1fr !important; }
          .sc-section-title { font-size: 32px !important; }
        }
      `}</style>

      <section style={{
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(175deg, #141810 0%, #0e110a 40%, #12150e 100%)",
        padding: "120px 0 100px",
        isolation: "isolate",
      }}>
        {/* ── Ambient layers ── */}
        <div style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 70% 50% at 15% 5%, rgba(75,83,32,0.06) 0%, transparent 55%), " +
            "radial-gradient(ellipse 55% 50% at 85% 95%, rgba(212,162,76,0.04) 0%, transparent 50%)",
        }} />

        {/* Olive grid overlay */}
        <div style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          opacity: 0.018,
        }}>
          <svg width="100%" height="100%">
            <defs>
              <pattern id="scGrid" width="56" height="56" patternUnits="userSpaceOnUse">
                <path d="M 56 0 L 0 0 0 56" fill="none" stroke="#4B5320" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#scGrid)" />
          </svg>
        </div>

        {/* Grain */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            opacity: 0.02,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />

        <OliveParticles />

        <div style={{ position: "relative", zIndex: 10, maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          {/* ── Section Header ── */}
          <div
            ref={headerObs.ref}
            style={{
              marginBottom: 72,
              textAlign: "center",
              opacity: headerObs.inView ? 1 : 0,
              animation: headerObs.inView ? "scHeaderIn 0.8s cubic-bezier(0.23,1,0.32,1) both" : "none",
            }}
          >
            {/* Eyebrow */}
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "6px 18px",
              borderRadius: 100,
              background: "rgba(75,83,32,0.08)",
              border: "1px solid rgba(75,83,32,0.15)",
              marginBottom: 28,
            }}>
              <span style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#d4a24c",
                boxShadow: "0 0 8px rgba(212,162,76,0.4)",
                animation: "amberPulse 3s ease-in-out infinite",
              }} />
              <span style={{
                fontSize: 11,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                color: "#6a7a5e",
                fontFamily: "var(--font-body)",
              }}>
                {t("cards_section_label")}
              </span>
            </div>

            {/* Title */}
            <h2
              className="sc-section-title"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 50,
                fontWeight: 400,
                color: "#e8ede2",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                marginBottom: 18,
              }}
            >
              {t("cards_section_title")}{" "}
              <span style={{ fontStyle: "italic", color: "#d4a24c" }}>{t("cards_section_title_italic")}</span>
            </h2>

            <p style={{
              maxWidth: 600,
              margin: "0 auto 28px",
              fontSize: 16,
              color: "#5e6e52",
              lineHeight: 1.75,
              fontFamily: "var(--font-body)",
            }}>
              {t("cards_section_subtitle")}
            </p>

            {/* Diamond divider */}
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              maxWidth: 140,
              margin: "0 auto",
            }}>
              <div style={{ height: 1, flex: 1, background: "linear-gradient(90deg, transparent, rgba(212,162,76,0.25))" }} />
              <div style={{
                width: 7,
                height: 7,
                transform: "rotate(45deg)",
                border: "1px solid rgba(212,162,76,0.3)",
                background: "rgba(212,162,76,0.08)",
              }} />
              <div style={{ height: 1, flex: 1, background: "linear-gradient(90deg, rgba(212,162,76,0.25), transparent)" }} />
            </div>
          </div>

          {/* ── Card Grid ── */}
          <div
            ref={gridObs.ref}
            className="sc-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 24,
              maxWidth: 1100,
              margin: "0 auto",
            }}
          >
            {cards.map((card, i) => (
              <ServiceCard key={i} card={card} index={i} inView={gridObs.inView} t={t} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ServiceCards;