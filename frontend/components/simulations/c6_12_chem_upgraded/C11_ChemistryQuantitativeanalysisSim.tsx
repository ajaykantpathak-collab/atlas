'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import type { SoundEffect } from '../../../lib/sim-engine/types';
import { createReviewItem, sm2Update, ReviewItem } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, BKTState } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// -----------------------------------------------------------------------------
// CONSTANTS & NODE IDS
// -----------------------------------------------------------------------------
const NODE_071 = 'c11_chem_071'; // Percentage Composition
const NODE_072 = 'c11_chem_072'; // Empirical & Molecular Formula
const NODE_073 = 'c11_chem_073'; // Stoichiometry & Mole Calculations
const NODE_074 = 'c11_chem_074'; // Limiting & Excess Reactants
const NODE_075 = 'c11_chem_075'; // Yield Calculations (Theoretical, Actual, Percent)
const NODE_076 = 'c11_chem_076'; // Concentration Units (Molarity, Normality, Molality)
const NODE_077 = 'c11_chem_077'; // Acid-Base Titration & Equivalence Point
const NODE_078 = 'c11_chem_078'; // Indicators & pH Transition Ranges
const NODE_079 = 'c11_chem_079'; // Gravimetric Analysis & Constant Mass
const NODE_080 = 'c11_chem_080'; // Primary & Secondary Standards

const ALL_NODE_IDS: string[] = [
  NODE_071, NODE_072, NODE_073, NODE_074, NODE_075,
  NODE_076, NODE_077, NODE_078, NODE_079, NODE_080
];

// -----------------------------------------------------------------------------
// MANDATORY CONTENT STRUCTURES
// -----------------------------------------------------------------------------
const SCENARIO = {
  title: 'Central Quality Control Laboratory: Analytical Chemistry Division',
  intro: 'Welcome to the National Analytical Standards Laboratory. As senior quantitative analyst, your role is to perform ultra-precise chemical analyses—from standardizing solutions and performing micro-titrations to determining empirical formulas and gravimetric precipitates.',
  context: 'In this simulation, you will operate calibrated lab equipment including digital balances, automated titrators, desiccators, and porcelain crucibles. Master quantitative stoichiometry, titration curves, indicator selection, and gravimetric techniques required by the ISC Class 11 syllabus.'
};

const DISCOVERY_QUESTION = {
  question: 'When performing an acid-base titration using an indicator, why does adding 50 mL of extra distilled water to the conical flask containing the analyte sample NOT change the required volume of titrant to reach the neutralization endpoint?',
  options: [
    'The added water dilutes both the acid and base equally at the interface',
    'Neutralization strictly depends on the total number of analyte moles present, which remains unchanged upon dilution',
    'Distilled water acts as a buffer solution that auto-adjusts the pH back to the initial stoichiometric point',
    'The indicator changes its fundamental pKa value proportionally to match the increased solvent volume'
  ],
  correctIndex: 1,
  hintAfter: 'Titration is a mole-counting quantitative technique! Adding solvent increases total liquid volume and decreases molar concentration, but the absolute number of analyte moles (n = C × V) remains constant.'
};

const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Acid-Base Volumetric Titration & Indicator Dynamics',
    instruction: 'Select titrant (NaOH) and analyte (HCl or CH3COOH), choose an indicator, and titrate dropwise to construct live pH titration curves and detect exact equivalence points.',
    interactionType: 'titration-simulator',
    nodeId: NODE_077
  },
  {
    title: 'Lab 2: Gravimetric Analysis & Constant Mass Heating',
    instruction: 'Precipitate barium sulphate (BaSO4), filter, ignite in a crucible, cool in a desiccator, and heat repeatedly until consecutive weighings match within ±0.001 g.',
    interactionType: 'gravimetric-furnace',
    nodeId: NODE_079
  },
  {
    title: 'Lab 3: Limiting Reactant & Stoichiometric Atom Visualizer',
    instruction: 'Mix variable mole ratios of N2 and H2 to synthesize NH3 (or Fe + O2). Observe leftover excess reactants and calculate theoretical yield vs actual percent yield.',
    interactionType: 'limiting-reactant',
    nodeId: NODE_074
  },
  {
    title: 'Lab 4: Formula Determination Engine (Empirical & Molecular)',
    instruction: 'Input elemental combustion analysis mass percentages (C, H, O, N) and molar mass to deduce empirical formulas, simplify atomic ratios, and determine molecular formulas.',
    interactionType: 'formula-builder',
    nodeId: NODE_072
  },
  {
    title: 'Lab 5: Primary Standard Solution Preparation & Molarity Modeler',
    instruction: 'Weigh primary standard Sodium Carbonate (Na2CO3) or Oxalic Acid ((COOH)2·2H2O), dissolve in a volumetric flask, calculate exact Molarity, Molality, and Normality.',
    interactionType: 'solution-prep',
    nodeId: NODE_080
  }
];

const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you titrate 25.0 mL of 0.10 M weak acid CH3COOH (Ka = 1.8 × 10⁻⁵) with 0.10 M strong base NaOH, what will be the pH at the equivalence point?',
    options: [
      'Exactly pH 7.00 because strong base completely neutralizes weak acid',
      'pH < 7.00 because acetic acid is weak and leaves residual H+ ions',
      'pH > 7.00 (approx pH 8.72) due to hydrolysis of the conjugate base anion (CH3COO⁻)',
      'pH 14.00 because NaOH dominates the entire solution at equivalence'
    ],
    correctIndex: 2,
    verifyInstruction: 'In Lab 1, select CH3COOH + NaOH titration and observe the steep region of the pH curve at 25.0 mL addition.',
    nodeId: NODE_077
  },
  {
    question: 'Predict: In a gravimetric analysis of sulfate ions using BaCl2 reagent, what happens to the calculated sulfate percentage if the BaSO4 precipitate is weighed before complete drying?',
    options: [
      'The calculated percentage of sulfate will be artificially HIGH because trapped water adds extra mass',
      'The calculated percentage will be artificially LOW because water dissolves the precipitate',
      'The percentage remains completely unaffected as water vaporizes during calculation',
      'The percentage drops to zero because wet precipitate destroys the digital balance'
    ],
    correctIndex: 0,
    verifyInstruction: 'In Lab 2, compare precipitate mass after 1st heating cycle vs final constant mass after desiccator cooling.',
    nodeId: NODE_079
  }
];

const OBSERVATION_QUESTIONS = [
  {
    question: 'Observation: Notice the pH curve shape during strong acid - strong base titration vs weak acid - strong base titration. What key difference stands out near the equivalence point?',
    observableOptions: [
      'Strong acid-strong base has a very steep pH jump (pH 4 to 10), whereas weak acid has a shorter jump entirely in the alkaline region (pH 7 to 10)',
      'Weak acid titrations have no inflection point or equivalence point at all',
      'Strong acid titrations require double the volume of NaOH compared to weak acid of same concentration',
      'Phenolphthalein works for strong acid but turns completely black in weak acid titrations'
    ],
    correctIndex: 0,
    nodeId: NODE_078
  },
  {
    question: 'Observation: During repeated crucible heating cycles in gravimetric analysis, why does mass decrease progressively until reaching a plateau?',
    observableOptions: [
      'Crucible ceramic melts away with prolonged Bunsen heating',
      'Residual occluded moisture and volatile ammonium salts vaporize completely until constant dry mass is achieved',
      'Barium sulphate decomposes into barium metal and sulfur dioxide gas',
      'Digital balance loses calibration precision due to heat exposure'
    ],
    correctIndex: 1,
    nodeId: NODE_079
  }
];

const REAL_WORLD_ACTIVITY = {
  title: 'Industrial Standardization & Pharmaceutical Quality Control Task',
  description: 'As a QC chemist at a pharmaceutical plant, you must standardize a freshly prepared commercial 0.1 M NaOH solution against primary standard anhydrous sodium carbonate (Na2CO3) using methyl orange indicator, and verify batch purity.',
  steps: [
    'Step 1: Weigh exactly 1.3250 g of primary standard Na2CO3 (Molar Mass = 105.99 g/mol) on an analytical balance.',
    'Step 2: Dissolve in distilled water and dilute to 250.0 mL in a volumetric flask to prepare standard 0.0500 M Na2CO3 solution.',
    'Step 3: Pipette 25.00 mL of Na2CO3 into a conical flask, add 2 drops of methyl orange, and titrate with unknown NaOH / HCl.',
    'Step 4: Record burette readings (V1 = 0.00 mL, V2 = 24.85 mL). Calculate true molarity (C1V1 = C2V2 stoichiometry) and certify batch tolerance within ±0.5%.'
  ]
};

// -----------------------------------------------------------------------------
// MISCONCEPTIONS LIST
// -----------------------------------------------------------------------------
const MISCONCEPTIONS = [
  {
    id: 'misc_01',
    title: 'Equivalence Point and End Point Are Identical',
    description: 'Students believe equivalence point and end point occur at the exact same moment regardless of indicator choice.',
    correction: 'Equivalence point is the theoretical stoichiometric ratio point. End point is the observed physical change (color change). Indicator choice must align its pH transition range with the equivalence point pH jump.',
    nodeId: NODE_077
  },
  {
    id: 'misc_02',
    title: 'Reactant with Smallest Mass is Always Limiting',
    description: 'Students assume the reactant with lower grams or moles is automatically limiting, ignoring stoichiometric coefficients.',
    correction: 'Limiting reactant is found by dividing available moles by stoichiometric coefficient (n/coeff). The reactant with the minimum mole ratio governs production.',
    nodeId: NODE_074
  },
  {
    id: 'misc_03',
    title: 'Percentage Composition Changes with Total Sample Size',
    description: 'Students think a larger sample mass contains a higher percentage of an constituent element.',
    correction: 'Percentage composition is an intensive property governed by the Law of Definite Proportions and is independent of sample size.',
    nodeId: NODE_071
  },
  {
    id: 'misc_04',
    title: 'Single Heating Step is Sufficient for Gravimetric Analysis',
    description: 'Students assume one heating cycle removes all water from precipitates.',
    correction: 'Gravimetric analysis requires heating to constant mass (consecutive weighings within 0.001 g) after cooling in a desiccator.',
    nodeId: NODE_079
  },
  {
    id: 'misc_05',
    title: 'Diluting Analyte Increases Required Titrant Volume',
    description: 'Students believe adding extra distilled water to the conical flask requires more titrant.',
    correction: 'Total moles of analyte remain unchanged upon dilution (n = C × V). Titrant required depends only on analyte moles.',
    nodeId: NODE_076
  },
  {
    id: 'misc_06',
    title: 'Molarity Changes with Temperature',
    description: 'Students confuse Molarity and Molality temperature independence.',
    correction: 'Molarity (moles/L solution) changes with temperature due to liquid thermal expansion/contraction. Molality (moles/kg solvent) is temperature independent.',
    nodeId: NODE_076
  }
];

// -----------------------------------------------------------------------------
// INTERFACES & TYPES
// -----------------------------------------------------------------------------
type TabType = 'discovery' | 'lab' | 'challenges' | 'summary';

interface Challenge {
  id: string;
  nodeId: string;
  type: 'mcq' | 'numeric' | 'drag-sort';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: string;
  question: string;
  options?: string[];
  correctIndex?: number;
  correctAnswer?: number;
  tolerance?: number;
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
  unit?: string;
}

// -----------------------------------------------------------------------------
// 22+ COMPREHENSIVE CHALLENGES DATA
// -----------------------------------------------------------------------------
const CHALLENGES: Challenge[] = [
  // --- FOUNDATION TIER (7) ---
  {
    id: 'ch_01',
    nodeId: NODE_071,
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Recall & Understanding',
    question: 'What is the mass percentage of Oxygen in pure water (H2O)? (Atomic masses: H = 1.008 g/mol, O = 16.00 g/mol)',
    options: ['11.19%', '50.00%', '88.81%', '33.33%'],
    correctIndex: 2,
    explanation: 'Molar mass of H2O = 2(1.008) + 16.00 = 18.016 g/mol. % Oxygen = (16.00 / 18.016) × 100% = 88.81%.',
    hints: [
      'Calculate total molar mass of H2O.',
      'Divide the atomic mass contribution of oxygen by total molar mass.',
      'Multiply ratio by 100.'
    ],
    misconceptionIndex: 2
  },
  {
    id: 'ch_02',
    nodeId: NODE_072,
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Formula Identification',
    question: 'Glucose has the molecular formula C6H12O6. What is its simplest empirical formula?',
    options: ['CHO', 'CH2O', 'C2H4O2', 'C6H12O6'],
    correctIndex: 1,
    explanation: 'Dividing all atomic subscripts (6:12:6) by their greatest common divisor (6) gives the simplest whole-number molar ratio: CH2O.',
    hints: [
      'Find the greatest common divisor for subscripts 6, 12, and 6.',
      'Divide each subscript by 6.',
      'The reduced formula is CH2O.'
    ]
  },
  {
    id: 'ch_03',
    nodeId: NODE_076,
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Concentration Concepts',
    question: 'Which concentration unit is independent of ambient temperature changes?',
    options: ['Molarity (M)', 'Normality (N)', 'Molality (m)', 'Formality (F)'],
    correctIndex: 2,
    explanation: 'Molality (moles of solute per kilogram of solvent) depends on mass, which is temperature-invariant, unlike volume-based units.',
    hints: [
      'Volume expands or contracts with temperature.',
      'Mass does not change with temperature.',
      'Molality is defined per kg of solvent mass.'
    ],
    misconceptionIndex: 5
  },
  {
    id: 'ch_04',
    nodeId: NODE_077,
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Titration Fundamentals',
    question: 'In a volumetric titration, what is the exact term for the theoretical point where moles of titrant added equal moles of analyte stoichiometrically?',
    options: ['End Point', 'Equivalence Point', 'Transition Point', 'Neutral Point'],
    correctIndex: 1,
    explanation: 'The equivalence point is the theoretical stoichiometric equality point, whereas the end point is the visually observed indicator color change.',
    hints: [
      'One is stoichiometric theoretical, one is physical observation.',
      'Equal stoichiometric moles define equivalence.',
      'Color change defines end point.'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'ch_05',
    nodeId: NODE_078,
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Indicator Selection',
    question: 'Which chemical indicator is best suited for titrating a weak acid (e.g., CH3COOH) against a strong base (NaOH)?',
    options: ['Methyl Orange (pH 3.1 - 4.4)', 'Phenolphthalein (pH 8.2 - 10.0)', 'Methyl Red (pH 4.4 - 6.2)', 'Thimol Blue acidic range'],
    correctIndex: 1,
    explanation: 'At equivalence for weak acid vs strong base, basic anion hydrolysis raises equivalence pH above 7 (~8.7). Phenolphthalein (8.2-10.0) matches this region.',
    hints: [
      'Weak acid + strong base produces a basic salt solution at equivalence (pH > 7).',
      'Select an indicator that transitions in the alkaline pH 8-10 region.',
      'Phenolphthalein turns pink at pH ~8.2.'
    ]
  },
  {
    id: 'ch_06',
    nodeId: NODE_079,
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Gravimetric Protocol',
    question: 'Why must heated porcelain crucibles containing precipitates be cooled in a desiccator prior to weighing?',
    options: ['To speed up cooling using cold liquid refrigerants', 'To prevent atmospheric moisture reabsorption and thermal convection currents on scale pan', 'To make the crucible change color', 'To freeze the precipitate into a solid crystal lattice'],
    correctIndex: 1,
    explanation: 'Desiccators contain drying agents (e.g., anhydrous CaCl2) that absorb moisture, preventing hot/warm crucibles from absorbing water vapor and causing thermal buoyancy errors.',
    hints: [
      'Hot objects create air convection currents that ruin precision mass balance readings.',
      'Dry precipitates readily absorb humidity from open air.',
      'Desiccators keep the atmosphere inside perfectly dry.'
    ],
    misconceptionIndex: 3
  },
  {
    id: 'ch_07',
    nodeId: NODE_080,
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Standardization Concepts',
    question: 'Why is Sodium Hydroxide (NaOH) classified as a SECONDARY standard rather than a primary standard?',
    options: ['It is too expensive for routine school laboratories', 'It is non-reactive with common laboratory acids', 'It is hygroscopic and rapidly absorbs atmospheric CO2 and water vapor', 'It does not dissolve completely in water'],
    correctIndex: 2,
    explanation: 'NaOH solids absorb water and CO2 (forming Na2CO3) rapidly from air, making accurate direct weighing impossible. It must be standardized against a primary standard like oxalic acid.',
    hints: [
      'Primary standards must be available in pure, stable, non-hygroscopic state.',
      'NaOH pellets become sticky/wet when exposed to laboratory air.',
      'This property is known as hygroscopy.'
    ]
  },

  // --- STANDARD TIER (8) ---
  {
    id: 'ch_08',
    nodeId: NODE_073,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Stoichiometric Mass Calculation',
    question: 'Calculate the mass (in grams) of Calcium Carbonate (CaCO3) required to produce 4.40 g of Carbon Dioxide gas upon thermal decomposition: CaCO3(s) → CaO(s) + CO2(g). (Molar masses: CaCO3 = 100.09 g/mol, CO2 = 44.01 g/mol)',
    correctAnswer: 10.01,
    tolerance: 0.1,
    unit: 'g',
    explanation: 'Moles of CO2 = 4.40 / 44.01 = 0.100 mol. Stoichiometric ratio 1:1 requires 0.100 mol CaCO3. Mass = 0.100 mol × 100.09 g/mol = 10.01 g.',
    hints: [
      'Convert 4.40 g CO2 to moles.',
      'Use 1:1 stoichiometry from balanced equation.',
      'Multiply moles by molar mass of CaCO3 (100.09 g/mol).'
    ]
  },
  {
    id: 'ch_09',
    nodeId: NODE_074,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Limiting Reactant Mass',
    question: '2.00 moles of N2 gas and 4.00 moles of H2 gas react according to: N2 + 3H2 → 2NH3. Calculate maximum moles of Ammonia (NH3) produced.',
    correctAnswer: 2.67,
    tolerance: 0.05,
    unit: 'moles',
    explanation: 'N2 ratio = 2.00 / 1 = 2.00. H2 ratio = 4.00 / 3 = 1.33. H2 is limiting reagent! Moles of NH3 = 4.00 × (2/3) = 2.667 moles.',
    hints: [
      'Divide moles by coefficients: N2 = 2/1, H2 = 4/3.',
      'Identify smaller value: H2 is limiting reagent.',
      'Calculate NH3 moles from H2 using ratio 2/3.'
    ],
    misconceptionIndex: 1
  },
  {
    id: 'ch_10',
    nodeId: NODE_075,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Percentage Yield',
    question: 'In a synthesis reaction, theoretical yield of Aspirin is calculated as 15.00 g. If the actual isolated pure dry product is 12.75 g, calculate the percentage yield (%).',
    correctAnswer: 85.0,
    tolerance: 0.2,
    unit: '%',
    explanation: 'Percent Yield = (Actual Yield / Theoretical Yield) × 100 = (12.75 / 15.00) × 100 = 85.0%.',
    hints: [
      'Formula: % Yield = (Actual / Theoretical) × 100.',
      'Divide 12.75 by 15.00.',
      'Convert decimal fraction to percentage.'
    ]
  },
  {
    id: 'ch_11',
    nodeId: NODE_076,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Molarity & Volumetric Calculations',
    question: 'What volume (in mL) of concentrated 2.00 M HCl stock solution is required to prepare 250.0 mL of diluted 0.100 M HCl solution?',
    correctAnswer: 12.5,
    tolerance: 0.2,
    unit: 'mL',
    explanation: 'Using dilution law C1V1 = C2V2: (2.00 M)(V1) = (0.100 M)(250.0 mL) => V1 = (0.100 × 250) / 2.00 = 12.5 mL.',
    hints: [
      'Use dilution equation: C1 × V1 = C2 × V2.',
      'Substitute C1 = 2.00, C2 = 0.100, V2 = 250.',
      'Solve for V1 in mL.'
    ]
  },
  {
    id: 'ch_12',
    nodeId: NODE_072,
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Empirical Formula Deduction',
    question: 'A compound contains 40.0% Carbon, 6.7% Hydrogen, and 53.3% Oxygen by mass. What is its empirical formula? (At. masses: C=12, H=1, O=16)',
    options: ['CHO', 'CH2O', 'C2H4O', 'CH3O'],
    correctIndex: 1,
    explanation: 'Moles in 100g: C = 40/12 = 3.33, H = 6.7/1 = 6.7, O = 53.3/16 = 3.33. Dividing by 3.33 yields ratio C:H:O = 1 : 2 : 1 => CH2O.',
    hints: [
      'Assume 100g sample: 40g C, 6.7g H, 53.3g O.',
      'Convert grams to moles by dividing by atomic mass.',
      'Divide all mole values by smallest mole number (3.33).'
    ]
  },
  {
    id: 'ch_13',
    nodeId: NODE_076,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Normality & Equivalent Mass',
    question: 'What is the Normality (N) of a 0.15 M H2SO4 solution when reacting completely in an acid-base neutralization reaction (H2SO4 has n-factor = 2)?',
    correctAnswer: 0.30,
    tolerance: 0.01,
    unit: 'N',
    explanation: 'Normality = Molarity × n-factor (basicity of acid). For H2SO4, n-factor = 2 protons released. N = 0.15 × 2 = 0.30 N.',
    hints: [
      'Identify n-factor (basicity) of H2SO4 = 2.',
      'Normality = Molarity × n-factor.',
      '0.15 × 2 = 0.30.'
    ]
  },
  {
    id: 'ch_14',
    nodeId: NODE_077,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Titration Analysis',
    question: 'A 25.00 mL sample of unknown HCl solution requires exactly 20.00 mL of 0.1250 M standard NaOH for neutralization. What is the molarity of the HCl solution?',
    correctAnswer: 0.100,
    tolerance: 0.002,
    unit: 'M',
    explanation: 'Ma × Va = Mb × Vb => Ma × 25.00 = 0.1250 × 20.00 => Ma = 2.50 / 25.00 = 0.1000 M.',
    hints: [
      'Use neutralization equation: M1 × V1 = M2 × V2.',
      'M_acid × 25.00 mL = 0.1250 M × 20.00 mL.',
      'Solve for M_acid.'
    ]
  },
  {
    id: 'ch_15',
    nodeId: NODE_079,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Gravimetric Calculation',
    question: 'A 0.500 g sample of an impure soluble chloride salt yields 0.287 g of AgCl precipitate upon adding AgNO3. Calculate the percentage of Chloride (Cl⁻) in the sample. (At. masses: Ag=107.87, Cl=35.45)',
    correctAnswer: 14.2,
    tolerance: 0.3,
    unit: '%',
    explanation: 'Gravimetric factor GF = Cl / AgCl = 35.45 / 143.32 = 0.2473. Mass of Cl = 0.287 × 0.2473 = 0.0710 g. % Cl = (0.0710 / 0.500) × 100 = 14.2%.',
    hints: [
      'Calculate fraction of Cl in AgCl: 35.45 / 143.32 = 0.2473.',
      'Mass of Cl⁻ in precipitate = 0.287 g × 0.2473 = 0.0710 g.',
      '% Cl⁻ = (0.0710 g / 0.500 g) × 100 = 14.2%.'
    ]
  },

  // --- ADVANCED TIER (7) ---
  {
    id: 'ch_16',
    nodeId: NODE_071,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Complex Hydrate Gravimetric Formula',
    question: '1.000 g of hydrated copper sulphate (CuSO4·xH2O) is heated to constant mass in a crucible, leaving 0.639 g of anhydrous CuSO4. Determine the integer value of water of crystallization (x). (Molar mass: CuSO4 = 159.61 g/mol, H2O = 18.02 g/mol)',
    correctAnswer: 5,
    tolerance: 0.1,
    unit: 'H2O molecules',
    explanation: 'Mass of H2O lost = 1.000 - 0.639 = 0.361 g. Moles CuSO4 = 0.639 / 159.61 = 0.00400 mol. Moles H2O = 0.361 / 18.02 = 0.0200 mol. x = 0.0200 / 0.00400 = 5. Formula: CuSO4·5H2O.',
    hints: [
      'Mass water lost = total hydrate mass minus anhydrous mass = 0.361 g.',
      'Moles CuSO4 = 0.639 / 159.61 = 0.0040 mol.',
      'Ratio x = Moles H2O / Moles CuSO4 = 0.0200 / 0.0040 = 5.'
    ]
  },
  {
    id: 'ch_17',
    nodeId: NODE_072,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Combustion Analysis & Molecular Formula',
    question: 'Combustion of 0.300 g of an organic compound containing C, H, and O produces 0.440 g CO2 and 0.180 g H2O. If its molar mass is 60.0 g/mol, how many total atoms are in one molecular formula unit?',
    correctAnswer: 8,
    tolerance: 0.1,
    unit: 'atoms',
    explanation: 'Mass C = (12/44)×0.440 = 0.120 g (0.010 mol). Mass H = (2/18)×0.180 = 0.020 g (0.020 mol). Mass O = 0.300 - (0.120+0.020) = 0.160 g (0.010 mol). Empirical formula = CH2O (EF mass = 30). n = 60/30 = 2 => C2H4O2. Total atoms = 2 + 4 + 2 = 8 atoms.',
    hints: [
      'Find g and moles of C and H from CO2 and H2O.',
      'Subtract (g C + g H) from 0.300g to get g O.',
      'Find empirical formula (CH2O) and multiply by n=2 to get C2H4O2 -> 8 total atoms.'
    ]
  },
  {
    id: 'ch_18',
    nodeId: NODE_077,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Polyprotic Acid Back-Titration',
    question: 'A 0.500 g sample of impure Na2CO3 is titrated with 0.200 M HCl. If 40.00 mL of HCl is required to reach the methyl orange endpoint, calculate the percentage purity of Na2CO3 in the sample. (Molar mass Na2CO3 = 105.99 g/mol; Na2CO3 + 2HCl → 2NaCl + H2O + CO2)',
    correctAnswer: 84.8,
    tolerance: 0.5,
    unit: '%',
    explanation: 'Moles HCl = 0.200 M × 0.0400 L = 0.00800 mol. Moles pure Na2CO3 = 0.00800 / 2 = 0.00400 mol. Mass pure Na2CO3 = 0.00400 × 105.99 = 0.424 g. % purity = (0.424 / 0.500) × 100 = 84.8%.',
    hints: [
      'Calculate moles of HCl used: 0.200 × 0.0400 = 0.0080 mol.',
      'Stoichiometric mole ratio Na2CO3 : HCl = 1 : 2.',
      'Mass pure Na2CO3 = 0.0040 mol × 105.99 = 0.424 g. Calculate % purity.'
    ]
  },
  {
    id: 'ch_19',
    nodeId: NODE_075,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Multistep Yield Calculation',
    question: 'A multi-step reaction sequence has Step 1 yield = 80.0% and Step 2 yield = 75.0%. If you start with 1.00 mole of starting material, how many moles of final product are isolated?',
    correctAnswer: 0.60,
    tolerance: 0.02,
    unit: 'moles',
    explanation: 'Overall yield = 0.800 × 0.750 = 0.600 (60.0%). Final moles = 1.00 mol × 0.600 = 0.60 moles.',
    hints: [
      'Multiply step yields as decimal fractions.',
      'Overall fraction = 0.80 × 0.75.',
      'Multiply starting moles by overall fraction.'
    ]
  },
  {
    id: 'ch_20',
    nodeId: NODE_076,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Molality and Density Calculations',
    question: 'An aqueous solution of H2SO4 has a molarity of 3.00 M and a solution density of 1.20 g/mL. Calculate its molality (m) in mol/kg. (Molar mass H2SO4 = 98.08 g/mol)',
    correctAnswer: 3.31,
    tolerance: 0.05,
    unit: 'm',
    explanation: 'In 1 L (1000 mL) solution: Mass solution = 1000 mL × 1.20 g/mL = 1200 g. Solute mass = 3.00 mol × 98.08 = 294.24 g. Solvent mass = 1200 - 294.24 = 905.76 g = 0.9058 kg. Molality = 3.00 / 0.9058 = 3.31 m.',
    hints: [
      'Assume 1.00 L of solution = 1200 g total mass.',
      'Solute H2SO4 mass = 3.00 moles × 98.08 g/mol = 294.24 g.',
      'Solvent mass = 1200 - 294.24 = 905.76 g = 0.90576 kg. Molality = 3.00 / 0.90576.'
    ]
  },
  {
    id: 'ch_21',
    nodeId: NODE_078,
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Indicator Buffer Transition Analysis',
    question: 'Why is Methyl Orange (pH range 3.1 - 4.4) completely unsuitable for titrating weak acid acetic acid with strong base NaOH?',
    options: [
      'Methyl orange decomposes in the presence of sodium acetate salt',
      'Methyl orange changes color way before equivalence point (at pH ~3.8) during buffer region addition, resulting in huge titration error',
      'Methyl orange turns colorless and cannot be observed visually',
      'Weak acid absorbs methyl orange molecule'
    ],
    correctIndex: 1,
    explanation: 'The equivalence point pH of CH3COOH + NaOH is basic (~8.7). Methyl orange changes color at pH 3.1-4.4, which occurs early in the buffer region long before equivalence is reached!',
    hints: [
      'Compare equivalence pH (~8.7) with indicator range (3.1 - 4.4).',
      'The color change would occur prematurely during acid neutralization.',
      'This introduces a massive systematic titration error.'
    ]
  },
  {
    id: 'ch_22',
    nodeId: NODE_080,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Primary Standard Dilution Precision',
    question: 'How many grams of primary standard oxalic acid dihydrate (COOH)2·2H2O (Molar mass = 126.07 g/mol) are required to prepare 500.0 mL of exact 0.0500 M oxalic acid standard solution?',
    correctAnswer: 3.15,
    tolerance: 0.05,
    unit: 'g',
    explanation: 'Moles required = 0.0500 mol/L × 0.5000 L = 0.0250 mol. Mass = 0.0250 mol × 126.07 g/mol = 3.152 g.',
    hints: [
      'Moles = Molarity × Volume in Liters = 0.0500 × 0.5000.',
      'Mass = Moles × Molar mass of dihydrate (126.07 g/mol).',
      'Calculate mass in grams.'
    ]
  }
];

// -----------------------------------------------------------------------------
// SVG DIAGRAM COMPONENTS (3 Custom Chemistry Visuals)
// -----------------------------------------------------------------------------

// SVG 1: Volumetric Titration Apparatus Assembly
const TitrationSetupSVG: React.FC<{
  buretteVolume: number;
  flaskColor: string;
  isDropping: boolean;
}> = ({ buretteVolume, flaskColor, isDropping }) => {
  return (
    <svg viewBox="0 0 300 360" className="w-full h-auto max-h-[320px] rounded-lg border border-slate-700 bg-slate-900/90 shadow-inner">
      <defs>
        <linearGradient id="glassGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
          <stop offset="30%" stopColor="#ffffff" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id="liquidGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#0284c7" stopOpacity="0.9" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Retort Stand Base & Rod */}
      <rect x="40" y="320" width="160" height="12" rx="3" fill="#475569" stroke="#334155" strokeWidth="2" />
      <rect x="70" y="30" width="8" height="290" fill="#94a3b8" rx="2" />
      <path d="M 78 120 L 120 120 M 78 210 L 120 210" stroke="#64748b" strokeWidth="4" />

      {/* Burette Clamp */}
      <rect x="110" y="112" width="16" height="16" fill="#475569" rx="2" />
      <rect x="110" y="202" width="16" height="16" fill="#475569" rx="2" />

      {/* Burette Tube */}
      <rect x="122" y="30" width="16" height="210" fill="url(#glassGrad)" stroke="#cbd5e1" strokeWidth="1.5" rx="1" />
      
      {/* Liquid inside Burette */}
      {buretteVolume > 0 && (
        <rect
          x="124"
          y={32 + (50 - buretteVolume) * 3.4}
          width="12"
          height={buretteVolume * 3.4}
          fill="url(#liquidGrad)"
        />
      )}

      {/* Burette Graduation Marks */}
      {[0, 10, 20, 30, 40, 50].map((mark, i) => (
        <g key={i}>
          <line x1="134" y1={35 + i * 34} x2="138" y2={35 + i * 34} stroke="#cbd5e1" strokeWidth="1" />
          <text x="142" y={38 + i * 34} fill="#94a3b8" fontSize="8" fontFamily="monospace">{mark}</text>
        </g>
      ))}

      {/* Stopcock valve */}
      <ellipse cx="130" cy="245" rx="6" ry="4" fill="#ef4444" />
      <line x1="130" y1="240" x2="130" y2="255" stroke="#cbd5e1" strokeWidth="2" />

      {/* Falling Drop Animation */}
      {isDropping && (
        <circle cx="130" cy="270" r="3" fill="#38bdf8" filter="url(#glow)">
          <animate attributeName="cy" from="255" to="285" dur="0.4s" repeatCount="indefinite" />
          <animate attributeName="opacity" from="1" to="0.2" dur="0.4s" repeatCount="indefinite" />
        </circle>
      )}

      {/* Erlenmeyer Flask */}
      <path
        d="M 120 280 L 140 280 L 140 290 L 165 320 L 95 320 L 120 290 Z"
        fill="url(#glassGrad)"
        stroke="#e2e8f0"
        strokeWidth="1.5"
      />
      {/* Liquid in Flask */}
      <path
        d="M 100 318 L 160 318 L 152 300 L 108 300 Z"
        fill={flaskColor}
        opacity="0.85"
        className="transition-colors duration-300"
      />

      {/* Labels */}
      <text x="155" y="45" fill="#38bdf8" fontSize="10" fontWeight="bold">Burette (0.1 M NaOH)</text>
      <text x="170" y="310" fill="#f43f5e" fontSize="10" fontWeight="bold">Analyte + Indicator</text>
    </svg>
  );
};

// SVG 2: Gravimetric Crucible & Desiccator Assembly
const GravimetricCrucibleSVG: React.FC<{
  heatingCycle: number;
  temp: number;
  isDesiccator: boolean;
}> = ({ heatingCycle, temp, isDesiccator }) => {
  return (
    <svg viewBox="0 0 300 220" className="w-full h-auto max-h-[220px] rounded-lg border border-slate-700 bg-slate-900/90 p-2 shadow-inner">
      <defs>
        <radialGradient id="heatGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f97316" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Background Apparatus Toggle: Muffle Furnace / Bunsen vs Desiccator */}
      {!isDesiccator ? (
        <g>
          {/* Muffle Furnace / Tripod Stand */}
          <path d="M 80 180 L 110 130 L 190 130 L 220 180" stroke="#64748b" strokeWidth="3" fill="none" />
          <line x1="100" y1="130" x2="200" y2="130" stroke="#94a3b8" strokeWidth="3" />
          {/* Pipeclay triangle */}
          <polygon points="120,130 180,130 150,110" fill="none" stroke="#e2e8f0" strokeWidth="2" />
          {/* Crucible */}
          <path d="M 130 100 L 170 100 L 165 125 C 160 130, 140 130, 135 125 Z" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1.5" />
          {/* Crucible Lid */}
          <path d="M 125 100 Q 150 94 175 100" fill="none" stroke="#cbd5e1" strokeWidth="3" />

          {/* Precipitate Inside */}
          <ellipse cx="150" cy="120" rx="10" ry="3" fill="#f8fafc" />

          {/* Bunsen Burner Flame */}
          {temp > 100 && (
            <g>
              <path d="M 140 180 Q 150 135 160 180 Z" fill="#38bdf8" opacity="0.8" />
              <path d="M 145 180 Q 150 145 155 180 Z" fill="#f59e0b" opacity="0.9" />
              <circle cx="150" cy="140" r="30" fill="url(#heatGlow)" />
            </g>
          )}
          <text x="150" y="200" textAnchor="middle" fill="#f97316" fontSize="11" fontWeight="bold">
            Heating Cycle #{heatingCycle} ({temp}°C)
          </text>
        </g>
      ) : (
        <g>
          {/* Desiccator Vessel */}
          <path d="M 70 60 C 70 30, 230 30, 230 60 L 220 170 C 220 190, 80 190, 80 170 Z" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" opacity="0.8" />
          <line x1="75" y1="130" x2="225" y2="130" stroke="#64748b" strokeWidth="2" strokeDasharray="4 2" />
          {/* Desiccant pellets (CaCl2) */}
          {[90, 110, 130, 150, 170, 190, 200, 100, 140, 180].map((x, idx) => (
            <circle key={idx} cx={x} cy={155 + (idx % 3) * 5} r="4" fill="#93c5fd" />
          ))}
          {/* Crucible inside Desiccator */}
          <path d="M 130 90 L 170 90 L 165 115 C 160 120, 140 120, 135 115 Z" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1.5" />
          <text x="150" y="205" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">
            Cooling in Desiccator (Anhydrous atmosphere)
          </text>
        </g>
      )}
    </svg>
  );
};

// SVG 3: Titration Curve & Indicator Transition Graph
const TitrationCurveGraphSVG: React.FC<{
  titrantVolume: number;
  curveType: 'strong-strong' | 'weak-strong';
}> = ({ titrantVolume, curveType }) => {
  // Generate curve path dynamically
  const generatePath = () => {
    const points: string[] = [];
    for (let v = 0; v <= 50; v += 1) {
      let ph = 1.0;
      if (curveType === 'strong-strong') {
        if (v < 24.5) {
          ph = 1.0 + (v / 25) * 1.5;
        } else if (v >= 24.5 && v <= 25.5) {
          ph = 1.0 + (v - 24.5) * 10.0 + 1.5;
        } else {
          ph = 11.5 + ((v - 25.5) / 25) * 2.0;
        }
      } else {
        // Weak acid (CH3COOH) vs Strong base (NaOH)
        if (v < 24.5) {
          ph = 2.8 + Math.log10(v + 0.1) * 1.5;
        } else if (v >= 24.5 && v <= 25.5) {
          ph = 6.0 + (v - 24.5) * 6.0;
        } else {
          ph = 11.8 + ((v - 25.5) / 25) * 1.8;
        }
      }
      ph = Math.min(14, Math.max(0, ph));
      // Map v (0..50) -> x (40..270), ph (0..14) -> y (180..20)
      const x = 40 + (v / 50) * 230;
      const y = 180 - (ph / 14) * 160;
      points.push(`${v === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`);
    }
    return points.join(' ');
  };

  // Current dot position
  const currentPh = useMemo(() => {
    const v = titrantVolume;
    if (curveType === 'strong-strong') {
      if (v < 24.5) return 1.0 + (v / 25) * 1.5;
      if (v <= 25.5) return 1.0 + (v - 24.5) * 10.0 + 1.5;
      return 11.5 + ((v - 25.5) / 25) * 2.0;
    } else {
      if (v < 24.5) return 2.8 + Math.log10(v + 0.1) * 1.5;
      if (v <= 25.5) return 6.0 + (v - 24.5) * 6.0;
      return 11.8 + ((v - 25.5) / 25) * 1.8;
    }
  }, [titrantVolume, curveType]);

  const dotX = 40 + (titrantVolume / 50) * 230;
  const dotY = 180 - (Math.min(14, Math.max(0, currentPh)) / 14) * 160;

  return (
    <svg viewBox="0 0 300 210" className="w-full h-auto max-h-[210px] rounded-lg border border-slate-700 bg-slate-950 p-2 shadow-inner">
      {/* Background pH Indicator Bands */}
      {/* Phenolphthalein (8.2 - 10.0) */}
      <rect x="40" y={180 - (10 / 14) * 160} width="230" height={(1.8 / 14) * 160} fill="#f43f5e" opacity="0.15" />
      <text x="265" y={180 - (9 / 14) * 160} fill="#f43f5e" fontSize="7" textAnchor="end">Phenolphthalein</text>

      {/* Methyl Orange (3.1 - 4.4) */}
      <rect x="40" y={180 - (4.4 / 14) * 160} width="230" height={(1.3 / 14) * 160} fill="#f97316" opacity="0.15" />
      <text x="265" y={180 - (3.7 / 14) * 160} fill="#f97316" fontSize="7" textAnchor="end">Methyl Orange</text>

      {/* Axes */}
      <line x1="40" y1="180" x2="270" y2="180" stroke="#64748b" strokeWidth="1.5" />
      <line x1="40" y1="20" x2="40" y2="180" stroke="#64748b" strokeWidth="1.5" />

      {/* Grid Lines & Labels */}
      {[0, 7, 14].map((ph) => (
        <g key={ph}>
          <line x1="36" y1={180 - (ph / 14) * 160} x2="270" y2={180 - (ph / 14) * 160} stroke="#334155" strokeDasharray="2 2" />
          <text x="32" y={183 - (ph / 14) * 160} fill="#94a3b8" fontSize="8" textAnchor="end">{ph}</text>
        </g>
      ))}

      {[0, 25, 50].map((v) => (
        <g key={v}>
          <line x1={40 + (v / 50) * 230} y1="180" x2={40 + (v / 50) * 230} y2="184" stroke="#64748b" />
          <text x={40 + (v / 50) * 230} y="194" fill="#94a3b8" fontSize="8" textAnchor="middle">{v} mL</text>
        </g>
      ))}

      {/* Curve Path */}
      <path d={generatePath()} fill="none" stroke="#38bdf8" strokeWidth="2.5" />

      {/* Current Position Dot */}
      <circle cx={dotX} cy={dotY} r="5" fill="#facc15" stroke="#ffffff" strokeWidth="1.5" />

      {/* Title & Coordinates */}
      <text x="150" y="15" fill="#e2e8f0" fontSize="9" fontWeight="bold" textAnchor="middle">
        pH Curve: Vol NaOH vs pH (Current pH: {currentPh.toFixed(2)})
      </text>
    </svg>
  );
};

// -----------------------------------------------------------------------------
// MAIN COMPONENT
// -----------------------------------------------------------------------------
export default function C11_ChemistryQuantitativeanalysisSim({
  onComplete
}: {
  onComplete?: (score: number) => void;
}) {
  // --- STATE MANAGEMENT ---
  const [activeTab, setActiveTab] = useState<TabType>('discovery');
  const [selectedLabIndex, setSelectedLabIndex] = useState<number>(0);
  
  // Feedback components state
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [sparklePos, setSparklePos] = useState<{ x: number; y: number }>({ x: 400, y: 300 });
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHint, setCurrentHint] = useState<string>('');

  // Discovery tab states
  const [discoverySelectedOpt, setDiscoverySelectedOpt] = useState<number | null>(null);
  const [discoveryAnswered, setDiscoveryAnswered] = useState<boolean>(false);
  const [predictionAnswers, setPredictionAnswers] = useState<Record<number, number>>({});
  const [observationAnswers, setObservationAnswers] = useState<Record<number, number>>({});

  // Challenge engine states
  const [currentChallengeIdx, setCurrentChallengeIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [numericInput, setNumericInput] = useState<string>('');
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [challengeScore, setChallengeScore] = useState<number>(0);
  const [hintCount, setHintCount] = useState<number>(0);

  // SRS & BKT Tracker State
  const [bktStates, setBktStates] = useState<Record<string, BKTState>>(() => {
    const initial: Record<string, BKTState> = {};
    ALL_NODE_IDS.forEach((id) => {
      initial[id] = createBKTState();
    });
    return initial;
  });

  const [srsItems, setSrsItems] = useState<Record<string, ReviewItem>>(() => {
    const initial: Record<string, ReviewItem> = {};
    CHALLENGES.forEach((ch) => {
      initial[ch.id] = createReviewItem(ch.id);
    });
    return initial;
  });

  // --- INTERACTIVE LABS STATE ---
  // Lab 1: Titration
  const [titrantVol, setTitrantVol] = useState<number>(0.0);
  const [isDropping, setIsDropping] = useState<boolean>(false);
  const [titrationType, setTitrationType] = useState<'strong-strong' | 'weak-strong'>('strong-strong');
  const [selectedIndicator, setSelectedIndicator] = useState<'phenolphthalein' | 'methyl-orange'>('phenolphthalein');

  // Lab 2: Gravimetric Analysis
  const [gravCycle, setGravCycle] = useState<number>(1);
  const [crucibleTemp, setCrucibleTemp] = useState<number>(25);
  const [isDesiccator, setIsDesiccator] = useState<boolean>(false);
  const [gravMasses, setGravMasses] = useState<number[]>([15.420, 15.280, 15.245, 15.244]);

  // Lab 3: Limiting Reactant Visualizer
  const [molesN2, setMolesN2] = useState<number>(2.0);
  const [molesH2, setMolesH2] = useState<number>(5.0);

  // Lab 4: Formula Builder
  const [percentC, setPercentC] = useState<number>(40.0);
  const [percentH, setPercentH] = useState<number>(6.7);
  const [percentO, setPercentO] = useState<number>(53.3);
  const [molarMassInput, setMolarMassInput] = useState<number>(180);

  // Lab 5: Primary Standard Solution Preparation
  const [soluteMassG, setSoluteMassG] = useState<number>(2.65); // Na2CO3
  const [solutionVolMl, setSolutionVolMl] = useState<number>(250);

  // Auto Hint Idle Timer Ref
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);

  // --- AUDIO & VOICE TRIGGERS ---
  const triggerAudio = useCallback((type: SoundEffect) => {
    try {
      audioManager.play(type);
    } catch {
      // Audio fallback
    }
  }, []);

  const speak = useCallback((text: string) => {
    try {
      speechManager.speak(text);
    } catch {
      // Speech fallback
    }
  }, []);

  // Idle timer setup
  const resetIdleTimer = useCallback(() => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => {
      if (!isAnswerSubmitted && activeTab === 'challenges') {
        const curCh = CHALLENGES[currentChallengeIdx];
        if (curCh) {
          setCurrentHint(curCh.hints[0]);
          setShowHint(true);
          triggerAudio('hint');
        }
      }
    }, 12000);
  }, [isAnswerSubmitted, activeTab, currentChallengeIdx, triggerAudio]);

  useEffect(() => {
    resetIdleTimer();
    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [currentChallengeIdx, activeTab, resetIdleTimer]);

  // Titration auto drop animation
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isDropping && titrantVol < 50.0) {
      interval = setInterval(() => {
        setTitrantVol((prev) => {
          const next = Math.min(50.0, prev + 0.2);
          if (next >= 50.0) setIsDropping(false);
          return parseFloat(next.toFixed(1));
        });
      }, 100);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isDropping, titrantVol]);

  // Derived indicator color calculation for Titration Lab
  const flaskColor = useMemo(() => {
    // Current pH calculation
    let ph = 1.0;
    if (titrationType === 'strong-strong') {
      if (titrantVol < 24.5) ph = 1.0 + (titrantVol / 25) * 1.5;
      else if (titrantVol <= 25.5) ph = 1.0 + (titrantVol - 24.5) * 10.0 + 1.5;
      else ph = 11.5 + ((titrantVol - 25.5) / 25) * 2.0;
    } else {
      if (titrantVol < 24.5) ph = 2.8 + Math.log10(titrantVol + 0.1) * 1.5;
      else if (titrantVol <= 25.5) ph = 6.0 + (titrantVol - 24.5) * 6.0;
      else ph = 11.8 + ((titrantVol - 25.5) / 25) * 1.8;
    }

    if (selectedIndicator === 'phenolphthalein') {
      if (ph < 8.2) return 'rgba(255, 255, 255, 0.2)'; // Colorless
      if (ph <= 10.0) return 'rgba(244, 63, 94, 0.65)'; // Light Pink / Magenta
      return 'rgba(225, 29, 72, 0.9)'; // Deep Magenta
    } else {
      // Methyl Orange
      if (ph < 3.1) return 'rgba(239, 68, 68, 0.85)'; // Red
      if (ph <= 4.4) return 'rgba(249, 115, 22, 0.85)'; // Orange
      return 'rgba(234, 179, 8, 0.85)'; // Yellow
    }
  }, [titrationType, titrantVol, selectedIndicator]);

  // Derived Limiting Reactant Calculation: N2 + 3H2 -> 2NH3
  const limitingReactantCalc = useMemo(() => {
    const ratioN2 = molesN2 / 1;
    const ratioH2 = molesH2 / 3;
    const isN2Limiting = ratioN2 < ratioH2;
    const maxNH3 = isN2Limiting ? molesN2 * 2 : (molesH2 / 3) * 2;
    const excessN2 = isN2Limiting ? 0 : molesN2 - (molesH2 / 3);
    const excessH2 = isN2Limiting ? molesH2 - molesN2 * 3 : 0;

    return {
      limiting: isN2Limiting ? 'Nitrogen (N₂)' : 'Hydrogen (H₂)',
      maxNH3: maxNH3.toFixed(2),
      excessN2: excessN2.toFixed(2),
      excessH2: excessH2.toFixed(2)
    };
  }, [molesN2, molesH2]);

  // Derived Empirical & Molecular Formula Calculation
  const formulaCalc = useMemo(() => {
    const molesC = percentC / 12.011;
    const molesH = percentH / 1.008;
    const molesO = percentO / 15.999;
    const minMoles = Math.min(molesC, molesH, molesO) || 1;

    const ratioC = Math.round(molesC / minMoles);
    const ratioH = Math.round(molesH / minMoles);
    const ratioO = Math.round(molesO / minMoles);

    const empFormulaMass = ratioC * 12.011 + ratioH * 1.008 + ratioO * 15.999;
    const multiplier = Math.max(1, Math.round(molarMassInput / empFormulaMass));

    return {
      empirical: `C${ratioC > 1 ? ratioC : ''}H${ratioH > 1 ? ratioH : ''}O${ratioO > 1 ? ratioO : ''}`,
      molecular: `C${ratioC * multiplier}H${ratioH * multiplier}O${ratioO * multiplier}`,
      empMass: empFormulaMass.toFixed(2),
      multiplier
    };
  }, [percentC, percentH, percentO, molarMassInput]);

  // Derived Solution Molarity/Normality Calculation (Na2CO3)
  const solutionCalc = useMemo(() => {
    const molarMass = 105.99; // Na2CO3
    const moles = soluteMassG / molarMass;
    const volL = solutionVolMl / 1000;
    const molarity = moles / volL;
    const normality = molarity * 2; // n-factor for Na2CO3 neutralisation = 2

    return {
      molarity: molarity.toFixed(4),
      normality: normality.toFixed(4),
      moles: moles.toFixed(4)
    };
  }, [soluteMassG, solutionVolMl]);

  // --- HANDLERS ---
  const handleDiscoverySubmit = (optIndex: number) => {
    setDiscoverySelectedOpt(optIndex);
    setDiscoveryAnswered(true);
    if (optIndex === DISCOVERY_QUESTION.correctIndex) {
      triggerAudio('celebration');
      speak('Spot on! Neutralization is strictly a mole-counting process. Dilution does not alter the absolute moles of analyte.');
      setShowSparkle(true);
    } else {
      triggerAudio('error');
      speak('Not quite. Remember that titration counts total moles of analyte in solution.');
    }
  };

  const handleChallengeSubmit = () => {
    const curCh = CHALLENGES[currentChallengeIdx];
    if (!curCh || isAnswerSubmitted) return;

    let isCorrect = false;
    if (curCh.type === 'mcq') {
      isCorrect = selectedOption === curCh.correctIndex;
    } else if (curCh.type === 'numeric') {
      const parsed = parseFloat(numericInput);
      if (!isNaN(parsed) && curCh.correctAnswer !== undefined) {
        const tol = curCh.tolerance || 0.05;
        isCorrect = Math.abs(parsed - curCh.correctAnswer) <= tol;
      }
    }

    setIsAnswerSubmitted(true);

    // BKT & SRS Updates
    const updatedBKT = bktUpdate(bktStates[curCh.nodeId] || createBKTState(), isCorrect);
    setBktStates((prev) => ({ ...prev, [curCh.nodeId]: updatedBKT }));

    const updatedSRS = sm2Update(srsItems[curCh.id] || createReviewItem(curCh.id), isCorrect ? 5 : 1);
    setSrsItems((prev) => ({ ...prev, [curCh.id]: updatedSRS }));

    if (isCorrect) {
      triggerAudio('success');
      speak('Excellent response! Your quantitative calculation is exact.');
      setChallengeScore((prev) => prev + (curCh.difficulty === 'advanced' ? 15 : curCh.difficulty === 'standard' ? 10 : 5));
      setShowSparkle(true);
    } else {
      triggerAudio('error');
      speak('Incorrect. Review the formula and stoichiometric coefficients.');
    }
  };

  const handleNextChallenge = () => {
    if (currentChallengeIdx < CHALLENGES.length - 1) {
      setCurrentChallengeIdx((prev) => prev + 1);
      setSelectedOption(null);
      setNumericInput('');
      setIsAnswerSubmitted(false);
      setShowHint(false);
      triggerAudio('tap');
    } else {
      // Completed all challenges
      triggerAudio('celebration');
      setShowConfetti(true);
      setShowSuccess(true);
      speak('Congratulations! You have completed all quantitative chemistry challenges.');
      const totalScore = challengeScore + 50;
      if (onComplete) onComplete(totalScore);
      recordGameScore('c11_chem_quantitative_analysis', totalScore);
    }
  };

  // --- RENDER METHODS ---
  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 font-sans p-4 md:p-8 flex flex-col items-center">
      {/* HEADER SECTION */}
      <header className="w-full max-w-6xl mb-6 bg-slate-900/80 backdrop-blur border border-slate-800 rounded-2xl p-6 shadow-2xl flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-gold-500/20 text-gold-400 border border-gold-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
              ISC Chemistry Class 11
            </span>
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
              Quantitative Analysis
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gold-400 via-gold-300 to-gold-400 mt-2">
            {SCENARIO.title}
          </h1>
          <p className="text-slate-400 text-sm mt-1 max-w-2xl">{SCENARIO.intro}</p>
        </div>

        {/* Score & Master Badge */}
        <div className="flex items-center gap-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
          <div className="text-right">
            <div className="text-xs text-slate-400 uppercase tracking-widest font-semibold">Laboratory Score</div>
            <div className="text-2xl font-black text-amber-400">{challengeScore} PTS</div>
          </div>
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 p-0.5 flex items-center justify-center shadow-lg shadow-amber-500/20">
            <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center">
              <span className="text-xl">🧪</span>
            </div>
          </div>
        </div>
      </header>

      {/* NAVIGATION TABS */}
      <nav className="w-full max-w-6xl flex bg-slate-900/90 rounded-xl p-1.5 border border-slate-800 mb-6 gap-2">
        {[
          { id: 'discovery', label: '1. Discovery & Setup', icon: '💡' },
          { id: 'lab', label: '2. Interactive Lab Engine', icon: '🔬' },
          { id: 'challenges', label: '3. Quantitative Challenges', icon: '🎯' },
          { id: 'summary', label: '4. Quality Control Protocol', icon: '📋' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id as TabType);
              triggerAudio('tap');
            }}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-white shadow-lg shadow-gold-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>

      {/* MAIN CONTENT AREA */}
      <main className="w-full max-w-6xl bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur">
        {/* TAB 1: DISCOVERY & PREDICTIONS */}
        {activeTab === 'discovery' && (
          <div className="space-y-8">
            {/* Scenario Context */}
            <div className="bg-gradient-to-r from-slate-900 to-gold-950/40 p-6 rounded-xl border border-gold-500/20">
              <h2 className="text-xl font-bold text-gold-300 mb-2 flex items-center gap-2">
                <span>📘</span> Experimental Context & Analytical Scope
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">{SCENARIO.context}</p>
            </div>

            {/* Counterintuitive Discovery Question */}
            <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
              <span className="text-xs font-bold text-amber-400 tracking-wider uppercase">Initial Concept Check</span>
              <h3 className="text-lg font-semibold text-slate-100 mt-1 mb-4">{DISCOVERY_QUESTION.question}</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {DISCOVERY_QUESTION.options.map((opt, idx) => {
                  let btnStyle = 'bg-slate-800/80 hover:bg-slate-700/80 border-slate-700 text-slate-200';
                  if (discoveryAnswered) {
                    if (idx === DISCOVERY_QUESTION.correctIndex) {
                      btnStyle = 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300 font-bold';
                    } else if (idx === discoverySelectedOpt) {
                      btnStyle = 'bg-rose-500/20 border-rose-500/50 text-rose-300';
                    }
                  }
                  return (
                    <button
                      key={idx}
                      disabled={discoveryAnswered}
                      onClick={() => handleDiscoverySubmit(idx)}
                      className={`p-4 rounded-xl border text-left text-sm transition-all duration-200 ${btnStyle}`}
                    >
                      <span className="font-mono mr-2 text-gold-400">[{String.fromCharCode(65 + idx)}]</span> {opt}
                    </button>
                  );
                })}
              </div>

              {discoveryAnswered && (
                <div className="mt-4 p-4 bg-gold-950/40 border border-gold-800/50 rounded-xl text-gold-200 text-sm">
                  <span className="font-bold text-gold-400">Analyst Insights: </span>
                  {DISCOVERY_QUESTION.hintAfter}
                </div>
              )}
            </div>

            {/* MANDATORY PREDICTION QUESTIONS */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gold-400 flex items-center gap-2">
                <span>🔮</span> Predictive Hypotheses (Syllabus Concepts)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {PREDICTION_QUESTIONS.map((pred, pIdx) => (
                  <div key={pIdx} className="bg-slate-900/90 p-5 rounded-xl border border-slate-800 flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-mono text-gold-400">Prediction Hypothesis #{pIdx + 1}</span>
                      <p className="text-sm font-semibold text-slate-200 mt-2 mb-4">{pred.question}</p>
                      <div className="space-y-2">
                        {pred.options.map((opt, optIdx) => {
                          const isSel = predictionAnswers[pIdx] === optIdx;
                          const isCorrect = optIdx === pred.correctIndex;
                          let style = 'bg-slate-800 border-slate-700 text-slate-300';
                          if (predictionAnswers[pIdx] !== undefined) {
                            if (isCorrect) style = 'bg-emerald-500/20 border-emerald-500 text-emerald-300';
                            else if (isSel) style = 'bg-rose-500/20 border-rose-500 text-rose-300';
                          }
                          return (
                            <button
                              key={optIdx}
                              onClick={() => {
                                setPredictionAnswers((prev) => ({ ...prev, [pIdx]: optIdx }));
                                triggerAudio('pop');
                              }}
                              className={`w-full text-left p-3 rounded-lg border text-xs transition-all ${style}`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    {predictionAnswers[pIdx] !== undefined && (
                      <div className="mt-3 p-2 bg-slate-950 rounded border border-slate-800 text-xs text-amber-300 font-mono">
                         Verification Hint: {pred.verifyInstruction}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: INTERACTIVE LAB ENGINE */}
        {activeTab === 'lab' && (
          <div className="space-y-6">
            {/* Exploration Steps Lab Selector Tabs */}
            <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-4">
              {EXPLORATION_STEPS.map((lab, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedLabIndex(idx);
                    triggerAudio('tap');
                  }}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    selectedLabIndex === idx
                      ? 'bg-gold-500 text-slate-950 shadow-md shadow-gold-500/20'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {lab.title.split(':')[0]}
                </button>
              ))}
            </div>

            {/* Instruction Banner */}
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl flex items-start gap-3">
              <span className="text-2xl">💡</span>
              <div>
                <h4 className="text-sm font-bold text-gold-400">{EXPLORATION_STEPS[selectedLabIndex].title}</h4>
                <p className="text-xs text-slate-300 mt-0.5">{EXPLORATION_STEPS[selectedLabIndex].instruction}</p>
              </div>
            </div>

            {/* LAB 1: VOLUMETRIC TITRATION ENGINE */}
            {selectedLabIndex === 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-slate-900/80 p-5 rounded-xl border border-slate-800 flex flex-col items-center">
                  <TitrationSetupSVG
                    buretteVolume={50.0 - titrantVol}
                    flaskColor={flaskColor}
                    isDropping={isDropping}
                  />

                  {/* Controls */}
                  <div className="w-full mt-4 space-y-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setTitrantVol((prev) => Math.min(50.0, parseFloat((prev + 0.5).toFixed(1))));
                          triggerAudio('pop');
                        }}
                        className="flex-1 py-2 bg-gold-600 hover:bg-gold-500 text-white rounded-lg font-bold text-xs shadow"
                      >
                        +0.5 mL Titrant
                      </button>
                      <button
                        onClick={() => {
                          setIsDropping(!isDropping);
                          triggerAudio('tap');
                        }}
                        className={`flex-1 py-2 rounded-lg font-bold text-xs shadow transition-all ${
                          isDropping ? 'bg-amber-600 hover:bg-amber-500 text-white' : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                        }`}
                      >
                        {isDropping ? 'Pause Burette Valve' : 'Auto Dropwise Titrate'}
                      </button>
                      <button
                        onClick={() => {
                          setTitrantVol(0.0);
                          setIsDropping(false);
                          triggerAudio('chime');
                        }}
                        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg font-bold text-xs"
                      >
                        Reset
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="text-slate-400 block mb-1">Titration System:</label>
                        <select
                          value={titrationType}
                          onChange={(e) => setTitrationType(e.target.value as 'strong-strong' | 'weak-strong')}
                          className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-gold-300"
                        >
                          <option value="strong-strong">HCl (Strong) + NaOH (Strong)</option>
                          <option value="weak-strong">CH3COOH (Weak) + NaOH (Strong)</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-slate-400 block mb-1">Indicator Selected:</label>
                        <select
                          value={selectedIndicator}
                          onChange={(e) => setSelectedIndicator(e.target.value as 'phenolphthalein' | 'methyl-orange')}
                          className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-amber-300"
                        >
                          <option value="phenolphthalein">Phenolphthalein (pH 8.2-10.0)</option>
                          <option value="methyl-orange">Methyl Orange (pH 3.1-4.4)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Graph & Dynamic Calculations */}
                <div className="bg-slate-900/80 p-5 rounded-xl border border-slate-800 flex flex-col justify-between">
                  <TitrationCurveGraphSVG titrantVolume={titrantVol} curveType={titrationType} />

                  <div className="mt-4 p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs font-mono">
                    <div className="flex justify-between border-b border-slate-800 pb-1">
                      <span className="text-slate-400">Total NaOH Added:</span>
                      <span className="text-gold-400 font-bold">{titrantVol.toFixed(1)} mL</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800 pb-1">
                      <span className="text-slate-400">Equivalence Point Target:</span>
                      <span className="text-emerald-400 font-bold">25.0 mL</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800 pb-1">
                      <span className="text-slate-400">Calculated Titration Error:</span>
                      <span className={Math.abs(titrantVol - 25.0) < 0.5 ? 'text-emerald-400' : 'text-amber-400'}>
                        {Math.abs(titrantVol - 25.0).toFixed(1)} mL
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* LAB 2: GRAVIMETRIC ANALYSIS ENGINE */}
            {selectedLabIndex === 1 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-slate-900/80 p-5 rounded-xl border border-slate-800 flex flex-col items-center">
                  <GravimetricCrucibleSVG
                    heatingCycle={gravCycle}
                    temp={crucibleTemp}
                    isDesiccator={isDesiccator}
                  />

                  <div className="w-full mt-4 space-y-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setIsDesiccator(false);
                          setCrucibleTemp(800);
                          triggerAudio('pop');
                        }}
                        className="flex-1 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg font-bold text-xs shadow"
                      >
                        Ignite Crucible (800°C)
                      </button>
                      <button
                        onClick={() => {
                          setIsDesiccator(true);
                          setCrucibleTemp(25);
                          triggerAudio('chime');
                        }}
                        className="flex-1 py-2 bg-gold-600 hover:bg-gold-500 text-white rounded-lg font-bold text-xs shadow"
                      >
                        Transfer to Desiccator
                      </button>
                      <button
                        onClick={() => {
                          if (gravCycle < gravMasses.length) setGravCycle((prev) => prev + 1);
                          triggerAudio('count');
                        }}
                        className="px-3 py-2 bg-gold-600 hover:bg-gold-500 text-white rounded-lg font-bold text-xs"
                      >
                        Next Cycle
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900/80 p-5 rounded-xl border border-slate-800 flex flex-col justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-gold-400 mb-3">Constant Mass Protocol Log</h4>
                    <div className="space-y-2">
                      {gravMasses.slice(0, gravCycle).map((mass, idx) => (
                        <div key={idx} className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex justify-between items-center text-xs font-mono">
                          <span className="text-slate-400">Heating Cycle #{idx + 1} (Post-Desiccator):</span>
                          <span className="text-emerald-400 font-bold">{mass.toFixed(3)} g</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-emerald-950/30 border border-emerald-800/50 rounded-xl text-xs text-emerald-200 mt-4">
                    <span className="font-bold text-emerald-400">Constant Mass Rule: </span>
                    Successive weighings must agree within ±0.001 g. At Cycle #4 (15.244 g vs 15.245 g), constant dry weight is achieved!
                  </div>
                </div>
              </div>
            )}

            {/* LAB 3: LIMITING REACTANT ENGINE */}
            {selectedLabIndex === 2 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-slate-900/80 p-5 rounded-xl border border-slate-800 space-y-4">
                  <h4 className="text-sm font-bold text-gold-400">Haber Process Synthesizer: N₂ + 3H₂ → 2NH₃</h4>

                  <div>
                    <label className="text-xs text-slate-300 block mb-1">
                      Nitrogen (N₂) Moles: <span className="text-gold-400 font-bold">{molesN2} mol</span>
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      step="0.5"
                      value={molesN2}
                      onChange={(e) => setMolesN2(parseFloat(e.target.value))}
                      className="w-full accent-gold-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-300 block mb-1">
                      Hydrogen (H₂) Moles: <span className="text-amber-400 font-bold">{molesH2} mol</span>
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="15"
                      step="0.5"
                      value={molesH2}
                      onChange={(e) => setMolesH2(parseFloat(e.target.value))}
                      className="w-full accent-amber-500"
                    />
                  </div>

                  {/* Atom visualizer simulation */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-wrap gap-2 items-center justify-center min-h-[100px]">
                    {/* Render N2 molecules */}
                    {Array.from({ length: Math.round(molesN2) }).map((_, i) => (
                      <div key={`n2-${i}`} className="flex items-center bg-gold-950 border border-gold-500/50 px-2 py-1 rounded-full text-xs text-gold-300 font-mono">
                        N≡N
                      </div>
                    ))}
                    {/* Render H2 molecules */}
                    {Array.from({ length: Math.round(molesH2) }).map((_, i) => (
                      <div key={`h2-${i}`} className="flex items-center bg-amber-950 border border-amber-500/50 px-2 py-1 rounded-full text-xs text-amber-300 font-mono">
                        H-H
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-900/80 p-5 rounded-xl border border-slate-800 flex flex-col justify-between">
                  <div className="space-y-3 font-mono text-xs">
                    <h4 className="text-sm font-bold text-gold-400 font-sans">Stoichiometric Yield Output</h4>
                    <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex justify-between">
                      <span className="text-slate-400">Limiting Reagent:</span>
                      <span className="text-rose-400 font-bold">{limitingReactantCalc.limiting}</span>
                    </div>
                    <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex justify-between">
                      <span className="text-slate-400">Theoretical Yield of NH₃:</span>
                      <span className="text-emerald-400 font-bold">{limitingReactantCalc.maxNH3} moles</span>
                    </div>
                    <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex justify-between">
                      <span className="text-slate-400">Unreacted Excess N₂:</span>
                      <span className="text-gold-300">{limitingReactantCalc.excessN2} moles</span>
                    </div>
                    <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex justify-between">
                      <span className="text-slate-400">Unreacted Excess H₂:</span>
                      <span className="text-amber-300">{limitingReactantCalc.excessH2} moles</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* LAB 4: FORMULA DETERMINATION ENGINE */}
            {selectedLabIndex === 3 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-slate-900/80 p-5 rounded-xl border border-slate-800 space-y-4">
                  <h4 className="text-sm font-bold text-gold-400">Combustion Analysis Mass Percentages</h4>

                  <div className="grid grid-cols-3 gap-3 text-xs">
                    <div>
                      <label className="text-slate-400 block mb-1">% Carbon (C):</label>
                      <input
                        type="number"
                        value={percentC}
                        onChange={(e) => setPercentC(parseFloat(e.target.value) || 0)}
                        className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-gold-300 font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-slate-400 block mb-1">% Hydrogen (H):</label>
                      <input
                        type="number"
                        value={percentH}
                        onChange={(e) => setPercentH(parseFloat(e.target.value) || 0)}
                        className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-gold-300 font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-slate-400 block mb-1">% Oxygen (O):</label>
                      <input
                        type="number"
                        value={percentO}
                        onChange={(e) => setPercentO(parseFloat(e.target.value) || 0)}
                        className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-gold-300 font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-slate-300 block mb-1">
                      Experimental Molar Mass: <span className="text-amber-400 font-bold">{molarMassInput} g/mol</span>
                    </label>
                    <input
                      type="range"
                      min="30"
                      max="300"
                      step="30"
                      value={molarMassInput}
                      onChange={(e) => setMolarMassInput(parseInt(e.target.value))}
                      className="w-full accent-amber-500"
                    />
                  </div>
                </div>

                <div className="bg-slate-900/80 p-5 rounded-xl border border-slate-800 flex flex-col justify-between font-mono text-xs">
                  <div className="space-y-3">
                    <h4 className="text-sm font-bold text-gold-400 font-sans">Formula Deduction Output</h4>
                    <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex justify-between">
                      <span className="text-slate-400">Empirical Formula:</span>
                      <span className="text-gold-400 font-bold text-base">{formulaCalc.empirical}</span>
                    </div>
                    <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex justify-between">
                      <span className="text-slate-400">Empirical Formula Mass:</span>
                      <span className="text-slate-200">{formulaCalc.empMass} g/mol</span>
                    </div>
                    <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex justify-between">
                      <span className="text-slate-400">Molecular Multiplier (n):</span>
                      <span className="text-amber-400 font-bold">{formulaCalc.multiplier}</span>
                    </div>
                    <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex justify-between">
                      <span className="text-slate-400">Molecular Formula:</span>
                      <span className="text-emerald-400 font-bold text-base">{formulaCalc.molecular}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* LAB 5: SOLUTION PREPARATION */}
            {selectedLabIndex === 4 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-slate-900/80 p-5 rounded-xl border border-slate-800 space-y-4">
                  <h4 className="text-sm font-bold text-gold-400">Primary Standard Prep: Na₂CO₃ (Molar Mass = 105.99 g/mol)</h4>

                  <div>
                    <label className="text-xs text-slate-300 block mb-1">
                      Mass of Anhydrous Na₂CO₃: <span className="text-gold-400 font-bold">{soluteMassG} g</span>
                    </label>
                    <input
                      type="range"
                      min="0.5"
                      max="10.0"
                      step="0.05"
                      value={soluteMassG}
                      onChange={(e) => setSoluteMassG(parseFloat(e.target.value))}
                      className="w-full accent-gold-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-300 block mb-1">
                      Volumetric Flask Volume: <span className="text-gold-400 font-bold">{solutionVolMl} mL</span>
                    </label>
                    <select
                      value={solutionVolMl}
                      onChange={(e) => setSolutionVolMl(parseInt(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-gold-300 font-mono text-xs"
                    >
                      <option value="100">100.0 mL Flask</option>
                      <option value="250">250.0 mL Flask</option>
                      <option value="500">500.0 mL Flask</option>
                      <option value="1000">1000.0 mL Flask</option>
                    </select>
                  </div>
                </div>

                <div className="bg-slate-900/80 p-5 rounded-xl border border-slate-800 flex flex-col justify-between font-mono text-xs">
                  <div className="space-y-3">
                    <h4 className="text-sm font-bold text-gold-400 font-sans">Calculated Concentration Values</h4>
                    <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex justify-between">
                      <span className="text-slate-400">Moles of Solute:</span>
                      <span className="text-slate-200">{solutionCalc.moles} mol</span>
                    </div>
                    <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex justify-between">
                      <span className="text-slate-400">Molarity (M = mol/L):</span>
                      <span className="text-gold-400 font-bold text-base">{solutionCalc.molarity} M</span>
                    </div>
                    <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex justify-between">
                      <span className="text-slate-400">Normality (N = M × n-factor):</span>
                      <span className="text-emerald-400 font-bold text-base">{solutionCalc.normality} N</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* MANDATORY OBSERVATION QUESTIONS */}
            <div className="mt-8 pt-6 border-t border-slate-800">
              <h3 className="text-lg font-bold text-gold-400 mb-4 flex items-center gap-2">
                <span>👁️</span> Experimental Observation Tasks
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {OBSERVATION_QUESTIONS.map((obs, oIdx) => (
                  <div key={oIdx} className="bg-slate-900 p-5 rounded-xl border border-slate-800 flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-mono text-amber-400">Observation Task #{oIdx + 1}</span>
                      <p className="text-sm font-semibold text-slate-200 mt-2 mb-4">{obs.question}</p>
                      <div className="space-y-2">
                        {obs.observableOptions.map((opt, optIdx) => {
                          const isSel = observationAnswers[oIdx] === optIdx;
                          const isCorrect = optIdx === obs.correctIndex;
                          let style = 'bg-slate-800 border-slate-700 text-slate-300';
                          if (observationAnswers[oIdx] !== undefined) {
                            if (isCorrect) style = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold';
                            else if (isSel) style = 'bg-rose-500/20 border-rose-500 text-rose-300';
                          }
                          return (
                            <button
                              key={optIdx}
                              onClick={() => {
                                setObservationAnswers((prev) => ({ ...prev, [oIdx]: optIdx }));
                                triggerAudio('pop');
                              }}
                              className={`w-full text-left p-3 rounded-lg border text-xs transition-all ${style}`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: QUANTITATIVE CHALLENGES */}
        {activeTab === 'challenges' && (
          <div className="space-y-6">
            {/* Challenge Progress Header */}
            <div className="flex flex-col md:flex-row justify-between items-center bg-slate-900 p-4 rounded-xl border border-slate-800 gap-4">
              <div>
                <span className="text-xs font-mono text-gold-400">
                  Challenge {currentChallengeIdx + 1} of {CHALLENGES.length}
                </span>
                <div className="text-lg font-bold text-slate-100">
                  {CHALLENGES[currentChallengeIdx].competencyLevel}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  CHALLENGES[currentChallengeIdx].difficulty === 'advanced'
                    ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    : CHALLENGES[currentChallengeIdx].difficulty === 'standard'
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                }`}>
                  {CHALLENGES[currentChallengeIdx].difficulty}
                </span>
              </div>
            </div>

            {/* Question Box */}
            <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 space-y-6">
              <p className="text-base font-semibold text-slate-100 leading-relaxed">
                {CHALLENGES[currentChallengeIdx].question}
              </p>

              {/* MCQ Options */}
              {CHALLENGES[currentChallengeIdx].type === 'mcq' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {CHALLENGES[currentChallengeIdx].options?.map((opt, idx) => {
                    let style = 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200';
                    if (isAnswerSubmitted) {
                      if (idx === CHALLENGES[currentChallengeIdx].correctIndex) {
                        style = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold';
                      } else if (idx === selectedOption) {
                        style = 'bg-rose-500/20 border-rose-500 text-rose-300';
                      }
                    } else if (selectedOption === idx) {
                      style = 'bg-gold-500/20 border-gold-500 text-gold-300 font-semibold';
                    }

                    return (
                      <button
                        key={idx}
                        disabled={isAnswerSubmitted}
                        onClick={() => {
                          setSelectedOption(idx);
                          triggerAudio('tap');
                        }}
                        className={`p-4 rounded-xl border text-left text-xs md:text-sm transition-all ${style}`}
                      >
                        <span className="font-mono text-gold-400 mr-2">[{String.fromCharCode(65 + idx)}]</span> {opt}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Numeric Input */}
              {CHALLENGES[currentChallengeIdx].type === 'numeric' && (
                <div className="flex items-center gap-3 max-w-md">
                  <input
                    type="number"
                    step="any"
                    disabled={isAnswerSubmitted}
                    placeholder="Enter quantitative result"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    className="flex-1 bg-slate-950 border border-slate-700 rounded-xl p-3 text-gold-300 font-mono text-base focus:outline-none focus:border-gold-500"
                  />
                  <span className="text-slate-400 font-mono text-sm">
                    {CHALLENGES[currentChallengeIdx].unit}
                  </span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                <button
                  onClick={() => {
                    if (hintCount < 3) {
                      setCurrentHint(CHALLENGES[currentChallengeIdx].hints[hintCount]);
                      setShowHint(true);
                      setHintCount((prev) => prev + 1);
                      triggerAudio('hint');
                    }
                  }}
                  className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
                >
                  <span>💡</span> Request Hint ({3 - hintCount} remaining)
                </button>

                {!isAnswerSubmitted ? (
                  <button
                    onClick={handleChallengeSubmit}
                    className="px-6 py-3 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-slate-950 font-bold rounded-xl shadow-lg shadow-gold-500/20 text-sm"
                  >
                    Submit Calculation
                  </button>
                ) : (
                  <button
                    onClick={handleNextChallenge}
                    className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold rounded-xl shadow-lg shadow-emerald-500/20 text-sm"
                  >
                    Next Challenge →
                  </button>
                )}
              </div>

              {/* Explanation Box */}
              {isAnswerSubmitted && (
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-2">
                  <div className="font-bold text-gold-400">Calculation Solution Path:</div>
                  <p>{CHALLENGES[currentChallengeIdx].explanation}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: REAL WORLD QUALITY CONTROL PROTOCOL */}
        {activeTab === 'summary' && (
          <div className="space-y-8">
            <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
              <h2 className="text-xl font-bold text-gold-300 mb-2">{REAL_WORLD_ACTIVITY.title}</h2>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">{REAL_WORLD_ACTIVITY.description}</p>

              <div className="space-y-3">
                {REAL_WORLD_ACTIVITY.steps.map((step, sIdx) => (
                  <div key={sIdx} className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-gold-500/20 text-gold-400 flex items-center justify-center font-mono font-bold text-xs shrink-0">
                      {sIdx + 1}
                    </span>
                    <p className="text-xs text-slate-200 font-mono leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Common Misconceptions Overview */}
            <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 space-y-4">
              <h3 className="text-lg font-bold text-rose-400 flex items-center gap-2">
                <span>⚠️</span> Common Misconceptions & Corrections (ISC Syllabus)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MISCONCEPTIONS.map((misc) => (
                  <div key={misc.id} className="p-4 bg-slate-950 rounded-xl border border-rose-900/30 space-y-2">
                    <h4 className="text-sm font-bold text-rose-300">{misc.title}</h4>
                    <p className="text-xs text-slate-400">{misc.description}</p>
                    <div className="p-2 bg-emerald-950/30 border border-emerald-800/40 rounded text-xs text-emerald-300">
                      <strong>Correction: </strong> {misc.correction}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* FEEDBACK OVERLAYS */}
      <HintBubble show={showHint} text={currentHint} />
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccess} text="All Analytical Challenges Completed!" />
      <SparkleBurst show={showSparkle} x={sparklePos.x} y={sparklePos.y} />
    </div>
  );
}