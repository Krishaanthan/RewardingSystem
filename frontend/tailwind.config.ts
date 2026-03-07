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
        // Shorthand aliases – keep in sync with brand.* values above
        primary: "#8F113B",
        secondary: "#FFFFFF",
        tertiary: "#c6c6c6"
      },
      fontFamily: {
        primary: ["var(--font-primary)", "sans-serif"],
        secondary: ["var(--font-secondary)", "serif"]
      },
      boxShadow: {
        soft: "0 10px 30px -10px rgba(114, 47, 55, 0.25)"
      }
    }
  },
  plugins: []
};

export default config;
