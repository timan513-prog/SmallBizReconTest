import type { PolicyAlert, AlertSeverity, AlertCategory } from '../data/policyAlerts';

export interface AlertFilterState {
  severity: AlertSeverity | 'all';
  category: AlertCategory | 'all';
  search: string;
}

export function filterAlerts(alerts: PolicyAlert[], filters: AlertFilterState): PolicyAlert[] {
  const q = filters.search.trim().toLowerCase();
  return alerts
    .filter(a => {
      if (filters.severity !== 'all' && a.severity !== filters.severity) return false;
      if (filters.category !== 'all' && a.category !== filters.category) return false;
      if (q) {
        const haystack = [a.title, a.summary, ...(a.tags ?? [])].join(' ').toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return b.date.localeCompare(a.date);
    });
}

export const DEFAULT_FILTERS: AlertFilterState = {
  severity: 'all',
  category: 'all',
  search: '',
};

export const PAGE_SIZE = 10;
