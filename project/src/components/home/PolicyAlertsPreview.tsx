import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { policyAlerts } from '../../data/policyAlerts';
import { formatAlertDateShort } from '../../utils/alertHelpers';

/* ───────────────────────────────────────────
   UTILITY: Format date as tactical shorthand
   ─────────────────────────────────────────── */
function tacticalDate(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00');
  const day = String(d.getDate()).padStart(2, '0');
  const months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
  return `${day} ${months[d.getMonth()]}`;
}

function getTickerAlerts() {
  const sorted = [...policyAlerts].sort((a, b) => b.date.localeCompare(a.date));
  const pinned = sorted.filter(a => a.pinned);
  const rest = sorted.filter(a => !a.pinned);
  return [...pinned, ...rest];
}

/* ───────────────────────────────────────────
   SEVERITY CONFIG
   ─────────────────────────────────────────── */
const SEVERITY_CONFIG: Record<string, { color: string; glow: string; label: string; priority: number }> = {
  critical: {
    color: '#ff3b3b',
    glow: 'rgba(255,59,59,0.6)',
    label: 'CRIT',
    priority: 4,
  },
  'action-required': {
    color: '#ff9f1c',
    glow: 'rgba(255,159,28,0.4)',
    label: 'ACTN',
    priority: 3,
  },
  informational: {
    color: '#4da6ff',
    glow: 'rgba(77,166,255,0.35)',
    label: 'INFO',
    priority: 2,
  },
  update: {
    color: '#6b7a6b',
    glow: 'rgba(107,122,107,0.2)',
    label: 'UPDT',
    priority: 1,
  },
};

const CATEGORY_LABELS: Record<string, string> = {
  treasury: 'TREAS',
  'sba-policy': 'SBA',
  'covid-eidl': 'EIDL',
  servicing: 'SRVC',
  legislative: 'LEGIS',
};

/* ───────────────────────────────────────────
   STYLES (CSS-in-JS for self-contained drop-in)
   ─────────────────────────────────────────── */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif&family=DM+Sans:wght@400;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap');

  .intel-feed {
    position: relative;
    background: #050507;
    padding: 0;
    overflow: hidden;
    isolation: isolate;
  }

  /* ── Ambient grid background ── */
  .intel-feed::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(200,168,78,0.02) 1px, transparent 1px),
      linear-gradient(90deg, rgba(200,168,78,0.02) 1px, transparent 1px);
    background-size: 40px 40px;
    pointer-events: none;
    z-index: 0;
  }

  /* ── Noise overlay ── */
  .intel-feed::after {
    content: '';
    position: absolute;
    inset: 0;
    background: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
    background-size: 256px 256px;
    pointer-events: none;
    z-index: 0;
    opacity: 0.5;
  }

  .intel-feed-inner {
    position: relative;
    z-index: 1;
    padding: 48px 0 52px;
  }

  /* ── Top border: signal line ── */
  .intel-border-top {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg,
      transparent 0%,
      rgba(200,168,78,0.05) 10%,
      rgba(200,168,78,0.4) 20%,
      rgba(200,168,78,0.6) 50%,
      rgba(200,168,78,0.4) 80%,
      rgba(200,168,78,0.05) 90%,
      transparent 100%
    );
    z-index: 2;
  }

  .intel-border-top::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(200,168,78,0.9), transparent);
    background-size: 200px 2px;
    animation: signalPulse 3s ease-in-out infinite;
  }

  @keyframes signalPulse {
    0% { background-position: -200px 0; }
    100% { background-position: calc(100% + 200px) 0; }
  }

  .intel-border-bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg,
      transparent,
      rgba(200,168,78,0.15) 30%,
      rgba(200,168,78,0.25) 50%,
      rgba(200,168,78,0.15) 70%,
      transparent
    );
    z-index: 2;
  }

  /* ── Section header ── */
  .intel-header {
    max-width: 1120px;
    margin: 0 auto 20px;
    padding: 0 28px;
    display: flex;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;
  }

  .intel-header-left {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .intel-classification {
    font-family: 'JetBrains Mono', monospace;
    font-size: 8px;
    font-weight: 700;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: #c8a84e;
    background: rgba(200,168,78,0.06);
    border: 1px solid rgba(200,168,78,0.15);
    padding: 4px 10px;
    border-radius: 2px;
    position: relative;
    overflow: hidden;
  }

  .intel-classification::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(200,168,78,0.1), transparent);
    animation: classifiedSweep 4s ease-in-out infinite;
  }

  @keyframes classifiedSweep {
    0% { left: -100%; }
    100% { left: 200%; }
  }

  .intel-title {
    font-family: 'Instrument Serif', Georgia, serif;
    font-size: clamp(22px, 3vw, 30px);
    font-weight: 400;
    color: #c8a84e;
    margin: 0;
    letter-spacing: 0.02em;
    position: relative;
  }

  .intel-title-glow {
    position: absolute;
    inset: -8px -16px;
    background: radial-gradient(ellipse, rgba(200,168,78,0.06) 0%, transparent 70%);
    pointer-events: none;
  }

  .intel-header-meta {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-left: auto;
  }

  .intel-status-live {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .intel-status-dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #22c55e;
    box-shadow: 0 0 6px rgba(34,197,94,0.7), 0 0 12px rgba(34,197,94,0.3);
    animation: statusPulse 2s ease-in-out infinite;
  }

  @keyframes statusPulse {
    0%, 100% { box-shadow: 0 0 6px rgba(34,197,94,0.7), 0 0 12px rgba(34,197,94,0.3); }
    50% { box-shadow: 0 0 3px rgba(34,197,94,0.4), 0 0 6px rgba(34,197,94,0.15); }
  }

  .intel-status-text {
    font-family: 'JetBrains Mono', monospace;
    font-size: 9px;
    font-weight: 500;
    color: rgba(34,197,94,0.7);
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .intel-freq {
    font-family: 'JetBrains Mono', monospace;
    font-size: 9px;
    color: rgba(163,176,152,0.35);
    letter-spacing: 0.05em;
  }

  /* ── Signal strength bars ── */
  .signal-bars {
    display: flex;
    align-items: flex-end;
    gap: 2px;
    height: 12px;
  }

  .signal-bar {
    width: 3px;
    border-radius: 1px;
    background: rgba(200,168,78,0.25);
    transition: background 0.3s;
  }

  .signal-bar.active {
    background: rgba(200,168,78,0.7);
  }

  /* ── Ticker container ── */
  .intel-ticker-wrap {
    position: relative;
    width: 100%;
    overflow: hidden;
    margin: 0 0 24px;
  }

  /* Scanline effect */
  .intel-scanline {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(0,0,0,0.03) 2px,
      rgba(0,0,0,0.03) 4px
    );
    pointer-events: none;
    z-index: 3;
  }

  /* Edge masks */
  .intel-ticker-wrap::before,
  .intel-ticker-wrap::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: 120px;
    z-index: 4;
    pointer-events: none;
  }

  .intel-ticker-wrap::before {
    left: 0;
    background: linear-gradient(90deg, #050507 0%, rgba(5,5,7,0.8) 40%, transparent 100%);
  }

  .intel-ticker-wrap::after {
    right: 0;
    background: linear-gradient(270deg, #050507 0%, rgba(5,5,7,0.8) 40%, transparent 100%);
  }

  /* Radar sweep */
  .intel-radar-sweep {
    position: absolute;
    top: 0;
    left: -100%;
    width: 60%;
    height: 100%;
    background: linear-gradient(90deg,
      transparent 0%,
      rgba(200,168,78,0.01) 30%,
      rgba(200,168,78,0.04) 50%,
      rgba(200,168,78,0.01) 70%,
      transparent 100%
    );
    animation: radarSweep 8s ease-in-out infinite;
    pointer-events: none;
    z-index: 2;
  }

  @keyframes radarSweep {
    0% { left: -60%; }
    100% { left: 100%; }
  }

  /* Track */
  .intel-ticker-track {
    display: flex;
    animation: tickerScroll var(--ticker-duration, 55s) linear infinite;
    width: max-content;
    will-change: transform;
  }

  .intel-ticker-track:hover {
    animation-play-state: paused;
  }

  @keyframes tickerScroll {
    0% { transform: translateX(0); }
    100% { transform: translateX(-33.3333%); }
  }

  /* Individual alert item */
  .intel-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 28px;
    white-space: nowrap;
    flex-shrink: 0;
    position: relative;
    cursor: default;
    transition: background 0.3s ease;
    border-top: 1px solid rgba(200,168,78,0.04);
    border-bottom: 1px solid rgba(200,168,78,0.04);
  }

  .intel-item:hover {
    background: rgba(200,168,78,0.025);
  }

  .intel-item:hover .intel-item-headline {
    color: #eef2ea;
  }

  /* Separator */
  .intel-item-sep {
    position: absolute;
    right: 0;
    top: 15%;
    bottom: 15%;
    width: 1px;
    background: linear-gradient(to bottom,
      transparent,
      rgba(200,168,78,0.08) 30%,
      rgba(200,168,78,0.12) 50%,
      rgba(200,168,78,0.08) 70%,
      transparent
    );
  }

  /* Severity indicator */
  .intel-severity {
    display: flex;
    align-items: center;
    gap: 6px;
    flex-shrink: 0;
  }

  .intel-severity-pip {
    width: 3px;
    height: 18px;
    border-radius: 1.5px;
    flex-shrink: 0;
    position: relative;
  }

  .intel-severity-pip::after {
    content: '';
    position: absolute;
    inset: -2px -4px;
    border-radius: 4px;
    opacity: 0.15;
    background: currentColor;
  }

  .intel-severity-code {
    font-family: 'JetBrains Mono', monospace;
    font-size: 8px;
    font-weight: 700;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    min-width: 32px;
  }

  /* Timestamp */
  .intel-timestamp {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    font-weight: 500;
    color: rgba(200,168,78,0.4);
    letter-spacing: 0.08em;
    flex-shrink: 0;
    min-width: 48px;
    position: relative;
  }

  .intel-timestamp::before {
    content: '//';
    margin-right: 4px;
    opacity: 0.3;
  }

  /* Category */
  .intel-category {
    font-family: 'JetBrains Mono', monospace;
    font-size: 8px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    padding: 2px 7px;
    border-radius: 2px;
    border: 1px solid;
    flex-shrink: 0;
    opacity: 0.7;
  }

  /* Headline */
  .intel-item-headline {
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 600;
    color: rgba(234,240,228,0.85);
    letter-spacing: 0.01em;
    transition: color 0.3s;
  }

  /* Pinned glyph */
  .intel-pinned {
    font-family: 'JetBrains Mono', monospace;
    font-size: 8px;
    font-weight: 700;
    color: #c8a84e;
    letter-spacing: 0.12em;
    background: rgba(200,168,78,0.06);
    border: 1px solid rgba(200,168,78,0.12);
    padding: 2px 6px;
    border-radius: 2px;
    flex-shrink: 0;
    animation: pinnedPulse 3s ease-in-out infinite;
  }

  @keyframes pinnedPulse {
    0%, 100% { border-color: rgba(200,168,78,0.12); }
    50% { border-color: rgba(200,168,78,0.3); }
  }

  /* ── Footer ── */
  .intel-footer {
    max-width: 1120px;
    margin: 0 auto;
    padding: 0 28px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 16px;
  }

  .intel-cta {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 10px 22px;
    border-radius: 4px;
    background: rgba(200,168,78,0.05);
    border: 1px solid rgba(200,168,78,0.15);
    color: #c8a84e;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .intel-cta::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(200,168,78,0.06), transparent);
    transition: left 0.5s ease;
  }

  .intel-cta:hover::before {
    left: 100%;
  }

  .intel-cta:hover {
    background: rgba(200,168,78,0.1);
    border-color: rgba(200,168,78,0.3);
    transform: translateY(-1px);
  }

  .intel-cta-arrow {
    transition: transform 0.2s ease;
    font-family: 'JetBrains Mono', monospace;
    font-size: 14px;
  }

  .intel-cta:hover .intel-cta-arrow {
    transform: translateX(4px);
  }

  .intel-cta-secondary {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: rgba(200,168,78,0.5);
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.05em;
    text-decoration: none;
    transition: color 0.2s;
  }

  .intel-cta-secondary:hover {
    color: rgba(200,168,78,0.8);
  }

  /* ── Responsive ── */
  @media (max-width: 768px) {
    .intel-header { padding: 0 20px; gap: 10px; }
    .intel-header-meta { margin-left: 0; }
    .intel-footer { padding: 0 20px; justify-content: center; }
    .intel-item { padding: 12px 20px; gap: 10px; }
    .intel-item-headline { font-size: 12px; }
    .intel-category { display: none; }
    .intel-ticker-wrap::before,
    .intel-ticker-wrap::after { width: 60px; }
    .intel-freq { display: none; }
  }

  @media (max-width: 480px) {
    .intel-feed-inner { padding: 36px 0 40px; }
    .intel-header { margin-bottom: 16px; }
    .intel-item { padding: 10px 16px; gap: 8px; }
    .intel-severity-code { display: none; }
    .intel-timestamp::before { display: none; }
  }

  /* ── Reduced motion ── */
  @media (prefers-reduced-motion: reduce) {
    .intel-ticker-track { animation: none; overflow-x: auto; }
    .intel-radar-sweep { display: none; }
    .intel-border-top::after { animation: none; }
    .intel-classification::before { animation: none; }
    .intel-status-dot { animation: none; }
    .intel-pinned { animation: none; }
  }
`;

/* ───────────────────────────────────────────
   COMPONENT
   ─────────────────────────────────────────── */
const PolicyAlertsTicker: React.FC = () => {
  const alerts = useMemo(() => getTickerAlerts(), []);
  const trackRef = useRef<HTMLDivElement>(null);
  const [signalStrength] = useState(() => Math.floor(Math.random() * 2) + 3); // 3-4 out of 5

  // Triple the alerts for seamless loop
  const tripled = useMemo(() => [...alerts, ...alerts, ...alerts], [alerts]);

  // Dynamic duration based on alert count
  const duration = useMemo(() => {
    const base = alerts.length * 7; // ~7s per alert
    return Math.max(35, Math.min(base, 80));
  }, [alerts]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <section className="intel-feed" aria-label="SBA Policy Alerts intelligence feed">
        <div className="intel-border-top" aria-hidden="true" />
        <div className="intel-border-bottom" aria-hidden="true" />

        <div className="intel-feed-inner">
          {/* ── Header ── */}
          <div className="intel-header">
            <div className="intel-header-left">
              <span className="intel-classification" aria-hidden="true">
                CLASSIFIED INTEL
              </span>
              <div style={{ position: 'relative' }}>
                <div className="intel-title-glow" aria-hidden="true" />
                <h2 className="intel-title">SBA Policy Alerts</h2>
              </div>
            </div>

            <div className="intel-header-meta">
              <div className="signal-bars" aria-label={`Signal strength: ${signalStrength} of 5`}>
                {[1, 2, 3, 4, 5].map(i => (
                  <div
                    key={i}
                    className={`signal-bar${i <= signalStrength ? ' active' : ''}`}
                    style={{ height: `${4 + i * 2}px` }}
                  />
                ))}
              </div>

              <div className="intel-status-live">
                <span className="intel-status-dot" />
                <span className="intel-status-text">Monitoring</span>
              </div>

              <span className="intel-freq" aria-hidden="true">
                UPD.FRI
              </span>
            </div>
          </div>

          {/* ── Ticker ── */}
          <div className="intel-ticker-wrap" role="marquee" aria-label="Scrolling policy alert headlines">
            <div className="intel-scanline" aria-hidden="true" />
            <div className="intel-radar-sweep" aria-hidden="true" />

            <div
              className="intel-ticker-track"
              ref={trackRef}
              style={{ '--ticker-duration': `${duration}s` } as React.CSSProperties}
              aria-live="off"
            >
              {tripled.map((alert, idx) => {
                const sev = SEVERITY_CONFIG[alert.severity] || SEVERITY_CONFIG.update;
                const catLabel = CATEGORY_LABELS[alert.category] || alert.category.toUpperCase().slice(0, 5);

                return (
                  <div
                    key={`${alert.id}-${idx}`}
                    className="intel-item"
                    aria-label={`${sev.label} alert, ${formatAlertDateShort(alert.date)}: ${alert.title}`}
                  >
                    <div className="intel-item-sep" aria-hidden="true" />

                    <div className="intel-severity">
                      <div
                        className="intel-severity-pip"
                        style={{
                          background: sev.color,
                          color: sev.color,
                          boxShadow: `0 0 8px ${sev.glow}`,
                        }}
                        aria-hidden="true"
                      />
                      <span
                        className="intel-severity-code"
                        style={{ color: sev.color }}
                      >
                        {sev.label}
                      </span>
                    </div>

                    <span className="intel-timestamp">
                      {tacticalDate(alert.date)}
                    </span>

                    <span
                      className="intel-category"
                      style={{
                        color: sev.color,
                        borderColor: `${sev.color}20`,
                        background: `${sev.color}08`,
                      }}
                    >
                      {catLabel}
                    </span>

                    {alert.pinned && (
                      <span className="intel-pinned" aria-label="Pinned alert">
                        PIN
                      </span>
                    )}

                    <span className="intel-item-headline">
                      {alert.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Footer ── */}
          <div className="intel-footer">
            <Link to="/policy-alerts" className="intel-cta">
              Access full intelligence feed
              <span className="intel-cta-arrow" aria-hidden="true">→</span>
            </Link>

            <Link to="/policy-alerts" className="intel-cta-secondary">
              Subscribe to alerts ▸
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default PolicyAlertsTicker;