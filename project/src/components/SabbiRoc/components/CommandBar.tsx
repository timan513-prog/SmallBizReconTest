import React from 'react';

interface CommandBarProps {
  onCommandClick: (command: string) => void;
}

const COMMANDS = [
  { label: 'Packet Wizard', value: '/packetwizard' },
  { label: 'Quick Scan', value: '/packetcheck' },
  { label: 'Stop Wizard', value: '/stopwizard' },
  { label: 'Generate Cover Page', value: '/gencover' },
  { label: 'Generate Email Subject', value: '/gensubject' },
  { label: 'Generate Email Template', value: '/genemail' },
  { label: 'Generate Borrower Letter', value: '/genletter' },
];

export const CommandBar: React.FC<CommandBarProps> = ({ onCommandClick }) => {
  return (
    <div className="px-4 pb-3 bg-gray-50 dark:bg-dark-bg-primary transition-colors duration-300">
      <div className="flex flex-wrap gap-2">
        {COMMANDS.map((cmd) => (
          <button
            key={cmd.value}
            onClick={() => onCommandClick(cmd.value)}
            className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-bg-secondary text-gray-800 dark:text-dark-text-primary hover:bg-gray-100 dark:hover:bg-dark-bg-tertiary transition-colors"
          >
            {cmd.label}
          </button>
        ))}
      </div>
    </div>
  );
};
