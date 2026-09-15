// Auto-retry Gemini 3.7-flash template generation
// - 3 keys, 3 templates per round (1 per key)
// - Retry on 503 (up to 5 times with 10s delay)
// - On 429 quota: wait 5 min then retry
// - Skips templates that already exist
// - Runs until ALL remaining templates are done
const fs = require('fs');
const https = require('https');

const KEYS = [
  'AQ.Ab8RN6LDccrCPDvyQ4nFydMGXEz0XYJexA1VBgyA1AKvmnUEwg',
  'AQ.Ab8RN6KNABGpFE0AN7Mgsu0wWlMTd94M-ZfNncE0W7Iz41TKdA',
  'AQ.Ab8RN6JQsjDH9MWFSdbXUsWwRHBgUyilNKzK-1a0tFAPieMYCA',
];
const MODEL = 'gemini-3.7-flash';
const MAX_TOKENS = 65536;
const QUOTA_WAIT_MS = 5 * 60 * 1000; // 5 min
const RETRY_503_MS = 10 * 1000; // 10s
const MAX_503_RETRIES = 5;
const ROUND_BREAK_MS = 65 * 1000; // 65s between rounds

const ALL_TEMPLATES = [
  { name: 'PhysicsElectricitySim', file: 'components/simulations/c9_12/PhysicsElectricitySim.tsx', classBand: 'C7-10', subject: 'Physics', nodes: 'c7_phy_028-031, c8_phy_032-035, c10_phy_028-034 (15 nodes)', teaches: 'Electric current, circuits, Ohms law, series/parallel combinations, electrical power, household wiring, safety devices, and electromagnetic effects.', interactive: 'Circuit simulator (series/parallel); Ohms law explorer; household wiring designer; fuse/circuit breaker tester; Oersted experiment simulator.', priority: 'Critical' },
  { name: 'BusinessStudiesSim', file: 'components/simulations/c9_12/BusinessStudiesSim.tsx', classBand: 'C9-12', subject: 'Business Studies', nodes: 'c11_bs_001-035, c12_bs_001-048 (83 nodes)', teaches: 'Business organisation forms, management principles (Taylor/Fayol), marketing mix, business finance, stock exchange, consumer protection, and modern business trends.', interactive: 'Business form selector; management principle applier; marketing mix designer; financial ratio calculator; consumer case resolver; stock market simulator.', priority: 'Critical' },
  { name: 'HistoryIndiaSim', file: 'components/simulations/c9_12/HistoryIndiaSim.tsx', classBand: 'C6-12', subject: 'History & Civics', nodes: 'c6_histciv through c12_hist (~200 nodes)', teaches: 'Complete Indian and world history from ancient civilisations through medieval kingdoms, the freedom struggle, world wars, Cold War, decolonisation, and post-independence India.', interactive: 'Timeline builder; cause-effect chain mapper; historical figure role-play; map-based territorial change tracker; document analyser.', priority: 'Critical' },
  { name: 'HistoryCivicsSim', file: 'components/simulations/c6_8/HistoryCivicsSim.tsx', classBand: 'C6-10', subject: 'History & Civics', nodes: 'c6_histciv_001-065, c7_histciv_046-058, c8_histciv_057-070, c9_histciv_001-006, c10_histciv_001-021 (~80 nodes)', teaches: 'Indian Constitution, Parliament, President, Prime Minister, Supreme Court, fundamental rights, local self-government, and the working of Indian democracy.', interactive: 'Parliament simulator (bill passage); constitution explorer; election role-play; writ issuer; Panchayati Raj structure builder; emergency scenario handler.', priority: 'Critical' },
  { name: 'OrganicChemistryC10Sim', file: 'components/simulations/c9_12/OrganicChemistryC10Sim.tsx', classBand: 'C9-12', subject: 'Chemistry', nodes: 'c10_chem_065-080 (16 nodes)', teaches: 'Organic chemistry for C10 — tetravalency, catenation, isomerism, homologous series, IUPAC nomenclature, alkanes, alkenes, alkynes, ethanol, acetic acid.', interactive: 'Molecular structure builder; IUPAC name generator; isomer matcher; homologous series explorer; reaction predictor; functional group identifier.', priority: 'Critical' },
  { name: 'WaterStudiesSimulation', file: 'components/simulations/c6_8/WaterStudiesSimulation.tsx', classBand: 'C1-5', subject: 'Chemistry, EVS', nodes: 'c1_chem_001-004, c2_chem_001-004, c3_chem_006-008, c5_chem_009, c7_chem_017-018, c8_chem_017-018 (16 nodes)', teaches: 'Complete water studies from sources and properties through conservation, purification, and hard/soft water.', interactive: 'Water source explorer; purification filter builder; hard vs soft water tester; water usage calculator; rainwater harvester designer.', priority: 'Important' },
  { name: 'MatterPropertiesSimulation', file: 'components/simulations/c6_8/MatterPropertiesSimulation.tsx', classBand: 'C3-5', subject: 'Chemistry, Physics', nodes: 'c3_chem_001-008, c4_chem_001, c5_chem_001-008 (17 nodes)', teaches: 'States of matter (solid/liquid/gas), particle theory, interconversion of states, properties of materials, and basic separation methods.', interactive: 'Particle arrangement builder; state change simulator with temperature control; separation technique lab; properties matcher game.', priority: 'Important' },
  { name: 'AirBreathingSimulation', file: 'components/simulations/c6_8/AirBreathingSimulation.tsx', classBand: 'C4-7', subject: 'Chemistry, Biology', nodes: 'c4_chem_002-004, c5_chem_010-012, c6_chem_015-019, c7_chem_017-020 (15 nodes)', teaches: 'Composition of air, breathing and respiration, CO2 and O2 cycles, water as universal solvent.', interactive: 'Air composition analyzer; breathing diagram builder; respiration equation balancer; gas exchange simulator; CO2/O2 cycle tracker.', priority: 'Important' },
  { name: 'MaterialsSolutionsSimulation', file: 'components/simulations/c6_8/MaterialsSolutionsSimulation.tsx', classBand: 'C4-5', subject: 'Chemistry', nodes: 'c4_chem_005-010, c5_chem_006-008 (9 nodes)', teaches: 'Properties of materials, solubility, saturated/unsaturated solutions, separation of mixtures.', interactive: 'Solubility tester; separation method selector; solution concentration calculator; material property matcher.', priority: 'Important' },
  { name: 'PhysicsHeatSim', file: 'components/simulations/c9_12/PhysicsHeatSim.tsx', classBand: 'C3-10', subject: 'Physics', nodes: 'c3_phy_003-006, c8_phy_022-024, c10_phy_035-036, c10_phy_007-008 (11 nodes)', teaches: 'Heat as energy, temperature, thermal expansion, calorimetry, specific heat capacity, latent heat, change of state.', interactive: 'Temperature vs heat comparator; expansion calculator; calorimetry lab; latent heat phase change simulator; specific heat measurer.', priority: 'Important' },
  { name: 'PhysicsSoundSim', file: 'components/simulations/c9_12/PhysicsSoundSim.tsx', classBand: 'C5-10', subject: 'Physics', nodes: 'c5_phy_001-004, c6_phy_030-031, c7_phy_024-027, c8_phy_025-026, c10_phy_022-027 (18 nodes)', teaches: 'Sound production, propagation, loudness, pitch, quality, resonance, echoes.', interactive: 'Sound wave visualizer; pitch-loudness lab; resonance demonstrator; echo distance calculator; musical instrument analyser.', priority: 'Important' },
  { name: 'PhysicsNuclearSim', file: 'components/simulations/c9_12/PhysicsNuclearSim.tsx', classBand: 'C9-12', subject: 'Physics', nodes: 'c10_phy_037-042 (6 nodes)', teaches: 'Radioactivity, alpha/beta/gamma decay, radioisotopes, nuclear fission and fusion.', interactive: 'Decay chain simulator; half-life calculator; fission vs fusion comparison; radioisotope application explorer; radiation safety lab.', priority: 'Important' },
  { name: 'PhysicsElectrostaticsSim', file: 'components/simulations/c9_12/PhysicsElectrostaticsSim.tsx', classBand: 'C9-12', subject: 'Physics', nodes: 'c10_phy_042, c11_phy_003-004, c11_phy_006-007, c11_phy_009-013, c11_phy_015 (11 nodes)', teaches: 'Coulombs law, electric field, electric potential, equipotential surfaces, electrostatic energy.', interactive: 'Coulombs law force calculator; electric field line mapper; potential surface explorer; dipole torque simulator; Gauss law demonstrator.', priority: 'Important' },
  { name: 'PhysicsC8FoundationsSim', file: 'components/simulations/c6_8/PhysicsC8FoundationsSim.tsx', classBand: 'C6-8', subject: 'Physics', nodes: 'c8_phy_001-009, c8_phy_020-021, c8_phy_027-031 (14 nodes)', teaches: 'State interconversion, density measurement, dispersion, static electricity.', interactive: 'State change lab; density measurement tool; static electricity generator; electroscope interaction; lightning conductor simulator.', priority: 'Important' },
  { name: 'BiologyHumanPhysioSim', file: 'components/simulations/c9_12/BiologyHumanPhysioSim.tsx', classBand: 'C9-12', subject: 'Biology', nodes: 'c10_bio_005-016, c10_bio_030-031, c11_bio_069-070, c12_bio_058 (17 nodes)', teaches: 'Human physiology — digestion, respiration, circulation, excretion, nervous system, endocrine system, plant physiology.', interactive: 'Organ system navigator; physiological process simulator; hormone level regulator; enzyme inhibition lab; vitamin deficiency identifier.', priority: 'Important' },
  { name: 'BiologyEcologySim', file: 'components/simulations/c9_12/BiologyEcologySim.tsx', classBand: 'C9-12', subject: 'Biology, EVS', nodes: 'c11_bio_068-070, c12_bio_059-071 (15 nodes)', teaches: 'Ecological principles, limiting factors, Hardy-Weinberg, gene technology, population models, succession, biodiversity.', interactive: 'Ecosystem simulator; population growth grapher; succession stage builder; biodiversity hotspot mapper; gene therapy designer.', priority: 'Important' },
  { name: 'BiologyPlantSim', file: 'components/simulations/c9_12/BiologyPlantSim.tsx', classBand: 'C9-12', subject: 'Biology', nodes: 'c10_bio_005-009, c11_bio_042-045, c12_bio_065 (10 nodes)', teaches: 'Root absorption, ascent of sap, transpiration, photosynthesis, plant growth regulators, seed formation and dispersal.', interactive: 'Root hair osmosis simulator; transpiration rate measurer; photosynthesis equation builder; plant hormone tester; seed dispersal explorer.', priority: 'Important' },
  { name: 'MassMediaSim', file: 'components/simulations/c9_12/MassMediaSim.tsx', classBand: 'C9-12', subject: 'Mass Media', nodes: 'c11_massmedia_001-025, c12_massmedia_001-028 (53 nodes)', teaches: 'Communication models, journalism ethics, news values, reporting, radio/TV, film studies, PR, social media.', interactive: 'News story builder; camera angle simulator; radio script writer; PR campaign designer; social media analyser; ethical dilemma resolver.', priority: 'Important' },
  { name: 'HomeScienceSim', file: 'components/simulations/c9_12/HomeScienceSim.tsx', classBand: 'C9-12', subject: 'Home Science', nodes: 'c11_home_001-034, c12_home_001-032 (66 nodes)', teaches: 'Food and nutrition, meal planning, resource management, child development, textile science, consumer protection, adolescent health.', interactive: 'Meal planner; fabric identifier; stain removal simulator; developmental milestone tracker; budgeting tool; consumer rights advisor.', priority: 'Important' },
  { name: 'PsychologySim', file: 'components/simulations/c9_12/PsychologySim.tsx', classBand: 'C9-12', subject: 'Psychology', nodes: 'c11_psy_001-037, c12_psy_001-041 (78 nodes)', teaches: 'Schools of psychology, research methods, sensation/perception, learning, memory, thinking, motivation, emotion, intelligence, personality, development, stress, abnormal behaviour, psychotherapy, social psychology.', interactive: 'Memory game; conditioning lab; personality type sorter; stress management simulator; intelligence test explorer; social influence experiment.', priority: 'Important' },
  { name: 'BiotechnologySim', file: 'components/simulations/c9_12/BiotechnologySim.tsx', classBand: 'C9-12', subject: 'Biotechnology', nodes: 'c11_biotech_001-055, c12_biotech_001-055 (110 nodes)', teaches: 'rDNA technology, restriction enzymes, vectors, PCR, CRISPR, GM crops, bioreactors, fermentation, bioinformatics, genomics, proteomics, regulatory frameworks.', interactive: 'Restriction enzyme cutter; DNA ligase joiner; PCR thermal cycler; CRISPR gene editor; bioreactor designer; BLAST search simulator; phylogenetic tree builder.', priority: 'Important' },
  { name: 'CommerceSim', file: 'components/simulations/c9_12/CommerceSim.tsx', classBand: 'C9-12', subject: 'Commerce', nodes: 'c11_comm_001-060, c12_comm_001-055 (115 nodes)', teaches: 'Business organisation, trade, aids to trade, e-commerce, warehousing, insurance, stock exchange, export/import procedures.', interactive: 'Trade flow simulator; document generator; insurance policy designer; export-import walkthrough; e-commerce platform builder.', priority: 'Important' },
  { name: 'EconomicsAdvancedSim', file: 'components/simulations/c9_12/EconomicsAdvancedSim.tsx', classBand: 'C9-12', subject: 'Economics', nodes: 'c11_econ_031-080, c12_econ_001-091 (~120 nodes)', teaches: 'National income, money and banking, BOP, fiscal policy, public finance, income determination, international trade, Indian economy.', interactive: 'National income calculator; money multiplier simulator; budget preparer; BOP statement builder; elasticity analyser; market equilibrium grapher.', priority: 'Important' },
  { name: 'GeographySkillsSim', file: 'components/simulations/c9_12/GeographySkillsSim.tsx', classBand: 'C6-12', subject: 'Geography', nodes: 'c6_geo_001-005, c7_geo_001-003, c8_geo_001-007, c10_geo_001-003, c11_geo_001-003, c11_geo_025 (22 nodes)', teaches: 'Map reading, topographical map interpretation, scale, direction, geographical skills, spatial analysis.', interactive: 'Interactive map reader; topo map interpreter; scale converter; direction finder; landform identifier; GIS data explorer.', priority: 'Important' },
  { name: 'EnvironmentalScienceSim', file: 'components/simulations/c9_12/EnvironmentalScienceSim.tsx', classBand: 'C1-12', subject: 'EVS', nodes: 'c1_evs through c12_evs (~157 nodes)', teaches: 'Environmental science from personal hygiene through ecosystems, biodiversity, pollution, climate change, sustainable development.', interactive: 'Ecosystem simulator; pollution tracker; carbon footprint calculator; biodiversity mapper; climate change explorer; sustainability planner.', priority: 'Important' },
  { name: 'AppliedMathematicsSim', file: 'components/simulations/c9_12/AppliedMathematicsSim.tsx', classBand: 'C9-12', subject: 'Applied Mathematics', nodes: 'c11_appmath_001-074, c12_appmath_001-068 (143 nodes)', teaches: 'Calculus applications, financial mathematics, index numbers, moving averages, linear programming, probability distributions, differential equations.', interactive: 'EMI calculator; NPV analyser; LP graphical solver; distribution grapher; index number builder; moving average plotter; break-even finder.', priority: 'Important' },
  { name: 'PhysicsC9_MiscSim', file: 'components/simulations/c9_12/PhysicsC9_MiscSim.tsx', classBand: 'C9-12', subject: 'Physics', nodes: 'c9_phy_003-004, c9_phy_010-011, c9_phy_033-037, c9_phy_042-044 (12 nodes)', teaches: 'Vernier callipers, screw gauge, v-t graphs, equations of motion, wave nature of sound, electric circuits, induced magnetism, Earths magnetic field.', interactive: 'Vernier calliper simulator; v-t graph analyser; wave frequency explorer; circuit diagram builder; magnetic field mapper; neutral point finder.', priority: 'Important' },
  { name: 'C11_ChemistryTopicsSim', file: 'components/simulations/c9_12/C11_ChemistryTopicsSim.tsx', classBand: 'C9-12', subject: 'Chemistry', nodes: 'c11_chem_001-010, c11_chem_062-092 (~40 nodes)', teaches: 'Importance/scope of chemistry, laws of chemical combination, atomic/molecular masses, stoichiometry, redox mechanisms, organic reaction mechanisms (SN1/SN2, E1/E2), aromatic chemistry.', interactive: 'Reaction mechanism builder; hybridisation visualiser; aromatic substitution predictor; redox equation balancer; organic synthesis designer.', priority: 'Important' },
  { name: 'C12_ChemistryTopicsSim', file: 'components/simulations/c9_12/C12_ChemistryTopicsSim.tsx', classBand: 'C9-12', subject: 'Chemistry', nodes: 'c12_chem_095-104 (10 nodes)', teaches: 'Soddy-Fajans laws, Hardy-Schulze rule, Kolbes electrolysis, haloform reaction, carbylamine reaction, Hoffmann bromamide, Williamson ether synthesis, interhalogen compounds, zwitterions, polymerisation.', interactive: 'Reaction pathway designer; named reaction explorer; polymerisation mechanism builder; coordinate compound isomerism matcher; colloid stability tester.', priority: 'Important' },
  { name: 'MathsC9_12_AdvancedSim', file: 'components/simulations/c9_12/MathsC9_12_AdvancedSim.tsx', classBand: 'C9-12', subject: 'Mathematics', nodes: 'c9_math through c12_math (~75 nodes)', teaches: 'Number systems, surds, logarithms, coordinate geometry, calculus, 3D geometry, vectors, differential equations, probability distributions, mathematical reasoning.', interactive: 'Function grapher; derivative visualiser; integral area calculator; 3D geometry plotter; vector operation tool; probability distribution grapher; limit evaluator.', priority: 'Important' },
  { name: 'BiologyC6_8Sim', file: 'components/simulations/c6_8/BiologyC6_8Sim.tsx', classBand: 'C6-8', subject: 'Biology', nodes: 'c6_bio_001-027, c7_bio_002-026, c8_bio_003-026 (~78 nodes)', teaches: 'Leaf structure, plant/animal cells, tissues, classification, photosynthesis, respiration, human body systems, diseases, microbes, adaptation.', interactive: 'Cell explorer; tissue identifier; organ system navigator; disease classifier; photosynthesis simulator; food web builder; adaptation matching game.', priority: 'Important' },
  { name: 'PhysicsWorldSim', file: 'components/simulations/class1/PhysicsWorldSim.tsx', classBand: 'C1-5', subject: 'Physics', nodes: 'c1_phy_007-008, c2_phy_009-010, c5_phy_012 (4 nodes)', teaches: 'Sun and seasons, Earths tilt, day-night cycle, cardinal directions.', interactive: 'Drag Earth to orbit Sun; rotate Earth for day/night; compass game; shadow-length tracker.', priority: 'Gap Filler' },
  { name: 'BiologyFoundationsSimulation', file: 'components/simulations/class1/BiologyFoundationsSimulation.tsx', classBand: 'C1-5', subject: 'Biology, EVS', nodes: 'c1_bio_002-009, c2_bio_001-008, c3_bio_001-005, c4_bio_001-002, c4_bio_017-018, c5_bio_007-009 (26 nodes)', teaches: 'Human body basics, sense organs, food and nutrition, health and hygiene, living vs non-living, basic plant/animal biology.', interactive: 'Body part identifier; food group sorter; sense organ explorer; healthy habit builder; living things classifier; adaptation matching game.', priority: 'Gap Filler' },
  { name: 'CommunicationStudiesSim', file: 'components/simulations/c9_12/CommunicationStudiesSim.tsx', classBand: 'C9-12', subject: 'Communication Studies', nodes: 'c9_commstud_001-046, c10_commstud_001-046, c9_commapp_001-042, c10_commapp_001-032 (88 nodes)', teaches: 'Communication process, business communication, marketing, advertising, sales promotion, consumer protection, HR management, PR, logistics.', interactive: 'Communication model builder; advertisement designer; sales pitch simulator; accounting entry recorder; logistics chain mapper; environmental impact assessor.', priority: 'Gap Filler' },
  { name: 'CommerceApplicationsSim', file: 'components/simulations/c9_12/CommerceApplicationsSim.tsx', classBand: 'C9-12', subject: 'Commerce Applications', nodes: 'c9_commapp_001-042, c10_commapp_001-032 (74 nodes)', teaches: 'Marketing mix, accounting fundamentals, cost classification, HR management, training, PR, environmental issues, consumer education.', interactive: 'Marketing mix designer; cost classifier; training method selector; PR campaign planner; environmental impact calculator; consumer rights advisor.', priority: 'Gap Filler' },
  { name: 'ComputerSkillsC1_5Sim', file: 'components/simulations/class1/ComputerSkillsC1_5Sim.tsx', classBand: 'C1-5', subject: 'Computer Science', nodes: 'c1_cs_001-010, c2_cs_001-012, c3_cs_001-015, c4_cs_001-018, c5_cs_001-020 (60 nodes)', teaches: 'Computer literacy, hardware, software, file management, MS Office, internet, email safety, Scratch, LOGO.', interactive: 'Computer part identifier; file manager simulator; Word/PowerPoint mini-apps; internet safety quiz; Scratch block sorter; LOGO turtle graphics.', priority: 'Important' },
  { name: 'PhysicsC6_AdvancedSim', file: 'components/simulations/c6_8/PhysicsC6_AdvancedSim.tsx', classBand: 'C6-8', subject: 'Physics', nodes: 'c6_phy_006, c6_phy_010, c6_phy_030, c6_phy_031 (4 nodes)', teaches: 'Measurement of area, periodic motion, loudness-pitch-frequency, sound amplitude.', interactive: 'Area measurement tool; motion classifier; sound property explorer; frequency-pitch matching game.', priority: 'Gap Filler' },
];

const SYSTEM_PROMPT = `You are a senior React/TypeScript engineer building interactive educational simulations for a CISCE learning platform. You generate ONE complete, compilable, production-ready simulation component.

## CRITICAL: ACTUAL API USAGE (DO NOT INVENT METHODS)

### audioManager — use .play() with VALID SoundEffect strings ONLY:
audioManager.play('tap')        // button taps
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

### speechManager — use .speak() for spoken instructions:
speechManager.speak('Welcome! Let us explore.')
speechManager.speak('Correct! Well done.')
speechManager.speak('Not quite. Remember the rule.')
// Call speechManager.speak() at least 5 times

### HintBubble, Confetti, SuccessBanner, SparkleBurst — use as JSX:
<HintBubble show={showHint} text={currentHint} />
<Confetti show={showConfetti} />
<SuccessBanner show={showSuccess} text="Challenge Complete!" />
<SparkleBurst show={showSparkle} x={400} y={300} />

## STRICT REQUIREMENTS:
1. 'use client' at top
2. Imports: React, framer-motion, sim-engine (audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst), Draggable if needed
3. NO other libraries
4. Default export
5. Props interface with enrichment data (nodeId, title, definition, eli5, misconceptions, diagnosticQuestions, masteryCriteria, onComplete)
6. DEFAULT_PROPS with 5+ misconceptions, 8+ diagnostic questions
7. Minimum 800 lines
8. Topic-specific SVG (custom SVG components)
9. 8+ challenges with progressive difficulty
10. 5 teaching slides (TEACHING_SLIDES array)
11. Adaptive difficulty: foundation/standard/advanced
12. localStorage with 'mastery_<nodeId>' key
13. Spaced repetition (REVIEW_INTERVAL_DAYS = [1,3,7,14,30])
14. Misconception feedback from data
15. Real-world activity at end
16. onComplete(score), score = max(0, 100 - errors*5)
17. Auto-hint after 10s inactivity (useRef timer)
18. Progress tracking
19. No 'any' type
20. audioManager.play() 8+ times
21. speechManager.speak() 5+ times
22. <HintBubble>, <Confetti>, <SuccessBanner>, <SparkleBurst> in JSX

## OUTPUT: Only code in a single tsx code block. No explanations.`;

function fileExists(template) {
  const fullPath = 'D:\\dream_app\\frontend\\' + template.file.replace(/\//g, '\\');
  return fs.existsSync(fullPath);
}

function generatePrompt(template) {
  let existing = '';
  try {
    existing = fs.readFileSync('D:\\dream_app\\frontend\\all_templates_extracted.txt', 'utf8').substring(0, 6000);
  } catch (e) {}
  return `Generate ONE complete simulation template. 800+ lines, compilable TypeScript/React.

## EXISTING TEMPLATES (do NOT duplicate):
${existing}

## TEMPLATE TO GENERATE (NEW):
Name: ${template.name}
File path: ${template.file}
Class band: ${template.classBand}
Subject: ${template.subject}
Nodes: ${template.nodes}
Teaches: ${template.teaches}
Interactive elements: ${template.interactive}
Priority: ${template.priority}

Generate this ONE template now. Output only code in a single tsx code block.`;
}

function callGemini(template, keyIdx) {
  return new Promise((resolve) => {
    const key = KEYS[keyIdx];
    const prompt = generatePrompt(template);
    const body = JSON.stringify({
      contents: [{ parts: [{ text: SYSTEM_PROMPT + '\n\n' + prompt }] }],
      generationConfig: { maxOutputTokens: MAX_TOKENS, temperature: 0.7 },
    });

    const start = Date.now();
    const req = https.request({
      hostname: 'generativelanguage.googleapis.com',
      path: `/v1beta/models/${MODEL}:generateContent?key=${key}`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) },
    }, (res) => {
      let data = '';
      res.on('data', (c) => data += c);
      res.on('end', () => {
        const elapsed = Math.round((Date.now() - start) / 1000);
        try {
          const json = JSON.parse(data);
          if (json.error) {
            resolve({ template, keyIdx, success: false, error: json.error.message, status: res.statusCode, elapsed });
            return;
          }
          const text = json.candidates?.[0]?.content?.parts?.[0]?.text || '';
          if (!text) {
            resolve({ template, keyIdx, success: false, error: 'No text', status: res.statusCode, elapsed });
            return;
          }
          resolve({ template, keyIdx, success: true, text, status: res.statusCode, elapsed });
        } catch (e) {
          resolve({ template, keyIdx, success: false, error: e.message, status: res.statusCode, elapsed });
        }
      });
    });
    req.on('error', (e) => resolve({ template, keyIdx, success: false, error: e.message, status: 0, elapsed: 0 }));
    req.write(body);
    req.end();
  });
}

// Call with 503 retry
async function callWithRetry(template, keyIdx) {
  for (let attempt = 1; attempt <= MAX_503_RETRIES; attempt++) {
    const r = await callGemini(template, keyIdx);
    if (r.success) return r;
    if (r.status === 503 && attempt < MAX_503_RETRIES) {
      console.log(`    503 retry ${attempt}/${MAX_503_RETRIES} for ${template.name} in ${RETRY_503_MS/1000}s...`);
      await sleep(RETRY_503_MS);
      continue;
    }
    return r; // quota error or max retries
  }
}

function extractCode(text) {
  const m1 = text.match(/```tsx:[^\n]+\n([\s\S]*?)```/);
  if (m1) return m1[1];
  const m2 = text.match(/```tsx\n([\s\S]*?)```/);
  if (m2) return m2[1];
  const m3 = text.match(/```\n([\s\S]*?)```/);
  if (m3 && m3[1].includes('use client')) return m3[1];
  if (text.trim().startsWith("'use client'") || text.trim().startsWith('"use client"')) return text.trim();
  return null;
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function saveResult(r) {
  const code = extractCode(r.text);
  if (!code) {
    console.log(`  FAIL: ${r.template.name} — no code block (${r.elapsed}s)`);
    try { fs.writeFileSync(`D:\\dream_app\\frontend\\scripts\\raw_gemini_${r.template.name}.txt`, r.text, 'utf8'); } catch(e) {}
    return { name: r.template.name, success: false, error: 'No code block' };
  }
  const fullPath = 'D:\\dream_app\\frontend\\' + r.template.file.replace(/\//g, '\\');
  try {
    const dir = fullPath.substring(0, fullPath.lastIndexOf('\\'));
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(fullPath, code, 'utf8');
    const lines = code.split('\n').length;
    console.log(`  OK: ${r.template.name} (key ${r.keyIdx+1}) — ${lines} lines (${r.elapsed}s)`);
    return { name: r.template.name, success: true, lines, path: r.template.file };
  } catch (e) {
    console.log(`  FAIL: ${r.template.name} — save error: ${e.message}`);
    return { name: r.template.name, success: false, error: e.message };
  }
}

async function main() {
  // Filter out templates that already exist
  const remaining = ALL_TEMPLATES.filter(t => !fileExists(t));

  console.log(`\n=== GEMINI ${MODEL} AUTO-GENERATION ===`);
  console.log(`Total templates: ${ALL_TEMPLATES.length}`);
  console.log(`Already exist: ${ALL_TEMPLATES.length - remaining.length}`);
  console.log(`Remaining: ${remaining.length}`);
  console.log(`Keys: ${KEYS.length} | Round size: 3 (1 per key)`);
  console.log(`503 retries: ${MAX_503_RETRIES} (10s apart)`);
  console.log(`Quota wait: ${QUOTA_WAIT_MS/60000} min`);
  console.log(`Round break: ${ROUND_BREAK_MS/1000}s`);
  console.log('');

  if (remaining.length === 0) {
    console.log('All templates already exist! Nothing to do.');
    return;
  }

  const allResults = [];
  const totalStart = Date.now();
  let queue = [...remaining];
  let consecutiveQuotaFails = 0;

  while (queue.length > 0) {
    const roundTemplates = queue.slice(0, 3);
    const roundNum = Math.floor((remaining.length - queue.length) / 3) + 1;
    const totalRounds = Math.ceil(remaining.length / 3);

    console.log(`\n--- ROUND ${roundNum} (queue: ${queue.length} left) ---`);
    console.log(`  ${roundTemplates.map((t, i) => `[Key ${i+1}] ${t.name}`).join(' | ')}`);

    const results = await Promise.all(
      roundTemplates.map((t, i) => callWithRetry(t, i % KEYS.length))
    );

    let quotaHits = 0;
    for (const r of results) {
      if (!r) continue;
      if (r.success) {
        const saved = saveResult(r);
        allResults.push(saved);
        if (saved.success) consecutiveQuotaFails = 0;
      } else if (r.status === 429 || (r.error && r.error.includes('quota'))) {
        quotaHits++;
        console.log(`  QUOTA: ${r.template.name} (key ${r.keyIdx+1}) — ${r.error?.substring(0, 80)}`);
        allResults.push({ name: r.template.name, success: false, error: 'quota' });
        // Put back in queue for retry
      } else {
        console.log(`  FAIL: ${r.template.name} (key ${r.keyIdx+1}) — ${r.error?.substring(0, 80)}`);
        try { fs.writeFileSync(`D:\\dream_app\\frontend\\scripts\\raw_gemini_${r.template.name}.txt`, r.error || '', 'utf8'); } catch(e) {}
        allResults.push({ name: r.template.name, success: false, error: r.error });
      }
    }

    if (quotaHits > 0) {
      consecutiveQuotaFails++;
      console.log(`\n  ${quotaHits} quota hits. Waiting ${QUOTA_WAIT_MS/60000} min for quota reset...`);
      console.log(`  (consecutive quota fails: ${consecutiveQuotaFails})`);
      // Keep the quota-failed templates in the queue (don't remove them)
      // Only remove successfully generated ones
      const successNames = results.filter(r => r && r.success).map(r => r.template.name);
      queue = queue.filter(t => !successNames.includes(t.name));

      if (consecutiveQuotaFails >= 6) {
        console.log(`\n  6 consecutive quota fails. All keys exhausted. Waiting longer (15 min)...`);
        await sleep(15 * 60 * 1000);
        consecutiveQuotaFails = 0;
      } else {
        await sleep(QUOTA_WAIT_MS);
      }
    } else {
      // Remove successfully generated ones
      const successNames = results.filter(r => r && r.success).map(r => r.template.name);
      queue = queue.filter(t => !successNames.includes(t.name));
      // Keep 503 and quota failures in queue for retry. Only remove genuine code errors.
      const codeErrors = results.filter(r => r && !r.success && r.status !== 429 && r.status !== 503 && !(r.error && (r.error.includes('quota') || r.error.includes('high demand')))).map(r => r.template.name);
      queue = queue.filter(t => !codeErrors.includes(t.name));

      if (queue.length > 0) {
        console.log(`  ...waiting ${ROUND_BREAK_MS/1000}s before next round...`);
        await sleep(ROUND_BREAK_MS);
      }
    }

    // Save progress
    const success = allResults.filter(r => r.success).length;
    const fail = allResults.filter(r => !r.success).length;
    const progressFile = 'D:\\dream_app\\frontend\\scripts\\gemini_progress.json';
    fs.writeFileSync(progressFile, JSON.stringify({
      total: remaining.length, success, fail, queueLeft: queue.length,
      queueNames: queue.map(t => t.name),
      results: allResults,
    }, null, 2));
  }

  const totalElapsed = Math.round((Date.now() - totalStart) / 1000);
  const success = allResults.filter(r => r.success).length;
  const fail = allResults.filter(r => !r.success).length;

  console.log(`\n=== FINAL SUMMARY ===`);
  console.log(`Success: ${success}/${remaining.length}`);
  console.log(`Failed: ${fail}/${remaining.length}`);
  console.log(`Total time: ${Math.round(totalElapsed/60)}m ${totalElapsed%60}s`);
  console.log(`\nSaved:`);
  allResults.filter(r => r.success).forEach(r => console.log(`  ${r.name}: ${r.lines} lines`));
  if (fail > 0) {
    console.log(`\nFailed:`);
    allResults.filter(r => !r.success).forEach(r => console.log(`  ${r.name}: ${r.error?.substring(0, 80)}`));
  }

  fs.writeFileSync('D:\\dream_app\\frontend\\scripts\\gemini_final_summary.json',
    JSON.stringify({ totalElapsed, success, fail, results: allResults }, null, 2));
}

main().catch(e => { console.error('FATAL:', e); process.exit(1); });
