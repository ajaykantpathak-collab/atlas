/**
 * Deep data quality audit — checks every node for missing/empty enrichment fields.
 * Reports per-subject and per-class statistics.
 */
import { inferTemplateType } from '../lib/c68/SimulationRegistry';
import fs from 'fs';
import path from 'path';

const subjects: Record<string, string> = {
  physics: 'physics', chem: 'chem', bio: 'bio', maths: 'maths',
  geo: 'geo', cs: 'cs', histciv: 'histciv',
};

interface Node {
  nodeId: string;
  title: string;
  subject: string;
  classLevel: number;
  definition: string;
  eli5: string;
  textWalkthrough: string;
  misconceptions: any[];
  diagnosticQuestions: any[];
  cognitiveLevel: string;
  masteryCriteria: string;
}

function extractField(block: string, fieldName: string): string {
  const pattern = new RegExp(`^${fieldName}:\\s*\\|?\\s*$`, 'm');
  const m = block.match(pattern);
  if (!m) return '';
  const after = block.substring(m.index + m[0].length + 1);
  const lines = after.split('\n');
  const content: string[] = [];
  const fieldEnd = /^(TITLE|DEFINITION|TEXT_WALKTHROUGH|ELI5|COMMON_MISCONCEPTION|DIAGNOSTIC_QUESTION|ON_FAILURE|COGNITIVE_LEVEL|MASTERY_CRITERIA|SCOPE_BOUNDARY|SECTION|SYLLABUS|DIFFICULTY|EXAM_RELEVANCE|EXAM_WEIGHTAGE|COMPETENCY_LEVEL|PREREQ_STRENGTH|EXAMPLES|VOCABULARY|QUESTIONS|SPIRAL_TOPIC|SCOPE_LEVEL|IS_ROOT|PREREQ|REASON|DEPTH_PREREQ|DEPTH_REASON):/;
  for (const line of lines) {
    if (fieldEnd.test(line)) break;
    content.push(line.replace(/^[ \t]{2}/, ''));
  }
  return content.join('\n').replace(/\s+$/, '');
}

function parseMisconceptions(block: string): any[] {
  const text = extractField(block, 'COMMON_MISCONCEPTION');
  if (!text || text.trim().length < 3) return [];
  const misconceptions: any[] = [];
  // Format 1: "Misconception N: ... Correction: ..."
  const m1 = text.match(/Misconception\s+\d+:\s*([\s\S]+?)\s*Correction:\s*([\s\S]+?)(?=Misconception\s+\d+:|$)/g);
  if (m1) {
    for (const match of m1) {
      const parts = match.match(/Misconception\s+\d+:\s*([\s\S]+?)\s*Correction:\s*([\s\S]+)/);
      if (parts) misconceptions.push({ belief: parts[1].trim(), correction: parts[2].trim() });
    }
  }
  if (misconceptions.length > 0) return misconceptions;
  // Format 2: numbered "1. "belief" ... The correction is ..."
  const m2 = text.match(/\d+\.\s*[""]([\s\S]+?)[""]\s*([\s\S]+?)(?=\d+\.\s*[""]|$)/g);
  if (m2) {
    for (const match of m2) {
      const parts = match.match(/\d+\.\s*[""]([\s\S]+?)[""]\s*([\s\S]+)/);
      if (parts) misconceptions.push({ belief: parts[1].trim(), correction: parts[2].trim() });
    }
  }
  if (misconceptions.length > 0) return misconceptions;
  // Format 3: prose with embedded "Correction:"
  if (text.includes('Correction:')) {
    const parts = text.split(/Correction:/);
    for (let i = 0; i < parts.length - 1; i++) {
      const belief = parts[i].replace(/^\d+\.\s*/, '').replace(/[""]/g, '').trim();
      const correction = parts[i + 1].split(/\d+\./)[0].trim();
      if (belief && correction) misconceptions.push({ belief, correction });
    }
  }
  return misconceptions;
}

function parseDiagnosticQuestions(block: string): any[] {
  const text = extractField(block, 'DIAGNOSTIC_QUESTION');
  if (!text || text.trim().length < 3) return [];
  const questions: any[] = [];
  const matches = text.match(/Q\d+:\s*([\s\S]+?)(?=Q\d+:|$)/g);
  if (matches) {
    for (const match of matches) {
      const q = match.replace(/^Q\d+:\s*/, '').trim();
      if (q) questions.push({ question: q });
    }
  }
  return questions;
}

// Load all nodes
const allNodes: Node[] = [];
for (const [subj, dir] of Object.entries(subjects)) {
  const enrDir = path.join('D:\\cisce', dir, 'enrichment');
  if (!fs.existsSync(enrDir)) continue;
  for (const cls of [6, 7, 8]) {
    const files = fs.readdirSync(enrDir).filter(f => f.startsWith('c' + cls + '_') && f.endsWith('.marker'));
    for (const f of files) {
      const content = fs.readFileSync(path.join(enrDir, f), 'utf8');
      const blocks = content.split(/^---\s+NODE\s+/m).slice(1);
      for (const block of blocks) {
        const headerMatch = block.match(/^(\S+)/);
        if (!headerMatch) continue;
        const nodeId = headerMatch[1];
        const title = (block.match(/^TITLE:\s*(.+)$/m) || [])[1]?.trim() || '';
        const definition = extractField(block, 'DEFINITION');
        const textWalkthrough = extractField(block, 'TEXT_WALKTHROUGH');
        const eli5 = extractField(block, 'ELI5');
        const misconceptions = parseMisconceptions(block);
        const diagnosticQuestions = parseDiagnosticQuestions(block);
        const cognitiveLevel = (block.match(/^COGNITIVE_LEVEL:\s*(.+)$/m) || [])[1]?.trim() || '';
        const masteryCriteria = extractField(block, 'MASTERY_CRITERIA');
        allNodes.push({
          nodeId, title, subject: subj, classLevel: cls,
          definition, eli5, textWalkthrough, misconceptions,
          diagnosticQuestions, cognitiveLevel, masteryCriteria,
        });
      }
    }
  }
}

console.log('Total nodes loaded:', allNodes.length);
console.log('');

// Per-subject audit
const issues: string[] = [];
for (const [subj] of Object.entries(subjects)) {
  const nodes = allNodes.filter(n => n.subject === subj);
  const noDef = nodes.filter(n => !n.definition || n.definition.trim().length < 10);
  const noEli5 = nodes.filter(n => !n.eli5 || n.eli5.trim().length < 10);
  const noMc = nodes.filter(n => n.misconceptions.length === 0);
  const noDq = nodes.filter(n => n.diagnosticQuestions.length === 0);
  const noMastery = nodes.filter(n => !n.masteryCriteria || n.masteryCriteria.trim().length < 10);
  const noWalkthrough = nodes.filter(n => !n.textWalkthrough || n.textWalkthrough.trim().length < 10);

  console.log(`=== ${subj.toUpperCase()} (${nodes.length} nodes) ===`);
  console.log(`  Missing definition: ${noDef.length}`);
  console.log(`  Missing ELI5: ${noEli5.length}`);
  console.log(`  Missing misconceptions: ${noMc.length}`);
  console.log(`  Missing diagnostic questions: ${noDq.length}`);
  console.log(`  Missing mastery criteria: ${noMastery.length}`);
  console.log(`  Missing walkthrough: ${noWalkthrough.length}`);

  if (noDef.length > 0) {
    console.log(`  DEFINITION issues:`);
    noDef.slice(0, 3).forEach(n => console.log(`    ${n.nodeId}: "${n.title.substring(0, 50)}"`));
    if (noDef.length > 3) console.log(`    ... and ${noDef.length - 3} more`);
  }
  if (noEli5.length > 0) {
    console.log(`  ELI5 issues:`);
    noEli5.slice(0, 3).forEach(n => console.log(`    ${n.nodeId}: "${n.title.substring(0, 50)}"`));
    if (noEli5.length > 3) console.log(`    ... and ${noEli5.length - 3} more`);
  }
  if (noMc.length > 0) {
    console.log(`  MISCONCEPTION issues:`);
    noMc.slice(0, 5).forEach(n => console.log(`    ${n.nodeId}: "${n.title.substring(0, 50)}"`));
    if (noMc.length > 5) console.log(`    ... and ${noMc.length - 5} more`);
  }
  if (noDq.length > 0) {
    console.log(`  DIAGNOSTIC QUESTION issues:`);
    noDq.slice(0, 5).forEach(n => console.log(`    ${n.nodeId}: "${n.title.substring(0, 50)}"`));
    if (noDq.length > 5) console.log(`    ... and ${noDq.length - 5} more`);
  }
  console.log('');
}

// Overall summary
const totalNoDef = allNodes.filter(n => !n.definition || n.definition.trim().length < 10).length;
const totalNoEli5 = allNodes.filter(n => !n.eli5 || n.eli5.trim().length < 10).length;
const totalNoMc = allNodes.filter(n => n.misconceptions.length === 0).length;
const totalNoDq = allNodes.filter(n => n.diagnosticQuestions.length === 0).length;
const totalNoMastery = allNodes.filter(n => !n.masteryCriteria || n.masteryCriteria.trim().length < 10).length;

console.log('=== OVERALL DATA QUALITY ===');
console.log(`Total nodes: ${allNodes.length}`);
console.log(`Missing definition: ${totalNoDef} (${(100*totalNoDef/allNodes.length).toFixed(1)}%)`);
console.log(`Missing ELI5: ${totalNoEli5} (${(100*totalNoEli5/allNodes.length).toFixed(1)}%)`);
console.log(`Missing misconceptions: ${totalNoMc} (${(100*totalNoMc/allNodes.length).toFixed(1)}%)`);
console.log(`Missing diagnostic questions: ${totalNoDq} (${(100*totalNoDq/allNodes.length).toFixed(1)}%)`);
console.log(`Missing mastery criteria: ${totalNoMastery} (${(100*totalNoMastery/allNodes.length).toFixed(1)}%)`);

// Template distribution check
const templateNodes: Record<string, number> = {};
for (const node of allNodes) {
  const template = inferTemplateType({ nodeId: node.nodeId, title: node.title, subject: node.subject } as any);
  templateNodes[template] = (templateNodes[template] || 0) + 1;
}
console.log('');
console.log('=== TEMPLATE DISTRIBUTION ===');
for (const [t, count] of Object.entries(templateNodes).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${t.padEnd(35)}: ${count}`);
}
console.log(`Total templates: ${Object.keys(templateNodes).length}`);
