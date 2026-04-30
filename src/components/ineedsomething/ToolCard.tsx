import { ArrowRight } from "lucide-react";
import type { Tool } from "./data";

const CATEGORY_COLOR: Record<Tool["category"], string> = {
  "Business": "#0B2545",
  "Permits & Code": "#5A8FB8",
  "Property & Taxes": "#C9A24A",
  "Public Records": "#3B4654",
  "Veterans": "#0B2545",
  "Storm Prep": "#5A8FB8",
  "Local Tools": "#5A6470",
};

interface ToolCardProps {
  tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  const accent = CATEGORY_COLOR[tool.category];
  const isFree = tool.cost === "Free";

  return (
    <article
      id={`tool-${tool.id}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-white border border-[#E2DDD2] hover:border-[#0B2545]/30 hover:shadow-[0_14px_40px_-18px_rgba(11,37,69,0.22)] transition p-5 sm:p-6"
    >
      <span
        className="absolute top-0 left-0 h-[3px] w-12 rounded-br-md"
        aria-hidden="true"
        style={{ background: accent }}
      />

      {/* Badges */}
      <div className="flex flex-wrap items-center gap-1.5 mb-4">
        <span
          className="inline-flex items-center px-2 py-0.5 rounded-md text-[10.5px] font-semibold uppercase tracking-wider"
          style={{
            background: `${accent}14`,
            color: accent,
          }}
        >
          {tool.category}
        </span>
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10.5px] font-semibold uppercase tracking-wider ${
            isFree
              ? "bg-[#E8F1E5] text-[#2F6B36]"
              : "bg-[#F8E9CC] text-[#7A5A0F]"
          }`}
        >
          {tool.cost}
        </span>
        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10.5px] font-semibold uppercase tracking-wider bg-[#F1EEE3] text-[#5A6470]">
          {tool.type}
        </span>
      </div>

      <h3 className="text-[17px] sm:text-[18px] font-semibold text-[#0B2545] leading-snug">
        {tool.name}
      </h3>
      <p className="mt-2 text-[13.5px] text-[#3B4654] leading-relaxed">
        {tool.description}
      </p>

      <div className="mt-4 pt-4 border-t border-[#EDE8DA] text-[12.5px] text-[#5A6470]">
        <span className="font-semibold text-[#0B2545]">Best for:</span> {tool.bestFor}
      </div>

      <div className="mt-4 flex">
        <button
          type="button"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[13px] font-semibold text-[#0B2545] bg-[#F4F1EA] border border-[#E2DDD2] hover:bg-white hover:border-[#0B2545]/30 transition"
        >
          Open Tool
          <ArrowRight size={14} aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}
