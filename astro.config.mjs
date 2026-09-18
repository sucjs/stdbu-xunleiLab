// @ts-check

import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

const deployTarget = import.meta.env.ASTRO_DEPLOY_TARGET;

const adapter = deployTarget === 'vercel' ? vercel() : undefined;

export default defineConfig({
  ...(adapter ? { adapter } : {}),
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
