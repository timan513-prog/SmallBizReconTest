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
        transform: visible ? 'translateY(0)' : 'translateY(18px)',
        transition: 'opacity 0.35s ease, transform 0.35s ease',
      }}
    >
      {/* Question label */}
      <div style={{ marginBottom: 28 }}>
        <span style={{
          display: 'inline-block',
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.1em',
          color: '#c8a84e',
          fontFamily: "'JetBrains Mono', monospace",
          marginBottom: 12,
        }}>
          QUESTION {questionNumber}
        </span>
        <h2 style={{
          fontFamily: "'Instrument Serif', Georgia, serif",
          fontSize: 'clamp(1.3rem, 3vw, 1.75rem)',
          fontWeight: 400,
          color: '#e8ede2',
          lineHeight: 1.35,
          letterSpacing: '-0.01em',
          margin: 0,
        }}>
          {label}
        </h2>
        {multiSelect && (
          <p style={{
            fontSize: 13,
            color: 'rgba(232,237,226,0.45)',
            fontFamily: "'DM Sans', system-ui, sans-serif",
            marginTop: 8,
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
          gap: 10,
          marginBottom: 32,
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
                padding: '14px 18px',
                borderRadius: 12,
                background: sel
                  ? 'rgba(200,168,78,0.12)'
                  : 'rgba(255,255,255,0.04)',
                border: sel
                  ? '1px solid rgba(200,168,78,0.4)'
                  : '1px solid rgba(255,255,255,0.08)',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.18s ease',
                outline: 'none',
              }}
              onFocus={(e) => {
                e.currentTarget.style.boxShadow = '0 0 0 2px rgba(200,168,78,0.35)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.boxShadow = 'none';
              }}
              onMouseEnter={(e) => {
                if (!sel) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.07)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)';
                }
              }}
              onMouseLeave={(e) => {
                if (!sel) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                }
              }}
            >
              <div style={{
                width: 22,
                height: 22,
                borderRadius: multiSelect ? 6 : '50%',
                border: sel
                  ? '2px solid #c8a84e'
                  : '2px solid rgba(255,255,255,0.2)',
                background: sel ? '#c8a84e' : 'transparent',
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.18s ease',
              }}>
                {sel && <Check size={13} color="#1a1e14" strokeWidth={3} />}
              </div>
              <span style={{
                fontSize: 15,
                color: sel ? '#e8c870' : 'rgba(232,237,226,0.75)',
                fontFamily: "'DM Sans', system-ui, sans-serif",
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
              padding: '12px 22px',
              borderRadius: 10,
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'rgba(232,237,226,0.55)',
              fontSize: 14,
              fontWeight: 600,
              fontFamily: "'DM Sans', system-ui, sans-serif",
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
              e.currentTarget.style.color = 'rgba(232,237,226,0.8)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
              e.currentTarget.style.color = 'rgba(232,237,226,0.55)';
            }}
          >
            ← Back
          </button>
        ) : (
          <div />
        )}

        <button
          onClick={onNext}
          disabled={!hasSelection}
          style={{
            padding: '13px 28px',
            borderRadius: 10,
            background: hasSelection
              ? 'linear-gradient(135deg, #c8a84e, #e8c870)'
              : 'rgba(255,255,255,0.06)',
            border: hasSelection
              ? '1px solid rgba(200,168,78,0.5)'
              : '1px solid rgba(255,255,255,0.08)',
            color: hasSelection ? '#1a1e14' : 'rgba(232,237,226,0.3)',
            fontSize: 14,
            fontWeight: 700,
            fontFamily: "'DM Sans', system-ui, sans-serif",
            cursor: hasSelection ? 'pointer' : 'not-allowed',
            transition: 'all 0.2s ease',
            boxShadow: hasSelection ? '0 4px 20px rgba(200,168,78,0.25)' : 'none',
          }}
          onMouseEnter={(e) => {
            if (hasSelection) {
              e.currentTarget.style.boxShadow = '0 6px 28px rgba(200,168,78,0.4)';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = hasSelection
              ? '0 4px 20px rgba(200,168,78,0.25)'
              : 'none';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          Continue →
        </button>
      </div>
    </div>
  );
}
