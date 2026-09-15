// Master fix script — combines all fix strategies
// 1. Line-level fixes (quotes, parens, commas)
// 2. Garbage removal after string close
// 3. Exploded content removal
// 4. TS printer cleanup
// 5. JSX character fixes
// Runs in a loop until no more improvements

const ts = require('typescript');
const fs = require('fs');
const path = require('path');

const FRONTEND = 'D:\\dream_app\\frontend\\components\\simulations';
const dirs = ['c9_12', 'c6_8', 'class1', 'class2', 'class3', 'class4', 'class5', 'maths'];

const PROPS = [
  'eli5', 'definition', 'title', 'content', 'keyPoints', 'misconceptions',
  'diagnosticQuestions', 'masteryCriteria', 'nodeId', 'challenges', 'theorySlides',
  'hint', 'hintLevel2', 'hintLevel3', 'misconceptionFeedback', 'explanation',
  'answer', 'options', 'question', 'belief', 'correction', 'number', 'bloomLevel',
  'difficulty', 'moduleId', 'id', 'emoji', 'color', 'description', 'keyConcept',
  'analogy', 'subtitle', 'formula', 'working', 'slides', 'units', 'topics',
  'realWorldActivity', 'reflection', 'answerType', 'text', 'bgColor', 'spoken',
  'misconception',
];

function getDiags(content) {
  const sf = ts.createSourceFile('test.tsx', content, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  return sf.parseDiagnostics || [];
}

function getFirstDiagLine(content) {
  const diags = getDiags(content);
  if (diags.length === 0) return 0;
  return content.substring(0, diags[0].start).split('\n').length;
}

function isGarbageLine(line) {
  const trimmed = line.trim();
  if (trimmed === '') return false;
  if (trimmed.match(/^['"`]/)) return true;
  if (trimmed.match(/^\w+\s*;/)) return true;
  if (trimmed.match(/^\w+\s*\./)) return true;
  if (trimmed.match(/^-\s*>/)) return true;
  if (trimmed.match(/^}\s*-/)) return true;
  if (trimmed.match(/^\w+\(.*\);?\s*$/)) return true;
  if (trimmed.match(/^[a-z]+\s+[a-z]+/) && !trimmed.match(/^(const|let|var|import|export|function|return|if|else|for|while|switch|case|break|default)\s/)) return true;
  if (trimmed.match(/^\w+\s*-\s*>\s*\w+/)) return true;
  if (trimmed.match(/^\w+\s*-\s*>\s*;/)) return true;
  if (trimmed.match(/^\w+\(.*\)/) && !trimmed.match(/^(if|for|while|switch|function|return)\s*\(/)) return true;
  if (trimmed.match(/;\s*$/) && !trimmed.match(/^(const|let|var|import|export|return|if|for|while|switch|case|break|continue|default|throw|await|yield|delete|void|typeof|new|in|of|instanceof)\b/) && !trimmed.match(/^[\}\]\)]/)) return true;
  if (trimmed.match(/\w+\(.*,\s*.*,\s*.*\)/) && !trimmed.match(/^(if|for|while|switch|function|return)\s*\(/)) return true;
  // "with (flat)" or "word (word)" patterns — exploded content
  if (trimmed.match(/^\w+\s*\(\w+\)\s*$/) && !trimmed.match(/^(if|for|while|switch|function|return|with)\s*\(/)) return true;
  // Lines that are just words in parentheses
  if (trimmed.match(/^\(\w+\)\s*$/)) return true;
  return false;
}

function isPropertyLine(line) {
  const trimmed = line.trim();
  if (isGarbageLine(line)) return false;
  for (const p of PROPS) {
    if (trimmed.match(new RegExp('^' + p + '\\s*:'))) return true;
  }
  if (trimmed.match(/^[}\])],?\s*$/)) return true;
  if (trimmed.match(/^\{/)) return true;
  if (trimmed.match(/^(import|export|const|let|var|function|interface|type|\/\/)/)) return true;
  return false;
}

function findNextProp(lines, fromLine) {
  for (let li = fromLine; li < Math.min(fromLine + 5000, lines.length); li++) {
    if (isPropertyLine(lines[li])) return li;
  }
  return -1;
}

// Fix 1: Line-level fixes
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

  // Find string close + comma on this line
  const sqIdx = line.lastIndexOf("',");
  const dqIdx = line.lastIndexOf('",');
  const btIdx = line.lastIndexOf(BACKTICK + ',');
  const closest = Math.max(sqIdx, dqIdx, btIdx);

  // TS1005, TS1003, TS1136: garbage after string close
  if (code === 1005 || code === 1003 || code === 1136) {
    if (closest >= 0) {
      const nextProp = findNextProp(lines, lineNum);
      if (nextProp >= 0 && nextProp > lineIdx) {
        const fixedLine = line.substring(0, closest + 2);
        const newLines = [...lines.slice(0, lineIdx), fixedLine, ...lines.slice(nextProp)];
        return newLines.join('\n');
      }
      // Just cut the line
      const fixedLine = line.substring(0, closest + 2);
      if (fixedLine.length < line.length) {
        lines[lineIdx] = fixedLine;
        return lines.join('\n');
      }
    }

    // Backtick close + garbage
    let btCol = -1;
    for (let i = 0; i < line.length; i++) {
      if (line[i] === BACKTICK) { btCol = i; break; }
    }
    if (btCol >= 0) {
      const nextProp = findNextProp(lines, lineNum);
      if (nextProp >= 0 && nextProp > lineIdx) {
        const fixedLine = line.substring(0, btCol + 1) + ',';
        const newLines = [...lines.slice(0, lineIdx), fixedLine, ...lines.slice(nextProp)];
        return newLines.join('\n');
      }
    }

    // Duplicated parens
    if (line.match(/`\)\)/)) {
      lines[lineIdx] = line.replace(/`\)\)/g, '`)');
      return lines.join('\n');
    }
    if (line.match(/`\)+\)/)) {
      lines[lineIdx] = line.replace(/`\)+\)/g, '`)');
      return lines.join('\n');
    }
    if (line.match(/`-\)-\)/)) {
      lines[lineIdx] = line.replace(/`-\)-\)/g, '`)');
      return lines.join('\n');
    }
    if (line.match(/,,/)) {
      lines[lineIdx] = line.replace(/,,/g, ',');
      return lines.join('\n');
    }
  }

  // TS1109: Expression expected — check previous line for garbage
  if (code === 1109) {
    // Check if this line is garbage
    if (isGarbageLine(line)) {
      // Find next valid property
      const nextProp = findNextProp(lines, lineNum);
      if (nextProp >= 0 && nextProp > lineIdx) {
        const newLines = [...lines.slice(0, lineIdx), ...lines.slice(nextProp)];
        return newLines.join('\n');
      }
    }
    // Check previous line
    if (lineIdx > 0) {
      const prevLine = lines[lineIdx - 1];
      const sqIdx2 = prevLine.lastIndexOf("',");
      const dqIdx2 = prevLine.lastIndexOf('",');
      const btIdx2 = prevLine.lastIndexOf(BACKTICK + ',');
      const closest2 = Math.max(sqIdx2, dqIdx2, btIdx2);
      if (closest2 >= 0) {
        lines[lineIdx - 1] = prevLine.substring(0, closest2 + 2);
        // Also remove current line if it's garbage
        if (isGarbageLine(line)) {
          const nextProp = findNextProp(lines, lineNum + 1);
          if (nextProp >= 0) {
            const newLines = [...lines.slice(0, lineIdx - 1), lines[lineIdx - 1], ...lines.slice(nextProp)];
            return newLines.join('\n');
          }
        }
        return lines.join('\n');
      }
    }
  }

  // TS1002: Unterminated string
  if (code === 1002) {
    const m = line.match(/'([^']*)'([a-z][^']*)'/);
    if (m) {
      lines[lineIdx] = line.replace(/'([^']*)'([a-z][^']*)'/g, (match, p1, p2) => {
        return '"' + (p1 + "'" + p2).replace(/"/g, '\\"') + '"';
      });
      return lines.join('\n');
    }
    // Missing opening quote
    const m3 = line.match(/^(\s*\w+:\s*)([A-Z][^,}\]]*)$/);
    if (m3) {
      const text = m3[2].replace(/"/g, '\\"');
      lines[lineIdx] = m3[1] + '"' + text + '",';
      return lines.join('\n');
    }
  }

  return null;
}

// Fix 2: Exploded content removal
function fixExploded(content) {
  const lines = content.split('\n');
  let changed = false;

  for (let i = 0; i < lines.length - 1; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    if (trimmed.match(/['"`],?\s*$/) && trimmed.length > 20) {
      let garbageStart = i + 1;
      let consecutiveGarbage = 0;

      for (let j = garbageStart; j < Math.min(garbageStart + 10000, lines.length); j++) {
        if (isGarbageLine(lines[j])) {
          consecutiveGarbage++;
        } else if (lines[j].trim() === '') {
          continue;
        } else {
          break;
        }
      }

      if (consecutiveGarbage >= 5) {
        let nextValid = -1;
        for (let j = garbageStart + consecutiveGarbage; j < Math.min(garbageStart + consecutiveGarbage + 500, lines.length); j++) {
          if (isPropertyLine(lines[j])) {
            nextValid = j;
            break;
          }
        }

        if (nextValid >= 0) {
          lines.splice(garbageStart, nextValid - garbageStart);
          changed = true;
          continue;
        }
      }
    }
  }

  return changed ? lines.join('\n') : null;
}

// Fix 3: JSX character fixes
function fixJsxChars(content) {
  const sf = ts.createSourceFile('test.tsx', content, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const diags = sf.parseDiagnostics || [];
  let result = content;
  const sorted = diags.filter(d => d.code === 1381 || d.code === 1382).sort((a, b) => b.start - a.start);
  for (const diag of sorted) {
    const char = result[diag.start];
    if (diag.code === 1381 && char === '}') {
      result = result.substring(0, diag.start) + "{'}'}" + result.substring(diag.start + 1);
    } else if (diag.code === 1382 && char === '>') {
      result = result.substring(0, diag.start) + '&gt;' + result.substring(diag.start + 1);
    }
  }
  return result;
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

    // Phase 1: Line-level fixes
    while (attempts < 100) {
      const diags = getDiags(content);
      if (diags.length === 0) break;
      const candidate = fixLine(content, diags[0]);
      if (!candidate) break;
      const newDiagLine = getFirstDiagLine(candidate);
      if (newDiagLine === 0 || newDiagLine > lastDiagLine) {
        content = candidate;
        lastDiagLine = newDiagLine;
        attempts++;
        totalFixes++;
      } else { break; }
    }

    // Phase 2: Exploded content removal
    while (true) {
      const candidate = fixExploded(content);
      if (!candidate) break;
      const newDiagLine = getFirstDiagLine(candidate);
      if (newDiagLine === 0 || newDiagLine > lastDiagLine) {
        content = candidate;
        lastDiagLine = newDiagLine;
        attempts++;
        totalFixes++;
      } else { break; }
    }

    // Phase 3: Line-level fixes again (after exploded removal may have exposed new issues)
    while (attempts < 200) {
      const diags = getDiags(content);
      if (diags.length === 0) break;
      const candidate = fixLine(content, diags[0]);
      if (!candidate) break;
      const newDiagLine = getFirstDiagLine(candidate);
      if (newDiagLine === 0 || newDiagLine > lastDiagLine) {
        content = candidate;
        lastDiagLine = newDiagLine;
        attempts++;
        totalFixes++;
      } else { break; }
    }

    // Phase 4: TS printer cleanup
    const sf = ts.createSourceFile('test.tsx', content, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
    const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
    let printed = printer.printFile(sf);

    // Phase 5: JSX char fixes
    printed = fixJsxChars(printed);

    const finalDiags = getDiags(printed);
    if (finalDiags < initialDiags || attempts > 0) {
      fs.writeFileSync(filePath, printed, 'utf8');
      totalFixed++;
      if (finalDiags === 0) {
        console.log(`FIXED: ${dir}/${file} (${attempts} fixes)`);
      } else {
        console.log(`PARTIAL: ${dir}/${file} (${initialDiags.length}→${finalDiags.length})`);
      }
    } else {
      stillBroken++;
    }
  });
});

console.log(`\n=== Fixed: ${totalFixed}, Still broken: ${stillBroken}, Total fixes: ${totalFixes} ===`);
