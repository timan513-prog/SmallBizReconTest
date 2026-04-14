import { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ArrowRight } from "lucide-react";

const HEADER_HEIGHT = 64;

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

  useEffect(() => { setMobileOpen(false); }, [location]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 769) setMobileOpen(false);
    };
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const closeMobile = useCallback(() => setMobileOpen(false), []);
  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <style>{`
        .sbr-desktop-nav,
        .sbr-desktop-cta { display: flex; }
        .sbr-mobile-toggle { display: none; }
        .sbr-mobile-menu { display: none; }
        .sbr-logo-text { display: inline; }

        @media (max-width: 768px) {
          .sbr-desktop-nav,
          .sbr-desktop-cta { display: none !important; }
          .sbr-mobile-toggle { display: flex !important; }
          .sbr-mobile-menu { display: block !important; }
        }

        @media (max-width: 380px) {
          .sbr-logo-text { display: none !important; }
        }
      `}</style>

      <header
        role="banner"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          height: HEADER_HEIGHT,
          background: scrolled ? "rgba(250, 249, 246, 0.97)" : "rgba(250, 249, 246, 0.9)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: scrolled ? "1px solid var(--color-border)" : "1px solid transparent",
          boxShadow: scrolled ? "0 1px 8px rgba(43, 46, 42, 0.04)" : "none",
          transition: "all 0.3s ease",
        }}
      >
        <div style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 20px",
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
              minHeight: 44,
            }}
            aria-label="SmallBiz Recon — Home"
          >
            <img
              src="/smallbizrecon_logo_transparent.png"
              alt=""
              width={34}
              height={34}
              style={{ width: 34, height: 34 }}
              loading="eager"
            />
            <span
              className="sbr-logo-text"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 19,
                color: "var(--color-brand-green)",
                fontWeight: 400,
                letterSpacing: "-0.01em",
              }}
            >
              SmallBiz Recon
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav
            aria-label="Primary navigation"
            className="sbr-desktop-nav"
            style={{ alignItems: "center", gap: 2 }}
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="sbr-nav-link"
                aria-current={isActive(link.to) ? "page" : undefined}
                style={{
                  padding: "8px 16px",
                  fontSize: 14,
                  fontWeight: 500,
                  color: isActive(link.to) ? "var(--color-brand-green)" : "var(--color-text-secondary)",
                  textDecoration: "none",
                  borderRadius: 8,
                  minHeight: 44,
                  display: "inline-flex",
                  alignItems: "center",
                  letterSpacing: "0.01em",
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <Link
            to="/consultation"
            className="sbr-desktop-cta sbr-btn-primary"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "9px 20px",
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 600,
              textDecoration: "none",
              letterSpacing: "0.01em",
              minHeight: 40,
              color: "#FAF9F6",
            }}
          >
            Free Consultation
            <ArrowRight size={14} aria-hidden="true" />
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="sbr-mobile-toggle"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            style={{
              width: 44,
              height: 44,
              borderRadius: 8,
              border: "1px solid var(--color-border)",
              background: "white",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "var(--color-brand-green)",
              flexShrink: 0,
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
            background: "rgba(43, 46, 42, 0.2)",
            backdropFilter: "blur(4px)",
          }}
          onClick={closeMobile}
        />
      )}

      {/* Mobile menu */}
      <nav
        role="navigation"
        aria-label="Mobile navigation"
        aria-hidden={!mobileOpen}
        className="sbr-mobile-menu"
        style={{
          position: "fixed",
          top: HEADER_HEIGHT,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 999,
          background: "var(--color-bg)",
          overflowY: "auto",
          WebkitOverflowScrolling: "touch",
          opacity: mobileOpen ? 1 : 0,
          transform: mobileOpen ? "translateY(0)" : "translateY(-8px)",
          pointerEvents: mobileOpen ? "auto" : "none",
          transition: "opacity 0.25s ease, transform 0.25s ease",
        }}
      >
        <div style={{ padding: "12px 20px 40px" }}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={closeMobile}
              tabIndex={mobileOpen ? 0 : -1}
              aria-current={isActive(link.to) ? "page" : undefined}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "16px 8px",
                fontSize: 16,
                fontWeight: 500,
                color: isActive(link.to) ? "var(--color-brand-green)" : "var(--color-text)",
                textDecoration: "none",
                borderBottom: "1px solid var(--color-border-light)",
                minHeight: 52,
                letterSpacing: "0.01em",
              }}
            >
              {link.label}
            </Link>
          ))}

          <Link
            to="/consultation"
            onClick={closeMobile}
            tabIndex={mobileOpen ? 0 : -1}
            className="sbr-btn-primary"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              marginTop: 24,
              padding: "16px 24px",
              borderRadius: 10,
              color: "#FAF9F6",
              fontSize: 16,
              fontWeight: 600,
              textDecoration: "none",
              textAlign: "center",
              minHeight: 52,
            }}
          >
            Free Consultation
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </nav>
    </>
  );
}
