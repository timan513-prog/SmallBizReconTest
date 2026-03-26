export type Q1Answer = 'yes' | 'no' | 'not_sure';
export type Q2Answer =
  | 'current'
  | 'delinquent'
  | 'default'
  | 'treasury'
  | 'demand_letter'
  | 'dont_know';
export type Q3Answer = 'yes' | 'no' | 'not_sure';
export type Q4Answer = 'significant' | 'some' | 'no' | 'prefer_not';
export type Q5Answer =
  | 'filed_dispute'
  | 'contacted_sba'
  | 'hired_attorney'
  | 'submitted_hardship'
  | 'none';
export type Q6Answer =
  | 'reduce_payment'
  | 'settle'
  | 'stop_treasury'
  | 'forgiveness'
  | 'understand';
export type Q7Answer = 'immediate' | 'soon' | 'planning' | 'exploring';

export interface EvaluatorAnswers {
  q1: Q1Answer | null;
  q2: Q2Answer | null;
  q3: Q3Answer | null;
  q4: Q4Answer | null;
  q5: Q5Answer[];
  q6: Q6Answer | null;
  q7: Q7Answer | null;
}

export type ScoreTier =
  | 'critical'
  | 'strong'
  | 'moderate'
  | 'early'
  | 'low';

export interface ScoreResult {
  score: number;
  tier: ScoreTier;
  tierLabel: string;
  tierDescription: string;
}

export interface Recommendation {
  text: string;
  href?: string;
}

export interface LeadFormData {
  name: string;
  email: string;
  phone: string;
  situation: string;
}
