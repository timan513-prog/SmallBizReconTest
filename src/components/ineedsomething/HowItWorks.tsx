import { MapPin, Compass, Wrench, Download } from "lucide-react";

const STEPS = [
  {
    n: "01",
    icon: MapPin,
    title: "Pick your city or area",
    body: "Choose any Brevard city or unincorporated area so we surface the right office and rules.",
  },
  {
    n: "02",
    icon: Compass,
    title: "Choose your problem",
    body: "From permits to property taxes to storm prep — pick the situation in plain English.",
  },
  {
    n: "03",
    icon: Wrench,
    title: "Get matched to the right local tool or office",
    body: "We surface the official-source path first, then point you to the tool, form, or contact you need.",
  },
  {
    n: "04",
    icon: Download,
    title: "Download a checklist, follow the official link, or request help",
    body: "Print a checklist, jump to the official portal, or ask for a free local advisor when needed.",
  },
];

export default function HowItWorks() {
  return (
    <section
      aria-labelledby="how-h2"
      className="bg-[#0B2545] text-[#F4F1EA] relative overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-0 opacity-60"
        style={{
          background:
            "radial-gradient(700px 320px at 90% 0%, rgba(201,162,74,0.18), transparent 60%), radial-gradient(700px 320px at 0% 100%, rgba(90,143,184,0.22), transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="max-w-2xl">
          <p className="text-[12px] uppercase tracking-[0.18em] font-semibold text-[#C9A24A]">
            How it works
          </p>
          <h2
            id="how-h2"
            className="mt-2 text-[28px] sm:text-[34px] lg:text-[40px] leading-[1.1] tracking-[-0.015em] font-semibold"
          >
            Four steps from confused to confident.
          </h2>
        </div>

        <ol className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STEPS.map(({ n, icon: Icon, title, body }) => (
            <li
              key={n}
              className="relative rounded-2xl p-6 bg-[#0F2C4A] border border-white/10 hover:border-[#C9A24A]/40 transition"
            >
              <div className="flex items-start justify-between gap-3 mb-4">
                <span className="grid place-items-center w-10 h-10 rounded-xl bg-[#C9A24A]/15 text-[#C9A24A]">
                  <Icon size={18} strokeWidth={2.25} aria-hidden="true" />
                </span>
                <span className="text-[12px] font-semibold tracking-[0.18em] text-[#C9A24A]/80">
                  {n}
                </span>
              </div>
              <h3 className="text-[16.5px] font-semibold leading-snug text-[#F4F1EA]">
                {title}
              </h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-[#CBD3DD]">
                {body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
