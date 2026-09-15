// Remove the broken first renderCellSVG and duplicate functions from CellBiologySim.tsx
const fs = require('fs');
const filePath = 'D:\\dream_app\\frontend\\components\\simulations\\c9_12\\CellBiologySim.tsx';
let content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

// Find the first renderCellSVG (line 872, index 871)
// Find the second renderCellSVG (line 1033, index 1032)
// Remove everything from the first renderCellSVG's comment header to just before the second one

let firstRenderCellSVG = -1;
let secondRenderCellSVG = -1;

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('const renderCellSVG = () =>')) {
    if (firstRenderCellSVG === -1) {
      firstRenderCellSVG = i;
    } else if (secondRenderCellSVG === -1) {
      secondRenderCellSVG = i;
    }
  }
}

console.log('First renderCellSVG at line:', firstRenderCellSVG + 1);
console.log('Second renderCellSVG at line:', secondRenderCellSVG + 1);

// Find the comment block before the first renderCellSVG (go back a few lines)
let removeStart = firstRenderCellSVG;
for (let i = firstRenderCellSVG - 1; i >= 0; i--) {
  if (lines[i].includes('SVG SUB-VISUALIZATIONS') || lines[i].includes('=====')) {
    removeStart = i;
  } else if (lines[i].trim() === '' && i === removeStart - 1) {
    continue;
  } else {
    break;
  }
}

// Find the comment block before the second renderCellSVG
let removeEnd = secondRenderCellSVG;
for (let i = secondRenderCellSVG - 1; i >= 0; i--) {
  if (lines[i].includes('SVG SUB-VISUALIZATIONS') || lines[i].includes('=====')) {
    removeEnd = i;
    break;
  }
}

console.log('Removing lines', removeStart + 1, 'to', removeEnd + 1);
console.log('First line to remove:', lines[removeStart]?.substring(0, 80));
console.log('Last line to remove:', lines[removeEnd - 1]?.substring(0, 80));
console.log('Line after removal:', lines[removeEnd]?.substring(0, 80));

// Remove the broken section
lines.splice(removeStart, removeEnd - removeStart);

fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
console.log('Removed broken first renderCellSVG section');

// Now check for duplicate renderMembraneDetailSVG
let membraneCount = 0;
let membraneLines = [];
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('const renderMembraneDetailSVG = () =>')) {
    membraneCount++;
    membraneLines.push(i + 1);
  }
}
console.log('renderMembraneDetailSVG count:', membraneCount, 'at lines:', membraneLines);
