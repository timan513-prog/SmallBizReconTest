import { useEffect, useState } from 'react';
import type { ScoreTier } from '../../types/caseEvaluator';

interface ScoreGaugeProps {
  score: number;
  tier: ScoreTier;
  tierLabel: string;
}

const TIER_COLORS: Record<ScoreTier, string> = {
  critical: '#e8a04e',
  strong: '#c8a84e',
  moderate: '#9ab87a',
  early: '#7ab0e0',
  low: '#8a9480',
};

export default function ScoreGauge({ score, tier, tierLabel }: ScoreGaugeProps) {
  const [animated, setAnimated] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const duration = 1400;

    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimated(Math.round(eased * score));
      if (progress < 1) requestAnimationFrame(step);
    };

    const raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [score]);

  const radius = 72;
  const stroke = 9;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const offset = circumference - (animated / 100) * circumference;
  const color = TIER_COLORS[tier];

  return (
    <div
      aria-live="polite"
      aria-label={`Case strength score: ${score} out of 100 — ${tierLabel}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 14,
      }}
    >
      <div style={{ position: 'relative', width: radius * 2, height: radius * 2 }}>
        <svg
          width={radius * 2}
          height={radius * 2}
          aria-hidden="true"
          style={{ transform: 'rotate(-90deg)' }}
        >
          <circle
            cx={radius}
            cy={radius}
            r={normalizedRadius}
            fill="none"
            stroke="rgba(255,255,255,0.07)"
            strokeWidth={stroke}
          />
          <circle
            cx={radius}
            cy={radius}
            r={normalizedRadius}
            fill="none"
            stroke={color}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={offset}
            style={{
              transition: 'stroke-dashoffset 0.05s ease',
              filter: `drop-shadow(0 0 8px ${color}66)`,
            }}
          />
        </svg>

        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <span style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontSize: 38,
            fontWeight: 400,
            color,
            lineHeight: 1,
          }}>
            {animated}
          </span>
          <span style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.08em',
            color: 'rgba(232,237,226,0.4)',
            fontFamily: "'JetBrains Mono', monospace",
          }}>
            /100
          </span>
        </div>
      </div>

      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '5px 16px',
        borderRadius: 100,
        background: `${color}18`,
        border: `1px solid ${color}44`,
      }}>
        <span style={{
          fontFamily: "'Instrument Serif', Georgia, serif",
          fontSize: 16,
          color,
          letterSpacing: '-0.01em',
        }}>
          {tierLabel}
        </span>
      </div>
    </div>
  );
}
