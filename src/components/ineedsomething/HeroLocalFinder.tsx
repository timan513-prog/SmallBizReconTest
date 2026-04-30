import { useId, useState, type FormEvent } from "react";
import { ArrowRight, MapPin, Sparkles, ChevronRight } from "lucide-react";
import {
  CITIES,
  ISSUES,
  URGENCIES,
  recommendTools,
  type Issue,
  type Urgency,
  type Tool,
} from "./data";

interface HeroLocalFinderProps {
  selectedCity: string;
  setSelectedCity: (v: string) => void;
  selectedIssue: Issue | "";
  setSelectedIssue: (v: Issue | "") => void;
  urgency: Urgency | "";
  setUrgency: (v: Urgency | "") => void;
  recommendedTools: Tool[];
  setRecommendedTools: (t: Tool[]) => void;
}

export default function HeroLocalFinder({
  selectedCity,
  setSelectedCity,
  selectedIssue,
  setSelectedIssue,
  urgency,
  setUrgency,
  recommendedTools,
  setRecommendedTools,
}: HeroLocalFinderProps) {
  const cityId = useId();
  const issueId = useId();
  const urgencyId = useId();
  const [submitted, setSubmitted] = useState(false);

  const canSubmit = selectedCity && selectedIssue && urgency;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setRecommendedTools(recommendTools(selectedIssue));
    setSubmitted(true);
    requestAnimationFrame(() => {
      const el = document.getElementById("hero-results");
      el?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  };

  return (
    <section
      id="top"
      className="relative overflow-hidden"
      aria-labelledby="hero-h1"
    >
      {/* Coastal gradient background */}
      <div
        className="absolute inset-0 -z-10"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(1200px 600px at 85% -10%, rgba(90,143,184,0.18), transparent 60%), radial-gradient(900px 500px at -10% 20%, rgba(201,162,74,0.12), transparent 55%), linear-gradient(180deg, #F4F1EA 0%, #EFEBDF 100%)",
        }}
      />
      {/* Subtle horizon line */}
      <div
        className="absolute inset-x-0 bottom-0 h-px -z-10 bg-gradient-to-r from-transparent via-[#0B2545]/15 to-transparent"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-14 sm:pt-20 pb-16 sm:pb-24">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left: copy */}
          <div className="lg:col-span-6 lg:pt-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#0B2545]/[0.06] border border-[#0B2545]/10 px-3 py-1 text-[11.5px] font-medium tracking-wide text-[#0B2545]">
              <MapPin size={13} aria-hidden="true" />
              Built for Brevard County, FL
            </span>

            <h1
              id="hero-h1"
              className="mt-5 font-[600] text-[40px] leading-[1.05] sm:text-[52px] sm:leading-[1.04] lg:text-[60px] lg:leading-[1.02] tracking-[-0.02em] text-[#0B2545]"
            >
              Need something in Brevard?{" "}
              <span className="relative inline-block">
                <span className="relative z-10">Start here.</span>
                <span
                  className="absolute left-0 right-0 bottom-1 h-[10px] bg-[#C9A24A]/45 rounded-sm -z-0"
                  aria-hidden="true"
                />
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-[16.5px] sm:text-[17.5px] leading-[1.6] text-[#3B4654]">
              From business tax receipts and permits to property records, veteran resources, hurricane prep, and local office routing, Operation: IneedSomething helps Brevard County residents find the right tool, checklist, form, office, or next step.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href="#hero-finder"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0B2545] text-[#F4F1EA] font-semibold text-[14.5px] hover:bg-[#102E54] active:bg-[#08213C] shadow-[0_4px_14px_rgba(11,37,69,0.25)] transition"
              >
                Find My Next Step
                <ArrowRight size={16} aria-hidden="true" />
              </a>
              <a
                href="#tools-grid"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-[#0B2545]/20 text-[#0B2545] font-semibold text-[14.5px] hover:bg-[#0B2545]/[0.05] transition"
              >
                Browse Brevard Tools
              </a>
            </div>

            <p className="mt-5 text-[13px] text-[#5A6470] flex items-center gap-2">
              <Sparkles size={14} className="text-[#C9A24A]" aria-hidden="true" />
              Free, locally researched, and routed to official sources first.
            </p>
          </div>

          {/* Right: interactive card */}
          <div className="lg:col-span-6">
            <div
              id="hero-finder"
              className="relative rounded-3xl bg-white/95 backdrop-blur border border-[#E2DDD2] shadow-[0_18px_50px_-18px_rgba(11,37,69,0.25)] p-5 sm:p-7"
            >
              <div className="flex items-start justify-between gap-3 mb-5">
                <div>
                  <h2 className="text-[20px] sm:text-[22px] font-semibold text-[#0B2545] leading-tight">
                    What do you need help with?
                  </h2>
                  <p className="mt-1 text-[13.5px] text-[#5A6470]">
                    Three quick questions. We&apos;ll match you to a Brevard tool.
                  </p>
                </div>
                <span className="hidden sm:grid place-items-center w-10 h-10 rounded-xl bg-[#0B2545]/[0.06] text-[#0B2545]">
                  <MapPin size={18} aria-hidden="true" />
                </span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {/* City */}
                <div>
                  <label
                    htmlFor={cityId}
                    className="block text-[12.5px] font-medium text-[#1F2D3D] mb-1.5"
                  >
                    Select your city or area
                  </label>
                  <div className="relative">
                    <select
                      id={cityId}
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      className="w-full appearance-none rounded-xl border border-[#D9D3C4] bg-[#FBFAF5] px-3.5 py-2.5 pr-9 text-[14px] text-[#0B2545] font-medium focus:outline-none focus:ring-2 focus:ring-[#0B2545]/30 focus:border-[#0B2545]/40"
                    >
                      <option value="">Choose your area…</option>
                      {CITIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                    <ChevronRight
                      size={16}
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rotate-90 text-[#5A6470]"
                      aria-hidden="true"
                    />
                  </div>
                </div>

                {/* Issue */}
                <div>
                  <label
                    htmlFor={issueId}
                    className="block text-[12.5px] font-medium text-[#1F2D3D] mb-1.5"
                  >
                    Select your issue
                  </label>
                  <div className="relative">
                    <select
                      id={issueId}
                      value={selectedIssue}
                      onChange={(e) =>
                        setSelectedIssue(e.target.value as Issue | "")
                      }
                      className="w-full appearance-none rounded-xl border border-[#D9D3C4] bg-[#FBFAF5] px-3.5 py-2.5 pr-9 text-[14px] text-[#0B2545] font-medium focus:outline-none focus:ring-2 focus:ring-[#0B2545]/30 focus:border-[#0B2545]/40"
                    >
                      <option value="">What are you trying to do?</option>
                      {ISSUES.map((i) => (
                        <option key={i.value} value={i.value}>
                          {i.label}
                        </option>
                      ))}
                    </select>
                    <ChevronRight
                      size={16}
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rotate-90 text-[#5A6470]"
                      aria-hidden="true"
                    />
                  </div>
                </div>

                {/* Urgency */}
                <fieldset>
                  <legend
                    id={urgencyId}
                    className="block text-[12.5px] font-medium text-[#1F2D3D] mb-1.5"
                  >
                    Urgency
                  </legend>
                  <div
                    role="radiogroup"
                    aria-labelledby={urgencyId}
                    className="grid grid-cols-3 gap-2"
                  >
                    {URGENCIES.map((u) => {
                      const active = urgency === u.value;
                      return (
                        <button
                          key={u.value}
                          type="button"
                          role="radio"
                          aria-checked={active}
                          onClick={() => setUrgency(u.value)}
                          className={`px-3 py-2.5 rounded-xl text-[13px] font-semibold border transition ${
                            active
                              ? "bg-[#0B2545] text-[#F4F1EA] border-[#0B2545] shadow-[0_2px_8px_rgba(11,37,69,0.18)]"
                              : "bg-[#FBFAF5] text-[#0B2545] border-[#D9D3C4] hover:border-[#0B2545]/40 hover:bg-white"
                          }`}
                        >
                          {u.label}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                <button
                  type="submit"
                  disabled={!canSubmit}
                  className={`w-full mt-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-[14.5px] transition ${
                    canSubmit
                      ? "bg-[#C9A24A] text-[#0B2545] hover:bg-[#D4AE5C] active:bg-[#BC9239] shadow-[0_4px_14px_rgba(201,162,74,0.35)]"
                      : "bg-[#E5E1D5] text-[#8A8470] cursor-not-allowed"
                  }`}
                >
                  Show My Tools
                  <ArrowRight size={16} aria-hidden="true" />
                </button>

                <p className="text-[11.5px] text-[#7A8290] leading-relaxed">
                  Free. No account required. We route to official Brevard sources first.
                </p>
              </form>

              {/* Results */}
              {submitted && recommendedTools.length > 0 && (
                <div
                  id="hero-results"
                  className="mt-6 pt-6 border-t border-[#E8E3D7]"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-[14px] font-semibold text-[#0B2545]">
                      Top 3 matches for you
                    </h3>
                    <span className="text-[11.5px] uppercase tracking-wider text-[#5A6470] font-medium">
                      Local · Free
                    </span>
                  </div>
                  <ul className="space-y-2.5">
                    {recommendedTools.map((t, i) => (
                      <li
                        key={t.id}
                        className="group flex items-start gap-3 p-3 rounded-xl bg-[#F8F5EC] hover:bg-[#F4F0E2] border border-[#E8E3D7] transition"
                      >
                        <span className="grid place-items-center shrink-0 w-7 h-7 rounded-lg bg-[#0B2545] text-[#C9A24A] text-[12px] font-semibold">
                          {i + 1}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="text-[13.5px] font-semibold text-[#0B2545] truncate">
                            {t.name}
                          </p>
                          <p className="text-[12.5px] text-[#4A5563] line-clamp-2">
                            {t.description}
                          </p>
                        </div>
                        <a
                          href={`#tool-${t.id}`}
                          className="shrink-0 inline-flex items-center text-[12.5px] font-semibold text-[#0B2545] hover:text-[#102E54]"
                          aria-label={`Open ${t.name}`}
                        >
                          Open
                          <ChevronRight size={14} aria-hidden="true" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
