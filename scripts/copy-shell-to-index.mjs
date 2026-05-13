import fs from "node:fs/promises";
import path from "node:path";

const clientDir = path.join(process.cwd(), "dist", "client");
const shellPath = path.join(clientDir, "_shell.html");
const indexPath = path.join(clientDir, "index.html");

try {
  await fs.access(shellPath);
} catch {
  console.error("copy-shell-to-index: missing dist/client/_shell.html (SPA prerender did not run)");
  process.exit(1);
}

await fs.copyFile(shellPath, indexPath);
