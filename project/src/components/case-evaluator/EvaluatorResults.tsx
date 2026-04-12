import { ExternalLink, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ScoreGauge from './ScoreGauge';
import type { ScoreResult } from '../../types/caseEvaluator';
import { RECOMMENDATIONS } from '../../utils/caseRecommendations';

interface EvaluatorResultsProps {
  result: ScoreResult;
  onRetake: () => void;
}

export default function EvaluatorResults({ result, onRetake }: EvaluatorResultsProps) {
  const recs = RECOMMENDATIONS[result.tier];

  const isExternal = (href: string) =>
    href.startsWith('http') || href.startsWith('https');

  return (
    <div aria-live="polite">
      {/* Score gauge centered */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginBottom: 28,
      }}>
        <ScoreGauge
          score={result.score}
          tier={result.tier}
          tierLabel={result.tierLabel}
        />
      </div>

      {/* Tier description */}
      <div style={{
        background: 'var(--color-bg-warm)',
        border: '1px solid var(--color-border-light)',
        borderRadius: 12,
        padding: '18px 22px',
        marginBottom: 24,
        textAlign: 'center',
      }}>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 15,
          color: 'var(--color-text-secondary)',
          lineHeight: 1.7,
          margin: 0,
        }}>
          {result.tierDescription}
        </p>
      </div>

      {/* Recommended next steps */}
      <div style={{
        background: 'rgba(59, 74, 44, 0.04)',
        border: '1px solid rgba(59, 74, 44, 0.12)',
        borderRadius: 12,
        padding: '22px 22px',
        marginBottom: 28,
      }}>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 18,
          fontWeight: 400,
          color: 'var(--color-text)',
          margin: '0 0 16px',
        }}>
          Recommended Next Steps
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {recs.map((rec, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 12,
              }}
            >
              <div style={{
                width: 24,
                height: 24,
                borderRadius: '50%',
                background: 'rgba(59, 74, 44, 0.08)',
                border: '1px solid rgba(59, 74, 44, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                marginTop: 2,
              }}>
                <span style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: 'var(--color-brand-green)',
                  fontFamily: 'var(--font-body)',
                }}>
                  {i + 1}
                </span>
              </div>

              {rec.href ? (
                isExternal(rec.href) ? (
                  <a
                    href={rec.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      fontSize: 15,
                      color: 'var(--color-brand-green)',
                      fontFamily: 'var(--font-body)',
                      textDecoration: 'none',
                      fontWeight: 500,
                      lineHeight: 1.4,
                      paddingTop: 3,
                    }}
                  >
                    {rec.text}
                    <ExternalLink size={13} aria-hidden="true" />
                  </a>
                ) : (
                  <Link
                    to={rec.href}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      fontSize: 15,
                      color: 'var(--color-brand-green)',
                      fontFamily: 'var(--font-body)',
                      textDecoration: 'none',
                      fontWeight: 500,
                      lineHeight: 1.4,
                      paddingTop: 3,
                    }}
                  >
                    {rec.text}
                    <ChevronRight size={14} aria-hidden="true" />
                  </Link>
                )
              ) : (
                <span style={{
                  fontSize: 15,
                  color: 'var(--color-text-secondary)',
                  fontFamily: 'var(--font-body)',
                  lineHeight: 1.4,
                  paddingTop: 3,
                }}>
                  {rec.text}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Retake */}
      <div style={{ textAlign: 'center' }}>
        <button
          onClick={onRetake}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--color-text-muted)',
            fontSize: 13,
            fontFamily: 'var(--font-body)',
            cursor: 'pointer',
            textDecoration: 'underline',
            padding: '4px 0',
          }}
        >
          Start over
        </button>
      </div>
    </div>
  );
}
