// Verification of rebuilt pipeline — check that every check is REAL
const fs = require('fs');
const path = require('path');
const FRONTEND_DIR = 'D:\\dream_app\\frontend';

console.log('=== PIPELINE VERIFICATION ===\n');

const script = fs.readFileSync(path.join(FRONTEND_DIR, 'scripts', 'opus-c12-pipeline.js'), 'utf8');

// 1. No fake regex quality checks
console.log('1. No verifyQuality function with 25 regex checks:', !script.includes('verifyQuality'));
console.log('2. No S1_formula_viz regex:', !script.includes('S1_formula_viz'));
console.log('3. No H1_timeline_or_map regex:', !script.includes('H1_timeline_or_map'));
console.log('4. No C1_live_calc regex:', !script.includes('C1_live_calc'));

// 2. Real checks only
console.log('\n2. Real checks present:');
console.log('  runRealChecks function:', script.includes('function runRealChecks'));
console.log('  TypeScript compilation (tsc):', script.includes('tsc --noEmit'));
console.log("  use client as first line check:", script.includes("lines[0]?.trim()"));
console.log('  Import statement regex (real):', script.includes('import\\\\s+.*\\\\b'));
console.log('  Node IDs as string literals (real):', script.includes("'${n}'") || script.includes("`'${n}'`"));
console.log('  localStorage API call check:', script.includes('localStorage\\.(getItem|setItem)'));
console.log('  onComplete in props (typed signature):', script.includes('onComplete\\??\\s*:\\s*\\(?\\s*score'));
console.log('  onComplete actually called:', script.includes('onComplete\\s*\\('));
console.log('  No any type check:', script.includes(':\\s*any\\b'));
console.log('  Line count:', script.includes('lineCount'));

// 3. Retry with targeted feedback
console.log('\n3. Retry with targeted feedback:');
console.log('  buildRetryFeedback function:', script.includes('function buildRetryFeedback'));
console.log('  Sends back TS errors:', script.includes('TypeScript compilation errors'));
console.log('  Sends back missing nodes:', script.includes('node IDs are missing as string literals'));
console.log('  Sends back missing imports:', script.includes('Missing required imports'));
console.log('  Sends back line count issue:', script.includes('must be 1000+ substantive lines'));
console.log('  Retry feedback passed to prompt:', script.includes('retryFeedback'));

// 4. Core pipeline features
console.log('\n4. Core pipeline features:');
console.log('  10 workers default:', script.includes("'10'"));
console.log('  Worker pool with Promise.all:', script.includes('Promise.all'));
console.log('  Backup before write:', script.includes('function backupFile'));
console.log('  Atomic write (temp + rename):', script.includes('function atomicWrite') && script.includes('renameSync'));
console.log('  Enrichment loader:', script.includes('function loadEnrichment'));
console.log('  Stream-specific prompts:', script.includes('function getStreamPrompt'));
console.log('  No hardcoded API key:', !script.includes('sk-') && !/['"][a-f0-9]{30,}['"]/.test(script));
console.log('  Uses env var:', script.includes('process.env.OPUS_API_KEY'));
console.log('  API timeout:', script.includes('setTimeout(300000'));
console.log('  Results log:', script.includes('c12_pipeline_log'));
console.log('  Needs inspection list:', script.includes('c12_needs_inspection'));

// 5. Prompt quality
console.log('\n5. Prompt includes:');
console.log('  Node IDs as string literals requirement:', script.includes('must appear in the code as string literals'));
console.log('  All node IDs listed:', script.includes('nodeIdList'));
console.log('  Enrichment data:', script.includes('enrichment'));
console.log('  Stream rules:', script.includes('streamRules'));
console.log('  Brilliant.org reference:', script.includes('Brilliant.org'));
console.log('  1000+ lines requirement:', script.includes('1000+ substantive lines'));
console.log('  5+ challenges requirement:', script.includes('5+ progressive challenges'));
console.log('  Misconception format:', script.includes('Misconception: [belief]'));
console.log('  Adaptive difficulty:', script.includes('foundation, standard, advanced'));
console.log('  Auto-hint 10s:', script.includes('auto-hint after 10 seconds'));
console.log('  localStorage key format:', script.includes('c12_') && script.includes('_mastery'));
console.log('  Valid SoundEffect values listed:', script.includes('pickup') && script.includes('drop-correct'));
console.log('  No any type:', script.includes("No 'any' type"));
console.log('  onComplete score 0-100:', script.includes('score 0-100'));

// 6. Template plan still valid
console.log('\n6. Template plan:');
const plan = require(path.join(FRONTEND_DIR, 'scripts', 'c12-template-plan.js'));
const nodesFile = fs.readFileSync('D:\\cisce\\all_nodes_extracted.txt', 'utf8');
const c12Nodes = new Set();
for (const line of nodesFile.split('\n').filter(l => l.trim())) {
  const p = line.split('|');
  if (p.length >= 4 && p[1].trim() === 'C12') c12Nodes.add(p[2].trim());
}
const assigned = new Set();
for (const t of plan) for (const n of t.nodes) assigned.add(n);
console.log('  Templates:', plan.length);
console.log('  Nodes covered:', assigned.size, '/', c12Nodes.size);
console.log('  All covered:', assigned.size === c12Nodes.size);

console.log('\n=== VERIFICATION COMPLETE ===');
