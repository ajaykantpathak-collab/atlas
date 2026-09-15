/**
 * generate-c68-templates.js
 *
 * Generates the 22 reusable simulation TEMPLATES (not per-node files)
 * using Gemini 3.5 Flash.
 *
 * - 2 Gemini API keys, alternating
 * - 2 templates per batch (parallel calls, one per key)
 * - 30 second delay between batches
 * - Quality check after each template
 * - Skips templates that already exist
 *
 * Usage:
 *   node scripts/generate-c68-templates.js                    (all 22)
 *   node scripts/generate-c68-templates.js --limit=4          (first 4)
 *   node scripts/generate-c68-templates.js --only=circuit     (specific template)
 */

const fs = require('fs');
const https = require('https');
const path = require('path');

// ─── Keys ────────────────────────────────────────────────────

const GEMINI_KEYS = [
  'AQ.Ab8RN6LDccrCPDvyQ4nFydMGXEz0XYJexA1VBgyA1AKvmnUEwg',
  'AQ.Ab8RN6KNABGpFE0AN7Mgsu0wWlMTd94M-ZfNncE0W7Iz41TKdA',
];

const MODEL = 'gemini-3.5-flash';
const API_HOST = 'generativelanguage.googleapis.com';
const MAX_OUTPUT_TOKENS = 65536;
const TEMPERATURE = 0.7;
const BATCH_DELAY_MS = 30000;
const REQUEST_TIMEOUT_MS = 180000;

const OUTPUT_DIR = path.join(__dirname, '..', 'components', 'simulations', 'c6_8');
const REFERENCE_FILE = path.join(OUTPUT_DIR, 'ReferenceExample.tsx');

// ─── 22 Template Definitions ─────────────────────────────────

const TEMPLATES = [
  // Template 1 and 2 are already built by hand — skip them
  // { key: 'MeasurementLab', name: 'Measurement Lab', status: 'done' },
  // { key: 'MotionSimulation', name: 'Motion Cart', status: 'done' },

  {
    key: 'LightRaySimulation',
    name: 'Light Ray Tracer',
    description: 'Light source, mirrors (plane/concave/convex), lenses, prism. Drag light source and mirror, watch rays bend in real-time. Shows angle of incidence, angle of reflection, focal point. Animated light rays with glow effect.',
    nodes: 'C6: light, reflection, image formation. C7: concave/convex mirrors, lenses. C8: refraction, dispersion, curved mirrors.',
    controls: 'Slider for mirror angle, drag light source position, dropdown for mirror type (plane/concave/convex), slider for lens focal length',
    readouts: 'Angle of incidence (degrees), Angle of reflection (degrees), Focal length (cm), Image distance (cm)',
    challenges: '1) What is the angle of reflection if incidence is 30°? 2) Where does the image form for a concave mirror with object at 2F? 3) Predict what happens when light passes from air to water.',
  },
  {
    key: 'CircuitBuilderSimulation',
    name: 'Circuit Builder',
    description: 'Drag batteries, bulbs, switches, wires onto a board. Connect them. Flip switch to see current flow. Animated dots flowing along wires show current direction. Bulb glows when circuit is complete. Ammeter and voltmeter show readings.',
    nodes: 'C6: electric circuit, open/closed circuits. C7: current, ammeter, voltmeter, Ohms law. C8: household wiring, fuses, safety.',
    controls: 'Drag components from palette onto board, click to connect wires, click switch to open/close, slider for battery voltage',
    readouts: 'Voltage (V), Current (A), Resistance (Ω), Power (W)',
    challenges: '1) Build a circuit with one battery and one bulb that lights up. 2) What happens to current if you double the voltage? 3) Calculate resistance using Ohms law.',
  },
  {
    key: 'MatterStatesSimulation',
    name: 'Matter States Simulator',
    description: 'Particles in a box. Slider controls temperature. As temperature increases, particles vibrate faster, spread out, change from solid to liquid to gas. Shows particle arrangement, spacing, and movement speed. Phase change animation at melting/boiling points.',
    nodes: 'C7: physical/particle nature of matter, solid/liquid/gas states, interconversion. C8: kinetic theory, three states, energy content, melting, boiling, evaporation, condensation, sublimation.',
    controls: 'Temperature slider (0-2000K), substance selector (water/iron/oxygen), heat/cool buttons',
    readouts: 'Temperature (K/°C), Particle speed (m/s), State (solid/liquid/gas), Kinetic energy (J)',
    challenges: '1) At what temperature does water melt? 2) What happens to particles when you heat a solid? 3) Explain why evaporation is a surface phenomenon.',
  },
  {
    key: 'SoundWaveSimulation',
    name: 'Sound Wave Visualizer',
    description: 'Animated sine wave showing sound wave. Sliders for amplitude and frequency. Wave oscillates in real-time. Shows wavelength, period, pitch relationship. Visual representation of loudness (amplitude) vs pitch (frequency). Tuning fork vibration animation.',
    nodes: 'C6: sound as energy, vibration, propagation, loudness, pitch. C7: reflection, absorption, echo, reverberation. C8: pitch and frequency, loudness and amplitude (decibels).',
    controls: 'Amplitude slider (0-100), Frequency slider (20-20000 Hz), medium selector (air/water/solid), play/pause button',
    readouts: 'Amplitude (dB), Frequency (Hz), Wavelength (m), Period (ms), Pitch (low/high)',
    challenges: '1) What happens to pitch when you increase frequency? 2) What is the relationship between amplitude and loudness? 3) Why does sound travel faster in solids than in air?',
  },
  {
    key: 'HeatTransferSimulation',
    name: 'Heat Transfer Lab',
    description: 'Three modes: conduction (heat flowing through a metal rod), convection (hot water circulating), radiation (heat waves from a fire). Animated particles showing heat movement. Temperature gradient color mapping. Slider for heat source temperature.',
    nodes: 'C6: heat as energy, temperature, thermal expansion, change of state. C7: conduction, convection, radiation. C8: linear/area/volume expansion, boiling vs evaporation.',
    controls: 'Mode selector (conduction/convection/radiation), heat source temperature slider, material selector (copper/iron/glass)',
    readouts: 'Temperature at point A (°C), Temperature at point B (°C), Heat flow rate (W), Expansion (mm)',
    challenges: '1) Which material conducts heat best? 2) Explain how convection currents form. 3) Why does a black surface absorb more radiant heat?',
  },
  {
    key: 'MagnetExplorerSimulation',
    name: 'Magnet Explorer',
    description: 'Two magnets that can be dragged. Show magnetic field lines (animated). North and south poles labeled. When like poles face each other, magnets push apart (repulsion animation). When opposite poles face, they attract. Compass needle rotates to align with field.',
    nodes: 'C6: magnet and poles, attraction/repulsion, magnetic compass. C7: magnetic effect of electric current.',
    controls: 'Drag magnets to position them, rotate magnet buttons, toggle field lines on/off, slider for magnet strength',
    readouts: 'Distance between magnets (cm), Force (attract/repel), Field strength (mT), Compass direction (N/S/E/W)',
    challenges: '1) What happens when two north poles face each other? 2) How does a compass find direction? 3) What happens to the field when you increase magnet strength?',
  },
  {
    key: 'DensityTankSimulation',
    name: 'Density Tank',
    description: 'A tank of water. Drag objects (wood, iron, ice, cork, stone) into the tank. Objects float or sink based on density. Water displacement shown. Density readout for each object. Buoyant force arrow. Relative density comparison.',
    nodes: 'C7: density, relative density, floating/sinking, buoyancy, upthrust. C8: density of irregular solids, floatation.',
    controls: 'Drag objects into tank, object selector, slider for liquid density (water/oil/mercury)',
    readouts: 'Object density (g/mL), Liquid density (g/mL), Displaced volume (mL), Buoyant force (N), Float/Sink status',
    challenges: '1) Why does iron sink but wood floats? 2) What happens if you change the liquid to mercury? 3) Calculate the density of an object that displaces 20 mL of water.',
  },
  {
    key: 'EnergyLeverSimulation',
    name: 'Energy & Lever Lab',
    description: 'Two modes: energy conversion (ball rolling down a ramp showing PE to KE conversion with animated energy bars) and lever (adjustable fulcrum position, weights on both sides, mechanical advantage calculation). Animated energy flow diagrams.',
    nodes: 'C6: energy, kinetic, potential. C7: conservation of energy, energy conversion, levers, mechanical advantage. C8: work, KE/PE calculation, power, energy transformation.',
    controls: 'Mode toggle (energy/lever), ramp height slider, ball mass slider, lever fulcrum position slider, weight slider',
    readouts: 'Potential energy (J), Kinetic energy (J), Total energy (J), Mechanical advantage, Effort force (N), Load force (N)',
    challenges: '1) What happens to KE when you double the height? 2) Calculate MA for a lever with fulcrum at 1/4 position. 3) Explain energy conservation using the ramp.',
  },
  {
    key: 'AtomBuilderSimulation',
    name: 'Atom Builder',
    description: 'Build atoms by dragging protons, neutrons, and electrons. Nucleus forms in center. Electrons orbit in shells (animated orbiting). Element name and symbol update automatically. Atomic number and mass number shown. Highlights when you build a stable atom.',
    nodes: 'C6 Chem: matter, elements, compounds. C7 Chem: atomic structure, subatomic particles, atomic number, mass number.',
    controls: 'Add/remove proton buttons, add/remove neutron buttons, add/remove electron buttons, element selector dropdown',
    readouts: 'Atomic number, Mass number, Element name, Element symbol, Charge (neutral/ion), Electron configuration',
    challenges: '1) Build a carbon atom (atomic number 6). 2) What is the mass number of an atom with 8 protons and 8 neutrons? 3) What happens if you add an extra electron to a neutral atom?',
  },
  {
    key: 'MixtureSeparatorSimulation',
    name: 'Mixture Separator',
    description: 'Different separation techniques: filtration (pour mixture through filter paper), distillation (heat mixture, condense vapor), evaporation (heat salt water, salt remains), magnetic separation (drag magnet over mixture). Animated process for each technique.',
    nodes: 'C6 Chem: mixtures, separation techniques. C7 Chem: (reinforcement).',
    controls: 'Technique selector (filtration/distillation/evaporation/magnetic), heat slider, pour button, drag magnet',
    readouts: 'Temperature (°C), Volume collected (mL), Purity (%), Time elapsed (s)',
    challenges: '1) Which technique separates sand from water? 2) How does distillation differ from evaporation? 3) Design a method to separate iron filings from sand.',
  },
  {
    key: 'ReactionViewerSimulation',
    name: 'Reaction Viewer',
    description: 'Show physical changes (ice melting, water boiling) vs chemical changes (burning, rusting). Before and after view. Drag reactants, watch reaction animation, see products form. Color changes, gas production, temperature change indicators.',
    nodes: 'C6 Chem: physical changes, chemical changes, elements, compounds.',
    controls: 'Reaction selector (melting/burning/rusting/dissolving), temperature slider, add reactant button, trigger reaction button',
    readouts: 'Temperature (°C), Reaction type (physical/chemical), Color change (yes/no), Gas produced (yes/no), Products formed',
    challenges: '1) Is melting ice a physical or chemical change? Why? 2) What tells you a chemical reaction has occurred? 3) Compare burning paper with tearing paper.',
  },
  {
    key: 'DiagramExplorerSimulation',
    name: 'Interactive Diagram Explorer',
    description: 'A labeled biological/geographical diagram (plant cell, animal cell, human heart, leaf cross-section, water cycle, etc.) where clicking any part highlights it and shows a description. Parts pulse on hover. Searchable label list. Zoom and pan.',
    nodes: 'C6 Bio: all topics. C7 Bio: all topics. C8 Bio: all topics. C6-8 Geo: landforms, water bodies, atmosphere layers.',
    controls: 'Click parts to highlight, hover to see label, diagram selector dropdown, zoom slider, pan by dragging',
    readouts: 'Selected part name, Part function description, Diagram title, Number of parts',
    challenges: '1) Click and identify the nucleus. What does it do? 2) Which part controls what enters and leaves the cell? 3) Compare plant and animal cell differences.',
  },
  {
    key: 'ClassificationSorterSimulation',
    name: 'Classification Sorter',
    description: 'Drag and drop items into categories. Example: sort animals into vertebrates/invertebrates, or plants into monocot/dicot. Items appear as cards with names and simple SVG icons. Correct placement shows green, wrong shows red with correction.',
    nodes: 'C6 Bio: classification topics. C7 Bio: classification. C6-8 Bio: any sorting/categorization topic.',
    controls: 'Drag items into category boxes, category selector, reset button, next round button',
    readouts: 'Correct count, Wrong count, Score, Current category',
    challenges: '1) Sort these 5 animals into vertebrate or invertebrate. 2) Which category does a bat belong to? 3) Explain why a whale is a mammal not a fish.',
  },
  {
    key: 'NumberLineSimulation',
    name: 'Number Line & Algebra Solver',
    description: 'Interactive number line. Drag points to represent numbers. Step-by-step equation solver showing each transformation. Visual representation of operations (adding moves right, subtracting moves left). Works for integers, fractions, and simple equations.',
    nodes: 'C6 Maths: integers, number line, fractions. C7 Maths: algebra, equations, inequalities. C8 Maths: rational numbers, exponents, sets.',
    controls: 'Number type selector (integer/fraction/decimal), drag points on number line, input equation, step-by-step solve button',
    readouts: 'Current value, Operation performed, Step number, Result, Number line range',
    challenges: '1) Place -5 on the number line. 2) Solve 2x + 3 = 11 step by step. 3) Show that between any two rational numbers there is another rational number.',
  },
  {
    key: 'GeometryConstructorSimulation',
    name: 'Geometry Constructor',
    description: 'Interactive canvas for drawing shapes. Drag vertices to create triangles, rectangles, circles. Live measurement of angles, sides, area, perimeter. Protractor and ruler overlay. Symmetry checker. Congruence verifier.',
    nodes: 'C6 Maths: shapes, angles. C7 Maths: triangles, parallel lines, congruence, construction, area. C8 Maths: quadrilaterals, circles, 3D shapes, Euler relation.',
    controls: 'Shape selector (triangle/rectangle/circle/polygon), drag vertices, protractor toggle, ruler toggle, grid snap toggle',
    readouts: 'Side lengths (cm), Angles (degrees), Area (cm²), Perimeter (cm), Number of vertices/edges/faces',
    challenges: '1) Draw a triangle with angles 60°, 60°, 60°. What type is it? 2) Calculate the area of a rectangle with sides 5 and 8. 3) Verify Euler relation for a cube.',
  },
  {
    key: 'GraphPlotterSimulation',
    name: 'Graph & Data Plotter',
    description: 'Enter data points, choose graph type (bar/line/pie/scatter), see graph render in real-time. Calculate mean, median, mode. Adjust data and watch graph update. Cartesian plane for plotting points. Bar chart for categorical data.',
    nodes: 'C6 Maths: data handling. C7 Maths: bar graphs, mean/median/mode. C8 Maths: grouped data, pie charts, Cartesian plane, linear graphs.',
    controls: 'Graph type selector, data entry table, add/remove data points, axis range sliders, color picker',
    readouts: 'Mean, Median, Mode, Range, Number of data points, Graph type',
    challenges: '1) Enter these 5 test scores and find the mean. 2) Create a pie chart showing these percentages. 3) Plot the line y = 2x + 1 on the Cartesian plane.',
  },
  {
    key: 'ProbabilityLabSimulation',
    name: 'Probability Lab',
    description: 'Flip coins, roll dice, draw cards — all animated. See results accumulate in real-time. Experimental probability converges to theoretical probability as trials increase. Bar chart of outcomes. Frequency table.',
    nodes: 'C7 Maths: probability introduction. C8 Maths: probability with coins, dice, chance events.',
    controls: 'Experiment selector (coin/dice/cards/spinner), number of trials slider, flip/roll button, reset button, auto-run toggle',
    readouts: 'Trials completed, Heads/Tails count, Experimental probability, Theoretical probability, Frequency table',
    challenges: '1) Flip a coin 100 times. Does it match 50%? 2) What is the probability of rolling a 6 on a dice? Test it. 3) Why does experimental probability approach theoretical with more trials?',
  },
  {
    key: 'MapExplorerSimulation',
    name: 'Map Explorer',
    description: 'Interactive map with clickable regions. Cardinal direction compass. Scale bar. Click continents, countries, landforms to see information. Draw routes. Measure distances using scale. Layer toggle (physical/political/climate).',
    nodes: 'C6 Geo: maps, directions, scale, landforms, continents. C7 Geo: topographical maps, atmosphere, continents. C8 Geo: Asia, India, population, disasters.',
    controls: 'Click regions to explore, compass rotation, scale slider, layer toggle (physical/political), search box',
    readouts: 'Selected region, Latitude/Longitude, Distance (km), Direction (N/S/E/W), Scale ratio',
    challenges: '1) Find North America and state its boundaries. 2) Measure the distance between two cities using the scale. 3) Which direction is India from Africa?',
  },
  {
    key: 'CodeEditorSimulation',
    name: 'Code Editor',
    description: 'Simple code editor with syntax highlighting. Write HTML/CSS/Java. Live preview pane shows rendered output. Line numbers. Error highlighting. Step-through execution for Java. Example code snippets to start from.',
    nodes: 'C6 CS: HTML, Scratch. C7 CS: HTML tables/forms, Scratch. C8 CS: Java, CSS, app development.',
    controls: 'Language selector (HTML/CSS/Java), code textarea, run button, reset button, example loader, line numbers',
    readouts: 'Lines of code, Error count, Output status, Language, Execution time',
    challenges: '1) Write HTML to create a heading and a paragraph. 2) Add a red background using CSS. 3) Write a Java program to print Hello World.',
  },
  {
    key: 'TimelineBuilderSimulation',
    name: 'Timeline Builder',
    description: 'Drag historical events onto a timeline in chronological order. Events appear as cards with date, title, and description. Correct placement locks in green. Wrong placement bounces back with a hint. Timeline scrolls horizontally. Era markers shown.',
    nodes: 'C6 HistCiv: all history topics. C7 HistCiv: all history topics. C8 HistCiv: all history topics.',
    controls: 'Drag event cards onto timeline, scroll timeline, era selector, reset button, hint button',
    readouts: 'Events placed, Events correct, Events remaining, Current era, Score',
    challenges: '1) Place these 5 events in order. 2) Which event happened first? 3) Explain why the Permanent Settlement came after the Battle of Plassey.',
  },
  {
    key: 'ConceptMapSimulation',
    name: 'Concept Map',
    description: 'Build a concept map by dragging concept nodes and connecting them with labeled arrows. Start with a central concept. Add related concepts. Draw connections. Node colors by category. Save/export. Pre-built concept maps for civics topics.',
    nodes: 'C6-8 HistCiv: civics topics (government, constitution, rights, duties). Also useful for any relationship-based topic.',
    controls: 'Drag concept nodes, draw connections between nodes, label connections, add new node button, delete button',
    readouts: 'Nodes count, Connections count, Central concept, Selected node, Map completeness',
    challenges: '1) Connect these 5 civics concepts with correct relationships. 2) What is the relationship between the Prime Minister and the Cabinet? 3) Build a concept map showing the structure of government.',
  },
];

// ─── Quality Bar ─────────────────────────────────────────────

const QUALITY_BAR = `## SIMULATION QUALITY BAR — MATCH THIS STANDARD

You are generating an INTERACTIVE SIMULATION TEMPLATE for Indian CISCE students (Class 6-8).
This is a REUSABLE TEMPLATE — it receives enrichment data as props and adapts its content.
A struggling student will interact with this to learn a concept.

### REQUIRED ELEMENTS (ALL must be present):

1. **Self-contained React + TypeScript component** (600-900 lines)
   - 'use client' at the top
   - Only imports: React hooks (useState, useEffect, useRef, useCallback) + framer-motion (motion, AnimatePresence)
   - NO other external libraries (no matter-js, three, pixi, jsxgraph, function-plot, katex, planck, etc.)
   - Exports default function component
   - Exports a props interface that accepts enrichment data (nodeId, title, definition, eli5, misconceptions, questions, etc.)

2. **Animated inline SVG diagram** (topic-specific, looks ALIVE)
   - Must draw the ACTUAL concept for this template type
   - Use <svg>, <rect>, <circle>, <line>, <path>, <text>, <defs>, <pattern>, <linearGradient>, <radialGradient>
   - SVG must be at least 400x300 pixels
   - SVG elements MUST change based on user interaction (state-driven)
   - Use <animate> elements inside SVG for continuous animation (flowing rays, orbiting electrons, pulsing glow, flowing current)
   - Use CSS keyframes via <style> tags for continuous motion (orbiting, flowing, vibrating, pulsing)
   - The simulation must look ALIVE — things move, glow, flow, vibrate. NOT static.
   - NO emoji as primary visual — use actual SVG shapes

3. **At least 3 interactive controls**
   - Sliders (range inputs) that change simulation parameters in real-time
   - Drag-and-drop elements (using framer-motion drag or onMouseDown/onMouseMove)
   - Buttons that trigger actions (run, reset, check, next)
   - Text/number inputs for answers
   - Click-to-select elements on the SVG

4. **Live readouts** (update in real-time as student interacts)
   - At least 3 numerical readouts with proper units
   - Displayed as text overlaid on or beside the SVG
   - Must change when controls are adjusted
   - Use proper units: m, kg, s, K, °C, cm, mL, g/mL, V, A, degrees, Hz, etc.

5. **3 progressive challenges** (increasing difficulty)
   - Challenge 1: Easy — observe or identify
   - Challenge 2: Medium — measure or calculate
   - Challenge 3: Hard — predict or explain
   - Each has: question text, input method, answer check, feedback
   - Wrong answer feedback MUST use the misconception text from props
   - Format: "⚠️ Misconception: [belief] → Correction: [correction]"

6. **ELI5 explanation** (first thing student sees)
   - Display the eli5 text from props in a highlighted box
   - Simple, child-friendly language

7. **Real-world activity prompt** (after challenges, before completion)
   - Titled "Try This Yourself" or "Do It Real"
   - 2-3 sentence instruction for a physical, away-from-screen activity
   - "What to observe" line
   - Textarea for student to report findings
   - Complete button that calls onComplete(score)

8. **Visual feedback with framer-motion**
   - Correct: green box, checkmark, smooth fade-in via AnimatePresence
   - Wrong: red/orange box, misconception text, smooth fade-in
   - Use motion.div for smooth animations on state changes

9. **TypeScript quality**
   - No 'any' type
   - All props, state, and functions typed
   - No unused imports
   - Clean, readable code

### ANTI-PATTERNS (DO NOT DO THESE):
1. DO NOT generate static diagrams — everything must respond to user input
2. DO NOT use emoji as the primary visual
3. DO NOT import any library except React and framer-motion
4. DO NOT use placeholder text — every control must work
5. DO NOT use generic "Try again" — use the specific misconception from props
6. DO NOT skip the real-world activity
7. DO NOT make all challenges the same difficulty
8. DO NOT generate less than 600 lines`;

// ─── Parse CLI arguments ─────────────────────────────────────

function parseArgs() {
  const args = { limit: null, only: null };
  for (const arg of process.argv.slice(2)) {
    if (arg.startsWith('--limit=')) args.limit = parseInt(arg.split('=')[1]);
    if (arg.startsWith('--only=')) args.only = arg.split('=')[1];
  }
  return args;
}

// ─── Gemini API call ─────────────────────────────────────────

function callGemini(prompt, apiKey, keyLabel) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: TEMPERATURE,
        maxOutputTokens: MAX_OUTPUT_TOKENS,
        topP: 0.9,
      },
    });

    const apiPath = `/v1beta/models/${MODEL}:generateContent?key=${apiKey}`;

    const options = {
      hostname: API_HOST,
      path: apiPath,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
      },
    };

    console.log(`  [${keyLabel}] Calling Gemini ${MODEL}... (prompt: ${prompt.length} chars)`);

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        if (res.statusCode !== 200) {
          console.error(`  [${keyLabel}] HTTP ${res.statusCode}: ${data.substring(0, 500)}`);
          reject(new Error(`Gemini API returned ${res.statusCode} for key ${keyLabel}`));
          return;
        }
        try {
          const json = JSON.parse(data);
          if (json.candidates && json.candidates[0]) {
            const text = json.candidates[0].content.parts[0].text;
            const usage = json.usageMetadata;
            console.log(`  [${keyLabel}] Output: ${text.length} chars, tokens: ${usage?.totalTokenCount || '?'}`);
            resolve(text);
          } else {
            console.error(`  [${keyLabel}] No candidates in response`);
            reject(new Error(`No candidates in Gemini response for key ${keyLabel}`));
          }
        } catch (e) {
          console.error(`  [${keyLabel}] Parse error: ${e.message}`);
          reject(e);
        }
      });
    });

    req.on('error', reject);
    req.setTimeout(REQUEST_TIMEOUT_MS, () => {
      req.destroy(new Error(`Request timeout for key ${keyLabel}`));
    });

    req.write(body);
    req.end();
  });
}

// ─── Extract code from Gemini response ───────────────────────

function extractCode(text) {
  const tsxMatch = text.match(/```tsx\n([\s\S]*?)```/);
  if (tsxMatch) return tsxMatch[1];

  const tsMatch = text.match(/```typescript\n([\s\S]*?)```/);
  if (tsMatch) return tsMatch[1];

  const codeMatch = text.match(/```\n([\s\S]*?)```/);
  if (codeMatch) return codeMatch[1];

  if (text.trim().startsWith("'use client'") || text.trim().startsWith('"use client"')) {
    return text.trim();
  }

  const clientMatch = text.match(/['"]use client['"]/);
  if (clientMatch) {
    return text.substring(clientMatch.index).trim();
  }

  console.warn('  Warning: No code block found, returning raw text');
  return text;
}

// ─── Quality check ───────────────────────────────────────────

function qualityCheck(code, templateKey) {
  const issues = [];
  const lineCount = code.split('\n').length;

  if (!code.includes("'use client'") && !code.includes('"use client"')) {
    issues.push("Missing 'use client' directive");
  }

  if (!code.includes('export default')) {
    issues.push('Missing default export');
  }

  if (!code.includes('<svg')) {
    issues.push('No SVG element found — simulation will not render visually');
  }

  if (lineCount < 500) {
    issues.push(`Only ${lineCount} lines (minimum 500)`);
  }

  const hasSlider = code.includes('type="range"') || code.includes("type='range'");
  const hasButton = code.includes('<button') || code.includes('onClick');
  const hasInput = code.includes('type="number"') || code.includes('type="text"') || code.includes('<textarea');
  const controlCount = [hasSlider, hasButton, hasInput].filter(Boolean).length;
  if (controlCount < 2) {
    issues.push(`Only ${controlCount} control type(s) found (need at least 2)`);
  }

  const bannedImports = ['matter-js', 'three', 'pixi', 'jsxgraph', 'function-plot', 'katex', 'planck'];
  for (const banned of bannedImports) {
    if (code.includes(banned)) {
      issues.push(`Banned import found: ${banned}`);
    }
  }

  const hasAnimation = code.includes('<animate') || code.includes('animation:') || code.includes('keyframes') || code.includes('motion.');
  if (!hasAnimation) {
    issues.push('No animation found — simulation will look static/dead');
  }

  if (!code.toLowerCase().includes('misconception') && !code.toLowerCase().includes('feedback')) {
    issues.push('No misconception/feedback handling found');
  }

  if (!code.toLowerCase().includes('try this') && !code.toLowerCase().includes('do it real') && !code.toLowerCase().includes('yourself')) {
    issues.push('No real-world activity prompt found');
  }

  if (!code.toLowerCase().includes('eli5') && !code.toLowerCase().includes('simple explanation') && !code.toLowerCase().includes('simple terms')) {
    issues.push('No ELI5/simple explanation section found');
  }

  return {
    passed: issues.length === 0,
    issues,
    lineCount,
    hasAnimation,
  };
}

// ─── Build prompt for one template ───────────────────────────

function buildPrompt(template, referenceCode) {
  return `You are an expert educational software engineer. Generate a COMPLETE, INTERACTIVE simulation TEMPLATE component.

${QUALITY_BAR}

### TEMPLATE SPECIFICATION:

Template name: ${template.name}
File name: ${template.key}.tsx
Description: ${template.description}

Nodes it covers: ${template.nodes}

Interactive controls needed: ${template.controls}

Live readouts needed: ${template.readouts}

Progressive challenges: ${template.challenges}

### PROPS INTERFACE:

The component must accept these props (from enrichment data):
- nodeId: string (e.g. "c6_phy_020")
- title: string (topic title)
- definition: string (300-500 word definition — display in explain section)
- eli5: string (60-80 word child-friendly explanation — display at start)
- misconceptions: array of { belief: string, correction: string } (use for wrong-answer feedback)
- diagnosticQuestions: array of { number, bloomLevel, question, answer } (use for challenges)
- masteryCriteria: string (display in completion section)
- onComplete?: (score: number) => void (call when student finishes)

### REFERENCE EXAMPLE (match this quality, animation level, and pattern):

${referenceCode.substring(0, 6000)}

### OUTPUT:

Generate ONLY the TypeScript code. Start with 'use client' and end with the closing brace.
No markdown fences, no explanations, no text before or after the code.

The file will be saved as: ${template.key}.tsx`;
}

// ─── Main ────────────────────────────────────────────────────

async function main() {
  const args = parseArgs();

  // Load reference code
  let referenceCode = '';
  if (fs.existsSync(REFERENCE_FILE)) {
    referenceCode = fs.readFileSync(REFERENCE_FILE, 'utf-8');
    console.log(`Loaded reference: ${REFERENCE_FILE} (${referenceCode.split('\n').length} lines)`);
  } else {
    console.error(`Reference file not found: ${REFERENCE_FILE}`);
    process.exit(1);
  }

  // Ensure output directory exists
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  console.log(`Output directory: ${OUTPUT_DIR}`);

  // Filter templates
  let templatesToGenerate = TEMPLATES;

  // Skip templates that already exist
  templatesToGenerate = templatesToGenerate.filter(t => {
    const filePath = path.join(OUTPUT_DIR, `${t.key}.tsx`);
    if (fs.existsSync(filePath)) {
      console.log(`  SKIP: ${t.key}.tsx already exists`);
      return false;
    }
    return true;
  });

  // Apply --only filter
  if (args.only) {
    templatesToGenerate = templatesToGenerate.filter(t =>
      t.key.toLowerCase().includes(args.only.toLowerCase())
    );
  }

  // Apply --limit
  if (args.limit) {
    templatesToGenerate = templatesToGenerate.slice(0, args.limit);
  }

  console.log(`\nTemplates to generate: ${templatesToGenerate.length}`);

  if (templatesToGenerate.length === 0) {
    console.log('Nothing to generate. All templates exist.');
    return;
  }

  // Process in batches of 2 (one per key, parallel)
  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < templatesToGenerate.length; i += 2) {
    const batch = templatesToGenerate.slice(i, i + 2);
    const batchNum = Math.floor(i / 2) + 1;
    const totalBatches = Math.ceil(templatesToGenerate.length / 2);

    console.log(`\n${'='.repeat(60)}`);
    console.log(`BATCH ${batchNum}/${totalBatches}`);
    console.log(`${'='.repeat(60)}`);

    const promises = batch.map((template, idx) => {
      const keyIdx = idx % GEMINI_KEYS.length;
      const apiKey = GEMINI_KEYS[keyIdx];
      const keyLabel = `Key${keyIdx + 1}`;
      const prompt = buildPrompt(template, referenceCode);

      console.log(`\n[${keyLabel}] Template: ${template.key} — ${template.name}`);

      return callGemini(prompt, apiKey, keyLabel)
        .then(response => {
          const code = extractCode(response);
          const filePath = path.join(OUTPUT_DIR, `${template.key}.tsx`);

          const qc = qualityCheck(code, template.key);
          console.log(`\n  Quality check for ${template.key}:`);
          console.log(`    Lines: ${qc.lineCount}`);
          console.log(`    Animation: ${qc.hasAnimation ? 'Yes' : 'No'}`);

          if (qc.passed) {
            console.log(`    ✅ ALL CHECKS PASSED`);
          } else {
            console.log(`    ⚠️ ISSUES:`);
            for (const issue of qc.issues) {
              console.log(`      - ${issue}`);
            }
          }

          fs.writeFileSync(filePath, code, 'utf-8');
          console.log(`    Saved: ${filePath}`);

          return { key: template.key, success: true, qc };
        })
        .catch(err => {
          console.error(`  [${keyLabel}] FAILED: ${err.message}`);
          return { key: template.key, success: false, error: err.message };
        });
    });

    const results = await Promise.all(promises);

    for (const result of results) {
      if (result.success) {
        successCount++;
      } else {
        failCount++;
      }
    }

    // 30 second delay between batches
    if (i + 2 < templatesToGenerate.length) {
      console.log(`\nWaiting 30 seconds before next batch...`);
      await new Promise(resolve => setTimeout(resolve, BATCH_DELAY_MS));
    }
  }

  console.log(`\n${'='.repeat(60)}`);
  console.log(`GENERATION COMPLETE`);
  console.log(`${'='.repeat(60)}`);
  console.log(`Success: ${successCount}`);
  console.log(`Failed:  ${failCount}`);
  console.log(`Output:  ${OUTPUT_DIR}`);
}

main().catch(err => {
  console.error('FATAL:', err.message);
  process.exit(1);
});
