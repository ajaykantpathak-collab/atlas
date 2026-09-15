// Trace brace depth using TS tokenizer to find the extra opening brace
const ts = require('typescript');
const fs = require('fs');
const filePath = 'D:\\dream_app\\frontend\\components\\simulations\\c9_12\\CellBiologySim.tsx';
const sourceText = fs.readFileSync(filePath, 'utf8');
const sourceFile = ts.createSourceFile(filePath, sourceText, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);

// Walk the AST and find all OpenBraceToken and CloseBraceToken
let depth = 0;
let componentStart = -1;
const scanner = ts.createScanner(ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX, sourceText);

let token = scanner.scan();
let pos = scanner.getTokenStart();
let line = sourceFile.getLineAndCharacterOfPosition(pos);

// Find "export default function CellBiologySim"
const lines = sourceText.split('\n');
let componentLine = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('export default function CellBiologySim')) {
    componentLine = i;
    break;
  }
}
console.log('Component starts at line', componentLine + 1);

// Re-scan from component start
const componentStartPos = sourceFile.getPositionOfLineAndStartCharacter(componentLine, 0);
scanner.setTextPos(componentStartPos);

depth = 0;
token = scanner.scan();
while (token !== ts.SyntaxKind.EndOfToken) {
  if (token === ts.SyntaxKind.OpenBraceToken) {
    depth++;
    const pos = scanner.getTokenStart();
    const line = sourceFile.getLineAndCharacterOfPosition(pos);
    if (depth > 5 || (depth === 1 && line.line > componentLine + 50)) {
      // Only log unusual depth changes
    }
  }
  if (token === ts.SyntaxKind.CloseBraceToken) {
    depth--;
    const pos = scanner.getTokenStart();
    const line = sourceFile.getLineAndCharacterOfPosition(pos);
    if (depth === 0) {
      console.log(`Depth 0 at L${line.line + 1}: ${lines[line.line]?.substring(0, 80)}`);
    }
    if (depth < 0) {
      console.log(`NEGATIVE depth ${depth} at L${line.line + 1}: ${lines[line.line]?.substring(0, 80)}`);
    }
  }
  token = scanner.scan();
}
console.log('Final depth:', depth);
