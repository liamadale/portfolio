<<<<<<< HEAD
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import remarkImageShortcode from './src/plugins/remark-image-shortcode.js';

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
  ],
  markdown: {
    remarkPlugins: [remarkImageShortcode],
  },
});
=======
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import remarkImageShortcode from './src/plugins/remark-image-shortcode.js';

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
  ],
  markdown: {
    remarkPlugins: [remarkImageShortcode],
  },
});
>>>>>>> main
