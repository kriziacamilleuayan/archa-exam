import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  base: "./",
  server: {
    open: true,
    port: 3000,
    cors: {
      origin: "http://localhost:3200",
    },
    proxy: {
      "/api": {
        target: "http://localhost:3200",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
      "@src": path.resolve(__dirname, "./src/"),
      "@assets": path.resolve(__dirname, "./src/assets/"),
      "@components": path.resolve(__dirname, "./src/components/"),
      "@pages": path.resolve(__dirname, "./src/pages/"),
      "@utils": path.resolve(__dirname, "./src/utils/"),
      "@api": path.resolve(__dirname, "./src/api/"),
    },
  },
});
