// Test the EnrichmentParser against real .marker files
import { parseEnrichmentFile } from '../lib/game-engine/EnrichmentParser';
import fs from 'fs';
import path from 'path';

const CISCE_ROOT = 'D:\\cisce';

const testFile = path.join(CISCE_ROOT, 'physics', 'enrichment', 'c6_physics_enrichment_part1.marker');
const content = fs.readFileSync(testFile, 'utf8');

const nodes = parseEnrichmentFile(content, 'physics', 6);
console.log('Parsed nodes:', nodes.length);
if (nodes[0]) {
  console.log('Node ID:', nodes[0].nodeId);
  console.log('Title:', nodes[0].title);
  console.log('Has definition:', !!nodes[0].definition);
  console.log('Has eli5:', !!nodes[0].eli5);
  console.log('Misconceptions:', nodes[0].misconceptions.length);
  console.log('Diagnostic Qs:', nodes[0].diagnosticQuestions.length);
  console.log('Mastery criteria:', nodes[0].masteryCriteria?.substring(0, 80));
}
