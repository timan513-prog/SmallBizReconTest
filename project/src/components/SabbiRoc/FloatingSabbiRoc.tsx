import React, { useEffect, useMemo, useState } from "react";
import { Bot, X } from "lucide-react";

type Message = {
  text: string;
  sender: "user" | "sabbi";
  timestamp: Date;
};

type FloatingSabbiRocProps = {
  defaultOpen?: boolean;
};

const STORAGE_KEY = "sabbiRocOpen";

// Simplified placeholder components
const PacketQualityMeter = ({ score, tier }: { score: number; tier: string }) => (
  <div className="bg-white/5 border border-white/10 rounded-xl p-3">
    <div className="flex justify-between text-xs text-white/70 mb-2">
      <span>Packet Quality</span>
      <span className="text-[#CDA349]">{tier}</span>
    </div>
    <div className="h-2 bg-black/40 rounded-full overflow-hidden">
      <div className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500" style={{ width: `${score}%` }} />
    </div>
  </div>
);

const WizardProgress = () => (
  <div className="bg-white/5 border border-white/10 rounded-xl p-3">
    <div className="text-xs text-white/70">Wizard: Not Started</div>
  </div>
);

const StatusSelector = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => (
  <select 
    value={value} 
    onChange={(e) => onChange(e.target.value)}
    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-sm"
  >
    <option>Preparing Packet</option>
    <option>Ready to Submit</option>
    <option>Submitted</option>
  </select>
);

const CommandBar = ({ onStartWizard, onQuickScan, onGenerateCover, onGenerateSubject }: any) => (
  <div className="grid grid-cols-2 gap-2">
    <button onClick={onStartWizard} className="px-3 py-2 bg-[#556B2F] border border-white/10 rounded-xl text-white text-xs hover:brightness-110">
      Start Wizard
    </button>
    <button onClick={onQuickScan} className="px-3 py-2 bg-[#556B2F] border border-white/10 rounded-xl text-white text-xs hover:brightness-110">
      Quick Scan
    </button>
    <button onClick={onGenerateCover} className="px-3 py-2 bg-[#556B2F] border border-white/10 rounded-xl text-white text-xs hover:brightness-110">
      Generate Cover
    </button>
    <button onClick={onGenerateSubject} className="px-3 py-2 bg-[#556B2F] border border-white/10 rounded-xl text-white text-xs hover:brightness-110">
      Generate Subject
    </button>
  </div>
);

const MessageList = ({ messages }: { messages: Message[] }) => (
  <div className="space-y-3">
    {messages.map((msg, i) => (
      <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
        <div className={`max-w-[85%] px-3 py-2 rounded-xl text-sm ${
          msg.sender === 'user' 
            ? 'bg-[#556B2F] text-white' 
            : 'bg-white/10 text-white'
        }`}>
          {msg.text}
        </div>
      </div>
    ))}
  </div>
);

const LoadingIndicator = ({ type }: { type: string }) => (
  <div className="flex justify-start">
    <div className="bg-white/10 px-3 py-2 rounded-xl text-sm text-white/70">
      {type === 'thinking' && '💭 Thinking...'}
      {type === 'scanning' && '🔍 Scanning...'}
      {type === 'generating' && '📝 Generating...'}
    </div>
  </div>
);

const StarterQuestions = ({ onPick }: { onPick: (q: string) => void }) => (
  <div className="flex gap-2 overflow-x-auto">
    {['What docs do I need?', 'How to fill Form 1010?'].map(q => (
      <button 
        key={q}
        onClick={() => onPick(q)}
        className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs text-white whitespace-nowrap hover:bg-white/10"
      >
        {q}
      </button>
    ))}
  </div>
);

const RecentQueries = ({ onPick }: { onPick: (q: string) => void }) => null;

const InputArea = ({ value, onChange, onSend, placeholder }: any) => (
  <div className="flex gap-2">
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyPress={(e) => e.key === 'Enter' && onSend()}
      placeholder={placeholder}
      className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-white/40"
    />
    <button 
      onClick={onSend}
      className="px-4 py-2 bg-[#556B2F] border border-white/10 rounded-xl text-white text-sm hover:brightness-110"
    >
      Send
    </button>
  </div>
);

const FloatingSabbiRoc: React.FC<FloatingSabbiRocProps> = ({ defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);
  const [status, setStatus] = useState<string>("Preparing Packet");
  const [hybridMode, setHybridMode] = useState<boolean>(true);
  const [input, setInput] = useState<string>("");
  const [loadingType, setLoadingType] = useState<"thinking" | "scanning" | "generating" | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "👋 Sabbi Roc online. Select your status, run a scan, and I'll help you build a submission-ready ROC packet.",
      sender: "sabbi",
      timestamp: new Date(),
    },
  ]);

  // Persist open/close state
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "true") setOpen(true);
      if (saved === "false") setOpen(false);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, String(open));
    } catch {
      // ignore
    }
  }, [open]);

  // ESC closes
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const packetScore = useMemo(() => {
    const base = Math.min(100, 20 + messages.length * 4);
    return base;
  }, [messages.length]);

  const packetTier = useMemo(() => {
    if (packetScore < 30) return "Early Draft";
    if (packetScore < 55) return "Good";
    if (packetScore < 75) return "Submission-Ready";
    if (packetScore < 90) return "SBA-Grade Packet";
    return "Elite Recon Packet";
  }, [packetScore]);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg: Message = {
      text: trimmed,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoadingType("thinking");

    setTimeout(() => {
      const botMsg: Message = {
        text: hybridMode
          ? `Hybrid answer: Here's what I'd do next for ROC based on "${trimmed}". Run a checklist scan and generate your cover page.`
          : `Toolkit-only answer: For ROC, verify required docs, then generate cover page + subject line.`,
        sender: "sabbi",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
      setLoadingType(null);
    }, 550);
  };

  const handleQuickScan = () => {
    setLoadingType("scanning");
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          text: `✅ Quick Scan Complete. Current readiness looks like: ${packetTier}. Next best action: Start Wizard → Fill missing docs → Generate Cover Page.`,
          sender: "sabbi",
          timestamp: new Date(),
        },
      ]);
      setLoadingType(null);
    }, 650);
  };

  const handleStartWizard = () => {
    setMessages((prev) => [
      ...prev,
      {
        text: "🧭 Wizard started. Step 1: What collateral are you releasing, equipment, vehicles, business assets, or real estate?",
        sender: "sabbi",
        timestamp: new Date(),
      },
    ]);
  };

  const handleGenerateCoverPage = () => {
    setLoadingType("generating");
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          text: "📄 Cover Page generated. Next: Generate Subject Line and Submission Email.",
          sender: "sabbi",
          timestamp: new Date(),
        },
      ]);
      setLoadingType(null);
    }, 700);
  };

  const handleGenerateSubjectLine = () => {
    setMessages((prev) => [
      ...prev,
      {
        text: `✅ Suggested subject line: "COVID EIDL Release of Collateral Request, Loan #________, ${status}"`,
        sender: "sabbi",
        timestamp: new Date(),
      },
    ]);
  };

  return (
    <>
      {/* CRITICAL: This wrapper ensures proper stacking context */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999 }}>
        {/* Launcher Button */}
        {!open && (
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open Sabbi Roc"
            style={{ pointerEvents: 'auto' }}
            className="fixed bottom-6 right-6 h-14 w-14 rounded-full
                       border border-white/10 bg-[#1E2B12]/95 text-white shadow-2xl
                       hover:brightness-110 active:scale-[0.98] transition"
          >
            <Bot className="mx-auto" />
          </button>
        )}

        {/* Floating Panel */}
        {open && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Sabbi Roc"
            style={{ pointerEvents: 'auto' }}
            className="fixed right-6 bottom-6 w-[420px]
                       h-[600px] rounded-2xl overflow-hidden
                       border border-white/10 bg-black/70 backdrop-blur-xl shadow-2xl
                       flex flex-col
                       max-sm:inset-0 max-sm:right-0 max-sm:bottom-0 max-sm:w-full max-sm:h-full max-sm:rounded-none"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-3 py-2 bg-[#556B2F]/95 border-b border-white/10">
              <div className="flex items-center gap-2 text-white font-semibold">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-black/25 border border-white/10">
                  <Bot size={16} />
                </span>
                <span>Sabbi 2.1</span>
                <span className="text-xs px-2 py-1 rounded-full bg-black/25 border border-white/10">
                  ROC Only
                </span>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close Sabbi"
                className="h-9 w-9 rounded-lg text-white/90 hover:bg-black/20 border border-transparent hover:border-white/10
                           inline-flex items-center justify-center transition"
              >
                <X size={18} />
              </button>
            </div>

            {/* Top Controls */}
            <div className="px-3 pt-3 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <div className="flex-1">
                  <StatusSelector value={status} onChange={setStatus} />
                </div>

                <button
                  type="button"
                  onClick={() => setHybridMode((v) => !v)}
                  className={`px-3 py-2 rounded-xl border text-sm font-semibold transition
                    ${
                      hybridMode
                        ? "bg-[#CDA349]/90 border-white/10 text-black"
                        : "bg-white/5 border-white/10 text-white"
                    }`}
                  title="Hybrid Mode combines toolkit + general SBA guidance"
                >
                  Hybrid {hybridMode ? "ON" : "OFF"}
                </button>
              </div>

              <PacketQualityMeter score={packetScore} tier={packetTier} />

              <WizardProgress />

              <CommandBar
                onStartWizard={handleStartWizard}
                onQuickScan={handleQuickScan}
                onGenerateCover={handleGenerateCoverPage}
                onGenerateSubject={handleGenerateSubjectLine}
              />
            </div>

            {/* Messages */}
            <div className="flex-1 min-h-0 px-3 pt-3 pb-2 overflow-hidden">
              <div className="h-full rounded-2xl border border-white/10 bg-black/35 overflow-hidden flex flex-col">
                <div className="flex-1 min-h-0 overflow-y-auto p-3">
                  <MessageList messages={messages} />
                  {loadingType && <LoadingIndicator type={loadingType} />}
                </div>

                <div className="border-t border-white/10 p-3 space-y-2">
                  <StarterQuestions onPick={(q: string) => setInput(q)} />
                  <RecentQueries onPick={(q: string) => setInput(q)} />
                  <InputArea
                    value={input}
                    onChange={setInput}
                    onSend={handleSend}
                    placeholder="Ask about ROC docs, cover page, subject line..."
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default FloatingSabbiRoc;