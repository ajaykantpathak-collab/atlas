const fs = require('fs');
const f = 'D:\\dream_app\\frontend\\components\\simulations\\c9_12\\CellBiologySim.tsx';
let c = fs.readFileSync(f, 'utf8');
const lines = c.split('\n');

// Find the last </div> before the closing
let lastDivIdx = -1;
for (let i = lines.length - 1; i >= 0; i--) {
  if (lines[i].includes('</div>')) {
    lastDivIdx = i;
    break;
  }
}

console.log('Last </div> at line', lastDivIdx + 1);

// Truncate everything after the last </div> and add proper ending
if (lastDivIdx >= 0) {
  lines.splice(lastDivIdx + 1);
  lines.push('    </div>');
  lines.push('  );');
  lines.push('}');
}

fs.writeFileSync(f, lines.join('\n'), 'utf8');
console.log('Fixed ending');
