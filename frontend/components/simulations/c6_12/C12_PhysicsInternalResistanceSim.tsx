'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── ISC CLASS 12 PHYSICS NODE CONSTANTS ───
const NODE_C12_PHY_031 = 'c12_phy_031'; // Emf and internal resistance
const NODE_C12_PHY_032 = 'c12_phy_032'; // Terminal voltage and lost volts
const NODE_C12_PHY_033 = 'c12_phy_033'; // Kirchhoff's laws
const NODE_C12_PHY_034 = 'c12_phy_034'; // Wheatstone bridge
const NODE_C12_PHY_035 = 'c12_phy_035'; // Metre bridge
const NODE_C12_PHY_036 = 'c12_phy_036'; // Potentiometer
const NODE_C12_PHY_037 = 'c12_phy_037'; // Magnetic field and Oersted's experiment
const NODE_C12_PHY_038 = 'c12_phy_038'; // Biot-Savart law
const NODE_C12_PHY_039 = 'c12_phy_039'; // Magnetic field due to circular loop
const NODE_C12_PHY_040 = 'c12_phy_040'; // Magnetic field due to solenoid

const ALL_NODE_IDS = [
  NODE_C12_PHY_031,
  NODE_C12_PHY_032,
  NODE_C12_PHY_033,
  NODE_C12_PHY_034,
  NODE_C12_PHY_035,
  NODE_C12_PHY_036,
  NODE_C12_PHY_037,
  NODE_C12_PHY_038,
  NODE_C12_PHY_039,
  NODE_C12_PHY_040,
];

// ─── BRILLIANT.ORG PREDICTION QUESTIONS (Predict-Then-Check Pattern) ───
export const PREDICTION_QUESTIONS = [
  {
    id: 'pred_001',
    question: 'Predict: If you decrease the external load resistor R down towards 0 Ω (short-circuit), what happens to the terminal voltage V across the cell terminals?',
    options: [
      'Terminal voltage increases to double the cell emf (2ε)',
      'Terminal voltage drops to near 0 V because all emf is dropped internally as lost volts (Ir)',
      'Terminal voltage stays exactly equal to open-circuit emf ε',
      'The internal resistance drops spontaneously to 0 Ω',
    ],
    correctIndex: 1,
    explanation: 'As R → 0, circuit current reaches maximum I_sc = ε/r. The internal voltage drop (lost volts) becomes Ir = (ε/r)·r = ε. Therefore, the terminal voltage V = ε - Ir drops to 0 V.',
    verifyInstruction: 'In Lab 1, drag the External Load Resistor (R) slider to its lowest value (0.1 Ω) and watch the Terminal Voltage meter collapse while Lost Volts Ir surges.',
  },
  {
    id: 'pred_002',
    question: 'Predict: In a balanced Wheatstone bridge (P/Q = R/S, galvanometer current = 0), what will happen if you double the battery voltage from 4 V to 8 V?',
    options: [
      'The galvanometer will deflect strongly to the right',
      'The galvanometer remains at exact zero null deflection because the bridge balance ratio is voltage-independent',
      'The null balance point shifts to the far right end of the wire',
      'The galvanometer will reverse its polarity and oscillate',
    ],
    correctIndex: 1,
    explanation: 'The balance condition P/Q = R/S depends strictly on branch resistance ratios. When balanced, the potential difference across the galvanometer is identically zero regardless of driver battery voltage.',
    verifyInstruction: 'In Lab 3, ensure the jockey is at the exact null point (galvanometer = 0.0 μA). The ratio balance holds steady regardless of external power fluctuations.',
  },
];

// ─── BRILLIANT.ORG OBSERVATION QUESTIONS ('What Do You Notice?' Pattern) ───
export const OBSERVATION_QUESTIONS = [
  {
    id: 'obs_001',
    question: 'Observe the power output and voltages in Lab 1. When the load resistance R is set exactly equal to the cell internal resistance r (R = r), what do you notice?',
    options: [
      'Terminal voltage V is exactly half of the emf (V = ε / 2) and power delivered to the load is maximised',
      'Lost volts Ir becomes zero and efficiency reaches 100%',
      'The current stops flowing completely',
      'The cell delivers infinite current without heating up',
    ],
    observableOptions: [
      'Terminal voltage V is exactly half of the emf (V = ε / 2) and power delivered to the load is maximised',
      'Lost volts Ir becomes zero and efficiency reaches 100%',
      'The current stops flowing completely',
      'The cell delivers infinite current without heating up',
    ],
    correctIndex: 0,
    explanation: 'By the Maximum Power Transfer Theorem, when R = r, the circuit current is I = ε/(2r). The terminal voltage is V = I·R = ε/2, exactly half the cell emf, producing maximum power P_max = ε²/(4r).',
  },
  {
    id: 'obs_002',
    question: 'Observe the magnetic field visualization in Lab 5. What do you notice about the magnetic field lines inside the core of the solenoid compared to the region outside?',
    options: [
      'Inside the core, field lines are dense, straight, and uniform (B = μ₀nI), whereas outside they spread widely and become very weak',
      'The field lines inside form chaotic turbulence while outside they are completely straight',
      'The magnetic field is completely zero inside the core and strongest far outside',
      'The field lines point radially outward from the central axis in all directions',
    ],
    observableOptions: [
      'Inside the core, field lines are dense, straight, and uniform (B = μ₀nI), whereas outside they spread widely and become very weak',
      'The field lines inside form chaotic turbulence while outside they are completely straight',
      'The magnetic field is completely zero inside the core and strongest far outside',
      'The field lines point radially outward from the central axis in all directions',
    ],
    correctIndex: 0,
    explanation: 'Inside an ideal tightly wound solenoid, the field lines are parallel, equally spaced, and highly concentrated, producing a uniform axial magnetic field B = μ₀nI with near-zero external field.',
  },
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Electric Super-Lab Emergency',
  intro: 'You are the chief test engineer at the Bengaluru High-Energy Physics & Electrodynamics Research Facility. A critical telemetry sensor station in the laboratory is malfunctioning due to voltage sag, bridge imbalances, and unshielded magnetic fields from high-current coils.',
  context: 'Your task: Diagnose cell internal resistance, balance precision Wheatstone & Metre bridges, calibrate potentiometers with zero-current null methods, and master the magnetic fields generated by loops and solenoids before system overload.',
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question: 'When a car engine starts, why do the headlights dim noticeably for a brief moment?',
  options: [
    'The car battery suddenly runs out of electric charge entirely',
    'The starter motor draws huge current, creating a massive internal voltage drop (lost volts Ir) inside the battery',
    'The resistance of the headlights increases spontaneously when current starts',
    'Electric current takes several seconds to reach the front headlights through copper wires',
  ],
  correctIndex: 1,
  hintAfter: 'Think about what happens inside the chemical battery itself when huge current rushes out!',
};

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

// ─── CHALLENGES ARRAY (21 Comprehensive Challenges) ───
const CHALLENGES: Challenge[] = [
  // FOUNDATION TIER (1-7)
  {
    id: 'ch_phy_001',
    nodeId: NODE_C12_PHY_031,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the exact physical definition of the Electromotive Force (emf, ε) of an electric cell?',
    options: [
      'The net mechanical force pushing electrons through external copper wires',
      'The work done per unit charge by non-electrostatic forces inside the source to carry charge from negative to positive terminal',
      'The potential difference measured across terminals when maximum possible current is being drawn',
      'The rate of power loss in the internal electrolyte per second',
    ],
    correctIndex: 1,
    explanation: 'Emf ε = dW/dq is the work done per unit charge by the source internally from low to high potential. It is measured in Volts (J/C).',
    hints: [
      'Emf represents the energy rating per unit charge provided by the chemical pump.',
      'Recall ε = dW/dq inside the cell itself.',
      'It is the work done per unit charge moving from negative to positive terminal inside the cell.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_phy_002',
    nodeId: NODE_C12_PHY_032,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'A dry cell has an emf of 1.5 V and an internal resistance of 0.5 Ω. It is connected to a 4.5 Ω load resistor. Calculate the terminal voltage V across the load in Volts.',
    correctAnswer: 1.35,
    tolerance: 0.02,
    unit: 'V',
    explanation: 'Total R_tot = 4.5 + 0.5 = 5.0 Ω. Current I = 1.5 / 5.0 = 0.3 A. Terminal voltage V = ε - I*r = 1.5 - (0.3 * 0.5) = 1.35 V (or V = I*R = 0.3 * 4.5 = 1.35 V).',
    hints: [
      'Find the total circuit resistance R_tot = R + r first.',
      'Calculate current I = ε / (R + r).',
      'Terminal voltage is V = ε - Ir or V = I*R.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_phy_003',
    nodeId: NODE_C12_PHY_033,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: "Kirchhoff's Current Law (KCL at a junction) and Voltage Law (KVL around a closed loop) are direct mathematical consequences of which fundamental conservation principles?",
    options: [
      'KCL: Conservation of Energy; KVL: Conservation of Charge',
      'KCL: Conservation of Charge; KVL: Conservation of Energy',
      'KCL: Conservation of Momentum; KVL: Conservation of Charge',
      'KCL: Conservation of Magnetic Flux; KVL: Conservation of Current',
    ],
    correctIndex: 1,
    explanation: 'KCL represents conservation of electric charge (charge cannot accumulate at a geometric junction node: ΣI = 0). KVL represents conservation of energy (electrostatic potential is conservative: around any closed loop ΣΔV = 0).',
    hints: [
      'At a junction, what enters per second must leave per second (think of charges).',
      'Around a closed loop, hiking back to the starting elevation gives zero net potential change.',
      'KCL = Charge conservation; KVL = Energy conservation.',
    ],
  },
  {
    id: 'ch_phy_004',
    nodeId: NODE_C12_PHY_034,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Label the 4 bridge arms (P, Q, R, S) and the Galvanometer (G) on the standard diamond Wheatstone bridge diagram.',
    dragItems: [
      { label: 'P (Top-Left)', targetId: 'arm_p' },
      { label: 'Q (Bottom-Left)', targetId: 'arm_q' },
      { label: 'R (Top-Right)', targetId: 'arm_r' },
      { label: 'S (Bottom-Right)', targetId: 'arm_s' },
      { label: 'Galvanometer G', targetId: 'arm_g' },
    ],
    correctMapping: {
      arm_p: 'P (Top-Left)',
      arm_q: 'Q (Bottom-Left)',
      arm_r: 'R (Top-Right)',
      arm_s: 'S (Bottom-Right)',
      arm_g: 'Galvanometer G',
    },
    explanation: 'In the Wheatstone quadrilateral ABCD, arms P and Q form the left branch, R and S form the right branch, and Galvanometer G bridges diagonal BD.',
    hints: [
      'P and Q are on the left; R and S are on the right.',
      'Galvanometer G connects across the central diagonal between nodes B and D.',
      'Check that opposite products at balance satisfy P*S = Q*R.',
    ],
  },
  {
    id: 'ch_phy_005',
    nodeId: NODE_C12_PHY_037,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: "In Oersted's classic 1820 experiment, what key observation established the magnetic effect of electric current?",
    options: [
      'A copper wire became permanently magnetised like a piece of steel',
      'A magnetic compass needle placed near a current-carrying wire deflected and aligned perpendicular to the wire',
      'Static electric sparks leapt across the air to attract iron filings',
      'The current in the wire stopped whenever a magnet was brought near it',
    ],
    correctIndex: 1,
    explanation: 'Oersted discovered that a magnetic compass needle deflected when current flowed through a nearby wire, proving electric currents generate surrounding magnetic fields.',
    hints: [
      'Think about what instrument detected the magnetic field around the wire.',
      'The deflection reversed when the battery polarity reversed.',
      'A compass needle deflected perpendicular to the current-carrying wire.',
    ],
  },
  {
    id: 'ch_phy_006',
    nodeId: NODE_C12_PHY_038,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'According to the Biot-Savart Law, the infinitesimal magnetic field dB generated by a current element I·dl at distance r is given in vector form by:',
    options: [
      'dB = (μ₀ / 4π) · (I dl · r̂) / r²',
      'dB = (μ₀ / 4π) · (I dl × r̂) / r²',
      'dB = (μ₀ / 4π) · (I dl + r̂) / r³',
      'dB = (4π / μ₀) · (I dl × r̂) / r',
    ],
    correctIndex: 1,
    explanation: 'In vector form, dB = (μ₀ / 4π) (I dl × r̂) / r². The cross product ensures dB is perpendicular to both dl and the position vector r̂, directed by the right-hand rule.',
    hints: [
      'Magnetic field is perpendicular to both the wire segment and the displacement vector.',
      'Recall which mathematical vector product yields a perpendicular vector and sine of the angle.',
      'Vector product is dl × r̂.',
    ],
  },
  {
    id: 'ch_phy_007',
    nodeId: NODE_C12_PHY_040,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Inside an ideal (very long) solenoid with n turns per metre carrying current I, the magnetic field B is:',
    options: [
      'B = μ₀ I / (2π r) and varies inversely with radial distance',
      'B = μ₀ n I and is completely uniform and parallel to the axis',
      'B = μ₀ n² I / (2 R) and depends strongly on coil radius R',
      'B = 0 everywhere inside the core',
    ],
    correctIndex: 1,
    explanation: "Inside an ideal long solenoid, B = μ₀ n I. The field is uniform, axial, and remarkably independent of the solenoid's radius or cross-sectional area.",
    hints: [
      "Recall Ampere's circuital law applied to a rectangular loop.",
      'The field inside a long solenoid does not depend on its radius R.',
      'B = μ₀ n I, where n = N / L.',
    ],
    misconceptionIndex: 4,
  },

  // STANDARD TIER (8-14)
  {
    id: 'ch_phy_008',
    nodeId: NODE_C12_PHY_032,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A battery of emf ε and internal resistance r is connected across an external variable load R. Under what condition is maximum power transferred to load R, and what is that max power?',
    options: [
      'When R = 0; P_max = ε² / r',
      'When R = r; P_max = ε² / (4r)',
      'When R = ∞; P_max = ε² / (2r)',
      'When R = 2r; P_max = ε² / (8r)',
    ],
    correctIndex: 1,
    explanation: 'By the Maximum Power Transfer Theorem, power delivered P = I²R = [ε/(R+r)]² R is maximised when dP/dR = 0, which occurs when load R = internal resistance r. Then P_max = ε²/(4r).',
    hints: [
      'Express Power P as a function of R: P(R) = ε² R / (R + r)².',
      'Differentiate P with respect to R and set equal to zero.',
      'Maximum power occurs at impedance matching: R = r, yielding P_max = ε² / (4r).',
    ],
  },
  {
    id: 'ch_phy_009',
    nodeId: NODE_C12_PHY_033,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: "Arrange the systematic steps for solving a multi-loop circuit network using Kirchhoff's Laws in correct procedural order:",
    sortItems: [
      'Draw the complete circuit diagram and assign arbitrary direction arrows to currents in each branch',
      'Apply Kirchhoff\'s Current Law (ΣI = 0) at (n - 1) junctions to reduce unknown variables',
      'Choose independent closed loops and indicate traversal directions (clockwise or counter-clockwise)',
      'Apply Kirchhoff\'s Voltage Law (ΣΔV = 0) tracking sign conventions (-IR with current, +ε negative to positive)',
      'Solve the resulting simultaneous linear equations for unknown branch currents',
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'Standard nodal/mesh algorithm: 1. Label branch currents -> 2. KCL at junctions -> 3. Select loop directions -> 4. Formulate KVL equations with rigorous signs -> 5. Solve linear algebraic system.',
    hints: [
      'You cannot write loop equations before marking current directions.',
      'KCL at junctions should be written first to minimize unknowns.',
      'KVL loop traversal and linear solving are the final systematic phases.',
    ],
  },
  {
    id: 'ch_phy_010',
    nodeId: NODE_C12_PHY_034,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In a balanced Wheatstone bridge quadrilateral ABCD, P = 10 Ω, Q = 25 Ω, and R = 18 Ω. Calculate the value of the unknown resistance S in Ohms.',
    correctAnswer: 45,
    tolerance: 0.1,
    unit: 'Ω',
    explanation: 'Balance condition: P / Q = R / S => S = (Q * R) / P = (25 * 18) / 10 = 450 / 10 = 45 Ω.',
    hints: [
      'Apply the Wheatstone bridge balance formula: P / Q = R / S.',
      'Rearrange for S: S = Q * R / P.',
      'Substitute: 25 * 18 / 10 = 45 Ω.',
    ],
  },
  {
    id: 'ch_phy_011',
    nodeId: NODE_C12_PHY_035,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In a Metre Bridge experiment, a known standard resistor R = 15 Ω in the left gap balances an unknown wire X in the right gap at a balancing length l₁ = 60 cm from the left end. What is the value of X in Ohms?',
    correctAnswer: 10,
    tolerance: 0.1,
    unit: 'Ω',
    explanation: 'For a uniform 100 cm wire: R / X = l₁ / (100 - l₁) => 15 / X = 60 / 40 => X = 15 * (40 / 60) = 10.0 Ω.',
    hints: [
      'The length of the right segment is l₂ = 100 - 60 = 40 cm.',
      'Use the ratio R / X = l₁ / l₂.',
      'X = R * (l₂ / l₁) = 15 * (40 / 60) = 10 Ω.',
    ],
  },
  {
    id: 'ch_phy_012',
    nodeId: NODE_C12_PHY_036,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: "In a potentiometer experiment, a cell produces a balancing length l₁ = 150 cm on open circuit. When shunted by a resistance box R = 10 Ω, the balancing length drops to l₂ = 120 cm. Calculate the cell's internal resistance r in Ohms.",
    correctAnswer: 2.5,
    tolerance: 0.05,
    unit: 'Ω',
    explanation: 'Formula for internal resistance using potentiometer: r = R * [(l₁ - l₂) / l₂] = 10 * [(150 - 120) / 120] = 10 * (30 / 120) = 2.5 Ω.',
    hints: [
      'On open circuit ε = K·l₁; under shunt V = K·l₂.',
      'Recall r = R·(ε/V - 1) = R·(l₁/l₂ - 1).',
      'r = 10 * (150 - 120) / 120 = 2.5 Ω.',
    ],
  },
  {
    id: 'ch_phy_013',
    nodeId: NODE_C12_PHY_039,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A circular coil of N = 50 turns and radius R = 0.1 m carries a steady current I = 2 A. Calculate the magnetic field B at the exact centre of the coil in milliTesla (mT). (Use π = 3.14159, μ₀ = 4π × 10⁻⁷ T·m/A)',
    correctAnswer: 0.628,
    tolerance: 0.02,
    unit: 'mT',
    explanation: 'B = μ₀ N I / (2 R) = (4π × 10⁻⁷ * 50 * 2) / (2 * 0.1) = (4π × 10⁻⁷ * 100) / 0.2 = 2000π × 10⁻⁷ T = 6.283 × 10⁻⁴ T = 0.628 mT.',
    hints: [
      'Use the formula for field at the centre of a circular coil: B = μ₀ N I / (2 R).',
      'Substitute N = 50, I = 2 A, R = 0.1 m.',
      'Multiply by 1000 to convert Tesla into milliTesla (mT).',
    ],
  },
  {
    id: 'ch_phy_014',
    nodeId: NODE_C12_PHY_040,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'An Indian industrial research solenoid is 0.5 m long, has a total of 1500 turns, and carries a current of 4.0 A. What is the magnetic field B generated at the centre of the solenoid in milliTesla (mT)?',
    correctAnswer: 15.08,
    tolerance: 0.3,
    unit: 'mT',
    explanation: 'Turns per unit length n = N / L = 1500 / 0.5 = 3000 turns/m. B = μ₀ n I = (4π × 10⁻⁷) * 3000 * 4 = 48π × 10⁻⁴ T = 0.01508 T = 15.08 mT.',
    hints: [
      'First calculate turns per unit length: n = N / L = 1500 / 0.5 = 3000 m⁻¹.',
      'Apply B = μ₀ n I.',
      'B = (4π × 10⁻⁷) * 3000 * 4.0 = 15.08 mT.',
    ],
  },

  // ADVANCED TIER (15-21)
  {
    id: 'ch_phy_015',
    nodeId: NODE_C12_PHY_031,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Construct the algebraic equation for the current I delivered to external load R by m parallel rows of identical cells, where each row contains n identical cells in series (each cell emf ε, internal resistance r):',
    availableParts: ['m·n·ε', '/', '(', 'm·R', '+', 'n·r', ')', 'n·ε', 'm·r'],
    targetState: 'm·n·ε / ( m·R + n·r )',
    validationHint: 'Equivalent emf is n·ε, equivalent internal resistance is (n·r)/m, so I = n·ε / (R + n·r/m) = m·n·ε / (m·R + n·r).',
    explanation: 'In mixed grouping of cells: equivalent emf = n·ε, equivalent internal resistance = (n·r)/m. Current I = n·ε / [R + (n·r)/m] = (m·n·ε) / (m·R + n·r). Maximum current occurs when external resistance R = (n·r)/m.',
    hints: [
      'Numerator must be the total boosted emf factor scaled: m·n·ε.',
      'Denominator represents the combined resistance term: ( m·R + n·r ).',
      'Target sequence: m·n·ε / ( m·R + n·r ).',
    ],
  },
  {
    id: 'ch_phy_016',
    nodeId: NODE_C12_PHY_036,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why is a Potentiometer strictly considered superior to an ultra-high resistance digital voltmeter for measuring the true Electromotive Force (emf) of a cell?',
    options: [
      'The potentiometer wire is made of gold alloy which has zero thermal noise',
      'At null balance condition, the potentiometer draws zero current from the test cell, preventing any lost volts (Ir = 0), whereas every voltmeter must draw some current to operate',
      'A potentiometer amplifies the voltage using internal vacuum tubes',
      'The potentiometer works on alternating current whereas voltmeters only work on direct current',
    ],
    correctIndex: 1,
    explanation: 'The null method draws zero current (I = 0) from the cell at balance. Therefore, terminal voltage V = ε - Ir = ε. A voltmeter requires finite current to cause deflection or ADC sampling, thereby measuring V < ε.',
    hints: [
      'Consider the lost volts term Ir when current flows through the internal resistance.',
      'What is the current drawn by the test cell at the exact null point?',
      'Zero current means zero internal drop: V_measured = ε.',
    ],
  },
  {
    id: 'ch_phy_017',
    nodeId: NODE_C12_PHY_038,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: "Compare Biot-Savart Law with Coulomb's Law. Which of the following is a fundamental distinction between the two inverse-square laws?",
    options: [
      "Coulomb's law depends on 1/r² whereas Biot-Savart law depends on 1/r³",
      'The source of electrostatic field is a scalar (charge q) producing a radial field along r̂, whereas the source of magnetic field is a vector current element (I dl) producing a transverse field perpendicular to both dl and r̂ via a cross product',
      "Coulomb's law is valid in a vacuum whereas Biot-Savart law is only valid inside metallic conductors",
      'Electric fields form continuous closed loops while magnetic field lines always originate on isolated monopoles',
    ],
    correctIndex: 1,
    explanation: 'Coulomb source: scalar q -> radial field E ∥ r̂. Biot-Savart source: vector I·dl -> transverse field dB ⊥ (dl × r̂). Also, steady current elements cannot exist in isolation without a closed loop.',
    hints: [
      'Compare the nature of the sources: scalar charge vs vector current element.',
      'Observe the direction of the resulting field relative to the position vector.',
      'Electric field is radial along r̂; magnetic field is perpendicular via cross product.',
    ],
  },
  {
    id: 'ch_phy_018',
    nodeId: NODE_C12_PHY_039,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'At a large axial distance x (x ≫ R) from a circular current loop of radius R and current I, how does the axial magnetic field B(x) scale with distance x, and what physical entity does it represent?',
    options: [
      'B(x) ∝ 1/x (Infinite line current)',
      'B(x) ∝ 1/x² (Magnetic monopole)',
      'B(x) ∝ 1/x³ (Magnetic dipole of moment m = I·A)',
      'B(x) is constant and does not decay with distance',
    ],
    correctIndex: 2,
    explanation: 'At large axial distances x ≫ R: B(x) = μ₀ I R² / [2(R² + x²)^(3/2)] ≈ μ₀ I R² / (2x³) = (μ₀ / 4π) · (2m / x³), where m = I·(πR²) is the magnetic dipole moment. This 1/x³ decay is the universal signature of a magnetic dipole.',
    hints: [
      'Approximate (R² + x²)^(3/2) when x is much greater than R.',
      'Notice that the denominator becomes x³.',
      'A current loop is equivalent to a magnetic dipole of moment m = IA.',
    ],
  },
  {
    id: 'ch_phy_019',
    nodeId: NODE_C12_PHY_035,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'In a Metre Bridge experiment, why is it strongly recommended to choose the standard resistance R such that the balance point l₁ lies near the center (40 cm to 60 cm) of the wire?',
    options: [
      'The constantan wire melts if current flows through only one end',
      'End corrections and fractional measurement errors δl/l₁ and δl/(100 - l₁) are simultaneously minimised near 50 cm, giving maximum bridge sensitivity and lowest percentage error in X',
      'The galvanometer only operates when current is split 50:50',
      'The battery emf will short-circuit if the balance point touches 10 cm',
    ],
    correctIndex: 1,
    explanation: 'Fractional error dX/X = dl/l₁ + dl/(100 - l₁). This error function has a distinct mathematical minimum at l₁ = 50 cm. Moreover, end contact resistances introduce the least relative distortion at the centre.',
    hints: [
      'Consider the fractional error in reading lengths: Δl / l₁ and Δl / l₂.',
      'If l₁ is 2 cm, a 1 mm error is a massive 5% error.',
      'Near 50 cm, bridge sensitivity is highest and fractional errors are minimised.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_phy_020',
    nodeId: NODE_C12_PHY_036,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'How can the sensitivity of a laboratory Potentiometer be significantly increased to measure microvolt-level potential differences with high precision?',
    options: [
      'Increase the driver battery voltage and shorten the potentiometer wire to 50 cm',
      'Increase the total wire length (e.g. from 4 m to 10 m) and insert a series rheostat to reduce the potential gradient K = ΔV / L',
      'Replace the manganin wire with high-resistance nichrome wire and draw maximum current',
      'Remove the driver battery completely and ground both ends',
    ],
    correctIndex: 1,
    explanation: 'Sensitivity S ∝ 1/K (where K is the potential gradient in V/m). To decrease K (smaller volts per centimetre), one must either increase the wire length L or decrease the current in the wire using a series rheostat.',
    hints: [
      'Sensitivity means producing a large change in balancing length for a tiny change in test voltage.',
      'Sensitivity is inversely proportional to potential gradient K.',
      'To make K smaller, make the wire longer or reduce the driving current.',
    ],
  },
  {
    id: 'ch_phy_021',
    nodeId: NODE_C12_PHY_040,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'At the extreme end on the axis of a finite long solenoid carrying current, the magnetic field is exactly half the field at the centre: B_end = (1/2) μ₀ n I. If B_centre = 8.0 mT, what is B_end in mT?',
    correctAnswer: 4.0,
    tolerance: 0.1,
    unit: 'mT',
    explanation: 'For a semi-infinite solenoid, the subtended solid angle at the end is half of that in the interior. Hence B_end = (1/2) B_centre = 0.5 * 8.0 mT = 4.0 mT.',
    hints: [
      'Field at the mouth/end of a long solenoid is half the internal central field.',
      'Calculate 8.0 / 2.',
      'B_end = 4.0 mT.',
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
  nodeId: NODE_C12_PHY_031,
  title: 'Emf, Internal Resistance & Electromagnetism SuperSim',
  definition: "Comprehensive electrodynamics: Emf (ε = dW/dq), Terminal Voltage (V = ε - Ir), Kirchhoff's Conservation Laws, Wheatstone & Metre Bridge null conditions (P/Q = R/S), Potentiometer potential gradient (K = ΔV/L), and Biot-Savart/Ampere Magnetism (B = μ₀nI).",
  eli5: 'Think of a cell as a water pump with internal pipe friction that eats pressure when water flows. Bridges and potentiometers balance voltages with zero current like a frictionless see-saw. Coiling wire turns moving charges into concentrated magnetic vortex tunnels.',
  misconceptions: [
    {
      misconception: 'Emf and terminal potential difference are identical quantities.',
      correction: 'Emf is the total energy per unit charge supplied by the source. Terminal voltage V = ε - Ir is strictly less than emf whenever current is drawn due to internal resistance r.',
    },
    {
      misconception: 'When cells are connected in parallel, their emfs add up just like in series.',
      correction: 'For identical cells in parallel, the equivalent emf remains ε (same as one cell), while the equivalent internal resistance decreases to r/n.',
    },
    {
      misconception: 'Internal resistance can be ignored in realistic electrical circuits.',
      correction: 'Ignoring internal resistance leads to gross overestimation of current and fails to account for terminal voltage sag under heavy load (e.g. starter motors).',
    },
    {
      misconception: 'A Metre Bridge gives equally accurate results at any balancing point along the wire.',
      correction: 'The Metre Bridge is most accurate near the middle (40-60 cm) where fractional length reading errors and end corrections are minimised.',
    },
    {
      misconception: 'The magnetic field inside an ideal solenoid depends strongly on its radius.',
      correction: 'Inside an ideal solenoid B = μ₀nI, which is completely independent of the coil radius or cross-sectional area.',
    },
  ],
  diagnosticQuestions: [
    { question: 'What is the unit of Electromotive Force (emf)?', options: ['Newton (N)', 'Volt (V)', 'Ampere (A)', 'Joule per second (W)'], correctIndex: 1 },
    { question: 'When a cell is on open circuit (I = 0), what is its terminal voltage?', options: ['Zero', 'Equal to emf (ε)', 'Infinity', 'Half of emf'], correctIndex: 1 },
    { question: "Kirchhoff's Voltage Law (KVL) is based on conservation of:", options: ['Charge', 'Energy', 'Momentum', 'Mass'], correctIndex: 1 },
    { question: 'At balance in a Wheatstone bridge, the current through the galvanometer is:', options: ['Maximum', 'Zero (null deflection)', 'Infinite', 'Reversing continuously'], correctIndex: 1 },
    { question: 'In a potentiometer, the potential gradient K is defined as:', options: ['Current per unit area', 'Potential drop per unit length (V/m)', 'Resistance per unit mass', 'Charge per unit time'], correctIndex: 1 },
    { question: 'What is the shape of magnetic field lines around a long straight current-carrying wire?', options: ['Straight radial lines', 'Concentric circles', 'Helical spirals', 'Parabolic arcs'], correctIndex: 1 },
    { question: 'The magnetic field at the center of a circular loop of radius R carrying current I is:', options: ['μ₀ I / (2 R)', 'μ₀ I / (2π R)', 'μ₀ I R²', 'Zero'], correctIndex: 0 },
    { question: 'What device uses a null method to measure true emf without drawing current?', options: ['Moving-iron ammeter', 'Potentiometer', 'Digital multimeter in series', 'Ohmmeter'], correctIndex: 1 },
  ],
  masteryCriteria: 'Master all 10 CISCE Class 12 nodes: Cell Internal Resistance, Bridges, Potentiometer, and Biot-Savart/Solenoid Magnetism.',
};

// ─── INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Cell Terminal Voltage & Lost Volts (V = ε - Ir)',
    instruction: 'Drag the Load Resistor slider (R) and Internal Resistance slider (r) to observe real-time current flow, terminal voltage drop, and lost volts dissipated as internal heat.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_PHY_031,
  },
  {
    title: "Lab 2: Kirchhoff's Multi-Loop Node & Mesh Balance",
    instruction: 'Toggle cell polarities and adjust loop branch resistors to watch KCL junction currents and KVL loop voltage drops balance dynamically to zero.',
    interactionType: 'click-parts',
    nodeId: NODE_C12_PHY_033,
  },
  {
    title: 'Lab 3: Wheatstone Bridge & Metre Bridge Null Detector',
    instruction: 'Slide the jockey contact along the 100 cm bridge wire until the sensitive Galvanometer needle reaches exact zero (null balance P/Q = R/S).',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_PHY_034,
  },
  {
    title: 'Lab 4: Precision Potentiometer Potential Gradient',
    instruction: 'Adjust the driver rheostat to change the potential gradient K = ΔV/L and slide the test jockey to find the true open-circuit cell emf without drawing current.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_PHY_036,
  },
  {
    title: 'Lab 5: Biot-Savart Circular Coil & Solenoid Magnetic Fields',
    instruction: 'Vary coil current (I), turn density (n), and axial distance (x) to inspect 2D vector field line distributions and 1/x³ dipole fall-off in real time.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_PHY_040,
  },
];

// ─── REAL-WORLD CAPSTONE ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Lead-Acid Battery & Superconducting MRI Coil Architect',
  description: 'Apply your mastery of internal resistance and solenoids to calculate the voltage drop in an electric vehicle (EV) battery pack during acceleration, and design an MRI solenoid generating a 1.5 Tesla uniform clinical field.',
  steps: [
    'Calculate the total internal resistance of a 400V EV battery pack with 96 cells in series (each r = 0.005 Ω).',
    'Determine the terminal voltage sag when the traction motor draws 250 A during rapid highway acceleration.',
    'Calculate the turns per metre n required for a liquid-helium cooled MRI solenoid carrying 100 A to produce B = 1.5 T.',
    'Verify how an Amperian loop confirms external field cancellation outside the tightly wound clinical bore.',
  ],
};

// ─── MAIN SIMULATION COMPONENT ───
function C12_PhysicsInternalResistanceSim({
  nodeId = DEFAULT_PROPS.nodeId,
  title = DEFAULT_PROPS.title,
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['physics'] || { name: 'Physics', emoji: '⚡', color: 'blue' };

  // Phase Flow
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [masteryLevel, setMasteryLevel] = useState('beginner');

  // Discovery State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [discoverySelected, setDiscoverySelected] = useState<number | null>(null);

  // Brilliant Predict-Then-Check State
  const [predIdx, setPredIdx] = useState(0);
  const [predSelected, setPredSelected] = useState<number | null>(null);
  const [predAnswered, setPredAnswered] = useState(false);
  const [predVerified, setPredVerified] = useState(false);

  // Brilliant Observation Question State
  const [obsIdx, setObsIdx] = useState(0);
  const [obsSelected, setObsSelected] = useState<number | null>(null);
  const [obsAnswered, setObsAnswered] = useState(false);

  // Score & Error Tracking
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [errors, setErrors] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Escalating Hints & Answer Reveal
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Drag-and-Drop & Interactive Input States
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Visual Feedback States
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // ─── RICH INTERACTIVE SIMULATION CONTROLS ───
  // Lab 1: Real Cell Controls
  const [cellEmf, setCellEmf] = useState<number>(2.0); // Volts
  const [cellInternalR, setCellInternalR] = useState<number>(0.8); // Ohms
  const [loadResistance, setLoadResistance] = useState<number>(4.0); // Ohms
  const [numCellsSeries, setNumCellsSeries] = useState<number>(1);
  const [numRowsParallel, setNumRowsParallel] = useState<number>(1);

  // Lab 2: Kirchhoff's Network Controls
  const [kE1, setKE1] = useState<number>(12.0); // V
  const [kE2, setKE2] = useState<number>(6.0); // V
  const [kR1, setKR1] = useState<number>(4.0); // Ω
  const [kR2, setKR2] = useState<number>(2.0); // Ω
  const [kR3, setKR3] = useState<number>(6.0); // Ω

  // Lab 3: Wheatstone / Metre Bridge Controls
  const [bridgeR, setBridgeR] = useState<number>(15.0); // Ω
  const [bridgeUnknownX, setBridgeUnknownX] = useState<number>(30.0); // Ω
  const [jockeyPositionCm, setJockeyPositionCm] = useState<number>(33.3); // cm (0-100)
  const [bridgeBatteryOn, setBridgeBatteryOn] = useState<boolean>(true);

  // Lab 4: Potentiometer Controls
  const [potDriverEmf, setPotDriverEmf] = useState<number>(4.0); // V
  const [potRheostatR, setPotRheostatR] = useState<number>(5.0); // Ω
  const [potWireLengthM, setPotWireLengthM] = useState<number>(4.0); // metres
  const [potWireTotalR, setPotWireTotalR] = useState<number>(8.0); // Ω
  const [potTestEmf, setPotTestEmf] = useState<number>(1.5); // V
  const [potTestShuntR, setPotTestShuntR] = useState<number>(10.0); // Ω
  const [potShuntKeyClosed, setPotShuntKeyClosed] = useState<boolean>(false);
  const [potJockeyPosCm, setPotJockeyPosCm] = useState<number>(150); // cm

  // Lab 5: Biot-Savart & Solenoid Controls
  const [magCurrentI, setMagCurrentI] = useState<number>(3.0); // Amperes
  const [magCoilTurnsN, setMagCoilTurnsN] = useState<number>(100);
  const [magCoilRadiusR, setMagCoilRadiusR] = useState<number>(0.08); // m
  const [magAxialDistX, setMagAxialDistX] = useState<number>(0.05); // m
  const [solenoidTurnsPerM, setSolenoidTurnsPerM] = useState<number>(2000); // turns/m
  const [activeMagTab, setActiveMagTab] = useState<'loop' | 'solenoid' | 'oersted'>('loop');

  // Animation Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const magCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── DERIVED REAL-TIME PHYSICS CALCULATIONS ───
  // Cell Circuit Calculations (Lab 1)
  const cellTotalEmf = useMemo(() => numCellsSeries * cellEmf, [numCellsSeries, cellEmf]);
  const cellTotalInternalR = useMemo(
    () => (numCellsSeries * cellInternalR) / numRowsParallel,
    [numCellsSeries, cellInternalR, numRowsParallel]
  );
  const cellCurrent = useMemo(() => {
    const denom = loadResistance + cellTotalInternalR;
    return denom > 0 ? cellTotalEmf / denom : 0;
  }, [cellTotalEmf, loadResistance, cellTotalInternalR]);
  const cellTerminalVoltage = useMemo(() => cellCurrent * loadResistance, [cellCurrent, loadResistance]);
  const cellLostVolts = useMemo(() => cellCurrent * cellTotalInternalR, [cellCurrent, cellTotalInternalR]);
  const cellPowerLoad = useMemo(() => cellCurrent * cellCurrent * loadResistance, [cellCurrent, loadResistance]);
  const cellEfficiencyPct = useMemo(
    () => (cellTotalEmf > 0 ? (cellTerminalVoltage / cellTotalEmf) * 100 : 0),
    [cellTerminalVoltage, cellTotalEmf]
  );

  // Kirchhoff Two-Loop Network Calculations (Lab 2)
  const { kI1, kI2, kI3, kMesh1Residual, kMesh2Residual } = useMemo(() => {
    const a1 = kR1 + kR2;
    const b1 = kR2;
    const c1 = kE1;
    const a2 = kR2;
    const b2 = kR2 + kR3;
    const c2 = kE2;
    const det = a1 * b2 - a2 * b1;
    if (Math.abs(det) < 1e-6) return { kI1: 0, kI2: 0, kI3: 0, kMesh1Residual: 0, kMesh2Residual: 0 };
    const i1 = (c1 * b2 - c2 * b1) / det;
    const i2 = (a1 * c2 - a2 * c1) / det;
    const i3 = i1 + i2;
    const r1 = kE1 - i1 * kR1 - i3 * kR2;
    const r2 = kE2 - i2 * kR3 - i3 * kR2;
    return { kI1: i1, kI2: i2, kI3: i3, kMesh1Residual: r1, kMesh2Residual: r2 };
  }, [kE1, kE2, kR1, kR2, kR3]);

  // Metre Bridge Galvanometer Deflection (Lab 3)
  const bridgeNullPosExact = useMemo(() => {
    const sum = bridgeR + bridgeUnknownX;
    return sum > 0 ? (bridgeR / sum) * 100 : 50;
  }, [bridgeR, bridgeUnknownX]);
  const galvanometerCurrentUg = useMemo(() => {
    if (!bridgeBatteryOn) return 0;
    const diff = jockeyPositionCm - bridgeNullPosExact;
    return Math.max(-100, Math.min(100, diff * 3.2));
  }, [bridgeBatteryOn, jockeyPositionCm, bridgeNullPosExact]);

  // Potentiometer Potential Gradient & Null Balance (Lab 4)
  const potDriverCurrent = useMemo(() => {
    const totalDriverR = potWireTotalR + potRheostatR;
    return totalDriverR > 0 ? potDriverEmf / totalDriverR : 0;
  }, [potDriverEmf, potWireTotalR, potRheostatR]);
  const potGradientK = useMemo(() => {
    return potWireLengthM > 0 ? (potDriverCurrent * potWireTotalR) / (potWireLengthM * 100) : 0;
  }, [potDriverCurrent, potWireTotalR, potWireLengthM]);
  const potEffectiveTestV = useMemo(() => {
    if (!potShuntKeyClosed) return potTestEmf;
    const cellInternalRApprox = 2.0;
    return (potTestEmf * potTestShuntR) / (potTestShuntR + cellInternalRApprox);
  }, [potTestEmf, potTestShuntR, potShuntKeyClosed]);
  const potBalanceLengthExactCm = useMemo(() => {
    return potGradientK > 0 ? potEffectiveTestV / potGradientK : 0;
  }, [potEffectiveTestV, potGradientK]);
  const potGalvoCurrentUa = useMemo(() => {
    const wireVoltageAtJockey = potJockeyPosCm * potGradientK;
    const vDiff = wireVoltageAtJockey - potEffectiveTestV;
    return Math.max(-150, Math.min(150, vDiff * 80));
  }, [potJockeyPosCm, potGradientK, potEffectiveTestV]);

  // Biot-Savart & Solenoid Magnetism (Lab 5)
  const mu0 = 4 * Math.PI * 1e-7;
  const loopCenterB_Tesla = useMemo(() => {
    return magCoilRadiusR > 0 ? (mu0 * magCoilTurnsN * magCurrentI) / (2 * magCoilRadiusR) : 0;
  }, [magCoilTurnsN, magCurrentI, magCoilRadiusR, mu0]);
  const loopDipoleMoment = useMemo(() => {
    return magCoilTurnsN * magCurrentI * (Math.PI * magCoilRadiusR * magCoilRadiusR);
  }, [magCoilTurnsN, magCurrentI, magCoilRadiusR]);
  const solenoidB_Tesla = useMemo(() => {
    return mu0 * solenoidTurnsPerM * magCurrentI;
  }, [solenoidTurnsPerM, magCurrentI, mu0]);

  // Adaptive Difficulty Filter
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter((c) => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const currentCh = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── LOAD MASTERY ON MOUNT ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 85) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT ADAPTIVE MASTERY EFFECT ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDiff: 'foundation' | 'standard' | 'advanced' =
      mastery === 'not-started' || mastery === 'beginner' ? 'foundation' : mastery === 'developing' ? 'standard' : 'advanced';
    setDifficulty((prev) => {
      if (prev !== newDiff) {
        setCurrentChallenge(0);
        return newDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── AUTO-HINT INACTIVITY TIMER ───
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && currentCh.hints[nextLevel - 1]) {
      setCurrentHint(currentCh.hints[nextLevel - 1]);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(currentCh.hints[nextLevel - 1]);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
    }
  }, [hintCount, currentCh]);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── INTERACTIVE HANDLERS ───
  const handleDiscoverySelect = useCallback((idx: number) => {
    setDiscoverySelected(idx);
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    if (isCorrect) {
      audioManager.play('success');
      speechManager.speak('Brilliant intuition! The massive starter current causes huge lost volts inside the battery.');
    } else {
      audioManager.play('pop');
      speechManager.speak(DISCOVERY_QUESTION.hintAfter);
    }
  }, []);

  const handlePredictionSelect = useCallback((idx: number) => {
    setPredSelected(idx);
    setPredAnswered(true);
    const isCorrect = idx === PREDICTION_QUESTIONS[predIdx].correctIndex;
    if (isCorrect) {
      audioManager.play('success');
    } else {
      audioManager.play('pop');
    }
  }, [predIdx]);

  const handleObservationSelect = useCallback((idx: number) => {
    setObsSelected(idx);
    setObsAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[obsIdx].correctIndex;
    if (isCorrect) {
      audioManager.play('success');
    } else {
      audioManager.play('pop');
    }
  }, [obsIdx]);

  const handleAdvanceToExplore = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive physics super-lab! Manipulate the circuit controls.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode unlocked. Experiment freely with zero stress or grading.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge mode initiated. Put your physics mastery to the test!');
  }, []);

  const handleNextSlide = useCallback(() => {
    setCurrentSlide((prev) => Math.min(EXPLORATION_STEPS.length - 1, prev + 1));
    audioManager.play('tap');
  }, []);

  const handlePrevSlide = useCallback(() => {
    setCurrentSlide((prev) => Math.max(0, prev - 1));
    audioManager.play('tap');
  }, []);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback(
    (targetId: string) => {
      if (!draggedItem) return;
      const isCorrect = currentCh.correctMapping?.[targetId] === draggedItem;
      if (isCorrect) {
        setDroppedLabels((prev) => ({ ...prev, [targetId]: draggedItem }));
        audioManager.play('drop-correct');
      } else {
        audioManager.play('drop-wrong');
      }
      setDraggedItem(null);
    },
    [draggedItem, currentCh]
  );

  const handleSortItemMove = useCallback(
    (fromIdx: number, toIdx: number) => {
      audioManager.play('pickup');
      setSortArrangement((prev) => {
        const base = prev.length === currentCh.sortItems?.length ? prev : currentCh.sortItems?.map((_, i) => i) || [];
        const arr = [...base];
        const [moved] = arr.splice(fromIdx, 1);
        arr.splice(toIdx, 0, moved);
        return arr;
      });
    },
    [currentCh]
  );

  const handleCompleteSimulation = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    setShowConfetti(true);
    audioManager.play('celebration');
    speechManager.speak('Outstanding performance! You have conquered ISC Class 12 Electrodynamics & Magnetism.');
  }, [errors, onComplete]);

  const handleNextChallenge = useCallback(() => {
    setHintCount(0);
    setAnswerRevealed(false);
    setShowHint(false);
    setShowExplanation(false);
    setRevealedSteps(0);
    setNumericInput('');
    setDroppedLabels({});
    setSortArrangement([]);
    setConstructParts([]);
    setWrongShake(false);
    setWrongFlash(false);

    if (currentChallenge + 1 >= filteredChallenges.length) {
      handleCompleteSimulation();
    } else {
      setCurrentChallenge((c) => c + 1);
      audioManager.play('whoosh');
    }
  }, [currentChallenge, filteredChallenges.length, handleCompleteSimulation]);

  const handleAnswerSubmit = useCallback(
    (answer: number | Record<string, string> | number[] | string) => {
      let isCorrect = false;
      if (currentCh.type === 'classify' || currentCh.type === 'distinguish' || currentCh.type === 'match') {
        isCorrect = answer === currentCh.correctIndex;
      } else if (currentCh.type === 'drag-label') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(currentCh.correctMapping);
      } else if (currentCh.type === 'drag-sort') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(currentCh.correctOrder);
      } else if (currentCh.type === 'numeric') {
        const numVal = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
        isCorrect = Math.abs(numVal - (currentCh.correctAnswer || 0)) <= (currentCh.tolerance || 0.05);
      } else if (currentCh.type === 'construct') {
        isCorrect = (answer as string).trim() === currentCh.targetState?.trim();
      }

      if (isCorrect) {
        setScoreBreakdown((prev) => ({ correct: prev.correct + 1, total: prev.total + 1 }));
        audioManager.play('success');
        audioManager.play('sparkle');
        speechManager.speak('Spot on! Excellent physics analysis.');
        setShowConfetti(true);
        setShowExplanation(true);
        bktStateRef.current = bktUpdate(bktStateRef.current, true);

        const srsItem = createReviewItem(currentCh.nodeId, currentCh.question);
        const updatedSrs = sm2Update(srsItem, 5, 4500);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + currentCh.nodeId, JSON.stringify(updatedSrs));
        }
      } else {
        setErrors((e) => e + 1);
        setWrongShake(true);
        setWrongFlash(true);
        audioManager.play('drop-wrong');
        audioManager.play('error');
        setTimeout(() => setWrongShake(false), 500);
        setTimeout(() => setWrongFlash(false), 800);

        if (currentCh.misconceptionIndex !== undefined && !hitMisconceptions.includes(currentCh.misconceptionIndex)) {
          setHitMisconceptions((prev) => [...prev, currentCh.misconceptionIndex!]);
        }

        if (hintCount < 3) {
          showNextHint();
        } else {
          setAnswerRevealed(true);
          setShowExplanation(true);
          speechManager.speak('Let us review the step-by-step physical derivation together.');
          bktStateRef.current = bktUpdate(bktStateRef.current, false);

          const srsItem = createReviewItem(currentCh.nodeId, currentCh.question);
          const updatedSrs = sm2Update(srsItem, 1, 5000);
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem('srs_' + currentCh.nodeId, JSON.stringify(updatedSrs));
          }
        }
      }
      resetInactivityTimer();
    },
    [currentCh, hintCount, hitMisconceptions, showNextHint, resetInactivityTimer]
  );

  // ─── 2D HTML CANVAS ANIMATION 1: DRIFT ELECTRON FLOW ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId: number;
    let offset = 0;

    const render = () => {
      offset += cellCurrent * 1.5 + 0.4;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw conducting wire path
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 14;
      ctx.lineCap = 'round';
      ctx.strokeRect(30, 20, canvas.width - 60, canvas.height - 40);

      // Draw flowing charge particles
      const perimeter = 2 * (canvas.width - 60 + canvas.height - 40);
      const numParticles = 24;
      for (let i = 0; i < numParticles; i++) {
        const dist = ((i * (perimeter / numParticles) + offset) % perimeter + perimeter) % perimeter;
        let px = 0;
        let py = 0;
        const w = canvas.width - 60;
        const h = canvas.height - 40;

        if (dist < w) {
          px = 30 + dist;
          py = 20;
        } else if (dist < w + h) {
          px = 30 + w;
          py = 20 + (dist - w);
        } else if (dist < 2 * w + h) {
          px = 30 + w - (dist - (w + h));
          py = 20 + h;
        } else {
          px = 30;
          py = 20 + h - (dist - (2 * w + h));
        }

        ctx.fillStyle = '#38bdf8';
        ctx.beginPath();
        ctx.arc(px, py, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowColor = '#0284c7';
        ctx.shadowBlur = 8;
      }
      ctx.shadowBlur = 0;

      // Draw Battery Node Box
      ctx.fillStyle = '#1e293b';
      ctx.strokeStyle = '#6366f1';
      ctx.lineWidth = 2;
      ctx.fillRect(15, 60, 50, 60);
      ctx.strokeRect(15, 60, 50, 60);
      ctx.fillStyle = '#a5b4fc';
      ctx.font = 'bold 11px sans-serif';
      ctx.fillText(`ε=${cellTotalEmf.toFixed(1)}V`, 18, 85);
      ctx.fillText(`r=${cellTotalInternalR.toFixed(1)}Ω`, 18, 105);

      // Draw Load Resistor Box
      ctx.fillStyle = '#1e293b';
      ctx.strokeStyle = '#f59e0b';
      ctx.fillRect(canvas.width - 65, 60, 50, 60);
      ctx.strokeRect(canvas.width - 65, 60, 50, 60);
      ctx.fillStyle = '#fcd34d';
      ctx.fillText(`R=${loadResistance.toFixed(1)}Ω`, canvas.width - 62, 85);
      ctx.fillText(`V=${cellTerminalVoltage.toFixed(2)}V`, canvas.width - 62, 105);

      animId = requestAnimationFrame(render);
    };
    render();
    return () => cancelAnimationFrame(animId);
  }, [cellCurrent, cellTotalEmf, cellTotalInternalR, loadResistance, cellTerminalVoltage]);

  // ─── 2D HTML CANVAS ANIMATION 2: MAGNETIC FIELD LINE VORTEX ───
  useEffect(() => {
    const canvas = magCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId: number;
    let frame = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 1;

      // Field lines
      const numLines = 8;
      for (let i = 1; i <= numLines; i++) {
        const rx = 30 + i * 20;
        const ry = 15 + i * 12;
        ctx.beginPath();
        ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(56, 189, 248, ${0.15 + (magCurrentI / 10) * 0.4})`;
        ctx.stroke();

        const angle = (frame * 0.02 + i * 0.5) % (Math.PI * 2);
        const px = cx + rx * Math.cos(angle);
        const py = cy + ry * Math.sin(angle);
        ctx.fillStyle = '#38bdf8';
        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Solenoid / Coil Representation
      ctx.fillStyle = '#f97316';
      ctx.strokeStyle = '#ea580c';
      ctx.lineWidth = 3;
      for (let k = -4; k <= 4; k++) {
        ctx.strokeRect(cx + k * 14 - 4, cy - 25, 8, 50);
      }

      // Center B vector
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(cx - 70, cy);
      ctx.lineTo(cx + 70, cy);
      ctx.stroke();

      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.moveTo(cx + 75, cy);
      ctx.lineTo(cx + 65, cy - 6);
      ctx.lineTo(cx + 65, cy + 6);
      ctx.fill();

      animId = requestAnimationFrame(render);
    };
    render();
    return () => cancelAnimationFrame(animId);
  }, [magCurrentI]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER & REAL-TIME STATS BAR ─── */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-800"
      >
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.8 }}
            className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-gold-600 to-gold-600 flex items-center justify-center text-2xl shadow-lg shadow-gold-500/20"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-gold-900/60 text-gold-300 border border-gold-700/50">
                ISC Class 12 Science
              </span>
              <motion.span
                key={difficulty}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                  difficulty === 'foundation'
                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-700'
                    : difficulty === 'standard'
                    ? 'bg-gold-950 text-gold-400 border border-gold-700'
                    : 'bg-rose-950 text-rose-400 border border-rose-700'
                }`}
              >
                {difficulty} Tier
              </motion.span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white tracking-tight mt-1">{title}</h1>
          </div>
        </div>

        {/* Real-time Lab HUD indicators */}
        <div className="flex flex-wrap items-center gap-2">
          <motion.div whileHover={{ scale: 1.05 }} className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
            <span className="text-slate-400">Emf / Lost V: </span>
            <span className="text-gold-300 font-mono font-bold">
              {cellTotalEmf.toFixed(1)}V / {cellLostVolts.toFixed(2)}V
            </span>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
            <span className="text-slate-400">Galvo Ig: </span>
            <span className={`font-mono font-bold ${Math.abs(galvanometerCurrentUg) < 0.5 ? 'text-emerald-400' : 'text-amber-400'}`}>
              {galvanometerCurrentUg.toFixed(1)} μA
            </span>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
            <span className="text-slate-400">B_sol: </span>
            <span className="text-emerald-400 font-mono font-bold">{(solenoidB_Tesla * 1000).toFixed(2)} mT</span>
          </motion.div>
        </div>
      </motion.header>

      {/* ─── NAVIGATION PHASES TABS ─── */}
      <nav className="flex items-center gap-2 my-4 overflow-x-auto pb-2" aria-label="Simulation Phases">
        {(['discovery', 'explore', 'sandbox', 'challenge', 'complete'] as const).map((p) => (
          <motion.button
            key={p}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setPhase(p)}
            aria-label={`Navigate to ${p} phase`}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
              phase === p
                ? 'bg-gold-600 text-white shadow-lg shadow-gold-600/30'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            {p === 'discovery' && '1. Discovery Hook'}
            {p === 'explore' && '2. Interactive Guided Labs'}
            {p === 'sandbox' && '3. Free Sandbox'}
            {p === 'challenge' && `4. Master Challenges (${filteredChallenges.length})`}
            {p === 'complete' && '5. Summary & SRS'}
          </motion.button>
        ))}
      </nav>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      <AnimatePresence mode="wait">
        {phase === 'discovery' && (
          <motion.section
            key="discovery"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="p-6 rounded-2xl bg-gradient-to-br from-gold-950/60 to-slate-900 border border-gold-800/60 shadow-xl">
              <div className="flex items-center gap-2 text-gold-400 font-bold text-sm mb-2">
                <span>🚨</span>
                <span>{SCENARIO.title}</span>
              </div>
              <p className="text-base text-slate-200 leading-relaxed">{SCENARIO.intro}</p>
              <p className="text-xs text-slate-400 mt-3 pt-3 border-t border-gold-900/50">{SCENARIO.context}</p>
            </div>

            {/* Interactive Discovery Question */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Thought Experiment (Low-Stakes)</span>
              <h2 className="text-lg font-bold text-white mt-1 mb-4">{DISCOVERY_QUESTION.question}</h2>

              <div className="space-y-3">
                {DISCOVERY_QUESTION.options.map((option, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.985 }}
                    onClick={() => handleDiscoverySelect(idx)}
                    disabled={discoveryAnswered}
                    aria-label={`Option ${String.fromCharCode(65 + idx)}: ${option}`}
                    className={`w-full p-4 rounded-xl text-left text-sm font-medium transition-all border ${
                      discoverySelected === idx
                        ? discoveryCorrect
                          ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                          : 'bg-rose-950/70 border-rose-500 text-rose-200'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-lg bg-slate-800 flex items-center justify-center font-mono text-xs">
                        {discoverySelected === idx ? (discoveryCorrect ? '✓' : '✗') : String.fromCharCode(65 + idx)}
                      </span>
                      <span>{option}</span>
                    </div>
                  </motion.button>
                ))}
              </div>

              {discoveryAnswered && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {discoveryCorrect ? '✓ Remarkable intuition! When the starter draws 200A, Ir = 200 * 0.05 = 10V drop, leaving only 2V for the bulbs!' : `✗ ${DISCOVERY_QUESTION.hintAfter}`}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToExplore}
                    aria-label="Enter Visual Super-Labs"
                    className="mt-4 px-6 py-3 rounded-xl bg-gradient-to-r from-gold-600 to-gold-600 text-white font-bold text-sm shadow-lg shadow-gold-500/25 flex items-center gap-2"
                  >
                    <span>Enter Visual Super-Labs</span>
                    <span>→</span>
                  </motion.button>
                </motion.div>
              )}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ─── PHASE 2: INTERACTIVE GUIDED EXPLORATION ─── */}
      <AnimatePresence mode="wait">
        {phase === 'explore' && (
          <motion.section
            key="explore"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="space-y-6"
          >
            {/* Step navigation Header */}
            <div className="flex items-center justify-between bg-slate-900 p-4 rounded-2xl border border-slate-800">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-lg bg-gold-950 text-gold-400 border border-gold-800 font-mono text-xs font-bold">
                  Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
                </span>
                <h2 className="text-base font-bold text-white">{EXPLORATION_STEPS[currentSlide].title}</h2>
              </div>
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePrevSlide}
                  disabled={currentSlide === 0}
                  aria-label="Previous Lab"
                  className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs font-bold disabled:opacity-30"
                >
                  ← Prev Lab
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNextSlide}
                  disabled={currentSlide === EXPLORATION_STEPS.length - 1}
                  aria-label="Next Lab"
                  className="px-3 py-1.5 rounded-lg bg-gold-600 text-white text-xs font-bold disabled:opacity-30"
                >
                  Next Lab →
                </motion.button>
              </div>
            </div>

            <p className="text-sm text-amber-300/90 font-medium bg-amber-950/30 p-3 rounded-xl border border-amber-900/40">
              🔬 <strong className="text-amber-200">Interactive Goal:</strong> {EXPLORATION_STEPS[currentSlide].instruction}
            </p>

            {/* ─── LAB 1: CELL TERMINAL VOLTAGE & LOST VOLTS ─── */}
            {currentSlide === 0 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Topic-Specific SVG 1: Real Cell Circuit Diagram */}
                  <div className="lg:col-span-7 bg-slate-900 p-4 rounded-2xl border border-slate-800 flex flex-col items-center">
                    <div className="w-full flex items-center justify-between text-xs text-slate-400 mb-2">
                      <span>Circuit Schematic (V = ε - Ir)</span>
                      <span className="font-mono text-emerald-400 font-bold">I = {cellCurrent.toFixed(2)} A</span>
                    </div>

                    <svg viewBox="0 0 450 170" className="w-full bg-slate-950 rounded-xl border border-slate-800 p-2" aria-label="Real Cell with Internal Resistance Circuit Schematic">
                      {/* Wire Loop */}
                      <rect x="50" y="30" width="350" height="110" rx="8" fill="none" stroke="#475569" strokeWidth="4" />
                      
                      {/* Battery Dashed Envelope (Real Cell) */}
                      <rect x="65" y="15" width="160" height="60" rx="6" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="4 3" />
                      <text x="145" y="27" fill="#a5b4fc" fontSize="9" textAnchor="middle" fontWeight="bold">Real Chemical Cell</text>
                      
                      {/* Ideal Emf Source symbol */}
                      <line x1="90" y1="40" x2="90" y2="60" stroke="#818cf8" strokeWidth="2" />
                      <line x1="98" y1="33" x2="98" y2="67" stroke="#38bdf8" strokeWidth="4" />
                      <line x1="106" y1="40" x2="106" y2="60" stroke="#818cf8" strokeWidth="2" />
                      <line x1="114" y1="33" x2="114" y2="67" stroke="#38bdf8" strokeWidth="4" />
                      <text x="102" y="78" fill="#38bdf8" fontSize="10" textAnchor="middle" fontWeight="bold">ε={cellTotalEmf.toFixed(1)}V</text>

                      {/* Internal Resistor r */}
                      <rect x="150" y="42" width="40" height="16" rx="2" fill="#312e81" stroke="#f43f5e" strokeWidth="1.5" />
                      <text x="170" y="54" fill="#fda4af" fontSize="9" textAnchor="middle" fontWeight="bold">r={cellTotalInternalR.toFixed(1)}Ω</text>

                      {/* Voltmeter across terminals */}
                      <path d="M 60 45 L 60 100 L 135 100" fill="none" stroke="#eab308" strokeWidth="1.5" strokeDasharray="3 2" />
                      <path d="M 230 45 L 230 100 L 175 100" fill="none" stroke="#eab308" strokeWidth="1.5" strokeDasharray="3 2" />
                      <circle cx="155" cy="100" r="14" fill="#1e293b" stroke="#eab308" strokeWidth="2" />
                      <text x="155" y="104" fill="#fde047" fontSize="11" textAnchor="middle" fontWeight="bold">V</text>
                      <text x="155" y="125" fill="#fde047" fontSize="10" textAnchor="middle" fontWeight="bold">{cellTerminalVoltage.toFixed(2)} V</text>

                      {/* Load Resistor R on right branch */}
                      <rect x="375" y="65" width="20" height="40" rx="3" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                      <text x="385" y="88" fill="#fcd34d" fontSize="10" textAnchor="middle" fontWeight="bold">R</text>
                      <text x="350" y="88" fill="#fcd34d" fontSize="9" textAnchor="middle">{loadResistance.toFixed(1)}Ω</text>

                      {/* Conventional Current Arrows */}
                      <polygon points="280,26 295,30 280,34" fill="#10b981" />
                      <text x="287" y="22" fill="#10b981" fontSize="9" textAnchor="middle" fontWeight="bold">I={cellCurrent.toFixed(2)}A</text>
                    </svg>

                    {/* Multi-representation Equations Bar */}
                    <div className="grid grid-cols-3 gap-2 w-full mt-4 text-center">
                      <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                        <span className="text-[10px] text-slate-400 block uppercase">Total Emf ε</span>
                        <span className="text-base font-mono font-black text-gold-400">{cellTotalEmf.toFixed(2)} V</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                        <span className="text-[10px] text-slate-400 block uppercase">Terminal Voltage V</span>
                        <span className="text-base font-mono font-black text-amber-400">{cellTerminalVoltage.toFixed(2)} V</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                        <span className="text-[10px] text-slate-400 block uppercase">Lost Volts Ir</span>
                        <span className="text-base font-mono font-black text-rose-400">{cellLostVolts.toFixed(2)} V</span>
                      </div>
                    </div>
                  </div>

                  {/* Lab 1 Interactive Sliders */}
                  <div className="lg:col-span-5 bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">Live Circuit Parameters</h3>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-400">Cell Emf (ε):</span>
                        <span className="font-mono text-gold-400 font-bold">{cellEmf.toFixed(1)} V</span>
                      </div>
                      <input
                        type="range"
                        min={0.5}
                        max={12}
                        step={0.1}
                        value={cellEmf}
                        onChange={(e) => setCellEmf(parseFloat(e.target.value))}
                        aria-label="Cell Emf in Volts"
                        className="w-full accent-gold-500"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-400">Internal Resistance (r):</span>
                        <span className="font-mono text-rose-400 font-bold">{cellInternalR.toFixed(2)} Ω</span>
                      </div>
                      <input
                        type="range"
                        min={0.05}
                        max={5.0}
                        step={0.05}
                        value={cellInternalR}
                        onChange={(e) => setCellInternalR(parseFloat(e.target.value))}
                        aria-label="Cell Internal Resistance in Ohms"
                        className="w-full accent-rose-500"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-400">External Load Resistor (R):</span>
                        <span className="font-mono text-amber-400 font-bold">{loadResistance.toFixed(1)} Ω</span>
                      </div>
                      <input
                        type="range"
                        min={0.1}
                        max={20.0}
                        step={0.1}
                        value={loadResistance}
                        onChange={(e) => setLoadResistance(parseFloat(e.target.value))}
                        aria-label="External Load Resistance in Ohms"
                        className="w-full accent-amber-500"
                      />
                    </div>

                    <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                      <span className="text-slate-400">Power Delivered:</span>
                      <span className="font-mono text-emerald-400 font-bold">{cellPowerLoad.toFixed(2)} W</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">Cell Electrical Efficiency:</span>
                      <span className="font-mono text-gold-400 font-bold">{cellEfficiencyPct.toFixed(1)} %</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ─── LAB 2: KIRCHHOFF'S LAWS ─── */}
            {currentSlide === 1 && (
              <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-6">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="flex justify-between text-xs text-slate-400 mb-2">
                    <span>Kirchhoff 2-Mesh Schematic (ΣI = 0 at Junction, ΣΔV = 0 in Loop)</span>
                    <span className="font-mono text-gold-400 font-bold">Junction Balance: I1 + I2 = I3</span>
                  </div>

                  <svg viewBox="0 0 500 160" className="w-full bg-slate-900 rounded-lg p-2" aria-label="Kirchhoff Two-Loop Mesh Circuit Diagram">
                    {/* Left Loop Wire */}
                    <rect x="40" y="30" width="200" height="100" fill="none" stroke="#6366f1" strokeWidth="2.5" />
                    {/* Right Loop Wire */}
                    <rect x="240" y="30" width="220" height="100" fill="none" stroke="#f43f5e" strokeWidth="2.5" />

                    {/* Source E1 Left */}
                    <rect x="30" y="65" width="20" height="30" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="22" y="83" fill="#a5b4fc" fontSize="9" textAnchor="end" fontWeight="bold">E1={kE1}V</text>

                    {/* Resistor R1 Top Left */}
                    <rect x="110" y="22" width="40" height="16" rx="2" fill="#1e293b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="130" y="34" fill="#c7d2fe" fontSize="9" textAnchor="middle">R1={kR1}Ω</text>

                    {/* Junction Nodes */}
                    <circle cx="240" cy="30" r="5" fill="#38bdf8" />
                    <text x="240" y="20" fill="#38bdf8" fontSize="10" textAnchor="middle" fontWeight="bold">Node A</text>
                    <circle cx="240" cy="130" r="5" fill="#38bdf8" />
                    <text x="240" y="148" fill="#38bdf8" fontSize="10" textAnchor="middle" fontWeight="bold">Node B</text>

                    {/* Center Shared Resistor R2 */}
                    <rect x="230" y="65" width="20" height="35" rx="2" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                    <text x="265" y="85" fill="#fcd34d" fontSize="9" textAnchor="start" fontWeight="bold">R2={kR2}Ω</text>
                    <text x="265" y="98" fill="#34d399" fontSize="9" textAnchor="start" fontWeight="bold">I3={kI3.toFixed(2)}A</text>

                    {/* Resistor R3 Top Right */}
                    <rect x="330" y="22" width="40" height="16" rx="2" fill="#1e293b" stroke="#fda4af" strokeWidth="1.5" />
                    <text x="350" y="34" fill="#fda4af" fontSize="9" textAnchor="middle">R3={kR3}Ω</text>

                    {/* Source E2 Right */}
                    <rect x="450" y="65" width="20" height="30" fill="#4c0519" stroke="#fb7185" strokeWidth="1.5" />
                    <text x="478" y="83" fill="#fecdd3" fontSize="9" textAnchor="start" fontWeight="bold">E2={kE2}V</text>

                    {/* Mesh 1 indicator */}
                    <path d="M 120 70 A 18 18 0 1 1 120 90" fill="none" stroke="#818cf8" strokeWidth="1.5" strokeDasharray="3 2" />
                    <text x="140" y="82" fill="#818cf8" fontSize="9" fontWeight="bold">Mesh 1 (↻)</text>

                    {/* Mesh 2 indicator */}
                    <path d="M 340 70 A 18 18 0 1 1 340 90" fill="none" stroke="#fda4af" strokeWidth="1.5" strokeDasharray="3 2" />
                    <text x="360" y="82" fill="#fda4af" fontSize="9" fontWeight="bold">Mesh 2 (↺)</text>
                  </svg>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                    <h4 className="text-xs font-bold text-gold-400 uppercase">Left Loop (E1, R1)</h4>
                    <div className="flex justify-between text-xs">
                      <span>Source E1:</span>
                      <span className="font-mono text-white font-bold">{kE1} V</span>
                    </div>
                    <input
                      type="range"
                      min={2}
                      max={24}
                      value={kE1}
                      onChange={(e) => setKE1(parseFloat(e.target.value))}
                      aria-label="Kirchhoff Source E1 in Volts"
                      className="w-full accent-gold-500"
                    />
                    <div className="flex justify-between text-xs">
                      <span>Resistor R1:</span>
                      <span className="font-mono text-white font-bold">{kR1} Ω</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={12}
                      value={kR1}
                      onChange={(e) => setKR1(parseFloat(e.target.value))}
                      aria-label="Kirchhoff Resistor R1 in Ohms"
                      className="w-full accent-gold-500"
                    />
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                    <h4 className="text-xs font-bold text-amber-400 uppercase">Center Shared Branch (R2)</h4>
                    <div className="flex justify-between text-xs">
                      <span>Resistor R2:</span>
                      <span className="font-mono text-white font-bold">{kR2} Ω</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={10}
                      value={kR2}
                      onChange={(e) => setKR2(parseFloat(e.target.value))}
                      aria-label="Kirchhoff Resistor R2 in Ohms"
                      className="w-full accent-amber-500"
                    />
                    <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-center">
                      <span className="text-[10px] text-slate-400 block">KCL Junction Current I3 = I1 + I2</span>
                      <span className="text-base font-mono font-bold text-emerald-400">{kI3.toFixed(2)} A</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                    <h4 className="text-xs font-bold text-rose-400 uppercase">Right Loop (E2, R3)</h4>
                    <div className="flex justify-between text-xs">
                      <span>Source E2:</span>
                      <span className="font-mono text-white font-bold">{kE2} V</span>
                    </div>
                    <input
                      type="range"
                      min={2}
                      max={24}
                      value={kE2}
                      onChange={(e) => setKE2(parseFloat(e.target.value))}
                      aria-label="Kirchhoff Source E2 in Volts"
                      className="w-full accent-rose-500"
                    />
                    <div className="flex justify-between text-xs">
                      <span>Resistor R3:</span>
                      <span className="font-mono text-white font-bold">{kR3} Ω</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={12}
                      value={kR3}
                      onChange={(e) => setKR3(parseFloat(e.target.value))}
                      aria-label="Kirchhoff Resistor R3 in Ohms"
                      className="w-full accent-rose-500"
                    />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-wrap items-center justify-around gap-4 text-xs font-mono">
                  <div>
                    <span className="text-slate-400">Branch I1: </span>
                    <span className="text-gold-400 font-bold">{kI1.toFixed(2)} A</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Branch I2: </span>
                    <span className="text-rose-400 font-bold">{kI2.toFixed(2)} A</span>
                  </div>
                  <div>
                    <span className="text-slate-400">KVL Loop 1 Net ΣΔV: </span>
                    <span className="text-emerald-400 font-bold">✓ {Math.abs(kMesh1Residual) < 0.001 ? '0.00 V (Exact)' : kMesh1Residual.toFixed(2)}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">KVL Loop 2 Net ΣΔV: </span>
                    <span className="text-emerald-400 font-bold">✓ {Math.abs(kMesh2Residual) < 0.001 ? '0.00 V (Exact)' : kMesh2Residual.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )}

            {/* ─── LAB 3: WHEATSTONE & METRE BRIDGE ─── */}
            {currentSlide === 2 && (
              <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-8 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div className="flex justify-between text-xs text-slate-400 mb-2">
                      <span>Metre Bridge Calibrated 100cm Slide-Wire</span>
                      <span className="font-mono text-amber-400 font-bold">Jockey Pos: {jockeyPositionCm.toFixed(1)} cm</span>
                    </div>

                    <svg viewBox="0 0 400 140" className="w-full bg-slate-900 rounded-lg p-2" aria-label="Metre Bridge Schematic and Jockey Slider">
                      <path d="M 20 40 L 60 40 L 60 60 L 20 60 Z" fill="#d97706" />
                      <path d="M 90 40 L 310 40 L 310 60 L 90 60 Z" fill="#d97706" />
                      <path d="M 340 40 L 380 40 L 380 60 L 340 60 Z" fill="#d97706" />

                      <rect x="63" y="25" width="24" height="15" rx="3" fill="#1e293b" stroke="#60a5fa" />
                      <text x="75" y="36" fill="#93c5fd" fontSize="8" textAnchor="middle">
                        R={bridgeR}Ω
                      </text>

                      <rect x="313" y="25" width="24" height="15" rx="3" fill="#1e293b" stroke="#f43f5e" />
                      <text x="325" y="36" fill="#fda4af" fontSize="8" textAnchor="middle">
                        X={bridgeUnknownX}Ω
                      </text>

                      <line x1="20" y1="100" x2="380" y2="100" stroke="#cbd5e1" strokeWidth="3" />

                      <line
                        x1={20 + (jockeyPositionCm / 100) * 360}
                        y1="100"
                        x2={20 + (jockeyPositionCm / 100) * 360}
                        y2="70"
                        stroke="#38bdf8"
                        strokeWidth="2"
                      />
                      <polygon
                        points={`${20 + (jockeyPositionCm / 100) * 360},100 ${15 + (jockeyPositionCm / 100) * 360},88 ${
                          25 + (jockeyPositionCm / 100) * 360
                        },88`}
                        fill="#38bdf8"
                      />

                      <circle cx="200" cy="50" r="16" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
                      <text x="200" y="53" fill="#34d399" fontSize="9" textAnchor="middle" fontWeight="bold">
                        G
                      </text>
                    </svg>

                    <div className="mt-4">
                      <input
                        type="range"
                        min={1}
                        max={99}
                        step={0.1}
                        value={jockeyPositionCm}
                        onChange={(e) => setJockeyPositionCm(parseFloat(e.target.value))}
                        aria-label="Metre Bridge Jockey Position in Centimetres"
                        className="w-full accent-gold-500"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-4 bg-slate-950 p-4 rounded-xl border border-slate-800 text-center space-y-3">
                    <span className="text-xs font-bold text-slate-400 uppercase">Galvanometer Micro-Ammeter</span>
                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                      <div className="text-2xl font-mono font-black text-emerald-400">{galvanometerCurrentUg.toFixed(1)} μA</div>
                      <span className="text-[10px] text-slate-500">
                        {Math.abs(galvanometerCurrentUg) < 0.5 ? '✓ PERFECT NULL DEFLECTION (BALANCED)' : '✗ CURRENT DETECTED'}
                      </span>
                    </div>

                    <div className="text-left text-xs space-y-1.5 pt-2 border-t border-slate-800">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Known R:</span>
                        <span className="font-mono text-white font-bold">{bridgeR} Ω</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Target Unknown X:</span>
                        <span className="font-mono text-white font-bold">{bridgeUnknownX} Ω</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Exact Theoretical Null:</span>
                        <span className="font-mono text-emerald-400 font-bold">{bridgeNullPosExact.toFixed(1)} cm</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ─── LAB 4: POTENTIOMETER & POTENTIAL GRADIENT ─── */}
            {currentSlide === 3 && (
              <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold text-gold-400 uppercase">Driver Primary Circuit</h3>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-400">Driver Accumulator (ε_driver):</span>
                        <span className="font-mono text-white font-bold">{potDriverEmf.toFixed(1)} V</span>
                      </div>
                      <input
                        type="range"
                        min={2}
                        max={8}
                        step={0.1}
                        value={potDriverEmf}
                        onChange={(e) => setPotDriverEmf(parseFloat(e.target.value))}
                        aria-label="Potentiometer Driver Emf in Volts"
                        className="w-full accent-gold-500"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-400">Driver Series Rheostat:</span>
                        <span className="font-mono text-white font-bold">{potRheostatR.toFixed(1)} Ω</span>
                      </div>
                      <input
                        type="range"
                        min={1}
                        max={20}
                        step={0.5}
                        value={potRheostatR}
                        onChange={(e) => setPotRheostatR(parseFloat(e.target.value))}
                        aria-label="Potentiometer Driver Rheostat Resistance in Ohms"
                        className="w-full accent-gold-500"
                      />
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Potential Gradient K:</span>
                        <span className="font-mono text-gold-400 font-bold">{(potGradientK * 1000).toFixed(2)} mV/cm</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xs font-bold text-amber-400 uppercase">Secondary Test Cell Circuit</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-300">Shunt Key State:</span>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setPotShuntKeyClosed(!potShuntKeyClosed)}
                        aria-label="Toggle Potentiometer Shunt Key"
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                          potShuntKeyClosed ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {potShuntKeyClosed ? 'KEY CLOSED (Measures V)' : 'KEY OPEN (Measures Emf ε)'}
                      </motion.button>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-400">Jockey Contact Distance l:</span>
                        <span className="font-mono text-white font-bold">{potJockeyPosCm.toFixed(0)} cm</span>
                      </div>
                      <input
                        type="range"
                        min={10}
                        max={400}
                        step={1}
                        value={potJockeyPosCm}
                        onChange={(e) => setPotJockeyPosCm(parseFloat(e.target.value))}
                        aria-label="Potentiometer Jockey Contact Distance in Centimetres"
                        className="w-full accent-amber-500"
                      />
                    </div>

                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Galvanometer Null Balance at:</span>
                        <span className="font-mono text-emerald-400 font-bold">{potBalanceLengthExactCm.toFixed(1)} cm</span>
                      </div>
                      <div className="flex justify-between mt-1">
                        <span className="text-slate-400">Current Galvo Deflection:</span>
                        <span className={`font-mono font-bold ${Math.abs(potGalvoCurrentUa) < 1 ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {Math.abs(potGalvoCurrentUa) < 1 ? '✓ ' : '✗ '}
                          {potGalvoCurrentUa.toFixed(1)} μA
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ─── LAB 5: BIOT-SAVART COIL & SOLENOID MAGNETISM ─── */}
            {currentSlide === 4 && (
              <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-6">
                <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveMagTab('loop')}
                    aria-label="Select Circular Current Loop"
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                      activeMagTab === 'loop' ? 'bg-gold-600 text-white' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    Circular Current Loop
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveMagTab('solenoid')}
                    aria-label="Select Helical Solenoid"
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                      activeMagTab === 'solenoid' ? 'bg-gold-600 text-white' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    Helical Solenoid
                  </motion.button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  <div className="lg:col-span-7 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <canvas ref={magCanvasRef} width={420} height={180} className="w-full bg-slate-950 rounded-lg" />
                  </div>

                  <div className="lg:col-span-5 space-y-3 text-xs">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-slate-400">Coil Current I:</span>
                        <span className="font-mono text-emerald-400 font-bold">{magCurrentI.toFixed(1)} A</span>
                      </div>
                      <input
                        type="range"
                        min={0.5}
                        max={10.0}
                        step={0.1}
                        value={magCurrentI}
                        onChange={(e) => setMagCurrentI(parseFloat(e.target.value))}
                        aria-label="Coil Current in Amperes"
                        className="w-full accent-emerald-500"
                      />
                    </div>

                    {activeMagTab === 'loop' ? (
                      <>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-slate-400">Coil Radius R:</span>
                            <span className="font-mono text-gold-400 font-bold">{(magCoilRadiusR * 100).toFixed(1)} cm</span>
                          </div>
                          <input
                            type="range"
                            min={0.02}
                            max={0.2}
                            step={0.01}
                            value={magCoilRadiusR}
                            onChange={(e) => setMagCoilRadiusR(parseFloat(e.target.value))}
                            aria-label="Coil Radius in Metres"
                            className="w-full accent-gold-500"
                          />
                        </div>
                        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1 font-mono">
                          <div className="flex justify-between">
                            <span className="text-slate-400">B at Centre:</span>
                            <span className="text-emerald-400 font-bold">{(loopCenterB_Tesla * 1000).toFixed(3)} mT</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">Magnetic Dipole Moment m:</span>
                            <span className="text-amber-400 font-bold">{loopDipoleMoment.toFixed(3)} A·m²</span>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-slate-400">Turn Density n (turns/m):</span>
                            <span className="font-mono text-gold-400 font-bold">{solenoidTurnsPerM} m⁻¹</span>
                          </div>
                          <input
                            type="range"
                            min={500}
                            max={5000}
                            step={100}
                            value={solenoidTurnsPerM}
                            onChange={(e) => setSolenoidTurnsPerM(parseInt(e.target.value))}
                            aria-label="Solenoid Turn Density in turns per metre"
                            className="w-full accent-gold-500"
                          />
                        </div>
                        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1 font-mono">
                          <div className="flex justify-between">
                            <span className="text-slate-400">Internal Uniform B:</span>
                            <span className="text-emerald-400 font-bold">{(solenoidB_Tesla * 1000).toFixed(2)} mT</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">Field at End (1/2 B):</span>
                            <span className="text-amber-400 font-bold">{(solenoidB_Tesla * 500).toFixed(2)} mT</span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* ─── BRILLIANT.ORG INTERACTIVE PREDICT-THEN-CHECK CARD ─── */}
            <div className="p-5 rounded-2xl bg-gold-950/40 border border-gold-800/60 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gold-400 uppercase tracking-wider">
                  🔮 Brilliant Predict-Then-Check Experiment ({predIdx + 1} of {PREDICTION_QUESTIONS.length})
                </span>
                {PREDICTION_QUESTIONS.length > 1 && (
                  <button
                    onClick={() => {
                      setPredIdx((prev) => (prev + 1) % PREDICTION_QUESTIONS.length);
                      setPredAnswered(false);
                      setPredSelected(null);
                      setPredVerified(false);
                    }}
                    className="text-xs text-gold-300 underline"
                  >
                    Next Prediction →
                  </button>
                )}
              </div>
              <h3 className="text-sm font-bold text-white">{PREDICTION_QUESTIONS[predIdx].question}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {PREDICTION_QUESTIONS[predIdx].options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handlePredictionSelect(i)}
                    className={`p-3 rounded-xl text-left text-xs font-medium border transition-all ${
                      predSelected === i
                        ? i === PREDICTION_QUESTIONS[predIdx].correctIndex
                          ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
                          : 'bg-rose-950 border-rose-500 text-rose-200'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    {String.fromCharCode(65 + i)}. {opt}
                  </button>
                ))}
              </div>
              {predAnswered && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2 p-3 bg-slate-950 rounded-xl border border-gold-900/60 text-xs text-slate-300 space-y-1.5">
                  <p className="font-semibold text-amber-300">🔍 How to verify in the lab:</p>
                  <p>{PREDICTION_QUESTIONS[predIdx].verifyInstruction}</p>
                  <p className="text-slate-400 pt-1 border-t border-slate-800">{PREDICTION_QUESTIONS[predIdx].explanation}</p>
                </motion.div>
              )}
            </div>

            {/* ─── BRILLIANT.ORG OBSERVATION CARD ('What Do You Notice?') ─── */}
            <div className="p-5 rounded-2xl bg-gold-950/40 border border-gold-800/60 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gold-400 uppercase tracking-wider">
                  👁️ Visual Observation Challenge ({obsIdx + 1} of {OBSERVATION_QUESTIONS.length})
                </span>
                {OBSERVATION_QUESTIONS.length > 1 && (
                  <button
                    onClick={() => {
                      setObsIdx((prev) => (prev + 1) % OBSERVATION_QUESTIONS.length);
                      setObsAnswered(false);
                      setObsSelected(null);
                    }}
                    className="text-xs text-gold-300 underline"
                  >
                    Next Observation →
                  </button>
                )}
              </div>
              <h3 className="text-sm font-bold text-white">{OBSERVATION_QUESTIONS[obsIdx].question}</h3>
              <div className="space-y-2">
                {OBSERVATION_QUESTIONS[obsIdx].observableOptions.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleObservationSelect(i)}
                    className={`w-full p-3 rounded-xl text-left text-xs font-medium border transition-all ${
                      obsSelected === i
                        ? i === OBSERVATION_QUESTIONS[obsIdx].correctIndex
                          ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
                          : 'bg-rose-950 border-rose-500 text-rose-200'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              {obsAnswered && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2 p-3 bg-slate-950 rounded-xl border border-gold-900/60 text-xs text-slate-300">
                  <p className="font-semibold text-emerald-400">✓ Physical Analysis:</p>
                  <p>{OBSERVATION_QUESTIONS[obsIdx].explanation}</p>
                </motion.div>
              )}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ─── PHASE 3: FREE SANDBOX PLAY ─── */}
      <AnimatePresence mode="wait">
        {phase === 'sandbox' && (
          <motion.section
            key="sandbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-white">Free Electrodynamics Sandbox</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Manipulate all circuit parameters simultaneously without time limits or grading.
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                aria-label="Proceed to graded challenges"
                className="px-6 py-3 rounded-xl bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-600/30"
              >
                Ready for Graded Challenges →
              </motion.button>
            </div>

            {/* Sandbox Console */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                <span className="text-xs font-bold text-gold-400 uppercase">1. Power Source (Emf & r)</span>
                <div>
                  <div className="flex justify-between text-xs">
                    <span>Emf ε:</span>
                    <span className="font-mono">{cellEmf}V</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={24}
                    value={cellEmf}
                    onChange={(e) => setCellEmf(parseFloat(e.target.value))}
                    aria-label="Sandbox Emf"
                    className="w-full accent-gold-500"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-xs">
                    <span>Load R:</span>
                    <span className="font-mono">{loadResistance}Ω</span>
                  </div>
                  <input
                    type="range"
                    min={0.2}
                    max={20}
                    step={0.2}
                    value={loadResistance}
                    onChange={(e) => setLoadResistance(parseFloat(e.target.value))}
                    aria-label="Sandbox Load Resistance"
                    className="w-full accent-amber-500"
                  />
                </div>
                <div className="text-xs font-mono text-emerald-400 pt-2 border-t border-slate-800">
                  Terminal V: {cellTerminalVoltage.toFixed(2)} V
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                <span className="text-xs font-bold text-amber-400 uppercase">2. Metre Bridge Ratio</span>
                <div>
                  <div className="flex justify-between text-xs">
                    <span>Jockey l₁:</span>
                    <span className="font-mono">{jockeyPositionCm} cm</span>
                  </div>
                  <input
                    type="range"
                    min={5}
                    max={95}
                    value={jockeyPositionCm}
                    onChange={(e) => setJockeyPositionCm(parseFloat(e.target.value))}
                    aria-label="Sandbox Jockey Position"
                    className="w-full accent-amber-500"
                  />
                </div>
                <div className="text-xs font-mono text-gold-400 pt-2 border-t border-slate-800">
                  Galvo Ig: {galvanometerCurrentUg.toFixed(1)} μA
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                <span className="text-xs font-bold text-emerald-400 uppercase">3. Solenoid Flux Core</span>
                <div>
                  <div className="flex justify-between text-xs">
                    <span>Current I:</span>
                    <span className="font-mono">{magCurrentI} A</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={15}
                    value={magCurrentI}
                    onChange={(e) => setMagCurrentI(parseFloat(e.target.value))}
                    aria-label="Sandbox Magnetic Current"
                    className="w-full accent-emerald-500"
                  />
                </div>
                <div className="text-xs font-mono text-emerald-400 pt-2 border-t border-slate-800">
                  B Core: {(solenoidB_Tesla * 1000).toFixed(2)} mT
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ─── PHASE 4: CHALLENGE MODE ─── */}
      <AnimatePresence mode="wait">
        {phase === 'challenge' && (
          <motion.section
            key="challenge"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            {/* Progress & Tier Bar */}
            <div className="flex items-center justify-between bg-slate-900 p-4 rounded-2xl border border-slate-800">
              <div>
                <span className="text-xs font-mono text-slate-400">
                  Challenge {currentChallenge + 1} of {filteredChallenges.length}
                </span>
                <span className="ml-3 px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-gold-950 text-gold-300 border border-gold-800">
                  NEP Competency: {currentCh.competencyLevel}
                </span>
              </div>
              <span className="text-xs font-bold font-mono text-emerald-400">
                Score: {scoreBreakdown.correct} / {scoreBreakdown.total}
              </span>
            </div>

            {/* Progress bar */}
            <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
              <motion.div
                className="h-full bg-gradient-to-r from-gold-500 to-gold-500"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              />
            </div>

            {/* Challenge Question Card */}
            <motion.div
              animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
              transition={{ duration: 0.4 }}
              className={`p-6 rounded-2xl bg-slate-900 border transition-all ${
                wrongFlash ? 'bg-rose-950/60 border-rose-500' : 'border-slate-800'
              }`}
            >
              <h2 className="text-base md:text-lg font-bold text-white mb-4 leading-relaxed">{currentCh.question}</h2>

              {/* MCQ Options Rendering */}
              {(currentCh.type === 'classify' || currentCh.type === 'distinguish' || currentCh.type === 'match') && currentCh.options && (
                <div className="space-y-3">
                  {currentCh.options.map((option, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.015 }}
                      whileTap={{ scale: 0.985 }}
                      onClick={() => handleAnswerSubmit(idx)}
                      disabled={showExplanation || answerRevealed}
                      aria-label={`Option ${String.fromCharCode(65 + idx)}: ${option}`}
                      className={`w-full p-4 rounded-xl text-left text-sm font-medium transition-all border ${
                        showExplanation && idx === currentCh.correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                          : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-lg bg-slate-800 flex items-center justify-center font-mono text-xs">
                          {showExplanation && idx === currentCh.correctIndex ? '✓' : String.fromCharCode(65 + idx)}
                        </span>
                        <span>{option}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}

              {/* Drag-Label Rendering */}
              {currentCh.type === 'drag-label' && currentCh.dragItems && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                    {currentCh.dragItems.map((item, idx) => (
                      <motion.div
                        key={idx}
                        draggable
                        role="button"
                        tabIndex={0}
                        aria-label={`Draggable item ${item.label}`}
                        onDragStart={() => handleDragStart(item.label)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 py-1.5 rounded-lg bg-gold-600 text-white text-xs font-bold cursor-grab active:cursor-grabbing shadow"
                      >
                        ⠿ {item.label}
                      </motion.div>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {Object.keys(currentCh.correctMapping || {}).map((targetId) => (
                      <div
                        key={targetId}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => handleDragDrop(targetId)}
                        aria-label={`Drop target for ${targetId}`}
                        className={`p-4 rounded-xl border-2 border-dashed text-center min-h-[70px] flex flex-col items-center justify-center text-xs ${
                          droppedLabels[targetId]
                            ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300 font-bold'
                            : 'bg-slate-950/50 border-slate-700 text-slate-400'
                        }`}
                      >
                        <span className="text-[10px] text-slate-500 uppercase">{targetId}</span>
                        <span>{droppedLabels[targetId] ? `✓ ${droppedLabels[targetId]}` : 'Drop Label Here'}</span>
                      </div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswerSubmit(droppedLabels)}
                    aria-label="Validate Labels"
                    className="mt-2 px-5 py-2.5 rounded-xl bg-gold-600 text-white font-bold text-xs"
                  >
                    Validate Labels
                  </motion.button>
                </div>
              )}

              {/* Drag-Sort Rendering */}
              {currentCh.type === 'drag-sort' && currentCh.sortItems && (
                <div className="space-y-3">
                  {(sortArrangement.length === currentCh.sortItems.length
                    ? sortArrangement.map((idx) => currentCh.sortItems![idx])
                    : currentCh.sortItems
                  ).map((item, idx) => (
                    <motion.div
                      key={idx}
                      draggable
                      role="button"
                      tabIndex={0}
                      aria-label={`Step ${idx + 1}: ${item}`}
                      onDragStart={() => handleDragStart(String(idx))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const from = parseInt(draggedItem || '0');
                        handleSortItemMove(from, idx);
                      }}
                      className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-3 text-xs text-slate-300 cursor-grab"
                    >
                      <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-400 font-mono flex items-center justify-center text-[10px]">
                        {idx + 1}
                      </span>
                      <span>{item}</span>
                    </motion.div>
                  ))}

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() =>
                      handleAnswerSubmit(
                        sortArrangement.length ? sortArrangement : currentCh.sortItems?.map((_, i) => i) || []
                      )
                    }
                    aria-label="Submit Ordered Steps"
                    className="mt-2 px-5 py-2.5 rounded-xl bg-gold-600 text-white font-bold text-xs"
                  >
                    Submit Ordered Steps
                  </motion.button>
                </div>
              )}

              {/* Numeric Input Rendering */}
              {currentCh.type === 'numeric' && (
                <div className="flex flex-wrap items-center gap-3 mt-4">
                  <input
                    type="number"
                    step="any"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter numerical value..."
                    aria-label="Numerical Answer Input"
                    className="px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-sm focus:outline-none focus:border-gold-500"
                  />
                  <span className="text-sm font-mono text-slate-400 font-bold">{currentCh.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswerSubmit(numericInput)}
                    disabled={showExplanation}
                    aria-label="Check Numeric Answer"
                    className="px-6 py-3 rounded-xl bg-gold-600 text-white font-bold text-xs uppercase tracking-wider"
                  >
                    Check Answer
                  </motion.button>
                </div>
              )}

              {/* Construct Formula Rendering */}
              {currentCh.type === 'construct' && currentCh.availableParts && (
                <div className="space-y-4 mt-4">
                  <p className="text-xs text-slate-400">{currentCh.validationHint}</p>
                  <div className="flex flex-wrap gap-2">
                    {currentCh.availableParts.map((part, idx) => (
                      <motion.button
                        key={idx}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setConstructParts((prev) => [...prev, part])}
                        aria-label={`Add part ${part}`}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 text-gold-300 font-mono text-xs font-bold border border-slate-700"
                      >
                        + {part}
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 min-h-[50px] flex flex-wrap gap-2 items-center">
                    {constructParts.map((p, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded bg-gold-950 text-gold-200 font-mono text-xs flex items-center gap-1.5">
                        {p}
                        <button onClick={() => setConstructParts((prev) => prev.filter((_, i) => i !== idx))} aria-label={`Remove part ${p}`} className="text-rose-400">
                          ✕
                        </button>
                      </span>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswerSubmit(constructParts.join(' '))}
                    aria-label="Verify Formula Construction"
                    className="px-5 py-2.5 rounded-xl bg-gold-600 text-white font-bold text-xs"
                  >
                    Verify Formula
                  </motion.button>
                </div>
              )}

              {/* Step-by-Step Progressive Disclosure Explanation */}
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-5 rounded-xl bg-amber-950/40 border border-amber-800/80 space-y-3"
                >
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                    Step-by-Step Rigorous Physical Derivation:
                  </span>
                  {currentCh.explanation
                    .split('. ')
                    .filter((s) => s.trim().length > 0)
                    .slice(0, revealedSteps + 1)
                    .map((sentence, idx) => (
                      <motion.p key={idx} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-xs text-amber-200/90 leading-relaxed">
                        <strong className="text-amber-400 font-mono">{idx + 1}.</strong> {sentence}
                        {!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}

                  {revealedSteps <
                    currentCh.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setRevealedSteps((s) => s + 1)}
                      aria-label="Show next logical derivation step"
                      className="mt-2 px-4 py-2 rounded-lg bg-amber-800/80 text-white text-xs font-bold"
                    >
                      Show Next Logical Step →
                    </motion.button>
                  )}

                  {revealedSteps >=
                    currentCh.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      aria-label="Proceed to next challenge"
                      className="block mt-4 px-6 py-3 rounded-xl bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-600/25"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Mastery Assessment →' : 'Proceed to Next Challenge →'}
                    </motion.button>
                  )}
                </motion.div>
              )}
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ─── PHASE 5: COMPLETION, REFLECTION & SPACED REPETITION ─── */}
      <AnimatePresence mode="wait">
        {phase === 'complete' && (
          <motion.section
            key="complete"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-gold-950 border border-gold-800 text-center space-y-4 shadow-2xl">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-5xl">
                🏆
              </motion.div>
              <h2 className="text-2xl font-black text-white">ISC Electrodynamics Super-Lab Mastered!</h2>
              <div className="flex justify-center gap-6 text-sm font-mono">
                <div>
                  <span className="text-slate-400 block text-xs">Final Precision Score</span>
                  <span className="text-2xl font-black text-emerald-400">{Math.max(0, 100 - errors * 5)}%</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">BKT Mastery Tier</span>
                  <span className="text-2xl font-black text-gold-400 uppercase">{masteryLevel}</span>
                </div>
              </div>

              {/* Feedback Banner */}
              <div className="p-4 rounded-xl bg-slate-950 border border-gold-900/60 text-xs text-gold-200">
                {errors === 0
                  ? '✓ PERFECT SCORE! You have mastered all derivations and problem-solving techniques for ISC Class 12!'
                  : errors <= 3
                  ? '✓ Outstanding work! Your analytical physics foundation across internal resistance, bridges, and magnetic fields is rock solid.'
                  : '✗ Review your misconception profile below and re-test in 24 hours.'}
              </div>
            </div>

            {/* Misconceptions Remediation Profile */}
            {hitMisconceptions.length > 0 && (
              <div className="p-6 rounded-2xl bg-rose-950/40 border border-rose-800 space-y-3">
                <h3 className="text-sm font-bold text-rose-300 uppercase tracking-wider">
                  ⚠️ Your Diagnostic Misconception Profile:
                </h3>
                {hitMisconceptions.map((idx) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-rose-900/50 text-xs space-y-1">
                      <div className="text-rose-400 font-semibold">✗ Identified Fallacy: {m.misconception}</div>
                      <div className="text-emerald-400">✓ Physical Correction: {m.correction}</div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* ─── PROMINENT SPACED REPETITION (SRS) SCHEDULE VISIBILITY ─── */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-gold-950/70 to-gold-950/70 border border-gold-700/60 shadow-xl space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">📅</span>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-gold-300">
                    Spaced Repetition Schedule (SuperMemo SM-2)
                  </h3>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${
                  errors === 0
                    ? 'bg-emerald-950 text-emerald-300 border-emerald-600'
                    : errors <= 3
                    ? 'bg-gold-950 text-gold-300 border-gold-600'
                    : 'bg-rose-950 text-rose-300 border-rose-600'
                }`}>
                  Next Review: {errors === 0 ? 'in 7 days' : errors <= 3 ? 'in 3 days' : 'in 1 day'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className={`p-3 rounded-xl border ${errors === 0 ? 'bg-emerald-950/50 border-emerald-500 font-bold text-emerald-200 ring-2 ring-emerald-500/30' : 'bg-slate-900/60 border-slate-800 text-slate-400'}`}>
                  <div className="text-[10px] uppercase text-emerald-400 font-bold mb-1">0 Errors (High Mastery)</div>
                  <div>Review in <span className="text-white font-bold">7 days</span></div>
                  <div className="text-[10px] text-slate-400 mt-1">Long-term memory consolidation interval.</div>
                </div>

                <div className={`p-3 rounded-xl border ${errors >= 1 && errors <= 3 ? 'bg-gold-950/50 border-gold-500 font-bold text-gold-200 ring-2 ring-gold-500/30' : 'bg-slate-900/60 border-slate-800 text-slate-400'}`}>
                  <div className="text-[10px] uppercase text-gold-400 font-bold mb-1">1–3 Errors (Moderate)</div>
                  <div>Review in <span className="text-white font-bold">3 days</span></div>
                  <div className="text-[10px] text-slate-400 mt-1">Medium retention reinforcement loop.</div>
                </div>

                <div className={`p-3 rounded-xl border ${errors >= 4 ? 'bg-rose-950/50 border-rose-500 font-bold text-rose-200 ring-2 ring-rose-500/30' : 'bg-slate-900/60 border-slate-800 text-slate-400'}`}>
                  <div className="text-[10px] uppercase text-rose-400 font-bold mb-1">4+ Errors (Needs Practice)</div>
                  <div>Review in <span className="text-white font-bold">1 day</span></div>
                  <div className="text-[10px] text-slate-400 mt-1">Immediate concept recovery session.</div>
                </div>
              </div>

              <p className="text-xs text-slate-300">
                Your performance has been logged to your adaptive memory graph. SM-2 intervals adjust automatically based on error patterns and concept retention.
              </p>
            </div>

            {/* Real-World Capstone Activity */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">{REAL_WORLD_ACTIVITY.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400">
                    <span className="font-bold text-gold-400">Phase {idx + 1}:</span> {step}
                  </div>
                ))}
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ─── FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Simulation Challenge Completed!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C12_PhysicsInternalResistanceSim;