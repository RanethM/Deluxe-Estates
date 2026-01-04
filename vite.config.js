/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/Deluxe-Estates/',
  plugins: [react()],

  test: {
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
    globals: true
  },
});
