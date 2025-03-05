import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import { execSync } from 'child_process';
import { fileURLToPath, URL } from 'url';
import { defineConfig, loadEnv } from 'vite';
import svgr from 'vite-plugin-svgr';

const getGitCommitId = () => {
  try {
    return execSync('git rev-parse HEAD').toString().trim();
  } catch (error) {
    console.error('Failed to get Git commit ID:', error); // eslint-disable-line no-console
    return 'unknown';
  }
};

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    base: env.VITE_DEPLOY_URL,
    plugins: [
      react(),
      tailwindcss(),
      svgr({
        svgrOptions: {
          plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
          svgoConfig: {
            floatPrecision: 2,
          },
        },
      }),
      {
        name: 'version-generator',
        apply: 'build',
        generateBundle() {
          this.emitFile({
            type: 'asset',
            fileName: 'version.json',
            source: JSON.stringify({ version: `${getGitCommitId()}` }),
          });
        },
      },
    ],
    server: {
      port: 8000,
      open: true,
    },
    resolve: {
      alias: {
        '~': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    build: {
      minify: 'terser',
      rollupOptions: {
        output: {
          compact: true,
          chunkFileNames: 'js/[name]-[hash].js',
          entryFileNames: 'js/[name]-[hash].js',
          assetFileNames: '[ext]/[name]-[hash].[ext]',
          manualChunks: {
            react: ['react', 'react-dom', 'react-router', 'jotai', 'react-hook-form', '@tanstack/react-query'],
            mui: ['@mui/material', '@mui/icons-material', '@emotion/react', '@emotion/styled'],
            // vendor: ["dayjs"],
          },
        },
      },
    },
  };
});
