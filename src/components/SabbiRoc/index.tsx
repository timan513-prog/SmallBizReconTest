/**
 * SabbiRoc - Production-Ready Enhanced Component
 * Complete with error handling, loading states, clipboard utility, and message queue
 * 
 * Version: 3.1 Enhanced
 * Improvements: Error handling, robust clipboard, loading states, message queue
 */

import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { Bot, X, RotateCcw, Sparkles, Minimize2, Maximize2 } from 'lucide-react';

// Import constants
import {
  BorrowerStatus,
  WIZARD_STEPS,
  MESSAGE_DELAYS,
  UI_CONFIG
} from './constants';

// Import utilities
import {
  normalize,
  formatTime,
  looksLikePacketList,
  validateWizardAnswers
} from './utils';

// Import enhanced utilities
import { copyToClipboard } from './utils/clipboard';
import { safeAsync, safeSync, errorLogger } from './utils/errorHandling';
import { createMessageQueue, createMessageBatch, MessageQueue } from './utils/messageQueue';

// Import generators (enhanced versions)
import {
  WizardAnswers,
  generateBorrowerLetter,
  generateEmailTemplate,
  generateCoverPage,
  generateSubjectLine,
  generatePacketOrder,
  generateFileNamingGuide
} from './generators-enhanced';

// Import packet quality logic
import {
  PacketQuality,
  evaluatePacketQuality,
  buildPacketReadinessReport
} from './packetQuality';

// Import response engine
import {
  ResponseContext,
  buildKnowledgeBase,
  generateResponse,
  generateGreeting
} from './responseEngine';

// Import components (single barrel import avoids Vite per-file resolution issues)
import {
  PacketQualityMeter,
  WizardProgress,
  MessageList,
  CommandBar,
  StatusSelector,
  InputArea,
  StarterQuestions,
  RecentQueries,
  LoadingIndicator
} from './components';

import type { Message, LoadingType } from './components';

/**
 * Main SabbiRoc Component - Enhanced
 */
export const SabbiRoc: React.FC = () => {
  // ===== STATE MANAGEMENT =====

  // UI State
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(() => {
    try {
      const saved = localStorage.getItem('sabbiRoc_minimized');
      return saved ? JSON.parse(saved) : false;
    } catch {
      return false;
    }
  });
  const [packetMeterExpanded, setPacketMeterExpanded] = useState(() => {
    try {
      const saved = localStorage.getItem('sabbiRoc_packetMeterExpanded');
      return saved ? JSON.parse(saved) : false;
    } catch {
      return false;
    }
  });

  // Messages
  const [messages, setMessages] = useState<Message[]>([
    {
      text: generateGreeting(),
      sender: 'sabbi',
      timestamp: new Date()
    }
  ]);

  // Input
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [loadingType, setLoadingType] = useState<LoadingType>('typing');
  const [loadingMessage, setLoadingMessage] = useState<string>('');

  // Borrower status
  const [borrowerStatus, setBorrowerStatus] = useState<BorrowerStatus>('Select status');
  const [hybridMode, setHybridMode] = useState(false);

  // Wizard state
  const [wizardActive, setWizardActive] = useState(false);
  const [wizardStep, setWizardStep] = useState(0);
  const [wizardAnswers, setWizardAnswers] = useState<WizardAnswers>({});

  // Packet quality
  const [packetQuality, setPacketQuality] = useState<PacketQuality>({
    score: 0,
    label: 'Early draft',
    missing: [],
    notes: []
  });

  // Recent queries
  const [recentQueries, setRecentQueries] = useState<string[]>([]);
  const [lastPacketListMessage, setLastPacketListMessage] = useState<string>('');

  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const messageQueueRef = useRef<MessageQueue | null>(null);

  // ===== MEMOIZED VALUES =====

  // Build normalized knowledge base once
  const normalizedKB = useMemo(() => buildKnowledgeBase(), []);

  // Build conversation history for context
  const conversationHistory = useMemo(() => {
    return messages
      .filter(m => m.sender === 'user')
      .map(m => m.text)
      .join(' ');
  }, [messages]);

  // ===== EFFECTS =====

  // Initialize message queue
  useEffect(() => {
    if (!messageQueueRef.current) {
      messageQueueRef.current = createMessageQueue(
        (message) => {
          setMessages(prev => [
            ...prev,
            {
              text: message.text,
              sender: message.sender,
              timestamp: new Date()
            }
          ]);
        },
        MESSAGE_DELAYS.RESPONSE
      );
    }
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Save minimize state
  useEffect(() => {
    try {
      localStorage.setItem('sabbiRoc_minimized', JSON.stringify(isMinimized));
    } catch {
      // ignore
    }
  }, [isMinimized]);

  // Save packet meter expanded state
  useEffect(() => {
    try {
      localStorage.setItem('sabbiRoc_packetMeterExpanded', JSON.stringify(packetMeterExpanded));
    } catch {
      // ignore
    }
  }, [packetMeterExpanded]);

  // Auto-resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      const newHeight = Math.min(
        Math.max(inputRef.current.scrollHeight, UI_CONFIG.INPUT_MIN_HEIGHT),
        UI_CONFIG.INPUT_MAX_HEIGHT
      );
      inputRef.current.style.height = `${newHeight}px`;
    }
  }, [input]);

  // ===== HELPER FUNCTIONS =====

  /**
   * Add message to chat (immediate)
   */
  const addMessage = useCallback((text: string, sender: Message['sender']) => {
    setMessages(prev => [
      ...prev,
      {
        text,
        sender,
        timestamp: new Date()
      }
    ]);
  }, []);

  /**
   * Add message via queue (delayed)
   */
  const queueMessage = useCallback((text: string, sender: Message['sender'], delay?: number) => {
    messageQueueRef.current?.enqueue({ text, sender, delay });
  }, []);

  /**
   * Update recent queries
   */
  const updateRecentQueries = useCallback((query: string) => {
    setRecentQueries(prev => {
      const filtered = prev.filter(q => q !== query);
      return [query, ...filtered].slice(0, UI_CONFIG.MAX_RECENT_QUERIES);
    });
  }, []);

  /**
   * Track packet list messages
   */
  const trackPacketList = useCallback((text: string) => {
    if (looksLikePacketList(text)) {
      setLastPacketListMessage(text);
    }
  }, []);

  // ===== WIZARD FUNCTIONS =====

  /**
   * Start packet wizard
   */
  const startPacketWizard = useCallback(() => {
    setWizardActive(true);
    setWizardStep(0);
    setWizardAnswers({});
    addMessage('Starting Packet Wizard...', 'system');
    
    queueMessage(WIZARD_STEPS[0].prompt, 'sabbi', MESSAGE_DELAYS.WIZARD_NEXT);
    if (WIZARD_STEPS[0].hint) {
      queueMessage(WIZARD_STEPS[0].hint, 'system', MESSAGE_DELAYS.WIZARD_NEXT + 100);
    }
  }, [addMessage, queueMessage]);

  /**
   * Stop packet wizard
   */
  const stopPacketWizard = useCallback(() => {
    setWizardActive(false);
    addMessage('Wizard stopped. You can restart anytime with /packetwizard', 'system');
  }, [addMessage]);

  /**
   * Process wizard answer
   */
  const processWizardAnswer = useCallback((answer: string) => {
    const currentStepId = WIZARD_STEPS[wizardStep].id;
    const updatedAnswers = { ...wizardAnswers, [currentStepId]: answer };
    setWizardAnswers(updatedAnswers);

    if (wizardStep < WIZARD_STEPS.length - 1) {
      // Move to next step
      const nextStep = wizardStep + 1;
      setWizardStep(nextStep);
      
      queueMessage(WIZARD_STEPS[nextStep].prompt, 'sabbi', MESSAGE_DELAYS.WIZARD_NEXT);
      if (WIZARD_STEPS[nextStep].hint) {
        queueMessage(WIZARD_STEPS[nextStep].hint, 'system', MESSAGE_DELAYS.WIZARD_NEXT + 100);
      }
    } else {
      // Wizard complete
      setWizardActive(false);
      
      queueMessage('Wizard complete! Generating your Packet Readiness Report...', 'system', MESSAGE_DELAYS.WIZARD_COMPLETE);
      
      // Generate report with error handling
      setTimeout(async () => {
        const result = await safeAsync('Generate Packet Readiness Report', async () => {
          const quality = evaluatePacketQuality(
            updatedAnswers.documents_you_have || '',
            borrowerStatus
          );
          setPacketQuality(quality);

          return buildPacketReadinessReport(
            updatedAnswers,
            quality,
            borrowerStatus,
            generatePacketOrder(),
            generateFileNamingGuide(updatedAnswers).data || '',
            generateSubjectLine(updatedAnswers, borrowerStatus).data || ''
          );
        });

        if (result.success) {
          queueMessage(result.data!, 'sabbi', MESSAGE_DELAYS.WIZARD_COMPLETE);
        } else {
          queueMessage(`Error generating report: ${result.message}`, 'system', MESSAGE_DELAYS.WIZARD_COMPLETE);
        }
      }, MESSAGE_DELAYS.WIZARD_COMPLETE);
    }
  }, [wizardStep, wizardAnswers, borrowerStatus, queueMessage]);

  // ===== PACKET QUALITY FUNCTIONS =====

  /**
   * Handle quick scan with error handling
   */
  const handleQuickScan = useCallback(async () => {
    setIsProcessing(true);
    setLoadingType('analyzing');
    setLoadingMessage('Running quick scan...');

    const result = await safeAsync('Quick Scan', async () => {
      // Try wizard answers first
      if (wizardAnswers.documents_you_have) {
        const quality = evaluatePacketQuality(wizardAnswers.documents_you_have, borrowerStatus);
        setPacketQuality(quality);
        return `Quick scan complete.\nScore: ${quality.score}\nLevel: ${quality.label}\n\nRun /packetcheck with your full packet list for detailed analysis.`;
      }

      // Fall back to last packet list
      if (lastPacketListMessage) {
        const quality = evaluatePacketQuality(lastPacketListMessage, borrowerStatus);
        setPacketQuality(quality);
        return `Quick scan complete.\nScore: ${quality.score}\nLevel: ${quality.label}\n\nRun /packetcheck with your full packet list for detailed analysis.`;
      }

      // No data available
      return 'Quick scan tip: Complete the wizard first (/packetwizard) or send me your packet list, then try quick scan again.';
    });

    setIsProcessing(false);
    
    if (result.success) {
      queueMessage(result.data!, 'sabbi');
    } else {
      queueMessage(result.message, 'system');
    }
  }, [wizardAnswers, lastPacketListMessage, borrowerStatus, queueMessage]);

  /**
   * Handle full scan with error handling
   */
  const handleFullScan = useCallback(async () => {
    setIsProcessing(true);
    setLoadingType('analyzing');
    setLoadingMessage('Running full checklist scan...');

    const result = await safeAsync('Full Scan', async () => {
      const text = wizardAnswers.documents_you_have || lastPacketListMessage || '';
      
      if (!text) {
        return 'To run a full scan, send me your packet list or complete the wizard first.';
      }

      const quality = evaluatePacketQuality(text, borrowerStatus);
      setPacketQuality(quality);

      return [
        'Full checklist scan complete',
        '',
        `Score: ${quality.score}`,
        `Level: ${quality.label}`,
        '',
        quality.missing.length > 0 ? 'Missing items:' : 'No missing items detected',
        ...quality.missing.map(m => `- ${m}`),
        '',
        ...quality.notes
      ].join('\n');
    });

    setIsProcessing(false);
    
    if (result.success) {
      queueMessage(result.data!, 'sabbi');
    } else {
      queueMessage(result.message, 'system');
    }
  }, [wizardAnswers, lastPacketListMessage, borrowerStatus, queueMessage]);

  /**
   * Handle packet check command with error handling
   */
  const handlePacketCheck = useCallback(async (text: string) => {
    setIsProcessing(true);
    setLoadingType('analyzing');
    setLoadingMessage('Analyzing your packet...');

    const result = await safeAsync('Packet Check', async () => {
      const quality = evaluatePacketQuality(text, borrowerStatus);
      setPacketQuality(quality);

      return [
        'Packet quality check complete',
        '',
        `Score: ${quality.score}`,
        `Level: ${quality.label}`,
        '',
        quality.missing.length > 0 ? 'Missing items:' : 'No missing items detected',
        ...quality.missing.map(m => `- ${m}`),
        '',
        ...quality.notes
      ].join('\n');
    });

    setIsProcessing(false);
    
    if (result.success) {
      queueMessage(result.data!, 'sabbi');
    } else {
      queueMessage(result.message, 'system');
    }
  }, [borrowerStatus, queueMessage]);

  // ===== DOCUMENT GENERATION FUNCTIONS =====

  const handleGenerateLetter = useCallback(async () => {
    setIsProcessing(true);
    setLoadingType('generating');
    setLoadingMessage('Generating borrower letter...');

    const result = generateBorrowerLetter(wizardAnswers);
    
    setIsProcessing(false);
    
    if (result.success) {
      queueMessage(result.data!, 'sabbi');
    } else {
      queueMessage(result.message, 'system');
    }
  }, [wizardAnswers, queueMessage]);

  const handleGenerateEmail = useCallback(async () => {
    setIsProcessing(true);
    setLoadingType('generating');
    setLoadingMessage('Generating email template...');

    const result = generateEmailTemplate(wizardAnswers, borrowerStatus);
    
    setIsProcessing(false);
    
    if (result.success) {
      queueMessage(result.data!, 'sabbi');
    } else {
      queueMessage(result.message, 'system');
    }
  }, [wizardAnswers, borrowerStatus, queueMessage]);

  const handleGenerateCover = useCallback(async () => {
    setIsProcessing(true);
    setLoadingType('generating');
    setLoadingMessage('Generating cover page...');

    const result = generateCoverPage(wizardAnswers, borrowerStatus);
    
    setIsProcessing(false);
    
    if (result.success) {
      queueMessage(result.data!, 'sabbi');
    } else {
      queueMessage(result.message, 'system');
    }
  }, [wizardAnswers, borrowerStatus, queueMessage]);

  const handleGenerateSubject = useCallback(async () => {
    setIsProcessing(true);
    setLoadingType('generating');

    const result = generateSubjectLine(wizardAnswers, borrowerStatus);
    
    setIsProcessing(false);
    
    if (result.success) {
      const subject = result.data!;
      queueMessage(`Email subject line:\n\n${subject}`, 'sabbi');
      
      // Copy to clipboard with error handling
      const copyResult = await copyToClipboard(subject);
      if (copyResult.success) {
        queueMessage(copyResult.message, 'system', 500);
      } else {
        queueMessage(`Unable to copy: ${copyResult.message}`, 'system', 500);
      }
    } else {
      queueMessage(result.message, 'system');
    }
  }, [wizardAnswers, borrowerStatus, queueMessage]);

  // ===== MESSAGE HANDLING =====

  /**
   * Handle send message with comprehensive error handling
   */
  const handleSendMessage = useCallback(async () => {
    if (!input.trim() || isProcessing) return;

    const userInput = input.trim();
    setInput('');
    addMessage(userInput, 'user');
    updateRecentQueries(userInput);
    trackPacketList(userInput);

    const normalized = normalize(userInput);

    // Check for wizard commands BEFORE processing
    if (normalized === 'packetwizard') {
      startPacketWizard();
      return;
    }

    if (normalized === 'stopwizard') {
      stopPacketWizard();
      return;
    }

    // If wizard is active, process as wizard answer
    if (wizardActive) {
      processWizardAnswer(userInput);
      return;
    }

    // Check for packet check command
    if (normalized.startsWith('packetcheck')) {
      const content = userInput.replace(/^\/packetcheck\s*/i, '');
      if (content) {
        await handlePacketCheck(content);
      } else {
        await handleQuickScan();
      }
      return;
    }

    // Generate response with error handling
    setIsProcessing(true);
    setLoadingType('typing');
    setLoadingMessage('');

    const result = await safeAsync('Generate Response', async () => {
      const context: ResponseContext = {
        input: userInput,
        borrowerStatus,
        wizardAnswers,
        conversationHistory
      };

      return generateResponse(context);
    });

    setIsProcessing(false);
    
    if (result.success) {
      queueMessage(result.data!, 'sabbi', MESSAGE_DELAYS.RESPONSE);
    } else {
      queueMessage(`Error: ${result.message}`, 'system', MESSAGE_DELAYS.RESPONSE);
    }
  }, [
    input,
    isProcessing,
    wizardActive,
    borrowerStatus,
    wizardAnswers,
    conversationHistory,
    addMessage,
    updateRecentQueries,
    trackPacketList,
    startPacketWizard,
    stopPacketWizard,
    processWizardAnswer,
    handlePacketCheck,
    handleQuickScan,
    queueMessage
  ]);

  /**
   * Handle key down in input
   */
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
      }
    },
    [handleSendMessage]
  );

  /**
   * Handle command click
   */
  const handleCommandClick = useCallback(
    (command: string) => {
      setInput(command);
      setTimeout(() => {
        handleSendMessage();
      }, 100);
    },
    [handleSendMessage]
  );

  /**
   * Handle copy message with robust clipboard utility
   */
  const handleCopyMessage = useCallback(async (text: string) => {
    const result = await copyToClipboard(text);
    
    if (result.success) {
      addMessage(result.message, 'system');
    } else {
      addMessage(`Copy failed: ${result.message}`, 'system');
    }
  }, [addMessage]);

  // ===== RENDER =====

  return (
    <div className={`fixed z-50 bottom-6 right-6 ${isOpen ? 'max-sm:inset-0 max-sm:bottom-0 max-sm:right-0' : ''}`}>
      {!isOpen ? (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="group relative bg-white dark:bg-dark-bg-secondary shadow-lg border border-gray-300 dark:border-dark-border rounded-full p-2 hover:shadow-2xl hover:-translate-y-1 hover:ring-2 hover:ring-od-green dark:hover:ring-dark-od-green transition-all duration-300"
          aria-label="Open Sabbi ROC chat"
          title="Ask Sabbi ROC about Collateral Release"
        >
          <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md bg-flat-gold/20 pointer-events-none" />
          <div className="relative w-10 h-10 rounded-full bg-od-green flex items-center justify-center text-white">
            <Bot className="w-5 h-5" />
          </div>
        </button>
      ) : (
        <div
          role="dialog"
          aria-label="Sabbi ROC chat"
          aria-modal="true"
          className={`
            ${isMinimized
              ? 'w-[450px] h-[700px] max-md:w-[calc(100vw-32px)] max-md:h-[calc(100vh-120px)]'
              : 'w-[90vw] h-[90vh] max-w-[1400px] max-h-[900px] min-w-[360px] min-h-[600px] max-md:w-[calc(100vw-32px)] max-md:h-[calc(100vh-120px)]'
            }
            max-sm:!w-full max-sm:!h-full max-sm:!max-w-none max-sm:!max-h-none max-sm:!min-w-0 max-sm:!min-h-0 max-sm:!rounded-none
            max-h-[calc(100vh-100px)]
            bg-white dark:bg-dark-bg-secondary
            border border-gray-300 dark:border-dark-border
            shadow-2xl rounded-2xl overflow-hidden
            transition-all duration-300 flex flex-col
          `}
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
                  <h2 className="font-orbitron text-lg font-bold">Sabbi 3.1</h2>
                  <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-white/15 border border-white/20">
                    <Sparkles className="w-3 h-3" />
                    Premium
                  </span>
                </div>
                <p className="text-xs text-white/80 font-inter">Collateral Release Specialist</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-2 rounded-lg text-white/90 hover:text-white hover:bg-white/10 transition-colors max-md:hidden"
                aria-label={isMinimized ? "Maximize chat" : "Minimize chat"}
                title={isMinimized ? "Maximize" : "Minimize"}
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg text-white/90 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close Sabbi ROC chat"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-30" />
          </div>

          {/* Content Area - Scrollable */}
          <div className="flex-1 flex flex-col overflow-hidden bg-gray-50 dark:bg-dark-bg-primary">

      {/* Status Selector - Hidden on mobile */}
      <div className="max-md:hidden">
        <StatusSelector
          status={borrowerStatus}
          hybridMode={hybridMode}
          onStatusChange={setBorrowerStatus}
          onHybridModeToggle={() => setHybridMode(!hybridMode)}
        />
      </div>

      {/* Wizard Progress - Hidden on mobile */}
      <div className="max-md:hidden">
        <WizardProgress
          currentStep={wizardStep}
          totalSteps={WIZARD_STEPS.length}
          isActive={wizardActive}
        />
      </div>

      {/* Packet Quality Meter - Hidden on mobile - Collapsible */}
      <div className="max-md:hidden border-b border-gray-200 dark:border-dark-border">
        {!packetMeterExpanded ? (
          <button
            type="button"
            onClick={() => setPacketMeterExpanded(true)}
            className="w-full p-3 bg-gray-50 dark:bg-dark-bg-primary hover:bg-gray-100 dark:hover:bg-dark-bg-tertiary transition-colors flex items-center justify-between group"
          >
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Packet Quality Tools
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                (Click to expand)
              </span>
            </div>
            <svg
              className="w-4 h-4 text-gray-500 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-300 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        ) : (
          <div className="p-4 bg-gray-50 dark:bg-dark-bg-primary">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Packet Quality Tools
                </span>
              </div>
              <button
                type="button"
                onClick={() => setPacketMeterExpanded(false)}
                className="p-1 rounded hover:bg-gray-200 dark:hover:bg-dark-bg-tertiary transition-colors"
                aria-label="Collapse packet quality tools"
              >
                <X className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </button>
            </div>
            <PacketQualityMeter
              quality={packetQuality}
              onQuickScan={handleQuickScan}
              onFullScan={handleFullScan}
              onStartWizard={startPacketWizard}
              onGenerateCover={handleGenerateCover}
              onGenerateSubject={handleGenerateSubject}
            />
          </div>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-dark-bg-primary transition-colors duration-300">
        <MessageList
          messages={messages}
          isProcessing={false}
          onCopy={handleCopyMessage}
          messagesEndRef={messagesEndRef}
        />
        
        {/* Enhanced Loading Indicator */}
        {isProcessing && (
          <LoadingIndicator type={loadingType} message={loadingMessage} />
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Recent Queries - Hidden on mobile */}
      <div className="max-md:hidden">
        <RecentQueries
          queries={recentQueries}
          onQueryClick={(query) => {
            setInput(query);
            setTimeout(handleSendMessage, 100);
          }}
        />
      </div>

      {/* Command Bar - Hidden on mobile */}
      <div className="max-md:hidden">
        <CommandBar onCommandClick={handleCommandClick} />
      </div>

      {/* Starter Questions */}
      <StarterQuestions
        show={messages.length <= 1}
        onQuestionClick={(question) => {
          setInput(question);
          setTimeout(handleSendMessage, 100);
        }}
      />

      {/* Input Area */}
      <InputArea
        value={input}
        onChange={setInput}
        onSend={handleSendMessage}
        onKeyDown={handleKeyDown}
        inputRef={inputRef}
        disabled={isProcessing}
        onClose={() => setIsOpen(false)}
      />
          </div>
        </div>
      )}
    </div>
  );
};

export default SabbiRoc;