import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  
  return {
  server: {
    proxy: {
      '/api': {
        target: `http://${env.VITE_HOST}:3000`,
        secure: false,
      },
    },
  },
  plugins: [react()],
}})
