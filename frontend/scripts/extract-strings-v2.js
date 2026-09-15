// Use Babel AST to extract strings from parseable files
// For files Babel can parse (even with errors), we get reliable string locations
// For files Babel can't parse at all, we flag them for manual fixing

const parser = require('@babel/parser');
const fs = require('fs');
const path = require('path');

const FRONTEND = 'D:\\dream_app\\frontend\\components\\simulations';
const OUTPUT_DIR = 'D:\\dream_app\\frontend\\extracted_data_v2';
const dirs = ['c9_12', 'c6_8', 'class1', 'class2', 'class3', 'class4', 'class5', 'maths'];

if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

let parseable = 0;
let unparseable = 0;
let totalStrings = 0;
const unparseableFiles = [];

dirs.forEach(dir => {
  const dirPath = path.join(FRONTEND, dir);
  if (!fs.existsSync(dirPath)) return;

  const outDir = path.join(OUTPUT_DIR, dir);
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  fs.readdirSync(dirPath).filter(f => f.endsWith('.tsx')).forEach(file => {
    const filePath = path.join(dirPath, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const baseName = file.replace('.tsx', '');

    let ast = null;
    let parseErrors = [];

    try {
      const result = parser.parse(content, {
        sourceType: 'module',
        plugins: ['jsx', 'typescript'],
        errorRecovery: true,
      });
      ast = result;
      parseErrors = result.errors || [];
    } catch (e) {
      // Completely unparseable
      unparseable++;
      unparseableFiles.push(`${dir}/${file}`);
      return;
    }

    // Extract string literals from AST
    const strings = [];
    const stringLocations = []; // {start, end, quoteType}

    function visit(node) {
      if (!node || typeof node !== 'object') return;
      if (Array.isArray(node)) { node.forEach(visit); return; }

      if (node.type === 'StringLiteral') {
        strings.push(node.value);
        stringLocations.push({
          start: node.start,
          end: node.end,
          quote: content[node.start] || "'",
        });
      }
      if (node.type === 'TemplateLiteral') {
        // For template literals, get the raw text (quasis)
        const rawText = node.quasis.map(q => q.value.cooked || q.value.raw).join('${...}');
        strings.push(rawText);
        stringLocations.push({
          start: node.start,
          end: node.end,
          quote: '`',
        });
      }

      for (const key of Object.keys(node)) {
        if (key === 'loc' || key === 'range' || key === 'start' || key === 'end') continue;
        visit(node[key]);
      }
    }

    if (ast) visit(ast.program);

    // Save strings as JSON
    fs.writeFileSync(path.join(outDir, baseName + '.json'), JSON.stringify(strings, null, 2), 'utf8');

    // Save string locations for regeneration
    fs.writeFileSync(
      path.join(outDir, baseName + '.locations.json'),
      JSON.stringify({ content: content, locations: stringLocations }, null, 2),
      'utf8'
    );

    parseable++;
    totalStrings += strings.length;
  });
});

console.log(`Parseable: ${parseable}, Unparseable: ${unparseable}`);
console.log(`Total strings extracted: ${totalStrings}`);
if (unparseableFiles.length <= 20) {
  console.log('\nUnparseable files:');
  unparseableFiles.forEach(f => console.log(`  ${f}`));
} else {
  console.log(`\n${unparseableFiles.length} unparseable files (too many to list)`);
}
