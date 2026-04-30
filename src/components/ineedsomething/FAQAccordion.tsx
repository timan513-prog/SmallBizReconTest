import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { FAQS } from "./data";

export default function FAQAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      aria-labelledby="faq-h2"
      className="bg-[#FBF9F2]"
      id="faq"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-[12px] uppercase tracking-[0.18em] font-semibold text-[#5A6470]">
            Questions, answered
          </p>
          <h2
            id="faq-h2"
            className="mt-2 text-[28px] sm:text-[34px] lg:text-[40px] leading-[1.1] tracking-[-0.015em] font-semibold text-[#0B2545]"
          >
            Frequently asked questions
          </h2>
        </div>

        <div className="mt-10 rounded-2xl bg-white border border-[#E2DDD2] divide-y divide-[#EDE8DA] overflow-hidden">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            const panelId = `faq-panel-${i}`;
            const buttonId = `faq-button-${i}`;
            return (
              <div key={f.q} itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                <h3 itemProp="name" className="m-0">
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex items-start justify-between gap-4 text-left px-5 sm:px-6 py-4 sm:py-5 hover:bg-[#F8F5EC] transition"
                  >
                    <span className="text-[15px] sm:text-[16px] font-semibold text-[#0B2545] leading-snug">
                      {f.q}
                    </span>
                    <span
                      className={`grid place-items-center shrink-0 w-7 h-7 rounded-lg border transition ${
                        isOpen
                          ? "bg-[#0B2545] text-[#F4F1EA] border-[#0B2545]"
                          : "bg-[#F4F1EA] text-[#0B2545] border-[#E2DDD2]"
                      }`}
                      aria-hidden="true"
                    >
                      {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                    </span>
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                  itemScope
                  itemProp="acceptedAnswer"
                  itemType="https://schema.org/Answer"
                >
                  <div
                    itemProp="text"
                    className="px-5 sm:px-6 pb-5 sm:pb-6 -mt-1 text-[14px] text-[#3B4654] leading-relaxed"
                  >
                    {f.a}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
