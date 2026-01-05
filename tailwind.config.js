/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      /* ===== Colors ===== */
      colors: {
        purple: {
          50: "rgb(var(--color-purple-050) / <alpha-value>)",
          100: "rgb(var(--color-purple-100) / <alpha-value>)",
          200: "rgb(var(--color-purple-200) / <alpha-value>)",
          300: "rgb(var(--color-purple-300) / <alpha-value>)",
          400: "rgb(var(--color-purple-400) / <alpha-value>)",
          500: "rgb(var(--color-purple-500) / <alpha-value>)",
          600: "rgb(var(--color-purple-600) / <alpha-value>)",
          700: "rgb(var(--color-purple-700) / <alpha-value>)",
          800: "rgb(var(--color-purple-800) / <alpha-value>)",
          900: "rgb(var(--color-purple-900) / <alpha-value>)",
        },
        lime: {
          50: "rgb(var(--color-lime-050) / <alpha-value>)",
          100: "rgb(var(--color-lime-100) / <alpha-value>)",
          200: "rgb(var(--color-lime-200) / <alpha-value>)",
          300: "rgb(var(--color-lime-300) / <alpha-value>)",
          400: "rgb(var(--color-lime-400) / <alpha-value>)",
          500: "rgb(var(--color-lime-500) / <alpha-value>)",
          600: "rgb(var(--color-lime-600) / <alpha-value>)",
          700: "rgb(var(--color-lime-700) / <alpha-value>)",
          800: "rgb(var(--color-lime-800) / <alpha-value>)",
          900: "rgb(var(--color-lime-900) / <alpha-value>)",
        },
        gray: {
          50: "rgb(var(--color-gray-050) / <alpha-value>)",
          100: "rgb(var(--color-gray-100) / <alpha-value>)",
          200: "rgb(var(--color-gray-200) / <alpha-value>)",
          300: "rgb(var(--color-gray-300) / <alpha-value>)",
          400: "rgb(var(--color-gray-400) / <alpha-value>)",
          500: "rgb(var(--color-gray-500) / <alpha-value>)",
          600: "rgb(var(--color-gray-600) / <alpha-value>)",
          700: "rgb(var(--color-gray-700) / <alpha-value>)",
          800: "rgb(var(--color-gray-800) / <alpha-value>)",
          900: "rgb(var(--color-gray-900) / <alpha-value>)",
        },
        white: "rgb(var(--color-white) / <alpha-value>)",
        black: "rgb(var(--color-black) / <alpha-value>)",
      },

      /* ===== Typography ===== */
      fontFamily: {
        base: "var(--font-family-base)",
      },
      fontSize: {
        xs: "var(--font-xs)",
        sm: "var(--font-sm)",
        md: "var(--font-md)",
        lg: "var(--font-lg)",
        xl: "var(--font-xl)",
        "2xl": "var(--font-2xl)",
        "3xl": "var(--font-3xl)",
      },
      fontWeight: {
        rg: "var(--font-weight-rg)",
        md: "var(--font-weight-md)",
        sb: "var(--font-weight-sb)",
        bd: "var(--font-weight-bd)",
      },
      lineHeight: {
        xs: "var(--line-height-xs)",
        sm: "var(--line-height-sm)",
        md: "var(--line-height-md)",
        lg: "var(--line-height-lg)",
      },
      letterSpacing: {
        base: "var(--letter-spacing-base)",
      },
    },
  },
  plugins: [],
};
