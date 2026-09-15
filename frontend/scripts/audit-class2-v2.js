// Deep logic audit v2 - broader patterns to catch real issues only
const fs = require('fs');
const path = require('path');

const dir = 'D:\\dream_app\\frontend\\components\\simulations\\class2';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx')).sort();

let realIssues = 0;

for (const file of files) {
  const fullPath = path.join(dir, file);
  const content = fs.readFileSync(fullPath, 'utf-8');
  const lines = content.split('\n').length;
  const name = file.replace('.tsx', '');
  const issues = [];

  // ── Teaching slides ──
  // Check for any teaching screen function (may be named differently)
  const hasTeaching = content.match(/function\s+\w*(Teach|Slide|Intro|Start)\w*\s*\(/) || 
                      content.match(/TEACHING_SLIDES/) ||
                      content.match(/screen.*===.*teach|screen.*===.*'teach/);
  if (!hasTeaching) issues.push('No teaching screen/slides found');

  // Check slide count via title: pattern
  const slideCount = (content.match(/title:\s*'/g) || []).length;
  if (slideCount < 5) issues.push(`Only ${slideCount} slide titles (need 5)`);

  // ── Challenges ──
  const qCount = (content.match(/question:\s*'/g) || []).length;
  if (qCount < 8) issues.push(`Only ${qCount} challenges (need 8)`);

  // Check for challenge progression state (broad match)
  const hasChallengeState = content.match(/challengeIdx|challengeIndex|currentChallenge|currentQ|questionIdx|step|round|puzzle/) ;
  if (!hasChallengeState) issues.push('No challenge progression state');

  // Check for answer handling
  const hasAnswerHandler = content.match(/handleAnswer|handleOption|handleSelect|handleClick|onAnswer|checkAnswer|handleChoose/);
  if (!hasAnswerHandler) issues.push('No answer handler function');

  // Check for correct/incorrect check
  const hasCorrectCheck = content.match(/isCorrect|===.*answer|selected.*===|correct.*===|option.*===|===.*correct/);
  if (!hasCorrectCheck) issues.push('No correct answer check');

  // Check for error tracking
  const hasErrorTracking = content.match(/setErrors|errors\s*[+\-]|errorCount|wrongCount|mistake/);
  if (!hasErrorTracking) issues.push('No error tracking');

  // ── Drag-and-drop ──
  const hasDragStart = content.match(/handleDragStart|onDragStart|dragStart/);
  if (!hasDragStart) issues.push('No drag start handler');
  const hasDragEnd = content.match(/handleDragEnd|onDragEnd|dragEnd/);
  if (!hasDragEnd) issues.push('No drag end handler');
  const hasBinCheck = content.match(/correctBin|bin.*correct|checkBin|handleDrop|correct.*bin/);
  if (!hasBinCheck) issues.push('No bin correctness check');
  const hasSortComplete = content.match(/allPlaced|every.*placed|sortComplete|allCorrect|allSorted|every.*correct/);
  if (!hasSortComplete) issues.push('No sort completion check');

  // ── Completion callback ──
  const hasOnCompleteCall = content.match(/onComplete\??\(/);
  if (!hasOnCompleteCall) issues.push('onComplete not called');
  const hasFinalScore = content.match(/finalScore|Math\.max\(0.*100|100\s*-\s*errors|100\s*-\s*\w+\s*\*\s*5/);
  if (!hasFinalScore) issues.push('No final score calculation');
  const hasAllDone = content.match(/CHALLENGES\.length|>=.*length|===.*length|length\s*-\s*1/);
  if (!hasAllDone) issues.push('No all-challenges-done check');

  // ── Auto-hint ──
  const hasHintTimer = content.match(/hintTimer|inactivityTimer|useRef.*[Tt]imer|setTimeout.*hint|10000|10\s*\*\s*1000|inactivity/);
  if (!hasHintTimer) issues.push('No auto-hint timer');
  const hasTimerCleanup = content.match(/clearTimeout|clearInterval/);
  if (!hasTimerCleanup) issues.push('No timer cleanup');

  // ── Feedback components (check actual JSX rendering) ──
  if (!content.includes('<Confetti')) issues.push('Confetti not rendered');
  if (!content.includes('<SuccessBanner')) issues.push('SuccessBanner not rendered');
  if (!content.includes('<SparkleBurst')) issues.push('SparkleBurst not rendered');
  if (!content.includes('<HintBubble')) issues.push('HintBubble not rendered');

  // ── Feedback props ──
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

  // ── Critical checks ──
  if (content.includes('speechManager')) issues.push('speechManager used (FORBIDDEN)');
  if (!content.startsWith("'use client'") && !content.startsWith('"use client"')) issues.push("Missing 'use client'");
  if (content.match(/sortItems\?\.i[^.]/)) issues.push('sortItems?.i bug (CRITICAL)');
  if (content.includes('GameScreen') && !content.includes('type GameScreen')) issues.push('GameScreen type not defined');
  if (content.includes('OwlMascot')) issues.push('Uses OwlMascot (should be unique)');
  if (!content.includes('linearGradient') && !content.includes('radialGradient')) issues.push('No SVG gradient');
  if (!content.includes('Draggable')) issues.push('Draggable not used');
  if (!content.includes('audioManager')) issues.push('audioManager not used');

  // Print results
  if (issues.length === 0) {
    console.log(`PASS  ${name} (${lines} lines)`);
  } else {
    console.log(`FAIL  ${name} (${lines} lines) — ${issues.length} issues:`);
    for (const i of issues) console.log(`        - ${i}`);
    realIssues += issues.length;
  }
}

console.log(`\n=== SUMMARY ===`);
console.log(`Games: ${files.length} | Real issues: ${realIssues}`);
