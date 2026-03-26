import React from 'react';
import { Gauge, Sparkles, Info, AlertTriangle, Circle } from 'lucide-react';
import { PacketQuality } from '../packetQuality';
import { formatTime } from '../utils';
import { UI_CONFIG } from '../constants';

interface PacketQualityMeterProps {
  quality: PacketQuality;
  onQuickScan: () => void;
  onFullScan: () => void;
  onStartWizard: () => void;
  onGenerateCover: () => void;
  onGenerateSubject: () => void;
}

export const PacketQualityMeter: React.FC<PacketQualityMeterProps> = ({
  quality,
  onQuickScan,
  onFullScan,
  onStartWizard,
  onGenerateCover,
  onGenerateSubject
}) => {
  return (
    <div className="rounded-xl border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-bg-primary p-3">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Gauge className="w-4 h-4 text-od-green dark:text-dark-od-green" />
          <div className="text-sm font-semibold text-gray-800 dark:text-dark-text-primary">
            Packet Quality Meter
          </div>
          <Sparkles className="w-4 h-4 text-gray-400" />
          <button
            type="button"
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            title="Scores your packet completeness (0-100) based on required documents. Use /packetcheck with your file list to scan."
          >
            <Info className="w-3.5 h-3.5" />
          </button>
        </div>

        <button
          type="button"
          onClick={onQuickScan}
          className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-bg-secondary hover:bg-gray-100 dark:hover:bg-dark-bg-tertiary transition-colors"
          title="Runs a quick scan using wizard answers or your last packet list"
        >
          Quick scan
        </button>
      </div>

      {/* Score Display */}
      <div className="mt-2 flex items-center justify-between text-xs text-gray-600 dark:text-dark-text-muted">
        <span>
          Score: {quality.score}, Level: {quality.label}
        </span>
        {quality.lastCheckedAt ? (
          <span>Last check: {formatTime(quality.lastCheckedAt)}</span>
        ) : (
          <span>Not checked yet</span>
        )}
      </div>

      {/* Progress Bar */}
      <div className="mt-2 h-2 w-full rounded-full bg-gray-200 dark:bg-dark-bg-tertiary overflow-hidden">
        <div
          className="h-2 rounded-full bg-od-green dark:bg-dark-od-green transition-all duration-500"
          style={{ width: `${quality.score}%` }}
        />
      </div>

      {/* Missing Items */}
      {quality.missing.length > 0 && (
        <div className="mt-3 text-xs text-gray-700 dark:text-dark-text-secondary">
          <div className="flex items-center gap-2 font-semibold">
            <AlertTriangle className="w-4 h-4" />
            Missing items
          </div>
          <ul className="mt-1 space-y-1">
            {quality.missing.slice(0, UI_CONFIG.MAX_MISSING_ITEMS_DISPLAY).map(item => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-[2px]">
                  <Circle className="w-3 h-3 opacity-50" />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          {quality.missing.length > UI_CONFIG.MAX_MISSING_ITEMS_DISPLAY && (
            <div className="mt-1 opacity-80">
              More missing items, run /packetcheck with your full packet list.
            </div>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={onFullScan}
          className="text-xs px-3 py-1.5 rounded-lg bg-od-green/10 dark:bg-dark-od-green/20 text-od-green dark:text-dark-od-green hover:bg-od-green/20 dark:hover:bg-dark-od-green/30 transition-colors"
        >
          Run full checklist scan
        </button>

        <button
          type="button"
          onClick={onStartWizard}
          className="text-xs px-3 py-1.5 rounded-lg bg-blue-500/10 dark:bg-blue-500/20 text-blue-500 dark:text-blue-400 hover:bg-blue-500/20 dark:hover:bg-blue-500/30 transition-colors"
        >
          Start wizard
        </button>

        <button
          type="button"
          onClick={onGenerateCover}
          className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-bg-secondary hover:bg-gray-100 dark:hover:bg-dark-bg-tertiary transition-colors"
        >
          Generate cover page
        </button>

        <button
          type="button"
          onClick={onGenerateSubject}
          className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-bg-secondary hover:bg-gray-100 dark:hover:bg-dark-bg-tertiary transition-colors"
        >
          Generate subject line
        </button>
      </div>
    </div>
  );
};