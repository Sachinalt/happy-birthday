import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Allows access from any IP (use cautiously)
    port: 5173,
    strictPort: true, // Ensures Vite only uses the specified port
    cors: true, // Enables Cross-Origin Resource Sharing
  },
})
