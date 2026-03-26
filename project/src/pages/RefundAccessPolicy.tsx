import { DollarSign, Info, X, Check, Clock, Mail, AlertCircle, FileText, Shield } from 'lucide-react';
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

const RefundAccessPolicy = () => {
  return (
    <EIDLStyleShell
      title="Refund & Access Policy"
      subtitle="Last updated: March 25, 2026"
      icon={<DollarSign size={30} color="#c8a84e" strokeWidth={1.5} />}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

        <Section icon={<Shield size={20} />} title="Overview & Key Principle">
          <p style={{ marginBottom: 16 }}>
            Recon11 Global Systems, LLC operates SmallBiz Recon™ with a clear and customer-focused digital product policy. We stand behind the quality of our toolkits and are committed to resolving legitimate issues quickly and fairly.
          </p>
          <p style={{ marginBottom: 16 }}>
            <strong>Core Principle:</strong> All sales of digital products are final and non-refundable. However, we will absolutely resolve any technical issues that prevent you from accessing or using your purchase.
          </p>
          <p>
            This policy applies to all digital products sold through SmallBizRecon.com, including educational toolkits, templates, spreadsheets, supplementary downloads, and community forum access.
          </p>
        </Section>

        <Section icon={<AlertCircle size={20} />} title="Digital Sales Are Final — Here's Why">
          <p style={{ marginBottom: 16 }}>
            Digital products cannot be returned, restocked, or resold once delivered. Unlike physical goods, we cannot reclaim or reuse digital files. Once you receive an access code or download link, the product is yours to use perpetually.
          </p>
          <p style={{ marginBottom: 16 }}>
            <strong>Before You Purchase:</strong> We strongly recommend that you:
          </p>
          <ul style={{ marginLeft: 24, marginBottom: 16 }}>
            <li>Read the full product description on the sales page</li>
            <li>Review sample pages or preview materials (where available)</li>
            <li>Check the product includes (list of templates, guides, worksheets, etc.)</li>
            <li>Verify the toolkit matches your needs</li>
            <li>Contact support@smallbizrecon.com with questions before purchasing</li>
          </ul>
          <p>
            We're happy to answer questions about product contents, compatibility, or suitability before you buy. Once you have the information you need, you can purchase with confidence.
          </p>
        </Section>

        <Section icon={<X size={20} />} title="No Refunds For These Reasons">
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 16,
            marginBottom: 16,
          }}>
            {[
              { title: "Change of Mind", desc: "Deciding after purchase you no longer want the toolkit" },
              { title: "Misunderstanding", desc: "Misunderstanding of product purpose, contents, or quality" },
              { title: "Non-Use", desc: "Choosing not to use the toolkit or incomplete use" },
              { title: "Buyer's Remorse", desc: "General dissatisfaction with the purchase decision" },
              { title: "Price Changes", desc: "Product went on sale after your purchase" },
              { title: "Technical Skill Level", desc: "Finding the toolkit more complex than expected" },
            ].map((item, i) => (
              <div key={i} style={{
                padding: 16,
                borderRadius: 12,
                background: "rgba(200, 80, 80, 0.08)",
                border: "1px solid rgba(200, 80, 80, 0.2)",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <X size={16} color="#cc6666" />
                  <h4 style={{ fontWeight: 600, color: "var(--text-primary)", fontSize: 14 }}>{item.title}</h4>
                </div>
                <p style={{ fontSize: 13, color: "var(--text-secondary)" }}>{item.desc}</p>
              </div>
            ))}
          </div>
          <p>
            <strong>Important:</strong> If you have legitimate concerns about a product, contact us before filing a chargeback or dispute. We want to make things right.
          </p>
        </Section>

        <Section icon={<Check size={20} />} title="We WILL Help With Technical & Legitimate Issues">
          <p style={{ marginBottom: 16 }}>
            SmallBiz Recon™ commits to resolving the following issues fully, with a 72-hour response guarantee:
          </p>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 16,
          }}>
            {[
              { title: "Access Code Issues", desc: "Non-functional, expired, or missing access codes delivered after purchase" },
              { title: "Download Failures", desc: "Broken download links or corrupted file downloads" },
              { title: "Platform Access", desc: "Unable to log in or access toolkit materials on our platform" },
              { title: "Duplicate Charges", desc: "Accidentally charged multiple times for the same purchase within 24 hours" },
              { title: "Missing Content", desc: "Purchased toolkit missing pages, files, or promised materials" },
            ].map((item, i) => (
              <div key={i} style={{
                padding: 16,
                borderRadius: 12,
                background: "var(--badge-bg)",
                border: "1px solid var(--badge-border)",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <Check size={16} color="var(--accent-green)" />
                  <h4 style={{ fontWeight: 600, color: "var(--text-primary)", fontSize: 14 }}>{item.title}</h4>
                </div>
                <p style={{ fontSize: 13, color: "var(--text-secondary)" }}>{item.desc}</p>
              </div>
            ))}
          </div>
          <p style={{ marginTop: 16 }}>
            For any of these issues, we'll work quickly to re-send access codes, provide alternative downloads, fix platform access, or issue a full refund/credit if the technical issue cannot be resolved.
          </p>
        </Section>

        <Section icon={<Clock size={20} />} title="72-Hour Technical Support Guarantee">
          <p style={{ marginBottom: 16 }}>
            If you experience a technical issue preventing access to your purchase, we guarantee:
          </p>
          <ul style={{ marginLeft: 24, marginBottom: 16 }}>
            <li><strong>Within 2 hours:</strong> Initial acknowledgment of your support request (during business hours, M-F 9am-5pm EST)</li>
            <li><strong>Within 24 hours:</strong> Detailed investigation and update on the issue</li>
            <li><strong>Within 72 hours:</strong> Full resolution (fixed access, replacement file, or refund offer)</li>
          </ul>
          <p>
            Contact support@smallbizrecon.com with a detailed description of your technical issue and proof of purchase (order confirmation email). We will respond to every legitimate support request.
          </p>
        </Section>

        <Section icon={<FileText size={20} />} title="Access Codes & Digital Delivery">
          <p style={{ marginBottom: 16 }}>
            <strong>How Access Works:</strong> After you complete your purchase, you will receive:
          </p>
          <ul style={{ marginLeft: 24, marginBottom: 16 }}>
            <li>Instant order confirmation email to the address you provided at checkout</li>
            <li>Access code (if applicable) or direct download link in a separate email</li>
            <li>Account access to your toolkit materials on SmallBizRecon.com</li>
            <li>Instructions for accessing and using your purchase</li>
          </ul>
          <p style={{ marginBottom: 16 }}>
            <strong>Access Code Terms:</strong>
          </p>
          <ul style={{ marginLeft: 24, marginBottom: 16 }}>
            <li>Codes are delivered instantly (usually within 5 minutes of purchase)</li>
            <li>Codes do not expire — you can use them at any time, forever</li>
            <li>Codes are non-transferable and licensed for your personal use only</li>
            <li>Sharing codes with others violates our Terms & Conditions</li>
            <li>If you lose your code, contact support@smallbizrecon.com with your purchase confirmation email to retrieve it (no charge)</li>
          </ul>
          <p>
            <strong>Download-Based Products:</strong> Some toolkits are delivered as direct downloads rather than access codes. Downloads are available in multiple formats and can be re-downloaded indefinitely from your account.
          </p>
        </Section>

        <Section icon={<AlertCircle size={20} />} title="Chargeback & Dispute Policy">
          <p style={{ marginBottom: 16 }}>
            <strong>Important:</strong> Before filing a chargeback, payment dispute, or claim with your credit card company, please contact us first at support@smallbizrecon.com. We can usually resolve issues much faster.
          </p>
          <p style={{ marginBottom: 16 }}>
            <strong>Chargeback Consequences:</strong> If you initiate a chargeback without first attempting to resolve the issue directly with us, you agree that:
          </p>
          <ul style={{ marginLeft: 24, marginBottom: 16 }}>
            <li>Your account will be permanently closed and access to all purchases revoked</li>
            <li>You will not be able to purchase from SmallBiz Recon™ in the future</li>
            <li>You will be liable for chargeback fees (typically $15-$100 per dispute)</li>
            <li>We may pursue legal action to recover chargeback fees and damages</li>
            <li>Your information may be reported to payment fraud prevention networks</li>
          </ul>
          <p>
            <strong>What We Ask:</strong> Give us 5 business days to respond to your support request before filing a chargeback. We genuinely want to resolve issues and will work quickly.
          </p>
        </Section>

        <Section icon={<Info size={20} />} title="Duplicate Charge & Refund Process">
          <p style={{ marginBottom: 16 }}>
            <strong>If Charged Multiple Times:</strong> If you were accidentally charged more than once for the same product:
          </p>
          <ul style={{ marginLeft: 24, marginBottom: 16 }}>
            <li>Contact support@smallbizrecon.com immediately with proof of the duplicate charges</li>
            <li>Include your order confirmation emails and credit card statement screenshots</li>
            <li>We will investigate and issue a refund or account credit within 5 business days</li>
            <li>Your duplicate payment will be reversed to your original payment method</li>
          </ul>
          <p style={{ marginBottom: 16 }}>
            <strong>Refund Exceptions (Rare):</strong> In the following situations, we may offer a refund or account credit even outside our normal no-refund policy:
          </p>
          <ul style={{ marginLeft: 24 }}>
            <li>Technical failures that we cannot resolve within 72 hours</li>
            <li>Legitimate duplicate charges or billing errors</li>
            <li>Product no longer available and cannot be delivered</li>
          </ul>
        </Section>

        <Section icon={<Shield size={20} />} title="Florida Consumer Protection Compliance">
          <p style={{ marginBottom: 16 }}>
            SmallBiz Recon™ complies with Florida consumer protection laws, including Florida Statute Section 501.211 (Florida Information Protection Act) regarding data security and breach notification.
          </p>
          <p style={{ marginBottom: 16 }}>
            <strong>Your Consumer Rights in Florida:</strong> Under Florida law, you have the right to:
          </p>
          <ul style={{ marginLeft: 24, marginBottom: 16 }}>
            <li>Clear, accurate, and truthful advertising of products and pricing</li>
            <li>Safe, secure processing of your payment information</li>
            <li>Prompt notification if we experience a data breach affecting your information</li>
            <li>Clear disclosure of our refund and access policies (provided in this document)</li>
            <li>Dispute resolution and fair treatment of complaints</li>
          </ul>
          <p>
            If you have concerns about our practices or believe we have violated Florida consumer protection laws, you may file a complaint with the Florida Attorney General's Consumer Protection Division at <strong>800-HELP-FLA (800-435-7352)</strong>.
          </p>
        </Section>

        <Section icon={<Mail size={20} />} title="Contact Us for Support & Issues">
          <p style={{ marginBottom: 16 }}>
            Have a question about this policy or need to report a technical issue? We're here to help:
          </p>
          <div style={{
            padding: 20,
            borderRadius: 12,
            background: "var(--bg-tertiary)",
            border: "1px solid var(--border-primary)",
            marginBottom: 16,
          }}>
            <p style={{ fontWeight: 600, marginBottom: 8, color: "var(--text-primary)" }}>SmallBiz Recon™ Support</p>
            <p><strong>Company:</strong> Recon11 Global Systems, LLC</p>
            <p><strong>Email:</strong> support@smallbizrecon.com</p>
            <p><strong>Response Time:</strong> Within 2 hours (business hours); within 24 hours (all hours); Full resolution within 72 hours</p>
            <p><strong>Location:</strong> Orlando, FL</p>
            <p><strong>Website:</strong> SmallBizRecon.com</p>
          </div>
          <p>
            <strong>What to Include in Your Request:</strong> Product name, order confirmation email, description of the issue, and any relevant screenshots or error messages. This helps us resolve your issue faster.
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
            <strong>Our Promise:</strong> All digital sales are final, but we stand 100% behind our products. If you experience a legitimate technical issue, we will resolve it or refund you, guaranteed. Thank you for your trust in SmallBiz Recon™.
          </div>
        </div>

      </div>
    </EIDLStyleShell>
  );
};

export default RefundAccessPolicy;
