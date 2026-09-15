/**
 * extract-enrichment-by-template.ts
 *
 * Loads all C6-8 enrichment nodes, groups them by simulation template type,
 * and writes a JSON file per template containing all the enrichment data
 * for the nodes that map to that template.
 *
 * Output: scripts/enrichment-data/<template-name>.json
 */

import { parseEnrichmentFile, type EnrichmentNode } from '../lib/game-engine/EnrichmentParser';
import { inferTemplateType, type SimulationTemplateType } from '../lib/c68/SimulationRegistry';
import fs from 'fs';
import path from 'path';

const CISCE_ROOT = 'D:\\cisce';
const OUT_DIR = path.join(__dirname, 'enrichment-data');

const SUBJECT_DIRS: Record<string, string> = {
  physics: 'physics',
  chem: 'chem',
  bio: 'bio',
  maths: 'maths',
  geo: 'geo',
  cs: 'cs',
  histciv: 'histciv',
};

// ─── Load all nodes ───────────────────────────────────────────

function loadAllNodes(): EnrichmentNode[] {
  const allNodes: EnrichmentNode[] = [];

  for (const [subjectKey, dir] of Object.entries(SUBJECT_DIRS)) {
    const enrDir = path.join(CISCE_ROOT, dir, 'enrichment');
    if (!fs.existsSync(enrDir)) continue;

    for (const cls of [6, 7, 8]) {
      const files = fs.readdirSync(enrDir)
        .filter(f => f.startsWith(`c${cls}_`) && f.endsWith('.marker'));

      for (const file of files) {
        const content = fs.readFileSync(path.join(enrDir, file), 'utf8');
        try {
          const nodes = parseEnrichmentFile(content, subjectKey, cls);
          allNodes.push(...nodes);
        } catch (err) {
          // Skip broken files
        }
      }
    }
  }

  return allNodes;
}

// ─── Main ─────────────────────────────────────────────────────

const nodes = loadAllNodes();
console.log(`Loaded ${nodes.length} enrichment nodes`);

// Group by template type
const byTemplate: Record<string, EnrichmentNode[]> = {};

for (const node of nodes) {
  const template = inferTemplateType(node);
  if (!byTemplate[template]) byTemplate[template] = [];
  byTemplate[template].push(node);
}

// Create output dir
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

// Write JSON per template
for (const [template, templateNodes] of Object.entries(byTemplate)) {
  const outFile = path.join(OUT_DIR, `${template}.json`);

  // Compact format — only what Gemini needs
  const compact = templateNodes.map(n => ({
    nodeId: n.nodeId,
    title: n.title,
    subject: n.subject,
    classLevel: n.classLevel,
    definition: n.definition,
    eli5: n.eli5,
    misconceptions: n.misconceptions,
    diagnosticQuestions: n.diagnosticQuestions,
    masteryCriteria: n.masteryCriteria,
    cognitiveLevel: n.cognitiveLevel,
  }));

  fs.writeFileSync(outFile, JSON.stringify(compact, null, 2));
  console.log(`  ${template}: ${templateNodes.length} nodes → ${path.basename(outFile)}`);
}

console.log(`\nDone! ${Object.keys(byTemplate).length} template files written to ${OUT_DIR}`);
