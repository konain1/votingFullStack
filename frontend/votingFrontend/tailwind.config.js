/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        baijumjuree: ['Baijumjuree', 'sans-serif'],
        dacasa:['dacasa','sans-serif'],
        stonewalls:['Stone Walls','sans-serif'],
        madjumbles:['madjumbles','Stone Walls']
      },
    },
  },
  plugins: [],
}