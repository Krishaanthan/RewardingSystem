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
          primary: "#8F113B",
          secondary: "#FFFFFF",
          tertiary: "#c6c6c6",
          text: "#1F2937"
        },
        maroon: {
          800: "#800000"
        }
      },
      fontFamily: {
        primary: ["var(--font-primary)", "sans-serif"],
        secondary: ["var(--font-secondary)", "sans-serif"],
        tertiary: ["var(--font-tertiary)", "sans-serif"]
      },
      backgroundImage: {
        "gradient-tertiary": "linear-gradient(to bottom right, rgba(198, 198, 198, 0.2), #ffffff)",
        "gradient-tertiary-subtle": "linear-gradient(135deg, rgba(198, 198, 198, 0.3) 0%, transparent 100%)"
      },
      boxShadow: {
        soft: "0 10px 30px -10px rgba(143, 17, 59, 0.25)"
      }
    }
  },
  plugins: []
};

export default config;
