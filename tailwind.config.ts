import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#F0F7FF",
        peach: "#78BEF5",
        coral: "#4A9EE7",
        bubble: "#BAD9FB",
        mint: "#A8E6CF",
        lavender: "#C9B6FF",
        butter: "#FFE680",
        ink: "#1C304E",
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
        pop: "0 6px 0 0 rgba(28,48,78,0.15)",
        poplg: "0 10px 0 0 rgba(28,48,78,0.18)",
      },
    },
  },
  plugins: [],
};

export default config;
