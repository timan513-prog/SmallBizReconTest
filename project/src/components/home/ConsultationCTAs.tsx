import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar } from "lucide-react";

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export default function ConsultationCTAs() {
  const sectionObs = useInView(0.15);
  const [cardHovered, setCardHovered] = useState(false);

  return (
    <>
      <style>{`
        @keyframes consFadeUp {
          from { opacity:0; transform:translateY(32px); }
          to { opacity:1; transform:translateY(0); }
        }
        @keyframes consPulse {
          0%, 100% { box-shadow: 0 0 20px rgba(200,168,78,0.08), 0 0 0 0 rgba(200,168,78,0.15); }
          50% { box-shadow: 0 0 30px rgba(200,168,78,0.15), 0 0 0 6px rgba(200,168,78,0.04); }
        }
        @keyframes consShimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @media (max-width: 640px) {
          .cons-title { font-size: 32px !important; }
          .cons-ctas-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <section
        style={{
          position: "relative",
          overflow: "hidden",
          background: "linear-gradient(175deg, #0e100c 0%, #111408 100%)",
          padding: "100px 0 100px",
          isolation: "isolate",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "radial-gradient(ellipse 55% 50% at 50% 20%, rgba(200,168,78,0.04) 0%, transparent 60%)",
          }}
        />

        <div
          ref={sectionObs.ref}
          style={{
            position: "relative",
            zIndex: 10,
            maxWidth: 1000,
            margin: "0 auto",
            padding: "0 24px",
          }}
        >
          <div
            onMouseEnter={() => setCardHovered(true)}
            onMouseLeave={() => setCardHovered(false)}
            style={{
              position: "relative",
              overflow: "hidden",
              background: "rgba(22,26,18,0.6)",
              backdropFilter: "blur(28px)",
              WebkitBackdropFilter: "blur(28px)",
              borderRadius: 28,
              border: `1px solid ${cardHovered ? "rgba(200,168,78,0.2)" : "rgba(200,168,78,0.06)"}`,
              boxShadow: cardHovered
                ? "0 36px 90px -20px rgba(200,168,78,0.1)"
                : "0 8px 40px rgba(0,0,0,0.15)",
              transform: cardHovered ? "translateY(-6px)" : "translateY(0)",
              transition: "all 0.7s cubic-bezier(0.23,1,0.32,1)",
              opacity: sectionObs.inView ? 1 : 0,
              animation: sectionObs.inView
                ? "consFadeUp 0.8s cubic-bezier(0.23,1,0.32,1) 0.1s both"
                : "none",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 1,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: "50%",
                  height: "100%",
                  background:
                    "linear-gradient(90deg, transparent, rgba(200,168,78,0.35), transparent)",
                  animation: "consShimmer 5s ease-in-out infinite",
                }}
              />
            </div>

            <div
              style={{
                position: "absolute",
                top: -60,
                left: -60,
                width: 160,
                height: 160,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(200,168,78,0.06), transparent 60%)",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: -60,
                right: -60,
                width: 160,
                height: 160,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(126,168,94,0.05), transparent 60%)",
                pointerEvents: "none",
              }}
            />

            <div
              style={{
                position: "relative",
                padding: "56px 48px",
                textAlign: "center",
              }}
            >
              <h3
                className="cons-title"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 40,
                  fontWeight: 400,
                  color: "#eaf0e4",
                  lineHeight: 1.15,
                  letterSpacing: "-0.015em",
                  marginBottom: 14,
                }}
              >
                Ready to{" "}
                <span style={{ fontStyle: "italic", color: "#cda349" }}>
                  talk?
                </span>
              </h3>

              <p
                style={{
                  maxWidth: 480,
                  margin: "0 auto 24px",
                  fontSize: 15,
                  color: "#6a7a5e",
                  lineHeight: 1.75,
                  fontFamily: "var(--font-body)",
                }}
              >
                Book a consultation with a professional who has direct SBA
                servicing experience.
              </p>

              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "8px 20px",
                  borderRadius: 100,
                  background: "rgba(200,168,78,0.08)",
                  border: "1px solid rgba(200,168,78,0.15)",
                  marginBottom: 24,
                }}
              >
                <Calendar
                  size={13}
                  style={{ color: "#cda349" }}
                  strokeWidth={2}
                />
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#cda349",
                    fontFamily: "var(--font-body)",
                    letterSpacing: "0.02em",
                  }}
                >
                  Book a free consultation — includes a free paid guide
                </span>
              </div>

              <div
                className="cons-ctas-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 14,
                  maxWidth: 640,
                  margin: "0 auto 24px",
                }}
              >
                <Link
                  to="/contact"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 6,
                    padding: "20px 20px 18px",
                    borderRadius: 18,
                    background:
                      "linear-gradient(135deg, rgba(200,168,78,0.2), rgba(200,168,78,0.06))",
                    border: "1px solid rgba(200,168,78,0.3)",
                    textDecoration: "none",
                    transition: "all 0.3s ease",
                    animation: "consPulse 3s ease-in-out infinite",
                  }}
                >
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.14em",
                      color: "#8a9878",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    Free
                  </span>
                  <span
                    style={{
                      fontSize: 15,
                      fontWeight: 600,
                      color: "#eaf0e4",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    30-Min Consultation
                  </span>
                  <span
                    style={{
                      fontSize: 11,
                      color: "#6a7a5e",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    + free access to one paid guide
                  </span>
                </Link>

                <Link
                  to="/consultation"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 6,
                    padding: "20px 20px 18px",
                    borderRadius: 18,
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    textDecoration: "none",
                    transition: "all 0.3s ease",
                  }}
                >
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.14em",
                      color: "#cda349",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    $167
                  </span>
                  <span
                    style={{
                      fontSize: 15,
                      fontWeight: 600,
                      color: "#b5c4a8",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    60-Min Advanced
                  </span>
                  <span
                    style={{
                      fontSize: 11,
                      color: "#6a7a5e",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    deep-dive + $167 service credit
                  </span>
                </Link>
              </div>

              <p
                style={{
                  marginTop: 20,
                  fontSize: 11,
                  color: "#3e4a34",
                  fontFamily: "var(--font-body)",
                  lineHeight: 1.5,
                }}
              >
                For informational purposes only. SmallBiz Recon™ is not
                affiliated with the SBA.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
