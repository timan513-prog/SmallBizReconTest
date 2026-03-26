import React from 'react';
import { Send, X } from 'lucide-react';
import { UI_CONFIG } from '../constants';

interface InputAreaProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  inputRef: React.RefObject<HTMLTextAreaElement>;
  disabled?: boolean;
  onClose?: () => void;
}

export const InputArea: React.FC<InputAreaProps> = ({
  value,
  onChange,
  onSend,
  onKeyDown,
  inputRef,
  disabled = false,
  onClose
}) => {
  return (
    <div className="border-t border-gray-200 dark:border-dark-border p-4 bg-white dark:bg-dark-bg-secondary transition-colors duration-300">
      <div className="flex gap-2">
        <textarea
          ref={inputRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Ask about collateral release..."
          disabled={disabled}
          className="flex-1 px-3 py-2 border border-gray-300 dark:border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-od-green dark:focus:ring-dark-od-green focus:border-transparent font-inter text-sm bg-white dark:bg-dark-bg-primary text-gray-900 dark:text-dark-text-primary placeholder-gray-500 dark:placeholder-dark-text-muted transition-colors duration-300 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
          rows={1}
          style={{
            minHeight: `${UI_CONFIG.INPUT_MIN_HEIGHT}px`,
            maxHeight: `${UI_CONFIG.INPUT_MAX_HEIGHT}px`
          }}
        />
        <button
          onClick={onSend}
          disabled={!value.trim() || disabled}
          className="bg-od-green dark:bg-dark-od-green hover:bg-dark-olive-drab dark:hover:bg-dark-olive-drab disabled:bg-gray-300 dark:disabled:bg-dark-bg-tertiary disabled:cursor-not-allowed text-white p-2 rounded-lg transition-colors flex items-center justify-center"
          aria-label="Send message"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>

      <div className="flex items-center justify-between mt-2">
        <p className="text-xs text-gray-500 dark:text-dark-text-muted font-inter transition-colors duration-300 flex-1 text-center">
          Sabbi 3.1 is specialized for collateral release questions only
        </p>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-bg-tertiary transition-colors"
            aria-label="Close chat"
            title="Close chat"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};