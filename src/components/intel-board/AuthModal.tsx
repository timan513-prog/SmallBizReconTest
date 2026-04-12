import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface Props {
  open: boolean;
  onClose: () => void;
  defaultTab?: 'login' | 'signup';
}

const AuthModal: React.FC<Props> = ({ open, onClose, defaultTab = 'login' }) => {
  const { signIn, signUp } = useAuth();
  const [tab, setTab] = useState<'login' | 'signup'>(defaultTab);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const firstInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTab(defaultTab);
      setError('');
      setSuccess('');
      setTimeout(() => firstInput.current?.focus(), 50);
    }
  }, [open, defaultTab]);

  useEffect(() => {
    const handle = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (open) document.addEventListener('keydown', handle);
    return () => document.removeEventListener('keydown', handle);
  }, [open, onClose]);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (tab === 'login') {
        const { error } = await signIn(email, password);
        if (error) { setError(error); return; }
        onClose();
      } else {
        if (password !== confirm) { setError('Passwords do not match.'); return; }
        if (password.length < 6) { setError('Password must be at least 6 characters.'); return; }
        const { error } = await signUp(email, password, displayName || 'Anonymous Borrower');
        if (error) { setError(error); return; }
        setSuccess('Account created! Check your email to confirm, then log in.');
        setTab('login');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={tab === 'login' ? 'Log in' : 'Sign up'}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(6px)',
      }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{
        width: '100%', maxWidth: 420, margin: '0 16px',
        borderRadius: 20,
        background: '#181c14',
        border: '1px solid rgba(200,168,78,0.2)',
        padding: '32px 28px',
        position: 'relative',
        boxShadow: '0 24px 80px rgba(0,0,0,0.6)',
      }}>
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: 'absolute', top: 16, right: 16,
            background: 'none', border: 'none', cursor: 'pointer',
            color: '#5a6450', padding: 4,
          }}
        >
          <X size={18} />
        </button>

        <div style={{ marginBottom: 24, textAlign: 'center' }}>
          <h2 style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontSize: 26, fontWeight: 400, color: '#e8ede2', marginBottom: 6,
          }}>
            {tab === 'login' ? 'Welcome Back' : 'Join the Discussion'}
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: '#5a6450' }}>
            {tab === 'login' ? 'Log in to comment and vote on posts.' : 'Create an account to participate in the EIDL Intel Board.'}
          </p>
        </div>

        <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
          {(['login', 'signup'] as const).map(t => (
            <button
              key={t}
              onClick={() => { setTab(t); setError(''); setSuccess(''); }}
              style={{
                flex: 1, padding: '9px 0', borderRadius: 10, fontSize: 13, fontWeight: 600,
                fontFamily: "'DM Sans', sans-serif", cursor: 'pointer', transition: 'all 0.2s ease',
                background: tab === t ? 'linear-gradient(135deg, rgba(200,168,78,0.3), rgba(200,168,78,0.15))' : 'transparent',
                border: tab === t ? '1px solid rgba(200,168,78,0.35)' : '1px solid rgba(154,184,122,0.1)',
                color: tab === t ? '#c8a84e' : '#5a6450',
              }}
            >
              {t === 'login' ? 'Log In' : 'Sign Up'}
            </button>
          ))}
        </div>

        {success && (
          <div style={{
            marginBottom: 16, padding: '10px 14px', borderRadius: 10,
            background: 'rgba(154,184,122,0.1)', border: '1px solid rgba(154,184,122,0.2)',
            color: '#9ab87a', fontSize: 13, fontFamily: "'DM Sans', sans-serif",
          }}>
            {success}
          </div>
        )}
        {error && (
          <div style={{
            marginBottom: 16, padding: '10px 14px', borderRadius: 10,
            background: 'rgba(200,80,80,0.1)', border: '1px solid rgba(200,80,80,0.2)',
            color: '#cc6666', fontSize: 13, fontFamily: "'DM Sans', sans-serif",
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {tab === 'signup' && (
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#5a6450', marginBottom: 6, fontFamily: "'DM Sans', sans-serif" }}>
                Display Name
              </label>
              <input
                ref={firstInput}
                type="text"
                value={displayName}
                onChange={e => setDisplayName(e.target.value)}
                placeholder="Your name (shown publicly)"
                style={inputStyle}
                onFocus={e => (e.target.style.borderColor = 'rgba(200,168,78,0.5)')}
                onBlur={e => (e.target.style.borderColor = 'rgba(154,184,122,0.1)')}
              />
            </div>
          )}
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#5a6450', marginBottom: 6, fontFamily: "'DM Sans', sans-serif" }}>
              Email
            </label>
            <input
              ref={tab === 'login' ? firstInput : undefined}
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              placeholder="your@email.com"
              style={inputStyle}
              onFocus={e => (e.target.style.borderColor = 'rgba(200,168,78,0.5)')}
              onBlur={e => (e.target.style.borderColor = 'rgba(154,184,122,0.1)')}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#5a6450', marginBottom: 6, fontFamily: "'DM Sans', sans-serif" }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              style={inputStyle}
              onFocus={e => (e.target.style.borderColor = 'rgba(200,168,78,0.5)')}
              onBlur={e => (e.target.style.borderColor = 'rgba(154,184,122,0.1)')}
            />
            {tab === 'signup' && (
              <p style={{
                marginTop: 6, fontSize: 11, color: '#4a5440',
                fontFamily: "'DM Sans', sans-serif", lineHeight: 1.4,
              }}>
                Passwords are checked against known breach databases for your protection.
              </p>
            )}
          </div>
          {tab === 'signup' && (
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#5a6450', marginBottom: 6, fontFamily: "'DM Sans', sans-serif" }}>
                Confirm Password
              </label>
              <input
                type="password"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                required
                placeholder="••••••••"
                style={inputStyle}
                onFocus={e => (e.target.style.borderColor = 'rgba(200,168,78,0.5)')}
                onBlur={e => (e.target.style.borderColor = 'rgba(154,184,122,0.1)')}
              />
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: 4, padding: '12px 0', borderRadius: 12,
              background: 'linear-gradient(135deg, rgba(200,168,78,0.4), rgba(200,168,78,0.2))',
              border: '1px solid rgba(200,168,78,0.4)',
              color: '#e8ede2', fontSize: 14, fontWeight: 700,
              fontFamily: "'DM Sans', sans-serif", cursor: loading ? 'wait' : 'pointer',
              transition: 'all 0.2s ease', opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? 'Please wait...' : tab === 'login' ? 'Log In' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  );
};

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '10px 14px', borderRadius: 10,
  background: 'rgba(38,44,32,0.5)', border: '1px solid rgba(154,184,122,0.1)',
  color: '#e8ede2', fontSize: 14, fontFamily: "'DM Sans', sans-serif", outline: 'none',
  transition: 'border-color 0.2s ease',
};

export default AuthModal;
