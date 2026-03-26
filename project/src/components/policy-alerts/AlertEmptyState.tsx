import React from 'react';
import { Search } from 'lucide-react';

interface Props {
  onClearFilters: () => void;
}

const AlertEmptyState: React.FC<Props> = ({ onClearFilters }) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '64px 24px',
      textAlign: 'center',
    }}>
      <div style={{
        width: 64,
        height: 64,
        borderRadius: 16,
        background: 'var(--bg-tertiary)',
        border: '1px solid var(--border-primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
      }}>
        <Search size={28} style={{ color: 'var(--text-muted)' }} aria-hidden="true" />
      </div>
      <h3 style={{
        fontFamily: 'var(--font-display)',
        fontSize: 22,
        fontWeight: 400,
        color: 'var(--text-primary)',
        marginBottom: 10,
      }}>
        No alerts match your filters.
      </h3>
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: 14,
        color: 'var(--text-secondary)',
        marginBottom: 24,
      }}>
        Try adjusting your filters or check back soon.
      </p>
      <button
        onClick={onClearFilters}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          padding: '10px 24px',
          borderRadius: 12,
          background: 'var(--badge-bg)',
          border: '1px solid var(--badge-border)',
          color: 'var(--accent-green)',
          fontSize: 14,
          fontWeight: 600,
          fontFamily: 'var(--font-body)',
          cursor: 'pointer',
          transition: 'all 0.25s ease',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLButtonElement).style.background = 'var(--bg-card-hover)';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLButtonElement).style.background = 'var(--badge-bg)';
        }}
      >
        Clear Filters
      </button>
    </div>
  );
};

export default AlertEmptyState;
