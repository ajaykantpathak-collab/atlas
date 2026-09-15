// Replace template literals in JSX transform attributes with string concatenation
const fs = require('fs');
const filePath = 'D:\\dream_app\\frontend\\components\\simulations\\c9_12\\CellBiologySim.tsx';
let content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

// Line 1019 (index 1018): Replace template literal in transform
lines[1018] = "    (cellType === 'animal' || cellType === 'plant') && (<g className='cursor-pointer transition-transform hover:scale-105' onClick={() => handleOrganelleClick('golgi')} transform={'translate(' + (cellType === 'plant' ? 380 : 380) + ', ' + (cellType === 'plant' ? 100 : 270) + ')'}>";

// Line 1067 (index 1066): Replace template literal in transform
lines[1066] = "    (cellType === 'animal' || cellType === 'plant') && (<g className='cursor-pointer transition-transform hover:scale-105' onClick={() => handleOrganelleClick('er_rough')} transform={'translate(' + (cellType === 'plant' ? 140 : 210) + ', ' + (cellType === 'plant' ? 220 : 220) + ')'}>";

fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
console.log('Fixed template literals in transform attributes');
