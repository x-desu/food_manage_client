import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      external: ['imagekitio-react'], // Add this line
    },
  },
  resolve: {
    alias: {
      'date-fns': 'date-fns/esm/index.js', // Add this line
    },
  },
 
})
