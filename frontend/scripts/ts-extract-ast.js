// Strategy: Use TypeScript AST to extract valid data, discard broken sections
// and rebuild the file from clean data + intact component code
//
// Steps:
// 1. Parse file with TS (always produces AST)
// 2. Walk AST to find all valid StringLiteral and TemplateLiteral nodes
// 3. Find the boundary between data section and component code
// 4. For the data section: extract what we can, mark what's broken
// 5. For the component code: keep as-is (it's mostly intact)
// 6. Rebuild the file

const ts = require('typescript');
const fs = require('fs');
const path = require('path');

const FRONTEND = 'D:\\dream_app\\frontend\\components\\simulations';
const dirs = ['c9_12', 'c6_8', 'class1', 'class2', 'class3', 'class4', 'class5', 'maths'];

function extractValidStrings(content) {
  const sf = ts.createSourceFile('test.tsx', content, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);

  const strings = []; // {start, end, text, quote}
  const brokenRanges = []; // {start, end}

  function visit(node) {
    // Check if this node is in a broken area
    const nodeStart = node.getStart(sf);
    const nodeEnd = node.getEnd();

    if (node.kind === ts.SyntaxKind.StringLiteral) {
      strings.push({
        start: nodeStart,
        end: nodeEnd,
        text: node.text,
        quote: content[nodeStart] || "'",
        fullText: content.substring(nodeStart, nodeEnd),
      });
    }

    if (node.kind === ts.SyntaxKind.TemplateLiteral) {
      // Get the raw text
      let rawText = '';
      for (let i = 0; i < node.quasis.length; i++) {
        rawText += node.quasis[i].text;
        if (i < node.templateSpans.length) {
          rawText += '${...}';
        }
      }
      strings.push({
        start: nodeStart,
        end: nodeEnd,
        text: rawText,
        quote: '`',
        fullText: content.substring(nodeStart, nodeEnd),
      });
    }

    // Check for broken nodes (SyntaxKind templates that have errors)
    if (node.kind === ts.SyntaxKind.MissingDeclaration ||
        (node.flags & ts.NodeFlags.ThisNodeHasError) ||
        (node.flags & ts.NodeFlags.ContainsThisNodeOrAnySubNodesHasError)) {
      // This node or its children have errors
    }

    ts.forEachChild(node, visit);
  }

  visit(sf);

  return { strings, parseDiagnostics: sf.parseDiagnostics || [] };
}

// Test on one file
const testFile = path.join(FRONTEND, 'c9_12', 'AcidsBasesSim.tsx');
const content = fs.readFileSync(testFile, 'utf8');

const { strings, parseDiagnostics } = extractValidStrings(content);

console.log('Valid strings extracted:', strings.length);
console.log('Parse diagnostics:', parseDiagnostics.length);

// Show first few strings
console.log('\nFirst 5 strings:');
strings.slice(0, 5).forEach((s, i) => {
  console.log(`  [${i}] quote=${s.quote} text="${s.text.substring(0, 60)}..."`);
});

// Show strings around the error area (line 42)
const errorPos = parseDiagnostics[0] ? parseDiagnostics[0].start : 0;
const errorLine = content.substring(0, errorPos).split('\n').length;
console.log(`\nFirst error at line ${errorLine}`);

// Find strings near the error
const nearbyStrings = strings.filter(s => {
  const sLine = content.substring(0, s.start).split('\n').length;
  return Math.abs(sLine - errorLine) < 5;
});
console.log(`\nStrings near error (lines ${errorLine-5} to ${errorLine+5}):`);
nearbyStrings.forEach(s => {
  const sLine = content.substring(0, s.start).split('\n').length;
  console.log(`  L${sLine}: quote=${s.quote} text="${s.text.substring(0, 80)}..."`);
});

// Check how many strings have backticks (corruption indicator)
const backtickStrings = strings.filter(s => s.text.includes('`'));
console.log(`\nStrings containing backticks: ${backtickStrings.length}`);
backtickStrings.slice(0, 3).forEach(s => {
  console.log(`  text="${s.text.substring(0, 80)}..."`);
});
