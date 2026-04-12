import React, { useState, useId } from 'react';
import { Link } from 'react-router-dom';
import { Pin, Share2, ChevronDown, ChevronUp, ExternalLink, Calendar, ArrowRight } from 'lucide-react';
import type { PolicyAlert } from '../../data/policyAlerts';
import AlertSeverityBadge from './AlertSeverityBadge';
import AlertCategoryTag from './AlertCategoryTag';
import AlertDeadlineBar from './AlertDeadlineBar';
import AlertMarkdownRenderer from './AlertMarkdownRenderer';
import { formatAlertDate, getCalendlyUrl, getCalendlyLabel } from '../../utils/alertHelpers';

interface Props {
  alert: PolicyAlert;
  initiallyExpanded?: boolean;
  animationDelay?: number;
}

const AlertCard: React.FC<Props> = ({ alert, initiallyExpanded = false, animationDelay = 0 }) => {
  const [expanded, setExpanded] = useState(initiallyExpanded);
  const [copied, setCopied] = useState(false);
  const contentId = useId();

  const handleShare = async () => {
    const url = `${window.location.origin}/policy-alerts#alert-${alert.id}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // silent
    }
  };

  const toggleExpand = () => {
    const next = !expanded;
    setExpanded(next);
    if (next) {
      setTimeout(() => {
        const el = document.getElementById(`alert-${alert.id}`);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    }
  };

  return (
    <article
      id={`alert-${alert.id}`}
      style={{
        borderRadius: 16,
        background: 'var(--bg-card)',
        backdropFilter: 'var(--glass-blur)',
        WebkitBackdropFilter: 'var(--glass-blur)',
        border: '1px solid var(--border-primary)',
        transition: 'all 0.3s ease',
        overflow: 'hidden',
        animation: `alertFadeIn 0.5s ease ${animationDelay}ms both`,
        boxShadow: 'var(--shadow-card)',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-hover)';
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
        (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-card-hover)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-primary)';
        (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
        (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-card)';
      }}
    >
      <div style={{ padding: '20px 24px' }}>
        {/* Header row */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          <AlertSeverityBadge severity={alert.severity} />
          <AlertCategoryTag category={alert.category} />
          {alert.pinned && (
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              fontFamily: 'var(--font-body)',
              fontSize: 11,
              color: 'var(--accent-gold)',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              fontWeight: 600,
            }}>
              <Pin size={10} aria-hidden="true" />
              PINNED
            </span>
          )}
          <time
            dateTime={alert.date}
            style={{
              marginLeft: 'auto',
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              fontSize: 12,
              fontFamily: 'var(--font-body)',
              color: 'var(--text-secondary)',
              fontWeight: 600,
            }}
          >
            <Calendar size={12} aria-hidden="true" />
            {formatAlertDate(alert.date)}
          </time>
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 20,
          fontWeight: 400,
          color: 'var(--text-primary)',
          margin: '0 0 10px',
          lineHeight: 1.35,
          letterSpacing: '-0.01em',
        }}>
          {alert.title}
        </h3>

        {/* Affected borrowers */}
        {alert.affectedBorrowers && (
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 6,
            marginBottom: 12,
            padding: '8px 12px',
            borderRadius: 8,
            background: 'var(--bg-tertiary)',
            borderLeft: '3px solid var(--accent-gold)',
          }}>
            <ArrowRight size={13} style={{ color: 'var(--accent-gold)', marginTop: 2, flexShrink: 0 }} aria-hidden="true" />
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 13,
              color: 'var(--text-secondary)',
              margin: 0,
              lineHeight: 1.5,
            }}>
              <strong style={{ color: 'var(--accent-gold)', fontWeight: 600 }}>Affects: </strong>
              {alert.affectedBorrowers}
            </p>
          </div>
        )}

        {/* Summary */}
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 15,
          color: 'var(--text-secondary)',
          lineHeight: 1.7,
          margin: '0 0 12px',
        }}>
          {alert.summary}
        </p>

        {/* Deadline bar */}
        {alert.actionDeadline && <AlertDeadlineBar deadline={alert.actionDeadline} />}

        {/* Source */}
        {alert.source && (
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 12,
            fontStyle: 'italic',
            color: 'var(--text-muted)',
            margin: '10px 0 0',
          }}>
            Source:{' '}
            {alert.sourceUrl ? (
              <a
                href={alert.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--text-muted)', textDecoration: 'underline' }}
              >
                {alert.source}
                <ExternalLink size={10} style={{ display: 'inline', marginLeft: 3 }} aria-hidden="true" />
              </a>
            ) : (
              alert.source
            )}
          </p>
        )}
      </div>

      {/* Footer row */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 10,
        padding: '12px 24px',
        borderTop: '1px solid var(--border-primary)',
        background: 'var(--bg-tertiary)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <button
            onClick={toggleExpand}
            aria-expanded={expanded}
            aria-controls={contentId}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--accent-gold)',
              fontSize: 13,
              fontWeight: 600,
              fontFamily: 'var(--font-body)',
              padding: 0,
              transition: 'opacity 0.2s ease',
            }}
          >
            {expanded ? (
              <>Collapse <ChevronUp size={14} aria-hidden="true" /></>
            ) : (
              <>Read Full Alert <ChevronDown size={14} aria-hidden="true" /></>
            )}
          </button>

          {alert.relatedStage && alert.relatedStage.length > 0 && (
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              {alert.relatedStage.map(stage => (
                <Link
                  key={stage}
                  to={`/timeline-tracker#stage-${stage}`}
                  style={{
                    display: 'inline-block',
                    padding: '3px 9px',
                    borderRadius: 100,
                    background: 'var(--badge-bg)',
                    border: '1px solid var(--badge-border)',
                    color: 'var(--accent-green)',
                    fontSize: 11,
                    fontFamily: 'var(--font-body)',
                    fontWeight: 600,
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(154,184,122,0.2)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'var(--badge-bg)')}
                >
                  Stage {stage}
                </Link>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={handleShare}
          aria-label="Copy link to this alert"
          title="Copy link"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 5,
            background: 'none',
            border: '1px solid var(--border-primary)',
            borderRadius: 8,
            cursor: 'pointer',
            color: 'var(--text-muted)',
            fontSize: 11,
            fontFamily: 'var(--font-body)',
            fontWeight: 600,
            padding: '5px 10px',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'var(--border-hover)';
            e.currentTarget.style.color = 'var(--text-secondary)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'var(--border-primary)';
            e.currentTarget.style.color = 'var(--text-muted)';
          }}
        >
          <Share2 size={12} aria-hidden="true" />
          {copied ? 'Copied!' : 'Share'}
        </button>
      </div>

      {/* Expandable body — animations preserved */}
      <div
        id={contentId}
        style={{
          maxHeight: expanded ? 2400 : 0,
          overflow: 'hidden',
          opacity: expanded ? 1 : 0,
          transition: 'max-height 0.35s ease, opacity 0.3s ease',
        }}
      >
        <div style={{ padding: '20px 24px 28px' }}>
          <div style={{
            borderTop: '1px solid var(--border-primary)',
            paddingTop: 20,
          }}>
            <AlertMarkdownRenderer content={alert.body} />

            {/* Embedded CTA */}
            <div style={{
              marginTop: 24,
              padding: '20px 24px',
              borderRadius: 12,
              background: 'var(--overlay-gold)',
              border: '1px solid var(--border-gold)',
            }}>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 14,
                color: 'var(--text-secondary)',
                marginBottom: 14,
              }}>
                Need help with this? SmallBiz Recon™ can guide you.
              </p>
              <a
                href={getCalendlyUrl(alert.severity)}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '10px 20px',
                  borderRadius: 10,
                  background: 'linear-gradient(135deg, rgba(200,168,78,0.3), rgba(200,168,78,0.15))',
                  border: '1px solid var(--border-gold)',
                  color: 'var(--accent-gold)',
                  fontSize: 13,
                  fontWeight: 600,
                  fontFamily: 'var(--font-body)',
                  textDecoration: 'none',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'linear-gradient(135deg, rgba(200,168,78,0.45), rgba(200,168,78,0.25))')}
                onMouseLeave={e => (e.currentTarget.style.background = 'linear-gradient(135deg, rgba(200,168,78,0.3), rgba(200,168,78,0.15))')}
              >
                <Calendar size={13} aria-hidden="true" />
                {getCalendlyLabel(alert.severity)}
              </a>
            </div>

            <button
              onClick={toggleExpand}
              style={{
                marginTop: 16,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--accent-gold)',
                fontSize: 13,
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <ChevronUp size={14} aria-hidden="true" />
              Collapse
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes alertFadeIn {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </article>
  );
};

export default AlertCard;
