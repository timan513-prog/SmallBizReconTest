import { useState } from "react";
import { Outlet } from "react-router-dom";

import Header from "../Header";
import Footer from "../Footer";
import CookieConsent from "../CookieConsent";
import ScrollToTop from "../ScrollToTop";

export default function AppShell() {
  const [showCookieConsent, setShowCookieConsent] = useState(false);

  return (
    <>
      <ScrollToTop />

      <div style={{ minHeight: "100vh", background: "var(--color-bg)" }}>
        <a
          href="#main-content"
          style={{
            position: "absolute",
            left: "-9999px",
            top: "auto",
            width: "1px",
            height: "1px",
            overflow: "hidden",
            zIndex: 99999,
            padding: "14px 24px",
            background: "var(--color-brand-green)",
            color: "#FAF9F6",
            fontFamily: "var(--font-body)",
            fontWeight: 600,
            fontSize: 14,
            borderRadius: "0 0 12px 0",
            textDecoration: "none",
          }}
          onFocus={(e) => {
            e.currentTarget.style.position = "fixed";
            e.currentTarget.style.left = "0";
            e.currentTarget.style.top = "0";
            e.currentTarget.style.width = "auto";
            e.currentTarget.style.height = "auto";
          }}
          onBlur={(e) => {
            e.currentTarget.style.position = "absolute";
            e.currentTarget.style.left = "-9999px";
            e.currentTarget.style.width = "1px";
            e.currentTarget.style.height = "1px";
          }}
        >
          Skip to main content
        </a>

        <Header />

        <main id="main-content" style={{ paddingTop: 72 }}>
          <Outlet />
        </main>

        <Footer setShowCookieConsent={setShowCookieConsent} />

        <CookieConsent isOpen={showCookieConsent} onClose={setShowCookieConsent} />
      </div>
    </>
  );
}
