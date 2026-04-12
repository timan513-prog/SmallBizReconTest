export interface SBAContact {
  id: string;
  title: string;
  phone?: string;
  email?: string;
  hours?: string;
  notes?: string;
  website?: string;
  icon: string;
}

export interface SBAContactSection {
  id: string;
  title: string;
  icon: string;
  contacts: SBAContact[];
}

export interface SBAAdvancedContact {
  id: string;
  department: string;
  phone: string;
}

export const pageMeta = {
  title: 'Government Agency Contact Navigator',
  subtitle:
    'Find the right SBA, Treasury, and IRS contact based on your loan, certification, or support needs. Information is reviewed regularly, confirm on official agency websites for the most current details.',
  lastReviewedLabel: 'Last reviewed, January 2026',
};

export const disclaimers = {
  top:
    'SmallBiz Recon™ is not affiliated with, endorsed by, or connected to the U.S. Small Business Administration (SBA), the U.S. Department of the Treasury, the Internal Revenue Service (IRS), or any other government agency mentioned on this page.',
  bottom:
    'Contact information is reviewed regularly but may change. Always verify current contact details directly on official agency websites. SmallBiz Recon™ is an independent educational resource and is not affiliated with the U.S. Small Business Administration.',
  officialLinks: [
    { label: 'SBA', url: 'https://www.sba.gov' },
    { label: 'Treasury', url: 'https://home.treasury.gov' },
    { label: 'IRS', url: 'https://www.irs.gov' },
  ],
};

export const keyNotesAndUpdates: { id: string; text: string }[] = [
  { id: 'note-1', text: 'COVID EIDL, CovidEIDLServicing@sba.gov is commonly used on borrower correspondence, CESC@sba.gov may also be used.' },
  { id: 'note-2', text: 'Hardship Accommodation Program (HAP), previously closed (March 2024).' },
  { id: 'note-3', text: 'SBA payments, SBA is moving toward electronic-only payments where applicable, confirm current payment options directly through SBA.gov.' },
  { id: 'note-4', text: 'Certifications phone, 866-443-4110 and 866-722-4357 (866-SBA-HELP) reach the same line.' },
  { id: 'note-5', text: 'MySBA Certifications, https://certifications.sba.gov/ is the primary certification platform.' },
  { id: 'note-6', text: 'IRS recommendation, start with IRS.gov for fastest service and self-service tools.' },
  { id: 'note-7', text: 'Treasury small business specialists generally cannot address personal/business tax, debt, or financial issues, they focus on government contracting procedures.' },
  { id: 'note-8', text: 'TreasuryDirect (Savings Bonds) login issues, 844-284-2676.' },
  { id: 'note-9', text: 'U.S. Mint customer service, 1-800-872-6468.' },
];

export const sbaContactSections: SBAContactSection[] = [
  {
    id: 'general-support',
    title: 'SBA General Inquiries & Support',
    icon: '📞',
    contacts: [
      {
        id: 'answer-desk',
        title: 'General Inquiries, Answer Desk',
        phone: '1-800-827-5722',
        email: 'answerdesk@sba.gov',
        hours: 'Mon–Fri, 9 a.m.–6 p.m. ET',
        notes: 'Closed all federal holidays',
        icon: '☎️',
      },
      {
        id: 'mysba-portal',
        title: 'MySBA Loan Portal (Support Only)',
        email: 'cls@sba.gov',
        website: 'https://lending.sba.gov/',
        notes: 'Support only, cannot access individual loan details or provide loan-specific assistance',
        icon: '💻',
      },
    ],
  },
  {
    id: 'loan-servicing',
    title: 'Loan Servicing & Assistance',
    icon: '💰',
    contacts: [
      {
        id: 'covid-eidl',
        title: 'COVID-19 EIDL Servicing',
        phone: '833-853-5638 (TTY: 711)',
        email: 'CovidEIDLServicing@sba.gov',
        hours: 'Mon–Fri, 8 a.m.–8 p.m. ET',
        notes: 'Alternate email, CESC@sba.gov. Fax, (202) 481-5799. Box upload available for COVID EIDL Servicing Center. HAP previously closed (March 2024).',
        icon: '🦠',
      },
      {
        id: 'disaster-loans',
        title: 'Disaster Loans (Non-COVID)',
        phone: '800-659-2955 (TTY: 7-1-1)',
        email: 'disastercustomerservice@sba.gov',
        hours: 'Mon–Fri, 8 a.m.–8 p.m. ET',
        notes: 'SBA Processing and Disbursement Center, 14925 Kingsport Road, Fort Worth, TX 76155',
        icon: '🌪️',
      },
      {
        id: 'ppp-forgiveness',
        title: 'PPP Direct Forgiveness Portal',
        phone: '877-552-2692',
        hours: 'Mon–Fri, 8 a.m.–8 p.m. ET',
        notes: 'Direct forgiveness applicants only, all other PPP questions go to your lender',
        icon: '📋',
      },
      {
        id: 'svog',
        title: 'Shuttered Venue Operators Grant (SVOG)',
        phone: '800-659-2955 (TTY: 7-1-1)',
        hours: 'Mon–Fri, 8 a.m.–11 p.m. ET',
        notes: 'No longer accepting new applications',
        icon: '🎭',
      },
      {
        id: 'rrf',
        title: 'Restaurant Revitalization Fund (RRF)',
        phone: '844-279-8898',
        notes: 'Post-award portal assistance only',
        icon: '🍽️',
      },
    ],
  },
  {
    id: 'certifications-programs',
    title: 'Certifications & Business Programs',
    icon: '🏆',
    contacts: [
      {
        id: 'certifications',
        title: '8(a), HUBZone, WOSB, VOSB Certifications',
        phone: '866-443-4110 (also 866-722-4357)',
        email: 'certifications@sba.gov',
        notes: '8(a), 8aquestions@sba.gov. WOSB, wosb@sba.gov. HUBZone, hubzone@sba.gov. Portal, https://certifications.sba.gov/',
        icon: '🏅',
      },
      {
        id: 'certify-help',
        title: 'Certify.SBA.gov Tech Support',
        email: 'help@certify.sba.gov',
        hours: 'Mon–Fri, 8 a.m.–8 p.m. ET',
        icon: '🔧',
      },
      {
        id: 'mentor-protege',
        title: 'Mentor-Protégé Program',
        email: 'sbampp@sba.gov',
        notes: 'Evaluations, mppevaluations@sba.gov',
        icon: '🤝',
      },
      {
        id: 'lender-match',
        title: 'Lender Match Tech Support',
        email: 'lendermatch@sba.gov',
        icon: '🔗',
      },
      {
        id: 'gls',
        title: 'General Login System (GLS) Tech Support',
        email: 'gls@sba.gov',
        notes: 'Eligibility assistance Tue & Thu, 2:00–3:00 p.m. ET. Call 208-391-5817, Conference ID 278449067#',
        icon: '🧩',
      },
    ],
  },
  {
    id: 'specialized-offices',
    title: 'Specialized SBA Offices',
    icon: '🏢',
    contacts: [
      {
        id: 'veterans-office',
        title: 'Office of Veterans Business Development',
        phone: '202-205-6773',
        email: 'veteransbusiness@sba.gov',
        notes: '409 3rd Street SW, Suite 5700, Washington, DC 20416. Fax, (202) 205-7292',
        icon: '🇺🇸',
      },
      {
        id: 'native-american',
        title: 'Office of Native American Affairs',
        phone: '202-205-7364',
        email: 'nativeamerican@sba.gov',
        icon: '🪶',
      },
      {
        id: 'owbo',
        title: "Office of Women's Business Ownership",
        phone: '202-205-6673',
        email: 'owbo@sba.gov',
        notes: '409 3rd St. SW, Washington, DC 20416',
        icon: '👩‍💼',
      },
      {
        id: 'advocacy',
        title: 'Office of Advocacy',
        phone: '202-205-6533',
        email: 'advocacy@sba.gov',
        website: 'https://advocacy.sba.gov',
        notes: 'Red Tape Hotline, RedTape@sba.gov',
        icon: '📣',
      },
      {
        id: 'hearings-appeals',
        title: 'Office of Hearings and Appeals',
        phone: '202-401-8200',
        email: 'ohafilings@sba.gov',
        notes: 'Fax, 202-205-7059. Address, 409 3rd St. SW, 8th Floor, Washington, DC 20416',
        icon: '⚖️',
      },
      {
        id: 'oig',
        title: 'Office of Inspector General',
        phone: '202-205-6586',
        notes: 'Hotline via online form on sba.gov/oig. Address, 409 3rd St. SW, Suite 7150, Washington, DC 20416. Hours, Mon–Fri, 9:00 a.m.–5:00 p.m. ET',
        icon: '🕵️',
      },
      {
        id: 'ombudsman',
        title: 'National Ombudsman',
        phone: '888-734-3247',
        email: 'ombudsman@sba.gov',
        notes: '409 3rd St. SW, Washington, DC 20416',
        icon: '🛡️',
      },
      {
        id: 'field-ops',
        title: 'Office of Field Operations',
        phone: '202-205-6808',
        icon: '📡',
      },
    ],
  },
  {
    id: 'information-records',
    title: 'Information & Records Requests',
    icon: '📄',
    contacts: [
      {
        id: 'foia',
        title: 'FOIA Requests',
        email: 'foia@sba.gov',
        website: 'https://www.sba.gov/about-sba/open-government/foia',
        icon: '📋',
      },
      {
        id: 'records',
        title: 'Records Management Office',
        email: 'records@sba.gov',
        icon: '📁',
      },
      {
        id: 'press',
        title: 'Media & Press Inquiries',
        email: 'press_office@sba.gov',
        icon: '📰',
      },
    ],
  },
  {
    id: 'locations',
    title: 'SBA Locations',
    icon: '📍',
    contacts: [
      {
        id: 'headquarters',
        title: 'SBA Headquarters (Washington, DC)',
        phone: '1-800-827-5722',
        notes: '409 3rd St. SW, Washington, DC 20416. District Office, (202) 205-8800. Hours, Mon–Fri, 8:00 a.m.–4:30 p.m. ET',
        icon: '🏛️',
      },
      {
        id: 'local-offices',
        title: 'Find Local SBA Office',
        website: 'https://www.sba.gov/local-assistance',
        notes: 'Locate your nearest district office',
        icon: '🗺️',
      },
    ],
  },

  // SCORE
  {
    id: 'score',
    title: 'SCORE Business Mentoring (SBA Resource Partner)',
    icon: '🎯',
    contacts: [
      {
        id: 'score-main',
        title: 'SCORE, Free Business Mentoring',
        website: 'https://www.score.org',
        notes: 'Over 10,000 volunteer mentors providing free mentoring via phone, video, email, and in-person',
        icon: '👥',
      },
      {
        id: 'score-mentor',
        title: 'Find a Mentor',
        website: 'https://www.score.org/find-mentor',
        icon: '🧭',
      },
      {
        id: 'score-contact',
        title: 'Contact SCORE',
        website: 'https://www.score.org/contact-us',
        icon: '✉️',
      },
    ],
  },

  // TREASURY
  {
    id: 'treasury',
    title: 'U.S. Department of the Treasury',
    icon: '🏦',
    contacts: [
      {
        id: 'treasury-main',
        title: 'Main Treasury Contact',
        phone: '(202) 622-2000',
        website: 'https://home.treasury.gov',
        notes: '1500 Pennsylvania Avenue NW, Washington, DC 20220. TTY via 7-1-1 relay services',
        icon: '📞',
      },
      {
        id: 'treasury-osdbu',
        title: 'Treasury OSDBU, Small and Disadvantaged Business Utilization',
        email: 'OSDBU_Team@Treasury.gov',
        notes: 'Mail, U.S. Department of the Treasury, ATTN: OSDBU, 1500 Pennsylvania Avenue NW, Washington, DC 20220. Street, 1750 Pennsylvania Avenue NW, Washington, DC 20006',
        icon: '🤝',
      },
      {
        id: 'sblf',
        title: 'Small Business Lending Fund (SBLF)',
        phone: '888-832-1147',
        email: 'SBLFInstitutions@treasury.gov',
        icon: '💼',
      },
      {
        id: 'ssbci',
        title: 'State Small Business Credit Initiative (SSBCI)',
        phone: '202-622-0713',
        email: 'SSBCIquestions@treasury.gov',
        icon: '📊',
      },
    ],
  },

  // FISCAL SERVICE
  {
    id: 'fiscal-service',
    title: 'Bureau of the Fiscal Service (Treasury)',
    icon: '🧾',
    contacts: [
      {
        id: 'fiscal-main',
        title: 'Fiscal Service Main Office, Debt and Offset Information',
        phone: '800-304-3107',
        notes: 'Address, 3201 Pennsy Drive, Building E, Landover, MD 20785. Fax for debt collection letter requests, 205-912-6155',
        icon: '📬',
      },
      {
        id: 'fiscal-wv',
        title: 'Fiscal Service, West Virginia Office',
        email: 'Smallbusiness@fiscal.treasury.gov',
        notes: 'Address, 200 Third Street, Avery 5F, Parkersburg, WV 26101. Location, 300 Avery St, A5-F, Parkersburg, WV 26101',
        icon: '🏢',
      },
      {
        id: 'td-login',
        title: 'TreasuryDirect (Savings Bonds), Login Issues',
        phone: '844-284-2676',
        icon: '🔐',
      },
      {
        id: 'us-mint',
        title: 'U.S. Mint Customer Service',
        phone: '1-800-872-6468',
        icon: '🪙',
      },
    ],
  },

  // IRS
  {
    id: 'irs',
    title: 'Internal Revenue Service (IRS)',
    icon: '🧾',
    contacts: [
      {
        id: 'irs-business',
        title: 'Business Tax Assistance',
        phone: '1-800-829-4933',
        hours: 'Mon–Fri, 7:00 a.m.–7:00 p.m. local time',
        notes: 'TTY, 1-800-829-4059. Services include business returns, EIN, employment taxes, partnerships, corporations, estates, gifts, trusts, excise taxes',
        icon: '🏢',
      },
      {
        id: 'irs-individual',
        title: 'Individual Tax Assistance',
        phone: '1-800-829-1040',
        hours: 'Mon–Fri, 7:00 a.m.–7:00 p.m. local time',
        notes: 'TTY, 1-800-829-4059',
        icon: '👤',
      },
      {
        id: 'irs-refund-status',
        title: 'Refund Status (Automated)',
        phone: '1-800-829-1954',
        notes: 'Available 24/7',
        icon: '💵',
      },
      {
        id: 'irs-refund-held',
        title: 'Refund Being Held',
        phone: '866-897-3315',
        hours: 'Daily, 7:00 a.m.–7:00 p.m. CT',
        icon: '⏳',
      },
      {
        id: 'irs-offset',
        title: 'Offset Information (Missing Refund, Debt)',
        phone: '800-304-3107',
        hours: 'Mon–Fri, 7:30 a.m.–5:00 p.m. CT',
        notes: 'TTY, 800-877-8339',
        icon: '📉',
      },
      {
        id: 'tas',
        title: 'Taxpayer Advocate Service',
        phone: '1-877-777-4778',
        website: 'https://www.taxpayeradvocate.irs.gov',
        notes: 'TTY, 1-800-829-4059',
        icon: '🛟',
      },
      {
        id: 'tac',
        title: 'Taxpayer Assistance Centers',
        website: 'https://www.irs.gov/help/contact-your-local-irs-office',
        notes: 'Weekdays, 8:30 a.m.–4:30 p.m., appointments recommended',
        icon: '📍',
      },
      {
        id: 'irs-account',
        title: 'IRS Online Account',
        website: 'https://www.irs.gov/account',
        notes: 'View payment history, transcripts, payment plans, schedule/cancel payments',
        icon: '💻',
      },
      {
        id: 'transcripts',
        title: 'Get Your Tax Transcript',
        phone: '1-800-908-9946',
        website: 'https://www.irs.gov/individuals/get-transcript',
        notes: 'Phone service available 24/7. Delivery time by mail/phone, 5–10 calendar days. Transcripts are free',
        icon: '📄',
      },
    ],
  },
];

export const advancedSBAContacts: SBAAdvancedContact[] = [
  { id: 'advocacy', department: 'Office of Advocacy', phone: '202-205-6533' },
  { id: 'congressional', department: 'Congressional and Legislative Affairs', phone: '202-205-6700' },
  { id: 'oha', department: 'Hearings and Appeals', phone: '202-401-8200' },
  { id: 'oig', department: 'Inspector General', phone: '202-205-6586' },
  { id: 'ombudsman', department: 'National Ombudsman', phone: '888-734-3247' },
  { id: 'gcbd', department: 'Gov Contracting and Business Dev', phone: '202-205-6459' },
  { id: 'bizdev', department: 'Business Development', phone: '202-205-5852' },
  { id: 'sbdc', department: 'Office of Small Business Development Centers', phone: '202-205-6766' },
  { id: 'recovery', department: 'Disaster Recovery and Resilience', phone: '202-205-6734' },
  { id: 'creditrisk', department: 'Credit Risk Management', phone: '202-205-3049' },
  { id: 'innovation', department: 'Investment and Innovation', phone: '202-205-6510' },
  { id: 'mfgtrade', department: 'Manufacturing and Trade', phone: '202-205-6720' },
  { id: 'hr', department: 'Human Resources Solutions', phone: '202-205-6780' },
  { id: 'cio', department: 'CIO', phone: '202-205-6708' },
  { id: 'cfo', department: 'CFO', phone: '202-205-6449' },
  { id: 'owbo', department: "Women's Business Ownership", phone: '202-205-6673' },
  { id: 'native', department: 'Native American Affairs', phone: '202-205-7364' },
  { id: 'vets', department: 'Veterans Business Dev', phone: '202-205-6773' },
];
