import React, { useState } from 'react';
import { Bell, CircleCheck as CheckCircle } from 'lucide-react';

const WEB3FORMS_KEY = 'f1ce1de8-d7c3-40c1-9d84-ca2bd9e97c92';

const AlertSubscriptionBar: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus('loading');
    try {
      const formData = new FormData();
      formData.append('access_key', WEB3FORMS_KEY);
      formData.append('subject', 'New Policy Alert Subscriber');
      formData.append('source', 'policy-alerts-page');
      formData.append('email', email.trim());
      formData.append('to', 'smallbizrecon1@gmail.com');
      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div
      style={{
        borderRadius: 16,
        background: 'var(--bg-card)',
        backdropFilter: 'var(--glass-blur)',
        WebkitBackdropFilter: 'var(--glass-blur)',
        border: '1px solid var(--border-primary)',
        padding: '20px 24px',
        marginBottom: 8,
      }}
    >
      {status === 'success' ? (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
        }}>
          <CheckCircle size={18} style={{ color: 'var(--accent-green)' }} aria-hidden="true" />
          <span style={{
            fontFamily: 'var(--font-body)',
            fontSize: 14,
            color: 'var(--accent-green)',
            fontWeight: 600,
          }}>
            You're subscribed. We'll notify you when new alerts are published.
          </span>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          aria-label="Subscribe to policy alert emails"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: 14,
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Bell size={18} aria-hidden="true" style={{ color: 'var(--accent-gold)', flexShrink: 0 }} />
            <span style={{
              fontFamily: 'var(--font-body)',
              fontSize: 14,
              fontWeight: 600,
              color: 'var(--text-primary)',
            }}>
              Get Policy Alerts Delivered
            </span>
          </div>
          <div style={{ display: 'flex', gap: 10, flex: '1 1 260px', maxWidth: 480 }}>
            <label htmlFor="alert-email-input" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0,0,0,0)' }}>
              Email address
            </label>
            <input
              id="alert-email-input"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              aria-describedby="alert-email-desc"
              style={{
                flex: 1,
                padding: '10px 16px',
                borderRadius: 10,
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-primary)',
                color: 'var(--text-primary)',
                fontSize: 13,
                fontFamily: 'var(--font-body)',
                outline: 'none',
                transition: 'border-color 0.25s ease',
              }}
              onFocus={e => (e.target.style.borderColor = 'var(--border-hover)')}
              onBlur={e => (e.target.style.borderColor = 'var(--border-primary)')}
            />
            <span id="alert-email-desc" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0,0,0,0)' }}>
              Enter your email to receive SBA policy alert notifications
            </span>
            <button
              type="submit"
              disabled={status === 'loading'}
              style={{
                padding: '10px 20px',
                borderRadius: 10,
                background: 'linear-gradient(135deg, rgba(200,168,78,0.3), rgba(200,168,78,0.15))',
                border: '1px solid rgba(200,168,78,0.35)',
                color: 'var(--accent-gold)',
                fontSize: 13,
                fontWeight: 700,
                fontFamily: 'var(--font-body)',
                cursor: status === 'loading' ? 'wait' : 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.25s ease',
                opacity: status === 'loading' ? 0.7 : 1,
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'linear-gradient(135deg, rgba(200,168,78,0.45), rgba(200,168,78,0.22))')}
              onMouseLeave={e => (e.currentTarget.style.background = 'linear-gradient(135deg, rgba(200,168,78,0.3), rgba(200,168,78,0.15))')}
            >
              {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
            </button>
          </div>
        </form>
      )}
      {status === 'error' && (
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: '#cc6666', marginTop: 8, textAlign: 'center' }}>
          Something went wrong. Please try again or email us directly.
        </p>
      )}
    </div>
  );
};

export default AlertSubscriptionBar;
