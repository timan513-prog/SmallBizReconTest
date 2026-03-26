import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Download,
  Shield,
  FileCheck,
  BookOpen,
  TrendingUp,
  Zap,
} from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

/* ═══════════════════════════════════════════════════════════
   Hero — 2026 Cinematic Editorial
   Mobile-centered · WCAG AA compliant
   ═══════════════════════════════════════════════════════════ */

const STAT_KEYS = [
  { value: "25", suffix: "+", labelKey: "hero_stat_years" },
  { value: "5,000", suffix: "+", labelKey: "hero_stat_cases" },
  { value: "8", suffix: "", labelKey: "hero_stat_toolkits" },
  { value: "100", suffix: "%", labelKey: "hero_stat_independent" },
  { value: "50", suffix: "+", labelKey: "hero_stat_forms" },
  { value: "24", suffix: "/7", labelKey: "hero_stat_access" },
];

const FEATURE_KEYS = [
  { icon: FileCheck, titleKey: "hero_feature_toolkits", descKey: "hero_feature_toolkits_desc", accent: "#7ea85e" },
  { icon: BookOpen, titleKey: "hero_feature_guides", descKey: "hero_feature_guides_desc", accent: "#cda349" },
  { icon: Shield, titleKey: "hero_feature_experience", descKey: "hero_feature_experience_desc", accent: "#5d9ecf" },
  { icon: TrendingUp, titleKey: "hero_feature_updated", descKey: "hero_feature_updated_desc", accent: "#d4a24c" },
  { icon: Zap, titleKey: "hero_feature_nologin", descKey: "hero_feature_nologin_desc", accent: "#7ea85e" },
];



/* ── Topographic map texture ── */
function TopoTexture() {
  return (
    <div aria-hidden="true" style={{
      position: "absolute",
      inset: 0,
      pointerEvents: "none",
      opacity: 0.025,
      overflow: "hidden",
    }}>
      <svg width="100%" height="100%" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
        <defs>
          <filter id="topoBlur"><feGaussianBlur stdDeviation="0.5" /></filter>
        </defs>
        <g filter="url(#topoBlur)" fill="none" stroke="#cda349" strokeWidth="0.6">
          {Array.from({ length: 20 }).map((_, i) => {
            const cx = 400 + Math.sin(i * 0.8) * 180;
            const cy = 300 + Math.cos(i * 0.6) * 120;
            const r = 40 + i * 22;
            return <ellipse key={i} cx={cx} cy={cy} rx={r} ry={r * 0.65} opacity={0.3 + (i % 3) * 0.15} />;
          })}
        </g>
      </svg>
    </div>
  );
}

/* ── Animated number counter (ADA: shows final value in aria-label) ── */
function AnimatedStat({ value, suffix, label, delay }: { value: string; suffix: string; label: string; delay: number }) {
  const [display, setDisplay] = useState("0");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      obs.disconnect();
      const target = parseInt(value.replace(/,/g, ""));
      const duration = 1800;
      const start = performance.now();
      const animate = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(target * eased);
        setDisplay(current.toLocaleString());
        if (progress < 1) requestAnimationFrame(animate);
      };
      setTimeout(() => requestAnimationFrame(animate), delay);
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [value, delay]);

  return (
    <span ref={ref} aria-label={`${value}${suffix} ${label}`}>
      <span aria-hidden="true">{display}{suffix}</span>
    </span>
  );
}

/* ── Feature card (ADA: keyboard focusable, proper roles) ── */
const FeatureCard: React.FC<{
  feature: typeof FEATURE_KEYS[0];
  index: number;
  t: (k: string) => string;
}> = ({ feature, index, t }) => {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const active = hovered || focused;
  const Icon = feature.icon;
  const title = t(feature.titleKey);
  const desc = t(feature.descKey);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      tabIndex={0}
      role="listitem"
      aria-label={`${title}: ${desc}`}
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "18px 20px",
        borderRadius: 16,
        background: active ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.015)",
        border: `1px solid ${active ? `${feature.accent}25` : "rgba(255,255,255,0.04)"}`,
        transition: "all 0.5s cubic-bezier(0.23,1,0.32,1)",
        transform: active ? "translateX(-6px)" : "translateX(0)",
        animation: `heroCardIn 0.6s cubic-bezier(0.23,1,0.32,1) ${0.5 + index * 0.1}s both`,
        outline: focused ? `2px solid ${feature.accent}` : "none",
        outlineOffset: 2,
      }}
    >
      {/* Accent line left */}
      <div aria-hidden="true" style={{
        position: "absolute",
        top: "20%",
        left: 0,
        width: 3,
        height: "60%",
        borderRadius: 2,
        background: feature.accent,
        opacity: active ? 0.8 : 0,
        transition: "opacity 0.4s ease",
      }} />

      <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
        <div aria-hidden="true" style={{
          width: 38,
          height: 38,
          borderRadius: 11,
          background: `${feature.accent}10`,
          border: `1px solid ${feature.accent}20`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          transition: "all 0.3s ease",
          ...(active ? { background: `${feature.accent}18`, borderColor: `${feature.accent}35` } : {}),
        }}>
          <Icon size={18} style={{ color: feature.accent }} />
        </div>
        <div>
          <h3 style={{
            fontSize: 14,
            fontWeight: 600,
            color: "#e8ede2",
            fontFamily: "var(--font-body)",
            marginBottom: 4,
          }}>
            {title}
          </h3>
          <p style={{
            fontSize: 13,
            color: "#a3b098",
            lineHeight: 1.55,
            fontFamily: "var(--font-body)",
          }}>
            {desc}
          </p>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════
   Main Hero
   ═══════════════════════════════════════════ */
const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    el.classList.add("hero-2026-visible");
  }, []);

  return (
    <>
      <style>{`
        :root {
          --font-display: 'Instrument Serif', Georgia, serif;
          --font-body: 'DM Sans', sans-serif;
        }
        @keyframes heroContentIn {
          from { opacity:0; transform:translateY(30px); }
          to { opacity:1; transform:translateY(0); }
        }
        @keyframes heroCardIn {
          from { opacity:0; transform:translateX(30px); }
          to { opacity:1; transform:translateX(0); }
        }
        @keyframes heroStatsIn {
          from { opacity:0; transform:translateY(20px); }
          to { opacity:1; transform:translateY(0); }
        }
        @keyframes heroRuleExpand {
          from { width: 0%; opacity: 0; }
          to { width: 100%; opacity: 1; }
        }
        @keyframes heroBadgeFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        @keyframes heroGlowPulse {
          0%, 100% { opacity: 0.03; }
          50% { opacity: 0.06; }
        }
        /* Gold shimmer sweep */
        @keyframes heroShimmerSweep {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }

        .hero-shimmer-text {
          background: linear-gradient(
            90deg,
            #cda349 0%,
            #cda349 30%,
            #e8d5a0 44%,
            #fffbe6 50%,
            #e8d5a0 56%,
            #cda349 70%,
            #cda349 100%
          );
          background-size: 200% 100%;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: heroShimmerSweep 5s ease-in-out 2s infinite;
        }

        .hero-2026-content { opacity:0; }
        .hero-2026-features { opacity:0; }
        .hero-2026-stats { opacity:0; }
        .hero-2026-visible .hero-2026-content {
          animation: heroContentIn 0.8s cubic-bezier(0.23,1,0.32,1) 0.1s both;
        }
        .hero-2026-visible .hero-2026-features {
          animation: heroContentIn 0.8s cubic-bezier(0.23,1,0.32,1) 0.35s both;
        }
        .hero-2026-visible .hero-2026-stats {
          animation: heroStatsIn 0.7s cubic-bezier(0.23,1,0.32,1) 0.7s both;
        }
        .hero-2026-rule {
          animation: heroRuleExpand 1.2s cubic-bezier(0.23,1,0.32,1) 0.9s both;
        }
        /* CTA hover & focus states */
        .hero-cta-primary:hover,
        .hero-cta-primary:focus-visible {
          background: linear-gradient(135deg, rgba(200,168,78,0.55), rgba(200,168,78,0.28)) !important;
          transform: translateY(-2px);
          box-shadow: 0 0 36px rgba(200,168,78,0.18), 0 8px 24px rgba(0,0,0,0.4) !important;
        }
        .hero-cta-primary:focus-visible {
          outline: 2px solid #cda349;
          outline-offset: 3px;
        }
        .hero-cta-secondary:hover,
        .hero-cta-secondary:focus-visible {
          background: rgba(255,255,255,0.06) !important;
          border-color: rgba(255,255,255,0.15) !important;
          color: rgba(232,237,226,0.85) !important;
        }
        .hero-cta-secondary:focus-visible {
          outline: 2px solid #7ea85e;
          outline-offset: 3px;
        }

        /* ══ TABLET: single column, left-aligned ══ */
        @media (max-width: 1024px) {
          .hero-2026-grid { grid-template-columns: 1fr !important; }
          .hero-2026-title { font-size: 42px !important; }
          .hero-2026-subtitle-line { font-size: 38px !important; }
          .hero-2026-features {
            border-left: none !important;
            padding-left: 0 !important;
          }
        }

        /* ══ MOBILE: centered everything ══ */
        @media (max-width: 640px) {
          .hero-2026-content {
            text-align: center !important;
            align-items: center !important;
            display: flex !important;
            flex-direction: column !important;
          }
          .hero-2026-title { font-size: 32px !important; }
          .hero-2026-subtitle-line { font-size: 28px !important; }

          /* Badges */
          .hero-badges-row {
            justify-content: center !important;
          }

          /* Headline */
          .hero-2026-content h1 {
            text-align: center !important;
          }

          /* Gold rule */
          .hero-rule-wrap {
            margin-left: auto !important;
            margin-right: auto !important;
            max-width: 280px !important;
          }

          /* Subtitle paragraph */
          .hero-subtitle-text {
            text-align: center !important;
            margin-left: auto !important;
            margin-right: auto !important;
          }

          /* CTAs */
          .hero-cta-row {
            flex-direction: column !important;
            align-items: center !important;
            width: 100% !important;
          }
          .hero-cta-row > a {
            width: 280px !important;
            justify-content: center !important;
          }

          /* Stats */
          .hero-2026-stat-value { font-size: 36px !important; }
          .hero-2026-stats {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            gap: 28px 16px !important;
            text-align: center !important;
          }
          .hero-stat-item { text-align: center !important; width: 100% !important; }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-2026-content, .hero-2026-features, .hero-2026-stats { opacity:1; animation:none !important; }
          .hero-2026-rule { animation:none !important; width:100%; opacity:1; }
          .hero-shimmer-text { animation:none !important; -webkit-text-fill-color: #cda349; }
        }
      `}</style>

      <section
        ref={sectionRef}
        aria-label="SmallBiz Recon™ hero — SBA servicing toolkits and resources"
        style={{
          position: "relative",
          background: "#060608",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          paddingTop: 72,
          paddingBottom: 48,
        }}
      >
        {/* ── Decorative ambient layers (all aria-hidden) ── */}
        <TopoTexture />

        <div aria-hidden="true" style={{
          position: "absolute",
          top: "15%",
          left: "-8%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(200,168,78,0.04) 0%, transparent 55%)",
          animation: "heroGlowPulse 8s ease-in-out infinite",
          pointerEvents: "none",
        }} />
        <div aria-hidden="true" style={{
          position: "absolute",
          bottom: "10%",
          right: "-5%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(75,83,32,0.03) 0%, transparent 55%)",
          animation: "heroGlowPulse 10s ease-in-out infinite 2s",
          pointerEvents: "none",
        }} />

        {/* Warm radial glow behind left headline */}
        <div aria-hidden="true" style={{
          position: "absolute",
          top: "20%",
          left: "5%",
          width: 600,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(200,168,78,0.035) 0%, rgba(126,168,94,0.015) 40%, transparent 70%)",
          pointerEvents: "none",
          filter: "blur(40px)",
        }} />

        {/* Vertical accent line */}
        <div aria-hidden="true" style={{
          position: "absolute",
          top: 0,
          left: "8%",
          width: 1,
          height: "100%",
          background: "linear-gradient(180deg, transparent 0%, rgba(200,168,78,0.06) 30%, rgba(200,168,78,0.06) 70%, transparent 100%)",
          pointerEvents: "none",
        }} />

        <div style={{ position: "relative", zIndex: 10, maxWidth: 1240, margin: "0 auto", padding: "0 28px", width: "100%" }}>
          {/* ── Main grid ── */}
          <div
            className="hero-2026-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1.15fr 0.85fr",
              gap: 48,
              alignItems: "center",
            }}
          >
            {/* ══ LEFT COLUMN ══ */}
            <div className="hero-2026-content">
              {/* Eyebrow badges */}
              <div className="hero-badges-row" style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 20 }}>
                <div role="status" style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "6px 16px",
                  borderRadius: 100,
                  background: "rgba(200,168,78,0.06)",
                  border: "1px solid rgba(200,168,78,0.12)",
                  animation: "heroBadgeFloat 5s ease-in-out infinite",
                }}>
                  <span aria-hidden="true" style={{
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
                    letterSpacing: "0.15em",
                    color: "#a3ad98",
                    fontFamily: "var(--font-body)",
                  }}>
                    {t("hero_badge_platform")}
                  </span>
                </div>
                <div style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "6px 14px",
                  borderRadius: 100,
                  background: "rgba(126,168,94,0.06)",
                  border: "1px solid rgba(126,168,94,0.12)",
                  animation: "heroBadgeFloat 6s ease-in-out infinite 1s",
                }}>
                  <Zap size={11} aria-hidden="true" style={{ color: "#7ea85e" }} />
                  <span style={{
                    fontSize: 11,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    color: "#a3b098", /* Bumped for WCAG AA — 4.6:1 on #060608 */
                    fontFamily: "var(--font-body)",
                  }}>
                    Updated {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </span>
                </div>
              </div>

              {/* ── Headline ── */}
              <h1 style={{ margin: 0, lineHeight: 1 }}>
                <span
                  className="hero-2026-title"
                  style={{
                    display: "block",
                    fontFamily: "var(--font-body)",
                    fontSize: 56,
                    fontWeight: 700,
                    color: "#eaf0e4",
                    letterSpacing: "-0.03em",
                    lineHeight: 1.05,
                  }}
                >
                  {t("hero_headline_1")}
                </span>
                <span
                  className="hero-2026-subtitle-line hero-shimmer-text"
                  aria-label={t("hero_headline_2")}
                  style={{
                    display: "inline-block",
                    fontFamily: "var(--font-display)",
                    fontSize: 52,
                    fontWeight: 400,
                    fontStyle: "italic",
                    letterSpacing: "-0.01em",
                    lineHeight: 1.15,
                    marginTop: 4,
                  }}
                >
                  {t("hero_headline_2")}
                </span>
              </h1>

              {/* ── Gold rule ── */}
              <div className="hero-rule-wrap" aria-hidden="true" style={{ margin: "20px 0 16px", maxWidth: 480 }}>
                <div
                  className="hero-2026-rule"
                  style={{
                    height: 2,
                    background: "linear-gradient(90deg, #cda349, rgba(200,168,78,0.15), transparent)",
                    borderRadius: 2,
                  }}
                />
              </div>

              {/* ── Subtitle ── */}
              <p className="hero-subtitle-text" style={{
                fontSize: 17,
                color: "#a3b098", /* Bumped for WCAG AA — 4.6:1 on #060608 */
                lineHeight: 1.75,
                fontFamily: "var(--font-body)",
                maxWidth: 520,
                marginBottom: 20,
              }}>
                {t("hero_subtitle")}
              </p>

              {/* ── CTAs ── */}
              <nav className="hero-cta-row" aria-label="Primary actions" style={{ display: "flex", flexWrap: "wrap", gap: 14, marginBottom: 0 }}>
                <a
                  href="https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/public/SMALLBIZRECON-FREEPUBLIC/SmallBiz_Recon_SBA_101_Guide.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-cta-primary"
                  aria-label="Download Free Guide (opens PDF in new tab)"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "16px 32px",
                    borderRadius: 16,
                    background: "linear-gradient(135deg, rgba(200,168,78,0.45), rgba(200,168,78,0.2))",
                    border: "1px solid rgba(200,168,78,0.55)",
                    color: "#eaf0e4",
                    fontSize: 15,
                    fontWeight: 600,
                    fontFamily: "var(--font-body)",
                    textDecoration: "none",
                    transition: "all 0.35s cubic-bezier(0.23,1,0.32,1)",
                    boxShadow: "0 0 28px rgba(200,168,78,0.12), 0 4px 16px rgba(0,0,0,0.3)",
                  }}
                >
                  <Download size={16} aria-hidden="true" />
                  {t("hero_cta_primary")}
                </a>

                <Link
                  to="/sba-resources/help-packets"
                  className="hero-cta-secondary"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "16px 32px",
                    borderRadius: 16,
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "#a3b098",
                    fontSize: 15,
                    fontWeight: 600,
                    fontFamily: "var(--font-body)",
                    textDecoration: "none",
                    transition: "all 0.35s cubic-bezier(0.23,1,0.32,1)",
                  }}
                >
                  {t("hero_cta_secondary")}
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </nav>
            </div>

            {/* ══ RIGHT COLUMN — Feature cards ══ */}
            <div className="hero-2026-features" role="list" aria-label="Platform features" style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
              borderLeft: "1px solid rgba(200,168,78,0.08)",
              paddingLeft: 32,
            }}>
              {FEATURE_KEYS.map((feature, i) => (
                <FeatureCard key={i} feature={feature} index={i} t={t} />
              ))}
            </div>
          </div>

          {/* ── Stats row ── */}
          <div
            className="hero-2026-stats"
            role="list"
            aria-label="Platform statistics"
            style={{
              marginTop: 40,
              paddingTop: 32,
              borderTop: "1px solid rgba(200,168,78,0.08)",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              gap: 48,
            }}
          >
            {STAT_KEYS.map((stat, i) => {
              const label = t(stat.labelKey);
              return (
                <div key={i} className="hero-stat-item" role="listitem" style={{ textAlign: "center" }}>
                  <div
                    className="hero-2026-stat-value"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 44,
                      fontWeight: 400,
                      color: "#eaf0e4",
                      lineHeight: 1,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    <AnimatedStat value={stat.value} suffix={stat.suffix} label={label} delay={i * 200} />
                  </div>
                  <div style={{
                    fontSize: 12,
                    color: "#a3b098",
                    fontFamily: "var(--font-body)",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    marginTop: 6,
                  }}>
                    {label}
                  </div>
                </div>
              );
            })}

          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;