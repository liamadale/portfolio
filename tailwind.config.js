/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{astro,html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
<<<<<<< HEAD
      colors: {
        skin: {
          bg: 'var(--color-bg)',
          text: 'var(--color-text)',
          muted: 'var(--color-muted)',
          accent: 'var(--color-accent)',
          heading: 'var(--color-heading)',
          link: 'var(--color-link)',
          highlight: 'var(--color-highlight)',
          'accent-bg': 'var(--color-accent-bg)',
        },
=======
      skin: {
          bg: 'var(--color-bg)',
          text: 'var(--color-text)',
          accent: 'var(--color-accent)',
          muted: 'var(--color-muted)',
>>>>>>> d9f6b75eb883f2dd954ce3bd7d7e5127e5ba7999
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
<<<<<<< HEAD
=======
      backgroundImage: {
        'spotlight': 'radial-gradient(...)' // optional if you want reusable class
      },
>>>>>>> d9f6b75eb883f2dd954ce3bd7d7e5127e5ba7999
    },
  },
  plugins: [],
}
