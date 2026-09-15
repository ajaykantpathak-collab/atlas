const fs = require('fs');
const f = 'D:\\dream_app\\frontend\\components\\simulations\\c9_12\\CellBiologySim.tsx';
let c = fs.readFileSync(f, 'utf8');
c = c.replace(/<\/g>;/g, '</g>');
c = c.replace(/<\/svg>;/g, '</svg>');
fs.writeFileSync(f, c, 'utf8');
console.log('Fixed all semicolons after closing tags');
