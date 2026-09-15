// Remove broken duplicate lines 979-984 (0-indexed: 978-983) in CellBiologySim.tsx
const fs = require('fs');
const filePath = 'D:\\dream_app\\frontend\\components\\simulations\\c9_12\\CellBiologySim.tsx';
let content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

// Remove lines 979-984 (indices 978-983)
// These are: broken circle, empty, rect, path, </g>, ATP comment
lines.splice(978, 6);

fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
console.log('Removed broken duplicate lines 979-984');
