import { useState, useEffect, useCallback, useRef } from "react";
import {
  ArrowLeft, Sun, Moon, FileText, ChevronRight, Sparkles, Zap, Target,
  BarChart3, ClipboardList, Building2, DollarSign, Search, Settings,
  Rocket, Copy, RotateCcw, Plus, ChevronDown, CircleAlert as AlertCircle,
  CircleCheck as CheckCircle, Loader2, Download
} from "lucide-react";

/* ═══════════════════════════════════════════
   CONFIG
   ═══════════════════════════════════════════ */
const FALLBACK_ROUTE = "/";

const STEPS = [
  { id: "basics", label: "Business Basics", icon: <Building2 size={16} /> },
  { id: "details", label: "Details & Model", icon: <ClipboardList size={16} /> },
  { id: "market", label: "Market & Competition", icon: <Search size={16} /> },
  { id: "financials", label: "Financial Overview", icon: <DollarSign size={16} /> },
  { id: "options", label: "Format & Options", icon: <Settings size={16} /> },
  { id: "generate", label: "Generate Plan", icon: <Rocket size={16} /> },
];

const INDUSTRIES = [
  "Restaurant / Food Service", "Retail / E-Commerce", "Professional Services",
  "Construction / Trades", "Healthcare / Wellness", "Technology / SaaS",
  "Real Estate", "Manufacturing", "Transportation / Logistics",
  "Education / Training", "Beauty / Personal Care", "Fitness / Recreation",
  "Consulting", "Nonprofit", "Agriculture", "Automotive", "Other",
];

const BUSINESS_STAGES = [
  "Idea / Pre-Launch", "Startup (< 1 year)", "Early Growth (1-3 years)",
  "Established (3-5 years)", "Scaling (5+ years)", "Turnaround / Pivot",
];

const PLAN_PURPOSES = [
  "SBA Loan Application", "Bank Loan", "Investor Pitch",
  "Internal Strategy", "Partnership Proposal", "Grant Application", "Personal Roadmap",
];

const SECTION_OPTIONS = [
  "Executive Summary", "Company Description", "Market Analysis",
  "Organization & Management", "Products & Services", "Marketing Strategy",
  "Financial Projections", "Funding Request", "Appendix", "SWOT Analysis",
  "Operations Plan", "Risk Assessment",
];

const SHORT_SECTIONS = [
  "Executive Summary", "Company Description", "Products & Services",
  "Market Analysis", "Financial Projections",
];

/* ═══════════════════════════════════════════
   THEME SYSTEM
   ═══════════════════════════════════════════ */
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
    "--border-gold": "rgba(200, 168, 78, 0.2)",
    "--text-primary": "#e8ede2",
    "--text-secondary": "#8a9480",
    "--text-muted": "#5a6450",
    "--accent-green": "#9ab87a",
    "--accent-green-bright": "#c8e0b4",
    "--accent-green-deep": "#4A7836",
    "--accent-gold": "#c8a84e",
    "--accent-gold-dim": "rgba(200,168,78,0.6)",
    "--accent-blue": "#7a9ccc",
    "--glass-blur": "blur(24px)",
    "--shadow-card": "0 4px 32px rgba(0,0,0,0.2)",
    "--grid-opacity": "0.03",
    "--particle-opacity": "0.15",
    "--overlay-green": "rgba(74,120,54,0.08)",
    "--overlay-gold": "rgba(200,168,78,0.04)",
    "--badge-bg": "rgba(154,184,122,0.1)",
    "--badge-border": "rgba(154,184,122,0.2)",
    "--badge-text": "#9ab87a",
    "--disabled-bg": "rgba(60,60,60,0.3)",
    "--disabled-border": "rgba(100,100,100,0.15)",
    "--disabled-text": "#555",
    "--cta-bg": "linear-gradient(135deg, rgba(74,120,54,0.3), rgba(154,184,122,0.15))",
    "--cta-border": "rgba(154,184,122,0.25)",
    "--cta-text": "#c8e0b4",
    "--info-bg": "rgba(100,140,200,0.08)",
    "--info-border": "rgba(100,140,200,0.15)",
    "--info-text": "#7a9ccc",
    "--input-bg": "rgba(20, 24, 16, 0.8)",
    "--input-border": "rgba(154, 184, 122, 0.12)",
    "--input-focus": "rgba(154, 184, 122, 0.35)",
    "--error-bg": "rgba(200, 60, 60, 0.08)",
    "--error-border": "rgba(200, 60, 60, 0.2)",
    "--error-text": "#e07070",
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
    "--border-gold": "rgba(180, 140, 40, 0.2)",
    "--text-primary": "#1a2e12",
    "--text-secondary": "#5a6b52",
    "--text-muted": "#8a9680",
    "--accent-green": "#4A7836",
    "--accent-green-bright": "#3d6a2b",
    "--accent-green-deep": "#2d5420",
    "--accent-gold": "#9a7a28",
    "--accent-gold-dim": "rgba(154,122,40,0.6)",
    "--accent-blue": "#4678AA",
    "--glass-blur": "blur(20px)",
    "--shadow-card": "0 4px 24px rgba(0,0,0,0.06)",
    "--grid-opacity": "0.04",
    "--particle-opacity": "0.1",
    "--overlay-green": "rgba(74,120,54,0.04)",
    "--overlay-gold": "rgba(180,140,40,0.03)",
    "--badge-bg": "rgba(74,120,54,0.08)",
    "--badge-border": "rgba(74,120,54,0.18)",
    "--badge-text": "#4A7836",
    "--disabled-bg": "rgba(200,200,200,0.4)",
    "--disabled-border": "rgba(180,180,180,0.3)",
    "--disabled-text": "#999",
    "--cta-bg": "linear-gradient(135deg, #3d6a2b 0%, #4A7836 40%, #5C9A42 100%)",
    "--cta-border": "rgba(74,120,54,0.3)",
    "--cta-text": "#ffffff",
    "--info-bg": "rgba(70,120,170,0.06)",
    "--info-border": "rgba(70,120,170,0.15)",
    "--info-text": "#4678AA",
    "--input-bg": "rgba(255, 255, 255, 0.9)",
    "--input-border": "rgba(74, 120, 54, 0.15)",
    "--input-focus": "rgba(74, 120, 54, 0.4)",
    "--error-bg": "rgba(200, 60, 60, 0.06)",
    "--error-border": "rgba(200, 60, 60, 0.2)",
    "--error-text": "#c44040",
  },
};

/* ═══════════════════════════════════════════
   SHARED SUB-COMPONENTS
   ═══════════════════════════════════════════ */

function GridOverlay() {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0, opacity: "var(--grid-opacity)" }}>
      <svg width="100%" height="100%">
        <defs>
          <pattern id="bpGrid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="var(--accent-green)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#bpGrid)" />
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
          animation: `pFloat ${9 + Math.random() * 14}s ease-in-out infinite`,
          animationDelay: `${Math.random() * -12}s`,
        }} />
      ))}
    </div>
  );
}

function StepHeader({ icon, title, subtitle }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
      <div style={{
        width: 40, height: 40, borderRadius: 12,
        background: "var(--badge-bg)", border: "1px solid var(--badge-border)",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "var(--accent-green)",
      }}>
        {icon}
      </div>
      <div>
        <h2 style={{
          fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 400,
          color: "var(--text-primary)", letterSpacing: "-0.01em", margin: 0,
        }}>
          {title}
        </h2>
        {subtitle && <p style={{ fontSize: 12, color: "var(--text-muted)", margin: "2px 0 0", fontFamily: "var(--font-body)" }}>{subtitle}</p>}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   FORM COMPONENTS
   ═══════════════════════════════════════════ */

function TextInput({ label, value, onChange, placeholder, multiline, required, helpText }) {
  const Tag = multiline ? "textarea" : "input";
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", fontFamily: "var(--font-body)", letterSpacing: "0.02em" }}>
        {label} {required && <span style={{ color: "var(--accent-gold)" }}>*</span>}
      </label>
      <Tag
        value={value} onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        rows={multiline ? 4 : undefined}
        className="bp-input"
        style={{
          padding: "12px 16px", borderRadius: 12,
          background: "var(--input-bg)", border: "1px solid var(--input-border)",
          color: "var(--text-primary)", fontSize: 14, fontFamily: "var(--font-body)",
          outline: "none", resize: multiline ? "vertical" : "none",
          transition: "border-color 0.3s ease", lineHeight: 1.6,
        }}
      />
      {helpText && <span style={{ fontSize: 11, color: "var(--text-muted)", fontFamily: "var(--font-body)" }}>{helpText}</span>}
    </div>
  );
}

function SelectInput({ label, value, onChange, options, required }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", fontFamily: "var(--font-body)", letterSpacing: "0.02em" }}>
        {label} {required && <span style={{ color: "var(--accent-gold)" }}>*</span>}
      </label>
      <div style={{ position: "relative" }}>
        <select
          value={value} onChange={e => onChange(e.target.value)}
          className="bp-input"
          style={{
            width: "100%", padding: "12px 16px", paddingRight: 40, borderRadius: 12,
            background: "var(--input-bg)", border: "1px solid var(--input-border)",
            color: value ? "var(--text-primary)" : "var(--text-muted)",
            fontSize: 14, fontFamily: "var(--font-body)", outline: "none",
            cursor: "pointer", appearance: "none", transition: "border-color 0.3s ease",
          }}
        >
          <option value="">Select...</option>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
        <ChevronDown size={14} style={{
          position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)",
          color: "var(--text-muted)", pointerEvents: "none",
        }} />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   PROGRESS BAR
   ═══════════════════════════════════════════ */

function ProgressBar({ currentStep, steps, onStepClick }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 0, padding: "12px 0", overflowX: "auto", width: "100%" }}>
      {steps.map((step, i) => (
        <div key={step.id} style={{ display: "flex", alignItems: "center", flex: i < steps.length - 1 ? 1 : "none" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, minWidth: 56, cursor: i <= currentStep ? "pointer" : "default" }}
            onClick={() => { if (i <= currentStep) onStepClick(i); }}>
            <div style={{
              width: 34, height: 34, borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              background: i <= currentStep ? "linear-gradient(135deg, rgba(74,120,54,0.3), rgba(154,184,122,0.15))" : "var(--bg-tertiary)",
              border: i <= currentStep ? "1px solid var(--accent-green)" : "1px solid var(--border-primary)",
              color: i <= currentStep ? "var(--accent-green)" : "var(--text-muted)",
              transition: "all 0.4s ease",
              boxShadow: i === currentStep ? "0 0 16px rgba(154,184,122,0.2)" : "none",
            }}>
              {i < currentStep ? <CheckCircle size={16} /> : step.icon}
            </div>
            <span style={{
              fontSize: 9, color: i <= currentStep ? "var(--accent-green)" : "var(--text-muted)",
              fontFamily: "var(--font-body)", fontWeight: i === currentStep ? 700 : 500,
              textAlign: "center", whiteSpace: "nowrap", letterSpacing: "0.02em",
            }}>
              {step.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div style={{
              flex: 1, height: 1, margin: "0 4px", marginBottom: 18,
              background: i < currentStep ? "var(--accent-green)" : "var(--border-primary)",
              opacity: i < currentStep ? 0.4 : 1,
            }} />
          )}
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════
   MARKDOWN RENDERER
   ═══════════════════════════════════════════ */

function RenderMarkdown({ md }) {
  if (!md) return null;
  const lines = md.split("\n");
  const elements = [];
  let tableRows = [];
  let inTable = false;

  const processBold = (text) => {
    return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
      part.startsWith("**") && part.endsWith("**")
        ? <strong key={i} style={{ color: "var(--text-primary)" }}>{part.slice(2, -2)}</strong>
        : part
    );
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith("|") && line.endsWith("|")) {
      if (!inTable) { inTable = true; tableRows = []; }
      if (line.replace(/[\s|:-]/g, "").length > 0) {
        tableRows.push(line.split("|").filter(c => c.trim()).map(c => c.trim()));
      }
      if (i === lines.length - 1 || !lines[i + 1]?.startsWith("|")) {
        elements.push(
          <div key={i} style={{ overflowX: "auto", margin: "14px 0", borderRadius: 12, border: "1px solid var(--border-primary)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, fontFamily: "var(--font-body)" }}>
              {tableRows.length > 0 && <thead><tr>
                {tableRows[0].map((cell, ci) => (
                  <th key={ci} style={{ padding: "10px 14px", textAlign: "left", borderBottom: "2px solid var(--accent-green)", color: "var(--accent-green)", fontWeight: 600, background: "var(--bg-tertiary)" }}>{cell}</th>
                ))}
              </tr></thead>}
              <tbody>{tableRows.slice(1).map((row, ri) => (
                <tr key={ri}>{row.map((cell, ci) => (
                  <td key={ci} style={{ padding: "8px 14px", borderBottom: "1px solid var(--border-primary)", color: "var(--text-secondary)" }}>{cell}</td>
                ))}</tr>
              ))}</tbody>
            </table>
          </div>
        );
        inTable = false; tableRows = [];
      }
      continue;
    }
    inTable = false;
    if (line.startsWith("## ")) {
      elements.push(<h2 key={i} style={{ fontSize: 20, fontWeight: 400, color: "var(--accent-gold)", marginTop: 28, marginBottom: 10, paddingBottom: 8, borderBottom: "1px solid var(--border-primary)", fontFamily: "var(--font-display)" }}>{line.replace("## ", "")}</h2>);
    } else if (line.startsWith("### ")) {
      elements.push(<h3 key={i} style={{ fontSize: 16, fontWeight: 600, color: "var(--text-primary)", marginTop: 18, marginBottom: 6, fontFamily: "var(--font-body)" }}>{line.replace("### ", "")}</h3>);
    } else if (line.startsWith("# ")) {
      elements.push(<h1 key={i} style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 400, color: "var(--accent-gold)", marginTop: 8, marginBottom: 14 }}>{line.replace("# ", "")}</h1>);
    } else if (line.startsWith("- ") || line.startsWith("* ")) {
      elements.push(
        <div key={i} style={{ display: "flex", gap: 10, marginBottom: 5, paddingLeft: 8 }}>
          <span style={{ color: "var(--accent-green)", fontSize: 8, marginTop: 7 }}>●</span>
          <span style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6, fontFamily: "var(--font-body)" }}>{processBold(line.replace(/^[-*]\s/, ""))}</span>
        </div>
      );
    } else if (line.trim() === "---") {
      elements.push(<hr key={i} style={{ border: "none", borderTop: "1px solid var(--border-primary)", margin: "20px 0" }} />);
    } else if (line.trim() === "") {
      elements.push(<div key={i} style={{ height: 6 }} />);
    } else {
      elements.push(<p key={i} style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7, margin: "3px 0", fontFamily: "var(--font-body)" }}>{processBold(line)}</p>);
    }
  }
  return <>{elements}</>;
}

/* ═══════════════════════════════════════════
   LOCAL FALLBACK PLAN GENERATOR
   ═══════════════════════════════════════════ */

function generateLocalPlan(form) {
  const n = form.businessName || "Your Business";
  const ind = form.industry || "General";
  const stg = form.businessStage || "Startup";
  const desc = form.description || "A growing business focused on delivering value to its customers.";
  const loc = form.location || "United States";
  const prods = form.products || "Core products and services tailored to the target market.";
  const tgt = form.targetCustomer || "Small to medium-sized businesses and individual consumers";
  const uvp = form.uniqueValue || "A unique combination of quality, service, and value.";
  const rev = form.revenueModel || "Direct sales";
  const price = form.pricingStrategy || "Competitive market pricing";
  const tm = form.teamSize || "Small, dedicated team";
  const comp = form.competitors || "Several established players in the local and regional market";
  const mkt = form.marketSize || "Growing market with significant opportunity";
  const adv = form.competitive_advantage || "Strong customer relationships and operational efficiency";
  const sc = form.startupCosts || "$50,000";
  const mr = form.monthlyRevenue || "$10,000";
  const me = form.monthlyExpenses || "$7,500";
  const fn = form.fundingNeeded || "$100,000";
  const fp = form.fundingPurpose || "Equipment, inventory, marketing, and working capital";
  const isShort = form.planFormat === "short";
  const purpose = form.planPurpose || "General";
  const secs = form.includeSections;

  let p = `# ${n} — Business Plan\n\n`;
  p += `**Prepared for:** ${purpose}\n`;
  p += `**Industry:** ${ind} | **Stage:** ${stg} | **Location:** ${loc}\n\n---\n\n`;

  if (secs.includes("Executive Summary")) {
    p += `## Executive Summary\n\n`;
    p += `${n} is a ${stg.toLowerCase()} ${ind.toLowerCase()} business based in ${loc}. ${desc}\n\n`;
    p += `Our target market consists of ${tgt}, and we differentiate through ${uvp.charAt(0).toLowerCase() + uvp.slice(1)}\n\n`;
    if (!isShort) {
      p += `The business generates revenue through ${rev.toLowerCase()} with ${price.toLowerCase()}. We are seeking ${fn} in funding to ${fp.toLowerCase()}.\n\n`;
      p += `With a current team of ${tm.toLowerCase()}, we are positioned for growth in a ${mkt.toLowerCase()} segment. Our competitive advantage lies in ${adv.toLowerCase()}.\n\n`;
    }
  }

  if (secs.includes("Company Description")) {
    p += `## Company Description\n\n### Mission & Vision\n\n`;
    p += `${n} was established to address a clear gap in the ${ind.toLowerCase()} market. ${desc}\n\n`;
    p += `### Business Structure\n\n- **Legal Structure:** LLC\n- **Location:** ${loc}\n- **Year Founded:** ${form.yearFounded || "2024"}\n- **Team Size:** ${tm}\n\n`;
    if (!isShort) {
      p += `### Core Values\n\n- Excellence in product and service delivery\n- Customer-first approach to all business decisions\n- Innovation and continuous improvement\n- Integrity and transparency in all operations\n\n`;
    }
  }

  if (secs.includes("Products & Services")) {
    p += `## Products & Services\n\n### Core Offerings\n\n${prods}\n\n### Value Proposition\n\n${uvp}\n\n`;
    p += `### Pricing Model\n\n${n} employs a ${price.toLowerCase()} approach. Revenue is generated through ${rev.toLowerCase()}.\n\n`;
    if (!isShort) {
      p += `### Future Product Roadmap\n\n- **Phase 1 (0-6 months):** Solidify core offerings and establish customer feedback loops\n- **Phase 2 (6-12 months):** Expand product line based on market demand\n- **Phase 3 (12-24 months):** Introduce premium tier or complementary services\n\n`;
    }
  }

  if (secs.includes("Market Analysis")) {
    p += `## Market Analysis\n\n### Market Overview\n\nThe ${ind.toLowerCase()} market represents ${mkt.toLowerCase()}. Our target customers are ${tgt.toLowerCase()}.\n\n`;
    if (!isShort) {
      p += `### Industry Trends\n\n- Increasing demand for personalized, high-quality solutions\n- Digital transformation driving new customer acquisition channels\n- Growing preference for businesses that demonstrate social responsibility\n- Shift toward subscription and recurring revenue models\n\n`;
    }
    p += `### Target Customer Profile\n\nOur ideal customer is ${tgt.toLowerCase()}. They value quality, reliability, and strong customer relationships.\n\n`;
  }

  if (secs.includes("Organization & Management")) {
    p += `## Organization & Management\n\n${n} operates with a ${tm.toLowerCase()} structure. Leadership focuses on:\n\n`;
    p += `- Strategic direction and business development\n- Operations and quality assurance\n- Sales, marketing, and customer relations\n- Financial management and compliance\n\n`;
    if (!isShort) {
      p += `### Hiring Plan\n\n| Role | Timeline | Priority |\n|------|----------|----------|\n| Operations Manager | Month 3-6 | High |\n| Sales Representative | Month 6-9 | Medium |\n| Marketing Coordinator | Month 9-12 | Medium |\n| Administrative Support | Month 12+ | Low |\n\n`;
    }
  }

  if (secs.includes("Marketing Strategy")) {
    p += `## Marketing Strategy\n\n### Customer Acquisition\n\n- **Digital Presence:** Website, SEO, and social media marketing\n- **Local Marketing:** Community partnerships, events, and referral programs\n- **Content Marketing:** Educational content establishing industry authority\n\n`;
    if (!isShort) {
      p += `### Marketing Budget Allocation\n\n| Channel | % of Budget | Focus |\n|---------|-------------|-------|\n| Digital Advertising | 35% | Paid search & social |\n| Content / SEO | 25% | Organic growth |\n| Social Media | 20% | Community building |\n| Local / Events | 15% | Brand awareness |\n| PR / Outreach | 5% | Media relations |\n\n`;
      p += `### Customer Retention\n\n- Loyalty and referral incentive programs\n- Regular customer communication and feedback collection\n- Exceptional post-sale support and follow-up\n\n`;
    }
  }

  if (secs.includes("Financial Projections")) {
    p += `## Financial Projections\n\n### Current Financial Snapshot\n\n| Metric | Amount |\n|--------|--------|\n| Startup Costs | ${sc} |\n| Monthly Revenue | ${mr} |\n| Monthly Expenses | ${me} |\n| Funding Needed | ${fn} |\n\n`;
    if (!isShort) {
      p += `### 3-Year Revenue Projections\n\n| Year | Projected Annual Revenue | Growth Rate |\n|------|--------------------------|-------------|\n| Year 1 | Based on current run rate | Baseline |\n| Year 2 | 25-40% increase projected | Growth phase |\n| Year 3 | 20-30% increase projected | Scaling phase |\n\n`;
      p += `### Key Financial Assumptions\n\n- Revenue growth driven by expanded marketing and customer acquisition\n- Operating margins improving as fixed costs distribute across higher revenue\n- Capital expenditures front-loaded in Year 1\n- Break-even expected within 12-18 months\n\n`;
    }
  }

  if (secs.includes("Funding Request")) {
    p += `## Funding Request\n\n${n} is seeking ${fn} in funding to support:\n\n${fp}\n\n`;
    if (!isShort) {
      p += `### Use of Funds\n\n| Category | % | Purpose |\n|----------|---|----------|\n| Equipment & Setup | 30% | Core infrastructure |\n| Inventory & Supplies | 25% | Initial inventory |\n| Marketing & Sales | 20% | Launch campaigns |\n| Working Capital | 15% | Operating reserves |\n| Contingency | 10% | Buffer |\n\n`;
      p += `### Repayment Strategy\n\nFunding will be repaid through operating cash flow. Projected positive cash flow within 12-18 months supports structured repayment aligned with revenue growth.\n\n`;
    }
  }

  if (secs.includes("SWOT Analysis")) {
    p += `## SWOT Analysis\n\n### Strengths\n- ${uvp}\n- Strong understanding of the ${ind.toLowerCase()} market\n- Lean operational structure\n\n`;
    p += `### Weaknesses\n- Limited brand recognition as a ${stg.toLowerCase()} business\n- Resource constraints typical of early-stage companies\n- Dependence on a small initial team\n\n`;
    p += `### Opportunities\n- ${mkt}\n- Growing demand for quality ${ind.toLowerCase()} solutions\n- Potential for strategic partnerships\n\n`;
    p += `### Threats\n- ${comp}\n- Economic uncertainty affecting spending\n- Regulatory changes in the ${ind.toLowerCase()} sector\n\n`;
  }

  if (secs.includes("Operations Plan")) {
    p += `## Operations Plan\n\n### Daily Operations\n\n${n} operates from ${loc} with a focus on efficient service delivery and quality control.\n\n`;
    if (!isShort) {
      p += `### Key Milestones\n\n| Milestone | Target | Status |\n|-----------|--------|--------|\n| Business formation & setup | Month 1 | Planning |\n| Marketing launch | Month 2 | Planning |\n| First 50 customers | Month 4-6 | Target |\n| Break-even point | Month 12-18 | Target |\n| Expansion / Scaling | Month 18-24 | Target |\n\n`;
    }
  }

  if (secs.includes("Risk Assessment")) {
    p += `## Risk Assessment\n\n| Risk | Likelihood | Impact | Mitigation |\n|------|-----------|--------|------------|\n| Market competition | Medium | High | Differentiation through ${adv.toLowerCase()} |\n| Cash flow shortage | Medium | High | Maintain 3-6 month reserve |\n| Slow customer acquisition | Medium | Medium | Diversified marketing |\n| Key personnel departure | Low | High | Cross-training |\n| Regulatory changes | Low | Medium | Compliance monitoring |\n\n`;
  }

  if (secs.includes("Appendix")) {
    p += `## Appendix\n\n- Detailed financial spreadsheets (available upon request)\n- Market research documentation\n- Key team member resumes\n- Letters of intent or partnership agreements\n- Relevant licenses and legal documentation\n\n`;
  }

  p += `---\n\n*Generated by SmallBiz Recon™ Business Plan Generator. All projections should be validated with actual financial data before submission to any financial institution or investor.*`;
  return p;
}

/* ═══════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════ */
export default function BusinessPlanGenerator() {
  const [theme, setTheme] = useState("dark");
  const [step, setStep] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState("");
  const [streamText, setStreamText] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [genProgress, setGenProgress] = useState("");
  const [usedFallback, setUsedFallback] = useState(false);
  const planRef = useRef(null);
  const intervalRef = useRef(null);

  const isDark = theme === "dark";
  const vars = THEMES[theme];

  const [form, setForm] = useState({
    businessName: "", industry: "", businessStage: "",
    description: "", location: "", yearFounded: "",
    products: "", targetCustomer: "", uniqueValue: "",
    revenueModel: "", pricingStrategy: "", teamSize: "",
    competitors: "", marketSize: "", competitive_advantage: "",
    startupCosts: "", monthlyRevenue: "", monthlyExpenses: "",
    fundingNeeded: "", fundingPurpose: "",
    planFormat: "long", planPurpose: "", includeSections: [...SECTION_OPTIONS],
  });

  const updateForm = useCallback((key, val) => {
    setForm(prev => ({ ...prev, [key]: val }));
  }, []);

  useEffect(() => {
    if (form.planFormat === "short") updateForm("includeSections", [...SHORT_SECTIONS]);
    else if (form.includeSections.length <= SHORT_SECTIONS.length) updateForm("includeSections", [...SECTION_OPTIONS]);
  }, [form.planFormat]);

  useEffect(() => () => { if (intervalRef.current) clearInterval(intervalRef.current); }, []);

  const toggleSection = (sec) => {
    setForm(prev => ({
      ...prev,
      includeSections: prev.includeSections.includes(sec)
        ? prev.includeSections.filter(s => s !== sec)
        : [...prev.includeSections, sec],
    }));
  };

  const canAdvance = () => {
    switch (step) {
      case 0: return form.businessName && form.industry;
      case 1: return form.description;
      case 2: return true;
      case 3: return true;
      case 4: return form.planFormat && form.includeSections.length > 0;
      default: return true;
    }
  };

  const handleBack = () => {
    if (window.history.length > 1) window.history.back();
    else window.location.href = FALLBACK_ROUTE;
  };

  const copyPlan = () => { navigator.clipboard.writeText(generatedPlan); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  const downloadPlan = () => {
    const blob = new Blob([generatedPlan], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `${(form.businessName || "business-plan").replace(/\s+/g, "-").toLowerCase()}-plan.md`;
    a.click(); URL.revokeObjectURL(url);
  };

  /* ── Premium PDF Export ── */
  const exportPDF = () => {
    const md = generatedPlan;
    if (!md) return;

    const businessName = form.businessName || "Business Plan";
    const industry = form.industry || "";
    const stage = form.businessStage || "";
    const location = form.location || "";
    const purpose = form.planPurpose || "General";
    const today = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

    // Convert markdown to styled HTML
    const convertMd = (text) => {
      let html = "";
      const lines = text.split("\n");
      let inTable = false;
      let tableHtml = "";
      let inList = false;

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        // Tables
        if (line.startsWith("|") && line.endsWith("|")) {
          if (!inTable) { inTable = true; tableHtml = '<table class="bp-table">'; }
          if (line.replace(/[\s|:-]/g, "").length === 0) continue; // separator row
          const cells = line.split("|").filter(c => c.trim()).map(c => c.trim());
          const isHeader = i > 0 && lines[i - 1] && !lines[i - 1].startsWith("|");
          const tag = (!inTable || tableHtml === '<table class="bp-table">') ? "th" : "td";
          tableHtml += "<tr>" + cells.map(c => `<${tag}>${c}</${tag}>`).join("") + "</tr>";
          if (i === lines.length - 1 || !lines[i + 1]?.startsWith("|")) {
            html += tableHtml + "</table>";
            inTable = false; tableHtml = "";
          }
          continue;
        }
        if (inTable) { html += tableHtml + "</table>"; inTable = false; tableHtml = ""; }

        // Close list if needed
        if (inList && !line.startsWith("- ") && !line.startsWith("* ")) {
          html += "</ul>"; inList = false;
        }

        // Process bold
        const processBold = (t) => t.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");

        if (line.startsWith("# ") && !line.startsWith("## ")) {
          // Skip the main title - we handle it in the cover page
          continue;
        } else if (line.startsWith("## ")) {
          html += `<h2>${line.replace("## ", "")}</h2>`;
        } else if (line.startsWith("### ")) {
          html += `<h3>${processBold(line.replace("### ", ""))}</h3>`;
        } else if (line.startsWith("- ") || line.startsWith("* ")) {
          if (!inList) { html += "<ul>"; inList = true; }
          html += `<li>${processBold(line.replace(/^[-*]\s/, ""))}</li>`;
        } else if (line.trim() === "---") {
          html += '<hr class="bp-divider" />';
        } else if (line.trim() === "") {
          html += "<br/>";
        } else if (line.startsWith("**Prepared for:**") || line.startsWith("**Industry:**")) {
          // Skip meta lines - we show them on cover
          continue;
        } else {
          html += `<p>${processBold(line)}</p>`;
        }
      }
      if (inList) html += "</ul>";
      return html;
    };

    const bodyContent = convertMd(md);

    const printHTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${businessName} — Business Plan</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap');

  :root {
    --green-deep: #2d5420;
    --green-primary: #4A7836;
    --green-light: #6a9a52;
    --green-pale: #e8f0e2;
    --gold: #9a7a28;
    --gold-light: #c8a84e;
    --gold-pale: #faf5e8;
    --text-dark: #1a2e12;
    --text-body: #2d3a28;
    --text-muted: #5a6b52;
    --border: #d4dccf;
    --border-light: #e8ede2;
    --bg-subtle: #f8faf6;
  }

  @page {
    size: letter;
    margin: 0.75in 0.85in 0.9in 0.85in;
    @bottom-center {
      content: counter(page);
      font-family: 'DM Sans', sans-serif;
      font-size: 9pt;
      color: var(--text-muted);
    }
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'DM Sans', sans-serif;
    font-size: 10.5pt;
    line-height: 1.7;
    color: var(--text-body);
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }

  /* ══ COVER PAGE ══ */
  .cover-page {
    page-break-after: always;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    text-align: center;
    padding: 2in 1in;
    position: relative;
  }

  .cover-accent-bar {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    background: linear-gradient(90deg, var(--green-deep), var(--green-primary), var(--gold));
  }

  .cover-icon {
    width: 64px;
    height: 64px;
    border-radius: 16px;
    background: linear-gradient(135deg, var(--green-pale), var(--gold-pale));
    border: 2px solid var(--green-primary);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 32px;
    font-size: 28px;
  }

  .cover-title {
    font-family: 'Instrument Serif', Georgia, serif;
    font-size: 36pt;
    font-weight: 400;
    color: var(--text-dark);
    line-height: 1.15;
    margin-bottom: 8px;
    letter-spacing: -0.02em;
  }

  .cover-subtitle {
    font-family: 'Instrument Serif', Georgia, serif;
    font-size: 20pt;
    font-weight: 400;
    font-style: italic;
    color: var(--gold);
    margin-bottom: 40px;
  }

  .cover-divider {
    width: 80px;
    height: 2px;
    background: linear-gradient(90deg, var(--green-primary), var(--gold));
    margin: 0 auto 32px;
    border: none;
  }

  .cover-meta {
    display: flex;
    flex-direction: column;
    gap: 6px;
    font-size: 10pt;
    color: var(--text-muted);
  }

  .cover-meta strong {
    color: var(--text-dark);
    font-weight: 600;
  }

  .cover-footer {
    position: absolute;
    bottom: 1in;
    left: 0;
    right: 0;
    text-align: center;
    font-size: 8.5pt;
    color: var(--text-muted);
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .cover-footer-line {
    width: 40px;
    height: 1px;
    background: var(--border);
    margin: 8px auto;
  }

  /* ══ BODY CONTENT ══ */
  .body-content {
    counter-reset: section;
  }

  h2 {
    font-family: 'Instrument Serif', Georgia, serif;
    font-size: 18pt;
    font-weight: 400;
    color: var(--green-deep);
    margin-top: 32pt;
    margin-bottom: 10pt;
    padding-bottom: 8pt;
    border-bottom: 2px solid var(--green-primary);
    page-break-after: avoid;
    letter-spacing: -0.01em;
  }

  h2::before {
    counter-increment: section;
    content: "";
  }

  h3 {
    font-family: 'DM Sans', sans-serif;
    font-size: 12pt;
    font-weight: 700;
    color: var(--text-dark);
    margin-top: 18pt;
    margin-bottom: 6pt;
    page-break-after: avoid;
    letter-spacing: 0.01em;
  }

  p {
    margin-bottom: 8pt;
    text-align: justify;
    orphans: 3;
    widows: 3;
  }

  strong {
    font-weight: 700;
    color: var(--text-dark);
  }

  ul {
    margin: 6pt 0 12pt 0;
    padding-left: 0;
    list-style: none;
  }

  li {
    position: relative;
    padding-left: 18pt;
    margin-bottom: 4pt;
    line-height: 1.65;
  }

  li::before {
    content: "";
    position: absolute;
    left: 4pt;
    top: 7pt;
    width: 5pt;
    height: 5pt;
    border-radius: 50%;
    background: var(--green-primary);
  }

  /* ══ TABLES ══ */
  .bp-table {
    width: 100%;
    border-collapse: collapse;
    margin: 14pt 0 18pt;
    font-size: 9.5pt;
    page-break-inside: avoid;
  }

  .bp-table th {
    background: var(--green-deep) !important;
    color: white !important;
    font-weight: 600;
    padding: 8pt 12pt;
    text-align: left;
    font-size: 9pt;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    border: none;
  }

  .bp-table th:first-child {
    border-radius: 6pt 0 0 0;
  }

  .bp-table th:last-child {
    border-radius: 0 6pt 0 0;
  }

  .bp-table td {
    padding: 7pt 12pt;
    border-bottom: 1px solid var(--border-light);
    color: var(--text-body);
  }

  .bp-table tr:nth-child(even) td {
    background: var(--bg-subtle) !important;
  }

  .bp-table tr:last-child td:first-child {
    border-radius: 0 0 0 6pt;
  }

  .bp-table tr:last-child td:last-child {
    border-radius: 0 0 6pt 0;
  }

  /* ══ HR / DIVIDER ══ */
  .bp-divider {
    border: none;
    height: 1px;
    background: var(--border);
    margin: 24pt 0;
  }

  hr {
    border: none;
    height: 1px;
    background: var(--border);
    margin: 20pt 0;
  }

  /* ══ FOOTER NOTE ══ */
  .pdf-footer-note {
    margin-top: 40pt;
    padding-top: 16pt;
    border-top: 1px solid var(--border);
    font-size: 8pt;
    color: var(--text-muted);
    font-style: italic;
    text-align: center;
    line-height: 1.5;
  }

  /* ══ PAGE HEADER (repeating) ══ */
  @media print {
    .no-print { display: none !important; }
    body { font-size: 10.5pt; }
    .cover-page { min-height: auto; height: 100vh; }
  }
</style>
</head>
<body>

<!-- COVER PAGE -->
<div class="cover-page">
  <div class="cover-accent-bar"></div>
  <div class="cover-icon">📋</div>
  <div class="cover-title">${businessName}</div>
  <div class="cover-subtitle">Business Plan</div>
  <hr class="cover-divider" />
  <div class="cover-meta">
    ${industry ? `<div><strong>Industry:</strong> ${industry}</div>` : ""}
    ${stage ? `<div><strong>Stage:</strong> ${stage}</div>` : ""}
    ${location ? `<div><strong>Location:</strong> ${location}</div>` : ""}
    ${purpose !== "General" ? `<div><strong>Purpose:</strong> ${purpose}</div>` : ""}
    <div><strong>Date:</strong> ${today}</div>
  </div>
  <div class="cover-footer">
    <div class="cover-footer-line"></div>
    Prepared with SmallBiz Recon™ Business Plan Generator
  </div>
</div>

<!-- BODY -->
<div class="body-content">
  ${bodyContent}
</div>

<div class="pdf-footer-note">
  This business plan was generated by SmallBiz Recon™ for planning and educational purposes.<br/>
  All projections should be validated with actual financial data before submission to any financial institution or investor.
</div>

</body>
</html>`;

    // Open in new window and trigger print
    const printWindow = window.open("", "_blank", "width=850,height=1100");
    if (printWindow) {
      printWindow.document.write(printHTML);
      printWindow.document.close();
      // Wait for fonts to load then print
      setTimeout(() => {
        printWindow.focus();
        printWindow.print();
      }, 800);
    }
  };

  const simulateStream = (text) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    let idx = 0;
    intervalRef.current = setInterval(() => {
      idx += Math.floor(Math.random() * 18) + 8;
      if (idx >= text.length) {
        setStreamText(text); setGeneratedPlan(text); setIsGenerating(false);
        clearInterval(intervalRef.current); intervalRef.current = null;
      } else {
        setStreamText(text.slice(0, idx));
      }
    }, 12);
  };

  const buildPrompt = () => {
    const details = [
      `Business Name: ${form.businessName}`, `Industry: ${form.industry}`,
      form.businessStage && `Stage: ${form.businessStage}`,
      `Description: ${form.description}`,
      form.location && `Location: ${form.location}`,
      form.yearFounded && `Year Founded: ${form.yearFounded}`,
      form.products && `Products/Services: ${form.products}`,
      form.targetCustomer && `Target Customer: ${form.targetCustomer}`,
      form.uniqueValue && `Unique Value Proposition: ${form.uniqueValue}`,
      form.revenueModel && `Revenue Model: ${form.revenueModel}`,
      form.pricingStrategy && `Pricing Strategy: ${form.pricingStrategy}`,
      form.teamSize && `Team Size: ${form.teamSize}`,
      form.competitors && `Competitors: ${form.competitors}`,
      form.marketSize && `Market Size: ${form.marketSize}`,
      form.competitive_advantage && `Competitive Advantage: ${form.competitive_advantage}`,
      form.startupCosts && `Startup Costs: ${form.startupCosts}`,
      form.monthlyRevenue && `Monthly Revenue: ${form.monthlyRevenue}`,
      form.monthlyExpenses && `Monthly Expenses: ${form.monthlyExpenses}`,
      form.fundingNeeded && `Funding Needed: ${form.fundingNeeded}`,
      form.fundingPurpose && `Funding Purpose: ${form.fundingPurpose}`,
    ].filter(Boolean).join("\n- ");

    const purposeNote = form.planPurpose === "SBA Loan Application"
      ? "Structure this specifically to meet SBA loan application requirements."
      : form.planPurpose === "Investor Pitch"
      ? "Emphasize growth potential, scalable unit economics, and projected ROI."
      : form.planPurpose === "Bank Loan"
      ? "Focus on cash flow stability, repayment ability, and conservative projections."
      : "";

    return `You are an expert business plan writer. Create a ${form.planFormat === "short" ? "concise, focused" : "comprehensive, detailed"} business plan in well-structured markdown.

BUSINESS DETAILS:
- ${details}

FORMAT: ${form.planFormat === "short" ? "SHORT (3-5 pages, concise)" : "LONG (15-25 pages, comprehensive)"}
PURPOSE: ${form.planPurpose || "General"}
SECTIONS: ${form.includeSections.join(", ")}

${purposeNote}

Use ## for section headers, ### for subsections. Include markdown tables for financial data. ${form.planFormat === "short" ? "Keep sections to 2-4 paragraphs." : "Provide thorough analysis with projections and actionable strategies."} Start with # heading. No preamble.`;
  };

  const generatePlan = async () => {
    setIsGenerating(true); setGeneratedPlan(""); setStreamText(""); setError(""); setUsedFallback(false);
    setGenProgress("Connecting to AI service...");

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 25000);

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514", max_tokens: 4000,
          messages: [{ role: "user", content: buildPrompt() }],
        }),
        signal: controller.signal,
      });
      clearTimeout(timeout);

      if (!response.ok) throw new Error(`${response.status}`);
      const data = await response.json();
      const text = data.content?.map(i => i.text || "").join("\n") || "";
      if (!text || text.length < 100) throw new Error("Empty response");

      setGenProgress("");
      simulateStream(text);
    } catch (err) {
      console.log("API unavailable, using local generator:", err.message);
      setUsedFallback(true);
      setGenProgress("Building your plan...");
      setTimeout(() => { setGenProgress(""); simulateStream(generateLocalPlan(form)); }, 400);
    }
  };

  useEffect(() => {
    if (streamText && planRef.current) planRef.current.scrollTop = planRef.current.scrollHeight;
  }, [streamText]);

  const cssVarString = Object.entries(vars).map(([k, v]) => `${k}: ${v};`).join("\n");

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <StepHeader icon={<Building2 size={20} />} title="Tell us about your business" subtitle="Start with the essentials." />
            <TextInput label="Business Name" value={form.businessName} onChange={v => updateForm("businessName", v)} placeholder="e.g., Sunrise Bakery" required />
            <SelectInput label="Industry" value={form.industry} onChange={v => updateForm("industry", v)} options={INDUSTRIES} required />
            <SelectInput label="Business Stage" value={form.businessStage} onChange={v => updateForm("businessStage", v)} options={BUSINESS_STAGES} />
            <div className="bp-row-2">
              <TextInput label="Location" value={form.location} onChange={v => updateForm("location", v)} placeholder="City, State" />
              <TextInput label="Year Founded" value={form.yearFounded} onChange={v => updateForm("yearFounded", v)} placeholder="e.g., 2024" />
            </div>
          </div>
        );
      case 1:
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <StepHeader icon={<ClipboardList size={20} />} title="Business Model & Offerings" subtitle="What you do and who you serve." />
            <TextInput label="Business Description" value={form.description} onChange={v => updateForm("description", v)} multiline required placeholder="Describe what your business does, your mission, and what problem you solve..." />
            <TextInput label="Products / Services" value={form.products} onChange={v => updateForm("products", v)} multiline placeholder="List your main products or services..." />
            <TextInput label="Target Customer" value={form.targetCustomer} onChange={v => updateForm("targetCustomer", v)} placeholder="e.g., Small business owners aged 30-55" />
            <TextInput label="Unique Value Proposition" value={form.uniqueValue} onChange={v => updateForm("uniqueValue", v)} multiline placeholder="What makes you different from competitors?" />
            <div className="bp-row-2">
              <TextInput label="Revenue Model" value={form.revenueModel} onChange={v => updateForm("revenueModel", v)} placeholder="e.g., Subscription, One-time" />
              <TextInput label="Team Size" value={form.teamSize} onChange={v => updateForm("teamSize", v)} placeholder="e.g., 5 employees" />
            </div>
            <TextInput label="Pricing Strategy" value={form.pricingStrategy} onChange={v => updateForm("pricingStrategy", v)} placeholder="e.g., Premium pricing at $99/mo" />
          </div>
        );
      case 2:
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <StepHeader icon={<Search size={20} />} title="Market & Competition" subtitle="Optional but strengthens your plan." />
            <TextInput label="Key Competitors" value={form.competitors} onChange={v => updateForm("competitors", v)} multiline placeholder="List main competitors and their strengths/weaknesses..." />
            <TextInput label="Market Size (TAM/SAM/SOM)" value={form.marketSize} onChange={v => updateForm("marketSize", v)} placeholder="e.g., $5B total addressable market" helpText="Total, Serviceable, and Obtainable market sizes" />
            <TextInput label="Competitive Advantage" value={form.competitive_advantage} onChange={v => updateForm("competitive_advantage", v)} multiline placeholder="What gives you a sustainable edge?" />
          </div>
        );
      case 3:
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <StepHeader icon={<DollarSign size={20} />} title="Financial Overview" subtitle="Numbers drive credibility." />
            <div className="bp-row-2">
              <TextInput label="Startup Costs" value={form.startupCosts} onChange={v => updateForm("startupCosts", v)} placeholder="e.g., $50,000" />
              <TextInput label="Monthly Revenue" value={form.monthlyRevenue} onChange={v => updateForm("monthlyRevenue", v)} placeholder="e.g., $12,000" />
            </div>
            <div className="bp-row-2">
              <TextInput label="Monthly Expenses" value={form.monthlyExpenses} onChange={v => updateForm("monthlyExpenses", v)} placeholder="e.g., $8,000" />
              <TextInput label="Funding Needed" value={form.fundingNeeded} onChange={v => updateForm("fundingNeeded", v)} placeholder="e.g., $100,000" />
            </div>
            <TextInput label="Funding Purpose" value={form.fundingPurpose} onChange={v => updateForm("fundingPurpose", v)} multiline placeholder="How will the funding be used?" />
          </div>
        );
      case 4:
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <StepHeader icon={<Settings size={20} />} title="Format & Options" subtitle="Customize the output." />
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", fontFamily: "var(--font-body)" }}>Plan Format</label>
              <div className="bp-row-2" style={{ gap: 12 }}>
                {[
                  { id: "short", label: "Short Format", desc: "3-5 pages · Quick overview", icon: <FileText size={22} /> },
                  { id: "long", label: "Long Format", desc: "15-25 pages · Comprehensive", icon: <BarChart3 size={22} /> },
                ].map(f => (
                  <button key={f.id} onClick={() => updateForm("planFormat", f.id)} style={{
                    flex: 1, padding: "20px 18px", borderRadius: 16, cursor: "pointer",
                    background: form.planFormat === f.id ? "rgba(154,184,122,0.08)" : "var(--bg-tertiary)",
                    border: form.planFormat === f.id ? "2px solid var(--accent-green)" : "2px solid var(--border-primary)",
                    textAlign: "left", transition: "all 0.3s ease", display: "flex", alignItems: "flex-start", gap: 14,
                  }}>
                    <div style={{ color: form.planFormat === f.id ? "var(--accent-green)" : "var(--text-muted)", marginTop: 2 }}>{f.icon}</div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: form.planFormat === f.id ? "var(--accent-green)" : "var(--text-muted)", fontFamily: "var(--font-body)", marginBottom: 3 }}>{f.label}</div>
                      <div style={{ fontSize: 12, color: "var(--text-muted)", fontFamily: "var(--font-body)" }}>{f.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", fontFamily: "var(--font-body)" }}>Plan Purpose</label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {PLAN_PURPOSES.map(pp => {
                  const sel = form.planPurpose === pp;
                  return (<button key={pp} onClick={() => updateForm("planPurpose", sel ? "" : pp)} style={{
                    padding: "8px 16px", borderRadius: 100, fontSize: 12, fontWeight: sel ? 700 : 500,
                    background: sel ? "var(--badge-bg)" : "transparent",
                    border: sel ? "1px solid var(--badge-border)" : "1px solid var(--border-primary)",
                    color: sel ? "var(--badge-text)" : "var(--text-muted)",
                    cursor: "pointer", fontFamily: "var(--font-body)", transition: "all 0.3s ease",
                  }}>{pp}</button>);
                })}
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", fontFamily: "var(--font-body)" }}>
                Sections to Include <span style={{ fontWeight: 400, color: "var(--text-muted)", marginLeft: 8 }}>({form.includeSections.length} selected)</span>
              </label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {SECTION_OPTIONS.map(sec => {
                  const sel = form.includeSections.includes(sec);
                  return (<button key={sec} onClick={() => toggleSection(sec)} style={{
                    padding: "7px 14px", borderRadius: 100, fontSize: 11, fontWeight: sel ? 700 : 500,
                    background: sel ? "var(--badge-bg)" : "transparent",
                    border: sel ? "1px solid var(--badge-border)" : "1px solid var(--border-primary)",
                    color: sel ? "var(--badge-text)" : "var(--text-muted)",
                    cursor: "pointer", fontFamily: "var(--font-body)", transition: "all 0.2s ease",
                  }}>{sel ? "✓ " : ""}{sec}</button>);
                })}
              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {!generatedPlan && !isGenerating && !error && (
              <>
                <StepHeader icon={<Rocket size={20} />} title="Ready to Generate" subtitle="Review and hit generate." />
                <div style={{ padding: 24, borderRadius: 18, background: "var(--bg-card)", border: "1px solid var(--border-primary)", backdropFilter: "var(--glass-blur)" }}>
                  <div className="bp-row-2" style={{ gap: 16, fontSize: 13, fontFamily: "var(--font-body)" }}>
                    {[["Business", form.businessName], ["Industry", form.industry], ["Stage", form.businessStage],
                      ["Format", form.planFormat === "short" ? "Short (3-5 pages)" : "Long (15-25 pages)"],
                      ["Purpose", form.planPurpose], ["Sections", `${form.includeSections.length} selected`],
                    ].filter(([, v]) => v).map(([l, v]) => (
                      <div key={l}>
                        <div style={{ color: "var(--text-muted)", marginBottom: 4, fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>{l}</div>
                        <div style={{ color: "var(--text-primary)", fontWeight: 500 }}>{v}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <button onClick={generatePlan} style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                  width: "100%", padding: "16px 28px", borderRadius: 14,
                  background: "var(--cta-bg)", border: "1px solid var(--cta-border)",
                  color: "var(--cta-text)", fontSize: 15, fontWeight: 600,
                  fontFamily: "var(--font-body)", cursor: "pointer",
                  transition: "all 0.35s cubic-bezier(0.23,1,0.32,1)",
                  boxShadow: "0 4px 20px rgba(74,120,54,0.15)",
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(74,120,54,0.25)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(74,120,54,0.15)"; }}>
                  <Rocket size={18} /> Generate Business Plan
                </button>
              </>
            )}

            {error && !isGenerating && (
              <div style={{ padding: 20, borderRadius: 16, background: "var(--error-bg)", border: "1px solid var(--error-border)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <AlertCircle size={16} color="var(--error-text)" />
                  <span style={{ fontWeight: 600, color: "var(--error-text)", fontSize: 14, fontFamily: "var(--font-body)" }}>Generation Failed</span>
                </div>
                <p style={{ fontSize: 13, color: "var(--error-text)", lineHeight: 1.6, fontFamily: "var(--font-body)", margin: 0, opacity: 0.85 }}>{error}</p>
                <button onClick={() => { setError(""); generatePlan(); }} style={{
                  marginTop: 14, display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "10px 20px", borderRadius: 10, background: "var(--cta-bg)", border: "1px solid var(--cta-border)",
                  color: "var(--cta-text)", fontSize: 13, fontWeight: 600, fontFamily: "var(--font-body)", cursor: "pointer",
                }}><RotateCcw size={13} /> Try Again</button>
              </div>
            )}

            {isGenerating && !streamText && (
              <div style={{ textAlign: "center", padding: 56 }}>
                <Loader2 size={36} color="var(--accent-green)" style={{ animation: "bpSpin 1.2s linear infinite", margin: "0 auto 20px", display: "block" }} />
                <div style={{ fontSize: 15, color: "var(--accent-green)", fontFamily: "var(--font-body)", marginBottom: 6 }}>{genProgress || "Crafting your business plan..."}</div>
                <div style={{ fontSize: 12, color: "var(--text-muted)", fontFamily: "var(--font-body)" }}>This typically takes 15-45 seconds</div>
              </div>
            )}

            {streamText && (
              <div>
                {generatedPlan && (
                  <>
                    {usedFallback && (
                      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 18px", borderRadius: 12, background: "var(--info-bg)", border: "1px solid var(--info-border)", marginBottom: 14 }}>
                        <Sparkles size={14} color="var(--info-text)" />
                        <span style={{ fontSize: 12, color: "var(--info-text)", fontFamily: "var(--font-body)" }}>
                          Generated using built-in templates. For AI-enhanced plans, use this tool within claude.ai artifacts.
                        </span>
                      </div>
                    )}
                    <div style={{ display: "flex", gap: 10, marginBottom: 16, justifyContent: "flex-end", flexWrap: "wrap" }}>
                      <button onClick={copyPlan} style={{
                        display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 10,
                        background: "var(--bg-tertiary)", border: "1px solid var(--border-primary)",
                        color: copied ? "var(--accent-green)" : "var(--accent-gold)",
                        fontSize: 12, fontWeight: 600, fontFamily: "var(--font-body)", cursor: "pointer",
                      }}>
                        {copied ? <><CheckCircle size={13} /> Copied!</> : <><Copy size={13} /> Copy</>}
                      </button>
                      <button onClick={exportPDF} style={{
                        display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 10,
                        background: "linear-gradient(135deg, rgba(200,168,78,0.15), rgba(200,168,78,0.06))",
                        border: "1px solid var(--border-gold)",
                        color: "var(--accent-gold)", fontSize: 12, fontWeight: 700, fontFamily: "var(--font-body)", cursor: "pointer",
                        transition: "all 0.3s ease",
                      }}
                        onMouseEnter={e => { e.currentTarget.style.background = "linear-gradient(135deg, rgba(200,168,78,0.25), rgba(200,168,78,0.1))"; }}
                        onMouseLeave={e => { e.currentTarget.style.background = "linear-gradient(135deg, rgba(200,168,78,0.15), rgba(200,168,78,0.06))"; }}>
                        <FileText size={13} /> Export PDF
                      </button>
                      <button onClick={downloadPlan} style={{
                        display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 10,
                        background: "var(--bg-tertiary)", border: "1px solid var(--border-primary)",
                        color: "var(--text-secondary)", fontSize: 12, fontWeight: 600, fontFamily: "var(--font-body)", cursor: "pointer",
                      }}><Download size={13} /> .md</button>
                      <button onClick={() => { setGeneratedPlan(""); setStreamText(""); setError(""); setUsedFallback(false); }} style={{
                        display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 10,
                        background: "var(--bg-tertiary)", border: "1px solid var(--border-primary)",
                        color: "var(--text-muted)", fontSize: 12, fontWeight: 600, fontFamily: "var(--font-body)", cursor: "pointer",
                      }}><RotateCcw size={13} /> Regenerate</button>
                    </div>
                  </>
                )}
                <div ref={planRef} style={{
                  padding: 28, borderRadius: 20, background: "var(--bg-card)", border: "1px solid var(--border-primary)",
                  backdropFilter: "var(--glass-blur)", maxHeight: "70vh", overflowY: "auto",
                }}>
                  <RenderMarkdown md={streamText} />
                  {isGenerating && <span style={{ display: "inline-block", width: 8, height: 18, background: "var(--accent-green)", borderRadius: 2, animation: "bpBlink 0.8s ease-in-out infinite", marginLeft: 2, verticalAlign: "middle" }} />}
                </div>
              </div>
            )}
          </div>
        );
      default: return null;
    }
  };

  return (
    <>
      <style>{`
        :root { --font-display: 'Instrument Serif', Georgia, serif; --font-body: 'DM Sans', sans-serif; ${cssVarString} }
        @keyframes pFloat { 0%, 100% { transform: translate(0,0) scale(1); opacity:0.3; } 25% { transform: translate(12px,-18px) scale(1.15); opacity:0.6; } 50% { transform: translate(-8px,-30px) scale(0.85); opacity:0.2; } 75% { transform: translate(16px,-12px) scale(1.08); opacity:0.5; } }
        @keyframes fadeSlideUp { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
        @keyframes cardReveal { from { opacity:0; transform:translateY(30px) scale(0.97); } to { opacity:1; transform:translateY(0) scale(1); } }
        @keyframes heroGlow { 0%,100% { opacity:0.4; } 50% { opacity:0.7; } }
        @keyframes bpSpin { to { transform: rotate(360deg); } }
        @keyframes bpBlink { 0%,100% { opacity:1; } 50% { opacity:0; } }
        * { box-sizing:border-box; margin:0; padding:0; }
        .bp-page { min-height:100vh; font-family: var(--font-body); background: var(--bg-primary); color: var(--text-primary); overflow-x: hidden; position: relative; transition: background 0.5s ease, color 0.4s ease; }
        .bp-page::before { content:''; position:fixed; inset:0; background: radial-gradient(ellipse 70% 50% at 30% 0%, var(--overlay-green), transparent), radial-gradient(ellipse 50% 40% at 70% 100%, var(--overlay-gold), transparent); pointer-events:none; z-index:0; }
        .back-link { display:inline-flex; align-items:center; gap:8px; color: #c8e0b4; font-size:14px; font-weight:600; background:none; border:none; cursor:pointer; padding:8px 0; font-family: var(--font-body); transition:all 0.3s ease; }
        .back-link:hover { color: #e8ede2; gap:12px; }
        .theme-toggle { display:flex; align-items:center; gap:6px; padding:8px 16px; border-radius:12px; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.1); color: #c8e0b4; font-size:13px; font-weight:600; cursor:pointer; font-family:var(--font-body); transition: all 0.3s ease; }
        .theme-toggle:hover { border-color: rgba(255,255,255,0.2); color: #e8ede2; }
        .bp-input:focus { border-color: var(--input-focus) !important; }
        .bp-input::placeholder { color: var(--text-muted); }
        .bp-row-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .bp-page ::-webkit-scrollbar { width: 6px; }
        .bp-page ::-webkit-scrollbar-track { background: transparent; }
        .bp-page ::-webkit-scrollbar-thumb { background: rgba(154,184,122,0.2); border-radius: 3px; }
        @media (max-width: 768px) { .bp-row-2 { grid-template-columns: 1fr !important; } .hero-title { font-size: 32px !important; } .hero-inner { padding: 40px 20px 56px !important; } .bp-nav-buttons { flex-direction: column !important; } }
      `}</style>

      <div className="bp-page">
        <GridOverlay />
        <Particles />
        <div style={{ position: "relative", zIndex: 1 }}>
          {/* HERO */}
          <div style={{ position: "relative", overflow: "hidden", background: "var(--bg-hero)", borderBottom: "1px solid var(--border-primary)", animation: "fadeSlideUp 0.7s ease-out both" }}>
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle, rgba(74,120,54,0.12) 0%, transparent 65%)", pointerEvents: "none", animation: "heroGlow 6s ease-in-out infinite" }} />
            <div className="hero-inner" style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 32px 72px", position: "relative", zIndex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 56 }}>
                <button type="button" className="back-link" onClick={handleBack}><ArrowLeft size={16} /> Back to SmallBiz Recon™</button>
                <button type="button" className="theme-toggle" onClick={() => setTheme(isDark ? "light" : "dark")}>{isDark ? <Sun size={14} /> : <Moon size={14} />}{isDark ? "Light" : "Dark"}</button>
              </div>
              <div style={{ width: 68, height: 68, borderRadius: 20, background: "linear-gradient(135deg, rgba(200,168,78,0.2), rgba(200,168,78,0.08))", border: "1px solid rgba(200,168,78,0.25)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 28px" }}>
                <FileText size={30} color="#c8a84e" strokeWidth={1.5} />
              </div>
              <h1 className="hero-title" style={{ fontFamily: "var(--font-display)", fontSize: 50, fontWeight: 400, textAlign: "center", color: "#e8ede2", lineHeight: 1.12, letterSpacing: "-0.02em", marginBottom: 20 }}>
                Business Plan <span style={{ fontStyle: "italic", color: "#c8a84e" }}>Generator</span>
              </h1>
              <p style={{ textAlign: "center", fontSize: 16, color: "rgba(232,237,226,0.6)", lineHeight: 1.75, maxWidth: 600, margin: "0 auto 24px" }}>
                Create a professional, investor-ready business plan in minutes. Customize sections, choose your format, and download — completely free.
              </p>
              <div style={{ display: "flex", justifyContent: "center", gap: 20, flexWrap: "wrap" }}>
                {[{ icon: <Zap size={13} />, label: "AI-Powered" }, { icon: <FileText size={13} />, label: "Short & Long Format" }, { icon: <Sparkles size={13} />, label: "100% Free" }, { icon: <Target size={13} />, label: "SBA-Ready" }].map(b => (
                  <div key={b.label} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, color: "rgba(200,224,180,0.7)", fontWeight: 500, fontFamily: "var(--font-body)" }}>
                    <span style={{ color: "#9ab87a" }}>{b.icon}</span>{b.label}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CONTENT */}
          <div style={{ maxWidth: 860, margin: "0 auto", padding: "40px 24px 80px" }}>
            <div style={{ padding: "0 8px", marginBottom: 24, animation: "fadeSlideUp 0.7s ease-out 0.15s both" }}>
              <ProgressBar currentStep={step} steps={STEPS} onStepClick={setStep} />
            </div>
            <div style={{ padding: "32px 28px", borderRadius: 24, background: "var(--bg-card)", backdropFilter: "var(--glass-blur)", WebkitBackdropFilter: "var(--glass-blur)", border: "1px solid var(--border-primary)", boxShadow: "var(--shadow-card)", minHeight: 300, animation: "cardReveal 0.7s ease-out 0.2s both" }}>
              {renderStepContent()}
            </div>

            {step < 5 && (
              <div className="bp-nav-buttons" style={{ display: "flex", justifyContent: "space-between", marginTop: 20, gap: 12, animation: "fadeSlideUp 0.6s ease-out 0.3s both" }}>
                <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0} style={{
                  display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px", borderRadius: 12,
                  background: "transparent", border: `1px solid ${step === 0 ? "var(--disabled-border)" : "var(--border-primary)"}`,
                  color: step === 0 ? "var(--disabled-text)" : "var(--text-secondary)",
                  fontSize: 14, fontWeight: 600, fontFamily: "var(--font-body)", cursor: step === 0 ? "not-allowed" : "pointer",
                }}><ArrowLeft size={14} /> Back</button>
                <div style={{ display: "flex", gap: 10 }}>
                  {step < 4 && (
                    <button onClick={() => setStep(Math.min(5, step + 1))} style={{
                      padding: "12px 24px", borderRadius: 12, background: "transparent", border: "1px solid var(--border-primary)",
                      color: "var(--text-muted)", fontSize: 14, fontWeight: 500, fontFamily: "var(--font-body)", cursor: "pointer",
                    }}>Skip</button>
                  )}
                  <button onClick={() => setStep(Math.min(5, step + 1))} disabled={!canAdvance()} style={{
                    display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 28px", borderRadius: 12,
                    background: canAdvance() ? "var(--cta-bg)" : "var(--disabled-bg)",
                    border: `1px solid ${canAdvance() ? "var(--cta-border)" : "var(--disabled-border)"}`,
                    color: canAdvance() ? "var(--cta-text)" : "var(--disabled-text)",
                    fontSize: 14, fontWeight: 600, fontFamily: "var(--font-body)",
                    cursor: canAdvance() ? "pointer" : "not-allowed",
                    boxShadow: canAdvance() ? "0 2px 12px rgba(74,120,54,0.15)" : "none",
                  }}
                    onMouseEnter={e => { if (canAdvance()) { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(74,120,54,0.25)"; } }}
                    onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = canAdvance() ? "0 2px 12px rgba(74,120,54,0.15)" : "none"; }}>
                    {step === 4 ? "Review & Generate" : "Continue"} <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            )}

            {step === 5 && generatedPlan && (
              <div style={{ display: "flex", justifyContent: "center", marginTop: 20, animation: "fadeSlideUp 0.5s ease-out both" }}>
                <button onClick={() => { setStep(0); setGeneratedPlan(""); setStreamText(""); setError(""); setUsedFallback(false); }} style={{
                  display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 28px", borderRadius: 12,
                  background: "var(--cta-bg)", border: "1px solid var(--cta-border)",
                  color: "var(--cta-text)", fontSize: 14, fontWeight: 600, fontFamily: "var(--font-body)", cursor: "pointer",
                }}><Plus size={14} /> Create New Plan</button>
              </div>
            )}

            <div style={{ marginTop: 48, padding: "24px 24px", borderRadius: 18, background: "var(--bg-card)", border: "1px solid var(--border-primary)", backdropFilter: "var(--glass-blur)", animation: "fadeSlideUp 0.7s ease-out 0.5s both" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <AlertCircle size={16} color="var(--accent-gold)" />
                <span style={{ fontFamily: "var(--font-display)", fontSize: 18, color: "var(--text-primary)" }}>Disclaimer</span>
              </div>
              <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.75, fontFamily: "var(--font-body)" }}>
                This tool generates business plans for educational and planning purposes. Generated plans should be reviewed and customized before submission to any financial institution or investor. SmallBiz Recon™ is not a financial advisor and does not guarantee loan approval or funding outcomes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}