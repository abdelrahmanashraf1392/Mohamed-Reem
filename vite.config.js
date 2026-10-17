import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' keeps the build portable (Netlify, Vercel, GitHub Pages, any sub-folder).
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    target: 'es2019',
    chunkSizeWarningLimit: 700,
  },
});
