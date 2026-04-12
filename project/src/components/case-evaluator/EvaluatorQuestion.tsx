import { useState, useEffect } from 'react';
import { Check } from 'lucide-react';

interface Option {
  value: string;
  label: string;
}

interface EvaluatorQuestionProps {
  questionNumber: number;
  label: string;
  options: Option[];
  multiSelect?: boolean;
  selected: string | string[] | null;
  onChange: (value: string | string[]) => void;
  onNext: () => void;
  onBack?: () => void;
  isFirst?: boolean;
}

export default function EvaluatorQuestion({
  questionNumber,
  label,
  options,
  multiSelect = false,
  selected,
  onChange,
  onNext,
  onBack,
  isFirst = false,
}: EvaluatorQuestionProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 40);
    return () => clearTimeout(t);
  }, [questionNumber]);

  const isSelected = (value: string): boolean => {
    if (multiSelect && Array.isArray(selected)) return selected.includes(value);
    return selected === value;
  };

  const handleSelect = (value: string) => {
    if (multiSelect) {
      const current = Array.isArray(selected) ? selected : [];
      if (value === 'none') {
        onChange(current.includes('none') ? [] : ['none']);
        return;
      }
      const withoutNone = current.filter(v => v !== 'none');
      const next = withoutNone.includes(value)
        ? withoutNone.filter(v => v !== value)
        : [...withoutNone, value];
      onChange(next);
    } else {
      onChange(value);
    }
  };

  const hasSelection = multiSelect
    ? Array.isArray(selected) && selected.length > 0
    : selected !== null;

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(12px)',
        transition: 'opacity 0.3s ease, transform 0.3s ease',
      }}
    >
      {/* Question label */}
      <div style={{ marginBottom: 24 }}>
        <span style={{
          display: 'inline-block',
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          color: 'var(--color-gold)',
          fontFamily: 'var(--font-body)',
          marginBottom: 10,
        }}>
          Question {questionNumber}
        </span>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
          fontWeight: 400,
          color: 'var(--color-text)',
          lineHeight: 1.3,
          margin: 0,
        }}>
          {label}
        </h2>
        {multiSelect && (
          <p style={{
            fontSize: 13,
            color: 'var(--color-text-muted)',
            fontFamily: 'var(--font-body)',
            marginTop: 6,
          }}>
            Select all that apply
          </p>
        )}
      </div>

      {/* Options */}
      <div
        role={multiSelect ? 'group' : 'radiogroup'}
        aria-label={label}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          marginBottom: 28,
        }}
      >
        {options.map(opt => {
          const sel = isSelected(opt.value);
          return (
            <button
              key={opt.value}
              role={multiSelect ? 'checkbox' : 'radio'}
              aria-checked={sel}
              onClick={() => handleSelect(opt.value)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                padding: '13px 16px',
                borderRadius: 10,
                background: sel ? 'rgba(59, 74, 44, 0.06)' : 'white',
                border: sel
                  ? '1.5px solid var(--color-brand-green)'
                  : '1.5px solid var(--color-border)',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s ease',
                outline: 'none',
                fontFamily: 'var(--font-body)',
              }}
            >
              <div style={{
                width: 22,
                height: 22,
                borderRadius: multiSelect ? 6 : '50%',
                border: sel
                  ? '2px solid var(--color-brand-green)'
                  : '2px solid var(--color-border)',
                background: sel ? 'var(--color-brand-green)' : 'transparent',
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.15s ease',
              }}>
                {sel && <Check size={13} color="#FAF9F6" strokeWidth={3} />}
              </div>
              <span style={{
                fontSize: 15,
                color: sel ? 'var(--color-text)' : 'var(--color-text-secondary)',
                fontWeight: sel ? 600 : 400,
                lineHeight: 1.4,
              }}>
                {opt.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Navigation */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
      }}>
        {!isFirst && onBack ? (
          <button
            onClick={onBack}
            style={{
              padding: '11px 20px',
              borderRadius: 8,
              background: 'transparent',
              border: '1.5px solid var(--color-border)',
              color: 'var(--color-text-muted)',
              fontSize: 14,
              fontWeight: 600,
              fontFamily: 'var(--font-body)',
              cursor: 'pointer',
            }}
          >
            &larr; Back
          </button>
        ) : (
          <div />
        )}

        <button
          onClick={onNext}
          disabled={!hasSelection}
          style={{
            padding: '12px 28px',
            borderRadius: 8,
            background: hasSelection ? 'var(--color-brand-green)' : 'var(--color-border-light)',
            border: 'none',
            color: hasSelection ? '#FAF9F6' : 'var(--color-text-muted)',
            fontSize: 14,
            fontWeight: 600,
            fontFamily: 'var(--font-body)',
            cursor: hasSelection ? 'pointer' : 'not-allowed',
          }}
        >
          Continue &rarr;
        </button>
      </div>
    </div>
  );
}
