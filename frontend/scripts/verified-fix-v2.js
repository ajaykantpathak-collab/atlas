// Fix: Find closing backtick, remove garbage between it and next property
// This handles the case where the definition string is properly closed
// but garbage/duplicated content follows before the next property

const parser = require('@babel/parser');
const fs = require('fs');
const path = require('path');

const FRONTEND = 'D:\\dream_app\\frontend\\components\\simulations';
const dirs = ['c9_12', 'c6_8', 'class1', 'class2', 'class3', 'class4', 'class5', 'maths'];

function getErrorPosition(content) {
  // Returns the line number of the first parse error, or 0 if no errors
  try {
    parser.parse(content, { sourceType: 'module', plugins: ['jsx', 'typescript'], errorRecovery: true });
    return 0;
  } catch (e) {
    const m = e.message.match(/\((\d+):(\d+)\)/);
    if (!m) return -1;
    return parseInt(m[1]);
  }
}

function getFirstError(content) {
  try {
    parser.parse(content, { sourceType: 'module', plugins: ['jsx', 'typescript'], errorRecovery: true });
    return null;
  } catch (e) {
    const m = e.message.match(/\((\d+):(\d+)\)/);
    if (!m) return null;
    return { line: parseInt(m[1]), col: parseInt(m[2]), msg: e.message };
  }
}

// Known property names that come after data strings
const PROPERTY_NAMES = [
  'eli5', 'definition', 'title', 'content', 'keyPoints', 'misconceptions',
  'diagnosticQuestions', 'masteryCriteria', 'nodeId', 'challenges',
  'theorySlides', 'hint', 'hintLevel2', 'hintLevel3', 'misconceptionFeedback',
  'explanation', 'answer', 'options', 'question', 'belief', 'correction',
  'number', 'bloomLevel', 'difficulty', 'moduleId', 'id', 'emoji', 'color',
  'description', 'keyConcept', 'analogy', 'subtitle', 'formula', 'working',
  'slides', 'units', 'topics', 'realWorldActivity', 'reflection',
];

function tryFixGarbageAfterBacktick(content, errorLine, errorCol) {
  const lines = content.split('\n');
  const errLine = lines[errorLine - 1];
  if (!errLine) return null;

  // Find the nearest backtick at or before the error position on this line
  let btCol = -1;
  for (let i = errorCol; i >= 0; i--) {
    if (errLine[i] === '`') { btCol = i; break; }
  }
  if (btCol === -1) return null;

  // Check if there's a property name after the backtick+comma on subsequent lines
  // Search for the next valid property
  let nextPropLine = -1;
  for (let li = errorLine; li < Math.min(errorLine + 200, lines.length); li++) {
    const l = lines[li].trim();
    // Check if this line starts with a known property name
    for (const prop of PROPERTY_NAMES) {
      if (l.match(new RegExp(`^${prop}\\s*:`))) {
        nextPropLine = li;
        break;
      }
      // Also check for array/object close followed by property
      if (l.match(new RegExp(`^[\\],}]+,?\\s*${prop}\\s*:`))) {
        nextPropLine = li;
        break;
      }
    }
    if (nextPropLine !== -1) break;
  }

  if (nextPropLine === -1) return null;

  // Also check if there's a `.,` or ``, ` on the line before nextPropLine
  // This would be the end of the duplicated content
  let endLine = nextPropLine - 1;
  // If the line before nextPropLine ends with `.,` or ``,`, adjust
  while (endLine > errorLine - 1) {
    const l = lines[endLine].trim();
    if (l.match(/\.\s*,?\s*$/) || l.match(/`,?\s*$/) || l === '') {
      break;
    }
    endLine--;
  }

  // Build the fix:
  // Keep everything up to and including the backtick on the error line
  // Add a comma
  // Skip to the next property line
  const beforeErr = lines.slice(0, errorLine - 1);
  const fixedErrLine = errLine.substring(0, btCol + 1) + ',';
  const afterSkip = lines.slice(nextPropLine);

  const newLines = [...beforeErr, fixedErrLine, ...afterSkip];
  return newLines.join('\n');
}

// Simple line fixes
function tryFixLine(content, errorLine, errorCol) {
  const lines = content.split('\n');
  const line = lines[errorLine - 1];
  if (!line) return null;

  let fixed = line;

  // Backtick string closed with ' instead of `: `text...',  →  `text...`,
  if (fixed.match(/`[^`]*',\s*$/)) {
    fixed = fixed.replace(/(`[^`]*)',(\s*$)/, '$1`,$2');
  }
  // Extra ' after "Word: " in array: 'Word: 'text'  →  'Word: text'
  else if (fixed.match(/'[A-Z][a-zA-Z]+:\s*'/)) {
    fixed = fixed.replace(/'([A-Z][a-zA-Z]+):\s*'/, "'$1: ");
  }
  // Double comma: `text.,,  →  `text.,
  else if (fixed.match(/,,\s*$/)) {
    fixed = fixed.replace(/,,(\s*$)/, ',$1');
  }
  // Duplicated suffix: `text`+)+)  →  `text`)
  else if (fixed.match(/`\)+\)/)) {
    fixed = fixed.replace(/`\)+\)/g, '`)');
  }
  // Duplicated suffix: `text`-)-)  →  `text`)
  else if (fixed.match(/`-\)-\)/)) {
    fixed = fixed.replace(/`-\)-\)/g, '`)');
  }
  // Duplicated Unicode: `text`°°  →  `text`)
  else if (fixed.match(/`[°½∞²³₁₂₃]([°½∞²³₁₂₃])+/)) {
    fixed = fixed.replace(/`([°½∞²³₁₂₃])\1+/g, '`)');
  }
  // Duplicated suffix: ), ∞), ∞)  →  ), ∞)
  else if (fixed.match(/\),\s*∞\),\s*∞\)/)) {
    fixed = fixed.replace(/\),\s*∞\),\s*∞\)/g, '), ∞)');
  }
  // Extra ) in JSX: `text`))  →  `text`)
  else if (fixed.match(/`\)\)/)) {
    fixed = fixed.replace(/`\)\)/g, '`)');
  }
  // Backtick string closed with single quote (no comma): `text'  →  `text`
  else if (fixed.match(/`[^`]*'\s*$/)) {
    fixed = fixed.replace(/(`[^`]*)'(\s*$)/, '$1`$2');
  }
  // Duplicated content after double-quoted string: "text", garbage  →  "text",
  else if (fixed.match(/"[^"]*",\s*[a-zA-Z]/) && !fixed.match(/^\s*\/\//)) {
    // Only fix if the garbage is not a valid property name
    const m = fixed.match(/("[^"]*"),\s*([a-zA-Z][^,]*)/);
    if (m) {
      // Check if the part after the comma looks like a property (word: value)
      // If not, it's garbage — remove it
      if (!m[2].match(/^\w+\s*:/)) {
        fixed = fixed.replace(/("[^"]*"),\s*[a-zA-Z].*$/, '$1,');
      }
    }
  }
  // Unescaped apostrophe in single-quoted string: 'text'text'  →  "text'text"
  else if (fixed.match(/'[^']*'[a-z][^']*'/)) {
    fixed = fixed.replace(/'([^']*)'([a-z][^']*)'/g, (m, p1, p2) => {
      return '"' + (p1 + "'" + p2).replace(/"/g, '\\"') + '"';
    });
  }
  else {
    return null;
  }

  lines[errorLine - 1] = fixed;
  return lines.join('\n');
}

// Main
let totalFixed = 0;
let stillBroken = 0;
let totalFixes = 0;
let totalErrorReduction = 0;

dirs.forEach(dir => {
  const dirPath = path.join(FRONTEND, dir);
  if (!fs.existsSync(dirPath)) return;

  fs.readdirSync(dirPath).filter(f => f.endsWith('.tsx')).forEach(file => {
    const filePath = path.join(dirPath, file);
    let content = fs.readFileSync(filePath, 'utf8');

    const initialPos = getErrorPosition(content);
    if (initialPos === 0) return; // Already clean

    let attempts = 0;
    let lastErrorPos = initialPos;

    while (attempts < 100) {
      const err = getFirstError(content);
      if (!err) break;

      let candidate = null;

      // Try line fix first (safer)
      candidate = tryFixLine(content, err.line, err.col);

      // Try garbage removal fix
      if (!candidate) {
        candidate = tryFixGarbageAfterBacktick(content, err.line, err.col);
      }

      if (!candidate) break;

      // VERIFY: only apply if error position moves forward (to a later line)
      const newPos = getErrorPosition(candidate);
      if (newPos === 0 || (newPos > lastErrorPos && newPos > 0)) {
        content = candidate;
        lastErrorPos = newPos;
        attempts++;
        totalFixes++;
      } else {
        break;
      }
    }

    if (attempts > 0) {
      fs.writeFileSync(filePath, content, 'utf8');
      totalFixed++;
      if (lastErrorPos === 0) {
        console.log(`FIXED: ${dir}/${file} (${attempts} fixes)`);
      } else {
        console.log(`PARTIAL: ${dir}/${file} (${attempts} fixes, error at L${lastErrorPos})`);
      }
    } else {
      stillBroken++;
    }
  });
});

console.log(`\n=== Fixed: ${totalFixed}, Still broken: ${stillBroken}, Total fixes: ${totalFixes}, Error reduction: ${totalErrorReduction} ===`);
