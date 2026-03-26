import { Shield, User, Database, Share2, Lock, Cookie, Check, Mail, AlertCircle, Globe, Zap } from 'lucide-react';
import EIDLStyleShell from '../components/layout/EIDLStyleShell';

const Section = ({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) => (
  <div style={{
    position: "relative",
    overflow: "hidden",
    background: "var(--bg-card)",
    backdropFilter: "var(--glass-blur)",
    WebkitBackdropFilter: "var(--glass-blur)",
    border: "1px solid var(--border-primary)",
    borderRadius: 20,
    padding: "32px 28px",
    transition: "all 0.4s ease",
    animation: "cardReveal 0.6s ease-out both",
  }}>
    <div style={{ display: "flex", alignItems: "start", gap: 16, marginBottom: 20 }}>
      <div style={{
        width: 44,
        height: 44,
        borderRadius: 12,
        background: "var(--badge-bg)",
        border: "1px solid var(--badge-border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--accent-green)",
        flexShrink: 0,
      }}>
        {icon}
      </div>
      <h2 style={{
        fontFamily: "var(--font-display)",
        fontSize: 24,
        fontWeight: 400,
        color: "var(--text-primary)",
        letterSpacing: "-0.01em",
      }}>
        {title}
      </h2>
    </div>
    <div style={{
      fontFamily: "var(--font-body)",
      fontSize: 15,
      color: "var(--text-secondary)",
      lineHeight: 1.75,
    }}>
      {children}
    </div>
  </div>
);

const PrivacyPolicy = () => {
  return (
    <EIDLStyleShell
      title="Privacy Policy"
      subtitle="Last updated: March 25, 2026"
      icon={<Shield size={30} color="#c8a84e" strokeWidth={1.5} />}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

        <Section icon={<AlertCircle size={20} />} title="Introduction & Scope">
          <p style={{ marginBottom: 16 }}>
            This Privacy Policy describes how Recon11 Global Systems, LLC, operating as SmallBiz Recon™ (also known as SmallBizRecon.com or sbarecon.com) collects, uses, discloses, and protects personal information. This policy applies to all visitors and users of our website and services.
          </p>
          <p>
            We comply with the California Consumer Privacy Act (CCPA), the General Data Protection Regulation (GDPR) for EU visitors, the CAN-SPAM Act, the FTC Act Section 5, and the Florida Information Protection Act (FIPA). If you are a resident of these jurisdictions, this policy outlines your specific privacy rights.
          </p>
        </Section>

        <Section icon={<User size={20} />} title="Categories of Information We Collect">
          <h3 style={{ fontWeight: 600, color: "var(--text-primary)", marginBottom: 12 }}>Information You Provide Directly</h3>
          <ul style={{ marginLeft: 24, marginBottom: 16 }}>
            <li><strong>Account Registration:</strong> Name, email address, phone number, password, account preferences</li>
            <li><strong>Payment Information:</strong> Credit card details (processed by Stripe; we do not store full card numbers), billing address, transaction history</li>
            <li><strong>Communications:</strong> Messages sent to customer support, forum posts on Intel Board (our community platform), email subscriptions</li>
            <li><strong>Profile Information:</strong> Professional background, business type, educational interests, feedback and surveys</li>
          </ul>

          <h3 style={{ fontWeight: 600, color: "var(--text-primary)", marginBottom: 12 }}>Information We Collect Automatically</h3>
          <ul style={{ marginLeft: 24, marginBottom: 16 }}>
            <li><strong>Device & Browser Information:</strong> IP address, browser type and version, operating system, device identifiers, screen resolution</li>
            <li><strong>Usage Information:</strong> Pages visited, time spent on pages, clicks, scroll depth, download history, search queries</li>
            <li><strong>Referral Information:</strong> How you reached our site, referring website URLs, campaign/UTM parameters</li>
            <li><strong>Location Data:</strong> General geographic location based on IP address (city/region level, not precise)</li>
            <li><strong>Cookie & Tracking Data:</strong> Persistent cookies, session cookies, web beacons, pixel tags, local storage</li>
          </ul>

          <h3 style={{ fontWeight: 600, color: "var(--text-primary)", marginBottom: 12 }}>Information from Third Parties</h3>
          <ul style={{ marginLeft: 24 }}>
            <li><strong>Service Providers:</strong> Stripe (payment processor), Supabase (authentication and database), Resend (email service)</li>
            <li><strong>Analytics & Marketing Partners:</strong> Analytics platforms that track website performance and user behavior</li>
            <li><strong>Business Partners:</strong> Information shared when you use third-party integrations or co-branded services</li>
          </ul>
        </Section>

        <Section icon={<Database size={20} />} title="Legal Basis for Data Processing">
          <p style={{ marginBottom: 16 }}>We process your personal information based on the following legal grounds:</p>
          <ul style={{ marginLeft: 24, marginBottom: 16 }}>
            <li><strong>Consent:</strong> When you explicitly consent to data processing (e.g., subscribing to newsletters, enabling analytics cookies)</li>
            <li><strong>Contract Performance:</strong> To provide services you've purchased, create accounts, process payments, and deliver digital products</li>
            <li><strong>Legitimate Interest:</strong> To improve our services, prevent fraud, ensure security, conduct analytics, and market our products responsibly</li>
            <li><strong>Legal Obligation:</strong> To comply with applicable laws, respond to legal requests, and protect our legal rights</li>
            <li><strong>Vital Interest:</strong> To protect the health, safety, or security of our users or the public</li>
          </ul>
        </Section>

        <Section icon={<Zap size={20} />} title="How We Use Your Information">
          <p style={{ marginBottom: 16 }}>We use collected information for the following purposes:</p>
          <ul style={{ marginLeft: 24, marginBottom: 16 }}>
            <li>Provide, maintain, troubleshoot, and improve our website and services</li>
            <li>Process transactions, send purchase confirmations, and deliver digital access codes</li>
            <li>Send transactional communications (account changes, security alerts, technical updates)</li>
            <li>Respond to customer inquiries and provide technical support within 72 hours</li>
            <li>Send marketing communications and educational content (with your consent; you can opt-out anytime)</li>
            <li>Conduct analytics to understand user behavior and optimize site performance</li>
            <li>Detect, investigate, and prevent fraud, abuse, unauthorized access, and security breaches</li>
            <li>Comply with legal obligations and enforce our Terms & Conditions</li>
            <li>Personalize your experience and recommend relevant products and content</li>
          </ul>
        </Section>

        <Section icon={<Share2 size={20} />} title="Third-Party Service Providers & Data Sharing">
          <p style={{ marginBottom: 16 }}>
            We do not sell your personal information for monetary consideration. However, under CCPA, certain data sharing may constitute a "sale" or "sharing." We share data with third-party service providers for specific business purposes:
          </p>

          <h3 style={{ fontWeight: 600, color: "var(--text-primary)", marginBottom: 12 }}>Payment Processing</h3>
          <ul style={{ marginLeft: 24, marginBottom: 16 }}>
            <li><strong>Stripe:</strong> Payment processing, fraud detection, and billing. Stripe maintains PCI DSS Level 1 compliance. Visit stripe.com/privacy for details.</li>
          </ul>

          <h3 style={{ fontWeight: 600, color: "var(--text-primary)", marginBottom: 12 }}>Authentication & Database</h3>
          <ul style={{ marginLeft: 24, marginBottom: 16 }}>
            <li><strong>Supabase (PostgreSQL-based backend):</strong> User authentication, account management, data storage, and access control. Data is encrypted in transit and at rest. Visit supabase.com/privacy for details.</li>
          </ul>

          <h3 style={{ fontWeight: 600, color: "var(--text-primary)", marginBottom: 12 }}>Email Communications</h3>
          <ul style={{ marginLeft: 24, marginBottom: 16 }}>
            <li><strong>Resend:</strong> Transactional and marketing email delivery. Visit resend.com/privacy for details.</li>
          </ul>

          <h3 style={{ fontWeight: 600, color: "var(--text-primary)", marginBottom: 12 }}>Analytics & Performance Monitoring</h3>
          <ul style={{ marginLeft: 24, marginBottom: 16 }}>
            <li><strong>Analytics Providers:</strong> We use analytics platforms to track site performance, user engagement, and conversion data. These may include Google Analytics, Hotjar, or similar services. See their privacy policies for opt-out options.</li>
          </ul>

          <h3 style={{ fontWeight: 600, color: "var(--text-primary)", marginBottom: 12 }}>Other Disclosures</h3>
          <ul style={{ marginLeft: 24 }}>
            <li><strong>Legal Requirement:</strong> We disclose information when required by law, court order, subpoena, or government request</li>
            <li><strong>Business Transfers:</strong> In the event of merger, acquisition, bankruptcy, or sale of assets, data may be transferred as part of the transaction</li>
            <li><strong>Protection of Rights:</strong> We disclose information to enforce our agreements, protect our intellectual property, and prevent fraud or harm</li>
          </ul>
        </Section>

        <Section icon={<Lock size={20} />} title="Data Retention & Deletion">
          <p style={{ marginBottom: 16 }}>
            We retain your personal information only as long as necessary to fulfill the purposes outlined in this policy:
          </p>
          <ul style={{ marginLeft: 24, marginBottom: 16 }}>
            <li><strong>Account Data:</strong> Retained while your account is active, plus 90 days after account deletion for recovery purposes</li>
            <li><strong>Transaction Records:</strong> Retained for 7 years to comply with tax and financial regulations</li>
            <li><strong>Marketing Communications:</strong> Retained until you unsubscribe; unsubscribe requests are honored immediately</li>
            <li><strong>Analytics Data:</strong> Typically aggregated and anonymized within 13 months; individual-level data deleted within 26 months</li>
            <li><strong>Cookies & Tracking:</strong> Session cookies deleted upon browser closure; persistent cookies expire per their settings or within 2 years</li>
            <li><strong>Support Communications:</strong> Retained for 2 years for quality assurance and dispute resolution</li>
          </ul>
          <p>
            You may request deletion of your personal data at any time by contacting privacy@smallbizrecon.com. We will process deletion requests within 30 days, subject to legal retention requirements.
          </p>
        </Section>

        <Section icon={<Globe size={20} />} title="International Data Transfers">
          <p style={{ marginBottom: 16 }}>
            Our website and services are hosted in the United States. If you are located outside the US, your information will be transferred to, stored in, and processed in the United States, which may have different privacy standards than your home country.
          </p>
          <p style={{ marginBottom: 16 }}>
            <strong>EU/EEA Residents (GDPR Compliance):</strong> Our data transfers are made lawfully under appropriate safeguards including:
          </p>
          <ul style={{ marginLeft: 24, marginBottom: 16 }}>
            <li>Standard Contractual Clauses (SCCs) with our service providers</li>
            <li>Adequacy decisions where applicable</li>
            <li>Your explicit consent to cross-border transfer</li>
          </ul>
          <p>
            By using our services, you consent to the transfer of your information to countries outside your country of residence, which may have different data protection rules.
          </p>
        </Section>

        <Section icon={<AlertCircle size={20} />} title="Children's Privacy & COPPA Compliance">
          <p style={{ marginBottom: 16 }}>
            SmallBiz Recon™ is not directed to children under 13 years of age. We do not knowingly collect personal information from children under 13. If we become aware that we have collected information from a child under 13, we will delete such information promptly and notify the parent/guardian.
          </p>
          <p style={{ marginBottom: 16 }}>
            Parents or guardians who believe their child has provided information to us should contact privacy@smallbizrecon.com immediately.
          </p>
          <p>
            <strong>Teens (13-18):</strong> While we do not actively restrict teen access, we recommend parental involvement in any online activity. Teens have the same data rights as adults under GDPR and CCPA.
          </p>
        </Section>

        <Section icon={<Check size={20} />} title="CCPA Privacy Rights (California Residents)">
          <p style={{ marginBottom: 16 }}>
            If you are a California resident, the California Consumer Privacy Act (CCPA) grants you the following rights:
          </p>
          <ul style={{ marginLeft: 24, marginBottom: 16 }}>
            <li><strong>Right to Know:</strong> You may request what personal information we collect, use, share, and sell. We will provide this information within 45 days.</li>
            <li><strong>Right to Delete:</strong> You may request deletion of personal information we have collected, subject to certain exceptions (e.g., legal obligations, fraud prevention).</li>
            <li><strong>Right to Opt-Out of Sale/Sharing:</strong> You may opt out of the sale or sharing of your personal information for cross-context behavioral advertising. Use our cookie preferences, email privacy@smallbizrecon.com, or enable Global Privacy Control (GPC).</li>
            <li><strong>Right to Correct:</strong> You may request correction of inaccurate personal information.</li>
            <li><strong>Right to Limit Use:</strong> You may limit our use of personal information to what is necessary to fulfill your requests.</li>
            <li><strong>Right to Non-Discrimination:</strong> We will not discriminate against you for exercising your CCPA rights. Prices, services, or quality of service will not differ based on your privacy choices.</li>
          </ul>
          <p style={{ marginBottom: 16 }}>
            <strong>To submit a request:</strong> Email privacy@smallbizrecon.com with your name, email, and description of your request. Include "California Privacy Request" in the subject line. We will verify your identity before processing.
          </p>
          <p>
            <strong>Authorized Agents:</strong> You may designate an authorized agent to make requests on your behalf. The agent must provide proof of authorization (power of attorney or signed letter).
          </p>
        </Section>

        <Section icon={<Check size={20} />} title="GDPR Rights (EU & EEA Residents)">
          <p style={{ marginBottom: 16 }}>
            If you are located in the European Union or European Economic Area, the General Data Protection Regulation (GDPR) grants you the following rights:
          </p>
          <ul style={{ marginLeft: 24, marginBottom: 16 }}>
            <li><strong>Right of Access:</strong> You may request access to all personal information we hold about you in a structured, commonly-used format.</li>
            <li><strong>Right to Rectification:</strong> You may request correction of inaccurate or incomplete information.</li>
            <li><strong>Right to Erasure ("Right to be Forgotten"):</strong> You may request deletion of your information subject to legal exceptions. We will comply within 30 days.</li>
            <li><strong>Right to Restrict Processing:</strong> You may request that we limit how we use your information while a request is being evaluated.</li>
            <li><strong>Right to Data Portability:</strong> You may request your information in a portable format suitable for transfer to another service.</li>
            <li><strong>Right to Object:</strong> You may object to processing based on legitimate interests or direct marketing. We will honor your request within 30 days.</li>
            <li><strong>Rights Related to Automated Decision-Making:</strong> You have the right not to be subject to decisions based solely on automated processing that produces legal effects.</li>
          </ul>
          <p>
            <strong>To submit a request:</strong> Email privacy@smallbizrecon.com with "GDPR Request" in the subject line. Include your name, email, and description of your request.
          </p>
        </Section>

        <Section icon={<Cookie size={20} />} title="Cookies & Tracking Technologies">
          <p style={{ marginBottom: 16 }}>
            We use cookies and similar tracking technologies to enhance your experience, analyze usage, and deliver targeted advertising:
          </p>
          <ul style={{ marginLeft: 24, marginBottom: 16 }}>
            <li><strong>Essential Cookies:</strong> Required for site functionality (authentication, security, user preferences). Cannot be disabled.</li>
            <li><strong>Performance Cookies:</strong> Measure site performance, user behavior, and analytics. Used to improve our services.</li>
            <li><strong>Marketing Cookies:</strong> Enable targeted advertising and retargeting across platforms. Can be disabled via cookie preferences.</li>
            <li><strong>Third-Party Cookies:</strong> Set by advertising partners and analytics providers. See their privacy policies for details.</li>
          </ul>
          <p style={{ marginBottom: 16 }}>
            <strong>Cookie Management:</strong> You can manage cookie preferences in our cookie banner (displayed on first visit). Most browsers also allow you to disable cookies in browser settings, though this may limit functionality.
          </p>
          <p>
            <strong>Global Privacy Control (GPC):</strong> If you use a browser, extension, or device that sends a GPC signal, we will honor your opt-out preference for targeted advertising and data sharing.
          </p>
        </Section>

        <Section icon={<AlertCircle size={20} />} title="Data Security & Breach Notification">
          <p style={{ marginBottom: 16 }}>
            We implement industry-standard technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction:
          </p>
          <ul style={{ marginLeft: 24, marginBottom: 16 }}>
            <li>HTTPS encryption for all data in transit</li>
            <li>Encrypted data storage at rest (AES-256 or equivalent)</li>
            <li>Firewalls, intrusion detection, and regular security audits</li>
            <li>Secure password hashing (bcrypt or similar algorithms)</li>
            <li>Multi-factor authentication for sensitive accounts</li>
            <li>Limited employee access to personal data (need-to-know basis)</li>
            <li>Regular security training for staff</li>
          </ul>
          <p style={{ marginBottom: 16 }}>
            <strong>Note:</strong> While we use industry-standard protections, no method of transmission over the internet or electronic storage is completely secure. We cannot guarantee absolute security.
          </p>
          <p>
            <strong>Data Breach Notification:</strong> In the event of a confirmed data breach affecting your personal information, we will notify affected individuals within 72 hours (as required by GDPR) or without unreasonable delay (as required by state laws). Notifications will include details of the breach, data affected, and steps you can take.
          </p>
        </Section>

        <Section icon={<Mail size={20} />} title="Data Protection Officer & Privacy Contact">
          <p style={{ marginBottom: 16 }}>
            We have designated a privacy representative to oversee our data protection and privacy practices:
          </p>
          <div style={{
            padding: 20,
            borderRadius: 12,
            background: "var(--bg-tertiary)",
            border: "1px solid var(--border-primary)",
            marginBottom: 16,
          }}>
            <p style={{ fontWeight: 600, marginBottom: 8, color: "var(--text-primary)" }}>Privacy Contact Information</p>
            <p><strong>Company:</strong> Recon11 Global Systems, LLC</p>
            <p><strong>Privacy Email:</strong> privacy@smallbizrecon.com</p>
            <p><strong>Support Email:</strong> support@smallbizrecon.com</p>
            <p><strong>Response Time:</strong> Within 24 hours (US business days), within 30 days for GDPR/CCPA requests</p>
            <p><strong>Location:</strong> Orlando, FL</p>
            <p><strong>Website:</strong> SmallBizRecon.com</p>
          </div>
          <p>
            If you are not satisfied with our response to a privacy request or have concerns about privacy practices, you may file a complaint with your applicable data protection authority (e.g., your state's Attorney General for CCPA, or your country's DPA for GDPR).
          </p>
        </Section>

        <Section icon={<AlertCircle size={20} />} title="CAN-SPAM Compliance">
          <p style={{ marginBottom: 16 }}>
            We comply with the CAN-SPAM Act for all commercial email messages. Our emails include:
          </p>
          <ul style={{ marginLeft: 24, marginBottom: 16 }}>
            <li>Clear identification of sender (Recon11 Global Systems, LLC / SmallBiz Recon™)</li>
            <li>Accurate subject lines that reflect the content</li>
            <li>Physical postal address</li>
            <li>Easy-to-use unsubscribe option in every email</li>
            <li>Prompt processing of unsubscribe requests (within 10 business days)</li>
          </ul>
          <p>
            You may unsubscribe from marketing emails by clicking the unsubscribe link in any email or emailing privacy@smallbizrecon.com. Transactional emails (receipts, account alerts) cannot be disabled.
          </p>
        </Section>

        <Section icon={<AlertCircle size={20} />} title="Policy Changes & Updates">
          <p style={{ marginBottom: 16 }}>
            We may update this Privacy Policy to reflect changes in our practices, technology, legal requirements, or other factors. We will notify you of material changes by:
          </p>
          <ul style={{ marginLeft: 24, marginBottom: 16 }}>
            <li>Posting the updated policy on this page with a new "Last updated" date</li>
            <li>Sending you an email notification (for significant changes)</li>
            <li>Obtaining your explicit consent (for changes that materially expand data usage)</li>
          </ul>
          <p>
            Your continued use of our services following notification of changes constitutes acceptance of the updated Privacy Policy.
          </p>
        </Section>

        <div style={{
          padding: 20,
          borderRadius: 12,
          background: "var(--info-bg)",
          border: "1px solid var(--info-border)",
          display: "flex",
          gap: 12,
          alignItems: "start",
          marginBottom: 16,
        }}>
          <AlertCircle size={20} color="var(--info-text)" style={{ flexShrink: 0, marginTop: 2 }} />
          <div style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--info-text)", lineHeight: 1.6 }}>
            <strong>SBA Non-Affiliation Disclaimer:</strong> SmallBiz Recon™ and SmallBizRecon.com are operated by Recon11 Global Systems, LLC, a private company. We are not affiliated with, endorsed by, or officially connected to the U.S. Small Business Administration (SBA) or any government agency.
          </div>
        </div>

      </div>
    </EIDLStyleShell>
  );
};

export default PrivacyPolicy;
