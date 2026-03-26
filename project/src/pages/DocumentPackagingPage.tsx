import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Package, Shield, Clock, FileText, CircleCheck as CheckCircle, Star, BookOpen, ChevronRight, Sun, Moon, Award, CircleAlert as AlertCircle, Users, Briefcase, Scale, DollarSign, ChevronDown, Info, X, Lock, ClipboardList } from "lucide-react";

const FALLBACK_ROUTE = "/";

const THEMES = {
  dark: {
    "--bg-primary": "#181c14",
    "--bg-secondary": "rgba(30, 34, 26, 0.6)",
    "--bg-tertiary": "rgba(38, 44, 32, 0.5)",
    "--bg-card": "rgba(30, 34, 26, 0.6)",
    "--bg-card-hover": "rgba(36, 42, 30, 0.7)",
    "--bg-hero": "linear-gradient(180deg, rgba(50,62,38,0.7) 0%, rgba(24,28,20,0.98) 100%)",
    "--border-primary": "rgba(154, 184, 122, 0.1)",
    "--border-hover": "rgba(154, 184, 122, 0.25)",
    "--text-primary": "#e8ede2",
    "--text-secondary": "#8a9480",
    "--text-muted": "#5a6450",
    "--accent-green": "#9ab87a",
    "--accent-green-bright": "#c8e0b4",
    "--accent-green-deep": "#4A7836",
    "--accent-gold": "#c8a84e",
    "--accent-blue": "#7a9ccc",
    "--glass-blur": "blur(24px)",
    "--shadow-card": "0 4px 32px rgba(0,0,0,0.2)",
    "--shadow-card-hover": "0 24px 64px rgba(0,0,0,0.35)",
    "--grid-opacity": "0.03",
    "--particle-opacity": "0.15",
    "--overlay-green": "rgba(74,120,54,0.08)",
    "--overlay-gold": "rgba(200,168,78,0.04)",
    "--badge-bg": "rgba(154,184,122,0.1)",
    "--badge-border": "rgba(154,184,122,0.2)",
    "--badge-text": "#9ab87a",
    "--cta-bg": "linear-gradient(135deg, rgba(74,120,54,0.3), rgba(154,184,122,0.15))",
    "--cta-border": "rgba(154,184,122,0.25)",
    "--cta-text": "#c8e0b4",
    "--toggle-bg": "rgba(154,184,122,0.1)",
    "--info-bg": "rgba(100,140,200,0.08)",
    "--info-border": "rgba(100,140,200,0.15)",
    "--info-text": "#7a9ccc",
  },
  light: {
    "--bg-primary": "#f5f3ee",
    "--bg-secondary": "rgba(255, 255, 255, 0.7)",
    "--bg-tertiary": "rgba(245, 243, 238, 0.8)",
    "--bg-card": "rgba(255, 255, 255, 0.75)",
    "--bg-card-hover": "rgba(255, 255, 255, 0.9)",
    "--bg-hero": "linear-gradient(180deg, #3d5a2a 0%, #2a3d1e 100%)",
    "--border-primary": "rgba(74, 120, 54, 0.12)",
    "--border-hover": "rgba(74, 120, 54, 0.25)",
    "--text-primary": "#1a2e12",
    "--text-secondary": "#5a6b52",
    "--text-muted": "#8a9680",
    "--accent-green": "#4A7836",
    "--accent-green-bright": "#3d6a2b",
    "--accent-green-deep": "#2d5420",
    "--accent-gold": "#9a7a28",
    "--accent-blue": "#4678AA",
    "--glass-blur": "blur(20px)",
    "--shadow-card": "0 4px 24px rgba(0,0,0,0.06)",
    "--shadow-card-hover": "0 20px 48px rgba(0,0,0,0.1)",
    "--grid-opacity": "0.04",
    "--particle-opacity": "0.1",
    "--overlay-green": "rgba(74,120,54,0.04)",
    "--overlay-gold": "rgba(180,140,40,0.03)",
    "--badge-bg": "rgba(74,120,54,0.08)",
    "--badge-border": "rgba(74,120,54,0.18)",
    "--badge-text": "#4A7836",
    "--cta-bg": "linear-gradient(135deg, #3d6a2b 0%, #4A7836 40%, #5C9A42 100%)",
    "--cta-border": "rgba(74,120,54,0.3)",
    "--cta-text": "#ffffff",
    "--toggle-bg": "rgba(74,120,54,0.08)",
    "--info-bg": "rgba(70,120,170,0.06)",
    "--info-border": "rgba(70,120,170,0.15)",
    "--info-text": "#4678AA",
  },
};

interface TierService {
  name: string;
  price: number;
  checkoutUrl: string;
  description: string;
}

interface PricingTier {
  price: number;
  label: string;
  color: string;
  borderColor: string;
  bgColor: string;
  serviceCount: number;
  services: TierService[];
}

const PRICING_TIERS: PricingTier[] = [
  {
    price: 750,
    label: "$750 Tier",
    color: "#c8a84e",
    borderColor: "rgba(200,168,78,0.25)",
    bgColor: "rgba(200,168,78,0.06)",
    serviceCount: 3,
    services: [
      { name: "Fraud Review / Identity Verification Case", price: 750, checkoutUrl: "", description: "Designed for borrowers whose COVID EIDL loan has been flagged for potential fraud or identity verification issues. We review your case documentation, help you organize a response package, and prepare the supporting materials needed to address SBA's concerns. This service is ideal for borrowers who received a denial or suspension notice tied to a fraud review. Includes cover letter, identity verification support, and response framework." },
      { name: "Recall Letter Package (SBA, Treasury, Collection, Ombudsman, Congressional) + 1 servicing action from $500 list", price: 750, checkoutUrl: "", description: "A comprehensive package for borrowers whose loan has been referred to Treasury or placed in active collection. Includes preparation of your SBA recall letter, Treasury recall letter, collection response, Ombudsman escalation letter, and a Congressional inquiry letter. Also bundles one full servicing action from our $500 tier — such as a change in ownership, subordination, or release of collateral — into a single coordinated packet." },
      { name: "Recall Letter Package (SBA, Treasury, Collection, Ombudsman, Congressional) + 1 servicing action from $250 list", price: 600, checkoutUrl: "", description: "Same comprehensive recall letter package covering SBA, Treasury, collection agency, Ombudsman, and Congressional channels — combined with one servicing action from our $250 tier (such as relocation, payoff quote, or reamortization request). Best for borrowers in collection who also need a straightforward supplemental request addressed at the same time." },
    ],
  },
  {
    price: 500,
    label: "$500 Tier",
    color: "#9ab87a",
    borderColor: "rgba(154,184,122,0.25)",
    bgColor: "rgba(154,184,122,0.06)",
    serviceCount: 13,
    services: [
      { name: "Change in Ownership", price: 500, checkoutUrl: "", description: "For COVID EIDL borrowers transferring full or partial ownership of their business. We prepare your complete change-in-ownership request package including the SBA cover letter, purchase agreement summary, new owner documentation checklist, and supporting forms required under SBA SOP 50 52. Ideal for asset sales, stock transfers, or business buyouts involving an outstanding EIDL." },
      { name: "Assumption", price: 500, checkoutUrl: "", description: "For buyers or borrowers seeking to assume an existing COVID EIDL loan. This service prepares the assumption request package including assumption agreement framework, buyer qualifications summary, SBA cover letter, and required financial documentation checklist. Ensures the packet meets SBA's underwriting and review standards before submission." },
      { name: "Release of Collateral (Business Assets)", price: 500, checkoutUrl: "", description: "For borrowers who need to release business personal property — such as equipment, inventory, or receivables — from the UCC lien securing their COVID EIDL. We prepare the full release request package including justification letter, replacement collateral analysis (if applicable), lien payoff or partial release documentation, and SBA cover letter." },
      { name: "Release of Collateral (Real Estate)", price: 500, checkoutUrl: "", description: "For borrowers seeking to release a deed of trust or mortgage lien on real property securing their COVID EIDL. This package includes the release request cover letter, property valuation support documentation, remaining collateral analysis, and all SBA-required supporting materials. Especially useful when selling or refinancing a property that serves as EIDL collateral." },
      { name: "Release of Guarantor", price: 500, checkoutUrl: "", description: "For borrowers requesting that SBA release a personal guarantor from liability on a COVID EIDL. We prepare the release request with supporting narrative, guarantor financial documentation checklist, and SBA cover letter. Useful in situations such as divorce, partner buyout, or guarantor incapacity where continued personal guarantee is no longer appropriate." },
      { name: "Change of Guarantor", price: 500, checkoutUrl: "", description: "For borrowers substituting one personal guarantor for another on their COVID EIDL. This package prepares the substitution request, incoming guarantor qualification documents, outgoing guarantor release materials, and the SBA cover letter required for review. Applicable in ownership transitions, restructurings, or management changes." },
      { name: "Business Closure (Cease Operations)", price: 500, checkoutUrl: "", description: "For borrowers closing their business while an outstanding COVID EIDL remains. We help prepare the formal notification package to the SBA, including a cease operations letter, asset disposition summary, final financial snapshot, and UCC/lien resolution documentation. Helps borrowers properly wind down and document the closure for SBA review." },
      { name: "Liquidation", price: 500, checkoutUrl: "", description: "For borrowers undergoing an orderly liquidation of business assets to satisfy their COVID EIDL. We prepare the liquidation request and documentation package including asset inventory, disposition plan, proceeds allocation schedule, and SBA cover letter. Designed to give borrowers the best chance of a structured resolution with SBA prior to any referral to Treasury." },
      { name: "Subordination (General)", price: 500, checkoutUrl: "", description: "For borrowers requesting SBA subordinate its lien position on business assets to a new or refinanced lender. We prepare the full subordination package including SBA cover letter, lender information summary, subordination agreement framework, and required financial disclosures. Applicable to working capital lines of credit, equipment financing, and similar transactions." },
      { name: "Subordination (Real Estate)", price: 500, checkoutUrl: "", description: "For borrowers requesting SBA subordinate its real property lien to a new mortgage, refinance, or HELOC. Includes the complete real estate subordination package: SBA cover letter, property appraisal documentation checklist, lender term sheet summary, equity analysis, and all required SBA supporting materials per current SOP guidelines." },
      { name: "Subordination (Factoring / A/R)", price: 500, checkoutUrl: "", description: "For borrowers who factor their accounts receivable or use A/R as collateral with another lender and need SBA to subordinate its UCC position. We prepare the factoring subordination package including the SBA cover letter, factor agreement summary, collateral overlap analysis, and SBA required disclosures." },
      { name: "Offer in Compromise", price: 500, checkoutUrl: "", description: "For COVID EIDL borrowers seeking to settle their outstanding loan balance for less than the full amount owed. We help prepare the OIC package including personal financial statement support, business dissolution or hardship documentation, settlement offer narrative, and SBA cover letter. This is one of the most complex servicing actions — our package helps ensure the submission is complete and compelling." },
      { name: "UCC Amendment / Correction", price: 500, checkoutUrl: "", description: "For borrowers needing to correct, amend, or release UCC filing information associated with their COVID EIDL. We prepare the amendment or correction request package including SBA cover letter, UCC filing details, supporting narrative, and any required lender coordination documentation. Useful when collateral descriptions are inaccurate or when debtor information has changed." },
    ],
  },
  {
    price: 250,
    label: "$250 Tier",
    color: "#7a9ccc",
    borderColor: "rgba(122,156,204,0.25)",
    bgColor: "rgba(122,156,204,0.06)",
    serviceCount: 9,
    services: [
      { name: "Relocation", price: 250, checkoutUrl: "", description: "For borrowers moving their business or collateral to a new physical location. We prepare the relocation request package including the SBA cover letter, new address documentation, collateral location update, and any required insurance compliance updates. SBA may require written approval depending on collateral type and loan terms, so a properly prepared request is essential." },
      { name: "Request Payoff Quote", price: 250, checkoutUrl: "", description: "For borrowers looking to pay off their COVID EIDL in full. We prepare a formal payoff quote request letter addressed to the SBA, including all required borrower identification details and loan information. A written payoff quote from SBA is needed to ensure you receive an accurate final balance including accrued interest and any applicable fees." },
      { name: "Reamortization Request", price: 250, checkoutUrl: "", description: "For borrowers who have missed payments or accumulated a payment arrearage and want to restructure their repayment schedule. We prepare the reamortization request package including a borrower hardship narrative, current loan status summary, and SBA cover letter. A successful reamortization can bring your loan current and reset your monthly payment schedule." },
      { name: "Recall Letter (SBA, Treasury, Collection if required)", price: 250, checkoutUrl: "", description: "For borrowers whose COVID EIDL has been referred to Treasury's Bureau of Fiscal Service or assigned to a collection agency. We prepare your recall letter package to request that SBA recall the debt and resume servicing. Includes SBA recall letter and, where applicable, Treasury and collection agency notification letters based on your loan's current status." },
      { name: "Ombudsman Letter", price: 250, checkoutUrl: "", description: "For borrowers experiencing unresolved issues with SBA's servicing that warrant escalation to the SBA Office of the National Ombudsman. We draft a professional Ombudsman complaint letter documenting the regulatory unfairness, timeline of events, and specific relief requested. Best used alongside or after a direct SBA dispute attempt has not produced results." },
      { name: "Congressional Letter", price: 250, checkoutUrl: "", description: "For borrowers who need to engage their Congressional representative or senator as an advocate with the SBA. We prepare a Congressional inquiry letter suitable for submission to your elected official's office, explaining the issue, the borrower's situation, and the specific assistance being requested. Congressional inquiries often prompt faster SBA response." },
      { name: "Change Business Legal Name / DBA Name", price: 250, checkoutUrl: "", description: "For borrowers who have legally changed their business name or are operating under a new DBA. We prepare the name change notification package including SBA cover letter, supporting state filings or registration documents checklist, and updated business information. Keeping your SBA records current helps avoid servicing delays and compliance issues." },
      { name: "Payment Posting / Balance Dispute Support", price: 250, checkoutUrl: "", description: "For borrowers whose SBA loan balance doesn't match their payment records — such as missing payment credits, incorrect principal reductions, or unexplained balance changes. We prepare a formal dispute letter with a payment history summary, discrepancy analysis, and a request for SBA to review and correct the account balance." },
      { name: "Insurance Compliance Fix", price: 250, checkoutUrl: "", description: "For borrowers who have received an SBA notice about a lapse or deficiency in their required hazard, flood, or business insurance coverage. We prepare the insurance compliance response package including an explanation letter, updated certificate of insurance checklist, and SBA cover letter confirming corrective action taken." },
    ],
  },
  {
    price: 150,
    label: "$150 Tier",
    color: "#cc9966",
    borderColor: "rgba(204,153,102,0.25)",
    bgColor: "rgba(204,153,102,0.06)",
    serviceCount: 1,
    services: [
      { name: "Document Review (Readiness Check)", price: 150, checkoutUrl: "", description: "For borrowers who want a professional readiness review of their existing documents before submitting a servicing action to the SBA. We review what you have, identify gaps, flag common errors, and provide a written checklist of what's missing or needs to be corrected. This standalone review does not include packet assembly — it's designed to help you submit confidently on your own or prepare for a full packaging service." },
    ],
  },
];

const DISCLAIMERS = [
  {
    title: "Educational Service",
    text: "SmallBiz Recon™ provides document review and packaging services for educational and informational purposes. This is not legal advice. For legal matters, consult a licensed attorney.",
  },
  {
    title: "Borrower Responsibility",
    text: "You are responsible for submitting your servicing request and all supporting documents to the SBA. SmallBiz Recon™ does not submit requests on your behalf.",
  },
  {
    title: "No Refunds",
    text: "All services are final sale. Fees are for document preparation and review services, not for guaranteed outcomes.",
  },
  {
    title: "No Guarantees",
    text: "Results are not guaranteed. SBA approval depends on many factors outside our control, including your specific circumstances and SBA policies.",
  },
];

function GridOverlay() {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0, opacity: "var(--grid-opacity)" }}>
      <svg width="100%" height="100%">
        <defs>
          <pattern id="dpGrid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="var(--accent-green)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dpGrid)" />
      </svg>
    </div>
  );
}

function Particles() {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
      {Array.from({ length: 18 }).map((_, i) => (
        <div key={i} style={{
          position: "absolute",
          width: `${1.5 + Math.random() * 2.5}px`, height: `${1.5 + Math.random() * 2.5}px`,
          borderRadius: "50%",
          background: `rgba(154, 184, 122, var(--particle-opacity))`,
          left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
          animation: `dpFloat ${9 + Math.random() * 14}s ease-in-out infinite`,
          animationDelay: `${Math.random() * -12}s`,
        }} />
      ))}
    </div>
  );
}

function FeatureCard({ icon, title, description, delay }: { icon: React.ReactNode; title: string; description: string; delay: number }) {
  return (
    <div style={{
      textAlign: "center", padding: "32px 24px", borderRadius: 18,
      background: "var(--bg-card)", backdropFilter: "var(--glass-blur)",
      border: "1px solid var(--border-primary)",
      transition: "all 0.5s cubic-bezier(0.23,1,0.32,1)",
      animation: `dpCardReveal 0.6s ease-out ${delay}s both`,
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = "translateY(-4px)";
      e.currentTarget.style.borderColor = "var(--border-hover)";
      e.currentTarget.style.boxShadow = "var(--shadow-card-hover)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.borderColor = "var(--border-primary)";
      e.currentTarget.style.boxShadow = "none";
    }}
    >
      <div style={{
        width: 56, height: 56, borderRadius: 16, margin: "0 auto 16px",
        background: "var(--badge-bg)", border: `1px solid var(--badge-border)`,
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "var(--accent-green)",
      }}>
        {icon}
      </div>
      <h3 style={{
        fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 400,
        color: "var(--text-primary)", marginBottom: 8,
      }}>
        {title}
      </h3>
      <p style={{
        fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.7,
        fontFamily: "var(--font-body)",
      }}>
        {description}
      </p>
    </div>
  );
}

/* ── Service Info Modal ── */
function ServiceInfoModal({ service, onClose }: { service: TierService | null; onClose: () => void }) {
  if (!service) return null;
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(0,0,0,0.65)", backdropFilter: "blur(8px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 20, animation: "dpOverlayIn 0.2s ease both",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--bg-primary)", border: "1px solid var(--border-primary)",
          borderRadius: 24, padding: "36px 32px", maxWidth: 520, width: "100%",
          position: "relative", boxShadow: "0 32px 80px rgba(0,0,0,0.45)",
          animation: "dpModalIn 0.3s ease both",
        }}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          style={{
            position: "absolute", top: 16, right: 16,
            width: 32, height: 32, borderRadius: 8,
            background: "var(--badge-bg)", border: "1px solid var(--border-primary)",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", color: "var(--text-secondary)",
          }}
        >
          <X size={16} />
        </button>

        {/* Icon */}
        <div style={{
          width: 48, height: 48, borderRadius: 14, marginBottom: 16,
          background: "var(--badge-bg)", border: "1px solid var(--badge-border)",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "var(--accent-green)",
        }}>
          <FileText size={22} />
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 400,
          color: "var(--text-primary)", marginBottom: 14, lineHeight: 1.3,
          paddingRight: 24,
        }}>
          {service.name}
        </h3>

        {/* Description */}
        <p style={{
          fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.8,
          fontFamily: "var(--font-body)",
        }}>
          {service.description}
        </p>

        {/* Price chip */}
        <div style={{
          marginTop: 20, paddingTop: 16, borderTop: "1px solid var(--border-primary)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <span style={{ fontSize: 13, color: "var(--text-muted)", fontFamily: "var(--font-body)" }}>
            Service price
          </span>
          <span style={{
            fontFamily: "var(--font-display)", fontSize: 22,
            color: "var(--accent-gold)", letterSpacing: "-0.02em",
          }}>
            ${service.price}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── Review Only Card (Task 8) ── */
function ReviewOnlyCard({ index }: { index: number }) {
  return (
    <div style={{
      background: "var(--bg-card)",
      backdropFilter: "var(--glass-blur)", WebkitBackdropFilter: "var(--glass-blur)",
      border: "1px solid var(--border-primary)",
      borderRadius: 20, overflow: "hidden",
      opacity: 0.6,
      cursor: "not-allowed",
      animation: `dpCardReveal 0.7s ease-out ${0.15 + index * 0.1}s both`,
    }}>
      <div style={{
        width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "24px 28px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{
            width: 52, height: 52, borderRadius: 14,
            background: "rgba(100,100,100,0.1)", border: "1px solid rgba(100,100,100,0.15)",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
          }}>
            <Lock size={22} color="var(--text-muted)" />
          </div>
          <div>
            <div style={{
              fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 400,
              color: "var(--text-primary)", letterSpacing: "-0.02em",
            }}>
              Review Only
            </div>
            <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 2 }}>
              This section is coming soon.
            </div>
          </div>
        </div>
        <span style={{
          fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
          color: "var(--accent-gold)", background: "rgba(200,168,78,0.08)",
          border: "1px solid rgba(200,168,78,0.15)", padding: "5px 14px",
          borderRadius: 100, fontFamily: "var(--font-body)", whiteSpace: "nowrap",
        }}>
          Coming Soon
        </span>
      </div>
    </div>
  );
}

function PricingTierCard({ tier, index }: { tier: PricingTier; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const [infoService, setInfoService] = useState<TierService | null>(null);

  return (
    <>
      <ServiceInfoModal service={infoService} onClose={() => setInfoService(null)} />
      <div style={{
        background: "var(--bg-card)",
        backdropFilter: "var(--glass-blur)", WebkitBackdropFilter: "var(--glass-blur)",
        border: `1px solid var(--border-primary)`,
        borderRadius: 20, overflow: "hidden",
        transition: "all 0.5s cubic-bezier(0.23,1,0.32,1)",
        animation: `dpCardReveal 0.7s ease-out ${0.15 + index * 0.1}s both`,
      }}>
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        style={{
          width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "24px 28px", cursor: "pointer",
          background: "transparent", border: "none", textAlign: "left",
          fontFamily: "var(--font-body)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{
            width: 52, height: 52, borderRadius: 14,
            background: tier.bgColor, border: `1px solid ${tier.borderColor}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
          }}>
            <DollarSign size={22} color={tier.color} />
          </div>
          <div>
            <div style={{
              fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 400,
              color: "var(--text-primary)", letterSpacing: "-0.02em",
            }}>
              {tier.label}
            </div>
            <div style={{ fontSize: 13, color: "var(--text-secondary)", marginTop: 2 }}>
              {tier.serviceCount} service{tier.serviceCount !== 1 ? "s" : ""} available
            </div>
          </div>
        </div>
        <ChevronDown
          size={20}
          color="var(--text-secondary)"
          style={{
            transition: "transform 0.3s ease",
            transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </button>

      <div style={{
        maxHeight: expanded ? 2000 : 0,
        overflow: "hidden",
        transition: "max-height 0.5s cubic-bezier(0.23,1,0.32,1)",
      }}>
        <div style={{ padding: "0 28px 28px", display: "flex", flexDirection: "column", gap: 10 }}>
          {tier.services.map((service, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "16px 20px", borderRadius: 14,
              background: "var(--bg-secondary)",
              border: "1px solid var(--border-primary)",
              transition: "all 0.3s ease",
              gap: 16,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--border-hover)";
              e.currentTarget.style.transform = "translateX(4px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border-primary)";
              e.currentTarget.style.transform = "translateX(0)";
            }}
            >
              <div style={{ flex: 1, minWidth: 0, display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{
                  fontSize: 14, fontWeight: 500, color: "var(--text-primary)",
                  fontFamily: "var(--font-body)", lineHeight: 1.5,
                }}>
                  {service.name}
                </div>
                {/* Info button — Task 9 */}
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setInfoService(service); }}
                  title="View description"
                  style={{
                    flexShrink: 0, width: 24, height: 24, borderRadius: 6,
                    background: "var(--info-bg)", border: "1px solid var(--info-border)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: "pointer", color: "var(--info-text)",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "var(--badge-bg)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "var(--info-bg)"; }}
                >
                  <Info size={13} />
                </button>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 14, flexShrink: 0 }}>
                <span style={{
                  fontFamily: "var(--font-display)", fontSize: 20,
                  color: tier.color, letterSpacing: "-0.02em",
                }}>
                  ${service.price}
                </span>
                <a
                  href={service.checkoutUrl || "#"}
                  onClick={(e) => { if (!service.checkoutUrl) e.preventDefault(); }}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 6,
                    padding: "8px 18px", borderRadius: 10,
                    background: service.checkoutUrl ? "var(--cta-bg)" : "var(--badge-bg)",
                    border: `1px solid ${service.checkoutUrl ? "var(--cta-border)" : "var(--badge-border)"}`,
                    color: service.checkoutUrl ? "var(--cta-text)" : "var(--text-muted)",
                    fontSize: 12, fontWeight: 600, textDecoration: "none",
                    fontFamily: "var(--font-body)",
                    cursor: service.checkoutUrl ? "pointer" : "default",
                    transition: "all 0.3s ease",
                    backgroundSize: "200% 200%",
                    whiteSpace: "nowrap",
                    opacity: service.checkoutUrl ? 1 : 0.6,
                  }}
                >
                  {service.checkoutUrl ? "Purchase" : "Coming Soon"}
                  <ChevronRight size={12} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}

function IntakeFormCard() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        marginBottom: 56,
        animation: "dpFadeSlideUp 0.7s ease-out 0.35s both",
      }}
    >
      <div
        style={{
          borderRadius: 20, overflow: "hidden",
          background: "linear-gradient(135deg, rgba(200,168,78,0.12) 0%, rgba(154,184,122,0.08) 100%)",
          border: "1px solid rgba(200,168,78,0.25)",
          padding: "36px 32px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: 24, flexWrap: "wrap",
          transition: "all 0.4s cubic-bezier(0.23,1,0.32,1)",
          cursor: "pointer",
        }}
        onClick={() => navigate("/dispute-recall-service/intake")}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-3px)";
          e.currentTarget.style.borderColor = "rgba(200,168,78,0.45)";
          e.currentTarget.style.boxShadow = "0 20px 48px rgba(0,0,0,0.25)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.borderColor = "rgba(200,168,78,0.25)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{
            width: 60, height: 60, borderRadius: 18, flexShrink: 0,
            background: "rgba(200,168,78,0.15)",
            border: "1px solid rgba(200,168,78,0.3)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <ClipboardList size={26} color="#c8a84e" strokeWidth={1.5} />
          </div>
          <div>
            <div style={{
              fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase",
              color: "#c8a84e", fontFamily: "var(--font-body)", marginBottom: 6,
            }}>
              Get Started
            </div>
            <h3 style={{
              fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 400,
              color: "var(--text-primary)", lineHeight: 1.2, marginBottom: 6,
            }}>
              Ready to Order? Start Here
            </h3>
            <p style={{
              fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.65,
              fontFamily: "var(--font-body)", maxWidth: 480,
            }}>
              Complete our intake form so we can review your case details, confirm the right service tier, and begin preparing your document packet.
            </p>
          </div>
        </div>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          padding: "12px 24px", borderRadius: 12,
          background: "rgba(200,168,78,0.15)",
          border: "1px solid rgba(200,168,78,0.3)",
          color: "#c8a84e", fontSize: 13, fontWeight: 700,
          fontFamily: "var(--font-body)", whiteSpace: "nowrap",
          flexShrink: 0,
        }}>
          Open Intake Form
          <ChevronRight size={14} />
        </div>
      </div>
    </div>
  );
}

export default function DocumentPackagingPage() {
  const [theme, setTheme] = useState("dark");
  const isDark = theme === "dark";
  const vars = THEMES[theme];

  const handleBack = () => {
    if (window.history.length > 1) window.history.back();
    else window.location.href = FALLBACK_ROUTE;
  };

  const cssVarString = Object.entries(vars).map(([k, v]) => `${k}: ${v};`).join("\n");

  return (
    <>
      <style>{`
        :root {
          --font-display: 'Instrument Serif', Georgia, serif;
          --font-body: 'DM Sans', sans-serif;
          ${cssVarString}
        }

        @keyframes dpFloat {
          0%, 100% { transform: translate(0,0) scale(1); opacity:0.3; }
          25% { transform: translate(12px,-18px) scale(1.15); opacity:0.6; }
          50% { transform: translate(-8px,-30px) scale(0.85); opacity:0.2; }
          75% { transform: translate(16px,-12px) scale(1.08); opacity:0.5; }
        }
        @keyframes dpFadeSlideUp {
          from { opacity:0; transform:translateY(28px); }
          to { opacity:1; transform:translateY(0); }
        }
        @keyframes dpCardReveal {
          from { opacity:0; transform:translateY(30px) scale(0.97); }
          to { opacity:1; transform:translateY(0) scale(1); }
        }
        @keyframes dpHeroGlow {
          0%,100% { opacity:0.4; }
          50% { opacity:0.7; }
        }
        @keyframes dpOverlayIn {
          from { opacity:0; }
          to { opacity:1; }
        }
        @keyframes dpModalIn {
          from { opacity:0; transform: scale(0.95) translateY(10px); }
          to { opacity:1; transform: scale(1) translateY(0); }
        }

        * { box-sizing:border-box; margin:0; padding:0; }

        .dp-page {
          min-height:100vh;
          font-family: var(--font-body);
          background: var(--bg-primary);
          color: var(--text-primary);
          overflow-x: hidden;
          position: relative;
          transition: background 0.5s ease, color 0.4s ease;
        }
        .dp-page::before {
          content:'';
          position:fixed; inset:0;
          background:
            radial-gradient(ellipse 70% 50% at 30% 0%, var(--overlay-green), transparent),
            radial-gradient(ellipse 50% 40% at 70% 100%, var(--overlay-gold), transparent);
          pointer-events:none; z-index:0;
          transition: background 0.5s ease;
        }

        .dp-back-link {
          display:inline-flex; align-items:center; gap:8px;
          color: #c8e0b4; font-size:14px; font-weight:600;
          background:none; border:none; cursor:pointer; padding:8px 0;
          font-family: var(--font-body); transition:all 0.3s ease;
        }
        .dp-back-link:hover { color: #e8ede2; gap:12px; }

        .dp-theme-toggle {
          display:flex; align-items:center; gap:6px;
          padding:8px 16px; border-radius:12px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.1);
          color: #c8e0b4; font-size:13px; font-weight:600;
          cursor:pointer; font-family:var(--font-body);
          transition: all 0.3s ease;
        }
        .dp-theme-toggle:hover {
          border-color: rgba(255,255,255,0.2);
          color: #e8ede2;
        }

        .dp-features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        @media (max-width: 1024px) {
          .dp-features-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .dp-features-grid { grid-template-columns: 1fr !important; }
          .dp-hero-title { font-size: 32px !important; }
          .dp-hero-inner { padding: 40px 20px 56px !important; }
          .dp-service-row { flex-direction: column !important; }
          .dp-service-row > div { text-align: center !important; }
        }
      `}</style>

      <div className="dp-page">
        <GridOverlay />
        <Particles />

        <div style={{ position: "relative", zIndex: 1 }}>

          {/* HERO */}
          <div style={{
            position: "relative", overflow: "hidden",
            background: "var(--bg-hero)",
            borderBottom: "1px solid var(--border-primary)",
            animation: "dpFadeSlideUp 0.7s ease-out both",
          }}>
            <div style={{
              position: "absolute", top: "50%", left: "50%",
              transform: "translate(-50%, -50%)", width: 320, height: 320,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(74,120,54,0.12) 0%, transparent 65%)",
              pointerEvents: "none", animation: "dpHeroGlow 6s ease-in-out infinite",
            }} />

            <div className="dp-hero-inner" style={{
              maxWidth: 1200, margin: "0 auto", padding: "48px 32px 72px",
              position: "relative", zIndex: 1,
            }}>
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                marginBottom: 56,
              }}>
                <button type="button" className="dp-back-link" onClick={handleBack} aria-label="Go back">
                  <ArrowLeft size={16} />
                  Back to Last
                </button>
                <button
                  type="button"
                  className="dp-theme-toggle"
                  onClick={() => setTheme(isDark ? "light" : "dark")}
                  aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
                >
                  {isDark ? <Sun size={14} /> : <Moon size={14} />}
                  {isDark ? "Light" : "Dark"}
                </button>
              </div>

              <div style={{
                width: 68, height: 68, borderRadius: 20,
                background: "linear-gradient(135deg, rgba(200,168,78,0.2), rgba(200,168,78,0.08))",
                border: "1px solid rgba(200,168,78,0.25)",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 28px",
              }}>
                <Package size={30} color="#c8a84e" strokeWidth={1.5} />
              </div>

              <h1 className="dp-hero-title" style={{
                fontFamily: "var(--font-display)", fontSize: 50, fontWeight: 400,
                textAlign: "center", color: "#e8ede2", lineHeight: 1.12,
                letterSpacing: "-0.02em", marginBottom: 20,
              }}>
                Document{" "}
                <span style={{ fontStyle: "italic", color: "#c8a84e" }}>Packaging</span>
              </h1>

              <p style={{
                textAlign: "center", fontSize: 16, color: "rgba(232,237,226,0.6)",
                lineHeight: 1.75, maxWidth: 600, margin: "0 auto 8px",
              }}>
                Professional SBA COVID EIDL servicing action preparation.
                Expert document review and packet assembly.
              </p>

              <div style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                marginTop: 24,
              }}>
                <span style={{
                  fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
                  color: "#c8a84e", background: "rgba(200,168,78,0.12)",
                  border: "1px solid rgba(200,168,78,0.2)", padding: "6px 16px",
                  borderRadius: 100, fontFamily: "var(--font-body)",
                }}>
                  Now Accepting Orders
                </span>
              </div>
            </div>
          </div>

          {/* CONTENT */}
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "56px 24px 80px" }}>

            {/* WE REVIEW IT & PREP IT */}
            <div style={{ marginBottom: 56, animation: "dpFadeSlideUp 0.7s ease-out 0.15s both" }}>
              <div style={{ textAlign: "center", marginBottom: 40 }}>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase",
                  color: "var(--accent-green)", fontFamily: "var(--font-body)", marginBottom: 12,
                }}>
                  <Star size={14} />
                  SmallBiz Recon™
                </div>
                <h2 style={{
                  fontFamily: "var(--font-display)", fontSize: 36, fontWeight: 400,
                  color: "var(--text-primary)", marginBottom: 12, letterSpacing: "-0.01em",
                }}>
                  We Review it &amp; Prep It
                </h2>
                <p style={{
                  fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.7,
                  maxWidth: 600, margin: "0 auto",
                }}>
                  Professional SBA COVID EIDL servicing action preparation.
                  Expert document review and packet assembly.
                </p>
              </div>

              <div className="dp-features-grid">
                <FeatureCard
                  icon={<Shield size={24} />}
                  title="Specialized in COVID EIDL"
                  description="We focus exclusively on SBA COVID EIDL servicing actions, providing expert document preparation for borrowers navigating complex SBA requirements."
                  delay={0.25}
                />
                <FeatureCard
                  icon={<Briefcase size={24} />}
                  title="Active Services"
                  description="Full servicing action support for COVID EIDL loans including subordination, change of ownership, offer in compromise, and more."
                  delay={0.35}
                />
                <FeatureCard
                  icon={<FileText size={24} />}
                  title="Document Review"
                  description="Comprehensive review of your documents to ensure completeness, accuracy, and SBA compliance before submission."
                  delay={0.45}
                />
              </div>

              <div style={{
                marginTop: 20,
                display: "flex", justifyContent: "center",
              }}>
                <FeatureCard
                  icon={<Package size={24} />}
                  title="Packet Preparation"
                  description="Professional assembly of your complete servicing action packet, organized and formatted to SBA standards."
                  delay={0.55}
                />
              </div>
            </div>

            {/* WHAT IS A SERVICING ACTION */}
            <div style={{
              marginBottom: 56, padding: "36px 32px", borderRadius: 20,
              background: "var(--info-bg)", border: `1px solid var(--info-border)`,
              animation: "dpFadeSlideUp 0.7s ease-out 0.3s both",
            }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                  background: "var(--info-bg)", border: `1px solid var(--info-border)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <BookOpen size={20} color="var(--info-text)" />
                </div>
                <div>
                  <h3 style={{
                    fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 400,
                    color: "var(--text-primary)", marginBottom: 10,
                  }}>
                    What is a Servicing Action?
                  </h3>
                  <p style={{
                    fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.8,
                    fontFamily: "var(--font-body)",
                  }}>
                    A servicing action is any formal request you submit to the SBA to modify, update, or resolve an issue with your COVID EIDL loan. Examples include requesting a change in ownership, subordination of collateral, hardship deferment, or reconsideration of a loan decision. Each servicing action requires specific documentation and supporting materials prepared according to SBA requirements.
                  </p>
                </div>
              </div>
            </div>

            {/* INTAKE FORM CARD */}
            <IntakeFormCard />

            {/* PRICING TIERS */}
            <div style={{ marginBottom: 56, animation: "dpFadeSlideUp 0.7s ease-out 0.4s both" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 14,
                  background: "var(--badge-bg)", border: `1px solid var(--badge-border)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "var(--accent-green)",
                }}>
                  <Scale size={22} />
                </div>
                <div>
                  <h2 style={{
                    fontFamily: "var(--font-display)", fontSize: 30, fontWeight: 400,
                    color: "var(--text-primary)", letterSpacing: "-0.01em",
                  }}>
                    Service Pricing
                  </h2>
                  <p style={{ fontSize: 14, color: "var(--text-secondary)" }}>
                    Select a tier to view available services
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {PRICING_TIERS.map((tier, i) => (
                  <PricingTierCard key={tier.label} tier={tier} index={i} />
                ))}
                <ReviewOnlyCard index={PRICING_TIERS.length} />
              </div>
            </div>

            {/* WHY CHOOSE US */}
            <div style={{ marginBottom: 56, animation: "dpFadeSlideUp 0.7s ease-out 0.5s both" }}>
              <div style={{ textAlign: "center", marginBottom: 36 }}>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase",
                  color: "var(--accent-green)", fontFamily: "var(--font-body)",
                }}>
                  <Award size={14} />
                  Why Choose Us
                </div>
                <h2 style={{
                  fontFamily: "var(--font-display)", fontSize: 30, fontWeight: 400,
                  color: "var(--text-primary)", marginTop: 10,
                }}>
                  Professional Document Preparation
                </h2>
              </div>
              <div className="dp-features-grid">
                <FeatureCard icon={<Shield size={24} />} title="SBA-Aligned" description="Every packet follows current SBA requirements and formatting standards" delay={0.55} />
                <FeatureCard icon={<Users size={24} />} title="Expert Review" description="Experienced team focused exclusively on SBA COVID EIDL servicing actions" delay={0.62} />
                <FeatureCard icon={<CheckCircle size={24} />} title="Complete Packets" description="Professionally assembled, organized, and formatted to SBA standards" delay={0.69} />
              </div>
            </div>

            {/* DISCLAIMERS */}
            <div style={{
              marginBottom: 0, padding: "36px 32px", borderRadius: 20,
              background: "var(--bg-card)", border: "1px solid var(--border-primary)",
              animation: "dpFadeSlideUp 0.7s ease-out 0.6s both",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                <AlertCircle size={20} color="var(--accent-gold)" />
                <h3 style={{
                  fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 400,
                  color: "var(--text-primary)",
                }}>
                  Important Disclaimers
                </h3>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {DISCLAIMERS.map((d, i) => (
                  <div key={i} style={{
                    padding: "16px 20px", borderRadius: 14,
                    background: "var(--bg-secondary)", border: "1px solid var(--border-primary)",
                  }}>
                    <div style={{
                      fontSize: 14, fontWeight: 600, color: "var(--accent-gold)",
                      fontFamily: "var(--font-body)", marginBottom: 6,
                    }}>
                      {d.title}
                    </div>
                    <p style={{
                      fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.7,
                      fontFamily: "var(--font-body)",
                    }}>
                      {d.text}
                    </p>
                  </div>
                ))}
              </div>

              <div style={{
                marginTop: 24, padding: "16px 20px", borderRadius: 14,
                background: "rgba(200,168,78,0.06)", border: "1px solid rgba(200,168,78,0.15)",
              }}>
                <p style={{
                  fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.7,
                  fontFamily: "var(--font-body)",
                }}>
                  <strong style={{ color: "var(--accent-gold)" }}>Important Notice:</strong>{" "}
                  SmallBiz Recon™ is an independent document review and packaging service. We are not the U.S. Small Business Administration and do not submit requests on your behalf. We are not a law firm and we do not provide legal, business or tax related advice. You remain responsible for submitting your servicing request and supporting documents.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}