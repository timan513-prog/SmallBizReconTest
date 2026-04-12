import { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Mail, MapPin, Clock, Send, CheckCircle, Puzzle, Download, Wrench, Copy, Check,
  Calendar, Shield, FileCheck, ArrowRight, Crosshair, MessageSquare, Phone
} from 'lucide-react';
import EIDLStyleShell from '../components/layout/EIDLStyleShell';
import ContactDisclaimer from '../components/ContactDisclaimer';

/* ── Load Calendly widget + badge ── */
function useCalendlyAssets() {
  useEffect(() => {
    // Load CSS
    if (!document.querySelector('link[href*="calendly.com/assets/external/widget.css"]')) {
      const link = document.createElement("link");
      link.href = "https://assets.calendly.com/assets/external/widget.css";
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }
    // Load JS + init badge widget
    if (!document.querySelector('script[src*="calendly.com/assets/external/widget.js"]')) {
      const script = document.createElement("script");
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      script.onload = () => {
        if ((window as any).Calendly) {
          (window as any).Calendly.initBadgeWidget({
            url: 'https://calendly.com/smallbizrecon1/30min?hide_event_type_details=1&background_color=1e2b12&text_color=f5f4ed&primary_color=cda349',
            text: 'Book Free Consultation',
            color: '#cda349',
            textColor: '#1e2b12',
            branding: false,
          });
        }
      };
      document.head.appendChild(script);
    } else if ((window as any).Calendly) {
      // Script already loaded, just init badge
      (window as any).Calendly.initBadgeWidget({
        url: 'https://calendly.com/smallbizrecon1/30min?hide_event_type_details=1&background_color=1e2b12&text_color=f5f4ed&primary_color=cda349',
        text: 'Book Free Consultation',
        color: '#cda349',
        textColor: '#1e2b12',
        branding: false,
      });
    }

    // Cleanup badge on unmount
    return () => {
      const badge = document.querySelector('.calendly-badge-widget');
      if (badge) badge.remove();
    };
  }, []);

  // Move badge to left side after render so it doesn't block Sabbi
  useEffect(() => {
    const moveBadge = () => {
      const badge = document.querySelector('.calendly-badge-widget') as HTMLElement;
      if (badge) {
        badge.style.right = 'auto';
        badge.style.left = '20px';
      }
    };
    // Check repeatedly since Calendly renders asynchronously
    const interval = setInterval(moveBadge, 300);
    const timeout = setTimeout(() => clearInterval(interval), 5000);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);
}

const ContactUs = () => {
  useCalendlyAssets();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('info@smallbizrecon.com');
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  };

  const canSubmit = useMemo(() => {
    return (
      formData.name.trim().length > 0 &&
      formData.email.trim().length > 0 &&
      formData.message.trim().length > 0 &&
      !isSubmitting
    );
  }, [formData, isSubmitting]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('https://formspree.io/f/xbdzrylz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Failed to send message');

      setIsSubmitted(true);
      setFormData({ name: '', email: '', company: '', message: '' });

      window.setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitError(
        'Failed to send message. Please try again, or contact us directly at info@smallbizrecon.com.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <EIDLStyleShell
        title="Contact & Support"
        subtitle="Questions about your access code, downloads, or toolkit content? We're here to help you move fast with clear DIY guidance and support."
        icon={<Mail size={30} color="#c8a84e" strokeWidth={1.5} />}
        maxWidth={1400}
      >

        {/* ══════════════════════════════════════════════
            FREE CONSULTATION — Info Section + Popup CTA
            ══════════════════════════════════════════════ */}
        <div style={{ marginBottom: 64 }}>
          {/* Section header */}
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 16px",
              borderRadius: 100,
              background: "var(--badge-bg)",
              border: "1px solid var(--badge-border)",
              marginBottom: 20,
            }}>
              <Calendar size={12} color="var(--accent-gold)" strokeWidth={2} />
              <span style={{
                fontSize: 11,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                color: "var(--accent-green)",
                fontFamily: "var(--font-body)",
              }}>
                Free Consultation
              </span>
            </div>

            <h2 style={{
              fontFamily: "var(--font-display)",
              fontSize: 34,
              fontWeight: 400,
              color: "var(--text-primary)",
              lineHeight: 1.15,
              letterSpacing: "-0.01em",
              marginBottom: 14,
            }}>
              Confused about your SBA loan?{" "}
              <span style={{ fontStyle: "italic", color: "var(--accent-gold)" }}>
                Get clear answers.
              </span>
            </h2>

            <p style={{
              maxWidth: 580,
              margin: "0 auto",
              fontSize: 15,
              color: "var(--text-secondary)",
              lineHeight: 1.7,
              fontFamily: "var(--font-body)",
            }}>
              Book a free 30-minute consultation and get practical guidance
              before you make your next move — no sales pitch, no obligation.
            </p>
          </div>

          {/* Consultation info card */}
          <div style={{
            position: "relative",
            overflow: "hidden",
            background: "var(--bg-card)",
            backdropFilter: "var(--glass-blur)",
            WebkitBackdropFilter: "var(--glass-blur)",
            borderRadius: 24,
            border: "1px solid var(--border-primary)",
            boxShadow: "var(--shadow-card)",
          }}>
            {/* Top shimmer */}
            <div style={{ position: "relative", height: 2, overflow: "hidden" }}>
              <div style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(90deg, transparent, rgba(200,168,78,0.35), transparent)",
                animation: "shimmerSlide 4s ease-in-out infinite",
              }} />
            </div>

            {/* Corner glow */}
            <div style={{
              position: "absolute", top: -80, right: -80, width: 200, height: 200, borderRadius: "50%",
              background: "radial-gradient(circle, rgba(200,168,78,0.06), transparent 60%)", pointerEvents: "none",
            }} />

            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 0,
            }}
              className="consult-grid"
            >
              {/* Left — What you get */}
              <div style={{
                padding: "44px 40px",
                borderRight: "1px solid var(--border-primary)",
              }}
                className="consult-left"
              >
                <div style={{
                  width: 52,
                  height: 52,
                  borderRadius: 16,
                  background: "rgba(200,168,78,0.1)",
                  border: "1px solid rgba(200,168,78,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 24,
                }}>
                  <Phone size={24} color="var(--accent-gold)" strokeWidth={1.5} />
                </div>

                <h3 style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 26,
                  fontWeight: 400,
                  color: "var(--text-primary)",
                  marginBottom: 12,
                  lineHeight: 1.2,
                }}>
                  What you'll get in{" "}
                  <span style={{ fontStyle: "italic", color: "var(--accent-gold)" }}>30 minutes</span>
                </h3>

                <p style={{
                  fontSize: 14,
                  color: "var(--text-secondary)",
                  lineHeight: 1.7,
                  fontFamily: "var(--font-body)",
                  marginBottom: 28,
                }}>
                  A focused phone call with someone who has direct SBA
                  servicing experience — not a chatbot, not a sales rep.
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {[
                    { num: "1", text: "We'll review your specific SBA situation together" },
                    { num: "2", text: "Identify which servicing path applies to your loan" },
                    { num: "3", text: "Walk through what documents you'll need to prepare" },
                    { num: "4", text: "Answer your questions honestly — no pressure, no upsell" },
                  ].map((step) => (
                    <div
                      key={step.num}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 14,
                      }}
                    >
                      <span style={{
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        background: "rgba(200,168,78,0.1)",
                        border: "1px solid rgba(200,168,78,0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        fontSize: 12,
                        fontWeight: 700,
                        color: "var(--accent-gold)",
                        fontFamily: "var(--font-body)",
                        marginTop: 1,
                      }}>
                        {step.num}
                      </span>
                      <span style={{
                        fontSize: 14,
                        color: "var(--text-secondary)",
                        fontFamily: "var(--font-body)",
                        lineHeight: 1.55,
                      }}>
                        {step.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right — Details + CTA */}
              <div style={{
                padding: "44px 40px",
                display: "flex",
                flexDirection: "column",
              }}
                className="consult-right"
              >
                {/* Session details */}
                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  marginBottom: 32,
                }}>
                  {[
                    { icon: <Clock size={16} />, label: "Duration", value: "30 minutes" },
                    { icon: <Phone size={16} />, label: "Format", value: "Phone call" },
                    { icon: <Shield size={16} />, label: "Cost", value: "Free — no obligation" },
                    { icon: <FileCheck size={16} />, label: "Experience", value: "15,000+ SBA cases reviewed" },
                  ].map((detail, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 14,
                        padding: "14px 18px",
                        borderRadius: 14,
                        background: "var(--badge-bg)",
                        border: "1px solid var(--badge-border)",
                        transition: "all 0.3s ease",
                      }}
                    >
                      <div style={{
                        width: 36,
                        height: 36,
                        borderRadius: 10,
                        background: "rgba(200,168,78,0.08)",
                        border: "1px solid rgba(200,168,78,0.15)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        color: "var(--accent-gold)",
                      }}>
                        {detail.icon}
                      </div>
                      <div>
                        <div style={{
                          fontSize: 10,
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "0.1em",
                          color: "var(--text-muted)",
                          fontFamily: "var(--font-body)",
                          marginBottom: 2,
                        }}>
                          {detail.label}
                        </div>
                        <div style={{
                          fontSize: 15,
                          fontWeight: 500,
                          color: "var(--text-primary)",
                          fontFamily: "var(--font-body)",
                        }}>
                          {detail.value}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Spacer */}
                <div style={{ flex: 1 }} />

                {/* Primary CTA — triggers Calendly popup */}
                <button
                  onClick={() => {
                    if ((window as any).Calendly) {
                      (window as any).Calendly.initPopupWidget({
                        url: 'https://calendly.com/smallbizrecon1/30min?hide_event_type_details=1&background_color=1e2b12&text_color=f5f4ed&primary_color=cda349',
                      });
                    }
                  }}
                  className="consult-cta-btn"
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                    padding: "18px 32px",
                    borderRadius: 16,
                    background: "linear-gradient(135deg, rgba(200,168,78,0.35), rgba(200,168,78,0.12))",
                    border: "1px solid rgba(200,168,78,0.45)",
                    color: "#eaf0e4",
                    fontSize: 15,
                    fontWeight: 600,
                    fontFamily: "var(--font-body)",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    boxShadow: "0 0 24px rgba(200,168,78,0.08)",
                  }}
                >
                  <Calendar size={18} />
                  Schedule Free Consultation
                  <ArrowRight size={16} />
                </button>

                <p style={{
                  marginTop: 14,
                  textAlign: "center",
                  fontSize: 12,
                  color: "var(--text-muted)",
                  fontFamily: "var(--font-body)",
                  lineHeight: 1.5,
                }}>
                  Picks a time that works for you — confirmation sent instantly.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════
            UPSELL — Need more than 30 minutes?
            ══════════════════════════════════════════════ */}
        <div style={{
          marginBottom: 48,
          padding: "28px 32px",
          borderRadius: 20,
          background: "var(--bg-card)",
          backdropFilter: "var(--glass-blur)",
          WebkitBackdropFilter: "var(--glass-blur)",
          border: "1px solid rgba(200,168,78,0.12)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 20,
        }}>
          <div style={{ flex: 1, minWidth: 280 }}>
            <h3 style={{
              fontFamily: "var(--font-display)",
              fontSize: 22,
              fontWeight: 400,
              color: "var(--text-primary)",
              marginBottom: 8,
            }}>
              Need deeper support?{" "}
              <span style={{ fontStyle: "italic", color: "var(--accent-gold)" }}>60-minute session</span>
            </h3>
            <p style={{
              fontSize: 13,
              color: "var(--text-secondary)",
              fontFamily: "var(--font-body)",
              lineHeight: 1.65,
            }}>
              Complex subordination, Treasury disputes, or multi-issue cases deserve more time.
              Includes a free guide + $167 credit toward future services.
            </p>
          </div>
          <Link
            to="/consultation"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "14px 28px",
              borderRadius: 14,
              background: "rgba(200,168,78,0.1)",
              border: "1px solid rgba(200,168,78,0.25)",
              color: "var(--accent-gold)",
              fontSize: 13,
              fontWeight: 600,
              fontFamily: "var(--font-body)",
              textDecoration: "none",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              transition: "all 0.3s ease",
              flexShrink: 0,
            }}
          >
            View Advanced Consultation
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* ══════════════════════════════════════════════
            DIVIDER — "Prefer to send a message?"
            ══════════════════════════════════════════════ */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          marginBottom: 48,
        }}>
          <div style={{ flex: 1, height: 1, background: "var(--border-primary)" }} />
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 16px",
            borderRadius: 100,
            background: "var(--badge-bg)",
            border: "1px solid var(--badge-border)",
          }}>
            <MessageSquare size={12} color="var(--accent-gold)" />
            <span style={{
              fontSize: 11,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "var(--accent-green)",
              fontFamily: "var(--font-body)",
              whiteSpace: "nowrap",
            }}>
              Prefer to send a message?
            </span>
          </div>
          <div style={{ flex: 1, height: 1, background: "var(--border-primary)" }} />
        </div>

        {/* ══════════════════════════════════════════════
            EXISTING CONTACT FORM + INFO (unchanged)
            ══════════════════════════════════════════════ */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
          gap: 40,
          marginBottom: 48,
        }}>
          {/* Left Side - Contact Information */}
          <div>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 14px",
              borderRadius: 100,
              background: "var(--badge-bg)",
              border: "1px solid var(--badge-border)",
              marginBottom: 24,
            }}>
              <div style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "var(--accent-gold)",
              }} />
              <span style={{
                fontSize: 12,
                fontWeight: 700,
                fontFamily: "var(--font-body)",
                color: "var(--accent-green)",
                letterSpacing: "0.05em",
              }}>
                SmallBiz Recon™ Support Desk
              </span>
            </div>

            <h2 style={{
              fontFamily: "var(--font-display)",
              fontSize: 32,
              fontWeight: 400,
              color: "var(--text-primary)",
              marginBottom: 16,
              lineHeight: 1.2,
              letterSpacing: "-0.01em",
            }}>
              The Smarter Way to{" "}
              <span style={{ color: "var(--accent-gold)", fontStyle: "italic" }}>Navigate the SBA.</span>
            </h2>

            <p style={{
              fontSize: 15,
              color: "var(--text-secondary)",
              lineHeight: 1.7,
              marginBottom: 32,
              fontFamily: "var(--font-body)",
            }}>
              Questions about your access code, downloads, or toolkit content? SmallBiz Recon™ helps you move fast with clear DIY guidance and support.
            </p>

            {/* Contact Information Cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{
                display: "flex",
                alignItems: "start",
                gap: 16,
                padding: 20,
                borderRadius: 16,
                background: "var(--bg-card)",
                backdropFilter: "var(--glass-blur)",
                WebkitBackdropFilter: "var(--glass-blur)",
                border: "1px solid var(--border-primary)",
              }}>
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  background: "linear-gradient(135deg, rgba(200,168,78,0.3), rgba(200,168,78,0.15))",
                  border: "1px solid rgba(200,168,78,0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <Mail size={20} color="var(--accent-gold)" />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: "var(--text-muted)",
                    marginBottom: 6,
                    letterSpacing: "0.1em",
                    fontFamily: "var(--font-body)",
                  }}>
                    EMAIL
                  </p>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    flexWrap: "wrap",
                  }}>
                    <p style={{
                      fontSize: 16,
                      color: "var(--text-primary)",
                      fontFamily: "var(--font-body)",
                      fontWeight: 500,
                    }}>
                      info@smallbizrecon.com
                    </p>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 4,
                        padding: "4px 10px",
                        background: "var(--bg-tertiary)",
                        border: "1px solid var(--border-primary)",
                        borderRadius: 8,
                        color: "var(--text-secondary)",
                        fontSize: 11,
                        fontWeight: 600,
                        fontFamily: "var(--font-body)",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.borderColor = "var(--border-hover)"}
                      onMouseLeave={(e) => e.currentTarget.style.borderColor = "var(--border-primary)"}
                    >
                      {copied ? (
                        <>
                          <Check size={12} color="var(--accent-green)" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy size={12} />
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div style={{
                display: "flex",
                alignItems: "start",
                gap: 16,
                padding: 20,
                borderRadius: 16,
                background: "var(--bg-card)",
                backdropFilter: "var(--glass-blur)",
                WebkitBackdropFilter: "var(--glass-blur)",
                border: "1px solid var(--border-primary)",
              }}>
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  background: "rgba(100,140,200,0.1)",
                  border: "1px solid rgba(100,140,200,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <MapPin size={20} color="var(--accent-blue)" />
                </div>
                <div>
                  <p style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: "var(--text-muted)",
                    marginBottom: 6,
                    letterSpacing: "0.1em",
                    fontFamily: "var(--font-body)",
                  }}>
                    LOCATION
                  </p>
                  <p style={{
                    fontSize: 16,
                    color: "var(--text-primary)",
                    fontFamily: "var(--font-body)",
                    fontWeight: 500,
                  }}>
                    Orlando, FL
                  </p>
                </div>
              </div>

              <div style={{
                display: "flex",
                alignItems: "start",
                gap: 16,
                padding: 20,
                borderRadius: 16,
                background: "var(--bg-card)",
                backdropFilter: "var(--glass-blur)",
                WebkitBackdropFilter: "var(--glass-blur)",
                border: "1px solid var(--border-primary)",
              }}>
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  background: "var(--badge-bg)",
                  border: "1px solid var(--badge-border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <Clock size={20} color="var(--accent-green)" />
                </div>
                <div>
                  <p style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: "var(--text-muted)",
                    marginBottom: 6,
                    letterSpacing: "0.1em",
                    fontFamily: "var(--font-body)",
                  }}>
                    RESPONSE TIME
                  </p>
                  <p style={{
                    fontSize: 16,
                    color: "var(--text-primary)",
                    fontFamily: "var(--font-body)",
                    fontWeight: 500,
                  }}>
                    Within 24 hours
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div>
            <div style={{
              background: "var(--bg-card)",
              backdropFilter: "var(--glass-blur)",
              WebkitBackdropFilter: "var(--glass-blur)",
              border: "1px solid var(--border-primary)",
              borderRadius: 20,
              padding: 32,
              boxShadow: "var(--shadow-card)",
            }}>
              <h2 style={{
                fontFamily: "var(--font-display)",
                fontSize: 24,
                fontWeight: 400,
                color: "var(--text-primary)",
                marginBottom: 8,
                letterSpacing: "-0.01em",
              }}>
                Contact SmallBiz Recon™
              </h2>
              <p style={{
                fontSize: 14,
                color: "var(--text-secondary)",
                marginBottom: 24,
                fontFamily: "var(--font-body)",
              }}>
                Send a message and we'll respond within 24 hours.
              </p>

              {!isSubmitted ? (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div>
                    <label
                      htmlFor="name"
                      style={{
                        display: "block",
                        fontSize: 13,
                        fontWeight: 600,
                        color: "var(--text-secondary)",
                        marginBottom: 8,
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      autoComplete="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        background: "var(--bg-tertiary)",
                        border: "1px solid var(--border-primary)",
                        borderRadius: 10,
                        color: "var(--text-primary)",
                        fontSize: 14,
                        fontFamily: "var(--font-body)",
                        outline: "none",
                        transition: "all 0.3s ease",
                      }}
                      onFocus={(e) => e.currentTarget.style.borderColor = "var(--accent-green)"}
                      onBlur={(e) => e.currentTarget.style.borderColor = "var(--border-primary)"}
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      style={{
                        display: "block",
                        fontSize: 13,
                        fontWeight: 600,
                        color: "var(--text-secondary)",
                        marginBottom: 8,
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        background: "var(--bg-tertiary)",
                        border: "1px solid var(--border-primary)",
                        borderRadius: 10,
                        color: "var(--text-primary)",
                        fontSize: 14,
                        fontFamily: "var(--font-body)",
                        outline: "none",
                        transition: "all 0.3s ease",
                      }}
                      onFocus={(e) => e.currentTarget.style.borderColor = "var(--accent-green)"}
                      onBlur={(e) => e.currentTarget.style.borderColor = "var(--border-primary)"}
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="company"
                      style={{
                        display: "block",
                        fontSize: 13,
                        fontWeight: 600,
                        color: "var(--text-secondary)",
                        marginBottom: 8,
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      Company Name{" "}
                      <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>
                        (Optional)
                      </span>
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      autoComplete="organization"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Your company or business name"
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        background: "var(--bg-tertiary)",
                        border: "1px solid var(--border-primary)",
                        borderRadius: 10,
                        color: "var(--text-primary)",
                        fontSize: 14,
                        fontFamily: "var(--font-body)",
                        outline: "none",
                        transition: "all 0.3s ease",
                      }}
                      onFocus={(e) => e.currentTarget.style.borderColor = "var(--accent-green)"}
                      onBlur={(e) => e.currentTarget.style.borderColor = "var(--border-primary)"}
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      style={{
                        display: "block",
                        fontSize: 13,
                        fontWeight: 600,
                        color: "var(--text-secondary)",
                        marginBottom: 8,
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us what you need help with, code issues, downloads, toolkit access, general questions..."
                      rows={6}
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        background: "var(--bg-tertiary)",
                        border: "1px solid var(--border-primary)",
                        borderRadius: 10,
                        color: "var(--text-primary)",
                        fontSize: 14,
                        fontFamily: "var(--font-body)",
                        outline: "none",
                        transition: "all 0.3s ease",
                        resize: "vertical",
                      }}
                      onFocus={(e) => e.currentTarget.style.borderColor = "var(--accent-green)"}
                      onBlur={(e) => e.currentTarget.style.borderColor = "var(--border-primary)"}
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  {submitError && (
                    <div style={{
                      padding: 14,
                      borderRadius: 10,
                      background: "rgba(200,80,80,0.1)",
                      border: "1px solid rgba(200,80,80,0.2)",
                    }}>
                      <p style={{
                        fontSize: 13,
                        color: "#cc6666",
                        fontFamily: "var(--font-body)",
                      }}>
                        {submitError}
                      </p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={!canSubmit}
                    style={{
                      width: "100%",
                      padding: "14px 24px",
                      background: canSubmit ? "linear-gradient(135deg, rgba(200,168,78,0.3), rgba(200,168,78,0.15))" : "var(--bg-tertiary)",
                      border: `1px solid ${canSubmit ? "rgba(200,168,78,0.25)" : "var(--border-primary)"}`,
                      borderRadius: 12,
                      color: canSubmit ? "var(--accent-gold)" : "var(--text-muted)",
                      fontSize: 15,
                      fontWeight: 600,
                      fontFamily: "var(--font-body)",
                      cursor: canSubmit ? "pointer" : "not-allowed",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                      transition: "all 0.3s ease",
                      opacity: canSubmit ? 1 : 0.6,
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <div style={{
                          width: 16,
                          height: 16,
                          border: "2px solid var(--accent-gold)",
                          borderTopColor: "transparent",
                          borderRadius: "50%",
                          animation: "spin 0.6s linear infinite",
                        }} />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Send Message
                      </>
                    )}
                  </button>

                  <p style={{
                    fontSize: 12,
                    color: "var(--text-muted)",
                    fontFamily: "var(--font-body)",
                    textAlign: "center",
                  }}>
                    SmallBiz Recon™ is an independent educational resource, not affiliated with or endorsed by the SBA.
                  </p>
                </form>
              ) : (
                <div style={{ textAlign: "center", padding: "32px 0" }}>
                  <div style={{
                    width: 64,
                    height: 64,
                    borderRadius: 16,
                    background: "var(--badge-bg)",
                    border: "1px solid var(--badge-border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 20px",
                  }}>
                    <CheckCircle size={32} color="var(--accent-green)" />
                  </div>
                  <h3 style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 24,
                    fontWeight: 400,
                    color: "var(--text-primary)",
                    marginBottom: 10,
                  }}>
                    Message Sent!
                  </h3>
                  <p style={{
                    fontSize: 15,
                    color: "var(--text-secondary)",
                    fontFamily: "var(--font-body)",
                  }}>
                    Thanks, we'll be in touch shortly.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Support Information Section */}
        <div>
          <div style={{
            textAlign: "center",
            marginBottom: 32,
          }}>
            <h2 style={{
              fontFamily: "var(--font-display)",
              fontSize: 30,
              fontWeight: 400,
              color: "var(--text-primary)",
              marginBottom: 12,
            }}>
              How We Can Help You
            </h2>
            <p style={{
              fontSize: 16,
              color: "var(--text-secondary)",
              fontFamily: "var(--font-body)",
              maxWidth: 600,
              margin: "0 auto",
            }}>
              Quick help with codes, downloads, or access issues.
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 24,
          }}>
            <div style={{
              textAlign: "center",
              padding: 24,
              borderRadius: 16,
              background: "var(--badge-bg)",
              border: "1px solid var(--badge-border)",
              transition: "all 0.3s ease",
            }}>
              <div style={{
                width: 48,
                height: 48,
                borderRadius: 14,
                background: "linear-gradient(135deg, rgba(200,168,78,0.3), rgba(200,168,78,0.15))",
                border: "1px solid rgba(200,168,78,0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
              }}>
                <Puzzle size={24} color="var(--accent-gold)" />
              </div>
              <h3 style={{
                fontFamily: "var(--font-display)",
                fontSize: 18,
                fontWeight: 400,
                color: "var(--text-primary)",
                marginBottom: 10,
              }}>
                Marketplace Code Not Working
              </h3>
              <p style={{
                fontSize: 14,
                color: "var(--text-secondary)",
                lineHeight: 1.6,
                fontFamily: "var(--font-body)",
              }}>
                We'll help troubleshoot invalid, expired, or mistyped codes so you can unlock your toolkit.
              </p>
            </div>

            <div style={{
              textAlign: "center",
              padding: 24,
              borderRadius: 16,
              background: "var(--badge-bg)",
              border: "1px solid var(--badge-border)",
              transition: "all 0.3s ease",
            }}>
              <div style={{
                width: 48,
                height: 48,
                borderRadius: 14,
                background: "linear-gradient(135deg, rgba(200,168,78,0.3), rgba(200,168,78,0.15))",
                border: "1px solid rgba(200,168,78,0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
              }}>
                <Download size={24} color="var(--accent-gold)" />
              </div>
              <h3 style={{
                fontFamily: "var(--font-display)",
                fontSize: 18,
                fontWeight: 400,
                color: "var(--text-primary)",
                marginBottom: 10,
              }}>
                Toolkit Won't Download
              </h3>
              <p style={{
                fontSize: 14,
                color: "var(--text-secondary)",
                lineHeight: 1.6,
                fontFamily: "var(--font-body)",
              }}>
                Broken link, browser conflict, or device issue, we'll walk you through a fast fix.
              </p>
            </div>

            <div style={{
              textAlign: "center",
              padding: 24,
              borderRadius: 16,
              background: "var(--badge-bg)",
              border: "1px solid var(--badge-border)",
              transition: "all 0.3s ease",
            }}>
              <div style={{
                width: 48,
                height: 48,
                borderRadius: 14,
                background: "linear-gradient(135deg, rgba(200,168,78,0.3), rgba(200,168,78,0.15))",
                border: "1px solid rgba(200,168,78,0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
              }}>
                <Wrench size={24} color="var(--accent-gold)" />
              </div>
              <h3 style={{
                fontFamily: "var(--font-display)",
                fontSize: 18,
                fontWeight: 400,
                color: "var(--text-primary)",
                marginBottom: 10,
              }}>
                Something Isn't Working
              </h3>
              <p style={{
                fontSize: 14,
                color: "var(--text-secondary)",
                lineHeight: 1.6,
                fontFamily: "var(--font-body)",
              }}>
                Missing files, loading issues, odd behavior, we'll get you back on track quickly.
              </p>
            </div>
          </div>
        </div>
      </EIDLStyleShell>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes shimmerSlide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        /* Force Calendly badge to bottom-LEFT (Sabbi is bottom-right) */
        .calendly-badge-widget {
          right: auto !important;
          left: 20px !important;
        }

        /* Consultation card responsive */
        @media (max-width: 768px) {
          .consult-grid {
            grid-template-columns: 1fr !important;
          }
          .consult-left {
            border-right: none !important;
            border-bottom: 1px solid var(--border-primary) !important;
            padding: 32px 24px !important;
          }
          .consult-right {
            padding: 32px 24px !important;
          }
        }

        /* CTA button hover */
        .consult-cta-btn:hover {
          background: linear-gradient(135deg, rgba(200,168,78,0.5), rgba(200,168,78,0.2)) !important;
          border-color: rgba(200,168,78,0.6) !important;
          box-shadow: 0 0 36px rgba(200,168,78,0.15) !important;
          transform: translateY(-2px);
        }
      `}</style>

      <ContactDisclaimer />
    </>
  );
};

export default ContactUs;