const fs = require('fs');
const f = 'D:\\dream_app\\frontend\\components\\simulations\\c9_12\\CellBiologySim.tsx';
let c = fs.readFileSync(f, 'utf8');
// Add a closing brace at the end
c = c.trimEnd() + '\n}\n';
fs.writeFileSync(f, c, 'utf8');
console.log('Added closing brace');
