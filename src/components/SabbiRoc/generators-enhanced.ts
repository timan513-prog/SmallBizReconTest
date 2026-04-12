/**
 * Document Generators - Enhanced with Error Handling
 * Functions for generating letters, emails, and cover pages
 */

import { BorrowerStatus, RECOMMENDED_PACKET_ORDER, SBA_CONTACT } from './constants';
import { getCurrentDate } from './utils';
import { safeSync, ErrorResult } from './utils/errorHandling';

export interface WizardAnswers {
  loan_number?: string;
  business_name?: string;
  request_type?: string;
  business_status?: string;
  transaction?: string;
  buyer_or_lender?: string;
  documents_you_have?: string;
  values?: string;
  how_you_will_submit?: string;
  benefit_statement?: string;
}

/**
 * Generate borrower request letter with error handling
 */
export const generateBorrowerLetter = (answers: WizardAnswers): ErrorResult<string> => {
  return safeSync(
    'Generate Borrower Letter',
    () => {
      const loanNum = answers.loan_number || '[LOAN NUMBER]';
      const bizName = answers.business_name || '[BUSINESS NAME]';
      const request = answers.request_type || '[Describe collateral and full or partial release]';
      const status = answers.business_status || '[Operating or Closed]';
      const txn = answers.transaction || '[Sale, refinance, payoff, other]';
      const buyerLender = answers.buyer_or_lender || '[Buyer or Lender name, if applicable]';
      const values = answers.values || '[Sale price, collateral value, paydown, balances]';
      const benefit = answers.benefit_statement || '[2 to 4 sentences, business benefit tied to repayment ability]';

      return [
        '[YOUR LETTERHEAD]',
        getCurrentDate(),
        '',
        'U.S. Small Business Administration',
        'COVID EIDL Servicing',
        '',
        `Re: Collateral Release Request - SBA Loan ${loanNum}`,
        '',
        'Dear SBA Servicing,',
        '',
        `I am requesting a collateral release related to my COVID EIDL loan, SBA Loan ${loanNum}, ${bizName}.`,
        '',
        `Request: ${request}`,
        `Business status: ${status}`,
        `Transaction driver: ${txn}`,
        `Buyer or lender: ${buyerLender}`,
        '',
        'Values and amounts',
        values,
        '',
        'Business benefit',
        benefit,
        '',
        'Attached documents',
        '- Borrower request letter, signed and dated',
        '- SBA Form 2518, signed and dated',
        '- UCC lien search, current',
        '- Proof of insurance, declarations pages',
        '- Transaction documents, purchase agreement, bill of sale, or settlement statement, if applicable',
        '- Title report and appraisal, if real estate, if required',
        '- Payoff letters for any senior liens, if applicable',
        '',
        'Thank you for your review. Please confirm receipt and advise if anything further is needed.',
        '',
        'Sincerely,',
        '[SIGNATURE]',
        '[NAME]',
        '[TITLE]',
        '[PHONE]',
        '[EMAIL]'
      ].join('\n');
    },
    'Error generating borrower letter. Please try again.'
  );
};

/**
 * Generate email submission template with error handling
 */
export const generateEmailTemplate = (
  answers: WizardAnswers,
  borrowerStatus: BorrowerStatus
): ErrorResult<string> => {
  return safeSync(
    'Generate Email Template',
    () => {
      const loanNum = answers.loan_number || '[LOAN NUMBER]';
      const bizName = answers.business_name || '[BUSINESS NAME]';
      const subjectResult = generateSubjectLine(answers, borrowerStatus);
      const subject = subjectResult.success ? subjectResult.data! : 'COLLATERAL RELEASE REQUEST';

      return [
        `To: ${SBA_CONTACT.EMAIL}`,
        `Subject: ${subject}`,
        '',
        'Hello SBA Servicing,',
        '',
        `Attached is our complete collateral release request package for SBA Loan ${loanNum}, Business: ${bizName}.`,
        '',
        'Request summary',
        `- ${answers.request_type || '[Describe collateral and full or partial release]'}`,
        '',
        'Please confirm receipt and advise if additional items are needed.',
        '',
        'Thank you,',
        '[NAME]',
        '[TITLE]',
        '[PHONE]',
        '[EMAIL]'
      ].join('\n');
    },
    'Error generating email template. Please try again.'
  );
};

/**
 * Generate packet cover page with error handling
 */
export const generateCoverPage = (
  answers: WizardAnswers,
  borrowerStatus: BorrowerStatus
): ErrorResult<string> => {
  return safeSync(
    'Generate Cover Page',
    () => {
      const loanNum = answers.loan_number || '[LOAN NUMBER]';
      const bizName = answers.business_name || '[BUSINESS NAME]';

      return [
        'PACKET COVER PAGE',
        '',
        'Servicing action: Release of Collateral',
        `SBA Loan number: ${loanNum}`,
        `Business name: ${bizName}`,
        borrowerStatus !== 'Select status' ? `Loan status: ${borrowerStatus}` : 'Loan status: Not provided',
        '',
        'Included documents, in order',
        ...RECOMMENDED_PACKET_ORDER,
        '',
        'File naming, use this every time',
        generateFileNamingGuide(answers).data || 'Error generating file naming guide',
        '',
        'Submission method, use one method only',
        answers.how_you_will_submit || '[Email, Box upload, or Fax, include subject line with loan number]',
        '',
        'Notes',
        '- All files labeled, PDF format',
        '- Signatures and dates confirmed',
        '- Names and loan number consistent across documents'
      ].join('\n');
    },
    'Error generating cover page. Please try again.'
  );
};

/**
 * Generate subject line for email with error handling
 */
export const generateSubjectLine = (
  answers: WizardAnswers,
  borrowerStatus: BorrowerStatus
): ErrorResult<string> => {
  return safeSync(
    'Generate Subject Line',
    () => {
      const loanNum = answers.loan_number || '[LOAN NUMBER]';
      const bizName = answers.business_name || '[BUSINESS NAME]';
      const extra = borrowerStatus !== 'Select status' ? ` - Status: ${borrowerStatus}` : '';
      return `COLLATERAL RELEASE REQUEST - ${loanNum} - ${bizName}${extra}`;
    },
    'COLLATERAL RELEASE REQUEST'
  );
};

/**
 * Generate file naming guide with error handling
 */
export const generateFileNamingGuide = (answers: WizardAnswers): ErrorResult<string> => {
  return safeSync(
    'Generate File Naming Guide',
    () => {
      const loanNum = answers.loan_number || '1234567890';
      const bizName = answers.business_name || 'ACME LLC';
      const date = getCurrentDate();

      return [
        'Naming format: LoanNumber_BusinessName_DocumentName_Date',
        `Example: ${loanNum}_${bizName}_SBA_2518_${date}.pdf`,
        `Example: ${loanNum}_${bizName}_Borrower_Letter_${date}.pdf`,
        `Example: ${loanNum}_${bizName}_UCC_Lien_Search_${date}.pdf`
      ].join('\n');
    },
    'Error generating file naming guide'
  );
};

/**
 * Generate recommended packet order
 */
export const generatePacketOrder = (): string => {
  return RECOMMENDED_PACKET_ORDER.join('\n');
};

/**
 * Generate full packet guide (order + naming) with error handling
 */
export const generateFullPacketGuide = (answers: WizardAnswers): ErrorResult<string> => {
  return safeSync(
    'Generate Full Packet Guide',
    () => {
      const namingResult = generateFileNamingGuide(answers);
      const naming = namingResult.success ? namingResult.data! : 'Error generating file naming';

      return [
        'Exact packet order',
        '',
        generatePacketOrder(),
        '',
        'File naming, use this every time',
        '',
        naming
      ].join('\n');
    },
    'Error generating packet guide. Please try again.'
  );
};

// Export original functions for backward compatibility
export const generateBorrowerLetterUnsafe = (answers: WizardAnswers): string => {
  const result = generateBorrowerLetter(answers);
  return result.success ? result.data! : result.message;
};

export const generateEmailTemplateUnsafe = (
  answers: WizardAnswers,
  borrowerStatus: BorrowerStatus
): string => {
  const result = generateEmailTemplate(answers, borrowerStatus);
  return result.success ? result.data! : result.message;
};

export const generateCoverPageUnsafe = (
  answers: WizardAnswers,
  borrowerStatus: BorrowerStatus
): string => {
  const result = generateCoverPage(answers, borrowerStatus);
  return result.success ? result.data! : result.message;
};