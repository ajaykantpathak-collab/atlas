'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update, SRSItem } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, BKTState } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ==========================================
// 1. MANDATORY NODE IDS & METADATA
// ==========================================
const ALL_NODE_IDS = [
  'c11_chem_cbse_002',
  'c11_chem_cbse_003',
  'c11_chem_cbse_004',
  'c11_chem_cbse_005',
  'c11_chem_cbse_007',
  'c11_chem_cbse_008',
  'c11_chem_cbse_009',
  'c11_chem_cbse_010',
  'c11_chem_cbse_011',
  'c11_chem_cbse_012',
  'c11_chem_cbse_013',
  'c11_chem_cbse_014',
  'c11_chem_cbse_015',
  'c11_chem_cbse_016',
  'c11_chem_cbse_017',
  'c11_chem_cbse_018',
  'c11_chem_cbse_019',
  'c11_chem_cbse_020',
  'c11_chem_cbse_021',
  'c11_chem_cbse_022',
  'c11_chem_cbse_023',
  'c11_chem_cbse_024',
  'c11_chem_cbse_026',
  'c11_chem_cbse_032',
  'c11_chem_cbse_033',
  'c11_chem_cbse_044',
  'c11_chem_cbse_045',
  'c11_chem_cbse_046',
  'c11_chem_cbse_049',
] as const;

type NodeId = typeof ALL_NODE_IDS[number];

interface NodeInfo {
  id: NodeId;
  title: string;
  formula?: string;
  description: string;
}

const NODE_DETAILS: Record<NodeId, NodeInfo> = {
  c11_chem_cbse_002: { id: 'c11_chem_cbse_002', title: 'Matter & Its Classification', description: 'Classification of matter into elements, compounds, and homogeneous/heterogeneous mixtures.' },
  c11_chem_cbse_003: { id: 'c11_chem_cbse_003', title: 'Properties of Matter & Measurement', description: 'Physical vs chemical properties and quantitative measurements in chemical analysis.' },
  c11_chem_cbse_004: { id: 'c11_chem_cbse_004', title: 'SI Base Units & Derived Units', description: 'The 7 fundamental SI base units (kg, m, s, A, K, mol, cd) and derived units.' },
  c11_chem_cbse_005: { id: 'c11_chem_cbse_005', title: 'Scientific Notation & Measurement Uncertainty', description: 'Expressing very large or small numbers as N x 10^n with precision and accuracy.' },
  c11_chem_cbse_007: { id: 'c11_chem_cbse_007', title: 'Significant Figures & Rounding Rules', description: 'Determining significant digits in measurements and calculations (addition/multiplication).' },
  c11_chem_cbse_008: { id: 'c11_chem_cbse_008', title: 'Dimensional Analysis & Factor-Label Method', description: 'Converting quantities between unit systems using conversion factors.' },
  c11_chem_cbse_009: { id: 'c11_chem_cbse_009', title: 'Law of Conservation of Mass', formula: 'Mass(Reactants) = Mass(Products)', description: 'Matter can neither be created nor destroyed in a chemical reaction (Lavoisier, 1789).' },
  c11_chem_cbse_010: { id: 'c11_chem_cbse_010', title: 'Law of Definite / Constant Proportions', formula: 'Mass Ratio = Constant', description: 'A pure chemical compound always contains the exact same elements combined in a fixed ratio by mass (Proust).' },
  c11_chem_cbse_011: { id: 'c11_chem_cbse_011', title: 'Law of Multiple Proportions', formula: 'm_B1 : m_B2 = Small Whole Numbers', description: 'When two elements form >1 compound, the masses of one element combining with a fixed mass of the other are in small whole number ratios (Dalton).' },
  c11_chem_cbse_012: { id: 'c11_chem_cbse_012', title: 'Gay Lussac’s Law of Gaseous Volumes', formula: 'V1 : V2 = Simple Ratio (at T, P)', description: 'Gases combine or react in simple whole-number ratios by volume at constant T and P.' },
  c11_chem_cbse_013: { id: 'c11_chem_cbse_013', title: 'Avogadro’s Law & Molar Volume', formula: 'V ∝ n (at constant T, P)', description: 'Equal volumes of all gases under identical T and P contain equal number of molecules. 1 mol = 22.71 L at STP (22.4 L traditional).' },
  c11_chem_cbse_014: { id: 'c11_chem_cbse_014', title: 'Dalton’s Atomic Theory', description: 'Indivisible atoms, identical mass for identical elements, compounds as fixed atomic combinations.' },
  c11_chem_cbse_015: { id: 'c11_chem_cbse_015', title: 'Atomic Mass & Unified Mass Unit (u)', formula: '1 u = 1/12 x Mass of 12C = 1.66056x10^-27 kg', description: 'Atomic mass scale relative to Carbon-12 standard isotope.' },
  c11_chem_cbse_016: { id: 'c11_chem_cbse_016', title: 'Average Atomic Mass & Isotopic Abundance', formula: 'A_avg = Σ (Percent Abundance x Atomic Mass) / 100', description: 'Weighted average mass taking naturally occurring isotopes into account.' },
  c11_chem_cbse_017: { id: 'c11_chem_cbse_017', title: 'Molecular Mass & Formula Mass', formula: 'Molecular Mass = Σ Atomic Masses', description: 'Sum of atomic masses of all constituent atoms in a molecule or formula unit.' },
  c11_chem_cbse_018: { id: 'c11_chem_cbse_018', title: 'Mole Concept & Avogadro Constant', formula: 'N_A = 6.02214076 x 10^23 mol^-1', description: 'The fundamental unit for amount of substance containing N_A elementary entities.' },
  c11_chem_cbse_019: { id: 'c11_chem_cbse_019', title: 'Molar Mass (M)', formula: 'M = m / n (g/mol)', description: 'Mass of one mole of a chemical substance in grams per mole.' },
  c11_chem_cbse_020: { id: 'c11_chem_cbse_020', title: 'Percentage Composition', formula: 'Mass % = (Mass of element in 1 mol / Molar mass of compound) x 100', description: 'Mass percentage of each element present in a chemical compound.' },
  c11_chem_cbse_021: { id: 'c11_chem_cbse_021', title: 'Empirical Formula Determination', description: 'Simplest whole-number ratio of atoms of different elements present in a molecule.' },
  c11_chem_cbse_022: { id: 'c11_chem_cbse_022', title: 'Molecular Formula from Empirical Formula', formula: 'Molecular Formula = n x (Empirical Formula), n = Molar Mass / Empirical Mass', description: 'Actual ratio of constituent atoms in a molecular compound.' },
  c11_chem_cbse_023: { id: 'c11_chem_cbse_023', title: 'Stoichiometric Calculations', formula: 'aA + bB -> cC + dD', description: 'Quantitative relationships between reactants and products in balanced chemical equations.' },
  c11_chem_cbse_024: { id: 'c11_chem_cbse_024', title: 'Limiting Reagent & Theoretical Yield', description: 'The reactant that is completely consumed first, limiting the maximum amount of product.' },
  c11_chem_cbse_026: { id: 'c11_chem_cbse_026', title: 'Percentage Yield & Reaction Efficiency', formula: '% Yield = (Actual Yield / Theoretical Yield) x 100', description: 'Efficiency of a chemical transformation in practical laboratory conditions.' },
  c11_chem_cbse_032: { id: 'c11_chem_cbse_032', title: 'Mass Percentage (w/w) & Volume Percentage (v/v)', formula: 'Mass % = (Mass of Solute / Total Mass of Solution) x 100', description: 'Expressing solute concentration relative to total solution mass or volume.' },
  c11_chem_cbse_033: { id: 'c11_chem_cbse_033', title: 'Mole Fraction (x)', formula: 'x_A = n_A / (n_A + n_B)', description: 'Ratio of number of moles of a component to total moles of all components in solution.' },
  c11_chem_cbse_044: { id: 'c11_chem_cbse_044', title: 'Molarity (M) & Dilution Law', formula: 'M = n / V_L ; M1 V1 = M2 V2', description: 'Number of moles of solute dissolved in 1 litre of solution. Dependent on temperature.' },
  c11_chem_cbse_045: { id: 'c11_chem_cbse_045', title: 'Molality (m) & Temperature Independence', formula: 'm = n_solute / Mass_solvent(kg)', description: 'Moles of solute per 1 kg of solvent. Independent of temperature changes.' },
  c11_chem_cbse_046: { id: 'c11_chem_cbse_046', title: 'Normality (N) & Equivalent Mass', formula: 'N = Gram Equivalents / V_L ; Eq Mass = Molar Mass / n-factor', description: 'Number of gram equivalents per litre of solution, dependent on chemical reaction type.' },
  c11_chem_cbse_049: { id: 'c11_chem_cbse_049', title: 'Solution Stoichiometry & Titration', formula: 'M1 V1 / n1 = M2 V2 / n2', description: 'Stoichiometric calculations involving volumetric solutions and neutralization titrations.' }
};

// ==========================================
// 2. SCENARIO & DISCOVERY QUESTION
// ==========================================
const SCENARIO = {
  title: 'ISC & CBSE Advanced Quantitative Chemistry Virtual Lab',
  intro: 'Welcome, Chemist! You are directing the Precision Stoichiometry and Analytical Control Laboratory at the Indian Institute of Chemical Technology.',
  context: 'Your task is to master stoichiometry, atomic mass determination, empirical formulae synthesis, and volumetric solution stoichiometry to formulate ultra-pure pharmaceuticals and industrial chemicals.'
};

const DISCOVERY_QUESTION = {
  question: 'When 2.00 g of hydrogen gas (H2) reacts completely with 16.00 g of oxygen gas (O2) to form water (H2O), what mass of water vapor is produced, and what fundamental law does this demonstrate?',
  options: [
    '18.00 g of H2O, demonstrating the Law of Conservation of Mass',
    '34.00 g of H2O, demonstrating the Law of Multiple Proportions',
    '9.00 g of H2O, because oxygen is in excess by 50%',
    '16.00 g of H2O, demonstrating Gay-Lussac’s Law of Volumes'
  ],
  correctIndex: 0,
  hintAfter: 'Remember Antoine Lavoisier (1789): Total mass of reactants (2.00 g + 16.00 g = 18.00 g) equals total mass of products in a closed system!'
};

// ==========================================
// 3. MISCONCEPTIONS
// ==========================================
interface Misconception {
  id: string;
  misconception: string;
  correction: string;
  explanation: string;
  nodeId: NodeId;
}

const MISCONCEPTIONS: Misconception[] = [
  {
    id: 'misc_1',
    misconception: '1 mole of any chemical substance always weighs 22.4 grams.',
    correction: '1 mole contains 6.022 x 10^23 entities. Its mass equals the Molar Mass in grams (e.g., 1 mol H2O = 18 g, 1 mol CO2 = 44 g). 22.4 L is the volume of 1 mol of ideal gas at STP (0°C, 1 atm).',
    explanation: 'Confusing molar mass (g/mol) with molar gas volume (L/mol at standard temperature and pressure).',
    nodeId: 'c11_chem_cbse_018'
  },
  {
    id: 'misc_2',
    misconception: 'The limiting reagent is always the reactant present in the smallest mass or fewest moles.',
    correction: 'The limiting reagent depends on BOTH the available moles AND the stoichiometric coefficients in the balanced chemical equation.',
    explanation: 'For 2H2 + O2 -> 2H2O, 3 moles of H2 and 2 moles of O2 will consume 3 moles of H2 and 1.5 moles of O2, leaving O2 in excess. H2 is limiting even though 3 > 2.',
    nodeId: 'c11_chem_cbse_024'
  },
  {
    id: 'misc_3',
    misconception: 'Molarity and Molality are identical concentration units and change with temperature in the same way.',
    correction: 'Molarity (M) = moles solute / volume solution (L) and varies with temperature because liquid volume expands/contracts. Molality (m) = moles solute / mass solvent (kg) and is temperature-independent.',
    explanation: 'Mass does not change with temperature, but volume changes due to thermal expansion.',
    nodeId: 'c11_chem_cbse_045'
  },
  {
    id: 'misc_4',
    misconception: 'Empirical formula and Molecular formula are always completely different formulas.',
    correction: 'For many compounds like H2O, NH3, CH4, or CO2, the empirical formula IS identical to the molecular formula because the atomic ratio cannot be reduced further (n = 1).',
    explanation: 'Molecular formula = n x (Empirical formula). When n = 1, both formulas are identical.',
    nodeId: 'c11_chem_cbse_022'
  },
  {
    id: 'misc_5',
    misconception: 'Atomic mass unit (u) is defined as 1/12th of the mass of a single Hydrogen-1 atom.',
    correction: '1 u is defined strictly as 1/12th of the mass of one neutral Carbon-12 atom in its ground state (1 u = 1.660539 x 10^-24 g).',
    explanation: 'IUPAC adopted the Carbon-12 standard in 1961 to provide a stable, highly precise isotope mass reference.',
    nodeId: 'c11_chem_cbse_015'
  },
  {
    id: 'misc_6',
    misconception: 'Significant figures apply only to measured values, and zero before a decimal point is always significant.',
    correction: 'Leading zeros (e.g., 0.0025) are NEVER significant; they are placeholders. Trailing zeros after a decimal point (e.g., 2.500) ARE significant.',
    explanation: '0.0025 has 2 significant figures. 2.500 has 4 significant figures.',
    nodeId: 'c11_chem_cbse_007'
  }
];

// ==========================================
// 4. EXPLORATION STEPS
// ==========================================
interface ExplorationStep {
  title: string;
  instruction: string;
  interactionType: 'mass_spectrometer' | 'mole_converter' | 'reaction_chamber' | 'solution_prep' | 'empirical_calc';
  nodeId: NodeId;
}

const EXPLORATION_STEPS: ExplorationStep[] = [
  {
    title: 'Lab 1: High-Precision Mass Spectrometry & Average Atomic Mass',
    instruction: 'Adjust the isotopic abundances of Chlorine (35-Cl vs 37-Cl) or Carbon (12-C vs 13-C) to calculate weighted average atomic mass.',
    interactionType: 'mass_spectrometer',
    nodeId: 'c11_chem_cbse_016'
  },
  {
    title: 'Lab 2: The Mole Unit Converter & Particle Count Simulator',
    instruction: 'Toggle between Moles, Mass (g), Gas Volume at STP (L), and Total Entities (Atoms/Molecules) using the Avogadro bridge.',
    interactionType: 'mole_converter',
    nodeId: 'c11_chem_cbse_018'
  },
  {
    title: 'Lab 3: Reaction Chamber, Stoichiometry & Limiting Reagents',
    instruction: 'Mix reactants (H2 + O2 -> H2O or N2 + H2 -> NH3), balance equations, and identify the limiting reagent and excess reactant.',
    interactionType: 'reaction_chamber',
    nodeId: 'c11_chem_cbse_024'
  },
  {
    title: 'Lab 4: Solution Volumetrics: Molarity, Molality & Dilutions',
    instruction: 'Dissolve NaOH or CuSO4 in water. Alter solute mass, solution volume, and temperature to compare Molarity (M) vs Molality (m).',
    interactionType: 'solution_prep',
    nodeId: 'c11_chem_cbse_044'
  },
  {
    title: 'Lab 5: Empirical & Molecular Formula Quantitative Synthesizer',
    instruction: 'Perform elemental combustion analysis data fitting (%C, %H, %O) to deduce empirical formula and determine molecular formula multiplier n.',
    interactionType: 'empirical_calc',
    nodeId: 'c11_chem_cbse_021'
  }
];

// ==========================================
// 5. PREDICTION & OBSERVATION QUESTIONS
// ==========================================
interface PredictionQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  verifyInstruction: string;
  nodeId: NodeId;
}

const PREDICTION_QUESTIONS: PredictionQuestion[] = [
  {
    question: 'If natural Chlorine consists of 75.77% 35-Cl (34.969 u) and 24.23% 37-Cl (36.966 u), what will be its calculated average atomic mass?',
    options: ['36.00 u', '35.45 u', '35.00 u', '37.00 u'],
    correctIndex: 1,
    verifyInstruction: 'Use Lab 1 (Mass Spectrometry) slider to set 75.77% 35-Cl and read the weighted average peak.',
    nodeId: 'c11_chem_cbse_016'
  },
  {
    question: 'If you dissolve 40.0 g of NaOH (Molar mass = 40.0 g/mol) in enough water to make 500 mL of solution, what is the Molarity?',
    options: ['0.5 M', '1.0 M', '2.0 M', '4.0 M'],
    correctIndex: 2,
    verifyInstruction: 'Use Lab 4 (Solution Volumetrics) with 40g solute and 0.50 L solution to observe calculated Molarity.',
    nodeId: 'c11_chem_cbse_044'
  }
];

interface ObservationQuestion {
  question: string;
  observableOptions: string[];
  correctIndex: number;
  nodeId: NodeId;
}

const OBSERVATION_QUESTIONS: ObservationQuestion[] = [
  {
    question: 'When heating a volumetric solution of 1.0 M NaCl from 20°C to 80°C, what happens to its Molarity and Molality?',
    observableOptions: [
      'Both Molarity and Molality decrease equally.',
      'Molarity decreases slightly (due to liquid expansion), while Molality remains strictly constant.',
      'Molarity increases while Molality decreases.',
      'Both remain completely unchanged because chemical amount is conserved.'
    ],
    correctIndex: 1,
    nodeId: 'c11_chem_cbse_045'
  },
  {
    question: 'In the synthesis of ammonia (N2 + 3H2 -> 2NH3), if 2 moles of N2 are reacted with 3 moles of H2, which substance is left in excess?',
    observableOptions: [
      'H2 is in excess by 1 mole',
      'N2 is in excess by 1 mole (2 moles of N2 require 6 moles of H2, but only 3 mol H2 exist)',
      'Neither reactant is in excess; both react completely',
      'Ammonia is the excess reactant'
    ],
    correctIndex: 1,
    nodeId: 'c11_chem_cbse_024'
  }
];

// ==========================================
// 6. REAL-WORLD ACTIVITY
// ==========================================
const REAL_WORLD_ACTIVITY = {
  title: 'Industrial Pharmaceutical Formulation & QA Batch Synthesis',
  description: 'As Senior Quality Assurance Chemist at Dr. Reddy’s Laboratories, you must formulate 10,000 litres of physiological saline solution (0.90% w/v NaCl) and calculate reactant stoichiometry for active pharmaceutical ingredient (API) synthesis with 94.5% yield efficiency.',
  steps: [
    'Calculate total mass of NaCl required for 10,000 L solution: 0.90 g / 100 mL x 10,000,000 mL = 90,000 g (90.0 kg).',
    'Calculate exact molarity of physiological saline: n = 90,000 g / 58.44 g/mol = 1,540.04 moles; M = 1540.04 mol / 10000 L = 0.154 M.',
    'Determine theoretical mass of reactant Aspirin synthesized from 50.0 kg Salicylic acid: (50,000 g / 138.12 g/mol) x 180.16 g/mol = 65,218 g.',
    'Apply 94.5% practical chemical yield: Actual Yield = 65,218 g x 0.945 = 61,631 g (61.63 kg).'
  ]
};

// ==========================================
// 7. DIAGNOSTIC QUESTIONS & PRACTICE CHALLENGES
// ==========================================
interface DiagnosticQuestion {
  id: string;
  nodeId: NodeId;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const DIAGNOSTIC_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: 'diag_1',
    nodeId: 'c11_chem_cbse_004',
    question: 'Which of the following is an SI base unit for amount of substance?',
    options: ['Gram (g)', 'Mole (mol)', 'Liter (L)', 'Dalton (Da)'],
    correctIndex: 1,
    explanation: 'Mole (mol) is one of the 7 fundamental SI base units adopted by CGPM.'
  },
  {
    id: 'diag_2',
    nodeId: 'c11_chem_cbse_007',
    question: 'How many significant figures are in the measurement 0.005020 g?',
    options: ['6', '5', '4', '3'],
    correctIndex: 2,
    explanation: 'Leading zeros (0.00) are non-significant. 5, 0, 2, and trailing zero 0 are significant (4 total).'
  },
  {
    id: 'diag_3',
    nodeId: 'c11_chem_cbse_009',
    question: 'When 12 g of carbon burns completely in 32 g of oxygen gas, how much carbon dioxide gas is produced?',
    options: ['44 g', '20 g', '12 g', '56 g'],
    correctIndex: 0,
    explanation: 'Law of Conservation of Mass: 12 g C + 32 g O2 = 44 g CO2.'
  },
  {
    id: 'diag_4',
    nodeId: 'c11_chem_cbse_011',
    question: 'Carbon forms CO (42.9% C, 57.1% O) and CO2 (27.3% C, 72.7% O). Which law is demonstrated?',
    options: ['Law of Definite Proportions', 'Law of Multiple Proportions', 'Avogadro’s Law', 'Gay-Lussac’s Law'],
    correctIndex: 1,
    explanation: 'For fixed mass of C (12g), masses of O combining are 16g and 32g (ratio 1:2), illustrating Law of Multiple Proportions.'
  },
  {
    id: 'diag_5',
    nodeId: 'c11_chem_cbse_018',
    question: 'How many molecules are present in 0.5 moles of Glucose (C6H12O6)?',
    options: ['6.022 x 10^23', '3.011 x 10^23', '1.204 x 10^24', '3.011 x 10^22'],
    correctIndex: 1,
    explanation: 'Number of molecules = moles x N_A = 0.5 x 6.022 x 10^23 = 3.011 x 10^23.'
  },
  {
    id: 'diag_6',
    nodeId: 'c11_chem_cbse_020',
    question: 'What is the mass percentage of Oxygen in Water (H2O)? (Atomic masses: H = 1.008, O = 16.00)',
    options: ['11.19%', '88.81%', '50.00%', '75.00%'],
    correctIndex: 1,
    explanation: 'Molar mass H2O = 18.016 g/mol. Mass % O = (16.00 / 18.016) x 100 = 88.81%.'
  },
  {
    id: 'diag_7',
    nodeId: 'c11_chem_cbse_024',
    question: 'In reaction A + 2B -> C, if 3 mol A and 4 mol B are mixed, which is the limiting reagent?',
    options: ['A', 'B', 'C', 'Neither'],
    correctIndex: 1,
    explanation: '3 mol A requires 6 mol B. Only 4 mol B available. B runs out first, so B is limiting.'
  },
  {
    id: 'diag_8',
    nodeId: 'c11_chem_cbse_044',
    question: 'What volume of 12.0 M HCl stock solution is required to prepare 3.0 L of 1.0 M HCl?',
    options: ['0.25 L (250 mL)', '0.50 L (500 mL)', '0.10 L (100 mL)', '0.36 L (360 mL)'],
    correctIndex: 0,
    explanation: 'Dilution equation M1 V1 = M2 V2 => (12.0) V1 = (1.0)(3.0) => V1 = 3.0 / 12.0 = 0.25 L.'
  }
];

interface Challenge {
  id: string;
  nodeId: NodeId;
  type: 'foundation' | 'standard' | 'advanced';
  difficulty: 'easy' | 'medium' | 'hard';
  competencyLevel: 'recall' | 'understanding' | 'application' | 'analysis' | 'evaluation';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
}

const CHALLENGES: Challenge[] = [
  // Tier 1: Foundation (7 challenges)
  {
    id: 'c_1',
    nodeId: 'c11_chem_cbse_002',
    type: 'foundation',
    difficulty: 'easy',
    competencyLevel: 'recall',
    question: 'Which of the following is classified as a homogeneous mixture?',
    options: ['A mixture of sand and water', 'Air free of dust particles', 'Oil and water emulsion', 'Iron filings and sulfur powder'],
    correctIndex: 1,
    explanation: 'Clean air is a uniform gaseous solution (homogeneous mixture) throughout its volume.',
    hints: ['Homogeneous mixtures have uniform composition throughout.', 'Sand in water forms separate phases.', 'Clean air has evenly dispersed N2, O2, Ar.'],
    misconceptionIndex: 0
  },
  {
    id: 'c_2',
    nodeId: 'c11_chem_cbse_004',
    type: 'foundation',
    difficulty: 'easy',
    competencyLevel: 'recall',
    question: 'What is the standard SI base unit for thermodynamic temperature?',
    options: ['Degree Celsius (°C)', 'Degree Fahrenheit (°F)', 'Kelvin (K)', 'Joule (J)'],
    correctIndex: 2,
    explanation: 'Kelvin (K) is the SI base unit for thermodynamic temperature; K = °C + 273.15.',
    hints: ['Think of standard scientific SI base units.', 'Celsius is metric but not the base unit.', 'Kelvin starts at absolute zero.'],
  },
  {
    id: 'c_3',
    nodeId: 'c11_chem_cbse_005',
    type: 'foundation',
    difficulty: 'easy',
    competencyLevel: 'understanding',
    question: 'Express the number 0.0000456 in standard scientific notation.',
    options: ['4.56 x 10^-5', '45.6 x 10^-6', '4.56 x 10^-4', '0.456 x 10^-4'],
    correctIndex: 0,
    explanation: 'Move decimal point 5 places to the right: 4.56 x 10^-5.',
    hints: ['Scientific notation has form N x 10^n where 1 <= N < 10.', 'Count how many digits to shift right to reach 4.56.', '5 shifts right corresponds to exponent -5.'],
  },
  {
    id: 'c_4',
    nodeId: 'c11_chem_cbse_007',
    type: 'foundation',
    difficulty: 'easy',
    competencyLevel: 'application',
    question: 'Perform the addition: 12.11 + 18.0 + 1.013. Express the result with correct significant figures.',
    options: ['31.123', '31.12', '31.1', '31'],
    correctIndex: 2,
    explanation: 'In addition, the result must be rounded to the least number of decimal places (18.0 has 1 decimal place). 31.123 -> 31.1.',
    hints: ['Addition rule depends on the fewest decimal places.', '18.0 has only 1 decimal place.', 'Round 31.123 to 1 decimal place.'],
    misconceptionIndex: 5
  },
  {
    id: 'c_5',
    nodeId: 'c11_chem_cbse_014',
    type: 'foundation',
    difficulty: 'easy',
    competencyLevel: 'recall',
    question: 'Which postulate of Dalton’s Atomic Theory was later modified due to the discovery of isotopes?',
    options: [
      'Atoms are neither created nor destroyed in chemical reactions.',
      'All atoms of a given element have identical mass and chemical properties.',
      'Compounds are formed when atoms combine in fixed ratios.',
      'Chemical reactions involve reorganization of atoms.'
    ],
    correctIndex: 1,
    explanation: 'Isotopes (e.g., 35Cl and 37Cl) prove that atoms of the same element can have different atomic masses.',
    hints: ['Isotopes have identical atomic numbers but different mass numbers.', 'Dalton assumed all atoms of an element are 100% identical in mass.', 'Which option mentions identical mass?'],
  },
  {
    id: 'c_6',
    nodeId: 'c11_chem_cbse_015',
    type: 'foundation',
    difficulty: 'easy',
    competencyLevel: 'understanding',
    question: 'One unified atomic mass unit (1 u) is defined as exactly:',
    options: [
      'The mass of 1 hydrogen atom',
      '1/12th of the mass of one Carbon-12 atom',
      '1/16th of the mass of one Oxygen-16 atom',
      '1.0000 grams divided by Avogadro constant'
    ],
    correctIndex: 1,
    explanation: '1 u = 1/12 x mass of 12C atom = 1.66056 x 10^-24 g.',
    hints: ['Carbon-12 is the universal reference isotope.', 'What fraction of Carbon-12 mass is defined as 1 u?', 'Select 1/12th of Carbon-12 mass.'],
    misconceptionIndex: 4
  },
  {
    id: 'c_7',
    nodeId: 'c11_chem_cbse_017',
    type: 'foundation',
    difficulty: 'easy',
    competencyLevel: 'application',
    question: 'Calculate the molecular mass of Glucose (C6H12O6). (Atomic masses: C=12.011, H=1.008, O=15.999)',
    options: ['180.156 u', '342.300 u', '90.078 u', '160.120 u'],
    correctIndex: 0,
    explanation: '6(12.011) + 12(1.008) + 6(15.999) = 72.066 + 12.096 + 95.994 = 180.156 u.',
    hints: ['Multiply C by 6, H by 12, O by 6.', '72.066 + 12.096 + 95.994.', 'Sum equals ~180.16 u.'],
  },

  // Tier 2: Standard (8 challenges)
  {
    id: 'c_8',
    nodeId: 'c11_chem_cbse_016',
    type: 'standard',
    difficulty: 'medium',
    competencyLevel: 'analysis',
    question: 'Boron has two isotopes: 10-B (mass 10.012 u) and 11-B (mass 11.009 u). Its average atomic mass is 10.811 u. Calculate the percentage abundance of 10-B.',
    options: ['19.9%', '80.1%', '50.0%', '25.0%'],
    correctIndex: 0,
    explanation: '10.811 = x(10.012) + (1-x)(11.009) => 10.811 - 11.009 = x(10.012 - 11.009) => -0.198 = -0.997 x => x = 0.1986 (19.9%).',
    hints: ['Let fraction of 10-B be x, and 11-B be (1 - x).', '10.811 = 10.012 x + 11.009 (1 - x).', 'Solve for x = 0.199 = 19.9%.'],
  },
  {
    id: 'c_9',
    nodeId: 'c11_chem_cbse_018',
    type: 'standard',
    difficulty: 'medium',
    competencyLevel: 'application',
    question: 'How many total atoms are present in 4.25 g of Ammonia (NH3)? (Molar mass NH3 = 17.03 g/mol)',
    options: ['6.022 x 10^23', '1.505 x 10^23', '6.022 x 10^22', '3.011 x 10^23'],
    correctIndex: 0,
    explanation: 'Moles NH3 = 4.25 / 17.03 = 0.25 mol. Molecules = 0.25 x N_A = 1.505 x 10^23. Each NH3 has 4 atoms (1 N + 3 H). Total atoms = 4 x 1.505 x 10^23 = 6.022 x 10^23.',
    hints: ['Find moles of NH3 first: 4.25 / 17 = 0.25 moles.', 'Multiply by N_A to get molecules.', 'Multiply by 4 because each NH3 molecule contains 4 atoms!'],
    misconceptionIndex: 0
  },
  {
    id: 'c_10',
    nodeId: 'c11_chem_cbse_020',
    type: 'standard',
    difficulty: 'medium',
    competencyLevel: 'application',
    question: 'Calculate the mass percentage of Water of Crystallization in Washing Soda crystals (Na2CO3 . 10H2O). (Molar mass = 286 g/mol, H2O = 18 g/mol)',
    options: ['62.94%', '37.06%', '18.00%', '50.00%'],
    correctIndex: 0,
    explanation: 'Mass of 10 H2O = 10 x 18 = 180 g. Mass % = (180 / 286) x 100 = 62.94%.',
    hints: ['10 moles of water = 180 g.', 'Total molar mass of hydrated salt = 286 g/mol.', 'Mass % = (180 / 286) * 100.'],
  },
  {
    id: 'c_11',
    nodeId: 'c11_chem_cbse_021',
    type: 'standard',
    difficulty: 'medium',
    competencyLevel: 'analysis',
    question: 'A compound contains 40.0% C, 6.7% H, and 53.3% O by mass. What is its empirical formula?',
    options: ['CH2O', 'C2H4O2', 'CHO', 'CH4O'],
    correctIndex: 0,
    explanation: 'Moles C = 40.0/12 = 3.33; Moles H = 6.7/1 = 6.7; Moles O = 53.3/16 = 3.33. Ratio C:H:O = 1:2:1. Empirical formula = CH2O.',
    hints: ['Divide % mass by atomic mass for each element.', 'C: 40/12=3.33, H: 6.7/1=6.7, O: 53.3/16=3.33.', 'Divide by smallest (3.33) -> 1 : 2 : 1.'],
  },
  {
    id: 'c_12',
    nodeId: 'c11_chem_cbse_022',
    type: 'standard',
    difficulty: 'medium',
    competencyLevel: 'application',
    question: 'If the empirical formula of a compound is CH2O and its molar mass is determined to be 180.16 g/mol, what is its molecular formula?',
    options: ['C6H12O6', 'C3H6O3', 'C2H4O2', 'C4H8O4'],
    correctIndex: 0,
    explanation: 'Empirical mass (CH2O) = 12 + 2 + 16 = 30 g/mol. n = Molar mass / Empirical mass = 180.16 / 30 = 6. Molecular formula = (CH2O)6 = C6H12O6.',
    hints: ['Calculate empirical formula mass of CH2O (30 g/mol).', 'Divide molar mass 180 by 30 to find n.', 'n = 6, so multiply all subscripts by 6.'],
    misconceptionIndex: 3
  },
  {
    id: 'c_13',
    nodeId: 'c11_chem_cbse_023',
    type: 'standard',
    difficulty: 'medium',
    competencyLevel: 'application',
    question: 'What mass of Calcium Carbonate (CaCO3) is required to produce 4.40 g of CO2 on thermal decomposition? CaCO3 -> CaO + CO2 (Molar masses: CaCO3=100 g/mol, CO2=44 g/mol)',
    options: ['10.00 g', '5.00 g', '20.00 g', '44.00 g'],
    correctIndex: 0,
    explanation: '1 mol CaCO3 (100 g) gives 1 mol CO2 (44 g). Moles CO2 = 4.40 / 44 = 0.10 mol. Mass CaCO3 = 0.10 x 100 = 10.00 g.',
    hints: ['100 g of CaCO3 yields 44 g of CO2.', '4.4 g CO2 is 0.10 moles of CO2.', '0.10 moles of CaCO3 = 10.0 g.'],
  },
  {
    id: 'c_14',
    nodeId: 'c11_chem_cbse_033',
    type: 'standard',
    difficulty: 'medium',
    competencyLevel: 'analysis',
    question: 'A solution is prepared by mixing 36.0 g of Water (H2O, 18 g/mol) and 46.0 g of Ethanol (C2H5OH, 46 g/mol). Calculate the mole fraction of Ethanol.',
    options: ['0.333', '0.667', '0.500', '0.250'],
    correctIndex: 0,
    explanation: 'Moles H2O = 36/18 = 2.0 mol. Moles Ethanol = 46/46 = 1.0 mol. Total moles = 3.0. Mole fraction Ethanol = 1.0 / 3.0 = 0.333.',
    hints: ['Find moles of water (36/18 = 2.0 mol).', 'Find moles of ethanol (46/46 = 1.0 mol).', 'Mole fraction = 1.0 / (1.0 + 2.0) = 1/3 = 0.333.'],
  },
  {
    id: 'c_15',
    nodeId: 'c11_chem_cbse_044',
    type: 'standard',
    difficulty: 'medium',
    competencyLevel: 'application',
    question: 'What volume of 5.0 M H2SO4 stock solution must be diluted with distilled water to prepare 500 mL of 0.50 M H2SO4?',
    options: ['50 mL', '100 mL', '25 mL', '200 mL'],
    correctIndex: 0,
    explanation: 'M1 V1 = M2 V2 => (5.0 M)(V1) = (0.50 M)(500 mL) => V1 = 250 / 5.0 = 50 mL.',
    hints: ['Use dilution equation M1 V1 = M2 V2.', '5.0 * V1 = 0.50 * 500.', 'V1 = 250 / 5 = 50 mL.'],
  },

  // Tier 3: Advanced (7 challenges)
  {
    id: 'c_16',
    nodeId: 'c11_chem_cbse_024',
    type: 'advanced',
    difficulty: 'hard',
    competencyLevel: 'evaluation',
    question: '50.0 kg of N2 gas and 10.0 kg of H2 gas are mixed to produce NH3 gas (N2 + 3H2 -> 2NH3). Identify the limiting reagent and maximum mass of NH3 formed.',
    options: [
      'H2 is limiting; maximum NH3 = 56.67 kg',
      'N2 is limiting; maximum NH3 = 60.71 kg',
      'H2 is limiting; maximum NH3 = 113.3 kg',
      'N2 is limiting; maximum NH3 = 50.0 kg'
    ],
    correctIndex: 0,
    explanation: 'Moles N2 = 50,000 / 28.02 = 1784.4 mol. Moles H2 = 10,000 / 2.016 = 4960.3 mol. Required H2 for all N2 = 3 x 1784.4 = 5353.2 mol > 4960.3 mol. Thus H2 is limiting! Moles NH3 = (2/3) x 4960.3 = 3306.9 mol. Mass NH3 = 3306.9 x 17.03 g = 56.32 kg ~ 56.67 kg.',
    hints: ['Calculate moles of N2 and H2.', 'N2 requires 3x moles of H2.', 'H2 runs out first, so H2 is limiting.'],
    misconceptionIndex: 1
  },
  {
    id: 'c_17',
    nodeId: 'c11_chem_cbse_026',
    type: 'advanced',
    difficulty: 'hard',
    competencyLevel: 'evaluation',
    question: 'In an experiment, 15.0 g of Benzene (C6H6) reacts with excess HNO3 to yield 18.0 g of Nitrobenzene (C6H5NO2). What is the percentage yield of Nitrobenzene? (Molar masses: C6H6 = 78.11 g/mol, C6H5NO2 = 123.11 g/mol)',
    options: ['76.1%', '85.2%', '91.5%', '68.4%'],
    correctIndex: 0,
    explanation: 'Moles C6H6 = 15.0 / 78.11 = 0.192 mol. Theoretical yield C6H5NO2 = 0.192 x 123.11 = 23.64 g. % Yield = (18.0 / 23.64) x 100 = 76.1%.',
    hints: ['Moles of reactant benzene = 15 / 78.11 = 0.192 mol.', 'Theoretical yield = 0.192 * 123.11 = 23.64 g.', '% Yield = (18.0 / 23.64) * 100 = 76.1%.'],
  },
  {
    id: 'c_18',
    nodeId: 'c11_chem_cbse_045',
    type: 'advanced',
    difficulty: 'hard',
    competencyLevel: 'analysis',
    question: 'A 2.50 M aqueous solution of NaCl has a density of 1.12 g/mL. Calculate the molality (m) of the solution. (Molar mass NaCl = 58.44 g/mol)',
    options: ['2.57 m', '2.23 m', '2.50 m', '2.80 m'],
    correctIndex: 0,
    explanation: '1 L (1000 mL) solution mass = 1000 x 1.12 = 1120 g. Mass of NaCl in 1 L = 2.50 mol x 58.44 g/mol = 146.1 g. Mass of solvent (water) = 1120 - 146.1 = 973.9 g = 0.9739 kg. Molality = 2.50 mol / 0.9739 kg = 2.567 m ~ 2.57 m.',
    hints: ['Assume 1 L solution: mass = 1000 mL * 1.12 g/mL = 1120 g.', 'Mass solute = 2.5 mol * 58.44 = 146.1 g.', 'Mass solvent = 1120 - 146.1 = 973.9 g = 0.9739 kg. m = 2.5 / 0.9739.'],
    misconceptionIndex: 2
  },
  {
    id: 'c_19',
    nodeId: 'c11_chem_cbse_046',
    type: 'advanced',
    difficulty: 'hard',
    competencyLevel: 'analysis',
    question: 'Calculate the Normality (N) of a solution containing 9.8 g of Phosphoric Acid (H3PO4, Molar mass = 98 g/mol) in 250 mL of solution for complete neutralization to PO4^3-.',
    options: ['1.20 N', '0.40 N', '0.80 N', '3.60 N'],
    correctIndex: 0,
    explanation: 'H3PO4 is a tribasic acid (n-factor = 3). Equivalent Mass = Molar mass / 3 = 98 / 3 = 32.67 g/eq. Number of g-eq = 9.8 / 32.67 = 0.30 eq. Normality N = 0.30 eq / 0.25 L = 1.20 N.',
    hints: ['H3PO4 has n-factor = 3 for complete neutralization.', 'Moles H3PO4 = 9.8 / 98 = 0.10 mol.', 'Gram equivalents = 0.10 * 3 = 0.30 eq. Normality = 0.30 / 0.25 L = 1.20 N.'],
  },
  {
    id: 'c_20',
    nodeId: 'c11_chem_cbse_049',
    type: 'advanced',
    difficulty: 'hard',
    competencyLevel: 'evaluation',
    question: '25.0 mL of 0.10 M Oxalic Acid (H2C2O4) solution requires 20.0 mL of KMnO4 solution for complete titration in acidic medium. Calculate the Molarity of KMnO4 solution. (Balanced ionic eq: 2 MnO4- + 5 C2O4^2- + 16 H+ -> 2 Mn2+ + 10 CO2 + 8 H2O)',
    options: ['0.050 M', '0.020 M', '0.040 M', '0.100 M'],
    correctIndex: 0,
    explanation: 'From stoichiometry: 2 moles MnO4- react with 5 moles C2O4^2-. (M1 V1) / 2 [KMnO4] = (M2 V2) / 5 [H2C2O4] => (M1 * 20.0) / 2 = (0.10 * 25.0) / 5 => M1 * 10 = 0.50 => M1 = 0.050 M.',
    hints: ['Moles Oxalic acid = 0.10 * 0.025 L = 0.0025 mol.', 'Ratio KMnO4 : Oxalic Acid = 2 : 5.', 'Moles KMnO4 = (2/5) * 0.0025 = 0.0010 mol. Molarity = 0.0010 / 0.020 L = 0.050 M.'],
  },
  {
    id: 'c_21',
    nodeId: 'c11_chem_cbse_012',
    type: 'advanced',
    difficulty: 'hard',
    competencyLevel: 'analysis',
    question: '100 mL of CO gas reacts with 100 mL of O2 gas to form CO2 gas (2CO + O2 -> 2CO2). Assuming all volumes are measured at same T and P, what is the total volume of the final gas mixture?',
    options: ['150 mL', '100 mL', '200 mL', '50 mL'],
    correctIndex: 0,
    explanation: 'Gay-Lussac’s Law: 2 vol CO reacts with 1 vol O2 to give 2 vol CO2. 100 mL CO reacts with 50 mL O2 to produce 100 mL CO2. Unreacted O2 remaining = 100 - 50 = 50 mL. Total final gas volume = 100 mL CO2 + 50 mL O2 = 150 mL.',
    hints: ['CO is limiting: 100 mL CO reacts with 50 mL O2.', 'Produced CO2 volume = 100 mL.', 'Remaining excess O2 = 100 - 50 = 50 mL. Sum = 100 + 50 = 150 mL.'],
  },
  {
    id: 'c_22',
    nodeId: 'c11_chem_cbse_008',
    type: 'advanced',
    difficulty: 'hard',
    competencyLevel: 'evaluation',
    question: 'Convert a density of 13.6 g/cm^3 into standard SI units (kg/m^3) using dimensional factor-label method.',
    options: ['1.36 x 10^4 kg/m^3', '1.36 x 10^1 kg/m^3', '1.36 x 10^-2 kg/m^3', '1.36 x 10^6 kg/m^3'],
    correctIndex: 0,
    explanation: '13.6 (g/cm^3) x (1 kg / 1000 g) x (100 cm / 1 m)^3 = 13.6 x 10^-3 x 10^6 = 13.6 x 10^3 = 1.36 x 10^4 kg/m^3.',
    hints: ['1 g = 10^-3 kg.', '1 cm^3 = (10^-2 m)^3 = 10^-6 m^3.', '13.6 * 10^-3 / 10^-6 = 13.6 * 10^3 = 13600 kg/m^3.'],
  }
];

// ==========================================
// 8. CUSTOM TOPIC-SPECIFIC SVG VISUALIZERS
// ==========================================

// Visualizer 1: Mass Spectrometer Spectrum & Isotope Distribution
const MassSpecVisualizer: React.FC<{ cl35: number; cl37: number }> = ({ cl35, cl37 }) => {
  const total = cl35 + cl37;
  const p35 = total > 0 ? (cl35 / total) * 100 : 75;
  const p37 = total > 0 ? (cl37 / total) * 100 : 25;
  const avgMass = ((p35 * 34.969 + p37 * 36.966) / 100).toFixed(3);

  return (
    <div className="bg-slate-900 border border-cyan-500/30 rounded-xl p-4 shadow-xl">
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-sm font-semibold text-cyan-400 flex items-center gap-2">
          <span>⚛️</span> High-Resolution Mass Spectrometer Output
        </h4>
        <span className="text-xs bg-cyan-950 text-cyan-300 px-2 py-1 rounded border border-cyan-800 font-mono">
          Avg Mass: <strong className="text-yellow-400 text-sm">{avgMass} u</strong>
        </span>
      </div>
      <svg viewBox="0 0 500 200" className="w-full h-44 bg-slate-950 rounded-lg">
        {/* Grid lines */}
        {[40, 80, 120, 160].map((y) => (
          <line key={y} x1="50" y1={y} x2="470" y2={y} stroke="#1e293b" strokeDasharray="3 3" />
        ))}
        {/* Axes */}
        <line x1="50" y1="20" x2="50" y2="170" stroke="#64748b" strokeWidth="2" />
        <line x1="50" y1="170" x2="470" y2="170" stroke="#64748b" strokeWidth="2" />
        <text x="15" y="95" fill="#94a3b8" fontSize="10" transform="rotate(-90 20,95)">Relative Abundance (%)</text>
        <text x="240" y="192" fill="#94a3b8" fontSize="10">Mass-to-Charge Ratio (m/z)</text>

        {/* Peak 35-Cl */}
        {/* height max is 140px for 100% */}
        <rect x="140" y={170 - (p35 * 1.4)} width="30" height={p35 * 1.4} fill="url(#cyanGradient)" rx="2" />
        <text x="155" y={160 - (p35 * 1.4)} fill="#38bdf8" fontSize="11" textAnchor="middle" fontWeight="bold">
          {p35.toFixed(1)}%
        </text>
        <text x="155" y="184" fill="#cbd5e1" fontSize="10" textAnchor="middle">35-Cl (34.97 u)</text>

        {/* Peak 37-Cl */}
        <rect x="330" y={170 - (p37 * 1.4)} width="30" height={p37 * 1.4} fill="url(#emeraldGradient)" rx="2" />
        <text x="345" y={160 - (p37 * 1.4)} fill="#34d399" fontSize="11" textAnchor="middle" fontWeight="bold">
          {p37.toFixed(1)}%
        </text>
        <text x="345" y="184" fill="#cbd5e1" fontSize="10" textAnchor="middle">37-Cl (36.97 u)</text>

        {/* Weighted average marker */}
        {(() => {
          const xPos = 155 + ((Number(avgMass) - 34.969) / (36.966 - 34.969)) * 190;
          return (
            <g>
              <line x1={xPos} y1="30" x2={xPos} y2="170" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 4" />
              <polygon points={`${xPos-5},30 ${xPos+5},30 ${xPos},38`} fill="#f59e0b" />
              <text x={xPos} y="22" fill="#f59e0b" fontSize="10" textAnchor="middle" fontWeight="bold">
                M_avg = {avgMass} u
              </text>
            </g>
          );
        })()}

        <defs>
          <linearGradient id="cyanGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>
          <linearGradient id="emeraldGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

// Visualizer 2: Animated Reaction Chamber & Limiting Reagent Visualizer
const StoichiometryVisualizer: React.FC<{ h2Moles: number; o2Moles: number }> = ({ h2Moles, o2Moles }) => {
  // Reaction: 2 H2 + O2 -> 2 H2O
  // Max reactions possible: min(h2Moles / 2, o2Moles / 1)
  const rxnPossible = Math.min(Math.floor(h2Moles / 2), Math.floor(o2Moles));
  const h2Used = rxnPossible * 2;
  const o2Used = rxnPossible * 1;
  const h2Rem = h2Moles - h2Used;
  const o2Rem = o2Moles - o2Used;
  const h2oFormed = rxnPossible * 2;

  const limiting = h2Moles / 2 < o2Moles ? 'Hydrogen (H₂)' : h2Moles / 2 > o2Moles ? 'Oxygen (O₂)' : 'Stoechiometric Ratio (Neither)';

  return (
    <div className="bg-slate-900 border border-emerald-500/30 rounded-xl p-4 shadow-xl">
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-sm font-semibold text-emerald-400 flex items-center gap-2">
          <span>🧪</span> Stoichiometric Reaction Chamber (2 H₂ + O₂ → 2 H₂O)
        </h4>
        <span className="text-xs bg-emerald-950 text-emerald-300 px-2 py-1 rounded border border-emerald-800">
          Limiting Reagent: <strong className="text-yellow-400">{limiting}</strong>
        </span>
      </div>
      <svg viewBox="0 0 500 180" className="w-full h-40 bg-slate-950 rounded-lg">
        {/* Left Box: Reactants */}
        <rect x="20" y="20" width="200" height="140" fill="#0f172a" stroke="#334155" rx="8" strokeWidth="2" />
        <text x="120" y="38" fill="#94a3b8" fontSize="11" textAnchor="middle" fontWeight="bold">Reactant Chamber</text>
        
        {/* Render H2 molecules as cyan pairs */}
        {Array.from({ length: Math.min(h2Moles, 12) }).map((_, i) => (
          <g key={`h2-${i}`} transform={`translate(${35 + (i % 4) * 45}, ${55 + Math.floor(i / 4) * 35})`}>
            <circle cx="0" cy="0" r="7" fill="#38bdf8" />
            <circle cx="10" cy="0" r="7" fill="#38bdf8" />
            <line x1="0" y1="0" x2="10" y2="0" stroke="#e0f2fe" strokeWidth="2" />
            <text x="5" y="14" fill="#93c5fd" fontSize="8" textAnchor="middle">H₂</text>
          </g>
        ))}

        {/* Arrow */}
        <path d="M 230 90 L 265 90 M 260 83 L 268 90 L 260 97" stroke="#34d399" strokeWidth="3" fill="none" />
        <text x="250" y="78" fill="#34d399" fontSize="10" textAnchor="middle">React</text>

        {/* Right Box: Products & Excess */}
        <rect x="280" y="20" width="200" height="140" fill="#0f172a" stroke="#334155" rx="8" strokeWidth="2" />
        <text x="380" y="38" fill="#94a3b8" fontSize="11" textAnchor="middle" fontWeight="bold">Products & Excess</text>

        {/* Render formed H2O molecules */}
        {Array.from({ length: Math.min(h2oFormed, 10) }).map((_, i) => (
          <g key={`h2o-${i}`} transform={`translate(${295 + (i % 3) * 60}, ${55 + Math.floor(i / 3) * 35})`}>
            <circle cx="10" cy="0" r="9" fill="#ef4444" /> {/* Oxygen */}
            <circle cx="2" cy="10" r="5" fill="#38bdf8" /> {/* Hydrogen */}
            <circle cx="18" cy="10" r="5" fill="#38bdf8" /> {/* Hydrogen */}
            <text x="10" y="24" fill="#fca5a5" fontSize="8" textAnchor="middle">H₂O</text>
          </g>
        ))}

        {/* Excess indicator */}
        <text x="380" y="152" fill="#fbbf24" fontSize="10" textAnchor="middle">
          Formed: {h2oFormed} mol H₂O | Excess: {h2Rem > 0 ? `${h2Rem} mol H₂` : o2Rem > 0 ? `${o2Rem} mol O₂` : 'None'}
        </text>
      </svg>
    </div>
  );
};

// Visualizer 3: Solution Concentration & Volumetric Flask Diagram
const SolutionPrepVisualizer: React.FC<{ moles: number; volumeL: number; tempC: number }> = ({ moles, volumeL, tempC }) => {
  // Volume expands with temp: V_temp = V_20 * (1 + 0.00021 * (tempC - 20))
  const expansionFactor = 1 + 0.00021 * (tempC - 20);
  const actualVolume = volumeL * expansionFactor;
  const molarity = (moles / actualVolume).toFixed(3);
  const molality = (moles / (volumeL * 1.0)).toFixed(3); // Assuming 1 kg solvent / L

  return (
    <div className="bg-slate-900 border border-purple-500/30 rounded-xl p-4 shadow-xl">
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-sm font-semibold text-purple-400 flex items-center gap-2">
          <span>🧪</span> Volumetric Flask & Solution Dynamics
        </h4>
        <div className="flex gap-2">
          <span className="text-xs bg-purple-950 text-purple-300 px-2 py-1 rounded border border-purple-800 font-mono">
            Molarity: <strong className="text-yellow-400">{molarity} M</strong>
          </span>
          <span className="text-xs bg-indigo-950 text-indigo-300 px-2 py-1 rounded border border-indigo-800 font-mono">
            Molality: <strong className="text-emerald-400">{molality} m</strong>
          </span>
        </div>
      </div>
      <svg viewBox="0 0 500 180" className="w-full h-40 bg-slate-950 rounded-lg">
        {/* Flask SVG Shape */}
        <g transform="translate(100, 10)">
          {/* Flask Outer Border */}
          <path d="M 60 10 L 60 50 L 20 140 A 20 20 0 0 0 35 160 L 125 160 A 20 20 0 0 0 140 140 L 100 50 L 100 10 Z"
                fill="none" stroke="#64748b" strokeWidth="3" />
          
          {/* Solution liquid inside */}
          {(() => {
            const liquidHeight = Math.min(140, 40 + actualVolume * 70);
            return (
              <path d={`M ${60 + (160 - liquidHeight) * 0.3} ${160 - liquidHeight} L ${100 - (160 - liquidHeight) * 0.3} ${160 - liquidHeight} L 135 155 A 10 10 0 0 1 125 160 L 35 160 A 10 10 0 0 1 25 155 Z`}
                    fill="url(#solutionGradient)" opacity="0.85" />
            );
          })()}

          {/* Meniscus Mark */}
          <line x1="55" y1="50" x2="105" y2="50" stroke="#ef4444" strokeWidth="2" strokeDasharray="3 3" />
          <text x="112" y="54" fill="#ef4444" fontSize="9" fontWeight="bold">Calibrated Mark</text>

          {/* Solute particles moving in solution */}
          {Array.from({ length: Math.min(Math.round(moles * 8), 24) }).map((_, i) => (
            <circle key={`p-${i}`}
                    cx={45 + (i * 17) % 70}
                    cy={110 + (i * 11) % 40}
                    r="4"
                    fill="#a855f7"
                    className="animate-pulse" />
          ))}
        </g>

        {/* Temperature & Effect Display */}
        <g transform="translate(280, 30)">
          <rect x="0" y="0" width="190" height="120" fill="#0f172a" stroke="#334155" rx="6" />
          <text x="15" y="25" fill="#cbd5e1" fontSize="11" fontWeight="bold">Temperature Effects:</text>
          <text x="15" y="50" fill="#94a3b8" fontSize="10">Temp (T): <tspan fill="#f59e0b">{tempC}°C</tspan></text>
          <text x="15" y="70" fill="#94a3b8" fontSize="10">Vol (V): <tspan fill="#38bdf8">{actualVolume.toFixed(3)} L</tspan></text>
          <text x="15" y="92" fill="#e2e8f0" fontSize="9">
            {tempC > 20 ? '⚠️ Heat expands volume -> Molarity drops!' : '✅ Calibrated standard conditions (20°C)'}
          </text>
          <text x="15" y="108" fill="#34d399" fontSize="9">
            ✨ Molality remains constant at {molality} m
          </text>
        </g>

        <defs>
          <linearGradient id="solutionGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c084fc" />
            <stop offset="100%" stopColor="#6b21a8" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

// Visualizer 4: Empirical vs Molecular Formula Dynamic Builder
const EmpiricalFormulaVisualizer: React.FC<{ cPct: number; hPct: number; oPct: number; molarMass: number }> = ({ cPct, hPct, oPct, molarMass }) => {
  // Compute moles
  const molesC = cPct / 12.011;
  const molesH = hPct / 1.008;
  const molesO = oPct / 15.999;
  const minMoles = Math.min(molesC, molesH, molesO) || 1;

  const rC = Math.round(molesC / minMoles);
  const rH = Math.round(molesH / minMoles);
  const rO = Math.round(molesO / minMoles);

  const empMass = rC * 12.011 + rH * 1.008 + rO * 15.999;
  const nFactor = Math.max(1, Math.round(molarMass / empMass));

  return (
    <div className="bg-slate-900 border border-amber-500/30 rounded-xl p-4 shadow-xl">
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-sm font-semibold text-amber-400 flex items-center gap-2">
          <span>🧬</span> Empirical & Molecular Formula Quantitative Builder
        </h4>
        <div className="flex gap-2">
          <span className="text-xs bg-amber-950 text-amber-300 px-2 py-1 rounded border border-amber-800">
            Empirical: <strong className="text-yellow-300">C{rC > 1 ? rC : ''}H{rH > 1 ? rH : ''}O{rO > 1 ? rO : ''}</strong>
          </span>
          <span className="text-xs bg-orange-950 text-orange-300 px-2 py-1 rounded border border-orange-800">
            Molecular: <strong className="text-cyan-300">C{rC * nFactor}H{rH * nFactor}O{rO * nFactor}</strong>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs">
        <div className="bg-slate-900 p-2 rounded border border-slate-800">
          <div className="text-gray-400 font-medium">Carbon (C)</div>
          <div className="text-cyan-400 text-sm font-bold">{cPct.toFixed(1)}%</div>
          <div className="text-gray-500 font-mono mt-1">{molesC.toFixed(2)} moles</div>
          <div className="text-amber-300 font-mono">Ratio: {rC}</div>
        </div>
        <div className="bg-slate-900 p-2 rounded border border-slate-800">
          <div className="text-gray-400 font-medium">Hydrogen (H)</div>
          <div className="text-cyan-400 text-sm font-bold">{hPct.toFixed(1)}%</div>
          <div className="text-gray-500 font-mono mt-1">{molesH.toFixed(2)} moles</div>
          <div className="text-amber-300 font-mono">Ratio: {rH}</div>
        </div>
        <div className="bg-slate-900 p-2 rounded border border-slate-800">
          <div className="text-gray-400 font-medium">Oxygen (O)</div>
          <div className="text-cyan-400 text-sm font-bold">{oPct.toFixed(1)}%</div>
          <div className="text-gray-500 font-mono mt-1">{molesO.toFixed(2)} moles</div>
          <div className="text-amber-300 font-mono">Ratio: {rO}</div>
        </div>
      </div>

      <div className="mt-3 bg-slate-950 p-2.5 rounded-lg flex justify-between items-center text-xs border border-slate-800">
        <div>
          <span className="text-gray-400">Empirical Mass: </span>
          <span className="text-yellow-400 font-mono font-bold">{empMass.toFixed(2)} g/mol</span>
        </div>
        <div>
          <span className="text-gray-400">Multiplier n = Molar Mass / Emp Mass: </span>
          <span className="text-cyan-400 font-mono font-bold">n = {nFactor}</span>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// MAIN COMPONENT
// ==========================================
interface C11_ChemistrySomeBasicConceptsofChemistryCBSESimProps {
  onComplete?: (score: number) => void;
  initialNodeId?: NodeId;
}

export const C11_ChemistrySomeBasicConceptsofChemistryCBSESim: React.FC<C11_ChemistrySomeBasicConceptsofChemistryCBSESimProps> = ({
  onComplete,
  initialNodeId
}) => {
  // Navigation State
  const [activeTab, setActiveTab] = useState<'discovery' | 'lab' | 'challenges' | 'summary'>('discovery');
  const [currentLabStepIndex, setCurrentLabStepIndex] = useState<number>(0);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState<number>(0);

  // Discovery State
  const [discoveryAnswer, setDiscoveryAnswer] = useState<number | null>(null);
  const [discoverySubmitted, setDiscoverySubmitted] = useState<boolean>(false);

  // Lab Exploration State Controls
  const [cl35Count, setCl35Count] = useState<number>(75);
  const [cl37Count, setCl37Count] = useState<number>(25);

  const [moleValue, setMoleValue] = useState<number>(1.0);
  const [substanceType, setSubstanceType] = useState<'H2O' | 'CO2' | 'NaCl' | 'O2'>('H2O');

  const [h2MolesInput, setH2MolesInput] = useState<number>(4);
  const [o2MolesInput, setO2MolesInput] = useState<number>(3);

  const [soluteMolesInput, setSoluteMolesInput] = useState<number>(1.0);
  const [solutionVolumeLInput, setSolutionVolumeLInput] = useState<number>(1.0);
  const [tempCInput, setTempCInput] = useState<number>(20);

  const [cPctInput, setCPctInput] = useState<number>(40.0);
  const [hPctInput, setHPctInput] = useState<number>(6.7);
  const [oPctInput, setOPctInput] = useState<number>(53.3);
  const [givenMolarMass, setGivenMolarMass] = useState<number>(180);

  // Lab Observations state
  const [predictionAnswers, setPredictionAnswers] = useState<Record<number, number>>({});
  const [observationAnswers, setObservationAnswers] = useState<Record<number, number>>({});

  // Challenge Execution State
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [challengeSubmitted, setChallengeSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [completedChallenges, setCompletedChallenges] = useState<Set<string>>(new Set());

  // BKT & SRS States
  const [bktStates, setBktStates] = useState<Record<NodeId, BKTState>>(() => {
    const initial: Record<string, BKTState> = {};
    ALL_NODE_IDS.forEach((id) => {
      initial[id] = createBKTState();
    });
    return initial as Record<NodeId, BKTState>;
  });

  const [srsItems, setSrsItems] = useState<Record<string, SRSItem>>(() => {
    const initial: Record<string, SRSItem> = {};
    CHALLENGES.forEach((c) => {
      initial[c.id] = createReviewItem(c.id);
    });
    return initial;
  });

  // UI Effects State
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHintIndex, setCurrentHintIndex] = useState<number>(0);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);

  // Auto-hint Timer
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setShowHint(false);
    timerRef.current = setTimeout(() => {
      setShowHint(true);
      audioManager.play('hint');
    }, 12000);
  }, []);

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentChallengeIndex, activeTab, resetTimer]);

  // Welcome speech synthesis call
  useEffect(() => {
    speechManager.speak('Welcome to the Advanced Precision Quantitative Chemistry Laboratory. Let us master stoichiometry and the mole concept!');
  }, []);

  // Helper for current challenge
  const currentChallenge = CHALLENGES[currentChallengeIndex];

  // Sound & Speech handlers
  const handleTabChange = (tab: 'discovery' | 'lab' | 'challenges' | 'summary') => {
    setActiveTab(tab);
    audioManager.play('tap');
    if (tab === 'lab') {
      speechManager.speak('Interactive Exploration Laboratory activated. Select an experiment step to begin.');
    } else if (tab === 'challenges') {
      speechManager.speak('Practice Challenges unlocked. Test your understanding across all difficulty tiers.');
    } else if (tab === 'summary') {
      speechManager.speak('Laboratory Summary and Real World Applications.');
    }
  };

  const handleDiscoverySubmit = () => {
    if (discoveryAnswer === null) return;
    setDiscoverySubmitted(true);
    if (discoveryAnswer === DISCOVERY_QUESTION.correctIndex) {
      audioManager.play('success');
      setShowConfetti(true);
      speechManager.speak('Correct! Total mass is strictly conserved in chemical reactions.');
      setTimeout(() => setShowConfetti(false), 3000);
    } else {
      audioManager.play('error');
      speechManager.speak('Not quite right. Review the Law of Conservation of Mass.');
    }
  };

  const handleChallengeOptionSelect = (idx: number) => {
    if (challengeSubmitted) return;
    setSelectedOption(idx);
    audioManager.play('pop');
    resetTimer();
  };

  const handleChallengeSubmit = () => {
    if (selectedOption === null || challengeSubmitted) return;

    setChallengeSubmitted(true);
    const isCorrect = selectedOption === currentChallenge.correctIndex;
    const nodeId = currentChallenge.nodeId;

    // Update BKT State
    const currentBKT = bktStates[nodeId] || createBKTState();
    const updatedBKT = bktUpdate(currentBKT, isCorrect);
    setBktStates((prev) => ({ ...prev, [nodeId]: updatedBKT }));

    // Update SRS State
    const currentSRS = srsItems[currentChallenge.id] || createReviewItem(currentChallenge.id);
    const updatedSRS = sm2Update(currentSRS, isCorrect ? 5 : 1);
    setSrsItems((prev) => ({ ...prev, [currentChallenge.id]: updatedSRS }));

    if (isCorrect) {
      audioManager.play('drop-correct');
      audioManager.play('celebration');
      setShowSuccessBanner(true);
      setShowSparkle(true);
      setTimeout(() => setShowSuccessBanner(false), 2500);
      setTimeout(() => setShowSparkle(false), 1500);

      setCompletedChallenges((prev) => new Set(prev).add(currentChallenge.id));
      setScore((prev) => prev + (currentChallenge.type === 'advanced' ? 15 : currentChallenge.type === 'standard' ? 10 : 5));
      speechManager.speak('Outstanding! You got it right.');
    } else {
      audioManager.play('drop-wrong');
      audioManager.play('error');
      speechManager.speak('Incorrect answer. Review the explanation and try again.');
    }
  };

  const handleNextChallenge = () => {
    if (currentChallengeIndex < CHALLENGES.length - 1) {
      setCurrentChallengeIndex((prev) => prev + 1);
      setSelectedOption(null);
      setChallengeSubmitted(false);
      setShowHint(false);
      setCurrentHintIndex(0);
      audioManager.play('swoop');
    } else {
      // Completed all challenges!
      recordGameScore('C11_ChemistrySomeBasicConceptsofChemistryCBSESim', score);
      if (onComplete) onComplete(score);
      audioManager.play('celebration');
      setShowConfetti(true);
      setActiveTab('summary');
      speechManager.speak('Congratulations! You have successfully mastered Quantitative Chemistry Stoichiometry!');
    }
  };

  const handlePrevChallenge = () => {
    if (currentChallengeIndex > 0) {
      setCurrentChallengeIndex((prev) => prev - 1);
      setSelectedOption(null);
      setChallengeSubmitted(false);
      setShowHint(false);
      setCurrentHintIndex(0);
      audioManager.play('swoop');
    }
  };

  // Derived mole calculation for Lab 2
  const molarMassMap = { H2O: 18.015, CO2: 44.01, NaCl: 58.44, O2: 31.998 };
  const currentMolarMass = molarMassMap[substanceType];
  const calculatedMass = (moleValue * currentMolarMass).toFixed(2);
  const calculatedEntities = (moleValue * 6.02214076e23).toExponential(3);
  const calculatedSTPVolume = (moleValue * 22.71).toFixed(2); // standard 22.71 L/mol

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 md:p-6 select-none relative overflow-x-hidden">
      {/* Top Banner Navigation */}
      <header className="max-w-7xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-2xl mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-cyan-950 text-cyan-400 text-xs font-bold px-2.5 py-1 rounded-full border border-cyan-800">
                ISC / CBSE CLASS 11 CHEMISTRY
              </span>
              <span className="text-xs text-slate-400 font-mono">Unit 1: Basic Concepts</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white mt-1 tracking-tight flex items-center gap-2">
              <span>⚗️</span> {SCENARIO.title}
            </h1>
          </div>

          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
            <button
              onClick={() => handleTabChange('discovery')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'discovery' ? 'bg-cyan-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              🔍 Discovery
            </button>
            <button
              onClick={() => handleTabChange('lab')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'lab' ? 'bg-cyan-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              🧪 Labs & Experiments
            </button>
            <button
              onClick={() => handleTabChange('challenges')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'challenges' ? 'bg-cyan-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              🎯 Practice ({completedChallenges.size}/{CHALLENGES.length})
            </button>
            <button
              onClick={() => handleTabChange('summary')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'summary' ? 'bg-cyan-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              🏆 Summary
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto">
        {/* ========================================== */}
        {/* TAB 1: DISCOVERY & CONCEPT MAP */}
        {/* ========================================== */}
        {activeTab === 'discovery' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Context & Scenario Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 opacity-10 text-9xl">⚛️</div>
              <h2 className="text-lg font-bold text-cyan-400 mb-2 flex items-center gap-2">
                <span>📋</span> Lab Mission Context
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">{SCENARIO.intro}</p>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-400">
                <strong className="text-cyan-300">Objective:</strong> {SCENARIO.context}
              </div>
            </div>

            {/* Discovery Question Card */}
            <div className="bg-slate-900 border border-cyan-500/30 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-2 text-cyan-400 text-sm font-bold mb-3">
                <span>💡</span> Pre-Lab Discovery Challenge
              </div>
              <p className="text-white text-base font-medium mb-4">{DISCOVERY_QUESTION.question}</p>

              <div className="space-y-2 mb-4">
                {DISCOVERY_QUESTION.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => setDiscoveryAnswer(idx)}
                    disabled={discoverySubmitted}
                    className={`w-full text-left p-3 rounded-xl border text-sm transition-all ${
                      discoveryAnswer === idx
                        ? 'border-cyan-500 bg-cyan-950/50 text-white'
                        : 'border-slate-800 bg-slate-950 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span className="font-mono text-cyan-400 mr-2">{String.fromCharCode(65 + idx)}.</span> {opt}
                  </button>
                ))}
              </div>

              {!discoverySubmitted ? (
                <button
                  onClick={handleDiscoverySubmit}
                  disabled={discoveryAnswer === null}
                  className="w-full bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white font-bold py-2.5 rounded-xl shadow transition-all text-sm"
                >
                  Verify Discovery Prediction
                </button>
              ) : (
                <div className="p-4 rounded-xl bg-slate-950 border border-cyan-800 text-xs text-cyan-200">
                  <strong className="text-yellow-400">Insight:</strong> {DISCOVERY_QUESTION.hintAfter}
                </div>
              )}
            </div>

            {/* Common Misconceptions Matrix */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h3 className="text-md font-bold text-yellow-400 mb-4 flex items-center gap-2">
                <span>⚠️</span> Common Chemistry Misconceptions & Corrections
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MISCONCEPTIONS.map((misc) => (
                  <div key={misc.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs space-y-2">
                    <div className="text-red-400 font-semibold flex items-center gap-1.5">
                      <span>❌</span> Myth: {misc.misconception}
                    </div>
                    <div className="text-emerald-400 font-medium flex items-center gap-1.5">
                      <span>✅</span> Reality: {misc.correction}
                    </div>
                    <div className="text-slate-500 italic pt-1 border-t border-slate-900">{misc.explanation}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* TAB 2: INTERACTIVE EXPERIMENTATION LABS */}
        {/* ========================================== */}
        {activeTab === 'lab' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Exploration Lab Step Selector */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {EXPLORATION_STEPS.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCurrentLabStepIndex(idx);
                    audioManager.play('tap');
                    speechManager.speak(`Loaded ${step.title}`);
                  }}
                  className={`p-3 rounded-xl border text-xs font-semibold text-left transition-all ${
                    currentLabStepIndex === idx
                      ? 'border-cyan-500 bg-cyan-950/80 text-cyan-200 shadow-lg'
                      : 'border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="text-slate-500 text-[10px]">LAB STEP 0{idx + 1}</div>
                  <div className="truncate font-bold mt-1 text-white">{step.title.split(':')[1] || step.title}</div>
                </button>
              ))}
            </div>

            {/* Active Lab Display Banner */}
            <div className="bg-slate-900 border border-cyan-500/30 rounded-2xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h3 className="text-base font-bold text-cyan-300">
                  {EXPLORATION_STEPS[currentLabStepIndex].title}
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  {EXPLORATION_STEPS[currentLabStepIndex].instruction}
                </p>
              </div>
              <span className="text-xs bg-cyan-950 text-cyan-400 px-3 py-1 rounded-full border border-cyan-800 font-mono">
                Node: {EXPLORATION_STEPS[currentLabStepIndex].nodeId}
              </span>
            </div>

            {/* LAB INTERACTION PANELS */}
            {currentLabStepIndex === 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <MassSpecVisualizer cl35={cl35Count} cl37={cl37Count} />
                </div>
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-200 mb-4">Isotopic Abundance Controls</h4>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-xs text-cyan-300 mb-1">
                          <span>35-Cl Abundance: {cl35Count}%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={cl35Count}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            setCl35Count(val);
                            setCl37Count(100 - val);
                            audioManager.play('count');
                          }}
                          className="w-full accent-cyan-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between text-xs text-emerald-300 mb-1">
                          <span>37-Cl Abundance: {cl37Count}%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={cl37Count}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            setCl37Count(val);
                            setCl35Count(100 - val);
                            audioManager.play('count');
                          }}
                          className="w-full accent-emerald-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs text-slate-400 mt-4">
                    <strong className="text-cyan-400">Formula:</strong> Average Atomic Mass = Σ (% Abundance × Isotope Mass) / 100
                  </div>
                </div>
              </div>
            )}

            {currentLabStepIndex === 1 && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
                <div className="flex flex-wrap gap-4 items-center justify-between border-b border-slate-800 pb-4">
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Select Substance</label>
                    <select
                      value={substanceType}
                      onChange={(e) => {
                        setSubstanceType(e.target.value as 'H2O' | 'CO2' | 'NaCl' | 'O2');
                        audioManager.play('tap');
                      }}
                      className="bg-slate-950 border border-slate-700 text-white rounded-lg px-3 py-1.5 text-xs font-semibold"
                    >
                      <option value="H2O">Water (H₂O) - 18.015 g/mol</option>
                      <option value="CO2">Carbon Dioxide (CO₂) - 44.01 g/mol</option>
                      <option value="NaCl">Sodium Chloride (NaCl) - 58.44 g/mol</option>
                      <option value="O2">Oxygen Gas (O₂) - 31.998 g/mol</option>
                    </select>
                  </div>

                  <div className="flex-1 max-w-md">
                    <label className="text-xs text-cyan-400 font-bold block mb-1">
                      Moles (n): <span className="text-white text-sm">{moleValue} mol</span>
                    </label>
                    <input
                      type="range"
                      min="0.1"
                      max="10.0"
                      step="0.1"
                      value={moleValue}
                      onChange={(e) => {
                        setMoleValue(Number(e.target.value));
                        audioManager.play('count');
                      }}
                      className="w-full accent-cyan-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-slate-950 p-4 rounded-xl border border-cyan-800/50 text-center">
                    <div className="text-slate-400 text-xs font-semibold">Mass (g)</div>
                    <div className="text-2xl font-black text-cyan-400 my-1">{calculatedMass} g</div>
                    <div className="text-[10px] text-slate-500 font-mono">Mass = n × Molar Mass</div>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-purple-800/50 text-center">
                    <div className="text-slate-400 text-xs font-semibold">Particle Count (N)</div>
                    <div className="text-2xl font-black text-purple-400 my-1">{calculatedEntities}</div>
                    <div className="text-[10px] text-slate-500 font-mono">N = n × Avogadro Constant (N_A)</div>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-emerald-800/50 text-center">
                    <div className="text-slate-400 text-xs font-semibold">Molar Gas Volume at STP</div>
                    <div className="text-2xl font-black text-emerald-400 my-1">{calculatedSTPVolume} L</div>
                    <div className="text-[10px] text-slate-500 font-mono">V = n × 22.71 L/mol (IUPAC STP)</div>
                  </div>
                </div>
              </div>
            )}

            {currentLabStepIndex === 2 && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <StoichiometryVisualizer h2Moles={h2MolesInput} o2Moles={o2MolesInput} />
                </div>
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
                  <h4 className="text-sm font-bold text-slate-200">Reactant Controls (2 H₂ + O₂ → 2 H₂O)</h4>
                  <div>
                    <div className="flex justify-between text-xs text-cyan-300 mb-1">
                      <span>Hydrogen (H₂): {h2MolesInput} moles</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={h2MolesInput}
                      onChange={(e) => {
                        setH2MolesInput(Number(e.target.value));
                        audioManager.play('count');
                      }}
                      className="w-full accent-cyan-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-red-300 mb-1">
                      <span>Oxygen (O₂): {o2MolesInput} moles</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={o2MolesInput}
                      onChange={(e) => {
                        setO2MolesInput(Number(e.target.value));
                        audioManager.play('count');
                      }}
                      className="w-full accent-red-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            )}

            {currentLabStepIndex === 3 && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <SolutionPrepVisualizer moles={soluteMolesInput} volumeL={solutionVolumeLInput} tempC={tempCInput} />
                </div>
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
                  <h4 className="text-sm font-bold text-slate-200">Solution Parameters</h4>
                  <div>
                    <label className="text-xs text-purple-300 block mb-1">Solute Amount: {soluteMolesInput} mol</label>
                    <input
                      type="range"
                      min="0.2"
                      max="5.0"
                      step="0.2"
                      value={soluteMolesInput}
                      onChange={(e) => {
                        setSoluteMolesInput(Number(e.target.value));
                        audioManager.play('count');
                      }}
                      className="w-full accent-purple-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-cyan-300 block mb-1">Solution Volume: {solutionVolumeLInput} L</label>
                    <input
                      type="range"
                      min="0.2"
                      max="3.0"
                      step="0.1"
                      value={solutionVolumeLInput}
                      onChange={(e) => {
                        setSolutionVolumeLInput(Number(e.target.value));
                        audioManager.play('count');
                      }}
                      className="w-full accent-cyan-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-amber-300 block mb-1">Temperature: {tempCInput}°C</label>
                    <input
                      type="range"
                      min="10"
                      max="90"
                      value={tempCInput}
                      onChange={(e) => {
                        setTempCInput(Number(e.target.value));
                        audioManager.play('count');
                      }}
                      className="w-full accent-amber-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            )}

            {currentLabStepIndex === 4 && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <EmpiricalFormulaVisualizer cPct={cPctInput} hPct={hPctInput} oPct={oPctInput} molarMass={givenMolarMass} />
                </div>
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
                  <h4 className="text-sm font-bold text-slate-200">Elemental Composition Controls</h4>
                  <div>
                    <label className="text-xs text-cyan-300 block mb-1">% Carbon (C): {cPctInput.toFixed(1)}%</label>
                    <input
                      type="range"
                      min="10"
                      max="80"
                      step="0.5"
                      value={cPctInput}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setCPctInput(val);
                        const rem = 100 - val;
                        setHPctInput(rem * 0.15);
                        setOPctInput(rem * 0.85);
                        audioManager.play('count');
                      }}
                      className="w-full accent-cyan-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-yellow-300 block mb-1">Molar Mass Target: {givenMolarMass} g/mol</label>
                    <input
                      type="range"
                      min="30"
                      max="360"
                      step="30"
                      value={givenMolarMass}
                      onChange={(e) => {
                        setGivenMolarMass(Number(e.target.value));
                        audioManager.play('count');
                      }}
                      className="w-full accent-yellow-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* PREDICTION & OBSERVATION CHECKS MAP */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              <h3 className="text-md font-bold text-cyan-400 flex items-center gap-2">
                <span>🔍</span> Guided Predictions & Observations Check
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Predictions */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Predict & Verify</h4>
                  {PREDICTION_QUESTIONS.map((pq, idx) => (
                    <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs space-y-2">
                      <div className="text-slate-200 font-medium">{pq.question}</div>
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        {pq.options.map((opt, oIdx) => (
                          <button
                            key={oIdx}
                            onClick={() => {
                              setPredictionAnswers((prev) => ({ ...prev, [idx]: oIdx }));
                              audioManager.play('tap');
                            }}
                            className={`p-2 rounded border text-left text-[11px] transition-all ${
                              predictionAnswers[idx] === oIdx
                                ? oIdx === pq.correctIndex
                                  ? 'border-emerald-500 bg-emerald-950 text-emerald-200'
                                  : 'border-red-500 bg-red-950 text-red-200'
                                : 'border-slate-800 bg-slate-900 text-slate-400'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                      <div className="text-[10px] text-slate-500 italic pt-1">{pq.verifyInstruction}</div>
                    </div>
                  ))}
                </div>

                {/* Observations */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Lab Observations</h4>
                  {OBSERVATION_QUESTIONS.map((oq, idx) => (
                    <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs space-y-2">
                      <div className="text-slate-200 font-medium">{oq.question}</div>
                      <div className="space-y-1.5 pt-1">
                        {oq.observableOptions.map((opt, oIdx) => (
                          <button
                            key={oIdx}
                            onClick={() => {
                              setObservationAnswers((prev) => ({ ...prev, [idx]: oIdx }));
                              audioManager.play('tap');
                            }}
                            className={`w-full p-2 rounded border text-left text-[11px] transition-all ${
                              observationAnswers[idx] === oIdx
                                ? oIdx === oq.correctIndex
                                  ? 'border-emerald-500 bg-emerald-950 text-emerald-200'
                                  : 'border-red-500 bg-red-950 text-red-200'
                                : 'border-slate-800 bg-slate-900 text-slate-400'
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
          </div>
        )}

        {/* ========================================== */}
        {/* TAB 3: PRACTICE CHALLENGES (22+ TIERS) */}
        {/* ========================================== */}
        {activeTab === 'challenges' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Challenge Navigation & Progress Bar */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-3">
                <span className="text-xl">🎯</span>
                <div>
                  <div className="text-xs text-slate-400">
                    Challenge {currentChallengeIndex + 1} of {CHALLENGES.length}
                  </div>
                  <div className="text-sm font-bold text-white flex items-center gap-2">
                    <span>Node: {currentChallenge.nodeId}</span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded uppercase font-mono ${
                        currentChallenge.type === 'foundation'
                          ? 'bg-blue-950 text-blue-400 border border-blue-800'
                          : currentChallenge.type === 'standard'
                          ? 'bg-purple-950 text-purple-400 border border-purple-800'
                          : 'bg-amber-950 text-amber-400 border border-amber-800'
                      }`}
                    >
                      {currentChallenge.type} ({currentChallenge.difficulty})
                    </span>
                  </div>
                </div>
              </div>

              {/* Progress dots */}
              <div className="flex gap-1 overflow-x-auto max-w-md p-1">
                {CHALLENGES.map((c, idx) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      setCurrentChallengeIndex(idx);
                      setSelectedOption(null);
                      setChallengeSubmitted(false);
                      setShowHint(false);
                      audioManager.play('tap');
                    }}
                    className={`w-3.5 h-3.5 rounded-full transition-all ${
                      idx === currentChallengeIndex
                        ? 'bg-cyan-400 ring-2 ring-cyan-400/50 scale-125'
                        : completedChallenges.has(c.id)
                        ? 'bg-emerald-500'
                        : 'bg-slate-800 hover:bg-slate-700'
                    }`}
                    title={`Question ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Active Challenge Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6 relative">
              <div className="text-base md:text-lg font-semibold text-slate-100 leading-relaxed">
                {currentChallenge.question}
              </div>

              {/* Options grid */}
              <div className="space-y-3">
                {currentChallenge.options.map((option, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrect = idx === currentChallenge.correctIndex;
                  const showResult = challengeSubmitted;

                  let btnStyle = 'border-slate-800 bg-slate-950 text-slate-300 hover:border-slate-700';

                  if (showResult) {
                    if (isCorrect) {
                      btnStyle = 'border-emerald-500 bg-emerald-950/80 text-emerald-200 font-medium';
                    } else if (isSelected) {
                      btnStyle = 'border-red-500 bg-red-950/80 text-red-200';
                    }
                  } else if (isSelected) {
                    btnStyle = 'border-cyan-500 bg-cyan-950/60 text-white font-medium';
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleChallengeOptionSelect(idx)}
                      disabled={challengeSubmitted}
                      className={`w-full text-left p-4 rounded-xl border text-sm transition-all flex items-start gap-3 ${btnStyle}`}
                    >
                      <span className="w-6 h-6 rounded-full bg-slate-900 border border-slate-700 text-xs flex items-center justify-center font-bold text-cyan-400 shrink-0 mt-0.5">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="flex-1">{option}</span>
                    </button>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-4 border-t border-slate-800">
                <button
                  onClick={() => {
                    setShowHint(!showHint);
                    if (!showHint) audioManager.play('hint');
                  }}
                  className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 font-medium px-3 py-2 rounded-lg bg-amber-950/30 border border-amber-800/50"
                >
                  <span>💡</span> {showHint ? 'Hide Hint' : 'Need Hint?'}
                </button>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={handlePrevChallenge}
                    disabled={currentChallengeIndex === 0}
                    className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-slate-800 text-xs font-bold text-slate-400 hover:text-white disabled:opacity-40"
                  >
                    Previous
                  </button>

                  {!challengeSubmitted ? (
                    <button
                      onClick={handleChallengeSubmit}
                      disabled={selectedOption === null}
                      className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white text-xs font-bold shadow-lg transition-all"
                    >
                      Submit Answer
                    </button>
                  ) : (
                    <button
                      onClick={handleNextChallenge}
                      className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg transition-all flex items-center justify-center gap-1"
                    >
                      <span>Next Challenge</span>
                      <span>➔</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Hint Bubble Display */}
              {showHint && (
                <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-800/60 text-xs text-amber-200 animate-fadeIn space-y-2">
                  <div className="font-bold flex items-center gap-1.5 text-amber-400">
                    <span>💡</span> Guided Hint:
                  </div>
                  <div>{currentChallenge.hints[currentHintIndex]}</div>
                  {currentChallenge.hints.length > 1 && (
                    <button
                      onClick={() => setCurrentHintIndex((prev) => (prev + 1) % currentChallenge.hints.length)}
                      className="text-[10px] text-amber-400 underline"
                    >
                      Next Hint ({currentHintIndex + 1}/{currentChallenge.hints.length})
                    </button>
                  )}
                </div>
              )}

              {/* Explanation Display */}
              {challengeSubmitted && (
                <div
                  className={`p-4 rounded-xl border text-xs space-y-2 animate-fadeIn ${
                    selectedOption === currentChallenge.correctIndex
                      ? 'bg-emerald-950/30 border-emerald-800 text-emerald-200'
                      : 'bg-red-950/30 border-red-800 text-red-200'
                  }`}
                >
                  <div className="font-bold text-sm">
                    {selectedOption === currentChallenge.correctIndex ? '✅ Correct Solution:' : '❌ Explanation & Derivation:'}
                  </div>
                  <p className="leading-relaxed">{currentChallenge.explanation}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* TAB 4: SUMMARY & REAL WORLD APPLICATION */}
        {/* ========================================== */}
        {activeTab === 'summary' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Real World Case Study Activity */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold">
                <span>🏭</span> {REAL_WORLD_ACTIVITY.title}
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>

              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Industrial QA Protocol Calculations:
                </h4>
                {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                  <div key={idx} className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400 font-mono text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* BKT Mastery Matrix Grid */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <h3 className="text-md font-bold text-cyan-400 flex items-center gap-2">
                <span>📊</span> Knowledge Node BKT Mastery Matrix ({ALL_NODE_IDS.length} Nodes)
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto pr-2">
                {ALL_NODE_IDS.map((nodeId) => {
                  const info = NODE_DETAILS[nodeId];
                  const bkt = bktStates[nodeId] || createBKTState();
                  const mastery = getMasteryLevel(bkt);
                  const pKnown = (bkt.pKnown * 100).toFixed(0);

                  return (
                    <div key={nodeId} className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-1">
                          <span className="font-bold text-white text-xs truncate">{info.title}</span>
                          <span className="text-[10px] text-cyan-400 font-mono shrink-0">{pKnown}%</span>
                        </div>
                        <p className="text-[10px] text-slate-400 line-clamp-2 mt-1">{info.description}</p>
                      </div>

                      <div className="mt-3 pt-2 border-t border-slate-900 flex justify-between items-center text-[10px]">
                        <span className="text-slate-500 font-mono">{nodeId}</span>
                        <span
                          className={`font-semibold ${
                            mastery === 'mastered'
                              ? 'text-emerald-400'
                              : mastery === 'beginner'
                              ? 'text-yellow-400'
                              : 'text-slate-500'
                          }`}
                        >
                          {mastery.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Final Completion Action */}
            <div className="bg-slate-900 border border-cyan-500/30 rounded-2xl p-6 text-center space-y-4">
              <h3 className="text-lg font-bold text-white">Laboratory Module Completed!</h3>
              <p className="text-slate-400 text-xs max-w-lg mx-auto">
                You have demonstrated mastery over stoichiometry, limiting reagents, chemical laws, molar mass determination, and solution concentration calculations.
              </p>
              <button
                onClick={() => {
                  if (onComplete) onComplete(score);
                  audioManager.play('celebration');
                }}
                className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm px-8 py-3 rounded-xl shadow-lg transition-all"
              >
                Return to Course Graph & Submit Score ({score} pts)
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Floating Helper Bubbles */}
      <HintBubble show={showHint} text={currentChallenge.hints[currentHintIndex] || 'Recall fundamental principles of stoichiometry!'} />
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccessBanner} text="Challenge Mastered!" />
      <SparkleBurst show={showSparkle} x={400} y={300} />
    </div>
  );
};

export default C11_ChemistrySomeBasicConceptsofChemistryCBSESim;