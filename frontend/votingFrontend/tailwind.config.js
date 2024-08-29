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
      keyframes: {
        push: {
          '0%, 50%': { transform: 'translate(-50%, 0%) scale(1)' },
          '100%': { transform: 'translate(-50%, -100%) scale(0)' },
        },
      },
      animation: {
        push: 'push 2s infinite linear',
      },
    },
  },
  plugins: [],
}