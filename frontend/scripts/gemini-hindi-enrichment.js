// CBSE Hindi Enrichment Generator v2 — properly staggered, Opus-quality prompts
// 5 keys per wave, 60s between waves, strict minimum word counts
//
// Usage:
//   node scripts/gemini-hindi-enrichment.js              # all missing
//   node scripts/gemini-hindi-enrichment.js --dry-run    # show plan only
//   node scripts/gemini-hindi-enrichment.js --class=9    # only class 9

const https = require('https');
const fs = require('fs');
const path = require('path');

// ─── Load 29 keys ────────────────────────────────────────────
const envFile = path.join(__dirname, 'gemini-keys-hindi.env');
const envContent = fs.readFileSync(envFile, 'utf8');
const ALL_KEYS = [];
for (const line of envContent.split('\n')) {
  const m = line.match(/^GEMINI_KEY_\d+=(.+)$/);
  if (m) ALL_KEYS.push(m[1].trim());
}

// ─── Config ──────────────────────────────────────────────────
const MODEL = 'gemini-3.6-flash';
const MAX_TOKENS = 65536;
const MAX_RETRIES = 6;
const BATCH_SIZE = 10; // 10 nodes per call (smaller = deeper content per node)
const KEYS_PER_WAVE = 15; // 15 at a time with 33 keys
const WAVE_BREAK_MS = 20000; // 20s between waves

const NODES_DIR = 'D:\\platform\\cbse_data\\nodes\\by_subject';
const OUTPUT_DIR = 'D:\\platform\\cbse_data\\enrichment';

// Parse args
const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const classArg = args.find(a => a.startsWith('--class='));
const classFilter = classArg ? parseInt(classArg.split('=')[1]) : null;

// ─── Load Hindi nodes (classes 9-12 only) ────────────────────
function loadHindiNodes() {
  const data = JSON.parse(fs.readFileSync(path.join(NODES_DIR, 'Hindi.json'), 'utf8'));
  return data.filter(n => {
    const cls = parseInt(n.class_level);
    if (isNaN(cls) || cls < 9 || cls > 12) return false;
    if (classFilter && cls !== classFilter) return false;
    return true;
  });
}

// ─── Check existing batches ──────────────────────────────────
function getExistingBatches() {
  const existing = new Set();
  if (!fs.existsSync(OUTPUT_DIR)) return existing;
  for (const f of fs.readdirSync(OUTPUT_DIR)) {
    if (!f.startsWith('Hindi_c') || !f.endsWith('.marker')) continue;
    const stat = fs.statSync(path.join(OUTPUT_DIR, f));
    if (stat.size >= 500) existing.add(f.replace('.marker', ''));
  }
  return existing;
}

// ─── Opus-quality example (full node) ────────────────────────
const OPUS_EXAMPLE = `--- NODE c6_hin_cbse_001 ---
TITLE: Butterfly as a Poetic Metaphor for Human Virtues
DEFINITION: |
  A metaphor is a figure of speech in which one thing is described as if it were another, creating a direct comparison that reveals deeper meaning. In this poem, the poet uses the butterfly not merely as an insect but as a living symbol of human virtues — cheerfulness, gentleness, simplicity, and freedom. The butterfly becomes a mirror that reflects the qualities the poet admires in his younger sister. When the poet says the butterfly dances in the forest or carries water in its basket, he is not just describing an insect's behavior; he is painting a picture of a person who moves through life with joy and lightness. This technique allows the poet to express complex emotions about human character through the simple, accessible image of a butterfly that any child can visualize. The metaphor works because butterflies are universally associated with beauty, transformation, and lightness — qualities that align perfectly with the virtues the poet wishes to celebrate. Understanding this metaphor is key to unlocking the poem's emotional core and appreciating how poets use nature imagery to talk about human experiences.
COGNITIVE_LEVEL: understand
MASTERY_CRITERIA: |
  The student can identify the butterfly as a metaphor for human virtues and explain at least two specific qualities the butterfly represents. The student can cite lines from the poem that support the metaphor and describe how the poet connects the butterfly to his younger sister.
SCOPE_BOUNDARY: |
  Do not teach extended metaphor theory or extended metaphor chains -- C9. Do not teach comparative metaphor analysis across multiple poems -- C10. Do not teach the historical development of metaphor as a literary device -- C11.
TEXT_WALKTHROUGH: |
  Imagine you have a little sister who is always smiling, who runs around the house with joy, who never sits still, and who makes everyone around her feel happy. Now imagine you want to describe her to a friend, but instead of saying "my sister is cheerful," you say "she is like a butterfly." That is exactly what the poet does in this poem. The poet sees his younger sister in the butterfly's movements — the way it flutters from flower to flower, the way it seems to dance even when it is just flying, the way it carries tiny drops of water like someone carrying a small basket. Each of these images is not really about the insect; it is about a person. When the butterfly spreads its wings wide, the poet sees his sister's open and generous nature. When the butterfly moves gently through the air, the poet sees his sister's gentle behavior with others. The poet is not writing a science lesson about butterflies. He is using the butterfly as a picture that helps us understand what kind of person his sister is. This is the heart of metaphor — using one familiar thing to help us see another thing more clearly. As you read the poem, try to find every place where the poet describes the butterfly and ask yourself: what human quality is the poet really talking about here?
DIAGNOSTIC_QUESTION:
  Q: In the poem, the butterfly is described as dancing in the forest and carrying water in its basket. What human quality does the poet want us to see through these images, and how is this an example of metaphor?
  A: The poet wants us to see cheerfulness, gentleness, and a carefree nature. This is a metaphor because the butterfly is not literally dancing or carrying a basket — the poet is comparing the butterfly's movements to a person's joyful and gentle behavior, using the insect to represent human virtues.
  LEVEL: reasoning
COMMON_MISCONCEPTION: |
  Misconception 1: The butterfly in the poem is literally the poet's sister who has been transformed. Some students think the sister actually becomes a butterfly. This is incorrect because the poem uses the butterfly as a comparison, not as a literal transformation. The sister and the butterfly are two separate beings being compared.
  Misconception 2: A metaphor must always use "like" or "as." Students often confuse metaphor with simile. A metaphor makes a direct comparison without these words. In this poem, the butterfly IS the symbol of the sister's virtues — the poet does not say the butterfly is LIKE his sister, he uses the butterfly to represent those qualities directly.
  Misconception 3: Metaphors are only found in poetry. Students may think metaphors are special to poems and do not appear in everyday speech. In reality, we use metaphors constantly — when we say "time is money" or "he has a heart of stone," we are using metaphor in ordinary language.
ON_FAILURE: |
  If the student cannot answer the diagnostic question, first review the basic definition of a metaphor — comparing two different things to highlight a shared quality. Then present a simpler example: "The classroom was a zoo" means the class was noisy and chaotic, not that there were animals. Use this everyday metaphor to build understanding before returning to the butterfly poem. Ask the student to name one thing the butterfly does in the poem and one human action that is similar. Guide them to see the connection step by step.`;

// ─── Build prompt with strict minimums ────────────────────────
function buildEnrichmentPrompt(nodesBatch, cls) {
  const nodeLines = nodesBatch.map(n => {
    const nid = n.node_id || '';
    const topic = n.topic || '';
    const chapter = n.chapter_name || n.chapter || '';
    const snippet = (n.content_snippet || '').substring(0, 400);
    const tags = Array.isArray(n.concept_tags) ? n.concept_tags.slice(0, 6).join(', ') : String(n.concept_tags || '');
    const scope = Array.isArray(n.scope_constraints) ? n.scope_constraints.slice(0, 4).join('; ') : String(n.scope_constraints || '');
    return `NODE: ${nid}\n  TOPIC: ${topic}\n  CHAPTER: ${chapter}\n  TAGS: ${tags}\n  CONTENT: ${snippet}\n  SCOPE: ${scope}`;
  });
  const nodesText = nodeLines.join('\n\n');

  return `You are an expert CBSE pedagogy designer generating Opus-quality enrichment content for CBSE Hindi Class ${cls} nodes.

Your output MUST match the depth, precision, and pedagogical quality of the EXAMPLE below. Every field must be equally thorough, specific, and classroom-ready. The example was written by a senior curriculum designer — your output must be indistinguishable in quality.

## EXAMPLE — match this EXACT depth and style

${OPUS_EXAMPLE}

## END EXAMPLE

## STRICT MINIMUM LENGTH REQUIREMENTS (measured in characters):
- TITLE: 40-100 chars (descriptive, include Hindi term in Devanagari if relevant)
- DEFINITION: MINIMUM 800 chars (multi-paragraph, thorough, 150+ words). Explain the concept completely with examples, relationships, and context. Do NOT write a short summary — write a full encyclopedic explanation.
- COGNITIVE_LEVEL: one word (remember|understand|apply|analyze|evaluate|create)
- MASTERY_CRITERIA: MINIMUM 150 chars (1-3 sentences, observable and measurable)
- SCOPE_BOUNDARY: MINIMUM 100 chars (what NOT to teach, "Do not teach X -- C{n}" format)
- TEXT_WALKTHROUGH: MINIMUM 600 chars (200+ words). Walk through the concept step by step as if speaking to a Class ${cls} student. Use analogies, connect to prior knowledge, build understanding gradually. For literature: walk through the actual text, quote key lines in Devanagari. For grammar: give worked examples with Devanagari script.
- DIAGNOSTIC_QUESTION: Q + A + LEVEL. The Q must test deep understanding. The A must be a complete, specific answer a mastery-level student would give (MINIMUM 100 chars).
- COMMON_MISCONCEPTION: MINIMUM 400 chars. List 2-3 misconceptions. For EACH: state the misconception clearly, then explain WHY it is wrong with a specific counterexample.
- ON_FAILURE: MINIMUM 200 chars. Which prerequisite to review, what simpler version to present, what analogy to use.

## RULES:
- Output as plain text in MARKER format
- Use --- NODE <node_id> --- as separator between nodes
- NO JSON, NO markdown headers (##)
- Field names exactly as shown (TITLE:, DEFINITION:, etc.)
- Multi-line fields use YAML-style | indicator
- Class-appropriate for Class ${cls}
- Follow CBSE 2025-26 syllabus strictly
- NO foreign language etymologies (Latin, Greek)
- NO mnemonics
- Hindi literature: discuss in English, quote Hindi text in Devanagari
- Hindi grammar: explain in English, examples in Devanagari
- Include cultural and literary context where relevant
- EVERY field must meet the minimum length requirements above
- If any field is too short, you have FAILED — rewrite it longer

## NODES TO ENRICH (${nodesBatch.length} nodes):

${nodesText}
`;
}

// ─── Call Gemini API ─────────────────────────────────────────
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

// ─── Call with retry ──────────────────────────────────────────
async function callGeminiWithRetry(prompt, key, batchId) {
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      return await callGemini(prompt, key);
    } catch (e) {
      const isRetryable = e.message.includes('503') || e.message.includes('429') || e.message.includes('timeout');
      if (isRetryable && attempt < MAX_RETRIES) {
        const delay = Math.min(15000 * Math.pow(2, attempt - 1), 180000);
        console.log(`  [${batchId}] Retry ${attempt}/${MAX_RETRIES} in ${delay/1000}s — ${e.message}`);
        await new Promise(r => setTimeout(r, delay));
        continue;
      }
      throw e;
    }
  }
}

// ─── Validate response quality ───────────────────────────────
function validateResponse(response, nodeCount) {
  const errors = [];

  // Must have correct number of NODE markers
  const nodeMarkers = (response.match(/--- NODE \S+ ---/g) || []);
  if (nodeMarkers.length < nodeCount) {
    errors.push(`Only ${nodeMarkers.length}/${nodeCount} NODE markers found`);
  }

  // Check for required fields
  const requiredFields = ['TITLE:', 'DEFINITION:', 'COGNITIVE_LEVEL:', 'MASTERY_CRITERIA:', 'SCOPE_BOUNDARY:', 'TEXT_WALKTHROUGH:', 'DIAGNOSTIC_QUESTION:', 'COMMON_MISCONCEPTION:', 'ON_FAILURE:'];
  for (const field of requiredFields) {
    const count = (response.match(new RegExp(field, 'g')) || []).length;
    if (count < nodeCount) {
      errors.push(`${field} appears ${count}/${nodeCount} times`);
    }
  }

  // Check minimum lengths per node
  const nodes = response.split(/--- NODE \S+ ---/).slice(1);
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    const defMatch = node.match(/DEFINITION:\s*\|\s*\n([\s\S]*?)(?=\nCOGNITIVE_LEVEL:)/);
    if (defMatch && defMatch[1].trim().length < 600) {
      errors.push(`Node ${i+1} DEFINITION too short: ${defMatch[1].trim().length} chars (need 800+)`);
    }
    const twMatch = node.match(/TEXT_WALKTHROUGH:\s*\|\s*\n([\s\S]*?)(?=\nDIAGNOSTIC_QUESTION:)/);
    if (twMatch && twMatch[1].trim().length < 400) {
      errors.push(`Node ${i+1} TEXT_WALKTHROUGH too short: ${twMatch[1].trim().length} chars (need 600+)`);
    }
  }

  return { valid: errors.length === 0, errors };
}

// ─── Process one batch ────────────────────────────────────────
async function processBatch(batch, key, keyIdx) {
  const { nodes, cls, batchNum } = batch;
  const batchId = `Hindi_c${cls}_b${batchNum}`;
  const outFile = path.join(OUTPUT_DIR, `${batchId}.marker`);

  // GUARD: never overwrite existing files
  if (fs.existsSync(outFile) && fs.statSync(outFile).size >= 500) {
    console.log(`  [${batchId}][Key${keyIdx+1}] SKIP — already exists`);
    return { batchId, success: true, skipped: true };
  }

  console.log(`  [${batchId}][Key${keyIdx+1}] START — ${nodes.length} nodes`);

  const prompt = buildEnrichmentPrompt(nodes, cls);

  let response;
  try {
    response = await callGeminiWithRetry(prompt, key, batchId);
  } catch (e) {
    console.error(`  [${batchId}][Key${keyIdx+1}] FAIL: ${e.message}`);
    return { batchId, success: false, error: e.message };
  }

  // Validate quality
  const validation = validateResponse(response, nodes.length);
  if (!validation.valid) {
    console.log(`  [${batchId}][Key${keyIdx+1}] QUALITY ISSUES:`);
    validation.errors.forEach(e => console.log(`    ${e}`));
    // Still write it — partial quality is better than nothing, we can retry later
  }

  // Write the file
  fs.writeFileSync(outFile, response, 'utf8');
  const sizeKB = (fs.statSync(outFile).size / 1024).toFixed(1);
  console.log(`  [${batchId}][Key${keyIdx+1}] DONE — ${sizeKB}KB${validation.valid ? '' : ' (quality warnings)'}`);

  return { batchId, success: true, sizeKB, qualityIssues: validation.errors.length };
}

// ─── Sleep ────────────────────────────────────────────────────
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// ─── Main ─────────────────────────────────────────────────────
async function main() {
  console.log(`\n=== CBSE HINDI ENRICHMENT GENERATOR v2 ===`);
  console.log(`  Model: ${MODEL}`);
  console.log(`  Keys: ${ALL_KEYS.length} total, ${KEYS_PER_WAVE} per wave`);
  console.log(`  Wave break: ${WAVE_BREAK_MS/1000}s`);
  console.log(`  Batch size: ${BATCH_SIZE} nodes per call`);
  console.log(`  Output: ${OUTPUT_DIR}`);
  console.log('');

  const nodes = loadHindiNodes();
  console.log(`  Hindi nodes (classes 9-12): ${nodes.length}`);

  // Group by class
  const byClass = {};
  for (const n of nodes) {
    const cls = parseInt(n.class_level);
    if (!byClass[cls]) byClass[cls] = [];
    byClass[cls].push(n);
  }
  for (const cls of Object.keys(byClass).sort((a, b) => a - b)) {
    console.log(`    Class ${cls}: ${byClass[cls].length} nodes`);
  }

  // Build batches
  const allBatches = [];
  for (const cls of Object.keys(byClass).sort((a, b) => a - b)) {
    const classNodes = byClass[cls];
    for (let i = 0; i < classNodes.length; i += BATCH_SIZE) {
      const batch = classNodes.slice(i, i + BATCH_SIZE);
      const batchNum = Math.floor(i / BATCH_SIZE) + 1;
      allBatches.push({ nodes: batch, cls: parseInt(cls), batchNum });
    }
  }

  // Filter existing
  const existing = getExistingBatches();
  const newBatches = allBatches.filter(b => !existing.has(`Hindi_c${b.cls}_b${b.batchNum}`));

  const totalBatches = allBatches.length;
  const totalWaves = Math.ceil(newBatches.length / KEYS_PER_WAVE);

  console.log(`  Total batches: ${totalBatches}`);
  console.log(`  Already done: ${totalBatches - newBatches.length}`);
  console.log(`  To generate: ${newBatches.length} (${totalWaves} waves x ${KEYS_PER_WAVE} keys)`);
  console.log(`  Estimated time: ~${Math.round(totalWaves * 4)} min (${totalWaves} waves x ~4min each)`);
  console.log('');

  if (dryRun) {
    console.log('  DRY RUN — plan:');
    for (let w = 0; w < newBatches.length; w += KEYS_PER_WAVE) {
      const wave = newBatches.slice(w, w + KEYS_PER_WAVE);
      console.log(`    Wave ${Math.floor(w/KEYS_PER_WAVE)+1}: ${wave.map(b => `Hindi_c${b.cls}_b${b.batchNum}`).join(', ')}`);
    }
    return;
  }

  if (newBatches.length === 0) {
    console.log('  All done — nothing to generate.');
    return;
  }

  // Process in small waves — KEYS_PER_WAVE at a time, 60s between waves
  const totalStart = Date.now();
  const allResults = [];

  for (let i = 0; i < newBatches.length; i += KEYS_PER_WAVE) {
    const waveNum = Math.floor(i / KEYS_PER_WAVE) + 1;
    const waveBatches = newBatches.slice(i, i + KEYS_PER_WAVE);
    console.log(`\n--- WAVE ${waveNum}/${totalWaves} (${waveBatches.length} batches) ---`);

    const promises = waveBatches.map((b, j) => {
      const keyIdx = j % ALL_KEYS.length;
      return processBatch(b, ALL_KEYS[keyIdx], keyIdx);
    });

    const results = await Promise.all(promises);
    results.forEach(r => {
      allResults.push(r);
      if (!r.skipped) {
        console.log(`  ${r.success ? 'OK' : 'FAIL'}: ${r.batchId} — ${r.sizeKB || r.error || ''}KB`);
      }
    });

    const successCount = allResults.filter(r => r.success).length;
    const qualityIssues = allResults.filter(r => r.qualityIssues > 0).length;
    console.log(`  [PROGRESS] ${allResults.length}/${newBatches.length} done — ${successCount} success, ${qualityIssues} with quality warnings`);

    // 60s break between waves
    if (i + KEYS_PER_WAVE < newBatches.length) {
      console.log(`  ...waiting ${WAVE_BREAK_MS/1000}s before next wave...`);
      await sleep(WAVE_BREAK_MS);
    }
  }

  const elapsed = Math.round((Date.now() - totalStart) / 1000);
  const succeeded = allResults.filter(r => r.success).length;
  const failed = allResults.filter(r => !r.success).length;
  const qualityWarnings = allResults.filter(r => r.qualityIssues > 0).length;

  console.log(`\n=== SUMMARY ===`);
  console.log(`Success: ${succeeded}/${newBatches.length}`);
  console.log(`Failed: ${failed}/${newBatches.length}`);
  console.log(`Quality warnings: ${qualityWarnings}/${newBatches.length}`);
  console.log(`Time: ${Math.round(elapsed/60)}m ${elapsed%60}s`);

  if (failed > 0) {
    console.log(`\nFailed:`);
    allResults.filter(r => !r.success).forEach(r => console.log(`  ${r.batchId}: ${r.error}`));
  }

  if (qualityWarnings > 0) {
    console.log(`\nQuality warnings (fields too short — may need regeneration):`);
    allResults.filter(r => r.qualityIssues > 0).forEach(r => console.log(`  ${r.batchId}: ${r.qualityIssues} issues`));
  }

  // Save log
  const logFile = path.join(__dirname, `hindi_enrichment_v2_log_${Date.now()}.json`);
  fs.writeFileSync(logFile, JSON.stringify({
    model: MODEL, elapsed, success: succeeded, fail: failed, qualityWarnings, results: allResults,
  }, null, 2));
  console.log(`\nLog: ${logFile}`);
}

main().catch(e => { console.error('FATAL:', e); process.exit(1); });
