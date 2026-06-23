import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Admin runs on its own port so it never clashes with the storefront.
export default defineConfig({
  plugins: [react()],
  server: { port: 5174 },
});
