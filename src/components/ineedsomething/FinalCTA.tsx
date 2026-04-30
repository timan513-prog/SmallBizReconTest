import { ArrowRight } from "lucide-react";

interface FinalCTAProps {
  onPrimaryClick: () => void;
}

export default function FinalCTA({ onPrimaryClick }: FinalCTAProps) {
  return (
    <section
      aria-labelledby="cta-h2"
      className="bg-[#0B2545] text-[#F4F1EA] relative overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(800px 400px at 50% 110%, rgba(201,162,74,0.22), transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
        <h2
          id="cta-h2"
          className="text-[30px] sm:text-[40px] lg:text-[48px] leading-[1.05] tracking-[-0.02em] font-semibold"
        >
          Stop searching. Start with the right next step.
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-[16px] sm:text-[17px] text-[#CBD3DD] leading-relaxed">
          Find the Brevard County tool, checklist, office, form, or resource that fits your situation.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={onPrimaryClick}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#C9A24A] text-[#0B2545] font-semibold text-[15px] hover:bg-[#D4AE5C] active:bg-[#BC9239] shadow-[0_4px_18px_rgba(201,162,74,0.35)] transition"
          >
            Find My Next Step
            <ArrowRight size={16} aria-hidden="true" />
          </button>
          <a
            href="#tools-grid"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/25 text-[#F4F1EA] font-semibold text-[15px] hover:bg-white/5 transition"
          >
            Browse Free Tools
          </a>
        </div>
      </div>
    </section>
  );
}
