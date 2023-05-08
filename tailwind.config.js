/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: '16px',
    },
    extend: {
      screens: {
        '2xl': '1320px',
      },
      // keyframes: {
      //   wave: {
      //     '0%': { transform: 'rotate(0.0deg)' },
      //     '10%': { transform: 'rotate(14deg)' },
      //     '20%': { transform: 'rotate(-8deg)' },
      //     '30%': { transform: 'rotate(14deg)' },
      //     '40%': { transform: 'rotate(-4deg)' },
      //     '50%': { transform: 'rotate(10.0deg)' },
      //     '60%': { transform: 'rotate(0.0deg)' },
      //     '100%': { transform: 'rotate(0.0deg)' },
      //   },
      // },
      // animation: {
      //   'waving-hand': 'wave 2s linear infinite',
      // },
    },
  },
  plugins: [],
}
