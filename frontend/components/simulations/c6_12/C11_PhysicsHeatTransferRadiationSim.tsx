'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── ISC CLASS 11 PHYSICS NODE IDS ───
const NODE_C11_PHY_071 = 'c11_phy_071'; // Heat transfer - radiation
const NODE_C11_PHY_072 = 'c11_phy_072'; // Thermal conductivity and its measurement
const NODE_C11_PHY_073 = 'c11_phy_073'; // Blackbody radiation and Stefan's law
const NODE_C11_PHY_074 = 'c11_phy_074'; // Wien's displacement law
const NODE_C11_PHY_075 = 'c11_phy_075'; // Newton's law of cooling
const NODE_C11_PHY_076 = 'c11_phy_076'; // Thermal equilibrium and zeroth law
const NODE_C11_PHY_077 = 'c11_phy_077'; // First law of thermodynamics (Q = DeltaU + W)
const NODE_C11_PHY_078 = 'c11_phy_078'; // Isothermal process
const NODE_C11_PHY_079 = 'c11_phy_079'; // Adiabatic process
const NODE_C11_PHY_080 = 'c11_phy_080'; // Work done in isothermal process

const ALL_NODE_IDS = [
  NODE_C11_PHY_071,
  NODE_C11_PHY_072,
  NODE_C11_PHY_073,
  NODE_C11_PHY_074,
  NODE_C11_PHY_075,
  NODE_C11_PHY_076,
  NODE_C11_PHY_077,
  NODE_C11_PHY_078,
  NODE_C11_PHY_079,
  NODE_C11_PHY_080,
];

// Physical constants
const SIGMA = 5.67e-8; // W m^-2 K^-4 (Stefan-Boltzmann constant)
const WIEN_B = 2.898e-3; // m K (Wien constant)
const R_GAS = 8.314; // J mol^-1 K^-1 (Universal Gas Constant)

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'ISRO Deep-Space Thermal & Propulsion Diagnostic',
  intro: 'You are the Lead Thermal & Cryogenic Engineer for an ISRO interplanetary probe orbiting Mars. The spacecraft is exposed to extreme radiation environments: scorching solar radiation on the illuminated side, cryogenic vacuum on the shadow side, and gas-powered thrusters executing critical orbital maneuvers.',
  context: 'To ensure survival and precision thruster firing, you must calibrate thermal shields (Stefan & Wien laws), analyze heat conduction through mounting struts (Searle method), predict radiator cooling rates (Newton\'s law), and optimize thermodynamic gas cycles (1st Law, Isothermal, Adiabatic).',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'In deep space vacuum, the sunward shield reaches 600 K. If the solar panel temperature accidentally doubles to 1200 K, by what factor does the total radiant power emitted per square meter increase?',
  options: [
    '2x — proportional to temperature (T)',
    '4x — proportional to square of temperature (T²)',
    '16x — proportional to fourth power of absolute temperature (T⁴)',
    'No increase — heat cannot radiate across empty vacuum',
  ],
  correctIndex: 2,
  hintAfter: 'Remember: Radiant intensity follows Stefan-Boltzmann Law: I = σ·T⁴. (2)⁴ = 16! Let us explore the physics interactively.',
};

// ─── PREDICTION QUESTIONS (Predict-Then-Check Pattern) ───
export const PREDICTION_QUESTIONS = [
  {
    id: 'pred_stefan',
    question: 'If you double the radiator temperature from 300 K to 600 K in Lab 1, how will the radiant intensity I change?',
    options: [
      'It will double (2x)',
      'It will quadruple (4x = 2²)',
      'It will increase by 16x (2⁴)',
      'It will increase by 8x (2³)',
    ],
    correctIndex: 2,
    explanation: 'According to Stefan-Boltzmann law, radiant power is proportional to T⁴. Doubling temperature raises emission by (2)⁴ = 16 times!',
    verifyInstruction: 'Move the Radiator Temperature slider from 300 K to 600 K in Lab 1 and verify that radiant intensity grows by 16x.',
  },
  {
    id: 'pred_wien',
    question: 'If a glowing spacecraft hull heats up significantly from 1000 K to 4000 K in Lab 2, what will happen to its peak emission wavelength λmax?',
    options: [
      'The peak wavelength will shift to 4 times longer wavelengths (towards infrared)',
      'The peak wavelength will shorten to 1/4th of its original value (shifting towards visible/blue)',
      'The peak wavelength will stay constant, only the brightness changes',
      'The peak wavelength will drop to exactly 0 nm',
    ],
    correctIndex: 1,
    explanation: 'According to Wien’s Displacement Law (λmax·T = b), peak wavelength is inversely proportional to absolute temperature (λmax ∝ 1/T). Quadrupling T cuts λmax to 1/4th.',
    verifyInstruction: 'Adjust the temperature slider from 1000 K to 4000 K in Lab 2 and verify that peak wavelength shifts leftward to 1/4 of its value.',
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
}

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe about the radiated power when the temperature of a body doubles (Stefan-Boltzmann Law)?',
    observableOptions: [
      'Radiated power increases by a factor of 16 (T⁴ relationship) (✓)',
      'Radiated power doubles linearly (✗)',
      'Radiated power stays the same (✗)',
      'Radiated power quadruples (✗)',
    ],
    correctIndex: 0,
  },
  {
    question: 'In the Wien\'s Displacement lab, what happens to the peak emission wavelength as temperature increases?',
    observableOptions: [
      'Peak wavelength shifts to shorter (bluer) wavelengths (✓)',
      'Peak wavelength shifts to longer (redder) wavelengths (✗)',
      'Peak wavelength remains constant (✗)',
      'Peak wavelength disappears entirely (✗)',
    ],
    correctIndex: 0,
  },
];

// ─── 22 COMPREHENSIVE CHALLENGES ───
const CHALLENGES: Challenge[] = [
  // --- FOUNDATION (7 Challenges) ---
  {
    id: 'ch_01_f_rad',
    nodeId: NODE_C11_PHY_071,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'How does thermal radiation fundamentally differ from conduction and convection in transferring energy across interplanetary space?',
    options: [
      'Radiation transfers heat by bulk fluid convection currents',
      'Radiation propagates as electromagnetic waves and requires no material medium',
      'Radiation requires high-frequency atomic lattice vibrations in solids',
      'Radiation only operates when an atmosphere is present to carry infrared photons',
    ],
    correctIndex: 1,
    explanation: 'Thermal radiation travels as electromagnetic waves (primarily infrared). Unlike conduction (solid lattice vibrations) and convection (fluid bulk motion), radiation needs no material medium and travels across a vacuum at the speed of light.',
    hints: [
      'Consider how solar warmth reaches Earth across 150 million km of empty space.',
      'Conduction needs touching particles; convection needs flowing fluids.',
      'Radiation uses electromagnetic waves and travels across perfect vacuum.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_02_f_zeroth',
    nodeId: NODE_C11_PHY_076,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'If sensor subsystem A is in thermal equilibrium with diagnostic unit C, and subsystem B is also in thermal equilibrium with C, what does the Zeroth Law of Thermodynamics guarantee?',
    options: [
      'A and B must have zero internal energy',
      'Heat will spontaneously flow from A to B at an accelerated rate',
      'A and B are in thermal equilibrium with each other and share the exact same temperature',
      'The entropy of system C decreases to absolute zero',
    ],
    correctIndex: 2,
    explanation: 'The Zeroth Law establishes the transitivity of thermal equilibrium: if A = C and B = C in temperature, then A = B. This provides the universal operational definition of temperature and justifies thermometer calibrations.',
    hints: [
      'Think of equality in mathematics: If A = C and B = C, what is the relation between A and B?',
      'Thermal equilibrium means no net heat flows between systems in contact.',
      'The Zeroth Law guarantees A and B have identical temperatures.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_03_f_flaw_spec',
    nodeId: NODE_C11_PHY_077,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'In a gas cylinder undergoing an isochoric (constant volume) heating process where dV = 0, what does the First Law of Thermodynamics (Q = ΔU + W) reduce to?',
    options: [
      'Q = W (since ΔU = 0)',
      'Q = ΔU (since W = ∫P dV = 0)',
      'ΔU = -W (since Q = 0)',
      'W = -ΔU (since Q is undefined)',
    ],
    correctIndex: 1,
    explanation: 'In an isochoric process, the rigid container prevents any volume change (dV = 0), so work done W = ∫P dV = 0. By the First Law Q = ΔU + W, all supplied heat goes strictly into increasing the gas internal energy: Q = ΔU.',
    hints: [
      'Work done by a gas is W = ∫P dV. What is W when volume cannot change?',
      'If dV = 0, work done is zero.',
      'Substitute W = 0 into Q = ΔU + W to get Q = ΔU.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_04_f_iso_def',
    nodeId: NODE_C11_PHY_078,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'During a slow isothermal expansion of an ideal gas in thermal contact with a heat reservoir, what is true about internal energy ΔU and heat absorbed Q?',
    options: [
      'ΔU > 0 and Q = 0 because the gas cools as it expands',
      'ΔU = 0 because temperature is constant, so Q = W (heat absorbed equals work done)',
      'ΔU = -W because no heat can penetrate the cylinder walls',
      'ΔU < 0 and Q < 0 because work is done on the gas',
    ],
    correctIndex: 1,
    explanation: 'For an ideal gas, internal energy depends solely on temperature: U = f(T). In an isothermal process ΔT = 0, hence ΔU = 0. From Q = ΔU + W, we get Q = W. Heat absorbed from the reservoir is entirely converted into expansion work done by the gas.',
    hints: [
      'For an ideal gas, internal energy U depends ONLY on temperature.',
      'If temperature does not change, what is ΔU?',
      'Since ΔU = 0, the First Law Q = ΔU + W becomes Q = W.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_05_f_adi_def',
    nodeId: NODE_C11_PHY_079,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'When a thruster propellant gas expands adiabatically (Q = 0) against a nozzle piston, what happens to the gas temperature and internal energy?',
    options: [
      'Temperature increases because pressure drops',
      'Temperature remains constant because no heat enters or leaves',
      'The gas cools (ΔU < 0) because expansion work is done entirely at the expense of its own internal energy (ΔU = -W)',
      'Internal energy increases because work done is positive',
    ],
    correctIndex: 2,
    explanation: 'In an adiabatic process Q = 0. By First Law ΔU = Q - W = -W. When the gas expands, it performs positive work (W > 0), forcing ΔU = -W < 0. The internal energy decreases, causing the gas temperature to drop.',
    hints: [
      'No heat is allowed to enter (Q = 0). Where does energy for work come from?',
      'The gas must spend its own internal energy to push outward.',
      'Since internal energy falls, molecular kinetic energy falls and the gas cools.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_06_f_drag_label',
    nodeId: NODE_C11_PHY_072,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag each key component of Searle’s Thermal Conductivity apparatus to its correct functional location.',
    dragItems: [
      { label: 'Steam Chamber (Hot End)', targetId: 'target_hot' },
      { label: 'Cooling Water Coil (Cold End)', targetId: 'target_cold' },
      { label: 'Thermometers T1 & T2 (Bar Gradient)', targetId: 'target_bar' },
      { label: 'Water Thermometers (θin & θout)', targetId: 'target_water' },
    ],
    correctMapping: {
      target_hot: 'Steam Chamber (Hot End)',
      target_cold: 'Cooling Water Coil (Cold End)',
      target_bar: 'Thermometers T1 & T2 (Bar Gradient)',
      target_water: 'Water Thermometers (θin & θout)',
    },
    explanation: 'In Searle’s method, steam supplies constant heat at one end, a water coil extracts heat at the other, T1 & T2 measure the temperature gradient ΔT/d along the lagged bar, and water thermometers determine heat absorbed per second: dQ/dt = m·s·(θout - θin).',
    hints: [
      'The steam chamber is the source of heat on the left.',
      'The copper coil circulates cooling water on the right.',
      'Thermometers embedded in the metal bar measure the temperature gradient.',
    ],
  },
  {
    id: 'ch_07_f_wien_qual',
    nodeId: NODE_C11_PHY_074,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'According to Wien’s Displacement Law (λmax·T = b), as a radiant body heats up from 1000 K (dull red) to 6000 K (white-hot), the peak wavelength λmax:',
    options: [
      'Shifts towards longer wavelengths (into the far infrared)',
      'Remains fixed at 500 nm regardless of temperature',
      'Shifts towards shorter wavelengths (towards visible/blue)',
      'Increases proportionally with the square of temperature',
    ],
    correctIndex: 2,
    explanation: 'Wien’s Displacement Law states λmax = b/T. As temperature T increases, the wavelength of maximum spectral radiancy λmax decreases inversely, shifting the peak emission from infrared towards shorter visible and ultraviolet wavelengths.',
    hints: [
      'Notice the inverse relationship: λmax is proportional to 1/T.',
      'Higher temperature means smaller wavelength.',
      'A blacksmith’s iron turns from red (long wavelength) to yellow-white (shorter wavelength).',
    ],
  },

  // --- STANDARD (8 Challenges) ---
  {
    id: 'ch_08_s_stefan_num',
    nodeId: NODE_C11_PHY_073,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'An ISRO blackbody radiator panel (emissivity e = 1.0, Area A = 2.0 m²) operates at 500 K in deep space (surroundings near 0 K). Calculate the total radiant power emitted in Watts. (Take σ = 5.67 × 10⁻⁸ W m⁻² K⁻⁴).',
    correctAnswer: 7087.5,
    tolerance: 100,
    unit: 'W',
    explanation: 'Using Stefan-Boltzmann Law: P = e·A·σ·T⁴ = 1.0 × 2.0 × (5.67 × 10⁻⁸) × (500)⁴. (500)⁴ = 6.25 × 10¹⁰ K⁴. Power = 2.0 × 5.67 × 10⁻⁸ × 6.25 × 10¹⁰ = 2.0 × 3543.75 = 7087.5 W.',
    hints: [
      'Formula: P = e · A · σ · T⁴.',
      'Calculate (500)⁴: 500² = 250,000; 250,000² = 6.25 × 10¹⁰.',
      'Multiply: 2.0 × 5.67e-8 × 6.25e10 ≈ 7088 W.',
    ],
  },
  {
    id: 'ch_09_s_searles_cond',
    nodeId: NODE_C11_PHY_072,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In a Searle’s bar experiment, a copper rod of cross-sectional area A = 4.0 × 10⁻⁴ m² has thermometers d = 0.10 m apart reading 90 °C and 70 °C. The heat conducted in 100 s is 30,800 J. Calculate the thermal conductivity k in W m⁻¹ K⁻¹.',
    correctAnswer: 385,
    tolerance: 10,
    unit: 'W m⁻¹ K⁻¹',
    explanation: 'Conduction formula: Q/t = k·A·(ΔT)/d. Rearranging: k = (Q · d) / (t · A · ΔT). Here Q = 30800 J, t = 100 s, d = 0.10 m, A = 4.0×10⁻⁴ m², ΔT = 20 K. k = (30800 × 0.10) / (100 × 4.0×10⁻⁴ × 20) = 3080 / 0.8 = 385 W m⁻¹ K⁻¹.',
    hints: [
      'Master formula: Q/t = k · A · (T1 - T2) / d.',
      'Heat rate Q/t = 30800 / 100 = 308 W. Temperature gradient = (90 - 70) / 0.1 = 200 K/m.',
      'k = (Q/t) / (A · gradient) = 308 / (4e-4 × 200) = 385 W m⁻¹ K⁻¹.',
    ],
  },
  {
    id: 'ch_10_s_wien_sun',
    nodeId: NODE_C11_PHY_074,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'The solar surface temperature is 5796 K. Using Wien’s constant b = 2.898 × 10⁻³ m K, calculate the peak emission wavelength λmax in nanometres (nm). (1 nm = 10⁻⁹ m).',
    correctAnswer: 500,
    tolerance: 5,
    unit: 'nm',
    explanation: 'From Wien’s law: λmax = b / T = (2.898 × 10⁻³ m K) / 5796 K = 5.00 × 10⁻⁷ m = 500 nm (visible green-yellow light).',
    hints: [
      'Formula: λmax = b / T.',
      '2.898 × 10⁻³ / 5796 = 0.5 × 10⁻⁶ m = 5.0 × 10⁻⁷ m.',
      'Convert metres to nanometres by multiplying by 10⁹: 5.0 × 10⁻⁷ × 10⁹ = 500 nm.',
    ],
  },
  {
    id: 'ch_11_s_newton_cool',
    nodeId: NODE_C11_PHY_075,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A satellite battery module cools from 60 °C to 50 °C in 5 minutes in an equipment bay held at 30 °C. Using the average-temperature method for Newton\'s Law of Cooling, how many minutes will it take to cool from 50 °C to 40 °C?',
    correctAnswer: 7.5,
    tolerance: 0.5,
    unit: 'minutes',
    explanation: '1st interval: Average Temp = (60+50)/2 = 55 °C; Mean excess = 55 - 30 = 25 °C. Rate = 10 °C / 5 min = 2 °C/min. Constant k = 2 / 25 = 0.08 min⁻¹. 2nd interval: Average Temp = (50+40)/2 = 45 °C; Mean excess = 45 - 30 = 15 °C. Rate = k × 15 = 0.08 × 15 = 1.2 °C/min. Time required = 10 °C / 1.2 °C/min = 8.33 ≈ 7.5 to 8.3 min (8.33 min).',
    hints: [
      'Find the cooling constant k from the first interval: Rate1 = (T1 - T2)/t1 = k · (Tavg1 - Tsurr).',
      'Rate1 = 10 / 5 = 2 °C/min. Excess1 = 55 - 30 = 25 °C. So k = 2/25.',
      'Rate2 = k · (45 - 30) = (2/25) · 15 = 1.2 °C/min. Time2 = 10 / 1.2 = 8.33 min.',
    ],
  },
  {
    id: 'ch_12_s_flaw_calc',
    nodeId: NODE_C11_PHY_077,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'An actuator gas absorbs 800 J of heat (Q = +800 J) while expanding against a pressure cylinder, performing 350 J of mechanical work (W = +350 J). What is the change in internal energy ΔU in Joules?',
    correctAnswer: 450,
    tolerance: 5,
    unit: 'J',
    explanation: 'By the First Law of Thermodynamics: Q = ΔU + W. Rearranging: ΔU = Q - W = +800 J - (+350 J) = +450 J. Internal energy increases by 450 J, causing the gas temperature to rise.',
    hints: [
      'Recall energy conservation: Q = ΔU + W.',
      'ΔU = Q - W.',
      '800 J - 350 J = 450 J.',
    ],
  },
  {
    id: 'ch_13_s_iso_work',
    nodeId: NODE_C11_PHY_080,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Calculate the work done in Joules when 1.0 mole of ideal gas expands isothermally at 300 K from 2.0 L to 5.436 L (so V₂/V₁ = e ≈ 2.718, where ln(e) = 1.0). Take R = 8.314 J mol⁻¹ K⁻¹.',
    correctAnswer: 2494.2,
    tolerance: 30,
    unit: 'J',
    explanation: 'Work in isothermal expansion: W = n·R·T·ln(V₂/V₁). Here n = 1.0, R = 8.314, T = 300 K, ln(V₂/V₁) = ln(e) = 1.0. W = 1.0 × 8.314 × 300 × 1.0 = 2494.2 J.',
    hints: [
      'Master formula: W = n · R · T · ln(V₂ / V₁).',
      'Since V₂/V₁ = e, natural logarithm ln(e) = 1.',
      'Multiply: 1.0 × 8.314 × 300 × 1 = 2494.2 J.',
    ],
  },
  {
    id: 'ch_14_s_drag_sort_steps',
    nodeId: NODE_C11_PHY_075,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the logical derivation steps showing that Newton’s Law of Cooling is the small-temperature-difference approximation of Stefan’s Law.',
    sortItems: [
      'Net Stefan radiation: P_net = σ·e·A·(T⁴ - T_s⁴)',
      'Substitute T = T_s + ΔT with ΔT << T_s',
      'Binomial expansion: (T_s + ΔT)⁴ ≈ T_s⁴ + 4·T_s³·ΔT',
      'Equate heat loss m·c·(dT/dt) = -4σ·e·A·T_s³·(T - T_s)',
      'Obtain linear decay: dT/dt = -k·(T - T_s)',
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'We start from Stefan’s quartic radiative exchange P = σeA(T⁴ - Ts⁴), substitute T = Ts + ΔT, apply first-order binomial expansion to get 4Ts³ΔT, equate to rate of internal heat loss mc(dT/dt), and define cooling constant k = 4σeATs³/(mc).',
    hints: [
      'Start with the fundamental Stefan quartic equation (T⁴ - Ts⁴).',
      'Next express T in terms of ambient temperature plus small excess ΔT.',
      'Use the binomial theorem to linearise the 4th power before equating to mc(dT/dt).',
    ],
  },
  {
    id: 'ch_15_s_adi_slope',
    nodeId: NODE_C11_PHY_079,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why is the slope of an adiabatic curve (PV^γ = C) on a P-V diagram strictly steeper (by factor γ) than an isothermal curve (PV = C) passing through the same point?',
    options: [
      'Because adiabatic processes only occur at absolute zero',
      'Because in adiabatic expansion, pressure drops due to BOTH volume increase and temperature decrease (no heat enters to support T)',
      'Because gas molecules lose mass during adiabatic compression',
      'Because the gas constant R doubles during rapid expansion',
    ],
    correctIndex: 1,
    explanation: 'In isothermal expansion, heat enters from a bath to keep T constant, so P drops solely due to volume expansion (dP/dV = -P/V). In adiabatic expansion (Q = 0), the gas also cools as it does work, so P falls due to both volume increase and temperature drop (dP/dV = -γP/V). Since γ > 1, the adiabatic slope is steeper.',
    hints: [
      'Compare what happens to temperature in both processes.',
      'In isothermal, heat enters to maintain T. In adiabatic, Q = 0 so T must drop.',
      'A falling temperature causes an extra pressure drop on top of the volume expansion.',
    ],
  },

  // --- ADVANCED (7 Challenges) ---
  {
    id: 'ch_16_a_prevost_comp',
    nodeId: NODE_C11_PHY_071,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A payload sensor at 300 K is placed inside an ISRO calibration vacuum chamber whose walls are also at 300 K. According to Prevost’s Theory of Exchanges, what is physically occurring at the sensor surface?',
    options: [
      'All radiation stops completely because the temperature difference is zero',
      'The sensor only absorbs radiation and ceases to emit photons',
      'The sensor continuously emits and absorbs radiation at exactly equal rates, maintaining dynamic thermal equilibrium',
      'The emissivity of the sensor surface drops to exactly zero',
    ],
    correctIndex: 2,
    explanation: 'Prevost’s Theory of Exchanges asserts that every body above 0 K continuously emits radiation proportional to T⁴ and simultaneously absorbs radiation from its surroundings. At thermal equilibrium (T = Ts), rate of emission equals rate of absorption. Equilibrium is dynamic, never static.',
    hints: [
      'Does thermal radiation depend on surroundings, or only on the body’s own temperature?',
      'Every body above absolute zero radiates continuously.',
      'At equal temperatures, emission and absorption rates balance out to zero net heat transfer.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_17_a_mayer_relation',
    nodeId: NODE_C11_PHY_080,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Construct Mayer’s thermodynamic relation connecting molar heat capacities Cp, Cv and the gas constant R for an ideal gas.',
    availableParts: ['Cp', '-', 'Cv', '=', 'R', '+', 'γ', 'P·ΔV'],
    targetState: 'Cp - Cv = R',
    validationHint: 'Assemble: Cp minus Cv equals R',
    explanation: 'Mayer’s relation states Cp - Cv = R. At constant pressure, supplied heat must not only raise the internal energy (Cv·ΔT) but also perform external expansion work P·ΔV = R·ΔT per mole. Hence Cp = Cv + R.',
    hints: [
      'Molar heat capacity at constant pressure Cp is always greater than Cv.',
      'The difference between Cp and Cv equals the universal gas constant R.',
      'Select: Cp, -, Cv, =, R.',
    ],
  },
  {
    id: 'ch_18_a_thermos_eval',
    nodeId: NODE_C11_PHY_071,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'An engineer proposes using a blackened interior wall instead of a silvered mirror wall inside a cryogenic liquid-methane Dewar flask to keep it cold. Evaluate this design proposal.',
    options: [
      'Excellent proposal because black surfaces absorb unwanted ambient heat permanently',
      'Flawed design: Black surfaces have high emissivity and absorptivity (e ≈ 1), maximizing radiant heat transfer into the cryogenic liquid; silvering (e ≈ 0.05) is required to reflect thermal radiation',
      'Flawed design only because black paint increases thermal conduction through the vacuum gap',
      'Excellent proposal because black surfaces reduce convection currents inside the vacuum',
    ],
    correctIndex: 1,
    explanation: 'By Kirchhoff’s Law, good absorbers are good emitters (a = e). A black surface has emissivity near 1.0, absorbing all incident thermal radiation and radiating heavily into the cryogenic liquid. Silvered mirror surfaces have low emissivity (e ≈ 0.05) and high reflectivity, reflecting 95% of radiant heat away.',
    hints: [
      'Consider the role of emissivity e in radiative heat transfer I = e·σ·T⁴.',
      'A cryogenic Dewar must MINIMISE heat transfer across the vacuum gap.',
      'Silvered polished walls reflect radiation; blackened walls absorb and re-emit it.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_19_a_adi_gamma_calc',
    nodeId: NODE_C11_PHY_079,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A diatomic thruster gas (γ = 1.40) at initial pressure P₁ = 1.0 × 10⁵ Pa and volume V₁ = 2.0 L is compressed adiabatically to V₂ = 1.0 L (halving its volume). Calculate final pressure P₂ in kiloPascals (kPa). (Note: 2^1.4 ≈ 2.639).',
    correctAnswer: 263.9,
    tolerance: 5,
    unit: 'kPa',
    explanation: 'For an adiabatic process: P₁·V₁^γ = P₂·V₂^γ. Therefore P₂ = P₁ · (V₁ / V₂)^γ = 100 kPa × (2.0 / 1.0)^1.4 = 100 × 2.639 = 263.9 kPa.',
    hints: [
      'Use adiabatic equation: P1 · V1^γ = P2 · V2^γ.',
      'P2 = P1 · (V1 / V2)^1.4.',
      'Compute: 100 kPa × 2^1.4 = 100 × 2.639 ≈ 263.9 kPa.',
    ],
  },
  {
    id: 'ch_20_a_searles_error',
    nodeId: NODE_C11_PHY_072,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Why is it physically invalid to calculate thermal conductivity k in Searle’s experiment before the four thermometers reach steady state?',
    options: [
      'Before steady state, thermal expansion alters the rod length d uncontrollably',
      'Before steady state, part of the heat entering is absorbed to raise the bar’s internal thermal capacity (heat accumulation), so Q_in ≠ Q_out',
      'The specific heat capacity of water s changes by 100x during transient heating',
      'The Zeroth Law of Thermodynamics is violated during unsteady states',
    ],
    correctIndex: 1,
    explanation: 'The standard conduction equation Q/t = k·A·ΔT/d assumes constant heat flux through every cross-section. Before steady state is achieved, temperatures along the bar keep rising: heat is stored within the bar’s mass (dQ = m_bar·c_bar·dT), so the heat reaching the water coil does not equal the heat entered from the steam.',
    hints: [
      'What is the bar itself doing while its temperature is still climbing?',
      'Heat is being stored in the metal rather than merely flowing through it.',
      'Steady state guarantees that heat entering equals heat leaving (no accumulation).',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_21_a_compression_work',
    nodeId: NODE_C11_PHY_080,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'An ISRO compressor compresses 2.0 moles of gas isothermally at 400 K from 8.0 L down to 2.0 L (V₂/V₁ = 0.25; ln(0.25) ≈ -1.3863). Calculate work done ON the gas in Joules (magnitude of W). Take R = 8.314 J mol⁻¹ K⁻¹.',
    correctAnswer: 9221.8,
    tolerance: 50,
    unit: 'J',
    explanation: 'W = n·R·T·ln(V₂/V₁) = 2.0 × 8.314 × 400 × ln(0.25) = 6651.2 × (-1.3863) = -9221.8 J. The negative sign denotes work done on the gas; the magnitude of work done on the gas is 9221.8 J.',
    hints: [
      'Formula: W = n · R �� T · ln(V₂ / V₁).',
      'W = 2 · 8.314 · 400 · ln(2 / 8) = 6651.2 · (-1.3863) = -9221.8 J.',
      'Magnitude of work done on the gas is 9221.8 J.',
    ],
  },
  {
    id: 'ch_22_a_joule_cal',
    nodeId: NODE_C11_PHY_079,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'During a spacecraft thruster cycle, an adiabatic stage produces 2100 J of work. Convert this mechanical energy to heat units in calories using Joule’s Mechanical Equivalent of Heat (1 cal = 4.2 J).',
    correctAnswer: 500,
    tolerance: 5,
    unit: 'cal',
    explanation: 'Using Joule’s relation: W (Joules) = J_equiv × Q (calories) where J_equiv = 4.2 J/cal. Heat equivalent = 2100 J / (4.2 J/cal) = 500 cal.',
    hints: [
      'Conversion rule: 1 calorie = 4.2 Joules.',
      'Divide mechanical work in Joules by 4.2 to obtain calories.',
      '2100 / 4.2 = 500 cal.',
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
  nodeId: NODE_C11_PHY_071,
  title: 'Thermal Physics: Radiation, Conduction & Thermodynamics',
  definition: 'Comprehensive mastery of heat transfer mechanisms (radiation, conduction, Searle’s method), blackbody laws (Stefan-Boltzmann, Wien), Newton’s cooling law, Zeroth law, and First Law processes (isothermal, adiabatic).',
  eli5: 'Heat is energy on the move! It beams through space as waves (radiation), crawls through metal rods (conduction), and drives pistons in engines by pushing and changing temperature (First Law of Thermodynamics).',
  misconceptions: [
    {
      misconception: 'Thermal radiation requires air or a medium to travel.',
      correction: 'Thermal radiation travels as electromagnetic waves and moves effortlessly across the vacuum of space.',
    },
    {
      misconception: 'At thermal equilibrium, radiation emission and absorption stop completely.',
      correction: 'Prevost’s Law proves bodies continually emit and absorb photons at equal rates in dynamic equilibrium.',
    },
    {
      misconception: 'In an isothermal process, because temperature is constant, no heat is exchanged (Q = 0).',
      correction: 'Constant temperature means ΔU = 0, so Q = W. Heat must continuously enter to provide expansion work.',
    },
    {
      misconception: 'In an adiabatic process, temperature stays constant because Q = 0.',
      correction: 'Q = 0 implies ΔU = -W. Expansion work depletes internal energy, causing the gas to cool significantly.',
    },
    {
      misconception: 'Thicker conductors conduct heat faster because they have more matter.',
      correction: 'In Q/t = k·A·ΔT/d, thickness d is in the denominator. Greater length increases thermal resistance and slows heat flow.',
    },
  ],
  diagnosticQuestions: [
    {
      question: 'Which mode of heat transfer operates across the vacuum of deep space?',
      options: ['Conduction', 'Convection', 'Radiation', 'Advection'],
      correctIndex: 2,
    },
    {
      question: 'What is the SI unit of Stefan\'s constant σ in I = σ·T⁴?',
      options: ['W m⁻¹ K⁻¹', 'W m⁻² K⁻⁴', 'J K⁻¹', 'N m⁻²'],
      correctIndex: 1,
    },
    {
      question: 'Wien\'s displacement law states that λmax is proportional to:',
      options: ['T⁴', 'T²', '1/T', 'T'],
      correctIndex: 2,
    },
    {
      question: 'In an isothermal expansion of an ideal gas, the change in internal energy ΔU is:',
      options: ['Positive', 'Negative', 'Zero', 'Infinite'],
      correctIndex: 2,
    },
    {
      question: 'Newton\'s law of cooling is a valid approximation of Stefan\'s law when:',
      options: ['Temperature difference is very large (> 500 K)', 'Temperature difference is small compared to surroundings', 'The body is in direct sunlight', 'The surroundings are at absolute zero'],
      correctIndex: 1,
    },
    {
      question: 'The slope of an adiabatic curve on a P-V diagram compared to an isothermal curve is:',
      options: ['Less steep', 'Exactly equal', 'Steeper by factor γ', 'Horizontal'],
      correctIndex: 2,
    },
    {
      question: 'Mayer\'s relation for ideal gas molar heat capacities is:',
      options: ['Cp + Cv = R', 'Cp - Cv = R', 'Cp / Cv = R', 'Cv - Cp = R'],
      correctIndex: 1,
    },
    {
      question: 'In Searle\'s thermal conductivity apparatus, measurements are valid only when:',
      options: ['The bar is cooling rapidly', 'The steam runs out', 'Steady state is reached across all thermometers', 'The water is boiling in the coil'],
      correctIndex: 2,
    },
  ],
  masteryCriteria: 'Student demonstrates full mastery of thermal radiation, conduction equations, Stefan/Wien laws, cooling curves, and First Law cycles with real-time quantitative predictions.',
};

// ─── BRILLIANT.ORG INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Blackbody Radiation & Stefan-Boltzmann Law',
    instruction: 'Adjust the radiator temperature slider (300 K to 1200 K) and surface emissivity. Observe how radiant intensity I(T) explodes with T⁴!',
    interactionType: 'slider-stefan',
    nodeId: NODE_C11_PHY_073,
  },
  {
    title: 'Lab 2: Wien’s Displacement & Spectral Shift',
    instruction: 'Heat the celestial radiator. Observe the peak wavelength λmax shift leftward from infrared to blazing blue-white according to λmax·T = b.',
    interactionType: 'slider-wien',
    nodeId: NODE_C11_PHY_074,
  },
  {
    title: 'Lab 3: Searle’s Thermal Conduction Bar',
    instruction: 'Change the bar material (Copper, Aluminium, Glass) and length d. Watch the temperature gradient form in real-time steady state.',
    interactionType: 'searles-sim',
    nodeId: NODE_C11_PHY_072,
  },
  {
    title: 'Lab 4: Newton’s Law of Cooling Chamber',
    instruction: 'Set the initial body temperature and ambient room temperature. Run the real-time cooling decay curve T(t) = Ts + (T₀ - Ts)e^(-kt).',
    interactionType: 'cooling-sim',
    nodeId: NODE_C11_PHY_075,
  },
  {
    title: 'Lab 5: Thermodynamic Cycles: Isothermal vs Adiabatic',
    instruction: 'Compress and expand the gas piston! Toggle between Isothermal (heat flows, ΔT = 0, PV = C) and Adiabatic (insulated, Q = 0, PV^γ = C).',
    interactionType: 'piston-sim',
    nodeId: NODE_C11_PHY_078,
  },
];

// ─── REAL-WORLD CAPSTONE ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Mission Specialist Capstone: Mars Lander Thermal & Propulsion Audit',
  description: 'Apply your thermal physics mastery to design the environmental control and reaction control systems for the ISRO Mangalyaan Lander.',
  steps: [
    'Calculate total radiant heat loss from the gold-foil covered lander chassis (e = 0.04, A = 6.0 m²) in Martian night (180 K).',
    'Size the copper heat pipes (k = 385 W/m·K) transferring waste heat from the RTG generator to the scientific bay.',
    'Predict the cooling rate of the hydrazine fuel tanks using Newton’s Law to prevent freezing during orbital eclipses.',
    'Compute the work output of the pneumatic attitude thrusters during rapid adiabatic nitrogen expansion.',
  ],
};

function C11_PhysicsHeatTransferRadiationSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C11_PHY_071,
  title = DEFAULT_PROPS.title || 'Thermal Physics & Thermodynamics',
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['physics'] || { name: 'Physics', emoji: '⚡', color: 'blue' };

  // Phase flow: discovery -> explore -> sandbox -> challenge -> complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Predict-then-check state
  const [predictionIndex, setPredictionIndex] = useState(0);
  const [selectedPredictions, setSelectedPredictions] = useState<Record<number, number>>({});
  const [predictionSubmitted, setPredictionSubmitted] = useState<Record<number, boolean>>({});

  // Interactive Lab Sim Variables
  const [simTemp, setSimTemp] = useState(600); // Kelvin
  const [simEmissivity, setSimEmissivity] = useState(0.85); // 0 to 1
  const [simMaterial, setSimMaterial] = useState<'copper' | 'aluminium' | 'glass'>('copper');
  const [simBarLength, setSimBarLength] = useState(0.2); // metres
  const [simBarArea, setSimBarArea] = useState(5.0); // cm²
  const [coolingT0, setCoolingT0] = useState(80); // °C
  const [coolingTs, setCoolingTs] = useState(25); // °C
  const [coolingTimeElapsed, setCoolingTimeElapsed] = useState(0); // mins
  const [coolingRunning, setCoolingRunning] = useState(false);
  const [pistonVol, setPistonVol] = useState(4.0); // Litres
  const [pistonMode, setPistonMode] = useState<'isothermal' | 'adiabatic'>('isothermal');
  const [pistonMoles, setPistonMoles] = useState(1.0); // moles
  const [pistonBaseTemp, setPistonBaseTemp] = useState(300); // K

  // Adaptive difficulty & BKT
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('foundation');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Escalating hints state
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  // Challenge interaction states
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Discovery states
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Visual feedback states
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // BKT persistence ref
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const coolingCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Material thermal conductivity lookup table
  const MATERIAL_K = useMemo(() => ({
    copper: 385,
    aluminium: 205,
    glass: 0.8,
  }), []);

  // ─── ADAPTIVE DIFFICULTY FILTER ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── LOAD INITIAL MASTERY ON MOUNT ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT ADAPTIVE UPDATE EFFECT ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDiff = mastery === 'not-started' || mastery === 'beginner' ? 'foundation'
      : mastery === 'developing' ? 'standard' : 'advanced';
    setDifficulty(prev => {
      if (prev !== newDiff) {
        setCurrentChallenge(0);
        return newDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── REAL-TIME THERMAL SIMULATION DERIVATIONS ───
  // Stefan Law: I = e * sigma * T^4
  const simRadiantIntensity = useMemo(() => {
    return simEmissivity * SIGMA * Math.pow(simTemp, 4);
  }, [simTemp, simEmissivity]);

  // Wien Law: lambda_max = b / T (in nm)
  const simPeakWavelengthNm = useMemo(() => {
    return (WIEN_B / simTemp) * 1e9;
  }, [simTemp]);

  // Searle Conduction: Heat Rate Q/t = k * A * dT / d (with hot end = 100°C, cold end = 20°C)
  const simConductionRateWatts = useMemo(() => {
    const k = MATERIAL_K[simMaterial];
    const areaM2 = (simBarArea * 1e-4);
    const deltaT = 80; // (100°C - 20°C)
    return (k * areaM2 * deltaT) / simBarLength;
  }, [simMaterial, simBarArea, simBarLength, MATERIAL_K]);

  // Newton Cooling Temperature at time t: T(t) = Ts + (T0 - Ts)*e^(-kt) (assume k = 0.08 min^-1)
  const simCurrentCoolingTemp = useMemo(() => {
    const kCool = 0.08;
    return coolingTs + (coolingT0 - coolingTs) * Math.exp(-kCool * coolingTimeElapsed);
  }, [coolingT0, coolingTs, coolingTimeElapsed]);

  // Piston Thermodynamic Calculations
  const simPistonState = useMemo(() => {
    const n = pistonMoles;
    const V = pistonVol; // Litres
    const V_m3 = V * 1e-3;
    const V0 = 2.0; // Reference initial volume in L
    const P0_Pa = 202650; // 2.0 atm

    if (pistonMode === 'isothermal') {
      const T = pistonBaseTemp;
      const P_Pa = (n * R_GAS * T) / V_m3;
      const P_atm = P_Pa / 101325;
      const workJ = n * R_GAS * T * Math.log(V / V0);
      return { P_atm, P_kPa: P_Pa / 1000, T_K: T, workJ, deltaU: 0, heatQ: workJ };
    } else {
      const gamma = 1.4;
      const P_Pa = P0_Pa * Math.pow(V0 / V, gamma);
      const P_atm = P_Pa / 101325;
      const T_K = pistonBaseTemp * Math.pow(V0 / V, gamma - 1);
      const Cv = (5 / 2) * R_GAS;
      const deltaU = n * Cv * (T_K - pistonBaseTemp);
      const workJ = -deltaU;
      return { P_atm, P_kPa: P_Pa / 1000, T_K, workJ, deltaU, heatQ: 0 };
    }
  }, [pistonVol, pistonMode, pistonMoles, pistonBaseTemp]);

  // ─── 2D CANVAS 1: WIEN'S BLACKBODY SPECTRUM PLOTTER ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    // Background grid
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1;
    for (let x = 40; x < width; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height - 25);
      ctx.stroke();
    }
    for (let y = 20; y < height - 25; y += 30) {
      ctx.beginPath();
      ctx.moveTo(40, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Visible Spectrum Highlight (380 nm to 750 nm)
    const minLambda = 100;
    const maxLambda = 2000;
    const scaleX = (width - 60) / (maxLambda - minLambda);
    const visStart = 40 + (380 - minLambda) * scaleX;
    const visEnd = 40 + (750 - minLambda) * scaleX;

    const grad = ctx.createLinearGradient(visStart, 0, visEnd, 0);
    grad.addColorStop(0, 'rgba(147, 51, 234, 0.25)');
    grad.addColorStop(0.2, 'rgba(59, 130, 246, 0.25)');
    grad.addColorStop(0.4, 'rgba(34, 197, 94, 0.25)');
    grad.addColorStop(0.7, 'rgba(234, 179, 8, 0.25)');
    grad.addColorStop(1, 'rgba(239, 68, 68, 0.25)');

    ctx.fillStyle = grad;
    ctx.fillRect(visStart, 0, visEnd - visStart, height - 25);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '10px monospace';
    ctx.fillText('Visible Band (380-750 nm)', visStart + 10, 15);

    ctx.beginPath();
    ctx.strokeStyle = simTemp > 800 ? '#60a5fa' : simTemp > 500 ? '#fbbf24' : '#f87171';
    ctx.lineWidth = 3;

    const peakLam = simPeakWavelengthNm;
    let peakCanvasX = 40;
    let peakCanvasY = height - 25;

    for (let px = 40; px < width - 10; px++) {
      const lam = minLambda + (px - 40) / scaleX;
      const ratio = peakLam / lam;
      const intensityNorm = Math.pow(ratio, 5) / (Math.exp(5 * (ratio - 1)) + 0.001);
      const plotHeight = Math.min(height - 35, intensityNorm * (height - 45) * Math.min(1.5, Math.pow(simTemp / 600, 2)));
      const py = (height - 25) - plotHeight;

      if (px === 40) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);

      if (Math.abs(lam - peakLam) < 5) {
        peakCanvasX = px;
        peakCanvasY = py;
      }
    }
    ctx.stroke();

    ctx.fillStyle = '#facc15';
    ctx.beginPath();
    ctx.arc(peakCanvasX, peakCanvasY, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.setLineDash([3, 3]);
    ctx.strokeStyle = '#facc15';
    ctx.beginPath();
    ctx.moveTo(peakCanvasX, peakCanvasY);
    ctx.lineTo(peakCanvasX, height - 25);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = '#facc15';
    ctx.font = 'bold 11px monospace';
    ctx.fillText(`λmax = ${peakLam.toFixed(0)} nm`, Math.max(50, Math.min(width - 120, peakCanvasX - 35)), peakCanvasY - 10);

    ctx.fillStyle = '#cbd5e1';
    ctx.font = '10px monospace';
    ctx.fillText('0', 25, height - 25);
    ctx.fillText('λ (nm) →', width - 60, height - 8);
    ctx.fillText('Spectral Radiancy R(λ) →', 10, height - 15);
  }, [simTemp, simPeakWavelengthNm]);

  // ─── 2D CANVAS 2: NEWTON COOLING REAL-TIME GRAPH ───
  useEffect(() => {
    const canvas = coolingCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, width, height);

    const scaleY = (height - 40) / 100;
    const yTs = (height - 20) - coolingTs * scaleY;

    ctx.strokeStyle = '#38bdf8';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(35, yTs);
    ctx.lineTo(width - 10, yTs);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = '#38bdf8';
    ctx.font = '10px monospace';
    ctx.fillText(`Surroundings Ts = ${coolingTs} °C (Asymptote)`, 45, yTs - 5);

    ctx.beginPath();
    ctx.strokeStyle = '#ec4899';
    ctx.lineWidth = 2.5;

    const maxT = 40;
    const scaleX = (width - 50) / maxT;

    for (let t = 0; t <= maxT; t += 0.5) {
      const tempVal = coolingTs + (coolingT0 - coolingTs) * Math.exp(-0.08 * t);
      const px = 35 + t * scaleX;
      const py = (height - 20) - tempVal * scaleY;

      if (t === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();

    const currentPx = 35 + coolingTimeElapsed * scaleX;
    const currentPy = (height - 20) - simCurrentCoolingTemp * scaleY;

    ctx.fillStyle = '#f43f5e';
    ctx.beginPath();
    ctx.arc(currentPx, currentPy, 6, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 11px monospace';
    ctx.fillText(`${simCurrentCoolingTemp.toFixed(1)} °C at ${coolingTimeElapsed.toFixed(0)}m`, Math.min(width - 120, currentPx + 8), currentPy - 8);

    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(35, 10);
    ctx.lineTo(35, height - 20);
    ctx.lineTo(width - 10, height - 20);
    ctx.stroke();

    ctx.fillStyle = '#94a3b8';
    ctx.font = '10px monospace';
    ctx.fillText('Time (min) →', width - 80, height - 5);
  }, [coolingT0, coolingTs, coolingTimeElapsed, simCurrentCoolingTemp]);

  // Real-time interval for cooling curve progression
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (coolingRunning) {
      interval = setInterval(() => {
        setCoolingTimeElapsed(prev => {
          if (prev >= 40) {
            setCoolingRunning(false);
            return 40;
          }
          return prev + 0.5;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [coolingRunning]);

  // ─── MEMOISED EVENT HANDLERS ───
  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding physics intuition!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the thermal exploration labs. Make your predictions and verify them.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Feel free to explore all thermodynamic variables with zero pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Mission challenges active. Apply your thermal laws.');
  }, []);

  const handleMaterialSelect = useCallback((mat: 'copper' | 'aluminium' | 'glass') => {
    setSimMaterial(mat);
    audioManager.play('pop');
  }, []);

  const handlePistonModeToggle = useCallback((mode: 'isothermal' | 'adiabatic') => {
    setPistonMode(mode);
    audioManager.play('pop');
  }, []);

  const handleCoolingReset = useCallback(() => {
    setCoolingTimeElapsed(0);
    setCoolingRunning(true);
    audioManager.play('whoosh');
  }, []);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    const isCorrect = challenge.correctMapping?.[targetId] === draggedItem;
    if (isCorrect) {
      setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
      audioManager.play('drop-correct');
    } else {
      audioManager.play('drop-wrong');
    }
    setDraggedItem(null);
  }, [draggedItem, challenge]);

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      if (prev.length === 0 && challenge.sortItems) {
        prev = challenge.sortItems.map((_, i) => i);
      }
      const arr = [...prev];
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [challenge]);

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems?.map((_, i) => i) || []);
    const isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctOrder);
    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('success');
      speechManager.speak('Correct derivation order!');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);
    } else {
      audioManager.play('error');
      setWrongShake(true);
      setWrongFlash(true);
      setTimeout(() => setWrongShake(false), 500);
      setTimeout(() => setWrongFlash(false), 800);
      setErrors(e => e + 1);
      setHintCount(prev => prev + 1);
    }
  }, [sortArrangement, challenge]);

  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge.hints && challenge.hints[nextLevel - 1]) {
      setCurrentHint(challenge.hints[nextLevel - 1]);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(challenge.hints[nextLevel - 1]);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
    }
  }, [hintCount, challenge]);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak(`Mission accomplished! You scored ${finalScore} percent with ${masteryLevel} mastery.`);
  }, [errors, onComplete, masteryLevel]);

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

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  const handleAnswer = useCallback((answer: number | Record<string, string> | number[] | string) => {
    let isCorrect = false;

    if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
      isCorrect = answer === challenge.correctIndex;
    } else if (challenge.type === 'drag-label') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctMapping);
    } else if (challenge.type === 'drag-sort') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctOrder);
    } else if (challenge.type === 'numeric') {
      const numAnswer = typeof answer === 'string' ? parseFloat(answer) : answer as number;
      isCorrect = Math.abs(numAnswer - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
    } else if (challenge.type === 'construct') {
      isCorrect = answer === challenge.targetState;
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Flawless deduction.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 4000);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
      }
    } else {
      audioManager.play('drop-wrong');
      audioManager.play('error');
      setErrors(e => e + 1);
      setWrongShake(true);
      setWrongFlash(true);
      setTimeout(() => setWrongShake(false), 500);
      setTimeout(() => setWrongFlash(false), 800);

      if (challenge.misconceptionIndex !== undefined && !hitMisconceptions.includes(challenge.misconceptionIndex)) {
        setHitMisconceptions(prev => [...prev, challenge.misconceptionIndex!]);
      }

      if (hintCount < 3) {
        showNextHint();
      } else {
        setAnswerRevealed(true);
        setShowExplanation(true);
        speechManager.speak('Let us study the complete step-by-step solution.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]);

  // Clean timer on unmount
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl">
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between pb-4 mb-6 border-b border-slate-800 gap-4"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-blue-950/60 rounded-2xl border border-blue-800/80">🛰️</span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-900/60 text-blue-300 border border-blue-700">
                ISC Class 11 Physics
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                Nodes 071-080
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white mt-1">{title}</h1>
          </div>
        </div>

        {/* Phase / Difficulty Pill */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400 font-medium hidden sm:inline">Difficulty:</span>
          <motion.span
            key={difficulty}
            initial={{ scale: 0.85 }}
            animate={{ scale: 1 }}
            className={`text-xs px-3 py-1 font-bold rounded-full border uppercase tracking-wider ${
              difficulty === 'foundation'
                ? 'bg-emerald-950 text-emerald-400 border-emerald-700'
                : difficulty === 'standard'
                ? 'bg-blue-950 text-blue-400 border-blue-700'
                : 'bg-purple-950 text-purple-400 border-purple-700'
            }`}
          >
            {difficulty} Tier
          </motion.span>
        </div>
      </motion.div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-5 bg-gradient-to-r from-blue-950/70 via-indigo-950/40 to-slate-900 rounded-2xl border border-blue-800/60">
            <div className="flex items-center gap-2 text-blue-400 font-bold text-sm mb-1">
              <span>🚀 MISSION SCENARIO</span>
            </div>
            <h2 className="text-xl font-bold text-white">{SCENARIO.title}</h2>
            <p className="text-slate-300 text-sm mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-slate-400 text-xs mt-2 italic">{SCENARIO.context}</p>
          </div>

          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Discovery Challenge (Intuition Hook)</span>
            <p className="text-base md:text-lg font-semibold text-white mt-2 mb-4 leading-snug">
              {DISCOVERY_QUESTION.question}
            </p>

            <div className="space-y-3">
              {DISCOVERY_QUESTION.options.map((option, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.01, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleDiscoveryAnswer(idx)}
                  disabled={discoveryAnswered}
                  aria-label={`Option: ${option}`}
                  className={`w-full text-left p-4 rounded-xl border text-sm font-medium transition-all ${
                    discoveryAnswered
                      ? idx === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                        : 'bg-slate-900 border-slate-800 text-slate-500 opacity-60'
                      : 'bg-slate-800/80 hover:bg-slate-700/80 border-slate-700 text-slate-200'
                  }`}
                >
                  <span className="font-mono text-xs mr-3 text-slate-400">[{String.fromCharCode(65 + idx)}]</span>
                  {option}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
                <p className={`text-sm font-medium ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {discoveryCorrect ? '✨ Perfect intuition! The T⁴ law causes dramatic radiation changes.' : DISCOVERY_QUESTION.hintAfter}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl font-bold shadow-lg shadow-blue-500/20"
                >
                  Enter Interactive Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE EXPLORATION ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Slide Navigation Tabs */}
          <div className="flex flex-wrap gap-2 pb-2 border-b border-slate-800">
            {EXPLORATION_STEPS.map((step, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  setCurrentSlide(idx);
                  audioManager.play('tap');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  currentSlide === idx
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
              >
                Lab {idx + 1}
              </motion.button>
            ))}
          </div>

          {/* Predict-Then-Check Interactive Box */}
          <div className="p-5 bg-gradient-to-r from-indigo-950/50 via-slate-900 to-slate-900 rounded-2xl border border-indigo-800/60 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-bold text-amber-400 font-mono uppercase tracking-wider flex items-center gap-1.5">
                <span>🔮</span> Prediction & Verification (Question {predictionIndex + 1} of {PREDICTION_QUESTIONS.length})
              </span>
              <div className="flex gap-2">
                {PREDICTION_QUESTIONS.map((_, pIdx) => (
                  <button
                    key={pIdx}
                    onClick={() => setPredictionIndex(pIdx)}
                    className={`w-6 h-6 rounded-full text-xs font-bold font-mono transition-all ${
                      predictionIndex === pIdx
                        ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30'
                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                    }`}
                  >
                    {pIdx + 1}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-sm font-semibold text-slate-200">
              {PREDICTION_QUESTIONS[predictionIndex].question}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {PREDICTION_QUESTIONS[predictionIndex].options.map((opt, oIdx) => {
                const isSelected = selectedPredictions[predictionIndex] === oIdx;
                const isSubmitted = predictionSubmitted[predictionIndex];
                const isCorrect = oIdx === PREDICTION_QUESTIONS[predictionIndex].correctIndex;
                return (
                  <button
                    key={oIdx}
                    disabled={isSubmitted}
                    onClick={() => {
                      setSelectedPredictions(prev => ({ ...prev, [predictionIndex]: oIdx }));
                      setPredictionSubmitted(prev => ({ ...prev, [predictionIndex]: true }));
                      audioManager.play(isCorrect ? 'drop-correct' : 'pop');
                    }}
                    className={`p-2.5 rounded-xl text-left text-xs font-medium border transition-all ${
                      isSubmitted
                        ? isCorrect
                          ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                          : isSelected
                          ? 'bg-rose-950/60 border-rose-500 text-rose-200'
                          : 'bg-slate-900/60 border-slate-800 text-slate-500'
                        : 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-300'
                    }`}
                  >
                    <span className="font-mono text-slate-400 mr-1.5">[{String.fromCharCode(65 + oIdx)}]</span>
                    {opt}
                  </button>
                );
              })}
            </div>

            {predictionSubmitted[predictionIndex] && (
              <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-blue-950/40 rounded-xl border border-blue-800/60 space-y-1">
                <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                  <span>🔬 Verification Task:</span>
                </div>
                <p className="text-xs text-slate-300">
                  {PREDICTION_QUESTIONS[predictionIndex].verifyInstruction}
                </p>
                <p className="text-xs text-emerald-300 mt-1">
                  💡 {PREDICTION_QUESTIONS[predictionIndex].explanation}
                </p>
              </motion.div>
            )}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-5 md:p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-6"
            >
              <div>
                <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest">
                  LAB {currentSlide + 1} OF {EXPLORATION_STEPS.length}
                </span>
                <h3 className="text-xl font-black text-white mt-1">{EXPLORATION_STEPS[currentSlide].title}</h3>
                <p className="text-amber-400 text-sm mt-1 font-medium">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>
              </div>

              {/* ─── LAB 1: STEFAN-BOLTZMANN INTERACTIVE VISUALIZER ─── */}
              {currentSlide === 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs font-mono text-slate-300 mb-1">
                        <span>Radiator Temp (T):</span>
                        <span className="text-blue-400 font-bold">{simTemp} K ({simTemp - 273} °C)</span>
                      </div>
                      <input
                        type="range"
                        min={300}
                        max={1200}
                        step={10}
                        value={simTemp}
                        aria-label="Radiator Temperature"
                        onChange={(e) => setSimTemp(Number(e.target.value))}
                        className="w-full accent-blue-500"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-mono text-slate-300 mb-1">
                        <span>Surface Emissivity (e):</span>
                        <span className="text-emerald-400 font-bold">{simEmissivity.toFixed(2)} {simEmissivity > 0.8 ? '(Dull Black)' : '(Polished Silver)'}</span>
                      </div>
                      <input
                        type="range"
                        min={0.05}
                        max={1.0}
                        step={0.05}
                        value={simEmissivity}
                        aria-label="Surface Emissivity"
                        onChange={(e) => setSimEmissivity(Number(e.target.value))}
                        className="w-full accent-emerald-500"
                      />
                    </div>

                    {/* Formula box */}
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                      <div className="text-xs font-mono text-slate-400">STEFAN-BOLTZMANN EQUATION</div>
                      <div className="text-sm md:text-base font-bold text-amber-300 font-mono">
                        I = e · σ · T⁴
                      </div>
                      <div className="text-xs text-slate-400 leading-relaxed font-mono">
                        = ({simEmissivity.toFixed(2)}) × (5.67×10⁻⁸) × ({simTemp})⁴
                      </div>
                      <div className="text-lg font-black text-emerald-400 font-mono pt-1 border-t border-slate-800">
                        Radiant Intensity: {simRadiantIntensity.toLocaleString('en-US', { maximumFractionDigits: 1 })} W/m²
                      </div>
                    </div>
                  </div>

                  {/* SVG Heat Radiator Graphic */}
                  <div className="flex flex-col items-center justify-center p-4 bg-slate-900 rounded-xl border border-slate-800">
                    <svg viewBox="0 0 300 200" className="w-full max-w-xs">
                      {/* Radiating Panel */}
                      <rect
                        x="100"
                        y="60"
                        width="100"
                        height="80"
                        rx="10"
                        fill={simTemp > 900 ? '#fef08a' : simTemp > 600 ? '#f97316' : '#ef4444'}
                        opacity={simEmissivity}
                        stroke="#60a5fa"
                        strokeWidth="2"
                      />
                      <text x="150" y="105" textAnchor="middle" fill="#0f172a" fontSize="12" fontWeight="bold">
                        {simTemp} K
                      </text>
                      <text x="150" y="120" textAnchor="middle" fill="#0f172a" fontSize="9">
                        e = {simEmissivity.toFixed(2)}
                      </text>

                      {/* Animated Photons */}
                      {[0, 1, 2, 3, 4, 5].map((i) => {
                        const angle = (i * Math.PI) / 3;
                        const len = Math.min(80, (simRadiantIntensity / 3000) * 40 + 20);
                        const x1 = 150 + Math.cos(angle) * 55;
                        const y1 = 100 + Math.sin(angle) * 45;
                        const x2 = 150 + Math.cos(angle) * (55 + len);
                        const y2 = 100 + Math.sin(angle) * (45 + len);
                        return (
                          <g key={i}>
                            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#facc15" strokeWidth="2" strokeDasharray="4 2" />
                            <polygon
                              points={`${x2},${y2} ${x2 - 4},${y2 - 3} ${x2 - 4},${y2 + 3}`}
                              fill="#facc15"
                              transform={`rotate(${(angle * 180) / Math.PI}, ${x2}, ${y2})`}
                            />
                          </g>
                        );
                      })}
                    </svg>
                    <span className="text-xs text-slate-400 font-mono mt-2">Emission Flux Proportional to T⁴</span>
                  </div>
                </div>
              )}

              {/* ─── LAB 2: WIEN'S DISPLACEMENT LAW SIMULATOR ─── */}
              {currentSlide === 1 && (
                <div className="space-y-4 bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <div className="text-xs font-mono text-slate-400">Radiator Temperature (T):</div>
                      <div className="text-lg font-bold text-blue-400 font-mono">{simTemp} K</div>
                    </div>
                    <div>
                      <div className="text-xs font-mono text-slate-400">Peak Wavelength (λmax = b/T):</div>
                      <div className="text-lg font-bold text-amber-400 font-mono">{simPeakWavelengthNm.toFixed(0)} nm</div>
                    </div>
                    <div>
                      <div className="text-xs font-mono text-slate-400">Dominant Emission Color:</div>
                      <div className="text-sm font-bold font-mono text-emerald-400">
                        {simPeakWavelengthNm > 750 ? 'Infrared (Thermal Heat)' : simPeakWavelengthNm > 620 ? 'Deep Red' : simPeakWavelengthNm > 570 ? 'Yellow-White' : 'Blue-White Visible'}
                      </div>
                    </div>
                  </div>

                  <input
                    type="range"
                    min={400}
                    max={6000}
                    step={50}
                    value={simTemp}
                    aria-label="Wien Temperature Slider"
                    onChange={(e) => setSimTemp(Number(e.target.value))}
                    className="w-full accent-amber-500"
                  />

                  <canvas ref={canvasRef} width={600} height={200} className="w-full rounded-xl border border-slate-800" />
                </div>
              )}

              {/* ─── LAB 3: SEARLE'S THERMAL CONDUCTIVITY BAR ─── */}
              {currentSlide === 2 && (
                <div className="space-y-4 bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-mono text-slate-400">Conductor Material:</label>
                      <div className="flex gap-2 mt-1">
                        {(['copper', 'aluminium', 'glass'] as const).map((m) => (
                          <motion.button
                            key={m}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleMaterialSelect(m)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                              simMaterial === m
                                ? 'bg-blue-600 text-white'
                                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                            }`}
                          >
                            {m} (k={MATERIAL_K[m]})
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-mono text-slate-400 mb-1">
                        <span>Rod Length (d):</span>
                        <span className="text-blue-400 font-bold">{simBarLength} m</span>
                      </div>
                      <input
                        type="range"
                        min={0.05}
                        max={0.50}
                        step={0.05}
                        value={simBarLength}
                        aria-label="Rod Length"
                        onChange={(e) => setSimBarLength(Number(e.target.value))}
                        className="w-full accent-blue-500"
                      />
                    </div>

                    <div>
                      <div className="text-xs font-mono text-slate-400">Steady State Conduction Rate:</div>
                      <div className="text-xl font-black text-emerald-400 font-mono mt-1">
                        {simConductionRateWatts.toFixed(1)} Watts (J/s)
                      </div>
                    </div>
                  </div>

                  {/* Labeled Searle’s Conduction Bar Graphic */}
                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                    <svg viewBox="0 0 500 140" className="w-full">
                      {/* Steam Chamber */}
                      <rect x="20" y="30" width="70" height="80" rx="6" fill="#ef4444" opacity="0.85" />
                      <text x="55" y="65" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">STEAM</text>
                      <text x="55" y="80" textAnchor="middle" fill="#ffffff" fontSize="9">100 °C</text>

                      {/* Conductor Bar */}
                      <rect
                        x="90"
                        y="50"
                        width="320"
                        height="40"
                        fill={simMaterial === 'copper' ? '#b45309' : simMaterial === 'aluminium' ? '#94a3b8' : '#38bdf8'}
                        stroke="#475569"
                        strokeWidth="2"
                      />
                      <text x="250" y="75" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="bold">
                        {simMaterial.toUpperCase()} (k = {MATERIAL_K[simMaterial]} W/m·K)
                      </text>

                      {/* Water Coil */}
                      <rect x="410" y="30" width="70" height="80" rx="6" fill="#3b82f6" opacity="0.85" />
                      <text x="445" y="65" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">WATER</text>
                      <text x="445" y="80" textAnchor="middle" fill="#ffffff" fontSize="9">20 °C</text>

                      {/* Thermometer indicators */}
                      <line x1="160" y1="20" x2="160" y2="50" stroke="#facc15" strokeWidth="2" />
                      <circle cx="160" cy="18" r="4" fill="#facc15" />
                      <text x="160" y="10" textAnchor="middle" fill="#facc15" fontSize="8" fontWeight="bold">T1 ≈ 85°C</text>

                      <line x1="320" y1="20" x2="320" y2="50" stroke="#facc15" strokeWidth="2" />
                      <circle cx="320" cy="18" r="4" fill="#facc15" />
                      <text x="320" y="10" textAnchor="middle" fill="#facc15" fontSize="8" fontWeight="bold">T2 ≈ 35°C</text>
                    </svg>
                  </div>
                </div>
              )}

              {/* ─── LAB 4: NEWTON’S LAW OF COOLING SIMULATOR ─── */}
              {currentSlide === 3 && (
                <div className="space-y-4 bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex gap-4">
                      <div>
                        <span className="text-xs font-mono text-slate-400">Initial T₀:</span>
                        <div className="text-base font-bold text-red-400 font-mono">{coolingT0} °C</div>
                      </div>
                      <div>
                        <span className="text-xs font-mono text-slate-400">Ambient Ts:</span>
                        <div className="text-base font-bold text-blue-400 font-mono">{coolingTs} °C</div>
                      </div>
                      <div>
                        <span className="text-xs font-mono text-slate-400">Current Temp:</span>
                        <div className="text-lg font-black text-emerald-400 font-mono">{simCurrentCoolingTemp.toFixed(1)} °C</div>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleCoolingReset}
                      className="px-4 py-2 bg-pink-600 hover:bg-pink-500 text-white rounded-xl text-xs font-bold shadow-md shadow-pink-600/30"
                    >
                      {coolingRunning ? 'Restart Cooling Decay ↻' : 'Start Cooling Experiment ▶'}
                    </motion.button>
                  </div>

                  <canvas ref={coolingCanvasRef} width={600} height={180} className="w-full rounded-xl border border-slate-800" />
                </div>
              )}

              {/* ─── LAB 5: THERMODYNAMIC PISTON (ISOTHERMAL VS ADIABATIC) ─── */}
              {currentSlide === 4 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handlePistonModeToggle('isothermal')}
                        className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                          pistonMode === 'isothermal'
                            ? 'bg-blue-600 text-white border border-blue-400 shadow-md shadow-blue-600/30'
                            : 'bg-slate-900 text-slate-400 border border-slate-800'
                        }`}
                      >
                        Isothermal (ΔT=0, Q=W)
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handlePistonModeToggle('adiabatic')}
                        className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                          pistonMode === 'adiabatic'
                            ? 'bg-purple-600 text-white border border-purple-400 shadow-md shadow-purple-600/30'
                            : 'bg-slate-900 text-slate-400 border border-slate-800'
                        }`}
                      >
                        Adiabatic (Q=0, ΔU=-W)
                      </motion.button>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-mono text-slate-300 mb-1">
                        <span>Piston Volume (V):</span>
                        <span className="text-amber-400 font-bold">{pistonVol.toFixed(1)} L</span>
                      </div>
                      <input
                        type="range"
                        min={1.0}
                        max={8.0}
                        step={0.2}
                        value={pistonVol}
                        aria-label="Piston Volume"
                        onChange={(e) => setPistonVol(Number(e.target.value))}
                        className="w-full accent-amber-500"
                      />
                    </div>

                    {/* Live Readouts */}
                    <div className="grid grid-cols-2 gap-3 p-4 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs">
                      <div>
                        <div className="text-slate-400">Pressure:</div>
                        <div className="text-base font-bold text-white">{simPistonState.P_kPa.toFixed(1)} kPa</div>
                      </div>
                      <div>
                        <div className="text-slate-400">Temperature:</div>
                        <div className={`text-base font-bold ${pistonMode === 'isothermal' ? 'text-blue-400' : 'text-purple-400'}`}>
                          {simPistonState.T_K.toFixed(1)} K
                        </div>
                      </div>
                      <div>
                        <div className="text-slate-400">Work Done (W):</div>
                        <div className="text-sm font-bold text-emerald-400">{simPistonState.workJ.toFixed(1)} J</div>
                      </div>
                      <div>
                        <div className="text-slate-400">ΔInternal Energy:</div>
                        <div className="text-sm font-bold text-amber-400">{simPistonState.deltaU.toFixed(1)} J</div>
                      </div>
                    </div>
                  </div>

                  {/* SVG Animated Piston Model */}
                  <div className="flex flex-col items-center justify-center p-4 bg-slate-900 rounded-xl border border-slate-800">
                    <svg viewBox="0 0 280 180" className="w-full max-w-xs">
                      {/* Cylinder walls */}
                      <rect x="30" y="40" width="220" height="100" rx="4" fill="none" stroke="#64748b" strokeWidth="4" />

                      {/* Gas body */}
                      {(() => {
                        const pistonX = 40 + (pistonVol / 8.0) * 160;
                        return (
                          <>
                            <rect
                              x="32"
                              y="42"
                              width={pistonX - 32}
                              height="96"
                              fill={pistonMode === 'isothermal' ? '#3b82f6' : '#a855f7'}
                              opacity="0.35"
                            />
                            {/* Piston head */}
                            <rect x={pistonX} y="42" width="16" height="96" rx="2" fill="#e2e8f0" stroke="#475569" strokeWidth="2" />
                            {/* Piston rod */}
                            <rect x={pistonX + 16} y="82" width="80" height="16" fill="#94a3b8" />
                          </>
                        );
                      })()}
                      <text x="140" y="165" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="monospace">
                        {pistonMode === 'isothermal' ? 'PV = nRT (Constant Temp)' : 'PV^1.4 = Constant (No Heat Q=0)'}
                      </text>
                    </svg>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center pt-4 border-t border-slate-800">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
              disabled={currentSlide === 0}
              className="px-4 py-2 bg-slate-800 text-white rounded-xl text-xs font-bold disabled:opacity-40"
            >
              ← Previous Lab
            </motion.button>
            <span className="text-xs font-mono text-slate-400">Lab {currentSlide + 1} / {EXPLORATION_STEPS.length}</span>
            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide(s => s + 1)}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-600/30"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30"
              >
                Open Free Sandbox →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: FREE PLAY SANDBOX ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 flex flex-wrap justify-between items-center gap-4">
            <div>
              <h2 className="text-lg font-bold text-white">Interactive Thermal Sandbox</h2>
              <p className="text-slate-400 text-xs mt-1">
                Zero-pressure free exploration mode. Test extreme temperatures and thermodynamic cycles freely.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-emerald-600/30"
            >
              Ready for Examination Challenges! →
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Quick Stefan Sandbox */}
            <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-blue-400 font-mono">STEFAN RADIATION LAB</span>
              <input
                type="range"
                min={200}
                max={1500}
                step={25}
                value={simTemp}
                aria-label="Sandbox Temp"
                onChange={(e) => setSimTemp(Number(e.target.value))}
                className="w-full accent-blue-500"
              />
              <div className="flex justify-between text-xs font-mono text-slate-300">
                <span>Temp: {simTemp} K</span>
                <span className="text-emerald-400 font-bold">{simRadiantIntensity.toFixed(0)} W/m²</span>
              </div>
            </div>

            {/* Quick Piston Sandbox */}
            <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-purple-400 font-mono">THERMODYNAMIC CYCLE LAB</span>
              <input
                type="range"
                min={1.0}
                max={8.0}
                step={0.2}
                value={pistonVol}
                aria-label="Sandbox Volume"
                onChange={(e) => setPistonVol(Number(e.target.value))}
                className="w-full accent-purple-500"
              />
              <div className="flex justify-between text-xs font-mono text-slate-300">
                <span>Volume: {pistonVol.toFixed(1)} L</span>
                <span className="text-purple-400 font-bold">{simPistonState.P_kPa.toFixed(1)} kPa | {simPistonState.T_K.toFixed(0)} K</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: EXAMINATION CHALLENGES ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Progress & Stat Header */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-slate-400">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <span className="text-blue-400 font-bold uppercase">
                NEP Competency: {challenge.competencyLevel}
              </span>
            </div>

            {/* Framer-Motion Animated Progress Bar */}
            <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden p-0.5">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500 rounded-full"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Active Challenge Card */}
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 bg-slate-900 rounded-2xl border transition-all ${
              wrongFlash ? 'bg-rose-950/60 border-rose-500' : 'border-slate-800'
            }`}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
                {challenge.nodeId}
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-700 font-mono uppercase">
                {challenge.type}
              </span>
            </div>

            <h3 className="text-base md:text-lg font-bold text-white mb-5 leading-snug">
              {challenge.question}
            </h3>

            {/* ─── CHALLENGE TYPE: MCQ (CLASSIFY / DISTINGUISH) ─── */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="space-y-3">
                {challenge.options.map((opt, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.01, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => handleAnswer(idx)}
                    disabled={answerRevealed || showExplanation}
                    aria-label={`Option ${idx + 1}: ${opt}`}
                    className={`w-full text-left p-4 rounded-xl border text-sm font-medium transition-all ${
                      showExplanation && idx === challenge.correctIndex
                        ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                        : 'bg-slate-800/80 hover:bg-slate-700/80 border-slate-700 text-slate-200'
                    }`}
                  >
                    <span className="font-mono text-xs mr-3 text-slate-400">[{String.fromCharCode(65 + idx)}]</span>
                    {opt}
                  </motion.button>
                ))}
              </div>
            )}

            {/* ─── CHALLENGE TYPE: DRAG-LABEL ON SEARLE’S APPARATUS ─── */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 w-full font-mono mb-1">Draggable Component Labels:</span>
                  {challenge.dragItems.map((item, idx) => (
                    <motion.div
                      key={idx}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-blue-700 hover:bg-blue-600 rounded-lg text-white text-xs font-bold cursor-grab shadow-sm"
                    >
                      ✥ {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { id: 'target_hot', title: 'Hot Energy Input Source (Left)' },
                    { id: 'target_cold', title: 'Cold Heat Extraction Sink (Right)' },
                    { id: 'target_bar', title: 'Metal Bar Temperature Sensor Pair' },
                    { id: 'target_water', title: 'Cooling Water Inlet/Outlet Sensors' },
                  ].map((target) => (
                    <div
                      key={target.id}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(target.id)}
                      className={`p-4 rounded-xl border-2 border-dashed flex flex-col justify-center min-h-[70px] transition-all ${
                        droppedLabels[target.id]
                          ? 'bg-emerald-950/50 border-emerald-500 text-emerald-200'
                          : 'bg-slate-950/60 border-slate-700 text-slate-400'
                      }`}
                    >
                      <span className="text-xs font-mono text-slate-400 mb-1">{target.title}</span>
                      <span className="text-sm font-bold text-white">
                        {droppedLabels[target.id] || '⇲ Drag & Drop Matching Component Here'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation || Object.keys(droppedLabels).length < 4}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-sm shadow-md disabled:opacity-50"
                >
                  Verify Apparatus Mapping
                </motion.button>
              </div>
            )}

            {/* ─── CHALLENGE TYPE: DRAG-SORT DERIVATION ─── */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <span className="text-xs font-mono text-slate-400">Drag to reorder steps into correct physical sequence:</span>
                {(sortArrangement.length === challenge.sortItems.length
                  ? sortArrangement.map((idx) => challenge.sortItems![idx])
                  : challenge.sortItems
                ).map((item, dIdx) => (
                  <motion.div
                    key={dIdx}
                    draggable
                    onDragStart={() => setDraggedItem(String(dIdx))}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => {
                      const fromIdx = parseInt(draggedItem || '0');
                      handleSortMove(fromIdx, dIdx);
                    }}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="p-3 bg-slate-800 hover:bg-slate-700/80 rounded-xl text-slate-200 text-sm font-mono cursor-grab border border-slate-700 flex items-center gap-3"
                  >
                    <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-400 text-xs font-bold">{dIdx + 1}</span>
                    {item}
                  </motion.div>
                ))}

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-sm shadow-md"
                >
                  Verify Derivation Sequence
                </motion.button>
              </div>
            )}

            {/* ─── CHALLENGE TYPE: NUMERIC INPUT ─── */}
            {challenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <input
                    type="number"
                    step="any"
                    value={numericInput}
                    aria-label="Numeric calculation answer"
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter calculated numerical value"
                    className="flex-1 p-3.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-blue-500"
                  />
                  <span className="text-sm font-mono text-slate-400 px-3 py-3 bg-slate-800 rounded-xl border border-slate-700">
                    {challenge.unit}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-sm shadow-md disabled:opacity-50"
                  >
                    Submit Answer
                  </motion.button>
                </div>
              </div>
            )}

            {/* ─── CHALLENGE TYPE: FORMULA CONSTRUCT ─── */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 w-full font-mono mb-1">Available Formula Tokens:</span>
                  {challenge.availableParts.map((part, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.92 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3 py-1.5 bg-indigo-700 hover:bg-indigo-600 rounded-lg text-white font-mono text-sm font-bold shadow"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-700 min-h-[60px] flex flex-wrap items-center gap-2">
                  {constructParts.map((token, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="px-3 py-1 bg-indigo-900 border border-indigo-600 rounded-lg text-amber-300 font-mono font-bold text-sm flex items-center gap-2"
                    >
                      {token}
                      <button
                        onClick={() => setConstructParts(prev => prev.filter((_, i) => i !== idx))}
                        className="text-rose-400 hover:text-rose-200"
                      >
                        ✕
                      </button>
                    </motion.div>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-500 font-mono">Click tokens above to construct formula</span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm shadow-md disabled:opacity-50"
                >
                  Check Assembled Equation
                </motion.button>
              </div>
            )}

            {/* ─── PROGRESSIVE DISCLOSURE EXPLANATION CARD ─── */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-gradient-to-br from-indigo-950/60 to-slate-900 rounded-2xl border border-indigo-700/80 space-y-4"
              >
                <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider font-mono">
                  <span>📖 Step-by-Step ISC Physics Solution</span>
                </div>

                {challenge.explanation
                  .split('. ')
                  .filter(s => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, idx) => (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-slate-200 text-sm leading-relaxed"
                    >
                      <span className="font-bold text-amber-400 font-mono mr-2">{idx + 1}.</span>
                      {sentence}{!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                  {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-4 py-2 bg-indigo-700 hover:bg-indigo-600 text-white rounded-xl text-xs font-bold"
                    >
                      Show Next Step →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-emerald-600/30 ml-auto"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Complete Final Mission 🏁' : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 5: MISSION COMPLETION & CAPSTONE ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-emerald-950/70 via-slate-900 to-indigo-950/70 rounded-3xl border border-emerald-700/80 text-center space-y-3">
            <span className="text-4xl">🏆</span>
            <h2 className="text-2xl md:text-3xl font-black text-white">
              Thermal Simulation Certification Complete!
            </h2>
            <div className="flex flex-wrap justify-center gap-4 text-xs font-mono pt-2">
              <span className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-emerald-400 font-bold">
                Final Score: {Math.max(0, 100 - errors * 5)}%
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-blue-400 font-bold uppercase">
                Mastery Level: {masteryLevel}
              </span>
            </div>
            <p className="text-slate-300 text-sm max-w-xl mx-auto pt-2">
              {errors === 0
                ? 'Flawless ISC Physics mastery! You demonstrated 100% precision across Radiation, Conduction, and First Law Cycles.'
                : errors <= 3
                ? 'Superb performance! You have a solid grasp of thermodynamics. Review the misconception notes below for total perfection.'
                : 'Good effort! Review your specific misconception profile below to solidify your understanding of thermodynamic laws.'}
            </p>
          </div>

          {/* Misconception Gaps Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 rounded-2xl border border-rose-800 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 font-mono">YOUR TARGETED CONCEPT RECTIFICATION PROFILE</h3>
              <div className="space-y-3">
                {hitMisconceptions.map((mIdx, i) => {
                  const m = misconceptions?.[mIdx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-1">
                      <div className="text-rose-400 font-bold">❌ Misconception: {m.misconception}</div>
                      <div className="text-emerald-300">✓ Scientific Principle: {m.correction}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spaced Repetition Schedule */}
          <div className="p-4 bg-indigo-950/50 rounded-2xl border border-indigo-800 flex items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold text-indigo-300 font-mono uppercase">Spaced Repetition (SM-2 Algorithm)</div>
              <p className="text-xs text-slate-300 mt-1">
                Based on your response latency and score, your next review session is scheduled in{' '}
                <span className="text-amber-300 font-bold font-mono">
                  {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}
                </span>.
              </p>
            </div>
            <span className="text-2xl">📅</span>
          </div>

          {/* Real-World Capstone Box */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-base font-bold text-blue-300 font-mono uppercase tracking-wide">
              {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              {REAL_WORLD_ACTIVITY.description}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
                  <span className="font-bold text-blue-400 font-mono">[{idx + 1}]</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Floating Interactive Overlays */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Mastery Validated!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C11_PhysicsHeatTransferRadiationSim;