// Targeted fixes for remaining error types
// TS1003: Identifier expected — garbage after string close
// TS1109: Expression expected — broken object structure
// TS1136: Property assignment expected — missing key in object

const ts = require('typescript');
const fs = require('fs');
const path = require('path');

const FRONTEND = 'D:\\dream_app\\frontend\\components\\simulations';
const dirs = ['c9_12', 'c6_8', 'class1', 'class2', 'class3', 'class4', 'class5', 'maths'];

function getDiags(content) {
  const sf = ts.createSourceFile('test.tsx', content, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  return sf.parseDiagnostics || [];
}

function getFirstDiagLine(content) {
  const diags = getDiags(content);
  if (diags.length === 0) return 0;
  return content.substring(0, diags[0].start).split('\n').length;
}

// Known property names
const PROPS = [
  'eli5', 'definition', 'title', 'content', 'keyPoints', 'misconceptions',
  'diagnosticQuestions', 'masteryCriteria', 'nodeId', 'challenges', 'theorySlides',
  'hint', 'hintLevel2', 'hintLevel3', 'misconceptionFeedback', 'explanation',
  'answer', 'options', 'question', 'belief', 'correction', 'number', 'bloomLevel',
  'difficulty', 'moduleId', 'id', 'emoji', 'color', 'description', 'keyConcept',
  'analogy', 'subtitle', 'formula', 'working', 'slides', 'units', 'topics',
  'realWorldActivity', 'reflection', 'belief', 'correction', 'answerType',
  'title', 'text', 'bgColor', 'spoken', 'emoji', 'hint', 'misconception',
];

function findNextProp(lines, fromLine) {
  for (let li = fromLine; li < Math.min(fromLine + 300, lines.length); li++) {
    const l = lines[li].trim();
    for (const p of PROPS) {
      if (l.match(new RegExp('^' + p + '\\s*[:(]'))) {
        return li;
      }
      // Also check for }, { patterns (end of object, start of next)
      if (l.match(/^[}],?\s*$/) || l.match(/^\{/)) {
        return li;
      }
      // Check for array close
      if (l.match(/^[\]],?\s*$/)) {
        return li;
      }
    }
  }
  return -1;
}

function applyFix(content, diag) {
  const lines = content.split('\n');
  const start = diag.start;
  const lineNum = content.substring(0, start).split('\n').length;
  const lineIdx = lineNum - 1;
  const line = lines[lineIdx];
  if (!line) return null;

  const code = diag.code;
  const msg = ts.flattenDiagnosticMessageText(diag.messageText, '\n');
  const BACKTICK = String.fromCharCode(96);

  // TS1003: Identifier expected — usually garbage after a string close
  // Pattern: 'text', garbage words, more garbage, : .Something
  if (code === 1003) {
    // Check if this line has a string close followed by garbage
    // Find the last ', or ",  or `, on this line
    const sqIdx = line.lastIndexOf("',");
    const dqIdx = line.lastIndexOf('",');
    const btIdx = line.lastIndexOf(BACKTICK + ',');
    const closest = Math.max(sqIdx, dqIdx, btIdx);

    if (closest >= 0) {
      // There's a string close + comma on this line
      // Find the next valid property
      const nextProp = findNextProp(lines, lineNum);
      if (nextProp >= 0 && nextProp > lineIdx) {
        // Keep everything up to and including the quote+comma, skip to next prop
        const fixedLine = line.substring(0, closest + 2); // include quote and comma
        const newLines = [...lines.slice(0, lineIdx), fixedLine, ...lines.slice(nextProp)];
        return newLines.join('\n');
      }
      // If no next prop found, just cut the line at the quote+comma
      const fixedLine = line.substring(0, closest + 2);
      if (fixedLine.length < line.length) {
        lines[lineIdx] = fixedLine;
        return lines.join('\n');
      }
    }

    // Check for duplicated suffix patterns
    if (line.match(/`\)+\)/)) {
      lines[lineIdx] = line.replace(/`\)+\)/g, '`)');
      return lines.join('\n');
    }
    if (line.match(/`-\)-\)/)) {
      lines[lineIdx] = line.replace(/`-\)-\)/g, '`)');
      return lines.join('\n');
    }
  }

  // TS1109: Expression expected — broken structure, usually missing { or extra }
  if (code === 1109) {
    // Check if previous line is missing a comma or has broken content
    if (lineIdx > 0) {
      const prevLine = lines[lineIdx - 1].trim();
      // If previous line ends with garbage (not a valid ending), cut it
      if (prevLine && !prevLine.match(/[,;{}()\]]\s*$/) && !prevLine.match(/^\/\//) && !prevLine.match(/^import/)) {
        // Check if prevLine has a string close + comma
        const sqIdx = prevLine.lastIndexOf("',");
        const dqIdx = prevLine.lastIndexOf('",');
        const btIdx = prevLine.lastIndexOf(BACKTICK + ',');
        const closest = Math.max(sqIdx, dqIdx, btIdx);
        if (closest >= 0) {
          lines[lineIdx - 1] = lines[lineIdx - 1].substring(0, closest + 2);
          return lines.join('\n');
        }
      }
    }
  }

  // TS1136: Property assignment expected — usually garbage in object
  if (code === 1136) {
    // Find string close + comma on this line
    const sqIdx = line.lastIndexOf("',");
    const dqIdx = line.lastIndexOf('",');
    const btIdx = line.lastIndexOf(BACKTICK + ',');
    const closest = Math.max(sqIdx, dqIdx, btIdx);

    if (closest >= 0) {
      const nextProp = findNextProp(lines, lineNum);
      if (nextProp >= 0 && nextProp > lineIdx) {
        const fixedLine = line.substring(0, closest + 2);
        const newLines = [...lines.slice(0, lineIdx), fixedLine, ...lines.slice(nextProp)];
        return newLines.join('\n');
      }
      const fixedLine = line.substring(0, closest + 2);
      if (fixedLine.length < line.length) {
        lines[lineIdx] = fixedLine;
        return lines.join('\n');
      }
    }
  }

  // TS1005: ',' expected
  if (code === 1005) {
    let btCol = -1;
    for (let i = 0; i < line.length; i++) {
      if (line[i] === BACKTICK) { btCol = i; break; }
    }
    if (btCol >= 0) {
      const nextProp = findNextProp(lines, lineNum);
      if (nextProp >= 0) {
        const fixedLine = line.substring(0, btCol + 1) + ',';
        const newLines = [...lines.slice(0, lineIdx), fixedLine, ...lines.slice(nextProp)];
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
    // Find ', or ", on this line and cut
    const sqIdx = line.lastIndexOf("',");
    const dqIdx = line.lastIndexOf('",');
    const btIdx = line.lastIndexOf(BACKTICK + ',');
    const closest = Math.max(sqIdx, dqIdx, btIdx);
    if (closest >= 0) {
      const nextProp = findNextProp(lines, lineNum);
      if (nextProp >= 0 && nextProp > lineIdx) {
        const fixedLine = line.substring(0, closest + 2);
        const newLines = [...lines.slice(0, lineIdx), fixedLine, ...lines.slice(nextProp)];
        return newLines.join('\n');
      }
    }
  }

  // TS1002: Unterminated string
  if (code === 1002) {
    // Apostrophe in single-quoted string
    const m = line.match(/'([^']*)'([a-z][^']*)'/);
    if (m) {
      lines[lineIdx] = line.replace(/'([^']*)'([a-z][^']*)'/g, (match, p1, p2) => {
        return '"' + (p1 + "'" + p2).replace(/"/g, '\\"') + '"';
      });
      return lines.join('\n');
    }
    // Missing opening quote: subtitle: Nature's grand...  →  subtitle: "Nature's grand..."
    const m2 = line.match(/^(\s*\w+:\s*)([A-Z][^,}\]]+)$/);
    if (m2 && !line.includes("'") && !line.includes('"') && !line.includes(BACKTICK)) {
      lines[lineIdx] = m2[1] + "'" + m2[2] + "',";
      return lines.join('\n');
    }
    // Missing opening quote with apostrophe: subtitle: Nature's grand...  →  subtitle: "Nature's grand..."
    const m3 = line.match(/^(\s*\w+:\s*)([A-Z][^,}\]]*'[^,}\]]+)$/);
    if (m3) {
      const text = m3[2].replace(/"/g, '\\"');
      lines[lineIdx] = m3[1] + '"' + text + '",';
      return lines.join('\n');
    }
  }

  // TS17002: JSX attributes expected
  if (code === 17002) {
    // Usually a > or } in JSX that needs escaping
    if (line.includes('}')) {
      // Find unescaped } in JSX context
      // Replace } with {'}'}
      const fixedLine = line.replace(/(?<![{])}(?![}])/g, "{'}'}");
      if (fixedLine !== line) {
        lines[lineIdx] = fixedLine;
        return lines.join('\n');
      }
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

    const initialDiags = getDiags(content);
    if (initialDiags.length === 0) return;

    let attempts = 0;
    let lastDiagLine = getFirstDiagLine(content);

    while (attempts < 100) {
      const diags = getDiags(content);
      if (diags.length === 0) break;

      const candidate = applyFix(content, diags[0]);
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

    // After line fixes, run through TS printer to clean up
    if (attempts > 0 || initialDiags > 0) {
      const sf = ts.createSourceFile('test.tsx', content, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
      const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
      let printed = printer.printFile(sf);

      // Fix JSX chars
      const printDiags = getDiags(printed);
      const sorted = printDiags.filter(d => d.code === 1381 || d.code === 1382).sort((a, b) => b.start - a.start);
      for (const diag of sorted) {
        const char = printed[diag.start];
        if (diag.code === 1381 && char === '}') {
          printed = printed.substring(0, diag.start) + "{'}'}" + printed.substring(diag.start + 1);
        } else if (diag.code === 1382 && char === '>') {
          printed = printed.substring(0, diag.start) + '&gt;' + printed.substring(diag.start + 1);
        }
      }

      const finalDiags = getDiags(printed);
      if (finalDiags < initialDiags || attempts > 0) {
        fs.writeFileSync(filePath, printed, 'utf8');
        totalFixed++;
        if (finalDiags === 0) {
          console.log(`FIXED: ${dir}/${file} (${attempts} fixes)`);
        } else {
          console.log(`PARTIAL: ${dir}/${file} (${initialDiags}→${finalDiags})`);
        }
      } else {
        stillBroken++;
      }
    } else {
      stillBroken++;
    }
  });
});

console.log(`\n=== Fixed: ${totalFixed}, Still broken: ${stillBroken}, Total fixes: ${totalFixes} ===`);
