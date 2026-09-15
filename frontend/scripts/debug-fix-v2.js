// Debug the fix on AcidsBasesSim.tsx
const parser = require('@babel/parser');
const fs = require('fs');

const c = fs.readFileSync('D:\\dream_app\\frontend\\components\\simulations\\c9_12\\AcidsBasesSim.tsx', 'utf8');

function countErrors(content) {
  try {
    const r = parser.parse(content, { sourceType: 'module', plugins: ['jsx', 'typescript'], errorRecovery: true });
    return r.errors ? r.errors.length : 0;
  } catch (e) { return 999; }
}

console.log('Initial errors:', countErrors(c));

const lines = c.split('\n');
const errLine = lines[41]; // Line 42 (0-indexed)

// Find backtick
const BACKTICK = String.fromCharCode(96);
let btCol = -1;
for (let i = 263; i >= 0; i--) {
  if (errLine[i] === BACKTICK) { btCol = i; break; }
}
console.log('Backtick at col:', btCol);
console.log('Char at 256:', errLine[256], 'code:', errLine.charCodeAt(256));
console.log('Char at 255:', errLine[255], 'code:', errLine.charCodeAt(255));

// Find next property
const PROPS = ['eli5', 'definition', 'title', 'content', 'keyPoints', 'misconceptions',
  'diagnosticQuestions', 'masteryCriteria', 'nodeId', 'challenges', 'theorySlides',
  'hint', 'hintLevel2', 'hintLevel3', 'misconceptionFeedback', 'explanation',
  'answer', 'options', 'question', 'belief', 'correction', 'number', 'bloomLevel',
  'difficulty', 'moduleId', 'id', 'emoji', 'color', 'description'];

let nextProp = -1;
for (let li = 42; li < Math.min(42 + 200, lines.length); li++) {
  const l = lines[li].trim();
  for (const p of PROPS) {
    const regex = new RegExp('^' + p + '\\s*:');
    if (regex.test(l)) {
      nextProp = li;
      break;
    }
  }
  if (nextProp !== -1) break;
}
console.log('Next property at line:', nextProp + 1);
if (nextProp >= 0) console.log('  ', lines[nextProp].trim().substring(0, 60));

// Build fix
if (btCol >= 0 && nextProp >= 0) {
  const before = lines.slice(0, 41);
  const fixedLine = errLine.substring(0, btCol + 1) + ',';
  const after = lines.slice(nextProp);
  const fixed = [...before, fixedLine, ...after].join('\n');
  const fixedErrors = countErrors(fixed);
  console.log('Fixed errors:', fixedErrors);
  console.log('Fix line:', fixedLine.substring(0, 80));
  
  if (fixedErrors < 999) {
    fs.writeFileSync('D:\\dream_app\\frontend\\scripts\\test-fix-output.txt', fixed, 'utf8');
    console.log('Wrote fixed file to test-fix-output.txt');
  }
}
