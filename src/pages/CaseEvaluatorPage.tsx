import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import EvaluatorHero from '../components/case-evaluator/EvaluatorHero';
import EvaluatorWizard from '../components/case-evaluator/EvaluatorWizard';

export default function CaseEvaluatorPage() {
  useEffect(() => {
    document.title = 'Free EIDL Case Evaluator | SmallBiz Recon';
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--color-bg)',
      fontFamily: 'var(--font-body)',
    }}>
      <div style={{ maxWidth: 680, margin: '0 auto', padding: '0 24px' }}>
        {/* Back nav */}
        <div style={{ paddingTop: 20 }}>
          <Link
            to="/home"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              color: 'var(--color-text-muted)',
              fontSize: 14,
              textDecoration: 'none',
            }}
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Back to Home
          </Link>
        </div>

        {/* Hero */}
        <EvaluatorHero />

        {/* Wizard container */}
        <div style={{
          background: 'white',
          border: '1px solid var(--color-border)',
          borderRadius: 16,
          padding: 'clamp(24px, 5vw, 40px)',
          marginBottom: 80,
        }}>
          <EvaluatorWizard />
        </div>
      </div>
    </div>
  );
}
