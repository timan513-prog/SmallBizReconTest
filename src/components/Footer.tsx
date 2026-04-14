import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

type FooterProps = {
  setShowCookieConsent?: (show: boolean) => void;
};

export default function Footer({ setShowCookieConsent }: FooterProps) {
  return (
    <>
      <style>{`
        .sbr-footer-top {
          display: grid;
          grid-template-columns: 1.2fr 1fr auto;
          gap: 32px 48px;
          margin-bottom: 40px;
        }
        .sbr-footer-nav {
          display: flex;
          gap: 48px;
          flex-wrap: wrap;
        }
        @media (max-width: 768px) {
          .sbr-footer-top {
            grid-template-columns: 1fr 1fr;
            gap: 28px;
          }
        }
        @media (max-width: 520px) {
          .sbr-footer-top {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .sbr-footer-nav {
            gap: 32px;
          }
        }
      `}</style>

      <footer
        role="contentinfo"
        style={{
          borderTop: "1px solid var(--color-border)",
          background: "var(--color-bg)",
          padding: "clamp(40px, 6vw, 56px) 20px clamp(28px, 4vw, 36px)",
          fontFamily: "var(--font-body)",
        }}
      >
        <div style={{ maxWidth: 1040, margin: "0 auto" }}>
          {/* Top row: brand + links + mini CTA */}
          <div className="sbr-footer-top">
            {/* Brand */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <img
                  src="/smallbizrecon_logo_transparent.png"
                  alt=""
                  width={30}
                  height={30}
                  style={{ width: 30, height: 30 }}
                  loading="lazy"
                />
                <span style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 17,
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
                maxWidth: 280,
              }}>
                Educational guidance and structured help for small business owners
                navigating SBA COVID EIDL servicing issues.
              </p>
            </div>

            {/* Links */}
            <nav aria-label="Footer navigation" className="sbr-footer-nav">
              <div>
                <h3 style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "var(--color-text)",
                  marginBottom: 14,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}>
                  Navigate
                </h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                  <li><Link to="/home" className="sbr-footer-link" style={linkStyle}>Home</Link></li>
                  <li><Link to="/case-evaluator" className="sbr-footer-link" style={linkStyle}>Case Evaluator</Link></li>
                  <li><Link to="/consultation" className="sbr-footer-link" style={linkStyle}>Consultation</Link></li>
                  <li><Link to="/contact" className="sbr-footer-link" style={linkStyle}>Contact</Link></li>
                </ul>
              </div>
              <div>
                <h3 style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "var(--color-text)",
                  marginBottom: 14,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}>
                  Legal
                </h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                  <li><Link to="/privacy-policy" className="sbr-footer-link" style={linkStyle}>Privacy Policy</Link></li>
                  <li><Link to="/terms" className="sbr-footer-link" style={linkStyle}>Terms & Conditions</Link></li>
                  <li><Link to="/accessibility" className="sbr-footer-link" style={linkStyle}>Accessibility</Link></li>
                  {setShowCookieConsent && (
                    <li>
                      <button
                        type="button"
                        onClick={() => setShowCookieConsent(true)}
                        className="sbr-footer-link"
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

            {/* Mini CTA */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <p style={{
                fontSize: 14,
                fontWeight: 600,
                color: "var(--color-text)",
                margin: 0,
                lineHeight: 1.4,
              }}>
                Need help with your<br />EIDL situation?
              </p>
              <Link
                to="/consultation"
                className="sbr-btn-primary"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "10px 18px",
                  borderRadius: 8,
                  color: "#FAF9F6",
                  fontSize: 13,
                  fontWeight: 600,
                  textDecoration: "none",
                  fontFamily: "var(--font-body)",
                  whiteSpace: "nowrap",
                }}
              >
                Free Consultation
                <ArrowRight size={13} aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Divider */}
          <div className="sbr-section-divider" style={{ maxWidth: "100%", marginBottom: 24 }} />

          {/* Disclaimer + copyright */}
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "12px 32px",
          }}>
            <p style={{
              fontSize: 12,
              color: "var(--color-text-muted)",
              lineHeight: 1.7,
              maxWidth: 520,
              margin: 0,
            }}>
              <strong style={{ color: "var(--color-text-secondary)", fontWeight: 600 }}>Disclaimer:</strong>{" "}
              SmallBiz Recon is not affiliated with the U.S. Small Business Administration.
              We do not provide legal advice. Our services are educational and
              administrative in nature.
            </p>
            <p style={{
              fontSize: 12,
              color: "var(--color-text-muted)",
              margin: 0,
              whiteSpace: "nowrap",
            }}>
              © {new Date().getFullYear()} SmallBiz Recon
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

const linkStyle: React.CSSProperties = {
  fontSize: 14,
  color: "var(--color-text-muted)",
  textDecoration: "none",
  minHeight: 32,
  display: "inline-block",
};
