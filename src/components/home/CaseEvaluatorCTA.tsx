import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

export default function CaseEvaluatorCTA() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      aria-label="EIDL Case Evaluator"
      style={{
        padding: 'clamp(48px, 8vw, 80px) clamp(20px, 5vw, 48px)',
        background: 'linear-gradient(180deg, #0e100c 0%, #111408 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <style>{`
        @keyframes ctaShimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes ctaFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes ctaGlow {
          0%, 100% { box-shadow: 0 0 28px rgba(200,168,78,0.12), 0 0 0 1px rgba(200,168,78,0.14); }
          50% { box-shadow: 0 0 48px rgba(200,168,78,0.22), 0 0 0 1px rgba(200,168,78,0.22); }
        }
      `}</style>

      {/* Background radial glow */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse 60% 70% at 50% 50%, rgba(200,168,78,0.045) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        maxWidth: 1120,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Section eyebrow */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          padding: '5px 16px',
          borderRadius: 100,
          background: 'rgba(200,168,78,0.07)',
          border: '1px solid rgba(200,168,78,0.16)',
          marginBottom: 20,
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(12px)',
          transition: 'opacity 0.5s ease 0.05s, transform 0.5s ease 0.05s',
        }}>
          <span style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.12em',
            color: '#c8a84e',
            fontFamily: "'JetBrains Mono', monospace",
          }}>
            NEW TOOL
          </span>
        </div>

        {/* Headline */}
        <h2
          style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontSize: 'clamp(2rem, 5vw, 3.2rem)',
            fontWeight: 400,
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            margin: '0 0 16px',
            textAlign: 'center',
            backgroundImage: 'linear-gradient(90deg, #c8a84e 0%, #f0d890 40%, #c8a84e 60%, #e8c870 100%)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            animation: visible ? 'ctaShimmer 4s linear infinite' : 'none',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s',
          }}
        >
          How Strong Is Your Case?
        </h2>

        {/* Subtitle */}
        <p style={{
          fontFamily: "'DM Sans', system-ui, sans-serif",
          fontSize: 'clamp(1rem, 2.2vw, 1.15rem)',
          color: 'rgba(232,237,226,0.55)',
          maxWidth: 520,
          textAlign: 'center',
          lineHeight: 1.65,
          margin: '0 0 44px',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(14px)',
          transition: 'opacity 0.5s ease 0.18s, transform 0.5s ease 0.18s',
        }}>
          Get a free, instant assessment of your COVID EIDL situation in under 2 minutes.
        </p>

        {/* Glassmorphic card — full width */}
        <div
          style={{
            width: '100%',
            background: 'rgba(22,26,18,0.72)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            borderRadius: 20,
            padding: 'clamp(32px, 5vw, 52px) clamp(28px, 5vw, 56px)',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 'clamp(28px, 5vw, 64px)',
            animation: visible ? 'ctaGlow 3.5s ease-in-out infinite' : 'none',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.55s ease 0.25s, transform 0.55s ease 0.25s',
            flexWrap: 'wrap',
          }}
        >
          {/* Left — icon */}
          <div
            style={{
              width: 88,
              height: 88,
              borderRadius: 22,
              background: 'rgba(200,168,78,0.1)',
              border: '1px solid rgba(200,168,78,0.22)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              animation: 'ctaFloat 4s ease-in-out infinite',
            }}
          >
            <ShieldCheck size={40} color="#c8a84e" strokeWidth={1.5} aria-hidden="true" />
          </div>

          {/* Center — copy */}
          <div style={{ flex: 1, minWidth: 220 }}>
            <p style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: 'clamp(14px, 1.6vw, 16px)',
              color: 'rgba(232,237,226,0.65)',
              lineHeight: 1.7,
              margin: 0,
            }}>
              Our AI-powered Case Evaluator analyzes your EIDL loan situation and gives you a personalized case strength score with recommended next steps — no commitment required.
            </p>
          </div>

          {/* Right — CTA */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 12,
            flexShrink: 0,
          }}>
            <Link
              to="/case-evaluator"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '16px 36px',
                borderRadius: 12,
                background: 'linear-gradient(135deg, #c8a84e, #e8c870)',
                color: '#1a1e14',
                fontSize: 16,
                fontWeight: 700,
                fontFamily: "'DM Sans', system-ui, sans-serif",
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                transition: 'all 0.25s ease',
                boxShadow: '0 4px 24px rgba(200,168,78,0.3)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 8px 36px rgba(200,168,78,0.5)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 24px rgba(200,168,78,0.3)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Evaluate My Case
              <span style={{ fontSize: 18 }}>→</span>
            </Link>

            <span style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.1em',
              color: 'rgba(232,237,226,0.35)',
              fontFamily: "'JetBrains Mono', monospace",
              whiteSpace: 'nowrap',
            }}>
              FREE · 2 MINUTES · NO LOGIN REQUIRED
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
