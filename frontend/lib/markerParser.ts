/* ═══════════════════════════════════════════════════════════════════════════
   markerParser.ts — Parse CISCE .marker enrichment files from D:\cisce
   Serves enrichment data to the tutor flow without needing the Python backend.
   ═══════════════════════════════════════════════════════════════════════════ */

import { readdirSync, readFileSync, existsSync } from 'fs';
import { join, basename } from 'path';

// ─── Types ────────────────────────────────────────────────────

export interface ParsedNode {
  node_id: string;
  title: string;
  definition: string;
  text_walkthrough: string;
  eli5: string;
  common_misconception: string;
  diagnostic_question: string;
  on_failure: string;
  cognitive_level: string;
  mastery_criteria: string;
  scope_boundary: string;
  source_file: string;
  subject: string;
  class_level: number;
}

export interface EnrichmentNodeSummary {
  node_id: string;
  title: string;
  subject: string;
  class_level: number;
  cognitive_level: string | null;
  difficulty: string | null;
  has_definition: boolean;
  has_walkthrough: boolean;
  has_eli5: boolean;
  has_misconception: boolean;
  has_diagnostic: boolean;
  prereq_count: number;
}

// ─── Config ───────────────────────────────────────────────────

const CISCE_ROOT = 'D:\\cisce';

// Map frontend subject keys to cisce folder names
const SUBJECT_DIRS: Record<string, string> = {
  physics: 'physics',
  phy: 'physics',
  chem: 'chem',
  chemistry: 'chem',
  bio: 'bio',
  biology: 'bio',
  maths: 'maths',
  math: 'maths',
  evs: 'evs',
  cs: 'cs',
  computer: 'cs',
  geo: 'geo',
  geography: 'geo',
  eng: 'eng',
  hin: 'hin',
  hist: 'hist',
  histciv: 'histciv',
  sst: 'sst',
  sci: 'sci',
  soc: 'soc',
  acc: 'acc',
  econ: 'econ',
  econapp: 'econapp',
  comm: 'comm',
  commapp: 'commapp',
  commerce: 'commerce',
  bs: 'bs',
  ca: 'ca',
  legal: 'legal',
  psy: 'psy',
  biotech: 'biotech',
  appmath: 'appmath',
  art: 'art',
  pe: 'pe',
  home: 'home',
  massmedia: 'massmedia',
  pol: 'pol',
  gelec: 'engelec',
  engmod: 'engmod',
  commstud: 'commstud',
  robotics: 'robotics',
  ai: 'ai',
};

// ─── Parser ───────────────────────────────────────────────────

/**
 * Parse a single .marker file into a ParsedNode.
 * The format uses `--- NODE cX_subj_NNN ---` headers and
 * `FIELD: |` multi-line blocks, plus `FIELD: value` single-line fields.
 */
export function parseMarkerFile(filePath: string, subject: string): ParsedNode | null {
  if (!existsSync(filePath)) return null;
  const raw = readFileSync(filePath, 'utf-8');
  return parseMarkerContent(raw, subject, basename(filePath));
}

export function parseMarkerContent(raw: string, subject: string, sourceFile: string): ParsedNode | null {
  // Normalize line endings — handle both \r\n (Windows) and \n (Unix)
  const content = raw.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

  // Extract node_id from `--- NODE cX_subj_NNN ---`
  const nodeMatch = content.match(/---\s*NODE\s+(\S+)\s*---/);
  if (!nodeMatch) return null;
  const node_id = nodeMatch[1];

  // Extract class_level from node_id (e.g. c1_math_001 -> 1)
  const classMatch = node_id.match(/^c(\d+)_/);
  const class_level = classMatch ? parseInt(classMatch[1], 10) : 0;

  // Extract TITLE (single-line)
  const titleMatch = content.match(/^TITLE:\s*(.+)$/m);
  const title = titleMatch ? titleMatch[1].trim() : node_id;

  // Helper: extract a multi-line block field (FIELD: | followed by indented content)
  function extractBlock(fieldName: string): string {
    // Match FIELD: | then capture everything until the next all-caps field or end
    const regex = new RegExp(`^${fieldName}:\\s*\\|\\n([\\s\\S]*?)(?=^[A-Z][A-Z_]+:|^---\\s*NODE|$)`, 'm');
    const m = content.match(regex);
    if (!m) return '';
    // Dedent: remove the common leading whitespace (usually 2 spaces)
    const lines = m[1].split('\n');
    let minIndent = Infinity;
    for (const line of lines) {
      if (line.trim() === '') continue;
      const indent = line.match(/^(\s*)/)?.[1].length ?? 0;
      if (indent < minIndent) minIndent = indent;
    }
    if (minIndent === Infinity) minIndent = 0;
    return lines.map(l => l.substring(minIndent)).join('\n').trim();
  }

  // Helper: extract a single-line field
  function extractLine(fieldName: string): string {
    const regex = new RegExp(`^${fieldName}:\\s*(.+)$`, 'm');
    const m = content.match(regex);
    return m ? m[1].trim() : '';
  }

  const definition = extractBlock('DEFINITION');
  const text_walkthrough = extractBlock('TEXT_WALKTHROUGH');
  const eli5 = extractBlock('ELI5');
  const common_misconception = extractBlock('COMMON_MISCONCEPTION');
  const diagnostic_question = extractBlock('DIAGNOSTIC_QUESTION');
  const on_failure = extractBlock('ON_FAILURE');
  const cognitive_level = extractLine('COGNITIVE_LEVEL');
  const mastery_criteria = extractBlock('MASTERY_CRITERIA');
  const scope_boundary = extractBlock('SCOPE_BOUNDARY');

  return {
    node_id,
    title,
    definition,
    text_walkthrough,
    eli5,
    common_misconception,
    diagnostic_question,
    on_failure,
    cognitive_level,
    mastery_criteria,
    scope_boundary,
    source_file: sourceFile,
    subject,
    class_level,
  };
}

// ─── File Discovery ───────────────────────────────────────────

/**
 * Find all .marker enrichment files for a given subject and class level.
 * Returns array of file paths.
 */
function findMarkerFiles(subjectDir: string, classLevel?: number): string[] {
  const enrichmentDir = join(CISCE_ROOT, subjectDir, 'enrichment');
  if (!existsSync(enrichmentDir)) return [];

  const files = readdirSync(enrichmentDir).filter(f => f.endsWith('.marker'));
  if (classLevel === undefined) return files.map(f => join(enrichmentDir, f));

  // Filter by class level: c{N}_{subj}_enrichment_part{M}.marker
  const prefix = `c${classLevel}_`;
  return files
    .filter(f => f.startsWith(prefix))
    .map(f => join(enrichmentDir, f));
}

/**
 * Parse all .marker files for a subject/class and return summaries.
 */
export function getEnrichmentList(subjectKey: string, classLevel: number): EnrichmentNodeSummary[] {
  const subjectDir = SUBJECT_DIRS[subjectKey] || subjectKey;
  const files = findMarkerFiles(subjectDir, classLevel);
  const summaries: EnrichmentNodeSummary[] = [];

  for (const filePath of files) {
    const parsed = parseMarkerFile(filePath, subjectKey);
    if (!parsed) continue;
    summaries.push({
      node_id: parsed.node_id,
      title: parsed.title,
      subject: subjectKey,
      class_level: parsed.class_level,
      cognitive_level: parsed.cognitive_level || null,
      difficulty: null, // Not in .marker files; could be derived later
      has_definition: parsed.definition.length > 0,
      has_walkthrough: parsed.text_walkthrough.length > 0,
      has_eli5: parsed.eli5.length > 0,
      has_misconception: parsed.common_misconception.length > 0,
      has_diagnostic: parsed.diagnostic_question.length > 0,
      prereq_count: 0, // Could be parsed from syllabus files later
    });
  }

  return summaries;
}

/**
 * Get the full parsed node for a specific node_id.
 * Searches all subjects if needed.
 */
export function getEnrichmentNode(nodeId: string): ParsedNode | null {
  // Extract subject from node_id: c{N}_{subj}_{NNN}
  // The subject part may be short (math, phy, chem, bio, evs, cs, geo)
  // Map to the actual folder name
  const parts = nodeId.match(/^c\d+_([a-z]+)_\d+$/);
  if (!parts) return null;
  const subjectKey = parts[1];

  // Try direct mapping first, then try the subject key as-is
  const subjectDir = SUBJECT_DIRS[subjectKey] || subjectKey;

  // Try the mapped subject directory first
  let files = findMarkerFiles(subjectDir);
  for (const filePath of files) {
    const parsed = parseMarkerFile(filePath, subjectKey);
    if (parsed && parsed.node_id === nodeId) return parsed;
  }

  // If not found, search all subject directories
  for (const [sKey, sDir] of Object.entries(SUBJECT_DIRS)) {
    if (sDir === subjectDir) continue; // Already searched
    const allFiles = findMarkerFiles(sDir);
    for (const filePath of allFiles) {
      const parsed = parseMarkerFile(filePath, sKey);
      if (parsed && parsed.node_id === nodeId) return parsed;
    }
  }

  return null;
}

/**
 * Get all subjects that have enrichment files.
 */
export function getAvailableSubjects(): string[] {
  const subjects: string[] = [];
  for (const [key, dir] of Object.entries(SUBJECT_DIRS)) {
    const enrichmentDir = join(CISCE_ROOT, dir, 'enrichment');
    if (existsSync(enrichmentDir)) {
      const files = readdirSync(enrichmentDir).filter(f => f.endsWith('.marker'));
      if (files.length > 0 && !subjects.includes(key)) {
        subjects.push(key);
      }
    }
  }
  return subjects;
}
