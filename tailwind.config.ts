import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1B3A6B",
          light: "#2a5298",
          dark: "#112646",
        },
        accent: {
          green: "#22C55E",
          gold: "#F59E0B",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          muted: "#F9FAFB",
          border: "#F3F4F6",
        },
      },
      fontFamily: {
        sans: ["var(--font-plus-jakarta)", "ui-sans-serif", "system-ui"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "rally-gradient": "linear-gradient(135deg, #1B3A6B 0%, #2a5298 100%)",
        "accent-gradient": "linear-gradient(135deg, #22C55E 0%, #16a34a 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
