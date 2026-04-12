interface EvaluatorProgressBarProps {
  current: number;
  total: number;
}

export default function EvaluatorProgressBar({ current, total }: EvaluatorProgressBarProps) {
  const pct = Math.round((current / total) * 100);

  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
      }}>
        <span style={{
          fontSize: 13,
          fontWeight: 600,
          color: 'var(--color-text-muted)',
          fontFamily: 'var(--font-body)',
        }}>
          Step {current} of {total}
        </span>
        <span style={{
          fontSize: 13,
          fontWeight: 600,
          color: 'var(--color-brand-green)',
          fontFamily: 'var(--font-body)',
        }}>
          {pct}%
        </span>
      </div>
      <div style={{
        height: 4,
        borderRadius: 100,
        background: 'var(--color-border-light)',
        overflow: 'hidden',
      }}>
        <div
          role="progressbar"
          aria-valuenow={current}
          aria-valuemin={1}
          aria-valuemax={total}
          aria-label={`Step ${current} of ${total}`}
          style={{
            height: '100%',
            width: `${pct}%`,
            borderRadius: 100,
            background: 'var(--color-brand-green)',
            transition: 'width 0.4s ease',
          }}
        />
      </div>
    </div>
  );
}
