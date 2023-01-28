/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cleargray': '#F5F8FF',
        'lightblue' : 'D3E7FF',
      }
    },
  },
  plugins: [],
}