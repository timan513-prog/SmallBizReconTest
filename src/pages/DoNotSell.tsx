import { UserX, Eye, Database, Settings, Mail, AlertCircle, ShieldAlert, Lock, CheckCircle } from 'lucide-react';
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

const DoNotSell = () => {
  return (
    <EIDLStyleShell
      title="Do Not Sell or Share My Personal Information"
      subtitle="Last updated: March 25, 2026"
      icon={<UserX size={30} color="#c8a84e" strokeWidth={1.5} />}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

        <Section icon={<ShieldAlert size={20} />} title="Your State Privacy Rights Overview">
          <p style={{ marginBottom: 16 }}>
            Under the California Consumer Privacy Act (CCPA) and similar state privacy laws, you have the fundamental right to control how your personal information is collected, used, and shared. This page is dedicated to your right to opt-out of the "sale" or "sharing" of your personal information.
          </p>
          <div style={{
            padding: 16,
            borderRadius: 12,
            background: "var(--info-bg)",
            border: "1px solid var(--info-border)",
            marginBottom: 16,
          }}>
            <h3 style={{ fontWeight: 600, marginBottom: 8, color: "var(--text-primary)" }}>What "Sale" and "Sharing" Mean Under CCPA</h3>
            <p style={{ marginBottom: 12 }}>
              Under California law, "sale" includes any disclosure of personal information to third parties in exchange for monetary or other valuable consideration. "Sharing" includes disclosure to third parties for cross-context behavioral advertising purposes.
            </p>
            <p>
              This includes cookies, pixels, web beacons, and tracking technologies that share identifiers with advertising partners, data brokers, and analytics providers. If you opt-out, we will stop these disclosures.
            </p>
          </div>
          <p>
            <strong>Who This Applies To:</strong> Residents of California and other states with similar privacy laws (Virginia, Colorado, Connecticut, Utah, and others). All users can use our opt-out mechanisms.
          </p>
        </Section>

        <Section icon={<Database size={20} />} title="Personal Information We May Sell or Share">
          <p style={{ marginBottom: 16 }}>
            Under CCPA's broad definition, we may "sell" or "share" the following categories of personal information:
          </p>
          <ul style={{ marginLeft: 24, marginBottom: 16 }}>
            <li><strong>Identifiers:</strong> Email address, account ID, cookies, mobile identifiers, IP address</li>
            <li><strong>Commercial Information:</strong> Purchase history, transaction data, product interests</li>
            <li><strong>Internet/Network Activity:</strong> Browsing history, pages visited, click-through rates, search history, interaction data</li>
            <li><strong>Geolocation Information:</strong> General location based on IP address (city/region level)</li>
            <li><strong>Inferred Information:</strong> Inferences about interests, preferences, and behavior patterns</li>
          </ul>
          <p>
            <strong>Who May Receive This Information:</strong>
          </p>
          <ul style={{ marginLeft: 24 }}>
            <li><strong>Analytics Providers:</strong> Google Analytics, Hotjar, and similar services to measure site performance</li>
            <li><strong>Advertising Networks:</strong> Platforms that enable retargeting and cross-site behavioral advertising</li>
            <li><strong>Data Brokers & Ad Tech Companies:</strong> Partners that process and distribute audience data</li>
            <li><strong>Marketing Platforms:</strong> Email marketing and customer data platforms</li>
          </ul>
        </Section>

        <Section icon={<Eye size={20} />} title="How We Use Data Sharing for Business Purposes">
          <p style={{ marginBottom: 16 }}>
            We engage in data sharing for the following legitimate business purposes:
          </p>
          <ul style={{ marginLeft: 24, marginBottom: 16 }}>
            <li><strong>Analytics & Performance:</strong> Understanding how you use our site, measuring traffic, and identifying optimization opportunities</li>
            <li><strong>Marketing & Retargeting:</strong> Showing you relevant ads on other websites for products/services similar to what you viewed</li>
            <li><strong>Advertising Optimization:</strong> Personalizing ads and understanding ad effectiveness</li>
            <li><strong>Customer Segmentation:</strong> Categorizing users by interests and behavior to improve marketing efficiency</li>
            <li><strong>Fraud Prevention:</strong> Detecting and preventing fraudulent activity and abuse</li>
            <li><strong>Service Improvement:</strong> Using aggregated and anonymized data to improve our website and services</li>
          </ul>
          <p>
            <strong>Note:</strong> We may continue to use data for these purposes even after you opt-out, but we will not share your personal identifiers with third parties for targeted advertising.
          </p>
        </Section>

        <Section icon={<Settings size={20} />} title="How to Exercise Your Opt-Out Right">
          <p style={{ marginBottom: 16 }}>
            You have multiple ways to opt-out of personal information sales and sharing. Choose the method that works best for you:
          </p>

          <div style={{
            padding: 16,
            borderRadius: 12,
            background: "var(--badge-bg)",
            border: "1px solid var(--badge-border)",
            marginBottom: 16,
          }}>
            <h3 style={{ fontWeight: 600, marginBottom: 8, color: "var(--text-primary)" }}>Method 1: Cookie Preferences (Easiest)</h3>
            <p style={{ marginBottom: 12 }}>
              Use our cookie consent tool to disable marketing and targeting cookies. This is the fastest way to opt-out.
            </p>
            <button
              onClick={() => {
                const event = new CustomEvent('showCookieConsent');
                window.dispatchEvent(event);
              }}
              style={{
                padding: "12px 24px",
                borderRadius: 12,
                background: "var(--cta-bg)",
                border: "1px solid var(--cta-border)",
                color: "var(--cta-text)",
                fontSize: 14,
                fontWeight: 600,
                fontFamily: "var(--font-body)",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            >
              Manage Cookie Preferences
            </button>
            <p style={{ marginTop: 12, fontSize: 13, color: "var(--text-secondary)" }}>
              This will immediately disable targeting cookies and prevent data sharing for advertising purposes.
            </p>
          </div>

          <div style={{
            padding: 16,
            borderRadius: 12,
            background: "var(--badge-bg)",
            border: "1px solid var(--badge-border)",
            marginBottom: 16,
          }}>
            <h3 style={{ fontWeight: 600, marginBottom: 8, color: "var(--text-primary)" }}>Method 2: Email Submission</h3>
            <p style={{ marginBottom: 12 }}>
              Send an email to <strong>privacy@smallbizrecon.com</strong> with the subject line "CCPA Opt-Out Request" and include:
            </p>
            <ul style={{ marginLeft: 24, marginBottom: 12 }}>
              <li>Your full name</li>
              <li>Email address associated with your account (if you have one)</li>
              <li>Statement: "I request that SmallBiz Recon™ not sell or share my personal information"</li>
            </ul>
            <p style={{ fontSize: 13, color: "var(--text-secondary)" }}>
              We will process your request within 15 business days.
            </p>
          </div>

          <div style={{
            padding: 16,
            borderRadius: 12,
            background: "var(--badge-bg)",
            border: "1px solid var(--badge-border)",
          }}>
            <h3 style={{ fontWeight: 600, marginBottom: 8, color: "var(--text-primary)" }}>Method 3: Global Privacy Control (GPC)</h3>
            <p style={{ marginBottom: 12 }}>
              If you enable Global Privacy Control (GPC) in your browser, browser extension, or device settings, we will honor your GPC signal as an opt-out request for personal information sales and sharing.
            </p>
            <ul style={{ marginLeft: 24, fontSize: 13, color: "var(--text-secondary)" }}>
              <li><strong>Chrome/Edge:</strong> Use browser extensions like "Global Privacy Control" from Mozilla</li>
              <li><strong>Safari:</strong> Enable "Privacy Preserving Ad Measurement" in settings (includes GPC support)</li>
              <li><strong>Firefox:</strong> Download the GPC extension from Mozilla Add-ons</li>
            </ul>
          </div>
        </Section>

        <Section icon={<CheckCircle size={20} />} title="What Happens After You Opt-Out">
          <p style={{ marginBottom: 16 }}>
            Once you opt-out through any method, we will:
          </p>
          <ul style={{ marginLeft: 24, marginBottom: 16 }}>
            <li>Stop sharing your personal identifiers with third parties for targeted advertising</li>
            <li>Disable marketing and targeting cookies on our website</li>
            <li>Remove your information from advertising partner databases</li>
            <li>Prevent retargeting ads across other websites</li>
          </ul>
          <p style={{ marginBottom: 16 }}>
            <strong>What You May Notice:</strong>
          </p>
          <ul style={{ marginLeft: 24, marginBottom: 16 }}>
            <li>You may see less targeted/personalized advertising on other websites</li>
            <li>Advertisements you do see may be less relevant to your interests</li>
            <li>Your SmallBiz Recon™ experience remains fully functional</li>
            <li>Essential website functionality is unaffected</li>
          </ul>
          <p>
            <strong>Essential Cookies Remain Active:</strong> We will continue to use essential cookies required for site security, authentication, and core functionality, even after your opt-out.
          </p>
        </Section>

        <Section icon={<Lock size={20} />} title="Verification & Authorized Agents">
          <p style={{ marginBottom: 16 }}>
            To process your opt-out request, we may need to verify your identity by confirming your email address and account information. For account holders, verification is straightforward.
          </p>
          <p style={{ marginBottom: 16 }}>
            <strong>Authorized Agents:</strong> If you designate an authorized agent to make an opt-out request on your behalf:
          </p>
          <ul style={{ marginLeft: 24, marginBottom: 16 }}>
            <li>The agent must provide a signed power of attorney or letter of authorization</li>
            <li>We may request independent verification of your identity</li>
            <li>The agent must provide their own name and contact information</li>
          </ul>
          <p>
            Send authorized agent requests to privacy@smallbizrecon.com with supporting documentation.
          </p>
        </Section>

        <Section icon={<AlertCircle size={20} />} title="Non-Discrimination Guarantee">
          <p style={{ marginBottom: 16 }}>
            <strong>Your Right:</strong> Under CCPA and similar laws, you have the right to non-discrimination. We will NOT:
          </p>
          <ul style={{ marginLeft: 24, marginBottom: 16 }}>
            <li>Deny you service or access to our website or products</li>
            <li>Charge you different prices for the same service</li>
            <li>Provide lower quality service or fewer features</li>
            <li>Suggest that exercising your privacy rights will result in negative treatment</li>
          </ul>
          <p>
            <strong>Legitimate Reasons We CAN Treat You Differently:</strong> We may offer different service levels or pricing if:
          </p>
          <ul style={{ marginLeft: 24 }}>
            <li>You explicitly agree to give us personal information for a discount or incentive</li>
            <li>The data use is directly related to the incentive you receive</li>
            <li>The incentive is reasonable in relation to the data provided</li>
          </ul>
        </Section>

        <Section icon={<Eye size={20} />} title="2024 Annual Metrics & Data Sharing Transparency">
          <p style={{ marginBottom: 16 }}>
            Under CCPA requirements, we disclose our annual data sharing and opt-out metrics (calendar year 2025):
          </p>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 16,
          }}>
            {[
              { label: "Users Who Opted Out", value: "[Metric pending 2025 data]" },
              { label: "Third Parties Receiving Data", value: "Approximately 8-12 (analytics, ads, marketing)" },
              { label: "Average Opt-Out Processing Time", value: "Within 5 business days" },
              { label: "Data Sale Revenue", value: "Not directly monetized; value in ad targeting efficiency" },
            ].map((item, i) => (
              <div key={i} style={{
                padding: 16,
                borderRadius: 12,
                background: "var(--info-bg)",
                border: "1px solid var(--info-border)",
              }}>
                <p style={{ fontSize: 13, color: "var(--text-secondary)", marginBottom: 4 }}>{item.label}</p>
                <p style={{ fontWeight: 600, color: "var(--text-primary)" }}>{item.value}</p>
              </div>
            ))}
          </div>
          <p style={{ marginTop: 16, fontSize: 14, color: "var(--text-secondary)" }}>
            We update these metrics annually and maintain detailed records of opt-out requests and data sharing disclosures.
          </p>
        </Section>

        <Section icon={<Mail size={20} />} title="Privacy Requests & Contact Information">
          <p style={{ marginBottom: 16 }}>
            For opt-out requests, privacy concerns, or to exercise other privacy rights:
          </p>
          <div style={{
            padding: 20,
            borderRadius: 12,
            background: "var(--bg-tertiary)",
            border: "1px solid var(--border-primary)",
            marginBottom: 16,
          }}>
            <p style={{ fontWeight: 600, marginBottom: 8, color: "var(--text-primary)" }}>SmallBiz Recon™ Privacy Team</p>
            <p><strong>Company:</strong> Recon11 Global Systems, LLC</p>
            <p><strong>Privacy Email:</strong> privacy@smallbizrecon.com</p>
            <p><strong>Support Email:</strong> support@smallbizrecon.com</p>
            <p><strong>Response Time:</strong> Within 15 business days (CCPA requests); within 24 hours (support)</p>
            <p><strong>Location:</strong> Orlando, FL</p>
            <p><strong>Website:</strong> SmallBizRecon.com</p>
          </div>
          <p>
            <strong>What to Include:</strong> Your full name, email address, and clear statement of your request. If you have an account, include your account email for faster processing.
          </p>
        </Section>

        <Section icon={<AlertCircle size={20} />} title="Opt-Out Scope & Limitations">
          <p style={{ marginBottom: 16 }}>
            <strong>Important Notes About Your Opt-Out:</strong>
          </p>
          <ul style={{ marginLeft: 24, marginBottom: 16 }}>
            <li><strong>Per-Browser/Device:</strong> Cookie-based opt-outs apply only to the specific browser or device you used. If you use a new browser or device, you may need to opt-out again.</li>
            <li><strong>Cookie Deletion:</strong> If you clear your browser cookies, your opt-out preferences may be reset. You may need to re-enable your opt-out.</li>
            <li><strong>Third-Party Opt-Outs:</strong> Your opt-out with SmallBiz Recon™ does not opt you out of data collection by our service providers (Stripe, Supabase, etc.). See their privacy policies for their opt-out mechanisms.</li>
            <li><strong>Existing Data:</strong> Opt-out does not delete existing data; it only stops future sharing. To delete existing data, submit a separate deletion request.</li>
            <li><strong>Duration:</strong> Your opt-out remains in effect unless you modify your preferences or clear your cookies (for cookie-based opt-outs).</li>
          </ul>
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
            <strong>Your Privacy Matters:</strong> We take your opt-out requests seriously and will honor them promptly. You have complete control over whether your data is shared with third parties for advertising. You can change your preferences at any time—there is no penalty for opting out.
          </div>
        </div>

      </div>
    </EIDLStyleShell>
  );
};

export default DoNotSell;
