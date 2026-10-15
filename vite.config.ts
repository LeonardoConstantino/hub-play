import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { defineConfig, Plugin } from 'vite';

function syncGamesDataPlugin(): Plugin {
  const sync = () => {
    try {
      if (fs.existsSync('data/games.json')) {
        fs.mkdirSync('public/data', { recursive: true });
        fs.copyFileSync('data/games.json', 'public/data/games.json');
      }
    } catch {
      // Safe fallback
    }
  };

  return {
    name: 'sync-games-data',
    buildStart() {
      sync();
    },
    handleHotUpdate({ file }) {
      if (file.endsWith('data/games.json')) {
        sync();
      }
    },
  };
}

export default defineConfig(({ mode }) => {
  return {
    base: process.env.GITHUB_ACTIONS ? '/hub-play/' : (mode === 'production' ? './' : '/'),
    plugins: [react(), tailwindcss(), syncGamesDataPlugin()],
    resolve: {
      alias: {
        '@': path.resolve('.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
