import React from 'react';
import { Sparkles } from 'lucide-react';

interface StarterQuestionsProps {
  show: boolean;
  onQuestionClick: (question: string) => void;
}

const QUESTIONS: string[] = [
  'What documents are required for a COVID EIDL Release of Collateral request?',
  'Can you generate a borrower request letter for Release of Collateral?',
  'What should my email subject line be for a Release of Collateral submission?',
  'How should I package and order my documents before sending to SBA?',
  'Can you quick-scan my packet list and tell me what I’m missing?'
];

export const StarterQuestions: React.FC<StarterQuestionsProps> = ({ show, onQuestionClick }) => {
  if (!show) return null;

  return (
    <div className="px-4 pb-4 bg-gray-50 dark:bg-dark-bg-primary transition-colors duration-300">
      <div className="rounded-2xl border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-bg-secondary p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-full bg-od-green dark:bg-dark-od-green flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900 dark:text-dark-text-primary">
              Starter questions
            </p>
            <p className="text-xs text-gray-600 dark:text-dark-text-muted">
              Tap one to get moving fast
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {QUESTIONS.map((q) => (
            <button
              key={q}
              onClick={() => onQuestionClick(q)}
              className="text-left text-sm px-3 py-2 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-bg-primary hover:bg-gray-100 dark:hover:bg-dark-bg-tertiary transition-colors text-gray-800 dark:text-dark-text-primary"
            >
              {q}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};