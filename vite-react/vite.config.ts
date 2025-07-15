import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../extensions/ai-assistant',
    emptyOutDir: true,
    lib: {
      entry: 'src/index.tsx',
      formats: ['es'],
      fileName: () => 'entry.js',
    },
  },
});
