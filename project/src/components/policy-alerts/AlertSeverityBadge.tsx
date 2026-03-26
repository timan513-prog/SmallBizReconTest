import React from 'react';
import type { AlertSeverity } from '../../data/policyAlerts';
import { severityLabel, severityColors } from '../../utils/alertHelpers';

interface Props {
  severity: AlertSeverity;
  size?: 'sm' | 'md';
}

const AlertSeverityBadge: React.FC<Props> = ({ severity, size = 'md' }) => {
  const colors = severityColors(severity);
  const label = severityLabel(severity);
  const fontSize = size === 'sm' ? 9 : 10;
  const padding = size === 'sm' ? '3px 8px' : '4px 10px';

  return (
    <span
      role="status"
      aria-label={`Severity: ${label}`}
      style={{
        display: 'inline-block',
        padding,
        borderRadius: 100,
        background: colors.bg,
        border: `1px solid ${colors.border}`,
        color: colors.text,
        fontSize,
        fontFamily: "'JetBrains Mono', monospace",
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </span>
  );
};

export default AlertSeverityBadge;
