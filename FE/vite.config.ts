import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  // 다른 환경 변수들에 대한 타입 정의...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 3000,
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});