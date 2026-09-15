// Fix broken template literal closings in CellBiologySim.tsx
const fs = require('fs');
const filePath = 'D:\\dream_app\\frontend\\components\\simulations\\c9_12\\CellBiologySim.tsx';
let content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

// Fix lines with ')'}  (should be `})
// Pattern: template literal closing has ' instead of backtick
const BACKTICK = String.fromCharCode(96);

// Check and fix line 1019 (index 1018)
let l = lines[1018];
console.log('L1019 end:', JSON.stringify(l.substring(l.length - 10)));
if (l.includes(")'")) {
  l = l.replace(/\)'/g, ')' + BACKTICK);
  lines[1018] = l;
  console.log('Fixed L1019');
}

// Check line 1068 (index 1067)
l = lines[1067];
if (l) {
  console.log('L1068 end:', JSON.stringify(l.substring(l.length - 20)));
  if (l.includes(")'")) {
    l = l.replace(/\)'/g, ')' + BACKTICK);
    lines[1067] = l;
    console.log('Fixed L1068');
  }
}

// Check line 1083 (index 1082)
l = lines[1082];
if (l) {
  console.log('L1083:', JSON.stringify(l.substring(0, 100)));
}

// Search for all lines with ')'}  pattern (broken template literal close)
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes(")'") && lines[i].includes('translate(')) {
    console.log('Found broken template at L' + (i+1) + ':', lines[i].substring(lines[i].length - 20));
    lines[i] = lines[i].replace(/\)'/g, ')' + BACKTICK);
    console.log('Fixed');
  }
}

fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
console.log('Done');
