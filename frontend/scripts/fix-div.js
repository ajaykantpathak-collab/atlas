const fs = require('fs');
const f = 'D:\\dream_app\\frontend\\components\\simulations\\c9_12\\CellBiologySim.tsx';
let c = fs.readFileSync(f, 'utf8');
const lines = c.split('\n');

// Remove line 2401 (the extra </div>)
// Find the last </div> at line 2400 (index 2399), then the next line is also </div>
// Remove the duplicate
for (let i = lines.length - 1; i >= 0; i--) {
  if (lines[i].trim() === '</div>' && i > 0 && lines[i - 1].trim() === '</div>') {
    // Keep the first one, remove the second
    lines.splice(i, 1);
    break;
  }
}

fs.writeFileSync(f, lines.join('\n'), 'utf8');
console.log('Removed duplicate </div>');
