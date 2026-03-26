import { useState, useEffect, useRef, useCallback } from "react";

/* ─────────────────────────────────────────────
   Cross-Servicing Packages — Product Page
   SmallBiz Recon™ — 2026 Premium
   ───────────────────────────────────────────── */

const PRICE = 499;
const ADMIN_CODE = "RECON2026";
const TREASURY_IMG = "https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/sign/SMALLBIZ%20RECON/Screenshot%202026-03-06%20150013.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85MzZjNmFmNC1iMzA2LTQzMmMtYWFjNy03ZmRmYjU1NDRjMzUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJTTUFMTEJJWiBSRUNPTi9TY3JlZW5zaG90IDIwMjYtMDMtMDYgMTUwMDEzLmpwZyIsImlhdCI6MTc3MjgyNzI4NCwiZXhwIjo2NTY0MTM5Mjg0fQ.ACJ9cJKy096fji8N7HrTI5ve9i3XO4X-z4pV4JYdAxw";

/* ══ ICONS ══ */
const Icon = ({ children, size = 24, label, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
    role={label ? "img" : "presentation"} aria-label={label} aria-hidden={!label} focusable="false" {...props}
  >{children}</svg>
);
const ArrowLeft = (p) => <Icon {...p}><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></Icon>;
const Check = (p) => <Icon {...p}><polyline points="20 6 9 17 4 12"/></Icon>;
const CheckCircle = (p) => <Icon {...p}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></Icon>;
const AlertCircle = (p) => <Icon {...p}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></Icon>;
const Shield = (p) => <Icon {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></Icon>;
const Lock = (p) => <Icon {...p}><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></Icon>;
const Star = (p) => <Icon {...p}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></Icon>;
const Zap = (p) => <Icon {...p}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></Icon>;
const ChevronRight = (p) => <Icon {...p}><polyline points="9 18 15 12 9 6"/></Icon>;
const Package = (p) => <Icon {...p}><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></Icon>;
const FileText = (p) => <Icon {...p}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></Icon>;
const Users = (p) => <Icon {...p}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></Icon>;
const Key = (p) => <Icon {...p}><path d="m21 2-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0 3 3L22 7l-3-3m-3.5 3.5L19 4"/></Icon>;
const XIcon = (p) => <Icon {...p}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></Icon>;
const ExternalLink = (p) => <Icon {...p}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></Icon>;
const BookOpen = (p) => <Icon {...p}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></Icon>;
const MessageCircle = (p) => <Icon {...p}><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></Icon>;
const Bell = (p) => <Icon {...p}><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></Icon>;

/* ══ GOLD DIVIDER ══ */
const GoldDivider = ({ mt = 16, mb = 48 }) => (
  <hr style={{
    width: "100%", height: 1, border: "none",
    background: "linear-gradient(90deg, transparent, rgba(200, 168, 78, 0.35), transparent)",
    marginTop: mt, marginBottom: mb,
  }} />
);

/* ══ PARTICLE FIELD ══ */
const ParticleField = () => {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const prefersReducedMotion = useRef(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    prefersReducedMotion.current = mq.matches;
    const handler = (e) => { prefersReducedMotion.current = e.matches; };
    mq.addEventListener("change", handler);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w, h, particles;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
    };
    const init = () => {
      resize();
      particles = Array.from({ length: Math.min(Math.floor((w * h) / 18000), 60) }, () => ({
        x: Math.random() * w, y: Math.random() * h, r: Math.random() * 1.5 + 0.5,
        dx: (Math.random() - 0.5) * 0.3, dy: (Math.random() - 0.5) * 0.15 - 0.05,
        o: Math.random() * 0.35 + 0.08,
      }));
    };
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      if (prefersReducedMotion.current) {
        particles.forEach((p) => { ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fillStyle = `rgba(154,184,122,${p.o})`; ctx.fill(); });
        return;
      }
      particles.forEach((p) => {
        p.x += p.dx; p.y += p.dy;
        if (p.x < -10) p.x = w + 10; if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10; if (p.y > h + 10) p.y = -10;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fillStyle = `rgba(154,184,122,${p.o})`; ctx.fill();
      });
      animRef.current = requestAnimationFrame(draw);
    };
    init(); draw();
    window.addEventListener("resize", init);
    return () => { cancelAnimationFrame(animRef.current); mq.removeEventListener("change", handler); };
  }, []);
  return <canvas ref={canvasRef} aria-hidden="true" style={{ position: "fixed", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }} />;
};

/* ══ ANIMATED PRICE ══ */
const AnimatedPrice = ({ value }) => {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setDisplay(value); return; }
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / 1200, 1);
      setDisplay(Math.round((1 - Math.pow(1 - p, 4)) * value));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [value]);
  return <span aria-label={`$${value}`}>${display}</span>;
};

/* ══ SUB-COMPONENTS ══ */
const BADGE_COLORS = {
  green: { bg: "rgba(154,184,122,0.12)", border: "rgba(154,184,122,0.2)", text: "#9ab87a" },
  blue:  { bg: "rgba(100,155,200,0.10)", border: "rgba(100,155,200,0.2)", text: "#7a9ccc" },
  gold:  { bg: "rgba(200,168,78,0.10)",  border: "rgba(200,168,78,0.2)",  text: "#c8a84e" },
  teal:  { bg: "rgba(80,180,160,0.10)",  border: "rgba(80,180,160,0.2)",  text: "#5ab8a0" },
};
const Badge = ({ color = "green", children }) => {
  const c = BADGE_COLORS[color] || BADGE_COLORS.green;
  return <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "5px 12px", background: c.bg, border: `1px solid ${c.border}`, borderRadius: 100, fontSize: 11, fontWeight: 600, color: c.text, fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.03em", whiteSpace: "nowrap", lineHeight: 1.4 }}>{children}</span>;
};
const FeatureItem = ({ children, included = true }) => (
  <li style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "10px 0", borderBottom: "1px solid rgba(154,184,122,0.05)", fontSize: 14, color: included ? "#c8e0b4" : "#b8bfb0", lineHeight: 1.65, fontFamily: "'DM Sans', sans-serif" }}>
    <span style={{ flexShrink: 0, marginTop: 2, width: 20, height: 20, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: included ? "rgba(154,184,122,0.12)" : "rgba(180,160,140,0.1)" }}>
      {included ? <Check size={12} style={{ color: "#9ab87a" }} /> : <XIcon size={12} style={{ color: "#8a7a6a" }} />}
    </span>
    <span>{children}</span>
  </li>
);
const StepCard = ({ icon, step, title, description, delay = 0 }) => (
  <div className="card step-card" role="article" aria-label={`Step ${step}: ${title}`} style={{ padding: "36px 32px", textAlign: "center", position: "relative", animation: `fadeSlideUp 0.8s ease-out ${delay}s both` }}>
    <div aria-hidden="true" style={{ position: "absolute", top: 16, right: 20, fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 64, fontWeight: 400, color: "rgba(154,184,122,0.06)", lineHeight: 1, userSelect: "none" }}>{step}</div>
    <div style={{ width: 56, height: 56, borderRadius: 16, background: "rgba(154,184,122,0.08)", border: "1px solid rgba(154,184,122,0.12)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", color: "#9ab87a" }}>{icon}</div>
    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#7a8870", marginBottom: 8, fontFamily: "'DM Sans', sans-serif" }}>Step {step}</div>
    <h3 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 22, fontWeight: 400, color: "#e8ede2", marginBottom: 10 }}>{title}</h3>
    <p style={{ fontSize: 13, color: "#7a8870", lineHeight: 1.75, fontFamily: "'DM Sans', sans-serif" }}>{description}</p>
  </div>
);
const SkipLink = () => (
  <a href="#main-content" style={{ position: "absolute", left: "-9999px", top: 0, zIndex: 9999, background: "#1a1f19", color: "#c8e0b4", padding: "12px 24px", fontSize: 14, fontWeight: 600, fontFamily: "'DM Sans', sans-serif", textDecoration: "none", borderRadius: "0 0 8px 0" }}
    onFocus={(e) => { e.currentTarget.style.left = "0"; }} onBlur={(e) => { e.currentTarget.style.left = "-9999px"; }}>Skip to main content</a>
);

/* ══════════════════════════════════════════════
   MAIN COMPONENT
   ══════════════════════════════════════════════ */
export default function CrossServicingPackagesPage() {
  const [adminCode, setAdminCode] = useState("");
  const [codeError, setCodeError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const codeInputRef = useRef(null);
  const handleBack = useCallback(() => { window.history.back(); }, []);
  const handleIntakeAccess = useCallback(() => { setIsLoading(true); window.location.href = "https://smallbizrecon.com/dispute-recall-service/intake"; }, []);
  const handleAdminAccess = useCallback(() => {
    if (adminCode.trim().toUpperCase() === ADMIN_CODE) { setCodeError(false); window.location.href = "https://smallbizrecon.com/dispute-recall-service/intake"; }
    else { setCodeError(true); codeInputRef.current?.focus(); }
  }, [adminCode]);

  useEffect(() => {
    const setVH = () => { document.documentElement.style.setProperty("--vh", `${window.innerHeight * 0.01}px`); };
    setVH(); window.addEventListener("resize", setVH);
    return () => window.removeEventListener("resize", setVH);
  }, []);
  useEffect(() => {
  const reset = () => setIsLoading(false);
  window.addEventListener("pageshow", reset);
  return () => window.removeEventListener("pageshow", reset);
}, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --c-bg: #111410; --c-surface: rgba(35, 40, 32, 0.5); --c-surface-alt: rgba(26, 31, 25, 0.7);
          --c-border: rgba(154, 184, 122, 0.08); --c-border-hover: rgba(154, 184, 122, 0.2);
          --c-green: #9ab87a; --c-green-muted: #7a8870; --c-gold: #c8a84e; --c-blue: #7a9ccc; --c-teal: #5ab8a0;
          --c-text: #e8ede2; --c-text-soft: #c8e0b4; --c-text-muted: #7a8870;
          --font-display: 'Instrument Serif', Georgia, serif; --font-body: 'DM Sans', sans-serif;
          --radius-lg: 24px; --radius-md: 14px; --radius-sm: 10px;
          --ease-out: cubic-bezier(0.23, 1, 0.32, 1); --vh: 1vh; color-scheme: dark;
        }
        html { -webkit-text-size-adjust: 100%; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; scroll-behavior: smooth; }
        .page-root { min-height: 100vh; min-height: calc(var(--vh, 1vh) * 100); background: var(--c-bg); color: var(--c-text); font-family: var(--font-body); position: relative; overflow-x: hidden; -webkit-overflow-scrolling: touch; }
        .page-root::before { content: ''; position: fixed; inset: 0; background: radial-gradient(ellipse 80% 60% at 20% 10%, rgba(74,120,54,0.07) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 80%, rgba(100,155,200,0.04) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 50% 50%, rgba(200,168,78,0.03) 0%, transparent 60%); pointer-events: none; z-index: 0; }
        .page-root::after { content: ''; position: fixed; inset: 0; opacity: 0.025; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); background-size: 200px 200px; pointer-events: none; z-index: 0; }

        @media (prefers-reduced-motion: no-preference) {
          @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes heroReveal { from { opacity: 0; transform: translateY(32px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
          @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
          @keyframes pulseGlow { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }
          @keyframes spin { to { transform: rotate(360deg); } }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes fadeSlideUp { from, to { opacity: 1; transform: none; } }
          @keyframes heroReveal { from, to { opacity: 1; transform: none; } }
          @keyframes shimmer { from, to { background-position: 0 0; } }
          @keyframes pulseGlow { from, to { opacity: 0.7; } }
          @keyframes spin { to { transform: rotate(360deg); } }
        }

        :focus-visible { outline: 2px solid var(--c-green); outline-offset: 3px; border-radius: 4px; }
        :focus:not(:focus-visible) { outline: none; }

        /* ── GOLD CTA BUTTONS ── */
        .cta-btn { position: relative; display: inline-flex; align-items: center; justify-content: center; gap: 10px; padding: 18px 40px; font-family: var(--font-body); font-size: 15px; font-weight: 700; color: #1a1f19; background: linear-gradient(135deg, #c8a84e, #a8883a); border: none; border-radius: var(--radius-md); cursor: pointer; letter-spacing: 0.04em; transition: all 0.4s var(--ease-out); text-decoration: none; box-shadow: 0 4px 20px rgba(200,168,78,0.3), inset 0 1px 0 rgba(255,255,255,0.15); overflow: hidden; -webkit-tap-highlight-color: transparent; touch-action: manipulation; min-height: 52px; }
        .cta-btn::before { content: ''; position: absolute; inset: 0; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent); background-size: 200% 100%; animation: shimmer 3s ease-in-out infinite; border-radius: var(--radius-md); }
        .cta-btn:hover { transform: translateY(-3px) scale(1.02); box-shadow: 0 12px 40px rgba(200,168,78,0.35), inset 0 1px 0 rgba(255,255,255,0.2); }
        .cta-btn:active { transform: translateY(-1px) scale(0.99); }
        .cta-btn:disabled { opacity: 0.7; cursor: not-allowed; transform: none; }

        .cta-btn-secondary { position: relative; display: inline-flex; align-items: center; justify-content: center; gap: 10px; padding: 16px 36px; font-family: var(--font-body); font-size: 14px; font-weight: 600; color: var(--c-gold); background: transparent; border: 1px solid rgba(200,168,78,0.25); border-radius: var(--radius-md); cursor: pointer; letter-spacing: 0.03em; transition: all 0.4s var(--ease-out); overflow: hidden; text-decoration: none; -webkit-tap-highlight-color: transparent; touch-action: manipulation; min-height: 52px; }
        .cta-btn-secondary:hover { background: rgba(200,168,78,0.06); border-color: rgba(200,168,78,0.4); color: #dbbe6e; transform: translateY(-2px); box-shadow: 0 8px 30px rgba(0,0,0,0.2); }
        .cta-btn-secondary:active { transform: translateY(0); }

        .back-btn { display: inline-flex; align-items: center; gap: 8px; color: var(--c-green); font-size: 14px; font-weight: 600; background: none; border: none; cursor: pointer; padding: 10px 4px; font-family: var(--font-body); transition: all 0.3s ease; letter-spacing: 0.02em; min-height: 44px; -webkit-tap-highlight-color: transparent; }
        .back-btn:hover { color: var(--c-text-soft); gap: 12px; }

        .card { background: var(--c-surface); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid var(--c-border); border-radius: var(--radius-lg); padding: 48px; transition: all 0.5s var(--ease-out); }
        .card:hover { border-color: var(--c-border-hover); box-shadow: 0 8px 40px rgba(0,0,0,0.3); }
        .step-card:hover { transform: translateY(-4px); box-shadow: 0 12px 48px rgba(0,0,0,0.35), 0 0 0 1px var(--c-border-hover); }

        .trust-pill { display: inline-flex; align-items: center; gap: 6px; padding: 6px 14px; background: rgba(200,168,78,0.08); border-radius: 100px; font-size: 12px; font-weight: 500; color: var(--c-gold); white-space: nowrap; }
        .section-label { display: inline-flex; align-items: center; gap: 8px; font-size: 11px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: var(--c-green); margin-bottom: 16px; font-family: var(--font-body); }

        .code-input { width: 100%; padding: 14px 16px 14px 40px; background: rgba(35, 40, 32, 0.6); border: 1px solid var(--c-border); border-radius: var(--radius-sm); color: var(--c-text); font-size: 14px; font-family: var(--font-body); transition: border-color 0.3s ease, box-shadow 0.3s ease; min-height: 48px; -webkit-appearance: none; }
        .code-input:focus { outline: none; border-color: rgba(200,168,78,0.4); box-shadow: 0 0 0 3px rgba(200,168,78,0.08); }
        .code-input.error { border-color: rgba(200,80,80,0.4); }
        .code-input::placeholder { color: #5a6450; }
        .access-btn { padding: 14px 22px; background: transparent; border: 1px solid rgba(200,168,78,0.2); border-radius: var(--radius-sm); color: var(--c-gold); font-size: 14px; font-weight: 600; font-family: var(--font-body); cursor: pointer; transition: all 0.3s ease; white-space: nowrap; min-height: 48px; -webkit-tap-highlight-color: transparent; }
        .access-btn:hover { border-color: rgba(200,168,78,0.4); color: #dbbe6e; background: rgba(200,168,78,0.04); }

        .featured-img { width: 100%; height: auto; display: block; transition: all 0.5s var(--ease-out); }
        .treasury-banner { position: relative; overflow: hidden; }
        .treasury-banner::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, transparent, var(--c-gold), transparent); opacity: 0.6; }

        .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }

        @media (max-width: 1024px) { .card { padding: 36px 28px; } }
        @media (max-width: 768px) {
          .card { padding: 28px 20px; border-radius: 18px; }
          .grid-2 { grid-template-columns: 1fr; } .grid-3 { grid-template-columns: 1fr; }
          .hero-title { font-size: 30px !important; } .hero-subtitle { font-size: 20px !important; }
          .cta-btn { width: 100%; padding: 18px 32px; font-size: 16px; }
          .cta-btn-secondary { width: 100%; padding: 16px 28px; }
          .price-display { font-size: 44px !important; } .section-heading { font-size: 26px !important; }
          .content-wrap { padding: 0 16px 60px !important; }
          .hero-header { padding: 60px 24px 48px !important; }
        }
        @media (max-width: 480px) {
          .hero-title { font-size: 26px !important; } .hero-subtitle { font-size: 18px !important; }
          .card { padding: 22px 16px; border-radius: 14px; }
          .price-display { font-size: 38px !important; } .badge-wrap { gap: 6px !important; }
          .hero-header { padding: 48px 16px 36px !important; }
        }
        @supports (padding: env(safe-area-inset-bottom)) {
          .page-root { padding-bottom: env(safe-area-inset-bottom); }
          .content-wrap { padding-left: max(16px, env(safe-area-inset-left)); padding-right: max(16px, env(safe-area-inset-right)); }
        }
      `}</style>

      <SkipLink />

      <div className="page-root">
        <ParticleField />

        {/* ═══════════════════════════════════
             HERO HEADER
            ═══════════════════════════════════ */}
        <header className="hero-header" style={{
          position: "relative", zIndex: 1, textAlign: "center",
          padding: "80px 24px 56px", animation: "heroReveal 0.9s ease-out 0.1s both",
        }}>
          <nav aria-label="Back navigation" style={{ position: "absolute", top: 24, left: 24, animation: "fadeSlideUp 0.6s ease-out both" }}>
            <button type="button" className="back-btn" onClick={handleBack} aria-label="Back to Toolkits">
              <ArrowLeft size={16} /> Back to Toolkits
            </button>
          </nav>

          <div style={{
            width: 72, height: 72, borderRadius: 20, margin: "0 auto 28px",
            background: "rgba(200,168,78,0.08)", border: "1px solid rgba(200,168,78,0.15)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <BookOpen size={32} style={{ color: "var(--c-gold)" }} />
          </div>

          <h1 id="hero-heading" className="hero-title" style={{
            fontFamily: "var(--font-display)", fontSize: 48, fontWeight: 400,
            lineHeight: 1.1, color: "var(--c-text)", letterSpacing: "-0.015em",
            maxWidth: 800, margin: "0 auto 20px",
          }}>
            Cross-Servicing Packages
          </h1>

          <p className="hero-subtitle" style={{
            fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 400,
            fontStyle: "italic", color: "var(--c-gold)", lineHeight: 1.3,
            maxWidth: 720, margin: "0 auto 24px",
          }}>
            SBA Recall Letter &amp; Treasury / Collection Agency Dispute Letter
          </p>

          <p style={{
            fontSize: 15, color: "var(--c-text-muted)", lineHeight: 1.75,
            maxWidth: 680, margin: "0 auto", fontFamily: "var(--font-body)",
          }}>
            A professionally assembled SBA and Treasury servicing package designed for borrowers
            seeking a Treasury or Collection Agency Formal Dispute. We review your statements,
            assemble the required letters, and deliver a submission-ready package aligned with
            current SBA / Treasury servicing standards.
          </p>

          <div className="badge-wrap" style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", marginTop: 28 }}>
            <Badge color="green">Human Reviewed</Badge>
            <Badge color="blue">SOP 50 52 2 Aligned</Badge>
            <Badge color="gold">1 Servicing Action Included</Badge>
            <Badge color="teal">Document Packaging Service</Badge>
          </div>
        </header>

        {/* ── HERO DIVIDER — tight to badges, spacious below ── */}
        <GoldDivider mt={12} mb={48} />

        {/* ═══════════════════════════════════
             MAIN CONTENT
            ═══════════════════════════════════ */}
        <main id="main-content" role="main" className="content-wrap"
          style={{ position: "relative", zIndex: 1, maxWidth: 1120, margin: "0 auto", padding: "0 24px 80px" }}>

          {/* ── SECTION 1: WHAT'S NEW — TREASURY UPDATE ── */}
          <section aria-labelledby="whats-new-heading" style={{ marginBottom: 48, animation: "fadeSlideUp 0.8s ease-out 0.2s both" }}>
            <div style={{ textAlign: "center", marginBottom: 36 }}>
              <div className="section-label" style={{ justifyContent: "center" }}>
                <Bell size={14} /> What's New
              </div>
              <h2 id="whats-new-heading" className="section-heading" style={{
                fontFamily: "var(--font-display)", fontSize: 34, fontWeight: 400,
                color: "var(--c-text)", letterSpacing: "-0.01em", marginBottom: 10,
              }}>Treasury Update</h2>
              <p style={{ fontSize: 15, color: "var(--c-text-muted)", maxWidth: 620, margin: "0 auto", lineHeight: 1.75 }}>
                Recent Treasury Disclaimer — The U.S. Department of the Treasury has released a statement
                regarding COVID EIDL debt returns. Here's what borrowers need to understand.
              </p>
            </div>

            {/* Treasury screenshot */}
            <div className="card" style={{ marginBottom: 24, padding: 0, overflow: "hidden", background: "rgba(26, 31, 25, 0.6)" }}>
              <img src={TREASURY_IMG} alt="U.S. Treasury disclaimer regarding COVID EIDL debt return procedures" className="featured-img" loading="lazy" />
            </div>

            {/* What This Means */}
            <div className="card treasury-banner" style={{
              marginBottom: 24, padding: "40px 44px",
              background: "linear-gradient(180deg, rgba(45,50,40,0.5) 0%, rgba(30,35,28,0.7) 100%)",
              borderColor: "rgba(200,168,78,0.15)",
            }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 24 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                  background: "rgba(200,168,78,0.1)", border: "1px solid rgba(200,168,78,0.15)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <BookOpen size={20} style={{ color: "var(--c-gold)" }} />
                </div>
                <div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 400, color: "var(--c-text)", marginBottom: 8 }}>
                    What This Means for Borrowers
                  </h3>
                  <p style={{ fontSize: 14, color: "var(--c-text-muted)", lineHeight: 1.85, fontFamily: "var(--font-body)" }}>
                    When Treasury states it "cannot return" certain SBA debts, it is typically referring
                    to the fact that Treasury does not independently decide to return debts on its own authority.
                    The <strong style={{ color: "var(--c-text-soft)" }}>creditor agency — the SBA — retains
                    authority</strong> over the underlying obligation and determines whether a debt should
                    resume agency servicing.
                  </p>
                </div>
              </div>

              <div style={{ padding: "20px 24px", background: "rgba(154,184,122,0.04)", borderRadius: 14, border: "1px solid rgba(154,184,122,0.08)", marginBottom: 24 }}>
                <p style={{ fontSize: 13.5, color: "var(--c-text-muted)", lineHeight: 1.8, fontFamily: "var(--font-body)" }}>
                  Under Treasury Fiscal Service Cross-Servicing Procedures <strong style={{ color: "var(--c-blue)" }}>§5035.50
                  — "Return Transferred Debt,"</strong> Fiscal Service may return a transferred debt to the
                  creditor agency under several circumstances — including when the creditor agency requests
                  that the debt be returned.
                </p>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                <a href="https://fiscal.treasury.gov/crs/" target="_blank" rel="noopener noreferrer" style={{
                  display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600,
                  color: "var(--c-blue)", fontFamily: "var(--font-body)", textDecoration: "none",
                  padding: "8px 14px", borderRadius: 8, background: "rgba(100,155,200,0.06)",
                  border: "1px solid rgba(100,155,200,0.12)", transition: "all 0.3s ease", minHeight: 40,
                }}>
                  <ExternalLink size={13} /> Treasury Cross-Servicing Procedures
                </a>
                <span style={{ fontSize: 12, color: "var(--c-text-muted)", fontFamily: "var(--font-body)" }}>§5035.50 · §5035.60</span>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="card" role="note" aria-label="Informational disclaimer" style={{
              padding: "24px 32px", background: "rgba(45, 50, 40, 0.25)", borderColor: "rgba(200,168,78,0.08)",
            }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                <AlertCircle size={16} style={{ color: "var(--c-gold)", marginTop: 2, flexShrink: 0, opacity: 0.7 }} />
                <p style={{ fontSize: 12.5, color: "#6a7560", lineHeight: 1.8, fontFamily: "var(--font-body)" }}>
                  This section is provided for informational and educational purposes only and does not
                  constitute legal advice. SmallBiz Recon™ is not a law firm and does not provide legal
                  representation. Federal servicing procedures can evolve over time. Borrowers should
                  consult qualified legal counsel regarding their specific circumstances.
                </p>
              </div>
            </div>
          </section>

          {/* ── DIVIDER ── */}
          <GoldDivider mt={16} mb={48} />

          {/* ── SECTION 2: INCLUDED / NOT INCLUDED ── */}
          <div className="grid-2" style={{ marginBottom: 32, animation: "fadeSlideUp 0.8s ease-out 0.3s both" }}>
            <section className="card" style={{ padding: "36px 40px" }} aria-labelledby="included-heading">
              <div className="section-label" id="included-heading"><CheckCircle size={14} /> What's Included</div>
              <ul style={{ listStyle: "none" }} role="list">
                <FeatureItem>One SBA/Treasury servicing action (Release of Collateral or Relocation)</FeatureItem>
                <FeatureItem>Review of borrower-provided statements</FeatureItem>
                <FeatureItem>Assembly of SBA cover letter</FeatureItem>
                <FeatureItem>Treasury-appropriate dispute or recall request</FeatureItem>
                <FeatureItem>Submission instructions for borrower</FeatureItem>
                <FeatureItem>Final packaged PDF set, ready for submission</FeatureItem>
              </ul>
            </section>

            <section className="card" style={{ padding: "36px 40px", background: "var(--c-surface-alt)" }} aria-labelledby="not-included-heading">
              <div className="section-label" id="not-included-heading" style={{ color: "#b8bfb0" }}>
                <AlertCircle size={14} style={{ color: "#b8bfb0" }} /> Not Included
              </div>
              <ul style={{ listStyle: "none" }} role="list">
                <FeatureItem included={false}>Legal advice</FeatureItem>
                <FeatureItem included={false}>Business advice</FeatureItem>
                <FeatureItem included={false}>Multiple servicing actions (each additional action requires a separate purchase)</FeatureItem>
              </ul>
            </section>
          </div>

          {/* ── DISCLOSURE ── */}
          <aside className="card" role="note" aria-label="Important disclosure" style={{
            marginBottom: 32, padding: "32px 40px", background: "rgba(45, 50, 40, 0.3)",
            borderColor: "rgba(200,168,78,0.12)", animation: "fadeSlideUp 0.8s ease-out 0.4s both",
          }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
              <Shield size={20} style={{ color: "var(--c-gold)", marginTop: 2, flexShrink: 0 }} />
              <div>
                <h2 style={{ fontSize: 15, fontWeight: 700, color: "var(--c-text-soft)", marginBottom: 10, fontFamily: "var(--font-body)", letterSpacing: "0.02em" }}>
                  Important Disclosure
                </h2>
                <p style={{ fontSize: 13.5, color: "var(--c-text-muted)", lineHeight: 1.8 }}>
                  SmallBiz Recon™ provides document review, organization, and packaging services only.
                  We do not provide legal advice, financial advice, or represent borrowers before the
                  SBA or Treasury. Final submission decisions and outcomes remain solely with the SBA
                  and U.S. Treasury.
                </p>
              </div>
            </div>
          </aside>

          {/* ── DIVIDER ── */}
          <GoldDivider mt={16} mb={48} />

          {/* ── PRICING CTA — $499 ── */}
          <section className="card" aria-labelledby="pricing-heading" style={{
            textAlign: "center", marginBottom: 56, padding: "60px 48px",
            background: "linear-gradient(180deg, rgba(35,40,32,0.6) 0%, rgba(26,31,25,0.8) 100%)",
            border: "1px solid rgba(200,168,78,0.1)", animation: "fadeSlideUp 0.8s ease-out 0.5s both",
            position: "relative", overflow: "hidden",
          }}>
            <div aria-hidden="true" style={{
              position: "absolute", top: "20%", left: "50%", transform: "translate(-50%, -50%)",
              width: 340, height: 340, borderRadius: "50%",
              background: "radial-gradient(circle, rgba(200,168,78,0.08) 0%, transparent 70%)",
              pointerEvents: "none", animation: "pulseGlow 4s ease-in-out infinite",
            }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <h2 id="pricing-heading" style={{ position: "absolute", width: 1, height: 1, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0,0,0,0)", border: 0 }}>Pricing</h2>
              <div className="price-display" style={{ fontFamily: "var(--font-display)", fontSize: 60, fontWeight: 400, color: "var(--c-text)", marginBottom: 10, letterSpacing: "-0.02em" }}>
                <AnimatedPrice value={PRICE} />
              </div>
              <p style={{ fontSize: 13, color: "var(--c-text-muted)", marginBottom: 10, fontWeight: 500, letterSpacing: "0.03em" }}>One-time purchase · No subscription</p>
              <p style={{ fontSize: 17, color: "var(--c-text-soft)", marginBottom: 28, fontWeight: 600, fontFamily: "var(--font-body)" }}>See If We Can Help</p>

              <button type="button" onClick={handleIntakeAccess} disabled={isLoading} className="cta-btn" aria-label="Go to SmallBiz Recon intake form">
                {isLoading ? <span style={{ display: "inline-block", width: 18, height: 18, border: "2px solid rgba(26,31,25,0.3)", borderTopColor: "#1a1f19", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} /> : <>SmallBiz Recon Intake <ChevronRight size={18} /></>}
              </button>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginTop: 28, flexWrap: "wrap" }}>
                <span className="trust-pill"><Lock size={12} /> Secure Checkout</span>
                <span className="trust-pill"><Star size={12} /> Human Specialist</span>
                <span className="trust-pill"><Zap size={12} /> Fast Turnaround</span>
              </div>

              {/* Admin Code */}
              <div style={{ marginTop: 32, display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ height: 1, width: 60, background: "var(--c-border)" }} />
                  <span style={{ fontSize: 11, color: "var(--c-text-muted)", fontFamily: "var(--font-body)" }}>or</span>
                  <div style={{ height: 1, width: 60, background: "var(--c-border)" }} />
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, maxWidth: 380, width: "100%" }}>
                  <div style={{ position: "relative", flex: 1 }}>
                    <Key size={14} aria-hidden="true" style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#5a6450" }} />
                    <label htmlFor="admin-code-input" style={{ position: "absolute", width: 1, height: 1, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0,0,0,0)", border: 0 }}>Access code</label>
                    <input ref={codeInputRef} id="admin-code-input" type="text" value={adminCode}
                      onChange={(e) => { setAdminCode(e.target.value); setCodeError(false); }}
                      onKeyDown={(e) => { if (e.key === "Enter") handleAdminAccess(); }}
                      placeholder="Enter access code..." className={`code-input${codeError ? " error" : ""}`}
                      aria-invalid={codeError} aria-describedby={codeError ? "code-error-msg" : undefined}
                      autoComplete="off" spellCheck="false" />
                  </div>
                  <button type="button" onClick={handleAdminAccess} className="access-btn">Access</button>
                </div>
                {codeError && <p id="code-error-msg" role="alert" style={{ fontSize: 12.5, color: "#cc6666", fontFamily: "var(--font-body)" }}>Invalid access code. Please try again.</p>}
              </div>
            </div>
          </section>

          {/* ── DIVIDER ── */}
          <GoldDivider mt={0} mb={48} />

          {/* ── HOW IT WORKS ── */}
          <section aria-labelledby="process-heading" style={{ marginBottom: 56, animation: "fadeSlideUp 0.8s ease-out 0.6s both" }}>
            <div style={{ textAlign: "center", marginBottom: 44 }}>
              <div className="section-label" style={{ justifyContent: "center" }}><Zap size={14} /> Process</div>
              <h2 id="process-heading" className="section-heading" style={{ fontFamily: "var(--font-display)", fontSize: 36, fontWeight: 400, color: "var(--c-text)", letterSpacing: "-0.01em" }}>How It Works</h2>
            </div>
            <div className="grid-3">
              <StepCard icon={<Package size={24} />} step="1" title="Purchase Service" description="Complete your purchase and gain immediate access to the secure intake form." delay={0.7} />
              <StepCard icon={<FileText size={24} />} step="2" title="Submit Information" description="Provide your details and upload supporting documents through our guided process." delay={0.85} />
              <StepCard icon={<Users size={24} />} step="3" title="Receive Package" description="Get your professionally assembled, submission-ready document package." delay={1.0} />
            </div>
          </section>

          {/* ── DIVIDER ── */}
          <GoldDivider mt={0} mb={48} />

          {/* ── CONSULTATION CTA ── */}
          <section aria-labelledby="consult-heading" style={{ animation: "fadeSlideUp 0.8s ease-out 0.8s both" }}>
            <div className="card" style={{
              textAlign: "center", padding: "52px 44px",
              background: "linear-gradient(180deg, rgba(35,40,32,0.5) 0%, rgba(26,31,25,0.7) 100%)",
              border: "1px solid rgba(154,184,122,0.1)", position: "relative", overflow: "hidden",
            }}>
              <div aria-hidden="true" style={{
                position: "absolute", top: "40%", left: "50%", transform: "translate(-50%, -50%)",
                width: 280, height: 280, borderRadius: "50%",
                background: "radial-gradient(circle, rgba(74,120,54,0.08) 0%, transparent 70%)", pointerEvents: "none",
              }} />
              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{
                  width: 56, height: 56, borderRadius: 16, margin: "0 auto 20px",
                  background: "rgba(200,168,78,0.08)", border: "1px solid rgba(200,168,78,0.15)",
                  display: "flex", alignItems: "center", justifyContent: "center", color: "var(--c-gold)",
                }}><MessageCircle size={24} /></div>
                <h2 id="consult-heading" style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 400, color: "var(--c-text)", marginBottom: 10, letterSpacing: "-0.01em" }}>
                  Need Help Understanding Your Options?
                </h2>
                <p style={{ fontSize: 15, color: "var(--c-text-muted)", lineHeight: 1.75, maxWidth: 520, margin: "0 auto 32px", fontFamily: "var(--font-body)" }}>
                  Whether your loan is in Treasury Cross-Servicing or you've received a collection notice,
                  we can help you understand the next steps.
                </p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
                  <a href="/contact" className="cta-btn" aria-label="Book a free consultation">Free Consultation <ChevronRight size={18} /></a>
                  <a href="/consultation" className="cta-btn-secondary" aria-label="Book a paid consultation">Paid Consultation <ExternalLink size={16} /></a>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginTop: 24, flexWrap: "wrap" }}>
                  <span className="trust-pill"><Shield size={12} /> SBA Servicing Expertise</span>
                  <span className="trust-pill"><Star size={12} /> Human Specialist</span>
                </div>
              </div>
            </div>
          </section>

        </main>
      </div>
    </>
  );
}