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
          background: 'rgba(59, 74, 44, 0.04)',
          border: '1px solid rgba(59, 74, 44, 0.12)',
          borderRadius: 12,
          padding: '32px 24px',
          textAlign: 'center',
        }}
      >
        <div style={{
          width: 48,
          height: 48,
          borderRadius: '50%',
          background: 'rgba(59, 74, 44, 0.08)',
          border: '1px solid rgba(59, 74, 44, 0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 16px',
          fontSize: 22,
          color: 'var(--color-brand-green)',
        }}>
          ✓
        </div>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 20,
          fontWeight: 400,
          color: 'var(--color-text)',
          margin: '0 0 10px',
        }}>
          Your case summary is on the way.
        </h3>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 15,
          color: 'var(--color-text-secondary)',
          lineHeight: 1.6,
          margin: '0 0 20px',
        }}>
          A SmallBiz Recon specialist will follow up within 24 hours.
        </p>
        <a
          href="https://calendly.com/smallbizrecon1/30min"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 14,
            color: 'var(--color-brand-green)',
            fontFamily: 'var(--font-body)',
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
      background: 'var(--color-bg-warm)',
      border: '1px solid var(--color-border-light)',
      borderRadius: 12,
      padding: '24px',
    }}>
      <h3 style={{
        fontFamily: 'var(--font-display)',
        fontSize: 20,
        fontWeight: 400,
        color: 'var(--color-text)',
        margin: '0 0 6px',
      }}>
        Want a detailed case breakdown sent to your inbox?
      </h3>
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: 14,
        color: 'var(--color-text-muted)',
        margin: '0 0 22px',
      }}>
        Free &middot; No commitment &middot; Sent within 24 hours
      </p>

      <form onSubmit={handleSubmit} noValidate>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 18 }}>
          <div>
            <label htmlFor="eval-name" style={labelStyle}>
              Full Name <span style={{ color: 'var(--color-gold)' }}>*</span>
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
            />
          </div>

          <div>
            <label htmlFor="eval-email" style={labelStyle}>
              Email Address <span style={{ color: 'var(--color-gold)' }}>*</span>
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
            />
          </div>

          <div>
            <label htmlFor="eval-phone" style={labelStyle}>
              Phone <span style={{ color: 'var(--color-text-muted)' }}>(optional)</span>
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
            />
          </div>

          <div>
            <label htmlFor="eval-situation" style={labelStyle}>
              Brief description <span style={{ color: 'var(--color-text-muted)' }}>(optional)</span>
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
            />
          </div>
        </div>

        {error && (
          <p style={{
            fontSize: 13,
            color: '#C0392B',
            fontFamily: 'var(--font-body)',
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
            padding: '13px 24px',
            borderRadius: 8,
            background: (submitting || !form.name || !form.email)
              ? 'var(--color-border-light)'
              : 'var(--color-brand-green)',
            border: 'none',
            color: (submitting || !form.name || !form.email) ? 'var(--color-text-muted)' : '#FAF9F6',
            fontSize: 15,
            fontWeight: 600,
            fontFamily: 'var(--font-body)',
            cursor: (submitting || !form.name || !form.email) ? 'not-allowed' : 'pointer',
            marginBottom: 14,
          }}
        >
          {submitting ? 'Sending...' : 'Send My Case Summary'}
        </button>
      </form>

      <div style={{ textAlign: 'center' }}>
        <span style={{
          fontSize: 13,
          color: 'var(--color-text-muted)',
          fontFamily: 'var(--font-body)',
        }}>
          Or skip straight to booking —{' '}
        </span>
        <a
          href="https://calendly.com/smallbizrecon1/30min"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: 13,
            color: 'var(--color-brand-green)',
            fontFamily: 'var(--font-body)',
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
  color: 'var(--color-text-secondary)',
  fontFamily: 'var(--font-body)',
  marginBottom: 6,
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '11px 14px',
  borderRadius: 8,
  background: 'white',
  border: '1.5px solid var(--color-border)',
  color: 'var(--color-text)',
  fontSize: 14,
  fontFamily: 'var(--font-body)',
  outline: 'none',
  boxSizing: 'border-box',
};
