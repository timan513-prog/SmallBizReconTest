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
  { value: "100%", label: "Veteran-owned" },
  { value: "Est. 2022", label: "Former SBA professionals" },
];

export default function OurMission() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

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
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .sbr-mission-section {
          position: relative;
          padding: clamp(88px, 12vw, 144px) 20px clamp(72px, 10vw, 120px);
          background: var(--color-brand-green);
          color: #F5F3EE;
          overflow: hidden;
          isolation: isolate;
        }
        .sbr-mission-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 70% 50% at 10% 10%, rgba(191, 155, 48, 0.10) 0%, transparent 55%),
            radial-gradient(ellipse 60% 50% at 100% 100%, rgba(191, 155, 48, 0.06) 0%, transparent 60%);
          pointer-events: none;
          z-index: 0;
        }
        .sbr-mission-section::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            radial-gradient(circle at 1px 1px, rgba(245, 243, 238, 0.045) 1px, transparent 0);
          background-size: 3px 3px;
          mix-blend-mode: overlay;
          pointer-events: none;
          z-index: 0;
        }

        /* Animated gold hairline at top */
        .sbr-mission-hairline {
          position: absolute;
          top: 0;
          left: 0;
          height: 1px;
          width: 100%;
          background: linear-gradient(90deg,
            transparent 0%,
            rgba(191, 155, 48, 0.0) 5%,
            var(--color-gold) 20%,
            var(--color-gold-muted, #D4B96A) 50%,
            var(--color-gold) 80%,
            rgba(191, 155, 48, 0.0) 95%,
            transparent 100%);
          transform: scaleX(0);
          transform-origin: center;
          transition: transform 1.4s cubic-bezier(0.2, 0.7, 0.2, 1);
          z-index: 2;
        }
        .sbr-mission-section.is-visible .sbr-mission-hairline { transform: scaleX(1); }

        /* Vertical side rail */
        .sbr-mission-rail {
          position: absolute;
          left: clamp(16px, 2.4vw, 40px);
          top: 50%;
          transform: translateY(-50%) rotate(180deg);
          writing-mode: vertical-rl;
          font-family: var(--font-body);
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: rgba(245, 243, 238, 0.35);
          z-index: 1;
          white-space: nowrap;
        }
        .sbr-mission-rail::before {
          content: '';
          display: inline-block;
          width: 1px;
          height: 40px;
          background: rgba(191, 155, 48, 0.6);
          margin-bottom: 18px;
          margin-left: 4px;
        }

        .sbr-mission-inner {
          position: relative;
          max-width: 1160px;
          margin: 0 auto;
          z-index: 1;
        }

        .sbr-mission-top {
          display: grid;
          grid-template-columns: 5fr 7fr;
          gap: clamp(36px, 5vw, 72px);
          align-items: center;
          margin-bottom: clamp(60px, 8vw, 96px);
        }

        /* Founder photo — duotone */
        .sbr-mission-photo {
          position: relative;
          aspect-ratio: 4 / 5;
          border-radius: 2px;
          overflow: hidden;
          box-shadow:
            0 30px 60px rgba(0, 0, 0, 0.35),
            0 10px 20px rgba(0, 0, 0, 0.25);
        }
        .sbr-mission-photo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: grayscale(1) contrast(1.05) brightness(0.95);
          display: block;
        }
        .sbr-mission-photo::after {
          content: '';
          position: absolute;
          inset: 0;
          background:
            linear-gradient(135deg, rgba(59, 74, 44, 0.55) 0%, rgba(191, 155, 48, 0.35) 100%);
          mix-blend-mode: multiply;
          pointer-events: none;
        }
        .sbr-mission-photo::before {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(59, 74, 44, 0.25);
          mix-blend-mode: color;
          pointer-events: none;
          z-index: 1;
        }
        .sbr-mission-photo-caption {
          position: absolute;
          bottom: 16px;
          left: 16px;
          right: 16px;
          z-index: 2;
          font-family: var(--font-body);
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(245, 243, 238, 0.75);
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .sbr-mission-photo-caption::before {
          content: '';
          width: 20px; height: 1px;
          background: var(--color-gold);
        }

        /* Headline column */
        .sbr-mission-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          font-family: var(--font-body);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--color-gold);
          margin-bottom: 28px;
        }
        .sbr-mission-eyebrow::before {
          content: '';
          width: 36px;
          height: 1px;
          background: var(--color-gold);
        }
        .sbr-mission-quote {
          font-family: var(--font-display);
          font-weight: 400;
          font-size: clamp(2rem, 5.6vw, 3.6rem);
          line-height: 1.05;
          letter-spacing: -0.028em;
          color: #F5F3EE;
          margin: 0 0 32px;
          max-width: 18ch;
        }
        .sbr-mission-quote em {
          font-style: italic;
          color: var(--color-gold-muted, #D4B96A);
        }

        /* Drop cap on lede */
        .sbr-mission-lede {
          font-family: var(--font-body);
          font-size: clamp(1rem, 1.7vw, 1.125rem);
          line-height: 1.75;
          color: rgba(245, 243, 238, 0.82);
          max-width: 48ch;
          margin: 0 0 40px;
        }
        .sbr-mission-lede::first-letter {
          font-family: var(--font-display);
          font-style: italic;
          font-size: 3.6em;
          line-height: 0.9;
          float: left;
          margin: 0.14em 0.12em 0 -0.04em;
          color: var(--color-gold);
          font-weight: 400;
        }

        .sbr-mission-link {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-body);
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.02em;
          color: #F5F3EE;
          text-decoration: none;
          padding-bottom: 4px;
          border-bottom: 1px solid rgba(245, 243, 238, 0.3);
          transition: border-color 0.25s ease, gap 0.25s ease, color 0.25s ease;
        }
        .sbr-mission-link:hover {
          border-color: var(--color-gold);
          color: var(--color-gold-muted, #D4B96A);
          gap: 14px;
        }

        /* Pillars row */
        .sbr-mission-pillars {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(24px, 3.5vw, 56px);
          padding: clamp(36px, 5vw, 56px) 0 0;
          border-top: 1px solid rgba(245, 243, 238, 0.12);
          list-style: none;
          margin: 0;
        }
        .sbr-mission-pillar {
          position: relative;
          padding-top: 4px;
        }
        .sbr-mission-num {
          font-family: var(--font-display);
          font-style: italic;
          font-size: clamp(2.2rem, 4vw, 3rem);
          color: var(--color-gold);
          line-height: 1;
          letter-spacing: -0.02em;
          display: block;
          margin-bottom: 14px;
        }
        .sbr-mission-label {
          font-family: var(--font-body);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #F5F3EE;
          margin: 0 0 12px;
        }
        .sbr-mission-body {
          font-family: var(--font-body);
          font-size: 14.5px;
          line-height: 1.75;
          color: rgba(245, 243, 238, 0.72);
          margin: 0;
        }

        /* Stats */
        .sbr-mission-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(20px, 3vw, 48px);
          margin-top: clamp(56px, 7vw, 88px);
          padding-top: clamp(28px, 4vw, 40px);
          border-top: 1px solid rgba(245, 243, 238, 0.12);
        }
        .sbr-mission-stat-value {
          font-family: var(--font-display);
          font-style: italic;
          font-size: clamp(2.4rem, 5vw, 3.75rem);
          font-weight: 400;
          color: #F5F3EE;
          line-height: 1;
          letter-spacing: -0.025em;
          margin-bottom: 12px;
        }
        .sbr-mission-stat-label {
          font-family: var(--font-body);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(245, 243, 238, 0.5);
          line-height: 1.4;
        }

        /* Reveal choreography */
        .sbr-reveal {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.9s cubic-bezier(0.2, 0.7, 0.2, 1),
                      transform 0.9s cubic-bezier(0.2, 0.7, 0.2, 1);
        }
        .sbr-reveal.is-visible { opacity: 1; transform: none; }
        .sbr-reveal-d1 { transition-delay: 0.15s; }
        .sbr-reveal-d2 { transition-delay: 0.28s; }
        .sbr-reveal-d3 { transition-delay: 0.40s; }
        .sbr-reveal-d4 { transition-delay: 0.52s; }
        .sbr-reveal-d5 { transition-delay: 0.64s; }
        .sbr-reveal-d6 { transition-delay: 0.76s; }
        .sbr-reveal-d7 { transition-delay: 0.88s; }
        .sbr-reveal-d8 { transition-delay: 1.00s; }

        /* Photo image reveal: subtle scale */
        .sbr-mission-photo.sbr-reveal { transform: translateY(20px) scale(1.02); }
        .sbr-mission-photo.sbr-reveal.is-visible { transform: none; }
        .sbr-mission-photo.sbr-reveal img {
          transition: transform 1.4s cubic-bezier(0.2, 0.7, 0.2, 1);
          transform: scale(1.08);
        }
        .sbr-mission-photo.sbr-reveal.is-visible img { transform: scale(1); }

        @media (max-width: 900px) {
          .sbr-mission-top { grid-template-columns: 1fr; gap: 40px; }
          .sbr-mission-photo { max-width: 420px; margin: 0 auto; }
          .sbr-mission-rail { display: none; }
          .sbr-mission-pillars { grid-template-columns: 1fr; gap: 28px; }
          .sbr-mission-stats { grid-template-columns: 1fr; gap: 28px; }
        }
      `}</style>

      <section
        ref={sectionRef}
        aria-labelledby="mission-heading"
        className={`sbr-mission-section ${revealed ? "is-visible" : ""}`}
      >
        <div className="sbr-mission-hairline" aria-hidden="true" />
        <div className="sbr-mission-rail" aria-hidden="true">
          Mission — Est. 2022
        </div>

        <div className="sbr-mission-inner">
          <div className="sbr-mission-top">
            <div className={`sbr-mission-photo sbr-reveal sbr-reveal-d1 ${revealed ? "is-visible" : ""}`}>
              <img
                src="/founder-photo.jpg"
                alt="SmallBiz Recon founder"
                loading="lazy"
                decoding="async"
              />
              <div className="sbr-mission-photo-caption">
                The team behind the desk
              </div>
            </div>

            <div>
              <div className={`sbr-mission-eyebrow sbr-reveal sbr-reveal-d2 ${revealed ? "is-visible" : ""}`}>
                Our mission
              </div>

              <h2
                id="mission-heading"
                className={`sbr-mission-quote sbr-reveal sbr-reveal-d3 ${revealed ? "is-visible" : ""}`}
              >
                We help borrowers read the letter they were{" "}
                <em>never meant to understand.</em>
              </h2>

              <p className={`sbr-mission-lede sbr-reveal sbr-reveal-d4 ${revealed ? "is-visible" : ""}`}>
                SBA servicing is a maze of acronyms, forms, and form-letters — built
                for the agency, not for you. SmallBiz Recon is the team that walks
                the maze with you, starting with the notice in your hand and ending
                with a plan you actually understand.
              </p>

              <Link
                to="/contact"
                className={`sbr-mission-link sbr-reveal sbr-reveal-d5 ${revealed ? "is-visible" : ""}`}
              >
                More about who we are
                <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>

          <ol className="sbr-mission-pillars" aria-label="What SmallBiz Recon stands for">
            {PILLARS.map((pillar, i) => (
              <li
                key={pillar.number}
                className={`sbr-mission-pillar sbr-reveal sbr-reveal-d${i + 4} ${revealed ? "is-visible" : ""}`}
              >
                <span className="sbr-mission-num" aria-hidden="true">
                  {pillar.number}
                </span>
                <h3 className="sbr-mission-label">{pillar.label}</h3>
                <p className="sbr-mission-body">{pillar.body}</p>
              </li>
            ))}
          </ol>

          <dl className="sbr-mission-stats" aria-label="SmallBiz Recon at a glance">
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                className={`sbr-reveal sbr-reveal-d${i + 6} ${revealed ? "is-visible" : ""}`}
              >
                <dt className="sr-only">{stat.label}</dt>
                <dd style={{ margin: 0 }}>
                  <div className="sbr-mission-stat-value">{stat.value}</div>
                  <div className="sbr-mission-stat-label">{stat.label}</div>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
