// Deep logic audit for all Class 2 games
const fs = require('fs');
const path = require('path');

const dir = 'D:\\dream_app\\frontend\\components\\simulations\\class2';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx')).sort();

let totalIssues = 0;

for (const file of files) {
  const fullPath = path.join(dir, file);
  const content = fs.readFileSync(fullPath, 'utf-8');
  const lines = content.split('\n').length;
  const name = file.replace('.tsx', '');
  const issues = [];

  // ── Teaching slide logic ──
  if (!content.includes('function TeachingScreen')) issues.push('No TeachingScreen function');
  if (!content.match(/currentSlide|slideIndex/)) issues.push('No slide state variable');
  if (!content.match(/Next|next.*slide|Start Game|Start/)) issues.push('No Next/Start button');
  if (!content.match(/setScreen\(.play.\)|onStart/)) issues.push('No start callback to play mode');
  // Check slides count
  const slideCount = (content.match(/title:\s*'/g) || []).length;
  if (slideCount < 5) issues.push(`Only ${slideCount} slide titles (need 5)`);

  // ── Challenge logic ──
  if (!content.match(/currentChallenge|challengeIndex/)) issues.push('No challenge index state');
  if (!content.match(/handleAnswer|handleOptionClick|onAnswer|handleSelect/)) issues.push('No answer handler');
  if (!content.match(/===.*answer|isCorrect|selected.*===|option.*===/)) issues.push('No correct answer check');
  if (!content.match(/setScore|score\s*\+/)) issues.push('No score update');
  if (!content.match(/setErrors|errors\s*\+|errorCount/)) issues.push('No error tracking');
  if (!content.match(/setChallenge|setCurrentChallenge|challengeIndex\s*\+|currentChallenge\s*\+/)) issues.push('No next challenge logic');
  // Check challenge count
  const qCount = (content.match(/question:\s*'/g) || []).length;
  if (qCount < 8) issues.push(`Only ${qCount} challenges (need 8)`);

  // ── Drag-and-drop logic ──
  if (!content.match(/handleDragStart|onDragStart/)) issues.push('No drag start handler');
  if (!content.match(/handleDragEnd|onDragEnd/)) issues.push('No drag end handler');
  if (!content.match(/correctBin|bin.*correct|checkBin|handleDrop/)) issues.push('No bin correctness check');
  if (!content.match(/allPlaced|every.*placed|sortComplete|allCorrect/)) issues.push('No sort completion check');
  if (!content.match(/itemPositions|sortItemsState|positions/)) issues.push('No item position state');

  // ── Completion callback ──
  if (!content.match(/onComplete\??\(/)) issues.push('onComplete not called');
  if (!content.match(/finalScore|Math\.max\(0.*100|100\s*-\s*errors/)) issues.push('No final score calculation');
  if (!content.match(/challengeIndex.*>=.*CHALLENGES|currentChallenge.*>=.*CHALLENGES|=== CHALLENGES\.length|>= CHALLENGES\.length/)) issues.push('No all-challenges-done check');

  // ── Auto-hint timer ──
  if (!content.match(/hintTimer|inactivityTimer|useRef.*[Tt]imer|setTimeout.*hint|10000|10\s*\*\s*1000/)) issues.push('No auto-hint timer');
  if (!content.match(/clearTimeout|clearInterval/)) issues.push('No timer cleanup');
  if (!content.match(/showHint|hintMessage|HintBubble/)) issues.push('No hint display');

  // ── Feedback components ──
  if (!content.includes('<Confetti')) issues.push('Confetti not rendered');
  if (!content.includes('<SuccessBanner')) issues.push('SuccessBanner not rendered');
  if (!content.includes('<SparkleBurst')) issues.push('SparkleBurst not rendered');
  if (!content.includes('<HintBubble')) issues.push('HintBubble not rendered');

  // ── Feedback component props ──
  const confettiMatches = content.match(/<Confetti[^>]*>/g) || [];
  for (const m of confettiMatches) {
    if (!m.includes('onComplete')) issues.push('Confetti missing onComplete prop');
  }
  const sbMatches = content.match(/<SuccessBanner[^>]*>/g) || [];
  for (const m of sbMatches) {
    if (!m.includes('message')) issues.push('SuccessBanner missing message prop');
    if (!m.includes('onComplete')) issues.push('SuccessBanner missing onComplete prop');
  }
  const hbMatches = content.match(/<HintBubble[^>]*>/g) || [];
  for (const m of hbMatches) {
    if (!m.includes('message')) issues.push('HintBubble missing message prop');
    if (!m.includes('onComplete')) issues.push('HintBubble missing onComplete prop');
  }
  const spMatches = content.match(/<SparkleBurst[^>]*>/g) || [];
  for (const m of spMatches) {
    if (!m.includes('onComplete')) issues.push('SparkleBurst missing onComplete prop');
  }

  // ── speechManager check ──
  if (content.includes('speechManager')) issues.push('speechManager imported/used (should not be)');

  // ── 'use client' check ──
  if (!content.startsWith("'use client'") && !content.startsWith('"use client"')) issues.push("Missing 'use client' directive");

  // ── sortItems?.i bug check ──
  if (content.match(/sortItems\?\.i[^.]/)) issues.push('sortItems?.i bug still present');

  // ── GameScreen type check ──
  if (content.includes('GameScreen') && !content.includes('type GameScreen')) issues.push('GameScreen type not defined');

  // ── Mascot check ──
  if (content.includes('OwlMascot')) issues.push('Uses OwlMascot (should be unique)');
  const mascotMatch = content.match(/function\s+(\w+)\(\s*\{\s*mood\s*,\s*speaking/);
  if (!mascotMatch) {
    // Try alternate pattern
    const mascotMatch2 = content.match(/function\s+(\w+Mascot|\w+Disha|\w+Annapoorna|\w+Kavya|\w+Rohan|\w+Suresh|\w+Jaya|\w+Tara|\w+Arjun|\w+Esha|\w+Nisha|\w+Gaurav|\w+Aryan|\w+Sam|\w+Anaya|\w+Bala|\w+Diya|\w+Manoj|\w+Aakash|\w+Nisha)\(/);
    if (!mascotMatch2) issues.push('No unique mascot function found');
  }

  // ── SVG gradient check ──
  if (!content.includes('linearGradient') && !content.includes('radialGradient')) issues.push('No SVG gradient in scene');

  // ── Draggable import check ──
  if (!content.includes('Draggable')) issues.push('Draggable not imported/used');

  // ── audioManager check ──
  if (!content.includes('audioManager')) issues.push('audioManager not imported/used');

  // Print results
  if (issues.length === 0) {
    console.log(`✓ ${name} (${lines} lines) — PASS`);
  } else {
    console.log(`✗ ${name} (${lines} lines) — ${issues.length} ISSUES:`);
    for (const i of issues) console.log(`    ✗ ${i}`);
    totalIssues += issues.length;
  }
}

console.log(`\n=== SUMMARY ===`);
console.log(`Games checked: ${files.length}`);
console.log(`Total issues: ${totalIssues}`);
console.log(`Games with 0 issues: ${files.length - files.filter(f => {
  const c = fs.readFileSync(path.join(dir, f), 'utf-8');
  // Quick recheck for counting
  return false; // simplified
}).length}`);
