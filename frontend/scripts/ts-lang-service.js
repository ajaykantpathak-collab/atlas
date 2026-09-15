// Use TypeScript Language Service to get code fixes for each error
// The Language Service can suggest fixes like "Add missing semicolon", "Fix quote", etc.

const ts = require('typescript');
const fs = require('fs');
const path = require('path');

const FRONTEND = 'D:\\dream_app\\frontend\\components\\simulations';
const dirs = ['c9_12', 'c6_8', 'class1', 'class2', 'class3', 'class4', 'class5', 'maths'];

// Test on one file first
const testFile = 'D:\\dream_app\\frontend\\components\\simulations\\c9_12\\AcidsBasesSim.tsx';
const content = fs.readFileSync(testFile, 'utf8');
const fileName = path.basename(testFile);

// Create a simple language service
const files = {};
files[fileName] = content;

const servicesHost = {
  getScriptFileNames: () => [fileName],
  getScriptVersion: () => '1',
  getScriptSnapshot: (fn) => {
    if (!files[fn]) return undefined;
    return ts.ScriptSnapshot.fromString(files[fn]);
  },
  getCurrentDirectory: () => process.cwd(),
  getCompilationSettings: () => ({
    target: ts.ScriptTarget.Latest,
    jsx: ts.JsxEmit.React,
    module: ts.ModuleKind.CommonJS,
    allowJs: true,
    noEmit: true,
  }),
  getDefaultLibFileName: () => 'lib.d.ts',
  fileExists: (fn) => fn === fileName || ts.sys.fileExists(fn),
  readFile: (fn) => fn === fileName ? content : ts.sys.readFile(fn),
  readDirectory: ts.sys.readDirectory,
};

const services = ts.createLanguageService(servicesHost, ts.createDocumentRegistry());

// Get syntactic diagnostics
const diags = services.getSyntacticDiagnostics(fileName);
console.log('Syntactic diagnostics:', diags.length);

// For each diagnostic, try to get code fixes
let totalFixes = 0;
diags.slice(0, 10).forEach((diag, i) => {
  const pos = diag.file.getLineAndCharacterOfPosition(diag.start);
  console.log(`\nDiag ${i}: L${pos.line+1}:${pos.character+1} (${diag.length} chars)`);
  console.log(`  Code: ${diag.code}`);
  console.log(`  Msg: ${ts.flattenDiagnosticMessageText(diag.messageText, '\n').substring(0, 80)}`);

  // Get code fixes at this position
  const fixes = services.getCodeFixesAtPosition(
    fileName,
    diag.start,
    diag.start + diag.length,
    [diag.code],
    {
      [fileName]: content,
    },
    {}
  );

  if (fixes && fixes.length > 0) {
    console.log(`  Fixes available: ${fixes.length}`);
    fixes.forEach(fix => {
      console.log(`    - ${fix.fixName}: ${fix.description.substring(0, 60)}`);
      totalFixes++;
    });
  } else {
    console.log(`  No fixes available`);
  }
});

console.log(`\nTotal fixes available: ${totalFixes}`);
