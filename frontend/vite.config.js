import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({
  server: {
    host: true, // Exposes the server to external devices
    port: 3000, // Use the default Vite port
    strictPort: false, // Allow dynamic port reassignment
  },
  plugins: [react()],
});
