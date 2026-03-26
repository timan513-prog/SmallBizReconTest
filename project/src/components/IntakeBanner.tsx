import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CircleAlert as AlertCircle } from "lucide-react";

const IntakeBanner: React.FC = () => {
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
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @keyframes intakeFadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .intake-cta:hover,
        .intake-cta:focus-visible {
          color: #cda349 !important;
          border-bottom-color: rgba(200,168,78,0.6) !important;
        }
        .intake-cta:focus-visible {
          outline: 2px solid #cda349;
          outline-offset: 4px;
          border-radius: 2px;
        }
      `}</style>

      <div
        style={{
          background: "linear-gradient(180deg, #060608 0%, #09090b 100%)",
          borderTop: "1px solid rgba(200,168,78,0.05)",
          borderBottom: "1px solid rgba(200,168,78,0.05)",
          padding: "22px 28px",
        }}
      >
        <div
          ref={ref}
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            flexWrap: "wrap",
            opacity: inView ? 1 : 0,
            animation: inView ? "intakeFadeUp 0.6s cubic-bezier(0.23,1,0.32,1) 0.1s both" : "none",
          }}
        >
          <AlertCircle
            size={14}
            aria-hidden="true"
            style={{ color: "#6a7a5e", flexShrink: 0 }}
            strokeWidth={1.5}
          />

          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 14,
              color: "#6a7a5e",
              margin: 0,
              lineHeight: 1.5,
              textAlign: "center",
            }}
          >
            Need more than our DIY Toolkits? Sent to Treasury — feeling lost?{" "}
            <span style={{ color: "#8a9878" }}>SmallBiz Recon may be able to help.</span>
          </p>

          <Link
            to="/dispute-recall-service/intake"
            className="intake-cta"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13,
              fontWeight: 600,
              color: "#9aaa88",
              textDecoration: "none",
              borderBottom: "1px solid rgba(154,170,136,0.3)",
              paddingBottom: 1,
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              transition: "color 0.25s ease, border-bottom-color 0.25s ease",
              whiteSpace: "nowrap",
            }}
          >
            Fill out our intake form
            <ArrowRight size={12} aria-hidden="true" strokeWidth={2} />
          </Link>
        </div>
      </div>
    </>
  );
};

export default IntakeBanner;
