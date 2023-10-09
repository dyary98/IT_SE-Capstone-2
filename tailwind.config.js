/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryColor: "#40513B",
        secondaryColor: "#609966  ",
        thirdColor: "#9DC08B",
        newBg: "#EDF1D6",
      },
    },
  },
  plugins: [],
};
