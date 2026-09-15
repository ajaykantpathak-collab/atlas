// Revert incorrect template literal fixes in CellBiologySim.tsx
// Lines that use transform='...' (single quotes) were incorrectly changed to transform='...`
const fs = require('fs');
const filePath = 'D:\\dream_app\\frontend\\components\\simulations\\c9_12\\CellBiologySim.tsx';
let content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');
const BACKTICK = String.fromCharCode(96);

// Lines that were incorrectly fixed (should have ' not backtick at end)
const fixLines = [1000, 1412, 1442, 1457, 1529, 1544]; // 0-indexed

for (const idx of fixLines) {
  if (idx < lines.length) {
    let l = lines[idx];
    // Replace the backtick before > with a single quote
    // Pattern: ...)'`>  should be  ...)'  (but the line might end differently)
    if (l.includes(BACKTICK + '>')) {
      l = l.replace(BACKTICK + '>', "'>");
      lines[idx] = l;
      console.log('Reverted L' + (idx + 1) + ':', l.substring(l.length - 30));
    }
  }
}

fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
console.log('Done');
