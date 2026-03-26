import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download, FileText, FileSpreadsheet as Spreadsheet, Mail, CircleCheck as CheckCircle, ExternalLink, X, Package, FolderOpen, MessageSquare, ShieldCheck, Sparkles, Lock, ChevronRight, Sun, Moon, BookOpen, CircleAlert as AlertCircle, Play, Award, Bot } from 'lucide-react';

import { TOOLKIT_TYPES, setUnlockedToolkit } from '../../utils/codeValidation';

/* ──────────────────────────────────────────────
   TYPES
   ────────────────────────────────────────────── */

type ResourceType = 'html' | 'pdf' | 'excel' | 'zip' | 'internal-link';

type ToolkitResource = {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
  type: ResourceType;
  isInteractive?: boolean;
  buttonText?: string;
  badge?: string;
};

type ToolkitData = {
  title: string;
  description: string;
  resources: ToolkitResource[];
};

interface ToolkitContentProps {
  toolkitType: 'subordination' | 'collateral';
  onClose: () => void;
  startResourceId?: string | null;
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

/* ──────────────────────────────────────────────
   AMBIENT EFFECTS
   ────────────────────────────────────────────── */

function PremiumGrid() {
  return (
    <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0, opacity: 'var(--grid-opacity)' }}>
      <svg width="100%" height="100%">
        <defs>
          <pattern id="subGrid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="var(--accent-gold)" strokeWidth="0.4" />
          </pattern>
          <pattern id="subGridDiag" width="96" height="96" patternUnits="userSpaceOnUse">
            <path d="M 0 96 L 96 0" fill="none" stroke="var(--accent-gold)" strokeWidth="0.2" opacity="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#subGrid)" />
        <rect width="100%" height="100%" fill="url(#subGridDiag)" />
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
   PREMIUM RESOURCE CARD (inline styles)
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
              background: 'rgba(200,168,78,0.12)',
              border: '1px solid rgba(200,168,78,0.25)',
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
   BUTTON HELPER
   ────────────────────────────────────────────── */

const premiumButtonStyle = (variant: 'filled' | 'outline'): React.CSSProperties => ({
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
  ...(variant === 'filled'
    ? {
        background: 'linear-gradient(135deg, rgba(126,168,94,0.35), rgba(126,168,94,0.12))',
        border: '1px solid rgba(126,168,94,0.45)',
        color: 'var(--text-primary)',
      }
    : {
        background: 'transparent',
        border: '1px solid var(--border-primary)',
        color: 'var(--text-primary)',
      }),
});

/* ──────────────────────────────────────────────
   TOOLKIT MODAL (preserved with premium styling)
   ────────────────────────────────────────────── */

const ToolkitContent: React.FC<ToolkitContentProps> = ({ toolkitType, onClose, startResourceId }) => {
  const toolkitData: ToolkitData | null = useMemo(() => {
    switch (toolkitType) {
      case 'subordination':
        return {
          title: 'COVID EIDL DIY Subordination Toolkit',
          description: 'Your complete guide for the DIY loan subordination process',
          resources: [
            {
              id: 'sub-html',
              icon: <ExternalLink className="w-5 h-5" />,
              title: 'Interactive HTML Guide',
              description: 'Visual, clickable roadmap from start to submission',
              link: '/interactive-subordination-guide.html',
              type: 'html' as ResourceType,
              isInteractive: true,
              badge: 'Interactive',
            },
            {
              id: 'sub-pdf-pro',
              icon: <FileText className="w-5 h-5" />,
              title: 'Advanced PDF Pro Guide',
              description: 'Premium PDF reference guide for the subordination process',
              link: 'https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/sign/SMALLBIZ%20RECON/COVID_EIDL_Subordination_Premium_Guide_2026.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85MzZjNmFmNC1iMzA2LTQzMmMtYWFjNy03ZmRmYjU1NDRjMzUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJTTUFMTEJJWiBSRUNPTi9DT1ZJRF9FSURMX1N1Ym9yZGluYXRpb25fUHJlbWl1bV9HdWlkZV8yMDI2LnBkZiIsImlhdCI6MTc2OTg0MjY5MywiZXhwIjoxODYxODU4NjkzfQ.3fLaZ2khmKZQPSHsHRP_Bkov7oVBoZ-U4afwZABth0s',
              type: 'pdf' as ResourceType,
              badge: 'Pro',
            },
            {
              id: 'sub-pdf-print',
              icon: <FileText className="w-5 h-5" />,
              title: 'Printable PDF Guide',
              description: 'Print friendly companion for long-form review',
              link: 'https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/sign/SMALLBIZ%20RECON/COVID%20EIDL%20Subordination%20Toolkit%20(PRINT).pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85MzZjNmFmNC1iMzA2LTQzMmMtYWFjNy03ZmRmYjU1NDRjMzUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJTTUFMTEJJWiBSRUNPTi9DT1ZJRCBFSURMIFN1Ym9yZGluYXRpb24gVG9vbGtpdCAoUFJJTlQpLnBkZiIsImlhdCI6MTc3MDAwMzA5NiwiZXhwIjoxODYxOTMyNjk2fQ.CWRHJiudOYK2_i-KKiK2x1Pkrm0vkJb_MfnnoNaZnBQ',
              type: 'pdf' as ResourceType,
            },
            {
              id: 'sub-tracking',
              icon: <Spreadsheet className="w-5 h-5" />,
              title: 'Tracking Tools',
              description: 'Communication tracking spreadsheet and submission checklists',
              link: 'https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/sign/SMALLBIZ%20RECON/SBA%20Interactive%20Contact%20Log%202.0%20(2026).xlsx?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85MzZjNmFmNC1iMzA2LTQzMmMtYWFjNy03ZmRmYjU1NDRjMzUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJTTUFMTEJJWiBSRUNPTi9TQkEgSW50ZXJhY3RpdmUgQ29udGFjdCBMb2cgMi4wICgyMDI2KS54bHN4IiwiaWF0IjoxNzY5ODgyNDEwLCJleHAiOjE4NjE4OTg0MTB9.tKzAlu5Kx070zeglr8pxBTLVUMqrwT3p7NMkXNsdsps',
              type: 'excel' as ResourceType,
              badge: '2026',
            },
            {
              id: 'sub-templates',
              icon: <Mail className="w-5 h-5" />,
              title: 'Templates & Docs',
              description: 'Sample letters, forms, and professional templates',
              link: '/access/subordination/templates',
              type: 'internal-link' as ResourceType,
              buttonText: 'View Templates',
            },
          ],
        };

      case 'collateral':
        return {
          title: 'DIY COVID EIDL Release of Collateral Toolkit',
          description: 'Expert guidance for the DIY collateral release process',
          resources: [
            {
              id: 'roc-html',
              icon: <ExternalLink className="w-5 h-5" />,
              title: 'Interactive HTML Guide',
              description: 'Step-by-step visual guide for the collateral release process',
              link: '/interactive-collateral-release-guide.html',
              type: 'html' as ResourceType,
              isInteractive: true,
              badge: 'Interactive',
            },
            {
              id: 'roc-pdf',
              icon: <FileText className="w-5 h-5" />,
              title: 'Printable PDF Guide',
              description: 'Complete offline reference for the collateral release process',
              link: '/downloads/roc-printable.pdf',
              type: 'pdf' as ResourceType,
              badge: 'Set real link',
            },
            {
              id: 'roc-tracking',
              icon: <Spreadsheet className="w-5 h-5" />,
              title: 'Tracking Tools',
              description: 'Communication tracking spreadsheet and submission checklists',
              link: 'https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/sign/SMALLBIZ%20RECON/SBA%20Interactive%20Contact%20Log%202.0%20(2026).xlsx?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85MzZjNmFmNC1iMzA2LTQzMmMtYWFjNy03ZmRmYjU1NDRjMzUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJTTUFMTEJJWiBSRUNPTi9TQkEgSW50ZXJhY3RpdmUgQ29udGFjdCBMb2cgMi4wICgyMDI2KS54bHN4IiwiaWF0IjoxNzY5ODgyNDEwLCJleHAiOjE4NjE4OTg0MTB9.tKzAlu5Kx070zeglr8pxBTLVUMqrwT3p7NMkXNsdsps',
              type: 'excel' as ResourceType,
              badge: '2026',
            },
            {
              id: 'roc-templates',
              icon: <Mail className="w-5 h-5" />,
              title: 'Sample Letters & Docs',
              description: 'Professional templates for collateral release requests',
              link: '/access/collateral/templates',
              type: 'internal-link' as ResourceType,
              buttonText: 'View Templates',
              badge: 'Set real route',
            },
          ],
        };

      default:
        return null;
    }
  }, [toolkitType]);

  const [interactiveResource, setInteractiveResource] = useState<ToolkitResource | null>(null);

  useEffect(() => {
    if (!toolkitData) return;
    if (startResourceId) {
      const found = toolkitData.resources.find((r) => r.id === startResourceId);
      if (found?.isInteractive) setInteractiveResource(found);
    }
  }, [startResourceId, toolkitData]);

  if (!toolkitData) return null;

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 120,
      padding: '96px 16px 16px',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      {/* Overlay */}
      <div
        onClick={onClose}
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0,
          background: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(4px)',
        }}
      />

      {/* Modal */}
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: 1100,
        maxHeight: 'calc(100vh - 7rem)',
        overflowY: 'auto',
        borderRadius: 24,
        background: 'var(--bg-card)',
        backdropFilter: 'var(--glass-blur)',
        WebkitBackdropFilter: 'var(--glass-blur)',
        border: '1px solid var(--border-gold)',
        boxShadow: '0 32px 80px rgba(0,0,0,0.5)',
        animation: 'fadeSlideIn 0.35s ease both',
      }}>
        {/* Modal Header */}
        <div style={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '24px 24px 0 0',
          background: 'var(--bg-hero)',
          padding: 28,
          borderBottom: '1px solid var(--border-gold)',
        }}>
          <div style={{
            position: 'absolute', top: '50%', left: '30%',
            transform: 'translate(-50%,-50%)',
            width: 300, height: 300, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(200,168,78,0.06) 0%, transparent 60%)',
            pointerEvents: 'none',
          }} />

          <button
            onClick={onClose}
            type="button"
            aria-label="Close"
            style={{
              position: 'absolute', top: 16, right: 16,
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 12, padding: 8,
              color: '#c8e0b4', cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          >
            <X size={20} />
          </button>

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <div style={{
                width: 44, height: 44, borderRadius: 14,
                background: 'rgba(126,168,94,0.15)',
                border: '1px solid rgba(126,168,94,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <CheckCircle size={24} color="#7ea85e" />
              </div>
              <div>
                <h2 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 24, fontWeight: 400,
                  color: '#e8ede2',
                }}>
                  Access <span style={{ fontStyle: 'italic', color: '#cda349' }}>Granted</span>
                </h2>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  fontSize: 12, color: 'rgba(232,237,226,0.6)',
                  fontFamily: 'var(--font-body)',
                }}>
                  <Lock size={12} />
                  Lifetime access · re-download anytime
                </div>
              </div>
            </div>

            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 18, fontWeight: 400, color: '#e8ede2',
              marginBottom: 4,
            }}>
              {toolkitData.title}
            </h3>
            <p style={{
              fontSize: 13, color: 'rgba(232,237,226,0.6)',
              fontFamily: 'var(--font-body)',
            }}>
              {toolkitData.description}
            </p>
          </div>
        </div>

        {/* Modal Content */}
        <div style={{ padding: 28 }}>
          {interactiveResource ? (
            <div>
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                gap: 12, marginBottom: 16,
                padding: '12px 16px',
                borderRadius: 14,
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-primary)',
              }}>
                <button
                  onClick={() => setInteractiveResource(null)}
                  type="button"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    background: 'none', border: 'none',
                    color: 'var(--accent-green)', fontSize: 13, fontWeight: 600,
                    fontFamily: 'var(--font-body)', cursor: 'pointer',
                  }}
                >
                  <ArrowLeft size={14} />
                  Back to Resources
                </button>
                <a
                  href={interactiveResource.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    ...premiumButtonStyle('filled'),
                    width: 'auto',
                    padding: '8px 16px',
                  }}
                >
                  <ExternalLink size={14} />
                  Open in New Tab
                </a>
              </div>

              <div style={{
                borderRadius: 16,
                overflow: 'hidden',
                border: '1px solid var(--border-primary)',
                boxShadow: '0 12px 40px rgba(0,0,0,0.3)',
                height: 'calc(100vh - 300px)',
              }}>
                <iframe
                  src={interactiveResource.link}
                  title={interactiveResource.title}
                  style={{ width: '100%', height: '100%', border: 'none' }}
                />
              </div>
            </div>
          ) : (
            <>
              <h4 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 18, fontWeight: 400,
                color: 'var(--text-primary)', marginBottom: 6,
              }}>
                Your Toolkit Resources
              </h4>
              <p style={{
                fontSize: 13, color: 'var(--text-secondary)',
                fontFamily: 'var(--font-body)', marginBottom: 20,
              }}>
                Click any item to open or download. Everything included with your purchase is here.
              </p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: 16,
              }}>
                {toolkitData.resources.map((resource, i) => {
                  const isInteractive = resource.isInteractive;
                  const isInternal = resource.type === 'internal-link';
                  const isPdf = resource.type === 'pdf';

                  const cardContent = (
                    <div style={{
                      padding: 16, borderRadius: 14,
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-primary)',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                        <div style={{
                          width: 36, height: 36, borderRadius: 10,
                          background: 'var(--accent-gold-dim)',
                          border: '1px solid var(--border-gold)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          flexShrink: 0, color: 'var(--accent-gold)',
                        }}>
                          {resource.icon}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                            <span style={{
                              fontSize: 14, fontWeight: 600,
                              color: 'var(--text-primary)',
                              fontFamily: 'var(--font-body)',
                            }}>
                              {resource.title}
                            </span>
                            {resource.badge && (
                              <span style={{
                                fontSize: 9, fontWeight: 700,
                                padding: '2px 7px', borderRadius: 5,
                                background: 'rgba(200,168,78,0.12)',
                                border: '1px solid rgba(200,168,78,0.25)',
                                color: 'var(--accent-gold)',
                                textTransform: 'uppercase',
                                fontFamily: 'var(--font-body)',
                              }}>
                                {resource.badge}
                              </span>
                            )}
                          </div>
                          <p style={{
                            fontSize: 12, color: 'var(--text-secondary)',
                            fontFamily: 'var(--font-body)', lineHeight: 1.5,
                          }}>
                            {resource.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );

                  if (isInteractive) {
                    return (
                      <button
                        key={resource.id}
                        type="button"
                        onClick={() => setInteractiveResource(resource)}
                        style={{ all: 'unset', display: 'block', width: '100%', cursor: 'pointer' }}
                      >
                        {cardContent}
                      </button>
                    );
                  }
                  if (isInternal) {
                    return (
                      <Link
                        key={resource.id}
                        to={resource.link}
                        onClick={onClose}
                        style={{ textDecoration: 'none', color: 'inherit' }}
                      >
                        {cardContent}
                      </Link>
                    );
                  }
                  return (
                    <a
                      key={resource.id}
                      href={isPdf ? `${resource.link}#page=1` : resource.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      {cardContent}
                    </a>
                  );
                })}
              </div>

              {/* Notes */}
              <div style={{
                marginTop: 24, padding: 20, borderRadius: 14,
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-primary)',
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <AlertCircle size={16} style={{ color: 'var(--accent-gold)', flexShrink: 0, marginTop: 2 }} />
                  <div style={{
                    fontSize: 12, color: 'var(--text-secondary)',
                    lineHeight: 1.8, fontFamily: 'var(--font-body)',
                  }}>
                    <p>• Save your access code — return anytime to re-download materials</p>
                    <p>• Resources may be updated periodically, your access remains active</p>
                    <p>• Support available through the website contact options</p>
                    <p>• Educational content only, not official SBA guidance</p>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 20, textAlign: 'center' }}>
                <button
                  onClick={onClose}
                  type="button"
                  style={{
                    ...premiumButtonStyle('filled'),
                    width: 'auto',
                    padding: '13px 32px',
                  }}
                >
                  Close and Continue
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

/* ──────────────────────────────────────────────
   MAIN PAGE
   ────────────────────────────────────────────── */

const SubordinationAccess: React.FC = () => {
  const [theme, setTheme] = useState('dark');
  const [showToolkitModal, setShowToolkitModal] = useState(false);
  const [modalStartResourceId, setModalStartResourceId] = useState<string | null>(null);

  const isDark = theme === 'dark';
  const vars = THEMES[theme as keyof typeof THEMES];
  const cssVarString = Object.entries(vars).map(([k, v]) => `${k}: ${v};`).join('\n');

  useEffect(() => {
    setUnlockedToolkit(TOOLKIT_TYPES.SUBORDINATION);
  }, []);

  const openModal = (startId: string | null = null) => {
    setModalStartResourceId(startId);
    setShowToolkitModal(true);
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
        @keyframes textReveal {
          from { opacity: 0; transform: translateY(16px); filter: blur(4px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }

        * { box-sizing: border-box; }

        .sub-access-page {
          min-height: 100vh;
          font-family: var(--font-body);
          background: var(--bg-primary);
          color: var(--text-primary);
          overflow-x: hidden;
          position: relative;
          transition: background 0.5s ease, color 0.4s ease;
        }
        .sub-access-page::before {
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
        .sub-access-page a { color: inherit; }

        @media (max-width: 768px) {
          .sub-hero-title { font-size: 28px !important; text-align: center !important; }
          .sub-hero-inner { padding: 36px 16px 48px !important; text-align: center !important; }
          .sub-cards-grid {
            grid-template-columns: 1fr !important;
            margin: 0 auto !important;
            max-width: 100% !important;
          }

          /* Center all content on mobile */
          .sub-access-page > div > div {
            text-align: center !important;
          }

          /* Center hero elements */
          .sub-hero-inner > div:first-of-type {
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
            text-align: center !important;
          }

          .sub-hero-inner > div:first-of-type > * {
            width: 100% !important;
            text-align: center !important;
            justify-content: center !important;
          }

          /* Center access panel content */
          .sub-access-page [style*="padding: 36px"] {
            padding: 24px 16px !important;
            text-align: center !important;
          }

          /* Center all buttons and flex containers */
          .sub-access-page [style*="display: flex"] {
            justify-content: center !important;
            align-items: center !important;
          }

          /* Center all text elements */
          .sub-access-page h1,
          .sub-access-page h2,
          .sub-access-page h3,
          .sub-access-page h4,
          .sub-access-page p {
            text-align: center !important;
            margin-left: auto !important;
            margin-right: auto !important;
          }

          /* Center all links */
          .sub-access-page a {
            margin-left: auto !important;
            margin-right: auto !important;
          }

          /* Ensure proper spacing on mobile */
          .sub-access-page > div[style*="padding"] {
            padding-left: 16px !important;
            padding-right: 16px !important;
          }

          /* Center modal content on mobile */
          .sub-access-page [style*="position: fixed"][style*="zIndex: 120"] {
            padding: 80px 12px 12px !important;
          }

          /* Adjust modal max width on mobile */
          .sub-access-page [style*="maxWidth: 1100"] {
            max-width: calc(100vw - 24px) !important;
          }

          /* Center important notes */
          .sub-access-page [style*="display: flex"][style*="alignItems: flex-start"] {
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
          }
        }
      `}</style>

      <div className="sub-access-page">
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
              background: 'radial-gradient(circle, rgba(200,168,78,0.08) 0%, transparent 55%)',
              pointerEvents: 'none',
              animation: 'goldPulse 6s ease-in-out infinite',
            }} />

            <div className="sub-hero-inner" style={{
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
                    color: '#c8e0b4', fontSize: 14, fontWeight: 600,
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
                animation: 'textReveal 0.6s ease-out 0.2s both',
              }}>
                <Package size={34} color="#cda349" strokeWidth={1.5} />
              </div>

              {/* Badge */}
              <div style={{ textAlign: 'center', marginBottom: 14, animation: 'textReveal 0.5s ease-out 0.25s both' }}>
                <span style={{
                  padding: '5px 16px', borderRadius: 100,
                  background: 'rgba(200,168,78,0.12)',
                  border: '1px solid rgba(200,168,78,0.25)',
                  fontSize: 11, fontWeight: 700,
                  color: '#cda349', fontFamily: 'var(--font-body)',
                  textTransform: 'uppercase', letterSpacing: '0.1em',
                }}>
                  ★ Premium Toolkit
                </span>
              </div>

              <h1 className="sub-hero-title" style={{
                fontFamily: 'var(--font-display)',
                fontSize: 46, fontWeight: 400,
                textAlign: 'center', color: '#e8ede2',
                lineHeight: 1.15, letterSpacing: '-0.02em',
                marginBottom: 16,
                animation: 'textReveal 0.6s ease-out 0.3s both',
              }}>
                COVID EIDL{' '}
                <span style={{ fontStyle: 'italic', color: '#cda349' }}>Subordination Toolkit</span>
              </h1>

              <p style={{
                textAlign: 'center', fontSize: 16,
                color: 'rgba(232,237,226,0.6)',
                lineHeight: 1.75, maxWidth: 620, margin: '0 auto 28px',
                fontFamily: 'var(--font-body)',
                animation: 'textReveal 0.6s ease-out 0.35s both',
              }}>
                Your complete DIY guide for navigating the SBA COVID EIDL subordination process with confidence.
              </p>

              {/* Trust pills */}
              <div style={{
                display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center',
                animation: 'fadeSlideIn 0.5s ease-out 0.45s both',
              }}>
                {[
                  { icon: <ShieldCheck size={13} />, label: 'Checklist Driven' },
                  { icon: <Sparkles size={13} />, label: 'Premium 2026' },
                  { icon: <Lock size={13} />, label: 'Lifetime Access' },
                ].map((pill, i) => (
                  <span key={i} style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    padding: '6px 14px', borderRadius: 10,
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: '#c8e0b4', fontSize: 12, fontWeight: 600,
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
                  background: 'linear-gradient(90deg, transparent, rgba(200,168,78,0.4), transparent)',
                  animation: 'shimmerSlide 4s ease-in-out infinite',
                }} />
              </div>

              <div style={{ padding: 36, textAlign: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 16 }}>
                  <CheckCircle size={36} style={{ color: 'var(--accent-green)' }} />
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
                  Welcome to your complete subordination toolkit. All materials are included with your purchase and available for lifetime access.
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
                    Sabbi 2.0 is now unlocked — chat with our context-aware assistant for subordination guidance.
                  </p>
                </div>

                {/* CTA Buttons */}
                <div style={{
                  display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center',
                }}>
                  <button
                    onClick={() => openModal(null)}
                    type="button"
                    style={{
                      ...premiumButtonStyle('filled'),
                      width: 'auto',
                      padding: '14px 32px',
                      fontSize: 15,
                    }}
                  >
                    Access Toolkit Resources →
                  </button>

                  <button
                    onClick={() => openModal('sub-html')}
                    type="button"
                    style={{
                      ...premiumButtonStyle('outline'),
                      width: 'auto',
                      padding: '14px 32px',
                      fontSize: 15,
                      borderColor: 'var(--border-gold)',
                    }}
                  >
                    <ExternalLink size={16} />
                    Launch Interactive Guide
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ═══════════ QUICK ACCESS CARDS ═══════════ */}
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px 0' }}>
            <div className="sub-cards-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 20,
            }}>
              {/* Interactive Guide */}
              <PremiumResourceCard
                icon={<ExternalLink size={22} color="#cda349" />}
                title="Interactive Guide"
                description="Step-by-step interactive HTML toolkit with a clickable roadmap from start to submission."
                accent="#cda349"
                badge="Interactive"
                index={0}
              >
                <button
                  onClick={() => openModal('sub-html')}
                  type="button"
                  style={premiumButtonStyle('filled')}
                >
                  <Play size={14} />
                  Launch Guide
                </button>
              </PremiumResourceCard>

              {/* PDF Pro Version */}
              <PremiumResourceCard
                icon={<FileText size={22} color="#cda349" />}
                title="PDF Pro Version"
                description="Premium PDF guide with comprehensive insights and detailed information for your subordination request."
                accent="#cda349"
                badge="Pro"
                index={1}
              >
                <a
                  href="https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/sign/SMALLBIZ%20RECON/COVID_EIDL_Subordination_Premium_Guide_2026.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85MzZjNmFmNC1iMzA2LTQzMmMtYWFjNy03ZmRmYjU1NDRjMzUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJTTUFMTEJJWiBSRUNPTi9DT1ZJRF9FSURMX1N1Ym9yZGluYXRpb25fUHJlbWl1bV9HdWlkZV8yMDI2LnBkZiIsImlhdCI6MTc2OTg0MjY5MywiZXhwIjoxODYxODU4NjkzfQ.3fLaZ2khmKZQPSHsHRP_Bkov7oVBoZ-U4afwZABth0s"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={premiumButtonStyle('filled')}
                >
                  <Download size={14} />
                  Download PDF Pro
                </a>
              </PremiumResourceCard>

              {/* PDF Printable */}
              <PremiumResourceCard
                icon={<FileText size={22} color="#7ea85e" />}
                title="PDF Version"
                description="Offline companion guide, print-friendly and comprehensive for your subordination request."
                accent="#7ea85e"
                index={2}
              >
                <a
                  href="https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/sign/SMALLBIZ%20RECON/COVID%20EIDL%20Subordination%20Toolkit%20(PRINT).pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85MzZjNmFmNC1iMzA2LTQzMmMtYWFjNy03ZmRmYjU1NDRjMzUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJTTUFMTEJJWiBSRUNPTi9DT1ZJRCBFSURMIFN1Ym9yZGluYXRpb24gVG9vbGtpdCAoUFJJTlQpLnBkZiIsImlhdCI6MTc3MDAwMzA5NiwiZXhwIjoxODYxOTMyNjk2fQ.CWRHJiudOYK2_i-KKiK2x1Pkrm0vkJb_MfnnoNaZnBQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={premiumButtonStyle('filled')}
                >
                  <Download size={14} />
                  Download PDF
                </a>
              </PremiumResourceCard>

              {/* Tracking Tools */}
              <PremiumResourceCard
                icon={<Spreadsheet size={22} color="#7ea85e" />}
                title="Tracking Tools"
                description="Communication tracking spreadsheet and submission checklists to stay organized."
                accent="#7ea85e"
                badge="2026"
                index={3}
              >
                <a
                  href="https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/sign/SMALLBIZ%20RECON/SBA%20Interactive%20Contact%20Log%202.0%20(2026).xlsx?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85MzZjNmFmNC1iMzA2LTQzMmMtYWFjNy03ZmRmYjU1NDRjMzUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJTTUFMTEJJWiBSRUNPTi9TQkEgSW50ZXJhY3RpdmUgQ29udGFjdCBMb2cgMi4wICgyMDI2KS54bHN4IiwiaWF0IjoxNzY5ODgyNDEwLCJleHAiOjE4NjE4OTg0MTB9.tKzAlu5Kx070zeglr8pxBTLVUMqrwT3p7NMkXNsdsps"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={premiumButtonStyle('filled')}
                >
                  <Download size={14} />
                  Download Tools
                </a>
              </PremiumResourceCard>

              {/* Templates & Docs */}
              <PremiumResourceCard
                icon={<Mail size={22} color="#cda349" />}
                title="Templates & Docs"
                description="Sample letters, forms, and professional templates for your subordination request."
                accent="#cda349"
                index={4}
              >
                <Link
                  to="/access/subordination/templates"
                  style={premiumButtonStyle('filled')}
                >
                  <FileText size={14} />
                  View Templates
                </Link>
              </PremiumResourceCard>

              {/* Advanced Forms Library */}
              <PremiumResourceCard
                icon={<FolderOpen size={22} color="#cda349" />}
                title="Advanced Forms Library"
                description="View all premium subordination forms categorized by usage for your request."
                accent="#cda349"
                badge="Library"
                index={5}
              >
                <Link
                  to="/access/subordination/forms"
                  style={premiumButtonStyle('filled')}
                >
                  <BookOpen size={14} />
                  View Forms
                </Link>
              </PremiumResourceCard>
            </div>
          </div>

          {/* ═══════════ INTERACTIVE GUIDE LAUNCHER ═══════════ */}
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
                  background: 'linear-gradient(90deg, transparent, rgba(200,168,78,0.4), transparent)',
                  animation: 'shimmerSlide 4s ease-in-out infinite',
                }} />
              </div>

              <div style={{
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%,-50%)',
                width: 300, height: 300, borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(200,168,78,0.05), transparent 60%)',
                pointerEvents: 'none',
                animation: 'goldPulse 6s ease-in-out infinite',
              }} />

              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{
                  width: 56, height: 56, borderRadius: 16,
                  background: 'linear-gradient(135deg, rgba(200,168,78,0.2), rgba(200,168,78,0.06))',
                  border: '1px solid rgba(200,168,78,0.25)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 16px',
                }}>
                  <ExternalLink size={26} color="#cda349" />
                </div>

                <h2 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 24, fontWeight: 400,
                  color: 'var(--text-primary)', marginBottom: 10,
                }}>
                  Interactive{' '}
                  <span style={{ fontStyle: 'italic', color: 'var(--accent-gold)' }}>Toolkit Experience</span>
                </h2>
                <p style={{
                  fontSize: 14, color: 'var(--text-secondary)',
                  fontFamily: 'var(--font-body)',
                  maxWidth: 500, margin: '0 auto 24px', lineHeight: 1.7,
                }}>
                  Launch the interactive guide to render the full toolkit experience with a clickable roadmap.
                </p>

                <button
                  onClick={() => openModal('sub-html')}
                  type="button"
                  style={{
                    ...premiumButtonStyle('filled'),
                    width: 'auto',
                    padding: '14px 32px',
                    fontSize: 15,
                  }}
                >
                  <ExternalLink size={16} />
                  Launch Interactive Guide
                </button>
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
              Back to COVID EIDL Toolkits
            </Link>
          </div>
        </div>

        {/* Toolkit Modal */}
        {showToolkitModal && (
          <ToolkitContent
            toolkitType="subordination"
            onClose={() => setShowToolkitModal(false)}
            startResourceId={modalStartResourceId}
          />
        )}
      </div>
    </>
  );
};

export default SubordinationAccess;