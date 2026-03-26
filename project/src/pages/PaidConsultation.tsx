import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Phone, Clock, Shield, CheckCircle, ArrowRight, Calendar,
  FileCheck, Crosshair, AlertCircle, Star, Zap, Award,
  ChevronRight, Gift, BadgeDollarSign, ArrowLeft,
} from 'lucide-react';
import EIDLStyleShell from '../components/layout/EIDLStyleShell';
import ContactDisclaimer from '../components/ContactDisclaimer';

/* ── Load Calendly popup assets ── */
function useCalendlyPopup() {
  useEffect(() => {
    if (!document.querySelector('link[href*="calendly.com/assets/external/widget.css"]')) {
      const link = document.createElement("link");
      link.href = "https://assets.calendly.com/assets/external/widget.css";
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }
    if (!document.querySelector('script[src*="calendly.com/assets/external/widget.js"]')) {
      const script = document.createElement("script");
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  const open = () => {
    if ((window as any).Calendly) {
      (window as any).Calendly.initPopupWidget({
        url: 'https://calendly.com/smallbizrecon1/smallbiz-recon-advanced-sba-eidl-info-session?hide_event_type_details=1&background_color=1e2b12&text_color=f5f4ed&primary_color=cda349',
      });
    }
  };

  return open;
}

/* ── Intersection Observer ── */
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

const PaidConsultation = () => {
  const openCalendly = useCalendlyPopup();
  const heroObs = useInView(0.1);
  const cardObs = useInView(0.08);
  const compareObs = useInView(0.1);
  const faqObs = useInView(0.1);

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(32px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmerSlide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes goldPulse {
          0%, 100% { box-shadow: 0 0 20px rgba(200,168,78,0.1), 0 0 0 0 rgba(200,168,78,0.12); }
          50% { box-shadow: 0 0 32px rgba(200,168,78,0.18), 0 0 0 6px rgba(200,168,78,0.04); }
        }
        .paid-cta:hover {
          background: linear-gradient(135deg, rgba(200,168,78,0.55), rgba(200,168,78,0.25)) !important;
          border-color: rgba(200,168,78,0.7) !important;
          transform: translateY(-3px) !important;
          box-shadow: 0 12px 40px rgba(200,168,78,0.2) !important;
        }
        .paid-feature-card:hover {
          border-color: rgba(200,168,78,0.2) !important;
          transform: translateY(-4px) !important;
          box-shadow: 0 20px 50px rgba(0,0,0,0.3) !important;
        }
        .faq-btn:hover {
          border-color: rgba(200,168,78,0.15) !important;
        }
        @media (max-width: 768px) {
          .paid-grid { grid-template-columns: 1fr !important; }
          .compare-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <EIDLStyleShell
        title="Advanced SBA Consultation"
        subtitle="A dedicated 60-minute session for borrowers facing complex SBA servicing situations — subordination, collateral release, Treasury disputes, and more."
        icon={<Phone size={30} color="#c8a84e" strokeWidth={1.5} />}
        maxWidth={1200}
      >
        {/* ══════════════════════════════════════
            HERO SECTION — Value Proposition
            ══════════════════════════════════════ */}
        <div
          ref={heroObs.ref}
          style={{
            marginBottom: 56,
            opacity: heroObs.inView ? 1 : 0,
            animation: heroObs.inView ? "fadeSlideUp 0.7s cubic-bezier(0.23,1,0.32,1) both" : "none",
          }}
        >
          <div style={{
            position: "relative",
            overflow: "hidden",
            background: "var(--bg-card)",
            backdropFilter: "var(--glass-blur)",
            WebkitBackdropFilter: "var(--glass-blur)",
            borderRadius: 28,
            border: "1px solid var(--border-primary)",
            boxShadow: "var(--shadow-card)",
          }}>
            {/* Shimmer */}
            <div style={{ position: "relative", height: 2, overflow: "hidden" }}>
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(90deg, transparent, rgba(200,168,78,0.4), transparent)",
                animation: "shimmerSlide 4s ease-in-out infinite",
              }} />
            </div>

            {/* Corner glows */}
            <div style={{
              position: "absolute", top: -80, right: -80, width: 200, height: 200, borderRadius: "50%",
              background: "radial-gradient(circle, rgba(200,168,78,0.07), transparent 60%)", pointerEvents: "none",
            }} />
            <div style={{
              position: "absolute", bottom: -60, left: -60, width: 160, height: 160, borderRadius: "50%",
              background: "radial-gradient(circle, rgba(126,168,94,0.05), transparent 60%)", pointerEvents: "none",
            }} />

            <div className="paid-grid" style={{
              display: "grid",
              gridTemplateColumns: "1fr 380px",
              gap: 0,
            }}>
              {/* Left — Main pitch */}
              <div style={{ padding: "48px 44px", position: "relative" }}>
                {/* Badge */}
                <div style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "5px 14px",
                  borderRadius: 100,
                  background: "rgba(200,168,78,0.08)",
                  border: "1px solid rgba(200,168,78,0.18)",
                  marginBottom: 24,
                }}>
                  <Award size={12} color="var(--accent-gold)" />
                  <span style={{
                    fontSize: 10,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.14em",
                    color: "var(--accent-gold)",
                    fontFamily: "var(--font-body)",
                  }}>
                    Advanced Session
                  </span>
                </div>

                <h2 style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 36,
                  fontWeight: 400,
                  color: "var(--text-primary)",
                  lineHeight: 1.15,
                  letterSpacing: "-0.015em",
                  marginBottom: 16,
                }}>
                  60 minutes of{" "}
                  <span style={{ fontStyle: "italic", color: "var(--accent-gold)" }}>
                    focused SBA guidance
                  </span>
                </h2>

                <p style={{
                  fontSize: 15,
                  color: "var(--text-secondary)",
                  lineHeight: 1.75,
                  fontFamily: "var(--font-body)",
                  marginBottom: 28,
                  maxWidth: 520,
                }}>
                  For borrowers facing complex servicing situations — subordination requests,
                  collateral release, Treasury offsets, payment assistance hardship cases,
                  recall letters, and more. One-on-one with someone who has reviewed 15,000+
                  SBA cases.
                </p>

                {/* What's included */}
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {[
                    "Deep-dive review of your specific SBA loan situation",
                    "Step-by-step action plan tailored to your case",
                    "Document checklist — exactly what to prepare and how",
                    "Submission strategy to avoid common rejection triggers",
                    "Direct answers to your toughest SBA questions",
                  ].map((item, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                      <CheckCircle size={16} style={{ color: "var(--accent-gold)", flexShrink: 0, marginTop: 2 }} />
                      <span style={{
                        fontSize: 14,
                        color: "var(--text-secondary)",
                        fontFamily: "var(--font-body)",
                        lineHeight: 1.5,
                      }}>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right — Pricing + CTA */}
              <div style={{
                padding: "48px 36px",
                borderLeft: "1px solid var(--border-primary)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
              }}>
                {/* Price */}
                <div style={{ marginBottom: 8 }}>
                  <span style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 56,
                    fontWeight: 400,
                    color: "var(--text-primary)",
                    lineHeight: 1,
                  }}>
                    $167
                  </span>
                </div>
                <p style={{
                  fontSize: 13,
                  color: "var(--text-muted)",
                  fontFamily: "var(--font-body)",
                  marginBottom: 28,
                }}>
                  60-minute phone consultation
                </p>

                {/* Session details */}
                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  width: "100%",
                  marginBottom: 28,
                }}>
                  {[
                    { icon: <Clock size={14} />, text: "60 minutes" },
                    { icon: <Phone size={14} />, text: "Phone call" },
                    { icon: <Calendar size={14} />, text: "Pick your time" },
                  ].map((d, i) => (
                    <div key={i} style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "10px 16px",
                      borderRadius: 12,
                      background: "var(--badge-bg)",
                      border: "1px solid var(--badge-border)",
                      fontSize: 13,
                      color: "var(--text-secondary)",
                      fontFamily: "var(--font-body)",
                    }}>
                      <span style={{ color: "var(--accent-gold)" }}>{d.icon}</span>
                      {d.text}
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <button
                  onClick={openCalendly}
                  className="paid-cta"
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                    padding: "18px 28px",
                    borderRadius: 16,
                    background: "linear-gradient(135deg, rgba(200,168,78,0.4), rgba(200,168,78,0.15))",
                    border: "1px solid rgba(200,168,78,0.5)",
                    color: "#eaf0e4",
                    fontSize: 15,
                    fontWeight: 600,
                    fontFamily: "var(--font-body)",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    cursor: "pointer",
                    transition: "all 0.35s ease",
                    animation: "goldPulse 3s ease-in-out infinite",
                  }}
                >
                  <Calendar size={18} />
                  Schedule Consultation
                </button>

                <p style={{
                  marginTop: 14,
                  fontSize: 11,
                  color: "var(--text-muted)",
                  fontFamily: "var(--font-body)",
                }}>
                  Secure payment via Calendly at booking
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════
            BONUS — Free Guide + Credit Toward Services
            ══════════════════════════════════════ */}
        <div
          ref={cardObs.ref}
          style={{
            marginBottom: 56,
            opacity: cardObs.inView ? 1 : 0,
            animation: cardObs.inView ? "fadeSlideUp 0.7s cubic-bezier(0.23,1,0.32,1) 0.1s both" : "none",
          }}
        >
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 20,
          }}
            className="paid-grid"
          >
            {/* Bonus 1: Free Guide */}
            <div
              className="paid-feature-card"
              style={{
                position: "relative",
                overflow: "hidden",
                background: "var(--bg-card)",
                backdropFilter: "var(--glass-blur)",
                WebkitBackdropFilter: "var(--glass-blur)",
                borderRadius: 22,
                border: "1px solid var(--border-primary)",
                padding: "36px 32px",
                transition: "all 0.5s cubic-bezier(0.23,1,0.32,1)",
                boxShadow: "var(--shadow-card)",
              }}
            >
              <div style={{
                width: 48,
                height: 48,
                borderRadius: 14,
                background: "rgba(200,168,78,0.1)",
                border: "1px solid rgba(200,168,78,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 20,
              }}>
                <Gift size={22} color="var(--accent-gold)" />
              </div>

              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "4px 12px",
                borderRadius: 100,
                background: "rgba(126,168,94,0.1)",
                border: "1px solid rgba(126,168,94,0.2)",
                marginBottom: 16,
              }}>
                <span style={{
                  fontSize: 10,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: "var(--accent-green)",
                  fontFamily: "var(--font-body)",
                }}>
                  Included Free
                </span>
              </div>

              <h3 style={{
                fontFamily: "var(--font-display)",
                fontSize: 22,
                fontWeight: 400,
                color: "var(--text-primary)",
                marginBottom: 10,
                lineHeight: 1.25,
              }}>
                Free access to any{" "}
                <span style={{ fontStyle: "italic", color: "var(--accent-gold)" }}>one paid guide</span>
              </h3>

              <p style={{
                fontSize: 14,
                color: "var(--text-secondary)",
                lineHeight: 1.7,
                fontFamily: "var(--font-body)",
              }}>
                Your consultation includes complimentary access to any single
                premium toolkit or guide in our library — choose the one most
                relevant to your situation.
              </p>
            </div>

            {/* Bonus 2: Credit Toward Services */}
            <div
              className="paid-feature-card"
              style={{
                position: "relative",
                overflow: "hidden",
                background: "var(--bg-card)",
                backdropFilter: "var(--glass-blur)",
                WebkitBackdropFilter: "var(--glass-blur)",
                borderRadius: 22,
                border: "1px solid var(--border-primary)",
                padding: "36px 32px",
                transition: "all 0.5s cubic-bezier(0.23,1,0.32,1)",
                boxShadow: "var(--shadow-card)",
              }}
            >
              <div style={{
                width: 48,
                height: 48,
                borderRadius: 14,
                background: "rgba(200,168,78,0.1)",
                border: "1px solid rgba(200,168,78,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 20,
              }}>
                <BadgeDollarSign size={22} color="var(--accent-gold)" />
              </div>

              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "4px 12px",
                borderRadius: 100,
                background: "rgba(200,168,78,0.08)",
                border: "1px solid rgba(200,168,78,0.18)",
                marginBottom: 16,
              }}>
                <span style={{
                  fontSize: 10,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: "var(--accent-gold)",
                  fontFamily: "var(--font-body)",
                }}>
                  $167 Credit
                </span>
              </div>

              <h3 style={{
                fontFamily: "var(--font-display)",
                fontSize: 22,
                fontWeight: 400,
                color: "var(--text-primary)",
                marginBottom: 10,
                lineHeight: 1.25,
              }}>
                Applies to{" "}
                <span style={{ fontStyle: "italic", color: "var(--accent-gold)" }}>full-price services</span>
              </h3>

              <p style={{
                fontSize: 14,
                color: "var(--text-secondary)",
                lineHeight: 1.7,
                fontFamily: "var(--font-body)",
              }}>
                If you purchase any additional SmallBiz Recon™ service, your $167
                consultation fee applies as a credit toward the full price — not
                a discounted package. You never lose what you paid.
              </p>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════
            COMPARISON — Free vs Paid
            ══════════════════════════════════════ */}
        <div
          ref={compareObs.ref}
          style={{
            marginBottom: 56,
            opacity: compareObs.inView ? 1 : 0,
            animation: compareObs.inView ? "fadeSlideUp 0.7s cubic-bezier(0.23,1,0.32,1) both" : "none",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <h2 style={{
              fontFamily: "var(--font-display)",
              fontSize: 30,
              fontWeight: 400,
              color: "var(--text-primary)",
              marginBottom: 10,
            }}>
              Which session is{" "}
              <span style={{ fontStyle: "italic", color: "var(--accent-gold)" }}>right for you?</span>
            </h2>
            <p style={{
              fontSize: 15,
              color: "var(--text-secondary)",
              fontFamily: "var(--font-body)",
            }}>
              Start free. Upgrade when you need deeper support.
            </p>
          </div>

          <div className="compare-grid" style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 20,
          }}>
            {/* Free tier */}
            <div style={{
              position: "relative",
              background: "var(--bg-card)",
              backdropFilter: "var(--glass-blur)",
              WebkitBackdropFilter: "var(--glass-blur)",
              borderRadius: 22,
              border: "1px solid rgba(126,168,94,0.2)",
              padding: "36px 32px",
              boxShadow: "var(--shadow-card)",
            }}>
              {/* Best Start badge — mirrors the Recommended badge */}
              <div style={{
                position: "absolute",
                top: -1,
                left: "50%",
                transform: "translateX(-50%)",
                padding: "4px 16px",
                borderRadius: "0 0 10px 10px",
                background: "rgba(126,168,94,0.15)",
                border: "1px solid rgba(126,168,94,0.25)",
                borderTop: "none",
              }}>
                <span style={{
                  fontSize: 9,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.14em",
                  color: "var(--accent-green)",
                  fontFamily: "var(--font-body)",
                }}>
                  Best Start
                </span>
              </div>

              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "4px 12px",
                borderRadius: 100,
                background: "var(--badge-bg)",
                border: "1px solid var(--badge-border)",
                marginBottom: 20,
              }}>
                <span style={{
                  fontSize: 10,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: "var(--accent-green)",
                  fontFamily: "var(--font-body)",
                }}>
                  Free
                </span>
              </div>

              <h3 style={{
                fontFamily: "var(--font-display)",
                fontSize: 24,
                fontWeight: 400,
                color: "var(--text-primary)",
                marginBottom: 6,
              }}>
                30-Minute Consultation
              </h3>
              <p style={{
                fontFamily: "var(--font-display)",
                fontSize: 32,
                color: "var(--accent-green)",
                marginBottom: 20,
              }}>
                $0
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
                {[
                  "General SBA situation review",
                  "Identify your servicing path",
                  "High-level document overview",
                  "Understand your SBA servicing options",
                  "Get clarity before contacting the SBA",
                  "Q&A — no pressure",
                  "Free access to one paid guide",
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <CheckCircle size={14} style={{ color: "var(--accent-green)", flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: "var(--text-secondary)", fontFamily: "var(--font-body)" }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <Link
                to="/contact"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  padding: "16px 24px",
                  borderRadius: 14,
                  background: "linear-gradient(135deg, rgba(126,168,94,0.25), rgba(126,168,94,0.08))",
                  border: "1px solid rgba(126,168,94,0.35)",
                  color: "#eaf0e4",
                  fontSize: 14,
                  fontWeight: 600,
                  fontFamily: "var(--font-body)",
                  textDecoration: "none",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  transition: "all 0.3s ease",
                }}
              >
                <Calendar size={16} />
                Book Free Session
                <ArrowRight size={15} />
              </Link>
            </div>

            {/* Paid tier — highlighted */}
            <div style={{
              position: "relative",
              background: "var(--bg-card)",
              backdropFilter: "var(--glass-blur)",
              WebkitBackdropFilter: "var(--glass-blur)",
              borderRadius: 22,
              border: "1px solid rgba(200,168,78,0.25)",
              padding: "36px 32px",
              boxShadow: "0 8px 40px rgba(200,168,78,0.06), var(--shadow-card)",
            }}>
              {/* Recommended badge */}
              <div style={{
                position: "absolute",
                top: -1,
                left: "50%",
                transform: "translateX(-50%)",
                padding: "4px 16px",
                borderRadius: "0 0 10px 10px",
                background: "rgba(200,168,78,0.2)",
                border: "1px solid rgba(200,168,78,0.3)",
                borderTop: "none",
              }}>
                <span style={{
                  fontSize: 9,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.14em",
                  color: "var(--accent-gold)",
                  fontFamily: "var(--font-body)",
                }}>
                  Recommended
                </span>
              </div>

              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "4px 12px",
                borderRadius: 100,
                background: "rgba(200,168,78,0.08)",
                border: "1px solid rgba(200,168,78,0.18)",
                marginBottom: 20,
              }}>
                <span style={{
                  fontSize: 10,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: "var(--accent-gold)",
                  fontFamily: "var(--font-body)",
                }}>
                  Advanced
                </span>
              </div>

              <h3 style={{
                fontFamily: "var(--font-display)",
                fontSize: 24,
                fontWeight: 400,
                color: "var(--text-primary)",
                marginBottom: 6,
              }}>
                60-Minute Consultation
              </h3>
              <p style={{
                fontFamily: "var(--font-display)",
                fontSize: 32,
                color: "var(--accent-gold)",
                marginBottom: 20,
              }}>
                $167
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
                {[
                  "Everything in the free session, plus:",
                  "Deep-dive case analysis",
                  "Custom document checklist",
                  "Submission strategy & timing",
                  "Rejection-avoidance review",
                  "Free access to one paid guide",
                  "$167 credit toward future services",
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <CheckCircle size={14} style={{ color: "var(--accent-gold)", flexShrink: 0 }} />
                    <span style={{
                      fontSize: 13,
                      color: "var(--text-secondary)",
                      fontFamily: "var(--font-body)",
                      fontWeight: i === 0 ? 600 : 400,
                    }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <button
                onClick={openCalendly}
                className="paid-cta"
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  padding: "16px 24px",
                  borderRadius: 14,
                  background: "linear-gradient(135deg, rgba(200,168,78,0.4), rgba(200,168,78,0.15))",
                  border: "1px solid rgba(200,168,78,0.5)",
                  color: "#eaf0e4",
                  fontSize: 14,
                  fontWeight: 600,
                  fontFamily: "var(--font-body)",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              >
                <Calendar size={16} />
                Schedule Now
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════
            FAQ
            ══════════════════════════════════════ */}
        <div
          ref={faqObs.ref}
          style={{
            marginBottom: 48,
            opacity: faqObs.inView ? 1 : 0,
            animation: faqObs.inView ? "fadeSlideUp 0.7s cubic-bezier(0.23,1,0.32,1) both" : "none",
          }}
        >
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: 28,
            fontWeight: 400,
            color: "var(--text-primary)",
            marginBottom: 24,
            textAlign: "center",
          }}>
            Common questions
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 800, margin: "0 auto" }}>
            {[
              {
                q: "What happens during the 60-minute session?",
                a: "We'll review your specific SBA loan situation in detail, build a tailored action plan, walk through every document you need, discuss submission strategy and timing, and answer all your questions. You'll leave with a clear path forward."
              },
              {
                q: "How does the $167 credit work?",
                a: "If you purchase any additional SmallBiz Recon™ service after your consultation, the full $167 you paid applies as a credit toward the full price of that service. This is not a discount on a package — it's a dollar-for-dollar credit."
              },
              {
                q: "Which free guide do I get to choose?",
                a: "You can select any single premium toolkit or guide from our library. We'll help you pick the one most relevant to your situation during the consultation."
              },
              {
                q: "Should I start with the free or paid session?",
                a: "If you're not sure what servicing path applies to your loan, start with the free 30-minute session. If you already know your situation is complex (subordination, Treasury offset, multiple issues), the 60-minute session will save you time."
              },
              {
                q: "Is this legal or financial advice?",
                a: "No. SmallBiz Recon™ provides educational and informational guidance only. We are not attorneys, CPAs, or licensed financial advisors. Our consultations help you understand SBA servicing processes and prepare your documentation."
              },
            ].map((faq, i) => (
              <div
                key={i}
                className="faq-btn"
                style={{
                  background: "var(--bg-card)",
                  backdropFilter: "var(--glass-blur)",
                  borderRadius: 16,
                  border: "1px solid var(--border-primary)",
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{
                    width: "100%",
                    padding: "18px 24px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--text-primary)",
                    fontFamily: "var(--font-body)",
                    fontSize: 15,
                    fontWeight: 500,
                    textAlign: "left",
                  }}
                >
                  {faq.q}
                  <ChevronRight
                    size={16}
                    style={{
                      color: "var(--accent-gold)",
                      transform: openFaq === i ? "rotate(90deg)" : "rotate(0deg)",
                      transition: "transform 0.3s ease",
                      flexShrink: 0,
                      marginLeft: 12,
                    }}
                  />
                </button>
                {openFaq === i && (
                  <div style={{
                    padding: "0 24px 18px",
                    fontSize: 14,
                    color: "var(--text-secondary)",
                    fontFamily: "var(--font-body)",
                    lineHeight: 1.7,
                    borderTop: "1px solid var(--border-primary)",
                    paddingTop: 16,
                  }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════
            BOTTOM CTA
            ══════════════════════════════════════ */}
        <div style={{
          textAlign: "center",
          padding: "40px 0 20px",
        }}>
          <button
            onClick={openCalendly}
            className="paid-cta"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "18px 40px",
              borderRadius: 16,
              background: "linear-gradient(135deg, rgba(200,168,78,0.4), rgba(200,168,78,0.15))",
              border: "1px solid rgba(200,168,78,0.5)",
              color: "#eaf0e4",
              fontSize: 15,
              fontWeight: 600,
              fontFamily: "var(--font-body)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              cursor: "pointer",
              transition: "all 0.35s ease",
            }}
          >
            <Calendar size={18} />
            Schedule Your 60-Minute Session — $167
          </button>

          <p style={{
            marginTop: 16,
            fontSize: 12,
            color: "var(--text-muted)",
            fontFamily: "var(--font-body)",
          }}>
            Includes free guide + $167 credit toward additional services
          </p>
        </div>

        {/* ══════════════════════════════════════
            DISCLAIMER
            ══════════════════════════════════════ */}
        <div style={{
          marginTop: 40,
          padding: "20px 24px",
          borderRadius: 16,
          background: "var(--badge-bg)",
          border: "1px solid var(--badge-border)",
        }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
            <AlertCircle size={14} style={{ color: "var(--text-muted)", flexShrink: 0, marginTop: 2 }} />
            <p style={{
              fontSize: 11,
              color: "var(--text-muted)",
              fontFamily: "var(--font-body)",
              lineHeight: 1.8,
              margin: 0,
            }}>
              SmallBiz Recon™ provides educational and informational resources only. We are not attorneys,
              CPAs, or licensed financial advisors. A consultation does not create any professional
              relationship and does not guarantee any outcome with the SBA, Treasury, or any government
              entity. SmallBiz Recon™ is not affiliated with or endorsed by the U.S. Small Business
              Administration. The $167 service credit applies to full-price services only and cannot
              be combined with other promotions or discounted packages.
            </p>
          </div>
        </div>

      </EIDLStyleShell>

      <ContactDisclaimer />
    </>
  );
};

export default PaidConsultation;