import { lazy, Suspense } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import AppShell from "./components/layout/AppShell";
import ScrollToTop from "./components/ScrollToTop";

/* ── Homepage sections (eagerly loaded — critical path) ── */
import Hero from "./components/Hero";
import WhoWeHelp from "./components/home/WhoWeHelp";
import OurMission from "./components/home/OurMission";
import QuizTeaser from "./components/home/QuizTeaser";
import ConsultationSection from "./components/home/ConsultationSection";
import TrustSection from "./components/home/TrustSection";

/* ── Core pages (eagerly loaded — primary nav targets) ── */
import PaidConsultation from "./pages/PaidConsultation";
import CaseEvaluatorPage from "./pages/CaseEvaluatorPage";

/* ── Lazy-loaded pages ── */
const ContactUs = lazy(() => import("./pages/ContactUs"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsAndConditions = lazy(() => import("./pages/TermsAndConditions"));
const RefundAccessPolicy = lazy(() => import("./pages/RefundAccessPolicy"));
const DoNotSell = lazy(() => import("./pages/DoNotSell"));
const AccessibilityStatement = lazy(() => import("./pages/AccessibilityStatement"));
const CheckoutSuccess = lazy(() => import("./pages/CheckoutSuccess"));

const SBAFormsLibraryPage = lazy(() => import("./components/SBAFormsLibraryPage"));
const SBAHelpGuidesPage = lazy(() => import("./pages/SBAHelpGuidesPage"));
const CovidEIDLToolkits = lazy(() => import("./pages/CovidEIDLToolkits"));
const SBAResourcesHub = lazy(() => import("./pages/SBAResourcesHub"));
const BusinessPlanGenerator = lazy(() => import("./pages/BusinessPlanGenerator"));
const DisputeRecallService = lazy(() => import("./pages/DisputeRecallService"));
const DisputeRecallIntakeForm = lazy(() => import("./pages/DisputeRecallIntakeForm"));
const DocumentPackagingPage = lazy(() => import("./pages/DocumentPackagingPage"));

const SubordinationAccess = lazy(() => import("./pages/access/SubordinationAccess"));
const SubordinationFormsPage = lazy(() => import("./pages/access/SubordinationFormsPage"));
const SubordinationTemplatesPage = lazy(() => import("./pages/access/SubordinationTemplatesPage"));
const CollateralAccess = lazy(() => import("./pages/access/CollateralAccess"));
const CollateralFormsPage = lazy(() => import("./pages/access/CollateralFormsPage"));
const CollateralTemplatesPage = lazy(() => import("./pages/access/CollateralTemplatesPage"));
const PaymentAssistanceAccess = lazy(() => import("./pages/access/PaymentAssistanceAccess"));
const InteractivePaymentAssistanceGuide = lazy(() => import("./pages/access/InteractivePaymentAssistanceGuide"));
const ChangeInOwnershipAccess = lazy(() => import("./pages/access/ChangeInOwnershipAccess"));
const ChangeInOwnershipFormsPage = lazy(() => import("./pages/access/ChangeInOwnershipFormsPage"));
const ChangeInOwnershipTemplatesPage = lazy(() => import("./pages/access/ChangeInOwnershipTemplatesPage"));
const AssumptionAccess = lazy(() => import("./pages/access/AssumptionAccess"));
const AssumptionFormsPage = lazy(() => import("./pages/access/AssumptionFormsPage"));
const AssumptionTemplatesPage = lazy(() => import("./pages/access/AssumptionTemplatesPage"));
const RelocationAccess = lazy(() => import("./pages/access/RelocationAccess"));
const SBALoanAccess = lazy(() => import("./pages/access/SBALoanAccess"));
const SBA7aFormsPage = lazy(() => import("./pages/access/SBA7aFormsPage"));
const SBA504FormsPage = lazy(() => import("./pages/access/SBA504FormsPage"));
const SBA7aTemplatesPage = lazy(() => import("./pages/access/SBA7aTemplatesPage"));
const SBA504TemplatesPage = lazy(() => import("./pages/access/SBA504TemplatesPage"));

const SBALoanToolkitPage = lazy(() => import("./pages/toolkits/SBALoanToolkitPage"));
const SBAContactsPage = lazy(() => import("./pages/SBAContactsPage"));
const SBAToolkitsPage = lazy(() => import("./pages/SBAToolkitsPage"));
const SabbiFAQ = lazy(() => import("./pages/SabbiFAQ"));
const SBA101QuickIntro = lazy(() => import("./pages/SBA101QuickIntro"));
const SBA101QuickGuide = lazy(() => import("./pages/toolkits/SBA101QuickGuide"));
const DocumentUploadPage = lazy(() => import("./pages/DocumentUploadPage"));
const SmallBizReconSOSDatabase = lazy(() => import("./pages/SmallBizReconSOSDatabase"));

const SBANewsUpdatesPage = lazy(() => import("./pages/SBANewsUpdatesPage"));
const SBARNewsletterPage = lazy(() => import("./pages/SBARNewsletterPage"));
const FinancialCounselingResources = lazy(() => import("./pages/FinancialCounselingResources"));
const SBACompliancePage = lazy(() => import("./pages/SBACompliancePage"));

const ResourceCommandCenter = lazy(() => import("./pages/ResourceCommandCenter"));
const PolicyAlertsPage = lazy(() => import("./pages/PolicyAlertsPage"));
const IntelBoardPage = lazy(() => import("./pages/IntelBoardPage"));
const IntelBoardPostPage = lazy(() => import("./pages/IntelBoardPostPage"));

const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminPostsManager = lazy(() => import("./pages/admin/AdminPostsManager"));
const AdminPostEditor = lazy(() => import("./pages/admin/AdminPostEditor"));
const AdminCommentsModeration = lazy(() => import("./pages/admin/AdminCommentsModeration"));
const AdminReportsManager = lazy(() => import("./pages/admin/AdminReportsManager"));
const AdminLoginPage = lazy(() => import("./pages/admin/AdminLoginPage"));

/* ── Loading fallback ── */
function PageLoader() {
  return (
    <div style={{
      minHeight: "40vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <div style={{
        width: 32,
        height: 32,
        border: "3px solid var(--color-border-light)",
        borderTopColor: "var(--color-brand-green)",
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite",
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

function NotFoundPage() {
  return (
    <div style={{
      minHeight: "60vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 20px",
      textAlign: "center",
      fontFamily: "var(--font-body)",
      background: "var(--color-bg)",
    }}>
      <div style={{
        fontSize: 64,
        fontWeight: 400,
        fontFamily: "var(--font-display)",
        color: "var(--color-brand-green)",
        lineHeight: 1,
        marginBottom: 16,
      }}>
        404
      </div>
      <h1 style={{
        fontSize: 22,
        fontWeight: 600,
        color: "var(--color-text)",
        marginBottom: 10,
        fontFamily: "var(--font-body)",
      }}>
        Page Not Found
      </h1>
      <p style={{
        fontSize: 15,
        color: "var(--color-text-secondary)",
        maxWidth: 400,
        lineHeight: 1.6,
        marginBottom: 28,
      }}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/home"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "12px 24px",
          borderRadius: 8,
          background: "var(--color-brand-green)",
          color: "#FAF9F6",
          fontSize: 15,
          fontWeight: 600,
          textDecoration: "none",
        }}
      >
        Back to Home
      </Link>
    </div>
  );
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Root redirects to /home */}
          <Route path="/" element={<Navigate to="/home" replace />} />

          <Route element={<AppShell />}>
            {/* ── Homepage ── */}
            <Route
              path="/home"
              element={
                <>
                  <Hero />
                  <WhoWeHelp />
                  <OurMission />
                  <QuizTeaser />
                  <ConsultationSection />
                  <TrustSection />
                </>
              }
            />

            {/* ── Core pages (eager) ── */}
            <Route path="/consultation" element={<PaidConsultation />} />
            <Route path="/case-evaluator" element={<CaseEvaluatorPage />} />

            {/* ── Core pages (lazy) ── */}
            <Route path="/contact" element={<ContactUs />} />

            {/* ── Legal (lazy) ── */}
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsAndConditions />} />
            <Route path="/refund-policy" element={<RefundAccessPolicy />} />
            <Route path="/do-not-sell" element={<DoNotSell />} />
            <Route path="/accessibility" element={<AccessibilityStatement />} />

            {/* ��─ Checkout ── */}
            <Route path="/checkout/success" element={<CheckoutSuccess />} />

            {/* ── Resource pages (lazy) ── */}
            <Route path="/sba-forms" element={<SBAFormsLibraryPage />} />
            <Route path="/sba-resources/help-packets" element={<SBAHelpGuidesPage />} />
            <Route path="/sba/sba-contacts" element={<SBAContactsPage />} />
            <Route path="/covid-eidl-toolkits" element={<CovidEIDLToolkits />} />
            <Route path="/business-plan-generator" element={<BusinessPlanGenerator />} />
            <Route path="/dispute-recall-service" element={<DisputeRecallService />} />
            <Route path="/dispute-recall-service/intake" element={<DisputeRecallIntakeForm />} />

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
            <Route path="/resources/command-center" element={<ResourceCommandCenter />} />
            <Route path="/policy-alerts" element={<PolicyAlertsPage />} />

            <Route path="*" element={<NotFoundPage />} />
          </Route>

          {/* ── Admin (outside AppShell, lazy) ── */}
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
      </Suspense>
    </>
  );
}
