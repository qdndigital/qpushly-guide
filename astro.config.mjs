import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://guide.qpushly.com',
  build: { inlineStylesheets: 'always' },
  integrations: [tailwind({ applyBaseStyles: false }), mdx()],
});
