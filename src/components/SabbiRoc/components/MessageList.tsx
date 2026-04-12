import React from 'react';
import { User, Bot, ClipboardCopy } from 'lucide-react';
import { formatTime } from '../utils';

export interface Message {
  text: string;
  sender: 'user' | 'sabbi' | 'system';
  timestamp: Date;
}

interface MessageListProps {
  messages: Message[];
  isProcessing?: boolean;
  onCopy: (text: string) => void;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

export const MessageList: React.FC<MessageListProps> = ({
  messages,
  isProcessing = false,
  onCopy,
  messagesEndRef
}) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-dark-bg-primary transition-colors duration-300">
      {messages.map((message, index) => {
        const isUser = message.sender === 'user';
        const isSystem = message.sender === 'system';

        return (
          <div key={index} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`flex items-start gap-2 max-w-[85%] ${
                isUser ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                  isUser
                    ? 'bg-od-green dark:bg-dark-od-green'
                    : isSystem
                    ? 'bg-gray-300 dark:bg-dark-bg-tertiary'
                    : 'bg-gray-600 dark:bg-dark-bg-tertiary'
                }`}
              >
                {isUser ? (
                  <User className="w-4 h-4 text-white" />
                ) : (
                  <Bot className="w-4 h-4 text-white" />
                )}
              </div>

              {/* Message Bubble */}
              <div
                className={`rounded-lg p-3 transition-colors duration-300 relative ${
                  isUser
                    ? 'bg-od-green dark:bg-dark-od-green text-white'
                    : isSystem
                    ? 'bg-white/70 dark:bg-dark-bg-secondary border border-gray-200 dark:border-dark-border text-gray-700 dark:text-dark-text-secondary'
                    : 'bg-white dark:bg-dark-bg-secondary border border-gray-200 dark:border-dark-border text-gray-800 dark:text-dark-text-primary'
                }`}
              >
                <p className="text-sm font-inter leading-relaxed whitespace-pre-line">
                  {message.text}
                </p>

                <div className="flex items-center justify-between gap-2 mt-2">
                  <p
                    className={`text-xs transition-colors duration-300 ${
                      isUser
                        ? 'text-green-100 dark:text-green-200'
                        : 'text-gray-500 dark:text-dark-text-muted'
                    }`}
                  >
                    {formatTime(message.timestamp)}
                  </p>

                  {!isUser && !isSystem && (
                    <button
                      onClick={() => onCopy(message.text)}
                      className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md border border-gray-200 dark:border-dark-border bg-white/70 dark:bg-dark-bg-primary hover:bg-white dark:hover:bg-dark-bg-secondary transition-colors"
                      title="Copy"
                    >
                      <ClipboardCopy className="w-3.5 h-3.5" />
                      Copy
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Loading Indicator */}
      {isProcessing && (
        <div className="flex justify-start">
          <div className="flex items-start gap-2 max-w-[85%]">
            <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-gray-600 dark:bg-dark-bg-tertiary">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="rounded-lg p-3 bg-white dark:bg-dark-bg-secondary border border-gray-200 dark:border-dark-border">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
};