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
    <div
      aria-live="polite"
      style={{
        animation: 'evalFadeUp 0.45s ease both',
      }}
    >
      <style>{`
        @keyframes evalFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Score gauge centered */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginBottom: 32,
      }}>
        <ScoreGauge
          score={result.score}
          tier={result.tier}
          tierLabel={result.tierLabel}
        />
      </div>

      {/* Tier description */}
      <div style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 14,
        padding: '20px 24px',
        marginBottom: 24,
        textAlign: 'center',
      }}>
        <p style={{
          fontFamily: "'DM Sans', system-ui, sans-serif",
          fontSize: 16,
          color: 'rgba(232,237,226,0.8)',
          lineHeight: 1.7,
          margin: 0,
        }}>
          {result.tierDescription}
        </p>
      </div>

      {/* Recommended next steps */}
      <div style={{
        background: 'rgba(200,168,78,0.05)',
        border: '1px solid rgba(200,168,78,0.18)',
        borderRadius: 14,
        padding: '22px 24px',
        marginBottom: 32,
      }}>
        <h3 style={{
          fontFamily: "'Instrument Serif', Georgia, serif",
          fontSize: 18,
          fontWeight: 400,
          color: '#e8ede2',
          margin: '0 0 18px',
          letterSpacing: '-0.01em',
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
                background: 'rgba(200,168,78,0.15)',
                border: '1px solid rgba(200,168,78,0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                marginTop: 2,
              }}>
                <span style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: '#c8a84e',
                  fontFamily: "'JetBrains Mono', monospace",
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
                      color: '#c8a84e',
                      fontFamily: "'DM Sans', system-ui, sans-serif",
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
                      color: '#c8a84e',
                      fontFamily: "'DM Sans', system-ui, sans-serif",
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
                  color: 'rgba(232,237,226,0.7)',
                  fontFamily: "'DM Sans', system-ui, sans-serif",
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
      <div style={{ textAlign: 'center', marginBottom: 8 }}>
        <button
          onClick={onRetake}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'rgba(232,237,226,0.4)',
            fontSize: 13,
            fontFamily: "'DM Sans', system-ui, sans-serif",
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
