// Debug the fix-exploded logic on NervousSystemSim
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
  if (trimmed.match(/^\w+\s*-\s*>\s*\w+/)) return true;
  if (trimmed.match(/^\w+\s*-\s*>\s*;/)) return true;
  if (trimmed.match(/^\w+\(.*\)/) && !trimmed.match(/^(if|for|while|switch|function|return)\s*\(/)) return true;
  return false;
}

function isPropertyLine(line) {
  const trimmed = line.trim();
  const PROPS = ['eli5', 'definition', 'title', 'content', 'keyPoints', 'misconceptions',
    'diagnosticQuestions', 'masteryCriteria', 'nodeId', 'challenges', 'theorySlides',
    'hint', 'hintLevel2', 'hintLevel3', 'misconceptionFeedback', 'explanation',
    'answer', 'options', 'question', 'belief', 'correction', 'number', 'bloomLevel',
    'difficulty', 'moduleId', 'id', 'emoji', 'color', 'description', 'keyConcept',
    'analogy', 'subtitle', 'formula', 'working', 'slides', 'units', 'topics',
    'realWorldActivity', 'reflection', 'answerType', 'text', 'bgColor', 'spoken',
    'misconception', 'hint', 'title', 'text'];
  for (const p of PROPS) {
    if (trimmed.match(new RegExp('^' + p + '\\s*:'))) return true;
  }
  if (trimmed.match(/^[}\])],?\s*$/)) return true;
  if (trimmed.match(/^\{/)) return true;
  if (trimmed.match(/^(import|export|const|let|var|function|interface|type|\/\/)/)) return true;
  return false;
}

// Check line 47 (index 46)
const line47 = lines[46];
const trimmed47 = line47.trim();
console.log('Line 47 trimmed last 10:', JSON.stringify(trimmed47.substring(trimmed47.length - 10)));
console.log('Matches pattern:', /['"`],?\s*$/.test(trimmed47));
console.log('Length > 20:', trimmed47.length > 20);

// Check lines 48-52
console.log('\nGarbage check:');
for (let i = 47; i < 56; i++) {
  console.log(`  L${i+1}: garbage=${isGarbageLine(lines[i])} | ${lines[i].substring(0, 60)}`);
}

// Count consecutive garbage from line 48
let garbageStart = 47;
let consecutiveGarbage = 0;
for (let j = garbageStart; j < Math.min(garbageStart + 5000, lines.length); j++) {
  if (isGarbageLine(lines[j])) {
    consecutiveGarbage++;
  } else if (lines[j].trim() === '') {
    continue;
  } else {
    console.log(`\nStopped at L${j+1}: ${lines[j].substring(0, 60)}`);
    console.log(`Consecutive garbage: ${consecutiveGarbage}`);
    break;
  }
}

// Find next property line
console.log('\nSearching for next property after garbage:');
for (let i = 47; i < Math.min(7000, lines.length); i++) {
  if (isPropertyLine(lines[i])) {
    console.log(`  Found at L${i+1}: ${lines[i].substring(0, 80)}`);
    break;
  }
}
