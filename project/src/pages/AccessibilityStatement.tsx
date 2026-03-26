import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function AccessibilityStatement() {
  return (
    <>
      <style>{`
        :root {
          --font-display: 'Instrument Serif', Georgia, serif;
          --font-body: 'DM Sans', sans-serif;
        }
      `}</style>

      <section style={{
        minHeight: "80vh",
        background: "#060608",
        padding: "48px 24px 80px",
      }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <Link
            to="/home"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              color: "#cda349",
              fontSize: 14,
              fontWeight: 600,
              fontFamily: "var(--font-body)",
              textDecoration: "none",
              marginBottom: 40,
              transition: "color 0.2s ease",
            }}
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>

          <h1 style={{
            fontFamily: "var(--font-display)",
            fontSize: 42,
            fontWeight: 400,
            color: "#eaf0e4",
            marginBottom: 12,
            lineHeight: 1.15,
          }}>
            Accessibility Statement
          </h1>

          <p style={{
            fontSize: 13,
            color: "#8a9a7e",
            fontFamily: "var(--font-body)",
            marginBottom: 48,
          }}>
            Last updated: March 5, 2026
          </p>

          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: 36,
          }}>
            <div>
              <h2 style={{
                fontFamily: "var(--font-display)",
                fontSize: 24,
                fontWeight: 400,
                color: "#cda349",
                marginBottom: 12,
              }}>
                Our Commitment
              </h2>
              <p style={{
                fontSize: 15,
                color: "rgba(232,237,226,0.7)",
                lineHeight: 1.8,
                fontFamily: "var(--font-body)",
              }}>
                SmallBiz Recon™ is committed to ensuring digital accessibility for people with
                disabilities. We are continually improving the user experience for everyone and
                applying the relevant accessibility standards to ensure we provide equal access
                to all users.
              </p>
            </div>

            <div>
              <h2 style={{
                fontFamily: "var(--font-display)",
                fontSize: 24,
                fontWeight: 400,
                color: "#cda349",
                marginBottom: 12,
              }}>
                Conformance Status
              </h2>
              <p style={{
                fontSize: 15,
                color: "rgba(232,237,226,0.7)",
                lineHeight: 1.8,
                fontFamily: "var(--font-body)",
              }}>
                We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 at
                Level AA. These guidelines explain how to make web content more accessible to
                people with a wide array of disabilities. Conforming to these guidelines helps
                make the web a more inclusive experience for all users.
              </p>
            </div>

            <div>
              <h2 style={{
                fontFamily: "var(--font-display)",
                fontSize: 24,
                fontWeight: 400,
                color: "#cda349",
                marginBottom: 12,
              }}>
                Measures We Take
              </h2>
              <ul style={{
                fontSize: 15,
                color: "rgba(232,237,226,0.7)",
                lineHeight: 2,
                fontFamily: "var(--font-body)",
                paddingLeft: 24,
              }}>
                <li>Semantic HTML structure with proper heading hierarchy</li>
                <li>ARIA landmarks and labels for screen reader navigation</li>
                <li>Keyboard-accessible navigation, menus, and interactive elements</li>
                <li>Sufficient color contrast ratios for all text content</li>
                <li>Focus indicators that are visible and meet contrast requirements</li>
                <li>Form labels, error messages, and validation linked to inputs</li>
                <li>Skip navigation link for keyboard users</li>
                <li>Respect for reduced motion user preferences</li>
                <li>Alt text for meaningful images; decorative images are hidden from assistive technology</li>
              </ul>
            </div>

            <div>
              <h2 style={{
                fontFamily: "var(--font-display)",
                fontSize: 24,
                fontWeight: 400,
                color: "#cda349",
                marginBottom: 12,
              }}>
                Feedback
              </h2>
              <p style={{
                fontSize: 15,
                color: "rgba(232,237,226,0.7)",
                lineHeight: 1.8,
                fontFamily: "var(--font-body)",
                marginBottom: 16,
              }}>
                We welcome your feedback on the accessibility of SmallBiz Recon™. If you
                encounter any accessibility barriers or have suggestions for improvement,
                please contact us:
              </p>
              <div style={{
                padding: "20px 24px",
                borderRadius: 16,
                background: "rgba(200,168,78,0.04)",
                border: "1px solid rgba(200,168,78,0.1)",
              }}>
                <p style={{
                  fontSize: 14,
                  color: "rgba(232,237,226,0.7)",
                  lineHeight: 1.8,
                  fontFamily: "var(--font-body)",
                }}>
                  Email:{" "}
                  <a
                    href="mailto:info@smallbizrecon.com"
                    style={{ color: "#cda349", textDecoration: "underline" }}
                  >
                    info@smallbizrecon.com
                  </a>
                </p>
                <p style={{
                  fontSize: 14,
                  color: "rgba(232,237,226,0.7)",
                  lineHeight: 1.8,
                  fontFamily: "var(--font-body)",
                }}>
                  Or use our{" "}
                  <Link
                    to="/contact"
                    style={{ color: "#cda349", textDecoration: "underline" }}
                  >
                    Contact Page
                  </Link>
                </p>
              </div>
            </div>

            <div>
              <h2 style={{
                fontFamily: "var(--font-display)",
                fontSize: 24,
                fontWeight: 400,
                color: "#cda349",
                marginBottom: 12,
              }}>
                Technical Specifications
              </h2>
              <p style={{
                fontSize: 15,
                color: "rgba(232,237,226,0.7)",
                lineHeight: 1.8,
                fontFamily: "var(--font-body)",
              }}>
                The accessibility of SmallBiz Recon™ relies on the following technologies to
                work with the particular combination of web browser and any assistive
                technologies or plugins installed on your computer: HTML, CSS, JavaScript, and
                WAI-ARIA. These technologies are relied upon for conformance with the
                accessibility standards used.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
