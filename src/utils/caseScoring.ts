import type {
  EvaluatorAnswers,
  ScoreResult,
  ScoreTier,
  Q5Answer,
} from '../types/caseEvaluator';

function scoreQ1(a: EvaluatorAnswers['q1']): number {
  if (a === 'yes') return 15;
  if (a === 'not_sure') return 8;
  return 0;
}

function scoreQ2(a: EvaluatorAnswers['q2']): number {
  if (a === 'treasury' || a === 'demand_letter') return 20;
  if (a === 'default') return 16;
  if (a === 'delinquent') return 12;
  if (a === 'dont_know') return 8;
  if (a === 'current') return 5;
  return 0;
}

function scoreQ3(a: EvaluatorAnswers['q3']): number {
  if (a === 'yes') return 15;
  if (a === 'not_sure') return 8;
  return 5;
}

function scoreQ4(a: EvaluatorAnswers['q4']): number {
  if (a === 'significant') return 15;
  if (a === 'some') return 10;
  if (a === 'prefer_not') return 7;
  return 5;
}

function scoreQ5(answers: Q5Answer[]): number {
  if (answers.length === 0 || answers.includes('none')) return 10;
  if (answers.includes('hired_attorney')) return 4;
  const scores: Partial<Record<Q5Answer, number>> = {
    filed_dispute: 6,
    contacted_sba: 7,
    submitted_hardship: 7,
  };
  const total = answers.reduce((sum, a) => sum + (scores[a] ?? 5), 0);
  return Math.round(total / answers.length);
}

function scoreQ6(a: EvaluatorAnswers['q6']): number {
  if (a === 'stop_treasury') return 15;
  if (a === 'settle') return 13;
  if (a === 'reduce_payment') return 11;
  if (a === 'forgiveness') return 9;
  return 7;
}

function scoreQ7(a: EvaluatorAnswers['q7']): number {
  if (a === 'immediate') return 10;
  if (a === 'soon') return 8;
  if (a === 'planning') return 5;
  return 3;
}

function getTier(score: number): ScoreTier {
  if (score >= 80) return 'critical';
  if (score >= 60) return 'strong';
  if (score >= 40) return 'moderate';
  if (score >= 20) return 'early';
  return 'low';
}

const TIER_LABELS: Record<ScoreTier, string> = {
  critical: 'Critical Priority',
  strong: 'Strong Case',
  moderate: 'Moderate Case',
  early: 'Early Stage',
  low: 'Low Risk / Informational',
};

const TIER_DESCRIPTIONS: Record<ScoreTier, string> = {
  critical:
    'Your situation demands immediate professional attention. The good news: cases like yours are exactly what SmallBiz Recon™ specializes in.',
  strong:
    'You have a solid case with clear paths forward. Early intervention can significantly improve your outcome.',
  moderate:
    'There are viable options available to you. A strategic consultation will help clarify the best approach.',
  early:
    "You're in a good position to get ahead of potential issues. Proactive planning now can save significant stress later.",
  low:
    "Your situation appears manageable, but it's always smart to understand your full picture. We're here if questions come up.",
};

export function calculateScore(answers: EvaluatorAnswers): ScoreResult {
  const raw =
    scoreQ1(answers.q1) +
    scoreQ2(answers.q2) +
    scoreQ3(answers.q3) +
    scoreQ4(answers.q4) +
    scoreQ5(answers.q5) +
    scoreQ6(answers.q6) +
    scoreQ7(answers.q7);

  const score = Math.min(100, Math.max(0, raw));
  const tier = getTier(score);

  return {
    score,
    tier,
    tierLabel: TIER_LABELS[tier],
    tierDescription: TIER_DESCRIPTIONS[tier],
  };
}

export function serializeAnswers(answers: EvaluatorAnswers): string {
  const labels: Record<string, string> = {
    yes: 'Yes',
    no: 'No',
    not_sure: "I'm not sure",
    current: 'Current / Making Payments',
    delinquent: 'Delinquent / Behind on Payments',
    default: 'In Default',
    treasury: 'Referred to Treasury / Collections',
    demand_letter: 'Received Demand Letter',
    dont_know: "I don't know",
    significant: 'Yes, significant hardship',
    some: 'Some difficulty but managing',
    prefer_not: 'Prefer not to say',
    filed_dispute: 'Filed a dispute or appeal with the SBA',
    contacted_sba: 'Contacted the SBA Servicing Center',
    hired_attorney: 'Hired an attorney or consultant',
    submitted_hardship: 'Submitted a hardship request',
    none: 'None of the above',
    reduce_payment: 'Reduce my monthly payment',
    settle: 'Settle or negotiate my balance',
    stop_treasury: 'Stop Treasury collection actions',
    forgiveness: 'Get my loan forgiven or discharged',
    understand: 'Understand my options',
    immediate: 'Immediate — active collection / deadline',
    soon: 'Soon — within 30 days',
    planning: 'Planning ahead — no immediate pressure',
    exploring: 'Just exploring',
  };

  const lines = [
    `Q1 (Loan Type): ${labels[answers.q1 ?? ''] ?? answers.q1}`,
    `Q2 (Loan Status): ${labels[answers.q2 ?? ''] ?? answers.q2}`,
    `Q3 (Treasury Correspondence): ${labels[answers.q3 ?? ''] ?? answers.q3}`,
    `Q4 (Hardship): ${labels[answers.q4 ?? ''] ?? answers.q4}`,
    `Q5 (Actions Taken): ${answers.q5.map(a => labels[a] ?? a).join('; ') || 'None'}`,
    `Q6 (Primary Goal): ${labels[answers.q6 ?? ''] ?? answers.q6}`,
    `Q7 (Urgency): ${labels[answers.q7 ?? ''] ?? answers.q7}`,
  ];

  return lines.join('\n');
}
