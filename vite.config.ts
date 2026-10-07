import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import { createHtmlPlugin } from 'vite-plugin-html';
import fs from 'node:fs';
import path from 'node:path';
import CONFIG from './portfolio.config';

const ROUTES = [
  'explore',
  'about',
  'portfolio',
  'skills',
  'experience',
  'contact',
  'publications',
];

/**
 * GitHub Pages has no SPA rewrites, so copy index.html into a folder per route
 * (served with 200) and to 404.html for anything else.
 */
function spaRoutes(): Plugin {
  return {
    name: 'spa-routes',
    apply: 'build',
    closeBundle() {
      const dist = path.resolve(__dirname, 'dist');
      const html = fs.readFileSync(path.join(dist, 'index.html'));
      for (const route of ROUTES) {
        fs.mkdirSync(path.join(dist, route), { recursive: true });
        fs.writeFileSync(path.join(dist, route, 'index.html'), html);
      }
      fs.writeFileSync(path.join(dist, '404.html'), html);
    },
  };
}

const { profile, social, siteUrl, seo } = CONFIG;
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profile.name,
  alternateName: profile.handle,
  url: siteUrl,
  jobTitle: profile.roles[0],
  email: `mailto:${social.email}`,
  address: { '@type': 'PostalAddress', addressLocality: profile.location },
  sameAs: [social.github, social.linkedin],
  knowsAbout: CONFIG.skills.map((s) => s.name),
};

// https://vitejs.dev/config/
export default defineConfig({
  base: CONFIG.base || '/',
  plugins: [
    react(),
    createHtmlPlugin({
      inject: {
        data: {
          metaTitle: seo.title,
          metaDescription: seo.description,
          metaImageURL: `https://github.com/${profile.githubUsername}.png?size=800`,
          siteUrl,
          jsonLd: JSON.stringify(jsonLd),
        },
      },
    }),
    // The old GitProfile site registered a service worker. This replaces it with
    // one that unregisters itself, so returning visitors get the new site.
    VitePWA({ selfDestroying: true, manifest: false }),
    spaRoutes(),
  ],
});
