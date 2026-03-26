import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ExternalLink, Download, Users, FileText, Building, Phone, Globe, Shield, Star, ChevronDown, Sun, Moon, CircleAlert as AlertCircle } from "lucide-react";

interface ResourceItem {
  title: string;
  description: string;
  url: string;
  icon: JSX.Element;
  category: string;
  badge?: string;
}

interface FormItem {
  title: string;
  description: string;
  downloadPath: string;
  viewUrl?: string;
  downloadButtonText?: string;
  customButtonText?: string;
  customDate?: string;
}

const defaultLastUpdated = "*LAST UPDATED March 1, 2026*";

const counselingResources: ResourceItem[] = [
  {
    title: "SCORE Business Mentors",
    description: "Free business mentoring and workshops from experienced entrepreneurs and business leaders. Matched with a mentor in your industry.",
    url: "https://www.score.org/",
    icon: <Star size={20} />,
    category: "Mentoring",
    badge: "Free",
  },
  {
    title: "Small Business Development Centers",
    description: "Free business consulting and low-cost training for small business owners and entrepreneurs nationwide.",
    url: "https://americassbdc.org/",
    icon: <Building size={20} />,
    category: "Consulting",
    badge: "Free",
  },
  {
    title: "Women's Business Centers",
    description: "Business training, counseling, and mentoring for women entrepreneurs at all stages of business development.",
    url: "https://www.sba.gov/local-assistance/resource-partners/womens-business-centers",
    icon: <Users size={20} />,
    category: "Specialized",
  },
  {
    title: "National Foundation for Credit Counseling",
    description: "Nonprofit financial counseling services including debt management and financial education for businesses and individuals.",
    url: "https://www.nfcc.org/",
    icon: <Shield size={20} />,
    category: "Credit Counseling",
  },
  {
    title: "SBA Resource Partner Directory",
    description: "Find local SBA resource partners including SCORE, SBDC, and WBC locations closest to your business.",
    url: "https://www.sba.gov/local-assistance",
    icon: <Globe size={20} />,
    category: "Directory",
  },
  {
    title: "Financial Counseling Association of America",
    description: "Professional financial counseling services and resources for individuals and businesses navigating hardship.",
    url: "https://www.fcaa.org/",
    icon: <Phone size={20} />,
    category: "Professional Services",
  },
];

const paymentAssistanceForms: FormItem[] = [
  {
    title: "Payment Assistance Request Letter Template",
    description: "Professional template for requesting payment assistance from the SBA for your COVID EIDL loan.",
    downloadPath: "https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/sign/sbarecon-paid-pdfs/PAYMENT%20ASSISTANCE/SAMPLE%20LETTER%20TEMPLATE%20TO%20REQUEST%20PAYMENT%20ASSISTANCE.docx?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85MzZjNmFmNC1iMzA2LTQzMmMtYWFjNy03ZmRmYjU1NDRjMzUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzYmFyZWNvbi1wYWlkLXBkZnMvUEFZTUVOVCBBU1NJU1RBTkNFL1NBTVBMRSBMRVRURVIgVEVNUExBVEUgVE8gUkVRVUVTVCBQQVlNRU5UIEFTU0lTVEFOQ0UuZG9jeCIsImlhdCI6MTc1MzE2OTU2MywiZXhwIjoxODM5NTY5NTYzfQ.mMbmfE0FgtSiTUF7k4FnxrJ-tHy8MEI00b5o-Z1ydXU",
    downloadButtonText: "Download Template",
  },
  {
    title: "Profit & Loss Worksheet",
    description: "Profit & loss worksheet used to summarize monthly income and expenses for payment assistance evaluations.",
    downloadPath: "https://zrktinvphjmalvrsjmii.supabase.co/storage/v1/object/public/SmallBiz%20Recon%20Free%20Tools/SmallBizRecon_YTD_Profit_and_Loss_Statement_Template%20(FINAL).xlsx",
    downloadButtonText: "Download .xlsx",
  },
  {
    title: "Cash Flow Analysis Worksheet",
    description: "Detailed 12-month worksheet to analyze your business cash flow and demonstrate need for payment assistance.",
    downloadPath: "https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/sign/sbarecon-paid-pdfs/PAYMENT%20ASSISTANCE/12-Month-Cash-Flow%20(FINAL).xlsx?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85MzZjNmFmNC1iMzA2LTQzMmMtYWFjNy03ZmRmYjU1NDRjMzUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzYmFyZWNvbi1wYWlkLXBkZnMvUEFZTUVOVCBBU1NJU1RBTkNFLzEyLU1vbnRoLUNhc2gtRmxvdyAoRklOQUwpLnhsc3giLCJpYXQiOjE3NTMxNzM0MTUsImV4cCI6MTgzOTU3MzQxNX0.HD50sBa6neNB9RvBCMdNuk7JLjJ4iF_3ysCj4tH2heg",
    downloadButtonText: "Download .xlsx",
  },
  {
    title: "SBA Form 770, Financial Statement of Debtor",
    description: "Official SBA form for providing detailed financial information with your payment assistance request.",
    viewUrl: "https://www.sba.gov/document/sba-form-770-financial-statement-debtor",
    downloadPath: "https://www.sba.gov/sites/default/files/2024-11/FORM%20770%203245-0012%2010-23-2024%20%282%29.pdf",
    customButtonText: "View on SBA.gov",
  },
  {
    title: "Payment Assistance Submission Checklist",
    description: "Complete checklist to ensure your payment assistance request package is complete before submission.",
    downloadPath: "https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/sign/sbarecon-paid-pdfs/PAYMENT%20ASSISTANCE/COVID%20EIDL%20PAYMENT%20ASSISTANCE%20SUBMISSION%20CHECKLIST.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85MzZjNmFmNC1iMzA2LTQzMmMtYWFjNy03ZmRmYjU1NDRjMzUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzYmFyZWNvbi1wYWlkLXBkZnMvUEFZTUVOVCBBU1NJU1RBTkNFL0NPVklEIEVJREwgUEFZTUVOVCBBU1NJU1RBTkNFIFNVQk1JU1NJT04gQ0hFQ0tMSVNULnBkZiIsImlhdCI6MTc1MzE4MTIxOCwiZXhwIjoxODM5NTgxMjE4fQ.jxDf3b7i1NsMWd67-Z5rkPQFEzkWXHtIP3lzySDuAbo",
    downloadButtonText: "Download Checklist",
  },
  {
    title: "Business Recovery Tip Guide",
    description: "A comprehensive business recovery guide to support your payment assistance request and long-term stability.",
    downloadPath: "https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/sign/sbarecon-paid-pdfs/PAYMENT%20ASSISTANCE/Business%20Recovery%20Tip%20Guide.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85MzZjNmFmNC1iMzA2LTQzMmMtYWFjNy03ZmRmYjU1NDRjMzUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzYmFyZWNvbi1wYWlkLXBkZnMvUEFZTUVOVCBBU1NJU1RBTkNFL0J1c2luZXNzIFJlY292ZXJ5IFRpcCBHdWlkZS5wZGYiLCJpYXQiOjE3NTMxODA0ODksImV4cCI6MTgzOTU4MDQ4OX0.HPKVlfcvMuhilISHnBPvkaYXPVdqWmn9YEEaYv4w_2w",
    downloadButtonText: "Download Guide",
  },
];

const THEMES = {
  dark: {
    "--bg-primary": "#181c14",
    "--bg-secondary": "rgba(30, 34, 26, 0.6)",
    "--bg-card": "rgba(30, 34, 26, 0.6)",
    "--bg-card-hover": "rgba(36, 42, 30, 0.7)",
    "--bg-hero": "linear-gradient(180deg, rgba(50,62,38,0.7) 0%, rgba(24,28,20,0.98) 100%)",
    "--border-primary": "rgba(154, 184, 122, 0.1)",
    "--border-hover": "rgba(154, 184, 122, 0.25)",
    "--text-primary": "#e8ede2",
    "--text-secondary": "#8a9480",
    "--text-muted": "#5a6450",
    "--accent-green": "#9ab87a",
    "--accent-gold": "#c8a84e",
    "--glass-blur": "blur(24px)",
    "--shadow-card": "0 4px 32px rgba(0,0,0,0.2)",
    "--shadow-card-hover": "0 24px 64px rgba(0,0,0,0.35)",
    "--grid-opacity": "0.03",
    "--particle-opacity": "0.15",
    "--overlay-green": "rgba(74,120,54,0.08)",
  },
  light: {
    "--bg-primary": "#f5f3ee",
    "--bg-secondary": "rgba(255, 255, 255, 0.7)",
    "--bg-card": "rgba(255, 255, 255, 0.75)",
    "--bg-card-hover": "rgba(255, 255, 255, 0.9)",
    "--bg-hero": "linear-gradient(180deg, #3d5a2a 0%, #2a3d1e 100%)",
    "--border-primary": "rgba(74, 120, 54, 0.12)",
    "--border-hover": "rgba(74, 120, 54, 0.25)",
    "--text-primary": "#1a2e12",
    "--text-secondary": "#5a6b52",
    "--text-muted": "#8a9680",
    "--accent-green": "#4A7836",
    "--accent-gold": "#9a7a28",
    "--glass-blur": "blur(20px)",
    "--shadow-card": "0 4px 24px rgba(0,0,0,0.06)",
    "--shadow-card-hover": "0 20px 48px rgba(0,0,0,0.1)",
    "--grid-opacity": "0.04",
    "--particle-opacity": "0.1",
    "--overlay-green": "rgba(74,120,54,0.04)",
  },
};

function GridOverlay() {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0, opacity: "var(--grid-opacity)" }}>
      <svg width="100%" height="100%">
        <defs>
          <pattern id="fcGrid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="var(--accent-green)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#fcGrid)" />
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
          width: `${1.5 + (i * 0.17) % 2.5}px`,
          height: `${1.5 + (i * 0.17) % 2.5}px`,
          borderRadius: "50%",
          background: `rgba(154, 184, 122, var(--particle-opacity))`,
          left: `${(i * 5.5) % 100}%`,
          top: `${(i * 7.3) % 100}%`,
          animation: `pFloat ${9 + (i * 1.4) % 14}s ease-in-out infinite`,
          animationDelay: `${-(i * 0.7) % 12}s`,
        }} />
      ))}
    </div>
  );
}

const FormCard: React.FC<{ form: FormItem }> = ({ form }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        overflow: "hidden",
        background: "var(--bg-card)",
        backdropFilter: "var(--glass-blur)",
        WebkitBackdropFilter: "var(--glass-blur)",
        border: `1px solid ${hovered ? "var(--border-hover)" : "var(--border-primary)"}`,
        borderRadius: 20,
        padding: 24,
        boxShadow: hovered ? "var(--shadow-card-hover)" : "var(--shadow-card)",
        transform: hovered ? "translateY(-6px) scale(1.02)" : "translateY(0) scale(1)",
        transition: "all 0.6s cubic-bezier(0.23,1,0.32,1)",
        height: "100%",
        width: "100%",
        minHeight: 300,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: 4,
        height: "100%",
        background: "#c8a84e",
        opacity: hovered ? 1 : 0.6,
        transition: "opacity 0.4s ease",
      }} />

      <div style={{
        position: "absolute",
        top: -100,
        right: -100,
        width: 200,
        height: 200,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(200,168,78,0.15), transparent 70%)",
        opacity: hovered ? 0.4 : 0,
        transition: "opacity 0.6s ease",
      }} />

      <div style={{ position: "relative", zIndex: 1, flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
          <FileText size={20} style={{ color: "#c8a84e", marginRight: 12, flexShrink: 0 }} />
          <h4 style={{
            fontFamily: "var(--font-display)",
            fontSize: 17,
            fontWeight: 400,
            color: "var(--text-primary)",
            lineHeight: 1.35,
            flex: 1,
          }}>
            {form.title}
          </h4>
        </div>

        <p style={{
          color: "var(--text-secondary)",
          fontSize: 14,
          lineHeight: 1.6,
          marginBottom: 20,
          fontFamily: "var(--font-body)",
          flex: 1,
        }}>
          {form.description}
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: "auto" }}>
          {form.viewUrl && (
            <a
              href={form.viewUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                padding: "12px 20px",
                borderRadius: 12,
                border: "1px solid var(--border-primary)",
                background: "transparent",
                color: "var(--text-primary)",
                fontSize: 14,
                fontWeight: 600,
                fontFamily: "var(--font-body)",
                textDecoration: "none",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--border-hover)";
                e.currentTarget.style.background = "var(--bg-secondary)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border-primary)";
                e.currentTarget.style.background = "transparent";
              }}
            >
              <ExternalLink size={16} />
              {form.customButtonText || "View Source"}
            </a>
          )}

          <a
            href={form.downloadPath}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              padding: "12px 20px",
              borderRadius: 12,
              background: "linear-gradient(135deg, rgba(200,168,78,0.4), rgba(200,168,78,0.2))",
              border: "1px solid rgba(200,168,78,0.5)",
              color: "var(--text-primary)",
              fontSize: 14,
              fontWeight: 600,
              fontFamily: "var(--font-body)",
              textDecoration: "none",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "linear-gradient(135deg, rgba(200,168,78,0.6), rgba(200,168,78,0.3))";
              e.currentTarget.style.transform = "scale(1.03)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "linear-gradient(135deg, rgba(200,168,78,0.4), rgba(200,168,78,0.2))";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <Download size={16} />
            {form.downloadButtonText || "Download"}
          </a>

          <p style={{
            fontSize: 11,
            color: "var(--text-muted)",
            fontStyle: "italic",
            textAlign: "center",
            marginTop: 4,
            fontFamily: "var(--font-body)",
          }}>
            {form.customDate || defaultLastUpdated}
          </p>
        </div>
      </div>
    </div>
  );
};

const ResourceCard: React.FC<{ resource: ResourceItem }> = ({ resource }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        overflow: "hidden",
        background: "var(--bg-card)",
        backdropFilter: "var(--glass-blur)",
        WebkitBackdropFilter: "var(--glass-blur)",
        border: `1px solid ${hovered ? "var(--border-hover)" : "var(--border-primary)"}`,
        borderRadius: 20,
        padding: 24,
        boxShadow: hovered ? "var(--shadow-card-hover)" : "var(--shadow-card)",
        transform: hovered ? "translateY(-6px) scale(1.02)" : "translateY(0) scale(1)",
        transition: "all 0.6s cubic-bezier(0.23,1,0.32,1)",
        height: "100%",
        width: "100%",
        minHeight: 280,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: 4,
        height: "100%",
        background: "var(--accent-green)",
        opacity: hovered ? 1 : 0.6,
        transition: "opacity 0.4s ease",
      }} />

      <div style={{
        position: "absolute",
        top: -100,
        right: -100,
        width: 200,
        height: 200,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(154,184,122,0.1), transparent 70%)",
        opacity: hovered ? 0.5 : 0,
        transition: "opacity 0.6s ease",
      }} />

      <div style={{ position: "relative", zIndex: 1, flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 14 }}>
          <div style={{
            width: 40,
            height: 40,
            borderRadius: 11,
            background: "rgba(154,184,122,0.1)",
            border: "1px solid rgba(154,184,122,0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--accent-green)",
            flexShrink: 0,
          }}>
            {resource.icon}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 4 }}>
              <span style={{
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "0.07em",
                color: "var(--text-muted)",
                fontFamily: "var(--font-body)",
                textTransform: "uppercase",
              }}>
                {resource.category}
              </span>
              {resource.badge && (
                <span style={{
                  fontSize: 10,
                  fontWeight: 600,
                  padding: "2px 8px",
                  borderRadius: 100,
                  background: "rgba(154,184,122,0.12)",
                  border: "1px solid rgba(154,184,122,0.25)",
                  color: "var(--accent-green)",
                  fontFamily: "var(--font-body)",
                }}>
                  {resource.badge}
                </span>
              )}
            </div>
            <h4 style={{
              fontFamily: "var(--font-display)",
              fontSize: 17,
              fontWeight: 400,
              color: "var(--text-primary)",
              lineHeight: 1.35,
              margin: 0,
            }}>
              {resource.title}
            </h4>
          </div>
        </div>

        <p style={{
          color: "var(--text-secondary)",
          fontSize: 14,
          lineHeight: 1.6,
          marginBottom: 20,
          fontFamily: "var(--font-body)",
          flex: 1,
        }}>
          {resource.description}
        </p>

        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            padding: "12px 20px",
            borderRadius: 12,
            background: "linear-gradient(135deg, rgba(154,184,122,0.25), rgba(154,184,122,0.1))",
            border: "1px solid rgba(154,184,122,0.3)",
            color: "var(--text-primary)",
            fontSize: 14,
            fontWeight: 600,
            fontFamily: "var(--font-body)",
            textDecoration: "none",
            transition: "all 0.3s ease",
            marginTop: "auto",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "linear-gradient(135deg, rgba(154,184,122,0.4), rgba(154,184,122,0.2))";
            e.currentTarget.style.transform = "scale(1.03)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "linear-gradient(135deg, rgba(154,184,122,0.25), rgba(154,184,122,0.1))";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          <ExternalLink size={16} />
          Visit Resource
        </a>
      </div>
    </div>
  );
};

const CollapsibleSection: React.FC<{
  title: string;
  icon: JSX.Element;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  count: number;
}> = ({ title, icon, isOpen, onToggle, children, count }) => (
  <div style={{
    background: "var(--bg-card)",
    backdropFilter: "var(--glass-blur)",
    WebkitBackdropFilter: "var(--glass-blur)",
    borderRadius: 20,
    border: "1px solid var(--border-primary)",
    overflow: "hidden",
    boxShadow: "var(--shadow-card)",
  }}>
    <button
      onClick={onToggle}
      style={{
        width: "100%",
        padding: "24px 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "transparent",
        border: "none",
        borderBottom: isOpen ? "1px solid var(--border-primary)" : "none",
        cursor: "pointer",
        transition: "all 0.3s ease",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        {icon}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <h3 style={{
            fontFamily: "var(--font-display)",
            fontSize: 22,
            fontWeight: 400,
            color: "var(--text-primary)",
            margin: 0,
          }}>
            {title}
          </h3>
          <span style={{
            fontSize: 12,
            color: "var(--text-muted)",
            fontFamily: "var(--font-body)",
          }}>
            {count} item{count === 1 ? "" : "s"}
          </span>
        </div>
      </div>
      <ChevronDown
        size={24}
        style={{
          color: "var(--text-secondary)",
          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          transition: "transform 0.4s cubic-bezier(0.23,1,0.32,1)",
        }}
      />
    </button>

    {isOpen && (
      <div style={{ padding: 32, animation: "fadeSlideIn 0.5s ease-out both" }}>
        {children}
      </div>
    )}
  </div>
);

export default function FinancialCounselingResources() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState("dark");
  const [openSection, setOpenSection] = useState<string | null>("counseling");

  const isDark = theme === "dark";
  const vars = THEMES[theme];
  const cssVarString = Object.entries(vars).map(([k, v]) => `${k}: ${v};`).join("\n");

  const toggleSection = (id: string) => {
    setOpenSection((prev) => (prev === id ? null : id));
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
          25% { transform: translate(12px,-18px) scale(1.15); opacity:0.6; }
          50% { transform: translate(-8px,-30px) scale(0.85); opacity:0.2; }
          75% { transform: translate(16px,-12px) scale(1.08); opacity:0.5; }
        }
        @keyframes fadeSlideUp {
          from { opacity:0; transform:translateY(28px); }
          to { opacity:1; transform:translateY(0); }
        }
        @keyframes fadeSlideIn {
          from { opacity:0; transform:translateY(20px); }
          to { opacity:1; transform:translateY(0); }
        }

        * { box-sizing:border-box; margin:0; padding:0; }

        .fc-page {
          min-height:100vh;
          font-family: var(--font-body);
          background: var(--bg-primary);
          color: var(--text-primary);
          overflow-x: hidden;
          position: relative;
          transition: background 0.5s ease, color 0.4s ease;
        }
        .fc-page::before {
          content:'';
          position:fixed; inset:0;
          background:
            radial-gradient(ellipse 70% 50% at 30% 0%, var(--overlay-green), transparent),
            radial-gradient(ellipse 50% 40% at 70% 100%, rgba(200,168,78,0.04), transparent);
          pointer-events:none; z-index:0;
          transition: background 0.5s ease;
        }

        @media (max-width: 768px) {
          .fc-hero-title { font-size: 32px !important; }
          .fc-hero-inner { padding: 40px 20px 56px !important; }
        }
      `}</style>

      <div className="fc-page">
        <GridOverlay />
        <Particles />

        <div style={{ position: "relative", zIndex: 1 }}>
          {/* Hero */}
          <div style={{
            position: "relative",
            overflow: "hidden",
            background: "var(--bg-hero)",
            borderBottom: "1px solid var(--border-primary)",
            animation: "fadeSlideUp 0.7s ease-out both",
          }}>
            <div style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 320,
              height: 320,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(74,120,54,0.12) 0%, transparent 65%)",
              pointerEvents: "none",
            }} />

            <div className="fc-hero-inner" style={{
              maxWidth: 1200,
              margin: "0 auto",
              padding: "48px 32px 72px",
              position: "relative",
              zIndex: 1,
            }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 56,
              }}>
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    background: "none",
                    border: "none",
                    color: "#c8e0b4",
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: "pointer",
                    fontFamily: "var(--font-body)",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "#e8ede2"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "#c8e0b4"; }}
                >
                  <ArrowLeft size={16} />
                  Back to Last
                </button>
                <button
                  type="button"
                  onClick={() => setTheme(isDark ? "light" : "dark")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "8px 16px",
                    borderRadius: 12,
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#c8e0b4",
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                    fontFamily: "var(--font-body)",
                    transition: "all 0.3s ease",
                  }}
                >
                  {isDark ? <Sun size={14} /> : <Moon size={14} />}
                  {isDark ? "Light" : "Dark"}
                </button>
              </div>

              <div style={{
                width: 68,
                height: 68,
                borderRadius: 20,
                background: "linear-gradient(135deg, rgba(200,168,78,0.2), rgba(200,168,78,0.08))",
                border: "1px solid rgba(200,168,78,0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 28px",
              }}>
                <Users size={30} color="#c8a84e" strokeWidth={1.5} />
              </div>

              <h1 className="fc-hero-title" style={{
                fontFamily: "var(--font-display)",
                fontSize: 50,
                fontWeight: 400,
                textAlign: "center",
                color: "#e8ede2",
                lineHeight: 1.12,
                letterSpacing: "-0.02em",
                marginBottom: 16,
              }}>
                Financial{" "}
                <span style={{ fontStyle: "italic", color: "#c8a84e" }}>Counseling Resources</span>
              </h1>

              <div style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                marginBottom: 20,
              }}>
                <span style={{
                  padding: "5px 14px",
                  borderRadius: 100,
                  background: "rgba(0,0,0,0.2)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  fontSize: 11,
                  color: "#EDEDED",
                  fontFamily: "var(--font-body)",
                }}>
                  LAST REVIEWED MARCH 1, 2026
                </span>
              </div>

              <p style={{
                textAlign: "center",
                fontSize: 16,
                color: "rgba(232,237,226,0.6)",
                lineHeight: 1.75,
                maxWidth: 600,
                margin: "0 auto 32px",
              }}>
                Free and low-cost professional counseling services, plus essential SBA payment assistance forms — all in one place.
              </p>

              <div style={{
                marginTop: 40,
                maxWidth: 900,
                margin: "40px auto 0",
                background: "rgba(0,0,0,0.2)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 20,
                padding: 24,
              }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <AlertCircle size={20} style={{ color: "#c8a84e", marginTop: 2, flexShrink: 0 }} />
                  <p style={{
                    fontSize: 14,
                    color: "#EDEDED",
                    lineHeight: 1.7,
                    fontFamily: "var(--font-body)",
                  }}>
                    All external counseling resources are free or low-cost services. Always verify current requirements with the SBA before submission. For official information, visit{" "}
                    <a
                      href="https://www.sba.gov"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#c8e0b4", textDecoration: "underline" }}
                    >
                      SBA.gov
                    </a>.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sections */}
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "56px 24px 80px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

              <div style={{ animation: "fadeSlideUp 0.7s ease-out 0.1s both" }}>
                <CollapsibleSection
                  title="Professional Financial Counseling"
                  icon={<Users size={28} style={{ color: "#9ab87a" }} />}
                  isOpen={openSection === "counseling"}
                  onToggle={() => toggleSection("counseling")}
                  count={counselingResources.length}
                >
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
                    gap: 24,
                    alignItems: "stretch",
                  }}>
                    {counselingResources.map((resource, i) => (
                      <div
                        key={i}
                        style={{ animation: `fadeSlideIn 0.5s ease-out ${i * 0.05}s both`, display: "flex" }}
                      >
                        <ResourceCard resource={resource} />
                      </div>
                    ))}
                  </div>
                </CollapsibleSection>
              </div>

              <div style={{ animation: "fadeSlideUp 0.7s ease-out 0.15s both" }}>
                <CollapsibleSection
                  title="SBA Payment Assistance Forms & Templates"
                  icon={<FileText size={28} style={{ color: "#c8a84e" }} />}
                  isOpen={openSection === "forms"}
                  onToggle={() => toggleSection("forms")}
                  count={paymentAssistanceForms.length}
                >
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
                    gap: 24,
                    alignItems: "stretch",
                  }}>
                    {paymentAssistanceForms.map((form, i) => (
                      <div
                        key={i}
                        style={{ animation: `fadeSlideIn 0.5s ease-out ${i * 0.05}s both`, display: "flex" }}
                      >
                        <FormCard form={form} />
                      </div>
                    ))}
                  </div>
                </CollapsibleSection>
              </div>

            </div>

            <div style={{
              marginTop: 48,
              padding: 28,
              borderRadius: 16,
              background: "var(--bg-card)",
              backdropFilter: "var(--glass-blur)",
              border: "1px solid var(--border-primary)",
              animation: "fadeSlideUp 0.7s ease-out 0.4s both",
            }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <div style={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  background: "var(--accent-green)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  marginTop: 2,
                }}>
                  <AlertCircle size={14} style={{ color: "#fff" }} />
                </div>
                <div>
                  <h4 style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 16,
                    color: "var(--text-primary)",
                    marginBottom: 8,
                  }}>
                    Important Disclaimer
                  </h4>
                  <p style={{
                    color: "var(--text-secondary)",
                    fontSize: 13,
                    lineHeight: 1.7,
                    fontFamily: "var(--font-body)",
                  }}>
                    This information is provided for educational and informational purposes only. It does not constitute legal, financial, or professional advice. Always consult with qualified professionals and verify all information with official SBA sources before making any decisions or submissions. Professional financial counseling can significantly improve your request success rate.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
