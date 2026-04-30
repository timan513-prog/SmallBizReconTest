const ROWS: Array<{ label: string; free: string; checklist: string; guided: string }> = [
  {
    label: "Best for",
    free: "Quick answers and routing",
    checklist: "Prepping before an office visit",
    guided: "Complex situations needing a person",
  },
  {
    label: "Cost",
    free: "Free",
    checklist: "Free download",
    guided: "Free referrals; some pros may charge",
  },
  {
    label: "Speed",
    free: "Under 3 minutes",
    checklist: "Same day",
    guided: "1–5 business days",
  },
  {
    label: "Includes",
    free: "Tool + official link",
    checklist: "Printable list of documents and steps",
    guided: "Connection to a local advisor or office",
  },
  {
    label: "When to choose it",
    free: "You just need the right office or form",
    checklist: "You want to be prepared, not surprised",
    guided: "Your situation is unusual or time-sensitive",
  },
];

const COLS = [
  { key: "free", label: "Free Tool", accent: "#0B2545" },
  { key: "checklist", label: "Downloadable Checklist", accent: "#5A8FB8" },
  { key: "guided", label: "Guided Help", accent: "#C9A24A" },
] as const;

export default function ComparisonTable() {
  return (
    <section
      aria-labelledby="compare-h2"
      className="bg-[#FBF9F2]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="max-w-2xl">
          <p className="text-[12px] uppercase tracking-[0.18em] font-semibold text-[#5A6470]">
            Pick the path that fits
          </p>
          <h2
            id="compare-h2"
            className="mt-2 text-[28px] sm:text-[34px] lg:text-[40px] leading-[1.1] tracking-[-0.015em] font-semibold text-[#0B2545]"
          >
            Free tool, checklist, or guided help?
          </h2>
          <p className="mt-3 text-[15.5px] text-[#3B4654] leading-relaxed">
            Same problem, three different shapes of help. Use whichever matches the moment you&apos;re in.
          </p>
        </div>

        {/* Desktop table */}
        <div className="mt-10 hidden md:block overflow-hidden rounded-2xl border border-[#E2DDD2] bg-white">
          <table className="w-full text-left">
            <caption className="sr-only">
              Comparison of help types: free tool, downloadable checklist, and guided help.
            </caption>
            <thead className="bg-[#F4F1EA]">
              <tr>
                <th
                  scope="col"
                  className="px-5 py-4 text-[12px] uppercase tracking-wider font-semibold text-[#5A6470] w-[22%]"
                >
                  Compare
                </th>
                {COLS.map((c) => (
                  <th
                    key={c.key}
                    scope="col"
                    className="px-5 py-4 text-[13.5px] font-semibold text-[#0B2545] border-l border-[#E8E3D7]"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="inline-block w-2 h-2 rounded-full"
                        style={{ background: c.accent }}
                        aria-hidden="true"
                      />
                      {c.label}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row, idx) => (
                <tr
                  key={row.label}
                  className={idx % 2 === 0 ? "bg-white" : "bg-[#FBF9F2]"}
                >
                  <th
                    scope="row"
                    className="px-5 py-4 text-[13px] font-semibold text-[#0B2545] align-top"
                  >
                    {row.label}
                  </th>
                  {COLS.map((c) => (
                    <td
                      key={c.key}
                      className="px-5 py-4 text-[13.5px] text-[#3B4654] border-l border-[#EDE8DA] align-top"
                    >
                      {row[c.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile stacked cards */}
        <div className="mt-8 grid md:hidden gap-4">
          {COLS.map((c) => (
            <div
              key={c.key}
              className="rounded-2xl border border-[#E2DDD2] bg-white p-5"
            >
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="inline-block w-2 h-2 rounded-full"
                  style={{ background: c.accent }}
                  aria-hidden="true"
                />
                <h3 className="text-[15px] font-semibold text-[#0B2545]">
                  {c.label}
                </h3>
              </div>
              <dl className="space-y-2.5 text-[13.5px]">
                {ROWS.map((r) => (
                  <div key={r.label}>
                    <dt className="text-[#5A6470] font-medium text-[12px] uppercase tracking-wider">
                      {r.label}
                    </dt>
                    <dd className="text-[#1F2D3D] mt-0.5">{r[c.key]}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
