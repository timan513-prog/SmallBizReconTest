import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import EvaluatorHero from '../components/case-evaluator/EvaluatorHero';
import EvaluatorWizard from '../components/case-evaluator/EvaluatorWizard';

export default function CaseEvaluatorPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #0e1209 0%, #0a0d08 60%, #060806 100%)',
        fontFamily: "'DM Sans', system-ui, sans-serif",
        position: 'relative',
        overflowX: 'hidden',
      }}
    >
      {/* Title tag via document title */}
      <DocumentTitle title="Free EIDL Case Evaluator | SmallBiz Recon™" />

      {/* Ambient grid */}
      <div style={{
        position: 'fixed',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.03,
      }}>
        <svg width="100%" height="100%">
          <defs>
            <pattern id="evalGrid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#c8a84e" strokeWidth="0.4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#evalGrid)" />
        </svg>
      </div>

      {/* Radial glow */}
      <div style={{
        position: 'fixed',
        inset: 0,
        background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(200,168,78,0.05) 0%, transparent 60%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Back nav */}
        <div style={{
          maxWidth: 1120,
          margin: '0 auto',
          padding: '20px 24px 0',
        }}>
          <Link
            to="/home"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 7,
              color: 'rgba(232,237,226,0.45)',
              fontSize: 13,
              fontFamily: "'DM Sans', system-ui, sans-serif",
              textDecoration: 'none',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'rgba(232,237,226,0.8)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(232,237,226,0.45)'; }}
          >
            <ArrowLeft size={14} aria-hidden="true" />
            Back to Home
          </Link>
        </div>

        {/* Hero */}
        <EvaluatorHero />

        {/* Wizard container */}
        <div style={{
          maxWidth: 640,
          margin: '0 auto',
          padding: '0 24px 80px',
        }}>
          <div style={{
            background: 'rgba(22,26,18,0.7)',
            backdropFilter: 'blur(28px)',
            WebkitBackdropFilter: 'blur(28px)',
            border: '1px solid rgba(200,168,78,0.1)',
            borderRadius: 20,
            padding: 'clamp(24px, 5vw, 40px)',
            boxShadow: '0 8px 64px rgba(0,0,0,0.35)',
          }}>
            <EvaluatorWizard />
          </div>
        </div>
      </div>
    </div>
  );
}

function DocumentTitle({ title }: { title: string }) {
  if (typeof document !== 'undefined') {
    document.title = title;
  }
  return null;
}
