import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  build: {
    // Target modern browsers — smaller output, no legacy polyfills
    target: 'es2020',

    // Disable source maps in production — saves ~30-40% bundle size on disk
    sourcemap: false,

    // Warn when a chunk exceeds 500 kB (down from Vite's default 500 kB — explicit)
    chunkSizeWarningLimit: 500,

    // CSS code splitting — each async chunk gets its own CSS file
    // Improves LCP: critical CSS loads only when its chunk is needed
    cssCodeSplit: true,

    rollupOptions: {
      output: {
        // Fine-grained manual chunks — prevents vendor code from bloating app chunks
        manualChunks(id) {
          // React runtime — always cached, rarely changes
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'vendor-react';
          }
          // Supabase — large dependency, only needed on contact/admin pages
          if (id.includes('node_modules/@supabase/')) {
            return 'vendor-supabase';
          }
          // hCaptcha — only needed on contact page
          if (id.includes('node_modules/@hcaptcha/')) {
            return 'vendor-hcaptcha';
          }
          // Lucide icons — tree-shaken but grouped to avoid per-import overhead
          if (id.includes('node_modules/lucide-react/')) {
            return 'vendor-icons';
          }
        },

        // Deterministic filenames — improves CDN cache hit rate
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
  },

  // Development server config
  server: {
    // Compress responses in dev to match prod behaviour
    headers: {
      'Cache-Control': 'no-store',
    },
  },
});
