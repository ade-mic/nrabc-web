import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react')) {
              return 'react-vendor'; // Create a separate chunk for React
            }
            return 'vendor'; // Create a general vendor chunk for other dependencies
          }
        },
      },
    },
    chunkSizeWarningLimit: 2000, // Optional: Raise the warning limit
  },
  plugins: [react()],
})
