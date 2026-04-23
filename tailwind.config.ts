import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FFF6EC",
        peach: "#FFB7A5",
        coral: "#FF8BA0",
        bubble: "#FFC2DD",
        mint: "#A8E6CF",
        lavender: "#C9B6FF",
        butter: "#FFE680",
        ink: "#4A2B4E",
      },
      fontFamily: {
        sans: [
          "Pretendard Variable",
          "Pretendard",
          "-apple-system",
          "BlinkMacSystemFont",
          "system-ui",
          "sans-serif",
        ],
      },
      boxShadow: {
        pop: "0 6px 0 0 rgba(74,43,78,0.15)",
        poplg: "0 10px 0 0 rgba(74,43,78,0.18)",
      },
    },
  },
  plugins: [],
};

export default config;
