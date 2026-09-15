// Chemistry Sim Generator v2 — 6 Gemini keys, 6 sims/round, 60s pause
// Brilliant.org-quality interactive chemistry simulations for C6-C12 CISCE
// Uses CISCE enrichment marker files (plain text, NOT JSON)
// Output: .tsx files (React/TypeScript components)

const https = require('https');
const fs = require('fs');
const path = require('path');

// ─── 6 API keys ───────────────────────────────────────────────
const KEYS = [
  'AQ.Ab8RN6LDccrCPDvyQ4nFydMGXEz0XYJexA1VBgyA1AKvmnUEwg',
  'AQ.Ab8RN6KNABGpFE0AN7Mgsu0wWlMTd94M-ZfNncE0W7Iz41TKdA',
  'AQ.Ab8RN6JQsjDH9MWFSdbXUsWwRHBgUyilNKzK-1a0tFAPieMYCA',
  'AQ.Ab8RN6Ku6CwkHI5zjIYBJIGsUkBCbv768t4OkQgP-WRkbe80ZA',
  'AQ.Ab8RN6IhWgMmgt4FKwl3ZmT_JaOq9mmUVfhFgQ_NaiWF_mP8hg',
  'AQ.Ab8RN6JmyltxoWGon_XYbrfy550-bMzzzC_wRoaba53TpYpmXw',
];

const MODEL = 'gemini-3.6-flash';
const MAX_TOKENS = 65536;
const BREAK_MS = 60000;
const MAX_RETRIES = 4;
const SIMS_PER_ROUND = 6;

const OUTPUT_DIR = path.join(__dirname, '..', 'components', 'simulations', 'c6_12');
const ENRICHMENT_DIR = 'D:\\cisce\\chem\\enrichment';

fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// ─── Progress tracking ────────────────────────────────────────
const PROGRESS_FILE = path.join(__dirname, 'chem_sim_progress.json');

function loadProgress() {
  try { return JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf8')); }
  catch { return { completed: [], failed: [], lastRun: null }; }
}

function saveProgress(prog) {
  prog.lastRun = new Date().toISOString();
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify(prog, null, 2));
}

// ─── Enrichment loader (reads .marker files — plain text format) ──
const enrichmentCache = {};

function loadEnrichmentForClass(cls) {
  const cacheKey = `c${cls}`;
  if (enrichmentCache[cacheKey]) return enrichmentCache[cacheKey];

  const nodeMap = {};
  const classPrefix = `c${cls}_`;

  try {
    const allFiles = fs.readdirSync(ENRICHMENT_DIR).filter(f =>
      f.startsWith(classPrefix) && f.endsWith('.marker')
    );

    for (const fileName of allFiles) {
      const filePath = path.join(ENRICHMENT_DIR, fileName);
      const content = fs.readFileSync(filePath, 'utf8');
      const nodeRegex = /^--- NODE (\S+) ---\r?$/gm;
      let match;
      const sections = [];

      while ((match = nodeRegex.exec(content)) !== null) {
        if (sections.length > 0) {
          sections[sections.length - 1].content =
            content.substring(sections[sections.length - 1].startIdx, match.index).trim();
        }
        sections.push({ nodeId: match[1], startIdx: nodeRegex.lastIndex });
      }
      if (sections.length > 0) {
        sections[sections.length - 1].content =
          content.substring(sections[sections.length - 1].startIdx).trim();
      }

      for (const section of sections) {
        if (!nodeMap[section.nodeId]) {
          nodeMap[section.nodeId] = section.content;
        } else {
          nodeMap[section.nodeId] += '\n\n' + section.content;
        }
      }
    }
  } catch (e) { }

  enrichmentCache[cacheKey] = nodeMap;
  return nodeMap;
}

function getEnrichmentForNodes(nodes, cls) {
  const all = loadEnrichmentForClass(cls);
  const parts = [];
  for (const nodeId of nodes) {
    if (all[nodeId]) parts.push(`### ${nodeId}\n${all[nodeId]}`);
  }
  return parts.length > 0 ? parts.join('\n\n---\n\n') : null;
}

// ─── Build chemistry templates from enrichment ────────────────
function buildChemTemplates() {
  const templates = [];
  const clsList = [6, 7, 8, 9, 10, 11, 12];

  for (const cls of clsList) {
    const nodeMap = loadEnrichmentForClass(cls);
    const nodeIds = Object.keys(nodeMap).sort();

    const BATCH = cls <= 8 ? 8 : 10;
    for (let i = 0; i < nodeIds.length; i += BATCH) {
      const batch = nodeIds.slice(i, i + BATCH);
      const partNum = Math.floor(i / BATCH) + 1;

      const nodeDescs = batch.map(nid => {
        const content = nodeMap[nid] || '';
        const titleMatch = content.match(/^TITLE:\s*(.+?)$/m);
        const title = titleMatch ? titleMatch[1].trim() : nid;
        return { id: nid, description: title };
      });

      const firstTopic = nodeDescs[0]?.description || 'Chemistry';
      const simName = firstTopic
        .replace(/[^a-zA-Z0-9\s]/g, '')
        .replace(/\s+/g, '')
        .substring(0, 40);
      const simId = `C${cls}_Chemistry${simName}Sim`;

      const outFile = path.join(OUTPUT_DIR, `${simId}.tsx`);
      if (fs.existsSync(outFile) && fs.statSync(outFile).size > 500) {
        continue;
      }

      templates.push({
        id: simId,
        class: cls,
        stream: 'science',
        subject: 'chem',
        subjectName: 'Chemistry',
        nodes: batch,
        nodeDescriptions: nodeDescs,
        partNum,
      });
    }
  }

  return templates;
}

// ─── Prompt builder (optimized for best sim quality) ──────────
function buildPrompt(template) {
  const nodeInfo = template.nodeDescriptions.map(n => `  - ${n.id}: ${n.description}`).join('\n');
  const nodeIdList = template.nodes.join(', ');
  const enrichment = getEnrichmentForNodes(template.nodes, template.class);
  const classLabel = `Class ${template.class}`;
  const boardLabel = template.class <= 10 ? 'ICSE' : 'ISC';

  return `You are a world-class educational game designer and senior React/TypeScript engineer. You build Brilliant.org-quality interactive chemistry simulations that make abstract concepts tangible and joyful.

## YOUR MISSION

Build ONE complete, production-ready React component that teaches ${template.subjectName} to ${classLabel} (${boardLabel}) students through visual, interactive, adaptive learning. This is NOT a quiz. This is NOT a textbook. This is a hands-on laboratory where every concept comes alive.

## OUTPUT FORMAT — CRITICAL

Output ONLY raw TypeScript code. No markdown fences. No JSON. No explanations. No commentary.
Start with: "use client"
End with: the default export statement.
The entire output must be valid .tsx file content that compiles without errors.

## COMPONENT TO GENERATE

File: components/simulations/c6_12/${template.id}.tsx
Class: ${classLabel} (${boardLabel})
Subject: ${template.subjectName}

## NODES THIS SIM COVERS (teach ALL of them)

${nodeInfo}

These node IDs MUST appear as string literals in the code:
${nodeIdList}

## ENRICHMENT DATA (plain text marker format — use for content)

The enrichment below is in MARKER format (NOT JSON). It contains:
- TITLE: the concept name
- DEFINITION: detailed explanation
- TEXT_WALKTHROUGH: narrative explanation connecting to prior knowledge
- ELI5: simple analogy
- COMMON_MISCONCEPTION: what students get wrong and why
- DIAGNOSTIC_QUESTION: test questions with answers
- MASTERY_CRITERIA: what mastery looks like
- SCOPE_BOUNDARY: what NOT to teach at this level
- ON_FAILURE: what to do if student fails

Use this data to build accurate teaching slides, challenges, and feedback.

${enrichment || 'Use your expert knowledge of CISCE ' + boardLabel + ' Chemistry curriculum.'}

## DESIGN PHILOSOPHY — BRILLIANT.ORG QUALITY

### Visual First
Every concept needs a CUSTOM visual that shows the actual chemistry:
- Molecular structures with atoms and bonds (SVG circles + lines)
- Periodic table sections with element tiles
- Reaction animations (molecules combining/breaking apart on Canvas)
- pH scales with color gradients
- Titration curves plotting in real-time
- Orbital diagrams with electron shells
- Crystal lattice structures
- Gas laws with piston/cylinder animations
- Equilibrium arrows shifting with concentration sliders
- Electrochemistry with electron flow animations

### Interactivity
Students must MANIPULATE and OBSERVE:
- Drag atoms to build molecules
- Slide concentration and watch color change
- Adjust temperature and see reaction rate change
- Balance equations by dragging coefficients
- Predict products then verify
- Sort elements by periodic properties
- Build Lewis dot structures interactively

### Adaptive Learning
- Start with a discovery question (predict before learning)
- Teach with visual slides (5 slides minimum)
- Challenge with 8+ progressive challenges
- Adapt difficulty based on BKT mastery level
- Give specific misconception feedback (from enrichment data)
- End with a real-world application activity

## TECHNICAL REQUIREMENTS

### Imports (use exactly these)
"use client";
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

### NO other libraries allowed
No d3, no three.js, no recharts, no chart.js — use raw SVG and Canvas only.

### Audio (valid sounds only)
audioManager.play('tap') | 'success' | 'error' | 'celebration' | 'hint' | 'pickup' | 'drop-correct' | 'drop-wrong' | 'whoosh' | 'sparkle' | 'chime' | 'pop' | 'count' | 'balance' | 'swoop'
Call audioManager.play() 8+ times.

### Speech
speechManager.speak('text here')
Call speechManager.speak() 5+ times with educational feedback.

### Feedback components (use in JSX)
<HintBubble show={showHint} text={currentHint} />
<Confetti show={showConfetti} />
<SuccessBanner show={showSuccess} text="Challenge Complete!" />
<SparkleBurst show={showSparkle} x={400} y={300} />

### Mastery systems (MUST call)
- bktUpdate() after each answer — adapts difficulty
- sm2Update() after each challenge — spaced repetition
- recordGameScore() on completion — saves to localStorage
- localStorage key: 'mastery_<nodeId>'

### Structure
1. Node ID constants at top (ALL_NODE_IDS array)
2. SCENARIO object with narrative context
3. DISCOVERY_QUESTION (predict-before-learn)
4. TEACHING_SLIDES array (5 slides, each with visual + explanation)
5. CHALLENGES array (8+ challenges, progressive difficulty)
6. MISCONCEPTIONS from enrichment data
7. Main component with:
   - State: currentSlide, currentChallenge, score, mastery, showHint, etc.
   - BKT state per node
   - Adaptive difficulty (foundation/standard/advanced)
   - Auto-hint after 10s inactivity
   - Progress bar
   - onComplete(score) callback
8. DEFAULT_PROPS with enrichment data
9. Default export
10. Minimum 800 lines
11. No 'any' type — use proper TypeScript interfaces
12. All node IDs as string literals in the code

### Visual Components to Build (topic-specific)
Build custom SVG/Canvas components for THIS topic. Examples:
- MoleculeBuilder: drag atoms to assemble molecules
- PeriodicPropertyChart: visualize trends across periods/groups
- ReactionSimulator: animate reactants → products
- pHScale: interactive pH meter with color gradient
- TitrationCurve: plot pH vs volume in real-time
- OrbitalDiagram: fill electron shells interactively
- BondVisualizer: show ionic/covalent/hydrogen bonds
- GasLawPiston: adjust P/V/T and see relationships
- EquilibriumShifter: slide concentrations, watch Q vs K
- ElectrochemistryCell: animate electron flow in galvanic cells

Choose the visuals that best fit YOUR specific nodes. Every visual must be unique to this topic — NO generic placeholders.

## STRICT RULES
1. Output ONLY code — no markdown, no fences, no JSON, no explanations
2. Start with "use client" (with single quotes)
3. End with "export default" statement
4. Must compile as valid .tsx
5. All node IDs must appear as string literals
6. Minimum 800 lines of actual code
7. No 'any' type
8. No external libraries beyond the imports listed above

## BEGIN OUTPUT NOW`;
}

// ─── Gemini API call ──────────────────────────────────────────
function callGemini(key, prompt, retries = MAX_RETRIES) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        maxOutputTokens: MAX_TOKENS,
        temperature: 0.7,
      },
    });

    const options = {
      hostname: 'generativelanguage.googleapis.com',
      path: `/v1beta/models/${MODEL}:generateContent?key=${key}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
            const text = json.candidates?.[0]?.content?.parts?.[0]?.text || '';
            if (text && text.length > 200) {
              resolve(text);
            } else {
              console.log(`      empty response, retrying...`);
              if (retries > 0) {
                setTimeout(() => callGemini(key, prompt, retries - 1).then(resolve, reject), 5000);
              } else { reject(new Error('Empty response')); }
            }
          } catch (e) {
            console.log(`      parse error: ${e.message}`);
            if (retries > 0) {
              setTimeout(() => callGemini(key, prompt, retries - 1).then(resolve, reject), 5000);
            } else { reject(e); }
          }
        } else if (res.statusCode === 429 || res.statusCode === 503) {
          console.log(`      ${res.statusCode}, retrying in 10s...`);
          if (retries > 0) {
            setTimeout(() => callGemini(key, prompt, retries - 1).then(resolve, reject), 10000);
          } else { reject(new Error(`HTTP ${res.statusCode}`)); }
        } else {
          console.log(`      HTTP ${res.statusCode}: ${data.substring(0, 200)}`);
          if (retries > 0) {
            setTimeout(() => callGemini(key, prompt, retries - 1).then(resolve, reject), 5000);
          } else { reject(new Error(`HTTP ${res.statusCode}`)); }
        }
      });
    });

    req.on('error', (e) => {
      console.log(`      network error: ${e.message}`);
      if (retries > 0) {
        setTimeout(() => callGemini(key, prompt, retries - 1).then(resolve, reject), 5000);
      } else { reject(e); }
    });

    req.write(body);
    req.end();
  });
}

// ─── Clean response ───────────────────────────────────────────
function cleanResponse(text) {
  let cleaned = text.trim();
  // Remove markdown fences if present
  cleaned = cleaned.replace(/^```(?:typescript|tsx|javascript|js)?\s*\n?/i, '');
  cleaned = cleaned.replace(/\n?```\s*$/i, '');
  // Ensure starts with 'use client'
  if (!cleaned.startsWith("'use client'") && !cleaned.startsWith('"use client"')) {
    cleaned = "'use client';\n\n" + cleaned;
  }
  return cleaned.trim();
}

// ─── Main pipeline ────────────────────────────────────────────
async function main() {
  console.log('\n' + '='.repeat(70));
  console.log('Chemistry Sim Generator v2 (6 keys, 6 sims/round, 60s pause)');
  console.log('='.repeat(70));

  const templates = buildChemTemplates();
  console.log(`\nTemplates to generate: ${templates.length}`);

  if (templates.length === 0) {
    console.log('  All chemistry sims already exist!');
    return;
  }

  const byClass = {};
  for (const t of templates) {
    byClass[t.class] = (byClass[t.class] || 0) + 1;
  }
  for (const cls of Object.keys(byClass).sort()) {
    console.log(`  C${cls}: ${byClass[cls]} sims`);
  }

  const progress = loadProgress();
  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < templates.length; i += SIMS_PER_ROUND) {
    const round = templates.slice(i, i + SIMS_PER_ROUND);
    const roundNum = Math.floor(i / SIMS_PER_ROUND) + 1;
    const totalRounds = Math.ceil(templates.length / SIMS_PER_ROUND);
    console.log(`\n${'─'.repeat(50)}`);
    console.log(`Round ${roundNum}/${totalRounds} — ${round.length} sims`);
    console.log(`${'─'.repeat(50)}`);

    const promises = round.map((template, idx) => {
      const key = KEYS[idx % KEYS.length];
      const outFile = path.join(OUTPUT_DIR, `${template.id}.tsx`);

      console.log(`  [${idx + 1}] ${template.id} (C${template.class}, ${template.nodes.length} nodes, key ${idx + 1})`);

      return callGemini(key, buildPrompt(template))
        .then(response => {
          const cleaned = cleanResponse(response);
          fs.writeFileSync(outFile, cleaned, 'utf8');
          const sizeKB = (fs.statSync(outFile).size / 1024).toFixed(1);
          console.log(`  [${idx + 1}] DONE — ${template.id} (${sizeKB}KB)`);
          progress.completed.push(template.id);
          successCount++;
          return true;
        })
        .catch(err => {
          console.log(`  [${idx + 1}] FAILED — ${template.id}: ${err.message}`);
          progress.failed.push(template.id);
          failCount++;
          return false;
        });
    });

    await Promise.all(promises);
    saveProgress(progress);

    if (i + SIMS_PER_ROUND < templates.length) {
      console.log(`\n  Pausing 60s before next round...`);
      await new Promise(resolve => setTimeout(resolve, BREAK_MS));
    }
  }

  console.log(`\n${'='.repeat(70)}`);
  console.log(`  COMPLETE — ${successCount} success, ${failCount} failed / ${templates.length}`);
  console.log(`${'='.repeat(70)}`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
