import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#1d2433",
        paper: "#fffdf8",
        moss: "#3f6f5e",
        clay: "#b95f42",
        wheat: "#f3e2bd",
        cloud: "#edf4f2",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "Arial", "sans-serif"],
      },
      boxShadow: {
        soft: "0 18px 50px rgba(29, 36, 51, 0.10)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
