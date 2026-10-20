
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        todo: {
          turquoise: "#51BEC5",
          "turquoise-light": "#A0E8E5",
          background: "#F4F4F4",
          text: "#3F3F3F",
        },
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      borderRadius: {
        input: "9999px",
      },
    },
  },
  plugins: [],
};
