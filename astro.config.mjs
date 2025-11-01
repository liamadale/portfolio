import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import remarkImageShortcode from './src/plugins/remark-image-shortcode.js';

// https://astro.build/config
export default defineConfig({
  site: 'https://liamadale.com',
  integrations: [
    tailwind(),
  ],
  markdown: {
    smartypants: false,
    remarkPlugins: [remarkImageShortcode],
  },
});
