// Remove broken duplicate mitochondria sections in CellBiologySim.tsx
const fs = require('fs');
const filePath = 'D:\\dream_app\\frontend\\components\\simulations\\c9_12\\CellBiologySim.tsx';
let content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

// Lines 978-989 (0-indexed: 977-988) are broken duplicates
// Line 977 (index 976): </g>  — closes the first mitochondria group (keep this)
// Lines 978-989 (index 977-988): broken duplicates (remove)
// Line 990 (index 989): </g> — part of the third copy (keep as it closes something)
// Actually, let me be more precise. Let me find the exact lines.

// Find the line with "ATP Particles floating out" after the first mitochondria section
let firstATP = -1;
let secondATP = -1;
let thirdATP = -1;
for (let i = 970; i < 1000; i++) {
  if (lines[i] && lines[i].includes('ATP Particles floating out')) {
    if (firstATP === -1) firstATP = i;
    else if (secondATP === -1) secondATP = i;
    else if (thirdATP === -1) thirdATP = i;
  }
}

console.log('ATP comments at lines:', firstATP + 1, secondATP + 1, thirdATP + 1);

// The first ATP comment at line 978 is followed by broken code
// The second ATP comment at line 984 is followed by broken code
// The third ATP comment at line 991 is followed by correct code

// Remove from firstATP to just before thirdATP (the correct one)
if (firstATP >= 0 && thirdATP >= 0) {
  console.log('Removing lines', firstATP + 1, 'to', thirdATP);
  console.log('First line:', lines[firstATP]?.substring(0, 80));
  console.log('Last line to remove:', lines[thirdATP - 1]?.substring(0, 80));
  lines.splice(firstATP, thirdATP - firstATP);
}

fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
console.log('Done');
