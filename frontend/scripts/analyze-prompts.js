const fs = require('fs');
const path = require('path');
const PLAN = require('./c6_12-master-template-plan.js');

// Replicate the enrichment loader from the pipeline
const SUBJECT_DIRS = {
  phy: 'physics', math: 'maths', chem: 'chem', bio: 'bio', cs: 'cs',
  biotech: 'biotech', appmath: 'appmath', evs: 'evs',
  acc: 'acc', bs: 'bs', econ: 'econ', econapp: 'econapp',
  comm: 'comm', commapp: 'commapp', commstud: 'commstud',
  geo: 'geo', hist: 'histciv', histciv: 'histciv', pol: 'pol',
  psy: 'psy', soc: 'soc', home: 'home', legal: 'legal', massmedia: 'massmedia',
};

const cache = {};
function loadEnrichment(classNum, subjectCode) {
  const key = classNum + '_' + subjectCode;
  if (cache[key]) return cache[key];
  const subjDir = SUBJECT_DIRS[subjectCode];
  if (!subjDir) return {};
  const dir = path.join('D:\\cisce', subjDir, 'enrichment');
  if (!fs.existsSync(dir)) return {};
  const prefix = 'c' + classNum + '_';
  const nodeMap = {};
  try {
    const files = fs.readdirSync(dir).filter(f => f.startsWith(prefix) && f.endsWith('.marker'));
    for (const fn of files) {
      const content = fs.readFileSync(path.join(dir, fn), 'utf8');
      const regex = /^--- NODE (\S+) ---\r?$/gm;
      let m;
      const sections = [];
      while ((m = regex.exec(content)) !== null) {
        if (sections.length > 0) sections[sections.length-1].content = content.substring(sections[sections.length-1].startIdx, m.index).trim();
        sections.push({ nodeId: m[1], startIdx: regex.lastIndex });
      }
      if (sections.length > 0) sections[sections.length-1].content = content.substring(sections[sections.length-1].startIdx).trim();
      for (const s of sections) {
        if (!nodeMap[s.nodeId]) nodeMap[s.nodeId] = s.content;
        else nodeMap[s.nodeId] += '\n\n' + s.content;
      }
    }
  } catch (e) {}
  cache[key] = nodeMap;
  return nodeMap;
}

function getEnrichmentForNodes(nodes, classNum, subjectCode) {
  const all = loadEnrichment(classNum, subjectCode);
  const parts = [];
  for (const nodeId of nodes) {
    if (all[nodeId]) parts.push('### ' + nodeId + '\n' + all[nodeId]);
  }
  return parts.length > 0 ? parts.join('\n\n---\n\n') : null;
}

// Analyze prompt sizes for all 387 templates
const sizes = [];
for (const t of PLAN) {
  const enrichment = getEnrichmentForNodes(t.nodes, t.class, t.subject);
  const enrichmentSize = enrichment ? enrichment.length : 0;
  
  // Base prompt (instructions, API docs, requirements) is ~8KB
  // Per node: ~0.3KB for node ID + description
  // Enrichment: varies
  const nodeInfoSize = t.nodes.length * 300;
  const basePromptSize = 8000;
  const estimatedPromptSize = basePromptSize + nodeInfoSize + enrichmentSize;
  
  sizes.push({
    id: t.id,
    class: t.class,
    subject: t.subject,
    nodes: t.nodes.length,
    enrichmentKB: Math.round(enrichmentSize / 1024),
    estimatedPromptKB: Math.round(estimatedPromptSize / 1024),
  });
}

// Sort by size
sizes.sort((a, b) => b.estimatedPromptKB - a.estimatedPromptKB);

console.log('=== PROMPT SIZE ANALYSIS (all 387 templates) ===');
console.log('');
console.log('Biggest 10 prompts:');
sizes.slice(0, 10).forEach(s => {
  console.log('  ' + s.id + ' | C' + s.class + ' ' + s.subject + ' | ' + s.nodes + ' nodes | enrichment: ' + s.enrichmentKB + 'KB | est prompt: ' + s.estimatedPromptKB + 'KB');
});

console.log('');
console.log('Smallest 10 prompts:');
sizes.slice(-10).forEach(s => {
  console.log('  ' + s.id + ' | C' + s.class + ' ' + s.subject + ' | ' + s.nodes + ' nodes | enrichment: ' + s.enrichmentKB + 'KB | est prompt: ' + s.estimatedPromptKB + 'KB');
});

console.log('');
const avg = sizes.reduce((a, s) => a + s.estimatedPromptKB, 0) / sizes.length;
const min = Math.min(...sizes.map(s => s.estimatedPromptKB));
const max = Math.max(...sizes.map(s => s.estimatedPromptKB));
console.log('Min: ' + min + 'KB | Max: ' + max + 'KB | Avg: ' + Math.round(avg) + 'KB');

// Distribution
const buckets = { '<20KB': 0, '20-50KB': 0, '50-100KB': 0, '100-150KB': 0, '150-200KB': 0, '>200KB': 0 };
for (const s of sizes) {
  if (s.estimatedPromptKB < 20) buckets['<20KB']++;
  else if (s.estimatedPromptKB < 50) buckets['20-50KB']++;
  else if (s.estimatedPromptKB < 100) buckets['50-100KB']++;
  else if (s.estimatedPromptKB < 150) buckets['100-150KB']++;
  else if (s.estimatedPromptKB < 200) buckets['150-200KB']++;
  else buckets['>200KB']++;
}
console.log('');
console.log('Distribution:');
for (const [b, c] of Object.entries(buckets)) {
  console.log('  ' + b + ': ' + c + ' templates');
}

// Check what's IN the enrichment for a 150KB template
console.log('');
console.log('=== ENRICHMENT CONTENT BREAKDOWN for biggest template ===');
const biggest = sizes[0];
const enrichment = getEnrichmentForNodes(
  PLAN.find(t => t.id === biggest.id).nodes,
  biggest.class,
  biggest.subject
);
if (enrichment) {
  // Count sections
  const sections = enrichment.split(/^### /m);
  console.log('Nodes with enrichment:', sections.length - 1);
  // Check what fields are present
  const fields = ['TITLE:', 'DEFINITION:', 'TEXT_WALKTHROUGH:', 'ELI5:', 'COMMON_MISCONCEPTION:', 'DIAGNOSTIC_QUESTION:', 'REAL_WORLD_ACTIVITY:', 'REFLECTION_PROMPT:'];
  for (const field of fields) {
    const count = (enrichment.match(new RegExp(field, 'g')) || []).length;
    console.log('  ' + field + ' ' + count + ' occurrences');
  }
  // Sample one node's enrichment
  const firstNode = enrichment.split(/^### /m)[1];
  if (firstNode) {
    console.log('');
    console.log('Sample (first 500 chars of first node enrichment):');
    console.log(firstNode.substring(0, 500));
  }
}
