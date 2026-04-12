import { Link } from "react-router-dom";

type FooterProps = {
  setShowCookieConsent?: (show: boolean) => void;
};

export default function Footer({ setShowCookieConsent }: FooterProps) {
  return (
    <footer
      role="contentinfo"
      style={{
        borderTop: "1px solid var(--color-border)",
        background: "var(--color-bg)",
        padding: "48px 24px 32px",
        fontFamily: "var(--font-body)",
      }}
    >
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        {/* Top row: brand + links */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: "32px 48px",
            marginBottom: 40,
          }}
        >
          {/* Brand */}
          <div style={{ maxWidth: 320 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <img
                src="/smallbizrecon_logo_transparent.png"
                alt=""
                width={36}
                height={36}
                style={{ width: 36, height: 36 }}
                loading="lazy"
              />
              <span style={{
                fontFamily: "var(--font-display)",
                fontSize: 18,
                color: "var(--color-brand-green)",
              }}>
                SmallBiz Recon
              </span>
            </div>
            <p style={{
              fontSize: 14,
              color: "var(--color-text-muted)",
              lineHeight: 1.7,
              margin: 0,
            }}>
              Educational guidance and structured help for small business owners
              navigating SBA COVID EIDL servicing issues.
            </p>
          </div>

          {/* Links */}
          <nav aria-label="Footer navigation" style={{ display: "flex", gap: 48, flexWrap: "wrap" }}>
            <div>
              <h3 style={{ fontSize: 13, fontWeight: 600, color: "var(--color-text)", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Navigate
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                <li><Link to="/home" style={linkStyle}>Home</Link></li>
                <li><Link to="/case-evaluator" style={linkStyle}>Case Evaluator</Link></li>
                <li><Link to="/consultation" style={linkStyle}>Consultation</Link></li>
                <li><Link to="/contact" style={linkStyle}>Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 style={{ fontSize: 13, fontWeight: 600, color: "var(--color-text)", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Legal
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                <li><Link to="/privacy-policy" style={linkStyle}>Privacy Policy</Link></li>
                <li><Link to="/terms" style={linkStyle}>Terms & Conditions</Link></li>
                <li><Link to="/accessibility" style={linkStyle}>Accessibility</Link></li>
                {setShowCookieConsent && (
                  <li>
                    <button
                      type="button"
                      onClick={() => setShowCookieConsent(true)}
                      style={{
                        ...linkStyle,
                        background: "none",
                        border: "none",
                        padding: 0,
                        cursor: "pointer",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      Cookie Preferences
                    </button>
                  </li>
                )}
              </ul>
            </div>
          </nav>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "var(--color-border-light)", marginBottom: 24 }} />

        {/* Disclaimer + copyright */}
        <div style={{ textAlign: "center" }}>
          <p style={{
            fontSize: 13,
            color: "var(--color-text-muted)",
            lineHeight: 1.7,
            maxWidth: 620,
            margin: "0 auto 16px",
          }}>
            <strong style={{ color: "var(--color-text-secondary)" }}>Disclaimer:</strong>{" "}
            SmallBiz Recon is not affiliated with the U.S. Small Business Administration.
            We do not provide legal advice. Our services are educational and
            administrative in nature.
          </p>
          <p style={{
            fontSize: 12,
            color: "var(--color-text-muted)",
            margin: 0,
          }}>
            &copy; {new Date().getFullYear()} SmallBiz Recon. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

const linkStyle: React.CSSProperties = {
  fontSize: 14,
  color: "var(--color-text-muted)",
  textDecoration: "none",
};
