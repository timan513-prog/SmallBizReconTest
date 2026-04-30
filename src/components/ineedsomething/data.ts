/* ═══════════════════════════════════════════
   Operation: IneedSomething — Data
   Brevard County local action hub
   ═══════════════════════════════════════════ */

export type Issue =
  | "business"
  | "permits"
  | "property"
  | "records"
  | "veteran"
  | "storm"
  | "housing"
  | "other";

export type Urgency = "today" | "week" | "research";

export type ToolCategory =
  | "Business"
  | "Permits & Code"
  | "Property & Taxes"
  | "Public Records"
  | "Veterans"
  | "Storm Prep"
  | "Local Tools";

export interface Tool {
  id: string;
  name: string;
  category: ToolCategory;
  cost: "Free" | "Paid";
  type: "Finder" | "Checklist" | "Verifier" | "Builder" | "Navigator" | "Map" | "Reminder" | "Generator";
  description: string;
  bestFor: string;
}

export const CITIES = [
  "Palm Bay",
  "Melbourne",
  "Cocoa",
  "Titusville",
  "Rockledge",
  "West Melbourne",
  "Cocoa Beach",
  "Cape Canaveral",
  "Satellite Beach",
  "Indialantic",
  "Merritt Island",
  "Viera",
  "Unincorporated Brevard",
  "Not Sure",
] as const;

export const ISSUES: Array<{ value: Issue; label: string }> = [
  { value: "business", label: "Start or run a business" },
  { value: "permits", label: "Permits, code, or contractor issue" },
  { value: "property", label: "Property taxes or homestead" },
  { value: "records", label: "Court or public records" },
  { value: "veteran", label: "Veteran benefits" },
  { value: "storm", label: "Hurricane prep or storm recovery" },
  { value: "housing", label: "Housing or utilities" },
  { value: "other", label: "Something else" },
];

export const URGENCIES: Array<{ value: Urgency; label: string }> = [
  { value: "today", label: "Today" },
  { value: "week", label: "This week" },
  { value: "research", label: "Just researching" },
];

export const TOOLS: Tool[] = [
  {
    id: "brevard-help-finder",
    name: "Brevard Help Finder",
    category: "Local Tools",
    cost: "Free",
    type: "Finder",
    description: "Answer three quick questions and get matched to the right Brevard tool, office, or checklist.",
    bestFor: "Anyone who isn't sure where to start",
  },
  {
    id: "business-startup-path",
    name: "Business Startup Path Finder",
    category: "Business",
    cost: "Free",
    type: "Navigator",
    description: "Map the steps for forming, registering, and operating a small business in Brevard County.",
    bestFor: "New owners, side-hustlers, freelancers",
  },
  {
    id: "permit-code-checker",
    name: "Brevard Permit & Code Checker",
    category: "Permits & Code",
    cost: "Free",
    type: "Verifier",
    description: "See which city or county office handles your permit and what documents to bring.",
    bestFor: "Homeowners, contractors, renovators",
  },
  {
    id: "contractor-verification",
    name: "Licensed Contractor Verification Tool",
    category: "Permits & Code",
    cost: "Free",
    type: "Verifier",
    description: "Confirm a contractor's state license, local registration, and insurance status before you sign.",
    bestFor: "Homeowners hiring local trades",
  },
  {
    id: "hurricane-readiness",
    name: "Hurricane Readiness Builder",
    category: "Storm Prep",
    cost: "Free",
    type: "Builder",
    description: "Build a personalized storm kit, evacuation, and document checklist for your Brevard address.",
    bestFor: "Coastal residents and families",
  },
  {
    id: "homestead-helper",
    name: "Property & Homestead Helper",
    category: "Property & Taxes",
    cost: "Free",
    type: "Navigator",
    description: "Walk through homestead exemption, portability, and Brevard property appraiser steps.",
    bestFor: "New homeowners and movers",
  },
  {
    id: "tax-btr-reminder",
    name: "Tax Bill & BTR Reminder Tool",
    category: "Property & Taxes",
    cost: "Free",
    type: "Reminder",
    description: "Track property tax and Business Tax Receipt deadlines with email or calendar reminders.",
    bestFor: "Owners juggling multiple deadlines",
  },
  {
    id: "records-navigator",
    name: "Court & Public Records Navigator",
    category: "Public Records",
    cost: "Free",
    type: "Navigator",
    description: "Find the right Clerk of Court office, portal, or records request for your situation.",
    bestFor: "Anyone needing a record or filing",
  },
  {
    id: "veteran-navigator",
    name: "Veteran Benefits Local Navigator",
    category: "Veterans",
    cost: "Free",
    type: "Navigator",
    description: "Connect to Brevard's Veteran Services office and locate benefits you may have earned.",
    bestFor: "Veterans, spouses, and caregivers",
  },
  {
    id: "small-biz-map",
    name: "Local Small Business Resource Map",
    category: "Business",
    cost: "Free",
    type: "Map",
    description: "See SBDC, SCORE, chambers, and local incubators across Brevard on a single map.",
    bestFor: "Owners looking for free advisors",
  },
  {
    id: "city-contact-finder",
    name: "City-by-City Contact Finder",
    category: "Local Tools",
    cost: "Free",
    type: "Finder",
    description: "Jump straight to the right department phone, address, and online portal for each Brevard city.",
    bestFor: "Anyone bouncing between offices",
  },
  {
    id: "doc-checklist-generator",
    name: "Document Prep Checklist Generator",
    category: "Local Tools",
    cost: "Free",
    type: "Generator",
    description: "Generate a printable list of exactly what to gather before your appointment or filing.",
    bestFor: "People preparing for an office visit",
  },
];

/** Map an issue to three recommended tool IDs. */
export const ISSUE_TO_TOOLS: Record<Issue, [string, string, string]> = {
  business: ["business-startup-path", "small-biz-map", "doc-checklist-generator"],
  permits: ["permit-code-checker", "contractor-verification", "doc-checklist-generator"],
  property: ["homestead-helper", "tax-btr-reminder", "doc-checklist-generator"],
  records: ["records-navigator", "city-contact-finder", "doc-checklist-generator"],
  veteran: ["veteran-navigator", "doc-checklist-generator", "city-contact-finder"],
  storm: ["hurricane-readiness", "doc-checklist-generator", "city-contact-finder"],
  housing: ["city-contact-finder", "homestead-helper", "doc-checklist-generator"],
  other: ["brevard-help-finder", "city-contact-finder", "doc-checklist-generator"],
};

export function recommendTools(issue: Issue | "" ): Tool[] {
  if (!issue) return [];
  const ids = ISSUE_TO_TOOLS[issue];
  return ids
    .map((id) => TOOLS.find((t) => t.id === id))
    .filter((t): t is Tool => Boolean(t));
}

export const NAV_LINKS = [
  { label: "Business", href: "#tools-grid" },
  { label: "Permits & Code", href: "#tools-grid" },
  { label: "Property & Taxes", href: "#tools-grid" },
  { label: "Veterans", href: "#tools-grid" },
  { label: "Storm Prep", href: "#tools-grid" },
  { label: "Public Records", href: "#tools-grid" },
  { label: "Local Tools", href: "#tools-grid" },
];

export const FAQS: Array<{ q: string; a: string }> = [
  {
    q: "Is Operation: IneedSomething part of Brevard County government?",
    a: "No. We are an independent, locally focused educational resource and tool finder. We are not affiliated with Brevard County, any city government, or any agency.",
  },
  {
    q: "Are these official government forms?",
    a: "Our tools route you to official sources whenever a government form is needed. We provide checklists, prep guides, and navigation, then link out to the appropriate office or portal.",
  },
  {
    q: "Do I need an account?",
    a: "No account is required to browse tools, run the Help Finder, or download a checklist. Some optional features like reminders may ask for an email.",
  },
  {
    q: "Are the tools free?",
    a: "Yes, our core tools, checklists, and finders are free. If we ever offer a paid guided service, it will be clearly labeled.",
  },
  {
    q: "How do you decide which tool to show me?",
    a: "We match based on the issue, city or area, and urgency you select. Where multiple paths exist, we surface the official-source route first.",
  },
  {
    q: "Can this help me start a business in Brevard?",
    a: "Yes. The Business Startup Path Finder walks through registration, Business Tax Receipts, zoning, and local resource organizations like the SBDC and SCORE.",
  },
  {
    q: "Can this help with permits or code enforcement?",
    a: "Yes. The Permit & Code Checker identifies which city or unincorporated Brevard office handles your project and what documents you should prepare.",
  },
  {
    q: "Can this help with homestead or property taxes?",
    a: "Yes. The Property & Homestead Helper covers exemptions, portability, and how to reach the Brevard County Property Appraiser and Tax Collector.",
  },
  {
    q: "Can veterans use this?",
    a: "Yes. The Veteran Benefits Local Navigator connects you to Brevard County Veteran Services and helps surface benefits you may not know you qualify for.",
  },
  {
    q: "Does this provide legal, tax, or financial advice?",
    a: "No. Operation: IneedSomething is informational only. For legal, tax, or financial decisions, please consult a licensed professional.",
  },
  {
    q: "What if I need human help?",
    a: "Some tools include a Request Help option that points you to free advisors, official offices, or qualified local professionals where appropriate.",
  },
  {
    q: "Will this cover every city in Brevard?",
    a: "Yes. We cover Palm Bay, Melbourne, Cocoa, Titusville, Rockledge, West Melbourne, Cocoa Beach, Cape Canaveral, Satellite Beach, Indialantic, Merritt Island, Viera, and unincorporated Brevard County.",
  },
];
