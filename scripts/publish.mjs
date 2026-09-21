/**
 * @description Publish pipeline for @twisuki/ohday.
 *
 * @usage
 * - `pnpm run publish`
 * - `pnpm run publish -- --dry-run`
 * - `pnpm run publish -- --tag beta`
 */

import { execSync } from "node:child_process"
import { copyFileSync, existsSync, unlinkSync } from "node:fs"
import { dirname, resolve } from "node:path"
import process from "node:process"
import { fileURLToPath } from "node:url"

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const PACKAGE_DIR = resolve(ROOT, "packages")
const ASSETS = ["README.md", "LICENSE"]

function log(msg) {
  console.log(`\n\x1B[46m PUBLISHER \x1B[0m `, msg, "\n")
}

log("Publishing @twisuki/ohday...")

log("1. build")
execSync("pnpm build", { stdio: "inherit", cwd: PACKAGE_DIR })

log("2. copy")
for (const file of ASSETS) {
  copyFileSync(resolve(ROOT, file), resolve(PACKAGE_DIR, file))
}

try {
  log("3. publish")
  const publishArgs = process.argv.slice(2).join(" ")
  execSync(`pnpm publish ${publishArgs}`.trim(), { stdio: "inherit", cwd: PACKAGE_DIR })
}
finally {
  log("4. remove")
  for (const file of ASSETS) {
    const target = resolve(PACKAGE_DIR, file)
    if (existsSync(target))
      unlinkSync(target)
  }
}

log("Published")
