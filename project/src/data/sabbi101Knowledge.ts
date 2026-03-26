// ═══════════════════════════════════════════════════════════════════
// SABBI 101 — Comprehensive SBA Knowledge Base
// Source: SmallBiz Recon™ "100 Verified SBA Facts" + FAQ expansions
// ═══════════════════════════════════════════════════════════════════

export interface KnowledgeEntry {
  answer: string;
  variations?: string[];
}

// ───────────────────────────────────────
//  CORE FAQ MAP (exact match, fast path)
// ───────────────────────────────────────
export const FAQ_MAP: Record<string, string> = {

  // ── SBA Overview & Mission ──
  "what does sba stand for":
    "SBA stands for the Small Business Administration — an independent federal agency established in 1953 under the Small Business Act.",

  "when was the sba established":
    "The SBA was established in 1953 as an independent federal agency under the Small Business Act.",

  "what is the sba":
    "The U.S. Small Business Administration (SBA) is an independent federal agency whose core mission is to aid, counsel, assist, and protect the interests of small business concerns in the United States. It does this primarily through loan guarantees, counseling programs, contracting support, and disaster assistance.",

  "where is the sba headquartered":
    "The SBA is headquartered in Washington, D.C. at 409 Third Street SW.",

  "who runs the sba":
    "The SBA Administrator is a Presidential appointee confirmed by the U.S. Senate who serves as the agency's chief executive.",

  "how many sba offices are there":
    "The SBA maintains 68 district offices across all 50 states, D.C., Puerto Rico, the U.S. Virgin Islands, and Guam.",

  "does the sba lend money directly":
    "Generally no — the SBA does not typically lend money directly to small businesses. Instead, it guarantees portions of loans made by approved lending partners. The exception is the SBA's Office of Disaster Assistance, which is the only form of SBA lending where the agency lends directly to borrowers.",

  "what is the office of advocacy":
    "The SBA's Office of Advocacy serves as an independent voice for small business within the federal government, conducting research and regulatory analysis.",

  "what is the sba oig":
    "The SBA's Office of Inspector General (OIG) provides independent oversight of agency programs and operations, investigating fraud and waste.",

  // ── Size Standards ──
  "how does the sba define small business":
    "The SBA defines 'small business' using industry-specific size standards based on NAICS codes — not a single universal threshold. Standards are measured by either average annual receipts or average number of employees depending on the industry. To qualify, a firm must be independently owned and operated, organized for profit, and not nationally dominant in its field.",

  "what are sba size standards":
    "SBA size standards are industry-specific thresholds that determine whether a business qualifies as 'small.' Manufacturing firms are generally small if they have 500 or fewer employees (some up to 1,500). Most retail and service businesses qualify if annual receipts fall between $8M and $41.5M. These are codified at 13 CFR Part 121 and reviewed roughly every five years.",

  "what are affiliation rules":
    "Affiliation rules (13 CFR 121.103) can combine employee counts or revenues of related entities when determining small business eligibility. If businesses share ownership, management, or other ties, the SBA may treat them as a single entity for size determination.",

  // ── Economic Impact ──
  "how many small businesses are in the us":
    "There are approximately 33.2 million small businesses operating in the United States, representing 99.9% of all U.S. employer firms.",

  "how many jobs do small businesses create":
    "Small businesses employ approximately 46% of the private-sector workforce and generated roughly 62% of net new jobs created between 1995 and 2021.",

  "what percentage of gdp is small business":
    "Small businesses account for approximately 43.5% of U.S. gross domestic product (GDP).",

  "how many women owned businesses are there":
    "Women own approximately 42% of all U.S. businesses, representing about 13 million firms.",

  "how many veteran owned businesses are there":
    "Veteran-owned businesses account for roughly 5.4% of all U.S. employer firms.",

  // ── 7(a) Loan Program ──
  "what is a 7a loan":
    "The 7(a) loan program is the SBA's primary, most flexible, and most widely used loan guarantee program. The maximum loan amount is $5 million. Funds can be used for working capital, equipment, inventory, real estate acquisition, business acquisition, refinancing, and leasehold improvements.",

  "what is the maximum 7a loan amount":
    "The maximum 7(a) loan amount is $5 million.",

  "how much does the sba guarantee on 7a loans":
    "The SBA guarantees up to 85% of 7(a) loans of $150,000 or less, and up to 75% for loans above $150,000.",

  "what can 7a loans be used for":
    "7(a) loans can be used for working capital, equipment, inventory, real estate acquisition, business acquisition, refinancing, and leasehold improvements. They cannot be used for speculative purposes, lending/investment purposes, or to reimburse owners for prior equity injections without SBA approval.",

  "what is sba express":
    "SBA Express loans are a subset of the 7(a) program with a maximum loan amount of $500,000 and a 36-hour SBA turnaround time. They carry a 50% guarantee, which is lower than the standard 7(a) guarantee.",

  "what are 7a interest rates":
    "7(a) loan interest rates can be fixed or variable, with variable rates tied to the prime rate plus an allowable spread set by SBA regulations.",

  "what is the maximum term for 7a loans":
    "The maximum maturity for 7(a) loans is 25 years for real estate, 10 years for equipment, and 10 years for working capital.",

  "do 7a loans require personal guarantees":
    "Yes. Personal guarantees are required from any individual owning 20% or more of the borrowing entity on 7(a) loans.",

  "what is the credit elsewhere test":
    "All 7(a) borrowers must demonstrate an inability to obtain credit elsewhere on reasonable terms. This is called the 'credit elsewhere' test and is a fundamental eligibility requirement.",

  "what is a preferred lender":
    "Preferred Lender Program (PLP) lenders have delegated authority to approve 7(a) loans without prior SBA review, speeding up the process significantly.",

  "what is sop 50 10":
    "SOP 50 10 is the SBA's Standard Operating Procedure governing all 7(a) and 504 origination, closing, and servicing policies. It's the lending bible for SBA lenders.",

  // ── 504 Loan Program ──
  "what is a 504 loan":
    "The 504 loan program provides long-term, fixed-rate financing for major fixed assets such as real estate and heavy equipment. Loans are structured as a partnership: typically 50% from a private-sector lender, 40% from an SBA-backed CDC debenture, and 10% borrower equity.",

  "what is a cdc":
    "Certified Development Companies (CDCs) are SBA-regulated nonprofit organizations that administer 504 loans in their local communities. There are approximately 240 CDCs operating throughout the United States.",

  "what is the maximum 504 loan amount":
    "The maximum SBA debenture for a standard 504 project is $5.5 million. For projects meeting specific public policy goals (energy reduction, community development), the maximum can reach $5.5 million per goal.",

  "what are 504 loan terms":
    "504 loan maturities are 10 years for equipment and 20 or 25 years for real estate. They carry a fixed interest rate for the life of the debenture based on market rates at funding. Proceeds cannot be used for working capital or inventory — they are restricted to fixed-asset acquisition and improvement.",

  // ── Microloan Program ──
  "what is the sba microloan program":
    "The SBA Microloan Program provides loans up to $50,000 through nonprofit intermediary lenders. The average microloan is approximately $13,000. Proceeds can be used for working capital, inventory, supplies, equipment, machinery, and fixtures — but not for real estate or paying off existing debts. Intermediaries also provide business training and technical assistance.",

  // ── Disaster Loans ──
  "what are sba disaster loans":
    "SBA disaster loans are the only form of SBA lending where the agency lends directly to borrowers. They are available for declared physical disasters and economic injury. Physical disaster loans repair or replace damaged property (up to $2 million for business, $500,000 for home real estate). Economic Injury Disaster Loans (EIDL) provide working capital to cover operating expenses the business could have met had the disaster not occurred.",

  "what was covid eidl":
    "During the COVID-19 pandemic, the SBA administered the COVID EIDL program, which distributed over $390 billion in loans to small businesses and nonprofits. COVID EIDL loans carried a fixed interest rate of 3.75% for businesses and 2.75% for nonprofits with a 30-year maturity.",

  "what is sop 50 52":
    "SOP 50 52 2 is the Standard Operating Procedure governing all post-closing servicing actions for SBA disaster loans, including Release of Collateral, Subordination, Relocation, Change in Ownership, Hardship, and Offer in Compromise.",

  "what sba servicing actions are available":
    "SBA disaster loan servicing actions include: Release of Collateral, Subordination (shifting lien priority), Relocation, Change in Ownership, Hardship/Payment Assistance (reduced payments), and Offer in Compromise (settling for less than owed). All are governed by SOP 50 52 2.",

  // ── Servicing & Liquidation ──
  "what is a hardship accommodation":
    "A hardship accommodation is when the SBA offers reduced payment plans, deferrals, or other workout arrangements to borrowers unable to make full loan payments due to financial difficulty.",

  "what is release of collateral":
    "Release of Collateral requests allow borrowers to remove specific assets from the SBA's lien with documented justification. This requires a complete servicing packet submitted to the SBA.",

  "what is subordination":
    "Subordination requests allow borrowers to place another lender's lien ahead of the SBA's lien position on collateral. The SBA loan must typically be current and seasoned (12 months of on-time payments).",

  "what is change in ownership":
    "Change in Ownership requests must be submitted when there is a transfer of 50% or more ownership interest in the borrowing entity. SBA approval is required.",

  "what is offer in compromise":
    "Offer in Compromise (OIC) allows a borrower to settle their SBA debt for less than the full amount owed, subject to SBA approval. It's typically a last resort for borrowers who genuinely cannot repay the full balance.",

  "what happens with treasury referral":
    "Loans that are significantly delinquent may be referred to the U.S. Department of the Treasury's Bureau of the Fiscal Service for offset and cross-servicing collection, governed by the Debt Collection Improvement Act of 1996.",

  "what is sba form 1099c":
    "SBA Form 1099-C is issued when a debt of $600 or more is canceled, discharged, or forgiven, creating a potential tax liability for the borrower.",

  // ── Grants & Non-Loan Programs ──
  "does the sba offer grants":
    "The SBA does not generally offer grants to start or expand a business. Grants are typically reserved for specific programs like SBIR (Small Business Innovation Research) and STTR (Small Business Technology Transfer).",

  "what is sbir":
    "The Small Business Innovation Research (SBIR) program directs federal agencies with large R&D budgets to set aside a percentage for small business awards. Phase I awards are typically up to $150,000 for feasibility studies; Phase II awards are typically up to $1 million for full R&D.",

  "what is sttr":
    "The Small Business Technology Transfer (STTR) program requires collaboration between small businesses and research institutions to facilitate technology transfer and innovation.",

  "what is score":
    "SCORE is an SBA-administered program that provides free mentoring from experienced business professionals to small business owners. It's one of the SBA's most accessible counseling resources.",

  "what is an sbdc":
    "Small Business Development Centers (SBDCs) are partnerships between the SBA, state and local governments, and academic institutions that provide counseling, training, and technical assistance to small businesses.",

  "what is a womens business center":
    "Women's Business Centers (WBCs) are SBA-funded organizations that provide entrepreneurial training, counseling, and resources specifically for women business owners.",

  // ── Government Contracting ──
  "what is the small business contracting goal":
    "The federal government has a statutory goal of awarding at least 23% of all federal prime contracting dollars to small businesses.",

  "what is the 8a program":
    "The SBA's 8(a) Business Development Program assists socially and economically disadvantaged small businesses in accessing federal contracts. Participants can receive sole-source contracts up to $4.5 million for goods/services, or $7 million for manufacturing.",

  "what is hubzone":
    "The HUBZone (Historically Underutilized Business Zones) program helps small businesses in designated areas gain preferential access to federal procurement opportunities.",

  "what is sdvosb":
    "The Service-Disabled Veteran-Owned Small Business (SDVOSB) contracting program provides federal contracting advantages to qualifying veteran-owned firms.",

  "what is wosb program":
    "The Women-Owned Small Business (WOSB) Federal Contracting Program reserves certain federal contracts for eligible women-owned businesses.",

  "what is sam gov":
    "SAM.gov (System for Award Management) is the required registration platform for any business seeking to do business with the federal government.",

  // ── SmallBiz Recon ──
  "what is smallbiz recon":
    "SmallBiz Recon™ is a veteran-owned SBA loan servicing intelligence platform built from 15,000+ real SBA case reviews. We offer expert-prepared servicing packets and self-guided toolkits to help borrowers navigate SBA loan processes with clarity and confidence.",

  "who is sabbi":
    "I'm Sabbi — your SBA basics AI assistant powered by SmallBiz Recon™. I can answer general SBA questions, explain loan programs, and point you toward the right resources. For specialized help with Subordination, Release of Collateral, or Payment Assistance, check out our dedicated toolkits!",

  "what toolkits does smallbiz recon offer":
    "SmallBiz Recon™ currently offers specialized toolkits for:\n• Subordination (shifting SBA lien priority)\n• Release of Collateral (removing assets from SBA lien)\n• Payment Assistance (hardship accommodations)\nEach toolkit includes a dedicated AI assistant and step-by-step packet assembly guidance.",

  "tell me about SmallBiz Recons free guides":
    "SmallBiz Recon offers several free guides including SBA 101: The Basics Guide, SBA 101: Your Quick Intro Guide, and a number of Free SBA Recon Help Guides covering essential SBA topics.",

  // ── Jokes ──
  "tell me an sba joke":
    "Why did the small business break up with its bank? Because it kept asking for a personal guarantee, and the business just wanted to be free and independent! 😄",
  "tell me another sba joke":
    "What's the SBA's favorite game? Lender Match! 🎯",
  "tell me a third sba joke":
    "Why did the entrepreneur bring a ladder to their SBA meeting? They heard it was a step in the right direction for their small business! 🪜",
  "tell me a fourth sba joke":
    "What did the EIDL loan say to the borrower? 'I'm here for the long term — 30 years to be exact!' 📅",
  "tell me a fifth sba joke":
    "Why don't SBA loans ever get lonely? Because they always come with strings attached! 🎻",
};

// ───────────────────────────────────────
//  FAQ ALIASES (maps common phrasings to FAQ keys)
// ───────────────────────────────────────
export const FAQ_ALIASES: Record<string, string> = {
  // SBA basics
  "what is sba": "what is the sba",
  "sba meaning": "what does sba stand for",
  "sba stand for": "what does sba stand for",
  "sba founded": "when was the sba established",
  "sba created": "when was the sba established",
  "when was sba founded": "when was the sba established",
  "when was sba created": "when was the sba established",
  "sba headquarters": "where is the sba headquartered",
  "sba location": "where is the sba headquartered",
  "sba administrator": "who runs the sba",
  "who leads the sba": "who runs the sba",
  "sba offices": "how many sba offices are there",
  "sba direct loans": "does the sba lend money directly",
  "does sba lend directly": "does the sba lend money directly",
  "office of advocacy": "what is the office of advocacy",
  "sba oig": "what is the sba oig",
  "inspector general": "what is the sba oig",

  // Size standards
  "small business definition": "how does the sba define small business",
  "what is a small business": "how does the sba define small business",
  "size standards": "what are sba size standards",
  "sba size standards": "what are sba size standards",
  "affiliation rules": "what are affiliation rules",
  "sba affiliation": "what are affiliation rules",

  // Economic impact
  "how many small businesses": "how many small businesses are in the us",
  "small business statistics": "how many small businesses are in the us",
  "small business jobs": "how many jobs do small businesses create",
  "small business gdp": "what percentage of gdp is small business",
  "women owned businesses": "how many women owned businesses are there",
  "veteran owned businesses": "how many veteran owned businesses are there",

  // 7(a)
  "7a loan": "what is a 7a loan",
  "7 a loan": "what is a 7a loan",
  "seven a loan": "what is a 7a loan",
  "7a program": "what is a 7a loan",
  "types of sba loans": "what is a 7a loan",
  "sba loan types": "what is a 7a loan",
  "main types of sba loans": "what is a 7a loan",
  "max 7a loan": "what is the maximum 7a loan amount",
  "7a maximum": "what is the maximum 7a loan amount",
  "7a guarantee percentage": "how much does the sba guarantee on 7a loans",
  "sba guarantee": "how much does the sba guarantee on 7a loans",
  "7a uses": "what can 7a loans be used for",
  "sba express": "what is sba express",
  "express loan": "what is sba express",
  "7a interest rates": "what are 7a interest rates",
  "sba interest rates": "what are 7a interest rates",
  "7a loan terms": "what is the maximum term for 7a loans",
  "7a maturity": "what is the maximum term for 7a loans",
  "personal guarantee": "do 7a loans require personal guarantees",
  "personal guaranty": "do 7a loans require personal guarantees",
  "credit elsewhere": "what is the credit elsewhere test",
  "preferred lender": "what is a preferred lender",
  "plp lender": "what is a preferred lender",
  "sop 50 10": "what is sop 50 10",

  // 504
  "504 loan": "what is a 504 loan",
  "504 program": "what is a 504 loan",
  "what is cdc": "what is a cdc",
  "certified development company": "what is a cdc",
  "504 maximum": "what is the maximum 504 loan amount",
  "max 504": "what is the maximum 504 loan amount",
  "504 terms": "what are 504 loan terms",
  "504 maturity": "what are 504 loan terms",

  // Microloan
  "microloan": "what is the sba microloan program",
  "micro loan": "what is the sba microloan program",
  "sba microloan": "what is the sba microloan program",

  // Disaster
  "disaster loans": "what are sba disaster loans",
  "sba disaster": "what are sba disaster loans",
  "eidl": "what was covid eidl",
  "covid eidl": "what was covid eidl",
  "covid loan": "what was covid eidl",
  "pandemic loan": "what was covid eidl",
  "sop 50 52": "what is sop 50 52",
  "servicing actions": "what sba servicing actions are available",
  "sba servicing": "what sba servicing actions are available",

  // Servicing
  "hardship": "what is a hardship accommodation",
  "hardship accommodation": "what is a hardship accommodation",
  "payment assistance": "what is a hardship accommodation",
  "release of collateral": "what is release of collateral",
  "collateral release": "what is release of collateral",
  "subordination": "what is subordination",
  "lien subordination": "what is subordination",
  "change in ownership": "what is change in ownership",
  "ownership change": "what is change in ownership",
  "offer in compromise": "what is offer in compromise",
  "oic": "what is offer in compromise",
  "settle sba debt": "what is offer in compromise",
  "treasury referral": "what happens with treasury referral",
  "treasury collection": "what happens with treasury referral",
  "cross servicing": "what happens with treasury referral",
  "1099 c": "what is sba form 1099c",
  "1099c": "what is sba form 1099c",
  "debt cancellation": "what is sba form 1099c",

  // Grants
  "sba grants": "does the sba offer grants",
  "grants": "does the sba offer grants",
  "sbir": "what is sbir",
  "sttr": "what is sttr",
  "score": "what is score",
  "score mentoring": "what is score",
  "sbdc": "what is an sbdc",
  "small business development center": "what is an sbdc",
  "wbc": "what is a womens business center",
  "womens business center": "what is a womens business center",

  // Contracting
  "government contracting": "what is the small business contracting goal",
  "federal contracting": "what is the small business contracting goal",
  "8a program": "what is the 8a program",
  "8 a program": "what is the 8a program",
  "hubzone": "what is hubzone",
  "sdvosb": "what is sdvosb",
  "veteran contracting": "what is sdvosb",
  "wosb": "what is wosb program",
  "sam gov": "what is sam gov",
  "sam registration": "what is sam gov",

  // SmallBiz Recon
  "smallbiz recon": "what is smallbiz recon",
  "what is recon": "what is smallbiz recon",
  "who are you": "who is sabbi",
  "what can you do": "who is sabbi",
  "sabbi": "who is sabbi",
  "toolkits": "what toolkits does smallbiz recon offer",
  "what toolkits": "what toolkits does smallbiz recon offer",
  "free guides": "tell me about sba recons free guides",
  "sba recon free guides": "tell me about sba recons free guides",

  // Jokes
  "tell me a joke": "tell me an sba joke",
  "joke": "tell me an sba joke",
  "tell me another joke": "tell me another sba joke",
  "another joke": "tell me another sba joke",
  "one more joke": "tell me a third sba joke",
  "third joke": "tell me a third sba joke",
};

// ───────────────────────────────────────
//  STARTER QUESTIONS (shown when chat opens)
// ───────────────────────────────────────
export const STARTER_QUESTIONS = [
  "What is the SBA?",
  "What is a 7(a) loan?",
  "What is a 504 loan?",
  "What are SBA disaster loans?",
  "What was COVID EIDL?",
  "What toolkits does SmallBiz Recon offer?",
  "How does the SBA define small business?",
  "Does the SBA offer grants?",
  "What is subordination?",
  "Who is Sabbi?",
];

// ───────────────────────────────────────
//  FALLBACK RESPONSES
// ───────────────────────────────────────
export const FALLBACK_RESPONSES = [
  "I don't have an exact match for that yet, but I cover SBA basics across all major programs. Try asking about a specific loan type (7(a), 504, Microloan, Disaster), servicing action, or SBA program.",
  "That's outside my current knowledge base. I specialize in SBA fundamentals — loan programs, servicing actions, size standards, contracting, and counseling. What area are you interested in?",
  "I can't find a direct match, but I can help with SBA loan programs, eligibility, servicing (subordination, collateral release, hardship), contracting, and more. What's your goal?",
  "Not in my database yet. Try asking about 7(a) loans, 504 loans, microloans, disaster loans, SBA servicing actions, government contracting, or any SBA program basics.",
  "I don't have that specific answer, but I know SBA inside and out. Ask me about loan programs, size standards, servicing actions, grants, contracting, or SBA counseling resources.",
];

// ───────────────────────────────────────
//  FUZZY KNOWLEDGE BASE (for matching engine)
// ───────────────────────────────────────
export const FUZZY_KB: Record<string, KnowledgeEntry> = {
  // ── SBA Overview ──
  "sba overview and mission": {
    answer: "The U.S. Small Business Administration (SBA) was established in 1953 as an independent federal agency. Its core mission is to aid, counsel, assist, and protect the interests of small business concerns. The SBA is headquartered in Washington, D.C. with 68 district offices nationwide. It primarily guarantees loans made by approved lenders rather than lending directly (except disaster loans).",
    variations: ["tell me about the sba", "sba mission", "sba history", "sba background", "overview of sba"],
  },
  "sba budget and oversight": {
    answer: "The SBA's annual budget has historically ranged from $700 million to over $1 billion in administrative costs, separate from loan subsidy appropriations. The SBA reports to the President and has been granted Cabinet-level status in several administrations. The Office of Inspector General provides independent oversight of agency programs.",
    variations: ["sba budget", "sba funding", "sba oversight", "how is sba funded"],
  },

  // ── Size Standards ──
  "small business size standards explained": {
    answer: "The SBA uses industry-specific size standards based on NAICS codes. Manufacturing: generally 500 or fewer employees (some up to 1,500). Retail/Service: $8M to $41.5M in average annual receipts. Standards are codified at 13 CFR Part 121 and reviewed every five years. A firm must be independently owned, for-profit, and not nationally dominant.",
    variations: ["size standard details", "how do size standards work", "naics size standards", "employee size standard", "revenue size standard"],
  },

  // ── 7(a) Deep Dive ──
  "7a loan complete overview": {
    answer: "The 7(a) is the SBA's primary loan program:\n• Max amount: $5 million\n• SBA guarantees 85% (≤$150K) or 75% (>$150K)\n• Uses: working capital, equipment, inventory, real estate, business acquisition, refinancing\n• Rates: fixed or variable (prime + spread)\n• Max terms: 25yr real estate, 10yr equipment, 10yr working capital\n• Personal guarantee required for 20%+ owners\n• Must pass 'credit elsewhere' test\n• Cannot be used for speculation or reimbursing prior equity injections without approval",
    variations: ["7a loan details", "everything about 7a", "7a loan breakdown", "7a loan explained"],
  },
  "sba guaranty fee": {
    answer: "The SBA charges a guaranty fee on 7(a) loans, which varies based on loan amount and maturity and is typically passed to the borrower. This fee compensates the SBA for the risk of guaranteeing the loan.",
    variations: ["guaranty fee", "sba fee", "7a fees", "loan guarantee fee"],
  },
  "community advantage loans": {
    answer: "Community Advantage loans were a pilot subset of the 7(a) program designed to increase lending in underserved communities, targeting businesses that might not qualify through traditional lending channels.",
    variations: ["community advantage", "underserved lending", "community lending"],
  },

  // ── 504 Deep Dive ──
  "504 loan complete overview": {
    answer: "The 504 loan program provides long-term, fixed-rate financing for major fixed assets:\n• Structure: 50% private lender + 40% CDC debenture + 10% borrower equity\n• Max SBA debenture: $5.5 million (can be higher for public policy goals)\n• Terms: 10yr equipment, 20-25yr real estate\n• Fixed rate for life of debenture\n• Cannot be used for working capital or inventory\n• Borrower equity may increase to 15-20% for startups or special-purpose buildings\n• Administered by ~240 CDCs nationwide",
    variations: ["504 loan details", "everything about 504", "504 explained", "cdc loan details"],
  },

  // ── Microloan Deep Dive ──
  "microloan program details": {
    answer: "The SBA Microloan Program:\n• Max loan: $50,000 (average is ~$13,000)\n• Delivered through nonprofit intermediary lenders\n• Uses: working capital, inventory, supplies, equipment, machinery, fixtures\n• Cannot be used for: real estate or paying off existing debts\n• Intermediaries also provide business training and technical assistance",
    variations: ["microloan details", "how do microloans work", "small sba loan"],
  },

  // ── Disaster Loans Deep Dive ──
  "disaster loan program details": {
    answer: "SBA Disaster Loans — the only SBA direct lending program:\n• Physical disaster: repair/replace damaged property (up to $2M business, $500K home real estate, $100K personal property)\n• EIDL: working capital for economic injury from declared disaster\n• Collateral required for loans over $25K (but won't decline solely for lack of collateral)\n• Servicing governed by SOP 50 52 2\n• COVID EIDL: distributed $390B+ at 3.75% fixed / 30-year term",
    variations: ["disaster loan details", "eidl details", "physical disaster loan", "disaster assistance"],
  },

  // ── Servicing Deep Dive ──
  "sba loan servicing overview": {
    answer: "SBA disaster loan servicing is centralized at servicing centers (not district offices). All actions are governed by SOP 50 52 2. Available servicing actions include:\n• Hardship/Payment Assistance (reduced payments, deferrals)\n• Release of Collateral (remove assets from SBA lien)\n• Subordination (place another lender's lien ahead of SBA's)\n• Change in Ownership (transfer of 50%+ ownership)\n• Offer in Compromise (settle for less than owed)\n• Late fees apply to delinquent payments\n• Seriously delinquent loans may be referred to Treasury for collection",
    variations: ["servicing options", "loan servicing", "what can i do with my sba loan", "sba workout options"],
  },

  // ── Grants & Programs ──
  "sba grants and non loan programs": {
    answer: "The SBA generally does NOT offer grants for starting/expanding businesses. Grant programs include:\n• SBIR: Phase I up to $150K, Phase II up to $1M for R&D\n• STTR: requires small business + research institution collaboration\n\nFree counseling/training programs:\n• SCORE: free mentoring from experienced professionals\n• SBDCs: counseling through SBA/state/academic partnerships\n• WBCs: training and resources for women business owners",
    variations: ["sba programs", "free sba help", "sba resources", "sba training", "sba mentoring"],
  },

  // ── Contracting ──
  "government contracting overview": {
    answer: "Federal contracting for small businesses:\n• 23% statutory goal for small business prime contracts\n• 8(a) Program: sole-source up to $4.5M goods/services, $7M manufacturing\n• HUBZone: preferential access for businesses in designated areas\n• SDVOSB: advantages for service-disabled veteran-owned firms\n• WOSB: reserved contracts for women-owned businesses\n• SAM.gov registration required for all federal contracting",
    variations: ["contracting programs", "federal contracts", "government contracts for small business", "how to get government contracts"],
  },

  // ── Policy & Compliance ──
  "sba policy and compliance": {
    answer: "Key SBA policy frameworks:\n• SOPs (Standard Operating Procedures) govern all program operations\n• SOP 50 10: 7(a) and 504 origination, closing, servicing\n• SOP 50 52 2: disaster loan servicing and liquidation\n• Office of Credit Risk Management monitors lender performance\n• Lenders subject to on-site reviews and risk ratings\n• Procedural Notices and Policy Notices supplement SOPs between revisions\n• All COVID EIDL servicing governed exclusively by SOP 50 52 2 and related COVID EIDL policy guidance",
    variations: ["sba rules", "sba regulations", "sba compliance", "sba policy", "sba sops"],
  },
};
