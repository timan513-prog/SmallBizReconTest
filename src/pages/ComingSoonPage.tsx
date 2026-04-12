import { Link } from 'react-router-dom';
import { Clock, Bell, Star, ExternalLink, Sparkles, Zap, Shield } from 'lucide-react';
import EIDLStyleShell from '../components/layout/EIDLStyleShell';

interface ComingSoonPageProps {
  title: string;
  description: string;
  expectedLaunch?: string;
}

const ComingSoonPage = ({
  title,
  description,
  expectedLaunch = "Coming Soon"
}: ComingSoonPageProps) => {
  return (
    <EIDLStyleShell
      title={title}
      subtitle={description}
      icon={<Clock size={30} color="#c8a84e" strokeWidth={1.5} />}
    >
      {/* Launch Status Card */}
      <div style={{
        background: "var(--bg-card)",
        backdropFilter: "var(--glass-blur)",
        WebkitBackdropFilter: "var(--glass-blur)",
        border: "1px solid var(--border-primary)",
        borderRadius: 20,
        padding: 32,
        marginBottom: 32,
        textAlign: "center",
      }}>
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "8px 20px",
          borderRadius: 100,
          background: "linear-gradient(135deg, rgba(200,168,78,0.3), rgba(200,168,78,0.15))",
          border: "1px solid rgba(200,168,78,0.25)",
          marginBottom: 20,
        }}>
          <Bell size={16} color="var(--accent-gold)" />
          <span style={{
            fontSize: 13,
            fontWeight: 700,
            fontFamily: "var(--font-body)",
            color: "var(--accent-gold)",
            letterSpacing: "0.05em",
          }}>
            {expectedLaunch}
          </span>
        </div>

        <h2 style={{
          fontFamily: "var(--font-display)",
          fontSize: 28,
          fontWeight: 400,
          color: "var(--text-primary)",
          marginBottom: 16,
          lineHeight: 1.3,
          letterSpacing: "-0.01em",
        }}>
          Building Something Special
        </h2>

        <p style={{
          fontSize: 15,
          color: "var(--text-secondary)",
          lineHeight: 1.7,
          fontFamily: "var(--font-body)",
          maxWidth: 700,
          margin: "0 auto 24px",
        }}>
          We're currently developing comprehensive, professional-grade toolkits for this SBA program. Our team of former SBA experts is building step-by-step guides, templates, and practical resources designed to help you navigate the process with clarity and confidence.
        </p>

        <Link
          to="/covid-eidl-toolkits"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "12px 28px",
            background: "var(--badge-bg)",
            border: "1px solid var(--badge-border)",
            borderRadius: 12,
            color: "var(--accent-green)",
            fontSize: 15,
            fontWeight: 600,
            fontFamily: "var(--font-body)",
            textDecoration: "none",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--bg-card-hover)";
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "var(--badge-bg)";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          Explore Available Toolkits
          <ExternalLink size={16} />
        </Link>
      </div>

      {/* Features Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: 20,
        marginBottom: 40,
      }}>
        <div style={{
          padding: 24,
          borderRadius: 16,
          background: "var(--bg-card)",
          backdropFilter: "var(--glass-blur)",
          WebkitBackdropFilter: "var(--glass-blur)",
          border: "1px solid var(--border-primary)",
          textAlign: "center",
          transition: "all 0.3s ease",
        }}>
          <div style={{
            width: 48,
            height: 48,
            borderRadius: 14,
            background: "var(--badge-bg)",
            border: "1px solid var(--badge-border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px",
          }}>
            <Star size={24} color="var(--accent-green)" />
          </div>
          <h3 style={{
            fontFamily: "var(--font-display)",
            fontSize: 18,
            fontWeight: 400,
            color: "var(--text-primary)",
            marginBottom: 8,
          }}>
            Expert-Created
          </h3>
          <p style={{
            fontSize: 14,
            color: "var(--text-secondary)",
            lineHeight: 1.6,
            fontFamily: "var(--font-body)",
          }}>
            Developed by former SBA professionals with years of insider experience
          </p>
        </div>

        <div style={{
          padding: 24,
          borderRadius: 16,
          background: "var(--bg-card)",
          backdropFilter: "var(--glass-blur)",
          WebkitBackdropFilter: "var(--glass-blur)",
          border: "1px solid var(--border-primary)",
          textAlign: "center",
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
            <Sparkles size={24} color="var(--accent-gold)" />
          </div>
          <h3 style={{
            fontFamily: "var(--font-display)",
            fontSize: 18,
            fontWeight: 400,
            color: "var(--text-primary)",
            marginBottom: 8,
          }}>
            Comprehensive
          </h3>
          <p style={{
            fontSize: 14,
            color: "var(--text-secondary)",
            lineHeight: 1.6,
            fontFamily: "var(--font-body)",
          }}>
            Complete guides with templates, checklists, and official form links
          </p>
        </div>

        <div style={{
          padding: 24,
          borderRadius: 16,
          background: "var(--bg-card)",
          backdropFilter: "var(--glass-blur)",
          WebkitBackdropFilter: "var(--glass-blur)",
          border: "1px solid var(--border-primary)",
          textAlign: "center",
          transition: "all 0.3s ease",
        }}>
          <div style={{
            width: 48,
            height: 48,
            borderRadius: 14,
            background: "rgba(100,140,200,0.1)",
            border: "1px solid rgba(100,140,200,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px",
          }}>
            <Zap size={24} color="var(--accent-blue)" />
          </div>
          <h3 style={{
            fontFamily: "var(--font-display)",
            fontSize: 18,
            fontWeight: 400,
            color: "var(--text-primary)",
            marginBottom: 8,
          }}>
            DIY Approach
          </h3>
          <p style={{
            fontSize: 14,
            color: "var(--text-secondary)",
            lineHeight: 1.6,
            fontFamily: "var(--font-body)",
          }}>
            Take control of your SBA process without expensive consultants
          </p>
        </div>
      </div>

      {/* What You'll Get Section */}
      <div style={{
        background: "var(--bg-card)",
        backdropFilter: "var(--glass-blur)",
        WebkitBackdropFilter: "var(--glass-blur)",
        border: "1px solid var(--border-primary)",
        borderRadius: 20,
        padding: 32,
        marginBottom: 40,
      }}>
        <h2 style={{
          fontFamily: "var(--font-display)",
          fontSize: 24,
          fontWeight: 400,
          color: "var(--text-primary)",
          marginBottom: 20,
          textAlign: "center",
        }}>
          What You'll Get
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {[
            "Step-by-step implementation guides written by former SBA staff",
            "Ready-to-use templates and checklists for every stage",
            "Direct links to official SBA forms and resources",
            "Real-world examples and case studies",
            "Common pitfalls and how to avoid them",
            "Expert tips from years of insider experience"
          ].map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "start",
                gap: 12,
                padding: 14,
                borderRadius: 10,
                background: "var(--bg-tertiary)",
                border: "1px solid var(--border-primary)",
              }}
            >
              <div style={{
                width: 24,
                height: 24,
                borderRadius: 6,
                background: "var(--badge-bg)",
                border: "1px solid var(--badge-border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                marginTop: 2,
              }}>
                <Shield size={14} color="var(--accent-green)" />
              </div>
              <p style={{
                fontSize: 14,
                color: "var(--text-secondary)",
                lineHeight: 1.7,
                fontFamily: "var(--font-body)",
              }}>
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter Signup */}
      <div style={{
        padding: 40,
        borderRadius: 20,
        background: "rgba(154,184,122,0.05)",
        border: "1px solid rgba(154,184,122,0.15)",
        textAlign: "center",
      }}>
        <h3 style={{
          fontFamily: "var(--font-display)",
          fontSize: 28,
          fontWeight: 400,
          color: "var(--text-primary)",
          marginBottom: 12,
        }}>
          Get Notified When It's Ready
        </h3>
        <p style={{
          fontSize: 15,
          color: "var(--text-secondary)",
          fontFamily: "var(--font-body)",
          lineHeight: 1.7,
          maxWidth: 600,
          margin: "0 auto 28px",
        }}>
          Be the first to know when our new toolkits launch. Subscribe to our newsletter for exclusive early access, toolkit updates, and insider SBA insights.
        </p>

        <a
          href="https://smallbizrecon-insider-intel.beehiiv.com/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            padding: "16px 36px",
            background: "linear-gradient(135deg, rgba(200,168,78,0.3), rgba(200,168,78,0.15))",
            border: "1px solid rgba(200,168,78,0.25)",
            borderRadius: 12,
            color: "var(--accent-gold)",
            fontSize: 16,
            fontWeight: 600,
            fontFamily: "var(--font-body)",
            textDecoration: "none",
            transition: "all 0.3s ease",
            boxShadow: "0 4px 16px rgba(200,168,78,0.15)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-3px)";
            e.currentTarget.style.boxShadow = "0 12px 32px rgba(200,168,78,0.25)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 16px rgba(200,168,78,0.15)";
          }}
        >
          <Bell size={20} />
          Subscribe for Updates
          <ExternalLink size={16} />
        </a>

        <p style={{
          fontSize: 13,
          color: "var(--text-muted)",
          fontFamily: "var(--font-body)",
          marginTop: 16,
          fontStyle: "italic",
        }}>
          Opens in a new tab • No spam, just toolkit updates
        </p>
      </div>
    </EIDLStyleShell>
  );
};

export default ComingSoonPage;
