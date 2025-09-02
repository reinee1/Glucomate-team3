import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 5173,
    proxy: {
      // Proxy EXACTLY the prefix you call
      '/api/v1': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
        // no rewrite needed since backend already expects /api/v1/...
      },
    },
  },
});
