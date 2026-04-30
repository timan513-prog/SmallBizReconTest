import { useMemo, useState } from "react";
import { TOOLS, type ToolCategory } from "./data";
import ToolCard from "./ToolCard";

const FILTERS: Array<"All" | ToolCategory> = [
  "All",
  "Business",
  "Permits & Code",
  "Property & Taxes",
  "Public Records",
  "Veterans",
  "Storm Prep",
  "Local Tools",
];

export default function ToolGrid() {
  const [filter, setFilter] = useState<"All" | ToolCategory>("All");

  const filtered = useMemo(
    () => (filter === "All" ? TOOLS : TOOLS.filter((t) => t.category === filter)),
    [filter],
  );

  return (
    <section
      id="tools-grid"
      aria-labelledby="tools-h2"
      className="bg-[#FBF9F2]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-[12px] uppercase tracking-[0.18em] font-semibold text-[#5A6470]">
              The 12 Brevard tools
            </p>
            <h2
              id="tools-h2"
              className="mt-2 text-[28px] sm:text-[34px] lg:text-[40px] leading-[1.1] tracking-[-0.015em] font-semibold text-[#0B2545]"
            >
              Every tool, organized by what you actually need.
            </h2>
            <p className="mt-3 text-[15.5px] text-[#3B4654] leading-relaxed">
              Free-first, locally researched, and routed to official sources. Filter to your situation or browse the full set.
            </p>
          </div>

          {/* Category filter pills */}
          <div
            role="tablist"
            aria-label="Filter tools by category"
            className="flex flex-wrap gap-2 lg:justify-end"
          >
            {FILTERS.map((f) => {
              const active = filter === f;
              return (
                <button
                  key={f}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 rounded-full text-[12.5px] font-semibold border transition ${
                    active
                      ? "bg-[#0B2545] text-[#F4F1EA] border-[#0B2545]"
                      : "bg-white text-[#0B2545] border-[#E2DDD2] hover:border-[#0B2545]/40"
                  }`}
                >
                  {f}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filtered.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-10 text-center text-[14px] text-[#5A6470]">
            No tools match that filter yet.
          </p>
        )}
      </div>
    </section>
  );
}
