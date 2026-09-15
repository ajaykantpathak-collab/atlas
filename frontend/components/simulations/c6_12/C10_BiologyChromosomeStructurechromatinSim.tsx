'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── ICSE BIOLOGY CLASS 10 NODE IDS ───
const NODE_C10_BIO_001 = 'c10_bio_001'; // Chromosome structure (chromatin, chromatid, gene, DNA, centromere)
const NODE_C10_BIO_002 = 'c10_bio_002'; // Cell cycle (interphase and mitotic phase)
const NODE_C10_BIO_003 = 'c10_bio_003'; // Mitosis (stages in plant and animal cells)
const NODE_C10_BIO_004 = 'c10_bio_004'; // Meiosis (reduction division)
const NODE_C10_BIO_005 = 'c10_bio_005'; // Absorption by roots (imbibition, osmosis, tonicity)
const NODE_C10_BIO_006 = 'c10_bio_006'; // Ascent of sap (cohesion, adhesion, transpirational pull)
const NODE_C10_BIO_007 = 'c10_bio_007'; // Transpiration (mechanism, factors, experiments)
const NODE_C10_BIO_008 = 'c10_bio_008'; // Photosynthesis (light and dark reactions)
const NODE_C10_BIO_009 = 'c10_bio_009'; // Chemical coordination in plants (plant hormones)
const NODE_C10_BIO_010 = 'c10_bio_010'; // Respiratory system (detailed structure and mechanism)

const ALL_NODE_IDS = [
  NODE_C10_BIO_001,
  NODE_C10_BIO_002,
  NODE_C10_BIO_003,
  NODE_C10_BIO_004,
  NODE_C10_BIO_005,
  NODE_C10_BIO_006,
  NODE_C10_BIO_007,
  NODE_C10_BIO_008,
  NODE_C10_BIO_009,
  NODE_C10_BIO_010,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Great Botanical & Cellular Expedition',
  intro: 'You are the chief bio-investigator at the National Botanical & Cytological Research Institute. A high-altitude tea plantation in Darjeeling and a research greenhouse are facing severe cellular and physiological crises: stunted crop growth, wilted flaccid leaves, and abnormal cell division in seedling roots. You must investigate from the molecular chromosome level all the way to plant physiology and respiratory gas exchange to restore ecological balance!',
  context: 'Investigate 10 key biological domains: Chromosomes, Cell Cycle, Mitosis, Meiosis, Root Absorption, Ascent of Sap, Transpiration, Photosynthesis, Phytohormones, and Human Respiratory Adaptations.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'Under a high-power microscope, an onion root tip cell shows a pinched center with two identical rod-shaped arms, while a non-dividing nucleus shows only a tangled mass of fine threads. Are these made of completely different chemical substances?',
  options: [
    'Yes — chromatin is pure protein, while chromosomes are made of starch and lipids.',
    'No — both are the exact SAME material (DNA + histone proteins) in different packaging states!',
    'Yes — chromosomes only exist in animals, while chromatin only exists in plants.',
    'No — chromosomes contain RNA, whereas chromatin is composed only of free minerals.',
  ],
  correctIndex: 1,
  hintAfter: 'Think about yarn: a loose tangled heap of yarn vs a tightly wound ball are made of the exact same wool!',
};

// ─── BRILLIANT PREDICTION QUESTIONS (Predict-Then-Check Pattern) ───
export interface PredictionQuestion {
  id: string;
  nodeId: string;
  title: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  verifyInstruction: string;
}

export const PREDICTION_QUESTIONS = [
  {
    id: 'pred_bio_001',
    nodeId: NODE_C10_BIO_005,
    title: 'Root Osmosis & Tonicity Prediction',
    question: 'If you place a plant root cell into a 10.0% concentrated hypertonic saline solution, what will happen to its central vacuole and protoplasm?',
    options: [
      'The central vacuole will swell massively and lyse (burst) through the cellulose wall.',
      'Water will leave via exosmosis, causing protoplasm and vacuole to shrink away from the rigid cell wall (plasmolysis).',
      'The cell will remain completely unaffected because plant cell walls are fully impermeable to water.',
      'Water will enter rapidly by active transport against the concentration gradient.',
    ],
    correctIndex: 1,
    explanation: 'In hypertonic solution, the external water potential is lower than the cell sap. Water exits by exosmosis, causing protoplasmic shrinkage (plasmolysis) while the cell wall maintains outer shape.',
    verifyInstruction: 'Adjust the External Solute Concentration slider in Exploration Lab 3 to 10.0% to observe the purple vacuole shrink in real-time!',
  },
  {
    id: 'pred_bio_002',
    nodeId: NODE_C10_BIO_007,
    title: 'Potometer Transpiration Rate Prediction',
    question: 'In a Ganong potometer setup, if relative humidity increases from 40% to 100% while sunlight remains constant, what will happen to the capillary bubble speed?',
    options: [
      'The bubble will accelerate to maximum speed due to excess atmospheric moisture.',
      'The bubble speed will drastically slow down close to zero because the water vapour gradient is flattened.',
      'The bubble will immediately reverse direction and move backwards towards the plant reservoir.',
      'The bubble speed will remain identical regardless of air humidity.',
    ],
    correctIndex: 1,
    explanation: 'Transpiration is driven by the water vapour concentration gradient between leaf substomatal cavities and ambient air. At 100% humidity, diffusion stops and potometer bubble movement stalls.',
    verifyInstruction: 'In Exploration Lab 4, drag the Humidity slider to 100% and watch the capillary bubble come to a complete halt on the canvas!',
  },
];

// ─── BRILLIANT OBSERVATION QUESTIONS (What Do You Notice? Pattern) ───
export interface ObservationQuestion {
  id: string;
  nodeId: string;
  title: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  observableOptions: string[];
}

export const OBSERVATION_QUESTIONS = [
  {
    id: 'obs_bio_001',
    nodeId: NODE_C10_BIO_001,
    title: 'Chromosome Coiling Observation',
    question: 'As you drag the Condensation Slider from 0% (loose chromatin) to 100% (metaphase chromosome), what primary structural change occurs?',
    options: [
      'The DNA strands decompose into separate individual nucleoside molecules.',
      'Thin 2nm/11nm beads-on-a-string fold progressively into dense 30nm loops and finally compact into 1400nm sister chromatids joined at a centromere.',
      'The centromere dissolves and separates into free centrioles in the cytoplasm.',
      'The chromatin thread changes color without changing its physical packing diameter.',
    ],
    correctIndex: 1,
    explanation: 'Histone octamers act as spools around which DNA winds to form 11nm nucleosomes, which supercoil into 30nm solenoid fibers and finally metaphase chromosomes.',
    observableOptions: [
      'Thin blue DNA threads wind tightly around green histone octamers (H8)',
      'Solenoid loops form intermediate condensed clusters at 50% slider value',
      'Two identical sister chromatids emerge locked at a central red centromere at 100%',
    ],
  },
  {
    id: 'obs_bio_002',
    nodeId: NODE_C10_BIO_009,
    title: 'Auxin Redistribution Observation',
    question: 'When the incident light angle slider is moved from center to the far right (+90°), what do you observe regarding the red auxin hormone granules and stem curvature?',
    options: [
      'Auxin particles concentrate heavily on the lit right side, causing the right flank to lengthen.',
      'Auxin particles migrate away from the light to accumulate on the shaded left flank, causing the shoot to bend towards the right.',
      'Auxin particles evaporate completely into the surrounding air.',
      'The stem straightens out and stops growing entirely.',
    ],
    correctIndex: 1,
    explanation: 'Auxin is photosensitive and actively transported to the shaded flank. Higher auxin concentration stimulates cell elongation on the shaded side, producing phototropic bending towards light.',
    observableOptions: [
      'Red auxin granules migrate laterally to the darker shaded flank',
      'The stem curves progressively towards the incident angle of the sun',
      'Cells on the shaded side undergo greater elongation than those on the lit side',
    ],
  },
];

// ─── CHALLENGE INTERFACE ───
interface Challenge {
  id: string;
  nodeId: string;
  type: 'classify' | 'distinguish' | 'match' | 'drag-label' | 'drag-sort' | 'numeric' | 'construct';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: 'recall' | 'understanding' | 'application' | 'analysis' | 'evaluation' | 'creativity';
  question: string;
  options?: string[];
  correctIndex?: number;
  dragItems?: { label: string; targetId: string }[];
  correctMapping?: Record<string, string>;
  sortItems?: string[];
  correctOrder?: number[];
  correctAnswer?: number;
  tolerance?: number;
  unit?: string;
  availableParts?: string[];
  targetState?: string;
  validationHint?: string;
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
}

// ─── CHALLENGES ARRAY (22 Progressive Challenges) ───
const CHALLENGES: Challenge[] = [
  // 1. Foundation - Chromosome Structure (Recall)
  {
    id: 'ch_bio_001_recall',
    nodeId: NODE_C10_BIO_001,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the primary constriction point where two sister chromatids are held together and spindle fibres attach during cell division?',
    options: ['Centrosome', 'Centromere', 'Telomere', 'Nucleosome'],
    correctIndex: 1,
    explanation: 'The centromere is the primary constriction holding sister chromatids together where kinetochores attach spindle fibres. Do not confuse with centrosome (the organelle containing centrioles).',
    hints: [
      'It is the pinched waist in the middle of a replicated chromosome.',
      'It sounds like "centrosome", but specifically ends with "-mere".',
      'The centromere joins two identical sister chromatids.',
    ],
    misconceptionIndex: 0,
  },
  // 2. Foundation - Drag Label Chromosome Structure (Understanding)
  {
    id: 'ch_bio_002_drag_label',
    nodeId: NODE_C10_BIO_001,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag each cytological label to its correct anatomical target on the replicated chromosome diagram.',
    dragItems: [
      { label: 'Sister Chromatid', targetId: 't_chromatid' },
      { label: 'Centromere', targetId: 't_centromere' },
      { label: 'Gene Locus (DNA segment)', targetId: 't_gene' },
      { label: 'Histone Core Octamer', targetId: 't_histone' },
    ],
    correctMapping: {
      t_chromatid: 'Sister Chromatid',
      t_centromere: 'Centromere',
      t_gene: 'Gene Locus (DNA segment)',
      t_histone: 'Histone Core Octamer',
    },
    explanation: 'A replicated chromosome consists of two sister chromatids joined at the centromere. Genes are linear sequences on the DNA molecule wrapped around histone octamers forming nucleosomes.',
    hints: [
      'The central pinch is the centromere.',
      'The two identical vertical arms are sister chromatids.',
      'DNA segments that code for traits are genes, wrapped around histone protein cores.',
    ],
  },
  // 3. Standard - Cell Cycle DNA Content (Application)
  {
    id: 'ch_bio_003_numeric',
    nodeId: NODE_C10_BIO_002,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A human lymphocyte has 6 picograms (pg) of DNA in its G1 phase. How many picograms of DNA will the same cell have at the end of the S (Synthesis) phase?',
    correctAnswer: 12,
    tolerance: 0,
    unit: 'pg',
    explanation: 'During S phase of interphase, semi-conservative DNA replication occurs. The DNA content doubles from 2C to 4C (6 pg × 2 = 12 pg), while the chromosome count (46) remains constant.',
    hints: [
      'In S phase, DNA replicates so that each chromosome has two chromatids.',
      'The DNA content doubles exactly from 2n equivalent (2C) to 4C.',
      '6 multiplied by 2 gives the total post-replication DNA quantity in picograms.',
    ],
  },
  // 4. Standard - Cell Cycle Sequence (Analysis)
  {
    id: 'ch_bio_004_drag_sort',
    nodeId: NODE_C10_BIO_002,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the sequential phases of the eukaryotic cell cycle in chronological order starting immediately after a new cell is formed.',
    sortItems: [
      'G1 Phase (Organelle duplication & active cell growth)',
      'S Phase (DNA replication doubling DNA content)',
      'G2 Phase (Spindle protein synthesis & ATP storage)',
      'M Phase (Karyokinesis followed by Cytokinesis)',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'The cell cycle strictly progresses through Interphase (G1 -> S -> G2) followed by the Mitotic (M) phase. Skipping or reversing order causes checkpoint arrest.',
    hints: [
      'Growth occurs first right after division (Gap 1).',
      'Synthesis of DNA comes next (S).',
      'Gap 2 prepares the spindle apparatus before the actual M phase division.',
    ],
  },
  // 5. Standard - Mitosis Stages Order (Understanding)
  {
    id: 'ch_bio_005_drag_sort',
    nodeId: NODE_C10_BIO_003,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Order the four sequential stages of nuclear division (karyokinesis) in mitosis.',
    sortItems: [
      'Prophase (Chromatin condenses into chromosomes, nuclear membrane dissolves)',
      'Metaphase (Chromosomes align along the equatorial plate)',
      'Anaphase (Centromeres split and sister chromatids separate to opposite poles)',
      'Telophase (Chromatids decondense and nuclear membranes reform at poles)',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'The mnemonic PMAT represents Prophase -> Metaphase -> Anaphase -> Telophase, which is immediately followed by cytokinesis.',
    hints: [
      'Remember the acronym P-M-A-T.',
      'Prophase packs the DNA, Metaphase meets in the middle.',
      'Anaphase pulls apart, Telophase terminates nuclear division with two nuclei.',
    ],
  },
  // 6. Foundation - Plant vs Animal Cytokinesis (Distinguish)
  {
    id: 'ch_bio_006_distinguish',
    nodeId: NODE_C10_BIO_003,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why does cytokinesis in onion root tip cells occur via a cell plate rather than a cleavage furrow?',
    options: [
      'Plant cells lack plasma membranes so furrowing is impossible.',
      'The rigid cellulose cell wall prevents the plasma membrane from pinching inward.',
      'Plant cells do not divide their cytoplasm at all.',
      'Plant cells have asters that pull the cell plate into place.',
    ],
    correctIndex: 1,
    explanation: 'Plant cells have a rigid cellulose cell wall that cannot be pinched inward. Instead, Golgi-derived phragmoplast vesicles fuse at the equator to form a centrifugal cell plate.',
    hints: [
      'Think about the physical barrier outside plant cell membranes.',
      'Cellulose cell walls are rigid and inelastic.',
      'Animal cells pinch inward with a cleavage furrow; plants construct a new dividing wall.',
    ],
  },
  // 7. Standard - Mitosis vs Meiosis (Analysis)
  {
    id: 'ch_bio_007_classify',
    nodeId: NODE_C10_BIO_004,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'In tea plant floral anthers, microspore mother cells (2n = 30) undergo meiosis. What will be the chromosome number and total cell count resulting from one parent cell?',
    options: [
      '2 daughter cells, each with 30 chromosomes',
      '4 daughter cells, each with 15 chromosomes',
      '4 daughter cells, each with 30 chromosomes',
      '2 daughter cells, each with 15 chromosomes',
    ],
    correctIndex: 1,
    explanation: 'Meiosis is reduction division involving two nuclear divisions. One diploid parent cell (2n = 30) produces 4 haploid gametic cells (n = 15).',
    hints: [
      'Meiosis is reduction division (2n -> n).',
      'Meiosis results in two successive divisions producing 4 daughter cells.',
      'Halve 30 to get 15 chromosomes per daughter cell.',
    ],
  },
  // 8. Advanced - Crossing Over & Chiasmata (Evaluation)
  {
    id: 'ch_bio_008_evaluation',
    nodeId: NODE_C10_BIO_004,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'During Meiosis I in Darjeeling tea plants, homologous chromosomes undergo synapsis and crossing over at chiasmata. What is the fundamental biological significance of this event?',
    options: [
      'It doubles the chromosome number to prevent species extinction.',
      'It creates new combinations of maternal and paternal alleles, providing genetic variation.',
      'It prevents spindle fibres from attaching to kinetochores.',
      'It converts plant cells into animal cells.',
    ],
    correctIndex: 1,
    explanation: 'Crossing over between non-sister chromatids of homologous pairs during pachytene of Prophase I creates novel allele recombinations, driving genetic diversity and evolutionary adaptation.',
    hints: [
      'Why do siblings look different from each other even with the same parents?',
      'Crossing over swaps segments between homologous chromosomes.',
      'This genetic shuffling creates variation for natural selection.',
    ],
  },
  // 9. Standard - Root Tonicity & Plasmolysis (Application)
  {
    id: 'ch_bio_009_classify',
    nodeId: NODE_C10_BIO_005,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A farmer over-fertilises a wheat plot with concentrated potassium nitrate crystals. The soil solution becomes hypertonic. What will happen to root hair cells?',
    options: [
      'Water enters by endosmosis; root cells burst.',
      'Water exits by exosmosis; protoplasm shrinks from the cell wall causing plasmolysis and wilting.',
      'Active transport of water into roots accelerates tenfold.',
      'No effect occurs because root hairs are waterproof.',
    ],
    correctIndex: 1,
    explanation: 'When soil water is hypertonic (higher solute concentration than cell sap), water leaves root cells by exosmosis. Protoplasm pulls away from the cell wall (plasmolysis), causing physiological drought and wilting.',
    hints: [
      'Hypertonic means more concentrated in solutes than cell sap.',
      'Water always moves from higher water concentration (dilute) to lower water concentration (concentrated).',
      'Exosmosis causes the cell to become flaccid and plasmolysed.',
    ],
    misconceptionIndex: 3,
  },
  // 10. Foundation - Imbibition vs Osmosis (Distinguish)
  {
    id: 'ch_bio_010_distinguish',
    nodeId: NODE_C10_BIO_005,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Dry gram seeds soaked in water swell up and rupture their seed coats. This initial rapid uptake of water by colloidal cell walls is due to:',
    options: ['Active Transport', 'Imbibition', 'Plasmolysis', 'Guttation'],
    correctIndex: 1,
    explanation: 'Imbibition is the adsorption/absorption of water by hydrophilic colloids (cellulose, proteins, starch) without forming a solution, creating immense swelling pressure.',
    hints: [
      'It is a surface-adsorption phenomenon seen in dry seeds and wooden doors in the monsoon.',
      'It does not require a semi-permeable membrane.',
      'The term is imbibition.',
    ],
  },
  // 11. Standard - Ascent of Sap Forces (Analysis)
  {
    id: 'ch_bio_011_construct',
    nodeId: NODE_C10_BIO_006,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Assemble the primary forces that sustain an unbroken 50-metre water column up a Himalayan Cedar (Deodar) xylem in correct functional combination.',
    availableParts: ['Transpirational Pull', 'Cohesion (H-bonds)', 'Adhesion (Xylem wall)', 'Root Pressure'],
    targetState: 'Transpirational Pull Cohesion (H-bonds) Adhesion (Xylem wall)',
    validationHint: 'Select the 3 synergistic forces that explain Dixon and Joly’s physical ascent of sap theory (suction at top + water-water bonding + water-wall bonding).',
    explanation: 'Transpirational pull creates negative tension at the top, cohesion (hydrogen bonds between water molecules) prevents column breakage, and adhesion (attraction to lignified xylem walls) prevents meniscus collapse.',
    hints: [
      'Select transpirational pull as the main suction force.',
      'Add cohesion between water molecules.',
      'Add adhesion between water and xylem cell walls.',
    ],
  },
  // 12. Standard - Water Pathway in Roots (Understanding)
  {
    id: 'ch_bio_012_drag_sort',
    nodeId: NODE_C10_BIO_006,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Trace the anatomical path of absorbed water from the soil solution to the stem xylem vessels.',
    sortItems: [
      'Root hair epidermis',
      'Cortical cells (cortex)',
      'Endodermis with Casparian strips',
      'Pericycle and Xylem vessels',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Water flows from Root Hair -> Cortex -> Endodermis -> Pericycle -> Protoxylem -> Metaxylem vessels.',
    hints: [
      'Water enters outermost root hairs first.',
      'Then traverses the multi-layered cortex.',
      'Passes through the single endodermal ring before reaching pericycle and xylem core.',
    ],
  },
  // 13. Advanced - Potassium Ion Stomatal Mechanism (Analysis)
  {
    id: 'ch_bio_013_classify',
    nodeId: NODE_C10_BIO_007,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'According to the active K+ transport theory (Levitt), why do stomata OPEN when exposed to morning sunlight?',
    options: [
      'K+ is pumped out of guard cells, causing water loss and pore closure.',
      'Active influx of K+ into guard cells lowers water potential; water enters by endosmosis, guard cells become turgid and curve outward.',
      'Sunlight breaks down guard cell walls completely.',
      'Carbon dioxide is solidified inside the stomatal pore.',
    ],
    correctIndex: 1,
    explanation: 'In light, guard cells actively pump K+ in using ATP. This hypertonic state induces endosmosis; turgid guard cells with thicker inner walls bow outwards, opening the stomatal aperture.',
    hints: [
      'Light stimulates active ATP-driven influx of Potassium (K+) ions.',
      'Higher solutes inside guard cells suck water in by endosmosis.',
      'Turgid guard cells with thick inner walls bend outward to open the pore.',
    ],
  },
  // 14. Standard - Ganong Potometer Calculation (Application)
  {
    id: 'ch_bio_014_numeric',
    nodeId: NODE_C10_BIO_007,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In a Ganong potometer experiment, the air bubble travels 15 cm along the graduated capillary tube in 30 minutes. What is the rate of transpiration in cm/hour?',
    correctAnswer: 30,
    tolerance: 0,
    unit: 'cm/hour',
    explanation: 'Rate = Distance / Time = 15 cm / 0.5 hour = 30 cm/hour (or 15 cm in 30 min = 30 cm in 60 min).',
    hints: [
      'Convert 30 minutes into hours (0.5 hours).',
      'Divide 15 cm by 0.5 hours.',
      'Or simply double the distance travelled in half an hour.',
    ],
  },
  // 15. Advanced - Transpiration vs Guttation (Distinguish)
  {
    id: 'ch_bio_015_distinguish',
    nodeId: NODE_C10_BIO_007,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'On a humid monsoon morning in Kerala, water droplets appear along tomato leaf margins. Distinguish this guttation from transpiration.',
    options: [
      'Guttation is loss of water vapour through stomata driven by sunlight.',
      'Guttation is loss of liquid water containing dissolved minerals through hydathodes driven by high root pressure.',
      'Guttation is identical to dew condensation from the atmosphere.',
      'Guttation occurs only when photosynthesis produces excess oil.',
    ],
    correctIndex: 1,
    explanation: 'Guttation is the exudation of liquid droplets through specialised hydathodes at leaf margins caused by high root pressure when transpiration is suppressed in 100% humidity.',
    hints: [
      'Transpiration is water VAPOUR through STOMATA.',
      'Guttation is LIQUID DROPLETS through HYDATHODES at leaf margins.',
      'Guttation is driven by positive hydrostatic ROOT PRESSURE.',
    ],
    misconceptionIndex: 2,
  },
  // 16. Foundation - Chloroplast Reaction Sites (Recall)
  {
    id: 'ch_bio_016_match',
    nodeId: NODE_C10_BIO_008,
    type: 'match',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Where precisely do the Light (Photochemical) and Dark (Biosynthetic / Calvin) reactions occur inside a chloroplast?',
    options: [
      'Light reaction in Stroma; Dark reaction in Grana thylakoids',
      'Light reaction in Thylakoid membranes of Grana; Dark reaction in Stroma matrix',
      'Light reaction in Outer membrane; Dark reaction in Nucleolus',
      'Both reactions occur exclusively inside the central vacuole',
    ],
    correctIndex: 1,
    explanation: 'Chlorophyll pigments on thylakoid membranes harvest photons and split water in the Light Reaction; carbon fixation enzymes (e.g., RuBisCO) in the stroma fluid matrix drive the Dark Reaction.',
    hints: [
      'Grana thylakoids contain the green chlorophyll solar panels.',
      'Stroma is the enzyme-rich fluid where CO2 is converted to glucose.',
      'Light = Thylakoids/Grana; Dark = Stroma.',
    ],
  },
  // 17. Standard - Photosynthesis Photolysis Products (Understanding)
  {
    id: 'ch_bio_017_classify',
    nodeId: NODE_C10_BIO_008,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'During photolysis of water in the light reaction (2H2O -> 4H+ + 4e- + O2), what is the source of the oxygen gas released into the atmosphere?',
    options: [
      'Atmospheric Carbon Dioxide (CO2)',
      'Water molecules (H2O) absorbed by roots',
      'Glucose breakdown in mitochondria',
      'Nitrate salts in the soil',
    ],
    correctIndex: 1,
    explanation: 'Ruben and Kamen proved via oxygen isotope (O-18) tracing that all oxygen gas liberated during photosynthesis originates from the photolysis of water (H2O), not carbon dioxide.',
    hints: [
      'Photolysis literally means light-induced splitting of WATER.',
      'Water (H2O) splits into protons, electrons, and molecular oxygen (O2).',
      'Oxygen comes from H2O, not CO2.',
    ],
  },
  // 18. Standard - Auxin Phototropism Mechanism (Analysis)
  {
    id: 'ch_bio_018_classify',
    nodeId: NODE_C10_BIO_009,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A mustard seedling on a windowsill bends towards unilateral sunlight. Explain the auxin hormone distribution that causes this phototropic curvature.',
    options: [
      'Auxin accumulates on the lit side, causing lit cells to stop growing.',
      'Auxin diffuses to the shaded side, stimulating greater cell elongation there so the shoot bends towards the light.',
      'Auxin evaporates on the shaded side, causing the plant to dry out.',
      'Auxin is destroyed in the roots, stopping all growth.',
    ],
    correctIndex: 1,
    explanation: 'Auxin is photosensitive and migrates to the shaded side of the shoot apex. Higher auxin concentration promotes cell elongation on the shaded side, curving the shoot tip towards the light.',
    hints: [
      'Auxin dislikes direct light and moves to the dark/shaded flank.',
      'Auxin in stems STIMULATES cell elongation.',
      'Longer cells on the shaded side force the stem to bend towards the source of light.',
    ],
  },
  // 19. Foundation - Plant Hormones & Functions (Recall)
  {
    id: 'ch_bio_019_match',
    nodeId: NODE_C10_BIO_009,
    type: 'match',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Match the plant growth regulator to its primary physiological function in commercial agriculture:',
    options: [
      'Abscisic Acid (ABA) -> Promotes rapid stem elongation in dwarf cabbage',
      'Ethylene -> Gaseous hormone promoting fruit ripening in mangoes & bananas',
      'Cytokinin -> Induces leaf shedding and winter bud dormancy',
      'Gibberellin -> Closes stomata during drought stress',
    ],
    correctIndex: 1,
    explanation: 'Ethylene (C2H4) is the only gaseous phytohormone, widely used commercially to ripen mangoes, bananas, and tomatoes, and induce leaf abscission.',
    hints: [
      'Think of the gas used in fruit godowns in India.',
      'ABA is the stress hormone; Cytokinin delays ageing; Gibberellin elongates stems.',
      'Ethylene is the gaseous fruit-ripening hormone.',
    ],
  },
  // 20. Standard - Inspiration Respiratory Mechanics (Analysis)
  {
    id: 'ch_bio_020_classify',
    nodeId: NODE_C10_BIO_010,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'During active inspiration in humans, how do the diaphragm and intercostal muscles generate air inflow?',
    options: [
      'Diaphragm relaxes (domes up) and intercostals relax, decreasing thoracic volume and raising lung pressure.',
      'Diaphragm contracts (flattens down) and external intercostals pull ribs upward/outward, increasing thoracic volume and lowering alveolar pressure below atmospheric pressure.',
      'Lungs actively inflate by muscle fibers embedded inside the alveoli walls.',
      'Air is pumped into the trachea by voluntary stomach contractions.',
    ],
    correctIndex: 1,
    explanation: 'Inspiration is an active process: diaphragm contraction flattens it downward, external intercostals elevate the ribcage. By Boyle’s Law, increased volume decreases intrapulmonary pressure, drawing air in down the pressure gradient.',
    hints: [
      'Contracting the diaphragm flattens it like pulling a syringe plunger.',
      'Thoracic volume increases, so pressure inside lungs decreases.',
      'Air naturally rushes from high atmospheric pressure to lower alveolar pressure.',
    ],
    misconceptionIndex: 4,
  },
  // 21. Advanced - High Altitude Hypoxia Compensation (Evaluation)
  {
    id: 'ch_bio_021_evaluation',
    nodeId: NODE_C10_BIO_010,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'An Indian mountaineer at Khardung La Pass (5,359 m) experiences hypoxia despite hyperventilating. Why does rapid breathing alone fail to restore normal arterial oxygen saturation without acclimatisation?',
    options: [
      'Atmospheric total oxygen percentage drops from 21% to 0%.',
      'The partial pressure of oxygen (pO2) in ambient air is low, reducing the alveolar diffusion gradient into haemoglobin; long-term compensation requires increased erythropoietin (RBC production).',
      'High altitude freezes the pulmonary surfactant instantly.',
      'Lungs permanently shrink to half their vital capacity.',
    ],
    correctIndex: 1,
    explanation: 'Gas diffusion across alveolar-capillary membranes is driven by the partial pressure gradient (pO2). At high altitudes, total atmospheric pressure drops, reducing alveolar pO2. Acclimatisation requires days for kidneys to secrete erythropoietin, increasing RBC count and haemoglobin concentration.',
    hints: [
      'Oxygen is still 21% of air, but the atmospheric pressure is far lower.',
      'Diffusion depends on the partial pressure difference across the alveolar membrane.',
      'Acclimatisation requires the body to manufacture millions more Red Blood Cells (RBCs).',
    ],
  },
  // 22. Advanced - Design a Drought-Resistant Stomatal Response (Creativity)
  {
    id: 'ch_bio_022_creativity',
    nodeId: NODE_C10_BIO_007,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Construct the emergency biochemical pathway used by a xerophytic plant during extreme 45°C afternoon heat in Rajasthan to prevent fatal water loss.',
    availableParts: ['Soil water deficit', 'ABA synthesis in roots', 'ABA transported to leaves', 'K+ efflux from guard cells', 'Guard cells flaccid / Stomata close'],
    targetState: 'Soil water deficit ABA synthesis in roots ABA transported to leaves K+ efflux from guard cells Guard cells flaccid / Stomata close',
    validationHint: 'Link the stress signal from root desiccation to hormone release, guard cell ion exit, and pore closure.',
    explanation: 'Under drought stress: Soil deficit triggers ABA synthesis in roots -> ABA travels in xylem to leaves -> Triggers rapid K+ ion efflux from guard cells -> Exosmosis makes guard cells flaccid -> Stomatal pore closes immediately, cutting transpiration loss.',
    hints: [
      'Start with root water shortage (Soil water deficit).',
      'Synthesise Abscisic Acid (ABA) and transport it up to the leaves.',
      'Drive K+ ions OUT of guard cells so they become flaccid and shut the pore.',
    ],
  },
  // ─── Class 10 board-depth additions: sex determination, acquired-vs-inherited, evolution ───
  {
    id: 'ch_bio_depth_sex_determination',
    nodeId: NODE_C10_BIO_001,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A couple has three daughters. The grandmother blames the father. Evaluate the genetics, and compare human (XX/XY) sex determination with birds (ZZ/ZW).',
    options: [
      'The father determines the sex: mothers are XX and give only an X ovum; fathers are XY and the sperm (X or Y) decides. Blaming the mother is biologically wrong. In birds the pattern REVERSES: males are ZZ (homogametic), females ZW (heterogametic) -- so the EGG determines bird sex',
      'Mothers determine sex in humans; birds follow the same pattern as humans',
      'Both parents always determine sex equally in every species',
      'Sex is decided by incubation temperature in humans and birds alike'
    ],
    correctIndex: 0,
    explanation: 'Human cross: mother XX x father XY -> 1/2 XX (girl), 1/2 XY (boy) -- a 50:50 Mendel-like ratio each pregnancy, independent of previous children. The claim that timing intercourse or the father\'s "strength" selects sex is a misconception: it is a 1:1 chance event. Some students argue a son "must come eventually" -- every pregnancy remains an independent 50% event.',
    hints: [
      'Which parent makes the two kinds of gametes?',
      'ZZ/ZW: which bird parent is heterogametic?',
      'Three daughters change nothing about the fourth pregnancy.'
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_bio_depth_acquired_vs_inherited',
    nodeId: NODE_C10_BIO_002,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A person loses a finger in an accident; a farmer saves seed only from well-fertilised long-eared wheat. Evaluate what the next generation inherits, and classify: scar, low weight at birth, learnt dance style.',
    options: [
      'Only GERMLINE (reproductive-cell) changes are inherited: an accident, exercise, fertilizer-induced long ears and a scar are ACQUIRED traits confined to body cells (soma), so they die with the individual; low weight from poor maternal nutrition is also acquired (no DNA change); a learnt dance is acquired too. Mice with tails surgically removed for 20 generations still breed tailed mice -- Weismann\'s experiment',
      'All body changes pass to offspring automatically',
      'Fertilizer-grown long ears will fix themselves in the seed',
      'Cut tails become shorter over generations by practice'
    ],
    correctIndex: 0,
    explanation: 'Acquired vs inherited hinges on WHERE the change sits: somatic cells vs germ cells (DNA of gametes). Lamarck\'s "use and disuse" inheritance fails -- Weismann cut mouse tails for 20 generations with zero shortening. Wheat selected under fertilizer reverts when the fertilizer stops: the EARS were long because of the environment, not the genotype.',
    hints: [
      'Ask of every trait: did a GAMETE\'s DNA change?',
      'Weismann\'s mice: 20 generations, still tailed.',
      'Better fertilizer changes the plant, not its seeds\' DNA.'
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_bio_depth_natural_selection',
    nodeId: NODE_C10_BIO_003,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Green bushes hold green and brown beetles; crows eat the beetles. And in a hospital, antibiotic X at first cures an infection, then fails. Explain both with selection, and contrast Darwin with Lamarck on giraffe necks.',
    options: [
      'Beetles: green camouflage survives, browns are eaten -> green allele frequency rises (natural selection of HERITABLE variation). Antibiotics: the drug kills sensitive bacteria; the few RESISTANT mutants survive and multiply -- selection pressure, not individual "learning". Darwin: giraffes born with longer necks out-competed and bred (variation acted on); Lamarck: necks stretched by reaching and the stretch was inherited -- rejected',
      'Beetles change colour during their lives to match bushes; bacteria become resistant because each cell learns the drug',
      'Lamarck won the giraffe debate; Darwin proposed use-and-disuse',
      'Selection acts on individuals changing themselves, not on variant frequencies'
    ],
    correctIndex: 0,
    explanation: 'Both stories are the same logic: pre-existing HERITABLE variation + environmental filter = changed population. Design a no-lab thought experiment: breed fast- and slow-reproducing beans in mixed soil -- only if the speed difference is heritable does the population shift, proving selection REQUIRES heritable variation.',
    hints: [
      'Where was the variant BEFORE the pressure appeared?',
      'Antibiotic resistance = survival of pre-existing mutants, not self-training.',
      'Darwin selected among variants; Lamarck invented then inherited them.'
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_bio_depth_speciation',
    nodeId: NODE_C10_BIO_004,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Define speciation and its two essential conditions. A flowering population splits into March-bloomers and May-bloomers that no longer interbreed. What is this barrier, and contrast a pre-zygotic with a post-zygotic mechanism.',
    options: [
      'Speciation = one species splitting into two that can no longer interbreed; needs (1) GEOGRAPHICAL/genetic isolation and (2) accumulation of enough heritable differences that gene flow stops. Different flowering times are a PRE-ZYGotic (temporal) barrier -- gametes never meet; a POST-zygotic barrier acts after fertilisation (hybrid sterile, like a mule)',
      'Speciation needs no isolation; temporal flowering is post-zygotic; a mule is a new species',
      'Speciation happens within one breeding season with no barriers',
      'Post-zygotic barriers stop pollen transfer before fertilisation'
    ],
    correctIndex: 0,
    explanation: 'Field-study design: sample two butterfly populations along a gradient, record mating pairs, morphology and ( ethically) territory overlap; if gene flow is zero and traits diverge, speciation is under way. Indian fauna example: pre-zygotic = different breeding calls of frogs; post-zygotic = sterile hybrid offspring in captivity.',
    hints: [
      'The barrier question: do gametes meet, or does the zygote fail?',
      'Isolation + heritable divergence = the two conditions.',
      'A sterile mule is the textbook post-zygotic example.'
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_bio_depth_evolution_evidence',
    nodeId: NODE_C10_BIO_004,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A fossil bone holds 12.5% of its original carbon-14 (half-life 5730 years). Bat, whale and human forelimbs share humerus-radius-ulna arrangement; butterfly and bat wings both fly. Read all three as evolution evidence.',
    options: [
      '12.5% = three half-lives -> about 17,190 years old (fossil dating). Shared forelimb PLAN with different functions = HOMOLOGOUS organs (common ancestry, divergent evolution). Butterfly wing (no bones) vs bat wing (bones) = ANALOGOUS organs (same function, different structure, convergent evolution). Glossopteris and Mesosaurus fossils on separated continents support continental drift',
      'The fossil is 5730 years old; the forelimbs are analogous; the wings are homologous',
      'Carbon dating proves nothing; organs with the same function are always homologous',
      'Fossils form in igneous rocks; continental drift has no fossil evidence'
    ],
    correctIndex: 0,
    explanation: 'Half-life arithmetic: 100 -> 50 -> 25 -> 12.5% = 3 x 5730 = 17,190 years. Homologous = same structure, different function (divergent evolution); analogous = different structure, same function (convergent evolution, butterfly vs bat wings). Glossopteris (seed fern) and Mesosaurus (freshwater reptile) fossils on now-separated continents support continental drift. Evolution has no goal: the Antarctic icefish "lost" haemoglobin and survived; cave fish lose eyes -- evolution can run backwards (non-directional). Classroom dice activity: roll dice to "select" survivors at random -- populations drift without direction, showing evolution is not a ladder to humans. Field investigation: in a Deccan road-cut, photograph fossil layers, note the sedimentary rock type and compare with museum specimens for relative dating.',
    hints: [
      'Count the halvings: 100 -> 50 -> 25 -> 12.5.',
      'Structure first, function second: same+different vs different+same.',
      'Evolution is a branching bush, not a ladder.'
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_bio_depth_icefish_trajectory',
    nodeId: NODE_C10_BIO_005,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Evaluate: "If we replayed the tape of life from the Cambrian, humans would inevitably evolve again." Contrast the vertebrate eye\'s elaboration with the cave fish Astyanax losing its eyes.',
    options: [
      'FALSE -- evolution is non-directional and contingent: the eye elaborated step-by-step under selection FOR image formation, while cave fish LOST eyes where energy-saving blindness survived better; replaying history with different mutations and environments gives different outcomes, not guaranteed humans',
      'True -- evolution is a straight ladder aimed at humans',
      'False because evolution happens only in caves',
      'True because the eye proves every lineage must build eyes'
    ],
    correctIndex: 0,
    explanation: 'Comparing trajectories: (a) vertebrate eye = cumulative SELECTION building complexity; (b) Astyanax = regressive evolution (loss under cave conditions); (c) icefish = loss of haemoglobin in cold, oxygen-rich water. Gains and LOSSES both occur -- complexity is not destiny. Paper-dice classroom activity: each roll a random "mutation", teacher calls an "environment"; different environment orders give different lineages -- non-directional evolution demonstrated with paper and pens.',
    hints: [
      'Is there a target in evolution? Where would it sit?',
      'Eyes can be gained AND lost -- what does that do to "inevitable"?',
      'Random mutation + local selection = contingency, not destiny.'
    ],
    misconceptionIndex: 0,
  }
];

// ─── PROPS INTERFACE ───
interface Props {
  nodeId?: string;
  title?: string;
  definition?: string;
  eli5?: string;
  misconceptions?: { misconception: string; correction: string }[];
  diagnosticQuestions?: { question: string; options: string[]; correctIndex: number }[];
  masteryCriteria?: string;
  onComplete?: (score: number) => void;
}

// ─── DEFAULT PROPS ───
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C10_BIO_001,
  title: 'Chromosome Structure, Cell Division & Plant Physiology',
  definition: 'A comprehensive ICSE Class 10 biological simulation covering chromosome packaging, cell cycle dynamics, mitotic and meiotic divisions, root absorption by osmosis and turgor, xylem sap ascent, stomatal transpiration, photosynthesis dual-reactions, phytohormone coordination, and respiratory mechanics.',
  eli5: 'Life is like an ultra-organised city: DNA is the architect blueprint coiled onto chromosome spools; mitosis photocopies cells for growth; roots drink water using osmotic pressure; leaves sweat and harness sunlight to build sugar; and hormones steer growth toward the sun while our lungs exchange vital gases!',
  misconceptions: [
    {
      misconception: 'Chromatin and chromosomes are different chemical substances.',
      correction: 'Chromatin and chromosomes are the SAME substance (DNA wrapped around histone proteins) in different states of coiling and condensation.',
    },
    {
      misconception: 'Sister chromatids separate during Prophase of mitosis.',
      correction: 'Sister chromatids remain joined at the centromere until Anaphase, where the centromere splits and spindle fibres pull them apart.',
    },
    {
      misconception: 'Transpiration is just waste water loss identical to guttation.',
      correction: 'Transpiration is evaporation of water vapour through stomata creating suction pull, while guttation is liquid water exudation through hydathodes driven by root pressure.',
    },
    {
      misconception: 'Osmosis moves water from hypertonic to hypotonic solutions.',
      correction: 'Water always moves by osmosis from HYPOTONIC (dilute, high water concentration) to HYPERTONIC (concentrated, low water concentration) through a semi-permeable membrane.',
    },
    {
      misconception: 'We breathe by actively sucking air in using our lungs as pumps.',
      correction: 'Lungs are passive elastic organs; breathing is driven by diaphragm and rib muscle contractions that change thoracic volume, creating pressure gradients.',
    },
  ],
  diagnosticQuestions: [
    { question: 'What joins two sister chromatids together?', options: ['Centrosome', 'Centromere', 'Aster', 'Spindle fiber'], correctIndex: 1 },
    { question: 'In which cell cycle phase does DNA replication occur?', options: ['G1 Phase', 'S Phase', 'G2 Phase', 'M Phase'], correctIndex: 1 },
    { question: 'What is the end product of Meiosis from a 2n cell?', options: ['2 identical 2n cells', '4 haploid n gametes', '2 haploid n cells', '4 identical 2n cells'], correctIndex: 1 },
    { question: 'What happens to a plant cell in a hypertonic solution?', options: ['Becomes turgid', 'Undergoes plasmolysis', 'Bursts immediately', 'Undergoes endosmosis'], correctIndex: 1 },
    { question: 'Which force provides the main upward pull for ascent of sap?', options: ['Root pressure', 'Transpirational pull', 'Atmospheric pressure', 'Imbibition'], correctIndex: 1 },
    { question: 'Which ion actively pumps into guard cells to OPEN stomata in sunlight?', options: ['Sodium (Na+)', 'Potassium (K+)', 'Calcium (Ca2+)', 'Chloride (Cl-)'], correctIndex: 1 },
    { question: 'Where do the light-dependent reactions of photosynthesis occur?', options: ['Stroma matrix', 'Thylakoid membranes of grana', 'Outer chloroplast membrane', 'Vacuole'], correctIndex: 1 },
    { question: 'Which gaseous plant hormone triggers fruit ripening?', options: ['Auxin', 'Gibberellin', 'Ethylene', 'Abscisic Acid'], correctIndex: 2 },
  ],
  masteryCriteria: 'Demonstrate deep understanding of chromosome architecture, cell divisions, root water absorption, transpiration pull, photosynthesis, plant hormones, and human respiratory mechanics across recall, analysis, application, and evaluation competency tiers.',
};

// ─── EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: '1. Chromosome Coiling & Nucleosome Packaging',
    instruction: 'Drag the Condensation Slider to pack loose chromatin threads into a condensed metaphase chromosome.',
    interactionType: 'slider-condensation',
    nodeId: NODE_C10_BIO_001,
  },
  {
    title: '2. Cell Cycle & DNA Content Multiplier',
    instruction: 'Advance through G1, S, G2, and M phases to watch DNA content double from 2C to 4C before dividing.',
    interactionType: 'cycle-stepper',
    nodeId: NODE_C10_BIO_002,
  },
  {
    title: '3. Plant Cell Osmosis & Tonicity Lab',
    instruction: 'Vary the external salt concentration slider from 0% (Hypotonic) to 10% (Hypertonic) to observe turgor vs plasmolysis.',
    interactionType: 'slider-tonicity',
    nodeId: NODE_C10_BIO_005,
  },
  {
    title: '4. Ganong Potometer & Transpiration Engine',
    instruction: 'Toggle environmental factors (Sunlight, Wind, Humidity) and observe real-time capillary bubble velocity.',
    interactionType: 'potometer-sim',
    nodeId: NODE_C10_BIO_007,
  },
  {
    title: '5. Auxin Phototropism & Solar Tracking',
    instruction: 'Move the light source angle from Left to Right and observe auxin hormone migration to the shaded flank.',
    interactionType: 'light-angle-slider',
    nodeId: NODE_C10_BIO_009,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Citizen Botanist: The Kitchen Osmosis & Stomatal Lab',
  description: 'Conduct two real-world ICSE Class 10 biology experiments at home or in your school laboratory:',
  steps: [
    'Potato Osmoscope: Cut a potato into a block, carve a cavity, fill with 20% sucrose solution, mark the initial level with a pin, and place the potato in a bowl of pure water for 3 hours. Observe endosmosis rise!',
    'Cobalt Chloride Paper Test: Fasten blue dry cobalt chloride paper strips to the dorsal and ventral surfaces of a fresh leaf with glass slides and clips. Record which surface turns pink faster (ventral has more stomata!).',
    'Tradescantia Plasmolysis: Mount a purple lower-epidermis peel in 5% NaCl under a microscope. Watch purple anthocyanin vacuole shrink away from the cell wall in 60 seconds.',
    'Document your observations with photos and calculate the osmotic rate in mm/hour.',
  ],
};

function C10_BiologyChromosomeStructurechromatinSim(props: Props = DEFAULT_PROPS) {
  const {
    nodeId = DEFAULT_PROPS.nodeId || NODE_C10_BIO_001,
    title = DEFAULT_PROPS.title || 'Chromosome Structure & Plant Physiology',
    misconceptions = DEFAULT_PROPS.misconceptions || [],
    onComplete,
  } = props;

  const subjectConfig = SUBJECT_CONFIG['biology'] || { name: 'Biology', emoji: '🔬', color: 'emerald' };

  // ─── CORE PHASE MANAGEMENT ───
  const [phase, setPhase] = useState<'discovery' | 'predict' | 'explore' | 'observe' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // ─── PREDICTION & OBSERVATION INTERACTIVE STATES ───
  const [activePredictionIdx, setActivePredictionIdx] = useState(0);
  const [selectedPredictions, setSelectedPredictions] = useState<Record<number, number>>({});
  const [predictionSubmitted, setPredictionSubmitted] = useState<Record<number, boolean>>({});

  const [activeObservationIdx, setActiveObservationIdx] = useState(0);
  const [selectedObservations, setSelectedObservations] = useState<Record<number, number>>({});
  const [observationSubmitted, setObservationSubmitted] = useState<Record<number, boolean>>({});

  // ─── BRILLIANT.ORG INTERACTION STATES ───
  const [sandboxTab, setSandboxTab] = useState<'chromosome' | 'cellcycle' | 'osmosis' | 'potometer' | 'hormone' | 'respiration'>('chromosome');

  // ─── INTERACTIVE VISUAL LAB SLIDERS / CONTROLS ───
  const [condensationLevel, setCondensationLevel] = useState<number>(35); // 0 to 100%
  const [cellCyclePhaseIndex, setCellCyclePhaseIndex] = useState<number>(0); // 0: G1, 1: S, 2: G2, 3: M
  const [externalSoluteConc, setExternalSoluteConc] = useState<number>(0.9); // 0% to 10%
  const [lightIntensity, setLightIntensity] = useState<number>(75); // 0 to 100%
  const [windSpeed, setWindSpeed] = useState<number>(20); // 0 to 100 km/h
  const [humidityLevel, setHumidityLevel] = useState<number>(40); // 0 to 100%
  const [sunlightAngle, setSunlightAngle] = useState<number>(45); // -90 to +90
  const [altitudeMeters, setAltitudeMeters] = useState<number>(0); // 0m to 6000m
  const [selectedOrganelle, setSelectedOrganelle] = useState<string | null>(null);

  // ─── CHALLENGE & HINT STATES ───
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);

  // ─── DRAG & CONSTRUCT CHALLENGE STATES ───
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // ─── DISCOVERY & FEEDBACK STATES ───
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle] = useState(false);
  const [sparklePos] = useState({ x: 0, y: 0 });

  // ─── REFS FOR BKT & TIMERS ───
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── ADAPTIVE DIFFICULTY FILTER ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── LOAD MASTERY ON MOUNT ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
    speechManager.speak('Welcome to the ICSE Biology Interactive Lab! Let us explore chromosome architecture and plant physiology.');
  }, [nodeId]);

  // ─── BKT ADAPTATION EFFECT ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDifficulty = mastery === 'not-started' || mastery === 'beginner' ? 'foundation'
      : mastery === 'developing' ? 'standard' : 'advanced';
    setDifficulty(prev => {
      if (prev !== newDifficulty) {
        setCurrentChallenge(0);
        return newDifficulty;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── INACTIVITY AUTO-HINT TIMER ───
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        if (challenge.hints && challenge.hints.length > 0) {
          setCurrentHint(challenge.hints[0]);
          setShowHint(true);
          setHintCount(1);
          audioManager.play('hint');
          speechManager.speak(challenge.hints[0]);
        }
      }
    }, 12000);
  }, [phase, answerRevealed, hintCount, challenge]);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── REAL-TIME POTOMETER CANVAS ANIMATION ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId: number;
    let bubbleX = 20;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background graduated tube
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Glass capillary tube
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.strokeRect(10, 15, canvas.width - 20, 20);

      // Graduation ticks
      ctx.fillStyle = '#64748b';
      for (let x = 15; x < canvas.width - 15; x += 25) {
        ctx.fillRect(x, 15, 1, 8);
      }

      // Water column fill
      const potometerSpeed = Math.max(0.1, (lightIntensity * 0.02 + windSpeed * 0.03) * (1 - humidityLevel / 105));
      bubbleX = (bubbleX + potometerSpeed) % (canvas.width - 40);

      // Moving water color
      ctx.fillStyle = 'rgba(56, 189, 248, 0.4)';
      ctx.fillRect(10, 16, bubbleX, 18);

      // Air Bubble
      ctx.fillStyle = '#f43f5e';
      ctx.beginPath();
      ctx.arc(bubbleX + 15, 25, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Transpiration Rate text
      ctx.fillStyle = '#e2e8f0';
      ctx.font = '11px sans-serif';
      ctx.fillText(`Capillary Meniscus: ${(bubbleX * 0.1).toFixed(1)} cm | Rate: ${(potometerSpeed * 12).toFixed(1)} cm/hr`, 15, 48);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [lightIntensity, windSpeed, humidityLevel]);

  // ─── HANDLERS ───
  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const correct = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(correct);
    setDiscoveryAnswered(true);
    audioManager.play(correct ? 'success' : 'pop');
    speechManager.speak(correct ? 'Brilliant deduction! Chromatin and chromosomes are identical molecules.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToPredict = useCallback(() => {
    setPhase('predict');
    audioManager.play('whoosh');
    speechManager.speak('Make your scientific hypothesis in the predict-then-verify phase.');
  }, []);

  const handlePredictionAnswer = useCallback((predIdx: number, optIdx: number) => {
    setSelectedPredictions(prev => ({ ...prev, [predIdx]: optIdx }));
    setPredictionSubmitted(prev => ({ ...prev, [predIdx]: true }));
    const isCorrect = optIdx === PREDICTION_QUESTIONS[predIdx].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Accurate prediction!' : 'Interesting hypothesis! Test it directly in the lab.');
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Let us begin guided interactive cytological exploration.');
  }, []);

  const handleAdvanceToObservation = useCallback(() => {
    setPhase('observe');
    audioManager.play('whoosh');
    speechManager.speak('What do you notice? Record your empirical observations.');
  }, []);

  const handleObservationAnswer = useCallback((obsIdx: number, optIdx: number) => {
    setSelectedObservations(prev => ({ ...prev, [obsIdx]: optIdx }));
    setObservationSubmitted(prev => ({ ...prev, [obsIdx]: true }));
    const isCorrect = optIdx === OBSERVATION_QUESTIONS[obsIdx].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Free Sandbox Lab! Manipulate any variable freely without grading.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    setCurrentChallenge(0);
    audioManager.play('whoosh');
    speechManager.speak('Ready for ICSE competency challenges! Read carefully and conquer each question.');
  }, []);

  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge.hints && challenge.hints[nextLevel - 1]) {
      setCurrentHint(challenge.hints[nextLevel - 1]);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(challenge.hints[nextLevel - 1]);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
      speechManager.speak('Here is the complete step-by-step ICSE biological explanation.');
    }
  }, [hintCount, challenge]);

  const handleOrganelleClick = useCallback((organelleId: string) => {
    setSelectedOrganelle(organelleId);
    audioManager.play('tap');
    const organelleInfo: Record<string, string> = {
      centromere: 'Centromere: Primary constriction holding sister chromatids together and kinetochore spindle attachment site.',
      chromatid: 'Sister Chromatid: One of two identical copies of DNA replicated during S phase.',
      histone: 'Histone Octamer: Core protein spool around which 146 base pairs of DNA wrap to form a nucleosome.',
      dna: 'DNA Double Helix: 2nm wide genetic blueprint composed of A-T and G-C paired nucleotides.',
      stoma: 'Stoma: Leaf epidermal pore bordered by guard cells regulating transpiration and gas exchange.',
      alveolus: 'Alveolus: Microscopic air sac providing immense surface area for respiratory O2/CO2 diffusion.',
    };
    speechManager.speak(organelleInfo[organelleId] || 'Selected biological structure');
  }, []);

  const handleCondensationSliderChange = useCallback((val: number) => {
    setCondensationLevel(val);
    audioManager.play('count');
  }, []);

  const handleTonicitySliderChange = useCallback((val: number) => {
    setExternalSoluteConc(val);
    audioManager.play('balance');
  }, []);

  const handleSunlightAngleChange = useCallback((val: number) => {
    setSunlightAngle(val);
    audioManager.play('count');
  }, []);

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
      setWrongShake(true);
      setTimeout(() => setWrongShake(false), 400);
    }
    setDraggedItem(null);
  }, [draggedItem, challenge]);

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      let current = prev.length > 0 ? [...prev] : (challenge.sortItems?.map((_, i) => i) || []);
      const [moved] = current.splice(fromIndex, 1);
      current.splice(toIndex, 0, moved);
      return current;
    });
  }, [challenge]);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak(`Congratulations! Expedition complete with a score of ${finalScore} percent.`);
  }, [errors, onComplete]);

  const handleNextChallenge = useCallback(() => {
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
      handleComplete();
    } else {
      setCurrentChallenge(c => c + 1);
      audioManager.play('whoosh');
    }
  }, [currentChallenge, filteredChallenges.length, handleComplete]);

  const handleAnswer = useCallback((answer: number | Record<string, string> | number[] | string) => {
    let isCorrect = false;

    if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
      isCorrect = answer === challenge.correctIndex;
    } else if (challenge.type === 'drag-label') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctMapping);
    } else if (challenge.type === 'drag-sort') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctOrder);
    } else if (challenge.type === 'numeric') {
      const numAnswer = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
      isCorrect = Math.abs(numAnswer - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
    } else if (challenge.type === 'construct') {
      isCorrect = (answer as string).trim() === (challenge.targetState || '').trim();
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Excellent ICSE biological reasoning.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3500);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
      }
    } else {
      audioManager.play('drop-wrong');
      audioManager.play('error');
      setErrors(e => e + 1);
      setWrongShake(true);
      setWrongFlash(true);
      setTimeout(() => setWrongShake(false), 500);
      setTimeout(() => setWrongFlash(false), 800);

      if (challenge.misconceptionIndex !== undefined && !hitMisconceptions.includes(challenge.misconceptionIndex)) {
        setHitMisconceptions(prev => [...prev, challenge.misconceptionIndex!]);
      }

      if (hintCount < 3) {
        showNextHint();
      } else {
        setAnswerRevealed(true);
        setShowExplanation(true);
        speechManager.speak('Let us review the step-by-step biological breakdown together.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, showNextHint, hitMisconceptions, resetInactivityTimer]);

  // ─── DERIVED BIOLOGICAL METRICS ───
  const currentDNAContent = useMemo(() => {
    if (cellCyclePhaseIndex === 0) return '2C (Diploid content)';
    if (cellCyclePhaseIndex === 1) return '2C -> 4C (Active DNA Replication)';
    if (cellCyclePhaseIndex === 2) return '4C (Replicated DNA content)';
    return '4C -> 2C (Dividing into two daughter nuclei)';
  }, [cellCyclePhaseIndex]);

  const cellTurgorState = useMemo(() => {
    if (externalSoluteConc < 0.5) return { text: 'Fully Turgid (Endosmosis)', color: '#22c55e', vacuoleScale: 1.15 };
    if (externalSoluteConc <= 1.5) return { text: 'Normal / Flaccid Equilibrium', color: '#38bdf8', vacuoleScale: 0.95 };
    return { text: 'Plasmolysed (Exosmosis - Shrunk Protoplasm)', color: '#f43f5e', vacuoleScale: 0.6 };
  }, [externalSoluteConc]);

  const alveolarPO2 = useMemo(() => {
    const pO2 = Math.max(35, Math.round(104 - (altitudeMeters / 100) * 1.15));
    return pO2;
  }, [altitudeMeters]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-900/80 rounded-2xl border border-slate-800 backdrop-blur-md"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-emerald-950/80 border border-emerald-700 rounded-xl">
            {subjectConfig.emoji}
          </span>
          <div>
            <span className="text-xs font-semibold tracking-wider text-emerald-400 uppercase">
              ICSE Class 10 Biology • Comprehensive Lab
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-white">{title}</h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
              difficulty === 'foundation'
                ? 'bg-emerald-950 text-emerald-400 border border-emerald-600'
                : difficulty === 'advanced'
                ? 'bg-rose-950 text-rose-400 border border-rose-600'
                : 'bg-sky-950 text-sky-400 border border-sky-600'
            }`}
          >
            {difficulty} Tier
          </motion.span>
          <div className="text-right">
            <span className="text-xs text-slate-400 block">Mastery Level</span>
            <span className="text-sm font-bold text-emerald-300 capitalize">{masteryLevel}</span>
          </div>
        </div>
      </motion.div>

      {/* ─── PHASE 1: DISCOVERY (Curiosity Hook) ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-emerald-950/60 to-slate-900 rounded-2xl border border-emerald-800/80 shadow-lg">
            <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold mb-2">
              <span>🌱</span>
              <span>SCENARIO INVESTIGATION</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">{SCENARIO.title}</h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-4">{SCENARIO.intro}</p>
            <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800 text-xs text-emerald-300 font-mono">
              🔬 Investigation Mission: {SCENARIO.context}
            </div>
          </div>

          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-base sm:text-lg font-bold text-slate-100 flex items-center gap-2">
              <span className="p-1.5 bg-indigo-900 rounded-lg text-indigo-300 text-xs font-mono">PRE-LAB HOOK</span>
              {DISCOVERY_QUESTION.question}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((option, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  disabled={discoveryAnswered}
                  onClick={() => handleDiscoveryAnswer(idx)}
                  className={`p-4 text-left rounded-xl text-sm font-medium transition-all ${
                    discoveryAnswered
                      ? idx === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-900/80 border-2 border-emerald-500 text-emerald-100 shadow-md'
                        : 'bg-slate-800/60 border border-slate-700 text-slate-400 opacity-60'
                      : 'bg-slate-800 border border-slate-700 hover:bg-slate-750 hover:border-emerald-500/50 text-slate-200'
                  }`}
                  aria-label={`Discovery Option ${idx + 1}: ${option}`}
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-750 border border-slate-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{option}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="pt-4 space-y-4"
              >
                <div
                  className={`p-4 rounded-xl border text-sm ${
                    discoveryCorrect
                      ? 'bg-emerald-950/60 border-emerald-700 text-emerald-200'
                      : 'bg-amber-950/60 border-amber-700 text-amber-200'
                  }`}
                >
                  <p className="font-bold mb-1">
                    {discoveryCorrect ? '✓ Spot-On Scientific Insight!' : '💡 Key Concept Reveal:'}
                  </p>
                  <p className="text-xs sm:text-sm">
                    {discoveryCorrect
                      ? 'Chromatin and chromosomes are indeed the exact same molecular entity (DNA wrapped around histone octamers), simply coiled at different packing densities depending on whether the cell is working or dividing!'
                      : DISCOVERY_QUESTION.hintAfter}
                  </p>
                </div>

                <div className="flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={handleAdvanceToPredict}
                    className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-emerald-600 hover:from-indigo-500 hover:to-emerald-500 text-white font-bold rounded-xl shadow-lg flex items-center gap-2 text-sm sm:text-base"
                  >
                    <span>Proceed to Predict-Then-Check</span>
                    <span>→</span>
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: PREDICT (Brilliant.org Predict-Then-Check Pattern) ─── */}
      {phase === 'predict' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="flex items-center justify-between bg-slate-900 p-4 rounded-2xl border border-slate-800">
            <div>
              <span className="text-xs font-mono text-indigo-400 font-bold">
                PREDICTION STAGE {activePredictionIdx + 1} OF {PREDICTION_QUESTIONS.length}
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                {PREDICTION_QUESTIONS[activePredictionIdx].title}
              </h2>
            </div>
            <span className="px-3 py-1 bg-indigo-950 text-indigo-300 border border-indigo-700 rounded-full text-xs font-bold">
              Hypothesis Test
            </span>
          </div>

          <div className="p-6 bg-slate-900/95 rounded-2xl border border-slate-800 space-y-4 shadow-xl">
            <h3 className="text-base sm:text-lg font-bold text-white leading-relaxed">
              {PREDICTION_QUESTIONS[activePredictionIdx].question}
            </h3>

            <div className="grid grid-cols-1 gap-3 pt-2">
              {PREDICTION_QUESTIONS[activePredictionIdx].options.map((opt, optIdx) => {
                const isSelected = selectedPredictions[activePredictionIdx] === optIdx;
                const isSubmitted = predictionSubmitted[activePredictionIdx];
                const isCorrect = optIdx === PREDICTION_QUESTIONS[activePredictionIdx].correctIndex;

                return (
                  <motion.button
                    key={optIdx}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    disabled={isSubmitted}
                    onClick={() => handlePredictionAnswer(activePredictionIdx, optIdx)}
                    className={`p-4 text-left rounded-xl text-sm font-medium transition-all ${
                      isSubmitted
                        ? isCorrect
                          ? 'bg-emerald-900/80 border-2 border-emerald-500 text-emerald-100 shadow-md'
                          : isSelected
                          ? 'bg-rose-950/80 border-2 border-rose-500 text-rose-200'
                          : 'bg-slate-800/60 border border-slate-700 text-slate-400 opacity-60'
                        : 'bg-slate-800 border border-slate-700 hover:bg-slate-750 hover:border-indigo-500/50 text-slate-200'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span>{opt}</span>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {predictionSubmitted[activePredictionIdx] && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="pt-4 space-y-4"
              >
                <div className="p-4 bg-indigo-950/50 border border-indigo-700/80 rounded-xl text-indigo-200 text-sm space-y-2">
                  <p className="font-bold">🔬 Science Verification Mechanism:</p>
                  <p className="text-xs sm:text-sm text-slate-300">
                    {PREDICTION_QUESTIONS[activePredictionIdx].explanation}
                  </p>
                  <div className="p-2.5 bg-slate-950 rounded-lg border border-indigo-900 text-xs text-amber-300 font-mono">
                    👉 Verification Guide: {PREDICTION_QUESTIONS[activePredictionIdx].verifyInstruction}
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-xs text-slate-400">
                    Step {activePredictionIdx + 1} of {PREDICTION_QUESTIONS.length}
                  </span>
                  {activePredictionIdx < PREDICTION_QUESTIONS.length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => setActivePredictionIdx(i => i + 1)}
                      className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-sm"
                    >
                      Next Prediction →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={handleAdvanceToExploration}
                      className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-xl text-sm shadow-lg"
                    >
                      Enter Interactive Labs to Verify →
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: EXPLORE (Guided Steps) ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Exploration Stepper Header */}
          <div className="flex items-center justify-between bg-slate-900 p-4 rounded-2xl border border-slate-800">
            <div>
              <span className="text-xs font-mono text-emerald-400">
                EXPLORATION LAB {currentSlide + 1} OF {EXPLORATION_STEPS.length}
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                {EXPLORATION_STEPS[currentSlide].title}
              </h2>
            </div>
            <div className="flex gap-1.5">
              {EXPLORATION_STEPS.map((_, i) => (
                <div
                  key={i}
                  className={`h-2 rounded-full transition-all ${
                    i === currentSlide ? 'w-8 bg-emerald-500' : 'w-2 bg-slate-700'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Interactive Slide Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-5 sm:p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4"
            >
              <div className="p-3 bg-emerald-950/40 border border-emerald-800/60 rounded-xl text-emerald-300 text-sm flex items-center gap-2">
                <span>👉</span>
                <span>{EXPLORATION_STEPS[currentSlide].instruction}</span>
              </div>

              {/* SLIDE 0: Chromosome Packaging Interactive SVG */}
              {currentSlide === 0 && (
                <div className="space-y-4">
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div className="flex justify-between text-xs text-slate-400 mb-2">
                      <span>2nm Naked DNA Helix (0%)</span>
                      <span className="font-bold text-emerald-400">Coiling Level: {condensationLevel}%</span>
                      <span>1400nm Metaphase Chromosome (100%)</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={condensationLevel}
                      onChange={e => handleCondensationSliderChange(Number(e.target.value))}
                      className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                      aria-label="Chromosome Condensation Level Slider"
                    />

                    {/* Dynamic SVG Chromosome Packaging */}
                    <div className="mt-4 flex justify-center items-center h-64 bg-slate-900/60 rounded-xl overflow-hidden relative border border-slate-800/80">
                      <svg viewBox="0 0 600 240" className="w-full h-full">
                        {condensationLevel < 40 && (
                          <g>
                            <path
                              d="M 50 120 Q 100 60 150 120 T 250 120 T 350 120 T 450 120 T 550 120"
                              fill="none"
                              stroke="#38bdf8"
                              strokeWidth={Math.max(2, 6 - condensationLevel * 0.1)}
                              strokeDasharray={condensationLevel > 15 ? '6 4' : 'none'}
                            />
                            {[150, 250, 350, 450].map((cx, i) => (
                              <g
                                key={i}
                                onClick={() => handleOrganelleClick('histone')}
                                className="cursor-pointer hover:opacity-80"
                              >
                                <circle cx={cx} cy="120" r={16 + condensationLevel * 0.1} fill="#10b981" />
                                <text x={cx} y="124" fill="#022c22" fontSize="9" fontWeight="bold" textAnchor="middle">
                                  H8
                                </text>
                              </g>
                            ))}
                            <text x="300" y="200" fill="#94a3b8" fontSize="12" textAnchor="middle">
                              Nucleosome Chain: &quot;Beads-on-a-String&quot; (11nm chromatin thread)
                            </text>
                          </g>
                        )}

                        {condensationLevel >= 40 && condensationLevel < 75 && (
                          <g>
                            {Array.from({ length: 12 }).map((_, i) => (
                              <ellipse
                                key={i}
                                cx={100 + i * 35}
                                cy={120 + Math.sin(i * 1.2) * 25}
                                rx="14"
                                ry="28"
                                fill="#059669"
                                stroke="#34d399"
                                strokeWidth="2"
                              />
                            ))}
                            <text x="300" y="210" fill="#a7f3d0" fontSize="12" textAnchor="middle">
                              30nm Solenoid & Looped Domain Chromatin Fiber
                            </text>
                          </g>
                        )}

                        {condensationLevel >= 75 && (
                          <g className="cursor-pointer">
                            <path
                              d="M 285 40 Q 260 80 285 120 Q 260 160 285 200"
                              fill="none"
                              stroke="#10b981"
                              strokeWidth="24"
                              strokeLinecap="round"
                              onClick={() => handleOrganelleClick('chromatid')}
                            />
                            <path
                              d="M 315 40 Q 340 80 315 120 Q 340 160 315 200"
                              fill="none"
                              stroke="#10b981"
                              strokeWidth="24"
                              strokeLinecap="round"
                              onClick={() => handleOrganelleClick('chromatid')}
                            />
                            <circle
                              cx="300"
                              cy="120"
                              r="16"
                              fill="#f43f5e"
                              stroke="#ffffff"
                              strokeWidth="2"
                              onClick={() => handleOrganelleClick('centromere')}
                            />
                            <text x="300" y="124" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">
                              Centromere
                            </text>

                            <rect x="275" y="65" width="20" height="4" fill="#fbbf24" rx="2" />
                            <rect x="305" y="65" width="20" height="4" fill="#fbbf24" rx="2" />

                            <text x="180" y="60" fill="#6ee7b7" fontSize="11" textAnchor="end">
                              Sister Chromatid 1 →
                            </text>
                            <text x="420" y="60" fill="#6ee7b7" fontSize="11" textAnchor="start">
                              ← Sister Chromatid 2
                            </text>
                            <text x="300" y="225" fill="#fecdd3" fontSize="11" textAnchor="middle">
                              Metaphase Replicated Chromosome (1400nm width)
                            </text>
                          </g>
                        )}
                      </svg>
                    </div>

                    {selectedOrganelle && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-3 p-3 bg-slate-900 rounded-lg border border-emerald-700/50 text-xs text-emerald-300"
                      >
                        ℹ️ Clicked Element: {selectedOrganelle.toUpperCase()}
                      </motion.div>
                    )}
                  </div>
                </div>
              )}

              {/* SLIDE 1: Cell Cycle & DNA Multiplier */}
              {currentSlide === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-4 gap-2">
                    {['G1 Phase', 'S Phase (DNA Synth)', 'G2 Phase', 'M Phase (Division)'].map((pName, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => {
                          setCellCyclePhaseIndex(i);
                          audioManager.play('tap');
                        }}
                        className={`p-3 rounded-xl text-xs font-bold transition-all ${
                          cellCyclePhaseIndex === i
                            ? 'bg-emerald-600 text-white shadow-lg'
                            : 'bg-slate-800 text-slate-400 hover:bg-slate-750'
                        }`}
                      >
                        {pName}
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-5 bg-slate-950 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="space-y-2 max-w-md">
                      <span className="text-xs font-mono text-emerald-400 font-bold">CYCLE METRICS:</span>
                      <h4 className="text-lg font-bold text-white">
                        {cellCyclePhaseIndex === 0 && 'G1 (First Growth Phase): Rapid protein synthesis & organelle duplication.'}
                        {cellCyclePhaseIndex === 1 && 'S (Synthesis Phase): Chromosome duplication doubling DNA content from 2C to 4C!'}
                        {cellCyclePhaseIndex === 2 && 'G2 (Second Growth Phase): Spindle protein synthesis and final quality check.'}
                        {cellCyclePhaseIndex === 3 && 'M (Mitotic Phase): Prophase, Metaphase, Anaphase, Telophase & Cytokinesis.'}
                      </h4>
                      <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 text-xs text-sky-300">
                        ��� Current Nuclear DNA Content: <span className="font-bold text-white">{currentDNAContent}</span>
                      </div>
                    </div>

                    <div className="w-36 h-36 rounded-full border-4 border-slate-750 flex items-center justify-center relative bg-slate-900">
                      <motion.div
                        className="text-center"
                        key={cellCyclePhaseIndex}
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                      >
                        <span className="text-2xl font-black text-emerald-400">
                          {cellCyclePhaseIndex === 0 ? '2C' : cellCyclePhaseIndex === 1 ? '3C' : cellCyclePhaseIndex === 2 ? '4C' : '2x 2C'}
                        </span>
                        <span className="block text-[10px] text-slate-400 uppercase">DNA Level</span>
                      </motion.div>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 2: Root Osmosis & Plasmolysis Lab */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                    <div className="flex justify-between text-xs text-slate-400">
                      <span>0.0% Distilled Water (Pure Hypotonic)</span>
                      <span className="font-bold" style={{ color: cellTurgorState.color }}>
                        Ext Solute: {externalSoluteConc.toFixed(1)}% | {cellTurgorState.text}
                      </span>
                      <span>10.0% Concentrated Saline (Hypertonic)</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={10}
                      step={0.1}
                      value={externalSoluteConc}
                      onChange={e => handleTonicitySliderChange(Number(e.target.value))}
                      className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-400"
                      aria-label="External Solute Concentration Slider"
                    />

                    <div className="h-56 bg-slate-900 rounded-xl flex items-center justify-center relative overflow-hidden border border-slate-800">
                      <svg viewBox="0 0 500 200" className="w-full h-full">
                        <rect x="150" y="30" width="200" height="140" rx={12} fill="none" stroke="#22c55e" strokeWidth="8" />
                        <text x="250" y="24" fill="#86efac" fontSize="10" textAnchor="middle" fontWeight="bold">
                          Rigid Cellulose Cell Wall (Resists Lysis)
                        </text>

                        <motion.rect
                          x={250 - 90 * cellTurgorState.vacuoleScale}
                          y={100 - 60 * cellTurgorState.vacuoleScale}
                          width={180 * cellTurgorState.vacuoleScale}
                          height={120 * cellTurgorState.vacuoleScale}
                          rx={8}
                          fill="#1e293b"
                          stroke="#38bdf8"
                          strokeWidth="3"
                          animate={{
                            width: 180 * cellTurgorState.vacuoleScale,
                            height: 120 * cellTurgorState.vacuoleScale,
                            x: 250 - 90 * cellTurgorState.vacuoleScale,
                            y: 100 - 60 * cellTurgorState.vacuoleScale,
                          }}
                        />

                        <motion.ellipse
                          cx="250"
                          cy="100"
                          rx={65 * cellTurgorState.vacuoleScale}
                          ry={45 * cellTurgorState.vacuoleScale}
                          fill="#a855f7"
                          opacity="0.85"
                          animate={{
                            rx: 65 * cellTurgorState.vacuoleScale,
                            ry: 45 * cellTurgorState.vacuoleScale,
                          }}
                        />
                        <text x="250" y="104" fill="#ffffff" fontSize="10" textAnchor="middle" fontWeight="bold">
                          Cell Sap Vacuole
                        </text>

                        {externalSoluteConc < 0.9 && (
                          <g>
                            <text x="90" y="105" fill="#38bdf8" fontSize="12" fontWeight="bold">
                              H2O IN →
                            </text>
                            <text x="410" y="105" fill="#38bdf8" fontSize="12" fontWeight="bold">
                              ← H2O IN
                            </text>
                          </g>
                        )}
                        {externalSoluteConc > 1.5 && (
                          <g>
                            <text x="90" y="105" fill="#f43f5e" fontSize="12" fontWeight="bold">
                              ← H2O OUT
                            </text>
                            <text x="410" y="105" fill="#f43f5e" fontSize="12" fontWeight="bold">
                              H2O OUT →
                            </text>
                          </g>
                        )}
                      </svg>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 3: Ganong Potometer Transpiration Engine */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <label className="text-xs text-slate-400 block mb-1">☀️ Sunlight: {lightIntensity}%</label>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={lightIntensity}
                        onChange={e => setLightIntensity(Number(e.target.value))}
                        className="w-full h-1.5 bg-slate-800 rounded-lg accent-amber-400"
                        aria-label="Sunlight Intensity Slider"
                      />
                    </div>
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <label className="text-xs text-slate-400 block mb-1">💨 Wind Speed: {windSpeed} km/h</label>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={windSpeed}
                        onChange={e => setWindSpeed(Number(e.target.value))}
                        className="w-full h-1.5 bg-slate-800 rounded-lg accent-sky-400"
                        aria-label="Wind Speed Slider"
                      />
                    </div>
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <label className="text-xs text-slate-400 block mb-1">💧 Humidity: {humidityLevel}%</label>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={humidityLevel}
                        onChange={e => setHumidityLevel(Number(e.target.value))}
                        className="w-full h-1.5 bg-slate-800 rounded-lg accent-indigo-400"
                        aria-label="Humidity Level Slider"
                      />
                    </div>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <span className="text-xs font-mono text-slate-400 block mb-2">
                      GANONG’S POTOMETER CAPILLARY BUBBLE TRACKER:
                    </span>
                    <canvas ref={canvasRef} width={600} height={60} className="w-full rounded-lg border border-slate-800" />
                  </div>
                </div>
              )}

              {/* SLIDE 4: Auxin Phototropism Simulation */}
              {currentSlide === 4 && (
                <div className="space-y-4">
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                    <div className="flex justify-between text-xs text-slate-400">
                      <span>Left Lamp (-90°)</span>
                      <span className="font-bold text-amber-400">Sunlight Incident Angle: {sunlightAngle}°</span>
                      <span>Right Lamp (+90°)</span>
                    </div>
                    <input
                      type="range"
                      min={-90}
                      max={90}
                      value={sunlightAngle}
                      onChange={e => handleSunlightAngleChange(Number(e.target.value))}
                      className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                      aria-label="Sunlight Incident Angle Slider"
                    />

                    <div className="h-56 bg-slate-900 rounded-xl flex items-center justify-center relative overflow-hidden border border-slate-800">
                      <svg viewBox="0 0 500 200" className="w-full h-full">
                        <circle
                          cx={250 + sunlightAngle * 2.2}
                          cy={30}
                          r={18}
                          fill="#fbbf24"
                          filter="drop-shadow(0 0 10px rgba(251, 191, 36, 0.6))"
                        />
                        <text x={250 + sunlightAngle * 2.2} y={34} fill="#78350f" fontSize="10" textAnchor="middle" fontWeight="bold">
                          ☀️
                        </text>

                        <path
                          d={`M 250 190 Q 250 110 ${250 + sunlightAngle * 0.9} 60`}
                          fill="none"
                          stroke="#10b981"
                          strokeWidth="28"
                          strokeLinecap="round"
                        />

                        {sunlightAngle > 10 && (
                          <g>
                            <circle cx="232" cy="110" r="3" fill="#f43f5e" />
                            <circle cx="235" cy="90" r="3" fill="#f43f5e" />
                            <circle cx="230" cy="75" r="3" fill="#f43f5e" />
                            <text x="180" y="90" fill="#f43f5e" fontSize="10" fontWeight="bold">
                              Auxin on Shaded Flank →
                            </text>
                          </g>
                        )}
                        {sunlightAngle < -10 && (
                          <g>
                            <circle cx="268" cy="110" r="3" fill="#f43f5e" />
                            <circle cx="265" cy="90" r="3" fill="#f43f5e" />
                            <circle cx="270" cy="75" r="3" fill="#f43f5e" />
                            <text x="320" y="90" fill="#f43f5e" fontSize="10" fontWeight="bold">
                              ← Auxin on Shaded Flank
                            </text>
                          </g>
                        )}
                      </svg>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Stepper Navigation Buttons */}
          <div className="flex items-center justify-between pt-2">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                setCurrentSlide(s => Math.max(0, s - 1));
                audioManager.play('tap');
              }}
              disabled={currentSlide === 0}
              className="px-5 py-2.5 bg-slate-800 text-slate-200 hover:bg-slate-700 disabled:opacity-40 rounded-xl text-sm font-bold"
            >
              ← Previous Lab
            </motion.button>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => {
                  setCurrentSlide(s => s + 1);
                  audioManager.play('tap');
                }}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-sm shadow-md"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleAdvanceToObservation}
                className="px-6 py-2.5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-bold rounded-xl text-sm shadow-lg"
              >
                Record Observations (&quot;What Do You Notice?&quot;) →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: OBSERVE (Brilliant.org What Do You Notice? Pattern) ─── */}
      {phase === 'observe' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="flex items-center justify-between bg-slate-900 p-4 rounded-2xl border border-slate-800">
            <div>
              <span className="text-xs font-mono text-teal-400 font-bold">
                OBSERVATION ANALYSIS {activeObservationIdx + 1} OF {OBSERVATION_QUESTIONS.length}
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                {OBSERVATION_QUESTIONS[activeObservationIdx].title}
              </h2>
            </div>
            <span className="px-3 py-1 bg-teal-950 text-teal-300 border border-teal-700 rounded-full text-xs font-bold">
              What do you notice?
            </span>
          </div>

          <div className="p-6 bg-slate-900/95 rounded-2xl border border-slate-800 space-y-4 shadow-xl">
            <h3 className="text-base sm:text-lg font-bold text-white leading-relaxed">
              {OBSERVATION_QUESTIONS[activeObservationIdx].question}
            </h3>

            {/* Observable options preview list */}
            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-teal-300 font-bold block">
                👀 EMPIRICAL KEY OBSERVABLES FROM THE SIMULATION:
              </span>
              <ul className="text-xs text-slate-300 space-y-1">
                {OBSERVATION_QUESTIONS[activeObservationIdx].observableOptions.map((obs, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="text-teal-400">•</span>
                    <span>{obs}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-1 gap-3 pt-2">
              {OBSERVATION_QUESTIONS[activeObservationIdx].options.map((opt, optIdx) => {
                const isSelected = selectedObservations[activeObservationIdx] === optIdx;
                const isSubmitted = observationSubmitted[activeObservationIdx];
                const isCorrect = optIdx === OBSERVATION_QUESTIONS[activeObservationIdx].correctIndex;

                return (
                  <motion.button
                    key={optIdx}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    disabled={isSubmitted}
                    onClick={() => handleObservationAnswer(activeObservationIdx, optIdx)}
                    className={`p-4 text-left rounded-xl text-sm font-medium transition-all ${
                      isSubmitted
                        ? isCorrect
                          ? 'bg-teal-900/80 border-2 border-teal-500 text-teal-100 shadow-md'
                          : isSelected
                          ? 'bg-rose-950/80 border-2 border-rose-500 text-rose-200'
                          : 'bg-slate-800/60 border border-slate-700 text-slate-400 opacity-60'
                        : 'bg-slate-800 border border-slate-700 hover:bg-slate-750 hover:border-teal-500/50 text-slate-200'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span>{opt}</span>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {observationSubmitted[activeObservationIdx] && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="pt-4 space-y-4"
              >
                <div className="p-4 bg-teal-950/50 border border-teal-700/80 rounded-xl text-teal-200 text-sm">
                  <p className="font-bold mb-1">🌿 Botanical Deduction:</p>
                  <p className="text-xs sm:text-sm text-slate-300">
                    {OBSERVATION_QUESTIONS[activeObservationIdx].explanation}
                  </p>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-xs text-slate-400">
                    Observation {activeObservationIdx + 1} of {OBSERVATION_QUESTIONS.length}
                  </span>
                  {activeObservationIdx < OBSERVATION_QUESTIONS.length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => setActiveObservationIdx(i => i + 1)}
                      className="px-6 py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl text-sm"
                    >
                      Next Observation →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={handleAdvanceToSandbox}
                      className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white font-bold rounded-xl text-sm shadow-lg"
                    >
                      Continue to Free Sandbox →
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 5: SANDBOX (Free Play Mode) ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono text-emerald-400 font-bold">UNRESTRICTED EXPERIMENTATION</span>
              <h2 className="text-xl font-bold text-white">Biological Sandbox Simulator</h2>
              <p className="text-xs text-slate-400">Manipulate any organelle or physiological factor without time limits or grading.</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleAdvanceToChallenge}
              className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg text-sm flex items-center gap-2"
            >
              <span>Ready for ICSE Challenges!</span>
              <span>→</span>
            </motion.button>
          </div>

          {/* Sandbox Tab Switcher */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'chromosome', label: '🧬 Chromosome Coiling' },
              { id: 'osmosis', label: '🧫 Root Osmosis & Turgor' },
              { id: 'potometer', label: '🌿 Transpiration Potometer' },
              { id: 'respiration', label: '🫁 Alveolar Gas Exchange' },
            ].map(tab => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setSandboxTab(tab.id as 'chromosome' | 'cellcycle' | 'osmosis' | 'potometer' | 'hormone' | 'respiration');
                  audioManager.play('tap');
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  sandboxTab === tab.id
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
                }`}
              >
                {tab.label}
              </motion.button>
            ))}
          </div>

          {/* Sandbox Visual Display */}
          <div className="p-6 bg-slate-900/80 rounded-2xl border border-slate-800">
            {sandboxTab === 'chromosome' && (
              <div className="space-y-4">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Decondensed Chromatin</span>
                  <span className="font-bold text-emerald-400">{condensationLevel}% Packed</span>
                  <span>Fully Condensed Chromosome</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={condensationLevel}
                  onChange={e => handleCondensationSliderChange(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg accent-emerald-500"
                />
              </div>
            )}

            {sandboxTab === 'osmosis' && (
              <div className="space-y-4">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>0% Pure Water</span>
                  <span className="font-bold" style={{ color: cellTurgorState.color }}>
                    {externalSoluteConc.toFixed(1)}% Saline ({cellTurgorState.text})
                  </span>
                  <span>10% Hypertonic</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={10}
                  step={0.1}
                  value={externalSoluteConc}
                  onChange={e => handleTonicitySliderChange(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg accent-sky-400"
                />
              </div>
            )}

            {sandboxTab === 'potometer' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Sunlight: {lightIntensity}%</label>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={lightIntensity}
                      onChange={e => setLightIntensity(Number(e.target.value))}
                      className="w-full h-1.5 bg-slate-800 rounded-lg accent-amber-400"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Humidity: {humidityLevel}%</label>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={humidityLevel}
                      onChange={e => setHumidityLevel(Number(e.target.value))}
                      className="w-full h-1.5 bg-slate-800 rounded-lg accent-indigo-400"
                    />
                  </div>
                </div>
              </div>
            )}

            {sandboxTab === 'respiration' && (
              <div className="space-y-4">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Sea Level (0m)</span>
                  <span className="font-bold text-sky-400">
                    Altitude: {altitudeMeters}m | Alveolar pO2: {alveolarPO2} mmHg
                  </span>
                  <span>Khardung La Pass (6,000m)</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={6000}
                  step={100}
                  value={altitudeMeters}
                  onChange={e => {
                    setAltitudeMeters(Number(e.target.value));
                    audioManager.play('count');
                  }}
                  className="w-full h-2 bg-slate-800 rounded-lg accent-sky-400"
                />
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 6: CHALLENGE (Adaptive ICSE Practice) ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Progress & Tier Tracker */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-mono">
                CHALLENGE {currentChallenge + 1} OF {filteredChallenges.length}
              </span>
              <span className="font-semibold text-emerald-400 uppercase">
                NEP 2020 Level: {challenge.competencyLevel}
              </span>
            </div>
            <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Challenge Card */}
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 bg-slate-900 rounded-2xl border transition-all ${
              wrongFlash
                ? 'bg-rose-950/60 border-2 border-rose-500'
                : 'border-slate-800 shadow-xl'
            }`}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-slate-800 text-slate-300 border border-slate-700">
                {challenge.type}
              </span>
              <span className="text-xs text-emerald-400 font-mono">Node: {challenge.nodeId}</span>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-white mb-4 leading-relaxed">
              {challenge.question}
            </h3>

            {/* TYPE A: MCQ Types (classify, distinguish, match) */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') &&
              challenge.options && (
                <div className="grid grid-cols-1 gap-2.5">
                  {challenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.012 }}
                      whileTap={{ scale: 0.988 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={wrongShake ? { duration: 0.4 } : {}}
                      onClick={() => handleAnswer(i)}
                      disabled={showExplanation || answerRevealed}
                      className={`p-4 text-left rounded-xl text-sm font-medium transition-all ${
                        showExplanation && i === challenge.correctIndex
                          ? 'bg-emerald-900/80 border-2 border-emerald-500 text-emerald-100 shadow-md'
                          : 'bg-slate-800 border border-slate-700 hover:bg-slate-750 text-slate-200'
                      }`}
                      aria-label={`Option ${i + 1}: ${opt}`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span>{opt}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}

            {/* TYPE B: Drag Label onto Diagram */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 w-full mb-1">Drag labels to their matching targets:</span>
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 rounded-lg text-xs font-bold text-white cursor-grab shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex justify-center">
                  <svg viewBox="0 0 500 240" className="w-full max-w-lg">
                    <rect
                      x="40"
                      y="30"
                      width="180"
                      height="36"
                      rx={8}
                      fill="#1e293b"
                      stroke="#475569"
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop('t_chromatid')}
                    />
                    <text x="130" y="52" fill="#94a3b8" fontSize="11" textAnchor="middle">
                      {droppedLabels.t_chromatid || 'Drop Sister Chromatid Target'}
                    </text>

                    <rect
                      x="40"
                      y="90"
                      width="180"
                      height="36"
                      rx={8}
                      fill="#1e293b"
                      stroke="#475569"
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop('t_centromere')}
                    />
                    <text x="130" y="112" fill="#94a3b8" fontSize="11" textAnchor="middle">
                      {droppedLabels.t_centromere || 'Drop Centromere Target'}
                    </text>

                    <rect
                      x="280"
                      y="30"
                      width="180"
                      height="36"
                      rx={8}
                      fill="#1e293b"
                      stroke="#475569"
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop('t_gene')}
                    />
                    <text x="370" y="52" fill="#94a3b8" fontSize="11" textAnchor="middle">
                      {droppedLabels.t_gene || 'Drop Gene Locus Target'}
                    </text>

                    <rect
                      x="280"
                      y="90"
                      width="180"
                      height="36"
                      rx={8}
                      fill="#1e293b"
                      stroke="#475569"
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop('t_histone')}
                    />
                    <text x="370" y="112" fill="#94a3b8" fontSize="11" textAnchor="middle">
                      {droppedLabels.t_histone || 'Drop Histone Octamer Target'}
                    </text>
                  </svg>
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-sm"
                >
                  Verify Diagram Labels
                </motion.button>
              </div>
            )}

            {/* TYPE C: Drag Sort Steps */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Drag to arrange in correct chronological sequence:</p>
                {(sortArrangement.length === challenge.sortItems.length
                  ? sortArrangement.map(idx => challenge.sortItems![idx])
                  : challenge.sortItems
                ).map((item, displayIdx) => (
                  <motion.div
                    key={displayIdx}
                    draggable
                    onDragStart={() => setDraggedItem(String(displayIdx))}
                    onDragOver={e => e.preventDefault()}
                    onDrop={() => {
                      const fromIdx = parseInt(draggedItem || '0');
                      handleSortMove(fromIdx, displayIdx);
                    }}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="p-3 bg-slate-800 border border-slate-700 rounded-xl text-sm text-slate-200 cursor-grab flex items-center gap-3"
                  >
                    <span className="w-6 h-6 rounded-full bg-emerald-950 border border-emerald-600 flex items-center justify-center text-xs font-bold text-emerald-400 shrink-0">
                      {displayIdx + 1}
                    </span>
                    <span>{item}</span>
                  </motion.div>
                ))}

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    const ans =
                      sortArrangement.length > 0
                        ? sortArrangement
                        : challenge.sortItems?.map((_, i) => i) || [];
                    handleAnswer(ans);
                  }}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-sm mt-2"
                >
                  Check Sequence Order
                </motion.button>
              </div>
            )}

            {/* TYPE D: Numeric Calculations */}
            {challenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter calculated numerical value"
                    className="px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white font-mono text-base focus:outline-none focus:border-emerald-500"
                    aria-label="Numeric Calculation Answer Input"
                  />
                  <span className="text-slate-400 font-bold text-sm">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(numericInput)}
                    className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-sm"
                  >
                    Calculate & Submit
                  </motion.button>
                </div>
              </div>
            )}

            {/* TYPE E: Construct Biochemical Pathway */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3 py-1.5 bg-slate-800 border border-slate-700 hover:border-emerald-500 text-slate-200 text-xs font-semibold rounded-lg"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[70px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-emerald-950 border border-emerald-700 text-emerald-300 rounded-lg text-xs font-bold flex items-center gap-2"
                    >
                      <span>{part}</span>
                      <button
                        onClick={() => setConstructParts(prev => prev.filter((_, idx) => idx !== i))}
                        className="text-rose-400 hover:text-rose-300 font-bold"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-slate-500 text-xs">Click elements above to assemble pathway...</span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  disabled={constructParts.length === 0}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold rounded-xl text-sm"
                >
                  Verify Constructed Pathway
                </motion.button>
              </div>
            )}

            {/* Progressive Step-by-Step Explanation Banner */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-emerald-950/50 border border-emerald-700/80 rounded-2xl space-y-3"
              >
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                  <span>📖</span>
                  <span>ICSE Step-by-Step Biological Explanation</span>
                </div>

                {challenge.explanation
                  .split('. ')
                  .filter(s => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-emerald-100 text-sm leading-relaxed"
                    >
                      <span className="font-bold text-emerald-400">{i + 1}.</span> {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                <div className="pt-2 flex items-center gap-3">
                  {revealedSteps <
                    challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold"
                    >
                      Show Next Step →
                    </motion.button>
                  )}

                  {revealedSteps >=
                    challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-sm shadow-lg"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length
                        ? 'Finalise Lab Report →'
                        : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 7: COMPLETE (Mastery & Reflection) ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-8 bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950 rounded-3xl border border-emerald-700/80 text-center space-y-4">
            <span className="text-5xl">🏆</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Biological Mastery Achieved!</h2>
            
            {/* MOTIVATIONAL FEEDBACK */}
            <div className="p-3 bg-emerald-900/40 rounded-xl border border-emerald-600/50 max-w-md mx-auto">
              <p className="text-lg font-black text-emerald-300">
                {errors === 0
                  ? 'PERFECT SCORE!'
                  : errors <= 3
                  ? 'Great work!'
                  : errors <= 7
                  ? 'Good effort!'
                  : 'Do not give up — You WILL get this!'}
              </p>
            </div>

            <p className="text-emerald-300 text-sm max-w-lg mx-auto">
              You have systematically investigated Chromosome packaging, Cell Cycle, Osmosis, Ascent of Sap, Transpiration, and Respiratory gas exchange.
            </p>
            <div className="flex justify-center gap-6 pt-2">
              <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-xl w-32">
                <span className="text-xs text-slate-400 block">Final Score</span>
                <span className="text-xl font-black text-emerald-400">{Math.max(0, 100 - errors * 5)}%</span>
              </div>
              <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-xl w-32">
                <span className="text-xs text-slate-400 block">Mastery Tier</span>
                <span className="text-xl font-black text-teal-300 capitalize">{masteryLevel}</span>
              </div>
            </div>
          </div>

          {/* Targeted Misconception Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 border border-rose-800 rounded-2xl space-y-3">
              <h3 className="text-rose-300 text-sm font-bold flex items-center gap-2">
                <span>⚠️</span>
                <span>Personalised Misconception Diagnostics:</span>
              </h3>
              {hitMisconceptions.map((idx, i) => {
                const m = misconceptions[idx];
                if (!m) return null;
                return (
                  <div key={i} className="p-3 bg-slate-900/90 rounded-xl border border-rose-900 text-xs space-y-1">
                    <p className="text-rose-300 font-semibold">❌ Misconception: {m.misconception}</p>
                    <p className="text-emerald-300 font-medium">✓ Scientific Correction: {m.correction}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Spaced Repetition Visibility Schedule */}
          <div className="p-5 bg-indigo-950/50 border-2 border-indigo-500 rounded-2xl space-y-3 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-indigo-300 text-sm font-bold flex items-center gap-2">
                <span>📅</span>
                <span>Spaced Repetition (SM-2) Memory Consolidation Schedule</span>
              </h3>
              <span className="px-2.5 py-1 bg-indigo-900 text-indigo-200 text-xs font-mono font-bold rounded-lg border border-indigo-700">
                SRS Active
              </span>
            </div>
            
            <div className="p-4 bg-slate-950/80 rounded-xl border border-indigo-900 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs text-slate-400 block">Next Recommended Review Window:</span>
                <span className="text-base sm:text-lg font-black text-indigo-300">
                  {errors === 0
                    ? 'Review in 7 days (Optimal retention interval)'
                    : errors <= 3
                    ? 'Review in 3 days (Reinforcement interval)'
                    : 'Review in 1 day (Rapid recall refresh)'}
                </span>
              </div>
              <div className="text-right sm:border-l sm:border-slate-800 sm:pl-4">
                <span className="text-xs text-slate-400 block">Status</span>
                <span className="text-xs font-bold text-emerald-400">
                  {errors === 0 ? 'review in 7 days' : errors <= 3 ? 'review in 3 days' : 'review in 1 day'}
                </span>
              </div>
            </div>
            <p className="text-[11px] text-slate-400">
              Spaced repetition schedules your review intervals adaptively to flatten the Ebbinghaus forgetting curve and lock biological pathways into long-term memory.
            </p>
          </div>

          {/* Real-World Activity */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
              <span>🔬</span>
              <span>{REAL_WORLD_ACTIVITY.title}</span>
            </h3>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-2 text-xs text-slate-400">
              {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="font-bold text-emerald-500">{i + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* ─── SIMULATION FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="ICSE Stage Complete!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => {}} />}
    </div>
  );
}

export default C10_BiologyChromosomeStructurechromatinSim;