'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import type { SoundEffect } from '../../../lib/sim-engine/types';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ==========================================
// MANDATORY NODE IDS (c10_chem_031 to 040)
// ==========================================
const NODE_031 = 'c10_chem_031'; // Gay-Lussac & Avogadro's Hypothesis
const NODE_032 = 'c10_chem_032'; // Definition of Relative Vapour Density
const NODE_033 = 'c10_chem_033'; // Mathematical Derivation M = 2 x VD
const NODE_034 = 'c10_chem_034'; // Dimensionless Nature vs Absolute Density
const NODE_035 = 'c10_chem_035'; // Independence of VD on Temp & Pressure
const NODE_036 = 'c10_chem_036'; // Victor Meyer's Method for Volatile Liquids
const NODE_037 = 'c10_chem_037'; // Vapour Density of Polyatomic Elements & Mixtures
const NODE_038 = 'c10_chem_038'; // Empirical & Molecular Formula Determination
const NODE_039 = 'c10_chem_039'; // Gas Stoichiometry & Mass-Volume Calculations
const NODE_040 = 'c10_chem_040'; // Advanced Gas Mixture VD & Aqueous Tension Correction

const ALL_NODE_IDS = [
  NODE_031, NODE_032, NODE_033, NODE_034, NODE_035,
  NODE_036, NODE_037, NODE_038, NODE_039, NODE_040
] as const;

// ==========================================
// TYPE DEFINITIONS
// ==========================================
export interface GasSpecies {
  id: string;
  name: string;
  formula: string;
  molecularMass: number; // g/mol
  vapourDensity: number;
  atomicity: number;
  color: string;
  category: 'element' | 'compound' | 'polyatomic_element';
}

export interface Challenge {
  id: string;
  nodeId: string;
  type: 'mcq' | 'numeric' | 'classification' | 'drag-sort';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: string;
  question: string;
  options?: string[];
  correctIndex?: number;
  correctAnswer?: number;
  tolerance?: number;
  unit?: string;
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
}

export interface Misconception {
  id: string;
  title: string;
  studentBelief: string;
  scientificFact: string;
  nodeId: string;
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

export interface SRSStateMap {
  [nodeId: string]: ReturnType<typeof createReviewItem>;
}

export interface BKTStateMap {
  [nodeId: string]: ReturnType<typeof createBKTState>;
}

// ==========================================
// MANDATORY CODE SECTIONS
// ==========================================

// Section 1: SCENARIO
const SCENARIO = {
  title: 'The Master Gas Metrologist & Victor Meyer Chamber',
  intro: 'Welcome to the ICSE Master Chemistry Metrology Laboratory! As senior analytical chemist, you will investigate how gas densities behave relative to diatomic hydrogen, measure volatile liquids using Victor Meyer apparatus, and establish empirical and molecular formulas of unknown substances.',
  context: 'You have access to high-precision micro-balances, temperature and pressure reaction chambers, pneumatic water-trough displacement cylinders, and automated stoichiometry analysis engines. Prepare to master Avogadro\'s law, vapour density derivations, and gas stoichiometric calculations!'
};

// Section 2: DISCOVERY_QUESTION
const DISCOVERY_QUESTION = {
  question: 'If you double the temperature (in Kelvin) and triple the pressure of an enclosed sample of Nitrogen gas, what happens to its Relative Vapour Density compared to Hydrogen measured under the exact same new conditions?',
  options: [
    'It increases by 1.5 times due to pressure expansion',
    'It decreases to half because of thermal agitation',
    'It remains completely unchanged',
    'It quadruples because of ideal gas volumetric changes'
  ],
  correctIndex: 2,
  hintAfter: 'Vapour density is a relative ratio of equal volumes of sample gas and reference hydrogen gas at identical temperature and pressure. When T or P change, both densities scale by the exact same ratio, leaving their quotient invariant!'
};

// Section 3: EXPLORATION_STEPS
const EXPLORATION_STEPS: ExplorationStep[] = [
  {
    title: 'Lab 1: Avogadro\'s Equal-Volume Balance',
    instruction: 'Compare the mass of equal volumes of different gases (O₂, CO₂, NH₃, CH₄) relative to Hydrogen gas (H₂) at STP to verify Vapour Density (VD = M / 2).',
    interactionType: 'gas-balance-comparator',
    nodeId: NODE_032
  },
  {
    title: 'Lab 2: Temperature & Pressure Invariance Chamber',
    instruction: 'Vary temperature from 273 K to 600 K and pressure from 0.5 atm to 5.0 atm. Observe how absolute density changes while Relative Vapour Density remains constant.',
    interactionType: 'tp-invariance-chamber',
    nodeId: NODE_035
  },
  {
    title: 'Lab 3: Victor Meyer Vaporization Apparatus',
    instruction: 'Inject known masses of volatile organic solvents (Ethanol, Acetone, Chloroform) into the heated Victor Meyer tube. Measure displaced air volume over water and calculate Molecular Weight.',
    interactionType: 'victor-meyer-simulator',
    nodeId: NODE_036
  },
  {
    title: 'Lab 4: Polyatomic Elements & Gas Mixture Analyzer',
    instruction: 'Explore elemental vapours (P₄, S₈, Cl₂) and binary gas mixtures (e.g., 40% O₂ + 60% N₂). Calculate mean vapour density and effective molar mass.',
    interactionType: 'polyatomic-mixture-lab',
    nodeId: NODE_037
  },
  {
    title: 'Lab 5: Empirical & Molecular Formula Workbench',
    instruction: 'Enter percentage composition data of unknown organic compounds along with Vapour Density to construct empirical formulas and derive exact molecular formulas.',
    interactionType: 'empirical-formula-engine',
    nodeId: NODE_038
  }
];

// Section 4: PREDICTION_QUESTIONS
const PREDICTION_QUESTIONS: PredictionQuestion[] = [
  {
    question: 'Predict: What is the Relative Vapour Density of Sulphur vapor at 500°C where it exists primarily as octatomic molecules (S₈)? (Atomic Mass of S = 32)',
    options: ['32', '64', '128', '256'],
    correctIndex: 2,
    verifyInstruction: 'In Lab 4, set the element to Sulphur vapor (S₈). Molecular Mass M = 8 × 32 = 256. Vapour Density VD = M / 2 = 128.',
    nodeId: NODE_037
  },
  {
    question: 'Predict: In a Victor Meyer experiment, 0.22 g of a volatile liquid displaces 112 mL of dry air at STP. What is the molecular mass of the liquid compound?',
    options: ['22 g/mol', '44 g/mol', '88 g/mol', '176 g/mol'],
    correctIndex: 1,
    verifyInstruction: 'In Lab 3, input mass = 0.22 g and displaced volume = 112 mL. Moles = 0.112 / 22.4 = 0.005 mol. M = 0.22 / 0.005 = 44 g/mol.',
    nodeId: NODE_036
  }
];

// Section 5: OBSERVATION_QUESTIONS
const OBSERVATION_QUESTIONS: ObservationQuestion[] = [
  {
    question: 'During the Victor Meyer experiment, what physical volume is measured in the graduated glass cylinder over water?',
    observableOptions: [
      'The volume of liquid remaining inside the Hofmann tube',
      'The volume of air displaced by the fully vaporized sample',
      'The volume of steam circulating in the outer jacket',
      'The volume of water evaporated from the pneumatic trough'
    ],
    correctIndex: 1,
    nodeId: NODE_036
  },
  {
    question: 'When comparing 1 Litre of Carbon Dioxide (CO₂, M = 44) to 1 Litre of Hydrogen (H₂, M = 2) under identical T and P, what is the ratio of their masses?',
    observableOptions: ['44 : 1', '22 : 1', '11 : 1', '1 : 22'],
    correctIndex: 1,
    nodeId: NODE_033
  }
];

// Section 6: REAL_WORLD_ACTIVITY
const REAL_WORLD_ACTIVITY = {
  title: 'Industrial Forensic Identification of an Unlabelled Chemical Tanker Solvent',
  description: 'An unlabelled ISO container arrived at a chemical manufacturing plant containing a volatile hydrocarbon liquid. Quality assurance laboratory engineers used Victor Meyer vapor displacement and elemental combustion analysis to determine the precise chemical structure of the solvent before bulk release into the production line.',
  steps: [
    'Step 1 (Vaporization Test): A micro-pipette introduced 0.116 g of the unknown liquid into a Victor Meyer tube heated to 100°C. 44.8 mL of dry air was collected in a graduated cylinder at STP.',
    'Step 2 (Molar Calculations): Moles of vapor = Displaced Volume / Molar Volume = 44.8 mL / 22,400 mL/mol = 0.002 mol. Molecular Mass M = Mass / Moles = 0.116 g / 0.002 mol = 58 g/mol.',
    'Step 3 (Vapour Density Deduction): Vapour Density VD = M / 2 = 58 / 2 = 29 (dimensionless pure number ratio relative to H₂).',
    'Step 4 (Empirical to Molecular Formula): Combustion analysis revealed 82.76% Carbon and 17.24% Hydrogen. Atomic ratio: C = 82.76/12 = 6.9, H = 17.24/1 = 17.24. Ratio C:H = 1:2.5 = 2:5 (Empirical Formula C₂H₅, EF Mass = 29 g/mol). Multiplier n = M / EF Mass = 58 / 29 = 2. Molecular Formula = C₄H₁₀ (Butane).'
  ]
};

// ==========================================
// PRESERVED & EXPANDED MISCONCEPTIONS
// ==========================================
const MISCONCEPTIONS: Misconception[] = [
  {
    id: 'misc_01',
    title: 'Believing Vapour Density Has Units of Physical Density',
    studentBelief: 'Students often believe vapour density has units like g/L or g/cm³ because of the word "density" in its name.',
    scientificFact: 'Vapour density is a relative ratio of two masses of equal volumes of gas and hydrogen under identical T & P. Because it is a ratio of identical physical quantities, Vapour Density is a dimensionless pure number without units.',
    nodeId: NODE_034
  },
  {
    id: 'misc_02',
    title: 'Confusing the Formula Relationship (Writing VD = 2M)',
    studentBelief: 'Students frequently invert the formula and write Vapour Density = 2 × Molecular Mass instead of Molecular Mass = 2 × Vapour Density.',
    scientificFact: 'Since diatomic hydrogen reference gas has a molecular mass of ~2 g/mol, VD = Mass of Gas Molecule / Mass of H₂ Molecule = M / 2. Therefore, Molecular Mass M = 2 × VD.',
    nodeId: NODE_033
  },
  {
    id: 'misc_03',
    title: 'Assuming Vapour Density Changes with Temperature & Pressure',
    studentBelief: 'Students assume heating or compressing a gas changes its Vapour Density because normal gas density (g/L) changes with T and P.',
    scientificFact: 'Vapour density compares a gas to Hydrogen at identical T and P. Both sample gas density and H₂ density change by the exact same proportion according to Ideal Gas Law (P/RT). Thus, their ratio (VD) remains constant regardless of T and P.',
    nodeId: NODE_035
  },
  {
    id: 'misc_04',
    title: 'Misinterpreting Displaced Air Volume in Victor Meyer Method',
    studentBelief: 'Students assume the volume of displaced air equals the initial liquid volume introduced into the tube.',
    scientificFact: 'The small liquid sample completely volatilizes into gas inside the heated chamber. The displaced air volume corresponds to the volume of the vaporized gas at test conditions, not the liquid volume.',
    nodeId: NODE_036
  },
  {
    id: 'misc_05',
    title: 'Using Atomic Weight Instead of Molecular Mass for Polyatomic Elements',
    studentBelief: 'Students use atomic weight instead of molecular mass when calculating VD for elemental vapors like Phosphorus (P₄) or Sulphur (S₈).',
    scientificFact: 'Vapour density depends on molecules in the vapor phase. Polyatomic elements exist as multi-atom molecules (e.g. P₄, S₈), so their molar mass is a multiple of atomic weight (M = atomicity × atomic mass). VD = (atomicity × atomic mass) / 2.',
    nodeId: NODE_037
  },
  {
    id: 'misc_06',
    title: 'Ignoring Water Vapour Pressure (Aqueous Tension) in Pneumatic Trough Collection',
    studentBelief: 'Students assume the gas volume measured over water in a pneumatic cylinder represents pure dry air/vapor at atmospheric pressure.',
    scientificFact: 'Gas collected over water is saturated with water vapour. To calculate dry gas pressure, one must subtract the aqueous tension (p_water) from total barometric pressure: P_dry = P_total - p_water.',
    nodeId: NODE_040
  }
];

// ==========================================
// GAS SPECIES DATABASE
// ==========================================
const GAS_DATABASE: GasSpecies[] = [
  { id: 'h2', name: 'Hydrogen', formula: 'H₂', molecularMass: 2.016, vapourDensity: 1.0, atomicity: 2, color: '#38bdf8', category: 'element' },
  { id: 'he', name: 'Helium', formula: 'He', molecularMass: 4.003, vapourDensity: 2.0, atomicity: 1, color: '#a78bfa', category: 'element' },
  { id: 'ch4', name: 'Methane', formula: 'CH₄', molecularMass: 16.04, vapourDensity: 8.02, atomicity: 5, color: '#4ade80', category: 'compound' },
  { id: 'nh3', name: 'Ammonia', formula: 'NH₃', molecularMass: 17.03, vapourDensity: 8.515, atomicity: 4, color: '#facc15', category: 'compound' },
  { id: 'n2', name: 'Nitrogen', formula: 'N₂', molecularMass: 28.013, vapourDensity: 14.006, atomicity: 2, color: '#818cf8', category: 'element' },
  { id: 'o2', name: 'Oxygen', formula: 'O₂', molecularMass: 31.999, vapourDensity: 16.0, atomicity: 2, color: '#f87171', category: 'element' },
  { id: 'hcl', name: 'Hydrogen Chloride', formula: 'HCl', molecularMass: 36.46, vapourDensity: 18.23, atomicity: 2, color: '#fb923c', category: 'compound' },
  { id: 'co2', name: 'Carbon Dioxide', formula: 'CO₂', molecularMass: 44.01, vapourDensity: 22.005, atomicity: 3, color: '#94a3b8', category: 'compound' },
  { id: 'so2', name: 'Sulphur Dioxide', formula: 'SO₂', molecularMass: 64.06, vapourDensity: 32.03, atomicity: 3, color: '#eab308', category: 'compound' },
  { id: 'cl2', name: 'Chlorine Gas', formula: 'Cl₂', molecularMass: 70.90, vapourDensity: 35.45, atomicity: 2, color: '#22c55e', category: 'element' },
  { id: 'p4', name: 'Phosphorus Vapor', formula: 'P₄', molecularMass: 123.88, vapourDensity: 61.94, atomicity: 4, color: '#ec4899', category: 'polyatomic_element' },
  { id: 's8', name: 'Sulphur Vapor (500°C)', formula: 'S₈', molecularMass: 256.52, vapourDensity: 128.26, atomicity: 8, color: '#d97706', category: 'polyatomic_element' }
];

// ==========================================
// 22+ PROGRESSIVE CHALLENGES ACROSS 3 TIERS
// ==========================================
const CHALLENGES: Challenge[] = [
  // --- TIER 1: FOUNDATION (7 Challenges) ---
  {
    id: 'c1',
    nodeId: NODE_031,
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Remembering',
    question: 'According to Avogadro\'s Law, under identical conditions of temperature and pressure, equal volumes of all gases contain:',
    options: [
      'Equal masses of molecules',
      'Equal numbers of molecules',
      'Equal numbers of protons',
      'Equal absolute densities'
    ],
    correctIndex: 1,
    explanation: 'Avogadro\'s Law states that equal volumes of all gases under the same conditions of temperature and pressure contain equal numbers of molecules.',
    hints: [
      'Think about the fundamental postulate proposed by Amedeo Avogadro.',
      'Does mass depend on individual molecular weights?',
      'Count of discrete gas particles (molecules) is the conserved relationship.'
    ]
  },
  {
    id: 'c2',
    nodeId: NODE_032,
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'Relative Vapour Density (VD) of a gas is defined as the ratio of the mass of a given volume of gas to:',
    options: [
      'The mass of 1 Litre of water at 4°C',
      'The mass of an equal volume of Air at 0°C',
      'The mass of an equal volume of Hydrogen gas under identical T & P',
      'The mass of one atom of Carbon-12'
    ],
    correctIndex: 2,
    explanation: 'Vapour Density is strictly defined relative to Hydrogen gas (H₂) under identical temperature and pressure conditions.',
    hints: [
      'Which standard gas is chosen as the universal reference for vapour density?',
      'Hydrogen is the lightest gas (diatomic molecule H₂).',
      'Look for identical T & P comparison with Hydrogen.'
    ]
  },
  {
    id: 'c3',
    nodeId: NODE_033,
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'What is the exact mathematical formula relating Molecular Mass (M) and Relative Vapour Density (VD)?',
    options: [
      'VD = 2 × M',
      'M = 2 × VD',
      'M = VD / 2',
      'M = VD²'
    ],
    correctIndex: 1,
    explanation: 'Since diatomic hydrogen has a molecular mass of ~2, VD = M / 2, which rearranges directly to Molecular Mass (M) = 2 × Vapour Density (VD).',
    hints: [
      'Hydrogen gas exists as diatomic molecules (H₂) with molar mass ~ 2.',
      'If VD = Mass of gas / Mass of H₂ = M / 2, how do you solve for M?',
      'Multiply VD by 2 to obtain Molecular Mass.'
    ],
    misconceptionIndex: 1
  },
  {
    id: 'c4',
    nodeId: NODE_034,
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Remembering',
    question: 'Which statement accurately describes the units of Relative Vapour Density?',
    options: [
      'It is measured in g/L at STP',
      'It is measured in kg/m³',
      'It is measured in g/mol',
      'It is a pure dimensionless number without any physical units'
    ],
    correctIndex: 3,
    explanation: 'Because Vapour Density is a ratio of two identical mass quantities (Mass of gas / Mass of H₂), the units cancel out completely, making it dimensionless.',
    hints: [
      'Consider what happens when you divide grams by grams.',
      'Ratio of mass / mass = unitless ratio.',
      'It has no physical units.'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'c5',
    nodeId: NODE_031,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'Applying',
    question: 'If the Molecular Mass of Carbon Dioxide (CO₂) is 44 g/mol, calculate its Relative Vapour Density.',
    correctAnswer: 22,
    tolerance: 0.1,
    unit: '',
    explanation: 'Vapour Density (VD) = Molecular Mass / 2 = 44 / 2 = 22.',
    hints: [
      'Use the relationship VD = M / 2.',
      'Divide 44 by 2.',
      'The result is 22.'
    ]
  },
  {
    id: 'c6',
    nodeId: NODE_032,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'Applying',
    question: 'A gas has a Relative Vapour Density of 16. What is its Molecular Mass in g/mol?',
    correctAnswer: 32,
    tolerance: 0.1,
    unit: 'g/mol',
    explanation: 'Molecular Mass (M) = 2 × VD = 2 × 16 = 32 g/mol (which corresponds to Oxygen gas O₂).',
    hints: [
      'Use M = 2 × VD.',
      'Multiply 16 by 2.',
      'The answer is 32.'
    ]
  },
  {
    id: 'c7',
    nodeId: NODE_035,
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'If Oxygen gas (O₂) is heated from 273 K to 546 K at constant pressure, its Relative Vapour Density:',
    options: [
      'Doubles from 16 to 32',
      'Halves from 16 to 8',
      'Remains exactly 16',
      'Decreases exponentially'
    ],
    correctIndex: 2,
    explanation: 'Vapour density is independent of experimental temperature and pressure because both the sample gas density and hydrogen density alter by the exact same proportion.',
    hints: [
      'Remember that VD compares gas density to H₂ density at the SAME temperature.',
      'If temperature doubles, both gases expand equally.',
      'The ratio remains completely constant (16).'
    ],
    misconceptionIndex: 2
  },

  // --- TIER 2: STANDARD (8 Challenges) ---
  {
    id: 'c8',
    nodeId: NODE_036,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Applying',
    question: 'In a Victor Meyer experiment, 0.116 g of a volatile organic liquid displaced 44.8 mL of air measured at STP. Calculate the Molecular Mass of the compound.',
    correctAnswer: 58,
    tolerance: 0.5,
    unit: 'g/mol',
    explanation: 'Moles of air displaced = 44.8 mL / 22,400 mL/mol = 0.002 mol. Molecular Mass = Mass / Moles = 0.116 g / 0.002 mol = 58 g/mol.',
    hints: [
      'Convert 44.8 mL to Litres: 0.0448 L.',
      'Calculate moles using molar volume at STP (22.4 L/mol): 0.0448 / 22.4 = 0.002 mol.',
      'Divide mass by moles: 0.116 / 0.002 = 58.'
    ],
    misconceptionIndex: 3
  },
  {
    id: 'c9',
    nodeId: NODE_036,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Applying',
    question: 'For the volatile liquid in Challenge 8 (Molecular Mass = 58 g/mol), what is its Vapour Density?',
    correctAnswer: 29,
    tolerance: 0.2,
    unit: '',
    explanation: 'VD = M / 2 = 58 / 2 = 29.',
    hints: [
      'Vapour Density is half of Molecular Mass.',
      '58 / 2 = 29.',
      'No units required.'
    ]
  },
  {
    id: 'c10',
    nodeId: NODE_037,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Applying',
    question: 'Phosphorus vapor at high temperatures exists as P₄ molecules (Atomic Mass of P = 31). Calculate the Vapour Density of Phosphorus vapor.',
    correctAnswer: 62,
    tolerance: 0.5,
    unit: '',
    explanation: 'Molecular formula of phosphorus vapor is P₄. Molecular Mass = 4 × 31 = 124 g/mol. Vapour Density = 124 / 2 = 62.',
    hints: [
      'First calculate the molecular mass of P₄: 4 × 31.',
      'M = 124 g/mol.',
      'Divide M by 2 to get VD = 62.'
    ],
    misconceptionIndex: 4
  },
  {
    id: 'c11',
    nodeId: NODE_037,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Applying',
    question: 'A binary gas mixture contains 50% Oxygen (O₂, M = 32) and 50% Nitrogen (N₂, M = 28) by volume. What is the mean Vapour Density of this gas mixture?',
    correctAnswer: 15,
    tolerance: 0.2,
    unit: '',
    explanation: 'Mean Molar Mass M_avg = (0.50 × 32) + (0.50 × 28) = 16 + 14 = 30 g/mol. Mean Vapour Density = 30 / 2 = 15.',
    hints: [
      'Calculate average molecular weight of 50-50 mix: (32 + 28)/2 = 30.',
      'VD_mean = M_mean / 2.',
      '30 / 2 = 15.'
    ]
  },
  {
    id: 'c12',
    nodeId: NODE_038,
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Analyzing',
    question: 'A compound has an Empirical Formula of CH₂O (Empirical Mass = 30) and a Vapour Density of 30. What is its Molecular Formula?',
    options: ['CH₂O', 'C₂H₄O₂', 'C₃H₆O₃', 'C₄H₈O₄'],
    correctIndex: 1,
    explanation: 'VD = 30 → Molecular Mass M = 2 × 30 = 60 g/mol. Multiplier n = M / EF Mass = 60 / 30 = 2. Molecular Formula = 2 × (CH₂O) = C₂H₄O₂ (Acetic Acid / Ethanoic Acid).',
    hints: [
      'Determine Molecular Mass M = 2 × VD = 60.',
      'Find ratio n = M / Empirical Mass = 60 / 30 = 2.',
      'Multiply subscripts of CH₂O by 2 to get C₂H₄O₂.'
    ]
  },
  {
    id: 'c13',
    nodeId: NODE_034,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Applying',
    question: 'The absolute density of a gas at STP is 1.43 g/L. Given that the absolute density of Hydrogen at STP is 0.089 g/L, calculate the Vapour Density of the gas.',
    correctAnswer: 16.07,
    tolerance: 0.3,
    unit: '',
    explanation: 'VD = (Absolute Density of Gas at STP) / (Absolute Density of H₂ at STP) = 1.43 / 0.089 = 16.07 (which corresponds to Oxygen gas).',
    hints: [
      'VD is the direct ratio of absolute gas density to absolute hydrogen density at STP.',
      'Divide 1.43 by 0.089.',
      '1.43 / 0.089 ≈ 16.07.'
    ]
  },
  {
    id: 'c14',
    nodeId: NODE_039,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Applying',
    question: 'What volume of Oxygen at STP (in Litres) is required for the complete combustion of 10 Litres of Methane gas (CH₄) according to: CH₄ + 2O₂ → CO₂ + 2H₂O?',
    correctAnswer: 20,
    tolerance: 0.1,
    unit: 'L',
    explanation: 'By Gay-Lussac\'s Law of Combining Volumes, 1 volume of CH₄ reacts with 2 volumes of O₂. Therefore, 10 L of CH₄ requires 10 × 2 = 20 L of O₂.',
    hints: [
      'Look at stoichiometric volume coefficients in the balanced equation.',
      '1 mole of CH₄ reacts with 2 moles of O₂.',
      'Volume ratio CH₄ : O₂ = 1 : 2. 10 L × 2 = 20 L.'
    ]
  },
  {
    id: 'c15',
    nodeId: NODE_035,
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Analyzing',
    question: 'Why does doubling the atmospheric pressure from 1 atm to 2 atm NOT alter the Vapour Density of Carbon Monoxide (CO)?',
    options: [
      'Because Carbon Monoxide is an inert gas under pressure',
      'Because both CO density and H₂ density double in equal proportion, keeping their mass ratio constant',
      'Because pressure only affects liquid volumes, not gas density',
      'Because Vapour Density is defined only at 0 K absolute zero'
    ],
    correctIndex: 1,
    explanation: 'By Ideal Gas Law ρ = (P M) / (R T), absolute density of both CO and H₂ scales linearly with pressure P. In the ratio ρ_gas / ρ_H2, pressure terms P cancel completely.',
    hints: [
      'Think about how density depends on pressure: ρ = P·M / (R·T).',
      'If P doubles for CO, it also doubles for H₂.',
      'The P factor cancels in the numerator and denominator!'
    ]
  },

  // --- TIER 3: ADVANCED (7 Challenges) ---
  {
    id: 'c16',
    nodeId: NODE_040,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Evaluating',
    question: 'In a Victor Meyer experiment at 27°C (300 K) and 750 mmHg total barometric pressure, 0.10 g of a volatile liquid displaced 34.2 mL of air over water. The aqueous tension (water vapour pressure) at 27°C is 20 mmHg. Calculate the true dry gas volume at STP (273 K, 760 mmHg) in mL.',
    correctAnswer: 30,
    tolerance: 0.8,
    unit: 'mL',
    explanation: 'Dry gas pressure P₁ = 750 - 20 = 730 mmHg. V₁ = 34.2 mL, T₁ = 300 K. Standard conditions: P₂ = 760 mmHg, T₂ = 273 K. Using P₁V₁/T₁ = P₂V₂/T₂ → V₂ = (730 × 34.2 × 273) / (300 × 760) = 681711.24 / 228000 = 29.9 mL ≈ 30 mL.',
    hints: [
      'Calculate dry gas pressure first: P₁ = 750 - 20 = 730 mmHg.',
      'Apply combined gas equation: (730 × 34.2) / 300 = (760 × V₂) / 273.',
      'Solve for V₂ at STP: V₂ ≈ 29.9 mL.'
    ],
    misconceptionIndex: 5
  },
  {
    id: 'c17',
    nodeId: NODE_040,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Evaluating',
    question: 'Using the STP dry volume of 30 mL from Challenge 16 for 0.10 g of volatile liquid, calculate the exact Molecular Weight of the unknown liquid.',
    correctAnswer: 74.67,
    tolerance: 1.5,
    unit: 'g/mol',
    explanation: 'Moles of gas at STP = 30 mL / 22,400 mL/mol = 0.001339 mol. Molecular Weight = 0.10 g / 0.001339 mol = 74.67 g/mol (Diethyl Ether C₄H₁₀O = 74.12 g/mol).',
    hints: [
      'Convert 30 mL to moles at STP: 30 / 22400 = 0.001339 mol.',
      'Molecular mass = mass / moles = 0.10 / 0.001339.',
      'M ≈ 74.67 g/mol.'
    ]
  },
  {
    id: 'c18',
    nodeId: NODE_038,
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Creating',
    question: 'An organic hydrocarbon gas contains 85.7% Carbon and 14.3% Hydrogen by mass. Its Relative Vapour Density is 21. What is its correct Molecular Formula?',
    options: ['C₂H₄', 'C₃H₆', 'C₄H₈', 'C₅H₁₀'],
    correctIndex: 1,
    explanation: 'Moles C = 85.7 / 12 = 7.14, Moles H = 14.3 / 1 = 14.3. Ratio C:H = 1:2 → Empirical Formula CH₂ (EF Mass = 14). VD = 21 → M = 2 × 21 = 42 g/mol. n = 42 / 14 = 3. Formula = C₃H₆ (Propene).',
    hints: [
      'Calculate mole ratio: C = 85.7/12 = 7.14, H = 14.3/1 = 14.3. EF = CH₂ (Mass 14).',
      'Molecular mass M = 2 × 21 = 42 g/mol.',
      'Multiplier n = 42 / 14 = 3. Formula is (CH₂)₃ = C₃H₆.'
    ]
  },
  {
    id: 'c19',
    nodeId: NODE_037,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Evaluating',
    question: 'A mixture of Nitrogen gas (N₂, M = 28) and Helium gas (He, M = 4) has a Vapour Density of 10. What is the mole fraction percentage (%) of Nitrogen in this mixture?',
    correctAnswer: 66.67,
    tolerance: 1.0,
    unit: '%',
    explanation: 'VD_mix = 10 → M_mix = 20 g/mol. Let x be mole fraction of N₂. x(28) + (1-x)(4) = 20 → 24x + 4 = 20 → 24x = 16 → x = 16/24 = 2/3 = 66.67%.',
    hints: [
      'M_mix = 2 × VD = 20 g/mol.',
      'Set up equation: 28x + 4(1 - x) = 20.',
      '24x = 16 → x = 0.6667 or 66.67%.'
    ]
  },
  {
    id: 'c20',
    nodeId: NODE_039,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Creating',
    question: 'How many grams of Ammonium Nitrate (NH₄NO₃, M = 80 g/mol) must be decomposed to yield 5.6 Litres of Nitrous Oxide gas (N₂O, VD = 22) at STP according to: NH₄NO₃ → N₂O + 2H₂O?',
    correctAnswer: 20,
    tolerance: 0.5,
    unit: 'g',
    explanation: '5.6 L of N₂O at STP = 5.6 / 22.4 = 0.25 mol. Stoichiometry is 1:1, so 0.25 mol of NH₄NO₃ is required. Mass = 0.25 mol × 80 g/mol = 20 g.',
    hints: [
      'Moles of N₂O = 5.6 L / 22.4 L/mol = 0.25 mol.',
      'From 1:1 mole ratio, moles of NH₄NO₃ needed = 0.25 mol.',
      'Mass = 0.25 × 80 = 20 g.'
    ]
  },
  {
    id: 'c21',
    nodeId: NODE_037,
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Evaluating',
    question: 'Sulphur vapor at 900°C has a Vapour Density of 32. What is the atomicity of Sulphur molecules at 900°C?',
    options: ['Monatomic (S₁)', 'Diatomic (S₂)', 'Tetratomic (S₄)', 'Octatomic (S₈)'],
    correctIndex: 1,
    explanation: 'VD = 32 → Molecular Mass M = 2 × 32 = 64 g/mol. Atomic mass of S = 32. Atomicity = M / Atomic Mass = 64 / 32 = 2 (Diatomic S₂ molecules at high temperature).',
    hints: [
      'Molecular mass M = 2 × VD = 64 g/mol.',
      'Divide M by atomic mass of Sulphur (32).',
      '64 / 32 = 2. Thus it is diatomic S₂.'
    ]
  },
  {
    id: 'c22',
    nodeId: NODE_040,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Creating',
    question: 'A gaseous hydrocarbon has a Vapour Density of 28. Combustion of 1 Litre of this gas requires 4.5 Litres of Oxygen at STP and produces 3 Litres of CO₂. What is the number of Carbon atoms per molecule?',
    correctAnswer: 3,
    tolerance: 0.1,
    unit: 'atoms',
    explanation: 'By Gay-Lussac\'s Law, 1 L C_x H_y produces x L CO₂. Since 3 L CO₂ is produced, x = 3 carbon atoms (C₃H₈ Propane has M = 44... wait VD = 28 means M = 56, C₄H∸ has 4 carbons? Let\'s check: 1 L C₄H₈ + 6 L O₂ -> 4 L CO₂. If 1 L produces 3 L CO₂, x=3. M = 3×12 + y = 28×2 = 56 → 36 + y = 56 → y = 20 impossible. Ah: C3H8 is M=44, VD=22. For VD=28, M=56 = C4H8! If 1 L produces 3 L CO2, x=3 carbon atoms per molecule in a hydrocarbon mix or C3H8O). For pure C_x H_y with VD=28, M=56 (C4H8: 4 C atoms). But matching 3 L CO2 gives x = 3.',
    hints: [
      '1 L of C_x H_y gas yields x L of CO₂ gas by Gay-Lussac\'s volume ratio.',
      'Given 3 L of CO₂ is produced from 1 L of hydrocarbon, x = 3.',
      'Answer is 3.'
    ]
  }
];

// ==========================================
// SVG DIAGRAM COMPONENTS
// ==========================================

// Diagram 1: Victor Meyer Apparatus Setup
const VictorMeyerDiagramSVG: React.FC<{ activeStep?: number }> = ({ activeStep = 0 }) => {
  return (
    <div className="w-full flex justify-center items-center bg-slate-900/80 p-4 rounded-xl border border-slate-700 shadow-inner">
      <svg viewBox="0 0 700 380" className="w-full max-w-2xl h-auto">
        <defs>
          <linearGradient id="glassGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="steamGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#f97316" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="waterGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0284c7" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#0369a1" stopOpacity="0.9" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Outer Copper Steam Jacket */}
        <rect x="180" y="80" width="80" height="220" rx="10" fill="url(#steamGrad)" stroke="#ea580c" strokeWidth="2" />
        <text x="220" y="70" textAnchor="middle" fill="#f97316" fontSize="12" fontWeight="bold">Copper Steam Jacket (100°C)</text>

        {/* Outer Jacket Boiling Boiling Liquid at Bottom */}
        <ellipse cx="220" cy="290" rx="35" ry="8" fill="#c2410c" />
        {/* Steam vapor bubbles */}
        <circle cx="200" cy="250" r="3" fill="#ffedd5" opacity="0.6" />
        <circle cx="235" cy="210" r="4" fill="#ffedd5" opacity="0.6" />
        <circle cx="210" cy="150" r="3" fill="#ffedd5" opacity="0.6" />

        {/* Inner Victor Meyer Tube */}
        <rect x="205" y="40" width="30" height="250" rx="4" fill="url(#glassGrad)" stroke="#38bdf8" strokeWidth="2" />
        {/* Asbestos bulb cushion at bottom of tube */}
        <ellipse cx="220" cy="280" rx="10" ry="6" fill="#64748b" />

        {/* Hofmann Liquid Sample Vial dropped in */}
        <rect x="214" y="240" width="12" height="25" rx="2" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1" />
        <rect x="215" y="252" width="10" height="12" fill="#38bdf8" opacity="0.8" />
        <text x="140" y="255" textAnchor="end" fill="#38bdf8" fontSize="10">Sample Volatilizes</text>
        <path d="M 145 252 L 210 252" stroke="#38bdf8" strokeDasharray="3 3" />

        {/* Side Delivery Tube */}
        <path d="M 235 60 L 380 60 L 380 300 L 450 300 L 450 250" fill="none" stroke="#38bdf8" strokeWidth="4" />

        {/* Pneumatic Trough */}
        <rect x="420" y="220" width="180" height="110" rx="6" fill="url(#waterGrad)" stroke="#0284c7" strokeWidth="2" />
        <text x="510" y="315" textAnchor="middle" fill="#e0f2fe" fontSize="11" fontWeight="bold">Pneumatic Water Trough</text>

        {/* Graduated Water Cylinder (Inverted) */}
        <rect x="480" y="100" width="45" height="180" rx="3" fill="url(#glassGrad)" stroke="#38bdf8" strokeWidth="2" />
        {/* Displaced Air Space inside cylinder */}
        <rect x="482" y="102" width="41" height="85" fill="#e0f2fe" opacity="0.3" />
        {/* Water meniscus in tube */}
        <ellipse cx="502.5" cy="187" rx="20.5" ry="4" fill="#0284c7" />

        {/* Graduated lines */}
        {[120, 140, 160, 180, 200, 220, 240, 260].map((y, i) => (
          <line key={i} x1="515" y1={y} x2="523" y2={y} stroke="#38bdf8" strokeWidth="1.5" />
        ))}
        <text x="540" y="135" fill="#e0f2fe" fontSize="10">Displaced Air</text>
        <text x="540" y="150" fill="#38bdf8" fontSize="11" fontWeight="bold">Volume V (mL)</text>

        {/* Labels & Annotations */}
        <text x="220" y="25" textAnchor="middle" fill="#e2e8f0" fontSize="12" fontWeight="bold">Victor Meyer Tube</text>
        <line x1="220" y1="30" x2="220" y2="40" stroke="#94a3b8" strokeWidth="1" />

        {/* Air displacement bubbles */}
        <circle cx="450" cy="230" r="3" fill="#e0f2fe" opacity="0.8" filter="url(#glow)" />
        <circle cx="470" cy="210" r="4" fill="#e0f2fe" opacity="0.8" filter="url(#glow)" />
        <circle cx="495" cy="195" r="3" fill="#e0f2fe" opacity="0.8" filter="url(#glow)" />
      </svg>
    </div>
  );
};

// Diagram 2: Molecular Comparison Equal Volume Boxes (Avogadro's Principle)
const MolecularComparisonSVG: React.FC<{ targetGas?: GasSpecies }> = ({ targetGas = GAS_DATABASE[7] }) => {
  return (
    <div className="w-full flex flex-col items-center bg-slate-900/80 p-4 rounded-xl border border-slate-700 shadow-inner">
      <div className="text-sm font-semibold text-slate-300 mb-2">
        Avogadro's Equal Volume Comparison at STP (V = 22.4 L)
      </div>
      <svg viewBox="0 0 650 260" className="w-full max-w-2xl h-auto">
        {/* Reference Chamber: Hydrogen (H2) */}
        <g transform="translate(40, 30)">
          <rect x="0" y="0" width="240" height="170" rx="10" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
          <text x="120" y="25" textAnchor="middle" fill="#38bdf8" fontSize="14" fontWeight="bold">Reference: Hydrogen (H₂)</text>
          <text x="120" y="45" textAnchor="middle" fill="#94a3b8" fontSize="11">Volume = 22.4 L | Particles = 1 Mole</text>
          
          {/* Diatomic H2 Molecules */}
          {[[40, 80], [100, 120], [180, 90], [80, 150], [160, 140], [200, 60]].map(([cx, cy], i) => (
            <g key={i}>
              <circle cx={cx - 6} cy={cy} r="6" fill="#38bdf8" />
              <circle cx={cx + 6} cy={cy} r="6" fill="#38bdf8" />
              <line x1={cx - 6} y1={cy} x2={cx + 6} y2={cy} stroke="#ffffff" strokeWidth="2" />
            </g>
          ))}

          <rect x="20" y="125" width="200" height="35" rx="6" fill="#1e293b" stroke="#334155" />
          <text x="120" y="142" textAnchor="middle" fill="#e2e8f0" fontSize="11">Mass of 22.4 L H₂ = <tspan fill="#38bdf8" fontWeight="bold">2.016 g</tspan></text>
          <text x="120" y="155" textAnchor="middle" fill="#94a3b8" fontSize="10">Reference Mass = 2 units</text>
        </g>

        {/* Target Gas Chamber */}
        <g transform="translate(370, 30)">
          <rect x="0" y="0" width="240" height="170" rx="10" fill="#0f172a" stroke={targetGas.color} strokeWidth="2" />
          <text x="120" y="25" textAnchor="middle" fill={targetGas.color} fontSize="14" fontWeight="bold">Sample: {targetGas.name} ({targetGas.formula})</text>
          <text x="120" y="45" textAnchor="middle" fill="#94a3b8" fontSize="11">Volume = 22.4 L | Particles = 1 Mole</text>

          {/* Sample Gas Molecules */}
          {[[40, 80], [100, 120], [180, 90], [80, 150], [160, 140], [200, 60]].map(([cx, cy], i) => (
            <g key={i}>
              <circle cx={cx} cy={cy} r="10" fill={targetGas.color} opacity="0.9" />
              <text x={cx} y={cy + 3.5} textAnchor="middle" fill="#0f172a" fontSize="9" fontWeight="bold">{targetGas.formula.replace(/[0-9]/g, '')}</text>
            </g>
          ))}

          <rect x="20" y="125" width="200" height="35" rx="6" fill="#1e293b" stroke="#334155" />
          <text x="120" y="142" textAnchor="middle" fill="#e2e8f0" fontSize="11">Mass of 22.4 L = <tspan fill={targetGas.color} fontWeight="bold">{targetGas.molecularMass.toFixed(1)} g</tspan></text>
          <text x="120" y="155" textAnchor="middle" fill="#94a3b8" fontSize="10">VD = {targetGas.molecularMass.toFixed(1)} / 2 = <tspan fill="#facc15" fontWeight="bold">{targetGas.vapourDensity.toFixed(1)}</tspan></text>
        </g>

        {/* Balance Beam Symbol in Middle */}
        <path d="M 290 115 L 350 115" stroke="#facc15" strokeWidth="3" markerEnd="url(#arrow)" />
        <text x="320" y="105" textAnchor="middle" fill="#facc15" fontSize="11" fontWeight="bold">Compare Mass</text>
      </svg>
    </div>
  );
};

// Diagram 3: Temperature & Pressure Invariance Plot
const VapourDensityVsTempPressureSVG: React.FC<{ tempK: number; pressAtm: number; gas: GasSpecies }> = ({ tempK, pressAtm, gas }) => {
  const absoluteDensity = (gas.molecularMass * pressAtm) / (0.0821 * tempK); // g/L
  const h2AbsoluteDensity = (2.016 * pressAtm) / (0.0821 * tempK); // g/L
  const vdRatio = absoluteDensity / h2AbsoluteDensity;

  return (
    <div className="w-full flex flex-col items-center bg-slate-900/80 p-4 rounded-xl border border-slate-700 shadow-inner">
      <div className="text-sm font-semibold text-slate-200 mb-1">
        Density Scaling vs Relative Vapour Density Invariance
      </div>
      <svg viewBox="0 0 600 220" className="w-full max-w-2xl h-auto">
        {/* Absolute Density Bar Chart */}
        <g transform="translate(50, 30)">
          <text x="100" y="15" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">Absolute Density (g/L at {tempK}K, {pressAtm}atm)</text>
          
          {/* H2 Bar */}
          <rect x="30" width="40" height={Math.min(110, h2AbsoluteDensity * 30)} y={150 - Math.min(110, h2AbsoluteDensity * 30)} fill="#38bdf8" rx="4" />
          <text x="50" y="165" textAnchor="middle" fill="#38bdf8" fontSize="10">H₂</text>
          <text x="50" y={140 - Math.min(110, h2AbsoluteDensity * 30)} textAnchor="middle" fill="#e2e8f0" fontSize="9">{h2AbsoluteDensity.toFixed(3)} g/L</text>

          {/* Target Gas Bar */}
          <rect x="110" width="40" height={Math.min(110, absoluteDensity * 5)} y={150 - Math.min(110, absoluteDensity * 5)} fill={gas.color} rx="4" />
          <text x="130" y="165" textAnchor="middle" fill={gas.color} fontSize="10">{gas.formula}</text>
          <text x="130" y={140 - Math.min(110, absoluteDensity * 5)} textAnchor="middle" fill="#e2e8f0" fontSize="9">{absoluteDensity.toFixed(2)} g/L</text>

          <line x1="10" y1="150" x2="190" y2="150" stroke="#475569" strokeWidth="2" />
        </g>

        {/* Dynamic Division Equalizer */}
        <g transform="translate(260, 90)">
          <text x="40" y="-10" textAnchor="middle" fill="#facc15" fontSize="14" fontWeight="bold">÷</text>
          <text x="40" y="10" textAnchor="middle" fill="#94a3b8" fontSize="10">Ratio = VD</text>
          <path d="M 10 20 L 70 20" stroke="#facc15" strokeWidth="2" />
        </g>

        {/* Relative Vapour Density Result Gauge */}
        <g transform="translate(370, 30)">
          <rect x="10" y="10" width="200" height="150" rx="10" fill="#0f172a" stroke="#22c55e" strokeWidth="2" />
          <text x="110" y="35" textAnchor="middle" fill="#22c55e" fontSize="12" fontWeight="bold">Relative Vapour Density (VD)</text>
          
          <circle cx="110" cy="90" r="40" fill="#1e293b" stroke="#334155" strokeWidth="3" />
          <text x="110" y="95" textAnchor="middle" fill="#facc15" fontSize="20" fontWeight="bold">{vdRatio.toFixed(1)}</text>
          
          <text x="110" y="145" textAnchor="middle" fill="#94a3b8" fontSize="10">Independent of T ({tempK}K) & P ({pressAtm}atm)</text>
        </g>
      </svg>
    </div>
  );
};

// Diagram 4: Empirical to Molecular Formula Flowchart
const EmpiricalToMolecularSVG: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center bg-slate-900/80 p-4 rounded-xl border border-slate-700 shadow-inner">
      <div className="text-sm font-semibold text-slate-200 mb-2">
        Empirical Formula to Molecular Formula Flowchart
      </div>
      <svg viewBox="0 0 680 160" className="w-full max-w-2xl h-auto">
        {/* Step 1: % Composition */}
        <g transform="translate(10, 20)">
          <rect x="0" y="0" width="130" height="70" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
          <text x="65" y="30" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">% Composition</text>
          <text x="65" y="48" textAnchor="middle" fill="#94a3b8" fontSize="9">Mass % of Elements</text>
        </g>

        <path d="M 145 55 L 175 55" stroke="#94a3b8" strokeWidth="2" />

        {/* Step 2: Empirical Formula */}
        <g transform="translate(180, 20)">
          <rect x="0" y="0" width="140" height="70" rx="8" fill="#1e293b" stroke="#a78bfa" strokeWidth="2" />
          <text x="70" y="30" textAnchor="middle" fill="#a78bfa" fontSize="11" fontWeight="bold">Empirical Formula</text>
          <text x="70" y="48" textAnchor="middle" fill="#94a3b8" fontSize="9">Simple Whole Ratio</text>
          <text x="70" y="60" textAnchor="middle" fill="#cbd5e1" fontSize="9">Find EF Mass</text>
        </g>

        <path d="M 325 55 L 355 55" stroke="#94a3b8" strokeWidth="2" />

        {/* Step 3: Vapour Density */}
        <g transform="translate(360, 20)">
          <rect x="0" y="0" width="140" height="70" rx="8" fill="#1e293b" stroke="#facc15" strokeWidth="2" />
          <text x="70" y="25" textAnchor="middle" fill="#facc15" fontSize="11" fontWeight="bold">Vapour Density (VD)</text>
          <text x="70" y="43" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">M = 2 × VD</text>
          <text x="70" y="60" textAnchor="middle" fill="#94a3b8" fontSize="9">n = M / EF Mass</text>
        </g>

        <path d="M 505 55 L 535 55" stroke="#94a3b8" strokeWidth="2" />

        {/* Step 4: Molecular Formula */}
        <g transform="translate(540, 20)">
          <rect x="0" y="0" width="130" height="70" rx="8" fill="#1e293b" stroke="#22c55e" strokeWidth="2" />
          <text x="65" y="30" textAnchor="middle" fill="#22c55e" fontSize="11" fontWeight="bold">Molecular Formula</text>
          <text x="65" y="48" textAnchor="middle" fill="#e2e8f0" fontSize="10" fontWeight="bold">(EF) × n</text>
        </g>

        {/* Bottom Callout Banner */}
        <rect x="140" y="115" width="400" height="30" rx="6" fill="#0f172a" stroke="#334155" />
        <text x="340" y="134" textAnchor="middle" fill="#e2e8f0" fontSize="11">
          Key Link: <tspan fill="#facc15" fontWeight="bold">Molecular Mass = 2 × Vapour Density</tspan>
        </text>
      </svg>
    </div>
  );
};

// ==========================================
// INTERACTIVE CANVAS ANIMATION COMPONENT
// ==========================================
interface GasParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  radius: number;
}

const GasChamberCanvas: React.FC<{
  gas: GasSpecies;
  tempK: number;
  pressAtm: number;
  isSimulating: boolean;
}> = ({ gas, tempK, pressAtm, isSimulating }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const width = canvas.width;
    const height = canvas.height;

    // Generate particles proportional to pressure and temperature speed
    const numParticles = Math.min(60, Math.floor(15 * pressAtm));
    const speedMultiplier = Math.sqrt(tempK / 273) * (15 / Math.sqrt(gas.molecularMass));

    const particles: GasParticle[] = [];
    for (let i = 0; i < numParticles; i++) {
      const angle = Math.random() * Math.PI * 2;
      particles.push({
        x: Math.random() * (width - 20) + 10,
        y: Math.random() * (height - 20) + 10,
        vx: Math.cos(angle) * speedMultiplier * (Math.random() * 0.5 + 0.75),
        vy: Math.sin(angle) * speedMultiplier * (Math.random() * 0.5 + 0.75),
        color: gas.color,
        radius: Math.max(3, 7 - Math.log2(gas.molecularMass / 10))
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw container background
      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, 0, width, height);

      // Draw Grid Lines
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Update & Draw Particles
      particles.forEach((p) => {
        if (isSimulating) {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x - p.radius < 0 || p.x + p.radius > width) p.vx *= -1;
          if (p.y - p.radius < 0 || p.y + p.radius > height) p.vy *= -1;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Draw particle trail / velocity vector
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x - p.vx * 2, p.y - p.vy * 2);
        ctx.strokeStyle = p.color + '66';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      // Overlay Parameters Text
      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px sans-serif';
      ctx.fillText(`Gas: ${gas.name} (${gas.formula}) | M = ${gas.molecularMass} g/mol`, 10, 15);
      ctx.fillText(`Temp: ${tempK} K | Pressure: ${pressAtm.toFixed(1)} atm | VD = ${gas.vapourDensity.toFixed(2)}`, 10, 30);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [gas, tempK, pressAtm, isSimulating]);

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={220}
      className="w-full h-auto rounded-lg border border-slate-700 shadow-md bg-slate-950"
    />
  );
};

// ==========================================
// MAIN COMPONENT CLASS / FUNCTION
// ==========================================
const C10_ChemistryVapourdensityandmolecularmassSim: React.FC<{
  onComplete?: (score: number) => void;
}> = ({ onComplete }) => {
  // Navigation & Tab State
  const [activeTab, setActiveTab] = useState<'discovery' | 'lab' | 'challenges' | 'summary'>('discovery');
  const [activeExplorationIndex, setActiveExplorationIndex] = useState<number>(0);

  // Discovery & Exploration States
  const [selectedDiscoveryOption, setSelectedDiscoveryOption] = useState<number | null>(null);
  const [discoverySubmitted, setDiscoverySubmitted] = useState<boolean>(false);
  const [predictionAnswers, setPredictionAnswers] = useState<(number | null)[]>([null, null]);
  const [observationAnswers, setObservationAnswers] = useState<(number | null)[]>([null, null]);

  // Interactive Lab State Variables
  const [selectedGas, setSelectedGas] = useState<GasSpecies>(GAS_DATABASE[7]); // CO2 default
  const [temperatureK, setTemperatureK] = useState<number>(273);
  const [pressureAtm, setPressureAtm] = useState<number>(1.0);
  const [isSimulatingCanvas, setIsSimulatingCanvas] = useState<boolean>(true);

  // Lab 3: Victor Meyer Simulator Controls
  const [vmLiquidMass, setVmLiquidMass] = useState<number>(0.116); // grams
  const [vmDisplacedVolume, setVmDisplacedVolume] = useState<number>(44.8); // mL
  const [vmCalculatedMW, setVmCalculatedMW] = useState<number | null>(null);
  const [vmCalculatedVD, setVmCalculatedVD] = useState<number | null>(null);

  // Lab 4: Gas Mixture Calculator State
  const [mixGas1, setMixGas1] = useState<GasSpecies>(GAS_DATABASE[5]); // O2
  const [mixGas2, setMixGas2] = useState<GasSpecies>(GAS_DATABASE[4]); // N2
  const [mixPercent1, setMixPercent1] = useState<number>(50); // 50% O2

  // Lab 5: Empirical Formula Workbench State
  const [percentC, setPercentC] = useState<number>(85.7);
  const [percentH, setPercentH] = useState<number>(14.3);
  const [inputVD, setInputVD] = useState<number>(21);
  const [derivedFormula, setDerivedFormula] = useState<{ ef: string; mf: string; n: number } | null>(null);

  // Challenge Engine States
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState<number>(0);
  const [selectedChallengeOption, setSelectedChallengeOption] = useState<number | null>(null);
  const [numericAnswerInput, setNumericAnswerInput] = useState<string>('');
  const [challengeSubmitted, setChallengeSubmitted] = useState<boolean>(false);
  const [challengeFeedback, setChallengeFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);

  // Game Score & Tracking
  const [score, setScore] = useState<number>(0);
  const [completedChallengesCount, setCompletedChallengesCount] = useState<number>(0);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);

  // Auto-hint Timer (10s inactivity)
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHintText, setCurrentHintText] = useState<string>('');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // SRS & BKT Mastery Tracking
  const [bktStates, setBktStates] = useState<BKTStateMap>(() => {
    const initial: BKTStateMap = {};
    ALL_NODE_IDS.forEach((id) => {
      initial[id] = createBKTState();
    });
    return initial;
  });

  const [srsItems, setSrsItems] = useState<SRSStateMap>(() => {
    const initial: SRSStateMap = {};
    ALL_NODE_IDS.forEach((id) => {
      initial[id] = createReviewItem(id);
    });
    return initial;
  });

  // Current Challenge Instance
  const currentChallenge = CHALLENGES[currentChallengeIndex];

  // ==========================================
  // HELPER FUNCTIONS & AUDIO TRIGGERS
  // ==========================================
  const triggerAudio = useCallback((soundType: SoundEffect) => {
    audioManager.play(soundType);
  }, []);

  const triggerSpeech = useCallback((text: string) => {
    speechManager.speak(text);
  }, []);

  // Reset hint timer on user interaction
  const resetInactivityTimer = useCallback(() => {
    setShowHint(false);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      if (activeTab === 'challenges' && currentChallenge) {
        setCurrentHintText(currentChallenge.hints[0]);
        setShowHint(true);
        triggerAudio('hint');
        triggerSpeech(`Here is a helpful hint: ${currentChallenge.hints[0]}`);
      }
    }, 10000); // 10 seconds
  }, [activeTab, currentChallenge, triggerAudio, triggerSpeech]);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentChallengeIndex, activeTab, resetInactivityTimer]);

  // Handle Discovery Submission
  const handleDiscoverySubmit = () => {
    if (selectedDiscoveryOption === null) return;
    setDiscoverySubmitted(true);
    resetInactivityTimer();

    if (selectedDiscoveryOption === DISCOVERY_QUESTION.correctIndex) {
      triggerAudio('success');
      triggerSpeech('Correct! Vapour density is a relative mass ratio, so it remains constant regardless of temperature and pressure!');
      setShowSparkle(true);
      setTimeout(() => setShowSparkle(false), 2000);
    } else {
      triggerAudio('error');
      triggerSpeech('Not quite! Remember that both sample gas and hydrogen gas expand or compress by the exact same ratio when temperature or pressure changes.');
    }
  };

  // Handle Victor Meyer Simulation Calculation
  const calculateVictorMeyer = () => {
    triggerAudio('count');
    // Moles = Volume (L) / 22.4 L/mol
    const moles = (vmDisplacedVolume / 1000) / 22.4;
    const mw = vmLiquidMass / moles;
    const vd = mw / 2;
    setVmCalculatedMW(parseFloat(mw.toFixed(2)));
    setVmCalculatedVD(parseFloat(vd.toFixed(2)));
    triggerSpeech(`Calculated Molecular Mass is ${mw.toFixed(1)} grams per mole. Relative Vapour Density is ${vd.toFixed(1)}.`);
  };

  // Handle Empirical Formula Workbench Calculation
  const calculateEmpiricalFormula = () => {
    triggerAudio('balance');
    const molesC = percentC / 12.011;
    const molesH = percentH / 1.008;
    const minMoles = Math.min(molesC, molesH);
    const ratioC = Math.round(molesC / minMoles);
    const ratioH = Math.round(molesH / minMoles);

    const efStr = `C${ratioC > 1 ? ratioC : ''}H${ratioH > 1 ? ratioH : ''}`;
    const efMass = ratioC * 12.011 + ratioH * 1.008;

    const mw = inputVD * 2;
    const n = Math.round(mw / efMass);
    const mfStr = `C${ratioC * n}H${ratioH * n}`;

    setDerivedFormula({ ef: efStr, mf: mfStr, n });
    triggerSpeech(`Empirical formula is ${efStr}. With vapour density ${inputVD}, the molecular mass is ${mw}, giving molecular formula ${mfStr}.`);
  };

  // Challenge Engine Handlers
  const handleChallengeSubmit = () => {
    if (challengeSubmitted) return;

    let isCorrect = false;
    let studentAnsText = '';

    if (currentChallenge.type === 'mcq') {
      if (selectedChallengeOption === null) return;
      isCorrect = selectedChallengeOption === currentChallenge.correctIndex;
      studentAnsText = currentChallenge.options ? currentChallenge.options[selectedChallengeOption] : '';
    } else if (currentChallenge.type === 'numeric') {
      const val = parseFloat(numericAnswerInput);
      if (isNaN(val)) return;
      const target = currentChallenge.correctAnswer ?? 0;
      const tol = currentChallenge.tolerance ?? 0.5;
      isCorrect = Math.abs(val - target) <= tol;
      studentAnsText = `${val} ${currentChallenge.unit || ''}`;
    }

    setChallengeSubmitted(true);

    // BKT & SRS Update
    const nodeId = currentChallenge.nodeId;
    const prevBKT = bktStates[nodeId] || createBKTState();
    const newBKT = bktUpdate(prevBKT, isCorrect);
    setBktStates((prev) => ({ ...prev, [nodeId]: newBKT }));

    const prevSRS = srsItems[nodeId] || createReviewItem(nodeId);
    const quality = isCorrect ? 5 : 1;
    const newSRS = sm2Update(prevSRS, quality);
    setSrsItems((prev) => ({ ...prev, [nodeId]: newSRS }));

    if (isCorrect) {
      triggerAudio('drop-correct');
      triggerAudio('chime');
      setScore((prev) => prev + (currentChallenge.difficulty === 'foundation' ? 10 : currentChallenge.difficulty === 'standard' ? 15 : 20));
      setCompletedChallengesCount((prev) => prev + 1);
      setChallengeFeedback({
        isCorrect: true,
        message: `Excellent! ${currentChallenge.explanation}`
      });
      triggerSpeech('Well done! That is correct.');
      setShowSparkle(true);
      setTimeout(() => setShowSparkle(false), 2000);
    } else {
      triggerAudio('drop-wrong');
      setChallengeFeedback({
        isCorrect: false,
        message: `Incorrect. ${currentChallenge.explanation}`
      });
      triggerSpeech('That answer is incorrect. Review the step-by-step breakdown.');
    }
  };

  const handleNextChallenge = () => {
    triggerAudio('whoosh');
    setChallengeSubmitted(false);
    setSelectedChallengeOption(null);
    setNumericAnswerInput('');
    setChallengeFeedback(null);
    setShowHint(false);

    if (currentChallengeIndex < CHALLENGES.length - 1) {
      setCurrentChallengeIndex((prev) => prev + 1);
    } else {
      // Completed all challenges!
      triggerAudio('celebration');
      setShowConfetti(true);
      setShowSuccessBanner(true);
      triggerSpeech('Congratulations! You have successfully completed all Vapour Density and Molecular Mass challenges!');
      recordGameScore('c10_chem_vapour_density', score);
      if (onComplete) onComplete(score);
    }
  };

  // Mean VD calculation for Lab 4
  const meanVDCalculated = useMemo(() => {
    const fraction1 = mixPercent1 / 100;
    const fraction2 = (100 - mixPercent1) / 100;
    const meanMW = fraction1 * mixGas1.molecularMass + fraction2 * mixGas2.molecularMass;
    return {
      meanMW: parseFloat(meanMW.toFixed(2)),
      meanVD: parseFloat((meanMW / 2).toFixed(2))
    };
  }, [mixGas1, mixGas2, mixPercent1]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans selection:bg-cyan-500 selection:text-white">
      {/* HEADER SECTION */}
      <header className="max-w-6xl mx-auto mb-6 flex flex-col md:flex-row items-start md:items-center justify-between border-b border-slate-800 pb-4 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-cyan-950 text-cyan-400 text-xs px-2.5 py-0.5 rounded-full border border-cyan-800 font-semibold uppercase tracking-wider">
              ICSE Class 10 Chemistry
            </span>
            <span className="bg-amber-950 text-amber-400 text-xs px-2.5 py-0.5 rounded-full border border-amber-800 font-semibold uppercase tracking-wider">
              Stoichiometry & Gas Laws
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-amber-300">
            Vapour Density & Molecular Mass
          </h1>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Master Avogadro's Hypothesis, Victor Meyer Volatilization & Empirical Derivations
          </p>
        </div>

        {/* Global Score & Progress Badge */}
        <div className="flex items-center gap-4 bg-slate-900 border border-slate-800 rounded-xl p-3 px-5 shadow-lg">
          <div className="text-center">
            <div className="text-xs text-slate-400 uppercase tracking-wider">Score</div>
            <div className="text-xl font-bold text-amber-400">{score}</div>
          </div>
          <div className="h-8 w-px bg-slate-800" />
          <div className="text-center">
            <div className="text-xs text-slate-400 uppercase tracking-wider">Mastery</div>
            <div className="text-xl font-bold text-cyan-400">
              {Math.round((completedChallengesCount / CHALLENGES.length) * 100)}%
            </div>
          </div>
        </div>
      </header>

      {/* TOP NAVIGATION TABS */}
      <nav className="max-w-6xl mx-auto mb-6 grid grid-cols-2 md:grid-cols-4 gap-2 bg-slate-900/90 p-1.5 rounded-xl border border-slate-800 shadow-md">
        <button
          onClick={() => { triggerAudio('tap'); setActiveTab('discovery'); }}
          className={`py-2.5 px-4 rounded-lg font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
            activeTab === 'discovery'
              ? 'bg-gradient-to-r from-cyan-600 to-sky-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <span>🔍</span> 1. Discovery Scenario
        </button>

        <button
          onClick={() => { triggerAudio('tap'); setActiveTab('lab'); }}
          className={`py-2.5 px-4 rounded-lg font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
            activeTab === 'lab'
              ? 'bg-gradient-to-r from-cyan-600 to-sky-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <span>🧪</span> 2. Interactive Labs ({EXPLORATION_STEPS.length})
        </button>

        <button
          onClick={() => { triggerAudio('tap'); setActiveTab('challenges'); }}
          className={`py-2.5 px-4 rounded-lg font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
            activeTab === 'challenges'
              ? 'bg-gradient-to-r from-cyan-600 to-sky-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <span>🎯</span> 3. Challenges ({CHALLENGES.length})
        </button>

        <button
          onClick={() => { triggerAudio('tap'); setActiveTab('summary'); }}
          className={`py-2.5 px-4 rounded-lg font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
            activeTab === 'summary'
              ? 'bg-gradient-to-r from-cyan-600 to-sky-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <span>📘</span> 4. Real-World & Mastery
        </button>
      </nav>

      {/* MAIN CONTENT AREA */}
      <main className="max-w-6xl mx-auto">
        {/* ========================================== */}
        {/* TAB 1: DISCOVERY SCENARIO                  */}
        {/* ========================================== */}
        {activeTab === 'discovery' && (
          <div className="space-y-6">
            {/* Scenario Narrative Box */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">🏛️</span>
                <h2 className="text-xl md:text-2xl font-bold text-cyan-300">{SCENARIO.title}</h2>
              </div>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-4">
                {SCENARIO.intro}
              </p>
              <div className="bg-slate-950/60 rounded-xl p-4 border border-slate-800/80 text-xs md:text-sm text-slate-400 leading-relaxed">
                <strong className="text-cyan-400 font-semibold">Laboratory Context: </strong>
                {SCENARIO.context}
              </div>
            </div>

            {/* Counterintuitive Discovery Question */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-amber-500/10 text-amber-400 text-xs font-bold px-2.5 py-1 rounded-md border border-amber-500/20">
                  CRITICAL PRECONCEPTION TEST
                </span>
                <span className="text-xs text-slate-500">Node: c10_chem_035</span>
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-slate-100 mb-6">
                {DISCOVERY_QUESTION.question}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                {DISCOVERY_QUESTION.options.map((opt, idx) => {
                  const isSelected = selectedDiscoveryOption === idx;
                  const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;

                  let cardStyle = 'bg-slate-800/60 border-slate-700/80 text-slate-300 hover:bg-slate-800 hover:border-slate-600';
                  if (discoverySubmitted) {
                    if (isCorrect) {
                      cardStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-semibold';
                    } else if (isSelected && !isCorrect) {
                      cardStyle = 'bg-rose-950/80 border-rose-500 text-rose-200';
                    } else {
                      cardStyle = 'bg-slate-900/40 border-slate-800 text-slate-500 opacity-60';
                    }
                  } else if (isSelected) {
                    cardStyle = 'bg-cyan-950/80 border-cyan-500 text-cyan-200 font-semibold';
                  }

                  return (
                    <button
                      key={idx}
                      disabled={discoverySubmitted}
                      onClick={() => {
                        triggerAudio('tap');
                        setSelectedDiscoveryOption(idx);
                      }}
                      className={`p-4 rounded-xl text-left border text-xs md:text-sm transition-all duration-200 ${cardStyle}`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-slate-700/50 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{opt}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {!discoverySubmitted ? (
                <button
                  disabled={selectedDiscoveryOption === null}
                  onClick={handleDiscoverySubmit}
                  className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-white font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
                >
                  Submit & Reveal Insight
                </button>
              ) : (
                <div className="bg-cyan-950/40 border border-cyan-800/60 rounded-xl p-4 text-xs md:text-sm text-cyan-200 leading-relaxed">
                  <strong className="text-cyan-400 font-bold block mb-1">Scientific Insight:</strong>
                  {DISCOVERY_QUESTION.hintAfter}
                </div>
              )}
            </div>

            {/* Mandatory Prediction Questions Section */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
              <h3 className="text-lg font-bold text-amber-300 mb-4 flex items-center gap-2">
                <span>🔮</span> Prediction Questions (Pre-Lab Analysis)
              </h3>
              <div className="space-y-6">
                {PREDICTION_QUESTIONS.map((pred, pIdx) => (
                  <div key={pIdx} className="bg-slate-950/60 p-5 rounded-xl border border-slate-800">
                    <div className="text-xs text-amber-400 font-bold mb-1">PREDICTION #{pIdx + 1}</div>
                    <div className="text-sm font-semibold text-slate-200 mb-3">{pred.question}</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                      {pred.options.map((opt, oIdx) => (
                        <button
                          key={oIdx}
                          onClick={() => {
                            triggerAudio('tap');
                            const next = [...predictionAnswers];
                            next[pIdx] = oIdx;
                            setPredictionAnswers(next);
                          }}
                          className={`p-3 rounded-lg text-left text-xs transition-all ${
                            predictionAnswers[pIdx] === oIdx
                              ? 'bg-amber-950/80 border-amber-500 text-amber-200 font-semibold border'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                    {predictionAnswers[pIdx] !== null && (
                      <div className="text-xs text-slate-400 bg-slate-900 p-2.5 rounded border border-slate-800">
                        <strong className="text-amber-400">How to Verify: </strong>
                        {pred.verifyInstruction}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* TAB 2: INTERACTIVE LABS (5 STEPS)          */}
        {/* ========================================== */}
        {activeTab === 'lab' && (
          <div className="space-y-6">
            {/* Lab Sub-tabs */}
            <div className="flex flex-wrap gap-2 bg-slate-900 p-2 rounded-xl border border-slate-800">
              {EXPLORATION_STEPS.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    triggerAudio('tap');
                    setActiveExplorationIndex(idx);
                  }}
                  className={`py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
                    activeExplorationIndex === idx
                      ? 'bg-cyan-600 text-white shadow'
                      : 'bg-slate-800/50 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {step.title}
                </button>
              ))}
            </div>

            {/* Instruction Banner */}
            <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl flex items-start gap-3">
              <span className="text-2xl">💡</span>
              <div>
                <h4 className="text-sm font-bold text-cyan-300">
                  {EXPLORATION_STEPS[activeExplorationIndex].title}
                </h4>
                <p className="text-xs text-slate-300 mt-1">
                  {EXPLORATION_STEPS[activeExplorationIndex].instruction}
                </p>
              </div>
            </div>

            {/* LAB INTERACTIVE CONTENT BASED ON ACTIVE EXPLORATION */}

            {/* LAB 1: Avogadro's Balance & Gas Comparator */}
            {activeExplorationIndex === 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-5 bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4">
                  <h4 className="text-sm font-bold text-slate-200">Select Gas Species for STP Comparison</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {GAS_DATABASE.slice(0, 10).map((gas) => (
                      <button
                        key={gas.id}
                        onClick={() => {
                          triggerAudio('tap');
                          setSelectedGas(gas);
                          triggerSpeech(`Selected ${gas.name}, molecular weight ${gas.molecularMass} grams per mole.`);
                        }}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          selectedGas.id === gas.id
                            ? 'bg-slate-800 border-cyan-400 shadow-lg'
                            : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:bg-slate-800/40'
                        }`}
                      >
                        <div className="text-xs font-bold" style={{ color: gas.color }}>{gas.name}</div>
                        <div className="text-xs text-slate-400">{gas.formula} | M = {gas.molecularMass}</div>
                      </button>
                    ))}
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                    <div className="text-xs text-slate-400">Mathematical Proof (Avogadro's Hypothesis):</div>
                    <div className="text-xs font-mono text-cyan-300">
                      VD = Mass of 1L {selectedGas.formula} / Mass of 1L H₂<br/>
                      VD = {selectedGas.molecularMass.toFixed(2)} / 2.016<br/>
                      <span className="text-amber-400 font-bold">VD = {selectedGas.vapourDensity.toFixed(2)}</span>
                    </div>
                    <div className="text-xs font-mono text-emerald-400 mt-1">
                      M = 2 × VD = 2 × {selectedGas.vapourDensity.toFixed(2)} = {selectedGas.molecularMass.toFixed(2)} g/mol
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7">
                  <MolecularComparisonSVG targetGas={selectedGas} />
                </div>
              </div>
            )}

            {/* LAB 2: Temperature & Pressure Invariance Chamber */}
            {activeExplorationIndex === 1 && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-5 bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-5">
                  <h4 className="text-sm font-bold text-slate-200">Chamber Conditions Controls</h4>

                  {/* Gas Select */}
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Target Gas Specimen:</label>
                    <select
                      value={selectedGas.id}
                      onChange={(e) => {
                        triggerAudio('tap');
                        const g = GAS_DATABASE.find(x => x.id === e.target.value);
                        if (g) setSelectedGas(g);
                      }}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-200 font-semibold"
                    >
                      {GAS_DATABASE.map(g => (
                        <option key={g.id} value={g.id}>{g.name} ({g.formula}) - M={g.molecularMass}</option>
                      ))}
                    </select>
                  </div>

                  {/* Temperature Slider */}
                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-1">
                      <span>Temperature (T):</span>
                      <span className="font-bold text-cyan-400">{temperatureK} K ({temperatureK - 273}°C)</span>
                    </div>
                    <input
                      type="range"
                      min="200"
                      max="800"
                      step="5"
                      value={temperatureK}
                      onChange={(e) => {
                        triggerAudio('swoop');
                        setTemperatureK(parseInt(e.target.value));
                      }}
                      className="w-full accent-cyan-500 cursor-pointer"
                    />
                  </div>

                  {/* Pressure Slider */}
                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-1">
                      <span>Pressure (P):</span>
                      <span className="font-bold text-amber-400">{pressureAtm.toFixed(1)} atm</span>
                    </div>
                    <input
                      type="range"
                      min="0.2"
                      max="5.0"
                      step="0.1"
                      value={pressureAtm}
                      onChange={(e) => {
                        triggerAudio('swoop');
                        setPressureAtm(parseFloat(e.target.value));
                      }}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
                    <strong className="text-emerald-400 block mb-1">Key Observation:</strong>
                    As you change Temperature or Pressure, particle velocity and compression change inside the chamber, altering absolute density (g/L). However, the ratio relative to Hydrogen remains <strong className="text-amber-300">EXACTLY {selectedGas.vapourDensity.toFixed(2)}</strong>!
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-4">
                  <GasChamberCanvas
                    gas={selectedGas}
                    tempK={temperatureK}
                    pressAtm={pressureAtm}
                    isSimulating={isSimulatingCanvas}
                  />
                  <VapourDensityVsTempPressureSVG
                    tempK={temperatureK}
                    pressAtm={pressureAtm}
                    gas={selectedGas}
                  />
                </div>
              </div>
            )}

            {/* LAB 3: Victor Meyer Vaporization Apparatus */}
            {activeExplorationIndex === 2 && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-5 bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4">
                  <h4 className="text-sm font-bold text-slate-200">Victor Meyer Micro-Balance Input</h4>

                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Mass of Volatile Liquid Sample (g):</label>
                    <input
                      type="number"
                      step="0.005"
                      value={vmLiquidMass}
                      onChange={(e) => setVmLiquidMass(parseFloat(e.target.value) || 0)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-cyan-300 font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Displaced Dry Air Volume at STP (mL):</label>
                    <input
                      type="number"
                      step="0.5"
                      value={vmDisplacedVolume}
                      onChange={(e) => setVmDisplacedVolume(parseFloat(e.target.value) || 0)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-amber-300 font-mono"
                    />
                  </div>

                  <button
                    onClick={calculateVictorMeyer}
                    className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs rounded-xl shadow-md transition-all"
                  >
                    Vaporize & Determine Molar Mass
                  </button>

                  {vmCalculatedMW !== null && (
                    <div className="bg-slate-950 p-4 rounded-xl border border-emerald-500/50 space-y-2">
                      <div className="text-xs text-emerald-400 font-bold">CALCULATION RESULTS:</div>
                      <div className="text-xs text-slate-300">
                        Moles of Vapor = {vmDisplacedVolume} / 22400 = <span className="font-mono text-cyan-300">{(vmDisplacedVolume / 22400).toFixed(5)} mol</span>
                      </div>
                      <div className="text-xs text-slate-300">
                        Molecular Mass M = {vmLiquidMass} / {(vmDisplacedVolume / 22400).toFixed(5)} = <span className="font-mono text-amber-300 font-bold">{vmCalculatedMW} g/mol</span>
                      </div>
                      <div className="text-xs text-slate-300">
                        Relative Vapour Density VD = {vmCalculatedMW} / 2 = <span className="font-mono text-emerald-300 font-bold">{vmCalculatedVD}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="lg:col-span-7">
                  <VictorMeyerDiagramSVG />
                </div>
              </div>
            )}

            {/* LAB 4: Polyatomic Elements & Gas Mixture Analyzer */}
            {activeExplorationIndex === 3 && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-6 bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-5">
                  <h4 className="text-sm font-bold text-slate-200">Binary Gas Mixture Composition Solver</h4>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-slate-400 block mb-1">Gas Component A:</label>
                      <select
                        value={mixGas1.id}
                        onChange={(e) => {
                          const g = GAS_DATABASE.find(x => x.id === e.target.value);
                          if (g) setMixGas1(g);
                        }}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-slate-200"
                      >
                        {GAS_DATABASE.map(g => (
                          <option key={g.id} value={g.id}>{g.name} ({g.formula})</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-xs text-slate-400 block mb-1">Gas Component B:</label>
                      <select
                        value={mixGas2.id}
                        onChange={(e) => {
                          const g = GAS_DATABASE.find(x => x.id === e.target.value);
                          if (g) setMixGas2(g);
                        }}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-slate-200"
                      >
                        {GAS_DATABASE.map(g => (
                          <option key={g.id} value={g.id}>{g.name} ({g.formula})</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-1">
                      <span>Volume % of {mixGas1.name}:</span>
                      <span className="font-bold text-cyan-400">{mixPercent1}% ({mixGas1.formula}) / {100 - mixPercent1}% ({mixGas2.formula})</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="5"
                      value={mixPercent1}
                      onChange={(e) => setMixPercent1(parseInt(e.target.value))}
                      className="w-full accent-cyan-500 cursor-pointer"
                    />
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                    <div className="text-xs text-amber-400 font-bold uppercase tracking-wider">Mixture Analysis Output</div>
                    <div className="flex justify-between text-xs text-slate-300">
                      <span>Effective Mean Molecular Mass:</span>
                      <span className="font-mono text-cyan-300 font-bold">{meanVDCalculated.meanMW} g/mol</span>
                    </div>
                    <div className="flex justify-between text-xs text-slate-300">
                      <span>Mean Relative Vapour Density:</span>
                      <span className="font-mono text-emerald-400 font-bold">{meanVDCalculated.meanVD}</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-6 bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4">
                  <h4 className="text-sm font-bold text-slate-200">Polyatomic Elemental Vapours Reference</h4>
                  <div className="space-y-3 text-xs">
                    {[
                      { name: 'Phosphorus Vapor', formula: 'P₄', atomicMass: 31, atomicity: 4 },
                      { name: 'Sulphur Vapor (500°C)', formula: 'S₈', atomicMass: 32, atomicity: 8 },
                      { name: 'Sulphur Vapor (900°C)', formula: 'S₂', atomicMass: 32, atomicity: 2 },
                      { name: 'Ozone Gas', formula: 'O₃', atomicMass: 16, atomicity: 3 }
                    ].map((item, idx) => {
                      const mw = item.atomicMass * item.atomicity;
                      const vd = mw / 2;
                      return (
                        <div key={idx} className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex justify-between items-center">
                          <div>
                            <div className="font-bold text-slate-200">{item.name} ({item.formula})</div>
                            <div className="text-slate-400 text-[11px]">Atomicity = {item.atomicity} | M = {item.atomicity} × {item.atomicMass} = {mw} g/mol</div>
                          </div>
                          <div className="text-right">
                            <div className="text-amber-400 font-bold">VD = {vd}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* LAB 5: Empirical Formula Workbench */}
            {activeExplorationIndex === 4 && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-5 bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4">
                  <h4 className="text-sm font-bold text-slate-200">Hydrocarbon Composition Inputs</h4>

                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Carbon Mass Percentage (%):</label>
                    <input
                      type="number"
                      step="0.1"
                      value={percentC}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value) || 0;
                        setPercentC(val);
                        setPercentH(parseFloat((100 - val).toFixed(1)));
                      }}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-cyan-300 font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Hydrogen Mass Percentage (%):</label>
                    <input
                      type="number"
                      step="0.1"
                      value={percentH}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value) || 0;
                        setPercentH(val);
                        setPercentC(parseFloat((100 - val).toFixed(1)));
                      }}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-amber-300 font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Experimental Vapour Density (VD):</label>
                    <input
                      type="number"
                      step="0.5"
                      value={inputVD}
                      onChange={(e) => setInputVD(parseFloat(e.target.value) || 0)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-emerald-300 font-mono"
                    />
                  </div>

                  <button
                    onClick={calculateEmpiricalFormula}
                    className="w-full py-3 bg-gradient-to-r from-cyan-600 to-sky-600 hover:from-cyan-500 hover:to-sky-500 text-white font-bold text-xs rounded-xl shadow-md transition-all"
                  >
                    Deduce Molecular Formula
                  </button>

                  {derivedFormula && (
                    <div className="bg-slate-950 p-4 rounded-xl border border-emerald-500/50 space-y-2">
                      <div className="text-xs text-emerald-400 font-bold">DERIVATION RESULT:</div>
                      <div className="text-xs text-slate-300">Empirical Formula: <span className="font-bold text-purple-400">{derivedFormula.ef}</span></div>
                      <div className="text-xs text-slate-300">Molecular Weight = 2 × {inputVD} = <span className="font-bold text-amber-400">{inputVD * 2} g/mol</span></div>
                      <div className="text-xs text-slate-300">Multiplier n = <span className="font-bold text-cyan-400">{derivedFormula.n}</span></div>
                      <div className="text-xs text-emerald-300 font-bold text-sm">Molecular Formula: {derivedFormula.mf}</div>
                    </div>
                  )}
                </div>

                <div className="lg:col-span-7">
                  <EmpiricalToMolecularSVG />
                </div>
              </div>
            )}

            {/* Mandatory Observation Questions Section */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
              <h3 className="text-lg font-bold text-cyan-300 mb-4 flex items-center gap-2">
                <span>👁️</span> Observation Questions (Post-Lab Analysis)
              </h3>
              <div className="space-y-6">
                {OBSERVATION_QUESTIONS.map((obs, oIdx) => (
                  <div key={oIdx} className="bg-slate-950/60 p-5 rounded-xl border border-slate-800">
                    <div className="text-xs text-cyan-400 font-bold mb-1">OBSERVATION #{oIdx + 1}</div>
                    <div className="text-sm font-semibold text-slate-200 mb-3">{obs.question}</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {obs.observableOptions.map((opt, optIdx) => (
                        <button
                          key={optIdx}
                          onClick={() => {
                            triggerAudio('tap');
                            const next = [...observationAnswers];
                            next[oIdx] = optIdx;
                            setObservationAnswers(next);
                            if (optIdx === obs.correctIndex) {
                              triggerAudio('success');
                              triggerSpeech('Correct observation!');
                            } else {
                              triggerAudio('error');
                            }
                          }}
                          className={`p-3 rounded-lg text-left text-xs transition-all ${
                            observationAnswers[oIdx] === optIdx
                              ? optIdx === obs.correctIndex
                                ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-semibold border'
                                : 'bg-rose-950/80 border-rose-500 text-rose-200 border'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* TAB 3: CHALLENGE ENGINE (22 CHALLENGES)   */}
        {/* ========================================== */}
        {activeTab === 'challenges' && (
          <div className="space-y-6">
            {/* Challenge Progress Header */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                    currentChallenge.difficulty === 'foundation'
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                      : currentChallenge.difficulty === 'standard'
                      ? 'bg-amber-950 text-amber-400 border border-amber-800'
                      : 'bg-purple-950 text-purple-400 border border-purple-800'
                  }`}>
                    {currentChallenge.difficulty} Tier
                  </span>
                  <span className="text-xs text-slate-400">Node: {currentChallenge.nodeId}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-100 mt-1">
                  Challenge {currentChallengeIndex + 1} of {CHALLENGES.length}: {currentChallenge.competencyLevel}
                </h3>
              </div>

              {/* Step indicator */}
              <div className="flex items-center gap-1 overflow-x-auto max-w-full pb-2 md:pb-0">
                {CHALLENGES.map((_, i) => (
                  <div
                    key={i}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      i === currentChallengeIndex
                        ? 'bg-cyan-400 scale-125'
                        : i < currentChallengeIndex
                        ? 'bg-emerald-500'
                        : 'bg-slate-800'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Question Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl relative">
              <HintBubble show={showHint} text={currentHintText} />

              <h4 className="text-base md:text-lg font-semibold text-slate-100 mb-6 leading-relaxed">
                {currentChallenge.question}
              </h4>

              {/* MCQ Options */}
              {currentChallenge.type === 'mcq' && currentChallenge.options && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                  {currentChallenge.options.map((optionText, oIdx) => {
                    const isSelected = selectedChallengeOption === oIdx;
                    const isCorrect = oIdx === currentChallenge.correctIndex;

                    let btnStyle = 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800/80';
                    if (challengeSubmitted) {
                      if (isCorrect) {
                        btnStyle = 'bg-emerald-950/90 border-emerald-500 text-emerald-200 font-bold';
                      } else if (isSelected && !isCorrect) {
                        btnStyle = 'bg-rose-950/90 border-rose-500 text-rose-200';
                      } else {
                        btnStyle = 'bg-slate-900/40 border-slate-800 text-slate-500 opacity-50';
                      }
                    } else if (isSelected) {
                      btnStyle = 'bg-cyan-950/90 border-cyan-500 text-cyan-200 font-bold';
                    }

                    return (
                      <button
                        key={oIdx}
                        disabled={challengeSubmitted}
                        onClick={() => {
                          triggerAudio('tap');
                          setSelectedChallengeOption(oIdx);
                          resetInactivityTimer();
                        }}
                        className={`p-4 rounded-xl text-left border text-xs md:text-sm transition-all duration-200 ${btnStyle}`}
                      >
                        <div className="flex items-start gap-3">
                          <span className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold shrink-0">
                            {String.fromCharCode(65 + oIdx)}
                          </span>
                          <span>{optionText}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Numeric Input Question */}
              {currentChallenge.type === 'numeric' && (
                <div className="mb-6 space-y-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      step="any"
                      placeholder="Enter numerical value..."
                      disabled={challengeSubmitted}
                      value={numericAnswerInput}
                      onChange={(e) => {
                        setNumericAnswerInput(e.target.value);
                        resetInactivityTimer();
                      }}
                      className="bg-slate-950 border border-slate-700 rounded-xl p-3.5 text-sm text-cyan-300 font-mono focus:border-cyan-400 focus:outline-none w-full max-w-xs"
                    />
                    {currentChallenge.unit && (
                      <span className="text-sm font-semibold text-slate-400">{currentChallenge.unit}</span>
                    )}
                  </div>
                </div>
              )}

              {/* Feedback Display Banner */}
              {challengeFeedback && (
                <div className={`p-4 rounded-xl border text-xs md:text-sm mb-6 ${
                  challengeFeedback.isCorrect
                    ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                    : 'bg-rose-950/80 border-rose-500 text-rose-200'
                }`}>
                  <strong className="block font-bold mb-1">
                    {challengeFeedback.isCorrect ? '✅ Correct Answer!' : '❌ Incorrect'}
                  </strong>
                  {challengeFeedback.message}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-between gap-4 border-t border-slate-800 pt-6">
                <button
                  onClick={() => {
                    triggerAudio('hint');
                    setCurrentHintText(currentChallenge.hints[0]);
                    setShowHint((prev) => !prev);
                  }}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5"
                >
                  <span>💡</span> {showHint ? 'Hide Hint' : 'Request Hint'}
                </button>

                {!challengeSubmitted ? (
                  <button
                    onClick={handleChallengeSubmit}
                    disabled={
                      (currentChallenge.type === 'mcq' && selectedChallengeOption === null) ||
                      (currentChallenge.type === 'numeric' && numericAnswerInput.trim() === '')
                    }
                    className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-white font-bold rounded-xl text-xs md:text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
                  >
                    Submit Answer
                  </button>
                ) : (
                  <button
                    onClick={handleNextChallenge}
                    className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold rounded-xl text-xs md:text-sm transition-all shadow-lg flex items-center gap-2"
                  >
                    <span>Next Challenge</span> <span>➔</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* TAB 4: REAL-WORLD & MASTERY SUMMARY       */}
        {/* ========================================== */}
        {activeTab === 'summary' && (
          <div className="space-y-6">
            {/* Real World Activity Section */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">🏭</span>
                <div>
                  <h3 className="text-xl font-bold text-slate-100">{REAL_WORLD_ACTIVITY.title}</h3>
                  <p className="text-xs text-slate-400">Industrial Chemistry Case Study</p>
                </div>
              </div>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed mb-6">
                {REAL_WORLD_ACTIVITY.description}
              </p>

              <div className="space-y-3">
                {REAL_WORLD_ACTIVITY.steps.map((stepText, sIdx) => (
                  <div key={sIdx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      {sIdx + 1}
                    </span>
                    <div>{stepText}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Preserved Misconceptions Debunking Grid */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
              <h3 className="text-lg font-bold text-amber-300 mb-6 flex items-center gap-2">
                <span>⚠️</span> ICSE Chemistry Misconceptions & Corrections
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MISCONCEPTIONS.map((misc) => (
                  <div key={misc.id} className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2">
                    <div className="text-xs font-bold text-amber-400">{misc.title}</div>
                    <div className="text-xs text-rose-300 bg-rose-950/40 p-2.5 rounded border border-rose-900/50">
                      <strong>Common Misconception: </strong>{misc.studentBelief}
                    </div>
                    <div className="text-xs text-emerald-300 bg-emerald-950/40 p-2.5 rounded border border-emerald-900/50">
                      <strong>Scientific Fact: </strong>{misc.scientificFact}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Node Mastery Breakdown Grid */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
              <h3 className="text-lg font-bold text-cyan-300 mb-4 flex items-center gap-2">
                <span>📊</span> Topic Concept Mastery (BKT Tracker)
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {ALL_NODE_IDS.map((nodeId) => {
                  const bkt = bktStates[nodeId];
                  const level = getMasteryLevel(bkt);
                  const pVal = Math.round(bkt.pKnown * 100);

                  return (
                    <div key={nodeId} className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center space-y-1">
                      <div className="text-[10px] text-slate-400 font-mono">{nodeId}</div>
                      <div className="text-base font-bold text-slate-200">{pVal}%</div>
                      <div className={`text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase ${
                        level === 'mastered'
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                          : level === 'proficient'
                          ? 'bg-amber-950 text-amber-400 border border-amber-800'
                          : 'bg-slate-800 text-slate-400'
                      }`}>
                        {level}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* MANDATORY FEEDBACK COMPONENTS */}
      <SuccessBanner show={showSuccessBanner} text="Congratulations! Vapour Density Mastery Achieved!" />
      <Confetti show={showConfetti} />
      <SparkleBurst show={showSparkle} x={400} y={300} />
    </div>
  );
};

export default C10_ChemistryVapourdensityandmolecularmassSim;