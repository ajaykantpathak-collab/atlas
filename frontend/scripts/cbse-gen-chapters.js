// CBSE Content Generation Pipeline — Phase 1: Chapter Node Generation
// Uses gemini-3.5-flash with 39 keys, 20 calls each = 780 call budget
// Exponential backoff, per-key call tracking, NEVER overwrites existing data
//
// Generates 87 missing chapter node structures → NEW files only
//
// Usage:
//   node cbse-gen-chapters.js --dry-run     # show plan only
//   node cbse-gen-chapters.js               # run it
//   node cbse-gen-chapters.js --class=9     # only class 9

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
const MAX_TOKENS = 65536;
const MAX_RETRIES = 5;
const KEYS_PER_WAVE = 13;  // 3 waves with 39 keys
const WAVE_BREAK_MS = 15000;  // 15s between waves
const MAX_CALLS_PER_KEY = 20;  // hard limit

const OUTPUT_DIR = 'D:\\platform\\cbse_data\\generated';

// Per-key call counter — persisted to disk
const CALL_COUNT_FILE = path.join(OUTPUT_DIR, '_call_counts.json');
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

// ─── Missing chapters definition ──────────────────────────────
const MISSING_CHAPTERS = {
  6: {
    science: [
      { chapter: "The Wonderful World of Science", subject: "science", est_nodes: 8 },
      { chapter: "Temperature and its Measurement", subject: "science", est_nodes: 8 },
    ],
    social_science: [
      { chapter: "The Earth in the Solar System", subject: "social_science", est_nodes: 12, sub: "Geography" },
      { chapter: "Globe: Latitudes and Longitudes", subject: "social_science", est_nodes: 12, sub: "Geography" },
      { chapter: "Motions of the Earth", subject: "social_science", est_nodes: 10, sub: "Geography" },
      { chapter: "Maps", subject: "social_science", est_nodes: 10, sub: "Geography" },
      { chapter: "Major Domains of the Earth", subject: "social_science", est_nodes: 12, sub: "Geography" },
      { chapter: "Major Landforms of the Earth", subject: "social_science", est_nodes: 12, sub: "Geography" },
      { chapter: "Our Country India", subject: "social_science", est_nodes: 10, sub: "Geography" },
      { chapter: "India: Climate Vegetation and Wildlife", subject: "social_science", est_nodes: 10, sub: "Geography" },
      { chapter: "Understanding Diversity", subject: "social_science", est_nodes: 10, sub: "Civics" },
      { chapter: "Diversity and Discrimination", subject: "social_science", est_nodes: 10, sub: "Civics" },
      { chapter: "What is Government?", subject: "social_science", est_nodes: 10, sub: "Civics" },
      { chapter: "Key Elements of a Democratic Government", subject: "social_science", est_nodes: 10, sub: "Civics" },
      { chapter: "Panchayati Raj", subject: "social_science", est_nodes: 10, sub: "Civics" },
      { chapter: "Rural Administration", subject: "social_science", est_nodes: 10, sub: "Civics" },
      { chapter: "Urban Administration", subject: "social_science", est_nodes: 10, sub: "Civics" },
      { chapter: "Rural Livelihoods", subject: "social_science", est_nodes: 10, sub: "Civics" },
      { chapter: "Urban Livelihoods", subject: "social_science", est_nodes: 10, sub: "Civics" },
    ],
  },
  8: {
    science: [
      { chapter: "Exploring the Investigative World of Science", subject: "science", est_nodes: 10 },
      { chapter: "The Invisible Living World: Beyond Our Naked Eye", subject: "science", est_nodes: 12 },
      { chapter: "Health: The Ultimate Treasure", subject: "science", est_nodes: 12 },
      { chapter: "Exploring Forces", subject: "science", est_nodes: 12 },
      { chapter: "Pressure, Winds, Storms, and Cyclones", subject: "science", est_nodes: 12 },
      { chapter: "Particulate Nature of Matter", subject: "science", est_nodes: 12 },
      { chapter: "The Amazing World of Solutes, Solvents, and Solutions", subject: "science", est_nodes: 12 },
    ],
    mathematics: [
      { chapter: "A Square and A Cube", subject: "mathematics", est_nodes: 12 },
      { chapter: "Power Play", subject: "mathematics", est_nodes: 12 },
      { chapter: "A Story of Numbers", subject: "mathematics", est_nodes: 12 },
      { chapter: "Quadrilaterals", subject: "mathematics", est_nodes: 12 },
      { chapter: "Number Play", subject: "mathematics", est_nodes: 12 },
      { chapter: "We Distribute, Yet Things Multiply", subject: "mathematics", est_nodes: 12 },
      { chapter: "Fractions in Disguise", subject: "mathematics", est_nodes: 12 },
      { chapter: "The Baudhayana-Pythagoras Theorem", subject: "mathematics", est_nodes: 12 },
      { chapter: "Proportional Reasoning II", subject: "mathematics", est_nodes: 12 },
      { chapter: "Exploring Some Geometric Themes", subject: "mathematics", est_nodes: 12 },
      { chapter: "Tales by Dots and Lines", subject: "mathematics", est_nodes: 12 },
      { chapter: "Algebra Play", subject: "mathematics", est_nodes: 12 },
    ],
  },
  9: {
    science: [
      { chapter: "Matter in Our Surroundings", subject: "science", est_nodes: 12 },
      { chapter: "Is Matter Around Us Pure", subject: "science", est_nodes: 12 },
      { chapter: "Atoms and Molecules", subject: "science", est_nodes: 12 },
      { chapter: "The Fundamental Unit of Life", subject: "science", est_nodes: 12 },
      { chapter: "Tissues", subject: "science", est_nodes: 12 },
      { chapter: "Diversity in Living Organisms", subject: "science", est_nodes: 12 },
      { chapter: "Gravitation", subject: "science", est_nodes: 12 },
      { chapter: "Why Do We Fall Ill", subject: "science", est_nodes: 12 },
      { chapter: "Natural Resources", subject: "science", est_nodes: 12 },
      { chapter: "Improvement in Food Resources", subject: "science", est_nodes: 12 },
    ],
    mathematics: [
      { chapter: "Number Systems", subject: "mathematics", est_nodes: 12 },
      { chapter: "Coordinate Geometry", subject: "mathematics", est_nodes: 12 },
      { chapter: "Linear Equations in Two Variables", subject: "mathematics", est_nodes: 12 },
      { chapter: "Introduction to Euclid's Geometry", subject: "mathematics", est_nodes: 12 },
      { chapter: "Lines and Angles", subject: "mathematics", est_nodes: 12 },
      { chapter: "Triangles", subject: "mathematics", est_nodes: 12 },
      { chapter: "Heron's Formula", subject: "mathematics", est_nodes: 12 },
      { chapter: "Surface Areas and Volumes", subject: "mathematics", est_nodes: 12 },
      { chapter: "Statistics", subject: "mathematics", est_nodes: 12 },
      { chapter: "Probability", subject: "mathematics", est_nodes: 12 },
    ],
    social_science: [
      { chapter: "The French Revolution", subject: "social_science", est_nodes: 12, sub: "History" },
      { chapter: "Socialism in Europe and the Russian Revolution", subject: "social_science", est_nodes: 12, sub: "History" },
      { chapter: "Nazism and the Rise of Hitler", subject: "social_science", est_nodes: 12, sub: "History" },
      { chapter: "Forest Society and Colonialism", subject: "social_science", est_nodes: 12, sub: "History" },
      { chapter: "Pastoralists in the Modern World", subject: "social_science", est_nodes: 12, sub: "History" },
      { chapter: "What is Democracy? Why Democracy?", subject: "social_science", est_nodes: 12, sub: "Civics" },
      { chapter: "Constitutional Design", subject: "social_science", est_nodes: 12, sub: "Civics" },
      { chapter: "Electoral Politics", subject: "social_science", est_nodes: 12, sub: "Civics" },
      { chapter: "Working of Institutions", subject: "social_science", est_nodes: 12, sub: "Civics" },
      { chapter: "Democratic Rights", subject: "social_science", est_nodes: 12, sub: "Civics" },
      { chapter: "The Story of Village Palampur", subject: "social_science", est_nodes: 12, sub: "Economics" },
      { chapter: "People as Resource", subject: "social_science", est_nodes: 12, sub: "Economics" },
      { chapter: "Poverty as a Challenge", subject: "social_science", est_nodes: 12, sub: "Economics" },
      { chapter: "Food Security in India", subject: "social_science", est_nodes: 12, sub: "Economics" },
    ],
  },
  10: {
    science: [
      { chapter: "Acids, Bases and Salts", subject: "science", est_nodes: 12 },
      { chapter: "Metals and Non-metals", subject: "science", est_nodes: 12 },
      { chapter: "Carbon and its Compounds", subject: "science", est_nodes: 12 },
      { chapter: "Periodic Classification of Elements", subject: "science", est_nodes: 12 },
      { chapter: "Control and Coordination", subject: "science", est_nodes: 12 },
      { chapter: "How do Organisms Reproduce", subject: "science", est_nodes: 12 },
      { chapter: "Heredity and Evolution", subject: "science", est_nodes: 12 },
      { chapter: "Light — Reflection and Refraction", subject: "science", est_nodes: 12 },
      { chapter: "Sources of Energy", subject: "science", est_nodes: 12 },
      { chapter: "Management of Natural Resources", subject: "science", est_nodes: 12 },
    ],
    mathematics: [
      { chapter: "Coordinate Geometry", subject: "mathematics", est_nodes: 12 },
      { chapter: "Constructions", subject: "mathematics", est_nodes: 10 },
      { chapter: "Surface Areas and Volumes", subject: "mathematics", est_nodes: 12 },
      { chapter: "Statistics", subject: "mathematics", est_nodes: 12 },
      { chapter: "Probability", subject: "mathematics", est_nodes: 10 },
    ],
  },
};

// ─── Get available key (under call limit) ─────────────────────
// Round-robin with call tracking — each wave starts from a different key
let keyRotationIdx = 0;
function getAvailableKey() {
  // Try all keys starting from rotation index
  for (let attempt = 0; attempt < ALL_KEYS.length; attempt++) {
    const i = (keyRotationIdx + attempt) % ALL_KEYS.length;
    const keyId = `key_${i + 1}`;
    const used = callCounts[keyId] || 0;
    if (used < MAX_CALLS_PER_KEY) {
      callCounts[keyId] = used + 1;
      saveCallCounts(callCounts);
      keyRotationIdx = (i + 1) % ALL_KEYS.length; // next call starts from next key
      return { key: ALL_KEYS[i], index: i + 1, remaining: MAX_CALLS_PER_KEY - used - 1 };
    }
  }
  return null; // all keys exhausted
}

// ─── Call Gemini with exponential backoff ─────────────────────
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

// ─── Call with exponential backoff + key rotation on 429 ──────
async function callWithRetry(prompt, keyInfo, label) {
  let currentKey = keyInfo;
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      return await callGemini(prompt, currentKey.key);
    } catch (e) {
      const isRetryable = e.message.includes('503') || e.message.includes('429') || e.message.includes('timeout') || e.message.includes('Timeout');
      if (isRetryable && attempt < MAX_RETRIES) {
        // Exponential backoff: 10s, 20s, 40s, 80s, 160s
        const delay = Math.min(10000 * Math.pow(2, attempt - 1), 180000);
        
        // On 429, try switching to a different key
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

// ─── Build chapter generation prompt ──────────────────────────
function buildChapterPrompt(cls, chapterInfo) {
  const { chapter, subject, est_nodes, sub } = chapterInfo;
  const subStr = sub ? ` (Sub: ${sub})` : '';
  
  return `You are an expert CBSE curriculum designer. Generate atomic curriculum nodes for a CBSE Class ${cls} ${subject} chapter.

## CHAPTER TO GENERATE
- Class: ${cls}
- Subject: ${subject}${subStr}
- Chapter: ${chapter}
- Estimated nodes: ${est_nodes}

## RULES
1. Generate ${est_nodes} atomic curriculum nodes for this chapter
2. Each node = ONE atomic concept that can be taught in 20-30 minutes
3. Follow CBSE 2025-26 syllabus strictly
4. NO foreign language etymologies (Latin, Greek, etc.)
5. NO mnemonics
6. Class-appropriate content for Class ${cls}
7. Nodes should build on each other sequentially within the chapter
8. First node should be introductory, last should be synthesis/application

## OUTPUT FORMAT — JSON array
Output ONLY a JSON array, no markdown, no explanation. Each node object:

{
  "node_id": "c${cls}_${subject === 'science' ? 'sci' : subject === 'mathematics' ? 'math' : subject === 'social_science' ? 'soc' : 'gen'}_cbse_XXX",
  "topic": "Specific atomic concept name",
  "subject": "${subject}",
  "chapter": "${chapter}",
  "class_level": ${cls},
  "difficulty": "easy|intermediate|advanced",
  "estimated_time": 20,
  "is_root": false,
  "concept_tags": ["tag1", "tag2", "tag3"],
  "scope_constraints": ["what to teach", "what NOT to teach"],
  "prerequisite_node_ids": ["c${cls}_..._cbse_XXX"],
  "forward_node_ids": ["c${cls}_..._cbse_XXX"],
  "cross_subject_prereqs": [],
  "prerequisite_reasons": {},
  "forward_reasons": {},
  "cross_subject_reasons": {},
  "content_snippet": "2-3 sentence description of what this node teaches"
}

## NODE ID SCHEME
Use sequential 3-digit numbers starting from 900 (to avoid collision with existing nodes).
Example: c${cls}_${subject === 'science' ? 'sci' : subject === 'mathematics' ? 'math' : 'soc'}_cbse_900, c${cls}_${subject === 'science' ? 'sci' : subject === 'mathematics' ? 'math' : 'soc'}_cbse_901, etc.

## PREREQUISITE CHAIN
- Node 900: is_root=true, no prerequisites
- Node 901: prerequisite = [900]
- Node 902: prerequisite = [901]
- etc.
- Each node should have forward_node_ids pointing to the next node(s)

Generate the full JSON array now:`;
}

// ─── Process one chapter ──────────────────────────────────────
async function processChapter(cls, chapterInfo, keyInfo) {
  const { chapter, subject } = chapterInfo;
  const safeName = chapter.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 50);
  const outFile = path.join(OUTPUT_DIR, `class_${cls}_${subject}_${safeName}.json`);
  const label = `C${cls}_${safeName.substring(0, 30)}`;

  // GUARD: never overwrite existing files
  if (fs.existsSync(outFile) && fs.statSync(outFile).size >= 200) {
    console.log(`  [${label}][Key${keyInfo.index}] SKIP — already exists`);
    return { label, success: true, skipped: true };
  }

  console.log(`  [${label}][Key${keyInfo.index}] START — ${chapter}`);

  const prompt = buildChapterPrompt(cls, chapterInfo);

  let response;
  try {
    response = await callWithRetry(prompt, keyInfo, label);
  } catch (e) {
    console.error(`  [${label}][Key${keyInfo.index}] FAIL: ${e.message}`);
    return { label, success: false, error: e.message };
  }

  // Clean response — strip markdown fences if present
  let cleaned = response.trim();
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '');
  }

  // Validate JSON
  let nodes;
  try {
    nodes = JSON.parse(cleaned);
    if (!Array.isArray(nodes)) {
      throw new Error('Response is not a JSON array');
    }
  } catch (e) {
    console.error(`  [${label}][Key${keyInfo.index}] JSON PARSE FAIL: ${e.message}`);
    // Save raw response for manual inspection
    fs.writeFileSync(outFile + '.raw', response, 'utf8');
    return { label, success: false, error: `JSON parse: ${e.message}` };
  }

  // Write the file
  fs.writeFileSync(outFile, JSON.stringify(nodes, null, 2), 'utf8');
  const sizeKB = (fs.statSync(outFile).size / 1024).toFixed(1);
  console.log(`  [${label}][Key${keyInfo.index}] DONE — ${nodes.length} nodes, ${sizeKB}KB`);

  return { label, success: true, nodeCount: nodes.length, sizeKB };
}

// ─── Sleep ────────────────────────────────────────────────────
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// ─── Main ─────────────────────────────────────────────────────
async function main() {
  // Ensure output dir exists
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const classArg = args.find(a => a.startsWith('--class='));
  const classFilter = classArg ? parseInt(classArg.split('=')[1]) : null;

  console.log(`\n=== CBSE CHAPTER GENERATION PIPELINE ===`);
  console.log(`  Model: ${MODEL}`);
  console.log(`  Keys: ${ALL_KEYS.length} total, ${MAX_CALLS_PER_KEY} calls each = ${ALL_KEYS.length * MAX_CALLS_PER_KEY} total budget`);
  console.log(`  Wave size: ${KEYS_PER_WAVE} parallel`);
  console.log(`  Wave break: ${WAVE_BREAK_MS/1000}s`);
  console.log(`  Output: ${OUTPUT_DIR}`);
  console.log('');

  // Build work queue
  const workQueue = [];
  for (const cls of Object.keys(MISSING_CHAPTERS).sort((a, b) => a - b)) {
    if (classFilter && parseInt(cls) !== classFilter) continue;
    for (const subject of Object.keys(MISSING_CHAPTERS[cls])) {
      for (const chapterInfo of MISSING_CHAPTERS[cls][subject]) {
        workQueue.push({ cls: parseInt(cls), chapterInfo });
      }
    }
  }

  // Check which already exist
  const toGenerate = [];
  for (const item of workQueue) {
    const { cls, chapterInfo } = item;
    const safeName = chapterInfo.chapter.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 50);
    const outFile = path.join(OUTPUT_DIR, `class_${cls}_${chapterInfo.subject}_${safeName}.json`);
    if (fs.existsSync(outFile) && fs.statSync(outFile).size >= 200) {
      // already done
    } else {
      toGenerate.push(item);
    }
  }

  console.log(`  Total chapters: ${workQueue.length}`);
  console.log(`  Already done: ${workQueue.length - toGenerate.length}`);
  console.log(`  To generate: ${toGenerate.length}`);
  
  // Show call budget
  const totalUsed = Object.values(callCounts).reduce((a, b) => a + b, 0);
  const totalBudget = ALL_KEYS.length * MAX_CALLS_PER_KEY;
  console.log(`  Calls used so far: ${totalUsed}/${totalBudget}`);
  console.log(`  Calls needed: ${toGenerate.length}`);
  console.log(`  Calls remaining after: ${totalBudget - totalUsed - toGenerate.length}`);
  console.log('');

  if (dryRun) {
    console.log('  DRY RUN — chapters to generate:');
    for (const item of toGenerate) {
      console.log(`    C${item.cls} ${item.chapterInfo.subject}: ${item.chapterInfo.chapter}`);
    }
    return;
  }

  if (toGenerate.length === 0) {
    console.log('  All done — nothing to generate.');
    return;
  }

  // Process in waves
  const totalStart = Date.now();
  const allResults = [];
  const totalWaves = Math.ceil(toGenerate.length / KEYS_PER_WAVE);

  for (let i = 0; i < toGenerate.length; i += KEYS_PER_WAVE) {
    const waveNum = Math.floor(i / KEYS_PER_WAVE) + 1;
    const waveItems = toGenerate.slice(i, i + KEYS_PER_WAVE);
    console.log(`\n--- WAVE ${waveNum}/${totalWaves} (${waveItems.length} chapters) ---`);

    const promises = waveItems.map((item) => {
      const keyInfo = getAvailableKey();
      if (!keyInfo) {
        console.error(`  NO KEYS AVAILABLE — all ${ALL_KEYS.length} keys exhausted!`);
        return Promise.resolve({ label: item.chapterInfo.chapter, success: false, error: 'No keys available' });
      }
      return processChapter(item.cls, item.chapterInfo, keyInfo);
    });

    const results = await Promise.all(promises);
    results.forEach(r => allResults.push(r));

    const successCount = allResults.filter(r => r.success).length;
    const failCount = allResults.filter(r => !r.success).length;
    const skippedCount = allResults.filter(r => r.skipped).length;
    console.log(`  [PROGRESS] ${allResults.length}/${toGenerate.length} done — ${successCount} success, ${failCount} failed, ${skippedCount} skipped`);

    // Check key budget
    const remainingBudget = totalBudget - Object.values(callCounts).reduce((a, b) => a + b, 0);
    console.log(`  [BUDGET] ${remainingBudget} calls remaining`);

    if (remainingBudget <= 0) {
      console.error(`  BUDGET EXHAUSTED — stopping. ${toGenerate.length - allResults.length} chapters not generated.`);
      break;
    }

    // Wave break
    if (i + KEYS_PER_WAVE < toGenerate.length) {
      console.log(`  ...waiting ${WAVE_BREAK_MS/1000}s before next wave...`);
      await sleep(WAVE_BREAK_MS);
    }
  }

  const elapsed = Math.round((Date.now() - totalStart) / 1000);
  const succeeded = allResults.filter(r => r.success && !r.skipped).length;
  const failed = allResults.filter(r => !r.success).length;
  const skipped = allResults.filter(r => r.skipped).length;
  const totalNodes = allResults.filter(r => r.nodeCount).reduce((a, r) => a + r.nodeCount, 0);

  console.log(`\n=== SUMMARY ===`);
  console.log(`Success: ${succeeded}/${toGenerate.length}`);
  console.log(`Failed: ${failed}/${toGenerate.length}`);
  console.log(`Skipped (already existed): ${skipped}`);
  console.log(`Total nodes generated: ${totalNodes}`);
  console.log(`Time: ${Math.round(elapsed/60)}m ${elapsed%60}s`);
  console.log(`Calls used: ${Object.values(callCounts).reduce((a, b) => a + b, 0)}/${totalBudget}`);

  if (failed > 0) {
    console.log(`\nFailed chapters:`);
    allResults.filter(r => !r.success).forEach(r => console.log(`  ${r.label}: ${r.error}`));
  }

  // Save log
  const logFile = path.join(OUTPUT_DIR, `_chapter_gen_log_${Date.now()}.json`);
  fs.writeFileSync(logFile, JSON.stringify({
    model: MODEL, elapsed, success: succeeded, fail: failed, skipped,
    totalNodes, results: allResults,
    callCounts: callCounts,
  }, null, 2));
  console.log(`\nLog: ${logFile}`);
}

main().catch(e => { console.error('FATAL:', e); process.exit(1); });
