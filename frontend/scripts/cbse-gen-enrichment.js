// CBSE Enrichment Generation Pipeline — Phase 2
// Generates enrichment for 1004 new nodes + 129 existing unmatched nodes = 1133 nodes
// Uses gemini-3.5-flash, 2 nodes per call = 567 calls needed, 674 remaining
// Output: .marker files (plain text, matching existing enrichment format)
//
// Usage:
//   node cbse-gen-enrichment.js --dry-run          # show plan only
//   node cbse-gen-enrichment.js                    # run all
//   node cbse-gen-enrichment.js --new-only         # only new chapter nodes
//   node cbse-gen-enrichment.js --existing-only    # only existing unmatched nodes
//   node cbse-gen-enrichment.js --class=9          # filter by class

const https = require('https');
const fs = require('fs');
const path = require('path');

// ─── Load 39 keys ─────────────────────────────────────────────
const envFile = path.join(__dirname, 'gemini-keys-39.env');
const envContent = fs.readFileSync(envFile, 'utf8');
const ALL_KEYS = [];
for (const line of envContent.split('\n')) {
  const m = line.match(/^GEMINI_KEY_\d+=(.+)$/);
  if (m) ALL_KEYS.push(m[1].trim());
}

// ─── Config ───────────────────────────────────────────────────
const MODEL = 'gemini-3.5-flash';
const MAX_TOKENS = 65536;  // maximum allowed
const MAX_RETRIES = 5;
const KEYS_PER_WAVE = 13;
const WAVE_BREAK_MS = 15000;
const MAX_CALLS_PER_KEY = 20;
const BATCH_SIZE = 2;  // 2 nodes per call for deep content

const GENERATED_DIR = 'D:\\platform\\cbse_data\\generated';
const COMPLETE_DIR = 'D:\\platform\\cbse_data\\nodes\\by_class';
const ENRICH_DIR = 'D:\\platform\\cbse_data\\enrichment';

// Per-key call counter — shared with chapter gen, persisted to disk
const CALL_COUNT_FILE = path.join(GENERATED_DIR, '_call_counts.json');
function loadCallCounts() {
  if (fs.existsSync(CALL_COUNT_FILE)) {
    return JSON.parse(fs.readFileSync(CALL_COUNT_FILE, 'utf8'));
  }
  return {};
}
function saveCallCounts(counts) {
  fs.writeFileSync(CALL_COUNT_FILE, JSON.stringify(counts, null, 2));
}
let callCounts = loadCallCounts();

// ─── Round-robin key rotation ─────────────────────────────────
let keyRotationIdx = 0;
function getAvailableKey() {
  for (let attempt = 0; attempt < ALL_KEYS.length; attempt++) {
    const i = (keyRotationIdx + attempt) % ALL_KEYS.length;
    const keyId = `key_${i + 1}`;
    const used = callCounts[keyId] || 0;
    if (used < MAX_CALLS_PER_KEY) {
      callCounts[keyId] = used + 1;
      saveCallCounts(callCounts);
      keyRotationIdx = (i + 1) % ALL_KEYS.length;
      return { key: ALL_KEYS[i], index: i + 1, remaining: MAX_CALLS_PER_KEY - used - 1 };
    }
  }
  return null;
}

// ─── Call Gemini with exponential backoff + key rotation ──────
function callGemini(prompt, key) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.7, topP: 0.9, maxOutputTokens: MAX_TOKENS },
      safetySettings: [
        { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
        { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
        { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
        { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
      ],
    });
    const apiPath = `/v1beta/models/${MODEL}:generateContent?key=${key}`;
    const req = https.request({
      hostname: 'generativelanguage.googleapis.com',
      path: apiPath, method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) },
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            const json = JSON.parse(data);
            if (json.error) { reject(new Error(`API error: ${json.error.message}`)); return; }
            const text = json.candidates?.[0]?.content?.parts?.[0]?.text;
            if (!text || text.length < 200) { reject(new Error(`Response too short: ${text?.length || 0} chars`)); return; }
            resolve(text);
          } catch (e) { reject(new Error(`Parse error: ${e.message}`)); }
        } else if (res.statusCode === 503) { reject(new Error('503 overloaded')); }
        else if (res.statusCode === 429) { reject(new Error('429 rate limited')); }
        else { reject(new Error(`API ${res.statusCode}: ${data.substring(0, 200)}`)); }
      });
    });
    req.on('error', (e) => reject(new Error(`Network: ${e.message}`)));
    req.setTimeout(300000, () => { req.destroy(); reject(new Error('Timeout 5min')); });
    req.write(body); req.end();
  });
}

async function callWithRetry(prompt, keyInfo, label) {
  let currentKey = keyInfo;
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      return await callGemini(prompt, currentKey.key);
    } catch (e) {
      const isRetryable = e.message.includes('503') || e.message.includes('429') || e.message.includes('timeout') || e.message.includes('Timeout');
      if (isRetryable && attempt < MAX_RETRIES) {
        const delay = Math.min(10000 * Math.pow(2, attempt - 1), 180000);
        if (e.message.includes('429')) {
          const newKey = getAvailableKey();
          if (newKey) {
            console.log(`  [${label}][Key${currentKey.index}→${newKey.index}] Retry ${attempt}/${MAX_RETRIES} in ${delay/1000}s — switching key (429)`);
            currentKey = newKey;
          } else {
            console.log(`  [${label}][Key${currentKey.index}] Retry ${attempt}/${MAX_RETRIES} in ${delay/1000}s — ${e.message} (no keys left)`);
          }
        } else {
          console.log(`  [${label}][Key${currentKey.index}] Retry ${attempt}/${MAX_RETRIES} in ${delay/1000}s — ${e.message}`);
        }
        await new Promise(r => setTimeout(r, delay));
        continue;
      }
      throw e;
    }
  }
}

// ─── Opus-quality example for prompt ──────────────────────────
const OPUS_EXAMPLE = `--- NODE c6_sci_cbse_900 ---
TITLE: Curiosity and the Definition of Science
DEFINITION: |
  Science is a systematic way of exploring, questioning, and understanding the natural world around us, driven by human curiosity. It is not merely a collection of facts but a method of inquiry — a structured process through which we observe phenomena, ask questions, form hypotheses, test them through experiments, and draw conclusions. Science begins with wonder: a child seeing a rainbow and asking why it appears, a farmer noticing that certain crops grow better in particular soils, or a student wondering why the sky changes color at sunset. These questions are the seeds of scientific thinking. What makes science different from casual observation is its systematic nature — it follows a method that includes careful observation, measurement, experimentation, and analysis. Scientists record their observations precisely so that others can repeat their experiments and verify their findings. This process of verification is what gives science its reliability. Science also evolves — what we believe today may be refined or changed tomorrow as new evidence emerges. This openness to revision is a strength, not a weakness. For a Class 6 student, the key insight is that science is not something confined to laboratories or textbooks — it is a way of looking at the world with curiosity and asking "why" and "how" about everything around us.
COGNITIVE_LEVEL: understand
MASTERY_CRITERIA: |
  The student can explain in their own words that science is a systematic method of inquiry driven by curiosity. The student can give at least two examples of everyday phenomena that raise scientific questions and describe how a scientist might investigate them.
SCOPE_BOUNDARY: |
  Do not teach the formal steps of the scientific method in detail -- that comes in later classes. Do not teach the history of scientific revolutions or philosophy of science. Focus on building curiosity and the idea that science is a way of asking and answering questions about the natural world.
TEXT_WALKTHROUGH: |
  Imagine you are walking through a garden and you see a butterfly land on a flower. You might think "oh, a butterfly!" and keep walking. But a scientist — even a young one — stops and asks questions. Why did the butterfly choose that particular flower? Does it prefer certain colors? How does it taste the nectar? This is the first lesson of science: curiosity. Science starts with noticing things and asking questions about them. Now, you might wonder, "Isn't science just about memorizing facts from a textbook?" No! Facts are the results of science, but the heart of science is the process of finding those facts. Think of it like cooking — you can memorize a recipe, but understanding why you add salt or why the oven needs to be at a certain temperature makes you a real cook, not just a recipe-follower. Science works the same way. You observe something (like water boiling), you ask a question (why does it boil?), you think of a possible answer (maybe heat makes water turn into steam), you test it (you heat water and watch), and you share what you found. That whole process — observe, question, test, share — is science. And anyone can do it, including you.
DIAGNOSTIC_QUESTION:
  Q: Your friend says "Science is just a bunch of facts we memorize from textbooks." Using an example from everyday life, explain why your friend is wrong and what science really is.
  A: Science is not just facts — it is a way of finding answers. For example, if you notice that plants grow differently in sunlight vs shade, you can ask why, test by growing plants in both conditions, measure their growth, and share your findings. The facts come from this process of questioning and testing, not from memorization.
  LEVEL: reasoning
COMMON_MISCONCEPTION: |
  Misconception 1: Science is only done in laboratories by scientists in white coats. This is incorrect because science is a method of inquiry that anyone can practice. A farmer testing which fertilizer works best is doing science. A student comparing how fast ice melts in sun vs shade is doing science.
  Misconception 2: Scientific facts never change. Students may think that once a fact is in the textbook, it is permanent. In reality, scientific understanding evolves as new evidence emerges. For example, people once believed the Earth was flat, but evidence showed it is round.
  Misconception 3: Science can answer all questions. Some questions — like "what is the meaning of life?" or "what is morally right?" — are not scientific questions. Science addresses questions about the natural world that can be tested through observation and experiment.
ON_FAILURE: |
  If the student cannot explain what science is, start with a simpler question: "What do you do when you are curious about something?" Guide them to see that asking questions, observing, and trying things out is the beginning of science. Use a concrete example like "Why do we feel hungry?" — we observe, ask, investigate, and find answers about our body. Connect this to the idea that science is this same process applied systematically.`;

// ─── Build enrichment prompt ──────────────────────────────────
function buildEnrichmentPrompt(nodesBatch, cls) {
  const nodeLines = nodesBatch.map(n => {
    const nid = n.node_id || '';
    const topic = n.topic || '';
    const chapter = n.chapter || '';
    const snippet = (n.content_snippet || '').substring(0, 400);
    const tags = Array.isArray(n.concept_tags) ? n.concept_tags.slice(0, 6).join(', ') : String(n.concept_tags || '');
    const scope = Array.isArray(n.scope_constraints) ? n.scope_constraints.slice(0, 4).join('; ') : String(n.scope_constraints || '');
    const difficulty = n.difficulty || 'intermediate';
    return `NODE: ${nid}\n  TOPIC: ${topic}\n  CHAPTER: ${chapter}\n  DIFFICULTY: ${difficulty}\n  TAGS: ${tags}\n  CONTENT: ${snippet}\n  SCOPE: ${scope}`;
  });
  const nodesText = nodeLines.join('\n\n');

  return `You are an expert CBSE pedagogy designer generating Opus-quality enrichment content for CBSE Class ${cls} nodes.

Your output MUST match the depth, precision, and pedagogical quality of the EXAMPLE below. Every field must be equally thorough, specific, and classroom-ready.

## EXAMPLE — match this EXACT depth and style

${OPUS_EXAMPLE}

## END EXAMPLE

## STRICT MINIMUM LENGTH REQUIREMENTS (measured in characters):
- TITLE: 40-100 chars (descriptive, specific to the concept)
- DEFINITION: MINIMUM 800 chars (multi-paragraph, thorough, 150+ words). Explain the concept completely with examples, relationships, and context. Do NOT write a short summary — write a full encyclopedic explanation.
- COGNITIVE_LEVEL: one word (remember|understand|apply|analyze|evaluate|create)
- MASTERY_CRITERIA: MINIMUM 150 chars (1-3 sentences, observable and measurable)
- SCOPE_BOUNDARY: MINIMUM 100 chars (what NOT to teach, "Do not teach X -- C{n}" format)
- TEXT_WALKTHROUGH: MINIMUM 600 chars (200+ words). Walk through the concept step by step as if speaking to a Class ${cls} student. Use analogies, connect to prior knowledge, build understanding gradually.
- DIAGNOSTIC_QUESTION: Q + A + LEVEL. The Q must test deep understanding. The A must be a complete, specific answer a mastery-level student would give (MINIMUM 100 chars).
- COMMON_MISCONCEPTION: MINIMUM 400 chars. List 2-3 misconceptions. For EACH: state the misconception clearly, then explain WHY it is wrong with a specific counterexample.
- ON_FAILURE: MINIMUM 200 chars. Which prerequisite to review, what simpler version to present, what analogy to use.

## RULES:
- Output as plain text in MARKER format (NOT JSON, NOT markdown)
- Use --- NODE <node_id> --- as separator between nodes
- Field names exactly as shown (TITLE:, DEFINITION:, etc.)
- Multi-line fields use YAML-style | indicator
- Class-appropriate for Class ${cls}
- Follow CBSE 2025-26 syllabus strictly
- NO foreign language etymologies (Latin, Greek, Italian, etc.)
- NO mnemonics (P-P-O-A-A, F-C-Q-E-A-Q-C, R-W-L, etc.)
- Include cultural context where relevant (Indian context preferred)
- EVERY field must meet the minimum length requirements above
- If any field is too short, you have FAILED — rewrite it longer

## NODES TO ENRICH (${nodesBatch.length} nodes):

${nodesText}
`;
}

// ─── Load new nodes from generated chapter files ──────────────
function loadNewNodes(classFilter) {
  const nodes = [];
  if (!fs.existsSync(GENERATED_DIR)) return nodes;
  for (const f of fs.readdirSync(GENERATED_DIR)) {
    if (!f.startsWith('class_') || !f.endsWith('.json')) continue;
    if (classFilter && !f.startsWith(`class_${classFilter}_`)) continue;
    const data = JSON.parse(fs.readFileSync(path.join(GENERATED_DIR, f), 'utf8'));
    for (const n of data) {
      // Check if enrichment already exists
      const enrichFile = path.join(ENRICH_DIR, `${n.node_id}.marker`);
      if (!fs.existsSync(enrichFile) || fs.statSync(enrichFile).size < 200) {
        nodes.push(n);
      }
    }
  }
  return nodes;
}

// ─── Load existing unmatched nodes ─────────────────────────────
function loadExistingUnmatched(classFilter) {
  const nodes = [];
  const filesMap = {
    6: ['class_6_science_complete.json', 'class_6_maths_complete.json', 'class_6_social_complete.json', 'class_6_hindi_english_complete.json'],
    7: ['class_7_complete.json'],
    8: ['class_8_complete.json'],
    9: ['class_9_complete.json'],
    10: ['class_10_complete.json'],
    11: ['class_11_complete.json'],
    12: ['class_12_complete.json'],
  };
  for (const cls of Object.keys(filesMap)) {
    if (classFilter && parseInt(cls) !== classFilter) continue;
    for (const fname of filesMap[cls]) {
      const fpath = path.join(COMPLETE_DIR, fname);
      if (!fs.existsSync(fpath)) continue;
      const data = JSON.parse(fs.readFileSync(fpath, 'utf8'));
      for (const n of data) {
        if (!n.enrichment || Object.keys(n.enrichment).length === 0) {
          nodes.push(n);
        }
      }
    }
  }
  return nodes;
}

// ─── Validate response quality ────────────────────────────────
function validateResponse(response, nodeCount) {
  const errors = [];
  const nodeMarkers = (response.match(/--- NODE \S+ ---/g) || []);
  if (nodeMarkers.length < nodeCount) {
    errors.push(`Only ${nodeMarkers.length}/${nodeCount} NODE markers found`);
  }
  const requiredFields = ['TITLE:', 'DEFINITION:', 'COGNITIVE_LEVEL:', 'MASTERY_CRITERIA:', 'SCOPE_BOUNDARY:', 'TEXT_WALKTHROUGH:', 'DIAGNOSTIC_QUESTION:', 'COMMON_MISCONCEPTION:', 'ON_FAILURE:'];
  for (const field of requiredFields) {
    const count = (response.match(new RegExp(field, 'g')) || []).length;
    if (count < nodeCount) {
      errors.push(`${field} appears ${count}/${nodeCount} times`);
    }
  }
  return { valid: errors.length === 0, errors };
}

// ─── Process one batch ────────────────────────────────────────
async function processBatch(batch, keyInfo) {
  const { nodes, cls, batchNum, source } = batch;
  const batchId = `${source}_c${cls}_b${batchNum}`;
  const outFile = path.join(ENRICH_DIR, `${batchId}.marker`);
  const label = batchId;

  // GUARD: never overwrite existing files
  if (fs.existsSync(outFile) && fs.statSync(outFile).size >= 500) {
    console.log(`  [${label}][Key${keyInfo.index}] SKIP — already exists`);
    return { batchId, success: true, skipped: true };
  }

  console.log(`  [${label}][Key${keyInfo.index}] START — ${nodes.length} nodes`);

  const prompt = buildEnrichmentPrompt(nodes, cls);

  let response;
  try {
    response = await callWithRetry(prompt, keyInfo, label);
  } catch (e) {
    console.error(`  [${label}][Key${keyInfo.index}] FAIL: ${e.message}`);
    return { batchId, success: false, error: e.message };
  }

  // Validate quality
  const validation = validateResponse(response, nodes.length);
  if (!validation.valid) {
    console.log(`  [${label}][Key${keyInfo.index}] QUALITY ISSUES:`);
    validation.errors.forEach(e => console.log(`    ${e}`));
  }

  // Write the file
  fs.writeFileSync(outFile, response, 'utf8');
  const sizeKB = (fs.statSync(outFile).size / 1024).toFixed(1);
  console.log(`  [${label}][Key${keyInfo.index}] DONE — ${sizeKB}KB${validation.valid ? '' : ' (quality warnings)'}`);

  return { batchId, success: true, sizeKB, qualityIssues: validation.errors.length };
}

// ─── Sleep ────────────────────────────────────────────────────
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// ─── Main ─────────────────────────────────────────────────────
async function main() {
  if (!fs.existsSync(ENRICH_DIR)) fs.mkdirSync(ENRICH_DIR, { recursive: true });

  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const newOnly = args.includes('--new-only');
  const existingOnly = args.includes('--existing-only');
  const classArg = args.find(a => a.startsWith('--class='));
  const classFilter = classArg ? parseInt(classArg.split('=')[1]) : null;

  console.log(`\n=== CBSE ENRICHMENT GENERATION PIPELINE ===`);
  console.log(`  Model: ${MODEL}`);
  console.log(`  Max output tokens: ${MAX_TOKENS}`);
  console.log(`  Keys: ${ALL_KEYS.length} total, ${MAX_CALLS_PER_KEY} calls each = ${ALL_KEYS.length * MAX_CALLS_PER_KEY} total budget`);
  console.log(`  Batch size: ${BATCH_SIZE} nodes per call`);
  console.log(`  Wave size: ${KEYS_PER_WAVE} parallel`);
  console.log(`  Output: ${ENRICH_DIR} (.marker files)`);
  console.log('');

  // Load nodes to enrich
  let allNodes = [];
  if (!existingOnly) {
    const newNodes = loadNewNodes(classFilter);
    console.log(`  New chapter nodes needing enrichment: ${newNodes.length}`);
    allNodes.push(...newNodes.map(n => ({ ...n, _source: 'new' })));
  }
  if (!newOnly) {
    const existingNodes = loadExistingUnmatched(classFilter);
    console.log(`  Existing unmatched nodes needing enrichment: ${existingNodes.length}`);
    allNodes.push(...existingNodes.map(n => ({ ...n, _source: 'exist' })));
  }

  // Group by class
  const byClass = {};
  for (const n of allNodes) {
    const cls = parseInt(n.class_level) || parseInt((n.node_id || '').match(/c(\d+)_/)?.[1] || 0);
    if (!byClass[cls]) byClass[cls] = [];
    byClass[cls].push(n);
  }

  // Build batches
  const allBatches = [];
  for (const cls of Object.keys(byClass).sort((a, b) => a - b)) {
    const classNodes = byClass[cls];
    for (let i = 0; i < classNodes.length; i += BATCH_SIZE) {
      const batch = classNodes.slice(i, i + BATCH_SIZE);
      const batchNum = Math.floor(i / BATCH_SIZE) + 1;
      const source = batch[0]._source;
      allBatches.push({ nodes: batch, cls: parseInt(cls), batchNum, source });
    }
  }

  // Check existing batches
  const toGenerate = allBatches.filter(b => {
    const batchId = `${b.source}_c${b.cls}_b${b.batchNum}`;
    const outFile = path.join(ENRICH_DIR, `${batchId}.marker`);
    return !fs.existsSync(outFile) || fs.statSync(outFile).size < 500;
  });

  const totalUsed = Object.values(callCounts).reduce((a, b) => a + b, 0);
  const totalBudget = ALL_KEYS.length * MAX_CALLS_PER_KEY;
  const remainingBudget = totalBudget - totalUsed;

  console.log(`\n  Total batches: ${allBatches.length}`);
  console.log(`  Already done: ${allBatches.length - toGenerate.length}`);
  console.log(`  To generate: ${toGenerate.length}`);
  console.log(`  Calls used so far: ${totalUsed}/${totalBudget}`);
  console.log(`  Calls needed: ${toGenerate.length}`);
  console.log(`  Budget after: ${remainingBudget - toGenerate.length}`);

  if (dryRun) {
    console.log('\n  DRY RUN — batches to generate:');
    for (const b of toGenerate) {
      console.log(`    ${b.source}_c${b.cls}_b${b.batchNum}: ${b.nodes.map(n => n.node_id).join(', ')}`);
    }
    return;
  }

  if (toGenerate.length === 0) {
    console.log('  All done — nothing to generate.');
    return;
  }

  if (toGenerate.length > remainingBudget) {
    console.error(`  NOT ENOUGH BUDGET! Need ${toGenerate.length} but only ${remainingBudget} calls remaining.`);
    console.error(`  Generating what we can (${remainingBudget} batches)...`);
  }

  // Process in waves
  const totalStart = Date.now();
  const allResults = [];
  const totalWaves = Math.ceil(toGenerate.length / KEYS_PER_WAVE);

  for (let i = 0; i < toGenerate.length; i += KEYS_PER_WAVE) {
    const waveNum = Math.floor(i / KEYS_PER_WAVE) + 1;
    const waveBatches = toGenerate.slice(i, i + KEYS_PER_WAVE);
    console.log(`\n--- WAVE ${waveNum}/${totalWaves} (${waveBatches.length} batches) ---`);

    const promises = waveBatches.map((b) => {
      const keyInfo = getAvailableKey();
      if (!keyInfo) {
        console.error(`  NO KEYS AVAILABLE — all keys exhausted!`);
        return Promise.resolve({ batchId: b.batchId, success: false, error: 'No keys available' });
      }
      return processBatch(b, keyInfo);
    });

    const results = await Promise.all(promises);
    results.forEach(r => allResults.push(r));

    const successCount = allResults.filter(r => r.success).length;
    const failCount = allResults.filter(r => !r.success).length;
    const skippedCount = allResults.filter(r => r.skipped).length;
    const currentBudget = totalBudget - Object.values(callCounts).reduce((a, b) => a + b, 0);
    console.log(`  [PROGRESS] ${allResults.length}/${toGenerate.length} done — ${successCount} success, ${failCount} failed, ${skippedCount} skipped`);
    console.log(`  [BUDGET] ${currentBudget} calls remaining`);

    if (currentBudget <= 0) {
      console.error(`  BUDGET EXHAUSTED — stopping. ${toGenerate.length - allResults.length} batches not generated.`);
      break;
    }

    if (i + KEYS_PER_WAVE < toGenerate.length) {
      console.log(`  ...waiting ${WAVE_BREAK_MS/1000}s before next wave...`);
      await sleep(WAVE_BREAK_MS);
    }
  }

  const elapsed = Math.round((Date.now() - totalStart) / 1000);
  const succeeded = allResults.filter(r => r.success && !r.skipped).length;
  const failed = allResults.filter(r => !r.success).length;
  const skipped = allResults.filter(r => r.skipped).length;

  console.log(`\n=== SUMMARY ===`);
  console.log(`Success: ${succeeded}/${toGenerate.length}`);
  console.log(`Failed: ${failed}/${toGenerate.length}`);
  console.log(`Skipped: ${skipped}`);
  console.log(`Time: ${Math.round(elapsed/60)}m ${elapsed%60}s`);
  console.log(`Calls used: ${Object.values(callCounts).reduce((a, b) => a + b, 0)}/${totalBudget}`);

  if (failed > 0) {
    console.log(`\nFailed batches:`);
    allResults.filter(r => !r.success).forEach(r => console.log(`  ${r.batchId}: ${r.error}`));
  }

  // Save log
  const logFile = path.join(GENERATED_DIR, `_enrichment_gen_log_${Date.now()}.json`);
  fs.writeFileSync(logFile, JSON.stringify({
    model: MODEL, elapsed, success: succeeded, fail: failed, skipped,
    results: allResults, callCounts,
  }, null, 2));
  console.log(`\nLog: ${logFile}`);
}

main().catch(e => { console.error('FATAL:', e); process.exit(1); });
