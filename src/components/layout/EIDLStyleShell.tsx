import { useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Sun, Moon } from "lucide-react";

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
          width: `${1.5 + Math.random() * 2.5}px`,
          height: `${1.5 + Math.random() * 2.5}px`,
          borderRadius: "50%",
          background: `rgba(154, 184, 122, var(--particle-opacity))`,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animation: `pFloat ${9 + Math.random() * 14}s ease-in-out infinite`,
          animationDelay: `${Math.random() * -12}s`,
        }} />
      ))}
    </div>
  );
}

interface EIDLStyleShellProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  children: ReactNode;
  maxWidth?: number;
}

export default function EIDLStyleShell({ title, subtitle, icon, children, maxWidth = 1200 }: EIDLStyleShellProps) {
  const [theme, setTheme] = useState("dark");
  const navigate = useNavigate();
  const isDark = theme === "dark";
  const vars = THEMES[theme];

  const handleBack = () => {
    if (window.history.length > 1) window.history.back();
    else navigate("/home");
  };

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
          background: rgba(154,184,122,0.1);
          border: 1px solid var(--border-primary);
          color: var(--text-secondary); font-size:13px; font-weight:600;
          cursor:pointer; font-family:var(--font-body);
          transition: all 0.3s ease;
        }
        .theme-toggle:hover {
          border-color: var(--border-hover);
          color: var(--text-primary);
        }

        @media (max-width: 768px) {
          .hero-title { font-size: 32px !important; }
          .hero-inner { padding: 40px 20px 56px !important; }
        }
      `}</style>

      <div className="eidl-page">
        <GridOverlay />
        <Particles />

        <div style={{ position: "relative", zIndex: 1 }}>
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
              maxWidth,
              margin: "0 auto",
              padding: "48px 32px 72px",
              position: "relative",
              zIndex: 1,
            }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 56,
              }}>
                <button
                  type="button"
                  className="back-link"
                  onClick={handleBack}
                  aria-label="Go back"
                  style={{ color: isDark ? "#c8e0b4" : "#ffffff" }}
                  onMouseEnter={(e) => e.currentTarget.style.color = "#e8ede2"}
                  onMouseLeave={(e) => e.currentTarget.style.color = isDark ? "#c8e0b4" : "#ffffff"}
                >
                  <ArrowLeft size={16} />
                  Back
                </button>
                <button
                  type="button"
                  className="theme-toggle"
                  onClick={() => setTheme(isDark ? "light" : "dark")}
                  aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
                  style={{
                    background: isDark ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.15)",
                    borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.2)",
                    color: isDark ? "#c8e0b4" : "#ffffff"
                  }}
                >
                  {isDark ? <Sun size={14} /> : <Moon size={14} />}
                  {isDark ? "Light" : "Dark"}
                </button>
              </div>

              {icon && (
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
                  {icon}
                </div>
              )}

              <h1 className="hero-title" style={{
                fontFamily: "var(--font-display)",
                fontSize: 50,
                fontWeight: 400,
                textAlign: "center",
                color: isDark ? "#e8ede2" : "#ffffff",
                lineHeight: 1.12,
                letterSpacing: "-0.02em",
                marginBottom: subtitle ? 20 : 0,
              }}>
                {title}
              </h1>

              {subtitle && (
                <p style={{
                  textAlign: "center",
                  fontSize: 16,
                  color: isDark ? "rgba(232,237,226,0.6)" : "rgba(255,255,255,0.8)",
                  lineHeight: 1.75,
                  maxWidth: 600,
                  margin: "0 auto",
                }}>
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          <div style={{
            maxWidth,
            margin: "0 auto",
            padding: "56px 24px 80px",
          }}>
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
