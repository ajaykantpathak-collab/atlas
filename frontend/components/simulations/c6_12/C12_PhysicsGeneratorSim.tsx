'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE ID CONSTANTS (ALL 10 MANDATORY ISC CLASS 12 NODES) ───
const NODE_C12_PHY_071 = 'c12_phy_071'; // AC generator
const NODE_C12_PHY_072 = 'c12_phy_072'; // Displacement current
const NODE_C12_PHY_073 = 'c12_phy_073'; // Electromagnetic waves (properties, speed)
const NODE_C12_PHY_074 = 'c12_phy_074'; // EM wave equation and transverse nature
const NODE_C12_PHY_075 = 'c12_phy_075'; // Electromagnetic spectrum
const NODE_C12_PHY_076 = 'c12_phy_076'; // Reflection by spherical mirrors
const NODE_C12_PHY_077 = 'c12_phy_077'; // Mirror formula and magnification
const NODE_C12_PHY_078 = 'c12_phy_078'; // Refraction at plane surfaces (Snell's law)
const NODE_C12_PHY_079 = 'c12_phy_079'; // Total internal reflection and critical angle
const NODE_C12_PHY_080 = 'c12_phy_080'; // Refraction through a prism

const ALL_NODE_IDS = [
  NODE_C12_PHY_071,
  NODE_C12_PHY_072,
  NODE_C12_PHY_073,
  NODE_C12_PHY_074,
  NODE_C12_PHY_075,
  NODE_C12_PHY_076,
  NODE_C12_PHY_077,
  NODE_C12_PHY_078,
  NODE_C12_PHY_079,
  NODE_C12_PHY_080,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Mission: Photon & Field Masterlab',
  intro: 'You are the Chief Optical & Electrodynamics Engineer at the Vikram Sarabhai Space Centre (ISRO). A deep-space laser relay and turbo-alternator payload are undergoing diagnostic calibration.',
  context: 'To transmit data from deep orbit to the Bengaluru Deep Space Network, you must harness AC generation, Maxwell’s displacement currents, coupled transverse EM waves, precision mirror optics, and prism dispersion without signal attenuation.',
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question: 'In an AC generator, when the rotating armature coil is exactly perpendicular to the magnetic field lines (theta = 0°), what is the instantaneous induced EMF?',
  options: [
    'Maximum EMF (epsilon = NBA*omega) because maximum magnetic flux passes through the coil',
    'Zero EMF because the rate of change of magnetic flux (dPhi/dt) is momentarily zero',
    'Half of the peak EMF (0.5 * epsilon_0)',
    'Infinite EMF due to sudden flux saturation',
  ],
  correctIndex: 1,
  hintAfter: 'Faraday’s law depends on the rate of change of flux (dPhi/dt), NOT the absolute magnitude of flux! Let us explore how rotation turns flux into alternating voltage.',
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

// ─── 22 RICH MULTI-TIER CHALLENGES (NEP 2020 & CISCE 2026 ALIGNED) ───
const CHALLENGES: Challenge[] = [
  // 1. Foundation - AC Generator (Recall)
  {
    id: 'ch_phy_001',
    nodeId: NODE_C12_PHY_071,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which component in an AC generator ensures that the generated current in the external circuit naturally alternates direction every half-cycle?',
    options: [
      'Split-ring commutator',
      'Continuous brass slip rings with stationary carbon brushes',
      'Soft-iron permanent pole splitters',
      'Step-up transformer core',
    ],
    correctIndex: 1,
    explanation: 'Continuous slip rings remain permanently connected to their respective coil ends. As each side alternates moving up and down, the polarity at the brushes reverses every half-turn, delivering true AC.',
    hints: [
      'Think about whether we want to keep current in one direction (DC) or let it reverse (AC).',
      'A split-ring commutator converts AC to DC. Continuous rings preserve the natural reversal.',
      'Slip rings rotate with the coil, allowing the alternating polarity to reach the external load.',
    ],
    misconceptionIndex: 0,
  },
  // 2. Foundation - Displacement Current (Understanding)
  {
    id: 'ch_phy_002',
    nodeId: NODE_C12_PHY_072,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Between the plates of a charging capacitor with no conducting medium, what produces the magnetic field around the gap?',
    options: [
      'Accumulated static charges on the plates alone',
      'A time-varying electric flux (dPhi_E/dt) producing a displacement current I_d = epsilon_0(dPhi_E/dt)',
      'Free electrons jumping through vacuum by thermionic emission',
      'Leakage eddy currents circulating in the dielectric',
    ],
    correctIndex: 1,
    explanation: 'Maxwell postulated that a time-varying electric field acts as an effective displacement current I_d = epsilon_0 (dPhi_E/dt), which creates a magnetic field identically to a conduction current.',
    hints: [
      'Is charge physically moving across the vacuum gap?',
      'No charges cross the gap, but the electric field between the plates is changing with time.',
      'A time-varying electric field generates a magnetic field. This is Maxwell’s displacement current.',
    ],
    misconceptionIndex: 1,
  },
  // 3. Foundation - EM Spectrum (Recall)
  {
    id: 'ch_phy_005',
    nodeId: NODE_C12_PHY_075,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following correctly lists EM radiations in order of INCREASING frequency (and decreasing wavelength)?',
    options: [
      'Radio waves < Microwaves < Infrared < Visible < Ultraviolet < X-rays < Gamma rays',
      'Gamma rays < X-rays < Ultraviolet < Visible < Infrared < Microwaves < Radio waves',
      'Microwaves < Radio waves < Visible < Infrared < Ultraviolet < Gamma rays < X-rays',
      'Infrared < Visible < Ultraviolet < Microwaves < Radio waves < X-rays < Gamma rays',
    ],
    correctIndex: 0,
    explanation: 'Radio waves have the longest wavelength (lowest frequency), progressing through microwave, IR, visible, UV, X-ray, to gamma rays (highest frequency, shortest wavelength).',
    hints: [
      'Remember: Radio waves have meters-long wavelengths, while Gamma rays are smaller than atomic nuclei.',
      'Higher frequency means higher photon energy (E = hf).',
      'Order: Radio -> Microwave -> IR -> Visible -> UV -> X-ray -> Gamma.',
    ],
    misconceptionIndex: 2,
  },
  // 4. Foundation - Spherical Mirrors (Understanding)
  {
    id: 'ch_phy_006',
    nodeId: NODE_C12_PHY_076,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Under the New Cartesian sign convention, what are the signs of focal length f for a concave mirror and a convex mirror respectively?',
    options: [
      'Concave: negative (-), Convex: positive (+)',
      'Concave: positive (+), Convex: negative (-)',
      'Both are always positive (+)',
      'Both are always negative (-)',
    ],
    correctIndex: 0,
    explanation: 'For a concave mirror, the focus lies in front (measured against the incident ray vector from the pole), making f negative. For a convex mirror, the focus lies behind the pole, making f positive.',
    hints: [
      'Measure all distances from the pole along the principal axis.',
      'Distances against incident light are negative; distances along incident light are positive.',
      'Concave focus is in front (negative); convex focus is behind (positive).',
    ],
    misconceptionIndex: 3,
  },
  // 5. Foundation - Snell’s Law (Recall)
  {
    id: 'ch_phy_008',
    nodeId: NODE_C12_PHY_078,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'When a beam of light travels from an optically denser medium (higher n) into a rarer medium (lower n), what happens to the refracted ray?',
    options: [
      'It bends towards the normal and increases in speed',
      'It bends away from the normal and increases in speed',
      'It bends towards the normal and decreases in speed',
      'It proceeds completely undeviated with unchanged frequency and speed',
    ],
    correctIndex: 1,
    explanation: 'Entering a rarer medium (lower refractive index) causes light to speed up (v = c/n) and bend away from the normal (r > i) according to Snell’s law: n1 sin i = n2 sin r.',
    hints: [
      'Refractive index n = c/v. Lower n means higher speed v.',
      'Snell’s law: n1 sin(i) = n2 sin(r). If n2 < n1, then sin(r) > sin(i).',
      'The ray bends away from the normal as it speeds up in the rarer medium.',
    ],
    misconceptionIndex: 4,
  },
  // 6. Foundation - Drag-label AC Generator Components
  {
    id: 'ch_phy_007',
    nodeId: NODE_C12_PHY_071,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag the correct functional labels to the core structural elements of this alternator schematic.',
    dragItems: [
      { label: 'Armature Coil', targetId: 'target_coil' },
      { label: 'Field Magnets', targetId: 'target_magnet' },
      { label: 'Slip Rings', targetId: 'target_rings' },
      { label: 'Carbon Brushes', targetId: 'target_brushes' },
    ],
    correctMapping: {
      target_coil: 'Armature Coil',
      target_magnet: 'Field Magnets',
      target_rings: 'Slip Rings',
      target_brushes: 'Carbon Brushes',
    },
    explanation: 'The armature coil rotates across magnetic flux lines produced by field magnets. Continuous slip rings rotate with the coil while carbon brushes maintain sliding electrical contact with the load.',
    hints: [
      'The central rotating wire loop is the armature.',
      'The concave magnetic poles on the flanks create the magnetic field B.',
      'The concentric brass cylinders on the shaft are slip rings; the blocks pressing on them are brushes.',
    ],
  },
  // 7. Foundation - Drag-sort EM Spectrum
  {
    id: 'ch_phy_004',
    nodeId: NODE_C12_PHY_075,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Arrange these four regions of the EM spectrum in order of DECREASING wavelength (Longest wavelength at top to shortest at bottom).',
    sortItems: ['Radio Waves (λ > 1 m)', 'Infrared Radiation (λ ~ 10⁻⁵ m)', 'Visible Light (λ ~ 500 nm)', 'X-Rays (λ ~ 10⁻¹⁰ m)'],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Radio waves have the greatest wavelength, followed by infrared, visible light, and X-rays with sub-nanometer wavelengths.',
    hints: [
      'Radio waves can span kilometers.',
      'Visible light is in the hundreds of nanometers (400-700 nm).',
      'X-rays have extremely short wavelengths and penetrate soft tissue.',
    ],
  },

  // 8. Standard - AC Generator Peak EMF Calculation (Numeric Application)
  {
    id: 'ch_phy_009',
    nodeId: NODE_C12_PHY_071,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'An ISRO satellite alternator armature has N = 500 turns, coil area A = 0.04 m², and rotates at 50 rev/s (f = 50 Hz) in a uniform field B = 0.25 T. Calculate the peak induced EMF (epsilon_0) in Volts. (Use pi = 3.1416)',
    correctAnswer: 1570.8,
    tolerance: 15,
    unit: 'V',
    explanation: 'Peak EMF epsilon_0 = N * B * A * omega = N * B * A * (2 * pi * f) = 500 * 0.25 * 0.04 * (2 * 3.1416 * 50) = 5 * 314.16 = 1570.8 V.',
    hints: [
      'Use the formula: epsilon_0 = N * B * A * omega.',
      'Angular velocity omega = 2 * pi * f = 2 * pi * 50 = 100 * pi rad/s.',
      'Calculate: 500 * 0.25 * 0.04 * 314.16 = 1570.8 V.',
    ],
  },
  // 9. Standard - Displacement Current in Capacitor (Application)
  {
    id: 'ch_phy_010',
    nodeId: NODE_C12_PHY_072,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A parallel plate capacitor with circular plates of area A = 0.05 m² is charging such that the electric field between plates increases at dE/dt = 4.0 x 10¹¹ V/(m·s). Given epsilon_0 = 8.854 x 10⁻¹² C²/(N·m²), calculate the displacement current I_d in milliamperes (mA).',
    correctAnswer: 177.08,
    tolerance: 2,
    unit: 'mA',
    explanation: 'Electric flux Phi_E = E * A, so dPhi_E/dt = A * (dE/dt). Displacement current I_d = epsilon_0 * A * (dE/dt) = 8.854 x 10⁻¹² * 0.05 * 4.0 x 10¹¹ = 0.17708 A = 177.08 mA.',
    hints: [
      'Displacement current formula: I_d = epsilon_0 * (dPhi_E / dt).',
      'For a flat plate, Phi_E = E * A, so dPhi_E/dt = A * (dE/dt).',
      'Multiply (8.854 x 10^-12) * 0.05 * (4.0 x 10^11) and convert Amperes to milliamperes (x 1000).',
    ],
  },
  // 10. Standard - EM Wave Amplitude Ratio (Application)
  {
    id: 'ch_phy_011',
    nodeId: NODE_C12_PHY_074,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A plane electromagnetic wave travelling in vacuum has a peak electric field amplitude E_0 = 450 V/m. Calculate the peak magnetic field amplitude B_0 in microteslas (μT). (Take c = 3.0 x 10⁸ m/s)',
    correctAnswer: 1.5,
    tolerance: 0.05,
    unit: 'μT',
    explanation: 'The ratio of amplitudes in vacuum is E_0 / B_0 = c. Thus B_0 = E_0 / c = 450 / (3.0 x 10⁸) = 1.5 x 10⁻⁶ T = 1.5 μT.',
    hints: [
      'Recall Maxwell’s relation linking field amplitudes: E_0 = c * B_0.',
      'Rearrange: B_0 = E_0 / c.',
      'Calculate 450 / (3.0 x 10^8) = 1.5 x 10^-6 T, which is 1.5 μT.',
    ],
  },
  // 11. Standard - Mirror Formula Calculation (Application)
  {
    id: 'ch_phy_012',
    nodeId: NODE_C12_PHY_077,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A real object is placed 30 cm in front of a concave mirror of focal length 20 cm (u = -30 cm, f = -20 cm). What is the image distance v in cm (include the negative sign if real)?',
    correctAnswer: -60,
    tolerance: 0.5,
    unit: 'cm',
    explanation: '1/v + 1/u = 1/f => 1/v = 1/f - 1/u = 1/(-20) - 1/(-30) = -1/20 + 1/30 = -1/60 => v = -60 cm. The negative sign confirms a real, inverted image in front of the mirror.',
    hints: [
      'Use the mirror formula: 1/v + 1/u = 1/f.',
      'Substitute with signs: 1/v = -1/20 - (-1/30) = -1/20 + 1/30.',
      'Find common denominator (60): -3/60 + 2/60 = -1/60 => v = -60 cm.',
    ],
  },
  // 12. Standard - Critical Angle Calculation (Application)
  {
    id: 'ch_phy_013',
    nodeId: NODE_C12_PHY_079,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'An optical fibre core has refractive index n_core = 1.50 and cladding n_clad = 1.20. Calculate the critical angle theta_c at the core-cladding boundary in degrees.',
    correctAnswer: 53.13,
    tolerance: 0.5,
    unit: '°',
    explanation: 'sin(theta_c) = n_clad / n_core = 1.20 / 1.50 = 0.80. Therefore, theta_c = arcsin(0.80) = 53.13°.',
    hints: [
      'Snell’s law at critical grazing incidence: n_core * sin(theta_c) = n_clad * sin(90°).',
      'sin(theta_c) = n_clad / n_core = 1.2 / 1.5 = 0.8.',
      'Take arcsin(0.80) to get 53.13°.',
    ],
  },
  // 13. Standard - Thin Prism Deviation (Application)
  {
    id: 'ch_phy_014',
    nodeId: NODE_C12_PHY_080,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A thin crown-glass spectrometer prism has a refracting angle A = 6.0° and refractive index n = 1.52. Calculate the angular deviation delta in degrees.',
    correctAnswer: 3.12,
    tolerance: 0.1,
    unit: '°',
    explanation: 'For a thin prism (small prism angle A), deviation delta = (n - 1) * A = (1.52 - 1) * 6.0° = 0.52 * 6.0° = 3.12°.',
    hints: [
      'Use the thin prism approximation: delta = (n - 1) * A.',
      'Here n = 1.52 and A = 6.0°.',
      'delta = (1.52 - 1) * 6.0 = 0.52 * 6 = 3.12°.',
    ],
  },
  // 14. Standard - Real and Apparent Depth (Analysis)
  {
    id: 'ch_phy_015',
    nodeId: NODE_C12_PHY_078,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'An inspection laser looks down into a liquid fuel tank of depth 4.8 meters filled with kerosene (n = 1.44). What is the apparent depth of the tank bottom when viewed vertically from air?',
    options: [
      '3.33 meters (apparent depth = real depth / n)',
      '6.91 meters (apparent depth = real depth * n)',
      '4.80 meters (no apparent shift occurs at vertical incidence)',
      '2.40 meters (half the real depth always)',
    ],
    correctIndex: 0,
    explanation: 'For near-normal viewing from rarer medium (air), apparent depth d_app = d_real / n = 4.8 / 1.44 = 3.33 m. The tank appears shallower by an apparent shift of 1.47 m.',
    hints: [
      'Light emerging from liquid bends away from the normal into air.',
      'The virtual image appears shifted upwards toward the surface.',
      'Formula: d_app = d_real / n = 4.8 / 1.44 = 3.33 m.',
    ],
    misconceptionIndex: 4,
  },

  // 15. Advanced - Ampere-Maxwell Equation Construction (Construct)
  {
    id: 'ch_phy_016',
    nodeId: NODE_C12_PHY_072,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Assemble the integral form of the Ampere-Maxwell Circuital Law by selecting terms in exact mathematical order.',
    availableParts: ['∮ B·dl', '=', 'μ₀', '(', 'I_c', '+', 'ε₀(dΦ_E/dt)', ')'],
    targetState: '∮ B·dl = μ₀ ( I_c + ε₀(dΦ_E/dt) )',
    validationHint: 'The line integral of B equals mu_0 times the sum of conduction current and displacement current.',
    explanation: 'Maxwell unified magnetism and electrodynamics by showing that the line integral of magnetic field ∮ B·dl equals μ₀ (I_c + ε₀ dΦ_E/dt), restoring charge conservation.',
    hints: [
      'Start with the closed loop line integral of magnetic field: ∮ B·dl.',
      'Next comes the equals sign and permeability constant μ₀.',
      'Inside parentheses, combine conduction current I_c and displacement current ε₀(dΦ_E/dt).',
    ],
  },
  // 16. Advanced - Minimum Deviation Prism Formula (Analysis)
  {
    id: 'ch_phy_017',
    nodeId: NODE_C12_PHY_080,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'At the exact position of minimum deviation (delta_min) in an equilateral glass prism (A = 60°), which geometric and optical conditions are rigorously true?',
    options: [
      'i_1 = i_2, r_1 = r_2 = A/2 = 30°, and the refracted ray inside is strictly parallel to the prism base',
      'i_1 = 90°, r_1 = 0°, and the ray travels perpendicular to the base',
      'The total deviation is zero and the emergent ray is parallel to the incident ray',
      'r_1 + r_2 = 2A and the ray undergoes total internal reflection at both faces',
    ],
    correctIndex: 0,
    explanation: 'By ray reversibility and symmetry, minimum deviation occurs when i_1 = i_2 and r_1 = r_2 = A/2 = 30°. For an equilateral prism, this makes the internal refracted ray strictly parallel to the base.',
    hints: [
      'Consider the symmetry of the path when reversing the ray.',
      'Symmetry requires r_1 = r_2 = A/2.',
      'For A = 60°, r = 30°, meaning the internal ray runs parallel to the base.',
    ],
    misconceptionIndex: 5,
  },
  // 17. Advanced - Evaluation of Speed in Spectrum (Evaluation)
  {
    id: 'ch_phy_018',
    nodeId: NODE_C12_PHY_073,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A student claims: "Gamma rays travel faster than radio waves in interplanetary vacuum because gamma photons possess gigaelectronvolt energies." Evaluate this claim.',
    options: [
      'Incorrect: All EM waves in vacuum propagate at identical speed c = 1/√(μ₀ε₀) ≈ 3.0×10⁸ m/s regardless of photon energy or frequency',
      'Correct: Higher energy particles always attain relativistic speeds closer to c than low frequency waves',
      'Correct: Vacuum permeability μ₀ is frequency dependent according to Planck’s law',
      'Partially correct: Gamma rays travel faster only when emitted by nuclear fission reactions',
    ],
    correctIndex: 0,
    explanation: 'The speed of any EM wave in vacuum is an invariant fundamental constant fixed purely by space constants c = 1/√(μ₀ε₀). Gamma rays have higher frequency and photon energy (E = hf), but identically equal velocity c.',
    hints: [
      'Does vacuum have dispersion (different speeds for different wavelengths)?',
      'In vacuum, c = 1/√(μ₀ε₀) is constant for the entire electromagnetic spectrum.',
      'Photon energy affects penetrative power, but wave speed in vacuum is universally c.',
    ],
    misconceptionIndex: 2,
  },
  // 18. Advanced - Mirror Magnification & Image Nature (Analysis)
  {
    id: 'ch_phy_019',
    nodeId: NODE_C12_PHY_077,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A concave mirror produces an image with linear magnification m = -2.5. What does this signed value definitively convey about the image?',
    options: [
      'The image is REAL, INVERTED, and ENLARGED (2.5x object size), formed in front of the mirror',
      'The image is VIRTUAL, ERECT, and DIMINISHED, formed behind the mirror',
      'The image is VIRTUAL, ERECT, and ENLARGED (2.5x object size)',
      'The object is situated between the focal point and the pole',
    ],
    correctIndex: 0,
    explanation: 'In the New Cartesian convention, m = -v/u. A negative magnification (m < 0) strictly denotes a REAL and INVERTED image. Since |m| = 2.5 > 1, the image is enlarged.',
    hints: [
      'Recall: m = h\'/h = -v/u.',
      'Minus sign on magnification implies the image is upside down (inverted), hence real.',
      '|m| > 1 means magnified (enlarged).',
    ],
    misconceptionIndex: 3,
  },
  // 19. Advanced - EM Wave Differential Equation Matching (Analysis)
  {
    id: 'ch_phy_020',
    nodeId: NODE_C12_PHY_074,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Given the 1D Maxwell wave equation ∂²E_y/∂x² = μ₀ε₀ (∂²E_y/∂t²), what is the exact physical origin of the wave speed constant c?',
    options: [
      'Comparing with standard wave equation ∂²y/∂x² = (1/v²) ∂²y/∂t² yields v = c = 1/√(μ₀ε₀)',
      'Direct integration of Lorentz magnetic force yielding v = √(μ₀ε₀)',
      'Dimensional constant from Coulomb’s electrostatic constant alone',
      'Ratio of permittivity in dielectric to vacuum permeability',
    ],
    correctIndex: 0,
    explanation: 'Comparing the wave equation ∂²E/∂x² = μ₀ε₀ ∂²E/∂t² with the classical 1D wave equation ∂²ψ/∂x² = (1/v²) ∂²ψ/∂t² gives 1/c² = μ₀ε₀, proving c = 1/√(μ₀ε₀).',
    hints: [
      'Look at the coefficient of the second time derivative.',
      'In standard wave mechanics, the coefficient is 1/v².',
      'Equating 1/v² = μ₀ε₀ gives v = c = 1/√(μ₀ε₀).',
    ],
  },
  // 20. Advanced - Equilateral Prism Refractive Index (Numeric Application)
  {
    id: 'ch_phy_021',
    nodeId: NODE_C12_PHY_080,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'An equilateral glass prism (A = 60°) produces a minimum deviation delta_min = 38.0°. Calculate the refractive index n of the prism glass. (Use sin(49°) = 0.7547, sin(30°) = 0.5000)',
    correctAnswer: 1.51,
    tolerance: 0.02,
    unit: '',
    explanation: 'Prism formula: n = sin((A + delta_min)/2) / sin(A/2) = sin((60° + 38°)/2) / sin(60°/2) = sin(49°) / sin(30°) = 0.7547 / 0.5000 = 1.5094 ≈ 1.51.',
    hints: [
      'Prism formula: n = sin((A + delta_min)/2) / sin(A/2).',
      'A = 60°, delta_min = 38° => (A + delta_min)/2 = 98° / 2 = 49°.',
      'Calculate: sin(49°) / sin(30°) = 0.7547 / 0.5 = 1.5094.',
    ],
  },
  // 21. Advanced - Total Reflecting Prism Periscope (Creativity/Design)
  {
    id: 'ch_phy_022',
    nodeId: NODE_C12_PHY_079,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why are 45°-90°-45° total reflecting glass prisms (n = 1.5, theta_c = 41.8°) preferred over silvered plane mirrors in naval submarine periscopes and high-precision binoculars?',
    options: [
      'TIR provides 100% reflectance without metallic absorption, eliminates ghost images from front glass reflection, and does not degrade/tarnish with time',
      'Prisms amplify light intensity through stimulated photon emission',
      'Silvered mirrors bend light at greater angles than 90° due to polarization',
      'Prisms eliminate the Doppler frequency shift in sea water',
    ],
    correctIndex: 0,
    explanation: 'Total internal reflection is 100% efficient (no metallic absorption losses of 4-10%), eliminates multiple ghost reflections from double-surface mirrors, and cannot tarnish or peel.',
    hints: [
      'What happens to silver coatings exposed to moisture and air over time?',
      'Does regular metallic mirror reflection reflect 100% of incident photons?',
      'TIR at clean glass-air interfaces yields total, loss-free reflection without ghosting.',
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

// ─── DEFAULT ENRICHMENT DATA ───
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C12_PHY_071,
  title: 'AC Generators, EM Waves & Ray Optics Masterlab',
  definition:
    'A comprehensive laboratory unifying electromagnetic induction (AC generators), Maxwell displacement currents, transverse EM waves, spherical mirror reflection, Snellian refraction, total internal reflection, and prism deviation.',
  eli5:
    'Spinning magnets push oscillating electricity through coils, changing electric fields create moving magnetic waves through space, and curved or tilted glass surfaces bend, bounce, and steer these light rays with mathematical perfection.',
  misconceptions: [
    {
      misconception: 'A commutator is used in an AC generator to generate alternating current.',
      correction: 'An AC generator uses continuous slip rings. A split-ring commutator converts AC to DC.',
    },
    {
      misconception: 'Displacement current is a flow of real physical electrons between capacitor plates.',
      correction: 'No charge crosses the gap in vacuum. Displacement current is a time-varying electric flux I_d = ε₀(dΦ_E/dt).',
    },
    {
      misconception: 'Gamma rays travel faster than radio waves in vacuum because they have higher energy.',
      correction: 'All electromagnetic waves in vacuum propagate at identical invariant speed c = 1/√(μ₀ε₀) ≈ 3×10⁸ m/s.',
    },
    {
      misconception: 'Concave mirrors always form real images and convex mirrors always form virtual images.',
      correction: 'A concave mirror forms a virtual, erect, magnified image when the object is between pole and focus (u < f).',
    },
    {
      misconception: 'Apparent depth is greater than real depth because water magnifies objects.',
      correction: 'Light bends away from normal entering air, making submerged objects appear shallower: d_app = d_real / n.',
    },
    {
      misconception: 'At minimum deviation in a prism, the ray inside travels perpendicular to the base.',
      correction: 'At minimum deviation in an equilateral/isosceles prism, the internal ray travels PARALLEL to the base (r₁ = r₂ = A/2).',
    },
  ],
  diagnosticQuestions: [
    { question: 'What is the peak EMF of an AC generator?', options: ['NBAω', 'NBA', 'NBA/ω', 'N/BAω'], correctIndex: 0 },
    { question: 'What is displacement current formula?', options: ['ε₀(dΦ_E/dt)', 'μ₀(dΦ_B/dt)', 'q/t', 'C(dV/dt)'], correctIndex: 0 },
    { question: 'What is the speed of EM waves in vacuum?', options: ['1/√(μ₀ε₀)', '√(μ₀/ε₀)', 'μ₀ε₀', '1/(μ₀ε₀)'], correctIndex: 0 },
    { question: 'What is the relation between E₀ and B₀ in an EM wave?', options: ['E₀/B₀ = c', 'E₀B₀ = c', 'B₀/E₀ = c', 'E₀ + B₀ = c'], correctIndex: 0 },
    { question: 'What is the focal length of a concave mirror of radius R?', options: ['-R/2', '+R/2', '-2R', '+2R'], correctIndex: 0 },
    { question: 'What is Snell’s law?', options: ['n₁ sin(i) = n₂ sin(r)', 'n₁/sin(i) = n₂/sin(r)', 'sin(i)sin(r) = n₁n₂', 'n₁ cos(i) = n₂ cos(r)'], correctIndex: 0 },
    { question: 'What is the critical angle formula for dense-to-air?', options: ['sin(θ_c) = 1/n', 'cos(θ_c) = 1/n', 'tan(θ_c) = n', 'sin(θ_c) = n'], correctIndex: 0 },
    { question: 'What is the thin prism deviation formula?', options: ['(n - 1)A', '(n + 1)A', 'A/(n - 1)', 'n*A'], correctIndex: 0 },
  ],
  masteryCriteria: 'Student demonstrates rigorous conceptual and numerical mastery across AC generation, EM waves, mirrors, refraction, TIR, and prism optics.',
};

// ─── BRILLIANT.ORG INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Interactive AC Generator (Faraday Induction)',
    instruction: 'Adjust the coil rotation frequency and magnetic field sliders. Observe how the instantaneous EMF waveform tracks the rotating armature.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_PHY_071,
  },
  {
    title: 'Displacement Current in a Charging Capacitor',
    instruction: 'Toggle capacitor charging rate. Watch the changing electric flux in the gap generate an Amperian magnetic field identical to the wire current.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_PHY_072,
  },
  {
    title: 'Coupled Transverse EM Wave Dynamics',
    instruction: 'Rotate and animate the 3D coupled wave. Notice how electric field E_y and magnetic field B_z oscillate strictly in phase and perpendicular to propagation c.',
    interactionType: 'click-stakeholder',
    nodeId: NODE_C12_PHY_074,
  },
  {
    title: 'Snellian Refraction & Total Internal Reflection',
    instruction: 'Change the incident angle from glass to air. Drag past the critical angle (41.8°) to trigger 100% Total Internal Reflection.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_PHY_079,
  },
  {
    title: 'Prism Refraction & Minimum Deviation',
    instruction: 'Sweep the angle of incidence through the prism. Watch the deviation curve hit its unique parabolic minimum (delta_min) when the ray runs parallel to the base.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_PHY_080,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you double the rotation frequency of an AC generator armature from 50 Hz to 100 Hz, what happens to the peak induced EMF?',
    options: ['It remains unchanged', 'It doubles (2x)', 'It quadruples (4x)', 'It is halved (0.5x)'],
    correctIndex: 1,
    verifyInstruction: 'Drag the Generator Frequency slider to 100 Hz and check the live Peak EMF gauge below!',
    nodeId: NODE_C12_PHY_071,
  },
  {
    question: 'Predict: When light inside glass (n = 1.50) strikes an air interface at an angle of 50° (which exceeds θ_c ≈ 41.8°), what percentage of light refracts out into air?',
    options: ['0% (100% reflects internally via TIR)', '50% reflects, 50% refracts', '100% refracts with 90° deviation', '25% refracts as polarized UV'],
    correctIndex: 0,
    verifyInstruction: 'Set the Incident Angle slider to 50° in the Optics Lab and observe the ray path!',
    nodeId: NODE_C12_PHY_079,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice about the EMF when the coil plane is parallel to the magnetic field lines (theta = 90°)?',
    observableOptions: [
      'EMF reaches its maximum peak value (flux is zero, but dPhi/dt is maximum)',
      'EMF drops to zero because magnetic flux is zero',
      'EMF becomes negative infinity',
      'The coil stops rotating due to Lenz locking',
    ],
    correctIndex: 0,
    nodeId: NODE_C12_PHY_071,
  },
  {
    question: 'In the prism deviation simulation, what happens to the internal ray when the angle of incidence produces minimum deviation?',
    observableOptions: [
      'The internal refracted ray runs perfectly parallel to the prism base',
      'The ray strikes the base at right angles',
      'The ray undergoes 5 consecutive total internal reflections',
      'The ray splits into two counter-propagating beams',
    ],
    correctIndex: 0,
    nodeId: NODE_C12_PHY_080,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'ISRO Deep-Space Optical Comm Architect',
  description:
    'Configure a deep-space payload: (1) Select the optimal total reflecting prism geometry for a retro-reflector, (2) Specify the core/cladding index contrast for an umbilical fiber line, and (3) Calculate the peak alternator voltage needed to power the ion thruster.',
  steps: [
    'Choose high-purity fused silica (n = 1.46) for zero-dispersion telemetry transmission',
    'Verify that core-cladding critical angle allows a numerical aperture > 0.35',
    'Calculate the armature turns N to generate 220V RMS at 400 Hz aboard the satellite alternator',
    'Submit your engineering log to the Vikram Sarabhai Space Centre mission database',
  ],
};

type InteractiveTab = 'generator' | 'capacitor' | 'emwave' | 'snell' | 'prism' | 'mirror';

// ═════════════════════════════════════════════════════════════════
// MAIN SIMULATION COMPONENT
// ═════════════════════════════════════════════════════════════════
function C12_PhysicsGeneratorSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C12_PHY_071,
  title = DEFAULT_PROPS.title || 'Physics Generator & Optics Masterlab',
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete,
}: Props = DEFAULT_PROPS) {
  // ─── SUBJECT CONFIG ───
  const subjectConfig = SUBJECT_CONFIG['physics'] || { name: 'Physics', emoji: '⚡', color: 'cyan' };

  // ─── CORE PHASE FLOW ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // ─── BRILLIANT.ORG INTERACTION STATES ───
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState<InteractiveTab>('generator');

  // ─── PHYSICAL SIMULATION VARIABLES (5+ SLIDERS) ───
  const [genFreq, setGenFreq] = useState<number>(50); // Hz
  const [genBField, setGenBField] = useState<number>(0.5); // Tesla
  const [genTurns, setGenTurns] = useState<number>(200); // Turns
  const [genArea, setGenArea] = useState<number>(0.02); // m^2
  const [genAngle, setGenAngle] = useState<number>(0); // degrees (for snapshot)

  const [capDEDt, setCapDEDt] = useState<number>(5.0); // x 10^11 V/(m*s)
  const [capArea, setCapArea] = useState<number>(0.04); // m^2

  const [waveFreq, setWaveFreq] = useState<number>(6.0); // x 10^14 Hz (green light)
  const [waveAmpE, setWaveAmpE] = useState<number>(120); // V/m

  const [opticsAngleI, setOpticsAngleI] = useState<number>(30); // degrees
  const [opticsN1, setOpticsN1] = useState<number>(1.50); // Glass
  const [opticsN2, setOpticsN2] = useState<number>(1.00); // Air

  const [prismApexA, setPrismApexA] = useState<number>(60); // degrees
  const [prismAngleI, setPrismAngleI] = useState<number>(48.6); // degrees
  const [prismN, setPrismN] = useState<number>(1.50);

  const [mirrorU, setMirrorU] = useState<number>(-30); // cm
  const [mirrorF, setMirrorF] = useState<number>(-15); // cm (concave default)
  const [mirrorType, setMirrorType] = useState<'concave' | 'convex'>('concave');

  // ─── MASTERY & SRS STATE ───
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // ─── ESCALATING HINTS & FEEDBACK ───
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // ─── CHALLENGE INTERACTION BUFFERS ───
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // ─── REFS ───
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasGenRef = useRef<HTMLCanvasElement | null>(null);
  const canvasWaveRef = useRef<HTMLCanvasElement | null>(null);

  // ─── DERIVED PHYSICAL VALUES ───
  const peakEMF = useMemo(() => {
    const omega = 2 * Math.PI * genFreq;
    return genTurns * genBField * genArea * omega;
  }, [genTurns, genBField, genArea, genFreq]);

  const displacementCurrent = useMemo(() => {
    const eps0 = 8.854e-12;
    return eps0 * capArea * (capDEDt * 1e11) * 1000; // in mA
  }, [capArea, capDEDt]);

  const waveBField = useMemo(() => {
    return (waveAmpE / 3.0e8) * 1e6; // in microTesla
  }, [waveAmpE]);

  const criticalAngle = useMemo(() => {
    if (opticsN1 <= opticsN2) return 90;
    return (Math.asin(opticsN2 / opticsN1) * 180) / Math.PI;
  }, [opticsN1, opticsN2]);

  const isTIR = useMemo(() => {
    return opticsN1 > opticsN2 && opticsAngleI > criticalAngle;
  }, [opticsN1, opticsN2, opticsAngleI, criticalAngle]);

  const refractionAngleR = useMemo(() => {
    if (isTIR) return 0;
    const sinR = (opticsN1 * Math.sin((opticsAngleI * Math.PI) / 180)) / opticsN2;
    if (sinR > 1) return 90;
    return (Math.asin(sinR) * 180) / Math.PI;
  }, [opticsN1, opticsN2, opticsAngleI, isTIR]);

  const prismCalc = useMemo(() => {
    const iRad = (prismAngleI * Math.PI) / 180;
    const sinR1 = Math.sin(iRad) / prismN;
    if (sinR1 > 1) return { r1: 0, r2: 0, e: 0, delta: 0, isTIR: true };
    const r1Rad = Math.asin(sinR1);
    const r1 = (r1Rad * 180) / Math.PI;
    const r2 = prismApexA - r1;
    const r2Rad = (r2 * Math.PI) / 180;
    const sinE = prismN * Math.sin(r2Rad);
    if (sinE > 1) {
      return { r1, r2, e: 90, delta: 90, isTIR: true };
    }
    const eRad = Math.asin(sinE);
    const e = (eRad * 180) / Math.PI;
    const delta = prismAngleI + e - prismApexA;
    return { r1, r2, e, delta, isTIR: false };
  }, [prismAngleI, prismApexA, prismN]);

  const mirrorCalc = useMemo(() => {
    const fVal = mirrorType === 'concave' ? -Math.abs(mirrorF) : Math.abs(mirrorF);
    const uVal = -Math.abs(mirrorU);
    const invV = 1 / fVal - 1 / uVal;
    if (Math.abs(invV) < 0.0001) {
      return { v: -Infinity, m: -Infinity, nature: 'At Infinity', fVal, uVal };
    }
    const v = 1 / invV;
    const m = -v / uVal;
    const isReal = v < 0;
    const nature = isReal
      ? `Real, Inverted, ${Math.abs(m) > 1.05 ? 'Enlarged' : Math.abs(m) < 0.95 ? 'Diminished' : 'Same Size'}`
      : `Virtual, Erect, ${Math.abs(m) > 1.05 ? 'Enlarged' : Math.abs(m) < 0.95 ? 'Diminished' : 'Same Size'}`;
    return { v, m, nature, fVal, uVal };
  }, [mirrorType, mirrorF, mirrorU]);

  // ─── FILTERED CHALLENGES BASED ON BKT DIFFICULTY ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter((c) => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── MOUNT EFFECT: LOAD EXISTING MASTERY ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── ADAPTIVE MASTERY EFFECT (AFTER ANSWERS) ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDiff = mastery === 'not-started' || mastery === 'beginner' ? 'foundation' : mastery === 'developing' ? 'standard' : 'advanced';
    setDifficulty((prev) => {
      if (prev !== newDiff) {
        setCurrentChallenge(0);
        return newDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── ANIMATION EFFECT 1: GENERATOR ROTATING ARMATURE CANVAS ───
  useEffect(() => {
    const canvas = canvasGenRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let angle = 0;
    let animId: number;

    const render = () => {
      angle += (genFreq / 60) * 0.08;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Draw Field Magnets (N left, S right)
      ctx.fillStyle = '#dc2626';
      ctx.fillRect(10, cy - 60, 45, 120);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 16px sans-serif';
      ctx.fillText('N', 25, cy + 6);

      ctx.fillStyle = '#2563eb';
      ctx.fillRect(canvas.width - 55, cy - 60, 45, 120);
      ctx.fillStyle = '#ffffff';
      ctx.fillText('S', canvas.width - 40, cy + 6);

      // Magnetic Field Lines
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
      ctx.setLineDash([4, 4]);
      for (let yOffset = -40; yOffset <= 40; yOffset += 20) {
        ctx.beginPath();
        ctx.moveTo(55, cy + yOffset);
        ctx.lineTo(canvas.width - 55, cy + yOffset);
        ctx.stroke();
      }
      ctx.setLineDash([]);

      // Rotating Coil
      const coilLength = 70;
      const x1 = cx - Math.cos(angle) * (coilLength / 2);
      const y1 = cy - Math.sin(angle) * (coilLength / 2);
      const x2 = cx + Math.cos(angle) * (coilLength / 2);
      const y2 = cy + Math.sin(angle) * (coilLength / 2);

      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();

      // Coil Normal Vector
      const nx = cx - Math.sin(angle) * 35;
      const ny = cy + Math.cos(angle) * 35;
      ctx.strokeStyle = '#22c55e';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(nx, ny);
      ctx.stroke();

      // Instantaneous EMF text & indicator
      const instEMF = peakEMF * Math.sin(angle);
      ctx.fillStyle = instEMF >= 0 ? '#4ade80' : '#f87171';
      ctx.font = '13px monospace';
      ctx.fillText(`ε(t) = ${instEMF.toFixed(1)} V`, cx - 50, canvas.height - 15);

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [genFreq, peakEMF]);

  // ─── ANIMATION EFFECT 2: 3D COUPLED EM WAVE CANVAS ───
  useEffect(() => {
    const canvas = canvasWaveRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let waveOffset = 0;
    let animId: number;

    const renderWave = () => {
      waveOffset += 0.05;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const midY = canvas.height / 2;
      const startX = 40;
      const endX = canvas.width - 20;

      // Axis
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(startX, midY);
      ctx.lineTo(endX, midY);
      ctx.stroke();

      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px sans-serif';
      ctx.fillText('Propagation direction (+x) → c', endX - 180, midY - 10);

      const k = 0.035;
      const ampE = Math.min(50, waveAmpE * 0.35);
      const ampB = ampE * 0.55;

      // Draw E-field (vertical, y-plane, cyan)
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      for (let x = startX; x <= endX; x += 3) {
        const y = midY - ampE * Math.sin(k * (x - startX) - waveOffset);
        if (x === startX) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Draw B-field (slanted isometric z-plane, magenta)
      ctx.strokeStyle = '#ec4899';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let x = startX; x <= endX; x += 3) {
        const val = ampB * Math.sin(k * (x - startX) - waveOffset);
        const isoX = x + val * 0.5;
        const isoY = midY + val * 0.5;
        if (x === startX) ctx.moveTo(isoX, isoY);
        else ctx.lineTo(isoX, isoY);
      }
      ctx.stroke();

      // Draw vectors at periodic nodes
      for (let x = startX; x <= endX; x += 40) {
        const sinVal = Math.sin(k * (x - startX) - waveOffset);
        const eY = midY - ampE * sinVal;
        const bX = x + ampB * sinVal * 0.5;
        const bY = midY + ampB * sinVal * 0.5;

        // E vector (cyan)
        ctx.strokeStyle = 'rgba(6, 182, 212, 0.6)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(x, midY);
        ctx.lineTo(x, eY);
        ctx.stroke();

        // B vector (magenta)
        ctx.strokeStyle = 'rgba(236, 72, 153, 0.6)';
        ctx.beginPath();
        ctx.moveTo(x, midY);
        ctx.lineTo(bX, bY);
        ctx.stroke();
      }

      animId = requestAnimationFrame(renderWave);
    };

    animId = requestAnimationFrame(renderWave);
    return () => cancelAnimationFrame(animId);
  }, [waveAmpE]);

  // ─── CALLBACK HANDLERS ───
  const handleDiscoveryAnswer = useCallback(
    (idx: number) => {
      const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
      setDiscoveryCorrect(isCorrect);
      setDiscoveryAnswered(true);
      audioManager.play(isCorrect ? 'success' : 'pop');
      speechManager.speak(isCorrect ? 'Outstanding physics intuition!' : DISCOVERY_QUESTION.hintAfter);
    },
    []
  );

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive exploration lab. Manipulate the physical controls!');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration unlocked. Experiment with all physical parameters without test pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge mode initiated. Solve these real-world electrodynamics and optics puzzles.');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded. Now verify it by adjusting the controls!');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Exact scientific observation!' : 'Check the waveform and gauge closely.');
  }, []);

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
      setShowExplanation(true);
    }
  }, [hintCount, challenge]);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback(
    (targetId: string) => {
      if (!draggedItem) return;
      const isCorrect = challenge.correctMapping?.[targetId] === draggedItem;
      if (isCorrect) {
        setDroppedLabels((prev) => ({ ...prev, [targetId]: draggedItem }));
        audioManager.play('drop-correct');
      } else {
        audioManager.play('drop-wrong');
      }
      setDraggedItem(null);
    },
    [draggedItem, challenge]
  );

  const handleSortMove = useCallback(
    (fromIndex: number, toIndex: number) => {
      audioManager.play('pickup');
      setSortArrangement((prev) => {
        const current = prev.length === (challenge.sortItems?.length || 0) ? [...prev] : (challenge.sortItems?.map((_, i) => i) || []);
        const [moved] = current.splice(fromIndex, 1);
        current.splice(toIndex, 0, moved);
        return current;
      });
    },
    [challenge]
  );

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Mission Accomplished! You have mastered ISC Class 12 Physics Electrodynamics and Optics.');
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
      setCurrentChallenge((c) => c + 1);
      audioManager.play('whoosh');
    }
  }, [currentChallenge, filteredChallenges.length, handleComplete]);

  const handleAnswer = useCallback(
    (answer: number | Record<string, string> | number[] | string) => {
      let isCorrect = false;

      if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
        isCorrect = answer === challenge.correctIndex;
      } else if (challenge.type === 'drag-label') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctMapping);
      } else if (challenge.type === 'drag-sort') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctOrder);
      } else if (challenge.type === 'numeric') {
        const numVal = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
        const correct = challenge.correctAnswer || 0;
        const tol = challenge.tolerance || 0;
        isCorrect = Math.abs(numVal - correct) <= tol;
      } else if (challenge.type === 'construct') {
        isCorrect = (answer as string).trim() === challenge.targetState?.trim();
      }

      if (isCorrect) {
        setScoreBreakdown((sb) => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct! Outstanding scientific precision.');
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
        setErrors((e) => e + 1);
        setWrongShake(true);
        setWrongFlash(true);
        setTimeout(() => setWrongShake(false), 500);
        setTimeout(() => setWrongFlash(false), 800);

        if (challenge.misconceptionIndex !== undefined && !hitMisconceptions.includes(challenge.misconceptionIndex)) {
          setHitMisconceptions((prev) => [...prev, challenge.misconceptionIndex!]);
        }

        if (hintCount < 3) {
          showNextHint();
        } else {
          setAnswerRevealed(true);
          setShowExplanation(true);
          speechManager.speak('Let us analyze the step-by-step physical solution.');
          bktStateRef.current = bktUpdate(bktStateRef.current, false);

          const srsItem = createReviewItem(challenge.nodeId, challenge.question);
          const updatedSrs = sm2Update(srsItem, 1, 4000);
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
          }
        }
      }
    },
    [challenge, hintCount, showNextHint, hitMisconceptions]
  );

  // ─── AUTO HINT TIMER EFFECT ───
  useEffect(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    if (phase === 'challenge' && !answerRevealed && hintCount === 0 && !showExplanation) {
      inactivityTimerRef.current = setTimeout(() => {
        showNextHint();
      }, 12000);
    }
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [phase, answerRevealed, hintCount, showExplanation, showNextHint]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap items-center justify-between pb-4 border-b border-slate-800 gap-3">
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2.5 bg-gold-950/70 border border-gold-800/60 rounded-2xl shadow-inner">{subjectConfig.emoji}</span>
          <div>
            <h1 className="text-xl md:text-2xl font-black bg-gradient-to-r from-gold-400 via-gold-300 to-gold-400 bg-clip-text text-transparent">
              {title}
            </h1>
            <p className="text-xs text-slate-400 flex items-center gap-2">
              <span>ISC Class 12 Physics</span>
              <span>•</span>
              <span className="text-gold-400 font-semibold">10 Verified Syllabus Nodes</span>
            </p>
          </div>
        </div>

        {/* Phase Pill Navigation */}
        <div className="flex items-center gap-2 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800 text-xs font-semibold">
          {(['discovery', 'explore', 'sandbox', 'challenge', 'complete'] as const).map((p) => (
            <motion.button
              key={p}
              aria-label={`Switch to ${p} phase`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setPhase(p);
                audioManager.play('tap');
              }}
              className={`px-3 py-1.5 rounded-xl capitalize transition-all ${
                phase === p ? 'bg-gold-600 text-white shadow-lg shadow-gold-600/30 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {p}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* ═══════════════════════════════════════════════════════════
          PHASE 1: DISCOVERY HOOK
      ══════════════════════════════════════════════════════���════ */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-6 space-y-6">
          {/* Narrative Card */}
          <div className="p-6 bg-gradient-to-br from-gold-950/60 via-slate-900 to-gold-950/40 rounded-3xl border border-gold-800/40 shadow-xl">
            <div className="flex items-center gap-2 text-gold-400 text-xs font-bold uppercase tracking-wider mb-2">
              <span>🚀 Operational Mission Scenario</span>
            </div>
            <h2 className="text-xl font-black text-white">{SCENARIO.title}</h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-gold-300/80 mt-2 bg-gold-950/40 p-3 rounded-xl border border-gold-900/50">{SCENARIO.context}</p>
          </div>

          {/* Curiosity Question */}
          <div className="p-6 bg-slate-900/90 rounded-3xl border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider bg-amber-950/50 px-3 py-1 rounded-full border border-amber-800/40">
                ⚡ Initial Scientific Diagnostic Hook
              </span>
              <span className="text-xs text-slate-400">Zero Grading • Pure Discovery</span>
            </div>
            <p className="text-base font-semibold text-slate-100">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((opt, idx) => (
                <motion.button
                  key={idx}
                  aria-label={`Option ${String.fromCharCode(65 + idx)}: ${opt}`}
                  whileHover={{ scale: 1.02, x: 2 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={discoveryAnswered}
                  onClick={() => handleDiscoveryAnswer(idx)}
                  className={`p-4 rounded-2xl text-left text-sm transition-all border ${
                    discoveryAnswered
                      ? idx === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                        : 'bg-slate-900/50 border-slate-800 text-slate-500'
                      : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700/80 text-slate-200 hover:border-gold-500/50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="font-bold text-xs bg-slate-700/60 px-2 py-1 rounded-md text-slate-300">
                      {discoveryAnswered && idx === DISCOVERY_QUESTION.correctIndex ? '✓ ' : ''}
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="leading-snug">{opt}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pt-4 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400 font-semibold' : 'text-amber-300 font-medium'}`}>
                  {discoveryCorrect ? '✓ Spot on! When flux is maximum, dΦ/dt is momentarily zero.' : `ℹ️ ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  aria-label="Launch Guided Exploration Lab"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-3 bg-gradient-to-r from-gold-600 to-gold-600 hover:from-gold-500 hover:to-gold-500 text-white font-bold rounded-2xl shadow-lg shadow-gold-600/30 flex items-center gap-2 text-sm"
                >
                  <span>Launch Guided Exploration Lab</span>
                  <span>→</span>
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ═══════════════════════════════════════════════════════════
          PHASE 2: INTERACTIVE EXPLORATION (BRILLIANT.ORG STYLE)
      ═══════════════════════════════════════════════════════════ */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">
          {/* Step Banner */}
          <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-gold-400 uppercase tracking-widest">
                Interactive Lab Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
              </span>
              <h2 className="text-lg font-bold text-white mt-0.5">{EXPLORATION_STEPS[currentSlide].title}</h2>
            </div>
            <p className="text-xs text-amber-300 bg-amber-950/40 border border-amber-800/50 px-3 py-1.5 rounded-xl max-w-md hidden md:block">
              👉 {EXPLORATION_STEPS[currentSlide].instruction}
            </p>
          </div>

          {/* INTERACTIVE VISUALIZATION STAGE */}
          <div className="bg-slate-900/90 rounded-3xl p-6 border border-slate-800 shadow-2xl space-y-6">
            {/* ─── SLIDE 0: AC GENERATOR INTERACTIVE LAB ─── */}
            {currentSlide === 0 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  {/* Canvas Animation */}
                  <div className="lg:col-span-7 bg-slate-950 rounded-2xl p-4 border border-slate-800 flex flex-col items-center">
                    <span className="text-xs font-semibold text-slate-400 mb-2">Live Armature & Rotating Magnetic Flux</span>
                    <canvas ref={canvasGenRef} width={450} height={200} className="w-full max-w-md bg-slate-900/60 rounded-xl" />
                  </div>

                  {/* Physical Sliders */}
                  <div className="lg:col-span-5 space-y-4 bg-slate-950/60 p-5 rounded-2xl border border-slate-800/80">
                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                        <span>Rotation Frequency (f)</span>
                        <span className="text-gold-400">{genFreq} Hz</span>
                      </div>
                      <input
                        type="range"
                        min={10}
                        max={120}
                        step={5}
                        value={genFreq}
                        aria-label="Generator Rotation Frequency"
                        onChange={(e) => {
                          setGenFreq(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-gold-500 cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                        <span>Magnetic Field (B)</span>
                        <span className="text-gold-400">{genBField.toFixed(2)} Tesla</span>
                      </div>
                      <input
                        type="range"
                        min={0.1}
                        max={1.5}
                        step={0.05}
                        value={genBField}
                        aria-label="Magnetic Field Strength"
                        onChange={(e) => {
                          setGenBField(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-gold-500 cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                        <span>Armature Turns (N)</span>
                        <span className="text-gold-400">{genTurns} turns</span>
                      </div>
                      <input
                        type="range"
                        min={50}
                        max={1000}
                        step={50}
                        value={genTurns}
                        aria-label="Armature Turns count"
                        onChange={(e) => {
                          setGenTurns(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-gold-500 cursor-pointer"
                      />
                    </div>

                    {/* Live Calculated Metric */}
                    <div className="p-3 bg-gold-950/40 rounded-xl border border-gold-800/50 flex items-center justify-between">
                      <span className="text-xs text-slate-300 font-semibold">Peak EMF (ε₀ = NBAω):</span>
                      <span className="text-sm font-mono font-bold text-gold-300">{peakEMF.toFixed(1)} Volts</span>
                    </div>
                  </div>
                </div>

                {/* Predict-Then-Check Section */}
                <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider bg-amber-950/60 px-2.5 py-0.5 rounded-md">
                      Predict-Then-Check
                    </span>
                    <span className="text-xs text-slate-400">Scientific Hypothesis Test</span>
                  </div>
                  {!predictionMade ? (
                    <div className="space-y-2">
                      <p className="text-xs md:text-sm font-semibold text-slate-200">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            aria-label={`Prediction: ${opt}`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handlePrediction(i)}
                            className="p-2.5 bg-slate-800 hover:bg-slate-700 text-xs rounded-xl text-slate-200 text-left font-medium border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-xs text-gold-300 font-medium">✓ {PREDICTION_QUESTIONS[0].verifyInstruction}</p>
                      {/* Observation Question */}
                      {!observationAnswered ? (
                        <div className="pt-2 border-t border-slate-800/80 space-y-2">
                          <p className="text-xs font-semibold text-slate-300">{OBSERVATION_QUESTIONS[0].question}</p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                              <motion.button
                                key={i}
                                aria-label={`Observation answer: ${opt}`}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleObservation(i)}
                                className="p-2 bg-slate-800/80 hover:bg-slate-700 text-xs rounded-lg text-slate-300 text-left"
                              >
                                {opt}
                              </motion.button>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <p className="text-xs text-emerald-400 font-semibold">
                          ✓ Observation Verified: EMF is maximum when flux is zero because the cosine derivative (dΦ/dt) is steepest!
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ─── SLIDE 1: DISPLACEMENT CURRENT LAB ─── */}
            {currentSlide === 1 && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-7 bg-slate-950 rounded-2xl p-6 border border-slate-800">
                  <svg viewBox="0 0 420 220" className="w-full">
                    {/* Wires */}
                    <line x1="20" y1="110" x2="140" y2="110" stroke="#38bdf8" strokeWidth="4" />
                    <line x1="280" y1="110" x2="400" y2="110" stroke="#38bdf8" strokeWidth="4" />

                    {/* Conduction current arrows */}
                    <polygon points="80,105 95,110 80,115" fill="#facc15" />
                    <text x="80" y="95" fill="#facc15" fontSize="11" fontWeight="bold">I_c (conduction)</text>

                    {/* Capacitor Plates */}
                    <rect x="140" y="40" width="12" height="140" rx="3" fill="#64748b" stroke="#94a3b8" />
                    <rect x="268" y="40" width="12" height="140" rx="3" fill="#64748b" stroke="#94a3b8" />

                    {/* Electric Field lines in gap */}
                    {[65, 90, 115, 140, 165].map((y, i) => (
                      <g key={i}>
                        <line x1="156" y1={y} x2="264" y2={y} stroke="#06b6d4" strokeWidth="2" strokeDasharray="3 3" />
                        <polygon points={`210,${y - 3} 216,${y} 210,${y + 3}`} fill="#06b6d4" />
                      </g>
                    ))}
                    <text x="210" y="55" textAnchor="middle" fill="#06b6d4" fontSize="11" fontWeight="bold">E(t) Flux</text>

                    {/* Amperian Loop S2 around Gap */}
                    <ellipse cx="210" cy="110" rx="45" ry="75" fill="none" stroke="#ec4899" strokeWidth="2" strokeDasharray="4 4" />
                    <text x="210" y="195" textAnchor="middle" fill="#ec4899" fontSize="10" fontWeight="bold">
                      Loop: ∮B·dl = μ₀(I_d)
                    </text>
                  </svg>
                </div>

                <div className="lg:col-span-5 space-y-4 bg-slate-950/60 p-5 rounded-2xl border border-slate-800">
                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                      <span>Rate of Change of Field (dE/dt)</span>
                      <span className="text-gold-400">{capDEDt.toFixed(1)} × 10¹¹ V/m·s</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={15}
                      step={0.5}
                      value={capDEDt}
                      aria-label="Rate of Change of Electric Field"
                      onChange={(e) => setCapDEDt(Number(e.target.value))}
                      className="w-full accent-gold-500 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                      <span>Plate Area (A)</span>
                      <span className="text-gold-400">{(capArea * 100).toFixed(0)} cm²</span>
                    </div>
                    <input
                      type="range"
                      min={0.01}
                      max={0.1}
                      step={0.005}
                      value={capArea}
                      aria-label="Capacitor Plate Area"
                      onChange={(e) => setCapArea(Number(e.target.value))}
                      className="w-full accent-gold-500 cursor-pointer"
                    />
                  </div>

                  <div className="p-3.5 bg-gold-950/40 rounded-xl border border-gold-800/50 space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-300">Displacement Current (I_d):</span>
                      <span className="font-mono font-bold text-gold-300">{displacementCurrent.toFixed(2)} mA</span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Even with ZERO physical electrons crossing vacuum, magnetic field around gap is identical to B around wire!
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ─── SLIDE 2: TRANSVERSE EM WAVE COUPLED DYNAMICS ─── */}
            {currentSlide === 2 && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-8 bg-slate-950 rounded-2xl p-4 border border-slate-800 flex flex-col items-center">
                  <div className="flex items-center justify-between w-full text-xs text-slate-400 px-2 mb-2">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-gold-400 inline-block" /> Electric Field E_y
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-pink-500 inline-block" /> Magnetic Field B_z
                    </span>
                    <span className="text-slate-300 font-semibold">E ⊥ B ⊥ c</span>
                  </div>
                  <canvas ref={canvasWaveRef} width={520} height={200} className="w-full bg-slate-900/60 rounded-xl" />
                </div>

                <div className="lg:col-span-4 space-y-4 bg-slate-950/60 p-5 rounded-2xl border border-slate-800">
                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                      <span>Peak Electric Field (E₀)</span>
                      <span className="text-gold-400">{waveAmpE} V/m</span>
                    </div>
                    <input
                      type="range"
                      min={30}
                      max={300}
                      step={10}
                      value={waveAmpE}
                      aria-label="Peak Electric Field amplitude"
                      onChange={(e) => setWaveAmpE(Number(e.target.value))}
                      className="w-full accent-gold-500 cursor-pointer"
                    />
                  </div>

                  <div className="p-3 bg-gold-950/40 rounded-xl border border-gold-800/50 space-y-1">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-300">Peak B-Field (B₀ = E₀/c):</span>
                      <span className="font-mono font-bold text-pink-400">{waveBField.toFixed(3)} μT</span>
                    </div>
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-300">Wave Speed (c = 1/√(μ₀ε₀)):</span>
                      <span className="font-mono font-bold text-gold-300">3.00 × 10⁸ m/s</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Notice: E and B are in-phase (reach zero and peaks together) but have vastly different numerical magnitudes due to c!
                  </p>
                </div>
              </div>
            )}

            {/* ─── SLIDE 3: SNELL’S LAW & TOTAL INTERNAL REFLECTION ─── */}
            {currentSlide === 3 && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-7 bg-slate-950 rounded-2xl p-6 border border-slate-800">
                  <svg viewBox="0 0 400 240" className="w-full">
                    {/* Media backgrounds */}
                    <rect x="0" y="0" width="400" height="120" fill="rgba(15, 23, 42, 0.7)" />
                    <rect x="0" y="120" width="400" height="120" fill="rgba(30, 58, 138, 0.4)" />

                    <text x="20" y="30" fill="#94a3b8" fontSize="11" fontWeight="bold">Rarer Medium: Air (n₂ = 1.00)</text>
                    <text x="20" y="220" fill="#38bdf8" fontSize="11" fontWeight="bold">Denser Medium: Glass (n₁ = {opticsN1.toFixed(2)})</text>

                    {/* Interface Line */}
                    <line x1="0" y1="120" x2="400" y2="120" stroke="#64748b" strokeWidth="2" />

                    {/* Normal Line */}
                    <line x1="200" y1="10" x2="200" y2="230" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 4" />
                    <text x="205" y="25" fill="#94a3b8" fontSize="10">Normal</text>

                    {/* Incident Ray (from glass below) */}
                    {(() => {
                      const radI = (opticsAngleI * Math.PI) / 180;
                      const startX = 200 - Math.sin(radI) * 100;
                      const startY = 120 + Math.cos(radI) * 100;
                      return (
                        <g>
                          <line x1={startX} y1={startY} x2="200" y2="120" stroke="#facc15" strokeWidth="3" />
                          <circle cx={startX} cy={startY} r="3" fill="#facc15" />
                        </g>
                      );
                    })()}

                    {/* Refracted or TIR Ray */}
                    {isTIR ? (
                      (() => {
                        const radI = (opticsAngleI * Math.PI) / 180;
                        const endX = 200 + Math.sin(radI) * 100;
                        const endY = 120 + Math.cos(radI) * 100;
                        return (
                          <g>
                            <line x1="200" y1="120" x2={endX} y2={endY} stroke="#ec4899" strokeWidth="3.5" />
                            <text x="240" y="190" fill="#ec4899" fontSize="11" fontWeight="bold">100% Total Internal Reflection!</text>
                          </g>
                        );
                      })()
                    ) : (
                      (() => {
                        const radR = (refractionAngleR * Math.PI) / 180;
                        const endX = 200 + Math.sin(radR) * 100;
                        const endY = 120 - Math.cos(radR) * 100;
                        return (
                          <g>
                            <line x1="200" y1="120" x2={endX} y2={endY} stroke="#4ade80" strokeWidth="3" />
                            <text x="220" y="70" fill="#4ade80" fontSize="11">r = {refractionAngleR.toFixed(1)}°</text>
                          </g>
                        );
                      })()
                    )}
                  </svg>
                </div>

                <div className="lg:col-span-5 space-y-4 bg-slate-950/60 p-5 rounded-2xl border border-slate-800">
                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                      <span>Angle of Incidence in Glass (θ₁)</span>
                      <span className="text-amber-400">{opticsAngleI}°</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={85}
                      step={1}
                      value={opticsAngleI}
                      aria-label="Angle of incidence in denser medium"
                      onChange={(e) => {
                        setOpticsAngleI(Number(e.target.value));
                        audioManager.play('count');
                      }}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </div>

                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Critical Angle (θ_c = arcsin(1/n)):</span>
                      <span className="font-mono font-bold text-gold-400">{criticalAngle.toFixed(1)}°</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Optical State:</span>
                      <span className={`font-bold ${isTIR ? 'text-pink-400' : 'text-emerald-400'}`}>
                        {isTIR ? '✓ TOTAL INTERNAL REFLECTION' : `Refracting (r = ${refractionAngleR.toFixed(1)}°)`}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ─── SLIDE 4: PRISM MINIMUM DEVIATION ─── */}
            {currentSlide === 4 && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-7 bg-slate-950 rounded-2xl p-6 border border-slate-800">
                  <svg viewBox="0 0 380 230" className="w-full">
                    {/* Equilateral Prism Triangle */}
                    <polygon points="190,30 60,200 320,200" fill="rgba(30, 58, 138, 0.35)" stroke="#38bdf8" strokeWidth="2.5" />
                    <text x="190" y="55" textAnchor="middle" fill="#93c5fd" fontSize="11" fontWeight="bold">A = 60°</text>

                    {/* Ray entering left face */}
                    <line x1="30" y1="160" x2="115" y2="130" stroke="#facc15" strokeWidth="3" />
                    {/* Internal ray */}
                    <line x1="115" y1="130" x2="265" y2="130" stroke="#38bdf8" strokeWidth="3" />
                    {/* Emergent ray */}
                    <line x1="265" y1="130" x2="350" y2="160" stroke="#4ade80" strokeWidth="3" />

                    {/* Internal ray parallel indicator */}
                    <line x1="115" y1="140" x2="265" y2="140" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="3 3" />
                    <text x="190" y="155" textAnchor="middle" fill="#c084fc" fontSize="10">
                      {Math.abs(prismAngleI - 48.6) < 2 ? '★ Ray is PARALLEL to Base (Minimum Deviation!)' : 'Internal Refracted Ray'}
                    </text>
                  </svg>
                </div>

                <div className="lg:col-span-5 space-y-4 bg-slate-950/60 p-5 rounded-2xl border border-slate-800">
                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                      <span>Angle of Incidence (i)</span>
                      <span className="text-amber-400">{prismAngleI.toFixed(1)}°</span>
                    </div>
                    <input
                      type="range"
                      min={25}
                      max={75}
                      step={0.5}
                      value={prismAngleI}
                      aria-label="Angle of Incidence on Prism"
                      onChange={(e) => {
                        setPrismAngleI(Number(e.target.value));
                        audioManager.play('count');
                      }}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </div>

                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Total Deviation (δ = i + e - A):</span>
                      <span className="font-mono font-bold text-gold-300">{prismCalc.delta.toFixed(1)}°</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Minimum Deviation (δ_min):</span>
                      <span className="font-mono font-bold text-emerald-400">37.2° (at i ≈ 48.6°)</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-2">
            <motion.button
              aria-label="Previous Lab Step"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={currentSlide === 0}
              onClick={() => {
                setCurrentSlide((s) => Math.max(0, s - 1));
                audioManager.play('tap');
              }}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white text-xs font-bold rounded-xl border border-slate-700"
            >
              ← Previous Lab
            </motion.button>

            <span className="text-xs font-semibold text-slate-400">Step {currentSlide + 1} of {EXPLORATION_STEPS.length}</span>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                aria-label="Next Lab Step"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentSlide((s) => s + 1);
                  audioManager.play('tap');
                }}
                className="px-5 py-2.5 bg-gold-600 hover:bg-gold-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-gold-600/30"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                aria-label="Proceed to Free Sandbox"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-gold-600 hover:from-emerald-500 hover:to-gold-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-600/30"
              >
                Proceed to Free Sandbox →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ═══════════════════════════════════════════════════════════
          PHASE 3: SANDBOX MODE (FREE PLAY)
      ═══════════════════════════════════════════════════════════ */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">
          <div className="p-5 bg-slate-900/90 rounded-3xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">🔬 Free Sandbox Workspace</span>
              <h2 className="text-lg font-black text-white mt-0.5">Electrodynamics & Optics Multi-Simulator</h2>
              <p className="text-xs text-slate-400 mt-1">Experiment across all physical modules with zero time or score pressure.</p>
            </div>
            <motion.button
              aria-label="Start Diagnostic Challenges"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-6 py-3 bg-gradient-to-r from-gold-600 to-gold-600 hover:from-gold-500 hover:to-gold-500 text-white text-sm font-bold rounded-2xl shadow-lg shadow-gold-600/30"
            >
              Start Diagnostic Challenges →
            </motion.button>
          </div>

          {/* Module Selector Tabs */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'generator' as const, label: '⚡ AC Alternator' },
              { id: 'capacitor' as const, label: '🔋 Displacement Current' },
              { id: 'emwave' as const, label: '🌊 Transverse EM Wave' },
              { id: 'snell' as const, label: '💎 Snellian TIR' },
              { id: 'prism' as const, label: '🔺 Prism Optics' },
              { id: 'mirror' as const, label: '🪞 Spherical Mirror' },
            ].map((tab) => (
              <motion.button
                key={tab.id}
                aria-label={`Select tab ${tab.label}`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  setActiveInteractiveTab(tab.id);
                  audioManager.play('tap');
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                  activeInteractiveTab === tab.id
                    ? 'bg-gold-600 border-gold-400 text-white shadow-md shadow-gold-600/30'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {tab.label}
              </motion.button>
            ))}
          </div>

          {/* Sandbox Active Card */}
          <div className="p-6 bg-slate-900/80 rounded-3xl border border-slate-800 shadow-xl">
            {activeInteractiveTab === 'mirror' && (
              <div className="space-y-6">
                <h3 className="text-sm font-bold text-gold-300">Spherical Mirror Ray Tracer & Formula Engine (1/v + 1/u = 1/f)</h3>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  <div className="lg:col-span-7 bg-slate-950 rounded-2xl p-6 border border-slate-800">
                    <svg viewBox="0 0 400 200" className="w-full">
                      {/* Principal Axis */}
                      <line x1="10" y1="100" x2="390" y2="100" stroke="#64748b" strokeWidth="1.5" />
                      {/* Mirror Arc at x=200 */}
                      <path
                        d={
                          mirrorType === 'concave'
                            ? 'M 200,20 Q 185,100 200,180'
                            : 'M 200,20 Q 215,100 200,180'
                        }
                        fill="none"
                        stroke="#38bdf8"
                        strokeWidth="5"
                      />
                      <text x="200" y="195" textAnchor="middle" fill="#38bdf8" fontSize="10">Pole (P)</text>

                      {/* Focal Point (F) */}
                      {(() => {
                        const fX = mirrorType === 'concave' ? 200 - Math.abs(mirrorF) * 4 : 200 + Math.abs(mirrorF) * 4;
                        return (
                          <g>
                            <circle cx={fX} cy="100" r="4" fill="#facc15" />
                            <text x={fX} y="118" textAnchor="middle" fill="#facc15" fontSize="10">F ({mirrorCalc.fVal} cm)</text>
                          </g>
                        );
                      })()}

                      {/* Object Arrow at x = 200 - |u|*4 */}
                      {(() => {
                        const objX = 200 - Math.abs(mirrorU) * 4;
                        return (
                          <g>
                            <line x1={objX} y1="100" x2={objX} y2="50" stroke="#22c55e" strokeWidth="3" />
                            <polygon points={`${objX},45 ${objX - 4},55 ${objX + 4},55`} fill="#22c55e" />
                            <text x={objX} y="40" textAnchor="middle" fill="#22c55e" fontSize="10">Object</text>
                          </g>
                        );
                      })()}

                      {/* Image Arrow */}
                      {(() => {
                        if (!isFinite(mirrorCalc.v)) return null;
                        const imgX = 200 + mirrorCalc.v * 4;
                        const imgHeight = -50 * mirrorCalc.m;
                        const clampedImgX = Math.max(15, Math.min(385, imgX));
                        return (
                          <g>
                            <line x1={clampedImgX} y1="100" x2={clampedImgX} y2={100 + imgHeight} stroke="#ec4899" strokeWidth="3" />
                            <text x={clampedImgX} y={100 + imgHeight + (imgHeight < 0 ? -6 : 14)} textAnchor="middle" fill="#ec4899" fontSize="10">
                              Image ({mirrorCalc.v.toFixed(1)} cm)
                            </text>
                          </g>
                        );
                      })()}
                    </svg>
                  </div>

                  <div className="lg:col-span-5 space-y-4 bg-slate-950/60 p-5 rounded-2xl border border-slate-800">
                    <div className="flex gap-2">
                      <button
                        aria-label="Select Concave Mirror"
                        onClick={() => setMirrorType('concave')}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-bold ${
                          mirrorType === 'concave' ? 'bg-gold-600 text-white' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        Concave Mirror (f &lt; 0)
                      </button>
                      <button
                        aria-label="Select Convex Mirror"
                        onClick={() => setMirrorType('convex')}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-bold ${
                          mirrorType === 'convex' ? 'bg-gold-600 text-white' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        Convex Mirror (f &gt; 0)
                      </button>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                        <span>Object Distance (|u|)</span>
                        <span className="text-gold-400">{mirrorU} cm</span>
                      </div>
                      <input
                        type="range"
                        min={5}
                        max={45}
                        step={1}
                        value={Math.abs(mirrorU)}
                        aria-label="Object Distance in cm"
                        onChange={(e) => setMirrorU(-Number(e.target.value))}
                        className="w-full accent-gold-500 cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                        <span>Focal Length Magnitude (|f|)</span>
                        <span className="text-gold-400">{mirrorF} cm</span>
                      </div>
                      <input
                        type="range"
                        min={8}
                        max={25}
                        step={1}
                        value={Math.abs(mirrorF)}
                        aria-label="Focal length magnitude in cm"
                        onChange={(e) => setMirrorF(Number(e.target.value))}
                        className="w-full accent-gold-500 cursor-pointer"
                      />
                    </div>

                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1.5 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Image Distance (v):</span>
                        <span className="font-mono font-bold text-pink-400">{mirrorCalc.v.toFixed(1)} cm</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Magnification (m = -v/u):</span>
                        <span className="font-mono font-bold text-gold-300">{mirrorCalc.m.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Image Nature:</span>
                        <span className="font-semibold text-emerald-400">{mirrorCalc.nature}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeInteractiveTab === 'generator' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                <canvas ref={canvasGenRef} width={450} height={180} className="w-full bg-slate-950 rounded-2xl border border-slate-800" />
                <div className="space-y-3 text-xs text-slate-300">
                  <h4 className="font-bold text-gold-300 text-sm">Alternator Physics Formulae:</h4>
                  <p className="font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-gold-400">
                    Φ(t) = NBA cos(ωt) <br />
                    ε(t) = -dΦ/dt = NBAω sin(ωt) = ε₀ sin(ωt)
                  </p>
                  <p className="text-slate-400">Peak Voltage ε₀ = NBA(2πf) = {peakEMF.toFixed(1)} V</p>
                </div>
              </div>
            )}

            {activeInteractiveTab === 'capacitor' && (
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-xs">
                <h4 className="font-bold text-gold-300 text-sm">Displacement Current (Maxwell Correction):</h4>
                <p className="font-mono text-gold-400 bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                  I_d = ε₀ (dΦ_E / dt) = ε₀ A (dE / dt) = {displacementCurrent.toFixed(2)} mA
                </p>
                <p className="text-slate-400">Restores charge conservation to Ampere’s Law: ∮ B·dl = μ₀ (I_c + I_d).</p>
              </div>
            )}

            {activeInteractiveTab === 'emwave' && (
              <div className="space-y-4">
                <canvas ref={canvasWaveRef} width={500} height={160} className="w-full bg-slate-950 rounded-2xl border border-slate-800" />
                <p className="text-xs text-slate-400 font-mono">
                  E_y = E₀ sin(kx - ωt) &nbsp;|&nbsp; B_z = B₀ sin(kx - ωt) &nbsp;|&nbsp; E₀/B₀ = c ≈ 3.0×10⁸ m/s
                </p>
              </div>
            )}

            {activeInteractiveTab === 'snell' && (
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-xs">
                <h4 className="font-bold text-gold-300 text-sm">Snell’s Law & Critical Angle:</h4>
                <p className="font-mono text-gold-400">n₁ sin(θ₁) = n₂ sin(θ₂) &nbsp;⇒&nbsp; sin(θ_c) = n₂ / n₁</p>
                <p className="text-slate-400">Glass-Air (n=1.50): θ_c = {criticalAngle.toFixed(1)}°. If θ &gt; θ_c ⇒ 100% Total Internal Reflection.</p>
              </div>
            )}

            {activeInteractiveTab === 'prism' && (
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-xs">
                <h4 className="font-bold text-gold-300 text-sm">Prism Formula at Minimum Deviation:</h4>
                <p className="font-mono text-gold-400 bg-slate-900 p-2 rounded-lg">
                  n = sin((A + δ_min)/2) / sin(A/2)
                </p>
                <p className="text-slate-400">For thin prism (A ≤ 10°): δ ≈ (n - 1) A.</p>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* ═══════════════════════════════════════════════════════════
          PHASE 4: DIAGNOSTIC CHALLENGE ENGINE
      ═══════════════════════════════════════════════════════════ */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">
          {/* Status & Adaptive Difficulty Header */}
          <div className="flex items-center justify-between p-4 bg-slate-900/90 rounded-2xl border border-slate-800">
            <div>
              <span className="text-xs font-bold text-slate-400">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>Competency Target:</span>
                <span className="text-gold-400 capitalize bg-gold-950/60 px-2 py-0.5 rounded-md border border-gold-800/50 text-xs">
                  {challenge.competencyLevel}
                </span>
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <motion.span
                key={difficulty}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`text-xs font-black px-3 py-1.5 rounded-xl uppercase tracking-wider ${
                  difficulty === 'foundation'
                    ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-700/60'
                    : difficulty === 'advanced'
                    ? 'bg-rose-950/80 text-rose-400 border border-rose-700/60'
                    : 'bg-gold-950/80 text-gold-400 border border-gold-700/60'
                }`}
              >
                {difficulty} Tier
              </motion.span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
            />
          </div>

          {/* MAIN CHALLENGE CARD */}
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 bg-slate-900/90 rounded-3xl border shadow-2xl transition-all ${
              wrongFlash ? 'bg-rose-950/40 border-rose-600' : 'border-slate-800'
            }`}
          >
            <p className="text-base md:text-lg font-bold text-slate-100 leading-relaxed mb-4">{challenge.question}</p>

            {/* MCQ TYPE (Classify / Distinguish / Match) */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="space-y-2.5">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                    whileHover={{ scale: 1.01, x: 3 }}
                    whileTap={{ scale: 0.99 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={wrongShake ? { duration: 0.4 } : {}}
                    disabled={answerRevealed || showExplanation}
                    onClick={() => handleAnswer(i)}
                    className={`w-full text-left p-4 rounded-2xl border text-sm transition-all ${
                      showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-lg shadow-emerald-950/50'
                        : wrongFlash
                        ? 'bg-rose-950/30 border-rose-700 text-rose-300'
                        : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-200 hover:border-gold-500/50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="font-bold text-xs bg-slate-700/60 px-2.5 py-1 rounded-md text-slate-300">
                        {showExplanation && i === challenge.correctIndex ? '✓ ' : ''}
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span className="leading-snug">{opt}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            )}

            {/* NUMERIC CHALLENGE TYPE */}
            {challenge.type === 'numeric' && (
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    step="any"
                    value={numericInput}
                    aria-label="Numerical answer input"
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter calculated numerical value..."
                    disabled={showExplanation}
                    className="flex-1 px-4 py-3 bg-slate-950 border border-slate-700 rounded-2xl text-white font-mono text-sm focus:outline-none focus:border-gold-500"
                  />
                  <span className="text-sm font-bold text-gold-400 min-w-[40px]">{challenge.unit}</span>
                  <motion.button
                    aria-label="Submit numeric answer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-6 py-3 bg-gold-600 hover:bg-gold-500 disabled:opacity-40 text-white font-bold rounded-2xl text-sm"
                  >
                    Submit
                  </motion.button>
                </div>
              </div>
            )}

            {/* DRAG-LABEL CHALLENGE TYPE */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-6 pt-2">
                {/* Palette */}
                <div className="flex flex-wrap gap-2">
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      role="button"
                      tabIndex={0}
                      aria-label={`Draggable component: ${item.label}`}
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3.5 py-2 bg-gold-700 hover:bg-gold-600 text-white text-xs font-bold rounded-xl cursor-grab active:cursor-grabbing shadow-md"
                    >
                      :: {item.label}
                    </motion.div>
                  ))}
                </div>

                {/* SVG Drop Targets */}
                <svg viewBox="0 0 400 200" className="w-full bg-slate-950 rounded-2xl p-2 border border-slate-800">
                  <rect x="50" y="20" width="120" height="45" rx="8" fill="#1e293b" stroke="#475569" />
                  <text x="110" y="47" textAnchor="middle" fill="#94a3b8" fontSize="11">{droppedLabels.target_coil || 'Drop: Coil'}</text>
                  <rect x="50" y="20" width="120" height="45" rx="8" fill="transparent" onDragOver={(e) => e.preventDefault()} onDrop={() => handleDragDrop('target_coil')} />

                  <rect x="230" y="20" width="120" height="45" rx="8" fill="#1e293b" stroke="#475569" />
                  <text x="290" y="47" textAnchor="middle" fill="#94a3b8" fontSize="11">{droppedLabels.target_magnet || 'Drop: Magnets'}</text>
                  <rect x="230" y="20" width="120" height="45" rx="8" fill="transparent" onDragOver={(e) => e.preventDefault()} onDrop={() => handleDragDrop('target_magnet')} />

                  <rect x="50" y="110" width="120" height="45" rx="8" fill="#1e293b" stroke="#475569" />
                  <text x="110" y="137" textAnchor="middle" fill="#94a3b8" fontSize="11">{droppedLabels.target_rings || 'Drop: Slip Rings'}</text>
                  <rect x="50" y="110" width="120" height="45" rx="8" fill="transparent" onDragOver={(e) => e.preventDefault()} onDrop={() => handleDragDrop('target_rings')} />

                  <rect x="230" y="110" width="120" height="45" rx="8" fill="#1e293b" stroke="#475569" />
                  <text x="290" y="137" textAnchor="middle" fill="#94a3b8" fontSize="11">{droppedLabels.target_brushes || 'Drop: Brushes'}</text>
                  <rect x="230" y="110" width="120" height="45" rx="8" fill="transparent" onDragOver={(e) => e.preventDefault()} onDrop={() => handleDragDrop('target_brushes')} />
                </svg>

                <motion.button
                  aria-label="Verify Dropped Labels"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white font-bold rounded-xl text-xs"
                >
                  Verify Labels
                </motion.button>
              </div>
            )}

            {/* DRAG-SORT CHALLENGE TYPE */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3 pt-2">
                {(sortArrangement.length === challenge.sortItems.length
                  ? sortArrangement.map((idx) => challenge.sortItems![idx])
                  : challenge.sortItems
                ).map((item, idx) => (
                  <motion.div
                    key={idx}
                    draggable
                    role="button"
                    tabIndex={0}
                    aria-label={`Sort item ${idx + 1}: ${item}`}
                    onDragStart={() => handleDragStart(String(idx))}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => {
                      const fromIdx = parseInt(draggedItem || '0');
                      handleSortMove(fromIdx, idx);
                    }}
                    whileHover={{ scale: 1.01 }}
                    className="p-3 bg-slate-800 rounded-xl border border-slate-700 text-xs font-semibold text-slate-200 cursor-grab flex items-center justify-between"
                  >
                    <span>{idx + 1}. {item}</span>
                    <span className="text-slate-500 text-xs">↕ drag</span>
                  </motion.div>
                ))}

                <motion.button
                  aria-label="Confirm Sorted Order"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const answer = sortArrangement.length > 0 ? sortArrangement : challenge.sortItems?.map((_, i) => i) || [];
                    handleAnswer(answer);
                  }}
                  className="mt-2 px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white font-bold rounded-xl text-xs"
                >
                  Confirm Order
                </motion.button>
              </div>
            )}

            {/* CONSTRUCT CHALLENGE TYPE */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4 pt-2">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Add part ${part}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts((prev) => [...prev, part])}
                      className="px-3 py-1.5 bg-gold-800 hover:bg-gold-700 text-white text-xs font-mono font-bold rounded-lg border border-gold-600"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                {/* Construction Area */}
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 min-h-[60px] flex flex-wrap items-center gap-2">
                  {constructParts.map((part, i) => (
                    <span key={i} className="px-2.5 py-1 bg-gold-950 text-gold-300 font-mono text-xs font-bold rounded-md border border-gold-800 flex items-center gap-1.5">
                      {part}
                      <button
                        aria-label={`Remove part ${part}`}
                        onClick={() => setConstructParts((p) => p.filter((_, idx) => idx !== i))}
                        className="text-rose-400 hover:text-rose-300 font-bold"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  {constructParts.length === 0 && <span className="text-xs text-slate-500 italic">Click parts above to construct the formula...</span>}
                </div>

                <motion.button
                  aria-label="Verify Constructed Formula"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={constructParts.length === 0 || showExplanation}
                  className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white font-bold rounded-xl text-xs"
                >
                  Verify Construction
                </motion.button>
              </div>
            )}

            {/* PROGRESSIVE STEP-BY-STEP EXPLANATION */}
            {showExplanation && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-5 bg-amber-950/40 rounded-2xl border border-amber-800/60 space-y-3">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Step-by-Step Rigorous Physics Solution:</span>
                <div className="space-y-2">
                  {challenge.explanation
                    .split('. ')
                    .filter((s) => s.trim().length > 0)
                    .slice(0, revealedSteps + 1)
                    .map((sentence, i) => (
                      <motion.p key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} className="text-xs md:text-sm text-amber-200 leading-relaxed">
                        <span className="font-bold text-amber-400">{i + 1}.</span> {sentence}
                        {!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}
                </div>

                <div className="pt-2 flex items-center justify-between">
                  {revealedSteps < challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      aria-label="Show Next Explanation Step"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps((s) => s + 1)}
                      className="px-4 py-2 bg-amber-800/80 hover:bg-amber-700 text-white text-xs font-bold rounded-xl"
                    >
                      Show Next Explanation Step →
                    </motion.button>
                  ) : (
                    <motion.button
                      aria-label="Proceed to Next Challenge"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-gold-600 hover:from-emerald-500 hover:to-gold-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-600/30"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Masterlab →' : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ═══════════════════════════════════════════════════════════
          PHASE 5: COMPLETION & MASTERY PROFILE
      ═══════════════════════════════════════════════════════════ */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-6 space-y-6">
          {/* Score & Mastery Banner */}
          <div className="p-8 bg-gradient-to-br from-slate-900 via-gold-950/60 to-gold-950/50 rounded-3xl border border-gold-800/50 text-center space-y-3">
            <span className="text-4xl">🏆</span>
            <h2 className="text-2xl font-black text-white">Diagnostic Calibration Complete!</h2>
            <div className="flex items-center justify-center gap-6 pt-2">
              <div>
                <p className="text-xs text-slate-400">Final Masterlab Score</p>
                <p className="text-3xl font-black text-gold-400">{Math.max(0, 100 - errors * 5)}%</p>
              </div>
              <div className="h-10 w-[1px] bg-slate-800" />
              <div>
                <p className="text-xs text-slate-400">BKT Mastery Level</p>
                <p className="text-2xl font-bold text-emerald-400 capitalize">{masteryLevel}</p>
              </div>
            </div>
          </div>

          {/* Motivational Feedback */}
          <div className="p-5 bg-emerald-950/50 rounded-2xl border border-emerald-700/60 text-sm text-emerald-300 font-medium">
            {errors === 0
              ? '✓ PERFECT SCORE! Flawless conceptual and numerical execution across Electrodynamics and Optics.'
              : errors <= 3
              ? '✓ Excellent performance! You demonstrate solid command of Maxwell equations and ray geometry.'
              : 'ℹ️ Commendable effort! Review your misconception profile below to polish remaining edge cases.'}
          </div>

          {/* Misconception Tracking Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 rounded-2xl border border-rose-800/60 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 uppercase tracking-wider">Your Diagnostic Misconception Review</h3>
              {hitMisconceptions.map((idx, i) => {
                const m = misconceptions?.[idx];
                if (!m) return null;
                return (
                  <div key={i} className="p-3 bg-slate-900/90 rounded-xl border border-rose-900/50 space-y-1">
                    <p className="text-xs font-bold text-rose-400">✗ Misconception: {m.misconception}</p>
                    <p className="text-xs text-emerald-300">✓ Scientific Correction: {m.correction}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Spaced Repetition Schedule Banner */}
          <div className="p-4 bg-amber-950/40 rounded-2xl border border-amber-800/50 flex items-center justify-between text-xs">
            <span className="text-slate-300">
              Spaced Repetition Review scheduled in:{' '}
              <strong className="text-amber-300">{errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}</strong>
            </span>
            <span className="text-amber-400 font-mono font-bold">SM-2 Algorithm Active</span>
          </div>

          {/* Real-World Mission Capstone Activity */}
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-gold-300 flex items-center gap-2">
              <span>🚀 Capstone Activity:</span>
              <span>{REAL_WORLD_ACTIVITY.title}</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="space-y-1.5">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-400">
                  <span className="text-gold-400 font-bold">{idx + 1}.</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── SIM-ENGINE CONDITIONAL POPUPS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Module Mastery Achieved!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C12_PhysicsGeneratorSim;