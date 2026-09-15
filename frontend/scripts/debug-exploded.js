// Debug: check if garbage detection works on NervousSystemSim
const fs = require('fs');
const content = fs.readFileSync('D:\\dream_app\\frontend\\components\\simulations\\c9_12\\NervousSystemSim.tsx', 'utf8');
const lines = content.split('\n');

function isGarbageLine(line) {
  const trimmed = line.trim();
  if (trimmed === '') return false;
  if (trimmed.match(/^['"`]/)) return true;
  if (trimmed.match(/^\w+\s*;/)) return true;
  if (trimmed.match(/^\w+\s*\./)) return true;
  if (trimmed.match(/^-\s*>/)) return true;
  if (trimmed.match(/^}\s*-/)) return true;
  if (trimmed.match(/^\w+\(.*\);?\s*$/)) return true;
  if (trimmed.match(/^[a-z]+\s+[a-z]+/) && !trimmed.match(/^(const|let|var|import|export|function|return|if|else|for|while|switch|case|break|default)\s/)) return true;
  return false;
}

// Check lines 47-55
console.log('Lines 47-55:');
for (let i = 46; i < 55; i++) {
  const isG = isGarbageLine(lines[i]);
  console.log(`  L${i+1}: garbage=${isG} | ${lines[i].substring(0, 80)}`);
}

// Check if line 47 ends with ',
const line47 = lines[46];
console.log('\nLine 47 ends with:', JSON.stringify(line47.substring(line47.length - 5)));
console.log('Line 47 matches pattern:', /['"`],?\s*$/.test(line47.trim()));

// Check the trim
const trimmed = line47.trim();
console.log('Trimmed last 5:', JSON.stringify(trimmed.substring(trimmed.length - 5)));
