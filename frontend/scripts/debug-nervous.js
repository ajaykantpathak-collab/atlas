// Debug NervousSystemSim.tsx — show first 5 errors with context
const ts = require('typescript');
const fs = require('fs');

const content = fs.readFileSync('D:\\dream_app\\frontend\\components\\simulations\\c9_12\\NervousSystemSim.tsx', 'utf8');
const sf = ts.createSourceFile('test.tsx', content, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
const diags = sf.parseDiagnostics || [];

console.log('Total diags:', diags.length);

diags.slice(0, 10).forEach((d, i) => {
  const pos = sf.getLineAndCharacterOfPosition(d.start);
  const lines = content.split('\n');
  const line = lines[pos.line] || '';
  console.log(`\nDiag ${i}: L${pos.line+1}:${pos.character+1} code=${d.code}`);
  console.log(`  Msg: ${ts.flattenDiagnosticMessageText(d.messageText, '\n').substring(0, 80)}`);
  console.log(`  Line: ${line.substring(0, 200)}`);
  if (pos.line > 0) {
    console.log(`  Prev: ${lines[pos.line-1]?.substring(0, 200)}`);
  }
});
