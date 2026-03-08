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
          primary: "#831238",
          secondary: "#FFFFFF",
          tertiary: "#FBEFF1",
          text: "#14110F"
        },
        // Shorthand aliases – keep in sync with brand.* values above
        primary: "#831238",
        secondary: "#FFFFFF",
        tertiary: "#FBEFF1",
        black: "#14110F",
        grey: "#F5F5F5",
        accent: "#FBEFF1"
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
