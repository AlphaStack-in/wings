import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        cream: "var(--color-cream)",
        ivory: "var(--color-ivory)",
        sky: {
          DEFAULT: "var(--color-sky)",
          light: "var(--color-sky-light)",
        },
        leaf: {
          DEFAULT: "var(--color-leaf)",
          light: "var(--color-leaf-light)",
        },
        sun: {
          DEFAULT: "var(--color-sun)",
          light: "var(--color-sun-light)",
        },
        coral: {
          DEFAULT: "var(--color-coral)",
          light: "var(--color-coral-light)",
        },
        ink: "var(--color-ink)",
        muted: "var(--color-muted)",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      borderRadius: {
        xl2: "1.25rem",
        blob: "60% 40% 55% 45% / 55% 45% 55% 45%",
      },
      keyframes: {
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        driftX: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(40px)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "float-slow": "floatSlow 6s ease-in-out infinite",
        "drift-x": "driftX 8s ease-in-out infinite alternate",
        "fade-up": "fadeUp 0.6s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
