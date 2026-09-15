// Test the full data flow: load → parse → convert to sim props
import { parseEnrichmentFile } from '../lib/game-engine/EnrichmentParser';
import { enrichNodeToSimProps } from '../lib/c68/SimulationPropsMapper';
import fs from 'fs';
import path from 'path';

const CISCE_ROOT = 'D:\\cisce';

// Test with a physics light-related node
const testFile = path.join(CISCE_ROOT, 'physics', 'enrichment', 'c6_physics_enrichment_part1.marker');
const content = fs.readFileSync(testFile, 'utf8');
const nodes = parseEnrichmentFile(content, 'physics', 6);
const node = nodes[0];

console.log('=== Original Enrichment Node ===');
console.log('Node ID:', node.nodeId);
console.log('Title:', node.title);
console.log('Subject:', node.subject);
console.log('Diagnostic Questions:', node.diagnosticQuestions.length);
node.diagnosticQuestions.forEach((q, i) => {
  console.log(`  Q${i+1} (${q.bloomLevel}): ${q.question.substring(0, 60)}...`);
  console.log(`    Answer: ${q.answer.substring(0, 60)}...`);
});

console.log('\n=== Converted Simulation Props ===');
const simProps = enrichNodeToSimProps(node);
console.log('Template Type:', simProps.templateType);
console.log('Node ID:', simProps.nodeId);
console.log('Title:', simProps.title);
console.log('Misconceptions:', simProps.misconceptions.length);
console.log('Enhanced Challenges:', simProps.diagnosticQuestions.length);
simProps.diagnosticQuestions.forEach((q, i) => {
  console.log(`\n  Challenge ${i+1} (${q.bloomLevel}):`);
  console.log(`    Question: ${q.question.substring(0, 80)}...`);
  console.log(`    Answer Type: ${q.answerType}`);
  console.log(`    Answer: ${q.answer.substring(0, 60)}`);
  console.log(`    Unit: ${q.unit || 'none'}`);
  console.log(`    Formula: ${q.formula || 'none'}`);
  console.log(`    Working: ${q.working?.substring(0, 80)}...`);
  console.log(`    Hint: ${q.hint?.substring(0, 60)}`);
  if (q.options) console.log(`    Options: ${q.options.length}`);
});
