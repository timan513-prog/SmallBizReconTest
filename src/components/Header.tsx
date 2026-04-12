import { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

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
        /* Desktop nav + CTA */
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
          background: scrolled ? "rgba(250, 249, 246, 0.97)" : "rgba(250, 249, 246, 0.85)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: scrolled ? "1px solid #E2E0DA" : "1px solid transparent",
          transition: "background 0.3s ease, border-color 0.3s ease",
        }}
      >
        <div style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 16px",
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
              width={36}
              height={36}
              style={{ width: 36, height: 36 }}
              loading="eager"
            />
            <span
              className="sbr-logo-text"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 19,
                color: "var(--color-brand-green)",
                fontWeight: 400,
              }}
            >
              SmallBiz Recon
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav
            aria-label="Primary navigation"
            className="sbr-desktop-nav"
            style={{ alignItems: "center", gap: 4 }}
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
                  color: isActive(link.to) ? "var(--color-brand-green)" : "var(--color-text-secondary)",
                  textDecoration: "none",
                  borderRadius: 8,
                  background: isActive(link.to) ? "rgba(59, 74, 44, 0.06)" : "transparent",
                  minHeight: 44,
                  display: "inline-flex",
                  alignItems: "center",
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <Link
            to="/consultation"
            className="sbr-desktop-cta"
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "10px 22px",
              borderRadius: 8,
              background: "var(--color-brand-green)",
              color: "#FAF9F6",
              fontSize: 14,
              fontWeight: 600,
              textDecoration: "none",
              letterSpacing: "0.01em",
              minHeight: 44,
            }}
          >
            Free Consultation
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
            background: "rgba(0,0,0,0.25)",
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
          transition: "opacity 0.2s ease, transform 0.2s ease",
        }}
      >
        <div style={{ padding: "20px 20px 40px" }}>
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
                padding: "16px 4px",
                fontSize: 17,
                fontWeight: 500,
                color: isActive(link.to) ? "var(--color-brand-green)" : "var(--color-text-secondary)",
                textDecoration: "none",
                borderBottom: "1px solid var(--color-border-light)",
                minHeight: 52,
              }}
            >
              {link.label}
            </Link>
          ))}

          <Link
            to="/consultation"
            onClick={closeMobile}
            tabIndex={mobileOpen ? 0 : -1}
            style={{
              display: "block",
              marginTop: 24,
              padding: "16px 24px",
              borderRadius: 10,
              background: "var(--color-brand-green)",
              color: "#FAF9F6",
              fontSize: 16,
              fontWeight: 600,
              textDecoration: "none",
              textAlign: "center",
              minHeight: 52,
            }}
          >
            Free Consultation
          </Link>
        </div>
      </nav>
    </>
  );
}
