import sharp from 'sharp';
import { readdir, stat, unlink } from 'node:fs/promises';
import { join, extname, basename } from 'node:path';

const IMAGES_DIR = join(import.meta.dirname, '..', 'public', 'images');
const QUALITY = 75;
const MAX_WIDTH = 1600;
const EXTENSIONS = new Set(['.jpg', '.jpeg', '.png']);
// Skip files that should stay in original format
const SKIP_FILES = new Set(['favicon.png', 'og-image.jpg']);

let totalOriginal = 0;
let totalWebp = 0;
let fileCount = 0;
let skippedCount = 0;

async function walkDir(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      await walkDir(fullPath);
    } else if (EXTENSIONS.has(extname(entry.name).toLowerCase()) && !SKIP_FILES.has(entry.name)) {
      await convertToWebp(fullPath);
    }
  }
}

async function convertToWebp(filePath) {
  const outputPath = filePath.replace(/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/i, '.webp');
  const name = basename(filePath);

  try {
    const originalStats = await stat(filePath);
    const originalSize = originalStats.size;

    let pipeline = sharp(filePath);

    // Resize if wider than MAX_WIDTH
    const metadata = await sharp(filePath).metadata();
    if (metadata.width && metadata.width > MAX_WIDTH) {
      pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
    }

    await pipeline.webp({ quality: QUALITY }).toFile(outputPath);

    const webpStats = await stat(outputPath);
    const webpSize = webpStats.size;

    // Only keep WebP if it's actually smaller
    if (webpSize >= originalSize) {
      await unlink(outputPath);
      skippedCount++;
      console.log(`  KEEP ${name} — original (${(originalSize / 1024).toFixed(0)} KB) is already smaller`);
      return;
    }

    const saving = ((1 - webpSize / originalSize) * 100).toFixed(1);

    totalOriginal += originalSize;
    totalWebp += webpSize;
    fileCount++;

    const origKB = (originalSize / 1024).toFixed(0);
    const webpKB = (webpSize / 1024).toFixed(0);
    console.log(`  ${name} -> .webp — ${origKB} KB -> ${webpKB} KB (${saving}% saved)`);
  } catch (err) {
    console.warn(`  SKIP ${name} — ${err.message}`);
  }
}

console.log(`\nOptimizing images in ${IMAGES_DIR}\n`);
console.log(`Settings: WebP quality ${QUALITY}%, max width ${MAX_WIDTH}px\n`);

await walkDir(IMAGES_DIR);

const totalOrigMB = (totalOriginal / 1024 / 1024).toFixed(1);
const totalWebpMB = (totalWebp / 1024 / 1024).toFixed(1);
const totalSaving = totalOriginal > 0 ? ((1 - totalWebp / totalOriginal) * 100).toFixed(1) : '0';

console.log(`\n--- Summary ---`);
console.log(`Files converted: ${fileCount}`);
console.log(`Files kept as original: ${skippedCount}`);
console.log(`Original total (converted only): ${totalOrigMB} MB`);
console.log(`WebP total:      ${totalWebpMB} MB`);
console.log(`Total saved:     ${totalSaving}%`);
console.log(`\nDone! WebP files generated alongside originals.`);
