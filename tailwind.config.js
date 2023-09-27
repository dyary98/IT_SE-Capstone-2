/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
      primaryColor: "#FBFAF8",
      secondaryColor: "#091E05  ",
      thirdColor: "#798071",
      newBg: "#e9ecef",
      },
    },
  },
  plugins: [],
}

