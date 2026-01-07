/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  safelist: [
    {
      pattern: /^(text|leading|font)-/,
    },
  ],
  theme: {
    extend: {
      /* ===== Colors ===== */
      colors: {
        purple: {
          50: "var(--color-purple-050)",
          100: "var(--color-purple-100)",
          200: "var(--color-purple-200)",
          300: "var(--color-purple-300)",
          400: "var(--color-purple-400)",
          500: "var(--color-purple-500)",
          600: "var(--color-purple-600)",
          700: "var(--color-purple-700)",
          800: "var(--color-purple-800)",
          900: "var(--color-purple-900)",
        },
        lime: {
          50: "var(--color-lime-050)",
          100: "var(--color-lime-100)",
          200: "var(--color-lime-200)",
          300: "var(--color-lime-300)",
          400: "var(--color-lime-400)",
          500: "var(--color-lime-500)",
          600: "var(--color-lime-600)",
          700: "var(--color-lime-700)",
          800: "var(--color-lime-800)",
          900: "var(--color-lime-900)",
        },
        gray: {
          50: "var(--color-gray-050)",
          100: "var(--color-gray-100)",
          200: "var(--color-gray-200)",
          300: "var(--color-gray-300)",
          400: "var(--color-gray-400)",
          500: "var(--color-gray-500)",
          600: "var(--color-gray-600)",
          700: "var(--color-gray-700)",
          800: "var(--color-gray-800)",
          900: "var(--color-gray-900)",
        },
        white: "var(--color-white)",
        black: "var(--color-black)",
      },

      /* ===== Typography ===== */
      fontFamily: {
        sans: ["Pretendard", "system-ui", "sans-serif"],
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
      
      /*Primitive(Font Size)*/
      height: {
        "btn-lg": "var(--btn-height-lg)",
        "btn-md": "var(--btn-height-md)",
      },
      padding: {
        "btn-lg": "var(--btn-px-lg)",
        "btn-md": "var(--btn-px-md)",
      },
      gap: {
        "btn-lg": "var(--btn-gap-lg)",
        "btn-md": "var(--btn-gap-md)",
      },
      borderRadius: {
        pill: "var(--radius-pill)",
      },
    },
  },
  plugins: [],
};
