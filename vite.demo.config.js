import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  base: "/control-copy/",
  build: {
    outDir: "demo-dist",
    rollupOptions: {
      input: "index.html",
    },
  },
});
