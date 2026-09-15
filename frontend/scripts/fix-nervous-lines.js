// Fix specific broken lines in NervousSystemSim.tsx
const fs = require('fs');
const filePath = 'D:\\dream_app\\frontend\\components\\simulations\\c9_12\\NervousSystemSim.tsx';
let content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

// Line 1096 (index 1095): Fix placeholder template literal
// Current:  }} placeholder={`Enter answer ${q.unit ? '(${q.unit})' : ''}...'}
// Should be: }} placeholder={`Enter answer ${q.unit ? `(${q.unit})` : ''}...`}
lines[1095] = "                }} placeholder={`Enter answer ${q.unit ? `(${q.unit})` : ''}...`}";

// Line 1113 (index 1112): Check what's there
console.log('L1113:', JSON.stringify(lines[1112]?.substring(0, 120)));

// Line 1141 (index 1140): Check what's there
console.log('L1141:', JSON.stringify(lines[1140]?.substring(0, 120)));

fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
console.log('Fixed line 1096');
