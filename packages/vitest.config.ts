import { fileURLToPath } from "node:url"
import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    environment: "node",
    globals: true,
    include: ["test/**/*.test.ts"],
    alias: {
      "@twisuki/ohday/plugin": fileURLToPath(new URL("./src/plugin/index.ts", import.meta.url)),
      "@twisuki/ohday": fileURLToPath(new URL("./src/index.ts", import.meta.url)),
    },
  },
})
