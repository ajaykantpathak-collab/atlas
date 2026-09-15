'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── ISC PHYSICS CLASS 11 NODE CONSTANTS ───
const NODE_C11_PHY_081 = 'c11_phy_081'; // Work done in adiabatic process
const NODE_C11_PHY_082 = 'c11_phy_082'; // Second law of thermodynamics
const NODE_C11_PHY_083 = 'c11_phy_083'; // Carnot cycle and efficiency
const NODE_C11_PHY_084 = 'c11_phy_084'; // Kinetic theory of gases (assumptions, pressure)
const NODE_C11_PHY_085 = 'c11_phy_085'; // Kinetic interpretation of temperature
const NODE_C11_PHY_086 = 'c11_phy_086'; // Degrees of freedom and equipartition of energy
const NODE_C11_PHY_087 = 'c11_phy_087'; // Mean free path and Avogadro's number
const NODE_C11_PHY_088 = 'c11_phy_088'; // Periodic motion and SHM
const NODE_C11_PHY_089 = 'c11_phy_089'; // Differential equation of SHM and its solution
const NODE_C11_PHY_090 = 'c11_phy_090'; // Energy in SHM (kinetic and potential)

const ALL_NODE_IDS = [
  NODE_C11_PHY_081,
  NODE_C11_PHY_082,
  NODE_C11_PHY_083,
  NODE_C11_PHY_084,
  NODE_C11_PHY_085,
  NODE_C11_PHY_086,
  NODE_C11_PHY_087,
  NODE_C11_PHY_088,
  NODE_C11_PHY_089,
  NODE_C11_PHY_090,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Mission: The Deep Space Cryo-Engine & Micro-Oscillator',
  intro: 'ISRO engineers at Sriharikota are testing a dual-stage thermodynamic compressor and precision harmonic suspension for deep space missions. High-pressure cryogenic gases undergo rapid adiabatic cycles while micro-mechanical resonators must maintain perfect oscillatory balance.',
  context: 'As the lead propulsion & thermal dynamics specialist, you must analyze gas compression work, Carnot efficiency ceilings, molecular kinetic pressure, equipartition, and harmonic energy interchange.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'When a cryogenic gas cylinder is insulated (Q = 0) and compressed suddenly to half its volume, what happens to its internal temperature and why?',
  options: [
    'Temperature remains constant because no heat entered the cylinder (Q = 0)',
    'Temperature rises because work is done ON the gas, increasing internal energy (ΔU = -W > 0)',
    'Temperature falls because squeezing molecules together slows them down',
    'Temperature drops to absolute zero because volume decreased'
  ],
  correctIndex: 1,
  hintAfter: 'Remember the First Law with Q = 0: ΔU = Q - W = -W. When work is done on the gas, W is negative, making ΔU positive!',
};

// ─── BRILLIANT.ORG PREDICTION QUESTIONS (PREDICT-THEN-CHECK) ───
export const PREDICTION_QUESTIONS = [
  {
    id: 'pred_1',
    question: 'If you compress a gas adiabatically to 3.0x compression ratio (reducing volume to 1/3 with Q = 0), what will happen to its temperature?',
    options: [
      'The temperature will stay constant at 300 K because no heat enters or leaves',
      'The temperature will rise sharply above 450 K because mechanical work is transformed into internal energy',
      'The temperature will drop below 100 K because volume is reduced',
      'The temperature will fluctuate chaotically with zero average change'
    ],
    correctIndex: 1,
    explanation: 'Under adiabatic compression (Q = 0), the First Law states ΔU = -W. Work done on the gas is negative, meaning ΔU > 0 and temperature rises by T2 = T1 * (V1/V2)^(γ-1).',
    verifyInstruction: 'Go to Lab Step 1 and drag the Piston Compression slider to 3.0x. Observe the Final Temp T2 jump from 300 K to ~465 K.'
  },
  {
    id: 'pred_2',
    question: 'When an oscillating mass in SHM passes directly through the equilibrium center point (y = 0), what fraction of its total energy is kinetic?',
    options: [
      '100% Kinetic Energy and 0% Potential Energy',
      '50% Kinetic Energy and 50% Potential Energy',
      '0% Kinetic Energy and 100% Potential Energy',
      '25% Kinetic Energy and 75% Potential Energy'
    ],
    correctIndex: 0,
    explanation: 'At equilibrium (y = 0), potential energy PE = (1/2)ky² = 0. Since total energy E = KE + PE is conserved, 100% of the energy is Kinetic Energy.',
    verifyInstruction: 'Go to Lab Step 5 and observe the KE and PE meters when the mass crosses the red dashed center equilibrium line.'
  }
];

// ─── BRILLIANT.ORG OBSERVATION QUESTIONS ('WHAT DO YOU NOTICE?') ───
export const OBSERVATION_QUESTIONS = [
  {
    id: 'obs_1',
    question: 'On the P-V diagram in Lab Step 1, what do you observe about the slope of the adiabatic curve compared to the isothermal curve?',
    options: [
      'The adiabatic curve is noticeably steeper than the isothermal curve',
      'The adiabatic curve is flatter and less steep than the isothermal curve',
      'Both curves have the exact same identical slope at all points',
      'The adiabatic curve is horizontal while the isothermal curve is vertical'
    ],
    observableOptions: [
      'The adiabatic curve is noticeably steeper than the isothermal curve',
      'The adiabatic curve is flatter and less steep than the isothermal curve',
      'Both curves have the exact same identical slope at all points',
      'The adiabatic curve is horizontal while the isothermal curve is vertical'
    ],
    correctIndex: 0,
    explanation: 'The adiabatic curve has slope (dP/dV)_ad = -γ(P/V), which is γ times steeper than the isothermal slope (dP/dV)_iso = -P/V because γ > 1.'
  },
  {
    id: 'obs_2',
    question: 'When you raise the temperature slider in the Molecular Kinetic Box (Lab Step 3), what do you observe happening to the particle speeds and pressure readout?',
    options: [
      'Molecules bounce noticeably faster and macroscopic pressure p rises according to p = (1/3)ρc²',
      'Molecules slow down and collisions with the container walls become weaker',
      'Molecules freeze in place and pressure drops immediately to zero',
      'Molecular speeds stay constant while only the container size shrinks'
    ],
    observableOptions: [
      'Molecules bounce noticeably faster and macroscopic pressure p rises according to p = (1/3)ρc²',
      'Molecules slow down and collisions with the container walls become weaker',
      'Molecules freeze in place and pressure drops immediately to zero',
      'Molecular speeds stay constant while only the container size shrinks'
    ],
    correctIndex: 0,
    explanation: 'RMS speed c_rms is proportional to √T. Higher temperature gives greater molecular velocity, leading to more frequent and energetic wall collisions, raising kinetic pressure p = (1/3)ρc².'
  }
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

// ─── 22 COMPREHENSIVE CHALLENGES ───
const CHALLENGES: Challenge[] = [
  // 1. Adiabatic Work Formula (Foundation - Recall)
  {
    id: 'ch_01',
    nodeId: NODE_C11_PHY_081,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which expression gives the work done by an ideal gas during a reversible adiabatic expansion from (P1, V1) to (P2, V2)?',
    options: [
      'W = (P1*V1 - P2*V2) / (γ - 1)',
      'W = nRT ln(V2 / V1)',
      'W = P(V2 - V1)',
      'W = (P2*V2 - P1*V1) / γ'
    ],
    correctIndex: 0,
    explanation: 'Integrating P dV with PV^γ = K yields W = [K*V^(1-γ)/(1-γ)] from V1 to V2 = (P1*V1 - P2*V2)/(γ - 1). For expansion, P1V1 > P2V2 so W > 0.',
    hints: [
      'Recall that PV^γ = constant for an adiabatic process.',
      'Substitute P = K*V^(-γ) into the work integral ∫ P dV.',
      'The denominator contains (γ - 1), yielding (P1*V1 - P2*V2)/(γ - 1).'
    ],
    misconceptionIndex: 0
  },
  // 2. Drag-label: Carnot Cycle PV Diagram (Foundation - Understanding)
  {
    id: 'ch_02',
    nodeId: NODE_C11_PHY_083,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Match the four sequential stages of a Carnot cycle to their PV quadrant positions.',
    dragItems: [
      { label: '1. Isothermal Exp. (T1)', targetId: 'carnot_top' },
      { label: '2. Adiabatic Exp. (T1→T2)', targetId: 'carnot_right' },
      { label: '3. Isothermal Comp. (T2)', targetId: 'carnot_bottom' },
      { label: '4. Adiabatic Comp. (T2→T1)', targetId: 'carnot_left' }
    ],
    correctMapping: {
      carnot_top: '1. Isothermal Exp. (T1)',
      carnot_right: '2. Adiabatic Exp. (T1→T2)',
      carnot_bottom: '3. Isothermal Comp. (T2)',
      carnot_left: '4. Adiabatic Comp. (T2→T1)'
    },
    explanation: 'The Carnot cycle traverses: A→B (Isothermal expansion absorbing Q1 at T1), B→C (Adiabatic expansion cooling T1 to T2), C→D (Isothermal compression rejecting Q2 at T2), and D→A (Adiabatic compression heating back to T1).',
    hints: [
      'Top curve is high-temperature expansion (T1).',
      'Rightmost descent is adiabatic expansion with Q = 0.',
      'Bottom curve is cold compression rejecting heat Q2 at T2.'
    ],
    misconceptionIndex: 2
  },
  // 3. Second Law - Kelvin vs Clausius (Foundation - Understanding)
  {
    id: 'ch_03',
    nodeId: NODE_C11_PHY_082,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'According to Kelvin\'s statement of the Second Law of Thermodynamics, which scenario is physically impossible?',
    options: [
      'A cyclic engine converting 100% of heat absorbed from a single reservoir into work without rejecting heat',
      'A heat pump requiring electrical work to move heat from cold outdoor air to a warm room',
      'A refrigerator rejecting heat Q1 = Q2 + W to the ambient kitchen',
      'An irreversible expansion increasing overall system entropy'
    ],
    correctIndex: 0,
    explanation: 'Kelvin\'s statement forbids a 100% efficient cyclic engine operating with a single thermal reservoir. Some heat Q2 must always be rejected to a colder sink.',
    hints: [
      'Think about whether a "perfect" 100% heat engine can exist.',
      'Kelvin\'s statement directly addresses heat engines operating in a cycle.',
      'It is impossible to convert heat completely into work from a single reservoir without any heat rejected.'
    ],
    misconceptionIndex: 1
  },
  // 4. Kinetic Theory Gas Pressure (Foundation - Recall)
  {
    id: 'ch_04',
    nodeId: NODE_C11_PHY_084,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In kinetic theory, the macroscopic pressure exerted by gas molecules of density ρ and mean square speed c² is:',
    options: [
      'p = (1/3) * ρ * c²',
      'p = (1/2) * ρ * c²',
      'p = ρ * c²',
      'p = (3/2) * ρ * c²'
    ],
    correctIndex: 0,
    explanation: 'By calculating rate of momentum change across 3 spatial dimensions (where <vx²> = <vy²> = <vz²> = c²/3), we get p = (1/3)ρc².',
    hints: [
      'Momentum transferred per wall collision along one axis is 2mvx.',
      'Because motion is isotropic in 3D space, <vx²> = (1/3)c².',
      'Multiplying by total density yields p = (1/3)ρc².'
    ]
  },
  // 5. Kinetic Interpretation of Temperature (Foundation - Understanding)
  {
    id: 'ch_05',
    nodeId: NODE_C11_PHY_085,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'What is the average translational kinetic energy of a single gas molecule at absolute temperature T?',
    options: [
      '(3/2) * k_B * T',
      '(1/2) * k_B * T',
      '(3/2) * R * T',
      '3 * k_B * T'
    ],
    correctIndex: 0,
    explanation: 'Equating pV = (1/3)Mc² with pV = RT gives molar KE = (3/2)RT. Dividing by Avogadro\'s number NA gives molecular KE = (3/2)kT.',
    hints: [
      'R / NA = kB (Boltzmann\'s constant).',
      'There are 3 translational degrees of freedom, each contributing (1/2)kT.',
      'Summing across 3 dimensions gives (3/2)kT per molecule.'
    ]
  },
  // 6. SHM Restoring Force & Acceleration (Foundation - Recall)
  {
    id: 'ch_06',
    nodeId: NODE_C11_PHY_088,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In Simple Harmonic Motion (SHM), what is the relationship between acceleration a and displacement y?',
    options: [
      'a = -ω² * y (proportional and opposite in direction)',
      'a = +ω² * y (proportional and in the same direction)',
      'a = constant throughout the oscillation',
      'a = -ω * y²'
    ],
    correctIndex: 0,
    explanation: 'SHM is defined by restoring force F = -ky = ma, which gives a = -(k/m)y = -ω²y. Acceleration is always directed towards the mean position.',
    hints: [
      'The restoring force opposes displacement: F = -ky.',
      'Divide by mass m: a = -(k/m)y.',
      'Defining ω² = k/m yields a = -ω²y.'
    ]
  },
  // 7. Drag-Sort: Steps in Adiabatic Work Derivation (Standard - Analysis)
  {
    id: 'ch_07',
    nodeId: NODE_C11_PHY_081,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the mathematical steps in deriving the adiabatic work formula W = (P1V1 - P2V2)/(γ - 1).',
    sortItems: [
      'State the general work integral: W = ∫ P dV from V1 to V2',
      'Substitute P = K * V^(-γ) from adiabatic equation PV^γ = K',
      'Integrate to obtain W = [K * V^(1-γ) / (1-γ)] evaluated from V1 to V2',
      'Use K = P1*V1^γ = P2*V2^γ to simplify K*V^(1-γ) into P*V terms',
      'Rearrange (P2V2 - P1V1)/(1-γ) to obtain (P1V1 - P2V2)/(γ - 1)'
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'The derivation proceeds from the definition of mechanical work, substitution of the adiabatic equation of state, integration of power law V^(-γ), substitution of end-state boundary constants, and final algebraic inversion of signs.',
    hints: [
      'Always start with the fundamental definition of thermodynamic work W = ∫ P dV.',
      'Next substitute the relation between P and V using PV^γ = K.',
      'Evaluate the integral and substitute back P1V1 and P2V2.'
    ]
  },
  // 8. Numeric: Carnot Engine Efficiency (Standard - Application)
  {
    id: 'ch_08',
    nodeId: NODE_C11_PHY_083,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A cryogenic test engine absorbs 1500 J of heat from a hot reservoir at 500 K and exhausts heat to liquid nitrogen at 200 K. What is its theoretical Carnot efficiency in percent?',
    correctAnswer: 60,
    tolerance: 0.5,
    unit: '%',
    explanation: 'η = 1 - (T2 / T1) = 1 - (200 / 500) = 1 - 0.40 = 0.60 = 60%. Both temperatures must be in Kelvin.',
    hints: [
      'Use the Carnot efficiency formula: η = 1 - (T_sink / T_source).',
      'T_source = 500 K, T_sink = 200 K.',
      'η = 1 - 200/500 = 1 - 0.40 = 0.60 (60%).'
    ]
  },
  // 9. Diatomic Gas Equipartition & Gamma (Standard - Understanding)
  {
    id: 'ch_09',
    nodeId: NODE_C11_PHY_086,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'For a rigid diatomic gas (like N2 or O2 at room temperature), what are the active degrees of freedom f, Cv, and γ = Cp/Cv?',
    options: [
      'f = 5 (3 trans + 2 rot), Cv = (5/2)R, γ = 7/5 = 1.40',
      'f = 3 (3 trans), Cv = (3/2)R, γ = 5/3 = 1.67',
      'f = 6 (3 trans + 3 rot), Cv = 3R, γ = 4/3 = 1.33',
      'f = 7 (3 trans + 2 rot + 2 vib), Cv = (7/2)R, γ = 9/7 = 1.28'
    ],
    correctIndex: 0,
    explanation: 'A dumbbell molecule has 3 translational + 2 rotational modes (rotation about the internuclear bond axis has negligible moment of inertia). Thus f = 5, Cv = (5/2)R, Cp = (7/2)R, and γ = 1.40.',
    hints: [
      'Monatomic gases have f = 3. Diatomic molecules add rotation.',
      'Rotation about the bond axis itself has almost zero moment of inertia.',
      'So rotation adds 2 modes: f = 3 + 2 = 5, Cv = 5/2 R, Cp = 7/2 R, γ = 1.4.'
    ]
  },
  // 10. RMS Speed vs Molar Mass (Standard - Analysis)
  {
    id: 'ch_10',
    nodeId: NODE_C11_PHY_085,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'At 300 K, the rms speed of O2 (M = 32 g/mol) is 484 m/s. What is the rms speed of H2 (M = 2 g/mol) at the same temperature? (Enter in m/s)',
    correctAnswer: 1936,
    tolerance: 10,
    unit: 'm/s',
    explanation: 'c_rms = √(3RT/M), so c_rms is proportional to 1/√M. The ratio c_H2 / c_O2 = √(32 / 2) = √16 = 4. Thus c_H2 = 4 * 484 = 1936 m/s.',
    hints: [
      'The rms formula is c_rms = √(3RT/M).',
      'Since T is the same, c_H2 / c_O2 = √(M_O2 / M_H2).',
      '√(32 / 2) = √16 = 4. Multiply 484 by 4.'
    ]
  },
  // 11. Mean Free Path vs Pressure & Temperature (Standard - Understanding)
  {
    id: 'ch_11',
    nodeId: NODE_C11_PHY_087,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'The mean free path of gas molecules is λ = 1 / (√2 * π * d² * n). If the pressure is doubled at constant temperature, how does λ change?',
    options: [
      'λ is halved because number density n doubles (n = P/kT)',
      'λ doubles because molecules move with higher momentum',
      'λ remains constant because molecular diameter d does not change',
      'λ quadruples because cross-section decreases'
    ],
    correctIndex: 0,
    explanation: 'From the ideal gas law P = nkT, number density n = P/kT. At constant T, doubling P doubles n, which halves the mean distance λ between collisions.',
    hints: [
      'Recall how number density n is related to pressure P.',
      'P = n * kB * T, so n is directly proportional to P.',
      'Since λ is inversely proportional to n, doubling P halves λ.'
    ]
  },
  // 12. SHM Differential Equation Solution (Standard - Understanding)
  {
    id: 'ch_12',
    nodeId: NODE_C11_PHY_089,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'For the SHM differential equation d²y/dt² + ω²y = 0 with displacement y(t) = A sin(ωt + φ), what is the phase difference between velocity v(t) and displacement y(t)?',
    options: [
      'Velocity leads displacement by 90° (π/2 radians)',
      'Velocity and displacement are in phase (0°)',
      'Velocity lags displacement by 180° (π radians)',
      'Velocity lags displacement by 90° (π/2 radians)'
    ],
    correctIndex: 0,
    explanation: 'Differentiating y = A sin(ωt + φ) gives v = dy/dt = Aω cos(ωt + φ) = Aω sin(ωt + φ + π/2). Velocity leads displacement by 90° (π/2).',
    hints: [
      'v = dy/dt = d/dt [A sin(ωt + φ)].',
      'Derivative of sin(θ) is cos(θ) = sin(θ + π/2).',
      'A positive phase addition of π/2 means velocity leads displacement by 90°.'
    ]
  },
  // 13. SHM Energy Partition at Half Amplitude (Standard - Application)
  {
    id: 'ch_13',
    nodeId: NODE_C11_PHY_090,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A mass-spring oscillator oscillates with amplitude A. When the displacement is y = A/2, what fraction of the total mechanical energy is Kinetic Energy (KE)?',
    options: [
      '75% (3/4 of total energy)',
      '50% (1/2 of total energy)',
      '25% (1/4 of total energy)',
      '86.6% (√3/2 of total energy)'
    ],
    correctIndex: 0,
    explanation: 'PE = (1/2)mω²y² = (1/2)mω²(A/2)² = (1/4)E_total. Since E_total = KE + PE, KE = E_total - (1/4)E_total = (3/4)E_total (75%).',
    hints: [
      'Total energy is E = (1/2)mω²A².',
      'Potential energy at y is PE = (1/2)mω²y².',
      'Substitute y = A/2 to find PE/E = (1/2)² = 1/4. Thus KE is 1 - 1/4 = 3/4.'
    ],
    misconceptionIndex: 3
  },
  // 14. Numeric: Adiabatic Compression Work (Advanced - Application)
  {
    id: 'ch_14',
    nodeId: NODE_C11_PHY_081,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A 1-mole sample of diatomic gas (γ = 1.4) at P1 = 100 kPa and V1 = 0.02 m³ (P1V1 = 2000 J) is compressed adiabatically to V2 = 0.01 m³ where P2V2 = 2639 J. Calculate the work done BY the gas in Joules.',
    correctAnswer: -1598,
    tolerance: 15,
    unit: 'J',
    explanation: 'W = (P1V1 - P2V2)/(γ - 1) = (2000 - 2639) / (1.4 - 1) = (-639) / 0.4 = -1597.5 J ≈ -1598 J. The negative sign signifies work done ON the gas.',
    hints: [
      'Use the formula W = (P1V1 - P2V2) / (γ - 1).',
      'P1V1 = 2000 J and P2V2 = 2639 J, γ - 1 = 0.4.',
      'W = (2000 - 2639) / 0.4 = -639 / 0.4 = -1597.5 J.'
    ],
    misconceptionIndex: 0
  },
  // 15. Construct: Equipartition Internal Energy Expression (Advanced - Creativity)
  {
    id: 'ch_15',
    nodeId: NODE_C11_PHY_086,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Assemble the algebraic equation for the total internal energy U of n moles of a gas with f degrees of freedom at temperature T.',
    availableParts: ['U', '=', '(', 'f', '/', '2', ')', '*', 'n', 'R', 'T', 'k_B', '+'],
    targetState: 'U = ( f / 2 ) * n R T',
    validationHint: 'Form the product of (f/2) and nRT.',
    explanation: 'Each active degree of freedom carries (1/2)RT per mole. For n moles with f degrees of freedom, U = (f/2)nRT.',
    hints: [
      'Start with U =',
      'Include the degrees of freedom factor (f/2)',
      'Multiply by total moles and gas constant: * n R T'
    ]
  },
  // 16. Comparison: Isothermal vs Adiabatic Slope on PV (Advanced - Analysis)
  {
    id: 'ch_16',
    nodeId: NODE_C11_PHY_081,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'On a PV diagram passing through the same initial coordinate (P0, V0), the slope of an adiabatic curve (dP/dV)_ad relates to the isothermal slope (dP/dV)_iso by:',
    options: [
      '(dP/dV)_ad = γ * (dP/dV)_iso (steeper by a factor of γ)',
      '(dP/dV)_ad = (1/γ) * (dP/dV)_iso (less steep by factor γ)',
      '(dP/dV)_ad = (dP/dV)_iso (identical slopes)',
      '(dP/dV)_ad = γ² * (dP/dV)_iso'
    ],
    correctIndex: 0,
    explanation: 'Differentiating PV = K gives dP/dV = -P/V. Differentiating PV^γ = K gives dP/dV = -γ(P/V) = γ * (dP/dV)_iso. Because γ > 1, the adiabat is steeper.',
    hints: [
      'Isothermal slope: d(PV)=0 => dP/dV = -P/V.',
      'Adiabatic slope: d(PV^γ)=0 => V^γ dP + γ P V^(γ-1) dV = 0 => dP/dV = -γ P / V.',
      'The adiabatic slope is exactly γ times steeper.'
    ]
  },
  // 17. Avogadro & Single Molecule Mass (Advanced - Application)
  {
    id: 'ch_17',
    nodeId: NODE_C11_PHY_087,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Given Avogadro\'s number NA = 6.022 * 10²³ mol⁻¹ and molar mass of Nitrogen N2 is 28 g/mol, compute the mass of a single N2 molecule in 10⁻²⁶ kg. (e.g., if 4.65 * 10^-26 kg, enter 4.65)',
    correctAnswer: 4.65,
    tolerance: 0.1,
    unit: '× 10⁻²⁶ kg',
    explanation: 'm_0 = M / NA = (0.028 kg/mol) / (6.022 * 10²³ mol⁻¹) = 4.6496 * 10⁻²⁶ kg ≈ 4.65 * 10⁻²⁶ kg.',
    hints: [
      'Convert molar mass from g/mol to kg/mol: 28 g/mol = 0.028 kg/mol.',
      'Divide by NA = 6.022 * 10²³.',
      '0.028 / (6.022 * 10²³) = 4.65 * 10⁻²⁶ kg.'
    ]
  },
  // 18. SHM Displacement where KE = PE (Advanced - Analysis)
  {
    id: 'ch_18',
    nodeId: NODE_C11_PHY_090,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'At what displacement y from the equilibrium position is the kinetic energy of an SHM oscillator exactly equal to its potential energy?',
    options: [
      'y = ± A / √2 (≈ ± 0.707 A)',
      'y = ± A / 2',
      'y = ± A / √3',
      'y = ± A / 4'
    ],
    correctIndex: 0,
    explanation: 'Setting KE = PE yields (1/2)mω²(A² - y²) = (1/2)mω²y² => A² - y² = y² => 2y² = A² => y = ± A/√2.',
    hints: [
      'Equate KE and PE expressions: (1/2)mω²(A² - y²) = (1/2)mω²y².',
      'Cancel (1/2)mω² from both sides: A² - y² = y².',
      '2y² = A², therefore y = ± A/√2.'
    ]
  },
  // 19. Evaluation: Second Law and Perpetual Motion (Advanced - Evaluation)
  {
    id: 'ch_19',
    nodeId: NODE_C11_PHY_082,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'An inventor claims to have built a boat engine that extracts thermal energy from warm sea water, converts 100% of it into propeller thrust work, and discharges cold water with zero heat rejected to the atmosphere. Why is this claim scientifically flawed?',
    options: [
      'It violates the Second Law (Kelvin-Planck statement) by operating in a cycle with a single thermal reservoir',
      'It violates the First Law because total energy is destroyed',
      'It is theoretically sound if the ocean has infinite heat capacity',
      'It only fails if water viscosity causes friction'
    ],
    correctIndex: 0,
    explanation: 'A Perpetual Motion Machine of the Second Kind (PMM-2) attempts to convert heat continuously from a single thermal reservoir into work without rejecting heat to a colder sink, directly violating Kelvin\'s statement.',
    hints: [
      'Does the First Law prevent extracting 1000 J of heat and making 1000 J of work? No.',
      'What does the Second Law require for any cyclic engine?',
      'A cyclic heat engine MUST reject heat to a colder sink (T_sink < T_source).'
    ],
    misconceptionIndex: 1
  },
  // 20. SHM Isochronism & Spring Mass (Advanced - Application)
  {
    id: 'ch_20',
    nodeId: NODE_C11_PHY_088,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A 0.5 kg block attached to an ideal spring oscillates with a time period of 0.628 s (2π/10 s). What is the spring constant k in N/m? (Take π ≈ 3.1416)',
    correctAnswer: 50,
    tolerance: 1.0,
    unit: 'N/m',
    explanation: 'T = 2π√(m/k) => 0.628 = 2π√(0.5/k) => ω = 2π/T = 10 rad/s. Since ω² = k/m => k = m*ω² = 0.5 * 100 = 50 N/m.',
    hints: [
      'Calculate angular frequency ω = 2π / T.',
      'ω = 2 * 3.1416 / 0.628 ≈ 10 rad/s.',
      'k = m * ω² = 0.5 * (10)² = 50 N/m.'
    ]
  },
  // 21. Real-World Engineering: Increasing Carnot Efficiency (Advanced - Evaluation)
  {
    id: 'ch_21',
    nodeId: NODE_C11_PHY_083,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'To maximize thermal efficiency in a thermal power plant operating between boiler temperature T1 and cooling river T2, which change provides a greater gain in efficiency for an identical 50 K shift?',
    options: [
      'Lowering sink temperature T2 by 50 K gives a higher fractional gain than raising source T1 by 50 K',
      'Raising source temperature T1 by 50 K is always mathematically superior',
      'Both changes produce the exact same percentage efficiency increase',
      'Neither changes efficiency because the temperature difference ΔT is 50 K in both cases'
    ],
    correctIndex: 0,
    explanation: 'The sensitivity |∂η/∂T2| = 1/T1 is greater than ∂η/∂T1 = T2/T1² because T1 > T2. Lowering sink temperature produces a steeper rate of efficiency increase.',
    hints: [
      'Inspect η = 1 - T2/T1.',
      'Compare changing the numerator T2 vs the denominator T1.',
      'Because T2 < T1, subtracting ��T from T2 has a larger fractional impact on the ratio T2/T1.'
    ]
  },
  // 22. Kinetic Assumptions Validation (Advanced - Analysis)
  {
    id: 'ch_22',
    nodeId: NODE_C11_PHY_084,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Under what physical conditions do real gases deviate significantly from the ideal kinetic theory pressure equation p = (1/3)ρc²?',
    options: [
      'High pressure and low temperature (molecular volume and intermolecular attractions become non-negligible)',
      'Low pressure and high temperature (molecules are too energetic)',
      'At STP where density is near 1.29 kg/m³',
      'Under microgravity conditions in orbital space'
    ],
    correctIndex: 0,
    explanation: 'Real gases deviate from ideal behavior when intermolecular forces become significant (low T) and molecular volume cannot be neglected relative to container volume (high P), requiring van der Waals corrections.',
    hints: [
      'Kinetic theory assumes zero molecular volume and zero intermolecular forces.',
      'When are molecules forced very close together?',
      'High pressure squeezes them close; low temperature prevents them from overcoming attractive forces.'
    ]
  }
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

// ─── DEFAULT PROPS WITH RICH CONTENT ───
const DEFAULT_PROPS: Props = {
  nodeId: 'c11_phy_081',
  title: 'Thermodynamics, Kinetic Theory & Simple Harmonic Motion',
  definition: 'An integrated study of adiabatic processes, thermodynamic limits (Second Law & Carnot), molecular kinetic theory (pressure, equipartition, mean free path), and the kinematics/energetics of simple harmonic motion.',
  eli5: 'Think of heat engines as energy tolls where some heat must always be paid to the cold side. Gas pressure is trillions of tiny molecular bounces. And SHM is a spring-mass trading energy smoothly between speed and stretch!',
  misconceptions: [
    { misconception: 'Adiabatic work is always positive.', correction: 'For adiabatic compression, work is done ON the gas (W < 0), causing internal energy and temperature to increase (ΔU = -W > 0).' },
    { misconception: 'The Second Law says heat cannot be turned into work.', correction: 'Heat can be turned into work (that is what engines do); it only forbids 100% conversion in a continuous cycle from a single reservoir.' },
    { misconception: 'Carnot efficiency can be evaluated with temperatures in Celsius.', correction: 'Carnot efficiency η = 1 - T2/T1 requires absolute temperatures in Kelvin. Using Celsius produces mathematically invalid results.' },
    { misconception: 'In SHM, total energy changes with displacement.', correction: 'Total mechanical energy E = (1/2)mω²A² is constant and conserved at all points. Kinetic and potential energies trade off inversely.' },
    { misconception: 'At the same temperature, heavy and light gas molecules have the same rms speed.', correction: 'Equal temperature means equal average kinetic energy ((1/2)mc² = 3/2 kT). Lighter molecules (smaller m) move significantly faster (c ∝ 1/√M).' }
  ],
  diagnosticQuestions: [
    { question: 'What is the work done in a reversible adiabatic process?', options: ['(P1V1 - P2V2)/(γ - 1)', 'nRT ln(V2/V1)', 'P(V2 - V1)', 'Zero'], correctIndex: 0 },
    { question: 'What is the theoretical maximum efficiency of a heat engine operating between T1 and T2?', options: ['1 - T2/T1', '1 - T1/T2', 'T2/T1', '100%'], correctIndex: 0 },
    { question: 'What does Kelvin\'s statement of the Second Law forbid?', options: ['100% conversion of heat to work in a cycle', 'Heat flowing from hot to cold', 'Compressing a gas adiabatically', 'Pendulum oscillation'], correctIndex: 0 },
    { question: 'In kinetic theory, what is molecular pressure p in terms of density ρ and mean square speed c²?', options: ['(1/3)ρc²', '(1/2)ρc²', 'ρc²', '(3/2)ρc²'], correctIndex: 0 },
    { question: 'How many degrees of freedom does a rigid diatomic molecule have at room temperature?', options: ['5', '3', '6', '7'], correctIndex: 0 },
    { question: 'How is mean free path λ related to number density n?', options: ['λ ∝ 1/n', 'λ ∝ n', 'λ ∝ n²', 'λ is independent of n'], correctIndex: 0 },
    { question: 'What is the phase difference between acceleration and displacement in SHM?', options: ['180° (π rad)', '90° (π/2 rad)', '0°', '270°'], correctIndex: 0 },
    { question: 'At what point in an SHM oscillation is the kinetic energy maximum?', options: ['Equilibrium position (y = 0)', 'Maximum positive extreme (y = +A)', 'Maximum negative extreme (y = -A)', 'y = A/2'], correctIndex: 0 }
  ],
  masteryCriteria: 'Student demonstrates thorough mastery of adiabatic work derivation, Second Law/Carnot limits, kinetic theory gas derivations, equipartition degrees of freedom, and SHM differential kinematics and energy conservation.',
};

// ─── INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: '1. The Adiabatic Piston Compression',
    instruction: 'Drag the Piston Compression slider. Notice how rapid compression (Q = 0) does work ON the gas, raising temperature and pressure sharply along the steep PV^γ adiabat.',
    interactionType: 'slider-observe',
    nodeId: NODE_C11_PHY_081,
  },
  {
    title: '2. The Carnot Engine Cycle',
    instruction: 'Click through the 4 Carnot stages on the PV loop to trace heat absorption at T1, adiabatic cooling, heat rejection at T2, and adiabatic reheating.',
    interactionType: 'click-parts',
    nodeId: NODE_C11_PHY_083,
  },
  {
    title: '3. Molecular Kinetic Box & Temperature',
    instruction: 'Adjust the Temperature slider. Observe gas molecules accelerating, wall collision frequency increasing, and macroscopic pressure rising according to p = (1/3)ρc².',
    interactionType: 'slider-observe',
    nodeId: NODE_C11_PHY_084,
  },
  {
    title: '4. Equipartition & Degrees of Freedom',
    instruction: 'Toggle between Monatomic (He), Diatomic (O2), and Polyatomic (H2O) gases to see translational vs rotational energy storage and resulting γ values.',
    interactionType: 'click-parts',
    nodeId: NODE_C11_PHY_086,
  },
  {
    title: '5. SHM Phase & Energy Conservation Lab',
    instruction: 'Pull the oscillating mass or adjust amplitude A and spring stiffness k. Watch the real-time continuous exchange between Kinetic and Potential parabolas.',
    interactionType: 'slider-observe',
    nodeId: NODE_C11_PHY_090,
  },
];

// ─── REAL-WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Cryogenic Rocket & Engine Analysis Report',
  description: 'Design a high-efficiency stage for an ISRO cryogenic upper stage engine using liquid oxygen (90 K) and hydrogen (20 K) with a spring-mass anti-vibration payload mount.',
  steps: [
    'Calculate the theoretical Carnot efficiency limit operating between 90 K and 20 K.',
    'Determine the adiabatic compression ratio required to achieve ignition temperature.',
    'Model the payload anti-vibration spring stiffness k to ensure resonance frequency is safely below 5 Hz.',
    'Present your energy distribution diagrams and safety factor margins to your instructor.'
  ],
};

// ─── MAIN COMPONENT ───
export function C11_PhysicsWorkDoneAdiabaticSim(props: Props = DEFAULT_PROPS) {
  const {
    nodeId = DEFAULT_PROPS.nodeId || 'c11_phy_081',
    title = DEFAULT_PROPS.title || 'Thermodynamics & SHM Simulation',
    misconceptions = DEFAULT_PROPS.misconceptions,
    onComplete
  } = props;

  const subjectConfig = SUBJECT_CONFIG['physics'] || { name: 'Physics', emoji: '⚡', color: 'indigo' };

  // ─── PHASE STATE ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // ─── PREDICTION & OBSERVATION STATE (BRILLIANT PATTERNS) ───
  const [predIndex, setPredIndex] = useState(0);
  const [predAnswers, setPredAnswers] = useState<Record<number, number>>({});
  const [showPredFeedback, setShowPredFeedback] = useState<Record<number, boolean>>({});

  const [obsIndex, setObsIndex] = useState(0);
  const [obsAnswers, setObsAnswers] = useState<Record<number, number>>({});
  const [showObsFeedback, setShowObsFeedback] = useState<Record<number, boolean>>({});

  // ─── INTERACTIVE SIMULATION VARIABLES ───
  // 1. Thermodynamics / Adiabatic state
  const [compressionRatio, setCompressionRatio] = useState(2.0); // 1.0 to 5.0
  const [gammaIndex, setGammaIndex] = useState(1.4); // 1.67 (mono), 1.40 (dia), 1.33 (poly)
  const [gasType, setGasType] = useState<'monatomic' | 'diatomic' | 'polyatomic'>('diatomic');
  const [carnotT1, setCarnotT1] = useState(600); // K (Hot source)
  const [carnotT2, setCarnotT2] = useState(300); // K (Cold sink)
  const [activeCarnotStage, setActiveCarnotStage] = useState<number>(0);

  // 2. Kinetic Theory Molecular Box state
  const [tempKelvin, setTempKelvin] = useState(300); // K
  const [gasDensity, setGasDensity] = useState(1.29); // kg/m³
  const [molecularMolarMass, setMolecularMolarMass] = useState(0.028); // 0.028 kg/mol (N2)

  // 3. SHM Oscillator state
  const [shmMass, setShmMass] = useState(0.5); // kg
  const [shmStiffness, setShmStiffness] = useState(50); // N/m
  const [shmAmplitude, setShmAmplitude] = useState(0.15); // m
  const [shmTime, setShmTime] = useState(0); // s (for live animation)
  const [isShmRunning, setIsShmRunning] = useState(true);

  // ─── PEDAGOGICAL & BRILLIANT PATTERNS STATE ───
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Challenge & Feedback state
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Reflection responses state
  const [reflections, setReflections] = useState({
    surprising: '',
    explain: '',
    realLife: ''
  });

  // Drag & Sort & Input states
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Visual feedback animations
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const kineticCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const shmCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameIdRef = useRef<number | null>(null);

  // ─── DERIVED THERMODYNAMIC VALUES ───
  const adiabaticCalculations = useMemo(() => {
    const P1 = 100000; // 100 kPa
    const V1 = 0.02; // 0.02 m³
    const V2 = V1 / compressionRatio;
    const P2 = P1 * Math.pow(compressionRatio, gammaIndex);
    const workDoneByGas = (P1 * V1 - P2 * V2) / (gammaIndex - 1);
    const deltaU = -workDoneByGas; // ΔU = -W
    const T1 = 300;
    const T2 = T1 * Math.pow(compressionRatio, gammaIndex - 1);
    const carnotEff = 1 - carnotT2 / carnotT1;

    return {
      P1, V1, P2, V2,
      workDoneByGas,
      deltaU,
      T1, T2,
      carnotEff
    };
  }, [compressionRatio, gammaIndex, carnotT1, carnotT2]);

  // ─── DERIVED KINETIC VALUES ───
  const kineticCalculations = useMemo(() => {
    const R = 8.314;
    const kB = 1.38e-23;
    const c_rms = Math.sqrt((3 * R * tempKelvin) / molecularMolarMass);
    const pressure = (1 / 3) * gasDensity * (c_rms * c_rms);
    const avgKE_molecule = 1.5 * kB * tempKelvin;
    const molecularDiameter = 2.5e-10; // 0.25 nm
    const numberDensity = pressure / (kB * tempKelvin);
    const meanFreePath = 1 / (Math.SQRT2 * Math.PI * Math.pow(molecularDiameter, 2) * numberDensity);

    let degOfFreedom = 5;
    let cvValue = (5 / 2) * R;
    let cpValue = (7 / 2) * R;
    if (gasType === 'monatomic') {
      degOfFreedom = 3;
      cvValue = (3 / 2) * R;
      cpValue = (5 / 2) * R;
    } else if (gasType === 'polyatomic') {
      degOfFreedom = 6;
      cvValue = 3 * R;
      cpValue = 4 * R;
    }

    return {
      c_rms,
      pressure,
      avgKE_molecule,
      numberDensity,
      meanFreePath,
      degOfFreedom,
      cvValue,
      cpValue
    };
  }, [tempKelvin, gasDensity, molecularMolarMass, gasType]);

  // ─── DERIVED SHM VALUES ───
  const shmCalculations = useMemo(() => {
    const omega = Math.sqrt(shmStiffness / shmMass);
    const period = (2 * Math.PI) / omega;
    const frequency = 1 / period;
    const currentY = shmAmplitude * Math.sin(omega * shmTime);
    const currentV = shmAmplitude * omega * Math.cos(omega * shmTime);
    const currentA = -Math.pow(omega, 2) * currentY;
    const totalEnergy = 0.5 * shmMass * Math.pow(omega, 2) * Math.pow(shmAmplitude, 2);
    const potentialEnergy = 0.5 * shmMass * Math.pow(omega, 2) * Math.pow(currentY, 2);
    const kineticEnergy = Math.max(0, totalEnergy - potentialEnergy);

    return {
      omega,
      period,
      frequency,
      currentY,
      currentV,
      currentA,
      totalEnergy,
      potentialEnergy,
      kineticEnergy,
      vMax: shmAmplitude * omega,
      aMax: shmAmplitude * Math.pow(omega, 2)
    };
  }, [shmMass, shmStiffness, shmAmplitude, shmTime]);

  // ─── ADAPTIVE DIFFICULTY FILTER ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') {
      return CHALLENGES.filter(c => c.difficulty === 'foundation');
    }
    if (difficulty === 'standard') {
      return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    }
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── LOAD MASTERY ON MOUNT ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── ADAPT DIFFICULTY AFTER BKT UPDATES ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDifficulty = (mastery === 'not-started' || mastery === 'beginner')
      ? 'foundation'
      : (mastery === 'developing' ? 'standard' : 'advanced');

    setDifficulty(prev => {
      if (prev !== newDifficulty) {
        setCurrentChallenge(0);
        return newDifficulty;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── SHM CONTINUOUS ANIMATION LOOP ───
  useEffect(() => {
    if (!isShmRunning) return;
    let lastTs = performance.now();
    const updateLoop = (now: number) => {
      const dt = (now - lastTs) / 1000;
      lastTs = now;
      setShmTime(prev => prev + dt);
      animFrameIdRef.current = requestAnimationFrame(updateLoop);
    };
    animFrameIdRef.current = requestAnimationFrame(updateLoop);

    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [isShmRunning]);

  // ─── CANVAS 1: KINETIC MOLECULAR BOX RENDERING ───
  useEffect(() => {
    const canvas = kineticCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    // Draw container box
    ctx.strokeStyle = '#6366f1';
    ctx.lineWidth = 3;
    ctx.strokeRect(10, 10, width - 20, height - 20);

    // Draw molecules bouncing
    const numParticles = 24;
    const speedFactor = (kineticCalculations.c_rms / 500) * 2.5;

    ctx.fillStyle = gasType === 'monatomic' ? '#38bdf8' : gasType === 'diatomic' ? '#34d399' : '#f472b6';
    for (let i = 0; i < numParticles; i++) {
      const t = shmTime * speedFactor + i * 1.7;
      const x = 25 + Math.abs(Math.sin(t * (0.8 + (i % 5) * 0.2))) * (width - 50);
      const y = 25 + Math.abs(Math.cos(t * (1.1 + (i % 4) * 0.3))) * (height - 50);

      ctx.beginPath();
      ctx.arc(x, y, gasType === 'monatomic' ? 4 : 5.5, 0, Math.PI * 2);
      ctx.fill();

      // For diatomic, draw dumbbell second atom
      if (gasType === 'diatomic' || gasType === 'polyatomic') {
        const theta = t * 3;
        const x2 = x + Math.cos(theta) * 8;
        const y2 = y + Math.sin(theta) * 8;
        ctx.beginPath();
        ctx.arc(x2, y2, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }
    }
  }, [shmTime, kineticCalculations.c_rms, gasType]);

  // ─── CANVAS 2: SHM OSCILLATING MASS & SPRING RENDERING ───
  useEffect(() => {
    const canvas = shmCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    const centerY = height / 2;
    const centerX = width / 2;
    const pixelDisplacement = (shmCalculations.currentY / 0.3) * (width * 0.35);
    const massX = centerX + pixelDisplacement;

    // Fixed wall at left
    ctx.fillStyle = '#475569';
    ctx.fillRect(10, centerY - 30, 10, 60);

    // Spring coils
    ctx.strokeStyle = '#818cf8';
    ctx.lineWidth = 3;
    ctx.beginPath();
    const coils = 12;
    const startX = 20;
    const springLen = massX - 30 - startX;
    ctx.moveTo(startX, centerY);
    for (let i = 0; i < coils; i++) {
      const cx = startX + (i + 0.5) * (springLen / coils);
      const cy = centerY + (i % 2 === 0 ? -12 : 12);
      ctx.lineTo(cx, cy);
    }
    ctx.lineTo(massX - 20, centerY);
    ctx.stroke();

    // Mass block
    ctx.fillStyle = '#6366f1';
    ctx.fillRect(massX - 20, centerY - 20, 40, 40);
    ctx.strokeStyle = '#e0e7ff';
    ctx.lineWidth = 2;
    ctx.strokeRect(massX - 20, centerY - 20, 40, 40);

    // Mass text
    ctx.fillStyle = '#ffffff';
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`${shmMass}kg`, massX, centerY + 4);

    // Equilibrium marker
    ctx.strokeStyle = '#ef4444';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(centerX, centerY - 35);
    ctx.lineTo(centerX, centerY + 35);
    ctx.stroke();
    ctx.setLineDash([]);
  }, [shmCalculations.currentY, shmMass]);

  // ─── USER INTERACTION HANDLERS (USECALLBACK) ───

  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'error');
    speechManager.speak(isCorrect ? 'Excellent deduction!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handlePredictionAnswer = useCallback((qIndex: number, selectedIdx: number) => {
    setPredAnswers(prev => ({ ...prev, [qIndex]: selectedIdx }));
    setShowPredFeedback(prev => ({ ...prev, [qIndex]: true }));
    const isCorrect = selectedIdx === PREDICTION_QUESTIONS[qIndex].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'hint');
    speechManager.speak(isCorrect ? 'Prediction recorded! Now test and verify in the simulation.' : 'Check the simulation below to verify the real physics.');
  }, []);

  const handleObservationAnswer = useCallback((qIndex: number, selectedIdx: number) => {
    setObsAnswers(prev => ({ ...prev, [qIndex]: selectedIdx }));
    setShowObsFeedback(prev => ({ ...prev, [qIndex]: true }));
    const isCorrect = selectedIdx === OBSERVATION_QUESTIONS[qIndex].correctIndex;
    audioManager.play(isCorrect ? 'drop-correct' : 'error');
    speechManager.speak(isCorrect ? 'Great scientific observation!' : 'Review the visualization graph carefully.');
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Let us explore the core principles through visual interactive labs.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode. Adjust any thermodynamic or harmonic variable with zero grading pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the challenge arena. Answer each question carefully.');
  }, []);

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
    speechManager.speak(`Congratulations! Simulation complete with a score of ${finalScore} percent.`);
  }, [errors, onComplete]);

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
      const numAnswer = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
      isCorrect = Math.abs(numAnswer - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0.1);
    } else if (challenge.type === 'construct') {
      isCorrect = (answer as string).trim() === (challenge.targetState || '').trim();
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Outstanding scientific reasoning.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 4000);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(`mastery_${challenge.nodeId}`, JSON.stringify(updatedSrs));
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
        speechManager.speak('Let us study the complete step-by-step breakdown together.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`mastery_${challenge.nodeId}`, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]);

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
      let arr = prev.length === 0 && challenge.sortItems ? challenge.sortItems.map((_, i) => i) : [...prev];
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [challenge]);

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems?.map((_, i) => i) || []);
    handleAnswer(answer);
  }, [sortArrangement, challenge, handleAnswer]);

  const handleGasTypeSelect = useCallback((type: 'monatomic' | 'diatomic' | 'polyatomic') => {
    setGasType(type);
    audioManager.play('tap');
    if (type === 'monatomic') {
      setGammaIndex(1.67);
      setMolecularMolarMass(0.004); // He
    } else if (type === 'diatomic') {
      setGammaIndex(1.40);
      setMolecularMolarMass(0.028); // N2
    } else {
      setGammaIndex(1.33);
      setMolecularMolarMass(0.018); // H2O
    }
  }, []);

  const handleNextSlide = useCallback(() => {
    setCurrentSlide(s => Math.min(EXPLORATION_STEPS.length - 1, s + 1));
    audioManager.play('whoosh');
  }, []);

  const handlePrevSlide = useCallback(() => {
    setCurrentSlide(s => Math.max(0, s - 1));
    audioManager.play('whoosh');
  }, []);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── RENDER ───
  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans select-none">
      {/* ─── HEADER ─── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-4 mb-6 gap-3"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-indigo-950/80 rounded-2xl border border-indigo-700/50" aria-hidden="true">
            {subjectConfig.emoji}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2 py-0.5 bg-indigo-900/60 text-indigo-300 rounded-md uppercase tracking-wider">
                ISC Class 11 Physics
              </span>
              <span className="text-xs text-slate-400">Chapters: Thermo, KTG & Oscillations</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white tracking-tight mt-0.5">{title}</h1>
          </div>
        </div>

        {/* Phase Pill Navigation */}
        <div className="flex items-center gap-1 bg-slate-900 p-1.5 rounded-2xl border border-slate-800 text-xs font-semibold" role="tablist">
          {(['discovery', 'explore', 'sandbox', 'challenge'] as const).map((p) => (
            <motion.button
              key={p}
              role="tab"
              aria-selected={phase === p}
              aria-label={`Switch to ${p} phase`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setPhase(p);
                audioManager.play('tap');
              }}
              className={`px-3 py-1.5 rounded-xl capitalize transition-all ${
                phase === p
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {p}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* ─── 1. DISCOVERY PHASE ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-indigo-950/70 via-slate-900 to-slate-950 rounded-2xl border border-indigo-800/60 shadow-xl">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm tracking-wider uppercase mb-2">
              <span>🚀 Scenario Briefing</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white mb-2">{SCENARIO.title}</h2>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">{SCENARIO.intro}</p>
            <div className="p-3.5 bg-slate-900/90 rounded-xl border border-slate-700/60 text-xs text-indigo-200">
              <span className="font-bold text-amber-400">Context: </span>
              {SCENARIO.context}
            </div>
          </div>

          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" aria-hidden="true" />
              <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider">
                Discovery Curiosity Hook
              </h3>
            </div>
            <p className="text-base md:text-lg font-medium text-white">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`text-left p-4 rounded-xl border text-sm transition-all flex items-start ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : 'bg-slate-900/40 border-slate-800 text-slate-500 opacity-60'
                      : 'bg-slate-800/80 hover:bg-slate-750 border-slate-700 text-slate-200 hover:border-indigo-500'
                  }`}
                >
                  <span className="font-bold text-indigo-400 mr-2 flex-shrink-0">
                    {discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex && '✓ '}
                    {discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex && '✗ '}
                    {String.fromCharCode(65 + i)}.
                  </span>
                  <span>{opt}</span>
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4"
              >
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-300'}`}>
                  {discoveryCorrect ? '✓ Spot on!' : '✗ Notice: '}
                  {DISCOVERY_QUESTION.hintAfter}
                </p>
                <motion.button
                  aria-label="Explore interactive labs"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-sm whitespace-nowrap shadow-lg shadow-indigo-600/30"
                >
                  Explore Interactive Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 2. EXPLORE PHASE ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* ─── BRILLIANT.ORG PREDICTION & OBSERVATION BANNER ─── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Prediction Card */}
            <div className="p-4 bg-gradient-to-br from-indigo-950/60 to-slate-900 rounded-2xl border border-indigo-700/50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🔮 Predict-Then-Check #{predIndex + 1}</span>
                </span>
                <div className="flex gap-1">
                  {PREDICTION_QUESTIONS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setPredIndex(i)}
                      className={`w-6 h-6 rounded-full text-xs font-bold ${
                        predIndex === i ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </div>
              <p className="text-xs font-medium text-slate-200">{PREDICTION_QUESTIONS[predIndex].question}</p>
              <div className="space-y-1 pt-1">
                {PREDICTION_QUESTIONS[predIndex].options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handlePredictionAnswer(predIndex, idx)}
                    className={`w-full text-left p-2 rounded-lg text-xs border transition-all ${
                      showPredFeedback[predIndex]
                        ? idx === PREDICTION_QUESTIONS[predIndex].correctIndex
                          ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
                          : predAnswers[predIndex] === idx
                          ? 'bg-rose-950 border-rose-500 text-rose-200'
                          : 'bg-slate-900 border-slate-800 text-slate-500'
                        : 'bg-slate-900/80 hover:bg-slate-800 border-slate-800 text-slate-300'
                    }`}
                  >
                    <span className="font-bold mr-1.5">{String.fromCharCode(65 + idx)}.</span>
                    {opt}
                  </button>
                ))}
              </div>
              {showPredFeedback[predIndex] && (
                <div className="mt-2 p-2 bg-slate-950 rounded-lg border border-indigo-900/50 text-[11px] text-indigo-300">
                  <span className="font-bold text-amber-400">Verify Instruction: </span>
                  {PREDICTION_QUESTIONS[predIndex].verifyInstruction}
                </div>
              )}
            </div>

            {/* Observation Card */}
            <div className="p-4 bg-gradient-to-br from-emerald-950/50 to-slate-900 rounded-2xl border border-emerald-700/50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>👀 What Do You Notice? #{obsIndex + 1}</span>
                </span>
                <div className="flex gap-1">
                  {OBSERVATION_QUESTIONS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setObsIndex(i)}
                      className={`w-6 h-6 rounded-full text-xs font-bold ${
                        obsIndex === i ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </div>
              <p className="text-xs font-medium text-slate-200">{OBSERVATION_QUESTIONS[obsIndex].question}</p>
              <div className="space-y-1 pt-1">
                {OBSERVATION_QUESTIONS[obsIndex].observableOptions.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleObservationAnswer(obsIndex, idx)}
                    className={`w-full text-left p-2 rounded-lg text-xs border transition-all ${
                      showObsFeedback[obsIndex]
                        ? idx === OBSERVATION_QUESTIONS[obsIndex].correctIndex
                          ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
                          : obsAnswers[obsIndex] === idx
                          ? 'bg-rose-950 border-rose-500 text-rose-200'
                          : 'bg-slate-900 border-slate-800 text-slate-500'
                        : 'bg-slate-900/80 hover:bg-slate-800 border-slate-800 text-slate-300'
                    }`}
                  >
                    <span className="font-bold mr-1.5">{String.fromCharCode(65 + idx)}.</span>
                    {opt}
                  </button>
                ))}
              </div>
              {showObsFeedback[obsIndex] && (
                <div className="mt-2 p-2 bg-slate-950 rounded-lg border border-emerald-900/50 text-[11px] text-emerald-300">
                  <span className="font-bold text-emerald-400">Insight: </span>
                  {OBSERVATION_QUESTIONS[obsIndex].explanation}
                </div>
              )}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-bold px-2.5 py-1 bg-indigo-950 text-indigo-300 border border-indigo-800 rounded-lg uppercase tracking-wider">
                  Lab Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {EXPLORATION_STEPS[currentSlide].nodeId}
                </span>
              </div>
              <h2 className="text-xl md:text-2xl font-black text-white">{EXPLORATION_STEPS[currentSlide].title}</h2>
              <p className="text-amber-400 text-sm font-medium">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>

              {/* ─── LAB STEP 0: ADIABATIC P-V & WORK ─── */}
              {currentSlide === 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  <div className="space-y-4">
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <label htmlFor="piston-compression-slider">Piston Compression Ratio:</label>
                        <span className="font-bold text-indigo-400">{compressionRatio.toFixed(1)}x</span>
                      </div>
                      <input
                        id="piston-compression-slider"
                        aria-label="Piston Compression Ratio slider"
                        type="range"
                        min={1.0}
                        max={5.0}
                        step={0.1}
                        value={compressionRatio}
                        onChange={(e) => {
                          setCompressionRatio(parseFloat(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-indigo-500 cursor-pointer"
                      />
                    </div>

                    <div className="flex gap-2">
                      {(['monatomic', 'diatomic', 'polyatomic'] as const).map((t) => (
                        <motion.button
                          key={t}
                          aria-label={`Select ${t} gas`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleGasTypeSelect(t)}
                          className={`flex-1 py-2 rounded-xl text-xs font-bold capitalize border ${
                            gasType === t
                              ? 'bg-indigo-600 border-indigo-400 text-white'
                              : 'bg-slate-800 border-slate-700 text-slate-400'
                          }`}
                        >
                          {t} (γ={t === 'monatomic' ? '1.67' : t === 'diatomic' ? '1.40' : '1.33'})
                        </motion.button>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-slate-400">Final Pressure P2:</span>
                        <p className="text-lg font-mono font-bold text-indigo-300">
                          {(adiabaticCalculations.P2 / 1000).toFixed(1)} kPa
                        </p>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-slate-400">Final Temp T2:</span>
                        <p className="text-lg font-mono font-bold text-amber-300">
                          {adiabaticCalculations.T2.toFixed(1)} K
                        </p>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-slate-400">Work Done By Gas:</span>
                        <p className="text-lg font-mono font-bold text-rose-400">
                          {adiabaticCalculations.workDoneByGas.toFixed(0)} J
                        </p>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-slate-400">ΔU = -W:</span>
                        <p className="text-lg font-mono font-bold text-emerald-400">
                          +{adiabaticCalculations.deltaU.toFixed(0)} J
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* SVG P-V Graph Visualizer */}
                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex flex-col items-center justify-center">
                    <svg viewBox="0 0 320 220" className="w-full h-48" role="img" aria-label="Pressure Volume Graph showing Isotherm and Adiabat curves">
                      {/* Axes */}
                      <line x1="40" y1="190" x2="300" y2="190" stroke="#64748b" strokeWidth="2" />
                      <line x1="40" y1="20" x2="40" y2="190" stroke="#64748b" strokeWidth="2" />
                      <text x="300" y="205" fill="#94a3b8" fontSize="10" textAnchor="end">Volume V</text>
                      <text x="30" y="25" fill="#94a3b8" fontSize="10" textAnchor="end">Pressure P</text>

                      {/* Isotherm Curve (PV = const) */}
                      <path
                        d="M 60 40 Q 120 120 280 170"
                        fill="none"
                        stroke="#60a5fa"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                      />
                      <text x="280" y="165" fill="#60a5fa" fontSize="9">Isotherm (PV)</text>

                      {/* Adiabat Curve (PV^gamma = const) - Steeper */}
                      <path
                        d={`M 60 ${Math.max(30, 190 - (adiabaticCalculations.P2 / 500000) * 160)} Q 100 140 280 170`}
                        fill="none"
                        stroke="#f43f5e"
                        strokeWidth="3"
                      />
                      <text x="80" y="45" fill="#f43f5e" fontSize="9" fontWeight="bold">
                        Adiabat (PV^{gammaIndex})
                      </text>

                      {/* Highlight Current Operating Point */}
                      <circle
                        cx={280 - (compressionRatio - 1) * 50}
                        cy={190 - (adiabaticCalculations.P2 / 600000) * 150}
                        r="5"
                        fill="#fbbf24"
                      />
                    </svg>
                    <span className="text-[11px] text-slate-400 mt-1 text-center">
                      Adiabatic curve drops faster due to simultaneous cooling during expansion.
                    </span>
                  </div>
                </div>
              )}

              {/* ─── LAB STEP 1: CARNOT CYCLE ─── */}
              {currentSlide === 1 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <label htmlFor="carnot-t1-slider" className="text-xs text-slate-400 block">Source Temp (T1):</label>
                        <input
                          id="carnot-t1-slider"
                          aria-label="Carnot Source Temperature T1 slider"
                          type="range"
                          min={400}
                          max={1000}
                          step={20}
                          value={carnotT1}
                          onChange={(e) => setCarnotT1(Number(e.target.value))}
                          className="w-full accent-rose-500 mt-1"
                        />
                        <span className="text-sm font-bold text-rose-400">{carnotT1} K</span>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <label htmlFor="carnot-t2-slider" className="text-xs text-slate-400 block">Sink Temp (T2):</label>
                        <input
                          id="carnot-t2-slider"
                          aria-label="Carnot Sink Temperature T2 slider"
                          type="range"
                          min={150}
                          max={380}
                          step={10}
                          value={carnotT2}
                          onChange={(e) => setCarnotT2(Number(e.target.value))}
                          className="w-full accent-cyan-500 mt-1"
                        />
                        <span className="text-sm font-bold text-cyan-400">{carnotT2} K</span>
                      </div>
                    </div>

                    <div className="p-4 bg-gradient-to-r from-slate-900 to-indigo-950/40 rounded-xl border border-indigo-900/50">
                      <span className="text-xs text-slate-400">Theoretical Carnot Max Efficiency:</span>
                      <p className="text-2xl font-black text-emerald-400 font-mono">
                        η = {(adiabaticCalculations.carnotEff * 100).toFixed(1)}%
                      </p>
                      <span className="text-[11px] text-slate-400 block mt-1">
                        Formula: η = 1 - (T2 / T1) [Independent of working substance]
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      {[
                        { title: '1. Isothermal Expansion', desc: `Absorbs Q1 at ${carnotT1} K`, col: 'text-rose-400' },
                        { title: '2. Adiabatic Expansion', desc: `Cools Q=0 from ${carnotT1}K to ${carnotT2}K`, col: 'text-amber-400' },
                        { title: '3. Isothermal Compression', desc: `Rejects Q2 at ${carnotT2} K`, col: 'text-cyan-400' },
                        { title: '4. Adiabatic Compression', desc: `Heats Q=0 from ${carnotT2}K to ${carnotT1}K`, col: 'text-indigo-400' }
                      ].map((stg, idx) => (
                        <motion.button
                          key={idx}
                          aria-label={`Select Carnot stage: ${stg.title}`}
                          whileHover={{ scale: 1.02 }}
                          onClick={() => {
                            setActiveCarnotStage(idx);
                            audioManager.play('tap');
                          }}
                          className={`w-full text-left p-2.5 rounded-xl border text-xs flex justify-between items-center ${
                            activeCarnotStage === idx
                              ? 'bg-slate-800 border-indigo-500 font-bold'
                              : 'bg-slate-900/60 border-slate-800 text-slate-400'
                          }`}
                        >
                          <span className={stg.col}>{stg.title}</span>
                          <span className="text-slate-400">{stg.desc}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Closed Carnot PV Loop SVG */}
                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex flex-col items-center justify-center">
                    <svg viewBox="0 0 320 220" className="w-full h-48" role="img" aria-label="Carnot Cycle Pressure-Volume loop diagram">
                      <line x1="30" y1="190" x2="300" y2="190" stroke="#64748b" strokeWidth="2" />
                      <line x1="30" y1="20" x2="300" y2="20" stroke="#64748b" strokeWidth="0" />
                      <line x1="30" y1="20" x2="30" y2="190" stroke="#64748b" strokeWidth="2" />

                      {/* Four connected paths of Carnot Cycle */}
                      <polygon
                        points="80,50 160,80 260,160 140,140"
                        fill="#4f46e5"
                        fillOpacity="0.2"
                        stroke="#818cf8"
                        strokeWidth="2.5"
                      />

                      {/* Stage labels */}
                      <text x="120" y="55" fill="#f43f5e" fontSize="10" fontWeight="bold">1. Iso Exp</text>
                      <text x="220" y="115" fill="#fbbf24" fontSize="10" fontWeight="bold">2. Ad Exp</text>
                      <text x="190" y="165" fill="#38bdf8" fontSize="10" fontWeight="bold">3. Iso Comp</text>
                      <text x="90" y="110" fill="#a78bfa" fontSize="10" fontWeight="bold">4. Ad Comp</text>

                      {/* Center Area Work label */}
                      <text x="160" y="115" fill="#ffffff" fontSize="11" textAnchor="middle" fontWeight="black">
                        W = Q1 - Q2
                      </text>
                    </svg>
                  </div>
                </div>
              )}

              {/* ─── LAB STEP 2: MOLECULAR KINETIC THEORY ─── */}
              {currentSlide === 2 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  <div className="space-y-4">
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <label htmlFor="ktg-temperature-slider">Temperature T:</label>
                        <span className="font-bold text-amber-400">{tempKelvin} K</span>
                      </div>
                      <input
                        id="ktg-temperature-slider"
                        aria-label="Gas Temperature in Kelvin slider"
                        type="range"
                        min={100}
                        max={800}
                        step={10}
                        value={tempKelvin}
                        onChange={(e) => setTempKelvin(Number(e.target.value))}
                        className="w-full accent-amber-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-slate-400">RMS Speed (c_rms):</span>
                        <p className="text-lg font-mono font-bold text-indigo-300">
                          {kineticCalculations.c_rms.toFixed(1)} m/s
                        </p>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-slate-400">Kinetic Pressure p:</span>
                        <p className="text-lg font-mono font-bold text-emerald-300">
                          {(kineticCalculations.pressure / 1000).toFixed(1)} kPa
                        </p>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-slate-400">Avg KE / Molecule:</span>
                        <p className="text-sm font-mono font-bold text-cyan-300">
                          {(kineticCalculations.avgKE_molecule * 1e21).toFixed(2)} × 10⁻²¹ J
                        </p>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-slate-400">Mean Free Path λ:</span>
                        <p className="text-sm font-mono font-bold text-rose-300">
                          {(kineticCalculations.meanFreePath * 1e9).toFixed(1)} nm
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-center bg-slate-900 p-3 rounded-xl border border-slate-800">
                    <canvas ref={kineticCanvasRef} width={300} height={180} className="w-full rounded-lg" aria-label="Molecular particle movement simulation canvas" />
                    <span className="text-[11px] text-slate-400 mt-2 text-center">
                      Elastic collisions conserve momentum: p = (1/3)ρc²
                    </span>
                  </div>
                </div>
              )}

              {/* ─── LAB STEP 3: EQUIPARTITION ─── */}
              {currentSlide === 3 && (
                <div className="space-y-4 bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { type: 'monatomic', name: 'Monatomic (He)', f: 'f = 3', modes: '3 Translational, 0 Rotational', cv: 'Cv = 1.5 R', cp: 'Cp = 2.5 R', gamma: 'γ = 1.67' },
                      { type: 'diatomic', name: 'Diatomic (O2/N2)', f: 'f = 5', modes: '3 Translational, 2 Rotational', cv: 'Cv = 2.5 R', cp: 'Cp = 3.5 R', gamma: 'γ = 1.40' },
                      { type: 'polyatomic', name: 'Polyatomic (H2O)', f: 'f = 6', modes: '3 Translational, 3 Rotational', cv: 'Cv = 3.0 R', cp: 'Cp = 4.0 R', gamma: 'γ = 1.33' }
                    ].map((g) => (
                      <motion.button
                        key={g.type}
                        aria-label={`Select ${g.name}`}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => handleGasTypeSelect(g.type as any)}
                        className={`p-4 rounded-xl text-left border transition-all ${
                          gasType === g.type
                            ? 'bg-indigo-950 border-indigo-500 shadow-lg shadow-indigo-600/20'
                            : 'bg-slate-900 border-slate-800'
                        }`}
                      >
                        <span className="text-xs font-bold text-indigo-400 block">{g.name}</span>
                        <p className="text-lg font-black text-white mt-1">{g.f}</p>
                        <p className="text-[11px] text-slate-400 mt-1">{g.modes}</p>
                        <div className="mt-3 pt-2 border-t border-slate-800 flex justify-between text-xs font-mono">
                          <span className="text-emerald-400">{g.cv}</span>
                          <span className="text-amber-400">{g.gamma}</span>
                        </div>
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs leading-relaxed text-slate-300">
                    <span className="font-bold text-indigo-300">Law of Equipartition: </span>
                    Every active degree of freedom receives equal energy = <span className="text-amber-300 font-mono">(1/2)kT</span> per molecule or <span className="text-amber-300 font-mono">(1/2)RT</span> per mole. Rotational mode along the diatomic bond axis is neglected because its moment of inertia is near zero.
                  </div>
                </div>
              )}

              {/* ─── LAB STEP 4: SHM ENERGY CONSERVATION ──�� */}
              {currentSlide === 4 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <label htmlFor="shm-stiffness-slider" className="text-xs text-slate-400 block">Spring Stiffness (k):</label>
                        <input
                          id="shm-stiffness-slider"
                          aria-label="Spring Stiffness k slider"
                          type="range"
                          min={10}
                          max={150}
                          value={shmStiffness}
                          onChange={(e) => setShmStiffness(Number(e.target.value))}
                          className="w-full accent-indigo-500 mt-1"
                        />
                        <span className="text-xs font-bold text-indigo-300">{shmStiffness} N/m</span>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <label htmlFor="shm-amplitude-slider" className="text-xs text-slate-400 block">Amplitude (A):</label>
                        <input
                          id="shm-amplitude-slider"
                          aria-label="Oscillation Amplitude slider"
                          type="range"
                          min={0.05}
                          max={0.30}
                          step={0.01}
                          value={shmAmplitude}
                          onChange={(e) => setShmAmplitude(Number(e.target.value))}
                          className="w-full accent-amber-500 mt-1"
                        />
                        <span className="text-xs font-bold text-amber-300">{shmAmplitude.toFixed(2)} m</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-slate-400">Kinetic Energy (KE)</span>
                        <p className="text-base font-bold font-mono text-emerald-400">
                          {shmCalculations.kineticEnergy.toFixed(3)} J
                        </p>
                      </div>
                      <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-slate-400">Potential Energy (PE)</span>
                        <p className="text-base font-bold font-mono text-cyan-400">
                          {shmCalculations.potentialEnergy.toFixed(3)} J
                        </p>
                      </div>
                      <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-slate-400">Total Energy (E)</span>
                        <p className="text-base font-bold font-mono text-white">
                          {shmCalculations.totalEnergy.toFixed(3)} J
                        </p>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs flex justify-between items-center">
                      <span>Time Period: <strong className="text-indigo-300">{shmCalculations.period.toFixed(3)} s</strong></span>
                      <span>Frequency: <strong className="text-indigo-300">{shmCalculations.frequency.toFixed(2)} Hz</strong></span>
                      <motion.button
                        aria-label={isShmRunning ? "Pause oscillation animation" : "Resume oscillation animation"}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsShmRunning(r => !r)}
                        className="px-3 py-1 bg-indigo-600 rounded-lg font-bold text-white text-xs"
                      >
                        {isShmRunning ? 'Pause' : 'Resume'}
                      </motion.button>
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-center bg-slate-900 p-3 rounded-xl border border-slate-800">
                    <canvas ref={shmCanvasRef} width={300} height={180} className="w-full rounded-lg" aria-label="Spring mass Simple Harmonic Motion oscillator canvas" />
                    <span className="text-[11px] text-slate-400 mt-2 text-center">
                      Restoring force F = -ky continuously exchanges KE and PE: E = 1/2 m ω² A²
                    </span>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Prev/Next */}
          <div className="flex justify-between items-center pt-2">
            <motion.button
              aria-label="Previous lab step"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePrevSlide}
              disabled={currentSlide === 0}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-sm font-semibold disabled:opacity-40"
            >
              ← Previous Lab
            </motion.button>

            <span className="text-xs text-slate-400">
              Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                aria-label="Next lab step"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNextSlide}
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-600/30"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                aria-label="Enter free sandbox mode"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-emerald-600/30"
              >
                Enter Free Sandbox Mode →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 3. SANDBOX PHASE ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-xl font-black text-white">🧪 Free Multi-Parameter Sandbox</h2>
              <p className="text-slate-400 text-xs mt-0.5">
                Freely experiment with all variables simultaneously without grading. Observe physical couplings.
              </p>
            </div>
            <motion.button
              aria-label="Proceed to challenges"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl shadow-xl shadow-emerald-600/30"
            >
              Ready for Challenges! →
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Thermo Controls */}
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block">1. Adiabatic & Carnot</span>
              <div>
                <label htmlFor="sandbox-compression-slider" className="text-[11px] text-slate-400 flex justify-between">
                  <span>Compression Ratio:</span>
                  <span className="text-white font-bold">{compressionRatio.toFixed(1)}x</span>
                </label>
                <input
                  id="sandbox-compression-slider"
                  aria-label="Sandbox compression ratio slider"
                  type="range"
                  min={1}
                  max={5}
                  step={0.1}
                  value={compressionRatio}
                  onChange={(e) => setCompressionRatio(parseFloat(e.target.value))}
                  className="w-full accent-indigo-500"
                />
              </div>
              <div className="p-2.5 bg-slate-950 rounded-xl text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">Work By Gas:</span>
                  <span className="font-mono text-rose-400">{adiabaticCalculations.workDoneByGas.toFixed(0)} J</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Internal Energy ΔU:</span>
                  <span className="font-mono text-emerald-400">+{adiabaticCalculations.deltaU.toFixed(0)} J</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Carnot η:</span>
                  <span className="font-mono text-amber-400">{(adiabaticCalculations.carnotEff * 100).toFixed(1)}%</span>
                </div>
              </div>
            </div>

            {/* Kinetic Controls */}
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">2. Kinetic Theory</span>
              <div>
                <label htmlFor="sandbox-temp-slider" className="text-[11px] text-slate-400 flex justify-between">
                  <span>Gas Temperature T:</span>
                  <span className="text-white font-bold">{tempKelvin} K</span>
                </label>
                <input
                  id="sandbox-temp-slider"
                  aria-label="Sandbox gas temperature slider"
                  type="range"
                  min={100}
                  max={800}
                  step={10}
                  value={tempKelvin}
                  onChange={(e) => setTempKelvin(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>
              <div className="p-2.5 bg-slate-950 rounded-xl text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">RMS Velocity c_rms:</span>
                  <span className="font-mono text-indigo-300">{kineticCalculations.c_rms.toFixed(0)} m/s</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Kinetic Pressure:</span>
                  <span className="font-mono text-cyan-300">{(kineticCalculations.pressure / 1000).toFixed(1)} kPa</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Mean Free Path λ:</span>
                  <span className="font-mono text-rose-300">{(kineticCalculations.meanFreePath * 1e9).toFixed(1)} nm</span>
                </div>
              </div>
            </div>

            {/* SHM Controls */}
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">3. Harmonic Oscillator</span>
              <div>
                <label htmlFor="sandbox-amp-slider" className="text-[11px] text-slate-400 flex justify-between">
                  <span>Amplitude A:</span>
                  <span className="text-white font-bold">{shmAmplitude.toFixed(2)} m</span>
                </label>
                <input
                  id="sandbox-amp-slider"
                  aria-label="Sandbox harmonic amplitude slider"
                  type="range"
                  min={0.05}
                  max={0.30}
                  step={0.01}
                  value={shmAmplitude}
                  onChange={(e) => setShmAmplitude(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>
              <div className="p-2.5 bg-slate-950 rounded-xl text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Mechanical E:</span>
                  <span className="font-mono text-white">{shmCalculations.totalEnergy.toFixed(3)} J</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Max Speed v_max:</span>
                  <span className="font-mono text-emerald-400">{shmCalculations.vMax.toFixed(2)} m/s</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Frequency f:</span>
                  <span className="font-mono text-indigo-300">{shmCalculations.frequency.toFixed(2)} Hz</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── 4. CHALLENGE PHASE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Header Bar with Adaptive Badge and Progress */}
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white">
                  Challenge {currentChallenge + 1} of {filteredChallenges.length}
                </h2>
                <motion.span
                  key={difficulty}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className={`text-xs px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                    difficulty === 'foundation'
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                      : difficulty === 'standard'
                      ? 'bg-indigo-950 text-indigo-400 border border-indigo-800'
                      : 'bg-rose-950 text-rose-400 border border-rose-800'
                  }`}
                >
                  {difficulty}
                </motion.span>
                <span className="text-xs px-2 py-0.5 bg-slate-800 text-slate-300 rounded-md capitalize">
                  {challenge.competencyLevel}
                </span>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                Node: {challenge.nodeId}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden" role="progressbar" aria-valuenow={currentChallenge + 1} aria-valuemin={1} aria-valuemax={filteredChallenges.length}>
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Display Card with Shake on Wrong */}
          <motion.div
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
            transition={wrongShake ? { duration: 0.4 } : {}}
            className={`p-6 rounded-2xl border transition-colors ${
              wrongFlash
                ? 'bg-rose-950/80 border-rose-500'
                : 'bg-slate-900 border-slate-800'
            }`}
          >
            <p className="text-base md:text-lg font-medium text-white mb-6 leading-relaxed">
              {challenge.question}
            </p>

            {/* A. MCQ Variants (Classify / Distinguish / Match) */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="space-y-3">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    className={`w-full text-left p-4 rounded-xl border text-sm transition-all flex items-start ${
                      showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-semibold'
                        : 'bg-slate-800/80 hover:bg-slate-750 border-slate-700 text-slate-200 hover:border-indigo-500'
                    }`}
                  >
                    <span className="font-bold text-indigo-400 mr-2 flex-shrink-0">
                      {showExplanation && i === challenge.correctIndex && '✓ '}
                      {String.fromCharCode(65 + i)}.
                    </span>
                    <span>{opt}</span>
                  </motion.button>
                ))}
              </div>
            )}

            {/* B. Drag-Label Variant */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      role="button"
                      tabIndex={0}
                      aria-label={`Draggable label: ${item.label}`}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3.5 py-2 bg-indigo-700 text-white rounded-lg text-xs font-bold cursor-grab active:cursor-grabbing shadow-md"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                {/* SVG Target Grid for Carnot Diagram */}
                <svg viewBox="0 0 400 220" className="w-full bg-slate-950 rounded-xl border border-slate-800" role="img" aria-label="Drop target areas for Carnot cycle quadrants">
                  <polygon
                    points="100,50 180,80 300,160 160,140"
                    fill="#312e81"
                    fillOpacity="0.3"
                    stroke="#4338ca"
                    strokeWidth="2"
                  />
                  {/* Top Target */}
                  <rect x="100" y="20" width="160" height="30" rx="6" fill="#1e293b" stroke="#475569" onDragOver={(e) => e.preventDefault()} onDrop={() => handleDragDrop('carnot_top')} />
                  <text x="180" y="38" textAnchor="middle" fill="#94a3b8" fontSize="10">{droppedLabels.carnot_top ? `✓ ${droppedLabels.carnot_top}` : 'Drop Top Stage Here'}</text>

                  {/* Right Target */}
                  <rect x="230" y="100" width="160" height="30" rx="6" fill="#1e293b" stroke="#475569" onDragOver={(e) => e.preventDefault()} onDrop={() => handleDragDrop('carnot_right')} />
                  <text x="310" y="118" textAnchor="middle" fill="#94a3b8" fontSize="10">{droppedLabels.carnot_right ? `✓ ${droppedLabels.carnot_right}` : 'Drop Right Stage Here'}</text>

                  {/* Bottom Target */}
                  <rect x="180" y="170" width="160" height="30" rx="6" fill="#1e293b" stroke="#475569" onDragOver={(e) => e.preventDefault()} onDrop={() => handleDragDrop('carnot_bottom')} />
                  <text x="260" y="188" textAnchor="middle" fill="#94a3b8" fontSize="10">{droppedLabels.carnot_bottom ? `✓ ${droppedLabels.carnot_bottom}` : 'Drop Bottom Stage Here'}</text>

                  {/* Left Target */}
                  <rect x="20" y="100" width="160" height="30" rx="6" fill="#1e293b" stroke="#475569" onDragOver={(e) => e.preventDefault()} onDrop={() => handleDragDrop('carnot_left')} />
                  <text x="100" y="118" textAnchor="middle" fill="#94a3b8" fontSize="10">{droppedLabels.carnot_left ? `✓ ${droppedLabels.carnot_left}` : 'Drop Left Stage Here'}</text>
                </svg>

                <motion.button
                  aria-label="Check diagram label placements"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-6 py-2 bg-indigo-600 text-white font-bold text-sm rounded-xl"
                >
                  Check Diagram Placements
                </motion.button>
              </div>
            )}

            {/* C. Drag-Sort Variant */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <span className="text-xs text-slate-400 block mb-1">
                  Drag and drop items to arrange in correct chronological/logical sequence:
                </span>
                {(sortArrangement.length === challenge.sortItems.length
                  ? sortArrangement.map((idx) => challenge.sortItems![idx])
                  : challenge.sortItems
                ).map((item, displayIdx) => (
                  <motion.div
                    key={displayIdx}
                    role="button"
                    tabIndex={0}
                    aria-label={`Step ${displayIdx + 1}: ${item}`}
                    draggable
                    onDragStart={() => setDraggedItem(String(displayIdx))}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => {
                      const from = parseInt(draggedItem || '0');
                      handleSortMove(from, displayIdx);
                    }}
                    whileHover={{ scale: 1.01 }}
                    className="p-3.5 bg-slate-800 rounded-xl border border-slate-700 text-sm text-slate-200 cursor-grab flex items-center gap-3"
                  >
                    <span className="w-6 h-6 rounded-lg bg-indigo-900/60 text-indigo-300 font-bold flex items-center justify-center text-xs">
                      {displayIdx + 1}
                    </span>
                    <span>{item}</span>
                  </motion.div>
                ))}

                <motion.button
                  aria-label="Verify step sequence order"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="mt-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm rounded-xl shadow-md"
                >
                  Verify Sequence Order
                </motion.button>
              </div>
            )}

            {/* D. Numeric Input Variant */}
            {challenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <input
                    aria-label={`Enter numerical value in ${challenge.unit || 'units'}`}
                    type="number"
                    step="any"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter value"
                    className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-base focus:border-indigo-500 focus:outline-none w-48"
                  />
                  <span className="text-sm font-bold text-indigo-300">{challenge.unit}</span>
                  <motion.button
                    aria-label="Submit numeric answer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm rounded-xl shadow-md disabled:opacity-50"
                  >
                    Submit Answer
                  </motion.button>
                </div>
              </div>
            )}

            {/* E. Construct Variant */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <span className="text-xs text-slate-400 block">{challenge.validationHint}</span>
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  {challenge.availableParts.map((p, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Add formula element ${p}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts(prev => [...prev, p])}
                      className="px-3 py-1.5 bg-indigo-900/80 hover:bg-indigo-800 text-indigo-200 rounded-lg text-xs font-mono font-bold"
                    >
                      + {p}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-700 min-h-[60px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, i) => (
                    <span key={i} className="px-2.5 py-1 bg-indigo-600 text-white rounded-md text-xs font-mono flex items-center gap-1">
                      {part}
                      <button
                        aria-label={`Remove ${part}`}
                        onClick={() => setConstructParts(prev => prev.filter((_, idx) => idx !== i))}
                        className="text-indigo-200 hover:text-white ml-1 font-bold"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-500 italic">Click formula components above to assemble...</span>
                  )}
                </div>

                <div className="flex gap-2">
                  <motion.button
                    aria-label="Verify assembled formula"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(constructParts.join(' '))}
                    disabled={constructParts.length === 0 || showExplanation}
                    className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm rounded-xl disabled:opacity-50"
                  >
                    Verify Equation
                  </motion.button>
                  <button
                    aria-label="Clear assembled equation"
                    onClick={() => setConstructParts([])}
                    className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs"
                  >
                    Clear
                  </button>
                </div>
              </div>
            )}

            {/* Step-by-Step Progressive Disclosure Explanation */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-amber-950/40 border border-amber-800/60 rounded-2xl space-y-3"
              >
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block">
                  📖 Comprehensive Scientific Walkthrough
                </span>
                {challenge.explanation
                  .split('. ')
                  .filter(s => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((step, idx) => (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs md:text-sm text-amber-100/90 leading-relaxed"
                    >
                      <strong className="text-amber-400 font-mono mr-1.5">{idx + 1}.</strong>
                      {step}{!step.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                <div className="pt-2 flex items-center justify-between">
                  {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      aria-label="Reveal next step of explanation"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-4 py-1.5 bg-amber-800 text-white rounded-lg text-xs font-bold"
                    >
                      Reveal Next Step →
                    </motion.button>
                  ) : (
                    <div />
                  )}

                  {revealedSteps >= challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                    <motion.button
                      aria-label="Proceed to next challenge or complete"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-600/30"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Simulation →' : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── 5. COMPLETION PHASE ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-8 bg-gradient-to-br from-indigo-950/80 via-slate-900 to-slate-950 rounded-3xl border border-indigo-700/60 text-center space-y-4 shadow-2xl">
            <span className="text-5xl" aria-hidden="true">🏆</span>
            <h2 className="text-3xl font-black text-white">Simulation Mastery Complete!</h2>
            <div className="flex justify-center gap-6 text-center pt-2">
              <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 min-w-[120px]">
                <span className="text-xs text-slate-400 uppercase">Final Score</span>
                <p className="text-3xl font-black text-emerald-400 font-mono mt-1">
                  {Math.max(0, 100 - errors * 5)}%
                </p>
              </div>
              <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 min-w-[120px]">
                <span className="text-xs text-slate-400 uppercase">Mastery Tier</span>
                <p className="text-3xl font-black text-indigo-400 capitalize mt-1">
                  {masteryLevel}
                </p>
              </div>
            </div>

            {/* Motivational Review */}
            <p className="text-sm text-slate-300 max-w-xl mx-auto pt-2">
              {errors === 0
                ? 'Flawless performance! You have mastered the entire breadth of ISC thermodynamics, kinetic theory, and harmonic motion.'
                : errors <= 3
                ? 'Exceptional work! You possess high analytical precision in thermodynamic cycles and oscillatory mechanics.'
                : 'Good effort! Review your misconception profile below to polish critical derivation nuances.'}
            </p>
          </div>

          {/* ─── SPACED REPETITION (SRS) VISIBILITY CARD ─── */}
          <div className="p-6 bg-gradient-to-r from-indigo-950/90 to-purple-950/90 rounded-2xl border border-indigo-600/60 shadow-lg space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl" aria-hidden="true">🧠</span>
                <div>
                  <h3 className="text-sm font-bold text-indigo-200 uppercase tracking-wider">
                    Spaced Repetition Schedule (SM-2 Algorithm)
                  </h3>
                  <p className="text-xs text-slate-400">
                    Optimized review intervals ensure permanent memory consolidation before forgetting curves drop.
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 bg-indigo-600/80 text-white font-mono font-bold text-xs rounded-lg border border-indigo-400/40">
                {errors === 0 ? 'Optimal Memory Strength' : errors <= 3 ? 'Good Retention' : 'Review Needed Soon'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
              <div className={`p-3.5 rounded-xl border text-center ${errors === 0 ? 'bg-emerald-950/60 border-emerald-500' : 'bg-slate-900/60 border-slate-800 opacity-60'}`}>
                <span className="text-[11px] text-slate-400 block">0 Errors (Mastered)</span>
                <strong className="text-base font-black text-emerald-400">review in 7 days</strong>
              </div>
              <div className={`p-3.5 rounded-xl border text-center ${errors >= 1 && errors <= 3 ? 'bg-amber-950/60 border-amber-500' : 'bg-slate-900/60 border-slate-800 opacity-60'}`}>
                <span className="text-[11px] text-slate-400 block">1–3 Errors (Developing)</span>
                <strong className="text-base font-black text-amber-400">review in 3 days</strong>
              </div>
              <div className={`p-3.5 rounded-xl border text-center ${errors >= 4 ? 'bg-rose-950/60 border-rose-500' : 'bg-slate-900/60 border-slate-800 opacity-60'}`}>
                <span className="text-[11px] text-slate-400 block">4+ Errors (Reinforce)</span>
                <strong className="text-base font-black text-rose-400">review in 1 day</strong>
              </div>
            </div>

            <div className="p-3 bg-slate-950/80 rounded-xl border border-indigo-900/40 text-xs text-indigo-300 flex justify-between items-center">
              <span>
                📅 Your personalized next review interval: <strong className="text-white underline">{errors === 0 ? 'review in 7 days' : errors <= 3 ? 'review in 3 days' : 'review in 1 day'}</strong>.
              </span>
              <span className="text-[11px] text-slate-400">Target Nodes: {ALL_NODE_IDS.length}</span>
            </div>
          </div>

          {/* ─── REFLECTION SECTION ─── */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xl" aria-hidden="true">💭</span>
              <h3 className="text-base font-bold text-indigo-300">Self-Reflection & Conceptual Consolidation</h3>
            </div>
            <p className="text-xs text-slate-400">
              Take a moment to solidify what you have explored and connected across thermodynamics and oscillation mechanics.
            </p>
            <div className="space-y-4 pt-1">
              <div className="space-y-1.5">
                <label htmlFor="refl-surprising" className="text-xs font-semibold text-slate-300 block">
                  1. What was the most surprising thing you learned?
                </label>
                <textarea
                  id="refl-surprising"
                  aria-label="What was the most surprising thing you learned?"
                  rows={2}
                  value={reflections.surprising}
                  onChange={(e) => setReflections(r => ({ ...r, surprising: e.target.value }))}
                  placeholder="e.g., How adiabatic compression heats a gas purely through mechanical work without any heat added..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-750 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-indigo-500 placeholder:text-slate-600"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="refl-explain" className="text-xs font-semibold text-slate-300 block">
                  2. How would you explain this to a friend?
                </label>
                <textarea
                  id="refl-explain"
                  aria-label="How would you explain this to a friend?"
                  rows={2}
                  value={reflections.explain}
                  onChange={(e) => setReflections(r => ({ ...r, explain: e.target.value }))}
                  placeholder="e.g., Simple harmonic motion is like an energetic pendulum trading maximum speed for maximum stretch..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-750 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-indigo-500 placeholder:text-slate-600"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="refl-reallife" className="text-xs font-semibold text-slate-300 block">
                  3. Where in real life might you use this?
                </label>
                <textarea
                  id="refl-reallife"
                  aria-label="Where in real life might you use this?"
                  rows={2}
                  value={reflections.realLife}
                  onChange={(e) => setReflections(r => ({ ...r, realLife: e.target.value }))}
                  placeholder="e.g., In designing vehicle shock absorbers, refrigeration heat pumps, and cryogenic rocket pressurization..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-750 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-indigo-500 placeholder:text-slate-600"
                />
              </div>
            </div>
          </div>

          {/* Misconception Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-6 bg-rose-950/40 rounded-2xl border border-rose-800/60 space-y-3">
              <h3 className="text-base font-bold text-rose-300">🎯 Your Targeted Concept Rectifications:</h3>
              <div className="space-y-2">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-950 rounded-xl border border-rose-900/50 text-xs">
                      <p className="text-rose-300 font-bold">✗ Misconception: {m.misconception}</p>
                      <p className="text-emerald-300 mt-1">✓ Scientific Truth: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Real-World Challenge Brief */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-base font-bold text-indigo-300">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs md:text-sm text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-400">
                  <strong className="text-amber-400 mr-2">{i + 1}.</strong> {step}
                </div>
              ))}
            </div>
          </div>

          {/* Replay Lab Action */}
          <div className="flex justify-center pt-2">
            <motion.button
              aria-label="Replay simulation lab"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setPhase('explore');
                setCurrentSlide(0);
                setErrors(0);
                setCurrentChallenge(0);
                audioManager.play('whoosh');
              }}
              className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-sm shadow-xl shadow-indigo-600/30"
            >
              Replay Simulation Lab 🔄
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* ─── TOAST NOTIFIERS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Stage Mastered!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C11_PhysicsWorkDoneAdiabaticSim;