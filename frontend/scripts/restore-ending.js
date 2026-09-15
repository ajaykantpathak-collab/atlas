const fs = require('fs');
const f = 'D:\\dream_app\\frontend\\components\\simulations\\c9_12\\CellBiologySim.tsx';
let c = fs.readFileSync(f, 'utf8');
const lines = c.split('\n');
// Remove all trailing } lines
while (lines.length > 0 && lines[lines[lines.length - 1].trim() === '}' ? lines.length - 1 : -1] !== undefined && lines[lines.length - 1].trim() === '}') {
  lines.pop();
}
// Add back the proper ending: );  }
lines.push('  );');
lines.push('}');
fs.writeFileSync(f, lines.join('\n'), 'utf8');
console.log('Restored proper ending');
