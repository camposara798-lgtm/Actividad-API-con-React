import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
      '/inicio': 'http://localhost:3000',
      '/informacion': 'http://localhost:3000',
      '/solicitudes': 'http://localhost:3000'
    }
  }
})
