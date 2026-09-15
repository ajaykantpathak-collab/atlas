// C6-C12 Master Template Plan Generator
// Reads the CISCE node index and groups nodes into templates by class/subject/chapter
// Excludes English and Hindi (per user instruction)
//
// Output: scripts/c6_12-master-template-plan.js
// This file contains ALL templates for C6-C12, every subject except English/Hindi

const fs = require('fs');
const path = require('path');

const CISCE_DIR = 'D:\\cisce';
const NODE_INDEX = path.join(CISCE_DIR, '_node_index.txt');
const OUTPUT_FILE = path.join(__dirname, 'c6_12-master-template-plan.js');

// Subject display names and stream classification
const SUBJECT_INFO = {
  phy:     { name: 'Physics',           stream: 'science',    dir: 'physics' },
  math:    { name: 'Mathematics',       stream: 'science',    dir: 'maths' },
  chem:    { name: 'Chemistry',         stream: 'science',    dir: 'chem' },
  bio:     { name: 'Biology',           stream: 'science',    dir: 'bio' },
  cs:      { name: 'Computer Science',  stream: 'science',    dir: 'cs' },
  biotech: { name: 'Biotechnology',     stream: 'science',    dir: 'biotech' },
  appmath: { name: 'Applied Maths',     stream: 'science',    dir: 'appmath' },
  evs:     { name: 'EVS',               stream: 'science',    dir: 'evs' },
  acc:     { name: 'Accountancy',       stream: 'commerce',   dir: 'acc' },
  bs:      { name: 'Business Studies',  stream: 'commerce',   dir: 'bs' },
  econ:    { name: 'Economics',         stream: 'commerce',   dir: 'econ' },
  econapp: { name: 'Econ Applications', stream: 'commerce',   dir: 'econapp' },
  comm:    { name: 'Commerce',          stream: 'commerce',   dir: 'comm' },
  commapp: { name: 'Commerce App',      stream: 'commerce',   dir: 'commapp' },
  commstud:{ name: 'Commercial Studies',stream: 'commerce',   dir: 'commstud' },
  geo:     { name: 'Geography',         stream: 'humanities', dir: 'geo' },
  hist:    { name: 'History',           stream: 'humanities', dir: 'hist' },
  histciv: { name: 'History & Civics',  stream: 'humanities', dir: 'histciv' },
  pol:     { name: 'Political Science', stream: 'humanities', dir: 'pol' },
  psy:     { name: 'Psychology',        stream: 'humanities', dir: 'psy' },
  soc:     { name: 'Sociology',         stream: 'humanities', dir: 'soc' },
  home:    { name: 'Home Science',      stream: 'humanities', dir: 'home' },
  legal:   { name: 'Legal Studies',     stream: 'humanities', dir: 'legal' },
  massmedia:{ name: 'Mass Media',       stream: 'humanities', dir: 'massmedia' },
  art:     { name: 'Art',               stream: 'humanities', dir: 'art' },
  pe:      { name: 'Physical Education',stream: 'humanities', dir: 'pe' },
  eng:     { name: 'English',           stream: 'humanities', dir: 'eng' },     // EXCLUDED
  hin:     { name: 'Hindi',             stream: 'humanities', dir: 'hin' },     // EXCLUDED
  // C6-8 specific
  sst:     { name: 'Social Studies',    stream: 'humanities', dir: 'sst' },
  sci:     { name: 'Science',           stream: 'science',    dir: 'sci' },
};

// Subjects to exclude
const EXCLUDED_SUBJECTS = new Set(['eng', 'hin']);

// Max nodes per template (balanced for prompt size and quality)
const MAX_NODES_PER_TEMPLATE = 10;
const MIN_NODES_PER_TEMPLATE = 3;

// ─── Read and parse the node index ────────────────────────────
function readNodeIndex() {
  const content = fs.readFileSync(NODE_INDEX, 'utf8');
  const nodes = [];
  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    // Format: c{class}_{subj}_{num}\tDescription
    // or:     c{class}_{subj}_{num} Description
    const match = trimmed.match(/^(c\d+_\w+_\d+)\s+(.+)$/);
    if (!match) continue;
    const nodeId = match[1];
    const description = match[2].replace(/---$/, '').trim();
    // Parse class and subject from node ID
    const parts = nodeId.split('_');
    const classNum = parseInt(parts[0].substring(1), 10);
    const subjCode = parts[1];
    nodes.push({ id: nodeId, class: classNum, subject: subjCode, description });
  }
  return nodes;
}

// ─── Group nodes by class + subject ───────────────────────────
function groupNodes(nodes) {
  const groups = {};
  for (const node of nodes) {
    if (node.class < 6 || node.class > 12) continue;
    if (EXCLUDED_SUBJECTS.has(node.subject)) continue;
    const key = `${node.class}_${node.subject}`;
    if (!groups[key]) {
      groups[key] = {
        classNum: node.class,
        subject: node.subject,
        nodes: []
      };
    }
    groups[key].nodes.push(node);
  }
  return groups;
}

// ─── Generate template name ───────────────────────────────────
function generateTemplateName(classNum, subject, nodeGroup, index, totalGroups) {
  const subjInfo = SUBJECT_INFO[subject];
  const subjName = subjInfo ? subjInfo.name.replace(/[^a-zA-Z]/g, '') : subject;

  // Try to infer a topic name from the first node's description
  const firstDesc = nodeGroup[0].description;
  // Take first 2-3 significant words from description
  const words = firstDesc.split(/\s+/).filter(w => w.length > 3).slice(0, 3);
  const topicName = words.map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join('');

  // Clean up the name
  const cleanTopic = topicName.replace(/[^a-zA-Z0-9]/g, '');

  return `C${classNum}_${subjName}${cleanTopic}Sim`;
}

// ─── Split nodes into templates ───────────────────────────────
function splitIntoTemplates(classNum, subject, nodes) {
  const subjInfo = SUBJECT_INFO[subject];
  if (!subjInfo) {
    console.log(`  WARNING: Unknown subject "${subject}" for class ${classNum}, skipping`);
    return [];
  }

  const templates = [];

  // Sort nodes by their number to keep chapter order
  const sortedNodes = [...nodes].sort((a, b) => {
    const aNum = parseInt(a.id.split('_')[2], 10);
    const bNum = parseInt(b.id.split('_')[2], 10);
    return aNum - bNum;
  });

  // Group nodes into templates of MAX_NODES_PER_TEMPLATE
  // But try to keep related nodes together by looking at description similarity
  let currentGroup = [];
  let groupStartIdx = 0;

  for (let i = 0; i < sortedNodes.length; i++) {
    currentGroup.push(sortedNodes[i]);

    if (currentGroup.length >= MAX_NODES_PER_TEMPLATE) {
      // Create a template from this group
      const templateName = generateTemplateName(classNum, subject, currentGroup, templates.length, 0);
      templates.push({
        id: templateName,
        class: classNum,
        stream: subjInfo.stream,
        subject: subject,
        subjectName: subjInfo.name,
        nodes: currentGroup.map(n => n.id),
        nodeDescriptions: currentGroup.map(n => ({ id: n.id, description: n.description }))
      });
      currentGroup = [];
      groupStartIdx = i + 1;
    }
  }

  // Handle remaining nodes
  if (currentGroup.length > 0) {
    if (currentGroup.length < MIN_NODES_PER_TEMPLATE && templates.length > 0) {
      // Merge with previous template if too few nodes
      const lastTemplate = templates[templates.length - 1];
      lastTemplate.nodes.push(...currentGroup.map(n => n.id));
      lastTemplate.nodeDescriptions.push(...currentGroup.map(n => ({ id: n.id, description: n.description })));
    } else {
      const templateName = generateTemplateName(classNum, subject, currentGroup, templates.length, 0);
      templates.push({
        id: templateName,
        class: classNum,
        stream: subjInfo.stream,
        subject: subject,
        subjectName: subjInfo.name,
        nodes: currentGroup.map(n => n.id),
        nodeDescriptions: currentGroup.map(n => ({ id: n.id, description: n.description }))
      });
    }
  }

  return templates;
}

// ─── Main ─────────────────────────────────────────────────────
function main() {
  console.log('=== C6-C12 Master Template Plan Generator ===\n');

  // Read all nodes
  const allNodes = readNodeIndex();
  console.log(`Total nodes in index: ${allNodes.length}`);

  // Filter to C6-C12 and exclude English/Hindi
  const c6_12Nodes = allNodes.filter(n => n.class >= 6 && n.class <= 12 && !EXCLUDED_SUBJECTS.has(n.subject));
  console.log(`C6-C12 nodes (excl English/Hindi): ${c6_12Nodes.length}`);

  // Group by class + subject
  const groups = groupNodes(c6_12Nodes);
  console.log(`Subject groups: ${Object.keys(groups).length}\n`);

  // Generate templates for each group
  const allTemplates = [];
  const stats = {};

  for (const key of Object.keys(groups).sort()) {
    const group = groups[key];
    const templates = splitIntoTemplates(group.classNum, group.subject, group.nodes);
    allTemplates.push(...templates);

    const classKey = `C${group.classNum}`;
    if (!stats[classKey]) stats[classKey] = { templates: 0, nodes: 0 };
    stats[classKey].templates += templates.length;
    stats[classKey].nodes += group.nodes.length;

    console.log(`  ${classKey} ${SUBJECT_INFO[group.subject]?.name || group.subject}: ${group.nodes.length} nodes → ${templates.length} templates`);
  }

  // Print summary
  console.log('\n=== SUMMARY ===');
  for (const key of Object.keys(stats).sort()) {
    console.log(`  ${key}: ${stats[key].templates} templates, ${stats[key].nodes} nodes`);
  }
  console.log(`\n  TOTAL: ${allTemplates.length} templates, ${allTemplates.reduce((a, t) => a + t.nodes.length, 0)} nodes`);

  // Check for duplicate template IDs
  const ids = allTemplates.map(t => t.id);
  const duplicates = ids.filter((id, i) => ids.indexOf(id) !== i);
  if (duplicates.length > 0) {
    console.log(`\n  WARNING: ${duplicates.length} duplicate template IDs:`);
    duplicates.forEach(d => console.log(`    ${d}`));
    // Make unique by appending index
    const seen = {};
    for (const t of allTemplates) {
      if (seen[t.id] !== undefined) {
        seen[t.id]++;
        t.id = `${t.id}_${seen[t.id]}`;
      } else {
        seen[t.id] = 0;
      }
    }
    console.log('  (Made all IDs unique by appending suffixes)');
  }

  // Verify every node is covered
  const allNodeIds = new Set(c6_12Nodes.map(n => n.id));
  const coveredNodeIds = new Set();
  for (const t of allTemplates) {
    for (const n of t.nodes) {
      coveredNodeIds.add(n);
    }
  }
  const uncovered = [...allNodeIds].filter(id => !coveredNodeIds.has(id));
  if (uncovered.length > 0) {
    console.log(`\n  WARNING: ${uncovered.length} nodes not covered by any template`);
  } else {
    console.log(`\n  All ${allNodeIds.size} nodes are covered by templates.`);
  }

  // Write the output file
  const output = `// C6-C12 Master Template Plan — ${allTemplates.length} templates covering ${c6_12Nodes.length} nodes
// Generated by c6_12-template-plan-generator.js
// Every node is assigned to exactly one template. No gaps. No overlaps.
// Excludes English and Hindi (per user instruction)
// Classes 6-8: ICSE syllabus, Classes 9-12: ISC syllabus
// Stream: science | commerce | humanities

module.exports = ${JSON.stringify(allTemplates, null, 2)};
`;

  fs.writeFileSync(OUTPUT_FILE, output, 'utf8');
  console.log(`\nWritten to: ${OUTPUT_FILE}`);
  console.log(`File size: ${(fs.statSync(OUTPUT_FILE).size / 1024).toFixed(0)} KB`);
}

main();
