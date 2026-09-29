'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS ───
const NODE_C12_PHY_041 = 'c12_phy_041'; // Ampere's circuital law
const NODE_C12_PHY_042 = 'c12_phy_042'; // Force on a moving charge (F = qv x B)
const NODE_C12_PHY_043 = 'c12_phy_043'; // Lorentz force (combined E and B)
const NODE_C12_PHY_044 = 'c12_phy_044'; // Force on current-carrying conductor (F = IL x B)
const NODE_C12_PHY_045 = 'c12_phy_045'; // Force between parallel conductors
const NODE_C12_PHY_046 = 'c12_phy_046'; // Torque on current loop (tau = m x B)
const NODE_C12_PHY_047 = 'c12_phy_047'; // Moving coil galvanometer
const NODE_C12_PHY_048 = 'c12_phy_048'; // Galvanometer to ammeter
const NODE_C12_PHY_049 = 'c12_phy_049'; // Galvanometer to voltmeter
const NODE_C12_PHY_050 = 'c12_phy_050'; // Bar magnet as equivalent solenoid

const ALL_NODE_IDS = [
  NODE_C12_PHY_041,
  NODE_C12_PHY_042,
  NODE_C12_PHY_043,
  NODE_C12_PHY_044,
  NODE_C12_PHY_045,
  NODE_C12_PHY_046,
  NODE_C12_PHY_047,
  NODE_C12_PHY_048,
  NODE_C12_PHY_049,
  NODE_C12_PHY_050,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Mission: The Tokamak & Precision Metro Instrumentation Lab',
  intro: 'You are the chief electromagnetics instrumentation engineer at the Indian Institute of Science (IISc) testing magnetohydrodynamic steering for a fusion prototype and calibrating rugged analog meters for the Mumbai Metro power grid.',
  context: 'High-current busbars generate massive mutual forces, charged alpha particles spiral through crossed magnetic fields, and delicate galvanometer suspensions must measure currents from microamps to kiloamps without burning out.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'Two heavy copper busbars in the metro substation carry 2000 A each in the SAME direction. What happens to the busbars when power is switched on?',
  options: [
    'They violently repel each other because like currents repel (like like charges)',
    'They attract each other with a strong magnetic force',
    'No mechanical force acts because the electric fields cancel out',
    'They twist perpendicular to each other into a cross shape',
  ],
  correctIndex: 1,
  hintAfter: "Surprise! Unlike static electric charges where 'like repels like', magnetic forces on parallel currents are governed by F = IL x B. Currents in the same direction ATTRACT! Let's explore why.",
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

// ─── CHALLENGES ARRAY ───
const CHALLENGES: Challenge[] = [
  // FOUNDATION 1 - Recall (Ampere's law)
  {
    id: 'ch_01',
    nodeId: NODE_C12_PHY_041,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: "Ampere's Circuital Law is mathematically expressed as ∮ B · dl = μ₀I_enc. What physical quantity does the closed line integral ∮ B · dl represent?",
    options: [
      'Total magnetic flux passing through the loop surface',
      'Magnetic field circulation around the closed Amperian loop',
      'Electric potential difference generated around the loop',
      'Total mechanical work done on a current by the magnetic field',
    ],
    correctIndex: 1,
    explanation: 'The line integral ∮ B · dl is defined as the magnetic field circulation. It sums the tangential component of B along a closed curve and equals μ₀ times the net current piercing the surface bounded by that curve.',
    hints: [
      'Look at the differential element dl: you are taking a dot product along a path.',
      'Unlike flux (which integrates B · dA over an area), this integrates along a perimeter.',
      'This quantity measures the total "twist" or circulation of the magnetic field.',
    ],
    misconceptionIndex: 0,
  },
  // FOUNDATION 2 - Understanding (Lorentz work done)
  {
    id: 'ch_02',
    nodeId: NODE_C12_PHY_042,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'A proton moves at speed v perpendicular to a uniform magnetic field B. How much work is done by the magnetic force on the proton over one complete circular orbit?',
    options: [
      'Exactly 0 J because the magnetic force is always perpendicular to instantaneous velocity (F · v = 0)',
      'W = 2π r · (qvB) Joules per orbit',
      'W = (1/2) m v² Joules',
      'W = q v B / (2π m) Joules',
    ],
    correctIndex: 0,
    explanation: 'The magnetic force is F = q(v x B). By vector properties, F is perpendicular to v at every instant. Since work rate P = F · v = 0, the magnetic force does zero work. It alters direction only, never kinetic energy or speed.',
    hints: [
      'Recall the definition of mechanical work: dW = F · ds = (F · v) dt.',
      'What is the angle between the cross product (v x B) and the velocity vector v?',
      'Since cos(90°) = 0, instantaneous work is identically zero.',
    ],
    misconceptionIndex: 1,
  },
  // FOUNDATION 3 - Drag Label (Galvanometer Components)
  {
    id: 'ch_03',
    nodeId: NODE_C12_PHY_047,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag the key constructional parts of the Moving Coil Galvanometer to their correct structural roles.',
    dragItems: [
      { label: 'Soft Iron Core', targetId: 'core' },
      { label: 'Concave Pole Pieces', targetId: 'poles' },
      { label: 'Phosphor Bronze Wire', targetId: 'suspension' },
      { label: 'Rectangular Coil', targetId: 'coil' },
    ],
    correctMapping: {
      core: 'Soft Iron Core',
      poles: 'Concave Pole Pieces',
      suspension: 'Phosphor Bronze Wire',
      coil: 'Rectangular Coil',
    },
    explanation: 'Concave magnetic poles and the cylindrical soft iron core produce a strictly radial field (sin θ = 1 always), the phosphor-bronze suspension gives a small, reliable torsion constant k, and the rectangular coil provides deflecting torque τ = NIAB.',
    hints: [
      'The core sits inside the coil to concentrate flux lines.',
      'The poles are curved cylindrically to keep the field radial.',
      'The suspension provides restoring torque with a tiny, stable torsion constant.',
    ],
  },
  // FOUNDATION 4 - Recall (Ampere definition)
  {
    id: 'ch_04',
    nodeId: NODE_C12_PHY_045,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the exact mutual force per unit length between two infinitely long parallel conductors 1 m apart in vacuum carrying 1 A each?',
    options: [
      '2 × 10⁻⁷ N/m',
      '4π × 10⁻⁷ N/m',
      '1.0 N/m',
      '6.28 × 10⁻⁵ N/m',
    ],
    correctIndex: 0,
    explanation: 'By formula F/L = μ₀ I₁ I₂ / (2π d) = (4π × 10⁻⁷ × 1 × 1) / (2π × 1) = 2 × 10⁻⁷ N/m. This exact force is the historical basis for the SI definition of the ampere.',
    hints: [
      'Use the formula F/L = μ₀ I₁ I₂ / (2π d).',
      'μ₀ is 4π × 10⁻⁷ T·m/A. The factor 2π cancels 4π to leave a factor of 2.',
      '2 × 10⁻⁷ N/m is the canonical definition value.',
    ],
    misconceptionIndex: 2,
  },
  // FOUNDATION 5 - Understanding (Bar magnet field lines)
  {
    id: 'ch_05',
    nodeId: NODE_C12_PHY_050,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'How do magnetic field lines behave INSIDE a permanent bar magnet compared to OUTSIDE?',
    options: [
      'Outside from N to S, inside continuing from S to N forming continuous closed loops',
      'Outside from N to S, terminating abruptly at the south pole with no field inside',
      'Outside from S to N, inside from N to S',
      'Radial outward from both north and south poles',
    ],
    correctIndex: 0,
    explanation: 'Unlike electric field lines that originate on +q and end on -q, magnetic field lines have no start or end because magnetic monopoles do not exist. They form closed loops: N to S outside, S to N inside.',
    hints: [
      'Remember: isolated magnetic monopoles do not exist in nature (∇ · B = 0).',
      'If you break a magnet, you get two complete dipoles, never an isolated N or S pole.',
      'Therefore the field lines must loop all the way through the interior from S to N.',
    ],
    misconceptionIndex: 3,
  },
  // FOUNDATION 6 - Match (Equilibrium of current loop)
  {
    id: 'ch_06',
    nodeId: NODE_C12_PHY_046,
    type: 'match',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Match the angle φ between the magnetic moment m (normal to coil) and magnetic field B with the state of equilibrium:',
    options: [
      'φ = 0°: Stable Equilibrium; φ = 90°: Maximum Torque; φ = 180°: Unstable Equilibrium',
      'φ = 0°: Unstable Equilibrium; φ = 90°: Zero Torque; φ = 180°: Stable Equilibrium',
      'φ = 0°: Maximum Torque; φ = 90°: Stable Equilibrium; φ = 180°: Unstable Equilibrium',
      'φ = 0°: Stable Equilibrium; φ = 90°: Zero Torque; φ = 180°: Maximum Torque',
    ],
    correctIndex: 0,
    explanation: 'At φ = 0°, τ = 0 and potential energy U = -mB is at a minimum (stable). At φ = 90°, τ_max = mB. At φ = 180°, τ = 0 but U = +mB is at a maximum (unstable: any small perturbation flips it).',
    hints: [
      'Torque magnitude is τ = mB sin φ.',
      'Potential energy of a magnetic dipole is U = -m · B = -mB cos φ.',
      'Minimum potential energy corresponds to stable equilibrium.',
    ],
    misconceptionIndex: 4,
  },
  // STANDARD 1 - Application (Numeric - Straight Wire Field)
  {
    id: 'ch_07',
    nodeId: NODE_C12_PHY_041,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A straight transmission cable carries a DC current of 50 A. Calculate the magnetic field B at a perpendicular distance of 0.1 m from the wire in microtesla (μT). [Take μ₀ = 4π × 10⁻⁷ T·m/A]',
    correctAnswer: 100,
    tolerance: 2,
    unit: 'μT',
    explanation: 'Using Ampere\'s Law: B = μ₀I / (2πr) = (4π × 10⁻⁷ × 50) / (2π × 0.1) = 2 × 10⁻⁷ × 500 = 10⁻⁴ T = 100 μT.',
    hints: [
      'Formula: B = μ₀ I / (2π r).',
      'Notice (4π × 10⁻⁷) / (2π) = 2 × 10⁻⁷.',
      'Multiply (2 × 10⁻⁷) × 50 / 0.1 = 10⁻⁴ Tesla. Convert Tesla to μT (1 T = 10⁶ μT).',
    ],
  },
  // STANDARD 2 - Analysis (Velocity Selector)
  {
    id: 'ch_08',
    nodeId: NODE_C12_PHY_043,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'In a Thomson velocity selector, crossed fields E = 6.0 × 10⁴ V/m (downward) and B = 0.20 T (into page) are applied. An alpha particle (q = +2e, m = 4u) and an electron (q = -e, m = 1/1836 u) both enter horizontally. Which particles pass undeflected?',
    options: [
      'BOTH the alpha particle and electron pass undeflected if their velocity is exactly 3.0 × 10⁵ m/s',
      'Only the alpha particle because the electron has a negative charge and flips direction',
      'Only the electron because the alpha particle is 7300 times heavier',
      'Neither, because mass difference creates unequal centripetal acceleration',
    ],
    correctIndex: 0,
    explanation: 'In crossed fields, the no-deflection condition is qE = qvB, which simplifies to v = E/B = (6.0 × 10⁴) / 0.20 = 3.0 × 10⁵ m/s. Notice that charge q and mass m cancel completely! Any particle entering at v = E/B passes straight through.',
    hints: [
      'Write the balanced force equation: Electric force F_e = qE, Magnetic force F_m = qvB.',
      'Set qE = qvB. Does charge q or mass m remain in the equation for selected speed v?',
      'Since v = E/B depends only on field strengths, both pass undeflected at v = 3.0 × 10⁵ m/s.',
    ],
    misconceptionIndex: 5,
  },
  // STANDARD 3 - Drag Sort (Conversion to Ammeter Steps)
  {
    id: 'ch_09',
    nodeId: NODE_C12_PHY_048,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the sequence of physical derivations to convert a moving coil galvanometer (G, I_g) to an ammeter of range I:',
    sortItems: [
      'Identify that total current divides: I = I_g + I_s',
      'Connect low resistance shunt S in parallel with galvanometer coil',
      'Equate parallel potential differences: V_g = V_s ⇒ I_g · R_g = (I - I_g) · S',
      'Solve for shunt resistance: S = (I_g · R_g) / (I - I_g)',
    ],
    correctOrder: [1, 0, 2, 3],
    explanation: 'To convert to an ammeter: (1) Connect a low shunt S in parallel; (2) Current splits I = I_g + I_s; (3) Parallel potential equality I_g R_g = (I - I_g)S; (4) Solve S = I_g R_g / (I - I_g).',
    hints: [
      'Start with the physical circuit modification (connecting the shunt).',
      'Then state how current splits at the parallel junction.',
      'Next apply Ohm\'s Law for equal voltage across parallel branches.',
    ],
  },
  // STANDARD 4 - Application (Numeric - Voltmeter Multiplier)
  {
    id: 'ch_10',
    nodeId: NODE_C12_PHY_049,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A galvanometer with coil resistance R_g = 50 Ω gives full-scale deflection for I_g = 2 mA. Calculate the series resistance R in Ohms (Ω) required to convert it into a voltmeter of range 0 to 10 V.',
    correctAnswer: 4950,
    tolerance: 5,
    unit: 'Ω',
    explanation: 'Total voltage V = I_g(R + R_g) ⇒ R = V/I_g - R_g = 10 / (2 × 10⁻³) - 50 = 5000 - 50 = 4950 Ω. The 4950 Ω resistor drops 9.9 V, leaving 0.1 V safely across the galvanometer coil.',
    hints: [
      'Formula: R = V / I_g - R_g.',
      'Convert 2 mA to Amperes: 2 × 10⁻³ A. So V / I_g = 10 / 0.002 = 5000 Ω.',
      'Do not forget to subtract R_g = 50 Ω: 5000 - 50 = 4950 Ω.',
    ],
    misconceptionIndex: 6,
  },
  // STANDARD 5 - Application (Force on wire in magnetic field)
  {
    id: 'ch_11',
    nodeId: NODE_C12_PHY_044,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A horizontal copper wire of length 1.5 m carries a current of 8 A towards the East. A uniform magnetic field of 0.5 T points vertically UPWARD. Calculate the magnitude of the magnetic force on the wire in Newtons (N).',
    correctAnswer: 6.0,
    tolerance: 0.1,
    unit: 'N',
    explanation: 'F = I L B sin θ. Since East is perpendicular to Upward, θ = 90° and sin 90° = 1. F = 8 × 1.5 × 0.5 × 1 = 6.0 N. By right-hand rule (East x Up), force direction is South.',
    hints: [
      'Check the angle θ between East (horizontal) and Upward (vertical): θ = 90°.',
      'F = I · L · B · sin(90°).',
      'Compute 8 × 1.5 × 0.5 = 6.0 N.',
    ],
  },
  // STANDARD 6 - Evaluation (Sensitivity Trade-offs)
  {
    id: 'ch_12',
    nodeId: NODE_C12_PHY_047,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'A student doubles the number of turns N in a galvanometer coil to double its sensitivity. What happens to its CURRENT sensitivity (S_i) and VOLTAGE sensitivity (S_v)?',
    options: [
      'Current sensitivity S_i doubles, but Voltage sensitivity S_v remains roughly unchanged because coil resistance R also doubles',
      'Both S_i and S_v double exactly',
      'S_i remains unchanged while S_v quadruples',
      'Both S_i and S_v halve due to increased inertia',
    ],
    correctIndex: 0,
    explanation: 'S_i = NAB/k (proportional to N, so doubles). But S_v = NAB/(kR). Since doubling turns doubles wire length and resistance R, the factor of 2 in numerator and denominator cancels, leaving S_v virtually unchanged!',
    hints: [
      'Current sensitivity is S_i = φ / I = NAB / k.',
      'Voltage sensitivity is S_v = φ / V = NAB / (k·R).',
      'When you add twice as many turns of wire, what happens to the electrical resistance R of the coil?',
    ],
    misconceptionIndex: 7,
  },
  // ADVANCED 1 - Analysis (Helical Pitch in Tokamak)
  {
    id: 'ch_13',
    nodeId: NODE_C12_PHY_042,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A deuteron (q = 1.6 × 10⁻¹⁹ C, m = 3.34 × 10⁻²⁷ kg) enters a uniform B = 0.5 T field at an angle θ = 60° to the field lines with speed v = 2.0 × 10⁶ m/s. Calculate the pitch p of the helix in millimeters (mm). [p = v_parallel · T, take π = 3.1416]',
    correctAnswer: 26.2,
    tolerance: 0.8,
    unit: 'mm',
    explanation: 'v_parallel = v cos 60° = 2.0 × 10⁶ × 0.5 = 1.0 × 10⁶ m/s. Period T = 2πm / (qB) = (2 × 3.1416 × 3.34 × 10⁻²⁷) / (1.6 × 10⁻¹⁹ × 0.5) = 2.623 × 10⁻⁷ s. Pitch p = v_parallel × T = 1.0 × 10⁶ × 2.623 × 10⁻⁷ m = 0.02623 m = 26.2 mm.',
    hints: [
      'Resolve velocity: v_parallel = v cos(60°) = 1.0 × 10⁶ m/s.',
      'Compute cyclotron period T = 2π m / (q B).',
      'Pitch p = v_parallel × T. Convert meters to millimeters (× 1000).',
    ],
  },
  // ADVANCED 2 - Evaluation (Infinite vs Finite Solenoid Ampere Validity)
  {
    id: 'ch_14',
    nodeId: NODE_C12_PHY_041,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: "Why does Ampere's circuital law fail to give an exact analytical formula for the field B inside a SHORT, finite solenoid, even though the equation ∮ B · dl = μ₀I_enc remains mathematically true?",
    options: [
      'Translational symmetry is broken: end-fringing causes B to vary along the axis and escape into external space, so B cannot be factored out of the integral',
      "Ampere's law is invalid for any coil with non-zero resistance",
      'The permeability of free space μ₀ changes near the edges of a finite conductor',
      'The current inside finite turns cancels out due to self-inductance',
    ],
    correctIndex: 0,
    explanation: "Ampere's law ∮ B · dl = μ₀I_enc is universally valid, but it is only USEFUL for finding B when high spatial symmetry allows B to be constant along path segments and pulled out of the integral. In finite solenoids, fringing breaks this symmetry.",
    hints: [
      'Think about why Gauss\'s law is true for any charge, but only lets you solve E for spheres/cylinders/planes.',
      'Can you factor out B from ∫ B dl if B is changing at every millimeter along the path?',
      'Fringing magnetic fields at the ends destroy axial uniformity.',
    ],
    misconceptionIndex: 8,
  },
  // ADVANCED 3 - Construct (Ampere Circuital Derivation)
  {
    id: 'ch_15',
    nodeId: NODE_C12_PHY_041,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: "Construct the 4-step logical derivation of B = μ₀I/(2πr) for an infinite straight wire using Ampere's Law by selecting the equations in order:",
    availableParts: [
      '∮ B · dl = μ₀ I_enc',
      '∮ B dl cos(0°) = μ₀ I',
      'B ∮ dl = B(2πr) = μ₀ I',
      'B = μ₀ I / (2πr)',
      'B = μ₀ n I',
      'F = qvB',
    ],
    targetState: '∮ B · dl = μ₀ I_enc ∮ B dl cos(0°) = μ₀ I B ∮ dl = B(2πr) = μ₀ I B = μ₀ I / (2πr)',
    validationHint: "Select in order: (1) Ampere's general law -> (2) Dot product expansion with tangential field -> (3) Factoring B out of line integral (2πr) -> (4) Final solved field formula.",
    explanation: 'Ampere\'s Law ∮ B · dl = μ₀I expands to B(2πr) = μ₀I because cylindrical symmetry ensures constant magnitude B tangential to the circle, solving directly to B = μ₀I/(2πr).',
    hints: [
      'Step 1 must be the foundational statement of Ampere\'s circuital law.',
      'Step 2 evaluates the dot product B · dl with θ = 0°.',
      'Step 3 evaluates ∮ dl as circumference 2πr.',
      'Step 4 isolates B on the left hand side.',
    ],
  },
  // ADVANCED 4 - Creativity / Real-world Design (Ammeter Shunt Power Dissipation)
  {
    id: 'ch_16',
    nodeId: NODE_C12_PHY_048,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'A heavy-duty metro shunt converts a galvanometer (G = 100 Ω, I_g = 1 mA) to measure a fault current of 100 A. Calculate the electrical power dissipated as heat in the shunt resistor in Watts (W). [S = I_g R_g / (I - I_g)]',
    correctAnswer: 10,
    tolerance: 0.2,
    unit: 'W',
    explanation: 'Voltage across shunt V_s = I_g · R_g = (10⁻³ A) × (100 Ω) = 0.10 V. The current through the shunt is I_s = 100 - 0.001 ≈ 100 A. Power P = V_s · I_s = 0.10 V × 100 A = 10.0 W. Heavy heatsinking is required!',
    hints: [
      'First calculate the parallel voltage: V = I_g × R_g = 1 mA × 100 Ω = 0.1 V.',
      'The shunt carries almost the entire line current: I_s ≈ 100 A.',
      'Power dissipated in the shunt is P = V × I_s = 0.1 V × 100 A.',
    ],
  },
  // ADVANCED 5 - Analysis (Dipole moment of solenoid vs bar magnet)
  {
    id: 'ch_17',
    nodeId: NODE_C12_PHY_050,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'An equivalent solenoid designed to match a laboratory neodymium bar magnet (m = 1.25 A·m²) has cross-sectional radius r = 2.0 cm and carries 2.5 A. How many turns N must the solenoid have? [Take π = 3.1416]',
    correctAnswer: 398,
    tolerance: 5,
    unit: 'turns',
    explanation: 'Magnetic dipole moment m = N I A = N I (π r²). N = m / (I π r²) = 1.25 / (2.5 × 3.1416 × (0.02)²) = 1.25 / (2.5 × 3.1416 × 0.0004) = 1.25 / 0.0031416 ≈ 398 turns.',
    hints: [
      'Formula: m = N · I · A where A = π r².',
      'Area A = π × (0.02 m)² = 1.2566 × 10⁻³ m².',
      'Solve N = m / (I · A) = 1.25 / (2.5 × 1.2566 × 10⁻³).',
    ],
  },
  // ADVANCED 6 - Evaluation (Neutral Points in Parallel Wires)
  {
    id: 'ch_18',
    nodeId: NODE_C12_PHY_045,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Two long parallel wires carry currents I₁ = 10 A (upward) and I₂ = 30 A (upward) separated by d = 20 cm. Where is the magnetic neutral point (where net B = 0) located?',
    options: [
      'Between the wires, exactly 5 cm from the 10 A wire',
      'Between the wires, exactly 10 cm from both wires',
      'Outside the wires, 10 cm to the left of the 10 A wire',
      'No neutral point exists because like currents create fields that add everywhere',
    ],
    correctIndex: 0,
    explanation: 'For parallel currents in the same direction, their B-fields oppose between the wires. Setting B₁ = B₂ ⇒ μ₀I₁/(2πx) = μ₀I₂/(2π(d-x)) ⇒ 10/x = 30/(20-x) ⇒ 30x = 200 - 10x ⇒ 40x = 200 ⇒ x = 5 cm from the 10 A wire.',
    hints: [
      'Use right-hand rule: between the wires, wire 1 field is INTO page, wire 2 field is OUT of page.',
      'Equate magnitudes: I₁ / x = I₂ / (d - x).',
      'Solve 10 / x = 30 / (20 - x) to find distance x from the smaller current.',
    ],
  },
  // ADVANCED 7 - Application (Torque on tilted coil)
  {
    id: 'ch_19',
    nodeId: NODE_C12_PHY_046,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A circular coil of 200 turns, radius 5 cm, carries 1.5 A in a uniform horizontal magnetic field B = 0.4 T. If the PLANE of the coil makes an angle of 30° with the magnetic field lines, calculate the torque in N·m. [Take π = 3.1416]',
    correctAnswer: 0.816,
    tolerance: 0.03,
    unit: 'N·m',
    explanation: 'Angle between NORMAL (magnetic moment m) and field B is φ = 90° - 30° = 60°. Area A = π(0.05)² = 7.854 × 10⁻³ m². Torque τ = NIAB sin φ = 200 × 1.5 × (7.854 × 10⁻³) × 0.4 × sin(60°) = 0.9425 × 0.8660 = 0.816 N·m.',
    hints: [
      'CRITICAL: The angle φ in τ = NIAB sin φ is between the NORMAL to coil and B.',
      'If plane makes 30° with B, then normal makes φ = 90° - 30° = 60°.',
      'τ = 200 × 1.5 × (π × 0.05²) × 0.4 �� sin(60°).',
    ],
    misconceptionIndex: 4,
  },
  // ADVANCED 8 - Evaluation (Galvanometer Damping & Eddy Currents)
  {
    id: 'ch_20',
    nodeId: NODE_C12_PHY_047,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why is the coil of a moving coil galvanometer wound on a metallic (non-magnetic aluminium) frame rather than an insulating plastic frame?',
    options: [
      'To provide electromagnetic damping (dead-beat galvanometer) via induced eddy currents in the metal frame that quickly bring the pointer to rest',
      'To reduce the total electrical resistance of the copper winding',
      'To shield the coil from external electrostatic fields by acting as a Faraday cage',
      'To amplify the deflecting torque by conducting stray magnetic flux',
    ],
    correctIndex: 0,
    explanation: 'As the aluminium frame rotates in the magnetic field, eddy currents are induced in it. By Lenz\'s law, these produce an opposing electromagnetic damping torque that stops oscillations quickly (dead-beat behavior) without adding magnetic distortion.',
    hints: [
      'Think about what happens when a needle keeps oscillating back and forth before stopping.',
      'Moving metal through a magnetic field induces circulating eddy currents.',
      'These eddy currents dissipate kinetic energy safely into heat, providing rapid damping.',
    ],
  },
  // EXTRA 1 - Standard Classification (Lorentz Component properties)
  {
    id: 'ch_21',
    nodeId: NODE_C12_PHY_043,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'How do the electric force component F_e = qE and magnetic force component F_m = q(v x B) differ when a particle is at REST (v = 0)?',
    options: [
      'F_e = qE remains active and accelerates the particle, while F_m becomes exactly zero',
      'Both forces become zero because electric fields require charge flow',
      'F_m dominates and prevents the charge from moving',
      'F_e reverses direction while F_m becomes infinite',
    ],
    correctIndex: 0,
    explanation: 'Electric force F_e = qE depends only on position and charge, persisting whether the charge is at rest or in motion. Magnetic force F_m = q(v x B) is strictly velocity-dependent and vanishes when v = 0.',
    hints: [
      'Substitute v = 0 into F = q(E + v x B).',
      'What happens to the cross product term (0 x B)?',
      'Only the static electric force qE remains.',
    ],
  },
  // EXTRA 2 - Application (Voltmeter Loading Effect)
  {
    id: 'ch_22',
    nodeId: NODE_C12_PHY_049,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A 1000 Ω resistor is connected across a 10 V DC source. A converted voltmeter with internal resistance R_v = 9000 Ω is connected across it to measure the voltage. What voltage does the voltmeter read in Volts (V)?',
    correctAnswer: 10.0,
    tolerance: 0.2,
    unit: 'V',
    explanation: 'Connected across an ideal 10 V source with zero internal resistance, the terminal potential difference remains exactly 10.0 V regardless of voltmeter resistance (though in a high-impedance divider it would cause loading error).',
    hints: [
      'Read carefully: the 1000 Ω resistor is across an ideal 10 V constant voltage source.',
      'The potential difference across the parallel combination is clamped to the source EMF.',
      'The voltmeter reads 10.0 V.',
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
  nodeId: NODE_C12_PHY_041,
  title: "Ampère's Circuital Law & Magnetic Dynamics",
  definition: "Ampère's circuital law states that the line integral of magnetic field ∮ B · dl along any closed boundary equals μ₀ times the net enclosed current. This foundation expands into the Lorentz force F = q(E + v x B), conductor forces F = IL x B, parallel wire interactions, loop torques, and precision galvanometer instrumentation.",
  eli5: "Think of Ampère's law like counting cars through a toll barrier: circling a perimeter measures all currents trapped inside. Magnetic fields push moving charges sideways like spinning bowling balls in wind, twist wire loops like tiny steering wheels, and allow us to build ultra-precise meters.",
  misconceptions: [
    { misconception: "∮ B · dl = μ₀I means B is constant everywhere around the loop.", correction: "The integral of B · dl equals μ₀I. B itself is only constant and factorable when high spatial symmetry exists (e.g. infinite straight wire or long solenoid)." },
    { misconception: "The magnetic force does work to accelerate particles faster.", correction: "F = q(v x B) is always perpendicular to instantaneous velocity v. Thus W = ∫ F · ds = 0. B bends trajectories without changing speed or kinetic energy." },
    { misconception: "Like currents repel and unlike currents attract, by analogy with electric charges.", correction: "Parallel currents in the SAME direction attract, and opposite currents repel. Magnetic forces are cross products, not scalar Coulomb repulsions." },
    { misconception: "Magnetic field lines start at the north pole and terminate at the south pole.", correction: "Magnetic field lines have no start or end; they form continuous closed loops (S to N inside, N to S outside) because magnetic monopoles do not exist." },
    { misconception: "Torque on a coil is maximum when the plane of the coil is perpendicular to B.", correction: "Torque τ = NIAB sin φ is maximum when the coil plane is PARALLEL to B (normal angle φ = 90°), and zero when the plane is perpendicular (φ = 0°)." },
    { misconception: "Velocity selector condition v = E/B depends on the particle's mass and charge.", correction: "In crossed fields, qE = qvB simplifies to v = E/B where charge q and mass m cancel completely." },
    { misconception: "Voltmeter multiplier series resistance is simply R = V/I_g.", correction: "The correct formula is R = V/I_g - R_g; you must subtract the galvanometer coil's own resistance." },
    { misconception: "Doubling turns N doubles both current and voltage sensitivity equally.", correction: "Current sensitivity S_i = NAB/k doubles, but voltage sensitivity S_v = NAB/(kR) stays constant because resistance R also doubles." },
    { misconception: "Ampere's law gives exact analytical formulas for any shaped coil.", correction: "Ampere's law is universally true, but only provides direct closed-form formulas for high-symmetry geometries where B can be factored out." },
  ],
  diagnosticQuestions: [
    { question: "What is the magnetic field circulation around a loop enclosing zero net current?", options: ["Zero", "μ₀", "Infinite", "Depends on loop radius"], correctIndex: 0 },
    { question: "A particle with charge q enters a pure magnetic field. Its kinetic energy after time t is:", options: ["Unchanged", "Increases linearly with t", "Decreases exponentially", "Oscillates sinusoidally"], correctIndex: 0 },
    { question: "Two parallel wires carrying currents in opposite directions will:", options: ["Repel each other", "Attract each other", "Experience zero force", "Rotate until perpendicular"], correctIndex: 0 },
    { question: "Why is the magnetic field in a moving coil galvanometer made radial?", options: ["To make deflecting torque constant at all angles (linear scale)", "To maximize coil resistance", "To prevent eddy currents", "To eliminate the need for a suspension"], correctIndex: 0 },
    { question: "To convert a galvanometer into an ammeter, one must connect:", options: ["A low resistance in parallel (shunt)", "A high resistance in series", "A capacitor in series", "An inductor in parallel"], correctIndex: 0 },
    { question: "To convert a galvanometer into a voltmeter, one must connect:", options: ["A high resistance in series", "A low resistance in parallel", "A low resistance in series", "A high resistance in parallel"], correctIndex: 0 },
    { question: "What is the magnetic dipole moment m of a coil with N turns, area A, carrying current I?", options: ["m = NIA", "m = NI / A", "m = N A / I", "m = μ₀ NIA"], correctIndex: 0 },
    { question: "What is the SI unit of magnetic dipole moment?", options: ["A·m²", "Tesla / m", "Weber · m", "N / (A·m)"], correctIndex: 0 },
  ],
  masteryCriteria: "Student can formulate and apply Ampère's circuital law, determine Lorentz forces on moving charges and current conductors, analyze loop torques, and perform exact design calculations for ammeters, voltmeters, and equivalent solenoids.",
};

// ─── INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: "1. Ampère's Circulation & Enclosed Current",
    instruction: 'Drag current-carrying wires in/out of the Amperian loop and adjust current I. Observe the circulation ∮ B · dl in real-time.',
    interactionType: 'amperian-loop',
    nodeId: NODE_C12_PHY_041,
  },
  {
    title: '2. Lorentz Force & Helical Motion',
    instruction: 'Adjust particle speed v, entry angle θ, and magnetic field B. Watch the charge trace circular or helical orbits.',
    interactionType: 'lorentz-charge',
    nodeId: NODE_C12_PHY_042,
  },
  {
    title: '3. Thomson Crossed-Field Velocity Selector',
    instruction: 'Tweak Electric Field E and Magnetic Field B. Find the exact speed v = E/B where the beam travels undeflected.',
    interactionType: 'velocity-selector',
    nodeId: NODE_C12_PHY_043,
  },
  {
    title: '4. Mutual Forces Between Parallel Conductors',
    instruction: 'Toggle current directions and separation d. Watch the mutual magnetic fields superimpose and create attraction or repulsion.',
    interactionType: 'parallel-conductors',
    nodeId: NODE_C12_PHY_045,
  },
  {
    title: '5. Moving Coil Galvanometer & Radial Field',
    instruction: 'Inject current into the galvanometer. See how radial concave poles keep torque constant, deflecting the needle against the spring.',
    interactionType: 'galvanometer-radial',
    nodeId: NODE_C12_PHY_047,
  },
];

// ─── PREDICT-THEN-CHECK QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you double the radius r of an Amperian circle around a long straight wire carrying current I, what happens to the circulation ∮ B · dl?',
    options: [
      'It stays exactly the same (equals μ₀I)',
      'It doubles because the perimeter is twice as long',
      'It halves because B decreases as 1/r',
      'It quadruples with area πr²',
    ],
    correctIndex: 0,
    verifyInstruction: 'Notice that while B halves (B = μ₀I/(2πr)), the perimeter doubles (2πr). The product ∮ B · dl = B(2πr) remains identically μ₀I!',
    nodeId: NODE_C12_PHY_041,
  },
  {
    question: 'Predict: In a velocity selector with E = 10⁴ V/m and B = 0.1 T, a particle travels at 2 × 10⁵ m/s (TWICE the selected speed). Which way will it bend?',
    options: [
      'Towards the magnetic force direction (Magnetic force wins because F_m ∝ v)',
      'Towards the electric force direction (Electric force wins)',
      'It still goes straight because q cancels',
      'It immediately stops and reflects backward',
    ],
    correctIndex: 0,
    verifyInstruction: 'F_m = qvB increases with speed while F_e = qE is constant. At higher speeds, F_m > F_e, deflecting the beam magnetically!',
    nodeId: NODE_C12_PHY_043,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What happens to the helical pitch p as you increase the magnetic field strength B?',
    observableOptions: [
      'Pitch decreases: the helix gets tighter and completes orbits faster',
      'Pitch increases linearly with B',
      'Pitch remains completely constant',
      'The particle switches to a straight line',
    ],
    correctIndex: 0,
    nodeId: NODE_C12_PHY_042,
  },
  {
    question: 'What happens to the pointer deflection angle φ in the galvanometer as you double the coil current I?',
    observableOptions: [
      'Deflection φ doubles linearly because torque τ = NIAB is constant at all angles in a radial field',
      'Deflection follows a non-linear sine curve',
      'Deflection stays constant due to counter-EMF',
      'Deflection oscillates indefinitely without settling',
    ],
    correctIndex: 0,
    nodeId: NODE_C12_PHY_047,
  },
];

// ─── REAL-WORLD CAPSTONE ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Chief Engineer: Metro Substation Instrumentation Design',
  description: 'Design a complete measurement panel for an ISC electrical substation: specify shunt resistors for 2000 A traction busbars and series multipliers for 25 kV overhead catenary lines using standard 50 Ω, 1 mA galvanometers.',
  steps: [
    'Calculate traction shunt: S = (10⁻³ × 50) / (2000 - 0.001) ≈ 0.000025 Ω (25 micro-ohms).',
    'Calculate catenary series multiplier: R = (25000 / 0.001) - 50 = 24,999,950 Ω (25 MΩ).',
    'Calculate the mechanical attractive force between two parallel busbars carrying 2000 A separated by 20 cm.',
    'Verify that the radial pole pieces maintain linearity under high-vibration train transit.',
  ],
};

// ─── MAIN COMPONENT ───
function C12_PhysicsAmperesCircuitalSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C12_PHY_041,
  title = DEFAULT_PROPS.title || "Ampère's Circuital Law & Magnetic Dynamics",
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['physics'] || { name: 'Physics', emoji: '⚡', color: 'indigo' };

  // Phase flow: discovery → explore → sandbox → challenge → complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState<number>(0);
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  // Exploration states
  const [predictionMade, setPredictionMade] = useState<boolean>(false);
  const [predictionIndex, setPredictionIndex] = useState<number>(-1);
  const [predictionVerified, setPredictionVerified] = useState<boolean>(false);
  const [observationAnswered, setObservationAnswered] = useState<boolean>(false);
  const [observationIndex, setObservationIndex] = useState<number>(-1);

  // Interactive Variables
  const [wireCurrentI, setWireCurrentI] = useState<number>(20); // Amperes
  const [loopRadiusR, setLoopRadiusR] = useState<number>(0.15); // meters
  const [enclosedWiresCount, setEnclosedWiresCount] = useState<number>(1);
  const [outsideWiresCount, setOutsideWiresCount] = useState<number>(1);

  const [particleSpeedV, setParticleSpeedV] = useState<number>(4.0); // x 10^6 m/s
  const [particleAngleTheta, setParticleAngleTheta] = useState<number>(90); // degrees
  const [magneticFieldB, setMagneticFieldB] = useState<number>(0.3); // Tesla
  const [chargeType, setChargeType] = useState<'proton' | 'electron' | 'alpha'>('proton');

  const [electricFieldE, setElectricFieldE] = useState<number>(6.0); // x 10^4 V/m
  const [selectorB, setSelectorB] = useState<number>(0.2); // Tesla
  const [beamSpeed, setBeamSpeed] = useState<number>(3.0); // x 10^5 m/s

  const [parallelI1, setParallelI1] = useState<number>(10); // A
  const [parallelI2, setParallelI2] = useState<number>(10); // A
  const [parallelDistanceD, setParallelDistanceD] = useState<number>(0.05); // m
  const [sameDirectionCurrent, setSameDirectionCurrent] = useState<boolean>(true);

  const [galvanometerCurrent, setGalvanometerCurrent] = useState<number>(1.5); // mA
  const [galvanometerTurnsN, setGalvanometerTurnsN] = useState<number>(100);
  const [galvanometerAreaA, setGalvanometerAreaA] = useState<number>(4.0); // cm^2
  const [galvanometerSpringK, setGalvanometerSpringK] = useState<number>(5.0); // x 10^-6 N m/rad

  const [meterType, setMeterType] = useState<'ammeter' | 'voltmeter'>('ammeter');
  const [meterFullScale, setMeterFullScale] = useState<number>(10); // A or V

  // Diagnostic / Challenge States
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('foundation');
  const [scoreBreakdown, setScoreBreakdown] = useState<{ correct: number; total: number }>({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState<string>('beginner');
  const [errors, setErrors] = useState<number>(0);

  const [hintCount, setHintCount] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHint, setCurrentHint] = useState<string>('');
  const [answerRevealed, setAnswerRevealed] = useState<boolean>(false);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);

  // Drag-and-drop & Construction States
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState<string>('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Feedback states
  const [discoveryAnswered, setDiscoveryAnswered] = useState<boolean>(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [sparklePos, setSparklePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState<boolean>(false);
  const [wrongFlash, setWrongFlash] = useState<boolean>(false);
  const [revealedSteps, setRevealedSteps] = useState<number>(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Persistent BKT & Timer refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameIdRef = useRef<number | null>(null);

  // Spaced Repetition Calculated Interval
  const srsIntervalDays = useMemo(() => {
    if (errors === 0) return 7;
    if (errors <= 3) return 3;
    return 1;
  }, [errors]);

  // ─── FILTER CHALLENGES BY CURRENT DIFFICULTY ���──
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── INITIAL MASTERY LOAD EFFECT ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT ADAPTIVE MASTERY EFFECT ───
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

  // ─── REAL-TIME CALCULATIONS (Derived Physics Values) ───
  const calculatedCirculation = useMemo(() => {
    const netCurrent = enclosedWiresCount * wireCurrentI;
    const circ = (4 * Math.PI * 1e-7 * netCurrent);
    const bMag = (4 * Math.PI * 1e-7 * netCurrent) / (2 * Math.PI * loopRadiusR);
    return { netCurrent, circ: circ.toExponential(4), bMag: (bMag * 1e6).toFixed(2) };
  }, [enclosedWiresCount, wireCurrentI, loopRadiusR]);

  const chargeDynamics = useMemo(() => {
    const q = chargeType === 'proton' ? 1.6e-19 : chargeType === 'electron' ? -1.6e-19 : 3.2e-19;
    const m = chargeType === 'proton' ? 1.67e-27 : chargeType === 'electron' ? 9.1e-31 : 6.64e-27;
    const speed = particleSpeedV * 1e6;
    const radAngle = (particleAngleTheta * Math.PI) / 180;
    const vPerp = speed * Math.sin(radAngle);
    const vPara = speed * Math.cos(radAngle);
    const radiusM = (m * vPerp) / (Math.abs(q) * magneticFieldB);
    const periodS = (2 * Math.PI * m) / (Math.abs(q) * magneticFieldB);
    const pitchM = vPara * periodS;
    const forceN = Math.abs(q) * speed * magneticFieldB * Math.sin(radAngle);

    return {
      radiusMm: (radiusM * 1000).toFixed(3),
      periodNs: (periodS * 1e9).toFixed(3),
      pitchMm: (pitchM * 1000).toFixed(3),
      forcePn: (forceN * 1e12).toFixed(2),
    };
  }, [chargeType, particleSpeedV, particleAngleTheta, magneticFieldB]);

  const parallelForceCalc = useMemo(() => {
    const fPerMeter = (2e-7 * parallelI1 * parallelI2) / parallelDistanceD;
    return {
      forcePerMeterMicroN: (fPerMeter * 1e6).toFixed(2),
      isAttractive: sameDirectionCurrent,
    };
  }, [parallelI1, parallelI2, parallelDistanceD, sameDirectionCurrent]);

  const galvanometerDeflection = useMemo(() => {
    const I_amp = galvanometerCurrent * 1e-3;
    const A_m2 = galvanometerAreaA * 1e-4;
    const k_val = galvanometerSpringK * 1e-6;
    const B_val = 0.25; // Tesla
    const phiRad = (galvanometerTurnsN * I_amp * A_m2 * B_val) / k_val;
    const phiDeg = (phiRad * 180) / Math.PI;
    const currentSensitivity = (galvanometerTurnsN * A_m2 * B_val) / k_val;
    return {
      deg: Math.min(85, Math.max(-85, phiDeg)).toFixed(1),
      si: currentSensitivity.toFixed(0),
    };
  }, [galvanometerCurrent, galvanometerTurnsN, galvanometerAreaA, galvanometerSpringK]);

  // ─── 2D CANVAS ANIMATION ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frame = 0;
    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (phase === 'explore' || phase === 'sandbox') {
        const cx = canvas.width / 2;
        const cy = canvas.height / 2;

        if (currentSlide === 0 || phase === 'sandbox') {
          // Circular Amperian Loop with moving circulation dashes
          ctx.strokeStyle = '#6366f1';
          ctx.lineWidth = 3;
          ctx.setLineDash([8, 6]);
          ctx.lineDashOffset = -frame * 0.8;
          ctx.beginPath();
          ctx.arc(cx, cy, loopRadiusR * 400, 0, Math.PI * 2);
          ctx.stroke();
          ctx.setLineDash([]);

          // Center Enclosed wire
          ctx.fillStyle = '#ef4444';
          ctx.beginPath();
          ctx.arc(cx, cy, 14, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 12px sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('⊙ I_enc', cx, cy);

          // Outside wire
          if (outsideWiresCount > 0) {
            const ox = cx + loopRadiusR * 400 + 55;
            const oy = cy - 30;
            ctx.fillStyle = '#94a3b8';
            ctx.beginPath();
            ctx.arc(ox, oy, 12, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#0f172a';
            ctx.fillText('⊗ I_out', ox, oy);
          }
        } else if (currentSlide === 1) {
          // Trajectory Animation for Lorentz Charge
          ctx.strokeStyle = '#38bdf8';
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          const r = Math.min(90, Math.max(20, parseFloat(chargeDynamics.radiusMm) * 0.8));
          const v_para = particleSpeedV * Math.cos((particleAngleTheta * Math.PI) / 180);

          ctx.moveTo(30, cy);
          for (let t = 0; t < 300; t++) {
            const x = 30 + t * 1.6 + (v_para * 0.05 * t);
            const y = cy + Math.sin((t + frame * 0.1) * 0.12) * r;
            if (x < canvas.width - 20) ctx.lineTo(x, y);
          }
          ctx.stroke();

          // Particle Head
          const headX = (30 + ((frame * 2.5) % (canvas.width - 80)));
          const headY = cy + Math.sin((headX * 0.1)) * r;
          ctx.fillStyle = chargeType === 'electron' ? '#ec4899' : '#22c55e';
          ctx.beginPath();
          ctx.arc(headX, headY, 8, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animFrameIdRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [phase, currentSlide, loopRadiusR, outsideWiresCount, chargeDynamics, particleAngleTheta, particleSpeedV, chargeType]);

  // ─── ESCALATING HINTS CALLBACK ───
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge.hints[nextLevel - 1]) {
      setCurrentHint(challenge.hints[nextLevel - 1]);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(challenge.hints[nextLevel - 1]);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
    }
  }, [hintCount, challenge]);

  // ─── DISCOVERY ANSWER HANDLER ───
  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Excellent physical intuition!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  // ─── PHASE ADVANCE HANDLERS ───
  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak("Welcome to the interactive exploration lab! Manipulate the parameters to see Maxwell-Ampère electromagnetism in action.");
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free play sandbox mode unlocked. Try any parameter without grading pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Let us test your skills with adaptive ISC board-level challenges.');
  }, []);

  // ─── PREDICTION & OBSERVATION HANDLERS ───
  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now test the sliders to verify your hypothesis.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Accurate scientific observation!' : 'Look closer at the mathematical relation on screen.');
  }, []);

  // ─── COMPLETION & SCORE RECORDING ───
  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Congratulations! You have mastered Ampère circuital law and electromagnetic dynamics.');
  }, [errors, onComplete]);

  // ─── NEXT CHALLENGE ───
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

  // ─── INACTIVITY AUTO-HINT TIMER ───
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  // ─── ANSWER VALIDATION HANDLER ───
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
      isCorrect = Math.abs(numAnswer - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0.05);
    } else if (challenge.type === 'construct') {
      isCorrect = answer === challenge.targetState;
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct derivation! Phenomenal work.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3500);
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
        speechManager.speak('Let us review the step-by-step physics breakdown together.');
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

  // ─── DRAG & SORT HANDLERS ───
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
    handleAnswer(answer);
  }, [sortArrangement, challenge, handleAnswer]);

  // ─── SLIDER & INTERACTION HANDLERS ───
  const handleWireCurrentChange = useCallback((val: number) => {
    setWireCurrentI(val);
    audioManager.play('count');
    resetInactivityTimer();
  }, [resetInactivityTimer]);

  const handleLoopRadiusChange = useCallback((val: number) => {
    setLoopRadiusR(val);
    audioManager.play('count');
    resetInactivityTimer();
  }, [resetInactivityTimer]);

  const handleParticleSpeedChange = useCallback((val: number) => {
    setParticleSpeedV(val);
    audioManager.play('count');
    resetInactivityTimer();
  }, [resetInactivityTimer]);

  const handleParticleAngleChange = useCallback((val: number) => {
    setParticleAngleTheta(val);
    audioManager.play('count');
    resetInactivityTimer();
  }, [resetInactivityTimer]);

  const handleMagneticFieldChange = useCallback((val: number) => {
    setMagneticFieldB(val);
    audioManager.play('count');
    resetInactivityTimer();
  }, [resetInactivityTimer]);

  const handleParallelDistanceChange = useCallback((val: number) => {
    setParallelDistanceD(val);
    audioManager.play('count');
    resetInactivityTimer();
  }, [resetInactivityTimer]);

  const handleGalvanometerCurrentChange = useCallback((val: number) => {
    setGalvanometerCurrent(val);
    audioManager.play('count');
    resetInactivityTimer();
  }, [resetInactivityTimer]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-8 bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between pb-6 border-b border-slate-800 gap-4"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-3 bg-gold-900/40 border border-gold-700/50 rounded-2xl" aria-hidden="true">
            {subjectConfig.emoji}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gold-400 bg-gold-950/80 px-2.5 py-0.5 rounded-full border border-gold-800/60">
                ISC Class 12 Physics
              </span>
              <span className="text-xs text-slate-400 font-mono">Ch 4: Magnetism</span>
            </div>
            <h1 className="text-2xl font-black text-white mt-1 tracking-tight">{title}</h1>
          </div>
        </div>

        {/* Phase Indicator Badges */}
        <div className="flex items-center gap-2 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800" role="tablist" aria-label="Simulation phases">
          {(['discovery', 'explore', 'sandbox', 'challenge', 'complete'] as const).map(p => (
            <motion.button
              key={p}
              role="tab"
              aria-selected={phase === p}
              aria-label={`Switch to ${p} phase`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (p === 'complete' && phase !== 'complete') return;
                setPhase(p);
                audioManager.play('tap');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                phase === p
                  ? 'bg-gradient-to-r from-gold-600 to-gold-500 text-white shadow-lg shadow-gold-600/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {p}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-6 bg-gradient-to-br from-gold-950/60 via-slate-900/90 to-purple-950/40 rounded-3xl border border-gold-700/40 shadow-xl"
          >
            <div className="flex items-center gap-2 text-gold-400 text-sm font-bold uppercase tracking-wider mb-2">
              <span>🚀 Operational Mission</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">{SCENARIO.title}</h2>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">{SCENARIO.intro}</p>
            <div className="mt-4 p-3.5 bg-slate-900/80 rounded-2xl border border-slate-800 text-xs text-gold-200 font-mono">
              ⚡ Operational Alert: {SCENARIO.context}
            </div>
          </motion.div>

          <div className="p-6 bg-slate-900/90 rounded-3xl border border-slate-800 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-amber-400" aria-hidden="true">🤔</span> Curiosity Hook: Think Before You Calculate
            </h3>
            <p className="text-slate-200 font-medium text-base mb-4">{DISCOVERY_QUESTION.question}</p>

            <div className="space-y-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`w-full text-left p-4 rounded-2xl text-sm font-medium transition-all border ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                        : 'bg-slate-800/50 border-slate-700/50 text-slate-400 opacity-60'
                      : 'bg-slate-800/80 border-slate-700 hover:bg-slate-750 hover:border-gold-500 text-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 flex items-center justify-center rounded-full bg-slate-700/80 text-xs font-bold text-slate-300">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span>{opt}</span>
                    </div>
                    {discoveryAnswered && (
                      <span className="text-sm font-bold">
                        {i === DISCOVERY_QUESTION.correctIndex ? (
                          <span className="text-emerald-400">✓ Correct</span>
                        ) : (
                          <span className="text-rose-400">✗</span>
                        )}
                      </span>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 pt-4 border-t border-slate-800">
                <div
                  className={`p-4 rounded-2xl text-sm mb-4 border flex items-center gap-2 ${
                    discoveryCorrect
                      ? 'bg-emerald-950/50 border-emerald-600/50 text-emerald-300'
                      : 'bg-amber-950/50 border-amber-600/50 text-amber-300'
                  }`}
                >
                  <span className="font-bold">{discoveryCorrect ? '✓' : '✗'}</span>
                  <span>{discoveryCorrect ? '🎯 Spot on! Your intuition is razor sharp.' : DISCOVERY_QUESTION.hintAfter}</span>
                </div>
                <motion.button
                  aria-label="Launch Visual Electromagnetics Lab"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAdvanceToExploration}
                  className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-white rounded-2xl font-bold shadow-lg shadow-gold-600/30 flex items-center justify-center gap-2"
                >
                  <span>Launch Visual Electromagnetics Lab</span>
                  <span aria-hidden="true">→</span>
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: GUIDED INTERACTIVE EXPLORATION ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-gold-400">
              Interactive Concept Discovery ({currentSlide + 1} of {EXPLORATION_STEPS.length})
            </span>
            <span className="text-xs text-slate-400 font-mono">Node: {EXPLORATION_STEPS[currentSlide].nodeId}</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 bg-slate-900/90 rounded-3xl border border-slate-800 shadow-2xl space-y-6"
            >
              <div>
                <h3 className="text-2xl font-black text-white">{EXPLORATION_STEPS[currentSlide].title}</h3>
                <p className="text-amber-400 text-sm mt-1 flex items-center gap-2 font-medium">
                  <span aria-hidden="true">👉</span> {EXPLORATION_STEPS[currentSlide].instruction}
                </p>
              </div>

              {/* ── SLIDE 0: AMPERIAN CIRCULATION LAB ── */}
              {currentSlide === 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-7 bg-slate-950 rounded-2xl p-4 border border-slate-800 flex flex-col items-center justify-center relative min-h-[320px]">
                    <canvas ref={canvasRef} width={420} height={300} className="w-full max-w-md" aria-label="Amperian loop visualization canvas" />
                    <div className="absolute bottom-3 left-4 text-xs font-mono text-slate-400">
                      Line integral: ∮ B · dl = μ₀ I_enc
                    </div>
                  </div>

                  <div className="lg:col-span-5 space-y-4 flex flex-col justify-center">
                    <div className="p-4 bg-slate-800/60 rounded-2xl border border-slate-700/60 space-y-3">
                      <div className="flex justify-between text-xs font-bold text-slate-300">
                        <span>Wire Current (I):</span>
                        <span className="text-gold-400 font-mono">{wireCurrentI} A</span>
                      </div>
                      <input
                        type="range"
                        min={1}
                        max={100}
                        value={wireCurrentI}
                        aria-label="Wire Current (I) in Amperes"
                        onChange={e => handleWireCurrentChange(Number(e.target.value))}
                        className="w-full accent-gold-500 cursor-pointer"
                      />

                      <div className="flex justify-between text-xs font-bold text-slate-300">
                        <span>Loop Radius (r):</span>
                        <span className="text-gold-400 font-mono">{loopRadiusR.toFixed(2)} m</span>
                      </div>
                      <input
                        type="range"
                        min={0.05}
                        max={0.35}
                        step={0.01}
                        value={loopRadiusR}
                        aria-label="Amperian Loop Radius (r) in meters"
                        onChange={e => handleLoopRadiusChange(Number(e.target.value))}
                        className="w-full accent-gold-500 cursor-pointer"
                      />

                      <div className="flex gap-2 pt-2">
                        <motion.button
                          aria-label={`Toggle enclosed wires count, currently ${enclosedWiresCount}`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setEnclosedWiresCount(c => (c === 1 ? 2 : 1))}
                          className="flex-1 py-2 px-3 bg-gold-950 border border-gold-700 text-gold-200 rounded-xl text-xs font-bold"
                        >
                          Enclosed Wires: {enclosedWiresCount}
                        </motion.button>
                        <motion.button
                          aria-label={`Toggle outside wires count, currently ${outsideWiresCount}`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setOutsideWiresCount(c => (c === 1 ? 0 : 1))}
                          className="flex-1 py-2 px-3 bg-slate-900 border border-slate-700 text-slate-300 rounded-xl text-xs font-bold"
                        >
                          Outside Wires: {outsideWiresCount}
                        </motion.button>
                      </div>
                    </div>

                    {/* Live Multirepresentation HUD */}
                    <div className="p-4 bg-gold-950/40 rounded-2xl border border-gold-800/60 space-y-2">
                      <div className="text-xs font-bold text-gold-300 uppercase tracking-wider">Live Physics Calculations</div>
                      <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                        <div className="p-2 bg-slate-900/80 rounded-xl border border-slate-800">
                          <div className="text-slate-400 text-[10px]">Net Enclosed I</div>
                          <div className="text-white font-bold text-sm">{calculatedCirculation.netCurrent} A</div>
                        </div>
                        <div className="p-2 bg-slate-900/80 rounded-xl border border-slate-800">
                          <div className="text-slate-400 text-[10px]">Field Mag @ r</div>
                          <div className="text-emerald-400 font-bold text-sm">{calculatedCirculation.bMag} μT</div>
                        </div>
                      </div>
                      <div className="p-2 bg-slate-900/80 rounded-xl border border-slate-800 text-[11px] font-mono text-gold-200">
                        ∮ B · dl = μ₀(I_enc) = {calculatedCirculation.circ} T·m
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── SLIDE 1: LORENTZ FORCE & HELICAL MOTION ── */}
              {currentSlide === 1 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-7 bg-slate-950 rounded-2xl p-4 border border-slate-800 flex flex-col items-center justify-center relative min-h-[320px]">
                    <canvas ref={canvasRef} width={420} height={300} className="w-full max-w-md" aria-label="Lorentz force particle trajectory canvas" />
                    <div className="absolute top-3 left-4 text-xs font-mono text-gold-400">
                      Orbit Radius: r = mv_⊥ / (qB) = {chargeDynamics.radiusMm} mm
                    </div>
                    <div className="absolute bottom-3 left-4 text-xs font-mono text-purple-400">
                      Helical Pitch: p = v_∥ · T = {chargeDynamics.pitchMm} mm
                    </div>
                  </div>

                  <div className="lg:col-span-5 space-y-4">
                    <div className="p-4 bg-slate-800/60 rounded-2xl border border-slate-700/60 space-y-3">
                      <div className="flex gap-2">
                        {(['proton', 'electron', 'alpha'] as const).map(type => (
                          <motion.button
                            key={type}
                            aria-label={`Select particle type ${type}`}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => {
                              setChargeType(type);
                              audioManager.play('tap');
                            }}
                            className={`flex-1 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                              chargeType === type
                                ? 'bg-gold-600 text-white shadow-md'
                                : 'bg-slate-900 text-slate-400 border border-slate-700'
                            }`}
                          >
                            {type}
                          </motion.button>
                        ))}
                      </div>

                      <div className="flex justify-between text-xs font-bold text-slate-300">
                        <span>Speed (v):</span>
                        <span className="text-gold-400 font-mono">{particleSpeedV.toFixed(1)} × 10⁶ m/s</span>
                      </div>
                      <input
                        type="range"
                        min={0.5}
                        max={10.0}
                        step={0.5}
                        value={particleSpeedV}
                        aria-label="Particle Speed (v) in 10^6 m/s"
                        onChange={e => handleParticleSpeedChange(Number(e.target.value))}
                        className="w-full accent-gold-500 cursor-pointer"
                      />

                      <div className="flex justify-between text-xs font-bold text-slate-300">
                        <span>Pitch Angle (θ):</span>
                        <span className="text-gold-400 font-mono">{particleAngleTheta}°</span>
                      </div>
                      <input
                        type="range"
                        min={10}
                        max={90}
                        step={5}
                        value={particleAngleTheta}
                        aria-label="Particle Entry Pitch Angle (θ) in degrees"
                        onChange={e => handleParticleAngleChange(Number(e.target.value))}
                        className="w-full accent-gold-500 cursor-pointer"
                      />

                      <div className="flex justify-between text-xs font-bold text-slate-300">
                        <span>B-Field Strength:</span>
                        <span className="text-gold-400 font-mono">{magneticFieldB.toFixed(2)} T</span>
                      </div>
                      <input
                        type="range"
                        min={0.05}
                        max={1.0}
                        step={0.05}
                        value={magneticFieldB}
                        aria-label="Magnetic Field Strength (B) in Tesla"
                        onChange={e => handleMagneticFieldChange(Number(e.target.value))}
                        className="w-full accent-gold-500 cursor-pointer"
                      />
                    </div>

                    <div className="p-3 bg-gold-950/30 rounded-2xl border border-gold-800/50 text-xs font-mono space-y-1">
                      <div className="text-gold-300 font-bold">Lorentz Centripetal Force:</div>
                      <div className="text-white">F_m = qvB sin(θ) = {chargeDynamics.forcePn} pN</div>
                      <div className="text-slate-400 text-[11px]">Period T = 2πm/(qB) = {chargeDynamics.periodNs} ns</div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── SLIDE 2: THOMSON CROSSED-FIELD VELOCITY SELECTOR ── */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  {/* PREDICT-THEN-CHECK */}
                  {!predictionMade ? (
                    <div className="p-4 bg-gold-950/60 rounded-2xl border border-gold-700/60 space-y-3">
                      <div className="text-xs font-bold uppercase tracking-wider text-gold-300">Hypothesis Checkpoint</div>
                      <p className="text-sm font-semibold text-white">{PREDICTION_QUESTIONS[1].question}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[1].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            aria-label={`Hypothesis Option: ${opt}`}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handlePrediction(i)}
                            className="p-3 text-left bg-slate-900/90 border border-slate-700 hover:border-gold-500 rounded-xl text-xs text-slate-200"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 bg-emerald-950/40 border border-emerald-700/60 rounded-2xl text-xs text-emerald-300 flex items-center gap-2">
                      <span className="font-bold">✓</span>
                      <span>💡 {PREDICTION_QUESTIONS[1].verifyInstruction}</span>
                    </motion.div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    <div className="md:col-span-7 bg-slate-950 p-4 rounded-2xl border border-slate-800 min-h-[220px] flex flex-col items-center justify-center relative">
                      <svg viewBox="0 0 400 180" className="w-full" aria-label="Crossed Electric and Magnetic Fields Selector Diagram">
                        {/* Capacitor Plates */}
                        <rect x="50" y="25" width="300" height="12" fill="#ef4444" rx="4" />
                        <text x="200" y="34" fill="white" fontSize="9" textAnchor="middle" fontWeight="bold">+ + + + + + + + + + + + (Anode: +V)</text>

                        <rect x="50" y="145" width="300" height="12" fill="#3b82f6" rx="4" />
                        <text x="200" y="154" fill="white" fontSize="9" textAnchor="middle" fontWeight="bold">- - - - - - - - - - - - (Cathode: 0V)</text>

                        {/* Crossed Magnetic Field Symbols */}
                        {[70, 130, 190, 250, 310].map(x => (
                          <React.Fragment key={x}>
                            <text x={x} y="65" fill="#64748b" fontSize="14" textAnchor="middle">⊗</text>
                            <text x={x} y="105" fill="#64748b" fontSize="14" textAnchor="middle">⊗</text>
                          </React.Fragment>
                        ))}

                        {/* Particle Beam Trajectory */}
                        {(() => {
                          const targetSpeed = (electricFieldE * 1e4) / selectorB;
                          const actualSpeed = beamSpeed * 1e5;
                          const diff = actualSpeed - targetSpeed;
                          const endY = 90 - (diff / targetSpeed) * 50;
                          return (
                            <path
                              d={`M 30 90 Q 200 90, 370 ${Math.max(40, Math.min(140, endY))}`}
                              fill="none"
                              stroke={Math.abs(diff) < 20000 ? '#22c55e' : '#f59e0b'}
                              strokeWidth="4"
                              strokeDasharray="6,4"
                            />
                          );
                        })()}

                        <circle cx="370" cy="90" r="8" fill="none" stroke="#22c55e" strokeWidth="2" />
                        <text x="370" y="112" fill="#22c55e" fontSize="9" textAnchor="middle">Selector Slit</text>
                      </svg>
                      <div className="text-[11px] font-mono text-slate-400 mt-2">
                        Target Undeflected Velocity: v = E/B = {((electricFieldE * 1e4) / selectorB / 1e5).toFixed(2)} × 10⁵ m/s
                      </div>
                    </div>

                    <div className="md:col-span-5 space-y-3">
                      <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60 space-y-2">
                        <div className="flex justify-between text-xs font-bold">
                          <span>Beam Speed:</span>
                          <span className="text-amber-400 font-mono">{beamSpeed.toFixed(2)} × 10⁵ m/s</span>
                        </div>
                        <input
                          type="range"
                          min={1.0}
                          max={6.0}
                          step={0.1}
                          value={beamSpeed}
                          aria-label="Charged Beam Speed in 10^5 m/s"
                          onChange={e => setBeamSpeed(Number(e.target.value))}
                          className="w-full accent-amber-500 cursor-pointer"
                        />

                        <div className="flex justify-between text-xs font-bold">
                          <span>Electric Field (E):</span>
                          <span className="text-gold-400 font-mono">{electricFieldE.toFixed(1)} × 10⁴ V/m</span>
                        </div>
                        <input
                          type="range"
                          min={2.0}
                          max={10.0}
                          step={0.5}
                          value={electricFieldE}
                          aria-label="Electric Field (E) in 10^4 V/m"
                          onChange={e => setElectricFieldE(Number(e.target.value))}
                          className="w-full accent-gold-500 cursor-pointer"
                        />

                        <div className="flex justify-between text-xs font-bold">
                          <span>Magnetic Field (B):</span>
                          <span className="text-gold-400 font-mono">{selectorB.toFixed(2)} T</span>
                        </div>
                        <input
                          type="range"
                          min={0.05}
                          max={0.5}
                          step={0.05}
                          value={selectorB}
                          aria-label="Magnetic Field (B) in Tesla"
                          onChange={e => setSelectorB(Number(e.target.value))}
                          className="w-full accent-gold-500 cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── SLIDE 3: PARALLEL CONDUCTORS MUTUAL FORCE ── */}
              {currentSlide === 3 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-7 bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col items-center justify-center min-h-[260px]">
                    <svg viewBox="0 0 380 200" className="w-full" aria-label="Parallel Conductors Mutual Force Diagram">
                      {/* Wire 1 */}
                      <line x1="120" y1="20" x2="120" y2="180" stroke="#f59e0b" strokeWidth="6" strokeLinecap="round" />
                      <polygon points="120,15 115,30 125,30" fill="#f59e0b" />
                      <text x="120" y="195" fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle">I₁ = {parallelI1}A</text>

                      {/* Wire 2 */}
                      <line
                        x1={120 + parallelDistanceD * 1200}
                        y1={sameDirectionCurrent ? 20 : 180}
                        x2={120 + parallelDistanceD * 1200}
                        y2={sameDirectionCurrent ? 180 : 20}
                        stroke="#06b6d4"
                        strokeWidth="6"
                        strokeLinecap="round"
                      />
                      <polygon
                        points={
                          sameDirectionCurrent
                            ? `${120 + parallelDistanceD * 1200},15 ${115 + parallelDistanceD * 1200},30 ${125 + parallelDistanceD * 1200},30`
                            : `${120 + parallelDistanceD * 1200},185 ${115 + parallelDistanceD * 1200},170 ${125 + parallelDistanceD * 1200},170`
                        }
                        fill="#06b6d4"
                      />
                      <text x={120 + parallelDistanceD * 1200} y="195" fill="#06b6d4" fontSize="11" fontWeight="bold" textAnchor="middle">
                        I₂ = {parallelI2}A
                      </text>

                      {/* Force Vectors */}
                      {sameDirectionCurrent ? (
                        <>
                          <line x1="120" y1="100" x2="155" y2="100" stroke="#22c55e" strokeWidth="4" />
                          <line x1={120 + parallelDistanceD * 1200} y1="100" x2={85 + parallelDistanceD * 1200} y2="100" stroke="#22c55e" strokeWidth="4" />
                          <text x={(240 + parallelDistanceD * 1200) / 2} y="90" fill="#22c55e" fontSize="12" fontWeight="bold" textAnchor="middle">
                            ✓ ATTRACTION (F/L = {parallelForceCalc.forcePerMeterMicroN} μN/m)
                          </text>
                        </>
                      ) : (
                        <>
                          <line x1="120" y1="100" x2="85" y2="100" stroke="#ef4444" strokeWidth="4" />
                          <line x1={120 + parallelDistanceD * 1200} y1="100" x2={155 + parallelDistanceD * 1200} y2="100" stroke="#ef4444" strokeWidth="4" />
                          <text x={(240 + parallelDistanceD * 1200) / 2} y="90" fill="#ef4444" fontSize="12" fontWeight="bold" textAnchor="middle">
                            ✗ REPULSION (F/L = {parallelForceCalc.forcePerMeterMicroN} μN/m)
                          </text>
                        </>
                      )}
                    </svg>
                  </div>

                  <div className="lg:col-span-5 space-y-3">
                    <div className="p-4 bg-slate-800/60 rounded-2xl border border-slate-700/60 space-y-3">
                      <motion.button
                        aria-label={`Toggle current direction: Currently ${sameDirectionCurrent ? 'same direction' : 'opposite direction'}`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setSameDirectionCurrent(v => !v);
                          audioManager.play('tap');
                        }}
                        className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 ${
                          sameDirectionCurrent ? 'bg-emerald-900 border border-emerald-600 text-emerald-200' : 'bg-rose-900 border border-rose-600 text-rose-200'
                        }`}
                      >
                        <span>{sameDirectionCurrent ? '✓' : '✗'}</span>
                        <span>Current Sense: {sameDirectionCurrent ? 'SAME Direction (Attract)' : 'OPPOSITE Direction (Repel)'}</span>
                      </motion.button>

                      <div className="flex justify-between text-xs font-bold">
                        <span>Separation (d):</span>
                        <span className="text-gold-400 font-mono">{(parallelDistanceD * 100).toFixed(1)} cm</span>
                      </div>
                      <input
                        type="range"
                        min={0.02}
                        max={0.15}
                        step={0.01}
                        value={parallelDistanceD}
                        aria-label="Conductor Separation Distance (d) in meters"
                        onChange={e => handleParallelDistanceChange(Number(e.target.value))}
                        className="w-full accent-gold-500 cursor-pointer"
                      />

                      <div className="flex justify-between text-xs font-bold">
                        <span>Currents I₁ & I₂:</span>
                        <span className="text-amber-400 font-mono">{parallelI1} A</span>
                      </div>
                      <input
                        type="range"
                        min={1}
                        max={50}
                        value={parallelI1}
                        aria-label="Conductor Current Magnitude in Amperes"
                        onChange={e => {
                          const v = Number(e.target.value);
                          setParallelI1(v);
                          setParallelI2(v);
                        }}
                        className="w-full accent-amber-500 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* ── SLIDE 4: GALVANOMETER & RADIAL FIELD ── */}
              {currentSlide === 4 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  <div className="lg:col-span-7 bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col items-center justify-center min-h-[280px] relative">
                    <svg viewBox="0 0 360 220" className="w-full" aria-label="Moving Coil Galvanometer Radial Magnetic Field Diagram">
                      {/* Concave Cylindrical Magnetic Poles */}
                      <path d="M 40 40 C 90 80, 90 140, 40 180 Z" fill="#ef4444" />
                      <text x="60" y="115" fill="white" fontWeight="bold" fontSize="16">N</text>

                      <path d="M 320 40 C 270 80, 270 140, 320 180 Z" fill="#3b82f6" />
                      <text x="290" y="115" fill="white" fontWeight="bold" fontSize="16">S</text>

                      {/* Cylindrical Soft Iron Core */}
                      <circle cx="180" cy="110" r="35" fill="#475569" stroke="#94a3b8" strokeWidth="2" />
                      <text x="180" y="114" fill="#e2e8f0" fontSize="9" textAnchor="middle">Soft Iron</text>

                      {/* Rotating Coil Pointer */}
                      <motion.g
                        animate={{ rotate: parseFloat(galvanometerDeflection.deg) }}
                        transition={{ type: 'spring', stiffness: 120, damping: 14 }}
                        style={{ originX: '180px', originY: '110px' }}
                      >
                        <rect x="145" y="75" width="70" height="70" fill="none" stroke="#f59e0b" strokeWidth="3" rx="4" />
                        <line x1="180" y1="110" x2="180" y2="30" stroke="#ef4444" strokeWidth="3" />
                        <circle cx="180" cy="30" r="4" fill="#ef4444" />
                      </motion.g>

                      {/* Linear Dial Scale */}
                      <path d="M 120 30 Q 180 10, 240 30" fill="none" stroke="#64748b" strokeWidth="2" />
                      {[-60, -30, 0, 30, 60].map(a => (
                        <text key={a} x={180 + a} y="22" fill="#94a3b8" fontSize="8" textAnchor="middle">{a}°</text>
                      ))}
                    </svg>
                    <div className="text-xs font-mono text-emerald-400 mt-2">
                      Deflection: φ = {galvanometerDeflection.deg}° | Sensitivity S_i = {galvanometerDeflection.si} rad/A
                    </div>
                  </div>

                  <div className="lg:col-span-5 space-y-3">
                    <div className="p-4 bg-slate-800/60 rounded-2xl border border-slate-700/60 space-y-3">
                      <div className="flex justify-between text-xs font-bold">
                        <span>Input Current (I):</span>
                        <span className="text-gold-400 font-mono">{galvanometerCurrent.toFixed(2)} mA</span>
                      </div>
                      <input
                        type="range"
                        min={-3.0}
                        max={3.0}
                        step={0.1}
                        value={galvanometerCurrent}
                        aria-label="Galvanometer Coil Current in milliAmperes"
                        onChange={e => handleGalvanometerCurrentChange(Number(e.target.value))}
                        className="w-full accent-gold-500 cursor-pointer"
                      />

                      <div className="flex justify-between text-xs font-bold">
                        <span>Number of Turns (N):</span>
                        <span className="text-gold-400 font-mono">{galvanometerTurnsN}</span>
                      </div>
                      <input
                        type="range"
                        min={50}
                        max={300}
                        step={25}
                        value={galvanometerTurnsN}
                        aria-label="Galvanometer Coil Number of Turns (N)"
                        onChange={e => setGalvanometerTurnsN(Number(e.target.value))}
                        className="w-full accent-gold-500 cursor-pointer"
                      />

                      <div className="p-2.5 bg-slate-900 rounded-xl text-[11px] font-mono text-slate-300 border border-slate-800">
                        Radial Field Condition: sin(θ) = 1 ⇒ τ_def = NIAB (Equally divided linear scale)
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <motion.button
              aria-label="Go to previous exploration lab"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setCurrentSlide(s => Math.max(0, s - 1));
                audioManager.play('tap');
              }}
              disabled={currentSlide === 0}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold disabled:opacity-40"
            >
              ← Previous Lab
            </motion.button>

            <span className="text-xs text-slate-400 font-mono">
              Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                aria-label="Go to next exploration lab"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentSlide(s => s + 1);
                  audioManager.play('whoosh');
                }}
                className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-gold-600/30"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                aria-label="Enter sandbox mode"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30"
              >
                Enter Free Sandbox →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: FREE PLAY SANDBOX ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">
          <div className="p-6 bg-slate-900/90 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="text-2xl font-black text-white">🎛️ Electromagnetic Free Sandbox</h3>
                <p className="text-slate-400 text-xs mt-0.5">Explore any configuration with zero scoring or time constraints.</p>
              </div>
              <motion.button
                aria-label="Proceed to ISC challenge mode"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-bold rounded-2xl text-xs shadow-lg shadow-emerald-600/30"
              >
                Ready for ISC Exam Challenges →
              </motion.button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4 border-t border-slate-800">
              <div className="lg:col-span-8 bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col items-center justify-center">
                <canvas ref={canvasRef} width={500} height={280} className="w-full max-w-lg" aria-label="Sandbox interactive electromagnetic canvas" />
              </div>

              <div className="lg:col-span-4 space-y-3">
                <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700 text-xs space-y-2">
                  <div className="text-gold-400 font-bold uppercase">Multimeter Design Sandbox</div>
                  <div className="flex gap-2">
                    <button
                      aria-label="Select Ammeter mode"
                      onClick={() => setMeterType('ammeter')}
                      className={`flex-1 py-1.5 rounded-lg font-bold ${meterType === 'ammeter' ? 'bg-gold-600 text-white' : 'bg-slate-900 text-slate-400'}`}
                    >
                      Ammeter (Shunt)
                    </button>
                    <button
                      aria-label="Select Voltmeter mode"
                      onClick={() => setMeterType('voltmeter')}
                      className={`flex-1 py-1.5 rounded-lg font-bold ${meterType === 'voltmeter' ? 'bg-gold-600 text-white' : 'bg-slate-900 text-slate-400'}`}
                    >
                      Voltmeter (Series)
                    </button>
                  </div>

                  <div className="flex justify-between text-slate-300">
                    <span>Desired Range:</span>
                    <span className="text-amber-400 font-mono">{meterFullScale} {meterType === 'ammeter' ? 'A' : 'V'}</span>
                  </div>
                  <input
                    type="range"
                    min={meterType === 'ammeter' ? 1 : 5}
                    max={meterType === 'ammeter' ? 50 : 250}
                    value={meterFullScale}
                    aria-label={`Target meter scale range in ${meterType === 'ammeter' ? 'Amperes' : 'Volts'}`}
                    onChange={e => setMeterFullScale(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />

                  {/* Calculated Conversion Resistor */}
                  <div className="p-3 bg-slate-900 rounded-xl font-mono text-[11px] space-y-1">
                    {meterType === 'ammeter' ? (
                      <>
                        <div className="text-emerald-400 font-bold">Parallel Shunt Resistance:</div>
                        <div className="text-white">S = (I_g·R_g)/(I - I_g) = {((0.001 * 50) / (meterFullScale - 0.001)).toFixed(5)} Ω</div>
                        <div className="text-slate-400 text-[10px]">Ammeter sits in SERIES with circuit</div>
                      </>
                    ) : (
                      <>
                        <div className="text-gold-400 font-bold">Series Multiplier Resistor:</div>
                        <div className="text-white">R = V/I_g - R_g = {(meterFullScale / 0.001 - 50).toFixed(0)} Ω</div>
                        <div className="text-slate-400 text-[10px]">Voltmeter sits in PARALLEL with component</div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: ADAPTIVE CHALLENGE SYSTEM ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">
          {/* Status & Progress Bar */}
          <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-300">
                  Challenge {currentChallenge + 1} of {filteredChallenges.length}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-mono">
                  Competency: {challenge.competencyLevel}
                </span>
              </div>

              <motion.span
                key={difficulty}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${
                  difficulty === 'foundation'
                    ? 'bg-emerald-950/80 border-emerald-600 text-emerald-300'
                    : difficulty === 'advanced'
                    ? 'bg-rose-950/80 border-rose-600 text-rose-300'
                    : 'bg-gold-950/80 border-gold-600 text-gold-300'
                }`}
              >
                {difficulty} Tier
              </motion.span>
            </div>

            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-gold-500 to-purple-500 rounded-full"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 bg-slate-900/90 rounded-3xl border shadow-xl transition-all ${
              wrongFlash ? 'bg-rose-950/60 border-rose-500' : 'border-slate-800'
            }`}
          >
            <div className="flex items-center gap-2 mb-2 text-xs font-bold text-gold-400">
              <span>📌 Question ({challenge.nodeId})</span>
            </div>
            <h2 className="text-lg md:text-xl font-bold text-white leading-snug mb-6">{challenge.question}</h2>

            {/* MCQ Types */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="space-y-3">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={wrongShake ? { duration: 0.4 } : {}}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    className={`w-full text-left p-4 rounded-2xl text-sm font-medium transition-all border ${
                      showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : 'bg-slate-800/80 border-slate-700 hover:border-gold-500 text-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 flex items-center justify-center rounded-full bg-slate-700 text-xs font-bold">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span>{opt}</span>
                      </div>
                      {showExplanation && (
                        <span className="text-sm font-bold">
                          {i === challenge.correctIndex ? (
                            <span className="text-emerald-400">✓ Correct</span>
                          ) : (
                            <span className="text-rose-400">✗</span>
                          )}
                        </span>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            )}

            {/* Drag Label Type */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-2xl border border-slate-800">
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      role="button"
                      tabIndex={0}
                      aria-label={`Draggable component: ${item.label}`}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3.5 py-2 bg-gold-700/80 hover:bg-gold-600 text-white text-xs font-bold rounded-xl cursor-grab border border-gold-500/50 shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Object.keys(challenge.correctMapping || {}).map(targetId => (
                    <div
                      key={targetId}
                      role="region"
                      aria-label={`Drop target for role: ${targetId}`}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(targetId)}
                      className="p-4 bg-slate-950 rounded-2xl border-2 border-dashed border-slate-700 flex flex-col justify-center min-h-[70px]"
                    >
                      <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">Target Role: {targetId}</div>
                      <div className="text-sm font-bold text-emerald-400">
                        {droppedLabels[targetId] ? `✓ ${droppedLabels[targetId]}` : '👉 Drop matching component here'}
                      </div>
                    </div>
                  ))}
                </div>

                <motion.button
                  aria-label="Verify diagram label assignments"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-6 py-2.5 bg-gold-600 text-white rounded-xl text-xs font-bold"
                >
                  Verify Diagram Labels
                </motion.button>
              </div>
            )}

            {/* Drag Sort Type */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                {(sortArrangement.length === challenge.sortItems.length
                  ? sortArrangement.map(idx => challenge.sortItems![idx])
                  : challenge.sortItems
                ).map((item, displayIndex) => (
                  <motion.div
                    key={displayIndex}
                    role="button"
                    tabIndex={0}
                    aria-label={`Step ${displayIndex + 1}: ${item}`}
                    draggable
                    onDragStart={() => setDraggedItem(String(displayIndex))}
                    onDragOver={e => e.preventDefault()}
                    onDrop={() => {
                      const fromIdx = parseInt(draggedItem || '0');
                      handleSortMove(fromIdx, displayIndex);
                    }}
                    whileHover={{ scale: 1.01 }}
                    className="p-3.5 bg-slate-800/80 rounded-2xl border border-slate-700 text-slate-200 text-sm flex items-center gap-3 cursor-grab"
                  >
                    <span className="w-6 h-6 flex items-center justify-center rounded-full bg-slate-700 text-xs font-bold text-gold-300">
                      {displayIndex + 1}
                    </span>
                    <span>{item}</span>
                  </motion.div>
                ))}

                <motion.button
                  aria-label="Check sequence order of derivation steps"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="px-6 py-2.5 bg-gold-600 text-white rounded-xl text-xs font-bold"
                >
                  Check Step Order
                </motion.button>
              </div>
            )}

            {/* Numeric Type */}
            {challenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <input
                    type="number"
                    step="any"
                    value={numericInput}
                    aria-label={`Enter numerical value in ${challenge.unit}`}
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter calculated numerical value..."
                    className="px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm flex-1 min-w-[200px]"
                  />
                  <span className="text-sm font-bold text-slate-400">{challenge.unit}</span>
                  <motion.button
                    aria-label="Submit numeric solution"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-6 py-3 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold disabled:opacity-50"
                  >
                    Submit Value
                  </motion.button>
                </div>
              </div>
            )}

            {/* Construct Type */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Add derivation part: ${part}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3 py-1.5 bg-gold-900/60 border border-gold-700 text-gold-200 text-xs rounded-xl font-mono"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 min-h-[80px] flex flex-wrap items-center gap-2" role="region" aria-label="Derivation assembly workspace">
                  {constructParts.map((p, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="px-3 py-1 bg-gold-700 text-white rounded-lg text-xs font-mono flex items-center gap-2"
                    >
                      <span>{p}</span>
                      <button
                        aria-label={`Remove part ${p}`}
                        onClick={() => setConstructParts(parts => parts.filter((_, i) => i !== idx))}
                        className="text-red-300 font-bold"
                      >
                        ✕
                      </button>
                    </motion.div>
                  ))}
                  {constructParts.length === 0 && <span className="text-xs text-slate-500">Click steps above to build proof...</span>}
                </div>

                <motion.button
                  aria-label="Verify constructed mathematical proof"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-6 py-2.5 bg-gold-600 text-white rounded-xl text-xs font-bold"
                >
                  Verify Constructed Derivation
                </motion.button>
              </div>
            )}

            {/* Progressive Step-by-Step Explanation Reveal */}
            {showExplanation && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-5 bg-amber-950/40 border border-amber-700/60 rounded-2xl space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Step-by-Step Rigorous Physics Solution:
                </div>
                {challenge.explanation
                  .split('. ')
                  .filter(s => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, i) => (
                    <motion.p key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-slate-200 text-sm leading-relaxed">
                      <span className="font-bold text-amber-400 font-mono mr-1">{i + 1}.</span>
                      {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                  <motion.button
                    aria-label="Reveal next explanation step"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setRevealedSteps(s => s + 1)}
                    className="px-4 py-2 bg-amber-700 hover:bg-amber-600 text-white text-xs font-bold rounded-xl"
                  >
                    Reveal Next Reasoning Step →
                  </motion.button>
                ) : (
                  <motion.button
                    aria-label="Proceed to next challenge or final review"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextChallenge}
                    className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow-lg shadow-emerald-600/30"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length ? 'Finalise Master Assessment →' : 'Next Challenge →'}
                  </motion.button>
                )}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION & REAL-WORLD REPORT ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-6 space-y-6">
          <div className="p-8 bg-gradient-to-br from-gold-950 via-slate-900 to-purple-950 rounded-3xl border border-gold-700/50 text-center space-y-4">
            <h2 className="text-3xl font-black text-white">🏆 Module Assessment Complete!</h2>
            <div className="flex justify-center gap-6 text-sm font-mono">
              <div className="p-3 bg-slate-900/80 rounded-2xl border border-slate-800">
                <div className="text-slate-400 text-xs">Final Score</div>
                <div className="text-2xl font-bold text-emerald-400">{Math.max(0, 100 - errors * 5)}%</div>
              </div>
              <div className="p-3 bg-slate-900/80 rounded-2xl border border-slate-800">
                <div className="text-slate-400 text-xs">BKT Mastery Status</div>
                <div className="text-2xl font-bold text-gold-400 capitalize">{masteryLevel}</div>
              </div>
            </div>

            {/* Motivational Feedback Banner */}
            <div
              className={`p-5 rounded-2xl border text-sm font-medium ${
                errors === 0
                  ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                  : errors <= 3
                  ? 'bg-gold-950/60 border-gold-500 text-gold-200'
                  : errors <= 7
                  ? 'bg-amber-950/60 border-amber-500 text-amber-200'
                  : 'bg-rose-950/60 border-rose-500 text-rose-200'
              }`}
            >
              <div className="text-lg font-black tracking-wide uppercase mb-1">
                {errors === 0
                  ? 'PERFECT SCORE!'
                  : errors <= 3
                  ? 'Great work!'
                  : errors <= 7
                  ? 'Good effort!'
                  : 'Do not give up — You WILL get this!'}
              </div>
              <p className="text-xs md:text-sm opacity-90">
                {errors === 0
                  ? 'Flawless mastery! You demonstrated comprehensive command of Ampère circulation, crossed-field velocity selection, and precision meter calibration.'
                  : errors <= 3
                  ? 'Strong performance! You have a solid grasp of electromagnetic principles and mathematical derivations.'
                  : errors <= 7
                  ? 'Good effort! Review the diagnosed misconceptions below and retry challenging problems to solidify your understanding.'
                  : 'Electromagnetism is conceptually demanding. Review the core physical principles below and re-test the interactive sandbox labs!'}
              </p>
            </div>
          </div>

          {/* Spaced Repetition (SM-2) Visible Schedule */}
          <div className="p-6 bg-amber-950/40 rounded-3xl border border-amber-600/60 shadow-lg space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-base font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2">
                <span>📅</span> Spaced Repetition (SM-2) Review Schedule
              </h3>
              <span className="px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-mono font-bold rounded-full">
                Review in {srsIntervalDays} {srsIntervalDays === 1 ? 'day' : 'days'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className={`p-3.5 rounded-2xl border transition-all ${
                errors === 0 ? 'bg-emerald-950/80 border-emerald-500 shadow-md ring-1 ring-emerald-400' : 'bg-slate-900/60 border-slate-800 opacity-60'
              }`}>
                <div className="font-bold text-slate-200">0 Errors (Mastered)</div>
                <div className="text-emerald-400 font-mono text-sm font-extrabold mt-1">review in 7 days</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Consolidate long-term retention</div>
              </div>

              <div className={`p-3.5 rounded-2xl border transition-all ${
                errors >= 1 && errors <= 3 ? 'bg-gold-950/80 border-gold-500 shadow-md ring-1 ring-gold-400' : 'bg-slate-900/60 border-slate-800 opacity-60'
              }`}>
                <div className="font-bold text-slate-200">1–3 Errors (Reinforcing)</div>
                <div className="text-gold-400 font-mono text-sm font-extrabold mt-1">review in 3 days</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Strengthen problem-solving links</div>
              </div>

              <div className={`p-3.5 rounded-2xl border transition-all ${
                errors >= 4 ? 'bg-rose-950/80 border-rose-500 shadow-md ring-1 ring-rose-400' : 'bg-slate-900/60 border-slate-800 opacity-60'
              }`}>
                <div className="font-bold text-slate-200">4+ Errors (Needs Practice)</div>
                <div className="text-rose-400 font-mono text-sm font-extrabold mt-1">review in 1 day</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Re-engage foundational principles</div>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Active spaced recall schedules your next review in{' '}
              <strong className="text-amber-300 font-mono font-bold">
                {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}
              </strong>{' '}
              based on your performance ({errors} {errors === 1 ? 'error' : 'errors'}). Reviews are automatically stored to your personalized learning graph.
            </p>
          </div>

          {/* Misconception Diagnostic Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-6 bg-rose-950/40 rounded-3xl border border-rose-800/60 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 uppercase tracking-wider flex items-center gap-2">
                <span>⚠️</span> Diagnosed Conceptual Misconceptions
              </h3>
              {hitMisconceptions.map((idx, i) => {
                const m = misconceptions?.[idx];
                if (!m) return null;
                return (
                  <div key={i} className="p-3.5 bg-slate-900 rounded-2xl border border-slate-800 text-xs space-y-1">
                    <div className="text-rose-300 font-bold flex items-center gap-1.5">
                      <span>✗ Misconception:</span>
                      <span>{m.misconception}</span>
                    </div>
                    <div className="text-emerald-300 flex items-center gap-1.5">
                      <span>✓ Physical Correction:</span>
                      <span>{m.correction}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Capstone Real-World Activity */}
          <div className="p-6 bg-slate-900/90 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <span aria-hidden="true">🏗️</span> {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-sm text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="space-y-2">
              {REAL_WORLD_ACTIVITY.steps.map((st, i) => (
                <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 text-xs text-slate-300 font-mono flex items-start gap-2">
                  <span className="text-gold-400 font-bold">{i + 1}.</span>
                  <span>{st}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Floating Sim Engine Banner & Feedback Components */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Mastery Achieved!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C12_PhysicsAmperesCircuitalSim;