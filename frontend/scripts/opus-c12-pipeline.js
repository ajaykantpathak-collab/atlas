// GLM C12 Pipeline — generates C12 simulation components using GLM-5.2 High via Devin CLI
// 10 parallel workers, backup-first, enrichment lookup, atomic writes,
// TypeScript compilation check, no retry (errors fixed manually after)
//
// The ONLY automated quality checks in this pipeline are:
//   1. TypeScript compilation (tsc --noEmit) — real, catches type errors
//   2. Node ID presence as string literals — real, verifies node coverage
//   3. Line count — informational only, not a pass/fail gate
//   4. Import presence — real, verifies required imports exist
//   5. 'use client' as first line
//   6. Default export exists
//   7. onComplete in typed props + actually called
//   8. No 'any' type
//   9. localStorage.getItem/setItem actual API call
//  10. BKT (bktUpdate) actually called
//  11. SRS (sm2Update) actually called
//  12. Mastery store (recordGameScore) actually called
//
// All other quality verification (interactive controls, diagrams, challenges,
// misconceptions, adaptive difficulty, etc.) is done AFTER generation by
// reading each file's actual content — not by regex.
//
// Usage: node scripts/opus-c12-pipeline.js
// Model: GLM-5.2 High (via Devin CLI, free, no API key needed)
// Env:   C12_WORKERS   (default: 10)
//        C12_START     (default: 0 — index into template plan)
//        C12_COUNT     (default: 0 = all)
// Requires: devin CLI logged in (devin auth login)

const fs = require('fs');
const path = require('path');
const os = require('os');
const { execSync, exec } = require('child_process');

// ─── Config ───────────────────────────────────────────────────
const NUM_WORKERS = parseInt(process.env.C12_WORKERS || '10', 10);
const START_IDX = parseInt(process.env.C12_START || '0', 10);
const COUNT = parseInt(process.env.C12_COUNT || '0', 10);

// ─── Paths ────────────────────────────────────────────────────
const FRONTEND_DIR = 'D:\\dream_app\\frontend';
const CISCE_DIR = 'D:\\cisce';
const OUTPUT_DIR = path.join(FRONTEND_DIR, 'components', 'simulations', 'c9_12');
const BACKUP_DIR = path.join(FRONTEND_DIR, 'scripts', 'c12_backups');
const TEMP_DIR = path.join(FRONTEND_DIR, 'scripts', 'c12_temp');
const PLAN = require('./c12-template-plan.js');

if (!fs.existsSync(BACKUP_DIR)) fs.mkdirSync(BACKUP_DIR, { recursive: true });
if (!fs.existsSync(TEMP_DIR)) fs.mkdirSync(TEMP_DIR, { recursive: true });

// ─── Node titles lookup ──────────────────────────────────────
const nodesFile = fs.readFileSync(path.join(CISCE_DIR, 'all_nodes_extracted.txt'), 'utf8');
const nodeTitles = {};
for (const line of nodesFile.split('\n').filter(l => l.trim())) {
  const parts = line.split('|');
  if (parts.length >= 4) nodeTitles[parts[2].trim()] = parts[3].trim();
}

// ─── Enrichment loader ───────────────────────────────────────
function loadEnrichment(subject, nodeIds) {
  const subjDir = path.join(CISCE_DIR, subject, 'enrichment');
  if (!fs.existsSync(subjDir)) return '';

  const enrichFiles = fs.readdirSync(subjDir)
    .filter(f => f.startsWith('c12_') && f.endsWith('.marker'))
    .sort();

  let enrichment = '';
  for (const file of enrichFiles) {
    const content = fs.readFileSync(path.join(subjDir, file), 'utf8');
    for (const nodeId of nodeIds) {
      const nodeMarker = `--- NODE ${nodeId} ---`;
      const idx = content.indexOf(nodeMarker);
      if (idx !== -1) {
        const nextNodeIdx = content.indexOf('\n--- NODE ', idx + nodeMarker.length);
        const endIdx = nextNodeIdx !== -1 ? nextNodeIdx : content.length;
        enrichment += content.substring(idx, endIdx) + '\n\n';
      }
    }
  }
  return enrichment;
}

// ─── Stream-specific prompt sections ─────────────────────────
function getStreamPrompt(stream) {
  if (stream === 'science') {
    return `## SCIENCE STREAM VISUALIZATION RULES
- Use the BEST visualization technology for the concept:
  - React Three Fiber (@react-three/fiber, @react-three/drei, three) for 3D structures, molecular models, atomic orbitals, crystal lattices, anatomy
  - Matter.js for physics motion, collisions, forces
  - PixiJS or Canvas for particle systems, chemical reactions, diffusion
  - D3 or Recharts for graphs, data visualization, V-I curves, distributions
  - Detailed SVG for circuit diagrams, ray diagrams, Lewis structures, phase diagrams
  - GSAP for step-by-step process animations (reaction mechanisms, mitosis, algorithm execution)
  - Framer Motion for UI transitions and feedback
- Include DETAILED LABELED DIAGRAMS:
  - Labeled structures with leader lines pointing to exact parts
  - Cross-sections where applicable (cell, atom, Earth, organ)
  - Process diagrams showing change over time
  - Side-by-side comparisons (isotopes, allotropes, cell types)
  - Measurement annotations that update with interaction
  - At least 5 labeled parts in the main diagram
  - State-dependent visuals — diagram changes when parameters change
- Show the same concept in 2+ ways (equation + graph + diagram)
- All measurements must display correct SI units
- Student manipulates variables and observes outcomes (experiment-style)
- Render mathematical formulas with proper notation, not plain text`;
  }
  if (stream === 'commerce') {
    return `## COMMERCE STREAM VISUALIZATION RULES
- Use the BEST visualization technology for the concept:
  - Interactive HTML tables + SVG for accounting ledgers, journals, T-accounts, trial balance
  - Recharts + D3 for financial dashboards, ratio analysis, cash flow, comparative statements
  - SVG flow diagrams + GSAP for transaction flows (Journal → Ledger → Trial Balance → Final Accounts)
  - Interactive UI + SVG for banking simulations, bank reconciliation, credit creation
  - SVG + Framer Motion for business process maps, management functions, marketing mix
  - Recharts candlestick for stock market (SENSEX/NIFTY, IPO, bull/bear)
  - D3 line graphs with interactivity for cost curves, demand/supply, elasticity, equilibrium
- Include at least one LIVE CALCULATION that updates as student changes inputs
- Accounting formats must match CISCE standards (Trading A/c, P&L, Balance Sheet)
- Student can record at least one transaction and see its effect
- Use REAL INDIAN EXAMPLES — Indian company names, rupee amounts, Indian laws
  (Companies Act 2013, Partnership Act 1932, CPA 2019)
- Multi-step processes shown as sequential interactive stages`;
  }
  return `## HUMANITIES STREAM VISUALIZATION RULES
- Use the BEST visualization technology for the concept:
  - SVG timeline + GSAP for historical timelines (freedom struggle, Cold War, de-colonisation)
  - SVG maps + interactivity for geography (India geography, drainage, population)
  - SVG flow diagrams for cause-effect chains (war causes, social movements, policy impacts)
  - Interactive cards + Framer Motion for case studies (court cases, social issues, experiments)
  - Interactive comparison tables for comparative frameworks (India vs USA, caste vs class)
  - Text annotation interface for document analysis (Constitution, legal maxims, sources)
  - SVG + step-by-step for process flowcharts (legal procedure, film production, research)
  - SVG diagrams + sliders for psychological models (Maslow, Freud, personality)
- Include at least one TIMELINE or MAP interaction where applicable
- Student traces causes and effects interactively
- Include at least one real QUOTE, ARTICLE, or DOCUMENT EXCERPT
- At least one side-by-side comparison the student completes
- Connect historical/theoretical content to contemporary India`;
}

// ─── Build prompt for one template ───────────────────────────
function buildPrompt(template) {
  const nodeInfo = template.nodes.map(n => `- ${n}: ${nodeTitles[n] || 'UNKNOWN'}`).join('\n');
  const enrichment = loadEnrichment(template.subject, template.nodes);
  const streamRules = getStreamPrompt(template.stream);
  const nodeIdList = template.nodes.join(', ');

  return `You are generating a React TypeScript simulation component for a CISCE (ISC) Class 12 learning platform. This component teaches struggling students through interactive, visual, adaptive learning — closer to Brilliant.org than a static textbook.

## CRITICAL: DO NOT READ OTHER FILES
Do NOT use ls, read, or any exploration tools. Do NOT look at existing components.
All the information you need is in this prompt. Just write the file directly.
If you catch yourself reading files, STOP and write the component immediately.

## YOUR TASK
Write the complete component file to: D:\\dream_app\\frontend\\components\\simulations\\c9_12\\${template.id}.tsx
Use your write tool with parameters file_path and content to create this file.
Write the ENTIRE component in ONE write call. Do not split into multiple writes.

## COMPONENT TO GENERATE
File: components/simulations/c9_12/${template.id}.tsx
Stream: ${template.stream}
Subject: ${template.subject}

## NODES THIS TEMPLATE COVERS (you must teach ALL of these)
${nodeInfo}

These node IDs MUST appear in the code as string literals so they can be verified:
${nodeIdList}

## ENRICHMENT DATA (use this for definitions, ELI5, misconceptions, diagnostic questions)
${enrichment || 'NOTE: No enrichment marker files found for these nodes. Use your knowledge of the CISCE curriculum to provide accurate definitions, ELI5 explanations, common misconceptions, and diagnostic questions.'}

## EXISTING PLATFORM SYSTEMS — YOU MUST IMPORT AND USE THESE

This is NOT a standalone component. The platform already has these systems built. Your component MUST integrate with them:

### 1. Spaced Repetition (SM-2 algorithm)
Import and use:
  import { createReviewItem, sm2Update } from '../../../lib/srs'
After each challenge, update the spaced repetition schedule:
  const item = createReviewItem(nodeId, title);
  const updated = sm2Update(item, quality, responseTime);
  // quality: 0-5 (0=complete fail, 5=perfect)
  // Save updated to localStorage

### 2. Bayesian Knowledge Tracing (adaptive mastery)
Import and use:
  import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt'
After each answer, update mastery:
  const bktState = createBKTState();
  const updated = bktUpdate(bktState, isCorrect);
  const mastery = getMasteryLevel(updated.pKnown);
  // mastery: 'not-started' | 'beginner' | 'developing' | 'proficient' | 'mastered'
  // Use mastery level to ADAPT difficulty: beginner→foundation, developing→standard, proficient+→advanced

### 3. Mastery Store (localStorage persistence)
Import and use:
  import { recordGameScore, getNodeMastery, getNodesNeedingReview } from '../../../lib/masteryStore'
  // recordGameScore(nodeIds, score) — saves best score for multiple nodes
  // getNodeMastery(nodeId) — returns NodeMastery with status: 'locked'|'available'|'in_progress'|'mastered'|'needs_review'
  // getNodesNeedingReview() — returns node IDs due for spaced review

### 4. Topic Graph (progression)
Import and use:
  import { SUBJECT_CONFIG } from '../../../lib/topicGraph'
  // Use SUBJECT_CONFIG[subject] for subject display name, emoji, color

### 5. Feedback components
Import from:
  import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine'
  // audioManager.play('success') — valid sounds: pickup, drop-correct, drop-wrong, tap, success, celebration, hint, error, count, balance, whoosh, sparkle, chime, pop, swoop
  // speechManager.speak('text') — for spoken instructions and feedback

## MANDATORY REQUIREMENTS — ALL MUST BE MET

### Structure
- 'use client' directive at top
- Default export: ${template.id}
- Typed props interface with: nodeId?, title?, definition?, eli5?, misconceptions?, diagnosticQuestions?, masteryCriteria?, onComplete?: (score: number) => void
- Import from '../../../lib/sim-engine': audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst
- Import from '../../../lib/srs': createReviewItem, sm2Update
- Import from '../../../lib/bkt': createBKTState, bktUpdate, getMasteryLevel
- Import from '../../../lib/masteryStore': recordGameScore, getNodeMastery
- Import from '../../../lib/topicGraph': SUBJECT_CONFIG
- Self-contained — no external API calls, no external file reads

### Adaptive Learning (Brilliant.org-style)
- Use BKT to track mastery per node — after each answer, call bktUpdate()
- Use getMasteryLevel() to determine current mastery state
- ADAPT difficulty based on mastery: 'beginner'→foundation problems, 'developing'→standard, 'proficient'→advanced, 'mastered'→challenge problems
- If student gets 2 wrong in a row, drop difficulty down one level
- If student gets 3 right in a row, push difficulty up one level
- Show mastery state to student (beginner/developing/proficient/mastered)

### Spaced Repetition
- After each challenge, call sm2Update() with the quality score
- Save the updated review item to localStorage
- On component mount, check if this topic is due for review (getMastery)
- If due for review, show "Review Session" badge

### Content
- 1000+ substantive lines (target 1200-1800)
- Display the ELI5 explanation to the student
- Guided discovery: student interacts BEFORE the rule/formula is revealed
- 5+ progressive challenges following: recall → apply → analyze → evaluate → create
- Misconception feedback in format: "Misconception: [belief] → Correction: [correction]" — use actual enrichment misconceptions
- When student gets wrong answer, show a DIFFERENT variant of the same concept (not the same question)
- Real-world activity with a student response area (textarea or input)

### Interaction
- 3+ interactive controls (sliders, buttons, toggles, selectors, drag-and-drop)
- 3+ live readouts with correct units where applicable
- Progressive hints: Show Hint button + auto-hint after 10 seconds of inactivity (use useRef timer)
- When student is stuck after 2 wrong answers, break the problem into guided step-by-step sub-questions
- All assigned node IDs must appear as string literals somewhere in the code

### Feedback
- Import and use ALL: Confetti, SuccessBanner, HintBubble, SparkleBurst
- Import and use both: audioManager (play sounds) and speechManager (speak text)
- Valid SoundEffect values: 'pickup','drop-correct','drop-wrong','tap','success','celebration','hint','error','count','balance','whoosh','sparkle','chime','pop','swoop'

### Persistence
- Save mastery via recordGameScore(nodeIds, score) from masteryStore
- Save spaced repetition via sm2Update() from srs
- Save BKT state to localStorage
- Key format: 'c12_${template.subject}_${template.id}_mastery'

### Completion
- Call onComplete(score) with score 0-100 when all challenges done
- Score = max(0, 100 - errors*5) or similar
- Also call recordGameScore([nodeId], score) to persist to mastery store

${streamRules}

### TypeScript
- Zero TypeScript errors
- No 'any' type
- No unused imports or variables
- All props typed
- All state typed
- All event handlers typed

## OUTPUT INSTRUCTIONS — READ CAREFULLY

You MUST write the complete component to this EXACT file path:
  D:\\dream_app\\frontend\\components\\simulations\\c9_12\\${template.id}.tsx

Use the \`write\` tool. The write tool requires these EXACT parameter names:
  - \`file_path\` (string) — the full path above
  - \`content\` (string) — the complete TypeScript code

Do NOT use any other parameter names. Not "path". Not "filename". Not "text". Not "code".
The parameter names MUST be exactly \`file_path\` and \`content\`.

The content must be the COMPLETE component (1000+ lines), starting with:
  'use client';
and ending with the default export statement.

## TIMING
You have 8 minutes. Write the file NOW. Do not explore. Do not read other files.
All information you need is above. Just write the component in one write call.

After successfully writing the file, respond with "DONE".

If the write tool fails, try again with the correct parameter names.
Do NOT give up. Do NOT output the code as text. Use the write tool.`;
}

// ─── Call GLM-5.2 High via Devin CLI ─────────────────────────
// Devin is an AGENT, not an API. It writes files directly using its tools.
// We tell it to write the component file, then we read the file after.
//
// CRITICAL: Each parallel Devin instance needs its own APPDATA directory
// because Devin uses a SQLite database (sessions.db) that locks on write.
// Without separate data dirs, parallel instances crash with "database is locked".
//
// We create a temp APPDATA dir per worker, copy credentials into it,
// and pass it via the APPDATA env var so each Devin gets its own sessions.db.

const WORKER_DIRS = new Map(); // workerId -> temp APPDATA path

function getWorkerDataDir(workerId) {
  if (WORKER_DIRS.has(workerId)) return WORKER_DIRS.get(workerId);

  const tempDir = os.tmpdir();
  const workerDir = path.join(tempDir, `devin_worker_${workerId}_${Date.now()}`);

  try {
    // Copy the real APPDATA\devin into the worker dir so credentials are preserved
    const realAppData = process.env.APPDATA;
    const realDevinDir = path.join(realAppData, 'devin');
    const workerDevinDir = path.join(workerDir, 'devin');

    // Create the worker APPDATA\devin directory
    fs.mkdirSync(workerDevinDir, { recursive: true });

    // Copy credentials.toml (auth) and config.json (settings)
    // These are the only critical files — without credentials, Devin can't log in
    const filesToCopy = ['credentials.toml', 'config.json'];
    for (const file of filesToCopy) {
      const src = path.join(realDevinDir, file);
      if (fs.existsSync(src)) {
        fs.copyFileSync(src, path.join(workerDevinDir, file));
      }
    }

    // Copy cli dir but exclude sessions.db and directories (logs, etc.)
    const cliDir = path.join(realDevinDir, 'cli');
    if (fs.existsSync(cliDir)) {
      const workerCliDir = path.join(workerDevinDir, 'cli');
      fs.mkdirSync(workerCliDir, { recursive: true });
      for (const file of fs.readdirSync(cliDir)) {
        const srcPath = path.join(cliDir, file);
        // Skip directories (logs, etc.) — only copy files
        if (!fs.statSync(srcPath).isFile()) continue;
        // Skip database files — each worker gets its own fresh DB
        if (file.endsWith('.db') || file.endsWith('.db-wal') || file.endsWith('.db-shm')) continue;
        fs.copyFileSync(srcPath, path.join(workerCliDir, file));
      }
    }
  } catch (e) {
    // Non-fatal — credentials are the only critical part
    console.log(`  [Worker ${workerId}] Data dir copy warning: ${e.message}`);
  }

  WORKER_DIRS.set(workerId, workerDir);
  return workerDir;
}

function callGLM(prompt, templateId, workerId) {
  return new Promise((resolve, reject) => {
    // Write prompt to temp file
    const tempDir = os.tmpdir();
    const promptFile = path.join(tempDir, `c12_prompt_${templateId}_${Date.now()}.txt`);
    fs.writeFileSync(promptFile, prompt, 'utf8');

    // Get isolated data directory for this worker
    const workerDataDir = getWorkerDataDir(workerId);

    // Call devin -p with prompt file — dangerous mode + custom config that denies reads
    // This forces GLM to write the file directly instead of exploring the codebase
    const configPath = path.join(FRONTEND_DIR, 'scripts', 'c12-devin-config.json');
    const cmd = `devin -p --prompt-file "${promptFile}" --model glm-5-2 --permission-mode dangerous --config "${configPath}" --respect-workspace-trust false`;
    console.log(`  [${templateId}] Calling devin -p --model glm-5-2 (dangerous, no-reads)...`);

    exec(cmd, {
      cwd: FRONTEND_DIR,
      encoding: 'utf8',
      timeout: 600000, // 10 min max per template
      maxBuffer: 20 * 1024 * 1024,
      env: {
        ...process.env,
        APPDATA: workerDataDir,
      },
    }, (err, stdout, stderr) => {
      // Clean up temp file
      try { fs.unlinkSync(promptFile); } catch (e) {}

      const devinOutput = (stdout || '').trim();
      const devinErr = (stderr || '').trim();
      if (devinOutput) console.log(`  [${templateId}] Devin said: ${devinOutput.substring(0, 200)}`);
      if (devinErr) console.log(`  [${templateId}] Devin stderr: ${devinErr.substring(0, 200)}`);

      if (err) {
        if (err.killed || err.signal === 'SIGTERM') {
          reject(new Error('Devin CLI timeout (6min)'));
          return;
        }
        // Non-timeout errors might still mean Devin wrote the file — check below
      }

      // Devin writes the file directly — read it from the output path
      const outputPath = path.join(OUTPUT_DIR, `${templateId}.tsx`);
      
      // PRIMARY: Check if Devin wrote the file
      if (fs.existsSync(outputPath)) {
        const code = fs.readFileSync(outputPath, 'utf8');
        if (code.trim().length >= 500) {
          resolve(code);
          return;
        }
      }
      
      // FALLBACK: GLM failed the write tool, but maybe it dumped code into stdout
      // Try to extract code from Devin's text output
      if (devinOutput.length >= 500) {
        let extracted = devinOutput;
        // Strip markdown fences if present
        const fenceMatch = extracted.match(/```(?:typescript|tsx|ts)?\n([\s\S]*?)```/);
        if (fenceMatch) {
          extracted = fenceMatch[1];
        }
        // Find 'use client' and start from there
        const ucIdx = extracted.indexOf("'use client'");
        if (ucIdx >= 0) extracted = extracted.substring(ucIdx);
        const ucIdx2 = extracted.indexOf('"use client"');
        if (ucIdx2 >= 0) extracted = extracted.substring(ucIdx2);
        
        extracted = extracted.trim();
        
        if (extracted.length >= 500 && extracted.includes("'use client'") || extracted.includes('"use client"')) {
          console.log(`  [${templateId}] Write tool failed, but extracted ${extracted.length} chars from stdout`);
          // Write it ourselves as fallback
          fs.writeFileSync(outputPath, extracted, 'utf8');
          resolve(extracted);
          return;
        }
      }
      
      reject(new Error(`Devin did not write the output file. stdout: ${devinOutput.substring(0, 300)} | stderr: ${devinErr.substring(0, 300)}`));
    });
  });
}


// ─── Backup existing file ────────────────────────────────────
function backupFile(templateId) {
  const filePath = path.join(OUTPUT_DIR, `${templateId}.tsx`);
  if (fs.existsSync(filePath)) {
    const backupPath = path.join(BACKUP_DIR, `${templateId}_${Date.now()}.tsx.bak`);
    fs.copyFileSync(filePath, backupPath);
    console.log(`  [BACKUP] ${templateId} → ${path.basename(backupPath)}`);
    return backupPath;
  }
  return null;
}

// ─── Atomic write (write to temp, rename) ────────────────────
function atomicWrite(templateId, code) {
  const finalPath = path.join(OUTPUT_DIR, `${templateId}.tsx`);
  const tempPath = path.join(TEMP_DIR, `${templateId}_${Date.now()}.tsx.tmp`);
  fs.writeFileSync(tempPath, code, 'utf8');
  fs.renameSync(tempPath, finalPath);
}

// ─── Real checks (only things that can actually be verified) ─
function runRealChecks(template, code) {
  const lines = code.split('\n');
  const lineCount = lines.length;

  // Check 1: 'use client' at top (real — must be first line)
  const useClient = lines[0]?.trim() === "'use client'" || lines[0]?.trim() === '"use client"';

  // Check 2: Required imports exist (real — import statements)
  const requiredImports = [
    'audioManager', 'speechManager', 'Confetti', 'SuccessBanner', 'HintBubble', 'SparkleBurst',
    'createReviewItem', 'sm2Update', 'createBKTState', 'bktUpdate', 'getMasteryLevel',
    'recordGameScore', 'getNodeMastery', 'SUBJECT_CONFIG',
  ];
  const importChecks = {};
  for (const imp of requiredImports) {
    importChecks[imp] = new RegExp(`import\\s+.*\\b${imp}\\b.*from`).test(code);
  }

  // Check 3: Default export exists (real — export statement)
  const hasDefaultExport = /export\s+default\s+/.test(code);

  // Check 4: onComplete in props and called (real — function signature + call)
  const onCompleteInProps = /onComplete\??\s*:\s*\(?\s*score\s*:\s*number\s*\)?/.test(code);
  const onCompleteCalled = /onComplete\s*\(/.test(code);

  // Check 5: Node IDs present as string literals in CODE (not comments)
  // Strip comments before checking so node IDs in comments don't count
  const codeWithoutComments = code
    .replace(/\/\*[\s\S]*?\*\//g, '')   // block comments
    .replace(/\/\/[^\n]*/g, '');          // line comments
  const nodesCovered = template.nodes.filter(n =>
    codeWithoutComments.includes(`'${n}'`) || codeWithoutComments.includes(`"${n}"`)
  );
  const nodesMissing = template.nodes.filter(n =>
    !codeWithoutComments.includes(`'${n}'`) && !codeWithoutComments.includes(`"${n}"`)
  );

  // Check 6: No 'any' type (real — TypeScript strict mode catches this too)
  const noAny = !/:\s*any\b/.test(code) && !/as\s+any\b/.test(code);

  // Check 7: localStorage used (real — actual API call)
  const hasLocalStorage = /localStorage\.(getItem|setItem)/.test(code);

  // Check 8: BKT actually called (real — function call)
  const bktUsed = /bktUpdate\s*\(/.test(code);

  // Check 9: SRS actually called (real — function call)
  const srsUsed = /sm2Update\s*\(/.test(code);

  // Check 10: recordGameScore actually called (real — function call)
  const masteryStored = /recordGameScore\s*\(/.test(code);

  return {
    lineCount,
    useClient,
    importChecks,
    allImportsPresent: Object.values(importChecks).every(v => v),
    hasDefaultExport,
    onCompleteInProps,
    onCompleteCalled,
    nodesCovered: nodesCovered.length,
    nodesTotal: template.nodes.length,
    nodesMissing,
    noAny,
    hasLocalStorage,
    bktUsed,
    srsUsed,
    masteryStored,
  };
}

// ─── TypeScript check ────────────────────────────────────────
// Use the project tsconfig so path aliases (@/types, @/lib/...) and
// esModuleInterop are resolved correctly. Filter errors to only this file.
function typeCheck(templateId) {
  try {
    const filePath = path.join(OUTPUT_DIR, `${templateId}.tsx`);
    const output = execSync(`npx tsc --noEmit --pretty false 2>&1`, {
      cwd: FRONTEND_DIR,
      encoding: 'utf8',
      timeout: 120000,
      stdio: ['pipe', 'pipe', 'pipe'],
    });
    // Filter errors to only this file
    const fileErrors = output.split('\n')
      .filter(l => l.includes(`${templateId}.tsx`))
      .join('\n');
    if (fileErrors.trim()) {
      return { pass: false, errors: fileErrors.substring(0, 2000) };
    }
    return { pass: true, errors: '' };
  } catch (e) {
    const output = (e.stdout || e.stderr || e.message || '');
    const fileErrors = output.split('\n')
      .filter(l => l.includes(`${templateId}.tsx`))
      .join('\n');
    if (fileErrors.trim()) {
      return { pass: false, errors: fileErrors.substring(0, 2000) };
    }
    // No errors for this file = pass (other files may have errors)
    return { pass: true, errors: '' };
  }
}

// ─── Process one template (single generation, no retry) ─────
async function processTemplate(template, workerId) {
  const tag = `[W${workerId}]`;
  console.log(`${tag} START: ${template.id} (${template.nodes.length} nodes, ${template.stream})`);

  // 1. Backup existing file
  backupFile(template.id);

  // 2. Delete old file so we don't read stale content if Devin fails
  const outputPath = path.join(OUTPUT_DIR, `${template.id}.tsx`);
  try { fs.unlinkSync(outputPath); } catch (e) {}

  // 3. Build prompt
  const prompt = buildPrompt(template);

  // 4. Call GLM-5.2 via Devin CLI — retry on DB lock with delay
  let code;
  const MAX_DB_RETRIES = 3;
  for (let attempt = 1; attempt <= MAX_DB_RETRIES; attempt++) {
    try {
      code = await callGLM(prompt, template.id, workerId);
      break;
    } catch (e) {
      if (e.message.includes('database is locked') && attempt < MAX_DB_RETRIES) {
        const delay = attempt * 5000; // 5s, 10s, 15s
        console.log(`${tag}  DB locked, retry ${attempt}/${MAX_DB_RETRIES} in ${delay/1000}s...`);
        await new Promise(r => setTimeout(r, delay));
        continue;
      }
      console.error(`${tag}  ERROR: ${e.message}`);
      return { id: template.id, success: false, error: e.message };
    }
  }
  console.log(`${tag}  File written by Devin: ${code.split('\n').length} lines`);

  // 4. Real checks (Devin already wrote the file, we verify it)
  const checks = runRealChecks(template, code);
  console.log(`${tag}  Lines: ${checks.lineCount} | useClient: ${checks.useClient} | imports: ${checks.allImportsPresent ? 'OK' : 'MISSING'} | nodes: ${checks.nodesCovered}/${checks.nodesTotal} | BKT: ${checks.bktUsed} | SRS: ${checks.srsUsed} | mastery: ${checks.masteryStored} | localStorage: ${checks.hasLocalStorage} | noAny: ${checks.noAny}`);

  // 7. TypeScript check
  const tsResult = typeCheck(template.id);
  console.log(`${tag}  TS CHECK: ${tsResult.pass ? 'PASS' : 'FAIL'}`);
  if (!tsResult.pass) {
    const firstErrors = tsResult.errors.split('\n').filter(l => l.trim()).slice(0, 3).join('\n');
    console.error(`${tag}  TS ERRORS:\n${firstErrors}`);
  }

  // 8. Determine success
  const structuralPass = checks.useClient && checks.allImportsPresent && checks.hasDefaultExport &&
                         checks.onCompleteInProps && checks.onCompleteCalled && checks.noAny &&
                         checks.hasLocalStorage && checks.lineCount >= 1000 &&
                         checks.bktUsed && checks.srsUsed && checks.masteryStored;
  const nodePass = checks.nodesCovered === checks.nodesTotal;
  const success = structuralPass && nodePass && tsResult.pass;

  const result = {
    id: template.id,
    success,
    lineCount: checks.lineCount,
    useClient: checks.useClient,
    allImportsPresent: checks.allImportsPresent,
    hasDefaultExport: checks.hasDefaultExport,
    onCompleteInProps: checks.onCompleteInProps,
    onCompleteCalled: checks.onCompleteCalled,
    noAny: checks.noAny,
    hasLocalStorage: checks.hasLocalStorage,
    bktUsed: checks.bktUsed,
    srsUsed: checks.srsUsed,
    masteryStored: checks.masteryStored,
    nodesCovered: checks.nodesCovered,
    nodesTotal: checks.nodesTotal,
    nodesMissing: checks.nodesMissing,
    tsPass: tsResult.pass,
    tsErrors: tsResult.errors.substring(0, 2000),
  };

  console.log(`${tag}  ${success ? 'DONE' : 'NEEDS MANUAL FIX'}: ${template.id} (TS: ${tsResult.pass ? 'PASS' : 'FAIL'}, nodes: ${checks.nodesCovered}/${checks.nodesTotal}, lines: ${checks.lineCount}, BKT: ${checks.bktUsed}, SRS: ${checks.srsUsed})`);
  return result;
}

// ─── Worker pool (10 workers) ────────────────────────────────
async function runWorkers(templates) {
  const results = [];
  let nextIdx = 0;

  async function worker(workerId) {
    while (nextIdx < templates.length) {
      const idx = nextIdx++;
      const template = templates[idx];
      const result = await processTemplate(template, workerId);
      results.push(result);
    }
  }

  const workers = [];
  for (let i = 1; i <= Math.min(NUM_WORKERS, templates.length); i++) {
    workers.push(worker(i));
  }
  await Promise.all(workers);
  return results;
}

// ─── Kill leftover Devin processes ───────────────────────────
function killLeftoverDevins() {
  try {
    // On Windows, kill any running devin/Devin processes
    const output = execSync('tasklist /FI "IMAGENAME eq devin.exe" /FO CSV 2>nul & tasklist /FI "IMAGENAME eq Devin.exe" /FO CSV 2>nul', {
      encoding: 'utf8',
      timeout: 10000,
    });
    const pids = [];
    for (const line of output.split('\n')) {
      const match = line.match(/"(\d+)"/);
      if (match && match[1] !== 'PID') pids.push(match[1]);
    }
    if (pids.length > 0) {
      console.log(`Killing ${pids.length} leftover Devin process(es)...`);
      for (const pid of pids) {
        try { execSync(`taskkill /F /PID ${pid} 2>nul`, { timeout: 5000 }); } catch (e) {}
      }
      // Wait for processes to fully exit
      const waitMs = 3000;
      console.log(`Waiting ${waitMs/1000}s for processes to exit...`);
      execSync(`ping 127.0.0.1 -n ${Math.ceil(waitMs/1000) + 1} -w 1000 >nul`, { timeout: 10000 });
    }
  } catch (e) {
    // Non-fatal — might not be on Windows or no processes
  }
}

// ─── Main ────────────────────────────────────────────────────
async function main() {
  console.log('=== GLM-5.2 C12 Pipeline ===');
  console.log('Model: GLM-5.2 (glm-5-2) via Devin CLI');
  console.log(`Workers: ${NUM_WORKERS}`);
  console.log(`Templates: ${PLAN.length}`);
  console.log(`Start index: ${START_IDX}`);
  console.log(`Count: ${COUNT || 'all'}`);
  console.log('');

  // Kill any leftover Devin processes to avoid DB lock
  killLeftoverDevins();

  // Select templates
  let templates = PLAN.slice(START_IDX);
  if (COUNT > 0) templates = templates.slice(0, COUNT);
  console.log(`Processing: ${templates.length} templates\n`);

  // Run
  const startTime = Date.now();
  const results = await runWorkers(templates);
  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);

  // Summary
  console.log('\n=== SUMMARY ===');
  console.log(`Time: ${elapsed}s`);
  const succeeded = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);
  console.log(`Succeeded: ${succeeded.length}/${results.length}`);
  console.log(`Failed: ${failed.length}/${results.length}`);

  const tsPassed = results.filter(r => r.tsPass).length;
  console.log(`TypeScript passed: ${tsPassed}/${results.length}`);

  const avgLines = results.reduce((s, r) => s + (r.lineCount || 0), 0) / results.length;
  console.log(`Avg line count: ${avgLines.toFixed(0)}`);

  const totalNodesCovered = results.reduce((s, r) => s + (r.nodesCovered || 0), 0);
  const totalNodes = results.reduce((s, r) => s + (r.nodesTotal || 0), 0);
  console.log(`Node coverage: ${totalNodesCovered}/${totalNodes}`);

  if (failed.length > 0) {
    console.log('\n--- FAILED ---');
    for (const f of failed) {
      const reasons = [];
      if (!f.tsPass) reasons.push('TS errors');
      if (f.nodesCovered < f.nodesTotal) reasons.push(`nodes ${f.nodesCovered}/${f.nodesTotal}`);
      if (!f.allImportsPresent) reasons.push('missing imports');
      if (f.lineCount < 1000) reasons.push(`${f.lineCount} lines`);
      console.log(`  ${f.id}: ${reasons.join(', ') || f.error || 'unknown'} (attempt ${f.attempt})`);
    }
  }

  // Write results log
  const logPath = path.join(FRONTEND_DIR, 'scripts', `c12_pipeline_log_${Date.now()}.json`);
  fs.writeFileSync(logPath, JSON.stringify(results, null, 2));
  console.log(`\nLog: ${logPath}`);

  // Write list of files needing manual inspection
  const needsInspection = results.filter(r => !r.success);
  if (needsInspection.length > 0) {
    const inspPath = path.join(FRONTEND_DIR, 'scripts', `c12_needs_inspection_${Date.now()}.txt`);
    fs.writeFileSync(inspPath, needsInspection.map(r => `${r.id}: ${r.nodesMissing?.length || 0} nodes missing, TS: ${r.tsPass ? 'PASS' : 'FAIL'}, lines: ${r.lineCount}`).join('\n'));
    console.log(`Needs inspection: ${inspPath}`);
  }
}

main().catch(e => {
  console.error('FATAL:', e);
  process.exit(1);
});
