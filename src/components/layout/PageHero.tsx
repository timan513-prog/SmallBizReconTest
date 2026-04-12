import React from "react";

type PageHeroProps = {
  badge?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  children?: React.ReactNode;
  align?: "center" | "left";
};

export default function PageHero({
  badge = "Independent SBA Resource Platform",
  title,
  subtitle,
  children,
  align = "center",
}: PageHeroProps) {
  const isCenter = align === "center";

  return (
    <section className="relative overflow-hidden">
      {/* Brand-tinted divider (moved down so it doesn’t sit on the header seam) */}
      <div
        className="absolute top-3 left-0 right-0 h-px z-10
          bg-gradient-to-r from-transparent via-[#556B2F]/45 to-transparent
          pointer-events-none"
      />

      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0">
        {/* Dark gradient base */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/60" />

        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 opacity-[0.10]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        {/* Soft top glow */}
        <div className="absolute -top-56 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full blur-3xl bg-white/10" />
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-6xl px-4">
        <div
          className={[
            "pt-10 md:pt-14 pb-10 md:pb-14",
            "min-h-[calc(100vh-7rem)]",
            "flex flex-col justify-center",
            isCenter ? "text-center" : "text-left",
          ].join(" ")}
        >
          {/* Badge */}
          {badge && (
            <div className={isCenter ? "mx-auto" : ""}>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-lime-400/70" />
                {badge}
              </div>
            </div>
          )}

          {/* Title */}
          <h1 className="mt-6 font-semibold tracking-tight text-4xl md:text-6xl text-white">
            {title}
          </h1>

          {/* Subtitle */}
          {subtitle && (
            <p
              className={[
                "mt-5 text-base md:text-lg text-white/70",
                isCenter ? "mx-auto max-w-3xl" : "max-w-3xl",
              ].join(" ")}
            >
              {subtitle}
            </p>
          )}

          {/* Slot for search / filters / buttons */}
          {children && (
            <div
              className={[
                "mt-8",
                isCenter ? "mx-auto w-full max-w-4xl" : "w-full max-w-4xl",
              ].join(" ")}
            >
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}