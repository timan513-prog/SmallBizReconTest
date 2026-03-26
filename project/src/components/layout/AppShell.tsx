import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import Header from "../Header";
import Footer from "../Footer";
import CookieConsent from "../CookieConsent";
import ScrollToTop from "../ScrollToTop";

import SmartChatbotRouter from "../SmartChatbotRouter";

/**
 * FIX: Removed duplicate AuthProvider wrapper.
 * The AuthProvider in contexts/AuthContext.tsx is already mounted in main.tsx
 * and wraps the entire app. Having a second AuthProvider here created
 * conflicting auth state (no profile/admin checks in the inner one).
 */
export default function AppShell() {
  const [showCookieConsent, setShowCookieConsent] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <>
      <ScrollToTop />

      <div className="min-h-screen bg-[#060608]">
        <a
          href="#main-content"
          style={{
            position: 'absolute',
            left: '-9999px',
            top: 'auto',
            width: '1px',
            height: '1px',
            overflow: 'hidden',
            zIndex: 99999,
            padding: '14px 24px',
            background: '#cda349',
            color: '#060608',
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 600,
            fontSize: 14,
            borderRadius: '0 0 12px 0',
            textDecoration: 'none',
          }}
          onFocus={(e) => {
            e.currentTarget.style.position = 'fixed';
            e.currentTarget.style.left = '0';
            e.currentTarget.style.top = '0';
            e.currentTarget.style.width = 'auto';
            e.currentTarget.style.height = 'auto';
          }}
          onBlur={(e) => {
            e.currentTarget.style.position = 'absolute';
            e.currentTarget.style.left = '-9999px';
            e.currentTarget.style.width = '1px';
            e.currentTarget.style.height = '1px';
          }}
        >
          Skip to main content
        </a>
        <Header />

        <main id="main-content" className="pt-16"> {/* pt-16 = 64px, must match Header HEADER_HEIGHT */}
          <Outlet />
        </main>

        <Footer setShowCookieConsent={setShowCookieConsent} />

        <SmartChatbotRouter />
        <CookieConsent isOpen={showCookieConsent} onClose={setShowCookieConsent} />
      </div>
    </>
  );
}
