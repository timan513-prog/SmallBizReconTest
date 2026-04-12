import React from 'react';
import { Bot, FileText, Search, Sparkles } from 'lucide-react';

export type LoadingType = 'typing' | 'generating' | 'analyzing' | 'processing';

interface LoadingIndicatorProps {
  type?: LoadingType;
  message?: string;
}

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  type = 'typing',
  message
}) => {
  const getIcon = () => {
    switch (type) {
      case 'generating':
        return <FileText className="w-4 h-4" />;
      case 'analyzing':
        return <Search className="w-4 h-4" />;
      case 'processing':
        return <Sparkles className="w-4 h-4" />;
      default:
        return <Bot className="w-4 h-4" />;
    }
  };

  const getDefaultMessage = () => {
    switch (type) {
      case 'generating':
        return 'Generating document...';
      case 'analyzing':
        return 'Analyzing packet...';
      case 'processing':
        return 'Processing...';
      default:
        return 'Sabbi is typing...';
    }
  };

  return (
    <div className="flex justify-start">
      <div className="flex items-start gap-2 max-w-[85%]">
        {/* Avatar */}
        <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-gray-600 dark:bg-dark-bg-tertiary transition-colors duration-300">
          {getIcon()}
        </div>

        {/* Loading Bubble */}
        <div className="rounded-lg p-3 bg-white dark:bg-dark-bg-secondary border border-gray-200 dark:border-dark-border transition-colors duration-300">
          <div className="flex flex-col gap-2">
            {/* Animated Dots */}
            <div className="flex gap-1">
              <div
                className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"
                style={{ animationDelay: '0ms' }}
              />
              <div
                className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"
                style={{ animationDelay: '150ms' }}
              />
              <div
                className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"
                style={{ animationDelay: '300ms' }}
              />
            </div>

            {/* Optional Message */}
            {(message || type !== 'typing') && (
              <p className="text-xs text-gray-600 dark:text-dark-text-muted transition-colors duration-300">
                {message || getDefaultMessage()}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Inline loading indicator for buttons
 */
interface InlineLoadingProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

export const InlineLoading: React.FC<InlineLoadingProps> = ({
  size = 'md',
  color = 'currentColor'
}) => {
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  return (
    <svg
      className={`animate-spin ${sizeClasses[size]}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke={color}
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill={color}
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
};

/**
 * Progress bar loading indicator
 */
interface ProgressLoadingProps {
  progress: number; // 0-100
  message?: string;
  showPercentage?: boolean;
}

export const ProgressLoading: React.FC<ProgressLoadingProps> = ({
  progress,
  message,
  showPercentage = true
}) => {
  const clampedProgress = Math.max(0, Math.min(100, progress));

  return (
    <div className="w-full">
      {(message || showPercentage) && (
        <div className="flex items-center justify-between mb-2">
          {message && (
            <p className="text-xs text-gray-600 dark:text-dark-text-muted">
              {message}
            </p>
          )}
          {showPercentage && (
            <span className="text-xs font-semibold text-gray-700 dark:text-dark-text-secondary">
              {Math.round(clampedProgress)}%
            </span>
          )}
        </div>
      )}
      <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-dark-bg-tertiary overflow-hidden">
        <div
          className="h-2 rounded-full bg-od-green dark:bg-dark-od-green transition-all duration-300"
          style={{ width: `${clampedProgress}%` }}
        />
      </div>
    </div>
  );
};

/**
 * Skeleton loader for content
 */
interface SkeletonLoaderProps {
  lines?: number;
  className?: string;
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  lines = 3,
  className = ''
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-4 bg-gray-200 dark:bg-dark-bg-tertiary rounded animate-pulse"
          style={{
            width: `${Math.random() * 30 + 70}%`
          }}
        />
      ))}
    </div>
  );
};