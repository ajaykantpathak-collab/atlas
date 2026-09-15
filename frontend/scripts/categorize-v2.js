// Show first error and surrounding context for unparseable files
const parser = require('@babel/parser');
const fs = require('fs');
const path = require('path');

const FRONTEND = 'D:\\dream_app\\frontend\\components\\simulations';
const dirs = ['c9_12', 'c6_8', 'class1', 'class2', 'class3', 'class4', 'class5', 'maths'];

let count = 0;
const patterns = {};

dirs.forEach(dir => {
  const dirPath = path.join(FRONTEND, dir);
  if (!fs.existsSync(dirPath)) return;

  fs.readdirSync(dirPath).filter(f => f.endsWith('.tsx')).forEach(file => {
    const filePath = path.join(dirPath, file);
    const content = fs.readFileSync(filePath, 'utf8');

    try {
      parser.parse(content, { sourceType: 'module', plugins: ['jsx', 'typescript'], errorRecovery: true });
    } catch (e) {
      if (count >= 30) return;
      const m = e.message.match(/\((\d+):(\d+)\)/);
      if (!m) return;
      const line = parseInt(m[1]);
      const col = parseInt(m[2]);
      const lines = content.split('\n');
      const errLine = lines[line - 1] || '';

      // Categorize the pattern
      let pattern = 'unknown';
      
      // Check if error is after a backtick close
      const BACKTICK = String.fromCharCode(96);
      let hasBacktick = false;
      for (let i = col; i >= 0; i--) {
        if (errLine[i] === BACKTICK) { hasBacktick = true; break; }
      }
      
      if (hasBacktick && errLine.includes(BACKTICK + ',')) {
        pattern = 'after_backtick_comma';
      } else if (hasBacktick) {
        pattern = 'after_backtick_no_comma';
      } else if (errLine.includes('"') && errLine.match(/"[^"]*",\s*\w/)) {
        pattern = 'after_doublequote_comma';
      } else if (e.message.includes('Unexpected character')) {
        pattern = 'unicode_char';
      } else if (e.message.includes('Unterminated')) {
        pattern = 'unterminated';
      } else if (errLine.match(/^\s*\{/)) {
        pattern = 'missing_brace';
      } else if (errLine.match(/'/) && errLine.match(/'\w+'/) && errLine.includes("'")) {
        pattern = 'apostrophe_in_string';
      }

      if (!patterns[pattern]) patterns[pattern] = [];
      if (patterns[pattern].length < 3) {
        patterns[pattern].push({
          file: `${dir}/${file}`,
          line, col,
          msg: e.message.substring(0, 60),
          content: errLine.substring(0, 150),
        });
      }
      count++;
    }
  });
});

Object.entries(patterns).forEach(([pattern, samples]) => {
  console.log(`\n=== ${pattern} (${samples.length} samples) ===`);
  samples.forEach(s => {
    console.log(`  ${s.file} L${s.line}:${s.col}`);
    console.log(`  ${s.content}`);
  });
});
