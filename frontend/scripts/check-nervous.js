const ts = require('typescript');
const fs = require('fs');
const content = fs.readFileSync('D:\\dream_app\\frontend\\components\\simulations\\c9_12\\NervousSystemSim.tsx', 'utf8');
const sf = ts.createSourceFile('test.tsx', content, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
const diags = sf.parseDiagnostics || [];
console.log('Parse diags:', diags.length);
diags.forEach(d => {
  const pos = sf.getLineAndCharacterOfPosition(d.start);
  console.log(`L${pos.line+1}:${pos.character+1} code=${d.code}: ${ts.flattenDiagnosticMessageText(d.messageText, '\n').substring(0, 80)}`);
});
