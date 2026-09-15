/**
 * EnrichmentParser — parses .marker enrichment files into structured data.
 *
 * Reads the YAML-like .marker format used by the CISCE enrichment project
 * and extracts all sections into a typed structure that the simulation engine,
 * challenge engine, and assessment tracker can use.
 *
 * File format (per node in a .marker file):
 *   --- NODE c6_phy_007 ---
 *   TITLE: Motion as change in position with time
 *   DEFINITION: |
 *     <multi-line prose>
 *   TEXT_WALKTHROUGH: |
 *     <multi-line Socratic explanation>
 *   ELI5: |
 *     <multi-line child-friendly analogy>
 *   COMMON_MISCONCEPTION: |
 *     Misconception 1: ...
 *     Misconception 2: ...
 *   DIAGNOSTIC_QUESTION: |
 *     Q1 (recall): ...
 *     Answer: ...
 *     Q2 (reasoning): ...
 *     Answer: ...
 *     ...
 *   ON_FAILURE: |
 *     Q1 fails -> Review ...
 *     Q2 fails -> Review ...
 *   COGNITIVE_LEVEL: understand
 *   MASTERY_CRITERIA: |
 *     <multi-line observable skills>
 *   SCOPE_BOUNDARY: |
 *     Teach: ... | Do NOT teach: ... | Already covered: ...
 */

// ─── Types ───────────────────────────────────────────────────

export interface Misconception {
  /** The wrong belief the student holds */
  belief: string;
  /** Why it's wrong and what's correct */
  correction: string;
}

export interface DiagnosticQuestion {
  /** Question number (1-5) */
  number: number;
  /** Bloom's level: recall, reasoning, evaluate, apply, create */
  bloomLevel: string;
  /** The question text */
  question: string;
  /** The model answer */
  answer: string;
}

export interface RemediationPath {
  /** Which diagnostic question failed (1-5) */
  questionNumber: number;
  /** Which prerequisite node to review */
  prerequisiteNodeId: string;
  /** What to do after reviewing */
  guidance: string;
}

export interface ScopeBoundary {
  /** What this node teaches */
  teach: string;
  /** What is reserved for later nodes */
  doNotTeach: string;
  /** What was already covered and should only be revised */
  alreadyCovered: string;
}

export interface EnrichmentNode {
  /** Node ID, e.g. "c6_phy_007" */
  nodeId: string;
  /** Human-readable title */
  title: string;
  /** 300-500 word definition (flowing prose) */
  definition: string;
  /** Socratic step-by-step explanation */
  textWalkthrough: string;
  /** 60-80 word child-friendly analogy */
  eli5: string;
  /** 2-3 real misconceptions with corrections */
  misconceptions: Misconception[];
  /** 5 diagnostic questions (recall → reasoning → evaluate → apply → create) */
  diagnosticQuestions: DiagnosticQuestion[];
  /** Remediation paths for when each question fails */
  remediationPaths: RemediationPath[];
  /** Single Bloom's word: remember, understand, apply, analyze, evaluate, create */
  cognitiveLevel: string;
  /** 3-4 observable skills that demonstrate mastery */
  masteryCriteria: string;
  /** What's in scope, what's not, what's already covered */
  scopeBoundary: ScopeBoundary;
  /** Subject: maths, physics, chemistry, biology, history, civics, geography, computer, english, evs */
  subject: string;
  /** Class level: 6, 7, or 8 */
  classLevel: number;
}

// ─── Parser ──────────────────────────────────────────────────

/**
 * Parse a single .marker file content into an array of EnrichmentNode objects.
 * A .marker file may contain multiple nodes.
 */
export function parseEnrichmentFile(
  content: string,
  subject: string,
  classLevel: number,
): EnrichmentNode[] {
  const nodes: EnrichmentNode[] = [];

  // Split into node blocks by the "--- NODE" delimiter
  const nodeBlocks = splitIntoNodeBlocks(content);

  for (const block of nodeBlocks) {
    const node = parseNodeBlock(block, subject, classLevel);
    if (node) {
      nodes.push(node);
    }
  }

  return nodes;
}

/**
 * Split file content into individual node blocks.
 * Each node starts with "--- NODE <id> ---"
 */
function splitIntoNodeBlocks(content: string): string[] {
  const blocks: string[] = [];
  const lines = content.split('\n');

  let currentBlock: string[] = [];
  let inNode = false;

  for (const line of lines) {
    // Detect node start: "--- NODE c6_phy_007 ---" or "--- NODE c6_phy_007: Title ---"
    if (line.match(/^---\s+NODE\s+\S+/)) {
      if (inNode && currentBlock.length > 0) {
        blocks.push(currentBlock.join('\n'));
      }
      currentBlock = [line];
      inNode = true;
    } else if (inNode) {
      currentBlock.push(line);
    }
  }

  if (inNode && currentBlock.length > 0) {
    blocks.push(currentBlock.join('\n'));
  }

  return blocks;
}

/**
 * Parse a single node block into an EnrichmentNode.
 */
function parseNodeBlock(
  block: string,
  subject: string,
  classLevel: number,
): EnrichmentNode | null {
  // Extract node ID from the header line
  const headerMatch = block.match(/^---\s+NODE\s+(\S+)/);
  if (!headerMatch) return null;

  const nodeId = headerMatch[1];

  // Extract all multi-line fields (FIELD: | followed by indented content)
  const definition = extractMultilineField(block, 'DEFINITION');
  const textWalkthrough = extractMultilineField(block, 'TEXT_WALKTHROUGH');
  const eli5 = extractMultilineField(block, 'ELI5');
  const misconceptionText = extractMultilineField(block, 'COMMON_MISCONCEPTION');
  const diagnosticText = extractMultilineField(block, 'DIAGNOSTIC_QUESTION');
  const onFailureText = extractMultilineField(block, 'ON_FAILURE');
  const masteryCriteria = extractMultilineField(block, 'MASTERY_CRITERIA');
  const scopeText = extractMultilineField(block, 'SCOPE_BOUNDARY');

  // Extract single-line fields
  const title = extractSingleLineField(block, 'TITLE') || '';
  const cognitiveLevel = extractSingleLineField(block, 'COGNITIVE_LEVEL') || '';

  // Parse structured sub-sections
  const misconceptions = parseMisconceptions(misconceptionText);
  const diagnosticQuestions = parseDiagnosticQuestions(diagnosticText);
  const remediationPaths = parseRemediationPaths(onFailureText);
  const scopeBoundary = parseScopeBoundary(scopeText);

  return {
    nodeId,
    title,
    definition: definition.trim(),
    textWalkthrough: textWalkthrough.trim(),
    eli5: eli5.trim(),
    misconceptions,
    diagnosticQuestions,
    remediationPaths,
    cognitiveLevel,
    masteryCriteria: masteryCriteria.trim(),
    scopeBoundary,
    subject,
    classLevel,
  };
}

/**
 * Known field names that mark the end of a multi-line field.
 * When we encounter one of these at column 0, the current field ends.
 */
const FIELD_NAMES = [
  'TITLE', 'DEFINITION', 'TEXT_WALKTHROUGH', 'ELI5',
  'COMMON_MISCONCEPTION', 'DIAGNOSTIC_QUESTION', 'ON_FAILURE',
  'COGNITIVE_LEVEL', 'MASTERY_CRITERIA', 'SCOPE_BOUNDARY',
  'SECTION', 'SYLLABUS', 'DIFFICULTY', 'EXAM_RELEVANCE',
  'EXAM_WEIGHTAGE', 'COMPETENCY_LEVEL', 'PREREQ_STRENGTH',
  'EXAMPLES', 'VOCABULARY', 'QUESTIONS', 'SPIRAL_TOPIC',
  'SCOPE_LEVEL', 'IS_ROOT', 'PREREQ', 'REASON',
  'DEPTH_PREREQ', 'DEPTH_REASON',
];

/**
 * Extract a multi-line field value.
 * Format:
 *   FIELD: |
 *     line 1
 *     line 2
 *
 *     line 4 (empty lines are part of the content)
 *   NEXT_FIELD:
 *
 * The content is everything after "FIELD: |" until the next known
 * field name at column 0 (no indentation). Empty lines within the
 * content are preserved.
 */
function extractMultilineField(block: string, fieldName: string): string {
  // Find the field header line
  const headerPattern = new RegExp(`^${fieldName}:\\s*\\|?\\s*$`, 'm');
  const headerMatch = block.match(headerPattern);
  if (!headerMatch) return '';

  // Get everything after the header line
  const afterHeader = block.substring(headerMatch.index! + headerMatch[0].length + 1);

  // Split into lines and collect until we hit a known field at column 0
  const lines = afterHeader.split('\n');
  const contentLines: string[] = [];

  // Build a regex that matches any known field name at column 0
  const fieldEndPattern = new RegExp(`^(${FIELD_NAMES.join('|')}):`);

  for (const line of lines) {
    // Check if this line is a field header at column 0
    if (fieldEndPattern.test(line)) {
      break;
    }
    contentLines.push(line);
  }

  // Remove the leading indentation (2 spaces) from each content line
  const cleaned = contentLines
    .map(line => line.replace(/^[ \t]{2}/, ''))
    .join('\n');

  // Trim trailing whitespace but preserve internal structure
  return cleaned.replace(/\s+$/, '');
}

/**
 * Extract a single-line field value.
 * Format: "FIELD: value"
 */
function extractSingleLineField(block: string, fieldName: string): string {
  const pattern = new RegExp(`^${fieldName}:\\s*(.+)$`, 'm');
  const match = block.match(pattern);
  return match ? match[1].trim() : '';
}

/**
 * Parse the COMMON_MISCONCEPTION section into structured misconceptions.
 *
 * Format:
 *   Misconception 1: "Belief text" Correction: "Correction text"
 *   Misconception 2: "Belief text" Correction: "Correction text"
 */
function parseMisconceptions(text: string): Misconception[] {
  if (!text.trim()) return [];

  const misconceptions: Misconception[] = [];

  // Helper: extract belief/correction from a paragraph using multiple marker patterns
  function extractBeliefCorrection(para: string): { belief: string; correction: string } | null {
    const lower = para.toLowerCase();
    // Try "Correction:" (with colon — histciv format)
    const correctionColonIdx = para.indexOf('Correction:');
    if (correctionColonIdx >= 0) {
      const belief = para.substring(0, correctionColonIdx).trim();
      const correction = para.substring(correctionColonIdx + 'Correction:'.length).trim();
      if (belief && correction) return { belief, correction };
    }
    // Try "Correction --" (double dash — chem format)
    const correctionDashIdx = lower.indexOf('correction --');
    if (correctionDashIdx >= 0) {
      const belief = para.substring(0, correctionDashIdx).trim();
      const correction = para.substring(correctionDashIdx + 'correction --'.length).trim();
      if (belief && correction) return { belief, correction };
    }
    // Try "The correction is" (chemistry format)
    const correctionIsIdx = lower.indexOf('the correction is');
    if (correctionIsIdx >= 0) {
      const belief = para.substring(0, correctionIsIdx).trim();
      const correction = para.substring(correctionIsIdx + 'the correction is'.length).trim();
      if (belief && correction) return { belief, correction };
    }
    // Try "The correction:" (histciv variation)
    const correctionColonOnlyIdx = lower.indexOf('the correction:');
    if (correctionColonOnlyIdx >= 0) {
      const belief = para.substring(0, correctionColonOnlyIdx).trim();
      const correction = para.substring(correctionColonOnlyIdx + 'the correction:'.length).trim();
      if (belief && correction) return { belief, correction };
    }
    // Try "The correction must be" (histciv variation)
    const correctionMustIdx = lower.indexOf('the correction must be');
    if (correctionMustIdx >= 0) {
      const belief = para.substring(0, correctionMustIdx).trim();
      const correction = para.substring(correctionMustIdx + 'the correction must be'.length).trim();
      if (belief && correction) return { belief, correction };
    }
    return null;
  }

  // Helper: split a single paragraph into multiple misconceptions by inline markers
  function splitInlineMisconceptions(para: string): string[] {
    // Split by inline markers like "Another common error", "A second error",
    // "A third error", "A third mistake", "A third misconception", "A second frequent error",
    // "First, ...", "Second, ...", "Third, ...", "Fourth, ..."
    const markers = [
      /\bAnother common error\b/i,
      /\bA second (?:common )?(?:error|mistake|misconception|frequent error)\b/i,
      /\bA third (?:common )?(?:error|mistake|misconception|frequent mistake|frequent error)\b/i,
      /\bA fourth (?:common )?(?:error|mistake|misconception)\b/i,
      /(?:^|\n)\s*First,\s+(?=[A-Z])/i,
      /(?:^|\n)\s*Second,\s+(?=[A-Z])/i,
      /(?:^|\n)\s*Third,\s+(?=[A-Z])/i,
      /(?:^|\n)\s*Fourth,\s+(?=[A-Z])/i,
    ];
    // Find all marker positions
    const positions: Array<{ idx: number; marker: string }> = [];
    for (const marker of markers) {
      let match;
      const regex = new RegExp(marker.source, 'gi');
      while ((match = regex.exec(para)) !== null) {
        positions.push({ idx: match.index, marker: match[0] });
      }
    }
    if (positions.length === 0) return [para];
    positions.sort((a, b) => a.idx - b.idx);
    // Split at each marker position
    const parts: string[] = [];
    let lastIdx = 0;
    for (const pos of positions) {
      if (pos.idx > lastIdx) {
        parts.push(para.substring(lastIdx, pos.idx).trim());
      }
      lastIdx = pos.idx;
    }
    parts.push(para.substring(lastIdx).trim());
    return parts.filter(p => p.length > 0);
  }

  // ─── Format 1: "Misconception N: ..." or "Misconception N -- ..." or "Misconception N (something): ..."
  // (physics/bio/chem/geo/maths format)
  const parts1 = text.split(/Misconception\s+\d+\s*(?:\([^)]*\))?\s*[:\-]+\s*/i);
  if (parts1.length > 1) {
    for (let i = 1; i < parts1.length; i++) {
      const part = parts1[i].trim();
      if (!part) continue;
      const extracted = extractBeliefCorrection(part);
      if (extracted) {
        misconceptions.push({
          belief: extracted.belief.replace(/^["']|["']$/g, ''),
          correction: extracted.correction,
        });
      } else {
        misconceptions.push({ belief: part.replace(/^["']|["']$/g, ''), correction: '' });
      }
    }
    if (misconceptions.length > 0) return misconceptions;
  }

  // ─── Format 1b: "M1: / M2: / M3:" (bio format — short label prefix)
  const partsM = text.split(/\bM\d+\s*:\s*/i);
  if (partsM.length > 1) {
    for (let i = 1; i < partsM.length; i++) {
      const part = partsM[i].trim();
      if (!part) continue;
      const extracted = extractBeliefCorrection(part);
      if (extracted) {
        misconceptions.push({
          belief: extracted.belief.replace(/^["']|["']$/g, ''),
          correction: extracted.correction,
        });
      } else {
        misconceptions.push({ belief: part.replace(/^["']|["']$/g, ''), correction: '' });
      }
    }
    if (misconceptions.length > 0) return misconceptions;
  }

  // ─── Format 2: "N. ..." or "N) ..." (numbered format)
  const lines = text.split('\n');
  let currentBelief = '';
  let currentCorrection = '';
  let inMisconception = false;

  for (const line of lines) {
    const numMatch = line.match(/^\s*(\d+)[.)]\s+(.*)/);
    if (numMatch) {
      if (inMisconception && currentBelief) {
        misconceptions.push({
          belief: currentBelief.trim().replace(/^["']|["']$/g, ''),
          correction: currentCorrection.trim(),
        });
      }
      const content = numMatch[2].trim();
      const extracted = extractBeliefCorrection(content);
      if (extracted) {
        currentBelief = extracted.belief;
        currentCorrection = extracted.correction;
      } else {
        currentBelief = content;
        currentCorrection = '';
      }
      inMisconception = true;
    } else if (inMisconception) {
      const extracted = extractBeliefCorrection(line);
      if (currentCorrection === '' && extracted) {
        currentBelief += ' ' + extracted.belief;
        currentCorrection = extracted.correction;
      } else if (currentCorrection) {
        currentCorrection += ' ' + line.trim();
      } else {
        currentBelief += ' ' + line.trim();
      }
    }
  }
  if (inMisconception && currentBelief) {
    misconceptions.push({
      belief: currentBelief.trim().replace(/^["']|["']$/g, ''),
      correction: currentCorrection.trim(),
    });
  }

  // ─── Format 3: prose paragraphs (histciv/chem/bio format — no numbered items)
  if (misconceptions.length === 0 && text.trim()) {
    // Split by double newline first (chemistry/histciv format with blank lines between paragraphs)
    let paragraphs = text.split(/\n\s*\n/).map(p => p.trim()).filter(p => p.length > 0);
    // If only 1 paragraph resulted, try splitting by single newline (histciv format)
    if (paragraphs.length <= 1) {
      const singleSplit = text.split(/\n/).map(p => p.trim()).filter(p => p.length > 0);
      const countWithMarkers = singleSplit.filter(p => {
        const lower = p.toLowerCase();
        return p.includes('Correction:') || lower.includes('the correction is') ||
               lower.includes('the correction:') || lower.includes('the correction must be') ||
               lower.includes('correction --');
      }).length;
      // Also check for ordinal markers (First, Second, Third, Fourth) at start of lines
      const countWithOrdinals = singleSplit.filter(p =>
        /^(?:First|Second|Third|Fourth),\s+[A-Z]/.test(p)
      ).length;
      if (countWithMarkers > 1 || countWithOrdinals >= 2) {
        paragraphs = singleSplit;
      }
    }
    // If still only 1 paragraph, try splitting by inline markers (bio/cs single-paragraph format)
    if (paragraphs.length === 1) {
      const inlineParts = splitInlineMisconceptions(paragraphs[0]);
      if (inlineParts.length > 1) {
        paragraphs = inlineParts;
      }
    }
    if (paragraphs.length > 0) {
      for (const para of paragraphs) {
        // Try all correction marker patterns
        const extracted = extractBeliefCorrection(para);
        if (extracted) {
          misconceptions.push({
            belief: extracted.belief.replace(/^["']|["']$/g, ''),
            correction: extracted.correction,
          });
          continue;
        }
        // No correction marker found — treat as belief-only (correction embedded in prose)
        misconceptions.push({
          belief: para.replace(/^["']|["']$/g, ''),
          correction: '',
        });
      }
    }
  }

  // Final fallback: if still no misconceptions but text exists, treat as single belief
  if (misconceptions.length === 0 && text.trim()) {
    misconceptions.push({
      belief: text.trim(),
      correction: '',
    });
  }

  return misconceptions;
}

/**
 * Parse the DIAGNOSTIC_QUESTION section into structured questions.
 *
 * Format:
 *   Q1 (recall): Question text
 *     Answer: Answer text
 *   Q2 (reasoning): Question text
 *     Answer: Answer text
 */
function parseDiagnosticQuestions(text: string): DiagnosticQuestion[] {
  if (!text.trim()) return [];

  const questions: DiagnosticQuestion[] = [];

  // Match each Q block: "Q1 (recall): ..." followed by "Answer: ..."
  const qPattern = /Q(\d+)\s*\((\w+)\):\s*([\s\S]*?)(?:\n\s*Answer:\s*([\s\S]*?))(?=\n\s*Q\d+\s*\(|\n\s*ON_FAILURE|\n\s*COGNITIVE_LEVEL|\s*$)/g;

  let match: RegExpExecArray | null;
  while ((match = qPattern.exec(text)) !== null) {
    questions.push({
      number: parseInt(match[1], 10),
      bloomLevel: match[2].toLowerCase(),
      question: match[3].trim(),
      answer: match[4].trim(),
    });
  }

  // Fallback: if the regex didn't match, try a simpler line-by-line approach
  if (questions.length === 0) {
    const lines = text.split('\n');
    let currentQ: Partial<DiagnosticQuestion> | null = null;
    let inAnswer = false;
    let answerBuffer = '';

    for (const line of lines) {
      const qMatch = line.match(/Q(\d+)\s*\((\w+)\):\s*(.*)/);
      if (qMatch) {
        // Save previous question if exists
        if (currentQ && currentQ.number) {
          questions.push({
            number: currentQ.number,
            bloomLevel: currentQ.bloomLevel || '',
            question: currentQ.question || '',
            answer: answerBuffer.trim(),
          });
        }
        currentQ = {
          number: parseInt(qMatch[1], 10),
          bloomLevel: qMatch[2].toLowerCase(),
          question: qMatch[3].trim(),
        };
        inAnswer = false;
        answerBuffer = '';
        continue;
      }

      if (line.match(/^\s*Answer:\s*/)) {
        inAnswer = true;
        answerBuffer = line.replace(/^\s*Answer:\s*/, '');
        continue;
      }

      if (inAnswer) {
        answerBuffer += '\n' + line;
      }
    }

    // Save last question
    if (currentQ && currentQ.number) {
      questions.push({
        number: currentQ.number,
        bloomLevel: currentQ.bloomLevel || '',
        question: currentQ.question || '',
        answer: answerBuffer.trim(),
      });
    }
  }

  return questions;
}

/**
 * Parse the ON_FAILURE section into remediation paths.
 *
 * Format:
 *   Q1 fails -> Review PREREQ node c6_phy_004 (...) to recall ... After review, retry Q1.
 *   Q2 fails -> Review DEPTH_PREREQ node c3_phy_001 (...) ... After review, retry Q2.
 */
function parseRemediationPaths(text: string): RemediationPath[] {
  if (!text.trim()) return [];

  const paths: RemediationPath[] = [];

  // Match each "Qn fails -> ..." line
  const lines = text.split('\n');
  for (const line of lines) {
    const match = line.match(/Q(\d+)\s+fails\s*->\s*(.*)/i);
    if (match) {
      const qNum = parseInt(match[1], 10);
      const rest = match[2].trim();

      // Extract prerequisite node ID
      const prereqMatch = rest.match(/(?:PREREQ|DEPTH_PREREQ)\s+node\s+(\S+)/i);
      const prereqId = prereqMatch ? prereqMatch[1] : '';

      paths.push({
        questionNumber: qNum,
        prerequisiteNodeId: prereqId,
        guidance: rest,
      });
    }
  }

  return paths;
}

/**
 * Parse the SCOPE_BOUNDARY section.
 *
 * Format:
 *   Teach: ... | Do NOT teach: ... | Already covered: ...
 */
function parseScopeBoundary(text: string): ScopeBoundary {
  if (!text.trim()) {
    return { teach: '', doNotTeach: '', alreadyCovered: '' };
  }

  const teachMatch = text.match(/Teach:\s*([\s\S]*?)(?:\s*\|\s*Do NOT|$)/i);
  const dontTeachMatch = text.match(/Do NOT teach(?:\s*\([^)]*\))?:\s*([\s\S]*?)(?:\s*\|\s*Already|$)/i);
  const alreadyMatch = text.match(/Already covered(?:\s*\([^)]*\))?:\s*([\s\S]*?)$/i);

  return {
    teach: teachMatch ? teachMatch[1].trim() : '',
    doNotTeach: dontTeachMatch ? dontTeachMatch[1].trim() : '',
    alreadyCovered: alreadyMatch ? alreadyMatch[1].trim() : '',
  };
}

// ─── Node file parser (syllabus metadata) ────────────────────

export interface SyllabusNode {
  nodeId: string;
  title: string;
  section: string;
  syllabus: string;
  cognitiveLevel: string;
  difficulty: string;
  examRelevance: string;
  examWeightage: string;
  competencyLevel: string;
  prereqStrength: string;
  masteryCriteria: string;
  examples: string;
  vocabulary: string;
  spiralTopic: string;
  scopeLevel: string;
  scopeBoundary: string;
  isRoot: boolean;
  prereq: string;
  prereqReason: string;
  depthPrereq: string;
  depthPrereqReason: string;
}

/**
 * Parse a syllabus node file (e.g. class6_physics_nodes.marker) into SyllabusNode objects.
 */
export function parseSyllabusFile(content: string): SyllabusNode[] {
  const nodes: SyllabusNode[] = [];
  const blocks = splitIntoNodeBlocks(content);

  for (const block of blocks) {
    const headerMatch = block.match(/^---\s+NODE\s+(\S+?):\s*(.*?)\s*---/);
    if (!headerMatch) continue;

    const nodeId = headerMatch[1];
    const title = headerMatch[2];

    nodes.push({
      nodeId,
      title,
      section: extractSingleLineField(block, 'SECTION'),
      syllabus: extractSingleLineField(block, 'SYLLABUS'),
      cognitiveLevel: extractSingleLineField(block, 'COGNITIVE_LEVEL'),
      difficulty: extractSingleLineField(block, 'DIFFICULTY'),
      examRelevance: extractSingleLineField(block, 'EXAM_RELEVANCE'),
      examWeightage: extractSingleLineField(block, 'EXAM_WEIGHTAGE'),
      competencyLevel: extractSingleLineField(block, 'COMPETENCY_LEVEL'),
      prereqStrength: extractSingleLineField(block, 'PREREQ_STRENGTH'),
      masteryCriteria: extractSingleLineField(block, 'MASTERY_CRITERIA'),
      examples: extractSingleLineField(block, 'EXAMPLES'),
      vocabulary: extractSingleLineField(block, 'VOCABULARY'),
      spiralTopic: extractSingleLineField(block, 'SPIRAL_TOPIC'),
      scopeLevel: extractSingleLineField(block, 'SCOPE_LEVEL'),
      scopeBoundary: extractSingleLineField(block, 'SCOPE_BOUNDARY'),
      isRoot: extractSingleLineField(block, 'IS_ROOT') === 'true',
      prereq: extractSingleLineField(block, 'PREREQ'),
      prereqReason: extractSingleLineField(block, 'REASON'),
      depthPrereq: extractSingleLineField(block, 'DEPTH_PREREQ'),
      depthPrereqReason: extractSingleLineField(block, 'DEPTH_REASON'),
    });
  }

  return nodes;
}

// ─── File loader (for Node.js / build scripts) ───────────────

/**
 * Load and parse all enrichment files for a given class and subject.
 * This is used by build scripts to pre-process enrichment data.
 */
export function loadEnrichmentFiles(
  enrichmentDir: string,
  subject: string,
  classLevel: number,
  filePattern: string,
): EnrichmentNode[] {
  // This function uses fs and path — only call from Node.js context
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const fs = require('fs');
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const path = require('path');

  const prefix = `c${classLevel}_${subject}_enrichment_`;
  const allNodes: EnrichmentNode[] = [];

  try {
    const files = fs.readdirSync(enrichmentDir);
    for (const file of files) {
      if (file.startsWith(prefix) && file.endsWith('.marker')) {
        const filePath = path.join(enrichmentDir, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        const nodes = parseEnrichmentFile(content, subject, classLevel);
        allNodes.push(...nodes);
      }
    }
  } catch (e) {
    console.error(`Error loading enrichment files from ${enrichmentDir}:`, e);
  }

  return allNodes;
}
