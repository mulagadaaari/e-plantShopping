import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/shoppingreact/",   // ✅ MUST HAVE trailing slash
  plugins: [react()],
})