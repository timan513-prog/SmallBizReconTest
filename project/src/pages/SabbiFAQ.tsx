import { useState } from 'react';
import { ChevronDown, Bot } from 'lucide-react';
import EIDLStyleShell from '../components/layout/EIDLStyleShell';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const SabbiFAQ = () => {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  const faqItems: FAQItem[] = [
    {
      id: 'what-is-sabbi',
      question: 'What is Sabbi and how can it help me?',
      answer: 'Sabbi is your AI-powered SBA assistant, built with the knowledge of former SBA professionals. Think of me as your personal guide through the SBA maze—I can help you understand processes, decode requirements, and point you in the right direction. I\'m available 24/7 and I don\'t charge by the hour like those expensive consultants.'
    },
    {
      id: 'sabbi-vs-consultants',
      question: 'How is Sabbi different from hiring an SBA consultant?',
      answer: 'Simple: I\'m faster, cheaper, and available whenever you need me. While consultants charge hundreds per hour and might take days to respond, I\'m here instantly with answers based on real SBA experience. Plus, I won\'t try to upsell you on services you don\'t need. I\'m here to educate and empower, not empty your wallet.'
    },
    {
      id: 'toolkit-access',
      question: 'Do I need to buy a toolkit to access Sabbi?',
      answer: 'Yes, Sabbi 2.0 is unlocked when you purchase any of our toolkits. This isn\'t just a chatbot—I\'m context-aware and provide specialized guidance based on your specific toolkit. Think of it as getting a personal SBA expert included with your purchase. Worth every penny.'
    },
    {
      id: 'sabbi-accuracy',
      question: 'How accurate is Sabbi\'s information?',
      answer: 'My knowledge base is built on official SBA guidance and real-world experience from former SBA professionals. However, I\'m an educational tool, not a crystal ball. Always verify time-sensitive information with the SBA directly, and remember—I provide guidance, not guarantees. Use your brain, trust but verify.'
    },
    {
      id: 'subordination-help',
      question: 'Can Sabbi help with subordination requests?',
      answer: 'Absolutely! If you\'ve unlocked the Subordination Toolkit, I become your subordination specialist. I can walk you through the process, explain requirements, help you understand timelines, or fees. If you need help with other topics, please refer to your toolkit materials or contact support.'
    },
    {
      id: 'collateral-release-help',
      question: 'What about collateral release guidance?',
      answer: 'You bet! With the Collateral Release Toolkit unlocked, I\'m your go-to expert for all things collateral release. From valuation requirements to documentation checklists, I\'ve got you covered. No more guessing games or expensive consultant fees—just straight answers when you need them.'
    },
    {
      id: 'response-time',
      question: 'How quickly does Sabbi respond?',
      answer: 'Instantly. No "I\'ll get back to you in 24-48 hours" nonsense. Ask me a question, get an answer immediately. That\'s the beauty of AI—I don\'t need coffee breaks, lunch meetings, or vacation time. I\'m here when you need me, which is probably right now.'
    },
    {
      id: 'complex-questions',
      question: 'Can Sabbi handle complex SBA questions?',
      answer: 'I\'m built for complexity. Whether you\'re dealing with multi-layered subordination scenarios, intricate collateral valuations, or confusing SBA requirements, I can break it down into digestible pieces. If it\'s SBA-related and within my toolkit knowledge, I\'ve probably seen it before.'
    },
    {
      id: 'sabbi-limitations',
      question: 'What are Sabbi\'s limitations?',
      answer: 'I\'m honest about what I can and can\'t do. I don\'t file paperwork for you, I don\'t represent you to the SBA, and I can\'t guarantee outcomes. I\'m an educational tool—think of me as your knowledgeable friend who happens to know a lot about SBA processes. The rest is up to you, soldier.'
    },
    {
      id: 'multiple-toolkits',
      question: 'What if I have multiple toolkits?',
      answer: 'Even better! I adapt to whatever toolkit you\'ve unlocked. Switch between subordination and collateral release questions, and I\'ll adjust my expertise accordingly. It\'s like having multiple specialists in your back pocket, all for the price of your toolkit purchases.'
    },
    {
      id: 'sabbi-updates',
      question: 'Does Sabbi get updated with new SBA information?',
      answer: 'My knowledge base is regularly updated to reflect current SBA policies and procedures. However, the SBA changes things faster than a drill sergeant changes his mind, so always double-check time-sensitive information. I\'ll tell you when something might need verification.'
    },
    {
      id: 'technical-issues',
      question: 'What if I have technical issues with Sabbi?',
      answer: 'Technical problems? Contact our support team immediately. We don\'t mess around with tech issues—if Sabbi isn\'t working properly, we\'ll fix it fast. Your toolkit purchase includes reliable access to me, and we stand behind that promise.'
    },
    {
      id: 'sabbi-privacy',
      question: 'Is my conversation with Sabbi private?',
      answer: 'Your conversations with me are treated with the same privacy standards as the rest of the SmallBiz Recon™ platform. I\'m not gossiping about your SBA troubles or sharing your business details. Check our privacy policy for the full details, but rest assured—what you tell me stays between us.'
    },
    {
      id: 'best-practices',
      question: 'How should I best use Sabbi for maximum benefit?',
      answer: 'Be specific with your questions, provide context about your situation, and don\'t be afraid to ask follow-ups. I\'m not charging you by the question, so use me liberally. The more details you give me, the better I can tailor my guidance to your specific needs. Think of our chat as a strategy session.'
    },
    {
      id: 'sabbi-future',
      question: 'Will Sabbi expand to other SBA programs?',
      answer: 'That\'s the plan! As SmallBiz Recon™ expands into 7(a), 504, and PPP toolkits, I\'ll be right there with specialized knowledge for each program. The goal is to make me your one-stop SBA intelligence source. Stay tuned—bigger things are coming.'
    }
  ];

  return (
    <EIDLStyleShell
      title="Sabbi's FAQ"
      subtitle="Your AI-powered SBA assistant, ready to answer your questions 24/7"
      icon={<Bot size={30} color="#c8a84e" strokeWidth={1.5} />}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {faqItems.map((item) => (
          <div key={item.id} style={{
            background: "var(--bg-card)",
            backdropFilter: "var(--glass-blur)",
            WebkitBackdropFilter: "var(--glass-blur)",
            border: "1px solid var(--border-primary)",
            borderRadius: 16,
            overflow: "hidden",
            transition: "all 0.3s ease",
          }}>
            <button
              onClick={() => toggleItem(item.id)}
              style={{
                width: "100%",
                padding: "20px 24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: openItems.has(item.id) ? "var(--bg-tertiary)" : "transparent",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s ease",
                textAlign: "left",
              }}
            >
              <h3 style={{
                fontFamily: "var(--font-display)",
                fontSize: 18,
                fontWeight: 400,
                color: "var(--text-primary)",
                letterSpacing: "-0.01em",
              }}>
                {item.question}
              </h3>
              <ChevronDown
                size={20}
                color="var(--text-secondary)"
                style={{
                  flexShrink: 0,
                  marginLeft: 16,
                  transform: openItems.has(item.id) ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.3s ease",
                }}
              />
            </button>

            {openItems.has(item.id) && (
              <div style={{
                padding: "0 24px 24px",
                fontFamily: "var(--font-body)",
                fontSize: 15,
                color: "var(--text-secondary)",
                lineHeight: 1.75,
                animation: "fadeSlideUp 0.3s ease both",
              }}>
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </EIDLStyleShell>
  );
};

export default SabbiFAQ;
