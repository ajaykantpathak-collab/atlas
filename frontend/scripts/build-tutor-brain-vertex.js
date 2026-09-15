// =============================================================================
// build-tutor-brain-vertex.js
// -----------------------------------------------------------------------------
// Vertex AI version of the tutor brain builder.
// Uses Gemini 3.1 Pro via Google Cloud Vertex AI (service account auth).
// Direct HTTP calls — no Devin CLI, no agent overhead, no credit burn.
//
// 15 nodes per batch, 10 parallel workers, resumable.
// Includes 3 Opus-generated example nodes as gold-standard few-shot.
//
// Usage:
//   node scripts/build-tutor-brain-vertex.js                # generate all pending
//   node scripts/build-tutor-brain-vertex.js --test         # one batch only
//   node scripts/build-tutor-brain-vertex.js --status       # show status only
//   node scripts/build-tutor-brain-vertex.js --model gemini-3.7-flash  # override model
//
// Env:
//   BRAIN_WORKERS  (default: 10)
// =============================================================================

const fs = require('fs');
const path = require('path');
const https = require('https');
const crypto = require('crypto');

// ─── Config ───────────────────────────────────────────────────────────────
const NUM_WORKERS = parseInt(process.env.BRAIN_WORKERS || '10', 10);
const BATCH_SIZE = 15;
const MAX_TOKENS = 65536;       // Gemini 3.1 Pro supports up to 65536 output tokens
const TEMPERATURE = 0.7;
const MAX_RETRIES = 8;
const RETRY_BASE_DELAY = 5000;  // 5s base, exponential backoff
const MAX_RETRY_DELAY = 120000; // cap at 2 min
const TIMEOUT_MS = 300000;      // 5 min per API call

// Model — default Gemini 3.1 Pro Preview, overridable via --model flag
const args = process.argv.slice(2);
const modelIdx = args.indexOf('--model');
const MODEL = modelIdx !== -1 && args[modelIdx + 1]
  ? args[modelIdx + 1]
  : 'gemini-3.1-pro-preview';
const LOCATION = 'global';

// ─── Paths ────────────────────────────────────────────────────────────────
const CISCE_DIR = 'D:\\cisce';
const FRONTEND_DIR = path.resolve(__dirname, '..');
const OUTPUT_DIR = path.resolve(FRONTEND_DIR, '..', 'tutor-brain');
const PROGRESS_FILE = path.join(OUTPUT_DIR, 'progress.json');
const SERVICE_ACCOUNT_PATH = path.join(__dirname, 'vertex-service-account.json');

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

// ─── Progress tracking (same format as GLM script) ────────────────────────
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

// ─── Marker file parser ───────────────────────────────────────────────────
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

// ─── Load Opus gold-standard examples ────────────────────────────────────
function loadOpusExamples() {
  const examples = [];
  const exampleFiles = [
    'batch_0000.json', 'batch_0001.json', 'batch_0002.json',
    'batch_0003.json', 'batch_0004.json',
  ];
  for (const f of exampleFiles) {
    const fp = path.join(OUTPUT_DIR, f);
    if (fs.existsSync(fp)) {
      try {
        const data = JSON.parse(fs.readFileSync(fp, 'utf8'));
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

// ─── Build prompt (same as GLM script, adapted for direct API) ───────────
function buildPrompt(nodes, batchIdx, opusExamples) {
  const condensed = nodes.map(condenseNode);
  const nodesJson = JSON.stringify(condensed, null, 2);
  const exampleNodes = opusExamples.slice(0, 3);
  const examplesJson = JSON.stringify(exampleNodes, null, 2);

  return `You are building the "tutor brain" for an educational platform serving struggling CISCE/ICSE/ISC students in India (Classes 1-12). This is a ONE-TIME build — your output will be used by a small local LLM (Llama 3.2 3B) to classify student messages and package pre-written responses at runtime.

## YOUR TASK
Generate a JSON array containing one exhaustive object per node below.
Output ONLY the JSON array — no commentary, no markdown fences, just pure valid JSON.

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
Output a JSON ARRAY of objects, one per node. Each object must have:
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
Output ONLY the JSON array. No commentary, no markdown fences, just pure JSON.`;
}

// ─── Service Account Auth (from vertex-pipeline.js) ──────────────────────
function loadServiceAccount() {
  return JSON.parse(fs.readFileSync(SERVICE_ACCOUNT_PATH, 'utf8'));
}

function base64url(input) {
  return Buffer.from(input).toString('base64')
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function getAccessToken(sa) {
  return new Promise((resolve, reject) => {
    const now = Math.floor(Date.now() / 1000);
    const header = { alg: 'RS256', typ: 'JWT' };
    const payload = {
      iss: sa.client_email,
      scope: 'https://www.googleapis.com/auth/cloud-platform',
      aud: sa.token_uri,
      exp: now + 3600,
      iat: now,
    };
    const encodedHeader = base64url(JSON.stringify(header));
    const encodedPayload = base64url(JSON.stringify(payload));
    const signInput = encodedHeader + '.' + encodedPayload;
    const signer = crypto.createSign('RSA-SHA256');
    signer.update(signInput);
    const signature = signer.sign(sa.private_key, 'base64')
      .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    const jwt = signInput + '.' + signature;
    const body = new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }).toString();
    const url = new URL(sa.token_uri);
    const req = https.request({
      hostname: url.hostname,
      path: url.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(body),
      },
    }, (res) => {
      let data = '';
      res.on('data', (c) => data += c);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.access_token) resolve(json.access_token);
          else reject(new Error('No access token: ' + data.substring(0, 200)));
        } catch (e) { reject(e); }
      });
    });
    req.on('error', reject);
    req.setTimeout(30000, () => { req.destroy(); reject(new Error('Auth timeout')); });
    req.write(body);
    req.end();
  });
}

let cachedToken = null;
let tokenExpiry = 0;
async function getToken() {
  if (cachedToken && Date.now() < tokenExpiry - 300000) return cachedToken;
  const sa = loadServiceAccount();
  cachedToken = await getAccessToken(sa);
  tokenExpiry = Date.now() + 3600000;
  return cachedToken;
}

// ─── Vertex AI call ───────────────────────────────────────────────────────
function callVertex(prompt) {
  return new Promise(async (resolve) => {
    let token;
    try { token = await getToken(); }
    catch (e) { resolve({ success: false, error: 'Auth failed: ' + e.message, elapsed: 0 }); return; }

    const sa = loadServiceAccount();
    const body = JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        maxOutputTokens: MAX_TOKENS,
        temperature: TEMPERATURE,
        topP: 0.95,
      },
    });

    const endpoint = LOCATION === 'global'
      ? 'aiplatform.googleapis.com'
      : `${LOCATION}-aiplatform.googleapis.com`;
    const urlPath = `/v1/projects/${sa.project_id}/locations/${LOCATION}/publishers/google/models/${MODEL}:generateContent`;

    const start = Date.now();
    const req = https.request({
      hostname: endpoint,
      path: urlPath,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
      },
    }, (res) => {
      let data = '';
      res.on('data', (c) => data += c);
      res.on('end', () => {
        const elapsed = Math.round((Date.now() - start) / 1000);
        try {
          const json = JSON.parse(data);
          if (json.error) {
            resolve({ success: false, error: json.error.message, elapsed, status: res.statusCode });
            return;
          }
          const text = json.candidates?.[0]?.content?.parts?.[0]?.text || '';
          if (!text || text.length < 100) {
            resolve({ success: false, error: 'Response too short: ' + text.length + ' chars', elapsed, status: res.statusCode, raw: text.substring(0, 200) });
            return;
          }
          resolve({ success: true, text, elapsed, status: res.statusCode });
        } catch (e) {
          resolve({ success: false, error: e.message, elapsed, status: res.statusCode, raw: data.substring(0, 300) });
        }
      });
    });
    req.on('error', (e) => resolve({ success: false, error: 'Network error: ' + e.message, elapsed: 0 }));
    req.on('timeout', () => { req.destroy(); resolve({ success: false, error: 'Request timeout (' + (TIMEOUT_MS / 1000) + 's)', elapsed: TIMEOUT_MS / 1000 }); });
    req.setTimeout(TIMEOUT_MS);
    req.write(body);
    req.end();
  });
}

// ─── Call with retry (exponential backoff) ───────────────────────────────
async function callWithRetry(prompt, tag) {
  let lastError = '';
  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    const result = await callVertex(prompt);
    if (result.success) return result;

    lastError = result.error || 'Unknown error';

    // Don't retry on fatal errors
    const fatalPatterns = ['Invalid', 'disabled', 'not found', 'permission denied', 'unauthorized', 'API key'];
    if (fatalPatterns.some(p => lastError.includes(p))) {
      console.log(`${tag} FATAL (no retry): ${lastError.substring(0, 120)}`);
      return result;
    }

    const isRateLimit = lastError.includes('rate') || lastError.includes('quota') || lastError.includes('429') || result.status === 429;
    const isServerError = result.status >= 500 || lastError.includes('500') || lastError.includes('503') || lastError.includes('overloaded');
    const isTimeout = lastError.includes('timeout') || lastError.includes('Timeout');
    const isNetwork = lastError.includes('Network') || lastError.includes('ECONNRESET') || lastError.includes('socket');

    let delay = RETRY_BASE_DELAY * Math.pow(2, attempt);
    if (isRateLimit) delay = Math.max(delay, 30000);
    delay = Math.min(delay, MAX_RETRY_DELAY);
    delay += Math.random() * 2000;

    const reason = isRateLimit ? 'rate-limit' : isServerError ? 'server-error' : isTimeout ? 'timeout' : isNetwork ? 'network' : 'other';
    console.log(`${tag} Retry ${attempt + 1}/${MAX_RETRIES} in ${(delay / 1000).toFixed(1)}s — [${reason}] ${lastError.substring(0, 100)}`);

    if (attempt < MAX_RETRIES - 1) {
      await new Promise(r => setTimeout(r, delay));
    }
  }
  console.log(`${tag} EXHAUSTED all ${MAX_RETRIES} retries — last error: ${lastError.substring(0, 100)}`);
  return { success: false, error: 'Max retries exceeded: ' + lastError };
}

// ─── JSON repair and extraction ──────────────────────────────────────────
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
  const tag = `[W${workerId}][${batchId}]`;

  // Skip if already completed
  if (progress.batches[batchId]?.status === 'completed') {
    console.log(`${tag} SKIP (already completed)`);
    return { batchId, success: true, skipped: true };
  }

  console.log(`${tag} START — ${batch.length} nodes`);

  const prompt = buildPrompt(batch, batchIdx, opusExamples);
  console.log(`${tag} Prompt: ${(prompt.length / 1024).toFixed(0)} KB`);

  const result = await callWithRetry(prompt, tag);
  if (!result.success) {
    console.error(`${tag} FAIL: ${result.error}`);
    progress.batches[batchId] = {
      status: 'failed',
      error: result.error,
      completedAt: new Date().toISOString(),
    };
    saveProgress(progress);
    return { batchId, success: false, error: result.error };
  }

  console.log(`${tag} Response: ${result.text.length} chars (${result.elapsed}s)`);

  // Save raw response for debugging
  const rawFile = path.join(OUTPUT_DIR, `${batchId}_raw.txt`);
  fs.writeFileSync(rawFile, result.text);

  const parsed = extractJson(result.text);
  if (!parsed || !Array.isArray(parsed)) {
    console.log(`${tag} WARNING: Could not parse JSON, saved raw to ${batchId}_raw.txt`);
    progress.batches[batchId] = {
      status: 'parse_failed',
      completedAt: new Date().toISOString(),
      outputFile: rawFile,
    };
    saveProgress(progress);
    return { batchId, success: false, error: 'JSON parse failed' };
  }

  // Verify node coverage
  const expectedIds = new Set(batch.map(n => n.node_id));
  const gotIds = new Set(parsed.map(n => n.node_id));
  const missing = [...expectedIds].filter(id => !gotIds.has(id));
  const extra = [...gotIds].filter(id => !expectedIds.has(id));

  if (missing.length > 0) {
    console.log(`${tag} WARNING: ${missing.length} missing nodes: ${missing.slice(0, 3).join(', ')}...`);
  }
  if (extra.length > 0) {
    console.log(`${tag} WARNING: ${extra.length} unexpected nodes: ${extra.slice(0, 3).join(', ')}...`);
  }

  // Write clean JSON (atomic — write to temp, rename)
  const tempPath = outputFile + '.tmp';
  fs.writeFileSync(tempPath, JSON.stringify(parsed, null, 2));
  fs.renameSync(tempPath, outputFile);

  // Clean up raw file on success
  try { fs.unlinkSync(rawFile); } catch (e) {}

  progress.batches[batchId] = {
    status: 'completed',
    completedAt: new Date().toISOString(),
    outputFile,
    nodeCount: parsed.length,
    generatedBy: MODEL,
    missingNodes: missing.length > 0 ? missing : undefined,
  };
  saveProgress(progress);

  // Report stats
  const totalPatterns = parsed.reduce((s, n) => s + (n.classification_patterns?.length || 0), 0);
  const totalMisconceptions = parsed.reduce((s, n) => s + (n.misconception_signatures?.length || 0), 0);
  const avgPatterns = (totalPatterns / parsed.length).toFixed(1);
  console.log(`${tag} DONE — ${parsed.length} nodes, ${avgPatterns} patterns/node, ${totalMisconceptions} misconceptions, missing: ${missing.length}`);

  return { batchId, success: true, nodeCount: parsed.length, missingNodes: missing };
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
  console.log('  TUTOR BRAIN BUILD STATUS (Vertex AI — ' + MODEL + ')');
  console.log('═══════════════════════════════════════════════════════');
  console.log(`  Node batches:  ${completed}/${allBatches.length} completed, ${failed} failed, ${parseFailed} parse_failed, ${pending} pending`);
  console.log(`  Master prompt: ${masterDone ? 'DONE' : 'PENDING'}`);
  console.log(`  Decision trees: ${treesDone ? 'DONE' : 'PENDING'}`);
  console.log(`  Output dir:    ${OUTPUT_DIR}`);
  console.log('═══════════════════════════════════════════════════════\n');
}

// ─── Worker pool ─────────────────────────────────────────────────────────
async function runWorkers(tasks, progress, opusExamples) {
  const results = [];
  let nextIdx = 0;
  const total = tasks.length;
  const startTime = Date.now();

  async function worker(workerId) {
    while (true) {
      const idx = nextIdx++;
      if (idx >= total) break;
      const task = tasks[idx];
      try {
        const result = await processBatch(task.batch, task.idx, workerId, progress, opusExamples);
        results.push(result);
        const done = results.length;
        const successCount = results.filter(r => r.success).length;
        const skipCount = results.filter(r => r.skipped).length;
        const elapsed = ((Date.now() - startTime) / 60000).toFixed(1);
        console.log(`  [PROGRESS] ${done}/${total} done — ${successCount} success, ${skipCount} skipped, ${done - successCount} need review (${elapsed}m elapsed)`);
      } catch (e) {
        console.error(`[W${workerId}][batch_${String(task.idx).padStart(4, '0')}] ERROR: ${e.message}`);
        results.push({ batchId: `batch_${String(task.idx).padStart(4, '0')}`, success: false, error: e.message });
      }
    }
  }

  await Promise.all(Array.from({ length: Math.min(NUM_WORKERS, total) }, (_, i) => worker(i + 1)));
  return results;
}

// ─── Main ────────────────────────────────────────────────────────────────
async function main() {
  const isTest = args.includes('--test');
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

  // Load Opus examples
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

  if (isTest) {
    tasks.length = 1;
    console.log(`\n=== VERTEX AI TEST (1 batch) ===`);
  } else {
    console.log(`\n=== VERTEX AI TUTOR BRAIN BUILD ===`);
  }

  console.log(`Model: ${MODEL}`);
  console.log(`Location: ${LOCATION}`);
  console.log(`Workers: ${NUM_WORKERS}`);
  console.log(`Batches: ${tasks.length} pending (${batches.length - tasks.length} already completed)`);
  console.log(`Batch size: ${BATCH_SIZE} nodes`);
  console.log(`Max output tokens: ${MAX_TOKENS}`);
  console.log('');

  if (tasks.length === 0) {
    console.log('All batches done!');
    showStatus(progress, batches);
    return;
  }

  const startTime = Date.now();
  const results = await runWorkers(tasks, progress, opusExamples);
  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);

  // Summary
  const succeeded = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;
  const skipped = results.filter(r => r.skipped).length;

  console.log('\n=== SUMMARY ===');
  console.log(`Model: ${MODEL}`);
  console.log(`Time: ${Math.round(elapsed / 60)}m ${Math.round(elapsed % 60)}s`);
  console.log(`Succeeded: ${succeeded}/${results.length} (skipped: ${skipped})`);
  console.log(`Failed: ${failed}/${results.length}`);

  const needsReview = results.filter(r => !r.success && !r.skipped);
  if (needsReview.length > 0) {
    console.log('\nNeeds review (will retry on next run):');
    for (const r of needsReview) {
      console.log(`  ${r.batchId}: ${r.error || 'unknown'}`);
    }
  }

  // Save summary
  const summaryFile = path.join(__dirname, `tutor-brain-vertex-summary_${Date.now()}.json`);
  fs.writeFileSync(summaryFile, JSON.stringify({
    model: MODEL,
    elapsed,
    succeeded,
    failed,
    skipped,
    total: results.length,
    needsReview: needsReview.map(r => r.batchId),
    results
  }, null, 2));
  console.log(`\nSummary: ${summaryFile}`);

  // Final status
  showStatus(progress, batches);

  console.log(`\nTo retry failed: node scripts/build-tutor-brain-vertex.js`);
  console.log(`To test one:     node scripts/build-tutor-brain-vertex.js --test`);
  console.log(`To check status: node scripts/build-tutor-brain-vertex.js --status`);
}

main().catch(e => {
  console.error('FATAL ERROR:', e.message);
  process.exit(1);
});
