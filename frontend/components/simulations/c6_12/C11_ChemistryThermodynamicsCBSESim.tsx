'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import type { SoundEffect } from '../../../lib/sim-engine/types';
import { motion, AnimatePresence } from 'framer-motion';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, masteryProb } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';

// ==========================================
// CBSE THERMODYNAMICS NODES & DATA
// ==========================================
const CBSE_NODES = [
  'c11_chem_cbse_006', // Work in Thermodynamics - Pressure-Volume Work
  'c11_chem_cbse_007', // Heat as Energy Transfer
  'c11_chem_cbse_008', // General Case: Combined Heat and Work
  'c11_chem_cbse_009', // Internal Energy and State Functions / Heat Capacity
  'c11_chem_cbse_010', // First Law of Thermodynamics / Cp - Cv = R
  'c11_chem_cbse_011', // Adiabatic Processes
  'c11_chem_cbse_012', // Reversible and Irreversible Processes
  'c11_chem_cbse_013', // Isothermal Expansion of Ideal Gases
  'c11_chem_cbse_014', // Enthalpy and Enthalpy Changes
  'c11_chem_cbse_015', // Experimental Measurement (Bomb Calorimetry)
  'c11_chem_cbse_016', // Extensive and Intensive Properties
  'c11_chem_cbse_017', // Experimental Measurement of Enthalpy
  'c11_chem_cbse_018', // Standard States & Standard Enthalpy
  'c11_chem_cbse_019', // Enthalpy Changes During Phase Transitions
  'c11_chem_cbse_020', // Reaction Enthalpy Calculation
  'c11_chem_cbse_021', // Standard Enthalpy of Formation
  'c11_chem_cbse_022', // Thermochemical Equations
  'c11_chem_cbse_023', // Hess's Law of Constant Heat Summation
  'c11_chem_cbse_024', // Bond Enthalpy
  'c11_chem_cbse_025', // Enthalpy of Atomization
  'c11_chem_cbse_026', // Lattice Enthalpy and Born-Haber Cycle
  'c11_chem_cbse_027', // Enthalpy of Solution
  'c11_chem_cbse_028', // Enthalpy of Combustion
] as const;

type NodeId = typeof CBSE_NODES[number];

interface NodeMeta {
  id: NodeId;
  title: string;
  category: 'Fundamentals' | 'Processes' | 'Thermochemistry' | 'Spontaneity';
  desc: string;
  formula: string;
}

const NODE_METADATA: Record<NodeId, NodeMeta> = {
  c11_chem_cbse_006: { id: 'c11_chem_cbse_006', title: 'P-V Work', category: 'Fundamentals', desc: 'Work done by expansion/compression of gas against external pressure.', formula: 'w = -P_{ex} \\Delta V' },
  c11_chem_cbse_007: { id: 'c11_chem_cbse_007', title: 'Heat Transfer (q)', category: 'Fundamentals', desc: 'Energy transfer driven by temperature difference.', formula: 'q = n C \\Delta T' },
  c11_chem_cbse_008: { id: 'c11_chem_cbse_008', title: 'Combined Heat & Work', category: 'Fundamentals', desc: 'Total energy change combining thermal and mechanical work.', formula: '\\Delta U = q + w' },
  c11_chem_cbse_009: { id: 'c11_chem_cbse_009', title: 'Heat Capacity (C)', category: 'Fundamentals', desc: 'Heat required to raise system temperature by 1 K.', formula: 'q = C \\Delta T = m c \\Delta T' },
  c11_chem_cbse_010: { id: 'c11_chem_cbse_010', title: 'Cp - Cv = R', category: 'Fundamentals', desc: 'Molar heat capacity difference for ideal gas at constant P vs V.', formula: 'C_p - C_v = R' },
  c11_chem_cbse_011: { id: 'c11_chem_cbse_011', title: 'Adiabatic Process', category: 'Processes', desc: 'Process with zero heat exchange across thermal walls.', formula: 'q = 0 \\implies \\Delta U = w_{ad}' },
  c11_chem_cbse_012: { id: 'c11_chem_cbse_012', title: 'Reversible / Irreversible', category: 'Processes', desc: 'Quasi-static equilibrium path vs rapid non-equilibrium change.', formula: 'w_{rev} = - \\int P dV' },
  c11_chem_cbse_013: { id: 'c11_chem_cbse_013', title: 'Isothermal Expansion', category: 'Processes', desc: 'Expansion at constant temperature where internal energy stays fixed.', formula: 'w_{rev} = -2.303 n R T \\log(V_f / V_i)' },
  c11_chem_cbse_014: { id: 'c11_chem_cbse_014', title: 'Enthalpy (H)', category: 'Thermochemistry', desc: 'Heat content at constant pressure state function.', formula: 'H = U + PV \\implies \\Delta H = \\Delta U + \\Delta n_g R T' },
  c11_chem_cbse_015: { id: 'c11_chem_cbse_015', title: 'Bomb Calorimetry', category: 'Thermochemistry', desc: 'Constant volume measurement of reaction internal energy change.', formula: 'q_v = \\Delta U = C_{cal} \\Delta T' },
  c11_chem_cbse_016: { id: 'c11_chem_cbse_016', title: 'Extensive vs Intensive', category: 'Fundamentals', desc: 'Size-dependent (V, H, U) vs size-independent (T, P, Density) properties.', formula: 'Molar X = \\frac{X_{extensive}}{n}' },
  c11_chem_cbse_017: { id: 'c11_chem_cbse_017', title: 'Constant P Calorimetry', category: 'Thermochemistry', desc: 'Measurement of reaction enthalpy using coffee cup calorimeter.', formula: 'q_p = \\Delta H = m c \\Delta T' },
  c11_chem_cbse_018: { id: 'c11_chem_cbse_018', title: 'Standard States', category: 'Thermochemistry', desc: 'Pure substance at 1 bar pressure and 298.15 K.', formula: '\\Delta H^\\circ = \\sum H_{prod}^\\circ - \\sum H_{react}^\\circ' },
  c11_chem_cbse_019: { id: 'c11_chem_cbse_019', title: 'Phase Change Enthalpies', category: 'Thermochemistry', desc: 'Enthalpies of fusion, vaporization, and sublimation.', formula: '\\Delta H_{sub} = \\Delta H_{fus} + \\Delta H_{vap}' },
  c11_chem_cbse_020: { id: 'c11_chem_cbse_020', title: 'Reaction Enthalpy', category: 'Thermochemistry', desc: 'Total heat released/absorbed during chemical stoichiometry.', formula: '\\Delta H_r = \\sum a_i H_f(prod) - \\sum b_i H_f(react)' },
  c11_chem_cbse_021: { id: 'c11_chem_cbse_021', title: 'Enthalpy of Formation', category: 'Thermochemistry', desc: 'Enthalpy to form 1 mole compound from reference elements.', formula: '\\Delta H_f^\\circ(elements) = 0' },
  c11_chem_cbse_022: { id: 'c11_chem_cbse_022', title: 'Thermochemical Equations', category: 'Thermochemistry', desc: 'Balanced reaction equations paired with explicitly scaled enthalpy values.', formula: 'A + B \\rightarrow C, \\Delta H = x \\text{ kJ}' },
  c11_chem_cbse_023: { id: 'c11_chem_cbse_023', title: "Hess's Law", category: 'Thermochemistry', desc: 'Enthalpy change is independent of intermediate steps.', formula: '\\Delta H_{total} = \\Delta H_1 + \\Delta H_2 + \\Delta H_3' },
  c11_chem_cbse_024: { id: 'c11_chem_cbse_024', title: 'Bond Enthalpy', category: 'Thermochemistry', desc: 'Energy required to break 1 mole of bonds in gas phase.', formula: '\\Delta H_r = \\sum B.E.(reactants) - \\sum B.E.(products)' },
  c11_chem_cbse_025: { id: 'c11_chem_cbse_025', title: 'Enthalpy of Atomization', category: 'Thermochemistry', desc: 'Enthalpy to break a substance completely into gaseous atoms.', formula: '\\Delta H_a > 0 \\text{ (Always endothermic)}' },
  c11_chem_cbse_026: { id: 'c11_chem_cbse_026', title: 'Born-Haber Cycle', category: 'Thermochemistry', desc: 'Thermodynamic cycle linking lattice enthalpy of ionic crystals.', formula: '\\Delta H_f^\\circ = \\Delta H_{sub} + I.E. + \\frac{1}{2} D + E.A. + U_{lat}' },
  c11_chem_cbse_027: { id: 'c11_chem_cbse_027', title: 'Enthalpy of Solution', category: 'Thermochemistry', desc: 'Enthalpy change when solute dissolves into solvent.', formula: '\\Delta H_{sol} = \\Delta H_{lattice} + \\Delta H_{hyd}' },
  c11_chem_cbse_028: { id: 'c11_chem_cbse_028', title: 'Enthalpy of Combustion', category: 'Thermochemistry', desc: 'Enthalpy change for complete oxidation of 1 mole fuel in oxygen.', formula: '\\text{Fuel} + O_2 \\rightarrow CO_2 + H_2O, \\Delta H_c < 0' },
};

// ==========================================
// THEORY LESSON SLIDES DATA
// ==========================================
interface Slide {
  id: number;
  title: string;
  subtitle: string;
  nodesCovered: NodeId[];
  content: string[];
  keyFormula: string;
  cbsenum: string;
}

const LESSON_SLIDES: Slide[] = [
  {
    id: 1,
    title: 'First Law & PV Work',
    subtitle: 'Conservation of Energy, Work Sign Conventions, and Heat Capacity',
    nodesCovered: ['c11_chem_cbse_006', 'c11_chem_cbse_007', 'c11_chem_cbse_008', 'c11_chem_cbse_009', 'c11_chem_cbse_010'],
    cbsenum: 'NCERT 6.1 - 6.3',
    keyFormula: '\\Delta U = q + w, \\quad w = -P_{ex}\\Delta V, \\quad C_p - C_v = R',
    content: [
      'The First Law of Thermodynamics states that energy can neither be created nor destroyed, only transformed.',
      'Sign Conventions (IUPAC / CBSE): Heat added to system (+q), Heat released by system (-q). Work done ON system (+w), Work done BY system (-w).',
      'Pressure-Volume Work: When a gas expands against constant external pressure P_ex, w = -P_ex(V_f - V_i).',
      'Heat Capacity: Heat needed to raise temp by 1 K. At constant volume, q_v = C_v \\Delta T = \\Delta U. At constant pressure, q_p = C_p \\Delta T = \\Delta H.',
      'For an ideal gas, expansion at constant pressure requires extra energy to push against external pressure, yielding Cp - Cv = R.'
    ]
  },
  {
    id: 2,
    title: 'Thermodynamic Processes',
    subtitle: 'Isothermal, Adiabatic, Reversible vs Irreversible, and Property Types',
    nodesCovered: ['c11_chem_cbse_011', 'c11_chem_cbse_012', 'c11_chem_cbse_013', 'c11_chem_cbse_016', 'c11_chem_cbse_025', 'c11_chem_cbse_026'],
    cbsenum: 'NCERT 6.2 & 6.4',
    keyFormula: 'w_{rev, iso} = -2.303 nRT \\log(V_f/V_i), \\quad q_{ad} = 0',
    content: [
      'Isothermal Process: Temperature is constant (\\Delta T = 0). For ideal gases, \\Delta U = 0, so q = -w.',
      'Adiabatic Process: No heat enters or leaves system (q = 0). Thermally insulated walls. \\Delta U = w_{ad}. Expansion cools, compression heats.',
      'Reversible Process: Occurs infinitesimally slowly through continuous equilibrium states. Maximum work is done by system.',
      'Free Expansion: Expansion against vacuum (P_ex = 0). Therefore w = 0, and if isothermal, q = 0 and \\Delta U = 0.',
      'Extensive vs Intensive: Extensive depends on mass/amount (V, U, H, C). Intensive is independent of amount (T, P, Density, Molar Heat Capacity).'
    ]
  },
  {
    id: 3,
    title: 'Enthalpy & Thermochemistry',
    subtitle: 'Enthalpy State Function, Calorimetry, and Reaction Enthalpies',
    nodesCovered: ['c11_chem_cbse_014', 'c11_chem_cbse_015', 'c11_chem_cbse_017', 'c11_chem_cbse_018', 'c11_chem_cbse_019', 'c11_chem_cbse_022', 'c11_chem_cbse_028'],
    cbsenum: 'NCERT 6.4 - 6.5',
    keyFormula: '\\Delta H = \\Delta U + \\Delta n_g R T, \\quad \\Delta H_r^\\circ = \\sum a_i \\Delta H_f^\\circ(prod) - \\sum b_i \\Delta H_f^\\circ(react)',
    content: [
      'Enthalpy H = U + PV. It measures total heat content at constant pressure: q_p = \\Delta H.',
      'For gas-phase reactions: \\Delta H = \\Delta U + \\Delta n_g R T, where \\Delta n_g = moles of gaseous products minus gaseous reactants.',
      'Calorimetry: Bomb calorimeter measures \\Delta U (constant V, \\Delta V=0 \\implies w=0). Coffee cup calorimeter measures \\Delta H (constant P).',
      'Phase Transitions: \\Delta H_fus (solid to liquid), \\Delta H_vap (liquid to gas), \\Delta H_sub (solid to gas). All are endothermic (> 0).',
      'Enthalpy of Combustion (\\Delta H_c): Heat released when 1 mole of fuel is completely burnt in oxygen (Always exothermic, < 0).'
    ]
  },
  {
    id: 4,
    title: "Hess's Law & Bond Energies",
    subtitle: 'Constant Heat Summation, Bond Dissociation, and Born-Haber Cycle',
    nodesCovered: ['c11_chem_cbse_017', 'c11_chem_cbse_020', 'c11_chem_cbse_021', 'c11_chem_cbse_023', 'c11_chem_cbse_024', 'c11_chem_cbse_026', 'c11_chem_cbse_027'],
    cbsenum: 'NCERT 6.5',
    keyFormula: '\\Delta H_r = \\sum B.E.(reactants) - \\sum B.E.(products)',
    content: [
      "Hess's Law of Constant Heat Summation: Enthalpy change of a reaction is identical whether it occurs in one step or multiple steps, as H is a state function.",
      'Thermochemical Manipulations: Reversing an equation flips the sign of \\Delta H. Multiplying coefficients scales \\Delta H proportionally.',
      'Bond Enthalpy (B.E.): Energy needed to break 1 mole of gaseous bonds into atoms. \\Delta H_r = \\sum B.E.(broken) - \\sum B.E.(formed).',
      'Born-Haber Cycle: An application of Hess’s Law to determine lattice enthalpy (U_lat) of ionic crystals from experimental steps (sublimation, IE, dissociation, EA).',
      'Enthalpy of Solution: \\Delta H_sol = \\Delta H_lattice + \\Delta H_hydration. If hydration energy > lattice energy, dissolving is exothermic.'
    ]
  },
  {
    id: 5,
    title: 'Spontaneity & Gibbs Energy',
    subtitle: 'Entropy (S), 2nd/3rd Laws of Thermodynamics, and Gibbs Free Energy (G)',
    nodesCovered: ['c11_chem_cbse_019', 'c11_chem_cbse_020', 'c11_chem_cbse_021', 'c11_chem_cbse_022', 'c11_chem_cbse_023', 'c11_chem_cbse_024'],
    cbsenum: 'NCERT 6.6 - 6.8',
    keyFormula: '\\Delta G = \\Delta H - T \\Delta S, \\quad \\Delta G^\\circ = -R T \\ln K',
    content: [
      'Spontaneous Process: A process occurring naturally without continuous external intervention.',
      'Entropy (S): A quantitative measure of molecular disorder or randomness. \\Delta S = q_rev / T. Second Law: \\Delta S_total = \\Delta S_sys + \\Delta S_surr > 0 for spontaneous processes.',
      'Third Law: The entropy of a perfectly crystalline substance approaches zero as temperature approaches absolute zero (0 K).',
      'Gibbs Free Energy: G = H - TS. At constant T and P, \\Delta G = \\Delta H - T \\Delta S.',
      'Spontaneity Criteria: \\Delta G < 0 (Spontaneous / Exergonic), \\Delta G > 0 (Non-spontaneous), \\Delta G = 0 (Equilibrium).',
      'Equilibrium Constant Relation: \\Delta G^\\circ = -RT \\ln K = -2.303 RT \\log K.'
    ]
  }
];

// ==========================================
// CHALLENGES DATA (8 PROGRESSIVE CBSE PROBLEMS)
// ==========================================
interface Challenge {
  id: number;
  nodeId: NodeId;
  title: string;
  question: string;
  hint: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const INTERACTIVE_CHALLENGES: Challenge[] = [
  {
    id: 1,
    nodeId: 'c11_chem_cbse_006',
    title: 'Work Done in P-V Expansion',
    question: 'An ideal gas expands from 2.0 L to 6.0 L against a constant external pressure of 2.5 atm. Calculate the work done in Joules (1 L atm = 101.325 J).',
    hint: 'Use w = -P_ex * Delta V. Note the negative sign for work done by system.',
    options: ['-1013.25 J', '-10.0 J', '+1013.25 J', '-405.3 J'],
    correctIndex: 0,
    explanation: 'w = -P_ex * (V_f - V_i) = -2.5 atm * (6.0 - 2.0 L) = -10.0 L atm. In Joules: -10.0 * 101.325 = -1013.25 J.'
  },
  {
    id: 2,
    nodeId: 'c11_chem_cbse_010',
    title: 'Molar Heat Capacities Relation',
    question: 'For 1 mole of an ideal gas, if C_v = 20.8 J K^-1 mol^-1, what is C_p? (R = 8.314 J K^-1 mol^-1)',
    hint: 'Apply C_p - C_v = R.',
    options: ['29.114 J K^-1 mol^-1', '12.486 J K^-1 mol^-1', '20.800 J K^-1 mol^-1', '172.93 J K^-1 mol^-1'],
    correctIndex: 0,
    explanation: 'Using C_p - C_v = R => C_p = C_v + R = 20.8 + 8.314 = 29.114 J K^-1 mol^-1.'
  },
  {
    id: 3,
    nodeId: 'c11_chem_cbse_014',
    title: 'Delta H from Delta U',
    question: 'For N2(g) + 3H2(g) -> 2NH3(g) at 298 K, Delta U° = -88.0 kJ. Calculate Delta H°. (R = 8.314 J K^-1 mol^-1)',
    hint: 'Delta n_g = moles of gaseous products - moles of gaseous reactants. Delta H° = Delta U° + Delta n_g * R * T.',
    options: ['-92.95 kJ', '-83.05 kJ', '-88.00 kJ', '-97.90 kJ'],
    correctIndex: 0,
    explanation: 'Delta n_g = 2 - (1 + 3) = -2 mol. Delta H° = -88.0 + (-2 * 8.314 * 10^-3 * 298) = -88.0 - 4.95 = -92.95 kJ.'
  },
  {
    id: 4,
    nodeId: 'c11_chem_cbse_016',
    title: 'Extensive vs Intensive Identification',
    question: 'Which of the following contains ONLY intensive thermodynamic properties?',
    hint: 'Intensive properties do NOT depend on the amount of substance in the sample.',
    options: [
      'Temperature, Density, Molar Heat Capacity, Pressure',
      'Volume, Internal Energy, Mass, Temperature',
      'Enthalpy, Heat Capacity, Density, Pressure',
      'Entropy, Volume, Temperature, Refractive Index'
    ],
    correctIndex: 0,
    explanation: 'Temperature, density, molar heat capacity, and pressure do not depend on system mass or size, making them intensive.'
  },
  {
    id: 5,
    nodeId: 'c11_chem_cbse_023',
    title: "Hess's Law Reaction Enthalpy",
    question: 'Given: (1) C(s) + O2(g) -> CO2(g), Delta H = -393.5 kJ; (2) CO(g) + 1/2 O2(g) -> CO2(g), Delta H = -283.0 kJ. Find Delta H for C(s) + 1/2 O2(g) -> CO(g).',
    hint: "Subtract equation (2) from equation (1) using Hess's Law.",
    options: ['-110.5 kJ', '-676.5 kJ', '+110.5 kJ', '-283.0 kJ'],
    correctIndex: 0,
    explanation: 'Target rxn = (1) - (2): Delta H = -393.5 - (-283.0) = -393.5 + 283.0 = -110.5 kJ.'
  },
  {
    id: 6,
    nodeId: 'c11_chem_cbse_024',
    title: 'Bond Enthalpy Reaction Calculation',
    question: 'Calculate Delta H for H2(g) + Cl2(g) -> 2HCl(g). Given B.E.(H-H) = 436 kJ/mol, B.E.(Cl-Cl) = 242 kJ/mol, B.E.(H-Cl) = 431 kJ/mol.',
    hint: 'Delta H_r = sum(Bond energies broken) - sum(Bond energies formed).',
    options: ['-184 kJ', '+184 kJ', '-247 kJ', '-92 kJ'],
    correctIndex: 0,
    explanation: 'Delta H_r = [D(H-H) + D(Cl-Cl)] - [2 * D(H-Cl)] = (436 + 242) - (2 * 431) = 678 - 862 = -184 kJ.'
  },
  {
    id: 7,
    nodeId: 'c11_chem_cbse_026',
    title: 'Born-Haber Lattice Enthalpy',
    question: 'For NaCl(s): Delta H_f° = -411 kJ/mol, Delta H_sub = 108 kJ/mol, I.E. = 496 kJ/mol, 1/2 B.E.(Cl2) = 122 kJ/mol, E.A.(Cl) = -349 kJ/mol. What is Lattice Enthalpy (U_lat)?',
    hint: 'Delta H_f° = Delta H_sub + 1/2 B.E. + I.E. + E.A. + U_lat.',
    options: ['-788 kJ/mol', '+788 kJ/mol', '-388 kJ/mol', '-670 kJ/mol'],
    correctIndex: 0,
    explanation: '-411 = 108 + 122 + 496 - 349 + U_lat => -411 = 377 + U_lat => U_lat = -411 - 377 = -788 kJ/mol.'
  },
  {
    id: 8,
    nodeId: 'c11_chem_cbse_022',
    title: 'Spontaneity & Temperature Threshold',
    question: 'A reaction has Delta H = -40 kJ/mol and Delta S = -100 J K^-1 mol^-1. At what temperatures is this reaction spontaneous (Delta G < 0)?',
    hint: 'Delta G = Delta H - T * Delta S < 0. Watch out for unit conversion between kJ and J!',
    options: ['Below 400 K', 'Above 400 K', 'At all temperatures', 'Never spontaneous'],
    correctIndex: 0,
    explanation: 'Delta G = -40000 - T * (-100) < 0 => 100 T < 40000 => T < 400 K. The reaction is spontaneous below 400 K.'
  }
];

// ==========================================
// MAIN COMPONENT
// ==========================================
// ==========================================
// SCENARIO DATA
// ==========================================
const SCENARIO = {
  title: 'CBSE Class 11 Thermodynamics Lab',
  subtitle: 'Master Enthalpy, Entropy, and Gibbs Free Energy',
  description: 'Step into a virtual thermodynamics lab where you measure heat changes, apply Hess law, and predict reaction spontaneity using Gibbs energy.',
};

// ==========================================
// DISCOVERY QUESTION
// ==========================================
const DISCOVERY_QUESTION = {
  title: 'Discovery Challenge: The Spontaneous Ice Melting',
  question: 'Ice melts at 0°C spontaneously, absorbing heat from surroundings (endothermic, ΔH > 0). How can a process be spontaneous if it absorbs heat?',
  options: [
    'It cannot be spontaneous; melting must be non-spontaneous',
    'Spontaneity depends on ΔG = ΔH - TΔS, not just ΔH. At T > 273K, the entropy increase (ΔS > 0) makes TΔS > ΔH, so ΔG < 0',
    'Ice melting is actually exothermic',
    'Spontaneity depends only on enthalpy change'
],
  correctIndex: 1,
  explanation: 'Spontaneity is determined by Gibbs free energy (ΔG = ΔH - TΔS), not enthalpy alone. Ice melting is endothermic (ΔH > 0) but also increases entropy (ΔS > 0). Above 273K, the TΔS term exceeds ΔH, making ΔG negative and the process spontaneous.',
};

// ==========================================
// TEACHING / LAB WORKSTATIONS DATA
// ==========================================
const WORKSTATIONS_INFO = [
  {
    "id": "enthalpy",
    "name": "Enthalpy Lab",
    "description": "Measure enthalpy changes in combustion, formation, and phase transitions."
  },
  {
    "id": "hess",
    "name": "Hess's Law Station",
    "description": "Apply Hess law to calculate enthalpy changes indirectly."
  },
  {
    "id": "entropy",
    "name": "Entropy Lab",
    "description": "Calculate entropy changes and predict disorder."
  },
  {
    "id": "gibbs",
    "name": "Gibbs Energy Lab",
    "description": "Use ΔG = ΔH - TΔS to predict spontaneity."
  }
];

// ==========================================
// MISCONCEPTIONS (Enrichment Data)
// ==========================================
interface Misconception {
  id: string;
  title: string;
  description: string;
  correction: string;
}

const MISCONCEPTIONS: Misconception[] = [
  {
    "id": "misc_1",
    "title": "Equating Spontaneous Reactions with Fast Chemical Reactions",
    "description": "Students often believe that if a reaction is spontaneous (having a negative Delta G), it must occur rapidly or instantaneously.",
    "correction": "Spontaneity indicates only the thermodynamic feasibility of a process, not its reaction rate. For example, the conversion of diamond to graphite is spontaneous but occurs at an imperceptibly slow rate. Reaction rates are governed by chemical kinetics, whereas thermodynamics determines only the direction of change."
  },
  {
    "id": "misc_2",
    "title": "Confusing Standard Enthalpy of Formation with Standard Entropy",
    "description": "Students frequently assume that the standard entropy of a pure element in its reference state is zero, just like its standard enthalpy of formation.",
    "correction": "By convention, the standard enthalpy of formation of an element in its reference state is zero, but absolute entropy is zero only for a perfectly crystalline substance at zero Kelvin. At standard temperature (298 K), all elements have positive absolute entropy values due to molecular motion and thermal energy."
  },
  {
    "id": "misc_3",
    "title": "Misinterpreting Standard Free Energy Change as Condition for Equilibrium",
    "description": "Students often confuse Delta G with Delta G degree, incorrectly believing that Delta G degree must equal zero at equilibrium.",
    "correction": "At chemical equilibrium, the non-standard Gibbs free energy change (Delta G) equals zero, whereas Delta G degree is a constant fixed by the equilibrium constant (Delta G degree = -RT ln K). A value of Delta G degree equal to zero simply means the equilibrium constant K equals 1, not that the system is currently at equilibrium."
  },
  {
    "id": "misc_4",
    "title": "Equating Enthalpy Change to Heat Supplied Under All Conditions",
    "description": "Students assume that the heat absorbed or released during any thermodynamic process is always equal to the enthalpy change.",
    "correction": "Enthalpy change is strictly equal to heat transferred only when the process occurs at constant pressure. Under constant volume conditions, the heat transferred is equal to the change in internal energy (Delta U), not enthalpy."
  },
  {
    "id": "misc_5",
    "title": "Misunderstanding Why Molar Heat Capacity Cp Exceeds Cv",
    "description": "Students often believe Cp is greater than Cv because constant pressure systems intrinsically require higher temperatures.",
    "correction": "At constant pressure, supplied heat increases internal energy and also does expansion work against external pressure. Conversely, at constant volume, no expansion work is done, so all heat goes entirely into raising internal energy. Thus, more heat is required per degree temperature rise at constant pressure, making Cp greater than Cv."
  }
];


export default function C11_ChemistryThermodynamicsCBSESim() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<'piston' | 'theory' | 'bornhaber' | 'bond' | 'challenges'>('piston');

  // Theory Slides State
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // SRS and BKT Mastery Tracking State
  const [bktMap, setBktMap] = useState<Record<string, ReturnType<typeof createBKTState>>>(() => {
    const init: Record<string, ReturnType<typeof createBKTState>> = {};
    CBSE_NODES.forEach((id) => {
      init[id] = createBKTState();
    });
    return init;
  });

  const [srsMap, setSrsMap] = useState<Record<string, ReturnType<typeof createReviewItem>>>(() => {
    const init: Record<string, ReturnType<typeof createReviewItem>> = {};
    CBSE_NODES.forEach((id) => {
      init[id] = createReviewItem(id, 'Chemistry');
    });
    return init;
  });

  // Interactive Piston Gas Simulation State
  const [pistonPressureEx, setPistonPressureEx] = useState<number>(1.5); // atm
  const [pistonTemp, setPistonTemp] = useState<number>(300); // Kelvin
  const [isAdiabatic, setIsAdiabatic] = useState<boolean>(false);
  const [isReversible, setIsReversible] = useState<boolean>(true);
  const [heatAction, setHeatAction] = useState<'none' | 'heating' | 'cooling'>('none');
  const [pistonVolume, setPistonVolume] = useState<number>(4.0); // Liters
  const [pvHistory, setPvHistory] = useState<Array<{ v: number; p: number }>>([
    { v: 4.0, p: 1.5 }
  ]);

  // Calculated Real-time Thermo Values
  const moles = 0.2; // Constant n = 0.2 mol
  const R_L_atm = 0.08206; // L atm / (mol K)
  const R_J = 8.314; // J / (mol K)
  const idealVolume = useMemo(() => {
    return (moles * R_L_atm * pistonTemp) / pistonPressureEx;
  }, [pistonTemp, pistonPressureEx]);

  // Born-Haber Cycle Interactive Controls
  const [bhSublimation, setBhSublimation] = useState(108.4);
  const [bhDissociation, setBhDissociation] = useState(121.0);
  const [bhIonization, setBhIonization] = useState(496.0);
  const [bhElectronGain, setBhElectronGain] = useState(-349.0);
  const [bhLattice, setBhLattice] = useState(-788.0);
  const bhDeltaHFormation = useMemo(() => {
    return bhSublimation + bhDissociation + bhIonization + bhElectronGain + bhLattice;
  }, [bhSublimation, bhDissociation, bhIonization, bhElectronGain, bhLattice]);

  // Bond Enthalpy Breaking Interactive Controls
  const [bondState, setBondState] = useState<'intact' | 'broken' | 'formed'>('intact');

  // Challenge Mode State
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [userScore, setUserScore] = useState(0);

  // SIM Engine Overlay UI States
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 300, y: 300 });

  // Canvas Ref for Piston Simulation
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Audio & TTS trigger helper
  const triggerAudio = useCallback((sound: SoundEffect) => {
    audioManager.play(sound);
  }, []);

  const speakText = useCallback((text: string) => {
    speechManager.speak(text);
  }, []);

  // Smoothly adjust volume towards ideal volume
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const step = () => {
      setPistonVolume((prev) => {
        const diff = idealVolume - prev;
        if (Math.abs(diff) < 0.02) return idealVolume;
        return prev + diff * 0.15;
      });
    };
    timer = setInterval(step, 30);
    return () => clearInterval(timer);
  }, [idealVolume]);

  // Update PV History for graph
  useEffect(() => {
    setPvHistory((prev) => {
      const last = prev[prev.length - 1];
      if (!last || Math.abs(last.v - pistonVolume) > 0.05 || Math.abs(last.p - pistonPressureEx) > 0.05) {
        const updated = [...prev, { v: Number(pistonVolume.toFixed(2)), p: Number(pistonPressureEx.toFixed(2)) }];
        return updated.slice(-40); // Keep last 40 points
      }
      return prev;
    });
  }, [pistonVolume, pistonPressureEx]);

  // Handle heating / cooling loop for Piston
  useEffect(() => {
    if (heatAction === 'none') return;
    const interval = setInterval(() => {
      setPistonTemp((prev) => {
        if (heatAction === 'heating') return Math.min(prev + 4, 650);
        if (heatAction === 'cooling') return Math.max(prev - 4, 150);
        return prev;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [heatAction]);

  // Render Canvas Gas Piston Animation
  useEffect(() => {
    if (activeTab !== 'piston') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let particles = Array.from({ length: 30 }, () => ({
      x: 30 + Math.random() * 180,
      y: 80 + Math.random() * 140,
      vx: (Math.random() - 0.5) * Math.sqrt(pistonTemp / 100) * 4,
      vy: (Math.random() - 0.5) * Math.sqrt(pistonTemp / 100) * 4,
      r: 4
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Piston Frame Box
      const cylLeft = 40;
      const cylWidth = 200;
      const cylBottom = 260;
      const pistonHeightPx = Math.max(40, Math.min(180, pistonVolume * 30));
      const pistonTopY = cylBottom - pistonHeightPx;

      // Draw Insulated / Diathermic Outer Chamber
      ctx.lineWidth = isAdiabatic ? 6 : 3;
      ctx.strokeStyle = isAdiabatic ? '#f59e0b' : '#3b82f6';
      ctx.strokeRect(cylLeft, pistonTopY, cylWidth, pistonHeightPx);

      if (isAdiabatic) {
        // Draw Hatch insulation lines
        ctx.strokeStyle = 'rgba(245, 158, 11, 0.4)';
        ctx.lineWidth = 2;
        for (let i = cylLeft; i <= cylLeft + cylWidth; i += 15) {
          ctx.beginPath();
          ctx.moveTo(i, cylBottom);
          ctx.lineTo(i - 10, cylBottom + 12);
          ctx.stroke();
        }
      }

      // Draw Flame / Ice at bottom
      if (heatAction === 'heating') {
        ctx.fillStyle = '#ef4444';
        for (let i = 0; i < 5; i++) {
          ctx.beginPath();
          ctx.arc(cylLeft + 20 + i * 40, cylBottom + 10, 8 + Math.random() * 4, 0, Math.PI * 2);
          ctx.fill();
        }
      } else if (heatAction === 'cooling') {
        ctx.fillStyle = '#38bdf8';
        for (let i = 0; i < 5; i++) {
          ctx.fillRect(cylLeft + 10 + i * 40, cylBottom + 4, 25, 12);
        }
      }

      // Draw Piston Head & Weight Block
      ctx.fillStyle = '#64748b';
      ctx.fillRect(cylLeft + 2, pistonTopY - 12, cylWidth - 4, 12);

      // Draw Weights representing P_ex
      ctx.fillStyle = '#334155';
      const numWeights = Math.round(pistonPressureEx * 2);
      for (let w = 0; w < numWeights; w++) {
        ctx.fillRect(cylLeft + 20 + (w % 5) * 35, pistonTopY - 26 - Math.floor(w / 5) * 16, 30, 12);
        ctx.strokeStyle = '#94a3b8';
        ctx.strokeRect(cylLeft + 20 + (w % 5) * 35, pistonTopY - 26 - Math.floor(w / 5) * 16, 30, 12);
      }

      // Gas Particles Motion
      const speedFactor = Math.sqrt(pistonTemp / 300);
      particles.forEach((p) => {
        p.x += p.vx * speedFactor;
        p.y += p.vy * speedFactor;

        // Bounce left/right
        if (p.x - p.r <= cylLeft + 4 || p.x + p.r >= cylLeft + cylWidth - 4) {
          p.vx *= -1;
        }
        // Bounce top (piston head) / bottom
        if (p.y - p.r <= pistonTopY + 4) {
          p.y = pistonTopY + p.r + 4;
          p.vy = Math.abs(p.vy);
        }
        if (p.y + p.r >= cylBottom - 4) {
          p.y = cylBottom - p.r - 4;
          p.vy = -Math.abs(p.vy);
        }

        // Particle Glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        const tempHue = Math.max(180, Math.min(360, 240 - (pistonTemp - 200) * 0.4));
        ctx.fillStyle = `hsl(${tempHue}, 90%, 60%)`;
        ctx.fill();
      });

      // Draw PV Diagram on right side of Canvas
      const graphLeft = 280;
      const graphTop = 40;
      const graphW = 180;
      const graphH = 200;

      ctx.fillStyle = '#0f172a';
      ctx.fillRect(graphLeft, graphTop, graphW, graphH);
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 1;
      ctx.strokeRect(graphLeft, graphTop, graphW, graphH);

      // Graph Axes
      ctx.strokeStyle = '#94a3b8';
      ctx.beginPath();
      ctx.moveTo(graphLeft + 25, graphTop + 10);
      ctx.lineTo(graphLeft + 25, graphTop + graphH - 25);
      ctx.lineTo(graphLeft + graphW - 10, graphTop + graphH - 25);
      ctx.stroke();

      ctx.fillStyle = '#cbd5e1';
      ctx.font = '10px sans-serif';
      ctx.fillText('P (atm)', graphLeft + 2, graphTop + 20);
      ctx.fillText('V (L)', graphLeft + graphW - 25, graphTop + graphH - 8);

      // Draw Isotherm Reference Curve P = nRT/V
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.3)';
      ctx.beginPath();
      for (let vVal = 1; vVal <= 8; vVal += 0.2) {
        const pVal = (moles * R_L_atm * pistonTemp) / vVal;
        const gx = graphLeft + 25 + (vVal / 8) * (graphW - 35);
        const gy = graphTop + graphH - 25 - (pVal / 5) * (graphH - 35);
        if (vVal === 1) ctx.moveTo(gx, gy);
        else ctx.lineTo(gx, gy);
      }
      ctx.stroke();

      // Plot PV History Trail
      if (pvHistory.length > 1) {
        ctx.strokeStyle = '#ec4899';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        pvHistory.forEach((pt, idx) => {
          const gx = graphLeft + 25 + (pt.v / 8) * (graphW - 35);
          const gy = graphTop + graphH - 25 - (pt.p / 5) * (graphH - 35);
          if (idx === 0) ctx.moveTo(gx, gy);
          else ctx.lineTo(gx, gy);
        });
        ctx.stroke();
      }

      // Current Point Marker
      const curGx = graphLeft + 25 + (pistonVolume / 8) * (graphW - 35);
      const curGy = graphTop + graphH - 25 - (pistonPressureEx / 5) * (graphH - 35);
      ctx.beginPath();
      ctx.arc(curGx, curGy, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#f43f5e';
      ctx.fill();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [activeTab, pistonVolume, pistonPressureEx, pistonTemp, isAdiabatic, heatAction, pvHistory, idealVolume]);

  // Overall Mastery Calculator
  const overallMastery = useMemo(() => {
    let sum = 0;
    CBSE_NODES.forEach((n) => {
      sum += masteryProb(bktMap[n] || createBKTState());
    });
    return Math.round((sum / CBSE_NODES.length) * 100);
  }, [bktMap]);

  // Handle Tab Switch
  const handleTabChange = (tab: typeof activeTab) => {
    triggerAudio('whoosh');
    setActiveTab(tab);
    if (tab === 'piston') speakText('Interactive Piston and PV Diagram Simulator');
    if (tab === 'theory') speakText('Thermodynamics Theory and CBSE Core Concepts');
    if (tab === 'bornhaber') speakText('Born-Haber Cycle Visualizer');
    if (tab === 'bond') speakText('Bond Energy Breaking and Formation Simulator');
    if (tab === 'challenges') speakText('CBSE Progressive Thermo Challenges');
  };

  // Handle Answer Submission in Challenge Mode
  const handleOptionSubmit = (idx: number) => {
    if (isSubmitted) return;
    setSelectedOption(idx);
    setIsSubmitted(true);

    const challenge = INTERACTIVE_CHALLENGES[currentChallengeIndex];
    const isCorrect = idx === challenge.correctIndex;
    const nodeId = challenge.nodeId;

    // Update BKT & SRS
    const updatedBkt = bktUpdate(bktMap[nodeId] || createBKTState(), isCorrect);
    setBktMap((prev) => ({ ...prev, [nodeId]: updatedBkt }));

    const quality = isCorrect ? 5 : 1;
    const updatedSrs = sm2Update(srsMap[nodeId] || createReviewItem(nodeId, 'Chemistry'), quality, 0);
    setSrsMap((prev) => ({ ...prev, [nodeId]: updatedSrs }));

    if (isCorrect) {
      triggerAudio('success');
      triggerAudio('chime');
      setUserScore((prev) => prev + 10);
      setSuccessMsg('Correct! Excelled CBSE Thermo concept.');
      setShowSuccess(true);
      setShowSparkle(true);
      setSparklePos({ x: 500, y: 250 });
      speakText('Correct answer! Great job.');
      setTimeout(() => setShowSuccess(false), 3000);
    } else {
      triggerAudio('error');
      speakText('Incorrect answer. Review the detailed CBSE explanation below.');
    }
  };

  const handleNextChallenge = () => {
    triggerAudio('pop');
    setSelectedOption(null);
    setIsSubmitted(false);

    if (currentChallengeIndex < INTERACTIVE_CHALLENGES.length - 1) {
      setCurrentChallengeIndex((prev) => prev + 1);
    } else {
      // Completed all challenges!
      triggerAudio('celebration');
      setShowConfetti(true);
      recordGameScore([...CBSE_NODES], userScore);
      setSuccessMsg(`All Challenges Completed! Final Score: ${userScore}/80`);
      setShowSuccess(true);
      speakText('Congratulations! You completed all CBSE Thermodynamics Challenges.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 md:p-6 flex flex-col items-center select-none">
      {/* OVERLAY ENGINE ELEMENTS */}
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccess} text={successMsg} />
      <SparkleBurst show={showSparkle} x={sparklePos.x} y={sparklePos.y} />
      <HintBubble show={showHint} text={currentHint} />

      {/* HEADER BAR */}
      <header className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-900/90 border border-slate-800 p-4 rounded-2xl backdrop-blur mb-6 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 to-rose-600 flex items-center justify-center font-bold text-2xl text-slate-950 shadow-lg shadow-amber-500/20">
            ΔH
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-extrabold bg-gradient-to-r from-amber-400 via-rose-400 to-gold-400 bg-clip-text text-transparent">
              CBSE Class 11 Thermodynamics
            </h1>
            <p className="text-xs text-slate-400">Interactive Simulation & Adaptive Mastery • NCERT Chapter 6</p>
          </div>
        </div>

        {/* MASTERY STATUS BADGE */}
        <div className="flex items-center gap-4 bg-slate-950 px-4 py-2 rounded-xl border border-slate-800">
          <div className="flex flex-col items-end">
            <span className="text-xs text-slate-400 uppercase font-semibold">BKT Mastery Level</span>
            <span className="text-sm font-bold text-emerald-400">{overallMastery}% Mastered</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-extrabold text-sm">
            {overallMastery > 70 ? 'A+' : overallMastery > 40 ? 'B' : 'C'}
          </div>
        </div>
      </header>

      {/* NAVIGATION TABS */}
      <nav className="w-full max-w-6xl grid grid-cols-2 md:grid-cols-5 gap-2 mb-6">
        {[
          { id: 'piston', label: '1. Piston & PV Simulator' },
          { id: 'theory', label: '2. CBSE Core Theory (5)' },
          { id: 'bornhaber', label: '3. Born-Haber Cycle' },
          { id: 'bond', label: '4. Bond Enthalpy Break' },
          { id: 'challenges', label: '5. CBSE Challenges' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id as typeof activeTab)}
            className={`py-3 px-3 rounded-xl font-bold text-xs md:text-sm transition-all text-center border ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-amber-500/20 to-rose-500/20 border-amber-500/50 text-amber-300 shadow-lg shadow-amber-500/10'
                : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-800/80 hover:text-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* TAB 1: PISTON & PV GRAPH SIMULATOR */}
      {activeTab === 'piston' && (
        <main className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Canvas Interactive Screen */}
          <section className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col items-center">
            <div className="w-full flex justify-between items-center mb-3">
              <h2 className="text-sm font-bold text-amber-400 uppercase tracking-wider">
                Live Gas Chamber & Real-Time PV Diagram
              </h2>
              <span className="text-xs text-gold-400 font-mono">n = 0.2 mol Ideal Gas</span>
            </div>

            <canvas
              ref={canvasRef}
              width={480}
              height={300}
              className="w-full max-w-[480px] h-[300px] bg-slate-950 rounded-xl border border-slate-800 shadow-inner"
            />

            {/* Live Readouts */}
            <div className="w-full grid grid-cols-3 gap-2 mt-4 text-center">
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block uppercase font-semibold">Volume (V)</span>
                <span className="text-lg font-bold text-gold-300 font-mono">{pistonVolume.toFixed(2)} L</span>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block uppercase font-semibold">Ext Pressure (P_ex)</span>
                <span className="text-lg font-bold text-amber-300 font-mono">{pistonPressureEx.toFixed(2)} atm</span>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block uppercase font-semibold">Temperature (T)</span>
                <span className="text-lg font-bold text-rose-300 font-mono">{pistonTemp.toFixed(0)} K</span>
              </div>
            </div>
          </section>

          {/* Controls & Calculated State Functions */}
          <section className="lg:col-span-5 flex flex-col gap-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col gap-4">
              <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
                Thermodynamic Control Panel
              </h3>

              {/* External Pressure Slider */}
              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-300">External Pressure (P_ex)</span>
                  <span className="text-amber-400 font-mono">{pistonPressureEx} atm</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="4.0"
                  step="0.25"
                  value={pistonPressureEx}
                  onChange={(e) => {
                    triggerAudio('tap');
                    setPistonPressureEx(parseFloat(e.target.value));
                  }}
                  className="accent-amber-500 cursor-pointer"
                />
              </div>

              {/* Temperature Control */}
              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-300">Gas Temperature (T)</span>
                  <span className="text-rose-400 font-mono">{pistonTemp} K</span>
                </div>
                <input
                  type="range"
                  min="150"
                  max="600"
                  step="10"
                  value={pistonTemp}
                  onChange={(e) => {
                    triggerAudio('tap');
                    setPistonTemp(parseInt(e.target.value));
                  }}
                  className="accent-rose-500 cursor-pointer"
                />
              </div>

              {/* Heat Source Buttons */}
              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-slate-300">Thermal Heat Bath</span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => {
                      triggerAudio('pop');
                      setHeatAction('heating');
                    }}
                    className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                      heatAction === 'heating'
                        ? 'bg-rose-500/20 border-rose-500 text-rose-300'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    🔥 Add Heat (+q)
                  </button>
                  <button
                    onClick={() => {
                      triggerAudio('pop');
                      setHeatAction('none');
                    }}
                    className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                      heatAction === 'none'
                        ? 'bg-slate-800 border-slate-600 text-slate-200'
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    ⏹ Neutral
                  </button>
                  <button
                    onClick={() => {
                      triggerAudio('pop');
                      setHeatAction('cooling');
                    }}
                    className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                      heatAction === 'cooling'
                        ? 'bg-gold-500/20 border-gold-500 text-gold-300'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    ❄️ Cool (-q)
                  </button>
                </div>
              </div>

              {/* Boundary Wall Toggles */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800">
                <button
                  onClick={() => {
                    triggerAudio('tap');
                    setIsAdiabatic(!isAdiabatic);
                  }}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-between ${
                    isAdiabatic ? 'bg-amber-500/20 border-amber-500 text-amber-300' : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  <span>Adiabatic Boundary</span>
                  <span>{isAdiabatic ? 'ON (q=0)' : 'OFF'}</span>
                </button>

                <button
                  onClick={() => {
                    triggerAudio('tap');
                    setIsReversible(!isReversible);
                  }}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-between ${
                    isReversible ? 'bg-gold-500/20 border-gold-500 text-gold-300' : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  <span>Process Path</span>
                  <span>{isReversible ? 'Reversible' : 'Irreversible'}</span>
                </button>
              </div>
            </div>

            {/* First Law Dynamic Equations Readout */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                First Law State Variables (CBSE Formulas)
              </h4>
              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between p-2 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-slate-400">PV Work (w = -P_ex ΔV):</span>
                  <span className="text-amber-400 font-bold">
                    {(-pistonPressureEx * (pistonVolume - 4.0) * 101.325).toFixed(1)} J
                  </span>
                </div>
                <div className="flex justify-between p-2 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-slate-400">Internal Energy (ΔU = n Cv ΔT):</span>
                  <span className="text-rose-400 font-bold">
                    {(moles * 12.47 * (pistonTemp - 300)).toFixed(1)} J
                  </span>
                </div>
                <div className="flex justify-between p-2 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-slate-400">Heat Transfer (q = ΔU - w):</span>
                  <span className="text-gold-400 font-bold">
                    {isAdiabatic
                      ? '0.0 J (Adiabatic)'
                      : (moles * 12.47 * (pistonTemp - 300) + pistonPressureEx * (pistonVolume - 4.0) * 101.325).toFixed(1) + ' J'}
                  </span>
                </div>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* TAB 2: CBSE THEORY SLIDES */}
      {activeTab === 'theory' && (
        <main className="w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl flex flex-col gap-6">
          {/* Slide Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-bold text-amber-400 tracking-wider uppercase">
                {LESSON_SLIDES[currentSlideIndex].cbsenum} • Module {currentSlideIndex + 1} of {LESSON_SLIDES.length}
              </span>
              <h2 className="text-2xl font-extrabold text-slate-100">
                {LESSON_SLIDES[currentSlideIndex].title}
              </h2>
              <p className="text-sm text-slate-400">{LESSON_SLIDES[currentSlideIndex].subtitle}</p>
            </div>

            <div className="flex gap-2">
              <button
                disabled={currentSlideIndex === 0}
                onClick={() => {
                  triggerAudio('whoosh');
                  setCurrentSlideIndex((prev) => prev - 1);
                }}
                className="px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs font-bold disabled:opacity-40 hover:bg-slate-800 transition-all"
              >
                ← Previous
              </button>
              <button
                disabled={currentSlideIndex === LESSON_SLIDES.length - 1}
                onClick={() => {
                  triggerAudio('whoosh');
                  setCurrentSlideIndex((prev) => prev + 1);
                }}
                className="px-4 py-2 bg-amber-500/20 border border-amber-500/40 text-amber-300 rounded-xl text-xs font-bold disabled:opacity-40 hover:bg-amber-500/30 transition-all"
              >
                Next →
              </button>
            </div>
          </div>

          {/* Key Formula Box */}
          <div className="bg-slate-950 border border-amber-500/30 p-4 rounded-xl flex flex-col items-center justify-center text-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1">
              CBSE Key Formula Box
            </span>
            <span className="font-mono text-lg font-bold text-amber-300">
              {LESSON_SLIDES[currentSlideIndex].keyFormula}
            </span>
          </div>

          {/* Detailed Content Bullet Points */}
          <div className="space-y-4">
            {LESSON_SLIDES[currentSlideIndex].content.map((bullet, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-start gap-3 bg-slate-950/50 p-3.5 rounded-xl border border-slate-800/80"
              >
                <div className="w-6 h-6 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 text-xs font-bold shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">{bullet}</p>
              </motion.div>
            ))}
          </div>

          {/* Nodes Covered Badges */}
          <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-400 font-semibold">Nodes Taught in Module:</span>
            {LESSON_SLIDES[currentSlideIndex].nodesCovered.map((nodeId) => (
              <span
                key={nodeId}
                className="px-2.5 py-1 bg-slate-950 border border-slate-800 text-gold-400 text-[11px] font-mono rounded-lg"
              >
                {nodeId}: {NODE_METADATA[nodeId].title}
              </span>
            ))}
          </div>
        </main>
      )}

      {/* TAB 3: BORN-HABER CYCLE INTERACTIVE VISUALIZER */}
      {activeTab === 'bornhaber' && (
        <main className="w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col gap-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl font-extrabold text-amber-400">
                Born-Haber Cycle for Sodium Chloride (NaCl)
              </h2>
              <p className="text-xs text-slate-400">
                NCERT 6.5.6 • Hess’s Law application to calculate Lattice Enthalpy (U_lat)
              </p>
            </div>
            <div className="bg-slate-950 px-4 py-2 rounded-xl border border-amber-500/30 text-right">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">
                Calculated ΔH_f° (Formation)
              </span>
              <span className="text-lg font-mono font-bold text-amber-300">
                {bhDeltaHFormation.toFixed(1)} kJ/mol
              </span>
            </div>
          </div>

          {/* Born-Haber SVG Diagram */}
          <div className="w-full bg-slate-950 rounded-xl p-4 border border-slate-800 flex justify-center items-center overflow-x-auto">
            <svg width="640" height="280" viewBox="0 0 640 280" className="max-w-full">
              {/* Direct Path Arrow */}
              <path d="M 80 230 L 560 230" stroke="#f59e0b" strokeWidth="3" fill="none" markerEnd="url(#arrow)" />
              <text x="320" y="250" fill="#f59e0b" fontSize="12" textAnchor="middle" fontWeight="bold">
                Direct Formation: Na(s) + ½Cl2(g) → NaCl(s) [ΔH_f° = {bhDeltaHFormation.toFixed(1)} kJ]
              </text>

              {/* Step 1: Sublimation */}
              <line x1="80" y1="230" x2="80" y2="180" stroke="#38bdf8" strokeWidth="2.5" />
              <text x="70" y="205" fill="#38bdf8" fontSize="11" textAnchor="end">
                ΔH_sub = +{bhSublimation}
              </text>

              {/* Step 2: Dissociation */}
              <line x1="80" y1="180" x2="180" y2="180" stroke="#38bdf8" strokeWidth="2.5" />
              <text x="130" y="170" fill="#38bdf8" fontSize="11" textAnchor="middle">
                ½ D(Cl2) = +{bhDissociation}
              </text>

              {/* Step 3: Ionization */}
              <line x1="180" y1="180" x2="180" y2="80" stroke="#38bdf8" strokeWidth="2.5" />
              <text x="170" y="130" fill="#38bdf8" fontSize="11" textAnchor="end">
                I.E.(Na) = +{bhIonization}
              </text>

              {/* Step 4: Electron Gain */}
              <line x1="180" y1="80" x2="380" y2="80" stroke="#ef4444" strokeWidth="2.5" />
              <text x="280" y="70" fill="#ef4444" fontSize="11" textAnchor="middle">
                E.A.(Cl) = {bhElectronGain}
              </text>

              {/* Step 5: Lattice Formation */}
              <line x1="380" y1="80" x2="560" y2="230" stroke="#a855f7" strokeWidth="3" strokeDasharray="5,5" />
              <text x="490" y="140" fill="#a855f7" fontSize="12" textAnchor="middle" fontWeight="bold">
                Lattice Enthalpy (U_lat) = {bhLattice} kJ
              </text>

              {/* State Labels */}
              <circle cx="80" cy="230" r="5" fill="#f59e0b" />
              <text x="80" y="220" fill="#cbd5e1" fontSize="11" textAnchor="middle">Na(s) + ½Cl2(g)</text>

              <circle cx="80" cy="180" r="5" fill="#38bdf8" />
              <text x="80" y="170" fill="#cbd5e1" fontSize="11" textAnchor="middle">Na(g) + ½Cl2(g)</text>

              <circle cx="180" cy="180" r="5" fill="#38bdf8" />
              <text x="180" y="195" fill="#cbd5e1" fontSize="11" textAnchor="middle">Na(g) + Cl(g)</text>

              <circle cx="180" cy="80" r="5" fill="#38bdf8" />
              <text x="180" y="65" fill="#cbd5e1" fontSize="11" textAnchor="middle">Na+(g) + e- + Cl(g)</text>

              <circle cx="380" cy="80" r="5" fill="#ef4444" />
              <text x="380" y="65" fill="#cbd5e1" fontSize="11" textAnchor="middle">Na+(g) + Cl-(g)</text>

              <circle cx="560" cy="230" r="6" fill="#f59e0b" />
              <text x="560" y="220" fill="#cbd5e1" fontSize="11" textAnchor="middle">NaCl(s)</text>
            </svg>
          </div>

          {/* Dynamic Sliders to Test Hess's Law */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              <h3 className="text-xs font-bold text-gold-400 uppercase">Adjust Endothermic Energies (kJ/mol)</h3>

              <div className="flex flex-col gap-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-300">Na Sublimation (ΔH_sub):</span>
                  <span className="font-mono text-gold-300">+{bhSublimation}</span>
                </div>
                <input
                  type="range"
                  min="80"
                  max="150"
                  value={bhSublimation}
                  onChange={(e) => {
                    triggerAudio('tap');
                    setBhSublimation(parseFloat(e.target.value));
                  }}
                  className="accent-gold-500 cursor-pointer"
                />
              </div>

              <div className="flex flex-col gap-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-300">Na Ionization Energy (I.E.):</span>
                  <span className="font-mono text-gold-300">+{bhIonization}</span>
                </div>
                <input
                  type="range"
                  min="400"
                  max="600"
                  value={bhIonization}
                  onChange={(e) => {
                    triggerAudio('tap');
                    setBhIonization(parseFloat(e.target.value));
                  }}
                  className="accent-gold-500 cursor-pointer"
                />
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              <h3 className="text-xs font-bold text-rose-400 uppercase">Adjust Exothermic / Lattice Energies</h3>

              <div className="flex flex-col gap-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-300">Cl Electron Gain Enthalpy (E.A.):</span>
                  <span className="font-mono text-rose-300">{bhElectronGain}</span>
                </div>
                <input
                  type="range"
                  min="-400"
                  max="-250"
                  value={bhElectronGain}
                  onChange={(e) => {
                    triggerAudio('tap');
                    setBhElectronGain(parseFloat(e.target.value));
                  }}
                  className="accent-rose-500 cursor-pointer"
                />
              </div>

              <div className="flex flex-col gap-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-300">Lattice Enthalpy (U_lat):</span>
                  <span className="font-mono text-purple-300">{bhLattice}</span>
                </div>
                <input
                  type="range"
                  min="-900"
                  max="-600"
                  value={bhLattice}
                  onChange={(e) => {
                    triggerAudio('tap');
                    setBhLattice(parseFloat(e.target.value));
                  }}
                  className="accent-purple-500 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </main>
      )}

      {/* TAB 4: BOND ENTHALPY BREAK & FORM SIMULATOR */}
      {activeTab === 'bond' && (
        <main className="w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col gap-6">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-xl font-extrabold text-gold-400">
              Methane Combustion Bond Breaking & Formation
            </h2>
            <p className="text-xs text-slate-400">
              NCERT 6.5.4 • CH4(g) + 2O2(g) → CO2(g) + 2H2O(g) Bond Enthalpy Calculation
            </p>
          </div>

          {/* Molecular Bond Stages */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Reactants */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center">
              <span className="text-xs font-bold text-gold-400 uppercase mb-2">Reactant Bonds (Broken)</span>
              <div className="space-y-1 text-xs text-slate-300 text-center font-mono">
                <p>4 × C-H bonds = 4 × 414 = 1656 kJ</p>
                <p>2 × O=O bonds = 2 × 498 = 996 kJ</p>
                <p className="font-bold text-amber-300 pt-2 border-t border-slate-800">
                  Total Energy Absorbed = +2652 kJ
                </p>
              </div>
            </div>

            {/* Reaction Coordinate Transition State */}
            <div className="bg-slate-950 p-4 rounded-xl border border-amber-500/30 flex flex-col items-center justify-center text-center">
              <span className="text-[10px] text-amber-400 font-bold uppercase tracking-widest mb-1">
                Enthalpy Formula
              </span>
              <span className="font-mono text-sm font-bold text-slate-200">
                ΔH_rxn = Σ B.E.(Reactants) - Σ B.E.(Products)
              </span>
              <span className="font-mono text-lg font-extrabold text-rose-400 mt-2">
                2652 - 3450 = -798 kJ
              </span>
              <span className="text-xs text-rose-400 font-semibold mt-1">Exothermic Reaction</span>
            </div>

            {/* Products */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center">
              <span className="text-xs font-bold text-rose-400 uppercase mb-2">Product Bonds (Formed)</span>
              <div className="space-y-1 text-xs text-slate-300 text-center font-mono">
                <p>2 × C=O bonds = 2 × 799 = 1598 kJ</p>
                <p>4 × O-H bonds = 4 × 463 = 1852 kJ</p>
                <p className="font-bold text-rose-300 pt-2 border-t border-slate-800">
                  Total Energy Released = -3450 kJ
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Molecular Visualization */}
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex flex-col items-center justify-center min-h-[220px]">
            <AnimatePresence mode="wait">
              {bondState === 'intact' && (
                <motion.div
                  key="intact"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex flex-col items-center gap-4"
                >
                  <div className="flex items-center gap-6">
                    {/* CH4 SVG */}
                    <div className="flex flex-col items-center">
                      <svg width="100" height="100" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="18" fill="#475569" />
                        <text x="50" y="55" fill="#fff" fontSize="14" textAnchor="middle" fontWeight="bold">C</text>
                        {/* 4 Hydrogen atoms bonded */}
                        <line x1="50" y1="32" x2="50" y2="12" stroke="#38bdf8" strokeWidth="3" />
                        <circle cx="50" cy="12" r="10" fill="#38bdf8" />
                        <line x1="50" y1="68" x2="50" y2="88" stroke="#38bdf8" strokeWidth="3" />
                        <circle cx="50" cy="88" r="10" fill="#38bdf8" />
                        <line x1="32" y1="50" x2="12" y2="50" stroke="#38bdf8" strokeWidth="3" />
                        <circle cx="12" cy="50" r="10" fill="#38bdf8" />
                        <line x1="68" y1="50" x2="88" y2="50" stroke="#38bdf8" strokeWidth="3" />
                        <circle cx="88" cy="50" r="10" fill="#38bdf8" />
                      </svg>
                      <span className="text-xs font-mono text-gold-400 mt-1">CH4 Molecule</span>
                    </div>

                    <span className="text-xl font-bold text-slate-500">+</span>

                    {/* 2 O2 SVG */}
                    <div className="flex flex-col items-center">
                      <svg width="120" height="80" viewBox="0 0 120 80">
                        <circle cx="30" cy="40" r="14" fill="#ef4444" />
                        <line x1="30" y1="34" x2="70" y2="34" stroke="#ef4444" strokeWidth="3" />
                        <line x1="30" y1="46" x2="70" y2="46" stroke="#ef4444" strokeWidth="3" />
                        <circle cx="70" cy="40" r="14" fill="#ef4444" />
                      </svg>
                      <span className="text-xs font-mono text-rose-400 mt-1">2 × O=O Molecules</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400">Intact Reactant Molecules ready to absorb heat.</p>
                </motion.div>
              )}

              {bondState === 'broken' && (
                <motion.div
                  key="broken"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex flex-col items-center gap-3"
                >
                  <div className="flex flex-wrap justify-center items-center gap-4 max-w-md p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl">
                    <span className="px-3 py-1 bg-slate-700 text-white font-mono rounded-full text-xs font-bold">1 × C Atom</span>
                    <span className="px-3 py-1 bg-gold-600 text-white font-mono rounded-full text-xs font-bold">4 × H Atoms</span>
                    <span className="px-3 py-1 bg-rose-600 text-white font-mono rounded-full text-xs font-bold">4 × O Atoms</span>
                  </div>
                  <p className="text-xs text-amber-300 font-semibold">
                    Bonds Dissociated! Gaseous free atoms created (Endothermic +2652 kJ).
                  </p>
                </motion.div>
              )}

              {bondState === 'formed' && (
                <motion.div
                  key="formed"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex flex-col items-center gap-4"
                >
                  <div className="flex items-center gap-6">
                    {/* CO2 SVG */}
                    <div className="flex flex-col items-center">
                      <svg width="120" height="60" viewBox="0 0 120 60">
                        <circle cx="20" cy="30" r="14" fill="#ef4444" />
                        <line x1="20" y1="25" x2="60" y2="25" stroke="#cbd5e1" strokeWidth="3" />
                        <line x1="20" y1="35" x2="60" y2="35" stroke="#cbd5e1" strokeWidth="3" />
                        <circle cx="60" cy="30" r="16" fill="#475569" />
                        <line x1="60" y1="25" x2="100" y2="25" stroke="#cbd5e1" strokeWidth="3" />
                        <line x1="60" y1="35" x2="100" y2="35" stroke="#cbd5e1" strokeWidth="3" />
                        <circle cx="100" cy="30" r="14" fill="#ef4444" />
                      </svg>
                      <span className="text-xs font-mono text-emerald-400 mt-1">CO2 Molecule</span>
                    </div>

                    <span className="text-xl font-bold text-slate-500">+</span>

                    {/* 2 H2O SVG */}
                    <div className="flex flex-col items-center">
                      <svg width="100" height="70" viewBox="0 0 100 70">
                        <circle cx="50" cy="25" r="14" fill="#ef4444" />
                        <line x1="50" y1="25" x2="25" y2="50" stroke="#38bdf8" strokeWidth="3" />
                        <circle cx="25" cy="50" r="9" fill="#38bdf8" />
                        <line x1="50" y1="25" x2="75" y2="50" stroke="#38bdf8" strokeWidth="3" />
                        <circle cx="75" cy="50" r="9" fill="#38bdf8" />
                      </svg>
                      <span className="text-xs font-mono text-gold-400 mt-1">2 × H2O Molecules</span>
                    </div>
                  </div>
                  <p className="text-xs text-rose-300 font-semibold">
                    Product Bonds Formed! Released -3450 kJ heat into surroundings.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Stage Action Controls */}
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => {
                  triggerAudio('pop');
                  setBondState('intact');
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold border ${
                  bondState === 'intact' ? 'bg-gold-500/20 border-gold-500 text-gold-300' : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}
              >
                1. Initial Reactants
              </button>
              <button
                onClick={() => {
                  triggerAudio('sparkle');
                  setBondState('broken');
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold border ${
                  bondState === 'broken' ? 'bg-amber-500/20 border-amber-500 text-amber-300' : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}
              >
                2. Break All Bonds (+2652 kJ)
              </button>
              <button
                onClick={() => {
                  triggerAudio('chime');
                  setBondState('formed');
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold border ${
                  bondState === 'formed' ? 'bg-rose-500/20 border-rose-500 text-rose-300' : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}
              >
                3. Form Product Bonds (-3450 kJ)
              </button>
            </div>
          </div>
        </main>
      )}

      {/* TAB 5: CBSE ADAPTIVE CHALLENGES */}
      {activeTab === 'challenges' && (
        <main className="w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl flex flex-col gap-6">
          {/* Challenge Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Question {currentChallengeIndex + 1} of {INTERACTIVE_CHALLENGES.length} • Node:{' '}
                {INTERACTIVE_CHALLENGES[currentChallengeIndex].nodeId}
              </span>
              <h2 className="text-xl font-extrabold text-slate-100">
                {INTERACTIVE_CHALLENGES[currentChallengeIndex].title}
              </h2>
            </div>
            <button
              onClick={() => {
                triggerAudio('hint');
                setCurrentHint(INTERACTIVE_CHALLENGES[currentChallengeIndex].hint);
                setShowHint(true);
                setTimeout(() => setShowHint(false), 5000);
              }}
              className="px-3 py-1.5 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-xl text-xs font-bold hover:bg-amber-500/20"
            >
              💡 Show Hint
            </button>
          </div>

          {/* Question Text */}
          <p className="text-sm md:text-base text-slate-200 leading-relaxed font-medium">
            {INTERACTIVE_CHALLENGES[currentChallengeIndex].question}
          </p>

          {/* Multiple Choice Options */}
          <div className="grid grid-cols-1 gap-3">
            {INTERACTIVE_CHALLENGES[currentChallengeIndex].options.map((opt, idx) => {
              let optionStyle = 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800/60';
              if (isSubmitted) {
                if (idx === INTERACTIVE_CHALLENGES[currentChallengeIndex].correctIndex) {
                  optionStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold';
                } else if (idx === selectedOption) {
                  optionStyle = 'bg-rose-500/20 border-rose-500 text-rose-300 font-bold';
                }
              } else if (idx === selectedOption) {
                optionStyle = 'bg-amber-500/20 border-amber-500 text-amber-300';
              }

              return (
                <button
                  key={idx}
                  disabled={isSubmitted}
                  onClick={() => handleOptionSubmit(idx)}
                  className={`p-4 rounded-xl border text-left text-sm transition-all flex items-center justify-between ${optionStyle}`}
                >
                  <span>{opt}</span>
                  {isSubmitted && idx === INTERACTIVE_CHALLENGES[currentChallengeIndex].correctIndex && (
                    <span className="text-emerald-400 text-xs font-bold">✓ Correct (CBSE Standard)</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Detailed Solution Explanation */}
          {isSubmitted && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2"
            >
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                CBSE NCERT Step-by-Step Solution
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed font-mono">
                {INTERACTIVE_CHALLENGES[currentChallengeIndex].explanation}
              </p>
              <button
                onClick={handleNextChallenge}
                className="mt-3 w-full py-2.5 bg-gradient-to-r from-amber-500 to-rose-500 text-slate-950 font-extrabold text-xs uppercase rounded-xl shadow-lg hover:brightness-110 transition-all"
              >
                {currentChallengeIndex < INTERACTIVE_CHALLENGES.length - 1
                  ? 'Next CBSE Question →'
                  : 'Complete All Challenges 🏆'}
              </button>
            </motion.div>
          )}
        </main>
      )}

      {/* FOOTER CBSE NOTES */}
      <footer className="w-full max-w-6xl mt-8 pt-4 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-2">
        <span>Target Syllabus: CBSE Class 11 Chemistry • Thermodynamics (NCERT Chapter 6)</span>
        <div className="flex gap-4">
          <span>Active Nodes: 23 Covered</span>
          <span>BKT Engine: Active</span>
          <span>SRS Spaced Repetition: Integrated</span>
        </div>
      </footer>

      {/* Misconception Summary Checklist */}
      <div className="text-left space-y-3 pt-4 border-t border-slate-800">
        <h3 className="text-sm font-bold text-amber-300">Common Board Exam Misconception Checklist:</h3>
        <div className="grid grid-cols-1 gap-2">
          {MISCONCEPTIONS.map((m) => (
            <div key={m.id} className="bg-slate-950 border border-slate-800 p-3 rounded-lg text-xs space-y-1">
              <div className="font-bold text-rose-400">{m.title}</div>
              <div className="text-slate-400">{m.description}</div>
              <div className="text-emerald-300 font-medium">✓ Correction: {m.correction}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}