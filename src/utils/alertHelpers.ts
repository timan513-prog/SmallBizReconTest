import type { AlertSeverity, AlertCategory } from '../data/policyAlerts';

export function formatAlertDate(isoDate: string): string {
  const d = new Date(isoDate + 'T12:00:00');
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

export function formatAlertDateShort(isoDate: string): string {
  const d = new Date(isoDate + 'T12:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function severityLabel(severity: AlertSeverity): string {
  switch (severity) {
    case 'critical': return 'CRITICAL';
    case 'action-required': return 'ACTION REQUIRED';
    case 'informational': return 'INFORMATIONAL';
    case 'update': return 'UPDATE';
  }
}

export function categoryLabel(category: AlertCategory): string {
  switch (category) {
    case 'treasury': return 'TREASURY';
    case 'sba-policy': return 'SBA POLICY';
    case 'covid-eidl': return 'COVID EIDL';
    case 'servicing': return 'SERVICING';
    case 'legislative': return 'LEGISLATIVE';
  }
}

export function severityColors(severity: AlertSeverity): { bg: string; text: string; border: string } {
  switch (severity) {
    case 'critical':
      return { bg: 'rgba(200,60,60,0.18)', text: '#f87171', border: 'rgba(200,60,60,0.35)' };
    case 'action-required':
      return { bg: 'rgba(217,119,6,0.18)', text: '#fbbf24', border: 'rgba(217,119,6,0.35)' };
    case 'informational':
      return { bg: 'rgba(59,130,246,0.15)', text: '#93c5fd', border: 'rgba(59,130,246,0.3)' };
    case 'update':
      return { bg: 'rgba(100,116,139,0.18)', text: '#94a3b8', border: 'rgba(100,116,139,0.3)' };
  }
}

export function categoryColors(category: AlertCategory): { bg: string; text: string } {
  switch (category) {
    case 'treasury':
      return { bg: 'rgba(200,168,78,0.1)', text: '#c8a84e' };
    case 'sba-policy':
      return { bg: 'rgba(126,168,94,0.1)', text: '#7ea85e' };
    case 'covid-eidl':
      return { bg: 'rgba(93,158,207,0.1)', text: '#5d9ecf' };
    case 'servicing':
      return { bg: 'rgba(148,163,184,0.1)', text: '#94a3b8' };
    case 'legislative':
      return { bg: 'rgba(167,139,250,0.1)', text: '#a78bfa' };
  }
}

export function buildAlertAnchor(id: string): string {
  return `#alert-${id}`;
}

export function getCalendlyUrl(severity: AlertSeverity): string {
  if (severity === 'critical' || severity === 'action-required') {
    return 'https://calendly.com/smallbizrecon1/smallbiz-recon-advanced-sba-eidl-info-session';
  }
  return 'https://calendly.com/smallbizrecon1/30min';
}

export function getCalendlyLabel(severity: AlertSeverity): string {
  if (severity === 'critical' || severity === 'action-required') {
    return 'Book an Urgent Strategy Session';
  }
  return 'Book a Free Consultation';
}
