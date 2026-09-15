const fs = require('fs');
const dir = 'components/simulations/c9_12/';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));
for (const file of files) {
  const code = fs.readFileSync(dir + file, 'utf8');
  const lines = code.split('\n');
  console.log('=== ' + file + ' ===');
  console.log('Lines:', lines.length);
  console.log('use client:', code.includes("'use client'"));
  console.log('export default:', code.includes('export default'));
  console.log('export interface:', code.includes('export interface'));
  console.log('SVG:', code.includes('<svg'));
  console.log('Animation:', code.includes('<animate') || code.includes('motion.') || code.includes('keyframes'));
  console.log('Sliders:', code.includes('type="range"'));
  console.log('Buttons:', code.includes('<button'));
  console.log('Inputs:', code.includes('type="number"') || code.includes('type="text"') || code.includes('<textarea'));
  console.log('ELI5:', code.toLowerCase().includes('eli5') || code.toLowerCase().includes('simple explanation'));
  console.log('Misconception feedback:', code.toLowerCase().includes('misconception'));
  console.log('Real-world activity:', code.toLowerCase().includes('real-world') || code.toLowerCase().includes('try this') || code.toLowerCase().includes('yourself'));
  console.log('Hint system:', code.includes('hintLevel') || code.includes('showHint') || code.includes('Hint'));
  console.log('Adaptive difficulty:', code.toLowerCase().includes('adaptive') || code.toLowerCase().includes('difficulty') || code.toLowerCase().includes('foundation'));
  console.log('localStorage:', code.includes('localStorage'));
  console.log('Spaced repetition:', code.toLowerCase().includes('review') || code.toLowerCase().includes('spaced'));
  console.log('Guided discovery:', code.toLowerCase().includes('discover') || code.toLowerCase().includes('explore') || code.toLowerCase().includes('try moving'));
  console.log('onComplete:', code.includes('onComplete'));
  console.log('Progress bar:', code.toLowerCase().includes('progress'));
  console.log('');
}
