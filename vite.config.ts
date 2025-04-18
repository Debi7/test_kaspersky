import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5500,
  },
  build: {
    outDir: 'dist',
  },
  base: '/test_kaspersky/',
  css: {
    preprocessorOptions: {
      scss: {},
    },
  },
});
