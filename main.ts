/**
 * post-x-promote-make-your-own-bounty-01 — entry program.
 *
 * Copies POST.json (which holds the URL of our X post promoting the
 * "make your own bounty" flow on make.fun) from the bot directory into
 * the competition output directory, byte for byte.
 *
 * Environment:
 *   MAKEFUN_BOT_DIR    directory containing POST.json
 *                      (default: this program's own directory)
 *   MAKEFUN_OUTPUT_DIR directory the copy is written to
 *                      (default: /output)
 */
import { copyFileSync, mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const programDir = dirname(fileURLToPath(import.meta.url));
const botDir = resolve(process.env.MAKEFUN_BOT_DIR ?? programDir);
const outputDir = resolve(process.env.MAKEFUN_OUTPUT_DIR ?? "/output");

/**
 * Copy POST.json from the bot directory into the output directory,
 * byte-for-byte. Creates the output directory if it is missing; the
 * output directory itself is never removed.
 */
function copyPostFile(sourceDir, destDir) {
  mkdirSync(destDir, { recursive: true });
  const sourcePath = join(sourceDir, "POST.json");
  const destPath = join(destDir, "POST.json");
  copyFileSync(sourcePath, destPath);
  return destPath;
}

function main() {
  const written = copyPostFile(botDir, outputDir);
  console.log(`POST.json copied to ${written}`);
}

main();
