import { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const HEADER_HEIGHT = 72;

const NAV_LINKS = [
  { to: "/home", label: "Home" },
  { to: "/case-evaluator", label: "Quiz" },
  { to: "/consultation", label: "Consultation" },
  { to: "/contact", label: "Contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <header
        role="banner"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          height: HEADER_HEIGHT,
          background: scrolled ? "rgba(250, 249, 246, 0.95)" : "rgba(250, 249, 246, 0.8)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: scrolled ? "1px solid #E2E0DA" : "1px solid transparent",
          transition: "background 0.3s ease, border-color 0.3s ease",
        }}
      >
        <div style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
          {/* Logo */}
          <Link
            to="/home"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              textDecoration: "none",
              flexShrink: 0,
            }}
            aria-label="SmallBiz Recon — Home"
          >
            <img
              src="/smallbizrecon_logo_transparent.png"
              alt=""
              width={40}
              height={40}
              style={{ width: 40, height: 40 }}
              loading="eager"
            />
            <span style={{
              fontFamily: "var(--font-display)",
              fontSize: 20,
              color: "#3B4A2C",
              fontWeight: 400,
            }}>
              SmallBiz Recon
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav
            aria-label="Primary navigation"
            style={{ display: "flex", alignItems: "center", gap: 4 }}
            className="hidden-mobile"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                aria-current={isActive(link.to) ? "page" : undefined}
                style={{
                  padding: "8px 16px",
                  fontSize: 15,
                  fontWeight: 500,
                  color: isActive(link.to) ? "#3B4A2C" : "#5A5F58",
                  textDecoration: "none",
                  borderRadius: 8,
                  background: isActive(link.to) ? "rgba(59, 74, 44, 0.06)" : "transparent",
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <Link
            to="/consultation"
            className="hidden-mobile"
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "10px 24px",
              borderRadius: 8,
              background: "#3B4A2C",
              color: "#FAF9F6",
              fontSize: 14,
              fontWeight: 600,
              textDecoration: "none",
              letterSpacing: "0.01em",
            }}
          >
            Free Consultation
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="show-mobile-only"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            style={{
              display: "none",
              width: 44,
              height: 44,
              borderRadius: 8,
              border: "1px solid #E2E0DA",
              background: "white",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#3B4A2C",
            }}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          aria-hidden="true"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 998,
            background: "rgba(0,0,0,0.3)",
          }}
          onClick={closeMobile}
        />
      )}

      {/* Mobile menu */}
      <nav
        role="navigation"
        aria-label="Mobile navigation"
        aria-hidden={!mobileOpen}
        className="show-mobile-only"
        style={{
          display: "none",
          position: "fixed",
          top: HEADER_HEIGHT,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 999,
          background: "#FAF9F6",
          overflowY: "auto",
          opacity: mobileOpen ? 1 : 0,
          transform: mobileOpen ? "translateY(0)" : "translateY(-12px)",
          pointerEvents: mobileOpen ? "auto" : "none",
          transition: "opacity 0.25s ease, transform 0.25s ease",
        }}
      >
        <div style={{ padding: "24px 24px 32px" }}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={closeMobile}
              aria-current={isActive(link.to) ? "page" : undefined}
              style={{
                display: "block",
                padding: "16px 0",
                fontSize: 18,
                fontWeight: 500,
                color: isActive(link.to) ? "#3B4A2C" : "#5A5F58",
                textDecoration: "none",
                borderBottom: "1px solid #ECEAE4",
              }}
            >
              {link.label}
            </Link>
          ))}

          <Link
            to="/consultation"
            onClick={closeMobile}
            style={{
              display: "block",
              marginTop: 24,
              padding: "14px 24px",
              borderRadius: 8,
              background: "#3B4A2C",
              color: "#FAF9F6",
              fontSize: 16,
              fontWeight: 600,
              textDecoration: "none",
              textAlign: "center",
            }}
          >
            Free Consultation
          </Link>
        </div>
      </nav>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile-only { display: flex !important; }
        }
        @media (min-width: 769px) {
          .show-mobile-only { display: none !important; }
        }
      `}</style>
    </>
  );
}
