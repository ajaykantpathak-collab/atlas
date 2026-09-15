const fs = require('fs');
const f = 'D:\\dream_app\\frontend\\components\\simulations\\c9_12\\CellBiologySim.tsx';
let c = fs.readFileSync(f, 'utf8');
// Remove the extra braces I added
const lines = c.split('\n');
// Remove last 2 lines (the extra } I added)
while (lines.length > 0 && lines[lines.length - 1].trim() === '}') {
  lines.pop();
}
// Add back just one }
lines.push('}');
fs.writeFileSync(f, lines.join('\n'), 'utf8');
console.log('Fixed braces');
