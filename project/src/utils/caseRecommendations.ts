import type { ScoreTier, Recommendation } from '../types/caseEvaluator';

export const RECOMMENDATIONS: Record<ScoreTier, Recommendation[]> = {
  critical: [
    {
      text: 'Book an Advanced EIDL Strategy Session immediately',
      href: 'https://calendly.com/smallbizrecon1/smallbiz-recon-advanced-sba-eidl-info-session',
    },
    {
      text: 'Review your Treasury correspondence with our Cross-Servicing guide',
      href: '/dispute-recall-service',
    },
    {
      text: 'Gather your loan documents for your consultation',
    },
  ],
  strong: [
    {
      text: 'Schedule a free 30-minute consultation',
      href: 'https://calendly.com/smallbizrecon1/30min',
    },
    {
      text: 'Explore our EIDL service packages',
      href: '/covid-eidl-toolkits',
    },
    {
      text: 'Browse our resource library',
      href: '/sba-resources/help-packets',
    },
  ],
  moderate: [
    {
      text: 'Book a free consultation to explore your options',
      href: 'https://calendly.com/smallbizrecon1/30min',
    },
    {
      text: 'Learn about EIDL hardship and payment assistance',
      href: '/access/payment-assistance',
    },
    {
      text: 'Browse our free resource library',
      href: '/sba-resources/help-packets',
    },
  ],
  early: [
    {
      text: 'Schedule a free check-in call',
      href: 'https://calendly.com/smallbizrecon1/30min',
    },
    {
      text: 'Read our EIDL borrower guides',
      href: '/covid-eidl-toolkits',
    },
    {
      text: 'Sign up for SBA policy alerts',
      href: '/community/newsletter',
    },
  ],
  low: [
    {
      text: 'Bookmark SmallBiz Recon™ for future reference',
    },
    {
      text: 'Explore our knowledge base',
      href: '/sba-resources/help-packets',
    },
    {
      text: 'Have questions? Book a free call',
      href: 'https://calendly.com/smallbizrecon1/30min',
    },
  ],
};
