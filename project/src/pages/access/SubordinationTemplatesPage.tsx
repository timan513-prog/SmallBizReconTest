import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, Download, ExternalLink, ChevronDown, Sun, Moon, BookOpen, CircleAlert as AlertCircle, Award, ClipboardList, ShieldCheck, Library } from 'lucide-react';

/* ──────────────────────────────────────────────
   TYPES
   ────────────────────────────────────────────── */

interface TemplateDocument {
  id: string;
  title: string;
  description: string;
  category?: string;
  volume: string;
  viewUrl?: string;
  downloadPath?: string;
  customDate?: string;
  accentColor: string;
  customButtonText?: string;
  downloadButtonText?: string;
  tags?: string[];
  status?: string;
}

/* ──────────────────────────────────────────────
   THEME SYSTEM (matches premium pages)
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
          <pattern id="subTemplatesGrid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="var(--accent-gold)" strokeWidth="0.4" />
          </pattern>
          <pattern id="subTemplatesGridDiag" width="96" height="96" patternUnits="userSpaceOnUse">
            <path d="M 0 96 L 96 0" fill="none" stroke="var(--accent-gold)" strokeWidth="0.2" opacity="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#subTemplatesGrid)" />
        <rect width="100%" height="100%" fill="url(#subTemplatesGridDiag)" />
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

const getLastUpdatedDate = (dateString?: string): string => {
  if (!dateString) return '*LAST UPDATED JANUARY 31, 2026*';
  return dateString;
};

/* ──────────────────────────────────────────────
   PREMIUM TEMPLATE CARD
   ────────────────────────────────────────────── */

const PremiumTemplateCard: React.FC<{ doc: TemplateDocument; index: number }> = ({ doc, index }) => {
  const [hovered, setHovered] = useState(false);
  const accent = doc.accentColor || '#CDA349';

  const buttonStyle = (variant: 'filled' | 'outline'): React.CSSProperties => ({
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
    cursor: 'pointer',
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

      {/* Diagonal sweep on hover */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        background: `linear-gradient(135deg, transparent 40%, ${accent}08 50%, transparent 60%)`,
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.5s ease',
        pointerEvents: 'none',
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
          {doc.volume && (
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
              {doc.volume}
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
          {doc.title}
        </h4>

        {/* Description */}
        {doc.description && (
          <p style={{
            fontSize: 13, color: 'var(--text-secondary)',
            lineHeight: 1.65, fontFamily: 'var(--font-body)',
            flex: 1, marginBottom: 16,
          }}>
            {doc.description}
          </p>
        )}
        {!doc.description && <div style={{ flex: 1 }} />}

        {/* Tags */}
        {doc.tags && doc.tags.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
            {doc.tags.map((tag, ti) => (
              <span key={ti} style={{
                fontSize: 10, fontWeight: 600, padding: '2px 8px',
                borderRadius: 6,
                background: 'var(--accent-gold-dim)',
                border: '1px solid var(--border-primary)',
                color: 'var(--text-secondary)',
                fontFamily: 'var(--font-body)',
                letterSpacing: '0.03em',
              }}>
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 'auto' }}>
          {doc.viewUrl && (
            <a
              href={`${doc.viewUrl}${doc.viewUrl.endsWith('.pdf') ? '#page=1' : ''}`}
              target="_blank"
              rel="noopener noreferrer"
              style={buttonStyle('outline')}
            >
              <ExternalLink size={15} />
              {doc.customButtonText || 'View Online'}
            </a>
          )}

          {doc.downloadPath && (
            <a
              href={`${doc.downloadPath}${doc.downloadPath.endsWith('.pdf') ? '#page=1' : ''}`}
              target="_blank"
              rel="noopener noreferrer"
              style={buttonStyle('filled')}
            >
              <Download size={15} />
              {doc.downloadButtonText || 'Download PDF'}
            </a>
          )}

          <p style={{
            fontSize: 11, color: 'var(--text-muted)', fontStyle: 'italic',
            textAlign: 'center', fontFamily: 'var(--font-body)', marginTop: 2,
          }}>
            {getLastUpdatedDate(doc.customDate)}
          </p>
        </div>
      </div>
    </div>
  );
};

/* ──────────────────────────────────────────────
   COLLAPSIBLE SECTION
   ────────────────────────────────────────────── */

const TemplatesSection: React.FC<{
  id: string;
  title: string;
  subtitle: string;
  emoji: string;
  docs: TemplateDocument[];
  isOpen: boolean;
  onToggle: () => void;
}> = ({ id, title, subtitle, emoji, docs, isOpen, onToggle }) => {
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
              {docs.length} document{docs.length === 1 ? '' : 's'}
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
            {docs.map((doc, i) => (
              <PremiumTemplateCard key={doc.id || i} doc={doc} index={i} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

/* ──────────────────────────────────────────────
   STAT CARD
   ────────────────────────────────────────────── */

const StatCard: React.FC<{ icon: React.ReactNode; value: string; label: string; delay: string }> = ({ icon, value, label, delay }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 16, padding: '20px 24px',
        textAlign: 'center',
        transition: 'all 0.4s cubic-bezier(0.23,1,0.32,1)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered ? '0 12px 40px rgba(0,0,0,0.2)' : 'none',
        animation: `fadeSlideIn 0.5s ease-out ${delay} both`,
      }}
    >
      <div style={{ marginBottom: 8, opacity: 0.7 }}>{icon}</div>
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: 28, color: '#cda349', marginBottom: 4,
      }}>
        {value}
      </div>
      <div style={{
        fontSize: 12, color: 'rgba(232,237,226,0.5)',
        fontFamily: 'var(--font-body)', fontWeight: 600,
        textTransform: 'uppercase', letterSpacing: '0.06em',
      }}>
        {label}
      </div>
    </div>
  );
};

/* ──────────────────────────────────────────────
   DATA
   ────────────────────────────────────────────── */

const educationalGuides: TemplateDocument[] = [
  {
    id: 'sba-common-phrases',
    title: "SBA Common Phrases",
    description: "Decode SBA terminology and understand what loan officers really mean. Essential vocabulary for effective SBA communication.",
    volume: "Vol. 1",
    viewUrl: "https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/public/SMALLBIZRECON-FREEPUBLIC/1.%20SBA_Common_Phrases_(Vol.1)_SmallBiz_Recon_2026.pdf",
    downloadPath: "https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/public/SMALLBIZRECON-FREEPUBLIC/1.%20SBA_Common_Phrases_(Vol.1)_SmallBiz_Recon_2026.pdf",
    customDate: "*LAST UPDATED JANUARY 31, 2026*",
    accentColor: "#CDA349",
  },
  {
    id: 'eidl-servicing-cheat-sheet',
    title: "Sabbi's EIDL Servicing Cheat Sheet",
    description: "Quick reference guide for COVID EIDL servicing actions, requirements, and common scenarios. Essential tips from former SBA professionals.",
    volume: "Vol. 2",
    viewUrl: "https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/public/SMALLBIZRECON-FREEPUBLIC/2.%20COVID_EIDL_Servicing_Guide_(Vol.2)_SmallBiz_Recon_2026.pdf",
    downloadPath: "https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/public/SMALLBIZRECON-FREEPUBLIC/2.%20COVID_EIDL_Servicing_Guide_(Vol.2)_SmallBiz_Recon_2026.pdf",
    customDate: "*LAST UPDATED JANUARY 31, 2026*",
    accentColor: "#CDA349",
  },
  {
    id: 'sba-loan-types',
    title: "SBA Loan Types",
    description: "Comprehensive overview of all SBA loan programs, eligibility requirements, and which program fits your business needs.",
    volume: "Vol. 3",
    viewUrl: "https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/public/SMALLBIZRECON-FREEPUBLIC/3.%20SBA_Loan_Types_(Vol.3)_SmallBiz_Recon_2026.pdf",
    downloadPath: "https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/public/SMALLBIZRECON-FREEPUBLIC/3.%20SBA_Loan_Types_(Vol.3)_SmallBiz_Recon_2026.pdf",
    customDate: "*LAST UPDATED JANUARY 31, 2026*",
    accentColor: "#CDA349",
  },
  {
    id: 'communicating-with-sba',
    title: "Communicating with the SBA",
    description: "Best practices for effective communication with SBA personnel, including email templates and phone call strategies.",
    volume: "Vol. 4",
    viewUrl: "https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/public/SMALLBIZRECON-FREEPUBLIC/4.%20Communicating_With_The_SBA_(Vol.4)_SmallBiz_Recon_2026.pdf",
    downloadPath: "https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/public/SMALLBIZRECON-FREEPUBLIC/4.%20Communicating_With_The_SBA_(Vol.4)_SmallBiz_Recon_2026.pdf",
    customDate: "*LAST UPDATED JANUARY 30, 2026*",
    accentColor: "#CDA349",
  },
  {
    id: 'sba-random-facts',
    title: 'SBA Mission Briefing',
    description: 'Collection of 20 lesser-known SBA facts, statistics, and insider knowledge to help you navigate the SBA system more effectively.',
    volume: 'Vol. 7',
    viewUrl: 'https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/public/SMALLBIZRECON-FREEPUBLIC/SMALLBIZ_RECON_SBA_INTELLIGENCE_BRIEFING20.pdf',
    downloadPath: 'https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/public/sbarecon-free-pdfs//20%20Random%20Facts%20About%20the%20SBA%20(PRINT).pdf',
    customDate: '*LAST UPDATED JANUARY 30, 2026*',
    accentColor: '#CDA349',
    tags: ['SBA Basics'],
  },
];

const businessPlanningDocs: TemplateDocument[] = [
  {
    id: 'ten-steps-start-business',
    title: '10 Steps to Start your Business',
    description: 'Step-by-step roadmap for launching your business, from initial planning to opening day. Includes SBA resources and requirements.',
    volume: 'Vol. 5',
    viewUrl: 'https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/public/SMALLBIZRECON-FREEPUBLIC/5.%2010_Steps_Guide(Vol.5)_SmallBiz_Recon_2026.pdf',
    downloadPath: 'https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/public/SMALLBIZRECON-FREEPUBLIC/5.%2010_Steps_Guide(Vol.5)_SmallBiz_Recon_2026.pdf',
    customDate: '*LAST UPDATED JANUARY 30, 2026*',
    accentColor: '#CDA349',
    tags: ['Business Basics', 'Startup'],
  },
  {
    id: 'what-is-business-plan',
    title: 'What is a Business Plan',
    description: 'Complete guide to creating an effective business plan that meets SBA requirements and impresses lenders.',
    volume: 'Vol. 6',
    viewUrl: 'https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/public/SMALLBIZRECON-FREEPUBLIC/6.%20Business_Plan_Tactical_Guide%20(Vol.6)_SmallBiz_Recon.pdf',
    downloadPath: 'https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/public/SMALLBIZRECON-FREEPUBLIC/6.%20Business_Plan_Tactical_Guide%20(Vol.6)_SmallBiz_Recon.pdf',
    customDate: '*UPDATED JANUARY 30, 2026*',
    accentColor: '#CDA349',
    tags: ['Business Plan', 'Startup'],
  },
  {
    id: 'business-plan-example-1',
    title: 'Business Plan, Example 1',
    description: 'Detailed sample business plan for a startup company seeking SBA funding. Includes all required sections and financial projections.',
    volume: 'Vol. 8',
    viewUrl: "https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/public/sbarecon-free-pdfs//Sabbi's%20Sample%20Business%20Plan%20and%20Key%20Business%20Terms%20(1).pdf",
    downloadPath: "https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/public/sbarecon-free-pdfs//Sabbi's%20Sample%20Business%20Plan%20and%20Key%20Business%20Terms%20(1).docx",
    customButtonText: 'View PDF Now',
    downloadButtonText: 'Download .docx',
    customDate: '*LAST UPDATED JANUARY 30, 2026*',
    accentColor: '#CDA349',
    tags: ['Planning', 'Templates'],
  },
  {
    id: 'business-plan-example-2',
    title: 'Business Plan, Example 2',
    description: 'Detailed sample business plan for a startup company seeking SBA funding. Includes all required sections and financial projections.',
    volume: 'Vol. 9',
    viewUrl: 'https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/public/SMALLBIZRECON-FREEPUBLIC/2026_SmallBiz_Recon_Startup-Business-Plan-Template.pdf',
    downloadPath: 'https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/public/SMALLBIZRECON-FREEPUBLIC/2026_SmallBiz_Recon_Startup-Business-Plan-Template.docx',
    customDate: '*LAST UPDATED JANUARY 30, 2026*',
    accentColor: '#CDA349',
    tags: ['Planning', 'Templates'],
  },
];

const submissionToolsDocs: TemplateDocument[] = [
  {
    id: 'subordination-upgraded-cerificate',
    title: "Subordination Upgraded Certificate",
    description: "Certificate of Completion for completing the SmallBiz Recon™ Subordination Interactive Guide Quiz",
    volume: "Certificate",
    viewUrl: "https://zrktinvphjmalvrsjmii.supabase.co/storage/v1/object/sign/SmallBiz%20Recon%20Paid%20Templates/Black%20Gold%20Simple%20SUB%20Certificate%20of%20Participation%20A4%20Document%20.pdf%20(1).pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xZmUwNzEzYS00ZTVhLTQ3ZWYtODNlNS0xYjgxOWVlMjk2NzgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJTbWFsbEJpeiBSZWNvbiBQYWlkIFRlbXBsYXRlcy9CbGFjayBHb2xkIFNpbXBsZSBTVUIgQ2VydGlmaWNhdGUgb2YgUGFydGljaXBhdGlvbiBBNCBEb2N1bWVudCAucGRmICgxKS5wZGYiLCJpYXQiOjE3NzE3Mzk5OTgsImV4cCI6MTgzMDIzMjc5OH0.qjauVJMPk2al0yZNbjGFMX7qp5q2ZYRpRDWl2wNN6_Q",
    downloadPath: "https://zrktinvphjmalvrsjmii.supabase.co/storage/v1/object/sign/SmallBiz%20Recon%20Paid%20Templates/Black%20Gold%20Simple%20SUB%20Certificate%20of%20Participation%20A4%20Document%20.pdf%20(1).pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xZmUwNzEzYS00ZTVhLTQ3ZWYtODNlNS0xYjgxOWVlMjk2NzgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJTbWFsbEJpeiBSZWNvbiBQYWlkIFRlbXBsYXRlcy9CbGFjayBHb2xkIFNpbXBsZSBTVUIgQ2VydGlmaWNhdGUgb2YgUGFydGljaXBhdGlvbiBBNCBEb2N1bWVudCAucGRmICgxKS5wZGYiLCJpYXQiOjE3NzE3Mzk5OTgsImV4cCI6MTgzMDIzMjc5OH0.qjauVJMPk2al0yZNbjGFMX7qp5q2ZYRpRDWl2wNN6_Q",
    customDate: "*LAST UPDATED FEBRUARY 22, 2026*",
    accentColor: "#CDA349",
  },
  {
    id: 'subordination-submission-checklist',
    title: "Subordination Submission Checklist",
    description: "Comprehensive checklist to ensure your Subordination package is complete before submission",
    volume: "Submission Checklist",
    viewUrl: "https://zrktinvphjmalvrsjmii.supabase.co/storage/v1/object/sign/SmallBiz%20Recon%20Paid%20Templates/SUBORDINATION%20SUBMISSION%20CHECKLIST.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xZmUwNzEzYS00ZTVhLTQ3ZWYtODNlNS0xYjgxOWVlMjk2NzgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJTbWFsbEJpeiBSZWNvbiBQYWlkIFRlbXBsYXRlcy9TVUJPUkRJTkFUSU9OIFNVQk1JU1NJT04gQ0hFQ0tMSVNULnBkZiIsImlhdCI6MTc3MTc0MzE5NiwiZXhwIjoxODMwMjM1OTk2fQ.nlf-7KCAJJPZ75geEMkYIHcv6JC9O3IoEOdaJFfwTCI",
    downloadPath: "https://zrktinvphjmalvrsjmii.supabase.co/storage/v1/object/sign/SmallBiz%20Recon%20Paid%20Templates/SUBORDINATION%20SUBMISSION%20CHECKLIST.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xZmUwNzEzYS00ZTVhLTQ3ZWYtODNlNS0xYjgxOWVlMjk2NzgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJTbWFsbEJpeiBSZWNvbiBQYWlkIFRlbXBsYXRlcy9TVUJPUkRJTkFUSU9OIFNVQk1JU1NJT04gQ0hFQ0tMSVNULnBkZiIsImlhdCI6MTc3MTc0MzE5NiwiZXhwIjoxODMwMjM1OTk2fQ.nlf-7KCAJJPZ75geEMkYIHcv6JC9O3IoEOdaJFfwTCI",
    customDate: "*LAST UPDATED FEBRUARY 22, 2026*",
    accentColor: "#CDA349",
  },
  {
    id: 'sub-submission-cover-sheet',
    title: "Subordination Submission Cover Sheet",
    description: "Template cover sheet for organizing your Subordination request submission",
    volume: "Submission Template",
    viewUrl: "https://zrktinvphjmalvrsjmii.supabase.co/storage/v1/object/sign/SmallBiz%20Recon%20Paid%20Templates/SUB%20COVER%20and%20CHECKLIST.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xZmUwNzEzYS00ZTVhLTQ3ZWYtODNlNS0xYjgxOWVlMjk2NzgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJTbWFsbEJpeiBSZWNvbiBQYWlkIFRlbXBsYXRlcy9TVUIgQ09WRVIgYW5kIENIRUNLTElTVC5wZGYiLCJpYXQiOjE3NzE3NDQxMTEsImV4cCI6MTgzMDIzNjkxMX0.kmeMXR-gulu2y4eh5KE1HYKLjOxfWPk7lLlgOFRw9bA",
    downloadPath: "https://zrktinvphjmalvrsjmii.supabase.co/storage/v1/object/sign/SmallBiz%20Recon%20Paid%20Templates/SUB%20COVER%20and%20CHECKLIST.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xZmUwNzEzYS00ZTVhLTQ3ZWYtODNlNS0xYjgxOWVlMjk2NzgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJTbWFsbEJpeiBSZWNvbiBQYWlkIFRlbXBsYXRlcy9TVUIgQ09WRVIgYW5kIENIRUNLTElTVC5wZGYiLCJpYXQiOjE3NzE3NDQxMTEsImV4cCI6MTgzMDIzNjkxMX0.kmeMXR-gulu2y4eh5KE1HYKLjOxfWPk7lLlgOFRw9bA",
    customDate: "*LAST UPDATED FEBRUARY 22, 2026*",
    accentColor: "#CDA349",
  },
  {
    id: 'borrower-authorization',
    title: "Borrower Authorization",
    description: "Borrower's consent to verify information and third-party authorization for disaster loan servicing action request packages",
    volume: "Authorization",
    viewUrl: "https://www.sba.gov/document/sba-form-borrowers-consent-verify-information-third-party-authorization",
    downloadPath: "https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/public/sbaforms//BDLSC%20%20Borrower%20Authorization%20-%205-23.pdf",
    accentColor: "#A2B98C",
  },
  {
    id: 'irs-form-4506-T',
    title: "IRS Form 4506-T",
    description: "Pre-filled IRS Form 4506-T used for SBA Covid EIDL disaster loan applicants",
    volume: "Tax Return Request",
    viewUrl: "https://www.irs.gov/forms-pubs/about-form-4506-t",
    downloadPath: "https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/public/sbaforms//Form%204506-C%20(2024%20Tax%20Yr)%20508.pdf",
    accentColor: "#CDA349",
    customDate: "*LAST UPDATED JANUARY 30, 2026*",
  },
  {
    id: 'sba-franchise-directory',
    title: "SBA Franchise Directory",
    description: "Available for Lenders/CDCs to assess a small business's eligibility under an agreement",
    volume: "",
    viewUrl: "https://www.sba.gov/document/support-sba-franchise-directory",
    downloadPath: "https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/public/sbaforms//Franchise%20Directory%20July%207%202025.xlsx",
    customButtonText: "View on SBA.gov",
    downloadButtonText: "Download .xlsx",
    customDate: "*LAST UPDATED JANUARY 30, 2026*",
    accentColor: "#CDA349",
  },
];

/* ──────────────────────────────────────────────
   MAIN PAGE
   ────────────────────────────────────────────── */

const SubordinationTemplatesPage: React.FC = () => {
  const [theme, setTheme] = useState('dark');
  const [openSections, setOpenSections] = useState<Set<string>>(new Set(['guides']));

  const isDark = theme === 'dark';
  const vars = THEMES[theme as keyof typeof THEMES];
  const cssVarString = Object.entries(vars).map(([k, v]) => `${k}: ${v};`).join('\n');

  const toggleSection = (id: string) => {
    const next = new Set(openSections);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setOpenSections(next);
  };

  const totalDocs = educationalGuides.length + businessPlanningDocs.length + submissionToolsDocs.length;

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
        @keyframes textReveal {
          from { opacity: 0; transform: translateY(16px); filter: blur(4px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.85); }
          to { opacity: 1; transform: scale(1); }
        }

        * { box-sizing: border-box; }

        .sub-templates-page {
          min-height: 100vh;
          font-family: var(--font-body);
          background: var(--bg-primary);
          color: var(--text-primary);
          overflow-x: hidden;
          position: relative;
          transition: background 0.5s ease, color 0.4s ease;
        }
        .sub-templates-page::before {
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
        .sub-templates-page a { color: inherit; }

        @media (max-width: 768px) {
          .sub-templates-hero-title { font-size: 28px !important; }
          .sub-templates-hero-inner { padding: 36px 16px 48px !important; }
          .sub-templates-stats-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>

      <div className="sub-templates-page">
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
            {/* Gold radial glow */}
            <div style={{
              position: 'absolute', top: '30%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 450, height: 450, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(200,168,78,0.08) 0%, transparent 55%)',
              pointerEvents: 'none',
              animation: 'goldPulse 6s ease-in-out infinite',
            }} />

            {/* Secondary ambient glow */}
            <div style={{
              position: 'absolute', bottom: '-20%', right: '10%',
              width: 300, height: 300, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(126,168,94,0.06) 0%, transparent 60%)',
              pointerEvents: 'none',
              animation: 'goldPulse 8s ease-in-out infinite 2s',
            }} />

            <div className="sub-templates-hero-inner" style={{
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
                animation: 'scaleIn 0.6s ease-out 0.2s both',
              }}>
                <Library size={34} color="#cda349" strokeWidth={1.5} />
              </div>

              {/* Badge */}
              <div style={{ textAlign: 'center', marginBottom: 14, animation: 'textReveal 0.5s ease-out 0.3s both' }}>
                <span style={{
                  padding: '5px 16px', borderRadius: 100,
                  background: 'rgba(200,168,78,0.12)',
                  border: '1px solid rgba(200,168,78,0.25)',
                  fontSize: 11, fontWeight: 700,
                  color: '#cda349', fontFamily: 'var(--font-body)',
                  textTransform: 'uppercase', letterSpacing: '0.1em',
                }}>
                  ★ Premium Document Library
                </span>
              </div>

              <h1 className="sub-templates-hero-title" style={{
                fontFamily: 'var(--font-display)',
                fontSize: 46, fontWeight: 400,
                textAlign: 'center', color: '#e8ede2',
                lineHeight: 1.15, letterSpacing: '-0.02em',
                marginBottom: 16,
                animation: 'textReveal 0.6s ease-out 0.35s both',
              }}>
                Subordination Templates &{' '}
                <span style={{ fontStyle: 'italic', color: '#cda349' }}>Documents</span>
              </h1>

              <p style={{
                textAlign: 'center', fontSize: 16,
                color: 'rgba(232,237,226,0.6)',
                lineHeight: 1.75, maxWidth: 660, margin: '0 auto 36px',
                fontFamily: 'var(--font-body)',
                animation: 'textReveal 0.6s ease-out 0.4s both',
              }}>
                Essential templates, guides, and official documents designed to help you navigate the SBA subordination process with clarity and confidence.
              </p>

              {/* Quick nav pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', animation: 'fadeSlideIn 0.5s ease-out 0.5s both' }}>
                {[
                  { href: '#guides', emoji: '📚', label: 'Educational Guides' },
                  { href: '#planning', emoji: '📋', label: 'Business Planning' },
                  { href: '#tools', emoji: '🛠️', label: 'Submission Tools' },
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

              {/* Stats row */}
              <div
                className="sub-templates-stats-grid"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: 16, marginTop: 40,
                  maxWidth: 540, marginLeft: 'auto', marginRight: 'auto',
                }}
              >
                <StatCard
                  icon={<FileText size={20} color="#cda349" />}
                  value={`${totalDocs}`}
                  label="Documents"
                  delay="0.55s"
                />
                <StatCard
                  icon={<BookOpen size={20} color="#cda349" />}
                  value="9"
                  label="Guides"
                  delay="0.6s"
                />
                <StatCard
                  icon={<Award size={20} color="#cda349" />}
                  value="SBA"
                  label="Expert Curated"
                  delay="0.65s"
                />
              </div>
            </div>
          </div>

          {/* ═══════════ SECTION HEADER ═══════════ */}
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 24px 8px' }}>
            <div style={{ animation: 'fadeSlideUp 0.7s ease-out 0.2s both', marginBottom: 8 }}>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 28, fontWeight: 400,
                color: 'var(--text-primary)', marginBottom: 8,
              }}>
                Expert Subordination tools to help guide you through{' '}
                <span style={{ fontStyle: 'italic', color: 'var(--accent-gold)' }}>confusing Government red tape</span>
              </h2>
              <p style={{
                fontSize: 15, color: 'var(--text-secondary)',
                lineHeight: 1.7, fontFamily: 'var(--font-body)',
              }}>
                Helpful templates & documents compiled by former SBA insiders to help you succeed with subordination requests
              </p>
            </div>
          </div>

          {/* ═══════════ DOCUMENT SECTIONS ═══════════ */}
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 24px 32px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div style={{ animation: 'fadeSlideUp 0.7s ease-out 0.25s both' }}>
                <TemplatesSection
                  id="guides"
                  title="Educational Guides"
                  subtitle="SBA terminology decoders, servicing cheat sheets, and insider knowledge compiled by former SBA professionals to give you an edge."
                  emoji="📚"
                  docs={educationalGuides}
                  isOpen={openSections.has('guides')}
                  onToggle={() => toggleSection('guides')}
                />
              </div>

              <div style={{ animation: 'fadeSlideUp 0.7s ease-out 0.3s both' }}>
                <TemplatesSection
                  id="planning"
                  title="Business Planning"
                  subtitle="Step-by-step roadmaps, business plan templates, and sample plans to help you launch or grow your business with SBA support."
                  emoji="📋"
                  docs={businessPlanningDocs}
                  isOpen={openSections.has('planning')}
                  onToggle={() => toggleSection('planning')}
                />
              </div>

              <div style={{ animation: 'fadeSlideUp 0.7s ease-out 0.35s both' }}>
                <TemplatesSection
                  id="tools"
                  title="Submission Tools & Official Forms"
                  subtitle="Certificates, checklists, cover sheets, authorization forms, and official SBA documents needed for your subordination submission packages."
                  emoji="🛠️"
                  docs={submissionToolsDocs}
                  isOpen={openSections.has('tools')}
                  onToggle={() => toggleSection('tools')}
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
                    More Subordination Content Coming Soon
                  </h4>
                  <div style={{
                    fontSize: 13, color: 'var(--text-secondary)',
                    lineHeight: 1.8, fontFamily: 'var(--font-body)',
                  }}>
                    <p>• All SmallBiz Recon™ subordination templates & documents are regularly reviewed and updated</p>
                    <p>• Our team of former SBA professionals ensures the most current information</p>
                    <p>• Check back regularly for new guides and updates</p>
                    <p>• Your toolkit includes completion guides for all required forms</p>
                    <p>• Always verify current versions on the official SBA website before submission</p>
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

export default SubordinationTemplatesPage;