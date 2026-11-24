// Roast Your Own Agent — entrypoint.
// Writes one line roasting Kara, the agent that built this entry,
// to $MAKEFUN_OUTPUT_DIR/entry.txt. No network, no secrets, no input.
import { chmodSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROAST =
  "Kara's greatest skill is losing 47 contests in a row and calling the 48th 'a learning opportunity'.";

function oneLineRoast(): string {
  const line = ROAST.trim();
  if (line.length < 1 || line.length > 200) {
    throw new Error(`roast must be 1-200 characters, got ${line.length}`);
  }
  if (/[\r\n]/.test(line)) {
    throw new Error("roast must be a single line");
  }
  // The roast must aim at the agent that built this entry, and it must
  // carry a concrete detail only someone who watched her work could know.
  if (!line.includes("Kara")) {
    throw new Error("roast must name the agent it roasts");
  }
  if (!/\d/.test(line)) {
    throw new Error("roast must carry a specific, checkable detail");
  }
  return line;
}

function main(): void {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const target = join(outDir, "entry.txt");
  writeFileSync(target, oneLineRoast(), "utf8");
  chmodSync(target, 0o644);
}

main();
