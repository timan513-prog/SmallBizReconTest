/**
 * SabbiRoc Constants and Configuration
 * Centralized configuration for scores, thresholds, and static data
 */

// Packet Quality Score Thresholds
export const QUALITY_THRESHOLDS = {
  EARLY_DRAFT: 0,
  DRAFT: 40,
  DECENT: 50,
  STRONG: 70,
  READY: 85
} as const;

// Document Weight Scores
export const DOCUMENT_WEIGHTS = {
  BORROWER_LETTER: 16,
  FORM_2518: 16,
  UCC_SEARCH: 10,
  INSURANCE: 10,
  SALE_AGREEMENT: 10,
  TITLE_REPORT: 8,
  APPRAISAL: 8,
  PAYOFF_LETTER: 6,
  PACKET_FORMAT: 8,
  LOAN_NUMBER: 8
} as const;

// Borrower Status Options
export const BORROWER_STATUS_OPTIONS = [
  'Select status',
  'Current',
  'Less than 90 days past due',
  '90 plus days past due',
  'Charged off',
  'Treasury cross servicing',
  'Unknown'
] as const;

export type BorrowerStatus = typeof BORROWER_STATUS_OPTIONS[number];

// High Scrutiny Statuses
export const HIGH_SCRUTINY_STATUSES: BorrowerStatus[] = [
  '90 plus days past due',
  'Charged off',
  'Treasury cross servicing'
];

// Restricted Path Statuses
export const RESTRICTED_PATH_STATUSES: BorrowerStatus[] = [
  'Treasury cross servicing',
  'Charged off'
];

// Out of Scope Keywords
export const OUT_OF_SCOPE_KEYWORDS = [
  'subordination',
  'change in ownership',
  'relocation',
  'guarantor release',
  'offer in compromise',
  'compromise offer'
] as const;

// Hardship Context Keywords
export const HARDSHIP_KEYWORDS = [
  'hardship',
  'payment plan',
  'severe financial hardship'
] as const;

// SBA Facts
export const SBA_FACTS = [
  "The SBA was established on July 30, 1953, when President Dwight D. Eisenhower signed the Small Business Act into law.",
  "It is the only cabinet-level federal agency fully dedicated to aiding and protecting the interests of small businesses.",
  "A common misconception is that the SBA directly provides loans; in most cases, they guarantee a portion of loans made by banks and other lenders.",
  "The SBA is a direct lender for declared disaster areas, offering low-interest loans to help businesses and homeowners recover.",
  "The COVID EIDL program provided over $400 billion in loans to small businesses during the pandemic.",
  "SBA 7(a) loans can be used for working capital, equipment, real estate, and business acquisition.",
  "The SBA's disaster loan program has been helping businesses recover since 1953.",
  "Small businesses create approximately 1.5 million jobs annually in the United States."
] as const;

// Sabbi Jokes
export const SABBI_JOKES = [
  'Why did the collateral break up with the loan? It felt too tied down!',
  "What's Sabbi's favorite type of music? Anything with a good 'lien' beat!",
  "Why don't EIDL loans play hide and seek? Because the SBA always puts a lien on them!",
  "What do you call a happy UCC-1? A 'fully secured' statement!",
  "Sabbi asked a business owner, 'What's your favorite part of collateral release?' The owner replied, 'The re-lease on life!'",
  "Why did the UCC filing go to therapy? It had attachment issues!",
  "What's a loan officer's favorite exercise? Lien-ups!",
  "How does collateral stay in shape? Through release training!"
] as const;

// Starter Questions
export const STARTER_QUESTIONS = [
  'What documents do I need for collateral release?',
  'What is an SBA collateral release?',
  'How do I submit a collateral release request?',
  'Do I need an appraisal for collateral release?',
  'What is SBA Form 2518?',
  'Can I release only part of my collateral?',
  'Want to hear a random SBA fact?'
] as const;

// Wizard Configuration
export const WIZARD_STEPS = [
  {
    id: 'loan_number',
    prompt: 'Step 1, what is your SBA loan number?',
    hint: 'Example, 1234567890 (10 digits)'
  },
  {
    id: 'business_name',
    prompt: 'Step 2, what is the business legal name as it appears on the loan documents?',
    hint: 'Example, ACME Industries LLC'
  },
  {
    id: 'request_type',
    prompt: 'Step 3, what are you requesting, full release or partial release, and what collateral is being released?',
    hint: 'Example, partial release of equipment, full release of vehicle, release of specific real estate'
  },
  {
    id: 'business_status',
    prompt: 'Step 4, is the business operating or permanently closed?',
    hint: 'If closed, note if dissolution, final return, or wind down documents exist'
  },
  {
    id: 'transaction',
    prompt: 'Step 5, what event is driving the request, sale, refinance, payoff, insurance claim, replacement, or other?',
    hint: 'Example, selling equipment, selling property, refinancing, paying down to release lien'
  },
  {
    id: 'buyer_or_lender',
    prompt: 'Step 6, if there is a buyer or lender involved, who are they and what is the timeline to close?',
    hint: 'Example, lender name, buyer name, closing date, urgency'
  },
  {
    id: 'documents_you_have',
    prompt: 'Step 7, list the documents you already have right now, borrower letter, SBA Form 2518, UCC search, insurance, purchase agreement, settlement statement, title report, appraisal, payoff letter, anything else.',
    hint: 'Comma separated list is perfect'
  },
  {
    id: 'values',
    prompt: 'Step 8, what are the values and amounts, sale price, collateral value, SBA balance, paydown amount, senior lien payoff?',
    hint: 'Numbers help SBA see risk and benefit clearly'
  },
  {
    id: 'how_you_will_submit',
    prompt: 'Step 9, how will you submit the packet, email, Box upload, or fax?',
    hint: 'Best practice, use one method only'
  },
  {
    id: 'benefit_statement',
    prompt: 'Step 10, in 2 to 4 sentences, what is the business benefit, why this helps repayment ability, reduces expense, completes a sale, or improves viability?',
    hint: 'Keep it practical, measurable, and tied to repayment ability'
  }
] as const;

// Message Delays (ms)
export const MESSAGE_DELAYS = {
  RESPONSE: 450,
  WIZARD_NEXT: 450,
  WIZARD_COMPLETE: 450
} as const;

// UI Configuration
export const UI_CONFIG = {
  MAX_RECENT_QUERIES: 3,
  MAX_MISSING_ITEMS_DISPLAY: 4,
  INPUT_MIN_HEIGHT: 40,
  INPUT_MAX_HEIGHT: 120
} as const;

// Contact Information
export const SBA_CONTACT = {
  EMAIL: 'CovidEIDLServicing@sba.gov',
  FAX: '(202) 481-5799',
  BOX_UPLOAD: 'Box.com upload portal'
} as const;

// Recommended Packet Order
export const RECOMMENDED_PACKET_ORDER = [
  '01, Borrower request letter, signed and dated',
  '02, SBA Form 2518, signed and dated, all required parties',
  '03, Supporting transaction doc, purchase agreement, bill of sale, or settlement statement, if applicable',
  '04, UCC lien search, dated, showing SBA lien position',
  '05, Title report, if real estate is involved',
  '06, Appraisal or valuation, if required',
  '07, Payoff letters for any senior liens, if applicable',
  '08, Proof of insurance, declarations pages, as required by the Loan Authorization and Agreement',
  '09, Two most recent business federal tax returns, if requested by your toolkit flow',
  '10, Any closure docs, dissolution or final return, if business is closed',
  '11, Optional, brief packet cover page listing included files'
] as const;