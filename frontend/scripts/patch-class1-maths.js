/* ═══════════════════════════════════════════════════════════════════════════
   patch-class1-maths.js — Segregate Class 1 Maths content to per-node files.

   SAFETY:
   - Only READS from D:\cisce (never modifies originals)
   - Only WRITES to D:\dream_app\patched\class1\maths\
   - Generates a verification report at D:\dream_app\patched\class1\maths\REPORT.md

   WHAT IT DOES:
   1. Copies enrichment files as-is (already node-based)
   2. Splits non-enrichment files by section headers
   3. Maps each section to node_id(s) using mapping tables
   4. Writes per-node files: <node_id>_<content_type>.marker
   5. Flags gaps: nodes with no questions, no drills, etc.
   ═══════════════════════════════════════════════════════════════════════════ */

const fs = require('fs');
const path = require('path');

// ─── Paths ────────────────────────────────────────────────────
const SOURCE = 'D:\\cisce\\maths';
const OUTPUT = 'D:\\dream_app\\patched\\class1\\maths';

// ─── Node mapping table (28 nodes) ────────────────────────────
const NODES = [
  { id: 'c1_math_001', title: 'Numbers and numerals from 1 to 20', topicNum: 1 },
  { id: 'c1_math_002', title: 'Introduction to Zero through a subtraction pattern', topicNum: 2 },
  { id: 'c1_math_003', title: 'Counting objects from 1 to 99 by making groups leading to tens and ones', topicNum: 3 },
  { id: 'c1_math_004', title: 'Representing a number in groups of tens and ones', topicNum: 4 },
  { id: 'c1_math_005', title: 'Numeral and number names up to 99', topicNum: 5 },
  { id: 'c1_math_006', title: 'Comparison of numbers up to 99', topicNum: 6 },
  { id: 'c1_math_007', title: 'Forming two digit numbers using the given digits (with or without repetition)', topicNum: 7 },
  { id: 'c1_math_008', title: 'Sequences of numbers up to 99 in an increasing or decreasing order', topicNum: 8 },
  { id: 'c1_math_009', title: 'Before, after and in between numbers', topicNum: 9 },
  { id: 'c1_math_010', title: 'Addition and subtraction up to 20 (in steps - first up to 9, then up to 20)', topicNum: 10 },
  { id: 'c1_math_011', title: 'Addition and subtraction of numbers within 99 without regrouping', topicNum: 11 },
  { id: 'c1_math_012', title: 'Solving problems presented through pictures and verbal descriptions by addition and subtraction', topicNum: 12 },
  { id: 'c1_math_013', title: 'Sorting, classification and description of shapes on the basis of observable properties', topicNum: 13 },
  { id: 'c1_math_014', title: 'Basic 3D shapes - cuboid, cylinder, cone, sphere by their observable properties and names', topicNum: 14 },
  { id: 'c1_math_015', title: '2-D shapes as outlines of the surfaces of 3-D shapes on paper or flat surface', topicNum: 15 },
  { id: 'c1_math_016', title: '2D shapes - rectangle, square, triangle, circle, line', topicNum: 16 },
  { id: 'c1_math_017', title: 'Length - introduction to vocabulary like near, far, thin, thick, longer/taller, shorter, high, low', topicNum: 17 },
  { id: 'c1_math_018', title: 'Compare lengths of objects and arrange in order', topicNum: 18 },
  { id: 'c1_math_019', title: 'Measure short lengths using non-standard units (e.g. hand span)', topicNum: 19 },
  { id: 'c1_math_020', title: 'Estimation of short distances and their verification using non-uniform units', topicNum: 20 },
  { id: 'c1_math_021', title: 'Weight - compare heavy and light objects', topicNum: 21 },
  { id: 'c1_math_022', title: 'Volume (Capacity) - order different containers in terms of their capacity', topicNum: 22 },
  { id: 'c1_math_023', title: 'Time - distinguish between events using vocabulary like earlier-later', topicNum: 23 },
  { id: 'c1_math_024', title: 'Time - differentiate between events of short and long duration', topicNum: 24 },
  { id: 'c1_math_025', title: 'Time - verbal description of the sequence of events happening in a day', topicNum: 25 },
  { id: 'c1_math_026', title: 'Collection, representation and interpretation of simple information presented in a visual or by actual measurement', topicNum: 26 },
  { id: 'c1_math_027', title: 'Simple patterns in shapes and numbers in the surroundings - their observation and extension', topicNum: 27 },
  { id: 'c1_math_028', title: 'Patterns from daily life experiences', topicNum: 28 },
];

// Map topicNum → node_id
const TOPIC_TO_NODE = {};
NODES.forEach(n => { TOPIC_TO_NODE[n.topicNum] = n.id; });

// ─── Question bank topic → node mapping (8 topics → node ranges) ──
const QBANK_TOPIC_TO_NODES = {
  1: ['c1_math_001', 'c1_math_002', 'c1_math_003', 'c1_math_004', 'c1_math_005'],
  2: ['c1_math_006'],
  3: ['c1_math_007'],
  4: ['c1_math_008'],
  5: ['c1_math_009'],
  6: ['c1_math_010'],
  7: ['c1_math_011', 'c1_math_012'],
  8: ['c1_math_013', 'c1_math_014', 'c1_math_015', 'c1_math_016'],
};

// ─── Practice topic → node mapping (18 topics) ────────────────
const PRACTICE_TOPIC_TO_NODES = {
  1:  ['c1_math_001'],
  2:  ['c1_math_010'],
  3:  ['c1_math_010'],
  4:  ['c1_math_013', 'c1_math_014', 'c1_math_015', 'c1_math_016'],
  5:  ['c1_math_027', 'c1_math_028'],
  6:  ['c1_math_012'],
  7:  ['c1_math_009'],
  8:  ['c1_math_005'],
  9:  ['c1_math_010', 'c1_math_011'],
  10: ['c1_math_012'],
  11: ['c1_math_004'],
  12: ['c1_math_016'],
  13: ['c1_math_027'],
  14: ['c1_math_012'],
  15: ['c1_math_006'],
  16: ['c1_math_002'],
  17: ['c1_math_013'],
  18: ['c1_math_027', 'c1_math_028'],
};

// ─── CFQ SET → node mapping (6 sets) ──────────────────────────
const CFQ_TO_NODES = {
  1: ['c1_math_006'],
  2: ['c1_math_007'],
  3: ['c1_math_010'],
  4: ['c1_math_013', 'c1_math_014', 'c1_math_015', 'c1_math_016'],
  5: ['c1_math_017', 'c1_math_018', 'c1_math_019', 'c1_math_020', 'c1_math_021', 'c1_math_022', 'c1_math_023', 'c1_math_024', 'c1_math_025'],
  6: ['c1_math_026', 'c1_math_027', 'c1_math_028'],
};

// ─── Worked example → node mapping (by content analysis) ──────
const EXAMPLE_TO_NODES = {
  1:  ['c1_math_011'],  // Addition with Carry (47+25)
  2:  ['c1_math_011'],  // Subtraction with Borrow (56-38)
  3:  ['c1_math_012'],  // Word Problem -- Adding Fruits
  4:  ['c1_math_012'],  // Word Problem -- Subtracting Balloons
  5:  ['c1_math_027'],  // Number Patterns -- Counting by 2
  6:  ['c1_math_008'],  // Number Patterns -- Growing by 1
  7:  ['c1_math_012'],  // Word Problem -- Combining Two Groups
  8:  ['c1_math_012'],  // Subtraction Word Problem -- Spending Money
  9:  ['c1_math_027'],  // Pattern -- Decreasing by 5
  10: ['c1_math_011'],  // Addition with Three Numbers
  11: ['c1_math_006'],  // Comparing Numbers -- Greater or Less
  12: ['c1_math_027'],  // Number Patterns -- Counting by 10
  13: ['c1_math_016'],  // Shapes -- Counting Sides and Corners
  14: ['c1_math_012'],  // Word Problem -- Adding Two Groups with Carry
  15: ['c1_math_012'],  // Word Problem -- Subtraction with Borrow
  16: ['c1_math_016'],  // Identifying Shapes -- Triangle
};

// ─── Real world application → node mapping (from Concept: lines) ──
const APP_TO_NODES = {
  1:  ['c1_math_001'],
  2:  ['c1_math_006'],
  3:  ['c1_math_007'],
  4:  ['c1_math_008'],
  5:  ['c1_math_009'],
  6:  ['c1_math_010'],
  7:  ['c1_math_011', 'c1_math_012'],
  8:  ['c1_math_013', 'c1_math_014', 'c1_math_015', 'c1_math_016'],
  9:  ['c1_math_017', 'c1_math_018', 'c1_math_019', 'c1_math_020'],
  10: ['c1_math_021'],
  11: ['c1_math_022'],
  12: ['c1_math_023', 'c1_math_024', 'c1_math_025'],
  13: ['c1_math_026'],
  14: ['c1_math_027', 'c1_math_028'],
  15: ['c1_math_001', 'c1_math_010'],
  16: ['c1_math_006', 'c1_math_008'],
  17: ['c1_math_010'],
  18: ['c1_math_013', 'c1_math_014', 'c1_math_015', 'c1_math_016'],
  19: ['c1_math_017', 'c1_math_018', 'c1_math_019', 'c1_math_020'],
  20: ['c1_math_021'],
  21: ['c1_math_022'],
  22: ['c1_math_023', 'c1_math_024', 'c1_math_025'],
  23: ['c1_math_026'],
  24: ['c1_math_027', 'c1_math_028'],
  25: ['c1_math_001', 'c1_math_017', 'c1_math_018', 'c1_math_019', 'c1_math_020'],
};

// ─── Silly mistake → node mapping (by content analysis) ───────
const MISTAKE_TO_NODES = {
  1:  ['c1_math_001', 'c1_math_005'],  // Copying wrong number
  2:  ['c1_math_001', 'c1_math_005'],  // Writing digits in reverse order
  3:  ['c1_math_001', 'c1_math_005'],  // Writing 6 as 0, 9 as 4
  4:  ['c1_math_010'],  // Mixing up + and - signs
  5:  ['c1_math_010'],  // Forgetting the sign
  6:  ['c1_math_010'],  // Counting on the wrong way
  7:  ['c1_math_010'],  // Forgetting to count one number
  8:  ['c1_math_010'],  // Wrong total from finger miscount
  9:  ['c1_math_002'],  // Adding instead of writing bigger when zero
  10: ['c1_math_010'],  // Subtracting in wrong order
  11: ['c1_math_008'],  // Counting backwards and skipping
  12: ['c1_math_010'],  // Writing answer as number taken away
  13: ['c1_math_006'],  // Confusing greater than and less than
  14: ['c1_math_006'],  // Writing wrong symbol for comparison
  15: ['c1_math_009'],  // Forgetting "before" means smaller
  16: ['c1_math_008'],  // Skipping a number in sequence
  17: ['c1_math_007'],  // Forgetting repetition is allowed
  18: ['c1_math_007'],  // Writing same number twice as different
  19: ['c1_math_007'],  // Missing one combination
  20: ['c1_math_017', 'c1_math_018'],  // Mixing up longer and shorter
  21: ['c1_math_019'],  // Forgetting to start from zero on scale
  22: ['c1_math_021'],  // Mixing up heavy and light
  23: ['c1_math_022'],  // Confusing more and less for capacity
  24: ['c1_math_023', 'c1_math_024', 'c1_math_025'],  // Mixing up day and night
  25: ['c1_math_023', 'c1_math_024', 'c1_math_025'],  // Forgetting order of days
  26: ['c1_math_026'],  // Counting same picture twice in pictograph
  27: ['c1_math_026'],  // Writing wrong number from tally
  28: ['c1_math_027', 'c1_math_028'],  // Continuing pattern with wrong shape
  29: ['c1_math_027', 'c1_math_028'],  // Skipping a step in number pattern
  30: ['c1_math_013', 'c1_math_016'],  // Mixing up circle and square
};

// ─── Step-by-step teach UNIT → node mapping ───────────────────
const UNIT_TO_NODES = {
  1: ['c1_math_001', 'c1_math_002', 'c1_math_003', 'c1_math_004', 'c1_math_005', 'c1_math_006', 'c1_math_007', 'c1_math_008', 'c1_math_009'],
  2: ['c1_math_010', 'c1_math_011', 'c1_math_012'],
  3: ['c1_math_013', 'c1_math_014', 'c1_math_015', 'c1_math_016'],
  4: ['c1_math_017', 'c1_math_018', 'c1_math_019', 'c1_math_020', 'c1_math_021', 'c1_math_022'],
  5: ['c1_math_023', 'c1_math_024', 'c1_math_025'],
  6: ['c1_math_026'],
  7: ['c1_math_027', 'c1_math_028'],
};

// ─── Content types that are class-level (not split by node) ───
const CLASS_LEVEL_TYPES = [
  '90_tracker', 'blueprint', 'board_style_questions', 'crash_course',
  'cross_topic_connections', 'exam_survival', 'exam_technique',
  'high_yield_guides', 'night_before', 'practice_tests',
  'prerequisite_check', 'revision_sheets', 'solution_templates',
  'spiral_review', 'summaries', 'teaching', 'why_this_matters',
  'concept_connection', 'model_answers', 'pp_text', 'pp_comments',
  'question_papers', 'question_papers_clean', 'mock_papers', 'evidence',
];

// ─── Helpers ──────────────────────────────────────────────────
function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function writeFile(filePath, content) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, content, 'utf8');
}

function readMarker(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

// ─── Split file by 28-topic headers (TOPIC 1-28) ──────────────
function splitBy28Topics(content, contentType) {
  const sections = {};
  // Match: ====... followed by TOPIC N: ... followed by ====...
  const regex = /={5,}\s*\n\s*TOPIC\s+(\d+):\s*([^\n]*)\n\s*={5,}/g;
  let match;
  let lastIdx = 0;
  let positions = [];

  while ((match = regex.exec(content)) !== null) {
    positions.push({ topicNum: parseInt(match[1]), title: match[2].trim(), start: match.index });
    lastIdx = regex.lastIndex;
  }

  // If no matches, return whole content as unassigned
  if (positions.length === 0) {
    return { unassigned: content };
  }

  // Extract content between headers
  for (let i = 0; i < positions.length; i++) {
    const start = positions[i].start;
    const end = i + 1 < positions.length ? positions[i + 1].start : content.length;
    const sectionContent = content.substring(start, end).trim();
    const topicNum = positions[i].topicNum;
    const nodeId = TOPIC_TO_NODE[topicNum];
    if (nodeId) {
      if (!sections[nodeId]) sections[nodeId] = [];
      sections[nodeId].push({ contentType, topicTitle: positions[i].title, content: sectionContent });
    } else {
      console.warn(`  WARNING: No node for TOPIC ${topicNum}`);
    }
  }

  return sections;
}

// ─── Split question bank by 8-topic headers ───────────────────
function splitByQBankTopics(content, contentType) {
  const sections = {};
  const regex = /={3,}\s*TOPIC\s+(\d+):\s*([^\n=]*)\s*={3,}/g;
  let match;
  let positions = [];

  while ((match = regex.exec(content)) !== null) {
    positions.push({ topicNum: parseInt(match[1]), title: match[2].trim(), start: match.index });
  }

  if (positions.length === 0) {
    return { unassigned: content };
  }

  for (let i = 0; i < positions.length; i++) {
    const start = positions[i].start;
    const end = i + 1 < positions.length ? positions[i + 1].start : content.length;
    const sectionContent = content.substring(start, end).trim();
    const topicNum = positions[i].topicNum;
    const nodeIds = QBANK_TOPIC_TO_NODES[topicNum] || [];
    nodeIds.forEach(nodeId => {
      if (!sections[nodeId]) sections[nodeId] = [];
      sections[nodeId].push({ contentType, topicTitle: positions[i].title, content: sectionContent });
    });
  }

  return sections;
}

// ─── Split practice by 18-topic headers ───────────────────────
function splitByPracticeTopics(content, contentType) {
  const sections = {};
  const regex = /={5,}\s*\n\s*TOPIC\s+(\d+):\s*([^\n]*)\n\s*={5,}/g;
  let match;
  let positions = [];

  while ((match = regex.exec(content)) !== null) {
    positions.push({ topicNum: parseInt(match[1]), title: match[2].trim(), start: match.index });
  }

  if (positions.length === 0) {
    return { unassigned: content };
  }

  for (let i = 0; i < positions.length; i++) {
    const start = positions[i].start;
    const end = i + 1 < positions.length ? positions[i + 1].start : content.length;
    const sectionContent = content.substring(start, end).trim();
    const topicNum = positions[i].topicNum;
    const nodeIds = PRACTICE_TOPIC_TO_NODES[topicNum] || [];
    nodeIds.forEach(nodeId => {
      if (!sections[nodeId]) sections[nodeId] = [];
      sections[nodeId].push({ contentType, topicTitle: positions[i].title, content: sectionContent });
    });
  }

  return sections;
}

// ─── Split CFQ diagnostics by CFQ SET headers ─────────────────
function splitByCFQSets(content, contentType) {
  const sections = {};
  const regex = /CFQ\s+SET\s+(\d+):[^\n]*/g;
  let match;
  let positions = [];

  while ((match = regex.exec(content)) !== null) {
    positions.push({ setNum: parseInt(match[1]), title: match[0].trim(), start: match.index });
  }

  if (positions.length === 0) {
    return { unassigned: content };
  }

  for (let i = 0; i < positions.length; i++) {
    const start = positions[i].start;
    const end = i + 1 < positions.length ? positions[i + 1].start : content.length;
    const sectionContent = content.substring(start, end).trim();
    const setNum = positions[i].setNum;
    const nodeIds = CFQ_TO_NODES[setNum] || [];
    nodeIds.forEach(nodeId => {
      if (!sections[nodeId]) sections[nodeId] = [];
      sections[nodeId].push({ contentType, topicTitle: positions[i].title, content: sectionContent });
    });
  }

  return sections;
}

// ─── Split worked examples by EXAMPLE N headers ───────────────
function splitByExamples(content, contentType) {
  const sections = {};
  const regex = /={3,}\s*EXAMPLE\s+(\d+):\s*([^\n]*)\s*={3,}/g;
  let match;
  let positions = [];

  while ((match = regex.exec(content)) !== null) {
    positions.push({ exampleNum: parseInt(match[1]), title: match[2].trim(), start: match.index });
  }

  if (positions.length === 0) {
    return { unassigned: content };
  }

  for (let i = 0; i < positions.length; i++) {
    const start = positions[i].start;
    const end = i + 1 < positions.length ? positions[i + 1].start : content.length;
    const sectionContent = content.substring(start, end).trim();
    const exampleNum = positions[i].exampleNum;
    const nodeIds = EXAMPLE_TO_NODES[exampleNum] || [];
    nodeIds.forEach(nodeId => {
      if (!sections[nodeId]) sections[nodeId] = [];
      sections[nodeId].push({ contentType, topicTitle: `Example ${exampleNum}: ${positions[i].title}`, content: sectionContent });
    });
  }

  return sections;
}

// ─── Split real world applications by Application N ───────────
function splitByApplications(content, contentType) {
  const sections = {};
  const regex = /Application\s+(\d+):[^\n]*/g;
  let match;
  let positions = [];

  while ((match = regex.exec(content)) !== null) {
    positions.push({ appNum: parseInt(match[1]), title: match[0].trim(), start: match.index });
  }

  if (positions.length === 0) {
    return { unassigned: content };
  }

  for (let i = 0; i < positions.length; i++) {
    const start = positions[i].start;
    const end = i + 1 < positions.length ? positions[i + 1].start : content.length;
    const sectionContent = content.substring(start, end).trim();
    const appNum = positions[i].appNum;
    const nodeIds = APP_TO_NODES[appNum] || [];
    nodeIds.forEach(nodeId => {
      if (!sections[nodeId]) sections[nodeId] = [];
      sections[nodeId].push({ contentType, topicTitle: `Application ${appNum}: ${positions[i].title}`, content: sectionContent });
    });
  }

  return sections;
}

// ─── Split silly mistakes by Mistake N ────────────────────────
function splitByMistakes(content, contentType) {
  const sections = {};
  const regex = /Mistake\s+(\d+):\s*([^\n]*)/g;
  let match;
  let positions = [];

  while ((match = regex.exec(content)) !== null) {
    positions.push({ mistakeNum: parseInt(match[1]), title: match[2].trim(), start: match.index });
  }

  if (positions.length === 0) {
    return { unassigned: content };
  }

  for (let i = 0; i < positions.length; i++) {
    const start = positions[i].start;
    const end = i + 1 < positions.length ? positions[i + 1].start : content.length;
    const sectionContent = content.substring(start, end).trim();
    const mistakeNum = positions[i].mistakeNum;
    const nodeIds = MISTAKE_TO_NODES[mistakeNum] || [];
    nodeIds.forEach(nodeId => {
      if (!sections[nodeId]) sections[nodeId] = [];
      sections[nodeId].push({ contentType, topicTitle: `Mistake ${mistakeNum}: ${positions[i].title}`, content: sectionContent });
    });
  }

  return sections;
}

// ─── Split step-by-step teach by UNIT N ───────────────────────
function splitByUnits(content, contentType) {
  const sections = {};
  const regex = /={5,}\s*\n\s*UNIT\s+(\d+):\s*([^\n]*)\n\s*={5,}/g;
  let match;
  let positions = [];

  while ((match = regex.exec(content)) !== null) {
    positions.push({ unitNum: parseInt(match[1]), title: match[2].trim(), start: match.index });
  }

  if (positions.length === 0) {
    return { unassigned: content };
  }

  for (let i = 0; i < positions.length; i++) {
    const start = positions[i].start;
    const end = i + 1 < positions.length ? positions[i + 1].start : content.length;
    const sectionContent = content.substring(start, end).trim();
    const unitNum = positions[i].unitNum;
    const nodeIds = UNIT_TO_NODES[unitNum] || [];
    nodeIds.forEach(nodeId => {
      if (!sections[nodeId]) sections[nodeId] = [];
      sections[nodeId].push({ contentType, topicTitle: `Unit ${unitNum}: ${positions[i].title}`, content: sectionContent });
    });
  }

  return sections;
}

// ─── Main processing ──────────────────────────────────────────
function main() {
  console.log('=== CLASS 1 MATHS PATCHING ===\n');
  console.log(`Source: ${SOURCE}`);
  console.log(`Output: ${OUTPUT}\n`);

  // Track what each node gets
  const nodeContent = {}; // node_id → { contentType → [sections] }
  NODES.forEach(n => { nodeContent[n.id] = {}; });

  const classLevelContent = []; // { contentType, content }
  const warnings = [];
  const stats = { filesProcessed: 0, sectionsExtracted: 0, classLevelFiles: 0 };

  // ─── Step 1: Copy enrichment files as-is ────────────────────
  console.log('--- Step 1: Copy enrichment files ---');
  const enrichmentDir = path.join(SOURCE, 'enrichment');
  const enrichmentFiles = fs.readdirSync(enrichmentDir).filter(f => f.startsWith('c1_maths_') && f.endsWith('.marker'));
  const enrichmentOutputDir = path.join(OUTPUT, 'enrichment');
  ensureDir(enrichmentOutputDir);

  enrichmentFiles.forEach(file => {
    const src = path.join(enrichmentDir, file);
    const content = readMarker(src);
    // Parse node_ids from this file
    const nodeMatches = content.match(/--- NODE (c1_math_\d{3}) ---/g) || [];
    const nodeIds = nodeMatches.map(m => m.match(/c1_math_\d{3}/)[0]);

    const dst = path.join(enrichmentOutputDir, file);
    writeFile(dst, content);
    nodeIds.forEach(nid => {
      if (nodeContent[nid]) {
        if (!nodeContent[nid]['enrichment']) nodeContent[nid]['enrichment'] = [];
        nodeContent[nid]['enrichment'].push({ topicTitle: file, content: `[Copied from ${file}]` });
      }
    });
    console.log(`  Copied: ${file} → nodes: ${nodeIds.join(', ')}`);
  });
  console.log(`  Enrichment files copied: ${enrichmentFiles.length}\n`);

  // ─── Step 2: Process non-enrichment files ───────────────────
  console.log('--- Step 2: Split non-enrichment files ---');

  // Define how to process each file
  const fileProcessors = [
    { dir: 'alternative_explanations', file: 'c1_maths_alternative_explanations.marker', type: 'alternative_explanations', splitter: splitBy28Topics },
    { dir: 'doubt_clearing', file: 'c1_maths_doubt_clearing.marker', type: 'doubt_clearing', splitter: splitBy28Topics },
    { dir: 'question_bank', file: 'c1_maths_question_bank.marker', type: 'question_bank', splitter: splitByQBankTopics },
    { dir: 'question_bank_answers', file: 'c1_maths_question_bank_answers.marker', type: 'question_bank_answers', splitter: splitByQBankTopics },
    { dir: 'question_bank_clean', file: 'c1_maths_question_bank_clean.marker', type: 'question_bank_clean', splitter: splitByQBankTopics },
    { dir: 'practice', file: 'c1_maths_practice.marker', type: 'practice', splitter: splitByPracticeTopics },
    { dir: 'diagnostics', file: 'c1_maths_diagnostics.marker', type: 'diagnostics', splitter: splitByCFQSets },
    { dir: 'worked_examples', file: 'c1_maths_worked_examples.marker', type: 'worked_examples', splitter: splitByExamples },
    { dir: 'real_world_applications', file: 'c1_maths_applications.marker', type: 'real_world_applications', splitter: splitByApplications },
    { dir: 'silly_mistakes', file: 'c1_maths_silly_mistakes.marker', type: 'silly_mistakes', splitter: splitByMistakes },
    { dir: 'step_by_step_teach', file: 'c1_maths_step_by_step_teach.marker', type: 'step_by_step_teach', splitter: splitByUnits },
  ];

  fileProcessors.forEach(fp => {
    const filePath = path.join(SOURCE, fp.dir, fp.file);
    if (!fs.existsSync(filePath)) {
      warnings.push(`File not found: ${fp.dir}/${fp.file}`);
      return;
    }

    const content = readMarker(filePath);
    const sections = fp.splitter(content, fp.type);
    stats.filesProcessed++;

    if (sections.unassigned) {
      warnings.push(`Could not split ${fp.dir}/${fp.file} — no section headers found`);
      classLevelContent.push({ contentType: fp.type, content: sections.unassigned, source: `${fp.dir}/${fp.file}` });
      stats.classLevelFiles++;
      console.log(`  ${fp.type}: UNASSIGNED (kept as class-level)`);
      return;
    }

    let sectionCount = 0;
    Object.keys(sections).forEach(nodeId => {
      if (!nodeContent[nodeId]) {
        warnings.push(`Unknown node_id ${nodeId} in ${fp.dir}/${fp.file}`);
        return;
      }
      if (!nodeContent[nodeId][fp.type]) nodeContent[nodeId][fp.type] = [];
      sections[nodeId].forEach(s => {
        nodeContent[nodeId][fp.type].push(s);
        sectionCount++;
        stats.sectionsExtracted++;
      });
    });
    console.log(`  ${fp.type}: ${sectionCount} sections → ${Object.keys(sections).length} nodes`);
  });

  // ─── Step 3: Copy class-level files as-is ───────────────────
  console.log('\n--- Step 3: Copy class-level files ---');
  const classLevelDir = path.join(OUTPUT, 'class_level');
  ensureDir(classLevelDir);

  CLASS_LEVEL_TYPES.forEach(type => {
    // Find matching files
    const dir = path.join(SOURCE, type);
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir).filter(f => f.startsWith('c1_maths_') && f.endsWith('.marker'));
    files.forEach(file => {
      const src = path.join(dir, file);
      const content = readMarker(src);
      const dst = path.join(classLevelDir, file);
      writeFile(dst, content);
      classLevelContent.push({ contentType: type, content: `[Copied from ${type}/${file}]`, source: `${type}/${file}` });
      stats.classLevelFiles++;
      console.log(`  Copied: ${type}/${file}`);
    });
  });

  // ─── Step 4: Write per-node files ───────────────────────────
  console.log('\n--- Step 4: Write per-node files ---');
  const nodesDir = path.join(OUTPUT, 'nodes');
  ensureDir(nodesDir);

  NODES.forEach(node => {
    const nodeDir = path.join(nodesDir, node.id);
    ensureDir(nodeDir);

    const content = nodeContent[node.id];
    const contentTypes = Object.keys(content);

    if (contentTypes.length === 0) {
      warnings.push(`Node ${node.id} (${node.title}) has NO content beyond enrichment`);
    }

    contentTypes.forEach(ct => {
      const sections = content[ct];
      const fileName = `${node.id}_${ct}.marker`;
      const filePath = path.join(nodeDir, fileName);

      let fileContent = `--- NODE ${node.id} ---\n`;
      fileContent += `NODE_ID: ${node.id}\n`;
      fileContent += `TITLE: ${node.title}\n`;
      fileContent += `CLASS: 1\n`;
      fileContent += `SUBJECT: Mathematics\n`;
      fileContent += `CONTENT_TYPE: ${ct}\n`;
      fileContent += `SECTIONS: ${sections.length}\n`;
      fileContent += `\n`;

      sections.forEach((s, i) => {
        fileContent += `\n=== SECTION ${i + 1}: ${s.topicTitle} ===\n`;
        fileContent += `${s.content}\n`;
      });

      writeFile(filePath, fileContent);
    });

    console.log(`  ${node.id}: ${contentTypes.length} content types, ${contentTypes.join(', ') || '(enrichment only)'}`);
  });

  // ─── Step 5: Write verification report ──────────────────────
  console.log('\n--- Step 5: Write verification report ---');
  let report = `# Class 1 Maths — Patching Report\n\n`;
  report += `Generated: ${new Date().toISOString()}\n\n`;
  report += `## Summary\n\n`;
  report += `- Nodes: ${NODES.length}\n`;
  report += `- Files processed: ${stats.filesProcessed}\n`;
  report += `- Sections extracted: ${stats.sectionsExtracted}\n`;
  report += `- Class-level files: ${stats.classLevelFiles}\n`;
  report += `- Warnings: ${warnings.length}\n\n`;

  report += `## Per-Node Content Map\n\n`;
  report += `| Node ID | Title | Content Types | Section Count |\n`;
  report += `|---------|-------|---------------|---------------|\n`;
  NODES.forEach(node => {
    const content = nodeContent[node.id];
    const types = Object.keys(content);
    const totalSections = types.reduce((sum, t) => sum + content[t].length, 0);
    const typesStr = types.length > 0 ? types.join(', ') : 'NONE (gap!)';
    report += `| ${node.id} | ${node.title.substring(0, 40)} | ${typesStr} | ${totalSections} |\n`;
  });

  report += `\n## Gaps (nodes with no non-enrichment content)\n\n`;
  const gaps = NODES.filter(n => Object.keys(nodeContent[n.id]).length === 0);
  if (gaps.length === 0) {
    report += `None — all nodes have non-enrichment content.\n`;
  } else {
    gaps.forEach(g => {
      report += `- ${g.id} (${g.title})\n`;
    });
  }

  report += `\n## Warnings\n\n`;
  if (warnings.length === 0) {
    report += `None\n`;
  } else {
    warnings.forEach(w => report += `- ${w}\n`);
  }

  report += `\n## Class-Level Files (not split by node)\n\n`;
  classLevelContent.forEach(c => {
    report += `- ${c.source}\n`;
  });

  report += `\n## Directory Structure\n\n`;
  report += `\`\`\`\n`;
  report += `D:\\dream_app\\patched\\class1\\maths\\\n`;
  report += `  ├── enrichment/          (copied from source, already node-based)\n`;
  report += `  ├── nodes/               (per-node split content)\n`;
  report += `  │   ├── c1_math_001/\n`;
  report += `  │   │   ├── c1_math_001_question_bank.marker\n`;
  report += `  │   │   ├── c1_math_001_alternative_explanations.marker\n`;
  report += `  │   │   └── ...\n`;
  report += `  │   ├── c1_math_002/\n`;
  report += `  │   └── ... (28 nodes)\n`;
  report += `  ├── class_level/         (files that apply to all of Class 1 Maths)\n`;
  report += `  └── REPORT.md            (this file)\n`;
  report += `\`\`\`\n`;

  writeFile(path.join(OUTPUT, 'REPORT.md'), report);
  console.log(`  Report written to ${path.join(OUTPUT, 'REPORT.md')}`);

  console.log(`\n=== DONE ===`);
  console.log(`Nodes: ${NODES.length} | Sections: ${stats.sectionsExtracted} | Warnings: ${warnings.length}`);
}

main();
