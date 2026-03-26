import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, Mail, Globe, Clock, Info, ChevronDown, Building, Search, ShieldAlert, ExternalLink, ListChecks, Sun, Moon, CircleAlert as AlertCircle } from 'lucide-react';

import {
  sbaContactSections,
  advancedSBAContacts,
  SBAContactSection,
  SBAContact,
  disclaimers,
  keyNotesAndUpdates,
  pageMeta,
} from '../data/sbaContacts';

/* ═══════════════════════════════════════════
   THEME SYSTEM (CSS variables driven)
   ═══════════════════════════════════════════ */
const THEMES = {
  dark: {
    "--bg-primary": "#181c14",
    "--bg-secondary": "rgba(30, 34, 26, 0.6)",
    "--bg-tertiary": "rgba(38, 44, 32, 0.5)",
    "--bg-card": "rgba(30, 34, 26, 0.6)",
    "--bg-card-hover": "rgba(36, 42, 30, 0.7)",
    "--bg-hero": "linear-gradient(180deg, rgba(50,62,38,0.7) 0%, rgba(24,28,20,0.98) 100%)",
    "--border-primary": "rgba(154, 184, 122, 0.1)",
    "--border-hover": "rgba(154, 184, 122, 0.25)",
    "--text-primary": "#e8ede2",
    "--text-secondary": "#8a9480",
    "--text-muted": "#5a6450",
    "--accent-green": "#9ab87a",
    "--accent-green-bright": "#c8e0b4",
    "--accent-gold": "#c8a84e",
    "--glass-blur": "blur(24px)",
    "--shadow-card": "0 4px 32px rgba(0,0,0,0.2)",
    "--shadow-card-hover": "0 24px 64px rgba(0,0,0,0.35)",
    "--grid-opacity": "0.03",
    "--particle-opacity": "0.15",
    "--overlay-green": "rgba(74,120,54,0.08)",
  },
  light: {
    "--bg-primary": "#f5f3ee",
    "--bg-secondary": "rgba(255, 255, 255, 0.7)",
    "--bg-tertiary": "rgba(245, 243, 238, 0.8)",
    "--bg-card": "rgba(255, 255, 255, 0.75)",
    "--bg-card-hover": "rgba(255, 255, 255, 0.9)",
    "--bg-hero": "linear-gradient(180deg, #3d5a2a 0%, #2a3d1e 100%)",
    "--border-primary": "rgba(74, 120, 54, 0.12)",
    "--border-hover": "rgba(74, 120, 54, 0.25)",
    "--text-primary": "#1a2e12",
    "--text-secondary": "#5a6b52",
    "--text-muted": "#8a9680",
    "--accent-green": "#4A7836",
    "--accent-green-bright": "#3d6a2b",
    "--accent-gold": "#9a7a28",
    "--glass-blur": "blur(20px)",
    "--shadow-card": "0 4px 24px rgba(0,0,0,0.06)",
    "--shadow-card-hover": "0 20px 48px rgba(0,0,0,0.1)",
    "--grid-opacity": "0.04",
    "--particle-opacity": "0.1",
    "--overlay-green": "rgba(74,120,54,0.04)",
  },
};

const toTelHref = (raw: string) => {
  const digits = raw.replace(/[^+\d]/g, '');
  return digits ? `tel:${digits}` : undefined;
};

const normalize = (s: string) => s.toLowerCase().trim();

const matchesContact = (contact: SBAContact, q: string) => {
  if (!q) return true;
  const hay = [
    contact.title,
    contact.phone ?? '',
    contact.email ?? '',
    contact.hours ?? '',
    contact.notes ?? '',
    contact.website ?? '',
  ]
    .join(' ')
    .toLowerCase();
  return hay.includes(q);
};

/* ═══════════════════════════════════════════
   SUB-COMPONENTS
   ═══════════════════════════════════════════ */

function GridOverlay() {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0, opacity: "var(--grid-opacity)" }}>
      <svg width="100%" height="100%">
        <defs>
          <pattern id="contactsGrid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="var(--accent-green)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#contactsGrid)" />
      </svg>
    </div>
  );
}

function Particles() {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
      {Array.from({ length: 18 }).map((_, i) => (
        <div key={i} style={{
          position: "absolute",
          width: `${1.5 + Math.random() * 2.5}px`,
          height: `${1.5 + Math.random() * 2.5}px`,
          borderRadius: "50%",
          background: `rgba(154, 184, 122, var(--particle-opacity))`,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animation: `pFloat ${9 + Math.random() * 14}s ease-in-out infinite`,
          animationDelay: `${Math.random() * -12}s`,
        }} />
      ))}
    </div>
  );
}

const ContactCard: React.FC<{ contact: SBAContact }> = ({ contact }) => {
  const [hovered, setHovered] = useState(false);
  const telHref = contact.phone ? toTelHref(contact.phone) : undefined;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        overflow: "hidden",
        background: "var(--bg-card)",
        backdropFilter: "var(--glass-blur)",
        WebkitBackdropFilter: "var(--glass-blur)",
        border: `1px solid ${hovered ? "var(--border-hover)" : "var(--border-primary)"}`,
        borderRadius: 16,
        padding: 20,
        boxShadow: hovered ? "var(--shadow-card-hover)" : "var(--shadow-card)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: "all 0.5s cubic-bezier(0.23,1,0.32,1)",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", marginBottom: 16 }}>
        <span style={{ fontSize: 20, marginRight: 12, marginTop: 2 }}>{contact.icon}</span>
        <h4 style={{
          fontFamily: "var(--font-display)",
          fontSize: 17,
          fontWeight: 400,
          color: "var(--text-primary)",
          lineHeight: 1.3,
        }}>
          {contact.title}
        </h4>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {contact.phone && (
          <div style={{ display: "flex", alignItems: "center" }}>
            <Phone size={14} style={{ color: "var(--accent-green)", marginRight: 8, flexShrink: 0 }} />
            {telHref ? (
              <a
                href={telHref}
                style={{
                  color: "var(--text-secondary)",
                  textDecoration: "none",
                  fontSize: 14,
                  fontFamily: "var(--font-body)",
                }}
              >
                {contact.phone}
              </a>
            ) : (
              <span style={{
                color: "var(--text-secondary)",
                fontSize: 14,
                fontFamily: "var(--font-body)",
              }}>
                {contact.phone}
              </span>
            )}
          </div>
        )}

        {contact.email && (
          <div style={{ display: "flex", alignItems: "center" }}>
            <Mail size={14} style={{ color: "var(--accent-green)", marginRight: 8, flexShrink: 0 }} />
            <a
              href={`mailto:${contact.email}`}
              style={{
                color: "var(--text-secondary)",
                textDecoration: "none",
                fontSize: 14,
                fontFamily: "var(--font-body)",
                wordBreak: "break-all",
              }}
            >
              {contact.email}
            </a>
          </div>
        )}

        {contact.website && (
          <div style={{ display: "flex", alignItems: "center" }}>
            <Globe size={14} style={{ color: "var(--accent-green)", marginRight: 8, flexShrink: 0 }} />
            <a
              href={contact.website}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "var(--text-secondary)",
                textDecoration: "none",
                fontSize: 14,
                fontFamily: "var(--font-body)",
                wordBreak: "break-all",
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              Visit <ExternalLink size={12} />
            </a>
          </div>
        )}

        {contact.hours && (
          <div style={{ display: "flex", alignItems: "center" }}>
            <Clock size={14} style={{ color: "var(--accent-gold)", marginRight: 8, flexShrink: 0 }} />
            <span style={{
              color: "var(--text-secondary)",
              fontSize: 13,
              fontFamily: "var(--font-body)",
            }}>
              {contact.hours}
            </span>
          </div>
        )}

        {contact.notes && (
          <div style={{ display: "flex", alignItems: "flex-start", marginTop: 4 }}>
            <Info size={14} style={{ color: "var(--text-muted)", marginRight: 8, flexShrink: 0, marginTop: 2 }} />
            <span style={{
              color: "var(--text-muted)",
              fontSize: 13,
              fontFamily: "var(--font-body)",
              lineHeight: 1.6,
            }}>
              {contact.notes}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

const CollapsibleSection: React.FC<{
  section: SBAContactSection;
  isOpen: boolean;
  onToggle: () => void;
  filterText: string;
}> = ({ section, isOpen, onToggle, filterText }) => {
  const q = normalize(filterText);
  const filteredContacts = section.contacts.filter((c) => matchesContact(c, q));
  const hasMatches = filteredContacts.length > 0;

  if (!hasMatches) return null;

  return (
    <div style={{
      background: "var(--bg-card)",
      backdropFilter: "var(--glass-blur)",
      WebkitBackdropFilter: "var(--glass-blur)",
      borderRadius: 20,
      border: "1px solid var(--border-primary)",
      overflow: "hidden",
      boxShadow: "var(--shadow-card)",
    }}>
      <button
        onClick={onToggle}
        style={{
          width: "100%",
          padding: "20px 28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "transparent",
          border: "none",
          borderBottom: isOpen ? "1px solid var(--border-primary)" : "none",
          cursor: "pointer",
          transition: "all 0.3s ease",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{ fontSize: 28, marginRight: 16 }}>{section.icon}</span>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <h3 style={{
              fontFamily: "var(--font-display)",
              fontSize: 20,
              fontWeight: 400,
              color: "var(--text-primary)",
            }}>
              {section.title}
            </h3>
            <span style={{
              fontSize: 11,
              color: "var(--text-muted)",
              fontFamily: "var(--font-body)",
            }}>
              {filteredContacts.length} contact{filteredContacts.length === 1 ? '' : 's'}
            </span>
          </div>
        </div>

        <ChevronDown
          size={20}
          style={{
            color: "var(--text-secondary)",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s ease",
          }}
        />
      </button>

      {isOpen && (
        <div style={{ padding: 28 }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: 20,
          }}>
            {filteredContacts.map((contact) => (
              <ContactCard key={contact.id} contact={contact} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const SBAContactsPage: React.FC = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState("dark");
  const [openSections, setOpenSections] = useState<Set<string>>(new Set(['general-support']));
  const [query, setQuery] = useState('');
  const [quickFilter, setQuickFilter] = useState<string>('');

  const isDark = theme === "dark";
  const vars = THEMES[theme];

  const toggleSection = (sectionId: string) => {
    const next = new Set(openSections);
    if (next.has(sectionId)) next.delete(sectionId);
    else next.add(sectionId);
    setOpenSections(next);
  };

  const quickFilters = [
    { id: '', label: 'All' },
    { id: 'sba', label: 'SBA' },
    { id: 'treasury', label: 'Treasury' },
    { id: 'irs', label: 'IRS' },
    { id: 'eidl', label: 'EIDL' },
    { id: 'cert', label: 'Certifications' },
  ];

  const filteredSections = useMemo(() => {
    const q = normalize(query);

    return sbaContactSections.filter((section) => {
      if (!quickFilter) return true;

      const title = section.title.toLowerCase();

      if (quickFilter === 'sba') return title.includes('sba');
      if (quickFilter === 'treasury') return title.includes('treasury') || title.includes('fiscal service');
      if (quickFilter === 'irs') return title.includes('irs');
      if (quickFilter === 'eidl') return section.contacts.some((c) => (c.title + ' ' + (c.notes ?? '')).toLowerCase().includes('eidl'));
      if (quickFilter === 'cert') return title.includes('certification');
      return true;
    }).filter((section) => {
      const has = section.contacts.some((c) => matchesContact(c, q));
      return has;
    });
  }, [query, quickFilter]);

  const cssVarString = Object.entries(vars).map(([k, v]) => `${k}: ${v};`).join("\n");

  return (
    <>
      <style>{`
        :root {
          --font-display: 'Instrument Serif', Georgia, serif;
          --font-body: 'DM Sans', sans-serif;
          ${cssVarString}
        }

        @keyframes pFloat {
          0%, 100% { transform: translate(0,0) scale(1); opacity:0.3; }
          25% { transform: translate(12px,-18px) scale(1.15); opacity:0.6; }
          50% { transform: translate(-8px,-30px) scale(0.85); opacity:0.2; }
          75% { transform: translate(16px,-12px) scale(1.08); opacity:0.5; }
        }
        @keyframes fadeSlideUp {
          from { opacity:0; transform:translateY(28px); }
          to { opacity:1; transform:translateY(0); }
        }

        * { box-sizing:border-box; margin:0; padding:0; }

        .contacts-page {
          min-height:100vh;
          font-family: var(--font-body);
          background: var(--bg-primary);
          color: var(--text-primary);
          overflow-x: hidden;
          position: relative;
          transition: background 0.5s ease, color 0.4s ease;
        }
        .contacts-page::before {
          content:'';
          position:fixed; inset:0;
          background:
            radial-gradient(ellipse 70% 50% at 30% 0%, var(--overlay-green), transparent),
            radial-gradient(ellipse 50% 40% at 70% 100%, rgba(200,168,78,0.04), transparent);
          pointer-events:none; z-index:0;
          transition: background 0.5s ease;
        }

        @media (max-width: 768px) {
          .hero-title { font-size: 32px !important; }
          .hero-inner { padding: 40px 20px 56px !important; }
        }
      `}</style>

      <div className="contacts-page">
        <GridOverlay />
        <Particles />

        <div style={{ position: "relative", zIndex: 1 }}>
          {/* ════════ HERO ════════ */}
          <div style={{
            position: "relative",
            overflow: "hidden",
            background: "var(--bg-hero)",
            borderBottom: "1px solid var(--border-primary)",
            animation: "fadeSlideUp 0.7s ease-out both",
          }}>
            <div style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 320,
              height: 320,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(74,120,54,0.12) 0%, transparent 65%)",
              pointerEvents: "none",
            }} />

            <div className="hero-inner" style={{
              maxWidth: 1200,
              margin: "0 auto",
              padding: "48px 32px 72px",
              position: "relative",
              zIndex: 1,
            }}>
              {/* Top bar */}
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 56,
              }}>
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    background: "none",
                    border: "none",
                    color: "#c8e0b4",
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: "pointer",
                    fontFamily: "var(--font-body)",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = "#e8ede2"}
                  onMouseLeave={(e) => e.currentTarget.style.color = "#c8e0b4"}
                >
                  <ArrowLeft size={16} />
                  Back to Last
                </button>
                <button
                  type="button"
                  onClick={() => setTheme(isDark ? "light" : "dark")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "8px 16px",
                    borderRadius: 12,
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#c8e0b4",
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                    fontFamily: "var(--font-body)",
                    transition: "all 0.3s ease",
                  }}
                >
                  {isDark ? <Sun size={14} /> : <Moon size={14} />}
                  {isDark ? "Light" : "Dark"}
                </button>
              </div>

              {/* Icon */}
              <div style={{
                width: 68,
                height: 68,
                borderRadius: 20,
                background: "linear-gradient(135deg, rgba(200,168,78,0.2), rgba(200,168,78,0.08))",
                border: "1px solid rgba(200,168,78,0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 28px",
              }}>
                <Phone size={30} color="#c8a84e" strokeWidth={1.5} />
              </div>

              <h1 className="hero-title" style={{
                fontFamily: "var(--font-display)",
                fontSize: 50,
                fontWeight: 400,
                textAlign: "center",
                color: "#e8ede2",
                lineHeight: 1.12,
                letterSpacing: "-0.02em",
                marginBottom: 16,
              }}>
                SBA{" "}
                <span style={{ fontStyle: "italic", color: "#c8a84e" }}>Contact Directory</span>
              </h1>

              <div style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                marginBottom: 20,
              }}>
                <span style={{
                  padding: "5px 14px",
                  borderRadius: 100,
                  background: "rgba(0,0,0,0.2)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  fontSize: 11,
                  color: "#EDEDED",
                  fontFamily: "var(--font-body)",
                }}>
                  {pageMeta.lastReviewedLabel}
                </span>
              </div>

              <p style={{
                textAlign: "center",
                fontSize: 16,
                color: "rgba(232,237,226,0.6)",
                lineHeight: 1.75,
                maxWidth: 600,
                margin: "0 auto 32px",
              }}>
                {pageMeta.subtitle}
              </p>

              {/* Search */}
              <div style={{ maxWidth: 720, margin: "0 auto" }}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: 16,
                  padding: "12px 20px",
                  backdropFilter: "blur(8px)",
                }}>
                  <Search size={20} style={{ color: "#EDEDED" }} />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search contacts, departments, or services..."
                    style={{
                      width: "100%",
                      background: "transparent",
                      outline: "none",
                      border: "none",
                      color: "#EDEDED",
                      fontSize: 15,
                      fontFamily: "var(--font-body)",
                    }}
                  />
                </div>

                {/* Quick filter chips */}
                <div style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 8,
                  justifyContent: "center",
                  marginTop: 16,
                }}>
                  {quickFilters.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setQuickFilter(f.id)}
                      style={{
                        padding: "5px 14px",
                        borderRadius: 100,
                        fontSize: 12,
                        fontWeight: 600,
                        border: `1px solid ${quickFilter === f.id ? "rgba(200,168,78,0.5)" : "rgba(255,255,255,0.15)"}`,
                        background: quickFilter === f.id ? "rgba(200,168,78,0.2)" : "rgba(255,255,255,0.05)",
                        color: quickFilter === f.id ? "#c8a84e" : "#EDEDED",
                        cursor: "pointer",
                        fontFamily: "var(--font-body)",
                        transition: "all 0.3s ease",
                      }}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Top Disclaimer */}
              <div style={{
                marginTop: 40,
                maxWidth: 900,
                margin: "40px auto 0",
                background: "rgba(0,0,0,0.2)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 20,
                padding: 24,
              }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <ShieldAlert size={20} style={{ color: "#c8a84e", marginTop: 2, flexShrink: 0 }} />
                  <div>
                    <h3 style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 16,
                      fontWeight: 400,
                      marginBottom: 12,
                      color: "#e8ede2",
                    }}>
                      Disclosure
                    </h3>
                    <p style={{
                      fontSize: 14,
                      color: "#EDEDED",
                      lineHeight: 1.7,
                      fontFamily: "var(--font-body)",
                    }}>
                      {disclaimers.top}
                    </p>

                    <div style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 12,
                      marginTop: 12,
                      fontSize: 14,
                    }}>
                      {disclaimers.officialLinks.map((l) => (
                        <a
                          key={l.label}
                          href={l.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 6,
                            textDecoration: "underline",
                            color: "#EDEDED",
                            fontFamily: "var(--font-body)",
                          }}
                        >
                          {l.label} <ExternalLink size={12} />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ════════ CONTENT ════════ */}
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "56px 24px 80px" }}>

            {/* Key Notes */}
            <div style={{
              marginBottom: 48,
              padding: 32,
              borderRadius: 20,
              background: "var(--bg-card)",
              backdropFilter: "var(--glass-blur)",
              border: "1px solid var(--border-primary)",
              animation: "fadeSlideUp 0.7s ease-out 0.1s both",
            }}>
              <div style={{ display: "flex", alignItems: "center", marginBottom: 20 }}>
                <ListChecks size={24} style={{ color: "var(--accent-green)", marginRight: 12 }} />
                <h2 style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 24,
                  fontWeight: 400,
                  color: "var(--text-primary)",
                }}>
                  Key Notes & Updates
                </h2>
              </div>
              <ul style={{
                listStyle: "disc",
                paddingLeft: 24,
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}>
                {keyNotesAndUpdates.map((n) => (
                  <li
                    key={n.id}
                    style={{
                      color: "var(--text-secondary)",
                      fontSize: 14,
                      lineHeight: 1.7,
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    {n.text}
                  </li>
                ))}
              </ul>
            </div>

            {/* Sections */}
            <div style={{ display: "flex", flexDirection: "column", gap: 24, marginBottom: 48 }}>
              {filteredSections.map((section, i) => (
                <div
                  key={section.id}
                  style={{ animation: `fadeSlideUp 0.7s ease-out ${0.15 + i * 0.08}s both` }}
                >
                  <CollapsibleSection
                    section={section}
                    isOpen={openSections.has(section.id)}
                    onToggle={() => toggleSection(section.id)}
                    filterText={query}
                  />
                </div>
              ))}
            </div>

            {/* Advanced Department Contacts */}
            <div style={{
              padding: 32,
              borderRadius: 20,
              background: "var(--bg-card)",
              backdropFilter: "var(--glass-blur)",
              border: "1px solid var(--border-primary)",
              marginBottom: 48,
              animation: "fadeSlideUp 0.7s ease-out 0.4s both",
            }}>
              <div style={{ display: "flex", alignItems: "center", marginBottom: 24 }}>
                <Building size={24} style={{ color: "var(--accent-green)", marginRight: 12 }} />
                <h2 style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 24,
                  fontWeight: 400,
                  color: "var(--text-primary)",
                }}>
                  Advanced Department Contacts
                </h2>
              </div>

              <p style={{
                color: "var(--text-secondary)",
                fontSize: 14,
                marginBottom: 24,
                fontFamily: "var(--font-body)",
              }}>
                Direct contact numbers for specialized SBA departments and offices.
              </p>

              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                gap: 16,
              }}>
                {advancedSBAContacts.map((contact) => {
                  const telHref = toTelHref(contact.phone);
                  return (
                    <div
                      key={contact.id}
                      style={{
                        padding: 16,
                        borderRadius: 12,
                        background: "var(--bg-secondary)",
                        border: "1px solid var(--border-primary)",
                        transition: "all 0.3s ease",
                      }}
                    >
                      <h4 style={{
                        fontFamily: "var(--font-display)",
                        fontSize: 15,
                        fontWeight: 400,
                        color: "var(--text-primary)",
                        marginBottom: 8,
                        lineHeight: 1.3,
                      }}>
                        {contact.department}
                      </h4>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Phone size={12} style={{ color: "var(--accent-green)", marginRight: 8 }} />
                        {telHref ? (
                          <a
                            href={telHref}
                            style={{
                              color: "var(--text-secondary)",
                              textDecoration: "none",
                              fontSize: 13,
                              fontFamily: "var(--font-body)",
                            }}
                          >
                            {contact.phone}
                          </a>
                        ) : (
                          <span style={{
                            color: "var(--text-secondary)",
                            fontSize: 13,
                            fontFamily: "var(--font-body)",
                          }}>
                            {contact.phone}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Footer Disclaimer */}
            <div style={{
              padding: 28,
              borderRadius: 16,
              background: "var(--bg-tertiary)",
              border: "1px solid var(--border-primary)",
              animation: "fadeSlideUp 0.7s ease-out 0.5s both",
            }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <div style={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  background: "var(--accent-green)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  marginTop: 2,
                }}>
                  <AlertCircle size={14} style={{ color: "#fff" }} />
                </div>
                <div>
                  <h4 style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 16,
                    color: "var(--text-primary)",
                    marginBottom: 8,
                  }}>
                    Important Note
                  </h4>
                  <p style={{
                    color: "var(--text-secondary)",
                    fontSize: 13,
                    lineHeight: 1.7,
                    fontFamily: "var(--font-body)",
                  }}>
                    {disclaimers.bottom}{' '}
                    For official information, visit{' '}
                    <a
                      href="https://www.sba.gov"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "var(--accent-green)",
                        textDecoration: "underline",
                      }}
                    >
                      SBA.gov
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SBAContactsPage;
