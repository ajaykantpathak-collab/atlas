// Complete pipeline: parse → print → fix remaining issues → verify
// TypeScript's printer can clean up many syntax issues automatically
// Then we fix remaining JSX character issues manually

const ts = require('typescript');
const fs = require('fs');
const path = require('path');

const FRONTEND = 'D:\\dream_app\\frontend\\components\\simulations';
const dirs = ['c9_12', 'c6_8', 'class1', 'class2', 'class3', 'class4', 'class5', 'maths'];

function getDiagCount(content) {
  const sf = ts.createSourceFile('test.tsx', content, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  return (sf.parseDiagnostics || []).length;
}

function getFirstDiagLine(content) {
  const sf = ts.createSourceFile('test.tsx', content, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const diags = sf.parseDiagnostics || [];
  if (diags.length === 0) return 0;
  return content.substring(0, diags[0].start).split('\n').length;
}

// Fix JSX character issues: > and } in JSX need to be escaped
function fixJsxChars(content) {
  const sf = ts.createSourceFile('test.tsx', content, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const diags = sf.parseDiagnostics || [];

  let result = content;
  // Process diagnostics in reverse order to preserve positions
  const sorted = diags.filter(d => d.code === 1381 || d.code === 1382).sort((a, b) => b.start - a.start);

  for (const diag of sorted) {
    const char = result[diag.start];
    if (diag.code === 1381 && char === '}') {
      // Replace } with {'}'}
      result = result.substring(0, diag.start) + "{'}'}" + result.substring(diag.start + 1);
    } else if (diag.code === 1382 && char === '>') {
      // Replace > with &gt;
      result = result.substring(0, diag.start) + '&gt;' + result.substring(diag.start + 1);
    }
  }

  return result;
}

// Apply line-level fixes for remaining syntax errors
function fixLine(content, diag) {
  const lines = content.split('\n');
  const start = diag.start;
  const lineNum = content.substring(0, start).split('\n').length;
  const lineIdx = lineNum - 1;
  const line = lines[lineIdx];
  if (!line) return null;

  const code = diag.code;
  const msg = ts.flattenDiagnosticMessageText(diag.messageText, '\n');
  const BACKTICK = String.fromCharCode(96);

  // Code 1005: ',' expected
  if (code === 1005) {
    // Find backtick on this line
    let btCol = -1;
    for (let i = 0; i < line.length; i++) {
      if (line[i] === BACKTICK) { btCol = i; break; }
    }

    if (btCol >= 0) {
      const PROPS = ['eli5', 'definition', 'title', 'content', 'keyPoints', 'misconceptions',
        'diagnosticQuestions', 'masteryCriteria', 'nodeId', 'challenges', 'theorySlides',
        'hint', 'hintLevel2', 'hintLevel3', 'misconceptionFeedback', 'explanation',
        'answer', 'options', 'question', 'belief', 'correction', 'number', 'bloomLevel',
        'difficulty', 'moduleId', 'id', 'emoji', 'color', 'description', 'keyConcept',
        'analogy', 'subtitle', 'formula', 'working'];

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

    if (line.match(/`\)\)/)) {
      lines[lineIdx] = line.replace(/`\)\)/g, '`)');
      return lines.join('\n');
    }
    if (line.match(/,,/)) {
      lines[lineIdx] = line.replace(/,,/g, ',');
      return lines.join('\n');
    }
  }

  // Code 1003: Identifier expected
  if (code === 1003) {
    if (line.match(/`\)+\)/)) {
      lines[lineIdx] = line.replace(/`\)+\)/g, '`)');
      return lines.join('\n');
    }
    if (line.match(/`-\)-\)/)) {
      lines[lineIdx] = line.replace(/`-\)-\)/g, '`)');
      return lines.join('\n');
    }
  }

  // Code 1002: Unterminated string
  if (code === 1002) {
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

// Main pipeline
let totalFixed = 0;
let stillBroken = 0;
let totalFixes = 0;

dirs.forEach(dir => {
  const dirPath = path.join(FRONTEND, dir);
  if (!fs.existsSync(dirPath)) return;

  fs.readdirSync(dirPath).filter(f => f.endsWith('.tsx')).forEach(file => {
    const filePath = path.join(dirPath, file);
    let content = fs.readFileSync(filePath, 'utf8');

    const initialDiags = getDiagCount(content);
    if (initialDiags === 0) return;

    // Step 1: Parse and print (TS printer cleans up syntax)
    let attempts = 0;
    let lastDiagLine = getFirstDiagLine(content);

    // First pass: line-level fixes
    while (attempts < 50) {
      const sf = ts.createSourceFile('test.tsx', content, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
      const diags = sf.parseDiagnostics || [];
      if (diags.length === 0) break;

      const candidate = fixLine(content, diags[0]);
      if (!candidate) break;

      const newDiagLine = getFirstDiagLine(candidate);
      if (newDiagLine === 0 || newDiagLine > lastDiagLine) {
        content = candidate;
        lastDiagLine = newDiagLine;
        attempts++;
        totalFixes++;
      } else {
        break;
      }
    }

    // Step 2: Print through TS printer to clean up
    const sf2 = ts.createSourceFile('test.tsx', content, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
    const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
    let printed = printer.printFile(sf2);

    // Step 3: Fix JSX character issues
    let jsxFixed = fixJsxChars(printed);

    // Check if printing + JSX fix helped
    const finalDiags = getDiagCount(jsxFixed);

    if (finalDiags < initialDiags || attempts > 0) {
      // Only write if we improved things
      if (finalDiags < initialDiags || attempts > 0) {
        fs.writeFileSync(filePath, jsxFixed, 'utf8');
        totalFixed++;
        if (finalDiags === 0) {
          console.log(`FIXED: ${dir}/${file} (${attempts} line fixes + print + jsx fix)`);
        } else {
          console.log(`PARTIAL: ${dir}/${file} (${initialDiags}→${finalDiags} diags)`);
        }
      }
    } else {
      stillBroken++;
    }
  });
});

console.log(`\n=== Fixed: ${totalFixed}, Still broken: ${stillBroken}, Total fixes: ${totalFixes} ===`);
