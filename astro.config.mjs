import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import remarkShortcodes from './src/plugins/remark-shortcodes.js';
import { rehypePrism } from '@astrojs/markdown-remark';

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    mdx(),
  ],
  markdown: {
    remarkPlugins: [remarkShortcodes],
    rehypePlugins: [rehypePrism],
  },
  content: {
    experimental: {
      strict: true,
    },
  },
});
