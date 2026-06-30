import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      screens: {
        nav: "980px",
        mobile: "560px",
      },
    },
  },
  plugins: [],
};

export default config;
