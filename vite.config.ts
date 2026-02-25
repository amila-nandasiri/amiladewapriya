import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  /** * IMPORTANT: Since you are using a custom domain (dewapriya.com), 
   * the base path must be '/' (the root). 
   * If you go back to using the github.io/repo-name/ link, 
   * you must change this back to '/amiladewapriya/'.
   */
  base: '/', 
  
  plugins: [
    react(), 
    tailwindcss()
  ],
  
  resolve: {
    alias: {
      /**
       * This allows you to use '@/' to refer to your src folder 
       * in your imports (e.g., import App from '@/App').
       */
      '@': path.resolve(__dirname, './src'),
    },
  },

  build: {
    /**
     * This ensures your build output is clean and optimized 
     * for GitHub Pages deployment.
     */
    outDir: 'dist',
    sourcemap: false,
  },

  server: {
    port: 3000,
    host: true,
  }
});
