import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    // SECURITY FIX: Removed `https: true` which caused browser cert warnings
    // without proper SSL certificate configuration. Use a proxy like Caddy
    // or mkcert for local HTTPS development instead.
  },
});
