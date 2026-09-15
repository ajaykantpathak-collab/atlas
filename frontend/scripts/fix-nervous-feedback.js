// Fix NervousSystemSim.tsx feedback section
const fs = require('fs');
const filePath = 'D:\\dream_app\\frontend\\components\\simulations\\c9_12\\NervousSystemSim.tsx';
let content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

// Find and fix the broken feedback section (lines 1112-1141 area)
// Line 1113 (index 1112): broken div className
// Line 1141 (index 1140): broken div className

// Fix line 1113: Replace broken className with proper one
lines[1112] = "                <div className={`p-4 rounded-xl mb-4 text-xs ${feedback.isCorrect ? 'bg-emerald-950/60 border border-emerald-700 text-emerald-200' : 'bg-rose-950/60 border border-rose-700 text-rose-200'}`}>";

// Fix lines 1114-1116: Remove broken leftover
lines[1113] = "                  <p className=\"font-bold text-sm\">{feedback.message}</p>";
lines[1114] = "                  {feedback.misconception && <p className=\"mt-2 text-rose-300\">{feedback.misconception}</p>}";
lines[1115] = "                  {q.working && <p className=\"mt-2 text-slate-300 font-mono\">Working: {q.working}</p>}";

// Remove the duplicated PROGRESSIVE HINT BOX and broken FEEDBACK DISPLAY
// Lines 1118-1138 (indices 1117-1137) are duplicated/broken
// Let me find the exact range to remove

// Find the second "PROGRESSIVE HINT BOX" comment
let secondHintBox = -1;
let secondFeedback = -1;
for (let i = 1117; i < lines.length; i++) {
  if (lines[i].includes('PROGRESSIVE HINT BOX') && secondHintBox === -1) {
    secondHintBox = i;
  }
  if (lines[i].includes('FEEDBACK DISPLAY') && i > 1117 && secondFeedback === -1) {
    secondFeedback = i;
  }
}

console.log('Second PROGRESSIVE HINT BOX at index:', secondHintBox);
console.log('Second FEEDBACK DISPLAY at index:', secondFeedback);

// Remove the duplicated hint box and broken feedback (indices 1117 to secondFeedback-1)
if (secondHintBox >= 0 && secondFeedback >= 0) {
  // Remove from secondHintBox-1 (the comment line before) to secondFeedback-1
  const removeStart = secondHintBox - 1;  // The comment line
  const removeEnd = secondFeedback;       // Up to but not including the second FEEDBACK DISPLAY
  
  console.log('Removing lines', removeStart + 1, 'to', removeEnd);
  lines.splice(removeStart, removeEnd - removeStart);
}

// Now fix the second FEEDBACK DISPLAY (which is now at a different index)
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('className={p - 4}')) {
    console.log('Found broken className at line', i + 1, ':', lines[i].substring(0, 100));
    lines[i] = "              {feedback && (<div className={`p-4 rounded-xl mb-4 text-xs ${feedback.isCorrect ? 'bg-emerald-950/60 border border-emerald-700 text-emerald-200' : 'bg-rose-950/60 border border-rose-700 text-rose-200'}`}>";
    break;
  }
}

fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
console.log('Fixed feedback section');
