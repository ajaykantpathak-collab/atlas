// Verification Pass 2 — deeper content inspection
const fs = require('fs');
const path = require('path');
const FRONTEND_DIR = 'D:\\dream_app\\frontend';

console.log('=== VERIFICATION PASS 2: Deep Content Inspection ===\n');

// 1. Verify enrichment lookup actually finds content for at least one subject
console.log('--- Enrichment Lookup Test ---');
const CISCE_DIR = 'D:\\cisce';
const testSubjects = ['acc', 'physics', 'maths', 'bio', 'econ', 'hist'];
for (const subj of testSubjects) {
  const enrichDir = path.join(CISCE_DIR, subj, 'enrichment');
  if (!fs.existsSync(enrichDir)) {
    console.log(`  ${subj}: NO enrichment dir`);
    continue;
  }
  const files = fs.readdirSync(enrichDir).filter(f => f.startsWith('c12_') && f.endsWith('.marker'));
  console.log(`  ${subj}: ${files.length} C12 enrichment files`);
  if (files.length > 0) {
    // Test extraction for a known node
    const sampleFile = path.join(enrichDir, files[0]);
    const content = fs.readFileSync(sampleFile, 'utf8');
    const hasNodeMarker = content.includes('--- NODE ');
    const hasTitle = content.includes('TITLE');
    const hasDefinition = content.includes('DEFINITION');
    console.log(`    Sample ${files[0]}: nodeMarker=${hasNodeMarker}, title=${hasTitle}, definition=${hasDefinition}`);
  }
}

// 2. Verify pipeline enrichment function logic matches actual file structure
console.log('\n--- Pipeline Enrichment Logic ---');
const script = fs.readFileSync(path.join(FRONTEND_DIR, 'scripts', 'opus-c12-pipeline.js'), 'utf8');
// Check that the function reads .marker files
console.log('  Reads .marker files:', script.includes(".endsWith('.marker')"));
console.log('  Filters by c12_ prefix:', script.includes(".startsWith('c12_')"));
console.log('  Extracts by node marker:', script.includes('--- NODE'));
console.log('  Joins subject dir:', script.includes("path.join(CISCE_DIR, subject, 'enrichment')"));

// 3. Verify the prompt includes actual node titles
console.log('\n--- Prompt Node Title Lookup ---');
const nodesFile = fs.readFileSync(path.join(CISCE_DIR, 'all_nodes_extracted.txt'), 'utf8');
const nodeTitles = {};
for (const line of nodesFile.split('\n').filter(l => l.trim())) {
  const parts = line.split('|');
  if (parts.length >= 4) nodeTitles[parts[2].trim()] = parts[3].trim();
}
// Sample some C12 nodes
const sampleNodes = ['c12_phy_001', 'c12_math_001', 'c12_chem_001', 'c12_acc_001', 'c12_econ_001', 'c12_hist_001'];
for (const n of sampleNodes) {
  console.log(`  ${n}: ${nodeTitles[n] || 'NOT FOUND'}`);
}
console.log('  Pipeline uses nodeTitles:', script.includes('nodeTitles'));

// 4. Verify output directory exists
console.log('\n--- Output Directory ---');
const outputDir = path.join(FRONTEND_DIR, 'components', 'simulations', 'c9_12');
console.log('  Output dir exists:', fs.existsSync(outputDir));
if (fs.existsSync(outputDir)) {
  const existing = fs.readdirSync(outputDir).filter(f => f.startsWith('C12_'));
  console.log('  Existing C12 files:', existing.length);
  if (existing.length > 0) console.log('  Sample:', existing.slice(0, 5).join(', '));
}

// 5. Verify backup directory can be created
const backupDir = path.join(FRONTEND_DIR, 'scripts', 'c12_backups');
console.log('\n--- Backup Directory ---');
console.log('  Backup dir path:', backupDir);
console.log('  Parent (scripts) exists:', fs.existsSync(path.join(FRONTEND_DIR, 'scripts')));

// 6. Verify TypeScript is available
console.log('\n--- TypeScript ---');
try {
  const tsVersion = require('child_process').execSync('npx tsc --version', { cwd: FRONTEND_DIR, encoding: 'utf8', timeout: 30000 }).trim();
  console.log('  tsc version:', tsVersion);
} catch (e) {
  console.log('  tsc not available:', e.message.substring(0, 100));
}

// 7. Verify the plan file can be required without error
console.log('\n--- Plan Module ---');
try {
  const plan = require(path.join(FRONTEND_DIR, 'scripts', 'c12-template-plan.js'));
  console.log('  Loads without error:', true);
  console.log('  Template count:', plan.length);
  // Check every template has required fields
  let missingFields = 0;
  for (const t of plan) {
    if (!t.id || !t.stream || !t.subject || !Array.isArray(t.nodes) || t.nodes.length === 0) {
      missingFields++;
      console.log('  MISSING FIELDS in:', t.id || 'unknown');
    }
  }
  console.log('  Templates with missing fields:', missingFields);
} catch (e) {
  console.log('  LOAD ERROR:', e.message);
}

// 8. Verify sim-engine exports match what pipeline requires
console.log('\n--- Sim Engine Exports ---');
const simEngineIndex = fs.readFileSync(path.join(FRONTEND_DIR, 'lib', 'sim-engine', 'index.ts'), 'utf8');
console.log('  audioManager exported:', simEngineIndex.includes('audioManager'));
console.log('  speechManager exported:', simEngineIndex.includes('speechManager'));
console.log('  Confetti exported:', simEngineIndex.includes('Confetti'));
console.log('  SuccessBanner exported:', simEngineIndex.includes('SuccessBanner'));
console.log('  HintBubble exported:', simEngineIndex.includes('HintBubble'));
console.log('  SparkleBurst exported:', simEngineIndex.includes('SparkleBurst'));

// 9. Verify API endpoint structure
console.log('\n--- API Endpoint ---');
console.log('  Uses /v1/messages:', script.includes('/v1/messages'));
console.log('  Uses https:', script.includes('https.request'));
console.log('  Sets x-api-key header:', script.includes('x-api-key'));
console.log('  Sets Authorization header:', script.includes('Authorization'));
console.log('  Sets anthropic-version:', script.includes('anthropic-version'));
console.log('  max_tokens 16000:', script.includes('max_tokens: 16000'));

// 10. Verify worker pool implementation
console.log('\n--- Worker Pool ---');
console.log('  Has runWorkers function:', script.includes('function runWorkers'));
console.log('  Has worker function:', script.includes('async function worker'));
console.log('  Uses Promise.all:', script.includes('Promise.all'));
console.log('  Worker count loop:', script.includes('NUM_WORKERS'));

console.log('\n=== PASS 2 COMPLETE ===');
