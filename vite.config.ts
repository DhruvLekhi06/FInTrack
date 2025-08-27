import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  base: '/FinTrack/',
  resolve: {
    alias: { '@': path.resolve(__dirname, '.') }
  }
})
