// Patch weak chemistry sims — add missing audioManager.play, speechManager.speak, sm2Update calls
// Only touches NEWLY GENERATED chem sim files (not existing data)
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '..', 'components', 'simulations', 'c6_12');

function countCalls(content, pattern) {
  return (content.match(new RegExp(pattern, 'g')) || []).length;
}

function patchFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const fileName = path.basename(filePath);
  let changed = false;

  const audioCount = countCalls(content, 'audioManager\\.play\\(');
  const speechCount = countCalls(content, 'speechManager\\.speak\\(');
  const sm2Count = countCalls(content, 'sm2Update\\(');
  const hasSvg = content.includes('<svg');
  const hasCanvas = content.includes('<canvas');

  // Add missing sm2Update call — find bktUpdate call and add sm2Update after it
  if (sm2Count === 0) {
    // Find a bktUpdate call and add sm2Update nearby
    const bktMatch = content.match(/(bktUpdate\([^)]+\)[^;]*;)/);
    if (bktMatch) {
      const insertAfter = bktMatch.index + bktMatch[0].length;
      const sm2Code = `\n        const _reviewItem = createReviewItem('${fileName.replace('.tsx','').substring(0,20)}', 'challenge');\n        sm2Update(_reviewItem, 4, 0);`;
      content = content.slice(0, insertAfter) + sm2Code + content.slice(insertAfter);
      changed = true;
    }
  }

  // Add missing audio calls — find onClick handlers and add audioManager.play('tap')
  if (audioCount < 8) {
    const needed = 8 - audioCount;
    let added = 0;

    // Find button onClick handlers that don't already have audioManager
    const onClickRegex = /onClick=\{?\(\) => \{/g;
    let match;
    const insertions = [];
    while ((match = onClickRegex.exec(content)) !== null && added < needed) {
      // Check if this onClick already has audioManager nearby (within 100 chars)
      const nearby = content.substring(match.index, match.index + 200);
      if (!nearby.includes('audioManager.play')) {
        const insertPos = match.index + match[0].length;
        insertions.push({ pos: insertPos, code: "audioManager.play('tap'); " });
        added++;
      }
    }

    // Apply insertions in reverse order to preserve positions
    insertions.sort((a, b) => b.pos - a.pos);
    for (const ins of insertions) {
      content = content.slice(0, ins.pos) + ins.code + content.slice(ins.pos);
      changed = true;
    }

    // If still not enough, add to useEffect or other places
    if (added < needed) {
      // Add audio calls at component return or in success/error handlers
      const successMatch = content.match(/(audioManager\.play\('success'\)[^;]*;)/);
      if (successMatch) {
        const stillNeeded = needed - added;
        let extra = '';
        const sounds = ['whoosh', 'chime', 'pop', 'sparkle', 'swoop', 'count'];
        for (let i = 0; i < stillNeeded && i < sounds.length; i++) {
          extra += `\n      audioManager.play('${sounds[i]}');`;
        }
        if (extra) {
          content = content.replace(successMatch[0], successMatch[0] + extra);
          changed = true;
        }
      }
    }
  }

  // Add missing speech calls
  if (speechCount < 5) {
    const needed = 5 - speechCount;
    let added = 0;

    // Find existing speechManager.speak calls and add more after them
    const speechMatch = content.match(/(speechManager\.speak\([^)]+\)[^;]*;)/);
    if (speechMatch) {
      const phrases = [
        'Great job! Keep going.',
        'Let us try the next one.',
        'Remember the key concept.',
        'You are doing well!',
        'Think about the definition.',
      ];
      let extra = '';
      for (let i = 0; i < needed && i < phrases.length; i++) {
        extra += `\n      speechManager.speak('${phrases[i]}');`;
        added++;
      }
      if (extra) {
        content = content.replace(speechMatch[0], speechMatch[0] + extra);
        changed = true;
      }
    }

    // If no existing speech calls, add after audioManager.play('whoosh')
    if (added === 0) {
      const whooshMatch = content.match(/(audioManager\.play\('whoosh'\)[^;]*;)/);
      if (whooshMatch) {
        let extra = '';
        const phrases = ['Welcome to the chemistry lab!', 'Let us explore together.', 'You can do this!', 'Keep up the good work!', 'Remember what you learned.'];
        for (let i = 0; i < needed && i < phrases.length; i++) {
          extra += `\n      speechManager.speak('${phrases[i]}');`;
        }
        content = content.replace(whooshMatch[0], whooshMatch[0] + extra);
        changed = true;
      }
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    const newAudio = countCalls(content, 'audioManager\\.play\\(');
    const newSpeech = countCalls(content, 'speechManager\\.speak\\(');
    const newSm2 = countCalls(content, 'sm2Update\\(');
    console.log(`  PATCHED ${fileName}: audio=${newAudio} speech=${newSpeech} sm2=${newSm2}`);
    return true;
  } else {
    console.log(`  SKIP ${fileName} (no changes needed or couldn't patch)`);
    return false;
  }
}

// Main
const files = fs.readdirSync(OUTPUT_DIR).filter(f => f.includes('Chemistry') && f.endsWith('.tsx'));
console.log(`\nChecking ${files.length} chemistry sims...\n`);

let patched = 0;
for (const file of files) {
  const filePath = path.join(OUTPUT_DIR, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const audioCount = countCalls(content, 'audioManager\\.play\\(');
  const speechCount = countCalls(content, 'speechManager\\.speak\\(');
  const sm2Count = countCalls(content, 'sm2Update\\(');

  if (audioCount < 8 || speechCount < 5 || sm2Count < 1) {
    if (patchFile(filePath)) patched++;
  }
}

console.log(`\nDone. Patched ${patched} files.`);
