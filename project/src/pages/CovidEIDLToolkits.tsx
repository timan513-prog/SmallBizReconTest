import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Package, Shield, Clock, Users, Key, CircleCheck as CheckCircle, Star, Zap, BookOpen, ChevronRight, Lock, Sparkles, Sun, Moon, Eye, FileText, Download, Bot, ExternalLink, Award, CircleAlert as AlertCircle } from "lucide-react";
import { validateAccessCode, getAccessRoute, TOOLKIT_TYPES } from "../utils/codeValidation";

/* ═══════════════════════════════════════════
   CONFIG — swap URLs & types for production
   ═══════════════════════════════════════════ */
const FALLBACK_ROUTE = "/covid-eidl-toolkits";

const ACTIVE_TOOLKITS = [
  {
    badge: "Popular",
    badgeVariant: "green",
    title: "COVID EIDL DIY Release of Collateral",
    subtitle: "Expert guidance for DIY collateral release — interactive walkthrough, PDF companion, tracking spreadsheet, sample letters & forms.",
    includes: ["PDF guide", "HTML steps", "Tracker sheet", "Sample forms", "Compliance checklist"],
    price: 59.99,
    toolkitType: TOOLKIT_TYPES.COLLATERAL_RELEASE,
    checkoutUrl: "https://buy.stripe.com/cNiaEZ0IcfAjaGxfbCefC00",
  },
  {
    badge: "Best Seller",
    badgeVariant: "red",
    title: "COVID EIDL DIY Subordination Toolkit",
    subtitle: "Complete guide for DIY loan subordination process — interactive walkthrough, PDF companion, tracking spreadsheet, sample letters & forms.",
    includes: ["HTML walkthrough", "PDF guide", "Tracker spreadsheet", "Sample letters", "Submission checklist"],
    price: 59.99,
    toolkitType: TOOLKIT_TYPES.SUBORDINATION,
    checkoutUrl: "https://buy.stripe.com/8x29AVcqU9bV3e53sUefC01",
  },
  {
   badge: "Best Value",
    badgeVariant: "blue",
    title: "COVID EIDL DIY Payment Assistance Toolkit",
    subtitle: "A complete guide for requesting payment assistance (formerly hardship accommodation) for your COVID EIDL.",
    includes: ["PDF guide", "Request templates", "Timeline tracker", "Required forms", "Compliance checklist"],
    price: 27,
    toolkitType: TOOLKIT_TYPES.PAYMENT_ASSISTANCE,
    checkoutUrl: "https://buy.stripe.com/00weVf4Ys73N7ul8NeefC02",
  },
  {
   badge: "New",
    badgeVariant: "gold",
    title: "COVID EIDL DIY Change in Ownership",
    subtitle: "Complete guide for navigating SBA approval when transferring ownership of your business with an outstanding COVID EIDL.",
    includes: ["PDF guide", "Request templates", "Compliance checklist", "Required forms", "Submission tracker"],
    price: 59.99,
    toolkitType: TOOLKIT_TYPES.CHANGE_IN_OWNERSHIP,
    checkoutUrl: "https://buy.stripe.com/aFa7sN3Uo1Jt8ypgfGefC04",
  },
  {
    badge: "New",
    badgeVariant: "gold",
    title: "COVID EIDL DIY Assumption Toolkit",
    subtitle: "Step-by-step guidance for assuming an existing COVID EIDL — request package, SBA requirements, sample letters & approval checklist.",
    includes: ["PDF guide", "Request templates", "Sample letters", "Required forms", "Submission checklist"],
    price: 59.99,
    toolkitType: TOOLKIT_TYPES.ASSUMPTION,
    checkoutUrl: "https://buy.stripe.com/dRm4gB9eI4VF9Ct4wYefC05",
  },
  {
    badge: "New",
    badgeVariant: "teal",
    title: "COVID EIDL DIY Relocation Toolkit",
    subtitle: "Moving your business or collateral location under a COVID EIDL may require SBA review. Our guide walks you through every step of the approval process.",
    includes: ["PDF guide", "Printable reference", "Tracking spreadsheet", "Sample letters", "Submission checklist"],
    price: 39.99,
    toolkitType: TOOLKIT_TYPES.RELOCATION,
    checkoutUrl: "https://buy.stripe.com/28EdRb4Ysewf15X8NeefC03",
 },
];

const COMING_SOON_TOOLKITS = [
  { title: "Release of Guarantor", subtitle: "Guidance for obtaining a release of personal guarantee." },
  { title: "Substitution of Collateral", subtitle: "Guidance for substituting collateral for your EIDL loan." },
];

/* ═══════════════════════════════════════════
   THEME SYSTEM (CSS variables driven)
   ═══════════════════════════════════════════ */
const THEMES = {
  dark: {
    "--bg-primary": "#181c14",
    "--bg-secondary": "rgba(30, 34, 26, 0.6)",
    "--bg-tertiary": "rgba(38, 44, 32, 0.5)",
    "--bg-card": "rgba(30, 34, 26, 0.6)",
    "--bg-card-hover": "rgba(36, 42, 30, 0.7)",
    "--bg-hero": "linear-gradient(180deg, rgba(50,62,38,0.7) 0%, rgba(24,28,20,0.98) 100%)",
    "--bg-hero-solid": "#232a1c",
    "--border-primary": "rgba(154, 184, 122, 0.1)",
    "--border-hover": "rgba(154, 184, 122, 0.25)",
    "--border-gold": "rgba(200, 168, 78, 0.2)",
    "--text-primary": "#e8ede2",
    "--text-secondary": "#8a9480",
    "--text-muted": "#5a6450",
    "--accent-green": "#9ab87a",
    "--accent-green-bright": "#c8e0b4",
    "--accent-green-deep": "#4A7836",
    "--accent-gold": "#c8a84e",
    "--accent-gold-dim": "rgba(200,168,78,0.6)",
    "--accent-blue": "#7a9ccc",
    "--glass-blur": "blur(24px)",
    "--shadow-card": "0 4px 32px rgba(0,0,0,0.2)",
    "--shadow-card-hover": "0 24px 64px rgba(0,0,0,0.35)",
    "--grid-opacity": "0.03",
    "--particle-opacity": "0.15",
    "--overlay-green": "rgba(74,120,54,0.08)",
    "--overlay-gold": "rgba(200,168,78,0.04)",
    "--badge-bg": "rgba(154,184,122,0.1)",
    "--badge-border": "rgba(154,184,122,0.2)",
    "--badge-text": "#9ab87a",
    "--disabled-bg": "rgba(60,60,60,0.3)",
    "--disabled-border": "rgba(100,100,100,0.15)",
    "--disabled-text": "#555",
    "--cta-bg": "linear-gradient(135deg, rgba(200,168,78,0.35), rgba(200,168,78,0.15))",
    "--cta-border": "rgba(200,168,78,0.4)",
    "--cta-text": "#f5e9c4",
    "--toggle-bg": "rgba(154,184,122,0.1)",
    "--info-bg": "rgba(100,140,200,0.08)",
    "--info-border": "rgba(100,140,200,0.15)",
    "--info-text": "#7a9ccc",
  },
  light: {
    "--bg-primary": "#f5f3ee",
    "--bg-secondary": "rgba(255, 255, 255, 0.7)",
    "--bg-tertiary": "rgba(245, 243, 238, 0.8)",
    "--bg-card": "rgba(255, 255, 255, 0.75)",
    "--bg-card-hover": "rgba(255, 255, 255, 0.9)",
    "--bg-hero": "linear-gradient(180deg, #3d5a2a 0%, #2a3d1e 100%)",
    "--bg-hero-solid": "#3d5a2a",
    "--border-primary": "rgba(74, 120, 54, 0.12)",
    "--border-hover": "rgba(74, 120, 54, 0.25)",
    "--border-gold": "rgba(180, 140, 40, 0.2)",
    "--text-primary": "#1a2e12",
    "--text-secondary": "#5a6b52",
    "--text-muted": "#8a9680",
    "--accent-green": "#4A7836",
    "--accent-green-bright": "#3d6a2b",
    "--accent-green-deep": "#2d5420",
    "--accent-gold": "#9a7a28",
    "--accent-gold-dim": "rgba(154,122,40,0.6)",
    "--accent-blue": "#4678AA",
    "--glass-blur": "blur(20px)",
    "--shadow-card": "0 4px 24px rgba(0,0,0,0.06)",
    "--shadow-card-hover": "0 20px 48px rgba(0,0,0,0.1)",
    "--grid-opacity": "0.04",
    "--particle-opacity": "0.1",
    "--overlay-green": "rgba(74,120,54,0.04)",
    "--overlay-gold": "rgba(180,140,40,0.03)",
    "--badge-bg": "rgba(74,120,54,0.08)",
    "--badge-border": "rgba(74,120,54,0.18)",
    "--badge-text": "#4A7836",
    "--disabled-bg": "rgba(200,200,200,0.4)",
    "--disabled-border": "rgba(180,180,180,0.3)",
    "--disabled-text": "#999",
    "--cta-bg": "linear-gradient(135deg, #c8a032 0%, #cda349 40%, #d4b05a 100%)",
    "--cta-border": "rgba(200,168,78,0.4)",
    "--cta-text": "#1a1400",
    "--toggle-bg": "rgba(74,120,54,0.08)",
    "--info-bg": "rgba(70,120,170,0.06)",
    "--info-border": "rgba(70,120,170,0.15)",
    "--info-text": "#4678AA",
  },
};

/* ═══════════════════════════════════════════
   SUB-COMPONENTS
   ═══════════════════════════════════════════ */

function GridOverlay() {
  return (
    <div aria-hidden="true" style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0, opacity: "var(--grid-opacity)" }}>
      <svg width="100%" height="100%" role="presentation">
        <defs>
          <pattern id="bgGrid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="var(--accent-green)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#bgGrid)" />
      </svg>
    </div>
  );
}

function Particles() {
  return (
    <div aria-hidden="true" style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
      {Array.from({ length: 18 }).map((_, i) => (
        <div key={i} style={{
          position: "absolute",
          width: `${1.5 + Math.random() * 2.5}px`, height: `${1.5 + Math.random() * 2.5}px`,
          borderRadius: "50%",
          background: `rgba(154, 184, 122, var(--particle-opacity))`,
          left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
          animation: `pFloat ${9 + Math.random() * 14}s ease-in-out infinite`,
          animationDelay: `${Math.random() * -12}s`,
        }} />
      ))}
    </div>
  );
}

function SectionLabel({ icon, children }) {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 8,
      fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase",
      color: "var(--accent-green)", fontFamily: "var(--font-body)",
    }}>
      {icon}
      {children}
    </div>
  );
}

/* ── Badge ── */
function Badge({ children, variant = "green" }) {
  const variants = {
    green: { bg: "var(--badge-bg)", border: "var(--badge-border)", color: "var(--badge-text)" },
    red: { bg: "rgba(200,80,80,0.1)", border: "rgba(200,80,80,0.2)", color: "#cc6666" },
    blue: { bg: "rgba(80,140,220,0.1)", border: "rgba(80,140,220,0.2)", color: "#6a9cd8" },
    gold: { bg: "rgba(200,168,78,0.1)", border: "rgba(200,168,78,0.2)", color: "var(--accent-gold)" },
  };
  const v = variants[variant] || variants.green;
  return (
    <span style={{
      position: "absolute", top: 20, right: 20,
      fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
      padding: "5px 14px", borderRadius: 100,
      background: v.bg, border: `1px solid ${v.border}`, color: v.color,
      fontFamily: "var(--font-body)", zIndex: 2,
    }}>
      {children}
    </span>
  );
}

/* ── Active Toolkit Card ── */
function ActiveCard({ toolkit, index, onAccessCode }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative", overflow: "hidden",
        background: "var(--bg-card)",
        backdropFilter: "var(--glass-blur)", WebkitBackdropFilter: "var(--glass-blur)",
        border: `1px solid ${hovered ? "var(--border-hover)" : "var(--border-primary)"}`,
        borderRadius: 20, padding: "40px 32px 32px",
        display: "flex", flexDirection: "column", justifyContent: "space-between",
        minHeight: 480,
        boxShadow: hovered ? "var(--shadow-card-hover)" : "var(--shadow-card)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        transition: "all 0.5s cubic-bezier(0.23,1,0.32,1)",
        animation: `cardReveal 0.7s ease-out ${0.15 + index * 0.12}s both`,
      }}
    >
      {/* Corner glow */}
      <div style={{
        position: "absolute", top: -50, right: -50, width: 140, height: 140, borderRadius: "50%",
        background: "radial-gradient(circle, var(--overlay-green) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <Badge variant={toolkit.badgeVariant}>{toolkit.badge}</Badge>

      <div style={{ flexGrow: 1, position: "relative", zIndex: 1 }}>
        {/* Title */}
        <h3 style={{
          fontFamily: "var(--font-display)", fontSize: 21, fontWeight: 400,
          color: "var(--text-primary)", marginBottom: 12, lineHeight: 1.3,
          letterSpacing: "-0.01em", paddingRight: 80,
        }}>
          {toolkit.title}
        </h3>

        {/* Subtitle */}
        <p style={{
          fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7,
          marginBottom: 20, fontFamily: "var(--font-body)",
        }}>
          {toolkit.subtitle}
        </p>

        {/* Includes */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 0 }}>
          {toolkit.includes.map((item, i) => (
            <span key={i} style={{
              display: "inline-flex", alignItems: "center", gap: 5,
              fontSize: 11, fontWeight: 600, color: "var(--accent-green)",
              background: "var(--badge-bg)", border: `1px solid var(--badge-border)`,
              padding: "4px 10px", borderRadius: 8, fontFamily: "var(--font-body)",
            }}>
              <CheckCircle size={10} />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{
        marginTop: 24, paddingTop: 20,
        borderTop: "1px solid var(--border-primary)",
        position: "relative", zIndex: 1,
      }}>
        {/* Price */}
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <span style={{
            fontFamily: "var(--font-display)", fontSize: 36, color: "var(--text-primary)",
            letterSpacing: "-0.02em",
          }}>
            ${toolkit.price}
          </span>
        </div>

        {/* Purchase */}
        <a
          href={toolkit.checkoutUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            width: "100%", padding: "14px 24px", textDecoration: "none",
            background: "var(--cta-bg)", border: `1px solid var(--cta-border)`,
            borderRadius: 12, color: "var(--cta-text)", fontSize: 14, fontWeight: 600,
            fontFamily: "var(--font-body)",
            transition: "all 0.35s cubic-bezier(0.23,1,0.32,1)",
            boxShadow: "0 2px 12px rgba(200,168,78,0.18)",
            backgroundSize: "200% 200%",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 8px 28px rgba(200,168,78,0.28)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 2px 12px rgba(74,120,54,0.15)";
          }}
        >
          Purchase Now
          <ChevronRight size={16} />
        </a>

        {/* Divider */}
        <div style={{
          display: "flex", alignItems: "center", gap: 12, margin: "14px 0",
        }}>
          <div style={{ flex: 1, height: 1, background: "var(--border-primary)" }} />
          <span style={{ fontSize: 11, color: "var(--text-muted)", fontFamily: "var(--font-body)" }}>or</span>
          <div style={{ flex: 1, height: 1, background: "var(--border-primary)" }} />
        </div>

        {/* Access Code */}
        <button
          type="button"
          onClick={() => onAccessCode(toolkit.toolkitType, toolkit.title)}
          style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            width: "100%", padding: "12px 24px",
            background: "transparent",
            border: `1px solid var(--border-primary)`,
            borderRadius: 12, color: "var(--text-secondary)", fontSize: 13, fontWeight: 600,
            fontFamily: "var(--font-body)", cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--border-hover)";
            e.currentTarget.style.color = "var(--text-primary)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--border-primary)";
            e.currentTarget.style.color = "var(--text-secondary)";
          }}
        >
          <Key size={14} />
          Enter Access Code
        </button>

        <p style={{
          fontSize: 11, color: "var(--text-muted)", textAlign: "center",
          marginTop: 12, fontFamily: "var(--font-body)",
        }}>
          Instant digital download · Immediate access
        </p>
      </div>
    </div>
  );
}

/* ── Coming Soon Card ── */
function ComingSoonCard({ toolkit, index }) {
  return (
    <div style={{
      position: "relative", overflow: "hidden",
      background: "var(--bg-card)", opacity: 0.75,
      backdropFilter: "var(--glass-blur)", WebkitBackdropFilter: "var(--glass-blur)",
      border: "1px solid var(--border-primary)",
      borderRadius: 16, padding: "28px 24px",
      display: "flex", alignItems: "center", gap: 20,
      transition: "all 0.4s ease",
      animation: `cardReveal 0.6s ease-out ${0.3 + index * 0.08}s both`,
    }}>
      <div style={{
        width: 48, height: 48, borderRadius: 14, flexShrink: 0,
        background: "var(--disabled-bg)", border: `1px solid var(--disabled-border)`,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <Lock size={20} color="var(--text-secondary)" />
      </div>
      <div style={{ flex: 1 }}>
        <h4 style={{
          fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 400,
          color: "var(--text-primary)", marginBottom: 4, letterSpacing: "-0.01em",
        }}>
          {toolkit.title}
        </h4>
        <p style={{ fontSize: 13, color: "var(--text-secondary)", fontFamily: "var(--font-body)", lineHeight: 1.5 }}>
          {toolkit.subtitle}
        </p>
      </div>
      <span style={{
        fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
        color: "var(--accent-gold)", background: "rgba(200,168,78,0.08)",
        border: "1px solid rgba(200,168,78,0.15)", padding: "5px 14px",
        borderRadius: 100, fontFamily: "var(--font-body)", whiteSpace: "nowrap", flexShrink: 0,
      }}>
        Coming Soon
      </span>
    </div>
  );
}

/* ── Relocation Card (Coming Soon in Active Grid) ── */
function RelocationCard({ index }: { index: number }) {
  const includes = ["PDF guide", "Request package", "Submission checklist", "Sample letters", "SBA requirements"];
  return (
    <div
      style={{
        position: "relative", overflow: "hidden",
        background: "var(--bg-card)",
        backdropFilter: "var(--glass-blur)", WebkitBackdropFilter: "var(--glass-blur)",
        border: "1px solid var(--border-primary)",
        borderRadius: 20, padding: "40px 32px 32px",
        display: "flex", flexDirection: "column", justifyContent: "space-between",
        minHeight: 480,
        boxShadow: "var(--shadow-card)",
        transition: "all 0.5s cubic-bezier(0.23,1,0.32,1)",
        animation: `cardReveal 0.7s ease-out ${0.15 + index * 0.12}s both`,
        opacity: 0.82,
      }}
    >
      <div style={{
        position: "absolute", top: -50, right: -50, width: 140, height: 140, borderRadius: "50%",
        background: "radial-gradient(circle, var(--overlay-gold) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <Badge variant="gold">Coming Soon</Badge>

      <div style={{ flexGrow: 1, position: "relative", zIndex: 1 }}>
        <h3 style={{
          fontFamily: "var(--font-display)", fontSize: 21, fontWeight: 400,
          color: "var(--text-primary)", marginBottom: 12, lineHeight: 1.3,
          letterSpacing: "-0.01em", paddingRight: 80,
        }}>
          COVID EIDL DIY Relocation Toolkit
        </h3>

        <p style={{
          fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7,
          marginBottom: 20, fontFamily: "var(--font-body)",
        }}>
          Moving your business or collateral location under a COVID EIDL may require SBA review and written approval. This toolkit helps you assemble the right request package and avoid common submission errors.
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 0 }}>
          {includes.map((item, i) => (
            <span key={i} style={{
              display: "inline-flex", alignItems: "center", gap: 5,
              fontSize: 11, fontWeight: 600, color: "var(--text-muted)",
              background: "var(--disabled-bg)", border: "1px solid var(--disabled-border)",
              padding: "4px 10px", borderRadius: 8, fontFamily: "var(--font-body)",
            }}>
              <Lock size={10} />
              {item}
            </span>
          ))}
        </div>
      </div>

      <div style={{
        marginTop: 24, paddingTop: 20,
        borderTop: "1px solid var(--border-primary)",
        position: "relative", zIndex: 1,
      }}>
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <span style={{
            fontFamily: "var(--font-display)", fontSize: 36, color: "var(--text-muted)",
            letterSpacing: "-0.02em",
          }}>
            TBD
          </span>
        </div>

        <button
          type="button"
          disabled
          style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            width: "100%", padding: "14px 24px",
            background: "var(--disabled-bg)", border: "1px solid var(--disabled-border)",
            borderRadius: 12, color: "var(--disabled-text)", fontSize: 14, fontWeight: 600,
            fontFamily: "var(--font-body)", cursor: "not-allowed",
          }}
        >
          <Lock size={15} />
          Toolkit in Development
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "14px 0" }}>
          <div style={{ flex: 1, height: 1, background: "var(--border-primary)" }} />
          <span style={{ fontSize: 11, color: "var(--text-muted)", fontFamily: "var(--font-body)" }}>or</span>
          <div style={{ flex: 1, height: 1, background: "var(--border-primary)" }} />
        </div>

        <button
          type="button"
          disabled
          style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            width: "100%", padding: "12px 24px",
            background: "transparent", border: "1px solid var(--disabled-border)",
            borderRadius: 12, color: "var(--disabled-text)", fontSize: 13, fontWeight: 600,
            fontFamily: "var(--font-body)", cursor: "not-allowed",
          }}
        >
          <Key size={14} />
          Enter Access Code
        </button>

        <p style={{
          fontSize: 11, color: "var(--text-muted)", textAlign: "center",
          marginTop: 12, fontFamily: "var(--font-body)",
        }}>
          Toolkit in development · Check back soon
        </p>
      </div>
    </div>
  );
}

/* ── Feature Card ── */
function FeatureCard({ icon, title, description, delay }) {
  return (
    <div style={{
      textAlign: "center", padding: "32px 24px", borderRadius: 18,
      background: "var(--bg-card)", backdropFilter: "var(--glass-blur)",
      border: "1px solid var(--border-primary)",
      transition: "all 0.5s cubic-bezier(0.23,1,0.32,1)",
      animation: `cardReveal 0.6s ease-out ${delay}s both`,
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = "translateY(-4px)";
      e.currentTarget.style.borderColor = "var(--border-hover)";
      e.currentTarget.style.boxShadow = "var(--shadow-card-hover)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.borderColor = "var(--border-primary)";
      e.currentTarget.style.boxShadow = "none";
    }}
    >
      <div style={{
        width: 56, height: 56, borderRadius: 16, margin: "0 auto 16px",
        background: "var(--badge-bg)", border: `1px solid var(--badge-border)`,
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "var(--accent-green)",
      }}>
        {icon}
      </div>
      <h3 style={{
        fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 400,
        color: "var(--text-primary)", marginBottom: 8,
      }}>
        {title}
      </h3>
      <p style={{
        fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.7,
        fontFamily: "var(--font-body)",
      }}>
        {description}
      </p>
    </div>
  );
}

/* ── Benefit Pill ── */
function BenefitPill({ icon, children }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 8,
      fontSize: 13, color: "var(--accent-green)",
      fontFamily: "var(--font-body)", fontWeight: 500,
    }}>
      <span style={{ display: "flex", alignItems: "center", color: "var(--accent-green)" }}>{icon}</span>
      {children}
    </div>
  );
}


/* ═══════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════ */
export default function CovidEIDLToolkits() {
  const [theme, setTheme] = useState("dark");
  const [accessModal, setAccessModal] = useState({ open: false, type: "", name: "" });
  const [accessCode, setAccessCode] = useState("");
  const [accessError, setAccessError] = useState("");
  const [accessValidated, setAccessValidated] = useState(false);
  const [accessLoading, setAccessLoading] = useState(false);
  const navigate = useNavigate();

  const isDark = theme === "dark";
  const vars = THEMES[theme];

  const handleBack = () => {
    if (window.history.length > 1) window.history.back();
    else window.location.href = FALLBACK_ROUTE;
  };

  const openAccessCode = (type: string, name: string) => {
    setAccessModal({ open: true, type, name });
    setAccessCode("");
    setAccessError("");
    setAccessValidated(false);
    setAccessLoading(false);
  };

  const closeAccessModal = () => {
    setAccessModal({ open: false, type: "", name: "" });
    setAccessCode("");
    setAccessError("");
    setAccessValidated(false);
    setAccessLoading(false);
  };

  const handleValidateCode = async () => {
    if (!accessCode.trim()) {
      setAccessError("Please enter an access code");
      return;
    }
    setAccessLoading(true);
    setAccessError("");
    await new Promise(resolve => setTimeout(resolve, 600));
    const isValid = validateAccessCode(accessCode, accessModal.type);
    if (isValid) {
      setAccessValidated(true);
    } else {
      setAccessError("Invalid access code. Please check your code and try again.");
    }
    setAccessLoading(false);
  };

  const handleAccessToolkit = () => {
    const route = getAccessRoute(accessModal.type);
    navigate(route);
    closeAccessModal();
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* inject CSS variables */
  const cssVarString = Object.entries(vars).map(([k, v]) => `${k}: ${v};`).join("\n");

  return (
    <>
      <style>{`
        :root {
          --font-display: 'Instrument Serif', Georgia, serif;
          --font-body: 'DM Sans', sans-serif;
          ${cssVarString}
        }

        @keyframes pFloat {
          0%, 100% { transform: translate(0,0) scale(1); opacity:0.3; }
          25% { transform: translate(12px,-18px) scale(1.15); opacity:0.6; }
          50% { transform: translate(-8px,-30px) scale(0.85); opacity:0.2; }
          75% { transform: translate(16px,-12px) scale(1.08); opacity:0.5; }
        }
        @keyframes fadeSlideUp {
          from { opacity:0; transform:translateY(28px); }
          to { opacity:1; transform:translateY(0); }
        }
        @keyframes cardReveal {
          from { opacity:0; transform:translateY(30px) scale(0.97); }
          to { opacity:1; transform:translateY(0) scale(1); }
        }
        @keyframes heroGlow {
          0%,100% { opacity:0.4; }
          50% { opacity:0.7; }
        }
        @keyframes pulse {
          0%,100% { opacity:1; transform:scale(1); }
          50% { opacity:0.4; transform:scale(0.8); }
        }
        @keyframes shimmer {
          0% { background-position:-200% center; }
          100% { background-position:200% center; }
        }
        @keyframes modalIn {
          from { opacity:0; transform: scale(0.95) translateY(12px); }
          to { opacity:1; transform: scale(1) translateY(0); }
        }
        @keyframes overlayIn {
          from { opacity:0; }
          to { opacity:1; }
        }

        * { box-sizing:border-box; margin:0; padding:0; }

        .eidl-page {
          min-height:100vh;
          font-family: var(--font-body);
          background: var(--bg-primary);
          color: var(--text-primary);
          overflow-x: hidden;
          position: relative;
          transition: background 0.5s ease, color 0.4s ease;
        }
        .eidl-page::before {
          content:'';
          position:fixed; inset:0;
          background:
            radial-gradient(ellipse 70% 50% at 30% 0%, var(--overlay-green), transparent),
            radial-gradient(ellipse 50% 40% at 70% 100%, var(--overlay-gold), transparent);
          pointer-events:none; z-index:0;
          transition: background 0.5s ease;
        }

        .back-link {
          display:inline-flex; align-items:center; gap:8px;
          color: var(--accent-green); font-size:14px; font-weight:600;
          background:none; border:none; cursor:pointer; padding:8px 0;
          font-family: var(--font-body); transition:all 0.3s ease;
        }
        .back-link:hover { color: var(--accent-green-bright); gap:12px; }

        .theme-toggle {
          display:flex; align-items:center; gap:6px;
          padding:8px 16px; border-radius:12px;
          background: var(--toggle-bg);
          border: 1px solid var(--border-primary);
          color: var(--text-secondary); font-size:13px; font-weight:600;
          cursor:pointer; font-family:var(--font-body);
          transition: all 0.3s ease;
        }
        .theme-toggle:hover {
          border-color: var(--border-hover);
          color: var(--text-primary);
        }

        .active-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }
        .coming-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }
        .features-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        @media (max-width: 1024px) {
          .features-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .active-grid { grid-template-columns: 1fr !important; }
          .coming-grid { grid-template-columns: 1fr !important; }
          .features-grid { grid-template-columns: 1fr !important; }
          .hero-title { font-size: 32px !important; }
          .hero-inner { padding: 40px 20px 56px !important; }
          .benefits-row { flex-direction: column !important; }
          .cta-buttons { flex-direction: column !important; }
          .sabbi-inner { flex-direction: column !important; text-align: center !important; }
          .sabbi-inner > div:last-child { align-self: center !important; }
        }

        /* Access Code Modal */
        .modal-overlay {
          position:fixed; inset:0; z-index:1000;
          background: rgba(0,0,0,0.6);
          backdrop-filter: blur(8px);
          display:flex; align-items:center; justify-content:center;
          padding: 20px;
          animation: overlayIn 0.25s ease both;
        }
        .modal-box {
          background: var(--bg-primary);
          border: 1px solid var(--border-primary);
          border-radius: 24px;
          padding: 40px;
          max-width: 440px;
          width: 100%;
          position: relative;
          animation: modalIn 0.35s ease both;
          box-shadow: 0 32px 80px rgba(0,0,0,0.4);
        }
        .modal-input {
          width:100%; padding: 14px 18px;
          background: var(--bg-tertiary);
          border: 1px solid var(--border-primary);
          border-radius: 12px;
          color: var(--text-primary);
          font-family: var(--font-body);
          font-size: 15px;
          outline: none;
          transition: border-color 0.3s ease;
        }
        .modal-input:focus {
          border-color: var(--accent-green);
        }
        .modal-input::placeholder {
          color: var(--text-muted);
        }
      `}</style>

      <div className="eidl-page">
        <GridOverlay />
        <Particles />

        <div style={{ position: "relative", zIndex: 1 }}>

          {/* ════════ HERO ════════ */}
          <div style={{
            position: "relative", overflow: "hidden",
            background: "var(--bg-hero)",
            borderBottom: "1px solid var(--border-primary)",
            animation: "fadeSlideUp 0.7s ease-out both",
          }}>
            {/* Background glow */}
            <div style={{
              position: "absolute", top: "50%", left: "50%",
              transform: "translate(-50%, -50%)", width: 320, height: 320,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(74,120,54,0.12) 0%, transparent 65%)",
              pointerEvents: "none", animation: "heroGlow 6s ease-in-out infinite",
            }} />

            <div className="hero-inner" style={{
              maxWidth: 1200, margin: "0 auto", padding: "48px 32px 72px",
              position: "relative", zIndex: 1,
            }}>
              {/* Top bar */}
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                marginBottom: 56,
              }}>
                <button type="button" className="back-link" onClick={handleBack} aria-label="Go back"
                  style={{ color: "#c8e0b4" }}
                  onMouseEnter={(e) => e.currentTarget.style.color = "#e8ede2"}
                  onMouseLeave={(e) => e.currentTarget.style.color = "#c8e0b4"}
                >
                  <ArrowLeft size={16} />
                  Back to Last
                </button>
                <button
                  type="button"
                  className="theme-toggle"
                  onClick={() => setTheme(isDark ? "light" : "dark")}
                  aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
                  style={{ background: "rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.1)", color: "#c8e0b4" }}
                >
                  {isDark ? <Sun size={14} /> : <Moon size={14} />}
                  {isDark ? "Light" : "Dark"}
                </button>
              </div>

              {/* Icon */}
              <div style={{
                width: 68, height: 68, borderRadius: 20,
                background: "linear-gradient(135deg, rgba(200,168,78,0.2), rgba(200,168,78,0.08))",
                border: "1px solid rgba(200,168,78,0.25)",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 28px",
              }}>
                <BookOpen size={30} color="#c8a84e" strokeWidth={1.5} />
              </div>

              <h1 className="hero-title" style={{
                fontFamily: "var(--font-display)", fontSize: 50, fontWeight: 400,
                textAlign: "center", color: "#e8ede2", lineHeight: 1.12,
                letterSpacing: "-0.02em", marginBottom: 20,
              }}>
                COVID EIDL{" "}
                <span style={{ fontStyle: "italic", color: "#c8a84e" }}>Toolkit Collection</span>
              </h1>

              <p style={{
                textAlign: "center", fontSize: 16, color: "rgba(232,237,226,0.6)",
                lineHeight: 1.75, maxWidth: 600, margin: "0 auto",
              }}>
                Professional-grade DIY toolkits for handling SBA COVID EIDL requests.
                Take control of your loan servicing without expensive consultants.
              </p>
            </div>
          </div>

          {/* ════════ CONTENT ════════ */}
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "56px 24px 80px" }}>

            {/* ── Active Toolkits ── */}
            <div style={{ marginBottom: 64, animation: "fadeSlideUp 0.7s ease-out 0.15s both" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 14,
                  background: "var(--badge-bg)", border: `1px solid var(--badge-border)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "var(--accent-green)",
                }}>
                  <Zap size={22} />
                </div>
                <div>
                  <h2 style={{
                    fontFamily: "var(--font-display)", fontSize: 30, fontWeight: 400,
                    color: "var(--text-primary)", letterSpacing: "-0.01em",
                  }}>
                    Active Toolkits
                  </h2>
                  <p style={{ fontSize: 14, color: "var(--text-secondary)" }}>
                    Ready to download and use immediately
                  </p>
                </div>
              </div>

              <div className="active-grid">
                {ACTIVE_TOOLKITS.map((t, i) => (
                  <ActiveCard key={t.toolkitType} toolkit={t} index={i} onAccessCode={openAccessCode} />
                ))}
                <RelocationCard index={ACTIVE_TOOLKITS.length} />
              </div>

              {/* Benefits row */}
              <div className="benefits-row" style={{
                marginTop: 24, padding: "20px 28px", borderRadius: 16,
                background: "var(--bg-card)", border: "1px solid var(--border-primary)",
                display: "flex", alignItems: "center", justifyContent: "space-between",
                gap: 24, flexWrap: "wrap",
                animation: "fadeSlideUp 0.7s ease-out 0.5s both",
              }}>
                <BenefitPill icon={<Download size={14} />}>Instant download access</BenefitPill>
                <BenefitPill icon={<Bot size={14} />}>Upgraded Sabbi 2.0</BenefitPill>
                <BenefitPill icon={<FileText size={14} />}>Pro-level templates</BenefitPill>
                <BenefitPill icon={<Eye size={14} />}>Interactive & PDF versions</BenefitPill>
              </div>
            </div>

            {/* ── Coming Soon ── */}
            <div style={{ marginBottom: 64, animation: "fadeSlideUp 0.7s ease-out 0.3s both" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 14,
                  background: "var(--disabled-bg)", border: `1px solid var(--disabled-border)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Clock size={22} color="var(--text-muted)" />
                </div>
                <div>
                  <h2 style={{
                    fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 400,
                    color: "var(--text-secondary)", letterSpacing: "-0.01em",
                  }}>
                    Coming Soon
                  </h2>
                  <p style={{ fontSize: 14, color: "var(--text-muted)" }}>
                    Advanced toolkits in development
                  </p>
                </div>
              </div>

              <div className="coming-grid">
                {COMING_SOON_TOOLKITS.map((t, i) => (
                  <ComingSoonCard key={t.title} toolkit={t} index={i} />
                ))}
              </div>
            </div>

            {/* ── Sabbi CTA ── */}
            <div className="sabbi-inner" style={{
              position: "relative", overflow: "hidden", borderRadius: 24,
              padding: "48px 44px",
              background: isDark
                ? "linear-gradient(135deg, rgba(50,62,38,0.7) 0%, rgba(35,44,28,0.8) 100%)"
                : "linear-gradient(135deg, #3d5a2a 0%, #2d4420 100%)",
              border: "1px solid var(--border-primary)",
              backdropFilter: "var(--glass-blur)",
              display: "flex", alignItems: "center", gap: 40,
              marginBottom: 48,
              animation: "fadeSlideUp 0.8s ease-out 0.5s both",
            }}>
              <div style={{
                position: "absolute", top: -60, right: -60, width: 200, height: 200,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(200,168,78,0.08) 0%, transparent 70%)",
                pointerEvents: "none",
              }} />
              <div style={{ flex: 1, position: "relative", zIndex: 1 }}>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase",
                  color: "#c8a84e", marginBottom: 16,
                  background: "rgba(200,168,78,0.1)", border: "1px solid rgba(200,168,78,0.2)",
                  padding: "5px 14px", borderRadius: 100,
                }}>
                  <Bot size={12} /> AI Assistant
                </div>
                <h2 style={{
                  fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 400,
                  color: "#e8ede2", marginBottom: 12, lineHeight: 1.25,
                }}>
                  Ready to Take Control?
                </h2>
                <p style={{
                  fontSize: 15, color: "rgba(232,237,226,0.6)", lineHeight: 1.75,
                  maxWidth: 520, marginBottom: 20,
                }}>
                  Stop waiting for expensive consultants. Sabbi 2.0 unlocks automatically
                  when you access any active toolkit — specialized guidance, document help,
                  and next steps tailored to your specific needs.
                </p>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  fontSize: 13, color: "#7a9ccc",
                  background: "rgba(100,140,200,0.08)",
                  border: "1px solid rgba(100,140,200,0.15)",
                  borderRadius: 12, padding: "10px 18px",
                }}>
                  <Sparkles size={14} />
                  Sabbi unlocks automatically with any valid toolkit code
                </div>
              </div>
              <div className="cta-buttons" style={{
                display: "flex", flexDirection: "column", gap: 12, flexShrink: 0,
                position: "relative", zIndex: 1,
              }}>
                {["Subordination", "Collateral Release", "Payment Assistance", "Change in Ownership", "Assumption"].map((label) => (
                  <button
                    key={label}
                    type="button"
                    onClick={scrollToTop}
                    style={{
                      display: "inline-flex", alignItems: "center", gap: 8,
                      padding: "12px 28px", whiteSpace: "nowrap",
                      background: "rgba(200,168,78,0.12)", border: "1px solid rgba(200,168,78,0.25)",
                      borderRadius: 12, color: "#c8a84e", fontSize: 13, fontWeight: 600,
                      fontFamily: "var(--font-body)", cursor: "pointer",
                      transition: "all 0.35s cubic-bezier(0.23,1,0.32,1)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(200,168,78,0.22)";
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow = "0 6px 20px rgba(200,168,78,0.12)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(200,168,78,0.12)";
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    Get {label}
                    <ChevronRight size={14} />
                  </button>
                ))}
              </div>
            </div>

            {/* ── Features ── */}
            <div style={{ animation: "fadeSlideUp 0.7s ease-out 0.6s both" }}>
              <div style={{ textAlign: "center", marginBottom: 36 }}>
                <SectionLabel icon={<Award size={14} />}>Why Choose Us</SectionLabel>
                <h2 style={{
                  fontFamily: "var(--font-display)", fontSize: 30, fontWeight: 400,
                  color: "var(--text-primary)", marginTop: 10,
                }}>
                  Why Choose Our Toolkits?
                </h2>
              </div>
              <div className="features-grid">
                <FeatureCard icon={<Shield size={24} />} title="SBA-Aligned Guidance" description="Every toolkit follows current SBA requirements and best practices" delay={0.65} />
                <FeatureCard icon={<Clock size={24} />} title="Save Time & Money" description="Skip expensive consultants and get results faster with DIY approach" delay={0.72} />
                <FeatureCard icon={<Users size={24} />} title="Expert-Created" description="Developed by former SBA professionals with insider knowledge" delay={0.79} />
                <FeatureCard icon={<Package size={24} />} title="Proven Results" description="Based on real-world successful submissions and approvals" delay={0.86} />
              </div>
            </div>

            {/* ── Disclaimer ── */}
            <section id="disclaimer" style={{ animation: "fadeSlideUp 0.7s ease-out 0.8s both" }}>
              <div style={{
                background: "var(--bg-card)",
                backdropFilter: "var(--glass-blur)", WebkitBackdropFilter: "var(--glass-blur)",
                border: "1px solid var(--border-primary)",
                borderRadius: 20, padding: "36px 32px",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  <AlertCircle size={20} color="var(--accent-gold)" />
                  <h2 style={{
                    fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 400,
                    color: "var(--text-primary)",
                  }}>
                    Disclaimer
                  </h2>
                </div>
                <p style={{
                  fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.8,
                  fontFamily: "var(--font-body)",
                }}>
                  SmallBiz Recon™ provides educational information and document preparation support. We are not a law firm, we do not provide legal advice, and use of this site does not create an attorney-client relationship. SBA decisions are fact-specific and subject to change based on SBA policy and borrower circumstances. Always verify requirements using official SBA sources and your loan documents.
                </p>
              </div>
            </section>

          </div>
        </div>

        {/* ════════ ACCESS CODE MODAL ════════ */}
        {accessModal.open && (
          <div className="modal-overlay" onClick={closeAccessModal} role="dialog" aria-modal="true" aria-labelledby="eidl-modal-title">
            <div className="modal-box" onClick={(e) => e.stopPropagation()}>
              <div style={{ textAlign: "center", marginBottom: 28 }}>
                <div aria-hidden="true" style={{
                  width: 56, height: 56, borderRadius: 16, margin: "0 auto 16px",
                  background: accessValidated ? "rgba(74,180,74,0.12)" : "var(--badge-bg)",
                  border: `1px solid ${accessValidated ? "rgba(74,180,74,0.25)" : "var(--badge-border)"}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: accessValidated ? "#4aba4a" : "var(--accent-green)",
                  transition: "all 0.3s ease",
                }}>
                  {accessValidated ? <CheckCircle size={24} /> : <Key size={24} />}
                </div>
                <h3 id="eidl-modal-title" style={{
                  fontFamily: "var(--font-display)", fontSize: 24, color: "var(--text-primary)",
                  marginBottom: 6,
                }}>
                  {accessValidated ? "Access Granted!" : "Enter Access Code"}
                </h3>
                <p style={{ fontSize: 13, color: "var(--text-secondary)" }}>
                  {accessValidated
                    ? "Your code has been validated. Click below to access your toolkit."
                    : accessModal.name}
                </p>
              </div>

              {!accessValidated ? (
                <>
                  <div style={{ marginBottom: 20 }}>
                    <label htmlFor="eidl-access-code" className="sr-only">Access Code</label>
                    <input
                      type="text"
                      id="eidl-access-code"
                      className="modal-input"
                      placeholder="Enter your access code..."
                      value={accessCode}
                      onChange={(e) => setAccessCode(e.target.value)}
                      onKeyDown={(e) => { if (e.key === "Enter") handleValidateCode(); }}
                      autoFocus
                      disabled={accessLoading}
                      aria-describedby={accessError ? "eidl-access-error" : undefined}
                      aria-invalid={accessError ? true : undefined}
                      style={{ textTransform: "uppercase", letterSpacing: "0.05em" }}
                    />
                    {accessError && (
                      <div id="eidl-access-error" role="alert" style={{
                        display: "flex", alignItems: "center", gap: 6,
                        marginTop: 10, fontSize: 13, color: "#cc6666",
                      }}>
                        <AlertCircle aria-hidden="true" size={14} />
                        {accessError}
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={handleValidateCode}
                    disabled={accessLoading || !accessCode.trim()}
                    style={{
                      width: "100%", padding: "14px", borderRadius: 12,
                      background: "var(--cta-bg)", border: `1px solid var(--cta-border)`,
                      color: "var(--cta-text)", fontSize: 14, fontWeight: 600,
                      fontFamily: "var(--font-body)", cursor: accessLoading ? "wait" : "pointer",
                      transition: "all 0.3s ease",
                      backgroundSize: "200% 200%",
                      opacity: (!accessCode.trim() || accessLoading) ? 0.6 : 1,
                    }}
                  >
                    {accessLoading ? "Validating..." : "Validate & Access"}
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={handleAccessToolkit}
                  style={{
                    width: "100%", padding: "14px", borderRadius: 12,
                    background: "var(--cta-bg)", border: `1px solid var(--cta-border)`,
                    color: "var(--cta-text)", fontSize: 14, fontWeight: 600,
                    fontFamily: "var(--font-body)", cursor: "pointer",
                    transition: "all 0.3s ease",
                    backgroundSize: "200% 200%",
                  }}
                >
                  Gain Access Now
                </button>
              )}

              <button
                type="button"
                onClick={closeAccessModal}
                style={{
                  width: "100%", padding: "12px", marginTop: 10, borderRadius: 12,
                  background: "transparent", border: `1px solid var(--border-primary)`,
                  color: "var(--text-secondary)", fontSize: 13, fontWeight: 600,
                  fontFamily: "var(--font-body)", cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}