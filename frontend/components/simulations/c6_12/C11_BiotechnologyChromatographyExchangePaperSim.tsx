'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS CONSTANTS (ALL 10 ISC BIOTECH NODES) ───
const NODE_C11_BIOTECH_031 = 'c11_biotech_031'; // Chromatography & Rf value
const NODE_C11_BIOTECH_032 = 'c11_biotech_032'; // Centrifugation & RCF
const NODE_C11_BIOTECH_033 = 'c11_biotech_033'; // Isoelectric Focusing (IEF)
const NODE_C11_BIOTECH_034 = 'c11_biotech_034'; // Antigen & Antibody structure
const NODE_C11_BIOTECH_035 = 'c11_biotech_035'; // Types of Immunity
const NODE_C11_BIOTECH_036 = 'c11_biotech_036'; // Humoral & Cell-mediated
const NODE_C11_BIOTECH_037 = 'c11_biotech_037'; // Plasmids & Antibiotic resistance
const NODE_C11_BIOTECH_038 = 'c11_biotech_038'; // ELISA diagnostic assays
const NODE_C11_BIOTECH_039 = 'c11_biotech_039'; // HLA, MHC & Hypersensitivity
const NODE_C11_BIOTECH_040 = 'c11_biotech_040'; // Plant secondary metabolites

const ALL_NODE_IDS = [
  NODE_C11_BIOTECH_031,
  NODE_C11_BIOTECH_032,
  NODE_C11_BIOTECH_033,
  NODE_C11_BIOTECH_034,
  NODE_C11_BIOTECH_035,
  NODE_C11_BIOTECH_036,
  NODE_C11_BIOTECH_037,
  NODE_C11_BIOTECH_038,
  NODE_C11_BIOTECH_039,
  NODE_C11_BIOTECH_040,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Biotech Diagnostic & Purification Master Lab',
  intro: 'At the National Centre for Biological Sciences in Bengaluru, a critical sample of a newly discovered therapeutic protein and a pathogenic plant extract have arrived. As the lead bioprocess scientist, you must separate biomolecules, verify antibodies, isolate plasmid markers, run ELISA diagnostics, and decode plant defence compounds.',
  context: 'Use chromatography columns, ultra-centrifuges, isoelectric strips, ELISA microplates, and plasmid screening assays to isolate molecules and diagnose viral infections.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'In paper chromatography, a solute spot climbs 4.2 cm while the solvent front climbs 8.4 cm from the origin line. What is its Retention Factor (Rf)?',
  options: ['Rf = 2.0 (Solvent / Solute)', 'Rf = 0.50 (Solute / Solvent)', 'Rf = 3.53 cm', 'Rf = 0.42 (fixed constant)'],
  correctIndex: 1,
  hintAfter: 'Remember: Rf is dimensionless and is calculated as (Distance moved by solute) ÷ (Distance moved by solvent front).',
};

// ─── BRILLIANT.ORG PREDICTION QUESTIONS (PREDICT-THEN-CHECK) ───
export const PREDICTION_QUESTIONS = [
  {
    id: 'pred_01',
    question: 'If you double the rotor speed (rpm) of a centrifuge while keeping the radius constant, what will happen to the Relative Centrifugal Force (RCF)?',
    options: [
      'It will double (2×)',
      'It will quadruple (4×)',
      'It will remain unchanged',
      'It will increase by a factor of 8 (8×)',
    ],
    correctIndex: 1,
    explanation: 'RCF is proportional to the square of RPM (RCF = 1.118 × 10⁻⁵ × r × rpm²). Doubling the speed increases the centrifugal force by 2² = 4 times.',
    verifyInstruction: 'In Lab 2, adjust the centrifuge rotor speed from 4,000 to 8,000 RPM and observe the RCF value quadruple from ~1,789 g to ~7,155 g.',
  },
  {
    id: 'pred_02',
    question: 'In Isoelectric Focusing (IEF), when a protein with an isoelectric point of pI = 4.2 migrates into the pH 4.2 zone of the immobilized strip, what will happen?',
    options: [
      'Its net charge becomes zero and its electrophoretic migration halts completely',
      'It accelerates toward the negative cathode due to protonation',
      'It reverses direction and rapidly travels back to the anode',
      'It immediately precipitates and degrades from denaturation',
    ],
    correctIndex: 0,
    explanation: 'At pH = pI, an amphoteric protein has equal positive and negative charges (net charge = 0). Since electrical force F = qE, when q = 0, migration stops.',
    verifyInstruction: 'In Lab 3, click "Apply Electric Field" and verify that Protein A (pI 4.2) migrates and stops dead center at the pH 4.2 line.',
  },
];

// ─── BRILLIANT.ORG OBSERVATION QUESTIONS (WHAT DO YOU NOTICE?) ───
export const OBSERVATION_QUESTIONS = [
  {
    id: 'obs_01',
    question: 'In the chromatography simulation, what happens to the calculated Retention Factor (Rf) as you increase the solute spot distance while keeping the solvent front constant at 10 cm?',
    observableOptions: [
      'Rf increases directly and proportionally with solute spot migration distance (up to 1.0)',
      'Rf decreases because the solvent front moves farther away',
      'Rf stays fixed at 0.50 regardless of the solute spot position',
      'Rf becomes negative as the spot ascends the paper strip',
    ],
    correctIndex: 0,
    explanation: 'Rf = (solute distance) ÷ (solvent front distance). With a 10 cm solvent front, moving the solute from 2 cm to 8 cm increases Rf from 0.20 to 0.80.',
  },
  {
    id: 'obs_02',
    question: 'When you increase the NaCl salt concentration slider in the cation exchanger above 0.6 M, what visual and biochemical change do you observe?',
    observableOptions: [
      'The bound cationic protein is displaced by Na⁺ ions and elutes from the CM-cellulose resin',
      'The resin permanently denatures and precipitates out of solution',
      'The stationary phase reverses its chemical charge from negative to positive',
      'The protein becomes covalently locked to the column matrix',
    ],
    correctIndex: 0,
    explanation: 'High Na⁺ ionic strength competes for the negatively charged carboxymethyl groups on CM-cellulose, displacing the bound cationic protein into the eluate.',
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
  bloomLevel?: string;
}

// ─── 22 PROGRESSIVE CHALLENGES ───
const CHALLENGES: Challenge[] = [
  // 1. Foundation - Chromatography (Recall)
  {
    id: 'ch_bio_01',
    nodeId: NODE_C11_BIOTECH_031,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In ion exchange chromatography, which resin carries negatively charged functional groups (e.g. CM-cellulose) and binds positively charged proteins?',
    options: ['Cation exchanger', 'Anion exchanger (DEAE-cellulose)', 'Size-exclusion matrix', 'Hydrophobic resin'],
    correctIndex: 0,
    explanation: 'Cation exchangers contain negative fixed groups (like Carboxymethyl) that attract and bind positively charged cations. Anion exchangers (like DEAE) bind negative ions.',
    hints: [
      'Think about what charge the resin attracts: it exchanges cations, so it binds positive ions.',
      'CM-cellulose has COO- groups that bind positively charged biomolecules.',
      'Resins named "cation exchangers" bind positively charged proteins.',
    ],
    misconceptionIndex: 0,
  },
  // 2. Foundation - Numeric Rf value calculation (Application)
  {
    id: 'ch_bio_02',
    nodeId: NODE_C11_BIOTECH_031,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'A spinach leaf extract is separated on Whatman paper. The solvent front advances 12.0 cm from the origin line. The chlorophyll-a spot moves 6.6 cm. Calculate the Rf value.',
    correctAnswer: 0.55,
    tolerance: 0.02,
    unit: '',
    explanation: 'Rf = (Distance moved by solute) / (Distance moved by solvent front) = 6.6 cm / 12.0 cm = 0.55. Notice that units cancel out.',
    hints: [
      'Divide the solute distance by the solvent front distance.',
      'Formula: Rf = 6.6 / 12.0.',
      '6.6 divided by 12.0 equals 0.55.',
    ],
    misconceptionIndex: 1,
  },
  // 3. Foundation - Drag Label: Antibody Structure (Understanding)
  {
    id: 'ch_bio_03',
    nodeId: NODE_C11_BIOTECH_034,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag each structural part of the Immunoglobulin G (IgG) molecule to its correct anatomical region.',
    dragItems: [
      { label: 'Fab (Antigen-binding)', targetId: 'part_fab' },
      { label: 'Fc (Effector/Stem)', targetId: 'part_fc' },
      { label: 'Heavy Chain', targetId: 'part_heavy' },
      { label: 'Light Chain', targetId: 'part_light' },
    ],
    correctMapping: {
      part_fab: 'Fab (Antigen-binding)',
      part_fc: 'Fc (Effector/Stem)',
      part_heavy: 'Heavy Chain',
      part_light: 'Light Chain',
    },
    explanation: 'An antibody consists of 2 identical heavy chains and 2 light chains linked by disulphide bonds. The variable tips form the Fab (antigen binding), while the constant stem forms the Fc (effector functions).',
    hints: [
      'The tips of the Y arms contain the variable antigen-binding domain (Fab).',
      'The stem of the Y is constant and mediates complement/macrophage binding (Fc).',
      'The outer shorter polypeptides are light chains; the central longer ones are heavy chains.',
    ],
    misconceptionIndex: 2,
  },
  // 4. Foundation - Centrifugation (Recall)
  {
    id: 'ch_bio_04',
    nodeId: NODE_C11_BIOTECH_032,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'To isolate intact mammalian nuclei and whole unbroken cells from a liver homogenate, which centrifugation speed is appropriate?',
    options: ['Low-speed centrifugation (2000 - 5000 rpm)', 'High-speed centrifugation (15000 - 20000 rpm)', 'Ultracentrifugation (> 50000 rpm)', 'Micro-filtration'],
    correctIndex: 0,
    explanation: 'Whole cells and dense nuclei pellet during gentle, low-speed spins (2,000-5,000 rpm). Mitochondria require high-speed (10,000-20,000 rpm), and ribosomes need ultracentrifugation.',
    hints: [
      'Large, dense whole cells sediment under minimal centrifugal force.',
      'Low speed (2000 - 5000 rpm) pellets the heaviest cellular fraction.',
      'Select Low-speed centrifugation.',
    ],
    misconceptionIndex: 3,
  },
  // 5. Standard - Centrifugation Drag-Sort (Analysis)
  {
    id: 'ch_bio_05',
    nodeId: NODE_C11_BIOTECH_032,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Order the cellular fractions from FIRST to LAST pelleted during differential centrifugation at increasing speeds.',
    sortItems: [
      'Whole cells & Nuclei (1000 x g)',
      'Mitochondria & Lysosomes (15000 x g)',
      'Microsomes / ER vesicles (50000 x g)',
      'Ribosomes & Macromolecules (100000 x g)',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Heaviest, densest structures sediment first at lower g-forces (nuclei), followed sequentially by mitochondria, microsomes, and finally ribosomes at ultracentrifugal speeds.',
    hints: [
      'The largest organelles pellet at the lowest spin speeds.',
      'Mitochondria pellet after whole nuclei, but before microsomes.',
      'Ribosomes are the smallest and require maximum speed (100,000 x g).',
    ],
  },
  // 6. Standard - Isoelectric Focusing (Understanding)
  {
    id: 'ch_bio_06',
    nodeId: NODE_C11_BIOTECH_033,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'In an IEF gel with a pH gradient from 3 (anode) to 10 (cathode), where will a protein with isoelectric point pI = 6.8 stop migrating?',
    options: [
      'At the pH 6.8 zone where its net charge becomes zero',
      'At the cathode because it is permanently positive',
      'At the anode because it loses all protons',
      'It will run completely off the gel into the buffer',
    ],
    correctIndex: 0,
    explanation: 'In IEF, an electric field drives amphoteric proteins through a pH gradient until local pH = pI. At this point, positive and negative charges balance (net charge = 0) and electrophoretic migration halts.',
    hints: [
      'What is the definition of the isoelectric point (pI)?',
      'When pH equals pI, the net electric charge of the protein is zero.',
      'Without a net charge, electrical force no longer pulls the molecule.',
    ],
  },
  // 7. Standard - Numeric RCF calculation (Application)
  {
    id: 'ch_bio_07',
    nodeId: NODE_C11_BIOTECH_032,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A centrifuge rotor with radius r = 10 cm spins at 6000 rpm. Using RCF = 1.118 × 10⁻⁵ × r × (rpm)², calculate the Relative Centrifugal Force in g (nearest integer).',
    correctAnswer: 4025,
    tolerance: 50,
    unit: 'g',
    explanation: 'RCF = 1.118 × 10^-5 × 10 × (6000)^2 = 1.118 × 10^-4 × 36,000,000 = 4,024.8 ≈ 4025 g.',
    hints: [
      'First calculate (6000)^2 = 36,000,000.',
      'Multiply: 1.118e-5 × 10 × 36,000,000.',
      'The result is approximately 4025 g.',
    ],
  },
  // 8. Standard - Plasmid pBR322 Screening (Analysis)
  {
    id: 'ch_bio_08',
    nodeId: NODE_C11_BIOTECH_037,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A foreign gene is cloned into the BamHI site situated within the tetracycline resistance (tetR) gene of plasmid pBR322. What is the phenotypic growth characteristic of recombinant bacteria?',
    options: [
      'Ampicillin resistant (AmpR), Tetracycline sensitive (TetS)',
      'Ampicillin sensitive (AmpS), Tetracycline resistant (TetR)',
      'Resistant to both Ampicillin and Tetracycline',
      'Sensitive to both Ampicillin and Tetracycline',
    ],
    correctIndex: 0,
    explanation: 'Inserting foreign DNA into the BamHI site disrupts the tetR gene (insertional inactivation), rendering the transformant sensitive to tetracycline, while the ampR gene remains intact and active.',
    hints: [
      'Inserting a gene inside a resistance coding region inactivates that specific gene.',
      'The tetR gene is disrupted, so the bacteria lose tetracycline resistance.',
      'The intact ampR gene still provides ampicillin resistance.',
    ],
  },
  // 9. Standard - ELISA Process Construct (Creativity / Construct)
  {
    id: 'ch_bio_09',
    nodeId: NODE_C11_BIOTECH_038,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'creativity',
    question: 'Build the correct sequence for an Indirect ELISA to detect serum antibodies against HIV.',
    availableParts: ['Antigen-Coating', 'BSA-Blocking', 'Patient-Serum', 'HRP-Secondary-Ab', 'TMB-Substrate'],
    targetState: 'Antigen-Coating BSA-Blocking Patient-Serum HRP-Secondary-Ab TMB-Substrate',
    validationHint: 'Click all 5 steps in the precise chronological order of the indirect ELISA protocol.',
    explanation: '1. Coat well with antigen. 2. Block vacant plastic with BSA. 3. Add primary antibody (serum). 4. Add enzyme-conjugated secondary antibody. 5. Add chromogenic substrate (TMB) for colorimetry.',
    hints: [
      'Start by coating the plastic well with viral antigen.',
      'Block unreacted sites next, then add the patient\'s serum sample.',
      'Finish with the enzyme-conjugated antibody followed by the colourless substrate.',
    ],
  },
  // 10. Standard - Types of Immunity (Understanding)
  {
    id: 'ch_bio_10',
    nodeId: NODE_C11_BIOTECH_035,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Administration of Anti-Venom Serum (pre-formed antibodies raised in horses) to a snakebite victim is classified as:',
    options: [
      'Artificial passive acquired immunity',
      'Natural active acquired immunity',
      'Artificial active acquired immunity',
      'Innate non-specific immunity',
    ],
    correctIndex: 0,
    explanation: 'Preformed ready-made antibodies injected into a patient provide artificial passive acquired immunity: instant protection with no immunological memory.',
    hints: [
      'The patient\'s own body did NOT make these antibodies (it is passive).',
      'The antibodies were injected artificially via clinical serum.',
      'Thus it is Artificial Passive Immunity.',
    ],
  },
  // 11. Standard - Humoral vs Cell-Mediated (Analysis)
  {
    id: 'ch_bio_11',
    nodeId: NODE_C11_BIOTECH_036,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Which cytotoxic effector mechanism is deployed by CD8+ T-cells to destroy viral-infected host cells presenting viral peptides on MHC Class I?',
    options: [
      'Secretion of Perforin (pore formation) and Granzymes (apoptosis)',
      'Direct secretion of pentameric IgM into the blood',
      'Phagocytosis using pseudopodia',
      'Production of beta-lactamase enzyme',
    ],
    correctIndex: 0,
    explanation: 'Cytotoxic T-lymphocytes (CD8+) release perforins to polymerize and create trans-membrane pores, followed by granzymes that activate caspases to trigger programmed cell death (apoptosis).',
    hints: [
      'T-cells do not produce antibodies; they kill infected host cells directly.',
      'They punch holes in target membranes and trigger programmed cell death.',
      'The pore-forming protein is perforin, and granzyme induces apoptosis.',
    ],
  },
  // 12. Standard - MHC Class I vs II (Distinguish)
  {
    id: 'ch_bio_12',
    nodeId: NODE_C11_BIOTECH_039,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'MHC Class II molecules are expressed exclusively on professional Antigen Presenting Cells (APCs). Which cells are professional APCs?',
    options: [
      'Macrophages, Dendritic cells, and B-lymphocytes',
      'All nucleated erythrocytes and platelets',
      'Only mature T-helper and T-cytotoxic cells',
      'Neurons and skeletal muscle fibres',
    ],
    correctIndex: 0,
    explanation: 'MHC Class II is restricted to professional APCs (dendritic cells, macrophages, B-cells) to present exogenous antigens to CD4+ T helper cells.',
    hints: [
      'Professional APCs engulf extracellular pathogens, process them, and display fragments.',
      'Macrophages and dendritic cells are classic professional phagocytes and APCs.',
      'Select the trio: Macrophages, Dendritic cells, and B-cells.',
    ],
  },
  // 13. Advanced - Gell-Coombs Hypersensitivity (Evaluation)
  {
    id: 'ch_bio_13',
    nodeId: NODE_C11_BIOTECH_039,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A 72-hour positive Mantoux tuberculin test induration is mediated by memory T-cells and cytokines. Which Gell-Coombs hypersensitivity type is this?',
    options: [
      'Type IV (Delayed-type cell-mediated hypersensitivity)',
      'Type I (IgE-mediated immediate anaphylaxis)',
      'Type II (Antibody-dependent cytotoxic lysis)',
      'Type III (Immune-complex deposition)',
    ],
    correctIndex: 0,
    explanation: 'The Mantoux test and contact dermatitis take 48-72 hours and are driven by sensitized CD4+ and CD8+ T lymphocytes (Type IV delayed-type hypersensitivity), not antibodies.',
    hints: [
      'Notice the 72-hour delay and T-cell involvement.',
      'Types I, II, and III are mediated by antibodies; Type IV is cell-mediated.',
      'Select Type IV (Delayed-type hypersensitivity).',
    ],
  },
  // 14. Advanced - Plant Secondary Metabolites Classification (Analysis)
  {
    id: 'ch_bio_14',
    nodeId: NODE_C11_BIOTECH_040,
    type: 'match',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Match the plant secondary metabolite to its precise chemical class and defensive role: Quinine from Cinchona tree.',
    options: [
      'Alkaloid — Nitrogenous, bitter compound toxic to herbivores & Plasmodium',
      'Phenolic — Aromatic hydroxyl compound that crosslinks dietary proteins',
      'Terpenoid — Five-carbon isoprene polymer used in microtubule stabilization',
      'Phytoalexin — Induced de novo only after microbial infection',
    ],
    correctIndex: 0,
    explanation: 'Quinine and nicotine are nitrogen-containing heterocyclic alkaloids derived from amino acids that disrupt neurotransmission and metabolic enzymes in pests.',
    hints: [
      'Quinine contains basic heterocyclic nitrogen atoms.',
      'Nitrogenous defensive chemicals are termed alkaloids.',
      'Select the Alkaloid class option.',
    ],
  },
  // 15. Advanced - Induced Phytoalexins (Evaluation)
  {
    id: 'ch_bio_15',
    nodeId: NODE_C11_BIOTECH_040,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why is Phaseolin in French beans or Gossypol in cotton categorized as a Phytoalexin rather than a constitutive alkaloid?',
    options: [
      'It is synthesised de novo in response to pathogen attack, absent or low in healthy tissue',
      'It is an essential primary metabolite required for ATP synthesis in chloroplasts',
      'It is stored permanently in large vacuolar crystals before any infection',
      'It functions as a structural building block of the primary cellulose cell wall',
    ],
    correctIndex: 0,
    explanation: 'Phytoalexins are antimicrobial secondary metabolites synthesised de novo only upon pathogen challenge or elicitor perception, representing an active induced plant defence.',
    hints: [
      'Look at the timing of synthesis: before vs after infection.',
      '"Induced" means produced on demand after sensing pathogen elicitors.',
      'They are synthesised de novo following infection.',
    ],
  },
  // 16. Advanced - Taxol Biotechnology (Application)
  {
    id: 'ch_bio_16',
    nodeId: NODE_C11_BIOTECH_040,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Taxol (paclitaxel), a diterpenoid used in breast and ovarian cancer chemotherapy, is produced sustainably via plant biotechnology by which method?',
    options: [
      'Plant cell suspension cultures in bioreactors, avoiding yew bark harvesting',
      'Stripping the entire trunk bark of wild Pacific yew (Taxus brevifolia) trees',
      'Chemical synthesis from coal tar distillation',
      'Extraction from crude bacterial petroleum sludge',
    ],
    correctIndex: 0,
    explanation: 'To prevent the destruction of wild Taxus yew trees, biotechnology employs plant cell suspension cultures and elicitation in industrial bioreactors for sustainable taxol harvesting.',
    hints: [
      'Think about sustainable lab production without killing endangered trees.',
      'Growing plant cells in liquid nutrient broth is called cell suspension culture.',
      'Select plant cell suspension cultures in bioreactors.',
    ],
  },
  // 17. Advanced - Chromatography Resin Elution Strategy (Analysis)
  {
    id: 'ch_bio_17',
    nodeId: NODE_C11_BIOTECH_031,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A positively charged therapeutic protein is bound tightly to a CM-cellulose cation exchange column at pH 6.0. How can it be selectively eluted?',
    options: [
      'Apply an increasing NaCl salt gradient or raise buffer pH above the protein pI',
      'Lower the buffer pH to 2.0 to make the protein more positively charged',
      'Add pure distilled water with zero ionic strength',
      'Boil the column to denature the cellulose matrix',
    ],
    correctIndex: 0,
    explanation: 'Elution occurs either by salt competition (Na+ ions compete with protein for negative resin sites) or by raising pH above pI so the protein loses positive charge (deprotonation) and detaches.',
    hints: [
      'Na+ ions can displace the bound protein from negative CM-cellulose groups.',
      'Raising the pH above pI converts the protein to a neutral or negative net charge.',
      'Select increasing NaCl gradient or raising buffer pH.',
    ],
  },
  // 18. Advanced - Antibody Isotypes (Recall)
  {
    id: 'ch_bio_18',
    nodeId: NODE_C11_BIOTECH_034,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'recall',
    question: 'Which immunoglobulin is secreted as a dimer in colostrum, tears, and mucosal secretions to provide localized barrier protection?',
    options: ['Secretory IgA', 'Serum IgG', 'Pentameric IgM', 'Membrane-bound IgD'],
    correctIndex: 0,
    explanation: 'IgA is the principal mucosal immunoglobulin, existing as a J-chain linked dimer with a secretory component in breast milk, saliva, tears, and intestinal mucosa.',
    hints: [
      'Look for the immunoglobulin class specialised for mucosal surfaces.',
      'IgA protects mucosal linings and is passed to infants via colostrum.',
      'Select Secretory IgA.',
    ],
  },
  // 19. Advanced - Plasmid Vector Suitability (Evaluation)
  {
    id: 'ch_bio_19',
    nodeId: NODE_C11_BIOTECH_037,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why is an engineered circular DNA lacking an Origin of Replication (ori) completely unusable as a cloning vector in E. coli?',
    options: [
      'Host DNA polymerase cannot initiate replication, so the plasmid is lost during host cell divisions',
      'The plasmid cannot be cleaved by any restriction endonuclease enzyme',
      'Antibiotics cannot bind to the cell wall in its absence',
      'The bacterium immediately bursts due to osmotic lysis',
    ],
    correctIndex: 0,
    explanation: 'The origin of replication (ori) is the specific DNA recognition sequence where DNA polymerase binds. Without ori, the plasmid cannot self-replicate and is diluted out and lost as bacteria divide.',
    hints: [
      'What does "ori" stand for?',
      'Without an origin, bacterial enzymes cannot copy the plasmid DNA.',
      'It cannot replicate and will be lost after cell division.',
    ],
  },
  // 20. Advanced - HLA and Graft Rejection (Application)
  {
    id: 'ch_bio_20',
    nodeId: NODE_C11_BIOTECH_039,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'In renal transplantation at AIIMS New Delhi, a recipient’s cytotoxic T-cells recognize foreign donor HLA-A and HLA-B antigens on the graft vascular endothelium. This direct allorecognition initiates:',
    options: [
      'Acute cellular graft rejection',
      'Immediate Type I anaphylactic allergy',
      'Acquisition of lifelong active immunity against bacteria',
      'Production of recombinant monoclonal antibodies',
    ],
    correctIndex: 0,
    explanation: 'Donor MHC class I (HLA-A, B, C) mismatches provoke host CD8+ T-cell activation, targeting graft capillary endothelial cells and leading to acute cellular rejection.',
    hints: [
      'Mismatched HLA molecules are treated as foreign antigens.',
      'Recipient T-cells attack and destroy the foreign organ tissue.',
      'This process is called acute graft rejection.',
    ],
  },
  // 21. Advanced - Hybridoma Technology (Creativity)
  {
    id: 'ch_bio_21',
    nodeId: NODE_C11_BIOTECH_036,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Construct the hybridoma cell line fusion partnership required for industrial monoclonal antibody production.',
    availableParts: ['Immunized-B-Cell', 'Myeloma-Cancer-Cell', 'PEG-Fusion-Agent', 'HAT-Selection-Medium'],
    targetState: 'Immunized-B-Cell Myeloma-Cancer-Cell PEG-Fusion-Agent HAT-Selection-Medium',
    validationHint: 'Select the antibody producer, the immortal partner, the fusogen, and the selective medium.',
    explanation: 'Hybridoma creation fuses an antibody-producing spleen B-cell with an immortal myeloma cancer cell using Polyethylene Glycol (PEG), followed by selection in Hypoxanthine-Aminopterin-Thymidine (HAT) medium.',
    hints: [
      'You need a spleen B-cell that produces the specific antibody.',
      'Fuse it with an immortal myeloma cell using PEG.',
      'Select the hybrid cells in HAT medium.',
    ],
  },
  // 22. Advanced - ELISA Sandwich vs Indirect (Analysis)
  {
    id: 'ch_bio_22',
    nodeId: NODE_C11_BIOTECH_038,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'To diagnose acute dengue during the first 3 days of fever, detecting dengue NS1 antigen using Sandwich ELISA is preferred over IgM antibody ELISA because:',
    options: [
      'NS1 viral antigen appears immediately in blood during viremia, while IgM antibodies take 5-7 days to develop',
      'Antibodies are destroyed by the high fever in the first 3 days',
      'Sandwich ELISA uses radioactive iodine while indirect ELISA does not',
      'NS1 is an antibiotic produced by the dengue flavivirus',
    ],
    correctIndex: 0,
    explanation: 'During acute early infection (days 1-3), viral NS1 antigen circulates at peak levels in serum. Host IgM antibodies only reach detectable titres after the window period (5-7 days).',
    hints: [
      'Think about the "diagnostic window": which appears first, the viral antigen or host antibodies?',
      'NS1 is a viral protein present during active viral replication in early fever.',
      'IgM antibodies appear later after adaptive immune activation.',
    ],
  },
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
  nodeId: NODE_C11_BIOTECH_031,
  title: 'Biotechnology Separation & Immunology Suite',
  definition: 'An integrated biotechnology suite covering chromatographic separation (paper and ion exchange), centrifugation mechanics, isoelectric focusing, antibody architecture, humoral and cell-mediated immunity, plasmid selection markers, ELISA diagnostics, HLA-MHC complexes, and plant defensive secondary metabolites.',
  eli5: 'Learn how scientists separate tiny proteins, spin cells at massive speeds, use Y-shaped antibody guards to fight diseases, engineer plasmid toolkits with antibiotic shields, and harness plant chemical weapons!',
  misconceptions: [
    {
      misconception: 'Rf value calculation is Solvent Front Distance divided by Solute Distance.',
      correction: 'Rf = (Distance moved by solute) ÷ (Distance moved by solvent front). It is always ≤ 1.0 and dimensionless.',
    },
    {
      misconception: 'All centrifugation speeds separate the same cell fractions.',
      correction: 'Different cell structures have distinct sizes and densities: Low speed pellets whole cells/nuclei; High speed pellets mitochondria; Ultracentrifugation pellets ribosomes and macromolecules.',
    },
    {
      misconception: 'Antibodies can enter host cells to kill intracellular viruses.',
      correction: 'Antibodies are large proteins that function in extracellular fluids. Intracellular viral pathogens are destroyed by Cytotoxic T-cells (cell-mediated immunity).',
    },
    {
      misconception: 'A plasmid confers resistance against all known antibiotics simultaneously.',
      correction: 'A plasmid carries specific resistance genes (e.g., bla for ampicillin, tet for tetracycline) that code for specific enzymes or pumps.',
    },
    {
      misconception: 'All plant defence chemicals are pre-formed and present before infection.',
      correction: 'Phytoalexins are synthesised de novo (induced) only after pathogen attack, whereas alkaloids and phenolics are often constitutive.',
    },
  ],
  diagnosticQuestions: [
    { question: 'What is the stationary phase in paper chromatography?', options: ['Water adsorbed on cellulose fibres', 'The moving organic solvent', 'The glass developing jar', 'The pencil origin line'], correctIndex: 0 },
    { question: 'Which immunoglobulin crosses the human placenta?', options: ['IgG', 'IgM', 'IgE', 'IgA'], correctIndex: 0 },
    { question: 'At what pH does a protein halt during Isoelectric Focusing (IEF)?', options: ['pH = pI (net charge zero)', 'pH = 7.0 always', 'pH = 1.0', 'pH = 14.0'], correctIndex: 0 },
    { question: 'In plasmid pBR322, what enzyme is encoded by the ampR (bla) gene?', options: ['Beta-lactamase', 'DNA ligase', 'Reverse transcriptase', 'Taq polymerase'], correctIndex: 0 },
    { question: 'Which cells carry MHC Class II molecules?', options: ['Professional Antigen Presenting Cells (Macrophages, B-cells, Dendritic)', 'All nucleated somatic cells', 'Only mature red blood cells', 'Only hair follicle cells'], correctIndex: 0 },
    { question: 'Which secondary metabolite from Pacific Yew tree is used in cancer therapy?', options: ['Taxol (paclitaxel)', 'Quinine', 'Nicotine', 'Tannin'], correctIndex: 0 },
    { question: 'What enzyme conjugate is commonly linked to secondary antibodies in ELISA?', options: ['Horseradish Peroxidase (HRP)', 'Salivary Amylase', 'Pepsin', 'Cellulase'], correctIndex: 0 },
    { question: 'Which immune branch produces circulating antibodies?', options: ['Humoral immunity (B-cells / Plasma cells)', 'Cell-mediated immunity (Cytotoxic T-cells)', 'Innate physical skin barrier', 'Complement C3 pathway alone'], correctIndex: 0 },
  ],
  masteryCriteria: 'Master chromatographic partitioning, centrifugation RCF, IEF, antibody structure, immune pathways, plasmid vectors, ELISA, and plant defence chemistry.',
};

// ─── 5 INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Paper & Ion Exchange Chromatography',
    instruction: 'Adjust solute migration & resin salt gradient to observe Rf changes and protein elution.',
    interactionType: 'slider-observe',
    nodeId: NODE_C11_BIOTECH_031,
  },
  {
    title: 'Lab 2: Differential Centrifugation & RCF Rotor',
    instruction: 'Spin the centrifuge rotor from 3,000 to 80,000 rpm and observe particle sedimentation.',
    interactionType: 'rotor-spin',
    nodeId: NODE_C11_BIOTECH_032,
  },
  {
    title: 'Lab 3: Isoelectric Focusing (IEF) pH Strip',
    instruction: 'Apply voltage across the pH 3-10 gradient and watch proteins stop exactly at their pI.',
    interactionType: 'voltage-focus',
    nodeId: NODE_C11_BIOTECH_033,
  },
  {
    title: 'Lab 4: Antibody-Antigen Lock & Key Docking',
    instruction: 'Dock specific antigen epitopes into the variable Fab hypervariable loops of IgG.',
    interactionType: 'dock-epitope',
    nodeId: NODE_C11_BIOTECH_034,
  },
  {
    title: 'Lab 5: Plasmid Vector pBR322 & Blue-White Screening',
    instruction: 'Insert foreign gene into BamHI or EcoRI and plate on antibiotic media to screen transformants.',
    interactionType: 'plasmid-screen',
    nodeId: NODE_C11_BIOTECH_037,
  },
];

// ─── REAL WORLD LAB ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Diagnostic Protocol Design: Viral Outbreak Surveillance',
  description: 'Design a rapid diagnostic workflow for a newly detected zoonotic respiratory virus at NIV Pune. Select the target (viral spike antigen vs patient IgM/IgG), choose between Sandwich and Indirect ELISA, specify HRP/TMB substrate parameters, and prepare positive/negative control wells.',
  steps: [
    'Coat 96-well microplate with monoclonal capture antibody against viral spike glycoprotein.',
    'Block non-specific plastic binding sites using 3% Bovine Serum Albumin (BSA).',
    'Add clinical serum samples alongside verified positive and negative controls.',
    'Incubate with HRP-conjugated detection antibody and wash 4 times with PBST buffer.',
    'Add TMB chromogenic substrate, stop reaction with 1M H2SO4, and read optical density at 450 nm.',
  ],
};

function C11_BiotechnologyChromatographyExchangePaperSim({
  nodeId = DEFAULT_PROPS.nodeId,
  title = DEFAULT_PROPS.title,
  misconceptions = DEFAULT_PROPS.misconceptions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['biotech'] || { name: 'Biotechnology', emoji: '🧬', color: 'teal' };

  // ─── PHASE STATE ───
  const [phase, setPhase] = useState<'discovery' | 'predict' | 'explore' | 'observe' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // ─── PREDICTION & OBSERVATION ACTIVE STATES ───
  const [predIndex, setPredIndex] = useState(0);
  const [predSelected, setPredSelected] = useState<number | null>(null);
  const [predSubmitted, setPredSubmitted] = useState(false);

  const [obsIndex, setObsIndex] = useState(0);
  const [obsSelected, setObsSelected] = useState<number | null>(null);
  const [obsSubmitted, setObsSubmitted] = useState(false);

  // ─── INTERACTION STATES ───
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Lab 1: Chromatography states
  const [solventFrontHeight] = useState(10); // cm
  const [soluteSpotHeight, setSoluteSpotHeight] = useState(5.5); // cm
  const [resinType, setResinType] = useState<'cation' | 'anion'>('cation');
  const [saltConcentration, setSaltConcentration] = useState(0.1); // M NaCl
  const [boundProteinEluted, setBoundProteinEluted] = useState(false);

  // Lab 2: Centrifugation states
  const [centrifugeSpeedRpm, setCentrifugeSpeedRpm] = useState(4000); // rpm
  const [rotorRadiusCm, setRotorRadiusCm] = useState(10); // cm
  const [isCentrifuging, setIsCentrifuging] = useState(false);
  const [pelletFraction, setPelletFraction] = useState('Whole Cells & Nuclei');

  // Lab 3: IEF states
  const [iefVoltageOn, setIefVoltageOn] = useState(false);
  const [proteinApI] = useState(4.2);
  const [proteinBpI] = useState(7.0);
  const [proteinCpI] = useState(9.4);

  // Lab 4: Immunology states
  const [selectedAntibodyClass, setSelectedAntibodyClass] = useState<'IgG' | 'IgM' | 'IgA' | 'IgE' | 'IgD'>('IgG');
  const [epitopeDocked, setEpitopeDocked] = useState(false);

  // Lab 5: Plasmid & ELISA & Plant Metabolites states
  const [plasmidClonedSite, setPlasmidClonedSite] = useState<'BamHI' | 'EcoRI' | 'PstI'>('BamHI');
  const [elisaStep, setElisaStep] = useState(0); // 0 to 4
  const [plantSecondaryClass, setPlantSecondaryClass] = useState<'alkaloid' | 'phenolic' | 'phytoalexin' | 'terpenoid'>('alkaloid');

  // Reflection section answers
  const [reflectionAnswers, setReflectionAnswers] = useState({
    surprising: '',
    explain: '',
    realLife: '',
  });

  // Adaptive & Challenge states
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('foundation');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Hints & Visual feedback
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Drag & Sort & Construct states
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Feedback components
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos] = useState({ x: 0, y: 0 });

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // ─── CALCULATED VALUES ───
  const calculatedRf = useMemo(() => {
    if (solventFrontHeight <= 0) return 0;
    return Number((soluteSpotHeight / solventFrontHeight).toFixed(2));
  }, [soluteSpotHeight, solventFrontHeight]);

  const calculatedRCF = useMemo(() => {
    return Math.round(1.118e-5 * rotorRadiusCm * Math.pow(centrifugeSpeedRpm, 2));
  }, [rotorRadiusCm, centrifugeSpeedRpm]);

  // ─── FILTERED CHALLENGES BY DIFFICULTY ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const currentChallengeObj = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── MOUNT MASTERY CHECK ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId || NODE_C11_BIOTECH_031);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT ADAPTIVE DIFFICULTY ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDiff = (mastery === 'not-started' || mastery === 'beginner') ? 'foundation'
      : mastery === 'developing' ? 'standard' : 'advanced';
    setDifficulty(prev => {
      if (prev !== newDiff) {
        setCurrentChallenge(0);
        return newDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── CENTRIFUGATION FRACTION UPDATE ───
  useEffect(() => {
    if (centrifugeSpeedRpm < 6000) {
      setPelletFraction('Whole Cells & Nuclei (Low Speed: 2,000-5,000 rpm)');
    } else if (centrifugeSpeedRpm <= 20000) {
      setPelletFraction('Mitochondria, Chloroplasts & Lysosomes (High Speed: 10,000-20,000 rpm)');
    } else {
      setPelletFraction('Microsomes, Ribosomes & Macromolecules (Ultracentrifugation: > 50,000 rpm)');
    }
  }, [centrifugeSpeedRpm]);

  // ─── CHROMATOGRAPHY ELUTION UPDATE ───
  useEffect(() => {
    if (saltConcentration >= 0.6) {
      setBoundProteinEluted(true);
    } else {
      setBoundProteinEluted(false);
    }
  }, [saltConcentration]);

  // ─── 2D CANVAS CENTRIFUGE ANIMATION ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let angle = 0;
    const particles = Array.from({ length: 40 }, () => ({
      r: Math.random() * 40 + 10,
      theta: Math.random() * Math.PI * 2,
      size: Math.random() * 3 + 2,
      color: Math.random() > 0.5 ? '#10b981' : '#6366f1',
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Draw rotor head
      ctx.beginPath();
      ctx.arc(cx, cy, 70, 0, Math.PI * 2);
      ctx.fillStyle = '#1e293b';
      ctx.fill();
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Rotor arms
      if (isCentrifuging) {
        angle += (centrifugeSpeedRpm / 2000) * 0.08;
      }

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);

      // Centrifuge buckets
      for (let i = 0; i < 4; i++) {
        const armAngle = (i * Math.PI) / 2;
        const bx = Math.cos(armAngle) * 50;
        const by = Math.sin(armAngle) * 50;
        ctx.fillStyle = '#0ea5e9';
        ctx.fillRect(bx - 6, by - 12, 12, 24);
      }

      // Draw spinning particles inside tube
      particles.forEach(p => {
        const dist = isCentrifuging ? Math.min(65, p.r + (centrifugeSpeedRpm / 50000) * 20) : p.r;
        const px = Math.cos(p.theta + angle) * dist;
        const py = Math.sin(p.theta + angle) * dist;
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      ctx.restore();

      // Text readout
      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px monospace';
      ctx.fillText(`RCF: ${calculatedRCF} g`, 10, 16);

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isCentrifuging, centrifugeSpeedRpm, calculatedRCF]);

  // ─── AUTO-HINT INACTIVITY TIMER ───
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── EVENT HANDLERS ───
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && currentChallengeObj.hints[nextLevel - 1]) {
      setCurrentHint(currentChallengeObj.hints[nextLevel - 1]);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(currentChallengeObj.hints[nextLevel - 1]);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
    }
  }, [hintCount, currentChallengeObj]);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Correct! Rf is the ratio of solute to solvent distance.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToPrediction = useCallback(() => {
    setPhase('predict');
    setPredIndex(0);
    setPredSelected(null);
    setPredSubmitted(false);
    audioManager.play('whoosh');
    speechManager.speak('Make your hypothesis. What do you predict will happen in the bioprocess laboratory?');
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive laboratories. Manipulate parameters and verify your predictions.');
  }, []);

  const handleAdvanceToObservation = useCallback(() => {
    setPhase('observe');
    setObsIndex(0);
    setObsSelected(null);
    setObsSubmitted(false);
    audioManager.play('whoosh');
    speechManager.speak('Observation check: What did you notice from the interactive simulation?');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode. Experiment without any tests or grading.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge mode activated. Put your biotechnology knowledge to the test!');
  }, []);

  const handleToggleCentrifuge = useCallback(() => {
    setIsCentrifuging(prev => {
      const next = !prev;
      audioManager.play(next ? 'whoosh' : 'tap');
      if (next) speechManager.speak(`Spinning rotor at ${centrifugeSpeedRpm} RPM generating ${calculatedRCF} g-force.`);
      return next;
    });
  }, [centrifugeSpeedRpm, calculatedRCF]);

  const handleToggleIef = useCallback(() => {
    setIefVoltageOn(prev => {
      const next = !prev;
      audioManager.play(next ? 'sparkle' : 'tap');
      if (next) {
        speechManager.speak('Electric field applied. Amphoteric proteins migrating to their respective isoelectric points.');
      }
      return next;
    });
  }, []);

  const handleEpitopeDock = useCallback(() => {
    setEpitopeDocked(prev => {
      const next = !prev;
      audioManager.play(next ? 'drop-correct' : 'pickup');
      if (next) speechManager.speak('Antigen epitope successfully locked into the antibody Fab variable pocket!');
      return next;
    });
  }, []);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    const isCorrect = currentChallengeObj.correctMapping?.[targetId] === draggedItem;
    if (isCorrect) {
      setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
      audioManager.play('drop-correct');
    } else {
      audioManager.play('drop-wrong');
    }
    setDraggedItem(null);
  }, [draggedItem, currentChallengeObj]);

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      if (prev.length === 0 && currentChallengeObj.sortItems) {
        prev = currentChallengeObj.sortItems.map((_, i) => i);
      }
      const arr = [...prev];
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [currentChallengeObj]);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak(`Congratulations! You completed the biotechnology suite with a score of ${finalScore} percent.`);
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

  const handleAnswerSubmit = useCallback((answer: number | Record<string, string> | number[] | string) => {
    let isCorrect = false;

    if (currentChallengeObj.type === 'classify' || currentChallengeObj.type === 'distinguish' || currentChallengeObj.type === 'match') {
      isCorrect = answer === currentChallengeObj.correctIndex;
    } else if (currentChallengeObj.type === 'drag-label') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(currentChallengeObj.correctMapping);
    } else if (currentChallengeObj.type === 'drag-sort') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(currentChallengeObj.correctOrder);
    } else if (currentChallengeObj.type === 'numeric') {
      const numAnswer = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
      isCorrect = Math.abs(numAnswer - (currentChallengeObj.correctAnswer || 0)) <= (currentChallengeObj.tolerance || 0.05);
    } else if (currentChallengeObj.type === 'construct') {
      isCorrect = (answer as string).trim() === (currentChallengeObj.targetState || '').trim();
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Outstanding! That is biochemically precise.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(currentChallengeObj.nodeId, currentChallengeObj.question);
      const updatedSrs = sm2Update(srsItem, 5, 3000);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('srs_' + currentChallengeObj.nodeId, JSON.stringify(updatedSrs));
      }
    } else {
      audioManager.play('drop-wrong');
      audioManager.play('error');
      setErrors(e => e + 1);
      setWrongShake(true);
      setWrongFlash(true);
      setTimeout(() => setWrongShake(false), 500);
      setTimeout(() => setWrongFlash(false), 800);

      if (currentChallengeObj.misconceptionIndex !== undefined && !hitMisconceptions.includes(currentChallengeObj.misconceptionIndex)) {
        setHitMisconceptions(prev => [...prev, currentChallengeObj.misconceptionIndex!]);
      }

      if (hintCount < 3) {
        showNextHint();
      } else {
        setAnswerRevealed(true);
        setShowExplanation(true);
        speechManager.speak('Let us review the step-by-step molecular explanation.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(currentChallengeObj.nodeId, currentChallengeObj.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + currentChallengeObj.nodeId, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [currentChallengeObj, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]);

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : (currentChallengeObj.sortItems?.map((_, i) => i) || []);
    handleAnswerSubmit(answer);
  }, [sortArrangement, currentChallengeObj, handleAnswerSubmit]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-900 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans">
      
      {/* ─── HEADER BAR ─── */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800 mb-6"
      >
        <div className="flex items-center gap-3">
          <span className="p-3 bg-teal-950 border border-teal-700/50 rounded-2xl text-2xl shadow-inner" aria-hidden="true">
            {subjectConfig.emoji}
          </span>
          <div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
              {title}
            </h1>
            <p className="text-xs text-teal-400 font-medium">ISC Class 11 Biotechnology • Unit 3 & 4</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.85 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
              difficulty === 'foundation'
                ? 'bg-emerald-950/80 text-emerald-400 border-emerald-700/60'
                : difficulty === 'advanced'
                ? 'bg-rose-950/80 text-rose-400 border-rose-700/60'
                : 'bg-amber-950/80 text-amber-400 border-amber-700/60'
            }`}
          >
            Tier: {difficulty}
          </motion.span>
          <span className="text-xs bg-slate-800 px-3 py-1 rounded-full border border-slate-700 text-slate-300">
            Phase: <strong className="text-white capitalize">{phase}</strong>
          </span>
        </div>
      </motion.div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-teal-950/60 via-slate-900 to-indigo-950/60 rounded-2xl border border-teal-700/40 shadow-xl">
            <h2 className="text-xl font-black text-teal-300 flex items-center gap-2">
              🔬 {SCENARIO.title}
            </h2>
            <p className="text-sm text-slate-200 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-teal-300/80 mt-2 font-mono">{SCENARIO.context}</p>
          </div>

          <div className="p-6 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-4">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
              🧪 Diagnostic Curiosity Check
            </span>
            <p className="text-base font-semibold text-white">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, idx) => (
                <motion.button
                  key={idx}
                  aria-label={`Option ${String.fromCharCode(65 + idx)}: ${opt}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleDiscoveryAnswer(idx)}
                  disabled={discoveryAnswered}
                  className={`p-4 rounded-xl text-left text-sm font-medium transition-all ${
                    discoveryAnswered
                      ? idx === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-900/70 border-2 border-emerald-500 text-emerald-100'
                        : 'bg-slate-800/50 text-slate-500 border border-slate-700'
                      : 'bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700'
                  }`}
                >
                  <span className="font-bold mr-2 text-teal-400">{String.fromCharCode(65 + idx)}.</span>
                  {opt}
                  {discoveryAnswered && idx === DISCOVERY_QUESTION.correctIndex && ' ✓'}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pt-4 border-t border-slate-700 flex flex-wrap items-center justify-between gap-4">
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {discoveryCorrect ? '✓ Correct! You grasped the definition of Rf.' : `✗ ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  aria-label="Proceed to Brilliant Predict Phase"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToPrediction}
                  className="px-6 py-3 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl shadow-lg shadow-teal-900/50 flex items-center gap-2"
                >
                  Step 1: Predict Lab Behaviors →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE: PREDICTION (BRILLIANT.ORG PATTERN) ─── */}
      {phase === 'predict' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                🔮 Brilliant.org Predict-Then-Check Pattern
              </span>
              <h2 className="text-base font-bold text-white">Prediction Hypothesis {predIndex + 1} of {PREDICTION_QUESTIONS.length}</h2>
            </div>
            <div className="flex gap-2">
              {PREDICTION_QUESTIONS.map((_, i) => (
                <div key={i} className={`w-8 h-2 rounded-full ${i === predIndex ? 'bg-amber-400' : i < predIndex ? 'bg-teal-500' : 'bg-slate-700'}`} />
              ))}
            </div>
          </div>

          <div className="p-6 bg-slate-800/90 rounded-2xl border border-slate-700 space-y-4">
            <p className="text-base sm:text-lg font-semibold text-white">
              {PREDICTION_QUESTIONS[predIndex].question}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {PREDICTION_QUESTIONS[predIndex].options.map((opt, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={predSubmitted}
                  onClick={() => setPredSelected(idx)}
                  className={`p-4 rounded-xl text-left text-sm font-medium transition-all ${
                    predSelected === idx
                      ? 'bg-amber-950/80 border-2 border-amber-500 text-amber-100'
                      : 'bg-slate-900 text-slate-200 border border-slate-750 hover:border-slate-600'
                  } ${
                    predSubmitted && idx === PREDICTION_QUESTIONS[predIndex].correctIndex
                      ? 'bg-emerald-950/80 border-2 border-emerald-500 text-emerald-100'
                      : ''
                  }`}
                >
                  <span className="font-bold mr-2 text-amber-400">{String.fromCharCode(65 + idx)}.</span>
                  {opt}
                </motion.button>
              ))}
            </div>

            {!predSubmitted ? (
              <div className="pt-4 flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={predSelected === null}
                  onClick={() => {
                    setPredSubmitted(true);
                    audioManager.play('pop');
                  }}
                  className="px-6 py-2.5 bg-amber-600 hover:bg-amber-500 disabled:opacity-40 text-white font-bold rounded-xl text-xs shadow-lg"
                >
                  Lock In Prediction
                </motion.button>
              </div>
            ) : (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pt-4 border-t border-slate-700 space-y-3">
                <div className="p-4 bg-teal-950/60 border border-teal-700 rounded-xl space-y-2">
                  <p className="text-xs font-bold text-teal-300">🔍 How to Verify in the Lab:</p>
                  <p className="text-xs text-slate-200 font-mono">{PREDICTION_QUESTIONS[predIndex].verifyInstruction}</p>
                </div>
                <div className="flex justify-end gap-3 pt-2">
                  {predIndex < PREDICTION_QUESTIONS.length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setPredIndex(i => i + 1);
                        setPredSelected(null);
                        setPredSubmitted(false);
                      }}
                      className="px-6 py-2 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl text-xs"
                    >
                      Next Prediction →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleAdvanceToExploration}
                      className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow-lg"
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

      {/* ─── PHASE 2: INTERACTIVE GUIDED EXPLORATION ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          
          {/* Lab Navigator */}
          <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-800/60 rounded-2xl border border-slate-700">
            <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">
              Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>
            <div className="flex gap-1">
              {EXPLORATION_STEPS.map((_, i) => (
                <div
                  key={i}
                  className={`h-2 w-8 rounded-full transition-all ${
                    i === currentSlide ? 'bg-teal-400 w-12' : i < currentSlide ? 'bg-teal-700' : 'bg-slate-700'
                  }`}
                />
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 bg-slate-800/90 rounded-2xl border border-slate-700 space-y-6 shadow-xl"
            >
              <div>
                <h3 className="text-xl font-bold text-teal-300">{EXPLORATION_STEPS[currentSlide].title}</h3>
                <p className="text-sm text-amber-300 mt-1 flex items-center gap-2">
                  👉 <span>{EXPLORATION_STEPS[currentSlide].instruction}</span>
                </p>
              </div>

              {/* ─── SLIDE 0: CHROMATOGRAPHY LAB ─── */}
              {currentSlide === 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                  {/* Visual Paper Chamber */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400">Paper Chromatography Strip</h4>
                    <svg viewBox="0 0 300 240" className="w-full h-56 bg-slate-900 rounded-xl border border-slate-800" aria-label="Paper chromatography chamber diagram">
                      <rect x="30" y="10" width="240" height="220" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="2" />
                      <rect x="35" y="200" width="230" height="25" fill="#0284c7" opacity="0.4" />
                      <text x="150" y="218" fill="#7dd3fc" fontSize="9" textAnchor="middle">Mobile Solvent Reservoir</text>

                      <rect x="110" y="25" width="80" height="185" fill="#f8fafc" rx="3" stroke="#94a3b8" />
                      <line x1="110" y1="180" x2="190" y2="180" stroke="#64748b" strokeDasharray="3,3" strokeWidth="1.5" />
                      <text x="105" y="183" fill="#94a3b8" fontSize="8" textAnchor="end">Origin</text>

                      <motion.line
                        x1="110"
                        y1={180 - solventFrontHeight * 12}
                        x2="190"
                        y2={180 - solventFrontHeight * 12}
                        stroke="#0ea5e9"
                        strokeWidth="2"
                        animate={{ y1: 180 - solventFrontHeight * 12, y2: 180 - solventFrontHeight * 12 }}
                      />
                      <text x="195" y={183 - solventFrontHeight * 12} fill="#38bdf8" fontSize="8">Solvent Front ({solventFrontHeight} cm)</text>

                      <motion.circle
                        cx="150"
                        cy={180 - soluteSpotHeight * 12}
                        r="7"
                        fill="#10b981"
                        animate={{ cy: 180 - soluteSpotHeight * 12 }}
                      />
                      <text x="150" y={176 - soluteSpotHeight * 12} fill="#059669" fontSize="8" textAnchor="middle">Chlorophyll-a ({soluteSpotHeight} cm)</text>
                    </svg>

                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                      <span className="text-slate-400">Calculated Retention Factor:</span>
                      <span className="text-base font-black text-emerald-400 font-mono">Rf = {calculatedRf}</span>
                    </div>
                  </div>

                  {/* Ion Exchange Column Controls */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400">Ion-Exchange Column Controls</h4>
                    
                    <div>
                      <label htmlFor="solute-distance-slider" className="text-xs text-slate-300 flex justify-between mb-1">
                        <span>Solute Distance: {soluteSpotHeight} cm</span>
                        <span>Solvent Front: {solventFrontHeight} cm</span>
                      </label>
                      <input
                        id="solute-distance-slider"
                        aria-label="Solute spot migration distance"
                        type="range"
                        min={1}
                        max={solventFrontHeight}
                        step={0.1}
                        value={soluteSpotHeight}
                        onChange={e => setSoluteSpotHeight(Number(e.target.value))}
                        className="w-full accent-teal-500"
                      />
                    </div>

                    <div>
                      <span className="text-xs text-slate-300 flex justify-between mb-1">
                        <span>Resin Type</span>
                        <span className="text-teal-400 font-bold uppercase">{resinType === 'cation' ? 'Cation Exchanger (CM-Cellulose)' : 'Anion Exchanger (DEAE)'}</span>
                      </span>
                      <div className="grid grid-cols-2 gap-2">
                        <motion.button
                          aria-label="Select Cation Exchanger Resin"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setResinType('cation')}
                          className={`p-2 rounded-lg text-xs font-bold border ${
                            resinType === 'cation' ? 'bg-teal-900 border-teal-500 text-teal-200' : 'bg-slate-800 border-slate-700 text-slate-400'
                          }`}
                        >
                          Cation (CM-Cellulose -)
                        </motion.button>
                        <motion.button
                          aria-label="Select Anion Exchanger Resin"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setResinType('anion')}
                          className={`p-2 rounded-lg text-xs font-bold border ${
                            resinType === 'anion' ? 'bg-teal-900 border-teal-500 text-teal-200' : 'bg-slate-800 border-slate-700 text-slate-400'
                          }`}
                        >
                          Anion (DEAE-Cellulose +)
                        </motion.button>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="salt-concentration-slider" className="text-xs text-slate-300 flex justify-between mb-1">
                        <span>NaCl Salt Gradient (Elution):</span>
                        <span className="font-mono text-teal-400 font-bold">{saltConcentration} M</span>
                      </label>
                      <input
                        id="salt-concentration-slider"
                        aria-label="Sodium chloride salt concentration for elution"
                        type="range"
                        min={0.05}
                        max={1.5}
                        step={0.05}
                        value={saltConcentration}
                        onChange={e => setSaltConcentration(Number(e.target.value))}
                        className="w-full accent-emerald-500"
                      />
                    </div>

                    <div className={`p-3 rounded-xl border text-xs leading-relaxed transition-all ${
                      boundProteinEluted ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200' : 'bg-amber-950/60 border-amber-600 text-amber-200'
                    }`}>
                      {boundProteinEluted
                        ? '✓ Protein successfully ELUTED! High Na+ ion strength displaced the bound cationic protein from CM-cellulose.'
                        : '⏳ Protein BOUND to resin matrix. Increase salt concentration to elute.'}
                    </div>
                  </div>
                </div>
              )}

              {/* ─── SLIDE 1: CENTRIFUGATION LAB ─── */}
              {currentSlide === 1 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400">2D Spinning Rotor Canvas</h4>
                    <canvas ref={canvasRef} width={260} height={180} className="w-full bg-slate-900 rounded-xl border border-slate-800" aria-label="Centrifuge rotor animation" />
                    
                    <motion.button
                      aria-label={isCentrifuging ? 'Stop centrifuge rotor' : 'Spin centrifuge rotor'}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleToggleCentrifuge}
                      className={`w-full py-3 rounded-xl font-bold text-sm shadow-lg flex items-center justify-center gap-2 ${
                        isCentrifuging ? 'bg-rose-600 hover:bg-rose-500 text-white' : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                      }`}
                    >
                      {isCentrifuging ? '⏹ Stop Rotor' : '▶ Spin Centrifuge Rotor'}
                    </motion.button>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400">Rotor & RCF Parameters</h4>
                    
                    <div>
                      <label htmlFor="centrifuge-speed-slider" className="text-xs text-slate-300 flex justify-between mb-1">
                        <span>Rotor Speed:</span>
                        <span className="font-mono text-teal-400 font-bold">{centrifugeSpeedRpm.toLocaleString()} RPM</span>
                      </label>
                      <input
                        id="centrifuge-speed-slider"
                        aria-label="Centrifuge rotor speed in RPM"
                        type="range"
                        min={1000}
                        max={80000}
                        step={1000}
                        value={centrifugeSpeedRpm}
                        onChange={e => setCentrifugeSpeedRpm(Number(e.target.value))}
                        className="w-full accent-teal-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="rotor-radius-slider" className="text-xs text-slate-300 flex justify-between mb-1">
                        <span>Rotor Radius (r):</span>
                        <span className="font-mono text-teal-400 font-bold">{rotorRadiusCm} cm</span>
                      </label>
                      <input
                        id="rotor-radius-slider"
                        aria-label="Centrifuge rotor radius in centimeters"
                        type="range"
                        min={5}
                        max={20}
                        step={1}
                        value={rotorRadiusCm}
                        onChange={e => setRotorRadiusCm(Number(e.target.value))}
                        className="w-full accent-indigo-500"
                      />
                    </div>

                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Relative Centrifugal Force (RCF):</span>
                        <span className="font-mono font-bold text-teal-300">{calculatedRCF.toLocaleString()} × g</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Pelleted Fraction:</span>
                        <span className="font-semibold text-emerald-400">{pelletFraction}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── SLIDE 2: ISOELECTRIC FOCUSING (IEF) ─── */}
              {currentSlide === 2 && (
                <div className="space-y-6 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400">Immobilized pH Gradient Strip (pH 3 to 10)</h4>
                      <p className="text-xs text-slate-400">Proteins migrate until local pH = isoelectric point (pI), where net charge = 0.</p>
                    </div>
                    <motion.button
                      aria-label="Toggle electric field on IEF strip"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleToggleIef}
                      className={`px-5 py-2 rounded-xl text-xs font-bold ${
                        iefVoltageOn ? 'bg-amber-600 text-white' : 'bg-teal-600 text-white'
                      }`}
                    >
                      {iefVoltageOn ? '⚡ Voltage Active (Focusing)' : '🔌 Apply Electric Field'}
                    </motion.button>
                  </div>

                  <svg viewBox="0 0 600 120" className="w-full h-32 bg-slate-900 rounded-xl border border-slate-800" aria-label="Isoelectric focusing gel strip">
                    <defs>
                      <linearGradient id="phGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#ef4444" />
                        <stop offset="50%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#10b981" />
                      </linearGradient>
                    </defs>
                    <rect x="10" y="20" width="30" height="80" rx="4" fill="#ef4444" opacity="0.8" />
                    <text x="25" y="65" fill="white" fontSize="12" fontWeight="bold" textAnchor="middle">+</text>
                    <text x="25" y="85" fill="#fecaca" fontSize="7" textAnchor="middle">Anode</text>

                    <rect x="45" y="25" width="510" height="70" rx="6" fill="url(#phGrad)" opacity="0.4" stroke="#475569" />
                    
                    {[3, 4, 5, 6, 7, 8, 9, 10].map((ph, idx) => {
                      const posX = 50 + idx * 71.4;
                      return (
                        <g key={ph}>
                          <line x1={posX} y1="25" x2={posX} y2="95" stroke="#ffffff" strokeOpacity="0.2" strokeDasharray="2,2" />
                          <text x={posX} y="110" fill="#cbd5e1" fontSize="9" textAnchor="middle">pH {ph}</text>
                        </g>
                      );
                    })}

                    <motion.g
                      animate={{
                        x: iefVoltageOn ? 50 + ((proteinApI - 3) / 7) * 500 : 250,
                      }}
                      transition={{ duration: 1.5 }}
                    >
                      <rect y="25" width="6" height="70" fill="#facc15" rx="2" />
                      <text y="20" fill="#facc15" fontSize="8" textAnchor="middle">Prot A (pI 4.2)</text>
                    </motion.g>

                    <motion.g
                      animate={{
                        x: iefVoltageOn ? 50 + ((proteinBpI - 3) / 7) * 500 : 260,
                      }}
                      transition={{ duration: 1.5 }}
                    >
                      <rect y="25" width="6" height="70" fill="#38bdf8" rx="2" />
                      <text y="20" fill="#38bdf8" fontSize="8" textAnchor="middle">Prot B (pI 7.0)</text>
                    </motion.g>

                    <motion.g
                      animate={{
                        x: iefVoltageOn ? 50 + ((proteinCpI - 3) / 7) * 500 : 270,
                      }}
                      transition={{ duration: 1.5 }}
                    >
                      <rect y="25" width="6" height="70" fill="#ec4899" rx="2" />
                      <text y="20" fill="#ec4899" fontSize="8" textAnchor="middle">Prot C (pI 9.4)</text>
                    </motion.g>

                    <rect x="560" y="20" width="30" height="80" rx="4" fill="#3b82f6" opacity="0.8" />
                    <text x="575" y="65" fill="white" fontSize="12" fontWeight="bold" textAnchor="middle">-</text>
                    <text x="575" y="85" fill="#bfdbfe" fontSize="7" textAnchor="middle">Cathode</text>
                  </svg>
                </div>
              )}

              {/* ─── SLIDE 3: ANTIBODIES & IMMUNITY ─── */}
              {currentSlide === 3 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400">Y-Shaped Immunoglobulin G (IgG)</h4>
                    <svg viewBox="0 0 300 240" className="w-full h-56 bg-slate-900 rounded-xl border border-slate-800" aria-label="Y-shaped antibody IgG schematic">
                      <path d="M 140 210 L 140 120 L 80 40" stroke="#3b82f6" strokeWidth="10" fill="none" strokeLinecap="round" />
                      <path d="M 160 210 L 160 120 L 220 40" stroke="#3b82f6" strokeWidth="10" fill="none" strokeLinecap="round" />

                      <path d="M 60 55 L 120 135" stroke="#10b981" strokeWidth="8" fill="none" strokeLinecap="round" />
                      <path d="M 240 55 L 180 135" stroke="#10b981" strokeWidth="8" fill="none" strokeLinecap="round" />

                      <line x1="140" y1="140" x2="160" y2="140" stroke="#f59e0b" strokeWidth="3" />
                      <line x1="140" y1="160" x2="160" y2="160" stroke="#f59e0b" strokeWidth="3" />

                      <circle cx="70" cy="45" r="14" fill="#f59e0b" opacity="0.3" />
                      <circle cx="230" cy="45" r="14" fill="#f59e0b" opacity="0.3" />

                      {epitopeDocked && (
                        <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }}>
                          <polygon points="70,35 60,55 80,55" fill="#ef4444" />
                          <polygon points="230,35 220,55 240,55" fill="#ef4444" />
                          <text x="150" y="30" fill="#f87171" fontSize="9" textAnchor="middle">✓ Epitope DOCKED (Lock-and-Key)</text>
                        </motion.g>
                      )}

                      <text x="150" y="195" fill="#93c5fd" fontSize="9" textAnchor="middle">Fc Stem (Effector)</text>
                      <text x="50" y="30" fill="#fcd34d" fontSize="9">Fab (Antigen-binding)</text>
                    </svg>

                    <motion.button
                      aria-label={epitopeDocked ? 'Release antigen epitope from Fab' : 'Dock antigen epitope into Fab'}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleEpitopeDock}
                      className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs"
                    >
                      {epitopeDocked ? 'Release Antigen Epitope' : 'Dock Epitope into Fab Paratope'}
                    </motion.button>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400">Five Immunoglobulin Classes</h4>
                    <div className="grid grid-cols-5 gap-1">
                      {(['IgG', 'IgM', 'IgA', 'IgE', 'IgD'] as const).map(iso => (
                        <motion.button
                          key={iso}
                          aria-label={`Select ${iso} antibody isotype`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedAntibodyClass(iso)}
                          className={`py-2 rounded-lg text-xs font-bold border ${
                            selectedAntibodyClass === iso ? 'bg-teal-900 border-teal-500 text-teal-200' : 'bg-slate-800 border-slate-700 text-slate-400'
                          }`}
                        >
                          {iso}
                        </motion.button>
                      ))}
                    </div>

                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2 text-xs">
                      <p className="font-bold text-teal-300">
                        {selectedAntibodyClass === 'IgG' && 'IgG (Monomer): Most abundant in blood (80%), secondary immune response, crosses placenta.'}
                        {selectedAntibodyClass === 'IgM' && 'IgM (Pentamer, 10 binding sites): First antibody produced in primary response; potent agglutinator.'}
                        {selectedAntibodyClass === 'IgA' && 'IgA (Dimer with secretory component): Dominant in tears, saliva, colostrum & mucosal defence.'}
                        {selectedAntibodyClass === 'IgE' && 'IgE (Monomer): Mediates Type I hypersensitivity (allergies, asthma) & anti-helminth defence.'}
                        {selectedAntibodyClass === 'IgD' && 'IgD (Monomer): Acts as B-cell receptor on mature naive B-lymphocytes.'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── SLIDE 4: PLASMID pBR322 & SELECTION ─── */}
              {currentSlide === 4 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400">pBR322 Cloning Vector Map</h4>
                    <svg viewBox="0 0 260 220" className="w-full h-52 bg-slate-900 rounded-xl border border-slate-800" aria-label="pBR322 plasmid genetic map">
                      <circle cx="130" cy="110" r="70" fill="none" stroke="#64748b" strokeWidth="8" />

                      <circle cx="130" cy="110" r="70" fill="none" stroke="#10b981" strokeWidth="10" strokeDasharray="80 360" strokeDashoffset="40" />
                      <text x="65" y="80" fill="#34d399" fontSize="8" fontWeight="bold">ampR (bla)</text>

                      <circle cx="130" cy="110" r="70" fill="none" stroke="#f59e0b" strokeWidth="10" strokeDasharray="90 350" strokeDashoffset="180" />
                      <text x="180" y="80" fill="#fbbf24" fontSize="8" fontWeight="bold">tetR</text>

                      <circle cx="130" cy="110" r="70" fill="none" stroke="#ec4899" strokeWidth="10" strokeDasharray="40 400" strokeDashoffset="300" />
                      <text x="130" y="195" fill="#f472b6" fontSize="8" textAnchor="middle">ori</text>

                      <text x="130" y="105" fill="#f8fafc" fontSize="10" fontWeight="bold" textAnchor="middle">pBR322</text>
                      <text x="130" y="120" fill="#94a3b8" fontSize="8" textAnchor="middle">4361 bp</text>
                    </svg>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400">Insertional Inactivation Screen</h4>
                    
                    <div>
                      <span className="text-xs text-slate-300 block mb-1">Select Restriction Insertion Site:</span>
                      <div className="grid grid-cols-3 gap-2">
                        {(['BamHI', 'EcoRI', 'PstI'] as const).map(site => (
                          <motion.button
                            key={site}
                            aria-label={`Insert gene at ${site} restriction site`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setPlasmidClonedSite(site)}
                            className={`p-2 rounded-lg text-xs font-bold border ${
                              plasmidClonedSite === site ? 'bg-teal-900 border-teal-500 text-teal-200' : 'bg-slate-800 border-slate-700 text-slate-400'
                            }`}
                          >
                            {site}
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2 text-xs">
                      <p className="text-slate-300">
                        {plasmidClonedSite === 'BamHI' && '✓ BamHI cuts inside the tetR gene. Insertion causes insertional inactivation → Transformants are AmpR and TetS.'}
                        {plasmidClonedSite === 'PstI' && '✓ PstI cuts inside the ampR gene. Insertion causes insertional inactivation → Transformants are AmpS and TetR.'}
                        {plasmidClonedSite === 'EcoRI' && '✓ EcoRI cuts outside resistance genes → Transformants retain both AmpR and TetR.'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>

          {/* Nav Buttons */}
          <div className="flex justify-between items-center pt-2">
            <motion.button
              aria-label="Go to previous lab"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
              disabled={currentSlide === 0}
              className="px-5 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white rounded-xl text-xs font-bold border border-slate-700"
            >
              ← Previous Lab
            </motion.button>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                aria-label="Go to next lab step"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide(s => s + 1)}
                className="px-6 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-teal-950/50"
              >
                Next Lab Step →
              </motion.button>
            ) : (
              <motion.button
                aria-label="Proceed to Observation Phase"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToObservation}
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-950/50"
              >
                Step 3: What Did You Notice? →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE: OBSERVATION QUESTIONS (BRILLIANT.ORG 'WHAT DO YOU NOTICE?') ─── */}
      {phase === 'observe' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">
                👀 Brilliant.org 'What Do You Notice?' Pattern
              </span>
              <h2 className="text-base font-bold text-white">Observation Question {obsIndex + 1} of {OBSERVATION_QUESTIONS.length}</h2>
            </div>
            <div className="flex gap-2">
              {OBSERVATION_QUESTIONS.map((_, i) => (
                <div key={i} className={`w-8 h-2 rounded-full ${i === obsIndex ? 'bg-indigo-400' : i < obsIndex ? 'bg-teal-500' : 'bg-slate-700'}`} />
              ))}
            </div>
          </div>

          <div className="p-6 bg-slate-800/90 rounded-2xl border border-slate-700 space-y-4">
            <p className="text-base sm:text-lg font-semibold text-white">
              {OBSERVATION_QUESTIONS[obsIndex].question}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {OBSERVATION_QUESTIONS[obsIndex].observableOptions.map((opt, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={obsSubmitted}
                  onClick={() => setObsSelected(idx)}
                  className={`p-4 rounded-xl text-left text-sm font-medium transition-all ${
                    obsSelected === idx
                      ? 'bg-indigo-950/80 border-2 border-indigo-500 text-indigo-100'
                      : 'bg-slate-900 text-slate-200 border border-slate-750 hover:border-slate-600'
                  } ${
                    obsSubmitted && idx === OBSERVATION_QUESTIONS[obsIndex].correctIndex
                      ? 'bg-emerald-950/80 border-2 border-emerald-500 text-emerald-100'
                      : ''
                  }`}
                >
                  <span className="font-bold mr-2 text-indigo-400">{String.fromCharCode(65 + idx)}.</span>
                  {opt}
                </motion.button>
              ))}
            </div>

            {!obsSubmitted ? (
              <div className="pt-4 flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={obsSelected === null}
                  onClick={() => {
                    setObsSubmitted(true);
                    audioManager.play('pop');
                  }}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white font-bold rounded-xl text-xs shadow-lg"
                >
                  Submit Observation
                </motion.button>
              </div>
            ) : (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pt-4 border-t border-slate-700 space-y-3">
                <div className="p-4 bg-indigo-950/60 border border-indigo-700 rounded-xl">
                  <p className="text-xs font-bold text-indigo-300">💡 Scientific Insight:</p>
                  <p className="text-xs text-slate-200 mt-1">{OBSERVATION_QUESTIONS[obsIndex].explanation}</p>
                </div>
                <div className="flex justify-end gap-3 pt-2">
                  {obsIndex < OBSERVATION_QUESTIONS.length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setObsIndex(i => i + 1);
                        setObsSelected(null);
                        setObsSubmitted(false);
                      }}
                      className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs"
                    >
                      Next Observation →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleAdvanceToSandbox}
                      className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow-lg"
                    >
                      Enter Sandbox Free Play →
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: SANDBOX / FREE PLAY ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-black text-teal-300">🔬 Open Experimental Sandbox</h3>
              <p className="text-xs text-slate-300 mt-1">Freely toggle antibodies, centrifuge speeds, ELISA wells, and secondary metabolites.</p>
            </div>
            <motion.button
              aria-label="Proceed to Board Challenges"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-950/50"
            >
              Ready for Board Challenges! →
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            
            {/* ELISA Microplate simulation card */}
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold uppercase text-teal-400">ELISA Microplate 4-Step Assay</h4>
              <div className="grid grid-cols-4 gap-1">
                {['1. Coat', '2. Block', '3. 1° Ab', '4. Substrate'].map((st, i) => (
                  <motion.button
                    key={st}
                    aria-label={`Select ELISA Step ${st}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setElisaStep(i)}
                    className={`py-2 rounded-lg text-xs font-bold border ${
                      elisaStep === i ? 'bg-teal-900 border-teal-500 text-teal-200' : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    {st}
                  </motion.button>
                ))}
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs">
                {elisaStep === 0 && 'Well coated with target viral antigen on plastic.'}
                {elisaStep === 1 && 'Unbound plastic blocked with Bovine Serum Albumin (BSA).'}
                {elisaStep === 2 && 'Patient serum added: Primary antibodies bind to coated antigen.'}
                {elisaStep === 3 && 'HRP-Secondary Ab + TMB substrate added: Blue/Yellow chromogenic signal.'}
              </div>
            </div>

            {/* Plant Secondary Metabolites card */}
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold uppercase text-teal-400">Plant Chemical Defence Weapons</h4>
              <div className="grid grid-cols-2 gap-2">
                {(['alkaloid', 'phenolic', 'phytoalexin', 'terpenoid'] as const).map(pClass => (
                  <motion.button
                    key={pClass}
                    aria-label={`Select ${pClass} metabolite class`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setPlantSecondaryClass(pClass)}
                    className={`p-2 rounded-lg text-xs font-bold capitalize border ${
                      plantSecondaryClass === pClass ? 'bg-teal-900 border-teal-500 text-teal-200' : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    {pClass}
                  </motion.button>
                ))}
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300">
                {plantSecondaryClass === 'alkaloid' && 'Alkaloid: Quinine (Cinchona), Nicotine (Tobacco). Nitrogenous, bitter, anti-herbivore.'}
                {plantSecondaryClass === 'phenolic' && 'Phenolic: Tannins (Tea), Curcumin (Turmeric). Aromatic rings with -OH, protein astringents.'}
                {plantSecondaryClass === 'phytoalexin' && 'Phytoalexin: Phaseolin (Beans), Gossypol (Cotton). Induced de novo after pathogen attack.'}
                {plantSecondaryClass === 'terpenoid' && 'Terpenoid: Taxol (Pacific Yew). Built from C5 isoprene units; anti-mitotic cancer therapy.'}
              </div>
            </div>

            {/* Centrifuge Speed card */}
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold uppercase text-teal-400">Centrifuge Speed & RCF</h4>
              <label htmlFor="sandbox-centrifuge-speed" className="text-xs text-slate-300 flex justify-between">
                <span>Speed: {centrifugeSpeedRpm.toLocaleString()} RPM</span>
                <span className="text-teal-400 font-mono">{calculatedRCF.toLocaleString()} g</span>
              </label>
              <input
                id="sandbox-centrifuge-speed"
                aria-label="Centrifuge speed in sandbox mode"
                type="range"
                min={2000}
                max={60000}
                step={2000}
                value={centrifugeSpeedRpm}
                onChange={e => setCentrifugeSpeedRpm(Number(e.target.value))}
                className="w-full accent-teal-500"
              />
              <div className="p-2 bg-slate-900 rounded-lg text-xs text-emerald-400 font-semibold">
                {pelletFraction}
              </div>
            </div>

          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: ADAPTIVE CHALLENGE SUITE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          
          {/* Top Challenge Status */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-800/80 rounded-2xl border border-slate-700">
            <div>
              <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <h2 className="text-base font-bold text-white mt-0.5">
                Competency: <span className="text-amber-400 capitalize">{currentChallengeObj.competencyLevel}</span>
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Score: {scoreBreakdown.correct}/{scoreBreakdown.total}</span>
              <div className="w-24 h-2 bg-slate-700 rounded-full overflow-hidden" role="progressbar" aria-valuenow={Math.round(((currentChallenge + 1) / filteredChallenges.length) * 100)} aria-valuemin={0} aria-valuemax={100}>
                <motion.div
                  className="h-full bg-teal-400"
                  animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Question Card */}
          <div className="p-6 bg-slate-800/90 rounded-2xl border border-slate-700 space-y-4 shadow-xl">
            <p className="text-base sm:text-lg font-semibold text-white leading-relaxed">
              {currentChallengeObj.question}
            </p>

            {/* MCQ Type */}
            {(currentChallengeObj.type === 'classify' || currentChallengeObj.type === 'distinguish' || currentChallengeObj.type === 'match') && currentChallengeObj.options && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {currentChallengeObj.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={wrongShake ? { duration: 0.4 } : {}}
                    onClick={() => handleAnswerSubmit(i)}
                    disabled={answerRevealed || showExplanation}
                    className={`p-4 rounded-xl text-left text-sm font-medium transition-all ${
                      wrongFlash
                        ? 'bg-rose-900/60 border-2 border-rose-500 text-rose-100'
                        : showExplanation && i === currentChallengeObj.correctIndex
                        ? 'bg-emerald-900/60 border-2 border-emerald-500 text-emerald-100'
                        : 'bg-slate-900 text-slate-200 hover:bg-slate-750 border border-slate-750 hover:border-teal-500/50'
                    }`}
                  >
                    <span className="font-bold mr-2 text-teal-400">{String.fromCharCode(65 + i)}.</span>
                    {opt}
                    {showExplanation && i === currentChallengeObj.correctIndex && ' ✓'}
                  </motion.button>
                ))}
              </div>
            )}

            {/* Drag Label Type */}
            {currentChallengeObj.type === 'drag-label' && currentChallengeObj.dragItems && (
              <div className="space-y-4 pt-2">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-900 rounded-xl border border-slate-750">
                  {currentChallengeObj.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      role="button"
                      tabIndex={0}
                      aria-label={`Draggable item: ${item.label}`}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-teal-800 hover:bg-teal-700 text-white rounded-lg text-xs font-bold cursor-grab active:cursor-grabbing shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {Object.keys(currentChallengeObj.correctMapping || {}).map(targetId => (
                    <div
                      key={targetId}
                      role="region"
                      aria-label={`Drop target zone: ${targetId.replace('part_', '')}`}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(targetId)}
                      className={`p-4 rounded-xl border-2 border-dashed text-center text-xs font-bold min-h-[70px] flex items-center justify-center ${
                        droppedLabels[targetId]
                          ? 'bg-teal-950/70 border-teal-500 text-teal-300'
                          : 'bg-slate-900/60 border-slate-700 text-slate-500'
                      }`}
                    >
                      {droppedLabels[targetId] ? `✓ ${droppedLabels[targetId]}` : `Drop: ${targetId.replace('part_', '')}`}
                    </div>
                  ))}
                </div>

                <motion.button
                  aria-label="Verify dropped labels"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswerSubmit(droppedLabels)}
                  className="px-6 py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl text-xs"
                >
                  Verify Dropped Labels
                </motion.button>
              </div>
            )}

            {/* Drag Sort Type */}
            {currentChallengeObj.type === 'drag-sort' && currentChallengeObj.sortItems && (
              <div className="space-y-3 pt-2">
                {(sortArrangement.length === currentChallengeObj.sortItems.length
                  ? sortArrangement.map(idx => currentChallengeObj.sortItems![idx])
                  : currentChallengeObj.sortItems
                ).map((item, idx) => (
                  <motion.div
                    key={idx}
                    role="button"
                    tabIndex={0}
                    aria-label={`Sort item ${idx + 1}: ${item}`}
                    draggable
                    onDragStart={() => setDraggedItem(String(idx))}
                    onDragOver={e => e.preventDefault()}
                    onDrop={() => {
                      const from = parseInt(draggedItem || '0', 10);
                      handleSortMove(from, idx);
                    }}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="p-3 bg-slate-900 rounded-xl text-xs font-semibold text-slate-200 border border-slate-700 flex items-center gap-3 cursor-grab"
                  >
                    <span className="w-6 h-6 rounded-full bg-teal-900 text-teal-300 flex items-center justify-center text-xs font-bold">
                      {idx + 1}
                    </span>
                    {item}
                  </motion.div>
                ))}

                <motion.button
                  aria-label="Confirm sorted order"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="px-6 py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl text-xs"
                >
                  Confirm Sorted Order
                </motion.button>
              </div>
            )}

            {/* Numeric Type */}
            {currentChallengeObj.type === 'numeric' && (
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <input
                  aria-label="Enter numerical answer"
                  type="number"
                  step="0.01"
                  value={numericInput}
                  onChange={e => setNumericInput(e.target.value)}
                  placeholder="Enter numerical value"
                  className="px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm font-mono w-48 focus:border-teal-500 outline-none"
                />
                <span className="text-sm font-semibold text-slate-400">{currentChallengeObj.unit}</span>
                <motion.button
                  aria-label="Submit numeric answer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswerSubmit(numericInput)}
                  disabled={showExplanation || !numericInput}
                  className="px-6 py-2.5 bg-teal-600 hover:bg-teal-500 disabled:opacity-40 text-white font-bold rounded-xl text-xs"
                >
                  Submit Value
                </motion.button>
              </div>
            )}

            {/* Construct Type */}
            {currentChallengeObj.type === 'construct' && currentChallengeObj.availableParts && (
              <div className="space-y-4 pt-2">
                <p className="text-xs text-slate-400">{currentChallengeObj.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {currentChallengeObj.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Add component ${part}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3 py-1.5 bg-slate-900 hover:bg-slate-750 border border-slate-700 text-teal-300 rounded-lg text-xs font-semibold"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-700 min-h-[60px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((p, idx) => (
                    <span key={idx} className="px-3 py-1 bg-teal-900 text-teal-200 rounded-lg text-xs font-bold flex items-center gap-2">
                      {p}
                      <button aria-label={`Remove component ${p}`} onClick={() => setConstructParts(prev => prev.filter((_, i) => i !== idx))} className="text-rose-400">✕</button>
                    </span>
                  ))}
                  {constructParts.length === 0 && <span className="text-xs text-slate-500">Click components above in order.</span>}
                </div>

                <motion.button
                  aria-label="Validate assembled pathway"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswerSubmit(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-6 py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl text-xs"
                >
                  Validate Assembled Pathway
                </motion.button>
              </div>
            )}

            {/* Step-by-Step Progressive Disclosure Explanation */}
            {showExplanation && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-5 bg-teal-950/60 border border-teal-700 rounded-2xl space-y-3">
                <span className="text-xs font-bold text-teal-300 uppercase tracking-wider">
                  📖 Step-by-Step Scientific Walkthrough
                </span>
                
                {currentChallengeObj.explanation.split('. ').filter(s => s.trim().length > 0).slice(0, revealedSteps + 1).map((sentence, idx) => (
                  <motion.p
                    key={idx}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-xs sm:text-sm text-slate-200 leading-relaxed"
                  >
                    <span className="font-bold text-teal-400">{idx + 1}.</span> {sentence}{!sentence.endsWith('.') && '.'}
                  </motion.p>
                ))}

                <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                  {revealedSteps < currentChallengeObj.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      aria-label="Show next explanation step"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-4 py-1.5 bg-teal-800 hover:bg-teal-700 text-white rounded-lg text-xs font-bold"
                    >
                      Show Next Step →
                    </motion.button>
                  ) : (
                    <motion.button
                      aria-label={currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Master Lab' : 'Next Board Challenge'}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow-lg"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Master Lab 🏆' : 'Next Board Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}

          </div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION & REAL-WORLD LAB PROTOCOL ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          
          <div className="p-8 bg-gradient-to-br from-teal-950/80 via-slate-900 to-indigo-950/80 rounded-3xl border border-teal-600 shadow-2xl text-center space-y-4">
            <span className="text-5xl" aria-hidden="true">🏆</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Biotechnology Laboratory Mastered!</h2>
            <p className="text-sm text-teal-300">
              Final Precision Score: <strong className="text-white text-lg">{Math.max(0, 100 - errors * 5)}%</strong> • Mastery Status: <strong className="text-emerald-400 uppercase">{masteryLevel}</strong>
            </p>

            <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
              {errors === 0
                ? '🌟 Flawless Mastery! You mastered chromatography, centrifugation math, IEF mechanics, immunoglobulin classes, plasmid vectors, ELISA, and secondary metabolites perfectly.'
                : errors <= 3
                ? '✨ Outstanding Performance! Your command over ISC Biotechnology separation techniques and immunology is highly developed.'
                : '🌱 Good Effort! Review the specific misconception corrections below and re-run the interactive labs to cement your board preparation.'}
            </div>
          </div>

          {/* Misconception Tracking Gaps */}
          {hitMisconceptions.length > 0 && (
            <div className="p-6 bg-rose-950/50 rounded-2xl border border-rose-800 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 uppercase tracking-wider">
                🎯 Personalised Concept Correction Profile
              </h3>
              <div className="space-y-3">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-1">
                      <p className="font-bold text-rose-400">✗ Misconception: {m.misconception}</p>
                      <p className="text-emerald-300">✓ Scientific Correction: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ─── REFLECTION QUESTIONS SECTION ─── */}
          <div className="p-6 bg-slate-800/90 rounded-2xl border border-slate-700 space-y-4">
            <h3 className="text-lg font-bold text-teal-300 flex items-center gap-2">
              🤔 Laboratory Reflection & Synthesis
            </h3>
            <p className="text-xs text-slate-300">
              Consolidate your learning by answering these metacognitive reflection prompts:
            </p>

            <div className="space-y-4 pt-2">
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                <label htmlFor="reflect-surprising" className="block text-xs font-bold text-teal-300">
                  1. What was the most surprising thing you learned?
                </label>
                <textarea
                  id="reflect-surprising"
                  aria-label="What was the most surprising thing you learned?"
                  value={reflectionAnswers.surprising}
                  onChange={e => setReflectionAnswers(prev => ({ ...prev, surprising: e.target.value }))}
                  placeholder="e.g., How subtle pH changes stop amphoteric protein migration at the exact isoelectric point..."
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-slate-200 outline-none focus:border-teal-500"
                  rows={2}
                />
              </div>

              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                <label htmlFor="reflect-explain" className="block text-xs font-bold text-teal-300">
                  2. How would you explain this to a friend?
                </label>
                <textarea
                  id="reflect-explain"
                  aria-label="How would you explain this to a friend?"
                  value={reflectionAnswers.explain}
                  onChange={e => setReflectionAnswers(prev => ({ ...prev, explain: e.target.value }))}
                  placeholder="e.g., Ion exchange works like a magnet: negative resin traps positive proteins until salt knocks them off..."
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-slate-200 outline-none focus:border-teal-500"
                  rows={2}
                />
              </div>

              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                <label htmlFor="reflect-reallife" className="block text-xs font-bold text-teal-300">
                  3. Where in real life might you use this?
                </label>
                <textarea
                  id="reflect-reallife"
                  aria-label="Where in real life might you use this?"
                  value={reflectionAnswers.realLife}
                  onChange={e => setReflectionAnswers(prev => ({ ...prev, realLife: e.target.value }))}
                  placeholder="e.g., Industrial production of monoclonal antibodies for cancer therapies or rapid clinical ELISA screening kits..."
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-slate-200 outline-none focus:border-teal-500"
                  rows={2}
                />
              </div>
            </div>
          </div>

          {/* Real World Protocol Arc */}
          <div className="p-6 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-4">
            <h3 className="text-lg font-bold text-teal-300 flex items-center gap-2">
              🧪 {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            
            <div className="space-y-2 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <div key={idx} className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-teal-900 text-teal-300 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Spaced Repetition Visibility */}
          <div className="p-5 bg-gradient-to-r from-amber-950/60 via-slate-900 to-amber-950/60 rounded-2xl border border-amber-500/40 shadow-lg space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                📅 Spaced Repetition Schedule (SuperMemo SM-2)
              </span>
              <span className="px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full text-xs font-black">
                {errors === 0 ? 'Review in 7 days (Optimal Retention)' : errors <= 3 ? 'Review in 3 days (Consolidation)' : 'Review in 1 day (Immediate Reinforcement)'}
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Based on your score ({Math.max(0, 100 - errors * 5)}%) and {errors} mistakes, the cognitive scheduler has queued this module for review: <strong className="text-white">{errors === 0 ? 'in 7 days' : errors <= 3 ? 'in 3 days' : 'tomorrow (1 day)'}</strong> to lock concepts into long-term memory.
            </p>
          </div>

          <motion.button
            aria-label="Re-explore Laboratory Simulation"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              setPhase('explore');
              setCurrentSlide(0);
              setCurrentChallenge(0);
              setErrors(0);
            }}
            className="w-full py-4 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-2xl shadow-xl shadow-teal-950/50 text-sm"
          >
            🔄 Re-explore Laboratory Simulation
          </motion.button>
        </motion.div>
      )}

      {/* ─── FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Precision Protocol Achieved!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}

    </div>
  );
}

export default C11_BiotechnologyChromatographyExchangePaperSim;