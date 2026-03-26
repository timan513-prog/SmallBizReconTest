export default function EvaluatorHero() {
  return (
    <section
      aria-label="EIDL Case Evaluator hero"
      style={{
        textAlign: 'center',
        padding: '72px 24px 56px',
        position: 'relative',
      }}
    >
      <style>{`
        @keyframes evalShimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes evalRuleExpand {
          from { width: 0; opacity: 0; }
          to { width: 80px; opacity: 1; }
        }
      `}</style>

      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '5px 16px',
        borderRadius: 100,
        background: 'rgba(200,168,78,0.08)',
        border: '1px solid rgba(200,168,78,0.2)',
        marginBottom: 24,
      }}>
        <span style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.12em',
          fontFamily: "'JetBrains Mono', monospace",
          color: '#c8a84e',
        }}>
          FREE · 2 MINUTES · NO LOGIN REQUIRED
        </span>
      </div>

      <h1 style={{
        fontFamily: "'Instrument Serif', Georgia, serif",
        fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
        fontWeight: 400,
        letterSpacing: '-0.02em',
        lineHeight: 1.1,
        margin: '0 0 20px',
        backgroundImage: 'linear-gradient(90deg, #c8a84e 0%, #f0d890 40%, #c8a84e 60%, #e8c870 100%)',
        backgroundSize: '200% auto',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        animation: 'evalShimmer 4s linear infinite',
      }}>
        EIDL Case Evaluator
      </h1>

      <div style={{
        width: 80,
        height: 2,
        background: 'linear-gradient(90deg, transparent, #c8a84e, transparent)',
        margin: '0 auto 24px',
        animation: 'evalRuleExpand 0.8s ease 0.3s both',
      }} />

      <p style={{
        fontFamily: "'DM Sans', system-ui, sans-serif",
        fontSize: 'clamp(1rem, 2.2vw, 1.15rem)',
        color: 'rgba(232,237,226,0.65)',
        maxWidth: 560,
        margin: '0 auto',
        lineHeight: 1.7,
      }}>
        Answer a few questions. Get your case strength score and a clear path forward.
      </p>
    </section>
  );
}
