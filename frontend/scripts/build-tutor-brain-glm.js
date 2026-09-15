// =============================================================================
// build-tutor-brain-glm.js
// -----------------------------------------------------------------------------
// GLM-5.2 High version of the tutor brain builder.
// Uses Devin CLI (free, no API key) with 10 parallel workers.
// Includes 5 Opus-generated batches as gold-standard few-shot examples
// to match Opus quality.
//
// Processes the remaining batches that Opus didn't complete.
// Resumable — skips batches already in progress.json.
//
// Usage:
//   node --expose-gc scripts/build-tutor-brain-glm.js
//   node --expose-gc scripts/build-tutor-brain-glm.js --workers 5
//   node --expose-gc scripts/build-tutor-brain-glm.js --status
//
// IMPORTANT: Run with --expose-gc to prevent OOM on long runs.
// =============================================================================

const fs = require('fs');
const path = require('path');
const os = require('os');
const { exec } = require('child_process');

// ─── Config ───────────────────────────────────────────────────────────────
const NUM_WORKERS = parseInt(process.env.BRAIN_WORKERS || '10', 10);
const BATCH_SIZE = 15;
const TIMEOUT_MS = 600000; // 10 min per batch
const MAX_RETRIES = 3;

// ─── Paths ────────────────────────────────────────────────────────────────
const CISCE_DIR = 'D:\\cisce';
const FRONTEND_DIR = path.resolve(__dirname, '..');
const OUTPUT_DIR = path.resolve(FRONTEND_DIR, '..', 'tutor-brain');
const PROGRESS_FILE = path.join(OUTPUT_DIR, 'progress.json');
const CONFIG_PATH = path.join(FRONTEND_DIR, 'scripts', 'brain-devin-config.json');

fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// ─── Subject directories ─────────────────────────────────────────────────
const SUBJECT_DIRS = {
  physics: 'physics', maths: 'maths', chem: 'chem', bio: 'bio', cs: 'cs',
  biotech: 'biotech', appmath: 'appmath', evs: 'evs',
  acc: 'acc', bs: 'bs', econ: 'econ', econapp: 'econapp',
  comm: 'comm', commapp: 'commapp', commstud: 'commstud',
  geo: 'geo', histciv: 'histciv', pol: 'pol',
  psy: 'psy', soc: 'soc', home: 'home', legal: 'legal', massmedia: 'massmedia',
};

// ─── Devin config that allows writing to tutor-brain only ────────────────
const DEVIN_CONFIG = {
  permissions: {
    deny: ['Read(**)', 'Exec(**)'],
    allow: ['Write(tutor-brain/**)'],
  },
  version: 1,
  devin: {
    org_id: 'org-274e3112a74e4f089361a351745b2ce9',
  },
  shell: {
    setup_complete: true,
  },
  theme_mode: 'dark',
};
fs.writeFileSync(CONFIG_PATH, JSON.stringify(DEVIN_CONFIG, null, 2));

// ─── Progress tracking (same format as Opus script) ──────────────────────
function loadProgress() {
  if (fs.existsSync(PROGRESS_FILE)) {
    try { return JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf8')); }
    catch { /* fall through */ }
  }
  return {
    batches: {},
    masterPrompt: null,
    decisionTrees: null,
    totalNodes: 0,
    totalBatches: 0,
    startedAt: new Date().toISOString(),
  };
}

function saveProgress(progress) {
  progress.updatedAt = new Date().toISOString();
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2));
}

// ─── Marker file parser (same as Opus script) ────────────────────────────
function extractField(rawContent, name) {
  const regex = new RegExp(
    '^' + name + ':\\s*(?:\\|\\s*\\n)?([\\s\\S]*?)(?=^\\w+:|$)',
    'm'
  );
  const m = rawContent.match(regex);
  if (!m) return '';
  return m[1].trim().replace(/^  /gm, '');
}

function parseNodeSection(nodeId, rawContent) {
  return {
    node_id: nodeId,
    title: extractField(rawContent, 'TITLE').split('\n')[0].trim(),
    definition: extractField(rawContent, 'DEFINITION'),
    text_walkthrough: extractField(rawContent, 'TEXT_WALKTHROUGH'),
    eli5: extractField(rawContent, 'ELI5'),
    common_misconception: extractField(rawContent, 'COMMON_MISCONCEPTION'),
    diagnostic_question: extractField(rawContent, 'DIAGNOSTIC_QUESTION'),
    on_failure: extractField(rawContent, 'ON_FAILURE'),
    cognitive_level: extractField(rawContent, 'COGNITIVE_LEVEL').split('\n')[0].trim(),
    mastery_criteria: extractField(rawContent, 'MASTERY_CRITERIA'),
    scope_boundary: extractField(rawContent, 'SCOPE_BOUNDARY'),
  };
}

function loadAllNodes() {
  const allNodes = [];
  const subjectDirs = Object.keys(SUBJECT_DIRS);

  for (const subj of subjectDirs) {
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
        const parsed = parseNodeSection(section.nodeId, section.content);
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
  const misconception = (node.common_misconception || '').substring(0, 400);
  const eli5 = (node.eli5 || '').substring(0, 200);
  const diagExcerpt = (node.diagnostic_question || '').substring(0, 300);
  return {
    node_id: node.node_id,
    subject: node.subject,
    class_level: node.class_level,
    title: node.title,
    cognitive_level: node.cognitive_level || '',
    eli5_excerpt: eli5,
    misconception_excerpt: misconception,
    diagnostic_excerpt: diagExcerpt,
  };
}

// ─── Load Opus gold-standard examples ────────────────────────────────────
function loadOpusExamples() {
  const examples = [];
  const exampleFiles = [
    'batch_0000.json',
    'batch_0001.json',
    'batch_0002.json',
    'batch_0003.json',
    'batch_0004.json',
  ];
  for (const f of exampleFiles) {
    const fp = path.join(OUTPUT_DIR, f);
    if (fs.existsSync(fp)) {
      try {
        const data = JSON.parse(fs.readFileSync(fp, 'utf8'));
        // Take first 2 nodes from each batch as examples
        for (const node of data.slice(0, 2)) {
          examples.push(node);
        }
      } catch (e) {
        console.log(`  WARNING: Could not load example ${f}: ${e.message}`);
      }
    }
  }
  return examples;
}

// ─── Build prompt with Opus examples as few-shot ─────────────────────────
function buildPrompt(nodes, batchIdx, opusExamples, outputFile) {
  const condensed = nodes.map(condenseNode);
  const nodesJson = JSON.stringify(condensed, null, 2);

  // Build examples string (2-3 Opus examples)
  const exampleNodes = opusExamples.slice(0, 3);
  const examplesJson = JSON.stringify(exampleNodes, null, 2);

  return `You are building the "tutor brain" for an educational platform serving struggling CISCE/ICSE/ISC students in India (Classes 1-12). This is a ONE-TIME build — your output will be used by a small local LLM (Llama 3.2 3B) to classify student messages and package pre-written responses at runtime.

## YOUR TASK
Write a JSON file to: ${outputFile}
Use your write tool with parameters file_path and content to create this file.
Write the ENTIRE JSON in ONE write call.

## QUALITY STANDARD
Below are ${exampleNodes.length} EXAMPLE nodes generated by an expert tutor (Opus). You MUST match this quality and exhaustiveness EXACTLY. Study the patterns carefully:
- ${exampleNodes[0]?.classification_patterns?.length || 17} classification patterns per node (including Hinglish variants like "samjhao", "batao", "nahi samajh")
- ${exampleNodes[0]?.misconception_signatures?.length || 3} misconception signatures per node with 5+ trigger phrases each
- 6+ emotional triggers per node
- 5-step recommended teaching flow
- Detailed "why_wrong" explanations

## EXAMPLE OUTPUT (match this exactly):
${examplesJson}

## INSTRUCTIONS
For each node below, generate an EXHAUSTIVE and DETAILED JSON object with:
1. classification_patterns — 5-8+ phrases a struggling student might type (lowercase, natural language, include Hinglish variants like "samjhao", "batao", "nahi samajh", "confusing hai", include emotional variants like "i don't get it", "this is stupid", "too hard")
2. misconception_signatures — ALL detectable wrong-thinking patterns from the misconception text. Each signature should have 5+ "student_says" trigger phrases, a clear "why_wrong" explanation, and a "correction_template_id"
3. response_template_id — primary template for this node
4. recommended_flow — the optimal teaching sequence (5 ordered template_ids)
5. emotional_triggers — 6+ phrases that indicate this topic is causing frustration

TEMPLATE IDS (use these exact ids):
- "validate_and_reframe", "visual_analogy", "step_by_step_walk", "eli5_simple",
  "misconception_correction", "diagnostic_quiz", "hint_progressive",
  "real_world_application", "prerequisite_review", "emotional_support",
  "socratic_question", "celebrate_and_advance"

INTENT CATEGORIES (use these exact categories):
- "question", "confusion", "misconception", "request_walkthrough", "request_simplify",
  "request_example", "request_test", "request_hint", "frustration",
  "correct_answer", "wrong_answer", "off_topic"

## NODES TO PROCESS (batch ${batchIdx + 1}, ${nodes.length} nodes):
${nodesJson}

## OUTPUT FORMAT
Write a JSON ARRAY of objects, one per node. Each object must have:
{
  "node_id": "...",
  "subject": "...",
  "class_level": N,
  "title": "...",
  "classification_patterns": [
    { "pattern": "...", "intent": "...", "template_id": "...", "confidence": 0.9 }
  ],
  "misconception_signatures": [
    { "id": "...", "student_says": ["...", "..."], "why_wrong": "...", "correction_template_id": "...", "visual_aid": "..." }
  ],
  "response_template_id": "...",
  "recommended_flow": ["...", "...", "...", "...", "..."],
  "emotional_triggers": ["...", "...", "..."]
}

Be EXHAUSTIVE — every possible student phrasing, every misconception variant, every Hinglish expression. Match the example quality EXACTLY.
Write ONLY the JSON array to the file. No commentary, no markdown fences, just pure JSON.`;
}

// ─── Worker data dir isolation (same as c12 pipeline) ────────────────────
const WORKER_DIRS = new Map();

function getWorkerDataDir(workerId) {
  if (WORKER_DIRS.has(workerId)) return WORKER_DIRS.get(workerId);

  const tempDir = os.tmpdir();
  const workerDir = path.join(tempDir, `devin_brain_${workerId}_${Date.now()}`);

  try {
    const realAppData = process.env.APPDATA;
    const realDevinDir = path.join(realAppData, 'devin');
    const workerDevinDir = path.join(workerDir, 'devin');

    fs.mkdirSync(workerDevinDir, { recursive: true });

    // Copy credentials.toml and config.json
    const credFile = path.join(realDevinDir, 'credentials.toml');
    const confFile = path.join(realDevinDir, 'config.json');
    if (fs.existsSync(credFile)) fs.copyFileSync(credFile, path.join(workerDevinDir, 'credentials.toml'));
    if (fs.existsSync(confFile)) fs.copyFileSync(confFile, path.join(workerDevinDir, 'config.json'));

    WORKER_DIRS.set(workerId, workerDir);
    return workerDir;
  } catch (e) {
    console.log(`  [W${workerId}] WARNING: Could not create isolated data dir: ${e.message}`);
    return process.env.APPDATA;
  }
}

// ─── Call GLM via Devin CLI ──────────────────────────────────────────────
function callGlm(prompt, outputFile, workerId, batchId) {
  return new Promise((resolve, reject) => {
    // Write prompt to temp file
    const tempDir = os.tmpdir();
    const promptFile = path.join(tempDir, `brain_prompt_${batchId}_${Date.now()}.txt`);
    fs.writeFileSync(promptFile, prompt, 'utf8');

    const workerDataDir = getWorkerDataDir(workerId);
    const cmd = `devin -p --prompt-file "${promptFile}" --model glm-5-2 --permission-mode dangerous --config "${CONFIG_PATH}" --respect-workspace-trust false`;

    console.log(`  [W${workerId}][${batchId}] Calling GLM-5.2 via Devin CLI...`);

    exec(cmd, {
      cwd: path.resolve(FRONTEND_DIR, '..'),
      encoding: 'utf8',
      timeout: TIMEOUT_MS,
      maxBuffer: 30 * 1024 * 1024,
      env: {
        ...process.env,
        APPDATA: workerDataDir,
      },
    }, (err, stdout, stderr) => {
      // Clean up temp file
      try { fs.unlinkSync(promptFile); } catch (e) {}

      const devinOutput = (stdout || '').trim();
      const devinErr = (stderr || '').trim();

      if (err) {
        if (err.killed || err.signal === 'SIGTERM') {
          reject(new Error('GLM timeout (10min)'));
          return;
        }
      }

      // Check if Devin wrote the file
      if (fs.existsSync(outputFile)) {
        const content = fs.readFileSync(outputFile, 'utf8');
        if (content.trim().length >= 100) {
          console.log(`  [W${workerId}][${batchId}] GLM wrote ${content.length} chars to file`);
          resolve(content);
          return;
        }
      }

      // Fallback: extract JSON from stdout
      if (devinOutput.length >= 100) {
        let extracted = devinOutput;
        // Strip markdown fences
        const fenceMatch = extracted.match(/```(?:json)?\n([\s\S]*?)```/);
        if (fenceMatch) {
          extracted = fenceMatch[1];
        }
        // Find JSON array
        const firstBracket = extracted.indexOf('[');
        const lastBracket = extracted.lastIndexOf(']');
        if (firstBracket >= 0 && lastBracket > firstBracket) {
          extracted = extracted.substring(firstBracket, lastBracket + 1);
        }
        extracted = extracted.trim();
        if (extracted.length >= 100 && extracted.startsWith('[')) {
          console.log(`  [W${workerId}][${batchId}] Extracted ${extracted.length} chars from stdout`);
          fs.writeFileSync(outputFile, extracted, 'utf8');
          resolve(extracted);
          return;
        }
      }

      reject(new Error(`GLM did not produce output. stdout: ${devinOutput.substring(0, 200)} | stderr: ${devinErr.substring(0, 200)}`));
    });
  });
}

// ─── JSON repair (same as Opus script) ───────────────────────────────────
function repairJson(text) {
  let s = text;
  s = s.replace(/```json/g, '').replace(/```/g, '').trim();
  s = s.replace(/\{\s*\{\s*\n/g, '{\n');
  s = s.replace(/\]\s*\n\s*\],/g, '],');
  s = s.replace(/\]\s*\n\s*\]/g, ']');
  s = s.replace(/,\s*([}\]])/g, '$1');
  s = s.replace(/}\s*\n\s*{/g, '},\n{');
  s = s.replace(/},\s*\n\s*\]/g, '}\n]');
  return s;
}

function extractJson(text) {
  try { return JSON.parse(text); } catch { /* try next */ }
  const repaired = repairJson(text);
  try { return JSON.parse(repaired); } catch { /* try next */ }
  const fenceMatch = text.match(/```json\s*([\s\S]*?)```/);
  if (fenceMatch) {
    const r = repairJson(fenceMatch[1]);
    try { return JSON.parse(r); } catch { /* try next */ }
  }
  const firstBracket = repaired.indexOf('[');
  const lastBracket = repaired.lastIndexOf(']');
  if (firstBracket !== -1 && lastBracket !== -1 && lastBracket > firstBracket) {
    try { return JSON.parse(repaired.substring(firstBracket, lastBracket + 1)); } catch { /* fall through */ }
  }
  return null;
}

// ─── Process one batch ───────────────────────────────────────────────────
async function processBatch(batch, batchIdx, workerId, progress, opusExamples) {
  const batchId = `batch_${String(batchIdx).padStart(4, '0')}`;
  const outputFile = path.join(OUTPUT_DIR, `${batchId}.json`);

  // Skip if already completed
  if (progress.batches[batchId]?.status === 'completed') {
    console.log(`  [W${workerId}][${batchId}] SKIP (already completed)`);
    return;
  }

  console.log(`  [W${workerId}][${batchId}] Processing ${batch.length} nodes...`);

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const prompt = buildPrompt(batch, batchIdx, opusExamples, outputFile);
      const rawOutput = await callGlm(prompt, outputFile, workerId, batchId);
      const parsed = extractJson(rawOutput);

      if (!parsed || !Array.isArray(parsed)) {
        // Save raw for debugging
        const rawFile = path.join(OUTPUT_DIR, `${batchId}_raw.txt`);
        fs.writeFileSync(rawFile, rawOutput);
        console.log(`  [W${workerId}][${batchId}] WARNING: Could not parse JSON (attempt ${attempt}), saved raw`);
        if (attempt < MAX_RETRIES) continue;
        progress.batches[batchId] = {
          status: 'parse_failed',
          completedAt: new Date().toISOString(),
          outputFile: rawFile,
        };
        saveProgress(progress);
        return;
      }

      // Write clean JSON
      fs.writeFileSync(outputFile, JSON.stringify(parsed, null, 2));
      progress.batches[batchId] = {
        status: 'completed',
        completedAt: new Date().toISOString(),
        outputFile,
        nodeCount: parsed.length,
        generatedBy: 'glm-5.2',
      };
      saveProgress(progress);
      console.log(`  [W${workerId}][${batchId}] DONE — ${parsed.length} nodes processed`);

      // Force GC to prevent OOM
      if (global.gc) { global.gc(); }
      return;

    } catch (e) {
      console.log(`  [W${workerId}][${batchId}] Attempt ${attempt}/${MAX_RETRIES} failed: ${e.message.substring(0, 100)}`);
      if (attempt < MAX_RETRIES) {
        await new Promise(r => setTimeout(r, 5000));
        continue;
      }
      progress.batches[batchId] = {
        status: 'failed',
        error: e.message,
        completedAt: new Date().toISOString(),
      };
      saveProgress(progress);
    }
  }
}

// ─── Status report ───────────────────────────────────────────────────────
function showStatus(progress, allBatches) {
  const completed = Object.values(progress.batches).filter(b => b.status === 'completed').length;
  const failed = Object.values(progress.batches).filter(b => b.status === 'failed').length;
  const parseFailed = Object.values(progress.batches).filter(b => b.status === 'parse_failed').length;
  const pending = allBatches.length - completed - failed - parseFailed;
  const masterDone = progress.masterPrompt?.status === 'completed';
  const treesDone = progress.decisionTrees?.status === 'completed';

  console.log('\n═══════════════════════════════════════════════════════');
  console.log('  TUTOR BRAIN BUILD STATUS (GLM-5.2)');
  console.log('═══════════════════════════════════════════════════════');
  console.log(`  Node batches:  ${completed}/${allBatches.length} completed, ${failed} failed, ${parseFailed} parse_failed, ${pending} pending`);
  console.log(`  Master prompt: ${masterDone ? 'DONE' : 'PENDING'}`);
  console.log(`  Decision trees: ${treesDone ? 'DONE' : 'PENDING'}`);
  console.log(`  Output dir:    ${OUTPUT_DIR}`);
  console.log('═══════════════════════════════════════════════════════\n');
}

// ─── Main ────────────────────────────────────────────────────────────────
async function main() {
  const args = process.argv.slice(2);
  const statusOnly = args.includes('--status');

  // Load all nodes
  console.log('Loading all enrichment nodes from D:\\cisce...');
  const allNodes = loadAllNodes();
  console.log(`Loaded ${allNodes.length} nodes across ${new Set(allNodes.map(n => n.subject)).size} subjects.\n`);

  // Group into batches
  const batches = [];
  for (let i = 0; i < allNodes.length; i += BATCH_SIZE) {
    batches.push(allNodes.slice(i, i + BATCH_SIZE));
  }
  console.log(`Batched into ${batches.length} batches of ~${BATCH_SIZE} nodes each.\n`);

  // Load progress
  let progress = loadProgress();
  progress.totalNodes = allNodes.length;
  progress.totalBatches = batches.length;
  saveProgress(progress);

  if (statusOnly) {
    showStatus(progress, batches);
    return;
  }

  // Load Opus examples for few-shot prompting
  console.log('Loading Opus gold-standard examples...');
  const opusExamples = loadOpusExamples();
  console.log(`Loaded ${opusExamples.length} Opus example nodes for few-shot prompting.\n`);

  // Build task queue (only pending batches)
  const tasks = [];
  for (let i = 0; i < batches.length; i++) {
    const batchId = `batch_${String(i).padStart(4, '0')}`;
    if (progress.batches[batchId]?.status !== 'completed') {
      tasks.push({ idx: i, batch: batches[i] });
    }
  }

  console.log(`Total pending tasks: ${tasks.length} (skipping ${batches.length - tasks.length} completed)\n`);
  console.log(`Starting GLM-5.2 batch generation with ${NUM_WORKERS} workers...\n`);

  // Run with N workers
  let taskIdx = 0;
  async function worker(workerId) {
    while (taskIdx < tasks.length) {
      const myIdx = taskIdx++;
      const task = tasks[myIdx];
      if (!task) break;
      await processBatch(task.batch, task.idx, workerId, progress, opusExamples);
    }
  }

  const workers = [];
  for (let i = 1; i <= NUM_WORKERS; i++) {
    workers.push(worker(i));
  }
  await Promise.all(workers);

  // Final status
  showStatus(progress, batches);

  // Count results
  const completed = Object.values(progress.batches).filter(b => b.status === 'completed').length;
  const totalNodes = Object.values(progress.batches)
    .filter(b => b.status === 'completed')
    .reduce((sum, b) => sum + (b.nodeCount || 0), 0);

  console.log(`FINAL: ${completed}/${batches.length} batches completed, ${totalNodes} nodes processed`);
  console.log(`\nAll files in: ${OUTPUT_DIR}`);
  console.log('\nTutor brain build complete. Local LLM can now use these files at runtime.');
}

main().catch(e => {
  console.error('FATAL ERROR:', e.message);
  process.exit(1);
});
