// Converts every PNG/JPG in a directory to WebP.
//   node to-webp.mjs              → public/, quality 82
//   node to-webp.mjs public 90    → custom directory and quality
// Originals move to .originals-backup/ so you can roll back.

import { readdir, mkdir, rename, stat } from "node:fs/promises"
import { join, parse } from "node:path"
import { existsSync } from "node:fs"
import sharp from "sharp"

const dir = process.argv[2] ?? "public"
const quality = Number(process.argv[3] ?? 82)
const backup = join(dir, ".originals-backup")

if (!existsSync(dir)) {
  console.error(`No such directory: ${dir}`)
  process.exit(1)
}

const files = (await readdir(dir, { withFileTypes: true }))
  .filter((f) => f.isFile() && /\.(png|jpe?g)$/i.test(f.name))
  .map((f) => f.name)

if (files.length === 0) {
  console.log("No PNG or JPG files found.")
  process.exit(0)
}

await mkdir(backup, { recursive: true })
console.log(`Converting ${files.length} file(s) at quality ${quality}\n`)

let before = 0
let after = 0
let done = 0

for (const name of files) {
  const src = join(dir, name)
  const out = join(dir, `${parse(name).name}.webp`)

  if (existsSync(out)) {
    console.log(`  skip  ${name}  (.webp exists)`)
    continue
  }

  // effort:6 trades a little CPU for meaningfully smaller files
  await sharp(src).webp({ quality, effort: 6 }).toFile(out)

  const a = (await stat(src)).size
  const b = (await stat(out)).size
  before += a
  after += b
  done++

  const pct = Math.round(100 - (b / a) * 100)
  console.log(
    `  ok    ${name.padEnd(32)} ${Math.round(a / 1024)}KB -> ${Math.round(b / 1024)}KB  (-${pct}%)`
  )

  await rename(src, join(backup, name))
}

if (done === 0) {
  console.log("\nNothing converted.")
  process.exit(0)
}

const saved = Math.round(100 - (after / before) * 100)
console.log(
  `\nConverted ${done} file(s): ${Math.round(before / 1024)}KB -> ${Math.round(after / 1024)}KB  (-${saved}%)`
)
console.log(`Originals moved to ${backup}\n`)
console.log("Find the paths to update:")
console.log('  Get-ChildItem -Recurse src | Select-String -Pattern "\\.(png|jpe?g)"')