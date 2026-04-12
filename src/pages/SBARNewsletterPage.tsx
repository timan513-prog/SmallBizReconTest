import { useState } from 'react';
import { Calendar, Download, Mail, FileText } from 'lucide-react';
import EIDLStyleShell from '../components/layout/EIDLStyleShell';

interface NewsletterItem {
  id: string;
  title: string;
  date: string;
  description: string;
  embedUrl?: string;
  pdfUrl?: string;
}

const SBARNewsletterPage = () => {
  const [newsletters] = useState<NewsletterItem[]>([
    {
      id: 'welcome-january-2026',
      title: 'Welcome to SmallBiz Recon™',
      date: 'January 2026',
      description: 'Our inaugural newsletter introducing SmallBiz Recon™ and our mission to help small businesses navigate SBA and other Small Business processes.',
      embedUrl: 'https://www.canva.com/design/DAGtS24LLb4/KG6QwmPAcV9uDzpPn6gVaw/view?embed'
    }
  ]);

  return (
    <EIDLStyleShell
      title="SmallBiz Recon Intel Newsletter"
      subtitle="Stay informed with the latest SBA updates, insights, and strategies from our team of former SBA professionals."
      icon={<FileText size={30} color="#c8a84e" strokeWidth={1.5} />}
    >
      {/* Newsletter Archive */}
      <div style={{ marginBottom: 48 }}>
        <h2 style={{
          fontFamily: "var(--font-display)",
          fontSize: 28,
          fontWeight: 400,
          color: "var(--text-primary)",
          marginBottom: 24,
        }}>
          Newsletter Archive
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {newsletters.map((newsletter) => (
            <div
              key={newsletter.id}
              style={{
                background: "var(--bg-card)",
                backdropFilter: "var(--glass-blur)",
                WebkitBackdropFilter: "var(--glass-blur)",
                border: "1px solid var(--border-primary)",
                borderRadius: 16,
                padding: 24,
                transition: "all 0.3s ease",
              }}
            >
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 16,
              }}>
                <Calendar size={16} color="var(--accent-gold)" />
                <span style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "var(--text-secondary)",
                  fontFamily: "var(--font-body)",
                }}>
                  {newsletter.date}
                </span>
              </div>

              <h3 style={{
                fontFamily: "var(--font-display)",
                fontSize: 22,
                fontWeight: 400,
                color: "var(--text-primary)",
                marginBottom: 12,
                letterSpacing: "-0.01em",
              }}>
                {newsletter.title}
              </h3>

              <p style={{
                fontSize: 15,
                color: "var(--text-secondary)",
                lineHeight: 1.7,
                marginBottom: 20,
                fontFamily: "var(--font-body)",
              }}>
                {newsletter.description}
              </p>

              {newsletter.embedUrl && (
                <div style={{ marginBottom: 20 }}>
                  <div style={{
                    position: "relative",
                    width: "100%",
                    paddingBottom: "100%",
                    overflow: "hidden",
                    borderRadius: 12,
                    border: "1px solid var(--border-primary)",
                    boxShadow: "var(--shadow-card)",
                  }}>
                    <iframe
                      loading="lazy"
                      style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        border: 0,
                      }}
                      title="SmallBiz Recon Newsletter Embed"
                      src={newsletter.embedUrl}
                      allowFullScreen
                      allow="fullscreen"
                    />
                  </div>
                  <a
                    href="https://www.canva.com/design/DAGtS24LLb4/KG6QwmPAcV9uDzpPn6gVaw/view"
                    target="_blank"
                    rel="noopener"
                    style={{
                      display: "inline-block",
                      marginTop: 12,
                      fontSize: 13,
                      color: "var(--accent-green)",
                      textDecoration: "none",
                      fontFamily: "var(--font-body)",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.textDecoration = "underline"}
                    onMouseLeave={(e) => e.currentTarget.style.textDecoration = "none"}
                  >
                    {newsletter.title}
                  </a>
                  {" "}
                  <span style={{
                    fontSize: 13,
                    color: "var(--text-muted)",
                    fontFamily: "var(--font-body)",
                  }}>
                    by Recon11 Global Systems, LLC.
                  </span>
                </div>
              )}

              <div style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 12,
              }}>
                {newsletter.pdfUrl && (
                  <a
                    href={newsletter.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "10px 20px",
                      background: "linear-gradient(135deg, rgba(200,168,78,0.3), rgba(200,168,78,0.15))",
                      border: "1px solid rgba(200,168,78,0.25)",
                      borderRadius: 10,
                      color: "var(--accent-gold)",
                      fontSize: 14,
                      fontWeight: 600,
                      fontFamily: "var(--font-body)",
                      textDecoration: "none",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
                    onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
                  >
                    <Download size={16} />
                    Download PDF
                  </a>
                )}

                <a
                  href="https://smallbizrecon-insider-intel.beehiiv.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "10px 20px",
                    background: "var(--badge-bg)",
                    border: "1px solid var(--badge-border)",
                    borderRadius: 10,
                    color: "var(--accent-green)",
                    fontSize: 14,
                    fontWeight: 600,
                    fontFamily: "var(--font-body)",
                    textDecoration: "none",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "var(--bg-card-hover)"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "var(--badge-bg)"}
                >
                  <Mail size={16} />
                  Subscribe to Newsletter
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SmallBiz Recon Message Board */}
      <div style={{ marginBottom: 48 }}>
        <h2 style={{
          fontFamily: "var(--font-display)",
          fontSize: 28,
          fontWeight: 400,
          color: "var(--text-primary)",
          marginBottom: 24,
        }}>
          SmallBiz Recon Message Board
        </h2>

        <div style={{
          background: "var(--bg-card)",
          backdropFilter: "var(--glass-blur)",
          WebkitBackdropFilter: "var(--glass-blur)",
          border: "1px solid var(--border-primary)",
          borderRadius: 16,
          padding: 24,
          transition: "all 0.3s ease",
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 20,
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
            }}>
              <FileText size={20} color="var(--accent-green)" />
            </div>
            <div>
              <h3 style={{
                fontFamily: "var(--font-display)",
                fontSize: 18,
                fontWeight: 400,
                color: "var(--text-primary)",
              }}>
                Latest Updates
              </h3>
              <p style={{
                fontSize: 13,
                color: "var(--text-muted)",
                fontFamily: "var(--font-body)",
              }}>
                January 10, 2026
              </p>
            </div>
          </div>

          <div style={{
            fontSize: 15,
            color: "var(--text-secondary)",
            lineHeight: 1.8,
            fontFamily: "var(--font-body)",
          }}>
            <p style={{ marginBottom: 16 }}>
              Welcome to the SmallBiz Recon Message Board! This is where we'll post important updates, announcements, and insights about SBA programs and our toolkits.
            </p>

            <p style={{ marginBottom: 16 }}>
              Stay tuned for regular updates from our team of former SBA professionals. We're committed to providing you with the most accurate and helpful information to navigate your SBA journey.
            </p>

            <p>
              Have questions or suggestions?{" "}
              <a
                href="/contact"
                style={{
                  color: "var(--accent-green)",
                  textDecoration: "none",
                  fontWeight: 600,
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => e.currentTarget.style.textDecoration = "underline"}
                onMouseLeave={(e) => e.currentTarget.style.textDecoration = "none"}
              >
                Contact us
              </a>
              {" "}anytime.
            </p>
          </div>
        </div>
      </div>

      {/* Subscribe Section */}
      <div style={{
        padding: 32,
        borderRadius: 20,
        background: "rgba(154,184,122,0.05)",
        border: "1px solid rgba(154,184,122,0.15)",
        textAlign: "center",
      }}>
        <h3 style={{
          fontFamily: "var(--font-display)",
          fontSize: 26,
          fontWeight: 400,
          color: "var(--text-primary)",
          marginBottom: 12,
        }}>
          Never Miss an Update
        </h3>
        <p style={{
          fontSize: 15,
          color: "var(--text-secondary)",
          fontFamily: "var(--font-body)",
          lineHeight: 1.7,
          maxWidth: 600,
          margin: "0 auto 24px",
        }}>
          Subscribe to our newsletter to receive the latest SBA and Small Business insights, toolkit updates, and exclusive content directly in your inbox.
        </p>

        <a
          href="https://smallbizrecon-insider-intel.beehiiv.com/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "14px 32px",
            background: "linear-gradient(135deg, rgba(200,168,78,0.3), rgba(200,168,78,0.15))",
            border: "1px solid rgba(200,168,78,0.25)",
            borderRadius: 12,
            color: "var(--accent-gold)",
            fontSize: 15,
            fontWeight: 600,
            fontFamily: "var(--font-body)",
            textDecoration: "none",
            transition: "all 0.3s ease",
            boxShadow: "0 2px 12px rgba(200,168,78,0.1)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 8px 28px rgba(200,168,78,0.2)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 2px 12px rgba(200,168,78,0.1)";
          }}
        >
          <Mail size={18} />
          Subscribe Now
        </a>
      </div>
    </EIDLStyleShell>
  );
};

export default SBARNewsletterPage;
