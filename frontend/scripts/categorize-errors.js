// Show first error for unparseable files
const parser = require('@babel/parser');
const fs = require('fs');
const path = require('path');

const FRONTEND = 'D:\\dream_app\\frontend\\components\\simulations';
const dirs = ['c9_12', 'c6_8', 'class1', 'class2', 'class3', 'class4', 'class5', 'maths'];

const errorTypes = {};
const samples = {};

dirs.forEach(dir => {
  const dirPath = path.join(FRONTEND, dir);
  if (!fs.existsSync(dirPath)) return;

  fs.readdirSync(dirPath).filter(f => f.endsWith('.tsx')).forEach(file => {
    const filePath = path.join(dirPath, file);
    const content = fs.readFileSync(filePath, 'utf8');

    try {
      parser.parse(content, {
        sourceType: 'module',
        plugins: ['jsx', 'typescript'],
        errorRecovery: true,
      });
    } catch (e) {
      const msg = e.message.substring(0, 80);
      const lineMatch = e.message.match(/\((\d+):(\d+)\)/);
      const line = lineMatch ? parseInt(lineMatch[1]) : -1;
      const col = lineMatch ? parseInt(lineMatch[2]) : -1;

      // Categorize by error type
      let category = 'unknown';
      if (msg.includes('Unexpected token')) category = 'unexpected_token';
      else if (msg.includes('Unterminated')) category = 'unterminated_string';
      else if (msg.includes('Invalid')) category = 'invalid_token';

      errorTypes[category] = (errorTypes[category] || 0) + 1;
      if (!samples[category]) samples[category] = [];
      if (samples[category].length < 3) {
        const lines = content.split('\n');
        samples[category].push({
          file: `${dir}/${file}`,
          line, col,
          msg: msg,
          content: line > 0 ? lines[line - 1]?.substring(0, 150) : '',
        });
      }
    }
  });
});

console.log('Error types:');
Object.entries(errorTypes).forEach(([type, count]) => {
  console.log(`  ${type}: ${count}`);
  samples[type].forEach(s => {
    console.log(`    ${s.file} L${s.line}:${s.col}`);
    console.log(`    ${s.msg}`);
    console.log(`    ${s.content}`);
    console.log();
  });
});
