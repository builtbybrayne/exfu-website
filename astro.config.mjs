import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
export default defineConfig({ site: 'https://exfu.ai', trailingSlash: 'always', integrations: [sitemap({filter: (page) => !page.includes('/thanks/') && !page.includes('/404/')})] });
