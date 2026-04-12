import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowLeft, Sun, Moon, ChevronRight, LayoutGrid } from 'lucide-react';

/* ──────────────────────────────────────────────
   THEME SYSTEM
   ────────────────────────────────────────────── */

const THEMES = {
  dark: {
    '--bg-primary': '#0e100c',
    '--bg-secondary': 'rgba(20, 24, 16, 0.65)',
    '--bg-card': 'rgba(22, 26, 18, 0.7)',
    '--bg-card-hover': 'rgba(30, 36, 24, 0.82)',
    '--bg-hero': 'linear-gradient(170deg, rgba(40,52,28,0.85) 0%, rgba(14,16,12,0.98) 100%)',
    '--border-primary': 'rgba(200, 168, 78, 0.08)',
    '--border-hover': 'rgba(200, 168, 78, 0.32)',
    '--border-gold': 'rgba(200, 168, 78, 0.2)',
    '--text-primary': '#eaf0e4',
    '--text-secondary': '#8a9878',
    '--text-muted': '#5a6a4e',
    '--accent-green': '#7ea85e',
    '--accent-gold': '#cda349',
    '--accent-gold-dim': 'rgba(200,168,78,0.15)',
    '--glass-blur': 'blur(28px)',
    '--shadow-card': '0 4px 40px rgba(0,0,0,0.25)',
    '--shadow-card-hover': '0 28px 72px rgba(0,0,0,0.4)',
    '--shadow-gold': '0 0 60px rgba(200,168,78,0.08)',
    '--grid-opacity': '0.025',
    '--particle-opacity': '0.2',
    '--overlay-green': 'rgba(74,120,54,0.06)',
    '--overlay-gold': 'rgba(200,168,78,0.03)',
    '--badge-grant': 'rgba(200,168,78,0.15)',
    '--badge-grant-text': '#cda349',
    '--badge-ai': 'rgba(100,160,220,0.15)',
    '--badge-ai-text': '#7ab4e0',
    '--badge-startup': 'rgba(120,180,100,0.15)',
    '--badge-startup-text': '#8acc78',
    '--badge-learning': 'rgba(180,120,200,0.15)',
    '--badge-learning-text': '#c895e0',
  },
  light: {
    '--bg-primary': '#f6f4ef',
    '--bg-secondary': 'rgba(255, 255, 255, 0.75)',
    '--bg-card': 'rgba(255, 255, 255, 0.8)',
    '--bg-card-hover': 'rgba(255, 255, 255, 0.95)',
    '--bg-hero': 'linear-gradient(170deg, #344522 0%, #1e2a16 100%)',
    '--border-primary': 'rgba(200, 168, 78, 0.12)',
    '--border-hover': 'rgba(200, 168, 78, 0.38)',
    '--border-gold': 'rgba(200, 168, 78, 0.2)',
    '--text-primary': '#1a2e12',
    '--text-secondary': '#5a6b52',
    '--text-muted': '#8a9680',
    '--accent-green': '#4a7836',
    '--accent-gold': '#9a7a28',
    '--accent-gold-dim': 'rgba(200,168,78,0.1)',
    '--glass-blur': 'blur(22px)',
    '--shadow-card': '0 4px 28px rgba(0,0,0,0.07)',
    '--shadow-card-hover': '0 24px 56px rgba(0,0,0,0.13)',
    '--shadow-gold': '0 0 48px rgba(200,168,78,0.06)',
    '--grid-opacity': '0.035',
    '--particle-opacity': '0.12',
    '--overlay-green': 'rgba(74,120,54,0.03)',
    '--overlay-gold': 'rgba(200,168,78,0.02)',
    '--badge-grant': 'rgba(180,140,20,0.12)',
    '--badge-grant-text': '#8a6a10',
    '--badge-ai': 'rgba(50,120,200,0.1)',
    '--badge-ai-text': '#3070b0',
    '--badge-startup': 'rgba(60,140,60,0.1)',
    '--badge-startup-text': '#3a8a3a',
    '--badge-learning': 'rgba(140,60,180,0.1)',
    '--badge-learning-text': '#8040b0',
  },
};

/* ──────────────────────────────────────────────
   AMBIENT GRID
   ────────────────────────────────────────────── */

function PremiumGrid() {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      overflow: 'hidden',
      pointerEvents: 'none',
      zIndex: 0,
      opacity: 'var(--grid-opacity)',
    }}>
      <svg width="100%" height="100%">
        <defs>
          <pattern id="rcGrid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="var(--accent-gold)" strokeWidth="0.4" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#rcGrid)" />
      </svg>
    </div>
  );
}

/* ──────────────────────────────────────────────
   TYPES
   ────────────────────────────────────────────── */

type BadgeType = 'GRANT' | 'AI TOOL' | 'STARTUP PROGRAM' | 'LEARNING';

type ResourceCard = {
  name: string;
  url: string;
  description: string;
  keyDetail: string;
  badge: BadgeType;
};

type Section = {
  title: string;
  subtitle: string;
  cards: ResourceCard[];
};

/* ──────────────────────────────────────────────
   DATA
   ────────────────────────────────────────────── */

const SECTIONS: Section[] = [
  {
    title: 'Small Business Grants',
    subtitle: 'Hand-verified grant programs accepting applications from U.S. small businesses.',
    cards: [
      {
        name: 'Grants.gov',
        url: 'https://www.grants.gov',
        description: "The federal government's central database for all grant opportunities across every agency. Search thousands of listings by category, keyword, or eligibility. Essential starting point for any business exploring government funding.",
        keyDetail: 'Federal grant search engine — free to use',
        badge: 'GRANT',
      },
      {
        name: 'SBA Grant Programs',
        url: 'https://www.sba.gov/funding-programs/grants',
        description: "The U.S. Small Business Administration's official grants page covering SBIR, STTR, STEP exporting grants, Made in America manufacturing grants, and grants to community organizations promoting entrepreneurship. SBA does not offer general startup grants but funds R&D and export-focused businesses.",
        keyDetail: 'Federal R&D and export grant programs',
        badge: 'GRANT',
      },
      {
        name: 'Amber Grant for Women',
        url: 'https://ambergrantsforwomen.com',
        description: 'Awards $10,000 monthly to women-owned businesses, plus an additional $25,000 annual prize from the monthly pool. One of the longest-running and most accessible grants for female entrepreneurs. Simple application process.',
        keyDetail: '$10,000 monthly + $25,000 annual prize',
        badge: 'GRANT',
      },
      {
        name: 'FedEx Small Business Grant Contest',
        url: 'https://www.fedex.com/en-us/small-business/grant-contest.html',
        description: 'Annual grant contest awarding grants from $15,000 to $50,000 to innovative small businesses across the U.S. Winners are selected through a combination of public voting and judge evaluation. Strong community engagement component.',
        keyDetail: '$15,000 to $50,000 per award',
        badge: 'GRANT',
      },
      {
        name: 'Intuit QuickBooks Small Business Hero Program',
        url: 'https://quickbooks.intuit.com/offers/small-business-hero-program/',
        description: 'Quarterly program awarding $20,000 grants to small businesses demonstrating courage, perseverance, and integrity. Winners also receive social media promotion and free access to QuickBooks and Mailchimp services. Must be nominated by someone other than the business owner.',
        keyDetail: '$20,000 quarterly grants + free software',
        badge: 'GRANT',
      },
      {
        name: 'Comcast RISE',
        url: 'https://www.comcastrise.com',
        description: 'Annual program supporting small businesses with consulting services, media production, technology upgrades, and monetary grants. Over 14,000 small businesses have benefited since launch. Focuses on underrepresented business owners.',
        keyDetail: 'Grants + marketing + tech upgrades',
        badge: 'GRANT',
      },
      {
        name: 'Spectrum Reach Pay It Forward',
        url: 'https://spectrumreachpayitforward.com',
        description: 'Provides free advertising campaigns worth up to $15,000 including TV and streaming ads, a custom 30-second commercial, marketing consultation, mentoring, and educational resources. Over $50 million invested in 2,500+ small businesses since 2021. Must operate in a Spectrum Reach market.',
        keyDetail: 'Up to $15,000 in free advertising + mentorship',
        badge: 'GRANT',
      },
      {
        name: 'American Express Shop Small Grants (via Main Street America)',
        url: 'https://www.mainstreet.org',
        description: 'Partners with Main Street America to offer $20,000 grants to eligible small businesses that support their local communities. Grant funds must be used for growth, innovation, or community impact projects. Requires a project proposal that can be completed within six months.',
        keyDetail: '$20,000 grants for community-focused businesses',
        badge: 'GRANT',
      },
    ],
  },
  {
    title: 'AI & Tech Tools for Small Business',
    subtitle: 'Vetted AI and technology platforms that give small teams enterprise-level capabilities.',
    cards: [
      {
        name: 'ChatGPT (OpenAI)',
        url: 'https://chat.openai.com',
        description: 'The most widely used AI assistant for business. Handles drafting, research, analysis, customer communications, brainstorming, and coding assistance. Free tier available; paid plans unlock advanced reasoning, voice, and deep research capabilities.',
        keyDetail: 'Free tier available; paid plans from $20/mo',
        badge: 'AI TOOL',
      },
      {
        name: 'Claude (Anthropic)',
        url: 'https://claude.ai',
        description: 'Advanced AI assistant excelling at long-form analysis, document review, coding, and nuanced business strategy. Strong safety profile and extended context window for processing large documents. Free tier plus Pro plan for heavier usage.',
        keyDetail: 'Free tier + Pro plan for extended capabilities',
        badge: 'AI TOOL',
      },
      {
        name: 'Canva',
        url: 'https://www.canva.com',
        description: 'All-in-one design platform with AI-powered tools for creating social media graphics, presentations, marketing materials, logos, and video content. No design experience needed. Free plan covers core features; Pro unlocks brand kits and premium assets.',
        keyDetail: 'Free plan available; Pro from $15/mo',
        badge: 'AI TOOL',
      },
      {
        name: 'Zapier',
        url: 'https://zapier.com',
        description: 'Automation platform connecting 7,000+ apps to automate repetitive workflows without coding. AI enhancements let you build natural-language workflows that move data between CRMs, email, support tools, and internal systems. Massive time saver for lean teams.',
        keyDetail: 'Free tier for basic automations; paid plans scale with usage',
        badge: 'AI TOOL',
      },
      {
        name: 'Notion',
        url: 'https://www.notion.so',
        description: 'All-in-one workspace combining docs, wikis, project management, and databases. Built-in AI assistant helps with writing, summarization, and organizing information. Replaces multiple separate tools. Free for personal use; team plans affordable.',
        keyDetail: 'Free personal plan; team plans from $10/user/mo',
        badge: 'AI TOOL',
      },
      {
        name: 'ClickUp',
        url: 'https://clickup.com',
        description: 'Project management platform with AI features for task management, docs, goal tracking, and sprint planning. AI assistant generates summaries, writes task descriptions, and suggests workflow improvements. Consolidates scattered tools into one system.',
        keyDetail: 'Free tier available; paid from $7/user/mo',
        badge: 'AI TOOL',
      },
      {
        name: 'Grammarly',
        url: 'https://www.grammarly.com',
        description: "AI writing assistant that checks grammar, tone, clarity, and style across emails, documents, and web content. Business tier adds brand voice consistency and team analytics. Essential for professional communications when you don't have an editor on staff.",
        keyDetail: 'Free basic plan; Business plans available',
        badge: 'AI TOOL',
      },
      {
        name: 'HubSpot CRM',
        url: 'https://www.hubspot.com/products/crm',
        description: 'Free CRM platform with AI-powered contact management, email marketing, sales pipeline tracking, and customer service tools. Scales from solo founders to enterprise teams. Free tier is genuinely full-featured for small businesses.',
        keyDetail: 'Free CRM forever; paid hubs for advanced features',
        badge: 'AI TOOL',
      },
      {
        name: 'Upmetrics',
        url: 'https://upmetrics.co',
        description: 'AI-powered business planning software for creating professional business plans, financial forecasts, and investor-ready pitch decks. Guided workflows help first-time entrepreneurs through the planning process step by step.',
        keyDetail: 'Plans from $7/mo; AI-generated business plans',
        badge: 'AI TOOL',
      },
      {
        name: 'Zendesk for Startups',
        url: 'https://www.zendesk.com/startups/',
        description: 'Customer service platform offering qualifying startups 6 months free access to the full Zendesk Suite for up to 50 agents. Includes support, chat, talk, guide, and CRM tools. Also provides office hours, community access, and educational resources.',
        keyDetail: '6 months free for qualifying startups',
        badge: 'AI TOOL',
      },
      {
        name: 'AdCreative.ai',
        url: 'https://www.adcreative.ai',
        description: 'AI-powered ad creative generator that produces professional ad visuals and copy for Facebook, Google, and other platforms. Input your brand assets and it generates dozens of variations for A/B testing. Connects directly to ad accounts for seamless deployment.',
        keyDetail: 'AI-generated ad creatives for rapid testing',
        badge: 'AI TOOL',
      },
      {
        name: 'Bolt.new',
        url: 'https://bolt.new',
        description: 'AI-powered full-stack web development platform that lets you build, edit, and deploy web applications directly in your browser using natural language prompts. No local setup required. Ideal for MVPs, landing pages, and internal tools.',
        keyDetail: 'Build and deploy web apps with AI — no local setup',
        badge: 'AI TOOL',
      },
    ],
  },
  {
    title: 'Startup Programs & Free Credits',
    subtitle: 'Accelerator programs and cloud credit offerings that lower your cost of building.',
    cards: [
      {
        name: 'AWS Activate',
        url: 'https://aws.amazon.com/activate/',
        description: 'Amazon Web Services startup program offering $1,000 to $100,000+ in cloud credits depending on stage and partner affiliations. Includes technical support, training, and architectural guidance. Essential for any startup building on cloud infrastructure.',
        keyDetail: '$1K–$100K+ in cloud credits',
        badge: 'STARTUP PROGRAM',
      },
      {
        name: 'Google Cloud for Startups',
        url: 'https://cloud.google.com/startup',
        description: "Google's startup program offering up to $200K in cloud and Firebase credits over 2 years (up to $350K for AI companies). Includes access to startup experts, technical training, and Google-wide resources.",
        keyDetail: 'Up to $200K–$350K in cloud credits over 2 years',
        badge: 'STARTUP PROGRAM',
      },
      {
        name: 'Microsoft for Startups (Founders Hub)',
        url: 'https://www.microsoft.com/en-us/startups',
        description: 'Free program providing up to $150K in Azure credits, access to OpenAI models, GitHub Enterprise, and Microsoft 365. No funding required to apply. Includes mentorship and technical guidance.',
        keyDetail: 'Up to $150K in Azure credits + OpenAI access',
        badge: 'STARTUP PROGRAM',
      },
      {
        name: 'HubSpot for Startups',
        url: 'https://www.hubspot.com/startups',
        description: "Up to 90% off HubSpot's CRM, marketing, sales, and service hubs for your first year. Also provides access to partner perks including AWS credits, Stripe fee waivers, and educational resources. Must be affiliated with an approved partner.",
        keyDetail: 'Up to 90% off first year + partner perks',
        badge: 'STARTUP PROGRAM',
      },
      {
        name: 'Stripe Atlas',
        url: 'https://stripe.com/atlas',
        description: 'Business incorporation service that helps you form a Delaware C-Corp or LLC, get a business bank account, and access tax/legal guidance. Also unlocks partner perks including discounts on AWS, Notion, and other startup tools.',
        keyDetail: 'Incorporation + partner perks ecosystem',
        badge: 'STARTUP PROGRAM',
      },
      {
        name: 'Notion for Startups',
        url: 'https://www.notion.so/startups',
        description: "Six months free of Notion's Plus plan (normally $10/user/mo). Includes unlimited AI, blocks, file uploads, and advanced permissions. Available through Notion directly or via partner programs like Stripe Atlas.",
        keyDetail: '6 months free of Plus plan',
        badge: 'STARTUP PROGRAM',
      },
      {
        name: 'Supabase for Startups',
        url: 'https://supabase.com/partners/integrations',
        description: 'Up to $25,000 in credits for backend development including database, authentication, storage, and edge functions. Open-source Firebase alternative popular with developers building modern web and mobile apps.',
        keyDetail: 'Up to $25,000 in Supabase credits',
        badge: 'STARTUP PROGRAM',
      },
      {
        name: 'Mixpanel for Startups',
        url: 'https://mixpanel.com/startups/',
        description: "One year free of Mixpanel's Growth plan including product analytics, session replay, and A/B testing. Helps startups understand user behavior without building analytics infrastructure from scratch.",
        keyDetail: '1 year free of Growth plan',
        badge: 'STARTUP PROGRAM',
      },
    ],
  },
  {
    title: 'Business Development & Learning',
    subtitle: 'Free and low-cost education, mentorship, and training programs for business owners.',
    cards: [
      {
        name: 'SBA Learning Center',
        url: 'https://www.sba.gov/learning-center',
        description: 'Free online courses from the U.S. Small Business Administration covering business planning, funding, marketing, cybersecurity, government contracting, and more. Self-paced modules designed for entrepreneurs at every stage.',
        keyDetail: '100% free courses from the SBA',
        badge: 'LEARNING',
      },
      {
        name: 'SCORE Mentorship',
        url: 'https://www.score.org',
        description: 'Free mentoring and education for small business owners through a network of 10,000+ volunteer business mentors. Offers one-on-one mentoring, workshops, webinars, and local chapter events. A resource partner of the SBA.',
        keyDetail: 'Free 1-on-1 mentoring + workshops',
        badge: 'LEARNING',
      },
      {
        name: 'Verizon Digital Ready',
        url: 'https://www.verizon.com/about/digital-ready',
        description: 'Free program providing digital skills training, business courses, and coaching for small business owners. Completing courses can unlock eligibility for grant opportunities. Covers topics from social media marketing to cybersecurity.',
        keyDetail: 'Free digital skills training + grant eligibility',
        badge: 'LEARNING',
      },
      {
        name: 'Coursera for Business',
        url: 'https://www.coursera.org/business',
        description: 'Access to courses from top universities and companies in business strategy, data analytics, marketing, finance, and leadership. Many individual courses are free to audit. Business plans available for team training.',
        keyDetail: 'Free course audits; Business plans for teams',
        badge: 'LEARNING',
      },
      {
        name: 'U.S. Chamber of Commerce CO—',
        url: 'https://www.uschamber.com/co',
        description: 'Free resource hub from the U.S. Chamber of Commerce covering starting, running, and growing a business. Includes grant directories, expert guides, financial tools, and regulatory updates specifically for small businesses.',
        keyDetail: 'Free guides, tools, and grant directories',
        badge: 'LEARNING',
      },
      {
        name: 'SmallBiz Recon™ Consultation',
        url: 'https://calendly.com/smallbizrecon1/30min',
        description: "Book a free 30-minute consultation with the SmallBiz Recon™ team. Whether you need help navigating SBA servicing, understanding your options on a COVID EIDL loan, or building a strategy for your small business — we're here to help.",
        keyDetail: 'Free 30-minute consultation — book now',
        badge: 'LEARNING',
      },
    ],
  },
];

/* ──────────────────────────────────────────────
   BADGE STYLES
   ────────────────────────────────────────────── */

function getBadgeVars(badge: BadgeType): { bg: string; color: string } {
  switch (badge) {
    case 'GRANT':
      return { bg: 'var(--badge-grant)', color: 'var(--badge-grant-text)' };
    case 'AI TOOL':
      return { bg: 'var(--badge-ai)', color: 'var(--badge-ai-text)' };
    case 'STARTUP PROGRAM':
      return { bg: 'var(--badge-startup)', color: 'var(--badge-startup-text)' };
    case 'LEARNING':
      return { bg: 'var(--badge-learning)', color: 'var(--badge-learning-text)' };
  }
}

/* ──────────────────────────────────────────────
   ANIMATED CARD
   ────────────────────────────────────────────── */

function ResourceCardItem({ card, delay = 0 }: { card: ResourceCard; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const badgeStyle = getBadgeVars(card.badge);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        background: hovered ? 'var(--bg-card-hover)' : 'var(--bg-card)',
        border: `1px solid ${hovered ? 'var(--border-hover)' : 'var(--border-primary)'}`,
        borderRadius: 20,
        padding: '28px',
        display: 'flex',
        flexDirection: 'column',
        gap: 0,
        backdropFilter: 'var(--glass-blur)',
        WebkitBackdropFilter: 'var(--glass-blur)',
        boxShadow: hovered ? 'var(--shadow-card-hover)' : 'var(--shadow-card)',
        transform: visible
          ? hovered ? 'translateY(-4px) scale(1.02)' : 'translateY(0) scale(1)'
          : 'translateY(24px)',
        opacity: visible ? 1 : 0,
        transition: `transform 0.55s cubic-bezier(0.23,1,0.32,1) ${delay}ms, opacity 0.55s ease ${delay}ms, box-shadow 0.3s ease, background 0.3s ease, border-color 0.3s ease`,
        cursor: 'default',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
        <span style={{
          display: 'inline-block',
          padding: '4px 10px',
          borderRadius: 8,
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: '0.08em',
          fontFamily: "'JetBrains Mono', 'Fira Mono', monospace",
          background: badgeStyle.bg,
          color: badgeStyle.color,
        }}>
          {card.badge}
        </span>
      </div>

      <h3 style={{
        fontFamily: "'Instrument Serif', Georgia, serif",
        fontSize: '1.2rem',
        color: 'var(--accent-gold)',
        margin: '0 0 10px',
        lineHeight: 1.3,
      }}>
        {card.name}
      </h3>

      <p style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: '0.92rem',
        color: 'var(--text-secondary)',
        lineHeight: 1.65,
        margin: '0 0 14px',
        flex: 1,
      }}>
        {card.description}
      </p>

      <p style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: '0.88rem',
        fontStyle: 'italic',
        color: 'var(--text-muted)',
        margin: '0 0 20px',
        lineHeight: 1.4,
      }}>
        {card.keyDetail}
      </p>

      <a
        href={card.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Visit ${card.name} — opens in new tab`}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          padding: '11px 20px',
          borderRadius: 12,
          fontSize: '0.88rem',
          fontWeight: 600,
          fontFamily: "'DM Sans', sans-serif",
          color: 'var(--accent-gold)',
          border: '1px solid var(--border-gold)',
          background: 'var(--accent-gold-dim)',
          textDecoration: 'none',
          transition: 'all 0.25s ease',
          alignSelf: 'flex-start',
          marginTop: 'auto',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(200,168,78,0.22)';
          e.currentTarget.style.borderColor = 'var(--border-hover)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'var(--accent-gold-dim)';
          e.currentTarget.style.borderColor = 'var(--border-gold)';
        }}
      >
        Visit Resource
        <ExternalLink size={13} />
      </a>
    </div>
  );
}

/* ──────────────────────────────────────────────
   GOLD DIVIDER
   ────────────────────────────────────────────── */

function GoldDivider() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, margin: '16px 0 8px' }}>
      <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, transparent, var(--border-gold))' }} />
      <div style={{
        width: 6, height: 6, borderRadius: '50%',
        background: 'var(--accent-gold)', opacity: 0.5,
      }} />
      <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, var(--border-gold), transparent)' }} />
    </div>
  );
}

/* ──────────────────────────────────────────────
   SECTION HEADER
   ────────────────────────────────────────────── */

function SectionHeader({ title, subtitle, index }: { title: string; subtitle: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        textAlign: 'center',
        marginBottom: 36,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
        transition: 'all 0.6s ease',
      }}
    >
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '5px 14px',
        borderRadius: 100,
        background: 'var(--accent-gold-dim)',
        border: '1px solid var(--border-gold)',
        marginBottom: 16,
      }}>
        <span style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.1em',
          fontFamily: "'JetBrains Mono', monospace",
          color: 'var(--accent-gold)',
        }}>
          0{index + 1}
        </span>
      </div>
      <h2 style={{
        fontFamily: "'Instrument Serif', Georgia, serif",
        fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
        color: 'var(--text-primary)',
        margin: '0 0 12px',
        letterSpacing: '-0.01em',
      }}>
        {title}
      </h2>
      <p style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: '1rem',
        color: 'var(--text-secondary)',
        maxWidth: 560,
        margin: '0 auto',
        lineHeight: 1.6,
      }}>
        {subtitle}
      </p>
    </div>
  );
}

/* ──────────────────────────────────────────────
   MAIN PAGE
   ────────────────────────────────────────────── */

export default function ResourceCommandCenter() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const vars = THEMES[theme];

  return (
    <div
      data-theme={theme}
      style={{
        ...vars,
        minHeight: '100vh',
        background: 'var(--bg-primary)',
        fontFamily: "'DM Sans', sans-serif",
        position: 'relative',
        overflowX: 'hidden',
      } as React.CSSProperties}
    >
      <PremiumGrid />

      {/* ── Hero ── */}
      <section style={{
        background: 'linear-gradient(170deg, #2a3a1c 0%, #1c2614 40%, #111a0d 100%)',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: 88,
        paddingBottom: 72,
      }}>
        {/* Subtle radial glow */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 70% 55% at 50% 30%, rgba(200,168,78,0.06) 0%, transparent 68%)',
          pointerEvents: 'none',
        }} />

        {/* Top nav row: back link left, theme toggle right */}
        <div style={{
          maxWidth: 1120, margin: '0 auto', padding: '0 24px',
          position: 'relative', zIndex: 1,
        }}>
          <div style={{
            display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', marginBottom: 56,
          }}>
            <Link
              to="/home"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                color: 'rgba(232,237,226,0.5)', fontSize: 13,
                fontFamily: "'DM Sans', sans-serif", textDecoration: 'none',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'rgba(232,237,226,0.85)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(232,237,226,0.5)'; }}
            >
              <ArrowLeft size={14} />
              Back to Last
            </Link>

            <button
              onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 7,
                padding: '8px 16px', borderRadius: 10,
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                cursor: 'pointer', color: 'rgba(232,237,226,0.7)',
                fontSize: 13, fontWeight: 500,
                fontFamily: "'DM Sans', sans-serif",
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.color = '#eaf0e4';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                e.currentTarget.style.color = 'rgba(232,237,226,0.7)';
              }}
            >
              {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
              {theme === 'dark' ? 'Light' : 'Dark'}
            </button>
          </div>

          {/* Centered hero content */}
          <div style={{ textAlign: 'center' }}>
            {/* Icon box */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              width: 72, height: 72, borderRadius: 20,
              background: 'rgba(200,168,78,0.12)',
              border: '1px solid rgba(200,168,78,0.22)',
              marginBottom: 32,
              boxShadow: '0 8px 32px rgba(200,168,78,0.08)',
            }}>
              <LayoutGrid size={30} style={{ color: '#cda349' }} />
            </div>

            {/* Title — mixed weight treatment matching the reference */}
            <h1 style={{ margin: '0 0 20px', lineHeight: 1.1 }}>
              <span style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
                fontWeight: 600,
                color: '#eaf0e4',
                letterSpacing: '-0.01em',
              }}>
                Resource{' '}
              </span>
              <span style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
                fontStyle: 'italic',
                fontWeight: 400,
                color: '#cda349',
                letterSpacing: '-0.01em',
              }}>
                Command Center
              </span>
            </h1>

            {/* Date pill */}
            <div style={{ marginBottom: 28 }}>
              <span style={{
                display: 'inline-block',
                padding: '5px 14px',
                borderRadius: 100,
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.1)',
                fontSize: 11, fontWeight: 600,
                letterSpacing: '0.08em',
                fontFamily: "'JetBrains Mono', monospace",
                color: 'rgba(232,237,226,0.55)',
              }}>
                LAST REVIEWED MARCH 14, 2026
              </span>
            </div>

            {/* Subtitle */}
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '1.05rem',
              color: 'rgba(232,237,226,0.6)',
              lineHeight: 1.7,
              maxWidth: 560,
              margin: '0 auto 12px',
            }}>
              Verified tools, grants, and programs to help your small business compete, scale, and thrive.
            </p>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.9rem',
              color: 'rgba(232,237,226,0.38)',
              lineHeight: 1.65,
              maxWidth: 500,
              margin: '0 auto 44px',
            }}>
              SmallBiz Recon™ has hand-picked every resource on this page. All links go to verified, legitimate programs — no filler, no spam.
            </p>

            {/* Section pills */}
            <div style={{
              display: 'flex', flexWrap: 'wrap', gap: 10,
              justifyContent: 'center',
            }}>
              {SECTIONS.map((s) => (
                <span key={s.title} style={{
                  padding: '6px 16px', borderRadius: 100,
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.09)',
                  fontSize: 12, fontWeight: 500,
                  fontFamily: "'DM Sans', sans-serif",
                  color: 'rgba(232,237,226,0.48)',
                }}>
                  {s.title}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Sections ── */}
      <main
        role="main"
        style={{ maxWidth: 1120, margin: '0 auto', padding: '72px 24px 80px' }}
      >
        {SECTIONS.map((section, sIdx) => (
          <section
            key={section.title}
            aria-labelledby={`section-${sIdx}`}
            style={{ marginBottom: sIdx < SECTIONS.length - 1 ? 80 : 0 }}
          >
            {sIdx > 0 && <GoldDivider />}
            <div style={{ paddingTop: sIdx > 0 ? 48 : 0 }}>
              <SectionHeader title={section.title} subtitle={section.subtitle} index={sIdx} />
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 480px), 1fr))',
                gap: 24,
                alignItems: 'stretch',
              }}>
                {section.cards.map((card, cIdx) => (
                  <ResourceCardItem
                    key={card.name}
                    card={card}
                    delay={cIdx % 2 === 0 ? 0 : 80}
                  />
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* ── Footer CTA ── */}
        <div style={{ marginTop: 80 }}>
          <GoldDivider />
          <div style={{
            marginTop: 56,
            background: 'var(--bg-card)',
            border: '1px solid var(--border-gold)',
            borderRadius: 24,
            padding: 'clamp(40px, 6vw, 64px)',
            backdropFilter: 'var(--glass-blur)',
            WebkitBackdropFilter: 'var(--glass-blur)',
            boxShadow: 'var(--shadow-gold)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', inset: 0,
              background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(200,168,78,0.05) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h2 style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
                color: 'var(--text-primary)',
                margin: '0 0 16px',
                letterSpacing: '-0.015em',
              }}>
                Need Personalized Guidance?
              </h2>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '1rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
                maxWidth: 560,
                margin: '0 auto 36px',
              }}>
                SmallBiz Recon™ specializes in SBA loan servicing, COVID EIDL strategy, and small business consulting. Let us help you navigate the path forward.
              </p>
              <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
                <a
                  href="https://calendly.com/smallbizrecon1/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '14px 28px', borderRadius: 14,
                    background: 'linear-gradient(135deg, #c8a032, #cda349)',
                    border: '1px solid rgba(200,168,78,0.4)',
                    color: '#1a1400', fontSize: 14, fontWeight: 700,
                    fontFamily: "'DM Sans', sans-serif",
                    textDecoration: 'none',
                    transition: 'all 0.25s ease',
                    boxShadow: '0 4px 20px rgba(200,168,78,0.2)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(200,168,78,0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(200,168,78,0.2)';
                  }}
                >
                  Book Free Consultation
                  <ChevronRight size={15} />
                </a>
                <Link
                  to="/covid-eidl-toolkits"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '14px 28px', borderRadius: 14,
                    background: 'var(--accent-gold-dim)',
                    border: '1px solid var(--border-gold)',
                    color: 'var(--accent-gold)', fontSize: 14, fontWeight: 600,
                    fontFamily: "'DM Sans', sans-serif",
                    textDecoration: 'none',
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(200,168,78,0.18)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'var(--accent-gold-dim)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  Explore Our Services
                  <ChevronRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
