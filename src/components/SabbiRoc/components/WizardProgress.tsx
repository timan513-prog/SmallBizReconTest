import React from 'react';
import { Check } from 'lucide-react';

interface WizardProgressProps {
  currentStep: number;
  totalSteps: number;
  isActive: boolean;
}

export const WizardProgress: React.FC<WizardProgressProps> = ({
  currentStep,
  totalSteps,
  isActive
}) => {
  if (!isActive) return null;

  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="p-3 border-b border-gray-200 dark:border-dark-border bg-gradient-to-r from-od-green/5 to-blue-500/5 dark:from-dark-od-green/10 dark:to-blue-500/10">
      <div className="flex items-center justify-between mb-2">
        <div className="text-xs font-semibold text-gray-700 dark:text-dark-text-secondary">
          Packet Wizard Progress
        </div>
        <div className="text-xs text-gray-600 dark:text-dark-text-muted">
          Step {currentStep + 1} of {totalSteps}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-dark-bg-tertiary overflow-hidden">
        <div
          className="h-2 rounded-full bg-gradient-to-r from-od-green to-blue-500 dark:from-dark-od-green dark:to-blue-400 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Step Indicators */}
      <div className="mt-2 flex items-center justify-between">
        {Array.from({ length: totalSteps }, (_, i) => (
          <div
            key={i}
            className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold transition-all ${
              i < currentStep
                ? 'bg-od-green dark:bg-dark-od-green text-white'
                : i === currentStep
                ? 'bg-blue-500 dark:bg-blue-400 text-white ring-2 ring-blue-300 dark:ring-blue-600'
                : 'bg-gray-200 dark:bg-dark-bg-tertiary text-gray-500 dark:text-dark-text-muted'
            }`}
          >
            {i < currentStep ? <Check className="w-3 h-3" /> : i + 1}
          </div>
        ))}
      </div>
    </div>
  );
};