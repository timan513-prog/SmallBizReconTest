import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, MapPin, ArrowUp, Shield, ExternalLink } from "lucide-react";

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const YoutubeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.54C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
    <polygon fill="#060608" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
  </svg>
);

const XIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const TikTokIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
  </svg>
);

type FooterProps = {
  setShowCookieConsent: (show: boolean) => void;
};

const Footer: React.FC<FooterProps> = ({ setShowCookieConsent }) => {
  const [emailHovered, setEmailHovered] = useState(false);

  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const linkStyle: React.CSSProperties = {
    display: "block",
    fontSize: 14,
    color: "#9aaa8e",
    textDecoration: "none",
    fontFamily: "var(--font-body)",
    transition: "color 0.3s ease, padding-left 0.3s ease",
    paddingLeft: 0,
    lineHeight: 1.6,
  };

  const linkHoverHandlers = {
    onMouseEnter: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
      (e.currentTarget as HTMLElement).style.color = "#cda349";
      (e.currentTarget as HTMLElement).style.paddingLeft = "4px";
    },
    onMouseLeave: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
      (e.currentTarget as HTMLElement).style.color = "#8a9480";
      (e.currentTarget as HTMLElement).style.paddingLeft = "0px";
    },
  };

  const headingStyle: React.CSSProperties = {
    fontFamily: "var(--font-display)",
    fontSize: 18,
    fontWeight: 400,
    color: "#cda349",
    marginBottom: 20,
    letterSpacing: "-0.01em",
  };

  return (
    <>
      <style>{`
        :root {
          --font-display: 'Instrument Serif', Georgia, serif;
          --font-body: 'DM Sans', sans-serif;
        }
        @keyframes footerShimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>

      <footer style={{
        position: "relative",
        overflow: "hidden",
        background: "#060608",
        color: "#9aaa8e",
        fontFamily: "var(--font-body)",
      }}>
        {/* ── Top gold shimmer border ── */}
        <div aria-hidden="true" style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          overflow: "hidden",
        }}>
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 1,
            background: "linear-gradient(90deg, transparent 0%, rgba(200,168,78,0.15) 20%, rgba(200,168,78,0.3) 50%, rgba(200,168,78,0.15) 80%, transparent 100%)",
          }} />
          <div style={{
            width: "30%",
            height: "100%",
            background: "linear-gradient(90deg, transparent, rgba(200,168,78,0.5), transparent)",
            animation: "footerShimmer 6s ease-in-out infinite",
          }} />
        </div>

        {/* ── Subtle grid ── */}
        <div aria-hidden="true" style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          opacity: 0.015,
        }}>
          <svg width="100%" height="100%" role="presentation">
            <defs>
              <pattern id="footerGrid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#cda349" strokeWidth="0.3" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#footerGrid)" />
          </svg>
        </div>

        {/* ── Ambient corner glows ── */}
        <div aria-hidden="true" style={{
          position: "absolute",
          top: -80,
          left: -80,
          width: 240,
          height: 240,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(200,168,78,0.03), transparent 60%)",
          pointerEvents: "none",
        }} />
        <div aria-hidden="true" style={{
          position: "absolute",
          bottom: -60,
          right: -60,
          width: 200,
          height: 200,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(75,83,32,0.03), transparent 60%)",
          pointerEvents: "none",
        }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          {/* ── Back to top ── */}
          <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: 32, marginBottom: 40 }}>
            <button
              type="button"
              onClick={backToTop}
              aria-label="Back to top"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                background: "rgba(200,168,78,0.06)",
                border: "1px solid rgba(200,168,78,0.12)",
                borderRadius: 10,
                padding: "8px 16px",
                color: "#8a9a7e",
                fontSize: 12,
                fontWeight: 600,
                fontFamily: "var(--font-body)",
                cursor: "pointer",
                transition: "all 0.3s ease",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#cda349";
                e.currentTarget.style.borderColor = "rgba(200,168,78,0.3)";
                e.currentTarget.style.background = "rgba(200,168,78,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#6a7a5e";
                e.currentTarget.style.borderColor = "rgba(200,168,78,0.12)";
                e.currentTarget.style.background = "rgba(200,168,78,0.06)";
              }}
            >
              <ArrowUp size={14} />
              Top
            </button>
          </div>

          {/* ── Main 4-column grid ── */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 40,
            marginBottom: 48,
          }}
            className="footer-grid"
          >
            {/* Column 1 — Brand */}
            <div style={{ maxWidth: 280 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <img
                  src="/smallbizrecon_logo_transparent.png"
                  alt="SmallBiz Recon logo"
                  width={40}
                  height={40}
                  style={{ height: 40, width: 40 }}
                  loading="lazy"
                  decoding="async"
                />
                <span style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 20,
                  fontWeight: 400,
                  color: "#cda349",
                  fontStyle: "italic",
                }}>
                  SmallBiz Recon™
                </span>
              </div>

              <p style={{
                fontSize: 13,
                color: "#8a9a7e",
                lineHeight: 1.7,
                fontFamily: "var(--font-body)",
                marginBottom: 20,
                maxWidth: 260,
              }}>
                SBA-focused educational resources, forms, and strategic guidance
                from professionals with firsthand experience.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <a
                  href="mailto:info@smallbizrecon.com"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    fontSize: 13,
                    color: "#8a9a7e",
                    textDecoration: "none",
                    fontFamily: "var(--font-body)",
                    transition: "color 0.3s ease",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "#cda349"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "#6a7a5e"; }}
                >
                  <Mail size={14} style={{ color: "#cda349", flexShrink: 0 }} />
                  SmallBiz Recon™
                </a>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: 13,
                  color: "#8a9a7e",
                  fontFamily: "var(--font-body)",
                }}>
                  <MapPin size={14} style={{ color: "#cda349", flexShrink: 0 }} />
                  Orlando, FL
                </div>
              </div>

              <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
                {[
                  { href: "https://www.facebook.com/share/g/1AggYByNHk/", label: "Facebook", Icon: FacebookIcon },
                  { href: "https://www.youtube.com/@SmallBizRecon", label: "YouTube", Icon: YoutubeIcon },
                  { href: "https://x.com/SmallBizRecon?s=20", label: "X (Twitter)", Icon: XIcon },
                  { href: "https://www.tiktok.com/@smallbiz.recon?is_from_webapp=1&sender_device=pc", label: "TikTok", Icon: TikTokIcon },
                ].map(({ href, label, Icon }) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      background: "rgba(200,168,78,0.06)",
                      border: "1px solid rgba(200,168,78,0.12)",
                      color: "#8a9a7e",
                      transition: "all 0.3s ease",
                      textDecoration: "none",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#cda349";
                      e.currentTarget.style.borderColor = "rgba(200,168,78,0.35)";
                      e.currentTarget.style.background = "rgba(200,168,78,0.12)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "#8a9a7e";
                      e.currentTarget.style.borderColor = "rgba(200,168,78,0.12)";
                      e.currentTarget.style.background = "rgba(200,168,78,0.06)";
                    }}
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </div>

            {/* Column 2 — Resources */}
            <div>
              <h3 style={headingStyle}>Resources</h3>
              <nav style={{ display: "flex", flexDirection: "column", gap: 10 }} aria-label="Footer resources">
                <Link to="/sba-forms" style={linkStyle} {...linkHoverHandlers}>SBA Forms (Official)</Link>
                <Link to="/sba/sba-contacts" style={linkStyle} {...linkHoverHandlers}>SBA Contacts (Official)</Link>
                <Link to="/ppp" style={linkStyle} {...linkHoverHandlers}>SBA Document Packaging</Link>
                <Link to="/contact" style={linkStyle} {...linkHoverHandlers}>Contact Us</Link>
              </nav>
            </div>

            {/* Column 3 — Quick Links */}
            <div>
              <h3 style={headingStyle}>Quick Links</h3>
              <nav style={{ display: "flex", flexDirection: "column", gap: 10 }} aria-label="Footer quick links">
                <Link to="/resources/SOSDatabase" style={linkStyle} {...linkHoverHandlers}>SOS Database</Link>
                <Link to="/community/news-updates" style={linkStyle} {...linkHoverHandlers}>SBA News & Updates</Link>
                <Link to="/sba-resources/help-packets" style={linkStyle} {...linkHoverHandlers}>SBA Help Guides</Link>
                <Link to="/sabbi-faq" style={linkStyle} {...linkHoverHandlers}>Sabbi's FAQ</Link>
              </nav>
            </div>

            {/* Column 4 — Newsletter */}
            <div>
              <h3 style={headingStyle}>Stay Updated</h3>

              <p style={{
                fontSize: 14,
                color: "#8a9a7e",
                lineHeight: 1.7,
                fontFamily: "var(--font-body)",
                marginBottom: 20,
              }}>
                Get the latest SBA insights and toolkit updates delivered to your inbox.
              </p>

              {/* Glass newsletter card */}
              <div style={{
                background: "rgba(200,168,78,0.04)",
                border: "1px solid rgba(200,168,78,0.1)",
                borderRadius: 16,
                padding: 20,
                marginBottom: 12,
              }}>
                <a
                  href="https://smallbizrecon-insider-intel.beehiiv.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Subscribe to newsletter (opens in new tab)"
                  onMouseEnter={() => setEmailHovered(true)}
                  onMouseLeave={() => setEmailHovered(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                    padding: "13px 20px",
                    borderRadius: 12,
                    background: emailHovered
                      ? "linear-gradient(135deg, rgba(200,168,78,0.35), rgba(200,168,78,0.15))"
                      : "linear-gradient(135deg, rgba(200,168,78,0.22), rgba(200,168,78,0.08))",
                    border: `1px solid rgba(200,168,78,${emailHovered ? "0.45" : "0.25"})`,
                    color: "#eaf0e4",
                    fontSize: 14,
                    fontWeight: 600,
                    fontFamily: "var(--font-body)",
                    textDecoration: "none",
                    transition: "all 0.3s ease",
                    boxShadow: emailHovered ? "0 0 24px rgba(200,168,78,0.08)" : "none",
                  }}
                >
                  <Mail size={16} />
                  Subscribe
                  <ExternalLink size={12} style={{ opacity: 0.5 }} />
                </a>
              </div>

              <p style={{
                textAlign: "center",
                fontSize: 11,
                color: "#7a8a6e",
                fontFamily: "var(--font-body)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
              }}>
                <Shield size={11} style={{ color: "#7a8a6e" }} />
                We respect your privacy. Unsubscribe anytime.
              </p>
            </div>
          </div>

          {/* ── Divider ── */}
          <div aria-hidden="true" style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 28,
          }}>
            <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, transparent, rgba(200,168,78,0.1), rgba(200,168,78,0.06))" }} />
            <div style={{
              width: 6,
              height: 6,
              transform: "rotate(45deg)",
              border: "1px solid rgba(200,168,78,0.2)",
              background: "rgba(200,168,78,0.06)",
            }} />
            <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, rgba(200,168,78,0.06), rgba(200,168,78,0.1), transparent)" }} />
          </div>

          {/* ── Disclaimer ── */}
          <div style={{
            textAlign: "center",
            maxWidth: 680,
            margin: "0 auto 20px",
          }}>
            <p style={{
              fontSize: 12,
              lineHeight: 1.7,
              fontFamily: "var(--font-body)",
            }}>
              <span style={{ color: "#cda349", fontWeight: 600 }}>Disclaimer:</span>{" "}
              <span style={{ color: "#8a9a7e" }}>
                SmallBiz Recon™ is not affiliated with the U.S. Small Business
                Administration. Our toolkits are educational guides based on public
                SBA guidance and internal experience.
              </span>
            </p>
          </div>

          {/* ── Policy links ── */}
          <nav
            aria-label="Legal"
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "6px 20px",
              marginBottom: 16,
            }}
          >
            {[
              { to: "/privacy-policy", label: "Privacy Policy" },
              { to: "/terms", label: "Terms & Conditions" },
              { to: "/refund-policy", label: "Refund Policy" },
              { to: "/do-not-sell", label: "Do Not Sell" },
              { to: "/accessibility", label: "Accessibility" },
            ].map((item, i) => (
              <React.Fragment key={item.to}>
                {i > 0 && (
                  <span style={{ color: "rgba(200,168,78,0.15)", fontSize: 12 }} aria-hidden="true">·</span>
                )}
                <Link
                  to={item.to}
                  style={{
                    fontSize: 12,
                    color: "#8a9a7e",
                    textDecoration: "none",
                    fontFamily: "var(--font-body)",
                    transition: "color 0.3s ease",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "#cda349"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "#6a7a5e"; }}
                >
                  {item.label}
                </Link>
              </React.Fragment>
            ))}
            <span style={{ color: "rgba(200,168,78,0.15)", fontSize: 12 }} aria-hidden="true">·</span>
            <button
              type="button"
              onClick={() => setShowCookieConsent(true)}
              style={{
                fontSize: 12,
                color: "#8a9a7e",
                background: "none",
                border: "none",
                padding: 0,
                fontFamily: "var(--font-body)",
                cursor: "pointer",
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#cda349"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "#6a7a5e"; }}
            >
              Cookie Preferences
            </button>
          </nav>

          {/* ── Copyright ── */}
          <p style={{
            textAlign: "center",
            fontSize: 11,
            color: "#7a8a6e",
            fontFamily: "var(--font-body)",
            paddingBottom: 32,
          }}>
            © {new Date().getFullYear()} SmallBiz Recon™. All Rights Reserved.
          </p>
        </div>

        {/* ── Responsive grid override ── */}
        <style>{`
          @media (max-width: 1024px) {
            .footer-grid { grid-template-columns: repeat(2, 1fr) !important; }
          }
          @media (max-width: 640px) {
            .footer-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </footer>
    </>
  );
};

export default Footer;