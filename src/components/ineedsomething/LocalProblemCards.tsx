import { Briefcase, Hammer, Home, CloudRain, ArrowRight } from "lucide-react";

const CARDS = [
  {
    id: "biz",
    icon: Briefcase,
    title: "I need to start a business in Brevard",
    description:
      "Form your entity, secure a Business Tax Receipt, and route to the right city or county office without the runaround.",
    firstTool: "Business Startup Path Finder",
    cta: "Start the path",
    href: "#tool-business-startup-path",
    accent: "#0B2545",
  },
  {
    id: "permit",
    icon: Hammer,
    title: "I need a permit or contractor info",
    description:
      "Find which Brevard city or unincorporated office handles your permit, and verify that your contractor is properly licensed.",
    firstTool: "Brevard Permit & Code Checker",
    cta: "Check my permit",
    href: "#tool-permit-code-checker",
    accent: "#5A8FB8",
  },
  {
    id: "property",
    icon: Home,
    title: "I need help with property taxes or homestead",
    description:
      "Walk through homestead exemption, portability, and Tax Collector deadlines without missing the dates that matter.",
    firstTool: "Property & Homestead Helper",
    cta: "Open the helper",
    href: "#tool-homestead-helper",
    accent: "#C9A24A",
  },
  {
    id: "storm",
    icon: CloudRain,
    title: "I need hurricane prep or recovery help",
    description:
      "Build a custom storm kit, evacuation plan, and document checklist for your address — before the watch becomes a warning.",
    firstTool: "Hurricane Readiness Builder",
    cta: "Build my kit",
    href: "#tool-hurricane-readiness",
    accent: "#0B2545",
  },
];

export default function LocalProblemCards() {
  return (
    <section
      aria-labelledby="problems-h2"
      className="bg-[#F4F1EA]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="max-w-2xl">
          <p className="text-[12px] uppercase tracking-[0.18em] font-semibold text-[#5A6470]">
            Local problems, local answers
          </p>
          <h2
            id="problems-h2"
            className="mt-2 text-[28px] sm:text-[34px] lg:text-[40px] leading-[1.1] tracking-[-0.015em] font-semibold text-[#0B2545]"
          >
            Pick the situation that sounds like yours.
          </h2>
          <p className="mt-3 text-[15.5px] text-[#3B4654] leading-relaxed">
            Each card opens the right Brevard tool first, then connects you to the official office or checklist you need next.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {CARDS.map(({ id, icon: Icon, title, description, firstTool, cta, href, accent }) => (
            <a
              key={id}
              href={href}
              className="group relative overflow-hidden rounded-2xl bg-white border border-[#E2DDD2] p-6 sm:p-7 hover:border-[#0B2545]/30 hover:shadow-[0_14px_40px_-18px_rgba(11,37,69,0.25)] transition"
            >
              <span
                className="absolute top-0 left-0 h-[3px] w-16 rounded-br-md"
                aria-hidden="true"
                style={{ background: accent }}
              />
              <div className="flex items-start gap-4">
                <span
                  className="grid place-items-center w-11 h-11 rounded-xl shrink-0"
                  style={{ background: `${accent}14`, color: accent }}
                  aria-hidden="true"
                >
                  <Icon size={20} strokeWidth={2.25} />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-[18px] sm:text-[19px] font-semibold text-[#0B2545] leading-snug">
                    {title}
                  </h3>
                  <p className="mt-2 text-[14px] text-[#3B4654] leading-relaxed">
                    {description}
                  </p>
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <p className="text-[12.5px] text-[#5A6470]">
                      <span className="font-semibold text-[#0B2545]">First tool:</span> {firstTool}
                    </p>
                    <span className="inline-flex items-center gap-1 text-[13px] font-semibold text-[#0B2545] group-hover:gap-2 transition-all">
                      {cta}
                      <ArrowRight size={14} aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
