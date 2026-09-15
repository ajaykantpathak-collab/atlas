/**
 * convert-emoji-to-png.js
 * Converts OpenMoji SVG files to PNG using sharp.
 */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const SRC = 'public/assets/emoji';
const SIZE = 128;

async function convert() {
  const svgs = fs.readdirSync(SRC).filter(f => f.endsWith('.svg'));
  let done = 0;
  for (const svg of svgs) {
    const srcPath = path.join(SRC, svg);
    const destPath = path.join(SRC, svg.replace('.svg', '.png'));
    if (fs.existsSync(destPath)) { done++; continue; }
    try {
      await sharp(srcPath, { density: 300 })
        .resize(SIZE, SIZE, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .png()
        .toFile(destPath);
      done++;
    } catch (e) {
      console.error('Failed:', svg, e.message);
    }
  }
  console.log(`Converted ${done}/${svgs.length} SVGs to PNG (${SIZE}x${SIZE})`);
}
convert();
