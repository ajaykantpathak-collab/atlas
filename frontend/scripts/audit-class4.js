const fs = require('fs');
const path = require('path');
const dir = 'D:\\dream_app\\frontend\\components\\simulations\\class4';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));
for (const f of files) {
  const c = fs.readFileSync(path.join(dir, f), 'utf8');
  const lc = c.split('\n').length;
  const checks = {
    '1.SVG gradient': /<linearGradient|<radialGradient/.test(c),
    '2.Custom SVG objects': /function\s+\w+Icon\s*\(/.test(c),
    '3.Unique mascot': /mascotMood/.test(c) && !/OwlMascot/.test(c),
    '4.Draggable': /import.*Draggable.*from.*sim-primitives\/Draggable/.test(c) && /<Draggable/.test(c),
    '5.5 slides': (c.match(/emoji:\s*['"]/g) || []).length >= 5,
    '6.8 challenges': (c.match(/question:\s*['"]/g) || []).length >= 8,
    '7.Misconception': /misconception/.test(c),
    '8.All 4 feedback': /Confetti/.test(c) && /SuccessBanner/.test(c) && /HintBubble/.test(c) && /SparkleBurst/.test(c),
    '9.audio+speech': /audioManager/.test(c) && /speechManager/.test(c),
    '10.600+ lines': lc >= 600,
    '11.No any type': !/:\s*any\b|<any>|as any|any\[\]/.test(c),
    '12.onComplete': /onComplete\?:\s*\(score:\s*number\)\s*=>\s*void/.test(c) && /onComplete\(finalScore\)/.test(c),
    '13.10000ms': /10000/.test(c),
    '14.Progressive': /identify/.test(c) && /sort/.test(c),
  };
  const p = Object.entries(checks).filter(([k, v]) => v).length;
  const fl = Object.entries(checks).filter(([k, v]) => !v).map(([k]) => k);
  console.log(f + ': ' + p + '/14 (' + lc + ' lines)' + (fl.length ? ' FAIL: ' + fl.join(', ') : ' ALL PASS'));
}
