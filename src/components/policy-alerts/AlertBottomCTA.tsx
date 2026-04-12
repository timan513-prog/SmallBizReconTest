import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar } from 'lucide-react';

const AlertBottomCTA: React.FC = () => {
  return (
    <div style={{
      marginTop: 48,
      padding: '40px 40px',
      borderRadius: 20,
      background: 'rgba(154,184,122,0.05)',
      border: '1px solid rgba(154,184,122,0.15)',
      backdropFilter: 'var(--glass-blur)',
      WebkitBackdropFilter: 'var(--glass-blur)',
      textAlign: 'center',
    }}>
      <h2 style={{
        fontFamily: 'var(--font-display)',
        fontSize: 28,
        fontWeight: 400,
        color: 'var(--text-primary)',
        marginBottom: 16,
        lineHeight: 1.2,
      }}>
        Don't Navigate Policy Changes Alone
      </h2>
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: 15,
        color: 'var(--text-secondary)',
        lineHeight: 1.7,
        maxWidth: 600,
        margin: '0 auto 28px',
      }}>
        SmallBiz Recon™ monitors SBA and Treasury policy updates daily so you don't have to. Whether you're facing a new collection action or want to stay ahead of changes to your EIDL loan, we're here.
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center' }}>
        <a
          href="https://calendly.com/smallbizrecon1/30min"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            padding: '14px 28px',
            borderRadius: 14,
            background: 'linear-gradient(135deg, rgba(200,168,78,0.45), rgba(200,168,78,0.2))',
            border: '1px solid rgba(200,168,78,0.55)',
            color: '#eaf0e4',
            fontSize: 14,
            fontWeight: 600,
            fontFamily: 'var(--font-body)',
            textDecoration: 'none',
            transition: 'all 0.3s ease',
            boxShadow: '0 2px 12px rgba(200,168,78,0.1)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 28px rgba(200,168,78,0.2)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 12px rgba(200,168,78,0.1)';
          }}
        >
          <Calendar size={15} aria-hidden="true" />
          Book a Free Consultation
        </a>
        <Link
          to="/case-evaluator"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            padding: '14px 28px',
            borderRadius: 14,
            background: 'transparent',
            border: '1px solid var(--border-gold)',
            color: 'var(--accent-gold)',
            fontSize: 14,
            fontWeight: 600,
            fontFamily: 'var(--font-body)',
            textDecoration: 'none',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(200,168,78,0.08)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
          }}
        >
          Evaluate My Case
          <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
};

export default AlertBottomCTA;
