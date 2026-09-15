/**
 * generate-all-sims.js — Master generation pipeline for C6-8 simulations.
 *
 * For each template:
 * 1. Reads enrichment data from scripts/enrichment-data/<template>.json
 * 2. Builds a prompt with the reference template + enrichment data
 * 3. Calls Gemini API (2 in parallel, alternating keys)
 * 4. Waits 30 seconds between batches
 * 5. Verifies TypeScript compilation after each batch
 *
 * Usage: node scripts/generate-all-sims.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// ─── Config ───────────────────────────────────────────────────

const ROOT = path.resolve(__dirname, '..');
const ENRICHMENT_DIR = path.join(__dirname, 'enrichment-data');
const PROMPTS_DIR = path.join(__dirname, 'prompts');
const SIM_DIR = path.join(ROOT, 'components', 'simulations', 'c6_8');
const REF_TEMPLATE = path.join(__dirname, 'ref-template.txt');

// Ensure dirs exist
if (!fs.existsSync(PROMPTS_DIR)) fs.mkdirSync(PROMPTS_DIR, { recursive: true });

// ─── Simulation templates to generate ─────────────────────────
// Excludes: MeasurementLab (hand-built), MotionCart (Matter.js hand-built),
//           LightRay (reference), CircuitBuilder (reference)

const TEMPLATES = [
  // Physics
  { template: 'matter-states',      component: 'MatterStatesSimulation',      subject: 'Physics',  topic: 'States of Matter (solid, liquid, gas, particle behavior, kinetic theory)' },
  { template: 'sound-wave',         component: 'SoundWaveSimulation',         subject: 'Physics',  topic: 'Sound Waves (vibration, pitch, frequency, amplitude, loudness, echo)' },
  { template: 'heat-transfer',      component: 'HeatTransferSimulation',      subject: 'Physics',  topic: 'Heat Transfer (conduction, convection, radiation, thermal expansion, change of state)' },
  { template: 'magnet-explorer',    component: 'MagnetExplorerSimulation',    subject: 'Physics',  topic: 'Magnetism (bar magnet, horseshoe magnet, magnetic field, compass, electromagnet)' },
  { template: 'density-tank',       component: 'DensityTankSimulation',       subject: 'Physics',  topic: 'Density and Flotation (density, buoyancy, float/sink, upthrust, relative density, pressure)' },
  { template: 'energy-lever',       component: 'EnergyLeverSimulation',       subject: 'Physics',  topic: 'Energy, Work, Power and Machines (levers, mechanical advantage, turning effect, moment of force)' },
  // Chemistry
  { template: 'atom-builder',       component: 'AtomBuilderSimulation',       subject: 'Chemistry', topic: 'Atomic Structure (atoms, subatomic particles, atomic number, mass number, elements)' },
  { template: 'mixture-separator',  component: 'MixtureSeparatorSimulation',  subject: 'Chemistry', topic: 'Mixtures and Separation (separation techniques, filtration, distillation, chromatography)' },
  { template: 'reaction-viewer',    component: 'ReactionViewerSimulation',    subject: 'Chemistry', topic: 'Physical and Chemical Changes, Compounds and Reactions' },
  // Biology
  { template: 'diagram-explorer',   component: 'DiagramExplorerSimulation',   subject: 'Biology',  topic: 'Biology Diagrams (cells, tissues, organs, plant anatomy, human body systems)' },
  { template: 'classification-sorter', component: 'ClassificationSorterSimulation', subject: 'Biology', topic: 'Classification and Sorting (living things, plant types, animal groups)' },
  // Maths
  { template: 'number-line',        component: 'NumberLineSimulation',        subject: 'Maths',    topic: 'Number System (integers, rational numbers, algebra, equations, percentages, profit/loss, interest, exponents, sets)' },
  { template: 'geometry-constructor', component: 'GeometryConstructorSimulation', subject: 'Maths',  topic: 'Geometry (angles, triangles, quadrilaterals, circles, construction, symmetry, area, perimeter, volume, 3D shapes)' },
  { template: 'graph-plotter',      component: 'GraphPlotterSimulation',      subject: 'Maths',    topic: 'Data Handling and Graphs (statistics, bar graphs, pie charts, mean/median/mode, Cartesian coordinates)' },
  { template: 'probability-lab',    component: 'ProbabilityLabSimulation',    subject: 'Maths',    topic: 'Probability (chance, coins, dice, random experiments)' },
  // Geography
  { template: 'map-explorer',       component: 'MapExplorerSimulation',       subject: 'Geography', topic: 'Geography and Maps (continents, landforms, climate, natural resources, map reading)' },
  // Computer Science
  { template: 'code-editor',        component: 'CodeEditorSimulation',        subject: 'CS',       topic: 'Computer Science (HTML, Java, CSS, programming, Scratch, algorithms, apps)' },
  { template: 'flowchart-builder',  component: 'FlowchartBuilderSimulation',  subject: 'CS',       topic: 'Flowcharts and Algorithms (flowchart symbols, algorithm design, logic)' },
  // History / Civics
  { template: 'timeline-builder',   component: 'TimelineBuilderSimulation',   subject: 'History',  topic: 'Historical Timelines (dynasties, empires, wars, revolutions, civilizations, chronological events)' },
  { template: 'concept-map',        component: 'ConceptMapSimulation',        subject: 'History',  topic: 'History and Civics Concepts (governance, constitutions, institutions, historical themes)' },
];

// ─── Prompt builder ───────────────────────────────────────────

function buildPrompt(templateInfo, enrichmentJson) {
  const refTemplate = fs.readFileSync(REF_TEMPLATE, 'utf8');

  // Limit enrichment data to first 5 nodes to keep prompt size manageable
  const nodes = JSON.parse(enrichmentJson);
  const limitedNodes = nodes.slice(0, 5);
  const enrichmentStr = JSON.stringify(limitedNodes, null, 2);

  return `You are generating a React/TypeScript simulation component for a CISCE Class 6-8 science learning platform.

TASK: Generate a complete ${templateInfo.component}.tsx component about ${templateInfo.topic}.

This is for STRUGGLING students. It must TEACH through interaction, not just decorate.

CRITICAL: You must follow this EXACT template structure from the reference file below. Do NOT deviate from the layout, styling, or component structure. Use Tailwind CSS classes (NOT inline styles). Use the same light theme (white background, slate text, blue accents).

The component MUST have these sections in this order:
1. HEADER — node ID badge, title, score badge
2. TABS — 3 tabs: "💡 Simple Explanation (ELI5)", "📖 ${templateInfo.subject} Theory", "⚠️ Common Misconceptions" with AnimatePresence
3. MAIN GRID — grid-cols-1 lg:grid-cols-[1fr_320px]:
   - LEFT: SVG simulation canvas with mode selector buttons + reset button
   - RIGHT: Live Readouts card (with EDITABLE number inputs that update the simulation) + Controls card (sliders with min/max labels)
4. PROGRESSIVE CHALLENGES — full width, with formula display, answer input (number/text/mcq), feedback with step-by-step working, check answer button, next button, hint
5. REAL-WORLD ACTIVITY — full width, textarea for observation, submit button

STRICT REQUIREMENTS:
- 'use client' at top
- import React, { useState, useEffect, useRef, useCallback } from 'react'
- import { motion, AnimatePresence } from 'framer-motion'
- Export interface with: nodeId?, title?, definition?, eli5?, misconceptions?, diagnosticQuestions?, masteryCriteria?, onComplete?
- diagnosticQuestions items must have: number, bloomLevel, question, answer, answerType ('number'|'text'|'mcq'), unit?, formula?, working?, options?, hint?
- Default props MUST use the REAL enrichment data provided below — use the first node's definition, eli5, misconceptions, and masteryCriteria
- 3 progressive challenges: recall → apply → evaluate
- Each challenge MUST require interacting with the simulation
- Each challenge MUST show formula, working (step-by-step), and meaningful feedback
- Live readouts MUST be editable <input type="number"> fields that update the simulation when typed into
- Sliders MUST have min/max explanatory labels
- Reset button to restore defaults
- SVG must show a topic-specific interactive visualization with animated elements
- Mode selector buttons for different aspects of the topic
- All Tailwind classes, NO inline styles except for SVG attributes
- Must compile with TypeScript (no 'any' types, no unused imports, no LaTeX in JSX)
- Target 700-900 lines
- Do NOT use LaTeX notation like \\frac — use plain text like (a/b)

CHALLENGE DESIGN:
- Derive the 3 challenges from the enrichment diagnostic questions below
- Convert essay-style questions into interactive challenges that require using the simulation
- Challenge 1 (recall): Ask the student to set a value in the simulation and read a readout. Numeric answer.
- Challenge 2 (apply): Give a calculation problem based on the topic. Show formula, provide values, student calculates. Numeric answer with unit.
- Challenge 3 (evaluate): Ask student to change something in the simulation and explain what happens. Text answer.
- Each challenge's "working" field must show step-by-step solution
- Each challenge's "hint" must guide the student to use the simulation

Here is the REAL ENRICHMENT DATA for this topic. Use the first node's content for the default props (definition, eli5, misconceptions, masteryCriteria). Derive challenges from the diagnostic questions:

--- ENRICHMENT DATA ---
${enrichmentStr}
--- END ENRICHMENT DATA ---

Here is the REFERENCE TEMPLATE (LightRaySimulation.tsx) — follow its EXACT structure, styling, and patterns:

--- REFERENCE TEMPLATE ---
${refTemplate}
--- END REFERENCE TEMPLATE ---

Generate the COMPLETE ${templateInfo.component}.tsx file. Output ONLY the TypeScript code, no markdown fences, no explanations.`;
}

// ─── Gemini caller (returns promise) ──────────────────────────

function callGemini(promptFile, outputFile, keyIndex) {
  return new Promise((resolve, reject) => {
    const apiKey = keyIndex === 1
      ? 'AQ.Ab8RN6LDccrCPDvyQ4nFydMGXEz0XYJexA1VBgyA1AKvmnUEwg'
      : 'AQ.Ab8RN6KNABGpFE0AN7Mgsu0wWlMTd94M-ZfNncE0W7Iz41TKdA';

    const prompt = fs.readFileSync(promptFile, 'utf8');
    const model = 'gemini-flash-lite-latest';
    const body = JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { maxOutputTokens: 65536, temperature: 0.7 },
    });

    const options = {
      hostname: 'generativelanguage.googleapis.com',
      path: `/v1beta/models/${model}:generateContent?key=${apiKey}`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) },
    };

    const https = require('https');
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        if (res.statusCode !== 200) {
          reject(new Error(`API error ${res.statusCode}: ${data.substring(0, 300)}`));
          return;
        }
        try {
          const json = JSON.parse(data);
          const text = json.candidates?.[0]?.content?.parts?.[0]?.text || '';
          const cleaned = text.replace(/^```tsx?\n/, '').replace(/\n```$/, '');
          fs.writeFileSync(outputFile, cleaned);
          const lines = cleaned.split('\n').length;
          resolve({ file: outputFile, lines, chars: cleaned.length });
        } catch (e) {
          reject(new Error(`Parse error: ${e.message}`));
        }
      });
    });

    req.on('error', (e) => reject(new Error(`Request error: ${e.message}`)));
    req.write(body);
    req.end();
  });
}

// ─── TypeScript check ─────────────────────────────────────────

function checkCompilation(componentName) {
  try {
    const output = execSync(
      `npx tsc --noEmit --project tsconfig.json 2>&1`,
      { cwd: ROOT, encoding: 'utf8', timeout: 120000 }
    );
    // Check if our component has errors
    const errors = output.split('\n').filter(l => l.includes(componentName));
    return { ok: errors.length === 0, errors };
  } catch (err) {
    const output = err.stdout || err.message || '';
    const errors = output.split('\n').filter(l => l.includes(componentName));
    return { ok: errors.length === 0, errors };
  }
}

// ─── Sleep ────────────────────────────────────────────────────

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

// ─── Main pipeline ────────────────────────────────────────────

async function main() {
  console.log('=== CISCE C6-8 Simulation Generation Pipeline ===\n');
  console.log(`Templates to generate: ${TEMPLATES.length}`);
  console.log(`Batch size: 2 (parallel, alternating keys)`);
  console.log(`Gap between batches: 30 seconds\n`);

  const refTemplate = fs.readFileSync(REF_TEMPLATE, 'utf8');
  const results = [];

  // Process in batches of 2
  for (let i = 0; i < TEMPLATES.length; i += 2) {
    const batch = TEMPLATES.slice(i, i + 2);
    const batchNum = Math.floor(i / 2) + 1;
    console.log(`\n--- Batch ${batchNum}: ${batch.map(b => b.component).join(' + ')} ---`);

    // Build prompts for this batch
    const promptPromises = batch.map(async (tpl) => {
      const enrichFile = path.join(ENRICHMENT_DIR, `${tpl.template}.json`);
      if (!fs.existsSync(enrichFile)) {
        console.log(`  WARNING: No enrichment data for ${tpl.template}, using empty`);
        return { tpl, promptFile: null };
      }
      const enrichmentJson = fs.readFileSync(enrichFile, 'utf8');
      const prompt = buildPrompt(tpl, enrichmentJson);
      const promptFile = path.join(PROMPTS_DIR, `prompt-${tpl.template}-full.txt`);
      fs.writeFileSync(promptFile, prompt);
      console.log(`  Prompt for ${tpl.component}: ${prompt.length} chars`);
      return { tpl, promptFile };
    });

    const promptResults = await Promise.all(promptPromises);

    // Call Gemini in parallel (key 1 for first, key 2 for second)
    const geminiPromises = promptResults.map((pr, idx) => {
      if (!pr.promptFile) return Promise.resolve({ file: 'skipped', lines: 0, chars: 0 });
      const outputFile = path.join(SIM_DIR, `${pr.tpl.component}.tsx`);
      const keyIndex = idx + 1;
      console.log(`  Calling Gemini (key ${keyIndex}) for ${pr.tpl.component}...`);
      return callGemini(pr.promptFile, outputFile, keyIndex);
    });

    try {
      const batchResults = await Promise.all(geminiPromises);
      for (const r of batchResults) {
        if (r.file !== 'skipped') {
          console.log(`  ✅ ${path.basename(r.file)}: ${r.lines} lines, ${r.chars} chars`);
          results.push({ ...r, status: 'generated' });
        }
      }
    } catch (err) {
      console.error(`  ❌ Batch error: ${err.message}`);
      results.push({ status: 'error', error: err.message });
    }

    // Check compilation
    console.log(`  Checking TypeScript compilation...`);
    for (const pr of promptResults) {
      if (!pr.promptFile) continue;
      const { ok, errors } = checkCompilation(pr.tpl.component);
      if (ok) {
        console.log(`  ✅ ${pr.tpl.component}: compiles clean`);
      } else {
        console.log(`  ❌ ${pr.tpl.component}: ${errors.length} errors`);
        errors.forEach(e => console.log(`     ${e.trim()}`));
      }
    }

    // Wait 30 seconds before next batch (unless this is the last batch)
    if (i + 2 < TEMPLATES.length) {
      console.log(`  ⏳ Waiting 30 seconds before next batch...`);
      await sleep(30000);
    }
  }

  // Summary
  console.log('\n=== GENERATION COMPLETE ===\n');
  console.log(`Total templates: ${TEMPLATES.length}`);
  console.log(`Generated: ${results.filter(r => r.status === 'generated').length}`);
  console.log(`Errors: ${results.filter(r => r.status === 'error').length}`);

  // Final compilation check
  console.log('\n=== FINAL TYPESCRIPT CHECK ===\n');
  try {
    const output = execSync(`npx tsc --noEmit --project tsconfig.json 2>&1`, {
      cwd: ROOT, encoding: 'utf8', timeout: 120000
    });
    const simErrors = output.split('\n').filter(l => l.includes('simulations/c6_8'));
    if (simErrors.length === 0) {
      console.log('✅ All simulation files compile clean!');
    } else {
      console.log(`❌ ${simErrors.length} errors in simulation files:`);
      simErrors.forEach(e => console.log(`  ${e.trim()}`));
    }
  } catch (err) {
    const output = err.stdout || err.message || '';
    const simErrors = output.split('\n').filter(l => l.includes('simulations/c6_8'));
    if (simErrors.length === 0) {
      console.log('✅ All simulation files compile clean!');
    } else {
      console.log(`❌ ${simErrors.length} errors in simulation files:`);
      simErrors.forEach(e => console.log(`  ${e.trim()}`));
    }
  }
}

main().catch(err => {
  console.error('FATAL:', err.message);
  process.exit(1);
});
