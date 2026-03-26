import { Routes, Route, Link, Navigate } from "react-router-dom";
import AppShell from "./components/layout/AppShell";
import PolicyAlertModal from "./components/PolicyAlertModal";
import ScrollToTop from "./components/ScrollToTop";

import GateScreen from "./pages/GateScreen";
import Hero from "./components/Hero";
import CaseEvaluatorCTA from "./components/home/CaseEvaluatorCTA";
import TwoPathsSection from "./components/home/TwoPathsSection";
import ConsultationCTAs from "./components/home/ConsultationCTAs";

import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import RefundAccessPolicy from "./pages/RefundAccessPolicy";
import DoNotSell from "./pages/DoNotSell";

import SBAFormsLibraryPage from "./components/SBAFormsLibraryPage";
import SBAHelpGuidesPage from "./pages/SBAHelpGuidesPage";
import CovidEIDLToolkits from "./pages/CovidEIDLToolkits";
import ContactUs from "./pages/ContactUs";
import ComingSoonPage from "./pages/ComingSoonPage";
import SBAResourcesHub from "./pages/SBAResourcesHub";
import PaidConsultation from './pages/PaidConsultation';

import SubordinationAccess from "./pages/access/SubordinationAccess";
import SubordinationFormsPage from "./pages/access/SubordinationFormsPage";
import SubordinationTemplatesPage from "./pages/access/SubordinationTemplatesPage";

import CollateralAccess from "./pages/access/CollateralAccess";
import CollateralFormsPage from "./pages/access/CollateralFormsPage";
import CollateralTemplatesPage from "./pages/access/CollateralTemplatesPage";

import PaymentAssistanceAccess from "./pages/access/PaymentAssistanceAccess";
import InteractivePaymentAssistanceGuide from './pages/access/InteractivePaymentAssistanceGuide';

import ChangeInOwnershipAccess from "./pages/access/ChangeInOwnershipAccess";
import ChangeInOwnershipFormsPage from "./pages/access/ChangeInOwnershipFormsPage";
import ChangeInOwnershipTemplatesPage from "./pages/access/ChangeInOwnershipTemplatesPage";

import AssumptionAccess from "./pages/access/AssumptionAccess";
import AssumptionFormsPage from "./pages/access/AssumptionFormsPage";
import AssumptionTemplatesPage from "./pages/access/AssumptionTemplatesPage";
import RelocationAccess from "./pages/access/RelocationAccess";

import SBALoanToolkitPage from "./pages/toolkits/SBALoanToolkitPage";
import SBALoanAccess from "./pages/access/SBALoanAccess";
import SBA7aFormsPage from "./pages/access/SBA7aFormsPage";
import SBA504FormsPage from "./pages/access/SBA504FormsPage";
import SBA7aTemplatesPage from "./pages/access/SBA7aTemplatesPage";
import SBA504TemplatesPage from "./pages/access/SBA504TemplatesPage";

import SBAContactsPage from "./pages/SBAContactsPage";
import SBAToolkitsPage from "./pages/SBAToolkitsPage";
import SabbiFAQ from "./pages/SabbiFAQ";
import SBA101QuickIntro from "./pages/SBA101QuickIntro";
import SBA101QuickGuide from "./pages/toolkits/SBA101QuickGuide";
import DocumentUploadPage from "./pages/DocumentUploadPage";
import SmallBizReconSOSDatabase from "./pages/SmallBizReconSOSDatabase";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import DisputeRecallService from "./pages/DisputeRecallService";
import DisputeRecallIntakeForm from "./pages/DisputeRecallIntakeForm";
import DocumentPackagingPage from "./pages/DocumentPackagingPage";

import SBANewsUpdatesPage from "./pages/SBANewsUpdatesPage";
import SBARNewsletterPage from "./pages/SBARNewsletterPage";
import FinancialCounselingResources from "./pages/FinancialCounselingResources";
import SBACompliancePage from "./pages/SBACompliancePage";

import BusinessPlanGenerator from "./pages/BusinessPlanGenerator";
import AccessibilityStatement from "./pages/AccessibilityStatement";
import ResourceCommandCenter from "./pages/ResourceCommandCenter";
import CaseEvaluatorPage from "./pages/CaseEvaluatorPage";
import PolicyAlertsPage from "./pages/PolicyAlertsPage";
import IntelBoardPage from "./pages/IntelBoardPage";
import IntelBoardPostPage from "./pages/IntelBoardPostPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminPostsManager from "./pages/admin/AdminPostsManager";
import AdminPostEditor from "./pages/admin/AdminPostEditor";
import AdminCommentsModeration from "./pages/admin/AdminCommentsModeration";
import AdminReportsManager from "./pages/admin/AdminReportsManager";
import AdminLoginPage from "./pages/admin/AdminLoginPage";

function NotFoundPage() {
  return (
    <div style={{
      minHeight: "60vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "#060608",
      padding: "40px 20px",
      textAlign: "center",
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <div style={{
        fontSize: 80,
        fontWeight: 700,
        color: "#cda349",
        fontFamily: "'Instrument Serif', Georgia, serif",
        lineHeight: 1,
        marginBottom: 16,
      }}>
        404
      </div>
      <h1 style={{
        fontSize: 24,
        fontWeight: 600,
        color: "#eaf0e4",
        marginBottom: 12,
      }}>
        Page Not Found
      </h1>
      <p style={{
        fontSize: 15,
        color: "rgba(232,237,226,0.4)",
        maxWidth: 420,
        lineHeight: 1.6,
        marginBottom: 32,
      }}>
        The page you're looking for doesn't exist or has been moved. Let's get you back on track.
      </p>
      <Link
        to="/home"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "14px 28px",
          borderRadius: 14,
          background: "linear-gradient(135deg, rgba(200,168,78,0.28), rgba(200,168,78,0.1))",
          border: "1px solid rgba(200,168,78,0.38)",
          color: "#eaf0e4",
          fontSize: 15,
          fontWeight: 600,
          textDecoration: "none",
          transition: "all 0.3s ease",
        }}
      >
        ← Back to Home
      </Link>
    </div>
  );
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <PolicyAlertModal />
      <Routes>
        <Route path="/" element={<GateScreen />} />

        <Route element={<AppShell />}>
          <Route
            path="/home"
            element={
              <>
                <Hero />
                <CaseEvaluatorCTA />
                <TwoPathsSection />
                <ConsultationCTAs />
              </>
            }
          />

          <Route path="/checkout/success" element={<CheckoutSuccess />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsAndConditions />} />
          <Route path="/refund-policy" element={<RefundAccessPolicy />} />
          <Route path="/do-not-sell" element={<DoNotSell />} />

          <Route path="/sba-forms" element={<SBAFormsLibraryPage />} />
          <Route path="/sba-resources/help-packets" element={<SBAHelpGuidesPage />} />
          <Route path="/sba/sba-contacts" element={<SBAContactsPage />} />
          <Route path="/consultation" element={<PaidConsultation />} />

          <Route path="/covid-eidl-toolkits" element={<CovidEIDLToolkits />} />
          <Route path="/business-plan-generator" element={<BusinessPlanGenerator />} />
          <Route path="/dispute-recall-service" element={<DisputeRecallService />} />
          <Route path="/dispute-recall-service/intake" element={<DisputeRecallIntakeForm />} />
          <Route path="/contact" element={<ContactUs />} />

          <Route path="/access/subordination" element={<SubordinationAccess />} />
          <Route path="/access/subordination/forms" element={<SubordinationFormsPage />} />
          <Route path="/access/subordination/templates" element={<SubordinationTemplatesPage />} />

          <Route path="/access/collateral-release" element={<CollateralAccess />} />
          <Route path="/access/collateral-release/forms" element={<CollateralFormsPage />} />
          <Route path="/access/collateral-release/templates" element={<CollateralTemplatesPage />} />

          <Route path="/access/payment-assistance" element={<PaymentAssistanceAccess />} />
          <Route path="/access/payment-assistance/guide" element={<InteractivePaymentAssistanceGuide />} />

          <Route path="/access/change-in-ownership" element={<ChangeInOwnershipAccess />} />
          <Route path="/access/change-in-ownership/forms" element={<ChangeInOwnershipFormsPage />} />
          <Route path="/access/change-in-ownership/templates" element={<ChangeInOwnershipTemplatesPage />} />

          <Route path="/access/assumption" element={<AssumptionAccess />} />
          <Route path="/access/assumption/forms" element={<AssumptionFormsPage />} />
          <Route path="/access/assumption/templates" element={<AssumptionTemplatesPage />} />

          <Route path="/access/relocation" element={<RelocationAccess />} />

          <Route path="/financial-counseling-resources" element={<FinancialCounselingResources />} />
          <Route path="/toolkits/sba-toolkits" element={<SBAToolkitsPage />} />
          <Route path="/sabbi-faq" element={<SabbiFAQ />} />
          <Route path="/sba/resources/quick-intro-guide" element={<SBA101QuickIntro />} />
          <Route path="/toolkits/sba-101-quick-guide" element={<SBA101QuickGuide />} />
          <Route path="/upload" element={<DocumentUploadPage />} />

          <Route path="/resources/SOSDatabase" element={<SmallBizReconSOSDatabase />} />

          <Route path="/sba-resources-hub" element={<SBAResourcesHub />} />
          <Route path="/community/news-updates" element={<SBANewsUpdatesPage />} />
          <Route path="/community/newsletter" element={<SBARNewsletterPage />} />
          <Route path="/sba-compliance" element={<SBACompliancePage />} />

          <Route path="/intel-board" element={<IntelBoardPage />} />
          <Route path="/intel-board/:slug" element={<IntelBoardPostPage />} />
          <Route path="/community" element={<Navigate to="/intel-board" replace />} />

          <Route path="/sba-7a" element={<SBALoanToolkitPage variant="7a" />} />
          <Route path="/sba-504" element={<SBALoanToolkitPage variant="504" />} />

          <Route path="/access/sba-7a" element={<SBALoanAccess variant="7a" />} />
          <Route path="/access/sba-7a/forms" element={<SBA7aFormsPage />} />
          <Route path="/access/sba-7a/templates" element={<SBA7aTemplatesPage />} />

          <Route path="/access/sba-504" element={<SBALoanAccess variant="504" />} />
          <Route path="/access/sba-504/forms" element={<SBA504FormsPage />} />
          <Route path="/access/sba-504/templates" element={<SBA504TemplatesPage />} />

          <Route path="/ppp" element={<DocumentPackagingPage />} />
          <Route path="/accessibility" element={<AccessibilityStatement />} />
          <Route path="/resources/command-center" element={<ResourceCommandCenter />} />
          <Route path="/case-evaluator" element={<CaseEvaluatorPage />} />
          <Route path="/policy-alerts" element={<PolicyAlertsPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Route>

        <Route path="/admin/login" element={<AdminLoginPage />} />

        <Route path="/intel-board/admin" element={<AdminDashboard />}>
          <Route index element={<Navigate to="/intel-board/admin/posts" replace />} />
          <Route path="posts" element={<AdminPostsManager />} />
          <Route path="posts/new" element={<AdminPostEditor />} />
          <Route path="posts/:id/edit" element={<AdminPostEditor />} />
          <Route path="comments" element={<AdminCommentsModeration />} />
          <Route path="reports" element={<AdminReportsManager />} />
        </Route>
      </Routes>
    </>
  );
}