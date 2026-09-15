// Use TypeScript compiler to find the exact location of the brace mismatch
const ts = require('typescript');
const fs = require('fs');
const filePath = 'D:\\dream_app\\frontend\\components\\simulations\\c9_12\\CellBiologySim.tsx';
const sourceText = fs.readFileSync(filePath, 'utf8');
const sourceFile = ts.createSourceFile(filePath, sourceText, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);

// Get all syntax diagnostics
const diags = sourceFile.parseDiagnostics || [];
console.log('Parse diagnostics:', diags.length);
for (const d of diags) {
  const pos = sourceFile.getLineAndCharacterOfPosition(d.start);
  console.log(`  L${pos.line + 1}:${pos.character + 1}: ${ts.flattenDiagnosticMessageText(d.messageText, '\n')}`);
}

// Also check the end of the file
console.log('\nLast 5 lines:');
const lines = sourceText.split('\n');
for (let i = Math.max(0, lines.length - 5); i < lines.length; i++) {
  console.log(`  L${i+1}: ${lines[i]}`);
}
