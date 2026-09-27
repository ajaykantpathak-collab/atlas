'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// --- ALL COVERED NODE IDS ---
const ALL_NODE_IDS = [
  'c11_chem_cbse_006',
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
  'c11_chem_cbse_025',
  'c11_chem_cbse_026',
  'c11_chem_cbse_027',
  'c11_chem_cbse_028',
] as const;

type NodeId = (typeof ALL_NODE_IDS)[number];

// --- MANDATORY DATA STRUCTURES ---

const SCENARIO = {
  title: 'ISC Energetics & Chemical Thermodynamics Virtual Research Lab',
  intro: 'Welcome to the Thermochemistry & Chemical Thermodynamics Virtual Research Facility. As senior chemical engineer, you will analyze heat flow, internal energy changes, entropy drives, and Gibbs free energy across physical transformations and chemical reactions.',
  context: 'Utilize high-precision bomb calorimeters, isothermal/adiabatic expansion pistons, Hess cycle builders, and spontaneity simulators to master the fundamental laws governing energy in matter.'
};

const DISCOVERY_QUESTION = {
  question: 'When solid ammonium nitrate dissolves in room temperature water, the solution rapidly cools down to near freezing, yet the dissolution happens rapidly and spontaneously. How can an endothermic reaction (absorbing heat) proceed naturally without external energy input?',
  options: [
    'The temperature drop creates extra internal mass that drives the reaction forward.',
    'The massive increase in molecular entropy (disorder) compensates for heat absorption, making ΔG negative.',
    'Endothermic reactions are always spontaneous regardless of temperature or disorder.',
    'Water molecules form covalent bonds with nitrate ions, releasing hidden kinetic heat.'
  ],
  correctIndex: 1,
  hintAfter: 'Spontaneity is controlled by Gibbs Free Energy: ΔG = ΔH - TΔS. A large positive entropy change (+ΔS) makes -TΔS dominant, yielding a negative ΔG!'
};

const DEFAULT_PROPS = {
  initialNodeId: 'c11_chem_cbse_006' as NodeId,
};

const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: P-V Gas Expansion Work & System Boundaries',
    instruction: 'Adjust expansion mode (Reversible vs Irreversible) and cylinder boundary insulation. Compare work w = -P_ext ΔV against isothermal/adiabatic energy curves.',
    interactionType: 'piston_expansion',
    nodeId: 'c11_chem_cbse_009'
  },
  {
    title: 'Lab 2: Bomb Calorimetry & Constant Volume Heat (ΔU)',
    instruction: 'Ignite fuel samples in a steel bomb bomb calorimeter surrounded by a calibrated water bath. Measure ΔT to derive heat capacity q_v and compute ΔH = ΔU + Δn_g RT.',
    interactionType: 'calorimetry',
    nodeId: 'c11_chem_cbse_012'
  },
  {
    title: 'Lab 3: Hess Law Thermochemical Cycle Matrix',
    instruction: 'Construct multi-step target reactions by manipulating intermediate thermochemical steps. Sum enthalpy changes to prove path independence.',
    interactionType: 'hess_cycle',
    nodeId: 'c11_chem_cbse_015'
  },
  {
    title: 'Lab 4: Molecular Bond Enthalpy & Reaction Heat',
    instruction: 'Select reactants and products. Calculate total energy required to cleave reactant bonds versus energy released forming product bonds.',
    interactionType: 'bond_energies',
    nodeId: 'c11_chem_cbse_017'
  },
  {
    title: 'Lab 5: Gibbs Free Energy & Spontaneity Predictor',
    instruction: 'Vary enthalpy ΔH, entropy ΔS, and absolute temperature T. Graph ΔG = ΔH - TΔS in real time and monitor reaction spontaneity and equilibrium constant K.',
    interactionType: 'gibbs_spontaneity',
    nodeId: 'c11_chem_cbse_023'
  }
];

const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: For the complete combustion of 1 mole of liquid ethanol: C2H5OH(l) + 3 O2(g) -> 2 CO2(g) + 3 H2O(l) at 298 K, how does ΔH compare to ΔU?',
    options: [
      'ΔH < ΔU because Δn_g is negative (-1 mole of gas)',
      'ΔH > ΔU because heat is released into surroundings',
      'ΔH = ΔU because liquid water balances the reaction',
      'ΔH is zero because combustion is an equilibrium state'
    ],
    correctIndex: 0,
    verifyInstruction: 'Calculate Δn_g = moles product gas (2) - moles reactant gas (3) = -1. Since ΔH = ΔU + Δn_g RT, ΔH = ΔU - (1)RT < ΔU.',
    nodeId: 'c11_chem_cbse_010'
  },
  {
    question: 'Predict: Under what temperature regime will an endothermic reaction (ΔH > 0) with positive entropy change (ΔS > 0) become spontaneous?',
    options: [
      'At low temperatures below T = ΔH / ΔS',
      'At high temperatures above T = ΔH / ΔS',
      'At all temperatures without exception',
      'It will never be spontaneous at any temperature'
    ],
    correctIndex: 1,
    verifyInstruction: 'In ΔG = ΔH - TΔS, when both ΔH > 0 and ΔS > 0, ΔG becomes negative only when TΔS > ΔH, i.e., T > ΔH / ΔS.',
    nodeId: 'c11_chem_cbse_024'
  }
];

const OBSERVATION_QUESTIONS = [
  {
    question: 'In the P-V Gas Expansion simulator, why is the total work done during a reversible isothermal expansion strictly greater than an irreversible expansion between the same initial and final volumes?',
    observableOptions: [
      'Reversible work is performed against maximum opposing pressure at every infinitesimal step of expansion',
      'Irreversible expansion destroys gas molecules through friction with cylinder walls',
      'Reversible expansion operates without heat exchange with surroundings',
      'Irreversible work converts gas pressure into chemical bond enthalpy'
    ],
    correctIndex: 0,
    nodeId: 'c11_chem_cbse_009'
  },
  {
    question: 'In the Gibbs Free Energy simulator, what happens to the system when ΔG = 0?',
    observableOptions: [
      'The chemical reaction stops completely and temperature reaches absolute zero',
      'The system reaches dynamic equilibrium where forward and reverse rate constants balance',
      'The reaction undergoes violent thermal explosion',
      'The entropy of the universe drops to zero'
    ],
    correctIndex: 1,
    nodeId: 'c11_chem_cbse_025'
  }
];

const REAL_WORLD_ACTIVITY = {
  title: 'Rocket Engine Propellant Thermochemical Optimization',
  description: 'Apply thermochemical state functions, Hess law cycles, and Gibbs free energy calculations to evaluate rocket propellant combustion efficiency for space launch systems.',
  steps: [
    'Analyze combustion of Liquid Hydrogen fuel: H2(g) + 0.5 O2(g) -> H2O(g). Standard ΔfH°(H2O, g) = -241.8 kJ/mol.',
    'Compute internal energy release ΔU° using Δn_g = 1 - 1.5 = -0.5 mol at ignition temp T = 3000 K. ΔU° = ΔH° - Δn_g RT = -241.8 - (-0.5 * 8.314 * 3000 / 1000) = -229.33 kJ/mol.',
    'Evaluate rocket exhaust entropy ΔS° and compute Gibbs energy ΔG° at exhaust temperature to maximize specific impulse (Isp).',
    'Verify thermodynamic efficiency η = 1 - (T_cold / T_hot) for nozzle design parameters.'
  ]
};

const MISCONCEPTIONS = [
  {
    id: 'misc_1',
    misconception: 'Heat (q) and Work (w) are state functions like Internal Energy.',
    correction: 'Heat and work are path functions because their exact values depend on the specific path taken between states. Internal energy (U), Enthalpy (H), Entropy (S), and Gibbs Energy (G) are state functions.'
  },
  {
    id: 'misc_2',
    misconception: 'An exothermic reaction (ΔH < 0) is always spontaneous.',
    correction: 'Spontaneity depends on Gibbs free energy change ΔG = ΔH - TΔS. An exothermic reaction with negative ΔS will become non-spontaneous at high temperatures when TΔS outweighs ΔH.'
  },
  {
    id: 'misc_3',
    misconception: 'ΔH and ΔU are always identical in chemical reactions.',
    correction: 'ΔH = ΔU + Δn_g RT. They are equal only when Δn_g = 0 (no change in moles of gas) or in constant-volume systems where no PV expansion work occurs.'
  },
  {
    id: 'misc_4',
    misconception: 'Dissolving salts that cool down water violates the Second Law of Thermodynamics.',
    correction: 'Even though system entropy or heat absorption occurs, total universe entropy ΔS_total = ΔS_sys + ΔS_surr is positive due to massive structural entropy gain of dissolved ions.'
  },
  {
    id: 'misc_5',
    misconception: 'Standard enthalpy of formation ΔfH° of compounds is zero.',
    correction: 'Only pure elements in their most stable standard state at 298 K and 1 bar (e.g., O2(g), C(graphite), N2(g)) are assigned ΔfH° = 0 by international convention.'
  },
  {
    id: 'misc_6',
    misconception: 'At absolute zero (0 K), entropy of all substances is zero.',
    correction: 'Third Law states that entropy of a PERFECTLY crystalline solid approaches zero at 0 K. Amorphous materials or random solid solutions retain non-zero residual entropy.'
  }
];

// --- 23 INTERACTIVE CHALLENGES ---

interface BaseChallenge {
  id: string;
  nodeId: NodeId;
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: string;
  question: string;
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
}

interface MultipleChoiceChallenge extends BaseChallenge {
  type: 'multiple_choice';
  options: string[];
  correctIndex: number;
}

interface NumericChallenge extends BaseChallenge {
  type: 'numeric';
  correctAnswer: number;
  tolerance: number;
  unit: string;
}

type Challenge = MultipleChoiceChallenge | NumericChallenge;

const CHALLENGES: Challenge[] = [
  // Foundation Tier (006 - 012)
  {
    id: 'ch_01',
    nodeId: 'c11_chem_cbse_006',
    type: 'multiple_choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall & Classification',
    question: 'Which type of thermodynamic system permits the exchange of BOTH energy and matter with its surroundings?',
    options: ['Open system', 'Closed system', 'Isolated system', 'Adiabatic system'],
    correctIndex: 0,
    explanation: 'An open system can transfer both mass and thermal/mechanical energy across its boundary (e.g., an open beaker of boiling liquid).',
    hints: [
      'Think about a coffee cup without a lid.',
      'Steam escapes (matter) and heat escapes (energy).',
      'This system boundary allows free exchange of both.'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'ch_02',
    nodeId: 'c11_chem_cbse_007',
    type: 'multiple_choice',
    difficulty: 'foundation',
    competencyLevel: 'State Function Analysis',
    question: 'Which of the following pairs contains EXCLUSIVELY state functions?',
    options: [
      'Heat (q) and Work (w)',
      'Internal Energy (U) and Enthalpy (H)',
      'Heat (q) and Enthalpy (H)',
      'Work (w) and Entropy (S)'
    ],
    correctIndex: 1,
    explanation: 'Internal Energy (U) and Enthalpy (H) depend solely on initial and final states of the system, unlike q and w which depend on process path.',
    hints: [
      'Path functions depend on how you travel from state A to B.',
      'Heat (q) and work (w) vary by pathway.',
      'State functions depend only on system state.'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'ch_03',
    nodeId: 'c11_chem_cbse_008',
    type: 'multiple_choice',
    difficulty: 'foundation',
    competencyLevel: 'First Law Application',
    question: 'According to the First Law of Thermodynamics (ΔU = q + w), in an ADIABATIC process (q = 0), what does ΔU equal?',
    options: ['w (adiabatic work)', 'q + pΔV', '0', 'ΔH'],
    correctIndex: 0,
    explanation: 'For an adiabatic boundary, heat exchange q = 0, so ΔU = w_adj. All change in internal energy comes from mechanical work.',
    hints: [
      'Adiabatic condition means no heat enters or leaves: q = 0.',
      'Substitute q = 0 into ΔU = q + w.',
      'ΔU simplifies to w.'
    ]
  },
  {
    id: 'ch_04',
    nodeId: 'c11_chem_cbse_009',
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'Work Calculation',
    question: 'Calculate the work done (in Joules) when a gas expands against a constant external pressure of 2.0 bar from a volume of 1.0 L to 4.0 L. (Note: 1 L·bar = 100 J; use sign convention w = -P_ext ΔV)',
    correctAnswer: -600,
    tolerance: 5,
    unit: 'J',
    explanation: 'w = -P_ext ΔV = -(2.0 bar) * (4.0 L - 1.0 L) = -6.0 L·bar. Converting to Joules: -6.0 * 100 J = -600 J.',
    hints: [
      'Calculate ΔV = V_final - V_initial = 4.0 - 1.0 = 3.0 L.',
      'Multiply external pressure: P_ext * ΔV = 2.0 * 3.0 = 6.0 L·bar.',
      'Apply sign convention w = -P_ext ΔV and multiply by 100 J/L·bar.'
    ]
  },
  {
    id: 'ch_05',
    nodeId: 'c11_chem_cbse_010',
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'Gas Mole Change Δn_g',
    question: 'What is the value of Δn_g (change in moles of gaseous species) for the Haber synthesis reaction: N2(g) + 3 H2(g) -> 2 NH3(g)?',
    correctAnswer: -2,
    tolerance: 0,
    unit: 'moles',
    explanation: 'Δn_g = (moles of product gas) - (moles of reactant gas) = 2 - (1 + 3) = 2 - 4 = -2 mol.',
    hints: [
      'Count moles of gas products: 2 NH3 = 2.',
      'Count moles of gas reactants: 1 N2 + 3 H2 = 4.',
      'Subtract: 2 - 4 = -2.'
    ],
    misconceptionIndex: 2
  },
  {
    id: 'ch_06',
    nodeId: 'c11_chem_cbse_011',
    type: 'multiple_choice',
    difficulty: 'foundation',
    competencyLevel: 'Molar Heat Capacities',
    question: 'For 1 mole of an ideal gas, what is the exact relationship between molar heat capacity at constant pressure (C_p) and constant volume (C_v)?',
    options: ['C_p - C_v = R', 'C_v - C_p = R', 'C_p / C_v = R', 'C_p + C_v = R'],
    correctIndex: 0,
    explanation: 'Mayer\'s relation states C_p - C_v = R for ideal gases, because expansion work must be performed when heating at constant pressure.',
    hints: [
      'At constant pressure, energy is needed for both temperature rise and expansion work.',
      'Thus C_p is strictly larger than C_v.',
      'The difference equals the universal gas constant R.'
    ]
  },
  {
    id: 'ch_07',
    nodeId: 'c11_chem_cbse_012',
    type: 'multiple_choice',
    difficulty: 'foundation',
    competencyLevel: 'Calorimetry Fundamentals',
    question: 'In a rigid steel bomb calorimeter maintained at constant volume, what property is directly measured by heat transfer q_v?',
    options: [
      'Internal Energy Change (ΔU)',
      'Enthalpy Change (ΔH)',
      'Gibbs Free Energy Change (ΔG)',
      'Entropy Change (ΔS)'
    ],
    correctIndex: 0,
    explanation: 'At constant volume, expansion work w = 0, so ΔU = q_v. Bomb calorimeters measure ΔU directly.',
    hints: [
      'A rigid bomb container cannot expand (ΔV = 0).',
      'When ΔV = 0, expansion work w = -P ΔV = 0.',
      'From First Law ΔU = q + w, so ΔU = q_v.'
    ]
  },

  // Standard Tier (013 - 020)
  {
    id: 'ch_08',
    nodeId: 'c11_chem_cbse_013',
    type: 'multiple_choice',
    difficulty: 'standard',
    competencyLevel: 'Thermochemical Equation Manipulation',
    question: 'If standard reaction enthalpy for C(s) + O2(g) -> CO2(g) is Δr H° = -393.5 kJ/mol, what is Δr H° for the reverse reaction 2 CO2(g) -> 2 C(s) + 2 O2(g)?',
    options: ['+787.0 kJ/mol', '-787.0 kJ/mol', '+393.5 kJ/mol', '-393.5 kJ/mol'],
    correctIndex: 0,
    explanation: 'Reversing the equation changes the sign of ΔH (+393.5 kJ/mol). Doubling stoichiometric coefficients doubles ΔH: 2 * (+393.5) = +787.0 kJ/mol.',
    hints: [
      'Reversing reaction flips the sign of ΔH from negative to positive.',
      'Multiplying stoichiometric coefficients by 2 multiplies ΔH by 2.',
      '+393.5 * 2 = +787.0 kJ/mol.'
    ]
  },
  {
    id: 'ch_09',
    nodeId: 'c11_chem_cbse_014',
    type: 'multiple_choice',
    difficulty: 'standard',
    competencyLevel: 'Standard States & Enthalpy of Formation',
    question: 'By thermodynamic convention, which of the following substances has a standard enthalpy of formation (Δf H°) equal to ZERO at 298 K?',
    options: [
      'O2(g) at 1 bar pressure',
      'H2O(l) at 1 bar pressure',
      'CO2(g) at 1 bar pressure',
      'O3(g) ozone gas'
    ],
    correctIndex: 0,
    explanation: 'Pure elements in their most stable physical reference state at 298 K and 1 bar (like dioxygen O2 gas) are assigned Δf H° = 0.',
    hints: [
      'Δf H° = 0 applies to elements in standard reference state.',
      'H2O and CO2 are compounds, so Δf H° ≠ 0.',
      'O2 gas is the standard elemental form of oxygen, whereas O3 is an allotrope.'
    ],
    misconceptionIndex: 4
  },
  {
    id: 'ch_10',
    nodeId: 'c11_chem_cbse_015',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Hess Law Problem Solving',
    question: 'Given:\n1) C(s) + O2(g) -> CO2(g)  ΔH1 = -393.5 kJ\n2) CO(g) + 0.5 O2(g) -> CO2(g)  ΔH2 = -283.0 kJ\nCalculate ΔH (in kJ) for C(s) + 0.5 O2(g) -> CO(g).',
    correctAnswer: -110.5,
    tolerance: 0.5,
    unit: 'kJ',
    explanation: 'Target reaction = Step (1) - Step (2). ΔH = ΔH1 - ΔH2 = -393.5 - (-283.0) = -110.5 kJ.',
    hints: [
      'Subtract equation (2) from equation (1) so CO2 cancels out.',
      'Equation (1) - Equation (2): C + O2 - CO - 0.5 O2 -> CO2 - CO2.',
      'Calculated ΔH = -393.5 - (-283.0) = -110.5 kJ.'
    ]
  },
  {
    id: 'ch_11',
    nodeId: 'c11_chem_cbse_016',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Enthalpy of Combustion Analysis',
    question: 'Combustion of 1.00 g of ethanol CH3CH2OH (molar mass = 46.07 g/mol) releases 29.7 kJ of heat in a open calorimeter. Calculate standard molar enthalpy of combustion ��c H° (in kJ/mol).',
    correctAnswer: -1368.2,
    tolerance: 10,
    unit: 'kJ/mol',
    explanation: 'Molar enthalpy Δc H° = -(heat released per gram) * (molar mass) = -29.7 kJ/g * 46.07 g/mol = -1368.28 kJ/mol.',
    hints: [
      'Heat released means reaction is exothermic (negative sign).',
      'Calculate heat per mole: -29.7 kJ / (1.00 g / 46.07 g/mol).',
      'Result is approx -1368 kJ/mol.'
    ]
  },
  {
    id: 'ch_12',
    nodeId: 'c11_chem_cbse_017',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Bond Enthalpy Calculations',
    question: 'Estimate Δr H (in kJ/mol) for H2(g) + Cl2(g) -> 2 HCl(g) given mean bond enthalpies: B.E.(H-H) = 436 kJ/mol, B.E.(Cl-Cl) = 242 kJ/mol, B.E.(H-Cl) = 431 kJ/mol.',
    correctAnswer: -184,
    tolerance: 2,
    unit: 'kJ/mol',
    explanation: 'Δr H = sum(bonds broken) - sum(bonds formed) = [436 + 242] - [2 * 431] = 678 - 862 = -184 kJ/mol.',
    hints: [
      'Bonds broken in reactants: 1 mole H-H (436) + 1 mole Cl-Cl (242) = 678 kJ.',
      'Bonds formed in products: 2 moles H-Cl (2 * 431) = 862 kJ.',
      'ΔH = broken - formed = 678 - 862 = -184 kJ/mol.'
    ]
  },
  {
    id: 'ch_13',
    nodeId: 'c11_chem_cbse_018',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Phase Change Entropy',
    question: 'Standard enthalpy of vaporization Δvap H° of water at 373 K is +40.66 kJ/mol. Calculate standard entropy of vaporization Δvap S° in J/(mol·K).',
    correctAnswer: 109,
    tolerance: 2,
    unit: 'J/(mol·K)',
    explanation: 'At phase transition boiling point equilibrium: ΔS = Δvap H / T = (40660 J/mol) / (373 K) = 108.99 ≈ 109 J/(mol·K).',
    hints: [
      'Convert enthalpy from kJ/mol to J/mol: 40.66 * 1000 = 40660 J/mol.',
      'At equilibrium boiling point T = 373 K, ΔG = 0, so ΔS = ΔH / T.',
      '40660 / 373 = 108.99 J/(mol·K).'
    ]
  },
  {
    id: 'ch_14',
    nodeId: 'c11_chem_cbse_019',
    type: 'multiple_choice',
    difficulty: 'standard',
    competencyLevel: 'Lattice Enthalpy & Born-Haber Cycle',
    question: 'According to Born-Haber thermochemical cycles, what is the relation between Enthalpy of Solution (Δsol H°), Lattice Enthalpy (Δlattice H°), and Hydration Enthalpy (Δhyd H°)?',
    options: [
      'Δsol H° = Δlattice H° + Δhyd H°',
      'Δsol H° = Δlattice H° - Δhyd H°',
      'Δsol H° = Δhyd H° - Δlattice H°',
      'Δsol H° = Δlattice H° * Δhyd H°'
    ],
    correctIndex: 0,
    explanation: 'Dissolution involves breaking ionic lattice (+Δlattice H°) followed by hydration of gaseous ions (-Δhyd H°). Total Δsol H° = Δlattice H° + Δhyd H°.',
    hints: [
      'First, lattice is separated into gaseous ions (endothermic, +Δlattice H°).',
      'Second, gaseous ions interact with water (exothermic, -Δhyd H°).',
      'Sum of both processes gives Δsol H° = Δlattice H° + Δhyd H°.'
    ]
  },
  {
    id: 'ch_15',
    nodeId: 'c11_chem_cbse_020',
    type: 'multiple_choice',
    difficulty: 'standard',
    competencyLevel: 'Spontaneity Criteria',
    question: 'For any spontaneous change occurring inside an ISOLATED system, what must be true regarding total entropy change (ΔS_isolated)?',
    options: ['ΔS_isolated > 0', 'ΔS_isolated < 0', 'ΔS_isolated = 0', 'ΔS_isolated is constant zero'],
    correctIndex: 0,
    explanation: 'Second Law of Thermodynamics states that spontaneous processes in isolated systems always increase system entropy (ΔS > 0).',
    hints: [
      'In an isolated system, no energy/matter exchanges with surroundings.',
      'The isolated system IS the entire universe in microcosm.',
      'Spontaneous changes increase total disorder (ΔS > 0).'
    ],
    misconceptionIndex: 3
  },

  // Advanced Tier (021 - 028)
  {
    id: 'ch_16',
    nodeId: 'c11_chem_cbse_021',
    type: 'multiple_choice',
    difficulty: 'advanced',
    competencyLevel: 'Entropy Ordering Analysis',
    question: 'Which sequence correctly arranges 1 mole of substance in order of INCREASING absolute molar entropy S° at 298 K?',
    options: [
      'Solid H2O < Liquid H2O < Gaseous H2O',
      'Gaseous H2O < Liquid H2O < Solid H2O',
      'Liquid H2O < Solid H2O < Gaseous H2O',
      'Solid H2O < Gaseous H2O < Liquid H2O'
    ],
    correctIndex: 0,
    explanation: 'Order of randomness and microstates increases from rigid crystalline solid < mobile liquid < highly dispersed gas.',
    hints: [
      'Solids have fixed lattice structure (lowest entropy).',
      'Liquids have short-range translational freedom (medium entropy).',
      'Gases have chaotic high volume microstates (highest entropy).'
    ]
  },
  {
    id: 'ch_17',
    nodeId: 'c11_chem_cbse_022',
    type: 'multiple_choice',
    difficulty: 'advanced',
    competencyLevel: 'Reaction Entropy Prediction',
    question: 'In which of the following chemical transformations is standard entropy change ΔS° strictly POSITIVE (+)?',
    options: [
      'CaCO3(s) -> CaO(s) + CO2(g)',
      'N2(g) + 3 H2(g) -> 2 NH3(g)',
      '2 SO2(g) + O2(g) -> 2 SO3(g)',
      'H2O(g) -> H2O(l)'
    ],
    correctIndex: 0,
    explanation: 'Decomposition of solid CaCO3 generates 1 mole of gas CO2(g). Production of gas from solid significantly increases system microstates (ΔS > 0).',
    hints: [
      'Look for reaction generating net additional gas moles.',
      'CaCO3(s) produces 1 mole of CO2 gas from pure solid.',
      'All other options decrease total gas moles or condense gas to liquid.'
    ]
  },
  {
    id: 'ch_18',
    nodeId: 'c11_chem_cbse_023',
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Gibbs Energy Calculation',
    question: 'For a chemical reaction at T = 300 K with ΔH = -50.0 kJ/mol and ΔS = -100.0 J/(mol·K), calculate ΔG in kJ/mol.',
    correctAnswer: -20,
    tolerance: 0.5,
    unit: 'kJ/mol',
    explanation: 'Convert ΔS to kJ/(mol·K): -100.0 / 1000 = -0.100 kJ/(mol·K). ΔG = ΔH - TΔS = -50.0 - (300 * -0.100) = -50.0 + 30.0 = -20.0 kJ/mol.',
    hints: [
      'Convert ΔS to kJ: -100 J = -0.100 kJ.',
      'Multiply T * ΔS: 300 K * (-0.100 kJ/K) = -30 kJ.',
      'ΔG = ΔH - TΔS = -50 - (-30) = -20 kJ/mol.'
    ],
    misconceptionIndex: 1
  },
  {
    id: 'ch_19',
    nodeId: 'c11_chem_cbse_024',
    type: 'multiple_choice',
    difficulty: 'advanced',
    competencyLevel: 'Temperature Dependence of Spontaneity',
    question: 'For an endothermic process (ΔH > 0) with a positive entropy change (ΔS > 0), under what conditions is the process spontaneous (ΔG < 0)?',
    options: [
      'High temperatures where T > ΔH / ΔS',
      'Low temperatures where T < ΔH / ΔS',
      'All temperatures without exception',
      'No temperature conditions (never spontaneous)'
    ],
    correctIndex: 0,
    explanation: 'Since ΔG = ΔH - TΔS, when ΔH > 0 and ΔS > 0, ΔG becomes negative when TΔS > ΔH, which requires T > ΔH / ΔS.',
    hints: [
      'Set ΔG < 0 -> ΔH - TΔS < 0.',
      'Rearrange: TΔS > ΔH.',
      'Divide by positive ΔS: T > ΔH / ΔS.'
    ]
  },
  {
    id: 'ch_20',
    nodeId: 'c11_chem_cbse_025',
    type: 'multiple_choice',
    difficulty: 'advanced',
    competencyLevel: 'Gibbs Energy & Equilibrium Constant',
    question: 'If standard Gibbs free energy change ΔG° for a chemical reaction at 298 K is negative (-20 kJ/mol), what can be deduced about the equilibrium constant K?',
    options: [
      'K > 1 (products heavily favored at equilibrium)',
      'K < 1 (reactants heavily favored at equilibrium)',
      'K = 0',
      'K = 1 (equal concentrations at equilibrium)'
    ],
    correctIndex: 0,
    explanation: 'From ΔG° = -RT ln K, if ΔG° < 0, then ln K > 0 which means K > 1 (products favored at equilibrium).',
    hints: [
      'Formula: ΔG° = -RT ln K.',
      'If ΔG° is negative, -RT ln K is negative, so ln K is positive.',
      'e^(positive number) > 1, so K > 1.'
    ]
  },
  {
    id: 'ch_21',
    nodeId: 'c11_chem_cbse_026',
    type: 'multiple_choice',
    difficulty: 'advanced',
    competencyLevel: 'Third Law & Absolute Entropy',
    question: 'What fundamental thermodynamic baseline is provided by the Third Law of Thermodynamics?',
    options: [
      'Absolute entropy S = 0 for a perfectly crystalline substance at 0 K',
      'Internal energy U = 0 for ideal gas at 0 °C',
      'Enthalpy of formation ΔfH° = 0 for all gases at 298 K',
      'Gibbs free energy ΔG = 0 for all elemental phase transitions'
    ],
    correctIndex: 0,
    explanation: 'The Third Law establishes that as T approaches 0 Kelvin, absolute entropy of a perfect crystal approaches zero, enabling calculation of absolute entropy values S°.',
    hints: [
      'Third law addresses absolute zero (0 K).',
      'At 0 K, thermal motion ceases and perfect crystals have 1 microstate (W=1).',
      'S = k ln(1) = 0 J/K.'
    ],
    misconceptionIndex: 5
  },
  {
    id: 'ch_22',
    nodeId: 'c11_chem_cbse_027',
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Multi-Step Thermochemical Calculations',
    question: 'Calculate standard enthalpy of formation Δf H° of acetylene C2H2(g) (in kJ/mol) given standard enthalpies of combustion:\nΔc H°(C, graphite) = -393.5 kJ/mol\nΔc H°(H2, g) = -285.8 kJ/mol\nΔc H°(C2H2, g) = -1299.6 kJ/mol',
    correctAnswer: 226.8,
    tolerance: 1.0,
    unit: 'kJ/mol',
    explanation: 'Target reaction: 2 C(s) + H2(g) -> C2H2(g). Δf H° = 2 * Δc H°(C) + Δc H°(H2) - Δc H°(C2H2) = 2(-393.5) + (-285.8) - (-1299.6) = -787.0 - 285.8 + 1299.6 = +226.8 kJ/mol.',
    hints: [
      'Target equation: 2 C(s) + H2(g) -> C2H2(g).',
      'Multiply combustion of carbon by 2: 2 * (-393.5) = -787.0 kJ.',
      'Add combustion of hydrogen (-285.8) and subtract combustion of acetylene (-1299.6).'
    ]
  },
  {
    id: 'ch_23',
    nodeId: 'c11_chem_cbse_028',
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Carnot Heat Engine Efficiency',
    question: 'Calculate the maximum theoretical Carnot thermodynamic efficiency η (as a percentage) of a heat engine operating between a heat reservoir at 600 K and a sink at 300 K.',
    correctAnswer: 50,
    tolerance: 0.5,
    unit: '%',
    explanation: 'Efficiency η = (1 - T_cold / T_hot) * 100% = (1 - 300 / 600) * 100% = 0.50 * 100% = 50%.',
    hints: [
      'Formula: η = 1 - (T_cold / T_hot).',
      'T_cold = 300 K, T_hot = 600 K.',
      'η = 1 - (300 / 600) = 0.50 -> 50%.'
    ]
  }
];

// --- CUSTOM TOPIC-SPECIFIC SVG DIAGRAM COMPONENTS ---

const CalorimeterSVG = React.memo(({ tTemp }: { tTemp: number }) => (
  <svg viewBox="0 0 400 300" className="w-full h-auto rounded-lg bg-slate-900 border border-slate-700 shadow-xl">
    <defs>
      <linearGradient id="waterGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#0284c7" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#0369a1" stopOpacity="0.95" />
      </linearGradient>
      <linearGradient id="bombGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#64748b" />
        <stop offset="100%" stopColor="#334155" />
      </linearGradient>
    </defs>
    
    {/* Outer Insulated Jacket */}
    <rect x="40" y="30" width="320" height="240" rx="16" fill="#1e293b" stroke="#475569" strokeWidth="4" />
    <text x="200" y="22" fill="#94a3b8" fontSize="12" textAnchor="middle" fontWeight="bold">Insulated Outer Jacket (Constant Volume)</text>

    {/* Water Bath */}
    <rect x="70" y="70" width="260" height="180" rx="8" fill="url(#waterGrad)" />
    <text x="200" y="90" fill="#e0f2fe" fontSize="11" textAnchor="middle" fontWeight="600">Calorimeter Water Bath (m_water)</text>

    {/* Steel Bomb Chamber */}
    <rect x="140" y="110" width="120" height="120" rx="12" fill="url(#bombGrad)" stroke="#94a3b8" strokeWidth="3" />
    <text x="200" y="130" fill="#f8fafc" fontSize="11" textAnchor="middle" fontWeight="bold">Steel Bomb Chamber</text>

    {/* Sample Dish */}
    <path d="M 170 200 L 230 200 L 220 215 L 180 215 Z" fill="#ef4444" />
    <text x="200" y="212" fill="#ffffff" fontSize="9" textAnchor="middle" fontWeight="bold">Fuel Sample</text>

    {/* Ignition Wires */}
    <polyline points="180,110 180,180 195,195" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 3" />
    <polyline points="220,110 220,180 205,195" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 3" />
    <circle cx="200" cy="195" r="4" fill="#fbbf24" />

    {/* Thermometer */}
    <rect x="90" y="50" width="12" height="180" rx="6" fill="#e2e8f0" stroke="#64748b" strokeWidth="2" />
    <rect x="93" y={220 - Math.min(140, (tTemp - 25) * 5)} width="6" height={Math.min(140, (tTemp - 25) * 5)} fill="#dc2626" rx="3" />
    <circle cx="96" cy="225" r="10" fill="#dc2626" />
    <text x="110" y="65" fill="#f8fafc" fontSize="10" fontWeight="bold">Temp: {tTemp.toFixed(1)} °C</text>

    {/* Stirrer */}
    <line x1="300" y1="50" x2="300" y2="210" stroke="#cbd5e1" strokeWidth="4" />
    <path d="M 285 210 L 315 210 M 285 195 L 315 195" stroke="#cbd5e1" strokeWidth="3" />
    <text x="300" y="42" fill="#cbd5e1" fontSize="10" textAnchor="middle">Motor Stirrer</text>
  </svg>
));
CalorimeterSVG.displayName = 'CalorimeterSVG';

const PVDiagramSVG = React.memo(({ volume, mode }: { volume: number; mode: string }) => {
  const pVal = useMemo(() => 240 / volume, [volume]);
  return (
    <svg viewBox="0 0 400 280" className="w-full h-auto rounded-lg bg-slate-900 border border-slate-700 shadow-xl">
      <text x="200" y="24" fill="#f8fafc" fontSize="13" textAnchor="middle" fontWeight="bold">
        P-V Expansion Work Diagram ({mode.toUpperCase()})
      </text>
      
      {/* Axes */}
      <line x1="50" y1="230" x2="360" y2="230" stroke="#94a3b8" strokeWidth="2" />
      <line x1="50" y1="230" x2="50" y2="40" stroke="#94a3b8" strokeWidth="2" />
      <text x="360" y="250" fill="#cbd5e1" fontSize="11" fontWeight="bold">Volume V (L)</text>
      <text x="15" y="45" fill="#cbd5e1" fontSize="11" fontWeight="bold">Pressure P (bar)</text>

      {/* Reversible Curve */}
      <path d="M 70 60 Q 130 180 330 215" fill="none" stroke="#38bdf8" strokeWidth="3" />

      {/* Shaded Work Area */}
      {mode === 'reversible' ? (
        <path d="M 70 60 Q 130 180 330 215 L 330 230 L 70 230 Z" fill="rgba(56, 189, 248, 0.25)" />
      ) : (
        <rect x="70" y="215" width="260" height="15" fill="rgba(239, 68, 68, 0.35)" stroke="#ef4444" strokeDasharray="4 4" />
      )}

      {/* Current State Indicator */}
      {(() => {
        const cx = 50 + (volume / 10) * 300;
        const cy = 230 - (pVal / 25) * 180;
        return (
          <g>
            <circle cx={cx} cy={cy} r="6" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
            <line x1={cx} y1={cy} x2={cx} y2="230" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 3" />
            <text x={cx + 10} y={cy - 10} fill="#f59e0b" fontSize="10" fontWeight="bold">
              P={pVal.toFixed(1)} bar, V={volume.toFixed(1)} L
            </text>
          </g>
        );
      })()}
    </svg>
  );
});
PVDiagramSVG.displayName = 'PVDiagramSVG';

const HessCycleSVG = React.memo(({ step1, step2, total }: { step1: number; step2: number; total: number }) => (
  <svg viewBox="0 0 420 260" className="w-full h-auto rounded-lg bg-slate-900 border border-slate-700 shadow-xl">
    <text x="210" y="24" fill="#f8fafc" fontSize="13" textAnchor="middle" fontWeight="bold">
      Hess Law Constant Heat Summation Cycle
    </text>

    {/* State A Reactants */}
    <rect x="30" y="60" width="100" height="50" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
    <text x="80" y="82" fill="#38bdf8" fontSize="11" textAnchor="middle" fontWeight="bold">Reactants</text>
    <text x="80" y="98" fill="#94a3b8" fontSize="10" textAnchor="middle">C(s) + O2(g)</text>

    {/* State B Intermediate */}
    <rect x="160" y="180" width="100" height="50" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
    <text x="210" y="202" fill="#f59e0b" fontSize="11" textAnchor="middle" fontWeight="bold">Intermediate</text>
    <text x="210" y="218" fill="#94a3b8" fontSize="10" textAnchor="middle">CO(g) + 1/2 O2</text>

    {/* State C Products */}
    <rect x="290" y="60" width="100" height="50" rx="8" fill="#1e293b" stroke="#4ade80" strokeWidth="2" />
    <text x="340" y="82" fill="#4ade80" fontSize="11" textAnchor="middle" fontWeight="bold">Products</text>
    <text x="340" y="98" fill="#94a3b8" fontSize="10" textAnchor="middle">CO2(g)</text>

    {/* Direct Arrow A -> C */}
    <path d="M 130 85 L 290 85" stroke="#4ade80" strokeWidth="3" markerEnd="url(#arrow)" />
    <text x="210" y="75" fill="#4ade80" fontSize="11" textAnchor="middle" fontWeight="bold">Direct Δr H° = {total} kJ</text>

    {/* Step 1 Arrow A -> B */}
    <path d="M 80 110 L 160 180" stroke="#f59e0b" strokeWidth="2.5" />
    <text x="100" y="155" fill="#f59e0b" fontSize="10" fontWeight="bold">Step 1: {step1} kJ</text>

    {/* Step 2 Arrow B -> C */}
    <path d="M 260 180 L 340 110" stroke="#f59e0b" strokeWidth="2.5" />
    <text x="320" y="155" fill="#f59e0b" fontSize="10" fontWeight="bold">Step 2: {step2} kJ</text>
  </svg>
));
HessCycleSVG.displayName = 'HessCycleSVG';

const GibbsSpontaneitySVG = React.memo(({ dH, dS, temp, dG }: { dH: number; dS: number; temp: number; dG: number }) => {
  const isSpontaneous = dG < 0;
  return (
    <svg viewBox="0 0 420 280" className="w-full h-auto rounded-lg bg-slate-900 border border-slate-700 shadow-xl">
      <text x="210" y="24" fill="#f8fafc" fontSize="13" textAnchor="middle" fontWeight="bold">
        Gibbs Free Energy ΔG = ΔH - TΔS Diagram
      </text>

      {/* Axis */}
      <line x1="50" y1="140" x2="380" y2="140" stroke="#64748b" strokeWidth="2" strokeDasharray="4 4" />
      <line x1="60" y1="240" x2="60" y2="40" stroke="#94a3b8" strokeWidth="2" />
      <line x1="60" y1="240" x2="380" y2="240" stroke="#94a3b8" strokeWidth="2" />

      <text x="380" y="255" fill="#cbd5e1" fontSize="10" fontWeight="bold">Temperature T (K)</text>
      <text x="15" y="45" fill="#cbd5e1" fontSize="10" fontWeight="bold">ΔG (kJ/mol)</text>

      {/* Horizontal Line ΔG = 0 */}
      <text x="390" y="144" fill="#64748b" fontSize="10">ΔG = 0</text>

      {/* Dynamic Curve for ΔG vs T */}
      {(() => {
        // Points at T=0, T=500, T=1000
        const g0 = dH;
        const g1000 = dH - (1000 * dS) / 1000;
        const y0 = 140 - (g0 / 200) * 90;
        const y1000 = 140 - (g1000 / 200) * 90;
        
        const curX = 60 + (temp / 1000) * 320;
        const curY = 140 - (dG / 200) * 90;

        return (
          <g>
            <line x1="60" y1={y0} x2="380" y2={y1000} stroke="#38bdf8" strokeWidth="3" />
            <circle cx={curX} cy={curY} r="7" fill={isSpontaneous ? '#4ade80' : '#ef4444'} stroke="#ffffff" strokeWidth="2" />
            <text x={curX} y={curY - 12} fill={isSpontaneous ? '#4ade80' : '#ef4444'} fontSize="11" textAnchor="middle" fontWeight="bold">
              ΔG = {dG.toFixed(1)} kJ/mol
            </text>
          </g>
        );
      })()}

      {/* Spontaneity Status Banner */}
      <rect x="110" y="200" width="200" height="30" rx="6" fill={isSpontaneous ? 'rgba(74, 222, 128, 0.2)' : 'rgba(239, 68, 68, 0.2)'} stroke={isSpontaneous ? '#4ade80' : '#ef4444'} />
      <text x="210" y="220" fill={isSpontaneous ? '#4ade80' : '#ef4444'} fontSize="12" textAnchor="middle" fontWeight="bold">
        {isSpontaneous ? 'SPONTANEOUS (ΔG < 0)' : 'NON-SPONTANEOUS (ΔG > 0)'}
      </text>
    </svg>
  );
});
GibbsSpontaneitySVG.displayName = 'GibbsSpontaneitySVG';

// --- MAIN COMPONENT IMPLEMENTATION ---

export default function C11_ChemistryThermodynamicsCBSESim({
  initialNodeId = DEFAULT_PROPS.initialNodeId,
  onComplete,
}: {
  initialNodeId?: NodeId;
  onComplete?: (score: number) => void;
}) {
  // Navigation Tabs State
  const [activeTab, setActiveTab] = useState<'scenario' | 'discovery' | 'labs' | 'challenges' | 'summary'>('scenario');

  // Node & Concept Tracking State
  const [currentNodeId, setCurrentNodeId] = useState<NodeId>(initialNodeId);
  const [bktStates, setBktStates] = useState<Record<string, unknown>>(() => {
    const initial: Record<string, unknown> = {};
    ALL_NODE_IDS.forEach((id) => {
      initial[id] = createBKTState(id);
    });
    return initial;
  });

  // Discovery Question State
  const [selectedDiscoveryOpt, setSelectedDiscoveryOpt] = useState<number | null>(null);
  const [discoverySubmitted, setDiscoverySubmitted] = useState(false);

  // Active Lab Sub-tab State
  const [activeLabIndex, setActiveLabIndex] = useState<number>(0);

  // Lab 1: Gas Expansion Piston State
  const [pistonVol, setPistonVol] = useState<number>(2.0);
  const [pistonMode, setPistonMode] = useState<'reversible' | 'irreversible'>('reversible');
  const [pistonInsulation, setPistonInsulation] = useState<'open' | 'closed' | 'isolated'>('closed');

  // Lab 2: Calorimeter State
  const [calorimeterFuel, setCalorimeterFuel] = useState<'benzoic_acid' | 'ethanol' | 'glucose'>('benzoic_acid');
  const [calorimeterMass, setCalorimeterMass] = useState<number>(1.0);
  const [calorimeterTemp, setCalorimeterTemp] = useState<number>(25.0);
  const [isIgnited, setIsIgnited] = useState<boolean>(false);

  // Lab 3: Hess Cycle Builder State
  const [hessStep1, setHessStep1] = useState<number>(-393.5);
  const [hessStep2, setHessStep2] = useState<number>(-283.0);

  // Lab 4: Bond Energy Estimator State
  const [bondReactant, setBondReactant] = useState<string>('H2 + Cl2');

  // Lab 5: Gibbs Spontaneity Simulator State
  const [gibbsDH, setGibbsDH] = useState<number>(50); // kJ/mol
  const [gibbsDS, setGibbsDS] = useState<number>(100); // J/mol K
  const [gibbsTemp, setGibbsTemp] = useState<number>(300); // K

  // Challenges Engine State
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [numericAnswer, setNumericAnswer] = useState<string>('');
  const [challengeFeedback, setChallengeFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);
  const [score, setScore] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHintIndex, setCurrentHintIndex] = useState<number>(0);

  // Prediction & Observation Interactive QA States
  const [predictionAnswers, setPredictionAnswers] = useState<(number | null)[]>([null, null]);
  const [predictionFeedback, setPredictionFeedback] = useState<(boolean | null)[]>([null, null]);

  const [observationAnswers, setObservationAnswers] = useState<(number | null)[]>([null, null]);
  const [observationFeedback, setObservationFeedback] = useState<(boolean | null)[]>([null, null]);

  // Audio / Speech / UX Feedback Controls
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);

  // Inactivity Hint Timer
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const resetInactivityTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setShowHint(true);
      audioManager.play('hint');
    }, 10000);
  }, []);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentChallengeIndex, activeTab, resetInactivityTimer]);

  // Handle Tab Switch with Speech & Sounds
  const handleTabChange = (tab: 'scenario' | 'discovery' | 'labs' | 'challenges' | 'summary') => {
    audioManager.play('tap');
    setActiveTab(tab);
    speechManager.speak(`Switched to ${tab} section`);
  };

  // Lab 2 Calorimeter Ignition Trigger
  const handleIgniteCalorimeter = () => {
    audioManager.play('whoosh');
    setIsIgnited(true);
    speechManager.speak('Igniting fuel sample in bomb calorimeter');

    // Simulate heating transition
    let startT = 25.0;
    const deltaT = calorimeterMass * (calorimeterFuel === 'benzoic_acid' ? 26.4 : calorimeterFuel === 'ethanol' ? 29.7 : 15.6);
    const targetT = startT + deltaT;

    const interval = setInterval(() => {
      startT += 0.5;
      setCalorimeterTemp(startT);
      if (startT >= targetT) {
        clearInterval(interval);
        audioManager.play('chime');
      }
    }, 50);
  };

  // Gibbs Calculated ΔG
  const computedDG = useMemo(() => {
    return gibbsDH - (gibbsTemp * gibbsDS) / 1000;
  }, [gibbsDH, gibbsDS, gibbsTemp]);

  // Discovery Question Submission
  const handleDiscoverySubmit = () => {
    if (selectedDiscoveryOpt === null) return;
    setDiscoverySubmitted(true);
    if (selectedDiscoveryOpt === DISCOVERY_QUESTION.correctIndex) {
      audioManager.play('drop-correct');
      setShowSparkle(true);
      speechManager.speak('Correct discovery insight! Entropy compensates for heat absorption.');
    } else {
      audioManager.play('drop-wrong');
      speechManager.speak('Not quite. Review Gibbs energy relations.');
    }
  };

  // Verification Handlers for Predictions and Observations
  const handlePredictionSubmit = (index: number, choice: number) => {
    const updatedAns = [...predictionAnswers];
    updatedAns[index] = choice;
    setPredictionAnswers(updatedAns);

    const isCorrect = choice === PREDICTION_QUESTIONS[index].correctIndex;
    const updatedFb = [...predictionFeedback];
    updatedFb[index] = isCorrect;
    setPredictionFeedback(updatedFb);

    if (isCorrect) {
      audioManager.play('sparkle');
      speechManager.speak('Prediction verified successfully!');
    } else {
      audioManager.play('drop-wrong');
    }
  };

  const handleObservationSubmit = (index: number, choice: number) => {
    const updatedAns = [...observationAnswers];
    updatedAns[index] = choice;
    setObservationAnswers(updatedAns);

    const isCorrect = choice === OBSERVATION_QUESTIONS[index].correctIndex;
    const updatedFb = [...observationFeedback];
    updatedFb[index] = isCorrect;
    setObservationFeedback(updatedFb);

    if (isCorrect) {
      audioManager.play('chime');
      speechManager.speak('Observation confirmed!');
    } else {
      audioManager.play('drop-wrong');
    }
  };

  // Challenge Submission Logic
  const handleChallengeSubmit = () => {
    const ch = CHALLENGES[currentChallengeIndex];
    let isCorrect = false;

    if (ch.type === 'multiple_choice') {
      isCorrect = selectedAnswer === ch.correctIndex;
    } else if (ch.type === 'numeric') {
      const val = parseFloat(numericAnswer);
      isCorrect = !isNaN(val) && Math.abs(val - ch.correctAnswer) <= ch.tolerance;
    }

    if (isCorrect) {
      audioManager.play('success');
      setShowSparkle(true);
      setScore((prev) => prev + 10);
      setChallengeFeedback({ isCorrect: true, message: 'Correct! ' + ch.explanation });
      speechManager.speak('Excellent solution!');

      // Update BKT & SRS state
      const prevBKT = bktStates[ch.nodeId] || createBKTState(ch.nodeId);
      const newBKT = bktUpdate(prevBKT as any, true);
      setBktStates((prev) => ({ ...prev, [ch.nodeId]: newBKT }));

      const reviewItem = createReviewItem(ch.id);
      sm2Update(reviewItem, 5);

      if (currentChallengeIndex === CHALLENGES.length - 1) {
        setShowConfetti(true);
        setShowSuccess(true);
        audioManager.play('celebration');
        speechManager.speak('Congratulations! You have completed all thermodynamics research challenges.');
        recordGameScore('thermodynamics_cbse_c11', score + 10);
        if (onComplete) onComplete(score + 10);
      }
    } else {
      audioManager.play('error');
      setChallengeFeedback({ isCorrect: false, message: 'Incorrect. Review the hints and try again.' });
      speechManager.speak('Not quite right. Give it another try.');

      const prevBKT = bktStates[ch.nodeId] || createBKTState(ch.nodeId);
      const newBKT = bktUpdate(prevBKT as any, false);
      setBktStates((prev) => ({ ...prev, [ch.nodeId]: newBKT }));
    }
  };

  const nextChallenge = () => {
    audioManager.play('swoop');
    setSelectedAnswer(null);
    setNumericAnswer('');
    setChallengeFeedback(null);
    setShowHint(false);
    setCurrentHintIndex(0);
    if (currentChallengeIndex < CHALLENGES.length - 1) {
      setCurrentChallengeIndex((prev) => prev + 1);
      setCurrentNodeId(CHALLENGES[currentChallengeIndex + 1].nodeId);
    }
  };

  const currentChallenge = CHALLENGES[currentChallengeIndex];

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 font-sans p-4 md:p-8 flex flex-col items-center">
      {/* GLOBAL FEEDBACK OVERLAYS */}
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccess} text="Thermodynamics Mastery Achieved!" />
      <SparkleBurst show={showSparkle} x={400} y={300} />

      {/* HEADER SECTION */}
      <header className="w-full max-w-6xl mb-6 flex flex-col md:flex-row justify-between items-center bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6 shadow-2xl">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-sky-400 bg-sky-950 px-3 py-1 rounded-full border border-sky-800">
            ISC / CBSE Class 11 Chemistry
          </span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-2">
            Chemical Thermodynamics Virtual Lab
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Enthalpy, Entropy, Calorimetry, Hess Law & Gibbs Free Energy
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center space-x-4 bg-slate-950 px-4 py-2 rounded-lg border border-slate-800">
          <div className="text-right">
            <div className="text-xs text-slate-400">Research Score</div>
            <div className="text-xl font-bold text-amber-400">{score} pts</div>
          </div>
          <div className="h-8 w-px bg-slate-800" />
          <div className="text-right">
            <div className="text-xs text-slate-400">Active Concept</div>
            <div className="text-xs font-mono text-sky-400">{currentNodeId}</div>
          </div>
        </div>
      </header>

      {/* NAVIGATION TABS */}
      <nav className="w-full max-w-6xl mb-6 flex overflow-x-auto space-x-2 bg-slate-900/80 p-2 rounded-xl border border-slate-800">
        {[
          { id: 'scenario', label: '1. Lab Context' },
          { id: 'discovery', label: '2. Discovery' },
          { id: 'labs', label: '3. Interactive Labs' },
          { id: 'challenges', label: '4. Diagnostic Challenges' },
          { id: 'summary', label: '5. Real-World Summary' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id as any)}
            className={`flex-1 min-w-[120px] py-2.5 px-4 rounded-lg font-medium text-sm transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* TAB CONTENT CONTAINER */}
      <main className="w-full max-w-6xl flex-1 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl relative">
        {/* TAB 1: SCENARIO */}
        {activeTab === 'scenario' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-sky-950/60 to-slate-900 p-6 rounded-xl border border-sky-800/40">
              <h2 className="text-2xl font-bold text-sky-300 mb-3">{SCENARIO.title}</h2>
              <p className="text-slate-300 leading-relaxed text-base mb-4">{SCENARIO.intro}</p>
              <p className="text-slate-400 text-sm leading-relaxed">{SCENARIO.context}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <h3 className="font-bold text-sky-400 text-sm mb-2">First Law of Thermodynamics</h3>
                <p className="text-xs text-slate-400">Energy conservation: ΔU = q + w. System internal energy changes via heat and expansion work.</p>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <h3 className="font-bold text-emerald-400 text-sm mb-2">Thermochemistry & Hess Law</h3>
                <p className="text-xs text-slate-400">Enthalpy change ΔH is a state function. Target reaction heat equals sum of intermediate step heats.</p>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <h3 className="font-bold text-amber-400 text-sm mb-2">Entropy & Gibbs Free Energy</h3>
                <p className="text-xs text-slate-400">Spontaneity criterion ΔG = ΔH - TΔS. Negative ΔG drives natural chemical processes.</p>
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <button
                onClick={() => handleTabChange('discovery')}
                className="bg-sky-600 hover:bg-sky-500 text-white font-semibold px-6 py-2.5 rounded-lg transition-all shadow-md"
              >
                Proceed to Discovery Question &rarr;
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: DISCOVERY QUESTION */}
        {activeTab === 'discovery' && (
          <div className="space-y-6">
            <div className="bg-slate-950 p-6 rounded-xl border border-slate-800">
              <span className="text-xs text-amber-400 font-mono font-semibold uppercase">Pre-Lab Hypothesis</span>
              <h2 className="text-lg font-bold text-white mt-2 mb-4">{DISCOVERY_QUESTION.question}</h2>

              <div className="space-y-3">
                {DISCOVERY_QUESTION.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      audioManager.play('tap');
                      setSelectedDiscoveryOpt(idx);
                    }}
                    className={`w-full text-left p-4 rounded-lg border transition-all text-sm ${
                      selectedDiscoveryOpt === idx
                        ? 'bg-sky-950/80 border-sky-500 text-sky-200'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span className="font-bold mr-2">{String.fromCharCode(65 + idx)}.</span> {opt}
                  </button>
                ))}
              </div>

              {!discoverySubmitted ? (
                <button
                  onClick={handleDiscoverySubmit}
                  disabled={selectedDiscoveryOpt === null}
                  className="mt-6 bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white font-semibold px-6 py-2.5 rounded-lg transition-all"
                >
                  Submit Hypothesis
                </button>
              ) : (
                <div className="mt-6 p-4 rounded-lg bg-slate-900 border border-slate-700">
                  <p className="text-sm text-sky-300 font-semibold mb-1">Thermodynamic Analysis:</p>
                  <p className="text-xs text-slate-300">{DISCOVERY_QUESTION.hintAfter}</p>
                </div>
              )}
            </div>

            {/* PREDICTION QUESTIONS RENDERING */}
            <div className="mt-8">
              <h3 className="text-md font-bold text-slate-200 mb-4">Thermodynamic Predictions</h3>
              <div className="space-y-6">
                {PREDICTION_QUESTIONS.map((pq, idx) => (
                  <div key={idx} className="bg-slate-950 p-5 rounded-xl border border-slate-800">
                    <p className="text-sm font-semibold text-sky-400 mb-3">{pq.question}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                      {pq.options.map((opt, oIdx) => (
                        <button
                          key={oIdx}
                          onClick={() => handlePredictionSubmit(idx, oIdx)}
                          className={`text-left p-3 rounded-lg text-xs border transition-all ${
                            predictionAnswers[idx] === oIdx
                              ? 'bg-sky-950 border-sky-500 text-white'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                    {predictionFeedback[idx] !== null && (
                      <p className={`text-xs p-2 rounded ${predictionFeedback[idx] ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-red-950 text-red-300 border border-red-800'}`}>
                        {predictionFeedback[idx] ? 'Verified: ' + pq.verifyInstruction : 'Incorrect prediction. Try again.'}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: EXPLORATION LABS */}
        {activeTab === 'labs' && (
          <div className="space-y-6">
            {/* SUB-TAB NAVIGATOR FOR 5 EXPLORATION STEPS */}
            <div className="flex overflow-x-auto space-x-2 border-b border-slate-800 pb-3">
              {EXPLORATION_STEPS.map((lab, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    audioManager.play('tap');
                    setActiveLabIndex(idx);
                    setCurrentNodeId(lab.nodeId as NodeId);
                    speechManager.speak(`Switched to ${lab.title}`);
                  }}
                  className={`py-2 px-4 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    activeLabIndex === idx
                      ? 'bg-sky-600 text-white'
                      : 'bg-slate-950 text-slate-400 hover:text-white'
                  }`}
                >
                  {lab.title}
                </button>
              ))}
            </div>

            {/* LAB INSTRUCTION HEADER */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <p className="text-xs font-mono text-sky-400 mb-1">Step {activeLabIndex + 1} Protocol:</p>
              <p className="text-sm text-slate-200">{EXPLORATION_STEPS[activeLabIndex].instruction}</p>
            </div>

            {/* LAB 1: P-V GAS EXPANSION */}
            {activeLabIndex === 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <PVDiagramSVG volume={pistonVol} mode={pistonMode} />
                <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
                  <h3 className="text-sm font-bold text-sky-400">Piston Expansion Controls</h3>
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Volume Expansion V (L): {pistonVol.toFixed(1)} L</label>
                    <input
                      type="range"
                      min="1.0"
                      max="10.0"
                      step="0.5"
                      value={pistonVol}
                      onChange={(e) => {
                        setPistonVol(parseFloat(e.target.value));
                        audioManager.play('pop');
                      }}
                      className="w-full accent-sky-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Expansion Pathway</label>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setPistonMode('reversible')}
                        className={`flex-1 py-1.5 text-xs rounded border ${pistonMode === 'reversible' ? 'bg-sky-900 border-sky-500 text-white' : 'bg-slate-900 border-slate-800 text-slate-400'}`}
                      >
                        Reversible
                      </button>
                      <button
                        onClick={() => setPistonMode('irreversible')}
                        className={`flex-1 py-1.5 text-xs rounded border ${pistonMode === 'irreversible' ? 'bg-sky-900 border-sky-500 text-white' : 'bg-slate-900 border-slate-800 text-slate-400'}`}
                      >
                        Irreversible
                      </button>
                    </div>
                  </div>
                  <div className="p-3 bg-slate-900 rounded border border-slate-800 space-y-1 text-xs font-mono">
                    <div className="text-slate-400">P_ext: {(240 / pistonVol).toFixed(2)} bar</div>
                    <div className="text-amber-400">Work w: {pistonMode === 'reversible' ? (-2.303 * 8.314 * 300 * Math.log10(pistonVol)).toFixed(1) : (-1 * (240 / pistonVol) * (pistonVol - 1)).toFixed(1)} J</div>
                  </div>
                </div>
              </div>
            )}

            {/* LAB 2: BOMB CALORIMETRY */}
            {activeLabIndex === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <CalorimeterSVG tTemp={calorimeterTemp} />
                <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
                  <h3 className="text-sm font-bold text-sky-400">Calorimeter Ignition Rig</h3>
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Fuel Sample</label>
                    <select
                      value={calorimeterFuel}
                      onChange={(e) => setCalorimeterFuel(e.target.value as any)}
                      className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-xs text-white"
                    >
                      <option value="benzoic_acid">Benzoic Acid (Δc U = -26.4 kJ/g)</option>
                      <option value="ethanol">Ethanol CH3CH2OH (Δc U = -29.7 kJ/g)</option>
                      <option value="glucose">Glucose C6H12O6 (Δc U = -15.6 kJ/g)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Sample Mass (g): {calorimeterMass} g</label>
                    <input
                      type="range"
                      min="0.5"
                      max="3.0"
                      step="0.5"
                      value={calorimeterMass}
                      onChange={(e) => setCalorimeterMass(parseFloat(e.target.value))}
                      className="w-full accent-emerald-500"
                    />
                  </div>
                  <button
                    onClick={handleIgniteCalorimeter}
                    className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-2 rounded text-xs transition-all"
                  >
                    Ignite Sample in Bomb Chamber
                  </button>
                  <div className="p-3 bg-slate-900 rounded border border-slate-800 text-xs font-mono space-y-1">
                    <p className="text-emerald-400">Heat Released q_v: {(calorimeterMass * (calorimeterFuel === 'benzoic_acid' ? 26.4 : calorimeterFuel === 'ethanol' ? 29.7 : 15.6)).toFixed(1)} kJ</p>
                    <p className="text-slate-400">Measured ΔU = q_v (Constant Vol)</p>
                  </div>
                </div>
              </div>
            )}

            {/* LAB 3: HESS LAW CYCLE */}
            {activeLabIndex === 2 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <HessCycleSVG step1={hessStep1} step2={hessStep2} total={hessStep1 + hessStep2} />
                <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
                  <h3 className="text-sm font-bold text-sky-400">Thermochemical Steps Matrix</h3>
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">{'Step 1 Enthalpy (C → CO): '}{hessStep1} kJ</label>
                    <input
                      type="range"
                      min="-500"
                      max="-50"
                      step="10"
                      value={hessStep1}
                      onChange={(e) => setHessStep1(parseFloat(e.target.value))}
                      className="w-full accent-amber-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">{'Step 2 Enthalpy (CO → CO2): '}{hessStep2} kJ</label>
                    <input
                      type="range"
                      min="-400"
                      max="-50"
                      step="10"
                      value={hessStep2}
                      onChange={(e) => setHessStep2(parseFloat(e.target.value))}
                      className="w-full accent-amber-500"
                    />
                  </div>
                  <div className="p-3 bg-slate-900 rounded border border-slate-800 text-xs font-mono">
                    <p className="text-sky-300">Total Enthalpy Δr H° = ΔH1 + ΔH2 = {(hessStep1 + hessStep2).toFixed(1)} kJ</p>
                  </div>
                </div>
              </div>
            )}

            {/* LAB 4: BOND ENTHALPY */}
            {activeLabIndex === 3 && (
              <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
                <h3 className="text-sm font-bold text-sky-400">Molecular Bond Dissociation Estimator</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    onClick={() => setBondReactant('H2 + Cl2')}
                    className={`p-4 rounded-lg border text-xs font-bold text-left ${bondReactant === 'H2 + Cl2' ? 'bg-sky-950 border-sky-500 text-white' : 'bg-slate-900 border-slate-800 text-slate-400'}`}
                  >
                    H2(g) + Cl2(g) -&gt; 2 HCl(g)
                    <div className="text-slate-500 font-normal mt-1">ΔH = [436 + 242] - [2*431] = -184 kJ</div>
                  </button>
                  <button
                    onClick={() => setBondReactant('CH4 + 2O2')}
                    className={`p-4 rounded-lg border text-xs font-bold text-left ${bondReactant === 'CH4 + 2O2' ? 'bg-sky-950 border-sky-500 text-white' : 'bg-slate-900 border-slate-800 text-slate-400'}`}
                  >
                    CH4(g) + 2 O2(g) -&gt; CO2(g) + 2 H2O(g)
                    <div className="text-slate-500 font-normal mt-1">ΔH = [4*414 + 2*498] - [2*803 + 4*464] = -808 kJ</div>
                  </button>
                  <button
                    onClick={() => setBondReactant('N2 + 3H2')}
                    className={`p-4 rounded-lg border text-xs font-bold text-left ${bondReactant === 'N2 + 3H2' ? 'bg-sky-950 border-sky-500 text-white' : 'bg-slate-900 border-slate-800 text-slate-400'}`}
                  >
                    N2(g) + 3 H2(g) -&gt; 2 NH3(g)
                    <div className="text-slate-500 font-normal mt-1">ΔH = [946 + 3*436] - [6*391] = -92 kJ</div>
                  </button>
                </div>
              </div>
            )}

            {/* LAB 5: GIBBS SPONTANEITY SIMULATOR */}
            {activeLabIndex === 4 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <GibbsSpontaneitySVG dH={gibbsDH} dS={gibbsDS} temp={gibbsTemp} dG={computedDG} />
                <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
                  <h3 className="text-sm font-bold text-sky-400">Thermodynamic State Variables</h3>
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Enthalpy ΔH (kJ/mol): {gibbsDH} kJ/mol</label>
                    <input
                      type="range"
                      min="-150"
                      max="150"
                      step="10"
                      value={gibbsDH}
                      onChange={(e) => setGibbsDH(parseFloat(e.target.value))}
                      className="w-full accent-sky-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Entropy ΔS (J/mol·K): {gibbsDS} J/mol·K</label>
                    <input
                      type="range"
                      min="-200"
                      max="200"
                      step="10"
                      value={gibbsDS}
                      onChange={(e) => setGibbsDS(parseFloat(e.target.value))}
                      className="w-full accent-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Absolute Temp T (K): {gibbsTemp} K</label>
                    <input
                      type="range"
                      min="50"
                      max="1000"
                      step="25"
                      value={gibbsTemp}
                      onChange={(e) => setGibbsTemp(parseFloat(e.target.value))}
                      className="w-full accent-amber-500"
                    />
                  </div>
                  <div className="p-3 bg-slate-900 rounded border border-slate-800 text-xs font-mono space-y-1">
                    <p className="text-amber-400">Computed ΔG = {computedDG.toFixed(1)} kJ/mol</p>
                    <p className="text-slate-400">Status: {computedDG < 0 ? 'Spontaneous' : computedDG === 0 ? 'Equilibrium' : 'Non-spontaneous'}</p>
                  </div>
                </div>
              </div>
            )}

            {/* OBSERVATION QUESTIONS RENDERING */}
            <div className="mt-8">
              <h3 className="text-md font-bold text-slate-200 mb-4">Lab Observations</h3>
              <div className="space-y-6">
                {OBSERVATION_QUESTIONS.map((oq, idx) => (
                  <div key={idx} className="bg-slate-950 p-5 rounded-xl border border-slate-800">
                    <p className="text-sm font-semibold text-sky-400 mb-3">{oq.question}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                      {oq.observableOptions.map((opt, oIdx) => (
                        <button
                          key={oIdx}
                          onClick={() => handleObservationSubmit(idx, oIdx)}
                          className={`text-left p-3 rounded-lg text-xs border transition-all ${
                            observationAnswers[idx] === oIdx
                              ? 'bg-sky-950 border-sky-500 text-white'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                    {observationFeedback[idx] !== null && (
                      <p className={`text-xs p-2 rounded ${observationFeedback[idx] ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-red-950 text-red-300 border border-red-800'}`}>
                        {observationFeedback[idx] ? 'Observation Confirmed!' : 'Re-examine lab data and try again.'}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: DIAGNOSTIC CHALLENGES (23 CHALLENGES) */}
        {activeTab === 'challenges' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center bg-slate-950 p-4 rounded-xl border border-slate-800">
              <div>
                <span className="text-xs font-mono text-sky-400">Challenge {currentChallengeIndex + 1} of {CHALLENGES.length}</span>
                <h3 className="text-sm font-bold text-white capitalize">Tier: {currentChallenge.difficulty} | {currentChallenge.competencyLevel}</h3>
              </div>
              <span className="text-xs font-mono text-slate-400 bg-slate-900 px-3 py-1 rounded border border-slate-800">{currentChallenge.nodeId}</span>
            </div>

            <div className="bg-slate-950 p-6 rounded-xl border border-slate-800">
              <p className="text-base font-semibold text-slate-200 mb-6 leading-relaxed whitespace-pre-line">{currentChallenge.question}</p>

              {/* MC Challenge Options */}
              {currentChallenge.type === 'multiple_choice' && (
                <div className="space-y-3">
                  {currentChallenge.options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        audioManager.play('tap');
                        setSelectedAnswer(idx);
                      }}
                      className={`w-full text-left p-4 rounded-lg border text-sm transition-all ${
                        selectedAnswer === idx
                          ? 'bg-sky-950 border-sky-500 text-white'
                          : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <span className="font-bold mr-2">{String.fromCharCode(65 + idx)}.</span> {opt}
                    </button>
                  ))}
                </div>
              )}

              {/* Numeric Challenge Input */}
              {currentChallenge.type === 'numeric' && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <input
                      type="number"
                      step="any"
                      value={numericAnswer}
                      onChange={(e) => setNumericAnswer(e.target.value)}
                      placeholder="Enter numerical answer..."
                      className="bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-sky-500 flex-1"
                    />
                    <span className="text-sm text-slate-400 font-mono">{currentChallenge.unit}</span>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-6 flex flex-wrap justify-between items-center gap-4">
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="text-xs text-amber-400 hover:text-amber-300 underline font-medium"
                >
                  {showHint ? 'Hide Hint' : 'Need a Hint?'}
                </button>

                {!challengeFeedback ? (
                  <button
                    onClick={handleChallengeSubmit}
                    disabled={currentChallenge.type === 'multiple_choice' ? selectedAnswer === null : numericAnswer.trim() === ''}
                    className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold px-6 py-2.5 rounded-lg transition-all"
                  >
                    Submit Answer
                  </button>
                ) : (
                  <button
                    onClick={nextChallenge}
                    className="bg-sky-600 hover:bg-sky-500 text-white font-bold px-6 py-2.5 rounded-lg transition-all"
                  >
                    {currentChallengeIndex < CHALLENGES.length - 1 ? 'Next Challenge &rarr;' : 'Finish Lab Evaluation'}
                  </button>
                )}
              </div>

              {/* Hint Bubble Component */}
              <HintBubble show={showHint} text={currentChallenge.hints[currentHintIndex]} />

              {/* Challenge Feedback Message */}
              {challengeFeedback && (
                <div className={`mt-6 p-4 rounded-lg border text-sm ${challengeFeedback.isCorrect ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200' : 'bg-red-950/80 border-red-500 text-red-200'}`}>
                  {challengeFeedback.message}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 5: REAL WORLD ACTIVITY & SUMMARY */}
        {activeTab === 'summary' && (
          <div className="space-y-6">
            <div className="bg-slate-950 p-6 rounded-xl border border-slate-800">
              <h2 className="text-xl font-bold text-sky-400 mb-3">{REAL_WORLD_ACTIVITY.title}</h2>
              <p className="text-sm text-slate-300 leading-relaxed mb-6">{REAL_WORLD_ACTIVITY.description}</p>

              <div className="space-y-3">
                {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                  <div key={idx} className="flex items-start space-x-3 bg-slate-900 p-4 rounded-lg border border-slate-800">
                    <span className="bg-sky-950 text-sky-400 border border-sky-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* MISCONCEPTIONS REVIEW */}
            <div className="bg-slate-950 p-6 rounded-xl border border-slate-800">
              <h3 className="text-md font-bold text-amber-400 mb-4">Thermodynamic Misconceptions & Corrections</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MISCONCEPTIONS.map((m) => (
                  <div key={m.id} className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-2">
                    <p className="text-xs text-red-400 font-semibold">❌ Misconception: {m.misconception}</p>
                    <p className="text-xs text-emerald-300">✅ Correction: {m.correction}</p>
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