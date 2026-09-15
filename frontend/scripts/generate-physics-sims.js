// Physics Sim Generator — Gemini 3.6 Flash
// Generates CBSE physics sims for 19 gap chapters
// Uses reference sim for quality bar, validates before writing
// 4 keys, 4 sims/round, 60s pause, staggered

const https = require('https');
const fs = require('fs');
const path = require('path');

// ─── API keys (bottom 10 from gemini-keys-all.env) ──────────
const KEYS = [
  'AQ.Ab8RN6Lc6Z1gcpk-zxlfFXu97vyq6tfB5hZCMPFAXcYW4NNTPw',
  'AQ.Ab8RN6Kxg4bZq4NwXgAI7s6v93Bhr4aU0kQWk1ccOakQvSO3Jw',
  'AQ.Ab8RN6KsDXS96P9O_Ikwm3eYaTaSrAup8P977DvEANr9fhTvaA',
  'AQ.Ab8RN6Lg0c6HXAglMcf3NDcLXh-U1-KgzuKE0a35hCUHaOtTrA',
  'AQ.Ab8RN6JaV0sZuwv3fvu24X-ZKd9Ufyxumoa-tdwf8zaIppAAVQ',
  'AQ.Ab8RN6IdQlpw3dVUpKWqBkZwiNkFScODXd34Yx-HoTqgeYSKFw',
  'AQ.Ab8RN6KSgLY8Wkt5251wHAvYiZk29RvCRrAM_ZNwWsAIvI3-qA',
  'AQ.Ab8RN6KeHj4oyMqzM6UX8nu53U9SYJi-TbD_W0gjTsLdMlwymA',
  'AQ.Ab8RN6LtoMR8aL8q5ELEKmFPmKp8YBvpc-8-GrRvyEsD-FW39w',
  'AQ.Ab8RN6K1Vx0W6M9FFfgsIrcwZK2g4pm6Qa6K9c08PBuIupvO0Q',
];

const MODEL = 'gemini-3.6-flash';
const MAX_TOKENS = 65536;
const BREAK_MS = 60000;
const MAX_RETRIES = 5;
const SIMS_PER_ROUND = 10;

const OUTPUT_DIR = path.join(__dirname, '..', 'components', 'simulations', 'c6_12');
const REFERENCE_SIM = fs.readFileSync(
  path.join(OUTPUT_DIR, 'C12_PhysicsZenerDiodeSim.tsx'), 'utf8'
);

// ─── 19 gap chapters ─────────────────────────────────────────
const TEMPLATES = [
  // C6
  { id: 'C6_PhysicsElectricityCircuitsCBSESim', class: 6, chapter: 'Electricity and Circuits',
    nodes: ['c6_phy_cbse_001','c6_phy_cbse_002','c6_phy_cbse_003','c6_phy_cbse_004','c6_phy_cbse_005','c6_phy_cbse_006','c6_phy_cbse_007','c6_phy_cbse_008','c6_phy_cbse_009'],
    topics: 'Electric cell structure and terminals, electric bulb and filament, simple circuits, switches, conductors and insulators, electricity safety hazards' },
  // C7
  { id: 'C7_PhysicsLightReflectionMirrorsCBSESim', class: 7, chapter: 'Light — Propagation, Reflection, Mirrors, Lenses, and Dispersion',
    nodes: ['c7_phy_cbse_001','c7_phy_cbse_002','c7_phy_cbse_003','c7_phy_cbse_004','c7_phy_cbse_005','c7_phy_cbse_007','c7_phy_cbse_008','c7_phy_cbse_009','c7_phy_cbse_010','c7_phy_cbse_011','c7_phy_cbse_012','c7_phy_cbse_013','c7_phy_cbse_014','c7_phy_cbse_015'],
    topics: 'Rectilinear propagation of light, reflection, plane mirror image formation, spherical mirrors, concave and convex mirrors, image formation by mirrors, lens properties, dispersion of light' },
  { id: 'C7_PhysicsLightShadowsReflectionsCBSESim', class: 7, chapter: 'Light: Shadows and Reflections',
    nodes: ['c7_phy_cbse_001','c7_phy_cbse_002','c7_phy_cbse_003','c7_phy_cbse_004','c7_phy_cbse_005','c7_phy_cbse_006','c7_phy_cbse_007','c7_phy_cbse_008','c7_phy_cbse_009','c7_phy_cbse_010'],
    topics: 'Luminous and non-luminous objects, rectilinear propagation, transparent translucent opaque materials, shadows, pinhole camera, reflection, plane mirrors' },
  { id: 'C7_PhysicsMeasurementTimeMotionCBSESim', class: 7, chapter: 'Measurement of Time and Motion',
    nodes: ['c7_phy_cbse_001','c7_phy_cbse_002','c7_phy_cbse_003','c7_phy_cbse_004','c7_phy_cbse_005','c7_phy_cbse_006','c7_phy_cbse_007','c7_phy_cbse_008'],
    topics: 'Early time measurement methods, pendulum as timekeeper, oscillatory motion, simple pendulum, period and amplitude, sundials, water clocks, modern timekeeping' },
  { id: 'C7_PhysicsMotionTimeCBSESim', class: 7, chapter: 'Motion and Time',
    nodes: ['c7_phy_cbse_001','c7_phy_cbse_002','c7_phy_cbse_003','c7_phy_cbse_004','c7_phy_cbse_005','c7_phy_cbse_006','c7_phy_cbse_007','c7_phy_cbse_008','c7_phy_cbse_009','c7_phy_cbse_010','c7_phy_cbse_011','c7_phy_cbse_012','c7_phy_cbse_013'],
    topics: 'Slow and fast motion, speed definition and formula, types of motion (straight line, circular, periodic), distance-time graphs, measuring speed, time measurement units' },
  { id: 'C7_PhysicsElectricityCircuitsComponentsCBSESim', class: 7, chapter: 'Electricity: Circuits and their Components',
    nodes: ['c7_phy_cbse_001','c7_phy_cbse_002','c7_phy_cbse_003','c7_phy_cbse_004','c7_phy_cbse_004b','c7_phy_cbse_005','c7_phy_cbse_006','c7_phy_cbse_007','c7_phy_cbse_008','c7_phy_cbse_009'],
    topics: 'Electricity as energy, electric cell, battery, electric circuit, switch, bulb, conductor, insulator, circuit diagrams, fuses and safety' },
  // C8
  { id: 'C8_PhysicsElectricityMagneticHeatingCBSESim', class: 8, chapter: 'Electricity: Magnetic and Heating Effects',
    nodes: ['c8_phy_cbse_001','c8_phy_cbse_002','c8_phy_cbse_003','c8_phy_cbse_004','c8_phy_cbse_005','c8_phy_cbse_006','c8_phy_cbse_007','c8_phy_cbse_008','c8_phy_cbse_009','c8_phy_cbse_010','c8_phy_cbse_011','c8_phy_cbse_012','c8_phy_cbse_013','c8_phy_cbse_014','c8_phy_cbse_015'],
    topics: 'Magnetic effect of electric current, Oersted discovery, magnetic field around current-carrying conductor, electromagnet, heating effect of current, Joules law, electric fuse, applications' },
  { id: 'C8_PhysicsLightCBSESim', class: 8, chapter: 'Light',
    nodes: ['c8_phy_cbse_001','c8_phy_cbse_002','c8_phy_cbse_003','c8_phy_cbse_004','c8_phy_cbse_005','c8_phy_cbse_006','c8_phy_cbse_007','c8_phy_cbse_008','c8_phy_cbse_009','c8_phy_cbse_010','c8_phy_cbse_011','c8_phy_cbse_012','c8_phy_cbse_013','c8_phy_cbse_014','c8_phy_cbse_015','c8_phy_cbse_016','c8_phy_cbse_017','c8_phy_cbse_018','c8_phy_cbse_019'],
    topics: 'Vision and light, laws of reflection, plane mirror images, regular and diffuse reflection, refraction, refractive index, lenses, image formation by lenses, human eye, defects of vision' },
  { id: 'C8_PhysicsSoundCBSESim', class: 8, chapter: 'Sound',
    nodes: ['c8_phy_cbse_001','c8_phy_cbse_002','c8_phy_cbse_003','c8_phy_cbse_004','c8_phy_cbse_005','c8_phy_cbse_006','c8_phy_cbse_007','c8_phy_cbse_008','c8_phy_cbse_009','c8_phy_cbse_010','c8_phy_cbse_011'],
    topics: 'Sound production by vibrating objects, human voice box, sound propagation through media, characteristics of sound waves, amplitude frequency wavelength, audible and ultrasonic sound, noise pollution' },
  // C9
  { id: 'C9_PhysicsJourneyInsideAtomCBSESim', class: 9, chapter: 'Journey Inside the Atom',
    nodes: ['c9_phy_cbse_001','c9_phy_cbse_002','c9_phy_cbse_003','c9_phy_cbse_004','c9_phy_cbse_005','c9_phy_cbse_006','c9_phy_cbse_007','c9_phy_cbse_008','c9_phy_cbse_009','c9_phy_cbse_010','c9_phy_cbse_011','c9_phy_cbse_012','c9_phy_cbse_013','c9_phy_cbse_014','c9_phy_cbse_015','c9_phy_cbse_016','c9_phy_cbse_017','c9_phy_cbse_018','c9_phy_cbse_019'],
    topics: 'Matter as collection of atoms, ancient atomic theory, Dalton atomic theory, atomic models (Thomson, Rutherford, Bohr), subatomic particles, atomic number, mass number, isotopes, electronic configuration' },
  // C11
  { id: 'C11_PhysicsKineticTheoryGasesCBSESim', class: 11, chapter: 'Kinetic Theory of Gases',
    nodes: Array.from({length:24},(_,i)=>`c11_phy_cbse_${String(i+1).padStart(3,'0')}`),
    topics: 'Molecular nature of matter, gas laws (Boyle, Charles, Gay-Lussac), ideal gas equation, kinetic theory assumptions, pressure exerted by gas, kinetic interpretation of temperature, degrees of freedom, equipartition of energy, specific heat capacity, mean free path' },
  { id: 'C11_PhysicsMechanicalPropertiesSolidsCBSESim', class: 11, chapter: 'Mechanical Properties of Solids',
    nodes: Array.from({length:27},(_,i)=>`c11_phy_cbse_${String(i+1).padStart(3,'0')}`),
    topics: 'Elasticity and plasticity, stress and strain, Hooke law, Young modulus, shear modulus, bulk modulus, Poisson ratio, stress-strain curve, elastic potential energy, applications of elasticity' },
  { id: 'C11_PhysicsMotionStraightLineCBSESim', class: 11, chapter: 'Motion in a Straight Line',
    nodes: Array.from({length:23},(_,i)=>`c11_phy_cbse_${String(i+1).padStart(3,'0')}`),
    topics: 'Reference frames, position, point object approximation, average velocity and speed, instantaneous velocity and speed, uniform motion, position-time graphs, velocity-time graphs, equations of uniformly accelerated motion, relative velocity' },
  { id: 'C11_PhysicsWaveMotionPropertiesCBSESim', class: 11, chapter: 'Wave Motion and Its Properties',
    nodes: Array.from({length:25},(_,i)=>`c11_phy_cbse_${String(i+1).padStart(3,'0')}`),
    topics: 'Wave motion fundamentals, transverse and longitudinal waves, wavelength frequency amplitude, wave speed, superposition principle, interference, beats, Doppler effect, standing waves' },
  // C12
  { id: 'C12_PhysicsAlternatingCurrentCBSESim', class: 12, chapter: 'Alternating Current',
    nodes: Array.from({length:20},(_,i)=>`c12_phy_cbse_${String(i+1).padStart(3,'0')}`),
    topics: 'AC introduction, sinusoidal waveform, RMS value, AC through resistor, AC through inductor, AC through capacitor, series LCR circuit, resonance, power in AC circuits, LC oscillations, transformer' },
  { id: 'C12_PhysicsDualNatureRadiationCBSESim', class: 12, chapter: 'Dual Nature of Radiation and Matter',
    nodes: Array.from({length:13},(_,i)=>`c12_phy_cbse_${String(i+1).padStart(3,'0')}`),
    topics: 'Electron discovery, Millikan oil-drop experiment, electron emission, photoelectric effect, Einstein photoelectric equation, photon, wave-particle duality, de Broglie wavelength, Davisson-Germer experiment' },
  { id: 'C12_PhysicsElectromagneticWavesCBSESim', class: 12, chapter: 'Electromagnetic Waves',
    nodes: Array.from({length:22},(_,i)=>`c12_phy_cbse_${String(i+21).padStart(3,'0')}`),
    topics: 'Ampere law inconsistency, displacement current, Maxwell equations, electromagnetic waves, transverse nature, EM spectrum (radio, microwave, infrared, visible, UV, X-ray, gamma)' },
  { id: 'C12_PhysicsElectrostaticPotentialCapacitanceCBSESim', class: 12, chapter: 'Electrostatic Potential and Capacitance',
    nodes: Array.from({length:21},(_,i)=>`c12_phy_cbse_${String(i+1).padStart(3,'0')}`),
    topics: 'Electrostatic potential, potential difference, equipotential surfaces, potential energy, capacitance, parallel plate capacitor, dielectrics, capacitors in series and parallel, energy stored in capacitor, Van de Graaff generator' },
  { id: 'C12_PhysicsNucleiCBSESim', class: 12, chapter: 'Nuclei',
    nodes: Array.from({length:25},(_,i)=>`c12_phy_cbse_${String(i+1).padStart(3,'0')}`),
    topics: 'Nuclear structure, atomic mass unit, proton and neutron, nuclear force, mass-energy relation, nuclear binding energy, binding energy curve, radioactivity, alpha beta gamma decay, half-life, nuclear fission, nuclear fusion' },
];

// ─── Progress tracking ───────────────────────────────────────
const PROGRESS_FILE = path.join(__dirname, 'phys_sim_progress.json');
function loadProgress() {
  try { return JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf8')); }
  catch { return { completed: [], failed: [], lastRun: null }; }
}
function saveProgress(prog) {
  prog.lastRun = new Date().toISOString();
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify(prog, null, 2));
}

// ─── Validation ──────────────────────────────────────────────
function validateSim(code, template) {
  const errors = [];

  // Must start with 'use client'
  if (!code.trim().startsWith("'use client'") && !code.trim().startsWith('"use client"')) {
    errors.push("Missing 'use client' directive at top");
  }

  // Must have required imports
  const requiredImports = [
    "from 'react'",
    "from 'framer-motion'",
    "from '../../../lib/sim-engine'",
    "from '../../../lib/srs'",
    "from '../../../lib/bkt'",
    "from '../../../lib/masteryStore'",
  ];
  for (const imp of requiredImports) {
    if (!code.includes(imp)) {
      errors.push(`Missing import: ${imp}`);
    }
  }

  // Must have ALL_NODE_IDS array
  if (!code.includes('ALL_NODE_IDS')) {
    errors.push("Missing ALL_NODE_IDS array");
  }

  // Must have all node IDs as string literals
  for (const nodeId of template.nodes) {
    if (!code.includes(`'${nodeId}'`) && !code.includes(`"${nodeId}"`)) {
      errors.push(`Missing node ID string literal: ${nodeId}`);
    }
  }

  // Must have correct API signatures
  // createReviewItem must have 2 args
  const reviewMatches = code.match(/createReviewItem\([^)]+\)/g) || [];
  for (const m of reviewMatches) {
    const argCount = (m.match(/,/g) || []).length;
    if (argCount < 1) {
      errors.push(`createReviewItem called with < 2 args: ${m}`);
    }
  }

  // sm2Update must have 3 args
  const sm2Matches = code.match(/sm2Update\([^)]+\)/g) || [];
  for (const m of sm2Matches) {
    const argCount = (m.match(/,/g) || []).length;
    if (argCount < 2) {
      errors.push(`sm2Update called with < 3 args: ${m}`);
    }
  }

  // createBKTState must have 0 args
  if (code.match(/createBKTState\([^)]+\)/)) {
    const bktMatches = code.match(/createBKTState\(([^)]+)\)/g) || [];
    for (const m of bktMatches) {
      if (!m.match(/createBKTState\(\s*\)/)) {
        errors.push(`createBKTState called with args (should be 0): ${m}`);
      }
    }
  }

  // recordGameScore must be called
  if (!code.includes('recordGameScore')) {
    errors.push("Missing recordGameScore call");
  }

  // Must have default export
  if (!code.match(/export\s+default/)) {
    errors.push("Missing default export");
  }

  // Must have SCENARIO
  if (!code.includes('SCENARIO')) {
    errors.push("Missing SCENARIO object");
  }

  // Must have DISCOVERY_QUESTION
  if (!code.includes('DISCOVERY_QUESTION')) {
    errors.push("Missing DISCOVERY_QUESTION");
  }

  // Must have challenges
  if (!code.match(/challenge/i)) {
    errors.push("Missing challenge structure");
  }

  // Must have MISCONCEPTIONS
  if (!code.match(/MISCONCEPTION/i)) {
    errors.push("Missing MISCONCEPTIONS data");
  }

  // Minimum line count
  const lineCount = code.split('\n').length;
  if (lineCount < 500) {
    errors.push(`Too short: ${lineCount} lines (minimum 500)`);
  }

  // No markdown fences
  if (code.includes('```')) {
    errors.push("Contains markdown fences (should be raw code only)");
  }

  // No 'any' type
  if (code.match(/:\s*any\b/)) {
    errors.push("Contains 'any' type (use proper TypeScript types)");
  }

  // Balanced braces (rough check)
  const openBraces = (code.match(/{/g) || []).length;
  const closeBraces = (code.match(/}/g) || []).length;
  if (Math.abs(openBraces - closeBraces) > 2) {
    errors.push(`Unbalanced braces: ${openBraces} open vs ${closeBraces} close`);
  }

  // Balanced parens (rough check)
  const openParens = (code.match(/\(/g) || []).length;
  const closeParens = (code.match(/\)/g) || []).length;
  if (Math.abs(openParens - closeParens) > 2) {
    errors.push(`Unbalanced parens: ${openParens} open vs ${closeParens} close`);
  }

  return errors;
}

// ─── Prompt builder ──────────────────────────────────────────
function buildPrompt(template) {
  const nodeIdList = template.nodes.join(', ');
  const classLabel = `Class ${template.class}`;
  const boardLabel = 'CBSE';

  // Truncate reference sim to first 3000 chars to keep prompt manageable
  const refSnippet = REFERENCE_SIM.substring(0, 8000);

  return `You are a world-class educational game designer and senior React/TypeScript engineer. You build Brilliant.org-quality interactive physics simulations that make abstract concepts tangible and joyful.

## YOUR MISSION

Build ONE complete, production-ready React component that teaches Physics to ${classLabel} (${boardLabel}) students through visual, interactive, adaptive learning. This is NOT a quiz. This is NOT a textbook. This is a hands-on laboratory where every concept comes alive.

## OUTPUT FORMAT — CRITICAL

Output ONLY raw TypeScript code. No markdown fences. No JSON. No explanations. No commentary.
Start with: 'use client';
End with: the default export statement.
The entire output must be valid .tsx file content that compiles without errors.

## REFERENCE SIM (quality bar — match this level of detail)

Below is a REFERENCE simulation that represents the QUALITY BAR you must match. Study its structure, imports, API usage, visual components, and interactivity. Your output must be of equal or better quality.

--- REFERENCE SIM START (first 8000 chars) ---
${refSnippet}
--- REFERENCE SIM END ---

## COMPONENT TO GENERATE

File: components/simulations/c6_12/${template.id}.tsx
Class: ${classLabel} (${boardLabel})
Subject: Physics
Chapter: ${template.chapter}

## NODES THIS SIM COVERS (teach ALL of them)

${template.topics}

These node IDs MUST appear as string literals in the code:
${nodeIdList}

## CRITICAL API RULES (VERIFIED CORRECT — follow EXACTLY)

### Imports (use exactly these)
'use client';
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

### API signatures (MUST follow exactly — wrong args = compilation error)
- createReviewItem(nodeId, conceptName) — TWO arguments, second is a string like 'Physics'
- sm2Update(item, quality, responseTime) — THREE arguments, third is 0
- createBKTState() — ZERO arguments (no args inside parentheses)
- recordGameScore(ALL_NODE_IDS, score) — first arg is an array of node ID strings
- bktUpdate(bktState, isCorrect) — TWO arguments
- getMasteryLevel(pKnown) — ONE argument (number 0-1)

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

## DESIGN PHILOSOPHY — BRILLIANT.ORG QUALITY

### Physics-Specific Visual Requirements
- Interactive physics simulations with REAL-TIME physics calculations
- Canvas-based animations: particles, waves, trajectories, field lines, circuit diagrams
- SVG diagrams: ray diagrams (light), circuit schematics, force diagrams, energy bars
- Interactive sliders for physical variables (voltage, mass, angle, frequency, distance)
- Live readouts that update as variables change (force = ma, V = IR, f = 1/T, etc.)
- Visual experiments: pendulum swing, projectile motion, wave interference, prism dispersion
- Animated diagrams showing physical processes (electron flow, wave propagation, refraction)
- At least 2 Canvas animations + 3 SVG diagrams specific to THIS topic
- Formula visualisation: show the formula AND the physical meaning side-by-side

### Interactivity
Students must MANIPULATE and OBSERVE:
- Slide variables and see real-time physics responses
- Drag objects to build circuits, trace ray paths, assemble wave patterns
- Predict outcomes then verify with simulation
- Adjust parameters and observe effects on graphs/diagrams

### Adaptive Learning
- Start with a discovery question (predict before learning)
- Teach with visual slides (5 slides minimum)
- Challenge with 8+ progressive challenges
- Adapt difficulty based on BKT mastery level
- Give specific misconception feedback
- End with a real-world application activity

## STRICT REQUIREMENTS (all must be met or file will be rejected)

1. 'use client' at top
2. All imports exactly as specified above
3. NO other libraries
4. Default export at bottom
5. Node ID constants at top (ALL_NODE_IDS array containing all node IDs)
6. SCENARIO object with narrative context
7. DISCOVERY_QUESTION (predict-before-learn)
8. TEACHING_SLIDES array (5 slides, each with visual + explanation)
9. CHALLENGES array (8+ challenges, progressive difficulty)
10. MISCONCEPTIONS_CHECKLIST array with 5 misconceptions
11. Main component with state management
12. BKT state per node, bktUpdate() after each answer
13. sm2Update() after each challenge with responseTime = 0
14. recordGameScore(ALL_NODE_IDS, finalScore) on completion
15. Adaptive difficulty (foundation/standard/advanced)
16. Auto-hint after 10s inactivity
17. Progress bar
18. audioManager.play() called 8+ times
19. speechManager.speak() called 5+ times
20. <HintBubble>, <Confetti>, <SuccessBanner>, <SparkleBurst> in JSX
21. All node IDs from the list above as string literals
22. No 'any' type — use proper TypeScript interfaces
23. Minimum 800 lines
24. No markdown fences in output
25. createReviewItem(nodeId, 'Physics') — TWO args
26. sm2Update(item, quality, 0) — THREE args
27. createBKTState() — ZERO args

## OUTPUT: Only raw TypeScript code. No markdown fences. No explanations.
Start with: 'use client';
End with: export default ${template.id};`;
}

// ─── Gemini API call ─────────────────────────────────────────
function callGemini(key, prompt) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { maxOutputTokens: MAX_TOKENS, temperature: 0.7 },
    });

    const req = https.request({
      hostname: 'generativelanguage.googleapis.com',
      port: 443,
      path: `/v1beta/models/${MODEL}:generateContent?key=${key}`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            const json = JSON.parse(data);
            const text = json.candidates?.[0]?.content?.parts?.[0]?.text || '';
            resolve(text);
          } catch (e) {
            reject(new Error(`Parse error: ${e.message}`));
          }
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${data.substring(0, 300)}`));
        }
      });
    });

    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

// ─── Clean Gemini response ───────────────────────────────────
function cleanResponse(text) {
  let cleaned = text.trim();
  // Remove markdown fences if present
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```(?:typescript|tsx|js|javascript)?\n?/, '');
    cleaned = cleaned.replace(/\n?```$/, '');
  }
  // Remove any leading/trailing whitespace
  cleaned = cleaned.trim();
  return cleaned;
}

// ─── Generate one sim ────────────────────────────────────────
async function generateSim(template, keyIdx) {
  const key = KEYS[keyIdx % KEYS.length];
  const prompt = buildPrompt(template);
  const outFile = path.join(OUTPUT_DIR, `${template.id}.tsx`);

  // Skip if already exists and is valid
  if (fs.existsSync(outFile) && fs.statSync(outFile).size > 10000) {
    console.log(`  [${template.id}] SKIP — already exists (${fs.statSync(outFile).size} bytes)`);
    return { id: template.id, status: 'skipped' };
  }

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    console.log(`  [${template.id}] Attempt ${attempt}/${MAX_RETRIES} (key ${keyIdx % KEYS.length + 1})...`);
    try {
      const response = await callGemini(key, prompt);
      const cleaned = cleanResponse(response);

      if (!cleaned || cleaned.length < 5000) {
        console.log(`  [${template.id}] Response too short (${cleaned.length} chars), retrying...`);
        await new Promise(r => setTimeout(r, 15000 * attempt));
        continue;
      }

      // Validate
      const errors = validateSim(cleaned, template);
      if (errors.length > 0) {
        console.log(`  [${template.id}] Validation FAILED (${errors.length} errors):`);
        errors.forEach(e => console.log(`    - ${e}`));
        if (attempt < MAX_RETRIES) {
          await new Promise(r => setTimeout(r, 15000 * attempt));
          continue;
        }
        // Save raw for manual fix on last attempt
        fs.writeFileSync(outFile + '.raw', cleaned);
        console.log(`  [${template.id}] Saved raw output to ${outFile}.raw for manual fix`);
        return { id: template.id, status: 'failed', errors };
      }

      // Write validated file
      fs.writeFileSync(outFile, cleaned, 'utf8');
      const sizeKB = (fs.statSync(outFile).size / 1024).toFixed(1);
      const lines = cleaned.split('\n').length;
      console.log(`  [${template.id}] DONE — ${sizeKB}KB, ${lines} lines, validated OK`);
      return { id: template.id, status: 'success', size: fs.statSync(outFile).size, lines };
    } catch (e) {
      console.log(`  [${template.id}] Error: ${e.message.substring(0, 150)}`);
      if (attempt < MAX_RETRIES) {
        const wait = Math.min(15000 * Math.pow(2, attempt - 1), 180000);
        console.log(`  [${template.id}] Waiting ${wait / 1000}s before retry...`);
        await new Promise(r => setTimeout(r, wait));
      }
    }
  }
  return { id: template.id, status: 'failed' };
}

// ─── Main ────────────────────────────────────────────────────
async function main() {
  console.log('\n=== Physics Sim Generator (CBSE, 19 gap chapters) ===');
  console.log(`  ${KEYS.length} keys, ${SIMS_PER_ROUND} sims/round, ${BREAK_MS / 1000}s break`);
  console.log(`  Output: ${OUTPUT_DIR}`);
  console.log(`  Templates: ${TEMPLATES.length}`);

  const prog = loadProgress();
  // Filter out completed
  const remaining = TEMPLATES.filter(t => !prog.completed.includes(t.id));
  console.log(`  Already completed: ${prog.completed.length}`);
  console.log(`  Remaining: ${remaining.length}\n`);

  if (remaining.length === 0) {
    console.log('All physics sims already generated!');
    return;
  }

  // Process in rounds of SIMS_PER_ROUND
  for (let i = 0; i < remaining.length; i += SIMS_PER_ROUND) {
    const round = remaining.slice(i, i + SIMS_PER_ROUND);
    console.log(`\n--- Round ${Math.floor(i / SIMS_PER_ROUND) + 1} (${round.length} sims) ---`);

    const promises = round.map((template, j) => generateSim(template, j));
    const results = await Promise.all(promises);

    for (const r of results) {
      if (r.status === 'success') {
        prog.completed.push(r.id);
      } else if (r.status === 'failed') {
        prog.failed.push(r.id);
      }
    }
    saveProgress(prog);

    console.log(`  Round done: ${results.filter(r => r.status === 'success').length} success, ${results.filter(r => r.status === 'failed').length} failed`);

    if (i + SIMS_PER_ROUND < remaining.length) {
      console.log(`  Pausing ${BREAK_MS / 1000}s...`);
      await new Promise(r => setTimeout(r, BREAK_MS));
    }
  }

  console.log(`\n${'='.repeat(60)}`);
  console.log(`COMPLETE: ${prog.completed.length} generated, ${prog.failed.length} failed`);
  console.log(`${'='.repeat(60)}`);
}

main().catch(e => {
  console.error('Fatal error:', e);
  process.exit(1);
});
