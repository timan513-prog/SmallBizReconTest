import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import type { ScoreResult, EvaluatorAnswers, LeadFormData } from '../../types/caseEvaluator';
import { serializeAnswers } from '../../utils/caseScoring';

const WEB3FORMS_KEY = 'f1ce1de8-d7c3-40c1-9d84-ca2bd9e97c92';

interface EvaluatorLeadFormProps {
  result: ScoreResult;
  answers: EvaluatorAnswers;
}

export default function EvaluatorLeadForm({ result, answers }: EvaluatorLeadFormProps) {
  const [form, setForm] = useState<LeadFormData>({
    name: '',
    email: '',
    phone: '',
    situation: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(false);

    const body = {
      access_key: WEB3FORMS_KEY,
      subject: `EIDL Case Evaluator — ${result.tierLabel} (Score: ${result.score})`,
      from_name: form.name || 'Case Evaluator Submission',
      email: form.email,
      name: form.name,
      phone: form.phone || 'Not provided',
      situation: form.situation || 'Not provided',
      case_score: String(result.score),
      case_tier: result.tierLabel,
      answers: serializeAnswers(answers),
      submitted_at: new Date().toISOString(),
      redirect: 'false',
    };

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json() as { success: boolean };
      if (data.success) {
        setSubmitted(true);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div
        style={{
          background: 'rgba(154,184,122,0.07)',
          border: '1px solid rgba(154,184,122,0.2)',
          borderRadius: 16,
          padding: '36px 28px',
          textAlign: 'center',
          animation: 'evalFadeUp 0.4s ease both',
        }}
      >
        <div style={{
          width: 52,
          height: 52,
          borderRadius: '50%',
          background: 'rgba(154,184,122,0.15)',
          border: '1px solid rgba(154,184,122,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 18px',
          fontSize: 24,
        }}>
          ✓
        </div>
        <h3 style={{
          fontFamily: "'Instrument Serif', Georgia, serif",
          fontSize: 22,
          fontWeight: 400,
          color: '#e8ede2',
          margin: '0 0 12px',
        }}>
          Your case summary is on the way.
        </h3>
        <p style={{
          fontFamily: "'DM Sans', system-ui, sans-serif",
          fontSize: 15,
          color: 'rgba(232,237,226,0.6)',
          lineHeight: 1.6,
          margin: '0 0 22px',
        }}>
          A SmallBiz Recon™ specialist will follow up within 24 hours.
        </p>
        <a
          href="https://calendly.com/smallbizrecon1/30min"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 7,
            fontSize: 14,
            color: '#c8a84e',
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontWeight: 600,
            textDecoration: 'none',
          }}
        >
          Or book a consultation now
          <ExternalLink size={13} aria-hidden="true" />
        </a>
      </div>
    );
  }

  return (
    <div style={{
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 16,
      padding: '28px 28px',
    }}>
      <h3 style={{
        fontFamily: "'Instrument Serif', Georgia, serif",
        fontSize: 22,
        fontWeight: 400,
        color: '#e8ede2',
        margin: '0 0 8px',
        letterSpacing: '-0.01em',
      }}>
        Want a detailed case breakdown sent to your inbox?
      </h3>
      <p style={{
        fontFamily: "'DM Sans', system-ui, sans-serif",
        fontSize: 14,
        color: 'rgba(232,237,226,0.5)',
        margin: '0 0 24px',
      }}>
        Free · No commitment · Sent within 24 hours
      </p>

      <form onSubmit={handleSubmit} noValidate>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 20 }}>
          <div>
            <label htmlFor="eval-name" style={labelStyle}>
              Full Name <span style={{ color: '#c8a84e' }}>*</span>
            </label>
            <input
              id="eval-name"
              name="name"
              type="text"
              required
              autoComplete="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Jane Smith"
              style={inputStyle}
              onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(200,168,78,0.4)'; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
            />
          </div>

          <div>
            <label htmlFor="eval-email" style={labelStyle}>
              Email Address <span style={{ color: '#c8a84e' }}>*</span>
            </label>
            <input
              id="eval-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              placeholder="jane@example.com"
              style={inputStyle}
              onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(200,168,78,0.4)'; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
            />
          </div>

          <div>
            <label htmlFor="eval-phone" style={labelStyle}>
              Phone <span style={{ color: 'rgba(232,237,226,0.35)' }}>(optional)</span>
            </label>
            <input
              id="eval-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              value={form.phone}
              onChange={handleChange}
              placeholder="(555) 000-0000"
              style={inputStyle}
              onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(200,168,78,0.4)'; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
            />
          </div>

          <div>
            <label htmlFor="eval-situation" style={labelStyle}>
              Brief description of your situation <span style={{ color: 'rgba(232,237,226,0.35)' }}>(optional)</span>
            </label>
            <textarea
              id="eval-situation"
              name="situation"
              rows={3}
              value={form.situation}
              onChange={handleChange}
              placeholder="Anything helpful for our team to know..."
              style={{
                ...inputStyle,
                resize: 'vertical',
                minHeight: 80,
              }}
              onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(200,168,78,0.4)'; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
            />
          </div>
        </div>

        {error && (
          <p style={{
            fontSize: 13,
            color: '#d07070',
            fontFamily: "'DM Sans', system-ui, sans-serif",
            marginBottom: 14,
          }}>
            Something went wrong. Please try again or book directly below.
          </p>
        )}

        <button
          type="submit"
          disabled={submitting || !form.name || !form.email}
          style={{
            width: '100%',
            padding: '14px 24px',
            borderRadius: 10,
            background: (submitting || !form.name || !form.email)
              ? 'rgba(255,255,255,0.06)'
              : 'linear-gradient(135deg, #c8a84e, #e8c870)',
            border: 'none',
            color: (submitting || !form.name || !form.email) ? 'rgba(232,237,226,0.3)' : '#1a1e14',
            fontSize: 15,
            fontWeight: 700,
            fontFamily: "'DM Sans', system-ui, sans-serif",
            cursor: (submitting || !form.name || !form.email) ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s ease',
            marginBottom: 16,
          }}
        >
          {submitting ? 'Sending...' : 'Send My Case Summary'}
        </button>
      </form>

      <div style={{ textAlign: 'center' }}>
        <span style={{
          fontSize: 13,
          color: 'rgba(232,237,226,0.4)',
          fontFamily: "'DM Sans', system-ui, sans-serif",
        }}>
          Or skip straight to booking —{' '}
        </span>
        <a
          href="https://calendly.com/smallbizrecon1/30min"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: 13,
            color: '#c8a84e',
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontWeight: 600,
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
          }}
        >
          Book a free 30-min call
          <ExternalLink size={12} aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 13,
  fontWeight: 600,
  color: 'rgba(232,237,226,0.65)',
  fontFamily: "'DM Sans', system-ui, sans-serif",
  marginBottom: 7,
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '11px 14px',
  borderRadius: 10,
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.1)',
  color: '#e8ede2',
  fontSize: 14,
  fontFamily: "'DM Sans', system-ui, sans-serif",
  outline: 'none',
  transition: 'border-color 0.2s ease',
  boxSizing: 'border-box',
};
