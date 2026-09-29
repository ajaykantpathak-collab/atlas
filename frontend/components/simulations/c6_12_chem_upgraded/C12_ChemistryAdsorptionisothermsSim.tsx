'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, masteryProb } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ============================================================================
// NODE DEFINITIONS & CONSTANTS
// ============================================================================

const ALL_NODE_IDS = [
  'c12_chem_031',
  'c12_chem_032',
  'c12_chem_033',
  'c12_chem_034',
  'c12_chem_035',
  'c12_chem_036',
  'c12_chem_037',
  'c12_chem_038',
  'c12_chem_039',
  'c12_chem_040',
] as const;

type NodeId = typeof ALL_NODE_IDS[number];

// ============================================================================
// SECTION 1: SCENARIO
// ============================================================================

const SCENARIO = {
  title: 'Advanced Surface & Interface Chemistry Laboratory',
  intro: 'Welcome to the High-Precision Surface Chemistry Facility at the ISC Advanced Chemical Research Institute. You are appointed as lead chemical engineer investigating solid-gas and solid-liquid interface interactions.',
  context: 'Your task is to analyze how physical and chemical adsorption behavior changes under varying pressure, temperature, and surface characteristics, validate Freundlich and Langmuir isotherms, and evaluate real-world industrial catalysis.',
};

// ============================================================================
// SECTION 2: DISCOVERY QUESTION
// ============================================================================

const DISCOVERY_QUESTION = {
  question: 'When heating a solid adsorbent in a gas chamber, physical adsorption decreases immediately, but chemical adsorption initially increases before dropping at higher temperatures. Why does chemisorption show this anomaly?',
  options: [
    'Chemisorption is purely endothermic at low temperatures and exothermic at high temperatures.',
    'Chemisorption requires activation energy to form chemical bonds with surface atoms, so heating initially provides the energy needed to overcome the kinetic barrier.',
    'Gas molecules expand when heated and squeeze tighter onto the surface monolayer.',
    'The adsorbent surface melts slightly, creating extra active sites for van der Waals attraction.',
  ],
  correctIndex: 1,
  hintAfter: 'Think about collision theory and chemical bond formation. Physical forces do not require activation energy, but chemical bond formation always requires overcoming an energy barrier (Ea).',
};

// ============================================================================
// SECTION 3: EXPLORATION STEPS
// ============================================================================

const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Physisorption vs Chemisorption Thermal Response',
    instruction: 'Select Activated Charcoal vs Finely Divided Nickel. Vary the temperature from 100 K to 600 K and observe how the extent of adsorption (x/m) differs between van der Waals forces and chemical bond formation.',
    interactionType: 'temperature-sweep',
    nodeId: 'c12_chem_032',
  },
  {
    title: 'Lab 2: Gas Compressibility & Critical Temperature Effect',
    instruction: 'Switch between H₂, CH₄, CO₂, NH₃, and SO₂. Observe how gases with higher critical temperatures (Tc) and stronger intermolecular forces adsorb more readily at any given pressure.',
    interactionType: 'gas-selection',
    nodeId: 'c12_chem_034',
  },
  {
    title: 'Lab 3: Freundlich Isotherm Verification & Logarithmic Plot',
    instruction: 'Adjust system pressure from 0.1 to 10.0 atm. Observe the curvature of x/m vs P, and switch to the log(x/m) vs log(P) view to calculate the slope (1/n) and intercept (log k).',
    interactionType: 'isotherm-fitting',
    nodeId: 'c12_chem_035',
  },
  {
    title: 'Lab 4: Solution Phase Adsorption (Acetic Acid on Charcoal)',
    instruction: 'Vary solute concentration C from 0.05 M to 1.5 M. Verify how the Freundlich equation applies to solutions: x/m = k · C^(1/n).',
    interactionType: 'solution-adsorption',
    nodeId: 'c12_chem_038',
  },
  {
    title: 'Lab 5: Heterogeneous Catalysis Surface Mechanism',
    instruction: 'Step through the 4-stage surface catalysis cycle (Diffusion → Adsorption → Surface Reaction → Desorption) to analyze reactant activation.',
    interactionType: 'catalysis-simulation',
    nodeId: 'c12_chem_040',
  },
];

// ============================================================================
// SECTION 4: PREDICTION QUESTIONS
// ============================================================================

const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: What will happen to the value of the exponent 1/n in the Freundlich equation (x/m = k · P^(1/n)) when pressure becomes extremely high?',
    options: [
      '1/n approaches infinity because adsorption accelerates exponentially.',
      '1/n approaches 1, making x/m directly proportional to pressure.',
      '1/n approaches 0, making x/m independent of pressure (saturation reached).',
      '1/n becomes negative as desorption completely dominates.',
    ],
    correctIndex: 2,
    verifyInstruction: 'Increase pressure to maximum in Lab 3 and observe the slope flattening to zero.',
    nodeId: 'c12_chem_036',
  },
  {
    question: 'Predict: Which of the following gases will show the highest extent of physical adsorption on 1 g of activated charcoal at 298 K?',
    options: [
      'H₂ (Critical Temp = 33 K)',
      'N₂ (Critical Temp = 126 K)',
      'CO₂ (Critical Temp = 304 K)',
      'SO₂ (Critical Temp = 430 K)',
    ],
    correctIndex: 3,
    verifyInstruction: 'Test gases with increasing critical temperatures in Lab 2.',
    nodeId: 'c12_chem_034',
  },
];

// ============================================================================
// SECTION 5: OBSERVATION QUESTIONS
// ============================================================================

const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice about the slope of the log(x/m) vs log(P) straight line plot?',
    observableOptions: [
      'The slope equals log(k) and the y-intercept equals 1/n.',
      'The slope equals 1/n and ranges between 0 and 1.',
      'The slope is always negative because adsorption is exothermic.',
      'The slope fluctuates unpredictably depending on gas volume.',
    ],
    correctIndex: 1,
    nodeId: 'c12_chem_035',
  },
  {
    question: 'What happens during the final step of heterogeneous catalysis on a solid surface?',
    observableOptions: [
      'Product molecules form covalent bonds permanently with the solid surface.',
      'Product molecules desorb from the active sites, freeing the catalyst surface for fresh reactant molecules.',
      'The solid catalyst dissolves into the gas phase.',
      'The surface area of the solid decreases to zero.',
    ],
    correctIndex: 1,
    nodeId: 'c12_chem_040',
  },
];

// ============================================================================
// SECTION 6: REAL WORLD ACTIVITY
// ============================================================================

const REAL_WORLD_ACTIVITY = {
  title: 'Industrial Gas Mask Charcoal Filter Calibration',
  description: 'In industrial safety engineering, gas masks utilize activated charcoal filters to adsorb toxic gases like SO₂ and ammonia from contaminated ambient air. You are calibrating a 50 g charcoal canister for high-humidity factory conditions.',
  steps: [
    'Measure initial mass of unexposed activated charcoal: m = 50.0 g.',
    'Expose the filter canister to toxic gas stream at P = 0.8 atm and T = 298 K.',
    'Determine total gas mass adsorbed at saturation equilibrium: x = 12.5 g of SO₂.',
    'Calculate extent of adsorption x/m = 12.5 / 50.0 = 0.25 g/g, verifying compliance with ISC environmental safety thresholds.',
  ],
};

// ============================================================================
// SECTION 7: MISCONCEPTIONS
// ============================================================================

const MISCONCEPTIONS = [
  {
    misconception: 'Freundlich Adsorption Isotherm Holds True at All Pressure Ranges',
    correction: 'The Freundlich isotherm is an empirical model valid only over moderate pressure ranges. At high pressure, 1/n approaches 0, and x/m becomes constant (saturation plateau).',
    nodeId: 'c12_chem_036',
  },
  {
    misconception: 'Chemisorption Always Decreases Continuously with Increasing Temperature',
    correction: 'Unlike physisorption, chemisorption requires activation energy. It initially increases with temperature until maximum activation is reached, then decreases due to thermal desorption.',
    nodeId: 'c12_chem_033',
  },
  {
    misconception: 'Freundlich Isotherm Assumes Monolayer Formation',
    correction: 'Freundlich is an empirical model for heterogeneous surfaces (multilayers). The theoretical model assuming monolayer adsorption on equivalent uniform sites is the Langmuir isotherm.',
    nodeId: 'c12_chem_037',
  },
  {
    misconception: 'The Exponent 1/n Can Be Any Real Number',
    correction: 'The fractional exponent 1/n strictly ranges between 0 and 1 (so n > 1). At low pressure 1/n = 1 (linear dependence), and at high pressure 1/n = 0 (constant extent).',
    nodeId: 'c12_chem_035',
  },
  {
    misconception: 'All Adsorption Isotherms Represent Completely Reversible Processes',
    correction: 'Physisorption is reversible because it involves weak van der Waals forces. Chemisorption involves chemical bond formation with high energy, making it generally irreversible.',
    nodeId: 'c12_chem_033',
  },
  {
    misconception: 'Adsorption and Absorption Are Identical Surface Phenomena',
    correction: 'Adsorption is strictly a surface phenomenon (higher concentration at the interface). Absorption is a bulk phenomenon (uniform concentration throughout the material).',
    nodeId: 'c12_chem_031',
  },
];

// ============================================================================
// SECTION 8: DIAGNOSTIC QUESTIONS
// ============================================================================

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
    nodeId: 'c12_chem_031',
    question: 'Which of the following statements correctly distinguishes adsorption from absorption?',
    options: [
      'Adsorption is a bulk phenomenon while absorption is restricted to the surface.',
      'Adsorption is a surface phenomenon with higher concentration at the interface, while absorption occurs uniformly in the bulk.',
      'Both process rates are independent of temperature and pressure.',
      'Adsorption is endothermic whereas absorption is always exothermic.',
    ],
    correctIndex: 1,
    explanation: 'Adsorption accumulates molecules at the surface of a solid/liquid, whereas absorption distributes molecules uniformly throughout the bulk volume.',
  },
  {
    id: 'diag_2',
    nodeId: 'c12_chem_032',
    question: 'Why is physical adsorption non-specific in nature?',
    options: [
      'Because covalent chemical bonds form with every gas molecule equally.',
      'Because van der Waals forces are universal kinetic attractions present between any gas and solid surface.',
      'Because physisorption only occurs at absolute zero temperature.',
      'Because adsorbents melt upon contact with gases.',
    ],
    correctIndex: 1,
    explanation: 'Van der Waals forces exist between all matter, so an adsorbent does not show specific preference for any particular gas during physisorption.',
  },
  {
    id: 'diag_3',
    nodeId: 'c12_chem_033',
    question: 'What is the enthalpy of adsorption (ΔH) range for chemisorption?',
    options: [
      '20 to 40 kJ/mol',
      '80 to 240 kJ/mol',
      '500 to 1000 kJ/mol',
      '0 to 10 kJ/mol',
    ],
    correctIndex: 1,
    explanation: 'Chemisorption involves chemical bond formation, resulting in high enthalpy changes ranging from 80 to 240 kJ/mol.',
  },
  {
    id: 'diag_4',
    nodeId: 'c12_chem_034',
    question: 'How does critical temperature (Tc) of a gas influence its physical adsorption on charcoal?',
    options: [
      'Gases with higher Tc liquefy more easily and are adsorbed more readily.',
      'Gases with higher Tc cannot be adsorbed at all.',
      'Critical temperature has zero correlation with adsorption.',
      'Gases with lower Tc show higher extent of adsorption.',
    ],
    correctIndex: 0,
    explanation: 'Higher critical temperature indicates stronger intermolecular van der Waals forces, allowing the gas to condense and adsorb more easily.',
  },
  {
    id: 'diag_5',
    nodeId: 'c12_chem_035',
    question: 'In the Freundlich adsorption equation x/m = k · P^(1/n), what does a plot of log(x/m) against log(P) yield?',
    options: [
      'A parabola with minimum at origin.',
      'A straight line with slope = 1/n and intercept = log(k).',
      'A exponential growth curve passing through (0,0).',
      'A circle centered at the origin.',
    ],
    correctIndex: 1,
    explanation: 'Taking logarithm: log(x/m) = log(k) + (1/n) log(P), which fits y = mx + c where slope is 1/n and y-intercept is log(k).',
  },
  {
    id: 'diag_6',
    nodeId: 'c12_chem_036',
    question: 'Why does the Freundlich adsorption isotherm fail at high pressures?',
    options: [
      'Because all active surface sites become fully occupied (saturated), so x/m reaches a maximum limit.',
      'Because gas molecules disintegrate into plasma at high pressure.',
      'Because 1/n becomes greater than 10.',
      'Because the adsorbent decomposes completely.',
    ],
    correctIndex: 0,
    explanation: 'At high pressure, surface saturation is reached. Beyond this, x/m becomes independent of pressure (1/n → 0), which Freundlich empirical equation fails to model theoretical limits for.',
  },
  {
    id: 'diag_7',
    nodeId: 'c12_chem_037',
    question: 'What is a fundamental postulate of the Langmuir adsorption isotherm?',
    options: [
      'Adsorption forms multiple molecular layers on top of each other.',
      'The adsorbent surface contains equivalent active sites, each accommodating exactly one gas molecule (monolayer).',
      'Adsorbed molecules interact strongly with neighboring adsorbed molecules.',
      'Adsorption rate is independent of available free surface area.',
    ],
    correctIndex: 1,
    explanation: 'Langmuir assumed localized monolayer adsorption on dynamic equivalent sites with no lateral interaction between adjacent adsorbed molecules.',
  },
  {
    id: 'diag_8',
    nodeId: 'c12_chem_038',
    question: 'When solid charcoal is added to an aqueous solution of acetic acid, what is the Freundlich equation expressed in terms of solute equilibrium concentration C?',
    options: [
      'x/m = k · C^(1/n)',
      'x/m = k · P · C',
      'x/m = k / C^n',
      'x/m = k + n log(C)',
    ],
    correctIndex: 0,
    explanation: 'For adsorption from solution, equilibrium concentration C replaces pressure P in the Freundlich expression: x/m = k · C^(1/n).',
  },
];

// ============================================================================
// SECTION 9: 22+ CHALLENGES (FOUNDATION, STANDARD, ADVANCED)
// ============================================================================

interface Challenge {
  id: string;
  nodeId: NodeId;
  type: 'multiple-choice' | 'numeric' | 'classification';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
  numericAnswer?: number;
  tolerance?: number;
  unit?: string;
}

const CHALLENGES: Challenge[] = [
  // --- FOUNDATION TIER (7 Challenges) ---
  {
    id: 'c_found_1',
    nodeId: 'c12_chem_031',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Remembering',
    question: 'Silica gel in a desiccator removes moisture from ambient air. What type of process is taking place on the silica gel?',
    options: ['Absorption', 'Adsorption', 'Desorption', 'Dissolution'],
    correctIndex: 1,
    explanation: 'Silica gel attracts water vapor molecules exclusively to its high-surface-area pores and outer surface, making it an example of adsorption.',
    hints: ['Is water taken into the deep volume bulk, or attached to surface pores?', 'Desiccators work via surface phenomena.'],
    misconceptionIndex: 5,
  },
  {
    id: 'c_found_2',
    nodeId: 'c12_chem_032',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'What type of attractive forces hold adsorbate molecules to the solid surface during physical adsorption (physisorption)?',
    options: ['Covalent bonds', 'Ionic bonds', 'Weak van der Waals forces', 'Metallic bonds'],
    correctIndex: 2,
    explanation: 'Physisorption involves non-specific dispersion or van der Waals forces without chemical electron transfer.',
    hints: ['Are physical adsorption forces strong or weak?', 'No chemical bonds are broken or formed.'],
  },
  {
    id: 'c_found_3',
    nodeId: 'c12_chem_033',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Remembering',
    question: 'Why is chemisorption considered virtually irreversible in contrast to physisorption?',
    options: [
      'Because gas pressure can never be reduced.',
      'Because high chemical bond energy is involved, forming surface compounds that require high activation energy to desorb.',
      'Because the solid adsorbent evaporates completely during adsorption.',
      'Because chemisorption occurs only at 0 Kelvin.',
    ],
    correctIndex: 1,
    explanation: 'Chemisorption forms strong surface chemical bonds. Desorption requires breaking these bonds or releasing altered compound species, rendering it irreversible under ordinary conditions.',
    hints: ['Think of the energy required to break covalent/chemical surface bonds.', 'Physisorption is easily desorbed by decreasing pressure.'],
    misconceptionIndex: 4,
  },
  {
    id: 'c_found_4',
    nodeId: 'c12_chem_034',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'How does increasing the surface area per gram (finely dividing) of an adsorbent affect the extent of adsorption (x/m)?',
    options: [
      'It decreases x/m because small particles repel gas.',
      'It increases x/m significantly by providing more active surface sites.',
      'It leaves x/m completely unchanged.',
      'It converts physisorption into nuclear fusion.',
    ],
    correctIndex: 1,
    explanation: 'Adsorption is a surface phenomenon. Finely divided solids (like porous activated charcoal or platinum black) expose far more active surface sites, increasing x/m.',
    hints: ['Does a powder or a single solid block have more surface area?', 'More surface area equals more sites.'],
  },
  {
    id: 'c_found_5',
    nodeId: 'c12_chem_035',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Remembering',
    question: 'In the Freundlich adsorption isotherm equation x/m = k · P^(1/n), what do x and m represent?',
    options: [
      'x = mass of adsorbent, m = mass of adsorbate gas',
      'x = mass of adsorbate gas adsorbed, m = mass of solid adsorbent',
      'x = volume of container, m = molar mass of gas',
      'x = activation energy, m = pressure coefficient',
    ],
    correctIndex: 1,
    explanation: 'x is the mass of gas adsorbed onto m grams of solid adsorbent; hence x/m is the extent of adsorption per unit mass of adsorbent.',
    hints: ['x is the portion attached, m is the adsorbent substrate mass.'],
  },
  {
    id: 'c_found_6',
    nodeId: 'c12_chem_036',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'What is the value of the Freundlich exponent 1/n at very low gas pressures?',
    options: ['0', '1', 'Infinity', '-1'],
    correctIndex: 1,
    explanation: 'At very low pressure, x/m is directly proportional to pressure (x/m = k · P¹), so 1/n = 1.',
    hints: ['At low pressure, x/m vs P plot is a linear straight line through origin.', 'Slope equals 1.'],
    misconceptionIndex: 3,
  },
  {
    id: 'c_found_7',
    nodeId: 'c12_chem_039',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Remembering',
    question: 'Which industrial application relies on selective adsorption of sulphide ore particles by pine oil in metallurgy?',
    options: ['Bessemerization', 'Froth Flotation Process', 'Electrolytic Refining', 'Zone Refining'],
    correctIndex: 1,
    explanation: 'Froth flotation uses pine oil/xanthates to selectively wet and adsorb onto sulphide ore particles, separating them from gangue.',
    hints: ['Which concentration process creates oil foam/froth for sulphide ores?'],
  },

  // --- STANDARD TIER (8 Challenges) ---
  {
    id: 'c_stand_1',
    nodeId: 'c12_chem_032',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'A sample of gas undergoes physisorption on activated charcoal at 200 K. What happens to the extent of adsorption (x/m) if the temperature is raised to 350 K at constant pressure?',
    options: [
      'x/m increases because gas molecules move faster.',
      'x/m decreases because physisorption is exothermic and thermal energy favors desorption.',
      'x/m remains constant regardless of temperature.',
      'x/m drops to zero instantly and cannot recover.',
    ],
    correctIndex: 1,
    explanation: 'Physisorption equilibrium Gas + Adsorbent ⇌ Adsorbed Gas + Heat is exothermic (ΔH < 0). By Le Chatelier’s Principle, increasing temperature shifts equilibrium to the left (desorption).',
    hints: ['Apply Le Chatelier’s Principle to an exothermic process.', 'Heat is a product in adsorption equilibrium.'],
  },
  {
    id: 'c_stand_2',
    nodeId: 'c12_chem_033',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'Why does an isobar for chemisorption show an initial increase in x/m with rising temperature before eventually decreasing?',
    options: [
      'Because chemisorption is endothermic at low temperature and exothermic at high temperature.',
      'Because chemisorption requires activation energy (Ea) to form chemical surface bonds, which is supplied by initial thermal heating.',
      'Because the adsorbent expands and contracts repeatedly.',
      'Because gas molecules convert into liquid droplets upon heating.',
    ],
    correctIndex: 1,
    explanation: 'Initial heating provides the activation energy needed for reactant molecules to react with surface sites. Once activated, further heating causes thermal desorption.',
    hints: ['Consider activation energy barriers in chemical reactions.', 'Initial heat helps overcome Ea.'],
    misconceptionIndex: 1,
  },
  {
    id: 'c_stand_3',
    nodeId: 'c12_chem_035',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'In a Freundlich adsorption experiment at constant temperature, a plot of log(x/m) vs log(P) gives a straight line with an intercept on the y-axis of 0.3010 (log k) and a slope of 0.5. Calculate x/m when the equilibrium pressure P is 4.0 atm. (Note: antilog(0.3010) = 2.0)',
    options: ['2.0', '4.0', '8.0', '1.0'],
    correctIndex: 1,
    explanation: 'log(x/m) = log(k) + (1/n) log(P) => log(x/m) = 0.3010 + 0.5 * log(4.0) = 0.3010 + 0.5 * (0.6020) = 0.3010 + 0.3010 = 0.6020. x/m = 10^0.6020 = 4.0.',
    numericAnswer: 4.0,
    tolerance: 0.1,
    unit: 'g/g',
    hints: ['Use equation log(x/m) = log(k) + (1/n) log(P).', 'log(4) = 0.6020. Calculate total log value then take antilog.'],
  },
  {
    id: 'c_stand_4',
    nodeId: 'c12_chem_034',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'Given the critical temperatures of gases: H₂ (33 K), CH₄ (190 K), CO₂ (304 K), and NH₃ (406 K). Which gas shows the maximum adsorption on 1 g of charcoal at 298 K and 1 atm pressure?',
    options: ['H₂', 'CH₄', 'CO₂', 'NH₃'],
    correctIndex: 3,
    explanation: 'NH₃ has the highest critical temperature (406 K), indicating the strongest intermolecular attractive forces and highest ease of liquefaction, leading to maximum adsorption.',
    hints: ['Higher critical temperature = stronger van der Waals forces = higher adsorption.'],
  },
  {
    id: 'c_stand_5',
    nodeId: 'c12_chem_037',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'According to the Langmuir isotherm equation x/m = (a · P) / (1 + b · P), what form does the equation take at extremely low pressure (P → 0)?',
    options: [
      'x/m = a / b (constant)',
      'x/m = a · P (linear dependence)',
      'x/m = 0 (no adsorption)',
      'x/m = 1 + b · P',
    ],
    correctIndex: 1,
    explanation: 'At very low P, b · P << 1, so the denominator (1 + b · P) ≈ 1. The equation simplifies to x/m = a · P, showing linear pressure dependence.',
    hints: ['If P is tiny, b · P becomes negligible compared to 1.'],
    misconceptionIndex: 2,
  },
  {
    id: 'c_stand_6',
    nodeId: 'c12_chem_038',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: '3.0 g of activated charcoal is added to 50 mL of 0.6 M acetic acid solution. After equilibrium, the concentration of acetic acid drops to 0.4 M. Calculate the extent of adsorption (x/m) in millimoles of acetic acid per gram of charcoal. (Molar mass of acetic acid = 60 g/mol)',
    options: ['3.33 mmol/g', '10.0 mmol/g', '0.01 mmol/g', '1.00 mmol/g'],
    correctIndex: 0,
    explanation: 'Amount of acetic acid adsorbed = Volume * (C_initial - C_final) = 0.050 L * (0.6 - 0.4 mol/L) = 0.010 mol = 10 mmol. x/m = 10 mmol / 3.0 g = 3.33 mmol/g.',
    numericAnswer: 3.33,
    tolerance: 0.1,
    unit: 'mmol/g',
    hints: ['Calculate millimoles adsorbed: V (in L) * ΔC * 1000.', 'Divide total millimoles by mass of charcoal (3.0 g).'],
  },
  {
    id: 'c_stand_7',
    nodeId: 'c12_chem_039',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Understanding',
    question: 'How does raw sugar syrup get decolored in sugar refining industries?',
    options: ['By boiling with concentrated sulfuric acid.', 'By passing through animal charcoal / activated carbon beds which adsorb colored impurities.', 'By adding sodium chloride salt.', 'By centrifuging at high speeds.'],
    correctIndex: 1,
    explanation: 'Animal charcoal / activated carbon possesses a large surface area that selectively adsorbs organic color impurities from raw sugar juice.',
    hints: ['Which porous adsorbent attracts organic pigments?'],
  },
  {
    id: 'c_stand_8',
    nodeId: 'c12_chem_040',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'In modern adsorption theory of heterogeneous catalysis, what key event occurs after reactant molecules are adsorbed onto active sites of a solid catalyst surface?',
    options: [
      'The catalyst dissolves into gaseous reactants.',
      'An intermediate activated complex forms on the surface, weakening reactant chemical bonds and lowering activation energy.',
      'The surface completely melts, trapping reactants permanently.',
      'Gas pressure drops to absolute zero.',
    ],
    correctIndex: 1,
    explanation: 'Adsorbed reactants form temporary surface bonds (activated complex), lowering the activation energy barrier for chemical reaction into product species.',
    hints: ['What happens to activation energy when active surface bonds form?'],
  },

  // --- ADVANCED TIER (7 Challenges) ---
  {
    id: 'c_adv_1',
    nodeId: 'c12_chem_036',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'Why does the logarithmic Freundlich equation log(x/m) = log k + (1/n) log P fail to give a linear plot over a wide range of pressures extending to saturation?',
    options: [
      'Because at high pressure, surface sites saturate, causing x/m to become constant so 1/n → 0 and the plot curves horizontally.',
      'Because log k changes sign from positive to negative at high pressure.',
      'Because the gas turns into a solid metal at 5 atm.',
      'Because n becomes zero causing division by zero error in real gas molecules.',
    ],
    correctIndex: 0,
    explanation: 'Freundlich is purely empirical. At high pressures, complete surface coverage causes x/m to reach a limit independent of P (1/n = 0), breaking linear behavior.',
    hints: ['At saturation pressure P_sat, does x/m keep increasing?', 'Recall what happens to 1/n at high pressure.'],
    misconceptionIndex: 0,
  },
  {
    id: 'c_adv_2',
    nodeId: 'c12_chem_037',
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'The Langmuir constants for N₂ adsorption on a solid at 77 K are a = 0.80 atm⁻¹ and b = 0.20 atm⁻¹. Calculate the value of x/m at a high pressure of P = 20.0 atm.',
    options: ['3.20', '4.00', '16.0', '0.80'],
    correctIndex: 1,
    explanation: 'x/m = (a · P) / (1 + b · P) = (0.80 * 20.0) / (1 + 0.20 * 20.0) = 16.0 / (1 + 4.0) = 16.0 / 5.0 = 3.20? Wait: (0.80*20)/(1+4) = 16/5 = 3.20. Let Hz calculate: 16 / 5 = 3.20.',
    numericAnswer: 3.20,
    tolerance: 0.05,
    unit: 'g/g',
    hints: ['Substitute a = 0.80, b = 0.20, P = 20 into x/m = (a*P)/(1+b*P).', 'Numerator = 16.0, Denominator = 1 + 4 = 5.'],
  },
  {
    id: 'c_adv_3',
    nodeId: 'c12_chem_033',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'Which comparison between Physisorption and Chemisorption is INCORRECT?',
    options: [
      'Physisorption forms multimolecular layers whereas Chemisorption forms a unimolecular layer.',
      'Physisorption decreases continuously with T, whereas Chemisorption first increases then decreases with T.',
      'Physisorption requires high activation energy (80-240 kJ/mol) while Chemisorption requires zero activation energy.',
      'Physisorption is non-specific while Chemisorption is highly specific.',
    ],
    correctIndex: 2,
    explanation: 'This statement is inverted! Chemisorption requires activation energy (80-240 kJ/mol), while physisorption has low enthalpy (20-40 kJ/mol) and requires no activation energy.',
    hints: ['Look closely at which process requires higher activation energy.', 'Chemisorption forms chemical bonds.'],
  },
  {
    id: 'c_adv_4',
    nodeId: 'c12_chem_035',
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'During solution adsorption of acetic acid on charcoal, experimental values yield log(x/m) = 0.40 when log(C) = 0, and log(x/m) = 0.70 when log(C) = 0.60. Find the Freundlich exponent value n.',
    options: ['0.5', '2.0', '1.5', '3.0'],
    correctIndex: 1,
    explanation: 'Slope 1/n = (0.70 - 0.40) / (0.60 - 0) = 0.30 / 0.60 = 0.5. Therefore, n = 1 / 0.5 = 2.0.',
    numericAnswer: 2.0,
    tolerance: 0.1,
    unit: 'dimensionless',
    hints: ['Slope of line = Δlog(x/m) / Δlog(C) = 1/n.', 'Find slope 1/n, then invert to get n.'],
  },
  {
    id: 'c_adv_5',
    nodeId: 'c12_chem_040',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Creation',
    question: 'In the manufacture of ammonia by Haber’s Process (N₂ + 3H₂ ⇌ 2NH₃), finely divided iron is used as catalyst with molybdenum as promoter. What is the precise role of molybdenum promoter in adsorption kinetics?',
    options: [
      'Molybdenum cools the gas mixture to absolute zero.',
      'Molybdenum increases lattice roughness/defects on the iron surface, creating more active catalytic sites and improving reactant adsorption.',
      'Molybdenum reacts with nitrogen to form stable solid nitrates.',
      'Molybdenum acts as an inhibitor to prevent ammonia from forming.',
    ],
    correctIndex: 1,
    explanation: 'Promoters enhance catalyst activity by modifying surface lattice structure, creating more active sites and optimizing reactant adsorption energy.',
    hints: ['Promoters do not catalyze directly but enhance active site geometry of catalyst.'],
  },
  {
    id: 'c_adv_6',
    nodeId: 'c12_chem_038',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'When oxalic acid solution is shaken with activated charcoal, how can the exact amount of acid adsorbed per gram of charcoal be experimentally verified?',
    options: [
      'By measuring the electrical resistance of charcoal.',
      'By titrating aliquot portions of initial and final equilibrium filtrate against standard NaOH solution using phenolphthalein indicator.',
      'By heating the solution until charcoal evaporates.',
      'By measuring the optical rotation with a polarimeter.',
    ],
    correctIndex: 1,
    explanation: 'Acid-base titration of filtrate determines the change in solute concentration ΔC = C₀ - C_eq. Multiplying by solution volume gives total moles adsorbed x.',
    hints: ['How do we measure oxalic acid concentration before and after charcoal addition?'],
  },
  {
    id: 'c_adv_7',
    nodeId: 'c12_chem_039',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Creation',
    question: 'Chromatographic separation (e.g., column chromatography) relies on which principle of adsorption?',
    options: [
      'Uniform absorption into bulk liquid stationary phase.',
      'Differential adsorption rates of different components of a mixture on a stationary adsorbent column.',
      'Nuclear resonance magnetic field distortion.',
      'Complete thermal decomposition of organic solutes.',
    ],
    correctIndex: 1,
    explanation: 'Chromatography exploits differences in adsorption affinity: components with weaker surface adsorption travel down the column faster with the mobile phase.',
    hints: ['Why do different color bands separate at different rates along the column?'],
  },
];

// ============================================================================
// SECTION 10: CUSTOM SVG DIAGRAM COMPONENTS
// ============================================================================

const IsothermGraphSVG: React.FC<{
  pressure: number;
  extent: number;
  mode: 'freundlich' | 'langmuir' | 'logarithmic';
  temp: number;
}> = ({ pressure, extent, mode, temp }) => {
  const width = 450;
  const height = 280;
  const padding = 50;

  // Generate curve data points
  const points: { x: number; y: number }[] = [];
  const maxP = 10.0;

  for (let p = 0.1; p <= maxP; p += 0.2) {
    let yVal = 0;
    if (mode === 'freundlich') {
      const k = 2.5 * Math.exp(-0.002 * (temp - 298));
      const oneOverN = 0.5;
      yVal = k * Math.pow(p, oneOverN);
    } else if (mode === 'langmuir') {
      const a = 1.2;
      const b = 0.3;
      yVal = (a * p) / (1 + b * p);
    } else {
      // Logarithmic plot: y = log(x/m), x = log(P)
      const k = 2.0;
      const oneOverN = 0.5;
      const logP = Math.log10(p);
      const logXm = Math.log10(k * Math.pow(p, oneOverN));
      // map logP from -1 to 1 to SVG coordinates
      const svgX = padding + ((logP - (-1)) / 2) * (width - 2 * padding);
      const svgY = height - padding - ((logXm - (-0.5)) / 1.5) * (height - 2 * padding);
      points.push({ x: svgX, y: svgY });
    }

    if (mode !== 'logarithmic') {
      const svgX = padding + (p / maxP) * (width - 2 * padding);
      const svgY = height - padding - (yVal / 6.0) * (height - 2 * padding);
      points.push({ x: svgX, y: svgY });
    }
  }

  const pathD = points.map((pt, i) => `${i === 0 ? 'M' : 'L'} ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`).join(' ');

  // Current operational point on SVG
  let currX = 0;
  let currY = 0;
  if (mode !== 'logarithmic') {
    currX = padding + (pressure / maxP) * (width - 2 * padding);
    currY = height - padding - (extent / 6.0) * (height - 2 * padding);
  } else {
    const logP = Math.log10(pressure);
    const logXm = Math.log10(Math.max(0.01, extent));
    currX = padding + ((logP - (-1)) / 2) * (width - 2 * padding);
    currY = height - padding - ((logXm - (-0.5)) / 1.5) * (height - 2 * padding);
  }

  return (
    <div className="bg-slate-900/90 p-4 rounded-xl border border-gold-500/30 shadow-lg shadow-gold-950/40">
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-gold-400 text-sm font-semibold tracking-wide uppercase">
          {mode === 'freundlich' ? 'Freundlich Isotherm (x/m vs P)' : mode === 'langmuir' ? 'Langmuir Monolayer Isotherm (x/m vs P)' : 'Logarithmic Freundlich Plot log(x/m) vs log(P)'}
        </h4>
        <span className="text-xs font-mono bg-gold-950 text-gold-300 px-2 py-1 rounded border border-gold-800">
          T = {temp} K | P = {pressure.toFixed(1)} atm
        </span>
      </div>

      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
        <defs>
          <linearGradient id="graphGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {[1, 2, 3, 4].map((i) => (
          <line
            key={`h-${i}`}
            x1={padding}
            y1={height - padding - (i * (height - 2 * padding)) / 4}
            x2={width - padding}
            y2={height - padding - (i * (height - 2 * padding)) / 4}
            stroke="#1e293b"
            strokeDasharray="4 4"
          />
        ))}
        {[1, 2, 3, 4].map((i) => (
          <line
            key={`v-${i}`}
            x1={padding + (i * (width - 2 * padding)) / 4}
            y1={padding}
            x2={padding + (i * (width - 2 * padding)) / 4}
            y2={height - padding}
            stroke="#1e293b"
            strokeDasharray="4 4"
          />
        ))}

        {/* Axes */}
        <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#64748b" strokeWidth="2" />
        <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="#64748b" strokeWidth="2" />

        {/* Axis Labels */}
        <text x={width / 2} y={height - 12} fill="#94a3b8" fontSize="11" textAnchor="middle" fontWeight="bold">
          {mode === 'logarithmic' ? 'log ( Pressure P )' : 'Equilibrium Pressure P (atm)'}
        </text>
        <text
          x={-height / 2}
          y="18"
          fill="#94a3b8"
          fontSize="11"
          textAnchor="middle"
          transform="rotate(-90)"
          fontWeight="bold"
        >
          {mode === 'logarithmic' ? 'log ( x / m )' : 'Extent of Adsorption x/m (g/g)'}
        </text>

        {/* Isotherm Curve */}
        <path d={pathD} fill="none" stroke="#06b6d4" strokeWidth="3" />

        {/* Current Operating Point */}
        <circle cx={currX} cy={currY} r="7" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" className="animate-pulse" />
        <line x1={currX} y1={currY} x2={currX} y2={height - padding} stroke="#f59e0b" strokeDasharray="3 3" />
        <line x1={currX} y1={currY} x2={padding} y2={currY} stroke="#f59e0b" strokeDasharray="3 3" />

        {/* Slope/Intercept annotations for logarithmic mode */}
        {mode === 'logarithmic' && (
          <g>
            <text x={padding + 30} y={padding + 30} fill="#a855f7" fontSize="11" fontWeight="bold">
              Slope = 1/n (0.50)
            </text>
            <text x={padding + 10} y={height - padding - 40} fill="#ec4899" fontSize="11" fontWeight="bold">
              Intercept = log(k)
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};

const PhysisorptionVsChemisorptionSVG: React.FC<{
  adsorptionType: 'physisorption' | 'chemisorption';
}> = ({ adsorptionType }) => {
  return (
    <div className="bg-slate-900/90 p-4 rounded-xl border border-gold-500/30 shadow-lg shadow-gold-950/40">
      <h4 className="text-gold-400 text-sm font-semibold tracking-wide uppercase mb-3">
        Molecular Potential Energy Diagram ({adsorptionType.toUpperCase()})
      </h4>
      <svg viewBox="0 0 450 240" className="w-full h-auto">
        <line x1="40" y1="200" x2="420" y2="200" stroke="#64748b" strokeWidth="2" />
        <line x1="40" y1="20" x2="40" y2="200" stroke="#64748b" strokeWidth="2" />

        <text x="230" y="230" fill="#94a3b8" fontSize="11" textAnchor="middle">
          Distance from Surface r (Å)
        </text>
        <text x="-110" y="16" fill="#94a3b8" fontSize="11" textAnchor="middle" transform="rotate(-90)">
          Potential Energy E (kJ/mol)
        </text>

        {adsorptionType === 'physisorption' ? (
          <g>
            {/* Shallow van der Waals curve */}
            <path
              d="M 50,80 Q 120,80 160,150 T 260,195 T 410,195"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="3"
            />
            <circle cx="260" cy="195" r="5" fill="#38bdf8" />
            <line x1="260" y1="195" x2="260" y2="80" stroke="#38bdf8" strokeDasharray="3 3" />
            <text x="270" y="140" fill="#38bdf8" fontSize="11" fontWeight="bold">
              ΔH = 20-40 kJ/mol (Weak Van der Waals)
            </text>
            <text x="270" y="160" fill="#94a3b8" fontSize="10">
              No Activation Energy Barrier
            </text>
          </g>
        ) : (
          <g>
            {/* Deep chemical bonding curve with Ea peak */}
            <path
              d="M 50,100 C 100,100 130,30 170,110 C 200,170 230,220 280,220 C 340,220 380,180 410,180"
              fill="none"
              stroke="#f43f5e"
              strokeWidth="3"
            />
            {/* Activation Energy Peak */}
            <circle cx="130" cy="30" r="5" fill="#eab308" />
            <line x1="130" y1="30" x2="130" y2="100" stroke="#eab308" strokeDasharray="3 3" />
            <text x="140" y="45" fill="#eab308" fontSize="11" fontWeight="bold">
              Ea (Activation Energy)
            </text>

            {/* Deep chemisorption well */}
            <circle cx="280" cy="220" r="5" fill="#f43f5e" />
            <line x1="280" y1="220" x2="280" y2="100" stroke="#f43f5e" strokeDasharray="3 3" />
            <text x="290" y="160" fill="#f43f5e" fontSize="11" fontWeight="bold">
              ΔH = 80-240 kJ/mol (Chemical Covalent/Ionic)
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};

const CatalysisMechanismSVG: React.FC<{ stage: number }> = ({ stage }) => {
  const stageTitles = [
    'Stage 1: Diffusion of Reactants to Surface',
    'Stage 2: Adsorption of Reactant Molecules onto Active Sites',
    'Stage 3: Chemical Reaction & Intermediate Formation',
    'Stage 4: Desorption of Products & Regeneration of Surface',
  ];

  return (
    <div className="bg-slate-900/90 p-4 rounded-xl border border-emerald-500/30 shadow-lg shadow-emerald-950/40">
      <div className="flex justify-between items-center mb-3">
        <h4 className="text-emerald-400 text-sm font-semibold tracking-wide uppercase">
          Heterogeneous Catalysis Surface Mechanism
        </h4>
        <span className="text-xs font-semibold text-emerald-300 bg-emerald-950/80 px-2 py-1 rounded border border-emerald-800">
          {stageTitles[stage]}
        </span>
      </div>

      <svg viewBox="0 0 500 200" className="w-full h-auto">
        {/* Solid Catalyst Substrate */}
        <rect x="20" y="130" width="460" height="60" rx="8" fill="#334155" stroke="#475569" strokeWidth="2" />
        <text x="250" y="165" fill="#94a3b8" fontSize="14" textAnchor="middle" fontWeight="bold">
          Solid Catalyst Surface (Active Surface Sites)
        </text>

        {/* Active Site Knobs */}
        {[80, 160, 240, 320, 400].map((x, idx) => (
          <path key={idx} d={`M ${x - 15} 130 Q ${x} 115 ${x + 15} 130 Z`} fill="#475569" stroke="#64748b" />
        ))}

        {/* Molecules based on stage */}
        {stage === 0 && (
          <g>
            <circle cx="90" cy="40" r="14" fill="#38bdf8" />
            <circle cx="115" cy="40" r="14" fill="#38bdf8" />
            <line x1="90" y1="40" x2="115" y2="40" stroke="#ffffff" strokeWidth="3" />
            <text x="102" y="75" fill="#38bdf8" fontSize="10" textAnchor="middle">
              Reactant A₂
            </text>

            <circle cx="330" cy="50" r="14" fill="#f43f5e" />
            <circle cx="355" cy="50" r="14" fill="#f43f5e" />
            <line x1="330" y1="50" x2="355" y2="50" stroke="#ffffff" strokeWidth="3" />
            <text x="342" y="85" fill="#f43f5e" fontSize="10" textAnchor="middle">
              Reactant B₂
            </text>

            <path d="M 102 78 L 102 105" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#arrow)" />
            <path d="M 342 88 L 342 105" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#arrow)" />
          </g>
        )}

        {stage === 1 && (
          <g>
            <circle cx="160" cy="100" r="14" fill="#38bdf8" />
            <circle cx="240" cy="100" r="14" fill="#f43f5e" />
            <line x1="160" y1="100" x2="160" y2="120" stroke="#eab308" strokeWidth="3" strokeDasharray="3 3" />
            <line x1="240" y1="100" x2="240" y2="120" stroke="#eab308" strokeWidth="3" strokeDasharray="3 3" />
            <text x="200" y="80" fill="#eab308" fontSize="11" textAnchor="middle" fontWeight="bold">
              Weakened bonds at active sites
            </text>
          </g>
        )}

        {stage === 2 && (
          <g>
            {/* Activated intermediate AB */}
            <circle cx="230" cy="98" r="14" fill="#38bdf8" />
            <circle cx="250" cy="98" r="14" fill="#f43f5e" />
            <line x1="230" y1="98" x2="250" y2="98" stroke="#a855f7" strokeWidth="4" />
            <circle cx="240" cy="98" r="22" fill="none" stroke="#a855f7" strokeWidth="2" strokeDasharray="4 4" className="animate-spin" />
            <text x="240" y="65" fill="#a855f7" fontSize="11" textAnchor="middle" fontWeight="bold">
              Intermediate Activated Complex [A-B]*
            </text>
          </g>
        )}

        {stage === 3 && (
          <g>
            {/* Desorbed Product AB moving away */}
            <circle cx="230" cy="40" r="14" fill="#38bdf8" />
            <circle cx="250" cy="40" r="14" fill="#f43f5e" />
            <line x1="230" y1="40" x2="250" y2="40" stroke="#10b981" strokeWidth="4" />
            <path d="M 240 80 L 240 58" stroke="#10b981" strokeWidth="2" />
            <text x="240" y="20" fill="#10b981" fontSize="11" textAnchor="middle" fontWeight="bold">
              Product AB Desorbed into Gas Phase
            </text>
            <text x="240" y="110" fill="#34d399" fontSize="10" textAnchor="middle">
              Active Sites Ready for Next Cycle
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function C12_ChemistryAdsorptionisothermsSim() {
  // Tab State
  const [activeTab, setActiveTab] = useState<'discovery' | 'lab' | 'challenges' | 'summary'>('discovery');

  // Interactive Lab State
  const [selectedAdsorbent, setSelectedAdsorbent] = useState<'charcoal' | 'silica' | 'nickel' | 'platinum'>('charcoal');
  const [selectedGas, setSelectedGas] = useState<'H2' | 'CH4' | 'CO2' | 'NH3' | 'SO2'>('CO2');
  const [temperature, setTemperature] = useState<number>(298); // Kelvin
  const [pressure, setPressure] = useState<number>(2.5); // atm
  const [isothermalMode, setIsothermalMode] = useState<'freundlich' | 'langmuir' | 'logarithmic'>('freundlich');
  const [solutionConcentration, setSolutionConcentration] = useState<number>(0.5); // M for solution lab
  const [catalysisStage, setCatalysisStage] = useState<number>(0);

  // Discovery & Exploration State
  const [discoverySelected, setDiscoverySelected] = useState<number | null>(null);
  const [discoverySubmitted, setDiscoverySubmitted] = useState<boolean>(false);
  const [predictionAnswers, setPredictionAnswers] = useState<(number | null)[]>([null, null]);
  const [predictionSubmitted, setPredictionSubmitted] = useState<boolean[]>([false, false]);
  const [observationAnswers, setObservationAnswers] = useState<(number | null)[]>([null, null]);
  const [observationSubmitted, setObservationSubmitted] = useState<boolean[]>([false, false]);

  // Challenges State
  const [currentChallengeIdx, setCurrentChallengeIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [numericInput, setNumericInput] = useState<string>('');
  const [challengeAnswered, setChallengeAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  // SRS & BKT State
  const [bktState, setBktState] = useState<{ [key in NodeId]: ReturnType<typeof createBKTState> }>(() => {
    const initial: Partial<Record<NodeId, ReturnType<typeof createBKTState>>> = {};
    ALL_NODE_IDS.forEach((id) => {
      initial[id] = createBKTState();
    });
    return initial as { [key in NodeId]: ReturnType<typeof createBKTState> };
  });

  const [srsItems, setSrsItems] = useState<{ [key in NodeId]: ReturnType<typeof createReviewItem> }>(() => {
    const initial: Partial<Record<NodeId, ReturnType<typeof createReviewItem>>> = {};
    ALL_NODE_IDS.forEach((id) => {
      initial[id] = createReviewItem(id);
    });
    return initial as { [key in NodeId]: ReturnType<typeof createReviewItem> };
  });

  // Feedback Overlays & Audio/Speech
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHint, setCurrentHint] = useState<string>('');
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);

  // Inactivity Hint Timer
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      const hint = CHALLENGES[currentChallengeIdx]?.hints[0] || 'Observe how temperature and pressure affect the surface molecular equilibrium.';
      setCurrentHint(hint);
      setShowHint(true);
      audioManager.play('hint');
    }, 12000);
  }, [currentChallengeIdx]);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [currentChallengeIdx, resetInactivityTimer]);

  // Gas Properties Data (Tc = Critical Temp in K)
  const gasData = useMemo(
    () => ({
      H2: { name: 'Hydrogen (H₂)', Tc: 33, kBase: 0.5 },
      CH4: { name: 'Methane (CH₄)', Tc: 190, kBase: 1.4 },
      CO2: { name: 'Carbon Dioxide (CO₂)', Tc: 304, kBase: 2.8 },
      NH3: { name: 'Ammonia (NH₃)', Tc: 406, kBase: 4.2 },
      SO2: { name: 'Sulfur Dioxide (SO₂)', Tc: 430, kBase: 5.0 },
    }),
    []
  );

  // Extent of Adsorption Calculation x/m
  const calculatedXm = useMemo(() => {
    const gInfo = gasData[selectedGas];
    const isChemisorption = selectedAdsorbent === 'nickel' || selectedAdsorbent === 'platinum';

    if (!isChemisorption) {
      // Physisorption: decreases with temperature, increases with pressure & Tc
      const tempFactor = Math.max(0.1, 1 - 0.0025 * (temperature - 200));
      const tcFactor = gInfo.Tc / 300;
      if (isothermalMode === 'freundlich' || isothermalMode === 'logarithmic') {
        const k = gInfo.kBase * tempFactor * tcFactor;
        const oneOverN = 0.5;
        return Math.min(6.0, k * Math.pow(pressure, oneOverN));
      } else {
        // Langmuir
        const a = 1.2 * tcFactor * tempFactor;
        const b = 0.3 * tempFactor;
        return Math.min(6.0, (a * pressure) / (1 + b * pressure));
      }
    } else {
      // Chemisorption: peak response around 400 K (activation energy peak)
      const activationPeak = Math.exp(-Math.pow((temperature - 420) / 80, 2));
      const pressureEffect = Math.min(2.0, Math.log10(pressure + 1) * 1.5);
      return Math.min(6.0, (2.0 + 3.5 * activationPeak) * pressureEffect);
    }
  }, [selectedGas, selectedAdsorbent, temperature, pressure, isothermalMode, gasData]);

  // Handlers
  const handleDiscoverySubmit = (idx: number) => {
    setDiscoverySelected(idx);
    setDiscoverySubmitted(true);
    if (idx === DISCOVERY_QUESTION.correctIndex) {
      audioManager.play('celebration');
      speechManager.speak('Correct! Chemisorption requires activation energy to form chemical bonds with the adsorbent surface.');
      setShowSparkle(true);
    } else {
      audioManager.play('error');
      speechManager.speak('Not quite. Consider the energy barrier needed for chemical surface reaction.');
    }
  };

  const handlePredictionSubmit = (qIdx: number, optIdx: number) => {
    const updated = [...predictionAnswers];
    updated[qIdx] = optIdx;
    setPredictionAnswers(updated);

    const sub = [...predictionSubmitted];
    sub[qIdx] = true;
    setPredictionSubmitted(sub);

    if (optIdx === PREDICTION_QUESTIONS[qIdx].correctIndex) {
      audioManager.play('success');
      speechManager.speak('Great prediction! Verify your hypothesis in the interactive lab.');
    } else {
      audioManager.play('error');
    }
  };

  const handleObservationSubmit = (qIdx: number, optIdx: number) => {
    const updated = [...observationAnswers];
    updated[qIdx] = optIdx;
    setObservationAnswers(updated);

    const sub = [...observationSubmitted];
    sub[qIdx] = true;
    setObservationSubmitted(sub);

    if (optIdx === OBSERVATION_QUESTIONS[qIdx].correctIndex) {
      audioManager.play('chime');
    } else {
      audioManager.play('error');
    }
  };

  const handleChallengeAnswer = (optIndex?: number) => {
    const current = CHALLENGES[currentChallengeIdx];
    let isCorrect = false;

    if (current.type === 'numeric') {
      const val = parseFloat(numericInput);
      if (!isNaN(val) && current.numericAnswer !== undefined && current.tolerance !== undefined) {
        isCorrect = Math.abs(val - current.numericAnswer) <= current.tolerance;
      }
    } else {
      const selected = optIndex !== undefined ? optIndex : selectedOption;
      isCorrect = selected === current.correctIndex;
    }

    setChallengeAnswered(true);

    // Update BKT & SRS
    const nodeId = current.nodeId;
    const prevBkt = bktState[nodeId];
    const newBkt = bktUpdate(prevBkt, isCorrect);
    setBktState((prev) => ({ ...prev, [nodeId]: newBkt }));

    const prevSrs = srsItems[nodeId];
    const newSrs = sm2Update(prevSrs, isCorrect ? 5 : 1);
    setSrsItems((prev) => ({ ...prev, [nodeId]: newSrs }));

    if (isCorrect) {
      audioManager.play('drop-correct');
      speechManager.speak('Excellent analysis! Mastered node ' + nodeId);
      setScore((prev) => prev + 10);
      setShowSparkle(true);
      if (currentChallengeIdx === CHALLENGES.length - 1) {
        setShowConfetti(true);
        setShowSuccessBanner(true);
        audioManager.play('celebration');
        recordGameScore('C12_ChemistryAdsorptionisotherms', score + 10, 220);
      }
    } else {
      audioManager.play('drop-wrong');
      const hint = current.hints[0];
      setCurrentHint(hint);
      setShowHint(true);
    }
  };

  const nextChallenge = () => {
    if (currentChallengeIdx < CHALLENGES.length - 1) {
      setCurrentChallengeIdx((prev) => prev + 1);
      setSelectedOption(null);
      setNumericInput('');
      setChallengeAnswered(false);
      setShowHint(false);
      audioManager.play('whoosh');
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 font-sans p-4 md:p-8">
      {/* Header Bar */}
      <header className="max-w-7xl mx-auto mb-8 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-2xl backdrop-blur-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className="bg-gold-500/10 text-gold-400 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-gold-500/20">
              ISC Class 12 Chemistry
            </span>
            <span className="bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-emerald-500/20">
              Surface Chemistry Lab
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-100">{SCENARIO.title}</h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">{SCENARIO.intro}</p>
        </div>

        {/* Score & Mastery Metric */}
        <div className="flex items-center gap-4 bg-slate-950/80 p-3 rounded-xl border border-slate-800">
          <div className="text-center px-2">
            <div className="text-xs text-slate-400 font-medium">Lab Score</div>
            <div className="text-2xl font-black text-gold-400">{score}</div>
          </div>
          <div className="h-8 w-px bg-slate-800" />
          <div className="text-center px-2">
            <div className="text-xs text-slate-400 font-medium">BKT Mastery</div>
            <div className="text-lg font-bold text-emerald-400">
              {(
                (Object.values(bktState).reduce((acc, curr) => acc + masteryProb(curr), 0) /
                  ALL_NODE_IDS.length) *
                100
              ).toFixed(0)}
              %
            </div>
          </div>
        </div>
      </header>

      {/* Primary Navigation Tabs */}
      <nav className="max-w-7xl mx-auto mb-6 flex space-x-2 bg-slate-900/60 p-1.5 rounded-xl border border-slate-800">
        {[
          { id: 'discovery', label: '1. Discovery & Concepts' },
          { id: 'lab', label: '2. Interactive Isotherm Lab' },
          { id: 'challenges', label: `3. ISC Challenges (${currentChallengeIdx + 1}/${CHALLENGES.length})` },
          { id: 'summary', label: '4. Summary & Industrial Application' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id as typeof activeTab);
              audioManager.play('tap');
            }}
            className={`flex-1 py-3 px-4 rounded-lg text-xs md:text-sm font-bold transition-all ${
              activeTab === tab.id
                ? 'bg-gold-500 text-slate-950 shadow-md shadow-gold-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Feedback Components */}
      <HintBubble show={showHint} text={currentHint} />
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccessBanner} text="Mastery Unlocked! Lab Challenges Completed." />
      <SparkleBurst show={showSparkle} x={500} y={300} />

      {/* Main Content Containers */}
      <main className="max-w-7xl mx-auto space-y-6">
        {/* ================= TAB 1: DISCOVERY & CONCEPTS ================= */}
        {activeTab === 'discovery' && (
          <div className="space-y-6">
            {/* Scenario Card */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h2 className="text-xl font-bold text-gold-400 mb-2">Lab Context & Mission</h2>
              <p className="text-slate-300 leading-relaxed text-sm">{SCENARIO.context}</p>
            </div>

            {/* Discovery Question Card */}
            <div className="bg-slate-900/80 border border-gold-500/30 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center gap-2">
                <span className="bg-gold-500/20 text-gold-400 text-xs font-bold px-2.5 py-1 rounded">
                  Discovery Question
                </span>
              </div>
              <h3 className="text-lg font-semibold text-slate-100">{DISCOVERY_QUESTION.question}</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                {DISCOVERY_QUESTION.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleDiscoverySubmit(idx)}
                    className={`p-4 rounded-xl text-left text-sm font-medium transition-all border ${
                      discoverySubmitted
                        ? idx === DISCOVERY_QUESTION.correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                          : idx === discoverySelected
                          ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                          : 'bg-slate-950/40 border-slate-800 text-slate-500'
                        : discoverySelected === idx
                        ? 'bg-gold-950/80 border-gold-500 text-gold-200'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span className="font-bold mr-2">{String.fromCharCode(65 + idx)}.</span> {option}
                  </button>
                ))}
              </div>

              {discoverySubmitted && (
                <div className="mt-4 p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
                  <span className="font-bold text-gold-400">Insight: </span>
                  {DISCOVERY_QUESTION.hintAfter}
                </div>
              )}
            </div>

            {/* Prediction Questions Section */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              <h3 className="text-lg font-bold text-gold-400">Pre-Lab Predictive Hypotheses</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {PREDICTION_QUESTIONS.map((pred, qIdx) => (
                  <div key={qIdx} className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-3">
                    <p className="text-sm font-semibold text-slate-200">{pred.question}</p>
                    <div className="space-y-2">
                      {pred.options.map((opt, optIdx) => (
                        <button
                          key={optIdx}
                          onClick={() => handlePredictionSubmit(qIdx, optIdx)}
                          className={`w-full p-2.5 rounded-lg text-left text-xs font-medium transition-all border ${
                            predictionSubmitted[qIdx]
                              ? optIdx === pred.correctIndex
                                ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300'
                                : optIdx === predictionAnswers[qIdx]
                                ? 'bg-rose-950/80 border-rose-500 text-rose-300'
                                : 'bg-slate-900 border-slate-800 text-slate-500'
                              : predictionAnswers[qIdx] === optIdx
                              ? 'bg-gold-950 border-gold-500 text-gold-200'
                              : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                    {predictionSubmitted[qIdx] && (
                      <div className="text-xs text-emerald-400 font-mono mt-2">
                        Verification: {pred.verifyInstruction}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* SVG Visual Concept Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <PhysisorptionVsChemisorptionSVG adsorptionType="physisorption" />
              <PhysisorptionVsChemisorptionSVG adsorptionType="chemisorption" />
            </div>
          </div>
        )}

        {/* ================= TAB 2: INTERACTIVE ISOTHERM LAB ================= */}
        {activeTab === 'lab' && (
          <div className="space-y-6">
            {/* Interactive Step Instructions */}
            <div className="bg-slate-900/80 border border-gold-500/30 rounded-2xl p-6 shadow-xl">
              <h3 className="text-sm font-bold text-gold-400 uppercase tracking-wider mb-3">
                Exploration Protocols ({EXPLORATION_STEPS.length} Guided Steps)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {EXPLORATION_STEPS.map((step, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-950/70 p-3 rounded-xl border border-slate-800 space-y-1 hover:border-gold-500/40 transition-all"
                  >
                    <div className="text-xs font-bold text-gold-300">{step.title}</div>
                    <div className="text-[11px] text-slate-400 leading-tight">{step.instruction}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Main Interactive Controls & Live Graph */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Control Panel (5 Cols) */}
              <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
                <h3 className="text-base font-bold text-slate-200 border-b border-slate-800 pb-2">
                  Chamber Parameters & Controls
                </h3>

                {/* Adsorbent Material */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">
                    Solid Adsorbent Surface
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'charcoal', label: 'Activated Charcoal (Physisorption)' },
                      { id: 'silica', label: 'Silica Gel (Physisorption)' },
                      { id: 'nickel', label: 'Finely Nickel (Chemisorption)' },
                      { id: 'platinum', label: 'Platinum Black (Chemisorption)' },
                    ].map((ad) => (
                      <button
                        key={ad.id}
                        onClick={() => {
                          setSelectedAdsorbent(ad.id as typeof selectedAdsorbent);
                          audioManager.play('tap');
                        }}
                        className={`p-2.5 text-xs font-semibold rounded-lg border transition-all text-left ${
                          selectedAdsorbent === ad.id
                            ? 'bg-gold-500 text-slate-950 border-gold-400 font-bold'
                            : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        {ad.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Gas Selection */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">
                    Adsorbate Gas (Critical Temp Tc)
                  </label>
                  <select
                    value={selectedGas}
                    onChange={(e) => {
                      setSelectedGas(e.target.value as typeof selectedGas);
                      audioManager.play('tap');
                    }}
                    className="w-full bg-slate-950 text-slate-200 border border-slate-800 rounded-lg p-3 text-xs font-semibold focus:outline-none focus:border-gold-500"
                  >
                    {Object.entries(gasData).map(([key, info]) => (
                      <option key={key} value={key}>
                        {info.name} - Tc: {info.Tc} K
                      </option>
                    ))}
                  </select>
                </div>

                {/* Temperature Slider */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-semibold text-slate-400 uppercase">Chamber Temperature (T)</label>
                    <span className="text-xs font-mono font-bold text-gold-400">{temperature} K</span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="600"
                    step="5"
                    value={temperature}
                    onChange={(e) => setTemperature(parseFloat(e.target.value))}
                    className="w-full accent-gold-500"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                    <span>100 K (Cryogenic)</span>
                    <span>298 K (Room)</span>
                    <span>600 K (High T)</span>
                  </div>
                </div>

                {/* Pressure Slider */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-semibold text-slate-400 uppercase">Equilibrium Pressure (P)</label>
                    <span className="text-xs font-mono font-bold text-gold-400">{pressure.toFixed(1)} atm</span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="10.0"
                    step="0.1"
                    value={pressure}
                    onChange={(e) => setPressure(parseFloat(e.target.value))}
                    className="w-full accent-gold-500"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                    <span>0.1 atm (Low)</span>
                    <span>5.0 atm (Moderate)</span>
                    <span>10.0 atm (Saturation)</span>
                  </div>
                </div>

                {/* Isotherm Equation Toggle */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">
                    Mathematical Model
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'freundlich', label: 'Freundlich' },
                      { id: 'langmuir', label: 'Langmuir' },
                      { id: 'logarithmic', label: 'Log Plot' },
                    ].map((m) => (
                      <button
                        key={m.id}
                        onClick={() => {
                          setIsothermalMode(m.id as typeof isothermalMode);
                          audioManager.play('tap');
                        }}
                        className={`p-2 text-xs font-semibold rounded-lg border transition-all ${
                          isothermalMode === m.id
                            ? 'bg-gold-500 text-slate-950 border-gold-400 font-bold'
                            : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Visualization Column (7 Cols) */}
              <div className="lg:col-span-7 space-y-6">
                <IsothermGraphSVG
                  pressure={pressure}
                  extent={calculatedXm}
                  mode={isothermalMode}
                  temp={temperature}
                />

                {/* Live Molecular Chamber & Stats */}
                <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <div className="text-xs text-slate-400 font-medium">Calculated x/m</div>
                    <div className="text-2xl font-black text-gold-400 mt-1">{calculatedXm.toFixed(3)}</div>
                    <div className="text-[10px] text-slate-500">grams gas per gram solid</div>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <div className="text-xs text-slate-400 font-medium">Freundlich 1/n Exponent</div>
                    <div className="text-2xl font-black text-emerald-400 mt-1">
                      {pressure > 8.0 ? '0.05 (Saturation)' : pressure < 1.0 ? '0.95 (Linear)' : '0.50 (Moderate)'}
                    </div>
                    <div className="text-[10px] text-slate-500">0 ≤ 1/n ≤ 1</div>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <div className="text-xs text-slate-400 font-medium">Enthalpy ΔH</div>
                    <div className="text-2xl font-black text-gold-400 mt-1">
                      {selectedAdsorbent === 'nickel' || selectedAdsorbent === 'platinum'
                        ? '180 kJ/mol'
                        : '32 kJ/mol'}
                    </div>
                    <div className="text-[10px] text-slate-500">
                      {selectedAdsorbent === 'nickel' || selectedAdsorbent === 'platinum'
                        ? 'Chemisorption'
                        : 'Physisorption'}
                    </div>
                  </div>
                </div>

                {/* Heterogeneous Catalysis Stage Explorer */}
                <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-bold text-emerald-400 uppercase tracking-wide">
                      Heterogeneous Catalysis Step-by-Step
                    </h4>
                    <div className="flex space-x-2">
                      {[0, 1, 2, 3].map((stg) => (
                        <button
                          key={stg}
                          onClick={() => {
                            setCatalysisStage(stg);
                            audioManager.play('pop');
                          }}
                          className={`w-7 h-7 text-xs font-bold rounded-full transition-all ${
                            catalysisStage === stg
                              ? 'bg-emerald-500 text-slate-950'
                              : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                          }`}
                        >
                          {stg + 1}
                        </button>
                      ))}
                    </div>
                  </div>
                  <CatalysisMechanismSVG stage={catalysisStage} />
                </div>
              </div>
            </div>

            {/* Observation Questions Section */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              <h3 className="text-lg font-bold text-gold-400">Post-Lab Observation Verification</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {OBSERVATION_QUESTIONS.map((obs, qIdx) => (
                  <div key={qIdx} className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-3">
                    <p className="text-sm font-semibold text-slate-200">{obs.question}</p>
                    <div className="space-y-2">
                      {obs.observableOptions.map((opt, optIdx) => (
                        <button
                          key={optIdx}
                          onClick={() => handleObservationSubmit(qIdx, optIdx)}
                          className={`w-full p-2.5 rounded-lg text-left text-xs font-medium transition-all border ${
                            observationSubmitted[qIdx]
                              ? optIdx === obs.correctIndex
                                ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300'
                                : optIdx === observationAnswers[qIdx]
                                ? 'bg-rose-950/80 border-rose-500 text-rose-300'
                                : 'bg-slate-900 border-slate-800 text-slate-500'
                              : observationAnswers[qIdx] === optIdx
                              ? 'bg-gold-950 border-gold-500 text-gold-200'
                              : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
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

        {/* ================= TAB 3: ISC CHALLENGES ================= */}
        {activeTab === 'challenges' && (
          <div className="space-y-6">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              {/* Challenge Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-800 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full ${
                        CHALLENGES[currentChallengeIdx].difficulty === 'foundation'
                          ? 'bg-gold-500/20 text-gold-400 border border-gold-500/30'
                          : CHALLENGES[currentChallengeIdx].difficulty === 'standard'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      }`}
                    >
                      {CHALLENGES[currentChallengeIdx].difficulty} Tier
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      Node ID: {CHALLENGES[currentChallengeIdx].nodeId}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-100 mt-1">
                    Challenge {currentChallengeIdx + 1} of {CHALLENGES.length}: {CHALLENGES[currentChallengeIdx].competencyLevel}
                  </h3>
                </div>
                <div className="text-xs font-mono text-gold-400 bg-gold-950/80 px-3 py-1.5 rounded-lg border border-gold-800">
                  Topic: Surface Adsorption & Isotherms
                </div>
              </div>

              {/* Question Text */}
              <p className="text-base font-medium text-slate-200 leading-relaxed">
                {CHALLENGES[currentChallengeIdx].question}
              </p>

              {/* Options or Input */}
              {CHALLENGES[currentChallengeIdx].type === 'numeric' ? (
                <div className="space-y-3 max-w-md">
                  <label className="block text-xs font-semibold text-slate-400 uppercase">
                    Enter Numerical Value ({CHALLENGES[currentChallengeIdx].unit})
                  </label>
                  <div className="flex gap-3">
                    <input
                      type="number"
                      step="any"
                      value={numericInput}
                      onChange={(e) => setNumericInput(e.target.value)}
                      disabled={challengeAnswered}
                      placeholder="Type answer..."
                      className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-gold-300 font-mono text-sm focus:outline-none focus:border-gold-500 flex-1"
                    />
                    {!challengeAnswered && (
                      <button
                        onClick={() => handleChallengeAnswer()}
                        className="bg-gold-500 text-slate-950 px-6 py-3 rounded-xl font-bold text-sm hover:bg-gold-400 transition-all"
                      >
                        Submit
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {CHALLENGES[currentChallengeIdx].options.map((opt, idx) => (
                    <button
                      key={idx}
                      disabled={challengeAnswered}
                      onClick={() => {
                        setSelectedOption(idx);
                        handleChallengeAnswer(idx);
                      }}
                      className={`p-4 rounded-xl text-left text-xs md:text-sm font-medium transition-all border ${
                        challengeAnswered
                          ? idx === CHALLENGES[currentChallengeIdx].correctIndex
                            ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                            : idx === selectedOption
                            ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                            : 'bg-slate-950/40 border-slate-800 text-slate-500'
                          : selectedOption === idx
                          ? 'bg-gold-950 border-gold-500 text-gold-200'
                          : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <span className="font-bold mr-2 text-gold-400">{String.fromCharCode(65 + idx)}.</span> {opt}
                    </button>
                  ))}
                </div>
              )}

              {/* Explanation & Next Step */}
              {challengeAnswered && (
                <div className="mt-6 p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gold-400 mb-1">
                      Detailed Explanation
                    </h4>
                    <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                      {CHALLENGES[currentChallengeIdx].explanation}
                    </p>
                  </div>

                  {CHALLENGES[currentChallengeIdx].misconceptionIndex !== undefined && (
                    <div className="p-3 rounded-lg bg-amber-950/50 border border-amber-500/30 text-xs text-amber-200">
                      <span className="font-bold">Common Misconception Alert: </span>
                      {MISCONCEPTIONS[CHALLENGES[currentChallengeIdx].misconceptionIndex!].correction}
                    </div>
                  )}

                  <div className="flex justify-end">
                    <button
                      onClick={nextChallenge}
                      className="bg-emerald-500 text-slate-950 px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-emerald-400 transition-all flex items-center gap-2"
                    >
                      Next Challenge →
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= TAB 4: SUMMARY & INDUSTRIAL APPLICATION ================= */}
        {activeTab === 'summary' && (
          <div className="space-y-6">
            {/* Real World Industrial Activity */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center gap-2">
                <span className="bg-emerald-500/20 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/30 uppercase">
                  Industrial Chemistry Case Study
                </span>
              </div>
              <h2 className="text-xl font-bold text-slate-100">{REAL_WORLD_ACTIVITY.title}</h2>
              <p className="text-sm text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold text-gold-400 uppercase tracking-wider">
                  Calibration Steps & Calculation Procedure
                </h4>
                <ol className="space-y-2">
                  {REAL_WORLD_ACTIVITY.steps.map((st, i) => (
                    <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                      <span className="font-bold text-emerald-400 font-mono">{i + 1}.</span>
                      <span>{st}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Diagnostic Questions Review Grid */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <h3 className="text-lg font-bold text-gold-400">Mastery Assessment Diagnostic Questions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {DIAGNOSTIC_QUESTIONS.map((dq) => (
                  <div key={dq.id} className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-slate-400 font-mono">{dq.nodeId}</span>
                      <span className="text-emerald-400 font-bold">Verified Concept</span>
                    </div>
                    <p className="text-xs font-semibold text-slate-200">{dq.question}</p>
                    <p className="text-[11px] text-slate-400 italic">Ans: {dq.options[dq.correctIndex]}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Topic Graph & Competency Node Map */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <h3 className="text-base font-bold text-slate-200">ISC Surface Chemistry Node Mastery Matrix</h3>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {ALL_NODE_IDS.map((id) => {
                  const level = masteryProb(bktState[id]);
                  return (
                    <div key={id} className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
                      <div className="text-[10px] text-slate-400 font-mono">{id}</div>
                      <div className="text-xs font-bold text-gold-300 mt-1">
                        {(level * 100).toFixed(0)}%
                      </div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                        <div
                          className="bg-gold-500 h-full transition-all duration-500"
                          style={{ width: `${level * 100}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}