import { Target, Building2, Link2, BadgeDollarSign, AlertTriangle, HandHelping } from "lucide-react";

const ITEMS = [
  {
    icon: Target,
    title: "Problem-first routing",
    body: "We start with what you're trying to do, not what software we want to sell. Tools follow the problem.",
  },
  {
    icon: Building2,
    title: "City and county distinction",
    body: "Brevard isn't one office. We separate Palm Bay from Melbourne from unincorporated Brevard so the right rules apply.",
  },
  {
    icon: Link2,
    title: "Official-source links",
    body: "When the answer is on a government portal, we send you there directly — no scraped middle layer.",
  },
  {
    icon: BadgeDollarSign,
    title: "Free-first recommendations",
    body: "Free tools, free checklists, free routing. Paid options appear only when there's no free path.",
  },
  {
    icon: AlertTriangle,
    title: "Clear disclaimers",
    body: "We say what we are and aren't. No fake government branding. No legal, tax, or financial advice — just routing and prep.",
  },
  {
    icon: HandHelping,
    title: "Human help only when needed",
    body: "Most situations don't need a person. When yours does, we point to free local advisors or qualified professionals.",
  },
];

export default function Methodology() {
  return (
    <section
      aria-labelledby="method-h2"
      className="bg-[#F4F1EA]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="max-w-2xl">
          <p className="text-[12px] uppercase tracking-[0.18em] font-semibold text-[#5A6470]">
            Methodology
          </p>
          <h2
            id="method-h2"
            className="mt-2 text-[28px] sm:text-[34px] lg:text-[40px] leading-[1.1] tracking-[-0.015em] font-semibold text-[#0B2545]"
          >
            How we organize Brevard tools.
          </h2>
          <p className="mt-3 text-[15.5px] text-[#3B4654] leading-relaxed">
            A small set of principles keeps the platform honest, local, and useful for the people who live and work here.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {ITEMS.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="rounded-2xl bg-white border border-[#E2DDD2] p-6 hover:border-[#0B2545]/30 hover:shadow-[0_10px_30px_-15px_rgba(11,37,69,0.18)] transition"
            >
              <span className="grid place-items-center w-10 h-10 rounded-xl bg-[#0B2545]/[0.06] text-[#0B2545]">
                <Icon size={18} strokeWidth={2.25} aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-[16.5px] font-semibold text-[#0B2545] leading-snug">
                {title}
              </h3>
              <p className="mt-2 text-[13.5px] text-[#3B4654] leading-relaxed">
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
