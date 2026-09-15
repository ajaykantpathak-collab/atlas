// Audit all Class 3 games for the 14-point checklist
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

  const checks = [];

  // CHECK 1: SVG gradient
  checks.push(['SVG gradient', /linearGradient|radialGradient/.test(content)]);

  // CHECK 2: Custom SVG objects (function ...Icon or const ...Icon = )
  const svgObjCount = (content.match(/function\s+\w+Icon|const\s+\w+Icon\s*=/g) || []).length;
  checks.push(['SVG objects (5+)', svgObjCount >= 5]);

  // CHECK 3: Unique mascot (not OwlMascot)
  const hasOwl = /OwlMascot/.test(content);
  const mascotCount = (content.match(/function\s+\w+(Mascot|Guide|Wizard|Keeper|Chef|Artist|Detective|Sailor|Captain|Ranger|Navigator|Explorer|Skywatcher|Surveyor|Shopkeeper|Gardener|Timekeeper|Number\s|Solar|Conservationist|Village)/g) || []).length;
  checks.push(['Unique mascot', !hasOwl && mascotCount >= 1]);

  // CHECK 4: Draggable
  checks.push(['Draggable import', /import.*Draggable.*from.*sim-primitives\/Draggable/.test(content)]);
  checks.push(['Draggable usage', /<Draggable/.test(content)]);

  // CHECK 5: 5 teaching slides
  const slideMatches = content.match(/title:\s*['"`].*?['"`],\s*\n\s*text:\s*['"`]/gs) || [];
  checks.push(['5+ teaching slides', slideMatches.length >= 5]);

  // CHECK 6: 8 challenges - count question fields
  const questionCount = (content.match(/question:\s*['"`]/g) || []).length;
  checks.push(['8 challenges', questionCount >= 8]);

  // CHECK 7: Misconception feedback
  const misconceptionCount = (content.match(/misconception:\s*['"`]/g) || []).length;
  checks.push(['Misconception feedback', misconceptionCount >= 5]);

  // CHECK 8: Feedback components
  checks.push(['Confetti import', /Confetti/.test(content)]);
  checks.push(['SuccessBanner import', /SuccessBanner/.test(content)]);
  checks.push(['HintBubble import', /HintBubble/.test(content)]);
  checks.push(['SparkleBurst import', /SparkleBurst/.test(content)]);

  // CHECK 9: Audio and speech
  checks.push(['audioManager', /audioManager/.test(content)]);
  checks.push(['speechManager', /speechManager/.test(content)]);
  checks.push(['speechManager.speak', /speechManager\.speak/.test(content)]);
  checks.push(['audioManager.play', /audioManager\.play/.test(content)]);

  // CHECK 10: 600+ lines
  checks.push(['600+ lines', lines >= 600]);

  // CHECK 12: onComplete
  checks.push(['onComplete prop', /onComplete\?:?\s*\(?\s*score/.test(content)]);
  checks.push(['onComplete call', /onComplete\(.*score|onComplete\(.*finalScore/.test(content)]);

  // CHECK 13: Auto-hint timer
  checks.push(['useRef timer', /useRef.*[Tt]imer|inactivityTimer|hintTimer/.test(content)]);

  // CHECK: Named export matching filename
  checks.push(['Named export', new RegExp(`export function ${name}|export const ${name}`).test(content)]);

  // CHECK: 'use client'
  checks.push(["'use client'", /['"]use client['"]/.test(content)]);

  const failedChecks = checks.filter(c => !c[1]);
  if (failedChecks.length === 0) {
    pass++;
    console.log(`PASS ${name} (${lines} lines)`);
  } else {
    fail++;
    failures.push({ name, lines, failedChecks });
    console.log(`FAIL ${name} (${lines} lines): ${failedChecks.map(c => c[0]).join(', ')}`);
  }
}

console.log(`\n=== SUMMARY ===`);
console.log(`Pass: ${pass}/${files.length}`);
console.log(`Fail: ${fail}/${files.length}`);
if (failures.length > 0) {
  console.log(`\nFailed games:`);
  failures.forEach(f => {
    console.log(`  ${f.name} (${f.lines} lines):`);
    f.failedChecks.forEach(c => console.log(`    - ${c[0]}`));
  });
}
