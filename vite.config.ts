// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import fs from "node:fs/promises";
import path from "node:path";
import type { Plugin } from "vite";
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

/** TanStack prerender loads `dist/server/server.js`, but the Cloudflare worker bundle is `index.js`. */
function tanstackPrerenderServerShim(): Plugin {
  return {
    name: "tanstack-prerender-server-shim",
    apply: "build",
    async writeBundle(outputOptions) {
      const dir = outputOptions.dir;
      if (!dir) return;
      if (path.basename(dir) !== "server" || path.basename(path.dirname(dir)) !== "dist") return;
      const indexJs = path.join(dir, "index.js");
      const serverJs = path.join(dir, "server.js");
      try {
        await fs.access(indexJs);
        await fs.copyFile(indexJs, serverJs);
      } catch {
        /* ignore */
      }
    },
  };
}

// Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
// @cloudflare/vite-plugin builds from this — wrangler.jsonc main alone is insufficient.
export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
    // Prerenders SPA shell to dist/client/_shell.html; npm post-step copies it to index.html for static hosts.
    spa: {},
  },
  plugins: [tanstackPrerenderServerShim()],
});
