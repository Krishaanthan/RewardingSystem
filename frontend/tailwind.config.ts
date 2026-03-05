import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#722F37",
          secondary: "#F4C542",
          tertiary: "#FFFFFF",
          text: "#1F2937"
        },
        faculty: {
          primary: "#8F113B",
          bg: "#f4f4f5",
          card: "#FFFFFF",
          border: "#e5e7eb",
          "text-main": "#1a1a2e",
          "text-muted": "#6b7280",
          success: "#16a34a",
          warning: "#d97706",
          danger: "#dc2626",
          info: "#2563eb",
          "primary-hover": "#6e0d2d",
          "row-hover": "#fdf9fa",
          "table-header-bg": "#fdf2f5",
          "table-header-border": "#f3c0ce"
        }
      },
      fontFamily: {
        primary: ["var(--font-primary)", "sans-serif"],
        secondary: ["var(--font-secondary)", "serif"],
        "league-spartan": ["var(--font-league-spartan)", "sans-serif"],
        "archivo-black": ["var(--font-archivo-black)", "sans-serif"]
      },
      borderRadius: {
        "xl": "14px"
      },
      boxShadow: {
        soft: "0 10px 30px -10px rgba(114, 47, 55, 0.25)",
        faculty: "0 1px 4px rgba(0,0,0,0.05)"
      }
    }
  },
  plugins: []
};

export default config;
