import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import EvaluatorProgressBar from './EvaluatorProgressBar';
import EvaluatorQuestion from './EvaluatorQuestion';
import EvaluatorResults from './EvaluatorResults';
import EvaluatorLeadForm from './EvaluatorLeadForm';
import { calculateScore } from '../../utils/caseScoring';
import type {
  EvaluatorAnswers,
  ScoreResult,
  Q1Answer,
  Q2Answer,
  Q3Answer,
  Q4Answer,
  Q5Answer,
  Q6Answer,
  Q7Answer,
} from '../../types/caseEvaluator';

type WizardStep =
  | 1 | 2 | 3 | 4 | 5 | 6 | 7
  | 'disqualified'
  | 'results';

const INITIAL_ANSWERS: EvaluatorAnswers = {
  q1: null,
  q2: null,
  q3: null,
  q4: null,
  q5: [],
  q6: null,
  q7: null,
};

const TOTAL_STEPS = 7;

export default function EvaluatorWizard() {
  const [step, setStep] = useState<WizardStep>(1);
  const [answers, setAnswers] = useState<EvaluatorAnswers>(INITIAL_ANSWERS);
  const [result, setResult] = useState<ScoreResult | null>(null);

  const handleNext = (nextStep: WizardStep) => {
    if (nextStep === 'results') {
      setResult(calculateScore(answers));
    }
    setStep(nextStep);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRetake = () => {
    setStep(1);
    setAnswers(INITIAL_ANSWERS);
    setResult(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (step === 'disqualified') {
    return (
      <div style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 16,
        padding: '36px 32px',
        textAlign: 'center',
        animation: 'evalFadeUp 0.4s ease both',
      }}>
        <h2 style={{
          fontFamily: "'Instrument Serif', Georgia, serif",
          fontSize: 24,
          fontWeight: 400,
          color: '#e8ede2',
          margin: '0 0 16px',
        }}>
          Our services are designed specifically for COVID EIDL borrowers
        </h2>
        <p style={{
          fontFamily: "'DM Sans', system-ui, sans-serif",
          fontSize: 15,
          color: 'rgba(232,237,226,0.6)',
          lineHeight: 1.7,
          maxWidth: 480,
          margin: '0 auto 28px',
        }}>
          If you have questions about other SBA programs or aren't sure what type of loan you have, book a free 30-minute consultation and we'll point you in the right direction.
        </p>
        <a
          href="https://calendly.com/smallbizrecon1/30min"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '13px 26px',
            borderRadius: 10,
            background: 'linear-gradient(135deg, #c8a84e, #e8c870)',
            border: 'none',
            color: '#1a1e14',
            fontSize: 14,
            fontWeight: 700,
            fontFamily: "'DM Sans', system-ui, sans-serif",
            textDecoration: 'none',
            marginBottom: 16,
          }}
        >
          Book a Free Consultation
          <ExternalLink size={14} aria-hidden="true" />
        </a>
        <div>
          <button
            onClick={handleRetake}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'rgba(232,237,226,0.4)',
              fontSize: 13,
              fontFamily: "'DM Sans', system-ui, sans-serif",
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
          >
            ← Start over
          </button>
        </div>
      </div>
    );
  }

  if (step === 'results' && result) {
    return (
      <div>
        <EvaluatorResults result={result} onRetake={handleRetake} />
        <div style={{ marginTop: 32 }}>
          <EvaluatorLeadForm result={result} answers={answers} />
        </div>
        <div style={{
          marginTop: 32,
          padding: '18px 20px',
          borderRadius: 10,
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.05)',
        }}>
          <p style={{
            fontSize: 12,
            color: 'rgba(232,237,226,0.3)',
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontStyle: 'italic',
            lineHeight: 1.65,
            margin: 0,
          }}>
            This tool provides a general assessment for informational purposes only and does not constitute legal, financial, or professional advice. Results are based on the information you provide and are intended to help you understand potential next steps. Every situation is unique. For personalized guidance, consult with a SmallBiz Recon™ specialist. SmallBiz Recon™ is a service of Recon11 Global Systems, LLC.
          </p>
        </div>
      </div>
    );
  }

  const currentStep = step as 1 | 2 | 3 | 4 | 5 | 6 | 7;

  return (
    <div>
      <EvaluatorProgressBar current={currentStep} total={TOTAL_STEPS} />

      {currentStep === 1 && (
        <EvaluatorQuestion
          questionNumber={1}
          label="Did you receive a COVID EIDL loan from the SBA?"
          options={[
            { value: 'yes', label: 'Yes' },
            { value: 'not_sure', label: "I'm not sure" },
            { value: 'no', label: 'No' },
          ]}
          selected={answers.q1}
          isFirst
          onChange={(v) => setAnswers(a => ({ ...a, q1: v as Q1Answer }))}
          onNext={() => {
            if (answers.q1 === 'no') {
              setStep('disqualified');
            } else {
              handleNext(2);
            }
          }}
        />
      )}

      {currentStep === 2 && (
        <EvaluatorQuestion
          questionNumber={2}
          label="What is the current status of your EIDL loan?"
          options={[
            { value: 'current', label: 'Current / Making Payments' },
            { value: 'delinquent', label: 'Delinquent / Behind on Payments' },
            { value: 'default', label: 'In Default' },
            { value: 'treasury', label: 'Referred to Treasury / Collections' },
            { value: 'demand_letter', label: 'Received Demand Letter' },
            { value: 'dont_know', label: "I don't know" },
          ]}
          selected={answers.q2}
          onChange={(v) => setAnswers(a => ({ ...a, q2: v as Q2Answer }))}
          onBack={() => setStep(1)}
          onNext={() => handleNext(3)}
        />
      )}

      {currentStep === 3 && (
        <EvaluatorQuestion
          questionNumber={3}
          label="Have you received any letters from the U.S. Department of the Treasury regarding your EIDL loan?"
          options={[
            { value: 'yes', label: 'Yes, one or more letters' },
            { value: 'no', label: 'No' },
            { value: 'not_sure', label: "I'm not sure" },
          ]}
          selected={answers.q3}
          onChange={(v) => setAnswers(a => ({ ...a, q3: v as Q3Answer }))}
          onBack={() => setStep(2)}
          onNext={() => handleNext(4)}
        />
      )}

      {currentStep === 4 && (
        <EvaluatorQuestion
          questionNumber={4}
          label="Are you currently experiencing financial hardship that affects your ability to repay?"
          options={[
            { value: 'significant', label: 'Yes, significant hardship' },
            { value: 'some', label: 'Some difficulty but managing' },
            { value: 'no', label: 'No, I can repay but have concerns about the loan terms' },
            { value: 'prefer_not', label: 'Prefer not to say' },
          ]}
          selected={answers.q4}
          onChange={(v) => setAnswers(a => ({ ...a, q4: v as Q4Answer }))}
          onBack={() => setStep(3)}
          onNext={() => handleNext(5)}
        />
      )}

      {currentStep === 5 && (
        <EvaluatorQuestion
          questionNumber={5}
          label="Have you already taken any of the following actions?"
          options={[
            { value: 'filed_dispute', label: 'Filed a dispute or appeal with the SBA' },
            { value: 'contacted_sba', label: 'Contacted the SBA Servicing Center' },
            { value: 'hired_attorney', label: 'Hired an attorney or consultant' },
            { value: 'submitted_hardship', label: 'Submitted a hardship request' },
            { value: 'none', label: 'None of the above' },
          ]}
          multiSelect
          selected={answers.q5}
          onChange={(v) => setAnswers(a => ({ ...a, q5: v as Q5Answer[] }))}
          onBack={() => setStep(4)}
          onNext={() => handleNext(6)}
        />
      )}

      {currentStep === 6 && (
        <EvaluatorQuestion
          questionNumber={6}
          label="What is your primary goal?"
          options={[
            { value: 'reduce_payment', label: 'Reduce my monthly payment' },
            { value: 'settle', label: 'Settle or negotiate my balance' },
            { value: 'stop_treasury', label: 'Stop Treasury collection actions' },
            { value: 'forgiveness', label: 'Get my loan forgiven or discharged' },
            { value: 'understand', label: 'Understand my options' },
          ]}
          selected={answers.q6}
          onChange={(v) => setAnswers(a => ({ ...a, q6: v as Q6Answer }))}
          onBack={() => setStep(5)}
          onNext={() => handleNext(7)}
        />
      )}

      {currentStep === 7 && (
        <EvaluatorQuestion
          questionNumber={7}
          label="How urgent is your situation?"
          options={[
            { value: 'immediate', label: 'Immediate — I have a deadline or active collection' },
            { value: 'soon', label: 'Soon — I want to act within 30 days' },
            { value: 'planning', label: 'Planning ahead — No immediate pressure' },
            { value: 'exploring', label: 'Just exploring' },
          ]}
          selected={answers.q7}
          onChange={(v) => setAnswers(a => ({ ...a, q7: v as Q7Answer }))}
          onBack={() => setStep(6)}
          onNext={() => handleNext('results')}
        />
      )}
    </div>
  );
}
