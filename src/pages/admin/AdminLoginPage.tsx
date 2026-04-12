import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, Shield } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const AdminLoginPage: React.FC = () => {
  const { signIn, isAuthenticated, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (isAuthenticated && isAdmin) {
      navigate('/intel-board/admin', { replace: true });
    } else if (isAuthenticated && !isAdmin) {
      setError('Access denied. This account does not have admin privileges.');
      setSubmitting(false);
    }
  }, [loading, isAuthenticated, isAdmin, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    const { error: signInError } = await signIn(email, password);
    if (signInError) {
      setError('Invalid credentials. Admin access only.');
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#0f1209', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#5a6450', fontFamily: "'DM Sans', sans-serif" }}>
        Verifying session...
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0f1209',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px 16px',
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <div style={{
        width: '100%',
        maxWidth: 400,
        background: '#181c14',
        border: '1px solid rgba(200,168,78,0.18)',
        borderRadius: 20,
        padding: '40px 32px',
        boxShadow: '0 32px 80px rgba(0,0,0,0.7)',
      }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            width: 52, height: 52, borderRadius: '50%',
            background: 'rgba(200,168,78,0.1)',
            border: '1px solid rgba(200,168,78,0.25)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px',
          }}>
            <Shield size={22} color="#c8a84e" />
          </div>
          <h1 style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontSize: 26, fontWeight: 400, color: '#e8ede2', marginBottom: 6,
          }}>
            Admin Access
          </h1>
          <p style={{ fontSize: 13, color: '#5a6450' }}>
            Restricted to authorized administrators only.
          </p>
        </div>

        {error && (
          <div style={{
            marginBottom: 20, padding: '10px 14px', borderRadius: 10,
            background: 'rgba(200,80,80,0.1)', border: '1px solid rgba(200,80,80,0.2)',
            color: '#cc6666', fontSize: 13,
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label htmlFor="admin-email" style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#5a6450', marginBottom: 6 }}>
              Email
            </label>
            <input
              id="admin-email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoFocus
              autoComplete="email"
              placeholder="admin@example.com"
              style={inputStyle}
              onFocus={e => (e.target.style.borderColor = 'rgba(200,168,78,0.5)')}
              onBlur={e => (e.target.style.borderColor = 'rgba(154,184,122,0.1)')}
            />
          </div>

          <div>
            <label htmlFor="admin-password" style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#5a6450', marginBottom: 6 }}>
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              placeholder="••••••••"
              style={inputStyle}
              onFocus={e => (e.target.style.borderColor = 'rgba(200,168,78,0.5)')}
              onBlur={e => (e.target.style.borderColor = 'rgba(154,184,122,0.1)')}
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            style={{
              marginTop: 8,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              padding: '13px 0', borderRadius: 12,
              background: submitting
                ? 'rgba(200,168,78,0.1)'
                : 'linear-gradient(135deg, rgba(200,168,78,0.35), rgba(200,168,78,0.15))',
              border: '1px solid rgba(200,168,78,0.35)',
              color: '#e8ede2', fontSize: 14, fontWeight: 700,
              cursor: submitting ? 'wait' : 'pointer',
              transition: 'all 0.2s ease',
              opacity: submitting ? 0.7 : 1,
            }}
          >
            <LogIn size={15} />
            {submitting ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px 14px',
  borderRadius: 10,
  background: 'rgba(38,44,32,0.5)',
  border: '1px solid rgba(154,184,122,0.1)',
  color: '#e8ede2',
  fontSize: 14,
  fontFamily: "'DM Sans', sans-serif",
  outline: 'none',
  transition: 'border-color 0.2s ease',
  boxSizing: 'border-box',
};

export default AdminLoginPage;
