// Search for files with the "unreachable JSX" pattern
// Pattern: }; followed by raw JSX lines (not inside a function)

const fs = require('fs');
const path = require('path');

const FRONTEND = 'D:\\dream_app\\frontend\\components\\simulations';
const dirs = ['c9_12', 'c6_8', 'class1', 'class2', 'class3', 'class4', 'class5', 'maths'];

function isRawJsx(line) {
  const trimmed = line.trim();
  if (trimmed === '') return false;
  if (trimmed.match(/^<\w/)) return true;
  if (trimmed.match(/^<\/\w/)) return true;
  if (trimmed.match(/^\{.*\}/)) return true;
  if (trimmed.match(/^\/>/)) return true;
  if (trimmed.match(/^\/&gt;/)) return true;
  if (trimmed.match(/^svg\s*>/)) return true;
  return false;
}

const found = [];

dirs.forEach(dir => {
  const dirPath = path.join(FRONTEND, dir);
  if (!fs.existsSync(dirPath)) return;

  fs.readdirSync(dirPath).filter(f => f.endsWith('.tsx')).forEach(file => {
    const filePath = path.join(dirPath, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');

    for (let i = 0; i < lines.length - 2; i++) {
      const trimmed = lines[i].trim();
      const nextTrimmed = lines[i + 1].trim();
      const nextNextTrimmed = lines[i + 2].trim();

      // Pattern: line ends with ); or };, next line is }; or empty, then raw JSX
      if ((trimmed === '};' || trimmed.match(/\);\s*$/) || trimmed.match(/<\/[a-zA-Z]+>\);?\s*$/)) &&
          (nextTrimmed === '};' || nextTrimmed === '' || nextTrimmed === ';') &&
          isRawJsx(lines[i + 2])) {
        found.push({ dir, file, line: i + 1, content: lines[i + 2].substring(0, 80) });
        break; // Only report once per file
      }
    }
  });
});

console.log(`Files with unreachable JSX pattern: ${found.length}`);
found.forEach(f => {
  console.log(`  ${f.dir}/${f.file} L${f.line}: ${f.content}`);
});
