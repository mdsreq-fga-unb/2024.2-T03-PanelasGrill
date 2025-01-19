import type { Config } from "tailwindcss";
const fontFamily = require("tailwindcss/defaultTheme").fontFamily;
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'], // Adicione sua fonte personalizada
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'primary-gray': '#FAFAFA',
        'primary-orange': '#F8A967',
      },
    },
  },
  plugins: [],
} satisfies Config;
