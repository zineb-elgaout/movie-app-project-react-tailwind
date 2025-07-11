/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      lineHeight: {
        'extra': '2.5',
        'tightest': '1.1',
      },
      colors: {
        bordeaux: {
          50: '#f9f2f5',
          100: '#f2e6eb',
          200: '#dfc0d0',
          300: '#cc99b5',
          400: '#a84d7f',
          500: '#591036', // Votre couleur de base
          600: '#500e31',
          700: '#430c29',
          800: '#360920',
          900: '#2c071a',
        },
      },
    },
  },
  plugins: [],
}