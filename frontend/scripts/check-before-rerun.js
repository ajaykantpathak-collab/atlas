const fs = require('fs');
const path = require('path');
const FRONTEND_DIR = 'D:\\dream_app\\frontend';

// Check 1: Sample file token estimate
const sample = fs.readFileSync(path.join(FRONTEND_DIR, 'components/simulations/c9_12/C11_C12_PhysicsAdvancedSim.tsx'), 'utf8');
const lines = sample.split('\n').length;
const chars = sample.length;
console.log('Sample existing file lines:', lines);
console.log('Sample existing file chars:', chars);
console.log('Estimated tokens:', Math.round(chars / 4));
console.log('');

// Check 2: max_tokens in script
const script = fs.readFileSync(path.join(FRONTEND_DIR, 'scripts/opus-c12-pipeline.js'), 'utf8');
console.log('max_tokens in script:', script.match(/max_tokens:\s*(\d+)/)?.[1]);
console.log('');

// Check 3: API error samples
const log = JSON.parse(fs.readFileSync(path.join(FRONTEND_DIR, 'scripts/c12_pipeline_log_1787630902566.json'), 'utf8'));
const apiErrors = log.filter(r => r.error && r.error.includes('API'));
console.log('API errors:', apiErrors.length);
if (apiErrors.length > 0) {
  console.log('Sample API error:', apiErrors[0].error.substring(0, 400));
}
console.log('');

// Check 4: Files actually written
const outputDir = path.join(FRONTEND_DIR, 'components', 'simulations', 'c9_12');
const c12Files = fs.readdirSync(outputDir).filter(f => f.startsWith('C12_') && f.endsWith('.tsx'));
console.log('C12 files in output dir:', c12Files.length);
if (c12Files.length > 0) {
  for (const f of c12Files.slice(0, 5)) {
    const content = fs.readFileSync(path.join(outputDir, f), 'utf8');
    console.log('  ' + f + ': ' + content.split('\n').length + ' lines, useClient=' + content.includes("'use client'") + ', audioManager=' + content.includes('audioManager') + ', bktUpdate=' + content.includes('bktUpdate'));
  }
}

// Check 5: Enrichment completeness for a few subjects
console.log('');
console.log('Enrichment completeness:');
const CISCE_DIR = 'D:\\cisce';
const plan = require(path.join(FRONTEND_DIR, 'scripts/c12-template-plan.js'));
const subjects = [...new Set(plan.map(t => t.subject))];
for (const subj of subjects.slice(0, 5)) {
  const enrichDir = path.join(CISCE_DIR, subj, 'enrichment');
  if (!fs.existsSync(enrichDir)) { console.log('  ' + subj + ': NO DIR'); continue; }
  const files = fs.readdirSync(enrichDir).filter(f => f.startsWith('c12_') && f.endsWith('.marker'));
  // Check first file for misconception content
  if (files.length > 0) {
    const content = fs.readFileSync(path.join(enrichDir, files[0]), 'utf8');
    const hasMisconception = content.toLowerCase().includes('misconception');
    const hasDiagnostic = content.toLowerCase().includes('diagnostic') || content.toLowerCase().includes('question');
    const hasEli5 = content.toLowerCase().includes('eli5') || content.toLowerCase().includes('simple');
    console.log('  ' + subj + ': ' + files.length + ' files, misconception=' + hasMisconception + ', diagnostic=' + hasDiagnostic + ', eli5=' + hasEli5);
  }
}
