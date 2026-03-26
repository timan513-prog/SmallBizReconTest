import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronDown, ExternalLink, Download, FileText, Building2, ReceiptText, Lock, RefreshCw, Briefcase, Users, DollarSign, ClipboardCopy, Search, Sun, Moon, CircleAlert as AlertCircle, Sparkles } from "lucide-react";

interface FormItem {
  title: string;
  description?: string;
  viewUrl?: string;
  downloadPath: string;
  accentColor?: string;
  customButtonText?: string;
  customDate?: string;
  downloadButtonText?: string;
}

const defaultLastUpdated = "*LAST UPDATED March 1, 2026*";

const normalize = (s: string) => (s || "").toLowerCase().replace(/\s+/g, " ").trim();

const matchesQuery = (form: FormItem, q: string) => {
  if (!q) return true;
  const hay = `${form.title} ${form.description ?? ""}`.toLowerCase();
  return hay.includes(q);
};

const releaseOfCollateralForms: FormItem[] = [
  {
    title: "COVID EIDL Release of Collateral Request Requirements",
    description: "Release of Collateral Requirement Letter for COVID EIDL servicing action request packages",
    viewUrl: "https://www.sba.gov/document/support-release-collateral-requirement-letter-0",
    downloadPath: "https://www.sba.gov/sites/default/files/2025-05/CESC%20Release%20of%20Collateral%204.2025%20V1.pdf",
    accentColor: "#A2B98C"
  },
  {
    title: "Substitution of Collateral Requirement Letter",
    description: "Substitution of Collateral Requirement Letter for COVID EIDL servicing action request packages",
    viewUrl: "https://www.sba.gov/document/support-substitution-collateral-requirement-letter-0",
    downloadPath: "https://www.sba.gov/sites/default/files/2025-05/CESC%20Substitution%20of%20Collateral%204.2025%20V1.pdf",
    accentColor: "#A2B98C"
  },
  {
    title: "Release of Collateral Borrower Request Letter Template",
    description: "Borrower's Intended Use Release of Collateral Request Template",
    viewUrl: "/covid-eidl-toolkits",
    downloadPath: "/covid-eidl-toolkits",
    customDate: "*Available in our Premium Toolkits*",
    accentColor: "#A2B98C",
    customButtonText: "View Our Toolkits",
    downloadButtonText: "Premium Toolkits"
  },
  {
    title: "Borrower Authorization",
    description: "Borrower's consent to verify information and third-party authorization for disaster loan servicing action request packages",
    viewUrl: "https://www.sba.gov/document/sba-form-borrowers-consent-verify-information-third-party-authorization",
    downloadPath: "https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/public/sbaforms//BDLSC%20%20Borrower%20Authorization%20-%205-23.pdf",
    accentColor: "#A2B98C"
  },
  {
    title: "UCC Lien Search Tool",
    description: "National Association of Secretaries of State UCC search resources",
    viewUrl: "https://www.llcuniversity.com/50-secretary-of-state-sos-business-entity-search/",
    downloadPath: "https://www.e-secretaryofstate.com/",
    customButtonText: "View SOS Database",
    downloadButtonText: "View ESOS Database",
    customDate: "*LAST UPDATED JANUARY 30, 2026*",
    accentColor: "#A2B98C"
  },
  {
    title: "SBA Form 770, Financial Statement of Debtor",
    description: "Current Financial Statement of Debtor",
    viewUrl: "https://www.sba.gov/document/sba-form-770-financial-statement-debtor",
    downloadPath: "https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/public/sbaforms//FORM%20770%20FINANCIAL%20STATEMENT%20OF%20DEBTOR%2010-23-2024%20(2).pdf",
    accentColor: "#A2B98C"
  },
  {
    title: "SBA Form 2202, Schedule of Liabilities",
    description: "Shows the SBA how much money the borrower owes from liabilities and to whom",
    viewUrl: "https://www.sba.gov/document/sba-form-2202-schedule-liabilities",
    downloadPath: "https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/public/sbaforms//2202%20Schedule%20of%20Liabilities-508.pdf",
    accentColor: "#A2B98C"
  },
  {
    title: "COVID EIDL Servicing Capability",
    description: "Official SBA report on COVID-19 Economic Injury Disaster Loan servicing capabilities",
    viewUrl: "https://www.sba.gov/document/report-25-16-covid-19-economic-injury-disaster-loan-servicing-capability",
    downloadPath: "https://www.sba.gov/sites/default/files/2025-05/SBA%20OIG%20Report%2025-16.pdf",
    accentColor: "#A2B98C"
  },
  {
    title: "General Assistance Requirement Letter",
    description: "General Assistance Requirement Letter for COVID EIDL servicing request packages",
    viewUrl: "https://www.sba.gov/document/support-general-assistance-requirement-letter",
    downloadPath: "https://www.sba.gov/sites/default/files/2025-05/CESC%20General%20Assistance%204.2025%20V1.pdf",
    accentColor: "#A2B98C"
  }
];

const subordinationForms: FormItem[] = [
  {
    title: "COVID EIDL Subordination Requirement Letter",
    description: "Subordination Requirement Letter for COVID EIDL servicing action request packages",
    viewUrl: "https://www.sba.gov/document/support-cesc-subordination-requirement-letter",
    downloadPath: "https://www.sba.gov/sites/default/files/2025-05/CESC%20Subordination%204.2025%20V1.pdf",
    accentColor: "#7E9E61"
  },
  {
    title: "COVID EIDL Subordination Intended Use Letter",
    description: "Borrower's Intended Use Subordination Request Template",
    viewUrl: "/covid-eidl-toolkits",
    downloadPath: "/covid-eidl-toolkits",
    customDate: "*Available in our Premium Toolkits*",
    accentColor: "#7E9E61",
    customButtonText: "View Our Toolkits",
    downloadButtonText: "Premium Toolkits"
  },
  {
    title: "Borrower Authorization",
    description: "Borrower's consent to verify information and third-party authorization for disaster loan servicing action request packages",
    viewUrl: "https://www.sba.gov/document/sba-form-borrowers-consent-verify-information-third-party-authorization",
    downloadPath: "https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/public/sbaforms//BDLSC%20%20Borrower%20Authorization%20-%205-23.pdf",
    accentColor: "#7E9E61"
  },
  {
    title: "UCC Lien Search Tool",
    description: "National Association of Secretaries of State UCC search resources",
    viewUrl: "https://www.llcuniversity.com/50-secretary-of-state-sos-business-entity-search/",
    downloadPath: "https://www.e-secretaryofstate.com/",
    customButtonText: "View SOS Database",
    downloadButtonText: "View ESOS Database",
    customDate: "*LAST UPDATED JANUARY 30, 2026*",
    accentColor: "#7E9E61"
  },
  {
    title: "SBA Form 770, Financial Statement of Debtor",
    description: "Current Financial Statement of Debtor",
    viewUrl: "https://www.sba.gov/document/sba-form-770-financial-statement-debtor",
    downloadPath: "https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/public/sbaforms//FORM%20770%20FINANCIAL%20STATEMENT%20OF%20DEBTOR%2010-23-2024%20(2).pdf",
    accentColor: "#7E9E61"
  },
  {
    title: "SBA Form 2202, Schedule of Liabilities",
    description: "Shows the SBA how much money the borrower owes from liabilities and to whom",
    viewUrl: "https://www.sba.gov/document/sba-form-2202-schedule-liabilities",
    downloadPath: "https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/public/sbaforms//2202%20Schedule%20of%20Liabilities-508.pdf",
    accentColor: "#7E9E61"
  },
  {
    title: "COVID EIDL Servicing Capability",
    description: "Official SBA report on COVID-19 Economic Injury Disaster Loan servicing capabilities",
    viewUrl: "https://www.sba.gov/document/report-25-16-covid-19-economic-injury-disaster-loan-servicing-capability",
    downloadPath: "https://www.sba.gov/sites/default/files/2025-05/SBA%20OIG%20Report%2025-16.pdf",
    accentColor: "#7E9E61"
  },
  {
    title: "General Assistance Requirement Letter",
    description: "General Assistance Requirement Letter for COVID EIDL servicing request packages",
    viewUrl: "https://www.sba.gov/document/support-general-assistance-requirement-letter",
    downloadPath: "https://www.sba.gov/sites/default/files/2025-05/CESC%20General%20Assistance%204.2025%20V1.pdf",
    accentColor: "#7E9E61"
  }
];

const changeInOwnershipForms: FormItem[] = [
  {
    title: "Change in Ownership Requirement Letter",
    description: "Change in Ownership Requirement Letter for COVID EIDL servicing action request packages",
    viewUrl: "https://www.sba.gov/document/support-change-ownership-requirement-letter",
    downloadPath: "https://www.sba.gov/sites/default/files/2025-06/CESC%20Change%20In%20Ownership%204.2025%20V1.pdf",
    accentColor: "#5D829C"
  },
  {
    title: "Change in Ownership Request Template",
    description: "Borrower's Intended Use Change of Ownership Request Template",
    viewUrl: "/covid-eidl-toolkits",
    downloadPath: "/covid-eidl-toolkits",
    customDate: "*Available in our Premium Toolkits*",
    accentColor: "#5D829C",
    customButtonText: "View Our Toolkits",
    downloadButtonText: "Premium Toolkits"
  },
  {
    title: "SBA Form 912, Statement of Personal History",
    description: "SBA uses to assess borrower's program eligibility",
    viewUrl: "https://www.sba.gov/document/sba-form-912-statement-personal-history",
    downloadPath: "https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/public/sbaforms//SBA-912%20STATEMENT%20OF%20PERSONAL%20HISTORY-508.pdf",
    accentColor: "#5D829C"
  },
  {
    title: "Borrower Authorization",
    description: "Borrower's consent to verify information and third-party authorization for disaster loan servicing action request packages",
    viewUrl: "https://www.sba.gov/document/sba-form-borrowers-consent-verify-information-third-party-authorization",
    downloadPath: "https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/public/sbaforms//BDLSC%20%20Borrower%20Authorization%20-%205-23.pdf",
    accentColor: "#5D829C"
  },
  {
    title: "UCC Lien Search Tool",
    description: "National Association of Secretaries of State UCC search resources",
    viewUrl: "https://www.llcuniversity.com/50-secretary-of-state-sos-business-entity-search/",
    downloadPath: "https://www.e-secretaryofstate.com/",
    customButtonText: "View SOS Database",
    downloadButtonText: "View ESOS Database",
    customDate: "*LAST UPDATED JANUARY 30, 2026*",
    accentColor: "#5D829C"
  },
  {
    title: "SBA Form 770, Financial Statement of Debtor",
    description: "Current Financial Statement of Debtor",
    viewUrl: "https://www.sba.gov/document/sba-form-770-financial-statement-debtor",
    downloadPath: "https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/public/sbaforms//FORM%20770%20FINANCIAL%20STATEMENT%20OF%20DEBTOR%2010-23-2024%20(2).pdf",
    accentColor: "#5D829C"
  },
  {
    title: "SBA Form 2202, Schedule of Liabilities",
    description: "Shows the SBA how much money the borrower owes from liabilities and to whom",
    viewUrl: "https://www.sba.gov/document/sba-form-2202-schedule-liabilities",
    downloadPath: "https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/public/sbaforms//2202%20Schedule%20of%20Liabilities-508.pdf",
    accentColor: "#5D829C"
  },
  {
    title: "COVID EIDL Servicing Capability",
    description: "Official SBA report on COVID-19 Economic Injury Disaster Loan servicing capabilities",
    viewUrl: "https://www.sba.gov/document/report-25-16-covid-19-economic-injury-disaster-loan-servicing-capability",
    downloadPath: "https://www.sba.gov/sites/default/files/2025-05/SBA%20OIG%20Report%2025-16.pdf",
    accentColor: "#5D829C"
  },
  {
    title: "General Assistance Requirement Letter",
    description: "General Assistance Requirement Letter for COVID EIDL servicing request packages",
    viewUrl: "https://www.sba.gov/document/support-general-assistance-requirement-letter",
    downloadPath: "https://www.sba.gov/sites/default/files/2025-05/CESC%20General%20Assistance%204.2025%20V1.pdf",
    accentColor: "#5D829C"
  }
];

const relocationOfBusinessForms: FormItem[] = [
  {
    title: "Relocation of Business Requirement Letter",
    description: "Relocation of Business Requirement Letter for COVID EIDL servicing action request packages",
    viewUrl: "https://www.sba.gov/document/support-relocation-business-requirement-letter",
    downloadPath: "https://www.sba.gov/sites/default/files/2025-05/Relocation%20of%20Business%204.2025%20V1_1.pdf",
    accentColor: "#8B4513"
  },
  {
    title: "Relocation of Business Request Template",
    description: "Borrower's Intended Use Relocation of Business Request Template",
    viewUrl: "/covid-eidl-toolkits",
    downloadPath: "/covid-eidl-toolkits",
    customDate: "*Available in our Premium Toolkits*",
    accentColor: "#8B4513",
    customButtonText: "View Our Toolkits",
    downloadButtonText: "Premium Toolkits"
  },
  {
    title: "Borrower Authorization",
    description: "Borrower's consent to verify information and third-party authorization for disaster loan servicing action request packages",
    viewUrl: "https://www.sba.gov/document/sba-form-borrowers-consent-verify-information-third-party-authorization",
    downloadPath: "https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/public/sbaforms//BDLSC%20%20Borrower%20Authorization%20-%205-23.pdf",
    accentColor: "#8B4513"
  },
  {
    title: "Certificate of Good Standing",
    description: "A state-issued document that verifies a business is legally registered, authorized to operate, and compliant with all the necessary filing requirements",
    viewUrl: "https://zrktinvphjmalvrsjmii.supabase.co/storage/v1/object/public/SmallBiz%20Recon%20Free%20Tools/Complete%20Guide%20to%20Certificate%20of%20Good%20Standing.pdf",
    downloadPath: "https://zrktinvphjmalvrsjmii.supabase.co/storage/v1/object/public/SmallBiz%20Recon%20Free%20Tools/Complete%20Guide%20to%20Certificate%20of%20Good%20Standing.pdf",
    accentColor: "#8B4513"
  },
  {
    title: "COVID EIDL Servicing Capability",
    description: "Official SBA report on COVID-19 Economic Injury Disaster Loan servicing capabilities",
    viewUrl: "https://www.sba.gov/document/report-25-16-covid-19-economic-injury-disaster-loan-servicing-capability",
    downloadPath: "https://www.sba.gov/sites/default/files/2025-05/SBA%20OIG%20Report%2025-16.pdf",
    accentColor: "#8B4513"
  },
  {
    title: "General Assistance Requirement Letter",
    description: "General Assistance Requirement Letter for COVID EIDL servicing request packages",
    viewUrl: "https://www.sba.gov/document/support-general-assistance-requirement-letter",
    downloadPath: "https://www.sba.gov/sites/default/files/2025-05/CESC%20General%20Assistance%204.2025%20V1.pdf",
    accentColor: "#8B4513"
  }
];

const releaseOfGuarantorForms: FormItem[] = [
  {
    title: "Release of Guarantor Requirement Letter",
    description: "Release of Guarantor Requirement Letter for COVID EIDL servicing action request packages",
    viewUrl: "https://www.sba.gov/document/support-release-guarantor-requirement-letter-0",
    downloadPath: "https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/public/sbaforms//CESC%20Release%20of%20Guarantor%204.2025%20.pdf",
    accentColor: "#444A47"
  },
  {
    title: "Release of Guarantor Request Template",
    description: "Borrower's Intended Use Release of Guarantor Request Template",
    viewUrl: "/covid-eidl-toolkits",
    downloadPath: "/covid-eidl-toolkits",
    customDate: "*Available in our Premium Toolkits*",
    accentColor: "#444A47",
    customButtonText: "View Our Toolkits",
    downloadButtonText: "Premium Toolkits"
  },
  {
    title: "Borrower Authorization",
    description: "Borrower's consent to verify information and third-party authorization for disaster loan servicing action request packages",
    viewUrl: "https://www.sba.gov/document/sba-form-borrowers-consent-verify-information-third-party-authorization",
    downloadPath: "https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/public/sbaforms//BDLSC%20%20Borrower%20Authorization%20-%205-23.pdf",
    accentColor: "#444A47"
  },
  {
    title: "YTD Profit and Loss Statement",
    description: "Most recent YTD Profit and Loss Statement of the assuming party",
    viewUrl: "https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/public/sbaforms//SBARecon_YTD_Profit_and_Loss_Statement_Template.xlsx",
    downloadPath: "https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/public/sbaforms//SBARecon_YTD_Profit_and_Loss_Statement_Template.xlsx",
    accentColor: "#444A47"
  },
  {
    title: "SBA Form 413, Personal Financial Statement of Debtor",
    description: "Used to collect information about the Business Applicant and its owners' financial condition.",
    viewUrl: "https://www.sba.gov/document/sba-form-413-personal-financial-statement",
    downloadPath: "https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/public/sbaforms//SBAForm413%20PERSONAL%20FINANCIAL%20STATEMENT.pdf",
    accentColor: "#444A47"
  },
  {
    title: "SBA Form 770, Financial Statement of Debtor",
    description: "Current Financial Statement of Debtor",
    viewUrl: "https://www.sba.gov/document/sba-form-770-financial-statement-debtor",
    downloadPath: "https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/public/sbaforms//FORM%20770%20FINANCIAL%20STATEMENT%20OF%20DEBTOR%2010-23-2024%20(2).pdf",
    accentColor: "#444A47"
  },
  {
    title: "SBA Form 2202, Schedule of Liabilities",
    description: "Shows the SBA how much money the borrower owes from liabilities and to whom",
    viewUrl: "https://www.sba.gov/document/sba-form-2202-schedule-liabilities",
    downloadPath: "https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/public/sbaforms//2202%20Schedule%20of%20Liabilities-508.pdf",
    accentColor: "#444A47"
  },
  {
    title: "COVID EIDL Servicing Capability",
    description: "Official SBA report on COVID-19 Economic Injury Disaster Loan servicing capabilities",
    viewUrl: "https://www.sba.gov/document/report-25-16-covid-19-economic-injury-disaster-loan-servicing-capability",
    downloadPath: "https://www.sba.gov/sites/default/files/2025-05/SBA%20OIG%20Report%2025-16.pdf",
    accentColor: "#444A47"
  },
  {
    title: "General Assistance Requirement Letter",
    description: "General Assistance Requirement Letter for COVID EIDL servicing request packages",
    viewUrl: "https://www.sba.gov/document/support-general-assistance-requirement-letter",
    downloadPath: "https://www.sba.gov/sites/default/files/2025-05/CESC%20General%20Assistance%204.2025%20V1.pdf",
    accentColor: "#444A47"
  }
];

const substitutionOfCollateralForms: FormItem[] = [
  {
    title: "Substitution of Collateral Requirement Letter",
    description: "Substitution of Collateral Requirement Letter for COVID EIDL servicing action request packages",
    viewUrl: "https://www.sba.gov/document/support-substitution-collateral-requirement-letter-0",
    downloadPath: "https://www.sba.gov/sites/default/files/2025-05/CESC%20Substitution%20of%20Collateral%204.2025%20V1.pdf",
    accentColor: "#4A5A28"
  },
  {
    title: "Substitution of Collateral Request Template",
    description: "Borrower's Intended Use Substitution of Collateral Request Template",
    viewUrl: "/covid-eidl-toolkits",
    downloadPath: "/covid-eidl-toolkits",
    customDate: "*Available in our Premium Toolkits*",
    accentColor: "#4A5A28",
    customButtonText: "View Our Toolkits",
    downloadButtonText: "Premium Toolkits"
  },
  {
    title: "Borrower Authorization",
    description: "Borrower's consent to verify information and third-party authorization for disaster loan servicing action request packages",
    viewUrl: "https://www.sba.gov/document/sba-form-borrowers-consent-verify-information-third-party-authorization",
    downloadPath: "https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/public/sbaforms//BDLSC%20%20Borrower%20Authorization%20-%205-23.pdf",
    accentColor: "#4A5A28"
  },
  {
    title: "YTD Profit and Loss Statement",
    description: "Most recent YTD Profit and Loss Statement of the assuming party",
    viewUrl: "https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/public/sbaforms//SBARecon_YTD_Profit_and_Loss_Statement_Template.xlsx",
    downloadPath: "https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/public/sbaforms//SBARecon_YTD_Profit_and_Loss_Statement_Template.xlsx",
    accentColor: "#4A5A28"
  },
  {
    title: "UCC Lien Search Tool",
    description: "National Association of Secretaries of State UCC search resources",
    viewUrl: "https://www.llcuniversity.com/50-secretary-of-state-sos-business-entity-search/",
    downloadPath: "https://www.e-secretaryofstate.com/",
    customButtonText: "View SOS Database",
    downloadButtonText: "View ESOS Database",
    customDate: "*LAST UPDATED JANUARY 30, 2026*",
    accentColor: "#4A5A28"
  },
  {
    title: "SBA Form 770, Financial Statement of Debtor",
    description: "Current Financial Statement of Debtor",
    viewUrl: "https://www.sba.gov/document/sba-form-770-financial-statement-debtor",
    downloadPath: "https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/public/sbaforms//FORM%20770%20FINANCIAL%20STATEMENT%20OF%20DEBTOR%2010-23-2024%20(2).pdf",
    accentColor: "#4A5A28"
  },
  {
    title: "SBA Form 2202, Schedule of Liabilities",
    description: "Shows the SBA how much money the borrower owes from liabilities and to whom",
    viewUrl: "https://www.sba.gov/document/sba-form-2202-schedule-liabilities",
    downloadPath: "https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/public/sbaforms//2202%20Schedule%20of%20Liabilities-508.pdf",
    accentColor: "#4A5A28"
  }
];

const assumptionForms: FormItem[] = [
  {
    title: "Assumption Requirement Letter",
    description: "Assumption Requirement Letter for COVID EIDL servicing action request packages",
    viewUrl: "https://www.sba.gov/document/support-assumption-requirement-letter",
    downloadPath: "https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/public/sbaforms//CESC%20Assumption%204.2025%20V1.pdf",
    accentColor: "#556B2F"
  },
  {
    title: "Assumption Request Template",
    description: "Borrower's Intended Use Assumption Request Template",
    viewUrl: "/covid-eidl-toolkits",
    downloadPath: "/covid-eidl-toolkits",
    customDate: "*Available in our Premium Toolkits*",
    accentColor: "#556B2F",
    customButtonText: "View Our Toolkits",
    downloadButtonText: "Premium Toolkits"
  },
  {
    title: "Borrower Authorization",
    description: "Borrower's consent to verify information and third-party authorization for disaster loan servicing action request packages",
    viewUrl: "https://www.sba.gov/document/sba-form-borrowers-consent-verify-information-third-party-authorization",
    downloadPath: "https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/public/sbaforms//BDLSC%20%20Borrower%20Authorization%20-%205-23.pdf",
    accentColor: "#556B2F"
  },
  {
    title: "Certificate of Good Standing",
    description: "A state-issued document that verifies a business is legally registered, authorized to operate, and compliant with all the necessary filing requirements",
    viewUrl: "https://zrktinvphjmalvrsjmii.supabase.co/storage/v1/object/public/SmallBiz%20Recon%20Free%20Tools/Complete%20Guide%20to%20Certificate%20of%20Good%20Standing.pdf",
    downloadPath: "https://zrktinvphjmalvrsjmii.supabase.co/storage/v1/object/public/SmallBiz%20Recon%20Free%20Tools/Complete%20Guide%20to%20Certificate%20of%20Good%20Standing.pdf",
    accentColor: "#556B2F"
  },
  {
    title: "SBA Form 912, Statement of Personal History",
    description: "SBA uses to assess borrower's program eligibility",
    viewUrl: "https://www.sba.gov/document/sba-form-912-statement-personal-history",
    downloadPath: "https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/public/sbaforms//SBA-912%20STATEMENT%20OF%20PERSONAL%20HISTORY-508.pdf",
    accentColor: "#556B2F"
  },
  {
    title: "YTD Profit and Loss Statement",
    description: "Most recent YTD Profit and Loss Statement of the assuming party",
    viewUrl: "https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/public/sbaforms//SBARecon_YTD_Profit_and_Loss_Statement_Template.xlsx",
    downloadPath: "https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/public/sbaforms//SBARecon_YTD_Profit_and_Loss_Statement_Template.xlsx",
    accentColor: "#556B2F"
  },
  {
    title: "COVID EIDL Servicing Capability",
    description: "Official SBA report on COVID-19 Economic Injury Disaster Loan servicing capabilities",
    viewUrl: "https://www.sba.gov/document/report-25-16-covid-19-economic-injury-disaster-loan-servicing-capability",
    downloadPath: "https://www.sba.gov/sites/default/files/2025-05/SBA%20OIG%20Report%2025-16.pdf",
    accentColor: "#556B2F"
  },
  {
    title: "General Assistance Requirement Letter",
    description: "General Assistance Requirement Letter for COVID EIDL servicing request packages",
    viewUrl: "https://www.sba.gov/document/support-general-assistance-requirement-letter",
    downloadPath: "https://www.sba.gov/sites/default/files/2025-05/CESC%20General%20Assistance%204.2025%20V1.pdf",
    accentColor: "#556B2F"
  }
];

const sba504LoansForms: FormItem[] = [
  {
    title: "SBA Form 1244, SBA 504 Borrower Information Form",
    description: "Application for Section 504 Loans",
    viewUrl: "https://www.sba.gov/document/sba-form-1244-sba-504-borrower-information-form",
    downloadPath: "https://www.sba.gov/sites/default/files/2025-03/SBA%20Form%201244%20-%20SBA%20504%20Borrower%20Information%20Form_effective%2002.2025.pdf",
    accentColor: "#CDA349"
  },
  {
    title: "SBA Form 1244, Application for Section 504 Loans",
    description: "Main application form for SBA 504 loans",
    viewUrl: "https://www.sba.gov/document/sba-form-1244-application-section-504-loans",
    downloadPath: "https://www.sba.gov/sites/default/files/2023-01/Form%201244%20-%20ALP%20Express_extension%2011.29.2022_508%20%281%29.pdf",
    accentColor: "#CDA349"
  },
  {
    title: "SBA Form 413, Personal Financial Statement",
    description: "Required for all owners with 20% or more ownership",
    viewUrl: "https://www.sba.gov/document/sba-form-413-personal-financial-statement",
    downloadPath: "https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/public/sbaforms//SBAForm413%20PERSONAL%20FINANCIAL%20STATEMENT.pdf",
    accentColor: "#CDA349"
  },
  {
    title: "Borrower Certifications Addendum to Form 1244",
    description: "Borrower Certifications as an Addendum to Form 1244 as per SOP 50 10 7",
    viewUrl: "https://www.sba.gov/document/support-borrower-certifications-addendum-form-1244-sop-50-10-7",
    downloadPath: "https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/public/sbaforms//Borrower%20Certifications%20as%20an%20Addendum%20to%20Form%201244%20as%20per%20SOP%2050%2010%207%20(1).docx",
    customButtonText: "View on SBA.gov",
    downloadButtonText: "Download .docx",
    customDate: "*LAST UPDATED JANUARY 30, 2026*",
    accentColor: "#CDA349"
  },
  {
    title: "SBA Form 159, Fee Disclosure Form",
    description: "Required for all agent or representative fees",
    viewUrl: "https://www.sba.gov/document/sba-form-159-fee-disclosure-compensation-agreement",
    downloadPath: "https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/public/sbaforms//SBA%20Form%20159_2.10.22-508_0.pdf",
    accentColor: "#CDA349"
  },
  {
    title: "SBA Form 912, Statement of Personal History",
    description: "SBA uses to assess borrower's program eligibility",
    viewUrl: "https://www.sba.gov/document/sba-form-912-statement-personal-history",
    downloadPath: "https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/public/sbaforms//SBA-912%20STATEMENT%20OF%20PERSONAL%20HISTORY-508.pdf",
    accentColor: "#CDA349"
  }
];

const sba7aLoansForms: FormItem[] = [
  {
    title: "SBA Form 1919, Borrower Information Form",
    description: "Main application form for SBA 7(a) loans",
    viewUrl: "https://www.sba.gov/document/sba-form-1919-borrower-information-form",
    downloadPath: "https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/public/sbaforms//2025.02.27%20Form%201919%20-%20Updates%20(FINAL)_03-12-2025%20(1).pdf",
    accentColor: "#5D829C"
  },
  {
    title: "SBA Form 413, Personal Financial Statement",
    description: "Required for all owners with 20% or more ownership",
    viewUrl: "https://www.sba.gov/document/sba-form-413-personal-financial-statement-7a504-loans-surety-bonds",
    downloadPath: "https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/public/sbaforms//SBAForm413%20PERSONAL%20FINANCIAL%20STATEMENT.pdf",
    accentColor: "#5D829C"
  },
  {
    title: "SBA Form 1920, Lender's Application",
    description: "Form completed by the lender for 7(a) loans",
    viewUrl: "https://www.sba.gov/document/sba-form-1920-lenders-application-guaranty",
    downloadPath: "https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/public/sbaforms//sba-form-1920.pdf",
    accentColor: "#5D829C"
  },
  {
    title: "SBA Form 159, Fee Disclosure Form",
    description: "Required for all agent or representative fees",
    viewUrl: "https://www.sba.gov/document/sba-form-159-fee-disclosure-compensation-agreement",
    downloadPath: "https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/public/sbaforms//SBA%20Form%20159_2.10.22-508_0.pdf",
    accentColor: "#5D829C"
  },
  {
    title: "SBA Form 912, Statement of Personal History",
    description: "SBA uses to assess borrower's program eligibility",
    viewUrl: "https://www.sba.gov/document/sba-form-912-statement-personal-history",
    downloadPath: "https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/public/sbaforms//SBA-912%20STATEMENT%20OF%20PERSONAL%20HISTORY-508.pdf",
    accentColor: "#5D829C"
  }
];

const pppLoansForms: FormItem[] = [
  {
    title: "SBA Form 3508, PPP Loan Forgiveness Application",
    description: "PPP Loan Forgiveness Calculation Form",
    viewUrl: "https://www.sba.gov/document/sba-form-3508-ppp-loan-forgiveness-application-instructions",
    downloadPath: "https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/public/sbaforms//PPP%20--%20Forgiveness%20Application%20and%20Instructions%20--%203508%20(7.30.2021)-508.pdf",
    accentColor: "#D4B483"
  },
  {
    title: "SBA Form 3508S - PPP Loan Forgiveness (Simplified)",
    description: "Simplified form for PPP loans of $150,000 or less",
    viewUrl: "https://www.sba.gov/document/sba-form-3508s-ppp-3508s-loan-forgiveness-application-instructions",
    downloadPath: "https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/public/sbaforms//PPP%20--%20Forgiveness%20Application%20and%20Instructions%20--%203508S%20(7.30.2021)-508.pdf",
    accentColor: "#D4B483"
  },
  {
    title: "SBA Form 3513 - Declaration of Identity Theft",
    description: "Complete this form if you need the U.S. Small Business Administration to review an outstanding loan or grant for identity theft.",
    viewUrl: "https://www.sba.gov/document/sba-form-3513-declaration-identity-theft",
    downloadPath: "https://zrktinvphjmalvrsjmii.supabase.co/storage/v1/object/public/SmallBiz%20Recon%20Free%20Tools/SBA%20Form%203513%20(11-24)%20Declaration%20of%20Identity%20Theft.pdf",
    accentColor: "#D4B483"
  },
  {
    title: "SBA Form 3508EZ, PPP Loan Forgiveness (EZ)",
    description: "Streamlined form for certain PPP borrowers",
    viewUrl: "https://www.sba.gov/document/sba-form-3508ez-ppp-ez-loan-forgiveness-application-instructions",
    downloadPath: "https://www.sba.gov/sites/default/files/2021-07/PPP%20--%20Forgiveness%20Application%20and%20Instructions%20--%203508S%20%287.30.2021%29-508.pdf",
    accentColor: "#D4B483"
  }
];

const otherImportantForms: FormItem[] = [
  {
    title: "SBA Form 912, Statement of Personal History",
    description: "SBA uses to assess borrower's program eligibility",
    viewUrl: "https://www.sba.gov/document/sba-form-912-statement-personal-history",
    downloadPath: "https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/public/sbaforms//SBA-912%20STATEMENT%20OF%20PERSONAL%20HISTORY-508.pdf",
    accentColor: "#3B4C1C"
  },
  {
    title: "SBA Form 413, Personal Financial Statement",
    description: "Required for all owners with 20% or more ownership",
    viewUrl: "https://www.sba.gov/document/sba-form-413-personal-financial-statement-7a504-loans-surety-bonds",
    downloadPath: "https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/public/sbaforms//SBAForm413%20PERSONAL%20FINANCIAL%20STATEMENT.pdf",
    accentColor: "#3B4C1C"
  },
  {
    title: "SBA Franchise Directory",
    description: "Available for Lenders/CDCs to assess a small business's eligibility under an agreement",
    viewUrl: "https://www.sba.gov/document/support-sba-franchise-directory",
    downloadPath: "https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/public/sbaforms//Franchise%20Directory%20July%207%202025.xlsx",
    customButtonText: "View on SBA.gov",
    downloadButtonText: "Download .xlsx",
    customDate: "*LAST UPDATED JANUARY 30, 2026*",
    accentColor: "#3B4C1C"
  },
  {
    title: "IRS Form 4506-C - IVES Request for Transcript of Tax Return",
    description: "SBA uses the IRS Form 4506-C to request tax transcripts from the IRS for SBA disaster loan applicants.",
    viewUrl: "https://www.sba.gov/document/sba-form-4506-c-irs-form-4506-c-sba-disaster-loan",
    downloadPath: "https://zrktinvphjmalvrsjmii.supabase.co/storage/v1/object/public/SmallBiz%20Recon%20Free%20Tools/Form%204506-C%20(2024%20Tax%20Yr)%20508.pdf",
    accentColor: "#3B4C1C"
  },
  {
  title: "IRS Form 4506-C - Instructions",
    description: "SBA uses the IRS Form 4506-C to request tax transcripts from the IRS for SBA disaster loan applicants.",
    viewUrl: "https://www.sba.gov/document/support-instructions-completing-irs-form-4506-c-sba-disaster-loan",
    downloadPath: "https://zrktinvphjmalvrsjmii.supabase.co/storage/v1/object/public/SmallBiz%20Recon%20Free%20Tools/ELARequest_for_Transcript_of_Tax_Ret_Ins.pdf",
    accentColor: "#3B4C1C"
  },
  {
    title: "IRS Form 4506-T, Tax Return Transcript Request",
    description: "IRS form commonly referenced for disaster loan documentation workflows",
    viewUrl: "https://www.irs.gov/forms-pubs/about-form-4506-t",
    downloadPath: "https://www.irs.gov/pub/irs-pdf/f4506t.pdf",
    accentColor: "#3B4C1C"
  },
  {
    title: "SBA Form 159 - Fee Disclosure Form",
    description: "Required for all agent or representative fees",
    viewUrl: "https://www.sba.gov/document/sba-form-159-fee-disclosure-compensation-agreement",
    downloadPath: "https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/public/sbaforms//SBA%20Form%20159_2.10.22-508_0.pdf",
    accentColor: "#3B4C1C"
  },
  {
    title: "SOP 50 52 2, Disaster Loan Servicing and Liquidation",
    description: "Policies and procedures for disaster loan servicing and liquidation",
    viewUrl: "https://www.sba.gov/document/sop-50-52-2-disaster-loan-servicing-and-liquidation",
    downloadPath: "https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/public/sbaforms//SBA%20SOP_50_52_2_1.pdf",
    accentColor: "#3B4C1C"
  },
  {
    title: "Glossary of Business Financial Terms",
    description: "Defines terminology related to financial statements and disaster business loan applications",
    viewUrl: "https://www.sba.gov/document/support--glossary-business-financial-terms",
    downloadPath: "https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/public/sbaforms//Glossary%20of%20Business%20Financial%20Terms.pdf",
    accentColor: "#3B4C1C"
  },
  {
    title: "COVID-19 Pandemic EIDL and PPP Loan Fraud Landscape Recommendations Update",
    description: "Congressional report on progress made by SBA on pandemic-related recommendations",
    viewUrl: "https://www.sba.gov/document/report-25-10-covid-19-pandemic-eidl-ppp-loan-fraud-landscape-recommendations-update",
    downloadPath: "https://www.sba.gov/sites/default/files/2025-03/SBA%20OIG%20Report%2025-10.pdf",
    accentColor: "#3B4C1C"
  },
  {
    title: "UCC Lien Search Tool",
    description: "National Association of Secretaries of State UCC search resources",
    viewUrl: "https://www.llcuniversity.com/50-secretary-of-state-sos-business-entity-search/",
    downloadPath: "https://www.e-secretaryofstate.com/",
    customButtonText: "View SOS Database",
    downloadButtonText: "View ESOS Database",
    customDate: "*LAST UPDATED JANUARY 30, 2026*",
    accentColor: "#3B4C1C"
  },
  {
    title: "SBA Form 770, Financial Statement of Debtor",
    description: "Current Financial Statement of Debtor",
    viewUrl: "https://www.sba.gov/document/sba-form-770-financial-statement-debtor",
    downloadPath: "https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/public/sbaforms//FORM%20770%20FINANCIAL%20STATEMENT%20OF%20DEBTOR%2010-23-2024%20(2).pdf",
    accentColor: "#3B4C1C"
  },
  {
    title: "SBA Form 2202, Schedule of Liabilities",
    description: "Shows the SBA how much money the borrower owes from liabilities and to whom",
    viewUrl: "https://www.sba.gov/document/sba-form-2202-schedule-liabilities",
    downloadPath: "https://rufgrcaxemvewhqiayfk.supabase.co/storage/v1/object/public/sbaforms//2202%20Schedule%20of%20Liabilities-508.pdf",
    accentColor: "#3B4C1C"
  }
];

const THEMES = {
  dark: {
    "--bg-primary": "#181c14",
    "--bg-secondary": "rgba(30, 34, 26, 0.6)",
    "--bg-card": "rgba(30, 34, 26, 0.6)",
    "--bg-card-hover": "rgba(36, 42, 30, 0.7)",
    "--bg-hero": "linear-gradient(180deg, rgba(50,62,38,0.7) 0%, rgba(24,28,20,0.98) 100%)",
    "--border-primary": "rgba(154, 184, 122, 0.1)",
    "--border-hover": "rgba(154, 184, 122, 0.25)",
    "--text-primary": "#e8ede2",
    "--text-secondary": "#8a9480",
    "--text-muted": "#5a6450",
    "--accent-green": "#9ab87a",
    "--accent-gold": "#c8a84e",
    "--glass-blur": "blur(24px)",
    "--shadow-card": "0 4px 32px rgba(0,0,0,0.2)",
    "--shadow-card-hover": "0 24px 64px rgba(0,0,0,0.35)",
    "--grid-opacity": "0.03",
    "--particle-opacity": "0.15",
    "--overlay-green": "rgba(74,120,54,0.08)",
  },
  light: {
    "--bg-primary": "#f5f3ee",
    "--bg-secondary": "rgba(255, 255, 255, 0.7)",
    "--bg-card": "rgba(255, 255, 255, 0.75)",
    "--bg-card-hover": "rgba(255, 255, 255, 0.9)",
    "--bg-hero": "linear-gradient(180deg, #3d5a2a 0%, #2a3d1e 100%)",
    "--border-primary": "rgba(74, 120, 54, 0.12)",
    "--border-hover": "rgba(74, 120, 54, 0.25)",
    "--text-primary": "#1a2e12",
    "--text-secondary": "#5a6b52",
    "--text-muted": "#8a9680",
    "--accent-green": "#4A7836",
    "--accent-gold": "#9a7a28",
    "--glass-blur": "blur(20px)",
    "--shadow-card": "0 4px 24px rgba(0,0,0,0.06)",
    "--shadow-card-hover": "0 20px 48px rgba(0,0,0,0.1)",
    "--grid-opacity": "0.04",
    "--particle-opacity": "0.1",
    "--overlay-green": "rgba(74,120,54,0.04)",
  },
};

function GridOverlay() {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0, opacity: "var(--grid-opacity)" }}>
      <svg width="100%" height="100%">
        <defs>
          <pattern id="formsGrid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="var(--accent-green)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#formsGrid)" />
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
          width: `${1.5 + Math.random() * 2.5}px`,
          height: `${1.5 + Math.random() * 2.5}px`,
          borderRadius: "50%",
          background: `rgba(154, 184, 122, var(--particle-opacity))`,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animation: `pFloat ${9 + Math.random() * 14}s ease-in-out infinite`,
          animationDelay: `${Math.random() * -12}s`,
        }} />
      ))}
    </div>
  );
}

const FormCard: React.FC<{ form: FormItem }> = ({ form }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        overflow: "hidden",
        background: "var(--bg-card)",
        backdropFilter: "var(--glass-blur)",
        WebkitBackdropFilter: "var(--glass-blur)",
        border: `1px solid ${hovered ? "var(--border-hover)" : "var(--border-primary)"}`,
        borderRadius: 20,
        padding: 24,
        boxShadow: hovered ? "var(--shadow-card-hover)" : "var(--shadow-card)",
        transform: hovered ? "translateY(-6px) scale(1.02)" : "translateY(0) scale(1)",
        transition: "all 0.6s cubic-bezier(0.23,1,0.32,1)",
        height: "100%",
        width: "100%",
        minHeight: 340,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: 4,
        height: "100%",
        background: "#c8a84e",
        opacity: hovered ? 1 : 0.6,
        transition: "opacity 0.4s ease",
      }} />

      <div style={{
        position: "absolute",
        top: -100,
        right: -100,
        width: 200,
        height: 200,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(200,168,78,0.15), transparent 70%)",
        opacity: hovered ? 0.4 : 0,
        transition: "opacity 0.6s ease",
      }} />

      <div style={{ position: "relative", zIndex: 1, flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
          <FileText size={20} style={{ color: "#c8a84e", marginRight: 12 }} />
          <h4 style={{
            fontFamily: "var(--font-display)",
            fontSize: 17,
            fontWeight: 400,
            color: "var(--text-primary)",
            lineHeight: 1.35,
            flex: 1,
          }}>
            {form.title}
          </h4>
        </div>

        {form.description && (
          <p style={{
            color: "var(--text-secondary)",
            fontSize: 14,
            lineHeight: 1.6,
            marginBottom: 20,
            fontFamily: "var(--font-body)",
            flex: 1,
          }}>
            {form.description}
          </p>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: "auto" }}>
          {form.viewUrl && (
            <a
              href={form.viewUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                padding: "12px 20px",
                borderRadius: 12,
                border: "1px solid var(--border-primary)",
                background: "transparent",
                color: "var(--text-primary)",
                fontSize: 14,
                fontWeight: 600,
                fontFamily: "var(--font-body)",
                textDecoration: "none",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--border-hover)";
                e.currentTarget.style.background = "var(--bg-secondary)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border-primary)";
                e.currentTarget.style.background = "transparent";
              }}
            >
              <ExternalLink size={16} />
              {form.customButtonText || "View Source"}
            </a>
          )}

          <a
            href={form.downloadPath}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              padding: "12px 20px",
              borderRadius: 12,
              background: "linear-gradient(135deg, rgba(200,168,78,0.4), rgba(200,168,78,0.2))",
              border: "1px solid rgba(200,168,78,0.5)",
              color: "var(--text-primary)",
              fontSize: 14,
              fontWeight: 600,
              fontFamily: "var(--font-body)",
              textDecoration: "none",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "linear-gradient(135deg, rgba(200,168,78,0.6), rgba(200,168,78,0.3))";
              e.currentTarget.style.transform = "scale(1.03)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "linear-gradient(135deg, rgba(200,168,78,0.4), rgba(200,168,78,0.2))";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <Download size={16} />
            {form.downloadButtonText || "Download"}
          </a>

          <p style={{
            fontSize: 11,
            color: "var(--text-muted)",
            fontStyle: "italic",
            textAlign: "center",
            marginTop: 4,
            fontFamily: "var(--font-body)",
          }}>
            {form.customDate || defaultLastUpdated}
          </p>
        </div>
      </div>
    </div>
  );
};

const CollapsibleSection: React.FC<{
  title: string;
  icon: JSX.Element;
  forms: FormItem[];
  isOpen: boolean;
  onToggle: () => void;
  filterText: string;
}> = ({ title, icon, forms, isOpen, onToggle, filterText }) => {
  const q = normalize(filterText);
  const filteredForms = forms.filter((f) => matchesQuery(f, q));

  if (filteredForms.length === 0) return null;

  return (
    <div style={{
      background: "var(--bg-card)",
      backdropFilter: "var(--glass-blur)",
      WebkitBackdropFilter: "var(--glass-blur)",
      borderRadius: 20,
      border: "1px solid var(--border-primary)",
      overflow: "hidden",
      boxShadow: "var(--shadow-card)",
    }}>
      <button
        onClick={onToggle}
        style={{
          width: "100%",
          padding: "24px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "transparent",
          border: "none",
          borderBottom: isOpen ? "1px solid var(--border-primary)" : "none",
          cursor: "pointer",
          transition: "all 0.3s ease",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {icon}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <h3 style={{
              fontFamily: "var(--font-display)",
              fontSize: 22,
              fontWeight: 400,
              color: "var(--text-primary)",
            }}>
              {title}
            </h3>
            <span style={{
              fontSize: 12,
              color: "var(--text-muted)",
              fontFamily: "var(--font-body)",
            }}>
              {filteredForms.length} form{filteredForms.length === 1 ? '' : 's'}
            </span>
          </div>
        </div>

        <ChevronDown
          size={24}
          style={{
            color: "var(--text-secondary)",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.4s cubic-bezier(0.23,1,0.32,1)",
          }}
        />
      </button>

      {isOpen && (
        <div style={{
          padding: 32,
          animation: "fadeSlideIn 0.5s ease-out both",
        }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: 24,
            alignItems: "stretch",
          }}>
            {filteredForms.map((form, i) => (
              <div
                key={i}
                style={{
                  animation: `fadeSlideIn 0.5s ease-out ${i * 0.05}s both`,
                  display: "flex",
                }}
              >
                <FormCard form={form} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default function SBAFormsLibraryPage() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState("dark");
  // FIXED: Changed from Set to single string for accordion behavior (only one section open at a time)
  const [openSection, setOpenSection] = useState<string | null>("releaseOfCollateral");
  const [query, setQuery] = useState("");

  const isDark = theme === "dark";
  const vars = THEMES[theme];

  // FIXED: Clicking an open section closes it; clicking a closed section opens it and closes the previously open one
  const toggleSection = (sectionId: string) => {
    setOpenSection((prev) => (prev === sectionId ? null : sectionId));
  };

  const sections = [
    { id: "releaseOfCollateral", title: "Release of Collateral", icon: <ReceiptText size={28} style={{ color: "#A2B98C" }} />, forms: releaseOfCollateralForms },
    { id: "subordination", title: "Subordination", icon: <Lock size={28} style={{ color: "#7E9E61" }} />, forms: subordinationForms },
    { id: "changeInOwnership", title: "Change in Ownership", icon: <RefreshCw size={28} style={{ color: "#5D829C" }} />, forms: changeInOwnershipForms },
    { id: "relocationOfBusiness", title: "Relocation of Business", icon: <Briefcase size={28} style={{ color: "#8B4513" }} />, forms: relocationOfBusinessForms },
    { id: "releaseOfGuarantor", title: "Release of Guarantor", icon: <Users size={28} style={{ color: "#444A47" }} />, forms: releaseOfGuarantorForms },
    { id: "substitutionOfCollateral", title: "Substitution of Collateral", icon: <ClipboardCopy size={28} style={{ color: "#4A5A28" }} />, forms: substitutionOfCollateralForms },
    { id: "assumption", title: "Assumption", icon: <Building2 size={28} style={{ color: "#556B2F" }} />, forms: assumptionForms },
    { id: "sba504Loans", title: "SBA 504 Loans", icon: <DollarSign size={28} style={{ color: "#CDA349" }} />, forms: sba504LoansForms },
    { id: "sba7aLoans", title: "SBA 7(a) Loans", icon: <DollarSign size={28} style={{ color: "#5D829C" }} />, forms: sba7aLoansForms },
    { id: "pppLoans", title: "PPP Loans", icon: <DollarSign size={28} style={{ color: "#D4B483" }} />, forms: pppLoansForms },
    { id: "otherImportantForms", title: "Other Important Forms", icon: <FileText size={28} style={{ color: "#3B4C1C" }} />, forms: otherImportantForms },
  ];

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
        @keyframes fadeSlideIn {
          from { opacity:0; transform:translateY(20px); }
          to { opacity:1; transform:translateY(0); }
        }

        * { box-sizing:border-box; margin:0; padding:0; }

        .forms-page {
          min-height:100vh;
          font-family: var(--font-body);
          background: var(--bg-primary);
          color: var(--text-primary);
          overflow-x: hidden;
          position: relative;
          transition: background 0.5s ease, color 0.4s ease;
        }
        .forms-page::before {
          content:'';
          position:fixed; inset:0;
          background:
            radial-gradient(ellipse 70% 50% at 30% 0%, var(--overlay-green), transparent),
            radial-gradient(ellipse 50% 40% at 70% 100%, rgba(200,168,78,0.04), transparent);
          pointer-events:none; z-index:0;
          transition: background 0.5s ease;
        }

        @media (max-width: 768px) {
          .hero-title { font-size: 32px !important; }
          .hero-inner { padding: 40px 20px 56px !important; }
        }
      `}</style>

      <div className="forms-page">
        <GridOverlay />
        <Particles />

        <div style={{ position: "relative", zIndex: 1 }}>
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
                    fontFamily: "var(--font-body)",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = "#e8ede2"}
                  onMouseLeave={(e) => e.currentTarget.style.color = "#c8e0b4"}
                >
                  <ArrowLeft size={16} />
                  Back to Last
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
                <FileText size={30} color="#c8a84e" strokeWidth={1.5} />
              </div>

              <h1 className="hero-title" style={{
                fontFamily: "var(--font-display)",
                fontSize: 50,
                fontWeight: 400,
                textAlign: "center",
                color: "#e8ede2",
                lineHeight: 1.12,
                letterSpacing: "-0.02em",
                marginBottom: 16,
              }}>
                SBA{" "}
                <span style={{ fontStyle: "italic", color: "#c8a84e" }}>Forms Library</span>
              </h1>

              <div style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                marginBottom: 20,
              }}>
                <span style={{
                  padding: "5px 14px",
                  borderRadius: 100,
                  background: "rgba(0,0,0,0.2)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  fontSize: 11,
                  color: "#EDEDED",
                  fontFamily: "var(--font-body)",
                }}>
                  LAST REVIEWED JANUARY 30, 2026
                </span>
              </div>

              <p style={{
                textAlign: "center",
                fontSize: 16,
                color: "rgba(232,237,226,0.6)",
                lineHeight: 1.75,
                maxWidth: 600,
                margin: "0 auto 32px",
              }}>
                Download official SBA forms, organized by action type. Templates and completion aids included where available.
              </p>

              <div style={{ maxWidth: 720, margin: "0 auto" }}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: 16,
                  padding: "12px 20px",
                  backdropFilter: "blur(8px)",
                }}>
                  <Search size={20} style={{ color: "#EDEDED" }} />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search forms by title or description..."
                    style={{
                      width: "100%",
                      background: "transparent",
                      outline: "none",
                      border: "none",
                      color: "#EDEDED",
                      fontSize: 15,
                      fontFamily: "var(--font-body)",
                    }}
                  />
                </div>

                <div style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 8,
                  justifyContent: "center",
                  marginTop: 16,
                }}>
                  <span style={{
                    padding: "5px 14px",
                    borderRadius: 100,
                    fontSize: 12,
                    border: "1px solid rgba(255,255,255,0.15)",
                    background: "rgba(255,255,255,0.05)",
                    color: "#EDEDED",
                    fontFamily: "var(--font-body)",
                  }}>
                    Official Sources
                  </span>
                  <span style={{
                    padding: "5px 14px",
                    borderRadius: 100,
                    fontSize: 12,
                    border: "1px solid rgba(200,168,78,0.3)",
                    background: "rgba(200,168,78,0.1)",
                    color: "#c8a84e",
                    fontFamily: "var(--font-body)",
                  }}>
                    <Sparkles size={12} style={{ display: "inline", marginRight: 4 }} />
                    Premium Templates
                  </span>
                  <span style={{
                    padding: "5px 14px",
                    borderRadius: 100,
                    fontSize: 12,
                    border: "1px solid rgba(255,255,255,0.15)",
                    background: "rgba(255,255,255,0.05)",
                    color: "#EDEDED",
                    fontFamily: "var(--font-body)",
                  }}>
                    Grouped by Action
                  </span>
                </div>
              </div>

              <div style={{
                marginTop: 40,
                maxWidth: 900,
                margin: "40px auto 0",
                background: "rgba(0,0,0,0.2)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 20,
                padding: 24,
              }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <AlertCircle size={20} style={{ color: "#c8a84e", marginTop: 2, flexShrink: 0 }} />
                  <p style={{
                    fontSize: 14,
                    color: "#EDEDED",
                    lineHeight: 1.7,
                    fontFamily: "var(--font-body)",
                  }}>
                    All forms and documents are provided for informational purposes. Please verify the most current versions on official sources before submission. Some forms may require additional supporting documentation. For official information, visit{' '}
                    <a
                      href="https://www.sba.gov"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "#c8e0b4",
                        textDecoration: "underline",
                      }}
                    >
                      SBA.gov
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "56px 24px 80px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {sections.map((section, i) => (
                <div
                  key={section.id}
                  style={{ animation: `fadeSlideUp 0.7s ease-out ${0.1 + i * 0.05}s both` }}
                >
                  <CollapsibleSection
                    title={section.title}
                    icon={section.icon}
                    forms={section.forms}
                    isOpen={openSection === section.id}
                    onToggle={() => toggleSection(section.id)}
                    filterText={query}
                  />
                </div>
              ))}
            </div>

            <div style={{
              marginTop: 48,
              padding: 28,
              borderRadius: 16,
              background: "var(--bg-card)",
              backdropFilter: "var(--glass-blur)",
              border: "1px solid var(--border-primary)",
              animation: "fadeSlideUp 0.7s ease-out 0.8s both",
            }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <div style={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  background: "var(--accent-green)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  marginTop: 2,
                }}>
                  <AlertCircle size={14} style={{ color: "#fff" }} />
                </div>
                <div>
                  <h4 style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 16,
                    color: "var(--text-primary)",
                    marginBottom: 8,
                  }}>
                    Important Disclaimer
                  </h4>
                  <p style={{
                    color: "var(--text-secondary)",
                    fontSize: 13,
                    lineHeight: 1.7,
                    fontFamily: "var(--font-body)",
                  }}>
                    This information is provided for educational and informational purposes only. It does not constitute legal, financial, or professional advice. Always consult with qualified professionals and verify all information with official SBA sources before making any decisions or submissions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}