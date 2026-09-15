// Fix CellBiologySim.tsx unreachable JSX
const fs = require('fs');
const filePath = 'D:\\dream_app\\frontend\\components\\simulations\\c9_12\\CellBiologySim.tsx';
let content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

// Fix line 1179 (index 1178): Remove duplicated comments and broken close
lines[1178] = '              </g>';

// Fix line 1181 (index 1180): Fix broken circle cx expression and &gt;
lines[1180] = "              <circle cx={cellType === 'plant' ? 415 : 445} cy={cellType === 'plant' ? 270 : 120} r=\"3\" fill=\"#fbbf24\">";

// Fix line 1185 (index 1184): Remove premature ); 
lines[1184] = '            </g>';

// Fix line 1186 (index 1185): Remove premature };
lines[1185] = '';

// Write
fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
console.log('Fixed CellBiologySim.tsx');
