import { Link } from "react-router-dom";

type FooterProps = {
  setShowCookieConsent?: (show: boolean) => void;
};

export default function Footer({ setShowCookieConsent }: FooterProps) {
  return (
    <>
      <style>{`
        .sbr-footer-top {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          gap: 32px 48px;
          margin-bottom: 36px;
        }
        .sbr-footer-nav {
          display: flex;
          gap: 48px;
          flex-wrap: wrap;
        }
        @media (max-width: 600px) {
          .sbr-footer-top {
            flex-direction: column;
            gap: 28px;
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
          <div className="sbr-footer-top">
            <div style={{ maxWidth: 300, minWidth: 200 }}>
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
              }}>
                Straightforward help for small business owners navigating SBA
                COVID EIDL loan problems.
              </p>
            </div>

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
          </div>

          <div className="sbr-section-divider" style={{ maxWidth: "100%", marginBottom: 24 }} />

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
