import React from 'react';
import LiveIndicator from '../home/LiveIndicator';

const AlertsHero: React.FC = () => {
  return (
    <div style={{
      padding: '56px 0 40px',
      borderBottom: '1px solid rgba(200,168,78,0.1)',
      marginBottom: 0,
    }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 14, marginBottom: 16 }}>
        <h1
          style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontSize: 'clamp(32px, 5vw, 48px)',
            fontWeight: 400,
            margin: 0,
            background: 'linear-gradient(90deg, #cda349 0%, #cda349 30%, #e8d5a0 44%, #fffbe6 50%, #e8d5a0 56%, #cda349 70%, #cda349 100%)',
            backgroundSize: '200% 100%',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'heroShimmerSweep 5s ease-in-out 1s infinite',
          }}
        >
          SBA & Treasury Policy Alerts
        </h1>
        <LiveIndicator text="MONITORING ACTIVE" />
      </div>

      <p style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 16,
        color: '#a3b098',
        lineHeight: 1.7,
        maxWidth: 680,
        margin: '0 0 20px',
      }}>
        Real-time monitoring of policy changes, Treasury actions, and servicing updates that impact COVID EIDL borrowers.
      </p>

      <div aria-hidden="true" style={{
        width: '100%',
        maxWidth: 320,
        height: 2,
        background: 'linear-gradient(90deg, #cda349, rgba(200,168,78,0.15), transparent)',
        borderRadius: 2,
      }} />
    </div>
  );
};

export default AlertsHero;
