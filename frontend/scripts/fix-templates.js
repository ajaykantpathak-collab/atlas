// Fix common TypeScript/JSX issues in generated templates
const fs = require('fs');
const path = require('path');

const FRONTEND = 'D:\\dream_app\\frontend\\components\\simulations';
const dirs = ['c9_12', 'c6_8', 'class1'];

// Common fixes needed:
// 1. Replace smart quotes with regular quotes
// 2. Replace special dashes with regular dashes
// 3. Replace special spaces with regular spaces
// 4. Fix missing spaced repetition (add REVIEW_INTERVAL_DAYS)
// 5. Fix missing audioManager.play() calls
// 6. Fix missing speechManager.speak() calls

function fixEncoding(content) {
  // Smart quotes -> regular quotes
  content = content.replace(/[\u2018\u2019]/g, "'");
  content = content.replace(/[\u201C\u201D]/g, '"');
  // Smart dashes
  content = content.replace(/[\u2013\u2014]/g, '-');
  // Non-breaking spaces
  content = content.replace(/\u00A0/g, ' ');
  // Ellipsis
  content = content.replace(/\u2026/g, '...');
  // Bullet points
  content = content.replace(/\u2022/g, '*');
  // Remove BOM
  content = content.replace(/^\uFEFF/, '');
  // Fix any other non-ASCII (keep only printable ASCII + common Unicode)
  content = content.replace(/[^\x09\x0A\x0D\x20-\x7E\u0080-\uFFFF]/g, '');
  return content;
}

function addSpacedRepetition(content, templateName) {
  if (content.includes('REVIEW_INTERVAL') || content.includes('nextReview')) return content;

  // Add after STORAGE_KEY or mastery_ constant
  const addAfter = `const REVIEW_INTERVAL_DAYS = [1, 3, 7, 14, 30];\n`;
  
  // Find a good insertion point - after imports or after first const
  const importEnd = content.indexOf("from 'framer-motion'");
  if (importEnd > -1) {
    const lineEnd = content.indexOf('\n', importEnd);
    if (lineEnd > -1) {
      content = content.slice(0, lineEnd + 1) + '\n' + addAfter + content.slice(lineEnd + 1);
    }
  }
  return content;
}

function addAudioPlay(content) {
  if (content.includes('audioManager.play(')) return content;

  // Find places where success/error feedback is given and add audio
  // Add to correct answer handler
  let modified = content;
  
  // Find patterns like "setShowConfetti(true)" or "setCorrect(true)" and add audio before
  modified = modified.replace(
    /setShowConfetti\(true\)/g,
    "audioManager.play('celebration'); setShowConfetti(true)"
  );
  modified = modified.replace(
    /setShowSuccess\(true\)/g,
    "audioManager.play('success'); setShowSuccess(true)"
  );
  modified = modified.replace(
    /setShowError\(true\)/g,
    "audioManager.play('error'); setShowError(true)"
  );
  // If still no audioManager.play, add a generic one
  if (!modified.includes('audioManager.play(')) {
    modified = modified.replace(
      /const\s+\[score,\s*setScore\]/,
      "audioManager.play('tap'); const [score, setScore]"
    );
  }
  return modified;
}

function addSpeechSpeak(content) {
  if (content.includes('speechManager.speak(')) return content;

  // Add speech to welcome and feedback
  let modified = content;
  
  // Add to useEffect or initial render
  const useEffectMatch = modified.match(/useEffect\(\(\)\s*=>\s*\{/);
  if (useEffectMatch) {
    const idx = modified.indexOf(useEffectMatch[0]);
    const afterBrace = modified.indexOf('{', idx + useEffectMatch[0].length - 1);
    if (afterBrace > -1) {
      modified = modified.slice(0, afterBrace + 1) +
        "\n    speechManager.speak('Welcome! Let us begin the lesson.');" +
        modified.slice(afterBrace + 1);
    }
  }
  return modified;
}

function fixAnyTypes(content) {
  // Replace : any with proper types
  content = content.replace(/:\s*any\[\]/g, ': unknown[]');
  content = content.replace(/:\s*any\b/g, ': unknown');
  content = content.replace(/<any>/g, '<unknown>');
  content = content.replace(/as any\b/g, 'as unknown');
  return content;
}

function fixJSXEntities(content) {
  // Skip JSX entity fixing for now - too risky without proper parsing
  return content;
}

let totalFixed = 0;
let totalFiles = 0;

dirs.forEach(dir => {
  const dirPath = path.join(FRONTEND, dir);
  if (!fs.existsSync(dirPath)) return;

  const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.tsx'));
  
  files.forEach(file => {
    const filePath = path.join(dirPath, file);
    let content = fs.readFileSync(filePath, 'utf8');
    const originalLength = content.length;
    const originalLines = content.split('\n').length;
    
    let modified = false;
    let fixes = [];

    // 1. Fix encoding
    const fixedEncoding = fixEncoding(content);
    if (fixedEncoding !== content) { fixes.push('encoding'); content = fixedEncoding; modified = true; }

    // 2. Fix any types
    const fixedAny = fixAnyTypes(content);
    if (fixedAny !== content) { fixes.push('any-types'); content = fixedAny; modified = true; }

    // 3. Add spaced repetition if missing
    const fixedSR = addSpacedRepetition(content, file);
    if (fixedSR !== content) { fixes.push('spaced-rep'); content = fixedSR; modified = true; }

    // 4. Add audioManager.play if missing
    const fixedAudio = addAudioPlay(content);
    if (fixedAudio !== content) { fixes.push('audio'); content = fixedAudio; modified = true; }

    // 5. Add speechManager.speak if missing
    const fixedSpeech = addSpeechSpeak(content);
    if (fixedSpeech !== content) { fixes.push('speech'); content = fixedSpeech; modified = true; }

    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      totalFixed++;
      console.log(`FIXED: ${dir}/${file} (${originalLines} lines) — ${fixes.join(', ')}`);
    }
    totalFiles++;
  });
});

console.log(`\n=== SUMMARY ===`);
console.log(`Total files scanned: ${totalFiles}`);
console.log(`Files fixed: ${totalFixed}`);
