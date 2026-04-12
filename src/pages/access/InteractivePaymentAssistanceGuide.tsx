import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronDown, ChevronRight, CircleCheck as CheckCircle, TriangleAlert as AlertTriangle, Shield, Target, FileText, Phone, Mail, ExternalLink, Sun, Moon, Award, Clock, DollarSign, TrendingUp, CircleAlert as AlertCircle, Copy, Check, Circle as XCircle, Lightbulb, Zap, Play, BookOpen } from 'lucide-react';

/* ──────────────────────────────────────────────
   THEME SYSTEM — Midnight Black + Army Gold + Dark Ranger Green
   ────────────────────────────────────────────── */

const THEMES = {
  dark: {
    '--bg-primary': '#0a0a08',
    '--bg-secondary': 'rgba(16, 16, 12, 0.65)',
    '--bg-card': 'rgba(18, 18, 14, 0.72)',
    '--bg-card-hover': 'rgba(26, 26, 20, 0.82)',
    '--bg-hero': 'linear-gradient(170deg, rgba(32,38,18,0.88) 0%, rgba(10,10,8,0.98) 100%)',
    '--border-primary': 'rgba(181, 148, 56, 0.08)',
    '--border-hover': 'rgba(181, 148, 56, 0.3)',
    '--border-gold': 'rgba(181, 148, 56, 0.2)',
    '--text-primary': '#f0eee6',
    '--text-secondary': '#a8a890',
    '--text-muted': '#72725e',
    '--accent-green': '#4a6b2a',
    '--accent-green-bright': '#6a9240',
    '--accent-gold': '#b59438',
    '--accent-gold-dim': 'rgba(181,148,56,0.15)',
    '--accent-red': '#b54a4a',
    '--accent-blue': '#4a7ab5',
    '--glass-blur': 'blur(28px)',
    '--shadow-card': '0 4px 40px rgba(0,0,0,0.3)',
    '--shadow-card-hover': '0 28px 72px rgba(0,0,0,0.5)',
    '--shadow-gold': '0 0 60px rgba(181,148,56,0.06)',
    '--grid-opacity': '0.02',
    '--particle-opacity': '0.18',
    '--overlay-green': 'rgba(74,107,42,0.05)',
    '--overlay-gold': 'rgba(181,148,56,0.025)',
  },
  light: {
    '--bg-primary': '#f5f3ed',
    '--bg-secondary': 'rgba(255, 255, 255, 0.75)',
    '--bg-card': 'rgba(255, 255, 255, 0.8)',
    '--bg-card-hover': 'rgba(255, 255, 255, 0.95)',
    '--bg-hero': 'linear-gradient(170deg, #2a3418 0%, #1a1e10 100%)',
    '--border-primary': 'rgba(181, 148, 56, 0.12)',
    '--border-hover': 'rgba(181, 148, 56, 0.35)',
    '--border-gold': 'rgba(181, 148, 56, 0.2)',
    '--text-primary': '#1a1e10',
    '--text-secondary': '#5a5e48',
    '--text-muted': '#8a8e78',
    '--accent-green': '#3a5420',
    '--accent-green-bright': '#4a6b2a',
    '--accent-gold': '#8a6e20',
    '--accent-gold-dim': 'rgba(181,148,56,0.1)',
    '--accent-red': '#8a3a3a',
    '--accent-blue': '#3a5a8a',
    '--glass-blur': 'blur(22px)',
    '--shadow-card': '0 4px 28px rgba(0,0,0,0.07)',
    '--shadow-card-hover': '0 24px 56px rgba(0,0,0,0.12)',
    '--shadow-gold': '0 0 48px rgba(181,148,56,0.05)',
    '--grid-opacity': '0.03',
    '--particle-opacity': '0.1',
    '--overlay-green': 'rgba(74,107,42,0.03)',
    '--overlay-gold': 'rgba(181,148,56,0.02)',
  },
};

/* ──────────────────────────────────────────────
   AMBIENT EFFECTS
   ────────────────────────────────────────────── */

function PremiumGrid() {
  return (
    <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0, opacity: 'var(--grid-opacity)' }}>
      <svg width="100%" height="100%">
        <defs>
          <pattern id="paGuideGrid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="var(--accent-gold)" strokeWidth="0.4" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#paGuideGrid)" />
      </svg>
    </div>
  );
}

function PremiumParticles() {
  return (
    <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
      {Array.from({ length: 18 }).map((_, i) => {
        const isGold = i % 3 === 0;
        return (
          <div key={i} style={{
            position: 'absolute',
            width: `${1 + Math.random() * 2.5}px`,
            height: `${1 + Math.random() * 2.5}px`,
            borderRadius: '50%',
            background: isGold ? `rgba(181,148,56, var(--particle-opacity))` : `rgba(106,146,64, calc(var(--particle-opacity) * 0.5))`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `pFloat ${8 + Math.random() * 16}s ease-in-out infinite`,
            animationDelay: `${Math.random() * -14}s`,
            boxShadow: isGold ? '0 0 5px rgba(181,148,56,0.2)' : 'none',
          }} />
        );
      })}
    </div>
  );
}

/* ──────────────────────────────────────────────
   DATA — All from the uploaded PDF
   ────────────────────────────────────────────── */

type MissionStep = {
  id: number;
  title: string;
  subtitle: string;
  content: string[];
  commandNote?: string;
  sabbiTip?: string;
};

const MISSION_STEPS: MissionStep[] = [
  {
    id: 1,
    title: 'Log Into MySBA',
    subtitle: 'Access your COVID-EIDL account',
    content: [
      'Access your COVID-EIDL account through the MySBA Loan Portal using your existing login credentials.',
      'Portal URL: https://lending.sba.gov',
    ],
    commandNote: 'Always verify you are on the official SBA website before entering any login or loan information.',
  },
  {
    id: 2,
    title: 'Verify Loan Status',
    subtitle: 'Confirm eligibility requirements',
    content: [
      'Navigate to your loan summary dashboard and confirm:',
      '• Loan remains under SBA servicing',
      '• Delinquency is under 90 days',
      '• Loan is not charged off',
      '• You are within eligibility thresholds',
    ],
    sabbiTip: 'Eligibility depends on current servicing status, not just payment history.',
  },
  {
    id: 3,
    title: 'Review Account Information',
    subtitle: 'Understand your current position',
    content: [
      'Before initiating any request, review:',
      '• Current monthly payment amount',
      '• Outstanding balance',
      '• Past-due status (if applicable)',
      '• Any recent portal notifications or servicing messages',
    ],
    commandNote: 'Understanding your account position helps you prepare an accurate explanation.',
  },
  {
    id: 4,
    title: 'Prepare Your Explanation',
    subtitle: 'Draft your hardship narrative offline',
    content: [
      'Before entering information into the portal, prepare your explanation offline.',
      'Include:',
      '• Cause of temporary hardship',
      '• Why the issue is short-term',
      '• Recovery steps already underway',
      '• Expected stabilization timeline',
    ],
    commandNote: 'Writing your explanation in advance helps ensure clarity and avoids rushed submissions.',
    sabbiTip: 'Strong submissions are prepared before logging into the portal.',
  },
  {
    id: 5,
    title: 'Submit Your Request',
    subtitle: 'Complete the portal submission',
    content: [
      'Follow the portal prompts to submit your Payment Assistance request.',
      'Before submitting, confirm:',
      '✔ Loan information is correct',
      '✔ Contact details are accurate',
      '✔ Explanation is clear and professional',
      '✔ Language reflects temporary hardship',
    ],
    commandNote: 'Once submitted, your request enters SBA servicing review.',
  },
  {
    id: 6,
    title: 'Monitor Communications',
    subtitle: 'Stay engaged after submission',
    content: [
      'After submission:',
      '• Check your MySBA message center regularly',
      '• Watch for email notifications',
      '• Respond promptly if SBA requests clarification or documentation',
    ],
    sabbiTip: 'Delays in response may slow review timelines.',
  },
  {
    id: 7,
    title: 'Post-Approval Transition',
    subtitle: 'Plan for payment resumption',
    content: [
      'If approved:',
      '• Monthly payments reduce to 50%',
      '• Interest continues accruing',
      '• Full payments resume after six months',
      'Use this period to stabilize operations and prepare for payment resumption.',
    ],
    sabbiTip: 'Approval is a stabilization phase, not a pause on responsibility. Borrowers who plan ahead during the reduced payment period are better positioned when full payments return.',
  },
];

type HardshipExample = {
  title: string;
  body: string;
  strength?: string;
};

const BASIC_EXAMPLES: HardshipExample[] = [
  {
    title: 'Temporary Revenue Disruption (Client Loss)',
    body: 'Our business experienced a temporary reduction in revenue after the unexpected loss of a major client in March. This client represented approximately 35 percent of our monthly income. Since that time, we have secured two replacement contracts that will begin generating revenue within the next 60 to 90 days. While our long-term outlook remains stable, the short-term gap in cash flow has created difficulty maintaining full loan payments. We are requesting Payment Assistance to stabilize operations during this transition period.',
  },
  {
    title: 'Seasonal Cash-Flow Slowdown',
    body: 'Our business operates in a seasonal industry where revenue typically declines during the late summer months. This year, the seasonal slowdown was more significant than projected, resulting in a temporary reduction in operating cash flow. Historically, revenue levels return to normal during the upcoming quarter. The request for Payment Assistance is intended to bridge this short-term seasonal gap while maintaining compliance with SBA servicing requirements.',
  },
  {
    title: 'Supply Chain / Operational Disruption',
    body: 'Our business experienced a temporary supply chain disruption that delayed product delivery and reduced incoming revenue over the past two months. The issue has now been resolved with a new vendor agreement, and production has resumed. However, the short-term interruption created a cash-flow strain. Payment Assistance would allow us to stabilize while outstanding orders are fulfilled and revenue returns to expected levels.',
  },
];

const STRONG_EXAMPLES: HardshipExample[] = [
  {
    title: 'Operational Recovery Already Underway',
    body: 'Our business experienced a short-term revenue decline due to an unexpected pause in one of our primary contracts earlier this year. Since that time, we have secured new agreements that are scheduled to begin generating income within the next two billing cycles. While our long-term outlook remains stable, the temporary gap in cash flow has made maintaining full payments difficult at this time. We are requesting Payment Assistance to maintain compliance while revenue normalizes.',
    strength: 'Clear cause, recovery already in motion, realistic timeline.',
  },
  {
    title: 'Measured Financial Impact With Defined Timeline',
    body: 'Over the past quarter, our business experienced a temporary increase in operating expenses related to equipment replacement and vendor delays. These costs were necessary to maintain operations but created a short-term cash-flow imbalance. The equipment has now been installed and production has returned to normal levels, with revenue expected to stabilize over the next several months. Payment Assistance would allow us to manage this temporary adjustment period while maintaining active servicing compliance.',
    strength: 'Specific operational reason, demonstrates stability and forward movement.',
  },
  {
    title: 'Seasonal Business with Historical Recovery Pattern',
    body: "Our business operates on a seasonal revenue cycle, and this year's off-season period extended longer than anticipated due to market conditions. Historically, our revenue increases significantly during the upcoming quarter, and current bookings indicate that this pattern is returning. We are requesting Payment Assistance to bridge this seasonal transition period.",
    strength: 'Shows historical pattern, avoids panic language, emphasizes recovery.',
  },
  {
    title: 'Temporary Cash-Flow Gap With Documented Recovery Plan',
    body: 'Our business experienced a short-term cash-flow disruption after several client payments were delayed beyond their normal billing cycle. While the contracts remain active and receivables are expected, the timing of these payments has created a temporary gap in available operating funds. We have already implemented adjustments to reduce expenses and stabilize operations while awaiting incoming revenue. We are requesting Payment Assistance to maintain compliance during this temporary transition period.',
    strength: 'Specific and believable cause, shows proactive action taken, emphasizes temporary nature.',
  },
];

const LANGUAGE_BANK_SET_1 = [
  'Our business remains operational and financially viable, however we are experiencing a temporary cash-flow constraint.',
  'The current hardship is tied to a short-term disruption rather than a permanent decline in operations.',
  'We have taken internal steps to stabilize expenses while revenue normalizes.',
  'Based on current projections, we expect financial conditions to improve within the requested assistance period.',
  'This request is intended to maintain compliance while operational recovery continues.',
  'Our objective is to remain current and avoid further delinquency while addressing this temporary challenge.',
  'We anticipate resuming full payment capacity once normal revenue cycles return.',
  'The underlying business remains active, and this request reflects a temporary adjustment rather than long-term distress.',
];

const LANGUAGE_BANK_SET_2 = [
  'We are submitting this request proactively to remain aligned with SBA servicing expectations.',
  'Our goal is to maintain open communication and prevent escalation while we stabilize operations.',
  'We have implemented operational adjustments designed to restore normal cash flow.',
  'Current forecasts indicate improvement within the next operating cycle.',
  'We are actively working toward restoring full payment capacity during the six-month assistance period.',
  'This request reflects a short-term financial adjustment, not an inability to repay.',
  'We remain committed to fulfilling our loan obligations and maintaining compliance with servicing requirements.',
  'Payment Assistance would provide the temporary flexibility needed while confirmed recovery steps take effect.',
];

const WHAT_NOT_TO_SAY = [
  { category: 'Sounds Final or Permanent', bad: ['Our business is failing.', 'We will never recover.', "We can't keep up with payments anymore.", 'There is no way we can pay this loan back.'] },
  { category: 'Emotional or Urgent Appeals', bad: ["We're desperate for help.", 'Please save our business.', 'This is our last chance.', 'We are begging for relief.'] },
  { category: 'Blame-Focused Statements', bad: ['The government caused this.', 'Our customers ruined us.', 'Everything is broken because of the economy.'] },
  { category: 'Vague or Generic', bad: ['Business has just been bad.', "We're having problems.", 'Sales dropped for no reason.'] },
  { category: 'Suggests Non-Compliance', bad: ['We stopped paying because we had to.', 'We ignored payments while figuring things out.', "We don't plan to resume payments soon."] },
];

const CHECKLIST_ITEMS = [
  'Loan number available',
  'Business legal name and contact details',
  'Clear explanation of temporary hardship',
  'Reason the hardship is short-term',
  'Expected recovery timeline',
  'Current financial awareness (cash flow, revenue outlook)',
  'Access to MySBA login credentials',
];

function renderWithLinks(text: string) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlRegex);
  return parts.map((part, i) => {
    if (part.match(/^https?:\/\//)) {
      return (
        <a
          key={i}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: 'var(--accent-gold)',
            textDecoration: 'underline',
            textUnderlineOffset: 3,
            textDecorationColor: 'rgba(181,148,56,0.4)',
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-green-bright)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--accent-gold)')}
        >
          {part}
        </a>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

/* ──────────────────────────────────────────────
   COMPONENTS
   ────────────────────────────────────────────── */

const CopyButton: React.FC<{ text: string }> = ({ text }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    try {
      if (navigator?.clipboard?.writeText) {
        navigator.clipboard.writeText(text).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }).catch(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        });
      }
    } catch {
      // clipboard not available in this environment
    }
  };
  return (
    <button
      onClick={handleCopy}
      type="button"
      title="Copy to clipboard"
      style={{
        background: 'none', border: 'none', cursor: 'pointer',
        color: copied ? 'var(--accent-green-bright)' : 'var(--text-muted)',
        transition: 'color 0.3s ease', padding: 4, flexShrink: 0,
      }}
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
    </button>
  );
};

const SabbiTip: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{
    display: 'flex', gap: 10, marginTop: 14, padding: '12px 16px',
    borderRadius: 12,
    background: 'var(--accent-gold-dim)',
    border: '1px solid var(--border-gold)',
  }}>
    <Lightbulb size={16} style={{ color: 'var(--accent-gold)', flexShrink: 0, marginTop: 2 }} />
    <p style={{ fontSize: 13, color: 'var(--text-primary)', fontFamily: 'var(--font-body)', lineHeight: 1.6, margin: 0 }}>
      <strong style={{ color: 'var(--accent-gold)' }}>Sabbi Tactical Tip:</strong> {children}
    </p>
  </div>
);

const CommandNote: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{
    display: 'flex', gap: 10, marginTop: 14, padding: '12px 16px',
    borderRadius: 12,
    background: 'rgba(74,107,42,0.08)',
    border: '1px solid rgba(74,107,42,0.2)',
  }}>
    <Zap size={16} style={{ color: 'var(--accent-green-bright)', flexShrink: 0, marginTop: 2 }} />
    <p style={{ fontSize: 13, color: 'var(--text-primary)', fontFamily: 'var(--font-body)', lineHeight: 1.6, margin: 0 }}>
      <strong style={{ color: 'var(--accent-green-bright)' }}>Command Note:</strong> {children}
    </p>
  </div>
);

/* ──────────────────────────────────────────────
   SECTION: Expandable
   ────────────────────────────────────────────── */

const ExpandableSection: React.FC<{
  id: string;
  icon: React.ReactNode;
  title: string;
  badge?: string;
  badgeColor?: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}> = ({ id, icon, title, badge, badgeColor, isOpen, onToggle, children }) => (
  <div id={id} className="scroll-mt-24" style={{
    background: 'var(--bg-card)',
    backdropFilter: 'var(--glass-blur)',
    WebkitBackdropFilter: 'var(--glass-blur)',
    borderRadius: 20,
    border: '1px solid var(--border-primary)',
    overflow: 'hidden',
    boxShadow: 'var(--shadow-card)',
    transition: 'border-color 0.3s ease',
  }}>
    <button onClick={onToggle} type="button" style={{
      width: '100%', padding: '22px 28px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: 'transparent', border: 'none',
      borderBottom: isOpen ? '1px solid var(--border-primary)' : 'none',
      cursor: 'pointer', transition: 'all 0.3s ease',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{
          width: 40, height: 40, borderRadius: 12,
          background: 'var(--accent-gold-dim)',
          border: '1px solid var(--border-gold)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {icon}
        </div>
        <h3 style={{
          fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 400,
          color: 'var(--text-primary)', margin: 0,
        }}>
          {title}
        </h3>
        {badge && (
          <span style={{
            fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 6,
            background: `${badgeColor || 'var(--accent-gold)'}22`,
            border: `1px solid ${badgeColor || 'var(--accent-gold)'}44`,
            color: badgeColor || 'var(--accent-gold)',
            textTransform: 'uppercase', fontFamily: 'var(--font-body)', letterSpacing: '0.06em',
          }}>
            {badge}
          </span>
        )}
      </div>
      <ChevronDown size={22} style={{
        color: 'var(--text-secondary)',
        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
        transition: 'transform 0.4s cubic-bezier(0.23,1,0.32,1)',
      }} />
    </button>
    {isOpen && <div style={{ padding: '24px 28px' }}>{children}</div>}
  </div>
);

/* ──────────────────────────────────────────────
   MAIN PAGE
   ────────────────────────────────────────────── */

const InteractivePaymentAssistanceGuide: React.FC = () => {
  const [theme, setTheme] = useState('dark');
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());
  const [openSections, setOpenSections] = useState<Set<string>>(new Set(['mission']));
  const [exampleTab, setExampleTab] = useState<'basic' | 'strong'>('strong');

  const isDark = theme === 'dark';
  const vars = THEMES[theme as keyof typeof THEMES];
  const cssVarString = Object.entries(vars).map(([k, v]) => `${k}: ${v};`).join('\n');

  const progress = Math.round((completedSteps.size / MISSION_STEPS.length) * 100);
  const checklistProgress = Math.round((checkedItems.size / CHECKLIST_ITEMS.length) * 100);

  const toggleSection = (id: string) => {
    const next = new Set(openSections);
    if (next.has(id)) next.delete(id); else next.add(id);
    setOpenSections(next);
  };

  const markStepComplete = (stepId: number) => {
    const next = new Set(completedSteps);
    if (next.has(stepId)) next.delete(stepId); else next.add(stepId);
    setCompletedSteps(next);
  };

  const toggleChecklist = (idx: number) => {
    const next = new Set(checkedItems);
    if (next.has(idx)) next.delete(idx); else next.add(idx);
    setCheckedItems(next);
  };

  return (
    <>
      <style>{`
        :root {
          --font-display: 'Instrument Serif', Georgia, serif;
          --font-body: 'DM Sans', sans-serif;
          ${cssVarString}
        }
        @keyframes pFloat {
          0%, 100% { transform: translate(0,0) scale(1); opacity:0.3; }
          25% { transform: translate(14px,-20px) scale(1.18); opacity:0.65; }
          50% { transform: translate(-10px,-34px) scale(0.82); opacity:0.18; }
          75% { transform: translate(18px,-14px) scale(1.1); opacity:0.5; }
        }
        @keyframes fadeSlideUp { from { opacity:0; transform:translateY(32px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeSlideIn { from { opacity:0; transform:translateY(22px); } to { opacity:1; transform:translateY(0); } }
        @keyframes goldPulse { 0%, 100% { opacity:0.4; } 50% { opacity:0.8; } }
        @keyframes shimmerSlide { 0% { transform:translateX(-100%); } 100% { transform:translateX(100%); } }
        @keyframes textReveal { from { opacity:0; transform:translateY(16px); filter:blur(4px); } to { opacity:1; transform:translateY(0); filter:blur(0); } }
        @keyframes progressPulse { 0%, 100% { box-shadow: 0 0 0 0 rgba(181,148,56,0.3); } 50% { box-shadow: 0 0 12px 4px rgba(181,148,56,0.15); } }
        * { box-sizing: border-box; }
        .pa-guide-page {
          min-height: 100vh; font-family: var(--font-body);
          background: var(--bg-primary); color: var(--text-primary);
          overflow-x: hidden; position: relative;
          transition: background 0.5s ease, color 0.4s ease;
        }
        .pa-guide-page::before {
          content: ''; position: fixed; inset: 0;
          background: radial-gradient(ellipse 60% 45% at 25% 10%, var(--overlay-gold), transparent),
                      radial-gradient(ellipse 55% 40% at 75% 90%, var(--overlay-green), transparent);
          pointer-events: none; z-index: 0; transition: background 0.5s ease;
        }
        .pa-guide-page a { color: inherit; }
        @media (max-width: 768px) {
          .pa-guide-hero-title { font-size: 28px !important; }
          .pa-guide-hero-inner { padding: 36px 16px 48px !important; }
          .pa-step-sidebar { display: none !important; }
          .pa-step-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div className="pa-guide-page">
        <PremiumGrid />
        <PremiumParticles />

        <div style={{ position: 'relative', zIndex: 1 }}>

          {/* ═══════════ HERO ═══════════ */}
          <div style={{
            position: 'relative', overflow: 'hidden',
            background: 'var(--bg-hero)',
            borderBottom: '1px solid var(--border-gold)',
            animation: 'fadeSlideUp 0.7s ease-out both',
          }}>
            <div style={{
              position: 'absolute', top: '30%', left: '50%',
              transform: 'translate(-50%, -50%)', width: 450, height: 450, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(181,148,56,0.07) 0%, transparent 55%)',
              pointerEvents: 'none', animation: 'goldPulse 6s ease-in-out infinite',
            }} />

            <div className="pa-guide-hero-inner" style={{
              maxWidth: 1200, margin: '0 auto', padding: '48px 32px 72px',
              position: 'relative', zIndex: 1,
            }}>
              {/* Top bar */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 48 }}>
                <Link to="/access/payment-assistance" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  color: '#a0b888', fontSize: 14, fontWeight: 600,
                  textDecoration: 'none', fontFamily: 'var(--font-body)',
                }}>
                  <ArrowLeft size={16} />
                  Back to Toolkit Dashboard
                </Link>
                <button type="button" onClick={() => setTheme(isDark ? 'light' : 'dark')} style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '8px 16px', borderRadius: 12,
                  background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)',
                  color: '#a0b888', fontSize: 13, fontWeight: 600,
                  cursor: 'pointer', fontFamily: 'var(--font-body)',
                }}>
                  {isDark ? <Sun size={14} /> : <Moon size={14} />}
                  {isDark ? 'Light' : 'Dark'}
                </button>
              </div>

              {/* Icon */}
              <div style={{
                width: 72, height: 72, borderRadius: 20,
                background: 'linear-gradient(135deg, rgba(181,148,56,0.2), rgba(181,148,56,0.05))',
                border: '1px solid rgba(181,148,56,0.28)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 24px', boxShadow: '0 0 40px rgba(181,148,56,0.06)',
                animation: 'textReveal 0.6s ease-out 0.2s both',
              }}>
                <Target size={34} color="#b59438" strokeWidth={1.5} />
              </div>

              <div style={{ textAlign: 'center', marginBottom: 14, animation: 'textReveal 0.5s ease-out 0.25s both' }}>
                <span style={{
                  padding: '5px 16px', borderRadius: 100,
                  background: 'rgba(181,148,56,0.1)', border: '1px solid rgba(181,148,56,0.22)',
                  fontSize: 11, fontWeight: 700, color: '#b59438',
                  fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.1em',
                }}>
                  ⚡ Interactive Mission Guide
                </span>
              </div>

              <h1 className="pa-guide-hero-title" style={{
                fontFamily: 'var(--font-display)', fontSize: 46, fontWeight: 400,
                textAlign: 'center', color: '#eae8e0', lineHeight: 1.15,
                letterSpacing: '-0.02em', marginBottom: 16,
                animation: 'textReveal 0.6s ease-out 0.3s both',
              }}>
                Payment Assistance{' '}
                <span style={{ fontStyle: 'italic', color: '#b59438' }}>Mission Guide</span>
              </h1>

              <p style={{
                textAlign: 'center', fontSize: 16, color: 'rgba(234,232,224,0.7)',
                lineHeight: 1.75, maxWidth: 620, margin: '0 auto 28px',
                fontFamily: 'var(--font-body)', animation: 'textReveal 0.6s ease-out 0.35s both',
              }}>
                Hardship Accommodation Plans are no longer active. The SBA replaced them with the Payment Assistance Program for eligible COVID-EIDL borrowers.
              </p>

              {/* Progress bar */}
              <div style={{
                maxWidth: 400, margin: '0 auto',
                animation: 'fadeSlideIn 0.5s ease-out 0.5s both',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: 12, color: '#a0b888', fontWeight: 600, fontFamily: 'var(--font-body)' }}>
                    Mission Progress
                  </span>
                  <span style={{ fontSize: 12, color: 'var(--accent-gold)', fontWeight: 700, fontFamily: 'var(--font-body)' }}>
                    {progress}%
                  </span>
                </div>
                <div style={{
                  height: 6, borderRadius: 3,
                  background: 'rgba(255,255,255,0.06)',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    height: '100%', borderRadius: 3,
                    background: progress === 100
                      ? 'linear-gradient(90deg, #4a6b2a, #6a9240)'
                      : 'linear-gradient(90deg, #b59438, #d4b060)',
                    width: `${progress}%`,
                    transition: 'width 0.6s cubic-bezier(0.23,1,0.32,1)',
                    animation: progress > 0 ? 'progressPulse 2s ease-in-out infinite' : 'none',
                  }} />
                </div>
                <div style={{
                  textAlign: 'center', marginTop: 8, fontSize: 11,
                  color: 'var(--text-muted)', fontFamily: 'var(--font-body)',
                }}>
                  {completedSteps.size} of {MISSION_STEPS.length} steps completed
                </div>
              </div>
            </div>
          </div>

          {/* ═══════════ PROGRAM ALERT ═══════════ */}
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px 0' }}>
            <div style={{
              padding: '20px 24px', borderRadius: 16,
              background: 'rgba(181,74,74,0.06)',
              border: '1px solid rgba(181,74,74,0.15)',
              display: 'flex', gap: 14, alignItems: 'flex-start',
              animation: 'fadeSlideUp 0.7s ease-out 0.1s both',
            }}>
              <AlertTriangle size={20} style={{ color: 'var(--accent-red)', flexShrink: 0, marginTop: 2 }} />
              <div>
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 16, color: 'var(--text-primary)', margin: '0 0 6px' }}>
                  Program Update — Important
                </h4>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7, fontFamily: 'var(--font-body)', margin: 0 }}>
                  Payment Assistance is a temporary stabilization mechanism — not a forgiveness program, modification, or permanent restructuring tool. It buys operational time, not debt reduction.
                </p>
              </div>
            </div>
          </div>

          {/* ═══════════ MISSION BRIEFING VIDEO ═══════════ */}
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px 0' }}>
            <div style={{
              position: 'relative',
              overflow: 'hidden',
              background: 'var(--bg-card)',
              backdropFilter: 'var(--glass-blur)',
              WebkitBackdropFilter: 'var(--glass-blur)',
              borderRadius: 24,
              border: '1px solid var(--border-gold)',
              boxShadow: 'var(--shadow-gold)',
              animation: 'fadeSlideUp 0.7s ease-out 0.15s both',
            }}>
              {/* Shimmer line */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 1,
                overflow: 'hidden', zIndex: 2,
              }}>
                <div style={{
                  width: '50%', height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(181,148,56,0.35), transparent)',
                  animation: 'shimmerSlide 4s ease-in-out infinite',
                }} />
              </div>

              {/* Header */}
              <div style={{ padding: '24px 28px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 12,
                  background: 'var(--accent-gold-dim)',
                  border: '1px solid var(--border-gold)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Play size={18} color="var(--accent-gold)" />
                </div>
                <div>
                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 22, fontWeight: 400,
                    color: 'var(--text-primary)', margin: 0,
                  }}>
                    Mission Briefing
                  </h3>
                  <p style={{
                    fontSize: 12, color: 'var(--text-muted)',
                    fontFamily: 'var(--font-body)', margin: '2px 0 0',
                  }}>
                    Watch before proceeding — overview of the Payment Assistance process
                  </p>
                </div>
              </div>

              {/* Video player */}
              <div style={{ padding: '20px 28px 28px' }}>
                <div style={{
                  position: 'relative',
                  borderRadius: 16,
                  overflow: 'hidden',
                  border: '1px solid var(--border-primary)',
                  background: '#000',
                  aspectRatio: '16 / 9',
                }}>
                  <video
                    controls
                    preload="metadata"
                    playsInline
                    style={{
                      width: '100%',
                      height: '100%',
                      display: 'block',
                      objectFit: 'contain',
                      borderRadius: 16,
                    }}
                    poster=""
                  >
                    <source
                      src="https://zrktinvphjmalvrsjmii.supabase.co/storage/v1/object/sign/SmallBiz%20Recon%20Paid%20Templates/COVID_EIDL_Black_Label_Elite_49MB.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xZmUwNzEzYS00ZTVhLTQ3ZWYtODNlNS0xYjgxOWVlMjk2NzgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJTbWFsbEJpeiBSZWNvbiBQYWlkIFRlbXBsYXRlcy9DT1ZJRF9FSURMX0JsYWNrX0xhYmVsX0VsaXRlXzQ5TUIubXA0IiwiaWF0IjoxNzcyMDE4OTk1LCJleHAiOjE4MzAyNTI1OTV9.r3rgmeaYB5B2q82cE2J5S_ZdalhA5AY53EoP5NEoZ28"
                      type="video/mp4"
                    />
                    Your browser does not support the video element.
                  </video>
                </div>
              </div>
            </div>
          </div>

          {/* ═══════════ KEY FACTS BAR ═══════════ */}
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 24px 0' }}>
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14,
              animation: 'fadeSlideUp 0.7s ease-out 0.2s both',
            }}>
              {[
                { icon: <DollarSign size={18} />, val: '50%', label: 'Payment Reduction' },
                { icon: <Clock size={18} />, val: '6 mo', label: 'Duration' },
                { icon: <TrendingUp size={18} />, val: '< 90 days', label: 'Delinquency Limit' },
                { icon: <Shield size={18} />, val: '5 years', label: 'Usage Cycle' },
              ].map((fact, i) => (
                <div key={i} style={{
                  background: 'var(--bg-card)', backdropFilter: 'var(--glass-blur)',
                  border: '1px solid var(--border-primary)', borderRadius: 16,
                  padding: '18px 14px', textAlign: 'center',
                }}>
                  <div style={{ color: 'var(--accent-gold)', marginBottom: 6 }}>{fact.icon}</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--accent-gold)' }}>{fact.val}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-body)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', marginTop: 2 }}>{fact.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ═══════════ 7-STEP MISSION ═══════════ */}
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px 0' }}>
            <ExpandableSection
              id="mission"
              icon={<Target size={20} color="#b59438" />}
              title="7-Step Payment Assistance Process"
              badge="Interactive"
              isOpen={openSections.has('mission')}
              onToggle={() => toggleSection('mission')}
            >
              <div className="pa-step-layout" style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 24 }}>
                {/* Sidebar nav */}
                <div className="pa-step-sidebar" style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {MISSION_STEPS.map((step) => {
                    const isActive = activeStep === step.id;
                    const isComplete = completedSteps.has(step.id);
                    return (
                      <button key={step.id} type="button" onClick={() => setActiveStep(step.id)} style={{
                        display: 'flex', alignItems: 'center', gap: 10,
                        padding: '10px 14px', borderRadius: 12,
                        background: isActive ? 'var(--accent-gold-dim)' : 'transparent',
                        border: isActive ? '1px solid var(--border-gold)' : '1px solid transparent',
                        cursor: 'pointer', transition: 'all 0.3s ease', textAlign: 'left',
                      }}>
                        <div style={{
                          width: 26, height: 26, borderRadius: 8, flexShrink: 0,
                          background: isComplete ? 'var(--accent-green-bright)' : isActive ? 'var(--accent-gold)' : 'var(--bg-secondary)',
                          border: `1px solid ${isComplete ? 'var(--accent-green-bright)' : isActive ? 'var(--accent-gold)' : 'var(--border-primary)'}`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 11, fontWeight: 700, fontFamily: 'var(--font-body)',
                          color: isComplete || isActive ? '#fff' : 'var(--text-muted)',
                        }}>
                          {isComplete ? <Check size={13} /> : step.id}
                        </div>
                        <span style={{
                          fontSize: 12, fontWeight: 600, fontFamily: 'var(--font-body)',
                          color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                          lineHeight: 1.3,
                        }}>
                          {step.title}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Content area */}
                <div>
                  {MISSION_STEPS.map((step) => {
                    if (activeStep !== 0 && activeStep !== step.id) return null;
                    if (activeStep === 0 && step.id !== 1) return null;
                    const isComplete = completedSteps.has(step.id);

                    return (
                      <div key={step.id} style={{
                        background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)',
                        borderRadius: 16, padding: 28, animation: 'fadeSlideIn 0.3s ease both',
                      }}>
                        {/* Step header */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                              <span style={{
                                fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 6,
                                background: 'var(--accent-gold-dim)', border: '1px solid var(--border-gold)',
                                color: 'var(--accent-gold)', fontFamily: 'var(--font-body)',
                              }}>
                                STEP {step.id}
                              </span>
                              {isComplete && (
                                <span style={{
                                  fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 6,
                                  background: 'rgba(106,146,64,0.12)', border: '1px solid rgba(106,146,64,0.3)',
                                  color: 'var(--accent-green-bright)', fontFamily: 'var(--font-body)',
                                }}>
                                  ✓ COMPLETE
                                </span>
                              )}
                            </div>
                            <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--text-primary)', margin: 0 }}>
                              {step.title}
                            </h4>
                            <p style={{ fontSize: 13, color: 'var(--text-muted)', fontFamily: 'var(--font-body)', margin: '4px 0 0' }}>
                              {step.subtitle}
                            </p>
                          </div>
                        </div>

                        {/* Step content */}
                        <div style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8, fontFamily: 'var(--font-body)' }}>
                          {step.content.map((line, li) => (
                            <p key={li} style={{ margin: '6px 0' }}>{renderWithLinks(line)}</p>
                          ))}
                        </div>

                        {step.commandNote && <CommandNote>{step.commandNote}</CommandNote>}
                        {step.sabbiTip && <SabbiTip>{step.sabbiTip}</SabbiTip>}

                        {/* Navigation */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--border-primary)' }}>
                          <button type="button" onClick={() => markStepComplete(step.id)} style={{
                            display: 'flex', alignItems: 'center', gap: 8,
                            padding: '10px 20px', borderRadius: 12,
                            background: isComplete ? 'rgba(106,146,64,0.12)' : 'var(--accent-gold-dim)',
                            border: `1px solid ${isComplete ? 'rgba(106,146,64,0.3)' : 'var(--border-gold)'}`,
                            color: isComplete ? 'var(--accent-green-bright)' : 'var(--accent-gold)',
                            fontSize: 13, fontWeight: 600, fontFamily: 'var(--font-body)',
                            cursor: 'pointer', transition: 'all 0.3s ease',
                          }}>
                            {isComplete ? <Check size={14} /> : <CheckCircle size={14} />}
                            {isComplete ? 'Completed' : 'Mark Complete'}
                          </button>

                          <div style={{ display: 'flex', gap: 8 }}>
                            {step.id > 1 && (
                              <button type="button" onClick={() => setActiveStep(step.id - 1)} style={{
                                padding: '10px 16px', borderRadius: 12,
                                background: 'transparent', border: '1px solid var(--border-primary)',
                                color: 'var(--text-secondary)', fontSize: 13, fontWeight: 600,
                                fontFamily: 'var(--font-body)', cursor: 'pointer',
                                display: 'flex', alignItems: 'center', gap: 6,
                              }}>
                                <ArrowLeft size={14} /> Previous
                              </button>
                            )}
                            {step.id < MISSION_STEPS.length && (
                              <button type="button" onClick={() => setActiveStep(step.id + 1)} style={{
                                padding: '10px 16px', borderRadius: 12,
                                background: 'linear-gradient(135deg, rgba(74,107,42,0.35), rgba(74,107,42,0.12))',
                                border: '1px solid rgba(74,107,42,0.45)',
                                color: 'var(--text-primary)', fontSize: 13, fontWeight: 600,
                                fontFamily: 'var(--font-body)', cursor: 'pointer',
                                display: 'flex', alignItems: 'center', gap: 6,
                              }}>
                                Next <ChevronRight size={14} />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </ExpandableSection>
          </div>

          {/* ═══════════ HARDSHIP EXAMPLES ═══════════ */}
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 24px 0' }}>
            <ExpandableSection
              id="examples"
              icon={<FileText size={20} color="#b59438" />}
              title="Hardship Explanation Examples"
              badge="Templates"
              isOpen={openSections.has('examples')}
              onToggle={() => toggleSection('examples')}
            >
              {/* Tab toggle */}
              <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
                {(['basic', 'strong'] as const).map((tab) => (
                  <button key={tab} type="button" onClick={() => setExampleTab(tab)} style={{
                    padding: '8px 20px', borderRadius: 10,
                    background: exampleTab === tab ? 'var(--accent-gold-dim)' : 'transparent',
                    border: `1px solid ${exampleTab === tab ? 'var(--border-gold)' : 'var(--border-primary)'}`,
                    color: exampleTab === tab ? 'var(--accent-gold)' : 'var(--text-secondary)',
                    fontSize: 13, fontWeight: 600, fontFamily: 'var(--font-body)',
                    cursor: 'pointer', transition: 'all 0.3s ease',
                    textTransform: 'capitalize',
                  }}>
                    {tab === 'basic' ? '📝 Basic Examples' : '⭐ Strong Examples'}
                  </button>
                ))}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {(exampleTab === 'basic' ? BASIC_EXAMPLES : STRONG_EXAMPLES).map((ex, i) => (
                  <div key={i} style={{
                    background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)',
                    borderRadius: 16, padding: 24, animation: `fadeSlideIn 0.3s ease ${i * 0.06}s both`,
                  }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                      <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 17, color: 'var(--text-primary)', margin: '0 0 10px' }}>
                        {ex.title}
                      </h4>
                      <CopyButton text={ex.body} />
                    </div>
                    <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.75, fontFamily: 'var(--font-body)', margin: 0 }}>
                      {ex.body}
                    </p>
                    {ex.strength && (
                      <div style={{
                        marginTop: 12, padding: '8px 14px', borderRadius: 10,
                        background: 'rgba(106,146,64,0.08)', border: '1px solid rgba(106,146,64,0.15)',
                        fontSize: 12, color: 'var(--accent-green-bright)',
                        fontFamily: 'var(--font-body)', fontWeight: 600,
                      }}>
                        ✓ Why this reads strong: {ex.strength}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ExpandableSection>
          </div>

          {/* ═══════════ ELITE LANGUAGE BANK ═══════════ */}
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 24px 0' }}>
            <ExpandableSection
              id="language"
              icon={<Award size={20} color="#b59438" />}
              title="Elite Approval Language Bank"
              badge="Copy & Paste"
              badgeColor="#6a9240"
              isOpen={openSections.has('language')}
              onToggle={() => toggleSection('language')}
            >
              <div style={{ marginBottom: 20 }}>
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 17, color: 'var(--text-primary)', margin: '0 0 6px' }}>
                  Set 1 — Stability + Temporary Hardship Positioning
                </h4>
                <p style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'var(--font-body)', margin: '0 0 14px' }}>
                  Use these phrases to frame hardship as short-term and recoverable.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {LANGUAGE_BANK_SET_1.map((phrase, i) => (
                    <div key={i} style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
                      padding: '12px 16px', borderRadius: 12,
                      background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)',
                    }}>
                      <p style={{ fontSize: 13, color: 'var(--text-secondary)', fontFamily: 'var(--font-body)', lineHeight: 1.5, margin: 0, fontStyle: 'italic' }}>
                        "{phrase}"
                      </p>
                      <CopyButton text={phrase} />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 17, color: 'var(--text-primary)', margin: '0 0 6px' }}>
                  Set 2 — Recovery + Compliance-Focused Language
                </h4>
                <p style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'var(--font-body)', margin: '0 0 14px' }}>
                  Use these phrases to signal proactive borrower behavior during servicing review.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {LANGUAGE_BANK_SET_2.map((phrase, i) => (
                    <div key={i} style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
                      padding: '12px 16px', borderRadius: 12,
                      background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)',
                    }}>
                      <p style={{ fontSize: 13, color: 'var(--text-secondary)', fontFamily: 'var(--font-body)', lineHeight: 1.5, margin: 0, fontStyle: 'italic' }}>
                        "{phrase}"
                      </p>
                      <CopyButton text={phrase} />
                    </div>
                  ))}
                </div>
              </div>

              <SabbiTip>
                Clear, calm language signals control. SBA reviewers are looking for borrowers who demonstrate awareness of their situation and a realistic path forward.
              </SabbiTip>
            </ExpandableSection>
          </div>

          {/* ═══════════ WHAT NOT TO SAY ═══════════ */}
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 24px 0' }}>
            <ExpandableSection
              id="avoid"
              icon={<XCircle size={20} color="#b54a4a" />}
              title="What NOT to Say"
              badge="Warning"
              badgeColor="#b54a4a"
              isOpen={openSections.has('avoid')}
              onToggle={() => toggleSection('avoid')}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {WHAT_NOT_TO_SAY.map((cat, ci) => (
                  <div key={ci}>
                    <h4 style={{
                      fontSize: 14, fontWeight: 700, color: 'var(--accent-red)',
                      fontFamily: 'var(--font-body)', margin: '0 0 10px',
                      textTransform: 'uppercase', letterSpacing: '0.04em',
                    }}>
                      ✕ {cat.category}
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {cat.bad.map((phrase, pi) => (
                        <div key={pi} style={{
                          padding: '10px 16px', borderRadius: 10,
                          background: 'rgba(181,74,74,0.04)',
                          border: '1px solid rgba(181,74,74,0.1)',
                          fontSize: 13, color: 'var(--text-secondary)',
                          fontFamily: 'var(--font-body)', fontStyle: 'italic',
                          textDecoration: 'line-through', textDecorationColor: 'rgba(181,74,74,0.3)',
                        }}>
                          "{phrase}"
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <SabbiTip>
                Strong explanations are grounded in clarity, structure, and control. Frame your situation in a way that shows awareness of the problem and a realistic path forward.
              </SabbiTip>
            </ExpandableSection>
          </div>

          {/* ═══════════ SUBMISSION CHECKLIST ═══════════ */}
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 24px 0' }}>
            <ExpandableSection
              id="checklist"
              icon={<CheckCircle size={20} color="#6a9240" />}
              title="Submission Checklist"
              badge={`${checkedItems.size}/${CHECKLIST_ITEMS.length}`}
              badgeColor="#6a9240"
              isOpen={openSections.has('checklist')}
              onToggle={() => toggleSection('checklist')}
            >
              {/* Checklist progress */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 600, fontFamily: 'var(--font-body)' }}>
                    Readiness
                  </span>
                  <span style={{ fontSize: 12, color: checklistProgress === 100 ? 'var(--accent-green-bright)' : 'var(--accent-gold)', fontWeight: 700, fontFamily: 'var(--font-body)' }}>
                    {checklistProgress}%
                  </span>
                </div>
                <div style={{ height: 5, borderRadius: 3, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%', borderRadius: 3,
                    background: checklistProgress === 100 ? 'linear-gradient(90deg, #4a6b2a, #6a9240)' : 'linear-gradient(90deg, #b59438, #d4b060)',
                    width: `${checklistProgress}%`,
                    transition: 'width 0.5s ease',
                  }} />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {CHECKLIST_ITEMS.map((item, i) => {
                  const checked = checkedItems.has(i);
                  return (
                    <button key={i} type="button" onClick={() => toggleChecklist(i)} style={{
                      display: 'flex', alignItems: 'center', gap: 12,
                      padding: '14px 18px', borderRadius: 12,
                      background: checked ? 'rgba(106,146,64,0.06)' : 'var(--bg-secondary)',
                      border: `1px solid ${checked ? 'rgba(106,146,64,0.2)' : 'var(--border-primary)'}`,
                      cursor: 'pointer', transition: 'all 0.3s ease', textAlign: 'left', width: '100%',
                    }}>
                      <div style={{
                        width: 22, height: 22, borderRadius: 6, flexShrink: 0,
                        background: checked ? 'var(--accent-green-bright)' : 'transparent',
                        border: `2px solid ${checked ? 'var(--accent-green-bright)' : 'var(--border-primary)'}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'all 0.3s ease',
                      }}>
                        {checked && <Check size={13} color="#fff" />}
                      </div>
                      <span style={{
                        fontSize: 14, fontFamily: 'var(--font-body)',
                        color: checked ? 'var(--text-primary)' : 'var(--text-secondary)',
                        textDecoration: checked ? 'line-through' : 'none',
                        textDecorationColor: 'var(--text-muted)',
                        transition: 'all 0.3s ease',
                      }}>
                        {item}
                      </span>
                    </button>
                  );
                })}
              </div>

              {checklistProgress === 100 && (
                <div style={{
                  marginTop: 20, padding: '16px 20px', borderRadius: 14,
                  background: 'rgba(106,146,64,0.08)', border: '1px solid rgba(106,146,64,0.2)',
                  textAlign: 'center',
                }}>
                  <Award size={24} style={{ color: 'var(--accent-green-bright)', marginBottom: 8 }} />
                  <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--accent-green-bright)', fontFamily: 'var(--font-body)', margin: 0 }}>
                    ✓ You're ready to submit your Payment Assistance request!
                  </p>
                </div>
              )}

              <SabbiTip>
                Having your explanation written and reviewed in advance helps ensure your request reads clearly and professionally the first time.
              </SabbiTip>
            </ExpandableSection>
          </div>

          {/* ═══════════ CONTACT INFO ═══════════ */}
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 24px 0' }}>
            <ExpandableSection
              id="contact"
              icon={<Phone size={20} color="#b59438" />}
              title="Contact Information"
              isOpen={openSections.has('contact')}
              onToggle={() => toggleSection('contact')}
            >
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 14 }}>
                {[
                  { label: 'COVID EIDL Servicing', value: 'CovidEIDLServicing@sba.gov', href: 'mailto:CovidEIDLServicing@sba.gov', icon: <Mail size={16} /> },
                  { label: 'MySBA Loan Portal', value: 'lending.sba.gov', href: 'https://lending.sba.gov', icon: <ExternalLink size={16} /> },
                  { label: 'Payment Portal', value: 'Make a Payment — SBA.gov', href: 'https://www.sba.gov/funding-programs/loans/make-payment-sba', icon: <DollarSign size={16} /> },
                  { label: 'Portal Tech Support', value: 'cls@sba.gov', href: 'mailto:cls@sba.gov', icon: <Mail size={16} /> },
                  { label: 'Secure Payment Line', value: '833-853-5638 (TTY:711)', href: 'tel:8338535638', icon: <Phone size={16} /> },
                ].map((c, i) => (
                  <a
                    key={i}
                    href={c.href}
                    target={c.href.startsWith('mailto:') || c.href.startsWith('tel:') ? undefined : '_blank'}
                    rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    style={{
                      padding: '16px 18px', borderRadius: 14,
                      background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)',
                      textDecoration: 'none', color: 'inherit',
                      transition: 'all 0.3s ease', display: 'block',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--border-hover)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-primary)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                      <span style={{ color: 'var(--accent-gold)' }}>{c.icon}</span>
                      <span style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 700, fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        {c.label}
                      </span>
                    </div>
                    <p style={{ fontSize: 13, color: 'var(--accent-gold)', fontFamily: 'var(--font-body)', margin: 0, wordBreak: 'break-all' }}>
                      {c.value}
                    </p>
                  </a>
                ))}
              </div>

              <CommandNote>
                Email is a servicing tool, not the enrollment gateway. Requests must be submitted through the MySBA Loan Portal.
              </CommandNote>
            </ExpandableSection>
          </div>

          {/* ═══════════ DISCLAIMER ═══════════ */}
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 24px 0' }}>
            <div style={{
              padding: 24, borderRadius: 16,
              background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)',
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <AlertCircle size={16} style={{ color: 'var(--text-muted)', flexShrink: 0, marginTop: 2 }} />
                <p style={{ fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.8, fontFamily: 'var(--font-body)', margin: 0 }}>
                  This guide is provided for educational and informational purposes only and does not constitute legal, tax, or financial advice. SmallBiz Recon™ is an independent educational resource and is not affiliated with the U.S. Small Business Administration. Borrowers should verify all requirements directly with SBA servicing resources and official SBA publications.
                </p>
              </div>
            </div>
          </div>

          {/* ═══════════ BACK BUTTON ═══════════ */}
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px 80px', textAlign: 'center' }}>
            <Link to="/access/payment-assistance" style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '14px 32px', borderRadius: 14,
              background: 'linear-gradient(135deg, rgba(181,148,56,0.22), rgba(181,148,56,0.06))',
              border: '1px solid rgba(181,148,56,0.3)',
              color: 'var(--text-primary)', fontSize: 15, fontWeight: 600,
              fontFamily: 'var(--font-body)', textDecoration: 'none',
            }}>
              <ArrowLeft size={16} />
              Back to Toolkit Dashboard
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default InteractivePaymentAssistanceGuide;