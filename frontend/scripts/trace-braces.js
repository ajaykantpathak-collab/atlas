const fs = require('fs');
const content = fs.readFileSync('D:\\dream_app\\frontend\\components\\simulations\\c9_12\\NervousSystemSim.tsx', 'utf8');
const lines = content.split('\n');
const BACKTICK = String.fromCharCode(96);

let depth = 0;
let inString = false;
let stringChar = '';
let inTemplate = false;
let inComment = false;
let inLineComment = false;

for (let i = 133; i < 1204; i++) {
  const line = lines[i];
  inLineComment = false;
  for (let j = 0; j < line.length; j++) {
    const ch = line[j];
    const next = line[j + 1];

    if (inLineComment) break;
    if (inComment) {
      if (ch === '*' && next === '/') { inComment = false; j++; }
      continue;
    }
    if (ch === '/' && next === '/') { inLineComment = true; break; }
    if (ch === '/' && next === '*') { inComment = true; j++; continue; }

    if (inString) {
      if (ch === '\\') { j++; continue; }
      if (ch === stringChar) { inString = false; }
      continue;
    }
    if (inTemplate) {
      if (ch === '\\') { j++; continue; }
      if (ch === BACKTICK) { inTemplate = false; }
      // ${} inside template — skip for now
      continue;
    }

    if (ch === '"' || ch === "'") { inString = true; stringChar = ch; continue; }
    if (ch === BACKTICK) { inTemplate = true; continue; }

    if (ch === '{') depth++;
    if (ch === '}') depth--;
  }

  if (depth <= 0 && i > 133) {
    console.log(`Depth reaches 0 at L${i+1}: depth=${depth}`);
    console.log(`  Line: ${line.substring(0, 100)}`);
    break;
  }
}

console.log('Final depth:', depth);
