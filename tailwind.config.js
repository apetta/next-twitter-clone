module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'twitter-blue': '#1da1f2',
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
}
