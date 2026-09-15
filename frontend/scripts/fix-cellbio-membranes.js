// Remove duplicate renderMembraneDetailSVG functions
const fs = require('fs');
const filePath = 'D:\\dream_app\\frontend\\components\\simulations\\c9_12\\CellBiologySim.tsx';
let content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

// Find all renderMembraneDetailSVG
const positions = [];
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('const renderMembraneDetailSVG = () =>')) {
    positions.push(i);
  }
}

console.log('Found renderMembraneDetailSVG at lines:', positions.map(p => p + 1));

// For each, find where it closes (look for the next }; or return statement pattern)
for (const pos of positions) {
  // Find the closing }; by counting braces
  let depth = 0;
  let found = false;
  for (let i = pos; i < lines.length; i++) {
    for (const ch of lines[i]) {
      if (ch === '{') depth++;
      if (ch === '}') depth--;
    }
    if (depth <= 0 && i > pos) {
      console.log(`  renderMembraneDetailSVG at L${pos+1} closes at L${i+1}: ${lines[i].substring(0, 80)}`);
      break;
    }
  }
}

// Keep the last one, remove the first two
// But first check if they're inside the component function
// The component starts at the export default function line
let componentStart = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].match(/^export default function/)) {
    componentStart = i;
    break;
  }
}
console.log('Component starts at line:', componentStart + 1);

// Remove the first two renderMembraneDetailSVG (keep the last one)
// Remove in reverse order to preserve indices
for (let k = positions.length - 2; k >= 0; k--) {
  const pos = positions[k];
  // Find closing }; 
  let depth = 0;
  let closeLine = -1;
  for (let i = pos; i < lines.length; i++) {
    for (const ch of lines[i]) {
      if (ch === '{') depth++;
      if (ch === '}') depth--;
    }
    if (depth <= 0 && i > pos) {
      closeLine = i;
      break;
    }
  }
  
  if (closeLine >= 0) {
    // Include any comment lines before
    let start = pos;
    for (let i = pos - 1; i >= 0; i--) {
      if (lines[i].includes('====') || lines[i].includes('SVG') || lines[i].trim() === '') {
        start = i;
      } else {
        break;
      }
    }
    // Remove from start to closeLine (inclusive)
    console.log(`Removing L${start+1} to L${closeLine+1}`);
    lines.splice(start, closeLine - start + 1);
  }
}

fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
console.log('Done');
