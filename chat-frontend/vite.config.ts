import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { VitePWA } from "vite-plugin-pwa";
import process from "process";
import i18nextLoader from "vite-plugin-i18next-loader";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: +process.env.NODE_PORT || 3000,
  },
  plugins: [
    preact(),
  ],
});
