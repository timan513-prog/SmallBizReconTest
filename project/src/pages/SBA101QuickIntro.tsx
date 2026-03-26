import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Download, BookOpen, CircleCheck as CheckCircle, Lightbulb, FileText, Scale, Target, Shield, Users, ChevronRight, Sun, Moon, Menu, X, ShieldCheck, Landmark, ClipboardCheck, Sparkles, ChevronLeft } from "lucide-react";
import LoanProgramModal from "../components/LoanProgramModal";

interface LoanProgram {
  title: string;
  description: string;
  details: string;
  color: string;
}

type QuizQuestion = {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

type Section = {
  id: string;
  title: string;
  icon: React.ReactNode;
  kicker?: string;
  content: React.ReactNode;
  quiz?: QuizQuestion[];
};

const STORAGE_KEY_PROGRESS = "sbr_sba101_progress_v1";
const STORAGE_KEY_COMPLETED = "sbr_sba101_completed_v1";

const QUICK_START_GUIDE_PDF_URL =
  "https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/public/SMALLBIZRECON-FREEPUBLIC/SmallBiz_Recon_SBA_101_Guide.pdf";

const THEMES = {
  dark: {
    "--bg-primary": "#181c14",
    "--bg-secondary": "rgba(30, 34, 26, 0.6)",
    "--bg-tertiary": "rgba(38, 44, 32, 0.5)",
    "--bg-card": "rgba(30, 34, 26, 0.6)",
    "--bg-card-hover": "rgba(36, 42, 30, 0.7)",
    "--bg-hero": "linear-gradient(180deg, rgba(50,62,38,0.7) 0%, rgba(24,28,20,0.98) 100%)",
    "--border-primary": "rgba(154, 184, 122, 0.15)",
    "--border-hover": "rgba(154, 184, 122, 0.35)",
    "--text-primary": "#f0f5ea",
    "--text-secondary": "#a5b598",
    "--text-muted": "#6b7863",
    "--accent-green": "#9ab87a",
    "--accent-green-bright": "#c8e0b4",
    "--accent-gold": "#c8a84e",
    "--accent-blue": "#7a9ccc",
    "--glass-blur": "blur(24px)",
    "--shadow-card": "0 4px 32px rgba(0,0,0,0.2)",
    "--shadow-card-hover": "0 24px 64px rgba(0,0,0,0.35)",
    "--grid-opacity": "0.03",
    "--particle-opacity": "0.15",
    "--overlay-green": "rgba(74,120,54,0.08)",
    "--badge-bg": "rgba(154,184,122,0.1)",
    "--badge-border": "rgba(154,184,122,0.2)",
  },
  light: {
    "--bg-primary": "#f5f3ee",
    "--bg-secondary": "rgba(255, 255, 255, 0.7)",
    "--bg-tertiary": "rgba(245, 243, 238, 0.8)",
    "--bg-card": "rgba(255, 255, 255, 0.75)",
    "--bg-card-hover": "rgba(255, 255, 255, 0.9)",
    "--bg-hero": "linear-gradient(180deg, #3d5a2a 0%, #2a3d1e 100%)",
    "--border-primary": "rgba(74, 120, 54, 0.15)",
    "--border-hover": "rgba(74, 120, 54, 0.35)",
    "--text-primary": "#1a2e12",
    "--text-secondary": "#4a5d42",
    "--text-muted": "#7a8b72",
    "--accent-green": "#4A7836",
    "--accent-green-bright": "#3d6a2b",
    "--accent-gold": "#9a7a28",
    "--accent-blue": "#4678AA",
    "--glass-blur": "blur(20px)",
    "--shadow-card": "0 4px 24px rgba(0,0,0,0.06)",
    "--shadow-card-hover": "0 20px 48px rgba(0,0,0,0.1)",
    "--grid-opacity": "0.04",
    "--particle-opacity": "0.1",
    "--overlay-green": "rgba(74,120,54,0.04)",
    "--badge-bg": "rgba(74,120,54,0.08)",
    "--badge-border": "rgba(74,120,54,0.18)",
  },
};

function GridOverlay() {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0, opacity: "var(--grid-opacity)" }}>
      <svg width="100%" height="100%">
        <defs>
          <pattern id="bgGrid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="var(--accent-green)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#bgGrid)" />
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

function LoanProgramCard({ program, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={() => onClick(program)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        background: "var(--bg-card)",
        backdropFilter: "var(--glass-blur)",
        border: `1px solid ${hovered ? "var(--border-hover)" : "var(--border-primary)"}`,
        borderRadius: 16,
        padding: 24,
        textAlign: "left",
        cursor: "pointer",
        transition: "all 0.5s cubic-bezier(0.23,1,0.32,1)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered ? "var(--shadow-card-hover)" : "var(--shadow-card)",
      }}
    >
      <h3 style={{
        fontFamily: "var(--font-display)",
        fontSize: 18,
        fontWeight: 400,
        color: "var(--text-primary)",
        marginBottom: 8,
      }}>
        {program.title}
      </h3>
      <p style={{
        fontSize: 13,
        color: "var(--text-secondary)",
        lineHeight: 1.7,
        fontFamily: "var(--font-body)",
      }}>
        {program.description}
      </p>
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        marginTop: 12,
        fontSize: 12,
        color: "var(--accent-green)",
        fontWeight: 600,
      }}>
        Learn more <ChevronRight size={14} />
      </div>
    </button>
  );
}

export default function SBA101QuickIntroPremium() {
  const [theme, setTheme] = useState("dark");
  const [selectedLoanProgram, setSelectedLoanProgram] = useState<LoanProgram | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState<string>("overview");
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const [quizState, setQuizState] = useState<
    Record<string, { answers: Record<number, number>; submitted: boolean }>
  >({});
  const [roleToggle, setRoleToggle] = useState<"SBA" | "TREASURY">("SBA");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const contentTopRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const isDark = theme === "dark";
  const vars = THEMES[theme];

  const scrollToTop = () => {
    contentTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const loanPrograms: LoanProgram[] = useMemo(
    () => [
      {
        title: "7(a) Loans",
        description: "Flexible loans for working capital and real estate",
        details: "The 7(a) Loan is the SBA's most common loan program, offering up to $5 million for working capital, real estate, or equipment.",
        color: "green",
      },
      {
        title: "504 Loans",
        description: "Fixed-rate financing for real estate, equipment",
        details: "The 504 Loan provides long-term, fixed-rate financing for major assets like commercial real estate or equipment.",
        color: "gold",
      },
      {
        title: "Microloans",
        description: "Up to $50,000 with business support",
        details: "SBA Microloans offer up to $50,000 for new or growing small businesses needing working capital, inventory, or supplies.",
        color: "blue",
      },
      {
        title: "Disaster Loans",
        description: "Low-interest disaster recovery loans",
        details: "Disaster Loans provide low-interest funding for businesses affected by declared disasters, including COVID EIDL.",
        color: "purple",
      },
    ],
    []
  );

  const handleCardClick = useCallback((loanProgram: LoanProgram) => {
    setSelectedLoanProgram(loanProgram);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedLoanProgram(null);
  }, []);

  const markComplete = useCallback((id: string) => {
    setCompleted((prev) => ({ ...prev, [id]: true }));
  }, []);

  const resetProgress = useCallback(() => {
    setCompleted({});
    setQuizState({});
    setActiveSectionId("overview");
    try {
      localStorage.removeItem(STORAGE_KEY_COMPLETED);
      localStorage.removeItem(STORAGE_KEY_PROGRESS);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      const savedCompleted = localStorage.getItem(STORAGE_KEY_COMPLETED);
      const savedProgress = localStorage.getItem(STORAGE_KEY_PROGRESS);
      if (savedCompleted) setCompleted(JSON.parse(savedCompleted));
      if (savedProgress) {
        const parsed = JSON.parse(savedProgress);
        setActiveSectionId(parsed.activeSectionId || "overview");
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_COMPLETED, JSON.stringify(completed));
      localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify({ activeSectionId }));
    } catch {
      // ignore
    }
  }, [completed, activeSectionId]);

  const sections: Section[] = useMemo(
    () => [
      {
        id: "overview",
        title: "Mission Brief",
        kicker: "Start here, get oriented fast",
        icon: <Sparkles size={20} />,
        content: (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{
              padding: 24,
              borderRadius: 16,
              background: "var(--bg-card)",
              backdropFilter: "var(--glass-blur)",
              border: "1px solid var(--border-primary)",
            }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <div style={{ marginTop: 2, color: "var(--accent-gold)" }}>
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 400, color: "var(--text-primary)", marginBottom: 8 }}>
                    What this is
                  </div>
                  <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7 }}>
                    A premium, interactive SmallBiz Recon™ 101 guide built for clarity and action, with a heavier focus on COVID EIDL realities and common servicing paths.
                  </p>
                </div>
              </div>
            </div>

            <div style={{
              padding: 24,
              borderRadius: 16,
              background: "var(--bg-card)",
              backdropFilter: "var(--glass-blur)",
              border: "1px solid var(--border-primary)",
            }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <div style={{ marginTop: 2, color: "var(--accent-green)" }}>
                  <Scale size={20} />
                </div>
                <div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 400, color: "var(--text-primary)", marginBottom: 8 }}>
                    What this is not
                  </div>
                  <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7 }}>
                    For informational purposes only. Not legal, financial, or SBA advice. Policies can change, outcomes vary by facts, and official guidance controls.
                  </p>
                </div>
              </div>
            </div>

            <div style={{
              padding: 24,
              borderRadius: 16,
              background: "var(--bg-card)",
              backdropFilter: "var(--glass-blur)",
              border: "1px solid var(--border-primary)",
            }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <div style={{ marginTop: 2, color: "var(--accent-blue)" }}>
                  <ClipboardCheck size={20} />
                </div>
                <div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 400, color: "var(--text-primary)", marginBottom: 8 }}>
                    How to use this page
                  </div>
                  <ul style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 8, fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7 }}>
                    <li>Pick a section from the navigation, read the essentials, complete the mini quiz.</li>
                    <li>Mark sections complete, your progress is saved on this device.</li>
                    <li>Use the decision helper to route to the right servicing toolkit.</li>
                  </ul>
                </div>
              </div>
            </div>

            <div style={{
              padding: 24,
              borderRadius: 16,
              background: "var(--bg-tertiary)",
              border: "1px solid var(--border-primary)",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "var(--text-secondary)", marginBottom: 12 }}>
                <span style={{ height: 8, width: 8, borderRadius: "50%", background: "var(--accent-gold)" }} />
                SMALLBIZ RECON™, TRUST NOTE
              </div>
              <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7 }}>
                SmallBiz Recon™ is an independent educational resource, created by professionals with former SBA servicing experience. 15,000+ SBA cases reviewed for practical insight.
              </p>
            </div>
          </div>
        ),
        quiz: [
          {
            question: "What is the main purpose of this guide?",
            options: [
              "To provide legal advice tailored to your situation",
              "To help you understand SBA programs and prepare stronger submissions",
              "To replace SBA guidance and lender underwriting",
              "To guarantee approval outcomes",
            ],
            correctIndex: 1,
            explanation: "This guide is educational. It helps you understand programs, process, and common submission expectations.",
          },
          {
            question: "Why does this guide emphasize COVID EIDL more than typical SBA overviews?",
            options: [
              "EIDL is direct lending with unique servicing rules and long-term obligations",
              "EIDL is handled only by private banks",
              "EIDL has no documentation requirements",
              "EIDL is unrelated to SBA servicing",
            ],
            correctIndex: 0,
            explanation: "COVID EIDL has distinct servicing realities, including collateral rules, compliance obligations, and long duration.",
          },
        ],
      },
      {
        id: "programs",
        title: "Loan Programs",
        kicker: "Know the lanes, pick the right tool",
        icon: <BookOpen size={20} />,
        content: (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
              {loanPrograms.map((program, index) => (
                <LoanProgramCard key={index} program={program} onClick={handleCardClick} />
              ))}
            </div>

            <div style={{
              padding: 24,
              borderRadius: 16,
              background: "var(--bg-card)",
              backdropFilter: "var(--glass-blur)",
              border: "1px solid var(--border-primary)",
            }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <div style={{ marginTop: 2, color: "var(--accent-gold)" }}>
                  <Lightbulb size={20} />
                </div>
                <div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 400, color: "var(--text-primary)", marginBottom: 8 }}>
                    Sabbi Says
                  </div>
                  <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7 }}>
                    Program type drives the process. 7(a) and 504 are lender driven and SBA is the guarantor. Disaster programs (including COVID EIDL) have a different servicing feel because the structure is different.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ),
        quiz: [
          {
            question: "Which statement is generally true?",
            options: [
              "7(a) and 504 are usually lender underwritten with SBA as guarantor",
              "7(a) is always direct lending by SBA",
              "EIDL is never serviced by SBA",
              "Microloans are issued directly by SBA headquarters",
            ],
            correctIndex: 0,
            explanation: "Most 7(a)/504 lending is lender underwritten, with SBA providing the guaranty structure.",
          },
        ],
      },
      {
        id: "eligibility",
        title: "Eligibility",
        kicker: "Get the basics right, reduce delays",
        icon: <CheckCircle size={20} />,
        content: (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{
              padding: 32,
              borderRadius: 16,
              background: "var(--bg-card)",
              backdropFilter: "var(--glass-blur)",
              border: "1px solid var(--border-primary)",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <CheckCircle size={20} style={{ color: "var(--accent-green)" }} />
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 400, color: "var(--text-primary)" }}>
                  Eligibility Requirements
                </h3>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  {
                    title: "For-profit business operating in the U.S.",
                    desc: "Business must be legally registered and operating for profit in the U.S. or its territories.",
                  },
                  {
                    title: "Meets SBA size standards, varies by industry",
                    desc: "Size standards differ by NAICS category. Confirm your classification and the current standard.",
                  },
                  {
                    title: "Owner investment, skin in the game",
                    desc: "Expect lenders to look for borrower commitment, cash injection, assets, time invested, or traction.",
                  },
                  {
                    title: "Credit, cash flow, and repayment capacity",
                    desc: "Lenders evaluate ability to repay. Expect review of DSCR, margins, trends, and stability.",
                  },
                  {
                    title: "Personal guarantee for 20%+ owners",
                    desc: "Common SBA structure includes guarantees for owners at/above the threshold. Terms vary by program and lender.",
                  },
                ].map((item, idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                    <CheckCircle size={20} style={{ color: "var(--accent-green)", marginTop: 2, flexShrink: 0 }} />
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 14, color: "var(--text-primary)", marginBottom: 4 }}>{item.title}</div>
                      <div style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6 }}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{
              padding: 20,
              borderRadius: 16,
              background: "var(--bg-tertiary)",
              border: "1px solid var(--border-primary)",
            }}>
              <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7 }}>
                Pro move, document consistency wins. Names, addresses, entity type, ownership, and tax IDs should match across returns, insurance, banking, and SBA forms.
              </p>
            </div>
          </div>
        ),
        quiz: [
          {
            question: "What commonly causes SBA delays?",
            options: [
              "Consistent documents across the package",
              "Mismatched entity names, addresses, or ownership across documents",
              "Submitting required forms early",
              "Providing clear financial statements",
            ],
            correctIndex: 1,
            explanation: "Inconsistency triggers follow-ups and delays, even when everything else looks strong.",
          },
        ],
      },
      {
        id: "process",
        title: "Application Process",
        kicker: "Think like underwriting, not like hope",
        icon: <ClipboardCheck size={20} />,
        content: (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{
              padding: 32,
              borderRadius: 16,
              background: "var(--bg-card)",
              backdropFilter: "var(--glass-blur)",
              border: "1px solid var(--border-primary)",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <FileText size={20} style={{ color: "var(--accent-gold)" }} />
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 400, color: "var(--text-primary)" }}>
                  The SBA Application Process
                </h3>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  {
                    title: "Prepare business docs, financials, tax records",
                    description: "Organize returns, P&L, balance sheet, projections, and a clean narrative. Accuracy beats volume.",
                  },
                  {
                    title: "Find the right SBA lender",
                    description: "Use SBA Lender Match or local banks. Confirm they regularly close SBA loans, experience reduces friction.",
                  },
                  {
                    title: "Submit a complete package",
                    description: "Missing items trigger loops. Treat the first submission like the only submission.",
                  },
                  {
                    title: "Underwriting and SBA review",
                    description: "Lender underwrites, SBA reviews depending on process. Expect clarifying questions, respond fast and clean.",
                  },
                  {
                    title: "Closing and funding",
                    description: "Finalize collateral, insurance, filings, execute closing docs, then funding occurs per lender process.",
                  },
                ].map((step, index) => (
                  <div key={index} style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                    <div style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      background: "var(--accent-green)",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      fontSize: 14,
                      flexShrink: 0,
                    }}>
                      {index + 1}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 14, color: "var(--text-primary)", marginBottom: 4 }}>{step.title}</div>
                      <div style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6 }}>{step.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{
              padding: 24,
              borderRadius: 16,
              background: "var(--bg-card)",
              backdropFilter: "var(--glass-blur)",
              border: "1px solid var(--border-primary)",
            }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <div style={{ marginTop: 2, color: "var(--accent-gold)" }}>
                  <Lightbulb size={20} />
                </div>
                <div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 400, color: "var(--text-primary)", marginBottom: 8 }}>
                    Sabbi Says
                  </div>
                  <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7 }}>
                    Underwriting is a risk story. Make yours simple, consistent, and easy to verify. That is how you win time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ),
        quiz: [
          {
            question: "What is the best mindset for the first submission?",
            options: [
              "Send what you have now, fill gaps later",
              "Submit a complete, consistent package the first time",
              "Assume the lender will fix missing items",
              "Only submit documents if asked",
            ],
            correctIndex: 1,
            explanation: "Completeness upfront reduces follow-ups, delays, and rework.",
          },
        ],
      },
      {
        id: "sba-vs-treasury",
        title: "SBA vs Treasury",
        kicker: "Know who is holding the file",
        icon: <Landmark size={20} />,
        content: (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{
              padding: 32,
              borderRadius: 16,
              background: "var(--bg-card)",
              backdropFilter: "var(--glass-blur)",
              border: "1px solid var(--border-primary)",
            }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap", marginBottom: 20 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <Landmark size={20} style={{ color: "var(--accent-blue)" }} />
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 400, color: "var(--text-primary)" }}>
                    Who does what
                  </h3>
                </div>

                <div style={{
                  display: "inline-flex",
                  borderRadius: 999,
                  border: "1px solid var(--border-primary)",
                  overflow: "hidden",
                }}>
                  <button
                    type="button"
                    onClick={() => setRoleToggle("SBA")}
                    style={{
                      padding: "8px 16px",
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      background: roleToggle === "SBA" ? "var(--accent-green)" : "transparent",
                      color: roleToggle === "SBA" ? "#fff" : "var(--text-secondary)",
                      border: "none",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                  >
                    SBA
                  </button>
                  <button
                    type="button"
                    onClick={() => setRoleToggle("TREASURY")}
                    style={{
                      padding: "8px 16px",
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      background: roleToggle === "TREASURY" ? "var(--accent-green)" : "transparent",
                      color: roleToggle === "TREASURY" ? "#fff" : "var(--text-secondary)",
                      border: "none",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                  >
                    TREASURY
                  </button>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 16 }}>
                {roleToggle === "SBA" ? (
                  <>
                    <div style={{
                      padding: 20,
                      borderRadius: 12,
                      background: "var(--bg-tertiary)",
                      border: "1px solid var(--border-primary)",
                    }}>
                      <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 12 }}>
                        <ShieldCheck size={18} style={{ color: "var(--accent-green)", marginTop: 2 }} />
                        <div style={{ fontWeight: 600, fontSize: 14, color: "var(--text-primary)" }}>SBA, servicing and policy lane</div>
                      </div>
                      <ul style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6 }}>
                        <li style={{ display: "flex", gap: 8 }}>
                          <span style={{ marginTop: 6, height: 4, width: 4, borderRadius: "50%", background: "var(--accent-gold)", flexShrink: 0 }} />
                          <span>Handles servicing actions based on policy and documentation</span>
                        </li>
                        <li style={{ display: "flex", gap: 8 }}>
                          <span style={{ marginTop: 6, height: 4, width: 4, borderRadius: "50%", background: "var(--accent-gold)", flexShrink: 0 }} />
                          <span>Requests complete packets, incomplete submissions cause delays</span>
                        </li>
                        <li style={{ display: "flex", gap: 8 }}>
                          <span style={{ marginTop: 6, height: 4, width: 4, borderRadius: "50%", background: "var(--accent-gold)", flexShrink: 0 }} />
                          <span>Often primary lane for Disaster program servicing, including EIDL</span>
                        </li>
                        <li style={{ display: "flex", gap: 8 }}>
                          <span style={{ marginTop: 6, height: 4, width: 4, borderRadius: "50%", background: "var(--accent-gold)", flexShrink: 0 }} />
                          <span>Controls many approvals, denials, and conditions for servicing actions</span>
                        </li>
                      </ul>
                    </div>
                    <div style={{
                      padding: 20,
                      borderRadius: 12,
                      background: "var(--bg-tertiary)",
                      border: "1px solid var(--border-primary)",
                    }}>
                      <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 12 }}>
                        <ClipboardCheck size={18} style={{ color: "var(--accent-gold)", marginTop: 2 }} />
                        <div style={{ fontWeight: 600, fontSize: 14, color: "var(--text-primary)" }}>Your best play with SBA</div>
                      </div>
                      <ul style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6 }}>
                        <li style={{ display: "flex", gap: 8 }}>
                          <span style={{ marginTop: 6, height: 4, width: 4, borderRadius: "50%", background: "var(--accent-gold)", flexShrink: 0 }} />
                          <span>Send a clean, consistent packet first time</span>
                        </li>
                        <li style={{ display: "flex", gap: 8 }}>
                          <span style={{ marginTop: 6, height: 4, width: 4, borderRadius: "50%", background: "var(--accent-gold)", flexShrink: 0 }} />
                          <span>Use a cover letter and clearly labeled attachments</span>
                        </li>
                        <li style={{ display: "flex", gap: 8 }}>
                          <span style={{ marginTop: 6, height: 4, width: 4, borderRadius: "50%", background: "var(--accent-gold)", flexShrink: 0 }} />
                          <span>Match entity name, address, ownership across documents</span>
                        </li>
                        <li style={{ display: "flex", gap: 8 }}>
                          <span style={{ marginTop: 6, height: 4, width: 4, borderRadius: "50%", background: "var(--accent-gold)", flexShrink: 0 }} />
                          <span>Track submissions, dates, versions, confirmations</span>
                        </li>
                      </ul>
                    </div>
                  </>
                ) : (
                  <>
                    <div style={{
                      padding: 20,
                      borderRadius: 12,
                      background: "var(--bg-tertiary)",
                      border: "1px solid var(--border-primary)",
                    }}>
                      <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 12 }}>
                        <Landmark size={18} style={{ color: "var(--accent-blue)", marginTop: 2 }} />
                        <div style={{ fontWeight: 600, fontSize: 14, color: "var(--text-primary)" }}>Treasury, collections enforcement lane</div>
                      </div>
                      <ul style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6 }}>
                        <li style={{ display: "flex", gap: 8 }}>
                          <span style={{ marginTop: 6, height: 4, width: 4, borderRadius: "50%", background: "var(--accent-gold)", flexShrink: 0 }} />
                          <span>Treasury involvement typically means a collections process is active</span>
                        </li>
                        <li style={{ display: "flex", gap: 8 }}>
                          <span style={{ marginTop: 6, height: 4, width: 4, borderRadius: "50%", background: "var(--accent-gold)", flexShrink: 0 }} />
                          <span>Options and routing can change once the file is with Treasury</span>
                        </li>
                        <li style={{ display: "flex", gap: 8 }}>
                          <span style={{ marginTop: 6, height: 4, width: 4, borderRadius: "50%", background: "var(--accent-gold)", flexShrink: 0 }} />
                          <span>Expect formal notices and stricter channels</span>
                        </li>
                        <li style={{ display: "flex", gap: 8 }}>
                          <span style={{ marginTop: 6, height: 4, width: 4, borderRadius: "50%", background: "var(--accent-gold)", flexShrink: 0 }} />
                          <span>Document everything, keep proof</span>
                        </li>
                      </ul>
                    </div>
                    <div style={{
                      padding: 20,
                      borderRadius: 12,
                      background: "var(--bg-tertiary)",
                      border: "1px solid var(--border-primary)",
                    }}>
                      <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 12 }}>
                        <Scale size={18} style={{ color: "var(--accent-gold)", marginTop: 2 }} />
                        <div style={{ fontWeight: 600, fontSize: 14, color: "var(--text-primary)" }}>Your best play with Treasury</div>
                      </div>
                      <ul style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6 }}>
                        <li style={{ display: "flex", gap: 8 }}>
                          <span style={{ marginTop: 6, height: 4, width: 4, borderRadius: "50%", background: "var(--accent-gold)", flexShrink: 0 }} />
                          <span>Respond on time and keep copies of everything</span>
                        </li>
                        <li style={{ display: "flex", gap: 8 }}>
                          <span style={{ marginTop: 6, height: 4, width: 4, borderRadius: "50%", background: "var(--accent-gold)", flexShrink: 0 }} />
                          <span>Confirm file status before assuming servicing options</span>
                        </li>
                        <li style={{ display: "flex", gap: 8 }}>
                          <span style={{ marginTop: 6, height: 4, width: 4, borderRadius: "50%", background: "var(--accent-gold)", flexShrink: 0 }} />
                          <span>Be factual, concise, attach support</span>
                        </li>
                        <li style={{ display: "flex", gap: 8 }}>
                          <span style={{ marginTop: 6, height: 4, width: 4, borderRadius: "50%", background: "var(--accent-gold)", flexShrink: 0 }} />
                          <span>Consider professional advice if the stakes are high</span>
                        </li>
                      </ul>
                    </div>
                  </>
                )}
              </div>

              <div style={{
                marginTop: 20,
                padding: 20,
                borderRadius: 12,
                background: "var(--bg-tertiary)",
                border: "1px solid var(--border-primary)",
              }}>
                <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7 }}>
                  Reality check, the same request can look very different depending on who holds the file. Confirm status first, then submit the right packet to the right place.
                </p>
              </div>
            </div>
          </div>
        ),
        quiz: [
          {
            question: "Why does it matter whether SBA or Treasury holds the file?",
            options: [
              "It does not matter, same process either way",
              "Routing and options can differ based on who is managing the account",
              "Treasury only handles new loan approvals",
              "SBA never handles servicing actions",
            ],
            correctIndex: 1,
            explanation: "File status can change what is possible and where communications go.",
          },
        ],
      },
      {
        id: "eidl-reality",
        title: "EIDL Reality Layer",
        kicker: "Long duration, real obligations",
        icon: <ShieldCheck size={20} />,
        content: (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{
              padding: 32,
              borderRadius: 16,
              background: "var(--bg-card)",
              backdropFilter: "var(--glass-blur)",
              border: "1px solid var(--border-primary)",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <ShieldCheck size={20} style={{ color: "var(--accent-green)" }} />
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 400, color: "var(--text-primary)" }}>
                  EIDL, what most people underestimate
                </h3>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 16 }}>
                <div style={{
                  padding: 20,
                  borderRadius: 12,
                  background: "var(--bg-tertiary)",
                  border: "1px solid var(--border-primary)",
                }}>
                  <div style={{ fontWeight: 600, fontSize: 14, color: "var(--text-primary)", marginBottom: 8 }}>30-year mindset</div>
                  <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7 }}>
                    COVID EIDL can run for decades. Treat compliance and record keeping like a long-term system, not a one-time event.
                  </p>
                </div>
                <div style={{
                  padding: 20,
                  borderRadius: 12,
                  background: "var(--bg-tertiary)",
                  border: "1px solid var(--border-primary)",
                }}>
                  <div style={{ fontWeight: 600, fontSize: 14, color: "var(--text-primary)", marginBottom: 8 }}>Collateral and liens</div>
                  <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7 }}>
                    EIDL commonly involves security interests. Selling, moving, or refinancing collateral can trigger servicing requirements.
                  </p>
                </div>
                <div style={{
                  padding: 20,
                  borderRadius: 12,
                  background: "var(--bg-tertiary)",
                  border: "1px solid var(--border-primary)",
                }}>
                  <div style={{ fontWeight: 600, fontSize: 14, color: "var(--text-primary)", marginBottom: 8 }}>Servicing actions are document driven</div>
                  <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7 }}>
                    Approvals depend on complete packets. Better documentation and a cleaner story usually means fewer follow-ups.
                  </p>
                </div>
                <div style={{
                  padding: 20,
                  borderRadius: 12,
                  background: "var(--bg-tertiary)",
                  border: "1px solid var(--border-primary)",
                }}>
                  <div style={{ fontWeight: 600, fontSize: 14, color: "var(--text-primary)", marginBottom: 8 }}>Ownership and guarantees matter</div>
                  <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7 }}>
                    Changes in ownership, entity type, or control can require approval and change the risk posture.
                  </p>
                </div>
              </div>

              <div style={{
                marginTop: 20,
                padding: 24,
                borderRadius: 12,
                background: "var(--bg-tertiary)",
                border: "1px solid var(--border-primary)",
              }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <div style={{ marginTop: 2, color: "var(--accent-gold)" }}>
                    <Lightbulb size={20} />
                  </div>
                  <div>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 400, color: "var(--text-primary)", marginBottom: 8 }}>
                      Sabbi Says
                    </div>
                    <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7 }}>
                      If your business changes, your loan story must change with it. Write down what changed, why, and how the SBA is protected, then document it.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ),
        quiz: [
          {
            question: "What is the best way to approach EIDL servicing actions?",
            options: [
              "Submit a quick email, details can come later",
              "Treat requests as document-driven, complete packets reduce follow-ups",
              "Assume collateral rules do not apply",
              "Avoid any written narrative",
            ],
            correctIndex: 1,
            explanation: "Servicing actions are evaluated based on documentation and risk story.",
          },
        ],
      },
      {
        id: "servicing-actions",
        title: "Servicing Actions",
        kicker: "Pick the action, build the packet",
        icon: <Target size={20} />,
        content: (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{
              padding: 32,
              borderRadius: 16,
              background: "var(--bg-card)",
              backdropFilter: "var(--glass-blur)",
              border: "1px solid var(--border-primary)",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <Target size={20} style={{ color: "var(--accent-gold)" }} />
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 400, color: "var(--text-primary)" }}>
                  Common Servicing Actions
                </h3>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 16 }}>
                {[
                  { title: "Subordination", desc: "Letting another lender take 1st position" },
                  { title: "Collateral Release", desc: "Selling or moving secured assets" },
                  { title: "Change in Ownership", desc: "Transfers over 20% often require approval" },
                  { title: "Relocation", desc: "Moving business location can affect terms" },
                  {
                    title: "Release of Guarantor",
                    desc: "Limited circumstances apply, strong performance required, alternative support may be needed",
                  },
                  {
                    title: "Workout, modification options",
                    desc: "Options vary by program and file status. Verify current availability before relying on older guidance.",
                  },
                ].map((action, i) => (
                  <div
                    key={i}
                    style={{
                      padding: 20,
                      borderRadius: 12,
                      background: "var(--bg-secondary)",
                      backdropFilter: "var(--glass-blur)",
                      border: "1px solid var(--border-primary)",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <h4 style={{ fontWeight: 600, fontSize: 14, color: "var(--text-primary)", marginBottom: 8 }}>{action.title}</h4>
                    <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7 }}>{action.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div style={{
              padding: 32,
              borderRadius: 16,
              background: "var(--bg-card)",
              backdropFilter: "var(--glass-blur)",
              border: "1px solid var(--border-primary)",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <Target size={20} style={{ color: "var(--accent-gold)" }} />
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 400, color: "var(--text-primary)" }}>
                  Servicing Decision Helper
                </h3>
              </div>

              <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 16, lineHeight: 1.7 }}>
                Choose what you are trying to do, then jump to the right toolkit path.
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12 }}>
                {[
                  {
                    to: "/toolkits/subordination",
                    title: "I need a Subordination",
                    desc: "Refinance, new lender, lien priority changes",
                  },
                  {
                    to: "/toolkits/collateral-release",
                    title: "I need a Collateral Release",
                    desc: "Sell assets, remove lien, restructure collateral",
                  },
                  {
                    to: "/toolkits/change-in-ownership",
                    title: "I am changing ownership",
                    desc: "Buyout, equity transfer, business sale, control shift",
                  },
                  {
                    to: "/toolkits/relocation",
                    title: "I am relocating the business",
                    desc: "New address, operational changes, compliance updates",
                  },
                ].map((decision, i) => (
                  <Link
                    key={i}
                    to={decision.to}
                    style={{
                      padding: 16,
                      borderRadius: 12,
                      background: "var(--bg-tertiary)",
                      border: "1px solid var(--border-primary)",
                      textDecoration: "none",
                      transition: "all 0.3s ease",
                      display: "block",
                    }}
                  >
                    <div style={{ fontWeight: 600, fontSize: 14, color: "var(--text-primary)", marginBottom: 6 }}>{decision.title}</div>
                    <div style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>{decision.desc}</div>
                  </Link>
                ))}
              </div>

              <div style={{
                marginTop: 20,
                padding: 20,
                borderRadius: 12,
                background: "var(--bg-tertiary)",
                border: "1px solid var(--border-primary)",
              }}>
                <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7 }}>
                  Practical insight, complete packets win. Label files clearly, use a cover letter, keep names and addresses consistent, attach supporting proof.
                </p>
              </div>
            </div>
          </div>
        ),
        quiz: [
          {
            question: "What usually improves servicing request outcomes?",
            options: [
              "Submitting minimal information to avoid scrutiny",
              "Complete, well-labeled packets with consistent documentation",
              "Using multiple versions of the same document",
              "Avoiding any supporting proof",
            ],
            correctIndex: 1,
            explanation: "Complete and consistent packets reduce follow-ups and speed decisions.",
          },
        ],
      },
      {
        id: "why-matters",
        title: "Why This Guide Matters",
        kicker: "Clarity, fewer mistakes, better outcomes",
        icon: <Users size={20} />,
        content: (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{
              padding: 32,
              borderRadius: 16,
              background: "var(--bg-card)",
              backdropFilter: "var(--glass-blur)",
              border: "1px solid var(--border-primary)",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <Users size={20} style={{ color: "var(--accent-green)" }} />
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 400, color: "var(--text-primary)" }}>
                  Why this guide matters
                </h3>
              </div>

              <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 20, lineHeight: 1.7 }}>
                Navigating SBA programs should not require a law degree. This guide distills practical lessons to help you move faster, submit cleaner, and avoid common traps.
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 16 }}>
                {[
                  { icon: <Users size={18} />, text: "Understand which SBA program fits your needs" },
                  { icon: <Target size={18} />, text: "Avoid mistakes that cause delays and rework" },
                  { icon: <CheckCircle size={18} />, text: "Know what to expect at each stage of the process" },
                  { icon: <BookOpen size={18} />, text: "Find next-step resources when you need more help" },
                ].map((benefit, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 12,
                      padding: 16,
                      borderRadius: 12,
                      background: "var(--bg-tertiary)",
                      border: "1px solid var(--border-primary)",
                    }}
                  >
                    <div style={{ marginTop: 2, color: "var(--accent-green)" }}>{benefit.icon}</div>
                    <div style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6 }}>{benefit.text}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{
              padding: 32,
              borderRadius: 16,
              background: isDark
                ? "linear-gradient(135deg, rgba(50,62,38,0.7) 0%, rgba(35,44,28,0.8) 100%)"
                : "linear-gradient(135deg, #3d5a2a 0%, #2d4420 100%)",
              border: "1px solid var(--border-primary)",
              textAlign: "center",
            }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                <Lightbulb size={24} style={{ color: "var(--accent-gold)", marginRight: 12 }} />
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 400, color: "#e8ede2" }}>
                  Sabbi's Pro Tip
                </h3>
              </div>
              <p style={{ fontSize: 15, color: "rgba(232,237,226,0.8)", lineHeight: 1.75 }}>
                Save the PDF, then use this page like a checklist. Preparation beats panic, every time.
              </p>
            </div>
          </div>
        ),
        quiz: [
          {
            question: "What is a key benefit of this guide?",
            options: [
              "It guarantees loan approval",
              "It helps you understand programs and avoid avoidable mistakes",
              "It replaces official SBA guidance",
              "It eliminates documentation requirements",
            ],
            correctIndex: 1,
            explanation: "It improves clarity and submission quality, it does not guarantee outcomes.",
          },
        ],
      },
      {
        id: "next-steps",
        title: "Next Steps",
        kicker: "Download, explore, keep moving",
        icon: <ChevronRight size={20} />,
        content: (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{
              padding: 32,
              borderRadius: 16,
              background: "var(--bg-card)",
              backdropFilter: "var(--glass-blur)",
              border: "1px solid var(--border-primary)",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <Download size={20} style={{ color: "var(--accent-gold)" }} />
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 400, color: "var(--text-primary)" }}>
                  Full PDF Reference
                </h3>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-start" }}>
                <a
                  href={QUICK_START_GUIDE_PDF_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "12px 24px",
                    background: "linear-gradient(135deg, rgba(200,168,78,0.3), rgba(200,168,78,0.15))",
                    border: "1px solid rgba(200,168,78,0.25)",
                    borderRadius: 12,
                    color: "var(--accent-gold)",
                    fontSize: 14,
                    fontWeight: 600,
                    fontFamily: "var(--font-body)",
                    textDecoration: "none",
                    transition: "all 0.3s ease",
                    boxShadow: "0 2px 12px rgba(200,168,78,0.1)",
                  }}
                >
                  <Download size={18} />
                  View Quick Start PDF in New Tab
                </a>

                <span style={{ fontSize: 12, color: "var(--text-muted)", fontStyle: "italic" }}>
                  No login, no email, just clarity.
                </span>
              </div>
            </div>

            <div style={{
              padding: 32,
              borderRadius: 16,
              background: isDark
                ? "linear-gradient(135deg, rgba(50,62,38,0.7) 0%, rgba(35,44,28,0.8) 100%)"
                : "linear-gradient(135deg, #3d5a2a 0%, #2d4420 100%)",
              border: "1px solid var(--border-primary)",
              textAlign: "center",
            }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 400, color: "#e8ede2", marginBottom: 12 }}>
                Ready to dive deeper?
              </h3>
              <p style={{ fontSize: 14, color: "rgba(232,237,226,0.7)", marginBottom: 24, lineHeight: 1.75 }}>
                Explore SmallBiz Recon™ toolkits for step-by-step guidance through specific SBA and COVID EIDL servicing actions.
              </p>
              <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
                <Link
                  to="/covid-eidl-toolkits"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "12px 24px",
                    background: "linear-gradient(135deg, rgba(200,168,78,0.3), rgba(200,168,78,0.15))",
                    border: "1px solid rgba(200,168,78,0.25)",
                    borderRadius: 12,
                    color: "var(--accent-gold)",
                    fontSize: 14,
                    fontWeight: 600,
                    textDecoration: "none",
                    transition: "all 0.3s ease",
                  }}
                >
                  <BookOpen size={18} />
                  Explore Toolkits
                </Link>
                <Link
                  to="/sba/sba-contacts"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "12px 24px",
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: 12,
                    color: "#c8e0b4",
                    fontSize: 14,
                    fontWeight: 600,
                    textDecoration: "none",
                    transition: "all 0.3s ease",
                  }}
                >
                  <Users size={18} />
                  SBA Contacts
                </Link>
              </div>
            </div>
          </div>
        ),
      },
    ],
    [loanPrograms, roleToggle, handleCardClick, isDark]
  );

  const activeIndex = useMemo(
    () => Math.max(0, sections.findIndex((s) => s.id === activeSectionId)),
    [sections, activeSectionId]
  );

  const activeSection = sections[activeIndex] || sections[0];

  const completionCount = useMemo(() => sections.filter((s) => completed[s.id]).length, [sections, completed]);

  const completionPct = useMemo(() => {
    if (!sections.length) return 0;
    return Math.round((completionCount / sections.length) * 100);
  }, [completionCount, sections.length]);

  const goPrev = useCallback(() => {
    const prev = Math.max(0, activeIndex - 1);
    setActiveSectionId(sections[prev].id);
    setTimeout(scrollToTop, 100);
  }, [activeIndex, sections]);

  const goNext = useCallback(() => {
    const next = Math.min(sections.length - 1, activeIndex + 1);
    setActiveSectionId(sections[next].id);
    setTimeout(scrollToTop, 100);
  }, [activeIndex, sections]);

  const handleQuizAnswer = useCallback((sectionId: string, qIdx: number, optionIdx: number) => {
    setQuizState((prev) => {
      const current = prev[sectionId] || { answers: {}, submitted: false };
      return {
        ...prev,
        [sectionId]: { ...current, answers: { ...current.answers, [qIdx]: optionIdx } },
      };
    });
  }, []);

  const submitQuiz = useCallback(
    (sectionId: string, quiz?: QuizQuestion[]) => {
      if (!quiz || quiz.length === 0) {
        markComplete(sectionId);
        return;
      }

      setQuizState((prev) => {
        const current = prev[sectionId] || { answers: {}, submitted: false };
        const answers = current.answers || {};
        const allAnswered = quiz.every((_, idx) => answers[idx] !== undefined);
        if (!allAnswered) return prev;

        const allCorrect = quiz.every((q, idx) => answers[idx] === q.correctIndex);
        if (allCorrect) markComplete(sectionId);

        return { ...prev, [sectionId]: { ...current, submitted: true } };
      });
    },
    [markComplete]
  );

  const quizForActive = activeSection.quiz;
  const quizMeta = quizState[activeSection.id] || { answers: {}, submitted: false };

  const quizAllAnswered =
    !!quizForActive?.length && quizForActive.every((_, idx) => quizMeta.answers[idx] !== undefined);

  const quizAllCorrect =
    !!quizForActive?.length && quizForActive.every((q, idx) => quizMeta.answers[idx] === q.correctIndex);

  const handleDownloadPDF = useCallback(() => {
    window.open(QUICK_START_GUIDE_PDF_URL, "_blank", "noopener,noreferrer");
  }, []);

  const handleSectionChange = useCallback((sectionId: string) => {
    setActiveSectionId(sectionId);
    setMobileMenuOpen(false);
    setTimeout(scrollToTop, 100);
  }, []);

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
        @keyframes cardReveal {
          from { opacity:0; transform:translateY(30px) scale(0.97); }
          to { opacity:1; transform:translateY(0) scale(1); }
        }
        @keyframes heroGlow {
          0%,100% { opacity:0.4; }
          50% { opacity:0.7; }
        }

        * { box-sizing:border-box; margin:0; padding:0; }

        .sba-guide-page {
          min-height:100vh;
          font-family: var(--font-body);
          background: var(--bg-primary);
          color: var(--text-primary);
          overflow-x: hidden;
          position: relative;
          transition: background 0.5s ease, color 0.4s ease;
        }
        .sba-guide-page::before {
          content:'';
          position:fixed; inset:0;
          background:
            radial-gradient(ellipse 70% 50% at 30% 0%, var(--overlay-green), transparent);
          pointer-events:none; z-index:0;
          transition: background 0.5s ease;
        }

        @media (max-width: 1024px) {
          .desktop-sidebar { display: none !important; }
          .mobile-menu-button { display: flex !important; }
          .content-grid { grid-template-columns: 1fr !important; }
        }

        @media (min-width: 1025px) {
          .mobile-menu-button { display: none !important; }
          .mobile-menu-overlay { display: none !important; }
        }

        @media (max-width: 768px) {
          .hero-title { font-size: 32px !important; }
          .hero-inner { padding: 40px 20px 56px !important; }
          .content-padding { padding: 32px 20px !important; }
        }
      `}</style>

      <div className="sba-guide-page">
        <GridOverlay />
        <Particles />

        <div style={{ position: "relative", zIndex: 1 }}>
          {/* HERO */}
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
              animation: "heroGlow 6s ease-in-out infinite",
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
                flexWrap: "wrap",
                gap: 16,
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
                    padding: "8px 0",
                    fontFamily: "var(--font-body)",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#e8ede2";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#c8e0b4";
                  }}
                >
                  <ArrowLeft size={16} />
                  Back to Last
                </button>
                <div style={{ display: "flex", gap: 12 }}>
                  <button
                    type="button"
                    onClick={resetProgress}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "8px 16px",
                      borderRadius: 12,
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "#c8e0b4",
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: "pointer",
                      fontFamily: "var(--font-body)",
                      transition: "all 0.3s ease",
                    }}
                  >
                    Reset Progress
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
                <BookOpen size={30} color="#c8a84e" strokeWidth={1.5} />
              </div>

              <h1 className="hero-title" style={{
                fontFamily: "var(--font-display)",
                fontSize: 50,
                fontWeight: 400,
                textAlign: "center",
                color: "#e8ede2",
                lineHeight: 1.12,
                letterSpacing: "-0.02em",
                marginBottom: 20,
              }}>
                SmallBiz Recon™{" "}
                <span style={{ fontStyle: "italic", color: "#c8a84e" }}>101 Premium Edition</span>
              </h1>

              <p style={{
                textAlign: "center",
                fontSize: 16,
                color: "rgba(232,237,226,0.7)",
                lineHeight: 1.75,
                maxWidth: 680,
                margin: "0 auto 32px",
              }}>
                A straight-to-the-point, high-clarity walkthrough of SBA loans, programs, and servicing steps, with heavier COVID EIDL focus, built by former SBA insiders.
              </p>

              <div style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 16,
                justifyContent: "center",
                alignItems: "center",
              }}>
                <button
                  type="button"
                  onClick={handleDownloadPDF}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "14px 32px",
                    background: "linear-gradient(135deg, rgba(200,168,78,0.3), rgba(200,168,78,0.15))",
                    border: "1px solid rgba(200,168,78,0.25)",
                    borderRadius: 12,
                    color: "#c8a84e",
                    fontSize: 15,
                    fontWeight: 600,
                    fontFamily: "var(--font-body)",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    boxShadow: "0 2px 12px rgba(200,168,78,0.1)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 8px 28px rgba(200,168,78,0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 2px 12px rgba(200,168,78,0.1)";
                  }}
                >
                  <Download size={18} />
                  Download PDF Guide
                </button>

                <Link
                  to="/covid-eidl-toolkits"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "14px 32px",
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: 12,
                    color: "#c8e0b4",
                    fontSize: 15,
                    fontWeight: 600,
                    fontFamily: "var(--font-body)",
                    textDecoration: "none",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.12)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                  }}
                >
                  <BookOpen size={18} />
                  Explore Toolkits
                </Link>
              </div>

              <p style={{
                textAlign: "center",
                fontSize: 13,
                color: "rgba(232,237,226,0.45)",
                marginTop: 20,
                fontStyle: "italic",
              }}>
                Interactive guide. Progress saved automatically.
              </p>

              {/* Progress */}
              <div style={{ marginTop: 40, maxWidth: 600, margin: "40px auto 0" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 11, color: "rgba(232,237,226,0.5)", marginBottom: 8, fontWeight: 700, letterSpacing: "0.1em" }}>
                  <span>MISSION PROGRESS</span>
                  <span>{completionPct}%</span>
                </div>
                <div style={{ height: 8, borderRadius: 999, background: "rgba(255,255,255,0.1)", overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)" }}>
                  <div style={{ height: "100%", background: "var(--accent-gold)", width: `${completionPct}%`, transition: "width 0.5s ease" }} />
                </div>
                <div style={{ marginTop: 8, textAlign: "center", fontSize: 12, color: "rgba(232,237,226,0.4)" }}>
                  Completed {completionCount} of {sections.length} sections
                </div>
              </div>
            </div>
          </div>

          {/* CONTENT */}
          <div className="content-padding" style={{ maxWidth: 1400, margin: "0 auto", padding: "56px 24px 80px" }}>
            {/* Mobile Menu Button */}
            <button
              type="button"
              className="mobile-menu-button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                display: "none",
                alignItems: "center",
                gap: 8,
                padding: "12px 20px",
                marginBottom: 24,
                borderRadius: 12,
                background: "var(--bg-card)",
                backdropFilter: "var(--glass-blur)",
                border: "1px solid var(--border-primary)",
                color: "var(--text-primary)",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <span>Current: {activeSection.title}</span>
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
              <div
                className="mobile-menu-overlay"
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: "rgba(0,0,0,0.5)",
                  zIndex: 999,
                  display: "none",
                }}
                onClick={() => setMobileMenuOpen(false)}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "90%",
                    maxWidth: 400,
                    maxHeight: "80vh",
                    overflowY: "auto",
                    padding: 20,
                    borderRadius: 20,
                    background: "var(--bg-card)",
                    backdropFilter: "var(--glass-blur)",
                    border: "1px solid var(--border-primary)",
                    boxShadow: "var(--shadow-card)",
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {sections.map((s) => {
                      const isActive = s.id === activeSectionId;
                      const isDone = !!completed[s.id];
                      return (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => handleSectionChange(s.id)}
                          style={{
                            width: "100%",
                            textAlign: "left",
                            borderRadius: 12,
                            padding: "12px 16px",
                            border: `1px solid ${isActive ? "var(--border-hover)" : "var(--border-primary)"}`,
                            background: isActive ? "var(--badge-bg)" : "transparent",
                            cursor: "pointer",
                            transition: "all 0.3s ease",
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                              <div style={{ color: isActive ? "var(--accent-green)" : "var(--text-secondary)" }}>
                                {s.icon}
                              </div>
                              <div>
                                <div style={{ fontWeight: 600, fontSize: 14, color: "var(--text-primary)" }}>{s.title}</div>
                                {s.kicker ? (
                                  <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>
                                    {s.kicker}
                                  </div>
                                ) : null}
                              </div>
                            </div>

                            {isDone ? (
                              <CheckCircle size={16} style={{ color: "var(--accent-green)", flexShrink: 0 }} />
                            ) : (
                              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--text-muted)", opacity: 0.3, flexShrink: 0 }} />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            <div className="content-grid" style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 32 }}>
              {/* Desktop Sidebar */}
              <aside className="desktop-sidebar" style={{ position: "sticky", top: 24, alignSelf: "flex-start" }}>
                <div style={{
                  padding: 20,
                  borderRadius: 16,
                  background: "var(--bg-card)",
                  backdropFilter: "var(--glass-blur)",
                  border: "1px solid var(--border-primary)",
                  boxShadow: "var(--shadow-card)",
                }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 400, color: "var(--text-primary)" }}>
                      Mission Map
                    </div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "var(--text-muted)" }}>{completionPct}%</div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {sections.map((s) => {
                      const isActive = s.id === activeSectionId;
                      const isDone = !!completed[s.id];
                      return (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => handleSectionChange(s.id)}
                          style={{
                            width: "100%",
                            textAlign: "left",
                            borderRadius: 12,
                            padding: "12px 16px",
                            border: `1px solid ${isActive ? "var(--border-hover)" : "var(--border-primary)"}`,
                            background: isActive ? "var(--badge-bg)" : "transparent",
                            cursor: "pointer",
                            transition: "all 0.3s ease",
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                              <div style={{ color: isActive ? "var(--accent-green)" : "var(--text-secondary)" }}>
                                {s.icon}
                              </div>
                              <div>
                                <div style={{ fontWeight: 600, fontSize: 13, color: "var(--text-primary)" }}>{s.title}</div>
                                {s.kicker ? (
                                  <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>
                                    {s.kicker}
                                  </div>
                                ) : null}
                              </div>
                            </div>

                            {isDone ? (
                              <CheckCircle size={16} style={{ color: "var(--accent-green)", flexShrink: 0 }} />
                            ) : (
                              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--text-muted)", opacity: 0.3, flexShrink: 0 }} />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </aside>

              {/* Main Content */}
              <main ref={contentTopRef}>
                <div style={{
                  borderRadius: 20,
                  border: "1px solid var(--border-primary)",
                  background: "var(--bg-card)",
                  backdropFilter: "var(--glass-blur)",
                  boxShadow: "var(--shadow-card)",
                  overflow: "hidden",
                }}>
                  <div style={{
                    padding: 32,
                    borderBottom: "1px solid var(--border-primary)",
                  }}>
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <div style={{ color: "var(--text-secondary)" }}>{activeSection.icon}</div>
                          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 400, color: "var(--text-primary)" }}>
                            {activeSection.title}
                          </h2>
                        </div>
                        {activeSection.kicker ? (
                          <p style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 8 }}>{activeSection.kicker}</p>
                        ) : null}
                      </div>

                      <button
                        type="button"
                        onClick={() => markComplete(activeSection.id)}
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          letterSpacing: "0.1em",
                          padding: "10px 20px",
                          borderRadius: 999,
                          border: "1px solid var(--border-primary)",
                          background: "var(--bg-secondary)",
                          color: "var(--text-primary)",
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                        }}
                      >
                        Mark complete
                      </button>
                    </div>
                  </div>

                  <div style={{ padding: 32 }}>
                    {activeSection.content}

                    {/* Quiz */}
                    {activeSection.quiz && activeSection.quiz.length > 0 ? (
                      <div style={{ marginTop: 48 }}>
                        <div style={{
                          padding: 28,
                          borderRadius: 16,
                          background: "var(--bg-tertiary)",
                          border: "1px solid var(--border-primary)",
                        }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                            <ShieldCheck size={20} style={{ color: "var(--accent-green)" }} />
                            <div style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 400, color: "var(--text-primary)" }}>
                              Quick Check, earn completion
                            </div>
                          </div>

                          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                            {activeSection.quiz.map((q, qIdx) => {
                              const selected = quizMeta.answers[qIdx];
                              const submitted = quizMeta.submitted;
                              const isCorrect = submitted && selected === q.correctIndex;
                              const isWrong = submitted && selected !== undefined && selected !== q.correctIndex;

                              return (
                                <div
                                  key={qIdx}
                                  style={{
                                    padding: 20,
                                    borderRadius: 12,
                                    background: "var(--bg-card)",
                                    border: "1px solid var(--border-primary)",
                                  }}
                                >
                                  <div style={{ fontWeight: 600, fontSize: 14, color: "var(--text-primary)", marginBottom: 12 }}>
                                    {qIdx + 1}. {q.question}
                                  </div>

                                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                    {q.options.map((opt, optIdx) => {
                                      const isSelected = selected === optIdx;
                                      const showCorrect = submitted && optIdx === q.correctIndex;
                                      return (
                                        <button
                                          key={optIdx}
                                          type="button"
                                          onClick={() => handleQuizAnswer(activeSection.id, qIdx, optIdx)}
                                          disabled={submitted}
                                          style={{
                                            textAlign: "left",
                                            borderRadius: 8,
                                            padding: "12px 16px",
                                            border: `1px solid ${
                                              isSelected
                                                ? "var(--border-hover)"
                                                : "var(--border-primary)"
                                            }`,
                                            background: isSelected ? "var(--badge-bg)" : "var(--bg-secondary)",
                                            cursor: submitted ? "default" : "pointer",
                                            transition: "all 0.2s ease",
                                            fontSize: 14,
                                            color: "var(--text-primary)",
                                          }}
                                        >
                                          {opt}
                                        </button>
                                      );
                                    })}
                                  </div>

                                  {submitted ? (
                                    <div style={{ marginTop: 12, fontSize: 13 }}>
                                      <div style={{
                                        fontWeight: 700,
                                        color: isCorrect ? "var(--accent-green)" : "#e63946",
                                        marginBottom: 4,
                                      }}>
                                        {isCorrect ? "Correct" : "Not quite"}
                                      </div>
                                      <div style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}>{q.explanation}</div>
                                    </div>
                                  ) : null}
                                </div>
                              );
                            })}
                          </div>

                          <div style={{ marginTop: 20, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
                            <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
                              Answer all questions, submit, pass to unlock auto completion.
                            </div>

                            <button
                              type="button"
                              onClick={() => submitQuiz(activeSection.id, activeSection.quiz)}
                              disabled={!quizAllAnswered || quizMeta.submitted}
                              style={{
                                padding: "10px 24px",
                                borderRadius: 12,
                                fontWeight: 600,
                                fontSize: 14,
                                background: !quizAllAnswered || quizMeta.submitted
                                  ? "var(--text-muted)"
                                  : "var(--accent-green)",
                                color: "#fff",
                                border: "none",
                                cursor: !quizAllAnswered || quizMeta.submitted ? "not-allowed" : "pointer",
                                opacity: !quizAllAnswered || quizMeta.submitted ? 0.5 : 1,
                                transition: "all 0.3s ease",
                              }}
                            >
                              Submit quiz
                            </button>
                          </div>

                          {quizMeta.submitted ? (
                            <div style={{ marginTop: 16, fontSize: 13 }}>
                              {quizAllCorrect ? (
                                <div style={{ color: "var(--accent-green)", fontWeight: 700 }}>Passed, section completed.</div>
                              ) : (
                                <div style={{ color: "#e63946", fontWeight: 700 }}>
                                  Review and retry, or mark complete manually.
                                </div>
                              )}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    ) : null}

                    {/* Nav */}
                    <div style={{ marginTop: 48, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                      <button
                        type="button"
                        onClick={goPrev}
                        disabled={activeIndex === 0}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 8,
                          padding: "10px 20px",
                          borderRadius: 12,
                          border: "1px solid var(--border-primary)",
                          background: activeIndex === 0 ? "transparent" : "var(--bg-secondary)",
                          color: activeIndex === 0 ? "var(--text-muted)" : "var(--text-primary)",
                          cursor: activeIndex === 0 ? "not-allowed" : "pointer",
                          opacity: activeIndex === 0 ? 0.5 : 1,
                          transition: "all 0.3s ease",
                          fontSize: 14,
                          fontWeight: 600,
                        }}
                      >
                        <ChevronLeft size={16} />
                        Previous
                      </button>

                      <button
                        type="button"
                        onClick={goNext}
                        disabled={activeIndex === sections.length - 1}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 8,
                          padding: "10px 20px",
                          borderRadius: 12,
                          border: "1px solid var(--border-primary)",
                          background: activeIndex === sections.length - 1 ? "transparent" : "var(--bg-secondary)",
                          color: activeIndex === sections.length - 1 ? "var(--text-muted)" : "var(--text-primary)",
                          cursor: activeIndex === sections.length - 1 ? "not-allowed" : "pointer",
                          opacity: activeIndex === sections.length - 1 ? 0.5 : 1,
                          transition: "all 0.3s ease",
                          fontSize: 14,
                          fontWeight: 600,
                        }}
                      >
                        Next
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 16 }}>
                  <div style={{
                    padding: 24,
                    borderRadius: 16,
                    background: "var(--bg-card)",
                    backdropFilter: "var(--glass-blur)",
                    border: "1px solid var(--border-primary)",
                    boxShadow: "var(--shadow-card)",
                  }}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                      <div style={{ marginTop: 2, color: "var(--accent-green)" }}>
                        <ShieldCheck size={18} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
                          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", color: "var(--text-secondary)" }}>
                            BRAND, OWNERSHIP
                          </div>
                          <div style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 6,
                            borderRadius: 999,
                            border: "1px solid var(--border-primary)",
                            background: "var(--badge-bg)",
                            padding: "4px 12px",
                            fontSize: 10,
                            fontWeight: 700,
                            color: "var(--text-secondary)",
                          }}>
                            <span style={{ height: 6, width: 6, borderRadius: "50%", background: "var(--accent-gold)" }} />
                            SMALLBIZ RECON™
                          </div>
                        </div>
                        <div style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.7 }}>
                          SmallBiz Recon™, a Recon11 Global Dynamics, LLC project.
                        </div>
                      </div>
                    </div>
                  </div>

                  <div style={{
                    padding: 24,
                    borderRadius: 16,
                    background: "var(--bg-card)",
                    backdropFilter: "var(--glass-blur)",
                    border: "1px solid var(--border-primary)",
                    boxShadow: "var(--shadow-card)",
                  }}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                      <div style={{ marginTop: 2, color: "var(--accent-gold)" }}>
                        <Scale size={18} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
                          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", color: "var(--text-secondary)" }}>
                            DISCLOSURE, SMALLBIZ RECON™
                          </div>
                          <div style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 8,
                            fontSize: 10,
                            fontWeight: 700,
                            color: "var(--text-muted)",
                          }}>
                            <span style={{ fontSize: 11 }}>For informational purposes only</span>
                            <span style={{ height: 4, width: 4, borderRadius: "50%", background: "var(--text-muted)", opacity: 0.6 }} />
                            <span>© {new Date().getFullYear()}</span>
                          </div>
                        </div>
                        <div style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: 12 }}>
                          For informational purposes only. Not legal, financial, or SBA advice. SmallBiz Recon™ is not affiliated with or endorsed by the U.S. Small Business Administration or any government agency.
                        </div>
                        <div style={{ fontSize: 11, color: "var(--text-muted)" }}>
                          © {new Date().getFullYear()} Recon11 Global Dynamics, LLC.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>

        {selectedLoanProgram && (
          <LoanProgramModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            title={selectedLoanProgram.title}
            description={selectedLoanProgram.details}
          />
        )}
      </div>
    </>
  );
}
