import React from 'react';
import { Clock } from 'lucide-react';
import { formatAlertDate } from '../../utils/alertHelpers';

interface Props {
  deadline: string;
}

const AlertDeadlineBar: React.FC<Props> = ({ deadline }) => {
  return (
    <div
      role="alert"
      aria-label={`Action deadline: ${formatAlertDate(deadline)}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '8px 14px',
        borderRadius: 8,
        background: 'rgba(217,119,6,0.15)',
        border: '1px solid rgba(217,119,6,0.3)',
        marginTop: 10,
      }}
    >
      <Clock size={14} aria-hidden="true" style={{ color: '#d97706', flexShrink: 0 }} />
      <span style={{
        fontFamily: 'var(--font-body)',
        fontSize: 13,
        fontWeight: 700,
        color: '#d97706',
        letterSpacing: '0.02em',
      }}>
        Action Deadline: {formatAlertDate(deadline)}
      </span>
    </div>
  );
};

export default AlertDeadlineBar;
