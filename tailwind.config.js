/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}",
  ],
  theme: {
    extend: {
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
          'muted-bg': 'var(--color-muted-bg)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      typography: (theme) => ({
        skin: {
          css: {
            color: theme('colors.skin.text'),
            a: { color: theme('colors.skin.accent') },
            strong: { color: theme('colors.skin.heading') },
            h1: { color: theme('colors.skin.heading') },
            h2: { color: theme('colors.skin.heading') },
            h3: { color: theme('colors.skin.heading') },
            code: { color: theme('colors.skin.text') },
            blockquote: {
              color: theme('colors.skin.muted'),
              borderLeftColor: theme('colors.skin.accent'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}