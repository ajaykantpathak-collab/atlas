const fs = require('fs');
const content = fs.readFileSync('D:\\dream_app\\frontend\\components\\simulations\\c9_12\\CellBiologySim.tsx', 'utf8');
const lines = content.split('\n');
const BACKTICK = String.fromCharCode(96);

let depth = 0;
let inString = false;
let stringChar = '';
let inTemplate = false;

for (let i = 420; i < lines.length; i++) {
  const line = lines[i];
  for (let j = 0; j < line.length; j++) {
    const ch = line[j];
    if (inString) {
      if (ch === '\\') { j++; continue; }
      if (ch === stringChar) { inString = false; }
      continue;
    }
    if (inTemplate) {
      if (ch === '\\') { j++; continue; }
      if (ch === BACKTICK) { inTemplate = false; }
      continue;
    }
    if (ch === '"' || ch === "'") { inString = true; stringChar = ch; continue; }
    if (ch === BACKTICK) { inTemplate = true; continue; }
    if (ch === '{') depth++;
    if (ch === '}') depth--;
  }
  if (depth <= 0 && i > 420) {
    console.log(`Component closes at L${i+1}: depth=${depth}`);
    console.log(`  Line: ${line.substring(0, 100)}`);
    break;
  }
}
console.log('Final depth:', depth);
