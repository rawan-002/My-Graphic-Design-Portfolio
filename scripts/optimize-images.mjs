// One-time image optimizer: resizes large rasters and writes a .webp next to each
// source PNG/JPG without ever touching the originals.
//
// Usage: npm run optimize
import { readdir, stat } from 'node:fs/promises';
import { join, extname, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ASSETS_DIR = join(__dirname, '..', 'src', 'assets');

const MAX_DIMENSION = 2000; // cap longest side; displayed size is well under this
const QUALITY = 82;
const SOURCE_EXT = new Set(['.png', '.jpg', '.jpeg']);

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

const fmt = (bytes) => `${(bytes / 1024 / 1024).toFixed(2)} MB`;

let totalBefore = 0;
let totalAfter = 0;
let count = 0;

console.log(`Optimizing images in ${ASSETS_DIR}\n`);

for await (const file of walk(ASSETS_DIR)) {
  if (!SOURCE_EXT.has(extname(file).toLowerCase())) continue;

  const out = join(dirname(file), `${basename(file, extname(file))}.webp`);
  const before = (await stat(file)).size;

  await sharp(file)
    .resize({
      width: MAX_DIMENSION,
      height: MAX_DIMENSION,
      fit: 'inside',
      withoutEnlargement: true,
    })
    .webp({ quality: QUALITY })
    .toFile(out);

  const after = (await stat(out)).size;
  totalBefore += before;
  totalAfter += after;
  count++;

  const saved = (100 * (1 - after / before)).toFixed(0);
  const rel = file.slice(ASSETS_DIR.length + 1).replace(/\\/g, '/');
  console.log(`  ${rel.padEnd(40)} ${fmt(before).padStart(9)} -> ${fmt(after).padStart(9)}  (-${saved}%)`);
}

console.log(`\n${count} images optimized.`);
console.log(`Total: ${fmt(totalBefore)} -> ${fmt(totalAfter)}  (-${(100 * (1 - totalAfter / totalBefore)).toFixed(0)}%)`);
console.log('Originals were left untouched.');
