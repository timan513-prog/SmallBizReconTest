import { useState, useRef, useEffect } from "react";

// ═══════════════════════════════════════════════════════════════
// EMBEDDED KNOWLEDGE BASE (from subordinationKnowledgeBase.ts)
// ═══════════════════════════════════════════════════════════════

const subordinationKnowledgeBase = {
  "what is a covid eidl subordination": {
    answer: "An EIDL Subordination is a formal request made to the U.S. Small Business Administration (SBA) by a borrower or a new lender acting on their behalf, asking the SBA to shift its existing lien on business collateral behind a new lender's lien. This process is necessary when a borrower is seeking additional funding — such as refinancing a loan, obtaining a new line of credit, or entering into a factoring arrangement — where the new lender requires first priority on the same collateral. Subordination does NOT remove the SBA's lien; it only changes the repayment priority order in the event of default or liquidation.",
    variations: ["What is subordination for COVID EIDL loans?","Can you explain COVID EIDL subordination?","What does subordination mean for my SBA loan?","How does EIDL subordination work?","what is sba subordination","explain subordination process","what does it mean to subordinate a loan","tell me about subordination","what is a lien subordination","sba lien subordination explained"]
  },
  "why would a borrower request subordination": {
    answer: "Per SBA guidelines, subordination must be necessary for one of these approved purposes:\n\n1. To provide temporary Severe Financial Hardship relief (per SBA Chapter 7)\n2. To refinance an existing loan secured by a senior lien on terms that are MORE FAVORABLE for the borrower\n3. To pay for necessary repairs or improvements to the collateral required to preserve its value (Note: substantial upgrades are NOT allowed — only preservation of collateral value)\n\nIn practice, COVID EIDL subordination requests are typically made to refinance existing senior liens with better terms, or to accommodate short-term financing such as Operating Lines of Credit, Factoring Agreements, or Borrowing Base Lines of Credit. Each request is reviewed, analyzed, and decided based on the borrower's specific situation.",
    variations: ["Why would I need SBA to approve a subordination?","When would it make sense to request a lien subordination from SBA?","Can I get a new loan if SBA subordinates their lien?","Why would a business request a subordination of collateral?","what are the benefits of subordination","when do I need subordination","reasons for subordination request","why request subordination","what is subordination used for","when should I request subordination","what are the approved reasons for subordination","can I subordinate for repairs","can I subordinate for hardship","what qualifies for subordination"]
  },
  "does subordination remove the sba's lien": {
    answer: "No. Subordination does NOT remove the SBA's lien — it simply changes the repayment priority order in the event of default or liquidation. The SBA still has a valid claim on your collateral, but they agree to be paid after the new lender. The SBA's security interest remains in place throughout the life of your loan.",
    variations: ["What happens to SBA's lien after subordination?","Does the SBA lien go away with subordination?","Will SBA remove their lien if they approve subordination?","does sba still have a claim after subordination","what happens to my sba loan after subordination","is the sba lien removed","does subordination eliminate sba lien"]
  },
  "what documents do i need to submit": {
    answer: "ATTENTION: This requirements letter is NOT a commitment by the SBA. Any commitment made by the SBA will be provided separately in writing. Approval of any request may be conditioned on curing defaults, correcting any collateral deficiencies or issues with loan documents and/or payment of material monetary consideration.\n\nFor ALL COVID EIDL subordination requests, the SBA requires these GENERAL REQUIREMENTS:\n\n1. A detailed letter from the borrower(s) or guarantor(s) (if any) explaining the intended use of funds\n2. Completed, signed, and dated Consent to Verify Information & 3rd Party Authorization (SBA Form 2518 / Borrower Authorization) for ALL SBA borrower(s) and/or guarantor(s)\n3. A copy of the UCC Lien Search indicating the SBA's lien position\n4. Proof of Insurance as required by the SBA Loan Authorization and Agreement (including Proof of Hazard Insurance)\n5. Lender Loan Commitment Agreement / Term Sheet\n\nInformation about the collateral/lien to be subordinated must also include identifying information such as VIN or serial numbers.\n\nAdditional requirements for REAL ESTATE subordinations:\n1. Settlement Statement(s)\n2. Title Report (dated within 6 months)\n3. Current Valuation Report\n4. Payoff Statement(s)\n5. Current Profit & Loss (if cash out or business expansion; must be signed & dated)\n6. A copy of Mortgage, Deed of Trust, or Other Lien Instrument\n\nAll borrowers and/or guarantors are required to provide documentation for all applicable sections. Additional documentation may be required for thorough analysis.",
    variations: ["What documents are required for a subordination request?","What do I need to send for a real estate subordination?","Which forms and paperwork are needed for SBA subordination?","What is the full checklist for submitting a subordination?","what paperwork do I need to submit to get a subordination for my covid eidl loan","which forms and supporting docs are needed for sba subordination approval","what documents are required for covid eidl real estate subordination","subordination document checklist","required forms for subordination","what do I need for sba subordination","subordination requirements","list of documents for subordination","what does sba need for subordination"]
  },
  "general requirements for subordination": {
    answer: "For the SBA to consider a Subordination request on Real Property/Business Assets held as collateral, the below documentation must be provided.\n\nGENERAL REQUIREMENTS:\n1. A detailed letter from the borrower(s) or guarantor(s) (if any) explaining the intended use of funds\n2. Completed, signed, and dated Consent to Verify Information & 3rd Party Authorization (SBA Form 2518 / Borrower Authorization) for ALL SBA borrower(s) and/or guarantor(s) (if any)\n   Download here: https://zrktinvphjmalvrsjmii.supabase.co/storage/v1/object/public/SmallBiz%20Recon%20Free%20Tools/BDLSC%20%20Borrower%20Authorization%20-%205-23%20(3).pdf\n3. A copy of the UCC Lien Search indicating the SBA's lien position\n4. Proof of Insurance as required by the SBA Loan Authorization and Agreement (including Proof of Hazard Insurance)\n5. Lender Loan Commitment Agreement / Term Sheet\n\nAdditionally, information about the collateral/lien to be subordinated must include identifying information such as VIN or serial numbers where applicable.\n\nAll borrowers and/or guarantors are required to provide documentation for all applicable sections. Additional documentation may be required for thorough analysis.",
    variations: ["what are the basic subordination requirements","general subordination documents","minimum requirements for subordination","what does every subordination need","basic subordination checklist","standard subordination documents","what is proof of hazard insurance","do I need hazard insurance for subordination","what insurance is required for subordination"]
  },
  "real estate subordination requirements": {
    answer: "In ADDITION to the General Requirements, real estate subordinations require these additional documents:\n\n1. Settlement Statement(s)\n2. Title Report (dated within 6 months)\n3. Current Valuation Report\n4. Payoff Statement(s)\n5. Current Profit & Loss — required if cash out or business expansion; must be signed & dated\n6. A copy of Mortgage, Deed of Trust, or Other Lien Instrument\n\nRemember: You must ALSO submit all General Requirements (borrower letter, Form 2518, UCC lien search, proof of insurance, and lender commitment letter).",
    variations: ["what extra documents do I need for real estate subordination","real estate subordination checklist","additional requirements for real estate","do I need a title report for real estate","real estate specific documents","property subordination requirements","what is needed for real estate lien subordination","documents for property subordination","Is a title report necessary for subordination?","How recent does the title report need to be?","title report requirements"]
  },
  "what is the completed request for subordination": {
    answer: "The COVID EIDL Subordination of Collateral request package must include ALL of the following:\n\na. Completed Request for Subordination, including:\n   1) Detailed statement about the need for subordination\n   2) Business Name\n   3) Loan Number\n   4) Business Type\n   5) List of all owners including ownership percentages\n   6) Signatures\n\nb. Borrower Authorization (SBA Form 2518 — Consent to Verify Information & 3rd Party Authorization)\n   Download here: https://zrktinvphjmalvrsjmii.supabase.co/storage/v1/object/public/SmallBiz%20Recon%20Free%20Tools/BDLSC%20%20Borrower%20Authorization%20-%205-23%20(3).pdf\n\nc. Commitment Letter / Agreement from the new lender\n\nd. Information about collateral/lien to be subordinated:\n   1) Identifying information, such as VIN or serial numbers\n   2) Copy of the UCC search indicating SBA's lien position\n   3) Proof of Hazard Insurance\n\nNote: Monetary consideration is NOT a requirement on subordinations to SBA Express, Export Express, and 504 Express loans. Subordination requests will be reviewed, analyzed, and decided based on the situation and these requirements.",
    variations: ["what goes in the subordination request","what information does the subordination request need","how to complete a subordination request","subordination request form contents","what details are in the subordination request","what should the request letter include","what is the full subordination package","subordination of collateral requirements","what are the a through d requirements","complete subordination request checklist","what is needed for a subordination package"]
  },
  "what is sba form 2518": {
    answer: "SBA Form 2518 is the Consent to Verify Information & 3rd Party Authorization (also called the Borrower Authorization). It allows SBA to share loan information with your lender, title company, or authorized parties. It must be completed, signed, and dated by ALL SBA borrower(s) and/or guarantor(s). This form is required for EVERY subordination request — no exceptions.\n\nYou can download the fillable PDF here:\nhttps://zrktinvphjmalvrsjmii.supabase.co/storage/v1/object/public/SmallBiz%20Recon%20Free%20Tools/BDLSC%20%20Borrower%20Authorization%20-%205-23%20(3).pdf",
    variations: ["What does SBA Form 2518 do?","Why is SBA Form 2518 required?","Who needs to sign Form 2518?","Can you explain what the 2518 form is for?","what is sba form 2518 and when is it required","do I need to fill out sba form 2518 for subordination","why is form 2518 part of the subordination package","where do I get form 2518","how do I complete form 2518","download form 2518","borrower authorization form","where can I find the borrower authorization","link to form 2518","consent to verify information form","3rd party authorization form","what is the borrower authorization"]
  },
  "where do i email my subordination packet": {
    answer: "Submit your complete subordination package to the SBA Covid EIDL Servicing Center using any of these methods:\n\n• Email: CovidEIDLServicing@sba.gov\n• Box.com: Request a secure upload link from the Covid EIDL Servicing Center for larger files\n• Fax: (202) 481-5799\n• Toll Free Phone (questions): (833) 853-5638\n\nUse subject line: 'Subordination Request – [Business Name] – [Loan Number]'. Submit all documents as clearly labeled PDFs. Keep total email size under 25MB — use Box.com for larger packages.",
    variations: ["What's the email address to send my subordination documents?","Where should I send my subordination packet?","Who do I email the COVID EIDL subordination request to?","What's the correct SBA email for submitting subordination paperwork?","how do I send my subordination package to the sba","where do I submit my covid eidl real estate subordination request","sba subordination email address","how to submit subordination request","where to send sba subordination","sba fax number for subordination","can I fax my subordination","subordination submission methods","how to send documents to sba","box.com upload for sba"]
  },
  "how long does subordination take": {
    answer: "The subordination process typically takes 30-45 days if your package is complete. Realistic timeline: Days 1-2: SBA confirms receipt. Days 3-7: Initial document review. Days 7-21: Detailed underwriting. Days 14-30: Final decision. Incomplete packages take significantly longer. Follow up if you don't hear back within 5 business days of submission. You can call (833) 853-5638 or email CovidEIDLServicing@sba.gov to check status.",
    variations: ["What's the timeline for SBA subordination approval?","How long does SBA take to process a subordination request?","What's the average turnaround time for covid eidl subordination?","When will I hear back from SBA after submitting my subordination?","How fast is SBA with lien subordination decisions?","subordination processing time","how long for sba response","sba subordination timeline","how long until I get an answer","when will sba respond to my subordination"]
  },
  "what is a ucc lien and why does sba use it": {
    answer: "A UCC lien is a legal claim against business assets filed through a UCC-1 Financing Statement. SBA uses this to secure COVID EIDL loans over $25,000. It gives SBA a 'blanket lien' on all business assets including equipment, inventory, accounts receivable, and other personal property. A copy of the UCC Lien Search indicating the SBA's lien position is a required document for ALL subordination requests. You can check for UCC liens through your state's Secretary of State website.",
    variations: ["How can I check if SBA filed a UCC on my business?","Does SBA remove the UCC lien if they approve subordination?","What happens to the UCC lien after subordination?","what is a blanket lien","how to search for ucc liens","sba ucc filing","business asset lien","what is a ucc-1 financing statement","where to find ucc liens"]
  },
  "does sba require real estate collateral for covid eidl loans": {
    answer: "SBA requires real estate collateral only for COVID EIDL loans over $500,000, and only if suitable business real estate is available. For loans $25,001-$500,000, SBA typically relies on a UCC lien on business assets. The real estate must be owned by the business or guarantors and have sufficient equity. If your loan involves real estate collateral, you'll need additional documents beyond the general requirements when requesting subordination.",
    variations: ["Do covid eidl loans use real estate as collateral?","At what loan amount does SBA require real estate security?","Will SBA file a lien on my property for an EIDL loan?","when does sba take real estate collateral","covid eidl collateral requirements","sba lien on property","what loan amount requires real estate"]
  },
  "can i get subordination if i'm behind on payments": {
    answer: "Per SBA guidelines, the loan should be CURRENT and SEASONED for subordination approval. 'Seasoned' means 12 consecutive months of complete and on-time payments. While you can apply even if behind on payments, approval is significantly less likely if you're delinquent. SBA may condition approval on curing defaults, correcting any collateral deficiencies or issues with loan documents, and/or payment of material monetary consideration. The borrower should also have a satisfactory credit history.",
    variations: ["Are loans in default eligible for a covid eidl subordination?","Can covid eidl borrowers currently in default still apply for subordination?","Can I get subordination if I'm behind on payments?","What if my loan is in default?","subordination with late payments","delinquent loan subordination","past due sba loan subordination","can I apply if I'm delinquent","what if I owe back payments","does my loan need to be current","what does seasoned mean","how many payments do I need to make","12 months of payments"]
  },
  "does sba require a paydown for subordination": {
    answer: "Approval of a subordination request may be conditioned on curing defaults, correcting any collateral deficiencies or issues with loan documents, and/or payment of material monetary consideration. Note: Monetary consideration is NOT a requirement on subordinations to SBA Express, Export Express, and 504 Express loans. For other loan types, SBA evaluates paydown requirements on a case-by-case basis depending on equity, risk exposure, and collateral coverage.",
    variations: ["Do I have to pay extra to get my covid eidl subordinated?","When does SBA ask for a paydown in subordination cases?","Is payment required to approve a subordination request?","sba paydown requirement","do I need to pay down my loan for subordination","subordination with paydown","monetary consideration for subordination","is there a cost to subordination","do sba express loans need paydown"]
  },
  "sba express and 504 express subordination": {
    answer: "Monetary consideration is NOT a requirement on subordinations to SBA Express, Export Express, and 504 Express loans. This means the SBA will not require a paydown as a condition of subordination approval for these specific loan types. All other standard requirements (borrower letter, Form 2518, UCC search, insurance, commitment letter) still apply.",
    variations: ["are sba express loans different for subordination","504 express subordination requirements","export express subordination","do express loans need monetary consideration","sba express subordination rules","is subordination easier for express loans"]
  },
  "what are common mistakes that delay sba subordination approval": {
    answer: "Top mistakes that delay or derail subordination approval:\n\n1. Missing or incomplete signatures/dates on Form 2518 or borrower letter — ALL borrowers and guarantors must sign\n2. Outdated documents — title reports and UCC searches must be current (title report dated within 6 months)\n3. Incomplete or vague lender commitment letters / term sheets\n4. Missing required documents — especially proof of insurance or UCC lien search\n5. Poor file quality — blurry scans, mixed formats, unlabeled documents\n6. Vague borrower letters that don't clearly explain the intended use of funds and business benefit\n7. Not including all owners with ownership percentages\n8. Submitting without the complete package — partial submissions cause significant delays",
    variations: ["What can cause a covid eidl subordination to be rejected?","Why do sba subordination requests get denied or delayed?","How do I avoid getting my sba subordination denied?","common subordination mistakes","why was my subordination denied","subordination rejection reasons","what delays subordination","how to avoid subordination denial"]
  },
  "what if my subordination is denied": {
    answer: "If your subordination is denied, you have several options:\n\n1. Address specific issues cited in the denial and resubmit — fix the exact problems SBA identified\n2. Request reconsideration if you believe SBA made an error or missed critical information\n3. Modify your approach — consider a smaller loan amount, different terms, or alternative collateral structure\n4. Cure any defaults or collateral deficiencies that were flagged\n5. Wait 30+ days and reapply with a cover letter explaining what you've changed\n\nRemember: The initial requirements letter is NOT a commitment by the SBA. Any commitment will be provided separately in writing.",
    variations: ["What are common reasons for a covid eidl subordination denial?","What should I look for in a covid eidl denial letter?","What are my options after a covid eidl subordination denial?","can I reapply after denial","subordination appeal process","resubmitting after denial","what to do if subordination is denied","denied subordination next steps"]
  },
  "is submission a guarantee of approval": {
    answer: "No. ATTENTION: Submission of the required documentation does NOT constitute an automatic approval, and the SBA retains all its rights to collect on the subject SBA loan under the terms as reflected in the loan documents. Any commitment made by the SBA will be provided separately in writing. Approval may be conditioned on curing defaults, correcting any collateral deficiencies or issues with loan documents, and/or payment of material monetary consideration.",
    variations: ["does submitting documents guarantee approval","is subordination guaranteed if I submit everything","will I be approved if I send all documents","does sba automatically approve subordination","subordination approval guarantee","is my subordination guaranteed","what does submission mean for approval"]
  },
  "sba subordination approval guidelines": {
    answer: "SBA reviews subordination requests against these policy guidelines (Chapter 8). ALL of the following should generally be satisfied:\n\na. The Borrower's request must include the reason for subordination and describe how new funds will be used\nb. The subordination must be necessary for an approved purpose (hardship relief, refinance on better terms, or necessary collateral repairs/preservation)\nc. The loan should be CURRENT\nd. The loan should be SEASONED (12 consecutive months of complete, on-time payments)\ne. The borrower should have a satisfactory credit history\nf. No cash out to the borrower unless the borrower pays down the Disaster Loan in substantial part OR the purpose is temporary Severe Financial Hardship relief (Chapter 7)\ng. There should be sufficient equity in the collateral to adequately secure the Disaster Loan AFTER the proposed subordination\nh. The borrower should demonstrate the ability to repay ALL obligations that would be outstanding after the proposed subordination\ni. The subordination should be limited to a specific amount and should NOT extend to future advances\nj. The terms must be set out in a properly executed subordination agreement",
    variations: ["what are the sba guidelines for subordination","sba subordination policy","what does sba look for in subordination","subordination approval criteria","chapter 8 subordination requirements","what factors does sba consider for subordination","sba subordination rules","will sba approve my subordination","what does sba evaluate for subordination","subordination analysis criteria","how does sba decide on subordination","sba lien position guidelines"]
  },
  "what does seasoned mean for subordination": {
    answer: "In the context of SBA subordination, 'Seasoned' means the borrower has made 12 consecutive months of complete and on-time payments on their Disaster Loan. This is one of the key criteria SBA evaluates when reviewing subordination requests. A seasoned loan demonstrates the borrower's track record of reliability and commitment to repayment.\n\nNOTE: When analyzing a request for subordination to facilitate the refinance of a senior loan, a complete financial analysis may not be necessary if the borrower has been making timely payments and the refinance terms are more favorable for the borrower.",
    variations: ["what does seasoned mean","what is a seasoned loan","how many payments to be seasoned","what does loan seasoning mean","12 months of payments","do I need 12 months of payments","seasoned loan definition","payment history requirement for subordination","how long do I need to pay before subordination","on time payments for subordination"]
  },
  "subordination for refinance no cash out": {
    answer: "For subordination to facilitate the REFINANCE of a senior loan with NO CASH OUT, in addition to the general guidelines, SBA requires:\n\na. The refinancing must be on terms that are MORE FAVORABLE to the borrower\nb. There should be NO increase in the principal balance of the loan secured by the senior lien, except for necessary, reasonable, and customary closing costs\nc. The subordination must NOT adversely affect the priority of the lien securing the Disaster Loan — for example, intervening junior lienholders must not be able to claim priority over the SBA lien as a result of the subordination\n\nNOTE: When analyzing a no-cash-out refinance request, a complete financial analysis may NOT be necessary if the borrower has been making timely payments and the refinance terms are more favorable.",
    variations: ["refinance subordination no cash out","can I refinance without cash out","subordination for refinancing","no cash out refinance subordination","refinance senior loan subordination","what are the rules for refinance subordination","can I subordinate to refinance my first mortgage","refinance with better terms subordination","subordination to refinance existing loan","do I need full financial analysis for refinance"]
  },
  "subordination for refinance with cash out": {
    answer: "For subordination to facilitate the REFINANCE of a senior loan WITH CASH OUT, in addition to the general guidelines, SBA requires ALL of the following:\n\na. The refinancing must be on terms that are MORE FAVORABLE to the borrower\nb. There should be NO increase in the principal balance of the senior lien except for necessary, reasonable, and customary closing costs\nc. The subordination must NOT adversely affect the priority of the lien securing the Disaster Loan (no intervening junior lienholders gaining priority)\nd. ALL other avenues of obtaining the funds must have been exhausted\ne. If the borrower is financially sound and has fully recovered from the disaster, the borrower must pay down the Disaster Loan balance by 50% or more if the size of the new loan is substantial\n\nIMPORTANT: Cash-out subordination is held to a significantly higher standard. SBA generally does not allow cash out to the borrower unless the Disaster Loan is paid down in substantial part OR the purpose is temporary Severe Financial Hardship relief (Chapter 7).",
    variations: ["cash out refinance subordination","can I get cash out with subordination","subordination with cash out rules","cash out subordination requirements","do I need to pay down 50%","50% paydown requirement","can I take equity out with subordination","cash out restrictions for subordination","what if I want cash out from refinance","subordination cash out disaster loan paydown","can I access equity in my property"]
  },
  "cash out restrictions for subordination": {
    answer: "SBA has strict rules about cash out during subordination: No cash out of the equity in the collateral should go to the borrower UNLESS one of these conditions is met:\n\n1. The borrower pays down the Disaster Loan in substantial part (50% or more if the new loan is substantial and the borrower is financially sound/recovered from disaster)\n2. The purpose of the subordination is to provide temporary Severe Financial Hardship relief in accordance with SBA Chapter 7\n\nAdditionally, ALL other avenues of obtaining the funds must have been exhausted before SBA will consider cash-out subordination. This is one of the strictest requirements in the subordination guidelines.",
    variations: ["can I take cash out","cash out rules for subordination","can I get money from subordination","equity cash out subordination","why can't I get cash out","no cash out rule","when is cash out allowed in subordination","what are the cash out restrictions","is cash out ever allowed"]
  },
  "subordination for working capital loan": {
    answer: "Under RARE circumstances, the priority position of a lien securing a Business Disaster Loan may be subordinated to a short-term working capital loan — but ONLY when doing so is necessary to enable the borrower to continue operating AND to maximize recovery on the loan. This is essentially a workout scenario (see SBA Chapter 17) and is not a standard subordination path. SBA will closely scrutinize whether the working capital loan genuinely helps the business survive and whether it protects or improves SBA's recovery position.",
    variations: ["can I subordinate for working capital","working capital subordination","short term working capital subordination","can sba subordinate for a line of credit","subordination for operating capital","working capital loan subordination rules","can I get a working capital loan with sba subordination","short term loan subordination","subordination to keep business operating","workout subordination"]
  },
  "equity requirements for subordination": {
    answer: "SBA requires that there be sufficient equity in the collateral to adequately secure the Disaster Loan AFTER the proposed subordination. This means SBA will evaluate whether — after the new senior lien is in place — there is still enough collateral value remaining to protect SBA's position. If the subordination would leave the SBA under-secured, it is likely to be denied or conditioned on a paydown. The borrower must also demonstrate the ability to repay ALL obligations (SBA loan + new loan) according to the terms of all loan agreements.",
    variations: ["how much equity do I need for subordination","equity requirements for sba subordination","does sba check equity for subordination","collateral value for subordination","will sba approve if there's not enough equity","insufficient equity subordination","how does sba evaluate collateral for subordination","do I need equity in my property for subordination","what if there's not enough equity","collateral coverage for subordination"]
  },
  "subordination limited to specific amount": {
    answer: "Per SBA guidelines, any approved subordination should be limited to a SPECIFIC AMOUNT and should NOT extend to future advances. This means the subordination agreement will specify exactly how much the SBA is subordinating to — it won't be an open-ended approval. If the new lender's loan includes a revolving credit facility or future draw provisions, SBA will cap the subordination at a defined dollar amount. The terms of the transaction must be set out in a properly executed subordination agreement.",
    variations: ["is subordination limited to an amount","can subordination cover future advances","does subordination extend to future draws","specific amount subordination","is subordination open ended","revolving credit subordination","line of credit subordination limit","how much will sba subordinate","subordination amount cap","future advances subordination"]
  },
  "what is an inter-creditor agreement": {
    answer: "An inter-creditor agreement is an agreement among creditors who made separate loans to the same borrower with commonality of purpose or collateral. It sets forth the various lien positions and the rights and liabilities of each creditor and its impact on the other creditors. SBA reviews inter-creditor agreement requests pursuant to Chapter 8 guidelines with these requirements:\n\n1. The inter-creditor agreement should NOT adversely impact the position of the lien securing the Disaster Loan\n2. The delineated rights and responsibilities regarding loan servicing and remedies in the event of default should be consistent with prudent lending practices\n3. Entering into the inter-creditor agreement should NOT adversely impact the ability to recover on the Disaster Loan\n\nIf your new lender is requesting an inter-creditor agreement instead of (or in addition to) a standard subordination, submit the request through the same channels as a subordination request.",
    variations: ["what is an intercreditor agreement","inter-creditor agreement sba","do I need an intercreditor agreement","intercreditor agreement requirements","what does an inter-creditor agreement do","sba inter creditor agreement","multiple lender agreement","creditor agreement for sba loan","inter creditor agreement vs subordination","what is an ICA","lender agreement with sba","can sba enter an inter-creditor agreement","commonality of collateral agreement"]
  },
  "can i subordinate for property repairs or improvements": {
    answer: "SBA may approve subordination to pay for NECESSARY repairs or improvements to the collateral that are required to PRESERVE its value. However, substantial upgrades are NOT allowed — the Disaster Loan Program does not support subordination for major property upgrades or improvements beyond what is needed to maintain collateral value. The distinction matters: fixing a roof to prevent water damage (preservation) would likely qualify, but adding a new wing or major renovation (upgrade) would not.",
    variations: ["can I subordinate for repairs","subordination for property improvements","can I fix my property with subordination","repairs vs upgrades subordination","collateral repairs subordination","can I renovate with subordination","property repairs subordination sba","necessary repairs subordination","can I improve collateral with subordination","what repairs qualify for subordination"]
  },
  "can i substitute collateral": {
    answer: "Yes, SBA may accept collateral substitution if the new collateral has equal or greater value and adequately secures the loan. You'll need current appraisals of both the existing and proposed collateral, plus justification for why the substitution benefits your business. Information about the collateral/lien to be subordinated must include identifying information such as VIN or serial numbers where applicable.",
    variations: ["Can I swap collateral instead of subordinating it?","Will SBA let me replace the property listed as collateral?","Is collateral substitution possible under the subordination policy?","collateral replacement","substitute collateral for sba loan","can I change my collateral"]
  },
  "are there fees for subordination": {
    answer: "The SBA does not charge a processing fee for subordination requests. However, approval may be conditioned on payment of material monetary consideration depending on the situation (except for SBA Express, Export Express, and 504 Express loans where monetary consideration is not required). You may also incur costs for obtaining required documents — title reports, appraisals/valuations, UCC searches, recording fees, and any fees charged by your new lender.",
    variations: ["Does SBA charge for subordination?","What does subordination cost?","subordination processing fee","how much does subordination cost","is there a fee for subordination","cost of subordination"]
  },
  "who do i contact for subordination help": {
    answer: "Contact the Covid EIDL Servicing Center:\n\n• Email: CovidEIDLServicing@sba.gov\n• Box.com: Request a secure upload link for large files\n• Toll Free Phone: (833) 853-5638\n• Fax: (202) 481-5799\n\nInclude your loan number in all communications. For the Borrower Authorization form (SBA Form 2518), download here:\nhttps://zrktinvphjmalvrsjmii.supabase.co/storage/v1/object/public/SmallBiz%20Recon%20Free%20Tools/BDLSC%20%20Borrower%20Authorization%20-%205-23%20(3).pdf",
    variations: ["SBA subordination contact information","who to call for subordination","subordination phone number","how to contact SBA about subordination","sba subordination email","sba fax number","covid eidl servicing center contact","how do I reach sba about my subordination","sba servicing center phone number","where can I call about subordination"]
  },
  "show me a borrower letter template": {
    answer: "BORROWER LETTER TEMPLATE:\n\n[YOUR COMPANY LETTERHEAD]\n[DATE]\n\nU.S. Small Business Administration\nCOVID EIDL Servicing Center\nEmail: CovidEIDLServicing@sba.gov\n\nRe: Subordination Request\nBusiness Name: [YOUR BUSINESS NAME]\nSBA Loan Number: [YOUR LOAN NUMBER]\nBusiness Type: [LLC / Corp / Sole Prop / etc.]\n\nDear SBA Loan Servicing Officer,\n\nI am writing to request subordination of the SBA's security interest in [DESCRIBE COLLATERAL] for my COVID EIDL loan referenced above.\n\nOwnership:\n• [Owner Name] — [XX]% ownership\n• [Owner Name] — [XX]% ownership\n\nPurpose / Need for Subordination:\n[PROVIDE A DETAILED STATEMENT explaining why subordination is needed]\n\nIntended Use of Funds:\n[BE SPECIFIC — debt consolidation, working capital, equipment purchase, expansion, etc.]\n\nBusiness Benefit:\nThis subordination will benefit my business by [EXPLAIN]\n\nRepayment Ability:\nMy business remains financially sound and able to maintain payments on both the SBA loan and the new financing.\n\nThank you for your consideration.\n\nSincerely,\n[SIGNATURE — ALL BORROWERS AND GUARANTORS MUST SIGN]\n[NAME], [TITLE]\n[PHONE] | [EMAIL]",
    variations: ["borrower letter example","subordination letter template","sample borrower letter","how to write borrower letter","how do I write the borrower letter","borrower request letter template","what should the borrower letter say"]
  },
  "show me email submission template": {
    answer: "EMAIL SUBMISSION TEMPLATE:\n\nTo: CovidEIDLServicing@sba.gov\nSubject: SUBORDINATION REQUEST — [Business Name] — [SBA Loan Number]\n\nDear SBA Covid EIDL Servicing Center,\n\nPlease find attached my complete subordination request package for SBA Loan #[YOUR LOAN NUMBER].\n\nAttached Documents — General Requirements:\n✓ Completed Request for Subordination (detailed statement, business name, loan number, business type, owners/percentages, signatures)\n✓ Completed SBA Form 2518 — Borrower Authorization (signed & dated by all borrowers/guarantors)\n✓ Lender Commitment Letter / Agreement\n✓ Collateral/Lien Information (including identifying info such as VIN/serial numbers)\n✓ UCC Lien Search indicating SBA's lien position\n✓ Proof of Hazard Insurance\n\n[For Real Estate Subordinations — ALSO include:]\n✓ Settlement Statement(s)\n✓ Title Report (dated within 6 months)\n✓ Current Valuation Report\n✓ Payoff Statement(s)\n✓ Current Profit & Loss (if cash out or business expansion; signed & dated)\n✓ Copy of Mortgage, Deed of Trust, or Other Lien Instrument\n\nPlease confirm receipt. I can be reached at [PHONE] or [EMAIL] for any questions.\n\nThank you,\n[YOUR NAME]\n[BUSINESS NAME]\n[SBA LOAN NUMBER]",
    variations: ["email template for subordination","how to email subordination package","submission email example","what should the email say","email format for subordination"]
  }
};

const subordinationJokes = [
  "Why did the SBA lien go to couples therapy? It had trouble letting anyone else come first!",
  "What did the borrower say after submitting their subordination packet? 'I've never worked so hard to come in second place!'",
  "Why do subordination requests make great detectives? They always want to know your position!",
  "What's a UCC lien's favorite board game? Musical Chairs — except nobody wants to sit down!",
  "Why did Form 2518 break up with the borrower? They felt like they were just being used for authorization!",
  "What do you call a subordination request with missing signatures? A work of fiction!",
  "Why did the title report refuse to go on a date? It didn't want to commit to anything older than 6 months!",
  "What's the difference between a subordination and a magic trick? With the magic trick, something actually disappears — the SBA lien never does!",
  "Why did the collateral file a complaint? It was tired of everyone fighting over its position!",
  "What did the senior lien say to the SBA lien? 'After you — oh wait, that's the whole point!'"
];

const starterQuestions = [
  "What is a COVID EIDL subordination?",
  "What documents do I need to submit?",
  "What are the SBA approval guidelines?",
  "What is SBA Form 2518?",
  "Where do I email my packet?",
  "How long does subordination take?",
  "Show me a borrower letter template",
  "What are the cash out restrictions?"
];

// ═══════════════════════════════════════════════════════════════
// FUZZY MATCHING ENGINE
// ═══════════════════════════════════════════════════════════════

const normalize = (str) => str.toLowerCase().replace(/[^a-z0-9\s]/g, "").trim();

const tokenize = (str) => {
  const stops = new Set(["a","an","the","is","are","was","were","do","does","did","can","could","would","should","will","shall","may","might","must","i","me","my","we","our","you","your","it","its","he","she","they","them","their","this","that","these","those","to","of","in","for","on","at","by","with","from","as","into","about","what","how","when","where","why","which","who","whom","whose","if","or","and","but","not","no","so","than","too","very","just","also","have","has","had","be","been","being","get","got","need","want","please","help","tell","show","explain","give","know","think","make"]);
  return normalize(str).split(/\s+/).filter(w => w.length > 1 && !stops.has(w));
};

const fuzzyMatch = (input, knowledgeBase) => {
  const norm = normalize(input);
  const tokens = tokenize(input);
  let bestScore = 0;
  let bestAnswer = null;

  for (const [key, data] of Object.entries(knowledgeBase)) {
    // Direct key match
    if (norm === normalize(key)) return data.answer;

    // Check variations
    if (data.variations) {
      for (const v of data.variations) {
        const vNorm = normalize(v);
        if (norm === vNorm) return data.answer;
        if (norm.includes(vNorm) || vNorm.includes(norm)) return data.answer;
      }
    }

    // Token scoring
    const keyTokens = tokenize(key);
    const allVariationTokens = (data.variations || []).flatMap(v => tokenize(v));
    const allTokens = [...new Set([...keyTokens, ...allVariationTokens])];

    let score = 0;
    for (const t of tokens) {
      for (const kt of allTokens) {
        if (t === kt) { score += 3; break; }
        if (kt.includes(t) || t.includes(kt)) { score += 1.5; break; }
      }
    }

    // Normalize by token count
    if (tokens.length > 0) score = score / Math.max(tokens.length, 1);

    if (score > bestScore && score >= 2) {
      bestScore = score;
      bestAnswer = data.answer;
    }
  }

  return bestAnswer;
};

// ═══════════════════════════════════════════════════════════════
// ICONS (inline SVG to avoid import issues)
// ═══════════════════════════════════════════════════════════════

const BotIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/>
  </svg>
);

const UserIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);

const SendIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>
  </svg>
);

const XIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
  </svg>
);

const ResetIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>
  </svg>
);

const SparklesIcon = ({ size = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
    <path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>
  </svg>
);

const JokeIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/>
  </svg>
);

// ═══════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════

const makeId = () => `${Date.now()}_${Math.random().toString(16).slice(2)}`;

const outOfScopeKeywords = [
  "collateral release", "release of collateral", "payoff",
  "loan forgiveness", "payment assistance", "charge off"
];

export default function SabbiSub() {
  const [isOpen, setIsOpen] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: makeId(),
      text: "Hey there — I'm Sabbi 2.0, your Subordination Specialist. I can walk you through COVID EIDL subordination requirements, documents, templates, and submission processes. What do you need help with?",
      sender: "sabbi",
      timestamp: new Date(),
    },
  ]);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const formatTime = (d) => d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const generateResponse = (input) => {
    const clean = normalize(input);

    if (clean === "joke" || clean === "tell me a joke" || clean.includes("joke")) {
      return "😄 " + subordinationJokes[Math.floor(Math.random() * subordinationJokes.length)];
    }

    if (outOfScopeKeywords.some((k) => clean.includes(k))) {
      return "That topic isn't covered in the Subordination module. Please check the correct SmallBiz Recon™ toolkit for that servicing action — I'm specialized for subordination only.";
    }

    const match = fuzzyMatch(input, subordinationKnowledgeBase);
    if (match) return match;

    return "I don't have specific information about that in the Subordination knowledge base. Try asking about:\n\n• Required documents & checklists\n• SBA Form 2518\n• Submission process & email\n• Real estate vs. asset subordination\n• SBA approval guidelines\n• Refinance rules (cash out / no cash out)\n• Inter-creditor agreements\n• Templates (borrower letter, email)\n\nOr type \"joke\" for a laugh!";
  };

  const handleSend = (textOverride) => {
    const raw = textOverride || userInput;
    if (!raw.trim()) return;

    setMessages((prev) => [
      ...prev,
      { id: makeId(), text: raw, sender: "user", timestamp: new Date() },
    ]);
    setUserInput("");
    setIsTyping(true);

    setTimeout(() => {
      const response = generateResponse(raw);
      setMessages((prev) => [
        ...prev,
        { id: makeId(), text: response, sender: "sabbi", timestamp: new Date() },
      ]);
      setIsTyping(false);
    }, 600 + Math.random() * 400);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  const handleReset = () => {
    setMessages([
      {
        id: makeId(),
        text: "Hey there — I'm Sabbi 2.0, your Subordination Specialist. I can walk you through COVID EIDL subordination requirements, documents, templates, and submission processes. What do you need help with?",
        sender: "sabbi",
        timestamp: new Date(),
      },
    ]);
    setUserInput("");
    inputRef.current?.focus();
  };

  const hasUserMessages = messages.some((m) => m.sender === "user");

  // ─── STYLES ───
  const colors = {
    bg: "#0a0a0a",
    bgCard: "#111111",
    bgInput: "#161616",
    bgMessage: "#1a1a1a",
    border: "#262626",
    borderLight: "#333333",
    gold: "#c9a84c",
    goldDim: "#a08535",
    goldGlow: "rgba(201,168,76,0.15)",
    green: "#3a7d44",
    greenLight: "#4a9d54",
    greenGlow: "rgba(58,125,68,0.2)",
    text: "#e8e8e8",
    textMuted: "#888888",
    textDim: "#555555",
    white: "#ffffff",
  };

  return (
    <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 9999, fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif" }}>
      <style>{`
        .sabbi-scrollbar::-webkit-scrollbar { width: 5px; }
        .sabbi-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .sabbi-scrollbar::-webkit-scrollbar-thumb { background: ${colors.borderLight}; border-radius: 10px; }
        .sabbi-scrollbar::-webkit-scrollbar-thumb:hover { background: ${colors.gold}; }
        @keyframes sabbiPulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 1; } }
        @keyframes sabbiSlideUp { from { opacity: 0; transform: translateY(12px) scale(0.96); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes sabbiFadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes sabbiGlow { 0%, 100% { box-shadow: 0 0 15px rgba(201,168,76,0.2), 0 0 30px rgba(201,168,76,0.1); } 50% { box-shadow: 0 0 20px rgba(201,168,76,0.35), 0 0 40px rgba(201,168,76,0.15); } }
      `}</style>

      {!isOpen ? (
        /* ── FAB Button ── */
        <button
          onClick={() => setIsOpen(true)}
          style={{
            width: 56, height: 56, borderRadius: "50%",
            background: `linear-gradient(135deg, ${colors.bgCard} 0%, #1a1a1a 100%)`,
            border: `1.5px solid ${colors.gold}`,
            color: colors.gold,
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", position: "relative",
            boxShadow: `0 4px 24px rgba(0,0,0,0.5), 0 0 20px ${colors.goldGlow}`,
            transition: "all 0.3s ease",
            animation: "sabbiGlow 3s ease-in-out infinite",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px) scale(1.05)"; e.currentTarget.style.borderColor = colors.goldDim; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.borderColor = colors.gold; }}
          title="Ask Sabbi Sub about Subordination"
        >
          <BotIcon size={24} />
          {/* Online dot */}
          <span style={{
            position: "absolute", bottom: 2, right: 2,
            width: 12, height: 12, borderRadius: "50%",
            background: colors.green, border: `2px solid ${colors.bgCard}`,
          }} />
        </button>
      ) : (
        /* ── Chat Window ── */
        <div style={{
          width: 380, maxWidth: "calc(100vw - 48px)",
          maxHeight: "calc(100vh - 100px)",
          background: colors.bg,
          border: `1px solid ${colors.border}`,
          borderRadius: 16,
          boxShadow: `0 8px 48px rgba(0,0,0,0.6), 0 0 0 1px ${colors.border}, inset 0 1px 0 rgba(255,255,255,0.03)`,
          display: "flex", flexDirection: "column",
          overflow: "hidden",
          animation: "sabbiSlideUp 0.3s ease-out",
        }}>

          {/* ── HEADER ── */}
          <div style={{
            padding: "14px 16px",
            background: `linear-gradient(135deg, ${colors.bgCard} 0%, #0d0d0d 100%)`,
            borderBottom: `1px solid ${colors.border}`,
            display: "flex", alignItems: "center", justifyContent: "space-between",
            position: "relative", overflow: "hidden",
          }}>
            {/* Subtle gold line at top */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${colors.gold}40, transparent)` }} />

            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ position: "relative" }}>
                <div style={{
                  width: 38, height: 38, borderRadius: "50%",
                  background: `linear-gradient(135deg, ${colors.gold}22, ${colors.green}22)`,
                  border: `1.5px solid ${colors.gold}44`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: colors.gold,
                }}>
                  <BotIcon size={20} />
                </div>
                <span style={{
                  position: "absolute", bottom: -1, right: -1,
                  width: 11, height: 11, borderRadius: "50%",
                  background: colors.green, border: `2px solid ${colors.bgCard}`,
                }} />
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 17, color: colors.text, letterSpacing: "0.5px" }}>
                    SABBI 2.0
                  </span>
                  <span style={{
                    display: "inline-flex", alignItems: "center", gap: 3,
                    fontSize: 10, fontWeight: 600, letterSpacing: "0.5px",
                    padding: "2px 7px", borderRadius: 6,
                    background: `${colors.gold}15`, border: `1px solid ${colors.gold}30`,
                    color: colors.gold,
                  }}>
                    <SparklesIcon size={9} /> PREMIUM
                  </span>
                </div>
                <p style={{ fontSize: 11, color: colors.textMuted, fontFamily: "'Source Sans 3', sans-serif", marginTop: 1 }}>
                  Subordination Specialist
                </p>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <button onClick={handleReset} title="Reset chat" style={{
                width: 32, height: 32, borderRadius: 8,
                background: "transparent", border: "none",
                color: colors.textMuted, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = colors.border; e.currentTarget.style.color = colors.gold; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = colors.textMuted; }}
              >
                <ResetIcon />
              </button>
              <button onClick={() => setIsOpen(false)} title="Close" style={{
                width: 32, height: 32, borderRadius: 8,
                background: "transparent", border: "none",
                color: colors.textMuted, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = colors.border; e.currentTarget.style.color = colors.text; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = colors.textMuted; }}
              >
                <XIcon size={18} />
              </button>
            </div>
          </div>

          {/* ── MESSAGES ── */}
          <div className="sabbi-scrollbar" style={{
            flex: 1, minHeight: 0, overflowY: "auto",
            padding: 16, display: "flex", flexDirection: "column", gap: 12,
            background: colors.bg,
          }}>
            {messages.map((msg, idx) => {
              const isUser = msg.sender === "user";
              return (
                <div key={msg.id} style={{
                  display: "flex", justifyContent: isUser ? "flex-end" : "flex-start",
                  animation: "sabbiFadeIn 0.3s ease-out",
                  animationDelay: `${idx * 0.05}s`,
                  animationFillMode: "both",
                }}>
                  <div style={{
                    display: "flex", alignItems: "flex-start", gap: 8,
                    maxWidth: "88%",
                    flexDirection: isUser ? "row-reverse" : "row",
                  }}>
                    {/* Avatar */}
                    <div style={{
                      width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      background: isUser
                        ? `linear-gradient(135deg, ${colors.green}, ${colors.greenLight})`
                        : `linear-gradient(135deg, ${colors.gold}30, ${colors.gold}10)`,
                      border: isUser ? "none" : `1px solid ${colors.gold}25`,
                      color: isUser ? colors.white : colors.gold,
                    }}>
                      {isUser ? <UserIcon size={14} /> : <BotIcon size={14} />}
                    </div>

                    {/* Bubble */}
                    <div style={{
                      borderRadius: isUser ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                      padding: "10px 14px",
                      background: isUser
                        ? `linear-gradient(135deg, ${colors.green}, ${colors.greenLight})`
                        : colors.bgMessage,
                      border: isUser ? "none" : `1px solid ${colors.border}`,
                      color: isUser ? colors.white : colors.text,
                    }}>
                      <p style={{
                        fontSize: 13.5, lineHeight: 1.55,
                        fontFamily: "'Source Sans 3', sans-serif",
                        whiteSpace: "pre-line", margin: 0,
                        wordBreak: "break-word",
                      }}>
                        {msg.text}
                      </p>
                      <p style={{
                        fontSize: 10, margin: 0, marginTop: 6,
                        color: isUser ? "rgba(255,255,255,0.6)" : colors.textDim,
                      }}>
                        {formatTime(msg.timestamp)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Typing indicator */}
            {isTyping && (
              <div style={{ display: "flex", alignItems: "flex-start", gap: 8, animation: "sabbiFadeIn 0.2s ease-out" }}>
                <div style={{
                  width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: `${colors.gold}15`, border: `1px solid ${colors.gold}25`, color: colors.gold,
                }}>
                  <BotIcon size={14} />
                </div>
                <div style={{
                  borderRadius: "16px 16px 16px 4px",
                  padding: "12px 16px",
                  background: colors.bgMessage, border: `1px solid ${colors.border}`,
                  display: "flex", gap: 5,
                }}>
                  {[0, 1, 2].map((i) => (
                    <span key={i} style={{
                      width: 6, height: 6, borderRadius: "50%",
                      background: colors.gold,
                      animation: `sabbiPulse 1.2s ease-in-out ${i * 0.2}s infinite`,
                    }} />
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* ── STARTER QUESTIONS ── */}
          {!hasUserMessages && (
            <div style={{
              padding: "12px 16px",
              borderTop: `1px solid ${colors.border}`,
              background: colors.bgCard,
            }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                <p style={{ fontSize: 11, fontWeight: 600, color: colors.textMuted, letterSpacing: "0.5px", textTransform: "uppercase", margin: 0, fontFamily: "'Rajdhani', sans-serif" }}>
                  Quick Questions
                </p>
                <button onClick={() => handleSend("joke")} title="Tell me a joke" style={{
                  display: "flex", alignItems: "center", gap: 4,
                  fontSize: 10, fontWeight: 600,
                  padding: "3px 8px", borderRadius: 6,
                  background: `${colors.gold}10`, border: `1px solid ${colors.gold}20`,
                  color: colors.gold, cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = `${colors.gold}20`; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = `${colors.gold}10`; }}
                >
                  <JokeIcon size={11} /> Joke
                </button>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {starterQuestions.map((q, i) => (
                  <button key={i} onClick={() => { handleSend(q); inputRef.current?.focus(); }} style={{
                    fontSize: 11.5, fontFamily: "'Source Sans 3', sans-serif",
                    padding: "5px 10px", borderRadius: 8,
                    background: colors.bgInput, border: `1px solid ${colors.border}`,
                    color: colors.textMuted, cursor: "pointer",
                    transition: "all 0.2s",
                    whiteSpace: "nowrap",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = colors.gold; e.currentTarget.style.color = colors.gold; e.currentTarget.style.background = `${colors.gold}08`; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = colors.border; e.currentTarget.style.color = colors.textMuted; e.currentTarget.style.background = colors.bgInput; }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── INPUT ── */}
          <div style={{
            padding: "12px 16px",
            borderTop: `1px solid ${colors.border}`,
            background: colors.bgCard,
          }}>
            <div style={{ display: "flex", gap: 8 }}>
              <input
                ref={inputRef}
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about subordination..."
                style={{
                  flex: 1, padding: "10px 14px",
                  borderRadius: 10,
                  border: `1px solid ${colors.border}`,
                  background: colors.bgInput,
                  color: colors.text,
                  fontSize: 13.5,
                  fontFamily: "'Source Sans 3', sans-serif",
                  outline: "none",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => { e.target.style.borderColor = colors.gold; }}
                onBlur={(e) => { e.target.style.borderColor = colors.border; }}
              />
              <button
                onClick={() => handleSend()}
                disabled={!userInput.trim()}
                style={{
                  width: 42, height: 42, borderRadius: 10,
                  border: "none",
                  background: userInput.trim()
                    ? `linear-gradient(135deg, ${colors.green}, ${colors.greenLight})`
                    : colors.border,
                  color: userInput.trim() ? colors.white : colors.textDim,
                  cursor: userInput.trim() ? "pointer" : "not-allowed",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all 0.2s",
                  flexShrink: 0,
                }}
              >
                <SendIcon />
              </button>
            </div>
            <p style={{
              fontSize: 10, color: colors.textDim,
              textAlign: "center", marginTop: 8, marginBottom: 0,
              fontFamily: "'Source Sans 3', sans-serif",
            }}>
              Sabbi 2.0 — Subordination Specialist • <span style={{ color: colors.gold }}>SmallBiz Recon™</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}