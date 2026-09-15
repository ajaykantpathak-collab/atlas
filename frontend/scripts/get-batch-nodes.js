// Helper: extract node data for a specific batch and save to a temp file
// Usage: node scripts/get-batch-nodes.js <batchIdx> <outputFile>
const fs = require('fs');
const path = require('path');

const CISCE_DIR = 'D:\\cisce';
const BATCH_SIZE = 15;

const SUBJECT_DIRS = {
  physics: 'physics', maths: 'maths', chem: 'chem', bio: 'bio', cs: 'cs',
  biotech: 'biotech', appmath: 'appmath', evs: 'evs',
  acc: 'acc', bs: 'bs', econ: 'econ', econapp: 'econapp',
  comm: 'comm', commapp: 'commapp', commstud: 'commstud',
  geo: 'geo', histciv: 'histciv', pol: 'pol',
  psy: 'psy', soc: 'soc', home: 'home', legal: 'legal', massmedia: 'massmedia',
};

function extractField(rawContent, name) {
  const regex = new RegExp('^' + name + ':\\s*(?:\\|\\s*\\n)?([\\s\\S]*?)(?=^\\w+:|$)', 'm');
  const m = rawContent.match(regex);
  if (!m) return '';
  return m[1].trim().replace(/^  /gm, '');
}

function loadAllNodes() {
  const allNodes = [];
  for (const subj of Object.keys(SUBJECT_DIRS)) {
    const enrDir = path.join(CISCE_DIR, subj, 'enrichment');
    if (!fs.existsSync(enrDir)) continue;
    const files = fs.readdirSync(enrDir).filter(f => f.endsWith('.marker'));
    for (const fileName of files) {
      const content = fs.readFileSync(path.join(enrDir, fileName), 'utf8');
      const nodeRegex = /^--- NODE (\S+) ---\r?$/gm;
      let match;
      const sections = [];
      while ((match = nodeRegex.exec(content)) !== null) {
        if (sections.length > 0) {
          sections[sections.length - 1].content = content.substring(
            sections[sections.length - 1].startIdx, match.index
          ).trim();
        }
        sections.push({ nodeId: match[1], startIdx: nodeRegex.lastIndex });
      }
      if (sections.length > 0) {
        sections[sections.length - 1].content = content.substring(
          sections[sections.length - 1].startIdx
        ).trim();
      }
      for (const section of sections) {
        const parsed = {
          node_id: section.nodeId,
          title: extractField(section.content, 'TITLE').split('\n')[0].trim(),
          eli5: extractField(section.content, 'ELI5'),
          common_misconception: extractField(section.content, 'COMMON_MISCONCEPTION'),
          diagnostic_question: extractField(section.content, 'DIAGNOSTIC_QUESTION'),
          cognitive_level: extractField(section.content, 'COGNITIVE_LEVEL'),
        };
        parsed.subject = subj;
        const classMatch = section.nodeId.match(/^c(\d+)_/);
        parsed.class_level = classMatch ? parseInt(classMatch[1], 10) : null;
        if (parsed.title) allNodes.push(parsed);
      }
    }
  }
  return allNodes;
}

function condenseNode(node) {
  return {
    node_id: node.node_id,
    subject: node.subject,
    class_level: node.class_level,
    title: node.title,
    cognitive_level: node.cognitive_level || '',
    eli5_excerpt: (node.eli5 || '').substring(0, 200),
    misconception_excerpt: (node.common_misconception || '').substring(0, 400),
    diagnostic_excerpt: (node.diagnostic_question || '').substring(0, 300),
  };
}

const batchIdx = parseInt(process.argv[2] || '0', 10);
const outputFile = process.argv[3] || `D:\\dream_app\\tutor-brain\\batch_${String(batchIdx).padStart(4, '0')}_input.json`;

const allNodes = loadAllNodes();
const start = batchIdx * BATCH_SIZE;
const batch = allNodes.slice(start, start + BATCH_SIZE);
const condensed = batch.map(condenseNode);

fs.writeFileSync(outputFile, JSON.stringify(condensed, null, 2));
console.log(`Batch ${batchIdx}: ${condensed.length} nodes written to ${outputFile}`);
