import { spawnSync } from "node:child_process";

const result = spawnSync("vite", ["build"], {
  stdio: "inherit",
  shell: true,
  env: { ...process.env, CI: "true" },
});

if (result.status !== 0) {
  process.exit(result.status ?? 1);
}

await import("./copy-shell-to-index.mjs");
