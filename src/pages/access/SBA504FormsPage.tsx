import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, Download, ExternalLink, ChevronDown, Sun, Moon, CircleAlert as AlertCircle } from 'lucide-react';

const THEMES = {
  dark: {
    '--bg-primary': '#0e100c', '--bg-secondary': 'rgba(20, 24, 16, 0.65)',
    '--bg-card': 'rgba(22, 26, 18, 0.7)', '--bg-hero': 'linear-gradient(170deg, rgba(40,52,28,0.85) 0%, rgba(14,16,12,0.98) 100%)',
    '--border-primary': 'rgba(200, 168, 78, 0.08)', '--border-hover': 'rgba(200, 168, 78, 0.28)',
    '--border-gold': 'rgba(200, 168, 78, 0.2)', '--text-primary': '#eaf0e4',
    '--text-secondary': '#8a9878', '--text-muted': '#5a6a4e',
    '--accent-green': '#7ea85e', '--accent-gold': '#cda349',
    '--accent-gold-dim': 'rgba(200,168,78,0.15)',
    '--accent-red': '#cf6b6b', '--accent-yellow': '#d4b76a', '--accent-blue': '#6b9fcf',
    '--glass-blur': 'blur(28px)', '--shadow-card': '0 4px 40px rgba(0,0,0,0.25)',
    '--shadow-card-hover': '0 28px 72px rgba(0,0,0,0.4)', '--shadow-gold': '0 0 60px rgba(200,168,78,0.08)',
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
    '--accent-red': '#b05050', '--accent-yellow': '#9a7a28', '--accent-blue': '#4a7aa0',
    '--glass-blur': 'blur(22px)', '--shadow-card': '0 4px 28px rgba(0,0,0,0.07)',
    '--shadow-card-hover': '0 24px 56px rgba(0,0,0,0.12)', '--shadow-gold': '0 0 48px rgba(200,168,78,0.06)',
    '--grid-opacity': '0.035', '--particle-opacity': '0.12',
    '--overlay-green': 'rgba(74,120,54,0.03)', '--overlay-gold': 'rgba(200,168,78,0.02)',
  },
};

interface FormItem {
  title: string;
  description?: string;
  viewUrl?: string;
  downloadPath?: string;
  customDate?: string;
  accentColor?: string;
  customButtonText?: string;
}

const REQUIRED_FORMS: FormItem[] = [
  {
    title: 'SBA Form 1244 — Application for Section 504 Loan',
    description: 'Primary application form for the 504 loan program submitted through your Certified Development Company (CDC).',
    viewUrl: 'https://www.sba.gov/document/sba-form-1244-application-section-504-loans',
    downloadPath: 'https://www.sba.gov/document/sba-form-1244-application-section-504-loans',
    customDate: '*Verify latest version on SBA.gov*',
    accentColor: '#cf6b6b',
  },
  {
    title: 'SBA Form 413 — Personal Financial Statement',
    description: 'Required for each proprietor, partner, officer, director, and stockholder with 20%+ ownership.',
    viewUrl: 'https://www.sba.gov/document/sba-form-413-personal-financial-statement',
    downloadPath: 'https://www.sba.gov/document/sba-form-413-personal-financial-statement',
    customDate: '*Verify latest version on SBA.gov*',
    accentColor: '#cf6b6b',
  },
  {
    title: 'IRS Form 4506-C — Request for Transcript of Tax Return',
    description: 'Authorizes the IRS to provide tax return transcripts to the SBA or lender.',
    viewUrl: 'https://www.irs.gov/forms-pubs/about-form-4506-t',
    downloadPath: 'https://www.irs.gov/forms-pubs/about-form-4506-t',
    customDate: '*Verify latest version on IRS.gov*',
    accentColor: '#cf6b6b',
  },
  {
    title: 'SBA Form 912 — Statement of Personal History',
    description: 'Background information form required for all principals associated with the application.',
    viewUrl: 'https://www.sba.gov/document/sba-form-912-statement-personal-history',
    downloadPath: 'https://www.sba.gov/document/sba-form-912-statement-personal-history',
    customDate: '*Verify latest version on SBA.gov*',
    accentColor: '#cf6b6b',
  },
];

const OPTIONAL_FORMS: FormItem[] = [
  {
    title: 'Business Financial Statements',
    description: 'Profit & loss, balance sheet, and cash flow projections. Your CDC will specify exact requirements.',
    customDate: '*Prepared by your accountant or financial advisor*',
    accentColor: '#d4b76a',
  },
  {
    title: 'Business Tax Returns (3 Years)',
    description: 'Federal tax returns for the business for the most recent 3 years.',
    customDate: '*Copies from your records*',
    accentColor: '#d4b76a',
  },
  {
    title: 'Personal Tax Returns (3 Years)',
    description: 'Federal tax returns for all principals with 20%+ ownership for the most recent 3 years.',
    customDate: '*Copies from your records*',
    accentColor: '#d4b76a',
  },
  {
    title: 'Real Estate Appraisal / Project Cost Breakdown',
    description: 'Detailed appraisal and cost analysis for the real estate or equipment being financed.',
    customDate: '*Required for all 504 projects*',
    accentColor: '#d4b76a',
  },
];

const INFORMATIONAL_FORMS: FormItem[] = [
  {
    title: 'SBA SOP 50 10 7 — Lender & Development Company Loan Programs',
    description: 'Standard Operating Procedures for SBA 7(a) and 504 loan programs.',
    viewUrl: 'https://www.sba.gov/document/sop-50-10-7-lender-development-company-loan-programs',
    downloadPath: 'https://www.sba.gov/document/sop-50-10-7-lender-development-company-loan-programs',
    customDate: '*Official SBA reference document*',
    accentColor: '#6b9fcf',
  },
  {
    title: 'SBA 504 Loan Program Overview',
    description: 'Official SBA page with eligibility requirements, loan amounts, and program details.',
    viewUrl: 'https://www.sba.gov/funding-programs/loans/504-loans',
    customDate: '*Official SBA resource*',
    accentColor: '#6b9fcf',
    customButtonText: 'View on SBA.gov',
  },
  {
    title: 'Find a Certified Development Company (CDC)',
    description: 'CDCs are SBA partners that administer the 504 loan program in your area.',
    viewUrl: 'https://www.sba.gov/funding-programs/loans/504-loans/find-cdc',
    customDate: '*Official SBA resource*',
    accentColor: '#6b9fcf',
    customButtonText: 'Find a CDC',
  },
];

function PremiumGrid() {
  return (
    <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0, opacity: 'var(--grid-opacity)' }}>
      <svg width="100%" height="100%">
        <defs>
          <pattern id="s504FormsGrid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="var(--accent-gold)" strokeWidth="0.4" />
          </pattern>
          <pattern id="s504FormsGridDiag" width="96" height="96" patternUnits="userSpaceOnUse">
            <path d="M 0 96 L 96 0" fill="none" stroke="var(--accent-gold)" strokeWidth="0.2" opacity="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#s504FormsGrid)" />
        <rect width="100%" height="100%" fill="url(#s504FormsGridDiag)" />
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

function PremiumFormCard({ form, index }: { form: FormItem; index: number }) {
  const [hovered, setHovered] = useState(false);
  const accent = form.accentColor || '#cda349';

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative', overflow: 'hidden',
        background: 'var(--bg-card)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',
        border: `1px solid ${hovered ? 'var(--border-hover)' : 'var(--border-primary)'}`,
        borderRadius: 20, padding: 28,
        boxShadow: hovered ? 'var(--shadow-card-hover)' : 'var(--shadow-card)',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        transition: 'all 0.5s cubic-bezier(0.23,1,0.32,1)',
        display: 'flex', flexDirection: 'column',
        animation: `fadeSlideIn 0.5s ease-out ${0.05 + index * 0.06}s both`,
      }}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, width: 4, height: '100%', background: `linear-gradient(180deg, ${accent}, ${accent}44)`, opacity: hovered ? 1 : 0.6, transition: 'opacity 0.4s ease' }} />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${accent}44, transparent)`, opacity: hovered ? 1 : 0.3, transition: 'opacity 0.4s ease' }} />

      <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: `${accent}15`, border: `1px solid ${accent}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <FileText size={16} style={{ color: accent }} />
          </div>
          <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 400, color: 'var(--text-primary)', lineHeight: 1.3, flex: 1 }}>
            {form.title}
          </h4>
        </div>

        {form.description && (
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.65, fontFamily: 'var(--font-body)', flex: 1, marginBottom: 16 }}>
            {form.description}
          </p>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 'auto' }}>
          {form.viewUrl && (
            <a href={form.viewUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '10px 16px', borderRadius: 12, background: `${accent}12`, border: `1px solid ${accent}30`, color: accent, fontSize: 13, fontWeight: 600, fontFamily: 'var(--font-body)', textDecoration: 'none', transition: 'all 0.3s ease' }}>
              <ExternalLink size={14} />{form.customButtonText || 'View on SBA.gov'}
            </a>
          )}
          {form.downloadPath && (
            <a href={form.downloadPath} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '10px 16px', borderRadius: 12, background: `linear-gradient(135deg, ${accent}33, ${accent}18)`, border: `1px solid ${accent}55`, color: 'var(--text-primary)', fontSize: 13, fontWeight: 600, fontFamily: 'var(--font-body)', textDecoration: 'none', transition: 'all 0.3s ease' }}>
              <Download size={14} />Download File
            </a>
          )}
          <p style={{ fontSize: 11, color: 'var(--text-muted)', fontStyle: 'italic', fontFamily: 'var(--font-body)', textAlign: 'center' }}>
            {form.customDate}
          </p>
        </div>
      </div>
    </div>
  );
}

function FormsSection({ title, description, forms, accentColor, sectionKey, defaultOpen }: {
  title: string; description: string; forms: FormItem[]; accentColor: string; sectionKey: string; defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen ?? true);

  return (
    <div style={{ marginBottom: 32, animation: 'fadeSlideUp 0.6s ease-out both' }}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 28px', borderRadius: open ? '20px 20px 0 0' : 20, background: 'var(--bg-card)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)', border: `1px solid var(--border-gold)`, cursor: 'pointer', transition: 'all 0.4s ease', borderBottom: open ? `1px solid var(--border-gold)` : undefined }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: accentColor, boxShadow: `0 0 8px ${accentColor}66` }} />
          <div style={{ textAlign: 'left' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 400, color: 'var(--text-primary)', marginBottom: 2 }}>{title}</h3>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}>{description}</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 12, fontWeight: 700, padding: '4px 12px', borderRadius: 8, background: `${accentColor}15`, border: `1px solid ${accentColor}30`, color: accentColor, fontFamily: 'var(--font-body)' }}>
            {forms.length} {forms.length === 1 ? 'item' : 'items'}
          </span>
          <ChevronDown size={18} style={{ color: 'var(--text-secondary)', transform: open ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.3s ease' }} />
        </div>
      </button>

      {open && (
        <div style={{ background: 'var(--bg-secondary)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)', borderRadius: '0 0 20px 20px', border: `1px solid var(--border-gold)`, borderTop: 'none', padding: 28 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
            {forms.map((form, i) => (
              <PremiumFormCard key={`${sectionKey}-${i}`} form={form} index={i} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function SBA504FormsPage() {
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
        @keyframes fadeSlideIn { from { opacity:0; transform:translateY(22px); } to { opacity:1; transform:translateY(0); } }
        @keyframes goldPulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 0.8; } }
        * { box-sizing: border-box; }
        .s504-forms-page { min-height: 100vh; font-family: var(--font-body); background: var(--bg-primary); color: var(--text-primary); overflow-x: hidden; position: relative; }
        .s504-forms-page::before { content: ''; position: fixed; inset: 0; background: radial-gradient(ellipse 60% 45% at 25% 10%, var(--overlay-gold), transparent), radial-gradient(ellipse 55% 40% at 75% 90%, var(--overlay-green), transparent); pointer-events: none; z-index: 0; }
        .s504-forms-page a { color: inherit; }
        @media (max-width: 768px) { .s504-forms-hero-title { font-size: 28px !important; } .s504-forms-hero-inner { padding: 36px 16px 48px !important; } }
      `}</style>

      <div className="s504-forms-page">
        <PremiumGrid />
        <PremiumParticles />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg-hero)', borderBottom: '1px solid var(--border-gold)', animation: 'fadeSlideUp 0.7s ease-out both' }}>
            <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%, -50%)', width: 450, height: 450, borderRadius: '50%', background: 'radial-gradient(circle, rgba(200,168,78,0.08) 0%, transparent 55%)', pointerEvents: 'none', animation: 'goldPulse 6s ease-in-out infinite' }} />

            <div className="s504-forms-hero-inner" style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 32px 72px', position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 48 }}>
                <Link to="/access/sba-504" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#c8e0b4', fontSize: 14, fontWeight: 600, textDecoration: 'none', fontFamily: 'var(--font-body)' }}>
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
                <span style={{ padding: '5px 16px', borderRadius: 100, background: 'rgba(200,168,78,0.12)', border: '1px solid rgba(200,168,78,0.25)', fontSize: 11, fontWeight: 700, color: '#cda349', fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>★ Premium Forms Library</span>
              </div>

              <h1 className="s504-forms-hero-title" style={{ fontFamily: 'var(--font-display)', fontSize: 46, fontWeight: 400, textAlign: 'center', color: '#e8ede2', lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: 16 }}>
                SBA 504 <span style={{ fontStyle: 'italic', color: '#cda349' }}>Forms Library</span>
              </h1>

              <p style={{ textAlign: 'center', fontSize: 16, color: 'rgba(232,237,226,0.6)', lineHeight: 1.75, maxWidth: 620, margin: '0 auto', fontFamily: 'var(--font-body)' }}>
                All required forms and documents for your SBA 504 loan application, organized by category.
              </p>
            </div>
          </div>

          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 24px' }}>
            <FormsSection
              title="Required Forms"
              description="Core forms required for all SBA 504 loan applications"
              forms={REQUIRED_FORMS}
              accentColor="var(--accent-red)"
              sectionKey="req"
              defaultOpen={true}
            />
            <FormsSection
              title="Supporting Documents"
              description="Additional documentation commonly required during the 504 application process"
              forms={OPTIONAL_FORMS}
              accentColor="var(--accent-yellow)"
              sectionKey="opt"
              defaultOpen={true}
            />
            <FormsSection
              title="Informational Resources"
              description="Official SBA references and background information for the 504 program"
              forms={INFORMATIONAL_FORMS}
              accentColor="var(--accent-blue)"
              sectionKey="info"
              defaultOpen={false}
            />
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
                    <p>• Always verify the most current form versions on the official SBA website</p>
                    <p>• Your CDC may require additional documentation specific to your project</p>
                    <p>• 504 loans require working with both a CDC and a third-party lender</p>
                    <p>• All documents are for educational purposes only — not official SBA guidance</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px 80px', textAlign: 'center' }}>
            <Link to="/access/sba-504" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '14px 32px', borderRadius: 14, background: 'linear-gradient(135deg, rgba(200,168,78,0.25), rgba(200,168,78,0.08))', border: '1px solid rgba(200,168,78,0.35)', color: 'var(--text-primary)', fontSize: 15, fontWeight: 600, fontFamily: 'var(--font-body)', textDecoration: 'none' }}>
              <ArrowLeft size={16} />Back to Toolkit Dashboard
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
