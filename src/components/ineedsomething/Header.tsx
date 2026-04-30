import { useEffect, useState } from "react";
import { Menu, X, Compass } from "lucide-react";
import { NAV_LINKS } from "./data";

interface HeaderProps {
  onPrimaryClick: () => void;
}

export default function Header({ onPrimaryClick }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="sticky top-0 z-50 w-full px-3 sm:px-6 pt-3 sm:pt-4"
      role="banner"
    >
      <div
        className={`mx-auto max-w-7xl rounded-2xl border transition-all duration-300 ${
          scrolled
            ? "bg-[#F4F1EA]/95 backdrop-blur-md border-[#E2DDD2] shadow-[0_8px_24px_rgba(11,37,69,0.08)]"
            : "bg-[#F4F1EA]/85 backdrop-blur-sm border-[#E8E3D7] shadow-[0_2px_8px_rgba(11,37,69,0.04)]"
        }`}
      >
        <div className="flex items-center justify-between px-4 sm:px-6 py-3">
          {/* Wordmark */}
          <a
            href="#top"
            className="flex items-center gap-2.5 group"
            aria-label="Operation: IneedSomething home"
          >
            <span className="grid place-items-center w-9 h-9 rounded-xl bg-[#0B2545] text-[#C9A24A] ring-1 ring-[#0B2545]/20 group-hover:ring-[#C9A24A]/40 transition">
              <Compass size={18} strokeWidth={2.25} aria-hidden="true" />
            </span>
            <span className="leading-tight">
              <span className="block text-[11px] uppercase tracking-[0.18em] text-[#5A6470] font-medium">
                Operation
              </span>
              <span className="block text-[15px] sm:text-base font-semibold text-[#0B2545] -mt-0.5">
                IneedSomething
              </span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav
            className="hidden lg:flex items-center gap-1"
            aria-label="Primary"
          >
            {NAV_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="px-3 py-2 rounded-lg text-[13.5px] font-medium text-[#1F2D3D] hover:bg-[#0B2545]/[0.06] hover:text-[#0B2545] transition"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* CTAs */}
          <div className="hidden md:flex items-center gap-2">
            <a
              href="#tools-grid"
              className="px-4 py-2 rounded-xl text-[13.5px] font-semibold text-[#0B2545] hover:bg-[#0B2545]/[0.06] transition"
            >
              Browse Free Tools
            </a>
            <button
              type="button"
              onClick={onPrimaryClick}
              className="px-4 py-2 rounded-xl text-[13.5px] font-semibold bg-[#0B2545] text-[#F4F1EA] hover:bg-[#102E54] active:bg-[#08213C] shadow-[0_2px_6px_rgba(11,37,69,0.25)] transition"
            >
              Find My Next Step
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            className="md:hidden grid place-items-center w-10 h-10 rounded-lg text-[#0B2545] hover:bg-[#0B2545]/[0.06]"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div
            id="mobile-nav"
            className="md:hidden border-t border-[#E8E3D7] px-4 py-3 space-y-1"
          >
            {NAV_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block px-3 py-2 rounded-lg text-[14px] font-medium text-[#1F2D3D] hover:bg-[#0B2545]/[0.06]"
              >
                {l.label}
              </a>
            ))}
            <div className="pt-2 flex flex-col gap-2">
              <a
                href="#tools-grid"
                onClick={() => setOpen(false)}
                className="text-center px-4 py-2.5 rounded-xl text-[14px] font-semibold text-[#0B2545] border border-[#0B2545]/20 hover:bg-[#0B2545]/[0.05]"
              >
                Browse Free Tools
              </a>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  onPrimaryClick();
                }}
                className="px-4 py-2.5 rounded-xl text-[14px] font-semibold bg-[#0B2545] text-[#F4F1EA]"
              >
                Find My Next Step
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
