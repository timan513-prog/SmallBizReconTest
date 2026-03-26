import React from 'react';
import { CheckCircle2, ShieldAlert } from 'lucide-react';
import { BorrowerStatus, BORROWER_STATUS_OPTIONS } from '../constants';

interface StatusSelectorProps {
  status: BorrowerStatus;
  hybridMode: boolean;
  onStatusChange: (status: BorrowerStatus) => void;
  onHybridModeToggle: () => void;
}

export const StatusSelector: React.FC<StatusSelectorProps> = ({
  status,
  hybridMode,
  onStatusChange,
  onHybridModeToggle
}) => {
  return (
    <div className="p-4 border-b border-gray-200 dark:border-dark-border bg-white dark:bg-dark-bg-secondary transition-colors duration-300">
      <div className="flex flex-col gap-3">
        {/* Status Selector */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-800 dark:text-dark-text-primary">
            <CheckCircle2 className="w-4 h-4 text-od-green dark:text-dark-od-green" />
            Status selector
          </div>

          <select
            value={status}
            onChange={(e) => onStatusChange(e.target.value as BorrowerStatus)}
            className="w-[240px] max-w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-bg-primary text-gray-800 dark:text-dark-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-od-green dark:focus:ring-dark-od-green transition-colors"
          >
            {BORROWER_STATUS_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {/* Hybrid Mode Toggle */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-dark-text-muted">
            <ShieldAlert className="w-4 h-4" />
            Toolkit scoped, Release of Collateral only
          </div>

          <label className="flex items-center gap-2 text-xs text-gray-700 dark:text-dark-text-secondary cursor-pointer">
            <span className="whitespace-nowrap">Hybrid mode</span>
            <button
              type="button"
              onClick={onHybridModeToggle}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                hybridMode
                  ? 'bg-od-green dark:bg-dark-od-green'
                  : 'bg-gray-300 dark:bg-dark-bg-tertiary'
              }`}
              aria-label="Toggle hybrid mode"
              aria-checked={hybridMode}
              role="switch"
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                  hybridMode ? 'translate-x-5' : 'translate-x-1'
                }`}
              />
            </button>
          </label>
        </div>
      </div>
    </div>
  );
};