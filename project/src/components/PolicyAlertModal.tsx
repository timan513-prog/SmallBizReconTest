import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { X, TriangleAlert as AlertTriangle, ArrowRight, ExternalLink } from "lucide-react";

/* ═══════════════════════════════════════════════════════════
   PolicyAlertModal
   
   Drop into App.tsx or your layout wrapper:
   
     import PolicyAlertModal from "./components/PolicyAlertModal";
     
     // Inside your component return:
     <PolicyAlertModal />
   
   Shows once per session (sessionStorage). Dismisses on:
   - X button
   - Click outside
   - Escape key
   - "Read Full Update" link click
   ═══════════════════════════════════════════════════════════ */

const STORAGE_KEY = "sbr-policy-alert-dismissed-mar2026";

const PolicyAlertModal: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Only show once per session
    try {
      if (sessionStorage.getItem(STORAGE_KEY)) return;
    } catch {}

    // Slight delay so the page loads first
    const timer = setTimeout(() => setVisible(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  // Focus trap & escape key
  useEffect(() => {
    if (!visible || closing) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };

    // Focus the close button on open
    setTimeout(() => closeRef.current?.focus(), 100);

    document.addEventListener("keydown", handleKey);
    // Prevent body scroll
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [visible, closing]);

  const dismiss = () => {
    setClosing(true);
    try { sessionStorage.setItem(STORAGE_KEY, "1"); } catch {}
    setTimeout(() => {
      setVisible(false);
      setClosing(false);
      document.body.style.overflow = "";
    }, 350);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) dismiss();
  };

  if (!visible) return null;

  return (
    <>
      <style>{`
        @keyframes policyBackdropIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes policyBackdropOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        @keyframes policyModalIn {
          from { opacity: 0; transform: translateY(24px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes policyModalOut {
          from { opacity: 1; transform: translateY(0) scale(1); }
          to { opacity: 0; transform: translateY(16px) scale(0.97); }
        }
        @keyframes policyPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(200,168,78,0.3); }
          50% { box-shadow: 0 0 0 8px rgba(200,168,78,0); }
        }
        @keyframes policyBarGlow {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }

        .policy-modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }
        .policy-modal-backdrop.entering {
          animation: policyBackdropIn 0.35s ease-out both;
        }
        .policy-modal-backdrop.exiting {
          animation: policyBackdropOut 0.3s ease-in both;
        }

        .policy-modal-card {
          position: relative;
          max-width: 560px;
          width: 100%;
          border-radius: 24px;
          overflow: hidden;
          background: #0e1210;
          border: 1px solid rgba(200,168,78,0.15);
          box-shadow: 0 24px 80px rgba(0,0,0,0.5), 0 0 60px rgba(200,168,78,0.06);
        }
        .policy-modal-card.entering {
          animation: policyModalIn 0.45s cubic-bezier(0.23,1,0.32,1) 0.08s both;
        }
        .policy-modal-card.exiting {
          animation: policyModalOut 0.3s ease-in both;
        }

        .policy-close-btn {
          position: absolute;
          top: 16px;
          right: 16px;
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.06);
          color: #8a9480;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.25s ease;
          z-index: 2;
        }
        .policy-close-btn:hover,
        .policy-close-btn:focus-visible {
          background: rgba(255,255,255,0.08);
          color: #e8ede2;
          border-color: rgba(255,255,255,0.12);
        }
        .policy-close-btn:focus-visible {
          outline: 2px solid #cda349;
          outline-offset: 2px;
        }

        .policy-read-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 28px;
          border-radius: 14px;
          background: linear-gradient(135deg, rgba(200,168,78,0.35), rgba(200,168,78,0.15));
          border: 1px solid rgba(200,168,78,0.4);
          color: #eaf0e4;
          font-size: 14px;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.23,1,0.32,1);
          box-shadow: 0 0 20px rgba(200,168,78,0.08);
        }
        .policy-read-link:hover,
        .policy-read-link:focus-visible {
          background: linear-gradient(135deg, rgba(200,168,78,0.5), rgba(200,168,78,0.25));
          transform: translateY(-1px);
          box-shadow: 0 0 32px rgba(200,168,78,0.15), 0 4px 16px rgba(0,0,0,0.3);
        }
        .policy-read-link:focus-visible {
          outline: 2px solid #cda349;
          outline-offset: 3px;
        }

        .policy-dismiss-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 14px 24px;
          border-radius: 14px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          color: #8a9a7e;
          font-size: 14px;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .policy-dismiss-btn:hover,
        .policy-dismiss-btn:focus-visible {
          background: rgba(255,255,255,0.06);
          color: #a3b098;
          border-color: rgba(255,255,255,0.1);
        }
        .policy-dismiss-btn:focus-visible {
          outline: 2px solid #7ea85e;
          outline-offset: 3px;
        }

        .policy-modal-body {
          max-height: 50vh;
          overflow-y: auto;
          scrollbar-width: thin;
          scrollbar-color: rgba(200,168,78,0.2) transparent;
        }
        .policy-modal-body::-webkit-scrollbar {
          width: 5px;
        }
        .policy-modal-body::-webkit-scrollbar-track {
          background: transparent;
        }
        .policy-modal-body::-webkit-scrollbar-thumb {
          background: rgba(200,168,78,0.2);
          border-radius: 10px;
        }

        @media (max-width: 640px) {
          .policy-modal-card {
            border-radius: 20px;
          }
          .policy-actions-row {
            flex-direction: column !important;
          }
          .policy-actions-row > * {
            width: 100% !important;
            justify-content: center !important;
          }
        }
      `}</style>

      <div
        className={`policy-modal-backdrop ${closing ? "exiting" : "entering"}`}
        onClick={handleBackdropClick}
        role="dialog"
        aria-modal="true"
        aria-labelledby="policy-alert-title"
        aria-describedby="policy-alert-desc"
      >
        <div className={`policy-modal-card ${closing ? "exiting" : "entering"}`} ref={modalRef}>
          {/* Top accent bar */}
          <div aria-hidden="true" style={{
            height: 4,
            background: "linear-gradient(90deg, #cda349, #e8b84a, #cda349)",
            animation: "policyBarGlow 3s ease-in-out infinite",
          }} />

          {/* Close button */}
          <button
            ref={closeRef}
            className="policy-close-btn"
            onClick={dismiss}
            aria-label="Close policy alert"
          >
            <X size={16} />
          </button>

          {/* Content */}
          <div style={{ padding: "32px 32px 28px" }}>
            {/* Icon + badge */}
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
              <div aria-hidden="true" style={{
                width: 48,
                height: 48,
                borderRadius: 14,
                background: "rgba(200,168,78,0.1)",
                border: "1px solid rgba(200,168,78,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                animation: "policyPulse 2.5s ease-in-out infinite",
              }}>
                <AlertTriangle size={22} style={{ color: "#cda349" }} />
              </div>
              <div>
                <div style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "3px 10px",
                  borderRadius: 100,
                  background: "rgba(200,168,78,0.08)",
                  border: "1px solid rgba(200,168,78,0.15)",
                  marginBottom: 4,
                }}>
                  <span aria-hidden="true" style={{
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background: "#e8b84a",
                    animation: "policyBarGlow 2s ease-in-out infinite",
                  }} />
                  <span style={{
                    fontSize: 10,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.14em",
                    color: "#cda349",
                    fontFamily: "'DM Sans', sans-serif",
                  }}>
                    Policy Alert — March 2026
                  </span>
                </div>
                <h2 id="policy-alert-title" style={{
                  fontFamily: "'Instrument Serif', Georgia, serif",
                  fontSize: 20,
                  fontWeight: 400,
                  color: "#eaf0e4",
                  lineHeight: 1.3,
                  margin: 0,
                }}>
                  Treasury Cross-Servicing &amp; SBA Debt Clarification
                </h2>
              </div>
            </div>

            {/* Body text */}
            <div id="policy-alert-desc" style={{
              fontSize: 14,
              color: "#a3b098",
              lineHeight: 1.75,
              fontFamily: "'DM Sans', sans-serif",
              marginBottom: 24,
            }}>
              <p style={{ margin: 0 }}>
                Treasury clarified that it <strong style={{ color: "#e8ede2" }}>does not independently return COVID EIDL or PPP debts to the SBA</strong> &mdash; Treasury acts only as the federal government&apos;s collection agent, and the SBA retains full authority over any recall or reinstatement. If a debt has been referred to a private collection agency, that agency becomes the primary contact for disputes; if it remains in Cross-Servicing, disputes go directly to Treasury. This is why SmallBiz Recon&trade; routes dispute packets to Treasury and recall requests to the SBA. For the full story, check out our <Link to="/community/news-updates" onClick={dismiss} style={{ color: "#cda349", textDecoration: "underline" }}>News &amp; Updates</Link>.
              </p>
            </div>

            {/* Sources */}
            <div style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 6,
              marginBottom: 20,
            }}>
              {[
                { label: "Cross-Servicing", url: "https://fiscal.treasury.gov/cross-servicing/" },
                { label: "Debt Management", url: "https://fiscal.treasury.gov/debt-management/" },
                { label: "TOPS", url: "https://fiscal.treasury.gov/top/" },
                { label: "TFM Vol 1 Ch 5000", url: "https://tfx.treasury.gov/tfm/volume1/part3/chapter-5000-collecting-delinquent-nontax-debt-through-treasury-cross-servicing" },
              ].map((src) => (
                <a
                  key={src.url}
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                    padding: "3px 9px",
                    borderRadius: 8,
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    color: "#7a8a70",
                    fontSize: 10,
                    fontWeight: 600,
                    fontFamily: "'DM Sans', sans-serif",
                    textDecoration: "none",
                    transition: "all 0.2s ease",
                    letterSpacing: "0.02em",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(200,168,78,0.08)";
                    e.currentTarget.style.color = "#a3b098";
                    e.currentTarget.style.borderColor = "rgba(200,168,78,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                    e.currentTarget.style.color = "#7a8a70";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                  }}
                >
                  <ExternalLink size={9} />
                  {src.label}
                </a>
              ))}
            </div>

            {/* Divider */}
            <div aria-hidden="true" style={{
              height: 1,
              background: "linear-gradient(90deg, rgba(200,168,78,0.15), rgba(200,168,78,0.05), transparent)",
              marginBottom: 20,
            }} />

            {/* Actions */}
            <div className="policy-actions-row" style={{
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
            }}>
              <Link
                to="/community/news-updates"
                className="policy-read-link"
                onClick={dismiss}
              >
                Read Full Update
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
              <button
                className="policy-dismiss-btn"
                onClick={dismiss}
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PolicyAlertModal;