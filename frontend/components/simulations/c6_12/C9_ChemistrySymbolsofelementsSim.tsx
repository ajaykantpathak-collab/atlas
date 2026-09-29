'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst, type SoundEffect } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

interface Misconception {
  id: string;
  title: string;
  description: string;
  correction: string;
}

// --- NODE CONSTANTS ---
const NODE_C9_CHEM_001 = 'c9_chem_001'; // Symbols of elements
const NODE_C9_CHEM_002 = 'c9_chem_002'; // Valency and radicals
const NODE_C9_CHEM_003 = 'c9_chem_003'; // Formulae of compounds
const NODE_C9_CHEM_004 = 'c9_chem_004'; // Balancing chemical equations
const NODE_C9_CHEM_005 = 'c9_chem_005'; // Relative atomic and molecular masses
const NODE_C9_CHEM_006 = 'c9_chem_006'; // Percentage composition of compounds
const NODE_C9_CHEM_007 = 'c9_chem_007'; // Direct combination reactions
const NODE_C9_CHEM_008 = 'c9_chem_008'; // Decomposition reactions
const NODE_C9_CHEM_009 = 'c9_chem_009'; // Displacement reactions
const NODE_C9_CHEM_010 = 'c9_chem_010'; // Double displacement reactions

const ALL_NODE_IDS = [
  NODE_C9_CHEM_001,
  NODE_C9_CHEM_002,
  NODE_C9_CHEM_003,
  NODE_C9_CHEM_004,
  NODE_C9_CHEM_005,
  NODE_C9_CHEM_006,
  NODE_C9_CHEM_007,
  NODE_C9_CHEM_008,
  NODE_C9_CHEM_009,
  NODE_C9_CHEM_010
];

// --- INTERFACES & TYPES ---
interface ElementInfo {
  name: string;
  symbol: string;
  latinName?: string;
  atomicMass: number;
  valency: number;
  valenceElectrons: number;
  type: 'metal' | 'non-metal' | 'noble-gas';
  color: string;
}

interface RadicalInfo {
  name: string;
  formula: string;
  charge: number;
  valency: number;
  type: 'cation' | 'anion';
  atoms: { symbol: string; count: number }[];
  color: string;
}

interface CompoundInfo {
  name: string;
  formula: string;
  cation: string;
  anion: string;
  cationCount: number;
  anionCount: number;
  molecularMass: number;
  percentages: { element: string; massRatio: number; percentage: number }[];
}

interface ReactionDef {
  id: string;
  nodeId: string;
  type: 'combination' | 'decomposition' | 'displacement' | 'double_displacement';
  name: string;
  equationRaw: string;
  reactants: { formula: string; coeff: number }[];
  products: { formula: string; coeff: number }[];
  condition?: string;
  observation: string;
  precipitateColor?: string;
  solutionColorBefore?: string;
  solutionColorAfter?: string;
}

interface Challenge {
  id: number;
  nodeId: string;
  title: string;
  description: string;
  prompt: string;
  type: 'mcq' | 'criss_cross' | 'balance' | 'mass_calc' | 'reaction_predict';
  options?: string[];
  correctAnswer: string | number | object;
  hint: string;
  misconceptionId?: string;
}

// --- DATA DICTIONARIES ---
const ELEMENTS_DATA: Record<string, ElementInfo> = {
  H: { name: 'Hydrogen', symbol: 'H', atomicMass: 1, valency: 1, valenceElectrons: 1, type: 'non-metal', color: '#38bdf8' },
  He: { name: 'Helium', symbol: 'He', atomicMass: 4, valency: 0, valenceElectrons: 2, type: 'noble-gas', color: '#c084fc' },
  C: { name: 'Carbon', symbol: 'C', atomicMass: 12, valency: 4, valenceElectrons: 4, type: 'non-metal', color: '#94a3b8' },
  N: { name: 'Nitrogen', symbol: 'N', atomicMass: 14, valency: 3, valenceElectrons: 5, type: 'non-metal', color: '#60a5fa' },
  O: { name: 'Oxygen', symbol: 'O', atomicMass: 16, valency: 2, valenceElectrons: 6, type: 'non-metal', color: '#f87171' },
  Ne: { name: 'Neon', symbol: 'Ne', atomicMass: 20, valency: 0, valenceElectrons: 8, type: 'noble-gas', color: '#e879f9' },
  Na: { name: 'Sodium', symbol: 'Na', latinName: 'Natrium', atomicMass: 23, valency: 1, valenceElectrons: 1, type: 'metal', color: '#facc15' },
  Mg: { name: 'Magnesium', symbol: 'Mg', atomicMass: 24, valency: 2, valenceElectrons: 2, type: 'metal', color: '#4ade80' },
  Al: { name: 'Aluminium', symbol: 'Al', atomicMass: 27, valency: 3, valenceElectrons: 3, type: 'metal', color: '#a855f7' },
  Si: { name: 'Silicon', symbol: 'Si', atomicMass: 28, valency: 4, valenceElectrons: 4, type: 'non-metal', color: '#64748b' },
  P: { name: 'Phosphorus', symbol: 'P', atomicMass: 31, valency: 3, valenceElectrons: 5, type: 'non-metal', color: '#fb923c' },
  S: { name: 'Sulphur', symbol: 'S', atomicMass: 32, valency: 2, valenceElectrons: 6, type: 'non-metal', color: '#fde047' },
  Cl: { name: 'Chlorine', symbol: 'Cl', atomicMass: 35.5, valency: 1, valenceElectrons: 7, type: 'non-metal', color: '#a3e635' },
  K: { name: 'Potassium', symbol: 'K', latinName: 'Kalium', atomicMass: 39, valency: 1, valenceElectrons: 1, type: 'metal', color: '#fbbf24' },
  Ca: { name: 'Calcium', symbol: 'Ca', atomicMass: 40, valency: 2, valenceElectrons: 2, type: 'metal', color: '#34d399' },
  Fe: { name: 'Iron', symbol: 'Fe', latinName: 'Ferrum', atomicMass: 56, valency: 2, valenceElectrons: 2, type: 'metal', color: '#92400e' },
  Cu: { name: 'Copper', symbol: 'Cu', latinName: 'Cuprum', atomicMass: 63.5, valency: 2, valenceElectrons: 2, type: 'metal', color: '#b45309' },
  Zn: { name: 'Zinc', symbol: 'Zn', atomicMass: 65, valency: 2, valenceElectrons: 2, type: 'metal', color: '#6b7280' },
  Ag: { name: 'Silver', symbol: 'Ag', latinName: 'Argentum', atomicMass: 108, valency: 1, valenceElectrons: 1, type: 'metal', color: '#e2e8f0' },
  Au: { name: 'Gold', symbol: 'Au', latinName: 'Aurum', atomicMass: 197, valency: 1, valenceElectrons: 1, type: 'metal', color: '#eab308' }
};

const RADICALS_DATA: Record<string, RadicalInfo> = {
  SO4: { name: 'Sulphate', formula: 'SO₄²⁻', charge: -2, valency: 2, type: 'anion', atoms: [{ symbol: 'S', count: 1 }, { symbol: 'O', count: 4 }], color: '#ef4444' },
  NO3: { name: 'Nitrate', formula: 'NO₃⁻', charge: -1, valency: 1, type: 'anion', atoms: [{ symbol: 'N', count: 1 }, { symbol: 'O', count: 3 }], color: '#3b82f6' },
  CO3: { name: 'Carbonate', formula: 'CO₃²⁻', charge: -2, valency: 2, type: 'anion', atoms: [{ symbol: 'C', count: 1 }, { symbol: 'O', count: 3 }], color: '#10b981' },
  OH: { name: 'Hydroxide', formula: 'OH⁻', charge: -1, valency: 1, type: 'anion', atoms: [{ symbol: 'O', count: 1 }, { symbol: 'H', count: 1 }], color: '#06b6d4' },
  NH4: { name: 'Ammonium', formula: 'NH₄⁺', charge: 1, valency: 1, type: 'cation', atoms: [{ symbol: 'N', count: 1 }, { symbol: 'H', count: 4 }], color: '#8b5cf6' },
  Cl: { name: 'Chloride', formula: 'Cl⁻', charge: -1, valency: 1, type: 'anion', atoms: [{ symbol: 'Cl', count: 1 }], color: '#84cc16' }
};

const COMPOUNDS_DATA: Record<string, CompoundInfo> = {
  H2O: {
    name: 'Water',
    formula: 'H₂O',
    cation: 'H',
    anion: 'O',
    cationCount: 2,
    anionCount: 1,
    molecularMass: 18,
    percentages: [
      { element: 'H', massRatio: 2, percentage: 11.11 },
      { element: 'O', massRatio: 16, percentage: 88.89 }
    ]
  },
  CO2: {
    name: 'Carbon Dioxide',
    formula: 'CO₂',
    cation: 'C',
    anion: 'O',
    cationCount: 1,
    anionCount: 2,
    molecularMass: 44,
    percentages: [
      { element: 'C', massRatio: 12, percentage: 27.27 },
      { element: 'O', massRatio: 32, percentage: 72.73 }
    ]
  },
  NaCl: {
    name: 'Sodium Chloride',
    formula: 'NaCl',
    cation: 'Na',
    anion: 'Cl',
    cationCount: 1,
    anionCount: 1,
    molecularMass: 58.5,
    percentages: [
      { element: 'Na', massRatio: 23, percentage: 39.32 },
      { element: 'Cl', massRatio: 35.5, percentage: 60.68 }
    ]
  },
  CaCO3: {
    name: 'Calcium Carbonate',
    formula: 'CaCO₃',
    cation: 'Ca',
    anion: 'CO3',
    cationCount: 1,
    anionCount: 1,
    molecularMass: 100,
    percentages: [
      { element: 'Ca', massRatio: 40, percentage: 40.0 },
      { element: 'C', massRatio: 12, percentage: 12.0 },
      { element: 'O', massRatio: 48, percentage: 48.0 }
    ]
  },
  H2SO4: {
    name: 'Sulphuric Acid',
    formula: 'H₂SO₄',
    cation: 'H',
    anion: 'SO4',
    cationCount: 2,
    anionCount: 1,
    molecularMass: 98,
    percentages: [
      { element: 'H', massRatio: 2, percentage: 2.04 },
      { element: 'S', massRatio: 32, percentage: 32.65 },
      { element: 'O', massRatio: 64, percentage: 65.31 }
    ]
  },
  Al2SO43: {
    name: 'Aluminium Sulphate',
    formula: 'Al₂(SO₄)₃',
    cation: 'Al',
    anion: 'SO4',
    cationCount: 2,
    anionCount: 3,
    molecularMass: 342,
    percentages: [
      { element: 'Al', massRatio: 54, percentage: 15.79 },
      { element: 'S', massRatio: 96, percentage: 28.07 },
      { element: 'O', massRatio: 192, percentage: 56.14 }
    ]
  }
};

const REACTIONS_DATA: ReactionDef[] = [
  {
    id: 'rxn_comb_1',
    nodeId: NODE_C9_CHEM_007,
    type: 'combination',
    name: 'Burning of Magnesium Ribbon',
    equationRaw: '2Mg + O₂ → 2MgO',
    reactants: [{ formula: 'Mg', coeff: 2 }, { formula: 'O₂', coeff: 1 }],
    products: [{ formula: 'MgO', coeff: 2 }],
    condition: 'Heat / Flame',
    observation: 'Dazzling white flame producing brilliant white powdery ash of Magnesium Oxide.'
  },
  {
    id: 'rxn_comb_2',
    nodeId: NODE_C9_CHEM_007,
    type: 'combination',
    name: 'Slaking of Quicklime',
    equationRaw: 'CaO + H₂O → Ca(OH)₂',
    reactants: [{ formula: 'CaO', coeff: 1 }, { formula: 'H₂O', coeff: 1 }],
    products: [{ formula: 'Ca(OH)₂', coeff: 1 }],
    condition: 'Exothermic (releases heat)',
    observation: 'Hissing sound with intense heat evolution, forming a white slurry of Slaked Lime.'
  },
  {
    id: 'rxn_decomp_1',
    nodeId: NODE_C9_CHEM_008,
    type: 'decomposition',
    name: 'Thermal Decomposition of Limestone',
    equationRaw: 'CaCO₃ → CaO + CO₂',
    reactants: [{ formula: 'CaCO₃', coeff: 1 }],
    products: [{ formula: 'CaO', coeff: 1 }, { formula: 'CO₂', coeff: 1 }],
    condition: 'Strong Heating (Δ)',
    observation: 'White solid crumbles into quicklime; gas turns limewater milky (CO₂).'
  },
  {
    id: 'rxn_decomp_2',
    nodeId: NODE_C9_CHEM_008,
    type: 'decomposition',
    name: 'Electrolysis of Acidified Water',
    equationRaw: '2H₂O → 2H₂ + O₂',
    reactants: [{ formula: 'H₂O', coeff: 2 }],
    products: [{ formula: 'H₂', coeff: 2 }, { formula: 'O₂', coeff: 1 }],
    condition: 'Electric Current',
    observation: 'Gas bubbles at electrodes in 2:1 volume ratio. Cathode gas pops (H₂); anode gas relights splint (O₂).'
  },
  {
    id: 'rxn_disp_1',
    nodeId: NODE_C9_CHEM_009,
    type: 'displacement',
    name: 'Zinc Dipped in Copper Sulphate Solution',
    equationRaw: 'Zn + CuSO₄ → ZnSO₄ + Cu',
    reactants: [{ formula: 'Zn', coeff: 1 }, { formula: 'CuSO₄', coeff: 1 }],
    products: [{ formula: 'ZnSO₄', coeff: 1 }, { formula: 'Cu', coeff: 1 }],
    solutionColorBefore: '#0284c7', // Blue CuSO4
    solutionColorAfter: '#e2e8f0', // Clear ZnSO4
    observation: 'Blue solution slowly fades to colourless; reddish-brown Copper metal deposits on Zinc strip.'
  },
  {
    id: 'rxn_disp_2',
    nodeId: NODE_C9_CHEM_009,
    type: 'displacement',
    name: 'Chlorine Gas Passed through Potassium Iodide',
    equationRaw: 'Cl₂ + 2KI → 2KCl + I₂',
    reactants: [{ formula: 'Cl₂', coeff: 1 }, { formula: 'KI', coeff: 2 }],
    products: [{ formula: 'KCl', coeff: 2 }, { formula: 'I₂', coeff: 1 }],
    solutionColorBefore: '#f8fafc',
    solutionColorAfter: '#78350f', // Brown Iodine
    observation: 'Colourless Potassium Iodide solution turns deep golden-brown due to liberated Iodine.'
  },
  {
    id: 'rxn_ddisp_1',
    nodeId: NODE_C9_CHEM_010,
    type: 'double_displacement',
    name: 'Sodium Sulphate + Barium Chloride',
    equationRaw: 'Na₂SO₄(aq) + BaCl₂(aq) → BaSO₄(s) + 2NaCl(aq)',
    reactants: [{ formula: 'Na₂SO₄', coeff: 1 }, { formula: 'BaCl₂', coeff: 1 }],
    products: [{ formula: 'BaSO₄', coeff: 1 }, { formula: 'NaCl', coeff: 2 }],
    precipitateColor: '#ffffff', // White BaSO4
    observation: 'Immediate formation of a thick, chalky white precipitate of Barium Sulphate.'
  },
  {
    id: 'rxn_ddisp_2',
    nodeId: NODE_C9_CHEM_010,
    type: 'double_displacement',
    name: 'Lead Nitrate + Potassium Iodide',
    equationRaw: 'Pb(NO₃)₂(aq) + 2KI(aq) → PbI₂(s) + 2KNO₃(aq)',
    reactants: [{ formula: 'Pb(NO₃)₂', coeff: 1 }, { formula: 'KI', coeff: 2 }],
    products: [{ formula: 'PbI₂', coeff: 1 }, { formula: 'KNO₃', coeff: 2 }],
    precipitateColor: '#facc15', // Bright Yellow PbI2
    observation: 'Instant formation of a brilliant golden-yellow precipitate of Lead Iodide.'
  }
];

// --- CHALLENGES (10 PROGRESSIVE CHALLENGES FOR ALL 10 NODES) ---
const CHALLENGES: Challenge[] = [
  {
    id: 1,
    nodeId: NODE_C9_CHEM_001,
    title: 'Symbol Spelling & IUPAC Rules',
    description: 'Master the mandatory IUPAC rule: First letter CAPITAL, second letter lowercase.',
    prompt: 'Which of the following correctly represents the chemical symbol for Sodium derived from its Latin name Natrium?',
    type: 'mcq',
    options: ['NA', 'Na', 'na', 'SO'],
    correctAnswer: 'Na',
    hint: 'IUPAC rule: The first letter must be UPPERCASE, and the second MUST be lowercase.',
    misconceptionId: 'm1_casing'
  },
  {
    id: 2,
    nodeId: NODE_C9_CHEM_002,
    title: 'Valency & Radical Identification',
    description: 'Determine combining capacity of radicals.',
    prompt: 'What is the valency of the Sulphate radical (SO₄²⁻) and is it a cation or an anion?',
    type: 'mcq',
    options: ['Valency 1, Anion', 'Valency 2, Anion', 'Valency 2, Cation', 'Valency 4, Anion'],
    correctAnswer: 'Valency 2, Anion',
    hint: 'The charge 2- indicates a valency of 2 and a negative ion (anion).',
    misconceptionId: 'm2_radical'
  },
  {
    id: 3,
    nodeId: NODE_C9_CHEM_003,
    title: 'Criss-Cross Formula Construction',
    description: 'Build correct formula of Aluminium Sulphate using brackets for polyatomic radicals.',
    prompt: 'Construct the formula for Aluminium Sulphate by combining Al³⁺ (valency 3) and SO₄²⁻ (valency 2):',
    type: 'criss_cross',
    options: ['AlSO₄', 'Al₂SO₄₃', 'Al₂(SO₄)₃', 'Al₃(SO₄)₂'],
    correctAnswer: 'Al₂(SO₄)₃',
    hint: 'Criss-cross: Al gets subscript 2, SO₄ gets subscript 3 inside brackets.',
    misconceptionId: 'm3_brackets'
  },
  {
    id: 4,
    nodeId: NODE_C9_CHEM_004,
    title: 'Balancing Chemical Equations',
    description: 'Apply Conservation of Mass to balance atom counts.',
    prompt: 'Balance the reaction: _ Fe + _ H₂O → 1 Fe₃O₄ + _ H₂. What is the coefficient for Fe and H₂O?',
    type: 'balance',
    options: ['1 Fe, 2 H₂O', '3 Fe, 4 H₂O', '2 Fe, 3 H₂O', '3 Fe, 2 H₂O'],
    correctAnswer: '3 Fe, 4 H₂O',
    hint: 'Fe₃O₄ needs 3 Fe atoms and 4 Oxygen atoms (which requires 4 H₂O).',
    misconceptionId: 'm4_subscripts'
  },
  {
    id: 5,
    nodeId: NODE_C9_CHEM_005,
    title: 'Relative Molecular Mass (Carbon-12 Standard)',
    description: 'Compute molecular mass based on standard atomic masses.',
    prompt: 'Calculate the Relative Molecular Mass of Calcium Carbonate (CaCO₃). (Atomic masses: Ca=40, C=12, O=16)',
    type: 'mass_calc',
    options: ['68', '84', '100', '116'],
    correctAnswer: '100',
    hint: 'RMM = 40 + 12 + 3 × 16 = 40 + 12 + 48 = 100.',
    misconceptionId: 'm5_units'
  },
  {
    id: 6,
    nodeId: NODE_C9_CHEM_006,
    title: 'Percentage Composition of Compounds',
    description: 'Calculate mass share percentage of an element in a compound.',
    prompt: 'What is the percentage of Oxygen by mass in Water (H₂O)? (Atomic masses: H=1, O=16)',
    type: 'mass_calc',
    options: ['11.11%', '33.33%', '66.67%', '88.89%'],
    correctAnswer: '88.89%',
    hint: 'Percentage of Oxygen = (16 / 18) × 100 = 88.89%. Mass matters, not atom count!',
    misconceptionId: 'm6_atomcount'
  },
  {
    id: 7,
    nodeId: NODE_C9_CHEM_007,
    title: 'Direct Combination (Synthesis)',
    description: 'Identify single product formation A + B → AB.',
    prompt: 'When Quicklime (CaO) reacts with Water (H₂O), what single product is formed?',
    type: 'reaction_predict',
    options: ['Ca + H₂O₂', 'Ca(OH)₂ (Slaked Lime)', 'CaCO₃', 'CaO₂ + H₂'],
    correctAnswer: 'Ca(OH)₂ (Slaked Lime)',
    hint: 'Direct combination of two compounds yields a single hydroxidic product.',
    misconceptionId: 'm7_reagents'
  },
  {
    id: 8,
    nodeId: NODE_C9_CHEM_008,
    title: 'Decomposition Reactions',
    description: 'Distinguish Thermal, Electrolytic, and Photochemical decomposition.',
    prompt: 'Exposure of white Silver Chloride (AgCl) to sunlight causes it to darken to grey. What type of decomposition is this?',
    type: 'mcq',
    options: ['Thermal Decomposition', 'Electrolytic Decomposition', 'Photochemical Decomposition', 'Double Decomposition'],
    correctAnswer: 'Photochemical Decomposition',
    hint: 'Reactions driven by light energy (sunlight) are photochemical reactions.',
    misconceptionId: 'm8_light'
  },
  {
    id: 9,
    nodeId: NODE_C9_CHEM_009,
    title: 'Displacement Reactions & Activity Series',
    description: 'Predict whether a metal can displace another based on reactivity.',
    prompt: 'What observation occurs when an Iron nail (Fe) is placed in blue Copper Sulphate (CuSO₄) solution?',
    type: 'reaction_predict',
    options: [
      'No reaction because Iron is less reactive than Copper.',
      'Blue solution turns light green (FeSO₄) and reddish-brown Copper deposits.',
      'Solution turns deep yellow and bubbles of Hydrogen gas evolve.',
      'White precipitate of Iron Oxide forms instantly.'
    ],
    correctAnswer: 'Blue solution turns light green (FeSO₄) and reddish-brown Copper deposits.',
    hint: 'Iron is more reactive than Copper, displacing Cu²⁺ to form green FeSO₄.',
    misconceptionId: 'm9_reverse'
  },
  {
    id: 10,
    nodeId: NODE_C9_CHEM_010,
    title: 'Double Displacement & Precipitates',
    description: 'Identify partner swap AB + CD → AD + CB and precipitate colors.',
    prompt: 'Mixing clear Lead Nitrate [Pb(NO₃)₂] with clear Potassium Iodide (KI) produces a vibrant solid precipitate. What is its formula and color?',
    type: 'mcq',
    options: [
      'PbI₂ - White precipitate',
      'PbI₂ - Bright Yellow precipitate',
      'KNO₃ - White precipitate',
      'Pb(NO₃)₂ - Red precipitate'
    ],
    correctAnswer: 'PbI₂ - Bright Yellow precipitate',
    hint: 'Lead Iodide (PbI₂) is a famous bright yellow insoluble salt.',
    misconceptionId: 'm10_solubility'
  }
];

// --- DISCOVERY PREDICT QUESTION ---
const DISCOVERY_QUESTION = {
  prompt: "If you place a silver-grey Zinc metal strip into a brilliant sky-blue Copper Sulphate solution, what will happen over 10 minutes?",
  options: [
    { text: "Nothing happens because metals do not react with salt solutions.", correct: false, feedback: "Incorrect! Reactivity differences drive displacement." },
    { text: "The blue solution turns completely transparent, and reddish-brown copper metal coats the zinc strip.", correct: true, feedback: "Spot on! Zinc is more reactive than copper. It displaces copper, forming clear ZnSO4!" },
    { text: "The beaker explodes instantly into flames.", correct: false, feedback: "Incorrect! This is a single-displacement reaction in solution, not an explosive reaction." }
  ]
};

const MISCONCEPTIONS_CHECKLIST: Misconception[] = [
  {
    id: "misc_1",
    title: "Chemical symbols can be written using all capital letters",
    description: "Students believe that both letters of a two-letter chemical symbol can be written in uppercase without altering its fundamental meaning.",
    correction: "According to IUPAC rules, the first letter of a chemical symbol is always uppercase, while the second letter must be lowercase. Writing both letters in uppercase changes the representation from an element to a chemical compound, such as CO for carbon monoxide instead of Co for cobalt.",
  },
  {
    id: "misc_2",
    title: "Element symbols are always derived from their English names",
    description: "Students assume that every element's chemical symbol is simply formed using the first one or two letters of its standard English name.",
    correction: "While many symbols follow this pattern, several elements derive their symbols from their Latin, Greek, or German names. For instance, Sodium has the symbol Na from its Latin name Natrium, and Potassium uses K from Kalium.",
  },
  {
    id: "misc_3",
    title: "An element's chemical symbol indicates its combining capacity directly",
    description: "Students often confuse an element's chemical symbol with its valency, assuming the symbol itself directly shows its combining capacity or charge.",
    correction: "A chemical symbol is merely a standardized shorthand notation used to represent one atom of an element. Valency is a property determined by the number of valence electrons involved in bond formation and is not explicitly displayed within the element's symbol.",
  },
  {
    id: "misc_4",
    title: "Symbols of diatomic elements must always include subscript numbers",
    description: "Students frequently confuse atomic symbols with molecular formulas, believing the official symbol for elements like oxygen or hydrogen is O2 or H2.",
    correction: "An element's chemical symbol represents a single atom, such as O for oxygen or H for hydrogen. Notation like O2 represents a diatomic molecule consisting of two bonded oxygen atoms, which is a molecular formula rather than the atomic symbol.",
  },
  {
    id: "misc_5",
    title: "Chemical symbols can vary across different countries and languages",
    description: "Students think chemical symbols change based on local language translations of element names in different regions of the world.",
    correction: "The International Union of Pure and Applied Chemistry (IUPAC) standardizes chemical symbols globally to ensure universal scientific communication. Although an element's full name may vary across different languages, its chemical symbol remains identical in every periodic table worldwide.",
  },
];

export default function C9_ChemistrySymbolsofelementsSim({ onComplete }: { onComplete?: (score: number) => void }) {
  // --- STATE ---
  const [activeTab, setActiveTab] = useState<'discovery' | 'learn' | 'lab' | 'challenges' | 'summary'>('discovery');
  const [discoveryAnswered, setDiscoveryAnswered] = useState<boolean>(false);
  const [discoverySelectedIndex, setDiscoverySelectedIndex] = useState<number | null>(null);

  // Slides State
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);

  // Challenge State
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [challengeFeedback, setChallengeFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);
  const [score, setScore] = useState<number>(0);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [sparklePos, setSparklePos] = useState({ x: 400, y: 300 });

  // Hint State
  const [showHint, setShowHint] = useState<boolean>(false);

  // Interactive Sandboxes State
  // 1. Symbol Builder State
  const [selectedElemSymbol, setSelectedElemSymbol] = useState<string>('Na');
  const [customCasingInput, setCustomCasingInput] = useState<string>('');
  const [casingValidationMsg, setCasingValidationMsg] = useState<string>('');

  // 2. Criss Cross State
  const [selectedCation, setSelectedCation] = useState<string>('Al'); // Al or Ca or Na
  const [selectedAnion, setSelectedAnion] = useState<string>('SO4'); // SO4 or Cl or CO3

  // 3. Balancing Simulator State
  const [balCoeffs, setBalCoeffs] = useState<{ [key: string]: number }>({ Fe: 1, H2O: 1, Fe3O4: 1, H2: 1 });

  // 4. Reaction Simulator State
  const [selectedRxnId, setSelectedRxnId] = useState<string>('rxn_disp_1');
  const [isRxnSimulating, setIsRxnSimulating] = useState<boolean>(false);
  const [rxnProgress, setRxnProgress] = useState<number>(0);

  // SRS & BKT Tracker State
  const [bktStates, setBktStates] = useState<Record<string, ReturnType<typeof createBKTState>>>(() => {
    const initial: Record<string, ReturnType<typeof createBKTState>> = {};
    ALL_NODE_IDS.forEach(id => {
      initial[id] = createBKTState();
    });
    return initial;
  });

  // --- AUDIO & SPEECH HANDLERS ---
  const playSound = useCallback((soundName: SoundEffect | 'success' | 'error' | 'celebration' | 'hint' | 'pickup' | 'drop-correct' | 'drop-wrong' | 'whoosh' | 'sparkle' | 'chime' | 'pop' | 'count' | 'balance' | 'swoop') => {
    try {
      audioManager.play(soundName);
    } catch {
      // Audio fallback silent
    }
  }, []);

  const speakText = useCallback((text: string) => {
    try {
      speechManager.speak(text);
      speechManager.speak('Great job! Keep going.');
      speechManager.speak('Let us try the next one.');
      speechManager.speak('Remember the key concept.');
      speechManager.speak('You are doing well!');
    } catch {
      // Speech fallback silent
    }
  }, []);

  // --- AUTO HINT TIMER ---
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!showHint && activeTab === 'challenges') {
        setShowHint(true);
        playSound('hint');
      }
    }, 12000);
    return () => clearTimeout(timer);
  }, [currentChallengeIndex, activeTab, showHint, playSound]);

  // --- REACTION SIMULATION ANIMATION LOOP ---
  useEffect(() => {
    let animFrame: number;
    if (isRxnSimulating) {
      const start = Date.now();
      const duration = 2500;
      const step = () => {
        const elapsed = Date.now() - start;
        const p = Math.min(1, elapsed / duration);
        setRxnProgress(p);
        if (p < 1) {
          animFrame = requestAnimationFrame(step);
        } else {
          setIsRxnSimulating(false);
          playSound('chime');
          speakText("Reaction simulation complete! Notice the visual change.");
        }
      };
      animFrame = requestAnimationFrame(step);
    }
    return () => cancelAnimationFrame(animFrame);
  }, [isRxnSimulating, playSound, speakText]);

  // --- HELPER DERIVATIONS ---
  const currentChallenge = CHALLENGES[currentChallengeIndex];

  // Derive Criss Cross Result
  const crissCrossResult = useMemo(() => {
    const catIsRadical = selectedCation in RADICALS_DATA;
    const catValency = catIsRadical ? RADICALS_DATA[selectedCation].valency : ELEMENTS_DATA[selectedCation]?.valency || 1;
    const catSymbol = catIsRadical ? RADICALS_DATA[selectedCation].name : selectedCation;

    const aniIsRadical = selectedAnion in RADICALS_DATA;
    const aniValency = aniIsRadical ? RADICALS_DATA[selectedAnion].valency : ELEMENTS_DATA[selectedAnion]?.valency || 1;
    const aniFormulaStr = aniIsRadical ? RADICALS_DATA[selectedAnion].formula.replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻]/g, '') : selectedAnion;

    // Simplify ratio
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
    const factor = gcd(catValency, aniValency);
    const catSub = aniValency / factor;
    const aniSub = catValency / factor;

    // Formatting formula
    let finalCatPart = catSymbol;
    if (catSub > 1) {
      finalCatPart = catIsRadical ? `(${catSymbol})` : catSymbol;
      finalCatPart += catSub;
    }

    let finalAniPart = aniFormulaStr;
    if (aniSub > 1) {
      finalAniPart = aniIsRadical ? `(${aniFormulaStr})` : aniFormulaStr;
      finalAniPart += aniSub;
    }

    const formulaClean = `${catSub > 1 ? (catIsRadical ? `(${catSymbol})` : catSymbol) + catSub : catSymbol}${
      aniSub > 1 ? (aniIsRadical ? `(${aniFormulaStr})` : aniFormulaStr) + aniSub : aniFormulaStr
    }`;

    return {
      catValency,
      aniValency,
      catSub,
      aniSub,
      formula: formulaClean
    };
  }, [selectedCation, selectedAnion]);

  // Derive Atom Counts for Balancing Simulation
  const balAtomCounts = useMemo(() => {
    // 3 Fe + 4 H2O -> 1 Fe3O4 + 4 H2
    const leftFe = (balCoeffs['Fe'] || 1) * 1;
    const leftH = (balCoeffs['H2O'] || 1) * 2;
    const leftO = (balCoeffs['H2O'] || 1) * 1;

    const rightFe = (balCoeffs['Fe3O4'] || 1) * 3;
    const rightH = (balCoeffs['H2'] || 1) * 2;
    const rightO = (balCoeffs['Fe3O4'] || 1) * 4;

    const isBalanced = leftFe === rightFe && leftH === rightH && leftO === rightO;

    return { leftFe, leftH, leftO, rightFe, rightH, rightO, isBalanced };
  }, [balCoeffs]);

  // --- ACTIONS ---
  const handleDiscoverySubmit = (idx: number) => {
    setDiscoverySelectedIndex(idx);
    setDiscoveryAnswered(true);
    const isCorr = DISCOVERY_QUESTION.options[idx].correct;
    if (isCorr) {
      playSound('success');
      speakText("Correct discovery! Displacement reactions exchange atoms dynamically.");
    } else {
      playSound('error');
      speakText("Not quite! Let's explore how chemical elements interact in the interactive slides.");
    }
  };

  const handleCasingCheck = () => {
    playSound('tap');
    if (!customCasingInput) {
      setCasingValidationMsg('Please enter a symbol above to validate!');
      return;
    }
    if (customCasingInput.length === 1) {
      if (customCasingInput === customCasingInput.toUpperCase()) {
        setCasingValidationMsg(`Valid single-letter IUPAC symbol! '${customCasingInput}' is uppercase.`);
        playSound('pop');
      } else {
        setCasingValidationMsg(`Invalid! Single letter symbols like '${customCasingInput.toUpperCase()}' must be CAPITAL.`);
        playSound('drop-wrong');
      }
    } else if (customCasingInput.length === 2) {
      const first = customCasingInput[0];
      const second = customCasingInput[1];
      if (first === first.toUpperCase() && second === second.toLowerCase()) {
        setCasingValidationMsg(`Perfect IUPAC formatting! First letter '${first}' is CAPITAL, second '${second}' is lowercase.`);
        playSound('drop-correct');
      } else {
        setCasingValidationMsg(`Incorrect Casing! '${customCasingInput}' violates IUPAC. Must be '${first.toUpperCase()}${second.toLowerCase()}'.`);
        playSound('drop-wrong');
      }
    } else {
      setCasingValidationMsg('Chemical symbols are strictly 1 or 2 letters!');
      playSound('drop-wrong');
    }
  };

  const handleChallengeSubmit = (selectedOpt: string) => {
    setShowHint(false);
    const isCorrect = selectedOpt === currentChallenge.correctAnswer;
    setUserAnswers(prev => ({ ...prev, [currentChallengeIndex]: selectedOpt }));

    // Update BKT & SRS
    const nodeId = currentChallenge.nodeId;
    const updatedBKT = bktUpdate(bktStates[nodeId] || createBKTState(), isCorrect);
    setBktStates(prev => ({ ...prev, [nodeId]: updatedBKT }));

    const reviewItem = createReviewItem(currentChallenge.id.toString(), 'Chemistry');
    sm2Update(reviewItem, isCorrect ? 5 : 2, 0);

    if (isCorrect) {
      playSound('success');
      playSound('sparkle');
      setShowSparkle(true);
      setSparklePos({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
      setScore(prev => prev + 10);
      setChallengeFeedback({ isCorrect: true, text: 'Spot on! Perfect mastery of chemical rules.' });
      speakText('Excellent work! Answer is completely correct.');
    } else {
      playSound('error');
      setChallengeFeedback({
        isCorrect: false,
        text: `Incorrect. ${currentChallenge.hint}`
      });
      speakText(`That is incorrect. ${currentChallenge.hint}`);
    }
  };

  const handleNextChallenge = () => {
    setChallengeFeedback(null);
    setShowSparkle(false);
    if (currentChallengeIndex < CHALLENGES.length - 1) {
      setCurrentChallengeIndex(prev => prev + 1);
      playSound('swoop');
    } else {
      setActiveTab('summary');
      setShowConfetti(true);
      setShowSuccessBanner(true);
      playSound('celebration');
      speakText("Congratulations! You have completed all Class 9 Chemistry challenges.");
      // Record global score
      recordGameScore(Object.values(ALL_NODE_IDS), score + 10);
      if (onComplete) onComplete(score + 10);
    }
  };

  // --- RENDER HELPERS ---
  const currentElemData = ELEMENTS_DATA[selectedElemSymbol] || ELEMENTS_DATA['Na'];
  const activeRxnDef = REACTIONS_DATA.find(r => r.id === selectedRxnId) || REACTIONS_DATA[0];

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 font-sans p-4 md:p-8 flex flex-col items-center select-none">
      {/* HEADER BAR */}
      <header className="w-full max-w-6xl flex flex-col md:flex-row justify-between items-center bg-slate-900/80 backdrop-blur-md border border-slate-800 p-4 rounded-2xl mb-6 shadow-xl gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gold-600/30 border border-gold-500/50 rounded-xl flex items-center justify-center text-2xl font-black text-gold-400">
            ⚛️
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-gold-400 via-gold-300 to-emerald-400 bg-clip-text text-transparent">
              Class 9 ICSE Chemistry Laboratory
            </h1>
            <p className="text-xs text-slate-400">Mastering Symbols, Formulae, Masses & Reaction Dynamics</p>
          </div>
        </div>

        {/* NAVIGATION TABS */}
        <nav className="flex flex-wrap gap-2 bg-slate-950/60 p-1.5 rounded-xl border border-slate-800">
          <button
            onClick={() => {audioManager.play('tap');  setActiveTab('discovery'); playSound('tap'); }}
            className={`px-3 py-1.5 rounded-lg text-xs md:text-sm font-semibold transition-all ${
              activeTab === 'discovery' ? 'bg-gold-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            🔍 Predict
          </button>
          <button
            onClick={() => {audioManager.play('tap');  setActiveTab('learn'); playSound('tap'); }}
            className={`px-3 py-1.5 rounded-lg text-xs md:text-sm font-semibold transition-all ${
              activeTab === 'learn' ? 'bg-gold-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            📚 Visual Lessons
          </button>
          <button
            onClick={() => {audioManager.play('tap');  setActiveTab('lab'); playSound('tap'); }}
            className={`px-3 py-1.5 rounded-lg text-xs md:text-sm font-semibold transition-all ${
              activeTab === 'lab' ? 'bg-gold-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            🧪 Interactive Lab
          </button>
          <button
            onClick={() => {audioManager.play('tap');  setActiveTab('challenges'); playSound('tap'); }}
            className={`px-3 py-1.5 rounded-lg text-xs md:text-sm font-semibold transition-all ${
              activeTab === 'challenges' ? 'bg-gold-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            🎯 Mastery Challenges
          </button>
        </nav>

        {/* SCORE & PROGRESS */}
        <div className="flex items-center gap-4 bg-slate-950 px-4 py-2 rounded-xl border border-slate-800">
          <div className="flex items-center gap-1.5">
            <span className="text-amber-400 text-base">⭐</span>
            <span className="text-sm font-bold text-slate-200">{score} pts</span>
          </div>
          <div className="h-4 w-px bg-slate-800" />
          <div className="text-xs text-gold-400 font-medium">
            Mastery: {Math.round((Object.values(bktStates).reduce((acc, curr) => acc + curr.pKnown, 0) / ALL_NODE_IDS.length) * 100)}%
          </div>
        </div>
      </header>

      {/* FEEDBACK OVERLAYS */}
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccessBanner} text="Mastery Unlocked! ICSE Chemistry Champion!" />
      <SparkleBurst show={showSparkle} x={sparklePos.x} y={sparklePos.y} />

      {/* MAIN CONTAINER */}
      <main className="w-full max-w-6xl flex-1 flex flex-col items-center">
        {/* ================= TAB 1: DISCOVERY ================= */}
        {activeTab === 'discovery' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-10 flex flex-col items-center text-center shadow-2xl"
          >
            <div className="inline-block px-3 py-1 bg-gold-500/10 border border-gold-500/30 text-gold-400 rounded-full text-xs font-semibold mb-4">
              DISCOVERY QUESTION — PREDICT BEFORE LEARNING
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-100 max-w-2xl mb-6">
              {DISCOVERY_QUESTION.prompt}
            </h2>

            {/* Visual beaker comparison */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 my-6 w-full max-w-3xl">
              <div className="flex flex-col items-center bg-slate-950 p-6 rounded-2xl border border-slate-800 w-full md:w-1/2">
                <span className="text-xs font-bold text-gold-400 mb-2">BEFORE REACTION</span>
                <svg className="w-32 h-40" viewBox="0 0 100 120">
                  <path d="M 20 20 L 20 100 Q 20 110 50 110 Q 80 110 80 100 L 80 20" fill="none" stroke="#64748b" strokeWidth="4" />
                  {/* Blue liquid CuSO4 */}
                  <path d="M 22 45 L 22 98 Q 22 108 50 108 Q 78 108 78 98 L 78 45 Z" fill="#0284c7" opacity="0.85" />
                  {/* Zinc strip */}
                  <rect x="42" y="10" width="16" height="80" rx="2" fill="#94a3b8" stroke="#cbd5e1" strokeWidth="2" />
                  <text x="50" y="55" fill="#0f172a" fontSize="10" fontWeight="bold" textAnchor="middle">Zn</text>
                  <text x="50" y="85" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">CuSO₄ (Blue)</text>
                </svg>
              </div>

              <div className="text-2xl text-slate-500 font-bold">➔</div>

              <div className="flex flex-col items-center bg-slate-950 p-6 rounded-2xl border border-slate-800 w-full md:w-1/2">
                <span className="text-xs font-bold text-emerald-400 mb-2">AFTER 10 MINUTES</span>
                <svg className="w-32 h-40" viewBox="0 0 100 120">
                  <path d="M 20 20 L 20 100 Q 20 110 50 110 Q 80 110 80 100 L 80 20" fill="none" stroke="#64748b" strokeWidth="4" />
                  {/* Clear liquid ZnSO4 */}
                  <path d="M 22 45 L 22 98 Q 22 108 50 108 Q 78 108 78 98 L 78 45 Z" fill="#e2e8f0" opacity="0.35" />
                  {/* Zinc strip with Copper coating */}
                  <rect x="42" y="10" width="16" height="80" rx="2" fill="#94a3b8" stroke="#cbd5e1" strokeWidth="2" />
                  <rect x="40" y="50" width="20" height="42" fill="#b45309" opacity="0.9" rx="2" />
                  <text x="50" y="75" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">Cu (Deposit)</text>
                  <text x="50" y="102" fill="#94a3b8" fontSize="8" fontWeight="bold" textAnchor="middle">ZnSO₄ (Clear)</text>
                </svg>
              </div>
            </div>

            {/* Options */}
            <div className="w-full max-w-2xl flex flex-col gap-3 my-4">
              {DISCOVERY_QUESTION.options.map((opt, idx) => {
                const isSelected = discoverySelectedIndex === idx;
                let btnStyle = "bg-slate-950 hover:bg-slate-800 border-slate-800 text-slate-200";
                if (discoveryAnswered) {
                  if (opt.correct) btnStyle = "bg-emerald-950/80 border-emerald-500 text-emerald-200";
                  else if (isSelected) btnStyle = "bg-rose-950/80 border-rose-500 text-rose-200";
                }
                return (
                  <button
                    key={idx}
                    disabled={discoveryAnswered}
                    onClick={() => handleDiscoverySubmit(idx)}
                    className={`w-full p-4 rounded-xl border text-left font-medium transition-all text-sm md:text-base flex items-center justify-between ${btnStyle}`}
                  >
                    <span>{opt.text}</span>
                    {discoveryAnswered && opt.correct && <span className="text-emerald-400 text-xl font-bold">✓</span>}
                  </button>
                );
              })}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 flex flex-col items-center">
                <p className="text-sm text-slate-300 max-w-xl bg-slate-950 p-4 rounded-xl border border-slate-800 mb-6">
                  {DISCOVERY_QUESTION.options[discoverySelectedIndex!].feedback}
                </p>
                <button
                  onClick={() => {audioManager.play('tap');  setActiveTab('learn'); playSound('swoop'); }}
                  className="px-6 py-3 bg-gradient-to-r from-gold-500 to-gold-500 hover:from-gold-600 hover:to-gold-600 font-bold rounded-xl text-white shadow-lg shadow-gold-500/20 transition-all"
                >
                  Explore Interactive Visual Lessons ➔
                </button>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* ================= TAB 2: VISUAL LESSONS (SLIDES) ================= */}
        {activeTab === 'learn' && (
          <div className="w-full flex flex-col gap-6">
            {/* Slide Navigation Header */}
            <div className="flex flex-wrap items-center justify-between bg-slate-900 border border-slate-800 p-4 rounded-2xl gap-4">
              <span className="text-sm font-semibold text-slate-400">
                Lesson Module {currentSlideIndex + 1} of 5
              </span>
              <div className="flex gap-2">
                {['1. Symbols & IUPAC', '2. Valency & Radicals', '3. Formulae Criss-Cross', '4. Equations & Mass', '5. Reaction Types'].map((title, idx) => (
                  <button
                    key={idx}
                    onClick={() => {audioManager.play('tap');  setCurrentSlideIndex(idx); playSound('tap'); }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      currentSlideIndex === idx ? 'bg-gold-600 text-white' : 'bg-slate-950 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {title}
                  </button>
                ))}
              </div>
            </div>

            {/* Slide Content Box */}
            <div className="bg-slate-900/90 border border-slate-800 p-6 md:p-8 rounded-3xl min-h-[500px] flex flex-col justify-between shadow-2xl">
              {/* SLIDE 1: SYMBOLS & IUPAC */}
              {currentSlideIndex === 0 && (
                <div className="flex flex-col gap-6">
                  <div className="border-b border-slate-800 pb-3">
                    <h3 className="text-2xl font-bold text-gold-400">1. Symbols of Elements & IUPAC Rules</h3>
                    <p className="text-xs text-slate-400 mt-1">Node: c9_chem_001</p>
                  </div>

                  <p className="text-sm md:text-base text-slate-300 leading-relaxed">
                    A chemical symbol is a short, internationally accepted shorthand for an atom of an element. IUPAC mandates a strict casing rule:
                    <strong className="text-amber-400"> The first letter is ALWAYS UPPERCASE, and the second letter (if present) MUST be lowercase.</strong>
                  </p>

                  {/* Interactive Symbol Origin Explorer */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Latin Origin vs English Name</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {Object.values(ELEMENTS_DATA).filter(e => e.latinName).map(e => (
                          <div
                            key={e.symbol}
                            onClick={() => setSelectedElemSymbol(e.symbol)}
                            className={`p-3 rounded-xl border cursor-pointer transition-all flex flex-col items-center ${
                              selectedElemSymbol === e.symbol ? 'bg-gold-950 border-gold-500 shadow-md scale-105' : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                            }`}
                          >
                            <span className="text-xl font-black text-gold-400">{e.symbol}</span>
                            <span className="text-xs font-bold text-slate-200">{e.name}</span>
                            <span className="text-[10px] text-amber-400 italic">Latin: {e.latinName}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Interactive Casing Checker Sandbox */}
                    <div className="flex flex-col justify-between bg-slate-900 p-4 rounded-xl border border-slate-800">
                      <div>
                        <h4 className="text-xs font-bold text-gold-400 uppercase tracking-wider mb-2">IUPAC Casing Tester Sandbox</h4>
                        <p className="text-xs text-slate-400 mb-4">Try typing a symbol (e.g., Na, CL, co, CO):</p>

                        <div className="flex gap-2 mb-3">
                          <input
                            type="text"
                            maxLength={2}
                            value={customCasingInput}
                            onChange={e => setCustomCasingInput(e.target.value)}
                            placeholder="e.g. Na"
                            className="bg-slate-950 border border-slate-700 px-3 py-2 rounded-lg text-lg font-bold text-center w-24 text-slate-100 focus:outline-none focus:border-gold-500"
                          />
                          <button
                            onClick={handleCasingCheck}
                            className="px-4 py-2 bg-gold-600 hover:bg-gold-500 text-white font-semibold rounded-lg text-sm transition-all"
                          >
                            Validate IUPAC
                          </button>
                        </div>
                        {casingValidationMsg && (
                          <div className="p-3 bg-slate-950 rounded-lg text-xs font-medium text-gold-300 border border-gold-900/50">
                            {casingValidationMsg}
                          </div>
                        )}
                      </div>

                      <div className="mt-4 p-3 bg-rose-950/30 border border-rose-900/50 rounded-lg text-xs text-rose-300">
                        <strong>Critical Distinction:</strong> <span className="font-mono text-rose-200 font-bold">Co</span> = Element Cobalt metal. <span className="font-mono text-rose-200 font-bold">CO</span> = Compound Carbon Monoxide gas!
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 2: VALENCY & RADICALS */}
              {currentSlideIndex === 1 && (
                <div className="flex flex-col gap-6">
                  <div className="border-b border-slate-800 pb-3">
                    <h3 className="text-2xl font-bold text-emerald-400">2. Valency & Charged Radicals</h3>
                    <p className="text-xs text-slate-400 mt-1">Node: c9_chem_002</p>
                  </div>

                  <p className="text-sm md:text-base text-slate-300 leading-relaxed">
                    <strong className="text-emerald-400">Valency</strong> is the combining capacity of an atom (how many "hands" it has).
                    A <strong className="text-gold-400">Radical</strong> is a group of atoms carrying a net charge that behaves as a single chemical unit in reactions.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                    {/* Valency Hands Visualizer */}
                    <div className="flex flex-col items-center justify-center p-4 bg-slate-900 rounded-xl border border-slate-800">
                      <span className="text-xs font-bold text-slate-400 uppercase mb-4">Combining Power ("Hands" Analogy)</span>
                      <div className="flex flex-wrap justify-center gap-4">
                        {[
                          { sym: 'H', val: 1, color: '#38bdf8' },
                          { sym: 'O', val: 2, color: '#f87171' },
                          { sym: 'N', val: 3, color: '#60a5fa' },
                          { sym: 'C', val: 4, color: '#94a3b8' }
                        ].map(item => (
                          <div key={item.sym} className="flex flex-col items-center bg-slate-950 p-3 rounded-xl border border-slate-800">
                            <div
                              className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-black text-slate-950 shadow-md mb-2"
                              style={{ backgroundColor: item.color }}
                            >
                              {item.sym}
                            </div>
                            <span className="text-xs font-bold text-slate-300">Valency: {item.val}</span>
                            <div className="flex gap-1 mt-1">
                              {Array.from({ length: item.val }).map((_, i) => (
                                <span key={i} className="text-amber-400 text-xs">🤝</span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Polyatomic Radicals Table */}
                    <div className="flex flex-col gap-2">
                      <span className="text-xs font-bold text-gold-400 uppercase">Key ICSE Radicals</span>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        {Object.entries(RADICALS_DATA).map(([key, rad]) => (
                          <div key={key} className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 flex justify-between items-center">
                            <div>
                              <span className="font-bold text-slate-200">{rad.name}</span>
                              <div className="text-[11px] text-slate-400 font-mono">{rad.formula}</div>
                            </div>
                            <span className="px-2 py-0.5 bg-gold-950 border border-gold-800 text-gold-300 font-bold rounded">
                              Val: {rad.valency}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 3: FORMULAE CRISS-CROSS */}
              {currentSlideIndex === 2 && (
                <div className="flex flex-col gap-6">
                  <div className="border-b border-slate-800 pb-3">
                    <h3 className="text-2xl font-bold text-gold-400">3. Writing Compound Formulae (Criss-Cross Method)</h3>
                    <p className="text-xs text-slate-400 mt-1">Node: c9_chem_003</p>
                  </div>

                  <p className="text-sm md:text-base text-slate-300 leading-relaxed">
                    To write a chemical formula, write cations first then anions, swap their numerical valencies as subscripts, simplify ratios to lowest whole numbers, and <strong className="text-amber-400 font-bold">enclose polyatomic radicals in brackets</strong> if subscript &gt; 1!
                  </p>

                  {/* Interactive Criss-Cross Builder */}
                  <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Cation selector */}
                      <div>
                        <span className="text-xs font-bold text-amber-400 uppercase block mb-2">1. Select Positive Ion (Cation)</span>
                        <div className="flex gap-2">
                          {['Na', 'Ca', 'Al', 'NH4'].map(cat => (
                            <button
                              key={cat}
                              onClick={() => {audioManager.play('tap');  setSelectedCation(cat); playSound('tap'); }}
                              className={`px-3 py-2 rounded-xl border text-sm font-bold transition-all ${
                                selectedCation === cat ? 'bg-amber-500 text-slate-950 border-amber-400' : 'bg-slate-900 border-slate-800 text-slate-300'
                              }`}
                            >
                              {cat} ({cat === 'NH4' ? '1+' : ELEMENTS_DATA[cat]?.valency + '+'})
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Anion selector */}
                      <div>
                        <span className="text-xs font-bold text-gold-400 uppercase block mb-2">2. Select Negative Ion (Anion)</span>
                        <div className="flex gap-2">
                          {['Cl', 'OH', 'CO3', 'SO4'].map(ani => (
                            <button
                              key={ani}
                              onClick={() => { setSelectedAnion(ani); playSound('tap'); }}
                              className={`px-3 py-2 rounded-xl border text-sm font-bold transition-all ${
                                selectedAnion === ani ? 'bg-gold-500 text-slate-950 border-gold-400' : 'bg-slate-900 border-slate-800 text-slate-300'
                              }`}
                            >
                              {ani} ({ani === 'Cl' ? '1-' : RADICALS_DATA[ani]?.valency + '-'})
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Criss-Cross Visual Display */}
                    <div className="flex flex-col items-center bg-slate-900 p-6 rounded-xl border border-slate-800">
                      <div className="flex items-center gap-8 text-xl font-mono font-bold text-slate-200 mb-4">
                        <div className="flex flex-col items-center">
                          <span className="text-amber-400 text-2xl">{selectedCation}</span>
                          <span className="text-xs text-amber-300">Valency: {crissCrossResult.catValency}</span>
                        </div>
                        <span className="text-slate-600 text-3xl">✕</span>
                        <div className="flex flex-col items-center">
                          <span className="text-gold-400 text-2xl">{selectedAnion}</span>
                          <span className="text-xs text-gold-300">Valency: {crissCrossResult.aniValency}</span>
                        </div>
                      </div>

                      <div className="w-full h-px bg-slate-800 my-2" />

                      <div className="flex flex-col items-center">
                        <span className="text-xs text-slate-400 font-sans uppercase mb-1">Generated Formula</span>
                        <span className="text-3xl font-black font-mono text-emerald-400 tracking-wider">
                          {crissCrossResult.formula}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 4: EQUATIONS & MASS */}
              {currentSlideIndex === 3 && (
                <div className="flex flex-col gap-6">
                  <div className="border-b border-slate-800 pb-3">
                    <h3 className="text-2xl font-bold text-purple-400">4. Balancing Equations & Mass Calculations</h3>
                    <p className="text-xs text-slate-400 mt-1">Nodes: c9_chem_004, c9_chem_005, c9_chem_006</p>
                  </div>

                  <p className="text-sm md:text-base text-slate-300 leading-relaxed">
                    Chemical equations respect the <strong className="text-purple-400">Law of Conservation of Mass</strong>: matter is neither created nor destroyed.
                    Molecular masses compare molecules against the <strong className="text-amber-400 font-bold">Carbon-12 standard (1/12th mass of C-12 = 1 amu)</strong>.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                    {/* Interactive Mass & Percentage Calculator */}
                    <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                      <h4 className="text-xs font-bold text-gold-400 uppercase mb-3">Formula Mass & Percentage Breakdown</h4>
                      <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs flex flex-col gap-2 font-mono">
                        <div className="text-slate-200 font-bold">Water (H₂O):</div>
                        <div>2 × H (1) + 1 × O (16) = 18 amu</div>
                        <div className="h-px bg-slate-800 my-1" />
                        <div className="flex justify-between text-gold-400">
                          <span>% H = (2/18) × 100</span>
                          <span>11.11%</span>
                        </div>
                        <div className="flex justify-between text-rose-400">
                          <span>% O = (16/18) × 100</span>
                          <span>88.89%</span>
                        </div>
                      </div>
                    </div>

                    {/* Interactive Equation Seesaw Preview */}
                    <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
                      <h4 className="text-xs font-bold text-emerald-400 uppercase mb-2">Atom Count Seesaw Check</h4>
                      <p className="text-xs text-slate-400 mb-3">
                        Never change small subscripts inside formulas! Adjust only big coefficients in front!
                      </p>
                      <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-center font-mono text-xs text-emerald-300">
                        2 Mg + O₂ ➔ 2 MgO
                        <div className="text-[10px] text-slate-400 mt-1 font-sans">
                          Left: 2 Mg, 2 O | Right: 2 Mg, 2 O (BALANCED ✓)
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 5: REACTION TYPES */}
              {currentSlideIndex === 4 && (
                <div className="flex flex-col gap-6">
                  <div className="border-b border-slate-800 pb-3">
                    <h3 className="text-2xl font-bold text-rose-400">5. Four Major Types of Reactions</h3>
                    <p className="text-xs text-slate-400 mt-1">Nodes: c9_chem_007, c9_chem_008, c9_chem_009, c9_chem_010</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                      <span className="text-xs font-bold text-amber-400 uppercase block">1. Direct Combination (Synthesis)</span>
                      <span className="font-mono text-sm text-slate-200 block my-1">A + B ➔ AB</span>
                      <p className="text-xs text-slate-400">Two or more reactants combine to form a single product. Example: 2Mg + O₂ ➔ 2MgO.</p>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                      <span className="text-xs font-bold text-emerald-400 uppercase block">2. Decomposition</span>
                      <span className="font-mono text-sm text-slate-200 block my-1">AB ➔ A + B</span>
                      <p className="text-xs text-slate-400">Single reactant splits into simpler products via heat (thermal), light (photo), or electricity (electrolytic).</p>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                      <span className="text-xs font-bold text-gold-400 uppercase block">3. Single Displacement</span>
                      <span className="font-mono text-sm text-slate-200 block my-1">A + BC ➔ AC + B</span>
                      <p className="text-xs text-slate-400">More reactive metal/halogen displaces a less reactive element. Example: Zn + CuSO₄ ➔ ZnSO₄ + Cu.</p>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                      <span className="text-xs font-bold text-purple-400 uppercase block">4. Double Displacement</span>
                      <span className="font-mono text-sm text-slate-200 block my-1">AB + CD ➔ AD + CB</span>
                      <p className="text-xs text-slate-400">Two compounds exchange ions to form insoluble precipitate. Example: Pb(NO₃)₂ + 2KI ➔ PbI₂↓ (Yellow) + 2KNO₃.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Controls */}
              <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-800">
                <button
                  disabled={currentSlideIndex === 0}
                  onClick={() => { setCurrentSlideIndex(prev => prev - 1); playSound('tap'); }}
                  className="px-4 py-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 font-semibold rounded-xl text-xs md:text-sm disabled:opacity-40 transition-all"
                >
                  ◀ Previous Lesson
                </button>

                {currentSlideIndex < 4 ? (
                  <button
                    onClick={() => { setCurrentSlideIndex(prev => prev + 1); playSound('swoop'); }}
                    className="px-6 py-2 bg-gold-600 hover:bg-gold-500 font-bold rounded-xl text-white text-xs md:text-sm transition-all"
                  >
                    Next Lesson ▶
                  </button>
                ) : (
                  <button
                    onClick={() => { setActiveTab('lab'); playSound('swoop'); }}
                    className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 font-bold rounded-xl text-white text-xs md:text-sm transition-all shadow-lg shadow-emerald-600/20"
                  >
                    Open Virtual Reaction Lab 🧪
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 3: INTERACTIVE REACTION LAB ================= */}
        {activeTab === 'lab' && (
          <div className="w-full flex flex-col gap-6">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-2xl flex flex-col gap-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-2xl font-bold text-gold-400">ICSE Chemistry Reaction Simulator</h3>
                  <p className="text-xs text-slate-400">Simulate real reaction dynamics, observation changes, and precipitate formation.</p>
                </div>

                {/* Reaction Selector */}
                <select
                  value={selectedRxnId}
                  onChange={e => { setSelectedRxnId(e.target.value); setRxnProgress(0); playSound('tap'); }}
                  className="bg-slate-950 border border-slate-700 text-slate-100 font-semibold px-4 py-2 rounded-xl text-sm focus:outline-none focus:border-gold-500"
                >
                  {REACTIONS_DATA.map(r => (
                    <option key={r.id} value={r.id}>
                      [{r.type.toUpperCase()}] {r.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* SIMULATOR CANVAS & CONTROLS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Visual Flask / Beaker Animation Canvas */}
                <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col items-center justify-center min-h-[300px] relative overflow-hidden">
                  <span className="absolute top-3 left-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    Visual Reaction Apparatus
                  </span>

                  {/* SVG Beaker Animation */}
                  <svg className="w-48 h-56" viewBox="0 0 100 120">
                    <path d="M 20 20 L 20 100 Q 20 110 50 110 Q 80 110 80 100 L 80 20" fill="none" stroke="#475569" strokeWidth="4" />
                    
                    {/* Liquid fill animated interpolation */}
                    <path
                      d="M 22 40 L 22 98 Q 22 108 50 108 Q 78 108 78 98 L 78 40 Z"
                      fill={activeRxnDef.solutionColorBefore || '#38bdf8'}
                      opacity={0.7 - rxnProgress * 0.3}
                    />

                    {/* Progress Solution Color */}
                    {activeRxnDef.solutionColorAfter && (
                      <path
                        d="M 22 40 L 22 98 Q 22 108 50 108 Q 78 108 78 98 L 78 40 Z"
                        fill={activeRxnDef.solutionColorAfter}
                        opacity={rxnProgress * 0.8}
                      />
                    )}

                    {/* Precipitate Animation */}
                    {activeRxnDef.precipitateColor && rxnProgress > 0.2 && (
                      <motion.g initial={{ opacity: 0 }} animate={{ opacity: rxnProgress }}>
                        <ellipse cx="50" cy="102" rx="25" ry="5" fill={activeRxnDef.precipitateColor} opacity="0.9" />
                        <circle cx="45" cy="98" r="3" fill={activeRxnDef.precipitateColor} />
                        <circle cx="55" cy="99" r="4" fill={activeRxnDef.precipitateColor} />
                        <circle cx="50" cy="95" r="3" fill={activeRxnDef.precipitateColor} />
                      </motion.g>
                    )}

                    {/* Gas Bubbles Animation */}
                    {isRxnSimulating && (
                      <g>
                        <circle cx="40" cy={90 - rxnProgress * 50} r="2.5" fill="#ffffff" opacity="0.7" />
                        <circle cx="55" cy={95 - rxnProgress * 60} r="3" fill="#ffffff" opacity="0.8" />
                        <circle cx="48" cy={85 - rxnProgress * 40} r="2" fill="#ffffff" opacity="0.6" />
                      </g>
                    )}
                  </svg>

                  {/* Trigger Button */}
                  <button
                    disabled={isRxnSimulating}
                    onClick={() => { setIsRxnSimulating(true); setRxnProgress(0); playSound('pop'); }}
                    className="mt-4 px-6 py-2.5 bg-gold-600 hover:bg-gold-500 disabled:opacity-50 text-white font-bold rounded-xl text-sm transition-all shadow-lg shadow-gold-600/20"
                  >
                    {isRxnSimulating ? 'Reaction in Progress...' : '▶ Start Reaction'}
                  </button>
                </div>

                {/* Reaction Details & Observation Panel */}
                <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col justify-between">
                  <div className="flex flex-col gap-4">
                    <div>
                      <span className="text-[10px] font-bold text-gold-400 uppercase tracking-wider block mb-1">
                        Balanced Chemical Equation
                      </span>
                      <div className="text-xl font-mono font-bold text-slate-100 bg-slate-900 p-3 rounded-xl border border-slate-800">
                        {activeRxnDef.equationRaw}
                      </div>
                    </div>

                    {activeRxnDef.condition && (
                      <div>
                        <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block mb-1">
                          Reaction Condition / Catalyst
                        </span>
                        <div className="text-xs font-semibold text-amber-300 bg-amber-950/30 p-2.5 rounded-lg border border-amber-900/50">
                          ⚡ {activeRxnDef.condition}
                        </div>
                      </div>
                    )}

                    <div>
                      <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                        Laboratory Observation
                      </span>
                      <div className="text-xs text-slate-300 leading-relaxed bg-slate-900 p-3 rounded-xl border border-slate-800">
                        {activeRxnDef.observation}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-800 flex justify-between items-center text-xs text-slate-400">
                    <span>Node: <strong className="text-gold-400">{activeRxnDef.nodeId}</strong></span>
                    <span>Type: <strong className="text-slate-200 capitalize">{activeRxnDef.type.replace('_', ' ')}</strong></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 4: MASTERY CHALLENGES ================= */}
        {activeTab === 'challenges' && (
          <div className="w-full flex flex-col gap-6">
            {/* Progress Bar */}
            <div className="w-full bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs font-semibold text-slate-400">
                <span>Challenge {currentChallengeIndex + 1} of {CHALLENGES.length}</span>
                <span className="text-gold-400 font-bold">{currentChallenge.title}</span>
                <span>Node: {currentChallenge.nodeId}</span>
              </div>
              <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-gold-500 to-gold-400 transition-all duration-300"
                  style={{ width: `${((currentChallengeIndex + 1) / CHALLENGES.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Challenge Card */}
            <div className="bg-slate-900 border border-slate-800 p-6 md:p-8 rounded-3xl shadow-2xl flex flex-col gap-6 relative">
              <HintBubble show={showHint} text={currentChallenge.hint} />

              <div className="flex justify-between items-center">
                <span className="px-3 py-1 bg-gold-500/10 border border-gold-500/30 text-gold-400 rounded-full text-xs font-bold">
                  {currentChallenge.nodeId}
                </span>
                <button
                  onClick={() => { setShowHint(prev => !prev); playSound('tap'); }}
                  className="text-xs text-amber-400 font-semibold hover:underline flex items-center gap-1"
                >
                  💡 {showHint ? 'Hide Hint' : 'Need a Hint?'}
                </button>
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-slate-100">
                {currentChallenge.prompt}
              </h3>

              {/* Options list */}
              <div className="flex flex-col gap-3 my-2">
                {currentChallenge.options?.map((opt, idx) => {
                  const isAnswered = userAnswers[currentChallengeIndex] !== undefined;
                  const isSelected = userAnswers[currentChallengeIndex] === opt;
                  const isCorrectOpt = opt === currentChallenge.correctAnswer;

                  let optionStyle = "bg-slate-950 hover:bg-slate-800 border-slate-800 text-slate-200";
                  if (isAnswered) {
                    if (isCorrectOpt) optionStyle = "bg-emerald-950/80 border-emerald-500 text-emerald-200";
                    else if (isSelected) optionStyle = "bg-rose-950/80 border-rose-500 text-rose-200";
                  }

                  return (
                    <button
                      key={idx}
                      disabled={isAnswered}
                      onClick={() => handleChallengeSubmit(opt)}
                      className={`w-full p-4 rounded-xl border text-left font-semibold text-sm md:text-base transition-all flex items-center justify-between ${optionStyle}`}
                    >
                      <span>{opt}</span>
                      {isAnswered && isCorrectOpt && <span className="text-emerald-400 text-lg font-bold">✓</span>}
                    </button>
                  );
                })}
              </div>

              {/* Feedback Alert */}
              {challengeFeedback && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-xl border text-sm font-medium flex flex-col gap-3 ${
                    challengeFeedback.isCorrect ? 'bg-emerald-950/60 border-emerald-800 text-emerald-200' : 'bg-rose-950/60 border-rose-800 text-rose-200'
                  }`}
                >
                  <div>{challengeFeedback.text}</div>

                  <button
                    onClick={handleNextChallenge}
                    className="self-end px-5 py-2 bg-gold-600 hover:bg-gold-500 text-white font-bold rounded-lg text-xs transition-all shadow-md"
                  >
                    {currentChallengeIndex < CHALLENGES.length - 1 ? 'Next Challenge ➔' : 'View Mastery Report 🏆'}
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        )}

        {/* ================= TAB 5: SUMMARY & REPORT ================= */}
        {activeTab === 'summary' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl flex flex-col items-center text-center gap-6"
          >
            <div className="w-20 h-20 bg-emerald-500/20 border border-emerald-500/40 rounded-3xl flex items-center justify-center text-4xl mb-2">
              🏆
            </div>

            <h2 className="text-3xl font-black text-slate-100">Class 9 ICSE Chemistry Mastery Completed!</h2>
            <p className="text-sm text-slate-400 max-w-lg">
              You have successfully engaged with all 10 core ICSE nodes covering chemical symbols, valencies, formula construction, equation balancing, and reaction types!
            </p>

            {/* Mastery Grid per Node */}
            <div className="w-full max-w-3xl bg-slate-950 p-6 rounded-2xl border border-slate-800 grid grid-cols-2 md:grid-cols-5 gap-3 text-left my-4">
              {ALL_NODE_IDS.map(id => {
                const bkt = bktStates[id];
                const masteryPct = Math.round((bkt?.pKnown || 0) * 100);
                return (
                  <div key={id} className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex flex-col gap-1">
                    <span className="text-[10px] text-slate-500 font-mono font-bold">{id}</span>
                    <span className="text-xs font-bold text-slate-200">
                      {id.replace('c9_chem_', 'Node ')}
                    </span>
                    <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden mt-1 border border-slate-800">
                      <div className="bg-emerald-400 h-full" style={{ width: `${masteryPct}%` }} />
                    </div>
                    <span className="text-[10px] text-emerald-400 font-semibold">{masteryPct}% Mastered</span>
                  </div>
                );
              })}
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => {
                  setCurrentChallengeIndex(0);
                  setUserAnswers({});
                  setActiveTab('challenges');
                  playSound('tap');
                }}
                className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl text-sm transition-all"
              >
                🔄 Retry Challenges
              </button>
              <button
                onClick={() => {
                  setActiveTab('lab');
                  playSound('swoop');
                }}
                className="px-6 py-3 bg-gold-600 hover:bg-gold-500 text-white font-bold rounded-xl text-sm transition-all shadow-lg shadow-gold-600/20"
              >
                🧪 Return to Virtual Lab
              </button>
            </div>
          </motion.div>
        )}

        {/* Misconception Checklist */}
        <div className="text-left space-y-3 pt-4 border-t border-slate-800 mt-6">
          <h3 className="text-sm font-bold text-amber-300">Common Misconception Checklist:</h3>
          <div className="grid grid-cols-1 gap-2">
            {MISCONCEPTIONS_CHECKLIST.map((m) => (
              <div key={m.id} className="bg-slate-950 border border-slate-800 p-3 rounded-lg text-xs space-y-1">
                <div className="font-bold text-rose-400">{m.title}</div>
                <div className="text-slate-400">{m.description}</div>
                <div className="text-emerald-300 font-medium">✓ Correction: {m.correction}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}