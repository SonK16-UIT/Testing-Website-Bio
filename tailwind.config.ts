import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: "#0F1117",
          surface: "#161922",
          surfaceHover: "#1E222F",
          border: "#2A2F3D",
          red: "#E51937",
          redGlow: "#FF3B5C",
          white: "#F8FAFC",
          muted: "#94A3B8",
          darkRed: "#A30B22",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-outfit)", "sans-serif"],
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "glow-bounce": "glowBounce 2s ease-in-out infinite alternate",
        "border-shine": "borderShine 3s linear infinite",
      },
      keyframes: {
        glowBounce: {
          "0%": { boxShadow: "0 0 15px rgba(229, 25, 55, 0.4)" },
          "100%": { boxShadow: "0 0 30px rgba(255, 59, 92, 0.8)" },
        },
        borderShine: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
