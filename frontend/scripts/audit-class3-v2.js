// Comprehensive audit for all Class 3 games — 14-point checklist
const fs = require('fs');
const path = require('path');

const dir = 'D:\\dream_app\\frontend\\components\\simulations\\class3';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx')).sort();

let pass = 0, fail = 0;
const failures = [];

for (const file of files) {
  const fp = path.join(dir, file);
  const content = fs.readFileSync(fp, 'utf8');
  const lines = content.split('\n').length;
  const name = file.replace('.tsx', '');
  const failed = [];

  // CHECK 1: SVG gradient
  if (!/linearGradient|radialGradient/.test(content)) failed.push('SVG gradient');

  // CHECK 2: Custom SVG objects (5+)
  const svgCount = (content.match(/function\s+\w+Icon|const\s+\w+Icon\s*=/g) || []).length;
  if (svgCount < 5) failed.push(`SVG objects (${svgCount})`);

  // CHECK 3: Unique mascot — not OwlMascot, has mood states, has speech
  const hasOwl = /OwlMascot/.test(content);
  const hasMood = /mascotMood.*happy.*celebrate.*thinking|mood.*['"]happy['"].*['"]celebrate['"].*['"]thinking['"]/.test(content);
  const hasSpeech = /speaking=\{|speechBubble|SpeechBubble/.test(content);
  if (hasOwl || !hasMood || !hasSpeech) failed.push(`Mascot (owl=${hasOwl}, mood=${hasMood}, speech=${hasSpeech})`);

  // CHECK 4: Draggable
  if (!/import.*Draggable.*from.*sim-primitives\/Draggable/.test(content)) failed.push('Draggable import');
  if (!/<Draggable/.test(content)) failed.push('Draggable usage');

  // CHECK 5: 5+ teaching slides
  const slideCount = (content.match(/title:\s*['"`].*?['"`],\s*\n\s*text:\s*['"`].*?['"`],\s*\n\s*emoji:/gs) || []).length;
  if (slideCount < 5) failed.push(`Teaching slides (${slideCount})`);

  // CHECK 6: 8 challenges
  const qCount = (content.match(/question:\s*['"`]/g) || []).length;
  if (qCount < 8) failed.push(`Challenges (${qCount})`);

  // CHECK 7: Misconception feedback
  const miscCount = (content.match(/misconception:\s*['"`]/g) || []).length;
  if (miscCount < 5) failed.push(`Misconception (${miscCount})`);

  // CHECK 8: Feedback components
  if (!/Confetti/.test(content)) failed.push('Confetti');
  if (!/SuccessBanner/.test(content)) failed.push('SuccessBanner');
  if (!/HintBubble/.test(content)) failed.push('HintBubble');
  if (!/SparkleBurst/.test(content)) failed.push('SparkleBurst');

  // CHECK 9: Audio and speech
  if (!/audioManager/.test(content)) failed.push('audioManager');
  if (!/speechManager/.test(content)) failed.push('speechManager');
  if (!/speechManager\.speak/.test(content)) failed.push('speechManager.speak');
  if (!/audioManager\.play/.test(content)) failed.push('audioManager.play');

  // CHECK 10: 600+ lines
  if (lines < 600) failed.push(`Lines (${lines})`);

  // CHECK 12: onComplete
  if (!/onComplete\?:?\s*\(?\s*score/.test(content)) failed.push('onComplete prop');
  if (!/onComplete\(.*(?:score|finalScore)/.test(content)) failed.push('onComplete call');

  // CHECK 13: Auto-hint timer
  const hasTimer = /useRef.*[Tt]imer|inactivityTimer|hintTimer|setTimeout.*hint|inactivityRef|inactivityTimerRef/.test(content);
  if (!hasTimer) failed.push('Auto-hint timer');

  // CHECK: Named export
  const exportRegex = new RegExp(`export function ${name}|export const ${name}`);
  if (!exportRegex.test(content)) failed.push('Named export');

  // CHECK: 'use client'
  if (!/['"]use client['"]/.test(content)) failed.push('use client');

  if (failed.length === 0) {
    pass++;
    console.log(`PASS ${name} (${lines} lines)`);
  } else {
    fail++;
    failures.push({ name, lines, failed });
    console.log(`FAIL ${name} (${lines} lines): ${failed.join(', ')}`);
  }
}

console.log(`\n=== SUMMARY ===`);
console.log(`Pass: ${pass}/${files.length}`);
console.log(`Fail: ${fail}/${files.length}`);
if (failures.length > 0) {
  console.log(`\nFailed games:`);
  failures.forEach(f => {
    console.log(`  ${f.name} (${f.lines} lines):`);
    f.failed.forEach(c => console.log(`    - ${c}`));
  });
}
