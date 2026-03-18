import sharp from 'sharp';
import { readdir, stat, unlink } from 'fs/promises';
import { join, extname, basename } from 'path';

const PUBLIC_DIR = './public/images';
const QUALITY_JPEG = 80;
const QUALITY_PNG_TO_JPEG = 82;
const MAX_WIDTH = 1920;

// Files to delete (unused / dead weight)
const DELETE_LIST = [
  'public/images/backgrounds/aluminium-cladding.jpg', // 7MB unused
  'public/images/polestar1.jpg.jpg',                  // double extension, unused
  'public/images/polestar2.jpg.jpg',                  // double extension, unused
  'public/images/polestar3.jpg.jpg',                  // double extension, unused
  'public/images/polestar.jpg',                        // unused
];

async function getAllImages(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await getAllImages(fullPath));
    } else if (/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/.test(entry.name)) {
      files.push(fullPath);
    }
  }
  return files;
}

function formatBytes(b) {
  return (b / 1024 / 1024).toFixed(2) + ' MB';
}

async function compressImage(filePath) {
  const info = await stat(filePath);
  const sizeBefore = info.size;
  const ext = extname(filePath).toLowerCase();
  const isPng = ext === '.png';

  try {
    // Read as buffer to avoid Windows path issues (spaces, uppercase .JPG, etc.)
    const { readFile } = await import('fs/promises');
    const inputBuffer = await readFile(filePath);
    const img = sharp(inputBuffer);
    const meta = await img.metadata();

    // Skip tiny files already under 300KB
    if (sizeBefore < 300 * 1024) {
      return { file: filePath, skipped: true, reason: 'already small' };
    }

    const resizeOptions = meta.width > MAX_WIDTH ? { width: MAX_WIDTH } : {};
    const outputPath = isPng
      ? filePath.replace(/\.png$/i, '.jpg')
      : filePath;

    const buf = await img
      .resize(resizeOptions)
      .jpeg({ quality: isPng ? QUALITY_PNG_TO_JPEG : QUALITY_JPEG, mozjpeg: true })
      .toBuffer();

    // Only write if we actually saved space
    if (buf.length < sizeBefore * 0.95) {
      const { writeFile } = await import('fs/promises');
      await writeFile(outputPath, buf);
      if (isPng) await unlink(filePath); // remove original .png
      return {
        file: filePath,
        output: outputPath,
        before: sizeBefore,
        after: buf.length,
        saved: formatBytes(sizeBefore - buf.length),
        pct: Math.round((1 - buf.length / sizeBefore) * 100) + '%',
      };
    } else {
      return { file: filePath, skipped: true, reason: 'no significant gain' };
    }
  } catch (err) {
    return { file: filePath, error: err.message };
  }
}

async function main() {
  // 1. Delete unused files
  console.log('\n=== Deleting unused files ===');
  for (const f of DELETE_LIST) {
    try {
      await unlink(f);
      const s = await stat(f).catch(() => null);
      console.log(`  DELETED  ${f}`);
    } catch {
      console.log(`  SKIP     ${f} (not found)`);
    }
  }

  // 2. Compress all images
  console.log('\n=== Compressing images ===');
  const files = await getAllImages(PUBLIC_DIR);
  console.log(`Found ${files.length} images\n`);

  let totalSaved = 0;
  const results = [];

  for (const f of files) {
    const r = await compressImage(f);
    results.push(r);
    if (r.error) {
      console.log(`  ERROR    ${basename(r.file)}: ${r.error}`);
    } else if (r.skipped) {
      console.log(`  SKIP     ${basename(r.file)} (${r.reason})`);
    } else {
      totalSaved += r.before - r.after;
      console.log(`  OK       ${basename(r.file)}: ${formatBytes(r.before)} → ${formatBytes(r.after)} (-${r.pct} / -${r.saved})`);
    }
  }

  console.log(`\n=== Total saved: ${formatBytes(totalSaved)} ===\n`);
}

main().catch(console.error);
