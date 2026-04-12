import React from 'react';
import type { AlertCategory } from '../../data/policyAlerts';
import { categoryLabel, categoryColors } from '../../utils/alertHelpers';

interface Props {
  category: AlertCategory;
}

const AlertCategoryTag: React.FC<Props> = ({ category }) => {
  const colors = categoryColors(category);
  const label = categoryLabel(category);

  return (
    <span
      style={{
        display: 'inline-block',
        padding: '3px 8px',
        borderRadius: 100,
        background: colors.bg,
        color: colors.text,
        fontSize: 9,
        fontFamily: "'JetBrains Mono', monospace",
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </span>
  );
};

export default AlertCategoryTag;
