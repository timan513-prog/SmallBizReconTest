import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Bell } from 'lucide-react';
import EIDLStyleShell from '../components/layout/EIDLStyleShell';
import { policyAlerts } from '../data/policyAlerts';
import AlertSubscriptionBar from '../components/policy-alerts/AlertSubscriptionBar';
import AlertFilterBar from '../components/policy-alerts/AlertFilterBar';
import AlertFeed from '../components/policy-alerts/AlertFeed';
import AlertBottomCTA from '../components/policy-alerts/AlertBottomCTA';
import LiveIndicator from '../components/home/LiveIndicator';
import { filterAlerts, DEFAULT_FILTERS } from '../utils/alertFilters';
import type { AlertFilterState } from '../utils/alertFilters';

const PolicyAlertsPage: React.FC = () => {
  const [filters, setFilters] = useState<AlertFilterState>(DEFAULT_FILTERS);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    document.title = 'SBA & Treasury Policy Alerts | COVID EIDL Updates | SmallBiz Recon™';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute('content', 'Stay informed on SBA policy changes, Treasury collection actions, and COVID EIDL servicing updates. Free real-time alerts from SmallBiz Recon™.');
    }
  }, []);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash && hash.startsWith('#alert-')) {
      const id = hash.slice('#alert-'.length);
      setExpandedId(id);
      setTimeout(() => {
        const el = document.getElementById(`alert-${id}`);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    }
  }, []);

  const filteredAlerts = useMemo(() => filterAlerts(policyAlerts, filters), [filters]);

  const handleClearFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
  }, []);

  return (
    <EIDLStyleShell
      title="SBA & Treasury Policy Alerts"
      subtitle="Real-time monitoring of policy changes, Treasury actions, and servicing updates that impact COVID EIDL borrowers."
      icon={<Bell size={30} color="#c8a84e" strokeWidth={1.5} />}
    >
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}>
        <LiveIndicator text="MONITORING ACTIVE" />
      </div>

      <AlertSubscriptionBar />

      <div style={{ marginTop: 32 }}>
        <AlertFilterBar
          filters={filters}
          onChange={setFilters}
          resultCount={filteredAlerts.length}
        />

        <AlertFeed
          alerts={filteredAlerts}
          expandedId={expandedId}
          onClearFilters={handleClearFilters}
          filters={filters}
        />

        <AlertBottomCTA />

        <p style={{
          marginTop: 48,
          fontSize: 11,
          fontFamily: 'var(--font-body)',
          fontStyle: 'italic',
          color: 'var(--text-muted)',
          lineHeight: 1.7,
          maxWidth: 720,
        }}>
          Policy alerts are provided for informational and educational purposes only and do not constitute legal, financial, or professional advice. SmallBiz Recon™ makes reasonable efforts to ensure accuracy but cannot guarantee completeness or timeliness of all policy information. Always verify with official SBA and Treasury sources. SmallBiz Recon™ is a service of Recon11 Global Systems, LLC.
        </p>
      </div>
    </EIDLStyleShell>
  );
};

export default PolicyAlertsPage;
