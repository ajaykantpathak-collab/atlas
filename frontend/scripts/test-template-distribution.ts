// Test template distribution after new mapping
import { parseEnrichmentFile } from '../lib/game-engine/EnrichmentParser';
import { inferTemplateType } from '../lib/c68/SimulationRegistry';
import fs from 'fs';
import path from 'path';

const subjects: Record<string, string> = {
  physics: 'physics', chem: 'chem', bio: 'bio', maths: 'maths',
  geo: 'geo', cs: 'cs', histciv: 'histciv',
};
const counts: Record<string, number> = {};
const nodesByTemplate: Record<string, string[]> = {};

for (const [subj, dir] of Object.entries(subjects)) {
  const enrDir = path.join('D:\\cisce', dir, 'enrichment');
  if (!fs.existsSync(enrDir)) continue;
  for (const cls of [6, 7, 8]) {
    const files = fs.readdirSync(enrDir).filter(f => f.startsWith('c' + cls + '_') && f.endsWith('.marker'));
    for (const f of files) {
      const content = fs.readFileSync(path.join(enrDir, f), 'utf8');
      const nodes = parseEnrichmentFile(content, subj, cls);
      for (const n of nodes) {
        const t = inferTemplateType(n);
        counts[t] = (counts[t] || 0) + 1;
        if (!nodesByTemplate[t]) nodesByTemplate[t] = [];
        nodesByTemplate[t].push(n.nodeId + ': ' + n.title.substring(0, 50));
      }
    }
  }
}

const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
console.log('=== TEMPLATE DISTRIBUTION (after new mapping) ===');
for (const [t, c] of sorted) {
  console.log(t.padEnd(35) + ': ' + c + ' nodes');
}
console.log('');
console.log('Total templates:', sorted.length);
console.log('Total nodes:', Object.values(counts).reduce((a, b) => a + b, 0));
