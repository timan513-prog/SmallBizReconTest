export type AlertSeverity = 'critical' | 'action-required' | 'informational' | 'update';
export type AlertCategory = 'treasury' | 'sba-policy' | 'covid-eidl' | 'servicing' | 'legislative';

export interface PolicyAlert {
  id: string;
  date: string;
  title: string;
  summary: string;
  body: string;
  severity: AlertSeverity;
  category: AlertCategory;
  source?: string;
  sourceUrl?: string;
  affectedBorrowers?: string;
  actionDeadline?: string;
  relatedStage?: number[];
  tags?: string[];
  pinned?: boolean;
}

export const policyAlerts: PolicyAlert[] = [
  {
    id: 'alert-2026-03-01-001',
    date: '2026-03-01',
    title: 'Treasury Resumes Cross-Servicing Collections on COVID EIDL Loans',
    summary: 'The U.S. Department of the Treasury has resumed active collection efforts on COVID EIDL loans referred through the Cross-Servicing program after an extended administrative pause. Borrowers in Treasury referral status should expect new correspondence.',
    body: `## What Happened\n\nThe U.S. Department of the Treasury's Bureau of the Fiscal Service has resumed active collection on COVID EIDL debts that were previously referred through the Cross-Servicing program.\n\n## Who Is Affected\n\nBorrowers whose COVID EIDL loans were referred to Treasury for collection (Stage 5 in the EIDL lifecycle). This includes borrowers who may have experienced a pause in collection activity and assumed their case was inactive.\n\n## What You Should Do\n\n1. **Review any new correspondence** from Treasury carefully — deadlines may be included.\n2. **Do not ignore offset notices** — tax refund and wage garnishment actions may resume.\n3. **Contact SmallBiz Recon™** for a case review if you are in or approaching Treasury referral status.\n\n## SmallBiz Recon™ Recommendation\n\nIf you have received new Treasury letters, book an Advanced Strategy Session immediately. Early intervention before offset actions begin is significantly more effective than responding after the fact.`,
    severity: 'critical',
    category: 'treasury',
    source: 'Bureau of the Fiscal Service',
    sourceUrl: 'https://fiscal.treasury.gov',
    affectedBorrowers: 'All COVID EIDL borrowers in Treasury cross-servicing (Stage 5)',
    relatedStage: [5, 6],
    tags: ['treasury', 'cross-servicing', 'collections', 'offset'],
    pinned: true,
  },
  {
    id: 'alert-2026-02-15-001',
    date: '2026-02-15',
    title: 'SBA Updates Hardship Review Procedures for EIDL Borrowers',
    summary: 'The SBA has issued updated guidance on hardship review procedures for COVID EIDL borrowers, including revised documentation requirements and expanded eligibility criteria for payment modification.',
    body: `## What Changed\n\nThe SBA has updated its internal procedures for reviewing hardship requests from COVID EIDL borrowers. The changes include streamlined documentation requirements and broader eligibility criteria for payment modifications.\n\n## Who Is Affected\n\nBorrowers currently making payments (Stage 2) or in delinquency (Stage 3) who are experiencing financial difficulty.\n\n## Key Changes\n\n- Simplified financial documentation package\n- Expanded definition of qualifying hardship\n- Faster processing timelines for hardship reviews\n\n## SmallBiz Recon™ Recommendation\n\nIf you previously had a hardship request denied, the updated criteria may change your eligibility. Contact us for a free reassessment.`,
    severity: 'action-required',
    category: 'sba-policy',
    source: 'SBA Servicing Center',
    affectedBorrowers: 'COVID EIDL borrowers in Stages 2–3',
    relatedStage: [2, 3],
    tags: ['hardship', 'payment-modification', 'servicing'],
    pinned: false,
  },
  {
    id: 'alert-2026-01-20-001',
    date: '2026-01-20',
    title: 'Reminder: COVID EIDL Subordination Requests Require Updated Appraisals',
    summary: 'Borrowers submitting subordination requests for properties securing COVID EIDL loans must include current appraisals dated within the last 12 months. Previously accepted appraisals may no longer qualify.',
    body: `## Background\n\nThe SBA requires current property appraisals for subordination requests involving real estate collateral on COVID EIDL loans. Appraisals must be dated within 12 months of the request submission.\n\n## Impact\n\nBorrowers seeking to refinance, sell, or restructure property securing their EIDL loan must obtain a new appraisal if their existing one is more than 12 months old.\n\n## SmallBiz Recon™ Recommendation\n\nBefore spending money on a new appraisal, consult with us to ensure your subordination package is complete and your request has a strong chance of approval. We review the full application before submission.`,
    severity: 'informational',
    category: 'servicing',
    source: 'SOP 50 52 2',
    affectedBorrowers: 'COVID EIDL borrowers with real estate collateral seeking subordination',
    relatedStage: [2],
    tags: ['subordination', 'appraisal', 'collateral', 'servicing'],
    pinned: false,
  },
  {
    id: 'alert-2026-01-08-001',
    date: '2026-01-08',
    title: 'IRS Tax Refund Offset Program Reinstated for COVID EIDL Delinquencies',
    summary: 'The IRS has reinstated the Treasury Offset Program for delinquent COVID EIDL obligations. Borrowers more than 90 days past due may have federal tax refunds intercepted without additional notice.',
    body: `## Overview\n\nThe Treasury Offset Program (TOP) allows the federal government to intercept federal payments — including tax refunds, Social Security benefits, and federal wages — to satisfy delinquent federal debts.\n\n## Current Status\n\nThe TOP is now fully active for COVID EIDL delinquencies that have been referred to Treasury. Borrowers who have not responded to prior SBA correspondence may be subject to immediate offset upon their next federal payment.\n\n## What To Watch For\n\n- IRS offset notice (BFS-1) in your mail\n- Reduced or zero federal tax refund\n- Notice from Social Security Administration if receiving benefits\n\n## SmallBiz Recon™ Recommendation\n\nIf you expect a federal tax refund and have a delinquent COVID EIDL, act before you file. Contact us immediately for an emergency case review.`,
    severity: 'critical',
    category: 'treasury',
    source: 'Treasury Offset Program',
    sourceUrl: 'https://fiscal.treasury.gov/top/',
    affectedBorrowers: 'COVID EIDL borrowers referred to Treasury with delinquent balances',
    relatedStage: [5, 6, 7],
    tags: ['offset', 'tax-refund', 'IRS', 'treasury', 'TOP'],
    pinned: false,
  },
  {
    id: 'alert-2025-12-10-001',
    date: '2025-12-10',
    title: 'SBA Clarifies Collateral Release Standards Under SOP 50 52 2',
    summary: 'The SBA has issued internal guidance clarifying the documentation standards for collateral release requests, specifically for personal and business property used as EIDL security.',
    body: `## What Was Clarified\n\nSBA loan servicing centers have updated their internal processing checklists for collateral release requests. The primary change involves uniform documentation standards across all servicing center locations.\n\n## Key Documentation Requirements\n\n- Updated UCC lien searches (within 60 days)\n- Current balance confirmation letter\n- Borrower written request explaining basis for release\n- Supporting financial statements if requesting partial release\n\n## Why This Matters\n\nPreviously, documentation standards varied slightly by servicing center. This clarification standardizes the process, meaning packages that were accepted at one center may need additional documentation at another.\n\n## SmallBiz Recon™ Recommendation\n\nUse our Collateral Release Toolkit to ensure your package meets the updated uniform standards before submission.`,
    severity: 'update',
    category: 'sba-policy',
    source: 'SBA OCA Servicing Center',
    affectedBorrowers: 'COVID EIDL borrowers with collateral release requests pending or planned',
    relatedStage: [2, 3],
    tags: ['collateral', 'release', 'UCC', 'servicing', 'SOP'],
    pinned: false,
  },
  {
    id: 'alert-2025-11-20-001',
    date: '2025-11-20',
    title: 'Congressional Activity: COVID EIDL Forgiveness Proposal Introduced',
    summary: 'A bipartisan group of legislators has introduced a proposal to provide partial forgiveness or extended deferment for COVID EIDL loans under $150,000. The proposal is currently in committee and has not been enacted.',
    body: `## Status\n\nThis is a legislative proposal only — it has NOT been enacted into law. SmallBiz Recon™ is monitoring this development closely.\n\n## What Is Being Proposed\n\n- Partial principal forgiveness for loans under $150,000\n- Extended deferment periods for businesses still recovering\n- Streamlined hardship review for qualifying borrowers\n\n## What This Means Right Now\n\nNothing has changed yet. Borrowers should continue making payments and meeting their existing SBA obligations. Do not stop payments based on this proposal.\n\n## SmallBiz Recon™ Recommendation\n\nWe will publish an update immediately if this proposal advances or is enacted. Sign up for our Policy Alert emails to get notified first.`,
    severity: 'informational',
    category: 'legislative',
    source: 'U.S. Congress',
    affectedBorrowers: 'COVID EIDL borrowers with loans under $150,000',
    relatedStage: [1, 2, 3],
    tags: ['forgiveness', 'legislation', 'deferment', 'congress'],
    pinned: false,
  },
];
