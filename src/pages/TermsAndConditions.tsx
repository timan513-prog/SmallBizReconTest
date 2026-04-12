import { FileText, Info, X, Check, AlertCircle, Mail, Lock, Zap, DollarSign, Scale } from 'lucide-react';
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

const TermsAndConditions = () => {
  return (
    <EIDLStyleShell
      title="Terms & Conditions"
      subtitle="Last updated: March 25, 2026"
      icon={<FileText size={30} color="#c8a84e" strokeWidth={1.5} />}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

        <Section icon={<Info size={20} />} title="1. Acceptance & Eligibility">
          <p style={{ marginBottom: 16 }}>
            By accessing, browsing, or using SmallBiz Recon™ (including SmallBizRecon.com, sbarecon.com, and all related services) operated by Recon11 Global Systems, LLC, you agree to be bound by these Terms & Conditions in their entirety. If you do not agree to any part of these terms, you must not access or use our services.
          </p>
          <p style={{ marginBottom: 16 }}>
            <strong>Eligibility Requirements:</strong> By using our services, you represent and warrant that:
          </p>
          <ul style={{ marginLeft: 24 }}>
            <li>You are at least 18 years of age (or the age of majority in your jurisdiction)</li>
            <li>You have the legal capacity to enter into a binding contract</li>
            <li>You will not use our services for illegal purposes or in violation of any applicable laws</li>
            <li>You are not a competitor of Recon11 Global Systems, LLC</li>
            <li>You will comply with all applicable federal, state, and local laws</li>
          </ul>
        </Section>

        <Section icon={<AlertCircle size={20} />} title="2. SBA Non-Affiliation Disclaimer">
          <div style={{
            padding: 16,
            borderRadius: 12,
            background: "rgba(200, 168, 78, 0.1)",
            border: "1px solid rgba(200, 168, 78, 0.2)",
            marginBottom: 16,
          }}>
            <p style={{ color: "var(--accent-gold)", fontWeight: 600, marginBottom: 8 }}>CRITICAL DISCLOSURE:</p>
            <p style={{ marginBottom: 12 }}>
              SmallBiz Recon™ is a private entity operated by Recon11 Global Systems, LLC. We are not affiliated with, endorsed by, endorsed by, certified by, or officially connected to the U.S. Small Business Administration (SBA), any government agency, or any official SBA program.
            </p>
            <p>
              Our services are not authorized by or representative of the SBA. Any use of "SBA" in our materials refers to the publicly available policies and information published by the SBA, not an endorsement or partnership.
            </p>
          </div>
        </Section>

        <Section icon={<Info size={20} />} title="3. Service Description & Not Legal or Financial Advice">
          <p style={{ marginBottom: 16 }}>
            SmallBiz Recon™ provides DIY educational resources designed to help you understand and prepare SBA-related documents. Our services include:
          </p>
          <ul style={{ marginLeft: 24, marginBottom: 16 }}>
            <li>Digital toolkits (Subordination, Release of Collateral, PPP Loan Modifications, EIDL guidance, etc.)</li>
            <li>SBA form guidance, checklists, and document templates</li>
            <li>Educational materials based on publicly available SBA policies</li>
            <li>Strategic DIY tips and best practices</li>
            <li>Worksheets, spreadsheets, and planning tools</li>
            <li>AI-powered educational assistant (Sabbi)</li>
            <li>Access to Intel Board community forums</li>
            <li>Optional supplementary downloads and resources</li>
          </ul>
          <p style={{ marginBottom: 16 }}>
            <strong>IMPORTANT DISCLAIMER:</strong> SmallBiz Recon™ does not provide legal, financial, tax, accounting, or professional advice. Our materials are educational only. We do not:
          </p>
          <ul style={{ marginLeft: 24, marginBottom: 16 }}>
            <li>Provide legal counseling or representation</li>
            <li>Prepare, complete, or file documents on your behalf</li>
            <li>Submit applications or requests to the SBA</li>
            <li>Provide tax or financial planning advice</li>
            <li>Guarantee outcomes, approvals, or specific results</li>
          </ul>
          <p>
            <strong>You are solely responsible</strong> for verifying all information, consulting appropriate professionals (attorney, CPA, accountant), and submitting accurate documents to the SBA. We recommend consulting with a qualified professional before taking action based on our materials.
          </p>
        </Section>

        <Section icon={<X size={20} />} title="4. No Guarantees or Warranties">
          <p style={{ marginBottom: 16 }}>
            You acknowledge that SmallBiz Recon™ provides services on an "AS IS" and "AS AVAILABLE" basis. To the extent permitted by law, we make NO representations or warranties regarding:
          </p>
          <ul style={{ marginLeft: 24, marginBottom: 16 }}>
            <li>SBA application approvals, loan awards, or favorable outcomes</li>
            <li>Compliance with current SBA policies or future updates to those policies</li>
            <li>Accuracy or completeness of documents you prepare using our toolkits</li>
            <li>Prevention of errors, omissions, or rejections by the SBA</li>
            <li>SBA processing timelines, response times, or decision dates</li>
            <li>Compatibility with future SBA policy changes or regulatory modifications</li>
            <li>Performance, security, or reliability of our website or digital services</li>
            <li>Uninterrupted access to your account or purchased materials</li>
          </ul>
          <p>
            We provide no warranty that our services are merchantable, fit for a particular purpose, or non-infringing.
          </p>
        </Section>

        <Section icon={<Check size={20} />} title="5. User Conduct & Prohibited Uses">
          <p style={{ marginBottom: 16 }}>
            You agree not to use our services to:
          </p>
          <ul style={{ marginLeft: 24, marginBottom: 16 }}>
            <li>Violate any applicable laws, regulations, or third-party rights</li>
            <li>Submit false, fraudulent, or misleading information to the SBA or any government agency</li>
            <li>Impersonate any person or entity or misrepresent your affiliation</li>
            <li>Upload, transmit, or distribute malware, viruses, or harmful code</li>
            <li>Conduct unauthorized access, hacking, or intrusion attempts</li>
            <li>Collect or harvest personal data without authorization (scraping, crawling)</li>
            <li>Engage in harassment, abuse, or threatening behavior toward other users</li>
            <li>Post spam, promotional content, or irrelevant material in community forums</li>
            <li>Reverse-engineer, decompile, or attempt to discover our source code or tools</li>
            <li>Redistribute, resell, or sublicense our toolkits or content</li>
            <li>Use our services to train AI models or develop competing products</li>
            <li>Circumvent security measures or access controls</li>
            <li>Interfere with or disrupt our website, servers, or services</li>
          </ul>
          <p>
            Violation of these restrictions may result in immediate termination of your account and legal action.
          </p>
        </Section>

        <Section icon={<Lock size={20} />} title="6. Intellectual Property Rights">
          <p style={{ marginBottom: 16 }}>
            <strong>Our Intellectual Property:</strong> All content, materials, toolkits, templates, graphics, logos, designs, software, code, and other elements on SmallBiz Recon™ are owned by or licensed to Recon11 Global Systems, LLC and are protected by copyright, trademark, and other intellectual property laws.
          </p>
          <p style={{ marginBottom: 16 }}>
            Except as expressly permitted in these Terms, you may not:
          </p>
          <ul style={{ marginLeft: 24, marginBottom: 16 }}>
            <li>Copy, modify, distribute, or display our content</li>
            <li>Reproduce our toolkits for commercial purposes</li>
            <li>Create derivative works based on our materials</li>
            <li>Use our trademarks, logos, or branding without permission</li>
          </ul>
          <p style={{ marginBottom: 16 }}>
            <strong>License Grant:</strong> We grant you a limited, non-exclusive, non-transferable license to access and use our services for personal, educational purposes only. You may download toolkits you have purchased for your personal use.
          </p>
          <p>
            <strong>User-Generated Content:</strong> When you post in our Intel Board community forums, you grant us a worldwide, royalty-free, perpetual license to use, reproduce, modify, and distribute your content. You remain the owner of your posts but acknowledge that we may display them publicly. Do not post proprietary or confidential information.
          </p>
        </Section>

        <Section icon={<DollarSign size={20} />} title="7. Payment Terms & Digital Product Delivery">
          <p style={{ marginBottom: 16 }}>
            <strong>Payment Processing:</strong> All payments are processed securely through Stripe, our third-party payment processor. We do not store your complete credit card information. Stripe may collect and process your payment information subject to their privacy policy (stripe.com/privacy).
          </p>
          <p style={{ marginBottom: 16 }}>
            <strong>Pricing & Currency:</strong> All prices are displayed in US Dollars (USD). Prices are subject to change without notice, but changes will not apply to existing orders. If applicable taxes are required, they will be calculated and added at checkout.
          </p>
          <p style={{ marginBottom: 16 }}>
            <strong>Digital Product Delivery:</strong> After purchase, you will receive:
          </p>
          <ul style={{ marginLeft: 24, marginBottom: 16 }}>
            <li>Instant confirmation email with your receipt and order details</li>
            <li>Access code or direct download link (delivery method depends on product)</li>
            <li>Account access to your purchased toolkit(s) on our platform</li>
          </ul>
          <p style={{ marginBottom: 16 }}>
            Access codes are delivered to the email address associated with your account. Lost or missing codes can be recovered by contacting support@smallbizrecon.com with your purchase confirmation email. There is no charge to retrieve a lost code.
          </p>
          <p>
            <strong>Billing & Charges:</strong> You authorize Recon11 Global Systems, LLC to charge your selected payment method for all purchases. You are responsible for maintaining accurate and current payment information. Charges will appear as "Recon11 Global Systems" or "SmallBiz Recon" on your statement.
          </p>
        </Section>

        <Section icon={<Zap size={20} />} title="8. Refund & Chargeback Policy">
          <p style={{ marginBottom: 16 }}>
            <strong>All Digital Sales Are Final:</strong> Due to the nature of digital products, all sales are final and non-refundable. Once you receive an access code or download, your purchase cannot be reversed.
          </p>
          <p style={{ marginBottom: 16 }}>
            <strong>Exceptions for Technical Issues:</strong> We will provide full refunds or account credit only for:
          </p>
          <ul style={{ marginLeft: 24, marginBottom: 16 }}>
            <li>Broken or non-functional access codes that cannot be recovered</li>
            <li>Technical failures preventing access to purchased materials</li>
            <li>Duplicate charges for the same product within 24 hours</li>
          </ul>
          <p style={{ marginBottom: 16 }}>
            For technical issues, contact support@smallbizrecon.com with proof of purchase. We guarantee a response within 72 hours and will work to resolve the issue or issue a refund.
          </p>
          <p style={{ marginBottom: 16 }}>
            <strong>No Refunds For:</strong> Change of mind, misunderstanding of product contents, non-use, incomplete use, or dissatisfaction with results.
          </p>
          <p>
            <strong>Chargeback Policy:</strong> If you initiate a chargeback or payment dispute without first contacting us to resolve the issue, you agree that:
          </p>
          <ul style={{ marginLeft: 24 }}>
            <li>We may pursue all available legal remedies for chargebacks filed in bad faith</li>
            <li>Your account will be permanently closed</li>
            <li>You will be liable for chargeback fees (typically $15-$100 per dispute)</li>
            <li>You will be banned from purchasing from us in the future</li>
          </ul>
        </Section>

        <Section icon={<AlertCircle size={20} />} title="9. Limitation of Liability">
          <p style={{ marginBottom: 16 }}>
            <strong>DISCLAIMER OF LIABILITY:</strong> To the fullest extent permitted by law, SmallBiz Recon™ and Recon11 Global Systems, LLC (including our owners, managers, employees, and agents) shall not be liable for any of the following:
          </p>
          <ul style={{ marginLeft: 24, marginBottom: 16 }}>
            <li>Indirect, incidental, special, consequential, punitive, or exemplary damages</li>
            <li>Lost profits, lost revenue, lost business opportunity, or loss of goodwill</li>
            <li>Loss or corruption of data or information</li>
            <li>Business interruption or loss of use</li>
            <li>SBA loan rejections, denials, or unfavorable outcomes</li>
            <li>Errors, omissions, or inaccuracies in documents or information</li>
            <li>Third-party actions or SBA policy changes</li>
            <li>Unauthorized access to your account or data breaches (except where caused by our gross negligence)</li>
          </ul>
          <p style={{ marginBottom: 16 }}>
            <strong>Cap on Liability:</strong> In no event shall our total liability for any claim arising out of or related to these Terms or your use of our services exceed the amount you paid for the product or service giving rise to the claim, or $100, whichever is greater. This cap applies to all claims, whether based on warranty, contract, negligence, strict liability, or any other legal theory.
          </p>
          <p>
            These limitations apply even if we have been advised of the possibility of such damages and even if any remedy fails its essential purpose. Some jurisdictions do not allow the limitation of incidental or consequential damages, so these limitations may not apply to you.
          </p>
        </Section>

        <Section icon={<AlertCircle size={20} />} title="10. Indemnification">
          <p style={{ marginBottom: 16 }}>
            You agree to indemnify, defend, and hold harmless Recon11 Global Systems, LLC and SmallBiz Recon™ (and our owners, managers, employees, agents, and partners) from any claims, damages, losses, liabilities, or expenses (including reasonable attorneys' fees) arising out of or related to:
          </p>
          <ul style={{ marginLeft: 24, marginBottom: 16 }}>
            <li>Your use of our services or violation of these Terms</li>
            <li>Your submission of false, fraudulent, or misleading information</li>
            <li>Your violation of any law or third-party rights</li>
            <li>User-generated content you post in our forums</li>
            <li>Your actions or conduct using our materials</li>
          </ul>
          <p>
            This indemnification is your obligation and will apply whether or not we request indemnification.
          </p>
        </Section>

        <Section icon={<Scale size={20} />} title="11. Dispute Resolution & Arbitration">
          <p style={{ marginBottom: 16 }}>
            <strong>Agreement to Arbitrate:</strong> Except for small claims disputes, you and SmallBiz Recon™ agree that any dispute, claim, or controversy arising out of or relating to these Terms, our services, or your use thereof shall be resolved by binding arbitration administered by JAMS (Judicial Arbitration and Mediation Services) under its Streamlined Arbitration Rules and Procedures.
          </p>
          <p style={{ marginBottom: 16 }}>
            <strong>Arbitration Terms:</strong>
          </p>
          <ul style={{ marginLeft: 24, marginBottom: 16 }}>
            <li>Arbitration will be conducted in Orlando, Florida, or by video conference</li>
            <li>Each party will bear its own attorneys' fees and costs, unless the arbitrator awards fees under applicable law</li>
            <li>The arbitrator may award any relief available under applicable law</li>
            <li>The arbitration award will be final and binding and enforceable in any court</li>
          </ul>
          <p style={{ marginBottom: 16 }}>
            <strong>Exception - Small Claims Court:</strong> You may pursue small claims in small claims court in your jurisdiction instead of arbitration for disputes under $5,000. You must comply with small claims procedures and deadlines.
          </p>
          <p style={{ marginBottom: 16 }}>
            <strong>Pre-Arbitration Settlement Efforts:</strong> Before initiating arbitration, you agree to attempt to resolve disputes with us by sending a written notice to support@smallbizrecon.com describing the dispute, the relief sought, and your contact information. We will respond within 30 days. If we cannot resolve the dispute, then either party may initiate arbitration.
          </p>
          <p>
            <strong>No Class Action or Class Arbitration:</strong> Arbitration must be conducted on an individual basis. Neither you nor we may bring a class action, class arbitration, or representative action. The arbitrator may not consolidate claims of multiple parties or engage in any class proceeding.
          </p>
        </Section>

        <Section icon={<Info size={20} />} title="12. Governing Law">
          <p style={{ marginBottom: 16 }}>
            These Terms & Conditions and all matters relating to your use of SmallBiz Recon™ shall be governed by and construed in accordance with the laws of the State of Florida, without regard to its conflict of law principles. The exclusive venue for any claim shall be Orange County, Florida (subject to the arbitration clause above).
          </p>
          <p>
            You consent to the personal jurisdiction of the courts located in Florida for any legal proceedings that cannot be resolved through arbitration.
          </p>
        </Section>

        <Section icon={<AlertCircle size={20} />} title="13. Severability & Force Majeure">
          <p style={{ marginBottom: 16 }}>
            <strong>Severability:</strong> If any provision of these Terms is found to be invalid, unlawful, or unenforceable, that provision will be severed, and the remaining provisions will continue in full force and effect to the maximum extent permitted by law.
          </p>
          <p style={{ marginBottom: 16 }}>
            <strong>Force Majeure:</strong> Neither party shall be liable for any failure to perform its obligations under these Terms caused by events beyond reasonable control, including war, terrorism, natural disasters, pandemics, government actions, or internet outages. During a force majeure event, we may suspend services temporarily, and you acknowledge that service interruptions may occur.
          </p>
        </Section>

        <Section icon={<Zap size={20} />} title="14. Modification of Terms & Termination">
          <p style={{ marginBottom: 16 }}>
            <strong>Changes to Terms:</strong> We may modify these Terms & Conditions at any time. Material changes will be posted on this page with an updated "Last updated" date. Your continued use of our services following notification of changes constitutes acceptance of the updated Terms. Review this page periodically for updates.
          </p>
          <p style={{ marginBottom: 16 }}>
            <strong>Account Termination:</strong> We reserve the right to terminate or suspend your account and deny you access to our services at any time, in our sole discretion, if you:
          </p>
          <ul style={{ marginLeft: 24, marginBottom: 16 }}>
            <li>Violate these Terms or our policies</li>
            <li>Submit fraudulent or false information to the SBA</li>
            <li>Engage in abusive or harassing behavior</li>
            <li>Initiate a chargeback in bad faith</li>
            <li>Pose a risk to our business or other users</li>
          </ul>
          <p>
            Termination will not affect your payment obligations for purchases already made. Upon termination, your right to access purchased materials may be revoked (except where we are obligated to provide continued access).
          </p>
        </Section>

        <Section icon={<Mail size={20} />} title="15. DMCA Copyright Complaints">
          <p style={{ marginBottom: 16 }}>
            If you believe that content on SmallBiz Recon™ infringes your copyright, you may submit a DMCA takedown notice to:
          </p>
          <div style={{
            padding: 16,
            borderRadius: 12,
            background: "var(--bg-tertiary)",
            border: "1px solid var(--border-primary)",
            marginBottom: 16,
          }}>
            <p style={{ fontWeight: 600, marginBottom: 8, color: "var(--text-primary)" }}>Copyright Agent</p>
            <p><strong>Email:</strong> support@smallbizrecon.com</p>
            <p><strong>Subject:</strong> DMCA Takedown Notice</p>
          </div>
          <p>
            Your notice must include: (1) identification of the copyrighted work infringed, (2) identification of the infringing material and its location, (3) your name, address, phone, and email, (4) a statement under penalty of perjury that you are the copyright owner or authorized agent, (5) your physical or electronic signature. Upon receipt of a valid DMCA notice, we will remove the allegedly infringing material and notify the uploader.
          </p>
        </Section>

        <Section icon={<Mail size={20} />} title="16. Contact & Legal Notice">
          <p style={{ marginBottom: 16 }}>For legal inquiries, disputes, or to serve notice on SmallBiz Recon™:</p>
          <div style={{
            padding: 20,
            borderRadius: 12,
            background: "var(--bg-tertiary)",
            border: "1px solid var(--border-primary)",
          }}>
            <p style={{ fontWeight: 600, marginBottom: 8, color: "var(--text-primary)" }}>Legal Notices</p>
            <p><strong>Company:</strong> Recon11 Global Systems, LLC</p>
            <p><strong>Email:</strong> support@smallbizrecon.com</p>
            <p><strong>Support Email:</strong> support@smallbizrecon.com</p>
            <p><strong>Response time:</strong> Within 30 days for legal matters</p>
            <p><strong>Location:</strong> Orlando, FL</p>
            <p><strong>Website:</strong> SmallBizRecon.com</p>
          </div>
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
            <strong>Acknowledgment:</strong> By using SmallBiz Recon™, you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions and our Privacy Policy in their entirety.
          </div>
        </div>

      </div>
    </EIDLStyleShell>
  );
};

export default TermsAndConditions;
