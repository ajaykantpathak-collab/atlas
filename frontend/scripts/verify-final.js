const fs = require('fs');
const path = require('path');
const FRONTEND_DIR = 'D:\\dream_app\\frontend';

console.log('=== IMPORT CONSISTENCY CHECK ===');

const script = fs.readFileSync(path.join(FRONTEND_DIR, 'scripts', 'opus-c12-pipeline.js'), 'utf8');

const promptImports = ['audioManager', 'speechManager', 'Confetti', 'SuccessBanner', 'HintBubble', 'SparkleBurst', 'createReviewItem', 'sm2Update', 'createBKTState', 'bktUpdate', 'getMasteryLevel', 'recordGameScore', 'getNodeMastery', 'SUBJECT_CONFIG'];

for (const imp of promptImports) {
  const inCheck = script.includes("'" + imp + "'");
  console.log('  ' + imp + ': in checks = ' + inCheck);
}

// Verify against actual exports
const srs = fs.readFileSync(path.join(FRONTEND_DIR, 'lib', 'srs.ts'), 'utf8');
const bkt = fs.readFileSync(path.join(FRONTEND_DIR, 'lib', 'bkt.ts'), 'utf8');
const ms = fs.readFileSync(path.join(FRONTEND_DIR, 'lib', 'masteryStore.ts'), 'utf8');
const tg = fs.readFileSync(path.join(FRONTEND_DIR, 'lib', 'topicGraph.ts'), 'utf8');
const se = fs.readFileSync(path.join(FRONTEND_DIR, 'lib', 'sim-engine', 'index.ts'), 'utf8');

console.log('\n=== ACTUAL EXPORTS VERIFY ===');
console.log('srs createReviewItem:', srs.includes('export function createReviewItem'));
console.log('srs sm2Update:', srs.includes('export function sm2Update'));
console.log('bkt createBKTState:', bkt.includes('export function createBKTState'));
console.log('bkt bktUpdate:', bkt.includes('export function bktUpdate'));
console.log('bkt getMasteryLevel:', bkt.includes('export function getMasteryLevel'));
console.log('masteryStore recordGameScore:', ms.includes('export function recordGameScore'));
console.log('masteryStore getNodeMastery:', ms.includes('export function getNodeMastery'));
console.log('topicGraph SUBJECT_CONFIG:', tg.includes('SUBJECT_CONFIG'));
console.log('sim-engine audioManager:', se.includes('audioManager'));
console.log('sim-engine speechManager:', se.includes('speechManager'));
console.log('sim-engine Confetti:', se.includes('Confetti'));
console.log('sim-engine SuccessBanner:', se.includes('SuccessBanner'));
console.log('sim-engine HintBubble:', se.includes('HintBubble'));
console.log('sim-engine SparkleBurst:', se.includes('SparkleBurst'));

console.log('\n=== FUNCTION CALL CHECKS ===');
console.log('bktUpdate call check:', script.includes('bktUpdate'));
console.log('sm2Update call check:', script.includes('sm2Update'));
console.log('recordGameScore call check:', script.includes('recordGameScore'));

console.log('\n=== NO RETRY CHECK ===');
console.log('No MAX_RETRY:', !script.includes('MAX_RETRY'));
console.log('No buildRetryFeedback:', !script.includes('buildRetryFeedback'));
console.log('No retry loop:', !script.includes('for (let attempt'));

console.log('\n=== 10 WORKERS ===');
console.log('Default 10:', script.includes("'10'"));
console.log('No batch-of-2:', !script.includes('C12_BATCH_SIZE'));

console.log('\n=== BRILLIANT.ORG INTEGRATION ===');
console.log('BKT adaptive learning in prompt:', script.includes('Bayesian Knowledge Tracing'));
console.log('SRS spaced repetition in prompt:', script.includes('Spaced Repetition'));
console.log('Mastery store in prompt:', script.includes('Mastery Store'));
console.log('Topic graph in prompt:', script.includes('Topic Graph'));
console.log('Adaptive difficulty in prompt:', script.includes('ADAPT difficulty'));
console.log('Guided step-by-step in prompt:', script.includes('guided step-by-step'));
console.log('Mastery level display in prompt:', script.includes('Show mastery state'));
