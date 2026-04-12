import React from 'react';

interface Props {
  text?: string;
}

const LiveIndicator: React.FC<Props> = ({ text = 'LIVE' }) => {
  return (
    <div
      role="status"
      aria-label={`Status: ${text}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 7,
        padding: '4px 12px',
        borderRadius: 100,
        background: 'rgba(126,168,94,0.1)',
        border: '1px solid rgba(126,168,94,0.25)',
      }}
    >
      <span
        aria-hidden="true"
        style={{
          width: 7,
          height: 7,
          borderRadius: '50%',
          background: '#7ea85e',
          boxShadow: '0 0 0 0 rgba(126,168,94,0.4)',
          animation: 'livePulse 2s ease-in-out infinite',
          flexShrink: 0,
        }}
      />
      <span style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: '0.12em',
        color: '#7ea85e',
        textTransform: 'uppercase',
      }}>
        {text}
      </span>
      <style>{`
        @keyframes livePulse {
          0% { box-shadow: 0 0 0 0 rgba(126,168,94,0.5); }
          50% { box-shadow: 0 0 0 5px rgba(126,168,94,0); }
          100% { box-shadow: 0 0 0 0 rgba(126,168,94,0); }
        }
      `}</style>
    </div>
  );
};

export default LiveIndicator;
