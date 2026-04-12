import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, Sun, Moon, CircleAlert as AlertCircle, Clock } from 'lucide-react';

const THEMES = {
  dark: {
    '--bg-primary': '#0e100c', '--bg-secondary': 'rgba(20, 24, 16, 0.65)',
    '--bg-card': 'rgba(22, 26, 18, 0.7)', '--bg-hero': 'linear-gradient(170deg, rgba(40,52,28,0.85) 0%, rgba(14,16,12,0.98) 100%)',
    '--border-primary': 'rgba(200, 168, 78, 0.08)', '--border-hover': 'rgba(200, 168, 78, 0.28)',
    '--border-gold': 'rgba(200, 168, 78, 0.2)', '--text-primary': '#eaf0e4',
    '--text-secondary': '#8a9878', '--text-muted': '#5a6a4e',
    '--accent-green': '#7ea85e', '--accent-gold': '#cda349',
    '--accent-gold-dim': 'rgba(200,168,78,0.15)',
    '--glass-blur': 'blur(28px)', '--shadow-card': '0 4px 40px rgba(0,0,0,0.25)',
    '--shadow-gold': '0 0 60px rgba(200,168,78,0.08)',
    '--grid-opacity': '0.025', '--particle-opacity': '0.2',
    '--overlay-green': 'rgba(74,120,54,0.06)', '--overlay-gold': 'rgba(200,168,78,0.03)',
  },
  light: {
    '--bg-primary': '#f6f4ef', '--bg-secondary': 'rgba(255, 255, 255, 0.75)',
    '--bg-card': 'rgba(255, 255, 255, 0.8)', '--bg-hero': 'linear-gradient(170deg, #344522 0%, #1e2a16 100%)',
    '--border-primary': 'rgba(200, 168, 78, 0.12)', '--border-hover': 'rgba(200, 168, 78, 0.35)',
    '--border-gold': 'rgba(200, 168, 78, 0.2)', '--text-primary': '#1a2e12',
    '--text-secondary': '#5a6b52', '--text-muted': '#8a9680',
    '--accent-green': '#4a7836', '--accent-gold': '#9a7a28',
    '--accent-gold-dim': 'rgba(200,168,78,0.1)',
    '--glass-blur': 'blur(22px)', '--shadow-card': '0 4px 28px rgba(0,0,0,0.07)',
    '--shadow-gold': '0 0 48px rgba(200,168,78,0.06)',
    '--grid-opacity': '0.035', '--particle-opacity': '0.12',
    '--overlay-green': 'rgba(74,120,54,0.03)', '--overlay-gold': 'rgba(200,168,78,0.02)',
  },
};

function PremiumGrid() {
  return (
    <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0, opacity: 'var(--grid-opacity)' }}>
      <svg width="100%" height="100%">
        <defs>
          <pattern id="cioTmplGrid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="var(--accent-gold)" strokeWidth="0.4" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cioTmplGrid)" />
      </svg>
    </div>
  );
}

function PremiumParticles() {
  return (
    <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
      {Array.from({ length: 20 }).map((_, i) => {
        const isGold = i % 3 === 0;
        return <div key={i} style={{ position: 'absolute', width: `${1.2 + Math.random() * 2.8}px`, height: `${1.2 + Math.random() * 2.8}px`, borderRadius: '50%', background: isGold ? `rgba(200, 168, 78, var(--particle-opacity))` : `rgba(154, 184, 122, calc(var(--particle-opacity) * 0.6))`, left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animation: `pFloat ${8 + Math.random() * 16}s ease-in-out infinite`, animationDelay: `${Math.random() * -14}s`, boxShadow: isGold ? '0 0 6px rgba(200,168,78,0.3)' : 'none' }} />;
      })}
    </div>
  );
}

const ChangeInOwnershipTemplatesPage: React.FC = () => {
  const [theme, setTheme] = useState('dark');
  const isDark = theme === 'dark';
  const vars = THEMES[theme as keyof typeof THEMES];
  const cssVarString = Object.entries(vars).map(([k, v]) => `${k}: ${v};`).join('\n');

  return (
    <>
      <style>{`
        :root { --font-display: 'Instrument Serif', Georgia, serif; --font-body: 'DM Sans', sans-serif; ${cssVarString} }
        @keyframes pFloat { 0%, 100% { transform: translate(0,0) scale(1); opacity:0.3; } 25% { transform: translate(14px,-20px) scale(1.18); opacity:0.65; } 50% { transform: translate(-10px,-34px) scale(0.82); opacity:0.18; } 75% { transform: translate(18px,-14px) scale(1.1); opacity:0.5; } }
        @keyframes fadeSlideUp { from { opacity:0; transform:translateY(32px); } to { opacity:1; transform:translateY(0); } }
        @keyframes goldPulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 0.8; } }
        * { box-sizing: border-box; }
        .cio-tmpl-page { min-height: 100vh; font-family: var(--font-body); background: var(--bg-primary); color: var(--text-primary); overflow-x: hidden; position: relative; }
        .cio-tmpl-page::before { content: ''; position: fixed; inset: 0; background: radial-gradient(ellipse 60% 45% at 25% 10%, var(--overlay-gold), transparent), radial-gradient(ellipse 55% 40% at 75% 90%, var(--overlay-green), transparent); pointer-events: none; z-index: 0; }
        .cio-tmpl-page a { color: inherit; }
        @media (max-width: 768px) { .cio-tmpl-hero-title { font-size: 28px !important; } .cio-tmpl-hero-inner { padding: 36px 16px 48px !important; } }
      `}</style>
      <div className="cio-tmpl-page">
        <PremiumGrid />
        <PremiumParticles />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg-hero)', borderBottom: '1px solid var(--border-gold)', animation: 'fadeSlideUp 0.7s ease-out both' }}>
            <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%, -50%)', width: 450, height: 450, borderRadius: '50%', background: 'radial-gradient(circle, rgba(200,168,78,0.08) 0%, transparent 55%)', pointerEvents: 'none', animation: 'goldPulse 6s ease-in-out infinite' }} />
            <div className="cio-tmpl-hero-inner" style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 32px 72px', position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 48 }}>
                <Link to="/access/change-in-ownership" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#c8e0b4', fontSize: 14, fontWeight: 600, textDecoration: 'none', fontFamily: 'var(--font-body)' }}>
                  <ArrowLeft size={16} />Back to Toolkit Dashboard
                </Link>
                <button type="button" onClick={() => setTheme(isDark ? 'light' : 'dark')} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 12, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)', color: '#c8e0b4', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)' }}>
                  {isDark ? <Sun size={14} /> : <Moon size={14} />}{isDark ? 'Light' : 'Dark'}
                </button>
              </div>
              <div style={{ width: 72, height: 72, borderRadius: 20, background: 'linear-gradient(135deg, rgba(200,168,78,0.22), rgba(200,168,78,0.06))', border: '1px solid rgba(200,168,78,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', boxShadow: '0 0 40px rgba(200,168,78,0.08)' }}>
                <FileText size={34} color="#cda349" strokeWidth={1.5} />
              </div>
              <div style={{ textAlign: 'center', marginBottom: 14 }}>
                <span style={{ padding: '5px 16px', borderRadius: 100, background: 'rgba(200,168,78,0.12)', border: '1px solid rgba(200,168,78,0.25)', fontSize: 11, fontWeight: 700, color: '#cda349', fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>★ Premium Templates Library</span>
              </div>
              <h1 className="cio-tmpl-hero-title" style={{ fontFamily: 'var(--font-display)', fontSize: 46, fontWeight: 400, textAlign: 'center', color: '#e8ede2', lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: 16 }}>
                Change in Ownership <span style={{ fontStyle: 'italic', color: '#cda349' }}>Templates & Docs</span>
              </h1>
              <p style={{ textAlign: 'center', fontSize: 16, color: 'rgba(232,237,226,0.6)', lineHeight: 1.75, maxWidth: 620, margin: '0 auto 0', fontFamily: 'var(--font-body)' }}>
                Professional templates and documents for change in ownership submissions. Full library coming soon.
              </p>
            </div>
          </div>

          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 24px' }}>
            <div style={{ background: 'var(--bg-card)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)', borderRadius: 24, border: '1px solid var(--border-gold)', padding: '72px 48px', textAlign: 'center', boxShadow: 'var(--shadow-gold)', animation: 'fadeSlideUp 0.7s ease-out 0.2s both' }}>
              <div style={{ width: 80, height: 80, borderRadius: 24, background: 'linear-gradient(135deg, rgba(200,168,78,0.15), rgba(200,168,78,0.05))', border: '1px solid rgba(200,168,78,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px' }}>
                <Clock size={36} style={{ color: 'var(--accent-gold)' }} />
              </div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 400, color: 'var(--text-primary)', marginBottom: 16 }}>
                Templates <span style={{ fontStyle: 'italic', color: 'var(--accent-gold)' }}>Coming Soon</span>
              </h2>
              <p style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.75, maxWidth: 560, margin: '0 auto 32px', fontFamily: 'var(--font-body)' }}>
                Our team is preparing a comprehensive library of professional templates for the change in ownership process including cover letters, intent letters, and submission tools. Check back soon.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
                {['Cover Letter Templates', 'Submission Checklists', 'Letter of Intent', 'Organizational Charts'].map((item, i) => (
                  <span key={i} style={{ padding: '8px 18px', borderRadius: 12, background: 'rgba(200,168,78,0.08)', border: '1px solid rgba(200,168,78,0.18)', color: 'var(--accent-gold)', fontSize: 13, fontWeight: 600, fontFamily: 'var(--font-body)', opacity: 0.7 }}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px 32px' }}>
            <div style={{ padding: 24, borderRadius: 16, background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', animation: 'fadeSlideUp 0.7s ease-out 0.4s both' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--accent-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                  <AlertCircle size={13} style={{ color: '#fff' }} />
                </div>
                <div>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 16, color: 'var(--text-primary)', marginBottom: 8 }}>Important Notes</h4>
                  <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.8, fontFamily: 'var(--font-body)' }}>
                    <p>• Templates will be updated to reflect current SBA requirements</p>
                    <p>• All documents are for educational purposes only — not official SBA guidance</p>
                    <p>• Always verify requirements with official SBA sources before submission</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px 80px', textAlign: 'center' }}>
            <Link to="/access/change-in-ownership" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '14px 32px', borderRadius: 14, background: 'linear-gradient(135deg, rgba(200,168,78,0.25), rgba(200,168,78,0.08))', border: '1px solid rgba(200,168,78,0.35)', color: 'var(--text-primary)', fontSize: 15, fontWeight: 600, fontFamily: 'var(--font-body)', textDecoration: 'none' }}>
              <ArrowLeft size={16} />Back to Toolkit Dashboard
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangeInOwnershipTemplatesPage;
