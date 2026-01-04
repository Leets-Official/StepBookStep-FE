/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        //색상 팔레트 구성
        // 1. Primitive/Purple
        purple: {
          50: "#E3E5FD",
          100: "#D2D5FE",
          200: "#A9AAFB",
          300: "#787AEE",
          400: "#5D58E0",
          500: "#4931D4",
          600: "#2D1FAD",
          700: "#170F8F",
          800: "#0E0C67",
          900: "#04043B",
        },
        // 2. Primitive/Lime
        lime: {
          50: "#F8FFEC",
          100: "#ECFFD5",
          200: "#DFFBBE",
          300: "#CDF89B",
          400: "#BBEF80",
          500: "#91D654",
          600: "#67B22A",
          700: "#418917",
          800: "#2D6415",
          900: "#194805",
        },
        // 3. Grayscale
        gray: {
          50: "#F9F9FB",
          100: "#F4F4F6",
          200: "#E8E9ED",
          300: "#CCCDD7",
          400: "#A4A5B7",
          500: "#7E819A",
          600: "#5A5C72",
          700: "#3D3E4D",
          800: "#262731",
          900: "#19191F",
        },
        // 기본 흰색/검은색 명시
        white: "#FFFFFF",
        black: "#000000",
      },
    },
  },

  plugins: [],
};
