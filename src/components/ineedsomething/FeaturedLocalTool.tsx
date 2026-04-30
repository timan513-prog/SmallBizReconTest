import { CheckCircle2, ArrowRight, Sparkles } from "lucide-react";

const RECS = [
  {
    name: "Business Startup Path Finder",
    blurb: "Step-by-step formation, Business Tax Receipt, and zoning route for Melbourne.",
  },
  {
    name: "Business Tax Receipt Checklist",
    blurb: "Exactly what to gather before you visit the Melbourne BTR office.",
  },
  {
    name: "Local Small Business Resource Map",
    blurb: "Free SBDC, SCORE, and chamber advisors near downtown Melbourne.",
  },
];

export default function FeaturedLocalTool() {
  return (
    <section
      aria-labelledby="featured-h2"
      className="bg-[#F4F1EA]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5">
            <p className="text-[12px] uppercase tracking-[0.18em] font-semibold text-[#5A6470]">
              Featured local tool
            </p>
            <h2
              id="featured-h2"
              className="mt-2 text-[28px] sm:text-[34px] lg:text-[40px] leading-[1.1] tracking-[-0.015em] font-semibold text-[#0B2545]"
            >
              Brevard Help Finder
            </h2>
            <p className="mt-3 text-[15.5px] text-[#3B4654] leading-relaxed">
              The Brevard Help Finder is the fastest way to go from &ldquo;I don&apos;t know where to start&rdquo; to a real next step. Three quick questions, three local matches, and a clear path forward — every time.
            </p>

            <ul className="mt-6 space-y-2.5 text-[14px] text-[#1F2D3D]">
              {[
                "Routes to the right Brevard city or unincorporated office",
                "Surfaces official-source links before third-party content",
                "Always free — no account or sign-in required",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <CheckCircle2
                    size={17}
                    className="text-[#0B2545] mt-0.5 shrink-0"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <a
              href="#hero-finder"
              className="mt-7 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0B2545] text-[#F4F1EA] font-semibold text-[14.5px] hover:bg-[#102E54] active:bg-[#08213C] shadow-[0_4px_14px_rgba(11,37,69,0.25)] transition"
            >
              Try the Brevard Help Finder
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>

          {/* Mock result card */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl bg-white border border-[#E2DDD2] shadow-[0_18px_50px_-22px_rgba(11,37,69,0.25)] p-6 sm:p-8">
              <div className="flex items-center justify-between gap-3 mb-5">
                <div className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#0B2545]">
                  <Sparkles size={14} className="text-[#C9A24A]" aria-hidden="true" />
                  Sample match
                </div>
                <span className="text-[11.5px] font-medium text-[#5A6470]">
                  Generated in &lt; 3 seconds
                </span>
              </div>

              <div className="rounded-2xl bg-[#F8F5EC] border border-[#E8E3D7] p-5">
                <p className="text-[12.5px] uppercase tracking-wider font-semibold text-[#5A6470]">
                  Based on your selection
                </p>
                <dl className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3 text-[13.5px]">
                  <div>
                    <dt className="text-[#5A6470] font-medium">Issue</dt>
                    <dd className="mt-0.5 font-semibold text-[#0B2545]">
                      Start or run a business
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[#5A6470] font-medium">Area</dt>
                    <dd className="mt-0.5 font-semibold text-[#0B2545]">Melbourne</dd>
                  </div>
                  <div>
                    <dt className="text-[#5A6470] font-medium">Urgency</dt>
                    <dd className="mt-0.5 font-semibold text-[#0B2545]">This week</dd>
                  </div>
                </dl>
              </div>

              <div className="mt-5">
                <h3 className="text-[14px] font-semibold text-[#0B2545] mb-3">
                  Recommended for you
                </h3>
                <ul className="space-y-2.5">
                  {RECS.map((r, i) => (
                    <li
                      key={r.name}
                      className="flex items-start gap-3 p-3.5 rounded-xl bg-[#FBF9F2] border border-[#EDE8DA] hover:border-[#0B2545]/25 transition"
                    >
                      <span className="grid place-items-center shrink-0 w-7 h-7 rounded-lg bg-[#0B2545] text-[#C9A24A] text-[12px] font-semibold">
                        {i + 1}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-[13.5px] font-semibold text-[#0B2545]">
                          {r.name}
                        </p>
                        <p className="text-[12.5px] text-[#4A5563] leading-relaxed">
                          {r.blurb}
                        </p>
                      </div>
                      <ArrowRight
                        size={14}
                        className="text-[#5A6470] mt-1 shrink-0"
                        aria-hidden="true"
                      />
                    </li>
                  ))}
                </ul>
              </div>

              <p className="mt-5 text-[11.5px] text-[#7A8290] leading-relaxed">
                Sample preview only. Your actual results will reflect your selected city, issue, and urgency.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
