// src/components/SabbiRoc/knowledgeBase.ts
// Sabbi Roc Knowledge Base (Release of Collateral ONLY)
// Sources: SBA CESC Release of Collateral Requirements sheet, SBA Policy Notice 5000-857729, SOP 50 52 2 (applies unless superseded)
// IMPORTANT: Keep this file scoped to Release of Collateral only.

export type KBCategory =
  | 'Scope & Definitions'
  | 'Eligibility & When Needed'
  | 'Required Packet'
  | 'Borrower Letter'
  | 'Borrower Authorization'
  | 'UCC & Lien Position'
  | 'Sale/Transfer Documents'
  | 'Tax & Financial Docs'
  | 'Insurance'
  | 'Closed Business'
  | 'Submission & Contacts'
  | 'Paydown & Consideration'
  | 'Processing & Outcomes'
  | 'Paid in Full (PIF)'
  | 'Common Mistakes'
  | 'Templates & Examples'
  | 'Limits & Disclaimers';

export interface KBEntry {
  id: string;
  category: KBCategory;
  title: string;

  // triggers are normalized match phrases or keywords your response engine can use
  triggers: string[];

  // plain text answer Sabbi can return
  answer: string;

  // short authority notes (kept inside the KB so Sabbi can explain “why”)
  authority?: string[];
}

// --- Authority snippets (keep short, no giant quoting) ---
const AUTH = {
  CESC_REQ: `CESC "COVID EIDL Release of Collateral Request Requirements" lists the general requirements, paydown warning, and submission channels (email, Box.com, fax, phone).`,
  PN_857729: `SBA Policy Notice 5000-857729 (effective 08/05/2024) confirms COVID EIDL servicing follows SOP 50 52 (2) unless superseded, and includes Release of Collateral required elements (business name, type, loan number, full/partial, operating status, need statement, new lien info, collateral list w values, executed purchase contract if selling, owners list, signatures, plus borrower auth, UCC search, dissolution/final returns if closed, proof of insurance).`,
  SOP_APPLIES: `SOP 50 52 2 is the baseline disaster servicing SOP; COVID EIDL uses SOP unless superseded by COVID-specific memos/guidance.`,
};

// --- The Knowledge Base ---
export const KNOWLEDGE_BASE: KBEntry[] = [
  // =========================
  // Scope & Definitions
  // =========================
  {
    id: 'roc_scope_only',
    category: 'Scope & Definitions',
    title: 'What Sabbi Roc covers (scope limits)',
    triggers: [
      'what can you help with',
      'scope',
      'what is this bot',
      'sabbi roc scope',
      'roc only',
      'what loans do you cover',
    ],
    answer: [
      'I cover ONE topic only, SBA COVID EIDL Release of Collateral (Release of Lien/Collateral).',
      '',
      'I can help you:',
      '1, Understand when a release is needed, full vs partial, and what SBA looks for',
      '2, Build a complete submission packet checklist',
      '3, Draft the borrower request letter (what to include and how to phrase it)',
      '4, Prepare an email subject line and packaging order so your request is review ready',
      '5, Avoid the most common denial triggers (missing signatures, missing UCC search, wrong docs, incomplete sale agreement, etc.)',
      '',
      'I do NOT submit your request, and I do NOT act as the SBA or your legal representative.',
    ].join('\n'),
    authority: [AUTH.CESC_REQ, AUTH.PN_857729, AUTH.SOP_APPLIES],
  },

  {
    id: 'roc_definition',
    category: 'Scope & Definitions',
    title: 'What is a COVID EIDL Release of Collateral',
    triggers: [
      'what is release of collateral',
      'release of lien',
      'release of collateral definition',
      'what does release mean',
      'remove lien',
    ],
    answer: [
      'A COVID EIDL Release of Collateral is a formal servicing request asking SBA to remove its lien interest from specific collateral (full or partial).',
      'This often comes up when you need to sell assets, replace equipment, restructure financing, or complete a transaction that requires SBA to release its secured interest.',
      '',
      'Important: SBA may condition approval on curing defaults and correcting collateral deficiencies, and SBA may require monetary consideration (paydown) in many cases.',
    ].join('\n'),
    authority: [AUTH.CESC_REQ, AUTH.PN_857729],
  },

  // =========================
  // Eligibility & When Needed
  // =========================
  {
    id: 'roc_when_needed',
    category: 'Eligibility & When Needed',
    title: 'When you typically need a Release of Collateral',
    triggers: [
      'when do i need release',
      'do i need a release',
      'selling equipment',
      'sell collateral',
      'refinance collateral',
      'replace equipment',
      'expansion',
      'improvements',
    ],
    answer: [
      'You typically need a Release of Collateral when:',
      '1, You are selling collateral covered by SBA’s lien (equipment, assets, sometimes real estate)',
      '2, You are doing a replacement, expansion, or improvement transaction involving liened assets',
      '3, A lender or buyer requires SBA to release its secured interest on specific collateral',
      '',
      'SBA reviews these case by case, and will focus on whether the release weakens SBA’s secured position and whether the transaction supports repayment ability.',
    ].join('\n'),
    authority: [AUTH.PN_857729],
  },

  {
    id: 'roc_full_vs_partial',
    category: 'Eligibility & When Needed',
    title: 'Full vs Partial Release (what SBA means)',
    triggers: ['full release', 'partial release', 'difference full partial', 'full vs partial'],
    answer: [
      'Full Release means you’re asking SBA to release its lien interest on ALL collateral tied to the request scope (rare unless tied to payoff/PIF, or a special scenario).',
      'Partial Release means SBA keeps its blanket lien generally in place, but releases specific collateral items you list (common for asset sales, replacements, or upgrades).',
      '',
      'Your request must clearly state whether it is Full or Partial, and must include an itemized list of collateral with identifying details and values.',
    ].join('\n'),
    authority: [AUTH.PN_857729],
  },

  // =========================
  // Required Packet (Master Checklist)
  // =========================
  {
    id: 'roc_required_packet_master',
    category: 'Required Packet',
    title: 'Master checklist, Release of Collateral request requirements',
    triggers: [
      'required documents',
      'requirements',
      'what do i need to submit',
      'packet checklist',
      'roc checklist',
      'release packet',
    ],
    answer: [
      'For SBA to review a COVID EIDL Release of Collateral request (full or partial), you generally need:',
      '',
      'A, Written request (borrower letter) with required fields, signed by all required parties',
      'B, Borrower Authorization, SBA Form 2518 (Consent to Verify Info & 3rd Party Authorization), signed and dated by all applicable borrowers/guarantors',
      'C, Signed sale/transfer agreement documents (Sale Agreement, Bill of Sale, or Settlement Statement), if applicable',
      'D, Previous two years of federal tax returns (business)',
      'E, UCC lien search showing SBA’s lien position',
      'F, Title report, if applicable',
      'G, Payoff letters for any senior creditors, if applicable',
      'H, Dissolution paperwork or final tax returns if the business is permanently closed',
      'I, Proof of insurance required by the Loan Authorization and Agreement',
      '',
      'SBA may request additional documentation depending on the scenario.',
    ].join('\n'),
    authority: [AUTH.CESC_REQ, AUTH.PN_857729],
  },

  // =========================
  // Borrower Letter (Detailed Fields)
  // =========================
  {
    id: 'roc_borrower_letter_fields',
    category: 'Borrower Letter',
    title: 'Borrower letter, what MUST be included',
    triggers: [
      'borrower letter',
      'request letter',
      'what do i put in my letter',
      'how to write the request',
      'letter requirements',
      'detailed letter',
    ],
    answer: [
      'Your borrower request letter should be clear, specific, and complete. SBA expects the request to include:',
      '1, Business name',
      '2, Business type (LLC, Corp, Sole Prop, etc.)',
      '3, COVID EIDL loan number',
      '4, Indicate Full or Partial release',
      '5, Current business operating status (operating or closed)',
      '6, Detailed statement explaining the need for the release (the “why”)',
      '7, New lien information if applicable (who, what, why, collateral impact)',
      '8, Detailed listing of collateral covered by UCC or other collateral, include make/model, serial or VIN, property address or legal description if real estate, include estimated values',
      '9, If selling collateral, reference the fully executed asset purchase contract and attach it',
      '10, List of all owners and ownership percentages',
      '11, Signatures (SBA borrowers and/or guarantors as applicable)',
      '',
      'Tip: Write it like a “business case”, explain how the transaction supports ongoing viability and repayment ability.',
    ].join('\n'),
    authority: [AUTH.PN_857729, AUTH.CESC_REQ],
  },

  {
    id: 'roc_signatures_who',
    category: 'Borrower Letter',
    title: 'Who should sign the request',
    triggers: ['who signs', 'signatures', 'do guarantors sign', 'does everyone sign'],
    answer: [
      'Use the conservative approach: if they are listed as borrower or guarantor on the COVID EIDL, assume SBA expects them to sign the request and the borrower authorization form, unless SBA has specifically stated otherwise for your file.',
      '',
      'Missing signatures is one of the easiest ways to stall a review.',
    ].join('\n'),
    authority: [AUTH.CESC_REQ, AUTH.PN_857729],
  },

  // =========================
  // Borrower Authorization (Form 2518)
  // =========================
  {
    id: 'roc_borrower_auth_2518',
    category: 'Borrower Authorization',
    title: 'Borrower Authorization (SBA Form 2518) required',
    triggers: [
      'borrower authorization',
      'form 2518',
      'consent to verify information',
      '3rd party authorization',
      'third party authorization',
    ],
    answer: [
      'SBA requires a completed, signed, and dated Borrower Authorization (SBA Form 2518, Consent to Verify Information & 3rd Party Authorization) for all applicable borrowers and/or guarantors.',
      '',
      'If this is missing or not signed correctly, your package is typically not considered complete.',
    ].join('\n'),
    authority: [AUTH.CESC_REQ, AUTH.PN_857729],
  },

  // =========================
  // UCC & Lien Position
  // =========================
  {
    id: 'roc_ucc_search',
    category: 'UCC & Lien Position',
    title: 'UCC lien search, what SBA wants to see',
    triggers: ['ucc search', 'lien search', 'ucc', 'lien position', 'secured party'],
    answer: [
      'SBA expects a UCC lien search indicating SBA’s lien position.',
      'This is usually obtained via the appropriate state UCC search system (Secretary of State) or a commercial provider.',
      '',
      'Your goal: clearly show SBA’s filing(s), and whether there are senior liens or other secured parties that affect collateral priority.',
    ].join('\n'),
    authority: [AUTH.CESC_REQ, AUTH.PN_857729],
  },

  // =========================
  // Sale / Transfer Documents
  // =========================
  {
    id: 'roc_sale_docs',
    category: 'Sale/Transfer Documents',
    title: 'Sale agreement, bill of sale, settlement statement',
    triggers: [
      'sale agreement',
      'bill of sale',
      'settlement statement',
      'asset purchase agreement',
      'purchase contract',
      'fully executed',
    ],
    answer: [
      'If your release request involves selling collateral, SBA expects a copy of the signed agreement, typically:',
      '1, Sale agreement, or',
      '2, Bill of sale, or',
      '3, Settlement statement',
      '',
      'Policy guidance also calls out a “fully executed” asset purchase contract if selling the collateral.',
    ].join('\n'),
    authority: [AUTH.CESC_REQ, AUTH.PN_857729],
  },

  {
    id: 'roc_title_report_if_applicable',
    category: 'Sale/Transfer Documents',
    title: 'Title report, when it applies',
    triggers: ['title report', 'title search', 'real estate title', 'when do i need title report'],
    answer: [
      'A title report is required if applicable, typically when the collateral involves real estate or a transaction where title and lien priority must be verified.',
      '',
      'If you are not dealing with real estate, SBA may not require a title report, but they can still request additional documentation depending on the file.',
    ].join('\n'),
    authority: [AUTH.CESC_REQ],
  },

  {
    id: 'roc_senior_payoff_letters',
    category: 'Sale/Transfer Documents',
    title: 'Payoff letters for senior creditors, when needed',
    triggers: ['payoff letter', 'senior creditor', 'existing lien', 'prior lien', 'first lien'],
    answer: [
      'If there are senior creditors tied to the collateral or the transaction structure, SBA may require payoff letter(s) for those senior creditors, when applicable.',
      'This helps SBA analyze lien priority and how the transaction impacts SBA’s collateral position.',
    ].join('\n'),
    authority: [AUTH.CESC_REQ],
  },

  // =========================
  // Tax & Financial Docs
  // =========================
  {
    id: 'roc_tax_returns_two_years',
    category: 'Tax & Financial Docs',
    title: 'Two years of federal tax returns (business)',
    triggers: [
      'tax returns',
      'two years tax returns',
      'last two years',
      'federal returns',
      'returns required',
    ],
    answer: [
      'SBA generally requires copies of the previous two years’ federal tax returns for the business as part of a Release of Collateral request package.',
      'Make sure they are complete and match what was filed (including schedules).',
    ].join('\n'),
    authority: [AUTH.CESC_REQ, AUTH.PN_857729],
  },

  // =========================
  // Insurance
  // =========================
  {
    id: 'roc_insurance_proof',
    category: 'Insurance',
    title: 'Proof of insurance (per Loan Authorization and Agreement)',
    triggers: ['proof of insurance', 'hazard insurance', 'insurance requirement', 'laa insurance'],
    answer: [
      'SBA expects proof of insurance as required by your Loan Authorization and Agreement.',
      'What “counts” depends on the collateral and your loan documents, but the core rule is: show coverage that meets the loan agreement requirements.',
      '',
      'If SBA sees an insurance gap or mismatch (wrong address, missing BPP where required, expired dates), they can condition approval or delay review.',
    ].join('\n'),
    authority: [AUTH.CESC_REQ, AUTH.PN_857729],
  },

  // =========================
  // Closed Business
  // =========================
  {
    id: 'roc_closed_business',
    category: 'Closed Business',
    title: 'If the business is permanently closed',
    triggers: ['business is closed', 'permanently closed', 'dissolution', 'final tax returns', 'ceased operations'],
    answer: [
      'If the business is permanently closed, SBA generally expects dissolution paperwork or final tax returns.',
      'This is part of the required collateral action documentation set and helps SBA analyze the request and the remaining repayment picture.',
    ].join('\n'),
    authority: [AUTH.CESC_REQ, AUTH.PN_857729],
  },

  // =========================
  // Submission & Contacts
  // =========================
  {
    id: 'roc_submission_methods',
    category: 'Submission & Contacts',
    title: 'Where to submit, email, Box.com, fax, phone',
    triggers: ['where do i submit', 'submit to sba', 'email address', 'box.com', 'upload', 'fax', 'phone'],
    answer: [
      'Submission options listed for the COVID EIDL Servicing Center (CESC):',
      '1, Email, Covideidlservicing@sba.gov',
      '2, Box.com upload portal for the Covid EIDL Servicing Center (Box.com upload option)',
      '3, Fax, (202) 481-5799',
      '4, Phone, (833) 853-5638',
      '',
      'Best practice: send ONE complete package, clearly named files, and a clean email subject line that matches your request type and loan number.',
    ].join('\n'),
    authority: [AUTH.CESC_REQ],
  },

  // =========================
  // Paydown & Consideration
  // =========================
  {
    id: 'roc_paydown_warning',
    category: 'Paydown & Consideration',
    title: 'Paydown / monetary consideration warning',
    triggers: ['paydown', 'consideration', 'do i have to pay', 'monetary consideration', 'why paydown'],
    answer: [
      'Under most circumstances, SBA may require full monetary consideration to approve a Release of Collateral request.',
      'A paydown for consideration is NOT a regular payment, and your regular monthly payments are not automatically re-amortized. If you want a payment reduction after a paydown, you must request and qualify for it.',
    ].join('\n'),
    authority: [AUTH.CESC_REQ],
  },

  // =========================
  // Processing & Outcomes
  // =========================
  {
    id: 'roc_not_a_commitment',
    category: 'Processing & Outcomes',
    title: '“Not a commitment” and SBA conditions',
    triggers: ['is this guaranteed', 'commitment', 'approval guaranteed', 'will sba approve', 'conditions'],
    answer: [
      'The CESC requirements sheet is not a commitment by SBA.',
      'Any SBA commitment is provided separately in writing.',
      '',
      'Approval can be conditioned on:',
      '1, Curing defaults',
      '2, Correcting collateral deficiencies',
      '3, Fixing issues with loan documents',
      '4, Providing additional documentation for analysis',
    ].join('\n'),
    authority: [AUTH.CESC_REQ],
  },

  // =========================
  // Paid in Full (PIF)
  // =========================
  {
    id: 'roc_pif_ucc_release',
    category: 'Paid in Full (PIF)',
    title: 'Paid in full, UCC release instructions',
    triggers: ['paid in full', 'pif', 'loan payoff', 'ucc release after payoff', 'release after payoff'],
    answer: [
      'For COVID EIDL, SBA’s COVID EIDL Servicing Center can issue a COVID EIDL-specific Paid in Full letter after the final payment posts and clears.',
      'If the loan was secured, the PIF letter includes instructions for the borrower to have the UCC collateral released.',
    ].join('\n'),
    authority: [AUTH.PN_857729],
  },

  // =========================
  // Common Mistakes
  // =========================
  {
    id: 'roc_common_mistakes',
    category: 'Common Mistakes',
    title: 'Top reasons packages get delayed or go nowhere',
    triggers: ['common mistakes', 'why denied', 'why delayed', 'what gets rejected', 'packet incomplete'],
    answer: [
      'Common delay triggers for Release of Collateral packages:',
      '1, Missing signatures (borrower and/or guarantor signatures not included)',
      '2, Missing SBA Form 2518 (Borrower Authorization) or it is incomplete/undated',
      '3, No UCC lien search showing SBA’s lien position',
      '4, Sale agreement not fully executed or missing key pages',
      '5, Collateral list is vague (no VIN/serial, no values, no itemization)',
      '6, Missing proof of insurance required by the Loan Authorization and Agreement',
      '7, Missing 2 years tax returns',
      '8, Closed business but no dissolution paperwork or final returns',
      '9, Email subject line is unclear (hard for triage), files not named logically',
    ].join('\n'),
    authority: [AUTH.CESC_REQ, AUTH.PN_857729],
  },

  // =========================
  // Templates & Examples
  // =========================
  {
    id: 'roc_subject_line_template',
    category: 'Templates & Examples',
    title: 'Email subject line template',
    triggers: ['email subject', 'subject line', 'how should i title the email', 'subject format'],
    answer: [
      'A clean subject line helps triage. Use this structure:',
      '',
      'Release of Collateral Request, COVID EIDL Loan ##########, [Business Legal Name]',
      '',
      'If partial release, add “Partial”:',
      'Partial Release of Collateral Request, COVID EIDL Loan ##########, [Business Legal Name]',
    ].join('\n'),
    authority: [AUTH.CESC_REQ, AUTH.PN_857729],
  },

  {
    id: 'roc_packet_order_template',
    category: 'Templates & Examples',
    title: 'Recommended packet order (to make review easier)',
    triggers: ['packet order', 'how to organize', 'file order', 'how should i package'],
    answer: [
      'Recommended order for your PDF bundle or file set:',
      '1, Borrower Request Letter (signed)',
      '2, SBA Form 2518 Borrower Authorization (signed)',
      '3, Itemized Collateral List (if not fully embedded in letter)',
      '4, UCC Lien Search (shows SBA lien position)',
      '5, Sale Agreement / Bill of Sale / Settlement Statement (fully executed, if selling)',
      '6, Title Report (if applicable)',
      '7, Payoff Letter(s) for senior creditors (if applicable)',
      '8, Proof of Insurance (per Loan Authorization and Agreement)',
      '9, Business Federal Tax Returns, last two years',
      '10, Closure documentation (dissolution paperwork or final returns), if closed',
      '',
      'Goal: SBA reviewer can validate identity, authority, collateral, and transaction in the first few minutes.',
    ].join('\n'),
    authority: [AUTH.CESC_REQ, AUTH.PN_857729],
  },

  // =========================
  // Limits & Disclaimers
  // =========================
  {
    id: 'roc_disclaimer',
    category: 'Limits & Disclaimers',
    title: 'Educational and non-representation disclaimer',
    triggers: ['disclaimer', 'are you the sba', 'legal advice', 'financial advice', 'do you submit'],
    answer: [
      'Educational only: I help you understand SBA’s Release of Collateral requirements and assemble a complete, review-ready package.',
      '',
      'I do not submit documents for you, I do not communicate with SBA or Treasury on your behalf, and I am not a law firm.',
      'If you need legal advice or deal structuring guidance, consult a qualified attorney or professional.',
    ].join('\n'),
    authority: [AUTH.CESC_REQ, AUTH.PN_857729],
  },
];

export const KB_BY_ID = Object.fromEntries(KNOWLEDGE_BASE.map(e => [e.id, e]));

// Alias export expected by responseEngine
export const collateralReleaseKnowledge = KNOWLEDGE_BASE;