<<<<<<< HEAD
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
=======
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Configuração do Vite
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // porta padrão do Vite
    proxy: {
      '/api': 'http://localhost:5000' // redireciona chamadas para o backend
    }
  }
});
>>>>>>> 3fbeb5cf2c50103ebb4117a926017927c1324c2e
