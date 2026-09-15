/**
 * C68DataLoader — Server-side loader for all Class 6-8 enrichment data.
 *
 * Reads .marker enrichment files from D:\cisce and parses them into
 * EnrichmentNode objects using the EnrichmentParser.
 *
 * This runs ONLY on the server (Next.js server component / API route)
 * because it uses the Node.js fs module to read files from disk.
 *
 * "use server" ensures this code never ships to the browser.
 */

import 'server-only';
import fs from 'fs';
import path from 'path';
import { parseEnrichmentFile, type EnrichmentNode } from '../game-engine/EnrichmentParser';

// ─── Configuration ───────────────────────────────────────────

/** Root directory containing all CISCE enrichment data */
const CISCE_ROOT = 'D:\\cisce';

/** Subjects we load for Class 6-8, mapped to their directory names */
const SUBJECT_DIRS: Record<string, { dir: string; name: string }> = {
  physics:    { dir: 'physics',  name: 'Physics' },
  chem:       { dir: 'chem',     name: 'Chemistry' },
  bio:        { dir: 'bio',      name: 'Biology' },
  maths:      { dir: 'maths',    name: 'Mathematics' },
  geo:        { dir: 'geo',      name: 'Geography' },
  cs:         { dir: 'cs',       name: 'Computer Science' },
  histciv:    { dir: 'histciv',  name: 'History & Civics' },
};

/** Classes we support */
const CLASS_LEVELS = [6, 7, 8] as const;

// ─── Types ───────────────────────────────────────────────────

export interface SubjectInfo {
  key: string;
  name: string;
  classLevel: number;
  nodeCount: number;
}

export interface ClassInfo {
  classLevel: number;
  subjects: SubjectInfo[];
  totalNodes: number;
}

// ─── Cache ───────────────────────────────────────────────────

let _allNodes: EnrichmentNode[] | null = null;
let _nodesByClass: Map<number, EnrichmentNode[]> = new Map();
let _nodesByClassSubject: Map<string, EnrichmentNode[]> = new Map();
let _nodeById: Map<string, EnrichmentNode> = new Map();
let _classInfo: ClassInfo[] = [];

// ─── Loader ──────────────────────────────────────────────────

/**
 * Load all enrichment files for Class 6-8 from disk.
 * Results are cached — subsequent calls return the cached data.
 */
export function loadAllNodes(): EnrichmentNode[] {
  if (_allNodes) return _allNodes;

  const allNodes: EnrichmentNode[] = [];

  for (const [subjectKey, { dir, name }] of Object.entries(SUBJECT_DIRS)) {
    const enrichmentDir = path.join(CISCE_ROOT, dir, 'enrichment');

    if (!fs.existsSync(enrichmentDir)) {
      console.warn(`[C68DataLoader] No enrichment directory at ${enrichmentDir}`);
      continue;
    }

    // Read all .marker files for classes 6, 7, 8
    const files = fs.readdirSync(enrichmentDir)
      .filter(f => f.endsWith('.marker') && /^c[678]_/.test(f))
      .sort();

    for (const file of files) {
      const filePath = path.join(enrichmentDir, file);

      // Determine class level from filename (c6_..., c7_..., c8_...)
      const classMatch = file.match(/^c(\d)_/);
      if (!classMatch) continue;
      const classLevel = parseInt(classMatch[1], 10);
      if (!CLASS_LEVELS.includes(classLevel as 6 | 7 | 8)) continue;

      try {
        const content = fs.readFileSync(filePath, 'utf-8');
        const nodes = parseEnrichmentFile(content, subjectKey, classLevel);

        // Attach the human-readable subject name
        for (const node of nodes) {
          (node as EnrichmentNode & { subjectName: string }).subjectName = name;
          allNodes.push(node);
        }
      } catch (err) {
        console.error(`[C68DataLoader] Error parsing ${filePath}:`, err);
      }
    }
  }

  // Build indexes
  _allNodes = allNodes;
  _nodeById = new Map(allNodes.map(n => [n.nodeId, n]));

  _nodesByClass = new Map();
  _nodesByClassSubject = new Map();

  for (const cls of CLASS_LEVELS) {
    const classNodes = allNodes.filter(n => n.classLevel === cls);
    _nodesByClass.set(cls, classNodes);

    for (const [subjectKey] of Object.entries(SUBJECT_DIRS)) {
      const key = `${cls}-${subjectKey}`;
      const subjectNodes = classNodes.filter(n => n.subject === subjectKey);
      _nodesByClassSubject.set(key, subjectNodes);
    }
  }

  // Build class info
  _classInfo = CLASS_LEVELS.map(cls => {
    const classNodes = _nodesByClass.get(cls)!;
    const subjects: SubjectInfo[] = Object.entries(SUBJECT_DIRS).map(([key, { name }]) => {
      const subjectNodes = classNodes.filter(n => n.subject === key);
      return { key, name, classLevel: cls, nodeCount: subjectNodes.length };
    }).filter(s => s.nodeCount > 0);

    return {
      classLevel: cls,
      subjects,
      totalNodes: classNodes.length,
    };
  });

  console.log(`[C68DataLoader] Loaded ${allNodes.length} enrichment nodes for C6-8`);
  return allNodes;
}

/**
 * Get class info (which subjects are available, how many nodes each).
 */
export function getClassInfo(): ClassInfo[] {
  if (!_allNodes) loadAllNodes();
  return _classInfo;
}

/**
 * Get all nodes for a specific class level.
 */
export function getNodesByClass(classLevel: number): EnrichmentNode[] {
  if (!_allNodes) loadAllNodes();
  return _nodesByClass.get(classLevel) ?? [];
}

/**
 * Get all nodes for a specific class + subject combination.
 */
export function getNodesByClassSubject(classLevel: number, subject: string): EnrichmentNode[] {
  if (!_allNodes) loadAllNodes();
  const key = `${classLevel}-${subject}`;
  return _nodesByClassSubject.get(key) ?? [];
}

/**
 * Look up a single node by its ID (e.g. "c6_phy_007").
 */
export function getNodeById(nodeId: string): EnrichmentNode | undefined {
  if (!_allNodes) loadAllNodes();
  return _nodeById.get(nodeId);
}

/**
 * Get the human-readable subject name.
 */
export function getSubjectName(subjectKey: string): string {
  return SUBJECT_DIRS[subjectKey]?.name ?? subjectKey;
}
