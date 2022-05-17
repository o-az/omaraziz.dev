/// <reference types="vite/client" />

import { defineConfig } from 'vite'
import type { UserConfig } from 'vite'
// Plugins
import reactPlugin from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

const config: UserConfig = {
  plugins: [reactPlugin(), tsconfigPaths()],
  resolve: {
    alias: {
      '@/': './src',
    },
  },
}

// https://vitejs.dev/config/
export default defineConfig({ ...config })
