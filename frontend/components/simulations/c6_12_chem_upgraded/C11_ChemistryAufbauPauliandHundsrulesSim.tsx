'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ==========================================
// TYPE DEFINITIONS & INTERFACES
// ==========================================

export interface QuantumNumbers {
  n: number;
  l: number;
  ml: number;
  ms: number;
}

export interface SubshellInfo {
  id: string;
  name: string;
  n: number;
  l: number;
  capacity: number;
  orbitalsCount: number;
  nPlusL: number;
  energyRank: number;
}

export interface OrbitalSlot {
  orbitalId: string; // e.g., '2p_x'
  subshellId: string; // e.g., '2p'
  index: number; // 0, 1, 2
  electrons: ('up' | 'down')[];
}

export interface ElementData {
  z: number;
  symbol: string;
  name: string;
  category: string;
  period: number;
  group: string;
  configString: string;
  nobleCore: string;
  valenceConfig: string;
  isException: boolean;
  exceptionReason?: string;
  unpairedElectrons: number;
  paramagnetic: boolean;
  exchangePairsCount: number;
  ionConfigs: {
    ionSymbol: string;
    charge: number;
    removedElectronsFrom: string;
    configString: string;
  }[];
}

export interface ExplorationStep {
  title: string;
  instruction: string;
  interactionType: string;
  nodeId: string;
}

export interface PredictionQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  verifyInstruction: string;
  nodeId: string;
}

export interface ObservationQuestion {
  question: string;
  observableOptions: string[];
  correctIndex: number;
  nodeId: string;
}

export interface RealWorldActivity {
  title: string;
  description: string;
  steps: string[];
}

export interface MisconceptionItem {
  id: string;
  misconception: string;
  correction: string;
  nodeId: string;
  example: string;
}

export interface DiagnosticQuestion {
  id: string;
  nodeId: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ChallengeItem {
  id: string;
  nodeId: string;
  type: 'mcq' | 'drag-order' | 'orbital-build' | 'numeric';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: string;
  question: string;
  options?: string[];
  correctIndex?: number;
  correctAnswer?: string | number;
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
}

// ==========================================
// NODE IDS & CONSTANTS
// ==========================================

const NODE_021 = 'c11_chem_021';
const NODE_022 = 'c11_chem_022';
const NODE_023 = 'c11_chem_023';
const NODE_024 = 'c11_chem_024';
const NODE_025 = 'c11_chem_025';
const NODE_026 = 'c11_chem_026';
const NODE_027 = 'c11_chem_027';
const NODE_028 = 'c11_chem_028';
const NODE_029 = 'c11_chem_029';
const NODE_030 = 'c11_chem_030';

const ALL_NODE_IDS = [
  NODE_021, NODE_022, NODE_023, NODE_024, NODE_025,
  NODE_026, NODE_027, NODE_028, NODE_029, NODE_030
];

// Subshells metadata ordered by Aufbau energy
const SUBSHELLS: SubshellInfo[] = [
  { id: '1s', name: '1s', n: 1, l: 0, capacity: 2, orbitalsCount: 1, nPlusL: 1, energyRank: 1 },
  { id: '2s', name: '2s', n: 2, l: 0, capacity: 2, orbitalsCount: 1, nPlusL: 2, energyRank: 2 },
  { id: '2p', name: '2p', n: 2, l: 1, capacity: 6, orbitalsCount: 3, nPlusL: 3, energyRank: 3 },
  { id: '3s', name: '3s', n: 3, l: 0, capacity: 2, orbitalsCount: 1, nPlusL: 3, energyRank: 4 },
  { id: '3p', name: '3p', n: 3, l: 1, capacity: 6, orbitalsCount: 3, nPlusL: 4, energyRank: 5 },
  { id: '4s', name: '4s', n: 4, l: 0, capacity: 2, orbitalsCount: 1, nPlusL: 4, energyRank: 6 },
  { id: '3d', name: '3d', n: 3, l: 2, capacity: 10, orbitalsCount: 5, nPlusL: 5, energyRank: 7 },
  { id: '4p', name: '4p', n: 4, l: 1, capacity: 6, orbitalsCount: 3, nPlusL: 5, energyRank: 8 }
];

// ==========================================
// MANDATORY SECTION 1: SCENARIO
// ==========================================
const SCENARIO = {
  title: 'Quantum Electronic Structure & Aufbau Dynamics Laboratory',
  intro: 'Welcome to the High-Precision Spectroscopic & Quantum Chemistry Facility. As a senior ISC quantum chemist, you will investigate how electrons arrange themselves around atomic nuclei following fundamental quantum principles.',
  context: 'Using quantum state detectors, exchange energy meters, and orbital visualization chambers, you will build atoms from Z=1 (Hydrogen) to Z=30 (Zinc), analyze transition metal ionization, and resolve famous anomalies in Chromium and Copper.'
};

// ==========================================
// MANDATORY SECTION 2: DISCOVERY_QUESTION
// ==========================================
const DISCOVERY_QUESTION = {
  question: 'Why does Chromium (Z=24) adopt a [Ar] 4s¹ 3d⁵ ground-state electronic configuration instead of the expected [Ar] 4s² 3d⁴ configuration?',
  options: [
    'Because 4s electrons have a higher principal quantum number n and are automatically destroyed',
    'Because half-filled d⁵ subshells maximize quantum exchange energy and electron spatial distribution symmetry',
    'Because the 3d subshell has a lower (n + l) sum than 4s when neutral',
    'Because Pauli exclusion principle prohibits having two electrons in the 4s orbital for transition metals'
  ],
  correctIndex: 1,
  hintAfter: 'Quantum exchange energy is proportional to the number of pairs of parallel spin electrons: K = n(n-1)/2. A d⁵ configuration offers 10 exchange interactions compared to only 6 for d⁴!'
};

// ==========================================
// MANDATORY SECTION 3: EXPLORATION_STEPS
// ==========================================
const EXPLORATION_STEPS: ExplorationStep[] = [
  {
    title: 'Lab 1: Quantum Numbers & Orbital Geometry Explorer',
    instruction: 'Select principal (n) and azimuthal (l) quantum numbers to render 3D orbital probability density clouds (s, p, d) and calculate radial/angular nodes.',
    interactionType: 'quantum-orbital-visualizer',
    nodeId: NODE_021
  },
  {
    title: 'Lab 2: Aufbau (n + l) Energy Ladder Construction',
    instruction: 'Sort subshells (1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p) onto the energy ladder using the Bohr-Sommerfeld (n + l) rule. Compare subshells with identical (n + l) values.',
    interactionType: 'aufbau-energy-ladder',
    nodeId: NODE_023
  },
  {
    title: 'Lab 3: Pauli & Hund Orbital Box Electron Filler',
    instruction: 'Manually add spin-up (↑) and spin-down (↓) electrons into degenerate orbital boxes. Observe real-time rule compliance indicators (Pauli Exclusion & Hund Maximum Multiplicity).',
    interactionType: 'orbital-box-filler',
    nodeId: NODE_025
  },
  {
    title: 'Lab 4: Transition Metal Anomalies & Exchange Energy Counter',
    instruction: 'Toggle between hypothetical 4s² 3d⁴ vs actual 4s¹ 3d⁵ for Chromium (Z=24). Count identical spin exchange pathways and evaluate total exchange stabilization energy.',
    interactionType: 'exchange-energy-calculator',
    nodeId: NODE_028
  },
  {
    title: 'Lab 5: Ionization Sequence & Cation Formation Visualizer',
    instruction: 'Strip electrons one by one from neutral Iron (Fe, Z=26) to form Fe²⁺ and Fe³⁺ cations. Observe how 4s electrons are ionized prior to 3d electrons due to nuclear shielding.',
    interactionType: 'ionization-sequence-sim',
    nodeId: NODE_029
  }
];

// ==========================================
// MANDATORY SECTION 4: PREDICTION_QUESTIONS
// ==========================================
const PREDICTION_QUESTIONS: PredictionQuestion[] = [
  {
    question: 'Predict: When neutral Iron (Fe, Z=26: [Ar] 4s² 3d⁶) oxidizes to form the Fe²⁺ ion, which subshell loses electrons first?',
    options: [
      'The 3d subshell, because 3d electrons were filled last according to Aufbau rule',
      'The 4s subshell, because 4s electrons have higher principal quantum number n=4 and experience shielding',
      'One 4s electron and one 3d electron simultaneously',
      'The 3p subshell, because inner p electrons feel maximum electron repulsion'
    ],
    correctIndex: 1,
    verifyInstruction: 'In Lab 5 (Ionization Sequence Visualizer), click "Strip 1st Electron" on Iron (Z=26) and observe which shell loses an electron first.',
    nodeId: NODE_029
  },
  {
    question: 'Predict: How many exchange interactions occur among parallel spin electrons in a manganese d⁵ subshell compared to a iron d⁶ subshell?',
    options: [
      'd⁵ has 10 exchange interactions; d⁶ has 10 exchange interactions among parallel spins (plus 0 for antiparallel)',
      'd⁵ has 5 exchange interactions; d⁶ has 6 exchange interactions',
      'd⁵ has 15 exchange interactions; d⁶ has 12 exchange interactions',
      'd⁵ has 8 exchange interactions; d⁶ has 4 exchange interactions'
    ],
    correctIndex: 0,
    verifyInstruction: 'In Lab 4 (Exchange Energy Counter), set element to Mn (Z=25) and Fe (Z=26), then switch the parallel spin filter to count lines.',
    nodeId: NODE_030
  }
];

// ==========================================
// MANDATORY SECTION 5: OBSERVATION_QUESTIONS
// ==========================================
const OBSERVATION_QUESTIONS: ObservationQuestion[] = [
  {
    question: 'What do you observe about the energy order when comparing 4s (n=4, l=0) and 3d (n=3, l=2) orbitals in a neutral atom?',
    observableOptions: [
      '4s has (n+l)=4 while 3d has (n+l)=5; lower (n+l) value gives 4s lower energy and earlier filling in neutral atoms',
      '3d always has lower energy because n=3 is smaller than n=4',
      '4s and 3d have identical energy because n+l sums are equal',
      '3d orbital fills before 4s orbital in all conditions'
    ],
    correctIndex: 0,
    nodeId: NODE_023
  },
  {
    question: 'What happens to electron spins in degenerate 2p orbitals as you add electrons from Carbon (Z=6) to Nitrogen (Z=7)?',
    observableOptions: [
      'Electrons pair up in 2p_x before any electron enters 2p_y',
      'Unpaired electrons occupy separate orbitals with parallel spins (all spin-up) to maximize exchange energy',
      'Electrons enter separate orbitals with alternating opposite spins (↑, ↓, ↑)',
      'The 2s orbital loses an electron to promote to 2p'
    ],
    correctIndex: 1,
    nodeId: NODE_026
  }
];

// ==========================================
// MANDATORY SECTION 6: REAL_WORLD_ACTIVITY
// ==========================================
const REAL_WORLD_ACTIVITY: RealWorldActivity = {
  title: 'Paramagnetic MRI Contrast Agent Design & Transition Metal Magnetism',
  description: 'In diagnostic medicine, Magnetic Resonance Imaging (MRI) relies on gadolinium (Gd³⁺) and manganese (Mn²⁺) contrast agents. Their effectiveness depends directly on having high numbers of unpaired d or f electrons, producing strong paramagnetic dipole moments.',
  steps: [
    'Step 1: Write ground state electronic configuration for neutral Manganese (Z=25): 1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d⁵.',
    'Step 2: Apply ionization rules for Mn²⁺ cation: remove 4s² electrons first to yield [Ar] 3d⁵.',
    'Step 3: Calculate unpaired electrons using Hund\'s Rule: 5 degenerate 3d orbitals filled singly = 5 unpaired electrons (n = 5).',
    'Step 4: Compute theoretical magnetic moment: μ = √(n(n + 2)) = √(5 × 7) = √35 ≈ 5.92 Bohr Magnetons (BM), optimizing MRI contrast efficiency!'
  ]
};

// ==========================================
// EXISTING MISCONCEPTIONS (PRESERVED & EXPANDED)
// ==========================================
const MISCONCEPTIONS: MisconceptionItem[] = [
  {
    id: 'misc_1',
    misconception: 'Electrons fill subshells in simple order of principal quantum number n (3d before 4s).',
    correction: 'Electron filling order is governed by energy level, given by the (n + l) rule. 4s has (4+0=4) while 3d has (3+2=5). Thus 4s fills before 3d in neutral atoms.',
    nodeId: NODE_023,
    example: 'K (Z=19) has configuration [Ar] 4s¹, NOT [Ar] 3d¹.'
  },
  {
    id: 'misc_2',
    misconception: 'Hund\'s rule permits electron pairing before singly filling degenerate orbitals.',
    correction: 'Hund\'s rule mandates that degenerate orbitals must each be singly occupied with parallel spins before any orbital is doubly occupied, minimizing electrostatic repulsion.',
    nodeId: NODE_026,
    example: 'Nitrogen (2p³) has ↑ | ↑ | ↑ in separate boxes, NOT ↑↓ | ↑ | __.'
  },
  {
    id: 'misc_3',
    misconception: 'Two electrons occupying the same orbital can have identical parallel spins.',
    correction: 'Pauli Exclusion Principle states no two electrons can have identical four quantum numbers. In a single orbital (same n, l, ml), spins MUST be opposite (+1/2 and -1/2).',
    nodeId: NODE_025,
    example: 'An orbital box must be drawn with ↑↓, never ↑↑ or ↓↓.'
  },
  {
    id: 'misc_4',
    misconception: 'Electrons are removed during ionization in exact reverse Aufbau order (3d before 4s).',
    correction: 'During cation formation of 3d transition metals, electrons are removed from the outer shell (n=4, 4s) FIRST before 3d, because once occupied, 3d lowers in energy relative to 4s.',
    nodeId: NODE_029,
    example: 'Fe²⁺ (Z=26) is [Ar] 3d⁶, NOT [Ar] 4s² 3d⁴.'
  },
  {
    id: 'misc_5',
    misconception: 'Singly occupied degenerate orbitals can contain electrons with opposite spin directions.',
    correction: 'Hund\'s rule specifies parallel spins for unpaired electrons to maximize total spin multiplicity and quantum mechanical exchange energy stabilization.',
    nodeId: NODE_030,
    example: 'Carbon (2p²) has ↑ | ↑ | __, NOT ↑ | ↓ | __.'
  },
  {
    id: 'misc_6',
    misconception: 'Chromium and Copper exceptions occur because 3d orbitals are always lower energy than 4s.',
    correction: 'Cr ([Ar] 4s¹ 3d⁵) and Cu ([Ar] 4s¹ 3d¹⁰) configurations arise because half-filled (d⁵) and fully-filled (d¹⁰) subshells gain extraordinary stability through maximum exchange energy and spherical symmetry.',
    nodeId: NODE_028,
    example: 'Exchange combinations for d⁵ = 5(4)/2 = 10 pairs; for d⁴ = 4(3)/2 = 6 pairs.'
  }
];

// ==========================================
// ELEMENTS DATA BANK (Z=1 to Z=30)
// ==========================================
const ELEMENTS_DATA: ElementData[] = [
  { z: 1, symbol: 'H', name: 'Hydrogen', category: 'Nonmetal', period: 1, group: '1', configString: '1s¹', nobleCore: '', valenceConfig: '1s¹', isException: false, unpairedElectrons: 1, paramagnetic: true, exchangePairsCount: 0, ionConfigs: [{ ionSymbol: 'H⁺', charge: 1, removedElectronsFrom: '1s', configString: '1s⁰' }] },
  { z: 2, symbol: 'He', name: 'Helium', category: 'Noble Gas', period: 1, group: '18', configString: '1s²', nobleCore: '', valenceConfig: '1s²', isException: false, unpairedElectrons: 0, paramagnetic: false, exchangePairsCount: 1, ionConfigs: [] },
  { z: 3, symbol: 'Li', name: 'Lithium', category: 'Alkali Metal', period: 2, group: '1', configString: '1s² 2s¹', nobleCore: '[He]', valenceConfig: '2s¹', isException: false, unpairedElectrons: 1, paramagnetic: true, exchangePairsCount: 1, ionConfigs: [{ ionSymbol: 'Li⁺', charge: 1, removedElectronsFrom: '2s', configString: '[He]' }] },
  { z: 4, symbol: 'Be', name: 'Beryllium', category: 'Alkaline Earth', period: 2, group: '2', configString: '1s² 2s²', nobleCore: '[He]', valenceConfig: '2s²', isException: false, unpairedElectrons: 0, paramagnetic: false, exchangePairsCount: 2, ionConfigs: [{ ionSymbol: 'Be²⁺', charge: 2, removedElectronsFrom: '2s', configString: '[He]' }] },
  { z: 5, symbol: 'B', name: 'Boron', category: 'Metalloid', period: 2, group: '13', configString: '1s² 2s² 2p¹', nobleCore: '[He]', valenceConfig: '2s² 2p¹', isException: false, unpairedElectrons: 1, paramagnetic: true, exchangePairsCount: 2, ionConfigs: [{ ionSymbol: 'B³⁺', charge: 3, removedElectronsFrom: '2p, 2s', configString: '[He]' }] },
  { z: 6, symbol: 'C', name: 'Carbon', category: 'Nonmetal', period: 2, group: '14', configString: '1s² 2s² 2p²', nobleCore: '[He]', valenceConfig: '2s² 2p²', isException: false, unpairedElectrons: 2, paramagnetic: true, exchangePairsCount: 3, ionConfigs: [] },
  { z: 7, symbol: 'N', name: 'Nitrogen', category: 'Nonmetal', period: 2, group: '15', configString: '1s² 2s² 2p³', nobleCore: '[He]', valenceConfig: '2s² 2p³', isException: false, unpairedElectrons: 3, paramagnetic: true, exchangePairsCount: 5, ionConfigs: [] },
  { z: 8, symbol: 'O', name: 'Oxygen', category: 'Nonmetal', period: 2, group: '16', configString: '1s² 2s² 2p⁴', nobleCore: '[He]', valenceConfig: '2s² 2p⁴', isException: false, unpairedElectrons: 2, paramagnetic: true, exchangePairsCount: 6, ionConfigs: [] },
  { z: 9, symbol: 'F', name: 'Fluorine', category: 'Halogen', period: 2, group: '17', configString: '1s² 2s² 2p⁵', nobleCore: '[He]', valenceConfig: '2s² 2p⁵', isException: false, unpairedElectrons: 1, paramagnetic: true, exchangePairsCount: 8, ionConfigs: [{ ionSymbol: 'F⁻', charge: -1, removedElectronsFrom: 'added to 2p', configString: '[Ne]' }] },
  { z: 10, symbol: 'Ne', name: 'Neon', category: 'Noble Gas', period: 2, group: '18', configString: '1s² 2s² 2p⁶', nobleCore: '[Ne]', valenceConfig: '2s² 2p⁶', isException: false, unpairedElectrons: 0, paramagnetic: false, exchangePairsCount: 11, ionConfigs: [] },
  { z: 11, symbol: 'Na', name: 'Sodium', category: 'Alkali Metal', period: 3, group: '1', configString: '1s² 2s² 2p⁶ 3s¹', nobleCore: '[Ne]', valenceConfig: '3s¹', isException: false, unpairedElectrons: 1, paramagnetic: true, exchangePairsCount: 11, ionConfigs: [{ ionSymbol: 'Na⁺', charge: 1, removedElectronsFrom: '3s', configString: '[Ne]' }] },
  { z: 12, symbol: 'Mg', name: 'Magnesium', category: 'Alkaline Earth', period: 3, group: '2', configString: '1s² 2s² 2p⁶ 3s²', nobleCore: '[Ne]', valenceConfig: '3s²', isException: false, unpairedElectrons: 0, paramagnetic: false, exchangePairsCount: 12, ionConfigs: [{ ionSymbol: 'Mg²⁺', charge: 2, removedElectronsFrom: '3s', configString: '[Ne]' }] },
  { z: 13, symbol: 'Al', name: 'Aluminium', category: 'Post-transition', period: 3, group: '13', configString: '1s² 2s² 2p⁶ 3s² 3p¹', nobleCore: '[Ne]', valenceConfig: '3s² 3p¹', isException: false, unpairedElectrons: 1, paramagnetic: true, exchangePairsCount: 12, ionConfigs: [{ ionSymbol: 'Al³⁺', charge: 3, removedElectronsFrom: '3p, 3s', configString: '[Ne]' }] },
  { z: 14, symbol: 'Si', name: 'Silicon', category: 'Metalloid', period: 3, group: '14', configString: '1s² 2s² 2p⁶ 3s² 3p²', nobleCore: '[Ne]', valenceConfig: '3s² 3p²', isException: false, unpairedElectrons: 2, paramagnetic: true, exchangePairsCount: 13, ionConfigs: [] },
  { z: 15, symbol: 'P', name: 'Phosphorus', category: 'Nonmetal', period: 3, group: '15', configString: '1s² 2s² 2p⁶ 3s² 3p³', nobleCore: '[Ne]', valenceConfig: '3s² 3p³', isException: false, unpairedElectrons: 3, paramagnetic: true, exchangePairsCount: 15, ionConfigs: [] },
  { z: 16, symbol: 'S', name: 'Sulfur', category: 'Nonmetal', period: 3, group: '16', configString: '1s² 2s² 2p⁶ 3s² 3p⁴', nobleCore: '[Ne]', valenceConfig: '3s² 3p⁴', isException: false, unpairedElectrons: 2, paramagnetic: true, exchangePairsCount: 16, ionConfigs: [] },
  { z: 17, symbol: 'Cl', name: 'Chlorine', category: 'Halogen', period: 3, group: '17', configString: '1s² 2s² 2p⁶ 3s² 3p⁵', nobleCore: '[Ne]', valenceConfig: '3s² 3p⁵', isException: false, unpairedElectrons: 1, paramagnetic: true, exchangePairsCount: 18, ionConfigs: [] },
  { z: 18, symbol: 'Ar', name: 'Argon', category: 'Noble Gas', period: 3, group: '18', configString: '1s² 2s² 2p⁶ 3s² 3p⁶', nobleCore: '[Ar]', valenceConfig: '3s² 3p⁶', isException: false, unpairedElectrons: 0, paramagnetic: false, exchangePairsCount: 21, ionConfigs: [] },
  { z: 19, symbol: 'K', name: 'Potassium', category: 'Alkali Metal', period: 4, group: '1', configString: '[Ar] 4s¹', nobleCore: '[Ar]', valenceConfig: '4s¹', isException: false, unpairedElectrons: 1, paramagnetic: true, exchangePairsCount: 21, ionConfigs: [{ ionSymbol: 'K⁺', charge: 1, removedElectronsFrom: '4s', configString: '[Ar]' }] },
  { z: 20, symbol: 'Ca', name: 'Calcium', category: 'Alkaline Earth', period: 4, group: '2', configString: '[Ar] 4s²', nobleCore: '[Ar]', valenceConfig: '4s²', isException: false, unpairedElectrons: 0, paramagnetic: false, exchangePairsCount: 22, ionConfigs: [{ ionSymbol: 'Ca²⁺', charge: 2, removedElectronsFrom: '4s', configString: '[Ar]' }] },
  { z: 21, symbol: 'Sc', name: 'Scandium', category: 'Transition Metal', period: 4, group: '3', configString: '[Ar] 4s² 3d¹', nobleCore: '[Ar]', valenceConfig: '4s² 3d¹', isException: false, unpairedElectrons: 1, paramagnetic: true, exchangePairsCount: 22, ionConfigs: [{ ionSymbol: 'Sc³⁺', charge: 3, removedElectronsFrom: '4s, 3d', configString: '[Ar]' }] },
  { z: 22, symbol: 'Ti', name: 'Titanium', category: 'Transition Metal', period: 4, group: '4', configString: '[Ar] 4s² 3d²', nobleCore: '[Ar]', valenceConfig: '4s² 3d²', isException: false, unpairedElectrons: 2, paramagnetic: true, exchangePairsCount: 23, ionConfigs: [{ ionSymbol: 'Ti²⁺', charge: 2, removedElectronsFrom: '4s', configString: '[Ar] 3d²' }, { ionSymbol: 'Ti⁴⁺', charge: 4, removedElectronsFrom: '4s, 3d', configString: '[Ar]' }] },
  { z: 23, symbol: 'V', name: 'Vanadium', category: 'Transition Metal', period: 4, group: '5', configString: '[Ar] 4s² 3d³', nobleCore: '[Ar]', valenceConfig: '4s² 3d³', isException: false, unpairedElectrons: 3, paramagnetic: true, exchangePairsCount: 25, ionConfigs: [{ ionSymbol: 'V³⁺', charge: 3, removedElectronsFrom: '4s, 3d', configString: '[Ar] 3d²' }, { ionSymbol: 'V⁵⁺', charge: 5, removedElectronsFrom: '4s, 3d', configString: '[Ar]' }] },
  { z: 24, symbol: 'Cr', name: 'Chromium', category: 'Transition Metal', period: 4, group: '6', configString: '[Ar] 4s¹ 3d⁵', nobleCore: '[Ar]', valenceConfig: '4s¹ 3d⁵', isException: true, exceptionReason: 'Extra exchange stability of half-filled 3d⁵ subshell (10 exchange pairs vs 6 for 3d⁴).', unpairedElectrons: 6, paramagnetic: true, exchangePairsCount: 31, ionConfigs: [{ ionSymbol: 'Cr³⁺', charge: 3, removedElectronsFrom: '4s, 3d', configString: '[Ar] 3d³' }, { ionSymbol: 'Cr⁶⁺', charge: 6, removedElectronsFrom: '4s, 3d', configString: '[Ar]' }] },
  { z: 25, symbol: 'Mn', name: 'Manganese', category: 'Transition Metal', period: 4, group: '7', configString: '[Ar] 4s² 3d⁵', nobleCore: '[Ar]', valenceConfig: '4s² 3d⁵', isException: false, unpairedElectrons: 5, paramagnetic: true, exchangePairsCount: 31, ionConfigs: [{ ionSymbol: 'Mn²⁺', charge: 2, removedElectronsFrom: '4s', configString: '[Ar] 3d⁵' }, { ionSymbol: 'Mn⁴⁺', charge: 4, removedElectronsFrom: '4s, 3d', configString: '[Ar] 3d³' }] },
  { z: 26, symbol: 'Fe', name: 'Iron', category: 'Transition Metal', period: 4, group: '8', configString: '[Ar] 4s² 3d⁶', nobleCore: '[Ar]', valenceConfig: '4s² 3d⁶', isException: false, unpairedElectrons: 4, paramagnetic: true, exchangePairsCount: 32, ionConfigs: [{ ionSymbol: 'Fe²⁺', charge: 2, removedElectronsFrom: '4s', configString: '[Ar] 3d⁶' }, { ionSymbol: 'Fe³⁺', charge: 3, removedElectronsFrom: '4s, 3d', configString: '[Ar] 3d⁵' }] },
  { z: 27, symbol: 'Co', name: 'Cobalt', category: 'Transition Metal', period: 4, group: '9', configString: '[Ar] 4s² 3d⁷', nobleCore: '[Ar]', valenceConfig: '4s² 3d⁷', isException: false, unpairedElectrons: 3, paramagnetic: true, exchangePairsCount: 34, ionConfigs: [{ ionSymbol: 'Co²⁺', charge: 2, removedElectronsFrom: '4s', configString: '[Ar] 3d⁷' }, { ionSymbol: 'Co³⁺', charge: 3, removedElectronsFrom: '4s, 3d', configString: '[Ar] 3d⁶' }] },
  { z: 28, symbol: 'Ni', name: 'Nickel', category: 'Transition Metal', period: 4, group: '10', configString: '[Ar] 4s² 3d⁸', nobleCore: '[Ar]', valenceConfig: '4s² 3d⁸', isException: false, unpairedElectrons: 2, paramagnetic: true, exchangePairsCount: 37, ionConfigs: [{ ionSymbol: 'Ni²⁺', charge: 2, removedElectronsFrom: '4s', configString: '[Ar] 3d⁸' }] },
  { z: 29, symbol: 'Cu', name: 'Copper', category: 'Transition Metal', period: 4, group: '11', configString: '[Ar] 4s¹ 3d¹⁰', nobleCore: '[Ar]', valenceConfig: '4s¹ 3d¹⁰', isException: true, exceptionReason: 'Extra stability of fully-filled 3d¹⁰ subshell + high exchange energy + symmetric charge distribution.', unpairedElectrons: 1, paramagnetic: true, exchangePairsCount: 41, ionConfigs: [{ ionSymbol: 'Cu⁺', charge: 1, removedElectronsFrom: '4s', configString: '[Ar] 3d¹⁰' }, { ionSymbol: 'Cu²⁺', charge: 2, removedElectronsFrom: '4s, 3d', configString: '[Ar] 3d⁹' }] },
  { z: 30, symbol: 'Zn', name: 'Zinc', category: 'Transition Metal', period: 4, group: '12', configString: '[Ar] 4s² 3d¹⁰', nobleCore: '[Ar]', valenceConfig: '4s² 3d¹⁰', isException: false, unpairedElectrons: 0, paramagnetic: false, exchangePairsCount: 42, ionConfigs: [{ ionSymbol: 'Zn²⁺', charge: 2, removedElectronsFrom: '4s', configString: '[Ar] 3d¹⁰' }] }
];

// ==========================================
// 22 PROGRESSIVE CHALLENGES (FOUNDATION, STANDARD, ADVANCED)
// ==========================================
const CHALLENGES: ChallengeItem[] = [
  // --- FOUNDATION (7) ---
  {
    id: 'ch_1',
    nodeId: NODE_021,
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'What are the four quantum numbers that completely specify the quantum state of an electron in an atom?',
    options: [
      'Principal (n), Azimuthal (l), Magnetic (m_l), Spin (m_s)',
      'Energy (E), Velocity (v), Mass (m), Charge (q)',
      'Radius (r), Angle (θ), Phase (ϕ), Frequency (ν)',
      'Shell (K), Subshell (p), Orbital (x), Spin (s)'
    ],
    correctIndex: 0,
    explanation: 'The quantum state of an electron is uniquely defined by n (shell energy), l (orbital shape), m_l (spatial orientation), and m_s (spin orientation ±1/2).',
    hints: [
      'Recall the four letters standard in ISC chemistry: n, l, m_l, m_s.',
      'One quantum number gives shell level, one gives shape, one gives orientation, one gives spin.',
      'Check choice A.'
    ]
  },
  {
    id: 'ch_2',
    nodeId: NODE_022,
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'Which subshell geometry corresponds to an azimuthal quantum number of l = 1?',
    options: [
      'Spherical (s orbital)',
      'Dumbbell-shaped (p orbital)',
      'Double dumbbell-shaped (d orbital)',
      'Complex rosette (f orbital)'
    ],
    correctIndex: 1,
    explanation: 'l = 0 corresponds to spherical s orbitals, l = 1 to dumbbell-shaped p orbitals, l = 2 to double-dumbbell d orbitals, and l = 3 to f orbitals.',
    hints: [
      'l=0 is s, l=1 is p, l=2 is d.',
      'p orbitals have two lobes separated by a nodal plane.',
      'Select dumbbell-shaped.'
    ]
  },
  {
    id: 'ch_3',
    nodeId: NODE_023,
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'Calculate the (n + l) value for 4s and 3d orbitals respectively.',
    options: [
      '4s: (4 + 0) = 4; 3d: (3 + 2) = 5',
      '4s: (4 + 1) = 5; 3d: (3 + 1) = 4',
      '4s: (4 + 0) = 4; 3d: (3 + 3) = 6',
      '4s: (4 + 2) = 6; 3d: (3 + 2) = 5'
    ],
    correctIndex: 0,
    explanation: 'For 4s: n = 4, l = 0, so (n + l) = 4. For 3d: n = 3, l = 2, so (n + l) = 5. Since 4 < 5, 4s has lower energy than 3d.',
    hints: [
      'Remember l values: s=0, p=1, d=2, f=3.',
      '4s has n=4, l=0 -> sum = 4.',
      '3d has n=3, l=2 -> sum = 5.'
    ]
  },
  {
    id: 'ch_4',
    nodeId: NODE_024,
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'What is the core statement of the Aufbau Principle?',
    options: [
      'Electrons occupy orbitals in increasing order of subshell energy level, filling lower energy orbitals first.',
      'No two electrons in an atom can have the same four quantum numbers.',
      'Electrons in degenerate orbitals pair up before filling empty orbitals.',
      'The total spin magnetic moment of an atom must equal zero.'
    ],
    correctIndex: 0,
    explanation: 'Aufbau (German for "building up") states that in the ground state of an atom, electrons fill orbitals of lowest energy first before filling higher energy levels.',
    hints: [
      'Aufbau means "building up".',
      'Lower energy subshells fill before higher energy subshells.',
      'Select choice A.'
    ]
  },
  {
    id: 'ch_5',
    nodeId: NODE_025,
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'Which of the following electron filling situations violates the Pauli Exclusion Principle?',
    options: [
      'Having two spin-up (↑↑) electrons in the same 1s orbital box',
      'Having one spin-up (↑) electron in 2p_x and one spin-up (↑) in 2p_y',
      'Filling 2s completely before filling 2p',
      'Leaving a 3d orbital empty while filling 4s'
    ],
    correctIndex: 0,
    explanation: 'If two electrons in the same orbital have parallel spins (↑↑), they would have identical set of all 4 quantum numbers (n, l, m_l, m_s), which violates Pauli Exclusion Principle.',
    hints: [
      'Pauli principle mandates opposite spins (↑↓) in a single orbital.',
      'Two upward arrows in one box gives identical quantum numbers.',
      'Choose option A.'
    ]
  },
  {
    id: 'ch_6',
    nodeId: NODE_026,
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'According to Hund\'s Rule of Maximum Multiplicity, how should 3 electrons occupy three degenerate 2p orbitals (2p_x, 2p_y, 2p_z)?',
    options: [
      'One electron in each orbital, all with parallel spins (↑ | ↑ | ↑)',
      'Two electrons paired in 2p_x (↑↓) and one in 2p_y (↑)',
      'Three electrons paired together in 2p_x',
      'One electron in each orbital with antiparallel spins (↑ | ↓ | ↑)'
    ],
    correctIndex: 0,
    explanation: 'Hund\'s rule requires degenerate orbitals to be singly filled with parallel spins before any orbital is doubly filled, maximizing total spin multiplicity (2S+1).',
    hints: [
      'Maximum multiplicity means maximizing total spin S.',
      'Keep electrons in separate boxes with parallel (same direction) spins.',
      'Select (↑ | ↑ | ↑).'
    ]
  },
  {
    id: 'ch_7',
    nodeId: NODE_027,
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'What is the ground state electronic configuration of Carbon (Z = 6)?',
    options: [
      '1s² 2s² 2p²',
      '1s² 2s¹ 2p³',
      '1s² 2p⁴',
      '1s³ 2s² 2p¹'
    ],
    correctIndex: 0,
    explanation: 'Carbon has Z = 6. Electrons fill 1s² (2 e⁻), 2s² (2 e⁻), and 2p² (2 e⁻).',
    hints: [
      'Total electron count = 6.',
      'Fill 1s (2), then 2s (2), remaining 2 go into 2p.',
      '1s² 2s² 2p².'
    ]
  },

  // --- STANDARD (8) ---
  {
    id: 'ch_8',
    nodeId: NODE_023,
    type: 'drag-order',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'Arrange the following subshells in increasing order of energy according to the (n + l) rule: 3d, 4s, 4p, 5s.',
    options: [
      '4s (n+l=4)',
      '3d (n+l=5, n=3)',
      '4p (n+l=5, n=4)',
      '5s (n+l=5, n=5)'
    ],
    correctIndex: 0, // Order checked dynamically in code
    explanation: '4s has (n+l)=4. For 3d, 4p, 5s, the sum (n+l) is 5 for all three! When (n+l) values are equal, the subshell with smaller principal quantum number n has lower energy: 3d (n=3) < 4p (n=4) < 5s (n=5). Order: 4s < 3d < 4p < 5s.',
    hints: [
      'Calculate (n+l) for each: 4s=4, 3d=5, 4p=5, 5s=5.',
      'If (n+l) is equal, smaller n comes first.',
      'Order: 4s, 3d, 4p, 5s.'
    ]
  },
  {
    id: 'ch_9',
    nodeId: NODE_027,
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'What is the complete ground state electronic configuration of Iron (Z = 26)?',
    options: [
      '1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d⁶',
      '1s² 2s² 2p⁶ 3s² 3p⁶ 4s⁰ 3d⁸',
      '1s² 2s² 2p⁶ 3s² 3p⁶ 4s¹ 3d⁷',
      '1s² 2s² 2p⁶ 3s² 3p⁶ 3d⁸'
    ],
    correctIndex: 0,
    explanation: 'Iron (Z=26) has 26 electrons: [Ar] core takes 18, 4s takes 2, and 3d takes 6: 1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d⁶.',
    hints: [
      'Argon [Ar] has 18 electrons.',
      'Next 2 electrons fill 4s.',
      'Remaining 6 electrons go into 3d.'
    ]
  },
  {
    id: 'ch_10',
    nodeId: NODE_028,
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'Why does Chromium (Z = 24) have an electronic configuration of [Ar] 4s¹ 3d⁵ instead of [Ar] 4s² 3d⁴?',
    options: [
      'Half-filled 3d⁵ subshell provides extra stability due to maximum exchange energy and spatial symmetry.',
      '4s orbital is completely removed by nuclear charge attraction.',
      '3d subshell has a lower principal quantum number than 4s so 4s electron decays.',
      'Pauli Exclusion Principle prevents 3d from having 4 electrons.'
    ],
    correctIndex: 0,
    explanation: 'Transferring 1 electron from 4s to 3d creates a half-filled 3d⁵ subshell. The number of parallel spin exchange pairs increases from 6 (in d⁴) to 10 (in d⁵), yielding extra quantum exchange energy stabilization.',
    hints: [
      'Think about exchange energy K = n(n-1)/2.',
      'd⁵ has 5 parallel spins -> 10 pairs of exchange.',
      'Half-filled subshells are exceptionally stable.'
    ]
  },
  {
    id: 'ch_11',
    nodeId: NODE_028,
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'What is the ground state electronic configuration of Copper (Z = 29)?',
    options: [
      '[Ar] 4s¹ 3d¹⁰',
      '[Ar] 4s² 3d⁹',
      '[Ar] 4s⁰ 3d¹¹',
      '[Ar] 4s² 3d⁸ 4p¹'
    ],
    correctIndex: 0,
    explanation: 'Copper (Z=29) adopts [Ar] 4s¹ 3d¹⁰ to achieve a completely filled 3d¹⁰ subshell, which provides maximum exchange energy and spherical charge symmetry.',
    hints: [
      'Copper is an exception like Chromium.',
      'It shifts one electron from 4s to complete the 3d subshell.',
      'Look for 4s¹ 3d¹⁰.'
    ]
  },
  {
    id: 'ch_12',
    nodeId: NODE_029,
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'When neutral Iron (Fe: [Ar] 4s² 3d⁶) loses two electrons to form the Fe²⁺ ion, what is the electronic configuration of Fe²⁺?',
    options: [
      '[Ar] 3d⁶',
      '[Ar] 4s² 3d⁴',
      '[Ar] 4s¹ 3d⁵',
      '[Ar] 4s² 3d⁶'
    ],
    correctIndex: 0,
    explanation: 'During cation formation in transition metals, electrons are lost FIRST from the outermost shell (n=4, 4s). Thus, removing two electrons from [Ar] 4s² 3d⁶ gives [Ar] 3d⁶.',
    hints: [
      'Outer shell n=4 (4s) electrons are removed before n=3 (3d).',
      'Remove 2 electrons from 4s².',
      'Result is [Ar] 3d⁶.'
    ]
  },
  {
    id: 'ch_13',
    nodeId: NODE_029,
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'What is the ground state electronic configuration of the Cu⁺ (Cuprous) ion?',
    options: [
      '[Ar] 3d¹⁰',
      '[Ar] 4s¹ 3d⁹',
      '[Ar] 4s² 3d⁸',
      '[Ar] 3d⁹ 4s¹'
    ],
    correctIndex: 0,
    explanation: 'Neutral Cu is [Ar] 4s¹ 3d¹⁰. Forming Cu⁺ involves losing the single 4s electron, leaving a stable closed-subshell [Ar] 3d¹⁰ configuration.',
    hints: [
      'Neutral Cu is [Ar] 4s¹ 3d¹⁰.',
      'Lose 1 electron from 4s.',
      'Result: [Ar] 3d¹⁰.'
    ]
  },
  {
    id: 'ch_14',
    nodeId: NODE_030,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'Calculate the total number of exchange interactions among parallel spin electrons in a 3d⁵ subshell.',
    correctAnswer: 10,
    explanation: 'For n = 5 electrons with parallel spins, the number of exchange combinations is n(n - 1) / 2 = 5(4) / 2 = 10 interactions.',
    hints: [
      'Use the combination formula: n(n-1)/2.',
      'Here n = 5 (five parallel spin electrons).',
      '5 × 4 / 2 = 10.'
    ]
  },
  {
    id: 'ch_15',
    nodeId: NODE_026,
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'Calculate the spin-only magnetic moment (μ_s) for a Mn²⁺ ion (Z = 25). Formula: μ_s = √(n(n + 2)) Bohr Magnetons (BM).',
    options: [
      '5.92 BM',
      '4.90 BM',
      '3.87 BM',
      '2.83 BM'
    ],
    correctIndex: 0,
    explanation: 'Mn²⁺ has electronic configuration [Ar] 3d⁵. Number of unpaired electrons n = 5. μ_s = √(5(5 + 2)) = √35 ≈ 5.916 BM ≈ 5.92 BM.',
    hints: [
      'Mn²⁺ has 5 unpaired d electrons (n = 5).',
      'μ = √(5 × 7) = √35.',
      '√35 ≈ 5.92 BM.'
    ]
  },

  // --- ADVANCED (7) ---
  {
    id: 'ch_16',
    nodeId: NODE_030,
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'Evaluate the exchange energy difference between hypothetical 4s² 3d⁴ Cr and ground-state 4s¹ 3d⁵ Cr. How many extra exchange pairs are formed in the d subshell?',
    options: [
      '4 extra exchange pairs (from 6 in d⁴ to 10 in d⁵)',
      '2 extra exchange pairs',
      '5 extra exchange pairs',
      '1 extra exchange pair'
    ],
    correctIndex: 0,
    explanation: 'In 3d⁴, number of parallel pairs = 4(3)/2 = 6. In 3d⁵, number of parallel pairs = 5(4)/2 = 10. The increase is 10 - 6 = 4 exchange pairs, providing sufficient stabilization to overcome 4s->3d promotion energy.',
    hints: [
      'Calculate exchange pairs for d⁴: 4×3/2 = 6.',
      'Calculate exchange pairs for d⁵: 5×4/2 = 10.',
      'Difference = 10 - 6 = 4.'
    ]
  },
  {
    id: 'ch_17',
    nodeId: NODE_029,
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'Consider Titanium (Ti, Z = 22: [Ar] 4s² 3d²). What is the correct sequence of ionization to form Ti⁴⁺?',
    options: [
      'Remove two 4s electrons first to form Ti²⁺ ([Ar] 3d²), then two 3d electrons to form Ti⁴⁺ ([Ar])',
      'Remove two 3d electrons first to form Ti²⁺ ([Ar] 4s²), then two 4s electrons',
      'Remove one 4s and one 3d electron simultaneously for each ionization step',
      'Remove 3p core electrons before 4s'
    ],
    correctIndex: 0,
    explanation: 'For transition metals, outer 4s electrons experience lower effective attraction after 3d is populated due to shielding. Thus 4s electrons are ionized first (forming Ti²⁺), followed by removal of 3d electrons (forming Ti³⁺ and Ti⁴⁺).',
    hints: [
      'Outer principal quantum number n=4 is ionized before n=3.',
      'First step: Ti -> Ti²⁺ + 2e⁻ (removes 4s²).',
      'Second step: Ti²⁺ -> Ti⁴⁺ + 2e⁻ (removes 3d²).'
    ]
  },
  {
    id: 'ch_18',
    nodeId: NODE_021,
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'Which set of quantum numbers (n, l, m_l, m_s) is IMPOSSIBLE for an electron in an atom?',
    options: [
      'n = 3, l = 3, m_l = -2, m_s = +1/2',
      'n = 4, l = 2, m_l = -1, m_s = -1/2',
      'n = 2, l = 1, m_l = 0, m_s = +1/2',
      'n = 1, l = 0, m_l = 0, m_s = -1/2'
    ],
    correctIndex: 0,
    explanation: 'Azimuthal quantum number l can only range from 0 to (n - 1). For n = 3, the maximum value of l is 2 (3d subshell). l = 3 is forbidden for n = 3!',
    hints: [
      'Constraint rule: l must be strictly less than n (0 ≤ l ≤ n-1).',
      'Look at n=3, l=3 in option A.',
      'l cannot equal n.'
    ]
  },
  {
    id: 'ch_19',
    nodeId: NODE_023,
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'The subshells 4d, 5p, 6s, and 4f are given. Which subshell has the HIGHEST energy according to the (n + l) rule?',
    options: [
      '4f (n+l = 4 + 3 = 7, n=4)',
      '6s (n+l = 6 + 0 = 6)',
      '5p (n+l = 5 + 1 = 6)',
      '4d (n+l = 4 + 2 = 6)'
    ],
    correctIndex: 0,
    explanation: 'Let us calculate (n+l): 4d -> 4+2=6; 5p -> 5+1=6; 6s -> 6+0=6; 4f -> 4+3=7. 4f has the highest sum (n+l=7), giving it the highest energy among these choices.',
    hints: [
      'Calculate (n+l) for each subshell.',
      '4d: 4+2=6; 5p: 5+1=6; 6s: 6+0=6; 4f: 4+3=7.',
      'Highest (n+l) sum is 7 (4f).'
    ]
  },
  {
    id: 'ch_20',
    nodeId: NODE_027,
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Analysis',
    question: 'Nickel (Ni, Z = 28) forms a Ni²⁺ cation. What is the electronic configuration and magnetic property of Ni²⁺?',
    options: [
      '[Ar] 3d⁸, Paramagnetic with 2 unpaired electrons',
      '[Ar] 4s² 3d⁶, Diamagnetic',
      '[Ar] 4s¹ 3d⁷, Paramagnetic with 3 unpaired electrons',
      '[Ar] 3d⁸, Diamagnetic with 0 unpaired electrons'
    ],
    correctIndex: 0,
    explanation: 'Ni is [Ar] 4s² 3d⁸. Losing two 4s electrons yields Ni²⁺: [Ar] 3d⁸. In 3d⁸, 5 electrons occupy 5 orbitals spin-up, and 3 electrons pair up spin-down, leaving 2 unpaired electrons (n=2, paramagnetic).',
    hints: [
      'Ni²⁺ is formed by removing 4s² electrons.',
      '3d⁸ orbital filling: 3 filled pairs (6 e⁻) + 2 single electrons (2 e⁻).',
      '2 unpaired electrons = paramagnetic.'
    ]
  },
  {
    id: 'ch_21',
    nodeId: NODE_028,
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Synthesis',
    question: 'Molybdenum (Mo, Z = 42) is directly below Chromium in Group 6 of the Periodic Table. Predict its ground state electronic configuration.',
    options: [
      '[Kr] 5s¹ 4d⁵',
      '[Kr] 5s² 4d⁴',
      '[Kr] 5s⁰ 4d⁶',
      '[Kr] 4d⁶ 5s⁰'
    ],
    correctIndex: 0,
    explanation: 'Like Chromium (4s¹ 3d⁵), Molybdenum (Z=42) exhibits anomalous subshell filling to achieve half-filled d⁵ stability: [Kr] 5s¹ 4d⁵.',
    hints: [
      'Elements in the same periodic group exhibit homologous anomaly patterns.',
      'Chromium is [Ar] 4s¹ 3d⁵.',
      'Molybdenum (n=5) will be [Kr] 5s¹ 4d⁵.'
    ]
  },
  {
    id: 'ch_22',
    nodeId: NODE_030,
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Synthesis',
    question: 'Why are Zinc (Zn, Z=30), Cadmium (Cd, Z=48), and Mercury (Hg, Z=80) often considered non-typical transition metals with low melting points?',
    options: [
      'They have completely filled (n-1)d¹⁰ and ns² subshells in both neutral and ionic states, lacking unpaired d electrons for metallic d-d bonding and exchange enhancement.',
      'Their 4s orbitals are empty in ground state.',
      'They violate Pauli Exclusion Principle.',
      'Their d orbitals are completely absent.'
    ],
    correctIndex: 0,
    explanation: 'Zn ([Ar] 4s² 3d¹⁰), Cd ([Kr] 5s² 4d¹⁰), and Hg ([Xe] 6s² 4f¹⁴ 5d¹⁰) have closed d¹⁰ subshells. Without unpaired d electrons, delocalized d-band bonding is minimal, resulting in lower cohesion, soft metal properties, and low melting points.',
    hints: [
      'Check d-orbital filling: d¹⁰ is fully filled.',
      'Fully filled shells lack unpaired electrons for d-d metallic bonding.',
      'Select option A.'
    ]
  }
];

// ==========================================
// CUSTOM SVG DIAGRAM COMPONENTS
// ==========================================

// Diagram 1: Aufbau Energy Ladder Diagram (Interactive / SVG Visualizer)
const AufbauEnergyDiagramSVG: React.FC<{
  currentStepSubshell?: string;
  electronCounts: Record<string, number>;
  onSelectSubshell?: (subshellId: string) => void;
}> = ({ currentStepSubshell, electronCounts, onSelectSubshell }) => {
  // Subshell ladder vertical positions
  const ladderData = [
    { id: '1s', nL: '1+0=1', y: 340, x: 80, cap: 2 },
    { id: '2s', nL: '2+0=2', y: 300, x: 130, cap: 2 },
    { id: '2p', nL: '2+1=3', y: 260, x: 180, cap: 6 },
    { id: '3s', nL: '3+0=3', y: 220, x: 230, cap: 2 },
    { id: '3p', nL: '3+1=4', y: 180, x: 280, cap: 6 },
    { id: '4s', nL: '4+0=4', y: 140, x: 330, cap: 2 },
    { id: '3d', nL: '3+2=5', y: 100, x: 380, cap: 10 },
    { id: '4p', nL: '4+1=5', y: 60, x: 430, cap: 6 }
  ];

  return (
    <svg viewBox="0 0 520 380" className="w-full h-auto bg-slate-900 rounded-xl shadow-inner border border-slate-700">
      <defs>
        <linearGradient id="energyGrad" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#ef4444" stopOpacity="0.8" />
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Background Energy Axis */}
      <line x1="40" y1="360" x2="40" y2="30" stroke="#64748b" strokeWidth="3" strokeDasharray="4 4" />
      <polygon points="40,20 34,35 46,35" fill="#ef4444" />
      <text x="20" y="200" fill="#94a3b8" fontSize="12" fontWeight="bold" transform="rotate(-90 25 200)">
        INCREASING ORBITAL ENERGY (n + l)
      </text>

      {/* Guide lines & diagonal Aufbau flow */}
      <path
        d="M 80,340 L 130,300 L 180,260 L 230,220 L 280,180 L 330,140 L 380,100 L 430,60"
        fill="none"
        stroke="#38bdf8"
        strokeWidth="2"
        strokeDasharray="3 3"
        opacity="0.6"
      />

      {/* Render Subshell Nodes */}
      {ladderData.map((item) => {
        const count = electronCounts[item.id] || 0;
        const isFull = count === item.cap;
        const isActive = currentStepSubshell === item.id;

        return (
          <g
            key={item.id}
            className="cursor-pointer transition-transform duration-200 hover:scale-105"
            onClick={() => onSelectSubshell && onSelectSubshell(item.id)}
          >
            {/* Box container */}
            <rect
              x={item.x - 30}
              y={item.y - 18}
              width="65"
              height="36"
              rx="6"
              fill={isActive ? '#1e293b' : isFull ? '#064e3b' : '#0f172a'}
              stroke={isActive ? '#38bdf8' : isFull ? '#10b981' : '#475569'}
              strokeWidth={isActive ? '3' : '1.5'}
              filter={isActive ? 'url(#glow)' : undefined}
            />
            {/* Label */}
            <text x={item.x} y={item.y - 2} fill="#f8fafc" fontSize="14" fontWeight="bold" textAnchor="middle">
              {item.id}
            </text>
            <text x={item.x} y={item.y + 12} fill="#94a3b8" fontSize="9" textAnchor="middle">
              {count}/{item.cap} e⁻ | {item.nL}
            </text>
            {/* Occupancy Indicator Bar */}
            <rect
              x={item.x - 26}
              y={item.y + 14}
              width={(count / item.cap) * 56}
              height="3"
              fill={isFull ? '#10b981' : '#38bdf8'}
              rx="1.5"
            />
          </g>
        );
      })}

      {/* Legend & Energy Rule Card */}
      <rect x="290" y="270" width="210" height="90" rx="8" fill="#1e293b" stroke="#334155" />
      <text x="300" y="290" fill="#f8fafc" fontSize="11" fontWeight="bold">Bohr-Sommerfeld (n + l) Rule:</text>
      <text x="300" y="310" fill="#cbd5e1" fontSize="10">1. Lower (n + l) = Lower Energy</text>
      <text x="300" y="325" fill="#cbd5e1" fontSize="10">2. If (n + l) equal, smaller n fills 1st</text>
      <text x="300" y="345" fill="#38bdf8" fontSize="10" fontWeight="bold">e.g. 4s (4+0=4) fills before 3d (3+2=5)</text>
    </svg>
  );
};

// Diagram 2: Exchange Energy & Spin Combinations Visualizer SVG
const ExchangeEnergyDiagramSVG: React.FC<{
  numUnpaired: number;
  subshellName: string;
}> = ({ numUnpaired, subshellName }) => {
  const numPairs = (numUnpaired * (numUnpaired - 1)) / 2;

  // Render electron nodes in a row
  const nodeSpacing = 45;
  const startX = 60;
  const yPos = 80;

  const nodes = Array.from({ length: numUnpaired }, (_, i) => ({
    id: i,
    x: startX + i * nodeSpacing,
    y: yPos
  }));

  // Generate pair arcs
  const arcs: { id1: number; id2: number; x1: number; x2: number; h: number }[] = [];
  for (let i = 0; i < numUnpaired; i++) {
    for (let j = i + 1; j < numUnpaired; j++) {
      const distance = j - i;
      arcs.push({
        id1: i,
        id2: j,
        x1: startX + i * nodeSpacing,
        x2: startX + j * nodeSpacing,
        h: 25 + distance * 18
      });
    }
  }

  return (
    <svg viewBox="0 0 420 230" className="w-full h-auto bg-slate-900 rounded-xl border border-slate-700 p-2">
      <text x="210" y="22" fill="#f8fafc" fontSize="13" fontWeight="bold" textAnchor="middle">
        Exchange Energy Interaction Calculator ({subshellName})
      </text>

      {/* Arcs representing quantum exchange pairs */}
      {arcs.map((arc, index) => {
        const midX = (arc.x1 + arc.x2) / 2;
        const arcY = arc.h;
        return (
          <path
            key={index}
            d={`M ${arc.x1} ${yPos - 12} Q ${midX} ${yPos - 12 - arcY} ${arc.x2} ${yPos - 12}`}
            fill="none"
            stroke={`hsl(${(index * 36) % 360}, 80%, 60%)`}
            strokeWidth="2"
            strokeDasharray="4 2"
            opacity="0.85"
          />
        );
      })}

      {/* Electron Spin Arrows */}
      {nodes.map((node) => (
        <g key={node.id}>
          <circle cx={node.x} cy={node.y} r="14" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2" />
          <path d={`M ${node.x} ${node.y + 6} L ${node.x} ${node.y - 6} M ${node.x - 3} ${node.y - 3} L ${node.x} ${node.y - 6} L ${node.x + 3} ${node.y - 3}`} stroke="#ffffff" strokeWidth="2" fill="none" />
          <text x={node.x} y={node.y + 26} fill="#94a3b8" fontSize="9" textAnchor="middle">
            e⁻ {node.id + 1}
          </text>
        </g>
      ))}

      {/* Formula & Calculation Result Card */}
      <rect x="20" y="150" width="380" height="65" rx="8" fill="#1e293b" stroke="#475569" />
      <text x="35" y="172" fill="#cbd5e1" fontSize="11" fontWeight="bold">
        Formula: K = n(n - 1) / 2 = {numUnpaired}({numUnpaired} - 1) / 2
      </text>
      <text x="35" y="195" fill="#38bdf8" fontSize="14" fontWeight="bold">
        Total Exchange Pairs = {numPairs} pair{numPairs !== 1 ? 's' : ''} (Exchange Stabilization = -{numPairs} K)
      </text>
    </svg>
  );
};

// Diagram 3: Transition Metal Ionization Process Diagram SVG
const IonizationTransitionSVG: React.FC<{
  elementSymbol: string;
  ionSymbol: string;
  neutralConfig: string;
  ionConfig: string;
  removedShell: string;
}> = ({ elementSymbol, ionSymbol, neutralConfig, ionConfig, removedShell }) => {
  return (
    <svg viewBox="0 0 460 220" className="w-full h-auto bg-slate-900 rounded-xl border border-slate-700 p-2">
      <text x="230" y="24" fill="#f8fafc" fontSize="13" fontWeight="bold" textAnchor="middle">
        Transition Metal Ionization & Shielding Effect
      </text>

      {/* Neutral Atom Box */}
      <rect x="20" y="55" width="180" height="120" rx="10" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
      <text x="110" y="80" fill="#38bdf8" fontSize="16" fontWeight="bold" textAnchor="middle">
        Neutral Atom ({elementSymbol})
      </text>
      <text x="110" y="105" fill="#e2e8f0" fontSize="11" textAnchor="middle">
        Config: {neutralConfig}
      </text>
      <text x="110" y="135" fill="#94a3b8" fontSize="10" textAnchor="middle">
        Outer 4s electrons shielded
      </text>
      <text x="110" y="150" fill="#94a3b8" fontSize="10" textAnchor="middle">
        by 3d density
      </text>

      {/* Transition Arrow with -e⁻ label */}
      <path d="M 210,115 L 250,115" stroke="#ef4444" strokeWidth="3" markerEnd="url(#arrowhead)" />
      <circle cx="230" cy="100" r="14" fill="#ef4444" />
      <text x="230" y="104" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">
        -e⁻
      </text>
      <text x="230" y="145" fill="#f87171" fontSize="9" fontWeight="bold" textAnchor="middle">
        Lost from {removedShell}!
      </text>

      {/* Cation Box */}
      <rect x="260" y="55" width="180" height="120" rx="10" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
      <text x="350" y="80" fill="#34d399" fontSize="16" fontWeight="bold" textAnchor="middle">
        Cation ({ionSymbol})
      </text>
      <text x="350" y="105" fill="#e2e8f0" fontSize="11" textAnchor="middle">
        Config: {ionConfig}
      </text>
      <text x="350" y="135" fill="#10b981" fontSize="10" fontWeight="bold" textAnchor="middle">
        4s removed BEFORE 3d!
      </text>
      <text x="350" y="152" fill="#94a3b8" fontSize="9" textAnchor="middle">
        Higher effective Z* for 3d
      </text>

      <rect x="20" y="185" width="420" height="25" rx="4" fill="#0f172a" />
      <text x="230" y="202" fill="#fcd34d" fontSize="10" textAnchor="middle" fontWeight="bold">
        Rule: Outer shell n=4 (4s) electrons are lost FIRST upon ionization, NOT 3d!
      </text>
    </svg>
  );
};

// ==========================================
// 3D/2D ORBITAL PROBABILITY CANVAS SIMULATOR
// ==========================================
const Orbital3DShapeCanvas: React.FC<{
  orbitalType: '1s' | '2s' | '2p' | '3d';
}> = ({ orbitalType }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let angle = 0;

    // Generate probability density cloud points
    const points: { x: number; y: number; z: number; color: string }[] = [];
    const numPoints = 1200;

    for (let i = 0; i < numPoints; i++) {
      let x = 0, y = 0, z = 0;
      let col = '#38bdf8';

      if (orbitalType === '1s') {
        const r = Math.pow(Math.random(), 2) * 60;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        x = r * Math.sin(phi) * Math.cos(theta);
        y = r * Math.sin(phi) * Math.sin(theta);
        z = r * Math.cos(phi);
        col = '#38bdf8';
      } else if (orbitalType === '2s') {
        const isInner = Math.random() > 0.6;
        const r = isInner ? Math.random() * 25 : 45 + Math.random() * 35;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        x = r * Math.sin(phi) * Math.cos(theta);
        y = r * Math.sin(phi) * Math.sin(theta);
        z = r * Math.cos(phi);
        col = isInner ? '#60a5fa' : '#818cf8';
      } else if (orbitalType === '2p') {
        // Dumbbell along z-axis
        const lobe = Math.random() > 0.5 ? 1 : -1;
        const r = Math.pow(Math.random(), 1.5) * 75;
        const theta = Math.random() * Math.PI * 0.5;
        z = lobe * (20 + r * Math.cos(theta));
        x = r * Math.sin(theta) * Math.cos(Math.random() * Math.PI * 2) * 0.4;
        y = r * Math.sin(theta) * Math.sin(Math.random() * Math.PI * 2) * 0.4;
        col = lobe > 0 ? '#ef4444' : '#3b82f6';
      } else if (orbitalType === '3d') {
        // Double dumbbell / d_xy cloverleaf pattern
        const quadrant = Math.floor(Math.random() * 4);
        const r = Math.pow(Math.random(), 1.5) * 80;
        const angleQ = (quadrant * Math.PI / 2) + (Math.random() - 0.5) * 0.7;
        x = r * Math.cos(angleQ);
        y = r * Math.sin(angleQ);
        z = (Math.random() - 0.5) * 25;
        col = quadrant % 2 === 0 ? '#10b981' : '#f59e0b';
      }

      points.push({ x, y, z, color: col });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      angle += 0.015;

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Draw nucleus
      ctx.beginPath();
      ctx.arc(cx, cy, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#f8fafc';
      ctx.fill();

      // Project & Render 3D points
      points.forEach((pt) => {
        // Rotate around Y axis
        const rx = pt.x * Math.cos(angle) + pt.z * Math.sin(angle);
        const ry = pt.y;
        const rz = -pt.x * Math.sin(angle) + pt.z * Math.cos(angle);

        const scale = 250 / (250 + rz);
        const px = cx + rx * scale;
        const py = cy + ry * scale;
        const alpha = Math.max(0.1, Math.min(1, (rz + 100) / 200));

        ctx.beginPath();
        ctx.arc(px, py, 1.8 * scale, 0, Math.PI * 2);
        ctx.fillStyle = pt.color;
        ctx.globalAlpha = alpha;
        ctx.fill();
      });

      ctx.globalAlpha = 1.0;

      // Label
      ctx.fillStyle = '#cbd5e1';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText(`Geometry: ${orbitalType.toUpperCase()} Orbital Cloud`, 12, 22);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [orbitalType]);

  return (
    <div className="relative border border-slate-700 rounded-xl overflow-hidden bg-slate-950 shadow-inner">
      <canvas ref={canvasRef} width={420} height={260} className="w-full h-auto block" />
      <div className="absolute bottom-2 right-2 bg-slate-900/80 px-2.5 py-1 rounded text-xs text-slate-300 border border-slate-700">
        3D Quantum Probability Density
      </div>
    </div>
  );
};

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function C11_ChemistryAufbauPauliandHundsrulesSim({
  onComplete,
}: {
  onComplete?: (score: number) => void;
}) {
  // --- STATE MANAGEMENT ---
  const [activeTab, setActiveTab] = useState<'discovery' | 'lab' | 'challenges' | 'summary'>('discovery');
  const [activeLabStep, setActiveLabStep] = useState<number>(0);
  const [selectedZ, setSelectedZ] = useState<number>(1); // Default H (Z=1)

  // Interactive Orbital Box Filler State
  const [userOrbitals, setUserOrbitals] = useState<Record<string, ('up' | 'down')[]>>({
    '1s_0': [],
    '2s_0': [],
    '2p_0': [], '2p_1': [], '2p_2': [],
    '3s_0': [],
    '3p_0': [], '3p_1': [], '3p_2': [],
    '4s_0': [],
    '3d_0': [], '3d_1': [], '3d_2': [], '3d_3': [], '3d_4': []
  });

  // Orbital canvas view state
  const [selectedCanvasOrbital, setSelectedCanvasOrbital] = useState<'1s' | '2s' | '2p' | '3d'>('2p');

  // Interactive ion step state for Lab 5
  const [ionIonizationLevel, setIonIonizationLevel] = useState<number>(0); // 0 = Neutral Fe, 1 = Fe+, 2 = Fe2+, 3 = Fe3+

  // Discovery & Prediction selection states
  const [discoveryUserAnswer, setDiscoveryUserAnswer] = useState<number | null>(null);
  const [predictionAnswers, setPredictionAnswers] = useState<Record<number, number | null>>({});
  const [observationAnswers, setObservationAnswers] = useState<Record<number, number | null>>({});

  // Challenge Mode States
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState<number>(0);
  const [challengeAnswers, setChallengeAnswers] = useState<Record<string, number | string>>( {});
  const [challengeStatus, setChallengeStatus] = useState<Record<string, 'unanswered' | 'correct' | 'incorrect'>>({});
  const [challengeTierFilter, setChallengeTierFilter] = useState<'all' | 'foundation' | 'standard' | 'advanced'>('all');
  const [dragSortedItems, setDragSortedItems] = useState<string[]>([]);

  // Simulation metrics & Mastery tracking
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [bktMap, setBktMap] = useState<Record<string, ReturnType<typeof createBKTState>>>(() => {
    const map: Record<string, ReturnType<typeof createBKTState>> = {};
    ALL_NODE_IDS.forEach((id) => {
      map[id] = createBKTState(id);
    });
    return map;
  });

  const [srsMap, setSrsMap] = useState<Record<string, ReturnType<typeof createReviewItem>>>(() => {
    const map: Record<string, ReturnType<typeof createReviewItem>> = {};
    ALL_NODE_IDS.forEach((id) => {
      map[id] = createReviewItem(id);
    });
    return map;
  });

  // UI Feedback states
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [sparklePos, setSparklePos] = useState<{ x: number; y: number }>({ x: 400, y: 300 });
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHint, setCurrentHint] = useState<string>('');

  // Auto hint timer ref
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Active element metadata memo
  const currentElement = useMemo(() => {
    return ELEMENTS_DATA.find((e) => e.z === selectedZ) || ELEMENTS_DATA[0];
  }, [selectedZ]);

  // Reset inactivity timer for hint bubble
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    setShowHint(false);
    inactivityTimerRef.current = setTimeout(() => {
      if (activeTab === 'challenges') {
        const ch = CHALLENGES[currentChallengeIndex];
        if (ch && ch.hints && ch.hints.length > 0) {
          setCurrentHint(`Hint: ${ch.hints[0]}`);
          setShowHint(true);
          audioManager.play('hint');
        }
      }
    }, 10000);
  }, [activeTab, currentChallengeIndex]);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [resetInactivityTimer, activeTab, currentChallengeIndex]);

  // Initialize drag sorted items for current challenge if drag-order type
  useEffect(() => {
    const ch = CHALLENGES[currentChallengeIndex];
    if (ch && ch.type === 'drag-order' && ch.options) {
      setDragSortedItems([...ch.options].sort(() => Math.random() - 0.5));
    }
  }, [currentChallengeIndex]);

  // Auto-fill orbitals according to selected element ground-state
  const fillOrbitalsForZ = useCallback((zVal: number) => {
    const elem = ELEMENTS_DATA.find((e) => e.z === zVal);
    if (!elem) return;

    const newOrbitals: Record<string, ('up' | 'down')[]> = {
      '1s_0': [], '2s_0': [],
      '2p_0': [], '2p_1': [], '2p_2': [],
      '3s_0': [],
      '3p_0': [], '3p_1': [], '3p_2': [],
      '4s_0': [],
      '3d_0': [], '3d_1': [], '3d_2': [], '3d_3': [], '3d_4': []
    };

    let remaining = zVal;

    // Helper to fill subshell
    const fillSub = (subId: string, count: number, capPerOrbital: number = 2) => {
      const numOrbs = subId === '1s' || subId === '2s' || subId === '3s' || subId === '4s' ? 1 : subId.includes('p') ? 3 : 5;
      let eToAdd = Math.min(remaining, count);
      remaining -= eToAdd;

      // Handle Hund's rule order: single filling spin-up first across all orbitals
      if (numOrbs === 1) {
        if (eToAdd >= 1) newOrbitals[`${subId}_0`].push('up');
        if (eToAdd >= 2) newOrbitals[`${subId}_0`].push('down');
      } else {
        // Step 1: Add up arrows
        for (let i = 0; i < numOrbs && eToAdd > 0; i++) {
          newOrbitals[`${subId}_${i}`].push('up');
          eToAdd--;
        }
        // Step 2: Add down arrows
        for (let i = 0; i < numOrbs && eToAdd > 0; i++) {
          newOrbitals[`${subId}_${i}`].push('down');
          eToAdd--;
        }
      }
    };

    // Specific filling sequence accounting for exceptions (Cr Z=24, Cu Z=29)
    if (zVal === 24) {
      // Chromium: 1s2 2s2 2p6 3s2 3p6 4s1 3d5
      fillSub('1s', 2); fillSub('2s', 2); fillSub('2p', 6);
      fillSub('3s', 2); fillSub('3p', 6);
      newOrbitals['4s_0'] = ['up'];
      newOrbitals['3d_0'] = ['up']; newOrbitals['3d_1'] = ['up'];
      newOrbitals['3d_2'] = ['up']; newOrbitals['3d_3'] = ['up'];
      newOrbitals['3d_4'] = ['up'];
    } else if (zVal === 29) {
      // Copper: 1s2 2s2 2p6 3s2 3p6 4s1 3d10
      fillSub('1s', 2); fillSub('2s', 2); fillSub('2p', 6);
      fillSub('3s', 2); fillSub('3p', 6);
      newOrbitals['4s_0'] = ['up'];
      for (let i = 0; i < 5; i++) {
        newOrbitals[`3d_${i}`] = ['up', 'down'];
      }
    } else {
      // Standard Aufbau sequence
      fillSub('1s', 2);
      if (remaining > 0) fillSub('2s', 2);
      if (remaining > 0) fillSub('2p', 6);
      if (remaining > 0) fillSub('3s', 2);
      if (remaining > 0) fillSub('3p', 6);
      if (remaining > 0) fillSub('4s', 2);
      if (remaining > 0) fillSub('3d', 10);
    }

    setUserOrbitals(newOrbitals);
  }, []);

  // Update orbitals when selected element changes
  useEffect(() => {
    fillOrbitalsForZ(selectedZ);
  }, [selectedZ, fillOrbitalsForZ]);

  // Calculate current subshell electron totals from userOrbitals
  const currentSubshellTotals = useMemo(() => {
    const totals: Record<string, number> = {
      '1s': 0, '2s': 0, '2p': 0, '3s': 0, '3p': 0, '4s': 0, '3d': 0, '4p': 0
    };
    Object.entries(userOrbitals).forEach(([key, val]) => {
      const subId = key.split('_')[0];
      totals[subId] = (totals[subId] || 0) + val.length;
    });
    return totals;
  }, [userOrbitals]);

  // Rule Compliance Validator
  const ruleValidation = useMemo(() => {
    let pauliViolation = false;
    let hundViolation = false;
    let aufbauViolation = false;

    // 1. Check Pauli (no box with >2 e⁻ or 2 identical spins)
    Object.values(userOrbitals).forEach((eList) => {
      if (eList.length > 2) pauliViolation = true;
      if (eList.length === 2 && eList[0] === eList[1]) pauliViolation = true;
    });

    // 2. Check Hund's rule for p and d subshells
    ['2p', '3p', '3d'].forEach((sub) => {
      const orbKeys = Object.keys(userOrbitals).filter((k) => k.startsWith(sub));
      const counts = orbKeys.map((k) => userOrbitals[k].length);
      const spins = orbKeys.map((k) => userOrbitals[k]);

      // If any box is doubly occupied before all boxes have at least 1 electron
      const hasEmpty = counts.some((c) => c === 0);
      const hasDouble = counts.some((c) => c === 2);
      if (hasEmpty && hasDouble) hundViolation = true;

      // Check if singly occupied orbitals have mixed/anti-parallel spins
      const singleSpins = spins.filter((s) => s.length === 1).map((s) => s[0]);
      if (singleSpins.length > 1) {
        const firstSpin = singleSpins[0];
        if (singleSpins.some((sp) => sp !== firstSpin)) hundViolation = true;
      }
    });

    // 3. Check Aufbau (if higher energy orbital populated while lower energy orbital is not full)
    let unfilledLowerFound = false;
    for (let i = 0; i < SUBSHELLS.length; i++) {
      const sub = SUBSHELLS[i];
      const count = currentSubshellTotals[sub.id] || 0;
      if (count < sub.capacity) {
        unfilledLowerFound = true;
      } else if (unfilledLowerFound && count > 0) {
        // Exception check for Cr (Z=24) and Cu (Z=29) ground states
        if (!(selectedZ === 24 || selectedZ === 29)) {
          aufbauViolation = true;
        }
      }
    }

    return { pauliViolation, hundViolation, aufbauViolation };
  }, [userOrbitals, currentSubshellTotals, selectedZ]);

  // Orbital box click toggle (Add up -> Add down -> Clear)
  const handleOrbitalBoxClick = (slotKey: string) => {
    audioManager.play('tap');
    resetInactivityTimer();

    setUserOrbitals((prev) => {
      const current = prev[slotKey] || [];
      let updated: ('up' | 'down')[] = [];

      if (current.length === 0) {
        updated = ['up'];
      } else if (current.length === 1) {
        if (current[0] === 'up') updated = ['up', 'down'];
        else updated = [];
      } else {
        updated = [];
      }

      return { ...prev, [slotKey]: updated };
    });
  };

  // Helper BKT update
  const handleBKTUpdate = (nodeId: string, isCorrect: boolean) => {
    setBktMap((prev) => {
      const currentState = prev[nodeId] || createBKTState(nodeId);
      const updated = bktUpdate(currentState, isCorrect);
      return { ...prev, [nodeId]: updated };
    });

    setSrsMap((prev) => {
      const currentSRS = prev[nodeId] || createReviewItem(nodeId);
      const quality = isCorrect ? 5 : 2;
      const updated = sm2Update(currentSRS, quality);
      return { ...prev, [nodeId]: updated };
    });
  };

  // Discovery Question Answer Handler
  const handleDiscoveryAnswer = (idx: number) => {
    setDiscoveryUserAnswer(idx);
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    handleBKTUpdate(NODE_028, isCorrect);

    if (isCorrect) {
      audioManager.play('celebration');
      speechManager.speak('Correct! Half-filled d5 subshell maximizes quantum exchange energy and distribution symmetry.');
      setShowSparkle(true);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    } else {
      audioManager.play('error');
      speechManager.speak('Not quite. Consider the quantum exchange energy K equals n times n minus 1 divided by 2.');
    }
  };

  // Prediction Answer Handler
  const handlePredictionAnswer = (predIdx: number, optionIdx: number) => {
    setPredictionAnswers((prev) => ({ ...prev, [predIdx]: optionIdx }));
    const question = PREDICTION_QUESTIONS[predIdx];
    const isCorrect = optionIdx === question.correctIndex;
    handleBKTUpdate(question.nodeId, isCorrect);

    if (isCorrect) {
      audioManager.play('success');
    } else {
      audioManager.play('error');
    }
  };

  // Observation Answer Handler
  const handleObservationAnswer = (obsIdx: number, optionIdx: number) => {
    setObservationAnswers((prev) => ({ ...prev, [obsIdx]: optionIdx }));
    const question = OBSERVATION_QUESTIONS[obsIdx];
    const isCorrect = optionIdx === question.correctIndex;
    handleBKTUpdate(question.nodeId, isCorrect);

    if (isCorrect) {
      audioManager.play('drop-correct');
    } else {
      audioManager.play('drop-wrong');
    }
  };

  // Challenge Tier Filtered Subset
  const filteredChallenges = useMemo(() => {
    if (challengeTierFilter === 'all') return CHALLENGES;
    return CHALLENGES.filter((c) => c.difficulty === challengeTierFilter);
  }, [challengeTierFilter]);

  const currentChallenge = filteredChallenges[currentChallengeIndex] || filteredChallenges[0];

  // Challenge Option Select Handler
  const handleChallengeSubmit = (selectedOptionIndex: number) => {
    if (!currentChallenge) return;
    resetInactivityTimer();

    const isCorrect = selectedOptionIndex === currentChallenge.correctIndex;
    setChallengeAnswers((prev) => ({ ...prev, [currentChallenge.id]: selectedOptionIndex }));
    setChallengeStatus((prev) => ({ ...prev, [currentChallenge.id]: isCorrect ? 'correct' : 'incorrect' }));

    handleBKTUpdate(currentChallenge.nodeId, isCorrect);

    if (isCorrect) {
      setScore((prev) => prev + 10);
      setStreak((prev) => prev + 1);
      audioManager.play('celebration');
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2500);

      if (streak + 1 % 3 === 0) {
        audioManager.play('sparkle');
        setShowSparkle(true);
      }
    } else {
      setStreak(0);
      audioManager.play('error');
    }
  };

  // Challenge Numeric Submit Handler
  const handleNumericSubmit = (val: number) => {
    if (!currentChallenge) return;
    resetInactivityTimer();

    const isCorrect = val === Number(currentChallenge.correctAnswer);
    setChallengeAnswers((prev) => ({ ...prev, [currentChallenge.id]: val }));
    setChallengeStatus((prev) => ({ ...prev, [currentChallenge.id]: isCorrect ? 'correct' : 'incorrect' }));

    handleBKTUpdate(currentChallenge.nodeId, isCorrect);

    if (isCorrect) {
      setScore((prev) => prev + 10);
      setStreak((prev) => prev + 1);
      audioManager.play('celebration');
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2500);
    } else {
      setStreak(0);
      audioManager.play('error');
    }
  };

  // Challenge Drag-Order Submit Handler
  const handleDragOrderSubmit = () => {
    if (!currentChallenge || !dragSortedItems) return;
    // Expected order: 4s (n+l=4), 3d (n+l=5, n=3), 4p (n+l=5, n=4), 5s (n+l=5, n=5)
    const isCorrect =
      dragSortedItems[0].startsWith('4s') &&
      dragSortedItems[1].startsWith('3d') &&
      dragSortedItems[2].startsWith('4p') &&
      dragSortedItems[3].startsWith('5s');

    setChallengeStatus((prev) => ({ ...prev, [currentChallenge.id]: isCorrect ? 'correct' : 'incorrect' }));
    handleBKTUpdate(currentChallenge.nodeId, isCorrect);

    if (isCorrect) {
      setScore((prev) => prev + 15);
      setStreak((prev) => prev + 1);
      audioManager.play('celebration');
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    } else {
      setStreak(0);
      audioManager.play('error');
    }
  };

  // Overall Completion Record
  useEffect(() => {
    const totalCorrect = Object.values(challengeStatus).filter((s) => s === 'correct').length;
    if (totalCorrect >= 15) {
      recordGameScore([], totalCorrect * 10, CHALLENGES.length * 10);
      if (onComplete) onComplete(totalCorrect * 10);
    }
  }, [challengeStatus, onComplete]);

  // Nav Handlers
  const handleNextChallenge = () => {
    if (currentChallengeIndex < filteredChallenges.length - 1) {
      setCurrentChallengeIndex((prev) => prev + 1);
      audioManager.play('whoosh');
    }
  };

  const handlePrevChallenge = () => {
    if (currentChallengeIndex > 0) {
      setCurrentChallengeIndex((prev) => prev - 1);
      audioManager.play('whoosh');
    }
  };

  // Tab switch with voice feedback
  const handleTabChange = (tab: 'discovery' | 'lab' | 'challenges' | 'summary') => {
    setActiveTab(tab);
    audioManager.play('pop');
    resetInactivityTimer();

    if (tab === 'discovery') {
      speechManager.speak('Welcome to the Discovery Module. Explore counterintuitive electronic configurations.');
    } else if (tab === 'lab') {
      speechManager.speak('Interactive Quantum Chemistry Laboratory. Build electron shells and test quantum rules.');
    } else if (tab === 'challenges') {
      speechManager.speak('Challenge Mode. Solve progressive problems matching ISC Class 11 examination standards.');
    } else if (tab === 'summary') {
      speechManager.speak('Summary and Mastery Overview. Review your learning analytics and real-world applications.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 select-none">
      {/* FEEDBACK OVERLAY COMPONENTS */}
      <HintBubble show={showHint} text={currentHint} />
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccess} text="Quantum Rule Verified Correctly!" />
      <SparkleBurst show={showSparkle} x={sparklePos.x} y={sparklePos.y} />

      {/* HEADER BAR */}
      <header className="max-w-7xl mx-auto mb-6 bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-2xl flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center font-black text-xl text-white shadow-lg shadow-blue-500/30">
            e⁻
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider bg-blue-500/20 text-blue-400 px-2.5 py-0.5 rounded-full border border-blue-500/30">
                ISC Class 11 Chemistry
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider bg-purple-500/20 text-purple-400 px-2.5 py-0.5 rounded-full border border-purple-500/30">
                10 Nodes
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mt-1">
              Aufbau, Pauli & Hund\'s Quantum Rules Simulator
            </h1>
          </div>
        </div>

        {/* TOP METRICS & TABS */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-3 bg-slate-950/80 px-4 py-2 rounded-xl border border-slate-800">
            <div className="text-center">
              <div className="text-xs text-slate-400 font-medium">Mastery Score</div>
              <div className="text-lg font-bold text-emerald-400">{score} pts</div>
            </div>
            <div className="h-8 w-px bg-slate-800" />
            <div className="text-center">
              <div className="text-xs text-slate-400 font-medium">Streak</div>
              <div className="text-lg font-bold text-amber-400">🔥 {streak}</div>
            </div>
          </div>

          <nav className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800">
            {(['discovery', 'lab', 'challenges', 'summary'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`px-4 py-2 rounded-lg text-xs font-bold capitalize transition-all duration-200 ${
                  activeTab === tab
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* MAIN CONTENT CONTAINERS */}
      <main className="max-w-7xl mx-auto">
        {/* ========================================== */}
        {/* TAB 1: DISCOVERY & PREDICTION */}
        {/* ========================================== */}
        {activeTab === 'discovery' && (
          <div className="space-y-6 animate-fadeIn">
            {/* SCENARIO CARD */}
            <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/30 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">
                <span>🔬 Laboratory Context</span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">{SCENARIO.title}</h2>
              <p className="text-slate-300 text-sm leading-relaxed mb-3">{SCENARIO.intro}</p>
              <p className="text-slate-400 text-xs leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                {SCENARIO.context}
              </p>
            </div>

            {/* DISCOVERY QUESTION CARD */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
                  ⚡ Discovery Challenge (Chromium Anomaly)
                </span>
                <span className="text-xs text-slate-400">Node: c11_chem_028</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-4">{DISCOVERY_QUESTION.question}</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                {DISCOVERY_QUESTION.options.map((opt, idx) => {
                  const isSelected = discoveryUserAnswer === idx;
                  const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;

                  let btnStyle = 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700';
                  if (isSelected) {
                    btnStyle = isCorrect
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                      : 'bg-rose-950/80 border-rose-500 text-rose-200';
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleDiscoveryAnswer(idx)}
                      className={`p-4 rounded-xl text-left border text-xs leading-relaxed font-medium transition-all ${btnStyle}`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center font-bold text-slate-400 text-xs flex-shrink-0 mt-0.5">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{opt}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {discoveryUserAnswer !== null && (
                <div
                  className={`p-4 rounded-xl text-xs leading-relaxed border ${
                    discoveryUserAnswer === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                      : 'bg-amber-950/40 border-amber-500/40 text-amber-300'
                  }`}
                >
                  <div className="font-bold mb-1">
                    {discoveryUserAnswer === DISCOVERY_QUESTION.correctIndex ? '✅ Correct Discovery!' : '💡 Key Insight:'}
                  </div>
                  {DISCOVERY_QUESTION.hintAfter}
                </div>
              )}
            </div>

            {/* PREDICTION QUESTIONS SECTION */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <span>🔮 Hypotheses & Interactive Predictions</span>
              </h3>

              {PREDICTION_QUESTIONS.map((pq, pIdx) => (
                <div key={pIdx} className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-blue-400 font-bold uppercase tracking-wider">
                      Prediction #{pIdx + 1}
                    </span>
                    <span className="text-xs text-slate-500">Node: {pq.nodeId}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white">{pq.question}</h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {pq.options.map((opt, oIdx) => {
                      const selected = predictionAnswers[pIdx] === oIdx;
                      const isCorrect = oIdx === pq.correctIndex;
                      return (
                        <button
                          key={oIdx}
                          onClick={() => handlePredictionAnswer(pIdx, oIdx)}
                          className={`p-3 rounded-lg border text-xs text-left transition-all ${
                            selected
                              ? isCorrect
                                ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
                                : 'bg-rose-950 border-rose-500 text-rose-200'
                              : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-850'
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-lg border border-slate-800/80">
                    <span className="font-bold text-amber-400">How to Verify: </span>
                    {pq.verifyInstruction}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* TAB 2: INTERACTIVE LABORATORY */}
        {/* ========================================== */}
        {activeTab === 'lab' && (
          <div className="space-y-6">
            {/* EXPLORATION STEPS TIMELINE NAV */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-1">
                Select Interactive Exploration Lab (5 Modules):
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                {EXPLORATION_STEPS.map((step, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveLabStep(idx);
                      audioManager.play('pop');
                    }}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      activeLabStep === idx
                        ? 'bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-600/30 font-bold'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-900'
                    }`}
                  >
                    <div className="text-[10px] uppercase font-bold opacity-80">Lab Step {idx + 1}</div>
                    <div className="text-xs font-semibold truncate mt-0.5">{step.title.split(':')[1] || step.title}</div>
                  </button>
                ))}
              </div>

              {/* ACTIVE STEP INSTRUCTION */}
              <div className="mt-4 bg-slate-950 p-4 rounded-xl border border-blue-500/30 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <h3 className="text-sm font-bold text-white">{EXPLORATION_STEPS[activeLabStep].title}</h3>
                  <p className="text-xs text-slate-300 mt-1">{EXPLORATION_STEPS[activeLabStep].instruction}</p>
                </div>
                <span className="text-[10px] font-mono bg-blue-500/20 text-blue-300 px-2.5 py-1 rounded border border-blue-500/30 whitespace-nowrap">
                  Node: {EXPLORATION_STEPS[activeLabStep].nodeId}
                </span>
              </div>
            </div>

            {/* LAB MODULE 1: QUANTUM NUMBERS & 3D GEOMETRY */}
            {activeLabStep === 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <span>📐 Orbital Geometry & Quantum Numbers (n, l, m_l)</span>
                  </h3>

                  <div className="space-y-3">
                    <label className="text-xs text-slate-300 font-semibold block">Select Subshell Geometry:</label>
                    <div className="grid grid-cols-4 gap-2">
                      {(['1s', '2s', '2p', '3d'] as const).map((orb) => (
                        <button
                          key={orb}
                          onClick={() => setSelectedCanvasOrbital(orb)}
                          className={`py-2 rounded-lg text-xs font-bold uppercase border transition-all ${
                            selectedCanvasOrbital === orb
                              ? 'bg-blue-600 border-blue-400 text-white'
                              : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-900'
                          }`}
                        >
                          {orb} Orbital
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quantum Metrics Card */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs space-y-2">
                    <div className="flex justify-between border-b border-slate-800 pb-1">
                      <span className="text-slate-400">Principal Quantum Number (n):</span>
                      <span className="font-bold text-blue-400">
                        {selectedCanvasOrbital === '1s' ? 1 : selectedCanvasOrbital.startsWith('2') ? 2 : 3}
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800 pb-1">
                      <span className="text-slate-400">Azimuthal Quantum Number (l):</span>
                      <span className="font-bold text-emerald-400">
                        {selectedCanvasOrbital.endsWith('s') ? 0 : selectedCanvasOrbital.endsWith('p') ? 1 : 2}
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800 pb-1">
                      <span className="text-slate-400">Magnetic Quantum Number Range (m_l):</span>
                      <span className="font-bold text-purple-400">
                        {selectedCanvasOrbital.endsWith('s')
                          ? '0 (1 orbital)'
                          : selectedCanvasOrbital.endsWith('p')
                          ? '-1, 0, +1 (3 orbitals)'
                          : '-2, -1, 0, +1, +2 (5 orbitals)'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Radial / Angular Nodal Surfaces:</span>
                      <span className="font-bold text-amber-400">
                        {selectedCanvasOrbital === '1s'
                          ? '0 Nodes'
                          : selectedCanvasOrbital === '2s'
                          ? '1 Radial Node'
                          : selectedCanvasOrbital === '2p'
                          ? '1 Angular Node'
                          : '2 Angular Nodes'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
                  <h4 className="text-sm font-bold text-white mb-3">Live 3D Electron Density Cloud</h4>
                  <Orbital3DShapeCanvas orbitalType={selectedCanvasOrbital} />
                </div>
              </div>
            )}

            {/* LAB MODULE 2: AUFBAU (n + l) ENERGY LADDER */}
            {activeLabStep === 1 && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <h3 className="text-base font-bold text-white">Aufbau Energy Ladder & Subshell Capacities</h3>
                  <div className="text-xs text-slate-400">
                    Bohr-Sommerfeld Rule: Lower (n + l) fills first.
                  </div>
                </div>

                <AufbauEnergyDiagramSVG
                  currentStepSubshell="3d"
                  electronCounts={currentSubshellTotals}
                />
              </div>
            )}

            {/* LAB MODULE 3: INTERACTIVE ORBITAL BOX ELECTRON FILLER */}
            {activeLabStep === 2 && (
              <div className="space-y-6">
                {/* ELEMENT SELECTOR TOOLBAR */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row justify-between items-center gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-slate-400">Select Element (Z=1 to 30):</span>
                    <select
                      value={selectedZ}
                      onChange={(e) => setSelectedZ(Number(e.target.value))}
                      className="bg-slate-950 border border-slate-700 text-white rounded-lg px-3 py-1.5 text-xs font-bold focus:outline-none focus:border-blue-500"
                    >
                      {ELEMENTS_DATA.map((elem) => (
                        <option key={elem.z} value={elem.z}>
                          Z = {elem.z}: {elem.symbol} ({elem.name}) {elem.isException ? '★ Exception' : ''}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => fillOrbitalsForZ(selectedZ)}
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition-all"
                    >
                      Auto-Fill Ground State
                    </button>
                    <button
                      onClick={() =>
                        setUserOrbitals({
                          '1s_0': [], '2s_0': [],
                          '2p_0': [], '2p_1': [], '2p_2': [],
                          '3s_0': [],
                          '3p_0': [], '3p_1': [], '3p_2': [],
                          '4s_0': [],
                          '3d_0': [], '3d_1': [], '3d_2': [], '3d_3': [], '3d_4': []
                        })
                      }
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-bold transition-all"
                    >
                      Clear All Boxes
                    </button>
                  </div>
                </div>

                {/* ORBITAL BOXES GRID */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-800 pb-4">
                    <div>
                      <h3 className="text-lg font-bold text-white">
                        {currentElement.name} ({currentElement.symbol}) — Z = {currentElement.z}
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Standard Config: <span className="font-mono text-blue-400">{currentElement.configString}</span>
                      </p>
                    </div>

                    {/* LIVE QUANTUM RULE COMPLIANCE BADGES */}
                    <div className="flex flex-wrap gap-2">
                      <span
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                          ruleValidation.pauliViolation
                            ? 'bg-rose-950 border-rose-500 text-rose-300'
                            : 'bg-emerald-950 border-emerald-500 text-emerald-300'
                        }`}
                      >
                        {ruleValidation.pauliViolation ? '❌ Pauli Violation' : '✅ Pauli Valid'}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                          ruleValidation.hundViolation
                            ? 'bg-rose-950 border-rose-500 text-rose-300'
                            : 'bg-emerald-950 border-emerald-500 text-emerald-300'
                        }`}
                      >
                        {ruleValidation.hundViolation ? '❌ Hund Violation' : '✅ Hund Valid'}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                          ruleValidation.aufbauViolation
                            ? 'bg-amber-950 border-amber-500 text-amber-300'
                            : 'bg-emerald-950 border-emerald-500 text-emerald-300'
                        }`}
                      >
                        {ruleValidation.aufbauViolation ? '⚠️ Aufbau Deviation' : '✅ Aufbau Valid'}
                      </span>
                    </div>
                  </div>

                  {/* BOX FILLING BOARD */}
                  <div className="space-y-4">
                    {[
                      { sub: '1s', slots: ['1s_0'] },
                      { sub: '2s', slots: ['2s_0'] },
                      { sub: '2p', slots: ['2p_0', '2p_1', '2p_2'] },
                      { sub: '3s', slots: ['3s_0'] },
                      { sub: '3p', slots: ['3p_0', '3p_1', '3p_2'] },
                      { sub: '4s', slots: ['4s_0'] },
                      { sub: '3d', slots: ['3d_0', '3d_1', '3d_2', '3d_3', '3d_4'] }
                    ].map((group) => (
                      <div key={group.sub} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-slate-950 p-3 rounded-xl border border-slate-800">
                        <div className="w-16 font-bold text-sm text-blue-400">{group.sub} subshell</div>
                        <div className="flex flex-wrap gap-2">
                          {group.slots.map((slotKey, sIdx) => {
                            const electrons = userOrbitals[slotKey] || [];
                            return (
                              <button
                                key={slotKey}
                                onClick={() => handleOrbitalBoxClick(slotKey)}
                                className="w-14 h-14 bg-slate-900 border-2 border-slate-700 hover:border-blue-500 rounded-lg flex items-center justify-center gap-1 transition-all shadow-inner relative"
                              >
                                <span className="absolute top-1 left-1 text.x-small font-mono text-slate-500 text-[9px]">
                                  {group.sub.includes('p')
                                    ? ['x', 'y', 'z'][sIdx]
                                    : group.sub.includes('d')
                                    ? ['xy', 'yz', 'xz', 'x²-y²', 'z²'][sIdx]
                                    : ''}
                                </span>
                                {electrons.map((sp, idx) => (
                                  <span
                                    key={idx}
                                    className={`text-xl font-extrabold ${
                                      sp === 'up' ? 'text-blue-400' : 'text-rose-400'
                                    }`}
                                  >
                                    {sp === 'up' ? '↑' : '↓'}
                                  </span>
                                ))}
                                {electrons.length === 0 && (
                                  <span className="text-slate-700 text-xs">__</span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="text-xs text-slate-400 bg-slate-950 p-3 rounded-xl border border-slate-800">
                    💡 <span className="font-semibold text-slate-200">Interactive Hint:</span> Click any orbital box to cycle through adding spin-up (↑), adding spin-down (↓), or clearing.
                  </div>
                </div>
              </div>
            )}

            {/* LAB MODULE 4: CHROMIUM & COPPER EXCHANGE ENERGY COUNTER */}
            {activeLabStep === 3 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
                  <h3 className="text-base font-bold text-white">Chromium (Z=24) & Exchange Energy Counter</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Compare the hypothetical 4s² 3d⁴ configuration with the actual ground state 4s¹ 3d⁵. Notice how increasing unpaired parallel spins creates extra quantum exchange interactions!
                  </p>

                  <div className="space-y-3 pt-2">
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                      <div className="text-xs font-bold text-slate-400">Hypothetical Configuration: 4s² 3d⁴</div>
                      <div className="text-xs text-slate-300">Unpaired 3d electrons (n) = 4</div>
                      <div className="text-xs font-bold text-rose-400">
                        Exchange Pairs K = 4(3) / 2 = 6 interactions
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/40 space-y-2">
                      <div className="text-xs font-bold text-emerald-400">Ground State Configuration: 4s¹ 3d⁵ (Half-Filled)</div>
                      <div className="text-xs text-slate-300">Unpaired 3d electrons (n) = 5</div>
                      <div className="text-xs font-bold text-emerald-400">
                        Exchange Pairs K = 5(4) / 2 = 10 interactions (+4 Extra Pairs!)
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
                  <ExchangeEnergyDiagramSVG numUnpaired={5} subshellName="3d⁵ (Chromium Ground State)" />
                </div>
              </div>
            )}

            {/* LAB MODULE 5: IONIZATION SEQUENCE VISUALIZER */}
            {activeLabStep === 4 && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div>
                    <h3 className="text-base font-bold text-white">Transition Metal Ionization Visualizer (Fe, Z=26)</h3>
                    <p className="text-xs text-slate-400">Observe which electrons are removed first when cations are formed.</p>
                  </div>

                  {/* IONIZATION LEVEL TOGGLE */}
                  <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
                    {['Fe (Neutral)', 'Fe⁺', 'Fe²⁺', 'Fe³⁺'].map((lbl, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setIonIonizationLevel(idx);
                          audioManager.play('tap');
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          ionIonizationLevel === idx
                            ? 'bg-emerald-600 text-white shadow-md'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {lbl}
                      </button>
                    ))}
                  </div>
                </div>

                <IonizationTransitionSVG
                  elementSymbol="Fe"
                  ionSymbol={ionIonizationLevel === 0 ? 'Fe' : ionIonizationLevel === 1 ? 'Fe⁺' : ionIonizationLevel === 2 ? 'Fe²⁺' : 'Fe³⁺'}
                  neutralConfig="[Ar] 4s² 3d⁶"
                  ionConfig={
                    ionIonizationLevel === 0
                      ? '[Ar] 4s² 3d⁶'
                      : ionIonizationLevel === 1
                      ? '[Ar] 4s¹ 3d⁶'
                      : ionIonizationLevel === 2
                      ? '[Ar] 3d⁶'
                      : '[Ar] 3d⁵'
                  }
                  removedShell={ionIonizationLevel <= 2 ? '4s Subshell' : '3d Subshell'}
                />
              </div>
            )}

            {/* OBSERVATION QUESTIONS SECTION */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <span>👁️ Mandatory Observation Checkpoints</span>
              </h3>

              {OBSERVATION_QUESTIONS.map((oq, oIdx) => (
                <div key={oIdx} className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider">
                      Observation #{oIdx + 1}
                    </span>
                    <span className="text-xs text-slate-500">Node: {oq.nodeId}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white">{oq.question}</h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {oq.observableOptions.map((opt, optIdx) => {
                      const selected = observationAnswers[oIdx] === optIdx;
                      const isCorrect = optIdx === oq.correctIndex;
                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleObservationAnswer(oIdx, optIdx)}
                          className={`p-3 rounded-lg border text-xs text-left transition-all ${
                            selected
                              ? isCorrect
                                ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
                                : 'bg-rose-950 border-rose-500 text-rose-200'
                              : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-850'
                          }`}
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

        {/* ========================================== */}
        {/* TAB 3: CHALLENGES (22 PROGRESSIVE ITEMS) */}
        {/* ========================================== */}
        {activeTab === 'challenges' && (
          <div className="space-y-6">
            {/* TIER FILTER BAR & CHALLENGE NAVIGATOR */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400">Difficulty Tier:</span>
                {(['all', 'foundation', 'standard', 'advanced'] as const).map((tier) => (
                  <button
                    key={tier}
                    onClick={() => {
                      setChallengeTierFilter(tier);
                      setCurrentChallengeIndex(0);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                      challengeTierFilter === tier
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                    }`}
                  >
                    {tier}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrevChallenge}
                  disabled={currentChallengeIndex === 0}
                  className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded-lg text-xs font-bold disabled:opacity-40"
                >
                  ← Prev
                </button>
                <span className="text-xs text-slate-400 font-bold font-mono">
                  {currentChallengeIndex + 1} / {filteredChallenges.length}
                </span>
                <button
                  onClick={handleNextChallenge}
                  disabled={currentChallengeIndex === filteredChallenges.length - 1}
                  className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded-lg text-xs font-bold disabled:opacity-40"
                >
                  Next →
                </button>
              </div>
            </div>

            {/* CHALLENGE CARD */}
            {currentChallenge && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
                <div className="flex flex-wrap justify-between items-center gap-2 border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                        currentChallenge.difficulty === 'foundation'
                          ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                          : currentChallenge.difficulty === 'standard'
                          ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                          : 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                      }`}
                    >
                      {currentChallenge.difficulty} Tier
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      Competency: {currentChallenge.competencyLevel}
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 font-mono">
                    Node ID: {currentChallenge.nodeId}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white leading-relaxed">
                  {currentChallenge.question}
                </h3>

                {/* MCQ TYPE QUESTION */}
                {currentChallenge.type === 'mcq' && currentChallenge.options && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {currentChallenge.options.map((opt, idx) => {
                      const userAns = challengeAnswers[currentChallenge.id];
                      const isSelected = userAns === idx;
                      const isCorrect = idx === currentChallenge.correctIndex;
                      const status = challengeStatus[currentChallenge.id];

                      let style = 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700';
                      if (status && isSelected) {
                        style = isCorrect
                          ? 'bg-emerald-950 border-emerald-500 text-emerald-200 font-bold'
                          : 'bg-rose-950 border-rose-500 text-rose-200';
                      }

                      return (
                        <button
                          key={idx}
                          onClick={() => handleChallengeSubmit(idx)}
                          className={`p-4 rounded-xl border text-xs leading-relaxed text-left transition-all ${style}`}
                        >
                          <div className="flex items-start gap-3">
                            <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center font-bold text-slate-400 text-xs flex-shrink-0 mt-0.5">
                              {String.fromCharCode(65 + idx)}
                            </span>
                            <span>{opt}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* NUMERIC TYPE QUESTION */}
                {currentChallenge.type === 'numeric' && (
                  <div className="space-y-3 max-w-md">
                    <label className="text-xs text-slate-400 font-semibold block">Enter Numerical Answer:</label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        id={`numeric_input_${currentChallenge.id}`}
                        placeholder="e.g. 10"
                        className="flex-1 bg-slate-950 border border-slate-700 text-white rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-blue-500 font-mono"
                      />
                      <button
                        onClick={() => {
                          const input = document.getElementById(`numeric_input_${currentChallenge.id}`) as HTMLInputElement;
                          if (input && input.value !== '') {
                            handleNumericSubmit(Number(input.value));
                          }
                        }}
                        className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-all"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                )}

                {/* DRAG ORDER INTERACTIVE TYPE */}
                {currentChallenge.type === 'drag-order' && dragSortedItems.length > 0 && (
                  <div className="space-y-4">
                    <div className="text-xs text-slate-400">
                      Reorder subshells from lowest energy to highest energy using buttons below:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                      {dragSortedItems.map((item, idx) => (
                        <div key={idx} className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex flex-col justify-between gap-2">
                          <span className="text-xs font-mono text-blue-400">{item}</span>
                          <div className="flex gap-1 justify-end">
                            {idx > 0 && (
                              <button
                                onClick={() => {
                                  const copy = [...dragSortedItems];
                                  const temp = copy[idx];
                                  copy[idx] = copy[idx - 1];
                                  copy[idx - 1] = temp;
                                  setDragSortedItems(copy);
                                }}
                                className="px-2 py-0.5 bg-slate-800 text-[10px] text-slate-300 rounded"
                              >
                                ←
                              </button>
                            )}
                            {idx < dragSortedItems.length - 1 && (
                              <button
                                onClick={() => {
                                  const copy = [...dragSortedItems];
                                  const temp = copy[idx];
                                  copy[idx] = copy[idx + 1];
                                  copy[idx + 1] = temp;
                                  setDragSortedItems(copy);
                                }}
                                className="px-2 py-0.5 bg-slate-800 text-[10px] text-slate-300 rounded"
                              >
                                →
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={handleDragOrderSubmit}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-all"
                    >
                      Verify Energy Order
                    </button>
                  </div>
                )}

                {/* EXPLANATION PANEL ON RESPONSE */}
                {challengeStatus[currentChallenge.id] && (
                  <div
                    className={`p-4 rounded-xl border text-xs leading-relaxed ${
                      challengeStatus[currentChallenge.id] === 'correct'
                        ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                        : 'bg-rose-950/40 border-rose-500/40 text-rose-300'
                    }`}
                  >
                    <div className="font-bold mb-1">
                      {challengeStatus[currentChallenge.id] === 'correct' ? '✅ Correct Explanation:' : '❌ Explanation & Guidance:'}
                    </div>
                    {currentChallenge.explanation}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ========================================== */}
        {/* TAB 4: SUMMARY & MASTERY ANALYTICS */}
        {/* ========================================== */}
        {activeTab === 'summary' && (
          <div className="space-y-6">
            {/* REAL-WORLD ACTIVITY BOARD */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
                  🌐 Real-World Industry Application
                </span>
                <span className="text-xs text-slate-400">ISC Class 11 Practical Link</span>
              </div>
              <h3 className="text-xl font-bold text-white">{REAL_WORLD_ACTIVITY.title}</h3>
              <p className="text-slate-300 text-xs leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                {REAL_WORLD_ACTIVITY.steps.map((st, idx) => (
                  <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs flex-shrink-0">
                      {idx + 1}
                    </span>
                    <span>{st}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* BKT NODE MASTERY BREAKDOWN */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>📊 Bayesian Knowledge Tracing (BKT) Node Mastery</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
                {ALL_NODE_IDS.map((nodeId) => {
                  const bktState = bktMap[nodeId];
                  const mastery = bktState ? Math.round(bktState.pKnown * 100) : 50;
                  const level = getMasteryLevel(bktState ? bktState.pKnown : 0.5);

                  return (
                    <div key={nodeId} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-center space-y-2">
                      <div className="text-[10px] font-mono text-slate-400">{nodeId}</div>
                      <div className="text-lg font-bold text-white">{mastery}%</div>
                      <div
                        className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                          level === 'mastered'
                            ? 'bg-emerald-950 text-emerald-400 border-emerald-500/30'
                            : level === 'proficient'
                            ? 'bg-blue-950 text-blue-400 border-blue-500/30'
                            : 'bg-amber-950 text-amber-400 border-amber-500/30'
                        }`}
                      >
                        {level}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* MISCONCEPTIONS REVIEW ACCORDION */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <h3 className="text-lg font-bold text-white">⚠️ ISC Misconceptions & Corrections Review</h3>

              <div className="space-y-3">
                {MISCONCEPTIONS.map((m) => (
                  <div key={m.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                    <div className="font-bold text-rose-400 flex items-center gap-2">
                      <span>❌ Common Misconception:</span>
                      <span>{m.misconception}</span>
                    </div>
                    <div className="text-emerald-300 font-medium">
                      <span className="font-bold text-emerald-400">✅ Quantum Correction: </span>
                      {m.correction}
                    </div>
                    <div className="text-slate-400 italic">
                      Example: {m.example}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}