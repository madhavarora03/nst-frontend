import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts: ['63b7-2401-4900-1c74-bd89-4c08-f1bc-c733-41d.ngrok-free.app'],
  }
})
