/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  darkMode: ['selector', '[class="p-dark"]'],
  plugins: [require('tailwindcss-primeui')],
};
