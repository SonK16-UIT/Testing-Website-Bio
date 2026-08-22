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
          bg: "#120E16",
          surface: "#1D1726",
          surfaceHover: "#292036",
          border: "#3A2D4C",
          pink: "#F4719C",
          pinkGlow: "#FF8DAA",
          purple: "#A855F7",
          purpleGlow: "#C084FC",
          white: "#FAF5F8",
          muted: "#C4B5FD",
          brown: "#8B5A4F",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-outfit)", "sans-serif"],
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "glow-bounce": "glowBounce 2s ease-in-out infinite alternate",
      },
      keyframes: {
        glowBounce: {
          "0%": { boxShadow: "0 0 15px rgba(244, 113, 156, 0.4)" },
          "100%": { boxShadow: "0 0 30px rgba(168, 85, 247, 0.8)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
