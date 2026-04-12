/**
 * Response Engine
 * Core logic for generating responses based on user input
 * (Release of Collateral only)
 */

import { collateralReleaseKnowledge } from './knowledgeBase';

import {
  normalize,
  buildNormalizedKB,
  containsHardshipContext,
  getRandom,
  hasTriggerKeywords
} from './utils';

import {
  OUT_OF_SCOPE_KEYWORDS,
  SABBI_JOKES,
  SBA_FACTS,
  RESTRICTED_PATH_STATUSES,
  BorrowerStatus
} from './constants';

import {
  generateBorrowerLetter,
  generateEmailTemplate,
  generateCoverPage,
  generateSubjectLine,
  generateFullPacketGuide,
  WizardAnswers
} from './generators-enhanced';

import { detectMissingBasicsNudges } from './packetQuality';

export interface ResponseContext {
  input: string;
  borrowerStatus: BorrowerStatus;
  wizardAnswers: WizardAnswers;
  conversationHistory: string;
}

/**
 * Build normalized knowledge base (memoize this in component ideally)
 */
export const buildKnowledgeBase = () => {
  return buildNormalizedKB(collateralReleaseKnowledge);
};

/**
 * Check if input is out of scope
 */
export const isOutOfScope = (input: string): boolean => {
  const normalized = normalize(input);
  return OUT_OF_SCOPE_KEYWORDS.some(keyword => normalized.includes(keyword));
};

/**
 * Generate out of scope response
 */
export const generateOutOfScopeResponse = (input: string): string => {
  const normalized = normalize(input);

  if (normalized.includes('subordination')) {
    return `Subordination is a different servicing action than Release of Collateral. I’m scoped to collateral release only.`;
  }

  if (normalized.includes('change in ownership') || normalized.includes('ownership change')) {
    return `Change in Ownership is a separate servicing action. I’m scoped to Release of Collateral only.`;
  }

  if (normalized.includes('guarantor release') || normalized.includes('release of guarantor')) {
    return `Guarantor release is separate from Release of Collateral. I’m scoped to collateral release only.`;
  }

  return `That topic is outside the Release of Collateral toolkit. Ask me about required documents, packet order, file naming, submission options, or use /packetwizard.`;
};

/**
 * Generate hardship context response
 */
export const generateHardshipContextResponse = (): string => {
  return `I can’t advise on hardship/payment relief. I can help with Release of Collateral packaging only. Your loan status may affect whether a collateral release request can be processed right now.`;
};

/**
 * Helper to unwrap generators that return { success, data, message }
 */
const unwrap = (result: any): string => {
  if (typeof result === 'string') return result;

  if (result && typeof result === 'object') {
    if (result.success && typeof result.data === 'string') return result.data;
    if (!result.success && typeof result.message === 'string') return result.message;
    if (typeof result.data === 'string') return result.data;
  }

  return `Unable to generate that right now. Try /packetwizard or ask for the required documents checklist.`;
};

/**
 * Generate response for user input
 */
export const generateResponse = (context: ResponseContext): string => {
  const { input, borrowerStatus, wizardAnswers, conversationHistory } = context;
  const normalized = normalize(input);
  const normalizedKB = buildKnowledgeBase();

  // Out of scope first
  if (isOutOfScope(input)) {
    return generateOutOfScopeResponse(input);
  }

  // Hardship context
  if (containsHardshipContext(input)) {
    return generateHardshipContextResponse();
  }

  // Joke request
  if (normalized.includes('joke') || normalized.includes('funny')) {
    return getRandom(SABBI_JOKES);
  }

  // SBA fact request
  if (normalized.includes('sba fact') || normalized.includes('sbafact')) {
    return getRandom(SBA_FACTS);
  }

  // Packet order / full packet guide request
  if (
    normalized.includes('packet order') ||
    normalized.includes('exact order') ||
    normalized.includes('file order') ||
    normalized.includes('packet include') ||
    normalized.includes('what should my packet include')
  ) {
    return unwrap(generateFullPacketGuide(wizardAnswers));
  }

  // Document generators
  if (normalized.includes('genletter') || normalized.includes('/genletter')) {
    return unwrap(generateBorrowerLetter(wizardAnswers));
  }

  if (normalized.includes('genemail') || normalized.includes('/genemail')) {
    return unwrap(generateEmailTemplate(wizardAnswers, borrowerStatus));
  }

  if (normalized.includes('gencover') || normalized.includes('/gencover')) {
    return unwrap(generateCoverPage(wizardAnswers, borrowerStatus));
  }

  // Subject line request
  if (normalized.includes('subject line') || normalized.includes('email subject')) {
    const subj = unwrap(generateSubjectLine(wizardAnswers, borrowerStatus));
    return `Email subject line:\n\n${subj}`;
  }

  // Try to match KB entries
  for (const [key, value] of normalizedKB.entries()) {
    if (normalized.includes(key)) {
      let response = value;

      // Status-specific warnings
      if (RESTRICTED_PATH_STATUSES.includes(borrowerStatus)) {
        response += `\n\nNote: Your loan status (${borrowerStatus}) may require special handling. Verify eligibility/submission path with your servicing contact before sending.`;
      }

      // Packet nudges if relevant
      const hasTrigger = hasTriggerKeywords(conversationHistory);
      const nudge = detectMissingBasicsNudges(conversationHistory, hasTrigger);
      if (nudge) {
        response += `\n\n${nudge}`;
      }

      return response;
    }
  }

  // Default fallback
  return collateralReleaseKnowledge.default || `I’m scoped to Release of Collateral only. Ask about required docs, packet order, file naming, submission options, or use /packetwizard.`;
};

/**
 * Generate greeting
 */
export const generateGreeting = (): string => {
  return `Hi, I’m Sabbi, your COVID EIDL Release of Collateral specialist.

I can help you with,
1) Required documents and checklists,
2) Borrower letter and email templates,
3) Packet order and file naming,
4) Submission guidance, common mistakes to avoid,
5) Step-by-step wizard (/packetwizard).

What do you want to work on first?`;
};
