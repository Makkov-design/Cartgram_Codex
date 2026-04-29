import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    screens: {
      sm: "390px",
      md: "768px",
      lg: "1440px",
      xl: "1920px",
    },
    extend: {
      colors: {
        page: "#0b0b0d",
        section: "#17171a",
        primary: "#e6e6f2",
        secondary: "#bebecc",
        tertiary: "#a0a0b2",
        muted: "#8a8a99",
        inverted: "#17171a",
        stroke: "#2c2c33",
      },
      fontFamily: {
        sans: ["TT Firs Neue Trl", "sans-serif"],
      },
      borderRadius: {
        xs: "8px",
        s: "12px",
        xl: "24px",
        xxl: "32px",
      },
      boxShadow: {
        header: "0 12px 40px rgba(0, 0, 0, 0.18)",
      },
    },
  },
};

export default config;
