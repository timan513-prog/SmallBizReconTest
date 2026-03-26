import React, { useState } from 'react';
import type { PolicyAlert } from '../../data/policyAlerts';
import AlertCard from './AlertCard';
import AlertEmptyState from './AlertEmptyState';
import type { AlertFilterState } from '../../utils/alertFilters';
import { PAGE_SIZE } from '../../utils/alertFilters';

interface Props {
  alerts: PolicyAlert[];
  expandedId?: string | null;
  onClearFilters: () => void;
  filters: AlertFilterState;
}

const AlertFeed: React.FC<Props> = ({ alerts, expandedId, onClearFilters }) => {
  const [visible, setVisible] = useState(PAGE_SIZE);

  const displayed = alerts.slice(0, visible);
  const hasMore = visible < alerts.length;

  if (alerts.length === 0) {
    return <AlertEmptyState onClearFilters={onClearFilters} />;
  }

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {displayed.map((alert, i) => (
          <AlertCard
            key={alert.id}
            alert={alert}
            initiallyExpanded={alert.id === expandedId}
            animationDelay={i * 80}
          />
        ))}
      </div>

      {hasMore ? (
        <div style={{ marginTop: 32, textAlign: 'center' }}>
          <button
            onClick={() => setVisible(v => v + PAGE_SIZE)}
            style={{
              padding: '12px 32px',
              borderRadius: 12,
              background: 'transparent',
              border: '1px solid var(--border-primary)',
              color: 'var(--accent-green)',
              fontSize: 14,
              fontWeight: 600,
              fontFamily: 'var(--font-body)',
              cursor: 'pointer',
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--border-hover)';
              e.currentTarget.style.background = 'var(--bg-tertiary)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border-primary)';
              e.currentTarget.style.background = 'transparent';
            }}
          >
            Load More Alerts
          </button>
        </div>
      ) : (
        <p style={{
          marginTop: 32,
          textAlign: 'center',
          fontFamily: 'var(--font-body)',
          fontSize: 13,
          color: 'var(--text-muted)',
        }}>
          You're all caught up.
        </p>
      )}
    </div>
  );
};

export default AlertFeed;
