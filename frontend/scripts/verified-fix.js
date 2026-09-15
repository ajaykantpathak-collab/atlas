// Carefully fix syntax errors in unparseable files
// Only apply a fix if it reduces the Babel error count
// This prevents corruption from bad fixes

const parser = require('@babel/parser');
const fs = require('fs');
const path = require('path');

const FRONTEND = 'D:\\dream_app\\frontend\\components\\simulations';
const dirs = ['c9_12', 'c6_8', 'class1', 'class2', 'class3', 'class4', 'class5', 'maths'];

function countErrors(content) {
  try {
    const result = parser.parse(content, {
      sourceType: 'module',
      plugins: ['jsx', 'typescript'],
      errorRecovery: true,
    });
    return result.errors ? result.errors.length : 0;
  } catch (e) {
    return 999; // Unparseable = high error count
  }
}

function getFirstError(content) {
  try {
    parser.parse(content, {
      sourceType: 'module',
      plugins: ['jsx', 'typescript'],
      errorRecovery: true,
    });
    return null;
  } catch (e) {
    const m = e.message.match(/\((\d+):(\d+)\)/);
    if (!m) return null;
    return {
      line: parseInt(m[1]),
      col: parseInt(m[2]),
      msg: e.message,
    };
  }
}

// Fix: Remove duplicated content in backtick strings
// Finds a premature backtick, checks if content after it duplicates content before,
// and if so, removes the duplication
function tryFixDuplication(content, errorLine, errorCol) {
  const lines = content.split('\n');
  const errLine = lines[errorLine - 1];
  if (!errLine) return null;

  // Find the premature backtick near the error position
  // Search backwards from errorCol
  let premCol = -1;
  for (let i = errorCol; i >= 0; i--) {
    if (errLine[i] === '`') { premCol = i; break; }
  }
  // Search forwards
  if (premCol === -1) {
    for (let i = errorCol + 1; i < errLine.length; i++) {
      if (errLine[i] === '`') { premCol = i; break; }
    }
  }
  if (premCol === -1) return null;

  // Search backwards for the opening backtick (pattern: word: `)
  let openLine = -1, openCol = -1;
  for (let li = errorLine - 1; li >= Math.max(0, errorLine - 200); li--) {
    const l = lines[li];
    const match = l.match(/(\w+):\s*`/);
    if (match) {
      openLine = li;
      openCol = l.indexOf('`', match.index);
      break;
    }
  }
  if (openLine === -1) return null;

  // Get the string content (from opening backtick to premature backtick)
  let stringContent = '';
  if (openLine === errorLine - 1) {
    stringContent = lines[openLine].substring(openCol + 1, premCol);
  } else {
    stringContent = lines[openLine].substring(openCol + 1) + '\n';
    for (let li = openLine + 1; li < errorLine - 1; li++) {
      stringContent += lines[li] + '\n';
    }
    stringContent += lines[errorLine - 1].substring(0, premCol);
  }

  // Get first 40 chars for matching
  const matchStr = stringContent.replace(/^\s+/, '').substring(0, 40).trim();
  if (matchStr.length < 15) return null;

  // Search forward for the duplicated content
  // It might start immediately after the premature backtick or on a later line
  let dupStartLine = -1;

  // Check immediately after premature backtick
  const afterPrem = errLine.substring(premCol + 1);
  if (afterPrem.includes(matchStr)) {
    dupStartLine = errorLine - 1;
  }

  // Search subsequent lines
  if (dupStartLine === -1) {
    for (let li = errorLine - 1; li < Math.min(errorLine + 200, lines.length); li++) {
      if (lines[li].includes(matchStr)) {
        dupStartLine = li;
        break;
      }
    }
  }

  if (dupStartLine === -1) return null;

  // Find the end of the duplication (line ending with `.,` or just `,`)
  let endLineIdx = -1;
  for (let li = dupStartLine; li < Math.min(dupStartLine + 200, lines.length); li++) {
    const l = lines[li];
    // Look for `.,` pattern
    if (l.match(/\.\s*,\s*$/)) {
      endLineIdx = li;
      break;
    }
    // Look for ``, at end of line (backtick close + comma)
    if (l.match(/`,\s*$/)) {
      endLineIdx = li;
      break;
    }
  }

  if (endLineIdx === -1) return null;

  // Build the fix: keep content up to premature backtick, close with `, 
  // then skip to after the end of duplication
  const before = lines.slice(0, openLine);
  const openingLineBefore = lines[openLine].substring(0, openCol);
  const endLine = lines[endLineIdx];
  const afterEnd = endLine.replace(/^.*?[.,],?\s*$/, '');

  // Find what comes after the `.,` on the end line
  let afterMatch = endLine.match(/\.?,?\s*$/);
  let afterText = '';
  if (afterMatch) {
    afterText = endLine.substring(endLine.length - afterMatch[0].length);
  }

  // Reconstruct
  const newLines = [...before, openingLineBefore + '`' + stringContent + '`,' + afterText];
  if (endLineIdx + 1 < lines.length) {
    newLines.push(...lines.slice(endLineIdx + 1));
  }

  return newLines.join('\n');
}

// Fix: Simple line-level fixes
function tryFixLine(content, errorLine, errorCol) {
  const lines = content.split('\n');
  const line = lines[errorLine - 1];
  if (!line) return null;

  let fixed = line;

  // Backtick string closed with ' instead of `
  if (fixed.match(/`[^`]*',\s*$/)) {
    fixed = fixed.replace(/(`[^`]*)',(\s*$)/, '$1`,$2');
  }
  // Extra ' after "Word: " in array
  else if (fixed.match(/'[A-Z][a-zA-Z]+:\s*'/)) {
    fixed = fixed.replace(/'([A-Z][a-zA-Z]+):\s*'/, "'$1: ");
  }
  // Double comma
  else if (fixed.match(/,,\s*$/)) {
    fixed = fixed.replace(/,,(\s*$)/, ',$1');
  }
  // Duplicated suffix: `text`+)+) → `text`)
  else if (fixed.match(/`\)+\)/)) {
    fixed = fixed.replace(/`\)+\)/g, '`)');
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

dirs.forEach(dir => {
  const dirPath = path.join(FRONTEND, dir);
  if (!fs.existsSync(dirPath)) return;

  fs.readdirSync(dirPath).filter(f => f.endsWith('.tsx')).forEach(file => {
    const filePath = path.join(dirPath, file);
    let content = fs.readFileSync(filePath, 'utf8');

    const initialErrors = countErrors(content);
    if (initialErrors === 0) return; // Already clean

    let attempts = 0;
    let lastErrorCount = initialErrors;

    while (attempts < 50) {
      const err = getFirstError(content);
      if (!err) break;

      let candidate = null;

      // Try line fix first (safer)
      candidate = tryFixLine(content, err.line, err.col);

      // Try duplication fix
      if (!candidate) {
        candidate = tryFixDuplication(content, err.line, err.col);
      }

      if (!candidate) break;

      // VERIFY: only apply if error count decreases
      const newErrors = countErrors(candidate);
      if (newErrors < lastErrorCount) {
        content = candidate;
        lastErrorCount = newErrors;
        attempts++;
        totalFixes++;
      } else {
        // Fix didn't help — stop
        break;
      }
    }

    if (attempts > 0) {
      fs.writeFileSync(filePath, content, 'utf8');
      totalFixed++;
      if (lastErrorCount > 0 && lastErrorCount < 999) {
        console.log(`PARTIAL: ${dir}/${file} (${attempts} fixes, ${lastErrorCount} errors remain)`);
      } else if (lastErrorCount === 0) {
        console.log(`FIXED: ${dir}/${file} (${attempts} fixes)`);
      } else {
        console.log(`STILL BROKEN: ${dir}/${file} (${attempts} fixes applied)`);
      }
    } else {
      stillBroken++;
    }
  });
});

console.log(`\n=== Fixed: ${totalFixed}, Still broken: ${stillBroken}, Total fixes: ${totalFixes} ===`);
