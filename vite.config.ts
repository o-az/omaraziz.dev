/// <reference types="vite/client" />
/// <reference types="vitest" />

// Plugins
import reactPlugin from '@vitejs/plugin-react'
import type { UserConfig } from 'vite'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

const config: UserConfig = {
  plugins: [reactPlugin(), tsconfigPaths()],
  resolve: {
    alias: {
      '@/': './src',
    },
  },
  test: { globals: true },
}

// https://vitejs.dev/config/
export default defineConfig({ ...config })
