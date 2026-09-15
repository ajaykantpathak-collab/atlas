// Find the extra opening brace by tracking depth at each line
const ts = require('typescript');
const fs = require('fs');
const filePath = 'D:\\dream_app\\frontend\\components\\simulations\\c9_12\\CellBiologySim.tsx';
const sourceText = fs.readFileSync(filePath, 'utf8');
const lines = sourceText.split('\n');

// Find component start
let componentLine = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('export default function CellBiologySim')) {
    componentLine = i;
    break;
  }
}
console.log('Component starts at line', componentLine + 1);

// Simple brace counter that handles strings and template literals
const BACKTICK = String.fromCharCode(96);
let depth = 0;
let inString = false;
let stringChar = '';
let inTemplate = false;
let templateBraceDepth = -1; // depth when template started

for (let i = componentLine; i < lines.length; i++) {
  const line = lines[i];
  const prevDepth = depth;
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
      // Handle ${} inside template - we need to count these braces too
      if (ch === '$' && line[j+1] === '{') {
        depth++;
        j++; // skip the {
      }
      continue;
    }
    if (ch === '"' || ch === "'") { inString = true; stringChar = ch; continue; }
    if (ch === BACKTICK) { inTemplate = true; continue; }
    if (ch === '/' && line[j+1] === '/') { break; } // line comment
    if (ch === '{') depth++;
    if (ch === '}') depth--;
  }
  // Log lines where depth reaches 0 (potential component close points)
  if (depth === 0 && prevDepth > 0) {
    console.log(`Depth -> 0 at L${i+1}: ${line.substring(0, 80)}`);
  }
  if (depth < 0) {
    console.log(`NEGATIVE depth ${depth} at L${i+1}: ${line.substring(0, 80)}`);
  }
}
console.log('Final depth:', depth);
