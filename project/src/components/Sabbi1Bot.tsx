import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { X, Send, User, Bot, RotateCcw, Sparkles, Volume2, VolumeX, ChevronDown, Mic, MicOff, Download, Copy, Layers, ArrowRight, CheckCheck } from "lucide-react";
import {
  FAQ_MAP as IMPORTED_FAQ_MAP,
  FAQ_ALIASES as IMPORTED_FAQ_ALIASES,
  FALLBACK_RESPONSES as IMPORTED_FALLBACKS,
  STARTER_QUESTIONS,
  FUZZY_KB,
} from "../data/sabbi101Knowledge";
import { fuzzyMatchWithFallback } from "../utils/chatbotMatching";

// =========================
// Types
// =========================
interface Message {
  id: string;
  text: string;
  sender: "user" | "sabbi";
  timestamp: string;
}

// =========================
// Sound Engine (Web Audio API — no external deps)
// =========================
class SoundEngine {
  private ctx: AudioContext | null = null;
  private _muted = false;

  get muted() {
    return this._muted;
  }
  set muted(v: boolean) {
    this._muted = v;
  }

  private getCtx(): AudioContext {
    if (!this.ctx) this.ctx = new AudioContext();
    if (this.ctx.state === "suspended") this.ctx.resume();
    return this.ctx;
  }

  private tone(freq: number, duration: number, type: OscillatorType = "sine", vol = 0.08) {
    if (this._muted) return;
    try {
      const ctx = this.getCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(vol, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain).connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // silent fail
    }
  }

  open() {
    this.tone(880, 0.12, "sine", 0.06);
    setTimeout(() => this.tone(1100, 0.1, "sine", 0.05), 60);
  }
  close() {
    this.tone(660, 0.1, "sine", 0.05);
  }
  send() {
    this.tone(1200, 0.08, "triangle", 0.05);
  }
  receive() {
    this.tone(740, 0.12, "sine", 0.04);
    setTimeout(() => this.tone(880, 0.1, "sine", 0.04), 80);
  }
  reset() {
    this.tone(440, 0.15, "sawtooth", 0.03);
  }
  click() {
    this.tone(1400, 0.04, "square", 0.02);
  }
}

const sfx = new SoundEngine();

// =========================
// FAQ_MAP + Knowledge Base (powered by sabbi101Knowledge.ts)
// =========================
const FAQ_MAP = IMPORTED_FAQ_MAP;
const FALLBACK_RESPONSES = IMPORTED_FALLBACKS;
const FAQ_ALIASES = IMPORTED_FAQ_ALIASES;

// Convert FUZZY_KB to the format chatbotMatching expects
const FUZZY_MATCH_KB: Record<string, { answer: string; variations?: string[] }> = FUZZY_KB;

// =========================
// Analytics Tracking (localStorage)
// =========================
const ANALYTICS_KEY = "sabbi1_analytics";

function trackQuestion(question: string, matched: boolean, matchKey?: string) {
  try {
    const raw = localStorage.getItem(ANALYTICS_KEY);
    const data: Array<{ q: string; matched: boolean; key?: string; ts: number }> = raw ? JSON.parse(raw) : [];
    data.push({ q: question, matched, key: matchKey, ts: Date.now() });
    // Keep last 500 entries
    if (data.length > 500) data.splice(0, data.length - 500);
    localStorage.setItem(ANALYTICS_KEY, JSON.stringify(data));
  } catch { /* ignore */ }
}

// =========================
// Smart Follow-Up Suggestions
// =========================
const FOLLOW_UP_MAP: Record<string, string[]> = {
  "7a": ["What is SBA Express?", "What are 7(a) interest rates?", "Do 7(a) loans require personal guarantees?"],
  "504": ["What is a CDC?", "What are 504 loan terms?", "What is the maximum 504 loan amount?"],
  "microloan": ["Does the SBA offer grants?", "What is SCORE?", "What is an SBDC?"],
  "disaster": ["What was COVID EIDL?", "What is SOP 50 52?", "What SBA servicing actions are available?"],
  "eidl": ["What is a hardship accommodation?", "What is release of collateral?", "What happens with Treasury referral?"],
  "covid": ["What is a hardship accommodation?", "What is release of collateral?", "What is subordination?"],
  "subordination": ["What is release of collateral?", "What toolkits does SmallBiz Recon offer?", "What is SOP 50 52?"],
  "collateral": ["What is subordination?", "What toolkits does SmallBiz Recon offer?", "What is offer in compromise?"],
  "hardship": ["What is offer in compromise?", "What happens with Treasury referral?", "What toolkits does SmallBiz Recon offer?"],
  "grant": ["What is SBIR?", "What is STTR?", "What is SCORE?"],
  "contract": ["What is the 8(a) program?", "What is HUBZone?", "What is SAM.gov?"],
  "size": ["How many small businesses are in the US?", "What are affiliation rules?", "How many jobs do small businesses create?"],
  "sba": ["What is a 7(a) loan?", "What are SBA disaster loans?", "Does the SBA offer grants?"],
  "default": ["What is a 7(a) loan?", "What are SBA disaster loans?", "What toolkits does SmallBiz Recon offer?"],
};

function getFollowUps(input: string): string[] {
  const lower = input.toLowerCase();
  for (const [keyword, suggestions] of Object.entries(FOLLOW_UP_MAP)) {
    if (keyword !== "default" && lower.includes(keyword)) return suggestions;
  }
  return FOLLOW_UP_MAP["default"];
}

// =========================
// Category Browsing
// =========================
const BROWSE_CATEGORIES = [
  { label: "SBA Overview", icon: "🏛️", questions: ["What is the SBA?", "Who runs the SBA?", "How many SBA offices are there?"] },
  { label: "7(a) Loans", icon: "💰", questions: ["What is a 7(a) loan?", "What is SBA Express?", "What are 7(a) interest rates?"] },
  { label: "504 Loans", icon: "🏗️", questions: ["What is a 504 loan?", "What is a CDC?", "What are 504 loan terms?"] },
  { label: "Disaster/EIDL", icon: "🌪️", questions: ["What are SBA disaster loans?", "What was COVID EIDL?", "What is SOP 50 52?"] },
  { label: "Servicing", icon: "📋", questions: ["What is subordination?", "What is release of collateral?", "What is a hardship accommodation?"] },
  { label: "Grants & Programs", icon: "🎓", questions: ["Does the SBA offer grants?", "What is SCORE?", "What is an SBDC?"] },
  { label: "Contracting", icon: "📑", questions: ["What is the 8(a) program?", "What is HUBZone?", "What is SAM.gov?"] },
  { label: "SmallBiz Recon", icon: "🎯", questions: ["What is SmallBiz Recon?", "Who is Sabbi?", "What toolkits does SmallBiz Recon offer?"] },
];

// =========================
// Toolkit Link Detection
// =========================
const TOOLKIT_LINKS: Record<string, { path: string; label: string }> = {
  "subordination": { path: "/access/subordination", label: "Open Subordination Toolkit" },
  "collateral release": { path: "/access/collateral-release", label: "Open Collateral Release Toolkit" },
  "release of collateral": { path: "/access/collateral-release", label: "Open Collateral Release Toolkit" },
  "payment assistance": { path: "/access/payment-assistance", label: "Open Payment Assistance Toolkit" },
  "hardship": { path: "/access/payment-assistance", label: "Open Payment Assistance Toolkit" },
};

function getToolkitLink(input: string): { path: string; label: string } | null {
  const lower = input.toLowerCase();
  for (const [keyword, link] of Object.entries(TOOLKIT_LINKS)) {
    if (lower.includes(keyword)) return link;
  }
  return null;
}

type BasicsTopic =
  | "sba_overview"
  | "7a_loan"
  | "504_loan"
  | "microloan"
  | "disaster_loans"
  | "eligibility"
  | "credit_terms"
  | "documents"
  | "guarantee"
  | "counseling"
  | "contracting";

const BASICS_KB: Record<BasicsTopic, (input?: string) => string> = {
  sba_overview: () =>
    [
      "Here's the SBA in plain English:",
      "• The SBA is a federal agency that supports small businesses.",
      "• It does this mainly by guaranteeing certain loans (it does not usually lend directly, except some disaster programs), helping businesses learn through counseling and training, and opening access to government contracting.",
      "If you tell me your goal, financing, learning, contracts, or disaster recovery, I'll point you to the right lane.",
    ].join("\n"),
  "7a_loan": () =>
    [
      "SBA 7(a) basics:",
      "• Most flexible SBA-backed loan, commonly used for working capital, refinancing, business acquisition, equipment, and sometimes real estate.",
      "• You apply through a lender, the SBA provides a guaranty to reduce lender risk.",
      "• What matters most, ability to repay, reasonable credit, business cash flow, and a clear use of proceeds.",
    ].join("\n"),
  "504_loan": () =>
    [
      "SBA 504 basics:",
      "• Designed for long-term fixed-asset projects, typically owner-occupied real estate or major equipment.",
      "• Structured with a lender and a Certified Development Company (CDC).",
      "• Usually not for working capital, it's for building long-term capacity.",
    ].join("\n"),
  microloan: () =>
    [
      "SBA Microloan basics:",
      "• Smaller-dollar loans offered through intermediary nonprofit lenders.",
      "• Often paired with business training and support.",
      "• Commonly used for inventory, supplies, equipment, or working capital needs.",
    ].join("\n"),
  disaster_loans: () =>
    [
      "SBA Disaster Loan basics:",
      "• For recovery after declared disasters, can include physical damage and economic injury (EIDL for certain disasters).",
      "• These can be direct SBA loans depending on the program and declaration.",
      "• Documentation and eligibility depend on the disaster type and filing window.",
    ].join("\n"),
  eligibility: () =>
    [
      "SBA eligibility basics (high-level):",
      "• Must meet SBA \u201csmall business\u201d size standards for the program and industry.",
      "• Must operate for profit, usually in the U.S., with acceptable character and compliance.",
      "• Lenders look for repayment ability, cash flow, and reasonable credit history.",
    ].join("\n"),
  credit_terms: () =>
    [
      "Common SBA credit terms in plain English:",
      "• Debt service coverage (DSCR), can the business cash flow cover the payment with a cushion.",
      "• Personal guaranty, owners often must back the loan.",
      "• Collateral, not always required to fully cover the loan, but lenders often take what's available.",
      "• Use of proceeds, exactly what the funds will be used for, and whether it's allowed.",
    ].join("\n"),
  documents: () =>
    [
      "Typical SBA lender documentation basics:",
      "• Business financials, P&L, balance sheet, cash flow, debt schedule.",
      "• Business tax returns (often 2 to 3 years), personal returns for owners.",
      "• Bank statements, formation docs, ownership breakdown, resumes.",
      "• A simple narrative, what the business is, what you need, how you repay.",
    ].join("\n"),
  guarantee: () =>
    [
      "What an SBA loan guaranty means:",
      "• The SBA agrees to cover a portion of the lender's loss if the borrower defaults, up to the guaranty percentage for the program.",
      "• This helps lenders approve deals they might otherwise decline.",
      "• Borrowers still owe the debt, the guaranty is between SBA and the lender.",
    ].join("\n"),
  counseling: () =>
    [
      "SBA counseling and training basics:",
      "• SCORE mentors, Small Business Development Centers (SBDCs), and Women's Business Centers (WBCs) offer guidance and training.",
      "• Good for business planning, bookkeeping setup, marketing basics, and lender readiness.",
    ].join("\n"),
  contracting: () =>
    [
      "SBA contracting basics:",
      "• SBA supports small businesses competing for government contracts through certification programs and resources.",
      "• Common starting steps: SAM registration, capability statement, NAICS selection, past performance planning.",
    ].join("\n"),
};

// =========================
// Helpers
// =========================
const STORAGE_KEY = "sabbi1_chat_v2";
const MUTE_KEY = "sabbi1_muted";

const makeId = () => `${Date.now()}_${Math.random().toString(16).slice(2)}`;

const normalize = (s: string) =>
  s
    .toLowerCase()
    .replace(/'/g, "'")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const pickRandom = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

const inferBasicsTopic = (inputNorm: string): BasicsTopic => {
  if (/(7\s?a|seven\s?a|7a)/.test(inputNorm)) return "7a_loan";
  if (/(504)/.test(inputNorm)) return "504_loan";
  if (/(microloan|micro loan)/.test(inputNorm)) return "microloan";
  if (/(disaster|eidl|injury|hurricane|flood|fire)/.test(inputNorm)) return "disaster_loans";
  if (/(eligible|eligibility|qualify|qualification|size standard)/.test(inputNorm)) return "eligibility";
  if (/(dscr|debt service|personal guarant|guaranty|collateral|use of proceeds)/.test(inputNorm)) return "credit_terms";
  if (/(documents|paperwork|what do i need|requirements|tax returns|financials)/.test(inputNorm)) return "documents";
  if (/(guaranty|guarantee)/.test(inputNorm)) return "guarantee";
  if (/(score|sbdc|wbc|mentor|training|counseling)/.test(inputNorm)) return "counseling";
  if (/(contract|contracting|sam|naics|capability statement)/.test(inputNorm)) return "contracting";
  return "sba_overview";
};

const formatTime = (iso: string) =>
  new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

const sameDay = (aISO: string, bISO: string) => {
  const a = new Date(aISO);
  const b = new Date(bISO);
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
};

// =========================
// Inline styles (self-contained, no Tailwind dependency for theming)
// =========================
const COLORS = {
  midnightBlack: "#0a0a0f",
  midnightCard: "#111118",
  midnightSurface: "#16161f",
  midnightBorder: "#1e1e2a",
  midnightBorderLight: "#2a2a3a",
  gold: "#c8a84e",
  goldMuted: "rgba(200,168,78,0.15)",
  goldGlow: "rgba(200,168,78,0.35)",
  goldSoft: "rgba(200,168,78,0.08)",
  rangerGreen: "#4a5d23",
  rangerGreenBright: "#6b8c32",
  rangerGreenGlow: "rgba(107,140,50,0.3)",
  rangerGreenSoft: "rgba(74,93,35,0.15)",
  textPrimary: "#e8e6e1",
  textSecondary: "#9a9890",
  textMuted: "#5c5a55",
  white: "#ffffff",
};

// =========================
// Component
// =========================
const Sabbi1Bot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [sabbiImgError, setSabbiImgError] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showScrollDown, setShowScrollDown] = useState(false);
  // Elite features state
  const [followUps, setFollowUps] = useState<string[]>([]);
  const [showCategories, setShowCategories] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [copiedChat, setCopiedChat] = useState(false);
  const [askedKeys] = useState<Set<string>>(() => new Set());
  const [toolkitLink, setToolkitLink] = useState<{ path: string; label: string } | null>(null);
  const recognitionRef = useRef<any>(null);
  const [isMuted, setIsMuted] = useState(() => {
    try {
      return localStorage.getItem(MUTE_KEY) === "1";
    } catch {
      return false;
    }
  });

  const [messages, setMessages] = useState<Message[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Message[];
        if (Array.isArray(parsed) && parsed.length) return parsed;
      }
    } catch {
      /* ignore */
    }
    const now = new Date().toISOString();
    return [
      {
        id: makeId(),
        text: "Welcome to Sabbi 1.0. I handle SBA basics — loan programs, quick definitions, common terms, and directional guidance. Ask me anything to get started.",
        sender: "sabbi",
        timestamp: now,
      },
    ];
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Keep sfx muted state in sync
  useEffect(() => {
    sfx.muted = isMuted;
    try {
      localStorage.setItem(MUTE_KEY, isMuted ? "1" : "0");
    } catch {
      /* ignore */
    }
  }, [isMuted]);

  const starterQuestions = useMemo(() => STARTER_QUESTIONS, []);

  const hasUserMessages = useMemo(() => messages.some((m) => m.sender === "user"), [messages]);

  // Persist
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      /* ignore */
    }
  }, [messages]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Focus input
  useEffect(() => {
    if (!isOpen) return;
    const t = window.setTimeout(() => inputRef.current?.focus(), 250);
    return () => window.clearTimeout(t);
  }, [isOpen]);

  // ESC to close
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        sfx.close();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  // Scroll detection for "jump to bottom"
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const onScroll = () => {
      const gap = el.scrollHeight - el.scrollTop - el.clientHeight;
      setShowScrollDown(gap > 120);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [isOpen]);

  // Focus trap
  useEffect(() => {
    if (!isOpen) return;
    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const root = panelRef.current;
      if (!root) return;
      const focusable = root.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", handleTab);
    return () => window.removeEventListener("keydown", handleTab);
  }, [isOpen]);

  // ---- Logic (unchanged) ----
  const getMeaningfulWords = useCallback((text: string) => {
    const stopWords = new Set([
      "what","is","an","a","the","how","do","does","tell","me","about","can","you",
      "for","of","and","in","was","when","to","types","type","main","explain",
      "terms","simple","simply","please",
    ]);
    return normalize(text)
      .split(" ")
      .map((w) => w.trim())
      .filter((w) => w.length > 2 && !stopWords.has(w));
  }, []);

  const resolveFaqKey = useCallback(
    (input: string) => {
      const clean = normalize(input);
      const alias = FAQ_ALIASES[clean];
      const resolved = alias ? normalize(alias) : clean;
      const exactKey = Object.keys(FAQ_MAP).find((k) => normalize(k) === resolved);
      if (exactKey) return exactKey;
      const inputWords = getMeaningfulWords(resolved);
      let bestKey: string | null = null;
      let bestScore = -Infinity;
      for (const key of Object.keys(FAQ_MAP)) {
        const keyNorm = normalize(key);
        const keyWords = getMeaningfulWords(keyNorm);
        const overlap = inputWords.reduce((acc, w) => (keyWords.includes(w) ? acc + 1 : acc), 0);
        const containment = keyNorm.includes(resolved) ? 2 : resolved.includes(keyNorm) ? 1 : 0;
        const lengthPenalty = Math.abs(keyWords.length - inputWords.length) * 0.5;
        const score = overlap * 4 + containment * 6 - lengthPenalty;
        if (score > bestScore) {
          bestScore = score;
          bestKey = key;
        }
      }
      const minScoreThreshold = 6;
      if (bestKey && bestScore >= minScoreThreshold) return bestKey;
      return null;
    },
    [getMeaningfulWords]
  );

  const generateResponse = useCallback(
    (input: string): string => {
      const cleanInput = normalize(input);

      // 1) Joke shortcut
      if (cleanInput.includes("joke")) {
        const jokeKeys = Object.keys(FAQ_MAP).filter((k) => normalize(k).includes("joke"));
        if (jokeKeys.length) {
          trackQuestion(input, true, "joke");
          return FAQ_MAP[pickRandom(jokeKeys)];
        }
      }

      // 2) Exact FAQ match (fast path — now 60+ entries)
      const matchedKey = resolveFaqKey(cleanInput);
      if (matchedKey) {
        // Conversation memory — check if already asked
        if (askedKeys.has(matchedKey)) {
          trackQuestion(input, true, matchedKey);
          return `As I mentioned earlier:\n\n${FAQ_MAP[matchedKey]}`;
        }
        askedKeys.add(matchedKey);
        trackQuestion(input, true, matchedKey);

        // Toolkit link detection
        const tLink = getToolkitLink(cleanInput);
        if (tLink) {
          setToolkitLink(tLink);
          return `${FAQ_MAP[matchedKey]}\n\n💡 For hands-on help, try our dedicated toolkit →`;
        }

        // Set follow-ups
        setFollowUps(getFollowUps(cleanInput));
        return FAQ_MAP[matchedKey];
      }

      // 3) Fuzzy match against FUZZY_KB (deep knowledge — 15+ topic clusters)
      const fuzzyResult = fuzzyMatchWithFallback(cleanInput, FUZZY_MATCH_KB, undefined, 5);
      if (fuzzyResult && !fuzzyResult.startsWith("I don't have specific information")) {
        trackQuestion(input, true, "fuzzy");
        const tLink = getToolkitLink(cleanInput);
        if (tLink) setToolkitLink(tLink);
        setFollowUps(getFollowUps(cleanInput));
        return fuzzyResult;
      }

      // 4) Topic inference fallback (BASICS_KB generators)
      trackQuestion(input, false, "fallback");
      const topic = inferBasicsTopic(cleanInput);
      const basics = BASICS_KB[topic](cleanInput);
      setFollowUps(getFollowUps(cleanInput));
      const followUpQ =
        topic === "7a_loan" || topic === "504_loan" || topic === "microloan"
          ? "Quick check — are you looking for working capital, equipment, real estate, or buying a business?"
          : topic === "disaster_loans"
          ? "Quick check — what type of disaster situation is this, and are you asking about physical damage or economic injury?"
          : topic === "documents"
          ? "Quick check — is this for a new loan application, or are you responding to a lender request for additional items?"
          : "Quick check — what's the outcome you want in one sentence?";
      return `${basics}\n\n${followUpQ}`;
    },
    [resolveFaqKey, askedKeys]
  );

  const handleSendMessage = useCallback(
    (forcedText?: string) => {
      const raw = (forcedText ?? userInput).trim();
      if (!raw) return;
      sfx.send();
      setFollowUps([]);
      setToolkitLink(null);
      setShowCategories(false);
      const nowISO = new Date().toISOString();
      const userMessage: Message = { id: makeId(), text: raw, sender: "user", timestamp: nowISO };
      setMessages((prev) => [...prev, userMessage]);
      setUserInput("");
      setIsTyping(true);
      const response = generateResponse(raw);
      const delay = 500 + Math.floor(Math.random() * 400);
      window.setTimeout(() => {
        sfx.receive();
        const sabbiMessage: Message = {
          id: makeId(),
          text: response,
          sender: "sabbi",
          timestamp: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, sabbiMessage]);
        setIsTyping(false);
      }, delay);
    },
    [userInput, generateResponse]
  );

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleStarterQuestionClick = (question: string) => {
    sfx.click();
    handleSendMessage(question);
    inputRef.current?.focus();
  };

  const handleResetChat = () => {
    sfx.reset();
    const now = new Date().toISOString();
    setIsTyping(false);
    setMessages([
      {
        id: makeId(),
        text: "Session cleared. Ask me SBA basics, quick definitions, loan program overviews, and common terms.",
        sender: "sabbi",
        timestamp: now,
      },
    ]);
    setUserInput("");
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    inputRef.current?.focus();
  };

  // Voice input (Web Speech API)
  const toggleVoice = useCallback(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setUserInput(transcript);
      setIsListening(false);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
    sfx.click();
  }, [isListening]);

  // Export / Copy chat
  const handleExportChat = useCallback(() => {
    const text = messages
      .map((m) => `[${new Date(m.timestamp).toLocaleString()}] ${m.sender === "user" ? "You" : "Sabbi"}: ${m.text}`)
      .join("\n\n");
    navigator.clipboard.writeText(text).then(() => {
      setCopiedChat(true);
      setTimeout(() => setCopiedChat(false), 2000);
    }).catch(() => {
      // Fallback: download as file
      const blob = new Blob([text], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `sabbi-chat-${new Date().toISOString().slice(0, 10)}.txt`;
      a.click();
      URL.revokeObjectURL(url);
    });
  }, [messages]);

  const handleOpen = () => {
    setIsOpen(true);
    sfx.open();
  };

  const handleClose = () => {
    setIsOpen(false);
    sfx.close();
    setShowCategories(false);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const groupedMessages = useMemo(() => {
    const out: Array<{ type: "divider"; label: string } | { type: "msg"; msg: Message }> = [];
    let lastISO: string | null = null;
    for (const m of messages) {
      if (!lastISO || !sameDay(lastISO, m.timestamp)) {
        const d = new Date(m.timestamp);
        const label = d.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" });
        out.push({ type: "divider", label });
      }
      out.push({ type: "msg", msg: m });
      lastISO = m.timestamp;
    }
    return out;
  }, [messages]);

  // Inject keyframes + font import once
  useEffect(() => {
    const STYLE_ID = "sabbi-v2-styles";
    if (document.getElementById(STYLE_ID)) return;

    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

      @keyframes sabbi-float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-4px); }
      }
      @keyframes sabbi-pulse-ring {
        0% { transform: scale(1); opacity: 0.6; }
        100% { transform: scale(1.8); opacity: 0; }
      }
      @keyframes sabbi-slide-up {
        from { opacity: 0; transform: translateY(12px) scale(0.98); }
        to { opacity: 1; transform: translateY(0) scale(1); }
      }
      @keyframes sabbi-msg-in-left {
        from { opacity: 0; transform: translateX(-16px); }
        to { opacity: 1; transform: translateX(0); }
      }
      @keyframes sabbi-msg-in-right {
        from { opacity: 0; transform: translateX(16px); }
        to { opacity: 1; transform: translateX(0); }
      }
      @keyframes sabbi-typing-bounce {
        0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
        30% { transform: translateY(-6px); opacity: 1; }
      }
      @keyframes sabbi-glow-breathe {
        0%, 100% { opacity: 0.4; }
        50% { opacity: 0.8; }
      }
      @keyframes sabbi-shimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }
      @keyframes sabbi-fade-in {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      .sabbi-scrollbar::-webkit-scrollbar { width: 5px; }
      .sabbi-scrollbar::-webkit-scrollbar-track { background: transparent; }
      .sabbi-scrollbar::-webkit-scrollbar-thumb {
        background: ${COLORS.midnightBorderLight};
        border-radius: 10px;
      }
      .sabbi-scrollbar::-webkit-scrollbar-thumb:hover {
        background: ${COLORS.gold};
      }
    `;
    document.head.appendChild(style);
  }, []);

  // =========================
  // Render
  // =========================
  const ff = "'Outfit', system-ui, sans-serif";
  const ffMono = "'JetBrains Mono', monospace";

  const btnBase: React.CSSProperties = {
    border: "none",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s ease",
    fontFamily: ff,
  };

  if (!isOpen) {
    return (
      <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 9999 }}>
        {/* Pulse ring */}
        <span
          style={{
            position: "absolute",
            inset: -4,
            borderRadius: "50%",
            border: `2px solid ${COLORS.gold}`,
            animation: "sabbi-pulse-ring 2.5s ease-out infinite",
            pointerEvents: "none",
          }}
        />
        <button
          type="button"
          onClick={handleOpen}
          aria-label="Open Sabbi chat"
          title="Need help? Ask Sabbi!"
          style={{
            ...btnBase,
            position: "relative",
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${COLORS.midnightCard} 0%, ${COLORS.midnightBlack} 100%)`,
            border: `1.5px solid ${COLORS.midnightBorderLight}`,
            boxShadow: `0 0 20px ${COLORS.goldGlow}, 0 4px 24px rgba(0,0,0,0.5)`,
            animation: "sabbi-float 3s ease-in-out infinite",
            overflow: "hidden",
          }}
        >
          {/* Inner glow */}
          <span
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              background: `radial-gradient(circle at 30% 30%, ${COLORS.goldMuted} 0%, transparent 60%)`,
              pointerEvents: "none",
            }}
          />
          {!sabbiImgError ? (
            <img
              src="/sabbi-face.png"
              alt="Sabbi"
              style={{ width: 36, height: 36, borderRadius: "50%", position: "relative", zIndex: 1 }}
              onError={() => setSabbiImgError(true)}
            />
          ) : (
            <span style={{ fontSize: 22, position: "relative", zIndex: 1 }}>🤖</span>
          )}
        </button>
      </div>
    );
  }

  return (
    <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 9999 }}>
      <div
        ref={panelRef}
        role="dialog"
        aria-label="Sabbi chat"
        aria-modal="true"
        style={{
          width: 380,
          maxWidth: "calc(100vw - 48px)",
          maxHeight: "calc(100vh - 100px)",
          borderRadius: 20,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          background: COLORS.midnightBlack,
          border: `1px solid ${COLORS.midnightBorder}`,
          boxShadow: `0 0 40px ${COLORS.goldGlow}, 0 0 80px rgba(0,0,0,0.6), inset 0 1px 0 ${COLORS.midnightBorderLight}`,
          animation: "sabbi-slide-up 0.35s cubic-bezier(0.16,1,0.3,1) both",
          fontFamily: ff,
        }}
      >
        {/* ============ HEADER ============ */}
        <div
          style={{
            position: "relative",
            padding: "16px 16px 14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: `linear-gradient(180deg, ${COLORS.midnightSurface} 0%, ${COLORS.midnightBlack} 100%)`,
            borderBottom: `1px solid ${COLORS.midnightBorder}`,
          }}
        >
          {/* Subtle gold line at top */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "10%",
              right: "10%",
              height: 1,
              background: `linear-gradient(90deg, transparent, ${COLORS.gold}, transparent)`,
              opacity: 0.5,
            }}
          />

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ position: "relative" }}>
              {!sabbiImgError ? (
                <img
                  src="/sabbi-face.png"
                  alt="Sabbi"
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: "50%",
                    border: `2px solid ${COLORS.gold}`,
                    boxShadow: `0 0 12px ${COLORS.goldGlow}`,
                  }}
                  onError={() => setSabbiImgError(true)}
                />
              ) : (
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: "50%",
                    background: COLORS.midnightCard,
                    border: `2px solid ${COLORS.gold}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 18,
                    boxShadow: `0 0 12px ${COLORS.goldGlow}`,
                  }}
                >
                  🤖
                </div>
              )}
              {/* Online indicator */}
              <span
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: COLORS.rangerGreenBright,
                  border: `2px solid ${COLORS.midnightBlack}`,
                  boxShadow: `0 0 6px ${COLORS.rangerGreenGlow}`,
                }}
              />
            </div>

            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <h2
                  style={{
                    margin: 0,
                    fontSize: 16,
                    fontWeight: 700,
                    color: COLORS.textPrimary,
                    letterSpacing: "0.02em",
                  }}
                >
                  SABBI
                  <span style={{ color: COLORS.gold, marginLeft: 4, fontWeight: 500, fontSize: 12 }}>1.0</span>
                </h2>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 3,
                    fontSize: 9,
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    padding: "2px 8px",
                    borderRadius: 20,
                    background: COLORS.goldSoft,
                    border: `1px solid ${COLORS.goldMuted}`,
                    color: COLORS.gold,
                  }}
                >
                  <Sparkles style={{ width: 10, height: 10 }} />
                  Premium
                </span>
              </div>
              <p
                style={{
                  margin: "2px 0 0",
                  fontSize: 11,
                  color: COLORS.textMuted,
                  fontFamily: ffMono,
                  letterSpacing: "0.04em",
                }}
              >
                SBA basics · definitions · guidance
              </p>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
            {/* Browse Topics */}
            <button
              type="button"
              onClick={() => { setShowCategories(!showCategories); sfx.click(); }}
              title="Browse topics"
              aria-label="Browse topics"
              style={{
                ...btnBase, width: 30, height: 30, borderRadius: 7,
                background: showCategories ? COLORS.goldSoft : "transparent",
                color: showCategories ? COLORS.gold : COLORS.textSecondary,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = COLORS.midnightBorderLight)}
              onMouseLeave={(e) => (e.currentTarget.style.background = showCategories ? COLORS.goldSoft : "transparent")}
            >
              <Layers style={{ width: 14, height: 14 }} />
            </button>
            {/* Export/Copy Chat */}
            <button
              type="button"
              onClick={handleExportChat}
              title={copiedChat ? "Copied!" : "Copy chat"}
              aria-label="Copy chat transcript"
              style={{
                ...btnBase, width: 30, height: 30, borderRadius: 7,
                background: "transparent",
                color: copiedChat ? COLORS.rangerGreenBright : COLORS.textSecondary,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = COLORS.midnightBorderLight)}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              {copiedChat ? <CheckCheck style={{ width: 14, height: 14 }} /> : <Copy style={{ width: 14, height: 14 }} />}
            </button>
            {/* Mute */}
            <button
              type="button"
              onClick={() => setIsMuted(!isMuted)}
              title={isMuted ? "Unmute" : "Mute"}
              aria-label={isMuted ? "Unmute sounds" : "Mute sounds"}
              style={{
                ...btnBase, width: 30, height: 30, borderRadius: 7,
                background: "transparent",
                color: isMuted ? COLORS.textMuted : COLORS.gold,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = COLORS.midnightBorderLight)}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              {isMuted ? <VolumeX style={{ width: 14, height: 14 }} /> : <Volume2 style={{ width: 14, height: 14 }} />}
            </button>
            {/* Reset */}
            <button
              type="button"
              onClick={handleResetChat}
              title="Reset chat"
              aria-label="Reset chat"
              style={{
                ...btnBase, width: 30, height: 30, borderRadius: 7,
                background: "transparent", color: COLORS.textSecondary,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = COLORS.midnightBorderLight)}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <RotateCcw style={{ width: 13, height: 13 }} />
            </button>
            {/* Close */}
            <button
              type="button"
              onClick={handleClose}
              title="Close"
              aria-label="Close Sabbi chat"
              style={{
                ...btnBase, width: 30, height: 30, borderRadius: 7,
                background: "transparent", color: COLORS.textSecondary,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = COLORS.midnightBorderLight)}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <X style={{ width: 15, height: 15 }} />
            </button>
          </div>
        </div>

        {/* ============ MESSAGES ============ */}
        <div
          ref={scrollContainerRef}
          className="sabbi-scrollbar"
          style={{
            flex: 1,
            minHeight: 0,
            overflowY: "auto",
            padding: "16px 14px",
            background: `linear-gradient(180deg, ${COLORS.midnightBlack} 0%, #08080d 100%)`,
            position: "relative",
          }}
        >
          {/* Ambient glow behind messages */}
          <div
            style={{
              position: "absolute",
              top: "20%",
              left: "50%",
              transform: "translateX(-50%)",
              width: 200,
              height: 200,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${COLORS.goldSoft} 0%, transparent 70%)`,
              pointerEvents: "none",
              animation: "sabbi-glow-breathe 4s ease-in-out infinite",
            }}
          />

          {groupedMessages.map((item, idx) => {
            if (item.type === "divider") {
              return (
                <div
                  key={`div_${idx}`}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    padding: "8px 0",
                  }}
                >
                  <span
                    style={{
                      fontSize: 10,
                      fontFamily: ffMono,
                      letterSpacing: "0.06em",
                      padding: "3px 12px",
                      borderRadius: 20,
                      background: COLORS.midnightSurface,
                      border: `1px solid ${COLORS.midnightBorder}`,
                      color: COLORS.textMuted,
                    }}
                  >
                    {item.label}
                  </span>
                </div>
              );
            }

            const message = item.msg;
            const isUser = message.sender === "user";

            return (
              <div
                key={message.id}
                style={{
                  display: "flex",
                  justifyContent: isUser ? "flex-end" : "flex-start",
                  marginBottom: 10,
                  animation: `${isUser ? "sabbi-msg-in-right" : "sabbi-msg-in-left"} 0.3s ease-out both`,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 8,
                    maxWidth: "88%",
                    flexDirection: isUser ? "row-reverse" : "row",
                  }}
                >
                  {/* Avatar */}
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      background: isUser
                        ? `linear-gradient(135deg, ${COLORS.rangerGreen}, ${COLORS.rangerGreenBright})`
                        : `linear-gradient(135deg, ${COLORS.midnightSurface}, ${COLORS.midnightCard})`,
                      border: `1px solid ${isUser ? COLORS.rangerGreenGlow : COLORS.midnightBorderLight}`,
                      boxShadow: isUser ? `0 0 8px ${COLORS.rangerGreenGlow}` : "none",
                    }}
                  >
                    {isUser ? (
                      <User style={{ width: 13, height: 13, color: COLORS.white }} />
                    ) : (
                      <Bot style={{ width: 13, height: 13, color: COLORS.gold }} />
                    )}
                  </div>

                  {/* Bubble */}
                  <div
                    style={{
                      borderRadius: isUser ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                      padding: "10px 14px",
                      background: isUser
                        ? `linear-gradient(135deg, ${COLORS.rangerGreen}dd, ${COLORS.rangerGreen}aa)`
                        : `${COLORS.midnightSurface}cc`,
                      backdropFilter: "blur(12px)",
                      WebkitBackdropFilter: "blur(12px)",
                      border: `1px solid ${isUser ? COLORS.rangerGreenGlow : COLORS.midnightBorderLight}`,
                      boxShadow: isUser
                        ? `0 2px 12px ${COLORS.rangerGreenGlow}`
                        : `0 2px 12px rgba(0,0,0,0.3)`,
                    }}
                  >
                    <p
                      style={{
                        margin: 0,
                        fontSize: 13,
                        lineHeight: 1.6,
                        whiteSpace: "pre-line",
                        color: isUser ? COLORS.white : COLORS.textPrimary,
                        fontFamily: ff,
                        fontWeight: 400,
                      }}
                    >
                      {message.text}
                    </p>
                    <p
                      style={{
                        margin: "6px 0 0",
                        fontSize: 10,
                        color: isUser ? "rgba(255,255,255,0.5)" : COLORS.textMuted,
                        fontFamily: ffMono,
                      }}
                    >
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Typing indicator */}
          {isTyping && (
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                marginBottom: 10,
                animation: "sabbi-fade-in 0.2s ease both",
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", gap: 8, maxWidth: "88%" }}>
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    background: `linear-gradient(135deg, ${COLORS.midnightSurface}, ${COLORS.midnightCard})`,
                    border: `1px solid ${COLORS.midnightBorderLight}`,
                  }}
                >
                  <Bot style={{ width: 13, height: 13, color: COLORS.gold }} />
                </div>
                <div
                  style={{
                    borderRadius: "16px 16px 16px 4px",
                    padding: "12px 18px",
                    background: `${COLORS.midnightSurface}cc`,
                    backdropFilter: "blur(12px)",
                    border: `1px solid ${COLORS.midnightBorderLight}`,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          background: COLORS.gold,
                          animation: `sabbi-typing-bounce 1.2s ease-in-out ${i * 0.15}s infinite`,
                        }}
                      />
                    ))}
                  </div>
                  <p
                    style={{
                      margin: "6px 0 0",
                      fontSize: 10,
                      color: COLORS.textMuted,
                      fontFamily: ffMono,
                    }}
                  >
                    processing…
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Follow-up suggestions */}
          {followUps.length > 0 && !isTyping && (
            <div style={{
              display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 8, padding: "0 4px",
              animation: "sabbi-fade-in 0.3s ease both",
            }}>
              <span style={{ fontSize: 10, color: COLORS.textMuted, fontFamily: ffMono, width: "100%", marginBottom: 2, letterSpacing: "0.06em" }}>
                RELATED QUESTIONS
              </span>
              {followUps.map((q, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleStarterQuestionClick(q)}
                  style={{
                    ...btnBase, fontSize: 11, fontWeight: 500, padding: "4px 10px", borderRadius: 16,
                    background: COLORS.midnightSurface, border: `1px solid ${COLORS.midnightBorder}`,
                    color: COLORS.textSecondary, whiteSpace: "nowrap",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = COLORS.gold; e.currentTarget.style.color = COLORS.gold; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = COLORS.midnightBorder; e.currentTarget.style.color = COLORS.textSecondary; }}
                >
                  {q} <ArrowRight style={{ width: 10, height: 10, marginLeft: 2 }} />
                </button>
              ))}
            </div>
          )}

          {/* Toolkit link */}
          {toolkitLink && !isTyping && (
            <div style={{
              margin: "0 4px 10px", padding: "8px 12px", borderRadius: 12,
              background: `linear-gradient(135deg, ${COLORS.rangerGreen}22, ${COLORS.goldSoft})`,
              border: `1px solid ${COLORS.goldMuted}`,
              animation: "sabbi-fade-in 0.3s ease both",
              cursor: "pointer",
              display: "flex", alignItems: "center", gap: 8,
            }}
            onClick={() => window.location.href = toolkitLink.path}
            >
              <Sparkles style={{ width: 14, height: 14, color: COLORS.gold, flexShrink: 0 }} />
              <span style={{ fontSize: 12, fontWeight: 600, color: COLORS.gold }}>{toolkitLink.label}</span>
              <ArrowRight style={{ width: 12, height: 12, color: COLORS.gold, marginLeft: "auto" }} />
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* ============ CATEGORY BROWSER ============ */}
        {showCategories && (
          <div style={{
            padding: "10px 14px", borderTop: `1px solid ${COLORS.midnightBorder}`,
            background: COLORS.midnightBlack, maxHeight: 200, overflowY: "auto",
            animation: "sabbi-fade-in 0.2s ease both",
          }}
          className="sabbi-scrollbar"
          >
            <p style={{
              margin: "0 0 8px", fontSize: 10, fontWeight: 600, letterSpacing: "0.1em",
              textTransform: "uppercase", color: COLORS.textMuted, fontFamily: ffMono,
            }}>
              Browse topics
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {BROWSE_CATEGORIES.map((cat, ci) => (
                <div key={ci}>
                  <div style={{
                    fontSize: 12, fontWeight: 600, color: COLORS.gold, marginBottom: 4,
                    display: "flex", alignItems: "center", gap: 6,
                  }}>
                    <span>{cat.icon}</span> {cat.label}
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginLeft: 22, marginBottom: 6 }}>
                    {cat.questions.map((q, qi) => (
                      <button
                        key={qi}
                        type="button"
                        onClick={() => { handleStarterQuestionClick(q); setShowCategories(false); }}
                        style={{
                          ...btnBase, fontSize: 10, fontWeight: 500, padding: "3px 9px", borderRadius: 14,
                          background: COLORS.midnightSurface, border: `1px solid ${COLORS.midnightBorder}`,
                          color: COLORS.textSecondary, whiteSpace: "nowrap",
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.borderColor = COLORS.gold; e.currentTarget.style.color = COLORS.gold; }}
                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = COLORS.midnightBorder; e.currentTarget.style.color = COLORS.textSecondary; }}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Scroll-to-bottom */}
        {showScrollDown && (
          <button
            type="button"
            onClick={scrollToBottom}
            aria-label="Scroll to latest message"
            style={{
              ...btnBase,
              position: "absolute",
              bottom: hasUserMessages ? 90 : 200,
              left: "50%",
              transform: "translateX(-50%)",
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: COLORS.midnightSurface,
              border: `1px solid ${COLORS.midnightBorderLight}`,
              color: COLORS.gold,
              boxShadow: `0 2px 12px rgba(0,0,0,0.4), 0 0 8px ${COLORS.goldSoft}`,
              zIndex: 10,
              animation: "sabbi-fade-in 0.2s ease both",
            }}
          >
            <ChevronDown style={{ width: 16, height: 16 }} />
          </button>
        )}

        {/* ============ STARTERS ============ */}
        {!hasUserMessages && (
          <div
            style={{
              padding: "12px 14px 8px",
              borderTop: `1px solid ${COLORS.midnightBorder}`,
              background: COLORS.midnightBlack,
            }}
          >
            <p
              style={{
                margin: "0 0 8px",
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: COLORS.textMuted,
                fontFamily: ffMono,
              }}
            >
              Quick start
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {starterQuestions.map((q, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleStarterQuestionClick(q)}
                  style={{
                    ...btnBase,
                    fontSize: 11,
                    fontWeight: 500,
                    padding: "5px 12px",
                    borderRadius: 20,
                    background: COLORS.midnightSurface,
                    border: `1px solid ${COLORS.midnightBorder}`,
                    color: COLORS.textSecondary,
                    whiteSpace: "nowrap",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = COLORS.gold;
                    e.currentTarget.style.color = COLORS.gold;
                    e.currentTarget.style.boxShadow = `0 0 8px ${COLORS.goldSoft}`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = COLORS.midnightBorder;
                    e.currentTarget.style.color = COLORS.textSecondary;
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ============ INPUT ============ */}
        <div
          style={{
            padding: "12px 14px 14px",
            borderTop: `1px solid ${COLORS.midnightBorder}`,
            background: COLORS.midnightBlack,
          }}
        >
          <div style={{ display: "flex", gap: 6 }}>
            {/* Voice input */}
            <button
              type="button"
              onClick={toggleVoice}
              title={isListening ? "Stop listening" : "Voice input"}
              aria-label={isListening ? "Stop voice input" : "Start voice input"}
              style={{
                ...btnBase, width: 38, height: 42, borderRadius: 12, flexShrink: 0,
                background: isListening ? `${COLORS.rangerGreen}44` : "transparent",
                border: `1px solid ${isListening ? COLORS.rangerGreenBright : COLORS.midnightBorderLight}`,
                color: isListening ? COLORS.rangerGreenBright : COLORS.textMuted,
                animation: isListening ? "sabbi-glow-breathe 1s ease-in-out infinite" : "none",
              }}
            >
              {isListening
                ? <MicOff style={{ width: 15, height: 15 }} />
                : <Mic style={{ width: 15, height: 15 }} />}
            </button>
            <input
              ref={inputRef}
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={handleInputKeyDown}
              placeholder={isListening ? "Listening..." : "Ask me SBA basics…"}
              style={{
                flex: 1,
                padding: "10px 14px",
                borderRadius: 12,
                border: `1px solid ${COLORS.midnightBorderLight}`,
                background: COLORS.midnightSurface,
                color: COLORS.textPrimary,
                fontSize: 13,
                fontFamily: ff,
                outline: "none",
                transition: "border-color 0.2s, box-shadow 0.2s",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = COLORS.gold;
                e.currentTarget.style.boxShadow = `0 0 12px ${COLORS.goldSoft}`;
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = COLORS.midnightBorderLight;
                e.currentTarget.style.boxShadow = "none";
              }}
              aria-label="Chat message"
            />
            <button
              type="button"
              onClick={() => handleSendMessage()}
              disabled={!userInput.trim() || isTyping}
              aria-label="Send message"
              title="Send"
              style={{
                ...btnBase,
                width: 42,
                height: 42,
                borderRadius: 12,
                background:
                  !userInput.trim() || isTyping
                    ? COLORS.midnightSurface
                    : `linear-gradient(135deg, ${COLORS.rangerGreen}, ${COLORS.rangerGreenBright})`,
                color: !userInput.trim() || isTyping ? COLORS.textMuted : COLORS.white,
                boxShadow:
                  !userInput.trim() || isTyping ? "none" : `0 0 12px ${COLORS.rangerGreenGlow}`,
                opacity: !userInput.trim() || isTyping ? 0.5 : 1,
              }}
            >
              <Send style={{ width: 16, height: 16 }} />
            </button>
          </div>

          {/* Tip shimmer bar */}
          <div
            style={{
              marginTop: 10,
              textAlign: "center",
              fontSize: 10,
              fontFamily: ffMono,
              color: COLORS.textMuted,
              letterSpacing: "0.03em",
            }}
          >
            Try goal-based: "Which SBA loan fits buying equipment?"
          </div>

          {/* Gold accent line at bottom */}
          <div
            style={{
              marginTop: 10,
              height: 1,
              background: `linear-gradient(90deg, transparent, ${COLORS.gold}44, transparent)`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Sabbi1Bot;