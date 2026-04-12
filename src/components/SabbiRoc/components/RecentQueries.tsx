import React from 'react';
import { truncate } from '../utils';

interface RecentQueriesProps {
  queries: string[];
  onQueryClick: (query: string) => void;
}

export const RecentQueries: React.FC<RecentQueriesProps> = ({
  queries,
  onQueryClick
}) => {
  if (queries.length === 0) return null;

  return (
    <div className="px-4 py-2 border-t border-gray-200 dark:border-dark-border bg-white dark:bg-dark-bg-secondary transition-colors duration-300">
      <p className="text-xs text-gray-500 dark:text-dark-text-muted mb-1 transition-colors duration-300">
        Recent questions
      </p>
      <div className="flex flex-wrap gap-2">
        {queries.map((query, index) => (
          <button
            key={index}
            onClick={() => onQueryClick(query)}
            className="text-xs bg-gray-100 dark:bg-dark-bg-tertiary text-gray-600 dark:text-dark-text-muted px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-dark-border transition-colors duration-300 truncate max-w-[180px]"
            title={query}
          >
            {truncate(query, 30)}
          </button>
        ))}
      </div>
    </div>
  );
};