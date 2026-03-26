import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, FileText, Download, Monitor, Package,
  CircleCheck as CheckCircle, FolderOpen, X, Mail,
  ExternalLink, ShieldCheck, Sparkles, Lock,
  ChevronRight, Crown, Zap, Award, Sun, Moon, MapPin,
} from 'lucide-react';

import { TOOLKIT_TYPES, setUnlockedToolkit } from '../../utils/codeValidation';

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
  accentColor?: string;
};

type ToolkitData = {
  title: string;
  description: string;
  resources: ToolkitResource[];
};

interface ToolkitContentProps {
  onClose: () => void;
  startResourceId?: string | null;
}

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

function PremiumGrid() {
  return (
    <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0, opacity: 'var(--grid-opacity)' as React.CSSProperties['opacity'] }}>
      <svg width="100%" height="100%">
        <defs>
          <pattern id="reloGrid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="var(--accent-gold)" strokeWidth="0.4" />
          </pattern>
          <pattern id="reloGridDiag" width="96" height="96" patternUnits="userSpaceOnUse">
            <path d="M 0 96 L 96 0" fill="none" stroke="var(--accent-gold)" strokeWidth="0.2" opacity="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#reloGrid)" />
        <rect width="100%" height="100%" fill="url(#reloGridDiag)" />
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

const accentForType = (type: ResourceType): string => {
  switch (type) {
    case 'html': return '#5d9ecf';
    case 'pdf': return '#cf5d5d';
    case 'excel': return '#5daa5d';
    case 'internal-link': return '#9e7ec8';
    case 'zip': return '#9e7ec8';
    default: return '#cda349';
  }
};

const pillLabel = (type: ResourceType): string => {
  switch (type) {
    case 'html': return 'INTERACTIVE';
    case 'pdf': return 'PDF';
    case 'excel': return 'XLSX';
    case 'internal-link': return 'INTERNAL';
    case 'zip': return 'ZIP';
    default: return 'FILE';
  }
};

const PremiumResourceCard: React.FC<{
  resource: ToolkitResource;
  index: number;
  onLaunchInteractive: (r: ToolkitResource) => void;
  onCloseModal: () => void;
}> = ({ resource, index, onLaunchInteractive, onCloseModal }) => {
  const [hovered, setHovered] = useState(false);
  const accent = resource.accentColor || accentForType(resource.type);

  const cardContent = (
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
        transform: hovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
        transition: 'all 0.6s cubic-bezier(0.23,1,0.32,1)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column' as const,
        animation: `fadeSlideIn 0.5s ease-out ${0.1 + index * 0.08}s both`,
        cursor: 'pointer',
      }}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, width: 4, height: '100%', background: `linear-gradient(180deg, ${accent}, ${accent}44)`, opacity: hovered ? 1 : 0.6, transition: 'opacity 0.4s ease' }} />
      <div style={{ position: 'absolute', top: -80, right: -80, width: 180, height: 180, borderRadius: '50%', background: `radial-gradient(circle, ${accent}28, transparent 65%)`, opacity: hovered ? 0.6 : 0, transition: 'opacity 0.6s ease' }} />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${accent}44, transparent)`, opacity: hovered ? 1 : 0.3, transition: 'opacity 0.4s ease' }} />

      <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div style={{ width: 44, height: 44, borderRadius: 14, background: `${accent}15`, border: `1px solid ${accent}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s ease', ...(hovered ? { background: `${accent}25`, borderColor: `${accent}55` } : {}) }}>
            {resource.icon}
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {resource.badge && (
              <span style={{ fontSize: 10, fontWeight: 700, padding: '4px 10px', borderRadius: 8, background: 'var(--accent-gold-dim)', border: '1px solid var(--border-gold)', color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'var(--font-body)' }}>
                {resource.badge}
              </span>
            )}
            <span style={{ fontSize: 10, fontWeight: 700, padding: '4px 10px', borderRadius: 8, background: `${accent}12`, border: `1px solid ${accent}30`, color: accent, textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'var(--font-body)' }}>
              {pillLabel(resource.type)}
            </span>
          </div>
        </div>

        <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 400, color: 'var(--text-primary)', lineHeight: 1.3, marginBottom: 10, transition: 'color 0.3s ease' }}>
          {resource.title}
        </h4>

        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.65, fontFamily: 'var(--font-body)', flex: 1, marginBottom: 20 }}>
          {resource.description}
        </p>

        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 600, color: accent, fontFamily: 'var(--font-body)', marginTop: 'auto', transition: 'gap 0.3s ease', ...(hovered ? { gap: 12 } : {}) }}>
          {resource.isInteractive ? (
            <><ExternalLink size={15} />LAUNCH GUIDE</>
          ) : resource.type === 'internal-link' ? (
            <><FileText size={15} />{resource.buttonText || 'VIEW'}</>
          ) : (
            <><Download size={15} />OPEN</>
          )}
          <ChevronRight size={14} style={{ transition: 'transform 0.3s ease', transform: hovered ? 'translateX(4px)' : 'translateX(0)' }} />
        </div>
      </div>
    </div>
  );

  if (resource.isInteractive) {
    return <div onClick={() => onLaunchInteractive(resource)} style={{ display: 'flex' }}>{cardContent}</div>;
  }
  if (resource.type === 'internal-link') {
    return <Link to={resource.link} onClick={onCloseModal} style={{ textDecoration: 'none', display: 'flex' }}>{cardContent}</Link>;
  }
  return (
    <a href={resource.type === 'pdf' ? `${resource.link}#page=1` : resource.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'flex' }}>
      {cardContent}
    </a>
  );
};

const ToolkitContent: React.FC<ToolkitContentProps> = ({ onClose, startResourceId }) => {
  const [interactiveResource, setInteractiveResource] = useState<ToolkitResource | null>(null);

  const toolkitData: ToolkitData = useMemo(() => ({
    title: 'COVID EIDL DIY Relocation Toolkit',
    description: 'Complete guidance for navigating SBA approval when relocating your business or collateral',
    resources: [
      {
        id: 'relo-pdf-guide',
        icon: <FileText size={20} style={{ color: '#cda349' }} />,
        title: 'Relocation PDF Guide',
        description: 'Complete PDF reference guide for the SBA relocation approval process',
        link: '#',
        type: 'pdf' as ResourceType,
        badge: 'Guide',
        accentColor: '#cda349',
      },
      {
        id: 'relo-pdf-print',
        icon: <FileText size={20} style={{ color: '#cf5d5d' }} />,
        title: 'Printable Reference Guide',
        description: 'Print-friendly PDF companion for offline reference during the relocation process',
        link: '#',
        type: 'pdf' as ResourceType,
        accentColor: '#cf5d5d',
      },
      {
        id: 'relo-tracking',
        icon: <FileText size={20} style={{ color: '#5daa5d' }} />,
        title: 'Tracking Tools',
        description: 'Communication tracking spreadsheet and submission checklists to keep your process organized',
        link: '#',
        type: 'excel' as ResourceType,
        badge: '2026',
        accentColor: '#5daa5d',
      },
      {
        id: 'relo-templates',
        icon: <Mail size={20} style={{ color: '#9e7ec8' }} />,
        title: 'Templates & Docs',
        description: 'Professional templates and sample letters for your relocation request',
        link: '/access/relocation/templates',
        type: 'internal-link' as ResourceType,
        buttonText: 'View Templates',
        accentColor: '#9e7ec8',
      },
    ],
  }), []);

  useEffect(() => {
    if (!startResourceId) return;
    const found = toolkitData.resources.find((r) => r.id === startResourceId);
    if (found?.isInteractive) setInteractiveResource(found);
  }, [startResourceId, toolkitData]);

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 50, padding: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(12px)' }} />

      <div style={{ position: 'relative', background: 'var(--bg-primary)', borderRadius: 24, maxWidth: 1100, width: '100%', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px var(--border-gold)', border: '1px solid var(--border-gold)', animation: 'fadeSlideIn 0.4s ease-out both' }}>
        <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '24px 24px 0 0', background: 'var(--bg-hero)', borderBottom: '1px solid var(--border-gold)' }}>
          <div style={{ position: 'absolute', top: '40%', left: '30%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(200,168,78,0.12) 0%, transparent 60%)', pointerEvents: 'none' }} />

          <div style={{ position: 'relative', padding: '32px 36px', color: '#e8ede2' }}>
            <button onClick={onClose} type="button" style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 12, padding: 8, cursor: 'pointer', color: '#e8ede2', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s ease' }}>
              <X size={20} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12 }}>
              <div style={{ width: 48, height: 48, borderRadius: 16, background: 'rgba(200,168,78,0.15)', border: '1px solid rgba(200,168,78,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Crown size={24} color="#cda349" />
              </div>
              <div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 400 }}>
                  Access <span style={{ fontStyle: 'italic', color: '#cda349' }}>Granted</span>
                </h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4, fontSize: 13, color: 'rgba(232,237,226,0.6)', fontFamily: 'var(--font-body)' }}>
                  <Lock size={13} />
                  Lifetime access — re-download anytime
                </div>
              </div>
            </div>

            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 400, color: 'rgba(232,237,226,0.9)', marginTop: 8 }}>
              {toolkitData.title}
            </h3>

            <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 11, padding: '5px 14px', borderRadius: 100, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(232,237,226,0.7)', fontFamily: 'var(--font-body)', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <ShieldCheck size={13} /> Secure delivery
              </span>
              <span style={{ fontSize: 11, padding: '5px 14px', borderRadius: 100, background: 'rgba(200,168,78,0.08)', border: '1px solid rgba(200,168,78,0.2)', color: '#cda349', fontFamily: 'var(--font-body)', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <Sparkles size={13} /> 2026 refresh
              </span>
            </div>
          </div>
        </div>

        <div style={{ padding: 36 }}>
          {interactiveResource ? (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                <button onClick={() => setInteractiveResource(null)} type="button" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', color: 'var(--accent-gold)', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)' }}>
                  <ArrowLeft size={16} />Back to Resources
                </button>
                <a href={interactiveResource.link} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', borderRadius: 12, background: 'linear-gradient(135deg, rgba(200,168,78,0.3), rgba(200,168,78,0.1))', border: '1px solid rgba(200,168,78,0.4)', color: 'var(--text-primary)', fontSize: 13, fontWeight: 600, fontFamily: 'var(--font-body)', textDecoration: 'none' }}>
                  <ExternalLink size={15} />Open in New Tab
                </a>
              </div>
              <div style={{ borderRadius: 20, overflow: 'hidden', border: '1px solid var(--border-primary)', boxShadow: 'var(--shadow-card)', height: '72vh' }}>
                <iframe src={interactiveResource.link} title={interactiveResource.title} style={{ width: '100%', height: '100%', border: 'none' }} />
              </div>
            </div>
          ) : (
            <>
              <div style={{ marginBottom: 28 }}>
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 400, color: 'var(--text-primary)', marginBottom: 8 }}>
                  Your Toolkit Resources
                </h4>
                <p style={{ fontSize: 14, color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}>
                  Click any item to open or download. Everything included with your purchase is here.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20, alignItems: 'stretch' }}>
                {toolkitData.resources.map((resource, i) => (
                  <PremiumResourceCard key={resource.id} resource={resource} index={i} onLaunchInteractive={(r) => setInteractiveResource(r)} onCloseModal={onClose} />
                ))}
              </div>

              <div style={{ marginTop: 36, padding: 24, borderRadius: 16, background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)' }}>
                <h5 style={{ fontFamily: 'var(--font-display)', fontSize: 16, color: 'var(--text-primary)', marginBottom: 12 }}>Important Notes</h5>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.8, fontFamily: 'var(--font-body)' }}>
                  <p>• Save your access code — you can return anytime to re-download materials</p>
                  <p>• Resources may be updated periodically; your access remains active</p>
                  <p>• Support is available through the website contact options</p>
                  <p>• Educational content only — not official SBA guidance</p>
                </div>
              </div>

              <div style={{ marginTop: 28, textAlign: 'center' }}>
                <button onClick={onClose} type="button" style={{ padding: '14px 36px', borderRadius: 14, background: 'linear-gradient(135deg, rgba(200,168,78,0.25), rgba(200,168,78,0.08))', border: '1px solid rgba(200,168,78,0.35)', color: 'var(--text-primary)', fontSize: 15, fontWeight: 600, fontFamily: 'var(--font-body)', cursor: 'pointer', transition: 'all 0.3s ease' }}>
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
}> = ({ children, onClick, href, to, accentColor, variant = 'filled', icon }) => {
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
    cursor: 'pointer',
    width: '100%',
    ...(variant === 'filled'
      ? { background: `linear-gradient(135deg, ${accentColor}66, ${accentColor}33)`, border: `1px solid ${accentColor}88`, color: 'var(--text-primary)' }
      : { background: 'transparent', border: '1px solid var(--border-primary)', color: 'var(--text-primary)' }),
  };

  if (to) return <Link to={to} style={baseStyle}>{icon}{children}</Link>;
  if (href) return <a href={href} target="_blank" rel="noopener noreferrer" style={baseStyle}>{icon}{children}</a>;
  return <button type="button" onClick={onClick} style={baseStyle}>{icon}{children}</button>;
};

const RelocationAccess: React.FC = () => {
  const [showToolkitModal, setShowToolkitModal] = useState(false);
  const [modalStartResourceId, setModalStartResourceId] = useState<string | null>(null);
  const [theme, setTheme] = useState('dark');

  const isDark = theme === 'dark';
  const vars = THEMES[theme as keyof typeof THEMES];
  const cssVarString = Object.entries(vars).map(([k, v]) => `${k}: ${v};`).join('\n');

  useEffect(() => {
    setUnlockedToolkit(TOOLKIT_TYPES.RELOCATION);
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

        * { box-sizing: border-box; }

        .relo-page {
          min-height: 100vh;
          font-family: var(--font-body);
          background: var(--bg-primary);
          color: var(--text-primary);
          overflow-x: hidden;
          position: relative;
          transition: background 0.5s ease, color 0.4s ease;
        }
        .relo-page::before {
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
        .relo-page a { color: inherit; }

        @media (max-width: 768px) {
          .relo-hero-title { font-size: 30px !important; }
          .relo-hero-inner { padding: 36px 16px 48px !important; }
          .relo-cards-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div className="relo-page">
        <PremiumGrid />
        <PremiumParticles />

        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* HERO */}
          <div style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg-hero)', borderBottom: '1px solid var(--border-gold)', animation: 'fadeSlideUp 0.7s ease-out both' }}>
            <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%, -50%)', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(200,168,78,0.1) 0%, transparent 55%)', pointerEvents: 'none', animation: 'goldPulse 6s ease-in-out infinite' }} />

            <div className="relo-hero-inner" style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 32px 72px', position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 56 }}>
                <Link to="/covid-eidl-toolkits" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#c8e0b4', fontSize: 14, fontWeight: 600, textDecoration: 'none', fontFamily: 'var(--font-body)', transition: 'color 0.3s ease' }}>
                  <ArrowLeft size={16} />
                  Back to COVID EIDL Toolkits
                </Link>
                <button type="button" onClick={() => setTheme(isDark ? 'light' : 'dark')} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 12, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)', color: '#c8e0b4', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)', transition: 'all 0.3s ease' }}>
                  {isDark ? <Sun size={14} /> : <Moon size={14} />}
                  {isDark ? 'Light' : 'Dark'}
                </button>
              </div>

              <div style={{ width: 76, height: 76, borderRadius: 22, background: 'linear-gradient(135deg, rgba(200,168,78,0.22), rgba(200,168,78,0.06))', border: '1px solid rgba(200,168,78,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px', boxShadow: '0 0 40px rgba(200,168,78,0.1)' }}>
                <MapPin size={36} color="#cda349" strokeWidth={1.5} />
              </div>

              <div style={{ textAlign: 'center', marginBottom: 16 }}>
                <span style={{ padding: '5px 16px', borderRadius: 100, background: 'rgba(200,168,78,0.12)', border: '1px solid rgba(200,168,78,0.25)', fontSize: 11, fontWeight: 700, color: '#cda349', fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  ★ Premium Toolkit
                </span>
              </div>

              <h1 className="relo-hero-title" style={{ fontFamily: 'var(--font-display)', fontSize: 48, fontWeight: 400, textAlign: 'center', color: '#e8ede2', lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: 16 }}>
                COVID EIDL DIY{' '}
                <span style={{ fontStyle: 'italic', color: '#cda349' }}>Relocation Toolkit</span>
              </h1>

              <p style={{ textAlign: 'center', fontSize: 16, color: 'rgba(232,237,226,0.6)', lineHeight: 1.75, maxWidth: 640, margin: '0 auto 28px', fontFamily: 'var(--font-body)' }}>
                Your complete DIY guide for navigating the SBA COVID EIDL business relocation approval process
                with confidence. Moving your business or collateral may require SBA review — we walk you through every step.
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
                <button type="button" onClick={() => openModal(null)} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '16px 36px', borderRadius: 16, background: 'linear-gradient(135deg, rgba(200,168,78,0.35), rgba(200,168,78,0.12))', border: '1px solid rgba(200,168,78,0.45)', color: '#e8ede2', fontSize: 16, fontWeight: 600, fontFamily: 'var(--font-body)', cursor: 'pointer', transition: 'all 0.3s ease', boxShadow: '0 0 30px rgba(200,168,78,0.1)' }}>
                  <Package size={18} />
                  Access Toolkit Resources
                </button>
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
                  Welcome to your complete relocation toolkit. All materials are included with your purchase and available for lifetime access.
                </p>
                <div style={{ maxWidth: 560, margin: '0 auto', padding: '14px 20px', borderRadius: 14, background: 'var(--accent-gold-dim)', border: '1px solid var(--border-gold)' }}>
                  <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'var(--font-body)' }}>
                    Sabbi 2.0 is unlocked — tap the Sabbi button in the bottom right to ask relocation questions.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ACCESS CARDS GRID */}
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px' }}>
            <div className="relo-cards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, alignItems: 'stretch' }}>
              <AccessCard
                index={0}
                title="Relocation PDF Guide"
                description="Comprehensive step-by-step PDF guide covering SBA requirements for business relocation under a COVID EIDL."
                accentColor="#cda349"
                iconBg="rgba(200,168,78,0.12)"
                iconBorder="rgba(200,168,78,0.3)"
                icon={<FileText size={26} style={{ color: '#cda349' }} />}
                badge="Guide"
                actionElement={
                  <PremiumButton onClick={() => openModal('relo-pdf-guide')} accentColor="#cda349" icon={<Download size={16} />}>
                    Access PDF Guide
                  </PremiumButton>
                }
              />
              <AccessCard
                index={1}
                title="Printable Reference Guide"
                description="Print-friendly PDF companion designed for offline reference — take notes and annotate as you go."
                accentColor="#cf5d5d"
                iconBg="rgba(207,93,93,0.12)"
                iconBorder="rgba(207,93,93,0.3)"
                icon={<FileText size={26} style={{ color: '#cf5d5d' }} />}
                actionElement={
                  <PremiumButton onClick={() => openModal('relo-pdf-print')} accentColor="#cf5d5d" icon={<Download size={16} />}>
                    Download PDF
                  </PremiumButton>
                }
              />
              <AccessCard
                index={2}
                title="Tracking Tools"
                description="Communication tracking spreadsheet and submission checklists to keep your relocation process organized."
                accentColor="#5daa5d"
                iconBg="rgba(93,170,93,0.12)"
                iconBorder="rgba(93,170,93,0.3)"
                icon={<FileText size={26} style={{ color: '#5daa5d' }} />}
                badge="2026"
                actionElement={
                  <PremiumButton onClick={() => openModal('relo-tracking')} accentColor="#5daa5d" icon={<Download size={16} />}>
                    Download Tools
                  </PremiumButton>
                }
              />
              <AccessCard
                index={3}
                title="Templates & Docs"
                description="Sample letters, forms, and professional templates for your SBA relocation request submission."
                accentColor="#9e7ec8"
                iconBg="rgba(158,126,200,0.12)"
                iconBorder="rgba(158,126,200,0.3)"
                icon={<Mail size={26} style={{ color: '#9e7ec8' }} />}
                actionElement={
                  <PremiumButton to="/access/relocation/templates" accentColor="#9e7ec8" variant="outline" icon={<FileText size={16} />}>
                    View Templates
                  </PremiumButton>
                }
              />
              <AccessCard
                index={4}
                title="Forms Library"
                description="All premium relocation forms categorized by usage — ready-to-use and professionally formatted."
                accentColor="#e0943d"
                iconBg="rgba(224,148,61,0.12)"
                iconBorder="rgba(224,148,61,0.3)"
                icon={<FolderOpen size={26} style={{ color: '#e0943d' }} />}
                actionElement={
                  <PremiumButton to="/access/relocation/forms" accentColor="#e0943d" icon={<ChevronRight size={16} />}>
                    View Forms
                  </PremiumButton>
                }
              />
              <AccessCard
                index={5}
                title="What to Expect"
                description="A plain-English walkthrough of SBA timelines, common relocation scenarios, and what the SBA looks for in your request."
                accentColor="#5d9ecf"
                iconBg="rgba(93,158,207,0.12)"
                iconBorder="rgba(93,158,207,0.3)"
                icon={<Zap size={26} style={{ color: '#5d9ecf' }} />}
                badge="New"
                actionElement={
                  <PremiumButton onClick={() => openModal(null)} accentColor="#5d9ecf" icon={<Package size={16} />}>
                    Browse Resources
                  </PremiumButton>
                }
              />
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
                    SmallBiz Recon™ is an independent educational resource and is not affiliated with, endorsed by, or connected to any government agency. All information is provided for educational and informational purposes only. Always consult with qualified professionals and verify all information with official sources before making any decisions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {showToolkitModal && (
          <ToolkitContent onClose={() => setShowToolkitModal(false)} startResourceId={modalStartResourceId} />
        )}
      </div>
    </>
  );
};

export default RelocationAccess;
