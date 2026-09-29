'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

// ���── ISC CLASS 12 PHYSICS TOPIC NODE IDENTIFIERS ───
const NODE_C12_PHY_011 = 'c12_phy_011'; // Electric flux
const NODE_C12_PHY_012 = 'c12_phy_012'; // Gauss's theorem
const NODE_C12_PHY_013 = 'c12_phy_013'; // Field due to infinite line charge
const NODE_C12_PHY_014 = 'c12_phy_014'; // Field due to infinite plane sheet
const NODE_C12_PHY_015 = 'c12_phy_015'; // Field due to spherical shell
const NODE_C12_PHY_016 = 'c12_phy_016'; // Electric potential and potential difference
const NODE_C12_PHY_017 = 'c12_phy_017'; // Electric potential due to a dipole
const NODE_C12_PHY_018 = 'c12_phy_018'; // Electric potential due to a system of charges
const NODE_C12_PHY_019 = 'c12_phy_019'; // Equipotential surfaces
const NODE_C12_PHY_020 = 'c12_phy_020'; // Electrostatic PE of a point charge (U = qV)

const ALL_PHY_NODE_IDS = [
  NODE_C12_PHY_011,
  NODE_C12_PHY_012,
  NODE_C12_PHY_013,
  NODE_C12_PHY_014,
  NODE_C12_PHY_015,
  NODE_C12_PHY_016,
  NODE_C12_PHY_017,
  NODE_C12_PHY_018,
  NODE_C12_PHY_019,
  NODE_C12_PHY_020,
];

const EPSILON_0 = 8.854187817e-12; // C^2 / (N m^2)
const COULOMB_K = 8.9875517923e9; // N m^2 / C^2 (approx 9e9)

// ──�� NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'High-Voltage Power Grid & Cleanroom Shielding',
  intro: 'You are the lead electrostatics engineer inspecting a 400 kV extra-high-voltage transmission substation near Bengaluru and an adjoining ultra-clean silicon semiconductor fab. High electrostatic fields threaten delicate microchips, while transmission lines create intense cylindrical field distributions.',
  context: 'To protect technicians and sensitive silicon wafers, you must analyze electric flux piercing sensor surfaces, calculate symmetric fields via Gauss theorem (line cables, conducting enclosures, and spherical shielding domes), map equipotential contours, and evaluate electrostatic potential energies.',
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question: 'An uncharged closed metal box is placed in an intense uniform electric field (E = 50 kV/m) from a power line. What is the net electric flux piercing out of the entire closed box?',
  options: [
    'Huge outward flux because field is strong (Phi = 50 k V m)',
    'Exactly zero because every field line entering on one side exits on the other',
    'Depends entirely on the surface area and tilt of the box',
    'Negative flux because metals absorb electric field lines completely',
  ],
  correctIndex: 1,
  hintAfter: 'Field lines stream straight through an empty closed volume with zero net trapped charge. Let us prove how Gauss\'s law accounts for every line!',
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

// ─── 24 COMPREHENSIVE CHALLENGES ───
const CHALLENGES: Challenge[] = [
  // 1. Foundation: Flux definition
  {
    id: 'ch_flux_01',
    nodeId: NODE_C12_PHY_011,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'A flat sensor plate of area A = 0.40 m^2 is placed in a uniform electric field E = 5000 N/C. The area normal makes an angle theta = 60 deg with E. What is the electric flux Phi_E?',
    options: ['2000 N m^2/C', '1000 N m^2/C', '1732 N m^2/C', '0 N m^2/C'],
    correctIndex: 1,
    explanation: 'Electric flux is given by Phi_E = E A cos(theta). Here, Phi_E = (5000 N/C)(0.40 m^2) cos(60 deg) = 2000 * 0.5 = 1000 N m^2/C. The cosine factor accounts for geometric tilting.',
    hints: [
      'Recall the scalar dot product formula: Phi_E = E * A * cos(theta).',
      'The angle theta is 60 degrees. What is cos(60 deg)? It is 0.5.',
      'Multiply: 5000 * 0.40 * 0.5 = 1000 N m^2/C.',
    ],
    misconceptionIndex: 0,
  },
  // 2. Foundation: Drag Label on Gaussian Geometry
  {
    id: 'ch_gauss_label_02',
    nodeId: NODE_C12_PHY_012,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Match the appropriate Gaussian surface to each charge distribution to leverage symmetry for calculating E.',
    dragItems: [
      { label: 'Coaxial Cylinder', targetId: 'target_line' },
      { label: 'Pillbox Cylinder', targetId: 'target_sheet' },
      { label: 'Concentric Sphere', targetId: 'target_shell' },
    ],
    correctMapping: {
      target_line: 'Coaxial Cylinder',
      target_sheet: 'Pillbox Cylinder',
      target_shell: 'Concentric Sphere',
    },
    explanation: 'Symmetry dictate: infinite line charge requires a coaxial cylinder, an infinite plane sheet requires a flat pillbox straddling it, and a spherical shell requires a concentric sphere.',
    hints: [
      'Think about matching the surface geometry to the coordinate symmetry of the source.',
      'Line wires have cylindrical symmetry; flat sheets have planar mirror symmetry.',
      'A spherical shell demands a concentric sphere to keep |E| constant over the surface area.',
    ],
    misconceptionIndex: 1,
  },
  // 3. Foundation: Potential definition
  {
    id: 'ch_pot_03',
    nodeId: NODE_C12_PHY_016,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why is electric potential V a scalar while electric field E is a vector?',
    options: [
      'Potential is defined as work done per unit test charge (W/q_0), and work is a scalar quantity.',
      'Potential has a fixed universal direction towards ground.',
      'Potential vectors cancel out due to inverse-square symmetry.',
      'Field has no direction in vacuum, so only potential is directional.',
    ],
    correctIndex: 0,
    explanation: 'Work is the dot product of force and displacement (a scalar). Since electric potential V = W/q_0, it is purely a scalar with magnitude and algebraic sign, but no vector direction.',
    hints: [
      'How is potential defined physically from mechanics concepts?',
      'Consider the definition V = W/q_0 where W is work done.',
      'Work is a scalar dot product; therefore, work per unit charge must be a scalar.',
    ],
    misconceptionIndex: 2,
  },
  // 4. Foundation: Line charge numeric
  {
    id: 'ch_line_04',
    nodeId: NODE_C12_PHY_013,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'A straight transmission cable carries a linear charge density lambda = 4.0 muC/m. Calculate the magnitude of electric field E (in kV/m) at perpendicular distance r = 0.20 m. (Take 1/(4 pi epsilon_0) = 9.0 x 10^9 N m^2/C^2).',
    correctAnswer: 360,
    tolerance: 5,
    unit: 'kV/m',
    explanation: 'E = lambda / (2 pi epsilon_0 r) = (2 * k * lambda) / r = (2 * 9e9 * 4e-6) / 0.20 = 72000 / 0.20 = 360,000 V/m = 360 kV/m.',
    hints: [
      'Use the formula E = lambda / (2 pi epsilon_0 r), which is equivalent to 2 k lambda / r.',
      'Substitute: 2 * 9.0e9 * 4.0e-6 = 72,000. Now divide by r = 0.20 m.',
      '72000 / 0.20 = 360,000 V/m = 360 kV/m.',
    ],
    misconceptionIndex: 3,
  },
  // 5. Foundation: Shell interior field
  {
    id: 'ch_shell_05',
    nodeId: NODE_C12_PHY_015,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Inside a hollow charged thin spherical metallic dome (r < R), what is the magnitude of the electric field E and electric potential V?',
    options: [
      'E = 0 and V = constant = k q / R',
      'E = k q / r^2 and V = 0',
      'E = k q / R^2 and V = k q / r',
      'E = 0 and V = 0',
    ],
    correctIndex: 0,
    explanation: 'A Gaussian sphere inside (r < R) encloses zero charge (q_enc = 0), making E = 0 everywhere inside. Since E = -dV/dr = 0, the potential is uniform and equal to its surface value V = kq/R.',
    hints: [
      'Apply Gauss law inside the hollow cavity: what charge is enclosed?',
      'Since q_enc = 0 inside, what must E be?',
      'If E = 0 everywhere, does V change with distance? No, it remains constant at kq/R.',
    ],
    misconceptionIndex: 1,
  },
  // 6. Foundation: Equipotential work
  {
    id: 'ch_equip_06',
    nodeId: NODE_C12_PHY_019,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'How much external work is required to move a test charge q = +5 muC across an equipotential surface between two points 0.5 m apart at V = 200 V?',
    options: ['0 Joules', '1.0 x 10^-3 J', '1000 J', '0.5 Joules'],
    correctIndex: 0,
    explanation: 'Work done W = q * Delta V. On an equipotential surface, Delta V = V_final - V_initial = 200V - 200V = 0. Hence W = 0 J regardless of the path distance.',
    hints: [
      'What does the term "equipotential" mean regarding potential difference Delta V?',
      'Delta V between any two points on the same equipotential surface is zero.',
      'Work W = q * Delta V = q * 0 = 0 J.',
    ],
  },
  // 7. Foundation: Drag Sort Gauss Line Charge Derivation
  {
    id: 'ch_sort_line_07',
    nodeId: NODE_C12_PHY_013,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'analysis',
    question: 'Arrange the logical steps in deriving the electric field of an infinite line charge via Gauss theorem.',
    sortItems: [
      'Choose coaxial cylinder of radius r and length l',
      'Recognize flux through circular end caps is zero (E perpendicular to dA)',
      'Calculate curved surface flux Phi_E = E * (2 pi r l)',
      'Equate flux to enclosed charge: E * (2 pi r l) = (lambda * l) / epsilon_0',
      'Cancel cylinder length l to obtain E = lambda / (2 pi epsilon_0 r)',
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'The derivation proceeds from geometric symmetry choice -> cap flux elimination -> curved area integration -> Gauss theorem substitution -> length cancellation.',
    hints: [
      'First step: construct the matching Gaussian cylinder.',
      'Next, eliminate cap flux before computing the curved wall contribution.',
      'Finally, apply Gauss theorem and cancel the arbitrary length l.',
    ],
  },
  // 8. Standard: Infinite plane sheet calculation
  {
    id: 'ch_sheet_08',
    nodeId: NODE_C12_PHY_014,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A large non-conducting substrate inside a fab has uniform surface charge density sigma = +17.708 x 10^-9 C/m^2. Find the electric field E in N/C just above the sheet. (Take epsilon_0 = 8.854 x 10^-12 C^2/N m^2).',
    correctAnswer: 1000,
    tolerance: 10,
    unit: 'N/C',
    explanation: 'For a thin plane sheet of charge, E = sigma / (2 epsilon_0) = (17.708e-9) / (2 * 8.854e-12) = (17.708e-9) / (17.708e-12) = 1000 N/C.',
    hints: [
      'Recall the formula derived via Gaussian pillbox: E = sigma / (2 epsilon_0).',
      'The denominator is 2 * 8.854e-12 = 17.708e-12.',
      'Divide 17.708e-9 by 17.708e-12 = 1000 N/C.',
    ],
  },
  // 9. Standard: Dipole equatorial potential
  {
    id: 'ch_dipole_09',
    nodeId: NODE_C12_PHY_017,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'At any point on the equatorial (broadside-on) plane of an electric dipole of moment p, the net electric potential is:',
    options: [
      'Always exactly zero because distances to +q and -q are equal, causing exact scalar cancellation',
      'Zero only when r >> 2a in the far-field approximation',
      'Equal to kp / r^2',
      'Equal to 2kp / r',
    ],
    correctIndex: 0,
    explanation: 'Every point on the perpendicular bisector plane is equidistant (d) from both charges: V = kq/d + k(-q)/d = 0. This is an exact geometric cancellation for all distances, not an approximation!',
    hints: [
      'Consider the distance from any equatorial point to +q and -q.',
      'Because the plane is the perpendicular bisector, d_+ = d_-.',
      'Since V is a scalar, V = kq/d - kq/d = 0 exactly.',
    ],
    misconceptionIndex: 4,
  },
  // 10. Standard: Construct Gauss theorem formula
  {
    id: 'ch_const_10',
    nodeId: NODE_C12_PHY_012,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Construct the exact mathematical statement of Gauss theorem for a closed surface enclosing net charge q.',
    availableParts: ['oint', 'E · dA', '=', 'q_enc / epsilon_0', 'sigma / epsilon_0', '4 pi k q', 'dV / dr'],
    targetState: 'oint E · dA = q_enc / epsilon_0',
    validationHint: 'Select the closed surface integral, field dot area element, equals sign, and enclosed charge over permittivity.',
    explanation: 'Gauss\'s Law states that the closed surface integral of electric field dot dA equals total enclosed charge divided by permittivity of free space: oint E · dA = q_enc / epsilon_0.',
    hints: [
      'Start with the closed surface integral symbol (oint).',
      'Add the flux integrand: E · dA.',
      'Set it equal to enclosed charge divided by epsilon_0.',
    ],
  },
  // 11. Standard: Equipotential vs Field direction
  {
    id: 'ch_equip_grad_11',
    nodeId: NODE_C12_PHY_019,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Which statement correctly describes the geometric relation between electric field lines and equipotential contours?',
    options: [
      'Field lines always intersect equipotentials at 90 deg, pointing in the direction of steepest potential decrease.',
      'Field lines run parallel along equipotential surfaces to conserve work.',
      'Field lines intersect equipotentials at 45 deg in non-uniform geometries.',
      'Field lines only cut equipotentials at right angles if the field is uniform.',
    ],
    correctIndex: 0,
    explanation: 'Because E = -grad(V) = -dV/dr, electric field vectors point in the direction of maximum potential drop, which is everywhere strictly normal (perpendicular) to surfaces of constant potential.',
    hints: [
      'Recall the relationship E = -dV/dr.',
      'Along an equipotential surface, dV = 0, meaning the tangential component of E must be zero.',
      'Thus, the entire field vector must be perpendicular (90 deg) to the surface.',
    ],
    misconceptionIndex: 2,
  },
  // 12. Standard: Superposition of 3 charges potential
  {
    id: 'ch_super_12',
    nodeId: NODE_C12_PHY_018,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Three charges +2.0 muC, +2.0 muC, and -1.0 muC are at the vertices of an equilateral triangle. Each vertex is r = 0.10 m from the centroid. What is the net potential V (in kV) at the centroid? (k = 9.0 x 10^9 N m^2/C^2).',
    correctAnswer: 270,
    tolerance: 5,
    unit: 'kV',
    explanation: 'By scalar superposition, V = (k / r) * (q1 + q2 + q3) = (9e9 / 0.10) * (2 + 2 - 1) * 10^-6 = 9e10 * 3e-6 = 270,000 V = 270 kV.',
    hints: [
      'Since all charges are at the same distance r = 0.10 m, factor out k/r: V = (k/r) * Sigma(q_i).',
      'Calculate Sigma(q_i) = +2.0 + 2.0 - 1.0 = +3.0 muC = 3.0 x 10^-6 C.',
      'V = (9e9 / 0.10) * 3e-6 = 9e10 * 3e-6 = 270 kV.',
    ],
  },
  // 13. Standard: Electrostatic PE of charge displacement
  {
    id: 'ch_pe_13',
    nodeId: NODE_C12_PHY_020,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'An electron (q = -1.6 x 10^-19 C) moves from terminal A (V_A = 100 V) to terminal B (V_B = 500 V). What is the change in potential energy Delta U and the work done by the electric field?',
    options: [
      'Delta U = -6.4 x 10^-17 J, and Electric Field does +6.4 x 10^-17 J of positive work (accelerates electron)',
      'Delta U = +6.4 x 10^-17 J, and Electric Field does -6.4 x 10^-17 J of negative work',
      'Delta U = -8.0 x 10^-17 J, and Electric Field does zero work',
      'Delta U = 0 J because electrostatic force is conservative',
    ],
    correctIndex: 0,
    explanation: 'Delta U = q * (V_B - V_A) = (-1.6e-19 C)(500 - 100 V) = -6.4e-17 J. W_field = -Delta U = +6.4e-17 J. Negative charges naturally accelerate toward higher potentials, losing PE and gaining KE.',
    hints: [
      'Use Delta U = q * (V_final - V_initial). Note that q is negative for an electron.',
      'Delta U = (-1.6e-19) * (500 - 100) = -6.4e-17 J.',
      'Conservative field work W_field = -Delta U = +6.4e-17 J.',
    ],
    misconceptionIndex: 2,
  },
  // 14. Advanced: Dipole axial potential formula
  {
    id: 'ch_dipole_axial_14',
    nodeId: NODE_C12_PHY_017,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A short molecular dipole has dipole moment p = 2.0 x 10^-29 C m. Calculate the potential V (in microvolts, muV) on the axial line at distance r = 1.0 x 10^-8 m from the dipole center. (k = 9.0 x 10^9).',
    correctAnswer: 1.8,
    tolerance: 0.1,
    unit: 'muV',
    explanation: 'For an axial point (theta = 0 deg), V = k p / r^2 = (9e9 * 2e-29) / (1e-8)^2 = 1.8e-19 / 1e-16 = 1.8e-6 V = 1.8 muV.',
    hints: [
      'Master formula for axial dipole potential: V = k * p / r^2.',
      'Numerator = 9.0e9 * 2.0e-29 = 1.8e-19.',
      'Denominator = (1.0e-8)^2 = 1.0e-16. Dividing gives 1.8 x 10^-6 V = 1.8 muV.',
    ],
  },
  // 15. Advanced: Competency Analysis - Shell Discontinuity
  {
    id: 'ch_shell_comp_15',
    nodeId: NODE_C12_PHY_015,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Which graph correctly describes the behavior of E and V as radial distance r increases from r = 0 to r > R for a uniformly charged spherical shell of radius R?',
    options: [
      'E is 0 for r < R, jumps abruptly to kq/R^2 at r = R, and decays as 1/r^2 for r > R; while V is constant (kq/R) from r = 0 to R, then decays smoothly as 1/r.',
      'Both E and V are 0 everywhere inside, and both jump to peak values at r = R decaying as 1/r^2.',
      'E decays as 1/r inside and 1/r^2 outside, while V increases linearly from 0 to R.',
      'E is constant everywhere, and V shows a step discontinuity at r = R.',
    ],
    correctIndex: 0,
    explanation: 'Electric field exhibits a step discontinuity at the charged boundary (0 inside to sigma/epsilon_0 outside). Potential is continuous everywhere: flat at kq/R inside (since E = -dV/dr = 0) and decaying as kq/r outside.',
    hints: [
      'What is E inside the shell? E = 0.',
      'If E = 0 inside, what is the slope of V (dV/dr)? Slope is zero, meaning V is flat/constant.',
      'Outside (r > R), how do point-charge E and V decay? E ~ 1/r^2 and V ~ 1/r.',
    ],
    misconceptionIndex: 1,
  },
  // 16. Advanced: Competency Evaluation - Two conducting plates vs Non-conducting sheets
  {
    id: 'ch_eval_plates_16',
    nodeId: NODE_C12_PHY_014,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Two large oppositely charged non-conducting sheets each have uniform surface charge density +sigma and -sigma. What is the net field between the sheets and outside the sheets?',
    options: [
      'Between: E = sigma / epsilon_0 (fields add); Outside: E = 0 (fields oppose and cancel)',
      'Between: E = sigma / (2 epsilon_0); Outside: E = sigma / epsilon_0',
      'Between: E = 0; Outside: E = sigma / epsilon_0',
      'Between: E = 2 sigma / epsilon_0; Outside: E = sigma / (2 epsilon_0)',
    ],
    correctIndex: 0,
    explanation: 'Each sheet produces E = sigma / (2 epsilon_0). In the gap between, the positive sheet pushes right and the negative sheet pulls right: E_net = sigma/(2eps) + sigma/(2eps) = sigma/eps. Outside, their vectors oppose and cancel to 0.',
    hints: [
      'Draw the direction of electric field vectors produced by +sigma and -sigma in each of the 3 spatial regions.',
      'Between plates: vector from positive points away, vector toward negative points toward it — both point in the same direction!',
      'Sum two halves: sigma/(2 eps_0) + sigma/(2 eps_0) = sigma / eps_0.',
    ],
  },
  // 17. Advanced: Drag-label Equipotential Topography Map
  {
    id: 'ch_drag_topo_17',
    nodeId: NODE_C12_PHY_019,
    type: 'drag-label',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Drag the correct electrostatic property to each physical feature of an equipotential contour map.',
    dragItems: [
      { label: 'E-field direction (Steepest descent)', targetId: 'target_perp' },
      { label: 'High Field Region (Dense spacing)', targetId: 'target_dense' },
      { label: 'Zero Work Contour (Delta V = 0)', targetId: 'target_surface' },
    ],
    correctMapping: {
      target_perp: 'E-field direction (Steepest descent)',
      target_dense: 'High Field Region (Dense spacing)',
      target_surface: 'Zero Work Contour (Delta V = 0)',
    },
    explanation: 'On contour maps: lines perpendicular to contours show E-field gradient vector; crowded contours indicate strong |dV/dr| (high field strength); paths along a contour have Delta V = 0 requiring zero work.',
    hints: [
      'Think about topographic mountain maps.',
      'Close contour lines mean a steep slope (high field).',
      'Downhill direction is perpendicular to contours (E-field).',
    ],
  },
  // 18. Advanced: Creativity - High-Voltage Spark Discharge Prevention
  {
    id: 'ch_creativity_18',
    nodeId: NODE_C12_PHY_020,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'To prevent dielectric breakdown of air (E_max = 3 x 10^6 V/m) near a 300 kV spherical terminal in a substation, what is the minimum required sphere radius R?',
    options: ['R >= 0.10 m (10 cm)', 'R >= 0.01 m (1 cm)', 'R >= 1.0 m', 'R >= 0.003 m'],
    correctIndex: 0,
    explanation: 'On a sphere, V = k q / R and E = k q / R^2. Thus E = V / R. To keep E <= E_breakdown: R >= V / E_max = (300,000 V) / (3 x 10^6 V/m) = 0.10 m = 10 cm.',
    hints: [
      'Relate surface potential V and surface field E for a sphere: E = V / R.',
      'Rearrange for radius: R = V / E.',
      'Substitute: 300 x 10^3 / (3 x 10^6) = 0.10 m.',
    ],
  },
  // 19. Advanced: Zero Potential Location for 2 Opposite Charges
  {
    id: 'ch_zero_pot_19',
    nodeId: NODE_C12_PHY_018,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Two charges q1 = +6 muC and q2 = -2 muC are located on the x-axis at x = 0 cm and x = 16 cm respectively. At what position x (in cm, between the charges) is the net electric potential V = 0?',
    correctAnswer: 12,
    tolerance: 0.5,
    unit: 'cm',
    explanation: 'Set V = k(+6)/x + k(-2)/(16 - x) = 0 => 6/x = 2/(16 - x) => 6(16 - x) = 2x => 96 - 6x = 2x => 8x = 96 => x = 12 cm.',
    hints: [
      'Let P be at distance x from the origin (between 0 and 16 cm). Distance to q2 is (16 - x).',
      'Set V1 + V2 = 0: k*q1/x + k*q2/(16 - x) = 0.',
      'Solve 6 / x = 2 / (16 - x) => 3(16 - x) = x => 48 = 4x => x = 12 cm.',
    ],
  },
  // 20. Advanced: Non-uniform Flux Concept
  {
    id: 'ch_flux_cube_20',
    nodeId: NODE_C12_PHY_011,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A closed cube of side a is placed in a non-uniform field E = (alpha * x) i. What is the net flux piercing through the cube if its left face is at x = 0 and right face is at x = a?',
    options: [
      'Phi_net = alpha * a^3',
      'Phi_net = 0',
      'Phi_net = 6 * alpha * a^2',
      'Phi_net = alpha * a^2 / epsilon_0',
    ],
    correctIndex: 0,
    explanation: 'At x = 0, E = 0 so flux through left face is 0. Top, bottom, front, and back faces have normals perpendicular to i, so their flux is 0. At x = a, E = alpha * a pointing along the outward normal, through area a^2: Phi = (alpha * a) * a^2 = alpha * a^3.',
    hints: [
      'Evaluate flux through each of the 6 faces individually.',
      'Four faces have normal vectors in y and z directions, perpendicular to E_x (flux = 0).',
      'Left face at x = 0 has E = 0. Right face at x = a has E = alpha * a and area A = a^2.',
    ],
  },
  // 21. Advanced: Potential Energy of a 2-Charge system
  {
    id: 'ch_pe_sys_21',
    nodeId: NODE_C12_PHY_020,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Calculate the electrostatic potential energy U (in milliJoules, mJ) of two point charges q1 = +4.0 muC and q2 = -3.0 muC separated by r = 0.60 m in vacuum. (k = 9.0 x 10^9).',
    correctAnswer: -180,
    tolerance: 5,
    unit: 'mJ',
    explanation: 'U = k * q1 * q2 / r = (9e9 * 4e-6 * -3e-6) / 0.60 = -0.108 / 0.60 = -0.180 J = -180 mJ. The negative sign represents an attractive bound state.',
    hints: [
      'Formula: U = k * q1 * q2 / r.',
      'Numerator = 9e9 * (4e-6) * (-3e-6) = -0.108 J m.',
      'Divide by r = 0.60 m: -0.108 / 0.60 = -0.180 J = -180 mJ.',
    ],
  },
  // 22. Advanced: True / False Evaluation of Equipotential intersection
  {
    id: 'ch_intersect_22',
    nodeId: NODE_C12_PHY_019,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why can two equipotential surfaces NEVER intersect under static conditions?',
    options: [
      'If they intersected, a single physical point would have two distinct potential values, violating the single-valued property of scalar potential.',
      'Field lines would loop back on themselves and create magnetic charges.',
      'Charges on the surfaces would spark across and blow up the system.',
      'They can intersect if the charges are moving at relativistic speeds.',
    ],
    correctIndex: 0,
    explanation: 'Electric potential V(r) is a single-valued scalar function of space. An intersection point would simultaneously have two distinct voltages (e.g., 50 V and 100 V), which is physically impossible and would imply two perpendicular field directions at one point.',
    hints: [
      'What is the fundamental mathematical property of the potential function V(x,y,z)?',
      'Can a single spatial point have two temperatures or two voltages simultaneously?',
      'No. A point can only have one unique scalar value; thus contours cannot cross.',
    ],
  },
  // 23. Advanced: Torque & Potential Energy of Dipole in Uniform Field
  {
    id: 'ch_dipole_u_23',
    nodeId: NODE_C12_PHY_020,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'An electric dipole of moment p is placed in a uniform electric field E. In which orientation is the dipole in STABLE equilibrium, and what is its potential energy U?',
    options: [
      'Dipole aligned with E (theta = 0 deg), and U = -pE (minimum potential energy)',
      'Dipole anti-aligned with E (theta = 180 deg), and U = +pE (maximum potential energy)',
      'Dipole perpendicular to E (theta = 90 deg), and U = 0',
      'Dipole aligned with E (theta = 0 deg), and U = +pE',
    ],
    correctIndex: 0,
    explanation: 'The potential energy of a dipole in an external field is U = -p · E = -pE cos(theta). When theta = 0 deg, U = -pE (minimum), and restoring torque brings it back if disturbed. At theta = 180 deg, U = +pE is unstable equilibrium.',
    hints: [
      'Potential energy formula: U = -p · E = -pE cos(theta).',
      'Stable equilibrium occurs at the absolute minimum of potential energy.',
      'When theta = 0 deg, cos(0) = 1, so U = -pE, which is the lowest possible energy.',
    ],
  },
  // 24. Advanced: Conducting Shell with Concentric Point Charge
  {
    id: 'ch_shell_point_24',
    nodeId: NODE_C12_PHY_015,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A point charge +Q is placed at the center of an uncharged thick conducting spherical shell (inner radius a, outer radius b). What are the induced charges on the inner and outer surfaces?',
    options: [
      'Inner surface: -Q; Outer surface: +Q',
      'Inner surface: +Q; Outer surface: -Q',
      'Inner surface: 0; Outer surface: +Q',
      'Inner surface: -Q/2; Outer surface: +Q/2',
    ],
    correctIndex: 0,
    explanation: 'Inside the conducting material (a < r < b), E must be zero. By Gauss\'s Law, a Gaussian sphere of radius a < r < b must enclose zero net charge. Therefore, an induced charge of -Q gathers on the inner surface. By conservation of charge, +Q is pushed to the outer surface.',
    hints: [
      'What must the electric field E be inside the bulk of a conductor in static equilibrium?',
      'Since E = 0 inside the conductor, the net charge enclosed by a surface inside the metal must be zero.',
      'To cancel +Q at the center, the inner cavity wall must hold -Q, leaving +Q on the outside.',
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

const DEFAULT_PROPS: Props = {
  nodeId: NODE_C12_PHY_011,
  title: 'Electric Flux, Gauss Law & Electrostatic Potential',
  definition: 'Electric flux is the measure of electric field lines piercing an area (Phi = E · A). Gauss theorem relates net flux through any closed surface to enclosed charge (Phi = q_enc / eps_0). Electrostatic potential V is the work done per unit positive charge from infinity (V = kq/r), linked to field by E = -dV/dr.',
  eli5: 'Think of electric field lines as streaming rain. Electric flux measures how many raindrops pass through your open umbrella. Tilt the umbrella edge-on and flux is zero; face it square to the rain and flux is maximum. Gauss theorem says if you trap a sprinkler inside a sealed balloon, the total water spraying out equals what the sprinkler pumps inside!',
  misconceptions: [
    {
      misconception: 'Electric flux and electric field are the same thing.',
      correction: 'Electric field E is a vector (N/C or V/m) at a point in space; electric flux Phi_E is a scalar (N m^2/C or V m) representing the net field lines crossing a whole surface.',
    },
    {
      misconception: 'The electric field must be uniform over a Gaussian surface for Gauss theorem to hold.',
      correction: 'Gauss theorem is universally valid for ANY closed surface of any shape. Symmetrical surfaces where E is constant are just a clever calculational convenience so we can pull E out of the integral.',
    },
    {
      misconception: 'Electric potential has a spatial direction like electric field.',
      correction: 'Potential is defined as work per unit charge (V = W/q_0). Since work is a scalar dot product, potential is purely a scalar quantity with magnitude and sign, but NO directional arrow.',
    },
    {
      misconception: 'The electric field of an infinite line charge falls off as 1/r^2 like a point charge.',
      correction: 'Point charges spread over 3D spheres (area 4 pi r^2, decaying as 1/r^2). Line charges spread over 2D cylinder walls (area 2 pi r l), so the field decays as 1/r.',
    },
    {
      misconception: 'Equatorial potential of a dipole is zero only in the far-field approximation.',
      correction: 'Equatorial potential of a dipole is EXACTLY zero everywhere on the perpendicular bisector plane for ANY dipole separation, because every point is equidistant from +q and -q.',
    },
  ],
  diagnosticQuestions: [
    { question: 'What is the SI unit of electric flux Phi_E?', options: ['N/C', 'V m or N m^2/C', 'Joules', 'C/m^2'], correctIndex: 1 },
    { question: 'If a closed Gaussian surface encloses net charge q = 0, what is the net electric flux?', options: ['Zero', 'Infinity', 'Depends on surface radius', 'kq/r^2'], correctIndex: 0 },
    { question: 'How does the electric field of an infinite charged plane sheet vary with distance r?', options: ['Falls as 1/r^2', 'Falls as 1/r', 'Independent of distance (constant)', 'Grows as r'], correctIndex: 2 },
    { question: 'What is the value of electric field E inside a hollow charged spherical shell?', options: ['kq/R^2', 'Zero everywhere inside', 'Infinite at the center', 'sigma / epsilon_0'], correctIndex: 1 },
    { question: 'What is the angle between an electric field line and an equipotential surface?', options: ['0 degrees (parallel)', '45 degrees', '90 degrees (perpendicular)', '180 degrees'], correctIndex: 2 },
    { question: 'What is the potential V at distance r from a short dipole on its axial line?', options: ['kp/r', 'kp/r^2', '2kp/r^3', 'Zero'], correctIndex: 1 },
    { question: 'What is the potential energy change Delta U when charge q moves across potential diff Delta V?', options: ['q * Delta V', 'q / Delta V', '0.5 * q * (Delta V)^2', 'Delta V / q'], correctIndex: 0 },
    { question: 'Can two different equipotential surfaces intersect?', options: ['Yes, at high voltages', 'Yes, near negative charges', 'No, never', 'Only inside dielectrics'], correctIndex: 2 },
  ],
  masteryCriteria: 'Master the derivation and application of Gauss Theorem across line, sheet, and spherical geometries, understand scalar potential superposition, equipotential geometry, and electrostatic PE.',
};

// ─── INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Electric Flux & Geometric Tilt',
    instruction: 'Drag the tilt angle slider and observe how the electric flux Phi_E = E A cos(theta) changes in real time from maximum to zero.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_PHY_011,
  },
  {
    title: 'Lab 2: Gauss Law Balloon & Enclosed Charge',
    instruction: 'Add or remove positive and negative charges inside and outside the Gaussian bubble. Notice how external charges produce zero net flux!',
    interactionType: 'click-parts',
    nodeId: NODE_C12_PHY_012,
  },
  {
    title: 'Lab 3: Geometry Comparison - Line vs Sheet vs Shell',
    instruction: 'Switch between 1D Wire (1/r), 2D Plane Sheet (constant), and 3D Shell (0 inside, 1/r^2 outside) and inspect the live E vs r graphs.',
    interactionType: 'drag-classify',
    nodeId: NODE_C12_PHY_013,
  },
  {
    title: 'Lab 4: Equipotential Contours & Dipole Landscape',
    instruction: 'Move a test charge across the electric dipole potential field. Watch the voltmeter and notice how moving along equipotentials takes zero work!',
    interactionType: 'drag-position',
    nodeId: NODE_C12_PHY_019,
  },
  {
    title: 'Lab 5: Electrostatic Energy Well & Potential Gradient',
    instruction: 'Adjust the terminal voltage and charge polarity to observe potential energy U = qV and particle kinetic acceleration.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_PHY_020,
  },
  {
    title: 'Lab 6: Parallel Plate Capacitor & Dielectric Boundary',
    instruction: 'Explore the uniform electric field between oppositely charged plates. See how field lines terminate on surface charges!',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_PHY_014,
  },
];

// ─── PREDICT-THEN-CHECK QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you tilt a flat sensor plate from theta = 0 deg (head-on) to theta = 60 deg in a uniform electric field, the flux through it will:',
    options: ['Double', 'Remain unchanged', 'Drop to exactly half (50%)', 'Drop to zero'],
    correctIndex: 2,
    verifyInstruction: 'Adjust the tilt slider in Lab 1 to 60 deg and observe the real-time flux calculation: cos(60 deg) = 0.50!',
    nodeId: NODE_C12_PHY_011,
  },
  {
    question: 'Predict: If you double your distance from an infinite charged transmission wire (r -> 2r), how does the electric field change?',
    options: ['Halves (E -> E/2)', 'Drops to one-fourth (E -> E/4)', 'Remains unchanged', 'Doubles'],
    correctIndex: 0,
    verifyInstruction: 'Inspect the 1D Line Charge graph in Lab 3: E is proportional to 1/r (cylindrical spreading), so doubling r cuts E by half!',
    nodeId: NODE_C12_PHY_013,
  },
  {
    question: 'Predict: If a Gaussian spherical shell of radius R enclosing charge Q is expanded to radius 2R, the net outward electric flux will:',
    options: ['Remain exactly the same (Phi = Q / epsilon_0)', 'Decrease to one-fourth (1/4)', 'Decrease to one-half (1/2)', 'Double (2x)'],
    correctIndex: 0,
    verifyInstruction: 'Gauss\'s Law depends ONLY on enclosed charge q_enc, completely independent of the size or shape of the enclosing surface!',
    nodeId: NODE_C12_PHY_012,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'Look at the Gaussian surface simulation in Lab 2. What happens to the net flux when you move a +5 muC charge from outside the boundary to INSIDE the boundary?',
    observableOptions: [
      'Net outward flux instantly jumps from 0 to +q/epsilon_0',
      'Net flux stays zero because closed surfaces always cancel flux',
      'Net flux becomes negative',
      'The field lines disappear',
    ],
    correctIndex: 0,
    nodeId: NODE_C12_PHY_012,
  },
  {
    question: 'In the Dipole Equipotential Lab 4, what is the electric potential everywhere along the vertical centerline (equatorial axis)?',
    observableOptions: [
      'Exactly 0 Volts everywhere along the entire line',
      'Maximum positive voltage',
      'Maximum negative voltage',
      'It fluctuates randomly',
    ],
    correctIndex: 0,
    nodeId: NODE_C12_PHY_017,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Substation Faraday Shield Design Audit',
  description: 'Apply Gauss theorem to audit a 400 kV substation control room: (1) Calculate the minimum shell thickness to prevent corona discharge, (2) Model the line charge field at ground level where technicians walk, and (3) Verify electrostatic shielding inside the metallic enclosure.',
  steps: [
    'Model the 400 kV transmission cable as an infinite line charge (lambda = 8.85 muC/m) at height h = 12 m',
    'Calculate ground-level field E = lambda / (2 pi eps_0 h) and compare with the human exposure limit of 10 kV/m',
    'Verify that inside the metal control cab (hollow conductor), E_inside = 0 N/C regardless of external 400 kV lines',
    'Formulate equipotential ground mesh layout to ensure step potential Delta V < 50 V for technician safety',
  ],
};

// ─── MAIN COMPONENT ───
function C12_PhysicsElectricFluxSim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['physics'] || { name: 'Physics', emoji: '⚡', color: 'indigo' };

  // Phase flow: discovery -> explore -> sandbox -> challenge -> complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Brilliant.org pattern states
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Simulation interactive variables
  const [tiltAngle, setTiltAngle] = useState(0); // 0 to 90 degrees
  const [fieldStrengthE, setFieldStrengthE] = useState(1000); // N/C
  const [sensorAreaA, setSensorAreaA] = useState(0.5); // m^2
  const [enclosedChargeQ, setEnclosedChargeQ] = useState(4); // microCoulombs
  const [externalChargeQ, setExternalChargeQ] = useState(10); // microCoulombs
  const [activeGeometry, setActiveGeometry] = useState<'line' | 'sheet' | 'shell'>('line');
  const [lineDensityLambda, setLineDensityLambda] = useState(5.0); // muC/m
  const [sheetDensitySigma, setSheetDensitySigma] = useState(8.85); // nC/m^2
  const [shellChargeQ, setShellChargeQ] = useState(2.0); // muC
  const [shellRadiusR, setShellRadiusR] = useState(0.25); // m
  const [probePos, setProbePos] = useState({ x: 200, y: 150 });
  const [plateVoltage, setPlateVoltage] = useState(500); // Volts for parallel plate lab
  const [plateDistance, setPlateDistance] = useState(0.05); // meters

  // Reflection responses
  const [reflectionAnswers, setReflectionAnswers] = useState<Record<string, string>>({
    q1: '',
    q2: '',
    q3: '',
  });

  // Scoring & Adaptive Difficulty
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Hints & Visual feedback
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Drag & Sort & Input Challenge states
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Discovery state
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Feedback components
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // Persistence Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Filter challenges by adaptive difficulty
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const currentChallengeData = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // Motivational Feedback Message based on error count
  const motivationalMessage = useMemo(() => {
    if (errors === 0) return { title: 'PERFECT SCORE!', color: 'text-emerald-400', desc: 'Flawless mastery! You demonstrated complete conceptual and mathematical precision across all electrostatics domains.' };
    if (errors <= 3) return { title: 'Great work!', color: 'text-gold-400', desc: 'High competence achieved! Just a minor slip or two — you have an exceptionally strong foundation in Gauss Theorem.' };
    if (errors <= 7) return { title: 'Good effort!', color: 'text-amber-400', desc: 'Solid conceptual understanding! Review the highlighted misconceptions to cement 100% board-level precision.' };
    return { title: 'Do not give up — You WILL get this!', color: 'text-rose-400', desc: 'Physics takes practice and active exploration. Re-run the interactive labs to visualize the field vectors!' };
  }, [errors]);

  // Load existing mastery on mount
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // Adapt difficulty via BKT
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDiff = mastery === 'not-started' || mastery === 'beginner' ? 'foundation' : mastery === 'developing' ? 'standard' : 'advanced';
    setDifficulty(prev => {
      if (prev !== newDiff) {
        setCurrentChallenge(0);
        return newDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // Real-time calculations
  const calculatedFlux = useMemo(() => {
    const rad = (tiltAngle * Math.PI) / 180;
    return fieldStrengthE * sensorAreaA * Math.cos(rad);
  }, [fieldStrengthE, sensorAreaA, tiltAngle]);

  const calculatedGaussFlux = useMemo(() => {
    return (enclosedChargeQ * 1e-6) / EPSILON_0; // N m^2/C
  }, [enclosedChargeQ]);

  // Geometry specific field calculations for chart
  const geometryChartData = useMemo(() => {
    const data = [];
    for (let r_cm = 1; r_cm <= 50; r_cm += 2) {
      const r_m = r_cm / 100;
      let e_val = 0;
      let v_val = 0;
      if (activeGeometry === 'line') {
        // E = lambda / (2 pi eps0 r)
        e_val = (2 * COULOMB_K * (lineDensityLambda * 1e-6)) / r_m;
        v_val = 2 * COULOMB_K * (lineDensityLambda * 1e-6) * Math.log(0.5 / r_m); // relative to 0.5m
      } else if (activeGeometry === 'sheet') {
        // E = sigma / (2 eps0)
        e_val = (sheetDensitySigma * 1e-9) / (2 * EPSILON_0);
        v_val = -e_val * r_m + 500;
      } else {
        // Spherical shell
        if (r_m < shellRadiusR) {
          e_val = 0;
          v_val = (COULOMB_K * (shellChargeQ * 1e-6)) / shellRadiusR;
        } else {
          e_val = (COULOMB_K * (shellChargeQ * 1e-6)) / (r_m * r_m);
          v_val = (COULOMB_K * (shellChargeQ * 1e-6)) / r_m;
        }
      }
      data.push({
        r_cm,
        E_field: Math.round(e_val / 1000), // in kV/m
        V_pot: Math.round(v_val / 1000), // in kV
      });
    }
    return data;
  }, [activeGeometry, lineDensityLambda, sheetDensitySigma, shellChargeQ, shellRadiusR]);

  // 2D Canvas Animation for Electric Field Lines streaming
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particleOffset = 0;
    const render = () => {
      particleOffset = (particleOffset + 1.2) % 40;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw streaming field lines
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([8, 8]);
      ctx.lineDashOffset = -particleOffset;

      for (let y = 30; y < canvas.height; y += 35) {
        ctx.beginPath();
        ctx.moveTo(10, y);
        ctx.lineTo(canvas.width - 10, y);
        ctx.stroke();

        // Arrow heads
        ctx.fillStyle = '#38bdf8';
        ctx.beginPath();
        ctx.moveTo(canvas.width - 15, y - 4);
        ctx.lineTo(canvas.width - 5, y);
        ctx.lineTo(canvas.width - 15, y + 4);
        ctx.fill();
      }

      ctx.setLineDash([]);
      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // ─── USECALLBACK HANDLERS ───
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && currentChallengeData.hints[nextLevel - 1]) {
      setCurrentHint(currentChallengeData.hints[nextLevel - 1]);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(currentChallengeData.hints[nextLevel - 1]);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
    }
  }, [hintCount, currentChallengeData]);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

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
    speechManager.speak('Welcome to the interactive Gauss Law and Potential laboratories. Let us explore!');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free play mode unlocked! Manipulate variables and inspect field lines without grading.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    setCurrentChallenge(0);
    setHintCount(0);
    setAnswerRevealed(false);
    setShowExplanation(false);
    audioManager.play('whoosh');
    speechManager.speak('Challenge mode activated. Put your electrostatics mastery to the test!');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now slide the control to verify your hypothesis.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Great scientific observation!' : 'Look closer at the field lines traversing the boundary.');
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_PHY_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Outstanding! You have completed the Electrostatics simulation with flying colors.');
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

  const handleAnswer = useCallback((answer: number | Record<string, string> | number[] | string) => {
    let isCorrect = false;
    const chal = currentChallengeData;

    if (chal.type === 'classify' || chal.type === 'distinguish' || chal.type === 'match') {
      isCorrect = answer === chal.correctIndex;
    } else if (chal.type === 'drag-label') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(chal.correctMapping);
    } else if (chal.type === 'drag-sort') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(chal.correctOrder);
    } else if (chal.type === 'numeric') {
      const numAnswer = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
      isCorrect = Math.abs(numAnswer - (chal.correctAnswer || 0)) <= (chal.tolerance || 0.1);
    } else if (chal.type === 'construct') {
      isCorrect = (answer as string).trim() === chal.targetState;
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Brilliant understanding.');
      setShowConfetti(true);
      setShowExplanation(true);

      bktStateRef.current = bktUpdate(bktStateRef.current, true);
      const srsItem = createReviewItem(chal.nodeId, chal.question);
      const updatedSrs = sm2Update(srsItem, 5, 3500);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('srs_' + chal.nodeId, JSON.stringify(updatedSrs));
        localStorage.setItem('mastery_' + chal.nodeId, JSON.stringify(bktStateRef.current));
      }
    } else {
      audioManager.play('drop-wrong');
      audioManager.play('error');
      setErrors(e => e + 1);
      setWrongShake(true);
      setWrongFlash(true);
      setTimeout(() => setWrongShake(false), 500);
      setTimeout(() => setWrongFlash(false), 800);

      if (chal.misconceptionIndex !== undefined && !hitMisconceptions.includes(chal.misconceptionIndex)) {
        setHitMisconceptions(prev => [...prev, chal.misconceptionIndex!]);
      }

      if (hintCount < 3) {
        showNextHint();
      } else {
        setAnswerRevealed(true);
        setShowExplanation(true);
        speechManager.speak('Let us review the step-by-step physical explanation together.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);
        const srsItem = createReviewItem(chal.nodeId, chal.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + chal.nodeId, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [currentChallengeData, hintCount, hitMisconceptions, showNextHint, resetInactivityTimer]);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    const isCorrect = currentChallengeData.correctMapping?.[targetId] === draggedItem;
    if (isCorrect) {
      setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
      audioManager.play('drop-correct');
    } else {
      audioManager.play('drop-wrong');
    }
    setDraggedItem(null);
  }, [draggedItem, currentChallengeData]);

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      if (prev.length === 0 && currentChallengeData.sortItems) {
        prev = currentChallengeData.sortItems.map((_, i) => i);
      }
      const arr = [...prev];
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [currentChallengeData]);

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : (currentChallengeData.sortItems?.map((_, i) => i) || []);
    handleAnswer(answer);
  }, [sortArrangement, currentChallengeData, handleAnswer]);

  const handleTiltSliderChange = useCallback((angle: number) => {
    setTiltAngle(angle);
    audioManager.play('count');
  }, []);

  const handleFieldStrengthChange = useCallback((e_val: number) => {
    setFieldStrengthE(e_val);
    audioManager.play('count');
  }, []);

  const handleEnclosedChargeChange = useCallback((q: number) => {
    setEnclosedChargeQ(q);
    audioManager.play('pop');
  }, []);

  const handleGeometrySwitch = useCallback((geom: 'line' | 'sheet' | 'shell') => {
    setActiveGeometry(geom);
    audioManager.play('tap');
  }, []);

  // Cleanup timers
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* Header Bar */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap items-center justify-between pb-4 mb-6 border-b border-slate-800 gap-3">
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-gold-950/80 rounded-2xl border border-gold-700/50 shadow-inner">{subjectConfig.emoji}</span>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-gold-400">ISC Class 12 • Electrostatics</span>
            <h1 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">{title}</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <motion.span key={difficulty} initial={{ scale: 0.8 }} animate={{ scale: 1 }} className={`px-3 py-1 text-xs font-black uppercase rounded-full border ${difficulty === 'foundation' ? 'bg-emerald-950/80 text-emerald-300 border-emerald-600' : difficulty === 'advanced' ? 'bg-rose-950/80 text-rose-300 border-rose-600' : 'bg-amber-950/80 text-amber-300 border-amber-600'}`}>
            {difficulty}
          </motion.span>
          <span className="px-3 py-1 bg-slate-800/80 text-slate-300 text-xs font-semibold rounded-full border border-slate-700">
            Mastery: {masteryLevel}
          </span>
        </div>
      </motion.div>

      {/* ─── 1. DISCOVERY PHASE ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
          <div className="p-5 bg-gradient-to-r from-gold-950/70 via-slate-900 to-gold-950/40 rounded-2xl border border-gold-800/60 shadow-lg">
            <h2 className="text-lg font-bold text-gold-300 flex items-center gap-2">
              <span>⚡</span> {SCENARIO.title}
            </h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-gold-200/70 mt-3 pt-2 border-t border-gold-900/50">{SCENARIO.context}</p>
          </div>

          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 bg-amber-500/20 text-amber-300 text-xs font-bold rounded-lg border border-amber-500/30">Curiosity Hook</span>
              <h3 className="text-base font-semibold text-white">{DISCOVERY_QUESTION.question}</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  aria-label={`Option ${i + 1}: ${opt}`}
                  className={`p-4 text-left text-sm rounded-xl border transition-all ${discoveryAnswered ? i === DISCOVERY_QUESTION.correctIndex ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-semibold' : 'bg-slate-900/40 border-slate-800 text-slate-500' : 'bg-slate-800/80 hover:bg-slate-700/80 border-slate-700 text-slate-200'}`}
                >
                  <div className="flex items-start gap-2">
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-700/50 text-slate-300">{String.fromCharCode(65 + i)}</span>
                    <span>{opt}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-gold-950/50 rounded-xl border border-gold-800 space-y-3">
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-300 font-medium' : 'text-amber-300'}`}>
                  {discoveryCorrect ? '✓ Spot on! Zero net charge enclosed means net flux is strictly zero.' : DISCOVERY_QUESTION.hintAfter}
                </p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-gold-600/30 flex items-center gap-2"
                >
                  <span>Enter Interactive Labs</span>
                  <span>→</span>
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 2. EXPLORATION PHASE (Interactive Labs) ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
          {/* Top Step Navigation */}
          <div className="flex items-center justify-between p-3 bg-slate-900 rounded-xl border border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400">Step {currentSlide + 1} of {EXPLORATION_STEPS.length}:</span>
              <span className="text-sm font-bold text-gold-300">{EXPLORATION_STEPS[currentSlide].title}</span>
            </div>
            <div className="flex gap-1">
              {EXPLORATION_STEPS.map((_, idx) => (
                <div key={idx} className={`h-1.5 w-6 rounded-full transition-all ${idx === currentSlide ? 'bg-gold-500 w-8' : idx < currentSlide ? 'bg-gold-800' : 'bg-slate-800'}`} />
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4"
            >
              <div className="p-3 bg-gold-950/40 border border-gold-900/60 rounded-xl">
                <p className="text-xs text-amber-300 font-medium">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>
              </div>

              {/* ── LAB 1: FLUX & TILT ── */}
              {currentSlide === 0 && (
                <div className="space-y-4">
                  {/* Embedded Prediction Hook */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <span className="text-xs font-bold text-amber-400">🤔 {PREDICTION_QUESTIONS[0].question}</span>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-1">
                      {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                        <button
                          key={i}
                          onClick={() => handlePrediction(i)}
                          className={`p-2 text-xs rounded-lg border text-left transition-all ${predictionIndex === i ? 'bg-gold-600 border-gold-400 text-white font-bold' : 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800'}`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                    {predictionMade && (
                      <p className="text-xs text-emerald-300 mt-1">✓ Prediction noted! Now drag the tilt slider below to verify.</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                    <div className="lg:col-span-7 bg-slate-950 p-4 rounded-xl border border-slate-800 relative flex flex-col items-center justify-center min-h-[300px]">
                      <canvas ref={canvasRef} width={450} height={260} className="w-full max-w-[450px] h-[240px] rounded-lg" />
                      {/* Interactive Flat Plate SVG rendered on top */}
                      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                        <svg viewBox="0 0 450 260" className="w-full max-w-[450px] h-[240px]">
                          {/* Center Rotating Plate */}
                          <g transform={`translate(225, 130) rotate(${tiltAngle})`}>
                            {/* Sensor Plate */}
                            <rect x="-8" y="-70" width="16" height="140" rx="4" fill="#6366f1" stroke="#a5b4fc" strokeWidth="2" fillOpacity="0.85" />
                            {/* Normal Vector */}
                            <line x1="0" y1="0" x2="60" y2="0" stroke="#f59e0b" strokeWidth="3" strokeDasharray="4 2" />
                            <polygon points="65,0 55,-5 55,5" fill="#f59e0b" />
                            <text x="70" y="4" fill="#fbbf24" fontSize="12" fontWeight="bold">Area Vector A</text>
                          </g>
                          {/* Angle Arc */}
                          <text x="250" y="110" fill="#38bdf8" fontSize="11" fontWeight="bold">theta = {tiltAngle} deg</text>
                        </svg>
                      </div>
                    </div>

                    <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
                      <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Controls</h4>
                        <div>
                          <div className="flex justify-between text-xs text-slate-300 mb-1">
                            <span>Plate Tilt (theta):</span>
                            <span className="font-mono text-gold-400 font-bold">{tiltAngle} deg</span>
                          </div>
                          <input
                            type="range"
                            min={0}
                            max={90}
                            value={tiltAngle}
                            onChange={(e) => handleTiltSliderChange(Number(e.target.value))}
                            aria-label="Adjust plate tilt angle"
                            className="w-full accent-gold-500 cursor-pointer"
                          />
                        </div>
                        <div>
                          <div className="flex justify-between text-xs text-slate-300 mb-1">
                            <span>Electric Field E:</span>
                            <span className="font-mono text-gold-400 font-bold">{fieldStrengthE} N/C</span>
                          </div>
                          <input
                            type="range"
                            min={200}
                            max={3000}
                            step={100}
                            value={fieldStrengthE}
                            onChange={(e) => handleFieldStrengthChange(Number(e.target.value))}
                            aria-label="Adjust field strength"
                            className="w-full accent-gold-500 cursor-pointer"
                          />
                        </div>
                      </div>

                      {/* Live Metric HUD */}
                      <div className="p-4 bg-gold-950/60 rounded-xl border border-gold-700/60 space-y-2">
                        <div className="flex justify-between items-baseline">
                          <span className="text-xs text-gold-200">Electric Flux (Phi_E):</span>
                          <span className="text-lg font-mono font-black text-amber-300">{calculatedFlux.toFixed(1)} N m^2/C</span>
                        </div>
                        <div className="text-[11px] font-mono text-slate-300">
                          Formula: ({fieldStrengthE} N/C) x (0.5 m^2) x cos({tiltAngle} deg) = {calculatedFlux.toFixed(1)}
                        </div>
                        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-gold-500 to-amber-400"
                            animate={{ width: `${(calculatedFlux / (3000 * 0.5)) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── LAB 2: GAUSS BUBBLE & ENCLOSED CHARGE ── */}
              {currentSlide === 1 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                  <div className="lg:col-span-7 bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-center">
                    <svg viewBox="0 0 400 260" className="w-full max-w-[420px] h-[240px]">
                      {/* Gaussian Bubble Surface */}
                      <path
                        d="M 120 70 C 180 40, 260 50, 290 100 C 320 150, 280 220, 200 230 C 120 240, 70 190, 80 130 C 90 90, 90 80, 120 70 Z"
                        fill="#4338ca"
                        fillOpacity="0.25"
                        stroke="#818cf8"
                        strokeWidth="2.5"
                        strokeDasharray="6 4"
                      />
                      <text x="200" y="40" fill="#a5b4fc" fontSize="11" fontWeight="bold" textAnchor="middle">Gaussian Surface S</text>

                      {/* Inside Charge */}
                      <circle cx="190" cy="145" r="22" fill={enclosedChargeQ >= 0 ? '#ef4444' : '#3b82f6'} />
                      <text x="190" y="150" fill="white" fontSize="12" fontWeight="bold" textAnchor="middle">
                        {enclosedChargeQ > 0 ? `+${enclosedChargeQ}` : enclosedChargeQ} muC
                      </text>
                      <text x="190" y="180" fill="#fca5a5" fontSize="10" textAnchor="middle">q_enclosed</text>

                      {/* Outside Charge */}
                      <circle cx="340" cy="65" r="18" fill="#f59e0b" />
                      <text x="340" y="69" fill="white" fontSize="10" fontWeight="bold" textAnchor="middle">+{externalChargeQ} muC</text>
                      <text x="340" y="95" fill="#fcd34d" fontSize="9" textAnchor="middle">External (Flux=0)</text>

                      {/* Piercing field lines from outside charge */}
                      <line x1="322" y1="75" x2="250" y2="120" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="3 3" />
                      <line x1="250" y1="120" x2="160" y2="175" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="3 3" />
                    </svg>
                  </div>

                  <div className="lg:col-span-5 space-y-3">
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                      <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Enclosed Charge Modifier</h4>
                      <div className="flex gap-2">
                        {[-6, -2, 0, 4, 8].map((q) => (
                          <motion.button
                            key={q}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleEnclosedChargeChange(q)}
                            className={`flex-1 py-1.5 text-xs font-bold rounded-lg border ${enclosedChargeQ === q ? 'bg-gold-600 border-gold-400 text-white' : 'bg-slate-800 border-slate-700 text-slate-300'}`}
                          >
                            {q > 0 ? `+${q}` : q} muC
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 bg-gold-950/60 rounded-xl border border-gold-700/60 space-y-2">
                      <div className="flex justify-between items-baseline">
                        <span className="text-xs text-gold-200">Net Gauss Flux Phi = q_enc / eps_0:</span>
                        <span className="text-base font-mono font-black text-emerald-300">{(calculatedGaussFlux / 1000).toFixed(1)} k V·m</span>
                      </div>
                      <p className="text-[11px] text-slate-300">
                        {enclosedChargeQ > 0 ? 'Outward pointing flux (lines diverge from positive source).' : enclosedChargeQ < 0 ? 'Inward pointing flux (lines converge into negative sink).' : 'Zero net flux (vacuum or external dipole).'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* ── LAB 3: GEOMETRY COMPARISON - LINE VS SHEET VS SHELL ── */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleGeometrySwitch('line')}
                      className={`px-4 py-2 text-xs font-bold rounded-xl border ${activeGeometry === 'line' ? 'bg-gold-600 border-gold-400 text-white' : 'bg-slate-800 border-slate-700 text-slate-300'}`}
                    >
                      1D Infinite Line (E ~ 1/r)
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleGeometrySwitch('sheet')}
                      className={`px-4 py-2 text-xs font-bold rounded-xl border ${activeGeometry === 'sheet' ? 'bg-purple-600 border-purple-400 text-white' : 'bg-slate-800 border-slate-700 text-slate-300'}`}
                    >
                      2D Plane Sheet (E = constant)
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleGeometrySwitch('shell')}
                      className={`px-4 py-2 text-xs font-bold rounded-xl border ${activeGeometry === 'shell' ? 'bg-amber-600 border-amber-400 text-white' : 'bg-slate-800 border-slate-700 text-slate-300'}`}
                    >
                      3D Spherical Shell (0 inside, 1/r^2 outside)
                    </motion.button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                    <div className="lg:col-span-8 bg-slate-950 p-3 rounded-xl border border-slate-800">
                      <div className="text-xs font-semibold text-slate-400 mb-2 flex justify-between">
                        <span>Electric Field E (kV/m) vs Radial Distance r (cm)</span>
                        <span className="text-gold-400 font-mono font-bold">
                          {activeGeometry === 'line' ? 'E = lambda / (2 pi eps0 r)' : activeGeometry === 'sheet' ? 'E = sigma / (2 eps0)' : 'E = kq / r^2 (r >= R)'}
                        </span>
                      </div>
                      <div className="h-[220px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={geometryChartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                            <XAxis dataKey="r_cm" stroke="#94a3b8" unit="cm" />
                            <YAxis stroke="#94a3b8" unit="kV/m" />
                            <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
                            <Legend />
                            <Line type="monotone" dataKey="E_field" name="E-Field (kV/m)" stroke="#38bdf8" strokeWidth={3} dot={false} />
                            <Line type="monotone" dataKey="V_pot" name="Potential V (kV)" stroke="#fbbf24" strokeWidth={2} strokeDasharray="4 4" dot={false} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    <div className="lg:col-span-4 p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3 flex flex-col justify-center">
                      <h4 className="text-xs font-bold text-slate-300 uppercase">Physical Insight</h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {activeGeometry === 'line' && 'Cylindrical spreading: Flux expands across cylinder wall 2 pi r l (area scales linearly with r), causing 1/r decay.'}
                        {activeGeometry === 'sheet' && 'Planar symmetry: Field lines are strictly parallel without angular divergence; field strength never weakens with distance.'}
                        {activeGeometry === 'shell' && 'Spherical symmetry: Cavity inside encloses zero charge (E = 0, V = constant). Outside, charge acts as a point source at center (1/r^2).'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* ── LAB 4 & 5: DIPOLES & POTENTIAL WELL ── */}
              {(currentSlide === 3 || currentSlide === 4) && (
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-gold-300">Dipole & Equipotential Voltage Scanner</span>
                    <span className="text-slate-400">Probe Position: ({probePos.x}, {probePos.y})</span>
                  </div>
                  <div
                    className="relative w-full h-[220px] bg-slate-900 rounded-xl overflow-hidden cursor-crosshair border border-slate-700"
                    onMouseMove={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      setProbePos({ x: Math.round(e.clientX - rect.left), y: Math.round(e.clientY - rect.top) });
                    }}
                  >
                    <svg viewBox="0 0 500 220" className="w-full h-full">
                      {/* Equipotential Contours */}
                      <circle cx="180" cy="110" r="30" fill="none" stroke="#ef4444" strokeWidth="1" strokeDasharray="3 3" />
                      <circle cx="180" cy="110" r="60" fill="none" stroke="#ef4444" strokeWidth="1" strokeDasharray="3 3" />
                      <circle cx="320" cy="110" r="30" fill="none" stroke="#3b82f6" strokeWidth="1" strokeDasharray="3 3" />
                      <circle cx="320" cy="110" r="60" fill="none" stroke="#3b82f6" strokeWidth="1" strokeDasharray="3 3" />
                      {/* Equatorial Zero-Volt Plane */}
                      <line x1="250" y1="10" x2="250" y2="210" stroke="#10b981" strokeWidth="2.5" />
                      <text x="255" y="30" fill="#10b981" fontSize="10" fontWeight="bold">V = 0V (Equatorial Plane)</text>

                      {/* Charges */}
                      <circle cx="180" cy="110" r="14" fill="#ef4444" />
                      <text x="180" y="114" fill="white" fontSize="10" fontWeight="bold" textAnchor="middle">+q</text>
                      <circle cx="320" cy="110" r="14" fill="#3b82f6" />
                      <text x="320" y="114" fill="white" fontSize="10" fontWeight="bold" textAnchor="middle">-q</text>

                      {/* Voltmeter Probe Pointer */}
                      <circle cx={probePos.x} cy={probePos.y} r="6" fill="#f59e0b" stroke="white" strokeWidth="2" />
                    </svg>
                  </div>
                  <div className="flex justify-between items-center text-xs p-2 bg-gold-950/40 rounded-lg border border-gold-900">
                    <span>Electric Potential at cursor: <strong className="text-amber-300 font-mono">{Math.round((250 - probePos.x) * 4)} Volts</strong></span>
                    <span>Work along green line: <strong className="text-emerald-400">Delta V = 0 =&gt; W = 0 J</strong></span>
                  </div>
                </div>
              )}

              {/* ── LAB 6: PARALLEL PLATE CAPACITOR & DIELECTRIC BOUNDARY ── */}
              {currentSlide === 5 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                  <div className="lg:col-span-7 bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center justify-center">
                    <svg viewBox="0 0 450 240" className="w-full max-w-[440px] h-[220px]">
                      {/* Positive Top Plate */}
                      <rect x="50" y="30" width="350" height="18" fill="#ef4444" rx="4" />
                      <text x="225" y="44" fill="white" fontSize="11" fontWeight="bold" textAnchor="middle">+ + + + + Positive Plate (+sigma) + + + + +</text>

                      {/* Negative Bottom Plate */}
                      <rect x="50" y="190" width="350" height="18" fill="#3b82f6" rx="4" />
                      <text x="225" y="204" fill="white" fontSize="11" fontWeight="bold" textAnchor="middle">- - - - - Negative Plate (-sigma) - - - - -</text>

                      {/* Uniform Electric Field Lines */}
                      {[80, 130, 180, 225, 270, 320, 370].map((xPos) => (
                        <g key={xPos}>
                          <line x1={xPos} y1="48" x2={xPos} y2="190" stroke="#38bdf8" strokeWidth="2" strokeDasharray="5 3" />
                          <polygon points={`${xPos},188 ${xPos - 4},176 ${xPos + 4},176`} fill="#38bdf8" />
                        </g>
                      ))}

                      <text x="415" y="125" fill="#38bdf8" fontSize="11" fontWeight="bold">E = V/d</text>
                    </svg>
                  </div>

                  <div className="lg:col-span-5 space-y-4">
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                      <h4 className="text-xs font-bold text-slate-300 uppercase">Capacitor Field Modifiers</h4>
                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>Applied Voltage (V):</span>
                          <span className="font-mono text-amber-400 font-bold">{plateVoltage} V</span>
                        </div>
                        <input
                          type="range"
                          min={100}
                          max={2000}
                          step={50}
                          value={plateVoltage}
                          onChange={(e) => setPlateVoltage(Number(e.target.value))}
                          className="w-full accent-amber-500 cursor-pointer"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>Plate Gap (d):</span>
                          <span className="font-mono text-gold-400 font-bold">{(plateDistance * 100).toFixed(1)} cm</span>
                        </div>
                        <input
                          type="range"
                          min={0.01}
                          max={0.10}
                          step={0.005}
                          value={plateDistance}
                          onChange={(e) => setPlateDistance(Number(e.target.value))}
                          className="w-full accent-gold-500 cursor-pointer"
                        />
                      </div>
                    </div>

                    <div className="p-4 bg-gold-950/60 rounded-xl border border-gold-700/60 space-y-2">
                      <div className="flex justify-between items-baseline">
                        <span className="text-xs text-gold-200">Uniform Field Strength E:</span>
                        <span className="text-lg font-mono font-black text-gold-300">{Math.round(plateVoltage / plateDistance).toLocaleString()} V/m</span>
                      </div>
                      <p className="text-[11px] text-slate-300">
                        E = Delta V / d = {plateVoltage} V / {plateDistance} m = {Math.round(plateVoltage / plateDistance)} V/m. Field is perfectly uniform between plates!
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
              disabled={currentSlide === 0}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl disabled:opacity-40"
            >
              ← Previous Lab
            </motion.button>
            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide(s => s + 1)}
                className="px-5 py-2 bg-gold-600 hover:bg-gold-500 text-white text-xs font-bold rounded-xl shadow-lg"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-lg"
              >
                Enter Free Sandbox Mode →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 3. SANDBOX PHASE ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex justify-between items-center">
            <div>
              <h3 className="text-base font-bold text-gold-300">Free Exploration Sandbox</h3>
              <p className="text-xs text-slate-400">Test any variable combinations freely without grading pressure.</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-extrabold text-sm shadow-xl"
            >
              Ready for Challenges! →
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-slate-400">Field Strength (E)</span>
              <input type="range" min={500} max={10000} step={500} value={fieldStrengthE} onChange={(e) => setFieldStrengthE(Number(e.target.value))} className="w-full accent-gold-500" />
              <div className="text-right font-mono text-xs text-gold-400">{fieldStrengthE} N/C</div>
            </div>
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-slate-400">Surface Area (A)</span>
              <input type="range" min={0.1} max={2.0} step={0.1} value={sensorAreaA} onChange={(e) => setSensorAreaA(Number(e.target.value))} className="w-full accent-gold-500" />
              <div className="text-right font-mono text-xs text-gold-400">{sensorAreaA.toFixed(1)} m^2</div>
            </div>
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-slate-400">Tilt Angle (theta)</span>
              <input type="range" min={0} max={90} value={tiltAngle} onChange={(e) => setTiltAngle(Number(e.target.value))} className="w-full accent-amber-500" />
              <div className="text-right font-mono text-xs text-amber-400">{tiltAngle} deg</div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── 4. CHALLENGE PHASE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
          {/* Header Status */}
          <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-900 rounded-xl border border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400">Question {currentChallenge + 1} of {filteredChallenges.length}</span>
              <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-gold-950 text-gold-300 border border-gold-700">
                NEP Competency: {currentChallengeData.competencyLevel}
              </span>
            </div>
            <div className="w-36 h-2 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-gold-500 to-emerald-400"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Card with Visual Feedback animations */}
          <motion.div
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
            transition={wrongShake ? { duration: 0.4 } : {}}
            className={`p-6 rounded-2xl border transition-colors ${wrongFlash ? 'bg-rose-950/60 border-rose-500' : 'bg-slate-900 border-slate-800'}`}
          >
            <h3 className="text-base font-bold text-white mb-4 leading-relaxed">{currentChallengeData.question}</h3>

            {/* MCQ Types */}
            {(currentChallengeData.type === 'classify' || currentChallengeData.type === 'distinguish' || currentChallengeData.type === 'match') && currentChallengeData.options && (
              <div className="space-y-2.5">
                {currentChallengeData.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    className={`w-full text-left p-3.5 text-sm rounded-xl border transition-all ${showExplanation && i === currentChallengeData.correctIndex ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200 font-bold' : 'bg-slate-800/70 hover:bg-slate-700/80 border-slate-700 text-slate-200'}`}
                  >
                    <div className="flex items-start gap-2.5">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-700/60 text-slate-300">{String.fromCharCode(65 + i)}</span>
                      <span>{opt}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            )}

            {/* Drag Label Type */}
            {currentChallengeData.type === 'drag-label' && currentChallengeData.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  {currentChallengeData.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3.5 py-2 bg-gold-700 hover:bg-gold-600 text-white rounded-lg text-xs font-bold cursor-grab active:cursor-grabbing shadow-md"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {currentChallengeData.dragItems.map((item, i) => (
                    <div
                      key={i}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(item.targetId)}
                      className={`p-4 rounded-xl border-2 border-dashed flex flex-col items-center justify-center min-h-[90px] text-center transition-all ${droppedLabels[item.targetId] ? 'bg-emerald-950/40 border-emerald-500' : 'bg-slate-950 border-slate-700'}`}
                    >
                      <span className="text-[11px] text-slate-400 mb-1">Target: {item.targetId.replace('target_', '').toUpperCase()}</span>
                      <span className="text-xs font-bold text-amber-300">{droppedLabels[item.targetId] || 'Drop Label Here'}</span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation}
                  className="px-5 py-2 bg-gold-600 hover:bg-gold-500 text-white text-xs font-bold rounded-xl shadow-lg"
                >
                  Verify Target Mappings
                </motion.button>
              </div>
            )}

            {/* Drag Sort Type */}
            {currentChallengeData.type === 'drag-sort' && currentChallengeData.sortItems && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Drag and drop items to arrange them in strict logical derivation order:</p>
                <div className="space-y-2">
                  {(sortArrangement.length === currentChallengeData.sortItems.length ? sortArrangement.map((idx) => currentChallengeData.sortItems![idx]) : currentChallengeData.sortItems).map((item, idx) => (
                    <motion.div
                      key={idx}
                      draggable
                      onDragStart={() => setDraggedItem(String(idx))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, idx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      className="p-3 bg-slate-800 rounded-xl border border-slate-700 text-xs font-medium text-slate-200 cursor-grab flex items-center gap-3"
                    >
                      <span className="px-2 py-0.5 bg-slate-700 rounded font-mono font-bold text-gold-300">{idx + 1}</span>
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="px-5 py-2 bg-gold-600 hover:bg-gold-500 text-white text-xs font-bold rounded-xl shadow-lg"
                >
                  Submit Derivation Order
                </motion.button>
              </div>
            )}

            {/* Numeric Type */}
            {currentChallengeData.type === 'numeric' && (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    step="any"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter calculated value"
                    aria-label="Numeric input value"
                    className="px-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:border-gold-500 outline-none"
                  />
                  <span className="text-xs text-slate-400 font-bold">{currentChallengeData.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-5 py-2 bg-gold-600 hover:bg-gold-500 text-white text-xs font-bold rounded-xl shadow-lg"
                  >
                    Check Answer
                  </motion.button>
                </div>
              </div>
            )}

            {/* Construct Type */}
            {currentChallengeData.type === 'construct' && currentChallengeData.availableParts && (
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  {currentChallengeData.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3 py-1.5 bg-gold-800 hover:bg-gold-700 text-white rounded-lg text-xs font-mono font-bold"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-700 min-h-[50px] flex items-center gap-2 flex-wrap">
                  {constructParts.map((part, i) => (
                    <span key={i} className="px-2.5 py-1 bg-gold-600 text-white font-mono text-xs rounded-md">
                      {part}
                    </span>
                  ))}
                  {constructParts.length === 0 && <span className="text-xs text-slate-500 italic">Click formula blocks above to construct</span>}
                </div>
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(constructParts.join(' '))}
                    disabled={showExplanation || constructParts.length === 0}
                    className="px-5 py-2 bg-gold-600 hover:bg-gold-500 text-white text-xs font-bold rounded-xl shadow-lg"
                  >
                    Validate Formula
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setConstructParts([])}
                    className="px-3 py-2 bg-slate-800 text-slate-400 hover:text-white text-xs rounded-xl"
                  >
                    Clear
                  </motion.button>
                </div>
              </div>
            )}

            {/* Step-by-Step Progressive Disclosure Explanation */}
            {showExplanation && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-5 p-4 bg-gold-950/40 border border-gold-800 rounded-xl space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-gold-300">Physics Solution Breakdown:</span>
                <div className="space-y-1.5">
                  {currentChallengeData.explanation.split('. ').filter(s => s.trim().length > 0).slice(0, revealedSteps + 1).map((sentence, idx) => (
                    <motion.p key={idx} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-xs text-slate-300 leading-relaxed">
                      <span className="font-bold text-amber-400">{idx + 1}.</span> {sentence}{!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}
                </div>

                {revealedSteps < currentChallengeData.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setRevealedSteps(s => s + 1)}
                    className="px-4 py-1.5 bg-amber-600/80 hover:bg-amber-600 text-white text-xs font-bold rounded-lg"
                  >
                    Reveal Next Step →
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextChallenge}
                    className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-lg"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Mastery Assessment →' : 'Next Challenge →'}
                  </motion.button>
                )}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── 5. COMPLETION PHASE WITH REFLECTION & MOTIVATIONAL FEEDBACK ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          {/* Motivational Feedback Banner */}
          <div className="p-6 bg-gradient-to-r from-emerald-950/60 via-slate-900 to-gold-950/60 rounded-3xl border border-emerald-700/60 text-center space-y-3">
            <span className="text-5xl">🏆</span>
            <h2 className={`text-2xl font-black ${motivationalMessage.color}`}>{motivationalMessage.title}</h2>
            <p className="text-xs text-slate-300 max-w-lg mx-auto">{motivationalMessage.desc}</p>
            <div className="flex justify-center gap-6 pt-2">
              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                <span className="text-[11px] text-slate-400 block">Final Score</span>
                <span className="text-2xl font-black text-emerald-400 font-mono">{Math.max(0, 100 - errors * 5)}%</span>
              </div>
              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                <span className="text-[11px] text-slate-400 block">Total Errors</span>
                <span className="text-2xl font-black text-rose-400 font-mono">{errors}</span>
              </div>
              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                <span className="text-[11px] text-slate-400 block">BKT Mastery Tier</span>
                <span className="text-2xl font-black text-gold-400 uppercase font-mono">{masteryLevel}</span>
              </div>
            </div>
          </div>

          {/* Structured Reflection Section */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">🧠</span>
              <h3 className="text-sm font-bold text-white">Post-Simulation Physics Reflection</h3>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-slate-300 block mb-1">1. What was the most surprising thing you learned about electric flux or Gauss Law?</label>
                <input
                  type="text"
                  placeholder="e.g. Net flux through a closed box with no internal charge is strictly zero..."
                  value={reflectionAnswers.q1}
                  onChange={(e) => setReflectionAnswers(r => ({ ...r, q1: e.target.value }))}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:border-gold-500 outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-slate-300 block mb-1">2. How would you explain why electric potential is zero on the dipole equatorial plane to a friend?</label>
                <input
                  type="text"
                  placeholder="e.g. Equal distance from +q and -q means equal magnitude positive and negative scalars cancel..."
                  value={reflectionAnswers.q2}
                  onChange={(e) => setReflectionAnswers(r => ({ ...r, q2: e.target.value }))}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:border-gold-500 outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-slate-300 block mb-1">3. Where in real-life electrical engineering or safety might you use equipotential mesh surfaces?</label>
                <input
                  type="text"
                  placeholder="e.g. Substation grounding grids to eliminate step potential hazards for workers..."
                  value={reflectionAnswers.q3}
                  onChange={(e) => setReflectionAnswers(r => ({ ...r, q3: e.target.value }))}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:border-gold-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Misconception Review Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 rounded-2xl border border-rose-800/60 space-y-3">
              <h3 className="text-sm font-bold text-rose-300">Your Diagnostic Misconception Profile:</h3>
              <div className="space-y-2">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-xs space-y-1">
                      <p className="text-rose-300 font-bold">❌ Misconception: {m.misconception}</p>
                      <p className="text-emerald-300 font-medium">✓ Board Correction: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Real World Substation Activity */}
          <div className="p-5 bg-gold-950/40 rounded-2xl border border-gold-800/60 space-y-3">
            <h3 className="text-sm font-bold text-gold-300 flex items-center gap-2">
              <span>🏗️</span> {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="space-y-1.5 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                  <span className="font-mono font-bold text-gold-400">{idx + 1}.</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Spaced Repetition Visibility Card */}
          <div className="p-5 bg-gradient-to-r from-slate-900 via-gold-950/50 to-slate-900 rounded-2xl border border-gold-800/50 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl p-2 bg-gold-900/40 rounded-xl border border-gold-700/50">📅</span>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-gold-400">SM-2 Spaced Repetition Schedule</span>
                <p className="text-sm font-semibold text-white">
                  Next Review:{' '}
                  <span className="text-amber-300 font-bold">
                    {errors === 0 ? 'Review in 7 days (Mastery)' : errors <= 3 ? 'Review in 3 days (Reinforce)' : 'Review in 1 day (Targeted Practice)'}
                  </span>
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  {errors === 0
                    ? '0 errors! Your memory retention is peak. Long review interval scheduled.'
                    : errors <= 3
                    ? `${errors} errors recorded. A short consolidation interval will lock this into long-term memory.`
                    : `${errors} errors recorded. A 24-hour reinforcement session is recommended.`}
                </p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setPhase('explore');
                setCurrentSlide(0);
              }}
              className="px-5 py-2.5 bg-gold-600 hover:bg-gold-500 text-white font-bold text-xs rounded-xl shadow-lg whitespace-nowrap"
            >
              Restart Simulation Labs ↺
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Popups & Feedback Components */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Set Mastered!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C12_PhysicsElectricFluxSim;