import { spawn } from "node:child_process";

const env = {
  ...process.env,
  PORT: process.env.PORT ?? "5173",
  BASE_PATH: process.env.BASE_PATH ?? "/",
};

const child = spawn(
  "pnpm",
  ["--filter", "@workspace/newsletter", "run", "dev"],
  { stdio: "inherit", env, shell: true },
);

child.on("exit", (code) => process.exit(code ?? 0));
