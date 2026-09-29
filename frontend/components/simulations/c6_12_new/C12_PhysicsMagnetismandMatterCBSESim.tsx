'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// -----------------------------------------------------------------------------
// NODE DEFINITIONS & CONSTANTS
// -----------------------------------------------------------------------------

const ALL_NODE_IDS = [
  'c12_phy_cbse_166', // Introduction to Magnetism: History and Basic Observations
  'c12_phy_cbse_167', // Earth's Magnetic Field
  'c12_phy_cbse_168', // Magnetic Poles and Force Behavior
  'c12_phy_cbse_169', // Non-existence of Magnetic Monopoles
  'c12_phy_cbse_170', // Magnetic Field Lines - Visualization and Properties
  'c12_phy_cbse_171', // Comparison of Magnetic and Electric Field Lines
  'c12_phy_cbse_172', // Bar Magnet as Equivalent Solenoid - Conceptual Analogy
  'c12_phy_cbse_173', // Axial Magnetic Field of a Bar Magnet
  'c12_phy_cbse_174', // Equatorial Magnetic Field of a Bar Magnet
  'c12_phy_cbse_175', // Torque on a Magnetic Dipole in a Uniform Magnetic Field
  'c12_phy_cbse_176', // Magnetic Potential Energy of a Dipole
  'c12_phy_cbse_177', // Equilibrium Configurations of a Magnetic Dipole
  'c12_phy_cbse_178', // Electrostatic-Magnetostatic Dipole Analogy
  'c12_phy_cbse_179', // Gauss's Law of Magnetism - Statement and Concept
  'c12_phy_cbse_180', // Gauss's Law of Magnetism - Mathematical Formulation
  'c12_phy_cbse_181', // Magnetization - Definition and Physical Meaning
  'c12_phy_cbse_182', // Magnetic Intensity (H-field) and Field Relations in Materials
  'c12_phy_cbse_183', // Magnetic Susceptibility and Permeability
  'c12_phy_cbse_184', // Diamagnetic Materials - Properties and Behavior
  'c12_phy_cbse_185', // Paramagnetic Materials - Properties and Behavior
  'c12_phy_cbse_186', // Ferromagnetic Materials - Domain Theory
  'c12_phy_cbse_187', // Hard and Soft Ferromagnetic Materials
  'c12_phy_cbse_188', // Curie Temperature and Thermal Demagnetization
  'c12_phy_cbse_189', // Superconductors and the Meissner Effect
  'c12_phy_cbse_190', // Physical Quantities in Magnetism - Reference Summary
] as const;

type NodeId = typeof ALL_NODE_IDS[number];

// -----------------------------------------------------------------------------
// MANDATORY SECTIONS 1 - 6
// -----------------------------------------------------------------------------

const SCENARIO = {
  title: 'Magnetism & Matter Advanced Physics Research Lab',
  intro: 'Welcome to the High-Field Magnetics & Materials Laboratory at the National Institute of Advanced Physics. As a senior research physicist, you are tasked with investigating magnetic dipoles, field dynamics, Gauss’s Law for magnetism, and the quantum domain behaviors of magnetic matter.',
  context: 'You will operate interactive dipole visualizers, measure torque and potential energy in uniform fields, trace solenoid-magnet equivalences, analyze hysteresis loops in soft vs hard magnetic materials, and observe quantum levitation via the Meissner effect in high-temperature superconductors.',
};

const DISCOVERY_QUESTION = {
  question: 'If a bar magnet is sliced exactly in half perpendicular to its length, what happens to the magnetic poles of the two resulting pieces?',
  options: [
    'One half becomes a isolated North pole, and the other half becomes an isolated South pole.',
    'Each half becomes a complete bar magnet with its own North and South poles of equal strength.',
    'The magnetic poles are completely destroyed, leaving two unmagnetized iron pieces.',
    'The magnetic strength doubles in each half because the volume is halved.'
  ],
  correctIndex: 1,
  hintAfter: 'Magnetic monopoles do not exist in classical electromagnetism. Slicing a magnet divides microscopic atomic magnetic dipoles without isolating a single pole.',
};

const MISCONCEPTIONS = [
  {
    id: 'misc_1',
    misconception: 'Isolated magnetic monopoles can be created by repeatedly cutting a bar magnet.',
    correction: 'Cutting a magnet continually produces smaller magnets with both N and S poles. Gauss’s law for magnetism (∮ B·dA = 0) confirms that net magnetic charge is strictly zero.',
    nodeId: 'c12_phy_cbse_169',
  },
  {
    id: 'misc_2',
    misconception: 'Magnetic field lines start at the North pole and end at the South pole, just like electric field lines.',
    correction: 'Unlike electric field lines which originate on positive charges and terminate on negative charges, magnetic field lines form continuous closed loops that run from S to N inside the magnet.',
    nodeId: 'c12_phy_cbse_171',
  },
  {
    id: 'misc_3',
    misconception: 'Diamagnetic materials are attracted to strong magnetic fields like paramagnetic materials.',
    correction: 'Diamagnetic materials are weakly repelled by magnetic fields because their induced magnetic moment opposes the applied magnetic field (susceptibility χ < 0).',
    nodeId: 'c12_phy_cbse_184',
  },
  {
    id: 'misc_4',
    misconception: 'At the Curie temperature, a ferromagnetic material becomes diamagnetic.',
    correction: 'Above the Curie temperature (T_c), thermal agitation destroys long-range domain alignment, converting a ferromagnetic material into a paramagnetic material, not diamagnetic.',
    nodeId: 'c12_phy_cbse_188',
  },
  {
    id: 'misc_5',
    misconception: 'Soft iron is easy to magnetize and retains its magnetization permanently.',
    correction: 'Soft magnetic materials have high permeability and high retentivity but very low coercivity, meaning they demagnetize easily once the external field is removed.',
    nodeId: 'c12_phy_cbse_187',
  },
  {
    id: 'misc_6',
    misconception: 'Superconductors expel magnetic field lines simply because they are perfect conductors with zero resistance.',
    correction: 'Superconductors display perfect diamagnetism (Meissner Effect, χ = -1) which actively expels magnetic flux lines from their interior, a property distinct from perfect conductivity alone.',
    nodeId: 'c12_phy_cbse_189',
  },
];

const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Magnetic Dipole Field & Solenoid Analogy',
    instruction: 'Adjust the magnetic moment (M) and distance (r) to map axial and equatorial fields of a bar magnet and compare with a finite solenoid.',
    interactionType: 'field-mapper',
    nodeId: 'c12_phy_cbse_173' as NodeId,
  },
  {
    title: 'Lab 2: Torque & Potential Energy Dynamics',
    instruction: 'Rotate a magnetic dipole in a uniform B-field to observe torque (τ = M × B) and potential energy (U = -M·B) variation from 0° to 180°.',
    interactionType: 'torque-sim',
    nodeId: 'c12_phy_cbse_175' as NodeId,
  },
  {
    title: 'Lab 3: Gauss’s Law & Closed Surface Flux',
    instruction: 'Move a closed Gaussian surface across magnetic dipoles and single charge distributions to measure net flux (∮ B·dA vs ∮ E·dA).',
    interactionType: 'gauss-flux',
    nodeId: 'c12_phy_cbse_179' as NodeId,
  },
  {
    title: 'Lab 4: Hysteresis & Domain Dynamics',
    instruction: 'Cycle the magnetizing field (H) to trace the B-H hysteresis curve. Compare Soft Iron vs Hard Steel retentivity and coercivity.',
    interactionType: 'hysteresis-loop',
    nodeId: 'c12_phy_cbse_186' as NodeId,
  },
  {
    title: 'Lab 5: Thermal Demagnetization & Superconductivity',
    instruction: 'Vary sample temperature to observe Curie-Weiss phase transition and engage liquid nitrogen cooling to trigger the Meissner effect (χ = -1).',
    interactionType: 'temp-phase',
    nodeId: 'c12_phy_cbse_188' as NodeId,
  },
];

const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If a magnetic dipole is placed in a non-uniform magnetic field, what forces will act upon it?',
    options: [
      'It experiences zero net force and zero net torque.',
      'It experiences both a net torque AND a net translational force.',
      'It experiences only torque, never translational force.',
      'It experiences only translational force, never torque.'
    ],
    correctIndex: 1,
    verifyInstruction: 'In Lab 2, switch the field mode to non-uniform gradient to observe both rotation and linear acceleration of the dipole.',
    nodeId: 'c12_phy_cbse_175' as NodeId,
  },
  {
    question: 'Predict: What will happen to the magnetic susceptibility (χ) of a superconductor when it transitions below its critical temperature (T_c)?',
    options: [
      'χ approaches +infinity (perfect ferromagnetism)',
      'χ drops precisely to -1 (perfect diamagnetism)',
      'χ becomes 0 (complete non-magnetic transparent state)',
      'χ fluctuates randomly between +1 and -1'
    ],
    correctIndex: 1,
    verifyInstruction: 'In Lab 5, activate cryogenic cooling below T_c and inspect the measured susceptibility meter.',
    nodeId: 'c12_phy_cbse_189' as NodeId,
  },
];

const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice about the ratio of Axial Magnetic Field (B_axial) to Equatorial Magnetic Field (B_eq) at the same far distance (r >> l)?',
    observableOptions: [
      'B_axial / B_eq = 1.0',
      'B_axial / B_eq = 2.0',
      'B_axial / B_eq = 0.5',
      'B_axial / B_eq = 4.0'
    ],
    correctIndex: 1,
    nodeId: 'c12_phy_cbse_174' as NodeId,
  },
  {
    question: 'What happens to the magnetic domains of a ferromagnetic material as the external field H increases to saturation?',
    observableOptions: [
      'Domains shrink and rotate until all atomic dipoles align parallel to H.',
      'Domains split into isolated monopoles.',
      'Domains oscillate rapidly back and forth endlessly.',
      'Domains align perpendicular to H to minimize stored energy.'
    ],
    correctIndex: 0,
    nodeId: 'c12_phy_cbse_186' as NodeId,
  },
];

const REAL_WORLD_ACTIVITY = {
  title: 'Engineering MRI Superconducting Magnets & Transformer Cores',
  description: 'Apply principles of magnetic materials and hysteresis loss to select optimal core materials for 50Hz electrical power transformers and 3.0 Tesla MRI superconducting coils.',
  steps: [
    'Calculate hysteresis energy loss per cycle (W = ∮ H dB) for soft iron vs high-carbon steel.',
    'Determine the required coercivity (H_c) for permanent magnets used in MRI gradient assemblies (H_c > 10^5 A/m).',
    'Verify Meissner effect stabilization in NbTi superconducting coils operating at 4.2 K in liquid helium.',
    'Compute total power loss P_loss = (Hysteresis Loss + Eddy Current Loss) × frequency for a 100 kVA transformer core.',
  ],
};

// -----------------------------------------------------------------------------
// REFERENCE DEFINITIONS & DIAGNOSTICS
// -----------------------------------------------------------------------------

const PHYSICS_DEFINITIONS = [
  { term: 'Magnetic Moment (M)', def: 'Vector quantity M = m × 2l (or M = N I A for a coil), directed from South to North pole.', formula: 'M = I · A (A·m²)' },
  { term: 'Axial Field (B_axial)', def: 'Magnetic field along the magnetic axis at distance r: B = (μ₀/4π) · (2Mr / (r² - l²)²). For r >> l, B ≈ (μ₀/4π)(2M/r³).', formula: 'B_ax = (μ₀/4π)(2M/r³)' },
  { term: 'Equatorial Field (B_eq)', def: 'Magnetic field along the equatorial bisector: B = (μ₀/4π) · (M / (r² + l³)^(3/2)). For r >> l, B ≈ (μ₀/4π)(M/r³).', formula: 'B_eq = (μ₀/4π)(M/r³)' },
  { term: 'Torque on Dipole (τ)', def: 'Rotational effect on a dipole in field B: τ = M × B = M B sin(θ).', formula: 'τ = M B sin(θ)' },
  { term: 'Potential Energy (U)', def: 'Work done in turning dipole from 90° reference: U = -M · B = -M B cos(θ).', formula: 'U = -M B cos(θ)' },
  { term: 'Gauss’s Law for Magnetism', def: 'The net magnetic flux through any closed surface is identically zero (no monopoles).', formula: '∮ B · dA = 0' },
  { term: 'Magnetization (M_vec)', def: 'Net magnetic moment per unit volume of material: M = m_net / V.', formula: 'M = m_net / V (A/m)' },
  { term: 'Magnetic Intensity (H)', def: 'External field capability to magnetize a medium: H = B/μ₀ - M.', formula: 'B = μ₀(H + M)' },
  { term: 'Magnetic Susceptibility (χ)', def: 'Ratio of magnetization M to magnetic intensity H: χ = M / H.', formula: 'M = χ H' },
  { term: 'Relative Permeability (μ_r)', def: 'μ_r = μ / μ₀ = 1 + χ.', formula: 'μ_r = 1 + χ' },
];

// -----------------------------------------------------------------------------
// CHALLENGES ARRAY (22 Progressive Challenges: 7 Foundation, 8 Standard, 7 Advanced)
// -----------------------------------------------------------------------------

interface Challenge {
  id: string;
  nodeId: NodeId;
  type: 'multiple-choice' | 'numeric' | 'drag-sort' | 'classify';
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

const CHALLENGES: Challenge[] = [
  // --- FOUNDATION (7) ---
  {
    id: 'ch_1',
    nodeId: 'c12_phy_cbse_166',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'Which of the following fundamental properties correctly describes magnetic lines of force outside a bar magnet?',
    options: [
      'They extend from South pole to North pole.',
      'They continuously radiate outward to infinity without returning.',
      'They emerge from the North pole and enter the South pole.',
      'They intersect each other at points of maximum magnetic field strength.'
    ],
    correctIndex: 2,
    explanation: 'Outside a magnet, magnetic field lines emerge from the North pole and enter the South pole, forming continuous closed loops inside the magnet from S to N.',
    hints: [
      'Recall compass needle direction external to a magnet.',
      'North repels North and attracts South.',
      'Field lines point away from North poles outside the material.'
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_2',
    nodeId: 'c12_phy_cbse_169',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'What physical law or principle guarantees that magnetic monopoles cannot exist in classical electromagnetism?',
    options: [
      'Ampere’s Circuital Law',
      'Gauss’s Law for Electrostatics',
      'Gauss’s Law for Magnetism (∮ B·dA = 0)',
      'Faraday’s Law of Electromagnetic Induction'
    ],
    correctIndex: 2,
    explanation: 'Gauss’s Law for Magnetism states that the net magnetic flux through any closed Gaussian surface is zero, which means isolated magnetic charges (monopoles) do not exist.',
    hints: [
      'Think about closed surface integrals of field vectors.',
      'Net magnetic flux across any closed surface is zero.',
      'Look for the equation with ∮ B·dA.'
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_3',
    nodeId: 'c12_phy_cbse_177',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'At what orientation (θ) relative to a uniform magnetic field is a magnetic dipole in STABLE equilibrium?',
    options: ['θ = 90°', 'θ = 180°', 'θ = 0°', 'θ = 270°'],
    correctIndex: 2,
    explanation: 'At θ = 0°, potential energy U = -M·B cos(0°) = -MB (minimum energy) and torque τ = 0, which corresponds to stable equilibrium.',
    hints: [
      'Stable equilibrium corresponds to minimum potential energy.',
      'U = -M B cos(θ). When is cos(θ) maximum?',
      'cos(0°) = 1, making U = -MB.'
    ],
  },
  {
    id: 'ch_4',
    nodeId: 'c12_phy_cbse_184',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'What is the value of magnetic susceptibility (χ) for a diamagnetic substance?',
    options: [
      'Large and positive (χ >> 1)',
      'Small and positive (χ > 0)',
      'Small and negative (-1 < χ < 0)',
      'Exactly zero (χ = 0)'
    ],
    correctIndex: 2,
    explanation: 'Diamagnetic materials have a small negative magnetic susceptibility (-1 < χ < 0), meaning they develop weak induced magnetization opposite to the applied field.',
    hints: [
      'Diamagnetic substances are weakly repelled by magnets.',
      'Induced magnetization opposes external field H.',
      'Thus χ = M/H is small and negative.'
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_5',
    nodeId: 'c12_phy_cbse_187',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'Which material property is essential for selecting a core material for an AC transformer?',
    options: [
      'High coercivity and high retentivity',
      'Low retentivity and low coercivity (narrow hysteresis loop)',
      'Zero magnetic permeability',
      'Large negative magnetic susceptibility'
    ],
    correctIndex: 1,
    explanation: 'Transformer cores require soft magnetic materials with narrow hysteresis loops (low coercivity) to minimize energy dissipation (hysteresis loss) during cyclic magnetization.',
    hints: [
      'Energy loss per cycle equals area of B-H loop.',
      'Smaller loop area means less thermal loss.',
      'Soft iron has low coercivity and high permeability.'
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_6',
    nodeId: 'c12_phy_cbse_189',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'The complete ejection of magnetic flux from the interior of a superconductor below its critical temperature is known as:',
    options: [
      'Curie-Weiss Effect',
      'Barkhausen Effect',
      'Meissner Effect',
      'Hysteresis Effect'
    ],
    correctIndex: 2,
    explanation: 'The Meissner effect describes perfect diamagnetism (χ = -1, μ_r = 0) in superconductors, expelling all internal magnetic fields B = 0.',
    hints: [
      'It causes quantum magnetic levitation.',
      'It corresponds to perfect diamagnetism χ = -1.',
      'Discovered by Walther Meissner in 1933.'
    ],
    misconceptionIndex: 5,
  },
  {
    id: 'ch_7',
    nodeId: 'c12_phy_cbse_172',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'A short bar magnet of magnetic moment M is equivalent to a solenoid of N turns, area A, and current I when:',
    options: [
      'M = N · I · A',
      'M = N · I / A',
      'M = I · A / N',
      'M = N² · I · A'
    ],
    correctIndex: 0,
    explanation: 'The magnetic moment of a solenoid is M = N I A. At large distances, its axial field B = (μ₀/4π)(2NIA/r³) equals that of a bar magnet with dipole moment M = NIA.',
    hints: [
      'Dipole moment equals total current times total enclosed area.',
      'Total current for N turns is N × I.',
      'M = N I A.'
    ],
  },

  // --- STANDARD (8) ---
  {
    id: 'ch_8',
    nodeId: 'c12_phy_cbse_173',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'A short bar magnet has a magnetic moment of 0.40 A·m². Calculate the magnitude of the axial magnetic field at a distance of 0.20 m from its center. (Given μ₀/4�� = 10⁻⁷ T·m/A)',
    correctAnswer: 1.0e-5,
    tolerance: 0.1e-5,
    unit: 'T',
    explanation: 'B_axial = (μ₀/4π) · (2M / r³) = 10⁻⁷ · (2 × 0.40 / (0.20)³) = 10⁻⁷ · (0.80 / 0.008) = 10⁻⁷ · 100 = 1.0 × 10⁻⁵ T.',
    hints: [
      'Use formula B_ax = (μ₀/4π) · (2M / r³).',
      'r³ = (0.20)³ = 0.008 m³.',
      '2M / r³ = 0.80 / 0.008 = 100.'
    ],
  },
  {
    id: 'ch_9',
    nodeId: 'c12_phy_cbse_174',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'A magnetic needle has dipole moment M = 0.50 A·m². What is the equatorial magnetic field strength at a distance r = 0.10 m? (μ₀/4π = 10⁻⁷ T·m/A)',
    correctAnswer: 5.0e-5,
    tolerance: 0.2e-5,
    unit: 'T',
    explanation: 'B_eq = (μ₀/4π) · (M / r³) = 10⁻⁷ · (0.50 / 0.10³) = 10⁻⁷ · (0.50 / 0.001) = 5.0 × 10⁻⁵ T.',
    hints: [
      'Equatorial field B_eq = (μ₀/4π) · (M / r³).',
      'r³ = (0.10)³ = 0.001 m³.',
      '0.50 / 0.001 = 500.'
    ],
  },
  {
    id: 'ch_10',
    nodeId: 'c12_phy_cbse_175',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'A magnetic dipole of moment 1.5 A·m² is aligned at an angle of 30° to a uniform magnetic field of 0.40 T. Calculate the magnitude of torque experienced by the dipole.',
    correctAnswer: 0.30,
    tolerance: 0.02,
    unit: 'N·m',
    explanation: 'Torque τ = M B sin(θ) = 1.5 × 0.40 × sin(30°) = 0.60 × 0.50 = 0.30 N·m.',
    hints: [
      'τ = M B sin(θ).',
      'sin(30°) = 0.5.',
      'τ = 1.5 × 0.40 × 0.5.'
    ],
  },
  {
    id: 'ch_11',
    nodeId: 'c12_phy_cbse_176',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'Calculate the work required to rotate a magnetic dipole (M = 2.0 A·m²) in a uniform field B = 0.50 T from θ₁ = 0° (stable equilibrium) to θ₂ = 180° (unstable equilibrium).',
    correctAnswer: 2.0,
    tolerance: 0.1,
    unit: 'J',
    explanation: 'Work W = ΔU = U(180°) - U(0°) = (-MB cos 180°) - (-MB cos 0°) = MB(1 - (-1)) = 2 M B = 2 × 2.0 × 0.50 = 2.0 J.',
    hints: [
      'W = ΔU = -MB cos(θ₂) - (-MB cos(θ₁)).',
      'cos(180°) = -1, cos(0°) = 1.',
      'W = 2 MB.'
    ],
  },
  {
    id: 'ch_12',
    nodeId: 'c12_phy_cbse_181',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'A magnetic rod of volume 2.0 × 10⁻⁴ m³ has a net magnetic dipole moment of 4.0 A·m². Find its magnetization (M_vec).',
    correctAnswer: 20000,
    tolerance: 500,
    unit: 'A/m',
    explanation: 'Magnetization M_vec = m_net / V = 4.0 / (2.0 × 10⁻⁴) = 20,000 A/m.',
    hints: [
      'Magnetization is magnetic moment per unit volume.',
      'M_vec = m_net / V.',
      '4.0 / 0.0002 = 20000.'
    ],
  },
  {
    id: 'ch_13',
    nodeId: 'c12_phy_cbse_183',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'A magnetic material has a relative permeability μ_r = 501. Calculate its magnetic susceptibility χ.',
    correctAnswer: 500,
    tolerance: 1,
    unit: 'dimensionless',
    explanation: 'Relative permeability μ_r = 1 + χ, hence susceptibility χ = μ_r - 1 = 501 - 1 = 500.',
    hints: [
      'Relationship equation: μ_r = 1 + χ.',
      'Subtract 1 from μ_r.',
      '501 - 1 = 500.'
    ],
  },
  {
    id: 'ch_14',
    nodeId: 'c12_phy_cbse_188',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'According to Curie’s Law for paramagnetic substances, how does magnetic susceptibility χ vary with absolute temperature T?',
    options: [
      'χ is directly proportional to T (χ ∝ T)',
      'χ is inversely proportional to absolute temperature (χ ∝ 1/T)',
      'χ is proportional to T²',
      'χ is completely independent of temperature'
    ],
    correctIndex: 1,
    explanation: 'Curie’s Law states χ = C / T, where C is Curie’s constant and T is absolute temperature in Kelvin. Thermal agitation opposes magnetic alignment.',
    hints: [
      'Higher temperature increases thermal agitation.',
      'Thermal agitation randomizes atomic dipoles.',
      'Susceptibility decreases inversely with T.'
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_15',
    nodeId: 'c12_phy_cbse_178',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'In the electrostatic-magnetostatic analogy, which magnetic constant corresponds to 1 / (4π ε₀)?',
    options: ['μ₀', 'μ₀ / (4π)', '4π / μ₀', '1 / (μ₀ ε₀)'],
    correctIndex: 1,
    explanation: 'In electrostatic equations, electrostatic constant k_e = 1 / (4π ε₀). In magnetostatics, the corresponding factor is μ₀ / (4π).',
    hints: [
      'Compare Coulomb force constant with magnetic dipole constant.',
      'F_e uses 1/(4πε₀).',
      'B_dipole uses μ₀/(4π).'
    ],
  },

  // --- ADVANCED (7) ---
  {
    id: 'ch_16',
    nodeId: 'c12_phy_cbse_182',
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'Inside a solenoid filled with iron, magnetic intensity H = 1500 A/m and total magnetic flux density B = 1.5 T. Calculate the magnetization M inside the iron. (μ₀ = 4π × 10⁻⁷ T·m/A ≈ 1.2566 × 10⁻⁶ T·m/A)',
    correctAnswer: 1192190,
    tolerance: 10000,
    unit: 'A/m',
    explanation: 'B = μ₀(H + M) ⇒ H + M = B / μ₀ = 1.5 / (4π × 10⁻⁷) = 1,193,662 A/m. M = 1,193,662 - 1500 ≈ 1,192,162 A/m.',
    hints: [
      'Use relation B = μ₀(H + M).',
      'Solve for M: M = (B / μ₀) - H.',
      'B/μ₀ = 1.5 / (1.2566 × 10⁻⁶) = 1,193,662.'
    ],
  },
  {
    id: 'ch_17',
    nodeId: 'c12_phy_cbse_183',
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'Using the parameters from the previous challenge (H = 1500 A/m, M = 1.192 × 10⁶ A/m), calculate the magnetic susceptibility χ of the iron sample.',
    correctAnswer: 794.7,
    tolerance: 10,
    unit: 'dimensionless',
    explanation: 'χ = M / H = 1,192,162 / 1500 ≈ 794.77.',
    hints: [
      'χ = M / H.',
      'Divide magnetization M by magnetic intensity H.',
      '1,192,162 / 1500 ≈ 794.8.'
    ],
  },
  {
    id: 'ch_18',
    nodeId: 'c12_phy_cbse_173',
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'Two identical short bar magnets, each of magnetic moment M = 1.2 A·m², are placed with their centers separated by 0.30 m on the same axis with like poles facing each other. Calculate the net magnetic field at the midpoint between them.',
    correctAnswer: 0.0,
    tolerance: 0.0001,
    unit: 'T',
    explanation: 'Since like poles face each other along the common axis, the axial magnetic fields produced by the two identical magnets at the exact midpoint are equal in magnitude and opposite in direction, cancelling to zero.',
    hints: [
      'Like poles produce opposing field vectors along axis.',
      'The midpoint is equidistant from both identical magnets.',
      'B_net = B₁ - B₂ = 0.'
    ],
  },
  {
    id: 'ch_19',
    nodeId: 'c12_phy_cbse_176',
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'A magnetic dipole is oscillating in a uniform magnetic field B = 0.20 T. Its moment of inertia about the axis of oscillation is I = 1.0 × 10⁻⁴ kg·m² and its time period is T_p = 0.628 s. Calculate its magnetic moment M. (Take π ≈ 3.1416)',
    correctAnswer: 5.0,
    tolerance: 0.3,
    unit: 'A·m²',
    explanation: 'Time period T_p = 2π √(I / (M B)) ⇒ T_p² = 4π² I / (M B) ⇒ M = 4π² I / (T_p² B) = 4 × 9.87 × 10⁻⁴ / (0.3944 × 0.20) ≈ 5.0 A·m².',
    hints: [
      'Formula for oscillation period: T_p = 2π √(I / (MB)).',
      'Square both sides: T_p² = 4π² I / (MB).',
      'Rearrange for M: M = 4π² I / (T_p² B).'
    ],
  },
  {
    id: 'ch_20',
    nodeId: 'c12_phy_cbse_180',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Synthesis',
    question: 'If a magnetic monopole of strength q_m were discovered, how would Gauss’s Law for Magnetism be modified?',
    options: [
      '∮ B·dA = 0 (remains completely unchanged)',
      '∮ B·dA = μ₀ q_m(enclosed)',
      '∮ B·dA = q_m / ε₀',
      '∮ B·dA = μ₀ ε₀ q_m'
    ],
    correctIndex: 1,
    explanation: 'If magnetic monopoles existed, net magnetic flux would equal μ₀ times the enclosed magnetic charge: ∮ B·dA = μ₀ q_m(enclosed), directly analogous to Gauss’s Law for electrostatics (∮ E·dA = q_enclosed / ε₀).',
    hints: [
      'Recall electrostatic analogue: ∮ E·dA = q / ε₀.',
      'Magnetic equivalent uses permeability μ₀.',
      'Flux equals μ₀ times enclosed magnetic charge q_m.'
    ],
  },
  {
    id: 'ch_21',
    nodeId: 'c12_phy_cbse_186',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Synthesis',
    question: 'What happens to the area of the hysteresis loop of a ferromagnetic core material as the frequency of the AC magnetizing current increases?',
    options: [
      'The loop area contracts to zero.',
      'The loop area remains constant, but total power dissipation per second increases linearly with frequency.',
      'The loop area increases indefinitely.',
      'The material permanently loses all magnetization.'
    ],
    correctIndex: 1,
    explanation: 'Energy loss per cycle is equal to the area of the hysteresis loop. While loop area per cycle remains constant (for low-to-mid frequencies), the rate of energy loss (power loss = area × frequency) increases linearly with frequency.',
    hints: [
      'Hysteresis loop area represents energy lost PER CYCLE.',
      'Power loss = (Energy lost per cycle) × (Cycles per second).',
      'Thus power loss scales directly with frequency f.'
    ],
  },
  {
    id: 'ch_22',
    nodeId: 'c12_phy_cbse_189',
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Synthesis',
    question: 'A superconducting sphere of radius R is placed in a uniform external magnetic field B_ext = 0.05 T. Due to the Meissner effect (perfect diamagnetism χ = -1), what is the internal magnetic field B_inside?',
    correctAnswer: 0.0,
    tolerance: 0.00001,
    unit: 'T',
    explanation: 'In a superconductor below T_c, the Meissner effect forces B_inside = 0 identically everywhere inside the bulk material.',
    hints: [
      'Superconductors exhibit perfect diamagnetism.',
      'Perfect diamagnetism implies χ = -1 and μ_r = 0.',
      'B_inside = μ_r B_ext = 0.'
    ],
  },
];

// -----------------------------------------------------------------------------
// MAIN COMPONENT
// -----------------------------------------------------------------------------

export default function C12_PhysicsMagnetismandMatterCBSESim({
  onComplete,
}: {
  onComplete?: (score: number) => void;
}) {
  // Tab State
  const [activeTab, setActiveTab] = useState<'discovery' | 'lab' | 'challenges' | 'summary'>('discovery');

  // Interactive Lab State
  const [currentLabStep, setCurrentLabStep] = useState<number>(0);
  const [dipoleMoment, setDipoleMoment] = useState<number>(1.0); // A m^2
  const [distance, setDistance] = useState<number>(0.15); // meters
  const [dipoleAngle, setDipoleAngle] = useState<number>(45); // degrees
  const [bFieldExternal, setBFieldExternal] = useState<number>(0.2); // Tesla
  const [fieldMode, setFieldMode] = useState<'uniform' | 'gradient'>('uniform');
  const [materialType, setMaterialType] = useState<'dia' | 'para' | 'ferro_soft' | 'ferro_hard' | 'superconductor'>('ferro_soft');
  const [sampleTemp, setSampleTemp] = useState<number>(293); // Kelvin
  const [hFieldApplied, setHFieldApplied] = useState<number>(500); // A/m
  const [isSuperconducting, setIsSuperconducting] = useState<boolean>(false);

  // Challenge Mode State
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [numericAnswer, setNumericAnswer] = useState<string>('');
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);
  const [score, setScore] = useState<number>(0);
  const [attempts, setAttempts] = useState<number>(0);

  // SRS / BKT Systems
  const [bktStates, setBktStates] = useState<Record<NodeId, ReturnType<typeof createBKTState>>>(() => {
    const initial: Record<string, ReturnType<typeof createBKTState>> = {};
    ALL_NODE_IDS.forEach((id) => {
      initial[id] = createBKTState();
    });
    return initial as Record<NodeId, ReturnType<typeof createBKTState>>;
  });

  const [srsItems, setSrsItems] = useState<Record<string, ReturnType<typeof createReviewItem>>>(() => {
    const initial: Record<string, ReturnType<typeof createReviewItem>> = {};
    CHALLENGES.forEach((ch) => {
      initial[ch.id] = createReviewItem(ch.id);
    });
    return initial;
  });

  // UX & Animations
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHint, setCurrentHint] = useState<string>('');
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [sparklePos, setSparklePos] = useState<{ x: number; y: number } | null>(null);
  const inactivityTimer = useRef<NodeJS.Timeout | null>(null);

  // Discovery / Predictions state
  const [discoveryAnswer, setDiscoveryAnswer] = useState<number | null>(null);
  const [discoverySubmitted, setDiscoverySubmitted] = useState<boolean>(false);
  const [predictionAnswers, setPredictionAnswers] = useState<Record<number, number>>({});
  const [observationAnswers, setObservationAnswers] = useState<Record<number, number>>({});

  // Canvas Refs
  const dipoleCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const hysteresisCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // -----------------------------------------------------------------------------
  // HELPER CALCULATIONS
  // -----------------------------------------------------------------------------

  const currentChallenge = CHALLENGES[currentChallengeIndex];

  // Calculated dipole metrics
  const mu0 = 4 * Math.PI * 1e-7;
  const bAxial = (mu0 / (4 * Math.PI)) * ((2 * dipoleMoment) / Math.pow(distance, 3));
  const bEq = (mu0 / (4 * Math.PI)) * (dipoleMoment / Math.pow(distance, 3));
  const torqueVal = dipoleMoment * bFieldExternal * Math.sin((dipoleAngle * Math.PI) / 180);
  const potEnergyVal = -dipoleMoment * bFieldExternal * Math.cos((dipoleAngle * Math.PI) / 180);

  // Curie temperature logic
  const curieTempFerro = 1043; // Kelvin for iron
  const isAboveCurie = materialType.startsWith('ferro') && sampleTemp > curieTempFerro;

  // Inactivity Hint Timer
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    setShowHint(false);
    inactivityTimer.current = setTimeout(() => {
      if (activeTab === 'challenges' && currentChallenge) {
        setCurrentHint(currentChallenge.hints[0]);
        setShowHint(true);
        audioManager.play('hint');
      }
    }, 12000);
  }, [activeTab, currentChallenge]);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    };
  }, [resetInactivityTimer, currentChallengeIndex, activeTab]);

  // Speech greeting on load
  useEffect(() => {
    speechManager.speak('Welcome to Magnetism and Matter Physics Lab. Explore dipole dynamics, field geometry, and material magnetism.');
  }, []);

  // -----------------------------------------------------------------------------
  // CANVAS RENDERING
  // -----------------------------------------------------------------------------

  // Canvas 1: Dipole Torque & Field Vector Visualizer
  useEffect(() => {
    if (activeTab !== 'lab' || currentLabStep !== 1) return;
    const canvas = dipoleCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const width = canvas.width;
    const height = canvas.height;
    const cx = width / 2;
    const cy = height / 2;

    // Draw background grid
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Draw Uniform B-field horizontal arrows
    ctx.strokeStyle = '#0284c7';
    ctx.fillStyle = '#0284c7';
    ctx.lineWidth = 2;
    for (let y = 40; y < height; y += 60) {
      ctx.beginPath();
      ctx.moveTo(30, y);
      ctx.lineTo(width - 30, y);
      ctx.stroke();
      // Arrowhead
      ctx.beginPath();
      ctx.moveTo(width - 30, y);
      ctx.lineTo(width - 45, y - 6);
      ctx.lineTo(width - 45, y + 6);
      ctx.fill();
    }

    // Label B field
    ctx.font = 'bold 14px sans-serif';
    ctx.fillStyle = '#38bdf8';
    ctx.fillText(`Applied B-Field: ${bFieldExternal.toFixed(2)} T`, 40, 30);

    // Draw Dipole Magnet rotated by dipoleAngle
    const rad = (dipoleAngle * Math.PI) / 180;
    const magnetLen = 140;
    const dx = (magnetLen / 2) * Math.cos(rad);
    const dy = (magnetLen / 2) * Math.sin(rad);

    ctx.save();
    ctx.translate(cx, cy);

    // Draw North (red) and South (blue) pole halves
    ctx.rotate(-rad);

    // South half (-x)
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(0, -15, magnetLen / 2, 30);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 14px sans-serif';
    ctx.fillText('N', 40, 5);

    // South half (+x)
    ctx.fillStyle = '#3b82f6';
    ctx.fillRect(-magnetLen / 2, -15, magnetLen / 2, 30);
    ctx.fillStyle = '#ffffff';
    ctx.fillText('S', -55, 5);

    ctx.restore();

    // Draw Magnetic Moment Vector (M) Arrow (South to North)
    ctx.strokeStyle = '#f59e0b';
    ctx.fillStyle = '#f59e0b';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(cx - dx, cy + dy);
    ctx.lineTo(cx + dx, cy - dy);
    ctx.stroke();

    // Draw Force vectors at poles showing torque creation
    const forceMag = bFieldExternal * 40;
    // Force on N pole (rightward force due to B)
    ctx.strokeStyle = '#22c55e';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(cx + dx, cy - dy);
    ctx.lineTo(cx + dx + forceMag, cy - dy);
    ctx.stroke();

    // Force on S pole (leftward force due to B)
    ctx.beginPath();
    ctx.moveTo(cx - dx, cy + dy);
    ctx.lineTo(cx - dx - forceMag, cy + dy);
    ctx.stroke();

    // Arc angle indicator
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(cx, cy, 40, 0, -rad, true);
    ctx.stroke();
    ctx.fillStyle = '#cbd5e1';
    ctx.fillText(`θ = ${dipoleAngle}°`, cx + 45, cy - 10);
  }, [activeTab, currentLabStep, dipoleAngle, bFieldExternal]);

  // Canvas 2: Hysteresis Loop & Material Domain Visualizer
  useEffect(() => {
    if (activeTab !== 'lab' || currentLabStep !== 3) return;
    const canvas = hysteresisCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const w = canvas.width;
    const h = canvas.height;
    const cx = w / 2;
    const cy = h / 2;

    // Draw Axes
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(30, cy); ctx.lineTo(w - 30, cy); // H Axis
    ctx.moveTo(cx, 30); ctx.lineTo(cx, h - 30); // B Axis
    ctx.stroke();

    ctx.font = 'bold 12px sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('H (Magnetizing Field A/m) →', w - 180, cy - 10);
    ctx.fillText('↑ B (Flux Density T)', cx + 10, 45);

    // Parametric Hysteresis Loop plot based on material type
    let hc = 60; // Coercivity
    let br = 80; // Retentivity
    if (materialType === 'ferro_hard') {
      hc = 140;
      br = 120;
    } else if (materialType === 'ferro_soft') {
      hc = 35;
      br = 110;
    } else if (materialType === 'dia' || materialType === 'para') {
      hc = 0;
      br = 0;
    }

    ctx.strokeStyle = '#ec4899';
    ctx.lineWidth = 3;
    ctx.beginPath();

    if (materialType === 'dia') {
      // Linear negative slope
      ctx.moveTo(cx - 150, cy + 30);
      ctx.lineTo(cx + 150, cy - 30);
    } else if (materialType === 'para') {
      // Linear positive slope
      ctx.moveTo(cx - 150, cy - 30);
      ctx.lineTo(cx + 150, cy + 30);
    } else {
      // Ferromagnetic hysteresis S-curves
      for (let t = 0; t <= 2 * Math.PI; t += 0.05) {
        const hVal = 180 * Math.cos(t);
        // Sigmoidal deformation for hysteresis width
        const bVal = 130 * Math.sin(t) + (hVal > 0 ? br * 0.4 : -br * 0.4);
        const px = cx + (hVal / 200) * (w / 2 - 50);
        const py = cy - (bVal / 150) * (h / 2 - 50);

        if (t === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
    }
    ctx.stroke();

    // Mark current operating point H
    const currentH = hFieldApplied;
    const normH = (currentH / 1000) * (w / 2 - 50);
    ctx.fillStyle = '#facc15';
    ctx.beginPath();
    ctx.arc(cx + normH, cy - (normH * 0.6), 6, 0, 2 * Math.PI);
    ctx.fill();

    // Text details
    ctx.fillStyle = '#e2e8f0';
    ctx.font = '13px sans-serif';
    ctx.fillText(`Material: ${materialType.toUpperCase()}`, 40, 30);
    ctx.fillText(`Coercivity (H_c): ~${hc * 10} A/m`, 40, 50);
    ctx.fillText(`Retentivity (B_r): ~${(br / 100).toFixed(2)} T`, 40, 70);
  }, [activeTab, currentLabStep, materialType, hFieldApplied]);

  // -----------------------------------------------------------------------------
  // HANDLERS
  // -----------------------------------------------------------------------------

  const handleDiscoverySubmit = (index: number) => {
    setDiscoveryAnswer(index);
    setDiscoverySubmitted(true);
    if (index === DISCOVERY_QUESTION.correctIndex) {
      audioManager.play('celebration');
      speechManager.speak('Correct! Slicing a magnet produces two complete magnets. Monopoles do not exist.');
    } else {
      audioManager.play('error');
      speechManager.speak('Incorrect. Think about microscopic atomic dipoles inside the material.');
    }
  };

  const handlePredictionSubmit = (predIndex: number, optionIndex: number) => {
    setPredictionAnswers((prev) => ({ ...prev, [predIndex]: optionIndex }));
    const isCorrect = optionIndex === PREDICTION_QUESTIONS[predIndex].correctIndex;
    if (isCorrect) {
      audioManager.play('success');
      speechManager.speak('Prediction confirmed!');
    } else {
      audioManager.play('error');
    }
  };

  const handleObservationSubmit = (obsIndex: number, optionIndex: number) => {
    setObservationAnswers((prev) => ({ ...prev, [obsIndex]: optionIndex }));
    const isCorrect = optionIndex === OBSERVATION_QUESTIONS[obsIndex].correctIndex;
    if (isCorrect) {
      audioManager.play('drop-correct');
      speechManager.speak('Accurate observation recorded.');
    } else {
      audioManager.play('drop-wrong');
    }
  };

  const handleChallengeSubmit = () => {
    if (!currentChallenge) return;
    resetInactivityTimer();

    let isCorrect = false;
    if (currentChallenge.type === 'multiple-choice') {
      isCorrect = selectedOption === currentChallenge.correctIndex;
    } else if (currentChallenge.type === 'numeric') {
      const parsed = parseFloat(numericAnswer);
      if (!isNaN(parsed) && currentChallenge.correctAnswer !== undefined) {
        const tol = currentChallenge.tolerance || 0.05;
        isCorrect = Math.abs(parsed - currentChallenge.correctAnswer) <= tol;
      }
    }

    setAttempts((prev) => prev + 1);

    // Update BKT & SRS
    const nodeId = currentChallenge.nodeId;
    const updatedBKT = bktUpdate(bktStates[nodeId] || createBKTState(), isCorrect);
    setBktStates((prev) => ({ ...prev, [nodeId]: updatedBKT }));

    const updatedSRS = sm2Update(srsItems[currentChallenge.id] || createReviewItem(currentChallenge.id), isCorrect ? 5 : 1);
    setSrsItems((prev) => ({ ...prev, [currentChallenge.id]: updatedSRS }));

    if (isCorrect) {
      audioManager.play('celebration');
      speechManager.speak('Outstanding physics reasoning! Correct answer.');
      setScore((prev) => prev + 10);
      setFeedback({ isCorrect: true, message: 'Correct! ' + currentChallenge.explanation });
      setShowSuccess(true);
      setShowConfetti(true);
      setSparklePos({ x: window.innerWidth / 2, y: 300 });

      setTimeout(() => {
        setShowSuccess(false);
        setShowConfetti(false);
        setSparklePos(null);
      }, 2500);
    } else {
      audioManager.play('error');
      speechManager.speak('Not quite. Review the principles and try again.');
      setFeedback({
        isCorrect: false,
        message: 'Incorrect. ' + (currentChallenge.misconceptionIndex !== undefined ? MISCONCEPTIONS[currentChallenge.misconceptionIndex]?.correction : currentChallenge.explanation),
      });
    }
  };

  const handleNextChallenge = () => {
    setSelectedOption(null);
    setNumericAnswer('');
    setFeedback(null);
    setShowHint(false);
    if (currentChallengeIndex < CHALLENGES.length - 1) {
      setCurrentChallengeIndex((prev) => prev + 1);
      audioManager.play('whoosh');
    } else {
      // Completed all challenges
      audioManager.play('chime');
      speechManager.speak('Congratulations! You have completed all high-level challenges in Magnetism and Matter.');
      recordGameScore('c12_phy_cbse_166', score + 10);
      if (onComplete) onComplete(score + 10);
    }
  };

  // -----------------------------------------------------------------------------
  // RENDER SECTIONS
  // -----------------------------------------------------------------------------

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans selection:bg-gold-500 selection:text-slate-950">
      {/* Visual Feedback Overlays */}
      <HintBubble show={showHint} text={currentHint} />
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccess} text="Challenge Mastered!" />
      {sparklePos && <SparkleBurst show={true} x={sparklePos.x} y={sparklePos.y} />}

      {/* HEADER BAR */}
      <header className="max-w-7xl mx-auto mb-8 bg-slate-900/80 backdrop-blur border border-slate-800 rounded-2xl p-6 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className="px-3 py-1 bg-gold-500/10 text-gold-400 border border-gold-500/30 rounded-full text-xs font-semibold tracking-wider uppercase">
              Class 12 ISC Physics
            </span>
            <span className="px-3 py-1 bg-gold-500/10 text-gold-400 border border-gold-500/30 rounded-full text-xs font-semibold tracking-wider uppercase">
              Chapter 5: Magnetism & Matter
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gold-400 via-gold-300 to-gold-400">
            {SCENARIO.title}
          </h1>
        </div>

        {/* Global Progress & Navigation Tabs */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
          <div className="bg-slate-950/80 px-4 py-2 rounded-xl border border-slate-800 text-right">
            <div className="text-xs text-slate-400 uppercase tracking-widest font-semibold">Mastery Score</div>
            <div className="text-xl font-black text-gold-400">{score} PTS</div>
          </div>
        </div>
      </header>

      {/* TABS NAVIGATION */}
      <nav className="max-w-7xl mx-auto mb-8 flex flex-wrap gap-2 border-b border-slate-800 pb-4">
        {[
          { id: 'discovery', label: '1. Discovery & Hypotheses', icon: '💡' },
          { id: 'lab', label: '2. Interactive Lab Workspace', icon: '🔬' },
          { id: 'challenges', label: `3. Challenge Engine (${currentChallengeIndex + 1}/${CHALLENGES.length})`, icon: '🎯' },
          { id: 'summary', label: '4. Master Reference & Application', icon: '📚' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id as typeof activeTab);
              audioManager.play('tap');
            }}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-white shadow-lg shadow-gold-500/20 scale-105'
                : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto">
        {/* ----------------------------------------------------------------------------- */}
        {/* TAB 1: DISCOVERY & PRE-ASSESSMENT */}
        {/* ----------------------------------------------------------------------------- */}
        {activeTab === 'discovery' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Scenario Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />
              <h2 className="text-xl font-bold text-gold-400 mb-3 flex items-center gap-2">
                <span>📋</span> Lab Briefing & Context
              </h2>
              <p className="text-slate-300 leading-relaxed mb-4">{SCENARIO.intro}</p>
              <p className="text-slate-400 text-sm leading-relaxed">{SCENARIO.context}</p>
            </div>

            {/* Counter-Intuitive Discovery Question */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-amber-400 flex items-center gap-2">
                  <span>❓</span> Diagnostic Pre-Check Question
                </h3>
                <span className="text-xs bg-amber-500/10 border border-amber-500/30 text-amber-300 px-3 py-1 rounded-full">
                  Node: c12_phy_cbse_169
                </span>
              </div>
              <p className="text-lg text-slate-100 font-medium mb-6">{DISCOVERY_QUESTION.question}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {DISCOVERY_QUESTION.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleDiscoverySubmit(idx)}
                    disabled={discoverySubmitted}
                    className={`p-4 rounded-xl text-left border transition-all duration-200 ${
                      discoveryAnswer === idx
                        ? idx === DISCOVERY_QUESTION.correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                          : 'bg-rose-950/80 border-rose-500 text-rose-200'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-gold-500/50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold shrink-0">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="text-sm leading-snug">{option}</span>
                    </div>
                  </button>
                ))}
              </div>

              {discoverySubmitted && (
                <div className="p-4 rounded-xl bg-gold-950/50 border border-gold-800 text-gold-200 text-sm animate-fadeIn">
                  <span className="font-bold">Insight: </span>
                  {DISCOVERY_QUESTION.hintAfter}
                </div>
              )}
            </div>

            {/* Prediction Questions Array Section */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-bold text-gold-400 mb-6 flex items-center gap-2">
                <span>🔮</span> Theoretical Predictions (MANDATORY PRE-CHECK)
              </h3>
              <div className="space-y-6">
                {PREDICTION_QUESTIONS.map((pq, pIdx) => (
                  <div key={pIdx} className="bg-slate-950 border border-slate-800 rounded-xl p-5">
                    <p className="font-semibold text-slate-200 mb-3">{pq.question}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                      {pq.options.map((opt, oIdx) => (
                        <button
                          key={oIdx}
                          onClick={() => handlePredictionSubmit(pIdx, oIdx)}
                          className={`p-3 rounded-lg text-left text-xs font-medium border transition-all ${
                            predictionAnswers[pIdx] === oIdx
                              ? oIdx === pq.correctIndex
                                ? 'bg-emerald-900/60 border-emerald-500 text-emerald-100'
                                : 'bg-rose-900/60 border-rose-500 text-rose-100'
                              : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-gold-500/40'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                    {predictionAnswers[pIdx] !== undefined && (
                      <p className="text-xs text-gold-400 italic mt-2">
                        🔍 How to verify in Lab: {pq.verifyInstruction}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------------------------- */}
        {/* TAB 2: INTERACTIVE LAB WORKSPACE */}
        {/* ----------------------------------------------------------------------------- */}
        {activeTab === 'lab' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Exploration Steps Selector */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-wrap gap-2">
              {EXPLORATION_STEPS.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCurrentLabStep(idx);
                    audioManager.play('tap');
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    currentLabStep === idx
                      ? 'bg-gold-500 text-slate-950 shadow-md shadow-gold-500/20'
                      : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  {step.title}
                </button>
              ))}
            </div>

            {/* Active Lab Module Description */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold text-gold-400">{EXPLORATION_STEPS[currentLabStep].title}</h3>
                <span className="text-xs bg-slate-800 text-gold-300 px-3 py-1 rounded-full border border-slate-700">
                  Target Node: {EXPLORATION_STEPS[currentLabStep].nodeId}
                </span>
              </div>
              <p className="text-sm text-slate-300 mb-6">{EXPLORATION_STEPS[currentLabStep].instruction}</p>

              {/* DYNAMIC LAB EXPERIMENTS */}
              {/* LAB 1: Field Mapper & Solenoid Analogy */}
              {currentLabStep === 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-1 space-y-6 bg-slate-950 p-5 rounded-xl border border-slate-800">
                    <h4 className="font-bold text-slate-200 text-sm border-b border-slate-800 pb-2">Dipole Controls</h4>

                    <div>
                      <div className="flex justify-between text-xs mb-1 text-slate-400">
                        <span>Dipole Moment (M):</span>
                        <span className="text-gold-400 font-bold">{dipoleMoment.toFixed(2)} A·m²</span>
                      </div>
                      <input
                        type="range"
                        min="0.1"
                        max="5.0"
                        step="0.1"
                        value={dipoleMoment}
                        onChange={(e) => setDipoleMoment(parseFloat(e.target.value))}
                        className="w-full accent-gold-500"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1 text-slate-400">
                        <span>Distance (r):</span>
                        <span className="text-gold-400 font-bold">{distance.toFixed(2)} m</span>
                      </div>
                      <input
                        type="range"
                        min="0.05"
                        max="0.50"
                        step="0.01"
                        value={distance}
                        onChange={(e) => setDistance(parseFloat(e.target.value))}
                        className="w-full accent-gold-500"
                      />
                    </div>

                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2 text-xs">
                      <div className="font-bold text-gold-400 border-b border-slate-800 pb-1">Real-time Calculated Fields</div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">B_axial (2μ₀M / 4π r³):</span>
                        <span className="font-mono text-emerald-400 font-bold">{(bAxial * 1e6).toFixed(2)} μT</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">B_equatorial (μ₀M / 4π r³):</span>
                        <span className="font-mono text-emerald-400 font-bold">{(bEq * 1e6).toFixed(2)} μT</span>
                      </div>
                      <div className="flex justify-between border-t border-slate-800 pt-1">
                        <span className="text-slate-400">Ratio B_ax / B_eq:</span>
                        <span className="font-mono text-amber-400 font-bold">{(bAxial / bEq).toFixed(1)}</span>
                      </div>
                    </div>
                  </div>

                  {/* SVG Solenoid / Magnet Vector Analogy Diagram */}
                  <div className="lg:col-span-2 bg-slate-950 p-6 rounded-xl border border-slate-800 flex flex-col items-center justify-center min-h-[300px]">
                    <svg width="450" height="220" viewBox="0 0 450 220" className="w-full h-auto">
                      {/* Solenoid Coils */}
                      <g stroke="#0284c7" strokeWidth="3" fill="none">
                        {[50, 80, 110, 140, 170, 200, 230, 260, 290, 320, 350, 380].map((cx, i) => (
                          <ellipse key={i} cx={cx} cy="110" rx="12" ry="45" strokeDasharray="4 2" />
                        ))}
                      </g>
                      {/* Central Magnet Axis */}
                      <line x1="20" y1="110" x2="430" y2="110" stroke="#64748b" strokeWidth="2" strokeDasharray="5 5" />

                      {/* Bar Magnet Analogy Overlay */}
                      <rect x="120" y="85" width="100" height="50" fill="#ef4444" rx="4" />
                      <rect x="220" y="85" width="100" height="50" fill="#3b82f6" rx="4" />
                      <text x="160" y="115" fill="#ffffff" fontWeight="bold" fontSize="16">N</text>
                      <text x="260" y="115" fill="#ffffff" fontWeight="bold" fontSize="16">S</text>

                      {/* Axial Vector */}
                      <line x1="320" y1="110" x2="410" y2="110" stroke="#22c55e" strokeWidth="4" markerEnd="url(#arrow)" />
                      <text x="340" y="95" fill="#22c55e" fontSize="12" fontWeight="bold">B_axial Vector</text>

                      {/* Defs for arrows */}
                      <defs>
                        <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                          <path d="M 0 0 L 10 5 L 0 10 z" fill="#22c55e" />
                        </marker>
                      </defs>
                    </svg>
                    <p className="text-xs text-slate-400 mt-4 text-center">
                      A finite solenoid of N turns carrying current I behaves identically at large distances to a bar magnet with magnetic dipole moment M = N I A.
                    </p>
                  </div>
                </div>
              )}

              {/* LAB 2: Dipole Torque Visualizer */}
              {currentLabStep === 1 && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-1 space-y-6 bg-slate-950 p-5 rounded-xl border border-slate-800">
                    <h4 className="font-bold text-slate-200 text-sm border-b border-slate-800 pb-2">Orientation & Field Controls</h4>

                    <div>
                      <div className="flex justify-between text-xs mb-1 text-slate-400">
                        <span>Dipole Angle (θ):</span>
                        <span className="text-amber-400 font-bold">{dipoleAngle}°</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="180"
                        step="1"
                        value={dipoleAngle}
                        onChange={(e) => setDipoleAngle(parseInt(e.target.value))}
                        className="w-full accent-amber-500"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1 text-slate-400">
                        <span>External B-Field:</span>
                        <span className="text-gold-400 font-bold">{bFieldExternal.toFixed(2)} T</span>
                      </div>
                      <input
                        type="range"
                        min="0.05"
                        max="1.00"
                        step="0.05"
                        value={bFieldExternal}
                        onChange={(e) => setBFieldExternal(parseFloat(e.target.value))}
                        className="w-full accent-gold-500"
                      />
                    </div>

                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2 text-xs">
                      <div className="font-bold text-gold-400 border-b border-slate-800 pb-1">Dynamic Dipole Energetics</div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Torque magnitude (τ = MB sinθ):</span>
                        <span className="font-mono text-amber-400 font-bold">{torqueVal.toFixed(3)} N·m</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Potential Energy (U = -MB cosθ):</span>
                        <span className="font-mono text-gold-400 font-bold">{potEnergyVal.toFixed(3)} J</span>
                      </div>
                      <div className="flex justify-between border-t border-slate-800 pt-1">
                        <span className="text-slate-400">Equilibrium State:</span>
                        <span className="font-bold text-emerald-400">
                          {dipoleAngle === 0 ? 'Stable (U min)' : dipoleAngle === 180 ? 'Unstable (U max)' : 'Non-equilibrium'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Canvas */}
                  <div className="lg:col-span-2 bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-center">
                    <canvas ref={dipoleCanvasRef} width={500} height={320} className="w-full h-auto bg-slate-950 rounded-lg" />
                  </div>
                </div>
              )}

              {/* LAB 3: Gauss's Law Surface Integral */}
              {currentLabStep === 2 && (
                <div className="space-y-6 bg-slate-950 p-6 rounded-xl border border-slate-800">
                  <div className="max-w-3xl mx-auto text-center space-y-4">
                    <h4 className="text-lg font-bold text-gold-400">Closed Surface Magnetic Flux Integral (∮ B · dA)</h4>
                    <p className="text-xs text-slate-300">
                      Drag a closed Gaussian surface over isolated charges vs magnetic dipoles to calculate enclosed net flux.
                    </p>

                    {/* Interactive SVG Surface Diagram */}
                    <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 flex justify-center items-center">
                      <svg width="500" height="200" viewBox="0 0 500 200">
                        {/* Magnetic Dipole inside surface */}
                        <g transform="translate(100, 100)">
                          <ellipse cx="0" cy="0" rx="70" ry="60" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 4" />
                          <rect x="-30" y="-12" width="30" height="24" fill="#ef4444" />
                          <rect x="0" y="-12" width="30" height="24" fill="#3b82f6" />
                          <text x="-20" y="4" fill="#fff" fontSize="12" fontStyle="bold">N</text>
                          <text x="10" y="4" fill="#fff" fontSize="12" fontStyle="bold">S</text>
                          {/* Continuous Closed Loops */}
                          <path d="M -15 -12 C -15 -50, 15 -50, 15 -12" stroke="#22c55e" strokeWidth="1.5" fill="none" />
                          <path d="M -15 12 C -15 50, 15 50, 15 12" stroke="#22c55e" strokeWidth="1.5" fill="none" />
                          <text x="-40" y="80" fill="#38bdf8" fontSize="12">∮ B · dA = 0 (Net Flux = 0)</text>
                        </g>

                        {/* Electric Monopole comparison */}
                        <g transform="translate(380, 100)">
                          <ellipse cx="0" cy="0" rx="70" ry="60" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 4" />
                          <circle cx="0" cy="0" r="16" fill="#ef4444" />
                          <text x="-6" y="5" fill="#fff" fontSize="14" fontWeight="bold">+</text>
                          {/* Radiating lines */}
                          {[-45, 0, 45, 90, 135, 180, 225, 270].map((ang, i) => (
                            <line
                              key={i}
                              x1={18 * Math.cos((ang * Math.PI) / 180)}
                              y1={18 * Math.sin((ang * Math.PI) / 180)}
                              x2={55 * Math.cos((ang * Math.PI) / 180)}
                              y2={55 * Math.sin((ang * Math.PI) / 180)}
                              stroke="#ef4444"
                              strokeWidth="1.5"
                            />
                          ))}
                          <text x="-50" y="80" fill="#f59e0b" fontSize="12">∮ E · dA = q / ε₀ (Net Flux ≠ 0)</text>
                        </g>
                      </svg>
                    </div>

                    <div className="p-4 bg-gold-950/40 border border-gold-800 rounded-xl text-left text-xs text-gold-200 leading-relaxed">
                      <strong>Fundamental Difference:</strong> Electric field lines originate and terminate on electric charges (electric monopoles exist). Magnetic field lines form continuous, unbroken closed loops because isolated magnetic monopoles do not exist in nature.
                    </div>
                  </div>
                </div>
              )}

              {/* LAB 4: Hysteresis & Material Selection */}
              {currentLabStep === 3 && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-1 space-y-6 bg-slate-950 p-5 rounded-xl border border-slate-800">
                    <h4 className="font-bold text-slate-200 text-sm border-b border-slate-800 pb-2">Material Selector</h4>

                    <div className="space-y-2">
                      {[
                        { id: 'ferro_soft', label: 'Soft Iron (Low Coercivity)' },
                        { id: 'ferro_hard', label: 'Hard Steel (High Coercivity)' },
                        { id: 'para', label: 'Paramagnetic Sample' },
                        { id: 'dia', label: 'Diamagnetic Sample' },
                      ].map((mat) => (
                        <button
                          key={mat.id}
                          onClick={() => setMaterialType(mat.id as typeof materialType)}
                          className={`w-full p-3 rounded-xl text-left text-xs font-bold transition-all border ${
                            materialType === mat.id
                              ? 'bg-gold-500/20 border-gold-500 text-gold-200'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          {mat.label}
                        </button>
                      ))}
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1 text-slate-400">
                        <span>Applied Magnetizing Field (H):</span>
                        <span className="text-gold-400 font-bold">{hFieldApplied} A/m</span>
                      </div>
                      <input
                        type="range"
                        min="-1000"
                        max="1000"
                        step="20"
                        value={hFieldApplied}
                        onChange={(e) => setHFieldApplied(parseInt(e.target.value))}
                        className="w-full accent-gold-500"
                      />
                    </div>
                  </div>

                  {/* Hysteresis Canvas */}
                  <div className="lg:col-span-2 bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-center">
                    <canvas ref={hysteresisCanvasRef} width={500} height={320} className="w-full h-auto bg-slate-950 rounded-lg" />
                  </div>
                </div>
              )}

              {/* LAB 5: Temperature & Superconductivity */}
              {currentLabStep === 4 && (
                <div className="space-y-6 bg-slate-950 p-6 rounded-xl border border-slate-800">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-bold text-gold-400 text-sm">Thermal Demagnetization (Curie Transition)</h4>
                      <div>
                        <div className="flex justify-between text-xs mb-1 text-slate-400">
                          <span>Sample Temperature:</span>
                          <span className={`font-bold ${sampleTemp > curieTempFerro ? 'text-rose-400' : 'text-emerald-400'}`}>
                            {sampleTemp} K ({sampleTemp - 273}°C)
                          </span>
                        </div>
                        <input
                          type="range"
                          min="100"
                          max="1500"
                          step="10"
                          value={sampleTemp}
                          onChange={(e) => setSampleTemp(parseInt(e.target.value))}
                          className="w-full accent-rose-500"
                        />
                      </div>

                      <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-2">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Curie Temp (Iron T_c):</span>
                          <span className="font-mono text-slate-200">1043 K (770°C)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Current Magnetic Phase:</span>
                          <span className="font-bold text-amber-400">
                            {sampleTemp > curieTempFerro ? 'Paramagnetic (Domains Destroyed)' : 'Ferromagnetic (Ordered Domains)'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-bold text-gold-400 text-sm">Meissner Effect (Quantum Levitation)</h4>
                      <button
                        onClick={() => {
                          setIsSuperconducting((prev) => !prev);
                          audioManager.play(isSuperconducting ? 'pop' : 'sparkle');
                        }}
                        className={`w-full py-4 rounded-xl font-bold text-xs transition-all border ${
                          isSuperconducting
                            ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-white shadow-lg shadow-gold-500/30 border-gold-400'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-gold-500/50'
                        }`}
                      >
                        {isSuperconducting ? '❄️ Cryogenic State Active (T < T_c): Perfect Diamagnetism' : '🔥 Warm State (T > T_c): Normal Conductive State'}
                      </button>

                      <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-2">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Susceptibility (χ):</span>
                          <span className="font-mono text-gold-400 font-bold">{isSuperconducting ? '-1.000 (Perfect Repulsion)' : '+0.002'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Internal Magnetic Field (B):</span>
                          <span className="font-mono text-emerald-400 font-bold">{isSuperconducting ? '0.00 Tesla (Expelled)' : `${bFieldExternal} Tesla`}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Observation Questions Section */}
              <div className="mt-8 border-t border-slate-800 pt-6">
                <h4 className="text-md font-bold text-emerald-400 mb-4 flex items-center gap-2">
                  <span>👁️</span> Experimental Observations (MANDATORY VERIFICATION)
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {OBSERVATION_QUESTIONS.map((oq, oIdx) => (
                    <div key={oIdx} className="bg-slate-950 border border-slate-800 p-4 rounded-xl">
                      <p className="text-xs font-semibold text-slate-200 mb-3">{oq.question}</p>
                      <div className="space-y-2">
                        {oq.observableOptions.map((opt, optIdx) => (
                          <button
                            key={optIdx}
                            onClick={() => handleObservationSubmit(oIdx, optIdx)}
                            className={`w-full p-2.5 rounded-lg text-left text-xs transition-all border ${
                              observationAnswers[oIdx] === optIdx
                                ? optIdx === oq.correctIndex
                                  ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
                                  : 'bg-rose-950 border-rose-500 text-rose-200'
                                : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-emerald-500/40'
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

        {/* ----------------------------------------------------------------------------- */}
        {/* TAB 3: PROGRESSIVE CHALLENGES ENGINE */}
        {/* ----------------------------------------------------------------------------- */}
        {activeTab === 'challenges' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Difficulty Badge & Progress Indicator */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  currentChallenge.difficulty === 'foundation'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    : currentChallenge.difficulty === 'standard'
                    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                    : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                }`}>
                  {currentChallenge.difficulty} Tier • Competency: {currentChallenge.competencyLevel}
                </span>
                <h2 className="text-xl font-extrabold text-slate-100 mt-2">
                  Challenge {currentChallengeIndex + 1} of {CHALLENGES.length}
                </h2>
                <p className="text-xs text-slate-400">Node ID: {currentChallenge.nodeId}</p>
              </div>

              {/* Step indicator pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto max-w-full py-2">
                {CHALLENGES.map((ch, idx) => (
                  <button
                    key={ch.id}
                    onClick={() => {
                      setCurrentChallengeIndex(idx);
                      setSelectedOption(null);
                      setNumericAnswer('');
                      setFeedback(null);
                      audioManager.play('tap');
                    }}
                    className={`w-7 h-7 rounded-lg text-xs font-bold transition-all shrink-0 ${
                      idx === currentChallengeIndex
                        ? 'bg-gold-500 text-slate-950 ring-2 ring-gold-400'
                        : idx < currentChallengeIndex
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        : 'bg-slate-950 text-slate-600 border border-slate-800'
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Question Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-semibold text-slate-100 leading-relaxed mb-6">
                {currentChallenge.question}
              </h3>

              {/* Multiple Choice Options */}
              {currentChallenge.type === 'multiple-choice' && currentChallenge.options && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {currentChallenge.options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedOption(idx);
                        audioManager.play('tap');
                      }}
                      className={`p-4 rounded-xl text-left border transition-all duration-200 ${
                        selectedOption === idx
                          ? 'bg-gold-950/80 border-gold-400 text-gold-200 shadow-md shadow-gold-500/10'
                          : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-gold-500/40'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold shrink-0">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="text-sm leading-snug">{option}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Numeric Input */}
              {currentChallenge.type === 'numeric' && (
                <div className="mb-6 space-y-3">
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Enter Numeric Value ({currentChallenge.unit}):
                  </label>
                  <div className="flex gap-3">
                    <input
                      type="number"
                      step="any"
                      value={numericAnswer}
                      onChange={(e) => setNumericAnswer(e.target.value)}
                      placeholder={`e.g. ${currentChallenge.correctAnswer}`}
                      className="bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 font-mono text-lg focus:outline-none focus:border-gold-500 w-full max-w-xs"
                    />
                    <span className="self-center text-sm font-bold text-slate-400">{currentChallenge.unit}</span>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-between border-t border-slate-800 pt-6">
                <button
                  onClick={() => {
                    setShowHint((prev) => !prev);
                    setCurrentHint(currentChallenge.hints[0]);
                    audioManager.play('hint');
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 transition-all"
                >
                  💡 Request Hint
                </button>

                {!feedback ? (
                  <button
                    onClick={handleChallengeSubmit}
                    disabled={currentChallenge.type === 'multiple-choice' ? selectedOption === null : numericAnswer === ''}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 font-bold text-white shadow-lg shadow-gold-500/20 hover:brightness-110 disabled:opacity-50 transition-all"
                  >
                    Submit Physics Answer
                  </button>
                ) : (
                  <button
                    onClick={handleNextChallenge}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 font-bold text-white shadow-lg shadow-emerald-500/20 hover:brightness-110 transition-all flex items-center gap-2"
                  >
                    <span>Next Challenge</span>
                    <span>→</span>
                  </button>
                )}
              </div>

              {/* Feedback Display */}
              {feedback && (
                <div className={`mt-6 p-4 rounded-xl border text-sm leading-relaxed animate-fadeIn ${
                  feedback.isCorrect
                    ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                    : 'bg-rose-950/80 border-rose-500 text-rose-200'
                }`}>
                  <div className="font-bold mb-1">{feedback.isCorrect ? '✓ Explanation' : '✕ Correction'}</div>
                  {feedback.message}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------------------------- */}
        {/* TAB 4: MASTER REFERENCE & REAL-WORLD SUMMARY */}
        {/* ----------------------------------------------------------------------------- */}
        {activeTab === 'summary' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Real World Activity Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h2 className="text-xl font-bold text-gold-400 mb-2 flex items-center gap-2">
                <span>🏭</span> Real-World Engineering Application
              </h2>
              <h3 className="text-md font-semibold text-slate-200 mb-3">{REAL_WORLD_ACTIVITY.title}</h3>
              <p className="text-sm text-slate-300 mb-6">{REAL_WORLD_ACTIVITY.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                  <div key={idx} className="bg-slate-950 border border-slate-800 p-4 rounded-xl flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-gold-500/20 text-gold-400 border border-gold-500/40 flex items-center justify-center text-xs font-bold shrink-0">
                      {idx + 1}
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Misconceptions Correction Grid */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-bold text-rose-400 mb-6 flex items-center gap-2">
                <span>⚠️</span> Core Misconceptions & Clarifications
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MISCONCEPTIONS.map((m) => (
                  <div key={m.id} className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-2">
                    <div className="text-xs font-bold text-rose-400">Misconception: {m.misconception}</div>
                    <div className="text-xs text-slate-300 leading-relaxed">
                      <strong className="text-emerald-400">Correct Physics: </strong>
                      {m.correction}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Comprehensive Physics Definitions & Formulas Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl overflow-x-auto">
              <h3 className="text-lg font-bold text-gold-400 mb-4 flex items-center gap-2">
                <span>📖</span> Physical Quantities & Reference Equations
              </h3>
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="py-3 px-4 font-bold uppercase">Physical Quantity</th>
                    <th className="py-3 px-4 font-bold uppercase">Definition & Meaning</th>
                    <th className="py-3 px-4 font-bold uppercase">Formula / Units</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50 text-slate-300">
                  {PHYSICS_DEFINITIONS.map((def, idx) => (
                    <tr key={idx} className="hover:bg-slate-950/50">
                      <td className="py-3 px-4 font-bold text-gold-300">{def.term}</td>
                      <td className="py-3 px-4 leading-relaxed">{def.def}</td>
                      <td className="py-3 px-4 font-mono text-emerald-400 font-bold">{def.formula}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}