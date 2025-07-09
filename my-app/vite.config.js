import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// 프론트엔드에서 `/api` 경로 요청 시, Express 서버로 프록시 연결
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
