import { Compass } from "lucide-react";

const COLS: Array<{ title: string; links: string[] }> = [
  {
    title: "Brevard Tools",
    links: [
      "Business Startup Tools",
      "Permit & Code Tools",
      "Property Tax Tools",
      "Homestead Tools",
      "Contractor Verification",
      "Hurricane Prep Tools",
    ],
  },
  {
    title: "Cities",
    links: [
      "Palm Bay",
      "Melbourne",
      "Cocoa",
      "Titusville",
      "Rockledge",
      "West Melbourne",
      "Cocoa Beach",
      "Cape Canaveral",
      "Satellite Beach",
      "Indialantic",
      "Merritt Island",
      "Viera",
    ],
  },
  {
    title: "Resources",
    links: [
      "Free Checklists",
      "Local Office Finder",
      "Public Records Navigator",
      "Business Tax Receipt Guide",
      "Hurricane Checklist",
      "Veteran Resources",
    ],
  },
  {
    title: "Company",
    links: ["About", "Methodology", "Contact", "Submit a Resource", "Partner With Us"],
  },
  {
    title: "Legal",
    links: ["Privacy", "Terms", "Accessibility", "Disclaimers", "Affiliate Disclosure"],
  },
];

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function Footer() {
  return (
    <footer
      className="bg-[#08213C] text-[#CBD3DD]"
      aria-labelledby="footer-h2"
    >
      <h2 id="footer-h2" className="sr-only">
        Brevard County resources, cities, and company information
      </h2>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Brand column */}
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <span className="grid place-items-center w-9 h-9 rounded-xl bg-[#C9A24A] text-[#0B2545]">
                <Compass size={18} strokeWidth={2.25} aria-hidden="true" />
              </span>
              <div className="leading-tight">
                <p className="text-[10.5px] uppercase tracking-[0.18em] text-[#C9A24A]/90 font-medium">
                  Operation
                </p>
                <p className="text-[16px] font-semibold text-[#F4F1EA] -mt-0.5">
                  IneedSomething
                </p>
              </div>
            </div>
            <p className="mt-4 text-[13.5px] leading-relaxed text-[#A8B3C0] max-w-sm">
              A Brevard County problem-solving platform for residents, small business owners, veterans, homeowners, renters, and families.
            </p>
          </div>

          {COLS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="text-[12px] uppercase tracking-[0.18em] font-semibold text-[#C9A24A]">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l}>
                    <a
                      href={`#${slugify(l)}`}
                      className="text-[13.5px] text-[#CBD3DD] hover:text-[#F4F1EA] transition"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-[12px] leading-relaxed text-[#8A98A8] max-w-4xl">
            Operation: IneedSomething is an independent educational resource and local tool-finder. It is not affiliated with Brevard County government or any city agency. The platform provides informational tools and checklists only and does not provide legal, tax, accounting, financial, or professional advice. Users should verify all requirements with the appropriate official office or qualified professional.
          </p>
          <p className="mt-6 text-[12px] text-[#8A98A8]">
            © {new Date().getFullYear()} Operation: IneedSomething. Brevard County, Florida.
          </p>
        </div>
      </div>
    </footer>
  );
}
