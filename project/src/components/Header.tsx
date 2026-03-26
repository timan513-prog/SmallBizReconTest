import React, { useEffect, useState, useRef, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Wrench, BookOpen, FileText, Phone, Database, Shield, Newspaper, MessageSquare, CircleHelp as HelpCircle, Send, ArrowRight, TrendingUp, Users, ClipboardCheck } from "lucide-react";
import UserSubscriptionStatus from "./UserSubscriptionStatus";
import { useLanguage } from "../i18n/LanguageContext";
import { useAuth } from "../contexts/AuthContext";
import AuthModal from "./intel-board/AuthModal";

interface HeaderProps {}

interface NavLink {
  to: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
}

function buildToolkitsLinks(t: (k: string) => string): NavLink[] {
  return [
    { to: "/toolkits/sba-101-quick-guide", title: t("nav_smb101"), desc: t("nav_smb101_desc"), icon: <BookOpen className="w-4 h-4" /> },
    { to: "/covid-eidl-toolkits", title: t("nav_eidl"), desc: t("nav_eidl_desc"), icon: <Wrench className="w-4 h-4" /> },
    { to: "/dispute-recall-service", title: t("nav_dispute"), desc: t("nav_dispute_desc"), icon: <FileText className="w-4 h-4" /> },
    { to: "/sba-7a", title: t("nav_7a"), desc: t("nav_7a_desc"), icon: <Shield className="w-4 h-4" /> },
    { to: "/sba-504", title: t("nav_504"), desc: t("nav_504_desc"), icon: <Database className="w-4 h-4" /> },
    { to: "/ppp", title: t("nav_doc_packaging"), desc: t("nav_doc_packaging_desc"), icon: <Send className="w-4 h-4" /> },
  ];
}

function buildResourcesLinks(t: (k: string) => string): NavLink[] {
  return [
    { to: "/resources/command-center", title: t("nav_command_center"), desc: t("nav_command_center_desc"), icon: <Database className="w-4 h-4" /> },
    { to: "/sba-forms", title: t("nav_sba_forms"), desc: t("nav_sba_forms_desc"), icon: <FileText className="w-4 h-4" /> },
    { to: "/sba-resources/help-packets", title: t("nav_free_guides"), desc: t("nav_free_guides_desc"), icon: <BookOpen className="w-4 h-4" /> },
    { to: "/business-plan-generator", title: t("nav_biz_plan"), desc: t("nav_biz_plan_desc"), icon: <FileText className="w-4 h-4" /> },
    { to: "/sba/sba-contacts", title: t("nav_contacts"), desc: t("nav_contacts_desc"), icon: <Phone className="w-4 h-4" /> },
    { to: "/resources/SOSDatabase", title: t("nav_ucc"), desc: t("nav_ucc_desc"), icon: <Database className="w-4 h-4" /> },
    { to: "/sba/resources/quick-intro-guide", title: t("nav_premium_guide"), desc: t("nav_premium_guide_desc"), icon: <BookOpen className="w-4 h-4" /> },
    { to: "/sba-compliance", title: t("nav_compliance"), desc: t("nav_compliance_desc"), icon: <Shield className="w-4 h-4" /> },
  ];
}

function buildCommunityLinks(t: (k: string) => string): NavLink[] {
  return [
    { to: "/community/news-updates", title: t("nav_news"), desc: t("nav_news_desc"), icon: <Newspaper className="w-4 h-4" /> },
    { to: "/community/newsletter", title: t("nav_newsletter"), desc: t("nav_newsletter_desc"), icon: <TrendingUp className="w-4 h-4" /> },
    { to: "/case-evaluator", title: t("nav_case_eval"), desc: t("nav_case_eval_desc"), icon: <ClipboardCheck className="w-4 h-4" /> },
    { to: "/financial-counseling-resources", title: t("nav_counseling"), desc: t("nav_counseling_desc"), icon: <Users className="w-4 h-4" /> },
    { to: "/community", title: t("nav_message_board"), desc: t("nav_message_board_desc"), icon: <MessageSquare className="w-4 h-4" /> },
    { to: "/sabbi-faq", title: t("nav_faq"), desc: t("nav_faq_desc"), icon: <HelpCircle className="w-4 h-4" /> },
  ];
}

interface DropdownProps {
  label: string;
  links: NavLink[];
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  closeAll: () => void;
}

const DesktopDropdown: React.FC<DropdownProps> = ({ label, links, isOpen, onOpen, onClose, closeAll }) => {
  const timeout = useRef<ReturnType<typeof setTimeout>>();
  const menuRef = useRef<HTMLDivElement>(null);
  const handleEnter = () => { clearTimeout(timeout.current); onOpen(); };
  const handleLeave = () => { timeout.current = setTimeout(onClose, 120); };
  useEffect(() => () => clearTimeout(timeout.current), []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (isOpen) { onClose(); } else { onOpen(); }
    }
    if (e.key === "Escape" && isOpen) {
      e.preventDefault();
      onClose();
    }
    if (e.key === "ArrowDown" && isOpen) {
      e.preventDefault();
      const firstItem = menuRef.current?.querySelector<HTMLElement>('[role="menuitem"]');
      firstItem?.focus();
    }
  };

  const handleMenuKeyDown = (e: React.KeyboardEvent) => {
    const items = Array.from(menuRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]') || []);
    const idx = items.indexOf(e.target as HTMLElement);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      items[(idx + 1) % items.length]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      items[(idx - 1 + items.length) % items.length]?.focus();
    } else if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    }
  };

  const menuId = `dropdown-${label.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div className="relative" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <button
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-controls={menuId}
        onKeyDown={handleKeyDown}
        className={[
          "flex items-center gap-1.5 px-3.5 py-2 text-[13px] font-medium tracking-wide transition-all duration-200",
          isOpen ? "text-[#cda349]" : "text-[rgba(232,237,226,0.7)] hover:text-[rgba(232,237,226,0.9)]",
        ].join(" ")}
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {label}
        <ChevronDown aria-hidden="true" className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <div
        className={[
          "absolute left-1/2 -translate-x-1/2 top-full pt-3 z-50 transition-all duration-200",
          isOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none",
        ].join(" ")}
      >
        <div
          ref={menuRef}
          id={menuId}
          role="menu"
          aria-label={`${label} submenu`}
          onKeyDown={handleMenuKeyDown}
          style={{
            minWidth: 340,
            borderRadius: 20,
            background: "rgba(6,6,8,0.96)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(200,168,78,0.08)",
            boxShadow: "0 24px 80px -12px rgba(0,0,0,0.7), 0 0 0 1px rgba(200,168,78,0.04)",
          }}
        >
          <div aria-hidden="true" style={{
            height: 1,
            borderRadius: "20px 20px 0 0",
            background: "linear-gradient(90deg, transparent, rgba(200,168,78,0.15), transparent)",
          }} />

          <div style={{ padding: 6 }}>
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="group"
                role="menuitem"
                tabIndex={isOpen ? 0 : -1}
                onClick={closeAll}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "12px 14px",
                  borderRadius: 14,
                  textDecoration: "none",
                  transition: "background 0.15s ease",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(200,168,78,0.05)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
              >
                <div aria-hidden="true" style={{
                  width: 34,
                  height: 34,
                  borderRadius: 10,
                  background: "rgba(200,168,78,0.05)",
                  border: "1px solid rgba(200,168,78,0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "rgba(232,237,226,0.3)",
                  flexShrink: 0,
                  transition: "all 0.2s ease",
                }}>
                  {link.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: "rgba(232,237,226,0.85)",
                    fontFamily: "'DM Sans', sans-serif",
                    transition: "color 0.15s ease",
                  }}>
                    {link.title}
                  </div>
                  <div style={{
                    fontSize: 11,
                    color: "rgba(232,237,226,0.4)",
                    fontFamily: "'DM Sans', sans-serif",
                  }}>
                    {link.desc}
                  </div>
                </div>
                <ArrowRight aria-hidden="true" size={13} style={{ color: "rgba(232,237,226,0)", transition: "color 0.2s ease" }} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const HEADER_HEIGHT = 64;

const Header: React.FC<HeaderProps> = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState<string | null>(null);
  const [openDesktopDropdown, setOpenDesktopDropdown] = useState<string | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [accountPopupOpen, setAccountPopupOpen] = useState(false);
  const accountPopupRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const { lang, setLang, t } = useLanguage();
  const { isAuthenticated: isAuthed, signOut } = useAuth();

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setAccountPopupOpen((prev) => !prev);
  };

  useEffect(() => {
    if (!accountPopupOpen) return;
    const handleOutside = (e: MouseEvent) => {
      if (accountPopupRef.current && !accountPopupRef.current.contains(e.target as Node)) {
        setAccountPopupOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [accountPopupOpen]);

  const toolkitsLinks = buildToolkitsLinks(t);
  const resourcesLinks = buildResourcesLinks(t);
  const communityLinks = buildCommunityLinks(t);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveMobileDropdown(null);
    setOpenDesktopDropdown(null);
  }, [location]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
        setActiveMobileDropdown(null);
      }
    };
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  const closeAll = useCallback(() => {
    setOpenDesktopDropdown(null);
    setIsMobileMenuOpen(false);
    setActiveMobileDropdown(null);
  }, []);

  const toggleMobileDropdown = (dropdown: string) => {
    setActiveMobileDropdown(activeMobileDropdown === dropdown ? null : dropdown);
  };

  const isActiveRoute = (path: string) => location.pathname === path;

  const navItemStyle = (active: boolean): React.CSSProperties => ({
    position: "relative",
    padding: "8px 14px",
    fontSize: 13,
    fontWeight: 500,
    fontFamily: "'DM Sans', sans-serif",
    letterSpacing: "0.02em",
    color: active ? "#cda349" : "rgba(232,237,226,0.7)",
    textDecoration: "none",
    transition: "color 0.2s ease",
    display: "inline-flex",
    alignItems: "center",
  });

  return (
    <>
      {/* ── Fixed Header ── */}
      <header role="banner" style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        background: "#060608",
        borderBottom: "1px solid rgba(200,168,78,0.06)",
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 16px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: HEADER_HEIGHT }}>
            {/* Logo + account popup */}
            <div ref={accountPopupRef} style={{ position: "relative", flexShrink: 0 }}>
              <button
                onClick={handleLogoClick}
                aria-label="Account menu"
                aria-expanded={accountPopupOpen}
                aria-haspopup="true"
                style={{
                  display: "flex", alignItems: "center", background: "none",
                  border: "none", cursor: "pointer", padding: 0,
                }}
              >
                <img
                  src="/smallbizrecon_logo_transparent.png"
                  alt="SmallBiz Recon™"
                  width={44}
                  height={44}
                  style={{ height: 44, width: 44, transition: "transform 0.3s ease" }}
                  loading="eager"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = window.location.origin + '/smallbizrecon_logo_transparent.png';
                  }}
                />
              </button>

              {/* Account popup */}
              <div
                role="menu"
                aria-label="Account options"
                style={{
                  position: "absolute",
                  top: "calc(100% + 10px)",
                  left: 0,
                  zIndex: 10000,
                  minWidth: 180,
                  borderRadius: 16,
                  background: "rgba(6,6,8,0.97)",
                  backdropFilter: "blur(24px)",
                  WebkitBackdropFilter: "blur(24px)",
                  border: "1px solid rgba(200,168,78,0.12)",
                  boxShadow: "0 20px 60px -8px rgba(0,0,0,0.7)",
                  padding: 6,
                  opacity: accountPopupOpen ? 1 : 0,
                  transform: accountPopupOpen ? "translateY(0)" : "translateY(-6px)",
                  pointerEvents: accountPopupOpen ? "auto" : "none",
                  transition: "opacity 0.18s ease, transform 0.18s ease",
                }}
              >
                <div style={{
                  height: 1,
                  borderRadius: "10px 10px 0 0",
                  background: "linear-gradient(90deg, transparent, rgba(200,168,78,0.2), transparent)",
                  marginBottom: 4,
                }} />

                {isAuthed ? (
                  <button
                    role="menuitem"
                    onClick={() => { setAccountPopupOpen(false); signOut(); }}
                    style={{
                      display: "flex", alignItems: "center", gap: 10,
                      width: "100%", padding: "11px 14px", borderRadius: 10,
                      background: "none", border: "none", cursor: "pointer",
                      fontSize: 13, fontWeight: 500, fontFamily: "'DM Sans', sans-serif",
                      color: "rgba(232,237,226,0.8)", textAlign: "left",
                      transition: "background 0.15s ease",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(200,168,78,0.07)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "none"; }}
                  >
                    Sign Out
                  </button>
                ) : (
                  <button
                    role="menuitem"
                    onClick={() => { setAccountPopupOpen(false); setAuthModalOpen(true); }}
                    style={{
                      display: "flex", alignItems: "center", gap: 10,
                      width: "100%", padding: "11px 14px", borderRadius: 10,
                      background: "none", border: "none", cursor: "pointer",
                      fontSize: 13, fontWeight: 500, fontFamily: "'DM Sans', sans-serif",
                      color: "rgba(232,237,226,0.8)", textAlign: "left",
                      transition: "background 0.15s ease",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(200,168,78,0.07)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "none"; }}
                  >
                    Sign In
                  </button>
                )}
              </div>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center" aria-label="Primary navigation">
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                padding: "4px 6px",
                borderRadius: 100,
                background: "rgba(200,168,78,0.03)",
                border: "1px solid rgba(200,168,78,0.06)",
              }}>
                <Link to="/home" style={navItemStyle(isActiveRoute("/home"))}
                  aria-current={isActiveRoute("/home") ? "page" : undefined}
                  onMouseEnter={(e) => { if (!isActiveRoute("/home")) e.currentTarget.style.color = "rgba(232,237,226,0.9)"; }}
                  onMouseLeave={(e) => { if (!isActiveRoute("/home")) e.currentTarget.style.color = "rgba(232,237,226,0.7)"; }}
                >
                  {t("nav_home")}
                  {isActiveRoute("/home") && (
                    <span style={{
                      position: "absolute",
                      bottom: 2,
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: 16,
                      height: 2,
                      borderRadius: 2,
                      background: "#cda349",
                    }} />
                  )}
                </Link>

                <DesktopDropdown
                  label={t("nav_toolkits")}
                  links={toolkitsLinks}
                  isOpen={openDesktopDropdown === "toolkits"}
                  onOpen={() => setOpenDesktopDropdown("toolkits")}
                  onClose={() => setOpenDesktopDropdown(null)}
                  closeAll={closeAll}
                />
                <DesktopDropdown
                  label={t("nav_resources")}
                  links={resourcesLinks}
                  isOpen={openDesktopDropdown === "resources"}
                  onOpen={() => setOpenDesktopDropdown("resources")}
                  onClose={() => setOpenDesktopDropdown(null)}
                  closeAll={closeAll}
                />
                <DesktopDropdown
                  label={t("nav_community")}
                  links={communityLinks}
                  isOpen={openDesktopDropdown === "community"}
                  onOpen={() => setOpenDesktopDropdown("community")}
                  onClose={() => setOpenDesktopDropdown(null)}
                  closeAll={closeAll}
                />

                <Link to="/contact" style={navItemStyle(isActiveRoute("/contact"))}
                  aria-current={isActiveRoute("/contact") ? "page" : undefined}
                  onMouseEnter={(e) => { if (!isActiveRoute("/contact")) e.currentTarget.style.color = "rgba(232,237,226,0.9)"; }}
                  onMouseLeave={(e) => { if (!isActiveRoute("/contact")) e.currentTarget.style.color = "rgba(232,237,226,0.7)"; }}
                >
                  {t("nav_contact")}
                  {isActiveRoute("/contact") && (
                    <span style={{
                      position: "absolute",
                      bottom: 2,
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: 16,
                      height: 2,
                      borderRadius: 2,
                      background: "#cda349",
                    }} />
                  )}
                </Link>
              </div>
            </nav>

            {/* Right controls */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div className="hidden lg:block">
                <UserSubscriptionStatus />
              </div>

              {/* Language toggle */}
              <button
                onClick={() => setLang(lang === "en" ? "es" : "en")}
                aria-label={lang === "en" ? "Switch to Spanish" : "Cambiar a inglés"}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  padding: "6px 12px",
                  borderRadius: 10,
                  background: "rgba(200,168,78,0.04)",
                  border: "1px solid rgba(200,168,78,0.12)",
                  color: "rgba(232,237,226,0.6)",
                  fontSize: 12,
                  fontWeight: 600,
                  fontFamily: "'DM Sans', sans-serif",
                  cursor: "pointer",
                  letterSpacing: "0.04em",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#cda349";
                  e.currentTarget.style.borderColor = "rgba(200,168,78,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "rgba(232,237,226,0.6)";
                  e.currentTarget.style.borderColor = "rgba(200,168,78,0.12)";
                }}
              >
                <span style={{ fontSize: 14 }}>{lang === "en" ? "🇪🇸" : "🇺🇸"}</span>
                {lang === "en" ? "ES" : "EN"}
              </button>

              {/* CTA */}
              <Link
                to="/covid-eidl-toolkits"
                className="hidden lg:inline-flex"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "9px 22px",
                  borderRadius: 12,
                  background: "linear-gradient(135deg, rgba(200,168,78,0.25), rgba(200,168,78,0.08))",
                  border: "1px solid rgba(200,168,78,0.3)",
                  color: "#eaf0e4",
                  fontSize: 13,
                  fontWeight: 600,
                  fontFamily: "'DM Sans', sans-serif",
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                  boxShadow: "0 0 16px rgba(200,168,78,0.04)",
                }}
              >
                {t("nav_get_started")}
                <ArrowRight size={14} />
              </Link>

              {/* Mobile hamburger */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  background: "rgba(200,168,78,0.04)",
                  border: "1px solid rgba(200,168,78,0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  position: "relative",
                }}
                aria-label="Toggle menu"
                aria-expanded={isMobileMenuOpen}
              >
                <div style={{ position: "relative", width: 18, height: 14 }}>
                  <span style={{
                    position: "absolute",
                    left: 0,
                    width: 18,
                    height: 1.5,
                    borderRadius: 2,
                    background: "rgba(232,237,226,0.6)",
                    transition: "all 0.3s ease",
                    top: isMobileMenuOpen ? 6 : 0,
                    transform: isMobileMenuOpen ? "rotate(45deg)" : "none",
                  }} />
                  <span style={{
                    position: "absolute",
                    left: 0,
                    bottom: isMobileMenuOpen ? 6 : 0,
                    width: 18,
                    height: 1.5,
                    borderRadius: 2,
                    background: "rgba(232,237,226,0.6)",
                    transition: "all 0.3s ease",
                    transform: isMobileMenuOpen ? "rotate(-45deg)" : "none",
                  }} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Mobile backdrop ── */}
      {isMobileMenuOpen && (
        <div
          aria-hidden="true"
          style={{ position: "fixed", inset: 0, zIndex: 9998, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* ── Mobile menu ── */}
      <nav
        className="lg:hidden"
        role="navigation"
        aria-label="Mobile navigation"
        aria-hidden={!isMobileMenuOpen}
        onKeyDown={(e) => { if (e.key === "Escape") setIsMobileMenuOpen(false); }}
        style={{
          position: "fixed",
          top: HEADER_HEIGHT,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 9998,
          opacity: isMobileMenuOpen ? 1 : 0,
          pointerEvents: isMobileMenuOpen ? "auto" : "none",
          transition: "opacity 0.3s ease",
        }}
      >
        <div style={{
          background: "#060608",
          height: "100%",
          overflowY: "auto",
          transform: isMobileMenuOpen ? "translateY(0)" : "translateY(-8px)",
          transition: "transform 0.3s ease",
        }}>
          <div style={{ maxWidth: 480, margin: "0 auto", padding: "24px 20px" }}>
            <Link
              to="/home"
              onClick={closeAll}
              aria-current={isActiveRoute("/home") ? "page" : undefined}
              style={{
                display: "block",
                padding: "14px 16px",
                borderRadius: 14,
                fontSize: 15,
                fontWeight: 500,
                color: isActiveRoute("/home") ? "#cda349" : "rgba(232,237,226,0.75)",
                textDecoration: "none",
                fontFamily: "'DM Sans', sans-serif",
                background: isActiveRoute("/home") ? "rgba(200,168,78,0.06)" : "transparent",
                transition: "all 0.2s ease",
              }}
            >
              {t("nav_home")}
            </Link>

            <MobileDropdownSection label={t("nav_toolkits")} links={toolkitsLinks} isOpen={activeMobileDropdown === "toolkits"} onToggle={() => toggleMobileDropdown("toolkits")} closeAll={closeAll} />
            <MobileDropdownSection label={t("nav_resources")} links={resourcesLinks} isOpen={activeMobileDropdown === "resources"} onToggle={() => toggleMobileDropdown("resources")} closeAll={closeAll} />
            <MobileDropdownSection label={t("nav_community")} links={communityLinks} isOpen={activeMobileDropdown === "community"} onToggle={() => toggleMobileDropdown("community")} closeAll={closeAll} />

            <Link
              to="/contact"
              onClick={closeAll}
              aria-current={isActiveRoute("/contact") ? "page" : undefined}
              style={{
                display: "block",
                padding: "14px 16px",
                borderRadius: 14,
                fontSize: 15,
                fontWeight: 500,
                color: isActiveRoute("/contact") ? "#cda349" : "rgba(232,237,226,0.75)",
                textDecoration: "none",
                fontFamily: "'DM Sans', sans-serif",
                background: isActiveRoute("/contact") ? "rgba(200,168,78,0.06)" : "transparent",
              }}
            >
              {t("nav_contact")}
            </Link>

            {/* Divider + extras */}
            <div style={{ marginTop: 20, paddingTop: 20, borderTop: "1px solid rgba(200,168,78,0.06)" }}>
              <div style={{ padding: "0 8px", marginTop: 8 }}>
                <UserSubscriptionStatus />
              </div>

              <button
                onClick={() => setLang(lang === "en" ? "es" : "en")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  width: "calc(100% - 16px)",
                  margin: "8px 8px 0",
                  padding: "12px 16px",
                  borderRadius: 12,
                  background: "rgba(200,168,78,0.04)",
                  border: "1px solid rgba(200,168,78,0.12)",
                  color: "rgba(232,237,226,0.6)",
                  fontSize: 14,
                  fontWeight: 600,
                  fontFamily: "'DM Sans', sans-serif",
                  cursor: "pointer",
                }}
              >
                <span style={{ fontSize: 16 }}>{lang === "en" ? "🇪🇸" : "🇺🇸"}</span>
                {lang === "en" ? "Ver en Español" : "View in English"}
              </button>

              <Link
                to="/covid-eidl-toolkits"
                onClick={closeAll}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  margin: "12px 8px 0",
                  padding: "14px 20px",
                  borderRadius: 14,
                  background: "linear-gradient(135deg, rgba(200,168,78,0.25), rgba(200,168,78,0.08))",
                  border: "1px solid rgba(200,168,78,0.3)",
                  color: "#eaf0e4",
                  fontSize: 15,
                  fontWeight: 600,
                  fontFamily: "'DM Sans', sans-serif",
                  textDecoration: "none",
                }}
              >
                {t("nav_get_started")}
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <AuthModal open={authModalOpen} onClose={() => setAuthModalOpen(false)} defaultTab="login" />
    </>
  );
};

/* ── Mobile dropdown section ── */
interface MobileDropdownSectionProps {
  label: string;
  links: NavLink[];
  isOpen: boolean;
  onToggle: () => void;
  closeAll: () => void;
}

const MobileDropdownSection: React.FC<MobileDropdownSectionProps> = ({ label, links, isOpen, onToggle, closeAll }) => (
  <div>
    <button
      onClick={onToggle}
      aria-expanded={isOpen}
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "14px 16px",
        borderRadius: 14,
        fontSize: 15,
        fontWeight: 500,
        color: "rgba(232,237,226,0.75)",
        background: "transparent",
        border: "none",
        fontFamily: "'DM Sans', sans-serif",
        cursor: "pointer",
        transition: "all 0.2s ease",
      }}
    >
      {label}
      <ChevronDown aria-hidden="true" size={16} style={{
        transition: "transform 0.2s ease",
        transform: isOpen ? "rotate(180deg)" : "rotate(0)",
      }} />
    </button>
    <div
      role="region"
      aria-hidden={!isOpen}
      style={{
        overflow: "hidden",
        maxHeight: isOpen ? 800 : 0,
        opacity: isOpen ? 1 : 0,
        transition: "all 0.3s ease",
      }}
    >
      <div style={{ paddingLeft: 8, paddingRight: 4, paddingTop: 4, paddingBottom: 4 }}>
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            onClick={closeAll}
            tabIndex={isOpen ? 0 : -1}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "12px 16px",
              borderRadius: 12,
              textDecoration: "none",
              transition: "background 0.15s ease",
            }}
          >
            <span aria-hidden="true" style={{ color: "rgba(232,237,226,0.35)" }}>{link.icon}</span>
            <div>
              <div style={{ fontSize: 14, fontWeight: 500, color: "rgba(232,237,226,0.7)", fontFamily: "'DM Sans', sans-serif" }}>
                {link.title}
              </div>
              <div style={{ fontSize: 11, color: "rgba(232,237,226,0.4)", fontFamily: "'DM Sans', sans-serif", marginTop: 2 }}>
                {link.desc}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </div>
);

export default Header;