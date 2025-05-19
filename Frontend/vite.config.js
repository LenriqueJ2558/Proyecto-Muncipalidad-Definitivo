import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc'; // Asegúrate de tener esta línea

export default defineConfig({
  plugins: [react()],
});