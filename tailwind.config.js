/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  safelist: ["perspective-1000"],

  darkMode: "class",

  theme: {
    extend: {
      colors: {
        /* =========================
           BRAND COLORS (keep existing class names)
           ========================= */

        "od-green": {
          50: "#E4E9DA",
          100: "#F0F8E8",
          200: "#D1E7C5",
          300: "#A2B98C",
          DEFAULT: "#556B2F",
          700: "#4A5C3A",
          800: "#4B5320",
          950: "#1B5E20",
        },

        "ranger-green": {
          50: "#E7ECD8",
          100: "#D3DDBA",
          200: "#B7C893",
          300: "#8FA45E",
          DEFAULT: "#4A5A28",
          700: "#3E4D22",
          800: "#2E3D1C",
          900: "#1F2A12",
        },

        "flat-gold": {
          DEFAULT: "#CDA349",
          dark: "#B8922F",
          800: "#996F09",
        },

        "muted-gold": {
          100: "#F8F2E6",
          300: "#E6D3A3",
          500: "#BFA25A",
        },

        "coyote-tan": {
          DEFAULT: "#D4B483",
          300: "#D4B483",
        },

        "gunmetal-gray": {
          DEFAULT: "#444A47",
          800: "#444A47",
        },

        "dark-olive-drab": {
          DEFAULT: "#3B4C1C",
          300: "#3D3D28",
          900: "#2E3D1C",
        },

        "steel-blue": {
          DEFAULT: "#5D829C",
          300: "#5D829C",
        },

        /* =========================
           NEW RECOMMENDATIONS
           ========================= */

        "recon-slate": {
          50: "#F4F6F7",
          100: "#E5E9EB",
          200: "#C9D1D6",
          300: "#A3AFB8",
          400: "#7A8791",
          500: "#5E6A73",
          600: "#4B565E",
          700: "#3A434A",
          800: "#262D33",
          900: "#14191D",
        },

        "signal-red": {
          100: "#FDECEC",
          300: "#F3A6A6",
          500: "#D64545",
          700: "#A83232",
        },

        "intel-blue": {
          100: "#EAF2F7",
          300: "#9EC0D9",
          500: "#3F6C8E",
          700: "#2F4F68",
          900: "#1C2F3F",
        },

        /* =========================
           NEUTRALS / SURFACES
           ========================= */

        "off-white": "#F5F4ED",
        "soft-ivory": "#FAFAF8",

        "light-tan": {
          DEFAULT: "#F5F1E8",
          50: "#F1E6D3",
          100: "#FFF8DC",
          200: "#E8D8BD",
        },

        "muted-gray": "#A0A0A0",
        "primary-text": "#2D2D2D",
        "light-gray": "#EDEDED",

        /* Custom stone + amber (kept as-is) */
        stone: {
          100: "#f5f5f4",
          200: "#e7e5e4",
          300: "#d6d3d1",
          400: "#a8a29e",
          500: "#78716c",
          600: "#57534e",
          700: "#44403c",
          800: "#292524",
          900: "#1c1917",
        },

        amber: {
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
        },

        /* =========================
           DARK MODE TOKENS (keep existing class names)
           ========================= */

        "dark-bg-primary": "#1F1F1F",
        "dark-bg-secondary": "#2A2A2A",
        "dark-bg-tertiary": "#333333",

        "dark-text-primary": "#F5F4ED",
        "dark-text-secondary": "#EAEAEA",
        "dark-text-muted": "#B0B0B0",
        "dark-text-muted-alt": "#A0A0A0",

        "dark-border": "#404040",
        "dark-od-green": "#6B8E23",

        "dark-bg": {
          primary: "#1F1F1F",
          secondary: "#2A2A2A",
          tertiary: "#333333",
          "tertiary-alt": "#1a1a1a",
        },

        /* =========================
           2026 SEMANTIC ALIASES (additive, non-breaking)
           ========================= */
        brand: {
          od: "#556B2F",
          ranger: "#4A5A28",
          gold: "#CDA349",
          "gold-muted": "#BFA25A",
          tan: "#D4B483",
          steel: "#5D829C",
          gunmetal: "#444A47",
        },
      },

      perspective: {
        1000: "1000px",
      },

      fontFamily: {
        display: ["'Instrument Serif'", "Georgia", "serif"],
        body: ["'DM Sans'", "system-ui", "-apple-system", "sans-serif"],
        orbitron: ["Orbitron", "monospace"],
        inter: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        segoe: ["Segoe UI", "system-ui", "-apple-system", "sans-serif"],
      },
    },
  },

  plugins: [
    ({ addUtilities }) => {
      addUtilities({
        ".perspective-1000": { perspective: "1000px" },
      });
    },
  ],
};