// =============================================================================
// build-tutor-brain.js
// -----------------------------------------------------------------------------
// ONE-TIME Opus batch generation script that builds the "tutor brain" — a set
// of JSON files that a local LLM (Llama 3.2 3B / Phi-3) loads at runtime to
// classify student input, identify misconceptions, and package pre-written
// enrichment content into natural tutor responses.
//
// Opus is used ONLY for this one-time build. After it completes, the local
// LLM takes over and Opus is never needed again for everyday tutoring.
//
// Deliverables produced in D:\dream_app\tutor-brain\:
//   1. classification-taxonomy.json   — intent patterns per node
//   2. misconception-signatures.json   — detectable wrong-thinking patterns
//   3. response-templates.json         — packaging templates per intent
//   4. master-system-prompt.md         — the prompt that makes local LLM a tutor
//   5. decision-trees.json             — when to teach/test/remediate/escalate
//
// Usage:
//   node scripts/build-tutor-brain.js              # all batches, auto-start in 36min
//   node scripts/build-tutor-brain.js --now        # start immediately
//   node scripts/build-tutor-brain.js --now --batch-size 30   # smaller batches
//   node scripts/build-tutor-brain.js --only master-prompt    # just the master prompt
//   node scripts/build-tutor-brain.js --only decision-trees   # just decision trees
//   node scripts/build-tutor-brain.js --only batches           # just node batches
//   node scripts/build-tutor-brain.js --status                # show progress only
//
// Resumable: completed batches are skipped on re-run.
//
// IMPORTANT: Run with --expose-gc to prevent OOM on long runs:
//   node --expose-gc scripts/build-tutor-brain.js --now
// =============================================================================

const https = require('https');
const fs = require('fs');
const path = require('path');

// ─── Opus API Config ──────────────────────────────────────────────────────
const OPUS_API_KEYS = [
  'sk-ant-opm-qH49u7v5dZynlQC9oCWKU495ePdy_Xfd',
  'sk-ant-opm-71R9wtEucISZPpEWPa9bYvANSWu3NjX-',
];
const OPUS_API_HOST = 'api.opusmax.pro';
const PRIMARY_MODEL = 'claude-opus-4-6';
const MAX_TOKENS = 32000;           // Output tokens per call (need enough for 20 nodes of JSON)
const THINKING_BUDGET = 10000;      // Thinking budget for deep reasoning
const NUM_WORKERS = 2;              // 2 workers (one per key, no key sharing)
const RPM_LIMIT = 40;               // 40 req/min to be safe
const REQUEST_GAP_MS = Math.ceil(60000 / RPM_LIMIT); // 1500ms between starts
const MAX_RETRIES = 5;
const RETRY_BASE_DELAY = 5000;
const BATCH_SIZE = 15;              // Nodes per batch (15 nodes × ~800 tokens exhaustive = 12K output, fits in 22K)
const AUTO_START_DELAY_MS = 36 * 60 * 1000; // 36 min — matches quota reset

// ─── Paths ────────────────────────────────────────────────────────────────
const CISCE_DIR = 'D:\\cisce';
const OUTPUT_DIR = path.resolve(__dirname, '..', '..', 'tutor-brain');
const PROGRESS_FILE = path.join(OUTPUT_DIR, 'progress.json');

fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// ─── Subject directories (same mapping as opus-c6-12-pipeline) ───────────
const SUBJECT_DIRS = {
  physics: 'physics', maths: 'maths', chem: 'chem', bio: 'bio', cs: 'cs',
  biotech: 'biotech', appmath: 'appmath', evs: 'evs',
  acc: 'acc', bs: 'bs', econ: 'econ', econapp: 'econapp',
  comm: 'comm', commapp: 'commapp', commstud: 'commstud',
  geo: 'geo', histciv: 'histciv', pol: 'pol',
  psy: 'psy', soc: 'soc', home: 'home', legal: 'legal', massmedia: 'massmedia',
};

// ─── Rate Limiter (simple semaphore) ──────────────────────────────────────
class RateLimiter {
  constructor(gapMs) {
    this.gapMs = gapMs;
    this.lastRequest = 0;
    this.queue = [];
    this.running = false;
  }
  async acquire() {
    return new Promise((resolve) => {
      this.queue.push(resolve);
      this._drain();
    });
  }
  async _drain() {
    if (this.running) return;
    this.running = true;
    while (this.queue.length > 0) {
      const now = Date.now();
      const elapsed = now - this.lastRequest;
      if (elapsed < this.gapMs) {
        await new Promise(r => setTimeout(r, this.gapMs - elapsed));
      }
      this.lastRequest = Date.now();
      const resolve = this.queue.shift();
      resolve();
    }
    this.running = false;
  }
}
const rateLimiter = new RateLimiter(REQUEST_GAP_MS);

// ─── Progress tracking (resumable) ────────────────────────────────────────
function loadProgress() {
  if (fs.existsSync(PROGRESS_FILE)) {
    try { return JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf8')); }
    catch { /* fall through */ }
  }
  return {
    batches: {},        // batchId -> { status, completedAt, outputFile }
    masterPrompt: null, // { status, completedAt }
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

// ─── Marker file parser ──────────────────────────────────────────────────
// Extracts structured fields from each node section in a marker file.
function parseNodeSection(nodeId, rawContent) {
  // Helper: extract a YAML-like block field (FIELD: |  \n  multi-line text)
  function extractField(name) {
    // Match "FIELD:" followed by "|" or inline, then capture until next field or end
    const regex = new RegExp(
      '^' + name + ':\\s*(?:\\|\\s*\\n)?([\\s\\S]*?)(?=^\\w+:|$)',
      'm'
    );
    const m = rawContent.match(regex);
    if (!m) return '';
    // Clean up: dedent, strip trailing whitespace per line
    let text = m[1].trim();
    // Remove leading indentation (2 spaces typical)
    text = text.replace(/^  /gm, '');
    return text;
  }

  return {
    node_id: nodeId,
    title: extractField('TITLE').split('\n')[0].trim(),
    definition: extractField('DEFINITION'),
    text_walkthrough: extractField('TEXT_WALKTHROUGH'),
    eli5: extractField('ELI5'),
    common_misconception: extractField('COMMON_MISCONCEPTION'),
    diagnostic_question: extractField('DIAGNOSTIC_QUESTION'),
    on_failure: extractField('ON_FAILURE'),
    cognitive_level: extractField('COGNITIVE_LEVEL').split('\n')[0].trim(),
    mastery_criteria: extractField('MASTERY_CRITERIA'),
    scope_boundary: extractField('SCOPE_BOUNDARY'),
  };
}

// Load ALL nodes from ALL subjects
function loadAllNodes() {
  const allNodes = [];
  const subjectDirs = Object.keys(SUBJECT_DIRS);

  for (const subj of subjectDirs) {
    const enrDir = path.join(CISCE_DIR, subj, 'enrichment');
    if (!fs.existsSync(enrDir)) continue;

    const files = fs.readdirSync(enrDir).filter(f => f.endsWith('.marker'));
    for (const fileName of files) {
      const filePath = path.join(enrDir, fileName);
      const content = fs.readFileSync(filePath, 'utf8');

      // Split into node sections
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
        // Extract class level from node_id (e.g., "c10_math_001" → 10)
        const classMatch = section.nodeId.match(/^c(\d+)_/);
        parsed.class_level = classMatch ? parseInt(classMatch[1], 10) : null;
        if (parsed.title) {
          allNodes.push(parsed);
        }
      }
    }
  }

  return allNodes;
}

// ─── Condense a node for the Opus prompt (save tokens) ───────────────────
function condenseNode(node) {
  // Send enough context for Opus to write exhaustive classification patterns
  const misconception = (node.common_misconception || '').substring(0, 400);
  const eli5 = (node.eli5 || '').substring(0, 200);
  const diagExcerpt = (node.diagnostic_question || '').substring(0, 300);
  const title = node.title;
  const cognitive = node.cognitive_level || '';

  return {
    node_id: node.node_id,
    subject: node.subject,
    class_level: node.class_level,
    title,
    cognitive_level: cognitive,
    eli5_excerpt: eli5,
    misconception_excerpt: misconception,
    diagnostic_excerpt: diagExcerpt,
  };
}

// ─── Opus API call ────────────────────────────────────────────────────────
async function callOpus(prompt, keyIdx) {
  await rateLimiter.acquire();

  return new Promise((resolve, reject) => {
    const key = OPUS_API_KEYS[keyIdx % OPUS_API_KEYS.length];
    const body = JSON.stringify({
      model: PRIMARY_MODEL,
      max_tokens: MAX_TOKENS,
      thinking: { type: 'enabled', budget_tokens: THINKING_BUDGET },
      messages: [{ role: 'user', content: prompt }],
    });

    const options = {
      hostname: OPUS_API_HOST,
      path: '/v1/messages',
      method: 'POST',
      headers: {
        'x-api-key': key,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            const json = JSON.parse(data);
            const textBlock = json.content?.find(b => b.type === 'text');
            const text = textBlock?.text || '';
            if (text.includes('Usage limit reached') || text.includes('quota')) {
              reject(new Error('QUOTA_EXHAUSTED'));
              return;
            }
            if (!text || text.length < 100) {
              reject(new Error(`Response too short: ${text?.length || 0} chars`));
              return;
            }
            resolve({ text, usage: json.usage });
          } catch (e) {
            reject(new Error(`Parse error: ${e.message}. Raw: ${data.substring(0, 300)}`));
          }
        } else if (res.statusCode === 429) {
          reject(new Error('429 rate limited'));
        } else if (res.statusCode === 529) {
          reject(new Error('529 overloaded'));
        } else {
          reject(new Error(`API error ${res.statusCode}: ${data.substring(0, 300)}`));
        }
      });
    });

    req.on('error', (e) => reject(new Error(`Network error: ${e.message}`)));
    req.setTimeout(600000, () => {
      req.destroy();
      reject(new Error('Request timeout (10min)'));
    });
    req.write(body);
    req.end();
  });
}

// ─── Call with retry + key failover ───────────────────────────────────────
async function callOpusWithRetry(prompt, taskId, workerId, batchIdx) {
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    // Alternate keys per batch so both get used evenly
    // batch 0 → key 0, batch 1 → key 1, batch 2 → key 0, etc.
    // On retry, switch to the other key
    const keyIdx = batchIdx !== undefined
      ? (batchIdx + attempt - 1) % OPUS_API_KEYS.length
      : (workerId - 1 + attempt - 1) % OPUS_API_KEYS.length;
    try {
      const result = await callOpus(prompt, keyIdx);
      return result;
    } catch (e) {
      const isQuota = e.message.includes('QUOTA_EXHAUSTED');
      const isRetryable = e.message.includes('429') || e.message.includes('529') ||
                          e.message.includes('timeout') || e.message.includes('overloaded') ||
                          isQuota;

      if (isQuota) {
        // Try the other key first
        if (OPUS_API_KEYS.length > 1 && attempt === 1) {
          const otherKeyIdx = (keyIdx + 1) % OPUS_API_KEYS.length;
          console.log(`  [W${workerId}][${taskId}] Key${keyIdx+1} quota hit, trying Key${otherKeyIdx+1}...`);
          try {
            const result = await callOpus(prompt, otherKeyIdx);
            return result;
          } catch (e2) {
            if (e2.message.includes('QUOTA_EXHAUSTED')) {
              const delay = 300000; // 5 min
              console.log(`  [W${workerId}][${taskId}] Both keys quota-limited, waiting ${delay/1000}s...`);
              await new Promise(r => setTimeout(r, delay));
              continue;
            }
            throw e2;
          }
        }
        const delay = 300000;
        console.log(`  [W${workerId}][${taskId}] Quota exhausted, waiting ${delay/1000}s (attempt ${attempt}/${MAX_RETRIES})...`);
        await new Promise(r => setTimeout(r, delay));
        continue;
      }

      if (isRetryable && attempt < MAX_RETRIES) {
        const delay = Math.min(RETRY_BASE_DELAY * Math.pow(2, attempt - 1), 60000);
        console.log(`  [W${workerId}][${taskId}] Retry ${attempt}/${MAX_RETRIES} in ${delay/1000}s — ${e.message.substring(0, 80)}`);
        await new Promise(r => setTimeout(r, delay));
        continue;
      }
      throw e;
    }
  }
  throw new Error(`Max retries exceeded for ${taskId}`);
}

// ─── Extract JSON from Opus response (handles markdown fences) ───────────
function repairJson(text) {
  let s = text;
  // Remove markdown fences
  s = s.replace(/```json/g, '').replace(/```/g, '').trim();
  // Fix duplicate opening braces: "{\n      {" → "{"
  s = s.replace(/\{\s*\{\s*\n/g, '{\n');
  // Fix "]\n    ]," — extra closing bracket with comma (Opus adds extra ])
  s = s.replace(/\]\s*\n\s*\],/g, '],');
  // Fix "]\n    ]" — extra closing bracket without comma
  s = s.replace(/\]\s*\n\s*\]/g, ']');
  // Fix trailing commas before } or ]
  s = s.replace(/,\s*([}\]])/g, '$1');
  // Fix missing commas between } and { (common Opus error)
  s = s.replace(/}\s*\n\s*{/g, '},\n{');
  // Fix "},\n    ]" — extra comma after brace before bracket
  s = s.replace(/},\s*\n\s*\]/g, '}\n]');
  return s;
}

function extractJson(text) {
  // Try raw parse first
  try { return JSON.parse(text); } catch { /* try next */ }

  // Try repaired JSON
  const repaired = repairJson(text);
  try { return JSON.parse(repaired); } catch { /* try next */ }

  // Pattern 1: ```json ... ``` fence
  const fenceMatch = text.match(/```json\s*([\s\S]*?)```/);
  if (fenceMatch) {
    const repaired2 = repairJson(fenceMatch[1]);
    try { return JSON.parse(repaired2); } catch { /* try next */ }
  }
  // Pattern 2: ``` ... ``` fence
  const genericFence = text.match(/```\s*([\s\S]*?)```/);
  if (genericFence) {
    const repaired3 = repairJson(genericFence[1]);
    try { return JSON.parse(repaired3); } catch { /* try next */ }
  }
  // Pattern 3: Find first [ ... last ]
  const firstBracket = repaired.indexOf('[');
  const lastBracket = repaired.lastIndexOf(']');
  if (firstBracket !== -1 && lastBracket !== -1 && lastBracket > firstBracket) {
    const jsonStr = repaired.substring(firstBracket, lastBracket + 1);
    try { return JSON.parse(jsonStr); } catch { /* try next */ }
  }
  // Pattern 4: Find first { ... last }
  const firstBrace = repaired.indexOf('{');
  const lastBrace = repaired.lastIndexOf('}');
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    const jsonStr = repaired.substring(firstBrace, lastBrace + 1);
    try { return JSON.parse(jsonStr); } catch { /* fall through */ }
  }
  return null;
}

// ─── Batch prompt builder ────────────────────────────────────────────────
function buildBatchPrompt(nodes, batchIdx) {
  const condensed = nodes.map(condenseNode);
  const nodesJson = JSON.stringify(condensed, null, 2);

  return `You are building the "tutor brain" for an educational platform serving struggling CISCE/ICSE/ISC students in India (Classes 1-12). This is a ONE-TIME build — your output will be used by a small local LLM (Llama 3.2 3B) to classify student messages and package pre-written responses at runtime.

For each node below, generate an EXHAUSTIVE and DETAILED JSON object with:
1. classification_patterns — 5-8 phrases a struggling student might type that should route to this node and a specific intent. Include natural language, misspellings, Hinglish variants ("samjhao", "batao", "nahi samajh"), and emotional variants ("i don't get it", "this is stupid", "too hard")
2. misconception_signatures — ALL detectable wrong-thinking patterns from the misconception text. Each signature should have multiple "student_says" trigger phrases, a clear "why_wrong" explanation, and a "correction_template_id"
3. response_template_id — which packaging template to use for each pattern
4. recommended_flow — the optimal teaching sequence (ordered list of template_ids)
5. emotional_triggers — phrases that indicate this topic is causing frustration

TEMPLATE IDS (use these exact ids):
- "validate_and_reframe" — acknowledge student's thinking, then reframe with correct concept
- "visual_analogy" — use a visual/real-world analogy to explain
- "step_by_step_walk" — chunked step-by-step walkthrough
- "eli5_simple" — ultra-simple ELI5 explanation
- "misconception_correction" — directly address the specific misconception
- "diagnostic_quiz" — start a diagnostic quiz
- "hint_progressive" — give a hint without revealing the answer
- "real_world_application" — show where this concept appears in real life
- "prerequisite_review" — route student to a prerequisite they missed
- "emotional_support" — address frustration/self-doubt before content
- "socratic_question" — ask a guiding question that leads student to discover the answer
- "celebrate_and_advance" — praise correct understanding and advance to next concept

INTENT CATEGORIES (use these exact categories):
- "question" — student asks a question about the concept
- "confusion" — student expresses confusion or misunderstanding
- "misconception" — student reveals a specific wrong belief
- "request_walkthrough" — student wants step-by-step explanation
- "request_simplify" — student wants simpler explanation
- "request_example" — student wants an example
- "request_test" — student wants to be tested
- "request_hint" — student wants a hint
- "frustration" — student is frustrated or upset
- "correct_answer" — student gave a correct answer
- "wrong_answer" — student gave a wrong answer
- "off_topic" — student message is not about this topic

Here are ${nodes.length} nodes (batch ${batchIdx + 1}):

${nodesJson}

For EACH node, output a DETAILED JSON object with this exact structure:
{
  "node_id": "c10_math_001",
  "subject": "maths",
  "class_level": 10,
  "title": "GST - computation of tax on basic/cost price",
  "classification_patterns": [
    { "pattern": "what is gst", "intent": "question", "template_id": "eli5_simple", "confidence": 0.9 },
    { "pattern": "how to calculate gst", "intent": "request_walkthrough", "template_id": "step_by_step_walk", "confidence": 0.9 },
    { "pattern": "gst on list price or selling price", "intent": "confusion", "template_id": "misconception_correction", "confidence": 0.85 },
    { "pattern": "gst samjhao", "intent": "request_simplify", "template_id": "eli5_simple", "confidence": 0.8 },
    { "pattern": "i don't get gst", "intent": "frustration", "template_id": "emotional_support", "confidence": 0.7 }
  ],
  "misconception_signatures": [
    {
      "id": "gst_on_list_price_001",
      "student_says": ["compute gst on marked price", "gst on list price", "apply gst to 3000 not 2550", "tax on mrp"],
      "why_wrong": "GST is always on the taxable value (selling price after discount), not the list price.",
      "correction_template_id": "misconception_correction",
      "visual_aid": "price_flow_diagram"
    }
  ],
  "recommended_flow": ["eli5_simple", "step_by_step_walk", "diagnostic_quiz"],
  "emotional_triggers": ["this is confusing", "i don't get gst", "gst is hard"]
}

Output a JSON ARRAY of these objects, one per node. Be EXHAUSTIVE — every possible student phrasing, every misconception variant. Output ONLY the JSON array, no commentary.`;
}

// ─── Master system prompt builder ────────────────────────────────────────
function buildMasterPromptRequest() {
  return `You are building the "master system prompt" for a local LLM (Llama 3.2 3B, ~3B parameters) that will act as an AI tutor for struggling CISCE/ICSE/ISC students in India (Classes 1-12).

This prompt will be loaded at runtime and instruct the local LLM how to:
1. Classify student messages (intent + emotional state)
2. Match student input to classification patterns from the taxonomy
3. Select the right response template
4. Package pre-written enrichment content naturally
5. Detect misconceptions from student wrong answers
6. Decide when to escalate (show structured choices instead of guessing)

The local LLM has these constraints:
- Small model (3B params) — cannot do complex reasoning
- Must follow instructions precisely
- Must NEVER generate new educational content — only package pre-written content
- Must respond in warm, patient, child-friendly language
- Must handle Hinglish input (mixed Hindi-English)
- Must detect emotional state and respond appropriately

Write the COMPLETE master system prompt. It must include:

1. ROLE definition — who the tutor is, tone, personality
2. CLASSIFICATION INSTRUCTIONS — how to classify student input
3. INTENT CATEGORIES — the full list with examples
4. RESPONSE TEMPLATE SELECTION — how to pick the right template
5. CONTENT PACKAGING RULES — how to wrap pre-written content naturally
6. MISCONCEPTION DETECTION — how to identify wrong thinking
7. EMOTIONAL STATE HANDLING — frustration, confidence, confusion, rushing
8. ESCALATION RULES — when to give up and show structured choices
9. LANGUAGE RULES — English with Hinglish support, child-friendly
10. OUTPUT FORMAT — exact JSON format the local LLM must output

The output format must be JSON:
{
  "classified_intent": "misconception",
  "matched_pattern": "gst_on_list_price",
  "confidence": 0.85,
  "emotional_state": "confused",
  "selected_template": "misconception_correction",
  "response_text": "the actual response to show the student",
  "should_escalate": false,
  "follow_up_action": "diagnostic_quiz"
}

Write the full prompt as a markdown document. Be thorough — this is the brain that runs forever.`;
}

// ─── Decision trees prompt builder ───────────────────────────────────────
function buildDecisionTreesPrompt() {
  return `You are building the decision trees for an AI tutor serving struggling CISCE/ICSE/ISC students in India (Classes 1-12).

These decision trees tell the local LLM (Llama 3.2 3B) what to do in each situation. They are pure logic — no LLM reasoning needed at runtime, just pattern matching.

Generate a JSON object with these decision trees:

1. answer_evaluation_tree — what to do after a student answers a diagnostic question
   - correct: advance, celebrate, next question
   - wrong (same misconception 2x): show visual analogy, retry
   - wrong (same misconception 3x): route to prerequisite
   - wrong (different misconceptions): identify pattern, targeted remediation
   - partially correct: acknowledge correct part, fix wrong part

2. emotional_response_tree — what to do based on emotional state
   - frustrated: pause content, emotional support, offer break
   - confident: challenge mode, harder questions
   - confused: simplify, visual analogy
   - rushing: slow down prompt, comprehension check
   - disengaged: gamify, story mode, real-world connection
   - anxious: reassurance, break task into smaller pieces

3. progression_tree — when to advance, review, or remediate
   - 3 correct in a row: advance to next concept
   - 2 wrong same misconception: visual analogy + retry
   - 3 wrong different misconceptions: route to prerequisite
   - mixed (2 right 1 wrong): stay on concept, targeted practice
   - student asks "why": real world application + analogy
   - student says "boring": gamify + challenge + story

4. escalation_tree — when the local LLM should give up and show structured choices
   - confidence < 0.6: show 4 multiple choice options
   - novel misconception not in taxonomy: show structured diagnostic
   - emotional crisis: human handoff message
   - off-topic: gentle redirect
   - repeated escalation: suggest taking a break

5. spaced_repetition_tree — when to schedule review
   - after mastery: schedule review in 2 days (SM-2)
   - after partial mastery: schedule review in 1 day
   - after failure: schedule review in 4 hours
   - before exam: increase review frequency

Output ONLY the JSON object, no commentary. Make it comprehensive — cover all edge cases a struggling student might hit.`;
}

// ─── Worker: process a batch ─────────────────────────────────────────────
async function processBatch(batch, batchIdx, workerId, progress) {
  const batchId = `batch_${String(batchIdx).padStart(4, '0')}`;
  const outputFile = path.join(OUTPUT_DIR, `${batchId}.json`);

  // Skip if already completed
  if (progress.batches[batchId]?.status === 'completed') {
    console.log(`  [W${workerId}][${batchId}] SKIP (already completed)`);
    return;
  }

  console.log(`  [W${workerId}][${batchId}] Processing ${batch.length} nodes...`);
  const prompt = buildBatchPrompt(batch, batchIdx);
  const result = await callOpusWithRetry(prompt, batchId, workerId, batchIdx);
  const parsed = extractJson(result.text);

  if (!parsed || !Array.isArray(parsed)) {
    // Save raw text for debugging
    const rawFile = path.join(OUTPUT_DIR, `${batchId}_raw.txt`);
    fs.writeFileSync(rawFile, result.text);
    console.log(`  [W${workerId}][${batchId}] WARNING: Could not parse JSON, saved raw to ${rawFile}`);
    progress.batches[batchId] = {
      status: 'parse_failed',
      completedAt: new Date().toISOString(),
      outputFile: rawFile,
    };
    saveProgress(progress);
    return;
  }

  fs.writeFileSync(outputFile, JSON.stringify(parsed, null, 2));
  progress.batches[batchId] = {
    status: 'completed',
    completedAt: new Date().toISOString(),
    outputFile,
    nodeCount: parsed.length,
  };
  saveProgress(progress);
  console.log(`  [W${workerId}][${batchId}] DONE — ${parsed.length} nodes processed`);

  // Force garbage collection to prevent OOM on long runs
  if (global.gc) { global.gc(); }
}

// ─── Worker: process master prompt ───────────────────────────────────────
async function processMasterPrompt(workerId, progress) {
  if (progress.masterPrompt?.status === 'completed') {
    console.log(`  [W${workerId}][master-prompt] SKIP (already completed)`);
    return;
  }
  console.log(`  [W${workerId}][master-prompt] Generating master system prompt...`);
  const prompt = buildMasterPromptRequest();
  const result = await callOpusWithRetry(prompt, 'master-prompt', workerId);
  const outputFile = path.join(OUTPUT_DIR, 'master-system-prompt.md');
  fs.writeFileSync(outputFile, result.text);
  progress.masterPrompt = {
    status: 'completed',
    completedAt: new Date().toISOString(),
    outputFile,
  };
  saveProgress(progress);
  console.log(`  [W${workerId}][master-prompt] DONE — ${result.text.length} chars`);
}

// ─── Worker: process decision trees ──────────────────────────────────────
async function processDecisionTrees(workerId, progress) {
  if (progress.decisionTrees?.status === 'completed') {
    console.log(`  [W${workerId}][decision-trees] SKIP (already completed)`);
    return;
  }
  console.log(`  [W${workerId}][decision-trees] Generating decision trees...`);
  const prompt = buildDecisionTreesPrompt();
  const result = await callOpusWithRetry(prompt, 'decision-trees', workerId);
  const parsed = extractJson(result.text);
  const outputFile = path.join(OUTPUT_DIR, 'decision-trees.json');
  if (parsed) {
    fs.writeFileSync(outputFile, JSON.stringify(parsed, null, 2));
  } else {
    // Save raw if parse failed
    fs.writeFileSync(outputFile, result.text);
  }
  progress.decisionTrees = {
    status: 'completed',
    completedAt: new Date().toISOString(),
    outputFile,
  };
  saveProgress(progress);
  console.log(`  [W${workerId}][decision-trees] DONE — ${result.text.length} chars`);
}

// ─── Merge all batch outputs into final files ────────────────────────────
function mergeBatchOutputs(progress) {
  const allEntries = [];
  const allMisconceptions = [];
  const allTemplates = [];

  for (const [batchId, info] of Object.entries(progress.batches)) {
    if (info.status !== 'completed') continue;
    try {
      const data = JSON.parse(fs.readFileSync(info.outputFile, 'utf8'));
      for (const entry of data) {
        allEntries.push(entry);
        if (entry.misconception_signatures) {
          allMisconceptions.push(...entry.misconception_signatures);
        }
      }
    } catch (e) {
      console.log(`  WARNING: Could not read ${info.outputFile}: ${e.message}`);
    }
  }

  // Write merged classification taxonomy
  const taxonomyFile = path.join(OUTPUT_DIR, 'classification-taxonomy.json');
  fs.writeFileSync(taxonomyFile, JSON.stringify(allEntries, null, 2));
  console.log(`\nMerged classification taxonomy: ${allEntries.length} entries → ${taxonomyFile}`);

  // Write merged misconception signatures
  const miscFile = path.join(OUTPUT_DIR, 'misconception-signatures.json');
  fs.writeFileSync(miscFile, JSON.stringify(allMisconceptions, null, 2));
  console.log(`Merged misconception signatures: ${allMisconceptions.length} entries → ${miscFile}`);

  // Build response templates index (unique template ids used)
  const templateIds = new Set();
  for (const entry of allEntries) {
    for (const p of (entry.classification_patterns || [])) {
      if (p.template_id) templateIds.add(p.template_id);
    }
    for (const m of (entry.misconception_signatures || [])) {
      if (m.correction_template_id) templateIds.add(m.correction_template_id);
    }
    if (entry.recommended_flow) {
      for (const t of entry.recommended_flow) templateIds.add(t);
    }
  }
  const templatesFile = path.join(OUTPUT_DIR, 'response-templates.json');
  fs.writeFileSync(templatesFile, JSON.stringify({
    template_ids: [...templateIds].sort(),
    description: 'Index of all response template IDs referenced in the taxonomy. Template definitions are in master-system-prompt.md.',
  }, null, 2));
  console.log(`Response template index: ${templateIds.size} templates → ${templatesFile}`);

  return { taxonomy: allEntries.length, misconceptions: allMisconceptions.length, templates: templateIds.size };
}

// ─── Status report ───────────────────────────────────────────────────────
function showStatus(progress, allBatches) {
  const completed = Object.values(progress.batches).filter(b => b.status === 'completed').length;
  const failed = Object.values(progress.batches).filter(b => b.status === 'parse_failed').length;
  const pending = allBatches.length - completed - failed;
  const masterDone = progress.masterPrompt?.status === 'completed';
  const treesDone = progress.decisionTrees?.status === 'completed';

  console.log('\n═══════════════════════════════════════════════════════');
  console.log('  TUTOR BRAIN BUILD STATUS');
  console.log('═══════════════════════════════════════════════════════');
  console.log(`  Node batches:  ${completed}/${allBatches.length} completed, ${failed} failed, ${pending} pending`);
  console.log(`  Master prompt: ${masterDone ? 'DONE' : 'PENDING'}`);
  console.log(`  Decision trees: ${treesDone ? 'DONE' : 'PENDING'}`);
  console.log(`  Output dir:    ${OUTPUT_DIR}`);
  console.log('═══════════════════════════════════════════════════════\n');
}

// ─── Main ────────────────────────────────────────────────────────────────
async function main() {
  const args = process.argv.slice(2);
  const startNow = args.includes('--now');
  const statusOnly = args.includes('--status');
  const onlyArg = args.find(a => a.startsWith('--only'));
  const onlyTarget = onlyArg ? onlyArg.split('=')[1] || args[args.indexOf(onlyArg) + 1] : null;
  const batchSizeArg = args.find(a => a.startsWith('--batch-size'));
  const batchSize = batchSizeArg ? parseInt(batchSizeArg.split('=')[1] || args[args.indexOf(batchSizeArg) + 1], 10) : BATCH_SIZE;

  // Load all nodes
  console.log('Loading all enrichment nodes from D:\\cisce...');
  const allNodes = loadAllNodes();
  console.log(`Loaded ${allNodes.length} nodes across ${new Set(allNodes.map(n => n.subject)).size} subjects.\n`);

  // Group into batches
  const batches = [];
  for (let i = 0; i < allNodes.length; i += batchSize) {
    batches.push(allNodes.slice(i, i + batchSize));
  }
  console.log(`Batched into ${batches.length} batches of ~${batchSize} nodes each.\n`);

  // Load progress
  let progress = loadProgress();
  progress.totalNodes = allNodes.length;
  progress.totalBatches = batches.length;
  saveProgress(progress);

  if (statusOnly) {
    showStatus(progress, batches);
    return;
  }

  // Auto-start delay
  if (!startNow) {
    console.log(`Auto-start in ${AUTO_START_DELAY_MS / 60000} minutes (use --now to start immediately)...`);
    console.log('Press Ctrl+C to cancel.\n');
    await new Promise(r => setTimeout(r, AUTO_START_DELAY_MS));
  }

  console.log('Starting Opus batch generation...\n');

  // Determine what to run
  const runBatches = !onlyTarget || onlyTarget === 'batches';
  const runMaster = !onlyTarget || onlyTarget === 'master-prompt';
  const runTrees = !onlyTarget || onlyTarget === 'decision-trees';

  // Build task queue
  const tasks = [];
  if (runMaster) tasks.push({ type: 'master', fn: (wid) => processMasterPrompt(wid, progress) });
  if (runTrees) tasks.push({ type: 'trees', fn: (wid) => processDecisionTrees(wid, progress) });
  if (runBatches) {
    for (let i = 0; i < batches.length; i++) {
      tasks.push({ type: 'batch', idx: i, fn: (wid) => processBatch(batches[i], i, wid, progress) });
    }
  }

  console.log(`Total tasks: ${tasks.length} (${tasks.filter(t => t.type === 'batch').length} batches + ${tasks.filter(t => t.type === 'master').length} master + ${tasks.filter(t => t.type === 'trees').length} trees)\n`);

  // Run with N workers
  let taskIdx = 0;
  async function worker(workerId) {
    while (taskIdx < tasks.length) {
      const myIdx = taskIdx++;
      const task = tasks[myIdx];
      if (!task) break;
      try {
        await task.fn(workerId);
      } catch (e) {
        console.error(`  [W${workerId}] TASK FAILED: ${e.message}`);
        // Record failure in progress
        if (task.type === 'batch') {
          const batchId = `batch_${String(task.idx).padStart(4, '0')}`;
          if (!progress.batches[batchId]) {
            progress.batches[batchId] = { status: 'failed', error: e.message, completedAt: new Date().toISOString() };
            saveProgress(progress);
          }
        }
      }
    }
  }

  const workers = [];
  for (let i = 1; i <= NUM_WORKERS; i++) {
    workers.push(worker(i));
  }
  await Promise.all(workers);

  // Merge outputs
  console.log('\nAll tasks complete. Merging outputs...');
  const stats = mergeBatchOutputs(progress);

  // Final status
  showStatus(progress, batches);
  console.log(`FINAL OUTPUTS:`);
  console.log(`  Classification taxonomy: ${stats.taxonomy} node entries`);
  console.log(`  Misconception signatures: ${stats.misconceptions} signatures`);
  console.log(`  Response templates: ${stats.templates} unique templates`);
  console.log(`  Master system prompt: ${progress.masterPrompt?.status === 'completed' ? 'DONE' : 'PENDING'}`);
  console.log(`  Decision trees: ${progress.decisionTrees?.status === 'completed' ? 'DONE' : 'PENDING'}`);
  console.log(`\nAll files in: ${OUTPUT_DIR}`);
  console.log('\nTutor brain build complete. Local LLM can now use these files at runtime.');
}

main().catch(e => {
  console.error('FATAL ERROR:', e.message);
  process.exit(1);
});
