// C6-C12 Opus Pipeline — Anthropic API (api.opusmax.pro)
// 10 parallel workers, auto-starts after 36-minute timer
// Uses opus-4-6 model only (no fallback)
//
// Usage:
//   node scripts/opus-c6-12-pipeline.js [startIdx] [endIdx]
//
// Examples:
//   node scripts/opus-c6-12-pipeline.js              # all 387 templates, auto-start in 36min
//   node scripts/opus-c6-12-pipeline.js 0 3          # first 3 templates, auto-start in 36min
//   node scripts/opus-c6-12-pipeline.js 0 3 --now    # first 3 templates, start immediately

const https = require('https');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// ─── Opus API Config ──────────────────────────────────────────
const OPUS_API_KEYS = [
  'sk-ant-opm-qH49u7v5dZynlQC9oCWKU495ePdy_Xfd',
];
const OPUS_API_HOST = 'api.opusmax.pro';
const PRIMARY_MODEL = 'claude-opus-4-6';
const MAX_TOKENS = 32000;          // Total output tokens (thinking + code)
const THINKING_BUDGET = 10000;     // Tokens for thinking — lets Opus plan the component
const NUM_WORKERS = 3;             // 3 workers (1 key, each request ~6min)
const RPM_LIMIT = 60;              // 60 requests per minute (API limit)
const REQUEST_GAP_MS = Math.ceil(60000 / RPM_LIMIT); // 1000ms between request starts
const AUTO_START_DELAY_MS = 250 * 60 * 1000; // 250 minutes (~4h 10m) — matches 5-hour quota reset
const MAX_RETRIES = 5;
const RETRY_BASE_DELAY = 5000;
const ENABLE_FIX_PASS = true;
const FIX_PASS_MAX_TOKENS = 32000;

const FRONTEND_DIR = path.resolve(__dirname, '..');
const CISCE_DIR = 'D:\\cisce';
const OUTPUT_DIR = path.join(FRONTEND_DIR, 'components', 'simulations', 'c6_12');
const BACKUP_DIR = path.join(FRONTEND_DIR, 'components', 'simulations', 'c6_12_backups');

fs.mkdirSync(OUTPUT_DIR, { recursive: true });
fs.mkdirSync(BACKUP_DIR, { recursive: true });

// Load the master template plan (387 templates, 3698 nodes)
const PLAN = require('./c6_12-master-template-plan.js');

// ─── Subject code to enrichment directory mapping ─────────────
const SUBJECT_DIRS = {
  phy: 'physics', math: 'maths', chem: 'chem', bio: 'bio', cs: 'cs',
  biotech: 'biotech', appmath: 'appmath', evs: 'evs',
  acc: 'acc', bs: 'bs', econ: 'econ', econapp: 'econapp',
  comm: 'comm', commapp: 'commapp', commstud: 'commstud',
  geo: 'geo', hist: 'histciv', histciv: 'histciv', pol: 'pol',
  psy: 'psy', soc: 'soc', home: 'home', legal: 'legal', massmedia: 'massmedia',
};

// ─── Enrichment loader (same as Gemini pipeline, proven working) ───
const enrichmentCache = {};

function loadEnrichmentForClassSubject(classNum, subjectCode) {
  const cacheKey = `${classNum}_${subjectCode}`;
  if (enrichmentCache[cacheKey]) return enrichmentCache[cacheKey];

  const subjDir = SUBJECT_DIRS[subjectCode];
  if (!subjDir) return {};

  const enrichmentDir = path.join(CISCE_DIR, subjDir, 'enrichment');
  if (!fs.existsSync(enrichmentDir)) return {};

  const classPrefix = `c${classNum}_`;
  const nodeMap = {};

  try {
    const allFiles = fs.readdirSync(enrichmentDir).filter(f =>
      f.startsWith(classPrefix) && f.endsWith('.marker')
    );

    for (const fileName of allFiles) {
      const filePath = path.join(enrichmentDir, fileName);
      const content = fs.readFileSync(filePath, 'utf8');

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
        if (!nodeMap[section.nodeId]) {
          nodeMap[section.nodeId] = section.content;
        } else {
          nodeMap[section.nodeId] += '\n\n' + section.content;
        }
      }
    }
  } catch (e) {}

  enrichmentCache[cacheKey] = nodeMap;
  return nodeMap;
}

function getEnrichmentForNodes(nodes, classNum, subjectCode) {
  const allEnrichment = loadEnrichmentForClassSubject(classNum, subjectCode);
  const parts = [];

  for (const nodeId of nodes) {
    const enrichment = allEnrichment[nodeId];
    if (enrichment) {
      parts.push(`### ${nodeId}\n${enrichment}`);
    }
  }

  return parts.length > 0 ? parts.join('\n\n---\n\n') : null;
}

// ─── Stream-specific visualization rules (from C12 pipeline) ──
function getStreamPrompt(stream) {
  if (stream === 'science') {
    return `## SCIENCE STREAM VISUALIZATION RULES
- Use the BEST visualization technology for the concept:
  - React Three Fiber (@react-three/fiber, @react-three/drei, three) for 3D structures, molecular models, atomic orbitals, crystal lattices, anatomy
  - Matter.js for physics motion, collisions, forces
  - PixiJS or Canvas for particle systems, chemical reactions, diffusion
  - D3 or Recharts for graphs, data visualization, V-I curves, distributions
  - Detailed SVG for circuit diagrams, ray diagrams, Lewis structures, phase diagrams
  - GSAP for step-by-step process animations (reaction mechanisms, mitosis, algorithm execution)
  - Framer Motion for UI transitions and feedback
- Include DETAILED LABELED DIAGRAMS:
  - Labeled structures with leader lines pointing to exact parts
  - Cross-sections where applicable (cell, atom, Earth, organ)
  - Process diagrams showing change over time
  - Side-by-side comparisons (isotopes, allotropes, cell types)
  - Measurement annotations that update with interaction
  - At least 5 labeled parts in the main diagram
  - State-dependent visuals — diagram changes when parameters change
- Show the same concept in 2+ ways (equation + graph + diagram)
- All measurements must display correct SI units
- Student manipulates variables and observes outcomes (experiment-style)
- Render mathematical formulas with proper notation, not plain text`;
  }
  if (stream === 'commerce') {
    return `## COMMERCE STREAM VISUALIZATION RULES
- Use the BEST visualization technology for the concept:
  - Interactive HTML tables + SVG for accounting ledgers, journals, T-accounts, trial balance
  - Recharts + D3 for financial dashboards, ratio analysis, cash flow, comparative statements
  - SVG flow diagrams + GSAP for transaction flows (Journal → Ledger → Trial Balance → Final Accounts)
  - Interactive UI + SVG for banking simulations, bank reconciliation, credit creation
  - SVG + Framer Motion for business process maps, management functions, marketing mix
  - Recharts candlestick for stock market (SENSEX/NIFTY, IPO, bull/bear)
  - D3 line graphs with interactivity for cost curves, demand/supply, elasticity, equilibrium
- Include at least one LIVE CALCULATION that updates as student changes inputs
- Accounting formats must match CISCE standards (Trading A/c, P&L, Balance Sheet)
- Student can record at least one transaction and see its effect
- Use REAL INDIAN EXAMPLES — Indian company names, rupee amounts, Indian laws
  (Companies Act 2013, Partnership Act 1932, CPA 2019)
- Multi-step processes shown as sequential interactive stages`;
  }
  return `## HUMANITIES STREAM VISUALIZATION RULES
- Use the BEST visualization technology for the concept:
  - SVG timeline + GSAP for historical timelines (freedom struggle, Cold War, de-colonisation)
  - SVG maps + interactivity for geography (India geography, drainage, population)
  - SVG flow diagrams for cause-effect chains (war causes, social movements, policy impacts)
  - Interactive cards + Framer Motion for case studies (court cases, social issues, experiments)
  - Interactive comparison tables for comparative frameworks (India vs USA, caste vs class)
  - Text annotation interface for document analysis (Constitution, legal maxims, sources)
  - SVG + step-by-step for process flowcharts (legal procedure, film production, research)
  - SVG diagrams + sliders for psychological models (Maslow, Freud, personality)
- Include at least one TIMELINE or MAP interaction where applicable
- Student traces causes and effects interactively
- Include at least one real QUOTE, ARTICLE, or DOCUMENT EXCERPT
- At least one side-by-side comparison the student completes
- Connect historical/theoretical content to contemporary India`;
}

// ─── Subject-specific visual requirements ─────────────────────
function getSubjectVisuals(subject) {
  const SUBJECT_VISUALS = {
    phy: `### PHYSICS-SPECIFIC VISUAL REQUIREMENTS
- Interactive physics simulations with REAL-TIME physics calculations
- Matter.js for physics motion: collisions, projectile motion, pendulum, spring oscillation
- React Three Fiber for 3D physics: 3D vectors, field visualization, 3D motion
- Canvas-based animations: particles, waves, trajectories, field lines, circuit diagrams
- SVG diagrams: ray diagrams (light), circuit schematics, force diagrams, energy bars
- Interactive sliders for physical variables (voltage, mass, angle, frequency, distance)
- Live readouts that update as variables change (force = ma, V = IR, f = 1/T, etc.)
- Visual experiments: pendulum swing, projectile motion, wave interference, prism dispersion
- Animated diagrams showing physical processes (electron flow, wave propagation, refraction)
- At least 2 Canvas animations + 3 SVG diagrams specific to THIS topic
- Formula visualisation: show the formula AND the physical meaning side-by-side`,

    math: `### MATHEMATICS-SPECIFIC VISUAL REQUIREMENTS
- Interactive coordinate plane with draggable points
- Canvas-based graphing: functions, derivatives, integrals, conic sections, vectors
- SVG geometric constructions: triangles, circles, polygons with labelled sides/angles
- Step-by-step algebraic manipulation with visual feedback (each step highlighted)
- Interactive sliders for parameters (a, b, c in quadratic) with live graph updates
- Visual proofs: geometric proofs, area models, number line demonstrations
- 3D visualisation using React Three Fiber (@react-three/fiber) for 3D geometry, vectors, coordinate systems
- At least 3 interactive graphs + 2 geometric SVG diagrams specific to THIS topic
- Show mathematical relationships visually BEFORE revealing formulas`,

    chem: `### CHEMISTRY-SPECIFIC VISUAL REQUIREMENTS
- React Three Fiber for 3D molecular models: rotate molecules, see bond angles, electron clouds in 3D
- Interactive molecular models: atoms, bonds, electron shells (SVG or Canvas)
- Animated chemical reactions: atoms rearranging, bonds breaking/forming (GSAP for step-by-step)
- SVG diagrams: atomic structure, electron configuration, periodic table trends
- Interactive periodic table explorer (if relevant to topic)
- Balanced equation visualiser with atom count tracking (left side = right side)
- pH scale, titration curves, reaction rate graphs (D3 or Recharts, live updating)
- At least 2 molecular structure SVGs + 1 R3F 3D molecule + 1 Canvas animation specific to THIS topic
- Show chemical processes as animated sequences, not static text`,

    bio: `### BIOLOGY-SPECIFIC VISUAL REQUIREMENTS
- React Three Fiber for 3D anatomy: rotate cells, organs, DNA helix, protein structures in 3D
- Interactive diagrams of biological structures: cells, organs, tissues, systems
- SVG cross-sections: leaf structure, heart, kidney, neuron, cell membrane
- Animated biological processes: mitosis stages, photosynthesis, blood circulation (GSAP for step-by-step)
- Interactive labelling: drag labels onto diagram parts (drag-and-drop challenge type)
- Canvas-based simulations: population growth, enzyme activity, photosynthesis rate
- Process flow diagrams: digestion, respiration, nervous signal transmission
- Comparison tools: plant vs animal cell, mitosis vs meiosis (side-by-side SVG)
- At least 3 biological SVG diagrams + 1 Canvas animation + 1 R3F 3D model specific to THIS topic
- Show living processes as animated, interactive sequences`,

    cs: `### COMPUTER SCIENCE-SPECIFIC VISUAL REQUIREMENTS
- Interactive code execution visualiser: step through code line-by-line
- SVG diagrams: logic gates, circuit diagrams, binary trees, flowcharts, memory layout
- Canvas-based: sorting algorithm animation, search visualisation, network packets
- Interactive binary/hex converter with visual bit toggles
- Data structure visualiser: stack, queue, linked list, tree, graph (SVG-based)
- Boolean algebra simplifier with visual truth tables
- Memory allocation diagrams, pointer visualisation
- At least 3 SVG diagrams (logic gates, flowcharts, data structures) + 1 Canvas animation
- Show code execution as a visual step-by-step process`,

    biotech: `### BIOTECHNOLOGY-SPECIFIC VISUAL REQUIREMENTS
- Interactive DNA/RNA structure visualiser (SVG double helix with base pairs)
- Animated processes: PCR thermal cycling, gel electrophoresis, DNA replication
- SVG diagrams: plasmid maps, restriction enzyme cut sites, transformation process
- CRISPR-Cas9 interactive editor: guide RNA design, cut, repair
- Canvas-based: fermentation curves, bioreactor monitoring, growth charts
- Step-by-step protocol visualiser for lab techniques
- At least 3 SVG diagrams (DNA, plasmid, process flow) + 1 Canvas animation`,

    appmath: `### APPLIED MATHEMATICS-SPECIFIC VISUAL REQUIREMENTS
- Canvas-based financial calculators with live graphs (EMI, NPV, compound interest)
- Interactive LPP solver: drag constraint lines, find feasible region, optimise
- SVG diagrams: index number charts, time series plots, distribution curves
- Statistical visualiser: mean/median/mode on number line, box plots, histograms
- Probability simulations: coin flips, dice rolls, card draws with live results
- At least 3 interactive graphs + 2 SVG diagrams specific to THIS topic`,

    evs: `### EVS-SPECIFIC VISUAL REQUIREMENTS
- Interactive ecosystem diagrams with energy flow arrows (SVG)
- Canvas-based pollution trackers, carbon footprint calculators
- SVG cross-sections: water cycle, soil layers, atmospheric layers
- Interactive maps showing environmental data
- Biodiversity explorer with classification tree
- At least 3 SVG diagrams (cycles, layers, ecosystems) + 1 Canvas animation`,

    acc: `### ACCOUNTANCY-SPECIFIC VISUAL REQUIREMENTS
- Interactive journal entry builder with debit/credit visual balance
- SVG T-accounts that update in real-time as entries are posted
- Recharts for balance sheet, P&L statement, trial balance (live updating bar/line charts)
- GSAP for transaction flow animation: Journal → Ledger → Trial Balance → Final Accounts
- Ledger posting visualiser: trace entry from journal to ledger to trial balance
- Ratio analyser with visual gauges (liquidity, solvency, profitability) using D3
- At least 3 interactive financial statements + 2 SVG diagrams (T-accounts, flow)
- Show accounting flow as a visual pipeline: transaction to journal to ledger to statements`,

    bs: `### BUSINESS STUDIES-SPECIFIC VISUAL REQUIREMENTS
- Interactive business organisation charts (SVG hierarchy trees)
- Management principle applier: drag principles to scenarios (drag-and-drop challenge)
- Recharts for marketing mix diagram (4 Ps wheel) and stock market live price chart
- Consumer protection case study player with decision branches
- At least 3 SVG diagrams (org chart, marketing mix, process flow) + 1 Recharts chart`,

    econ: `### ECONOMICS-SPECIFIC VISUAL REQUIREMENTS
- D3-based supply/demand curve plotter with draggable curves
- Interactive national income calculator with circular flow diagram (SVG)
- Recharts for live updating graphs: GDP, inflation, unemployment data visualisation
- SVG diagrams: production possibility frontier, circular flow of income
- Monetary policy simulator: change interest rate, see multiplier effect (D3 line graphs)
- At least 3 D3/Recharts economic graphs + 2 SVG diagrams (circular flow, PPF)`,

    econapp: `### ECONOMICS APPLICATIONS-SPECIFIC VISUAL REQUIREMENTS
- Interactive demand/supply schedule with live graph (Canvas)
- Elasticity calculator with visual gauge (elastic/inelastic)
- SVG diagrams: market equilibrium, consumer surplus, producer surplus
- Case study player with real-world scenarios and decision points
- At least 2 Canvas graphs + 2 SVG diagrams specific to THIS topic`,

    comm: `### COMMERCE-SPECIFIC VISUAL REQUIREMENTS
- Interactive trade flow diagrams (SVG): producer to wholesaler to retailer to consumer
- Canvas-based business cycle visualiser
- Document generator: fill in trade documents interactively
- Insurance policy designer with risk calculation
- At least 3 SVG flow diagrams + 1 Canvas chart specific to THIS topic`,

    commapp: `### COMMERCE APPLICATIONS-SPECIFIC VISUAL REQUIREMENTS
- Interactive marketing mix designer (4 Ps with sliders)
- Cost classification sorter (drag-and-drop)
- HR training method selector with visual outcomes
- Canvas-based budget planner with pie chart
- At least 2 SVG diagrams + 2 Canvas charts specific to THIS topic`,

    commstud: `### COMMERCIAL STUDIES-SPECIFIC VISUAL REQUIREMENTS
- Interactive stakeholder map (SVG network diagram)
- Advertising campaign builder with visual preview
- Sales process flowchart (SVG with animated progress)
- Final accounts visualiser with running totals
- At least 3 SVG diagrams (stakeholder, flowchart, accounts) + 1 Canvas chart`,

    geo: `### GEOGRAPHY-SPECIFIC VISUAL REQUIREMENTS
- Interactive maps with clickable regions, overlays, and data layers
- SVG topographical cross-sections: landforms, river systems, climate zones
- D3/Recharts for climate data visualiser: temperature/rainfall graphs
- Map projection explorer with distortion visualisation
- Population density heatmap, migration flow arrows
- At least 3 SVG maps/diagrams + 1 D3/Recharts data graph specific to THIS topic`,

    hist: `### HISTORY-SPECIFIC VISUAL REQUIREMENTS
- GSAP-animated interactive timeline with draggable events, zoomable eras
- SVG maps showing territorial changes, trade routes, battle positions
- GSAP-animated cause-and-effect chains: event A to event B to event C
- Source document analyser with highlightable text and annotations
- Historical figure relationship map (SVG network)
- At least 1 GSAP timeline + 2 SVG maps + 1 cause-effect diagram`,

    histciv: `### HISTORY & CIVICS-SPECIFIC VISUAL REQUIREMENTS
- GSAP-animated interactive timeline with key historical events and civics milestones
- SVG diagrams: Constitution structure, Parliament layout, three branches of government
- GSAP-animated bill passage through Parliament (step-by-step visual)
- Election simulator with vote counting visualisation (Recharts bar charts)
- Fundamental rights explorer with case examples
- At least 2 SVG diagrams (Constitution, Parliament) + 1 GSAP-animated timeline`,

    pol: `### POLITICAL SCIENCE-SPECIFIC VISUAL REQUIREMENTS
- Interactive Constitution explorer with searchable articles
- SVG diagrams: separation of powers, federal structure, election process
- Parliament simulator: pass a bill through visual stages
- Canvas-based election results visualiser
- At least 3 SVG diagrams (structure, process, flow) + 1 Canvas chart`,

    psy: `### PSYCHOLOGY-SPECIFIC VISUAL REQUIREMENTS
- Interactive brain diagram with clickable regions (SVG cross-section)
- Canvas-based experiment simulators: conditioning, memory tests, reaction time
- SVG diagrams: Maslow's hierarchy, Freud's model, learning curves
- Personality type sorter with visual results
- Stress level tracker with interactive gauge
- At least 2 SVG diagrams (brain, hierarchy) + 2 Canvas simulations`,

    soc: `### SOCIOLOGY-SPECIFIC VISUAL REQUIREMENTS
- Interactive social structure diagrams (SVG hierarchy/network)
- Canvas-based demographic data visualiser
- SVG comparison tools: rural vs urban, traditional vs modern
- Social institution explorer with clickable elements
- At least 3 SVG diagrams (structure, comparison, institution) + 1 Canvas chart`,

    home: `### HOME SCIENCE-SPECIFIC VISUAL REQUIREMENTS
- Interactive meal planner with nutritional visualisation (Canvas pie charts)
- SVG fabric/textile identifier with weave patterns
- Child development milestone tracker (visual timeline)
- Budget planner with live expense breakdown
- At least 2 SVG diagrams + 2 Canvas charts specific to THIS topic`,

    legal: `### LEGAL STUDIES-SPECIFIC VISUAL REQUIREMENTS
- Interactive court case player with decision branches
- SVG diagrams: court hierarchy, legal process flow, rights framework
- Moot court simulator with role-play
- Legal document analyser with highlightable clauses
- At least 3 SVG diagrams (hierarchy, process, rights) + 1 interactive case player`,

    massmedia: `### MASS MEDIA-SPECIFIC VISUAL REQUIREMENTS
- Interactive news story builder with layout preview
- SVG diagrams: communication models (Shannon-Weaver, Lasswell)
- Canvas-based camera angle simulator
- Social media impact analyser with live charts
- At least 2 SVG diagrams (models, flow) + 2 Canvas visualisations`,
  };

  return SUBJECT_VISUALS[subject] || `### Visual requirements
- Interactive diagrams specific to this topic
- At least 3 SVG diagrams + 1 Canvas animation`;
}

// ─── Prompt builder ───────────────────────────────────────────
function buildPrompt(template) {
  const nodeInfo = template.nodeDescriptions.map(n => `  - ${n.id}: ${n.description}`).join('\n');
  const nodeIdList = template.nodes.join(', ');

  const enrichment = getEnrichmentForNodes(template.nodes, template.class, template.subject);

  const classLabel = `Class ${template.class}`;
  const boardLabel = template.class <= 10 ? 'ICSE' : 'ISC';
  const subjectVisuals = getSubjectVisuals(template.subject);
  const streamRules = getStreamPrompt(template.stream);

  return `You are a senior React/TypeScript engineer building interactive educational simulations for a CISCE (${boardLabel}) learning platform. You generate ONE complete, compilable, production-ready simulation component.

This component teaches struggling students through interactive, visual, adaptive learning — inspired by Brilliant.org, not a static textbook.

## CRITICAL: VISUAL QUALITY BAR — BRILLIANT.ORG STYLE
This is NOT a text-heavy quiz. This is a VISUAL, INTERACTIVE simulation where students LEARN BY DOING.
- Every concept must have a CUSTOM interactive diagram or animation specific to THIS topic
- Do NOT use generic placeholder SVGs — every SVG/Canvas must show the actual physics/biology/math/history concept
- Students must be able to MANIPULATE variables and SEE the result in real-time
- If a student can read the content without touching anything, you have FAILED
- Think "interactive textbook" not "worksheet with buttons"

### BRILLIANT.ORG CORE PHILOSOPHY — LEARN BY DOING, NOT BY READING
The fundamental difference between Brilliant.org and a textbook is: **the interaction IS the lesson**.
Students do NOT read an explanation and then answer questions. They INTERACT with a visualization
and DISCOVER the concept through that interaction. The visualization teaches. The text supports.

**MANDATORY BRILLIANT PATTERNS:**

1. **INTERACTIVE EXPLORATION (replaces text teaching slides)**
   - Instead of text slides, show an interactive visualization the student manipulates
   - Each "slide" is a step where the student DOES something: moves a slider, clicks a part, drags an element
   - The visualization CHANGES based on what the student does
   - A short caption explains what they're seeing — but the VISUAL is primary, text is secondary
   - Example: instead of text saying "stakeholders have different interests", show a company diagram
     where the student clicks each stakeholder and SEES their interest popup with a visual gauge

2. **PREDICT-THEN-CHECK**
   - Before showing a result, ask the student to PREDICT what will happen
   - Then let them INTERACT to verify their prediction
   - Show whether their prediction was right WITH VISUAL FEEDBACK
   - Example: "If Jio raises prices 25%, predict which stakeholder is most affected" → student clicks
     their prediction → then they drag a price slider and SEE each stakeholder's reaction change

3. **OBSERVATION QUESTIONS ("What do you notice?")**
   - Before asking specific answer questions, ask open-ended observation questions
   - "What happens to the employees when you increase the price?"
   - Student answers by interacting (clicking what they observe), not by selecting from options
   - This trains scientific observation — the core of Brilliant.org

4. **SANDBOX / FREE PLAY before challenges**
   - Before structured challenges, give the student a free-exploration mode
   - They can drag sliders, click parts, change variables with NO grading
   - A "Ready for challenges?" button appears when they're done exploring
   - This reduces anxiety for struggling students — they explore without pressure

5. **VISUAL FEEDBACK for every interaction — MANDATORY, not optional**
   - Wrong answer → the answer button MUST shake using framer-motion: animate={{ x: [0, -10, 10, -10, 10, 0] }} with transition={{ duration: 0.4 }}
   - Wrong answer → the answer area MUST flash red: className changes to bg-rose-900/60 border-2 border-rose-500 for 800ms
   - Correct answer → button turns green (bg-emerald-900/60 border-2 border-emerald-500) + confetti
   - Wrong drop → element shakes and bounces back (framer-motion animation)
   - Correct drop → element locks in place with a green glow
   - Slider change → visualization updates INSTANTLY (no submit button needed)
   - Audio alone is NOT sufficient — there MUST be visible motion or color change
   - Use state variables: const [wrongShake, setWrongShake] = useState(false); const [wrongFlash, setWrongFlash] = useState(false);
   - Set them true on wrong answer, reset after 500ms/800ms with setTimeout

6. **CLICK-TO-REVEAL for step-by-step explanations — MANDATORY, not optional**
   - Break explanations into sentences/steps
   - Show ONE step at a time — student clicks "Show next step" to reveal the next
   - Use state: const [revealedSteps, setRevealedSteps] = useState(0);
   - Only show the "Next Challenge" button AFTER all steps are revealed
   - This is progressive disclosure — don't overwhelm with all text at once
   - Each revealed step should use motion.p with initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}

7. **CHALLENGES THAT MANIPULATE THE VISUALIZATION**
   - Challenges should NOT be separate text questions with buttons
   - Challenges should involve INTERACTING WITH THE SAME VISUALIZATION
   - "Adjust the price slider until the shareholders are satisfied but customers aren't leaving"
   - "Drag the stakeholders to the correct position on the influence/interest map"
   - "Build the correct stakeholder engagement strategy by clicking the right actions in order"
   - The visualization IS the challenge — not a supplement to a text question

8. **REAL-TIME VISUAL UPDATES**
   - When a student moves a slider, the SVG/Canvas MUST update instantly
   - No "submit then see result" — the visual changes AS they drag
   - Graphs redraw, diagrams change, numbers update — all in real-time
   - This creates the "I can see it!" moment that makes Brilliant.org effective

## REFERENCE EXAMPLE — this is the quality bar you must match

Below is a reference showing the EXACT patterns you must implement. Your output must match this level of quality and include ALL the new patterns shown here:

\`\`\`typescript
'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';
// Stream-specific imports — UNCOMMENT and use the ones your stream needs:
// SCIENCE stream: import { Canvas as R3FCanvas } from '@react-three/fiber'; import { OrbitControls } from '@react-three/drei'; import * as THREE from 'three';
//   NOTE: import as 'R3FCanvas' NOT 'Canvas' to avoid collision with HTML <canvas> element
// SCIENCE stream: import Matter from 'matter-js';  // physics engine
// SCIENCE/COMMERCE: import * as d3 from 'd3';  // data visualization
// COMMERCE stream: import { LineChart, BarChart, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
// HUMANITIES stream: import gsap from 'gsap';  // process animations
// SCIENCE stream: import * as PIXI from 'pixi.js';  // particle systems

// Node IDs as string literals — DECLARE EVERY node ID you use
const NODE_C10_COMMSTUD_001 = 'c10_commstud_001';
const NODE_C10_COMMSTUD_002 = 'c10_commstud_002';
const NODE_C10_COMMSTUD_003 = 'c10_commstud_003';
const NODE_C10_COMMSTUD_004 = 'c10_commstud_004';
const NODE_C10_COMMSTUD_005 = 'c10_commstud_005';
const ALL_NODE_IDS = [NODE_C10_COMMSTUD_001, NODE_C10_COMMSTUD_002, NODE_C10_COMMSTUD_003, NODE_C10_COMMSTUD_004, NODE_C10_COMMSTUD_005];

// ─── NARRATIVE SCENARIO (topic-specific — replace with YOUR topic's scenario) ───
const SCENARIO = {
  title: 'The Stakeholder Crisis',
  intro: 'Reliance Jio just announced a major price hike. Customers are furious, employees are nervous, and shareholders are delighted. As a business analyst, you need to figure out who matters and why.',
  context: 'You have 4 groups affected: subscribers, employees, shareholders, and suppliers. Each has different interests.',
};

// ─── DISCOVERY QUESTION (before exploration — NOT graded, just a curiosity hook) ───
const DISCOVERY_QUESTION = {
  question: 'Jio raises prices by 25%. Who is MOST negatively affected?',
  options: ['Shareholders — they lose value', 'Subscribers — they pay more', 'Employees — they get fired', 'Suppliers — they lose contracts'],
  correctIndex: 1,
  hintAfter: 'Don\\'t worry if you got that wrong — let us learn why this happens!',
};

// ─── CHALLENGE INTERFACE — supports MULTIPLE challenge types + NEP 2020 competency levels ───
interface Challenge {
  id: string;
  nodeId: string;
  // MCQ types (keep these — they are the majority)
  type: 'classify' | 'distinguish' | 'match' | 'drag-label' | 'drag-sort' | 'numeric' | 'construct';
  difficulty: 'foundation' | 'standard' | 'advanced';  // REQUIRED on every challenge
  // NEP 2020 competency level (CISCE 2026: ~40% of questions must be competency-based)
  // - 'recall' = remembering facts (lower-order, keep <30%)
  // - 'understanding' = comprehending concepts (lower-order, keep <30%)
  // - 'application' = applying knowledge to NEW real-world situations (competency, target 20%+)
  // - 'analysis' = breaking down information, finding patterns (competency, target 10%+)
  // - 'evaluation' = making judgments, defending opinions (competency, target 5%+)
  // - 'creativity' = creating new solutions, original work (competency, target 5%+)
  competencyLevel: 'recall' | 'understanding' | 'application' | 'analysis' | 'evaluation' | 'creativity';
  question: string;
  // MCQ fields (used when type is classify/distinguish/match)
  options?: string[];
  correctIndex?: number;
  // Drag-label fields (used when type is 'drag-label')
  dragItems?: { label: string; targetId: string }[];
  correctMapping?: Record<string, string>;
  // Drag-sort fields (used when type is 'drag-sort')
  sortItems?: string[];
  correctOrder?: number[];
  // Numeric fields (used when type is 'numeric')
  correctAnswer?: number;
  tolerance?: number;
  unit?: string;
  // Construct fields (used when type is 'construct')
  availableParts?: string[];
  targetState?: string;
  validationHint?: string;
  // Shared fields
  explanation: string;          // shown AFTER hints exhausted or correct answer
  hints: string[];              // 3 escalating hints (MANDATORY — at least 3)
  misconceptionIndex?: number;
  bloomLevel?: string;
}

// ─── CHALLENGES ARRAY — 20+ challenges, mixed types, each with difficulty + hints ───
const CHALLENGES: Challenge[] = [
  // MCQ foundation example — recall competency
  {
    id: 'ch_001_a',
    nodeId: NODE_C10_COMMSTUD_001,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Reliance Jio has 450 million subscribers. Are these subscribers stakeholders?',
    options: ['Yes — they are affected by Jio\\'s decisions', 'No — they are only customers', 'Yes — they are shareholders', 'No — stakeholders must own shares'],
    correctIndex: 0,
    explanation: 'Subscribers ARE stakeholders because Jio\\'s pricing decisions directly affect their wallets.',
    hints: [
      'Think about who is AFFECTED by Jio\\'s decisions, not just who owns it.',
      'Stakeholders include anyone with an interest — not just shareholders.',
      'Subscribers pay money and are affected by price changes. That makes them stakeholders.',
    ],
    misconceptionIndex: 0,
  },
  // Drag-label example (foundation) — understanding competency
  {
    id: 'ch_002_a',
    nodeId: NODE_C10_COMMSTUD_002,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag each stakeholder type to the correct position on the company diagram.',
    dragItems: [
      { label: 'Shareholders', targetId: 'part_top' },
      { label: 'Employees', targetId: 'part_middle' },
      { label: 'Customers', targetId: 'part_bottom' },
      { label: 'Suppliers', targetId: 'part_side' },
    ],
    correctMapping: { part_top: 'Shareholders', part_middle: 'Employees', part_bottom: 'Customers', part_side: 'Suppliers' },
    explanation: 'Shareholders own the company (top), employees work inside (middle), customers buy from the bottom (revenue), suppliers provide from the side (inputs).',
    hints: [
      'Think about who OWNS the company — they go at the top.',
      'Who WORKS inside the company? They are in the middle.',
      'Customers provide revenue (bottom), suppliers provide inputs (side).',
    ],
  },
  // Numeric example (standard) — application competency (apply formula to real scenario)
  {
    id: 'ch_003_b',
    nodeId: NODE_C10_COMMSTUD_003,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Jio has 450 million subscribers paying ₹150/month. What is the monthly revenue in crores? (1 crore = 10 million)',
    correctAnswer: 675,
    tolerance: 5,
    unit: 'crores',
    explanation: '450 million × ₹150 = ₹67,500 million = ₹675 crore per month.',
    hints: [
      'Calculate total revenue first: 450 million × ₹150.',
      '450 × 150 = 67,500 million rupees.',
      'Convert to crores: 67,500 / 10 = 675 crore.',
    ],
  },
  // Drag-sort example (advanced) — analysis competency (break down process into ordered steps)
  {
    id: 'ch_004_c',
    nodeId: NODE_C10_COMMSTUD_004,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Arrange the steps of stakeholder analysis in the correct order.',
    sortItems: ['Identify all stakeholders', 'Map their interests and influence', 'Prioritise by urgency', 'Develop engagement strategy'],
    correctOrder: [0, 1, 2, 3],
    explanation: 'You must first identify who the stakeholders are, then understand their interests, then prioritise, then strategise engagement.',
    hints: [
      'You cannot analyse interests before you know who the stakeholders are.',
      'Prioritisation comes after you understand their interests.',
      'Strategy is the final step — you plan engagement after everything else is mapped.',
    ],
  },
  // ... 16+ more challenges, mixing MCQ + drag-label + numeric + drag-sort + construct
  // 6-8 foundation, 6-8 standard, 6-8 advanced = 20+ total
];

// ─── PROPS INTERFACE ───
interface Props {
  nodeId: string;
  title: string;
  definition?: string;
  eli5?: string;
  misconceptions?: { misconception: string; correction: string }[];
  diagnosticQuestions?: { question: string; options: string[]; correctIndex: number }[];
  masteryCriteria?: string;
  onComplete?: (score: number) => void;
}

// ─── DEFAULT PROPS ───
const DEFAULT_PROPS: Props = {
  nodeId: 'c10_commstud_001',
  title: 'Stakeholder Analysis',
  definition: 'A stakeholder is any individual or group that has an interest in or is affected by a company\\'s actions.',
  eli5: 'Think of a company like a house. Many people care about what happens in it — owners, workers, customers, suppliers. All of them are stakeholders.',
  misconceptions: [
    { misconception: 'Stakeholders are only shareholders', correction: 'Shareholders are ONE type of stakeholder. Stakeholders include anyone affected by the company.' },
    { misconception: 'Customers are not stakeholders', correction: 'Customers ARE stakeholders — they are affected by price, quality, and service changes.' },
    { misconception: 'Stakeholders must own part of the company', correction: 'Ownership is NOT required. Employees are stakeholders without owning shares.' },
    { misconception: 'All stakeholders have the same interests', correction: 'Different stakeholders have different — often conflicting — interests.' },
    { misconception: 'Stakeholder analysis is only for large companies', correction: 'Every business has stakeholders, from a small shop to a multinational.' },
  ],
  diagnosticQuestions: [
    { question: 'Who is a stakeholder?', options: ['Only shareholders', 'Anyone affected by the company', 'Only employees', 'Only customers'], correctIndex: 1 },
    { question: 'Are subscribers stakeholders of Jio?', options: ['Yes', 'No', 'Only if they own shares', 'Only if they are employees'], correctIndex: 0 },
    { question: 'Which is an INTERNAL stakeholder?', options: ['Customers', 'Suppliers', 'Managers', 'Government'], correctIndex: 2 },
    { question: 'Which is an EXTERNAL stakeholder?', options: ['Employees', 'Shareholders', 'Managers', 'Suppliers'], correctIndex: 3 },
    { question: 'What do shareholders primarily want?', options: ['Fair wages', 'Quality products', 'Profit and dividends', 'Lower prices'], correctIndex: 2 },
    { question: 'What do employees primarily want?', options: ['Dividends', 'Fair pay and job security', 'Lower taxes', 'Cheaper products'], correctIndex: 1 },
    { question: 'Can stakeholders have CONFLICTING interests?', options: ['No, they all want the same', 'Yes, e.g. shareholders want profit, customers want low prices', 'Only in large companies', 'Only in small companies'], correctIndex: 1 },
    { question: 'Stakeholder analysis is for:', options: ['Only large companies', 'Only small shops', 'Every business', 'Only listed companies'], correctIndex: 2 },
  ],
  masteryCriteria: 'Student can identify, classify, and distinguish stakeholder types and their interests.',
};

// ─── INTERACTIVE EXPLORATION STEPS (Brilliant.org style — replaces text teaching slides) ───
// Each step is an INTERACTION the student performs, not text they read.
// The visualization teaches. Text only guides what to DO.
const EXPLORATION_STEPS = [
  {
    title: 'Meet the Company',
    instruction: 'Click each stakeholder around the company to see what they want.',
    interactionType: 'click-stakeholder',
    nodeId: 'c10_commstud_001',
  },
  {
    title: 'Internal vs External',
    instruction: 'Drag each stakeholder to the correct side: Internal (inside) or External (outside).',
    interactionType: 'drag-classify',
    nodeId: 'c10_commstud_002',
  },
  {
    title: 'Conflicting Interests',
    instruction: 'Move the price slider and watch how each stakeholder reacts in real-time.',
    interactionType: 'slider-observe',
    nodeId: 'c10_commstud_003',
  },
  {
    title: 'Stakeholder Mapping',
    instruction: 'Drag stakeholders onto the Influence/Interest map to find their priority.',
    interactionType: 'drag-position',
    nodeId: 'c10_commstud_004',
  },
  {
    title: 'Engagement Strategy',
    instruction: 'Match each stakeholder to the best engagement method by dragging.',
    interactionType: 'drag-match',
    nodeId: 'c10_commstud_005',
  },
];

// ─── PREDICT-THEN-CHECK (Brilliant.org pattern: predict, then interact to verify) ───
const PREDICTION_QUESTIONS = [
  {
    question: 'If Jio raises prices by 25%, predict which stakeholder will be MOST negatively affected.',
    options: ['Shareholders', 'Employees', 'Customers', 'Suppliers'],
    correctIndex: 2,
    verifyInstruction: 'Now drag the price slider to +25% and watch each stakeholder react to check your prediction.',
    nodeId: 'c10_commstud_003',
  },
  {
    question: 'Predict: If Jio drops prices by 40% to crush competition, which stakeholder benefits MOST immediately?',
    options: ['Shareholders (profit drops)', 'Employees (bonuses cut)', 'Customers (cheaper plans)', 'Suppliers (volume up)'],
    correctIndex: 2,
    verifyInstruction: 'Drag the price slider to -40% and watch which stakeholder gauge turns green.',
    nodeId: 'c10_commstud_003',
  },
];

// ─── OBSERVATION QUESTIONS (Brilliant.org: "what do you notice?") — at least 2 ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice about shareholders as you increase the price?',
    observableOptions: ['Satisfaction increases', 'Satisfaction decreases', 'No change', 'They leave'],
    correctIndex: 0,
    nodeId: 'c10_commstud_003',
  },
  {
    question: 'What pattern do you notice about customers vs shareholders as price crosses 0% (neutral)?',
    observableOptions: ['Both are happy at 0%', 'Customers and shareholders have OPPOSITE reactions — one gains, other loses', 'Both react identically', 'Neither cares about price'],
    correctIndex: 1,
    nodeId: 'c10_commstud_003',
  },
];

// ─── REAL-WORLD ACTIVITY (at the end, completes the scenario arc) ───
const REAL_WORLD_ACTIVITY = {
  title: 'Be the Analyst',
  description: 'Pick any Indian company you know (Tata, Reliance, Infosys). List 5 stakeholders and write one sentence about what each one wants from the company.',
  steps: ['Choose a company', 'List 5 stakeholders', 'Write what each wants', 'Share with a friend or teacher'],
};

const REVIEW_INTERVAL_DAYS = [1, 3, 7, 14, 30, 90]; // SM-2 intervals

// ─── COMPONENT STATE — includes discovery phase + hint tracking ───
export default function MySim({ nodeId = DEFAULT_PROPS.nodeId, title = DEFAULT_PROPS.title, diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions, onComplete }: Props = DEFAULT_PROPS) {
  // Subject config for display
  const subjectConfig = SUBJECT_CONFIG['commstud'] || { name: 'Commercial Studies', emoji: '📊', color: 'indigo' };
  // Phase flow: discovery → explore → sandbox → challenge → complete
  // 'explore' = interactive guided exploration (Brilliant.org style — replaces text teaching slides)
  // 'sandbox' = free play with the visualization before challenges (no grading)
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);  // exploration step index
  // Brilliant.org patterns
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);
  const [sandboxReady, setSandboxReady] = useState(false);  // student clicks "Ready for challenges?"
  const [selectedStakeholder, setSelectedStakeholder] = useState<string | null>(null);  // for click-stakeholder interaction
  const [stakeholderReactions, setStakeholderReactions] = useState<Record<string, number>>({
    shareholders: 50, employees: 50, customers: 50, suppliers: 50,
  });
  const [priceLevel, setPriceLevel] = useState(0);  // -50 to +50, slider for sandbox
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  // Escalating hints state
  const [hintCount, setHintCount] = useState(0);        // 0-3 per challenge
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);  // true after hints exhausted
  const [showExplanation, setShowExplanation] = useState(false); // show explanation card
  // Drag-and-drop state
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  // Numeric input state
  const [numericInput, setNumericInput] = useState('');
  // Construct challenge state
  const [constructParts, setConstructParts] = useState<string[]>([]);
  // Discovery state
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  // Feedback state (MUST declare these — used in JSX below)
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  // Visual feedback on wrong answers — MANDATORY: shake animation + red flash
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  // Click-to-reveal progressive disclosure state
  const [revealedSteps, setRevealedSteps] = useState(0);
  // Misconception tracking — track which misconception indices the student hit
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);
  // BKT state ref (persists across challenges — do NOT recreate each time)
  const bktStateRef = useRef(createBKTState());
  // Auto-hint timer (browser-compatible type)
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // ... 20+ more useState calls for sliders, toggles, selections, animations ...

  // ─── ADAPTIVE DIFFICULTY: filter challenges by BKT mastery ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── LOAD EXISTING MASTERY ON MOUNT (before any answers) ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    // NodeMastery has: bestScore, playCount, mastery, status — use bestScore for difficulty
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT-BASED ADAPTIVE DIFFICULTY EFFECT (after answers) ───
  useEffect(() => {
    // Only adapt after at least one answer — don't override the mount effect
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDifficulty = mastery === 'not-started' || mastery === 'beginner' ? 'foundation'
      : mastery === 'developing' ? 'standard' : 'advanced';
    setDifficulty(prev => {
      if (prev !== newDifficulty) {
        setCurrentChallenge(0); // Reset challenge index when difficulty changes
        return newDifficulty;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── ESCALATING HINTS: show next hint on wrong answer ───
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge.hints[nextLevel - 1]) {
      setCurrentHint(challenge.hints[nextLevel - 1]);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(challenge.hints[nextLevel - 1]);
    } else {
      // All hints exhausted — reveal answer
      setAnswerRevealed(true);
      setShowHint(false);
    }
  }, [hintCount, challenge]);

  // ─── DISCOVERY HANDLER — not graded, just a hook ───
  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Great guess!' : DISCOVERY_QUESTION.hintAfter);
    // Student clicks "Let's learn" button to advance (NOT auto-advance)
  }, []);

  // ─── ADVANCE TO EXPLORATION (from discovery — replaces old 'teaching' phase) ───
  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
  }, []);

  // ─── ADVANCE TO SANDBOX (from exploration — free play before challenges) ───
  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
  }, []);

  // ─── ADVANCE TO CHALLENGES (from sandbox — student clicks "Ready!") ───
  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
  }, []);

  // ─── PREDICTION HANDLER (Brilliant.org predict-then-check) ───
  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Now let us check your prediction — drag the price slider!');
  }, []);

  // ─── OBSERVATION HANDLER (Brilliant.org "what do you notice?") ───
  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Great observation!' : 'Look more carefully at the visualization.');
  }, []);

  // ─── STAKEHOLDER CLICK (for click-stakeholder exploration step) ───
  const handleStakeholderClick = useCallback((stakeholder: string) => {
    setSelectedStakeholder(stakeholder);
    audioManager.play('tap');
    const reactions: Record<string, string> = {
      shareholders: 'I want profit and dividends!',
      employees: 'I want fair pay and job security!',
      customers: 'I want quality products at fair prices!',
      suppliers: 'I want timely payments and long-term contracts!',
    };
    speechManager.speak(reactions[stakeholder] || '');
  }, []);

  // ─── PRICE SLIDER CHANGE (real-time visualization update) ───
  const handlePriceChange = useCallback((newPrice: number) => {
    setPriceLevel(newPrice);
    // Update stakeholder reactions in REAL-TIME as slider moves
    setStakeholderReactions({
      shareholders: Math.max(0, Math.min(100, 50 + newPrice)),  // higher price = happier
      employees: Math.max(0, Math.min(100, 50 + newPrice * 0.3)),  // slightly happier (job security)
      customers: Math.max(0, Math.min(100, 50 - newPrice)),  // higher price = angrier
      suppliers: Math.max(0, Math.min(100, 50 - newPrice * 0.2)),  // slightly angrier
    });
    audioManager.play('count');
  }, []);

  // ─── COMPLETION HANDLER — persists score (defined BEFORE handleNextChallenge which calls it) ───
  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
  }, [errors, onComplete]);

  // ─── NEXT CHALLENGE handler ───
  const handleNextChallenge = useCallback(() => {
    // Reset per-challenge state
    setHintCount(0);
    setAnswerRevealed(false);
    setShowHint(false);
    setShowExplanation(false);
    setNumericInput('');
    setDroppedLabels({});
    setSortArrangement([]);
    setConstructParts([]);
    setWrongShake(false);
    setWrongFlash(false);
    setRevealedSteps(0);

    if (currentChallenge + 1 >= filteredChallenges.length) {
      // All challenges done — complete
      handleComplete();
    } else {
      setCurrentChallenge(c => c + 1);
      audioManager.play('whoosh');
    }
  }, [currentChallenge, filteredChallenges.length, handleComplete]);

  // ─── RESET INACTIVITY TIMER (auto-hint after 10s) ───
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  // ─── ANSWER HANDLER — handles ALL challenge types + escalating hints ───
  const handleAnswer = useCallback((answer: number | Record<string, string> | number[] | string) => {
    let isCorrect = false;

    // Validate based on challenge type
    if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
      isCorrect = answer === challenge.correctIndex;
    } else if (challenge.type === 'drag-label') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctMapping);
    } else if (challenge.type === 'drag-sort') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctOrder);
    } else if (challenge.type === 'numeric') {
      const numAnswer = typeof answer === 'string' ? parseFloat(answer) : answer as number;
      isCorrect = Math.abs(numAnswer - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
    } else if (challenge.type === 'construct') {
      isCorrect = answer === challenge.targetState;
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Well done.');
      setShowConfetti(true);
      setShowExplanation(true);
      // BKT update using ref (persists across challenges) — effect will update difficulty
      bktStateRef.current = bktUpdate(bktStateRef.current, true);
      // SRS update — save the updated item to localStorage
      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 4000);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
      }
    } else {
      // Wrong answer — escalate hints + VISUAL FEEDBACK (shake + red flash)
      audioManager.play('drop-wrong');
      audioManager.play('error');
      setErrors(e => e + 1);
      // MANDATORY: Visual feedback — shake the answer area + red flash
      setWrongShake(true);
      setWrongFlash(true);
      setTimeout(() => setWrongShake(false), 500);
      setTimeout(() => setWrongFlash(false), 800);
      // Track misconception if this challenge has one
      if (challenge.misconceptionIndex !== undefined && !hitMisconceptions.includes(challenge.misconceptionIndex)) {
        setHitMisconceptions(prev => [...prev, challenge.misconceptionIndex!]);
      }
      if (hintCount < 3) {
        showNextHint();  // Show next hint, let them try again
      } else {
        // All hints exhausted — reveal answer
        setAnswerRevealed(true);
        setShowExplanation(true);
        speechManager.speak('Let us look at the explanation together.');
        // BKT update using ref — effect will update difficulty
        bktStateRef.current = bktUpdate(bktStateRef.current, false);
        // SRS update — save the updated item to localStorage
        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, showNextHint, resetInactivityTimer]);

  // ─── DRAG HANDLERS — for drag-label challenges ───
  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    const isCorrect = challenge.correctMapping?.[targetId] === draggedItem;
    if (isCorrect) {
      setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
      audioManager.play('drop-correct');
    } else {
      audioManager.play('drop-wrong');
    }
    setDraggedItem(null);
  }, [draggedItem, challenge]);

  // ─── SORT HANDLER — for drag-sort challenges ───
  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      // Initialize with original order if empty
      if (prev.length === 0 && challenge.sortItems) {
        prev = challenge.sortItems.map((_, i) => i);
      }
      const arr = [...prev];
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [challenge]);

  // ─── CHECK SORT ANSWER ───
  const handleSortSubmit = useCallback(() => {
    // If no rearrangement was made, submit original order
    const answer = sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems?.map((_, i) => i) || []);
    handleAnswer(answer);
  }, [sortArrangement, challenge, handleAnswer]);

  // ─── CANVAS ANIMATION EFFECT (example — HTML <canvas> with requestAnimationFrame) ───
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    if (phase !== 'challenge') return; // Only animate during challenges
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let frame = 0;
    let animId: number;
    const animate = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Draw animated progress indicator
      ctx.fillStyle = '#4f46e5';
      ctx.font = '14px sans-serif';
      ctx.fillText(\`Challenge \${currentChallenge + 1}\`, 10, 20);
      // Draw a pulsing circle
      const radius = 5 + Math.sin(frame * 0.05) * 2;
      ctx.beginPath();
      ctx.arc(canvas.width - 20, 15, radius, 0, Math.PI * 2);
      ctx.fillStyle = '#22c55e';
      ctx.fill();
      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animId);
  }, [phase, currentChallenge]);

  // ─── REAL-TIME CALCULATION EFFECT (example — update derived values when inputs change) ───
  const [influenceScore, setInfluenceScore] = useState(50);
  const [interestScore, setInterestScore] = useState(50);
  const priorityLevel = useMemo(() => {
    const score = (influenceScore + interestScore) / 2;
    if (score >= 75) return 'Manage Closely';
    if (score >= 50) return 'Keep Satisfied';
    if (score >= 25) return 'Keep Informed';
    return 'Monitor';
  }, [influenceScore, interestScore]);

  // ─── CLEANUP TIMER ON UNMOUNT ───
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-slate-900 text-slate-100 rounded-2xl">
      <div className="mb-4 flex items-center gap-2">
        <span className="text-2xl">{subjectConfig.emoji}</span>
        <h1 className="text-xl font-bold text-white">{title}</h1>
      </div>
      {/* ─── DISCOVERY PHASE — before exploration ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="mb-4 p-4 bg-indigo-950/50 rounded-xl border border-indigo-800">
            <h3 className="text-lg font-bold text-indigo-300">{SCENARIO.title}</h3>
            <p className="text-sm text-slate-300 mt-2">{SCENARIO.intro}</p>
            <p className="text-xs text-slate-400 mt-2">{SCENARIO.context}</p>
          </div>
          <p className="text-white font-semibold mb-3">{DISCOVERY_QUESTION.question}</p>
          <div className="space-y-2">
            {DISCOVERY_QUESTION.options.map((opt, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleDiscoveryAnswer(i)}
                disabled={discoveryAnswered}
                className="w-full text-left p-3 bg-slate-800 rounded-lg text-slate-200 hover:bg-slate-700"
              >
                {opt}
              </motion.button>
            ))}
          </div>
          {discoveryAnswered && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3">
              <p className={discoveryCorrect ? 'text-green-400 text-sm mb-3' : 'text-amber-400 text-sm mb-3'}>
                {discoveryCorrect ? 'Good thinking! Now let us understand WHY that is correct.' : DISCOVERY_QUESTION.hintAfter}
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToExploration}
                className="px-6 py-2 bg-indigo-600 text-white rounded-xl font-bold"
              >
                Let's Explore Why →
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* ─── EXPLORE PHASE (Brilliant.org style — interactive guided exploration) ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {/* Diagnostic questions preview (from props) */}
          {diagnosticQuestions && diagnosticQuestions.length > 0 && (
            <div className="mb-3 p-3 bg-slate-800/50 rounded-lg">
              <p className="text-xs text-slate-400 mb-1">Diagnostic check: {diagnosticQuestions.length} questions available</p>
            </div>
          )}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 bg-slate-800 rounded-xl"
            >
              <h3 className="text-lg font-bold text-indigo-300">{EXPLORATION_STEPS[currentSlide].title}</h3>
              <p className="text-amber-400 text-sm mt-2 mb-4">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>

              {/* INTERACTIVE VISUALIZATION — changes based on the exploration step */}
              <div className="bg-slate-950 rounded-xl p-4 min-h-[200px]">
                {/* Step 0: Click stakeholders to see their interests */}
                {currentSlide === 0 && (
                  <svg viewBox="0 0 400 250" className="w-full">
                    {/* Company center */}
                    <circle cx="200" cy="125" r="40" fill="#312e81" stroke="#4f46e5" strokeWidth="2" />
                    <text x="200" y="130" textAnchor="middle" fill="white" fontSize="10">Jio</text>
                    {/* Stakeholder nodes — CLICKABLE */}
                    {[
                      { id: 'shareholders', label: 'Shareholders', x: 200, y: 30, color: '#22c55e' },
                      { id: 'employees', label: 'Employees', x: 80, y: 125, color: '#3b82f6' },
                      { id: 'customers', label: 'Customers', x: 320, y: 125, color: '#f59e0b' },
                      { id: 'suppliers', label: 'Suppliers', x: 200, y: 220, color: '#ec4899' },
                    ].map((s) => (
                      <g key={s.id} onClick={() => handleStakeholderClick(s.id)} style={{ cursor: 'pointer' }}>
                        <circle cx={s.x} cy={s.y} r="25" fill={s.color} opacity={selectedStakeholder === s.id ? 1 : 0.6}
                          className="transition-opacity" />
                        <text x={s.x} y={s.y + 4} textAnchor="middle" fill="white" fontSize="8">{s.label}</text>
                      </g>
                    ))}
                    {/* Selected stakeholder popup */}
                    {selectedStakeholder && (
                      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <rect x="120" y="100" width="160" height="50" rx="8" fill="#1e293b" stroke="#475569" />
                        <text x="200" y="120" textAnchor="middle" fill="#fbbf24" fontSize="10">
                          {selectedStakeholder === 'shareholders' ? 'I want profit!' :
                           selectedStakeholder === 'employees' ? 'I want fair pay!' :
                           selectedStakeholder === 'customers' ? 'I want fair prices!' :
                           'I want timely payment!'}
                        </text>
                      </motion.g>
                    )}
                  </svg>
                )}

                {/* Step 2: Price slider with real-time stakeholder reactions */}
                {currentSlide === 2 && (
                  <div>
                    {/* PREDICT-THEN-CHECK */}
                    {!predictionMade && (
                      <div className="mb-4">
                        <p className="text-white text-sm mb-2">{PREDICTION_QUESTIONS[0].question}</p>
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button key={i} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                            onClick={() => handlePrediction(i)}
                            className="block w-full text-left p-2 bg-slate-800 rounded-lg text-slate-200 text-sm mb-1">
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    )}
                    {predictionMade && !predictionVerified && (
                      <p className="text-amber-400 text-xs mb-2">{PREDICTION_QUESTIONS[0].verifyInstruction}</p>
                    )}
                    {/* Price slider — REAL-TIME updates */}
                    <label className="text-xs text-slate-400">Price change: {priceLevel > 0 ? '+' : ''}{priceLevel}%</label>
                    <input type="range" min={-50} max={50} value={priceLevel}
                      onChange={(e) => handlePriceChange(Number(e.target.value))} className="w-full" />
                    {/* Stakeholder reaction gauges — update in REAL-TIME */}
                    <div className="grid grid-cols-2 gap-2 mt-3">
                      {Object.entries(stakeholderReactions).map(([name, value]) => (
                        <div key={name} className="p-2 bg-slate-800 rounded-lg">
                          <p className="text-xs text-slate-400 capitalize">{name}</p>
                          <div className="h-2 bg-slate-700 rounded-full mt-1">
                            <motion.div className="h-full rounded-full"
                              animate={{ width: \`\${value}%\` }}
                              style={{ backgroundColor: value > 60 ? '#22c55e' : value < 40 ? '#ef4444' : '#f59e0b' }} />
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* OBSERVATION QUESTION — after student plays with slider */}
                    {Math.abs(priceLevel) > 10 && !observationAnswered && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-3">
                        <p className="text-white text-sm mb-2">{OBSERVATION_QUESTIONS[0].question}</p>
                        {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                          <motion.button key={i} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                            onClick={() => handleObservation(i)}
                            className="block w-full text-left p-2 bg-slate-800 rounded-lg text-slate-200 text-sm mb-1">
                            {opt}
                          </motion.button>
                        ))}
                      </motion.div>
                    )}
                  </div>
                )}

                {/* Steps 1, 3, 4: Drag-based interactions (placeholder showing the pattern) */}
                {(currentSlide === 1 || currentSlide === 3 || currentSlide === 4) && (
                  <div className="text-center text-slate-500 text-sm py-8">
                    [Interactive {EXPLORATION_STEPS[currentSlide].interactionType} visualization here]
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="flex justify-between mt-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
              disabled={currentSlide === 0}
              className="px-4 py-2 bg-slate-700 text-white rounded-lg disabled:opacity-50"
            >
              ← Prev
            </motion.button>
            <span className="text-slate-400 self-center">{currentSlide + 1} / {EXPLORATION_STEPS.length}</span>
            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide(s => s + 1)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
              >
                Next →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2 bg-green-600 text-white rounded-xl font-bold"
              >
                Try It Freely →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── SANDBOX PHASE (free play — no grading, student explores freely) ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="p-4 bg-slate-800 rounded-xl mb-4">
            <h3 className="text-lg font-bold text-indigo-300">Free Exploration</h3>
            <p className="text-slate-400 text-sm mt-1">Try anything — no grading! Move sliders, click stakeholders, explore freely.</p>
          </div>
          {/* Sandbox: same visualization but no instructions, no grading */}
          <div className="bg-slate-950 rounded-xl p-4">
            <label className="text-xs text-slate-400">Price change: {priceLevel > 0 ? '+' : ''}{priceLevel}%</label>
            <input type="range" min={-50} max={50} value={priceLevel}
              onChange={(e) => handlePriceChange(Number(e.target.value))} className="w-full" />
            <div className="grid grid-cols-2 gap-2 mt-3">
              {Object.entries(stakeholderReactions).map(([name, value]) => (
                <div key={name} className="p-2 bg-slate-800 rounded-lg">
                  <p className="text-xs text-slate-400 capitalize">{name}</p>
                  <div className="h-2 bg-slate-700 rounded-full mt-1">
                    <motion.div className="h-full rounded-full"
                      animate={{ width: \`\${value}%\` }}
                      style={{ backgroundColor: value > 60 ? '#22c55e' : value < 40 ? '#ef4444' : '#f59e0b' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAdvanceToChallenge}
            className="mt-4 px-6 py-2 bg-green-600 text-white rounded-xl font-bold"
          >
            Ready for Challenges! →
          </motion.button>
        </motion.div>
      )}

      {/* ─── CHALLENGE PHASE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {/* Canvas animation indicator */}
          <canvas ref={canvasRef} width={300} height={30} className="w-full mb-2" />
          {/* Interactive sliders for stakeholder mapping */}
          <div className="mb-4 p-3 bg-slate-800/50 rounded-lg">
            <label className="text-xs text-slate-400">Influence: {influenceScore}</label>
            <input type="range" min={0} max={100} value={influenceScore} onChange={(e) => setInfluenceScore(Number(e.target.value))} className="w-full" />
            <label className="text-xs text-slate-400">Interest: {interestScore}</label>
            <input type="range" min={0} max={100} value={interestScore} onChange={(e) => setInterestScore(Number(e.target.value))} className="w-full" />
            <p className="text-sm text-indigo-300 mt-1">Priority: {priorityLevel}</p>
          </div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white">
              Challenge {currentChallenge + 1} of {filteredChallenges.length}
            </h2>
            <motion.span
              key={difficulty}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={difficulty === 'foundation' ? 'bg-green-500/20 text-green-400' :
                          difficulty === 'advanced' ? 'bg-red-500/20 text-red-400' :
                          'bg-blue-500/20 text-blue-400'}
            >
              {difficulty.toUpperCase()}
            </motion.span>
          </div>
          {/* Progress bar with motion */}
          <div className="h-2 bg-slate-700 rounded-full">
            <motion.div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
              animate={{ width: \`\${((currentChallenge + 1) / filteredChallenges.length) * 100}%\` }}
            />
          </div>

          {/* MCQ challenge rendering — with VISUAL FEEDBACK (shake on wrong, green on correct) */}
          {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
            <div className="space-y-2 mt-4">
              <p className="text-white font-semibold mb-2">{challenge.question}</p>
              {challenge.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={wrongShake ? { duration: 0.4 } : {}}
                  onClick={() => handleAnswer(i)}
                  disabled={answerRevealed || showExplanation}
                  className={'w-full text-left p-3 rounded-lg transition-colors ' + (wrongFlash ? 'bg-rose-900/60 border-2 border-rose-500 text-rose-200' : showExplanation && i === challenge.correctIndex ? 'bg-emerald-900/60 border-2 border-emerald-500 text-emerald-200' : 'bg-slate-800 text-slate-200 hover:bg-slate-700')}
                >
                  {opt}
                </motion.button>
              ))}
            </div>
          )}

          {/* Drag-label challenge rendering */}
          {challenge.type === 'drag-label' && challenge.dragItems && (
            <div className="mt-4">
              <p className="text-white font-semibold mb-2">{challenge.question}</p>
              {/* Label palette */}
              <div className="flex flex-wrap gap-2 mb-4">
                {challenge.dragItems.map((item, i) => (
                  <motion.div
                    key={i}
                    draggable
                    onDragStart={() => handleDragStart(item.label)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-3 py-2 bg-indigo-700 rounded-lg cursor-grab text-white text-sm"
                  >
                    {item.label}
                  </motion.div>
                ))}
              </div>
              {/* SVG diagram with drop targets — each part has onDragOver + onDrop */}
              <svg viewBox="0 0 400 300" className="w-full bg-slate-950 rounded-xl">
                {/* Top box — Shareholders */}
                <rect x="150" y="20" width="100" height="50" rx="8" fill="#1e293b" stroke="#475569" />
                <text x="200" y="50" textAnchor="middle" fill="#94a3b8" fontSize="12">{droppedLabels.part_top || '?'}</text>
                <rect x="150" y="20" width="100" height="50" rx="8" fill="transparent" stroke="transparent"
                  onDragOver={(e) => e.preventDefault()} onDrop={() => handleDragDrop('part_top')} style={{ cursor: 'pointer' }} />

                {/* Middle box — Employees */}
                <rect x="150" y="120" width="100" height="50" rx="8" fill="#1e293b" stroke="#475569" />
                <text x="200" y="150" textAnchor="middle" fill="#94a3b8" fontSize="12">{droppedLabels.part_middle || '?'}</text>
                <rect x="150" y="120" width="100" height="50" rx="8" fill="transparent" stroke="transparent"
                  onDragOver={(e) => e.preventDefault()} onDrop={() => handleDragDrop('part_middle')} style={{ cursor: 'pointer' }} />

                {/* Bottom box — Customers */}
                <rect x="150" y="220" width="100" height="50" rx="8" fill="#1e293b" stroke="#475569" />
                <text x="200" y="250" textAnchor="middle" fill="#94a3b8" fontSize="12">{droppedLabels.part_bottom || '?'}</text>
                <rect x="150" y="220" width="100" height="50" rx="8" fill="transparent" stroke="transparent"
                  onDragOver={(e) => e.preventDefault()} onDrop={() => handleDragDrop('part_bottom')} style={{ cursor: 'pointer' }} />

                {/* Side box — Suppliers */}
                <rect x="30" y="120" width="100" height="50" rx="8" fill="#1e293b" stroke="#475569" />
                <text x="80" y="150" textAnchor="middle" fill="#94a3b8" fontSize="12">{droppedLabels.part_side || '?'}</text>
                <rect x="30" y="120" width="100" height="50" rx="8" fill="transparent" stroke="transparent"
                  onDragOver={(e) => e.preventDefault()} onDrop={() => handleDragDrop('part_side')} style={{ cursor: 'pointer' }} />
              </svg>
              {/* Submit button for drag-label */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAnswer(droppedLabels)}
                className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded-lg font-bold"
              >
                Check Labels
              </motion.button>
            </div>
          )}

          {/* Drag-sort challenge rendering */}
          {challenge.type === 'drag-sort' && challenge.sortItems && (
            <div className="mt-4">
              <p className="text-white font-semibold mb-2">{challenge.question}</p>
              <div className="space-y-2">
                {(sortArrangement.length === challenge.sortItems.length ? sortArrangement.map((idx, i) => challenge.sortItems![idx]) : challenge.sortItems).map((item, displayIndex) => {
                  return (
                    <motion.div
                      key={displayIndex}
                      draggable
                      onDragStart={() => setDraggedItem(String(displayIndex))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        const toIdx = displayIndex;
                        handleSortMove(fromIdx, toIdx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="p-3 bg-slate-800 rounded-lg text-slate-200 cursor-grab"
                    >
                      {displayIndex + 1}. {item}
                    </motion.div>
                  );
                })}
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSortSubmit}
                disabled={showExplanation}
                className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded-lg font-bold"
              >
                Check Order
              </motion.button>
            </div>
          )}

          {/* Numeric challenge rendering */}
          {challenge.type === 'numeric' && (
            <div className="mt-4">
              <p className="text-white font-semibold mb-2">{challenge.question}</p>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  value={numericInput}
                  onChange={(e) => setNumericInput(e.target.value)}
                  className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                  placeholder="Enter your answer"
                />
                <span className="text-slate-400">{challenge.unit}</span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(numericInput)}
                  disabled={showExplanation}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-bold"
                >
                  Check
                </motion.button>
              </div>
            </div>
          )}

          {/* Construct challenge rendering */}
          {challenge.type === 'construct' && challenge.availableParts && (
            <div className="mt-4">
              <p className="text-white font-semibold mb-2">{challenge.question}</p>
              <p className="text-slate-400 text-sm mb-3">{challenge.validationHint}</p>
              {/* Available parts palette */}
              <div className="flex flex-wrap gap-2 mb-3">
                {challenge.availableParts.map((part, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setConstructParts(prev => [...prev, part])}
                    className="px-3 py-2 bg-indigo-700 rounded-lg text-white text-sm"
                  >
                    + {part}
                  </motion.button>
                ))}
              </div>
              {/* Construction area — shows assembled parts */}
              <div className="min-h-[100px] p-4 bg-slate-950 rounded-xl border border-slate-700">
                <div className="flex flex-wrap gap-2">
                  {constructParts.map((part, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="px-3 py-1 bg-indigo-800 rounded-lg text-white text-sm"
                    >
                      {part}
                      <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setConstructParts(prev => prev.filter((_, idx) => idx !== i))} className="ml-2 text-red-400">✕</motion.button>
                    </motion.div>
                  ))}
                  {constructParts.length === 0 && <p className="text-slate-500 text-sm">Click parts above to build your answer</p>}
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAnswer(constructParts.join(' '))}
                disabled={showExplanation || constructParts.length === 0}
                className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded-lg font-bold"
              >
                Check Construction
              </motion.button>
            </div>
          )}

          {/* Explanation / answer reveal (after correct OR after hints exhausted) */}
          {showExplanation && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 bg-amber-950/50 border border-amber-700 rounded-xl space-y-3">
              {/* PROGRESSIVE DISCLOSURE — break explanation into steps, reveal one at a time */}
              <p className="text-amber-300 text-sm font-bold">Step-by-step explanation:</p>
              {challenge.explanation.split('. ').filter(s => s.trim().length > 0).slice(0, revealedSteps + 1).map((sentence, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-amber-200 text-sm"
                >
                  <span className="font-bold text-amber-400">{i + 1}.</span> {sentence}{!sentence.endsWith('.') && '.'}
                </motion.p>
              ))}
              {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setRevealedSteps(s => s + 1)}
                  className="px-4 py-2 bg-amber-700 text-white rounded-lg text-xs font-bold"
                >
                  Show next step →
                </motion.button>
              )}
              {/* Next Challenge button — only shows after all steps revealed */}
              {revealedSteps >= challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNextChallenge}
                  className="block px-6 py-2 bg-green-600 text-white rounded-xl font-bold"
                >
                  {currentChallenge + 1 >= filteredChallenges.length ? 'Finish →' : 'Next Challenge →'}
                </motion.button>
              )}
            </motion.div>
          )}
        </motion.div>
      )}

      {/* ─── COMPLETION PHASE ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <h2 className="text-2xl font-bold text-white mb-4">Complete!</h2>
          <p className="text-slate-300">Score: {Math.max(0, 100 - errors * 5)}%</p>
          <p className="text-slate-400 mt-2">Mastery: {masteryLevel}</p>
          {/* MOTIVATIONAL FEEDBACK — personalised based on performance */}
          <div className="p-4 bg-emerald-950/50 rounded-xl border border-emerald-700">
            <p className="text-emerald-300 text-sm font-bold">
              {errors === 0
                ? 'PERFECT SCORE! You have mastered this topic completely!'
                : errors <= 3
                ? 'Great work! You are getting strong at this. Review the steps below and try again for a perfect score.'
                : errors <= 7
                ? 'Good effort! You are improving. Every mistake here is a learning opportunity. Check your misconceptions below and try again.'
                : 'You are building understanding step by step. Do not give up — review the misconceptions below, re-explore the labs, and try again. You WILL get this!'}
            </p>
          </div>
          {/* MISCONCEPTION TRACKING — show which misconceptions the student hit */}
          {hitMisconceptions.length > 0 && (
            <div className="p-4 bg-rose-950/50 rounded-xl border border-rose-800">
              <h3 className="text-rose-300 font-bold text-sm mb-2">Your Misconception Profile:</h3>
              <p className="text-slate-400 text-xs mb-3">These are the specific misconceptions that tripped you up. Review them carefully:</p>
              {hitMisconceptions.map((idx, i) => {
                const m = misconceptions?.[idx];
                if (!m) return null;
                return (
                  <div key={i} className="mb-3 p-3 bg-slate-900 rounded-lg">
                    <p className="text-rose-300 text-xs font-bold">❌ {m.misconception}</p>
                    <p className="text-emerald-300 text-xs mt-1">✓ {m.correction}</p>
                  </div>
                );
              })}
            </div>
          )}
          {/* REFLECTION PROMPT — student thinks about what they learned */}
          <div className="p-4 bg-indigo-950/50 rounded-xl border border-indigo-800">
            <h3 className="text-indigo-300 font-bold text-sm mb-2">Reflect on your learning:</h3>
            <p className="text-slate-300 text-sm mb-3">Take a moment to think about these questions:</p>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li>1. What was the most surprising thing you learned today?</li>
              <li>2. Which part was hardest? What made it hard?</li>
              <li>3. How would you explain this topic to a friend who has never seen it?</li>
              <li>4. Where in real life might you use this concept?</li>
            </ul>
          </div>
          {/* SPACED REPETITION STATUS — show when review is due */}
          <div className="p-4 bg-amber-950/50 rounded-xl border border-amber-800">
            <h3 className="text-amber-300 font-bold text-sm mb-2">Review Schedule (Spaced Repetition):</h3>
            <p className="text-slate-400 text-xs">
              Based on your performance, this topic will be reviewed in{' '}
              <span className="text-amber-300 font-bold">
                {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}
              </span>
              . Come back then to strengthen your memory!
            </p>
          </div>
          {/* Real-world activity */}
          <div className="mt-6 p-4 bg-indigo-950/50 rounded-xl border border-indigo-800">
            <h3 className="text-lg font-bold text-indigo-300">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-sm text-slate-300 mt-2">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="mt-3 space-y-1">
              {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                <li key={i} className="text-slate-400 text-sm">{i + 1}. {step}</li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* HintBubble, Confetti, SuccessBanner, SparkleBurst */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Complete!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}
\`\`\`

Key qualities of the reference (ALL are MANDATORY):
- Props interface with enrichment fields (nodeId, title, definition, eli5, misconceptions, diagnosticQuestions, masteryCriteria, onComplete)
- DEFAULT_PROPS with at least 5 misconceptions and 8 diagnostic questions
- EXPLORATION_STEPS array (5 interactive steps with title, instruction, interactionType, nodeId — replaces text teaching slides)
- PREDICTION_QUESTIONS array with AT LEAST 2 questions (Brilliant.org predict-then-check pattern — student predicts, then interacts to verify)
- OBSERVATION_QUESTIONS array with AT LEAST 2 questions (Brilliant.org "what do you notice?" pattern — student observes the visualization and answers)
- REAL_WORLD_ACTIVITY object (title, description, steps)
- REVIEW_INTERVAL_DAYS constant for SM-2
- Phase flow: 'discovery' → 'explore' → 'sandbox' → 'challenge' → 'complete'
  - 'discovery' = curiosity hook (MCQ, not graded)
  - 'explore' = INTERACTIVE guided exploration (student DOES things, not reads text)
  - 'sandbox' = free play with visualization (no grading, student explores freely)
  - 'challenge' = structured challenges with hints
  - 'complete' = score + real-world activity
- Narrative scenario at the start (SCENARIO object with title + intro + context)
- Discovery question (DISCOVERY_QUESTION with question, options, correctIndex, hintAfter)
- Student clicks "Let's Explore Why" button to advance from discovery (NOT auto-advance)
- Exploration steps with prev/next buttons and AnimatePresence transitions
- Each exploration step has an INTERACTIVE visualization (not text)
- Price slider with REAL-TIME stakeholder reaction updates (handlePriceChange updates state immediately)
- PREDICT-THEN-CHECK: student predicts, then interacts to verify (handlePrediction)
- OBSERVATION QUESTIONS: "what do you notice?" after interacting (handleObservation)
- SANDBOX: same visualization, no instructions, "Ready for Challenges!" button
- CLICK-STAKEHOLDER: clicking parts of the visualization shows information (handleStakeholderClick)
- Challenge interface supports MULTIPLE types: MCQ + drag-label + drag-sort + numeric + construct
- EVERY challenge has competencyLevel: 'recall' | 'understanding' | 'application' | 'analysis' | 'evaluation' | 'creativity' (NEP 2020 / CISCE 2026)
- At least 40% of challenges are competency-based (application + analysis + evaluation + creativity) — NOT just recall
- Each challenge has hints: string[] with 3 escalating hints (MANDATORY)
- Escalating hint flow: wrong → hint 1 → wrong → hint 2 → wrong → hint 3 → wrong → answer revealed
- hintCount state tracks hint level per challenge
- answerRevealed + showExplanation state — explanation shown after hints exhausted OR correct answer
- "Next Challenge" button appears after explanation (calls handleNextChallenge)
- handleNextChallenge resets per-challenge state and advances or calls handleComplete
- Drag handlers: handleDragStart (plays 'pickup'), handleDragDrop (plays 'drop-correct'/'drop-wrong')
- Sort handler: handleSortMove + handleSortSubmit for drag-sort challenges
- handleAnswer validates based on challenge.type (MCQ vs drag-label vs numeric vs drag-sort vs construct)
- BKT state in useRef (bktStateRef) — persists across challenges, NOT recreated each time
- bktStateRef.current = bktUpdate(bktStateRef.current, isCorrect) — accumulates learning evidence
- Completion phase with score, mastery level, and REAL_WORLD_ACTIVITY
- Challenge interface with difficulty: 'foundation' | 'standard' | 'advanced' field
- filteredChallenges useMemo that FILTERS by current difficulty tier
- useEffect that ADAPTS difficulty based on BKT mastery (beginner→foundation, developing→standard, proficient+→advanced)
- Difficulty badge in UI that shows the ACTUAL current tier (with motion animation)
- Progress bar with motion.div animate={{ width: ... }}
- motion.button with whileHover/whileTap on ALL interactive elements
- 40+ useState calls (rich interactive state — includes hintCount, answerRevealed, showExplanation, draggedItem, droppedLabels, sortArrangement, numericInput, constructParts, discoveryAnswered, showConfetti, showSuccess, showSparkle, sparklePos, currentSlide, predictionMade, predictionIndex, predictionVerified, observationAnswered, observationIndex, sandboxReady, selectedStakeholder, stakeholderReactions, priceLevel)
- 6+ useEffect calls (real-time calculations when variables change, canvas animation, cleanup)
- 12+ useCallback calls (includes handleDragStart, handleDragDrop, handleSortMove, handleSortSubmit, showNextHint, handleDiscoveryAnswer, handleAdvanceToExploration, handleAdvanceToSandbox, handleAdvanceToChallenge, handlePrediction, handleObservation, handleStakeholderClick, handlePriceChange, handleNextChallenge, resetInactivityTimer, handleComplete)
- HTML <canvas> element with requestAnimationFrame for 2D animations (NOT React Three Fiber Canvas)
- R3F Canvas imported as 'R3FCanvas' (NOT 'Canvas') to avoid naming collision with HTML <canvas>
- SVG diagrams that respond to slider changes in REAL-TIME
- 5+ interactive sliders for physical variables (connected to visualizations, not standalone)
- 60+ framer-motion components for smooth transitions (Opus benchmark is 74-150)
- 2500+ lines total (with discovery, exploration, sandbox, 20+ challenges, drag-and-drop, escalating hints)
- Node IDs as named constants
- Stream-specific imports (React Three Fiber as R3FCanvas, Matter.js, D3, Recharts, GSAP — only what the stream needs)
- Auto-hint after 10s inactivity (inactivityTimerRef + resetInactivityTimer)

## YOUR TASK
Output the COMPLETE TypeScript code for a React component. Output ONLY the code — no explanations, no markdown fences, no commentary. Start with 'use client' and end with the default export.

## COMPONENT TO GENERATE
File: components/simulations/c6_12/${template.id}.tsx
Class: ${classLabel} (${boardLabel})
Stream: ${template.stream}
Subject: ${template.subjectName}

## NODES THIS TEMPLATE COVERS (you must teach ALL of these)
${nodeInfo}

These node IDs MUST appear in the code as string literals so they can be verified:
${nodeIdList}

## ENRICHMENT DATA (use this for definitions, ELI5, misconceptions, diagnostic questions)
${enrichment || 'NOTE: No enrichment marker files found for these nodes. Use your knowledge of the CISCE ' + boardLabel + ' curriculum to provide accurate definitions, ELI5 explanations, common misconceptions, and diagnostic questions.'}

## QUALITY BAR — BRILLIANT.ORG STYLE

The component must be genuinely interactive and visual, NOT a static form or quiz. Think Brilliant.org:
- Interactive simulations where students manipulate variables and see results
- Visual diagrams that update in real-time
- Step-by-step guided discovery with visual feedback
- Progressive challenges that adapt to student performance
- Beautiful, modern UI with smooth animations

## CRITICAL: ACTUAL API USAGE (DO NOT INVENT METHODS)

### audioManager — use .play() with VALID SoundEffect strings ONLY:
audioManager.play('tap')        // button taps, selections
audioManager.play('success')    // correct answer
audioManager.play('error')      // wrong answer
audioManager.play('celebration')// challenge complete
audioManager.play('hint')       // hint shown
audioManager.play('pickup')     // drag start
audioManager.play('drop-correct') // correct drop
audioManager.play('drop-wrong')   // wrong drop
audioManager.play('whoosh')     // transitions
audioManager.play('sparkle')    // sparkles
audioManager.play('chime')      // notifications
audioManager.play('pop')        // small interactions
audioManager.play('count')      // counting
audioManager.play('balance')    // balancing
audioManager.play('swoop')      // animations

### speechManager — use .speak() for spoken instructions and feedback:
speechManager.speak('Welcome! Let us explore.')
speechManager.speak('Correct! Well done.')
speechManager.speak('Not quite. Remember the rule.')
// Call speechManager.speak() at least 5 times

### HintBubble, Confetti, SuccessBanner, SparkleBurst — use as JSX components:
IMPORTANT: These components do NOT have a 'show' prop. Use conditional rendering instead.
IMPORTANT: They use 'message' not 'text'. They require 'onComplete' callback.

{showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
{showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
{showSuccess && <SuccessBanner message="Challenge Complete!" onComplete={() => setShowSuccess(false)} />}
{showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}

## EXISTING PLATFORM SYSTEMS — YOU MUST IMPORT AND USE THESE

### 1. Spaced Repetition (SM-2 algorithm)
import { createReviewItem, sm2Update } from '../../../lib/srs'
After each challenge, update the spaced repetition schedule:
  const item = createReviewItem(nodeId, title);
  const updated = sm2Update(item, quality, responseTime);
  // quality: 0-5 (0=complete fail, 5=perfect)
  // Save updated to localStorage

### 2. Bayesian Knowledge Tracing (adaptive mastery)
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt'
IMPORTANT: Store BKT state in a useRef so it PERSISTS across challenges. Do NOT recreate it each time.
  const bktStateRef = useRef(createBKTState());
  // After each answer, update the ref:
  bktStateRef.current = bktUpdate(bktStateRef.current, isCorrect);
  const mastery = getMasteryLevel(bktStateRef.current.pKnown);
  // mastery: 'not-started' | 'beginner' | 'developing' | 'proficient' | 'mastered'
  // Use mastery level to ADAPT difficulty: beginner to foundation, developing to standard, proficient+ to advanced

### 3. Mastery Store (localStorage persistence)
import { recordGameScore, getNodeMastery, getNodesNeedingReview } from '../../../lib/masteryStore'
  // recordGameScore(nodeIds, score) — saves best score for multiple nodes
  // getNodeMastery(nodeId) — returns NodeMastery with: { nodeId, bestScore, playCount, lastPlayed, mastery, lastReview, nextReview, status }
  //   Use existing.bestScore (NOT lastScore or score — those don't exist on the type)
  // getNodesNeedingReview() — returns node IDs due for spaced review

### 4. Topic Graph (progression)
import { SUBJECT_CONFIG } from '../../../lib/topicGraph'
  // Use SUBJECT_CONFIG[subject] for subject display name, emoji, color

### 5. Feedback components
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine'

## STRICT REQUIREMENTS:
1. 'use client' at top
2. Imports: React (useState, useEffect, useRef, useCallback, useMemo), framer-motion (motion, AnimatePresence), sim-engine, srs, bkt, masteryStore, topicGraph
3. You MAY use these advanced visualization libraries where appropriate (per stream rules above):
   - @react-three/fiber, @react-three/drei, three — for 3D structures, molecular models, anatomy, crystal lattices
     Import: import { Canvas as R3FCanvas } from '@react-three/fiber'; import { OrbitControls } from '@react-three/drei'; import * as THREE from 'three';
     CRITICAL: Import as 'R3FCanvas' NOT 'Canvas' — 'Canvas' collides with HTML <canvas> element used for 2D animations
     Use <R3FCanvas> for 3D scenes, use <canvas> for 2D requestAnimationFrame animations
   - matter-js — for physics motion, collisions, forces
     Import: import Matter from 'matter-js';
   - pixi.js — for particle systems, chemical reactions
     Import: import * as PIXI from 'pixi.js';
   - d3 — for data visualization, graphs, distributions
     Import: import * as d3 from 'd3';
   - recharts — for charts, financial dashboards, candlestick
     Import: import { LineChart, BarChart, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
   - gsap — for step-by-step process animations
     Import: import gsap from 'gsap';
   Import them at the top of the file. ONLY import what your stream needs. Use them where the stream rules specify.
4. Default export
5. Props interface with enrichment data fields (nodeId, title, definition, eli5, misconceptions, diagnosticQuestions, masteryCriteria, onComplete)
6. DEFAULT_PROPS with at least 5 misconceptions and 8 diagnostic questions
7. Minimum 2500 lines (the reference Opus components are 2018-2288 lines, but with the new Brilliant-style additions — discovery hook, narrative scenario, interactive exploration steps, sandbox, predict-then-check, observation questions, 20+ challenges, drag-and-drop, escalating hints, interactive diagram labeling — you need more space). If your output is under 2000 lines, it is TOO SHORT and will be rejected. Add more interactive exploration steps, more challenge variants, more drag-and-drop interactions, and more motion-enriched UI sections to reach 2500+ lines.
8. Topic-specific SVG visualization (custom SVG components, NOT generic placeholders)
9. 20+ challenges with progressive difficulty (6-8 foundation → 6-8 standard → 6-8 advanced). At least 3 must be non-MCQ types (drag-label, drag-sort, numeric, or construct). MCQ challenges are still welcome — ADD variety, do not replace.
9b. NEP 2020 COMPETENCY-BASED QUESTIONS (CISCE 2026 mandate — ~40% competency weightage):
  - EVERY challenge must have a competencyLevel field: 'recall' | 'understanding' | 'application' | 'analysis' | 'evaluation' | 'creativity'
  - Competency distribution target (aligned with CISCE 2026 ~40% competency weightage):
    - recall: ~15% (remembering facts — lower-order)
    - understanding: ~20% (comprehending concepts — lower-order)
    - application: ~25% (applying knowledge to NEW real-world situations — competency)
    - analysis: ~20% (breaking down information, finding patterns — competency)
    - evaluation: ~10% (making judgments, defending opinions with evidence — competency)
    - creativity: ~10% (creating new solutions, original work — competency)
  - At least 40% of challenges must be competency-based (application + analysis + evaluation + creativity)
  - Competency questions must use REAL-WORLD scenarios (Indian context: companies, laws, situations)
  - Application questions: "Given scenario X, apply concept Y to solve problem Z"
  - Analysis questions: "Compare A vs B, identify the pattern, explain why"
  - Evaluation questions: "Which approach is better? Justify your answer with evidence"
  - Creativity questions: "Design a new solution for this real-world problem"
  - Do NOT just reword recall questions as "application" — the question must genuinely require applying knowledge to a NEW situation
10. 5 interactive exploration steps (EXPLORATION_STEPS array with title, instruction, interactionType, nodeId — NOT text slides. Each step must have an INTERACTIVE visualization the student manipulates.)
11. Adaptive difficulty: foundation/standard/advanced based on BKT mastery level — MUST be GENUINE:
    - Each challenge/question MUST have a difficulty: 'foundation' | 'standard' | 'advanced' field
    - A filteredChallenges useMemo MUST filter challenges by current difficulty tier
    - A useEffect MUST update difficulty when BKT mastery changes (beginner→foundation, developing→standard, proficient+→advanced)
    - The answer handler MUST call setDifficulty after bktUpdate
    - A difficulty badge in the UI MUST show the ACTUAL current tier (with motion animation)
    - DO NOT just declare challengeDifficulty state without updating it — that is a cosmetic label, NOT adaptive
12. localStorage with 'mastery_<nodeId>' key
13. Spaced repetition (REVIEW_INTERVAL_DAYS constant, sm2Update after each challenge)
14. Misconception feedback from data (show the misconception + correction when student makes a mistake)
15. Real-world activity at end (REAL_WORLD_ACTIVITY section)
16. onComplete(score) callback, score = max(0, 100 - errors*5)
17. Auto-hint after 10s inactivity (useRef timer, cleared on any interaction)
18. Progress tracking (progress bar showing % through challenges)
19. No 'any' type — use proper TypeScript types throughout
20. audioManager.play() called 8+ times with valid SoundEffect strings
21. speechManager.speak() called 5+ times
22. <HintBubble>, <Confetti>, <SuccessBanner>, <SparkleBurst> in JSX
23. All node IDs from the list above must appear as string literals in the code
24. bktUpdate() must be called after each answer
25. sm2Update() must be called after each challenge
26. recordGameScore() must be called on completion

## INTERACTIVITY REQUIREMENTS (CRITICAL — these separate good from great):
27. At least 30+ useState calls (rich interactive state — sliders, toggles, selections, animations)
28. At least 5+ useEffect calls (real-time calculations when variables change, canvas animation loops)
29. At least 12+ useCallback calls (memoised event handlers for performance) — Opus benchmark uses 12-14. Each slider handler, button handler, tab switch, answer submit, next question, hint toggle, and animation trigger should be a separate useCallback. DO NOT inline handlers — extract them all as useCallback.
30. At least 5+ interactive sliders/controls that students can manipulate
31. At least 15+ button elements with onClick handlers
32. At least 60+ framer-motion components (motion.div, motion.button, AnimatePresence) — Opus benchmark uses 74-150. This is the #1 quality gap. You MUST use motion extensively:
    - EVERY button should be motion.button with whileHover={{ scale: 1.05 }} and whileTap={{ scale: 0.95 }}
    - EVERY tab transition should use motion.div with initial/animate/exit
    - EVERY question card should animate in with initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
    - EVERY progress bar should use motion.div with animate={{ width: ... }}
    - EVERY feedback banner should use motion.div with initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
    - EVERY misconception card should use motion.div with whileHover/whileTap
    - EVERY slide transition should use AnimatePresence with motion.div
    - EVERY difficulty badge should use motion.span with key={difficulty} initial={{ scale: 0.8 }} animate={{ scale: 1 }}
    - EVERY challenge option button should be motion.button with whileHover/whileTap
    - Use AnimatePresence mode="wait" for tab content switching
    - Add motion to header icons, stat cards, completion screens, and real-world activity sections
    - If you have fewer than 60 motion components, ADD MORE. This is non-negotiable.
33. HTML <canvas> element with requestAnimationFrame for smooth 2D animations (where applicable) — NOT React Three Fiber Canvas
34. Real-time calculations: when a student moves a slider, the diagram/graph MUST update instantly
35. Visual feedback for every interaction (color changes, animations, sound, speech)

## STRUGGLING STUDENT SUPPORT — BRILLIANT.ORG-STYLE ADDITIONS (ALL MANDATORY):

These features are ADDED on top of the existing requirements above. Do NOT remove MCQ challenges or answer explanations. ADD these alongside them.

### 36. DISCOVERY HOOK (before exploration)
- Start with a 1-2 question "discovery challenge" BEFORE exploration
- This is a low-stakes, curiosity-building question about the scenario
- The student will likely get it wrong — that is the POINT. It makes them curious.
- Phase flow: 'discovery' → 'explore' → 'sandbox' → 'challenge' → 'complete'
- Show a brief "Don't worry if you got that wrong — let's explore why!" message after the discovery attempt
- This is NOT graded. It is a hook to make them want to learn.
- DISCOVERY SHOULD BE INTERACTIVE, NOT JUST MCQ: Instead of (or in addition to) an MCQ, give the student
  a VISUAL to interact with. Examples:
  - "Look at this diagram. What do you think will happen if...?" + a button to try it
  - "Click on the part of the circuit you think is causing the problem"
  - "Before we learn the rules, try to solve this puzzle. Don't worry about getting it right."
  - A simple drag or toggle that reveals something surprising
- The discovery should make the student THINK "huh, that's not what I expected" — that surprise creates curiosity

### 36b. INTERACTIVE EXPLORATION (replaces text teaching slides — Brilliant.org core)
- Instead of text slides, create EXPLORATION_STEPS: 5 interactive steps where the student DOES something
- Each step has: title, instruction (what to DO), interactionType, nodeId
- The student MANIPULATES a visualization in each step — they don't read text
- Interaction types: click-parts, drag-classify, slider-observe, drag-position, drag-match
- A short caption guides what to do — but the VISUAL is primary, text is secondary
- The visualization CHANGES based on what the student does
- This is the core of Brilliant.org: LEARN BY DOING, not learn by reading

### 36c. PREDICT-THEN-CHECK (Brilliant.org pattern)
- Before showing a result, ask the student to PREDICT what will happen
- Then let them INTERACT with the visualization to verify their prediction
- Show whether their prediction was right WITH VISUAL FEEDBACK
- This creates the "aha!" moment — they discover the answer through interaction

### 36d. OBSERVATION QUESTIONS (Brilliant.org "what do you notice?")
- After the student interacts with a visualization, ask open-ended observation questions
- "What do you notice about X as you change Y?"
- Student selects what they observe from the visualization — not from memorisation
- This trains scientific observation and critical thinking

### 36e. SANDBOX / FREE PLAY (before challenges)
- After guided exploration, give the student a FREE PLAY mode
- Same visualization, no instructions, no grading
- Student can drag sliders, click parts, change variables freely
- A "Ready for Challenges?" button appears when they feel confident
- This reduces anxiety for struggling students — they explore without pressure

### 36f. NEP 2020 COMPETENCY-BASED QUESTIONS (CISCE 2026 mandate — ALL MANDATORY)
- NEP 2020 requires competency-based education: application, analysis, interpretation, evaluation
- CISCE 2026 exams: ~40% weightage to competency questions (application + analysis + evaluation + creativity)
- EVERY challenge must have a competencyLevel field:
  - 'recall' = remembering facts (keep ~15% — lower-order)
  - 'understanding' = comprehending concepts (keep ~20% — lower-order)
  - 'application' = applying knowledge to NEW real-world situations (target ~25% — competency)
  - 'analysis' = breaking down information, finding patterns (target ~20% — competency)
  - 'evaluation' = making judgments, defending opinions with evidence (target ~10% — competency)
  - 'creativity' = creating new solutions, original work (target ~10% — competency)
- At least 40% of challenges MUST be competency-based (application + analysis + evaluation + creativity)
- Competency questions MUST use REAL-WORLD Indian scenarios (companies, laws, situations)
- Application: "Given scenario X, apply concept Y to solve problem Z"
- Analysis: "Compare A vs B, identify the pattern, explain why"
- Evaluation: "Which approach is better? Justify your answer with evidence"
- Creativity: "Design a new solution for this real-world problem"
- Do NOT just reword recall questions as "application" — the question must genuinely require
  applying knowledge to a NEW situation the student has NOT seen before

### 36g. REFLECTION & MOTIVATIONAL FEEDBACK (after completion — MANDATORY)
- After the completion phase, show PERSONALISED motivational feedback based on performance:
  - 0 errors: "PERFECT SCORE! You have mastered this topic completely!"
  - 1-3 errors: "Great work! You are getting strong at this. Review the steps below and try again for a perfect score."
  - 4-7 errors: "Good effort! You are improving. Every mistake here is a learning opportunity."
  - 8+ errors: "You are building understanding step by step. Do not give up — review the misconceptions below, re-explore the labs, and try again. You WILL get this!"
- Show a REFLECTION section with questions:
  1. What was the most surprising thing you learned today?
  2. Which part was hardest? What made it hard?
  3. How would you explain this topic to a friend who has never seen it?
  4. Where in real life might you use this concept?
- These are NOT graded — they are for the student to think about

### 36h. MISCONCEPTION TRACKING (MANDATORY — struggling students need to know their gaps)
- Track which misconceptions the student hit during challenges
- Use state: const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);
- When a student gets a challenge wrong AND the challenge has misconceptionIndex:
  - Add the misconceptionIndex to hitMisconceptions (if not already there)
- At completion, show a "Your Misconception Profile" section:
  - List each hit misconception with the misconception text AND the correction
  - Format: "❌ [misconception]" then "✓ [correction]"
  - This tells the student EXACTLY what they need to work on
- This is critical for struggling students — they need to see their specific gaps

### 36i. MULTI-REPRESENTATION (MANDATORY — show same concept 2+ ways)
- Show the SAME concept in at least 2 different representations simultaneously or in sequence
- Examples:
  - Logic: truth table + Venn diagram + circuit gate (3 representations of AND/OR)
  - Physics: equation + graph + physical diagram (3 representations of V=IR)
  - Economics: supply curve + table + real-world scenario (3 representations of demand)
  - Biology: diagram + process animation + comparison table (3 representations of mitosis)
- The student should be able to see the same idea from multiple angles
- This helps struggling students who may understand one representation but not another
- At least one representation must be VISUAL (diagram/graph/animation), not just text/numbers

### 36j. SPACED REPETITION VISIBILITY (MANDATORY — show review schedule)
- After completion, show when the student should review this topic again
- Use the SRS data to determine the review interval:
  - 0 errors → review in 7 days
  - 1-3 errors → review in 3 days
  - 4+ errors → review in 1 day
- Display: "Based on your performance, this topic will be reviewed in [X days]. Come back then to strengthen your memory!"
- This makes the spaced repetition system VISIBLE to the student
- It teaches them that forgetting is normal and review is part of learning

### 36k. ACCESSIBILITY (MANDATORY — for struggling students who may have learning disabilities)
- Add aria-label to all interactive elements (buttons, sliders, drag items)
  - Example: <motion.button aria-label="Answer option A: {opt}" ...>
  - Example: <input type="range" aria-label="Set overlap percentage" ...>
- Add keyboard navigation: all buttons must be focusable with Tab
- Use color-blind friendly patterns: don't rely on color alone
  - Wrong answers: red background AND "✗" icon
  - Correct answers: green background AND "✓" icon
  - True values: green AND "T" label
  - False values: red AND "F" label
- speechManager.speak() all important feedback (already required)
- Ensure text contrast meets WCAG AA (dark text on light backgrounds, light text on dark)
- Add role="button" to draggable elements that act as buttons

### 37. NARRATIVE SCENARIO HOOK
- Wrap the topic in a real-world scenario that creates a problem to solve
- Examples:
  - Physics (circuits): "Your house lights keep flickering. You need to figure out why."
  - Biology (photosynthesis): "Your farm's crops are dying in 3 fields with different light conditions."
  - Maths (quadratic): "You're designing a water fountain. How far will the water reach?"
  - History (freedom struggle): "You're a journalist in 1942. Cover the Quit India movement."
  - Economics (demand): "You run a tea shop. How do you set the price to maximise profit?"
- The scenario appears at the START (before discovery hook) and is referenced throughout
- Challenges should connect back to the scenario where possible
- The real-world activity at the end should complete the scenario arc

### 38. CHALLENGE TYPE VARIETY (alongside existing MCQ)
- Keep ALL existing MCQ challenges (type: 'classify' | 'distinguish' | 'match')
- ADD these new challenge types to the Challenge interface:
  - type: 'drag-label' — drag labels onto diagram parts (use HTML5 drag or pointer events)
    - Fields: dragItems: {label: string, targetId: string}[], correctMapping: Record<string, string>
    - Play audioManager.play('pickup') on drag start, 'drop-correct' or 'drop-wrong' on drop
  - type: 'drag-sort' — arrange steps in correct order
    - Fields: sortItems: string[], correctOrder: number[]
    - Play 'pickup' on grab, 'drop-correct'/'drop-wrong' on place
  - type: 'numeric' — student enters a number
    - Fields: correctAnswer: number, tolerance: number, unit: string
    - Show whether the answer is within tolerance
  - type: 'construct' — student builds something (equation, circuit, molecule)
    - Fields: availableParts: string[], targetState: string, validationHint: string
    - Student assembles parts, system validates
- At least 3 of the 20+ challenges must be non-MCQ types (drag-label, drag-sort, numeric, or construct)
- MCQ challenges still use options[] and correctIndex — do NOT remove these

### 39. ESCALATING HINTS (before answer reveal)
- Each challenge MUST have an escalating hints system:
  - hints: string[] — array of 3 hints, from subtle to explicit
  - hint 1: subtle nudge ("Think about what happens when temperature increases...")
  - hint 2: more specific ("Remember the formula: V = IR. What happens to I if R increases?")
  - hint 3: nearly gives it away ("If R doubles and V stays the same, I must halve. So the answer is...")
- Flow when student answers wrong:
  1. First wrong attempt → show hint 1, let them try again
  2. Second wrong attempt → show hint 2, let them try again
  3. Third wrong attempt → show hint 3, let them try again
  4. Fourth wrong attempt → show the full explanation (answer reveal)
- Track hintCount per challenge in state
- Play audioManager.play('hint') when each hint appears
- speechManager.speak() the hint for accessibility
- The existing explanation field is still shown — but ONLY after hints are exhausted or student gets it right
- HintBubble component shows the current hint level

### 40. MORE CHALLENGES PER TIER (deeper practice)
- Increase from 8 to 20+ total challenges
- Distribution: 6-8 foundation, 6-8 standard, 6-8 advanced
- Struggling students get MORE practice at foundation level before BKT moves them up
- Each challenge should be genuinely different (not reworded versions of the same question)
- Vary the challenge TYPE across the set (some MCQ, some drag-label, some numeric, some construct)
- Connect challenges to the narrative scenario where possible

### 41. INTERACTIVE DIAGRAM LABELING (drag-and-drop on diagrams)
- At least 1 challenge must involve dragging labels onto a diagram
- The SVG/Canvas diagram should have unlabeled parts
- Student drags text labels from a palette onto the correct diagram positions
- Visual feedback: correct labels turn green and lock in place, wrong labels bounce back
- Play 'pickup' on drag start, 'drop-correct' on correct placement, 'drop-wrong' on incorrect
- This is the most Brilliant.org-like interaction — DO NOT skip it

## MOTION COMPONENT CHECKLIST — verify before output:
Before you output your code, count your motion components. If the count is under 60, go back and convert plain <button> to <motion.button>, plain <div> wrappers to <motion.div>, and add AnimatePresence transitions. The Opus benchmark files have 74-150 motion components. Your output MUST have at least 60. This is the single biggest quality differentiator.

## USECALLBACK CHECKLIST — verify before output:
Before you output your code, count your useCallback calls. If the count is under 12, go back and extract more handlers. Each of these should be a separate useCallback:
- handleAnswer (validates all challenge types), handleNextChallenge, handleComplete
- handleDragStart, handleDragDrop (for drag-label), handleSortMove, handleSortSubmit (for drag-sort)
- showNextHint (escalating hints), handleDiscoveryAnswer, handleAdvanceToExploration, handleAdvanceToSandbox, handleAdvanceToChallenge
- resetInactivityTimer (auto-hint), handleSliderChange (one per slider), handleTabSwitch
- handleNextSlide, handlePrevSlide, handleHintToggle, handleMisconceptionClick, handleReset
- handlePlaySound, handleSpeak, handleCanvasAnimation, handleNodeDetail
- The Opus benchmark files have 12-14 useCallback calls. Your output MUST have at least 12.

${streamRules}

${subjectVisuals}

## OUTPUT: Only code. No markdown fences. No explanations.
Start with 'use client';
End with: export default ${template.id};`;
}

// ─── Rate limiter: 1 request per second (60 RPM) ──────────────
// All workers must acquire a slot before sending an API request
const rateLimiter = {
  lastRequestTime: 0,
  queue: [],
  processing: false,

  async acquire() {
    return new Promise((resolve) => {
      this.queue.push(resolve);
      this.process();
    });
  },

  async process() {
    if (this.processing) return;
    this.processing = true;

    while (this.queue.length > 0) {
      const now = Date.now();
      const elapsed = now - this.lastRequestTime;
      const wait = Math.max(0, REQUEST_GAP_MS - elapsed);

      if (wait > 0) {
        await new Promise(r => setTimeout(r, wait));
      }

      this.lastRequestTime = Date.now();
      const resolve = this.queue.shift();
      resolve();
    }

    this.processing = false;
  },
};

// ─── Call Opus API (Anthropic format) ─────────────────────────
// Uses round-robin key selection based on keyIdx
// Thinking is ENABLED with a budget — Opus reasons through complex component structure
async function callOpus(prompt, keyIdx) {
  // Wait for rate limiter slot (1 request per second)
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
            // Response may have multiple content blocks (thinking + text)
            // Extract the text block (type: "text"), not the thinking block
            const textBlock = json.content?.find(b => b.type === 'text');
            const text = textBlock?.text || '';

            if (text.includes('Usage limit reached') || text.includes('quota')) {
              reject(new Error('QUOTA_EXHAUSTED'));
              return;
            }
            if (!text || text.length < 500) {
              reject(new Error(`Response too short: ${text?.length || 0} chars`));
              return;
            }
            resolve({ text, model: json.model, usage: json.usage });
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

// ─── Call with retry (Opus only, round-robin keys) ───────────
async function callOpusWithRetry(prompt, templateId, workerId) {
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    // Round-robin key selection — worker N uses key N % keys.length
    // On retry, try the other key
    const keyIdx = (workerId - 1 + attempt - 1) % OPUS_API_KEYS.length;
    try {
      const result = await callOpus(prompt, keyIdx);
      return result;
    } catch (e) {
      const isQuota = e.message.includes('QUOTA_EXHAUSTED');
      const isRetryable = e.message.includes('429') || e.message.includes('529') ||
                          e.message.includes('timeout') || e.message.includes('overloaded') ||
                          isQuota;

      if (isQuota) {
        // Try the other key first before waiting
        if (OPUS_API_KEYS.length > 1 && attempt === 1) {
          const otherKeyIdx = (keyIdx + 1) % OPUS_API_KEYS.length;
          console.log(`  [W${workerId}][${templateId}] Key${keyIdx+1} quota hit, trying Key${otherKeyIdx+1}...`);
          try {
            const result = await callOpus(prompt, otherKeyIdx);
            return result;
          } catch (e2) {
            if (e2.message.includes('QUOTA_EXHAUSTED')) {
              // Both keys quota-limited, wait 5 minutes
              const delay = 300000;
              console.log(`  [W${workerId}][${templateId}] Both keys quota-limited, waiting ${delay/1000}s for reset...`);
              await new Promise(r => setTimeout(r, delay));
              continue;
            }
            throw e2;
          }
        }
        // Single key or both exhausted — wait 5 minutes
        const delay = 300000;
        console.log(`  [W${workerId}][${templateId}] Quota exhausted, waiting ${delay/1000}s for reset (attempt ${attempt}/${MAX_RETRIES})...`);
        await new Promise(r => setTimeout(r, delay));
        continue;
      }

      if (isRetryable && attempt < MAX_RETRIES) {
        const delay = Math.min(RETRY_BASE_DELAY * Math.pow(2, attempt - 1), 60000);
        console.log(`  [W${workerId}][${templateId}] Retry ${attempt}/${MAX_RETRIES} in ${delay/1000}s — ${e.message.substring(0, 80)}`);
        await new Promise(r => setTimeout(r, delay));
        continue;
      }

      throw e;
    }
  }
}

// ─── Extract code from response ───────────────────────────────
function extractCode(response) {
  let code = response.trim();

  // Strip markdown fences if present
  if (code.startsWith('```')) {
    const firstNewline = code.indexOf('\n');
    if (firstNewline > 0) code = code.substring(firstNewline + 1);
  }
  if (code.endsWith('```')) {
    code = code.substring(0, code.length - 3);
  }

  // Find 'use client' and start from there
  const ucIdx1 = code.indexOf("'use client'");
  const ucIdx2 = code.indexOf('"use client"');
  const ucIdx = Math.max(ucIdx1, ucIdx2);
  if (ucIdx > 0) code = code.substring(ucIdx);

  return code.trim();
}

// ─── Backup existing file ─────────────────────────────────────
function backupFile(templateId) {
  const filePath = path.join(OUTPUT_DIR, `${templateId}.tsx`);
  if (fs.existsSync(filePath)) {
    const backupPath = path.join(BACKUP_DIR, `${templateId}_${Date.now()}.tsx.bak`);
    fs.copyFileSync(filePath, backupPath);
  }
}

// ─── Real checks ──────────────────────────────────────────────
function runRealChecks(template, code) {
  const lineCount = code.split('\n').length;
  const useClient = code.includes("'use client'") || code.includes('"use client"');

  const importChecks = {
    srs: code.includes('createReviewItem') || code.includes('sm2Update'),
    bkt: code.includes('createBKTState') || code.includes('bktUpdate'),
    mastery: code.includes('recordGameScore') || code.includes('getNodeMastery'),
    topicGraph: code.includes('SUBJECT_CONFIG'),
    simEngine: code.includes('audioManager') || code.includes('Confetti') || code.includes('HintBubble'),
  };

  const hasDefaultExport = /export\s+default\s+/.test(code);
  const onCompleteInProps = /onComplete\??\s*:\s*\(?\s*score\s*:\s*number\s*\)?/.test(code);
  const onCompleteCalled = /onComplete\s*\(/.test(code);

  const codeWithoutComments = code
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\/\/[^\n]*/g, '');
  const nodesCovered = template.nodes.filter(n =>
    codeWithoutComments.includes(`'${n}'`) || codeWithoutComments.includes(`"${n}"`)
  );

  const noAny = !/:\s*any\b/.test(code) && !/as\s+any\b/.test(code);
  const hasLocalStorage = /localStorage\.(getItem|setItem)/.test(code) ||
                          /recordGameScore|getNodeMastery|getNodesNeedingReview/.test(code);
  const bktUsed = /bktUpdate\s*\(/.test(code);
  const srsUsed = /sm2Update\s*\(/.test(code);
  const masteryStored = /recordGameScore\s*\(/.test(code);
  const audioUsed = /audioManager\.play\s*\(/.test(code);
  const speechUsed = /speechManager\.speak\s*\(/.test(code);
  const hasHintBubble = /<HintBubble/.test(code);
  const hasConfetti = /<Confetti/.test(code);
  const hasSuccessBanner = /<SuccessBanner/.test(code);
  const hasSparkleBurst = /<SparkleBurst/.test(code);

  const svgCount = (code.match(/<svg/g) || []).length;
  const canvasCount = (code.match(/<canvas/g) || []).length;
  const useStateCount = (code.match(/useState/g) || []).length;
  const useEffectCount = (code.match(/useEffect/g) || []).length;
  const useCallbackCount = (code.match(/useCallback/g) || []).length;
  const motionCount = (code.match(/motion\./g) || []).length;
  const sliderCount = (code.match(/type.*range|slider/gi) || []).length;
  const buttonCount = (code.match(/<button/g) || []).length;
  const onClickCount = (code.match(/onClick/g) || []).length;

  // New Brilliant-style feature checks
  const hasDiscoveryPhase = /'discovery'/.test(code) && /phase.*discovery/.test(code);
  const hasNarrativeScenario = /SCENARIO\s*=/.test(code) || /scenario\s*[:=]/i.test(code);
  const hasDiscoveryQuestion = /DISCOVERY_QUESTION|discoveryQuestion/i.test(code);
  const hasExplorationSteps = /EXPLORATION_STEPS|explorationSteps/i.test(code);
  const hasPredictionQuestions = /PREDICTION_QUESTIONS|predictionQuestions|handlePrediction/i.test(code);
  const hasObservationQuestions = /OBSERVATION_QUESTIONS|observationQuestions|handleObservation/i.test(code);
  // Count prediction and observation questions (require at least 2 of each)
  const predictionCount = (code.match(/question:\s*['"]/g) || []).length; // rough — at least 2 prediction questions
  const hasMultiplePredictions = (code.match(/PREDICTION_QUESTIONS\s*=\s*\[/g) || []).length > 0 && (code.match(/verifyInstruction/g) || []).length >= 2;
  const hasMultipleObservations = (code.match(/OBSERVATION_QUESTIONS\s*=\s*\[/g) || []).length > 0 && (code.match(/observableOptions/g) || []).length >= 2;
  // Visual feedback checks — shake on wrong answer + red flash
  const hasVisualFeedback = /wrongShake|setWrongShake|wrongFlash|setWrongFlash/i.test(code);
  const hasShakeAnimation = /animate.*x.*-10.*10|animate.*\{.*x.*\[0,.*-10/i.test(code);
  // Click-to-reveal progressive disclosure check
  const hasClickToReveal = /revealedSteps|setRevealedSteps|Show next step/i.test(code);
  // Reflection + motivational feedback check
  const hasReflection = /Reflect|most surprising|explain this topic to a friend|where in real life/i.test(code);
  const hasMotivationalFeedback = /PERFECT SCORE|Do not give up|You WILL get this|Great work|Good effort/i.test(code);
  // Misconception tracking check
  const hasMisconceptionTracking = /hitMisconceptions|setHitMisconceptions|Misconception Profile|misconceptionIndex/i.test(code);
  // Multi-representation check (at least 2 of: truth table, Venn, graph, diagram, equation, table, animation)
  const representationCount = [
    /truth\s*table/i.test(code),
    /venn|circle.*overlap|set.*overlap/i.test(code),
    /<svg|viewBox/i.test(code),
    /<canvas|getContext/i.test(code),
    /recharts|<LineChart|<BarChart|<PieChart/i.test(code),
    /d3\.|scaleLinear|axisBottom/i.test(code),
  ].filter(Boolean).length;
  const hasMultiRepresentation = representationCount >= 2;
  // Spaced repetition visibility check
  const hasSrsVisibility = /review.*in.*days|review.*schedule|reviewed in|Come back then|strengthen your memory/i.test(code);
  // Accessibility check
  const hasAccessibility = /aria-label|aria-|role=["']button["']|role=["']slider["']/i.test(code);
  const hasSandboxPhase = /'sandbox'/.test(code) && /phase.*sandbox/.test(code);
  const hasRealWorldActivity = /REAL_WORLD_ACTIVITY|realWorldActivity/i.test(code);
  const hasDragLabel = /drag-label|dragLabel/.test(code);
  const hasDragSort = /drag-sort|dragSort/.test(code);
  const hasNumeric = /'numeric'/.test(code) && /correctAnswer/.test(code);
  const hasConstruct = /'construct'/.test(code) && /availableParts/.test(code);
  const hasEscalatingHints = /hints\s*[=:]\s*\[/.test(code) && /hintCount/.test(code);
  const hasAnswerRevealed = /answerRevealed/.test(code);
  const hasNextChallenge = /handleNextChallenge|nextChallenge/i.test(code);
  const hasBktRef = /bktStateRef/.test(code);
  const hasDragHandlers = /handleDragStart/.test(code) && /handleDragDrop/.test(code);
  // Real-time sliders: any range input that updates state on change (generic — not topic-specific)
  const hasRealTimeSliders = /type=["']range["'][^>]*onChange=\{[^}]*set[A-Z]/.test(code) ||
                             /onChange=\{[^}]*set\w+\(Number\(e\.target\.value\)\)\}/.test(code) ||
                             /handlePriceChange|handleSliderChange|handleVariableChange/.test(code);
  const nonMcqCount = [hasDragLabel, hasDragSort, hasNumeric, hasConstruct].filter(Boolean).length;
  const challengeCount = (code.match(/difficulty:\s*['"](?:foundation|standard|advanced)['"]/g) || []).length;
  // NEP 2020 competency-based question checks
  const hasCompetencyLevels = /competencyLevel\s*[:=]/.test(code);
  const competencyRecallCount = (code.match(/competencyLevel:\s*['"]recall['"]/g) || []).length;
  const competencyUnderstandingCount = (code.match(/competencyLevel:\s*['"]understanding['"]/g) || []).length;
  const competencyApplicationCount = (code.match(/competencyLevel:\s*['"]application['"]/g) || []).length;
  const competencyAnalysisCount = (code.match(/competencyLevel:\s*['"]analysis['"]/g) || []).length;
  const competencyEvaluationCount = (code.match(/competencyLevel:\s*['"]evaluation['"]/g) || []).length;
  const competencyCreativityCount = (code.match(/competencyLevel:\s*['"]creativity['"]/g) || []).length;
  const competencyBasedCount = competencyApplicationCount + competencyAnalysisCount + competencyEvaluationCount + competencyCreativityCount;
  const hasNepCompetency = hasCompetencyLevels && competencyBasedCount >= 8;  // at least 40% of 20+ challenges

  return {
    lineCount, useClient, importChecks,
    allImportsPresent: Object.values(importChecks).every(v => v),
    hasDefaultExport, onCompleteInProps, onCompleteCalled,
    nodesCovered: nodesCovered.length,
    nodesTotal: template.nodes.length,
    noAny, hasLocalStorage, bktUsed, srsUsed, masteryStored,
    audioUsed, speechUsed, hasHintBubble, hasConfetti, hasSuccessBanner, hasSparkleBurst,
    svgCount, canvasCount,
    useStateCount, useEffectCount, useCallbackCount, motionCount, sliderCount, buttonCount, onClickCount,
    // New feature checks
    hasDiscoveryPhase, hasNarrativeScenario, hasDiscoveryQuestion,
    hasExplorationSteps, hasPredictionQuestions, hasObservationQuestions, hasSandboxPhase,
    hasMultiplePredictions, hasMultipleObservations,
    hasVisualFeedback, hasShakeAnimation, hasClickToReveal,
    hasReflection, hasMotivationalFeedback, hasMisconceptionTracking,
    hasMultiRepresentation, hasSrsVisibility, hasAccessibility,
    hasRealWorldActivity,
    hasDragLabel, hasDragSort, hasNumeric, hasConstruct,
    hasEscalatingHints, hasAnswerRevealed, hasNextChallenge, hasBktRef, hasDragHandlers,
    hasRealTimeSliders,
    nonMcqCount, challengeCount,
    // NEP 2020 competency checks
    hasCompetencyLevels, hasNepCompetency,
    competencyRecallCount, competencyUnderstandingCount,
    competencyApplicationCount, competencyAnalysisCount,
    competencyEvaluationCount, competencyCreativityCount,
    competencyBasedCount,
  };
}

// ─── Run tsc and get actual compiler errors ──────────────────
const TSC_CMD = `npx tsc --noEmit --skipLibCheck --jsx react-jsx --esModuleInterop --moduleResolution node --target es2020 --module esnext --strict false`;

function getTscErrors(filePath) {
  try {
    // Filter out errors from library files (lib/bkt.ts, lib/srs.ts, etc.)
    // We only care about errors in the generated file itself
    const output = execSync(`${TSC_CMD} "${filePath}" 2>&1`, {
      cwd: FRONTEND_DIR,
      encoding: 'utf8',
      timeout: 30000,
    });
    return [];
  } catch (e) {
    const output = e.stdout || e.message || '';
    const fileBase = path.basename(filePath);
    // Only count errors in the generated file, not library files
    return output.split('\n')
      .filter(l => l.includes('error TS') && l.includes(fileBase))
      .map(l => l.trim());
  }
}

// ─── Build fix prompt for failed checks ───────────────────────
function buildFixPrompt(template, code, checks, tscErrors) {
  const failures = [];

  if (!checks.useClient) failures.push("Missing 'use client' directive at top of file");
  if (!checks.allImportsPresent) {
    const missing = [];
    if (!checks.importChecks.srs) missing.push('srs (createReviewItem, sm2Update)');
    if (!checks.importChecks.bkt) missing.push('bkt (createBKTState, bktUpdate, getMasteryLevel)');
    if (!checks.importChecks.mastery) missing.push('masteryStore (recordGameScore, getNodeMastery)');
    if (!checks.importChecks.topicGraph) missing.push('topicGraph (SUBJECT_CONFIG)');
    if (!checks.importChecks.simEngine) missing.push('sim-engine (audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst)');
    failures.push(`Missing imports: ${missing.join(', ')}`);
  }
  if (!checks.hasDefaultExport) failures.push("Missing default export");
  if (!checks.onCompleteInProps) failures.push("onComplete must be in props interface as: onComplete?: (score: number) => void");
  if (!checks.onCompleteCalled) failures.push("onComplete() must be called when simulation completes");
  if (!checks.hasLocalStorage) failures.push("Must use localStorage (either directly or via recordGameScore/getNodeMastery)");
  if (!checks.bktUsed) failures.push("bktUpdate() must be called after each answer for adaptive mastery");
  if (!checks.srsUsed) failures.push("sm2Update() must be called after each challenge for spaced repetition");
  if (!checks.masteryStored) failures.push("recordGameScore() must be called on completion");
  if (!checks.audioUsed) failures.push("audioManager.play() must be called 8+ times with valid SoundEffect strings");
  if (!checks.speechUsed) failures.push("speechManager.speak() must be called 5+ times");
  if (!checks.hasHintBubble) failures.push("<HintBubble> must be used in JSX");
  if (!checks.hasConfetti) failures.push("<Confetti> must be used in JSX");
  if (!checks.hasSuccessBanner) failures.push("<SuccessBanner> must be used in JSX");
  if (!checks.hasSparkleBurst) failures.push("<SparkleBurst> must be used in JSX");
  if (checks.nodesCovered < checks.nodesTotal) {
    const missing = template.nodes.filter(n => !code.includes(`'${n}'`) && !code.includes(`"${n}"`));
    failures.push(`Missing node IDs as string literals: ${missing.join(', ')}`);
  }
  if (checks.lineCount < 2000) failures.push(`Line count is ${checks.lineCount}, minimum is 2000 (with Brilliant-style additions — discovery, narrative, exploration steps, sandbox, predictions, 20+ challenges, drag-and-drop, hints — you need 2500+). Add more interactive exploration steps, SVG diagrams, challenge variants, drag-and-drop interactions, and motion-enriched UI sections.`);
  if (checks.svgCount < 2) failures.push(`Only ${checks.svgCount} SVG diagrams, need at least 3 topic-specific SVGs`);
  if (checks.canvasCount < 1) failures.push(`Missing HTML <canvas> animation — need at least 1 <canvas> with requestAnimationFrame`);

  const useStateCount = (code.match(/useState/g) || []).length;
  if (useStateCount < 20) failures.push(`Only ${useStateCount} useState calls, need 30+ for rich interactivity (including hintCount, answerRevealed, showExplanation, draggedItem, droppedLabels, sortArrangement, numericInput, constructParts, discoveryAnswered, showConfetti, showSuccess, showSparkle, sparklePos, currentSlide, predictionMade, predictionIndex, predictionVerified, observationAnswered, observationIndex, sandboxReady, selectedStakeholder, stakeholderReactions, priceLevel)`);

  const motionCount = (code.match(/motion\./g) || []).length;
  if (motionCount < 60) failures.push(`Only ${motionCount} framer-motion components, need 60+ (Opus benchmark is 74-150). Convert ALL <button> to <motion.button> with whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}. Convert content wrappers to <motion.div> with initial/animate/exit. Add AnimatePresence for tab transitions. Add motion to progress bars, feedback banners, difficulty badges, misconception cards, and completion screens.`);

  const useCallbackCount = (code.match(/useCallback/g) || []).length;
  if (useCallbackCount < 12) failures.push(`Only ${useCallbackCount} useCallback calls, need 12+ (Opus benchmark is 12-14). Extract ALL event handlers (handleAnswer, handleNextChallenge, handleComplete, handleDragStart, handleDragDrop, handleSortMove, handleSortSubmit, showNextHint, handleDiscoveryAnswer, handleAdvanceToExploration, handleAdvanceToSandbox, handleAdvanceToChallenge, handlePrediction, handleObservation, handleStakeholderClick, handlePriceChange, resetInactivityTimer, etc.) as separate useCallback functions.`);

  // New Brilliant-style feature checks
  if (!checks.hasDiscoveryPhase) failures.push("Missing discovery phase — phase must include 'discovery' BEFORE 'explore'. Flow: discovery → explore → sandbox → challenge → complete");
  if (!checks.hasNarrativeScenario) failures.push("Missing narrative scenario — define a SCENARIO object with title, intro, and context that wraps the topic");
  if (!checks.hasDiscoveryQuestion) failures.push("Missing DISCOVERY_QUESTION — a low-stakes curiosity question before exploration");
  if (!checks.hasExplorationSteps) failures.push("Missing EXPLORATION_STEPS array — need 5 interactive exploration steps with title, instruction, interactionType, nodeId (NOT text slides)");
  if (!checks.hasPredictionQuestions) failures.push("Missing PREDICTION_QUESTIONS — Brilliant.org predict-then-check pattern. Student predicts, then interacts to verify.");
  if (!checks.hasObservationQuestions) failures.push("Missing OBSERVATION_QUESTIONS — Brilliant.org 'what do you notice?' pattern. Student observes the visualization and answers.");
  if (!checks.hasMultiplePredictions) failures.push("Need at least 2 PREDICTION_QUESTIONS (only found 1 or 0). Add a second prediction question with a verifyInstruction field.");
  if (!checks.hasMultipleObservations) failures.push("Need at least 2 OBSERVATION_QUESTIONS (only found 1 or 0). Add a second observation question with observableOptions field.");
  if (!checks.hasVisualFeedback) failures.push("Missing VISUAL FEEDBACK on wrong answers — need wrongShake/wrongFlash state variables. Wrong answers MUST shake the button (animate={{ x: [0, -10, 10, 0] }}) and flash red (bg-rose-900/60). Audio alone is NOT sufficient.");
  if (!checks.hasShakeAnimation) failures.push("Missing SHAKE ANIMATION — wrong answer buttons must use framer-motion animate={{ x: [0, -10, 10, -10, 10, 0] }} with transition={{ duration: 0.4 }}");
  if (!checks.hasClickToReveal) failures.push("Missing CLICK-TO-REVEAL progressive disclosure — explanations must be broken into steps, shown one at a time with 'Show next step' button. Use revealedSteps state variable.");
  if (!checks.hasReflection) failures.push("Missing REFLECTION section — after completion, show reflection questions: 'What was the most surprising thing you learned?', 'How would you explain this to a friend?', 'Where in real life might you use this?'");
  if (!checks.hasMotivationalFeedback) failures.push("Missing MOTIVATIONAL FEEDBACK — after completion, show personalised message based on errors: 0 errors='PERFECT SCORE!', 1-3='Great work!', 4-7='Good effort!', 8+='Do not give up — You WILL get this!'");
  if (!checks.hasMisconceptionTracking) failures.push("Missing MISCONCEPTION TRACKING — track which misconceptionIndex values the student hit (hitMisconceptions state), show 'Your Misconception Profile' at completion with each misconception and its correction");
  if (!checks.hasMultiRepresentation) failures.push("Missing MULTI-REPRESENTATION — show the same concept in at least 2 different ways (e.g. truth table + Venn diagram, or equation + graph + diagram). Only 1 representation found.");
  if (!checks.hasSrsVisibility) failures.push("Missing SPACED REPETITION VISIBILITY — after completion, show when the student should review this topic again (e.g. 'review in 7 days' for 0 errors, '3 days' for 1-3, '1 day' for 4+). Make SRS visible to the student.");
  if (!checks.hasAccessibility) failures.push("Missing ACCESSIBILITY — add aria-label to interactive elements (buttons, sliders, drag items). Use role='button' on draggable elements. Don't rely on color alone — add ✓/✗ icons alongside green/red colors.");
  if (!checks.hasSandboxPhase) failures.push("Missing sandbox phase — need a free-play mode before challenges where students explore without grading");
  if (!checks.hasRealTimeSliders) failures.push("Missing real-time slider-to-visualization connection — need at least one <input type='range'> with onChange that calls a setState function (e.g. onChange={(e) => setMyVar(Number(e.target.value))}). The slider must update the visualization INSTANTLY as the student drags — no submit button needed.");
  // NEP 2020 competency checks
  if (!checks.hasCompetencyLevels) failures.push("Missing competencyLevel field on challenges — NEP 2020 / CISCE 2026 requires every challenge to have competencyLevel: 'recall' | 'understanding' | 'application' | 'analysis' | 'evaluation' | 'creativity'");
  if (!checks.hasNepCompetency) failures.push(`Only ${checks.competencyBasedCount} competency-based challenges (application + analysis + evaluation + creativity), need at least 8 (40% of 20+). Current: recall=${checks.competencyRecallCount}, understanding=${checks.competencyUnderstandingCount}, application=${checks.competencyApplicationCount}, analysis=${checks.competencyAnalysisCount}, evaluation=${checks.competencyEvaluationCount}, creativity=${checks.competencyCreativityCount}. Add more application/analysis/evaluation/creativity challenges with real-world Indian scenarios.`);
  if (!checks.hasRealWorldActivity) failures.push("Missing REAL_WORLD_ACTIVITY — need title, description, and steps for end-of-simulation activity");
  if (!checks.hasEscalatingHints) failures.push("Missing escalating hints system — each challenge needs hints: string[] with 3 hints, plus hintCount state to track hint level");
  if (!checks.hasAnswerRevealed) failures.push("Missing answerRevealed state — explanation should only show after hints exhausted OR correct answer");
  if (!checks.hasNextChallenge) failures.push("Missing handleNextChallenge — need a handler that resets per-challenge state and advances to next or calls handleComplete");
  if (!checks.hasBktRef) failures.push("BKT state should be in useRef (bktStateRef) to persist across challenges — do NOT recreate createBKTState() each time");
  if (!checks.hasDragHandlers) failures.push("Missing drag handlers — need handleDragStart (plays 'pickup') and handleDragDrop (plays 'drop-correct'/'drop-wrong') for drag-label challenges");
  if (checks.nonMcqCount < 1) failures.push("Need at least 1 non-MCQ challenge type (drag-label, drag-sort, numeric, or construct) — MCQ alone is not enough variety");
  if (checks.challengeCount < 20) failures.push(`Only ${checks.challengeCount} challenges with difficulty tags, need 20+ (6-8 foundation, 6-8 standard, 6-8 advanced)`);

  // Add tsc compiler errors (most important — these prevent compilation)
  let tscSection = '';
  if (tscErrors && tscErrors.length > 0) {
    tscSection = `\n## TYPESCRIPT COMPILER ERRORS (CRITICAL — fix every one):\n${tscErrors.slice(0, 25).join('\n')}\n${tscErrors.length > 25 ? `... and ${tscErrors.length - 25} more.\n` : ''}\n## COMMON FIXES:\n- sim-engine components (HintBubble, Confetti, SuccessBanner, SparkleBurst) do NOT have a 'show' prop. Use: {showX && <HintBubble message={hint} onComplete={() => setShowX(false)} />}\n- They use 'message' not 'text'\n- For sliders: type="range" min={5} max={100} (curly braces for numeric props)\n- Do NOT use 'any' type\n`;
  }

  return `You generated a React component for an educational simulation, but it failed quality checks. Fix ALL the issues below and output the COMPLETE corrected component.
${tscSection}
## STRUCTURAL FAILURES TO FIX:
${failures.map((f, i) => `${i + 1}. ${f}`).join('\n')}

## ORIGINAL CODE (fix this — do NOT rewrite from scratch, just fix the issues):
${code}

## INSTRUCTIONS:
- Output the COMPLETE fixed component (not just the changed parts)
- Keep all the good parts of the original code
- Only add/fix what's needed to pass the checks above
- Output ONLY code — no markdown fences, no explanations
- Start with 'use client';
- End with: export default ${template.id};`;
}

// ─── Process one template ─────────────────────────────────────
async function processTemplate(template, workerId) {
  const tag = `[W${workerId}][${template.id}]`;
  const outputPath = path.join(OUTPUT_DIR, `${template.id}.tsx`);

  // 0. Skip if file already exists and passes tsc (resume support)
  if (fs.existsSync(outputPath)) {
    const existingCode = fs.readFileSync(outputPath, 'utf8');
    const existingChecks = runRealChecks(template, existingCode);
    const existingTscErrors = getTscErrors(outputPath);
    const existingStructural = existingChecks.useClient && existingChecks.allImportsPresent &&
                               existingChecks.hasDefaultExport && existingChecks.onCompleteInProps &&
                               existingChecks.onCompleteCalled && existingChecks.hasLocalStorage &&
                               existingChecks.bktUsed && existingChecks.srsUsed && existingChecks.masteryStored &&
                               existingChecks.audioUsed && existingChecks.speechUsed &&
                               existingChecks.hasHintBubble && existingChecks.hasConfetti &&
                               existingChecks.hasSuccessBanner && existingChecks.hasSparkleBurst &&
                               existingChecks.hasDiscoveryPhase && existingChecks.hasNarrativeScenario &&
                               existingChecks.hasExplorationSteps && existingChecks.hasPredictionQuestions &&
                               existingChecks.hasMultiplePredictions && existingChecks.hasMultipleObservations &&
                               existingChecks.hasVisualFeedback && existingChecks.hasShakeAnimation &&
                               existingChecks.hasClickToReveal &&
                               existingChecks.hasReflection && existingChecks.hasMotivationalFeedback &&
                               existingChecks.hasMisconceptionTracking && existingChecks.hasMultiRepresentation &&
                               existingChecks.hasSrsVisibility && existingChecks.hasAccessibility &&
                               existingChecks.hasObservationQuestions && existingChecks.hasSandboxPhase &&
                               existingChecks.hasRealTimeSliders && existingChecks.hasRealWorldActivity &&
                               existingChecks.hasEscalatingHints && existingChecks.hasAnswerRevealed &&
                               existingChecks.hasNextChallenge && existingChecks.hasBktRef &&
                               existingChecks.hasNepCompetency && existingChecks.hasCompetencyLevels &&
                               existingChecks.nonMcqCount >= 1;
    const existingNodePass = existingChecks.nodesCovered === existingChecks.nodesTotal;
    const existingLinePass = existingChecks.lineCount >= 2000;
    const existingMotionPass = existingChecks.motionCount >= 60;
    const existingCallbackPass = existingChecks.useCallbackCount >= 12;
    const existingSuccess = existingStructural && existingNodePass && existingLinePass && existingMotionPass && existingCallbackPass && existingTscErrors.length === 0;

    if (existingSuccess) {
      console.log(`${tag} SKIP — already exists and passes all checks (${existingChecks.lineCount} lines, tsc clean)`);
      return {
        id: template.id, success: true, checks: existingChecks, modelUsed: 'existing',
        class: template.class, subject: template.subject, stream: template.stream, skipped: true,
      };
    }

    // File exists but has errors — try to fix it instead of regenerating
    if (existingTscErrors.length > 0 && ENABLE_FIX_PASS) {
      console.log(`${tag} EXISTS but ${existingTscErrors.length} tsc errors — fixing...`);
      const fixPrompt = buildFixPrompt(template, existingCode, existingChecks, existingTscErrors);
      try {
        const fixResult = await callOpusWithRetry(fixPrompt, template.id + '_FIX', workerId);
        const fixedCode = extractCode(fixResult.text);
        if (fixedCode.length > 500) {
          fs.writeFileSync(outputPath, fixedCode, 'utf8');
          const fixedTscErrors = getTscErrors(outputPath);
          const fixedChecks = runRealChecks(template, fixedCode);
          const fixedSuccess = fixedChecks.useClient && fixedChecks.allImportsPresent &&
                               fixedChecks.hasDefaultExport && fixedChecks.onCompleteInProps &&
                               fixedChecks.onCompleteCalled && fixedChecks.hasLocalStorage &&
                               fixedChecks.bktUsed && fixedChecks.srsUsed && fixedChecks.masteryStored &&
                               fixedChecks.audioUsed && fixedChecks.speechUsed &&
                               fixedChecks.hasHintBubble && fixedChecks.hasConfetti &&
                               fixedChecks.hasSuccessBanner && fixedChecks.hasSparkleBurst &&
                               fixedChecks.hasDiscoveryPhase && fixedChecks.hasNarrativeScenario &&
                               fixedChecks.hasExplorationSteps && fixedChecks.hasPredictionQuestions &&
                               fixedChecks.hasMultiplePredictions && fixedChecks.hasMultipleObservations &&
                               fixedChecks.hasVisualFeedback && fixedChecks.hasShakeAnimation &&
                               fixedChecks.hasClickToReveal &&
                               fixedChecks.hasReflection && fixedChecks.hasMotivationalFeedback &&
                               fixedChecks.hasMisconceptionTracking && fixedChecks.hasMultiRepresentation &&
                               fixedChecks.hasSrsVisibility && fixedChecks.hasAccessibility &&
                               fixedChecks.hasObservationQuestions && fixedChecks.hasSandboxPhase &&
                               fixedChecks.hasRealTimeSliders && fixedChecks.hasRealWorldActivity &&
                               fixedChecks.hasEscalatingHints && fixedChecks.hasAnswerRevealed &&
                               fixedChecks.hasNextChallenge && fixedChecks.hasBktRef &&
                               fixedChecks.hasNepCompetency && fixedChecks.hasCompetencyLevels &&
                               fixedChecks.nonMcqCount >= 1 &&
                               fixedChecks.nodesCovered === fixedChecks.nodesTotal &&
                               fixedChecks.lineCount >= 2000 &&
                               fixedChecks.motionCount >= 60 &&
                               fixedChecks.useCallbackCount >= 12 &&
                               fixedTscErrors.length === 0;
          console.log(`${tag} FIX: ${fixedSuccess ? 'SUCCESS' : 'STILL BROKEN'} (tsc: ${fixedTscErrors.length} errors, lines: ${fixedChecks.lineCount}, motion: ${fixedChecks.motionCount}, callbacks: ${fixedChecks.useCallbackCount})`);
          return {
            id: template.id, success: fixedSuccess, checks: fixedChecks, modelUsed: 'claude-opus-4-6',
            class: template.class, subject: template.subject, stream: template.stream, fixed: true,
          };
        }
      } catch (e) {
        console.log(`${tag} Fix failed: ${e.message} — will regenerate`);
      }
    }
  }

  console.log(`${tag} START — C${template.class} ${template.subjectName}, ${template.nodes.length} nodes`);

  // 1. Backup existing file
  backupFile(template.id);

  // 2. Delete old file
  try { fs.unlinkSync(outputPath); } catch (e) {}

  // 3. Build prompt
  const prompt = buildPrompt(template);
  console.log(`${tag} Prompt: ${(prompt.length / 1024).toFixed(0)} KB`);

  // 4. Call Opus API with retry
  let response, modelUsed, usage;
  try {
    const result = await callOpusWithRetry(prompt, template.id, workerId);
    response = result.text;
    modelUsed = result.model;
    usage = result.usage;
  } catch (e) {
    console.error(`${tag} FAIL: ${e.message}`);
    return { id: template.id, success: false, error: e.message, class: template.class, subject: template.subject };
  }

  // 5. Extract code
  let code = extractCode(response);
  console.log(`${tag} Response: ${code.length} chars, ${code.split('\n').length} lines (${modelUsed}, in:${usage?.input_tokens || '?'} out:${usage?.output_tokens || '?'} tokens)`);

  if (code.length < 500) {
    console.error(`${tag} FAIL: Code too short (${code.length} chars)`);
    return { id: template.id, success: false, error: `Code too short: ${code.length} chars`, class: template.class, subject: template.subject };
  }

  // 6. Write the file
  fs.writeFileSync(outputPath, code, 'utf8');

  // 7. Real checks
  let checks = runRealChecks(template, code);
  console.log(`${tag} Lines: ${checks.lineCount} | motion: ${checks.motionCount} | callbacks: ${checks.useCallbackCount} | SVG: ${checks.svgCount} | Canvas: ${checks.canvasCount} | useClient: ${checks.useClient} | imports: ${checks.allImportsPresent ? 'OK' : 'MISSING'} | nodes: ${checks.nodesCovered}/${checks.nodesTotal} | challenges: ${checks.challengeCount} | non-MCQ: ${checks.nonMcqCount} | competency: ${checks.competencyBasedCount}/${checks.challengeCount} (R:${checks.competencyRecallCount} U:${checks.competencyUnderstandingCount} App:${checks.competencyApplicationCount} An:${checks.competencyAnalysisCount} Ev:${checks.competencyEvaluationCount} Cr:${checks.competencyCreativityCount}) | discovery: ${checks.hasDiscoveryPhase ? 'Y' : 'N'} | explore: ${checks.hasExplorationSteps ? 'Y' : 'N'} | sandbox: ${checks.hasSandboxPhase ? 'Y' : 'N'} | predict: ${checks.hasPredictionQuestions ? 'Y' : 'N'} | observe: ${checks.hasObservationQuestions ? 'Y' : 'N'} | realtime: ${checks.hasRealTimeSliders ? 'Y' : 'N'} | hints: ${checks.hasEscalatingHints ? 'Y' : 'N'} | drag: ${checks.hasDragHandlers ? 'Y' : 'N'} | BKT: ${checks.bktUsed} | SRS: ${checks.srsUsed} | mastery: ${checks.masteryStored} | audio: ${checks.audioUsed} | speech: ${checks.speechUsed}`);

  // 8. Determine success
  const structuralPass = checks.useClient && checks.allImportsPresent && checks.hasDefaultExport &&
                         checks.onCompleteInProps && checks.onCompleteCalled &&
                         checks.hasLocalStorage && checks.bktUsed && checks.srsUsed && checks.masteryStored &&
                         checks.audioUsed && checks.speechUsed &&
                         checks.hasHintBubble && checks.hasConfetti && checks.hasSuccessBanner && checks.hasSparkleBurst &&
                         checks.hasDiscoveryPhase && checks.hasNarrativeScenario &&
                         checks.hasExplorationSteps && checks.hasPredictionQuestions &&
                         checks.hasMultiplePredictions && checks.hasMultipleObservations &&
                         checks.hasVisualFeedback && checks.hasShakeAnimation &&
                         checks.hasClickToReveal &&
                         checks.hasReflection && checks.hasMotivationalFeedback &&
                         checks.hasMisconceptionTracking && checks.hasMultiRepresentation &&
                         checks.hasSrsVisibility && checks.hasAccessibility &&
                         checks.hasObservationQuestions && checks.hasSandboxPhase &&
                         checks.hasRealTimeSliders && checks.hasRealWorldActivity &&
                         checks.hasEscalatingHints && checks.hasAnswerRevealed &&
                         checks.hasNextChallenge && checks.hasBktRef &&
                         checks.hasNepCompetency && checks.hasCompetencyLevels &&
                         checks.nonMcqCount >= 1;
  const nodePass = checks.nodesCovered === checks.nodesTotal;
  const linePass = checks.lineCount >= 2000;
  const motionPass = checks.motionCount >= 60;
  const callbackPass = checks.useCallbackCount >= 12;
  let success = structuralPass && nodePass && linePass && motionPass && callbackPass;

  console.log(`${tag} PASS 1: ${success ? 'SUCCESS' : 'NEEDS FIX'} (structural: ${structuralPass}, nodes: ${nodePass}, lines: ${linePass} (${checks.lineCount}), motion: ${motionPass} (${checks.motionCount}), callbacks: ${callbackPass} (${checks.useCallbackCount}), challenges: ${checks.challengeCount}, non-MCQ: ${checks.nonMcqCount}, competency: ${checks.competencyBasedCount}/${checks.challengeCount} (${checks.hasNepCompetency ? 'OK' : 'LOW'}), explore: ${checks.hasExplorationSteps ? 'Y' : 'N'}, sandbox: ${checks.hasSandboxPhase ? 'Y' : 'N'}, predict: ${checks.hasPredictionQuestions ? 'Y' : 'N'} (${checks.hasMultiplePredictions ? '2+' : '1'}), observe: ${checks.hasObservationQuestions ? 'Y' : 'N'} (${checks.hasMultipleObservations ? '2+' : '1'}), realtime: ${checks.hasRealTimeSliders ? 'Y' : 'N'}, vfeedback: ${checks.hasVisualFeedback ? 'Y' : 'N'}, shake: ${checks.hasShakeAnimation ? 'Y' : 'N'}, reveal: ${checks.hasClickToReveal ? 'Y' : 'N'}, reflect: ${checks.hasReflection ? 'Y' : 'N'}, motiv: ${checks.hasMotivationalFeedback ? 'Y' : 'N'}, misc: ${checks.hasMisconceptionTracking ? 'Y' : 'N'}, multi-rep: ${checks.hasMultiRepresentation ? 'Y' : 'N'}, srs-vis: ${checks.hasSrsVisibility ? 'Y' : 'N'}, a11y: ${checks.hasAccessibility ? 'Y' : 'N'})`);

  // 9. Run tsc check on the generated file
  const tscErrors = getTscErrors(outputPath);
  if (tscErrors.length > 0) {
    console.log(`${tag} TSC: ${tscErrors.length} compiler errors`);
    tscErrors.slice(0, 3).forEach(e => console.log(`  ${e.substring(0, 120)}`));
  } else {
    console.log(`${tag} TSC: CLEAN`);
  }

  // 10. Fix pass — if structural checks OR tsc failed, send code back to Opus
  if ((!success || tscErrors.length > 0) && ENABLE_FIX_PASS) {
    console.log(`${tag} Running fix pass — sending code + errors back to Opus...`);
    const fixPrompt = buildFixPrompt(template, code, checks, tscErrors);
    console.log(`${tag} Fix prompt: ${(fixPrompt.length / 1024).toFixed(0)} KB`);

    try {
      const fixResult = await callOpusWithRetry(fixPrompt, template.id + '_FIX', workerId);
      const fixedCode = extractCode(fixResult.text);
      console.log(`${tag} Fix response: ${fixedCode.length} chars, ${fixedCode.split('\n').length} lines (in:${fixResult.usage?.input_tokens || '?'} out:${fixResult.usage?.output_tokens || '?'} tokens)`);

      if (fixedCode.length > 500) {
        // Write fixed file
        fs.writeFileSync(outputPath, fixedCode, 'utf8');

        // Re-run structural checks
        const fixedChecks = runRealChecks(template, fixedCode);
        console.log(`${tag} FIX Lines: ${fixedChecks.lineCount} | motion: ${fixedChecks.motionCount} | callbacks: ${fixedChecks.useCallbackCount} | SVG: ${fixedChecks.svgCount} | Canvas: ${fixedChecks.canvasCount} | useClient: ${fixedChecks.useClient} | imports: ${fixedChecks.allImportsPresent ? 'OK' : 'MISSING'} | nodes: ${fixedChecks.nodesCovered}/${fixedChecks.nodesTotal} | challenges: ${fixedChecks.challengeCount} | non-MCQ: ${fixedChecks.nonMcqCount} | competency: ${fixedChecks.competencyBasedCount}/${fixedChecks.challengeCount} | discovery: ${fixedChecks.hasDiscoveryPhase ? 'Y' : 'N'} | explore: ${fixedChecks.hasExplorationSteps ? 'Y' : 'N'} | sandbox: ${fixedChecks.hasSandboxPhase ? 'Y' : 'N'} | predict: ${fixedChecks.hasPredictionQuestions ? 'Y' : 'N'} | observe: ${fixedChecks.hasObservationQuestions ? 'Y' : 'N'} | realtime: ${fixedChecks.hasRealTimeSliders ? 'Y' : 'N'} | hints: ${fixedChecks.hasEscalatingHints ? 'Y' : 'N'} | drag: ${fixedChecks.hasDragHandlers ? 'Y' : 'N'} | BKT: ${fixedChecks.bktUsed} | SRS: ${fixedChecks.srsUsed} | mastery: ${fixedChecks.masteryStored} | audio: ${fixedChecks.audioUsed} | speech: ${fixedChecks.speechUsed}`);

        // Re-run tsc
        const fixedTscErrors = getTscErrors(outputPath);
        console.log(`${tag} FIX TSC: ${fixedTscErrors.length} errors remaining`);

        const fixedStructural = fixedChecks.useClient && fixedChecks.allImportsPresent && fixedChecks.hasDefaultExport &&
                                fixedChecks.onCompleteInProps && fixedChecks.onCompleteCalled &&
                                fixedChecks.hasLocalStorage && fixedChecks.bktUsed && fixedChecks.srsUsed && fixedChecks.masteryStored &&
                                fixedChecks.audioUsed && fixedChecks.speechUsed &&
                                fixedChecks.hasHintBubble && fixedChecks.hasConfetti && fixedChecks.hasSuccessBanner && fixedChecks.hasSparkleBurst &&
                                fixedChecks.hasDiscoveryPhase && fixedChecks.hasNarrativeScenario &&
                                fixedChecks.hasExplorationSteps && fixedChecks.hasPredictionQuestions &&
                               fixedChecks.hasMultiplePredictions && fixedChecks.hasMultipleObservations &&
                               fixedChecks.hasVisualFeedback && fixedChecks.hasShakeAnimation &&
                               fixedChecks.hasClickToReveal &&
                               fixedChecks.hasReflection && fixedChecks.hasMotivationalFeedback &&
                               fixedChecks.hasMisconceptionTracking && fixedChecks.hasMultiRepresentation &&
                               fixedChecks.hasSrsVisibility && fixedChecks.hasAccessibility &&
                               fixedChecks.hasObservationQuestions && fixedChecks.hasSandboxPhase &&
                               fixedChecks.hasRealTimeSliders && fixedChecks.hasRealWorldActivity &&
                                fixedChecks.hasEscalatingHints && fixedChecks.hasAnswerRevealed &&
                                fixedChecks.hasNextChallenge && fixedChecks.hasBktRef &&
                                fixedChecks.hasNepCompetency && fixedChecks.hasCompetencyLevels &&
                                fixedChecks.nonMcqCount >= 1;
        const fixedNodePass = fixedChecks.nodesCovered === fixedChecks.nodesTotal;
        const fixedLinePass = fixedChecks.lineCount >= 2000;
        const fixedMotionPass = fixedChecks.motionCount >= 60;
        const fixedCallbackPass = fixedChecks.useCallbackCount >= 12;
        const fixedSuccess = fixedStructural && fixedNodePass && fixedLinePass && fixedMotionPass && fixedCallbackPass && fixedTscErrors.length === 0;

        console.log(`${tag} FIX RESULT: ${fixedSuccess ? 'SUCCESS' : 'STILL NEEDS FIX'} (structural: ${fixedStructural}, nodes: ${fixedNodePass}, lines: ${fixedLinePass} (${fixedChecks.lineCount}), challenges: ${fixedChecks.challengeCount}, explore: ${fixedChecks.hasExplorationSteps ? 'Y' : 'N'}, sandbox: ${fixedChecks.hasSandboxPhase ? 'Y' : 'N'}, tsc: ${fixedTscErrors.length === 0 ? 'CLEAN' : fixedTscErrors.length + ' errors'})`);

        // Use fixed version if it's better (fewer total errors)
        const oldErrorCount = (success ? 0 : 1) + tscErrors.length;
        const newErrorCount = (fixedSuccess ? 0 : 1) + fixedTscErrors.length;
        if (newErrorCount < oldErrorCount || fixedSuccess) {
          code = fixedCode;
          checks = fixedChecks;
          success = fixedSuccess;
          usage = { ...usage, ...fixResult.usage, fixInputTokens: fixResult.usage?.input_tokens, fixOutputTokens: fixResult.usage?.output_tokens };
        }

        // Second fix pass if still has tsc errors but improved
        if (!fixedSuccess && fixedTscErrors.length > 0 && fixedTscErrors.length < tscErrors.length) {
          console.log(`${tag} 2nd fix pass — ${fixedTscErrors.length} tsc errors remaining...`);
          const fixPrompt2 = buildFixPrompt(template, fixedCode, fixedChecks, fixedTscErrors);
          try {
            const fixResult2 = await callOpusWithRetry(fixPrompt2, template.id + '_FIX2', workerId);
            const fixedCode2 = extractCode(fixResult2.text);
            if (fixedCode2.length > 500) {
              fs.writeFileSync(outputPath, fixedCode2, 'utf8');
              const finalTscErrors = getTscErrors(outputPath);
              const finalChecks = runRealChecks(template, fixedCode2);
              const finalSuccess = finalChecks.useClient && finalChecks.allImportsPresent &&
                                   finalChecks.hasDefaultExport && finalChecks.onCompleteInProps &&
                                   finalChecks.onCompleteCalled && finalChecks.hasLocalStorage &&
                                   finalChecks.bktUsed && finalChecks.srsUsed && finalChecks.masteryStored &&
                                   finalChecks.audioUsed && finalChecks.speechUsed &&
                                   finalChecks.hasHintBubble && finalChecks.hasConfetti &&
                                   finalChecks.hasSuccessBanner && finalChecks.hasSparkleBurst &&
                                   finalChecks.hasDiscoveryPhase && finalChecks.hasNarrativeScenario &&
                                   finalChecks.hasExplorationSteps && finalChecks.hasPredictionQuestions &&
                                   finalChecks.hasMultiplePredictions && finalChecks.hasMultipleObservations &&
                                   finalChecks.hasVisualFeedback && finalChecks.hasShakeAnimation &&
                                   finalChecks.hasClickToReveal &&
                                   finalChecks.hasReflection && finalChecks.hasMotivationalFeedback &&
                                   finalChecks.hasMisconceptionTracking && finalChecks.hasMultiRepresentation &&
                                   finalChecks.hasSrsVisibility && finalChecks.hasAccessibility &&
                                   finalChecks.hasObservationQuestions && finalChecks.hasSandboxPhase &&
                                   finalChecks.hasRealTimeSliders && finalChecks.hasRealWorldActivity &&
                                   finalChecks.hasEscalatingHints && finalChecks.hasAnswerRevealed &&
                                   finalChecks.hasNextChallenge && finalChecks.hasBktRef &&
                                   finalChecks.hasNepCompetency && finalChecks.hasCompetencyLevels &&
                                   finalChecks.nonMcqCount >= 1 &&
                                   finalChecks.nodesCovered === finalChecks.nodesTotal &&
                                   finalChecks.lineCount >= 2000 &&
                                   finalChecks.motionCount >= 60 &&
                                   finalChecks.useCallbackCount >= 12 &&
                                   finalTscErrors.length === 0;
              console.log(`${tag} 2ND FIX: ${finalSuccess ? 'SUCCESS' : 'STILL BROKEN'} (tsc: ${finalTscErrors.length} errors, lines: ${finalChecks.lineCount}, motion: ${finalChecks.motionCount}, callbacks: ${finalChecks.useCallbackCount})`);
              if (finalSuccess || finalTscErrors.length < fixedTscErrors.length) {
                code = fixedCode2;
                checks = finalChecks;
                success = finalSuccess;
              }
            }
          } catch (e2) {
            console.log(`${tag} 2nd fix failed: ${e2.message}`);
          }
        }
      } else {
        console.log(`${tag} Fix response too short, keeping original`);
      }
    } catch (e) {
      console.log(`${tag} Fix pass failed: ${e.message} — keeping original code`);
    }
  }

  return {
    id: template.id,
    success,
    checks,
    modelUsed,
    usage,
    class: template.class,
    subject: template.subject,
    stream: template.stream,
  };
}

// ─── Worker pool (10 parallel workers) ────────────────────────
async function runWorkers(templates) {
  const results = [];
  let nextIdx = 0;
  let completed = 0;
  const total = templates.length;

  async function worker(workerId) {
    while (nextIdx < templates.length) {
      const idx = nextIdx++;
      const template = templates[idx];
      const result = await processTemplate(template, workerId);
      results.push(result);
      completed++;
      const successCount = results.filter(r => r.success).length;
      console.log(`  [PROGRESS] ${completed}/${total} done — ${successCount} success\n`);

      // Save progress after each template (for crash recovery)
      const progressFile = path.join(__dirname, 'opus_c6_12_progress.json');
      const startIdxVal = parseInt(process.argv[2] || '0', 10);
      fs.writeFileSync(progressFile, JSON.stringify({
        lastRun: new Date().toISOString(),
        nextStartIdx: startIdxVal + completed,
        totalTemplates: PLAN.length,
        completed: startIdxVal + completed,
        successCount,
        failedCount: completed - successCount,
        lastTemplateId: result.id,
        lastSuccess: result.success,
      }, null, 2));
    }
  }

  const workers = [];
  for (let i = 1; i <= Math.min(NUM_WORKERS, templates.length); i++) {
    workers.push(worker(i));
  }
  await Promise.all(workers);
  return results;
}

// ─── Countdown timer ──────────────────────────────────────────
function startCountdown(ms) {
  return new Promise((resolve) => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, ms - elapsed);
      const mins = Math.floor(remaining / 60000);
      const secs = Math.floor((remaining % 60000) / 1000);
      process.stdout.write(`\r  Auto-start in ${mins}m ${secs.toString().padStart(2, '0')}s...   `);
      if (remaining <= 0) {
        clearInterval(interval);
        process.stdout.write('\r' + ' '.repeat(50) + '\r');
        resolve();
      }
    }, 1000);
  });
}

// ─── Main ─────────────────────────────────────────────────────
async function main() {
  const startIdx = parseInt(process.argv[2] || '0', 10);
  const endIdx = parseInt(process.argv[3] || String(PLAN.length), 10);
  const startNow = process.argv.includes('--now');

  const templates = PLAN.slice(startIdx, Math.min(endIdx, PLAN.length));

  console.log(`\n=== OPUS C6-C12 PIPELINE ===`);
  console.log(`API: https://${OPUS_API_HOST}`);
  console.log(`Model: ${PRIMARY_MODEL} (Opus only, no fallback)`);
  console.log(`Keys: ${OPUS_API_KEYS.length} (round-robin)`);
  console.log(`Workers: ${NUM_WORKERS} (parallel response processing)`);
  console.log(`Rate limit: ${RPM_LIMIT} RPM (1 req/${REQUEST_GAP_MS}ms)`);
  console.log(`Max tokens: ${MAX_TOKENS} (thinking: ${THINKING_BUDGET}, code: ${MAX_TOKENS - THINKING_BUDGET})`);
  console.log(`Fix pass: ${ENABLE_FIX_PASS ? 'ENABLED' : 'DISABLED'}`);
  console.log(`Templates: ${templates.length} (indices ${startIdx}-${Math.min(endIdx, PLAN.length) - 1})`);
  console.log(`Output: ${OUTPUT_DIR}`);
  console.log('');

  // Auto-start timer
  if (!startNow) {
    console.log(`Waiting ${AUTO_START_DELAY_MS / 60000} minutes for quota to reset...`);
    console.log(`(Run with --now to skip the timer)\n`);
    await startCountdown(AUTO_START_DELAY_MS);
    console.log('Quota wait period complete. Starting pipeline!\n');
  } else {
    console.log('Starting immediately (--now flag)\n');
  }

  // Run pipeline
  const startTime = Date.now();
  const results = await runWorkers(templates);
  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);

  // Summary
  const succeeded = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;
  const totalInputTokens = results.filter(r => r.usage).reduce((a, r) => a + (r.usage?.input_tokens || 0), 0);
  const totalOutputTokens = results.filter(r => r.usage).reduce((a, r) => a + (r.usage?.output_tokens || 0), 0);
  const avgLines = results.filter(r => r.checks).reduce((a, r) => a + r.checks.lineCount, 0) / (results.filter(r => r.checks).length || 1);

  console.log('\n=== SUMMARY ===');
  console.log(`Time: ${Math.round(elapsed/60)}m ${Math.round(elapsed%60)}s`);
  console.log(`Succeeded: ${succeeded}/${results.length}`);
  console.log(`Failed: ${failed}/${results.length}`);
  console.log(`Avg line count: ${avgLines.toFixed(0)}`);
  console.log(`Total input tokens: ${totalInputTokens.toLocaleString()}`);
  console.log(`Total output tokens: ${totalOutputTokens.toLocaleString()}`);
  console.log(`Total tokens: ${(totalInputTokens + totalOutputTokens).toLocaleString()}`);

  if (succeeded > 0) {
    console.log('\nGenerated files:');
    results.filter(r => r.success).forEach(r =>
      console.log(`  ${r.id}: ${r.checks.lineCount} lines, ${r.checks.svgCount} SVG, ${r.checks.canvasCount} Canvas, ${r.checks.challengeCount} challenges, ${r.checks.nonMcqCount} non-MCQ, ${r.checks.motionCount} motion, ${r.checks.nodesCovered}/${r.checks.nodesTotal} nodes (${r.modelUsed})`)
    );
  }

  if (failed > 0) {
    console.log('\nFailed:');
    results.filter(r => !r.success).forEach(r =>
      console.log(`  ${r.id}: ${r.error || `checks failed`}`)
    );
  }

  // Save log
  const logFile = path.join(__dirname, `opus_c6_12_pipeline_log_${Date.now()}.json`);
  fs.writeFileSync(logFile, JSON.stringify({
    api: OPUS_API_HOST,
    model: PRIMARY_MODEL,
    startIdx, endIdx,
    elapsed,
    succeeded, failed,
    totalInputTokens, totalOutputTokens,
    results,
  }, null, 2));
  console.log(`\nLog: ${logFile}`);

  // Save progress
  const progressFile = path.join(__dirname, 'opus_c6_12_progress.json');
  const nextIdx = startIdx + templates.length;
  fs.writeFileSync(progressFile, JSON.stringify({
    lastRun: new Date().toISOString(),
    nextStartIdx: nextIdx,
    totalTemplates: PLAN.length,
    completed: nextIdx,
    successCount: succeeded,
    totalInputTokens,
    totalOutputTokens,
  }, null, 2));
  console.log(`Progress: ${progressFile} (next start: ${nextIdx})`);
}

// Export helpers for reuse by the Gemini pipeline (gen-templates-gemini.js)
// main() is only invoked when this file is run directly, not when required.
module.exports = {
  buildPrompt,
  extractCode,
  runRealChecks,
  getTscErrors,
  buildFixPrompt,
  backupFile,
  loadEnrichmentForClassSubject,
  getEnrichmentForNodes,
  getSubjectVisuals,
  PLAN,
  OUTPUT_DIR,
  BACKUP_DIR,
  FRONTEND_DIR,
  TSC_CMD,
};

if (require.main === module) {
  main().catch(e => { console.error('FATAL:', e); process.exit(1); });
}
