import { MapPin, ShieldCheck, Wallet, FileText } from "lucide-react";

const ITEMS = [
  { icon: MapPin, label: "Brevard-focused" },
  { icon: ShieldCheck, label: "Official-source routing" },
  { icon: Wallet, label: "Free-first tools" },
  { icon: FileText, label: "Plain-English checklists" },
];

export default function TrustStrip() {
  return (
    <section
      aria-label="Why people use Operation: IneedSomething"
      className="border-y border-[#E8E3D7] bg-[#F8F5EC]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
        <ul className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-3">
          {ITEMS.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="flex items-center gap-2.5 text-[13px] sm:text-[13.5px] font-medium text-[#1F2D3D]"
            >
              <span className="grid place-items-center w-7 h-7 rounded-lg bg-white border border-[#E2DDD2] text-[#0B2545] shrink-0">
                <Icon size={14} strokeWidth={2.25} aria-hidden="true" />
              </span>
              {label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
