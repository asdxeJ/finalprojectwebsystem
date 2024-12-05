/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'home-bg': "url('./src/assets/HomePage/bg.jpg')",
      },
      fontFamily: {
        inknut: ['"Inknut Antiqua"', 'serif'],
      },
    },
  },
  plugins: [],
}