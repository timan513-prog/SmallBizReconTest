import React from 'react';
import type { PostCategory } from '../../types/intelBoard';

interface Props {
  category: PostCategory;
  size?: 'sm' | 'md';
}

const CATEGORY_STYLES: Record<PostCategory, { bg: string; border: string; text: string; label: string }> = {
  strategy: { bg: 'rgba(200,168,78,0.12)', border: 'rgba(200,168,78,0.25)', text: '#c8a84e', label: 'STRATEGY' },
  'policy-update': { bg: 'rgba(122,156,204,0.12)', border: 'rgba(122,156,204,0.25)', text: '#7a9ccc', label: 'POLICY UPDATE' },
  'case-study': { bg: 'rgba(154,184,122,0.12)', border: 'rgba(154,184,122,0.25)', text: '#9ab87a', label: 'CASE STUDY' },
  community: { bg: 'rgba(180,130,200,0.12)', border: 'rgba(180,130,200,0.25)', text: '#b48ec8', label: 'COMMUNITY' },
  'treasury-intel': { bg: 'rgba(200,80,80,0.12)', border: 'rgba(200,80,80,0.25)', text: '#cc6666', label: 'TREASURY INTEL' },
  'borrower-guide': { bg: 'rgba(80,190,180,0.12)', border: 'rgba(80,190,180,0.25)', text: '#50beb4', label: 'BORROWER GUIDE' },
  announcement: { bg: 'rgba(217,119,6,0.12)', border: 'rgba(217,119,6,0.25)', text: '#d97706', label: 'ANNOUNCEMENT' },
};

const CategoryBadge: React.FC<Props> = ({ category, size = 'sm' }) => {
  const s = CATEGORY_STYLES[category];
  const fs = size === 'sm' ? 10 : 12;
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      padding: size === 'sm' ? '3px 9px' : '5px 12px',
      borderRadius: 100,
      background: s.bg,
      border: `1px solid ${s.border}`,
      color: s.text,
      fontSize: fs,
      fontFamily: "'JetBrains Mono', monospace",
      fontWeight: 700,
      letterSpacing: '0.08em',
      whiteSpace: 'nowrap',
    }}>
      {s.label}
    </span>
  );
};

export default CategoryBadge;
export { CATEGORY_STYLES };
