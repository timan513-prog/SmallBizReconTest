import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronDown, ExternalLink, Download, FileText, BookOpen, Sparkles, Search, Sun, Moon, CircleAlert as AlertCircle, Lock, TrendingUp, MessageSquare, Lightbulb, Target } from "lucide-react";

interface HelpGuide {
  title: string;
  description: string;
  volume: string;
  viewUrl?: string;
  downloadPath?: string;
  customDate?: string;
  accentColor: string;
  customButtonText?: string;
  downloadButtonText?: string;
  status?: 'live' | 'coming_soon';
  featured?: boolean;
}

const defaultLastUpdated = "*LAST UPDATED MARCH 1, 2026*";

const normalize = (s: string) => (s || "").toLowerCase().replace(/\s+/g, " ").trim();

const matchesQuery = (guide: HelpGuide, q: string) => {
  if (!q) return true;
  const hay = `${guide.title} ${guide.description} ${guide.volume}`.toLowerCase();
  return hay.includes(q);
};

const liveGuides: HelpGuide[] = [
  {
    title: "SBA Common Phrases",
    description: "Decode SBA terminology and understand what loan officers really mean. Essential vocabulary for effective SBA communication.",
    volume: "Vol. 1",
    viewUrl: "https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/public/SMALLBIZRECON-FREEPUBLIC/1.%20SBA_Common_Phrases_(Vol.1)_SmallBiz_Recon_2026.pdf",
    downloadPath: "https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/public/SMALLBIZRECON-FREEPUBLIC/1.%20SBA_Common_Phrases_(Vol.1)_SmallBiz_Recon_2026.pdf",
    accentColor: "#CDA349",
    status: 'live',
    featured: true
  },
  {
    title: "EIDL Servicing Cheat Sheet",
    description: "Quick reference guide for COVID EIDL servicing actions, requirements, and common scenarios. Essential tips from former SBA professionals.",
    volume: "Vol. 2",
    viewUrl: "https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/public/SMALLBIZRECON-FREEPUBLIC/2.%20COVID_EIDL_Servicing_Guide_(Vol.2)_SmallBiz_Recon_2026.pdf",
    downloadPath: "https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/public/SMALLBIZRECON-FREEPUBLIC/2.%20COVID_EIDL_Servicing_Guide_(Vol.2)_SmallBiz_Recon_2026.pdf",
    accentColor: "#7E9E61",
    status: 'live',
    featured: true
  },
  {
    title: "SBA Loan Types",
    description: "Comprehensive overview of all SBA loan programs, eligibility requirements, and which program fits your business needs.",
    volume: "Vol. 3",
    viewUrl: "https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/public/SMALLBIZRECON-FREEPUBLIC/3.%20SBA_Loan_Types_(Vol.3)_SmallBiz_Recon_2026.pdf",
    downloadPath: "https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/public/SMALLBIZRECON-FREEPUBLIC/3.%20SBA_Loan_Types_(Vol.3)_SmallBiz_Recon_2026.pdf",
    accentColor: "#5D829C",
    status: 'live'
  },
  {
    title: "Communicating with the SBA",
    description: "Best practices for effective communication with SBA personnel, including email templates and phone call strategies.",
    volume: "Vol. 4",
    viewUrl: "https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/public/SMALLBIZRECON-FREEPUBLIC/4.%20Communicating_With_The_SBA_(Vol.4)_SmallBiz_Recon_2026.pdf",
    downloadPath: "https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/public/SMALLBIZRECON-FREEPUBLIC/4.%20Communicating_With_The_SBA_(Vol.4)_SmallBiz_Recon_2026.pdf",
    accentColor: "#8B4513",
    status: 'live',
    featured: true
  },
  {
    title: "10 Steps to Start your Business",
    description: "Step-by-step roadmap for launching your business, from initial planning to opening day. Includes SBA resources and requirements.",
    volume: "Vol. 5",
    viewUrl: "https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/public/SMALLBIZRECON-FREEPUBLIC/5.%2010_Steps_Guide(Vol.5)_SmallBiz_Recon_2026.pdf",
    downloadPath: "https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/public/SMALLBIZRECON-FREEPUBLIC/5.%2010_Steps_Guide(Vol.5)_SmallBiz_Recon_2026.pdf",
    accentColor: "#444A47",
    status: 'live'
  },
  {
    title: "What is a Business Plan",
    description: "Complete guide to creating an effective business plan that meets SBA requirements and impresses lenders.",
    volume: "Vol. 6",
    viewUrl: "https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/public/SMALLBIZRECON-FREEPUBLIC/6.%20Business_Plan_Tactical_Guide%20(Vol.6)_SmallBiz_Recon.pdf",
    downloadPath: "https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/public/SMALLBIZRECON-FREEPUBLIC/6.%20Business_Plan_Tactical_Guide%20(Vol.6)_SmallBiz_Recon.pdf",
    customDate: "*UPDATED JANUARY 30, 2026*",
    accentColor: "#4A5A28",
    status: 'live'
  },
  {
    title: "SBA Mission Briefing",
    description: "Collection of 20 lesser-known SBA facts, statistics, and insider knowledge to help you navigate the SBA system more effectively.",
    volume: "Vol. 7",
    viewUrl: "https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/public/SMALLBIZRECON-FREEPUBLIC/SMALLBIZ_RECON_SBA_INTELLIGENCE_BRIEFING20.pdf",
    downloadPath: "https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/public/SMALLBIZRECON-FREEPUBLIC/SMALLBIZ_RECON_SBA_INTELLIGENCE_BRIEFING20.pdf",
    accentColor: "#556B2F",
    status: 'live'
  },
  {
    title: "Business Plan, Example 1",
    description: "Detailed sample business plan for a startup company seeking SBA funding. Includes all required sections and financial projections.",
    volume: "Vol. 8",
    viewUrl: "https://zrktinvphjmalvrsjmii.supabase.co/storage/v1/object/public/SmallBiz%20Recon%20Free%20Tools/Sabbi's%20Sample%20Business%20Plan%20and%20Key%20Business%20Terms.pdf",
    downloadPath: "https://zrktinvphjmalvrsjmii.supabase.co/storage/v1/object/public/SmallBiz%20Recon%20Free%20Tools/Sabbi's%20Sample%20Business%20Plan%20and%20Key%20Business%20Terms.docx",
    customButtonText: "View PDF Now",
    downloadButtonText: "Download .docx",
    accentColor: "#A2B98C",
    status: 'live'
  },
  {
    title: "Business Plan, Example 2",
    description: "Detailed sample business plan for a startup company seeking SBA funding. Includes all required sections and financial projections.",
    volume: "Vol. 9",
    viewUrl: "https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/public/SMALLBIZRECON-FREEPUBLIC/2026_SmallBiz_Recon_Startup-Business-Plan-Template.pdf",
    downloadPath: "https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/public/SMALLBIZRECON-FREEPUBLIC/2026_SmallBiz_Recon_Startup-Business-Plan-Template.docx",
    accentColor: "#CDA349",
    status: 'live'
  },
  {
    title: "Business Plan Starter Kit (SBA-Friendly)",
    description: "A simplified starter kit with a lean plan structure, executive summary template, and lender-ready sections that keep you organized.",
    volume: "Vol. 10",
   viewUrl: "https://zrktinvphjmalvrsjmii.supabase.co/storage/v1/object/public/SmallBiz%20Recon%20Free%20Tools/Business_Plan_Starter_Kit%20(1).pdf",
    downloadPath: "https://zrktinvphjmalvrsjmii.supabase.co/storage/v1/object/public/SmallBiz%20Recon%20Free%20Tools/Business_Plan_Starter_Kit%20(1).pdf",
    accentColor: "#5D829C",
    status: 'live'
  }
];

const comingSoonGuides: HelpGuide[] = [
  {
    title: "Submission Command Center",
    description: "Master checklist for sending clean, complete requests: subject lines, attachment naming, PDF order, and the mistakes that cause delays.",
    volume: "Vol. 11",
    customDate: "*COMING SOON*",
    accentColor: "#7E9E61",
    status: 'coming_soon'
  },
  {
    title: "SBA Loan Types, Plain English Edition",
    description: "Quick breakdown of SBA programs, who each one is best for, common eligibility highlights, and what most borrowers misunderstand.",
    volume: "Vol. 12",
    customDate: "*COMING SOON*",
    accentColor: "#8B4513",
    status: 'coming_soon'
  },
  {
    title: "EIDL Servicing Red Flags & Fixes",
    description: "Top reasons servicing requests stall or get denied, plus fast fixes: missing docs, mismatched info, insurance issues, and more.",
    volume: "Vol. 13",
    customDate: "*COMING SOON*",
    accentColor: "#444A47",
    status: 'coming_soon'
  },
  {
    title: "Collateral & UCC Basics (What Borrowers Should Know)",
    description: "Plain-English guide to collateral, liens, UCC searches, what they prove, and what SBA typically expects in a clean package.",
    volume: "Vol. 14",
    customDate: "*COMING SOON*",
    accentColor: "#4A5A28",
    status: 'coming_soon'
  },
  {
    title: "Treasury Cross-Servicing Survival Guide",
    description: "What it means, what changes once you're there, what SBA can and can't do, and practical next steps to stabilize.",
    volume: "Vol. 15",
    customDate: "*COMING SOON*",
    accentColor: "#556B2F",
    status: 'coming_soon'
  }
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
          <pattern id="guidesGrid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="var(--accent-green)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#guidesGrid)" />
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
          width: `${1.5 + Math.random() * 2.5}px`,
          height: `${1.5 + Math.random() * 2.5}px`,
          borderRadius: "50%",
          background: `rgba(154, 184, 122, var(--particle-opacity))`,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animation: `pFloat ${9 + Math.random() * 14}s ease-in-out infinite`,
          animationDelay: `${Math.random() * -12}s`,
        }} />
      ))}
    </div>
  );
}

const GuideCard: React.FC<{ guide: HelpGuide }> = ({ guide }) => {
  const [hovered, setHovered] = useState(false);
  const isComingSoon = guide.status === 'coming_soon';

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
        minHeight: 340,
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
        background: guide.accentColor,
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
        background: `radial-gradient(circle, ${guide.accentColor}22, transparent 70%)`,
        opacity: hovered ? 0.4 : 0,
        transition: "opacity 0.6s ease",
      }} />

      <div style={{ position: "relative", zIndex: 1, flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <BookOpen size={20} style={{ color: guide.accentColor }} />
            <span style={{
              fontFamily: "var(--font-body)",
              fontSize: 11,
              fontWeight: 700,
              color: "var(--text-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.05em"
            }}>
              {guide.volume}
            </span>
          </div>
          {isComingSoon && (
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "4px 10px",
              borderRadius: 8,
              background: `${guide.accentColor}15`,
              border: `1px solid ${guide.accentColor}33`,
            }}>
              <Lock size={12} style={{ color: guide.accentColor }} />
              <span style={{
                fontSize: 10,
                fontWeight: 700,
                color: guide.accentColor,
                textTransform: "uppercase",
                fontFamily: "var(--font-body)"
              }}>Soon</span>
            </div>
          )}
        </div>

        <h4 style={{
          fontFamily: "var(--font-display)",
          fontSize: 17,
          fontWeight: 400,
          color: "var(--text-primary)",
          lineHeight: 1.35,
          marginBottom: 12,
        }}>
          {guide.title}
        </h4>

        <p style={{
          color: "var(--text-secondary)",
          fontSize: 14,
          lineHeight: 1.6,
          marginBottom: 20,
          fontFamily: "var(--font-body)",
          flex: 1,
        }}>
          {guide.description}
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: "auto" }}>
          {guide.viewUrl && !isComingSoon && (
            <a
              href={guide.viewUrl}
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
              {guide.customButtonText || "View Online"}
            </a>
          )}

          {guide.downloadPath && !isComingSoon ? (
            <a
              href={guide.downloadPath}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                padding: "12px 20px",
                borderRadius: 12,
                background: `linear-gradient(135deg, ${guide.accentColor}66, ${guide.accentColor}33)`,
                border: `1px solid ${guide.accentColor}88`,
                color: "var(--text-primary)",
                fontSize: 14,
                fontWeight: 600,
                fontFamily: "var(--font-body)",
                textDecoration: "none",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = `linear-gradient(135deg, ${guide.accentColor}88, ${guide.accentColor}44)`;
                e.currentTarget.style.transform = "scale(1.03)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = `linear-gradient(135deg, ${guide.accentColor}66, ${guide.accentColor}33)`;
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              <Download size={16} />
              {guide.downloadButtonText || "Download PDF"}
            </a>
          ) : isComingSoon && (
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              padding: "12px 20px",
              borderRadius: 12,
              background: "var(--bg-secondary)",
              border: "1px solid var(--border-primary)",
              color: "var(--text-muted)",
              fontSize: 14,
              fontWeight: 600,
              fontFamily: "var(--font-body)",
              opacity: 0.5,
            }}>
              <Lock size={16} />
              Coming Soon
            </div>
          )}

          <p style={{
            fontSize: 11,
            color: "var(--text-muted)",
            fontStyle: "italic",
            textAlign: "center",
            marginTop: 4,
            fontFamily: "var(--font-body)",
          }}>
            {guide.customDate || defaultLastUpdated}
          </p>
        </div>
      </div>
    </div>
  );
};

const CollapsibleSection: React.FC<{
  title: string;
  icon: JSX.Element;
  guides: HelpGuide[];
  isOpen: boolean;
  onToggle: () => void;
  filterText: string;
}> = ({ title, icon, guides, isOpen, onToggle, filterText }) => {
  const q = normalize(filterText);
  const filteredGuides = guides.filter((g) => matchesQuery(g, q));

  if (filteredGuides.length === 0) return null;

  return (
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
            }}>
              {title}
            </h3>
            <span style={{
              fontSize: 12,
              color: "var(--text-muted)",
              fontFamily: "var(--font-body)",
            }}>
              {filteredGuides.length} guide{filteredGuides.length === 1 ? '' : 's'}
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
        <div style={{
          padding: 32,
          animation: "fadeSlideIn 0.5s ease-out both",
        }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: 24,
            alignItems: "stretch",
          }}>
            {filteredGuides.map((guide, i) => (
              <div
                key={i}
                style={{
                  animation: `fadeSlideIn 0.5s ease-out ${i * 0.05}s both`,
                  display: "flex",
                }}
              >
                <GuideCard guide={guide} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default function SBAHelpGuidesPage() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState("dark");
  const [openSections, setOpenSections] = useState<Set<string>>(new Set(["available"]));
  const [query, setQuery] = useState("");

  const isDark = theme === "dark";
  const vars = THEMES[theme];

  const toggleSection = (sectionId: string) => {
    const next = new Set(openSections);
    if (next.has(sectionId)) next.delete(sectionId);
    else next.add(sectionId);
    setOpenSections(next);
  };

  const sections = [
    { id: "available", title: "Available Guides", icon: <BookOpen size={28} style={{ color: "#CDA349" }} />, guides: liveGuides },
    { id: "comingSoon", title: "Coming Soon", icon: <Lock size={28} style={{ color: "#7E9E61" }} />, guides: comingSoonGuides },
  ];

  const featuredGuides = liveGuides.filter(g => g.featured);

  const cssVarString = Object.entries(vars).map(([k, v]) => `${k}: ${v};`).join("\n");

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
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }

        * { box-sizing:border-box; margin:0; padding:0; }

        .guides-page {
          min-height:100vh;
          font-family: var(--font-body);
          background: var(--bg-primary);
          color: var(--text-primary);
          overflow-x: hidden;
          position: relative;
          transition: background 0.5s ease, color 0.4s ease;
        }
        .guides-page::before {
          content:'';
          position:fixed; inset:0;
          background:
            radial-gradient(ellipse 70% 50% at 30% 0%, var(--overlay-green), transparent),
            radial-gradient(ellipse 50% 40% at 70% 100%, rgba(200,168,78,0.04), transparent);
          pointer-events:none; z-index:0;
          transition: background 0.5s ease;
        }

        @media (max-width: 768px) {
          .hero-title { font-size: 32px !important; }
          .hero-inner { padding: 40px 20px 56px !important; }
        }
      `}</style>

      <div className="guides-page">
        <GridOverlay />
        <Particles />

        <div style={{ position: "relative", zIndex: 1 }}>
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

            <div className="hero-inner" style={{
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
                  onMouseEnter={(e) => e.currentTarget.style.color = "#e8ede2"}
                  onMouseLeave={(e) => e.currentTarget.style.color = "#c8e0b4"}
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
                <FileText size={30} color="#c8a84e" strokeWidth={1.5} />
              </div>

              <h1 className="hero-title" style={{
                fontFamily: "var(--font-display)",
                fontSize: 50,
                fontWeight: 400,
                textAlign: "center",
                color: "#e8ede2",
                lineHeight: 1.12,
                letterSpacing: "-0.02em",
                marginBottom: 16,
              }}>
                SmallBiz Recon™{" "}
                <span style={{ fontStyle: "italic", color: "#c8a84e" }}>Free Guide Library</span>
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
                  LAST REVIEWED JANUARY 30, 2026
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
                Quick reference guides covering SBA loan programs, COVID EIDL servicing basics, and communication strategies, built from public guidance and real-world experience.
              </p>

              <div style={{ maxWidth: 720, margin: "0 auto" }}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: 16,
                  padding: "12px 20px",
                  backdropFilter: "blur(8px)",
                }}>
                  <Search size={20} style={{ color: "#EDEDED" }} />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search guides by title, volume, or keywords..."
                    style={{
                      width: "100%",
                      background: "transparent",
                      outline: "none",
                      border: "none",
                      color: "#EDEDED",
                      fontSize: 15,
                      fontFamily: "var(--font-body)",
                    }}
                  />
                </div>

                <div style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 8,
                  justifyContent: "center",
                  marginTop: 16,
                }}>
                  <span style={{
                    padding: "5px 14px",
                    borderRadius: 100,
                    fontSize: 12,
                    border: "1px solid rgba(255,255,255,0.15)",
                    background: "rgba(255,255,255,0.05)",
                    color: "#EDEDED",
                    fontFamily: "var(--font-body)",
                  }}>
                    Free Downloads
                  </span>
                  <span style={{
                    padding: "5px 14px",
                    borderRadius: 100,
                    fontSize: 12,
                    border: "1px solid rgba(200,168,78,0.3)",
                    background: "rgba(200,168,78,0.1)",
                    color: "#c8a84e",
                    fontFamily: "var(--font-body)",
                  }}>
                    <Sparkles size={12} style={{ display: "inline", marginRight: 4 }} />
                    PDF & .docx Available
                  </span>
                  <span style={{
                    padding: "5px 14px",
                    borderRadius: 100,
                    fontSize: 12,
                    border: "1px solid rgba(255,255,255,0.15)",
                    background: "rgba(255,255,255,0.05)",
                    color: "#EDEDED",
                    fontFamily: "var(--font-body)",
                  }}>
                    No Sign-Up Required
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Picks Section */}
          <div style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "56px 24px 24px",
          }}>
            <div style={{
              background: "var(--bg-card)",
              backdropFilter: "var(--glass-blur)",
              WebkitBackdropFilter: "var(--glass-blur)",
              borderRadius: 24,
              border: "1px solid var(--border-primary)",
              padding: 40,
              boxShadow: "var(--shadow-card)",
              animation: "fadeSlideUp 0.7s ease-out 0.2s both",
              position: "relative",
              overflow: "hidden",
            }}>
              <div style={{
                position: "absolute",
                top: -60,
                right: -60,
                width: 180,
                height: 180,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(200,168,78,0.15), transparent 70%)",
              }} />

              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
                  <Sparkles size={24} style={{ color: "#c8a84e" }} />
                  <h2 style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 28,
                    fontWeight: 400,
                    color: "var(--text-primary)",
                  }}>
                    Featured Picks
                  </h2>
                </div>

                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: 20,
                }}>
                  {featuredGuides.map((guide, i) => (
                    <div
                      key={i}
                      style={{
                        position: "relative",
                        background: "var(--bg-secondary)",
                        borderRadius: 16,
                        border: "1px solid var(--border-primary)",
                        padding: 20,
                        transition: "all 0.4s cubic-bezier(0.23,1,0.32,1)",
                        animation: `fadeSlideIn 0.5s ease-out ${0.1 + i * 0.1}s both`,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-4px)";
                        e.currentTarget.style.boxShadow = "var(--shadow-card-hover)";
                        e.currentTarget.style.borderColor = "var(--border-hover)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "none";
                        e.currentTarget.style.borderColor = "var(--border-primary)";
                      }}
                    >
                      <div style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: 4,
                        background: `linear-gradient(90deg, ${guide.accentColor}, transparent)`,
                        borderRadius: "16px 16px 0 0",
                      }} />

                      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                        <div style={{
                          width: 36,
                          height: 36,
                          borderRadius: 10,
                          background: `${guide.accentColor}15`,
                          border: `1px solid ${guide.accentColor}33`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}>
                          <TrendingUp size={16} style={{ color: guide.accentColor }} />
                        </div>
                        <span style={{
                          fontSize: 11,
                          fontWeight: 700,
                          color: "var(--text-muted)",
                          textTransform: "uppercase",
                          fontFamily: "var(--font-body)",
                        }}>
                          {guide.volume}
                        </span>
                      </div>

                      <h4 style={{
                        fontFamily: "var(--font-display)",
                        fontSize: 16,
                        fontWeight: 400,
                        color: "var(--text-primary)",
                        marginBottom: 8,
                        lineHeight: 1.3,
                      }}>
                        {guide.title}
                      </h4>

                      <p style={{
                        fontSize: 13,
                        color: "var(--text-secondary)",
                        lineHeight: 1.5,
                        marginBottom: 16,
                        fontFamily: "var(--font-body)",
                      }}>
                        {guide.description.length > 100
                          ? guide.description.substring(0, 100) + "..."
                          : guide.description}
                      </p>

                      <div style={{ display: "flex", gap: 8 }}>
                        <a
                          href={guide.viewUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            flex: 1,
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 6,
                            padding: "8px 14px",
                            borderRadius: 10,
                            border: "1px solid var(--border-primary)",
                            background: "transparent",
                            color: "var(--text-primary)",
                            fontSize: 12,
                            fontWeight: 600,
                            fontFamily: "var(--font-body)",
                            textDecoration: "none",
                            transition: "all 0.3s ease",
                          }}
                        >
                          <ExternalLink size={14} />
                          View
                        </a>
                        <a
                          href={guide.downloadPath}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            flex: 1,
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 6,
                            padding: "8px 14px",
                            borderRadius: 10,
                            background: `linear-gradient(135deg, ${guide.accentColor}66, ${guide.accentColor}33)`,
                            border: `1px solid ${guide.accentColor}88`,
                            color: "var(--text-primary)",
                            fontSize: 12,
                            fontWeight: 600,
                            fontFamily: "var(--font-body)",
                            textDecoration: "none",
                            transition: "all 0.3s ease",
                          }}
                        >
                          <Download size={14} />
                          PDF
                        </a>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{
                  marginTop: 24,
                  padding: 16,
                  borderRadius: 12,
                  background: "rgba(200,168,78,0.08)",
                  border: "1px solid rgba(200,168,78,0.15)",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}>
                  <Lightbulb size={20} style={{ color: "#c8a84e", flexShrink: 0 }} />
                  <p style={{
                    fontSize: 13,
                    color: "var(--text-secondary)",
                    fontFamily: "var(--font-body)",
                    lineHeight: 1.6,
                  }}>
                    <strong style={{ color: "var(--text-primary)" }}>Pro Tip:</strong> These are our most popular guides, perfect for getting started with SBA servicing and communication strategies.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px 80px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {sections.map((section, i) => (
                <div
                  key={section.id}
                  style={{ animation: `fadeSlideUp 0.7s ease-out ${0.3 + i * 0.05}s both` }}
                >
                  <CollapsibleSection
                    title={section.title}
                    icon={section.icon}
                    guides={section.guides}
                    isOpen={openSections.has(section.id)}
                    onToggle={() => toggleSection(section.id)}
                    filterText={query}
                  />
                </div>
              ))}
            </div>

            <div style={{
              marginTop: 48,
              padding: 28,
              borderRadius: 16,
              background: "var(--bg-card)",
              backdropFilter: "var(--glass-blur)",
              border: "1px solid var(--border-primary)",
              animation: "fadeSlideUp 0.7s ease-out 0.8s both",
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
                    SmallBiz Recon™ is an independent educational resource and is not affiliated with, endorsed by, or connected to any government agency. All information is provided for educational and informational purposes only. Always consult with qualified professionals and verify all information with official sources before making any decisions.
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
