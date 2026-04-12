/**
 * Packet Quality Evaluation
 * Logic for scoring and evaluating packet completeness
 */

import { BorrowerStatus, DOCUMENT_WEIGHTS } from './constants';
import {
  normalize,
  appearsBusinessClosed,
  hasClosureDocs,
  isHighScrutinyStatus,
  getQualityLabel
} from './utils';

export interface PacketQuality {
  score: number;
  label: 'Early draft' | 'Draft' | 'Decent' | 'Strong' | 'Ready';
  missing: string[];
  notes: string[];
  lastCheckedAt?: Date;
}

interface RequiredSignal {
  label: string;
  test: (s: string) => boolean;
  weight: number;
}

/**
 * Define required document signals with their tests and weights
 */
const getRequiredSignals = (): RequiredSignal[] => [
  {
    label: 'Borrower letter, signed and dated',
    test: s =>
      s.includes('borrower letter') ||
      (s.includes('letter') && s.includes('request')),
    weight: DOCUMENT_WEIGHTS.BORROWER_LETTER
  },
  {
    label: 'SBA Form 2518, signed and dated',
    test: s => s.includes('2518'),
    weight: DOCUMENT_WEIGHTS.FORM_2518
  },
  {
    label: 'UCC lien search, current',
    test: s => s.includes('ucc') && (s.includes('lien search') || s.includes('search')),
    weight: DOCUMENT_WEIGHTS.UCC_SEARCH
  },
  {
    label: 'Proof of insurance, hazard coverage',
    test: s => s.includes('insurance') || s.includes('hazard'),
    weight: DOCUMENT_WEIGHTS.INSURANCE
  },
  {
    label: 'Sale agreement, bill of sale, or settlement statement, if applicable',
    test: s =>
      s.includes('purchase agreement') ||
      s.includes('bill of sale') ||
      s.includes('settlement statement') ||
      s.includes('hud') ||
      s.includes('alta'),
    weight: DOCUMENT_WEIGHTS.SALE_AGREEMENT
  },
  {
    label: 'Title report, if real estate',
    test: s =>
      s.includes('title report') ||
      s.includes('preliminary title') ||
      s.includes('commitment'),
    weight: DOCUMENT_WEIGHTS.TITLE_REPORT
  },
  {
    label: 'Appraisal or valuation, if required',
    test: s => s.includes('appraisal') || s.includes('valuation'),
    weight: DOCUMENT_WEIGHTS.APPRAISAL
  },
  {
    label: 'Payoff letter for senior lien, if applicable',
    test: s => s.includes('payoff') || s.includes('senior lien'),
    weight: DOCUMENT_WEIGHTS.PAYOFF_LETTER
  },
  {
    label: 'Packet is labeled PDFs, single submission method',
    test: s =>
      (s.includes('pdf') || s.includes('labeled')) &&
      (s.includes('email') || s.includes('box') || s.includes('fax')) &&
      !s.includes('sent twice'),
    weight: DOCUMENT_WEIGHTS.PACKET_FORMAT
  },
  {
    label: 'Loan number included in subject line',
    test: s => s.includes('loan number') || s.includes('subject'),
    weight: DOCUMENT_WEIGHTS.LOAN_NUMBER
  }
];

/**
 * Evaluate packet quality based on text content
 * Memoizable function - pure logic with no side effects
 */
export const evaluatePacketQuality = (
  text: string,
  borrowerStatus: BorrowerStatus
): PacketQuality => {
  const normalized = normalize(text);
  const requiredSignals = getRequiredSignals();

  let score = 0;
  const missing: string[] = [];
  const notes: string[] = [];

  // Check each required signal
  for (const signal of requiredSignals) {
    if (signal.test(normalized)) {
      score += signal.weight;
    } else {
      missing.push(signal.label);
    }
  }

  // Check for business closure documentation
  if (appearsBusinessClosed(text) && !hasClosureDocs(text)) {
    missing.push('Dissolution paperwork or final tax returns (business is closed)');
    notes.push('Business appears closed, include dissolution or final return documents.');
  }

  // Add status-based notes
  if (isHighScrutinyStatus(borrowerStatus)) {
    notes.push(
      'Status indicates higher scrutiny, packet completeness and justification matter more.'
    );
  }

  // Clamp score to 0-100 range
  score = Math.max(0, Math.min(100, score));

  // Get quality label
  const label = getQualityLabel(score);

  // Add completion notes
  if (missing.length > 0) {
    notes.push('Fix the missing items, then rescan using /packetcheck with your packet contents.');
  } else {
    notes.push(
      'Looks complete based on what you listed, confirm signatures, dates, and file naming before sending.'
    );
  }

  return {
    score,
    label,
    missing,
    notes,
    lastCheckedAt: new Date()
  };
};

/**
 * Detect missing basics and generate nudge message
 */
export const detectMissingBasicsNudges = (
  contextText: string,
  hasTrigger: boolean
): string | null => {
  const normalized = normalize(contextText);

  const needs = [
    {
      id: '2518',
      label: 'SBA Form 2518, signed and dated, all required parties',
      present: normalized.includes('2518')
    },
    {
      id: 'borrower_letter',
      label: 'Borrower request letter, signed and dated, explain benefit and collateral',
      present:
        normalized.includes('borrower letter') ||
        (normalized.includes('letter') && normalized.includes('request'))
    },
    {
      id: 'ucc',
      label: 'Current UCC lien search showing SBA lien position',
      present:
        normalized.includes('ucc') &&
        (normalized.includes('lien search') || normalized.includes('search'))
    },
    {
      id: 'insurance',
      label: 'Proof of insurance, declarations pages, hazard coverage where applicable',
      present: normalized.includes('insurance') || normalized.includes('hazard')
    }
  ];

  const missing = needs.filter(n => !n.present).map(n => n.label);

  if (!hasTrigger || missing.length === 0) return null;

  const topMissing = missing.slice(0, 3);

  return [
    'Packet nudge',
    `Based on what I see so far, double check these basics are included`,
    topMissing.map(m => `- ${m}`).join('\n'),
    missing.length > 3
      ? `- plus ${missing.length - 3} more basics may be missing, run /packetcheck with your full list`
      : ''
  ]
    .filter(Boolean)
    .join('\n');
};

/**
 * Generate packet readiness report from wizard answers
 */
export const buildPacketReadinessReport = (
  answers: Record<string, string>,
  quality: PacketQuality,
  borrowerStatus: BorrowerStatus,
  recommendedOrder: string,
  fileNaming: string,
  subjectLine: string
): string => {
  const missingBlock =
    quality.missing.length > 0
      ? `Missing items\n${quality.missing.map(m => `- ${m}`).join('\n')}`
      : 'Missing items\n- None detected based on your answers';

  const summary = [
    'Packet Readiness Report',
    borrowerStatus !== 'Select status' ? `Status: ${borrowerStatus}` : 'Status: Not set',
    '',
    'Your answers summary',
    `- Loan number: ${answers.loan_number || 'Not provided'}`,
    `- Business name: ${answers.business_name || 'Not provided'}`,
    `- Request: ${answers.request_type || 'Not provided'}`,
    `- Business status: ${answers.business_status || 'Not provided'}`,
    `- Transaction: ${answers.transaction || 'Not provided'}`,
    `- Buyer or lender: ${answers.buyer_or_lender || 'Not provided'}`,
    `- Documents you have: ${answers.documents_you_have || 'Not provided'}`,
    `- Values and amounts: ${answers.values || 'Not provided'}`,
    `- Submission plan: ${answers.how_you_will_submit || 'Not provided'}`,
    `- Benefit statement: ${answers.benefit_statement || 'Not provided'}`,
    '',
    missingBlock,
    '',
    'Exact packet order',
    recommendedOrder,
    '',
    'File naming, use this every time',
    fileNaming,
    '',
    'Email subject line',
    subjectLine,
    '',
    'Next move',
    quality.missing.length > 0
      ? '- Gather the missing items, then run /packetcheck with your final packet list'
      : '- Finalize file names, confirm signatures and dates, submit using one method only'
  ].join('\n');

  return summary;
};