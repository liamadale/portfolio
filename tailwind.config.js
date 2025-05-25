/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{astro,html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      skin: {
          bg: 'var(--color-bg)',
          text: 'var(--color-text)',
          accent: 'var(--color-accent)',
          muted: 'var(--color-muted)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'spotlight': 'radial-gradient(...)' // optional if you want reusable class
      },
    },
  },
  plugins: [],
}
