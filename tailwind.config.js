/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: { extend: { colors: { brand: { DEFAULT: '#087f78', dark: '#075a56', light: '#e4f7ee' } } } },
  plugins: [],
};
