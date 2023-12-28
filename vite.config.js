import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/react-movie-search/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets', // Add this line
  },
});
