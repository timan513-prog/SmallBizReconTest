import React from 'react';
import { Search, Filter, RefreshCw } from 'lucide-react';
import type { AlertFilterState } from '../../utils/alertFilters';
import type { AlertSeverity, AlertCategory } from '../../data/policyAlerts';

interface Props {
  filters: AlertFilterState;
  onChange: (f: AlertFilterState) => void;
  resultCount: number;
}

const SEVERITIES: { value: AlertSeverity | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'critical', label: 'Critical' },
  { value: 'action-required', label: 'Action Required' },
  { value: 'informational', label: 'Informational' },
  { value: 'update', label: 'Update' },
];

const CATEGORIES: { value: AlertCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'All Categories' },
  { value: 'treasury', label: 'Treasury' },
  { value: 'sba-policy', label: 'SBA Policy' },
  { value: 'covid-eidl', label: 'COVID EIDL' },
  { value: 'servicing', label: 'Servicing' },
  { value: 'legislative', label: 'Legislative' },
];

const AlertFilterBar: React.FC<Props> = ({ filters, onChange, resultCount }) => {
  const isFiltered = filters.severity !== 'all' || filters.category !== 'all' || filters.search !== '';

  const reset = () => onChange({ severity: 'all', category: 'all', search: '' });

  return (
    <div
      style={{
        background: 'var(--bg-card)',
        backdropFilter: 'var(--glass-blur)',
        WebkitBackdropFilter: 'var(--glass-blur)',
        border: '1px solid var(--border-primary)',
        borderRadius: 20,
        padding: 24,
        marginBottom: 28,
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        flexWrap: 'wrap',
        gap: 12,
      }}>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 20,
          fontWeight: 400,
          color: 'var(--text-primary)',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          margin: 0,
        }}>
          <Filter size={18} aria-hidden="true" />
          Filter Alerts
        </h2>
        {isFiltered && (
          <button
            onClick={reset}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '7px 14px',
              background: 'transparent',
              border: '1px solid var(--border-primary)',
              borderRadius: 10,
              color: 'var(--accent-green)',
              fontSize: 13,
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
            <RefreshCw size={13} aria-hidden="true" />
            Reset Filters
          </button>
        )}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 16,
      }}>
        {/* Severity */}
        <div>
          <label style={{
            display: 'block',
            fontSize: 13,
            fontWeight: 600,
            color: 'var(--text-secondary)',
            marginBottom: 8,
            fontFamily: 'var(--font-body)',
          }}>
            Severity
          </label>
          <div
            role="radiogroup"
            aria-label="Filter by severity"
            style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}
          >
            {SEVERITIES.map(s => {
              const active = filters.severity === s.value;
              return (
                <button
                  key={s.value}
                  role="radio"
                  aria-checked={active}
                  onClick={() => onChange({ ...filters, severity: s.value })}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '5px 12px',
                    borderRadius: 100,
                    fontSize: 12,
                    fontWeight: 600,
                    fontFamily: 'var(--font-body)',
                    cursor: 'pointer',
                    border: active ? '1px solid var(--border-gold)' : '1px solid var(--border-primary)',
                    background: active ? 'rgba(200,168,78,0.12)' : 'var(--bg-tertiary)',
                    color: active ? 'var(--accent-gold)' : 'var(--text-secondary)',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {s.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Category */}
        <div>
          <label htmlFor="alert-category-select" style={{
            display: 'block',
            fontSize: 13,
            fontWeight: 600,
            color: 'var(--text-secondary)',
            marginBottom: 8,
            fontFamily: 'var(--font-body)',
          }}>
            Category
          </label>
          <select
            id="alert-category-select"
            value={filters.category}
            onChange={e => onChange({ ...filters, category: e.target.value as AlertCategory | 'all' })}
            aria-label="Filter by category"
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: 10,
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-primary)',
              color: 'var(--text-primary)',
              fontSize: 14,
              fontFamily: 'var(--font-body)',
              cursor: 'pointer',
              outline: 'none',
              transition: 'all 0.25s ease',
            }}
            onFocus={e => (e.target.style.borderColor = 'var(--border-hover)')}
            onBlur={e => (e.target.style.borderColor = 'var(--border-primary)')}
          >
            {CATEGORIES.map(c => (
              <option key={c.value} value={c.value} style={{ background: '#181c14' }}>
                {c.label}
              </option>
            ))}
          </select>
        </div>

        {/* Search */}
        <div>
          <label htmlFor="alert-search" style={{
            display: 'block',
            fontSize: 13,
            fontWeight: 600,
            color: 'var(--text-secondary)',
            marginBottom: 8,
            fontFamily: 'var(--font-body)',
          }}>
            Search Alerts
          </label>
          <div style={{ position: 'relative' }}>
            <Search
              size={15}
              aria-hidden="true"
              style={{
                position: 'absolute',
                left: 12,
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-muted)',
                pointerEvents: 'none',
              }}
            />
            <input
              id="alert-search"
              type="search"
              value={filters.search}
              onChange={e => onChange({ ...filters, search: e.target.value })}
              placeholder="Search by keyword..."
              style={{
                width: '100%',
                paddingLeft: 36,
                paddingRight: 12,
                paddingTop: 10,
                paddingBottom: 10,
                borderRadius: 10,
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-primary)',
                color: 'var(--text-primary)',
                fontSize: 14,
                fontFamily: 'var(--font-body)',
                outline: 'none',
                transition: 'all 0.25s ease',
              }}
              onFocus={e => (e.target.style.borderColor = 'var(--border-hover)')}
              onBlur={e => (e.target.style.borderColor = 'var(--border-primary)')}
            />
          </div>
        </div>
      </div>

      <div
        aria-live="polite"
        aria-atomic="true"
        style={{
          marginTop: 16,
          paddingTop: 16,
          borderTop: '1px solid var(--border-primary)',
          fontSize: 13,
          color: 'var(--text-muted)',
          fontFamily: 'var(--font-body)',
        }}
      >
        Showing {resultCount} {resultCount === 1 ? 'alert' : 'alerts'}
        {filters.severity !== 'all' && ` · Severity: ${filters.severity}`}
        {filters.category !== 'all' && ` · Category: ${filters.category}`}
        {filters.search && ` · Matching "${filters.search}"`}
      </div>
    </div>
  );
};

export default AlertFilterBar;
