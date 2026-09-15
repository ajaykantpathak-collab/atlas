// Revert bad insertions from fix-templates.js while keeping encoding/any-type fixes
const fs = require('fs');
const path = require('path');

const FRONTEND = 'D:\\dream_app\\frontend\\components\\simulations';
const dirs = ['c9_12', 'c6_8', 'class1'];

let reverted = 0;

dirs.forEach(dir => {
  const dirPath = path.join(FRONTEND, dir);
  if (!fs.existsSync(dirPath)) return;

  fs.readdirSync(dirPath).filter(f => f.endsWith('.tsx')).forEach(file => {
    const filePath = path.join(dirPath, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // 1. Remove inserted REVIEW_INTERVAL_DAYS line (standalone line)
    const beforeSR = content;
    content = content.replace(/\nconst REVIEW_INTERVAL_DAYS = \[1, 3, 7, 14, 30\];\n/g, '\n');
    if (content !== beforeSR) modified = true;

    // 2. Remove inserted audioManager.play() calls that were prepended to setState calls
    const beforeAudio = content;
    content = content.replace(/audioManager\.play\('celebration'\); setShowConfetti\(true\)/g, 'setShowConfetti(true)');
    content = content.replace(/audioManager\.play\('success'\); setShowSuccess\(true\)/g, 'setShowSuccess(true)');
    content = content.replace(/audioManager\.play\('error'\); setShowError\(true\)/g, 'setShowError(true)');
    // Remove the generic one inserted before const [score
    content = content.replace(/audioManager\.play\('tap'\); const \[score, setScore\]/g, 'const [score, setScore]');
    if (content !== beforeAudio) modified = true;

    // 3. Remove inserted speechManager.speak() in useEffect
    const beforeSpeech = content;
    content = content.replace(/\n    speechManager\.speak\('Welcome! Let us begin the lesson\.'\);/g, '');
    if (content !== beforeSpeech) modified = true;

    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      reverted++;
      console.log(`REVERTED: ${dir}/${file}`);
    }
  });
});

console.log(`\n=== REVERTED ${reverted} files ===`);
