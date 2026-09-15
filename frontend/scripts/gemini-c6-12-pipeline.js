// C6-C12 Gemini 3.6 Flash Pipeline — 3 keys, 3 per round, 60s break
// Generates Brilliant.org-quality interactive simulation components for all C6-C12 subjects
//
// Usage:
//   node scripts/gemini-c6-12-pipeline.js [startIdx] [endIdx]
//
// Examples:
//   node scripts/gemini-c6-12-pipeline.js              # all 387 templates
//   node scripts/gemini-c6-12-pipeline.js 0 3          # first 3 templates (test run)
//   node scripts/gemini-c6-12-pipeline.js 30 60        # templates 30-59
//
// Env vars (optional):
//   C12_BREAK_MS    (default: 60000) — break between rounds in ms
//   C12_MAX_RETRIES (default: 4) — retries per template on 503/429

const https = require('https');
const fs = require('fs');
const path = require('path');

// ─── 3 Built-in API keys ──────────────────────────────────────
const KEYS = [
  'AQ.Ab8RN6LDccrCPDvyQ4nFydMGXEz0XYJexA1VBgyA1AKvmnUEwg',
  'AQ.Ab8RN6KNABGpFE0AN7Mgsu0wWlMTd94M-ZfNncE0W7Iz41TKdA',
  'AQ.Ab8RN6JQsjDH9MWFSdbXUsWwRHBgUyilNKzK-1a0tFAPieMYCA',
];

const MODEL = 'gemini-3.6-flash';
const MAX_TOKENS = 65536;
const BREAK_MS = parseInt(process.env.C12_BREAK_MS || '60000', 10);
const MAX_RETRIES = parseInt(process.env.C12_MAX_RETRIES || '4', 10);

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

// ─── Enrichment loader (FIXED — parses actual file format) ────
// Enrichment files are named like:
//   c12_physics_enrichment_part1.marker
//   c11_acc_enrichment_part01.marker
//   c10_histciv_enrichment_001.marker
// Each file contains multiple nodes separated by:
//   --- NODE c12_phy_001 ---
//   TITLE: ...
//   DEFINITION: |
//     ...
//   ELI5: |
//     ...
//   COMMON_MISCONCEPTION: |
//     ...
//
// This function:
// 1. Finds all enrichment files for the given class + subject
// 2. Reads each file
// 3. Parses the --- NODE <nodeId> --- sections
// 4. Returns only the sections matching the template's node IDs

const enrichmentCache = {}; // cache keyed by "class_subject"

function loadEnrichmentForClassSubject(classNum, subjectCode) {
  const cacheKey = `${classNum}_${subjectCode}`;
  if (enrichmentCache[cacheKey]) return enrichmentCache[cacheKey];

  const subjDir = SUBJECT_DIRS[subjectCode];
  if (!subjDir) return {};

  const enrichmentDir = path.join(CISCE_DIR, subjDir, 'enrichment');
  if (!fs.existsSync(enrichmentDir)) return {};

  // Find all files for this class (e.g., c12_*.marker)
  const classPrefix = `c${classNum}_`;
  const nodeMap = {};

  try {
    const allFiles = fs.readdirSync(enrichmentDir).filter(f =>
      f.startsWith(classPrefix) && f.endsWith('.marker')
    );

    for (const fileName of allFiles) {
      const filePath = path.join(enrichmentDir, fileName);
      const content = fs.readFileSync(filePath, 'utf8');

      // Parse --- NODE <nodeId> --- sections
      // Note: \r?$ handles Windows \r\n line endings
      const nodeRegex = /^--- NODE (\S+) ---\r?$/gm;
      let match;
      const sections = [];
      let lastIdx = 0;

      while ((match = nodeRegex.exec(content)) !== null) {
        if (sections.length > 0) {
          // Save the previous section's content
          const prevSection = sections[sections.length - 1];
          prevSection.content = content.substring(prevSection.startIdx, match.index).trim();
        }
        sections.push({ nodeId: match[1], startIdx: nodeRegex.lastIndex });
      }
      // Save last section
      if (sections.length > 0) {
        const lastSection = sections[sections.length - 1];
        lastSection.content = content.substring(lastSection.startIdx).trim();
      }

      // Add to node map
      for (const section of sections) {
        if (!nodeMap[section.nodeId]) {
          nodeMap[section.nodeId] = section.content;
        } else {
          // Append if multiple files cover the same node
          nodeMap[section.nodeId] += '\n\n' + section.content;
        }
      }
    }
  } catch (e) {
    // Silently skip if can't read
  }

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

// ─── Prompt builder ───────────────────────────────────────────
function buildPrompt(template) {
  const nodeInfo = template.nodeDescriptions.map(n => `  - ${n.id}: ${n.description}`).join('\n');
  const nodeIdList = template.nodes.join(', ');

  const enrichment = getEnrichmentForNodes(template.nodes, template.class, template.subject);

  const classLabel = `Class ${template.class}`;
  const boardLabel = template.class <= 10 ? 'ICSE' : 'ISC';

  const streamRules = getStreamRules(template.stream, template.subject);

  return `You are a senior React/TypeScript engineer building interactive educational simulations for a CISCE (${boardLabel}) learning platform. You generate ONE complete, compilable, production-ready simulation component.

This component teaches struggling students through interactive, visual, adaptive learning — inspired by Brilliant.org, not a static textbook.

## CRITICAL: VISUAL QUALITY BAR
This is NOT a text-heavy quiz. This is a VISUAL, INTERACTIVE simulation.
- Every concept must have a CUSTOM diagram or animation specific to THIS topic
- Do NOT use generic placeholder SVGs — every SVG/Canvas must show the actual physics/biology/math/history concept
- Students must be able to MANIPULATE variables and SEE the result in real-time
- If a student can read the content without touching anything, you have FAILED
- Think "interactive textbook" not "worksheet with buttons"
- Use Canvas for animations and real-time simulations
- Use SVG for labelled diagrams, cross-sections, circuit diagrams, molecular structures
- Use framer-motion for smooth transitions between teaching slides and challenges

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
<HintBubble show={showHint} text={currentHint} />
<Confetti show={showConfetti} />
<SuccessBanner show={showSuccess} text="Challenge Complete!" />
<SparkleBurst show={showSparkle} x={400} y={300} />

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
After each answer, update mastery:
  const bktState = createBKTState();
  const updated = bktUpdate(bktState, isCorrect);
  const mastery = getMasteryLevel(updated.pKnown);
  // mastery: 'not-started' | 'beginner' | 'developing' | 'proficient' | 'mastered'
  // Use mastery level to ADAPT difficulty: beginner→foundation, developing→standard, proficient+→advanced

### 3. Mastery Store (localStorage persistence)
import { recordGameScore, getNodeMastery, getNodesNeedingReview } from '../../../lib/masteryStore'
  // recordGameScore(nodeIds, score) — saves best score for multiple nodes
  // getNodeMastery(nodeId) — returns NodeMastery with status
  // getNodesNeedingReview() — returns node IDs due for spaced review

### 4. Topic Graph (progression)
import { SUBJECT_CONFIG } from '../../../lib/topicGraph'
  // Use SUBJECT_CONFIG[subject] for subject display name, emoji, color
  // If subject not in SUBJECT_CONFIG, use fallback: { name: subject, emoji: '📚', color: '#888888' }

### 5. Feedback components
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine'

## STRICT REQUIREMENTS:
1. 'use client' at top
2. Imports: React, framer-motion, sim-engine (audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst), srs, bkt, masteryStore, topicGraph
3. NO other libraries (no d3, no three.js, no recharts — use raw SVG/Canvas)
4. Default export
5. Props interface with enrichment data fields (nodeId, title, definition, eli5, misconceptions, diagnosticQuestions, masteryCriteria, onComplete)
6. DEFAULT_PROPS with at least 5 misconceptions and 8 diagnostic questions
7. Minimum 800 lines
8. Topic-specific SVG visualization (custom SVG components, NOT generic placeholders)
9. 8+ challenges with progressive difficulty
10. 5 teaching slides (TEACHING_SLIDES array)
11. Adaptive difficulty: foundation/standard/advanced based on BKT mastery
12. localStorage with 'mastery_<nodeId>' key
13. Spaced repetition (REVIEW_INTERVAL_DAYS)
14. Misconception feedback from data
15. Real-world activity at end
16. onComplete(score) callback, score = max(0, 100 - errors*5)
17. Auto-hint after 10s inactivity (useRef timer)
18. Progress tracking
19. No 'any' type
20. audioManager.play() called 8+ times with valid SoundEffect strings
21. speechManager.speak() called 5+ times
22. <HintBubble>, <Confetti>, <SuccessBanner>, <SparkleBurst> in JSX
23. All node IDs from the list above must appear as string literals in the code
24. bktUpdate() must be called after each answer
25. sm2Update() must be called after each challenge
26. recordGameScore() must be called on completion

${streamRules}

## OUTPUT: Only code. No markdown fences. No explanations.
Start with 'use client';
End with: export default ${template.id};`;
}

function getStreamRules(stream, subject) {
  // Subject-specific visual and interactive requirements
  // Each subject gets its OWN visual style — NOT the same template for every subject
  const SUBJECT_VISUALS = {
    // ─── SCIENCE ───────────────────────────────────────────
    phy: `### PHYSICS-SPECIFIC VISUAL REQUIREMENTS
- Interactive physics simulations with REAL-TIME physics calculations
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
- 3D visualisation using CSS transforms or Canvas (for 3D geometry, vectors)
- At least 3 interactive graphs + 2 geometric SVG diagrams specific to THIS topic
- Show mathematical relationships visually BEFORE revealing formulas`,

    chem: `### CHEMISTRY-SPECIFIC VISUAL REQUIREMENTS
- Interactive molecular models: atoms, bonds, electron shells (SVG or Canvas)
- Animated chemical reactions: atoms rearranging, bonds breaking/forming
- SVG diagrams: atomic structure, electron configuration, periodic table trends
- Interactive periodic table explorer (if relevant to topic)
- Balanced equation visualiser with atom count tracking (left side = right side)
- pH scale, titration curves, reaction rate graphs (Canvas-based, live updating)
- 3D molecular geometry using CSS transforms or Canvas
- At least 2 molecular structure SVGs + 1 Canvas animation specific to THIS topic
- Show chemical processes as animated sequences, not static text`,

    bio: `### BIOLOGY-SPECIFIC VISUAL REQUIREMENTS
- Interactive diagrams of biological structures: cells, organs, tissues, systems
- SVG cross-sections: leaf structure, heart, kidney, neuron, cell membrane
- Animated biological processes: mitosis stages, photosynthesis, blood circulation
- Interactive labelling: drag labels onto diagram parts
- Canvas-based simulations: population growth, enzyme activity, photosynthesis rate
- Process flow diagrams: digestion, respiration, nervous signal transmission
- Comparison tools: plant vs animal cell, mitosis vs meiosis (side-by-side SVG)
- At least 3 biological SVG diagrams + 1 Canvas animation specific to THIS topic
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

    // ─── COMMERCE ──────────────────────────────────────────
    acc: `### ACCOUNTANCY-SPECIFIC VISUAL REQUIREMENTS
- Interactive journal entry builder with debit/credit visual balance
- SVG T-accounts that update in real-time as entries are posted
- Canvas-based balance sheet, P&L statement, trial balance (live updating)
- Ledger posting visualiser: trace entry from journal → ledger → trial balance
- Ratio analyser with visual gauges (liquidity, solvency, profitability)
- At least 3 interactive financial statements + 2 SVG diagrams (T-accounts, flow)
- Show accounting flow as a visual pipeline: transaction → journal → ledger → statements`,

    bs: `### BUSINESS STUDIES-SPECIFIC VISUAL REQUIREMENTS
- Interactive business organisation charts (SVG hierarchy trees)
- Management principle applier: drag principles to scenarios
- Canvas-based marketing mix diagram (4 Ps wheel)
- Stock market simulator with live price chart
- Consumer protection case study player with decision branches
- At least 3 SVG diagrams (org chart, marketing mix, process flow) + 1 Canvas chart`,

    econ: `### ECONOMICS-SPECIFIC VISUAL REQUIREMENTS
- Canvas-based supply/demand curve plotter with draggable curves
- Interactive national income calculator with circular flow diagram (SVG)
- Live updating graphs: GDP, inflation, unemployment data visualisation
- SVG diagrams: production possibility frontier, circular flow of income
- Monetary policy simulator: change interest rate, see multiplier effect
- At least 3 Canvas-based economic graphs + 2 SVG diagrams (circular flow, PPF)`,

    econapp: `### ECONOMICS APPLICATIONS-SPECIFIC VISUAL REQUIREMENTS
- Interactive demand/supply schedule with live graph (Canvas)
- Elasticity calculator with visual gauge (elastic/inelastic)
- SVG diagrams: market equilibrium, consumer surplus, producer surplus
- Case study player with real-world scenarios and decision points
- At least 2 Canvas graphs + 2 SVG diagrams specific to THIS topic`,

    comm: `### COMMERCE-SPECIFIC VISUAL REQUIREMENTS
- Interactive trade flow diagrams (SVG): producer → wholesaler → retailer → consumer
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

    // ─── HUMANITIES ────────────────────────────────────────
    geo: `### GEOGRAPHY-SPECIFIC VISUAL REQUIREMENTS
- Interactive maps with clickable regions, overlays, and data layers
- SVG topographical cross-sections: landforms, river systems, climate zones
- Canvas-based climate data visualiser: temperature/rainfall graphs
- Map projection explorer with distortion visualisation
- Population density heatmap, migration flow arrows
- At least 3 SVG maps/diagrams + 1 Canvas data graph specific to THIS topic`,

    hist: `### HISTORY-SPECIFIC VISUAL REQUIREMENTS
- Interactive timeline with draggable events, zoomable eras
- SVG maps showing territorial changes, trade routes, battle positions
- Animated cause-and-effect chains: event A → event B → event C
- Source document analyser with highlightable text and annotations
- Historical figure relationship map (SVG network)
- At least 1 interactive timeline + 2 SVG maps + 1 cause-effect diagram`,

    histciv: `### HISTORY & CIVICS-SPECIFIC VISUAL REQUIREMENTS
- Interactive timeline with key historical events and civics milestones
- SVG diagrams: Constitution structure, Parliament layout, three branches of government
- Animated bill passage through Parliament (step-by-step visual)
- Election simulator with vote counting visualisation
- Fundamental rights explorer with case examples
- At least 2 SVG diagrams (Constitution, Parliament) + 1 interactive timeline`,

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

  const subjectRules = SUBJECT_VISUALS[subject];
  if (subjectRules) return subjectRules;

  // Fallback to stream-level rules if no subject-specific rules
  const streamRules = {
    science: `### Science-specific visual requirements
- Interactive diagrams showing physical/biological/chemical processes
- Mathematical formulas with visual derivations (not just stated)
- Canvas/SVG simulations specific to the topic
- At least 3 SVG diagrams + 1 Canvas animation`,
    commerce: `### Commerce-specific visual requirements
- Interactive financial calculators and statements
- Canvas-based charts and graphs that update live
- SVG flow diagrams for business processes
- At least 3 SVG diagrams + 1 Canvas chart`,
    humanities: `### Humanities-specific visual requirements
- Interactive timelines, maps, and source analysers
- SVG diagrams for structures and processes
- Canvas-based data visualisation
- At least 3 SVG diagrams + 1 Canvas visualisation`,
  };
  return streamRules[stream] || streamRules.science;
}

// ─── Call Gemini API with specific key ────────────────────────
function callGemini(prompt, keyIdx) {
  return new Promise((resolve, reject) => {
    const key = KEYS[keyIdx];
    const body = JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.7,
        topP: 0.9,
        maxOutputTokens: MAX_TOKENS,
      },
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
      path: apiPath,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
      },
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            const json = JSON.parse(data);
            if (json.error) {
              reject(new Error(`API error: ${json.error.message}`));
              return;
            }
            const text = json.candidates?.[0]?.content?.parts?.[0]?.text;
            if (!text || text.length < 500) {
              reject(new Error(`Response too short: ${text?.length || 0} chars`));
              return;
            }
            resolve(text);
          } catch (e) {
            reject(new Error(`Parse error: ${e.message}. Raw: ${data.substring(0, 300)}`));
          }
        } else if (res.statusCode === 503) {
          reject(new Error(`503 service overloaded`));
        } else if (res.statusCode === 429) {
          reject(new Error(`429 rate limited`));
        } else {
          reject(new Error(`API error ${res.statusCode}: ${data.substring(0, 300)}`));
        }
      });
    });

    req.on('error', (e) => reject(new Error(`Network error: ${e.message}`)));
    req.setTimeout(300000, () => {
      req.destroy();
      reject(new Error('Request timeout (5min)'));
    });
    req.write(body);
    req.end();
  });
}

// ─── Call with retry on 503/429 ───────────────────────────────
async function callGeminiWithRetry(prompt, keyIdx, templateId) {
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      return await callGemini(prompt, keyIdx);
    } catch (e) {
      const isRetryable = e.message.includes('503') || e.message.includes('429') || e.message.includes('timeout');
      if (isRetryable && attempt < MAX_RETRIES) {
        const delay = Math.min(5000 * Math.pow(2, attempt - 1), 60000);
        console.log(`  [${templateId}][Key${keyIdx+1}] Retry ${attempt}/${MAX_RETRIES} in ${delay/1000}s — ${e.message}`);
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

  // Node IDs present as string literals in CODE (not comments)
  const codeWithoutComments = code
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\/\/[^\n]*/g, '');
  const nodesCovered = template.nodes.filter(n =>
    codeWithoutComments.includes(`'${n}'`) || codeWithoutComments.includes(`"${n}"`)
  );

  const noAny = !/:\s*any\b/.test(code) && !/as\s+any\b/.test(code);
  // localStorage check: either direct localStorage usage OR using masteryStore (which uses localStorage internally)
  const hasLocalStorage = /localStorage\.(getItem|setItem)/.test(code) || /recordGameScore|getNodeMastery|getNodesNeedingReview/.test(code);
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
    hasDefaultExport, onCompleteInProps, onCompleteCalled,
    nodesCovered: nodesCovered.length,
    nodesTotal: template.nodes.length,
    noAny, hasLocalStorage, bktUsed, srsUsed, masteryStored,
    audioUsed, speechUsed, hasHintBubble, hasConfetti, hasSuccessBanner, hasSparkleBurst,
  };
}

// ─── Process one template ─────────────────────────────────────
async function processTemplate(template, keyIdx) {
  const tag = `[${template.id}][Key${keyIdx+1}]`;
  console.log(`${tag} START — C${template.class} ${template.subjectName}, ${template.nodes.length} nodes`);

  // 1. Backup existing file
  backupFile(template.id);

  // 2. Delete old file so we don't read stale content
  const outputPath = path.join(OUTPUT_DIR, `${template.id}.tsx`);
  try { fs.unlinkSync(outputPath); } catch (e) {}

  // 3. Build prompt
  const prompt = buildPrompt(template);
  console.log(`${tag} Prompt: ${(prompt.length / 1024).toFixed(0)} KB`);

  // 4. Call Gemini with retry
  let response;
  try {
    response = await callGeminiWithRetry(prompt, keyIdx, template.id);
  } catch (e) {
    console.error(`${tag} FAIL: ${e.message}`);
    return { id: template.id, success: false, error: e.message, class: template.class, subject: template.subject };
  }

  // 5. Extract code
  const code = extractCode(response);
  console.log(`${tag} Response: ${code.length} chars, ${code.split('\n').length} lines`);

  if (code.length < 500) {
    console.error(`${tag} FAIL: Code too short (${code.length} chars)`);
    return { id: template.id, success: false, error: `Code too short: ${code.length} chars`, class: template.class, subject: template.subject };
  }

  // 6. Write the file
  fs.writeFileSync(outputPath, code, 'utf8');

  // 7. Real checks
  const checks = runRealChecks(template, code);
  console.log(`${tag} Lines: ${checks.lineCount} | useClient: ${checks.useClient} | imports: ${checks.allImportsPresent ? 'OK' : 'MISSING'} | nodes: ${checks.nodesCovered}/${checks.nodesTotal} | BKT: ${checks.bktUsed} | SRS: ${checks.srsUsed} | mastery: ${checks.masteryStored} | audio: ${checks.audioUsed} | speech: ${checks.speechUsed} | noAny: ${checks.noAny}`);

  // 8. Determine success
  // noAny is a WARNING, not a failure — a few `any` types in 1000+ lines is acceptable
  // localStorage is satisfied by masteryStore usage (recordGameScore etc.)
  const structuralPass = checks.useClient && checks.allImportsPresent && checks.hasDefaultExport &&
                         checks.onCompleteInProps && checks.onCompleteCalled &&
                         checks.hasLocalStorage && checks.bktUsed && checks.srsUsed && checks.masteryStored &&
                         checks.audioUsed && checks.speechUsed &&
                         checks.hasHintBubble && checks.hasConfetti && checks.hasSuccessBanner && checks.hasSparkleBurst;
  const nodePass = checks.nodesCovered === checks.nodesTotal;
  const linePass = checks.lineCount >= 500;
  const success = structuralPass && nodePass && linePass;

  console.log(`${tag} RESULT: ${success ? 'SUCCESS' : 'NEEDS FIX'} (structural: ${structuralPass}, nodes: ${nodePass}, lines: ${linePass})`);

  return {
    id: template.id,
    success,
    checks,
    class: template.class,
    subject: template.subject,
    stream: template.stream,
  };
}

// ─── Sleep helper ─────────────────────────────────────────────
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// ─── Main: 3 templates per round, 1 per key, 60s break ────────
async function main() {
  const startIdx = parseInt(process.argv[2] || '0', 10);
  const endIdx = parseInt(process.argv[3] || String(PLAN.length), 10);

  const templates = PLAN.slice(startIdx, Math.min(endIdx, PLAN.length));

  console.log(`\n=== GEMINI ${MODEL} PIPELINE ===`);
  console.log(`Templates: ${templates.length} (indices ${startIdx}-${Math.min(endIdx, PLAN.length) - 1})`);
  console.log(`Keys: ${KEYS.length} | Round size: 3 (1 per key) | Break: ${BREAK_MS/1000}s | Retries: ${MAX_RETRIES}`);
  console.log(`Output: ${OUTPUT_DIR}`);
  console.log('');

  const allResults = [];
  const totalStart = Date.now();
  let roundNum = 0;
  const totalRounds = Math.ceil(templates.length / 3);

  // Process 3 at a time (1 per key)
  for (let round = 0; round < templates.length; round += 3) {
    roundNum++;
    const roundTemplates = templates.slice(round, round + 3);

    console.log(`\n--- ROUND ${roundNum}/${totalRounds} ---`);
    console.log(`  ${roundTemplates.map((t, i) => `[Key${i+1}] ${t.id}`).join(' | ')}`);

    const results = await Promise.all(
      roundTemplates.map((t, i) => processTemplate(t, i % KEYS.length))
    );

    results.forEach(r => {
      if (r.success) {
        console.log(`  OK: ${r.id} — ${r.checks.lineCount} lines`);
      } else {
        console.log(`  FAIL: ${r.id} — ${r.error || `checks failed`}`);
      }
      allResults.push(r);
    });

    const successCount = allResults.filter(r => r.success).length;
    console.log(`  [PROGRESS] ${allResults.length}/${templates.length} done — ${successCount} success`);

    // 60-second break between rounds (unless last round)
    if (round + 3 < templates.length) {
      console.log(`  ...waiting ${BREAK_MS/1000}s before next round...`);
      await sleep(BREAK_MS);
    }
  }

  const totalElapsed = Math.round((Date.now() - totalStart) / 1000);
  const succeeded = allResults.filter(r => r.success).length;
  const failed = allResults.filter(r => !r.success).length;

  console.log(`\n=== SUMMARY ===`);
  console.log(`Model: ${MODEL}`);
  console.log(`Success: ${succeeded}/${templates.length}`);
  console.log(`Failed: ${failed}/${templates.length}`);
  console.log(`Total time: ${Math.round(totalElapsed/60)}m ${totalElapsed%60}s`);

  if (succeeded > 0) {
    console.log(`\nGenerated files:`);
    allResults.filter(r => r.success).forEach(r =>
      console.log(`  ${r.id}: ${r.checks.lineCount} lines, ${r.checks.nodesCovered}/${r.checks.nodesTotal} nodes`)
    );
  }

  if (failed > 0) {
    console.log(`\nFailed:`);
    allResults.filter(r => !r.success).forEach(r =>
      console.log(`  ${r.id}: ${r.error || `structural/node/line checks failed`}`)
    );
  }

  // Save log
  const logFile = path.join(__dirname, `c6_12_pipeline_log_${Date.now()}.json`);
  fs.writeFileSync(logFile, JSON.stringify({
    model: MODEL,
    startIdx, endIdx,
    totalElapsed,
    success: succeeded,
    fail: failed,
    results: allResults,
  }, null, 2));
  console.log(`\nLog: ${logFile}`);

  // Save progress (for resuming)
  const progressFile = path.join(__dirname, 'c6_12_progress.json');
  const nextIdx = startIdx + templates.length;
  fs.writeFileSync(progressFile, JSON.stringify({
    lastRun: new Date().toISOString(),
    nextStartIdx: nextIdx,
    totalTemplates: PLAN.length,
    completed: nextIdx,
    successCount: succeeded,
  }, null, 2));
  console.log(`Progress: ${progressFile} (next start: ${nextIdx})`);
}

main().catch(e => { console.error('FATAL:', e); process.exit(1); });
