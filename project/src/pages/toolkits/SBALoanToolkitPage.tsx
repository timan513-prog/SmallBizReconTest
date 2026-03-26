import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen, CircleCheck as CheckCircle, ChevronRight, Key, Sun, Moon, CircleAlert as AlertCircle, FileText, ClipboardList, Download, LayoutGrid as Layout, FolderOpen, Sparkles, Shield, Users, Award } from "lucide-react";
import { validateAccessCode, getAccessRoute, TOOLKIT_TYPES } from "../../utils/codeValidation";

type Variant = "7a" | "504";

interface VariantConfig {
  title: string;
  titleAccent: string;
  subtitle: string;
  toolkitType: string;
  checkoutUrl: string;
  includes: string[];
  backRoute: string;
  features: { icon: React.ReactNode; title: string; desc: string }[];
}

const VARIANT_CONFIG: Record<Variant, VariantConfig> = {
  "7a": {
    title: "SBA 7(a)",
    titleAccent: "Loan Toolkit",
    subtitle: "Comprehensive informational package with tips, advice, and step-by-step guidance on how to apply for an SBA 7(a) loan -- what the applicant needs to do and what should be in the packet for approval.",
    toolkitType: TOOLKIT_TYPES.SBA_7A,
    checkoutUrl: "",
    backRoute: "/covid-eidl-toolkits",
    includes: [
      "Interactive application guide",
      "Premium PDF guide",
      "Printable PDF companion",
      "Application checklist",
      "Required forms library",
      "Professional templates",
    ],
    features: [
      { icon: <Layout size={24} />, title: "Interactive Guide", desc: "Step-by-step walkthrough of the 7(a) loan application process with clickable navigation" },
      { icon: <Shield size={24} />, title: "Eligibility Check", desc: "Understand if your business qualifies and what lenders look for in 7(a) applications" },
      { icon: <Users size={24} />, title: "Expert-Created", desc: "Developed by professionals with deep knowledge of SBA lending requirements" },
    ],
  },
  "504": {
    title: "SBA 504",
    titleAccent: "Loan Toolkit",
    subtitle: "Comprehensive informational package with tips, advice, and step-by-step guidance on how to apply for an SBA 504 loan -- what the applicant needs to do and what should be in the packet for approval.",
    toolkitType: TOOLKIT_TYPES.SBA_504,
    checkoutUrl: "",
    backRoute: "/covid-eidl-toolkits",
    includes: [
      "Interactive application guide",
      "Premium PDF guide",
      "Printable PDF companion",
      "Application checklist",
      "Required forms library",
      "Professional templates",
    ],
    features: [
      { icon: <Layout size={24} />, title: "Interactive Guide", desc: "Step-by-step walkthrough of the 504 loan application process with clickable navigation" },
      { icon: <Shield size={24} />, title: "Eligibility Check", desc: "Understand if your business qualifies and what CDCs look for in 504 applications" },
      { icon: <Users size={24} />, title: "Expert-Created", desc: "Developed by professionals with deep knowledge of SBA lending requirements" },
    ],
  },
};

const THEMES = {
  dark: {
    "--bg-primary": "#181c14",
    "--bg-secondary": "rgba(30, 34, 26, 0.6)",
    "--bg-tertiary": "rgba(38, 44, 32, 0.5)",
    "--bg-card": "rgba(30, 34, 26, 0.6)",
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
  },
  light: {
    "--bg-primary": "#f5f3ee",
    "--bg-secondary": "rgba(255, 255, 255, 0.7)",
    "--bg-tertiary": "rgba(245, 243, 238, 0.8)",
    "--bg-card": "rgba(255, 255, 255, 0.75)",
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
  },
};

function GridOverlay() {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0, opacity: "var(--grid-opacity)" }}>
      <svg width="100%" height="100%">
        <defs>
          <pattern id="sbaGrid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="var(--accent-green)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#sbaGrid)" />
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
          animation: `sbaFloat ${9 + Math.random() * 14}s ease-in-out infinite`,
          animationDelay: `${Math.random() * -12}s`,
        }} />
      ))}
    </div>
  );
}

function FeatureCard({ icon, title, description, delay }: { icon: React.ReactNode; title: string; description: string; delay: number }) {
  return (
    <div style={{
      textAlign: "center", padding: "32px 24px", borderRadius: 18,
      background: "var(--bg-card)", backdropFilter: "var(--glass-blur)",
      border: "1px solid var(--border-primary)",
      transition: "all 0.5s cubic-bezier(0.23,1,0.32,1)",
      animation: `sbaCardReveal 0.6s ease-out ${delay}s both`,
    }}
    onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.borderColor = "var(--border-hover)"; e.currentTarget.style.boxShadow = "var(--shadow-card-hover)"; }}
    onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "var(--border-primary)"; e.currentTarget.style.boxShadow = "none"; }}
    >
      <div style={{
        width: 56, height: 56, borderRadius: 16, margin: "0 auto 16px",
        background: "var(--badge-bg)", border: "1px solid var(--badge-border)",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "var(--accent-green)",
      }}>
        {icon}
      </div>
      <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 400, color: "var(--text-primary)", marginBottom: 8 }}>{title}</h3>
      <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.7, fontFamily: "var(--font-body)" }}>{description}</p>
    </div>
  );
}

export default function SBALoanToolkitPage({ variant }: { variant: Variant }) {
  const [theme, setTheme] = useState("dark");
  const [accessCode, setAccessCode] = useState("");
  const [accessError, setAccessError] = useState("");
  const [accessValidated, setAccessValidated] = useState(false);
  const [accessLoading, setAccessLoading] = useState(false);
  const [cardHovered, setCardHovered] = useState(false);
  const navigate = useNavigate();

  const config = VARIANT_CONFIG[variant];
  const isDark = theme === "dark";
  const vars = THEMES[theme];
  const cssVarString = Object.entries(vars).map(([k, v]) => `${k}: ${v};`).join("\n");

  const handleBack = () => {
    if (window.history.length > 1) window.history.back();
    else window.location.href = config.backRoute;
  };

  const handleValidateCode = async () => {
    if (!accessCode.trim()) { setAccessError("Please enter an access code"); return; }
    setAccessLoading(true);
    setAccessError("");
    await new Promise(resolve => setTimeout(resolve, 600));
    const isValid = validateAccessCode(accessCode, config.toolkitType);
    if (isValid) { setAccessValidated(true); } else { setAccessError("Invalid access code. Please check your code and try again."); }
    setAccessLoading(false);
  };

  const handleAccessToolkit = () => {
    const route = getAccessRoute(config.toolkitType);
    navigate(route);
  };

  return (
    <>
      <style>{`
        :root { --font-display: 'Instrument Serif', Georgia, serif; --font-body: 'DM Sans', sans-serif; ${cssVarString} }
        @keyframes sbaFloat { 0%, 100% { transform: translate(0,0) scale(1); opacity:0.3; } 25% { transform: translate(12px,-18px) scale(1.15); opacity:0.6; } 50% { transform: translate(-8px,-30px) scale(0.85); opacity:0.2; } 75% { transform: translate(16px,-12px) scale(1.08); opacity:0.5; } }
        @keyframes sbaFadeSlideUp { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
        @keyframes sbaCardReveal { from { opacity:0; transform:translateY(30px) scale(0.97); } to { opacity:1; transform:translateY(0) scale(1); } }
        @keyframes sbaHeroGlow { 0%,100% { opacity:0.4; } 50% { opacity:0.7; } }
        @keyframes sbaModalIn { from { opacity:0; transform: scale(0.95) translateY(12px); } to { opacity:1; transform: scale(1) translateY(0); } }
        @keyframes sbaOverlayIn { from { opacity:0; } to { opacity:1; } }
        * { box-sizing:border-box; margin:0; padding:0; }
        .sba-tk-page { min-height:100vh; font-family: var(--font-body); background: var(--bg-primary); color: var(--text-primary); overflow-x: hidden; position: relative; transition: background 0.5s ease, color 0.4s ease; }
        .sba-tk-page::before { content:''; position:fixed; inset:0; background: radial-gradient(ellipse 70% 50% at 30% 0%, var(--overlay-green), transparent), radial-gradient(ellipse 50% 40% at 70% 100%, var(--overlay-gold), transparent); pointer-events:none; z-index:0; }
        .sba-features-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        @media (max-width: 1024px) { .sba-features-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 768px) { .sba-features-grid { grid-template-columns: 1fr !important; } .sba-hero-title { font-size: 32px !important; } .sba-hero-inner { padding: 40px 20px 56px !important; } }
        .sba-modal-overlay { position:fixed; inset:0; z-index:1000; background: rgba(0,0,0,0.6); backdrop-filter: blur(8px); display:flex; align-items:center; justify-content:center; padding: 20px; animation: sbaOverlayIn 0.25s ease both; }
        .sba-modal-box { background: var(--bg-primary); border: 1px solid var(--border-primary); border-radius: 24px; padding: 40px; max-width: 440px; width: 100%; position: relative; animation: sbaModalIn 0.35s ease both; box-shadow: 0 32px 80px rgba(0,0,0,0.4); }
        .sba-modal-input { width:100%; padding: 14px 18px; background: var(--bg-tertiary); border: 1px solid var(--border-primary); border-radius: 12px; color: var(--text-primary); font-family: var(--font-body); font-size: 15px; outline: none; transition: border-color 0.3s ease; }
        .sba-modal-input:focus { border-color: var(--accent-green); }
        .sba-modal-input::placeholder { color: var(--text-muted); }
      `}</style>

      <div className="sba-tk-page" style={{ paddingTop: "64px" }}>
        <GridOverlay />
        <Particles />
        <div style={{ position: "relative", zIndex: 1 }}>

          {/* HERO */}
          <div style={{ position: "relative", overflow: "hidden", background: "var(--bg-hero)", borderBottom: "1px solid var(--border-primary)", animation: "sbaFadeSlideUp 0.7s ease-out both", marginTop: "-64px", paddingTop: "64px" }}>
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle, rgba(74,120,54,0.12) 0%, transparent 65%)", pointerEvents: "none", animation: "sbaHeroGlow 6s ease-in-out infinite" }} />
            <div className="sba-hero-inner" style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 32px 72px", position: "relative", zIndex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 56 }}>
                <button type="button" onClick={handleBack} style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#c8e0b4", fontSize: 14, fontWeight: 600, background: "none", border: "none", cursor: "pointer", padding: "8px 0", fontFamily: "var(--font-body)", transition: "all 0.3s ease" }} onMouseEnter={e => e.currentTarget.style.color = "#e8ede2"} onMouseLeave={e => e.currentTarget.style.color = "#c8e0b4"}>
                  <ArrowLeft size={16} /> Back to Last
                </button>
                <button type="button" onClick={() => setTheme(isDark ? "light" : "dark")} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 12, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)", color: "#c8e0b4", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "var(--font-body)", transition: "all 0.3s ease" }}>
                  {isDark ? <Sun size={14} /> : <Moon size={14} />} {isDark ? "Light" : "Dark"}
                </button>
              </div>
              <div style={{ width: 68, height: 68, borderRadius: 20, background: "linear-gradient(135deg, rgba(200,168,78,0.2), rgba(200,168,78,0.08))", border: "1px solid rgba(200,168,78,0.25)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 28px" }}>
                <BookOpen size={30} color="#c8a84e" strokeWidth={1.5} />
              </div>
              <h1 className="sba-hero-title" style={{ fontFamily: "var(--font-display)", fontSize: 50, fontWeight: 400, textAlign: "center", color: "#e8ede2", lineHeight: 1.12, letterSpacing: "-0.02em", marginBottom: 20 }}>
                {config.title}{" "}<span style={{ fontStyle: "italic", color: "#c8a84e" }}>{config.titleAccent}</span>
              </h1>
              <p style={{ textAlign: "center", fontSize: 16, color: "rgba(232,237,226,0.6)", lineHeight: 1.75, maxWidth: 600, margin: "0 auto" }}>{config.subtitle}</p>
            </div>
          </div>

          {/* CONTENT */}
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "56px 24px 80px" }}>

            {/* TOOLKIT CARD */}
            <div style={{ maxWidth: 520, margin: "0 auto 56px", animation: "sbaCardReveal 0.7s ease-out 0.15s both" }}>
              <div
                onMouseEnter={() => setCardHovered(true)}
                onMouseLeave={() => setCardHovered(false)}
                style={{
                  position: "relative", overflow: "hidden",
                  background: "var(--bg-card)", backdropFilter: "var(--glass-blur)", WebkitBackdropFilter: "var(--glass-blur)",
                  border: `1px solid ${cardHovered ? "var(--border-hover)" : "var(--border-primary)"}`,
                  borderRadius: 20, padding: "40px 32px 32px",
                  boxShadow: cardHovered ? "var(--shadow-card-hover)" : "var(--shadow-card)",
                  transform: cardHovered ? "translateY(-6px)" : "translateY(0)",
                  transition: "all 0.5s cubic-bezier(0.23,1,0.32,1)",
                }}
              >
                <div style={{ position: "absolute", top: -50, right: -50, width: 140, height: 140, borderRadius: "50%", background: "radial-gradient(circle, var(--overlay-green) 0%, transparent 70%)", pointerEvents: "none" }} />

                <span style={{ position: "absolute", top: 20, right: 20, fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "5px 14px", borderRadius: 100, background: "rgba(80,140,220,0.1)", border: "1px solid rgba(80,140,220,0.2)", color: "#6a9cd8", fontFamily: "var(--font-body)", zIndex: 2 }}>
                  Informational
                </span>

                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 21, fontWeight: 400, color: "var(--text-primary)", marginBottom: 12, lineHeight: 1.3, letterSpacing: "-0.01em", paddingRight: 80 }}>
                  {config.title} {config.titleAccent}
                </h3>
                <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: 20, fontFamily: "var(--font-body)" }}>
                  Tips, advice, and step-by-step guidance for a successful {variant === "7a" ? "7(a)" : "504"} loan application.
                </p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 24 }}>
                  {config.includes.map((item, i) => (
                    <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11, fontWeight: 600, color: "var(--accent-green)", background: "var(--badge-bg)", border: "1px solid var(--badge-border)", padding: "4px 10px", borderRadius: 8, fontFamily: "var(--font-body)" }}>
                      <CheckCircle size={10} /> {item}
                    </span>
                  ))}
                </div>

                <div style={{ paddingTop: 20, borderTop: "1px solid var(--border-primary)" }}>
                  <div style={{ textAlign: "center", marginBottom: 16 }}>
                    <span style={{ fontFamily: "var(--font-display)", fontSize: 36, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>$99</span>
                  </div>

                  <a
                    href={config.checkoutUrl || "#"}
                    onClick={e => { if (!config.checkoutUrl) e.preventDefault(); }}
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                      width: "100%", padding: "14px 24px", textDecoration: "none",
                      background: config.checkoutUrl ? "var(--cta-bg)" : "var(--badge-bg)",
                      border: `1px solid ${config.checkoutUrl ? "var(--cta-border)" : "var(--badge-border)"}`,
                      borderRadius: 12, color: config.checkoutUrl ? "var(--cta-text)" : "var(--text-muted)",
                      fontSize: 14, fontWeight: 600, fontFamily: "var(--font-body)",
                      transition: "all 0.35s cubic-bezier(0.23,1,0.32,1)",
                      backgroundSize: "200% 200%",
                      cursor: config.checkoutUrl ? "pointer" : "default",
                      opacity: config.checkoutUrl ? 1 : 0.6,
                    }}
                  >
                    {config.checkoutUrl ? "Purchase Now" : "Purchase Coming Soon"}
                    <ChevronRight size={16} />
                  </a>

                  <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "14px 0" }}>
                    <div style={{ flex: 1, height: 1, background: "var(--border-primary)" }} />
                    <span style={{ fontSize: 11, color: "var(--text-muted)", fontFamily: "var(--font-body)" }}>or</span>
                    <div style={{ flex: 1, height: 1, background: "var(--border-primary)" }} />
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setAccessCode("");
                      setAccessError("");
                      setAccessValidated(false);
                      setAccessLoading(false);
                      const modal = document.getElementById("sba-access-modal");
                      if (modal) modal.style.display = "flex";
                    }}
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                      width: "100%", padding: "12px 24px",
                      background: "transparent", border: "1px solid var(--border-primary)",
                      borderRadius: 12, color: "var(--text-secondary)", fontSize: 13, fontWeight: 600,
                      fontFamily: "var(--font-body)", cursor: "pointer", transition: "all 0.3s ease",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--border-hover)"; e.currentTarget.style.color = "var(--text-primary)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border-primary)"; e.currentTarget.style.color = "var(--text-secondary)"; }}
                  >
                    <Key size={14} /> Enter Access Code
                  </button>

                  <p style={{ fontSize: 11, color: "var(--text-muted)", textAlign: "center", marginTop: 12, fontFamily: "var(--font-body)" }}>
                    Instant digital download &middot; Immediate access
                  </p>
                </div>
              </div>
            </div>

            {/* WHAT'S INCLUDED */}
            <div style={{ marginBottom: 56, animation: "sbaFadeSlideUp 0.7s ease-out 0.3s both" }}>
              <div style={{ textAlign: "center", marginBottom: 36 }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--accent-green)", fontFamily: "var(--font-body)" }}>
                  <Sparkles size={14} /> What's Inside
                </div>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: 30, fontWeight: 400, color: "var(--text-primary)", marginTop: 10 }}>
                  Everything You Need to Apply
                </h2>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16, maxWidth: 900, margin: "0 auto" }}>
                {[
                  { icon: <Layout size={20} />, label: "Interactive Application Guide", desc: "Step-by-step walkthrough with clickable navigation" },
                  { icon: <FileText size={20} />, label: "Premium PDF Guide", desc: "Comprehensive reference guide for the application process" },
                  { icon: <Download size={20} />, label: "Printable PDF Companion", desc: "Print-friendly version for offline review" },
                  { icon: <ClipboardList size={20} />, label: "Application Checklist", desc: "Ensure your packet is complete before submission" },
                  { icon: <FolderOpen size={20} />, label: "Required Forms Library", desc: "All PDF forms needed for your application" },
                  { icon: <FileText size={20} />, label: "Professional Templates", desc: "Pre-built templates to accelerate your application" },
                ].map((item, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "flex-start", gap: 14, padding: "20px 18px",
                    borderRadius: 14, background: "var(--bg-card)", border: "1px solid var(--border-primary)",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--border-hover)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border-primary)"; e.currentTarget.style.transform = "translateY(0)"; }}
                  >
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: "var(--badge-bg)", border: "1px solid var(--badge-border)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent-green)", flexShrink: 0 }}>
                      {item.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", fontFamily: "var(--font-body)", marginBottom: 4 }}>{item.label}</div>
                      <div style={{ fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.6, fontFamily: "var(--font-body)" }}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FEATURES */}
            <div style={{ animation: "sbaFadeSlideUp 0.7s ease-out 0.5s both" }}>
              <div style={{ textAlign: "center", marginBottom: 36 }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--accent-green)", fontFamily: "var(--font-body)" }}>
                  <Award size={14} /> Why Choose Us
                </div>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: 30, fontWeight: 400, color: "var(--text-primary)", marginTop: 10 }}>
                  Built for Applicants
                </h2>
              </div>
              <div className="sba-features-grid">
                {config.features.map((f, i) => (
                  <FeatureCard key={i} icon={f.icon} title={f.title} description={f.desc} delay={0.55 + i * 0.07} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ACCESS CODE MODAL */}
        <div id="sba-access-modal" className="sba-modal-overlay" style={{ display: "none" }} onClick={() => { const m = document.getElementById("sba-access-modal"); if (m) m.style.display = "none"; }}>
          <div className="sba-modal-box" onClick={e => e.stopPropagation()}>
            <div style={{ textAlign: "center", marginBottom: 28 }}>
              <div style={{
                width: 56, height: 56, borderRadius: 16, margin: "0 auto 16px",
                background: accessValidated ? "rgba(74,180,74,0.12)" : "var(--badge-bg)",
                border: `1px solid ${accessValidated ? "rgba(74,180,74,0.25)" : "var(--badge-border)"}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: accessValidated ? "#4aba4a" : "var(--accent-green)", transition: "all 0.3s ease",
              }}>
                {accessValidated ? <CheckCircle size={24} /> : <Key size={24} />}
              </div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: 24, color: "var(--text-primary)", marginBottom: 6 }}>
                {accessValidated ? "Access Granted!" : "Enter Access Code"}
              </h3>
              <p style={{ fontSize: 13, color: "var(--text-secondary)" }}>
                {accessValidated ? "Your code has been validated. Click below to access your toolkit." : `${config.title} ${config.titleAccent}`}
              </p>
            </div>

            {!accessValidated ? (
              <>
                <div style={{ marginBottom: 20 }}>
                  <input
                    type="text"
                    className="sba-modal-input"
                    placeholder="Enter your access code..."
                    value={accessCode}
                    onChange={e => setAccessCode(e.target.value)}
                    onKeyDown={e => { if (e.key === "Enter") handleValidateCode(); }}
                    autoFocus
                    disabled={accessLoading}
                    style={{ textTransform: "uppercase", letterSpacing: "0.05em" }}
                  />
                  {accessError && (
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 10, fontSize: 13, color: "#cc6666" }}>
                      <AlertCircle size={14} /> {accessError}
                    </div>
                  )}
                </div>
                <button type="button" onClick={handleValidateCode} disabled={accessLoading || !accessCode.trim()} style={{
                  width: "100%", padding: "14px", borderRadius: 12,
                  background: "var(--cta-bg)", border: "1px solid var(--cta-border)",
                  color: "var(--cta-text)", fontSize: 14, fontWeight: 600,
                  fontFamily: "var(--font-body)", cursor: accessLoading ? "wait" : "pointer",
                  transition: "all 0.3s ease", backgroundSize: "200% 200%",
                  opacity: (!accessCode.trim() || accessLoading) ? 0.6 : 1,
                }}>
                  {accessLoading ? "Validating..." : "Validate & Access"}
                </button>
              </>
            ) : (
              <button type="button" onClick={handleAccessToolkit} style={{
                width: "100%", padding: "14px", borderRadius: 12,
                background: "var(--cta-bg)", border: "1px solid var(--cta-border)",
                color: "var(--cta-text)", fontSize: 14, fontWeight: 600,
                fontFamily: "var(--font-body)", cursor: "pointer",
                transition: "all 0.3s ease", backgroundSize: "200% 200%",
              }}>
                Gain Access Now
              </button>
            )}

            <button type="button" onClick={() => { const m = document.getElementById("sba-access-modal"); if (m) m.style.display = "none"; }} style={{
              width: "100%", padding: "12px", marginTop: 10, borderRadius: 12,
              background: "transparent", border: "1px solid var(--border-primary)",
              color: "var(--text-secondary)", fontSize: 13, fontWeight: 600,
              fontFamily: "var(--font-body)", cursor: "pointer", transition: "all 0.3s ease",
            }}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}