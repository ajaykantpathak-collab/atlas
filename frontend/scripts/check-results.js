const fs = require('fs');
const path = require('path');

const files = [
  'C10_AppliedMathsLogicReasoningPropositionsSim',
  'C10_BiologyChromosomeStructurechromatinSim',
  'C10_BiologyCirculatorySystemdetailedSim',
];

for (const id of files) {
  const filePath = path.join('components', 'simulations', 'c6_12', id + '.tsx');
  const code = fs.readFileSync(filePath, 'utf8');
  
  const useClient = code.includes("'use client'") || code.includes('"use client"');
  const allImportsPresent = (code.includes('createReviewItem') || code.includes('sm2Update')) &&
                            (code.includes('createBKTState') || code.includes('bktUpdate')) &&
                            (code.includes('recordGameScore') || code.includes('getNodeMastery')) &&
                            code.includes('SUBJECT_CONFIG') &&
                            (code.includes('audioManager') || code.includes('Confetti') || code.includes('HintBubble'));
  const hasDefaultExport = /export\s+default\s+/.test(code);
  const onCompleteInProps = /onComplete\??\s*:\s*\(?\s*score\s*:\s*number\s*\)?/.test(code);
  const onCompleteCalled = /onComplete\s*\(/.test(code);
  const hasLocalStorage = /localStorage\.(getItem|setItem)/.test(code) || /recordGameScore|getNodeMastery|getNodesNeedingReview/.test(code);
  const bktUsed = /bktUpdate\s*\(/.test(code);
  const srsUsed = /sm2Update\s*\(/.test(code);
  const masteryStored = /recordGameScore\s*\(/.test(code);
  const audioUsed = /audioManager\.play\s*\(/.test(code);
  const speechUsed = /speechManager\.speak\s*\(/.test(code);
  const hasHintBubble = /<HintBubble/.test(code);
  const hasConfetti = /<Confetti/.test(code);
  const hasSuccessBanner = /<SuccessBanner/.test(code);
  const hasSparkleBurst = /<SparkleBurst/.test(code);
  const noAny = !(/:\s*any\b/.test(code) || /as\s+any\b/.test(code));
  
  const structuralPass = useClient && allImportsPresent && hasDefaultExport &&
                         onCompleteInProps && onCompleteCalled &&
                         hasLocalStorage && bktUsed && srsUsed && masteryStored &&
                         audioUsed && speechUsed &&
                         hasHintBubble && hasConfetti && hasSuccessBanner && hasSparkleBurst;
  
  const svgCount = (code.match(/<svg/g) || []).length;
  const canvasCount = (code.match(/<canvas/g) || []).length;
  const motionCount = (code.match(/motion\./g) || []).length;
  const sliderCount = (code.match(/type.*range|slider/gi) || []).length;
  const buttonCount = (code.match(/<button/g) || []).length;
  
  console.log('=== ' + id + ' ===');
  console.log('Lines:', code.split('\n').length);
  console.log('Structural:', structuralPass ? 'PASS' : 'FAIL');
  console.log('noAny (warning):', noAny ? 'OK' : 'has any types (acceptable)');
  console.log('Visuals: ' + svgCount + ' SVG, ' + canvasCount + ' Canvas, ' + motionCount + ' motion, ' + sliderCount + ' sliders, ' + buttonCount + ' buttons');
  console.log('');
}
