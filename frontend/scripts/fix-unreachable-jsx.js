// Fix "unreachable JSX" pattern caused by TS printer mangling
//
// Pattern:
//   </g>);      ← premature close of return statement
//   };          ← premature close of function
//   { /* comment */ }   ← raw JSX at module level (unreachable)
//   <g ...>             ← raw JSX
//   ...
//   svg >        ← broken </svg> close
//   ;
//   ;
//   const renderNextSVG = () => {   ← next function starts
//
// Fix:
//   </g>          ← remove premature close
//   ... JSX ...   ← keep inside function
//   </svg>        ← proper close
//   );            ← close return
//   };            ← close function
//   const renderNextSVG = () => {

const fs = require('fs');
const path = require('path');
const ts = require('typescript');

const FRONTEND = 'D:\\dream_app\\frontend\\components\\simulations';
const dirs = ['c9_12', 'c6_8', 'class1', 'class2', 'class3', 'class4', 'class5', 'maths'];

function getDiags(content) {
  const sf = ts.createSourceFile('test.tsx', content, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  return sf.parseDiagnostics || [];
}

// Check if a line is raw JSX (sitting outside a function)
function isRawJsx(line) {
  const trimmed = line.trim();
  if (trimmed === '') return false;
  if (trimmed.match(/^<\w/)) return true;          // <g, <rect, <text, <svg, etc.
  if (trimmed.match(/^<\/\w/)) return true;         // </g, </svg, etc.
  if (trimmed.match(/^\{.*\}/)) return true;        // { /* comment */ }
  if (trimmed.match(/^\/>/)) return true;           // self-closing
  if (trimmed.match(/^\/&gt;/)) return true;        // HTML-escaped self-closing
  if (trimmed.match(/^svg\s*>/)) return true;       // broken svg close
  if (trimmed.match(/^\w+\s*\(/) && !trimmed.match(/^(const|let|var|import|export|function|return|if|else|for|while|switch|case|break|default|throw|await|yield|delete|void|typeof|new)\b/)) return true; // broken JSX expression
  return false;
}

// Check if a line looks like a broken close: </g>); or </g>;
function isBrokenClose(line) {
  const trimmed = line.trim();
  if (trimmed.match(/<\/g>\);?\s*$/)) return true;
  if (trimmed.match(/<\/svg>\);?\s*$/)) return true;
  if (trimmed.match(/\)\s*;?\s*$/)) return true;
  return false;
}

function fixUnreachableJsx(content) {
  const lines = content.split('\n');
  let changed = false;

  for (let i = 0; i < lines.length - 2; i++) {
    const line = lines[i];
    const next = lines[i + 1];
    const trimmed = line.trim();
    const nextTrimmed = next.trim();

    // Pattern: line ends with </g>); or similar, next line is };
    // Then raw JSX follows
    if (trimmed.match(/<\/[a-zA-Z]+>\);?\s*$/) && nextTrimmed === '};') {
      // Check if the lines after }; are raw JSX
      let jsxStart = i + 2;
      let jsxEnd = jsxStart;
      let foundJsx = false;

      for (let j = jsxStart; j < Math.min(jsxStart + 100, lines.length); j++) {
        const jtrim = lines[j].trim();
        if (isRawJsx(lines[j])) {
          foundJsx = true;
          jsxEnd = j + 1;
        } else if (jtrim === '' || jtrim === ';') {
          // Empty lines and semicolons are part of the broken section
          continue;
        } else if (jtrim.match(/^(const|let|var|function|export|import|\/\/|interface|type)\b/)) {
          // Next function/declaration starts
          break;
        } else if (isRawJsx(lines[j])) {
          foundJsx = true;
          jsxEnd = j + 1;
        } else {
          break;
        }
      }

      if (foundJsx) {
        // Find the end of the JSX block (look for svg > or </svg> or the last JSX line)
        let svgCloseLine = -1;
        for (let j = jsxEnd - 1; j >= jsxStart; j--) {
          const jtrim = lines[j].trim();
          if (jtrim.match(/^svg\s*>/) || jtrim.match(/^<\/svg>/) || jtrim.match(/<\/svg>/)) {
            svgCloseLine = j;
            break;
          }
        }

        // Fix the premature close on line i: remove ); 
        // Change "</g>);" to "</g>"
        lines[i] = line.replace(/\)\s*;?\s*$/, '');

        // Remove the premature }; on line i+1
        lines[i + 1] = '';

        // Fix the JSX lines: fix /&gt; to />, fix svg > to </svg>, remove trailing ;
        for (let j = jsxStart; j < jsxEnd; j++) {
          let l = lines[j];
          // Fix /&gt; to />
          l = l.replace(/\/&gt;/g, '/>');
          // Fix svg > to </svg>
          l = l.replace(/^(\s*)svg\s*>/, '$1</svg>');
          // Fix </g>; to </g>
          l = l.replace(/(<\/[a-zA-Z]+>);/g, '$1');
          // Fix broken path d attributes: remove trailing T/> garbage
          l = l.replace(/(`[^`]*`)\s+T\/>.*$/, '$1');
          // Remove standalone ; lines
          if (l.trim() === ';') l = '';
          lines[j] = l;
        }

        // If we found an svg close line, add ); and }; after it
        if (svgCloseLine >= 0) {
          // Ensure the svg close line is </svg>
          lines[svgCloseLine] = lines[svgCloseLine].replace(/^(\s*)svg\s*>/, '$1</svg>');
          lines[svgCloseLine] = lines[svgCloseLine].replace(/<\/svg>;/, '</svg>');
          // Add ); and }; after
          lines.splice(svgCloseLine + 1, 0, '    );', '};');
        } else {
          // No svg close found — add one at the end of JSX block
          // Find the last non-empty JSX line
          let lastJsx = jsxEnd - 1;
          while (lastJsx >= jsxStart && lines[lastJsx].trim() === '') lastJsx--;
          lines.splice(lastJsx + 1, 0, '      </svg>', '    );', '};');
        }

        changed = true;
        // Restart scanning since positions shifted
        break;
      }
    }
  }

  return changed ? lines.join('\n') : null;
}

// Main
let totalFixed = 0;
let stillBroken = 0;
let totalFixes = 0;

dirs.forEach(dir => {
  const dirPath = path.join(FRONTEND, dir);
  if (!fs.existsSync(dirPath)) return;

  fs.readdirSync(dirPath).filter(f => f.endsWith('.tsx')).forEach(file => {
    const filePath = path.join(dirPath, file);
    let content = fs.readFileSync(filePath, 'utf8');

    const initialDiags = getDiags(content);
    if (initialDiags.length === 0) return;

    let attempts = 0;
    let lastDiagCount = initialDiags.length;

    while (attempts < 20) {
      const candidate = fixUnreachableJsx(content);
      if (!candidate) break;

      const newDiags = getDiags(candidate);
      if (newDiags.length < lastDiagCount) {
        content = candidate;
        lastDiagCount = newDiags.length;
        attempts++;
        totalFixes++;
      } else {
        break;
      }
    }

    if (attempts > 0) {
      fs.writeFileSync(filePath, content, 'utf8');
      totalFixed++;
      const finalDiags = getDiags(content);
      if (finalDiags.length === 0) {
        console.log(`FIXED: ${dir}/${file} (${attempts} fixes)`);
      } else {
        console.log(`PARTIAL: ${dir}/${file} (${initialDiags.length}→${finalDiags.length})`);
      }
    }
  });
});

console.log(`\n=== Fixed: ${totalFixed}, Total fixes: ${totalFixes} ===`);
