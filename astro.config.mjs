import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import remarkImageShortcode from './src/plugins/remarkImageShortcode.js';
import debugPlugin from './src/plugins/debugPlugin.js';

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
  ],
  markdown: {
    remarkPlugins: [debugPlugin, remarkImageShortcode],
  },
});
