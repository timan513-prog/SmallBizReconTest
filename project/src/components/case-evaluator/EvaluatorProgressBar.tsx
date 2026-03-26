interface EvaluatorProgressBarProps {
  current: number;
  total: number;
}

export default function EvaluatorProgressBar({ current, total }: EvaluatorProgressBarProps) {
  const pct = Math.round((current / total) * 100);

  return (
    <div style={{ marginBottom: 36 }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
      }}>
        <span style={{
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: '0.1em',
          color: 'rgba(200,168,78,0.7)',
          fontFamily: "'JetBrains Mono', monospace",
        }}>
          STEP {current} OF {total}
        </span>
        <span style={{
          fontSize: 12,
          fontWeight: 600,
          color: '#c8a84e',
          fontFamily: "'JetBrains Mono', monospace",
        }}>
          {pct}%
        </span>
      </div>
      <div style={{
        height: 4,
        borderRadius: 100,
        background: 'rgba(255,255,255,0.07)',
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
            background: 'linear-gradient(90deg, #c8a84e, #e8c870)',
            transition: 'width 0.5s cubic-bezier(0.4,0,0.2,1)',
            boxShadow: '0 0 8px rgba(200,168,78,0.4)',
          }}
        />
      </div>
    </div>
  );
}
