// Use TypeScript's printer to regenerate code from AST
// Even broken code produces an AST — we fix the AST and print it back
//
// Strategy:
// 1. Parse with TS (always produces AST)
// 2. Walk AST to find broken nodes
// 3. Fix broken nodes in the AST
// 4. Use ts.Printer to print the fixed AST back to source code

const ts = require('typescript');
const fs = require('fs');
const path = require('path');

const FRONTEND = 'D:\\dream_app\\frontend\\components\\simulations';
const dirs = ['c9_12', 'c6_8', 'class1', 'class2', 'class3', 'class4', 'class5', 'maths'];

// Test on one file
const testFile = path.join(FRONTEND, 'c9_12', 'AcidsBasesSim.tsx');
const content = fs.readFileSync(testFile, 'utf8');

// Parse
const sf = ts.createSourceFile('test.tsx', content, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);

// Get diagnostics
const diags = sf.parseDiagnostics || [];
console.log('Parse diagnostics:', diags.length);

// Show what the printer produces from the (broken) AST
const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
const printed = printer.printFile(sf);

console.log('Original length:', content.length);
console.log('Printed length:', printed.length);

// Check if printed version has fewer errors
const printedDiags = ts.createSourceFile('printed.tsx', printed, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX).parseDiagnostics || [];
console.log('Printed diagnostics:', printedDiags.length);

// Show the differences around the error areas
if (printedDiags.length < diags.length) {
  console.log('\nPrinter reduced errors!');
  // Save the printed version
  fs.writeFileSync(testFile + '.printed', printed, 'utf8');
  console.log('Saved to .printed file');
}

// Show first few errors of printed version
printedDiags.slice(0, 5).forEach(d => {
  const pos = sf.getLineAndCharacterOfPosition(d.start);
  console.log(`  L${pos.line+1}:${pos.character+1}: code ${d.code}: ${ts.flattenDiagnosticMessageText(d.messageText, '\n').substring(0, 60)}`);
});
