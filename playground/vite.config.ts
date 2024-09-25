import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    exclude: ["@wont/use-antd-resizable-header"],
  },
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: /^~/,
        replacement: "",
      },
    ],
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  build: {
    minify: false,
  },
});
