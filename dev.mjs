import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

function start(label, command, args, options = {}) {
  const child = spawn(command, args, {
    stdio: "inherit",
    env: process.env,
    ...options,
  });

  child.on("exit", (code) => {
    if (code && code !== 0) {
      process.exitCode = code;
    }
  });
 
  return child; 
}

const node = process.execPath;

const server = start("server", node, ["index.js"], {
  cwd: fileURLToPath(new URL("./Server/", import.meta.url)),
});

const client = start(
  "client",
  node,
  ["node_modules/vite/bin/vite.js"],
  {
    cwd: fileURLToPath(new URL("./Client/Client/", import.meta.url)),
  }
);

function shutdown() {
  server.kill("SIGINT");
  client.kill("SIGINT");
}

process.on("SIGINT", () => {
  shutdown();
});

process.on("SIGTERM", () => {
  shutdown();
});
