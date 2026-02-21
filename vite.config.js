import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  const isDev = command === "serve";
  return {
    plugins: [vue(), tailwindcss()],
    server: isDev
      ? {
          proxy: {
            // Proxy /api/* to backend during development
            "/api": {
              target: process.env.VITE_API_BASE || "http://localhost:4000",
              changeOrigin: true,
              rewrite: (path) => path.replace(/^\/api/, "/api"),
            },
          },
        }
      : undefined,
  };
});
