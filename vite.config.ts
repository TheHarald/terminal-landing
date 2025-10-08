import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  base: "./",
  mode: "development",
  server: {
    port: 3000,
  },
  preview: {
    port: 3000,
    host: true,
    allowedHosts: true,
  },
  build: {
    outDir: "build",
    assetsDir: "assets",
    sourcemap: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variables.scss";`,
      },
    },
  },
});
