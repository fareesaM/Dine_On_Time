import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: "/Dine_On_Time",
  server: {
    proxy: {
      '/api': {
        target: 'https://fsd-dot-bknd.onrender.com', // Your backend URL
        changeOrigin: true,
        secure: true, // Ensure this is `true` for HTTPS
      },
    },
  },
  build: {
    outDir: 'dist',
  },
});
