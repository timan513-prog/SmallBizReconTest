import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, Download, Monitor, Package, CircleCheck as CheckCircle, FolderOpen, ExternalLink, ShieldCheck, Sparkles, Lock, ChevronRight, Zap, Award, Sun, Moon, Mail } from 'lucide-react';

import { TOOLKIT_TYPES, setUnlockedToolkit } from '../../utils/codeValidation';

type Variant = '7a' | '504';

const THEMES = {
  dark: {
    '--bg-primary': '#0e100c',
    '--bg-secondary': 'rgba(20, 24, 16, 0.65)',
    '--bg-card': 'rgba(22, 26, 18, 0.7)',
    '--bg-card-hover': 'rgba(30, 36, 24, 0.8)',
    '--bg-hero': 'linear-gradient(170deg, rgba(40,52,28,0.85) 0%, rgba(14,16,12,0.98) 100%)',
    '--border-primary': 'rgba(200, 168, 78, 0.08)',
    '--border-hover': 'rgba(200, 168, 78, 0.28)',
    '--border-gold': 'rgba(200, 168, 78, 0.2)',
    '--text-primary': '#eaf0e4',
    '--text-secondary': '#8a9878',
    '--text-muted': '#5a6a4e',
    '--accent-green': '#7ea85e',
    '--accent-gold': '#cda349',
    '--accent-gold-dim': 'rgba(200,168,78,0.15)',
    '--glass-blur': 'blur(28px)',
    '--shadow-card': '0 4px 40px rgba(0,0,0,0.25)',
    '--shadow-card-hover': '0 28px 72px rgba(0,0,0,0.4)',
    '--shadow-gold': '0 0 60px rgba(200,168,78,0.08)',
    '--grid-opacity': '0.025',
    '--particle-opacity': '0.2',
    '--overlay-green': 'rgba(74,120,54,0.06)',
    '--overlay-gold': 'rgba(200,168,78,0.03)',
  },
  light: {
    '--bg-primary': '#f6f4ef',
    '--bg-secondary': 'rgba(255, 255, 255, 0.75)',
    '--bg-card': 'rgba(255, 255, 255, 0.8)',
    '--bg-card-hover': 'rgba(255, 255, 255, 0.95)',
    '--bg-hero': 'linear-gradient(170deg, #344522 0%, #1e2a16 100%)',
    '--border-primary': 'rgba(200, 168, 78, 0.12)',
    '--border-hover': 'rgba(200, 168, 78, 0.35)',
    '--border-gold': 'rgba(200, 168, 78, 0.2)',
    '--text-primary': '#1a2e12',
    '--text-secondary': '#5a6b52',
    '--text-muted': '#8a9680',
    '--accent-green': '#4a7836',
    '--accent-gold': '#9a7a28',
    '--accent-gold-dim': 'rgba(200,168,78,0.1)',
    '--glass-blur': 'blur(22px)',
    '--shadow-card': '0 4px 28px rgba(0,0,0,0.07)',
    '--shadow-card-hover': '0 24px 56px rgba(0,0,0,0.12)',
    '--shadow-gold': '0 0 48px rgba(200,168,78,0.06)',
    '--grid-opacity': '0.035',
    '--particle-opacity': '0.12',
    '--overlay-green': 'rgba(74,120,54,0.03)',
    '--overlay-gold': 'rgba(200,168,78,0.02)',
  },
};

function PremiumGrid({ id }: { id: string }) {
  return (
    <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0, opacity: 'var(--grid-opacity)' }}>
      <svg width="100%" height="100%">
        <defs>
          <pattern id={`${id}Grid`} width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="var(--accent-gold)" strokeWidth="0.4" />
          </pattern>
          <pattern id={`${id}GridDiag`} width="96" height="96" patternUnits="userSpaceOnUse">
            <path d="M 0 96 L 96 0" fill="none" stroke="var(--accent-gold)" strokeWidth="0.2" opacity="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${id}Grid)`} />
        <rect width="100%" height="100%" fill={`url(#${id}GridDiag)`} />
      </svg>
    </div>
  );
}

function PremiumParticles() {
  return (
    <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
      {Array.from({ length: 24 }).map((_, i) => {
        const isGold = i % 3 === 0;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: `${1.2 + Math.random() * 2.8}px`,
              height: `${1.2 + Math.random() * 2.8}px`,
              borderRadius: '50%',
              background: isGold ? `rgba(200, 168, 78, var(--particle-opacity))` : `rgba(154, 184, 122, calc(var(--particle-opacity) * 0.6))`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `pFloat ${8 + Math.random() * 16}s ease-in-out infinite`,
              animationDelay: `${Math.random() * -14}s`,
              boxShadow: isGold ? '0 0 6px rgba(200,168,78,0.3)' : 'none',
            }}
          />
        );
      })}
    </div>
  );
}

const AccessCard: React.FC<{
  icon: React.ReactNode;
  iconBg: string;
  iconBorder: string;
  title: string;
  description: string;
  accentColor: string;
  actionElement: React.ReactNode;
  badge?: string;
  index: number;
}> = ({ icon, iconBg, iconBorder, title, description, accentColor, actionElement, badge, index }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--bg-card)',
        backdropFilter: 'var(--glass-blur)',
        WebkitBackdropFilter: 'var(--glass-blur)',
        border: `1px solid ${hovered ? 'var(--border-hover)' : 'var(--border-primary)'}`,
        borderRadius: 24,
        padding: 32,
        boxShadow: hovered ? 'var(--shadow-card-hover)' : 'var(--shadow-card)',
        transform: hovered ? 'translateY(-8px) scale(1.015)' : 'translateY(0) scale(1)',
        transition: 'all 0.6s cubic-bezier(0.23,1,0.32,1)',
        display: 'flex',
        flexDirection: 'column',
        minHeight: 360,
        animation: `fadeSlideIn 0.6s ease-out ${0.3 + index * 0.08}s both`,
      }}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, width: 4, height: '100%', background: `linear-gradient(180deg, ${accentColor}, ${accentColor}33)`, opacity: hovered ? 1 : 0.5, transition: 'opacity 0.4s ease' }} />
      <div style={{ position: 'absolute', top: -100, right: -100, width: 220, height: 220, borderRadius: '50%', background: `radial-gradient(circle, ${accentColor}20, transparent 65%)`, opacity: hovered ? 0.5 : 0, transition: 'opacity 0.6s ease' }} />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${accentColor}44, transparent)`, opacity: hovered ? 1 : 0.2, transition: 'opacity 0.4s ease' }} />

      <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <div style={{ width: 56, height: 56, borderRadius: 18, background: iconBg, border: `1px solid ${iconBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s ease' }}>
            {icon}
          </div>
          {badge && (
            <span style={{ fontSize: 10, fontWeight: 700, padding: '4px 12px', borderRadius: 8, background: 'var(--accent-gold-dim)', border: '1px solid var(--border-gold)', color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'var(--font-body)' }}>
              {badge}
            </span>
          )}
        </div>

        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 400, color: 'var(--text-primary)', lineHeight: 1.3, marginBottom: 12 }}>
          {title}
        </h3>

        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.65, fontFamily: 'var(--font-body)', flex: 1, marginBottom: 24 }}>
          {description}
        </p>

        <div style={{ marginTop: 'auto' }}>{actionElement}</div>
      </div>
    </div>
  );
};

const PremiumButton: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  to?: string;
  accentColor: string;
  variant?: 'filled' | 'outline';
  icon?: React.ReactNode;
  disabled?: boolean;
}> = ({ children, onClick, href, to, accentColor, variant = 'filled', icon, disabled }) => {
  const baseStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: '13px 24px',
    borderRadius: 14,
    fontSize: 14,
    fontWeight: 600,
    fontFamily: 'var(--font-body)',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    cursor: disabled ? 'not-allowed' : 'pointer',
    width: '100%',
    opacity: disabled ? 0.5 : 1,
    ...(variant === 'filled'
      ? { background: `linear-gradient(135deg, ${accentColor}66, ${accentColor}33)`, border: `1px solid ${accentColor}88`, color: 'var(--text-primary)' }
      : { background: 'transparent', border: '1px solid var(--border-primary)', color: 'var(--text-primary)' }),
  };

  if (disabled) {
    return <button type="button" disabled style={baseStyle}>{icon}{children}</button>;
  }

  if (to) {
    return <Link to={to} style={baseStyle}>{icon}{children}</Link>;
  }

  if (href) {
    return <a href={href} target="_blank" rel="noopener noreferrer" style={baseStyle}>{icon}{children}</a>;
  }

  return <button type="button" onClick={onClick} style={baseStyle}>{icon}{children}</button>;
};

interface VariantConfig {
  title: string;
  subtitle: string;
  description: string;
  backRoute: string;
  backLabel: string;
  toolkitType: string;
  formsRoute: string;
  templatesRoute: string;
  interactiveGuideUrl: string;
  premiumPdfUrl: string;
  printablePdfUrl: string;
  checklistUrl: string;
  loanLabel: string;
  gridId: string;
}

const VARIANT_CONFIG: Record<Variant, VariantConfig> = {
  '7a': {
    title: 'SBA 7(a) Loan',
    subtitle: 'Application Toolkit',
    description: 'Your complete guide to navigating the SBA 7(a) loan application process with confidence. All materials included with lifetime access.',
    backRoute: '/sba-7a',
    backLabel: 'Back to 7(a) Toolkit',
    toolkitType: 'SBA_7A',
    formsRoute: '/access/sba-7a/forms',
    templatesRoute: '/access/sba-7a/templates',
    interactiveGuideUrl: '',
    premiumPdfUrl: '',
    printablePdfUrl: '',
    checklistUrl: '',
    loanLabel: '7(a)',
    gridId: 'sba7a',
  },
  '504': {
    title: 'SBA 504 Loan',
    subtitle: 'Application Toolkit',
    description: 'Your complete guide to navigating the SBA 504 loan application process with confidence. All materials included with lifetime access.',
    backRoute: '/sba-504',
    backLabel: 'Back to 504 Toolkit',
    toolkitType: 'SBA_504',
    formsRoute: '/access/sba-504/forms',
    templatesRoute: '/access/sba-504/templates',
    interactiveGuideUrl: '',
    premiumPdfUrl: '',
    printablePdfUrl: '',
    checklistUrl: '',
    loanLabel: '504',
    gridId: 'sba504',
  },
};

export default function SBALoanAccess({ variant }: { variant: Variant }) {
  const [theme, setTheme] = useState('dark');
  const isDark = theme === 'dark';
  const vars = THEMES[theme as keyof typeof THEMES];
  const cssVarString = Object.entries(vars).map(([k, v]) => `${k}: ${v};`).join('\n');

  const config = VARIANT_CONFIG[variant];

  useEffect(() => {
    if (config.toolkitType === 'SBA_7A' && TOOLKIT_TYPES.SBA_7A) {
      setUnlockedToolkit(TOOLKIT_TYPES.SBA_7A);
    } else if (config.toolkitType === 'SBA_504' && TOOLKIT_TYPES.SBA_504) {
      setUnlockedToolkit(TOOLKIT_TYPES.SBA_504);
    }
  }, [config.toolkitType]);

  return (
    <>
      <style>{`
        :root {
          --font-display: 'Instrument Serif', Georgia, serif;
          --font-body: 'DM Sans', sans-serif;
          ${cssVarString}
        }
        @keyframes pFloat { 0%, 100% { transform: translate(0,0) scale(1); opacity:0.3; } 25% { transform: translate(14px,-20px) scale(1.18); opacity:0.65; } 50% { transform: translate(-10px,-34px) scale(0.82); opacity:0.18; } 75% { transform: translate(18px,-14px) scale(1.1); opacity:0.5; } }
        @keyframes fadeSlideUp { from { opacity:0; transform:translateY(32px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeSlideIn { from { opacity:0; transform:translateY(22px); } to { opacity:1; transform:translateY(0); } }
        @keyframes goldPulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 0.8; } }
        @keyframes shimmerSlide { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        * { box-sizing: border-box; }
        .sba-loan-page { min-height: 100vh; font-family: var(--font-body); background: var(--bg-primary); color: var(--text-primary); overflow-x: hidden; position: relative; transition: background 0.5s ease, color 0.4s ease; }
        .sba-loan-page::before { content: ''; position: fixed; inset: 0; background: radial-gradient(ellipse 60% 45% at 25% 10%, var(--overlay-gold), transparent), radial-gradient(ellipse 55% 40% at 75% 90%, var(--overlay-green), transparent); pointer-events: none; z-index: 0; transition: background 0.5s ease; }
        .sba-loan-page a { color: inherit; }
        @media (max-width: 768px) { .sba-loan-hero-title { font-size: 30px !important; } .sba-loan-hero-inner { padding: 36px 16px 48px !important; } .sba-loan-cards-grid { grid-template-columns: 1fr !important; } }
      `}</style>

      <div className="sba-loan-page">
        <PremiumGrid id={config.gridId} />
        <PremiumParticles />

        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* HERO */}
          <div style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg-hero)', borderBottom: '1px solid var(--border-gold)', animation: 'fadeSlideUp 0.7s ease-out both' }}>
            <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%, -50%)', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(200,168,78,0.1) 0%, transparent 55%)', pointerEvents: 'none', animation: 'goldPulse 6s ease-in-out infinite' }} />

            <div className="sba-loan-hero-inner" style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 32px 72px', position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 56 }}>
                <Link to={config.backRoute} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#c8e0b4', fontSize: 14, fontWeight: 600, textDecoration: 'none', fontFamily: 'var(--font-body)', transition: 'color 0.3s ease' }}>
                  <ArrowLeft size={16} />{config.backLabel}
                </Link>
                <button type="button" onClick={() => setTheme(isDark ? 'light' : 'dark')} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 12, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)', color: '#c8e0b4', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)', transition: 'all 0.3s ease' }}>
                  {isDark ? <Sun size={14} /> : <Moon size={14} />}{isDark ? 'Light' : 'Dark'}
                </button>
              </div>

              <div style={{ width: 76, height: 76, borderRadius: 22, background: 'linear-gradient(135deg, rgba(200,168,78,0.22), rgba(200,168,78,0.06))', border: '1px solid rgba(200,168,78,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px', boxShadow: '0 0 40px rgba(200,168,78,0.1)' }}>
                <Package size={36} color="#cda349" strokeWidth={1.5} />
              </div>

              <div style={{ textAlign: 'center', marginBottom: 16 }}>
                <span style={{ padding: '5px 16px', borderRadius: 100, background: 'rgba(200,168,78,0.12)', border: '1px solid rgba(200,168,78,0.25)', fontSize: 11, fontWeight: 700, color: '#cda349', fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  ★ Premium Toolkit
                </span>
              </div>

              <h1 className="sba-loan-hero-title" style={{ fontFamily: 'var(--font-display)', fontSize: 48, fontWeight: 400, textAlign: 'center', color: '#e8ede2', lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: 16 }}>
                {config.title}{' '}
                <span style={{ fontStyle: 'italic', color: '#cda349' }}>{config.subtitle}</span>
              </h1>

              <p style={{ textAlign: 'center', fontSize: 16, color: 'rgba(232,237,226,0.6)', lineHeight: 1.75, maxWidth: 640, margin: '0 auto 28px', fontFamily: 'var(--font-body)' }}>
                {config.description}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginBottom: 32 }}>
                {[
                  { icon: <ShieldCheck size={12} />, label: 'Checklist-driven' },
                  { icon: <Sparkles size={12} />, label: '2026 Refresh' },
                  { icon: <Lock size={12} />, label: 'Lifetime Access' },
                  { icon: <Award size={12} />, label: 'Premium Materials' },
                ].map((tag, i) => (
                  <span key={i} style={{ padding: '5px 14px', borderRadius: 100, fontSize: 12, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: 'rgba(232,237,226,0.7)', fontFamily: 'var(--font-body)', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    {tag.icon}{tag.label}
                  </span>
                ))}
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
                <Link to={config.formsRoute} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '16px 36px', borderRadius: 16, background: 'linear-gradient(135deg, rgba(200,168,78,0.35), rgba(200,168,78,0.12))', border: '1px solid rgba(200,168,78,0.45)', color: '#e8ede2', fontSize: 16, fontWeight: 600, fontFamily: 'var(--font-body)', textDecoration: 'none', transition: 'all 0.3s ease', boxShadow: '0 0 30px rgba(200,168,78,0.1)' }}>
                  <FolderOpen size={18} />Browse Forms Library
                </Link>
                <Link to={config.templatesRoute} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '16px 36px', borderRadius: 16, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: '#e8ede2', fontSize: 16, fontWeight: 600, fontFamily: 'var(--font-body)', textDecoration: 'none', transition: 'all 0.3s ease' }}>
                  <FileText size={18} />View Templates
                </Link>
              </div>
            </div>
          </div>

          {/* ACCESS GRANTED BANNER */}
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 24px 0' }}>
            <div style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg-card)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)', borderRadius: 24, border: '1px solid var(--border-gold)', padding: 40, boxShadow: 'var(--shadow-gold)', animation: 'fadeSlideUp 0.7s ease-out 0.15s both', textAlign: 'center' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, overflow: 'hidden' }}>
                <div style={{ width: '50%', height: '100%', background: 'linear-gradient(90deg, transparent, rgba(200,168,78,0.4), transparent)', animation: 'shimmerSlide 4s ease-in-out infinite' }} />
              </div>
              <div style={{ position: 'absolute', top: -80, right: -80, width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(200,168,78,0.1), transparent 60%)', pointerEvents: 'none' }} />

              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginBottom: 16 }}>
                  <CheckCircle size={36} style={{ color: 'var(--accent-green)' }} />
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 400, color: 'var(--text-primary)' }}>
                    Access <span style={{ fontStyle: 'italic', color: 'var(--accent-gold)' }}>Granted</span>
                  </h2>
                </div>
                <p style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: 600, margin: '0 auto 24px', fontFamily: 'var(--font-body)' }}>
                  Welcome to your complete SBA {config.loanLabel} loan application toolkit. All materials are included with your purchase and available for lifetime access.
                </p>
                <div style={{ maxWidth: 560, margin: '0 auto', padding: '14px 20px', borderRadius: 14, background: 'var(--accent-gold-dim)', border: '1px solid var(--border-gold)' }}>
                  <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'var(--font-body)' }}>
                    Sabbi 2.0 is unlocked — tap the Sabbi button in the bottom right to ask {config.loanLabel} loan questions.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ACCESS CARDS GRID */}
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px' }}>
            <div className="sba-loan-cards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, alignItems: 'stretch' }}>
              <AccessCard
                index={0}
                title="Interactive Guide"
                description={`Step-by-step interactive walkthrough for SBA ${config.loanLabel} loan applications. Coming soon.`}
                accentColor="#5d9ecf"
                iconBg="rgba(93,158,207,0.12)"
                iconBorder="rgba(93,158,207,0.3)"
                icon={<Monitor size={26} style={{ color: '#5d9ecf' }} />}
                badge="Coming Soon"
                actionElement={
                  <PremiumButton accentColor="#5d9ecf" disabled icon={<Zap size={16} />}>
                    Coming Soon
                  </PremiumButton>
                }
              />

              <AccessCard
                index={1}
                title="PDF Pro Version"
                description={`Premium PDF guide for comprehensive insights, detailed walkthroughs, and advanced reference material for ${config.loanLabel} loans.`}
                accentColor="#cda349"
                iconBg="rgba(200,168,78,0.12)"
                iconBorder="rgba(200,168,78,0.3)"
                icon={<FileText size={26} style={{ color: '#cda349' }} />}
                badge="Coming Soon"
                actionElement={
                  <PremiumButton accentColor="#cda349" disabled icon={<Download size={16} />}>
                    Coming Soon
                  </PremiumButton>
                }
              />

              <AccessCard
                index={2}
                title="Printable PDF Guide"
                description="Offline companion guide — print-friendly, comprehensive, and designed for easy physical reference."
                accentColor="#cf5d5d"
                iconBg="rgba(207,93,93,0.12)"
                iconBorder="rgba(207,93,93,0.3)"
                icon={<FileText size={26} style={{ color: '#cf5d5d' }} />}
                actionElement={
                  <PremiumButton accentColor="#cf5d5d" disabled icon={<Download size={16} />}>
                    Coming Soon
                  </PremiumButton>
                }
              />

              <AccessCard
                index={3}
                title="Application Checklist"
                description="Ensure your application packet is complete and ready for submission. Comprehensive checklist for all required documents."
                accentColor="#5daa5d"
                iconBg="rgba(93,170,93,0.12)"
                iconBorder="rgba(93,170,93,0.3)"
                icon={<FileText size={26} style={{ color: '#5daa5d' }} />}
                badge="Coming Soon"
                actionElement={
                  <PremiumButton accentColor="#5daa5d" disabled icon={<Download size={16} />}>
                    Coming Soon
                  </PremiumButton>
                }
              />

              <AccessCard
                index={4}
                title="Templates & Docs"
                description={`Professional templates to accelerate your ${config.loanLabel} loan application process. Sample letters, cover sheets, and more.`}
                accentColor="#9e7ec8"
                iconBg="rgba(158,126,200,0.12)"
                iconBorder="rgba(158,126,200,0.3)"
                icon={<Mail size={26} style={{ color: '#9e7ec8' }} />}
                actionElement={
                  <PremiumButton to={config.templatesRoute} accentColor="#9e7ec8" variant="outline" icon={<FileText size={16} />}>
                    View Templates
                  </PremiumButton>
                }
              />

              <AccessCard
                index={5}
                title="Advanced Forms Library"
                description={`View all required SBA ${config.loanLabel} loan forms categorized by usage — ready-to-use and professionally formatted.`}
                accentColor="#e0943d"
                iconBg="rgba(224,148,61,0.12)"
                iconBorder="rgba(224,148,61,0.3)"
                icon={<FolderOpen size={26} style={{ color: '#e0943d' }} />}
                actionElement={
                  <PremiumButton to={config.formsRoute} accentColor="#e0943d" icon={<ChevronRight size={16} />}>
                    View Forms
                  </PremiumButton>
                }
              />
            </div>
          </div>

          {/* FORMS & TEMPLATES CTA */}
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px 40px' }}>
            <div style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg-card)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)', borderRadius: 24, border: '1px solid var(--border-primary)', padding: 48, boxShadow: 'var(--shadow-card)', textAlign: 'center', animation: 'fadeSlideUp 0.7s ease-out 0.6s both' }}>
              <div style={{ position: 'absolute', top: -100, left: '50%', transform: 'translateX(-50%)', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(200,168,78,0.06) 0%, transparent 55%)', pointerEvents: 'none' }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ width: 64, height: 64, borderRadius: 20, background: 'linear-gradient(135deg, rgba(200,168,78,0.15), rgba(200,168,78,0.05))', border: '1px solid rgba(200,168,78,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                  <FolderOpen size={28} style={{ color: 'var(--accent-gold)' }} />
                </div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 400, color: 'var(--text-primary)', marginBottom: 12 }}>
                  SBA {config.loanLabel}{' '}
                  <span style={{ fontStyle: 'italic', color: 'var(--accent-gold)' }}>Forms & Templates</span>
                </h2>
                <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: 500, margin: '0 auto 28px', fontFamily: 'var(--font-body)' }}>
                  Access the complete library of required forms and professional templates for your {config.loanLabel} loan application.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
                  <Link to={config.formsRoute} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '14px 32px', borderRadius: 14, background: 'linear-gradient(135deg, rgba(200,168,78,0.3), rgba(200,168,78,0.1))', border: '1px solid rgba(200,168,78,0.4)', color: 'var(--text-primary)', fontSize: 15, fontWeight: 600, fontFamily: 'var(--font-body)', textDecoration: 'none', transition: 'all 0.3s ease' }}>
                    <FolderOpen size={18} />Browse Forms Library
                  </Link>
                  <Link to={config.templatesRoute} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '14px 32px', borderRadius: 14, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-primary)', fontSize: 15, fontWeight: 600, fontFamily: 'var(--font-body)', textDecoration: 'none', transition: 'all 0.3s ease' }}>
                    <FileText size={18} />View Templates
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* DISCLAIMER */}
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px 80px' }}>
            <div style={{ padding: 24, borderRadius: 16, background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', animation: 'fadeSlideUp 0.7s ease-out 0.8s both' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--accent-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                  <ShieldCheck size={13} style={{ color: '#fff' }} />
                </div>
                <div>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 16, color: 'var(--text-primary)', marginBottom: 8 }}>Important Disclaimer</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.7, fontFamily: 'var(--font-body)' }}>
                    SmallBiz Recon is an independent educational resource and is not affiliated with, endorsed by, or connected to any government agency. All information is provided for educational and informational purposes only. Always consult with qualified professionals and verify all information with official sources before making any decisions.
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
