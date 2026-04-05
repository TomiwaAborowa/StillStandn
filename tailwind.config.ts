import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50:  "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
        },
        sky: {
          50:  "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
        },
        cream: "#faf8f4",
        sand:  "#f5f0e8",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body:    ["var(--font-body)", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in":       "fadeIn 0.8s ease forwards",
        "slide-up":      "slideUp 0.7s ease forwards",
        "float":         "float 6s ease-in-out infinite",
        "shimmer":       "shimmer 1.5s infinite",
        "pulse-soft":    "pulseSoft 3s ease-in-out infinite",
        "glow":          "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        fadeIn:    { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        slideUp:   { "0%": { opacity: "0", transform: "translateY(30px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        float:     { "0%,100%": { transform: "translateY(0px)" }, "50%": { transform: "translateY(-12px)" } },
        shimmer:   { "0%": { backgroundPosition: "-200% 0" }, "100%": { backgroundPosition: "200% 0" } },
        pulseSoft: { "0%,100%": { opacity: "1" }, "50%": { opacity: "0.7" } },
        glow:      { "0%": { boxShadow: "0 0 20px rgba(251,191,36,0.2)" }, "100%": { boxShadow: "0 0 40px rgba(251,191,36,0.5)" } },
      },
      backdropBlur: { xs: "2px" },
    },
  },
  plugins: [],
};

export default config;
