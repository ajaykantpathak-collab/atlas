// Debug: show what the fix produces
const parser = require('@babel/parser');
const fs = require('fs');

const c = fs.readFileSync('D:\\dream_app\\frontend\\components\\simulations\\c9_12\\AcidsBasesSim.tsx', 'utf8');
const lines = c.split('\n');
const BACKTICK = String.fromCharCode(96);

// Find backtick on line 42 (index 41)
const errLine = lines[41];
let btCol = -1;
for (let i = 263; i >= 0; i--) {
  if (errLine[i] === BACKTICK) { btCol = i; break; }
}

// Find next property (eli5 at line 47, index 46)
// But wait - let me check what's actually on line 47
console.log('Lines 40-50:');
for (let i = 39; i < 50; i++) {
  console.log(`  L${i+1}: ${lines[i]?.substring(0, 100) || '(empty)'}`);
}

// Build fix
const before = lines.slice(0, 41);
const fixedLine = errLine.substring(0, btCol + 1) + ',';
const after = lines.slice(46); // Skip to line 47 (index 46)

console.log('\nFixed line:', fixedLine.substring(0, 100));
console.log('After[0]:', after[0]?.substring(0, 100));

// Show what the fixed file looks like around the fix point
const fixed = [...before, fixedLine, ...after].join('\n');
const fixedLines = fixed.split('\n');
console.log('\nFixed file around fix point:');
for (let i = 39; i < 48; i++) {
  console.log(`  L${i+1}: ${fixedLines[i]?.substring(0, 100) || '(empty)'}`);
}

// Try to parse
try {
  parser.parse(fixed, { sourceType: 'module', plugins: ['jsx', 'typescript'], errorRecovery: true });
  console.log('\nNo errors!');
} catch (e) {
  const m = e.message.match(/\((\d+):(\d+)\)/);
  console.log('\nError at line', m[1], 'col', m[2]);
  console.log('Message:', e.message.substring(0, 100));
  const li = parseInt(m[1]) - 1;
  console.log('Line:', fixedLines[li]?.substring(0, 150));
  if (li > 0) console.log('Prev:', fixedLines[li-1]?.substring(0, 150));
}
