// Show first 10 errors for a specific file
const ts = require('typescript');
const fs = require('fs');

const file = process.argv[2] || 'LandformExplorerSimulation';
const dir = process.argv[3] || 'c6_8';

const FRONTEND = 'D:\\dream_app\\frontend\\components\\simulations';
const content = fs.readFileSync(`${FRONTEND}\\${dir}\\${file}.tsx`, 'utf8');
const sf = ts.createSourceFile('test.tsx', content, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
const diags = sf.parseDiagnostics || [];

console.log('Total diags:', diags.length);
const lines = content.split('\n');

diags.slice(0, 10).forEach((d, i) => {
  const pos = sf.getLineAndCharacterOfPosition(d.start);
  console.log(`\nDiag ${i}: L${pos.line+1}:${pos.character+1} code=${d.code}`);
  console.log(`  Msg: ${ts.flattenDiagnosticMessageText(d.messageText, '\n').substring(0, 80)}`);
  console.log(`  Line: ${lines[pos.line]?.substring(0, 200) || '(empty)'}`);
  if (pos.line > 0) {
    console.log(`  Prev: ${lines[pos.line-1]?.substring(0, 200) || '(empty)'}`);
  }
});
