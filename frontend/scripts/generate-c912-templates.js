/**
 * generate-c912-templates.js
 *
 * Generates C9-12 simulation templates using Gemini 3.5 Flash.
 *
 * - 2 Gemini API keys, alternating (2 templates per batch, parallel)
 * - Passes ACTUAL enrichment data from .marker files into the prompt
 * - Enhanced features: adaptive difficulty, guided discovery, progress
 *   tracking, spaced repetition, mobile responsive, clean UI, hint system
 * - Quality check after each template
 * - Batch of 2, verify, then next 2
 * - 30s delay between batches
 *
 * Usage:
 *   node scripts/generate-c912-templates.js                    (all)
 *   node scripts/generate-c912-templates.js --limit=4          (first 4)
 *   node scripts/generate-c912-templates.js --only=kinematics  (specific)
 *   node scripts/generate-c912-templates.js --subject=physics  (all physics)
 */

const fs = require('fs');
const https = require('https');
const path = require('path');

// ─── Keys & Models ───────────────────────────────────────────
// 3 keys, each cycling through 3 models (3.7 → 3.6 → 3.5)
// 20 RPD per model per key = 60 requests per key = 180 total per day
// NO retries — failed templates can be retried in a later run

const API_KEYS = [
  'AQ.Ab8RN6LDccrCPDvyQ4nFydMGXEz0XYJexA1VBgyA1AKvmnUEwg',
  'AQ.Ab8RN6KNABGpFE0AN7Mgsu0wWlMTd94M-ZfNncE0W7Iz41TKdA',
  'AQ.Ab8RN6JQsjDH9MWFSdbXUsWwRHBgUyilNKzK-1a0tFAPieMYCA',
];

const MODELS = ['gemini-3.5-flash'];
const REQUESTS_PER_MODEL = 20; // 20 RPD per model per key

// Build the full request queue: 3 keys × 3 models × 20 requests = 180 slots
// Order: first 20 with 3.7, then 20 with 3.6, then 20 with 3.5 (per key)
function buildRequestSlots() {
  const slots = [];
  for (const model of MODELS) {
    for (let r = 0; r < REQUESTS_PER_MODEL; r++) {
      for (let k = 0; k < API_KEYS.length; k++) {
        slots.push({
          key: API_KEYS[k],
          model: model,
          label: `Key${k + 1}-${model.replace('gemini-', '')}`,
        });
      }
    }
  }
  return slots;
}

const GEMINI_KEYS = buildRequestSlots(); // Array of 180 slots

const API_HOST = 'generativelanguage.googleapis.com';
const MAX_OUTPUT_TOKENS = 65536;
const TEMPERATURE = 0.7;
const BATCH_DELAY_MS = 90000;
const REQUEST_TIMEOUT_MS = 180000;

const OUTPUT_DIR = path.join(__dirname, '..', 'components', 'simulations', 'c9_12');
const REFERENCE_FILE = path.join(__dirname, '..', 'components', 'simulations', 'c6_8', 'AlgebraSolverSimulation.tsx');
const ENRICHMENT_BASE = path.join('D:', 'cisce');

// ─── Parse CLI arguments ─────────────────────────────────────

function parseArgs() {
  const args = { limit: null, only: null, subject: null };
  for (const arg of process.argv.slice(2)) {
    if (arg.startsWith('--limit=')) args.limit = parseInt(arg.split('=')[1]);
    if (arg.startsWith('--only=')) args.only = arg.split('=')[1];
    if (arg.startsWith('--subject=')) args.subject = arg.split('=')[1];
  }
  return args;
}

// ─── Template definitions loaded from architecture file ──────
// (loaded at bottom of file via TEMPLATES array)

// ─── Enrichment data loader ──────────────────────────────────

function loadEnrichmentData(subject, nodeId) {
  // Find the .marker file for this node
  const dir = path.join(ENRICHMENT_BASE, subject, 'enrichment');
  if (!fs.existsSync(dir)) return null;

  const files = fs.readdirSync(dir).filter(f => f.endsWith('.marker'));
  for (const f of files) {
    const content = fs.readFileSync(path.join(dir, f), 'utf8');
    // Check if this file contains the node
    if (content.includes(`NODE ${nodeId}`) || content.includes(`--- ${nodeId} ---`)) {
      return parseEnrichment(content, nodeId);
    }
  }
  return null;
}

function parseEnrichment(content, nodeId) {
  // Extract sections for this specific node
  const nodeStart = content.indexOf(`--- NODE ${nodeId} ---`);
  if (nodeStart === -1) return null;

  // Find the next node or end of file
  const nextNodeMatch = content.substring(nodeStart + 1).match(/\n--- NODE /);
  const nodeEnd = nextNodeMatch ? nodeStart + 1 + nextNodeMatch.index : content.length;
  const nodeContent = content.substring(nodeStart, nodeEnd);

  const result = {
    title: '',
    definition: '',
    eli5: '',
    misconceptions: [],
    diagnosticQuestions: [],
    masteryCriteria: '',
    onFailure: '',
    cognitiveLevel: '',
    scopeBoundary: '',
  };

  // Extract TITLE
  const titleMatch = nodeContent.match(/TITLE:\s*\|?\s*(.+)/);
  if (titleMatch) result.title = titleMatch[1].trim();

  // Extract DEFINITION
  const defMatch = nodeContent.match(/DEFINITION:\s*\|?\s*([\s\S]*?)(?:TEXT_WALKTHROUGH|ELI5|COMMON_MISCONCEPTION)/);
  if (defMatch) result.definition = defMatch[1].trim();

  // Extract ELI5
  const eli5Match = nodeContent.match(/ELI5:\s*\|?\s*([\s\S]*?)(?:COMMON_MISCONCEPTION|DIAGNOSTIC_QUESTION|ON_FAILURE|COGNITIVE_LEVEL|MASTERY_CRITERIA|SCOPE_BOUNDARY)/);
  if (eli5Match) result.eli5 = eli5Match[1].trim();

  // Extract MASTERY_CRITERIA
  const masteryMatch = nodeContent.match(/MASTERY_CRITERIA:\s*\|?\s*([\s\S]*?)(?:SCOPE_BOUNDARY|ON_FAILURE|COGNITIVE_LEVEL|$)/);
  if (masteryMatch) result.masteryCriteria = masteryMatch[1].trim();

  // Extract ON_FAILURE
  const failMatch = nodeContent.match(/ON_FAILURE:\s*\|?\s*([\s\S]*?)(?:COGNITIVE_LEVEL|MASTERY_CRITERIA|SCOPE_BOUNDARY|$)/);
  if (failMatch) result.onFailure = failMatch[1].trim();

  // Extract COGNITIVE_LEVEL
  const cogMatch = nodeContent.match(/COGNITIVE_LEVEL:\s*\|?\s*(.+)/);
  if (cogMatch) result.cognitiveLevel = cogMatch[1].trim();

  // Extract SCOPE_BOUNDARY
  const scopeMatch = nodeContent.match(/SCOPE_BOUNDARY:\s*\|?\s*([\s\S]*?)(?:$)/);
  if (scopeMatch) result.scopeBoundary = scopeMatch[1].trim();

  return result;
}

// ─── Find representative node for a template ─────────────────

function findRepresentativeNode(subject, keywords) {
  const dir = path.join(ENRICHMENT_BASE, subject, 'enrichment');
  if (!fs.existsSync(dir)) return null;

  const files = fs.readdirSync(dir).filter(f => f.endsWith('.marker') &&
    (f.startsWith('c9_') || f.startsWith('c10_') || f.startsWith('c11_') || f.startsWith('c12_')));

  // Score each node by how many keywords match the title
  let bestMatch = null;
  let bestScore = 0;

  for (const f of files) {
    const content = fs.readFileSync(path.join(dir, f), 'utf8');
    const titleMatch = content.match(/TITLE:\s*\|?\s*(.+)/);
    if (titleMatch) {
      const title = titleMatch[1].trim().toLowerCase();
      let score = 0;
      for (const kw of keywords) {
        if (title.includes(kw.toLowerCase())) score++;
      }
      // Prefer nodes where multiple keywords match
      if (score > bestScore) {
        const nodeIdMatch = content.match(/--- NODE (c\d+_\w+) ---/);
        if (nodeIdMatch) {
          bestScore = score;
          bestMatch = { nodeId: nodeIdMatch[1], content, fileName: f };
        }
      }
    }
  }

  if (bestMatch) return bestMatch;

  // Fallback: return the first C9 file
  const c9Files = files.filter(f => f.startsWith('c9_'));
  if (c9Files.length > 0) {
    const content = fs.readFileSync(path.join(dir, c9Files[0]), 'utf8');
    const nodeIdMatch = content.match(/--- NODE (c\d+_\w+) ---/);
    if (nodeIdMatch) {
      return { nodeId: nodeIdMatch[1], content, fileName: c9Files[0] };
    }
  }
  return null;
}

// ─── Gemini API call ─────────────────────────────────────────

function callGemini(prompt, apiKey, model, keyLabel) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: TEMPERATURE,
        maxOutputTokens: MAX_OUTPUT_TOKENS,
        topP: 0.9,
      },
    });

    const apiPath = `/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const options = {
      hostname: API_HOST,
      path: apiPath,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
      },
    };

    console.log(`  [${keyLabel}] Calling Gemini ${model}... (prompt: ${prompt.length} chars)`);

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        if (res.statusCode !== 200) {
          console.error(`  [${keyLabel}] HTTP ${res.statusCode}: ${data.substring(0, 500)}`);
          reject(new Error(`Gemini API returned ${res.statusCode} for key ${keyLabel}`));
          return;
        }
        try {
          const json = JSON.parse(data);
          if (json.candidates && json.candidates[0]) {
            const text = json.candidates[0].content.parts[0].text;
            const usage = json.usageMetadata;
            console.log(`  [${keyLabel}] Output: ${text.length} chars, tokens: ${usage?.totalTokenCount || '?'}`);
            resolve(text);
          } else {
            console.error(`  [${keyLabel}] No candidates in response`);
            reject(new Error(`No candidates in Gemini response for key ${keyLabel}`));
          }
        } catch (e) {
          console.error(`  [${keyLabel}] Parse error: ${e.message}`);
          reject(e);
        }
      });
    });

    req.on('error', reject);
    req.setTimeout(REQUEST_TIMEOUT_MS, () => {
      req.destroy(new Error(`Request timeout for key ${keyLabel}`));
    });

    req.write(body);
    req.end();
  });
}

// ─── Extract code from Gemini response ───────────────────────

function extractCode(text) {
  const tsxMatch = text.match(/```tsx\n([\s\S]*?)```/);
  if (tsxMatch) return tsxMatch[1];

  const tsMatch = text.match(/```typescript\n([\s\S]*?)```/);
  if (tsMatch) return tsMatch[1];

  const codeMatch = text.match(/```\n([\s\S]*?)```/);
  if (codeMatch) return codeMatch[1];

  if (text.trim().startsWith("'use client'") || text.trim().startsWith('"use client"')) {
    return text.trim();
  }

  // Handle truncated 'use client' (Gemini sometimes drops first quote)
  if (text.trim().startsWith("use client'") || text.trim().startsWith('use client"')) {
    return "'" + text.trim();
  }

  const clientMatch = text.match(/['"]use client['"]/);
  if (clientMatch) {
    return text.substring(clientMatch.index).trim();
  }

  // Last resort: find "use client" anywhere and prepend the quote
  const partialMatch = text.match(/use client['"]/);
  if (partialMatch) {
    return "'" + text.substring(partialMatch.index).trim();
  }

  console.warn('  Warning: No code block found, returning raw text');
  return text;
}

// ─── Quality check ───────────────────────────────────────────

function qualityCheck(code, templateKey) {
  const issues = [];
  const lineCount = code.split('\n').length;

  if (!code.includes("'use client'") && !code.includes('"use client"')) {
    issues.push("Missing 'use client' directive");
  }

  if (!code.includes('export default')) {
    issues.push('Missing default export');
  }

  if (!code.includes('export interface')) {
    issues.push('Missing exported props interface');
  }

  if (!code.includes('<svg')) {
    issues.push('No SVG element found — simulation will not render visually');
  }

  if (lineCount < 500) {
    issues.push(`Only ${lineCount} lines (minimum 500)`);
  }

  // Interactive controls
  const hasSlider = code.includes('type="range"') || code.includes("type='range'");
  const hasButton = code.includes('<button') || code.includes('onClick');
  const hasInput = code.includes('type="number"') || code.includes('type="text"') || code.includes('<textarea');
  const controlCount = [hasSlider, hasButton, hasInput].filter(Boolean).length;
  if (controlCount < 2) {
    issues.push(`Only ${controlCount} control type(s) found (need at least 2)`);
  }

  // Banned imports
  const bannedImports = ['matter-js', 'three', 'pixi', 'jsxgraph', 'function-plot', 'katex', 'planck'];
  for (const banned of bannedImports) {
    if (code.includes(banned)) {
      issues.push(`Banned import found: ${banned}`);
    }
  }

  // Animation
  const hasAnimation = code.includes('<animate') || code.includes('animation:') || code.includes('keyframes') || code.includes('motion.');
  if (!hasAnimation) {
    issues.push('No animation found — simulation will look static/dead');
  }

  // Misconception feedback
  if (!code.toLowerCase().includes('misconception') && !code.toLowerCase().includes('feedback')) {
    issues.push('No misconception/feedback handling found');
  }

  // Real-world activity
  if (!code.toLowerCase().includes('try this') && !code.toLowerCase().includes('do it real') && !code.toLowerCase().includes('yourself') && !code.toLowerCase().includes('real-world')) {
    issues.push('No real-world activity prompt found');
  }

  // ELI5
  if (!code.toLowerCase().includes('eli5') && !code.toLowerCase().includes('simple explanation') && !code.toLowerCase().includes('simple terms')) {
    issues.push('No ELI5/simple explanation section found');
  }

  // Hint system (accepts either showHint/hintTimer OR hintLevel pattern)
  if (!code.includes('showHint') && !code.includes('hintTimer') && !code.includes('hintLevel') && !code.includes('Hint')) {
    issues.push('No hint system found');
  }

  // Progress bar
  if (!code.includes('progress') && !code.includes('Progress')) {
    issues.push('No progress bar found');
  }

  // Adaptive difficulty
  if (!code.toLowerCase().includes('adaptive') && !code.toLowerCase().includes('difficulty') && !code.toLowerCase().includes('foundation') && !code.toLowerCase().includes('standard') && !code.toLowerCase().includes('advanced')) {
    issues.push('No adaptive difficulty indicators found');
  }

  // Progress tracking / localStorage
  if (!code.includes('localStorage') && !code.includes('mastery')) {
    issues.push('No progress tracking (localStorage/mastery) found');
  }

  // onComplete callback
  if (!code.includes('onComplete')) {
    issues.push('No onComplete callback found');
  }

  return {
    passed: issues.length === 0,
    issues,
    lineCount,
    hasAnimation,
  };
}

// ─── Quality Bar (C9-12 Enhanced) ────────────────────────────

const QUALITY_BAR = `## SIMULATION QUALITY BAR — C9-12 ENHANCED STANDARD

You are generating an INTERACTIVE SIMULATION TEMPLATE for Indian CISCE students (Class 9-12).
This is a REUSABLE TEMPLATE — it receives enrichment data as props and adapts its content.
A struggling student will interact with this to learn a concept.

### REQUIRED ELEMENTS (ALL must be present):

1. **Self-contained React + TypeScript component** (1200-1800 lines MINIMUM — do NOT generate less than 1200 lines)
   - 'use client' at the top
   - Only imports: React hooks (useState, useEffect, useRef, useCallback) + framer-motion (motion, AnimatePresence)
   - NO other external libraries — especially NO three.js, matter-js, pixi.js, katex, jsxgraph, or any 3D/physics library
   - Exports default function component
   - Exports a props interface that accepts enrichment data
   - The component MUST be substantial — every section below needs REAL content, not stubs
   - CRITICAL: You MUST generate at least 1200 lines. If you think the component is under 1200 lines, ADD MORE:
     * MORE interactive sub-visualizations with their own SVG scenes
     * MORE challenge variants (at least 7-8 challenges, not 5)
     * MORE detailed theory text (300+ words of explanation per section)
     * MORE SVG detail (multiple visual modes, conditional renders, animated elements)
     * MORE interactive controls (sliders, buttons, dropdowns, toggles, inputs)
     * MORE conditional render branches for different states
     * MORE guided discovery steps (at least 5 discovery interactions)
     * MORE misconception feedback (at least 5 misconceptions with detailed corrections)
   - The SVG section alone should be 250+ lines with multiple visual modes
   - Include at least 7 challenges with full variant retry logic
   - Include detailed theory section with 300+ words of explanation

2. **Animated inline SVG diagram** (topic-specific, looks ALIVE) — MUST be RICH and DETAILED
   - Must draw the ACTUAL concept for this template type with MULTIPLE visual sub-components
   - Use <svg>, <rect>, <circle>, <line>, <path>, <text>, <defs>, <linearGradient>, <radialGradient>, <filter>, <pattern>
   - SVG must be at least 500x350 pixels, responsive (viewBox, width="100%")
   - SVG elements MUST change based on user interaction (state-driven)
   - Use <animate> elements or CSS keyframes for continuous animation
   - The simulation must look ALIVE — things move, glow, flow, vibrate
   - NO emoji as primary visual — use actual SVG shapes
   - The SVG section alone should be 150+ lines of JSX with multiple conditional renders for different modes/views
   - Include at least 3 different visual modes/states that the SVG can switch between

3. **At least 3 interactive controls**
   - Sliders, drag-and-drop, buttons, text/number inputs, click-to-select

4. **Live readouts** (at least 3, with proper units, updating in real-time)

5. **5 progressive challenges** (increasing difficulty: recall → apply → analyze → evaluate → create)
   - Each has: question text, input method, answer check, feedback
   - Wrong answer feedback MUST use the misconception text from props
   - Format: "Misconception: [belief] → Correction: [correction]"
   - Each challenge should have its own SVG sub-visualization or state change
   - Include variant generation for retry (different numbers, same concept)

6. **ELI5 explanation** (display the eli5 text from props in a highlighted box)

7. **Real-world activity prompt** (after challenges, textarea for student response)

8. **Visual feedback with framer-motion** (correct=green, wrong=red/orange)

9. **TypeScript quality** (no 'any', all typed, no unused imports)

### ENHANCED FEATURES (C9-12 — ALL must be present):

10. **Adaptive Difficulty**
    - Track a difficultyLevel state: 'foundation' | 'standard' | 'advanced'
    - Start at 'standard'. If student fails a challenge, drop to 'foundation' (show simpler variant or extra hint).
    - If student aces all 3, offer 'advanced' bonus question.
    - Display current difficulty level as a badge.

11. **Guided Discovery**
    - BEFORE showing the formula/definition, let the student INTERACT with the simulation.
    - The first interaction should be exploratory: "Try moving the slider — what do you notice?"
    - THEN reveal the rule/formula in the teaching section.
    - The student discovers the relationship by playing, then formalizes it.

12. **Progress Tracking (localStorage)**
    - On challenge completion, save to localStorage: key = \`c912_mastery_\${nodeId}\`, value = { score, completedAt, difficultyLevel }
    - On component mount, load saved mastery and show "Previously scored: X/100" if exists
    - Track per-node mastery score (0-100)
    - Show "Needs Review" badge if last attempt was >3 days ago

13. **Spaced Repetition**
    - On completion, calculate next review date: +3 days if score <70, +7 days if 70-90, +21 days if >90
    - Save to localStorage: key = \`c912_review_\${nodeId}\`, value = nextReviewDate
    - Show "Next review: [date]" in completion section

14. **Hint System (Progressive)**
    - Show Hint button (not always visible)
    - Auto-hint after 10 seconds of inactivity (useRef timer)
    - Progressive hints: first click shows nudge, second click shows formula, third shows worked example
    - Track hintLevel state (0=none, 1=nudge, 2=formula, 3=worked example)
    - Reset timer on any interaction (handleInteraction function)

15. **Mobile Responsive**
    - SVG uses viewBox and width="100%" so it scales
    - Container max-width: 700px, centered
    - Grid layouts use responsive classes (grid-cols-1 sm:grid-cols-2 etc.)
    - Text sizes use responsive classes (text-sm sm:text-base)

16. **Clean UI**
    - Single-column layout, generous whitespace
    - Minimal borders, subtle shadows
    - One concept, one interaction, one question at a time
    - No visual clutter — remove unnecessary badges/boxes

17. **Retry with Variant**
    - When a student gets a wrong answer, after showing the misconception,
    offer a "Try Similar Question" button that generates a variant with different numbers.
    - Track retryCount state. Variant uses different values but same concept.

18. **onComplete callback** with score (0-100)

### ANTI-PATTERNS (DO NOT DO THESE):
1. DO NOT generate static diagrams — everything must respond to user input
2. DO NOT use emoji as the primary visual
3. DO NOT import any library except React and framer-motion — NO three.js, NO matter-js, NO pixi.js, NO katex
4. DO NOT use placeholder text — every control must work
5. DO NOT use generic "Try again" — use the specific misconception from props
6. DO NOT skip the real-world activity
7. DO NOT make all challenges the same difficulty
8. DO NOT generate less than 1200 lines — if you are under 1200, ADD more SVG detail, more challenges (7-8), more theory (300+ words), more interactive controls, more visual modes, more guided discovery steps
9. DO NOT skip adaptive difficulty, progress tracking, or spaced repetition
10. DO NOT skip the guided discovery phase before teaching
11. DO NOT use 'any' type — all types must be explicit
12. DO NOT leave unused imports or variables
13. DO NOT use LaTeX-style $...$ in JSX text — use plain text like V_max, K_m
14. DO NOT use 'Infinite' — use 'Infinity' (JavaScript built-in)
15. DO NOT use invalid SVG attributes like 'italic', 'fontFamly', 'fontWait', 'fontfontWeight' — use 'fontStyle', 'fontFamily', 'fontWeight'`;

// ─── Prompt builder ──────────────────────────────────────────

function buildPrompt(template, enrichmentData, referenceCode) {
  // Build enrichment data section from actual .marker file content
  const enrichmentSection = enrichmentData ? `
### ACTUAL CISCE ENRICHMENT DATA (use this in DEFAULT_PROPS):

Node ID: ${enrichmentData.nodeId || template.representativeNodeId}
Title: ${enrichmentData.title || template.name}

DEFINITION (use as default definition prop):
${(enrichmentData.definition || '').substring(0, 1500)}

ELI5 (use as default eli5 prop):
${(enrichmentData.eli5 || '').substring(0, 500)}

MASTERY CRITERIA (use as default masteryCriteria prop):
${(enrichmentData.masteryCriteria || '').substring(0, 300)}

ON FAILURE (use for prerequisite routing hints):
${(enrichmentData.onFailure || '').substring(0, 300)}
` : `
### TEMPLATE SPECIFICATION (no enrichment file found — use topic-appropriate defaults):

Template: ${template.name}
Description: ${template.description}
Nodes covered: ${template.nodes}
`;

  return `You are an expert educational software engineer. Generate a COMPLETE, INTERACTIVE simulation TEMPLATE component for CISCE Class 9-12.

${QUALITY_BAR}

### TEMPLATE SPECIFICATION:

Template name: ${template.name}
File name: ${template.key}.tsx
Description: ${template.description}
Nodes it covers: ${template.nodes}

Interactive controls needed: ${template.controls}
Live readouts needed: ${template.readouts}
Progressive challenges: ${template.challenges}

${enrichmentSection}

### PROPS INTERFACE:

The component must accept these props (from enrichment data):
- nodeId: string (e.g. "${template.representativeNodeId || 'c9_phy_001'}")
- title: string (topic title)
- definition: string (300-500 word definition — display in theory section)
- eli5: string (60-80 word child-friendly explanation — display at start)
- misconceptions: array of { belief: string, correction: string } (use for wrong-answer feedback)
- diagnosticQuestions: array of { number, bloomLevel, question, answer, answerType, unit, formula, working, hint, options } (use for challenges)
- masteryCriteria: string (display in completion section)
- onComplete?: (score: number) => void (call when student finishes)

### REFERENCE EXAMPLE (match this quality, animation level, and code pattern):

${referenceCode.substring(0, 6000)}

### OUTPUT:

Generate ONLY the TypeScript code. Start with 'use client' and end with the closing brace.
No markdown fences, no explanations, no text before or after the code.

The file will be saved as: ${template.key}.tsx`;
}

// ─── Main ────────────────────────────────────────────────────

async function main() {
  const args = parseArgs();

  // Load reference code
  let referenceCode = '';
  if (fs.existsSync(REFERENCE_FILE)) {
    referenceCode = fs.readFileSync(REFERENCE_FILE, 'utf-8');
    console.log(`Loaded reference: ${REFERENCE_FILE} (${referenceCode.split('\n').length} lines)`);
  } else {
    console.error(`Reference file not found: ${REFERENCE_FILE}`);
    process.exit(1);
  }

  // Ensure output directory exists
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  console.log(`Output directory: ${OUTPUT_DIR}`);

  // Filter templates
  let templatesToGenerate = TEMPLATES;

  // Skip templates that already exist
  templatesToGenerate = templatesToGenerate.filter(t => {
    const filePath = path.join(OUTPUT_DIR, `${t.key}.tsx`);
    if (fs.existsSync(filePath)) {
      console.log(`  SKIP: ${t.key}.tsx already exists`);
      return false;
    }
    return true;
  });

  // Apply --only filter
  if (args.only) {
    templatesToGenerate = templatesToGenerate.filter(t =>
      t.key.toLowerCase().includes(args.only.toLowerCase())
    );
  }

  // Apply --subject filter
  if (args.subject) {
    templatesToGenerate = templatesToGenerate.filter(t =>
      t.subject && t.subject.toLowerCase() === args.subject.toLowerCase()
    );
  }

  // Apply --limit
  if (args.limit) {
    templatesToGenerate = templatesToGenerate.slice(0, args.limit);
  }

  console.log(`\nTemplates to generate: ${templatesToGenerate.length}`);

  if (templatesToGenerate.length === 0) {
    console.log('Nothing to generate. All templates exist.');
    return;
  }

  // Load enrichment data for each template
  console.log('\nLoading enrichment data...');
  for (const template of templatesToGenerate) {
    const repNode = findRepresentativeNode(template.subject, template.keywords);
    if (repNode) {
      template.enrichmentData = parseEnrichment(repNode.content, repNode.nodeId);
      template.enrichmentData.nodeId = repNode.nodeId;
      template.representativeNodeId = repNode.nodeId;
      console.log(`  ${template.key}: node ${repNode.nodeId} — ${template.enrichmentData.title?.substring(0, 50) || 'no title'}`);
    } else {
      console.log(`  ${template.key}: NO enrichment data found (using defaults)`);
      template.enrichmentData = null;
    }
  }

  // Process in batches of 3 (one per key, parallel) using sequential slots
  let successCount = 0;
  let failCount = 0;
  const BATCH_SIZE = 3;
  let slotIndex = 0; // Tracks which slot in GEMINI_KEYS we're on

  for (let i = 0; i < templatesToGenerate.length; i += BATCH_SIZE) {
    const batch = templatesToGenerate.slice(i, i + BATCH_SIZE);
    const batchNum = Math.floor(i / BATCH_SIZE) + 1;
    const totalBatches = Math.ceil(templatesToGenerate.length / BATCH_SIZE);

    console.log(`\n${'='.repeat(60)}`);
    console.log(`BATCH ${batchNum}/${totalBatches} (slots ${slotIndex}-${slotIndex + batch.length - 1} of ${GEMINI_KEYS.length})`);
    console.log(`${'='.repeat(60)}`);

    const promises = batch.map((template, idx) => {
      const slot = GEMINI_KEYS[slotIndex + idx];
      if (!slot) {
        console.error(`  NO SLOT AVAILABLE for ${template.key} — all 180 requests used up`);
        return Promise.resolve({ key: template.key, success: false, error: 'No slots remaining' });
      }
      const prompt = buildPrompt(template, template.enrichmentData, referenceCode);

      console.log(`\n[${slot.label}] Template: ${template.key} — ${template.name}`);

      // NO retries — single attempt only
      return callGemini(prompt, slot.key, slot.model, slot.label)
        .then(response => {
          const code = extractCode(response);
          const filePath = path.join(OUTPUT_DIR, `${template.key}.tsx`);

          const qc = qualityCheck(code, template.key);
          console.log(`\n  Quality check for ${template.key}:`);
          console.log(`    Lines: ${qc.lineCount}`);
          console.log(`    Animation: ${qc.hasAnimation ? 'Yes' : 'No'}`);

          if (qc.passed) {
            console.log(`    ALL CHECKS PASSED`);
          } else {
            console.log(`    ISSUES:`);
            for (const issue of qc.issues) {
              console.log(`      - ${issue}`);
            }
          }

          fs.writeFileSync(filePath, code, 'utf-8');
          console.log(`    Saved: ${filePath}`);

          return { key: template.key, success: true, qc };
        })
        .catch(err => {
          console.error(`  FAILED for ${template.key}: ${err.message}`);
          return { key: template.key, success: false, error: err.message };
        });
    });

    slotIndex += batch.length;

    const results = await Promise.all(promises);

    for (const result of results) {
      if (result.success) {
        successCount++;
      } else {
        failCount++;
      }
    }

    // 90 second delay between batches (RPM limit safety)
    if (i + BATCH_SIZE < templatesToGenerate.length) {
      console.log(`\nWaiting 90 seconds before next batch...`);
      await new Promise(resolve => setTimeout(resolve, BATCH_DELAY_MS));
    }
  }

  console.log(`\n${'='.repeat(60)}`);
  console.log(`GENERATION COMPLETE`);
  console.log(`${'='.repeat(60)}`);
  console.log(`Success: ${successCount}`);
  console.log(`Failed:  ${failCount}`);
  console.log(`Output:  ${OUTPUT_DIR}`);
}

// ─── TEMPLATES array ─────────────────────────────────────────
// (defined below, before main() is called)

const TEMPLATES = [
  // ─── Physics (26 templates) ─────────────────────────────
  {
    key: 'KinematicsSim', name: 'Kinematics Simulator', subject: 'physics',
    description: 'Interactive motion simulator: particle moves on a line, sliders for initial velocity and acceleration, real-time distance-time and velocity-time graphs, displacement vector. Shows equations of motion (v=u+at, s=ut+1/2at², v²=u²+2as) updating live.',
    nodes: 'C9: distance/displacement, speed/velocity, acceleration, equations of motion, distance-time & velocity-time graphs. C11: frame of reference, motion in straight line, projectile motion, uniform circular motion, kinematic equations using calculus.',
    controls: 'Sliders for initial velocity (0-50 m/s), acceleration (-10 to 10 m/s²), time (0-10s). Play/pause animation button. Graph toggle (distance-time / velocity-time).',
    readouts: 'Distance (m), Displacement (m), Velocity (m/s), Acceleration (m/s²), Time (s)',
    challenges: '1) Set u=10, a=2, t=5. What is final velocity? 2) A car decelerates at 5 m/s² from 20 m/s. How far before stopping? 3) A ball is thrown upward at 15 m/s. When does it return? (g=10)',
    keywords: ['distance', 'displacement', 'speed', 'velocity', 'acceleration', 'motion', 'kinematic', 'projectile', 'frame of reference', 'uniformly accelerated', 'straight line', 'circular motion'],
  },
  {
    key: 'NewtonsLawsSim', name: "Newton's Laws Lab", subject: 'physics',
    description: 'Force diagram simulator: block on a surface, sliders for applied force, mass, friction coefficient. Shows free-body diagram with force vectors (applied, friction, normal, weight). Net force and acceleration calculated live. Demonstrates all three laws.',
    nodes: "C9: contact forces, non-contact forces, Newton's 3 laws, momentum, impulse, friction. C11: Newton's laws (detailed), linear momentum, impulse, static/kinetic friction, inclined plane, equilibrium of concurrent forces, centripetal force.",
    controls: 'Sliders for applied force (0-100 N), mass (1-20 kg), friction coefficient (0-1), angle of incline (0-45°). Play/pause animation.',
    readouts: 'Net force (N), Acceleration (m/s²), Friction force (N), Normal force (N), Momentum (kg·m/s)',
    challenges: "1) Apply 20N to a 5kg block on frictionless surface. What is acceleration? 2) What force is needed to keep a 10kg block moving at constant velocity on a surface with μ=0.3? 3) A 2kg ball changes velocity from 5 to 15 m/s in 2s. What is the impulse?",
    keywords: ['newton', 'momentum', 'impulse', 'friction', 'incline', 'force', 'inertia', 'contact force', 'non-contact', 'equilibrium', 'centripetal'],
  },
  {
    key: 'WorkEnergySim', name: 'Work & Energy Lab', subject: 'physics',
    description: 'Ball on a ramp with adjustable height and mass. Shows PE converting to KE as ball rolls down. Energy bars (PE, KE, total) update in real-time. Collision simulator for elastic/inelastic collisions showing momentum and energy conservation.',
    nodes: 'C9: work, energy, machine efficiency. C11: work done (constant & variable force), kinetic energy, potential energy, work-energy theorem, conservation of mechanical energy, elastic/inelastic collisions, power.',
    controls: 'Ramp height slider (0-20 m), ball mass slider (1-10 kg), collision type selector (elastic/inelastic/perfectly inelastic), play/pause button.',
    readouts: 'Potential energy (J), Kinetic energy (J), Total energy (J), Work done (J), Power (W)',
    challenges: '1) A 2kg ball is at 10m height. What is its PE? 2) If it falls, what is its KE just before hitting ground? 3) A 3kg object moving at 4 m/s collides inelastically with a stationary 1kg object. What is their common velocity?',
    keywords: ['work', 'energy', 'power', 'kinetic', 'potential', 'conservation', 'collision', 'elastic', 'inelastic', 'work-energy'],
  },
  {
    key: 'RotationalSim', name: 'Rotational Motion Simulator', subject: 'physics',
    description: 'Rotating disc with adjustable moment of inertia. Shows torque, angular velocity, angular acceleration. Angular momentum vector. Conservation of angular momentum demo (figure skater pulling arms in). Rolling motion visualization.',
    nodes: 'C11: torque, angular momentum, conservation of angular momentum, moment of inertia, radius of gyration, parallel/perpendicular axes theorems, rotational motion equations, rolling motion, centre of mass.',
    controls: 'Sliders for applied torque (0-50 N·m), moment of inertia (0.1-10 kg·m²), initial angular velocity. Radius slider for skater demo. Play/pause.',
    readouts: 'Torque (N·m), Angular velocity (rad/s), Angular acceleration (rad/s²), Angular momentum (kg·m²/s), KE rotational (J)',
    challenges: '1) A torque of 10 N·m is applied to a disc with I=2 kg·m². What is angular acceleration? 2) A skater with I=4 pulls arms in to I=1. If initial ω=2 rad/s, what is final ω? 3) A disc rolls without slipping at 5 m/s with r=0.5m. What is its angular velocity?',
    keywords: ['torque', 'angular momentum', 'moment of inertia', 'rotational', 'rolling', 'centre of mass', 'radius of gyration', 'parallel axes', 'perpendicular axes'],
  },
  {
    key: 'GravitationSim', name: 'Gravitation Simulator', subject: 'physics',
    description: 'Two-body gravitational simulator. Shows force vectors, orbital paths. Sliders for masses and distance. Kepler\'s laws visualization (elliptical orbit, equal areas in equal times). Escape velocity calculator. Satellite orbit simulator.',
    nodes: "C9: universal law of gravitation, acceleration due to gravity, weight vs mass. C11: Kepler's laws, universal gravitation, variation of g, gravitational field/potential/PE, escape velocity, orbital velocity, geostationary/polar satellites.",
    controls: 'Sliders for mass 1 (10²⁰-10³⁰ kg), mass 2 (10²⁰-10³⁰ kg), distance (10⁶-10¹¹ m). Orbit eccentricity slider. Satellite altitude slider.',
    readouts: 'Gravitational force (N), Gravitational field (N/kg), Orbital velocity (m/s), Escape velocity (m/s), Orbital period (s)',
    challenges: "1) Calculate g at Earth's surface (M=6×10²⁴ kg, R=6.4×10⁶ m, G=6.67×10⁻¹¹). 2) What is the escape velocity from Earth? 3) A satellite orbits at 300 km altitude. What is its orbital velocity?",
    keywords: ['gravitation', 'kepler', 'escape velocity', 'orbital', 'satellite', 'geostationary', 'polar', 'gravitational field', 'gravitational potential', 'weight', 'mass'],
  },
  {
    key: 'FluidMechanicsSim', name: 'Fluid Mechanics Simulator', subject: 'physics',
    description: 'Fluid in a container with pressure visualization. Pascal\'s law hydraulic press demo. Buoyancy and Archimedes principle: objects float/sink. Bernoulli\'s pipe with varying cross-section showing pressure/velocity changes. Surface tension capillary rise.',
    nodes: 'C9: pressure in fluids, Pascal\'s law, buoyancy, upthrust, Archimedes, floatation, relative density. C11: pressure due to fluid column, Pascal\'s law, viscosity, Stokes\' law, terminal velocity, Bernoulli\'s theorem, surface tension, surface energy, capillary rise, excess pressure.',
    controls: 'Fluid density slider (500-13600 kg/m³), object density slider (100-20000 kg/m³), pipe cross-section ratio slider, depth slider. Mode selector (pressure/buoyancy/bernoulli/surface tension).',
    readouts: 'Pressure (Pa), Buoyant force (N), Fluid velocity (m/s), Reynolds number, Capillary rise (mm)',
    challenges: "1) What is the pressure at 10m depth in water (ρ=1000)? 2) An object of density 800 floats in water. What fraction is submerged? 3) Water flows through a pipe that narrows from 4cm² to 1cm². If initial velocity is 2 m/s, what is the final velocity?",
    keywords: ['pressure', 'fluid', 'pascal', 'buoyancy', 'archimedes', 'floatation', 'relative density', 'viscosity', 'stokes', 'terminal velocity', 'bernoulli', 'surface tension', 'capillary'],
  },
  {
    key: 'ElasticitySim', name: 'Elasticity Simulator', subject: 'physics',
    description: 'Stress-strain curve plotter. Wire/rod under tension with adjustable force and area. Shows Hooke law region, yield point, breaking point. Young modulus, bulk modulus, shear modulus calculations. Stress-strain graph updates live.',
    nodes: 'C11: elastic behaviour, stress-strain curve, Hooke law, Young modulus, bulk modulus, shear modulus, Poisson ratio, elastic energy.',
    controls: 'Force slider (0-500 N), cross-sectional area slider (1-10 mm2), original length slider (1-5 m), material selector (steel/copper/aluminum/rubber).',
    readouts: 'Stress (Pa), Strain, Young modulus (GPa), Elastic energy (J), Elongation (mm)',
    challenges: '1) A wire of area 2mm2 is stretched by 100N. What is the stress? 2) If Young modulus of steel is 2e11 Pa, what strain does a stress of 4e8 Pa produce? 3) A 2m copper wire stretches 2mm under a load. What is the strain?',
    keywords: ['elasticity', 'stress', 'strain', 'hooke', 'young', 'bulk modulus', 'shear modulus', 'poisson', 'elastic energy'],
  },
  {
    key: 'ThermalPhysicsSim', name: 'Thermal Physics Lab', subject: 'physics',
    description: 'Calorimetry simulator: substance heated with adjustable power, temperature vs time graph shows phase changes. Latent heat visualization during melting/boiling. Specific heat capacity comparison between materials. Thermal expansion of solids/liquids.',
    nodes: 'C9: heat and temperature, expansion of solids/liquids/gases, change of state, latent heat, calorimetry. C11: thermal expansion (linear/area/volume), specific heat, calorimetry, latent heat, anomalous expansion of water.',
    controls: 'Heat power slider (10-1000 W), substance selector (water/iron/mercury/ice), mass slider (1-500 g). Play/pause heating.',
    readouts: 'Temperature (C/K), Heat supplied (J), Specific heat (J/kg.K), Latent heat (J), Expansion (mm)',
    challenges: '1) How much heat is needed to raise 200g of water from 20C to 80C? (c=4200) 2) Why does temperature stay constant during melting? 3) A 1m iron rod expands by 12mm when heated by 100C. What is its coefficient of linear expansion?',
    keywords: ['heat', 'temperature', 'expansion', 'calorimetry', 'latent heat', 'specific heat', 'thermal', 'anomalous'],
  },
  {
    key: 'HeatTransferSim', name: 'Heat Transfer Simulator', subject: 'physics',
    description: 'Three modes side by side: conduction (heat flowing through a metal rod with temperature gradient), convection (hot water circulating in a container), radiation (heat waves from a hot body). Stefan law, Wien law, Newton law of cooling demos.',
    nodes: 'C9: conduction, convection, radiation. C11: conduction (thermal conductivity, coefficient of thermal conductivity), convection, radiation (Stefan law, Wien displacement law, Newton law of cooling, blackbody radiation).',
    controls: 'Mode selector (conduction/convection/radiation), temperature difference slider (10-500C), material selector (copper/iron/glass/wood), surface area slider.',
    readouts: 'Heat flow rate (W), Temperature gradient (C/m), Thermal conductivity (W/m.K), Cooling rate (C/s), Wavelength peak (nm)',
    challenges: '1) Which material conducts heat best? Why? 2) A blackbody at 3000K emits peak radiation at what wavelength? (Wien: lambda*T=2.9e-3) 3) A body cools from 80C to 70C in 5 min. When will it cool from 70C to 60C?',
    keywords: ['conduction', 'convection', 'radiation', 'stefan', 'wien', 'newton', 'cooling', 'blackbody', 'thermal conductivity'],
  },
  {
    key: 'ThermodynamicsSim', name: 'Thermodynamics Simulator', subject: 'physics',
    description: 'PV diagram with adjustable isothermal/isobaric/isochoric/adiabatic processes. Carnot cycle visualization with hot/cold reservoirs. First law of thermodynamics (dU=Q-W) with energy flow arrows. Entropy change calculator. Gas law simulator (Boyle/Charles/ideal gas).',
    nodes: 'C11: thermal equilibrium, zeroth law, first law of thermodynamics, thermodynamic processes (isothermal/isobaric/isochoric/adiabatic), second law, Carnot engine, entropy, refrigerator/heat pump, kinetic theory of gases.',
    controls: 'Process type selector (isothermal/isobaric/isochoric/adiabatic), pressure slider (1-100 atm), volume slider (1-50 L), temperature slider (100-1000 K). Carnot cycle toggle.',
    readouts: 'Pressure (Pa), Volume (m3), Temperature (K), Internal energy (J), Work done (J), Efficiency (%)',
    challenges: '1) A gas expands isothermally from 2L to 4L at 300K. Calculate work done. 2) A Carnot engine operates between 500K and 300K. What is its efficiency? 3) In an adiabatic process, if dU = -500J, what is Q and W?',
    keywords: ['thermodynamic', 'isothermal', 'isobaric', 'isochoric', 'adiabatic', 'carnot', 'entropy', 'first law', 'second law', 'kinetic theory', 'gas law', 'boyle', 'charles', 'ideal gas'],
  },
  {
    key: 'OscillationSim', name: 'Oscillation Simulator', subject: 'physics',
    description: 'Pendulum and spring oscillator side by side. Adjustable length/mass/k. Shows displacement-time graph, velocity-time graph, energy bars (KE/PE/total). Damped oscillation with adjustable damping coefficient. Forced oscillation and resonance demo.',
    nodes: 'C9: simple pendulum, oscillation. C11: periodic motion, SHM (spring-mass, simple pendulum), displacement-time graph, velocity, acceleration in SHM, energy in SHM, damped oscillations, forced oscillations, resonance.',
    controls: 'Oscillator type (pendulum/spring), mass slider (0.1-5 kg), spring constant slider (1-100 N/m), length slider (0.1-2 m), damping coefficient slider (0-2). Drive frequency slider for forced oscillation.',
    readouts: 'Period (s), Frequency (Hz), Amplitude (m), Max velocity (m/s), Total energy (J), Phase',
    challenges: '1) A pendulum has length 1m. What is its period? (g=10) 2) A spring-mass system has k=50 N/m and m=0.5 kg. What is its angular frequency? 3) What happens to the amplitude when damping is increased?',
    keywords: ['oscillation', 'shm', 'simple harmonic', 'pendulum', 'spring', 'damped', 'forced', 'resonance', 'periodic'],
  },
  {
    key: 'WaveMotionSim', name: 'Wave Motion Simulator', subject: 'physics',
    description: 'Animated transverse and longitudinal waves. Sliders for amplitude, frequency, wavelength. Shows wave equation y=A sin(kx-omega*t). Superposition of two waves creating beats. Standing waves on a string. Doppler effect with moving source.',
    nodes: 'C9: wave motion, types of mechanical waves, longitudinal/transverse, amplitude, wavelength, frequency. C11: wave motion, wave equation, speed of wave motion, superposition, standing waves, beats, Doppler effect.',
    controls: 'Wave type (transverse/longitudinal/standing), amplitude slider (1-50), frequency slider (1-20 Hz), wavelength slider (1-50 cm). Superposition toggle. Doppler source velocity slider.',
    readouts: 'Amplitude (cm), Wavelength (cm), Frequency (Hz), Wave speed (m/s), Beat frequency (Hz)',
    challenges: '1) A wave has frequency 10 Hz and wavelength 2 m. What is its speed? 2) Two waves of 256 Hz and 260 Hz produce beats. What is the beat frequency? 3) A source moves toward you at 30 m/s emitting 1000 Hz sound. What frequency do you hear? (v=340)',
    keywords: ['wave', 'transverse', 'longitudinal', 'amplitude', 'wavelength', 'frequency', 'superposition', 'standing wave', 'beats', 'doppler'],
  },
  {
    key: 'SoundSim', name: 'Sound Wave Visualizer', subject: 'physics',
    description: 'Sound wave with adjustable frequency and amplitude. Shows relationship between pitch and frequency, loudness and amplitude. Echo and reverberation demo. Organ pipes (open/closed) with fundamental and harmonics. Speed of sound in different media.',
    nodes: 'C9: sound as wave, loudness, pitch, reflection of sound, echo. C11: nature of sound, speed of sound, loudness and intensity, pitch and frequency, quality, reflection of sound, echoes, reverberation, organ pipes.',
    controls: 'Frequency slider (20-20000 Hz), amplitude slider (0-120 dB), medium selector (air/water/steel), organ pipe type (open/closed), pipe length slider.',
    readouts: 'Frequency (Hz), Wavelength (m), Speed (m/s), Intensity (dB), Pitch (low/high)',
    challenges: '1) Sound travels at 340 m/s in air. What is the wavelength of a 1700 Hz sound? 2) An open organ pipe of length 50 cm: what is its fundamental frequency? (v=340) 3) Why does sound travel faster in steel than in air?',
    keywords: ['sound', 'loudness', 'pitch', 'frequency', 'echo', 'reverberation', 'organ pipe', 'quality', 'reflection of sound'],
  },
  {
    key: 'GeometricOpticsSim', name: 'Geometric Optics Simulator', subject: 'physics',
    description: 'Light ray tracer with mirror/lens/prism. Adjustable object distance, focal length. Shows real/virtual images, magnification. Ray diagrams for concave/convex mirrors and lenses. Total internal reflection with critical angle. Prism dispersion.',
    nodes: 'C9: reflection of light, mirrors, lenses, refraction, prism, dispersion. C11: reflection (plane/spherical mirrors), refraction, lenses, prism, TIR, optical instruments (microscope, telescope), human eye, defects of vision.',
    controls: 'Optical element selector (plane mirror/concave mirror/convex mirror/concave lens/convex lens/prism), object distance slider (5-100 cm), focal length slider (-50 to 50 cm).',
    readouts: 'Image distance (cm), Magnification, Image type (real/virtual), Focal length (cm), Critical angle (deg)',
    challenges: '1) An object is at 30 cm from a concave mirror of f=10 cm. Where is the image? 2) What is the critical angle for water (n=1.33)? 3) A convex lens of f=20 cm forms an image at 60 cm. Where is the object?',
    keywords: ['reflection', 'refraction', 'mirror', 'lens', 'prism', 'dispersion', 'total internal reflection', 'critical angle', 'magnification', 'optical instrument', 'microscope', 'telescope', 'eye'],
  },
  {
    key: 'WaveOpticsSim', name: 'Wave Optics Simulator', subject: 'physics',
    description: 'Huygens principle wavefront construction. Young double-slit experiment with adjustable slit spacing and wavelength showing interference pattern. Single-slit diffraction. Polarization with polarizer/analyzer. Newton rings.',
    nodes: 'C11: Huygens principle, interference (Young double slit), diffraction (single slit), polarization, Newton rings, coherent sources.',
    controls: 'Experiment selector (Huygens/Young double slit/single slit diffraction/polarization), wavelength slider (400-700 nm), slit spacing slider (0.1-5 mm), screen distance slider.',
    readouts: 'Wavelength (nm), Fringe width (mm), Angular position (deg), Intensity pattern, Polarization angle (deg)',
    challenges: '1) In Young experiment, lambda=600nm, slit spacing=0.3mm, screen=1m. What is fringe width? 2) What happens to fringe width if wavelength is doubled? 3) At what angle is the first minimum in single-slit diffraction? (slit=0.1mm, lambda=500nm)',
    keywords: ['huygens', 'interference', 'young', 'double slit', 'diffraction', 'polarization', 'newton', 'rings', 'coherent', 'wavefront'],
  },
  {
    key: 'ElectrostaticsSim', name: 'Electrostatics Simulator', subject: 'physics',
    description: 'Charged particles with adjustable charge and position. Electric field vectors and equipotential lines. Coulomb force calculator. Electric potential visualization. Gauss law with different Gaussian surfaces. Dipole field.',
    nodes: 'C12: electric charges, Coulomb law, electric field, electric potential, Gauss law, electric dipole, potential energy of charges, continuous charge distribution.',
    controls: 'Charge 1 slider (-10 to 10 uC), charge 2 slider (-10 to 10 uC), distance slider (1-50 cm). Gaussian surface selector (sphere/cylinder/box). Show field lines toggle.',
    readouts: 'Force (N), Electric field (V/m), Potential (V), Potential energy (J), Flux (N.m2/C)',
    challenges: '1) Two charges of +2uC and -3uC are 30cm apart. What is the force? (k=9e9) 2) What is the electric field at 10cm from a +5uC point charge? 3) A Gaussian sphere of radius 10cm encloses +1uC. What is the total flux?',
    keywords: ['charge', 'coulomb', 'electric field', 'electric potential', 'gauss', 'dipole', 'potential energy', 'flux', 'equipotential'],
  },
  {
    key: 'CapacitorSim', name: 'Capacitor Simulator', subject: 'physics',
    description: 'Parallel plate capacitor with adjustable plate area, separation, and dielectric. Shows charge storage, capacitance, energy. Series and parallel capacitor combinations. RC charging/discharging circuit with time constant.',
    nodes: 'C12: capacitance, parallel plate capacitor, combination of capacitors (series/parallel), energy stored, dielectrics, RC circuit, Van de Graaff generator.',
    controls: 'Plate area slider (1-100 cm2), separation slider (1-10 mm), dielectric selector (vacuum/air/glass/mica), voltage slider (1-100 V). RC toggle with resistance slider.',
    readouts: 'Capacitance (F), Charge (C), Energy stored (J), Electric field (V/m), Time constant (s)',
    challenges: '1) A parallel plate capacitor has A=100cm2, d=2mm, e0=8.85e-12. What is C? 2) Two 10uF capacitors in series: what is the equivalent? 3) A 100uF capacitor charged to 12V stores how much energy?',
    keywords: ['capacitor', 'capacitance', 'parallel plate', 'dielectric', 'series', 'parallel', 'rc circuit', 'energy stored', 'van de graaff'],
  },
  {
    key: 'CurrentElectricitySim', name: 'Current Electricity Simulator', subject: 'physics',
    description: 'Circuit builder with resistors, batteries, ammeters, voltmeters. Ohm law calculator. Series and parallel resistance combinations. Kirchhoff voltage and current laws. Wheatstone bridge. Potentiometer and meter bridge.',
    nodes: 'C10: Ohm law, resistance, series/parallel, EMF, internal resistance, Kirchhoff laws, Wheatstone bridge. C12: electric current, drift velocity, mobility, Ohm law, resistance, resistivity, temperature dependence, series/parallel, cells, Kirchhoff laws, Wheatstone bridge, potentiometer.',
    controls: 'Battery voltage slider (1-50 V), resistor value slider (1-1000 ohm), number of resistors, circuit topology selector (series/parallel/Wheatstone). Current flow animation toggle.',
    readouts: 'Current (A), Voltage (V), Resistance (ohm), Power (W), Potential drop (V)',
    challenges: '1) A 12V battery drives 2A through a circuit. What is the total resistance? 2) Three 6ohm resistors in parallel: what is the equivalent? 3) In a Wheatstone bridge, P=10ohm, Q=20ohm, R=15ohm. What is S for balance?',
    keywords: ['current', 'ohm', 'resistance', 'series', 'parallel', 'kirchhoff', 'wheatstone', 'potentiometer', 'meter bridge', 'emf', 'internal resistance', 'drift velocity'],
  },
  {
    key: 'MagnetismSim', name: 'Magnetism Simulator', subject: 'physics',
    description: 'Magnetic field from current-carrying wire, loop, solenoid. Biot-Savart law visualization. Ampere circuital law. Moving charge in magnetic field (Lorentz force). Galvanometer (moving coil). Magnetic properties (diamagnetic/paramagnetic/ferromagnetic).',
    nodes: 'C12: magnetic field, Biot-Savart law, Ampere circuital law, force on moving charge, force on current-carrying conductor, torque on current loop, moving coil galvanometer, magnetic properties, magnetic flux.',
    controls: 'Current slider (0.1-10 A), wire shape selector (straight/loop/solenoid), charge velocity slider (0-100 m/s), magnetic field strength slider (0.1-5 T). Charge sign toggle.',
    readouts: 'Magnetic field (T), Force (N), Torque (N.m), Radius of path (m), Magnetic flux (Wb)',
    challenges: '1) A wire carries 5A. What is B at 2cm? (mu0/4pi=1e-7) 2) An electron moves at 1e6 m/s perpendicular to B=0.5T. What is the force? 3) A solenoid of 1000 turns/m carries 2A. What is B inside? (mu0=4pi*1e-7)',
    keywords: ['magnetic field', 'biot-savart', 'ampere', 'lorentz', 'force on charge', 'galvanometer', 'diamagnetic', 'paramagnetic', 'ferromagnetic', 'magnetic flux', 'solenoid', 'torque'],
  },
  {
    key: 'EMIACSim', name: 'EMI & AC Simulator', subject: 'physics',
    description: 'Electromagnetic induction: magnet moving through coil, induced EMF shown. Lenz law direction. Transformer with primary/secondary coils. AC generator. LCR series circuit with resonance. AC waveforms (rms, peak, frequency).',
    nodes: 'C12: electromagnetic induction, Faraday law, Lenz law, self/mutual inductance, AC generator, transformer, AC circuits (RMS, peak, reactance), LCR series circuit, resonance, LC oscillations, power in AC circuits.',
    controls: 'Magnet velocity slider (1-20 m/s), number of coil turns slider (10-500), transformer turns ratio slider, AC frequency slider (10-1000 Hz), LCR component sliders.',
    readouts: 'Induced EMF (V), Magnetic flux (Wb), Transformer ratio, RMS voltage (V), Resonance frequency (Hz)',
    challenges: '1) A coil of 100 turns has flux changing from 0 to 0.05 Wb in 0.1s. What is the induced EMF? 2) A transformer has 500 primary and 50 secondary turns. If primary is 220V, what is secondary? 3) An LCR circuit has L=10mH, C=100uF. What is the resonance frequency?',
    keywords: ['electromagnetic induction', 'faraday', 'lenz', 'self inductance', 'mutual inductance', 'transformer', 'ac generator', 'ac circuit', 'lcr', 'resonance', 'rms', 'reactance'],
  },
  {
    key: 'ModernPhysicsSim', name: 'Modern Physics Simulator', subject: 'physics',
    description: 'Bohr model of hydrogen with electron orbits. Energy level diagram with transitions and spectral lines. Photoelectric effect with adjustable frequency and intensity. de Broglie wavelength. Wave-particle duality. Davisson-Germer experiment.',
    nodes: 'C12: dual nature of radiation, photoelectric effect, de Broglie waves, Davisson-Germer experiment, Bohr model, hydrogen spectrum, energy levels, wave-particle duality.',
    controls: 'Orbit number selector (n=1-6), light frequency slider (1e14-1e15 Hz), light intensity slider, metal selector (sodium/cesium/zinc). Particle momentum slider for de Broglie.',
    readouts: 'Orbit radius (nm), Energy (eV), Wavelength emitted (nm), Threshold frequency (Hz), de Broglie wavelength (nm)',
    challenges: '1) What is the energy of an electron in the n=2 orbit of hydrogen? (-3.4 eV) 2) Light of frequency 8e14 Hz hits sodium (threshold 5.6e14). What is the KE of ejected electrons? 3) An electron has momentum 1e-24 kg.m/s. What is its de Broglie wavelength?',
    keywords: ['bohr', 'hydrogen', 'photoelectric', 'de broglie', 'davisson-germer', 'wave-particle', 'dual nature', 'energy level', 'spectral', 'threshold frequency'],
  },
  {
    key: 'NuclearPhysicsSim', name: 'Nuclear Physics Simulator', subject: 'physics',
    description: 'Radioactive decay simulator with half-life visualization. Alpha/beta/gamma emission. Decay curve (exponential). Nuclear fission and fusion energy calculations. Mass-energy equivalence (E=mc2). Nuclear binding energy curve.',
    nodes: 'C12: atomic nucleus, nuclear force, mass-energy equivalence, nuclear binding energy, radioactivity, alpha/beta/gamma decay, radioactive decay law, half-life, nuclear fission, nuclear fusion.',
    controls: 'Isotope selector (U-238/Ra-226/C-14/I-131), time slider (0-10 half-lives), decay type selector. Fission/fusion mode toggle.',
    readouts: 'Half-life (years/s), Activity (Bq), Decay constant (1/s), Mass defect (u), Energy released (MeV)',
    challenges: '1) A sample has 8000 atoms. After 3 half-lives, how many remain? 2) U-235 fission releases 200 MeV. What mass is converted? (1u=931.5 MeV) 3) C-14 has half-life 5730 years. A sample has 1/8 original activity. How old is it?',
    keywords: ['radioactive', 'decay', 'half-life', 'alpha', 'beta', 'gamma', 'fission', 'fusion', 'mass-energy', 'binding energy', 'nuclear'],
  },
  {
    key: 'SemiconductorSim', name: 'Semiconductor Simulator', subject: 'physics',
    description: 'Energy band diagram (conduction/valence band, band gap). P-type and N-type doping. P-N junction formation (depletion layer). Diode I-V characteristic curve. Half-wave and full-wave rectifier. Transistor as amplifier/switch. Logic gates.',
    nodes: 'C12: energy bands in solids, intrinsic/extrinsic semiconductors, p-n junction, semiconductor diode, rectifier (half/full wave), Zener diode, junction transistor (p-n-p/n-p-n), transistor as amplifier/switch, logic gates (NOT/AND/OR/NAND/NOR).',
    controls: 'Material selector (Si/Ge), doping type (none/p-type/n-type), bias voltage slider (-2 to 2 V), circuit type (rectifier/amplifier/switch). Logic gate selector.',
    readouts: 'Band gap (eV), Depletion width (um), Diode current (mA), Voltage gain, Logic output (0/1)',
    challenges: '1) What is the band gap of silicon? (1.1 eV) 2) In a p-n junction under forward bias, what happens to the depletion layer? 3) A half-wave rectifier uses 1 diode. How many does a full-wave bridge use?',
    keywords: ['semiconductor', 'energy band', 'band gap', 'p-n junction', 'diode', 'rectifier', 'zener', 'transistor', 'amplifier', 'logic gate', 'doping'],
  },
  {
    key: 'EMWaveCommSim', name: 'EM Wave & Communication Simulator', subject: 'physics',
    description: 'Electromagnetic wave showing perpendicular E and B fields propagating. EM spectrum (radio to gamma). Displacement current. Communication system block diagram (transmitter-channel-receiver). AM/FM modulation visualization.',
    nodes: 'C12: electromagnetic waves (properties, speed), EM spectrum, displacement current, elements of communication system (transmitter, channel, receiver), modulation (AM/FM), bandwidth, propagation of EM waves (ground/sky/space).',
    controls: 'EM wave type selector (radio/microwave/IR/visible/UV/X-ray/gamma), frequency slider (1e4-1e20 Hz), modulation type (AM/FM/none), signal frequency slider.',
    readouts: 'Frequency (Hz), Wavelength (m), Energy (eV), Speed (m/s), Bandwidth (Hz)',
    challenges: '1) What is the speed of EM waves in vacuum? 2) A radio wave has frequency 1 MHz. What is its wavelength? 3) What is the difference between AM and FM modulation?',
    keywords: ['electromagnetic wave', 'em spectrum', 'displacement current', 'communication', 'modulation', 'am', 'fm', 'bandwidth', 'transmitter', 'receiver', 'propagation'],
  },
  {
    key: 'MeasurementsSim', name: 'Measurements Lab', subject: 'physics',
    description: 'Vernier caliper and screw gauge interactive tools. Measure objects with adjustable main scale and vernier scale. Significant figures calculator. Unit conversion tool. Dimensional analysis checker.',
    nodes: 'C9: estimation and measurement, unit systems (SI), significant figures, dimensional analysis. C11: units, significant figures, dimensional analysis, Vernier caliper, screw gauge, measuring instruments.',
    controls: 'Instrument selector (Vernier/screw gauge/meter scale), object selector (cylinder/sphere/wire), main scale slider, vernier scale slider. Unit converter.',
    readouts: 'Main scale reading (mm), Vernier coincidence, Total reading (mm), Significant figures, Dimensional formula',
    challenges: '1) A Vernier has 10 divisions matching 9 main scale divisions. What is its least count? 2) How many significant figures in 0.00560? 3) Check dimensionally: v = at. [L/T] = [L/T2][T]?',
    keywords: ['measurement', 'vernier', 'screw gauge', 'significant figure', 'dimensional analysis', 'unit', 'si', 'estimation'],
  },
  {
    key: 'MachinesSim', name: 'Machines Simulator', subject: 'physics',
    description: 'Lever, pulley, gear systems with adjustable configurations. Mechanical advantage, velocity ratio, efficiency calculations. Block and tackle. House wiring simulator (live/neutral/earth, fuse, switch). Simple machines comparison.',
    nodes: 'C9: machines, levers, pulleys, mechanical advantage, velocity ratio, efficiency, gears. C10: household circuits, fuse, earthing, safety devices.',
    controls: 'Machine type (lever/pulley/gear/inclined plane), lever class selector (1st/2nd/3rd), pulley count slider (1-6), load slider, effort slider.',
    readouts: 'Mechanical advantage, Velocity ratio, Efficiency (%), Effort (N), Load (N)',
    challenges: '1) A lever has effort arm 80cm and load arm 20cm. What is its MA? 2) A block and tackle has 4 pulleys. What is its VR? 3) A machine has MA=5 and VR=6. What is its efficiency?',
    keywords: ['machine', 'lever', 'pulley', 'gear', 'mechanical advantage', 'velocity ratio', 'efficiency', 'house wiring', 'fuse', 'earthing', 'safety'],
  },

  // ─── Maths (26 templates) ──────────────────────────────────
  {
    key: 'NumberSystemSim', name: 'Number System Lab', subject: 'maths',
    description: 'Interactive number line with rational/irrational numbers. Surds calculator with simplification steps. Logarithm calculator showing log properties. Exponent rules visualizer. Place value and number representation explorer.',
    nodes: 'C9: rational and irrational numbers, surds, logarithms, exponents. C10: factorisation, remainder theorem, AP/GP. C11: sets, functions, logarithm properties, complex numbers.',
    controls: 'Number type selector (rational/irrational/surd/log/exp), number line slider, base selector for logarithms (2/10/e), exponent slider.',
    readouts: 'Value, Simplified form, Logarithm value, Exponential form, Number line position',
    challenges: '1) Simplify sqrt(72). 2) Calculate log10(1000). 3) Is sqrt(2) + sqrt(3) rational or irrational?',
    keywords: ['rational', 'irrational', 'surds', 'logarithm', 'exponent', 'number', 'real number', 'place value'],
  },
  {
    key: 'AlgebraBasicsSim', name: 'Algebra Basics Lab', subject: 'maths',
    description: 'Step-by-step equation solver showing each transformation. Expansion and factorisation visualizer with algebra tiles. Simultaneous equations solver (substitution and elimination). Middle-term splitting for quadratics.',
    nodes: 'C9: algebraic expressions, factorisation, linear equations, simultaneous equations, quadratic equations. C10: factorisation, remainder/factor theorem, quadratic equations.',
    controls: 'Operation selector (expand/factorise/solve simultaneous/solve quadratic), coefficient sliders, step-by-step solve button, algebra tiles toggle.',
    readouts: 'Expanded form, Factorised form, Solution (x, y), Discriminant, Steps',
    challenges: '1) Expand (x+3)(x-2). 2) Solve: 2x+y=7, x-y=2. 3) Factorise x2+5x+6 by splitting the middle term.',
    keywords: ['algebra', 'expansion', 'factorisation', 'simultaneous', 'quadratic', 'equation', 'linear', 'middle term', 'factor theorem', 'remainder theorem'],
  },
  {
    key: 'QuadraticSim', name: 'Quadratic Equation Solver', subject: 'maths',
    description: 'Quadratic equation visualizer with parabola plot. Sliders for a, b, c coefficients. Shows roots, vertex, axis of symmetry, discriminant. Vieta formulas (sum and product of roots). Nature of roots based on discriminant.',
    nodes: 'C10: quadratic equations, roots, factorisation, nature of roots, Vieta formulas. C11: quadratic equations, complex roots, common roots.',
    controls: 'Sliders for a (-5 to 5), b (-10 to 10), c (-10 to 10). Graph toggle. Root display toggle.',
    readouts: 'Roots (x1, x2), Discriminant (D), Vertex, Axis of symmetry, Sum of roots, Product of roots',
    challenges: '1) Solve x2-5x+6=0. 2) For what value of k does x2+4x+k=0 have equal roots? 3) If alpha and beta are roots of x2-7x+10=0, find alpha+beta and alpha*beta.',
    keywords: ['quadratic', 'roots', 'discriminant', 'vieta', 'parabola', 'nature of roots', 'sum', 'product', 'vertex'],
  },
  {
    key: 'PolynomialSim', name: 'Polynomial Lab', subject: 'maths',
    description: 'Polynomial plotter with adjustable degree and coefficients. Remainder theorem and factor theorem visualizer. Polynomial division step-by-step. Relationship between roots and coefficients.',
    nodes: 'C10: polynomials, remainder theorem, factor theorem, factorisation. C11: polynomial functions, roots, relationship between roots and coefficients.',
    controls: 'Degree selector (1-4), coefficient sliders, division input, root finder button.',
    readouts: 'Polynomial value at x, Remainder, Factors, Roots, Degree',
    challenges: '1) Find the remainder when x3-2x2+3x-1 is divided by x-2. 2) Show that x-1 is a factor of x3-6x2+11x-6. 3) If 2 and 3 are roots of x3-6x2+11x-6, find the third root.',
    keywords: ['polynomial', 'remainder theorem', 'factor theorem', 'roots', 'division', 'degree', 'coefficient'],
  },
  {
    key: 'SequencesSim', name: 'Sequences & Series Lab', subject: 'maths',
    description: 'AP and GP visualizer with term-by-term display. Sum calculator with formula derivation. Arithmetic and geometric mean comparison. Special sums (sum of n, n2, n3). Infinite GP with convergence visualization.',
    nodes: 'C10: AP (general term, sum), GP (general term, sum). C11: AP, GP, arithmetic/geometric mean, special sums, infinite GP, method of differences.',
    controls: 'Sequence type (AP/GP/special sum), first term slider, common difference/ratio slider, number of terms slider.',
    readouts: 'nth term, Sum of n terms, Common difference/ratio, Arithmetic/Geometric mean, Sum to infinity',
    challenges: '1) Find the 10th term of AP: 3, 7, 11, ... 2) Find sum of first 20 terms of GP: 1, 2, 4, ... 3) For what value of r does 1+r+r2+... converge? Find the sum when r=0.5.',
    keywords: ['arithmetic progression', 'geometric progression', 'ap', 'gp', 'sum', 'series', 'arithmetic mean', 'geometric mean', 'infinite', 'convergence'],
  },
  {
    key: 'SetsRelationsSim', name: 'Sets & Relations Lab', subject: 'maths',
    description: 'Interactive Venn diagram with 2-3 sets. Set operations (union, intersection, difference, complement) with visual highlighting. De Morgan laws demonstration. Relations and functions mapper. Equivalence relations checker.',
    nodes: 'C9: sets, Venn diagrams, operations. C11: sets, relations, functions, equivalence relations, types of relations (reflexive, symmetric, transitive).',
    controls: 'Number of sets (2/3), set element input, operation selector (union/intersection/difference/complement), relation type selector.',
    readouts: 'Set A, Set B, Union, Intersection, Complement, Cardinality',
    challenges: '1) If A={1,2,3} and B={2,3,4}, find A union B and A intersection B. 2) Verify De Morgan law: (A union B) complement = A complement intersection B complement. 3) Check if R={(1,1),(2,2),(1,2)} on {1,2} is an equivalence relation.',
    keywords: ['sets', 'venn', 'union', 'intersection', 'complement', 'de morgan', 'relation', 'function', 'equivalence', 'reflexive', 'symmetric', 'transitive'],
  },
  {
    key: 'TrigonometrySim', name: 'Trigonometry Lab', subject: 'maths',
    description: 'Unit circle with adjustable angle showing sin, cos, tan values. Trigonometric identity verifier. Heights and distances problem solver with angle of elevation/depression. Inverse trigonometric functions plotter.',
    nodes: 'C10: trigonometric ratios, identities, angles of elevation/depression, heights and distances. C11: trigonometric functions, compound angles, multiple angle formulas, inverse trigonometry.',
    controls: 'Angle slider (0-360 degrees), mode (ratios/identities/heights/distances/inverse), object height slider, distance slider.',
    readouts: 'sin, cos, tan, cosec, sec, cot, Angle (degrees/radians), Height (m), Distance (m)',
    challenges: '1) A tower is 20m tall. The angle of elevation from a point is 45 degrees. How far is the point? 2) Prove: sin2x + cos2x = 1 using the unit circle. 3) Find the value of sin(30) + cos(60).',
    keywords: ['trigonometry', 'sin', 'cos', 'tan', 'unit circle', 'identity', 'elevation', 'depression', 'heights', 'distances', 'inverse', 'compound angle'],
  },
  {
    key: 'CoordinateGeometrySim', name: 'Coordinate Geometry Lab', subject: 'maths',
    description: 'Cartesian plane with draggable points. Distance, midpoint, slope calculations. Section formula (internal/external division). Area of triangle using coordinates. Family of lines plotter. Locus problems.',
    nodes: 'C10: coordinate geometry, distance formula, section formula, slope, equation of line. C11: straight lines, various forms, family of lines, locus, section formula (internal/external).',
    controls: 'Point drag on Cartesian plane, line equation input, slope slider, intercept slider.',
    readouts: 'Distance, Midpoint, Slope, Section point, Area of triangle, Equation of line',
    challenges: '1) Find distance between A(3,4) and B(0,0). 2) Find the midpoint of (2,3) and (8,7). 3) Find the point that divides (1,2) and (5,8) in ratio 2:3 internally.',
    keywords: ['coordinate', 'cartesian', 'distance', 'midpoint', 'slope', 'section formula', 'area', 'line', 'locus', 'intercept'],
  },
  {
    key: 'ConicSectionsSim', name: 'Conic Sections Lab', subject: 'maths',
    description: 'Interactive conic section plotter. Circle, parabola, ellipse, hyperbola with adjustable parameters. Tangent and normal lines. Eccentricity slider. Focus and directrix visualization. Standard forms comparison.',
    nodes: 'C11: circles (standard/general/parametric forms), parabola (standard equations, properties), ellipse, hyperbola, tangents and normals.',
    controls: 'Conic type selector (circle/parabola/ellipse/hyperbola), radius/a/b slider, eccentricity slider, center drag.',
    readouts: 'Equation, Eccentricity, Foci, Directrix, Vertices, Length of axes',
    challenges: '1) Find the radius of circle x2+y2=25. 2) For parabola y2=8x, find the focus and directrix. 3) Find the eccentricity of ellipse x2/25 + y2/16 = 1.',
    keywords: ['conic', 'circle', 'parabola', 'ellipse', 'hyperbola', 'eccentricity', 'focus', 'directrix', 'tangent', 'normal'],
  },
  {
    key: 'CalculusSim', name: 'Calculus Lab', subject: 'maths',
    description: 'Limit calculator with LHL/RHL visualization. Differentiation from first principles animation. Derivative plotter showing f(x) and f prime(x). Chain rule, product rule, quotient rule visualizer. Maxima/minima finder. Increasing/decreasing function analyzer.',
    nodes: 'C11: limits (LHL, RHL, existence), derivatives (first principles, algebraic/trig functions), chain rule, product/quotient rule, increasing/decreasing functions, maxima/minima.',
    controls: 'Function selector (polynomial/trig/exponential/log), x-value slider, h slider for first principles, derivative toggle.',
    readouts: 'f(x), f prime(x), Limit value, Slope at point, Critical points, Nature (max/min)',
    challenges: '1) Find lim(x->2) (x2-4)/(x-2). 2) Differentiate x3 from first principles. 3) Find the maximum value of f(x) = -x2+4x+1.',
    keywords: ['limit', 'derivative', 'differentiation', 'first principles', 'chain rule', 'product rule', 'quotient rule', 'maxima', 'minima', 'increasing', 'decreasing', 'continuity'],
  },
  {
    key: 'IntegrationSim', name: 'Integration Lab', subject: 'maths',
    description: 'Integral as area under curve visualization with Riemann sums. Definite integral with Fundamental Theorem of Calculus demonstration. Substitution method step-by-step. Integration by parts. Area between two curves.',
    nodes: 'C11: integration as inverse of differentiation, standard integrals, substitution, partial fractions, by parts, definite integral, Fundamental Theorem of Calculus, area under curve.',
    controls: 'Function selector, integration method (substitution/parts/partial fractions), bounds sliders for definite integral, Riemann sum rectangle count.',
    readouts: 'Indefinite integral, Definite integral value, Area under curve, Riemann sum approximation, Number of rectangles',
    challenges: '1) Integrate x2 dx. 2) Find the area under y=x2 from x=0 to x=3. 3) Evaluate integral of x*cos(x) using integration by parts.',
    keywords: ['integration', 'integral', 'riemann sum', 'area under curve', 'substitution', 'partial fraction', 'by parts', 'definite', 'fundamental theorem'],
  },
  {
    key: 'DifferentialEqSim', name: 'Differential Equation Solver', subject: 'maths',
    description: 'Differential equation visualizer with slope field. Formation of DE by eliminating constants. Solution methods (separation of variables, homogeneous, linear DE). Order and degree display. General and particular solutions.',
    nodes: 'C11/C12: differential equations, order, degree, formation by eliminating constants, variable separable, homogeneous, linear DE (dy/dx+Py=Q).',
    controls: 'DE type selector (separable/homogeneous/linear/exact), parameter sliders, initial condition input, slope field toggle.',
    readouts: 'Order, Degree, General solution, Particular solution, Slope field',
    challenges: '1) Find the order and degree of d2y/dx2 + (dy/dx)3 = 0. 2) Solve dy/dx = x/y by separation of variables. 3) Solve dy/dx + 2y = 0.',
    keywords: ['differential equation', 'order', 'degree', 'separation', 'homogeneous', 'linear', 'particular solution', 'general solution', 'slope field'],
  },
  {
    key: 'VectorAlgebraSim', name: 'Vector Algebra Lab', subject: 'maths',
    description: '2D and 3D vector visualizer. Vector addition (triangle and parallelogram law). Dot product and cross product with geometric interpretation. Direction cosines and ratios. Unit vector calculator. Position vector display.',
    nodes: 'C11: vectors, magnitude, direction, addition, dot product, cross product, direction cosines, projection, scalar triple product.',
    controls: 'Vector A components (x,y,z sliders), vector B components, operation selector (add/subtract/dot/cross), 2D/3D toggle.',
    readouts: 'Magnitude A, Magnitude B, A+B, A.B, AxB, Angle between vectors, Unit vector',
    challenges: '1) Find the magnitude of vector (3, 4, 0). 2) Find the dot product of (1,2,3) and (4,5,6). 3) Find a unit vector along (2, 3, 6).',
    keywords: ['vector', 'magnitude', 'dot product', 'cross product', 'direction cosine', 'unit vector', 'addition', 'projection', 'scalar triple'],
  },
  {
    key: 'ThreeDGeometrySim', name: '3D Geometry Lab', subject: 'maths',
    description: '3D coordinate system with draggable points. Line in 3D (vector and Cartesian form). Plane equation visualizer. Distance from point to plane. Angle between two lines/planes. Shortest distance between skew lines.',
    nodes: 'C12: 3D coordinates, distance formula, section formula, direction cosines/ratios, line in space (vector/Cartesian), plane (various forms), angle between lines/planes, distance from point to plane.',
    controls: 'Point drag in 3D, line direction sliders, plane normal sliders, plane distance slider, 3D rotation.',
    readouts: 'Distance, Equation of line, Equation of plane, Angle between lines, Angle between planes, Shortest distance',
    challenges: '1) Find distance from (1,2,3) to plane 2x+3y+6z=5. 2) Find the angle between lines with direction ratios (1,1,1) and (2,1,0). 3) Find the equation of plane through (0,0,0) with normal (1,2,3).',
    keywords: ['3d geometry', 'three dimensional', 'line in space', 'plane', 'direction cosine', 'angle between lines', 'angle between planes', 'distance', 'skew lines'],
  },
  {
    key: 'MatrixSim', name: 'Matrix Operations Lab', subject: 'maths',
    description: 'Matrix visualizer with adjustable dimensions. Matrix addition, multiplication, transpose. Determinant calculator with step-by-step cofactor expansion. Inverse matrix finder. Solving linear systems using matrices (Cramer rule, inverse method).',
    nodes: 'C11/C12: matrices (concept, types, equality), transpose, symmetric/skew-symmetric, addition, scalar multiplication, matrix multiplication, determinants (up to 3x3), minors, cofactors, adjoint, inverse, solving linear equations, Cramer rule.',
    controls: 'Matrix dimension selector (2x2/3x3), element input grid, operation selector (add/multiply/transpose/determinant/inverse/solve).',
    readouts: 'Result matrix, Determinant, Adjoint, Inverse, Cramer solution, Rank',
    challenges: '1) Find the determinant of [[1,2],[3,4]]. 2) Find the inverse of [[2,1],[1,3]]. 3) Solve x+y=3, 2x-y=0 using Cramer rule.',
    keywords: ['matrix', 'determinant', 'transpose', 'inverse', 'adjoint', 'cofactor', 'minor', 'cramer', 'linear equation', 'symmetric', 'skew-symmetric'],
  },
  {
    key: 'ProbabilitySim', name: 'Probability Lab', subject: 'maths',
    description: 'Probability experiment simulator (coins, dice, cards, balls). Conditional probability with tree diagram. Bayes theorem visualizer. Random variable and probability distribution table. Binomial/Poisson/Normal distribution plots.',
    nodes: 'C10: probability, sample space, events. C11: probability, addition theorem, conditional probability, Bayes theorem, random variable, probability distribution, binomial distribution. C12: Poisson, normal distribution.',
    controls: 'Experiment selector (coin/dice/cards/urn), number of trials slider, probability slider, distribution type (binomial/Poisson/normal).',
    readouts: 'P(A), P(B), P(A|B), P(B|A), Expected value, Variance, Standard deviation',
    challenges: '1) A die is rolled. Find P(even number). 2) P(A)=0.3, P(B)=0.4, P(A intersection B)=0.1. Find P(A|B). 3) X~B(10, 0.5). Find P(X=3).',
    keywords: ['probability', 'conditional', 'bayes', 'random variable', 'distribution', 'binomial', 'poisson', 'normal', 'sample space', 'event', 'tree diagram'],
  },
  {
    key: 'StatisticsSim', name: 'Statistics Lab', subject: 'maths',
    description: 'Data entry table with live graph (bar/histogram/box plot). Mean, median, mode, range, standard deviation, variance calculations. Correlation scatter plot with regression line. Karl Pearson and Spearman rank correlation. Index number calculator.',
    nodes: 'C10: mean, median, mode, histogram, frequency polygon. C11: range, quartiles, mean deviation, standard deviation, variance, coefficient of variation, correlation (Karl Pearson, Spearman rank), regression, index numbers.',
    controls: 'Data entry table, graph type selector (bar/histogram/box/scatter), add/remove data points, correlation type selector.',
    readouts: 'Mean, Median, Mode, Standard deviation, Variance, Correlation coefficient, Regression line',
    challenges: '1) Find the mean of 2, 4, 6, 8, 10. 2) Find the standard deviation of 1, 2, 3, 4, 5. 3) Calculate Karl Pearson correlation for the data.',
    keywords: ['statistics', 'mean', 'median', 'mode', 'standard deviation', 'variance', 'correlation', 'regression', 'histogram', 'quartile', 'index number', 'skewness'],
  },
  {
    key: 'LinearProgrammingSim', name: 'Linear Programming Lab', subject: 'maths',
    description: 'LPP formulation helper. Graphical solution with feasible region shading. Corner point method for finding optimal solution. Bounded and unbounded regions. Maximization and minimization problems.',
    nodes: 'C12: linear programming, mathematical formulation, graphical solution, feasible region, bounded/unbounded regions, optimal solutions.',
    controls: 'Objective function coefficient sliders, constraint coefficient sliders, constraint type (less than/equal/greater than), optimize type (max/min).',
    readouts: 'Optimal value, Optimal point, Feasible region vertices, Constraints satisfied, Objective value at each vertex',
    challenges: '1) Maximize z=3x+2y subject to x+y<=4, x>=0, y>=0. 2) What is the feasible region for x+2y<=6, 2x+y<=8? 3) Find the corner points of the feasible region.',
    keywords: ['linear programming', 'lpp', 'feasible region', 'optimal', 'maximize', 'minimize', 'constraint', 'objective function', 'graphical solution', 'corner point'],
  },
  {
    key: 'ComplexNumberSim', name: 'Complex Number Lab', subject: 'maths',
    description: 'Argand plane with draggable complex number. Addition, subtraction, multiplication visualized geometrically. Conjugate, modulus, argument. Polar form conversion. De Moivre theorem visualizer. nth roots of unity.',
    nodes: 'C11: complex numbers, introduction, representation, conjugate, modulus, argument, Argand plane, polar form, operations, inverses. De Moivre theorem, nth roots.',
    controls: 'Real part slider, imaginary part slider, operation selector (add/subtract/multiply/divide/polar/power/root), angle slider for polar form.',
    readouts: 'z, conjugate, modulus, argument, polar form, real part, imaginary part',
    challenges: '1) Find the modulus of 3+4i. 2) Express 1+i in polar form. 3) Find the square roots of -1 using De Moivre theorem.',
    keywords: ['complex number', 'argand', 'polar', 'modulus', 'argument', 'conjugate', 'de moivre', 'root of unity', 'imaginary'],
  },
  {
    key: 'FinancialMathSim', name: 'Financial Mathematics Lab', subject: 'maths',
    description: 'Compound interest calculator with year-by-year breakdown. GST calculator (CGST/SGST/IGST). Shares and dividend calculator. Recurring deposit maturity calculator. Simple vs compound interest comparison graph.',
    nodes: 'C10: compound interest, GST, banking, shares and dividends. C11: compound interest, depreciation, shares, recurring deposit, fixed deposit, loan repayment.',
    controls: 'Principal slider, rate slider, time slider, calculation type (CI/SI/GST/shares/RD), compounding frequency selector.',
    readouts: 'Interest, Amount, GST, Dividend, Maturity value, Effective rate',
    challenges: '1) Find CI on Rs 10000 at 8% for 2 years. 2) Calculate GST at 18% on Rs 5000. 3) Find maturity value of RD of Rs 500/month for 2 years at 7%.',
    keywords: ['compound interest', 'simple interest', 'gst', 'shares', 'dividend', 'recurring deposit', 'banking', 'depreciation', 'loan'],
  },
  {
    key: 'MensurationSim', name: 'Mensuration Lab', subject: 'maths',
    description: '3D shape visualizer (cylinder, cone, sphere, hemisphere, frustum, combined solids). Surface area and volume calculator with formula display. Net diagram of each solid. Cross-section view. Combined solids decomposer.',
    nodes: 'C10: surface area and volume of cylinder, cone, sphere, hemisphere. C11: frustum, combined solids, conversion of solids.',
    controls: 'Shape selector (cylinder/cone/sphere/hemisphere/frustum/cuboid), radius slider, height slider, combined solids toggle.',
    readouts: 'Surface area, Volume, Curved surface area, Total surface area, Lateral surface area',
    challenges: '1) Find the volume of a cylinder with r=7, h=10. 2) Find the surface area of a sphere with r=6. 3) A cone is filled to the brim and poured into a cylinder. Find the height.',
    keywords: ['mensuration', 'surface area', 'volume', 'cylinder', 'cone', 'sphere', 'hemisphere', 'frustum', 'combined solid', 'conversion'],
  },
  {
    key: 'GeometryProofSim', name: 'Geometry Proof Lab', subject: 'maths',
    description: 'Interactive geometry canvas with draggable vertices. Congruence checker (SSS, SAS, ASA, RHS). Similarity explorer. Circle theorems visualizer (angle at center, cyclic quadrilateral, tangent properties). Pythagoras theorem proof animation.',
    nodes: 'C9: triangles, congruence, similarity, circle. C10: circles, tangents, properties. C11: properties of triangles, circles, parallelogram theorems.',
    controls: 'Shape selector (triangle/quadrilateral/circle), vertex drag, theorem selector (congruence/similarity/Pythagoras/circle theorems).',
    readouts: 'Side lengths, Angles, Congruence test, Similarity ratio, Area, Perimeter',
    challenges: '1) Prove that the sum of angles in a triangle is 180 degrees. 2) Verify Pythagoras theorem for a right triangle with sides 3, 4, 5. 3) Show that opposite angles of a cyclic quadrilateral are supplementary.',
    keywords: ['geometry', 'proof', 'congruence', 'similarity', 'circle theorem', 'pythagoras', 'tangent', 'cyclic quadrilateral', 'parallelogram'],
  },
  {
    key: 'ConstructionSim', name: 'Geometric Construction Lab', subject: 'maths',
    description: 'Compass and straightedge construction tool. Construct perpendicular bisector, angle bisector, triangles (given sides/angles), circumscribed/inscribed circles, tangent to circle from external point. Step-by-step construction animation.',
    nodes: 'C10: constructions (triangles, circles, tangents, circumscribing/inscribing).',
    controls: 'Construction type selector, point placement, compass radius slider, step-by-step play button.',
    readouts: 'Construction steps, Angles, Lengths, Radius, Center point',
    challenges: '1) Construct a triangle ABC with AB=5, BC=6, CA=7. 2) Construct a tangent to a circle from an external point. 3) Construct the circumscribed circle of a triangle.',
    keywords: ['construction', 'compass', 'straightedge', 'perpendicular bisector', 'angle bisector', 'tangent', 'circumscribe', 'inscribe', 'triangle construction'],
  },
  {
    key: 'PermutationCombinationSim', name: 'Permutations & Combinations Lab', subject: 'maths',
    description: 'Visual counting with arrangements and selections. nPr and nCr calculator with step-by-step. Circular permutations visualizer. Binomial theorem expansion with Pascal triangle. Restricted permutations and combinations.',
    nodes: 'C11: permutations (nPr, restricted, alike things, circular), combinations (nCr, properties, division into groups), binomial theorem (general term, middle term, Pascal triangle).',
    controls: 'n slider, r slider, mode (permutation/combination/circular/binomial), restriction type selector.',
    readouts: 'nPr, nCr, Circular permutations, Binomial expansion, General term, Middle term',
    challenges: '1) Find 8P3. 2) Find 10C3. 3) Find the 5th term in the expansion of (x+2)7.',
    keywords: ['permutation', 'combination', 'npr', 'ncr', 'circular', 'binomial', 'pascal', 'factorial', 'arrangement', 'selection', 'restricted'],
  },
  {
    key: 'InequalitiesSim', name: 'Inequalities Lab', subject: 'maths',
    description: 'Number line with shaded solution regions. Linear inequalities in one variable. Quadratic inequalities with method of intervals (wavy curve method). Sign chart display. System of inequalities with intersection region.',
    nodes: 'C11: linear inequalities in one variable, quadratic inequalities (method of intervals), systems of inequalities.',
    controls: 'Inequality type (linear/quadratic/system), coefficient sliders, inequality direction selector (less than/greater than/less equal/greater equal).',
    readouts: 'Solution set, Critical points, Sign chart, Interval notation, Graph',
    challenges: '1) Solve: 2x-5 > 7. 2) Solve: x2-5x+6 > 0 using method of intervals. 3) Solve the system: x+2y<=6, x-y>=1.',
    keywords: ['inequality', 'linear', 'quadratic', 'method of intervals', 'wavy curve', 'sign chart', 'solution set', 'interval'],
  },
  {
    key: 'MathematicalReasoningSim', name: 'Mathematical Reasoning Lab', subject: 'maths',
    description: 'Truth table builder for compound statements. Logical connectives visualizer (AND, OR, NOT, IMPLIES, IFF). Contradiction, converse, contrapositive generator. Syllogism and logical reasoning puzzles. Blood relations and coding problems.',
    nodes: 'C11: mathematical reasoning, statements, connecting words, truth tables, contradiction, converse, contrapositive, logical problems (odd man out, syllogism, blood relations, coding).',
    controls: 'Statement input, connective selector (AND/OR/NOT/IMPLIES/IFF), truth table generator, puzzle type selector.',
    readouts: 'Truth value, Truth table, Converse, Contrapositive, Negation, Validity',
    challenges: '1) Build the truth table for p IMPLIES q. 2) Write the contrapositive of "If it rains, the ground is wet." 3) Is "All cats are mammals" a valid statement?',
    keywords: ['reasoning', 'logic', 'truth table', 'connective', 'converse', 'contrapositive', 'contradiction', 'syllogism', 'blood relation', 'coding', 'statement'],
  },

  // ─── Chemistry (24 templates) ──────────────────────────────
  {
    key: 'AtomicStructureSim', name: 'Atomic Structure Lab', subject: 'chemistry',
    description: 'Bohr-Rutherford atomic model builder. Drag protons, neutrons, electrons to build atoms. Shows electron configuration, valence electrons, atomic number, mass number. Isotopes explorer. Energy levels and subshells.',
    nodes: 'C9: atomic structure, electrons, protons, neutrons, atomic number, mass number, isotopes, electronic configuration. C11: Bohr model, quantum numbers, orbitals, electronic configuration, Aufbau principle.',
    controls: 'Element selector (H to Ca), proton/neutron count sliders, electron shell click-to-fill, isotope toggle.',
    readouts: 'Atomic number, Mass number, Electron configuration, Valence electrons, Period, Group',
    challenges: '1) How many protons does Carbon have? 2) What is the electron configuration of Sodium (Z=11)? 3) What are isotopes of Hydrogen called?',
    keywords: ['atomic structure', 'proton', 'neutron', 'electron', 'isotope', 'electron configuration', 'bohr', 'orbital', 'quantum number', 'aufbau', 'valence'],
  },
  {
    key: 'PeriodicTableSim', name: 'Periodic Table Explorer', subject: 'chemistry',
    description: 'Interactive periodic table with element cards. Trends visualizer: atomic radius, ionization energy, electronegativity, metallic character. Period and group trends with graphs. Periodic law and classification history.',
    nodes: 'C10: periodic table, periods, groups, periodic properties (atomic radius, ionization enthalpy, electron gain enthalpy, electronegativity), metallic character. C11: modern periodic law, classification, trends.',
    controls: 'Element hover/click for details, trend selector (radius/ionization/electronegativity/metallic), group selector, period selector.',
    readouts: 'Element name, Symbol, Atomic number, Atomic mass, Trend value, Period, Group',
    challenges: '1) Which group is called halogens? 2) Why does atomic radius decrease across a period? 3) Which has higher ionization energy: Na or Cl?',
    keywords: ['periodic table', 'period', 'group', 'atomic radius', 'ionization', 'electronegativity', 'metallic character', 'periodic law', 'trend', 'classification'],
  },
  {
    key: 'ChemicalBondingSim', name: 'Chemical Bonding Lab', subject: 'chemistry',
    description: 'Lewis dot structure builder. Ionic vs covalent bonding visualizer with electron transfer/sharing animation. VSEPR theory molecular geometry predictor. Hybridization and orbital overlap diagrams. Polarity and dipole moment.',
    nodes: 'C9: chemical bonding, ionic, covalent, Lewis structures. C11: ionic bond, covalent bond, coordinate bond, VSEPR, hybridization (sp/sp2/sp3), sigma/pi bonds, polarity, dipole moment, resonance.',
    controls: 'Bond type selector (ionic/covalent/coordinate/metallic), molecule selector, electron pair placement, geometry predictor.',
    readouts: 'Lewis structure, Bond type, Molecular geometry, Hybridization, Bond angle, Dipole moment',
    challenges: '1) Draw the Lewis structure of H2O. 2) What is the shape of CH4? 3) What type of bond is in NaCl?',
    keywords: ['chemical bonding', 'ionic', 'covalent', 'lewis', 'vsepr', 'hybridization', 'sigma', 'pi', 'polarity', 'dipole', 'resonance', 'coordinate', 'metallic'],
  },
  {
    key: 'ChemicalReactionsSim', name: 'Chemical Reactions Lab', subject: 'chemistry',
    description: 'Chemical equation balancer with step-by-step. Types of reactions (combination, decomposition, displacement, double displacement, redox). Reactivity series. Precipitation, gas evolution, color change indicators.',
    nodes: 'C9: chemical reactions, types (combination, decomposition, displacement, double displacement), balancing equations. C10: redox reactions, oxidation number, reactivity series.',
    controls: 'Reaction type selector, reactant input, balance button, animate reaction toggle.',
    readouts: 'Balanced equation, Reaction type, Oxidation numbers, Products, Observations',
    challenges: '1) Balance: Fe + O2 -> Fe2O3. 2) What type of reaction is AgNO3 + NaCl -> AgCl + NaNO3? 3) Is Zn + CuSO4 -> ZnSO4 + Cu a redox reaction?',
    keywords: ['chemical reaction', 'balancing', 'combination', 'decomposition', 'displacement', 'double displacement', 'redox', 'oxidation', 'reactivity series', 'precipitation'],
  },
  {
    key: 'StoichiometrySim', name: 'Stoichiometry Lab', subject: 'chemistry',
    description: 'Mole concept calculator. Grams to moles to molecules conversion. Limiting reagent finder. Percent yield calculator. Concentration and molarity calculator. Empirical and molecular formula finder.',
    nodes: 'C10: mole concept, Avogadro number, molar mass, stoichiometry, limiting reagent, percent yield, concentration, molarity. C11: empirical formula, molecular formula.',
    controls: 'Substance selector, mass slider, volume slider, molarity slider, reaction input for limiting reagent.',
    readouts: 'Moles, Molecules, Molar mass, Limiting reagent, Percent yield, Molarity, Empirical formula',
    challenges: '1) How many moles are in 36g of water? 2) What is the molarity of 0.5 mol in 250 mL? 3) Find the empirical formula of a compound with 40% C, 6.7% H, 53.3% O.',
    keywords: ['stoichiometry', 'mole', 'avogadro', 'molar mass', 'limiting reagent', 'percent yield', 'molarity', 'concentration', 'empirical formula', 'molecular formula'],
  },
  {
    key: 'AcidsBasesSim', name: 'Acids, Bases & Salts Lab', subject: 'chemistry',
    description: 'pH scale with indicator colors. Strong/weak acid-base comparison. Neutralization reactions. Salt hydrolysis and pH of salt solutions. Buffer solutions. Titration curve plotter.',
    nodes: 'C10: acids, bases, salts, pH scale, indicators, neutralization. C11: Arrhenius, Bronsted-Lowry, Lewis theories, strong/weak acids/bases, pH, pOH, Kw, buffer solutions, salt hydrolysis.',
    controls: 'pH slider (0-14), acid/base selector, concentration slider, indicator selector, titration toggle.',
    readouts: 'pH, pOH, [H+], [OH-], Indicator color, Buffer capacity, Titration curve',
    challenges: '1) What is the pH of 0.001 M HCl? 2) Is NH4Cl acidic, basic, or neutral? 3) What happens when NaOH is added to HCl?',
    keywords: ['acid', 'base', 'salt', 'ph', 'indicator', 'neutralization', 'arrhenius', 'bronsted', 'lewis', 'buffer', 'titration', 'hydrolysis', 'kw'],
  },
  {
    key: 'OrganicChemistrySim', name: 'Organic Chemistry Lab', subject: 'chemistry',
    description: 'Hydrocarbon structure builder (alkanes, alkenes, alkynes, aromatics). IUPAC nomenclature generator. Functional groups explorer. Isomerism (chain, position, functional, stereoisomerism). Reaction mechanisms (substitution, addition, elimination).',
    nodes: 'C10: organic chemistry, hydrocarbons (alkanes, alkenes, alkynes), IUPAC nomenclature, isomerism. C12: organic chemistry, functional groups, reaction mechanisms, isomerism (structural, stereo), polymers, biomolecules.',
    controls: 'Hydrocarbon type selector, carbon chain length slider, functional group selector, isomerism type, reaction type.',
    readouts: 'IUPAC name, Molecular formula, Structural formula, Functional group, Isomer type, Reaction products',
    challenges: '1) Name CH3-CH2-CH2-CH3 using IUPAC. 2) What is the functional group in ethanol? 3) How many isomers does C4H10 have?',
    keywords: ['organic', 'hydrocarbon', 'alkane', 'alkene', 'alkyne', 'aromatic', 'iupac', 'nomenclature', 'functional group', 'isomerism', 'stereoisomer', 'substitution', 'addition', 'elimination', 'polymer', 'biomolecule'],
  },
  {
    key: 'ElectrochemistrySim', name: 'Electrochemistry Lab', subject: 'chemistry',
    description: 'Galvanic cell with anode/cathode, salt bridge, electron flow. Standard electrode potential chart. Electrolysis cell with Faraday laws calculator. Nernst equation. Battery types comparison.',
    nodes: 'C12: electrochemical cells, galvanic cell, standard electrode potential, electrochemical series, Nernst equation, electrolysis, Faraday laws, batteries, corrosion.',
    controls: 'Cell type (galvanic/electrolytic), electrode selector, concentration slider, temperature slider, current slider for electrolysis.',
    readouts: 'Cell potential (V), Electrode potential, EMF, Current (A), Mass deposited (g), Gibbs free energy',
    challenges: '1) In a galvanic cell, where does oxidation occur? 2) Calculate EMF of Zn|Zn2+||Cu2+|Cu (E0Zn=-0.76, E0Cu=+0.34). 3) How many coulombs deposit 1 mole of Cu2+?',
    keywords: ['electrochemistry', 'galvanic', 'electrolysis', 'electrode potential', 'nernst', 'faraday', 'battery', 'corrosion', 'emf', 'anode', 'cathode', 'salt bridge'],
  },
  {
    key: 'ChemicalKineticsSim', name: 'Chemical Kinetics Lab', subject: 'chemistry',
    description: 'Reaction rate vs concentration graph. Order of reaction determiner (zero, first, second). Rate law and rate constant calculator. Arrhenius equation and activation energy plot. Temperature effect on rate. Catalyst effect.',
    nodes: 'C12: rate of reaction, rate law, order of reaction, rate constant, Arrhenius equation, activation energy, temperature dependence, catalyst, collision theory.',
    controls: 'Concentration sliders for reactants, temperature slider, catalyst toggle, reaction order selector.',
    readouts: 'Rate (mol/L/s), Rate constant k, Order, Activation energy (kJ/mol), Half-life',
    challenges: '1) For a first-order reaction, what is the relationship between rate and concentration? 2) How does temperature affect reaction rate? 3) What does a catalyst do to activation energy?',
    keywords: ['kinetics', 'rate', 'rate law', 'order', 'rate constant', 'arrhenius', 'activation energy', 'catalyst', 'collision theory', 'half-life', 'temperature'],
  },
  {
    key: 'ThermochemistrySim', name: 'Thermochemistry Lab', subject: 'chemistry',
    description: 'Enthalpy change calculator for reactions. Exothermic vs endothermic visualizer with energy diagrams. Hess law step-by-step. Bond energy calculator. Calorimetry simulation. Entropy and Gibbs free energy.',
    nodes: 'C11: chemical energetics, exothermic/endothermic, enthalpy, Hess law, bond energy, calorimetry. C12: thermodynamics, enthalpy, entropy, Gibbs free energy, spontaneity.',
    controls: 'Reaction selector, reactant/product energy sliders, bond type selector, temperature slider.',
    readouts: 'Delta H (kJ/mol), Delta S (J/K/mol), Delta G (kJ/mol), Spontaneity, Bond energy, Heat (q)',
    challenges: '1) Is combustion exothermic or endothermic? 2) Calculate Delta H using Hess law for a given reaction. 3) For what temperature is a reaction with Delta H > 0 and Delta S > 0 spontaneous?',
    keywords: ['thermochemistry', 'enthalpy', 'exothermic', 'endothermic', 'hess', 'bond energy', 'calorimetry', 'entropy', 'gibbs', 'spontaneity', 'thermodynamics'],
  },
  {
    key: 'MetallurgySim', name: 'Metallurgy Lab', subject: 'chemistry',
    description: 'Extraction of metals flowchart (crushing, concentration, roasting, smelting, refining). Reactivity series and extraction method. Blast furnace for iron extraction. Electrolytic refining. Alloy composition calculator.',
    nodes: 'C10: metallurgy, extraction of metals (Fe, Al, Cu), blast furnace, refining, alloys. C12: metallurgy of aluminium, iron, copper, silver, gold, refining, alloys.',
    controls: 'Metal selector (Fe/Al/Cu/Na/Au), extraction step selector, process animation play, alloy mixer.',
    readouts: 'Extraction method, Ore type, Reducing agent, Furnace temperature, Alloy composition, Purity',
    challenges: '1) How is iron extracted in a blast furnace? 2) Why is aluminium extracted by electrolysis? 3) What is the composition of brass?',
    keywords: ['metallurgy', 'extraction', 'blast furnace', 'smelting', 'roasting', 'refining', 'alloy', 'ore', 'concentration', 'reduction', 'iron', 'aluminium', 'copper'],
  },
  {
    key: 'IndustrialChemSim', name: 'Industrial Chemistry Lab', subject: 'chemistry',
    description: 'Haber process for ammonia synthesis. Contact process for sulfuric acid. Solvay process for washing soda. Ostwald process for nitric acid. Process flow diagrams with conditions (temperature, pressure, catalyst).',
    nodes: 'C10: industrial processes (Haber, Contact, Solvay). C12: industrial chemistry, Haber process, Contact process, Solvay process, Ostwald process, fertilizers.',
    controls: 'Process selector (Haber/Contact/Solvay/Ostwald), temperature slider, pressure slider, catalyst toggle.',
    readouts: 'Product, Yield (%), Temperature (K), Pressure (atm), Catalyst, Le Chatelier effect',
    challenges: '1) What catalyst is used in the Haber process? 2) Why is high pressure used in ammonia synthesis? 3) What is the Contact process used to manufacture?',
    keywords: ['industrial', 'haber', 'contact', 'solvay', 'ostwald', 'ammonia', 'sulfuric acid', 'nitric acid', 'washing soda', 'fertilizer', 'le chatelier'],
  },
  {
    key: 'CoordinationChemSim', name: 'Coordination Chemistry Lab', subject: 'chemistry',
    description: 'Coordination compound builder with central metal, ligands, and coordination number. IUPAC nomenclature for complexes. Crystal field theory (octahedral, tetrahedral splitting). Color of complexes. Isomerism in coordination compounds.',
    nodes: 'C12: coordination compounds, ligands, coordination number, IUPAC nomenclature, isomerism, crystal field theory, color, bonding (Werner theory).',
    controls: 'Metal ion selector, ligand selector, coordination number slider, geometry selector (octahedral/tetrahedral/square planar).',
    readouts: 'Complex name, Formula, Coordination number, Geometry, Crystal field splitting, Color',
    challenges: '1) What is the coordination number of [Co(NH3)6]3+? 2) Name the complex [PtCl4]2-. 3) Why are transition metal complexes colored?',
    keywords: ['coordination', 'ligand', 'coordination number', 'werner', 'crystal field', 'splitting', 'isomerism', 'color', 'complex', 'nomenclature'],
  },
  {
    key: 'pBlockSim', name: 'p-Block Elements Lab', subject: 'chemistry',
    description: 'p-block element explorer (Groups 13-18). Properties and trends: inert pair effect, anomalous behavior of first element. Important compounds (borax, boric acid, silicones, ozone, oxides of nitrogen/sulfur/phosphorus).',
    nodes: 'C12: p-block elements, Group 13 (boron family), Group 14 (carbon family), Group 15 (nitrogen family), Group 16 (oxygen family), Group 17 (halogens), Group 18 (noble gases), important compounds.',
    controls: 'Group selector (13-18), element selector, compound selector, property viewer.',
    readouts: 'Electronic configuration, Oxidation states, Properties, Compounds, Uses',
    challenges: '1) What is the inert pair effect? 2) Why is nitrogen gas inert? 3) What is the structure of P4?',
    keywords: ['p-block', 'group 13', 'group 14', 'group 15', 'group 16', 'group 17', 'group 18', 'boron', 'carbon', 'nitrogen', 'oxygen', 'halogen', 'noble gas', 'inert pair'],
  },
  {
    key: 'dBlockSim', name: 'd-Block & f-Block Lab', subject: 'chemistry',
    description: 'Transition metals explorer (3d, 4d, 5d series). Variable oxidation states, colored ions, magnetic properties, catalytic activity. Lanthanides and actinides overview. Interstitial compounds. Alloy formation.',
    nodes: 'C12: d-block elements, transition elements, electronic configuration, variable oxidation states, color, magnetic properties, catalytic activity, interstitial compounds, alloy formation, lanthanides, actinides.',
    controls: 'Series selector (3d/4d/5d/4f/5f), element selector, oxidation state slider, magnetic property toggle.',
    readouts: 'Electronic configuration, Oxidation states, Color, Magnetic moment, Catalytic use',
    challenges: '1) Why do transition metals show variable oxidation states? 2) Why is CuSO4 blue? 3) What are lanthanides?',
    keywords: ['d-block', 'transition', 'f-block', 'lanthanide', 'actinide', 'oxidation state', 'color', 'magnetic', 'catalytic', 'interstitial', 'alloy'],
  },
  {
    key: 'SurfaceChemistrySim', name: 'Surface Chemistry Lab', subject: 'chemistry',
    description: 'Adsorption visualizer (physisorption vs chemisorption). Colloids and suspensions comparison. Tyndall effect demo. Emulsions, gels, sols. Catalysis types (homogeneous, heterogeneous, enzyme). Brownian motion.',
    nodes: 'C12: surface chemistry, adsorption (physisorption, chemisorption, factors), colloids (types, properties, Tyndall effect), emulsions, gels, catalysis (types), Brownian motion.',
    controls: 'Phenomenon selector (adsorption/colloid/catalysis), surface area slider, temperature slider, colloid type selector.',
    readouts: 'Adsorption type, Colloid type, Tyndall effect (yes/no), Particle size, Brownian motion intensity',
    challenges: '1) What is the difference between physisorption and chemisorption? 2) What is the Tyndall effect? 3) Give an example of a colloidal solution.',
    keywords: ['surface chemistry', 'adsorption', 'physisorption', 'chemisorption', 'colloid', 'tyndall', 'emulsion', 'gel', 'sol', 'catalysis', 'brownian'],
  },
  {
    key: 'BiomoleculesSim', name: 'Biomolecules Lab', subject: 'chemistry',
    description: 'Carbohydrates (mono/di/polysaccharides) structure viewer. Proteins and amino acids with peptide bond formation. Nucleic acids (DNA/RNA) with base pairing. Lipids and fats. Vitamins and hormones. Enzyme action.',
    nodes: 'C12: biomolecules, carbohydrates (glucose, fructose, sucrose, starch, cellulose), proteins (amino acids, peptide bond, denaturation), nucleic acids (DNA, RNA), lipids, vitamins, hormones.',
    controls: 'Biomolecule type selector, monomer builder, polymer chain length slider, DNA base pair matcher.',
    readouts: 'Structure, Monomer, Polymer, Function, Molecular formula',
    challenges: '1) What is the monomer of starch? 2) What type of bond links amino acids? 3) What are the bases in DNA?',
    keywords: ['biomolecule', 'carbohydrate', 'glucose', 'protein', 'amino acid', 'peptide', 'nucleic acid', 'dna', 'rna', 'lipid', 'vitamin', 'hormone', 'enzyme'],
  },
  {
    key: 'PolymersSim', name: 'Polymers Lab', subject: 'chemistry',
    description: 'Polymerization types (addition, condensation). Monomer to polymer chain builder. Natural vs synthetic polymers. Common polymers (polythene, PVC, nylon, bakelite, rubber). Biodegradable polymers. Copolymers.',
    nodes: 'C12: polymers, classification (natural, synthetic), types of polymerization (addition, condensation), copolymers, biodegradable polymers, common polymers (polythene, PVC, Teflon, nylon, bakelite, rubber).',
    controls: 'Polymerization type selector, monomer selector, chain length slider, polymer selector.',
    readouts: 'Monomer, Polymer, Polymerization type, Degree of polymerization, Properties, Uses',
    challenges: '1) What is the monomer of polythene? 2) Is nylon an addition or condensation polymer? 3) Give an example of a natural polymer.',
    keywords: ['polymer', 'polymerization', 'addition', 'condensation', 'monomer', 'copolymer', 'biodegradable', 'polythene', 'pvc', 'nylon', 'bakelite', 'rubber', 'teflon'],
  },
  {
    key: 'ChemistryEverydaySim', name: 'Chemistry in Everyday Life', subject: 'chemistry',
    description: 'Drugs and medicines (antacids, analgesics, antibiotics, antihistamines). Soaps and detergents with micelle formation. Food chemistry (preservatives, sweeteners, antioxidants). Cleansing agents comparison.',
    nodes: 'C12: chemistry in everyday life, drugs (antacids, antihistamines, analgesics, antibiotics, antiseptics, disinfectants), food chemistry (preservatives, sweeteners, antioxidants), cleansing agents (soaps, detergents).',
    controls: 'Category selector (drugs/food/cleansing), substance selector, micelle formation animation toggle.',
    readouts: 'Drug type, Use, Side effects, Chemical name, Micelle structure',
    challenges: '1) What is an antacid? Give an example. 2) How do soaps clean? 3) What is the difference between soap and detergent?',
    keywords: ['everyday', 'drug', 'antacid', 'analgesic', 'antibiotic', 'antihistamine', 'soap', 'detergent', 'micelle', 'preservative', 'sweetener', 'antioxidant', 'cleansing'],
  },
  {
    key: 'AnalyticalChemSim', name: 'Analytical Chemistry Lab', subject: 'chemistry',
    description: 'Qualitative analysis: cation/anion identification with flame tests, group separation. Quantitative analysis: titration setup. Chromatography (paper, thin layer). Spectroscopy basics. Gravimetric analysis.',
    nodes: 'C11/C12: analytical chemistry, qualitative analysis (cation/anion, flame test, group separation), quantitative analysis (titration), chromatography, spectroscopy.',
    controls: 'Analysis type (qualitative/quantitative), ion selector, reagent selector, flame test toggle, titration play.',
    readouts: 'Ion identified, Group, Flame color, Precipitate, Titration endpoint, Concentration',
    challenges: '1) What color flame does sodium produce? 2) How do you test for chloride ions? 3) What is the principle of chromatography?',
    keywords: ['analytical', 'qualitative', 'quantitative', 'flame test', 'cation', 'anion', 'titration', 'chromatography', 'spectroscopy', 'gravimetric', 'precipitate'],
  },
  {
    key: 'GaseousStateSim', name: 'Gaseous State Lab', subject: 'chemistry',
    description: 'Gas law simulator (Boyle, Charles, Avogadro, Gay-Lussac). Ideal gas equation PV=nRT. Deviation from ideal behavior. Van der Waals equation. Dalton law of partial pressures. Graham law of diffusion. Maxwell-Boltzmann distribution.',
    nodes: 'C11: gaseous state, gas laws (Boyle, Charles, Avogadro, Gay-Lussac), ideal gas equation, Dalton law, Graham law, deviation from ideal behavior, Van der Waals equation, Maxwell-Boltzmann distribution.',
    controls: 'Gas law selector, pressure slider, volume slider, temperature slider, moles slider, real vs ideal toggle.',
    readouts: 'P, V, T, n, PV/nRT, Deviation, Partial pressure, RMS velocity',
    challenges: '1) State Boyle law. 2) Calculate the volume of 1 mole of gas at STP. 3) Why do real gases deviate from ideal behavior?',
    keywords: ['gas', 'gaseous state', 'boyle', 'charles', 'avogadro', 'gay-lussac', 'ideal gas', 'van der waals', 'dalton', 'graham', 'maxwell-boltzmann', 'deviation'],
  },
  {
    key: 'SolidStateSim', name: 'Solid State Lab', subject: 'chemistry',
    description: 'Crystal lattice builder (cubic, tetragonal, orthorhombic, hexagonal). Unit cell types (simple, body-centered, face-centered). Packing efficiency calculator. Void types (tetrahedral, octahedral). Defects in solids (Schottky, Frenkel).',
    nodes: 'C12: solid state, classification (crystalline, amorphous), unit cell, crystal systems, packing (hcp, ccp, bcc), packing efficiency, voids, defects (point, Schottky, Frenkel), properties.',
    controls: 'Crystal system selector, unit cell type selector, packing type selector, defect type selector.',
    readouts: 'Lattice type, Coordination number, Packing efficiency, Density, Number of atoms per unit cell',
    challenges: '1) What is the coordination number of bcc? 2) What is the packing efficiency of fcc? 3) What is a Schottky defect?',
    keywords: ['solid state', 'crystal', 'lattice', 'unit cell', 'cubic', 'tetragonal', 'hexagonal', 'bcc', 'fcc', 'hcp', 'packing', 'void', 'defect', 'schottky', 'frenkel'],
  },
  {
    key: 'SolutionsSim', name: 'Solutions Lab', subject: 'chemistry',
    description: 'Solution concentration explorer (molarity, molality, mole fraction, % by mass/volume). Solubility vs temperature graph. Colligative properties (Raoult law, boiling point elevation, freezing point depression, osmotic pressure). Van\'t Hoff factor.',
    nodes: 'C12: solutions, types, concentration (molarity, molality, mole fraction), solubility, colligative properties (Raoult law, relative lowering, boiling point elevation, freezing point depression, osmotic pressure), Van\'t Hoff factor.',
    controls: 'Solute/solvent selector, concentration slider, temperature slider, colligative property selector.',
    readouts: 'Molarity, Molality, Mole fraction, Boiling point, Freezing point, Osmotic pressure, Van\'t Hoff factor',
    challenges: '1) What is molality? 2) Why does salt melt ice? 3) What is the Van\'t Hoff factor for NaCl?',
    keywords: ['solution', 'concentration', 'molarity', 'molality', 'mole fraction', 'solubility', 'colligative', 'raoult', 'boiling point elevation', 'freezing point depression', 'osmotic pressure', 'van\'t hoff'],
  },
  {
    key: 'RedoxSim', name: 'Redox Reactions Lab', subject: 'chemistry',
    description: 'Oxidation number calculator. Balancing redox equations (half-reaction method). Oxidizing and reducing agent identifier. Electrochemical series with reactivity. Disproportionation and comproportionation reactions.',
    nodes: 'C10/C11: redox reactions, oxidation number, balancing (half-reaction, oxidation number method), oxidizing/reducing agents, electrochemical series, disproportionation.',
    controls: 'Reaction input, oxidation number calculator, balance method selector, agent identifier.',
    readouts: 'Oxidation numbers, Balanced equation, Oxidizing agent, Reducing agent, Half-reactions',
    challenges: '1) What is the oxidation number of S in H2SO4? 2) Balance: MnO4- + Fe2+ -> Mn2+ + Fe3+. 3) Identify the reducing agent in the reaction.',
    keywords: ['redox', 'oxidation number', 'half reaction', 'oxidizing agent', 'reducing agent', 'electrochemical series', 'disproportionation', 'balancing'],
  },
  {
    key: 'HydrogenSim', name: 'Hydrogen & Water Lab', subject: 'chemistry',
    description: 'Hydrogen: preparation, properties, uses. Hydrides (ionic, covalent, metallic). Hardness of water (temporary, permanent). Water treatment methods. Heavy water. Hydrogen economy. Fuel cells.',
    nodes: 'C11: hydrogen, position in periodic table, preparation, properties, hydrides, water (structure, properties, hardness), heavy water, hydrogen peroxide.',
    controls: 'Topic selector (hydrogen/water/hydrides/heavy water), preparation method, water hardness slider, treatment method.',
    readouts: 'Preparation reaction, Properties, Hydride type, Water hardness, Heavy water properties',
    challenges: '1) How is hydrogen prepared in the laboratory? 2) What is temporary hardness of water? 3) What is heavy water?',
    keywords: ['hydrogen', 'hydride', 'water', 'hardness', 'heavy water', 'hydrogen peroxide', 'fuel cell', 'hydrogen economy', 'treatment'],
  },
  {
    key: 'SBlockSim', name: 's-Block Elements Lab', subject: 'chemistry',
    description: 'Group 1 (alkali metals) and Group 2 (alkaline earth metals) explorer. Trends: reactivity, atomic radius, ionization energy. Important compounds (NaOH, Na2CO3, NaHCO3, CaO, CaCO3, plaster of Paris, cement). Biological importance.',
    nodes: 'C11: s-block elements, Group 1 (alkali metals, properties, compounds: NaOH, Na2CO3, NaHCO3, NaCl), Group 2 (alkaline earth metals, properties, compounds: CaO, CaCO3, plaster of Paris, cement), biological importance.',
    controls: 'Group selector (1/2), element selector, compound selector, reactivity animation.',
    readouts: 'Electronic configuration, Reactivity, Compound formula, Uses, Biological role',
    challenges: '1) Why are alkali metals stored in kerosene? 2) What is the formula of washing soda? 3) What is plaster of Paris?',
    keywords: ['s-block', 'alkali metal', 'alkaline earth', 'group 1', 'group 2', 'sodium', 'potassium', 'calcium', 'washing soda', 'baking soda', 'plaster of paris', 'cement'],
  },

  // ─── Computer Science (12 templates) ───────────────────────
  {
    key: 'BinaryNumberSim', name: 'Binary Number System Lab', subject: 'cs',
    description: 'Binary-decimal-hex converter with bit visualizer. Bitwise operations (AND, OR, XOR, NOT, shift). Two complement representation. Floating point (IEEE 754) visualizer. Boolean algebra simplifier with truth tables.',
    nodes: 'C10: number systems (binary, octal, hex), conversions, complements, Boolean algebra, logic gates. C12: data representation, binary arithmetic, Boolean algebra, gates, K-map.',
    controls: 'Number input, base selector (2/8/10/16), bit toggle, operation selector (AND/OR/XOR/NOT/shift), IEEE 754 mode.',
    readouts: 'Binary, Decimal, Hex, Octal, Two complement, Truth table',
    challenges: '1) Convert 25 to binary. 2) What is 1010 AND 1100? 3) What is the two complement of 5 (8-bit)?',
    keywords: ['binary', 'number system', 'hexadecimal', 'octal', 'complement', 'boolean', 'bitwise', 'ieee 754', 'floating point', 'k-map', 'logic gate'],
  },
  {
    key: 'LogicGateSim', name: 'Logic Gate Simulator', subject: 'cs',
    description: 'Interactive logic gate circuit builder. AND, OR, NOT, NAND, NOR, XOR, XNOR gates with draggable inputs. Truth table generator. Boolean expression to circuit converter. Karnaugh map simplifier.',
    nodes: 'C10: logic gates (AND, OR, NOT, NAND, NOR, XOR), truth tables, Boolean expressions, De Morgan laws. C12: logic gates, combinational circuits, K-map, Boolean algebra simplification.',
    controls: 'Gate selector, input toggle (0/1), circuit canvas, expression input, K-map mode.',
    readouts: 'Output (0/1), Truth table, Simplified expression, K-map grouping',
    challenges: '1) Build a circuit for A AND (B OR C). 2) Simplify AB + AB using Boolean algebra. 3) What is the truth table for NAND?',
    keywords: ['logic gate', 'and', 'or', 'not', 'nand', 'nor', 'xor', 'xnor', 'truth table', 'boolean', 'de morgan', 'k-map', 'combinational'],
  },
  {
    key: 'AlgorithmSim', name: 'Algorithm Visualizer', subject: 'cs',
    description: 'Step-by-step sorting visualizer (bubble, selection, insertion, merge, quick). Searching algorithms (linear, binary). Time complexity comparison graph. Step counter and comparison counter.',
    nodes: 'C10: algorithms, flowcharts, pseudocode, sorting (bubble, selection). C12: algorithms (sorting, searching), complexity (Big O), time/space analysis.',
    controls: 'Algorithm selector, array size slider, speed slider, step/play/pause, randomize array button.',
    readouts: 'Current step, Comparisons, Swaps, Time complexity, Array state',
    challenges: '1) How many comparisons does bubble sort make for n=5? 2) What is the time complexity of binary search? 3) Which sort is most efficient for nearly sorted data?',
    keywords: ['algorithm', 'sorting', 'bubble', 'selection', 'insertion', 'merge', 'quick', 'searching', 'linear', 'binary', 'complexity', 'big o', 'flowchart', 'pseudocode'],
  },
  {
    key: 'DataStructureSim', name: 'Data Structure Explorer', subject: 'cs',
    description: 'Stack (push/pop/peek) with LIFO visualization. Queue (enqueue/dequeue) with FIFO. Linked list (insert/delete/traverse). Binary tree (insert/traversal: inorder, preorder, postorder). Hash table with collision handling.',
    nodes: 'C12: data structures, stack, queue, linked list, trees (binary, BST), traversal, hash table.',
    controls: 'Structure selector (stack/queue/linked list/tree/hash), operation selector (insert/delete/search/traverse), value input.',
    readouts: 'Structure state, Top/Front/Root, Size, Traversal order, Collision count',
    challenges: '1) What is LIFO? Which structure uses it? 2) Traverse a BST in inorder. 3) What happens when you push 3, push 5, pop in a stack?',
    keywords: ['data structure', 'stack', 'queue', 'linked list', 'tree', 'binary', 'bst', 'traversal', 'inorder', 'preorder', 'postorder', 'hash table', 'collision', 'lifo', 'fifo'],
  },
  {
    key: 'ProgrammingSim', name: 'Programming Concepts Lab', subject: 'cs',
    description: 'Interactive code executor with variable state visualizer. Loop visualizer (for, while, do-while) with iteration counter. Conditional statements (if/else/switch) flow. Function call stack visualizer. Recursion tree with base case highlighting.',
    nodes: 'C10: programming in Java/Python, variables, data types, operators, control structures (if, loop), methods. C12: programming, functions, recursion, arrays, strings, classes, objects.',
    controls: 'Code editor, language selector (Java/Python), run button, step debugger, variable watch panel.',
    readouts: 'Output, Variable values, Call stack, Iteration count, Recursion depth',
    challenges: '1) What does a for loop do? 2) Write a function to check if a number is prime. 3) What is recursion? Give an example.',
    keywords: ['programming', 'java', 'python', 'variable', 'data type', 'operator', 'loop', 'for', 'while', 'if', 'else', 'switch', 'function', 'recursion', 'array', 'string', 'class', 'object'],
  },
  {
    key: 'OOPSim', name: 'OOP Concepts Lab', subject: 'cs',
    description: 'Class and object visualizer with UML diagram. Inheritance hierarchy builder. Polymorphism demo (overloading vs overriding). Encapsulation with access modifiers. Abstract class and interface comparison.',
    nodes: 'C12: object-oriented programming, classes, objects, encapsulation, inheritance, polymorphism, abstraction, interfaces, packages.',
    controls: 'Concept selector (class/inheritance/polymorphism/encapsulation/abstraction), class builder, method adder, UML toggle.',
    readouts: 'Class diagram, Object state, Inheritance tree, Method resolution, Access level',
    challenges: '1) What is encapsulation? 2) Difference between overloading and overriding? 3) What is an abstract class?',
    keywords: ['oop', 'object oriented', 'class', 'object', 'encapsulation', 'inheritance', 'polymorphism', 'abstraction', 'interface', 'overloading', 'overriding', 'uml', 'package'],
  },
  {
    key: 'DatabaseSim', name: 'Database & SQL Lab', subject: 'cs',
    description: 'Interactive SQL query executor on sample tables. SELECT, INSERT, UPDATE, DELETE with results. JOIN visualizer (inner, left, right). WHERE clause builder. Primary key and foreign key relationships. Normalization (1NF, 2NF, 3NF) demo.',
    nodes: 'C10: database concepts, SQL basics (DDL, DML, DQL), tables, records. C12: database management, SQL (DDL, DML, TCL, DQL), joins, normalization, keys, constraints.',
    controls: 'Query input, table selector, join type selector, execution button, normalization toggle.',
    readouts: 'Query result, Affected rows, Table schema, Join diagram, Normal form level',
    challenges: '1) Write SELECT * FROM students WHERE age > 15. 2) What is a primary key? 3) What is the difference between INNER JOIN and LEFT JOIN?',
    keywords: ['database', 'sql', 'select', 'insert', 'update', 'delete', 'join', 'inner', 'left', 'right', 'primary key', 'foreign key', 'normalization', '1nf', '2nf', '3nf', 'ddl', 'dml', 'constraint'],
  },
  {
    key: 'NetworkingSim', name: 'Computer Networks Lab', subject: 'cs',
    description: 'OSI/TCP-IP model with layer-by-layer data flow. IP addressing (IPv4 classes, subnetting). Router and switch simulation. DNS resolution animation. HTTP request-response cycle. Network topologies (star, ring, bus, mesh).',
    nodes: 'C10: networking, network topologies, protocols, IP addressing. C12: networks, OSI model, TCP/IP, protocols (HTTP, FTP, SMTP, DNS), IP addressing, subnetting, network security.',
    controls: 'Layer selector (OSI/TCP-IP), topology selector, IP address input, subnet mask slider, protocol selector.',
    readouts: 'Layer info, IP class, Subnet, Broadcast address, Protocol details, Topology type',
    challenges: '1) How many layers are in the OSI model? 2) What is the IP class of 192.168.1.1? 3) What does DNS do?',
    keywords: ['network', 'osi', 'tcp/ip', 'ip address', 'subnetting', 'router', 'switch', 'dns', 'http', 'ftp', 'smtp', 'topology', 'star', 'ring', 'bus', 'mesh', 'protocol', 'ipv4'],
  },
  {
    key: 'CyberSecuritySim', name: 'Cyber Security Lab', subject: 'cs',
    description: 'Encryption/decryption visualizer (Caesar cipher, RSA basics). Hash function demo (MD5, SHA). Password strength checker. Common attacks (phishing, SQL injection, XSS) with prevention. Firewall and antivirus concepts.',
    nodes: 'C10: cyber safety, cyber crime, identity protection, safe browsing. C12: cyber security, encryption, digital signatures, firewalls, common threats, ethical hacking.',
    controls: 'Cipher type selector, key slider, message input, hash function selector, attack type selector.',
    readouts: 'Encrypted text, Decrypted text, Hash value, Password strength, Threat level',
    challenges: '1) Encrypt HELLO with Caesar cipher (shift=3). 2) What is phishing? 3) What makes a strong password?',
    keywords: ['cyber security', 'encryption', 'decryption', 'caesar', 'rsa', 'hash', 'md5', 'sha', 'password', 'phishing', 'sql injection', 'xss', 'firewall', 'antivirus', 'digital signature', 'ethical hacking'],
  },
  {
    key: 'HTMLCSSSim', name: 'HTML & CSS Lab', subject: 'cs',
    description: 'Live HTML editor with preview. CSS property visualizer (color, margin, padding, border, flexbox). Box model interactive demo. Responsive design with viewport slider. HTML tags explorer.',
    nodes: 'C10: HTML basics, tags, structure, CSS, selectors, properties. Web page design.',
    controls: 'HTML input, CSS input, viewport width slider, element selector, property slider.',
    readouts: 'Rendered preview, Box model, Element dimensions, CSS specificity, Responsive breakpoint',
    challenges: '1) What does the <a> tag do? 2) What is the CSS box model? 3) How do you center a div with flexbox?',
    keywords: ['html', 'css', 'tag', 'selector', 'property', 'box model', 'margin', 'padding', 'border', 'flexbox', 'responsive', 'viewport', 'web design'],
  },
  {
    key: 'JavaScriptSim', name: 'JavaScript Lab', subject: 'cs',
    description: 'Live JS executor with console output. DOM manipulation visualizer. Event handling (click, hover, keypress). Array methods (map, filter, reduce) step-by-step. ES6 features (arrow functions, destructuring, promises).',
    nodes: 'C10: JavaScript basics, variables, functions, DOM, events. C12: JavaScript, ES6, DOM manipulation, event handling, JSON, AJAX.',
    controls: 'Code input, run button, console output, DOM tree view, event selector.',
    readouts: 'Console output, Variable values, DOM state, Event log, Return value',
    challenges: '1) What does Array.map() do? 2) Write an arrow function that doubles a number. 3) What is a Promise?',
    keywords: ['javascript', 'js', 'variable', 'function', 'dom', 'event', 'array', 'map', 'filter', 'reduce', 'es6', 'arrow function', 'destructuring', 'promise', 'json', 'ajax'],
  },
  {
    key: 'ComputerArchitectureSim', name: 'Computer Architecture Lab', subject: 'cs',
    description: 'CPU components visualizer (ALU, CU, registers, cache). Instruction cycle (fetch-decode-execute) animation. Memory hierarchy (register, cache, RAM, disk) with access time comparison. Von Neumann vs Harvard architecture.',
    nodes: 'C10: computer architecture, CPU, memory, input/output, bus. C12: computer architecture, CPU, instruction cycle, memory hierarchy, addressing modes, interrupts.',
    controls: 'Component selector, instruction input, clock speed slider, cache size slider, architecture toggle.',
    readouts: 'Instruction cycle step, Register values, Memory access time, Cache hit/miss, CPI',
    challenges: '1) What are the stages of the instruction cycle? 2) What is the fastest memory in a computer? 3) What is the difference between RAM and cache?',
    keywords: ['computer architecture', 'cpu', 'alu', 'control unit', 'register', 'cache', 'memory hierarchy', 'ram', 'rom', 'instruction cycle', 'fetch', 'decode', 'execute', 'von neumann', 'harvard', 'bus', 'addressing mode'],
  },

  // ─── Biology (20 templates) ────────────────────────────────
  {
    key: 'CellBiologySim', name: 'Cell Biology Lab', subject: 'biology',
    description: 'Interactive animal and plant cell with labeled organelles. Click each organelle to see function. Cell theory timeline. Prokaryotic vs eukaryotic comparison. Cell membrane structure (phospholipid bilayer, proteins).',
    nodes: 'C9: cell structure, organelles, cell theory, prokaryotic/eukaryotic. C10: cell structure and function, plant vs animal cell, cell membrane. C11: cell biology, biomolecules, cell organelles.',
    controls: 'Cell type selector (animal/plant/prokaryotic), organelle click, zoom slider, membrane cross-section toggle.',
    readouts: 'Organelle name, Function, Cell type, Magnification, Organelle count',
    challenges: '1) What is the powerhouse of the cell? 2) Difference between plant and animal cells? 3) What is the function of ribosomes?',
    keywords: ['cell', 'organelle', 'nucleus', 'mitochondria', 'ribosome', 'golgi', 'endoplasmic', 'lysosome', 'membrane', 'prokaryotic', 'eukaryotic', 'cell theory', 'chloroplast', 'vacuole'],
  },
  {
    key: 'GeneticsSim', name: 'Genetics & Heredity Lab', subject: 'biology',
    description: 'Punnett square generator for monohybrid and dihybrid crosses. Mendel laws visualizer. Dominant/recessive trait explorer. Sex-linked inheritance. Pedigree chart analyzer. DNA structure with base pairing.',
    nodes: 'C10: genetics, Mendel laws, monohybrid/dihybrid cross, sex-linked inheritance, DNA. C12: genetics, DNA, RNA, protein synthesis, Mendelian inheritance, pedigree analysis.',
    controls: 'Cross type (monohybrid/dihybrid/test/sex-linked), parent genotype input, Punnett square generator, pedigree toggle.',
    readouts: 'Genotype ratio, Phenotype ratio, Probability, Punnett square, Pedigree analysis',
    challenges: '1) In a monohybrid cross Rr x Rr, what is the phenotypic ratio? 2) What are Mendel three laws? 3) What bases pair in DNA?',
    keywords: ['genetics', 'heredity', 'mendel', 'punnett', 'monohybrid', 'dihybrid', 'dominant', 'recessive', 'sex-linked', 'pedigree', 'dna', 'base pairing', 'genotype', 'phenotype', 'allele'],
  },
  {
    key: 'HumanPhysiologySim', name: 'Human Physiology Lab', subject: 'biology',
    description: 'Body systems explorer: digestive, respiratory, circulatory, excretory, nervous, endocrine. Interactive organ diagrams with function. Homeostasis demo. Enzyme action and factors affecting enzymes.',
    nodes: 'C10: human body systems (digestion, respiration, circulation, excretion, nervous, endocrine). C11: human physiology, digestion, absorption, breathing, circulation, excretion, nervous system, hormones.',
    controls: 'System selector, organ click, process animation play, enzyme factor sliders (temperature, pH, substrate).',
    readouts: 'Organ name, Function, Process steps, Enzyme rate, Homeostasis value',
    challenges: '1) Where does gas exchange occur in the lungs? 2) What is the function of the pancreas? 3) What factors affect enzyme activity?',
    keywords: ['physiology', 'digestive', 'respiratory', 'circulatory', 'excretory', 'nervous', 'endocrine', 'homeostasis', 'enzyme', 'organ', 'lung', 'heart', 'kidney', 'brain', 'hormone'],
  },
  {
    key: 'PlantBiologySim', name: 'Plant Biology Lab', subject: 'biology',
    description: 'Plant anatomy: root, stem, leaf cross-sections. Photosynthesis interactive with light/CO2/water sliders. Transpiration pull demo. Plant transport (xylem/phloem). Plant hormones and tropisms. Plant reproduction (flower structure, pollination).',
    nodes: 'C9: plant life, photosynthesis, respiration. C10: plant physiology, photosynthesis, transpiration, transport, reproduction. C11: plant biology, photosynthesis, plant hormones.',
    controls: 'Plant part selector, process selector (photosynthesis/transpiration/transport), light intensity slider, CO2 slider, water slider.',
    readouts: 'Photosynthesis rate, Transpiration rate, Stomatal opening, Glucose produced, O2 released',
    challenges: '1) What is the equation for photosynthesis? 2) What is the function of xylem? 3) What are plant tropisms?',
    keywords: ['plant', 'photosynthesis', 'transpiration', 'xylem', 'phloem', 'root', 'stem', 'leaf', 'stomata', 'chlorophyll', 'plant hormone', 'tropism', 'pollination', 'flower'],
  },
  {
    key: 'EvolutionSim', name: 'Evolution & Classification Lab', subject: 'biology',
    description: 'Classification hierarchy (Kingdom to Species). Five kingdom classification explorer. Evolution timeline with major events. Natural selection simulation with trait variation. Darwin theory and evidence. Speciation.',
    nodes: 'C10: classification (five kingdoms), binomial nomenclature. C12: evolution, Darwin theory, evidence, speciation, adaptive radiation, origin of life.',
    controls: 'Kingdom selector, organism explorer, timeline slider, trait variation slider, selection pressure toggle.',
    readouts: 'Classification, Scientific name, Evolutionary era, Trait frequency, Population change',
    challenges: '1) What are the five kingdoms? 2) What is natural selection? 3) What is binomial nomenclature?',
    keywords: ['evolution', 'classification', 'kingdom', 'species', 'genus', 'binomial', 'natural selection', 'darwin', 'speciation', 'adaptive radiation', 'origin of life', 'hierarchy'],
  },
  {
    key: 'EcologySim', name: 'Ecology & Environment Lab', subject: 'biology',
    description: 'Ecosystem visualizer (food chain, food web, energy pyramid). Biomes explorer (forest, grassland, desert, aquatic). Carbon/water/nitrogen cycle diagrams. Population dynamics (growth curves, carrying capacity). Biodiversity and conservation.',
    nodes: 'C10: ecosystem, food chain, food web, biogeochemical cycles, population. C12: ecology, ecosystem, productivity, population, biogeochemical cycles, biodiversity, conservation.',
    controls: 'Ecosystem type selector, food web builder, cycle selector (carbon/water/nitrogen), population growth toggle.',
    readouts: 'Trophic level, Energy transfer (%), Population size, Carrying capacity, Biodiversity index',
    challenges: '1) What is a food chain? Give an example. 2) How much energy transfers between trophic levels? 3) What is the carbon cycle?',
    keywords: ['ecology', 'ecosystem', 'food chain', 'food web', 'energy pyramid', 'trophic', 'biome', 'carbon cycle', 'water cycle', 'nitrogen cycle', 'population', 'carrying capacity', 'biodiversity', 'conservation'],
  },
  {
    key: 'DNASim', name: 'DNA & Protein Synthesis Lab', subject: 'biology',
    description: 'DNA double helix with base pair animation. Replication fork visualizer. Transcription (DNA to mRNA) step-by-step. Translation (mRNA to protein) with ribosome. Genetic code chart. Mutations (substitution, insertion, deletion).',
    nodes: 'C12: molecular biology, DNA structure, replication, transcription, translation, genetic code, mutations, gene expression.',
    controls: 'Process selector (replication/transcription/translation), DNA sequence input, mutation type selector, codon table toggle.',
    readouts: 'DNA sequence, mRNA sequence, Amino acid chain, Protein, Mutation effect',
    challenges: '1) What is the complementary strand of ATCG? 2) What is a codon? 3) What happens in a substitution mutation?',
    keywords: ['dna', 'rna', 'replication', 'transcription', 'translation', 'protein synthesis', 'codon', 'genetic code', 'mutation', 'gene expression', 'ribosome', 'double helix', 'base pair'],
  },
  {
    key: 'BiotechSim', name: 'Biotechnology Lab', subject: 'biology',
    description: 'Recombinant DNA technology visualizer (restriction enzymes, vectors, transformation). PCR animation. Gel electrophoresis with DNA bands. Cloning process. Biotechnology applications (insulin, GMO crops). Human genome project.',
    nodes: 'C12: biotechnology, recombinant DNA, restriction enzymes, cloning vectors, PCR, gel electrophoresis, DNA fingerprinting, human genome project, GM organisms.',
    controls: 'Technique selector (rDNA/PCR/electrophoresis/cloning/fingerprinting), enzyme selector, DNA input, gel run button.',
    readouts: 'DNA fragments, Vector insert, PCR product, Gel bands, DNA fingerprint',
    challenges: '1) What is recombinant DNA technology? 2) What does PCR do? 3) What is DNA fingerprinting used for?',
    keywords: ['biotechnology', 'recombinant dna', 'restriction enzyme', 'vector', 'pcr', 'gel electrophoresis', 'dna fingerprinting', 'cloning', 'gmo', 'human genome project', 'insulin', 'transformation'],
  },
  {
    key: 'HumanHealthSim', name: 'Human Health & Disease Lab', subject: 'biology',
    description: 'Disease explorer: infectious (bacterial, viral, fungal, parasitic). Immune system visualizer (innate, adaptive, antibodies). Vaccination mechanism. Lifestyle diseases (diabetes, hypertension, heart disease). Nutrition and balanced diet.',
    nodes: 'C10: health and disease, pathogens, immunity, vaccination, AIDS, STDs. C12: human health and disease, pathogens, immunity, AIDS, cancer, drug abuse, nutrition.',
    controls: 'Disease type selector, immune response toggle, vaccination animation, diet planner, nutrient slider.',
    readouts: 'Pathogen type, Immune response, Antibody level, Risk factors, Nutritional status',
    challenges: '1) What is the difference between innate and adaptive immunity? 2) How do vaccines work? 3) What causes diabetes?',
    keywords: ['health', 'disease', 'pathogen', 'bacteria', 'virus', 'fungus', 'parasite', 'immunity', 'antibody', 'vaccine', 'aids', 'cancer', 'diabetes', 'nutrition', 'balanced diet'],
  },
  {
    key: 'ReproductionSim', name: 'Reproduction Lab', subject: 'biology',
    description: 'Asexual reproduction types (binary fission, budding, regeneration, spore). Sexual reproduction in plants (flower structure, pollination, fertilization). Human reproductive system. Menstrual cycle. Pregnancy and embryonic development.',
    nodes: 'C10: reproduction (asexual, sexual), plant reproduction, human reproduction. C12: reproduction in organisms, sexual reproduction in flowering plants, human reproduction, reproductive health.',
    controls: 'Reproduction type selector, organism selector, cycle phase slider, fertilization animation.',
    readouts: 'Reproduction type, Process steps, Organ structures, Hormone levels, Developmental stage',
    challenges: '1) What is binary fission? 2) How does pollination occur? 3) What is the menstrual cycle?',
    keywords: ['reproduction', 'asexual', 'sexual', 'binary fission', 'budding', 'regeneration', 'pollination', 'fertilization', 'menstrual', 'pregnancy', 'embryo', 'reproductive health'],
  },
  {
    key: 'RespirationSim', name: 'Respiration Lab', subject: 'biology',
    description: 'Cellular respiration pathway: glycolysis, Krebs cycle, electron transport chain. ATP production calculator. Aerobic vs anaerobic comparison. Fermentation (lactic acid, alcoholic). Breathing mechanism (inhalation, exhalation, gas exchange).',
    nodes: 'C10: respiration, breathing, gas exchange. C12: cellular respiration, glycolysis, Krebs cycle, ETC, ATP, fermentation, anaerobic.',
    controls: 'Pathway selector (glycolysis/Krebs/ETC/fermentation), oxygen toggle, glucose slider, step-by-step play.',
    readouts: 'ATP produced, CO2 released, O2 consumed, NADH, FADH2, Energy yield',
    challenges: '1) How many ATP does glycolysis produce? 2) What is the difference between aerobic and anaerobic respiration? 3) What is fermentation?',
    keywords: ['respiration', 'cellular respiration', 'glycolysis', 'krebs cycle', 'electron transport', 'atp', 'aerobic', 'anaerobic', 'fermentation', 'lactic acid', 'alcoholic', 'breathing', 'gas exchange'],
  },
  {
    key: 'ExcretionSim', name: 'Excretion Lab', subject: 'biology',
    description: 'Human excretory system with kidney nephron detail. Urine formation (filtration, reabsorption, secretion). Kidney function regulator. Excretion in plants. Disorders (kidney stones, kidney failure). Dialysis visualizer.',
    nodes: 'C10: excretion, human excretory system, kidney, urine formation. C12: excretory products, human excretory system, urine formation, kidney function, regulation, disorders, dialysis.',
    controls: 'Nephron segment selector, process step selector, blood flow slider, filtration rate slider.',
    readouts: 'Filtrate composition, Reabsorption, Urine composition, GFR, Blood urea',
    challenges: '1) What is the functional unit of the kidney? 2) What are the steps of urine formation? 3) What is dialysis?',
    keywords: ['excretion', 'kidney', 'nephron', 'urine', 'filtration', 'reabsorption', 'secretion', 'glomerulus', 'dialysis', 'gfr', 'urea', 'excretory system'],
  },
  {
    key: 'NervousSystemSim', name: 'Nervous System Lab', subject: 'biology',
    description: 'Neuron structure with impulse conduction animation. Synapse and neurotransmitter visualizer. CNS and PNS explorer. Brain anatomy with functional areas. Reflex arc demo. Sense organs (eye, ear) with light/sound pathway.',
    nodes: 'C10: nervous system, neuron, brain, reflex action, sense organs (eye, ear). C12: neural control, neuron, nerve impulse, synapse, CNS, PNS, brain, sensory reception, eye, ear.',
    controls: 'System selector (CNS/PNS/sense organ), neuron impulse toggle, brain area click, reflex arc play.',
    readouts: 'Impulse speed, Neurotransmitter, Brain area function, Reflex time, Sensory pathway',
    challenges: '1) What is a synapse? 2) What is a reflex action? 3) Which part of the brain controls balance?',
    keywords: ['nervous system', 'neuron', 'synapse', 'neurotransmitter', 'impulse', 'cns', 'pns', 'brain', 'cerebrum', 'cerebellum', 'reflex', 'eye', 'ear', 'sensory', 'motor'],
  },
  {
    key: 'EndocrineSim', name: 'Endocrine System Lab', subject: 'biology',
    description: 'Endocrine glands explorer (pituitary, thyroid, pancreas, adrenal, gonads). Hormone function and target organs. Feedback regulation (positive and negative). Hormone imbalance disorders (diabetes, goiter, dwarfism). Comparison of nervous vs endocrine control.',
    nodes: 'C10: endocrine system, hormones, glands. C12: chemical coordination, endocrine glands, hormones, feedback mechanisms, disorders.',
    controls: 'Gland selector, hormone selector, feedback toggle, hormone level slider.',
    readouts: 'Hormone, Target organ, Function, Feedback type, Disorder',
    challenges: '1) Which gland is called the master gland? 2) What hormone does the pancreas produce? 3) What is negative feedback?',
    keywords: ['endocrine', 'hormone', 'pituitary', 'thyroid', 'pancreas', 'adrenal', 'gonad', 'insulin', 'thyroxine', 'feedback', 'diabetes', 'goiter', 'gland'],
  },
  {
    key: 'CirculatorySim', name: 'Circulatory System Lab', subject: 'biology',
    description: 'Heart anatomy with blood flow animation (pulmonary and systemic circulation). Blood vessels comparison (artery, vein, capillary). Blood composition (RBC, WBC, platelets, plasma). Blood typing (ABO, Rh). Cardiac cycle and ECG.',
    nodes: 'C10: circulatory system, heart, blood vessels, blood. C12: body fluids, blood, lymph, circulatory pathways, heart, cardiac cycle, ECG, blood pressure.',
    controls: 'Circulation type selector, heart chamber click, blood vessel selector, blood type selector, ECG toggle.',
    readouts: 'Blood flow path, Heart rate, Blood pressure, Blood type, Cardiac cycle phase',
    challenges: '1) Which side of heart pumps blood to lungs? 2) What are the types of blood vessels? 3) What is the universal blood donor type?',
    keywords: ['circulatory', 'heart', 'blood', 'artery', 'vein', 'capillary', 'rbc', 'wbc', 'platelet', 'plasma', 'blood type', 'abo', 'rh', 'cardiac cycle', 'ecg', 'blood pressure'],
  },
  {
    key: 'BiodiversitySim', name: 'Biodiversity & Conservation Lab', subject: 'biology',
    description: 'Biodiversity types (genetic, species, ecosystem). Species richness calculator. Hotspots of biodiversity. Threats to biodiversity (habitat loss, pollution, climate change, invasive species). Conservation strategies (in-situ, ex-situ). Wildlife sanctuaries and national parks.',
    nodes: 'C12: biodiversity, types, importance, loss of biodiversity, conservation (in-situ, ex-situ), hotspots, endangered species.',
    controls: 'Region selector, threat type selector, conservation method selector, species explorer.',
    readouts: 'Species count, Biodiversity index, Threat level, Conservation status, Endangered species',
    challenges: '1) What are the types of biodiversity? 2) What is in-situ conservation? 3) Name an endangered species.',
    keywords: ['biodiversity', 'species richness', 'hotspot', 'habitat loss', 'pollution', 'climate change', 'invasive', 'conservation', 'in-situ', 'ex-situ', 'wildlife sanctuary', 'national park', 'endangered'],
  },
  {
    key: 'MicrobiologySim', name: 'Microbiology Lab', subject: 'biology',
    description: 'Microorganism explorer (bacteria, virus, fungi, protozoa). Bacterial structure and classification. Viral replication (lytic and lysogenic). Useful microorganisms (antibiotics, fermentation, nitrogen fixation). Harmful microorganisms (disease, spoilage).',
    nodes: 'C9: microorganisms, useful and harmful. C10: microorganisms, disease, food preservation. C12: microbes in human welfare (food, medicine, sewage, energy, biocontrol).',
    controls: 'Microbe type selector, structure viewer, replication animation, use/harm toggle.',
    readouts: 'Microbe type, Structure, Replication cycle, Beneficial use, Pathogenic effect',
    challenges: '1) What is a virus? 2) How are bacteria useful? 3) What is the lytic cycle?',
    keywords: ['microbiology', 'microorganism', 'bacteria', 'virus', 'fungi', 'protozoa', 'lytic', 'lysogenic', 'antibiotic', 'fermentation', 'nitrogen fixation', 'pathogen', 'food preservation'],
  },
  {
    key: 'TissueSim', name: 'Tissue Lab', subject: 'biology',
    description: 'Animal tissues (epithelial, connective, muscular, nervous) with structure and function. Plant tissues (meristematic, permanent - parenchyma, collenchyma, sclerenchyma). Tissue comparison charts. Microscopic views.',
    nodes: 'C9: tissues, plant tissues, animal tissues. C10: tissues (epithelial, connective, muscular, nervous), plant tissues.',
    controls: 'Tissue type selector, animal/plant toggle, microscope zoom, cell structure click.',
    readouts: 'Tissue type, Structure, Function, Location, Cell characteristics',
    challenges: '1) What are the four types of animal tissues? 2) What is the function of parenchyma? 3) Where is nervous tissue found?',
    keywords: ['tissue', 'epithelial', 'connective', 'muscular', 'nervous', 'meristematic', 'parenchyma', 'collenchyma', 'sclerenchyma', 'permanent', 'plant tissue', 'animal tissue'],
  },
  {
    key: 'BioenergeticsSim', name: 'Bioenergetics Lab', subject: 'biology',
    description: 'Photosynthesis vs respiration comparison. Energy flow in biosphere. ATP as energy currency. Light and dark reactions of photosynthesis. Factors affecting photosynthesis (light, CO2, temperature, water). Compensation point.',
    nodes: 'C10: photosynthesis, factors affecting, respiration. C11: photosynthesis (light and dark reactions), factors, chemosynthesis.',
    controls: 'Process selector (photosynthesis/respiration), light intensity slider, CO2 slider, temperature slider, water slider.',
    readouts: 'Photosynthesis rate, Respiration rate, Net energy, ATP yield, Compensation point',
    challenges: '1) What are the light and dark reactions? 2) What factors affect photosynthesis? 3) What is the compensation point?',
    keywords: ['bioenergetics', 'photosynthesis', 'respiration', 'atp', 'light reaction', 'dark reaction', 'calvin cycle', 'energy flow', 'compensation point', 'chemosynthesis'],
  },

  // ─── Biotechnology (8 templates) ───────────────────────────
  {
    key: 'BiotechBasicsSim', name: 'Biotechnology Basics Lab', subject: 'biotech',
    description: 'Interactive overview of biotechnology definition, history from ancient fermentation to modern GM. Branches (red, white, green, blue biotech). GLP and GMP standards. Kitchen biotech examples (yogurt, cheese, bread).',
    nodes: 'C11-12: biotechnology definition, history, branches, GLP/GMP, kitchen biotech.',
    controls: 'Timeline slider, branch selector, kitchen biotech interactive, GLP/GMP checklist.',
    readouts: 'Era, Branch type, Application, Standard, Process step',
    challenges: '1) What is biotechnology? 2) Name the branches of biotechnology. 3) What is GMP?',
    keywords: ['biotechnology', 'history', 'fermentation', 'glp', 'gmp', 'red biotech', 'white biotech', 'green biotech', 'blue biotech', 'kitchen biotech'],
  },
  {
    key: 'BiomoleculeTechSim', name: 'Biomolecule Technology Lab', subject: 'biotech',
    description: 'Protein structure visualizer (primary to quaternary). Lipid types. Vitamin and enzyme interactive. Chromatography, centrifugation, electrophoresis technique simulations.',
    nodes: 'C11-12: proteins, lipids, vitamins, enzymes, chromatography, centrifugation, electrophoresis.',
    controls: 'Technique selector, molecule viewer, centrifuge speed slider, electrophoresis run button.',
    readouts: 'Molecular weight, Rf value, Centrifuge RPM, Band position, Protein structure level',
    challenges: '1) What are the four levels of protein structure? 2) What does chromatography separate? 3) How does electrophoresis work?',
    keywords: ['protein', 'lipid', 'vitamin', 'enzyme', 'chromatography', 'centrifugation', 'electrophoresis', 'primary', 'secondary', 'tertiary', 'quaternary'],
  },
  {
    key: 'ImmunoTechSim', name: 'Immunotechnology Lab', subject: 'biotech',
    description: 'Antigen-antibody interaction visualizer. Immunity types (innate, adaptive). ELISA simulation. HLA typing. Vaccine mechanism. Hypersensitivity types.',
    nodes: 'C11-12: antigen, antibody, immunity types, ELISA, HLA, vaccines, hypersensitivity.',
    controls: 'Immunity type selector, ELISA step-through, antigen selector, vaccine toggle.',
    readouts: 'Antibody level, ELISA result, HLA type, Immune response, Hypersensitivity type',
    challenges: '1) What is the difference between innate and adaptive immunity? 2) What does ELISA detect? 3) What is HLA typing?',
    keywords: ['immunity', 'antigen', 'antibody', 'elisa', 'hla', 'vaccine', 'hypersensitivity', 'innate', 'adaptive', 'monoclonal'],
  },
  {
    key: 'MolecularTechSim', name: 'Molecular Biology Technology Lab', subject: 'biotech',
    description: 'DNA structure with double helix. Replication fork animation. Transcription and translation step-through. Genetic code table. Operon models (lac, trp). Central dogma flowchart.',
    nodes: 'C11-12: DNA structure, replication, transcription, translation, genetic code, operons, central dogma.',
    controls: 'Process selector (replication/transcription/translation), DNA sequence input, operon toggle, step-through button.',
    readouts: 'DNA sequence, mRNA sequence, Amino acid, Operon state, Process step',
    challenges: '1) What is the central dogma? 2) What is an operon? 3) What is the genetic code?',
    keywords: ['dna', 'replication', 'transcription', 'translation', 'genetic code', 'operon', 'lac operon', 'trp operon', 'central dogma', 'gene expression'],
  },
  {
    key: 'RDNAtechSim', name: 'Recombinant DNA Technology Lab', subject: 'biotech',
    description: 'Restriction enzyme cutter with palindromic sites. Vector construction (plasmid, phage). Transformation animation. Recombinant selection with blue-white screening. Genomic and cDNA libraries. PCR cycling. DNA sequencing (Sanger).',
    nodes: 'C11-12: restriction enzymes, vectors, transformation, recombinant selection, libraries, PCR, sequencing.',
    controls: 'Enzyme selector, vector builder, PCR cycle slider, sequencing step-through, blue-white toggle.',
    readouts: 'Restriction site, Vector map, PCR product size, Sequence read, Colony color',
    challenges: '1) What do restriction enzymes do? 2) What is a plasmid vector? 3) What is blue-white screening?',
    keywords: ['restriction enzyme', 'plasmid', 'vector', 'transformation', 'recombinant', 'blue white screening', 'genomic library', 'cdna library', 'pcr', 'sanger sequencing'],
  },
  {
    key: 'GMBiotechSim', name: 'GM Biotechnology Lab', subject: 'biotech',
    description: 'GM crops interactive (Bt cotton, Golden Rice). CRISPR-Cas9 gene editing animation. Insulin production pipeline. Vaccine production. Transgenic animals. Bioremediation. Industrial enzymes.',
    nodes: 'C11-12: GM crops, CRISPR, insulin, vaccines, transgenic animals, bioremediation, industrial enzymes.',
    controls: 'GM organism selector, CRISPR guide RNA input, insulin pipeline step-through, bioremediation toggle.',
    readouts: 'Gene edited, GM trait, Insulin yield, Bioremediation rate, Enzyme activity',
    challenges: '1) What is Bt cotton? 2) How does CRISPR work? 3) How is insulin produced using biotechnology?',
    keywords: ['gm crops', 'bt cotton', 'golden rice', 'crispr', 'cas9', 'insulin', 'vaccine', 'transgenic', 'bioremediation', 'industrial enzyme'],
  },
  {
    key: 'BioreactorSim', name: 'Bioreactor & Fermentation Lab', subject: 'biotech',
    description: 'Fermentation types (solid state, submerged). Bioreactor diagram with parts (impeller, sparger, baffles). Downstream processing steps. Cell culture techniques. Plant tissue culture stages. Hybridoma technology for monoclonal antibodies.',
    nodes: 'C11-12: fermentation, bioreactors, downstream processing, cell culture, tissue culture, hybridoma.',
    controls: 'Bioreactor type selector, fermentation parameter sliders (pH, temp, DO), downstream step-through, tissue culture stage selector.',
    readouts: 'Cell density, Dissolved oxygen, pH, Product yield, Fermentation rate',
    challenges: '1) What is a bioreactor? 2) What is downstream processing? 3) What is hybridoma technology?',
    keywords: ['fermentation', 'bioreactor', 'impeller', 'sparger', 'downstream processing', 'cell culture', 'tissue culture', 'hybridoma', 'monoclonal antibody'],
  },
  {
    key: 'BioinformaticsSim', name: 'Bioinformatics Lab', subject: 'biotech',
    description: 'Database explorer (NCBI, EMBL, DDBJ). BLAST simulation. FASTA format viewer. Genomics vs proteomics. Protein engineering concepts. AI in drug design. Intellectual property rights in biotechnology.',
    nodes: 'C11-12: databases, BLAST, FASTA, genomics, proteomics, protein engineering, AI drug design, IPR.',
    controls: 'Database selector, BLAST query input, sequence viewer, drug design step-through, IPR type selector.',
    readouts: 'Sequence match, E-value, Protein score, Drug candidate, IPR type',
    challenges: '1) What is BLAST used for? 2) What is the difference between genomics and proteomics? 3) What is a patent in biotechnology?',
    keywords: ['bioinformatics', 'ncbi', 'embl', 'ddbj', 'blast', 'fasta', 'genomics', 'proteomics', 'protein engineering', 'drug design', 'ipr', 'patent'],
  },

  // ─── Applied Maths (14 templates) ──────────────────────────
  {
    key: 'LogicReasoningSim', name: 'Logic & Reasoning Lab', subject: 'appmath',
    description: 'Propositions and connectives with truth tables. Syllogism solver. Blood relations puzzle visualizer. Coding-decoding interactive. Logical equivalence checker.',
    nodes: 'C11-12: propositions, connectives, truth tables, syllogism, blood relations, coding.',
    controls: 'Connective selector, proposition input, truth table generator, syllogism evaluator, blood relation builder.',
    readouts: 'Truth value, Logical form, Validity, Relation, Coded output',
    challenges: '1) What is a tautology? 2) Is "All men are mortal, Socrates is a man" valid? 3) What is modus ponens?',
    keywords: ['logic', 'proposition', 'connective', 'truth table', 'syllogism', 'blood relation', 'coding', 'reasoning', 'tautology', 'modus ponens', 'contradiction'],
  },
  {
    key: 'SetFuncAppSim', name: 'Sets & Functions Applied Lab', subject: 'appmath',
    description: 'Set operations visualizer with Venn diagrams. Relations (reflexive, symmetric, transitive, equivalence). Function types (one-one, onto, bijective). Composition of functions.',
    nodes: 'C11-12: sets, Venn diagrams, relations, equivalence, functions, types, composition.',
    controls: 'Set operation selector, Venn diagram toggle, relation type selector, function type checker, composition builder.',
    readouts: 'Set cardinality, Operation result, Relation type, Function type, Composite function',
    challenges: '1) What is an equivalence relation? 2) When is a function bijective? 3) What is A union B if A={1,2} B={2,3}?',
    keywords: ['set', 'venn', 'union', 'intersection', 'relation', 'equivalence', 'function', 'one-one', 'onto', 'bijective', 'composition'],
  },
  {
    key: 'TrigAppSim', name: 'Trigonometry Applied Lab', subject: 'appmath',
    description: 'Trig function graphs (sin, cos, tan) with amplitude/frequency sliders. Compound angle formulas interactive. Inverse trig visualizer. Real-world applications (heights and distances).',
    nodes: 'C11-12: trig functions, identities, compound angles, inverse trig, heights and distances.',
    controls: 'Function selector, amplitude slider, phase slider, angle input, height-distance calculator.',
    readouts: 'Function value, Amplitude, Period, Angle, Height/Distance',
    challenges: '1) What is sin(30)+cos(60)? 2) What is the range of arcsin? 3) A tower casts a shadow 10m at 45 degrees. Height?',
    keywords: ['trigonometry', 'sine', 'cosine', 'tangent', 'amplitude', 'period', 'compound angle', 'inverse trig', 'height', 'distance'],
  },
  {
    key: 'ComplexAppSim', name: 'Complex Numbers Applied Lab', subject: 'appmath',
    description: 'Argand plane with draggable complex number. Operations (add, subtract, multiply, divide) visualized geometrically. Modulus and argument. Polar form. nth roots of unity on unit circle.',
    nodes: 'C11-12: complex numbers, Argand plane, operations, modulus, argument, polar form, roots.',
    controls: 'Complex number input, operation selector, Argand plane drag, polar form toggle, roots finder.',
    readouts: 'Real part, Imaginary part, Modulus, Argument, Polar form',
    challenges: '1) What is the modulus of 3+4i? 2) What is i^4? 3) Find the cube roots of unity.',
    keywords: ['complex number', 'argand plane', 'modulus', 'argument', 'polar form', 'roots of unity', 'conjugate', 'de moivre'],
  },
  {
    key: 'QuadraticAppSim', name: 'Quadratic Equations Applied Lab', subject: 'appmath',
    description: 'Quadratic graph plotter with adjustable coefficients. Root finder (discriminant analysis). Vieta formulas interactive. Inequality solver with sign chart. Word problems.',
    nodes: 'C11-12: quadratics, roots, discriminant, Vieta, inequalities, sign of expression.',
    controls: 'Coefficient sliders (a, b, c), root finder, inequality solver, graph toggle.',
    readouts: 'Discriminant, Root 1, Root 2, Vertex, Sign of expression',
    challenges: '1) What is the discriminant of x^2-5x+6? 2) When are roots real and equal? 3) Solve x^2-4<0.',
    keywords: ['quadratic', 'roots', 'discriminant', 'vieta', 'inequality', 'sign chart', 'parabola', 'vertex'],
  },
  {
    key: 'PermCombAppSim', name: 'Permutation Combination Applied Lab', subject: 'appmath',
    description: 'nPr and nCr calculator with visual arrangement. Factorial visualizer. Binomial theorem expansion step-by-step. AP/GP term and sum calculator. Special sums.',
    nodes: 'C11-12: nPr, nCr, factorial, binomial theorem, AP, GP, special sums.',
    controls: 'n and r sliders, operation selector (nPr/nCr), binomial expansion step-through, AP/GP calculator.',
    readouts: 'nPr value, nCr value, Factorial, Binomial coefficient, AP/GP sum',
    challenges: '1) What is 5P3? 2) What is C(6,2)? 3) Expand (x+1)^4 using binomial theorem.',
    keywords: ['permutation', 'combination', 'factorial', 'binomial', 'arithmetic progression', 'geometric progression', 'npr', 'ncr', 'special sum'],
  },
  {
    key: 'CoordinateAppSim', name: 'Coordinate Geometry Applied Lab', subject: 'appmath',
    description: 'Interactive coordinate plane with draggable points. Distance and section formula calculator. Line equation from two points. Circle and conic plotter. Area of triangle.',
    nodes: 'C11-12: straight lines, circles, conics, section formula, distance, area.',
    controls: 'Point dragger, shape selector (line/circle/conic), section ratio slider, area calculator.',
    readouts: 'Distance, Midpoint, Slope, Equation, Area',
    challenges: '1) Distance between (1,2) and (4,6)? 2) Midpoint of (3,5) and (7,1)? 3) Equation of line through (0,0) and (2,3)?',
    keywords: ['coordinate geometry', 'distance formula', 'section formula', 'slope', 'line equation', 'circle', 'conic', 'area', 'midpoint'],
  },
  {
    key: 'CalculusAppSim', name: 'Calculus Applied Lab', subject: 'appmath',
    description: 'Limit visualizer with approaching values. Derivative plotter with tangent line. Chain rule stepper. Maxima/minima finder. Integration with area under curve. Definite integral calculator.',
    nodes: 'C11-12: limits, derivatives, chain rule, maxima, minima, integration, definite integral, area.',
    controls: 'Function selector, point slider for tangent, limit approach slider, integration bounds slider.',
    readouts: 'Limit value, Derivative, Tangent slope, Critical point, Definite integral, Area',
    challenges: '1) What is the derivative of x^3? 2) Find the maximum of -x^2+4x. 3) Integrate 2x from 0 to 3.',
    keywords: ['limit', 'derivative', 'tangent', 'chain rule', 'maxima', 'minima', 'integration', 'definite integral', 'area under curve'],
  },
  {
    key: 'DiffEqAppSim', name: 'Differential Equations Applied Lab', subject: 'appmath',
    description: 'Differential equation former from word problems. Solution method visualizer (variable separable, homogeneous, linear, exact). General and particular solutions. Slope field plotter.',
    nodes: 'C11-12: differential equations, formation, solution methods, linear, homogeneous, exact.',
    controls: 'DE type selector, solution method stepper, initial condition input, slope field toggle.',
    readouts: 'Order, Degree, General solution, Particular solution, Slope field',
    challenges: '1) What is the order of d2y/dx2+dy/dx=0? 2) Solve dy/dx=x. 3) What is a homogeneous DE?',
    keywords: ['differential equation', 'order', 'degree', 'separable', 'homogeneous', 'linear', 'exact', 'slope field', 'particular solution'],
  },
  {
    key: 'MatrixAppSim', name: 'Matrix Applied Lab', subject: 'appmath',
    description: 'Matrix operations visualizer (add, multiply, transpose). Determinant calculator with step-by-step. Inverse matrix finder. System of equations solver (Cramer rule, matrix method).',
    nodes: 'C11-12: matrices, determinants, inverse, Cramer rule, solving systems.',
    controls: 'Matrix size selector, operation selector, element input, determinant stepper, Cramer solver.',
    readouts: 'Determinant, Inverse, Solution vector, Rank, Cramer ratio',
    challenges: '1) What is the determinant of [[1,2],[3,4]]? 2) When does a matrix have no inverse? 3) Solve x+y=3, x-y=1 using matrices.',
    keywords: ['matrix', 'determinant', 'inverse', 'transpose', 'cramer rule', 'system of equations', 'rank', 'singular'],
  },
  {
    key: 'StatsAppSim', name: 'Statistics Applied Lab', subject: 'appmath',
    description: 'Data set explorer with mean, median, mode. Dispersion measures (range, variance, SD). Skewness and kurtosis visualizer. Correlation coefficient calculator. Regression line plotter.',
    nodes: 'C11-12: dispersion, skewness, kurtosis, correlation, regression.',
    controls: 'Data input, measure selector, distribution type, correlation calculator, regression plotter.',
    readouts: 'Mean, Median, SD, Skewness, Correlation coefficient, Regression equation',
    challenges: '1) What is the SD of {2,4,6}? 2) What does a correlation of 0.9 mean? 3) What is positive skewness?',
    keywords: ['statistics', 'mean', 'median', 'mode', 'standard deviation', 'variance', 'skewness', 'kurtosis', 'correlation', 'regression'],
  },
  {
    key: 'ProbAppSim', name: 'Probability Applied Lab', subject: 'appmath',
    description: 'Probability interactive with dice and cards. Conditional probability tree. Bayes theorem visualizer. Random variable generator. Distributions (binomial, Poisson, normal) plotter.',
    nodes: 'C11-12: probability, conditional, Bayes, random variables, binomial, Poisson, normal.',
    controls: 'Distribution selector, n and p sliders, probability calculator, Bayes tree, dice/card simulator.',
    readouts: 'Probability, Expected value, Variance, Distribution type, Bayes posterior',
    challenges: '1) P(heads) in 3 coin tosses? 2) What is Bayes theorem? 3) When is Poisson distribution used?',
    keywords: ['probability', 'conditional', 'bayes', 'random variable', 'binomial', 'poisson', 'normal distribution', 'expected value', 'variance'],
  },
  {
    key: 'LPPAppSim', name: 'Linear Programming Applied Lab', subject: 'appmath',
    description: 'LPP formulation from word problems. Graphical solution with feasible region shading. Corner point evaluator. Objective function optimizer (maximize/minimize). Constraint slider.',
    nodes: 'C11-12: linear programming, formulation, graphical solution, feasible region.',
    controls: 'Constraint input, objective function selector, feasible region toggle, corner point finder.',
    readouts: 'Optimal value, Corner points, Feasible region, Objective value, Constraint status',
    challenges: '1) What is a feasible region? 2) Maximize z=3x+2y subject to x+y<=4. 3) What is the corner point method?',
    keywords: ['linear programming', 'lpp', 'feasible region', 'objective function', 'constraint', 'corner point', 'optimize', 'maximize', 'minimize'],
  },
  {
    key: 'FinancialAppSim', name: 'Financial Mathematics Applied Lab', subject: 'appmath',
    description: 'Simple and compound interest calculator. Annuity visualizer. GST calculator. EMI calculator with amortization. Sinking fund. Consumer and producer surplus graph. Perpetuity.',
    nodes: 'C11-12: interest, annuities, GST, EMI, perpetuity, sinking funds, surplus.',
    controls: 'Principal slider, rate slider, time slider, calculation type selector, amortization toggle.',
    readouts: 'Interest, Amount, EMI, GST, Annuity value, Surplus',
    challenges: '1) CI on Rs 1000 at 10% for 2 years? 2) What is an annuity? 3) What is GST at 18% on Rs 500?',
    keywords: ['simple interest', 'compound interest', 'annuity', 'gst', 'emi', 'amortization', 'sinking fund', 'perpetuity', 'consumer surplus', 'producer surplus'],
  },

  // ─── EVS (7 templates) ─────────────────────────────────────
  {
    key: 'EcosystemSim', name: 'Ecosystem Lab', subject: 'evs',
    description: 'Ecosystem structure with trophic levels. Food chain and food web builder. Energy flow pyramid with 10% rule. Nutrient cycles (carbon, nitrogen, water). Biome explorer (forest, grassland, desert, aquatic).',
    nodes: 'C9-12: ecosystem structure, trophic relationships, energy flow, nutrient cycles, biomes.',
    controls: 'Ecosystem type selector, food web builder, cycle selector, energy flow toggle, biome explorer.',
    readouts: 'Trophic level, Energy transfer %, Species count, Cycle stage, Biome type',
    challenges: '1) What is a food chain? 2) How much energy transfers between trophic levels? 3) What is the carbon cycle?',
    keywords: ['ecosystem', 'food chain', 'food web', 'trophic level', 'energy pyramid', 'nutrient cycle', 'carbon cycle', 'nitrogen cycle', 'biome', 'energy flow'],
  },
  {
    key: 'PollutionSim', name: 'Pollution Lab', subject: 'evs',
    description: 'Air pollution simulator with sources and effects. Water pollution with contaminant tracker. Soil pollution visualizer. Noise pollution meter. Pollution control measures interactive. Health impact explorer.',
    nodes: 'C9-12: air/water/soil/noise pollution, monitoring, control, health impacts.',
    controls: 'Pollution type selector, source toggle, control measure selector, health impact viewer.',
    readouts: 'Pollutant level, AQI, Water quality, Noise dB, Health risk',
    challenges: '1) What is the main cause of air pollution in cities? 2) What is eutrophication? 3) What is the safe noise level?',
    keywords: ['pollution', 'air pollution', 'water pollution', 'soil pollution', 'noise pollution', 'aqi', 'eutrophication', 'contaminant', 'health impact', 'control measure'],
  },
  {
    key: 'EnvBiodiversitySim', name: 'Environmental Biodiversity Lab', subject: 'evs',
    description: 'Biodiversity types (genetic, species, ecosystem). Species richness calculator. Biodiversity hotspots map. Threats to biodiversity (habitat loss, pollution, climate change, invasive species). Conservation strategies (in-situ, ex-situ). Protected areas.',
    nodes: 'C9-12: biodiversity types, patterns, conservation, hotspots, loss, protected areas.',
    controls: 'Region selector, threat type selector, conservation method selector, species explorer.',
    readouts: 'Species count, Biodiversity index, Threat level, Conservation status, Endangered species',
    challenges: '1) What are the types of biodiversity? 2) What is in-situ conservation? 3) Name a biodiversity hotspot.',
    keywords: ['biodiversity', 'species richness', 'hotspot', 'habitat loss', 'conservation', 'in-situ', 'ex-situ', 'endangered', 'protected area', 'genetic diversity'],
  },
  {
    key: 'ClimateChangeSim', name: 'Climate Change Lab', subject: 'evs',
    description: 'Greenhouse effect simulator with gas concentration sliders. Global temperature anomaly graph. Sea level rise visualizer. Renewable energy explorer (solar, wind, hydro, biomass). Mitigation strategies. Adaptation measures.',
    nodes: 'C9-12: climate change, adaptation, mitigation, renewable energy, greenhouse.',
    controls: 'GHG concentration slider, temperature timeline, energy source selector, mitigation strategy toggle.',
    readouts: 'Temperature anomaly, CO2 level, Sea level, Energy output, Mitigation impact',
    challenges: '1) What is the greenhouse effect? 2) Name three renewable energy sources. 3) What is the Paris Agreement?',
    keywords: ['climate change', 'greenhouse effect', 'global warming', 'sea level', 'renewable energy', 'solar', 'wind', 'hydro', 'mitigation', 'adaptation', 'paris agreement'],
  },
  {
    key: 'PopulationSim', name: 'Population Dynamics Lab', subject: 'evs',
    description: 'Population growth models (exponential, logistic). Carrying capacity visualizer. Demographic transition stages. Human population growth graph. Age-sex pyramid builder. Population density map.',
    nodes: 'C9-12: population dynamics, growth models, human population, demographic transition.',
    controls: 'Growth model selector, carrying capacity slider, demographic stage selector, pyramid builder.',
    readouts: 'Population size, Growth rate, Carrying capacity, Doubling time, Demographic stage',
    challenges: '1) What is carrying capacity? 2) What is exponential growth? 3) What is demographic transition?',
    keywords: ['population', 'growth model', 'exponential', 'logistic', 'carrying capacity', 'demographic transition', 'age pyramid', 'population density', 'doubling time'],
  },
  {
    key: 'SustainableDevSim', name: 'Sustainable Development Lab', subject: 'evs',
    description: 'Sustainable development goals (SDGs) explorer. Green skills interactive. Traditional ecological knowledge. Eco-club activities. Sustainable practices (recycling, composting, rainwater harvesting). Carbon footprint calculator.',
    nodes: 'C9-12: sustainable development, SDGs, green skills, traditional knowledge, eco-clubs.',
    controls: 'SDG selector, practice selector, carbon footprint calculator, eco-activity toggle.',
    readouts: 'SDG goal, Carbon footprint, Sustainability score, Practice impact, Green skill',
    challenges: '1) What is sustainable development? 2) How many SDGs are there? 3) What is rainwater harvesting?',
    keywords: ['sustainable development', 'sdg', 'green skill', 'traditional knowledge', 'eco club', 'recycling', 'composting', 'rainwater harvesting', 'carbon footprint'],
  },
  {
    key: 'EnvPolicySim', name: 'Environmental Policy Lab', subject: 'evs',
    description: 'Environmental legislation explorer (Wildlife Protection Act, Air Act, Water Act, EPA). Regulatory bodies (CPCB, SPCB, NGT). International regimes (Kyoto, Paris, CBD). RTI in environmental matters. Environmental impact assessment.',
    nodes: 'C9-12: legislation, regulatory bodies, international regimes, environmental law, RTI.',
    controls: 'Legislation selector, regulatory body explorer, international agreement selector, EIA step-through.',
    readouts: 'Act name, Regulatory body, Agreement, EIA stage, RTI status',
    challenges: '1) What is the Wildlife Protection Act? 2) What does CPCB do? 3) What is the Kyoto Protocol?',
    keywords: ['environmental law', 'wildlife protection act', 'air act', 'water act', 'epa', 'cpcb', 'ngt', 'kyoto', 'paris agreement', 'cbd', 'eia', 'rti'],
  },

  // ─── Geography (6 templates) ───────────────────────────────
  {
    key: 'TopoMapSim', name: 'Topographical Map Lab', subject: 'geo',
    description: 'Topographical map reader with grid references (eastings, northings). Contour line interpreter with elevation profiles. Scale and distance calculator. Map symbol explorer. Relief features identification.',
    nodes: 'C9-12: topographical maps, grid references, contour interpretation.',
    controls: 'Map zoom, grid toggle, contour selector, symbol explorer, distance measurer.',
    readouts: 'Grid reference, Elevation, Distance, Scale, Feature type',
    challenges: '1) What is a contour line? 2) What is a grid reference? 3) What does close contour spacing indicate?',
    keywords: ['topographical map', 'contour', 'grid reference', 'easting', 'northing', 'scale', 'relief', 'map symbol', 'elevation'],
  },
  {
    key: 'LandformSim', name: 'Landform Lab', subject: 'geo',
    description: 'Fluvial landforms (V-shaped valley, meander, oxbow lake, delta). Glacial landforms (moraine, cirque, U-valley). Coastal landforms (cliff, stack, beach). Arid landforms (dune, mesa, wadi). Rock cycle interactive.',
    nodes: 'C9-12: fluvial, glacial, coastal, arid landforms, rock cycle, mountains/plateaus/plains.',
    controls: 'Landform type selector, agent selector (water/ice/wind), rock cycle stepper, cross-section viewer.',
    readouts: 'Landform name, Forming agent, Rock type, Elevation, Geological process',
    challenges: '1) How is an oxbow lake formed? 2) What is a moraine? 3) What are the three rock types?',
    keywords: ['landform', 'fluvial', 'glacial', 'coastal', 'arid', 'meander', 'oxbow', 'moraine', 'dune', 'rock cycle', 'igneous', 'sedimentary', 'metamorphic'],
  },
  {
    key: 'ClimateSim', name: 'Climate & Vegetation Lab', subject: 'geo',
    description: 'Climate zones explorer (tropical, temperate, polar, arid). Weather vs climate comparison. Vegetation types (forest, grassland, desert, tundra). Monsoon interactive. Climate graph generator with temperature and rainfall.',
    nodes: 'C9-12: climate, weather, vegetation, biomes.',
    controls: 'Climate zone selector, vegetation toggle, monsoon animation, climate graph generator.',
    readouts: 'Temperature, Rainfall, Climate zone, Vegetation type, Monsoon stage',
    challenges: '1) What is the difference between weather and climate? 2) What is a monsoon? 3) What vegetation is found in a tundra?',
    keywords: ['climate', 'weather', 'vegetation', 'biome', 'monsoon', 'tropical', 'temperate', 'polar', 'arid', 'tundra', 'climate graph'],
  },
  {
    key: 'ResourceSim', name: 'Natural Resources Lab', subject: 'geo',
    description: 'Energy resources explorer (coal, petroleum, natural gas, nuclear). Mineral resources map of India. Agricultural resources by region. Non-conventional energy (solar, wind, tidal, geothermal, biogas). Resource conservation interactive.',
    nodes: 'C9-12: energy resources, minerals, agriculture, non-conventional energy.',
    controls: 'Resource type selector, region selector, energy source comparison, conservation toggle.',
    readouts: 'Resource type, Region, Energy output, Reserves, Conservation method',
    challenges: '1) What are conventional energy sources? 2) Name a non-conventional energy source. 3) Where is coal found in India?',
    keywords: ['natural resource', 'coal', 'petroleum', 'natural gas', 'nuclear', 'solar', 'wind', 'tidal', 'geothermal', 'biogas', 'mineral', 'conservation'],
  },
  {
    key: 'GeoEconSim', name: 'Economic Geography Lab', subject: 'geo',
    description: 'Transport networks (road, rail, water, air, pipeline). Trade route visualizer. Industrial location factors. Population distribution map. Urbanization interactive. Agricultural vs industrial regions.',
    nodes: 'C9-12: economic geography, transport, trade, industries, population distribution.',
    controls: 'Transport type selector, trade route toggle, industry location factor selector, population map.',
    readouts: 'Transport mode, Trade volume, Industry type, Population density, Urbanization rate',
    challenges: '1) What are the modes of transport? 2) What factors affect industrial location? 3) What is urbanization?',
    keywords: ['economic geography', 'transport', 'rail', 'road', 'trade', 'industry', 'population distribution', 'urbanization', 'pipeline'],
  },
  {
    key: 'RegionalGeoSim', name: 'Regional Geography Lab', subject: 'geo',
    description: 'Indian geography explorer (physical divisions, rivers, climate regions). World geography (continents, major countries, oceans). Regional comparison tool. Map of Indian states and capitals.',
    nodes: 'C9-12: regional geography, Indian geography, world geography.',
    controls: 'Region selector (India/World), physical division toggle, river explorer, state capital quiz.',
    readouts: 'Region, Physical division, River, Capital, Continent',
    challenges: '1) What are the physical divisions of India? 2) Name the major rivers of India. 3) What is the capital of Karnataka?',
    keywords: ['regional geography', 'indian geography', 'physical division', 'river', 'continent', 'ocean', 'state capital', 'world geography'],
  },

  // ─── History & Civics (10 templates) ───────────────────────
  {
    key: 'AncientIndiaSim', name: 'Ancient India Lab', subject: 'histciv',
    description: 'Harappan civilization explorer with city map (Mohenjo-daro, Harappa). Vedic age interactive (early and later Vedic society). Jainism and Buddhism teachings comparison. Mauryan Empire (Ashoka, edicts). Sangam Age. Gupta Empire (golden age). Chola dynasty (administration, temples).',
    nodes: 'C9-12: Harappan, Vedic, Jainism, Buddhism, Mauryan, Sangam, Gupta, Cholas.',
    controls: 'Civilization selector, timeline slider, empire map, teachings comparison, monument explorer.',
    readouts: 'Era, Empire, Ruler, Key event, Cultural achievement',
    challenges: '1) Who founded Buddhism? 2) What is the significance of Ashoka edicts? 3) What was the Gupta Golden Age known for?',
    keywords: ['ancient india', 'harappan', 'mohenjo-daro', 'vedic', 'jainism', 'buddhism', 'mauryan', 'ashoka', 'sangam', 'gupta', 'chola'],
  },
  {
    key: 'MedievalIndiaSim', name: 'Medieval India Lab', subject: 'histciv',
    description: 'Delhi Sultanate timeline (Slave, Khilji, Tughlaq, Sayyid, Lodi). Mughal Empire explorer (Babur to Aurangzeb). Bhakti and Sufi movements comparison. Architecture explorer (Qutub Minar, Taj Mahal, Red Fort). Battle visualizer (Panipat, Plassey).',
    nodes: 'C9-12: Delhi Sultanate, Mughal Empire, Bhakti/Sufi movements.',
    controls: 'Dynasty selector, emperor timeline, movement comparison, architecture explorer, battle map.',
    readouts: 'Dynasty, Emperor, Reign period, Battle, Monument',
    challenges: '1) Who founded the Mughal Empire? 2) What was the Bhakti movement? 3) Who won the First Battle of Panipat?',
    keywords: ['medieval india', 'delhi sultanate', 'mughal', 'babur', 'akbar', 'aurangzeb', 'bhakti', 'sufi', 'qutub minar', 'taj mahal', 'panipat'],
  },
  {
    key: 'ModernWorldSim', name: 'Modern World History Lab', subject: 'histciv',
    description: 'Renaissance explorer with art and science. Reformation interactive (Luther, Calvin). Industrial Revolution timeline with inventions. Rise of Socialism (Marx, Engels). Colonialism and imperialism map. American and French Revolutions.',
    nodes: 'C9-12: Renaissance, Reformation, Industrial Revolution, Rise of Socialism.',
    controls: 'Event selector, timeline slider, revolution interactive, invention explorer, ideology comparison.',
    readouts: 'Era, Event, Key figure, Invention, Ideology',
    challenges: '1) What was the Renaissance? 2) Who started the Reformation? 3) What caused the Industrial Revolution?',
    keywords: ['renaissance', 'reformation', 'industrial revolution', 'socialism', 'marx', 'colonialism', 'imperialism', 'american revolution', 'french revolution', 'luther'],
  },
  {
    key: 'FreedomStruggleSim', name: 'Freedom Struggle Lab', subject: 'histciv',
    description: 'Indian independence movement timeline (1857 revolt to 1947). Key events: Sepoy Mutiny, Non-Cooperation, Civil Disobedience, Quit India. Leaders explorer (Gandhi, Nehru, Patel, Bose, Tilak). Partition of India interactive.',
    nodes: 'C9-12: Indian independence movement, partition.',
    controls: 'Event timeline, leader selector, movement explorer, partition map, boycott interactive.',
    readouts: 'Event, Year, Leader, Movement, Outcome',
    challenges: '1) When did the Sepoy Mutiny occur? 2) What was the Quit India Movement? 3) Who led the Non-Cooperation Movement?',
    keywords: ['freedom struggle', 'independence', '1857', 'sepoy mutiny', 'gandhi', 'nehru', 'bose', 'non-cooperation', 'civil disobedience', 'quit india', 'partition'],
  },
  {
    key: 'WorldWarsSim', name: 'World Wars Lab', subject: 'histciv',
    description: 'WWI causes (MAIN - militarism, alliances, imperialism, nationalism), course, and consequences. WWII causes (Treaty of Versailles, fascism, appeasement), key battles, Holocaust, and aftermath. League of Nations vs UN. Fascism and Nazism comparison.',
    nodes: 'C9-12: WWI, WWII, causes, course, consequences, fascism.',
    controls: 'War selector, cause explorer, battle map, alliance visualizer, aftermath comparison.',
    readouts: 'War, Cause, Battle, Alliance, Consequence',
    challenges: '1) What caused WWI? 2) What was the Treaty of Versailles? 3) What was the Holocaust?',
    keywords: ['world war 1', 'world war 2', 'wwi', 'wwii', 'militarism', 'alliance', 'fascism', 'nazism', 'holocaust', 'treaty of versailles', 'united nations'],
  },
  {
    key: 'ColdWarSim', name: 'Cold War & Decolonization Lab', subject: 'histciv',
    description: 'Cold War timeline (1947-1991) with key events (Berlin Wall, Cuban Missile Crisis, Vietnam). Decolonization map of Asia and Africa. Non-Aligned Movement. Civil rights movement (MLK). Anti-apartheid (Mandela). Middle East conflicts.',
    nodes: 'C9-12: Cold War, de-colonization, NAM, civil rights, anti-apartheid, Middle East.',
    controls: 'Event timeline, bloc selector (US/USSR), decolonization map, NAM member explorer, movement selector.',
    readouts: 'Event, Year, Bloc, Country, Movement outcome',
    challenges: '1) What was the Cold War? 2) What is NAM? 3) Who led the anti-apartheid movement?',
    keywords: ['cold war', 'berlin wall', 'cuban missile crisis', 'decolonization', 'non-aligned movement', 'nam', 'civil rights', 'apartheid', 'mandela', 'vietnam'],
  },
  {
    key: 'IndianGovtSim', name: 'Indian Government Lab', subject: 'histciv',
    description: 'Constitution of India explorer with preamble and features. Fundamental rights interactive (6 rights). Directive principles. Federalism visualizer (center-state relations). Welfare state concept. Constitutional amendments timeline.',
    nodes: 'C9-12: Constitution, fundamental rights, duties, directive principles, federalism, welfare state.',
    controls: 'Constitution section selector, rights explorer, federalism diagram, amendment timeline, preamble interactive.',
    readouts: 'Article, Right, Principle, Amendment, Government level',
    challenges: '1) What are the fundamental rights? 2) What is federalism? 3) What is the preamble?',
    keywords: ['constitution', 'preamble', 'fundamental rights', 'directive principles', 'federalism', 'welfare state', 'amendment', 'center state relations'],
  },
  {
    key: 'ElectionsSim', name: 'Elections & Democracy Lab', subject: 'histciv',
    description: 'Election Commission of India interactive. Types of elections (Lok Sabha, Rajya Sabha, State Assembly, Local). Electoral process step-through (nomination, campaigning, voting, counting). Universal adult franchise. First Past the Post vs proportional representation.',
    nodes: 'C9-12: election commission, types of elections, electoral democracy.',
    controls: 'Election type selector, process step-through, voting simulator, electoral system comparison.',
    readouts: 'Election type, Process step, Voter count, Seat count, System type',
    challenges: '1) What is the Election Commission? 2) What is universal adult franchise? 3) What is FPTP?',
    keywords: ['election', 'election commission', 'lok sabha', 'rajya sabha', 'universal adult franchise', 'first past the post', 'proportional representation', 'voting', 'democracy'],
  },
  {
    key: 'LegislatureSim', name: 'Legislature Lab', subject: 'histciv',
    description: 'Parliament of India explorer (Lok Sabha, Rajya Sabha, President). State legislatures (Vidhan Sabha, Vidhan Parishad). Bicameral vs unicameral comparison. Law-making process step-through (bill to act). Powers and functions of Parliament.',
    nodes: 'C9-12: parliament, state legislatures, bicameral/unicameral, powers and functions.',
    controls: 'House selector, law-making step-through, state legislature explorer, bill type selector.',
    readouts: 'House, Bill type, Process stage, Member count, Power',
    challenges: '1) What is the difference between Lok Sabha and Rajya Sabha? 2) How is a bill passed? 3) What is a bicameral legislature?',
    keywords: ['parliament', 'lok sabha', 'rajya sabha', 'vidhan sabha', 'vidhan parishad', 'bicameral', 'unicameral', 'bill', 'act', 'law making'],
  },
  {
    key: 'PostIndepSim', name: 'Post-Independence India Lab', subject: 'histciv',
    description: 'JP Movement (1974-75). Emergency (1975-77) causes and consequences. Punjab crisis (1980s). Indo-Pak wars (1947, 1965, 1971, Kargil). Women movements. Economic reforms (1991 LPG). Technology revolution.',
    nodes: 'C9-12: JP movement, Emergency, Punjab crisis, wars, women movements.',
    controls: 'Event timeline, event selector, war map, movement explorer, reform interactive.',
    readouts: 'Event, Year, Prime Minister, Outcome, Impact',
    challenges: '1) What was the Emergency of 1975? 2) When was the Kargil War? 3) What were the 1991 economic reforms?',
    keywords: ['post independence', 'jp movement', 'emergency', 'punjab crisis', 'kargil', 'indo-pak war', 'women movement', 'economic reforms', 'lpg', 'technology revolution'],
  },

  // ─── Economics (6 templates) ───────────────────────────────
  {
    key: 'EconBasicsSim', name: 'Economics Basics Lab', subject: 'econ',
    description: 'Four definitions of economics (Smith, Marshall, Robbins, Samuelson). Micro vs macro economics. Economic vs non-economic activities. Basic terms (wants, goods, services, wealth, utility, production, consumption). Types of economies (capitalist, socialist, mixed). India as mixed economy.',
    nodes: 'C9-12: definitions, basic concepts, types of economies, growth vs development.',
    controls: 'Definition selector, activity classifier, economy type comparison, term explorer.',
    readouts: 'Definition, Activity type, Economy type, Concept, Indian example',
    challenges: '1) Who defined economics as the science of scarcity? 2) What is a mixed economy? 3) What is the difference between micro and macro economics?',
    keywords: ['economics', 'adam smith', 'marshall', 'robbins', 'samuelson', 'micro', 'macro', 'scarcity', 'capitalist', 'socialist', 'mixed economy', 'wants', 'goods', 'utility'],
  },
  {
    key: 'DemandSupplySim', name: 'Demand & Supply Lab', subject: 'econ',
    description: 'Demand curve plotter with price-quantity sliders. Supply curve plotter. Market equilibrium finder. Elasticity calculator (price, income, cross). Consumer equilibrium with indifference curves. Shift vs movement along curve interactive.',
    nodes: 'C9-12: demand, supply, equilibrium, elasticity, consumer equilibrium, indifference curves.',
    controls: 'Demand/supply slider, equilibrium finder, elasticity calculator, curve shifter, indifference curve toggle.',
    readouts: 'Equilibrium price, Equilibrium quantity, Elasticity, Consumer surplus, Producer surplus',
    challenges: '1) What is the law of demand? 2) What is price elasticity of demand? 3) What happens when supply shifts right?',
    keywords: ['demand', 'supply', 'equilibrium', 'elasticity', 'price elasticity', 'income elasticity', 'indifference curve', 'consumer equilibrium', 'demand curve', 'supply curve'],
  },
  {
    key: 'ProductionSim', name: 'Production & Cost Lab', subject: 'econ',
    description: 'Factors of production explorer (land, labour, capital, entrepreneur). Production function interactive. Cost curves (fixed, variable, marginal, average). Revenue curves. Law of diminishing returns. Returns to scale.',
    nodes: 'C9-12: production, cost, revenue, factors of production, land, labour, entrepreneurship.',
    controls: 'Factor selector, production function slider, cost curve plotter, input quantity slider.',
    readouts: 'Output, Fixed cost, Variable cost, Marginal cost, Average cost, Revenue',
    challenges: '1) What are the four factors of production? 2) What is the law of diminishing returns? 3) What is marginal cost?',
    keywords: ['production', 'factors of production', 'land', 'labour', 'capital', 'entrepreneur', 'cost curve', 'marginal cost', 'diminishing returns', 'revenue', 'production function'],
  },
  {
    key: 'MacroEconSim', name: 'Macroeconomics Lab', subject: 'econ',
    description: 'GDP and national income calculator. Circular flow of income model. Money and banking explorer (RBI, commercial banks, monetary policy). Inflation tracker (CPI, WPI). Fiscal policy interactive (tax, spending). Monetary policy tools (repo, CRR, SLR).',
    nodes: 'C9-12: GDP, national income, circular flow, money, banking, inflation, fiscal/monetary policy.',
    controls: 'GDP calculator, circular flow toggle, bank explorer, inflation slider, policy tool selector.',
    readouts: 'GDP, National income, Inflation rate, Repo rate, Money supply',
    challenges: '1) What is GDP? 2) What is the difference between fiscal and monetary policy? 3) What is the role of RBI?',
    keywords: ['macroeconomics', 'gdp', 'national income', 'circular flow', 'money', 'banking', 'rbi', 'inflation', 'cpi', 'wpi', 'fiscal policy', 'monetary policy', 'repo rate', 'crr'],
  },
  {
    key: 'IntlEconSim', name: 'International Economics Lab', subject: 'econ',
    description: 'Balance of payments explorer (current, capital, financial accounts). Foreign exchange rate interactive (appreciation, depreciation). International trade visualizer (exports, imports). Trade agreements. WTO and India. FDI and FII.',
    nodes: 'C9-12: balance of payment, foreign exchange, international trade.',
    controls: 'BoP account selector, exchange rate slider, trade flow visualizer, FDI/FII toggle.',
    readouts: 'BoP balance, Exchange rate, Export value, Import value, FDI amount',
    challenges: '1) What is balance of payments? 2) What happens when rupee depreciates? 3) What is FDI?',
    keywords: ['international economics', 'balance of payment', 'foreign exchange', 'exchange rate', 'appreciation', 'depreciation', 'export', 'import', 'wto', 'fdi', 'fii'],
  },
  {
    key: 'IndianEconSim', name: 'Indian Economy Lab', subject: 'econ',
    description: 'Indian economy sectors (primary, secondary, tertiary). Agriculture in India (Green Revolution, problems). Industry (public vs private sector). Services sector (IT, banking). Planning (Five Year Plans). Liberalization (1991 LPG). Poverty and unemployment schemes.',
    nodes: 'C9-12: Indian economy, agriculture, industry, services, planning, liberalization, poverty.',
    controls: 'Sector selector, timeline of plans, LPG interactive, scheme explorer, poverty line calculator.',
    readouts: 'Sector contribution, GDP share, Plan period, Scheme name, Poverty line',
    challenges: '1) What was the Green Revolution? 2) What are the three sectors of the Indian economy? 3) What is MGNREGA?',
    keywords: ['indian economy', 'agriculture', 'green revolution', 'industry', 'services', 'five year plan', 'liberalization', 'privatization', 'globalization', 'poverty', 'mgnrega', 'fci'],
  },

  // ─── Economics Applied (2 templates) ───────────────────────
  {
    key: 'DemandAppSim', name: 'Demand Applications Lab', subject: 'econapp',
    description: 'Demand types interactive (individual, market, joint, composite, direct, derived). Determinants of demand with shift visualizer. Price elasticity, income elasticity, cross elasticity calculators. Supply and capital formation interactive.',
    nodes: 'C9-10: demand types, determinants, elasticity, supply, capital formation.',
    controls: 'Demand type selector, determinant shifter, elasticity calculator, supply curve plotter.',
    readouts: 'Demand type, Elasticity value, Shift direction, Supply quantity, Capital formation',
    challenges: '1) What is derived demand? 2) What is income elasticity? 3) What is capital formation?',
    keywords: ['demand', 'individual demand', 'market demand', 'joint demand', 'composite demand', 'derived demand', 'elasticity', 'determinant', 'supply', 'capital formation'],
  },
  {
    key: 'EconProblemsSim', name: 'Economic Problems Lab', subject: 'econapp',
    description: 'Three central problems of economy (what, how, for whom to produce). Inflation effects interactive (on different groups). Consumer protection interactive (rights, COPRA). Monetary vs fiscal policy comparison. Government budget explorer.',
    nodes: 'C9-10: three problems of economy, inflation effects, consumer protection, monetary/fiscal policy.',
    controls: 'Problem selector, inflation impact slider, consumer rights explorer, policy comparison tool.',
    readouts: 'Problem type, Inflation rate, Consumer right, Policy tool, Budget allocation',
    challenges: '1) What are the three central problems of an economy? 2) How does inflation affect fixed-income earners? 3) What is COPRA?',
    keywords: ['central problems', 'what to produce', 'how to produce', 'for whom to produce', 'inflation', 'consumer protection', 'copra', 'monetary policy', 'fiscal policy', 'budget'],
  },

  // ─── Legal Studies (5 templates) ───────────────────────────
  {
    key: 'LegalHistorySim', name: 'Legal History Lab', subject: 'legal',
    description: 'Ancient Indian legal system (Dharma, Nyaya, village courts). Medieval Islamic law (Qazi, Sharia). British legal system (common law, courts, codification). Constitution framing (Constituent Assembly, Drafting Committee, Dr. Ambedkar).',
    nodes: 'C11-12: ancient/medieval/British legal systems, constitution framing.',
    controls: 'Era selector, legal system comparison, constitution timeline, assembly member explorer.',
    readouts: 'Era, Legal system, Court type, Key figure, Legal document',
    challenges: '1) Who chaired the Drafting Committee? 2) What is common law? 3) What was the Constituent Assembly?',
    keywords: ['legal history', 'ancient indian law', 'dharma', 'sharia', 'qazi', 'british legal system', 'common law', 'constituent assembly', 'drafting committee', 'ambedkar'],
  },
  {
    key: 'ConstitutionalLawSim', name: 'Constitutional Law Lab', subject: 'legal',
    description: 'Constitution features interactive (sovereign, socialist, secular, democratic, republic). Fundamental rights explorer (Article 12-35). Directive Principles (Article 36-51). Judicial review. Article 21 (right to life and liberty). Basic structure doctrine.',
    nodes: 'C11-12: constitution, fundamental rights, directive principles, judicial review, Article 21.',
    controls: 'Article selector, rights explorer, DPSP toggle, judicial review case study, amendment timeline.',
    readouts: 'Article, Right, DPSP, Case name, Judgment',
    challenges: '1) What is Article 21? 2) What is judicial review? 3) What is the basic structure doctrine?',
    keywords: ['constitutional law', 'fundamental rights', 'directive principles', 'judicial review', 'article 21', 'basic structure', 'preamble', 'amendment', 'sovereign', 'secular'],
  },
  {
    key: 'CriminalLawSim', name: 'Criminal Law Lab', subject: 'legal',
    description: 'IPC offences explorer (theft, robbery, murder, defamation). Elements of crime (actus reus, mens rea). Juvenile justice system. Punishment theories (retributive, deterrent, preventive, reformative). Criminal procedure (FIR, investigation, trial).',
    nodes: 'C11-12: criminal law, IPC offences, juvenile justice, elements of crime, punishment theories.',
    controls: 'Offence selector, crime element analyzer, punishment theory comparison, trial step-through.',
    readouts: 'Offence, IPC section, Actus reus, Mens rea, Punishment type',
    challenges: '1) What is mens rea? 2) What is the difference between theft and robbery? 3) What is juvenile justice?',
    keywords: ['criminal law', 'ipc', 'theft', 'robbery', 'murder', 'actus reus', 'mens rea', 'juvenile justice', 'punishment', 'fir', 'trial', 'retributive', 'reformative'],
  },
  {
    key: 'CivilLawSim', name: 'Civil Law Lab', subject: 'legal',
    description: 'Civil procedure flowchart (suit, plaint, written statement, hearing, decree). Contracts explorer (offer, acceptance, consideration, breach). Torts (negligence, defamation, nuisance). Property law. Family law (marriage, divorce, maintenance). Arbitration and mediation.',
    nodes: 'C11-12: civil procedure, contracts, torts, property, family law, arbitration, mediation.',
    controls: 'Case type selector, contract element analyzer, tort type selector, ADR comparison.',
    readouts: 'Case type, Procedure stage, Contract element, Tort type, ADR method',
    challenges: '1) What are the elements of a valid contract? 2) What is negligence in tort? 3) What is arbitration?',
    keywords: ['civil law', 'civil procedure', 'contract', 'offer', 'acceptance', 'consideration', 'breach', 'tort', 'negligence', 'property', 'family law', 'arbitration', 'mediation'],
  },
  {
    key: 'LegalMaximSim', name: 'Legal Maxims & Principles Lab', subject: 'legal',
    description: 'Legal maxims explorer (audi alteram partem, res judicata, stare decisis). Legal doctrines (vicarious liability, strict liability). Human rights interactive (UDHR, NHRC). Lokpal and anti-corruption. Right to information (RTI).',
    nodes: 'C11-12: legal maxims, principles, doctrines, human rights, NHRC, Lokpal.',
    controls: 'Maxim selector, doctrine explorer, human rights toggle, Lokpal interactive, RTI step-through.',
    readouts: 'Maxim, Meaning, Doctrine, Right, Institution',
    challenges: '1) What does "audi alteram partem" mean? 2) What is the NHRC? 3) What is the purpose of Lokpal?',
    keywords: ['legal maxim', 'audi alteram partem', 'res judicata', 'stare decisis', 'vicarious liability', 'strict liability', 'human rights', 'udhr', 'nhrc', 'lokpal', 'rti'],
  },

  // ─── Mass Media (5 templates) ──────────────────────────────
  {
    key: 'CommTheorySim', name: 'Communication Theory Lab', subject: 'massmedia',
    description: 'Communication definition and types (intrapersonal, interpersonal, group, mass). Communication models interactive (Aristotle, Lasswell, Shannon-Weaver, Schramm). Barriers to communication. Verbal vs non-verbal. Effective communication techniques.',
    nodes: 'C11-12: communication definition, types, models (Aristotle, Lasswell, Shannon-Weaver, Schramm).',
    controls: 'Model selector, communication type comparison, barrier explorer, sender-receiver interactive.',
    readouts: 'Model, Communication type, Channel, Barrier, Feedback type',
    challenges: '1) What is the Shannon-Weaver model? 2) What are the types of communication? 3) What is noise in communication?',
    keywords: ['communication', 'aristotle model', 'lasswell', 'shannon-weaver', 'schramm', 'intrapersonal', 'interpersonal', 'mass communication', 'noise', 'feedback', 'barrier'],
  },
  {
    key: 'JournalismSim', name: 'Journalism Lab', subject: 'massmedia',
    description: 'News values explorer (timeliness, proximity, prominence, consequence, human interest). Reporting process (lead, body, conclusion). Editing interactive (copy editing, proofreading). Photojournalism gallery. Journalism ethics (code of ethics, press council). PR campaigns.',
    nodes: 'C11-12: news, news values, reporting, editing, photojournalism, ethics, PR campaigns.',
    controls: 'News value selector, report builder, editing exercise, ethics scenario, PR campaign planner.',
    readouts: 'News value, Lead type, Edit mark, Ethical principle, PR strategy',
    challenges: '1) What are news values? 2) What is the inverted pyramid in reporting? 3) What is the Press Council of India?',
    keywords: ['journalism', 'news', 'news values', 'reporting', 'editing', 'photojournalism', 'ethics', 'press council', 'pr campaign', 'inverted pyramid', 'lead'],
  },
  {
    key: 'RadioTVSim', name: 'Radio & TV Lab', subject: 'massmedia',
    description: 'Radio programme types (talk, interview, documentary, music). TV programme formats (news, serial, reality, documentary). Radio jockeying interactive. Writing for radio (script format). Recording process. Broadcast vs narrowcast.',
    nodes: 'C11-12: radio programmes, TV programmes, radio jockeying, writing for radio, recording.',
    controls: 'Medium selector (radio/TV), programme type, script builder, recording step-through, RJ simulator.',
    readouts: 'Programme type, Script format, Recording stage, Broadcast type, Audience reach',
    challenges: '1) What is the difference between broadcast and narrowcast? 2) What makes a good radio script? 3) What is a documentary?',
    keywords: ['radio', 'television', 'tv', 'programme', 'radio jockey', 'broadcast', 'narrowcast', 'documentary', 'script', 'recording', 'serial', 'reality show'],
  },
  {
    key: 'CinemaSim', name: 'Cinema Lab', subject: 'massmedia',
    description: 'Cinema history (silent era, talkies, Indian cinema). Film genres explorer (drama, comedy, action, documentary, animation). Camera angles and movement interactive (pan, tilt, zoom, dolly). Film production stages (pre-production, production, post-production). Cinema and social change. Advertising types.',
    nodes: 'C11-12: cinema history, genres, camera angles/movement, film stages, social change, advertising.',
    controls: 'Genre selector, camera angle simulator, production stage stepper, advertising type explorer.',
    readouts: 'Genre, Camera angle, Production stage, Shot type, Ad type',
    challenges: '1) What is a pan shot? 2) What are the stages of film production? 3) How does cinema influence society?',
    keywords: ['cinema', 'film', 'genre', 'camera angle', 'pan', 'tilt', 'zoom', 'dolly', 'pre-production', 'post-production', 'social change', 'advertising'],
  },
  {
    key: 'NewMediaSim', name: 'New Media Lab', subject: 'massmedia',
    description: 'Social media platforms explorer (types, features, impact). Cyber crime types (phishing, identity theft, cyberbullying). Netiquettes guide. New media vs traditional media. Media convergence. Regulatory bodies (TRAI, PCI, CBFC).',
    nodes: 'C11-12: social media, cyber crime, netiquettes, new media, media convergence, regulatory bodies.',
    controls: 'Platform selector, cyber crime type explorer, netiquette quiz, convergence interactive, regulator explorer.',
    readouts: 'Platform, Crime type, Netiquette rule, Media type, Regulatory body',
    challenges: '1) What is phishing? 2) What is media convergence? 3) What does TRAI regulate?',
    keywords: ['new media', 'social media', 'cyber crime', 'phishing', 'identity theft', 'cyberbullying', 'netiquette', 'media convergence', 'trai', 'pci', 'cbfc'],
  },

  // ─── Psychology (7 templates) ──────────────────────────────
  {
    key: 'PsyIntroSim', name: 'Psychology Introduction Lab', subject: 'psy',
    description: 'Psychology definition and scope. Schools of thought explorer (structuralism, functionalism, behaviorism, psychoanalysis, humanistic, cognitive). Fields of psychology (clinical, counseling, educational, organizational, sports). Research methods (experiment, observation, survey, case study). Statistics in psychology (mean, SD, correlation).',
    nodes: 'C11-12: definition, schools of thought, fields, methods, statistics in psychology.',
    controls: 'School selector, field explorer, method comparison, statistics calculator.',
    readouts: 'School, Key figure, Field, Method, Statistical value',
    challenges: '1) Who founded psychoanalysis? 2) What is behaviorism? 3) What is a case study?',
    keywords: ['psychology', 'structuralism', 'functionalism', 'behaviorism', 'psychoanalysis', 'humanistic', 'cognitive', 'clinical', 'counseling', 'experiment', 'case study'],
  },
  {
    key: 'BioPsySim', name: 'Biological Psychology Lab', subject: 'psy',
    description: 'Heredity vs environment interactive. Sensation explorer (vision, hearing, touch, taste, smell). Perception visualizer (Gestalt principles, depth perception). Attention types (selective, sustained, divided). Color perception (RGB, mixing). Optical illusions gallery.',
    nodes: 'C11-12: heredity, environment, sensation, perception, attention, colour perception, illusions.',
    controls: 'Sense selector, perception principle toggle, attention test, color mixer, illusion viewer.',
    readouts: 'Sense organ, Stimulus, Perception principle, Attention type, Illusion type',
    challenges: '1) What is the difference between sensation and perception? 2) What is selective attention? 3) What is a Gestalt principle?',
    keywords: ['biological psychology', 'heredity', 'environment', 'sensation', 'perception', 'gestalt', 'attention', 'color perception', 'optical illusion', 'depth perception'],
  },
  {
    key: 'EmotionMotivSim', name: 'Emotion & Motivation Lab', subject: 'psy',
    description: 'Emotion types and theories (James-Lange, Cannon-Bard, Schachter-Singer). Motivation theories (Maslow hierarchy, McClelland). Needs hierarchy interactive. Frustration and conflict types. Social motives explorer. Emotional intelligence interactive.',
    nodes: 'C11-12: emotion, motivation, needs, frustration, conflict, social motives.',
    controls: 'Emotion theory selector, Maslow pyramid builder, conflict type explorer, EI self-assessment.',
    readouts: 'Emotion, Theory, Need level, Motive type, EI score',
    challenges: '1) What is Maslow hierarchy of needs? 2) What is the James-Lange theory? 3) What is emotional intelligence?',
    keywords: ['emotion', 'motivation', 'maslow', 'hierarchy of needs', 'james-lange', 'cannon-bard', 'frustration', 'conflict', 'social motive', 'emotional intelligence'],
  },
  {
    key: 'LearningSim', name: 'Learning Theories Lab', subject: 'psy',
    description: 'Classical conditioning (Pavlov, dogs, bell, salivation). Operant conditioning (Skinner, reinforcement, punishment). Trial and error (Thorndike). Insight learning (Kohler). Observational learning (Bandura). Learning disabilities explorer (dyslexia, ADHD, dyscalculia).',
    nodes: 'C11-12: classical conditioning, operant conditioning, trial & error, insight, observational, learning disabilities.',
    controls: 'Theory selector, conditioning simulator, reinforcement schedule, disability explorer.',
    readouts: 'Theory, Key figure, Reinforcement type, Response, Learning type',
    challenges: '1) Who discovered classical conditioning? 2) What is positive reinforcement? 3) What is dyslexia?',
    keywords: ['learning', 'classical conditioning', 'pavlov', 'operant conditioning', 'skinner', 'reinforcement', 'trial and error', 'thorndike', 'insight', 'kohler', 'bandura', 'dyslexia', 'adhd'],
  },
  {
    key: 'MemorySim', name: 'Memory & Thinking Lab', subject: 'psy',
    description: 'Memory systems (sensory, short-term, long-term). Memory models (Atkinson-Shiffrin, working memory). Forgetting curves (Ebbinghaus). Memory improvement techniques (mnemonics, chunking). Thinking types (convergent, divergent). Reasoning (inductive, deductive). Decision making. Creativity interactive.',
    nodes: 'C11-12: memory systems, models, forgetting, improving memory, thinking, reasoning, decision making, creativity.',
    controls: 'Memory model selector, forgetting curve plotter, mnemonic builder, reasoning type selector, creativity test.',
    readouts: 'Memory type, Model, Forgetting rate, Reasoning type, Creativity score',
    challenges: '1) What are the three memory systems? 2) What is the Ebbinghaus forgetting curve? 3) What is divergent thinking?',
    keywords: ['memory', 'sensory memory', 'short-term', 'long-term', 'atkinson-shiffrin', 'ebbinghaus', 'forgetting', 'mnemonic', 'chunking', 'thinking', 'reasoning', 'creativity'],
  },
  {
    key: 'IntelligenceSim', name: 'Intelligence & Personality Lab', subject: 'psy',
    description: 'Intelligence theories (Spearman g, Gardner multiple intelligences, Sternberg triarchic). IQ calculator. Emotional intelligence. Aptitude vs achievement. Personality theories (Freud, Allport, Big Five). Personality assessment (projective tests, self-report).',
    nodes: 'C11-12: intelligence theories, IQ, emotional intelligence, aptitude, personality theories, assessment.',
    controls: 'Theory selector, IQ calculator, personality test, assessment tool explorer, Big Five radar.',
    readouts: 'IQ score, Intelligence type, Personality trait, Assessment type, Big Five score',
    challenges: '1) What is Gardners multiple intelligence theory? 2) What is IQ? 3) What are the Big Five personality traits?',
    keywords: ['intelligence', 'spearman', 'gardner', 'multiple intelligence', 'sternberg', 'iq', 'emotional intelligence', 'aptitude', 'personality', 'freud', 'allport', 'big five', 'projective test'],
  },
  {
    key: 'DevPsySim', name: 'Developmental Psychology Lab', subject: 'psy',
    description: 'Development stages (infancy, childhood, adolescence, adulthood). Piaget cognitive development stages. Erikson psychosocial stages. Stress and coping mechanisms. Abnormal psychology (anxiety, depression, phobia). Social psychology (attitude, prejudice, conformity, obedience).',
    nodes: 'C11-12: development, infancy, childhood, adolescence, adulthood, stress, abnormal psychology, social psychology.',
    controls: 'Stage selector, Piaget stage explorer, Erikson timeline, stress coping selector, social psychology interactive.',
    readouts: 'Development stage, Cognitive stage, Psychosocial crisis, Coping mechanism, Social behavior',
    challenges: '1) What are Piagets stages of cognitive development? 2) What is the identity crisis in adolescence? 3) What is conformity?',
    keywords: ['developmental psychology', 'piaget', 'erikson', 'infancy', 'childhood', 'adolescence', 'adulthood', 'stress', 'abnormal psychology', 'depression', 'social psychology', 'conformity', 'prejudice'],
  },

  // ─── Home Science (5 templates) ────────────────────────────
  {
    key: 'FoodNutritionSim', name: 'Food & Nutrition Lab', subject: 'home',
    description: 'Nutrients explorer (carbohydrates, proteins, fats, vitamins, minerals). Balanced diet plate interactive. Food preservation methods (canning, drying, freezing, pickling). Cooking methods comparison. Meal planning for different age groups. Special diets (diabetic, hypertension, pregnancy). Eating disorders (anorexia, bulimia).',
    nodes: 'C11-12: food, nutrients, balanced diet, preservation, cooking, meal planning, special diets, eating disorders.',
    controls: 'Nutrient selector, balanced diet plate builder, preservation method selector, meal planner, diet type selector.',
    readouts: 'Nutrient, Daily requirement, Calorie count, Preservation method, Diet type',
    challenges: '1) What are the functions of proteins? 2) What is a balanced diet? 3) What is anorexia nervosa?',
    keywords: ['food', 'nutrition', 'nutrient', 'carbohydrate', 'protein', 'fat', 'vitamin', 'mineral', 'balanced diet', 'preservation', 'cooking', 'meal planning', 'eating disorder'],
  },
  {
    key: 'ResourceMgmtSim', name: 'Resource Management Lab', subject: 'home',
    description: 'Resources types (human, material, non-material). Management process (planning, organizing, controlling). Decision making interactive. Time and energy management. Work simplification techniques. Savings and investment options (FD, RD, mutual funds, PPF). Family budget planner.',
    nodes: 'C11-12: resources, management process, decision making, time/energy, work simplification, savings, investments.',
    controls: 'Resource selector, management process stepper, budget planner, investment comparison, time management tool.',
    readouts: 'Resource type, Management step, Budget allocation, Investment return, Time saved',
    challenges: '1) What are the steps in the management process? 2) What is work simplification? 3) What is a PPF?',
    keywords: ['resource management', 'planning', 'organizing', 'controlling', 'decision making', 'time management', 'work simplification', 'savings', 'investment', 'budget', 'ppf', 'mutual fund'],
  },
  {
    key: 'ChildDevSim', name: 'Child Development Lab', subject: 'home',
    description: 'Growth vs development comparison. Developmental milestones (0-5 years). Personality development factors. Adolescence changes (physical, emotional, social). Mental health in children. Cognitive development stages. Parenting styles.',
    nodes: 'C11-12: growth, development, milestones, personality, adolescence, mental health, cognitive development.',
    controls: 'Age selector, milestone tracker, development area selector, parenting style comparison, mental health checker.',
    readouts: 'Age, Milestone, Development area, Parenting style, Mental health indicator',
    challenges: '1) What is the difference between growth and development? 2) What are developmental milestones? 3) What are the parenting styles?',
    keywords: ['child development', 'growth', 'development', 'milestone', 'personality', 'adolescence', 'mental health', 'cognitive development', 'parenting', 'attachment'],
  },
  {
    key: 'TextileSim', name: 'Textile & Clothing Lab', subject: 'home',
    description: 'Textile fibers explorer (natural - cotton, silk, wool, jute; synthetic - polyester, nylon, acrylic). Embroidery types (chain, satin, cross-stitch). Weaving interactive (warp, weft). Dyeing and printing methods. Laundering care symbols. Stain removal guide. Traditional Indian textiles (Banarasi, Kanjivaram, Bandhani).',
    nodes: 'C11-12: textiles, embroidery, weaving, dyeing, printing, laundering, stain removal, traditional textiles.',
    controls: 'Fiber selector, embroidery type, weaving simulator, dye method selector, stain removal guide, care symbol explorer.',
    readouts: 'Fiber type, Weave pattern, Dye type, Care instruction, Stain treatment',
    challenges: '1) What is the difference between natural and synthetic fibers? 2) What is weaving? 3) How do you remove an ink stain?',
    keywords: ['textile', 'fiber', 'cotton', 'silk', 'wool', 'polyester', 'embroidery', 'weaving', 'warp', 'weft', 'dyeing', 'printing', 'laundering', 'stain removal', 'banarasi', 'kanjivaram'],
  },
  {
    key: 'FamilyLifeSim', name: 'Family Life Education Lab', subject: 'home',
    description: 'Communication in family interactive. Consumer protection (rights, responsibilities, redressal). Food adulteration detection. Water safety and purification. Swachh Bharat mission. ICDS (Integrated Child Development Services). Family life cycle stages.',
    nodes: 'C11-12: communication, consumer protection, food adulteration, water safety, Swachh Bharat, ICDS.',
    controls: 'Communication style selector, consumer rights explorer, adulteration test, water purification method, ICDS service explorer.',
    readouts: 'Communication type, Consumer right, Adulterant detected, Purification method, ICDS service',
    challenges: '1) What are consumer rights? 2) How do you detect adulteration in milk? 3) What is ICDS?',
    keywords: ['family life', 'communication', 'consumer protection', 'food adulteration', 'water safety', 'purification', 'swachh bharat', 'icds', 'family life cycle', 'consumer redressal'],
  },

  // ─── Commerce Studies (3 templates) ────────────────────────
  {
    key: 'CommerceBasicsSim', name: 'Commerce Basics Lab', subject: 'comm',
    description: 'Commerce meaning and scope. Trade types (internal, external, wholesale, retail). Aids to trade (transport, banking, insurance, warehousing, advertising). Business types (sole proprietorship, partnership, company). Stakeholders of business. Capital vs revenue expenditure.',
    nodes: 'C9-10: commerce, trade, aids to trade, business types, stakeholders, capital/revenue.',
    controls: 'Trade type selector, aids to trade explorer, business type comparison, stakeholder map.',
    readouts: 'Trade type, Business form, Aid to trade, Stakeholder, Expenditure type',
    challenges: '1) What is the difference between trade and commerce? 2) What are aids to trade? 3) What is a sole proprietorship?',
    keywords: ['commerce', 'trade', 'internal trade', 'external trade', 'wholesale', 'retail', 'aids to trade', 'transport', 'banking', 'insurance', 'warehousing', 'sole proprietorship', 'partnership', 'company'],
  },
  {
    key: 'FinanceBankSim', name: 'Finance & Banking Lab', subject: 'comm',
    description: 'Banking explorer (types of accounts - savings, current, recurring, fixed). Banking services (cheque, draft, ATM, online banking, UPI). Insurance types (life, health, general). Accounting basics (journal, ledger, trial balance). Online trading interactive. Capital and money market.',
    nodes: 'C9-10: banking, accounts, insurance, accounting, journal entries, online trading, ATM.',
    controls: 'Account type selector, banking service explorer, insurance comparison, journal entry builder, trading simulator.',
    readouts: 'Account type, Interest rate, Insurance premium, Journal entry, Trade value',
    challenges: '1) What is the difference between a savings and current account? 2) What is a journal entry? 3) What is online trading?',
    keywords: ['banking', 'savings account', 'current account', 'recurring', 'fixed deposit', 'atm', 'online banking', 'upi', 'insurance', 'life insurance', 'journal', 'ledger', 'online trading', 'capital market', 'money market'],
  },
  {
    key: 'BusinessMgmtSim', name: 'Business Management Lab', subject: 'comm',
    description: 'Pricing strategies interactive (cost-plus, penetration, skimming). Marketing mix (4 Ps - product, price, place, promotion). Sales techniques explorer. Transportation modes comparison. Industrial relations (trade unions, disputes). Selection process (recruitment, interview). Pollution control measures.',
    nodes: 'C9-10: pricing, marketing, sales, transportation, industrial relations, selection, pollution control.',
    controls: 'Pricing strategy selector, 4P marketing builder, transport mode comparison, selection process stepper.',
    readouts: 'Pricing strategy, Marketing mix element, Transport mode, Selection stage, Pollution measure',
    challenges: '1) What are the 4 Ps of marketing? 2) What is penetration pricing? 3) What are the modes of transport?',
    keywords: ['business management', 'pricing', 'cost-plus', 'penetration', 'skimming', 'marketing mix', '4ps', 'product', 'price', 'place', 'promotion', 'sales', 'transport', 'industrial relations', 'recruitment', 'pollution control'],
  },

  // ─── Business Studies (3 templates) ────────────────────────
  {
    key: 'BusinessOrgSim', name: 'Business Organisation Lab', subject: 'bs',
    description: 'Business features and objectives. Sole proprietorship vs partnership vs company. Company formation (incorporation, MOA, AOA). Public vs private company. Global enterprises (MNCs). E-banking and digital payments. Joint Hindu family business. Cooperative societies.',
    nodes: 'C11-12: business features, sole proprietorship, company, incorporation, global enterprises, e-banking.',
    controls: 'Business type selector, formation stepper, company comparison, global enterprise explorer.',
    readouts: 'Business type, Liability, Capital source, Formation step, Enterprise type',
    challenges: '1) What is the difference between a private and public company? 2) What is MOA? 3) What is a cooperative society?',
    keywords: ['business organisation', 'sole proprietorship', 'partnership', 'company', 'incorporation', 'moa', 'aoa', 'private company', 'public company', 'multinational', 'cooperative', 'joint hindu family', 'e-banking'],
  },
  {
    key: 'ManagementSim', name: 'Management Principles Lab', subject: 'bs',
    description: 'Management levels (top, middle, supervisory). Taylor scientific management (time study, motion study, functional foremanship). Fayol 14 principles. Organization structure types (line, functional, matrix). Training methods. Motivation theories (Maslow, Herzberg). Leadership styles (autocratic, democratic, laissez-faire).',
    nodes: 'C11-12: management levels, Taylor/Fayol, organization structure, training, motivation, leadership.',
    controls: 'Management level selector, Taylor principle explorer, Fayol principle list, structure comparison, leadership style selector.',
    readouts: 'Management level, Principle, Structure type, Motivation factor, Leadership style',
    challenges: '1) What are Taylors scientific management principles? 2) What are Fayols 14 principles? 3) What is matrix organization?',
    keywords: ['management', 'taylor', 'scientific management', 'fayol', '14 principles', 'line organization', 'functional', 'matrix', 'training', 'motivation', 'maslow', 'herzberg', 'leadership', 'autocratic', 'democratic'],
  },
  {
    key: 'FinanceSim', name: 'Business Finance Lab', subject: 'bs',
    description: 'Business finance sources (owned, borrowed). Working capital calculator. Shares and debentures comparison. Stock exchange interactive (NSE, BSE). SEBI role and functions. Business loans (term, working capital, overdraft). Blockchain in finance. Marketing and consumer protection (Consumer Protection Act).',
    nodes: 'C11-12: business finance, working capital, shares, stock exchange, SEBI, loans, blockchain, marketing, consumer protection.',
    controls: 'Finance source selector, working capital calculator, shares vs debentures, stock exchange simulator, SEBI function explorer.',
    readouts: 'Finance source, Working capital, Share price, SEBI function, Loan type',
    challenges: '1) What is working capital? 2) What is the difference between shares and debentures? 3) What is SEBI?',
    keywords: ['business finance', 'working capital', 'shares', 'debentures', 'stock exchange', 'nse', 'bse', 'sebi', 'loan', 'overdraft', 'blockchain', 'consumer protection', 'marketing'],
  },

  // ─── Generic / Cross-cutting (5 templates) ─────────────────
  {
    key: 'ConceptMapSim', name: 'Concept Map Lab', subject: 'generic',
    description: 'Interactive concept map builder. Nodes and links with labeled relationships. Definition explorer. Classification tree builder. Fallback for definitional and conceptual content across any subject.',
    nodes: 'Fallback for definitional content across all subjects.',
    controls: 'Concept selector, relationship builder, node drag, tree expand/collapse, definition toggle.',
    readouts: 'Concept, Relationship, Definition, Classification, Hierarchy level',
    challenges: '1) What is a concept map? 2) How do you classify concepts? 3) What is a hierarchy?',
    keywords: ['concept map', 'definition', 'classification', 'hierarchy', 'relationship', 'node', 'link', 'tree', 'conceptual'],
  },
  {
    key: 'DiagramExplorerSim', name: 'Diagram Explorer Lab', subject: 'generic',
    description: 'Labeled diagram viewer with interactive parts. Structure explorer (click each part to see name and function). Process diagram with step-through. Cross-section viewer. Fallback for structural and diagrammatic content.',
    nodes: 'Fallback for structural content across all subjects.',
    controls: 'Diagram selector, part click, label toggle, zoom, cross-section slider.',
    readouts: 'Part name, Function, Label, Diagram type, Zoom level',
    challenges: '1) What is a labeled diagram? 2) What is a cross-section? 3) How do you identify parts of a structure?',
    keywords: ['diagram', 'labeled', 'structure', 'cross-section', 'process diagram', 'part', 'label', 'function', 'explorer'],
  },
  {
    key: 'TimelineBuilderSim', name: 'Timeline Builder Lab', subject: 'generic',
    description: 'Interactive timeline with draggable events. Chronological ordering exercise. Cause-effect chain builder. Era and period explorer. Fallback for temporal and historical content.',
    nodes: 'Fallback for temporal content across all subjects.',
    controls: 'Event drag, timeline zoom, cause-effect linker, era selector, chronological sorter.',
    readouts: 'Event, Date, Era, Cause, Effect',
    challenges: '1) What is chronological order? 2) What is a cause-effect chain? 3) What is a timeline?',
    keywords: ['timeline', 'chronological', 'event', 'date', 'era', 'cause', 'effect', 'period', 'temporal', 'sequence'],
  },
  {
    key: 'ComparisonSim', name: 'Comparison Lab', subject: 'generic',
    description: 'Side-by-side comparison tool with Venn diagrams. Compare and contrast two or more concepts. Similarity and difference highlighter. Comparison table builder. Fallback for comparative content.',
    nodes: 'Fallback for comparative content across all subjects.',
    controls: 'Concept selector (2-3), comparison table builder, Venn diagram toggle, difference highlighter.',
    readouts: 'Similarity, Difference, Shared trait, Unique trait, Comparison metric',
    challenges: '1) What is a Venn diagram? 2) How do you compare two concepts? 3) What is a comparison table?',
    keywords: ['comparison', 'compare', 'contrast', 'similarity', 'difference', 'venn diagram', 'comparison table', 'versus', 'shared', 'unique'],
  },
  {
    key: 'GenericExplorerSim', name: 'Generic Explorer Lab', subject: 'generic',
    description: 'Universal fallback explorer for nodes that do not fit any specific template. Topic explorer with definition, key points, interactive elements, and challenges. Adapts to any content type.',
    nodes: 'Fallback for nodes that do not fit any specific template.',
    controls: 'Topic selector, key point explorer, interactive element, challenge builder.',
    readouts: 'Topic, Key point, Definition, Challenge, Score',
    challenges: '1) What is the main concept? 2) What are the key points? 3) Can you apply this concept?',
    keywords: ['generic', 'explorer', 'fallback', 'universal', 'topic', 'concept', 'key point', 'definition'],
  },
];

main().catch(err => {
  console.error('FATAL:', err.message);
  process.exit(1);
});
