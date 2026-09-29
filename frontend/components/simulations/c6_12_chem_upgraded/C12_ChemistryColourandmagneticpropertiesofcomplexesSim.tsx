'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  audioManager,
  speechManager,
  Confetti,
  SuccessBanner,
  HintBubble,
  SparkleBurst,
} from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ==========================================
// NODE IDS & METADATA
// ==========================================
const ALL_NODE_IDS = [
  'c12_chem_061',
  'c12_chem_062',
  'c12_chem_063',
  'c12_chem_064',
  'c12_chem_065',
  'c12_chem_066',
  'c12_chem_067',
  'c12_chem_068',
  'c12_chem_069',
  'c12_chem_070',
] as const;

type NodeId = typeof ALL_NODE_IDS[number];

interface NodeMeta {
  id: NodeId;
  title: string;
  code: string;
  description: string;
  eli5: string;
}

const NODE_METADATA: Record<NodeId, NodeMeta> = {
  c12_chem_061: {
    id: 'c12_chem_061',
    title: 'CFT Octahedral Splitting',
    code: 'ISC-12-61',
    description: 'Crystal Field Theory splitting of 5 degenerate d-orbitals into t2g and eg sets in octahedral geometry.',
    eli5: 'When 6 ligands surround a metal ion along x, y, z axes, orbitals pointing directly at them (eg) get pushed to higher energy, while those pointing between them (t2g) stay lower.',
  },
  c12_chem_062: {
    id: 'c12_chem_062',
    title: 'CFT Tetrahedral Splitting',
    code: 'ISC-12-62',
    description: 'Tetrahedral crystal field splitting where e set is lower and t2 set is higher, with Δt = (4/9)Δo.',
    eli5: 'In a 4-ligand tetrahedron, ligands do not point straight at any d-orbitals. The energy gap Δt is less than half of Δo, so tetrahedral complexes are almost always high-spin.',
  },
  c12_chem_063: {
    id: 'c12_chem_063',
    title: 'Spectrochemical Series',
    code: 'ISC-12-63',
    description: 'Arrangement of ligands in increasing order of crystal field splitting parameter (Δ).',
    eli5: 'Ligands are ranked by how strongly they push d-orbitals apart: I- < Br- < Cl- < F- < OH- < H2O < NH3 < en < CN- < CO.',
  },
  c12_chem_064: {
    id: 'c12_chem_064',
    title: 'High-Spin vs Low-Spin Complexes',
    code: 'ISC-12-64',
    description: 'Comparison of splitting energy Δ versus pairing energy P determining d4 to d7 electron distribution.',
    eli5: 'If splitting Δ is smaller than pairing energy P, electrons spread out first (high spin). If Δ is larger than P, electrons pair up in lower orbitals first (low spin).',
  },
  c12_chem_065: {
    id: 'c12_chem_065',
    title: 'Origin of Colour & d-d Transitions',
    code: 'ISC-12-65',
    description: 'Absorption of visible light promoting an electron from t2g to eg and observed complementary color.',
    eli5: 'Light shines on the complex; an electron absorbs a photon with exact energy Δo to jump up. We see the color that is left behind (the complementary color).',
  },
  c12_chem_066: {
    id: 'c12_chem_066',
    title: 'Factors Affecting Complex Colour',
    code: 'ISC-12-66',
    description: 'Influence of metal ion, oxidation state, ligand field strength, and geometry on absorbed wavelength.',
    eli5: 'Higher oxidation state or stronger ligands pull electrons tighter, increasing Δo, absorbing higher energy (shorter wavelength) light like violet, making the complex look yellow or red.',
  },
  c12_chem_067: {
    id: 'c12_chem_067',
    title: 'Magnetic Properties & Spin-Only Formula',
    code: 'ISC-12-67',
    description: 'Paramagnetism, diamagnetism, and the spin-only magnetic moment formula μ = √(n(n+2)) BM.',
    eli5: 'Unpaired electrons act like tiny magnets. Count unpaired electrons (n) and use μ = √(n(n+2)) to find the magnetic strength in Bohr Magnetons (BM).',
  },
  c12_chem_068: {
    id: 'c12_chem_068',
    title: 'Magnetic Moment Calculations',
    code: 'ISC-12-68',
    description: 'Quantitative calculation of magnetic moments for d1 through d10 ions in high/low spin fields.',
    eli5: 'Given a complex like [Fe(CN)6]3-, figure out Fe3+ is d5, CN- is strong field -> low spin with 1 unpaired electron, so μ = √(1×3) = 1.73 BM.',
  },
  c12_chem_069: {
    id: 'c12_chem_069',
    title: 'Jahn-Teller Distortion',
    code: 'ISC-12-69',
    description: 'Geometric distortion of non-linearly degenerate non-cubic complex molecules to lower symmetry and energy.',
    eli5: 'Unevenly filled eg orbitals (like d9 Cu2+) cause axial ligand bonds to stretch or compress, breaking symmetry and altering color and magnetic behaviour.',
  },
  c12_chem_070: {
    id: 'c12_chem_070',
    title: 'Applications & Analytical Chemistry',
    code: 'ISC-12-60',
    description: 'Qualitative analysis, bio-inorganic iron complexes, MRI contrast agents, and pigments.',
    eli5: 'Color and magnetics help identify metal ions in salt analysis (e.g. Prussian Blue Fe4[Fe(CN)6]3) and design MRI agents like Gd3+ complexes.',
  },
};

// ==========================================
// MISCONCEPTIONS (6 TOPIC SPECIFIC)
// ==========================================
interface Misconception {
  id: string;
  title: string;
  misconception: string;
  correction: string;
  nodeId: NodeId;
}

const MISCONCEPTIONS: Misconception[] = [
  {
    id: 'misc_1',
    title: 'Emitted Light vs Complementary Light',
    misconception: 'Complexes are colored because electrons emit light when dropping back down from eg to t2g.',
    correction: 'Complexes absorb specific wavelengths corresponding to Δ. The observed color is the transmitted complementary color, not fluorescence or emission.',
    nodeId: 'c12_chem_065',
  },
  {
    id: 'misc_2',
    title: 'Tetrahedral Low-Spin Myth',
    misconception: 'Tetrahedral complexes can easily form low-spin configurations with strong ligands.',
    correction: 'Because Δt is only (4/9)Δo, the crystal field splitting parameter Δt is almost never larger than the pairing energy P. Thus, tetrahedral complexes are almost exclusively high-spin.',
    nodeId: 'c12_chem_062',
  },
  {
    id: 'misc_3',
    title: 'Absorbed Wavelength vs Splitting Energy',
    misconception: 'A larger crystal field splitting energy (Δ) corresponds to a longer wavelength of absorbed light.',
    correction: 'Energy is inversely proportional to wavelength (E = hc/λ). Larger Δo means absorption of shorter wavelength (higher frequency/energy) photons.',
    nodeId: 'c12_chem_066',
  },
  {
    id: 'misc_4',
    title: 'Total Electrons vs Unpaired Electrons in Magnetism',
    misconception: 'The magnetic moment depends on the total number of d-electrons in the transition metal.',
    correction: 'Paramagnetism depends ONLY on the number of UNPAIRED electrons (n). Paired electrons cancel each other out in spin.',
    nodeId: 'c12_chem_067',
  },
  {
    id: 'misc_5',
    title: 'Oxidation State Impact on Ligand Field Strength',
    misconception: 'The ligand alone determines whether a complex is high-spin or low-spin.',
    correction: 'Metal oxidation state heavily influences Δ. A metal in a +3 state pulls ligands closer than in a +2 state, substantially increasing Δo and favoring low-spin states.',
    nodeId: 'c12_chem_064',
  },
  {
    id: 'misc_6',
    title: 'd0 and d10 Color Splitting',
    misconception: 'All transition metal complexes with ligands are strongly colored.',
    correction: 'Complexes with d0 (e.g. Sc3+, Ti4+) or d10 (e.g. Zn2+, Cu+) configurations cannot undergo d-d transitions and are typically colorless or white.',
    nodeId: 'c12_chem_065',
  },
];

// ==========================================
// MANDATORY SECTION 1: SCENARIO
// ==========================================
const SCENARIO = {
  title: 'Coordination Spectroscopy & Magnetochemistry Master Laboratory',
  intro: 'Welcome to the High-Precision Inorganic Research Center at the ISC Advanced Analytical Division. You are appointed lead inorganic chemist tasked with identifying unknown transition metal complexes used in optical smart coatings, biomedical MRI contrast agents, and industrial catalyst systems.',
  context: 'Using Crystal Field Theory (CFT), UV-Vis Spectrophotometry, and a Gouy Magnetic Balance, you will analyze electron splitting, predict complex colors, determine magnetic moments, and solve electronic anomalies across d1 to d10 complexes.',
};

// ==========================================
// MANDATORY SECTION 2: DISCOVERY_QUESTION
// ==========================================
const DISCOVERY_QUESTION = {
  question: 'Why does anhydrous CuSO4 appear pure white, whereas dissolving it in water turns the solution a vibrant sky blue ([Cu(H2O)6]2+)?',
  options: [
    'Water oxidizes copper from Cu(I) to Cu(II), changing its fundamental chemical state.',
    'Water molecules act as ligands that split degenerate d-orbitals, enabling d-d electron transitions absorbing orange-red light.',
    'Water molecules act as a prism that refracts incident sunlight into blue wavelengths.',
    'Copper ions form covalent double bonds with water, emitting blue fluorescence continuously.',
  ],
  correctIndex: 1,
  hintAfter: 'Without surrounding ligands, all five 3d orbitals in Cu2+ remain degenerate (equal energy), so no d-d electron promotion can occur. Adding water splits the orbitals into t2g and eg sets with an energy gap Δo matching orange-red light, leaving blue as the complementary transmitted color!',
};

// ==========================================
// MANDATORY SECTION 3: DEFAULT_PROPS & TYPES
// ==========================================
interface SimProps {
  onComplete?: (score: number) => void;
  initialNodeId?: NodeId;
  debugMode?: boolean;
}

const DEFAULT_PROPS: SimProps = {
  debugMode: false,
};

// ==========================================
// MANDATORY SECTION 4: EXPLORATION_STEPS
// ==========================================
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Octahedral vs Tetrahedral Orbital Splitting',
    instruction: 'Select d-electron configurations (d1 to d10) and switch between Octahedral (Δo) and Tetrahedral (Δt) geometries. Observe how orbital degeneracy breaks and how Δt = (4/9)Δo.',
    interactionType: 'geometry-splitting-explorer',
    nodeId: 'c12_chem_061' as NodeId,
  },
  {
    title: 'Lab 2: Spectrochemical Series & Spin State Selector',
    instruction: 'Adjust ligand field strength along the spectrochemical series (I- to CO) and observe the competition between Δo and Pairing Energy (P) determining high-spin vs low-spin states.',
    interactionType: 'spectrochemical-series-tuner',
    nodeId: 'c12_chem_063' as NodeId,
  },
  {
    title: 'Lab 3: UV-Vis Color & Complementary Light Wheel',
    instruction: 'Simulate photon absorption during t2g -> eg transitions. Shift Δo to observe absorbed wavelength (λ) and the corresponding observed complementary color.',
    interactionType: 'color-wheel-spectroscopy',
    nodeId: 'c12_chem_065' as NodeId,
  },
  {
    title: 'Lab 4: Gouy Magnetic Balance & Spin-Only Calculations',
    instruction: 'Place synthesized complex samples into the Gouy Magnetic Balance. Measure force displacement to calculate unpaired electrons (n) and magnetic moment μ = √(n(n+2)) BM.',
    interactionType: 'gouy-balance-simulator',
    nodeId: 'c12_chem_067' as NodeId,
  },
  {
    title: 'Lab 5: Jahn-Teller Distortion Simulator',
    instruction: 'Examine asymmetrical orbital filling in d9 ([Cu(H2O)6]2+) and high-spin d4 complexes. Observe axial ligand elongation and z-out orbital splitting changes.',
    interactionType: 'jahn-teller-lab',
    nodeId: 'c12_chem_069' as NodeId,
  },
];

// ==========================================
// MANDATORY SECTION 5: PREDICTION_QUESTIONS
// ==========================================
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: How will the magnetic moment of [Fe(H2O)6]2+ compare to that of [Fe(CN)6]4-?',
    options: [
      '[Fe(H2O)6]2+ is paramagnetic (4.90 BM), while [Fe(CN)6]4- is diamagnetic (0 BM).',
      'Both complexes will have identical magnetic moments of 4.90 BM.',
      '[Fe(CN)6]4- will be strongly paramagnetic, while [Fe(H2O)6]2+ will be diamagnetic.',
      'Both complexes will be diamagnetic because Fe is in the +2 oxidation state.',
    ],
    correctIndex: 0,
    verifyInstruction: 'In Lab 2 & 4, test Fe2+ (d6) with weak field H2O (high-spin, t2g^4 eg^2, n=4) vs strong field CN- (low-spin, t2g^6 eg^0, n=0).',
    nodeId: 'c12_chem_064' as NodeId,
  },
  {
    question: 'Predict: If a complex absorbs yellow light around 580 nm wavelength, what color will it appear to the human eye?',
    options: [
      'Yellow',
      'Violet / Deep Purple',
      'Bright Green',
      'Infrared (Invisible)',
    ],
    correctIndex: 1,
    verifyInstruction: 'In Lab 3, move the absorption slider to 580 nm (yellow) and inspect the color wheel directly opposite for complementary transmission.',
    nodeId: 'c12_chem_065' as NodeId,
  },
];

// ==========================================
// MANDATORY SECTION 6: OBSERVATION_QUESTIONS
// ==========================================
const OBSERVATION_QUESTIONS = [
  {
    question: 'What happens to the crystal field splitting energy Δo when the oxidation state of the central metal ion increases from +2 to +3?',
    observableOptions: [
      'Δo increases significantly because the smaller, higher charged cation pulls ligands closer.',
      'Δo decreases because higher positive charge repels negative ligands.',
      'Δo remains completely constant because Δ depends only on the ligand.',
      'Δo drops to zero, converting the complex into a tetrahedral structure.',
    ],
    correctIndex: 0,
    nodeId: 'c12_chem_066' as NodeId,
  },
  {
    question: 'Why are tetrahedral complexes almost exclusively high-spin, regardless of ligand type?',
    observableOptions: [
      'Tetrahedral splitting energy Δt is roughly (4/9)Δo, which is almost always smaller than the electron pairing energy P.',
      'Tetrahedral complexes do not contain d-orbitals.',
      'Ligands in tetrahedral geometry are always strong field ligands.',
      'Electron pairing is strictly forbidden by the Pauli Exclusion Principle in tetrahedral geometry.',
    ],
    correctIndex: 0,
    nodeId: 'c12_chem_062' as NodeId,
  },
];

// ==========================================
// MANDATORY SECTION 7: REAL_WORLD_ACTIVITY
// ==========================================
const REAL_WORLD_ACTIVITY = {
  title: 'Industrial Ruby Laser & MRI Agent Formulation Case Study',
  description: 'In modern medicine and industrial optical physics, understanding d-d transitions and magnetic moments is vital. Synthesize synthetic Ruby gemstones (Cr3+ in Al2O3) and Gd3+ paramagnetic contrast agents for MRI.',
  steps: [
    'Step 1: Calculate d-electron count for Cr3+ (Group 6, [Ar]3d3). In octahedral site of Al2O3 lattice, 3 electrons occupy t2g set (t2g^3 eg^0).',
    'Step 2: Calculate spin-only magnetic moment for Cr3+: n = 3 unpaired electrons => μ = √(3(3+2)) = √15 ≈ 3.87 BM.',
    'Step 3: Measure UV-Vis absorption spectrum. Cr3+ in Al2O3 absorbs strongly at 410 nm (violet) and 550 nm (green-yellow). The complementary unabsorbed light transmitted and reflected is vivid crimson RED.',
    'Step 4: Formulate MRI contrast agent [Gd(DTPA)]2-. Gd3+ has [Xe]4f7 configuration with n = 7 unpaired electrons, giving μ = √(7×9) = 7.94 BM for maximum proton relaxation enhancement!',
  ],
};

// ==========================================
// DIAGNOSTIC QUESTIONS (8 ITEMS)
// ==========================================
interface DiagnosticQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  nodeId: NodeId;
}

const DIAGNOSTIC_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: 'diag_1',
    question: 'In an octahedral field, which d-orbitals experience higher electrostatic repulsion and are raised in energy to form the eg set?',
    options: ['dxy, dyz, dxz', 'dx2-y2, dz2', 'dz2, dxy', 'dx2-y2, dyz'],
    correctIndex: 1,
    explanation: 'The dx2-y2 and dz2 orbitals have lobes pointing directly along the x, y, z axes where octahedral ligands approach, experiencing maximum repulsion.',
    nodeId: 'c12_chem_061',
  },
  {
    id: 'diag_2',
    question: 'What is the relationship between tetrahedral splitting Δt and octahedral splitting Δo for the same metal ion and ligands?',
    options: ['Δt = (2/3)Δo', 'Δt = (4/9)Δo', 'Δt = (9/4)Δo', 'Δt = 2Δo'],
    correctIndex: 1,
    explanation: 'Δt = (4/9)Δo because there are only 4 ligands instead of 6 (4/6 factor) and no ligand points directly at any d-orbital (2/3 directional factor), so (4/6)*(2/3) = 4/9.',
    nodeId: 'c12_chem_062',
  },
  {
    id: 'diag_3',
    question: 'Which ligand in the following list produces the strongest crystal field splitting (largest Δo)?',
    options: ['Cl-', 'H2O', 'NH3', 'CN-'],
    correctIndex: 3,
    explanation: 'According to the spectrochemical series, CN- is a strong pi-acceptor ligand producing the highest crystal field splitting energy.',
    nodeId: 'c12_chem_063',
  },
  {
    id: 'diag_4',
    question: 'Under what condition will a d4 octahedral complex form a low-spin electronic configuration (t2g^4 eg^0)?',
    options: ['Δo < P', 'Δo > P', 'Δo = P', 'P = 0'],
    correctIndex: 1,
    explanation: 'When Δo > P (crystal field splitting exceeds pairing energy), it is energetically favorable for electrons to pair up in t2g rather than jump to eg.',
    nodeId: 'c12_chem_064',
  },
  {
    id: 'diag_5',
    question: 'Why is [Ti(H2O)6]3+ purple in aqueous solution?',
    options: [
      'It absorbs purple light and reflects all other wavelengths.',
      'It absorbs yellow-green light (~500 nm) due to t2g^1 -> eg^1 transition, transmitting complementary purple/violet light.',
      'It undergoes charge transfer from H2O to Ti4+.',
      'Ti3+ emits purple photons spontaneously.',
    ],
    correctIndex: 1,
    explanation: '[Ti(H2O)6]3+ is a d1 system absorbing around 498 nm (yellow-green) for d-d promotion, leaving complementary purple transmitted.',
    nodeId: 'c12_chem_065',
  },
  {
    id: 'diag_6',
    question: 'How does increasing the oxidation state of a transition metal ion affect the absorbed wavelength of its octahedral complex with the same ligand?',
    options: [
      'Increases Δo, shifting absorption to shorter wavelengths.',
      'Decreases Δo, shifting absorption to longer wavelengths.',
      'Has no effect on absorbed wavelength.',
      'Converts the complex into a diamagnetic zinc salt.',
    ],
    correctIndex: 0,
    explanation: 'Higher oxidation state increases positive charge density, pulling ligands closer, increasing Δo, thus absorbing higher energy (shorter wavelength λ = hc/Δo).',
    nodeId: 'c12_chem_066',
  },
  {
    id: 'diag_7',
    question: 'What is the spin-only magnetic moment of a high-spin d5 complex like [Mn(H2O)6]2+?',
    options: ['1.73 BM', '3.87 BM', '4.90 BM', '5.92 BM'],
    correctIndex: 3,
    explanation: 'High-spin d5 has t2g^3 eg^2, giving n = 5 unpaired electrons. μ = √(5(5+2)) = √35 ≈ 5.92 BM.',
    nodeId: 'c12_chem_067',
  },
  {
    id: 'diag_8',
    question: 'Which ion is expected to exhibit strong Jahn-Teller distortion in an octahedral complex?',
    options: ['d3 (Cr3+)', 'd5 high-spin (Mn2+)', 'd9 (Cu2+)', 'd10 (Zn2+)'],
    correctIndex: 2,
    explanation: 'Cu2+ is d9 with electronic configuration t2g^6 eg^3. Asymmetric filling of the eg set causes strong Jahn-Teller elongation along the z-axis.',
    nodeId: 'c12_chem_069',
  },
];

// ==========================================
// 22 CHALLENGES (TIERED: FOUNDATION, STANDARD, ADVANCED)
// ==========================================
interface Challenge {
  id: string;
  nodeId: NodeId;
  type: 'mcq' | 'numeric' | 'drag-sort';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: string;
  question: string;
  options?: string[];
  correctIndex?: number;
  correctAnswer?: number;
  tolerance?: number;
  sortItems?: { id: string; label: string; correctRank: number }[];
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
}

const CHALLENGES: Challenge[] = [
  // FOUNDATION (7)
  {
    id: 'ch_f1',
    nodeId: 'c12_chem_061',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'In an octahedral crystal field, what is the energy level of the t2g orbitals relative to the barycenter (unsplit mean energy)?',
    options: ['+0.6 Δo', '-0.4 Δo', '+0.4 Δo', '-0.6 Δo'],
    correctIndex: 1,
    explanation: 'The t2g set consists of 3 orbitals lowered by -0.4 Δo (-2/5 Δo), while the eg set of 2 orbitals is raised by +0.6 Δo (+3/5 Δo) to maintain energy balance.',
    hints: [
      'Recall that total energy shift must sum to zero: 3 × (t2g shift) + 2 × (eg shift) = 0.',
      't2g orbitals point between axes, experiencing less repulsion.',
      'The lowered energy for each of the 3 t2g orbitals is -0.4 Δo.',
    ],
  },
  {
    id: 'ch_f2',
    nodeId: 'c12_chem_062',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'In a tetrahedral crystal field, which set of d-orbitals is lower in energy?',
    options: ['eg set', 't2g set', 'e set', 't2 set'],
    correctIndex: 2,
    explanation: 'In tetrahedral geometry, the lower set is doubly degenerate and denoted as "e" (not eg, since tetrahedral symmetry lacks an inversion center g).',
    hints: [
      'Tetrahedral geometry does not have a center of inversion (gerade).',
      'The 2 lower energy orbitals form the e set.',
      'Select option "e set".',
    ],
  },
  {
    id: 'ch_f3',
    nodeId: 'c12_chem_063',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Classification',
    question: 'Which of the following ligands is considered a strong field ligand capable of causing spin pairing in d4-d7 octahedral complexes?',
    options: ['I-', 'Cl-', 'F-', 'CN-'],
    correctIndex: 3,
    explanation: 'CN- (cyanide) is at the extreme right of the spectrochemical series as a strong pi-acceptor ligand, producing large Δo.',
    hints: [
      'Halides like I-, Cl-, F- are weak field ligands.',
      'Strong field ligands often contain carbon or nitrogen donor atoms with pi-accepting capability.',
      'CN- is a strong field ligand.',
    ],
  },
  {
    id: 'ch_f4',
    nodeId: 'c12_chem_064',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'A complex is classified as "high-spin" when:',
    options: [
      'Crystal field splitting energy Δo is greater than pairing energy P (Δo > P).',
      'Crystal field splitting energy Δo is less than pairing energy P (Δo < P).',
      'No d-electrons are present.',
      'The oxidation state of metal is +4 or higher.',
    ],
    correctIndex: 1,
    explanation: 'When Δo < P, electrons prefer to occupy higher energy eg orbitals unpaired rather than pay the energy penalty P to pair up in t2g.',
    hints: [
      'High-spin means maximum unpaired electrons.',
      'It occurs when jumping the energy gap Δo is easier than paying pairing energy P.',
      'Hence Δo < P.',
    ],
  },
  {
    id: 'ch_f5',
    nodeId: 'c12_chem_065',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'Why are aqueous solutions of [Zn(H2O)6]2+ colorless?',
    options: [
      'Zn2+ is a d10 ion with completely filled d-orbitals, leaving no vacant eg orbital for d-d transitions.',
      'Water molecules absorb all visible light.',
      'Zn2+ is paramagnetic and destroys light photons.',
      'Zn2+ complexes are always tetrahedral in water.',
    ],
    correctIndex: 0,
    explanation: 'Zn2+ has [Ar]3d10 configuration. Since all d-orbitals are fully occupied, no d-d electron excitation can take place.',
    hints: [
      'Check the electronic configuration of Zn2+ (Group 12, Z=30).',
      '3d10 has 10 electrons in d-orbitals.',
      'No vacant d-orbital means no d-d transition.',
    ],
    misconceptionIndex: 5,
  },
  {
    id: 'ch_f6',
    nodeId: 'c12_chem_067',
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'Calculation',
    question: 'Calculate the spin-only magnetic moment (in BM) for a complex containing exactly n = 3 unpaired electrons. (Round to 2 decimal places)',
    correctAnswer: 3.87,
    tolerance: 0.05,
    explanation: 'μ = √(n(n+2)) = √(3 × 5) = √15 ≈ 3.87 BM.',
    hints: [
      'Formula is μ = √(n(n+2)).',
      'Substitute n = 3 into the formula: √(3 × 5).',
      '√15 = 3.8729...',
    ],
  },
  {
    id: 'ch_f7',
    nodeId: 'c12_chem_068',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'If a coordination compound has a magnetic moment of 0 BM, it is classified as:',
    options: ['Paramagnetic', 'Ferromagnetic', 'Diamagnetic', 'Antiferromagnetic'],
    correctIndex: 2,
    explanation: 'A magnetic moment of 0 BM means there are n = 0 unpaired electrons; all electrons are paired, making the complex diamagnetic.',
    hints: [
      'Zero magnetic moment means no net unpaired electron spin.',
      'All electrons are paired.',
      'This property is diamagnetism.',
    ],
  },

  // STANDARD (8)
  {
    id: 'ch_s1',
    nodeId: 'c12_chem_061',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'Calculate the Crystal Field Stabilization Energy (CFSE) in terms of Δo for a high-spin d5 octahedral complex (ignore pairing energy).',
    correctAnswer: 0.0,
    tolerance: 0.01,
    explanation: 'High-spin d5 has electron configuration t2g^3 eg^2. CFSE = (3 × -0.4 Δo) + (2 × +0.6 Δo) = -1.2 + 1.2 = 0.0 Δo.',
    hints: [
      'High spin d5 means 3 electrons in t2g and 2 in eg.',
      'Multiply t2g count by -0.4 and eg count by +0.6.',
      '3(-0.4) + 2(+0.6) = -1.2 + 1.2 = 0.',
    ],
  },
  {
    id: 'ch_s2',
    nodeId: 'c12_chem_062',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'If the octahedral crystal field splitting Δo for a metal complex is 18,000 cm-1, estimate the tetrahedral crystal field splitting Δt for the same metal and ligands (in cm-1).',
    correctAnswer: 8000,
    tolerance: 100,
    explanation: 'Δt = (4/9) × Δo = (4/9) × 18,000 = 8,000 cm-1.',
    hints: [
      'Use the relationship Δt = (4/9) Δo.',
      'Multiply 18,000 by 4.',
      'Divide 72,000 by 9 to get 8,000.',
    ],
  },
  {
    id: 'ch_s3',
    nodeId: 'c12_chem_063',
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'Arrange the following ligands in order of INCREASING crystal field splitting energy Δo (from weakest to strongest):',
    sortItems: [
      { id: 'i1', label: 'I- (Iodide)', correctRank: 1 },
      { id: 'i2', label: 'H2O (Water)', correctRank: 2 },
      { id: 'i3', label: 'NH3 (Ammonia)', correctRank: 3 },
      { id: 'i4', label: 'CN- (Cyanide)', correctRank: 4 },
    ],
    explanation: 'Spectrochemical series order: I- < H2O < NH3 < CN-. Iodide is weak halide, water is neutral weak/intermediate, ammonia is amine donor, cyanide is strong pi-acceptor.',
    hints: [
      'Halides like I- are weakest field ligands.',
      'Water is weaker than neutral amine ligands like NH3.',
      'Cyanide CN- is one of the strongest ligands.',
    ],
  },
  {
    id: 'ch_s4',
    nodeId: 'c12_chem_064',
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'Determine the ground state d-electron configuration for [Fe(CN)6]3-. (Fe is in +3 oxidation state, d5).',
    options: ['t2g^3 eg^2', 't2g^5 eg^0', 't2g^4 eg^1', 't2g^2 eg^3'],
    correctIndex: 1,
    explanation: 'Fe3+ is d5. CN- is a strong field ligand (Δo > P), so low-spin configuration occurs: all 5 electrons pair as much as possible in t2g, yielding t2g^5 eg^0.',
    hints: [
      'Fe3+ has 5 d-electrons.',
      'CN- is a strong field ligand causing low spin.',
      'Fill t2g completely before eg; 5 electrons fill t2g as 2+2+1 = t2g^5.',
    ],
  },
  {
    id: 'ch_s5',
    nodeId: 'c12_chem_065',
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'A complex solution absorbs light at 490 nm (blue-green). What observed color will the solution display?',
    options: ['Blue-green', 'Red / Red-Orange', 'Violet', 'Yellow-Green'],
    correctIndex: 1,
    explanation: 'On the color wheel, blue-green (490 nm) is directly opposite to red/red-orange (~620-650 nm). Transmitted light appears red.',
    hints: [
      'The observed color is the complementary color.',
      'Find the color opposite to blue-green on a color wheel.',
      'Complementary to blue-green is red/red-orange.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_s6',
    nodeId: 'c12_chem_066',
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'Comparing [Co(H2O)6]2+ and [Co(H2O)6]3+, which complex absorbs light at a SHORTER wavelength?',
    options: [
      '[Co(H2O)6]3+ because higher oxidation state (+3) increases Δo.',
      '[Co(H2O)6]2+ because lower charge pulls ligands weaker.',
      'Both absorb at identical wavelengths.',
      'Neither absorbs light because Co is a non-transition metal.',
    ],
    correctIndex: 0,
    explanation: 'Higher oxidation state (+3 vs +2) increases metal-ligand electrostatic attraction, reducing bond length and increasing Δo. Higher Δo means higher energy absorption, thus shorter wavelength (λ = hc/Δo).',
    hints: [
      'Higher metal oxidation state increases crystal field splitting Δo.',
      'Energy E = hc / λ.',
      'Larger Δo means shorter wavelength λ.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_s7',
    nodeId: 'c12_chem_068',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Calculation',
    question: 'Calculate the spin-only magnetic moment (in BM) for [Fe(H2O)6]2+. (Fe2+ is d6 high-spin). Round to 2 decimal places.',
    correctAnswer: 4.90,
    tolerance: 0.05,
    explanation: 'Fe2+ is d6. In high-spin (H2O weak field), configuration is t2g^4 eg^2. Number of unpaired electrons n = 4. μ = √(4(4+2)) = √24 ≈ 4.90 BM.',
    hints: [
      'Fe2+ is 3d6.',
      'High-spin d6 configuration has 4 unpaired electrons (1 paired in t2g, 3 unpaired in t2g, 2 unpaired in eg).',
      'μ = √(4 × 6) = √24 = 4.898... BM.',
    ],
  },
  {
    id: 'ch_s8',
    nodeId: 'c12_chem_070',
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'In qualitative analysis, adding excess NH3 to aqueous Cu2+ forms a deep blue solution of [Cu(NH3)4]2+. Why is the color intensity much higher than pale blue [Cu(H2O)6]2+?',
    options: [
      'NH3 is a stronger field ligand than H2O, increasing Δ and shifting absorption into the visible spectrum with higher extinction coefficient.',
      'NH3 oxidizes Cu2+ to Cu3+.',
      'NH3 forms metallic copper nanoparticles.',
      'Water destroys the d-orbitals completely.',
    ],
    correctIndex: 0,
    explanation: 'NH3 replaces H2O as a stronger ligand, increasing Δo, shifting the d-d absorption band into red-yellow wavelengths and increasing molar absorptivity.',
    hints: [
      'NH3 is higher in the spectrochemical series than H2O.',
      'Stronger field shifts absorption wavelength and enhances transition probability.',
      'Select option A.',
    ],
  },

  // ADVANCED (7)
  {
    id: 'ch_a1',
    nodeId: 'c12_chem_061',
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'Calculate the total CFSE (in terms of Δo) for a low-spin d6 octahedral complex like [Co(NH3)6]3+. (Do not include P penalty).',
    correctAnswer: -2.4,
    tolerance: 0.05,
    explanation: 'Low-spin d6 has configuration t2g^6 eg^0. CFSE = 6 × (-0.4 Δo) + 0 × (+0.6 Δo) = -2.4 Δo.',
    hints: [
      'Low-spin d6 puts all 6 electrons into t2g orbitals.',
      'Each t2g electron contributes -0.4 Δo.',
      '6 × (-0.4) = -2.4 Δo.',
    ],
  },
  {
    id: 'ch_a2',
    nodeId: 'c12_chem_065',
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Synthesis',
    question: 'A d1 complex [Ti(H2O)6]3+ shows a single absorption peak at λ = 498 nm. Calculate its crystal field splitting energy Δo in kJ/mol. (Use h = 6.626×10^-34 J s, c = 3.0×10^8 m/s, NA = 6.022×10^23 /mol). Round to nearest whole number.',
    correctAnswer: 240,
    tolerance: 5,
    explanation: 'E = (h c NA) / λ = (6.626×10^-34 × 3×10^8 × 6.022×10^23) / (498×10^-9 m) = 119,726 J/mol / 498 ≈ 240,400 J/mol = 240 kJ/mol.',
    hints: [
      'Formula: E (J/mol) = (h × c × NA) / λ.',
      'h × c × NA = 0.11963 J m / mol.',
      'Divide 119,630 by 498 nm to get ~240 kJ/mol.',
    ],
  },
  {
    id: 'ch_a3',
    nodeId: 'c12_chem_068',
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'An unknown octahedral complex of Mn3+ (d4) is measured on a Gouy balance and found to have a spin-only magnetic moment of 2.83 BM. How many unpaired electrons are present, and is it high-spin or low-spin?',
    correctAnswer: 2,
    tolerance: 0.1,
    explanation: 'μ = 2.83 BM corresponds to n = 2 unpaired electrons (√(2×4) = √8 = 2.83). For d4, 2 unpaired electrons means configuration t2g^4 eg^0, which is LOW-SPIN.',
    hints: [
      'Find n from √(n(n+2)) = 2.83. n = 2.',
      'High-spin d4 has n = 4 (t2g^3 eg^1, μ = 4.90 BM).',
      'Low-spin d4 has n = 2 (t2g^4 eg^0, μ = 2.83 BM).',
    ],
  },
  {
    id: 'ch_a4',
    nodeId: 'c12_chem_069',
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Analysis',
    question: 'Why does [Cu(H2O)6]2+ exhibit dynamic Jahn-Teller distortion with two elongated axial Cu-O bonds (1.97 Å equatorial vs 2.30 Å axial)?',
    options: [
      'Cu2+ is d9 with unsymmetrically occupied eg set (t2g^6 eg^3), causing orbital degeneracy lifting via axial elongation.',
      'Water ligands decompose at room temperature.',
      'Copper undergoes reduction to Cu+ along the z-axis.',
      'Tetrahedral geometry is forced upon all copper salts in water.',
    ],
    correctIndex: 0,
    explanation: 'Cu2+ is 3d9 (t2g^6 eg^3). The eg set has two electrons in one orbital and one in the other (e.g. dz2^1 dx2-y2^2). This asymmetric eg electron density drives z-axis bond elongation to remove degeneracy.',
    hints: [
      'Inspect electron distribution in eg orbitals for d9.',
      'eg set has 3 electrons: dz2^1 dx2-y2^2 or dz2^2 dx2-y2^1.',
      'Asymmetric filling of eg orbitals produces strong Jahn-Teller distortion.',
    ],
  },
  {
    id: 'ch_a5',
    nodeId: 'c12_chem_069',
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'Which of the following transition metal electronic configurations will NOT show Jahn-Teller distortion in an octahedral complex?',
    options: [
      'd9 (Cu2+)',
      'd4 high-spin (Cr2+)',
      'd3 (Cr3+)',
      'd7 low-spin (Ni3+)',
    ],
    correctIndex: 2,
    explanation: 'Cr3+ (d3) has symmetrical half-filled t2g orbitals (t2g^3 eg^0) and empty eg orbitals. Symmetrical orbital filling does not produce Jahn-Teller distortion.',
    hints: [
      'Jahn-Teller distortion requires non-linearly degenerate electronic ground states.',
      'Symmetrically filled orbitals (d3: t2g^3 eg^0, d5 high-spin: t2g^3 eg^2, d8: t2g^6 eg^2, d10) show NO distortion.',
      'd3 is completely symmetrical.',
    ],
  },
  {
    id: 'ch_a6',
    nodeId: 'c12_chem_070',
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Synthesis',
    question: 'Prussian Blue, Fe4[Fe(CN)6]3, displays an intense dark blue color. What is the primary quantum mechanical origin of this intense absorption?',
    options: [
      'd-d transition within Fe2+ ion only',
      'Intervalence Charge Transfer (IVCT) between Fe2+ and Fe3+ centers',
      'Fluorescence of Cyanide ions',
      'Rayleigh scattering of blue sunlight',
    ],
    correctIndex: 1,
    explanation: 'Prussian Blue contains both Fe(II) and Fe(III) linked by CN- bridges. Absorption of red light (~680 nm) promotes electron transfer Fe(II) -> Fe(III), known as Intervalence Charge Transfer (IVCT).',
    hints: [
      'Prussian Blue contains two different oxidation states of iron: Fe2+ and Fe3+.',
      'Light causes an electron to hop from Fe2+ to Fe3+ through cyanide bridges.',
      'This process is Intervalence Charge Transfer (IVCT).',
    ],
  },
  {
    id: 'ch_a7',
    nodeId: 'c12_chem_067',
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'A complex [CoF6]3- is high-spin d6 (Co3+). Calculate its spin-only magnetic moment in Bohr Magnetons (BM). Round to 2 decimal places.',
    correctAnswer: 4.90,
    tolerance: 0.05,
    explanation: 'Co3+ is d6. F- is a weak field ligand, so high-spin configuration applies: t2g^4 eg^2. Unpaired electrons n = 4. μ = √(4 × 6) = √24 ≈ 4.90 BM.',
    hints: [
      'Co3+ is d6.',
      'F- is weak field -> High spin.',
      'Configuration t2g^4 eg^2 -> 4 unpaired electrons -> μ = √24 = 4.90 BM.',
    ],
  },
];

// ==========================================
// SVG DIAGRAM COMPONENTS (CUSTOM & TOPIC SPECIFIC)
// ==========================================

// 1. Octahedral vs Tetrahedral Splitting SVG Diagram
const OrbitalSplittingSVG: React.FC<{
  geometry: 'octahedral' | 'tetrahedral';
  dCount: number;
  isHighSpin: boolean;
  deltaEnergy: number;
}> = ({ geometry, dCount, isHighSpin, deltaEnergy }) => {
  // Determine electron filling
  let lowerCount = 0;
  let upperCount = 0;

  if (geometry === 'octahedral') {
    if (isHighSpin) {
      if (dCount <= 3) {
        lowerCount = dCount;
        upperCount = 0;
      } else if (dCount <= 5) {
        lowerCount = 3;
        upperCount = dCount - 3;
      } else if (dCount <= 8) {
        lowerCount = dCount - 2;
        upperCount = 2;
      } else {
        lowerCount = 6;
        upperCount = dCount - 6;
      }
    } else {
      // Low spin
      if (dCount <= 6) {
        lowerCount = dCount;
        upperCount = 0;
      } else {
        lowerCount = 6;
        upperCount = dCount - 6;
      }
    }
  } else {
    // Tetrahedral (almost always high spin)
    if (dCount <= 2) {
      lowerCount = dCount;
      upperCount = 0;
    } else if (dCount <= 5) {
      lowerCount = 2;
      upperCount = dCount - 2;
    } else if (dCount <= 7) {
      lowerCount = dCount - 3;
      upperCount = 3;
    } else {
      lowerCount = 4;
      upperCount = dCount - 4;
    }
  }

  // Draw electron arrows
  const renderElectrons = (boxCount: number, totalElectrons: number, xStart: number, yPos: number) => {
    const spacing = 45;
    const items = [];
    let remaining = totalElectrons;

    for (let i = 0; i < boxCount; i++) {
      const x = xStart + i * spacing;
      // Box
      items.push(
        <g key={`box_${i}`}>
          <rect x={x - 16} y={yPos - 18} width={32} height={36} rx={4} fill="#1e293b" stroke="#38bdf8" strokeWidth={1.5} />
        </g>
      );

      // Spin up
      if (remaining > 0) {
        items.push(
          <path
            key={`spin_up_${i}`}
            d={`M ${x - 5} ${yPos + 10} L ${x - 5} ${yPos - 10} M ${x - 5} ${yPos - 10} L ${x - 9} ${yPos - 4} M ${x - 5} ${yPos - 10} L ${x - 1} ${yPos - 4}`}
            stroke="#f43f5e"
            strokeWidth={2.5}
            strokeLinecap="round"
          />
        );
        remaining--;
      }

      // Spin down
      if (remaining >= boxCount - i) {
        items.push(
          <path
            key={`spin_down_${i}`}
            d={`M ${x + 5} ${yPos - 10} L ${x + 5} ${yPos + 10} M ${x + 5} ${yPos + 10} L ${x + 1} ${yPos + 4} M ${x + 5} ${yPos + 10} L ${x + 9} ${yPos + 4}`}
            stroke="#60a5fa"
            strokeWidth={2.5}
            strokeLinecap="round"
          />
        );
        remaining--;
      }
    }
    return items;
  };

  const isOct = geometry === 'octahedral';
  const lowerBoxes = isOct ? 3 : 2;
  const upperBoxes = isOct ? 2 : 3;

  const upperY = 80 - Math.min(deltaEnergy * 0.15, 30);
  const lowerY = 180 + Math.min(deltaEnergy * 0.15, 30);
  const midY = (upperY + lowerY) / 2;

  const upperX = isOct ? 220 : 200;
  const lowerX = isOct ? 195 : 220;

  return (
    <svg className="w-full h-64 bg-slate-900 rounded-xl p-2 shadow-inner border border-slate-800" viewBox="0 0 420 250">
      {/* Background grid lines */}
      <line x1="40" y1="20" x2="40" y2="230" stroke="#475569" strokeWidth="2" strokeDasharray="4 4" />
      <polygon points="40,15 35,25 45,25" fill="#94a3b8" />
      <text x="15" y="130" fill="#94a3b8" fontSize="12" fontWeight="bold" transform="rotate(-90 20 130)">
        ENERGY (E)
      </text>

      {/* Free Ion Degenerate Level */}
      <g>
        <line x1="55" y1="130" x2="135" y2="130" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="3 3" />
        <text x="60" y="150" fill="#f59e0b" fontSize="11" fontWeight="600">
          Free Ion (3d)
        </text>
        <text x="65" y="120" fill="#f87171" fontSize="10">
          5 Degenerate
        </text>
      </g>

      {/* Barycenter line */}
      <line x1="135" y1="130" x2="380" y2="130" stroke="#64748b" strokeWidth="1" strokeDasharray="2 2" />
      <text x="325" y="125" fill="#64748b" fontSize="10">
        Barycenter
      </text>

      {/* Splitting arrows */}
      <line x1="135" y1="130" x2="180" y2={upperY} stroke="#475569" strokeWidth="1" />
      <line x1="135" y1="130" x2="180" y2={lowerY} stroke="#475569" strokeWidth="1" />

      {/* Upper Set */}
      {renderElectrons(upperBoxes, upperCount, upperX, upperY)}
      <text x={upperX + upperBoxes * 45 + 10} y={upperY + 5} fill="#38bdf8" fontSize="13" fontWeight="bold">
        {isOct ? 'e_g (+0.6 Δ_o)' : 't_2 (+0.4 Δ_t)'}
      </text>

      {/* Lower Set */}
      {renderElectrons(lowerBoxes, lowerCount, lowerX, lowerY)}
      <text x={lowerX + lowerBoxes * 45 + 10} y={lowerY + 5} fill="#38bdf8" fontSize="13" fontWeight="bold">
        {isOct ? 't_2g (-0.4 Δ_o)' : 'e (-0.6 Δ_t)'}
      </text>

      {/* Delta Energy Dimension Arrow */}
      <g>
        <line x1="370" y1={upperY} x2="370" y2={lowerY} stroke="#f43f5e" strokeWidth="2" />
        <polygon points={`370,${upperY - 4} 365,${upperY + 4} 375,${upperY + 4}`} fill="#f43f5e" />
        <polygon points={`370,${lowerY + 4} 365,${lowerY - 4} 375,${lowerY - 4}`} fill="#f43f5e" />
        <text x="378" y={midY + 4} fill="#f43f5e" fontSize="13" fontWeight="bold">
          {isOct ? 'Δ_o' : 'Δ_t'}
        </text>
      </g>
    </svg>
  );
};

// 2. Spectrochemical Series SVG Diagram
const SpectrochemicalSeriesSVG: React.FC<{ selectedIndex: number; onSelect: (idx: number) => void }> = ({
  selectedIndex,
  onSelect,
}) => {
  const ligands = [
    { name: 'I⁻', type: 'Weak Field', strength: 1, color: '#ef4444' },
    { name: 'Br⁻', type: 'Weak Field', strength: 2, color: '#f97316' },
    { name: 'Cl⁻', type: 'Weak Field', strength: 3, color: '#f59e0b' },
    { name: 'F⁻', type: 'Weak Field', strength: 4, color: '#eab308' },
    { name: 'OH⁻', type: 'Weak Field', strength: 5, color: '#84cc16' },
    { name: 'H₂O', type: 'Intermediate', strength: 6, color: '#10b981' },
    { name: 'NH₃', type: 'Strong Field', strength: 7, color: '#06b6d4' },
    { name: 'en', type: 'Strong Field', strength: 8, color: '#3b82f6' },
    { name: 'CN⁻', type: 'Strong Field', strength: 9, color: '#6366f1' },
    { name: 'CO', type: 'Strong Field', strength: 10, color: '#8b5cf6' },
  ];

  return (
    <div className="w-full bg-slate-900 p-4 rounded-xl border border-slate-800">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-bold text-red-400">WEAK FIELD (High Spin, Small Δ)</span>
        <span className="text-xs font-bold text-gold-400">STRONG FIELD (Low Spin, Large Δ)</span>
      </div>
      <div className="relative h-12 flex items-center justify-between px-2 bg-slate-950 rounded-lg border border-slate-800">
        {/* Gradient line */}
        <div className="absolute inset-x-4 h-2 bg-gradient-to-r from-red-500 via-emerald-500 to-purple-600 rounded-full" />

        {ligands.map((lig, idx) => {
          const isSelected = selectedIndex === idx;
          return (
            <button
              key={lig.name}
              onClick={() => {
                audioManager.play('tap');
                onSelect(idx);
              }}
              className={`relative z-10 flex flex-col items-center justify-center w-8 h-8 rounded-full transition-all duration-200 ${
                isSelected ? 'scale-125 ring-4 ring-gold-400 font-extrabold shadow-lg shadow-gold-500/50' : 'hover:scale-110 opacity-80'
              }`}
              style={{ backgroundColor: lig.color }}
            >
              <span className="text-xs font-bold text-slate-950">{lig.name}</span>
            </button>
          );
        })}
      </div>
      <div className="mt-3 text-center text-xs text-slate-300 bg-slate-800/80 p-2 rounded-lg border border-slate-700">
        Selected Ligand:{' '}
        <span className="font-bold text-gold-300">{ligands[selectedIndex].name}</span> — Field Strength:{' '}
        <span className="font-semibold text-emerald-300">{ligands[selectedIndex].type}</span> (Rank {selectedIndex + 1}/10)
      </div>
    </div>
  );
};

// 3. Absorption Color Wheel & Spectrum SVG
const ColorWheelAbsorptionSVG: React.FC<{
  absorbedWavelength: number;
  onWavelengthChange: (wl: number) => void;
}> = ({ absorbedWavelength, onWavelengthChange }) => {
  // Complementary color matching
  const getColorData = (wl: number) => {
    if (wl < 435) return { absorbed: 'Violet (400 nm)', complementary: 'Yellow-Green', hexAbs: '#8b5cf6', hexComp: '#84cc16' };
    if (wl < 480) return { absorbed: 'Blue (450 nm)', complementary: 'Yellow', hexAbs: '#3b82f6', hexComp: '#eab308' };
    if (wl < 490) return { absorbed: 'Green-Blue (485 nm)', complementary: 'Orange', hexAbs: '#06b6d4', hexComp: '#f97316' };
    if (wl < 500) return { absorbed: 'Blue-Green (495 nm)', complementary: 'Red', hexAbs: '#10b981', hexComp: '#ef4444' };
    if (wl < 560) return { absorbed: 'Green (530 nm)', complementary: 'Purple / Magenta', hexAbs: '#22c55e', hexComp: '#d946ef' };
    if (wl < 580) return { absorbed: 'Yellow-Green (570 nm)', complementary: 'Violet', hexAbs: '#84cc16', hexComp: '#7c3aed' };
    if (wl < 600) return { absorbed: 'Yellow (590 nm)', complementary: 'Indigo / Dark Blue', hexAbs: '#eab308', hexComp: '#4338ca' };
    if (wl < 650) return { absorbed: 'Orange (620 nm)', complementary: 'Cyan / Blue', hexAbs: '#f97316', hexComp: '#0284c7' };
    return { absorbed: 'Red (700 nm)', complementary: 'Blue-Green', hexAbs: '#dc2626', hexComp: '#0d9488' };
  };

  const currentColors = getColorData(absorbedWavelength);

  return (
    <div className="w-full bg-slate-900 p-4 rounded-xl border border-slate-800 flex flex-col items-center">
      <div className="text-center mb-3">
        <div className="text-sm font-bold text-slate-200">Visible Light Spectrum & Complementary Transmission</div>
        <div className="text-xs text-slate-400">Slide to adjust light wavelength absorbed by d-d electron transition</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full items-center">
        {/* Color Wheel Graphic */}
        <div className="relative w-48 h-48 mx-auto">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {/* Color segments */}
            <circle cx="100" cy="100" r="80" fill="none" stroke="#e2e8f0" strokeWidth="2" />

            {/* Segments */}
            <path d="M 100 100 L 100 20 A 80 80 0 0 1 156 43 Z" fill="#dc2626" />
            <path d="M 100 100 L 156 43 A 80 80 0 0 1 180 100 Z" fill="#f97316" />
            <path d="M 100 100 L 180 100 A 80 80 0 0 1 156 156 Z" fill="#eab308" />
            <path d="M 100 100 L 156 156 A 80 80 0 0 1 100 180 Z" fill="#22c55e" />
            <path d="M 100 100 L 100 180 A 80 80 0 0 1 43 156 Z" fill="#06b6d4" />
            <path d="M 100 100 L 43 156 A 80 80 0 0 1 20 100 Z" fill="#3b82f6" />
            <path d="M 100 100 L 20 100 A 80 80 0 0 1 43 43 Z" fill="#8b5cf6" />
            <path d="M 100 100 L 43 43 A 80 80 0 0 1 100 20 Z" fill="#d946ef" />

            {/* Center solution drop */}
            <circle cx="100" cy="100" r="38" fill="#0f172a" stroke="#334155" strokeWidth="3" />
            <circle cx="100" cy="100" r="30" fill={currentColors.hexComp} className="transition-all duration-300" />
            <text x="100" y="104" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">
              OBSERVED
            </text>
          </svg>
        </div>

        {/* Info & Slider Box */}
        <div className="flex flex-col space-y-3 bg-slate-950 p-3 rounded-lg border border-slate-800">
          <div>
            <label className="text-xs text-slate-400 font-medium">Absorbed Wavelength (λ): <span className="text-gold-400 font-bold">{absorbedWavelength} nm</span></label>
            <input
              type="range"
              min="400"
              max="750"
              step="5"
              value={absorbedWavelength}
              onChange={(e) => {
                onWavelengthChange(Number(e.target.value));
              }}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-gold-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-2 text-center text-xs">
            <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
              <span className="block text-slate-400">Absorbed Photon</span>
              <span className="font-bold text-sm" style={{ color: currentColors.hexAbs }}>
                {currentColors.absorbed}
              </span>
            </div>
            <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
              <span className="block text-slate-400">Transmitted Color</span>
              <span className="font-bold text-sm" style={{ color: currentColors.hexComp }}>
                {currentColors.complementary}
              </span>
            </div>
          </div>

          <div className="text-xs text-slate-400 bg-slate-900/60 p-2 rounded border border-slate-800">
            Energy Gap: <span className="text-amber-300 font-mono">Δ_o = h·c / λ = {((119630 / absorbedWavelength)).toFixed(1)} kJ/mol</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// 4. Gouy Magnetic Balance SVG Diagram
const GouyBalanceSVG: React.FC<{
  unpairedElectrons: number;
  complexName: string;
}> = ({ unpairedElectrons, complexName }) => {
  const mu = Math.sqrt(unpairedElectrons * (unpairedElectrons + 2));
  const isParamagnetic = unpairedElectrons > 0;
  // Displace pan downwards if paramagnetic
  const displacement = isParamagnetic ? Math.min(unpairedElectrons * 6, 28) : -3;

  return (
    <div className="w-full bg-slate-900 p-4 rounded-xl border border-slate-800 flex flex-col items-center">
      <div className="text-xs font-bold text-slate-300 mb-2">Gouy Magnetic Balance Simulator</div>
      <svg viewBox="0 0 400 200" className="w-full h-48 bg-slate-950 rounded-lg border border-slate-800">
        {/* Electromagnet poles */}
        <rect x="110" y="90" width="50" height="70" fill="#334155" stroke="#64748b" strokeWidth="2" rx="4" />
        <rect x="240" y="90" width="50" height="70" fill="#334155" stroke="#64748b" strokeWidth="2" rx="4" />
        <text x="135" y="130" fill="#ef4444" fontSize="16" fontWeight="extrabold" textAnchor="middle">N</text>
        <text x="265" y="130" fill="#3b82f6" fontSize="16" fontWeight="extrabold" textAnchor="middle">S</text>

        {/* Magnetic field lines */}
        <path d="M 160 110 Q 200 100 240 110" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
        <path d="M 160 125 Q 200 125 240 125" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
        <path d="M 160 140 Q 200 150 240 140" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />

        {/* Balance Beam */}
        <line x1="80" y1="30" x2="320" y2="30" stroke="#94a3b8" strokeWidth="4" />
        <polygon points="200,30 192,50 208,50" fill="#cbd5e1" />

        {/* Suspension Wire & Sample Tube */}
        <g className="transition-transform duration-500 ease-out" style={{ transform: `translateY(${displacement}px)` }}>
          <line x1="200" y1="30" x2="200" y2="90" stroke="#38bdf8" strokeWidth="1.5" />
          {/* Sample Tube */}
          <rect x="190" y="90" width="20" height="55" fill="#38bdf8" fillOpacity="0.3" stroke="#38bdf8" strokeWidth="1.5" rx="3" />
          <rect x="192" y="110" width="16" height="32" fill="#f59e0b" fillOpacity="0.8" rx="2" />
        </g>

        {/* Balance Counterweight Pan */}
        <line x1="80" y1="30" x2="80" y2="70" stroke="#94a3b8" strokeWidth="1.5" />
        <path d="M 60 70 L 100 70 L 90 85 L 70 85 Z" fill="#475569" stroke="#94a3b8" />

        {/* Digital Display Meter */}
        <rect x="290" y="130" width="100" height="55" fill="#020617" stroke="#1e293b" strokeWidth="2" rx="6" />
        <text x="340" y="150" fill="#22c55e" fontSize="12" fontWeight="mono" textAnchor="middle">
          μ = {mu.toFixed(2)} BM
        </text>
        <text x="340" y="170" fill={isParamagnetic ? '#f43f5e' : '#38bdf8'} fontSize="10" fontWeight="bold" textAnchor="middle">
          {isParamagnetic ? 'PARAMAGNETIC' : 'DIAMAGNETIC'}
        </text>
      </svg>

      <div className="mt-2 text-xs text-slate-300 text-center">
        Complex: <span className="text-gold-300 font-bold">{complexName}</span> | Unpaired Electrons (n):{' '}
        <span className="text-amber-400 font-bold">{unpairedElectrons}</span> | Formula:{' '}
        <span className="font-mono text-emerald-400 font-bold">μ = √(n(n+2)) = {mu.toFixed(2)} BM</span>
      </div>
    </div>
  );
};

// 5. Interactive Canvas Transition Renderer
const CanvasTransitionLab: React.FC<{
  dCount: number;
  geometry: 'octahedral' | 'tetrahedral';
  isHighSpin: boolean;
  onTransitionTriggered?: () => void;
}> = ({ dCount, geometry, isHighSpin, onTransitionTriggered }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [animatingPhoton, setAnimatingPhoton] = useState(false);

  const triggerPhotonAnimation = () => {
    audioManager.play('whoosh');
    setAnimatingPhoton(true);
    if (onTransitionTriggered) onTransitionTriggered();
    setTimeout(() => {
      audioManager.play('sparkle');
      setAnimatingPhoton(false);
    }, 1500);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let startTime = performance.now();

    const render = (time: number) => {
      const elapsed = (time - startTime) / 1000;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background gradient
      const bgGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      bgGrad.addColorStop(0, '#020617');
      bgGrad.addColorStop(1, '#0f172a');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw Flask Container
      ctx.save();
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(180, 50);
      ctx.lineTo(220, 50);
      ctx.lineTo(220, 90);
      ctx.lineTo(270, 180);
      ctx.arcTo(270, 195, 255, 195, 15);
      ctx.lineTo(145, 195);
      ctx.arcTo(130, 195, 130, 180, 15);
      ctx.lineTo(180, 90);
      ctx.closePath();
      ctx.stroke();

      // Liquid Solution fill inside flask
      const liquidGrad = ctx.createLinearGradient(0, 100, 0, 195);
      const hue = (dCount * 36 + (isHighSpin ? 20 : 180)) % 360;
      liquidGrad.addColorStop(0, `hsla(${hue}, 80%, 60%, 0.7)`);
      liquidGrad.addColorStop(1, `hsla(${hue}, 90%, 40%, 0.85)`);

      ctx.fillStyle = liquidGrad;
      ctx.beginPath();
      ctx.moveTo(165, 120);
      // Gentle liquid wave animation
      const waveY = Math.sin(elapsed * 3) * 3;
      ctx.quadraticCurveTo(200, 120 + waveY, 235, 120);
      ctx.lineTo(265, 180);
      ctx.arcTo(265, 193, 255, 193, 10);
      ctx.lineTo(135, 193);
      ctx.arcTo(135, 193, 135, 180, 10);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // Draw Photons if animating
      if (animatingPhoton) {
        const photonProgress = ((elapsed * 1.5) % 1.5) / 1.5;
        const pX = 40 + photonProgress * 160;
        const pY = 150 + Math.sin(photonProgress * Math.PI * 8) * 12;

        ctx.fillStyle = '#f43f5e';
        ctx.beginPath();
        ctx.arc(pX, pY, 7, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = '#fb7185';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(pX, pY, 12, 0, Math.PI * 2);
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animationFrameId);
  }, [dCount, geometry, isHighSpin, animatingPhoton]);

  return (
    <div className="relative w-full bg-slate-900 rounded-xl p-3 border border-slate-800 flex flex-col items-center">
      <canvas ref={canvasRef} width={400} height={210} className="w-full h-52 rounded-lg bg-slate-950" />
      <button
        onClick={triggerPhotonAnimation}
        disabled={animatingPhoton}
        className="mt-3 px-4 py-2 bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white text-xs font-bold rounded-lg shadow-md transition-all active:scale-95 disabled:opacity-50"
      >
        {animatingPhoton ? 'Photon Absorbing & Promoting Electron...' : 'Simulate Photon Absorption (hν = Δ)'}
      </button>
    </div>
  );
};

// ==========================================
// MAIN COMPONENT
// ==========================================
export const C12_ChemistryColourandmagneticpropertiesofcomplexesSim: React.FC<SimProps> = ({
  onComplete,
  initialNodeId = 'c12_chem_061',
  debugMode = false,
}) => {
  // Navigation tab state
  const [activeTab, setActiveTab] = useState<'discovery' | 'lab' | 'challenges' | 'diagnostics' | 'summary'>('discovery');

  // Interactive Lab state
  const [activeLabIndex, setActiveLabIndex] = useState<number>(0);
  const [selectedNodeId, setSelectedNodeId] = useState<NodeId>(initialNodeId);

  // Lab variables
  const [geometry, setGeometry] = useState<'octahedral' | 'tetrahedral'>('octahedral');
  const [dCount, setDCount] = useState<number>(5);
  const [ligandIndex, setLigandIndex] = useState<number>(5); // H2O default
  const [isHighSpin, setIsHighSpin] = useState<boolean>(true);
  const [absorbedWavelength, setAbsorbedWavelength] = useState<number>(500); // nm
  const [complexMetal, setComplexMetal] = useState<string>('Fe³⁺');

  // Unpaired electrons calculation for lab
  const calculatedUnpairedElectrons = useMemo(() => {
    if (geometry === 'octahedral') {
      if (isHighSpin) {
        if (dCount <= 3) return dCount;
        if (dCount <= 5) return dCount;
        if (dCount <= 8) return 10 - dCount - 2; // e.g. d6 -> 4, d7 -> 3, d8 -> 2
        return 10 - dCount; // d9 -> 1, d10 -> 0
      } else {
        // Low spin
        if (dCount <= 3) return dCount;
        if (dCount === 4) return 2;
        if (dCount === 5) return 1;
        if (dCount === 6) return 0;
        if (dCount === 7) return 1;
        if (dCount === 8) return 2;
        if (dCount === 9) return 1;
        return 0;
      }
    } else {
      // Tetrahedral (high spin)
      if (dCount <= 2) return dCount;
      if (dCount <= 5) return dCount;
      if (dCount <= 7) return 10 - dCount;
      if (dCount === 8) return 2;
      if (dCount === 9) return 1;
      return 0;
    }
  }, [geometry, isHighSpin, dCount]);

  // Challenges state
  const [challengeFilter, setChallengeFilter] = useState<'all' | 'foundation' | 'standard' | 'advanced'>('all');
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [numericInput, setNumericInput] = useState<string>('');
  const [draggedItems, setDraggedItems] = useState<{ id: string; label: string; correctRank: number }[]>([]);
  const [challengeAnswered, setChallengeAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [challengeScore, setChallengeScore] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHintIndex, setCurrentHintIndex] = useState<number>(0);

  // Discovery / Question Responses
  const [discoveryAnswered, setDiscoveryAnswered] = useState<boolean>(false);
  const [discoverySelected, setDiscoverySelected] = useState<number | null>(null);
  const [predictionAnswers, setPredictionAnswers] = useState<Record<number, number>>({});
  const [observationAnswers, setObservationAnswers] = useState<Record<number, number>>({});

  // BKT Tracking
  const [bktStates, setBktStates] = useState<Record<NodeId, ReturnType<typeof createBKTState>>>(() => {
    const initial: Record<string, ReturnType<typeof createBKTState>> = {};
    ALL_NODE_IDS.forEach((id) => {
      initial[id] = createBKTState(id);
    });
    return initial as Record<NodeId, ReturnType<typeof createBKTState>>;
  });

  // SRS Review Items
  const [reviewItems, setReviewItems] = useState<Record<string, ReturnType<typeof createReviewItem>>>(() => {
    const initial: Record<string, ReturnType<typeof createReviewItem>> = {};
    CHALLENGES.forEach((ch) => {
      initial[ch.id] = createReviewItem(ch.id);
    });
    return initial;
  });

  // UI Visual Effects
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);

  // Auto Hint timer ref
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Reset inactivity timer
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (!challengeAnswered && activeTab === 'challenges') {
        setShowHint(true);
        audioManager.play('hint');
      }
    }, 12000);
  }, [challengeAnswered, activeTab]);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [resetInactivityTimer, currentChallengeIndex]);

  // Voice narration helper
  const speakText = (text: string) => {
    try {
      speechManager.speak(text);
    } catch {
      // Speech fallback
    }
  };

  // Filtered challenges list
  const filteredChallenges = useMemo(() => {
    if (challengeFilter === 'all') return CHALLENGES;
    return CHALLENGES.filter((ch) => ch.difficulty === challengeFilter);
  }, [challengeFilter]);

  const activeChallenge = filteredChallenges[currentChallengeIndex] || filteredChallenges[0];

  // Initialize drag items when drag challenge loads
  useEffect(() => {
    if (activeChallenge && activeChallenge.type === 'drag-sort' && activeChallenge.sortItems) {
      // Shuffle items initially
      const shuffled = [...activeChallenge.sortItems].sort(() => Math.random() - 0.5);
      setDraggedItems(shuffled);
    }
  }, [activeChallenge]);

  // Handle Challenge Submission
  const handleAnswerSubmit = () => {
    if (challengeAnswered || !activeChallenge) return;

    let correct = false;

    if (activeChallenge.type === 'mcq') {
      if (selectedOption === activeChallenge.correctIndex) {
        correct = true;
      }
    } else if (activeChallenge.type === 'numeric') {
      const val = parseFloat(numericInput);
      const target = activeChallenge.correctAnswer ?? 0;
      const tol = activeChallenge.tolerance ?? 0.05;
      if (!isNaN(val) && Math.abs(val - target) <= tol) {
        correct = true;
      }
    } else if (activeChallenge.type === 'drag-sort') {
      const isSorted = draggedItems.every((item, idx) => item.correctRank === idx + 1);
      if (isSorted) correct = true;
    }

    setIsCorrect(correct);
    setChallengeAnswered(true);

    // Audio & Visual feedback
    if (correct) {
      audioManager.play('drop-correct');
      audioManager.play('sparkle');
      setShowSparkle(true);
      setTimeout(() => setShowSparkle(false), 1500);
      setChallengeScore((prev) => prev + 10);
      speakText('Excellent deduction! Correct answer.');
    } else {
      audioManager.play('drop-wrong');
      speakText('Not quite right. Review the crystal field guidelines.');
    }

    // BKT State update
    const prevBkt = bktStates[activeChallenge.nodeId] || createBKTState(activeChallenge.nodeId);
    const updatedBkt = bktUpdate(prevBkt, correct);
    setBktStates((prev) => ({ ...prev, [activeChallenge.nodeId]: updatedBkt }));

    // SRS State update
    const prevSrs = reviewItems[activeChallenge.id] || createReviewItem(activeChallenge.id);
    const updatedSrs = sm2Update(prevSrs, correct ? 5 : 1);
    setReviewItems((prev) => ({ ...prev, [activeChallenge.id]: updatedSrs }));

    // Record Mastery
    recordGameScore(activeChallenge.nodeId, correct ? 100 : 20);
  };

  // Move to next challenge
  const handleNextChallenge = () => {
    setChallengeAnswered(false);
    setSelectedOption(null);
    setNumericInput('');
    setIsCorrect(null);
    setShowHint(false);
    setCurrentHintIndex(0);

    if (currentChallengeIndex < filteredChallenges.length - 1) {
      setCurrentChallengeIndex((prev) => prev + 1);
    } else {
      // Completed current filtered set
      setShowSuccess(true);
      setShowConfetti(true);
      audioManager.play('celebration');
      speakText('Congratulations! You have completed this series of inorganic challenges.');

      if (onComplete) {
        const finalScore = Math.min(100, Math.round((challengeScore / (filteredChallenges.length * 10)) * 100));
        onComplete(finalScore);
      }
    }
  };

  // Reorder drag sort items
  const moveDragItem = (fromIdx: number, toIdx: number) => {
    if (challengeAnswered) return;
    const newItems = [...draggedItems];
    const [moved] = newItems.splice(fromIdx, 1);
    newItems.splice(toIdx, 0, moved);
    setDraggedItems(newItems);
    audioManager.play('pickup');
  };

  // Overall Mastery percentage calculation
  const overallMasteryPercent = useMemo(() => {
    let totalP = 0;
    ALL_NODE_IDS.forEach((id) => {
      const state = bktStates[id];
      totalP += state ? state.pKnown : 0.1;
    });
    return Math.round((totalP / ALL_NODE_IDS.length) * 100);
  }, [bktStates]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-2 sm:p-4 md:p-6 select-none">
      {/* Top Banner Header */}
      <header className="max-w-7xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-2xl mb-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-br from-gold-500 via-purple-500 to-pink-500 rounded-xl shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded">
                  CISCE / ISC Class 12
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-gold-500/20 text-gold-300 border border-gold-500/30 rounded">
                  Chemistry Lab
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mt-1">
                Colour & Magnetic Properties of Complexes
              </h1>
            </div>
          </div>

          {/* Mastery Bar & Controls */}
          <div className="flex items-center space-x-4 w-full lg:w-auto justify-between lg:justify-end">
            <div className="flex flex-col items-end">
              <span className="text-xs text-slate-400 font-semibold">Overall Mastery</span>
              <div className="flex items-center space-x-2 mt-1">
                <div className="w-32 h-3 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                  <div
                    className="h-full bg-gradient-to-r from-gold-400 via-emerald-400 to-amber-400 transition-all duration-500"
                    style={{ width: `${overallMasteryPercent}%` }}
                  />
                </div>
                <span className="text-sm font-extrabold text-gold-300 font-mono">{overallMasteryPercent}%</span>
              </div>
            </div>

            <button
              onClick={() => {
                speakText('Coordination compounds derive their vivid colors and magnetic moments from crystal field splitting of metal d-orbitals.');
              }}
              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl border border-slate-700 transition"
              title="Narration Audio"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex space-x-2 mt-5 border-t border-slate-800 pt-3 overflow-x-auto scrollbar-none">
          {[
            { id: 'discovery', label: '1. Discovery & Scenario', icon: '💡' },
            { id: 'lab', label: '2. Interactive Lab (5 Steps)', icon: '🧪' },
            { id: 'challenges', label: '3. Practice Challenges (22)', icon: '🎯' },
            { id: 'diagnostics', label: '4. Misconceptions & Quiz', icon: '🔍' },
            { id: 'summary', label: '5. Summary & Real-World', icon: '🏆' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                audioManager.play('tap');
                setActiveTab(tab.id as typeof activeTab);
              }}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-white shadow-lg shadow-gold-500/20'
                  : 'bg-slate-800/60 hover:bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </header>

      {/* Main Container Content */}
      <main className="max-w-7xl mx-auto space-y-6">
        {/* ==========================================
            TAB 1: DISCOVERY & SCENARIO
           ========================================== */}
        {activeTab === 'discovery' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Scenario Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="flex items-center space-x-3 mb-3">
                <span className="px-3 py-1 bg-gold-500/20 text-gold-300 font-bold text-xs rounded-full border border-gold-500/30">
                  ISC Lab Context
                </span>
                <span className="text-xs text-slate-400 font-mono">NODE: c12_chem_061 - c12_chem_070</span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">{SCENARIO.title}</h2>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">{SCENARIO.intro}</p>
              <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 text-xs text-gold-200 leading-normal">
                <strong className="text-gold-400">Mission Objective: </strong>
                {SCENARIO.context}
              </div>
            </div>

            {/* Discovery Preconception Question */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-amber-400 text-lg">💡</span>
                <h3 className="text-lg font-bold text-white">Preconception Discovery Challenge</h3>
              </div>
              <p className="text-sm text-slate-200 mb-4 font-medium">{DISCOVERY_QUESTION.question}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                {DISCOVERY_QUESTION.options.map((opt, idx) => {
                  const isChosen = discoverySelected === idx;
                  const isCorrectOpt = idx === DISCOVERY_QUESTION.correctIndex;

                  let cardStyle = 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300';
                  if (discoveryAnswered) {
                    if (isCorrectOpt) cardStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-semibold';
                    else if (isChosen) cardStyle = 'bg-rose-950/80 border-rose-500 text-rose-200';
                  }

                  return (
                    <button
                      key={idx}
                      disabled={discoveryAnswered}
                      onClick={() => {
                        audioManager.play('tap');
                        setDiscoverySelected(idx);
                        setDiscoveryAnswered(true);
                        if (idx === DISCOVERY_QUESTION.correctIndex) {
                          audioManager.play('success');
                          speakText('Correct! Ligands split the d-orbitals causing light absorption.');
                        } else {
                          audioManager.play('error');
                        }
                      }}
                      className={`p-4 rounded-xl border text-left text-xs sm:text-sm transition-all duration-200 flex items-start space-x-3 ${cardStyle}`}
                    >
                      <span className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 font-bold text-xs">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>

              {discoveryAnswered && (
                <div className="p-4 bg-gold-950/60 border border-gold-800/80 rounded-xl text-xs text-gold-200 animate-fadeIn">
                  <strong className="text-gold-300 block mb-1">Scientific Explanation:</strong>
                  {DISCOVERY_QUESTION.hintAfter}
                </div>
              )}
            </div>

            {/* MANDATORY SECTION: PREDICTION_QUESTIONS */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                <span>🔮</span>
                <span>Hypothesis & Prediction Tests</span>
              </h3>

              {PREDICTION_QUESTIONS.map((pq, qIdx) => (
                <div key={qIdx} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                  <p className="text-sm text-slate-200 font-semibold">{pq.question}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {pq.options.map((opt, oIdx) => {
                      const selected = predictionAnswers[qIdx] === oIdx;
                      const isRight = oIdx === pq.correctIndex;
                      const isAnswered = predictionAnswers[qIdx] !== undefined;

                      let btnStyle = 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700';
                      if (isAnswered) {
                        if (isRight) btnStyle = 'bg-emerald-950 border-emerald-500 text-emerald-200 font-bold';
                        else if (selected) btnStyle = 'bg-rose-950 border-rose-500 text-rose-200';
                      }

                      return (
                        <button
                          key={oIdx}
                          disabled={isAnswered}
                          onClick={() => {
                            audioManager.play('tap');
                            setPredictionAnswers((prev) => ({ ...prev, [qIdx]: oIdx }));
                            if (oIdx === pq.correctIndex) audioManager.play('success');
                            else audioManager.play('error');
                          }}
                          className={`p-3 rounded-lg border text-xs text-left transition ${btnStyle}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {predictionAnswers[qIdx] !== undefined && (
                    <div className="text-xs text-gold-300 bg-gold-950/40 p-2 rounded border border-gold-800/50">
                      💡 <strong>Verification Guide: </strong> {pq.verifyInstruction}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==========================================
            TAB 2: INTERACTIVE LAB (5 STEPS)
           ========================================== */}
        {activeTab === 'lab' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Lab Step Selector Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
              {EXPLORATION_STEPS.map((step, idx) => {
                const isActive = activeLabIndex === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      audioManager.play('tap');
                      setActiveLabIndex(idx);
                      setSelectedNodeId(step.nodeId);
                    }}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      isActive
                        ? 'bg-gradient-to-br from-gold-600 to-gold-700 border-gold-400 text-white shadow-lg shadow-gold-500/20'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                    }`}
                  >
                    <div className="text-[10px] font-bold tracking-wider uppercase opacity-80">Step {idx + 1}</div>
                    <div className="text-xs font-bold truncate mt-0.5">{step.title.split(':')[1] || step.title}</div>
                  </button>
                );
              })}
            </div>

            {/* Current Exploration Step Header */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs font-bold text-gold-400 uppercase tracking-widest">
                    Interactive Lab {activeLabIndex + 1} of 5
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1">
                    {EXPLORATION_STEPS[activeLabIndex].title}
                  </h3>
                  <p className="text-slate-300 text-xs mt-1">
                    {EXPLORATION_STEPS[activeLabIndex].instruction}
                  </p>
                </div>
                <span className="px-2.5 py-1 bg-slate-800 text-gold-300 border border-slate-700 text-xs rounded-lg font-mono">
                  Node: {EXPLORATION_STEPS[activeLabIndex].nodeId}
                </span>
              </div>
            </div>

            {/* Step Controls & Visualizers */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column: Interactive Controls */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
                <h4 className="text-sm font-bold text-slate-200 flex items-center space-x-2">
                  <span>⚙️</span>
                  <span>Complex Parameters</span>
                </h4>

                {/* Metal & Geometry Controls */}
                <div>
                  <label className="text-xs text-slate-400 font-medium block mb-1">Geometry Splitting Field</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        audioManager.play('tap');
                        setGeometry('octahedral');
                      }}
                      className={`py-2 text-xs font-bold rounded-lg border transition ${
                        geometry === 'octahedral'
                          ? 'bg-gold-600 border-gold-400 text-white'
                          : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                    >
                      Octahedral (Δ_o)
                    </button>
                    <button
                      onClick={() => {
                        audioManager.play('tap');
                        setGeometry('tetrahedral');
                        setIsHighSpin(true); // Tetrahedral almost always high spin
                      }}
                      className={`py-2 text-xs font-bold rounded-lg border transition ${
                        geometry === 'tetrahedral'
                          ? 'bg-gold-600 border-gold-400 text-white'
                          : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                    >
                      Tetrahedral (Δ_t)
                    </button>
                  </div>
                </div>

                {/* d-Electron Count Slider */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs text-slate-400 font-medium">d-Electron Count</label>
                    <span className="text-sm font-bold text-amber-400 font-mono">d^{dCount}</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={dCount}
                    onChange={(e) => {
                      setDCount(Number(e.target.value));
                    }}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-400"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                    <span>d¹ (Ti³⁺)</span>
                    <span>d⁵ (Fe³⁺)</span>
                    <span>d⁹ (Cu²⁺)</span>
                    <span>d¹⁰ (Zn²⁺)</span>
                  </div>
                </div>

                {/* Spin State Toggle */}
                {geometry === 'octahedral' && dCount >= 4 && dCount <= 7 && (
                  <div>
                    <label className="text-xs text-slate-400 font-medium block mb-1">Spin Configuration State</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => {
                          audioManager.play('tap');
                          setIsHighSpin(true);
                        }}
                        className={`py-2 text-xs font-bold rounded-lg border transition ${
                          isHighSpin
                            ? 'bg-amber-600 border-amber-400 text-white'
                            : 'bg-slate-950 border-slate-800 text-slate-400'
                        }`}
                      >
                        High Spin (Δ_o &lt; P)
                      </button>
                      <button
                        onClick={() => {
                          audioManager.play('tap');
                          setIsHighSpin(false);
                        }}
                        className={`py-2 text-xs font-bold rounded-lg border transition ${
                          !isHighSpin
                            ? 'bg-gold-600 border-gold-400 text-white'
                            : 'bg-slate-950 border-slate-800 text-slate-400'
                        }`}
                      >
                        Low Spin (Δ_o &gt; P)
                      </button>
                    </div>
                  </div>
                )}

                {/* Spectrochemical Ligand Field Selector */}
                <div>
                  <label className="text-xs text-slate-400 font-medium block mb-2">Spectrochemical Series Ligand</label>
                  <SpectrochemicalSeriesSVG
                    selectedIndex={ligandIndex}
                    onSelect={(idx) => setLigandIndex(idx)}
                  />
                </div>
              </div>

              {/* Middle & Right Columns: Visual Models */}
              <div className="lg:col-span-2 space-y-6">
                {/* Visualizer SVG Component */}
                <OrbitalSplittingSVG
                  geometry={geometry}
                  dCount={dCount}
                  isHighSpin={isHighSpin}
                  deltaEnergy={(ligandIndex + 1) * 12}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Canvas Photon Reaction Flask */}
                  <CanvasTransitionLab
                    dCount={dCount}
                    geometry={geometry}
                    isHighSpin={isHighSpin}
                  />

                  {/* Gouy Balance Magnetic Component */}
                  <GouyBalanceSVG
                    unpairedElectrons={calculatedUnpairedElectrons}
                    complexName={`${geometry === 'octahedral' ? '[M(L)₆]' : '[M(L)₄]'} (${dCount} electrons)`}
                  />
                </div>

                {/* UV-Vis Spectroscopy Color Wheel */}
                <ColorWheelAbsorptionSVG
                  absorbedWavelength={absorbedWavelength}
                  onWavelengthChange={(wl) => setAbsorbedWavelength(wl)}
                />
              </div>
            </div>

            {/* MANDATORY SECTION: OBSERVATION_QUESTIONS */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                <span>👁️</span>
                <span>Lab Observation Questions</span>
              </h3>

              {OBSERVATION_QUESTIONS.map((oq, idx) => (
                <div key={idx} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                  <p className="text-sm text-slate-200 font-semibold">{oq.question}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {oq.observableOptions.map((opt, oIdx) => {
                      const selected = observationAnswers[idx] === oIdx;
                      const isRight = oIdx === oq.correctIndex;
                      const isAnswered = observationAnswers[idx] !== undefined;

                      let btnStyle = 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700';
                      if (isAnswered) {
                        if (isRight) btnStyle = 'bg-emerald-950 border-emerald-500 text-emerald-200 font-bold';
                        else if (selected) btnStyle = 'bg-rose-950 border-rose-500 text-rose-200';
                      }

                      return (
                        <button
                          key={oIdx}
                          disabled={isAnswered}
                          onClick={() => {
                            audioManager.play('tap');
                            setObservationAnswers((prev) => ({ ...prev, [idx]: oIdx }));
                            if (oIdx === oq.correctIndex) audioManager.play('success');
                            else audioManager.play('error');
                          }}
                          className={`p-3 rounded-lg border text-xs text-left transition ${btnStyle}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==========================================
            TAB 3: PRACTICE CHALLENGES (22 ITEMS)
           ========================================== */}
        {activeTab === 'challenges' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Filter Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl">
              <div>
                <span className="text-xs font-bold text-slate-400">Filter Difficulty Tier</span>
                <div className="flex space-x-2 mt-1">
                  {[
                    { id: 'all', label: 'All (22)' },
                    { id: 'foundation', label: 'Foundation (7)' },
                    { id: 'standard', label: 'Standard (8)' },
                    { id: 'advanced', label: 'Advanced (7)' },
                  ].map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => {
                        audioManager.play('tap');
                        setChallengeFilter(filter.id as typeof challengeFilter);
                        setCurrentChallengeIndex(0);
                        setChallengeAnswered(false);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                        challengeFilter === filter.id
                          ? 'bg-gold-500 text-white shadow-md'
                          : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <span className="text-xs text-slate-400 font-mono">
                  Challenge {currentChallengeIndex + 1} of {filteredChallenges.length}
                </span>
                <span className="px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-lg text-xs font-bold">
                  Score: {challengeScore} pts
                </span>
              </div>
            </div>

            {/* Challenge Card */}
            {activeChallenge && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl relative space-y-5">
                {/* Challenge Header info */}
                <div className="flex flex-wrap justify-between items-center gap-2 border-b border-slate-800 pb-3">
                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wide ${
                        activeChallenge.difficulty === 'foundation'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : activeChallenge.difficulty === 'standard'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      }`}
                    >
                      {activeChallenge.difficulty}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      Competency: <strong className="text-slate-200">{activeChallenge.competencyLevel}</strong>
                    </span>
                  </div>
                  <span className="text-xs font-mono text-gold-400 bg-slate-950 px-2 py-1 rounded border border-slate-800">
                    Node: {activeChallenge.nodeId}
                  </span>
                </div>

                {/* Question Prompt */}
                <h3 className="text-lg font-bold text-white leading-snug">{activeChallenge.question}</h3>

                {/* Challenge Inputs (MCQ vs Numeric vs Drag Sort) */}
                {activeChallenge.type === 'mcq' && activeChallenge.options && (
                  <div className="grid grid-cols-1 gap-3">
                    {activeChallenge.options.map((opt, idx) => {
                      const isChosen = selectedOption === idx;
                      const isRight = idx === activeChallenge.correctIndex;

                      let btnStyle = 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700';
                      if (challengeAnswered) {
                        if (isRight) btnStyle = 'bg-emerald-950 border-emerald-500 text-emerald-200 font-bold';
                        else if (isChosen) btnStyle = 'bg-rose-950 border-rose-500 text-rose-200';
                      } else if (isChosen) {
                        btnStyle = 'bg-gold-950 border-gold-500 text-gold-200 font-bold';
                      }

                      return (
                        <button
                          key={idx}
                          disabled={challengeAnswered}
                          onClick={() => {
                            audioManager.play('tap');
                            setSelectedOption(idx);
                          }}
                          className={`p-4 rounded-xl border text-left text-sm transition flex items-center space-x-3 ${btnStyle}`}
                        >
                          <span className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 font-bold text-xs">
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <span>{opt}</span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {activeChallenge.type === 'numeric' && (
                  <div className="space-y-3 max-w-xs">
                    <label className="text-xs text-slate-400 block font-medium">Enter calculated value:</label>
                    <input
                      type="number"
                      step="any"
                      disabled={challengeAnswered}
                      value={numericInput}
                      onChange={(e) => setNumericInput(e.target.value)}
                      placeholder="e.g. 3.87"
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono font-bold text-lg focus:outline-none focus:border-gold-500"
                    />
                  </div>
                )}

                {activeChallenge.type === 'drag-sort' && (
                  <div className="space-y-3">
                    <p className="text-xs text-slate-400">Drag/reorder items into correct order (Top = 1st, Bottom = Last):</p>
                    <div className="space-y-2">
                      {draggedItems.map((item, idx) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between p-3 bg-slate-950 border border-slate-800 rounded-xl"
                        >
                          <div className="flex items-center space-x-3">
                            <span className="w-6 h-6 rounded-full bg-slate-800 text-slate-300 font-bold text-xs flex items-center justify-center">
                              {idx + 1}
                            </span>
                            <span className="text-sm font-semibold text-slate-200">{item.label}</span>
                          </div>

                          {!challengeAnswered && (
                            <div className="flex space-x-1">
                              <button
                                disabled={idx === 0}
                                onClick={() => moveDragItem(idx, idx - 1)}
                                className="p-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 rounded text-slate-300"
                              >
                                ▲
                              </button>
                              <button
                                disabled={idx === draggedItems.length - 1}
                                onClick={() => moveDragItem(idx, idx + 1)}
                                className="p-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 rounded text-slate-300"
                              >
                                ▼
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Explanation Banner when answered */}
                {challengeAnswered && (
                  <div
                    className={`p-4 rounded-xl border text-xs leading-relaxed animate-fadeIn ${
                      isCorrect
                        ? 'bg-emerald-950/80 border-emerald-800 text-emerald-200'
                        : 'bg-rose-950/80 border-rose-800 text-rose-200'
                    }`}
                  >
                    <strong className="block text-sm font-bold mb-1">
                      {isCorrect ? '✅ Excellent Analysis!' : '❌ Incorrect Statement'}
                    </strong>
                    {activeChallenge.explanation}
                  </div>
                )}

                {/* Hint System */}
                {showHint && (
                  <div className="p-4 bg-amber-950/60 border border-amber-800/80 rounded-xl text-xs text-amber-200 animate-fadeIn space-y-2">
                    <div className="flex justify-between items-center font-bold text-amber-300">
                      <span>💡 Guided Hint ({currentHintIndex + 1}/3)</span>
                      {currentHintIndex < 2 && (
                        <button
                          onClick={() => {
                            audioManager.play('tap');
                            setCurrentHintIndex((prev) => prev + 1);
                          }}
                          className="text-[10px] underline hover:text-white"
                        >
                          Next Hint →
                        </button>
                      )}
                    </div>
                    <p>{activeChallenge.hints[currentHintIndex]}</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap justify-between items-center gap-3 pt-3 border-t border-slate-800">
                  <button
                    onClick={() => {
                      audioManager.play('hint');
                      setShowHint(!showHint);
                    }}
                    className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-bold rounded-xl border border-slate-700 transition"
                  >
                    {showHint ? 'Hide Hint' : '💡 Need a Hint?'}
                  </button>

                  {!challengeAnswered ? (
                    <button
                      onClick={handleAnswerSubmit}
                      disabled={
                        (activeChallenge.type === 'mcq' && selectedOption === null) ||
                        (activeChallenge.type === 'numeric' && !numericInput)
                      }
                      className="px-6 py-2.5 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white font-bold text-sm rounded-xl shadow-lg transition active:scale-95 disabled:opacity-50"
                    >
                      Submit Answer
                    </button>
                  ) : (
                    <button
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-sm rounded-xl shadow-lg transition active:scale-95"
                    >
                      {currentChallengeIndex < filteredChallenges.length - 1 ? 'Next Challenge →' : 'Complete Challenge Tier 🎉'}
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ==========================================
            TAB 4: MISCONCEPTIONS & DIAGNOSTICS
           ========================================== */}
        {activeTab === 'diagnostics' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Misconceptions Grid */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
                <span>⚡</span>
                <span>Common Inorganic Chemistry Misconceptions</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MISCONCEPTIONS.map((misc) => (
                  <div key={misc.id} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-rose-400">{misc.title}</span>
                      <span className="text-[10px] font-mono text-slate-500">{misc.nodeId}</span>
                    </div>
                    <p className="text-xs text-rose-200 bg-rose-950/40 p-2 rounded border border-rose-900/50">
                      ❌ <strong>Myth: </strong> {misc.misconception}
                    </p>
                    <p className="text-xs text-emerald-200 bg-emerald-950/40 p-2 rounded border border-emerald-900/50">
                      ✅ <strong>Fact: </strong> {misc.correction}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Diagnostic Practice Quiz */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                <span>📝</span>
                <span>ISC Diagnostic Readiness Quiz (8 Node Checks)</span>
              </h3>

              <div className="grid grid-cols-1 gap-4">
                {DIAGNOSTIC_QUESTIONS.map((dq, idx) => (
                  <div key={dq.id} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex justify-between items-start">
                      <span className="text-xs font-bold text-gold-400">Question {idx + 1}</span>
                      <span className="text-[10px] font-mono text-slate-500">{dq.nodeId}</span>
                    </div>
                    <p className="text-sm text-slate-200 font-semibold">{dq.question}</p>
                    <p className="text-xs text-slate-400 italic">Correct Answer Concept: {dq.explanation}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==========================================
            TAB 5: SUMMARY & REAL-WORLD
           ========================================== */}
        {activeTab === 'summary' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Real World Activity Render */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center space-x-3">
                <span className="p-2 bg-emerald-500/20 text-emerald-300 rounded-xl text-xl">🏭</span>
                <div>
                  <h3 className="text-lg font-bold text-white">{REAL_WORLD_ACTIVITY.title}</h3>
                  <p className="text-xs text-slate-400">{REAL_WORLD_ACTIVITY.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                {REAL_WORLD_ACTIVITY.steps.map((stepText, idx) => (
                  <div key={idx} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-xs font-extrabold text-gold-400">Phase {idx + 1}</span>
                    <p className="text-xs text-slate-300 leading-relaxed">{stepText}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Node Mastery Breakdown Grid */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-bold text-white mb-4">ISC Syllabus Node Mastery Summary</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {ALL_NODE_IDS.map((nodeId) => {
                  const meta = NODE_METADATA[nodeId];
                  const state = bktStates[nodeId];
                  const masterPercent = Math.round((state ? state.pKnown : 0.1) * 100);

                  return (
                    <div key={nodeId} className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="font-mono text-gold-400">{meta.code}</span>
                        <span className="font-bold text-emerald-400 font-mono">{masterPercent}%</span>
                      </div>
                      <div className="text-xs font-bold text-slate-200 truncate">{meta.title}</div>
                      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-gold-400 transition-all duration-500" style={{ width: `${masterPercent}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Final Certificate & Action Button */}
            <div className="bg-gradient-to-r from-gold-900/50 via-slate-900 to-gold-900/50 border border-gold-500/30 rounded-2xl p-6 text-center space-y-4">
              <h3 className="text-xl font-extrabold text-white">Lab Synthesis Complete!</h3>
              <p className="text-xs text-slate-300 max-w-lg mx-auto">
                You have demonstrated competency across crystal field theory, spectrochemical splitting, d-d absorption spectra, and magnetic susceptibility.
              </p>
              <button
                onClick={() => {
                  audioManager.play('celebration');
                  setShowConfetti(true);
                  if (onComplete) onComplete(overallMasteryPercent);
                }}
                className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-sm rounded-xl shadow-xl transition active:scale-95"
              >
                Submit Score & Export Certificate
              </button>
            </div>
          </div>
        )}
      </main>

      {/* MANDATORY FEEDBACK UI COMPONENTS */}
      <HintBubble show={showHint} text={activeChallenge?.hints[currentHintIndex] || 'Recall crystal field rules.'} />
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccess} text="ISC Laboratory Simulation Complete!" />
      <SparkleBurst show={showSparkle} x={500} y={300} />
    </div>
  );
};

export default C12_ChemistryColourandmagneticpropertiesofcomplexesSim;