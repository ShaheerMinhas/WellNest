/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust paths if necessary
  ],
  theme: {
    extend: {
      fontFamily: {
        bruno: ['"Bruno Ace SC"', 'cursive'], // Add Bruno Ace SC
        inria: ['"Inria Sans"', 'sans-serif'], // Add Inria Sans
      },
    },
  },
  plugins: [],
}
