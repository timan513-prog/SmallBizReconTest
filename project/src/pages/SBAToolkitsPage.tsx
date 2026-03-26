import { useState, useEffect, useRef } from "react";
import {
  ArrowLeft, BookOpen, Wrench, Clock, Star, Zap, Filter,
  ChevronRight, Lock, Shield, Sparkles, Package, Bot, ExternalLink
} from "lucide-react";

/* ───────────────── CONFIG ───────────────── */
const FALLBACK_ROUTE = "/";
const FILTER_OPTIONS = ["All", "SBA 101", "EIDL", "7(a)/504/PPP", "Special"];

const TOOLKITS = [
  {
    title: "SBA 101 – What You Need to Know",
    icon: "book",
    body: "A free beginner's guide to understanding SBA programs, qualifications, and terms. Ideal for small business owners exploring DIY SBA navigation.",
    quote: "Plain-language breakdown of SBA roles, programs, and key terms.",
    button: { label: "Explore SBA Basics", link: "/sba/resources/quick-intro-guide" },
    category: "SBA 101",
    status: "active",
  },
  {
    title: "COVID EIDL Toolkit Collection",
    icon: "wrench",
    body: "A full suite of DIY toolkits for handling SBA COVID EIDL requests — Subordination, Collateral Release, Payoff, Ownership Changes, and more.",
    quote: "Step-by-step toolkits to help you take control — no middleman needed.",
    button: { label: "Browse EIDL Toolkits", link: "/covid-eidl-toolkits" },
    category: "EIDL",
    status: "active",
  },
  {
    title: "7(a), 504 & PPP Toolkits",
    icon: "clock",
    body: "All-in-one DIY toolkits for SBA 7(a), 504, and PPP Forgiveness servicing. Designed for business owners who want control and clarity.",
    quote: "Submit the right forms the first time — yourself.",
    button: { label: "Coming Soon", disabled: true },
    category: "7(a)/504/PPP",
    status: "coming",
  },
  {
    title: "Special Feature Toolkits",
    icon: "star",
    body: "Advanced DIY kits for credit repair, business closure, dispute letters, and more — built for users ready to handle things without paying consultants.",
    quote: "Take charge of your financial future — DIY style.",
    button: { label: "Coming Soon", disabled: true },
    category: "Special",
    status: "coming",
  },
];

/* ───────────────── ICON MAP ───────────────── */
function CardIcon({ name, size = 24 }) {
  const props = { size, strokeWidth: 1.8 };
  switch (name) {
    case "book": return <BookOpen {...props} />;
    case "wrench": return <Wrench {...props} />;
    case "clock": return <Clock {...props} />;
    case "star": return <Star {...props} />;
    default: return <Package {...props} />;
  }
}

/* ───────────────── AMBIENT GRID ───────────────── */
function GridOverlay() {
  return (
    <div style={{
      position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0, opacity: 0.03,
    }}>
      <svg width="100%" height="100%">
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#9ab87a" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
}

/* ───────────────── FLOATING PARTICLES ───────────────── */
function Particles() {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
      {Array.from({ length: 20 }).map((_, i) => (
        <div key={i} style={{
          position: "absolute",
          width: `${1.5 + Math.random() * 2.5}px`,
          height: `${1.5 + Math.random() * 2.5}px`,
          borderRadius: "50%",
          background: `rgba(${150 + Math.random() * 50}, ${180 + Math.random() * 40}, ${80 + Math.random() * 40}, ${0.12 + Math.random() * 0.15})`,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animation: `pFloat ${9 + Math.random() * 14}s ease-in-out infinite`,
          animationDelay: `${Math.random() * -12}s`,
        }} />
      ))}
    </div>
  );
}

/* ───────────────── TOOLKIT CARD ───────────────── */
function ToolkitCard({ toolkit, index }) {
  const isDisabled = toolkit.button.disabled;
  const isComing = toolkit.status === "coming";

  return (
    <div
      style={{
        background: "rgba(30, 34, 26, 0.6)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: "1px solid rgba(154, 184, 122, 0.1)",
        borderRadius: 20,
        padding: "36px 32px 28px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: 400,
        position: "relative",
        overflow: "hidden",
        transition: "all 0.5s cubic-bezier(0.23,1,0.32,1)",
        animation: `cardReveal 0.7s ease-out ${0.15 + index * 0.1}s both`,
        cursor: "default",
        opacity: isComing ? 0.7 : 1,
      }}
      onMouseEnter={(e) => {
        if (!isComing) {
          e.currentTarget.style.transform = "translateY(-6px)";
          e.currentTarget.style.borderColor = "rgba(154, 184, 122, 0.25)";
          e.currentTarget.style.boxShadow = "0 24px 64px rgba(0,0,0,0.3), 0 0 0 1px rgba(154,184,122,0.12)";
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.borderColor = "rgba(154, 184, 122, 0.1)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Top glow accent */}
      <div style={{
        position: "absolute", top: -40, right: -40, width: 120, height: 120,
        borderRadius: "50%",
        background: isComing
          ? "radial-gradient(circle, rgba(100,100,100,0.06) 0%, transparent 70%)"
          : "radial-gradient(circle, rgba(154,184,122,0.08) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ flexGrow: 1 }}>
        {/* Icon + Status */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <div style={{
            width: 52, height: 52, borderRadius: 14,
            background: isComing
              ? "linear-gradient(135deg, rgba(80,80,80,0.3), rgba(60,60,60,0.2))"
              : "linear-gradient(135deg, rgba(74,120,54,0.25), rgba(154,184,122,0.15))",
            display: "flex", alignItems: "center", justifyContent: "center",
            border: `1px solid ${isComing ? "rgba(100,100,100,0.15)" : "rgba(154,184,122,0.2)"}`,
          }}>
            <span style={{ color: isComing ? "#888" : "#b8d4a0" }}>
              <CardIcon name={toolkit.icon} size={24} />
            </span>
          </div>
          {isComing && (
            <span style={{
              fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase",
              color: "#c8a84e", background: "rgba(200,168,78,0.1)", border: "1px solid rgba(200,168,78,0.2)",
              padding: "4px 12px", borderRadius: 100, fontFamily: "'DM Sans', sans-serif",
            }}>
              Coming Soon
            </span>
          )}
          {toolkit.status === "active" && (
            <span style={{
              fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase",
              color: "#9ab87a", background: "rgba(154,184,122,0.1)", border: "1px solid rgba(154,184,122,0.2)",
              padding: "4px 12px", borderRadius: 100, fontFamily: "'DM Sans', sans-serif",
            }}>
              <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "#9ab87a", marginRight: 6, verticalAlign: "middle", animation: "pulse 2s ease-in-out infinite" }} />
              Active
            </span>
          )}
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily: "'Instrument Serif', Georgia, serif",
          fontSize: 22, fontWeight: 400, color: isComing ? "#8a8e84" : "#e8ede2",
          marginBottom: 14, lineHeight: 1.3, letterSpacing: "-0.01em",
        }}>
          {toolkit.title}
        </h3>

        {/* Body */}
        <p style={{
          fontSize: 14, color: isComing ? "#5a5e54" : "#8a9480",
          lineHeight: 1.75, marginBottom: 16, fontFamily: "'DM Sans', sans-serif",
        }}>
          {toolkit.body}
        </p>

        {/* Quote */}
        <div style={{
          borderLeft: `3px solid ${isComing ? "rgba(200,168,78,0.2)" : "rgba(200,168,78,0.5)"}`,
          paddingLeft: 16, marginBottom: 0,
        }}>
          <p style={{
            fontSize: 13, fontStyle: "italic",
            color: isComing ? "rgba(200,168,78,0.4)" : "rgba(200,168,78,0.8)",
            lineHeight: 1.6, fontFamily: "'DM Sans', sans-serif",
          }}>
            "{toolkit.quote}"
          </p>
        </div>
      </div>

      {/* CTA */}
      <div style={{
        marginTop: 24, paddingTop: 20,
        borderTop: "1px solid rgba(154, 184, 122, 0.08)",
      }}>
        {isDisabled ? (
          <button disabled style={{
            width: "100%", padding: "14px 24px",
            background: "rgba(60,60,60,0.3)", border: "1px solid rgba(100,100,100,0.15)",
            borderRadius: 12, color: "#666", fontSize: 14, fontWeight: 600,
            fontFamily: "'DM Sans', sans-serif", cursor: "not-allowed",
            letterSpacing: "0.06em", textTransform: "uppercase",
          }}>
            <Lock size={14} style={{ display: "inline", verticalAlign: "-2px", marginRight: 8 }} />
            {toolkit.button.label}
          </button>
        ) : (
          <a href={toolkit.button.link || "#"} style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            width: "100%", padding: "14px 24px", textDecoration: "none",
            background: "linear-gradient(135deg, rgba(74,120,54,0.3), rgba(154,184,122,0.15))",
            border: "1px solid rgba(154,184,122,0.25)",
            borderRadius: 12, color: "#c8e0b4", fontSize: 14, fontWeight: 600,
            fontFamily: "'DM Sans', sans-serif",
            transition: "all 0.4s cubic-bezier(0.23,1,0.32,1)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "linear-gradient(135deg, rgba(74,120,54,0.5), rgba(154,184,122,0.25))";
            e.currentTarget.style.borderColor = "rgba(154,184,122,0.4)";
            e.currentTarget.style.boxShadow = "0 4px 20px rgba(74,120,54,0.25)";
            e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "linear-gradient(135deg, rgba(74,120,54,0.3), rgba(154,184,122,0.15))";
            e.currentTarget.style.borderColor = "rgba(154,184,122,0.25)";
            e.currentTarget.style.boxShadow = "none";
            e.currentTarget.style.transform = "translateY(0)";
          }}
          >
            {toolkit.button.label}
            <ChevronRight size={16} />
          </a>
        )}
      </div>
    </div>
  );
}

/* ───────────────── MAIN PAGE ───────────────── */
export default function SBAToolkitsPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = activeFilter === "All"
    ? TOOLKITS
    : TOOLKITS.filter((t) => t.category === activeFilter);

  const handleBack = () => {
    if (window.history.length > 1) window.history.back();
    else window.location.href = FALLBACK_ROUTE;
  };

  return (
    <>
      <style>{`
        @keyframes pFloat {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
          25% { transform: translate(12px, -18px) scale(1.15); opacity: 0.6; }
          50% { transform: translate(-8px, -30px) scale(0.85); opacity: 0.25; }
          75% { transform: translate(16px, -12px) scale(1.08); opacity: 0.5; }
        }

        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes cardReveal {
          from { opacity: 0; transform: translateY(32px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes heroGlow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.7; }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.85); }
        }

        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .toolkit-page {
          min-height: 100vh;
          font-family: 'DM Sans', sans-serif;
          background: #181c14;
          color: #e8ede2;
          overflow-x: hidden;
          position: relative;
        }

        .toolkit-page::before {
          content: '';
          position: fixed;
          inset: 0;
          background:
            radial-gradient(ellipse 70% 50% at 30% 0%, rgba(74,120,54,0.08), transparent),
            radial-gradient(ellipse 50% 40% at 70% 100%, rgba(200,168,78,0.04), transparent);
          pointer-events: none;
          z-index: 0;
        }

        .filter-btn {
          padding: 8px 20px;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          border: 1px solid rgba(154,184,122,0.12);
          background: rgba(30, 34, 26, 0.5);
          color: #8a9480;
          cursor: pointer;
          transition: all 0.35s cubic-bezier(0.23,1,0.32,1);
          white-space: nowrap;
          backdrop-filter: blur(8px);
        }
        .filter-btn:hover {
          border-color: rgba(154,184,122,0.3);
          color: #c8e0b4;
          background: rgba(74,120,54,0.12);
        }
        .filter-btn.active {
          background: linear-gradient(135deg, rgba(200,168,78,0.2), rgba(200,168,78,0.1));
          border-color: rgba(200,168,78,0.35);
          color: #c8a84e;
          box-shadow: 0 0 20px rgba(200,168,78,0.08);
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #9ab87a;
          font-size: 14px;
          font-weight: 600;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px 0;
          font-family: 'DM Sans', sans-serif;
          transition: all 0.3s ease;
          letter-spacing: 0.02em;
        }
        .back-link:hover {
          color: #c8e0b4;
          gap: 12px;
        }

        @media (max-width: 768px) {
          .card-grid { grid-template-columns: 1fr !important; }
          .hero-title { font-size: 32px !important; }
          .hero-section { padding: 24px 20px !important; }
          .sabbi-cta { flex-direction: column !important; text-align: center !important; }
          .sabbi-cta > div:last-child { align-self: center !important; }
        }
      `}</style>

      <div className="toolkit-page">
        <GridOverlay />
        <Particles />

        <div style={{ position: "relative", zIndex: 1 }}>

          {/* ── HERO SECTION ── */}
          <div
            className="hero-section"
            style={{
              position: "relative",
              overflow: "hidden",
              padding: "24px 32px 64px",
              background: "linear-gradient(180deg, rgba(50,62,38,0.6) 0%, rgba(24,28,20,0.95) 100%)",
              borderBottom: "1px solid rgba(154,184,122,0.08)",
              animation: "fadeSlideUp 0.7s ease-out both",
            }}
          >
            {/* Large blurred icon behind title */}
            <div style={{
              position: "absolute", top: "50%", left: "50%",
              transform: "translate(-50%, -50%)",
              width: 280, height: 280, borderRadius: "50%",
              background: "radial-gradient(circle, rgba(74,120,54,0.1) 0%, transparent 65%)",
              pointerEvents: "none",
              animation: "heroGlow 6s ease-in-out infinite",
            }} />

            <div style={{ maxWidth: 1120, margin: "0 auto", position: "relative", zIndex: 1 }}>
              {/* Back */}
              <nav style={{ marginBottom: 28 }}>
                <button type="button" className="back-link" onClick={handleBack} aria-label="Go back">
                  <ArrowLeft size={16} />
                  Back to Last
                </button>
              </nav>

              {/* Hero icon */}
              <div style={{
                width: 64, height: 64, borderRadius: 18,
                background: "linear-gradient(135deg, rgba(200,168,78,0.2), rgba(200,168,78,0.08))",
                border: "1px solid rgba(200,168,78,0.25)",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 28px",
              }}>
                <BookOpen size={28} color="#c8a84e" strokeWidth={1.5} />
              </div>

              {/* Title */}
              <h1
                className="hero-title"
                style={{
                  fontFamily: "'Instrument Serif', Georgia, serif",
                  fontSize: 48,
                  fontWeight: 400,
                  textAlign: "center",
                  color: "#e8ede2",
                  lineHeight: 1.15,
                  letterSpacing: "-0.015em",
                  marginBottom: 20,
                }}
              >
                Explore DIY{" "}
                <span style={{ fontStyle: "italic", color: "#c8a84e" }}>SBA Toolkits</span>
              </h1>

              <p style={{
                textAlign: "center",
                fontSize: 16,
                color: "#8a9480",
                lineHeight: 1.75,
                maxWidth: 580,
                margin: "0 auto",
              }}>
                Choose your toolkit below. Filter by SBA program, learn what's coming,
                and get Sabbi's support anytime.
              </p>
            </div>
          </div>

          {/* ── CONTENT ── */}
          <div style={{ maxWidth: 1120, margin: "0 auto", padding: "48px 24px 80px" }}>

            {/* Filter Bar */}
            <div style={{
              display: "flex", alignItems: "center", gap: 10,
              justifyContent: "center", flexWrap: "wrap",
              marginBottom: 48,
              animation: "fadeSlideUp 0.7s ease-out 0.15s both",
            }}>
              <div style={{
                display: "flex", alignItems: "center", gap: 7,
                marginRight: 8, color: "#6a7462", fontSize: 13, fontWeight: 600,
              }}>
                <Filter size={14} />
                Filter
              </div>
              {FILTER_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  className={`filter-btn ${activeFilter === opt ? "active" : ""}`}
                  onClick={() => setActiveFilter(opt)}
                >
                  {opt}
                </button>
              ))}
            </div>

            {/* Toolkit Grid */}
            <div
              className="card-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 24,
                maxWidth: 960,
                margin: "0 auto 64px",
              }}
            >
              {filtered.map((toolkit, i) => (
                <ToolkitCard key={toolkit.title} toolkit={toolkit} index={i} />
              ))}
            </div>

            {/* No Results */}
            {filtered.length === 0 && (
              <div style={{
                textAlign: "center", padding: "64px 20px",
                animation: "fadeSlideUp 0.5s ease-out both",
              }}>
                <div style={{
                  width: 64, height: 64, borderRadius: "50%",
                  background: "rgba(154,184,122,0.08)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 16px",
                }}>
                  <Filter size={28} color="#5a6450" />
                </div>
                <h3 style={{
                  fontFamily: "'Instrument Serif', Georgia, serif",
                  fontSize: 22, color: "#8a9480", marginBottom: 8,
                }}>No toolkits found</h3>
                <p style={{ fontSize: 14, color: "#5a6450" }}>
                  Try adjusting your filter or check back later for new toolkits.
                </p>
              </div>
            )}

            {/* ── SABBI CTA ── */}
            <div
              className="sabbi-cta"
              style={{
                position: "relative",
                overflow: "hidden",
                borderRadius: 24,
                padding: "48px 44px",
                background: "linear-gradient(135deg, rgba(50,62,38,0.7) 0%, rgba(35,44,28,0.8) 100%)",
                border: "1px solid rgba(154,184,122,0.15)",
                backdropFilter: "blur(20px)",
                display: "flex",
                alignItems: "center",
                gap: 40,
                animation: "fadeSlideUp 0.8s ease-out 0.5s both",
              }}
            >
              {/* Decorative glow */}
              <div style={{
                position: "absolute", top: -60, right: -60,
                width: 200, height: 200, borderRadius: "50%",
                background: "radial-gradient(circle, rgba(200,168,78,0.08) 0%, transparent 70%)",
                pointerEvents: "none",
              }} />

              <div style={{ flex: 1, position: "relative", zIndex: 1 }}>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase",
                  color: "#c8a84e", marginBottom: 14,
                  background: "rgba(200,168,78,0.1)", border: "1px solid rgba(200,168,78,0.2)",
                  padding: "5px 14px", borderRadius: 100,
                }}>
                  <Bot size={12} /> AI Assistant
                </div>

                <h2 style={{
                  fontFamily: "'Instrument Serif', Georgia, serif",
                  fontSize: 30, fontWeight: 400, color: "#e8ede2",
                  marginBottom: 12, lineHeight: 1.25, letterSpacing: "-0.01em",
                }}>
                  Meet Sabbi <span style={{ fontStyle: "italic", color: "#c8a84e" }}>2.0</span>
                </h2>

                <p style={{
                  fontSize: 15, color: "#8a9480", lineHeight: 1.75, maxWidth: 520, marginBottom: 20,
                }}>
                  Your context-aware SBA assistant is available with every toolkit purchase.
                  Get specialized guidance, document help, and next steps tailored to your
                  specific toolkit.
                </p>

                <div style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  fontSize: 13, color: "#7a9ccc",
                  background: "rgba(100,140,200,0.08)",
                  border: "1px solid rgba(100,140,200,0.15)",
                  borderRadius: 12, padding: "10px 18px",
                }}>
                  <Sparkles size={14} />
                  Sabbi unlocks automatically when you access any toolkit with a valid code.
                </div>
              </div>

              <div style={{ flexShrink: 0, position: "relative", zIndex: 1 }}>
                <a
                  href="/covid-eidl-toolkits"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 10,
                    padding: "16px 36px",
                    background: "linear-gradient(135deg, rgba(200,168,78,0.25), rgba(200,168,78,0.12))",
                    border: "1px solid rgba(200,168,78,0.35)",
                    borderRadius: 14, color: "#c8a84e", fontSize: 15, fontWeight: 600,
                    fontFamily: "'DM Sans', sans-serif", textDecoration: "none",
                    transition: "all 0.4s cubic-bezier(0.23,1,0.32,1)",
                    whiteSpace: "nowrap",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "linear-gradient(135deg, rgba(200,168,78,0.4), rgba(200,168,78,0.2))";
                    e.currentTarget.style.boxShadow = "0 8px 32px rgba(200,168,78,0.15)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "linear-gradient(135deg, rgba(200,168,78,0.25), rgba(200,168,78,0.12))";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  Get Started
                  <ChevronRight size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}