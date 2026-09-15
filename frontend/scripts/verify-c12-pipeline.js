// Verification script for C12 pipeline
const fs = require('fs');
const path = require('path');
const FRONTEND_DIR = 'D:\\dream_app\\frontend';

console.log('=== VERIFICATION PASS 1: Pipeline Script ===\n');

const script = fs.readFileSync(path.join(__dirname, 'opus-c12-pipeline.js'), 'utf8');

// 1. API config
console.log('1a. No hardcoded API key:', !script.includes('sk-') && !/['"][a-f0-9]{30,}['"]/.test(script));
console.log('1b. Uses env var OPUS_API_KEY:', script.includes('process.env.OPUS_API_KEY'));
console.log('1c. API URL configurable:', script.includes('process.env.OPUS_API_URL'));
console.log('1d. Model configurable:', script.includes('process.env.OPUS_MODEL'));

// 2. Worker count
console.log('2a. Default 10 workers:', script.includes("'10'"));
console.log('2b. Worker count from env:', script.includes('C12_WORKERS'));

// 3. Paths
console.log('3a. Output dir c9_12:', script.includes('c9_12'));
console.log('3b. CISCE dir:', script.includes('D:\\cisce') || script.includes('D:\\\\cisce'));
console.log('3c. Frontend dir:', script.includes('D:\\dream_app') || script.includes('D:\\\\dream_app'));

// 4. Backup
console.log('4a. Backup function:', script.includes('function backupFile'));
console.log('4b. Backup dir:', script.includes('BACKUP_DIR'));
const backupIdx = script.indexOf('backupFile(');
const writeIdx = script.indexOf('fs.writeFileSync');
console.log('4c. Backup before write:', backupIdx > 0 && backupIdx < writeIdx);

// 5. Enrichment
console.log('5a. Enrichment loader:', script.includes('function loadEnrichment'));
console.log('5b. Subject-specific path:', script.includes("path.join(CISCE_DIR, subject, 'enrichment')"));
console.log('5c. Node marker extraction:', script.includes('--- NODE'));

// 6. TypeScript check
console.log('6a. TS check function:', script.includes('function typeCheck'));
console.log('6b. Uses tsc --noEmit:', script.includes('tsc --noEmit'));

// 7. Prompt structure
console.log('7a. Stream-specific prompts:', script.includes('function getStreamPrompt'));
console.log('7b. Science stream rules:', script.includes('SCIENCE STREAM'));
console.log('7c. Commerce stream rules:', script.includes('COMMERCE STREAM'));
console.log('7d. Humanities stream rules:', script.includes('HUMANITIES STREAM'));
console.log('7e. Node IDs in prompt:', script.includes('nodeInfo'));
console.log('7f. Enrichment in prompt:', script.includes('loadEnrichment'));
console.log('7g. onComplete requirement:', script.includes('onComplete'));
console.log('7h. All feedback components:', script.includes('Confetti') && script.includes('SuccessBanner') && script.includes('HintBubble') && script.includes('SparkleBurst'));
console.log('7i. audioManager required:', script.includes('audioManager'));
console.log('7j. speechManager required:', script.includes('speechManager'));
console.log('7k. localStorage required:', script.includes('localStorage'));
console.log('7l. Auto-hint 10s:', script.includes('10 seconds'));

// 8. Failure logging
console.log('8a. Results log:', script.includes('c12_pipeline_log'));
console.log('8b. Failed reported:', script.includes('FAILED'));

// 9. Collision protection
console.log('9a. Checks existing file:', script.includes('existsSync'));

console.log('\n=== VERIFICATION PASS 1: Template Plan ===\n');

const plan = require('./c12-template-plan.js');
const nodesFile = fs.readFileSync('D:\\cisce\\all_nodes_extracted.txt', 'utf8');
const nodes = nodesFile.split('\n').filter(l => l.trim());
const c12Nodes = new Set();
for (const l of nodes) {
  const p = l.split('|');
  if (p.length >= 4 && p[1].trim() === 'C12') c12Nodes.add(p[2].trim());
}

const assigned = new Set();
let dups = 0;
for (const t of plan) {
  for (const n of t.nodes) {
    if (assigned.has(n)) { dups++; console.log('  DUP:', n, 'in', t.id); }
    assigned.add(n);
  }
}
const missing = [...c12Nodes].filter(n => !assigned.has(n));
const extra = [...assigned].filter(n => !c12Nodes.has(n));

console.log('Templates:', plan.length);
console.log('C12 nodes in syllabus:', c12Nodes.size);
console.log('Nodes assigned:', assigned.size);
console.log('Duplicates:', dups);
console.log('Missing:', missing.length, missing.length > 0 ? missing.slice(0, 10) : '');
console.log('Extra/invalid:', extra.length, extra.length > 0 ? extra.slice(0, 10) : '');
console.log('ALL COVERED:', missing.length === 0 && extra.length === 0 && dups === 0);

// Stream distribution
const streams = { science: 0, commerce: 0, humanities: 0 };
for (const t of plan) streams[t.stream]++;
console.log('Stream distribution:', JSON.stringify(streams));

// Subject distribution
const subjects = {};
for (const t of plan) { subjects[t.subject] = (subjects[t.subject] || 0) + 1; }
console.log('Subject distribution:', JSON.stringify(subjects));

// Verify each template has valid stream and subject
let invalidStream = 0, invalidSubject = 0;
for (const t of plan) {
  if (!['science', 'commerce', 'humanities'].includes(t.stream)) invalidStream++;
  if (!t.subject || typeof t.subject !== 'string') invalidSubject++;
}
console.log('Invalid streams:', invalidStream);
console.log('Invalid subjects:', invalidSubject);

console.log('\n=== VERIFICATION PASS 1: Benchmarks File ===\n');
const benchmarks = fs.readFileSync(path.join(FRONTEND_DIR, 'C9_12_STREAM_BENCHMARKS.md'), 'utf8');
console.log('File exists:', benchmarks.length > 0);
console.log('Has common baseline:', benchmarks.includes('COMMON BASELINE'));
console.log('Has science stream:', benchmarks.includes('SCIENCE STREAM'));
console.log('Has commerce stream:', benchmarks.includes('COMMERCE STREAM'));
console.log('Has humanities stream:', benchmarks.includes('HUMANITIES STREAM'));
console.log('Has naming convention:', benchmarks.includes('FILE NAMING'));
console.log('Has verification process:', benchmarks.includes('VERIFICATION PROCESS'));
