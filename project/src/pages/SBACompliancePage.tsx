import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ShieldCheck, FileText, TriangleAlert as AlertTriangle, Users, Circle as XCircle, ArrowRightLeft, BadgeCheck, BookCopy, CircleCheck as CheckCircle, Download, Phone, ChevronDown, ChevronRight, Sun, Moon, Shield, Award } from "lucide-react";

const THEMES = {
  dark: {
    "--bg-primary": "#181c14",
    "--bg-secondary": "rgba(30, 34, 26, 0.6)",
    "--bg-tertiary": "rgba(38, 44, 32, 0.5)",
    "--bg-card": "rgba(30, 34, 26, 0.6)",
    "--bg-card-hover": "rgba(36, 42, 30, 0.7)",
    "--bg-hero": "linear-gradient(180deg, rgba(50,62,38,0.7) 0%, rgba(24,28,20,0.98) 100%)",
    "--bg-hero-solid": "#232a1c",
    "--border-primary": "rgba(154, 184, 122, 0.15)",
    "--border-hover": "rgba(154, 184, 122, 0.35)",
    "--border-gold": "rgba(200, 168, 78, 0.2)",
    "--text-primary": "#f0f5ea",
    "--text-secondary": "#a5b598",
    "--text-muted": "#6b7863",
    "--accent-green": "#9ab87a",
    "--accent-green-bright": "#c8e0b4",
    "--accent-green-deep": "#4A7836",
    "--accent-gold": "#c8a84e",
    "--accent-gold-dim": "rgba(200,168,78,0.6)",
    "--accent-blue": "#7a9ccc",
    "--accent-red": "#cc6666",
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
    "--cta-bg": "linear-gradient(135deg, rgba(74,120,54,0.3), rgba(154,184,122,0.15))",
    "--cta-border": "rgba(154,184,122,0.25)",
    "--cta-text": "#c8e0b4",
    "--toggle-bg": "rgba(154,184,122,0.1)",
    "--info-bg": "rgba(100,140,200,0.08)",
    "--info-border": "rgba(100,140,200,0.15)",
    "--info-text": "#7a9ccc",
    "--warn-bg": "rgba(200,80,80,0.08)",
    "--warn-border": "rgba(200,80,80,0.15)",
    "--warn-text": "#cc6666",
  },
  light: {
    "--bg-primary": "#f5f3ee",
    "--bg-secondary": "rgba(255, 255, 255, 0.7)",
    "--bg-tertiary": "rgba(245, 243, 238, 0.8)",
    "--bg-card": "rgba(255, 255, 255, 0.75)",
    "--bg-card-hover": "rgba(255, 255, 255, 0.9)",
    "--bg-hero": "linear-gradient(180deg, #3d5a2a 0%, #2a3d1e 100%)",
    "--bg-hero-solid": "#3d5a2a",
    "--border-primary": "rgba(74, 120, 54, 0.15)",
    "--border-hover": "rgba(74, 120, 54, 0.35)",
    "--border-gold": "rgba(180, 140, 40, 0.2)",
    "--text-primary": "#1a2e12",
    "--text-secondary": "#4a5d42",
    "--text-muted": "#7a8b72",
    "--accent-green": "#4A7836",
    "--accent-green-bright": "#3d6a2b",
    "--accent-green-deep": "#2d5420",
    "--accent-gold": "#9a7a28",
    "--accent-gold-dim": "rgba(154,122,40,0.6)",
    "--accent-blue": "#4678AA",
    "--accent-red": "#b84444",
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
    "--cta-bg": "linear-gradient(135deg, #3d6a2b 0%, #4A7836 40%, #5C9A42 100%)",
    "--cta-border": "rgba(74,120,54,0.3)",
    "--cta-text": "#ffffff",
    "--toggle-bg": "rgba(74,120,54,0.08)",
    "--info-bg": "rgba(70,120,170,0.06)",
    "--info-border": "rgba(70,120,170,0.15)",
    "--info-text": "#4678AA",
    "--warn-bg": "rgba(184,68,68,0.06)",
    "--warn-border": "rgba(184,68,68,0.15)",
    "--warn-text": "#b84444",
  },
};

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

function SectionLabel({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
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

export default function SBACompliancePage() {
  const [theme, setTheme] = useState("dark");
  const [activeSection, setActiveSection] = useState<string | null>("understanding");
  const [expandedItems, setExpandedItems] = useState(new Set<string>());
  const navigate = useNavigate();

  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const contentTopRef = useRef<HTMLDivElement | null>(null);

  const isDark = theme === "dark";
  const vars = THEMES[theme];

  const handleBack = () => {
    if (window.history.length > 1) window.history.back();
    else navigate("/home");
  };

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
    setTimeout(() => {
      if (activeSection !== section) {
        contentTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  const toggleExpanded = (item: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(item)) {
      newExpanded.delete(item);
    } else {
      newExpanded.add(item);
    }
    setExpandedItems(newExpanded);
  };

  const sections = [
    {
      id: 'understanding',
      title: 'Loan Agreement (LA&A)',
      icon: <FileText size={20} />,
      content: {
        main: "Your Loan Authorization and Agreement (LA&A) is a binding contract. Failure to comply with its terms, even if payments are current, is a non-monetary default that can trigger severe collection actions.",
        key_points: [
          "COVID EIDL loans are not forgivable and require full repayment.",
          "Non-compliance with any term can put your personal assets at risk.",
          "Always keep a copy of your LA&A for reference."
        ],
        action: "You can download your LA&A from the MySBA Loan Portal."
      }
    },
    {
      id: 'default',
      title: 'Non-Monetary Default',
      icon: <AlertTriangle size={20} />,
      content: {
        main: "A non-monetary default is a violation of your loan terms other than missing a payment. Ignoring SBA requests for information can also be considered a default.",
        examples: [
          "Selling SBA-secured assets without written permission.",
          "Changing business ownership or structure without SBA approval.",
          "Allowing required insurance coverage to lapse."
        ],
        consequences: [
          "The entire loan balance can be declared immediately due.",
          "Referral to the U.S. Treasury for collection actions (TOP).",
          "Loss of access to loan servicing options."
        ]
      }
    },
    {
      id: 'collateral',
      title: 'Collateral & Asset Sales',
      icon: <ShieldCheck size={20} />,
      content: {
        main: "For loans over $25,000, the SBA placed a UCC-1 lien on your business assets. You cannot sell, transfer, or dispose of this collateral without prior written consent from the SBA.",
        covered_assets: [
          "Equipment",
          "Inventory",
          "Fixtures",
          "VIN-tagged vehicles if listed as business assets."
        ],
        action: "Contact your loan specialist or check your state's UCC filing records to confirm which assets are covered."
      }
    },
    {
      id: 'compliance',
      title: 'Post-Compliance Review',
      icon: <BadgeCheck size={20} />,
      content: {
        main: "The SBA may initiate a Post-Compliance Review to verify your business is adhering to the LA&A, often triggered by a servicing request or a public record flag.",
        requests: [
          "Financial Statements (P&L, Balance Sheets)",
          "Business Tax Returns",
          "Proof of Hazard Insurance",
          "Asset and dissolution records"
        ],
        warning: "Failure to respond to an information request by the SBA's deadline can result in your loan being declared in default."
      }
    },
    {
      id: 'consideration',
      title: 'Servicing & "Consideration"',
      icon: <ArrowRightLeft size={20} />,
      content: {
        main: "When you request a 'servicing action' (e.g., changing loan terms or releasing collateral), the SBA often requires 'consideration' in return to protect its interests.",
        common_types: [
          "A partial paydown of the loan balance.",
          "Pledging new, additional collateral.",
          "Adding a new personal guarantor."
        ],
        when_required: [
          "Requesting a release of collateral.",
          "Requesting an ownership change or loan assumption."
        ]
      }
    },
    {
      id: 'guarantor',
      title: 'Personal Guarantors',
      icon: <Users size={20} />,
      content: {
        main: "For loans over $200,000, owners with 20% or more interest were required to provide an unlimited personal guarantee.",
        liability: [
          "You are personally liable for the full loan amount.",
          "The SBA can use the Treasury Offset Program (TOP) to intercept tax refunds.",
          "Your wages may be garnished and personal assets may have liens placed on them.",
          "Leaving the business does not automatically remove your guarantee."
        ]
      }
    },
    {
      id: 'misuse',
      title: 'Improper Use of Funds',
      icon: <XCircle size={20} />,
      content: {
        main: "EIDL funds must be used for working capital and normal operating expenses. Misuse carries severe penalties.",
        proper_uses: [
          "Payroll",
          "Rent or mortgage payments",
          "Utilities",
          "Fixed debt payments"
        ],
        misuse_examples: [
          "Paying for personal expenses (vacations, home renovations).",
          "Expanding the business or acquiring new assets.",
          "Investing in unrelated businesses."
        ],
        penalty: "Penalties can include civil fines of 1.5 times the misapplied amount and, in cases of fraud, criminal charges."
      }
    },
    {
      id: 'records',
      title: 'Record Keeping',
      icon: <BookCopy size={20} />,
      content: {
        main: "Maintaining organized records is your best defense in a compliance review or audit.",
        records_to_keep: [
          "Your Loan Authorization & Agreement (LA&A) and all UCC filings.",
          "All correspondence with the SBA.",
          "Tax returns and proof of insurance for the life of the loan.",
          "Receipts and bank statements showing the proper use of all loan funds."
        ],
        recommendation: "Digitize your records and keep secure backups. Retain proof of how funds were used for at least seven years."
      }
    }
  ];

  const checklist = [
    { item: "Selling business equipment", contact: true },
    { item: "Changing ownership", contact: true },
    { item: "Closing the business", contact: true },
    { item: "SBA requests documents", contact: true },
    { item: "Unsure about lien status", contact: true },
    { item: "Need payment assistance", contact: true }
  ];

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

        .compliance-page {
          min-height:100vh;
          font-family: var(--font-body);
          background: var(--bg-primary);
          color: var(--text-primary);
          overflow-x: hidden;
          position: relative;
          transition: background 0.5s ease, color 0.4s ease;
        }
        .compliance-page::before {
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

        .section-nav-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }

        @media (max-width: 1024px) {
          .section-nav-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .section-nav-grid { grid-template-columns: 1fr !important; }
          .hero-title { font-size: 32px !important; }
          .hero-inner { padding: 40px 20px 56px !important; }
          .content-padding { padding: 32px 20px !important; }
        }
      `}</style>

      <div className="compliance-page">
        <GridOverlay />
        <Particles />

        <div style={{ position: "relative", zIndex: 1 }}>

          {/* HERO */}
          <div style={{
            position: "relative", overflow: "hidden",
            background: "var(--bg-hero)",
            borderBottom: "1px solid var(--border-primary)",
            animation: "fadeSlideUp 0.7s ease-out both",
          }}>
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
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                marginBottom: 56, flexWrap: "wrap", gap: 16,
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

              <div style={{
                width: 68, height: 68, borderRadius: 20,
                background: "linear-gradient(135deg, rgba(200,168,78,0.2), rgba(200,168,78,0.08))",
                border: "1px solid rgba(200,168,78,0.25)",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 28px",
              }}>
                <ShieldCheck size={30} color="#c8a84e" strokeWidth={1.5} />
              </div>

              <h1 className="hero-title" style={{
                fontFamily: "var(--font-display)", fontSize: 50, fontWeight: 400,
                textAlign: "center", color: "#e8ede2", lineHeight: 1.12,
                letterSpacing: "-0.02em", marginBottom: 20,
              }}>
                SmallBiz Recon™{" "}
                <span style={{ fontStyle: "italic", color: "#c8a84e" }}>COVID EIDL</span>
              </h1>

              <p style={{
                textAlign: "center", fontSize: 18, color: "rgba(232,237,226,0.8)",
                lineHeight: 1.5, maxWidth: 700, margin: "0 auto 10px",
                fontWeight: 500,
              }}>
                Compliance & Violation Survival Guide
              </p>

              <p style={{
                textAlign: "center", fontSize: 13, color: "rgba(232,237,226,0.55)",
                lineHeight: 1.75, maxWidth: 600, margin: "0 auto",
              }}>
                Last Updated: January 30, 2026 | Source: SBA SOP 50 52 2
              </p>
            </div>
          </div>

          {/* CONTENT */}
          <div ref={contentTopRef} className="content-padding" style={{ maxWidth: 1200, margin: "0 auto", padding: "56px 24px 80px" }}>

            {/* Download PDF Button */}
            <div style={{
              marginBottom: 48,
              animation: "fadeSlideUp 0.7s ease-out 0.1s both"
            }}>
              <div style={{
                position: "relative", overflow: "hidden", borderRadius: 20,
                padding: "32px", textAlign: "center",
                background: "var(--bg-card)",
                backdropFilter: "var(--glass-blur)", WebkitBackdropFilter: "var(--glass-blur)",
                border: "1px solid var(--border-primary)",
              }}>
                <div style={{
                  position: "absolute", top: -50, right: -50, width: 140, height: 140, borderRadius: "50%",
                  background: "radial-gradient(circle, var(--overlay-green) 0%, transparent 70%)",
                  pointerEvents: "none",
                }} />

                <h3 style={{
                  fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 400,
                  color: "var(--text-primary)", marginBottom: 10, position: "relative", zIndex: 1,
                }}>
                  Download Premium PDF Guide
                </h3>
                <p style={{
                  fontSize: 14, color: "var(--text-secondary)", marginBottom: 20,
                  position: "relative", zIndex: 1,
                }}>
                  Get a comprehensive PDF version for offline reference
                </p>
                <a
                  href="https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/public/SMALLBIZRECON-FREEPUBLIC/SmallBiz%20Recon%20Premium%20Compliance%20-%20Violation%20Survival%20Guide%20(2026).pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    padding: "14px 32px", textDecoration: "none",
                    background: "var(--cta-bg)", border: `1px solid var(--cta-border)`,
                    borderRadius: 12, color: "var(--cta-text)", fontSize: 14, fontWeight: 600,
                    fontFamily: "var(--font-body)",
                    transition: "all 0.35s cubic-bezier(0.23,1,0.32,1)",
                    boxShadow: "0 2px 12px rgba(74,120,54,0.15)",
                    position: "relative", zIndex: 1,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 8px 28px rgba(74,120,54,0.25)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 2px 12px rgba(74,120,54,0.15)";
                  }}
                >
                  <Download size={16} />
                  Download PDF Guide
                </a>
              </div>
            </div>

            {/* Section Navigation */}
            <div style={{ marginBottom: 40, animation: "fadeSlideUp 0.7s ease-out 0.15s both" }}>
              <div style={{ marginBottom: 24 }}>
                <SectionLabel icon={<Shield size={14} />}>
                  Key Topics
                </SectionLabel>
              </div>

              <div className="section-nav-grid">
                {sections.map((section, index) => (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => toggleSection(section.id)}
                    style={{
                      position: "relative", overflow: "hidden",
                      background: activeSection === section.id ? "var(--bg-card-hover)" : "var(--bg-card)",
                      backdropFilter: "var(--glass-blur)", WebkitBackdropFilter: "var(--glass-blur)",
                      border: `1px solid ${activeSection === section.id ? "var(--border-hover)" : "var(--border-primary)"}`,
                      borderRadius: 12, padding: "16px", textAlign: "left",
                      display: "flex", alignItems: "center", gap: 12,
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      animation: `cardReveal 0.5s ease-out ${0.1 + index * 0.05}s both`,
                    }}
                    onMouseEnter={(e) => {
                      if (activeSection !== section.id) {
                        e.currentTarget.style.borderColor = "var(--border-hover)";
                        e.currentTarget.style.transform = "translateY(-2px)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (activeSection !== section.id) {
                        e.currentTarget.style.borderColor = "var(--border-primary)";
                        e.currentTarget.style.transform = "translateY(0)";
                      }
                    }}
                  >
                    <div style={{
                      width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                      background: activeSection === section.id ? "var(--badge-bg)" : "var(--bg-tertiary)",
                      border: `1px solid ${activeSection === section.id ? "var(--badge-border)" : "var(--border-primary)"}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: activeSection === section.id ? "var(--accent-green)" : "var(--text-secondary)",
                    }}>
                      {section.icon}
                    </div>
                    <span style={{
                      fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 600,
                      color: activeSection === section.id ? "var(--text-primary)" : "var(--text-secondary)",
                    }}>
                      {section.title}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Content Display */}
            {activeSection && sections.map((section) => {
              if (section.id !== activeSection) return null;

              return (
                <div key={section.id} style={{
                  marginBottom: 48,
                  animation: "cardReveal 0.5s ease-out both"
                }}>
                  <div style={{
                    position: "relative", overflow: "hidden", borderRadius: 20,
                    padding: "40px 36px",
                    background: "var(--bg-card)",
                    backdropFilter: "var(--glass-blur)", WebkitBackdropFilter: "var(--glass-blur)",
                    border: "1px solid var(--border-primary)",
                    boxShadow: "var(--shadow-card)",
                  }}>
                    <div style={{
                      position: "absolute", top: -50, right: -50, width: 140, height: 140, borderRadius: "50%",
                      background: "radial-gradient(circle, var(--overlay-green) 0%, transparent 70%)",
                      pointerEvents: "none",
                    }} />

                    <div style={{
                      display: "flex", alignItems: "center", gap: 12, marginBottom: 24,
                      paddingBottom: 20, borderBottom: "1px solid var(--border-primary)",
                      position: "relative", zIndex: 1,
                    }}>
                      <div style={{
                        width: 44, height: 44, borderRadius: 12,
                        background: "var(--badge-bg)", border: `1px solid var(--badge-border)`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: "var(--accent-green)",
                      }}>
                        {section.icon}
                      </div>
                      <h2 style={{
                        fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 400,
                        color: "var(--text-primary)", letterSpacing: "-0.01em",
                      }}>
                        {section.title}
                      </h2>
                    </div>

                    <div style={{ position: "relative", zIndex: 1 }}>
                      <div style={{
                        padding: 16, borderRadius: 12,
                        background: "var(--info-bg)",
                        border: "1px solid var(--info-border)",
                        marginBottom: 20,
                      }}>
                        <p style={{
                          fontSize: 15, color: "var(--text-primary)", lineHeight: 1.7,
                          fontFamily: "var(--font-body)",
                        }}>
                          {section.content.main}
                        </p>
                      </div>

                      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                        {Object.entries(section.content).map(([key, value]) => {
                          if (key === 'main') return null;

                          if (Array.isArray(value)) {
                            return (
                              <div key={key}>
                                <button
                                  type="button"
                                  onClick={() => toggleExpanded(`${section.id}-${key}`)}
                                  style={{
                                    width: "100%", display: "flex", justifyContent: "space-between",
                                    alignItems: "center", padding: "12px 16px", borderRadius: 10,
                                    background: "var(--bg-tertiary)",
                                    border: "1px solid var(--border-primary)",
                                    cursor: "pointer",
                                    transition: "all 0.3s ease",
                                  }}
                                  onMouseEnter={(e) => e.currentTarget.style.borderColor = "var(--border-hover)"}
                                  onMouseLeave={(e) => e.currentTarget.style.borderColor = "var(--border-primary)"}
                                >
                                  <span style={{
                                    fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 600,
                                    color: "var(--text-primary)", textTransform: "capitalize",
                                  }}>
                                    {key.replace(/_/g, ' ')}
                                  </span>
                                  {expandedItems.has(`${section.id}-${key}`) ?
                                    <ChevronDown size={16} color="var(--text-secondary)" /> :
                                    <ChevronRight size={16} color="var(--text-secondary)" />
                                  }
                                </button>

                                {expandedItems.has(`${section.id}-${key}`) && (
                                  <div style={{
                                    marginTop: 8, padding: "14px 18px", borderRadius: 10,
                                    background: "var(--bg-secondary)",
                                    border: "1px solid var(--border-primary)",
                                    borderLeft: "3px solid var(--accent-green)",
                                  }}>
                                    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                                      {value.map((item, idx) => (
                                        <li key={idx} style={{
                                          display: "flex", alignItems: "start", gap: 10,
                                          marginBottom: idx < value.length - 1 ? 10 : 0,
                                        }}>
                                          <div style={{
                                            width: 6, height: 6, borderRadius: "50%",
                                            background: "var(--accent-green)", marginTop: 6, flexShrink: 0,
                                          }} />
                                          <span style={{
                                            fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6,
                                            fontFamily: "var(--font-body)",
                                          }}>
                                            {item}
                                          </span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </div>
                            );
                          } else if (typeof value === 'string') {
                            return (
                              <div key={key} style={{
                                padding: 14, borderRadius: 10,
                                background: "var(--warn-bg)",
                                border: "1px solid var(--warn-border)",
                              }}>
                                <h4 style={{
                                  fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 700,
                                  color: "var(--accent-gold)", textTransform: "uppercase",
                                  letterSpacing: "0.1em", marginBottom: 6,
                                }}>
                                  {key.replace(/_/g, ' ')}
                                </h4>
                                <p style={{
                                  fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6,
                                  fontFamily: "var(--font-body)",
                                }}>
                                  {value}
                                </p>
                              </div>
                            );
                          }
                          return null;
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Checklist */}
            <div style={{ marginBottom: 48, animation: "fadeSlideUp 0.7s ease-out 0.3s both" }}>
              <div style={{ marginBottom: 24 }}>
                <SectionLabel icon={<CheckCircle size={14} />}>
                  When to Contact
                </SectionLabel>
                <h2 style={{
                  fontFamily: "var(--font-display)", fontSize: 30, fontWeight: 400,
                  color: "var(--text-primary)", marginTop: 10,
                }}>
                  When to Contact the SBA
                </h2>
              </div>

              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: 12,
              }}>
                {checklist.map((item, idx) => (
                  <div key={idx} style={{
                    padding: "16px 20px", borderRadius: 12,
                    background: "var(--bg-card)",
                    backdropFilter: "var(--glass-blur)", WebkitBackdropFilter: "var(--glass-blur)",
                    border: "1px solid var(--border-primary)",
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    gap: 12,
                    transition: "all 0.3s ease",
                  }}>
                    <span style={{
                      fontSize: 14, color: "var(--text-primary)", fontWeight: 500,
                      fontFamily: "var(--font-body)",
                    }}>
                      {item.item}
                    </span>
                    {item.contact && (
                      <div style={{
                        display: "flex", alignItems: "center", gap: 6,
                        padding: "4px 10px", borderRadius: 8,
                        background: "rgba(74,180,74,0.1)",
                        border: "1px solid rgba(74,180,74,0.2)",
                        whiteSpace: "nowrap",
                      }}>
                        <Phone size={12} color="#4aba4a" />
                        <span style={{
                          fontSize: 11, fontWeight: 700, color: "#4aba4a",
                          fontFamily: "var(--font-body)",
                        }}>
                          CONTACT FIRST
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Key Resources */}
            <div style={{ animation: "fadeSlideUp 0.7s ease-out 0.4s both" }}>
              <div style={{
                position: "relative", overflow: "hidden", borderRadius: 20,
                padding: "36px",
                background: isDark
                  ? "linear-gradient(135deg, rgba(50,62,38,0.7) 0%, rgba(35,44,28,0.8) 100%)"
                  : "linear-gradient(135deg, #3d5a2a 0%, #2d4420 100%)",
                border: "1px solid var(--border-primary)",
                backdropFilter: "var(--glass-blur)",
              }}>
                <div style={{
                  position: "absolute", top: -60, right: -60, width: 200, height: 200,
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(200,168,78,0.08) 0%, transparent 70%)",
                  pointerEvents: "none",
                }} />

                <h3 style={{
                  fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 400,
                  color: "#e8ede2", marginBottom: 24, position: "relative", zIndex: 1,
                }}>
                  Key Resources
                </h3>

                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                  gap: 20,
                  marginBottom: 24,
                  position: "relative", zIndex: 1,
                }}>
                  <div>
                    <p style={{
                      fontSize: 13, fontWeight: 600, color: "#c8a84e",
                      marginBottom: 6, fontFamily: "var(--font-body)",
                    }}>
                      Loan Servicing & Payment Assistance:
                    </p>
                    <p style={{
                      fontSize: 15, color: "rgba(232,237,226,0.8)",
                      fontFamily: "var(--font-body)",
                    }}>
                      CovidEIDLServicing@sba.gov
                    </p>
                  </div>
                  <div>
                    <p style={{
                      fontSize: 13, fontWeight: 600, color: "#c8a84e",
                      marginBottom: 6, fontFamily: "var(--font-body)",
                    }}>
                      MySBA Loan Portal:
                    </p>
                    <p style={{
                      fontSize: 15, color: "rgba(232,237,226,0.8)",
                      fontFamily: "var(--font-body)",
                    }}>
                      lending.sba.gov
                    </p>
                  </div>
                </div>

                <div style={{
                  padding: 20, borderRadius: 12,
                  background: "rgba(200,80,80,0.12)",
                  border: "1px solid rgba(200,80,80,0.25)",
                  position: "relative", zIndex: 1,
                }}>
                  <div style={{
                    display: "flex", alignItems: "center", gap: 8, marginBottom: 10,
                  }}>
                    <AlertTriangle size={18} color="#cc6666" />
                    <h4 style={{
                      fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 700,
                      color: "#cc6666",
                    }}>
                      Scam & Fraud Warning
                    </h4>
                  </div>
                  <p style={{
                    fontSize: 14, color: "rgba(232,237,226,0.8)", lineHeight: 1.6,
                    fontFamily: "var(--font-body)",
                  }}>
                    The SBA does not use third-party negotiators and COVID EIDL loans are not forgivable. Be wary of anyone claiming otherwise. Report fraud to the SBA OIG.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
