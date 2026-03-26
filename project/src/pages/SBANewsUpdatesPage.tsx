import { useState, useMemo } from 'react';
import { Bell, Calendar, ExternalLink, Globe, Search, Filter, Tag, Clock, RefreshCw, Bot, TriangleAlert as AlertTriangle, ArrowRight } from 'lucide-react';
import EIDLStyleShell from '../components/layout/EIDLStyleShell';
import AutoNewsSection from '../components/AutoNewsSection';

interface NewsUpdate {
  date: string;
  title: string;
  summary: string;
  whyItMatters: string;
  sabbiTip: string;
  sourceLink: string;
  category: string;
}

const SBANewsUpdatesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('newest');

  const newsUpdates: NewsUpdate[] = [
    {
      date: "March 5, 2026",
      title: "Important Policy Update: SBA Recall Services & Treasury Guidance",
      summary: "The U.S. Treasury recently issued a clarification regarding COVID EIDL and COVID PPP debts transferred into the Treasury's Cross-Servicing program. Treasury explained that it does not independently return debts to the SBA in mass or on an individual basis, as it acts strictly as the federal government's collection agent. Under the Treasury Financial Manual, the original creditor agency retains ownership and ultimate authority over the debt, including whether it may be recalled or returned to agency servicing.",
      whyItMatters: "This clarification establishes that dispute packages must be submitted to Treasury while the account is active in Cross-Servicing, and recall or reinstatement requests must be directed to the SBA as the original creditor. If a debt has been placed with a private collection agency, that agency becomes the primary point of contact for disputes—not Treasury. Understanding this separation is essential for borrowers navigating the federal debt collection pipeline.",
      sabbiTip: "If you purchased a Recall / Reinstatement Only package, there is no change to that package—you may also add a discounted Treasury Dispute package. For discounted bundles that included a Recall, those packages already contain deep discounts with dispute and servicing letters valued at $500 each; you may add a Congressional DIY letter package, Ombudsman DIY letter package, Collection Agency Dispute request letter, or any current DIY package at no additional cost. For packages purchased between October 2025 and March 1, 2026, complimentary access to one Paid Guide, an Ombudsman DIY letter package, or a Congressional DIY letter package may be provided if your file has not been resolved or not returned to the SBA.",
      sourceLink: "",
      category: "Policy Update"
    },
    {
      date: "January 9, 2026",
      title: "SBA turns to Palantir after Minnesota fraud allegations spark national probe",
      summary: "The $300,000 contract comes amid the Trump administration's push to root out alleged fraud in Minnesota and eventually across the U.S..",
      whyItMatters: "The SBA's new contract with Palantir signals a major shift in how the agency is addressing suspected pandemic-loan fraud, using advanced data analytics to expand investigations nationwide after suspending nearly 7,000 Minnesota borrowers tied to roughly $400 M in potentially fraudulent PPP and EIDL loans—a move that could affect how loan compliance and fraud enforcement are handled across all SBA programs.",
      sabbiTip: "If you're a small business borrower, make sure your records for any PPP or EIDL loan are complete, transparent, and well-documented—data analytics tools like those Palantir provides can uncover discrepancies quickly, and having clean documentation will help protect you if your loan comes under review.",
      sourceLink: "https://fedscoop.com/small-business-administration-palantir-contract-minnesota-fraud/",
      category: "Disaster Fraud"
    },
    {
      date: "July 24, 2025",
      title: "S.B.A. Talks Disaster Recovery Loans",
      summary: "A video breakdown of SBA Disaster Loans Discussion.",
      whyItMatters: "How to apply for SBA Disaster loans with deadlines",
      sabbiTip: "If your small business or nonprofit is affected by a disaster, apply online at sba.gov/disaster by deadline discussed. These funds can help cover essential working capital needs.",
      sourceLink: "https://www.wtok.com/video/2025/07/25/sba-talks-disaster-recovery-loans/",
      category: "Disaster Relief"
    },
    {
      date: "July 16, 2025",
      title: "SBA offers Drought Disaster Loans for Wyoming, Idaho small businesses",
      summary: "The U.S. Small Business Administration (SBA) has announced the availability of low-interest federal Economic Injury Disaster Loans (EIDL) for small businesses and private nonprofit organizations. These loans are designed to offset economic losses caused by drought in specific counties across Wyoming, Idaho, Montana, and South Dakota.",
      whyItMatters: "This program provides crucial working capital for non-agricultural small businesses and PNPs facing financial hardships due to the drought. With favorable terms, including low interest rates and deferred payments, these EIDLs offer a vital financial lifeline for recovery in the affected regions.",
      sabbiTip: "If your small business or nonprofit is affected by the drought, apply online at sba.gov/disaster by March 9, 2026. These funds can help cover essential working capital needs.",
      sourceLink: "https://localnews8.com/news/local-news/2025/07/16/sba-offers-drought-disaster-loans-for-wyoming-idaho-small-businesses/",
      category: "Disaster Relief"
    },
    {
      date: "July 14, 2025",
      title: "SBA Launches Center for Faith, Eliminates Biden Ban on Disaster Relief for Faith Organizations",
      summary: "The U.S. Small Business Administration (SBA) has launched its new Center for Faith to improve access to capital, counseling, and government contracting for faith-based businesses, community organizations, and houses of worship. Alongside this, the SBA has eliminated a regulation from the previous administration that prohibited faith-based organizations from receiving SBA disaster loans, a ban that was previously maintained despite a Supreme Court ruling against such discrimination. This change means faith-related organizations are now immediately eligible for disaster relief.",
      whyItMatters: "This announcement signifies a significant shift in federal policy regarding faith-based organizations' access to government resources. By removing the ban on disaster relief and establishing the Center for Faith, the SBA aims to ensure religious entities receive equitable treatment and support from the agency. This is crucial for faith-based organizations that often serve as vital community hubs, especially during and after disasters, allowing them to rebuild and continue their essential services with federal assistance. It underscores a broader commitment to religious freedom and non-discrimination in federal programs.",
      sabbiTip: "Faith-based organizations, immediately check your eligibility for SBA disaster loans, as the prior ban has been lifted. Additionally, explore the new SBA Center for Faith for expanded access to capital, counseling, and government contracting opportunities.",
      sourceLink: "https://www.sba.gov/article/2025/07/14/sba-launches-center-faith-eliminates-biden-ban-disaster-relief-faith-organizations",
      category: "SBA News & Updates"
    },
    {
      date: "June 20, 2025",
      title: "Trump Administration Takes Action After Massive Fraud Uncovered in Agency",
      summary: "The Trump administration has announced sweeping reforms to SBA loan programs following the discovery of significant fraud in COVID-era relief programs. New verification procedures and oversight mechanisms will be implemented immediately.",
      whyItMatters: "These new anti-fraud measures will affect all SBA loan applications going forward. Businesses can expect more rigorous documentation requirements, longer processing times, and additional verification steps before loan approval.",
      sabbiTip: "Start gathering more comprehensive documentation than previously required, including detailed financial records going back at least three years. The new verification process will be looking for consistency in your business operations and finances.",
      sourceLink: "https://www.foxnews.com/politics/exclusive-trump-admin-takes-action-after-massive-fraud-uncovered-agency-dems-tried-protect-from-doge",
      category: "Policy & Fraud"
    },
    {
      date: "June 15, 2025",
      title: "SBA Clarifies EIDL Subordination Requirements",
      summary: "The SBA now requires a current lease agreement and 12-month rent roll when submitting EIDL subordination requests involving real estate collateral.",
      whyItMatters: "This affects COVID EIDL borrowers with real estate. Missing rent roll or lease terms will result in delays or denials.",
      sabbiTip: "Always double-check your lease terms and ensure rent roll accuracy before submitting.",
      sourceLink: "https://www.sba.gov/document/support-cesc-subordination-requirement-letter",
      category: "EIDL"
    },
    {
      date: "June 5, 2025",
      title: "SBA Launches New Fraud Review Division",
      summary: "A new division has been established within the Office of Credit Risk Management to expedite fraud review appeals for COVID EIDL disputes.",
      whyItMatters: "This creates a faster path for borrowers whose loans were flagged for potential fraud. Appeals may now be processed in 30 days instead of 90+.",
      sabbiTip: "If your EIDL was flagged, ask for a written fraud determination letter before submitting a rebuttal or appeal.",
      sourceLink: "https://www.sba.gov/about-sba/organization/performance",
      category: "Policy & Fraud"
    }
  ];

  const categories = ['All', ...Array.from(new Set(newsUpdates.map(update => update.category)))];

  const filteredAndSortedNews = useMemo(() => {
    let filtered = newsUpdates.filter(update => {
      const matchesSearch =
        update.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        update.summary.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = selectedCategory === 'All' || update.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    return filtered.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();

      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });
  }, [newsUpdates, searchTerm, selectedCategory, sortOrder]);

  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'Disaster Relief':
        return { bg: "rgba(200,80,80,0.1)", border: "rgba(200,80,80,0.2)", text: "var(--accent-red, #cc6666)" };
      case 'EIDL':
        return { bg: "rgba(100,140,200,0.1)", border: "rgba(100,140,200,0.2)", text: "var(--accent-blue)" };
      case 'Policy & Fraud':
        return { bg: "rgba(150,100,200,0.1)", border: "rgba(150,100,200,0.2)", text: "#9966cc" };
      case 'Policy Update':
        return { bg: "rgba(200,168,78,0.12)", border: "rgba(200,168,78,0.25)", text: "#cda349" };
      case '8(a) Program':
        return { bg: "var(--badge-bg)", border: "var(--badge-border)", text: "var(--accent-green)" };
      case 'General SBA':
      default:
        return { bg: "var(--bg-tertiary)", border: "var(--border-primary)", text: "var(--text-secondary)" };
    }
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSortOrder('newest');
  };

  return (
    <EIDLStyleShell
      title="SBA News & Updates"
      subtitle="Real-time SBA news, policy changes, and strategic tips—updated weekly by Sabbi."
      icon={<Bell size={30} color="#c8a84e" strokeWidth={1.5} />}
    >
      {/* ══ BREAKING NEWS HIGHLIGHT ══ */}
      <article style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 20,
        marginBottom: 32,
        border: "1px solid rgba(200,168,78,0.3)",
        background: "linear-gradient(135deg, rgba(200,168,78,0.06) 0%, rgba(6,6,8,0.98) 40%, rgba(6,6,8,0.98) 100%)",
      }}>
        <div aria-hidden="true" style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: "linear-gradient(90deg, #cda349, rgba(200,168,78,0.4), transparent)",
        }} />

        <div style={{ padding: "28px 28px 24px" }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 18,
          }}>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              padding: "5px 14px",
              borderRadius: 100,
              background: "rgba(200,168,78,0.12)",
              border: "1px solid rgba(200,168,78,0.25)",
            }}>
              <AlertTriangle size={13} style={{ color: "#cda349" }} aria-hidden="true" />
              <span style={{
                fontSize: 11,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "#cda349",
                fontFamily: "var(--font-body)",
              }}>
                Latest Update
              </span>
            </div>
            <span style={{
              fontSize: 12,
              color: "var(--text-secondary)",
              fontFamily: "var(--font-body)",
            }}>
              March 5, 2026
            </span>
          </div>

          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: 26,
            fontWeight: 400,
            color: "var(--text-primary)",
            marginBottom: 16,
            lineHeight: 1.3,
            letterSpacing: "-0.01em",
          }}>
            Important Policy Update: SBA Recall Services & Treasury Guidance
          </h2>

          <p style={{
            fontSize: 15,
            color: "var(--text-secondary)",
            lineHeight: 1.8,
            fontFamily: "var(--font-body)",
            marginBottom: 20,
          }}>
            The U.S. Treasury recently issued a clarification regarding COVID EIDL and COVID PPP debts that have been transferred into the Treasury's Cross-Servicing program. Treasury explained that it does not independently return debts to the Small Business Administration in mass or on an individual basis because Treasury acts strictly as the federal government's collection agent once a debt has been referred. Under the Treasury Financial Manual governing Cross-Servicing, the original creditor agency retains ownership and ultimate authority over the debt, including whether a debt may be recalled or returned to agency servicing. In other words, Treasury cannot simply decide to send a debt back to the SBA unless the conditions within federal debt collection procedures are met and the originating agency authorizes that action.
          </p>

          <p style={{
            fontSize: 15,
            color: "var(--text-secondary)",
            lineHeight: 1.8,
            fontFamily: "var(--font-body)",
            marginBottom: 20,
          }}>
            The clarification also addressed what happens when a debt progresses further in the federal collection pipeline. If a debt is referred to a private collection agency (PCA) through the Treasury Cross-Servicing program, Treasury itself no longer manages the active collection file. At that stage, borrowers must communicate directly with the assigned collection agency regarding payment arrangements or disputes. Borrowers whose debts remain within Treasury Cross-Servicing may still submit dispute requests to Treasury for review; however, once a debt has been placed with a contracted collection agency, that agency becomes the primary point of contact for handling disputes and collection matters.
          </p>

          <p style={{
            fontSize: 15,
            color: "var(--text-secondary)",
            lineHeight: 1.8,
            fontFamily: "var(--font-body)",
            marginBottom: 20,
          }}>
            This framework is also the reason SmallBiz Recon™ separates the submission process for different requests. Dispute packages are submitted to the U.S. Treasury because Treasury administers the Cross-Servicing collection program and reviews disputes while the account is active within that system. Recall or reinstatement requests, however, must be directed to the Small Business Administration, since the SBA remains the original creditor and retains the authority to determine whether a debt may be recalled or returned to SBA servicing.
          </p>

          <div style={{
            padding: "20px 24px",
            borderRadius: 16,
            background: "rgba(200,168,78,0.04)",
            border: "1px solid rgba(200,168,78,0.12)",
            marginBottom: 20,
          }}>
            <h3 style={{
              fontFamily: "var(--font-body)",
              fontSize: 14,
              fontWeight: 700,
              color: "#cda349",
              marginBottom: 12,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}>
              What This Means for Existing Customers
            </h3>
            <ul style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}>
              <li style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 10,
                fontSize: 14,
                color: "var(--text-secondary)",
                lineHeight: 1.7,
                fontFamily: "var(--font-body)",
              }}>
                <ArrowRight size={14} style={{ color: "#cda349", marginTop: 4, flexShrink: 0 }} aria-hidden="true" />
                <span><strong style={{ color: "var(--text-primary)" }}>Recall Only packages:</strong> If you have purchased a Recall / Reinstatement Only request package, there would be no change to that package, but you may also add a discounted Treasury Dispute package.</span>
              </li>
              <li style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 10,
                fontSize: 14,
                color: "var(--text-secondary)",
                lineHeight: 1.7,
                fontFamily: "var(--font-body)",
              }}>
                <ArrowRight size={14} style={{ color: "#cda349", marginTop: 4, flexShrink: 0 }} aria-hidden="true" />
                <span><strong style={{ color: "var(--text-primary)" }}>Discounted bundles with Recall:</strong> Our multi-service packages already contain deep discounts and contain the Treasury dispute letter and servicing letters valued at $500 each. However, you may add a Congressional DIY letter package, Ombudsman DIY letter package, Collection Agency Dispute request letter, or any of our current DIY packages at no additional cost.</span>
              </li>
              <li style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 10,
                fontSize: 14,
                color: "var(--text-secondary)",
                lineHeight: 1.7,
                fontFamily: "var(--font-body)",
              }}>
                <ArrowRight size={14} style={{ color: "#cda349", marginTop: 4, flexShrink: 0 }} aria-hidden="true" />
                <span><strong style={{ color: "var(--text-primary)" }}>Packages purchased Oct 2025 &ndash; Mar 1, 2026:</strong> Complimentary access to one Paid Guide, an Ombudsman DIY letter package, or a Congressional DIY letter package may be provided if your file has not been resolved or not returned to the SBA.</span>
              </li>
            </ul>
          </div>

          <p style={{
            fontSize: 13,
            color: "var(--text-muted)",
            fontFamily: "var(--font-body)",
            fontStyle: "italic",
          }}>
            We apologize for any inconvenience and remain dedicated to seeking a clearer resolution as the situation evolves. &mdash; THE, SmallBiz Recon
          </p>
        </div>
      </article>

      {/* Live SBA RSS Feed */}
      <AutoNewsSection />

      {/* Search and Filter Controls */}
      <div style={{
        background: "var(--bg-card)",
        backdropFilter: "var(--glass-blur)",
        WebkitBackdropFilter: "var(--glass-blur)",
        border: "1px solid var(--border-primary)",
        borderRadius: 20,
        padding: 24,
        marginBottom: 32,
      }}>
        <div style={{
          display: "flex",
          flexDirection: "row",
          gap: 16,
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 20,
          flexWrap: "wrap",
        }}>
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: 22,
            fontWeight: 400,
            color: "var(--text-primary)",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}>
            <Filter size={20} />
            Filter & Search News
          </h2>

          <button
            onClick={resetFilters}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 16px",
              background: "transparent",
              border: "1px solid var(--border-primary)",
              borderRadius: 10,
              color: "var(--accent-green)",
              fontSize: 13,
              fontWeight: 600,
              fontFamily: "var(--font-body)",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--border-hover)";
              e.currentTarget.style.background = "var(--bg-tertiary)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border-primary)";
              e.currentTarget.style.background = "transparent";
            }}
          >
            <RefreshCw size={14} />
            Reset Filters
          </button>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 16,
        }}>
          {/* Search Input */}
          <div>
            <label htmlFor="search" style={{
              display: "block",
              fontSize: 13,
              fontWeight: 600,
              color: "var(--text-secondary)",
              marginBottom: 8,
              fontFamily: "var(--font-body)",
            }}>
              Search News
            </label>
            <div style={{ position: "relative" }}>
              <Search size={16} style={{
                position: "absolute",
                left: 12,
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--text-muted)",
              }} />
              <input
                type="text"
                id="search"
                placeholder="Search by keyword..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: "100%",
                  paddingLeft: 40,
                  paddingRight: 12,
                  paddingTop: 10,
                  paddingBottom: 10,
                  border: "1px solid var(--border-primary)",
                  borderRadius: 10,
                  background: "var(--bg-tertiary)",
                  color: "var(--text-primary)",
                  fontSize: 14,
                  fontFamily: "var(--font-body)",
                  outline: "none",
                  transition: "all 0.3s ease",
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = "var(--accent-green)"}
                onBlur={(e) => e.currentTarget.style.borderColor = "var(--border-primary)"}
              />
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <label htmlFor="category" style={{
              display: "block",
              fontSize: 13,
              fontWeight: 600,
              color: "var(--text-secondary)",
              marginBottom: 8,
              fontFamily: "var(--font-body)",
            }}>
              Filter by Category
            </label>
            <div style={{ position: "relative" }}>
              <Tag size={16} style={{
                position: "absolute",
                left: 12,
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--text-muted)",
              }} />
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{
                  width: "100%",
                  paddingLeft: 40,
                  paddingRight: 12,
                  paddingTop: 10,
                  paddingBottom: 10,
                  border: "1px solid var(--border-primary)",
                  borderRadius: 10,
                  background: "var(--bg-tertiary)",
                  color: "var(--text-primary)",
                  fontSize: 14,
                  fontFamily: "var(--font-body)",
                  outline: "none",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Sort Order */}
          <div>
            <label htmlFor="sortOrder" style={{
              display: "block",
              fontSize: 13,
              fontWeight: 600,
              color: "var(--text-secondary)",
              marginBottom: 8,
              fontFamily: "var(--font-body)",
            }}>
              Sort by Date
            </label>
            <div style={{ position: "relative" }}>
              <Clock size={16} style={{
                position: "absolute",
                left: 12,
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--text-muted)",
              }} />
              <select
                id="sortOrder"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                style={{
                  width: "100%",
                  paddingLeft: 40,
                  paddingRight: 12,
                  paddingTop: 10,
                  paddingBottom: 10,
                  border: "1px solid var(--border-primary)",
                  borderRadius: 10,
                  background: "var(--bg-tertiary)",
                  color: "var(--text-primary)",
                  fontSize: 14,
                  fontFamily: "var(--font-body)",
                  outline: "none",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div style={{
          marginTop: 16,
          paddingTop: 16,
          borderTop: "1px solid var(--border-primary)",
        }}>
          <p style={{
            fontSize: 13,
            color: "var(--text-muted)",
            fontFamily: "var(--font-body)",
          }}>
            Showing {filteredAndSortedNews.length} of {newsUpdates.length} news items
            {selectedCategory !== 'All' && ` in category "${selectedCategory}"`}
            {searchTerm && ` matching "${searchTerm}"`}
          </p>
        </div>
      </div>

      {/* News Items */}
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {filteredAndSortedNews.length > 0 ? (
          filteredAndSortedNews.map((update, index) => {
            const categoryStyles = getCategoryColor(update.category);
            return (
              <div
                key={index}
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
                {/* Date and Category */}
                <div style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 16,
                }}>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "4px 12px",
                    borderRadius: 8,
                    background: "var(--bg-tertiary)",
                    border: "1px solid var(--border-primary)",
                  }}>
                    <Calendar size={14} color="var(--text-secondary)" />
                    <span style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: "var(--text-secondary)",
                      fontFamily: "var(--font-body)",
                    }}>
                      {update.date}
                    </span>
                  </div>

                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "4px 12px",
                    borderRadius: 8,
                    background: categoryStyles.bg,
                    border: `1px solid ${categoryStyles.border}`,
                  }}>
                    <Tag size={14} style={{ color: categoryStyles.text }} />
                    <span style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: categoryStyles.text,
                      fontFamily: "var(--font-body)",
                    }}>
                      {update.category}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h2 style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 20,
                  fontWeight: 400,
                  color: "var(--text-primary)",
                  marginBottom: 12,
                  lineHeight: 1.4,
                  letterSpacing: "-0.01em",
                }}>
                  {update.title}
                </h2>

                {/* Summary */}
                <p style={{
                  fontSize: 15,
                  color: "var(--text-secondary)",
                  lineHeight: 1.7,
                  marginBottom: 16,
                  fontFamily: "var(--font-body)",
                }}>
                  {update.summary}
                </p>

                {/* Why This Matters Section */}
                <div style={{
                  padding: 14,
                  borderRadius: 10,
                  background: "var(--bg-tertiary)",
                  borderLeft: "3px solid var(--accent-gold)",
                  marginBottom: 16,
                }}>
                  <p style={{
                    fontSize: 14,
                    color: "var(--text-secondary)",
                    lineHeight: 1.7,
                    fontFamily: "var(--font-body)",
                    fontStyle: "italic",
                  }}>
                    <span style={{ fontWeight: 600, fontStyle: "normal" }}>Why this matters: </span>
                    {update.whyItMatters}
                  </p>
                </div>

                {/* Sabbi Says Box */}
                <div style={{
                  padding: 14,
                  borderRadius: 10,
                  background: "rgba(154,184,122,0.08)",
                  border: "1px solid rgba(154,184,122,0.2)",
                  marginBottom: 16,
                }}>
                  <div style={{ display: "flex", alignItems: "start", gap: 10 }}>
                    <div style={{
                      width: 32,
                      height: 32,
                      borderRadius: 8,
                      background: "rgba(154,184,122,0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}>
                      <Bot size={16} color="var(--accent-green)" />
                    </div>
                    <p style={{
                      fontSize: 14,
                      color: "var(--accent-green)",
                      lineHeight: 1.7,
                      fontFamily: "var(--font-body)",
                      fontStyle: "italic",
                    }}>
                      <span style={{ fontWeight: 600, fontStyle: "normal" }}>Sabbi says:</span> {update.sabbiTip}
                    </p>
                  </div>
                </div>

                {/* Source Link */}
                {update.sourceLink && (
                  <div style={{ textAlign: "right" }}>
                    <a
                      href={update.sourceLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Read the full announcement for ${update.title} (opens in new tab)`}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        fontSize: 13,
                        fontWeight: 600,
                        color: "var(--accent-gold)",
                        textDecoration: "none",
                        fontFamily: "var(--font-body)",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.opacity = "0.7"}
                      onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
                    >
                      <Globe size={14} aria-hidden="true" />
                      Read the full announcement
                      <ExternalLink size={14} aria-hidden="true" />
                    </a>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div style={{
            background: "var(--bg-card)",
            backdropFilter: "var(--glass-blur)",
            WebkitBackdropFilter: "var(--glass-blur)",
            border: "1px solid var(--border-primary)",
            borderRadius: 16,
            padding: 48,
            textAlign: "center",
          }}>
            <div style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "var(--bg-tertiary)",
              border: "1px solid var(--border-primary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px",
            }}>
              <Search size={28} color="var(--text-muted)" />
            </div>
            <h3 style={{
              fontFamily: "var(--font-display)",
              fontSize: 22,
              fontWeight: 400,
              color: "var(--text-primary)",
              marginBottom: 10,
            }}>
              No news items found
            </h3>
            <p style={{
              fontSize: 15,
              color: "var(--text-secondary)",
              fontFamily: "var(--font-body)",
              marginBottom: 20,
            }}>
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
            <button
              onClick={resetFilters}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "12px 24px",
                background: "var(--badge-bg)",
                border: "1px solid var(--badge-border)",
                borderRadius: 12,
                color: "var(--accent-green)",
                fontSize: 14,
                fontWeight: 600,
                fontFamily: "var(--font-body)",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = "var(--bg-card-hover)"}
              onMouseLeave={(e) => e.currentTarget.style.background = "var(--badge-bg)"}
            >
              <RefreshCw size={16} />
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Newsletter Signup */}
      <div style={{
        marginTop: 48,
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
          Stay Updated with Small Business News
        </h3>
        <p style={{
          fontSize: 15,
          color: "var(--text-secondary)",
          fontFamily: "var(--font-body)",
          lineHeight: 1.7,
          maxWidth: 600,
          margin: "0 auto 24px",
        }}>
          Get the latest Small Business and SBA news, policy changes, and strategic insights delivered directly to your inbox.
          Our weekly newsletter keeps you informed about everything that matters to your SBA journey.
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
          <Bell size={18} />
          Subscribe to Updates
        </a>
      </div>
    </EIDLStyleShell>
  );
};

export default SBANewsUpdatesPage;
