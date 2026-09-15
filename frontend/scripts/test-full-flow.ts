// Test the full data flow: parse → infer template → convert to sim props
import { parseEnrichmentFile } from '../lib/game-engine/EnrichmentParser';
import { enrichNodeToSimProps } from '../lib/c68/SimulationPropsMapper';
import { inferTemplateType } from '../lib/c68/SimulationRegistry';
import fs from 'fs';
import path from 'path';

const CISCE_ROOT = 'D:\\cisce';

const testCases = [
  { subject: 'physics', classLevel: 6, file: 'c6_physics_enrichment_part1.marker' },
  { subject: 'chem', classLevel: 6, file: 'c6_chemistry_enrichment_part1.marker' },
  { subject: 'bio', classLevel: 6, file: 'c6_biology_enrichment_part1.marker' },
  { subject: 'maths', classLevel: 6, file: 'c6_maths_enrichment_part1.marker' },
  { subject: 'geo', classLevel: 6, file: 'c6_geography_enrichment_part1.marker' },
  { subject: 'cs', classLevel: 6, file: 'c6_cs_enrichment_part1.marker' },
  { subject: 'histciv', classLevel: 6, file: 'c6_histciv_enrichment_001.marker' },
];

for (const tc of testCases) {
  const filePath = path.join(CISCE_ROOT, tc.subject, 'enrichment', tc.file);
  if (!fs.existsSync(filePath)) {
    console.log(`${tc.subject}: FILE NOT FOUND (${tc.file})`);
    continue;
  }
  const content = fs.readFileSync(filePath, 'utf8');
  const nodes = parseEnrichmentFile(content, tc.subject, tc.classLevel);
  if (nodes.length === 0) {
    console.log(`${tc.subject}: NO NODES PARSED`);
    continue;
  }
  const node = nodes[0];
  const template = inferTemplateType(node);
  const simProps = enrichNodeToSimProps(node);
  console.log(`${tc.subject.padEnd(10)} | template=${template.padEnd(22)} | challenges=${simProps.diagnosticQuestions.length} | mc=${simProps.misconceptions.length}`);
  simProps.diagnosticQuestions.forEach((q, i) => {
    console.log(`  Q${i+1} (${q.bloomLevel}, ${q.answerType}): ${q.question.substring(0, 70)}`);
  });
  console.log('');
}
