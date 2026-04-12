export default function EvaluatorHero() {
  return (
    <section
      aria-label="EIDL Case Evaluator"
      style={{
        textAlign: 'center',
        padding: '56px 0 40px',
      }}
    >
      <p style={{
        fontSize: 13,
        fontWeight: 600,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: 'var(--color-gold)',
        marginBottom: 16,
        fontFamily: 'var(--font-body)',
      }}>
        Free &middot; 2 Minutes &middot; No Login Required
      </p>

      <h1 style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(2rem, 5vw, 3rem)',
        fontWeight: 400,
        color: 'var(--color-text)',
        letterSpacing: '-0.02em',
        lineHeight: 1.1,
        margin: '0 0 16px',
      }}>
        EIDL Case Evaluator
      </h1>

      <p style={{
        fontSize: 'clamp(1rem, 2vw, 1.1rem)',
        color: 'var(--color-text-secondary)',
        maxWidth: 520,
        margin: '0 auto',
        lineHeight: 1.7,
        fontFamily: 'var(--font-body)',
      }}>
        Answer a few questions about your situation. Get a clear picture of where things stand and what to do next.
      </p>
    </section>
  );
}
