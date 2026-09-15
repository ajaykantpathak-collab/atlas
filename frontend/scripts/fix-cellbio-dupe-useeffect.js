// Remove broken duplicate useEffect and state declarations from CellBiologySim.tsx
const fs = require('fs');
const f = 'D:\\dream_app\\frontend\\components\\simulations\\c9_12\\CellBiologySim.tsx';
let c = fs.readFileSync(f, 'utf8');
const lines = c.split('\n');

// Remove lines 458-538 (indices 457-537) — the broken first useEffect and duplicate state
// Line 457 (index 456): "// Build challenges with local fallback"
// Line 538 (index 537): "// Build challenges with local fallback" (start of correct one)
// We want to keep line 538 onwards

// Find the two "// Build challenges with local fallback" lines
let firstBuild = -1;
let secondBuild = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('Build challenges with local fallback')) {
    if (firstBuild === -1) firstBuild = i;
    else if (secondBuild === -1) secondBuild = i;
  }
}

console.log('First "Build challenges" at line', firstBuild + 1);
console.log('Second "Build challenges" at line', secondBuild + 1);

// Find the "// --- INITIALIZATION & HOOKS ---" before each
let firstInit = -1;
let secondInit = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('INITIALIZATION & HOOKS')) {
    if (firstInit === -1) firstInit = i;
    else if (secondInit === -1) secondInit = i;
  }
}

console.log('First "INITIALIZATION" at line', firstInit + 1);
console.log('Second "INITIALIZATION" at line', secondInit + 1);

// Remove from firstInit to secondInit-1 (keep the second INITIALIZATION block)
if (firstInit >= 0 && secondInit >= 0) {
  console.log('Removing lines', firstInit + 1, 'to', secondInit);
  lines.splice(firstInit, secondInit - firstInit);
}

fs.writeFileSync(f, lines.join('\n'), 'utf8');
console.log('Removed broken duplicate');
