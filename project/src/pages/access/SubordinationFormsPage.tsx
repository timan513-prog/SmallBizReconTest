import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, Download, ExternalLink, ChevronDown, Lock, Sun, Moon, Play, CircleAlert as AlertCircle } from 'lucide-react';

/* ──────────────────────────────────────────────
   TYPES
   ────────────────────────────────────────────── */

interface FormItem {
  title: string;
  description?: string;
  viewUrl?: string;
  downloadPath?: string;
  instructionsPath?: string;
  customDate?: string;
  accentColor?: string;
  customButtonText?: string;
  downloadButtonText?: string;
  primaryButtonText?: string;
}

/* ──────────────────────────────────────────────
   THEME SYSTEM (matches premium Collateral pages)
   ────────────────────────────────────────────── */

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
    '--accent-red': '#cf6b6b',
    '--accent-yellow': '#d4b76a',
    '--accent-blue': '#6b9fcf',
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
    '--accent-red': '#b05050',
    '--accent-yellow': '#9a7a28',
    '--accent-blue': '#4a7aa0',
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

/* ──────────────────────────────────────────────
   AMBIENT EFFECTS
   ────────────────────────────────────────────── */

function PremiumGrid() {
  return (
    <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0, opacity: 'var(--grid-opacity)' }}>
      <svg width="100%" height="100%">
        <defs>
          <pattern id="subFormsGrid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="var(--accent-gold)" strokeWidth="0.4" />
          </pattern>
          <pattern id="subFormsGridDiag" width="96" height="96" patternUnits="userSpaceOnUse">
            <path d="M 0 96 L 96 0" fill="none" stroke="var(--accent-gold)" strokeWidth="0.2" opacity="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#subFormsGrid)" />
        <rect width="100%" height="100%" fill="url(#subFormsGridDiag)" />
      </svg>
    </div>
  );
}

function PremiumParticles() {
  return (
    <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
      {Array.from({ length: 20 }).map((_, i) => {
        const isGold = i % 3 === 0;
        return (
          <div key={i} style={{
            position: 'absolute',
            width: `${1.2 + Math.random() * 2.8}px`,
            height: `${1.2 + Math.random() * 2.8}px`,
            borderRadius: '50%',
            background: isGold
              ? `rgba(200, 168, 78, var(--particle-opacity))`
              : `rgba(154, 184, 122, calc(var(--particle-opacity) * 0.6))`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `pFloat ${8 + Math.random() * 16}s ease-in-out infinite`,
            animationDelay: `${Math.random() * -14}s`,
            boxShadow: isGold ? '0 0 6px rgba(200,168,78,0.3)' : 'none',
          }} />
        );
      })}
    </div>
  );
}

/* ──────────────────────────────────────────────
   HELPERS
   ────────────────────────────────────────────── */

const isDualButtonForm = (title: string): boolean => {
  return (
    title === 'Subordination Intended Use Letter' ||
    title === 'Subordinations Intended Use Letter - Real Estate'
  );
};

const getLastUpdatedDate = (dateString?: string): string => {
  if (dateString === '*Coming Soon*') return '*Coming Soon*';
  if (dateString) return dateString;
  return '*LAST UPDATED JANUARY 30, 2026*';
};

/* ──────────────────────────────────────────────
   PREMIUM FORM CARD
   ────────────────────────────────────────────── */

const PremiumFormCard: React.FC<{ form: FormItem; index: number; sectionAccent: string }> = ({
  form,
  index,
  sectionAccent,
}) => {
  const [hovered, setHovered] = useState(false);
  const isComingSoon = form.customDate === '*Coming Soon*';
  const accent = form.accentColor || sectionAccent;

  const buttonStyle = (variant: 'filled' | 'outline', disabled: boolean): React.CSSProperties => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    width: '100%',
    padding: '12px 20px',
    borderRadius: 12,
    fontSize: 13,
    fontWeight: 600,
    fontFamily: 'var(--font-body)',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.4 : 1,
    ...(variant === 'filled'
      ? {
          background: `linear-gradient(135deg, ${accent}55, ${accent}25)`,
          border: `1px solid ${accent}77`,
          color: 'var(--text-primary)',
        }
      : {
          background: 'transparent',
          border: '1px solid var(--border-primary)',
          color: 'var(--text-primary)',
        }),
  });

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
        padding: 24,
        boxShadow: hovered ? 'var(--shadow-card-hover)' : 'var(--shadow-card)',
        transform: hovered ? 'translateY(-6px) scale(1.015)' : 'translateY(0) scale(1)',
        transition: 'all 0.6s cubic-bezier(0.23,1,0.32,1)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        animation: `fadeSlideIn 0.5s ease-out ${0.05 + index * 0.04}s both`,
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
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: `${accent}15`,
            border: `1px solid ${accent}30`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <FileText size={17} style={{ color: accent }} />
          </div>
          {isComingSoon && (
            <span style={{
              fontSize: 10, fontWeight: 700, padding: '3px 9px',
              borderRadius: 6,
              background: `${accent}15`,
              border: `1px solid ${accent}33`,
              color: accent,
              textTransform: 'uppercase',
              fontFamily: 'var(--font-body)',
              letterSpacing: '0.05em',
            }}>
              <Lock size={10} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 3 }} />
              Soon
            </span>
          )}
        </div>

        {/* Title */}
        <h4 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 17, fontWeight: 400,
          color: 'var(--text-primary)',
          lineHeight: 1.35, marginBottom: 8,
        }}>
          {form.title}
        </h4>

        {/* Description */}
        {form.description && (
          <p style={{
            fontSize: 13, color: 'var(--text-secondary)',
            lineHeight: 1.65, fontFamily: 'var(--font-body)',
            flex: 1, marginBottom: 16,
          }}>
            {form.description}
          </p>
        )}
        {!form.description && <div style={{ flex: 1 }} />}

        {/* Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 'auto' }}>
          {isDualButtonForm(form.title) ? (
            <>
              <a
                href={form.instructionsPath}
                target="_blank"
                rel="noopener noreferrer"
                style={buttonStyle('filled', isComingSoon)}
                aria-disabled={isComingSoon}
                tabIndex={isComingSoon ? -1 : 0}
              >
                <FileText size={15} />
                {form.primaryButtonText || 'Download Instructions'}
              </a>
              <a
                href={form.downloadPath}
                download={!isComingSoon}
                style={buttonStyle('outline', isComingSoon)}
                aria-disabled={isComingSoon}
                tabIndex={isComingSoon ? -1 : 0}
              >
                <Download size={15} />
                {form.downloadButtonText || 'Unlock Request Template'}
              </a>
              <p style={{
                fontSize: 11, color: 'var(--text-muted)', fontStyle: 'italic',
                textAlign: 'center', fontFamily: 'var(--font-body)', marginTop: 2,
              }}>
                {getLastUpdatedDate(form.customDate)}
              </p>
            </>
          ) : (
            <>
              {form.viewUrl && (
                <a
                  href={`${form.downloadPath || form.viewUrl}${(form.downloadPath || form.viewUrl || '').endsWith('.pdf') ? '#page=1' : ''}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={buttonStyle('outline', isComingSoon)}
                  aria-disabled={isComingSoon}
                  tabIndex={isComingSoon ? -1 : 0}
                >
                  <ExternalLink size={15} />
                  {form.customButtonText || 'View on SBA.gov'}
                </a>
              )}
              <a
                href={form.downloadPath || form.viewUrl}
                target="_blank"
                rel="noopener noreferrer"
                download={!!form.downloadPath && !isComingSoon}
                style={buttonStyle('filled', isComingSoon)}
                aria-disabled={isComingSoon}
                tabIndex={isComingSoon ? -1 : 0}
              >
                <Download size={15} />
                {form.downloadButtonText || 'Download File'}
              </a>
              <p style={{
                fontSize: 11, color: 'var(--text-muted)', fontStyle: 'italic',
                textAlign: 'center', fontFamily: 'var(--font-body)', marginTop: 2,
              }}>
                {getLastUpdatedDate(form.customDate)}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

/* ──────────────────────────────────────────────
   COLLAPSIBLE SECTION
   ────────────────────────────────────────────── */

const FormsSection: React.FC<{
  id: string;
  title: string;
  subtitle: string;
  emoji: string;
  forms: FormItem[];
  sectionAccent: string;
  isOpen: boolean;
  onToggle: () => void;
}> = ({ id, title, subtitle, emoji, forms, sectionAccent, isOpen, onToggle }) => {
  return (
    <div
      id={id}
      className="scroll-mt-24"
      style={{
        background: 'var(--bg-card)',
        backdropFilter: 'var(--glass-blur)',
        WebkitBackdropFilter: 'var(--glass-blur)',
        borderRadius: 20,
        border: '1px solid var(--border-primary)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-card)',
      }}
    >
      <button
        onClick={onToggle}
        type="button"
        style={{
          width: '100%', padding: '24px 32px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: 'transparent', border: 'none',
          borderBottom: isOpen ? '1px solid var(--border-primary)' : 'none',
          cursor: 'pointer', transition: 'all 0.3s ease',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontSize: 24 }}>{emoji}</span>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 22, fontWeight: 400, color: 'var(--text-primary)',
            }}>
              {title}
            </h3>
            <span style={{
              fontSize: 12, color: 'var(--text-muted)',
              fontFamily: 'var(--font-body)', marginTop: 2,
            }}>
              {forms.length} form{forms.length === 1 ? '' : 's'}
            </span>
          </div>
        </div>
        <ChevronDown
          size={24}
          style={{
            color: 'var(--text-secondary)',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.4s cubic-bezier(0.23,1,0.32,1)',
          }}
        />
      </button>

      {isOpen && (
        <div style={{ padding: 28 }}>
          <p style={{
            fontSize: 14, color: 'var(--text-secondary)',
            lineHeight: 1.7, fontFamily: 'var(--font-body)',
            marginBottom: 24,
          }}>
            {subtitle}
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: 20,
            alignItems: 'stretch',
          }}>
            {forms.map((form, i) => (
              <PremiumFormCard key={i} form={form} index={i} sectionAccent={sectionAccent} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

/* ──────────────────────────────────────────────
   DATA — Subordination-specific forms
   ────────────────────────────────────────────── */

const requiredForms: FormItem[] = [
  {
    title: 'COVID EIDL Subordination Request Requirements',
    description: 'Official SBA requirements for subordination requests',
    viewUrl: 'https://www.sba.gov/document/support-subordination-requirement-letter',
    downloadPath: 'https://www.sba.gov/sites/default/files/2025-05/CESC%20Subordination%204.2025%20V1.pdf',
    accentColor: '#D4B483',
  },
  {
    title: 'Subordination Intended Use Letter',
    description: 'Letter template explaining how subordination proceeds will be used',
    downloadPath: 'https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/public/sbareconfreehelpguides/SUBORDINATION/Request%20for%20COVID%20EIDL%20Subordination%20(FILLABLE)%20-%20FINAL.docx',
    instructionsPath: 'https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/public/sbareconfreehelpguides/SUBORDINATION/Request%20for%20Subordination%20Instructions.pdf',
    customDate: '*LAST UPDATED JANUARY 30, 2026*',
    accentColor: '#D4B483',
    primaryButtonText: 'Download Instructions',
    downloadButtonText: 'Unlock Request Template',
  },
  {
    title: 'Subordinations Intended Use Letter - Real Estate',
    description: 'Letter template explaining how subordination proceeds will be used for real estate',
    downloadPath: 'https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/public/sbareconfreehelpguides/SUBORDINATION/Real%20Estate%20Subordination%20Request%20(FILLABLE).docx',
    instructionsPath: 'https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/public/sbareconfreehelpguides/SUBORDINATION/COVID%20EIDL%20Subordination%20RE%20Request%20Letter%20Instructions%20(COMPLETE).pdf',
    customDate: '*LAST UPDATED JANUARY 30, 2026*',
    accentColor: '#D4B483',
    primaryButtonText: 'Download Instructions',
    downloadButtonText: 'Unlock Request Template',
  },
  {
    title: 'Borrower Authorization',
    description: "Third-Party Authorization Form — Authorizes SBA to verify your information and communicate with your approved third party regarding this loan request.",
    viewUrl: 'https://www.sba.gov/document/sba-form-borrowers-consent-verify-information-third-party-authorization',
    downloadPath: 'https://www.sba.gov/sites/default/files/2023-06/BDLSC%20%20Borrower%20Authorization%20-%205-23.pdf',
    accentColor: '#D4B483',
  },
  {
    title: 'UCC Lien Search Tool',
    description: 'National Association of Secretaries of State UCC search resources',
    viewUrl: 'https://www.llcuniversity.com/50-secretary-of-state-sos-business-entity-search/',
    downloadPath: 'https://www.e-secretaryofstate.com/',
    customButtonText: 'View SOS Database',
    downloadButtonText: 'View ESOS Database',
    accentColor: '#D4B483',
  },
];

const optionalForms: FormItem[] = [
  {
    title: 'SBA Form 770 – Financial Statement of Debtor',
    viewUrl: 'https://www.sba.gov/document/sba-form-770-financial-statement-debtor',
    downloadPath: 'https://www.sba.gov/sites/default/files/2024-11/FORM%20770%203245-0012%2010-23-2024%20%282%29.pdf',
    accentColor: '#3B4C1C',
  },
  {
    title: 'SBA Form 2202 – Schedule of Liabilities',
    viewUrl: 'https://www.sba.gov/document/sba-form-2202-schedule-liabilities',
    downloadPath: 'https://www.sba.gov/sites/default/files/2020-07/2202%20Schedule%20of%20Liabilities-508.pdf',
    accentColor: '#3B4C1C',
  },
  {
    title: 'YTD Profit and Loss Statement',
    description: 'Most recent YTD Profit and Loss Statement of the assuming party',
    viewUrl: 'https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/public/sbaforms//SBARecon_YTD_Profit_and_Loss_Statement_Template.xlsx',
    downloadPath: 'https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/public/sbaforms//SBARecon_YTD_Profit_and_Loss_Statement_Template.xlsx',
  },
  {
    title: 'SBA Form 413 – Financial Statement of Debtor',
    description: "Used to collect information about the Business Applicant and its owners' financial condition.",
    viewUrl: 'https://www.sba.gov/document/sba-form-413-personal-financial-statement',
    downloadPath: 'https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/public/sbaforms//SBAForm413%20PERSONAL%20FINANCIAL%20STATEMENT.pdf',
    accentColor: '#3B4C1C',
  },
  {
    title: 'Sample Loan Commitment Letter',
    description: 'Sample term sheets showing acceptable subordination structures',
    downloadPath: 'https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/sign/sbarecon-paid-pdfs/Sample%20Lender%20Commitment%20Letter%20(SBA%20EIDL%20Subordination).pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85MzZjNmFmNC1iMzA2LTQzMmMtYWFjNy03ZmRmYjU1NDRjMzUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzYmFyZWNvbi1wYWlkLXBkZnMvU2FtcGxlIExlbmRlciBDb21taXRtZW50IExldHRlciAoU0JBIEVJREwgU3Vib3JkaW5hdGlvbikucGRmIiwiaWF0IjoxNzUyMjM5NjUzLCJleHAiOjE4Mzg2Mzk2NTN9.UVIJSPHP7U-Y-LvNLu9bwfmfGBfqP_xWAU0Um3G87cI',
    customDate: '*Last updated January 15, 2026*',
    accentColor: '#3B4C1C',
  },
];

const informationalForms: FormItem[] = [
  {
    title: 'COVID EIDL Servicing Capability',
    description: 'Official SBA report on COVID-19 Economic Injury Disaster Loan servicing capabilities',
    viewUrl: 'https://www.sba.gov/document/report-25-16-covid-19-economic-injury-disaster-loan-servicing-capability',
    downloadPath: 'https://www.sba.gov/sites/default/files/2025-05/SBA%20OIG%20Report%2025-16.pdf',
    accentColor: '#2F4F4F',
  },
  {
    title: 'General Assistance Requirement Letter',
    viewUrl: 'https://www.sba.gov/document/support-general-assistance-requirement-letter',
    downloadPath: 'https://www.sba.gov/sites/default/files/2025-05/CESC%20General%20Assistance%204.2025%20V1.pdf',
    accentColor: '#2F4F4F',
  },
  {
    title: 'SOP 50 52 2 - Disaster Loan Servicing and Liquidation',
    description: 'This SOP provides the policies and procedures for disaster loan servicing and liquidation',
    viewUrl: 'https://www.sba.gov/document/sop-50-52-2-disaster-loan-servicing-and-liquidation',
    downloadPath: 'https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/public/sbaforms//SBA%20SOP_50_52_2_1.pdf',
    accentColor: '#2F4F4F',
  },
  {
    title: 'Glossary of Business Financial Terms',
    description: 'This document defines terminology related to financial statements and disaster business loan applications',
    viewUrl: 'https://www.sba.gov/document/support--glossary-business-financial-terms',
    downloadPath: 'https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/public/sbaforms//Glossary%20of%20Business%20Financial%20Terms.pdf',
    accentColor: '#2F4F4F',
  },
];

/* ──────────────────────────────────────────────
   MAIN PAGE
   ────────────────────────────────────────────── */

const SubordinationFormsPage: React.FC = () => {
  const [theme, setTheme] = useState('dark');
  const [openSections, setOpenSections] = useState<Set<string>>(new Set(['required']));

  const isDark = theme === 'dark';
  const vars = THEMES[theme as keyof typeof THEMES];
  const cssVarString = Object.entries(vars).map(([k, v]) => `${k}: ${v};`).join('\n');

  const toggleSection = (id: string) => {
    const next = new Set(openSections);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setOpenSections(next);
  };

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

        * { box-sizing: border-box; }

        .sub-forms-page {
          min-height: 100vh;
          font-family: var(--font-body);
          background: var(--bg-primary);
          color: var(--text-primary);
          overflow-x: hidden;
          position: relative;
          transition: background 0.5s ease, color 0.4s ease;
        }
        .sub-forms-page::before {
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
        .sub-forms-page a { color: inherit; }

        @media (max-width: 768px) {
          .sub-forms-hero-title { font-size: 28px !important; }
          .sub-forms-hero-inner { padding: 36px 16px 48px !important; }
        }
      `}</style>

      <div className="sub-forms-page">
        <PremiumGrid />
        <PremiumParticles />

        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* ═══════════ HERO ═══════════ */}
          <div style={{
            position: 'relative', overflow: 'hidden',
            background: 'var(--bg-hero)',
            borderBottom: '1px solid var(--border-gold)',
            animation: 'fadeSlideUp 0.7s ease-out both',
          }}>
            <div style={{
              position: 'absolute', top: '30%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 450, height: 450, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(200,168,78,0.08) 0%, transparent 55%)',
              pointerEvents: 'none',
              animation: 'goldPulse 6s ease-in-out infinite',
            }} />

            <div className="sub-forms-hero-inner" style={{
              maxWidth: 1200, margin: '0 auto', padding: '48px 32px 72px',
              position: 'relative', zIndex: 1,
            }}>
              {/* Top bar */}
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                marginBottom: 48,
              }}>
                <Link
                  to="/access/subordination"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    color: '#c8e0b4', fontSize: 14, fontWeight: 600,
                    textDecoration: 'none', fontFamily: 'var(--font-body)',
                    transition: 'color 0.3s ease',
                  }}
                >
                  <ArrowLeft size={16} />
                  Back to Toolkit Dashboard
                </Link>
                <button
                  type="button"
                  onClick={() => setTheme(isDark ? 'light' : 'dark')}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    padding: '8px 16px', borderRadius: 12,
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: '#c8e0b4', fontSize: 13, fontWeight: 600,
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
                background: 'linear-gradient(135deg, rgba(200,168,78,0.22), rgba(200,168,78,0.06))',
                border: '1px solid rgba(200,168,78,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 24px',
                boxShadow: '0 0 40px rgba(200,168,78,0.08)',
              }}>
                <FileText size={34} color="#cda349" strokeWidth={1.5} />
              </div>

              {/* Badge */}
              <div style={{ textAlign: 'center', marginBottom: 14 }}>
                <span style={{
                  padding: '5px 16px', borderRadius: 100,
                  background: 'rgba(200,168,78,0.12)',
                  border: '1px solid rgba(200,168,78,0.25)',
                  fontSize: 11, fontWeight: 700,
                  color: '#cda349', fontFamily: 'var(--font-body)',
                  textTransform: 'uppercase', letterSpacing: '0.1em',
                }}>
                  ★ Premium Forms Library
                </span>
              </div>

              <h1 className="sub-forms-hero-title" style={{
                fontFamily: 'var(--font-display)',
                fontSize: 46, fontWeight: 400,
                textAlign: 'center', color: '#e8ede2',
                lineHeight: 1.15, letterSpacing: '-0.02em',
                marginBottom: 16,
              }}>
                Advanced Subordination{' '}
                <span style={{ fontStyle: 'italic', color: '#cda349' }}>Forms Library</span>
              </h1>

              <p style={{
                textAlign: 'center', fontSize: 16,
                color: 'rgba(232,237,226,0.6)',
                lineHeight: 1.75, maxWidth: 620, margin: '0 auto 28px',
                fontFamily: 'var(--font-body)',
              }}>
                Premium subordination forms categorized by usage. All forms are included with your toolkit access.
              </p>

              {/* Quick nav pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}>
                {[
                  { href: '#required', emoji: '🔴', label: 'Required Forms' },
                  { href: '#optional', emoji: '🟡', label: 'Could Be Requested' },
                  { href: '#informational', emoji: '🔵', label: 'Informational' },
                ].map((nav, i) => (
                  <a
                    key={i}
                    href={nav.href}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 8,
                      padding: '8px 18px', borderRadius: 12,
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      color: '#e8ede2', fontSize: 13, fontWeight: 600,
                      fontFamily: 'var(--font-body)',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <span>{nav.emoji}</span>
                    {nav.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ═══════════ FORM SECTIONS ═══════════ */}
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px 32px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div style={{ animation: 'fadeSlideUp 0.7s ease-out 0.25s both' }}>
                <FormsSection
                  id="required"
                  title="Required Forms"
                  subtitle="These forms are mandatory for subordination submission. Missing any of these will result in delays or rejection."
                  emoji="🔴"
                  forms={requiredForms}
                  sectionAccent="#cf6b6b"
                  isOpen={openSections.has('required')}
                  onToggle={() => toggleSection('required')}
                />
              </div>

              <div style={{ animation: 'fadeSlideUp 0.7s ease-out 0.3s both' }}>
                <FormsSection
                  id="optional"
                  title="Could Be Requested"
                  subtitle="These forms may be required and case-dependent. The SBA may request them based on your specific situation."
                  emoji="🟡"
                  forms={optionalForms}
                  sectionAccent="#d4b76a"
                  isOpen={openSections.has('optional')}
                  onToggle={() => toggleSection('optional')}
                />
              </div>

              <div style={{ animation: 'fadeSlideUp 0.7s ease-out 0.35s both' }}>
                <FormsSection
                  id="informational"
                  title="Informational"
                  subtitle="General references and background information to help you understand the subordination process."
                  emoji="🔵"
                  forms={informationalForms}
                  sectionAccent="#6b9fcf"
                  isOpen={openSections.has('informational')}
                  onToggle={() => toggleSection('informational')}
                />
              </div>
            </div>
          </div>

          {/* ═══════════ IMPORTANT NOTES ═══════════ */}
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px 32px' }}>
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
                    <p>• All forms are current as of the latest SBA updates</p>
                    <p>• Some forms may require additional supporting documentation</p>
                    <p>• Always verify the most current versions on the official SBA website before submission</p>
                    <p>• Your toolkit includes completion guides for all required forms</p>
                    <p>• For subordination requests, lender commitment letters are critical</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ═══════════ BACK TO DASHBOARD ═══════════ */}
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px 80px', textAlign: 'center' }}>
            <Link
              to="/access/subordination"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '14px 32px', borderRadius: 14,
                background: 'linear-gradient(135deg, rgba(200,168,78,0.25), rgba(200,168,78,0.08))',
                border: '1px solid rgba(200,168,78,0.35)',
                color: 'var(--text-primary)',
                fontSize: 15, fontWeight: 600,
                fontFamily: 'var(--font-body)',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
              }}
            >
              <ArrowLeft size={16} />
              Back to Toolkit Dashboard
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubordinationFormsPage;