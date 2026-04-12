import { useState, useCallback, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Download, BookOpen, CircleCheck as CheckCircle, Lightbulb, FileText, Scale, Target, Shield, Users, ChevronRight, Sun, Moon, Zap, Package, Award } from "lucide-react";
import LoanProgramModal from "../../components/LoanProgramModal";

interface LoanProgram {
  title: string;
  description: string;
  details: string;
  color: string;
}

const QUICK_START_GUIDE_PDF_URL =
  "https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/public/SMALLBIZRECON-FREEPUBLIC/SmallBiz_Recon_101_Quick_Start_Guide.pdf#page=1";

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
    "--border-primary": "rgba(154, 184, 122, 0.1)",
    "--border-hover": "rgba(154, 184, 122, 0.25)",
    "--text-primary": "#e8ede2",
    "--text-secondary": "#8a9480",
    "--text-muted": "#5a6450",
    "--accent-green": "#9ab87a",
    "--accent-green-bright": "#c8e0b4",
    "--accent-gold": "#c8a84e",
    "--accent-blue": "#7a9ccc",
    "--glass-blur": "blur(24px)",
    "--shadow-card": "0 4px 32px rgba(0,0,0,0.2)",
    "--shadow-card-hover": "0 24px 64px rgba(0,0,0,0.35)",
    "--grid-opacity": "0.03",
    "--particle-opacity": "0.15",
    "--overlay-green": "rgba(74,120,54,0.08)",
    "--badge-bg": "rgba(154,184,122,0.1)",
    "--badge-border": "rgba(154,184,122,0.2)",
    "--cta-bg": "linear-gradient(135deg, rgba(74,120,54,0.3), rgba(154,184,122,0.15))",
    "--cta-border": "rgba(154,184,122,0.25)",
    "--cta-text": "#c8e0b4",
  },
  light: {
    "--bg-primary": "#f5f3ee",
    "--bg-secondary": "rgba(255, 255, 255, 0.7)",
    "--bg-tertiary": "rgba(245, 243, 238, 0.8)",
    "--bg-card": "rgba(255, 255, 255, 0.75)",
    "--bg-card-hover": "rgba(255, 255, 255, 0.9)",
    "--bg-hero": "linear-gradient(180deg, #3d5a2a 0%, #2a3d1e 100%)",
    "--border-primary": "rgba(74, 120, 54, 0.12)",
    "--border-hover": "rgba(74, 120, 54, 0.25)",
    "--text-primary": "#1a2e12",
    "--text-secondary": "#5a6b52",
    "--text-muted": "#8a9680",
    "--accent-green": "#4A7836",
    "--accent-green-bright": "#3d6a2b",
    "--accent-gold": "#9a7a28",
    "--accent-blue": "#4678AA",
    "--glass-blur": "blur(20px)",
    "--shadow-card": "0 4px 24px rgba(0,0,0,0.06)",
    "--shadow-card-hover": "0 20px 48px rgba(0,0,0,0.1)",
    "--grid-opacity": "0.04",
    "--particle-opacity": "0.1",
    "--overlay-green": "rgba(74,120,54,0.04)",
    "--badge-bg": "rgba(74,120,54,0.08)",
    "--badge-border": "rgba(74,120,54,0.18)",
    "--cta-bg": "linear-gradient(135deg, #3d6a2b 0%, #4A7836 40%, #5C9A42 100%)",
    "--cta-border": "rgba(74,120,54,0.3)",
    "--cta-text": "#ffffff",
  },
};

/* ═══════════════════════════════════════════
   SUB-COMPONENTS
   ═══════════════════════════════════════════ */
function GridOverlay() {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0, opacity: "var(--grid-opacity)" }}>
      <svg width="100%" height="100%">
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
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
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

function LoanProgramCard({ program, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={() => onClick(program)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        background: "var(--bg-card)",
        backdropFilter: "var(--glass-blur)",
        border: `1px solid ${hovered ? "var(--border-hover)" : "var(--border-primary)"}`,
        borderRadius: 16,
        padding: 24,
        textAlign: "left",
        cursor: "pointer",
        transition: "all 0.5s cubic-bezier(0.23,1,0.32,1)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered ? "var(--shadow-card-hover)" : "var(--shadow-card)",
      }}
    >
      <h3 style={{
        fontFamily: "var(--font-display)",
        fontSize: 18,
        fontWeight: 400,
        color: "var(--text-primary)",
        marginBottom: 8,
      }}>
        {program.title}
      </h3>
      <p style={{
        fontSize: 13,
        color: "var(--text-secondary)",
        lineHeight: 1.7,
        fontFamily: "var(--font-body)",
      }}>
        {program.description}
      </p>
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        marginTop: 12,
        fontSize: 12,
        color: "var(--accent-green)",
        fontWeight: 600,
      }}>
        Learn more <ChevronRight size={14} />
      </div>
    </button>
  );
}

function StatsCard({ value, label, delay }) {
  return (
    <div style={{
      textAlign: "center",
      padding: 24,
      borderRadius: 16,
      background: "var(--bg-card)",
      backdropFilter: "var(--glass-blur)",
      border: "1px solid var(--border-primary)",
      animation: `cardReveal 0.6s ease-out ${delay}s both`,
    }}>
      <div style={{
        fontFamily: "var(--font-display)",
        fontSize: 36,
        fontWeight: 400,
        color: "var(--accent-gold)",
        marginBottom: 8,
      }}>
        {value}
      </div>
      <div style={{
        fontSize: 13,
        color: "var(--text-secondary)",
        fontFamily: "var(--font-body)",
      }}>
        {label}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════ */
export default function SBA101QuickGuide() {
  const [theme, setTheme] = useState("dark");
  const [selectedLoanProgram, setSelectedLoanProgram] = useState<LoanProgram | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const isDark = theme === "dark";
  const vars = THEMES[theme];

  const loanPrograms: LoanProgram[] = useMemo(
    () => [
      {
        title: "7(a) Loans",
        description: "Flexible loans for working capital and real estate",
        details: "The 7(a) Loan is the SBA's most common loan program, offering up to $5 million for working capital, real estate, or equipment.",
        color: "green",
      },
      {
        title: "504 Loans",
        description: "Fixed-rate financing for real estate, equipment",
        details: "The 504 Loan provides long-term, fixed-rate financing for major assets like commercial real estate or equipment.",
        color: "gold",
      },
      {
        title: "Microloans",
        description: "Up to $50,000 with business support",
        details: "SBA Microloans offer up to $50,000 for new or growing small businesses needing working capital, inventory, or supplies.",
        color: "blue",
      },
      {
        title: "Disaster Loans",
        description: "Low-interest disaster recovery loans",
        details: "Disaster Loans provide low-interest funding for businesses affected by declared disasters.",
        color: "purple",
      },
      {
        title: "Express Loans",
        description: "Fast-track SBA loan option up to $500,000",
        details: "SBA Express is a streamlined option offering faster decisions than standard 7(a) processing.",
        color: "green",
      },
      {
        title: "Special Purpose Loans",
        description: "Programs for veterans, exporters, and more",
        details: "Special purpose programs include export-focused options, veteran-related programs, and other targeted initiatives.",
        color: "blue",
      },
    ],
    []
  );

  const handleCardClick = useCallback((loanProgram: LoanProgram) => {
    setSelectedLoanProgram(loanProgram);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedLoanProgram(null);
  }, []);

  const handleDownloadPDF = useCallback(() => {
    window.open(QUICK_START_GUIDE_PDF_URL, "_blank", "noopener,noreferrer");
  }, []);

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

        * { box-sizing:border-box; margin:0; padding:0; }

        .sba-guide-page {
          min-height:100vh;
          font-family: var(--font-body);
          background: var(--bg-primary);
          color: var(--text-primary);
          overflow-x: hidden;
          position: relative;
          transition: background 0.5s ease, color 0.4s ease;
        }
        .sba-guide-page::before {
          content:'';
          position:fixed; inset:0;
          background:
            radial-gradient(ellipse 70% 50% at 30% 0%, var(--overlay-green), transparent);
          pointer-events:none; z-index:0;
          transition: background 0.5s ease;
        }

        .grid-2 {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
        .grid-4 {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        @media (max-width: 1024px) {
          .grid-4 { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 768px) {
          .hero-title { font-size: 32px !important; }
          .hero-inner { padding: 40px 20px 56px !important; }
          .grid-2 { grid-template-columns: 1fr !important; }
          .grid-3 { grid-template-columns: 1fr !important; }
          .grid-4 { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div className="sba-guide-page">
        <GridOverlay />
        <Particles />

        <div style={{ position: "relative", zIndex: 1 }}>
          {/* ════════ HERO ════════ */}
          <div style={{
            position: "relative",
            overflow: "hidden",
            background: "var(--bg-hero)",
            borderBottom: "1px solid var(--border-primary)",
            animation: "fadeSlideUp 0.7s ease-out both",
          }}>
            <div style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 320,
              height: 320,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(74,120,54,0.12) 0%, transparent 65%)",
              pointerEvents: "none",
              animation: "heroGlow 6s ease-in-out infinite",
            }} />

            <div className="hero-inner" style={{
              maxWidth: 1200,
              margin: "0 auto",
              padding: "48px 32px 72px",
              position: "relative",
              zIndex: 1,
            }}>
              {/* Top bar */}
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 56,
              }}>
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    background: "none",
                    border: "none",
                    color: "#c8e0b4",
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: "pointer",
                    padding: "8px 0",
                    fontFamily: "var(--font-body)",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#e8ede2";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#c8e0b4";
                  }}
                >
                  <ArrowLeft size={16} />
                  Back to Last
                </button>
                <button
                  type="button"
                  onClick={() => setTheme(isDark ? "light" : "dark")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "8px 16px",
                    borderRadius: 12,
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#c8e0b4",
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                    fontFamily: "var(--font-body)",
                    transition: "all 0.3s ease",
                  }}
                >
                  {isDark ? <Sun size={14} /> : <Moon size={14} />}
                  {isDark ? "Light" : "Dark"}
                </button>
              </div>

              {/* Icon */}
              <div style={{
                width: 68,
                height: 68,
                borderRadius: 20,
                background: "linear-gradient(135deg, rgba(200,168,78,0.2), rgba(200,168,78,0.08))",
                border: "1px solid rgba(200,168,78,0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 28px",
              }}>
                <BookOpen size={30} color="#c8a84e" strokeWidth={1.5} />
              </div>

              <h1 className="hero-title" style={{
                fontFamily: "var(--font-display)",
                fontSize: 50,
                fontWeight: 400,
                textAlign: "center",
                color: "#e8ede2",
                lineHeight: 1.12,
                letterSpacing: "-0.02em",
                marginBottom: 20,
              }}>
                SmallBiz Recon™{" "}
                <span style={{ fontStyle: "italic", color: "#c8a84e" }}>101 Quick Start</span>
              </h1>

              <p style={{
                textAlign: "center",
                fontSize: 16,
                color: "rgba(232,237,226,0.6)",
                lineHeight: 1.75,
                maxWidth: 600,
                margin: "0 auto 32px",
              }}>
                Your tactical intro to SBA loans and small business funding. Essential knowledge for every entrepreneur.
              </p>

              {/* CTA Buttons */}
              <div style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 16,
                justifyContent: "center",
                alignItems: "center",
              }}>
                <button
                  type="button"
                  onClick={handleDownloadPDF}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "14px 32px",
                    background: "linear-gradient(135deg, rgba(200,168,78,0.3), rgba(200,168,78,0.15))",
                    border: "1px solid rgba(200,168,78,0.25)",
                    borderRadius: 12,
                    color: "#c8a84e",
                    fontSize: 15,
                    fontWeight: 600,
                    fontFamily: "var(--font-body)",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    boxShadow: "0 2px 12px rgba(200,168,78,0.1)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 8px 28px rgba(200,168,78,0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 2px 12px rgba(200,168,78,0.1)";
                  }}
                >
                  <Download size={18} />
                  Download PDF Guide
                </button>

                <Link
                  to="/sba/resources/quick-intro-guide"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "14px 32px",
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: 12,
                    color: "#c8e0b4",
                    fontSize: 15,
                    fontWeight: 600,
                    fontFamily: "var(--font-body)",
                    textDecoration: "none",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.12)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                  }}
                >
                  <Zap size={18} />
                  Interactive Guide
                </Link>
              </div>

              <p style={{
                textAlign: "center",
                fontSize: 13,
                color: "rgba(232,237,226,0.4)",
                marginTop: 20,
                fontStyle: "italic",
              }}>
                No login. No email. Just clarity.
              </p>
            </div>
          </div>

          {/* ════════ CONTENT ════════ */}
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "56px 24px 80px" }}>

            {/* Stats */}
            <div className="grid-3" style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 20,
              marginBottom: 56,
              animation: "fadeSlideUp 0.7s ease-out 0.15s both",
            }}>
              <StatsCard value="70+" label="Years Serving" delay={0.2} />
              <StatsCard value="Billions" label="Annual Lending Supported" delay={0.3} />
              <StatsCard value="Millions" label="Small Businesses Served" delay={0.4} />
            </div>

            {/* What is the SBA? */}
            <div style={{ marginBottom: 64, animation: "fadeSlideUp 0.7s ease-out 0.2s both" }}>
              <div style={{
                padding: 48,
                borderRadius: 24,
                background: "var(--bg-card)",
                backdropFilter: "var(--glass-blur)",
                border: "1px solid var(--border-primary)",
              }}>
                <div style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 24,
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--accent-green)",
                  fontFamily: "var(--font-body)",
                }}>
                  <Lightbulb size={14} />
                  The Basics
                </div>
                <h2 style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 36,
                  fontWeight: 400,
                  color: "var(--text-primary)",
                  marginBottom: 16,
                }}>
                  What is the SBA?
                </h2>
                <p style={{
                  fontSize: 15,
                  color: "var(--text-secondary)",
                  lineHeight: 1.75,
                  fontFamily: "var(--font-body)",
                  marginBottom: 16,
                }}>
                  The <strong style={{ color: "var(--text-primary)" }}>Small Business Administration (SBA)</strong> is a U.S. government agency created in 1953 to support, advocate for, and advance the interests of small businesses across the nation.
                </p>
                <p style={{
                  fontSize: 15,
                  color: "var(--text-secondary)",
                  lineHeight: 1.75,
                  fontFamily: "var(--font-body)",
                }}>
                  While the SBA doesn't directly lend money to small businesses, it provides <strong style={{ color: "var(--text-primary)" }}>loan guarantees</strong> to approved lenders (banks, credit unions, CDCs), reducing their risk and making it easier for small businesses to access capital. The SBA also offers counseling, training, and advocacy to help entrepreneurs start, grow, and succeed.
                </p>
              </div>
            </div>

            {/* Loan Programs */}
            <div style={{ marginBottom: 64, animation: "fadeSlideUp 0.7s ease-out 0.25s both" }}>
              <div style={{ marginBottom: 32, textAlign: "center" }}>
                <div style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 16,
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--accent-green)",
                  fontFamily: "var(--font-body)",
                }}>
                  <Package size={14} />
                  Loan Programs
                </div>
                <h2 style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 36,
                  fontWeight: 400,
                  color: "var(--text-primary)",
                  marginBottom: 12,
                }}>
                  SBA Loan Programs
                </h2>
                <p style={{
                  fontSize: 15,
                  color: "var(--text-secondary)",
                  fontFamily: "var(--font-body)",
                }}>
                  The SBA offers several loan programs designed to meet different business needs
                </p>
              </div>

              <div className="grid-3" style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 20,
              }}>
                {loanPrograms.map((program, i) => (
                  <LoanProgramCard key={i} program={program} onClick={handleCardClick} />
                ))}
              </div>
            </div>

            {/* Basic Eligibility Requirements */}
            <div style={{ marginBottom: 64, animation: "fadeSlideUp 0.7s ease-out 0.3s both" }}>
              <div style={{
                padding: 48,
                borderRadius: 24,
                background: "var(--bg-card)",
                backdropFilter: "var(--glass-blur)",
                border: "1px solid var(--border-primary)",
              }}>
                <div style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 24,
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--accent-green)",
                  fontFamily: "var(--font-body)",
                }}>
                  <Shield size={14} />
                  Requirements
                </div>
                <h2 style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 36,
                  fontWeight: 400,
                  color: "var(--text-primary)",
                  marginBottom: 24,
                }}>
                  Basic Eligibility Requirements
                </h2>
                <div className="grid-2">
                  {[
                    "Operate as a for-profit business",
                    "Operate in the U.S. or its territories",
                    "Have invested equity",
                    "Meet SBA size standards",
                    "Demonstrate need for the loan",
                    "Show ability to repay the loan",
                  ].map((req, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 12,
                        padding: 20,
                        borderRadius: 12,
                        background: "var(--bg-secondary)",
                        border: "1px solid var(--border-primary)",
                      }}
                    >
                      <CheckCircle
                        size={20}
                        style={{ color: "var(--accent-green)", flexShrink: 0, marginTop: 2 }}
                      />
                      <span style={{
                        fontSize: 14,
                        color: "var(--text-primary)",
                        fontFamily: "var(--font-body)",
                      }}>
                        {req}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Application Process Overview */}
            <div style={{ marginBottom: 64, animation: "fadeSlideUp 0.7s ease-out 0.35s both" }}>
              <div style={{ marginBottom: 32, textAlign: "center" }}>
                <div style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 16,
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--accent-green)",
                  fontFamily: "var(--font-body)",
                }}>
                  <Target size={14} />
                  Process
                </div>
                <h2 style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 36,
                  fontWeight: 400,
                  color: "var(--text-primary)",
                  marginBottom: 12,
                }}>
                  Application Process Overview
                </h2>
                <p style={{
                  fontSize: 15,
                  color: "var(--text-secondary)",
                  fontFamily: "var(--font-body)",
                }}>
                  A simplified view of the SBA loan application journey
                </p>
              </div>

              <div className="grid-4">
                {[
                  { num: "01", title: "Prepare", desc: "Gather financial documents and business information" },
                  { num: "02", title: "Apply", desc: "Submit application through SBA-approved lender" },
                  { num: "03", title: "Review", desc: "Lender and SBA review your application" },
                  { num: "04", title: "Close", desc: "Finalize loan terms and receive funding" },
                ].map((step, i) => (
                  <div
                    key={i}
                    style={{
                      padding: 28,
                      borderRadius: 16,
                      background: "var(--bg-card)",
                      backdropFilter: "var(--glass-blur)",
                      border: "1px solid var(--border-primary)",
                      textAlign: "center",
                      position: "relative",
                    }}
                  >
                    <div style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 42,
                      fontWeight: 400,
                      color: "var(--accent-gold)",
                      marginBottom: 16,
                      opacity: 0.5,
                    }}>
                      {step.num}
                    </div>
                    <h3 style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 20,
                      fontWeight: 400,
                      color: "var(--text-primary)",
                      marginBottom: 8,
                    }}>
                      {step.title}
                    </h3>
                    <p style={{
                      fontSize: 13,
                      color: "var(--text-secondary)",
                      lineHeight: 1.6,
                      fontFamily: "var(--font-body)",
                    }}>
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* SBA Loan Servicing Actions */}
            <div style={{ marginBottom: 64, animation: "fadeSlideUp 0.7s ease-out 0.4s both" }}>
              <div style={{ marginBottom: 32, textAlign: "center" }}>
                <div style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 16,
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--accent-green)",
                  fontFamily: "var(--font-body)",
                }}>
                  <FileText size={14} />
                  Servicing Actions
                </div>
                <h2 style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 36,
                  fontWeight: 400,
                  color: "var(--text-primary)",
                  marginBottom: 12,
                }}>
                  SBA Loan Servicing Actions
                </h2>
                <p style={{
                  fontSize: 15,
                  color: "var(--text-secondary)",
                  fontFamily: "var(--font-body)",
                }}>
                  Common actions you may need during the life of your SBA loan
                </p>
              </div>

              <div className="grid-3">
                {[
                  {
                    icon: <Scale size={24} />,
                    title: "Subordination",
                    desc: "Request to subordinate SBA lien to allow refinancing",
                  },
                  {
                    icon: <Shield size={24} />,
                    title: "Release of Collateral",
                    desc: "Request to release specific collateral from loan",
                  },
                  {
                    icon: <Users size={24} />,
                    title: "Change in Ownership",
                    desc: "Transfer or assumption of existing SBA loan",
                  },
                  {
                    icon: <FileText size={24} />,
                    title: "Payment Assistance",
                    desc: "Request hardship accommodation for temporary relief",
                  },
                  {
                    icon: <Target size={24} />,
                    title: "Substitution of Collateral",
                    desc: "Replace existing collateral with new assets",
                  },
                  {
                    icon: <Award size={24} />,
                    title: "Release of Guarantor",
                    desc: "Remove personal guarantee obligation",
                  },
                ].map((action, i) => (
                  <div
                    key={i}
                    style={{
                      padding: 32,
                      borderRadius: 16,
                      background: "var(--bg-card)",
                      backdropFilter: "var(--glass-blur)",
                      border: "1px solid var(--border-primary)",
                      transition: "all 0.5s cubic-bezier(0.23,1,0.32,1)",
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
                      width: 56,
                      height: 56,
                      borderRadius: 16,
                      background: "var(--badge-bg)",
                      border: "1px solid var(--badge-border)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--accent-green)",
                      marginBottom: 20,
                    }}>
                      {action.icon}
                    </div>
                    <h3 style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 18,
                      fontWeight: 400,
                      color: "var(--text-primary)",
                      marginBottom: 8,
                    }}>
                      {action.title}
                    </h3>
                    <p style={{
                      fontSize: 13,
                      color: "var(--text-secondary)",
                      lineHeight: 1.7,
                      fontFamily: "var(--font-body)",
                    }}>
                      {action.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional SBA Services */}
            <div style={{ marginBottom: 64, animation: "fadeSlideUp 0.7s ease-out 0.45s both" }}>
              <div style={{
                padding: 48,
                borderRadius: 24,
                background: "var(--bg-card)",
                backdropFilter: "var(--glass-blur)",
                border: "1px solid var(--border-primary)",
              }}>
                <div style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 24,
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--accent-green)",
                  fontFamily: "var(--font-body)",
                }}>
                  <Zap size={14} />
                  Additional Services
                </div>
                <h2 style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 36,
                  fontWeight: 400,
                  color: "var(--text-primary)",
                  marginBottom: 24,
                }}>
                  Additional SBA Services
                </h2>
                <div className="grid-2" style={{ gap: 24 }}>
                  <div>
                    <h3 style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 20,
                      fontWeight: 400,
                      color: "var(--text-primary)",
                      marginBottom: 12,
                    }}>
                      Free Counseling & Training
                    </h3>
                    <p style={{
                      fontSize: 14,
                      color: "var(--text-secondary)",
                      lineHeight: 1.7,
                      fontFamily: "var(--font-body)",
                    }}>
                      Access free business counseling through SCORE, Small Business Development Centers (SBDCs), and Women's Business Centers (WBCs). Get help with business plans, marketing, financial management, and more.
                    </p>
                  </div>
                  <div>
                    <h3 style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 20,
                      fontWeight: 400,
                      color: "var(--text-primary)",
                      marginBottom: 12,
                    }}>
                      Government Contracting
                    </h3>
                    <p style={{
                      fontSize: 14,
                      color: "var(--text-secondary)",
                      lineHeight: 1.7,
                      fontFamily: "var(--font-body)",
                    }}>
                      The SBA helps small businesses compete for and win federal contracts through various programs, including 8(a) Business Development, HUBZone, and Women-Owned Small Business certifications.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Disclaimer Footer */}
            <div style={{
              padding: 40,
              borderRadius: 16,
              background: "var(--bg-tertiary)",
              border: "1px solid var(--border-primary)",
              marginBottom: 64,
              animation: "fadeSlideUp 0.7s ease-out 0.5s both",
            }}>
              <p style={{
                fontSize: 13,
                color: "var(--text-muted)",
                lineHeight: 1.8,
                fontFamily: "var(--font-body)",
                textAlign: "center",
                fontStyle: "italic",
              }}>
                <strong style={{ color: "var(--text-secondary)" }}>Disclaimer:</strong> This guide provides general information about SBA loan programs and is not legal, financial, or tax advice. Requirements and programs are subject to change. Always verify current details with the SBA or an approved lender. SmallBiz Recon™ is not affiliated with the U.S. Small Business Administration.
              </p>
            </div>

            {/* CTA */}
            <div style={{
              padding: 48,
              borderRadius: 24,
              background: isDark
                ? "linear-gradient(135deg, rgba(50,62,38,0.7) 0%, rgba(35,44,28,0.8) 100%)"
                : "linear-gradient(135deg, #3d5a2a 0%, #2d4420 100%)",
              border: "1px solid var(--border-primary)",
              textAlign: "center",
              animation: "fadeSlideUp 0.8s ease-out 0.55s both",
            }}>
              <h2 style={{
                fontFamily: "var(--font-display)",
                fontSize: 28,
                fontWeight: 400,
                color: "#e8ede2",
                marginBottom: 16,
              }}>
                Ready to Explore SBA Options?
              </h2>
              <p style={{
                fontSize: 15,
                color: "rgba(232,237,226,0.6)",
                lineHeight: 1.75,
                maxWidth: 600,
                margin: "0 auto 28px",
              }}>
                This guide gives you the foundation. For templates, checklists, and step-by-step support, explore our advanced toolkits.
              </p>

              <div style={{
                display: "flex",
                gap: 16,
                justifyContent: "center",
                flexWrap: "wrap",
              }}>
                <Link
                  to="/covid-eidl-toolkits"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "14px 32px",
                    background: "linear-gradient(135deg, rgba(200,168,78,0.3), rgba(200,168,78,0.15))",
                    border: "1px solid rgba(200,168,78,0.25)",
                    borderRadius: 12,
                    color: "#c8a84e",
                    fontSize: 15,
                    fontWeight: 600,
                    fontFamily: "var(--font-body)",
                    textDecoration: "none",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <Package size={18} />
                  Get Advanced Toolkits
                </Link>

                <button
                  type="button"
                  onClick={handleDownloadPDF}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "14px 32px",
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: 12,
                    color: "#c8e0b4",
                    fontSize: 15,
                    fontWeight: 600,
                    fontFamily: "var(--font-body)",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.12)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                  }}
                >
                  <Download size={18} />
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal */}
        {selectedLoanProgram && (
          <LoanProgramModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            title={selectedLoanProgram.title}
            description={selectedLoanProgram.details}
          />
        )}
      </div>
    </>
  );
}
