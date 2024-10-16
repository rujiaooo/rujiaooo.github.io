import { defineConfig, loadEnv } from "vite"
import { UserConfig } from "vitest/config"
import react from "@vitejs/plugin-react"
import legacy from "@vitejs/plugin-legacy"

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [
      react(),
      legacy({
        targets: ["ie >= 11"],
        renderLegacyChunks: true,
        modernPolyfills: true,
      }),
    ],
    esbuild: {
      target: "es6",
      include: /\.(ts|jsx|tsx)$/,
    },
    build: {
      // plugin-legacy overrode 'build.target'. You should pass 'targets' as an option to this plugin with the list of legacy browsers to support instead.
      // target: "es6",
      emptyOutDir: true,
      outDir: "./build",
    },
    server: {
      strictPort: true,
      port: parseInt(env.VITE_PORT)
    },
    preview: {
      strictPort: true,
      port: parseInt(env.VITE_PREVIEW_PORT)
    },
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: ["./test.setup.ts"],
      css: false,
      coverage: {
        include: [
          "src/**/*.{js,jsx,ts,tsx}",
          "!src/main.tsx"
        ]
      }
    },
  } as UserConfig
})
