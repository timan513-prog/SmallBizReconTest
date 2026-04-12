import React, { useState, useRef, useEffect } from 'react';
import { X, Send, User, Bot, RotateCcw, Sparkles } from 'lucide-react';
import { paymentAssistanceKnowledgeBase } from '../data/sabbiPaymentAssistanceKnowledge';
import { fuzzyMatchWithFallback, normalize, KnowledgeEntry } from '../utils/chatbotMatching';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'sabbi';
  timestamp: Date;
}

const makeId = () => `${Date.now()}_${Math.random().toString(16).slice(2)}`;

const starterQuestions = [
  "What is payment assistance?",
  "Who qualifies for payment assistance?",
  "How do I request payment assistance?",
  "What documents do I need?",
  "How long does the process take?"
];

const outOfScopeKeywords = [
  'collateral release',
  'release of collateral',
  'subordination',
  'lien subordination',
  'loan forgiveness'
];

const SabbiPaymentAssistance: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: makeId(),
      text: "👋 Hi, I'm Sabbi 2.0 (Payment Assistance Specialist)! I'm your specialized assistant for COVID EIDL Payment Assistance. I can answer questions about payment assistance programs, eligibility, documentation, and the application process. What would you like to know?",
      sender: 'sabbi',
      timestamp: new Date()
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const generateResponse = (input: string): string => {
    const cleanInput = normalize(input);

    if (outOfScopeKeywords.some(keyword => cleanInput.includes(keyword))) {
      return "That topic isn't covered in the Payment Assistance Toolkit. Please check the correct SmallBiz Recon™ toolkit for that servicing action.";
    }

    const knowledgeBaseTyped = paymentAssistanceKnowledgeBase as Record<string, KnowledgeEntry | string>;
    const typedKB: Record<string, KnowledgeEntry> = {};

    for (const [key, value] of Object.entries(knowledgeBaseTyped)) {
      if (typeof value === 'string') {
        typedKB[key] = { answer: value };
      } else {
        typedKB[key] = value;
      }
    }

    const fallbackMessage = "I don't have specific information about that in the Payment Assistance Toolkit. Try asking about eligibility requirements, the application process, required documents, or types of assistance available.";

    return fuzzyMatchWithFallback(input, typedKB, () => fallbackMessage, 5);
  };

  const handleSendMessage = (textOverride?: string) => {
    const raw = textOverride || userInput;
    if (!raw.trim()) return;

    const userMessage: Message = {
      id: makeId(),
      text: raw,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setUserInput('');

    setTimeout(() => {
      const response = generateResponse(raw);
      const sabbiMessage: Message = {
        id: makeId(),
        text: response,
        sender: 'sabbi',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, sabbiMessage]);
    }, 500);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleStarterQuestionClick = (question: string) => {
    handleSendMessage(question);
    inputRef.current?.focus();
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: makeId(),
        text: "👋 Hi, I'm Sabbi 2.0 (Payment Assistance Specialist)! I'm your specialized assistant for COVID EIDL Payment Assistance. I can answer questions about payment assistance programs, eligibility, documentation, and the application process. What would you like to know?",
        sender: 'sabbi',
        timestamp: new Date()
      }
    ]);
    setUserInput('');
    inputRef.current?.focus();
  };

  const hasUserMessages = messages.some(m => m.sender === 'user');

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen ? (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="group relative bg-white dark:bg-dark-bg-secondary shadow-lg border border-gray-300 dark:border-dark-border rounded-full p-2 hover:shadow-2xl hover:-translate-y-1 hover:ring-2 hover:ring-od-green dark:hover:ring-dark-od-green transition-all duration-300"
          aria-label="Open Sabbi Payment Assistance chat"
          title="Ask Sabbi about Payment Assistance"
        >
          <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md bg-flat-gold/20 pointer-events-none" />
          <div className="relative w-10 h-10 rounded-full bg-od-green flex items-center justify-center text-white">
            <Bot className="w-5 h-5" />
          </div>
        </button>
      ) : (
        <div
          role="dialog"
          aria-label="Sabbi Payment Assistance chat"
          aria-modal="true"
          className="w-[360px] max-w-[calc(100vw-48px)] max-h-[calc(100vh-100px)] bg-white dark:bg-dark-bg-secondary border border-gray-300 dark:border-dark-border shadow-2xl rounded-2xl overflow-hidden transition-colors duration-300 flex flex-col"
        >
          {/* Header */}
          <div className="relative bg-od-green dark:bg-dark-od-green text-white p-4 flex items-center justify-between transition-colors duration-300">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-od-green ring-2 ring-white/40">
                  <Bot className="w-5 h-5" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 ring-2 ring-od-green dark:ring-dark-od-green" />
              </div>

              <div className="leading-tight">
                <div className="flex items-center gap-2">
                  <h2 className="font-orbitron text-lg font-bold">Sabbi 2.0</h2>
                  <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-white/15 border border-white/20">
                    <Sparkles className="w-3 h-3" />
                    Premium
                  </span>
                </div>
                <p className="text-xs text-white/80 font-inter">Payment Assistance Specialist</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleResetChat}
                className="p-2 rounded-lg text-white/90 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Reset chat"
                title="Reset chat"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg text-white/90 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close Sabbi Payment Assistance chat"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-30" />
          </div>

          {/* Messages */}
          <div className="flex-1 min-h-0 overflow-y-auto px-4 py-4 space-y-3 bg-gray-50 dark:bg-dark-bg-primary transition-colors duration-300 custom-scrollbar">
            {messages.map((message) => {
              const isUser = message.sender === 'user';

              return (
                <div key={message.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`flex items-start gap-2 max-w-[88%] ${
                      isUser ? 'flex-row-reverse' : 'flex-row'
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                        isUser
                          ? 'bg-od-green dark:bg-dark-od-green'
                          : 'bg-gray-700 dark:bg-dark-bg-tertiary'
                      } transition-colors duration-300 shadow-sm`}
                      aria-hidden="true"
                    >
                      {isUser ? (
                        <User className="w-3.5 h-3.5 text-white" />
                      ) : (
                        <Bot className="w-3.5 h-3.5 text-white" />
                      )}
                    </div>

                    <div
                      className={`rounded-2xl px-3.5 py-3 transition-colors duration-300 ${
                        isUser
                          ? 'bg-od-green dark:bg-dark-od-green text-white shadow-md'
                          : 'bg-white dark:bg-dark-bg-secondary border border-gray-200 dark:border-dark-border text-gray-800 dark:text-dark-text-primary shadow-sm'
                      }`}
                    >
                      <p className="text-sm font-inter leading-relaxed whitespace-pre-line">
                        {message.text}
                      </p>
                      <p
                        className={`text-[11px] mt-1.5 ${
                          isUser
                            ? 'text-green-100 dark:text-green-200'
                            : 'text-gray-500 dark:text-dark-text-muted'
                        } transition-colors duration-300`}
                      >
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}

            <div ref={messagesEndRef} />
          </div>

          {/* Starter Questions */}
          {!hasUserMessages && (
            <div className="p-4 border-t border-gray-200 dark:border-dark-border bg-white dark:bg-dark-bg-secondary transition-colors duration-300">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold text-gray-800 dark:text-dark-text-primary font-inter">
                  Suggested questions
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {starterQuestions.map((question, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleStarterQuestionClick(question)}
                    className="text-xs bg-gray-100 dark:bg-dark-bg-tertiary text-gray-800 dark:text-dark-text-secondary px-3 py-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-dark-border transition-colors duration-300"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="border-t border-gray-200 dark:border-dark-border p-4 bg-white dark:bg-dark-bg-secondary transition-colors duration-300">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={handleInputKeyDown}
                placeholder="Ask about payment assistance..."
                className="flex-1 px-3 py-2.5 border border-gray-300 dark:border-dark-border rounded-xl font-inter text-sm bg-white dark:bg-dark-bg-primary text-gray-900 dark:text-dark-text-primary placeholder-gray-500 dark:placeholder-dark-text-muted transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-od-green dark:focus:ring-dark-od-green focus:border-transparent"
                aria-label="Chat message"
              />

              <button
                type="button"
                onClick={() => handleSendMessage()}
                disabled={!userInput.trim()}
                className="bg-od-green dark:bg-dark-od-green hover:bg-dark-olive-drab dark:hover:bg-dark-olive-drab disabled:bg-gray-300 dark:disabled:bg-dark-bg-tertiary disabled:cursor-not-allowed text-white px-3 rounded-xl transition-colors flex items-center justify-center shadow-sm hover:shadow-md"
                aria-label="Send message"
                title="Send"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-gray-500 dark:text-dark-text-muted mt-2 text-center font-inter transition-colors duration-300">
              Sabbi 2.0 is specialized for payment assistance questions only
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SabbiPaymentAssistance;
