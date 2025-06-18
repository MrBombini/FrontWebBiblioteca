import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
  // server: {
  //   host: true,             // Escucha en 0.0.0.0 (todas las interfaces)
  //   port: 5173,             // Puedes cambiar el puerto si lo deseas
  //   strictPort: true,       // Error si el puerto ya está ocupado
  //   cors: true,             // Habilita CORS (opcional para APIs)
  //   origin: 'https://front.loca.lt', // importante para evitar errores de WebSocket
  //   hmr: {
  //     clientPort: 443,       // Necesario si usas HTTPS en localtunnel
  //     protocol: 'wss',       // Usa WebSocket seguro
  //     host: 'front.loca.lt'  // El subdominio que usaste en lt
  //   }
  // }
})
