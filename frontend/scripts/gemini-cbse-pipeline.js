// CBSE Gemini Pipeline — 39 keys, all parallel, one sim per key
// Maximum throughput: all 39 keys generate simultaneously
//
// Usage:
//   node scripts/gemini-cbse-pipeline.js [planFile] [startIdx] [endIdx]
//
// Examples:
//   node scripts/gemini-cbse-pipeline.js cbse-chem-template-plan.js        # all templates
//   node scripts/gemini-cbse-pipeline.js cbse-chem-template-plan.js 0 3    # first 3

const https = require('https');
const fs = require('fs');
const path = require('path');

// ─── Load ALL 39 keys from env file ───────────────────────────
const envFile = path.join(__dirname, 'gemini-keys-chem.env');
const envContent = fs.readFileSync(envFile, 'utf8');
const KEYS = [];
for (const line of envContent.split('\n')) {
  const m = line.match(/^GEMINI_KEY_\d+=(.+)$/);
  if (m) KEYS.push(m[1].trim());
}
if (KEYS.length === 0) {
  console.error('No keys found in gemini-keys-all.env');
  process.exit(1);
}
console.log(`Loaded ${KEYS.length} Gemini API keys`);

const MODEL = 'gemini-3.6-flash';
const MAX_TOKENS = 65536;
const MAX_RETRIES = parseInt(process.env.C12_MAX_RETRIES || '4', 10);

const FRONTEND_DIR = path.resolve(__dirname, '..');
const OUTPUT_DIR = path.join(FRONTEND_DIR, 'components', 'simulations', 'c6_12');
const BACKUP_DIR = path.join(FRONTEND_DIR, 'components', 'simulations', 'c6_12_backups');
const CBSE_NODES_DIR = 'D:\\platform\\cbse_data\\nodes\\by_subject';

fs.mkdirSync(OUTPUT_DIR, { recursive: true });
fs.mkdirSync(BACKUP_DIR, { recursive: true });

// ─── Load template plan ───────────────────────────────────────
const planFile = process.argv[2] || 'cbse-chem-template-plan.js';
const planPath = path.isAbsolute(planFile) ? planFile : path.join(__dirname, planFile);
const PLAN = require(planPath);

// ─── Subject code to CBSE filename mapping ────────────────────
const SUBJECT_FILES = {
  chem: 'chemistry.json',
  phy: 'physics.json',
  bio: 'biology.json',
  math: 'maths.json',
  cs: 'computer_science.json',
  biotech: 'biotech.json',
  appmath: 'applied_maths.json',
  evs: 'science.json',
  acc: 'accounts.json',
  bs: 'business_studies.json',
  econ: 'economics.json',
  geo: 'geography.json',
  hist: 'history_civics.json',
  histciv: 'history_civics.json',
  pol: 'political_science.json',
  psy: 'psychology.json',
  soc: 'sociology.json',
  home: 'home_science.json',
  legal: 'legal_studies.json',
};

// ─── Load CBSE nodes for a subject ────────────────────────────
const cbseNodeCache = {};
function loadCBSENodes(subjectCode) {
  if (cbseNodeCache[subjectCode]) return cbseNodeCache[subjectCode];
  const filename = SUBJECT_FILES[subjectCode];
  if (!filename) return [];
  const filePath = path.join(CBSE_NODES_DIR, filename);
  if (!fs.existsSync(filePath)) return [];
  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    cbseNodeCache[subjectCode] = data;
    return data;
  } catch (e) {
    return [];
  }
}

// ─── Get enrichment for nodes ─────────────────────────────────
function getEnrichmentForNodes(nodeDescriptions, subjectCode) {
  const allNodes = loadCBSENodes(subjectCode);
  const parts = [];
  for (const nodeInfo of nodeDescriptions) {
    const nodeId = nodeInfo.id;
    const chapter = nodeInfo.chapter;
    const fullNode = allNodes.find(n => n.node_id === nodeId && n.chapter_name === chapter);
    if (fullNode) {
      let section = `### ${nodeId} (${chapter})\nTOPIC: ${fullNode.topic}\n`;
      if (fullNode.content_snippet) section += `CONTENT: ${fullNode.content_snippet}\n`;
      if (fullNode.concept_tags?.length > 0) section += `CONCEPTS: ${fullNode.concept_tags.join(', ')}\n`;
      if (fullNode.scope_constraints) section += `SCOPE: ${fullNode.scope_constraints}\n`;
      if (fullNode.difficulty) section += `DIFFICULTY: ${fullNode.difficulty}\n`;
      parts.push(section);
    }
  }
  return parts.length > 0 ? parts.join('\n---\n\n') : null;
}

// ─── Subject-specific visual requirements ─────────────────────
function getSubjectVisuals(subject) {
  const visuals = {
    chem: `### CHEMISTRY-SPECIFIC VISUAL REQUIREMENTS
- Interactive molecular models: atoms, bonds, electron shells (SVG or Canvas)
- Animated chemical reactions: atoms rearranging, bonds breaking/forming
- SVG diagrams: atomic structure, electron configuration, periodic table trends
- Balanced equation visualiser with atom count tracking
- pH scale, titration curves, reaction rate graphs (Canvas-based, live updating)
- At least 2 molecular structure SVGs + 1 Canvas animation specific to THIS topic
- Reaction mechanism step-by-step visualiser with electron flow arrows`,
    phy: `### PHYSICS-SPECIFIC VISUAL REQUIREMENTS
- Interactive physics simulations with REAL-TIME physics calculations
- Canvas-based animations: particles, waves, trajectories, field lines, circuit diagrams
- SVG diagrams: ray diagrams, circuit schematics, force diagrams, energy bars
- Interactive sliders for physical variables
- At least 2 Canvas animations + 3 SVG diagrams specific to THIS topic`,
    bio: `### BIOLOGY-SPECIFIC VISUAL REQUIREMENTS
- Interactive diagrams of biological structures: cells, organs, tissues, systems
- SVG cross-sections: leaf structure, heart, kidney, neuron, cell membrane
- Animated biological processes: mitosis, photosynthesis, blood circulation
- At least 3 biological SVG diagrams + 1 Canvas animation specific to THIS topic`,
    math: `### MATHEMATICS-SPECIFIC VISUAL REQUIREMENTS
- Interactive coordinate plane with draggable points
- Canvas-based graphing: functions, derivatives, integrals, conic sections
- SVG geometric constructions with labelled sides/angles
- At least 3 interactive graphs + 2 geometric SVG diagrams specific to THIS topic`,
  };
  return visuals[subject] || visuals.chem;
}

// ─── Prompt builder ───────────────────────────────────────────
function buildPrompt(template) {
  const nodeInfo = template.nodeDescriptions.map(n =>
    `  - ${n.id}: ${n.description} (Chapter: ${n.chapter})`
  ).join('\n');
  const nodeIdList = template.nodes.join(', ');
  const enrichment = getEnrichmentForNodes(template.nodeDescriptions, template.subject);
  const subjectVisuals = getSubjectVisuals(template.subject);

  return `You are a senior React/TypeScript engineer building interactive educational simulations for a CBSE learning platform. You generate ONE complete, compilable, production-ready simulation component.

This component teaches struggling students through interactive, visual, adaptive learning — inspired by Brilliant.org, not a static textbook.

## CRITICAL: VISUAL QUALITY BAR
This is NOT a text-heavy quiz. This is a VISUAL, INTERACTIVE simulation.
- Every concept must have a CUSTOM diagram or animation specific to THIS topic
- Students must be able to MANIPULATE variables and SEE the result in real-time
- Use Canvas for animations and real-time simulations
- Use SVG for labelled diagrams, molecular structures, reaction mechanisms
- Use framer-motion for smooth transitions

## YOUR TASK
Output the COMPLETE TypeScript code for a React component. Output ONLY the code — no explanations, no markdown fences, no commentary. Start with 'use client' and end with the default export.

## COMPONENT TO GENERATE
File: components/simulations/c6_12/${template.id}.tsx
Class: ${template.class} (CBSE)
Subject: ${template.subjectName}
Chapter: ${template.chapter}

## NODES THIS TEMPLATE COVERS (you must teach ALL of these)
${nodeInfo}

These node IDs MUST appear in the code as string literals:
${nodeIdList}

## CBSE CURRICULUM DATA
${enrichment || 'Use your knowledge of CBSE Class ' + template.class + ' ' + template.subjectName + ' for: ' + template.chapter}

## CRITICAL: ACTUAL API USAGE
audioManager.play('tap'|'success'|'error'|'celebration'|'hint'|'pickup'|'drop-correct'|'drop-wrong'|'whoosh'|'sparkle'|'chime'|'pop'|'count'|'balance'|'swoop')
speechManager.speak('text') // call 5+ times
<HintBubble show={showHint} text={currentHint} />
<Confetti show={showConfetti} />
<SuccessBanner show={showSuccess} text="Challenge Complete!" />
<SparkleBurst show={showSparkle} x={400} y={300} />

## EXISTING PLATFORM SYSTEMS
import { createReviewItem, sm2Update } from '../../../lib/srs'
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt'
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore'
import { SUBJECT_CONFIG } from '../../../lib/topicGraph'
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine'

${subjectVisuals}

## STRICT REQUIREMENTS:
1. 'use client' at top
2. Imports: React, framer-motion, sim-engine, srs, bkt, masteryStore, topicGraph
3. NO other libraries (no d3, no three.js — use raw SVG/Canvas)
4. Default export matching: ${template.id}
5. Minimum 800 lines
6. Topic-specific SVG visualization
7. 8+ challenges with progressive difficulty (foundation/standard/advanced)
8. 5 teaching slides
9. Adaptive difficulty based on BKT mastery
10. No 'any' type
11. audioManager.play() called 8+ times
12. speechManager.speak() called 5+ times
13. <HintBubble>, <Confetti>, <SuccessBanner>, <SparkleBurst> in JSX
14. All node IDs must appear as string literals
15. bktUpdate() after each answer
16. sm2Update() after each challenge
17. recordGameScore() on completion

## CBSE-SPECIFIC CONTENT RULES:
- Follow CBSE 2025-26 syllabus strictly
- Use CBSE marking scheme terminology
- No foreign-language etymologies or mnemonics
- Content must be accurate per NCERT textbook
- Include CBSE-style numerical problems where applicable
- Use SI units throughout

## OUTPUT: Only code. No markdown fences. No explanations.
Start with 'use client';
End with: export default ${template.id};`;
}

// ─── Call Gemini API ──────────────────────────────────────────
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
            if (!text || text.length < 500) { reject(new Error(`Response too short: ${text?.length || 0} chars`)); return; }
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
async function callGeminiWithRetry(prompt, key, templateId) {
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      return await callGemini(prompt, key);
    } catch (e) {
      const isRetryable = e.message.includes('503') || e.message.includes('429') || e.message.includes('timeout');
      if (isRetryable && attempt < MAX_RETRIES) {
        const delay = Math.min(5000 * Math.pow(2, attempt - 1), 60000);
        console.log(`  [${templateId}] Retry ${attempt}/${MAX_RETRIES} in ${delay/1000}s — ${e.message}`);
        await new Promise(r => setTimeout(r, delay));
        continue;
      }
      throw e;
    }
  }
}

// ─── Extract code ─────────────────────────────────────────────
function extractCode(response) {
  let code = response.trim();
  if (code.startsWith('```')) {
    const nl = code.indexOf('\n');
    if (nl > 0) code = code.substring(nl + 1);
  }
  if (code.endsWith('```')) code = code.substring(0, code.length - 3);
  const ucIdx = Math.max(code.indexOf("'use client'"), code.indexOf('"use client"'));
  if (ucIdx > 0) code = code.substring(ucIdx);
  return code.trim();
}

// ─── Checks ───────────────────────────────────────────────────
function runRealChecks(template, code) {
  const lineCount = code.split('\n').length;
  const useClient = code.includes("'use client'") || code.includes('"use client"');
  const importChecks = {
    srs: code.includes('createReviewItem') || code.includes('sm2Update'),
    bkt: code.includes('createBKTState') || code.includes('bktUpdate'),
    mastery: code.includes('recordGameScore') || code.includes('getNodeMastery'),
    topicGraph: code.includes('SUBJECT_CONFIG'),
    simEngine: code.includes('audioManager') || code.includes('Confetti'),
  };
  const hasDefaultExport = /export\s+default\s+/.test(code);
  const codeNoComments = code.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/[^\n]*/g, '');
  const nodesCovered = template.nodes.filter(n => codeNoComments.includes(`'${n}'`) || codeNoComments.includes(`"${n}"`));
  const noAny = !/:\s*any\b/.test(code) && !/as\s+any\b/.test(code);
  const hasLocalStorage = /localStorage\.(getItem|setItem)/.test(code) || /recordGameScore/.test(code);
  const bktUsed = /bktUpdate\s*\(/.test(code);
  const srsUsed = /sm2Update\s*\(/.test(code);
  const masteryStored = /recordGameScore\s*\(/.test(code);
  const audioUsed = /audioManager\.play\s*\(/.test(code);
  const speechUsed = /speechManager\.speak\s*\(/.test(code);
  const hasHintBubble = /<HintBubble/.test(code);
  const hasConfetti = /<Confetti/.test(code);
  const hasSuccessBanner = /<SuccessBanner/.test(code);
  const hasSparkleBurst = /<SparkleBurst/.test(code);
  return {
    lineCount, useClient, importChecks,
    allImportsPresent: Object.values(importChecks).every(v => v),
    hasDefaultExport, nodesCovered: nodesCovered.length, nodesTotal: template.nodes.length,
    noAny, hasLocalStorage, bktUsed, srsUsed, masteryStored,
    audioUsed, speechUsed, hasHintBubble, hasConfetti, hasSuccessBanner, hasSparkleBurst,
  };
}

// ─── Process one template with one key ────────────────────────
async function processTemplate(template, key, keyIdx) {
  const tag = `[${template.id}][Key${keyIdx+1}]`;
  console.log(`${tag} START — C${template.class} ${template.subjectName}, ${template.nodes.length} nodes`);

  // Backup
  const backupPath = path.join(BACKUP_DIR, `${template.id}_${Date.now()}.tsx.bak`);
  const outputPath = path.join(OUTPUT_DIR, `${template.id}.tsx`);
  if (fs.existsSync(outputPath)) fs.copyFileSync(outputPath, backupPath);
  try { fs.unlinkSync(outputPath); } catch (e) {}

  const prompt = buildPrompt(template);
  console.log(`${tag} Prompt: ${(prompt.length / 1024).toFixed(0)} KB`);

  let response;
  try {
    response = await callGeminiWithRetry(prompt, key, template.id);
  } catch (e) {
    console.error(`${tag} FAIL: ${e.message}`);
    return { id: template.id, success: false, error: e.message };
  }

  const code = extractCode(response);
  console.log(`${tag} Response: ${code.length} chars, ${code.split('\n').length} lines`);

  if (code.length < 500) {
    console.error(`${tag} FAIL: Too short`);
    return { id: template.id, success: false, error: 'Code too short' };
  }

  fs.writeFileSync(outputPath, code, 'utf8');
  const checks = runRealChecks(template, code);
  console.log(`${tag} Lines: ${checks.lineCount} | nodes: ${checks.nodesCovered}/${checks.nodesTotal} | BKT: ${checks.bktUsed} | SRS: ${checks.srsUsed} | noAny: ${checks.noAny}`);

  const structuralPass = checks.useClient && checks.allImportsPresent && checks.hasDefaultExport &&
    checks.hasLocalStorage && checks.bktUsed && checks.srsUsed && checks.masteryStored &&
    checks.audioUsed && checks.speechUsed &&
    checks.hasHintBubble && checks.hasConfetti && checks.hasSuccessBanner && checks.hasSparkleBurst;
  const nodePass = checks.nodesCovered >= Math.ceil(checks.nodesTotal * 0.8);
  const linePass = checks.lineCount >= 500;
  const success = structuralPass && nodePass && linePass;

  console.log(`${tag} RESULT: ${success ? 'SUCCESS' : 'NEEDS FIX'}`);
  return { id: template.id, success, checks, error: success ? null : 'checks failed' };
}

// ─── Main: assign one template per key, all parallel ──────────
async function main() {
  const startIdx = parseInt(process.argv[3] || '0', 10);
  const endIdx = parseInt(process.argv[4] || String(PLAN.length), 10);
  const templates = PLAN.slice(startIdx, Math.min(endIdx, PLAN.length));

  console.log(`\n=== CBSE GEMINI ${MODEL} PIPELINE (39-KEY PARALLEL) ===`);
  console.log(`Plan: ${planFile}`);
  console.log(`Templates: ${templates.length}`);
  console.log(`Keys: ${KEYS.length} (all parallel)`);
  console.log(`Output: ${OUTPUT_DIR}`);
  console.log('');

  const totalStart = Date.now();

  // Assign templates to keys — one per key, all run in parallel
  // If more templates than keys, process in waves
  const allResults = [];
  let wave = 0;

  for (let i = 0; i < templates.length; i += KEYS.length) {
    wave++;
    const waveTemplates = templates.slice(i, i + KEYS.length);
    console.log(`\n--- WAVE ${wave} (${waveTemplates.length} sims in parallel) ---`);

    const promises = waveTemplates.map((t, j) => {
      const keyIdx = j % KEYS.length;
      return processTemplate(t, KEYS[keyIdx], keyIdx);
    });

    const results = await Promise.all(promises);
    results.forEach(r => {
      allResults.push(r);
      console.log(`  ${r.success ? 'OK' : 'FAIL'}: ${r.id} — ${r.checks?.lineCount || 0} lines`);
    });

    const successCount = allResults.filter(r => r.success).length;
    console.log(`  [PROGRESS] ${allResults.length}/${templates.length} done — ${successCount} success`);
  }

  const elapsed = Math.round((Date.now() - totalStart) / 1000);
  const succeeded = allResults.filter(r => r.success).length;
  const failed = allResults.filter(r => !r.success).length;

  console.log(`\n=== SUMMARY ===`);
  console.log(`Success: ${succeeded}/${templates.length}`);
  console.log(`Failed: ${failed}/${templates.length}`);
  console.log(`Time: ${Math.round(elapsed/60)}m ${elapsed%60}s`);

  if (failed > 0) {
    console.log(`\nFailed:`);
    allResults.filter(r => !r.success).forEach(r =>
      console.log(`  ${r.id}: ${r.error}`)
    );
  }

  // Save log
  const logFile = path.join(__dirname, `cbse_pipeline_log_${Date.now()}.json`);
  fs.writeFileSync(logFile, JSON.stringify({
    model: MODEL, plan: planFile, elapsed, success: succeeded, fail: failed, results: allResults,
  }, null, 2));
  console.log(`\nLog: ${logFile}`);
}

main().catch(e => { console.error('FATAL:', e); process.exit(1); });
