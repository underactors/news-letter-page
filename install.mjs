import { spawnSync } from "node:child_process";
import { existsSync, rmSync } from "node:fs";

const ua = process.env.npm_config_user_agent ?? "";
const isPnpm = ua.startsWith("pnpm/");

if (isPnpm) {
  process.exit(0);
}

for (const stray of ["package-lock.json", "yarn.lock"]) {
  if (existsSync(stray)) rmSync(stray, { force: true });
}

console.log("\n[install] npm detected — this workspace uses pnpm-only features (catalog:, workspace:*).");
console.log("[install] Running `pnpm install` on your behalf...\n");

const result = spawnSync("pnpm", ["install"], {
  stdio: "inherit",
  shell: true,
});

if (result.status !== 0) {
  console.error("\n[install] pnpm install failed. If pnpm is missing: npm i -g pnpm\n");
  process.exit(1);
}

for (const stray of ["package-lock.json", "yarn.lock"]) {
  if (existsSync(stray)) rmSync(stray, { force: true });
}

console.log("\n[install] pnpm install complete. Halting npm here (npm cannot parse catalog:/workspace:* refs).");
console.log("[install] You can now run: npm run dev\n");
process.exit(1);
