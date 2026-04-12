/**
 * SabbiRoc Utility Functions
 * Pure helper functions for text processing, validation, and formatting
 */

import { BorrowerStatus, HARDSHIP_KEYWORDS } from './constants';

/**
 * Normalize text for comparison
 * Removes punctuation, converts to lowercase, and normalizes whitespace
 */
export const normalize = (s: string): string =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^\w\s/]/g, '')
    .replace(/\s+/g, ' ');

/**
 * Format timestamp for display
 */
export const formatTime = (date: Date): string =>
  date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

/**
 * Get random item from array
 */
export const getRandom = <T>(arr: readonly T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];

/**
 * Check if text looks like a packet list
 * (contains commas or multiple lines)
 */
export const looksLikePacketList = (text: string): boolean => {
  return text.includes(',') || text.split('\n').length > 2;
};

/**
 * Check if status requires high scrutiny
 */
export const isHighScrutinyStatus = (status: BorrowerStatus): boolean => {
  return [
    '90 plus days past due',
    'Charged off',
    'Treasury cross servicing'
  ].includes(status);
};

/**
 * Check if status requires path verification
 */
export const requiresPathVerification = (status: BorrowerStatus): boolean => {
  return status === 'Treasury cross servicing' || status === 'Charged off';
};

/**
 * Check if input contains hardship context
 */
export const containsHardshipContext = (input: string): boolean => {
  const normalized = normalize(input);
  return HARDSHIP_KEYWORDS.some(keyword => normalized.includes(keyword));
};

/**
 * Check if business appears closed based on text
 */
export const appearsBusinessClosed = (text: string): boolean => {
  const normalized = normalize(text);
  return (
    normalized.includes('closed') ||
    normalized.includes('dissolved') ||
    normalized.includes('permanently closed')
  );
};

/**
 * Check if text contains closure documents
 */
export const hasClosureDocs = (text: string): boolean => {
  const normalized = normalize(text);
  return (
    normalized.includes('dissolution') ||
    normalized.includes('final return') ||
    normalized.includes('wind down')
  );
};

/**
 * Validate loan number format (basic validation)
 */
export const isValidLoanNumber = (loanNumber: string): boolean => {
  // Basic check: 10 digits
  return /^\d{10}$/.test(loanNumber.replace(/\s/g, ''));
};

/**
 * Sanitize text for display (basic XSS protection)
 */
export const sanitizeText = (text: string): string => {
  return text
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

/**
 * Truncate text with ellipsis
 */
export const truncate = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + '...';
};

/**
 * Check if command is a valid slash command
 */
export const isSlashCommand = (text: string): boolean => {
  return normalize(text).startsWith('/');
};

/**
 * Extract command name from slash command
 */
export const extractCommand = (text: string): string => {
  const normalized = normalize(text);
  const match = normalized.match(/^\/(\w+)/);
  return match ? match[1] : '';
};

/**
 * Build normalized knowledge base map
 */
export const buildNormalizedKB = (
  kb: Record<string, string>
): Map<string, string> => {
  const map = new Map<string, string>();
  for (const [key, value] of Object.entries(kb)) {
    map.set(normalize(key), value);
  }
  return map;
};

/**
 * Calculate quality label from score
 */
export const getQualityLabel = (
  score: number
): 'Early draft' | 'Draft' | 'Decent' | 'Strong' | 'Ready' => {
  if (score < 40) return 'Early draft';
  if (score < 50) return 'Draft';
  if (score < 70) return 'Decent';
  if (score < 85) return 'Strong';
  return 'Ready';
};

/**
 * Check if text contains trigger keywords for packet nudges
 */
export const hasTriggerKeywords = (text: string): boolean => {
  const normalized = normalize(text);
  const triggers = [
    'submit',
    'send',
    'checklist',
    'packet',
    'release',
    'collateral',
    'sale',
    'settlement',
    'title report',
    'appraisal'
  ];
  return triggers.some(trigger => normalized.includes(trigger));
};

/**
 * Format currency value
 */
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

/**
 * Parse potential currency string to number
 */
export const parseCurrency = (value: string): number | null => {
  const cleaned = value.replace(/[^0-9.-]/g, '');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? null : parsed;
};

/**
 * Get current date in YYYY-MM-DD format
 */
export const getCurrentDate = (): string => {
  const now = new Date();
  return now.toISOString().split('T')[0];
};

/**
 * Validate wizard answers completeness
 */
export const validateWizardAnswers = (
  answers: Record<string, string>,
  requiredFields: string[]
): { isValid: boolean; missingFields: string[] } => {
  const missingFields = requiredFields.filter(
    field => !answers[field] || answers[field].trim() === ''
  );
  return {
    isValid: missingFields.length === 0,
    missingFields
  };
};

/**
 * Deep clone object (simple version for state)
 */
export const deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Debounce function for performance optimization
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Throttle function for performance optimization
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean = false;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};