// Use TypeScript AST to find and fix syntax errors
// TypeScript always produces an AST, so we can identify exactly what's broken
//
// Fix patterns:
// 1. Duplicated closing parens: `text`))  →  `text`)
// 2. Extra comma after string: `text`,,  →  `text`,
// 3. Garbage after backtick close: `text`, garbage  →  `text`,
// 4. Missing comma between properties
// 5. Broken quotes

const ts = require('typescript');
const fs = require('fs');
const path = require('path');

const FRONTEND = 'D:\\dream_app\\frontend\\components\\simulations';
const dirs = ['c9_12', 'c6_8', 'class1', 'class2', 'class3', 'class4', 'class5', 'maths'];

function getParseDiagnostics(content) {
  const sf = ts.createSourceFile('test.tsx', content, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  return sf.parseDiagnostics || [];
}

function getFirstErrorLine(content) {
  const diags = getParseDiagnostics(content);
  if (diags.length === 0) return 0;
  const pos = diags[0].start || 0;
  return content.substring(0, pos).split('\n').length;
}

// Apply fixes based on diagnostic code and surrounding context
function applyFix(content, diag) {
  const start = diag.start;
  const length = diag.length || 1;
  const code = diag.code;
  const msg = ts.flattenDiagnosticMessageText(diag.messageText, '\n');

  const lines = content.split('\n');
  const lineNum = content.substring(0, start).split('\n').length;
  const lineIdx = lineNum - 1;
  const line = lines[lineIdx];
  if (!line) return null;

  // Code 1005: ',' expected — usually means there's garbage after a string
  if (code === 1005 && msg.includes("','")) {
    const BACKTICK = String.fromCharCode(96);

    // Find any backtick on this line
    let btCol = -1;
    for (let i = 0; i < line.length; i++) {
      if (line[i] === BACKTICK) { btCol = i; break; }
    }

    if (btCol >= 0) {
      // Check if there's a property name on a subsequent line
      const PROPS = ['eli5', 'definition', 'title', 'content', 'keyPoints', 'misconceptions',
        'diagnosticQuestions', 'masteryCriteria', 'nodeId', 'challenges', 'theorySlides',
        'hint', 'hintLevel2', 'hintLevel3', 'misconceptionFeedback', 'explanation',
        'answer', 'options', 'question', 'belief', 'correction', 'number', 'bloomLevel',
        'difficulty', 'moduleId', 'id', 'emoji', 'color', 'description', 'keyConcept',
        'analogy', 'subtitle', 'formula', 'working', 'slides', 'units', 'topics',
        'realWorldActivity', 'reflection'];

      let nextPropLine = -1;
      for (let li = lineNum; li < Math.min(lineNum + 200, lines.length); li++) {
        const l = lines[li].trim();
        for (const p of PROPS) {
          if (l.match(new RegExp('^' + p + '\\s*:'))) {
            nextPropLine = li;
            break;
          }
        }
        if (nextPropLine !== -1) break;
      }

      if (nextPropLine >= 0) {
        const fixedLine = line.substring(0, btCol + 1) + ',';
        const newLines = [...lines.slice(0, lineIdx), fixedLine, ...lines.slice(nextPropLine)];
        return newLines.join('\n');
      }
    }

    // Check for duplicated closing paren: `text`))  →  `text`)
    if (line.match(/`\)\)/)) {
      lines[lineIdx] = line.replace(/`\)\)/g, '`)');
      return lines.join('\n');
    }

    // Check for extra comma: `text`,,  →  `text`,
    if (line.match(/,,/)) {
      lines[lineIdx] = line.replace(/,,/g, ',');
      return lines.join('\n');
    }
  }

  // Code 1381/1382: Unexpected token in JSX — fix invalid JSX characters
  if (code === 1381 || code === 1382) {
    // These are usually > or } in JSX that need to be escaped
    // Check if we're inside JSX context
    // For now, skip these — they're in component code, not data
    return null;
  }

  // Code 1003: Identifier expected — usually after a broken string
  if (code === 1003) {
    // Check for duplicated suffix: `text`+)+)  →  `text`)
    if (line.match(/`\)+\)/)) {
      lines[lineIdx] = line.replace(/`\)+\)/g, '`)');
      return lines.join('\n');
    }
    if (line.match(/`-\)-\)/)) {
      lines[lineIdx] = line.replace(/`-\)-\)/g, '`)');
      return lines.join('\n');
    }
  }

  // Code 1002: Unterminated string literal
  if (code === 1002) {
    // Check for apostrophe in single-quoted string: 'text'text'  →  "text'text"
    const m = line.match(/'([^']*)'([a-z][^']*)'/);
    if (m) {
      lines[lineIdx] = line.replace(/'([^']*)'([a-z][^']*)'/g, (match, p1, p2) => {
        return '"' + (p1 + "'" + p2).replace(/"/g, '\\"') + '"';
      });
      return lines.join('\n');
    }
  }

  return null;
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

    const initialDiags = getParseDiagnostics(content);
    if (initialDiags.length === 0) return;

    let attempts = 0;
    let lastErrorLine = getFirstErrorLine(content);

    while (attempts < 100) {
      const diags = getParseDiagnostics(content);
      if (diags.length === 0) break;

      const candidate = applyFix(content, diags[0]);
      if (!candidate) break;

      // Verify: error line should move forward
      const newErrorLine = getFirstErrorLine(candidate);
      if (newErrorLine === 0 || newErrorLine > lastErrorLine) {
        content = candidate;
        lastErrorLine = newErrorLine;
        attempts++;
        totalFixes++;
      } else {
        break;
      }
    }

    if (attempts > 0) {
      fs.writeFileSync(filePath, content, 'utf8');
      totalFixed++;
      const remaining = getParseDiagnostics(content).length;
      if (remaining === 0) {
        console.log(`FIXED: ${dir}/${file} (${attempts} fixes)`);
      } else {
        console.log(`PARTIAL: ${dir}/${file} (${attempts} fixes, ${remaining} diags remain)`);
      }
    } else {
      stillBroken++;
    }
  });
});

console.log(`\n=== Fixed: ${totalFixed}, Still broken: ${stillBroken}, Total fixes: ${totalFixes} ===`);
