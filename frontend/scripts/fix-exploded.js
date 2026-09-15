// Fix "exploded content" pattern:
// A valid string closes with ',  on line N
// Lines N+1 to M are garbage: individual words, semicolons, broken arrows
// Line M+1 has the next valid property
// Solution: delete lines N+1 to M

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
  'misconception', 'hint', 'title', 'text',
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

// Check if a line looks like "exploded garbage"
function isGarbageLine(line) {
  const trimmed = line.trim();
  if (trimmed === '') return false; // Empty lines are ambiguous
  if (trimmed.match(/^['"`]/)) return true; // Starts with a quote = broken string fragment
  if (trimmed.match(/^\w+\s*;/)) return true; // word; = exploded content
  if (trimmed.match(/^\w+\s*\./)) return true; // word. = exploded content
  if (trimmed.match(/^-\s*>/)) return true; // -> arrow = exploded content
  if (trimmed.match(/^}\s*-/)) return true; // } - = broken
  if (trimmed.match(/^\w+\(.*\);?\s*$/)) return true; // word(args); = exploded
  if (trimmed.match(/^[a-z]+\s+[a-z]+/) && !trimmed.match(/^(const|let|var|import|export|function|return|if|else|for|while|switch|case|break|default)\s/)) return true; // multiple words without code keywords
  if (trimmed.match(/^\w+\s*-\s*>\s*\w+/)) return true; // word -> word = exploded arrow
  if (trimmed.match(/^\w+\s*-\s*>\s*;/)) return true; // word -> ; = exploded arrow
  if (trimmed.match(/^\w+\(.*\)/) && !trimmed.match(/^(if|for|while|switch|function|return)\s*\(/)) return true; // word(args) = exploded
  // Any line ending with ; that's not a normal code statement
  if (trimmed.match(/;\s*$/) && !trimmed.match(/^(const|let|var|import|export|return|if|for|while|switch|case|break|continue|default|throw|await|yield|delete|void|typeof|new|in|of|instanceof)\b/) && !trimmed.match(/^[\}\]\)]/)) return true;
  // Lines with multiple commas and parentheses that look like exploded function calls
  if (trimmed.match(/\w+\(.*,\s*.*,\s*.*\)/) && !trimmed.match(/^(if|for|while|switch|function|return)\s*\(/)) return true;
  return false;
}

// Check if a line is a valid property assignment
function isPropertyLine(line) {
  const trimmed = line.trim();
  // Must not be a garbage line
  if (isGarbageLine(line)) return false;
  for (const p of PROPS) {
    if (trimmed.match(new RegExp('^' + p + '\\s*:'))) return true;
  }
  // Also check for { or } or ] or ) closings
  if (trimmed.match(/^[}\])],?\s*$/)) return true;
  if (trimmed.match(/^\{/)) return true;
  // Import/export/function/const
  if (trimmed.match(/^(import|export|const|let|var|function|interface|type|\/\/)/)) return true;
  return false;
}

function fixExplodedContent(content) {
  const lines = content.split('\n');
  let changed = false;

  // Find lines that end with ',  or ",  or `,  (string close + comma)
  // Then check if subsequent lines are garbage
  for (let i = 0; i < lines.length - 1; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Check if this line ends with a string close + comma
    if (trimmed.match(/['"`],?\s*$/) && trimmed.length > 20) {
      // Check if next few lines are garbage
      let garbageStart = i + 1;
      let garbageEnd = garbageStart;

      // Count consecutive garbage lines
      let consecutiveGarbage = 0;
      for (let j = garbageStart; j < Math.min(garbageStart + 5000, lines.length); j++) {
        if (isGarbageLine(lines[j])) {
          consecutiveGarbage++;
          garbageEnd = j + 1;
        } else if (lines[j].trim() === '') {
          // Empty line — skip but don't reset
          continue;
        } else {
          break;
        }
      }

      // If we found 5+ consecutive garbage lines, find the next valid property
      if (consecutiveGarbage >= 5) {
        // Find the next valid property line after the garbage
        let nextValid = -1;
        for (let j = garbageEnd; j < Math.min(garbageEnd + 500, lines.length); j++) {
          if (isPropertyLine(lines[j])) {
            nextValid = j;
            break;
          }
        }

        if (nextValid >= 0) {
          // Delete lines from garbageStart to nextValid-1
          lines.splice(garbageStart, nextValid - garbageStart);
          changed = true;
          // Don't increment i — recheck this position
          continue;
        }
      }
    }
  }

  return changed ? lines.join('\n') : null;
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

    // Apply exploded content fix
    let attempts = 0;
    let lastDiagLine = getFirstDiagLine(content);

    while (attempts < 10) {
      const candidate = fixExplodedContent(content);
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

    // Run through TS printer to clean up
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
          console.log(`PARTIAL: ${dir}/${file} (${initialDiags}→${finalDiags} diags, ${attempts} exploded fixes)`);
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
