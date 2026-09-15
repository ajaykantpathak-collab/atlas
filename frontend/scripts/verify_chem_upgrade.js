const fs = require('fs');
const files = [
  'D:/platform/frontend/components/simulations/c6_12_chem_upgraded/C6_ChemistryAtomicstructuresubatomicparticlesSim.tsx',
  'D:/platform/frontend/components/simulations/c6_12_chem_upgraded/C6_ChemistryCarbondioxideandnitrogeninairSim.tsx'
];

for (const file of files) {
  const name = file.split('/').pop();
  const code = fs.readFileSync(file, 'utf8');
  const lines = code.split('\n').length;

  const hasSvg = /<svg/.test(code);
  const hasGradient = /linearGradient|radialGradient/.test(code);
  const c1 = hasSvg && hasGradient;

  const svgCount = (code.match(/<svg/g) || []).length;
  const c2 = svgCount >= 2;

  const hasMascot = /mascot|Mascot/i.test(code);
  const c3 = hasMascot;

  const hasDraggable = /Draggable/.test(code);
  const c4 = hasDraggable;

  const hasTeachingSlides = /TEACHING_SLIDES/.test(code);
  const c5 = hasTeachingSlides;

  const challengeCount = (code.match(/type: '(classify|distinguish|match|drag-label|drag-sort|numeric|construct)'/g) || []).length;
  const c6 = challengeCount >= 8;

  const hasMisc = /MISCONCEPTIONS/.test(code);
  const c7 = hasMisc;

  const hasConfetti = /<Confetti/.test(code);
  const hasSuccessBanner = /<SuccessBanner/.test(code);
  const hasHintBubble = /<HintBubble/.test(code);
  const hasSparkleBurst = /<SparkleBurst/.test(code);
  const c8 = hasConfetti && hasSuccessBanner && hasHintBubble && hasSparkleBurst;

  const hasAudio = /audioManager\.play/.test(code);
  const hasSpeech = /speechManager\.speak/.test(code);
  const c9 = hasAudio && hasSpeech;

  const c10 = lines >= 600;

  const noAny = !/:\s*any\b/.test(code);
  const c11 = noAny;

  const hasOnComplete = /onComplete\??\s*:\s*\(?\s*score\s*:\s*number/.test(code);
  const callsOnComplete = /onComplete\s*\(/.test(code);
  const c12 = hasOnComplete && callsOnComplete;

  const hasTimer = /useRef.*timer|setTimeout.*hint|autoHint|auto.hint/i.test(code);
  const c13 = hasTimer;

  const hasFoundation = /foundation/i.test(code);
  const hasStandard = /standard/i.test(code);
  const hasAdvanced = /advanced/i.test(code);
  const c14 = hasFoundation && hasStandard && hasAdvanced;

  console.log('COMPONENT: ' + name);
  console.log('CHECK 1 (SVG scene): ' + (c1?'PASS':'FAIL') + ' — svg:' + hasSvg + ' gradient:' + hasGradient);
  console.log('CHECK 2 (SVG objects): ' + (c2?'PASS':'FAIL') + ' — ' + svgCount + ' SVGs');
  console.log('CHECK 3 (Mascot): ' + (c3?'PASS':'FAIL') + ' — ' + (hasMascot?'present':'missing'));
  console.log('CHECK 4 (Draggable): ' + (c4?'PASS':'FAIL') + ' — ' + (hasDraggable?'present':'missing'));
  console.log('CHECK 5 (5 slides): ' + (c5?'PASS':'FAIL') + ' — TEACHING_SLIDES:' + hasTeachingSlides);
  console.log('CHECK 6 (8+ challenges): ' + (c6?'PASS':'FAIL') + ' — ' + challengeCount + ' challenges');
  console.log('CHECK 7 (Misconception feedback): ' + (c7?'PASS':'FAIL'));
  console.log('CHECK 8 (Feedback components): ' + (c8?'PASS':'FAIL') + ' — C:' + hasConfetti + ' S:' + hasSuccessBanner + ' H:' + hasHintBubble + ' SP:' + hasSparkleBurst);
  console.log('CHECK 9 (Audio/speech): ' + (c9?'PASS':'FAIL') + ' — audio:' + hasAudio + ' speech:' + hasSpeech);
  console.log('CHECK 10 (600+ lines): ' + (c10?'PASS':'FAIL') + ' — ' + lines);
  console.log('CHECK 11 (TypeScript): ' + (c11?'PASS':'FAIL') + ' — noAny:' + noAny);
  console.log('CHECK 12 (onComplete): ' + (c12?'PASS':'FAIL') + ' — inProps:' + hasOnComplete + ' called:' + callsOnComplete);
  console.log('CHECK 13 (Auto-hint): ' + (c13?'PASS':'FAIL') + ' — ' + (hasTimer?'present':'missing'));
  console.log('CHECK 14 (Progressive difficulty): ' + (c14?'PASS':'FAIL') + ' — F:' + hasFoundation + ' S:' + hasStandard + ' A:' + hasAdvanced);

  const passed = [c1,c2,c3,c4,c5,c6,c7,c8,c9,c10,c11,c12,c13,c14].filter(v=>v).length;
  console.log('TOTAL: ' + passed + '/14 passed');
  const verdict = passed >= 13 ? 'APPROVED' : passed >= 12 ? 'FIX SPECIFIC' : 'REDO FROM SCRATCH';
  console.log('VERDICT: ' + verdict);
  console.log('');
}
