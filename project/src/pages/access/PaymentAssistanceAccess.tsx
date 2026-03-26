import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download, FileText, Package, CircleCheck as CheckCircle, Users, ShieldCheck, Sparkles, Lock, Sun, Moon, CircleAlert as AlertCircle, Bot, BookOpen, Play } from 'lucide-react';

import { TOOLKIT_TYPES, setUnlockedToolkit } from '../../utils/codeValidation';

/* ──────────────────────────────────────────────
   THEME SYSTEM
   Midnight Black base, Army Gold + Dark Ranger Green accents
   ────────────────────────────────────────────── */

const THEMES = {
  dark: {
    '--bg-primary': '#0a0a08',
    '--bg-secondary': 'rgba(16, 16, 12, 0.65)',
    '--bg-card': 'rgba(18, 18, 14, 0.72)',
    '--bg-card-hover': 'rgba(26, 26, 20, 0.82)',
    '--bg-hero': 'linear-gradient(170deg, rgba(32,38,18,0.88) 0%, rgba(10,10,8,0.98) 100%)',
    '--border-primary': 'rgba(181, 148, 56, 0.08)',
    '--border-hover': 'rgba(181, 148, 56, 0.3)',
    '--border-gold': 'rgba(181, 148, 56, 0.2)',
    '--text-primary': '#eae8e0',
    '--text-secondary': '#8a8a72',
    '--text-muted': '#5a5a48',
    '--accent-green': '#4a6b2a',
    '--accent-green-bright': '#6a9240',
    '--accent-gold': '#b59438',
    '--accent-gold-dim': 'rgba(181,148,56,0.15)',
    '--glass-blur': 'blur(28px)',
    '--shadow-card': '0 4px 40px rgba(0,0,0,0.3)',
    '--shadow-card-hover': '0 28px 72px rgba(0,0,0,0.5)',
    '--shadow-gold': '0 0 60px rgba(181,148,56,0.06)',
    '--grid-opacity': '0.02',
    '--particle-opacity': '0.18',
    '--overlay-green': 'rgba(74,107,42,0.05)',
    '--overlay-gold': 'rgba(181,148,56,0.025)',
  },
  light: {
    '--bg-primary': '#f5f3ed',
    '--bg-secondary': 'rgba(255, 255, 255, 0.75)',
    '--bg-card': 'rgba(255, 255, 255, 0.8)',
    '--bg-card-hover': 'rgba(255, 255, 255, 0.95)',
    '--bg-hero': 'linear-gradient(170deg, #2a3418 0%, #1a1e10 100%)',
    '--border-primary': 'rgba(181, 148, 56, 0.12)',
    '--border-hover': 'rgba(181, 148, 56, 0.35)',
    '--border-gold': 'rgba(181, 148, 56, 0.2)',
    '--text-primary': '#1a1e10',
    '--text-secondary': '#5a5e48',
    '--text-muted': '#8a8e78',
    '--accent-green': '#3a5420',
    '--accent-green-bright': '#4a6b2a',
    '--accent-gold': '#8a6e20',
    '--accent-gold-dim': 'rgba(181,148,56,0.1)',
    '--glass-blur': 'blur(22px)',
    '--shadow-card': '0 4px 28px rgba(0,0,0,0.07)',
    '--shadow-card-hover': '0 24px 56px rgba(0,0,0,0.12)',
    '--shadow-gold': '0 0 48px rgba(181,148,56,0.05)',
    '--grid-opacity': '0.03',
    '--particle-opacity': '0.1',
    '--overlay-green': 'rgba(74,107,42,0.03)',
    '--overlay-gold': 'rgba(181,148,56,0.02)',
  },
};

/* ──────────────────────────────────────────────
   AMBIENT EFFECTS
   ────────────────────────────────────────────── */

function PremiumGrid() {
  return (
    <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0, opacity: 'var(--grid-opacity)' }}>
      <svg width="100%" height="100%">
        <defs>
          <pattern id="paGrid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="var(--accent-gold)" strokeWidth="0.4" />
          </pattern>
          <pattern id="paGridDiag" width="96" height="96" patternUnits="userSpaceOnUse">
            <path d="M 0 96 L 96 0" fill="none" stroke="var(--accent-gold)" strokeWidth="0.2" opacity="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#paGrid)" />
        <rect width="100%" height="100%" fill="url(#paGridDiag)" />
      </svg>
    </div>
  );
}

function PremiumParticles() {
  return (
    <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
      {Array.from({ length: 22 }).map((_, i) => {
        const isGold = i % 3 === 0;
        return (
          <div key={i} style={{
            position: 'absolute',
            width: `${1.2 + Math.random() * 2.8}px`,
            height: `${1.2 + Math.random() * 2.8}px`,
            borderRadius: '50%',
            background: isGold
              ? `rgba(181, 148, 56, var(--particle-opacity))`
              : `rgba(106, 146, 64, calc(var(--particle-opacity) * 0.5))`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `pFloat ${8 + Math.random() * 16}s ease-in-out infinite`,
            animationDelay: `${Math.random() * -14}s`,
            boxShadow: isGold ? '0 0 6px rgba(181,148,56,0.25)' : 'none',
          }} />
        );
      })}
    </div>
  );
}

/* ──────────────────────────────────────────────
   PREMIUM RESOURCE CARD
   ────────────────────────────────────────────── */

const PremiumResourceCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  accent: string;
  badge?: string;
  index: number;
  children: React.ReactNode;
}> = ({ icon, title, description, accent, badge, index, children }) => {
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
        borderRadius: 20,
        padding: 28,
        boxShadow: hovered ? 'var(--shadow-card-hover)' : 'var(--shadow-card)',
        transform: hovered ? 'translateY(-6px) scale(1.015)' : 'translateY(0) scale(1)',
        transition: 'all 0.6s cubic-bezier(0.23,1,0.32,1)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        animation: `fadeSlideIn 0.5s ease-out ${0.1 + index * 0.06}s both`,
      }}
    >
      {/* Left accent bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, width: 4, height: '100%',
        background: `linear-gradient(180deg, ${accent}, ${accent}44)`,
        opacity: hovered ? 1 : 0.5,
        transition: 'opacity 0.4s ease',
      }} />

      {/* Hover glow */}
      <div style={{
        position: 'absolute', top: -80, right: -80, width: 180, height: 180,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${accent}22, transparent 65%)`,
        opacity: hovered ? 0.5 : 0,
        transition: 'opacity 0.6s ease',
      }} />

      {/* Top shimmer */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: `linear-gradient(90deg, transparent, ${accent}44, transparent)`,
        opacity: hovered ? 1 : 0.2,
        transition: 'opacity 0.4s ease',
      }} />

      <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Icon + badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <div style={{
            width: 48, height: 48, borderRadius: 14,
            background: `linear-gradient(135deg, ${accent}33, ${accent}11)`,
            border: `1px solid ${accent}44`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            {icon}
          </div>
          {badge && (
            <span style={{
              fontSize: 10, fontWeight: 700, padding: '3px 10px',
              borderRadius: 6,
              background: 'rgba(181,148,56,0.12)',
              border: '1px solid rgba(181,148,56,0.25)',
              color: 'var(--accent-gold)',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-body)',
              letterSpacing: '0.06em',
            }}>
              {badge}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 20, fontWeight: 400,
          color: 'var(--text-primary)',
          lineHeight: 1.3, marginBottom: 8,
        }}>
          {title}
        </h3>

        {/* Description */}
        <p style={{
          fontSize: 13, color: 'var(--text-secondary)',
          lineHeight: 1.65, fontFamily: 'var(--font-body)',
          flex: 1, marginBottom: 20,
        }}>
          {description}
        </p>

        {/* Slot for buttons */}
        <div style={{ marginTop: 'auto' }}>
          {children}
        </div>
      </div>
    </div>
  );
};

/* ──────────────────────────────────────────────
   BUTTON HELPERS
   ────────────────────────────────────────────── */

const filledButtonStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
  width: '100%',
  padding: '13px 20px',
  borderRadius: 12,
  fontSize: 13,
  fontWeight: 600,
  fontFamily: 'var(--font-body)',
  textDecoration: 'none',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  background: 'linear-gradient(135deg, rgba(74,107,42,0.4), rgba(74,107,42,0.15))',
  border: '1px solid rgba(74,107,42,0.5)',
  color: 'var(--text-primary)',
};

const goldButtonStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
  width: '100%',
  padding: '13px 20px',
  borderRadius: 12,
  fontSize: 13,
  fontWeight: 600,
  fontFamily: 'var(--font-body)',
  textDecoration: 'none',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  background: 'linear-gradient(135deg, rgba(181,148,56,0.3), rgba(181,148,56,0.1))',
  border: '1px solid rgba(181,148,56,0.4)',
  color: 'var(--text-primary)',
};

/* ──────────────────────────────────────────────
   MAIN PAGE
   ────────────────────────────────────────────── */

const PaymentAssistanceAccess: React.FC = () => {
  const [theme, setTheme] = useState('dark');
  const isDark = theme === 'dark';
  const vars = THEMES[theme as keyof typeof THEMES];
  const cssVarString = Object.entries(vars).map(([k, v]) => `${k}: ${v};`).join('\n');

  const urls = {
    pdfProGuide: 'https://zrktinvphjmalvrsjmii.supabase.co/storage/v1/object/sign/SmallBiz%20Recon%20Paid%20Templates/COVID_EIDL_Payment_Assistance_-_Black_Label_Elite_Guide_(18_Pages)%20(1).pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xZmUwNzEzYS00ZTVhLTQ3ZWYtODNlNS0xYjgxOWVlMjk2NzgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJTbWFsbEJpeiBSZWNvbiBQYWlkIFRlbXBsYXRlcy9DT1ZJRF9FSURMX1BheW1lbnRfQXNzaXN0YW5jZV8tX0JsYWNrX0xhYmVsX0VsaXRlX0d1aWRlXygxOF9QYWdlcykgKDEpLnBkZiIsImlhdCI6MTc3MjAxMzE4OCwiZXhwIjoxODMwMjQ2Nzg4fQ.GqKDMEBmkXDvuLkcEeB4rI9QED7v1ZMgr-FKFJkM2iQ',
    downloadablePdfGuide: 'https://zrktinvphjmalvrsjmii.supabase.co/storage/v1/object/sign/SmallBiz%20Recon%20Paid%20Templates/SMALLBIZRECONPAYMENTASSISTANCE.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xZmUwNzEzYS00ZTVhLTQ3ZWYtODNlNS0xYjgxOWVlMjk2NzgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJTbWFsbEJpeiBSZWNvbiBQYWlkIFRlbXBsYXRlcy9TTUFMTEJJWlJFQ09OUEFZTUVOVEFTU0lTVEFOQ0UucGRmIiwiaWF0IjoxNzcyMDEwOTYyLCJleHAiOjE4MzAyNDQ1NjJ9.D1CeO7ivy0rFfLc6oggDBjrJR5a4G19U4gmulB3fUyY',
    templates: 'https://zrktinvphjmalvrsjmii.supabase.co/storage/v1/object/sign/SmallBiz%20Recon%20Paid%20Templates/PAYMENT_ASSISTANCE_REQUEST_EXAMPLES.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xZmUwNzEzYS00ZTVhLTQ3ZWYtODNlNS0xYjgxOWVlMjk2NzgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJTbWFsbEJpeiBSZWNvbiBQYWlkIFRlbXBsYXRlcy9QQVlNRU5UX0FTU0lTVEFOQ0VfUkVRVUVTVF9FWEFNUExFUy5wZGYiLCJpYXQiOjE3NzIwMTA4NjQsImV4cCI6MTgzMDI0NDQ2NH0.B1n3icvj-spfaMdLLqRm6-pjZ7aFEViOd0ioOuquCDU',
    tracker: 'https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/sign/SMALLBIZ%20RECON/SBA%20Interactive%20Contact%20Log%202.0%20(2026).xlsx?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85MzZjNmFmNC1iMzA2LTQzMmMtYWFjNy03ZmRmYjU1NDRjMzUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJTTUFMTEJJWiBSRUNPTi9TQkEgSW50ZXJhY3RpdmUgQ29udGFjdCBMb2cgMi4wICgyMDI2KS54bHN4IiwiaWF0IjoxNzY5ODgyNDEwLCJleHAiOjE4NjE4OTg0MTB9.tKzAlu5Kx070zeglr8pxBTLVUMqrwT3p7NMkXNsdsps',
  };

  useEffect(() => {
    setUnlockedToolkit(TOOLKIT_TYPES.PAYMENT_ASSISTANCE);
  }, []);

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
          25% { transform: translate(14px,-20px) scale(1.18); opacity:0.65; }
          50% { transform: translate(-10px,-34px) scale(0.82); opacity:0.18; }
          75% { transform: translate(18px,-14px) scale(1.1); opacity:0.5; }
        }
        @keyframes fadeSlideUp {
          from { opacity:0; transform:translateY(32px); }
          to { opacity:1; transform:translateY(0); }
        }
        @keyframes fadeSlideIn {
          from { opacity:0; transform:translateY(22px); }
          to { opacity:1; transform:translateY(0); }
        }
        @keyframes goldPulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
        @keyframes shimmerSlide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes textReveal {
          from { opacity: 0; transform: translateY(16px); filter: blur(4px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }

        * { box-sizing: border-box; }

        .pa-access-page {
          min-height: 100vh;
          font-family: var(--font-body);
          background: var(--bg-primary);
          color: var(--text-primary);
          overflow-x: hidden;
          position: relative;
          transition: background 0.5s ease, color 0.4s ease;
        }
        .pa-access-page::before {
          content: '';
          position: fixed;
          inset: 0;
          background:
            radial-gradient(ellipse 60% 45% at 25% 10%, var(--overlay-gold), transparent),
            radial-gradient(ellipse 55% 40% at 75% 90%, var(--overlay-green), transparent);
          pointer-events: none;
          z-index: 0;
          transition: background 0.5s ease;
        }
        .pa-access-page a { color: inherit; }

        @media (max-width: 768px) {
          .pa-hero-title { font-size: 28px !important; }
          .pa-hero-inner { padding: 36px 16px 48px !important; }
          .pa-cards-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div className="pa-access-page">
        <PremiumGrid />
        <PremiumParticles />

        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* ═══════════ HERO ═══════════ */}
          <div style={{
            position: 'relative',
            overflow: 'hidden',
            background: 'var(--bg-hero)',
            borderBottom: '1px solid var(--border-gold)',
            animation: 'fadeSlideUp 0.7s ease-out both',
          }}>
            {/* Gold radial glow */}
            <div style={{
              position: 'absolute', top: '30%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 450, height: 450, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(181,148,56,0.07) 0%, transparent 55%)',
              pointerEvents: 'none',
              animation: 'goldPulse 6s ease-in-out infinite',
            }} />

            <div className="pa-hero-inner" style={{
              maxWidth: 1200, margin: '0 auto', padding: '48px 32px 72px',
              position: 'relative', zIndex: 1,
            }}>
              {/* Top bar */}
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                marginBottom: 48,
              }}>
                <Link
                  to="/covid-eidl-toolkits"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    color: '#a0b888', fontSize: 14, fontWeight: 600,
                    textDecoration: 'none', fontFamily: 'var(--font-body)',
                    transition: 'color 0.3s ease',
                  }}
                >
                  <ArrowLeft size={16} />
                  Back to COVID EIDL Toolkits
                </Link>
                <button
                  type="button"
                  onClick={() => setTheme(isDark ? 'light' : 'dark')}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    padding: '8px 16px', borderRadius: 12,
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: '#a0b888', fontSize: 13, fontWeight: 600,
                    cursor: 'pointer', fontFamily: 'var(--font-body)',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {isDark ? <Sun size={14} /> : <Moon size={14} />}
                  {isDark ? 'Light' : 'Dark'}
                </button>
              </div>

              {/* Icon */}
              <div style={{
                width: 72, height: 72, borderRadius: 20,
                background: 'linear-gradient(135deg, rgba(181,148,56,0.2), rgba(181,148,56,0.05))',
                border: '1px solid rgba(181,148,56,0.28)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 24px',
                boxShadow: '0 0 40px rgba(181,148,56,0.06)',
                animation: 'textReveal 0.6s ease-out 0.2s both',
              }}>
                <Package size={34} color="#b59438" strokeWidth={1.5} />
              </div>

              {/* Badge */}
              <div style={{ textAlign: 'center', marginBottom: 14, animation: 'textReveal 0.5s ease-out 0.25s both' }}>
                <span style={{
                  padding: '5px 16px', borderRadius: 100,
                  background: 'rgba(181,148,56,0.1)',
                  border: '1px solid rgba(181,148,56,0.22)',
                  fontSize: 11, fontWeight: 700,
                  color: '#b59438', fontFamily: 'var(--font-body)',
                  textTransform: 'uppercase', letterSpacing: '0.1em',
                }}>
                  ★ Best Value Toolkit
                </span>
              </div>

              <h1 className="pa-hero-title" style={{
                fontFamily: 'var(--font-display)',
                fontSize: 46, fontWeight: 400,
                textAlign: 'center', color: '#eae8e0',
                lineHeight: 1.15, letterSpacing: '-0.02em',
                marginBottom: 16,
                animation: 'textReveal 0.6s ease-out 0.3s both',
              }}>
                COVID EIDL{' '}
                <span style={{ fontStyle: 'italic', color: '#b59438' }}>Payment Assistance</span>
                {' '}Toolkit
              </h1>

              <p style={{
                textAlign: 'center', fontSize: 16,
                color: 'rgba(234,232,224,0.55)',
                lineHeight: 1.75, maxWidth: 620, margin: '0 auto 28px',
                fontFamily: 'var(--font-body)',
                animation: 'textReveal 0.6s ease-out 0.35s both',
              }}>
                Your complete DIY guide for requesting payment assistance (formerly hardship accommodation) for your COVID EIDL.
              </p>

              {/* Trust pills */}
              <div style={{
                display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center',
                animation: 'fadeSlideIn 0.5s ease-out 0.45s both',
              }}>
                {[
                  { icon: <ShieldCheck size={13} />, label: 'Step-by-Step' },
                  { icon: <Sparkles size={13} />, label: 'Premium 2026' },
                  { icon: <Lock size={13} />, label: 'Lifetime Access' },
                ].map((pill, i) => (
                  <span key={i} style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    padding: '6px 14px', borderRadius: 10,
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: '#a0b888', fontSize: 12, fontWeight: 600,
                    fontFamily: 'var(--font-body)',
                  }}>
                    {pill.icon}
                    {pill.label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ═══════════ ACCESS GRANTED PANEL ═══════════ */}
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 24px 0' }}>
            <div style={{
              position: 'relative', overflow: 'hidden',
              background: 'var(--bg-card)',
              backdropFilter: 'var(--glass-blur)',
              WebkitBackdropFilter: 'var(--glass-blur)',
              borderRadius: 24,
              border: '1px solid var(--border-gold)',
              boxShadow: 'var(--shadow-gold)',
              animation: 'fadeSlideUp 0.7s ease-out 0.15s both',
            }}>
              {/* Shimmer line */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 1,
                overflow: 'hidden', zIndex: 2,
              }}>
                <div style={{
                  width: '50%', height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(181,148,56,0.35), transparent)',
                  animation: 'shimmerSlide 4s ease-in-out infinite',
                }} />
              </div>

              <div style={{ padding: 36, textAlign: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 16 }}>
                  <CheckCircle size={36} style={{ color: 'var(--accent-green-bright)' }} />
                  <h2 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 28, fontWeight: 400,
                    color: 'var(--text-primary)',
                  }}>
                    Access{' '}
                    <span style={{ fontStyle: 'italic', color: 'var(--accent-gold)' }}>Granted</span>
                  </h2>
                </div>

                <p style={{
                  fontSize: 15, color: 'var(--text-secondary)',
                  fontFamily: 'var(--font-body)',
                  lineHeight: 1.7, maxWidth: 600, margin: '0 auto 24px',
                }}>
                  Welcome to your complete payment assistance toolkit. All materials are included with your purchase and available for lifetime access.
                </p>

                {/* Sabbi callout */}
                <div style={{
                  maxWidth: 600, margin: '0 auto 28px',
                  padding: '14px 20px', borderRadius: 14,
                  background: 'var(--accent-gold-dim)',
                  border: '1px solid var(--border-gold)',
                }}>
                  <p style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    fontSize: 14, fontWeight: 600,
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-body)',
                  }}>
                    <Bot size={18} style={{ color: 'var(--accent-gold)' }} />
                    Sabbi 2.0 is now unlocked — chat with our context-aware assistant for payment assistance guidance.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ═══════════ QUICK ACCESS CARDS ═══════════ */}
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px 0' }}>
            <div className="pa-cards-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 20,
            }}>
              {/* Interactive Guide */}
              <PremiumResourceCard
                icon={<Play size={22} color="#6a9240" />}
                title="Interactive Mission Guide"
                description="Step-by-step interactive walkthrough with a mission tracker, language bank, examples, and submission checklist."
                accent="#6a9240"
                badge="Interactive"
                index={0}
              >
                <Link
                  to="/access/payment-assistance/guide"
                  style={filledButtonStyle}
                >
                  <Play size={14} />
                  Launch Guide
                </Link>
              </PremiumResourceCard>

              {/* PDF Pro Guide */}
              <PremiumResourceCard
                icon={<FileText size={22} color="#b59438" />}
                title="PDF Pro Guide"
                description="Complete guide for requesting payment assistance with step-by-step instructions and detailed information."
                accent="#b59438"
                badge="Pro"
                index={1}
              >
                <a
                  href={urls.pdfProGuide}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={filledButtonStyle}
                >
                  <Download size={14} />
                  Download Pro Guide
                </a>
              </PremiumResourceCard>

              {/* Downloadable PDF */}
              <PremiumResourceCard
                icon={<FileText size={22} color="#6a9240" />}
                title="Downloadable PDF Guide"
                description="An additional guide with supplementary information for payment assistance requests."
                accent="#6a9240"
                index={2}
              >
                <a
                  href={urls.downloadablePdfGuide}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={filledButtonStyle}
                >
                  <Download size={14} />
                  Download PDF Guide
                </a>
              </PremiumResourceCard>

              {/* Request Templates */}
              <PremiumResourceCard
                icon={<FileText size={22} color="#b59438" />}
                title="Request Examples"
                description="User examples used for payment assistance requests and supporting documentation."
                accent="#b59438"
                badge="Examples"
                index={3}
              >
                <a
                  href={urls.templates}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={goldButtonStyle}
                >
                  <Download size={14} />
                  Download Templates
                </a>
              </PremiumResourceCard>

              {/* Timeline Tracker */}
              <PremiumResourceCard
                icon={<BookOpen size={22} color="#6a9240" />}
                title="Timeline Tracker"
                description="Track your payment assistance request progress and important deadlines."
                accent="#6a9240"
                badge="2026"
                index={4}
              >
                <a
                  href={urls.tracker}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={filledButtonStyle}
                >
                  <Download size={14} />
                  Download Tracker
                </a>
              </PremiumResourceCard>

              {/* Financial Counseling Resources */}
              <PremiumResourceCard
                icon={<Users size={22} color="#b59438" />}
                title="Financial Counseling Resources"
                description="Access external financial counseling resources and specialized forms for payment assistance."
                accent="#b59438"
                index={5}
              >
                <Link
                  to="/financial-counseling-resources"
                  style={goldButtonStyle}
                >
                  <Users size={14} />
                  View Resources
                </Link>
              </PremiumResourceCard>
            </div>
          </div>

          {/* ═══════════ THANK YOU PANEL ═══════════ */}
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px 0' }}>
            <div style={{
              position: 'relative',
              overflow: 'hidden',
              background: 'var(--bg-card)',
              backdropFilter: 'var(--glass-blur)',
              WebkitBackdropFilter: 'var(--glass-blur)',
              borderRadius: 24,
              border: '1px solid var(--border-gold)',
              boxShadow: 'var(--shadow-gold)',
              padding: 40,
              textAlign: 'center',
              animation: 'fadeSlideUp 0.7s ease-out 0.5s both',
            }}>
              {/* Shimmer */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 1,
                overflow: 'hidden', zIndex: 2,
              }}>
                <div style={{
                  width: '50%', height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(181,148,56,0.35), transparent)',
                  animation: 'shimmerSlide 4s ease-in-out infinite',
                }} />
              </div>

              <div style={{
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%,-50%)',
                width: 300, height: 300, borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(181,148,56,0.04), transparent 60%)',
                pointerEvents: 'none',
                animation: 'goldPulse 6s ease-in-out infinite',
              }} />

              <div style={{ position: 'relative', zIndex: 1 }}>
                <h2 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 24, fontWeight: 400,
                  color: 'var(--text-primary)', marginBottom: 10,
                }}>
                  Thank you for purchasing the{' '}
                  <span style={{ fontStyle: 'italic', color: 'var(--accent-gold)' }}>Payment Assistance Toolkit!</span>
                </h2>
                <p style={{
                  fontSize: 14, color: 'var(--text-secondary)',
                  fontFamily: 'var(--font-body)',
                  maxWidth: 560, margin: '0 auto', lineHeight: 1.7,
                }}>
                  Support for your business goes beyond payment assistance. Discover our other powerful toolkits designed to help you navigate every challenge with confidence.
                </p>
              </div>
            </div>
          </div>

          {/* ═══════════ IMPORTANT NOTES ═══════════ */}
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px 0' }}>
            <div style={{
              padding: 24, borderRadius: 16,
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-primary)',
              animation: 'fadeSlideUp 0.7s ease-out 0.6s both',
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <div style={{
                  width: 24, height: 24, borderRadius: '50%',
                  background: 'var(--accent-gold)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, marginTop: 2,
                }}>
                  <AlertCircle size={13} style={{ color: '#fff' }} />
                </div>
                <div>
                  <h4 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 16, color: 'var(--text-primary)', marginBottom: 8,
                  }}>
                    Important Notes
                  </h4>
                  <div style={{
                    fontSize: 13, color: 'var(--text-secondary)',
                    lineHeight: 1.8, fontFamily: 'var(--font-body)',
                  }}>
                    <p>• Save your access code — you can return anytime to re-download materials</p>
                    <p>• Resources may be updated periodically, your access remains active</p>
                    <p>• Support is available through the website contact options</p>
                    <p>• Educational content only — not official SBA guidance</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ═══════════ BACK BUTTON ═══════════ */}
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px 80px', textAlign: 'center' }}>
            <Link
              to="/covid-eidl-toolkits"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '14px 32px', borderRadius: 14,
                background: 'linear-gradient(135deg, rgba(181,148,56,0.22), rgba(181,148,56,0.06))',
                border: '1px solid rgba(181,148,56,0.3)',
                color: 'var(--text-primary)',
                fontSize: 15, fontWeight: 600,
                fontFamily: 'var(--font-body)',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
              }}
            >
              <ArrowLeft size={16} />
              Back to COVID EIDL Toolkits
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentAssistanceAccess;