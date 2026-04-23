import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const PILLARS = [
  {
    number: "01",
    label: "Who we are",
    body:
      "A veteran-owned team of former SBA professionals. We spent years on the inside of loan servicing — now we work for the borrower, not the agency.",
  },
  {
    number: "02",
    label: "What we do",
    body:
      "We translate SBA notices into plain English, prepare the paperwork the right way, and help you see every option on the table — disputes, recalls, payment plans, subordinations.",
  },
  {
    number: "03",
    label: "What we don't do",
    body:
      "We don't sell you contracts you don't need. We don't hide behind legal jargon. We don't pretend a 30-minute call is the same as a five-figure retainer.",
  },
];

const STATS = [
  { value: "15,000+", label: "SBA cases reviewed" },
  { value: "Veteran", label: "Owned & operated" },
  { value: "Former", label: "SBA professionals" },
];

export default function OurMission() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    // Respect reduced-motion: show immediately, skip observer.
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setRevealed(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -80px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .sbr-mission-section {
          position: relative;
          padding: clamp(80px, 10vw, 128px) 20px;
          background: var(--color-bg);
          overflow: hidden;
        }
        .sbr-mission-wash {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(
              ellipse 80% 60% at 15% 20%,
              rgba(59, 74, 44, 0.04) 0%,
              transparent 60%
            ),
            radial-gradient(
              ellipse 60% 50% at 90% 100%,
              rgba(191, 155, 48, 0.05) 0%,
              transparent 55%
            );
          pointer-events: none;
        }
        .sbr-mission-grid {
          position: relative;
          max-width: 1080px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 7fr 5fr;
          gap: clamp(40px, 6vw, 88px);
          align-items: start;
        }
        .sbr-mission-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-body);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--color-brand-green);
          margin-bottom: 28px;
        }
        .sbr-mission-eyebrow::before {
          content: '';
          width: 28px;
          height: 1px;
          background: var(--color-gold);
        }
        .sbr-mission-quote {
          font-family: var(--font-display);
          font-weight: 400;
          font-size: clamp(1.75rem, 4.2vw, 2.75rem);
          line-height: 1.12;
          letter-spacing: -0.025em;
          color: var(--color-text);
          margin: 0 0 32px;
          max-width: 18ch;
        }
        .sbr-mission-quote em {
          font-style: italic;
          color: var(--color-brand-green);
        }
        .sbr-mission-lede {
          font-family: var(--font-body);
          font-size: clamp(0.95rem, 1.7vw, 1.0625rem);
          line-height: 1.75;
          color: var(--color-text-secondary);
          max-width: 44ch;
          margin: 0 0 36px;
        }
        .sbr-mission-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-body);
          font-size: 14px;
          font-weight: 600;
          color: var(--color-brand-green);
          text-decoration: none;
          padding-bottom: 3px;
          border-bottom: 1px solid var(--color-border);
          transition: border-color 0.25s ease, gap 0.25s ease;
        }
        .sbr-mission-link:hover {
          border-color: var(--color-brand-green);
          gap: 12px;
        }
        .sbr-mission-pillars {
          display: flex;
          flex-direction: column;
          gap: 28px;
          padding-top: 6px;
          list-style: none;
          margin: 0;
          padding-left: 0;
        }
        .sbr-mission-pillar {
          display: grid;
          grid-template-columns: 44px 1fr;
          gap: 18px;
          padding-bottom: 24px;
          border-bottom: 1px solid var(--color-border-light);
        }
        .sbr-mission-pillar:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }
        .sbr-mission-num {
          font-family: var(--font-display);
          font-style: italic;
          font-size: 20px;
          color: var(--color-gold);
          line-height: 1;
          padding-top: 4px;
          letter-spacing: -0.02em;
        }
        .sbr-mission-label {
          font-family: var(--font-body);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--color-text);
          margin: 0 0 8px;
        }
        .sbr-mission-body {
          font-family: var(--font-body);
          font-size: 14.5px;
          line-height: 1.7;
          color: var(--color-text-secondary);
          margin: 0;
        }
        .sbr-mission-stats {
          position: relative;
          max-width: 1080px;
          margin: clamp(48px, 7vw, 80px) auto 0;
          padding-top: clamp(28px, 4vw, 40px);
          border-top: 1px solid var(--color-border-light);
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .sbr-mission-stats > div { padding: 0; }
        .sbr-mission-stat-value {
          font-family: var(--font-display);
          font-size: clamp(1.6rem, 3vw, 2.1rem);
          font-weight: 400;
          color: var(--color-text);
          line-height: 1;
          letter-spacing: -0.02em;
          margin-bottom: 8px;
        }
        .sbr-mission-stat-label {
          font-family: var(--font-body);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--color-text-muted);
          line-height: 1.4;
        }

        /* Reveal choreography */
        .sbr-reveal {
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .sbr-reveal.is-visible { opacity: 1; transform: none; }
        .sbr-reveal-d1 { transition-delay: 0.05s; }
        .sbr-reveal-d2 { transition-delay: 0.15s; }
        .sbr-reveal-d3 { transition-delay: 0.25s; }
        .sbr-reveal-d4 { transition-delay: 0.35s; }
        .sbr-reveal-d5 { transition-delay: 0.45s; }
        .sbr-reveal-d6 { transition-delay: 0.55s; }

        @media (max-width: 820px) {
          .sbr-mission-grid {
            grid-template-columns: 1fr;
            gap: 48px;
          }
          .sbr-mission-quote { max-width: 22ch; }
        }
        @media (max-width: 560px) {
          .sbr-mission-stats {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }
      `}</style>

      <section
        ref={sectionRef}
        aria-labelledby="mission-heading"
        className="sbr-mission-section"
      >
        <div className="sbr-mission-wash" aria-hidden="true" />

        <div className="sbr-mission-grid">
          <div>
            <div className={`sbr-mission-eyebrow sbr-reveal sbr-reveal-d1 ${revealed ? "is-visible" : ""}`}>
              Our mission
            </div>

            <h2
              id="mission-heading"
              className={`sbr-mission-quote sbr-reveal sbr-reveal-d2 ${revealed ? "is-visible" : ""}`}
            >
              We help borrowers read the letter they were{" "}
              <em>never meant to understand.</em>
            </h2>

            <p className={`sbr-mission-lede sbr-reveal sbr-reveal-d3 ${revealed ? "is-visible" : ""}`}>
              SBA servicing is a maze of acronyms, forms, and form-letters — built
              for the agency, not for you. SmallBiz Recon is the team that walks
              the maze with you, starting with the notice in your hand and ending
              with a plan you actually understand.
            </p>

            <Link
              to="/contact"
              className={`sbr-mission-link sbr-reveal sbr-reveal-d4 ${revealed ? "is-visible" : ""}`}
            >
              More about who we are
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>

          <ol className="sbr-mission-pillars" aria-label="What SmallBiz Recon stands for">
            {PILLARS.map((pillar, i) => (
              <li
                key={pillar.number}
                className={`sbr-mission-pillar sbr-reveal sbr-reveal-d${i + 3} ${revealed ? "is-visible" : ""}`}
              >
                <span className="sbr-mission-num" aria-hidden="true">
                  {pillar.number}
                </span>
                <div>
                  <h3 className="sbr-mission-label">{pillar.label}</h3>
                  <p className="sbr-mission-body">{pillar.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <dl className="sbr-mission-stats" aria-label="SmallBiz Recon at a glance">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`sbr-reveal sbr-reveal-d${i + 4} ${revealed ? "is-visible" : ""}`}
            >
              <dt className="sr-only">{stat.label}</dt>
              <dd style={{ margin: 0 }}>
                <div className="sbr-mission-stat-value">{stat.value}</div>
                <div className="sbr-mission-stat-label">{stat.label}</div>
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}
