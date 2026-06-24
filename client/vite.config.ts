import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Keep paths as-is instead of resolving the real target. This avoids
  // "Failed to load url /src/main.tsx" errors when the project is served from a
  // mapped/subst drive (e.g. X:) that points to a real folder on C:.
  resolve: {
    preserveSymlinks: true,
  },
  server: {
    port: 5173,
    fs: {
      strict: false,
    },
    proxy: {
      // Forward API calls to the Express server during development.
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
});
