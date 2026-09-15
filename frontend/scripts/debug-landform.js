const fs = require('fs');
const c = fs.readFileSync('D:\\dream_app\\frontend\\components\\simulations\\c6_8\\LandformExplorerSimulation.tsx', 'utf8');
const lines = c.split('\n');
const l = lines[32]; // Line 33
const trimmed = l.trim();
console.log('Line 33 last 20:', JSON.stringify(l.substring(l.length - 20)));
console.log('Trimmed last 10:', JSON.stringify(trimmed.substring(trimmed.length - 10)));
console.log('Matches:', /['"`],?\s*$/.test(trimmed));
console.log('Length:', trimmed.length);

// Check line 34
const l34 = lines[33];
console.log('\nLine 34:', JSON.stringify(l34.substring(0, 60)));

// Check if isGarbageLine matches line 34
function isGarbageLine(line) {
  const t = line.trim();
  if (t === '') return false;
  if (t.match(/^['"`]/)) return true;
  if (t.match(/^\w+\s*;/)) return true;
  if (t.match(/^\w+\s*\./)) return true;
  if (t.match(/^-\s*>/)) return true;
  if (t.match(/^}\s*-/)) return true;
  if (t.match(/^\w+\(.*\);?\s*$/)) return true;
  if (t.match(/^[a-z]+\s+[a-z]+/) && !t.match(/^(const|let|var|import|export|function|return|if|else|for|while|switch|case|break|default)\s/)) return true;
  if (t.match(/^\w+\s*-\s*>\s*\w+/)) return true;
  if (t.match(/^\w+\s*-\s*>\s*;/)) return true;
  if (t.match(/^\w+\(.*\)/) && !t.match(/^(if|for|while|switch|function|return)\s*\(/)) return true;
  if (t.match(/;\s*$/) && !t.match(/^(const|let|var|import|export|return|if|for|while|switch|case|break|continue|default|throw|await|yield|delete|void|typeof|new|in|of|instanceof)\b/) && !t.match(/^[\}\]\)]/)) return true;
  if (t.match(/\w+\(.*,\s*.*,\s*.*\)/) && !t.match(/^(if|for|while|switch|function|return)\s*\(/)) return true;
  return false;
}

console.log('Line 34 isGarbage:', isGarbageLine(l34));
console.log('Line 35 isGarbage:', isGarbageLine(lines[34]));
console.log('Line 36 isGarbage:', isGarbageLine(lines[35]));
console.log('Line 37 isGarbage:', isGarbageLine(lines[36]));
console.log('Line 38 isGarbage:', isGarbageLine(lines[37]));

// Count consecutive garbage from line 34
let count = 0;
for (let i = 33; i < Math.min(33 + 5000, lines.length); i++) {
  if (isGarbageLine(lines[i])) {
    count++;
  } else if (lines[i].trim() === '') {
    continue;
  } else {
    console.log(`\nStopped at L${i+1}: ${lines[i].substring(0, 60)}`);
    console.log(`Consecutive garbage: ${count}`);
    break;
  }
}
