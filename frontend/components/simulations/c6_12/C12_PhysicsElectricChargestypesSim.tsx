'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── ISC CLASS 12 PHYSICS NODE CONSTANTS ───
const NODE_C12_PHY_001 = 'c12_phy_001'; // Electric charges (types and properties)
const NODE_C12_PHY_002 = 'c12_phy_002'; // Conservation and quantisation of charge
const NODE_C12_PHY_003 = 'c12_phy_003'; // Coulomb's law (vector form)
const NODE_C12_PHY_004 = 'c12_phy_004'; // Superposition principle for electric forces
const NODE_C12_PHY_005 = 'c12_phy_005'; // Continuous charge distribution (line, surface, volume)
const NODE_C12_PHY_006 = 'c12_phy_006'; // Electric field (concept, E = F/q_0)
const NODE_C12_PHY_007 = 'c12_phy_007'; // Electric field due to a point charge
const NODE_C12_PHY_008 = 'c12_phy_008'; // Electric dipole (concept and dipole moment)
const NODE_C12_PHY_009 = 'c12_phy_009'; // Electric field due to a dipole (axial and equatorial)
const NODE_C12_PHY_010 = 'c12_phy_010'; // Torque on a dipole in a uniform electric field

const ALL_NODE_IDS = [
  NODE_C12_PHY_001,
  NODE_C12_PHY_002,
  NODE_C12_PHY_003,
  NODE_C12_PHY_004,
  NODE_C12_PHY_005,
  NODE_C12_PHY_006,
  NODE_C12_PHY_007,
  NODE_C12_PHY_008,
  NODE_C12_PHY_009,
  NODE_C12_PHY_010,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The High-Voltage Electrostatic Lab at IISc Bengaluru',
  intro: 'A precision semiconductor fabrication chamber has developed anomalous charge accumulation. Micro-particles are deflecting uncontrollably, and polar gas molecules are experiencing unexpected torques. As the lead electrostatics engineer, you must analyze charge distributions, compute Coulomb vector forces, map electric fields, and balance molecular dipoles.',
  context: 'Calibrate your electrostatic probe, observe field lines, test point charge superpositions, and prevent electrostatic discharge in sensitive micro-circuits.',
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question: 'In the cleanroom, an uncharged neutral metallic sphere is placed near a fixed positive electrode without touching. What happens to the sphere?',
  options: [
    'Nothing happens because the sphere carries net zero charge',
    'It is attracted toward the positive electrode due to induced electron redistribution',
    'It is repelled away because neutral conductors cannot hold charge',
    'It immediately acquires a net positive charge and flies away',
  ],
  correctIndex: 1,
  hintAfter: 'Even with zero net charge, electrons migrate toward the near side by electrostatic induction, creating a stronger attractive force than the repulsive force on the farther positive ions!',
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

// ─── 22 PROGRESSIVE CHALLENGES ───
const CHALLENGES: Challenge[] = [
  {
    id: 'ch_phy_001',
    nodeId: NODE_C12_PHY_001,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'By historical convention established by Benjamin Franklin, what charge is acquired by a glass rod rubbed with silk and an ebonite rod rubbed with fur?',
    options: [
      'Glass rod: Positive (+), Ebonite rod: Negative (-)',
      'Glass rod: Negative (-), Ebonite rod: Positive (+)',
      'Both rods acquire positive charge (+)',
      'Both rods acquire negative charge (-)',
    ],
    correctIndex: 0,
    explanation: 'By convention, a glass rod rubbed with silk loses electrons and becomes positively charged (+), while an ebonite rod rubbed with fur gains electrons and becomes negatively charged (-).',
    hints: [
      'Think about which material gives up electrons easily.',
      'Glass loses electrons to silk; ebonite gains electrons from fur.',
      'Glass rod is positive (+) and ebonite rod is negative (-).',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_phy_002',
    nodeId: NODE_C12_PHY_002,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'A dust speck in an electrostatic precipitator has a measured charge of -4.8 × 10⁻¹⁹ C. How many excess electrons does this correspond to, according to charge quantisation (Q = ne)?',
    options: [
      'Exactly 3 electrons',
      'Exactly 1.5 electrons',
      'Exactly 4.8 electrons',
      'Quantisation does not apply to dust particles',
    ],
    correctIndex: 0,
    explanation: 'Using Q = ne, n = |Q| / e = (4.8 × 10⁻¹⁹ C) / (1.6 × 10⁻¹⁹ C) = 3. Charge always exists in discrete integer packets of elementary charge e.',
    hints: [
      'Use the formula n = Q / e where e = 1.6 × 10⁻¹⁹ C.',
      'Divide 4.8 by 1.6.',
      '4.8 / 1.6 = 3 integer electron charges.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_phy_003',
    nodeId: NODE_C12_PHY_005,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Match each charge distribution geometry to its correct charge density definition and SI unit.',
    dragItems: [
      { label: 'Linear λ = dq/dl (C/m)', targetId: 'slot_1d' },
      { label: 'Surface σ = dq/dA (C/m²)', targetId: 'slot_2d' },
      { label: 'Volume ρ = dq/dV (C/m³)', targetId: 'slot_3d' },
    ],
    correctMapping: {
      slot_1d: 'Linear λ = dq/dl (C/m)',
      slot_2d: 'Surface σ = dq/dA (C/m²)',
      slot_3d: 'Volume ρ = dq/dV (C/m³)',
    },
    explanation: '1D straight line distributions use linear charge density λ (C/m), 2D surfaces use surface density σ (C/m²), and 3D volumes use volume density ρ (C/m³).',
    hints: [
      'Match the dimensional geometry: line is 1D, area is 2D, volume is 3D.',
      'Look at the units: C/m for length, C/m² for area, C/m³ for volume.',
      'λ corresponds to dl (length), σ corresponds to dA (area), and ρ corresponds to dV (volume).',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_phy_006',
    nodeId: NODE_C12_PHY_006,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Why must the test charge q₀ used to define the electric field intensity E = lim(q₀→0) F/q₀ be infinitesimally small?',
    options: [
      'To prevent the test charge from exerting a back-force that alters or redistributes the source charge configuration',
      'Because electric force is zero for macroscopic charges',
      'Because Coulomb constant k is only valid for atomic particles',
      'To ensure that permittivity ε₀ remains constant',
    ],
    correctIndex: 0,
    explanation: 'An infinitesimal test charge (q₀ → 0) acts as a passive probe without disturbing the position of source charges or polarizing surrounding conductors/dielectrics.',
    hints: [
      'Think about what a large test charge would do to the charges creating the field.',
      'A probe should measure a system without altering the system itself.',
      'The test charge must be vanishingly small so its own electric field does not modify the source distribution.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_phy_005_sort',
    nodeId: NODE_C12_PHY_001,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Arrange the 4 stages of charging a neutral metal sphere positively by electrostatic induction in the exact chronological order.',
    sortItems: [
      '1. Bring a negatively charged rod close to (without touching) the neutral sphere to polarize it',
      '2. Connect the far side of the sphere to Earth wire so electrons flow to ground',
      '3. Disconnect the Earth grounding wire while keeping the charged rod in place',
      '4. Remove the charged rod so positive charges redistribute uniformly over the sphere',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Correct induction sequence: (1) Inducer rod creates dipole polarization; (2) Earthing drains like charges (electrons) to ground; (3) Earth disconnected to trap charge deficit; (4) Inducer removed so remaining positive charges distribute uniformly.',
    hints: [
      'You must bring the inducing rod near before you ground the sphere.',
      'Always disconnect the ground BEFORE removing the inducing rod, otherwise the sphere neutralizes again.',
      'The sequence is: Inducer near → Ground connected → Ground removed → Inducer removed.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_phy_008',
    nodeId: NODE_C12_PHY_008,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the direction and SI unit of the electric dipole moment vector p = q(2a)?',
    options: [
      'From negative charge (-q) to positive charge (+q), measured in Coulomb-metre (C·m)',
      'From positive charge (+q) to negative charge (-q), measured in Newton/Coulomb (N/C)',
      'Perpendicular to the dipole axis, measured in Coulomb/metre (C/m)',
      'Radially outward in all directions, measured in Debye only',
    ],
    correctIndex: 0,
    explanation: 'By standard physics convention, dipole moment p is a vector pointing along the dipole axis from -q to +q, and its SI unit is Coulomb-metre (C·m).',
    hints: [
      'Electric field lines go from + to -, but the dipole moment vector points in the OPPOSITE sense.',
      'p points from negative to positive.',
      'Unit is charge × distance = Coulomb × metre = C·m.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_phy_002_num',
    nodeId: NODE_C12_PHY_002,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'A copper coin loses 2 × 10¹² electrons when rubbed against a specialized polymer. Calculate the net positive charge acquired by the coin in microcoulombs (μC). (Take e = 1.6 × 10⁻¹⁹ C, 1 μC = 10⁻⁶ C)',
    correctAnswer: 0.32,
    tolerance: 0.02,
    unit: 'μC',
    explanation: 'Q = +ne = +(2 × 10¹²)(1.6 × 10⁻¹⁹ C) = 3.2 × 10⁻⁷ C = 0.32 μC.',
    hints: [
      'Use Q = ne.',
      'Multiply (2 × 10¹²) by (1.6 × 10⁻¹⁹) to get Coulombs.',
      '3.2 × 10⁻⁷ C = 0.32 × 10⁻⁶ C = 0.32 μC.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_phy_003_std',
    nodeId: NODE_C12_PHY_003,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Two point charges q₁ = +3 μC and q₂ = -4 μC are separated by r = 0.2 m in vacuum. Calculate the magnitude of the electrostatic force in Newtons. (Take 1/(4πε₀) = 9 × 10⁹ N·m²/C²)',
    correctAnswer: 2.7,
    tolerance: 0.1,
    unit: 'N',
    explanation: 'F = (1/4πε₀) |q₁q₂| / r² = (9 × 10⁹ × 3 × 10⁻⁶ × 4 × 10⁻⁶) / (0.2)² = (0.108) / 0.04 = 2.7 N (attractive).',
    hints: [
      'Use Coulomb\'s law: F = k·|q₁q₂| / r².',
      'Numerator = 9 × 10⁹ × 12 × 10⁻¹² = 0.108.',
      'Denominator = (0.2)² = 0.04. Force = 0.108 / 0.04 = 2.7 N.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_phy_003_vec',
    nodeId: NODE_C12_PHY_003,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'In vector form, if r̂₁₂ is the unit vector pointing from charge q₁ to q₂, what is the rigorous expression for the force F₁₂ exerted on q₂ by q₁?',
    options: [
      'F₁₂ = [1/(4πε₀)] · (q₁q₂ / r²) · r̂₁₂',
      'F₁₂ = [1/(4πε₀)] · (q₁q₂ / r³) · (-r̂₁₂)',
      'F₁₂ = - [1/(4πε₀)] · (|q₁q₂| / r²) · r̂₁₂',
      'F₁₂ = [1/(4πε₀)] · (q₁ + q₂ / r²) · r̂₁₂',
    ],
    correctIndex: 0,
    explanation: 'The standard vector Coulomb law is F₁₂ = [1/(4πε₀)] (q₁q₂ / r²) r̂₁₂. For like charges (q₁q₂ > 0), the force is along +r̂₁₂ (repulsive, pushing q₂ away from q₁). For unlike charges (q₁q₂ < 0), the algebraic sign automatically inverts the direction to -r̂₁₂ (attractive).',
    hints: [
      'The sign of the product q₁q₂ naturally dictates repulsion (+) or attraction (-).',
      'If both charges are positive, q₁q₂ > 0, so F₁₂ pushes q₂ away along r̂₁₂.',
      'The formula uses (q₁q₂ / r²) · r̂₁₂.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_phy_004_std',
    nodeId: NODE_C12_PHY_004,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Two positive charges +Q and +4Q are fixed a distance L apart. Where must a third positive test charge q be placed along the line connecting them so that it remains in electrostatic equilibrium (F_net = 0)?',
    options: [
      'At a distance of L/3 from the charge +Q (between the charges)',
      'At a distance of L/2 exactly midway between them',
      'At a distance of L/4 from the charge +4Q',
      'At a distance of 2L/3 from the charge +Q',
    ],
    correctIndex: 0,
    explanation: 'For F_net = 0 on q placed at distance x from +Q: k(Q·q)/x² = k(4Q·q)/(L - x)². Taking square roots: 1/x = 2/(L - x) ⇒ L - x = 2x ⇒ 3x = L ⇒ x = L/3 from the smaller charge +Q.',
    hints: [
      'Set the magnitude of repulsion from +Q equal to the magnitude of repulsion from +4Q.',
      'k(Q) / x² = k(4Q) / (L - x)².',
      'Taking square roots gives 1/x = 2/(L - x), yielding x = L/3.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_phy_007_std',
    nodeId: NODE_C12_PHY_007,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Calculate the magnitude of the electric field intensity in kV/m (1 kV/m = 10³ N/C) at a distance of 0.3 m from an isolated point charge of +2 μC in air.',
    correctAnswer: 200,
    tolerance: 5,
    unit: 'kV/m',
    explanation: 'E = kq / r² = (9 × 10⁹ × 2 × 10⁻⁶) / (0.3)² = (18 × 10³) / 0.09 = 200,000 N/C = 200 kV/m.',
    hints: [
      'Use E = (1/4πε₀) q / r².',
      'Numerator = 9 × 10⁹ × 2 × 10⁻⁶ = 18,000.',
      'Divide 18,000 by (0.3)² = 0.09 to get 200,000 N/C = 200 kV/m.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_phy_009_std',
    nodeId: NODE_C12_PHY_009,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'For a short electric dipole of moment p, what is the ratio of the electric field on its axial line (E_axial) to the electric field on its equatorial line (E_equatorial) at the same far distance r (r ≫ 2a)?',
    options: [
      'E_axial : E_equatorial = 2 : 1 (with E_axial parallel to p and E_equatorial antiparallel to p)',
      'E_axial : E_equatorial = 1 : 1 (both parallel to p)',
      'E_axial : E_equatorial = 1 : 2 (with E_axial antiparallel to p)',
      'E_axial : E_equatorial = 4 : 1 (both perpendicular to p)',
    ],
    correctIndex: 0,
    explanation: 'For a short dipole: E_axial = 2kp/r³ (directed along p) and E_equatorial = kp/r³ (directed opposite to p). Therefore, the magnitude ratio E_axial / E_equatorial = 2.',
    hints: [
      'Recall the short dipole formulas: E_axial = 2kp/r³ and E_equatorial = kp/r³.',
      'Divide 2kp/r³ by kp/r³.',
      'The ratio is exactly 2:1.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_phy_010_std',
    nodeId: NODE_C12_PHY_010,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'An electric dipole with moment p = 4 × 10⁻⁹ C·m is aligned at an angle of θ = 30° with respect to a uniform electric field of magnitude E = 5 × 10⁴ N/C. Calculate the torque experienced by the dipole in μN·m (1 μN·m = 10⁻⁶ N·m).',
    correctAnswer: 100,
    tolerance: 2,
    unit: 'μN·m',
    explanation: 'τ = pE sin θ = (4 × 10⁻⁹ C·m) × (5 × 10⁴ N/C) × sin(30°) = (20 × 10⁻⁵) × 0.5 = 10⁻⁴ N·m = 100 μN·m.',
    hints: [
      'Use the formula τ = pE sin θ.',
      'sin(30°) = 0.5.',
      'pE = (4 × 10⁻⁹) × (5 × 10⁴) = 2 × 10⁻⁴ N·m. τ = 2 × 10⁻⁴ × 0.5 = 10⁻⁴ N·m = 100 μN·m.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_phy_010_eval',
    nodeId: NODE_C12_PHY_010,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'Compare the state of a dipole in a uniform electric field at orientation θ = 0° versus θ = 180°. Which statement is physically sound?',
    options: [
      'Both have zero torque (τ = 0); θ = 0° is stable equilibrium (restoring torque upon disturbance), whereas θ = 180° is unstable equilibrium (runaway torque)',
      'θ = 0° has maximum torque while θ = 180° has zero torque',
      'Both orientations experience a net translational force pulling the dipole forward',
      'Both orientations are equally stable because potential energy is zero at both angles',
    ],
    correctIndex: 0,
    explanation: 'At both θ = 0° and 180°, sin θ = 0 so τ = 0. However, a slight tilt from 0° produces a restoring torque returning it to 0° (stable, minimum U = -pE). A slight tilt from 180° produces a deflecting torque flipping it toward 0° (unstable, maximum U = +pE).',
    hints: [
      'Think about what happens if you nudge the dipole slightly from each angle.',
      'At 0°, the positive charge is pulled along E and negative opposite E, pulling the dipole straight.',
      '0° is stable; 180° is unstable.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_phy_009_const',
    nodeId: NODE_C12_PHY_009,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Assemble the correct algebraic formula for the electric field at an axial point of a general dipole of charge q and length 2a at distance r from its center.',
    availableParts: ['1/(4πε₀)', '2pr', '(r² - a²)²', 'p', 'r³', '(r² + a²)^(3/2)'],
    targetState: '1/(4πε₀) 2pr (r² - a²)²',
    validationHint: 'Select: Coulomb constant, numerator 2pr, and denominator (r² - a²)²',
    explanation: 'E_axial = [1/(4πε₀)] · [2pr / (r² - a²)²]. For r ≫ 2a, this approximates to [1/(4πε₀)] · [2p / r³].',
    hints: [
      'The exact axial formula contains the dipole moment p and separation half-length a.',
      'Numerator has 2pr.',
      'Denominator is (r² - a²)².',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_phy_004_adv',
    nodeId: NODE_C12_PHY_004,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Three identical positive point charges +q are placed at the vertices of an equilateral triangle of side length a. What is the magnitude of the net electrostatic force on any one of the charges?',
    options: [
      'F_net = √3 · (1/4πε₀) · (q² / a²)',
      'F_net = 2 · (1/4πε₀) · (q² / a²)',
      'F_net = 3 · (1/4πε₀) · (q² / a²)',
      'F_net = 0 because the charges cancel',
    ],
    correctIndex: 0,
    explanation: 'Each neighboring charge exerts a repulsive force F = kq²/a² along the sides. The angle between these two force vectors is 60°. Using vector addition: F_net = √(F² + F² + 2F·F·cos 60°) = √(2F² + 2F²(0.5)) = √(3F²) = √3 F = √3 · kq²/a².',
    hints: [
      'The angle between the two repulsive force vectors is 60° (the vertex angle).',
      'Use the resultant formula R = √(A² + B² + 2AB cos θ) with A = B = F and θ = 60°.',
      'cos(60°) = 0.5, so R = √(F² + F�� + F²) = √3 F.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_phy_003_diel',
    nodeId: NODE_C12_PHY_003,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Two charges immersed in pure deionized water (relative permittivity / dielectric constant ε_r = 80) experience an electrostatic force of 0.05 N. If the water is replaced by vacuum while maintaining the exact same charge positions, what will the new force be in Newtons?',
    correctAnswer: 4.0,
    tolerance: 0.1,
    unit: 'N',
    explanation: 'F_medium = F_vacuum / ε_r ⇒ F_vacuum = F_medium × ε_r = 0.05 N × 80 = 4.0 N. Dielectrics screen charges and reduce electrostatic interaction by the factor ε_r.',
    hints: [
      'F_medium = F_vacuum / ε_r.',
      'Multiply the medium force by ε_r to find the vacuum force.',
      '0.05 × 80 = 4.0 N.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_phy_007_adv',
    nodeId: NODE_C12_PHY_007,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Two point charges +4 μC and -1 μC are located on the x-axis at x = 0 m and x = 0.3 m respectively. At which coordinate x on the x-axis is the net electric field strictly zero (null point)?',
    options: [
      'x = 0.6 m (to the right of the smaller magnitude charge -1 μC)',
      'x = 0.2 m (between the two charges)',
      'x = -0.3 m (to the left of +4 μC)',
      'There is no null point in free space for opposite charges',
    ],
    correctIndex: 0,
    explanation: 'Between charges, fields point in the same direction and cannot cancel. To the left of +4 μC, the larger charge is closer, so its field always dominates. To the right of -1 μC (x > 0.3), let distance from -1 μC be d: k(4)/ (0.3 + d)² = k(1)/d² ⇒ 2/(0.3 + d) = 1/d ⇒ 2d = 0.3 + d ⇒ d = 0.3 m. Thus, x = 0.3 + 0.3 = 0.6 m.',
    hints: [
      'For opposite charges, the null point MUST lie outside the segment, closer to the charge with smaller magnitude (|-1 μC|).',
      'Set E₊ = E₋: k(4)/(0.3 + d)² = k(1)/d².',
      'Solve 2d = 0.3 + d ⇒ d = 0.3 m to the right of x = 0.3 m, giving x = 0.6 m.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_phy_005_adv',
    nodeId: NODE_C12_PHY_005,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A thin non-conducting rod of length L = 0.5 m carries a total charge of Q = +15 nC distributed uniformly along its length. Calculate its linear charge density λ in nC/m.',
    correctAnswer: 30,
    tolerance: 0.5,
    unit: 'nC/m',
    explanation: 'λ = Q / L = (15 nC) / (0.5 m) = 30 nC/m.',
    hints: [
      'Linear charge density λ = Q / L.',
      'Divide 15 nC by 0.5 m.',
      '15 / 0.5 = 30 nC/m.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_phy_010_adv',
    nodeId: NODE_C12_PHY_010,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'In microwave ovens, 2.45 GHz alternating uniform electric fields oscillate water molecules (p = 6.2 × 10⁻³⁰ C·m). Why does this heat food efficiently without causing net translation of water droplets?',
    options: [
      'The uniform field exerts zero net translational force (F_net = 0) but continuous oscillating torque (τ = p × E) that drives rapid molecular rotation and thermal dissipation',
      'Microwaves strip electrons to create a continuous conduction current',
      'The water molecules are accelerated linearly in circles by magnetic Lorentz forces',
      'Gravitational attraction increases exponentially inside the microwave cavity',
    ],
    correctIndex: 0,
    explanation: 'In a uniform electric field, the net force on a dipole is zero (qE + (-qE) = 0), preventing macroscopic drift. However, the oscillating field continuously exerts a torque τ = p × E, rapidly flipping polar water molecules against intermolecular friction, converting field energy directly into thermal agitation.',
    hints: [
      'Recall the difference between net force (translation) and net torque (rotation) for dipoles.',
      'In a uniform field, F_net = 0, so molecules rotate rather than translate.',
      'Rotational friction heats the liquid uniformly.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_phy_006_adv',
    nodeId: NODE_C12_PHY_006,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'An oil droplet of mass m = 3.2 × 10⁻¹⁴ kg carrying an unknown negative charge is held suspended in static equilibrium against gravity between two horizontal plates with an upward uniform electric field E = 2.0 × 10⁵ N/C. How many excess electrons does the droplet carry? (Take g = 10 m/s², e = 1.6 × 10⁻¹⁹ C)',
    options: [
      '10 excess electrons',
      '100 excess electrons',
      '1,000 excess electrons',
      '16 excess electrons',
    ],
    correctIndex: 0,
    explanation: 'For equilibrium: Electric force upward = Gravitational force downward ⇒ qE = mg ⇒ q = mg / E = (3.2 × 10⁻¹⁴ × 10) / (2.0 × 10⁵) = 3.2 × 10⁻¹³ / 2.0 × 10⁵ = 1.6 × 10⁻¹⁸ C. Number of electrons n = q / e = (1.6 × 10⁻¹⁸) / (1.6 × 10⁻¹⁹) = 10 electrons.',
    hints: [
      'This is the classic Millikan Oil Drop setup: qE = mg.',
      'Calculate q = mg / E.',
      'q = 1.6 × 10⁻¹⁸ C. Then n = q / e = 10 electrons.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_phy_002_quark',
    nodeId: NODE_C12_PHY_002,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Quarks possess fractional charges (+2/3 e and -1/3 e). Why is the macroscopic law of charge quantisation Q = ±ne still considered strictly valid in experimental electrostatics?',
    options: [
      'Because quarks are permanently confined inside hadrons by color confinement and can never exist as free isolated observable charges in the laboratory',
      'Because quarks only exist inside unstable dark matter particles',
      'Because quark charges cancel to zero in every subatomic reaction',
      'Quantisation is actually invalid and will be removed from standard physics',
    ],
    correctIndex: 0,
    explanation: 'Due to quantum chromodynamic confinement (the strong force), quarks never exist as isolated free particles. All observable, transferable charges in nature consist of hadrons (protons, neutrons) or leptons (electrons), strictly preserving Q = ±ne for all measurable laboratory bodies.',
    hints: [
      'Can you isolate a single quark in a test tube or laboratory sphere?',
      'Quarks are confined within protons and neutrons.',
      'Since free isolated quarks do not exist, all observable charge is an integer multiple of e.',
    ],
    misconceptionIndex: 1,
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

// ─── DEFAULT ENRICHED PROPS ───
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C12_PHY_001,
  title: 'Electrostatics: Charges, Fields, Superposition & Dipoles',
  definition: 'Electrostatics encompasses the intrinsic properties of electric charges (types, conservation, quantisation), Coulomb vector interactions, superposition of multi-charge systems, continuum charge densities, vector electric fields, and dipole dynamics including axial/equatorial fields and aligning torques.',
  eli5: 'Think of electric charge as an invisible superpower carried by particles: protons push positive, electrons pull negative. When separated, they create an invisible web of force called an electric field that steers charges and twists molecular dipoles like tiny compass needles.',
  misconceptions: [
    {
      misconception: 'Charge is created or destroyed during frictional rubbing or induction.',
      correction: 'Charge is strictly conserved; friction and induction only transfer mobile electrons between materials.',
    },
    {
      misconception: 'A macroscopic body can hold any continuous charge value such as 1.5e.',
      correction: 'All observable free charge is quantised in discrete integer packets: Q = ±ne, where e = 1.6 × 10⁻¹⁹ C.',
    },
    {
      misconception: 'Coulomb vector force and electric field can be summed arithmetically without resolving vector components.',
      correction: 'Forces and electric fields are vectors requiring parallelogram law or Cartesian component resolution (ΣEx, ΣEy).',
    },
    {
      misconception: 'Linear, surface, and volume charge densities (λ, σ, ρ) can be used interchangeably.',
      correction: 'Densities are dimension-specific: λ = dq/dl (C/m) for 1D, σ = dq/dA (C/m²) for 2D, and ρ = dq/dV (C/m³) for 3D.',
    },
    {
      misconception: 'Zero net force on a dipole in a uniform field means the dipole is completely motionless.',
      correction: 'Zero net translational force (F_net = 0) produces no linear acceleration, but the equal opposite forces form a couple generating torque τ = p × E.',
    },
  ],
  diagnosticQuestions: [
    { question: 'What is the elementary quantum of charge e?', options: ['1.6 × 10⁻¹⁹ C', '9.0 × 10⁹ C', '8.85 × 10⁻¹² C', '3.0 × 10⁸ C'], correctIndex: 0 },
    { question: 'What is the SI unit of electric field intensity E?', options: ['N/C (or V/m)', 'Joule/Coulomb', 'Coulomb/metre', 'Tesla'], correctIndex: 0 },
    { question: 'What happens to the Coulomb force between two charges if the distance is doubled?', options: ['It decreases to 1/4th', 'It decreases to 1/2', 'It doubles', 'It quadruples'], correctIndex: 0 },
    { question: 'What is the direction of an electric dipole moment vector p?', options: ['From negative to positive charge', 'From positive to negative charge', 'Perpendicular to the dipole axis', 'Radially outward'], correctIndex: 0 },
  ],
  masteryCriteria: 'Mastery requires demonstrating proficiency in charge quantisation, Coulomb vector superposition, continuous distribution modeling, field vector mapping, and dipole torque analysis.',
};

// ─── INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: The Atomic Charge Forge & Quantisation',
    instruction: 'Drag the Electron Pump slider to transfer electrons between the neutral conducting spheres. Observe quantisation Q = ±ne and conservation.',
    interactionType: 'slider-quantisation',
    nodeId: NODE_C12_PHY_001,
  },
  {
    title: 'Lab 2: Coulomb Vector Force & Dielectric Shielding',
    instruction: 'Adjust the separation distance r and dielectric constant ε_r to see the real-time Coulomb force vector arrows scale dynamically.',
    interactionType: 'slider-coulomb',
    nodeId: NODE_C12_PHY_003,
  },
  {
    title: 'Lab 3: Electric Field Mapping & Superposition',
    instruction: 'Move the positive test charge probe (q₀) around the two fixed source charges to observe the resultant vector field E_net = E₁ + E₂ in real time.',
    interactionType: 'probe-superposition',
    nodeId: NODE_C12_PHY_004,
  },
  {
    title: 'Lab 4: Dipole Field Anatomy (Axial vs Equatorial)',
    instruction: 'Toggle between the Axial and Equatorial test tracks to verify why E_axial is double E_equatorial and observe the 1/r³ decay.',
    interactionType: 'dipole-field-explorer',
    nodeId: NODE_C12_PHY_009,
  },
  {
    title: 'Lab 5: Dipole Motor in Uniform Electric Field',
    instruction: 'Rotate the dipole angle θ to measure the restoring torque τ = pE sin θ and test stability at 0° vs 180° in the uniform field.',
    interactionType: 'dipole-torque-simulator',
    nodeId: NODE_C12_PHY_010,
  },
];

// ─── PREDICT-THEN-CHECK QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you double the distance r from a dipole along its axial line, by what factor does the electric field decrease?',
    options: ['Decreases to 1/8th (factor of 8)', 'Decreases to 1/4th (factor of 4)', 'Decreases to 1/2 (factor of 2)', 'Decreases to 1/16th (factor of 16)'],
    correctIndex: 0,
    verifyInstruction: 'Drag the distance slider in Lab 4 from 0.1 m to 0.2 m and observe the field drop by 2³ = 8 times!',
    nodeId: NODE_C12_PHY_009,
  },
  {
    question: 'Predict: What happens to the torque on an electric dipole in a uniform electric field when its angle with the field increases from 30° to 90°?',
    options: ['Torque doubles (sin 90° = 2 × sin 30°)', 'Torque remains the same', 'Torque decreases to zero', 'Torque quadruples'],
    correctIndex: 0,
    verifyInstruction: 'In Lab 5, rotate the dipole angle slider from 30° to 90° and observe the torque double from 100 μN·m to 200 μN·m!',
    nodeId: NODE_C12_PHY_010,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'Observation: In Lab 2, as you increase the dielectric constant ε_r from 1 (vacuum) to 80 (water), what happens to the Coulomb force vector length?',
    observableOptions: [
      'The force arrows shrink drastically to 1/80th of their vacuum size',
      'The force arrows grow 80 times larger',
      'The force arrows flip direction from repulsion to attraction',
      'The force vector remains completely unchanged',
    ],
    correctIndex: 0,
    nodeId: NODE_C12_PHY_003,
  },
];

// ─── REAL-WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Engineering Challenge: Design an Industrial Electrostatic Precipitator',
  description: 'Apply electrostatics principles to clean fly ash particles (mass 10⁻¹¹ kg, charge -5000e) from thermal power plant exhaust chimneys in NTPC Dadri.',
  steps: [
    'Calculate the charge on each ash particle: Q = -5000 × (1.6 × 10⁻¹⁹ C) = -8.0 × 10⁻¹⁶ C.',
    'Determine the required electric field E between collector plates to exert an electrostatic force 100× greater than gravity (mg).',
    'Calculate the plate voltage and spacing to achieve this uniform field without causing dielectric breakdown of air (3 × 10⁶ V/m).',
    'Assess how flue gas humidity (dielectric screening ε_r) alters particle collection efficiency.',
  ],
};

function C12_PhysicsElectricChargestypesSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C12_PHY_001,
  title = DEFAULT_PROPS.title || 'Electrostatics: Charges & Dipoles',
  misconceptions = DEFAULT_PROPS.misconceptions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['physics'] || { name: 'Physics', emoji: '⚡', color: 'cyan' };

  // Phase flow: discovery → explore → sandbox → challenge → complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // States
  const [predictionMade, setPredictionMade] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);

  // Interactive Lab State Variables
  const [electronCount, setElectronCount] = useState(5); // in 10^12 electrons
  const [coulombQ1, setCoulombQ1] = useState(3); // in μC
  const [coulombQ2, setCoulombQ2] = useState(-4); // in μC
  const [coulombDistance, setCoulombDistance] = useState(0.2); // in metres
  const [dielectricConst, setDielectricConst] = useState(1); // vacuum = 1, water = 80
  const [probePos, setProbePos] = useState({ x: 200, y: 150 });
  const [sourceQ1] = useState({ x: 120, y: 150, q: 4 }); // +4 μC
  const [sourceQ2] = useState({ x: 280, y: 150, q: -4 }); // -4 μC
  const [dipoleTrack, setDipoleTrack] = useState<'axial' | 'equatorial'>('axial');
  const [dipoleDist] = useState(0.15); // in metres
  const [dipoleAngle, setDipoleAngle] = useState(30); // in degrees
  const [fieldStrength] = useState(50); // in kV/m
  const [selectedSubstance, setSelectedSubstance] = useState<string>('vacuum');

  // Adaptive mastery and challenge states
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Drag-and-drop & Non-MCQ states
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Feedback FX states
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);

  // Persistence Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Derived real-time calculations
  const calculatedCharge = useMemo(() => {
    const qInCoulombs = electronCount * 1e12 * 1.6e-19;
    return {
      coulombs: qInCoulombs,
      microCoulombs: qInCoulombs * 1e6,
    };
  }, [electronCount]);

  const calculatedCoulombForce = useMemo(() => {
    const k = 9e9;
    const q1C = coulombQ1 * 1e-6;
    const q2C = coulombQ2 * 1e-6;
    const r = Math.max(0.05, coulombDistance);
    const fMag = (k * Math.abs(q1C * q2C)) / (dielectricConst * r * r);
    const isRepulsive = coulombQ1 * coulombQ2 > 0;
    return {
      magnitude: fMag,
      isRepulsive,
      formatted: fMag > 1000 ? `${(fMag / 1000).toFixed(2)} kN` : `${fMag.toFixed(3)} N`,
    };
  }, [coulombQ1, coulombQ2, coulombDistance, dielectricConst]);

  const probeFieldVector = useMemo(() => {
    const k = 9e9;
    const scale = 0.001;
    const dx1 = (probePos.x - sourceQ1.x) * scale;
    const dy1 = (probePos.y - sourceQ1.y) * scale;
    const r1Sq = Math.max(0.0001, dx1 * dx1 + dy1 * dy1);
    const r1 = Math.sqrt(r1Sq);
    const E1Mag = (k * Math.abs(sourceQ1.q * 1e-6)) / r1Sq;
    const E1x = (E1Mag * (dx1 / r1)) * (sourceQ1.q > 0 ? 1 : -1);
    const E1y = (E1Mag * (dy1 / r1)) * (sourceQ1.q > 0 ? 1 : -1);

    const dx2 = (probePos.x - sourceQ2.x) * scale;
    const dy2 = (probePos.y - sourceQ2.y) * scale;
    const r2Sq = Math.max(0.0001, dx2 * dx2 + dy2 * dy2);
    const r2 = Math.sqrt(r2Sq);
    const E2Mag = (k * Math.abs(sourceQ2.q * 1e-6)) / r2Sq;
    const E2x = (E2Mag * (dx2 / r2)) * (sourceQ2.q > 0 ? 1 : -1);
    const E2y = (E2Mag * (dy2 / r2)) * (sourceQ2.q > 0 ? 1 : -1);

    const netEx = E1x + E2x;
    const netEy = E1y + E2y;
    const netEMag = Math.sqrt(netEx * netEx + netEy * netEy);
    const angle = Math.atan2(netEy, netEx) * (180 / Math.PI);

    return {
      netEMag,
      angle,
      formatted: `${(netEMag / 1e6).toFixed(2)} MV/m`,
    };
  }, [probePos, sourceQ1, sourceQ2]);

  const dipolePhysics = useMemo(() => {
    const k = 9e9;
    const p = 4e-9;
    const r = Math.max(0.05, dipoleDist);
    const E_axial = (2 * k * p) / Math.pow(r, 3);
    const E_equatorial = (k * p) / Math.pow(r, 3);
    const rad = (dipoleAngle * Math.PI) / 180;
    const E_ext = fieldStrength * 1e3;
    const torque = p * E_ext * Math.sin(rad);
    const potEnergy = -p * E_ext * Math.cos(rad);

    return {
      p,
      E_axial,
      E_equatorial,
      torqueFormatted: `${(torque * 1e6).toFixed(2)} μN·m`,
      energyFormatted: `${(potEnergy * 1e6).toFixed(2)} μJ`,
    };
  }, [dipoleDist, dipoleAngle, fieldStrength]);

  // Adaptive difficulty filtering
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter((c) => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const activeChallenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

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

  // Canvas field monitor
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId: number;
    let t = 0;

    const render = () => {
      t += 0.03;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = 'rgba(56, 189, 248, 0.12)';
      ctx.lineWidth = 1;
      for (let x = 10; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      ctx.strokeStyle = 'rgba(99, 102, 241, 0.4)';
      ctx.lineWidth = 1.5;
      for (let y = 15; y < canvas.height; y += 25) {
        const offset = (t * 20 + y * 2) % canvas.width;
        ctx.beginPath();
        ctx.moveTo(offset, y);
        ctx.lineTo(offset + 12, y);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(offset + 12, y);
        ctx.lineTo(offset + 8, y - 3);
        ctx.lineTo(offset + 8, y + 3);
        ctx.fillStyle = 'rgba(99, 102, 241, 0.6)';
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && activeChallenge.hints[nextLevel - 1]) {
      setCurrentHint(activeChallenge.hints[nextLevel - 1]);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(`Hint ${nextLevel}: ${activeChallenge.hints[nextLevel - 1]}`);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      audioManager.play('pop');
    }
  }, [hintCount, activeChallenge]);

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
    speechManager.speak(isCorrect ? 'Excellent physical intuition!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Electrostatics Virtual Laboratory.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode unlocked.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Diagnostic challenge session initiated.');
  }, []);

  const handlePrediction = useCallback(() => {
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now test and verify with the live simulation controls.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Accurate scientific observation!' : 'Look closely at the gauge arrows as parameters change.');
  }, []);

  const handleElectronPumpChange = useCallback((val: number) => {
    setElectronCount(val);
    audioManager.play('count');
  }, []);

  const handleCoulombDistanceChange = useCallback((val: number) => {
    setCoulombDistance(val);
    audioManager.play('pop');
  }, []);

  const handleDielectricChange = useCallback((val: number, name: string) => {
    setDielectricConst(val);
    setSelectedSubstance(name);
    audioManager.play('tap');
  }, []);

  const handleDipoleAngleChange = useCallback((val: number) => {
    setDipoleAngle(val);
    audioManager.play('pop');
  }, []);

  const handleProbeDrag = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(40, Math.min(360, e.clientX - rect.left));
    const y = Math.max(30, Math.min(270, e.clientY - rect.top));
    setProbePos({ x, y });
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    setShowSparkles(true);
    audioManager.play('celebration');
    speechManager.speak(`Simulation complete! You attained an overall score of ${finalScore} percent.`);
  }, [errors, onComplete]);

  const handleNextChallenge = useCallback(() => {
    setHintCount(0);
    setAnswerRevealed(false);
    setShowHint(false);
    setShowExplanation(false);
    setShowSparkles(false);
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

      if (activeChallenge.type === 'classify' || activeChallenge.type === 'distinguish' || activeChallenge.type === 'match') {
        isCorrect = answer === activeChallenge.correctIndex;
      } else if (activeChallenge.type === 'drag-label') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(activeChallenge.correctMapping);
      } else if (activeChallenge.type === 'drag-sort') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(activeChallenge.correctOrder);
      } else if (activeChallenge.type === 'numeric') {
        const numAnswer = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
        isCorrect = Math.abs(numAnswer - (activeChallenge.correctAnswer || 0)) <= (activeChallenge.tolerance || 0);
      } else if (activeChallenge.type === 'construct') {
        isCorrect = (answer as string).trim() === activeChallenge.targetState;
      }

      if (isCorrect) {
        setScoreBreakdown((sb) => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct! Outstanding problem solving.');
        setShowConfetti(true);
        setShowSparkles(true);
        setShowExplanation(true);
        bktStateRef.current = bktUpdate(bktStateRef.current, true);

        const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
        const updatedSrs = sm2Update(srsItem, 5, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + activeChallenge.nodeId, JSON.stringify(updatedSrs));
        }
      } else {
        audioManager.play('drop-wrong');
        audioManager.play('error');
        setErrors((e) => e + 1);
        setWrongShake(true);
        setWrongFlash(true);
        setTimeout(() => setWrongShake(false), 500);
        setTimeout(() => setWrongFlash(false), 800);

        if (activeChallenge.misconceptionIndex !== undefined && !hitMisconceptions.includes(activeChallenge.misconceptionIndex)) {
          setHitMisconceptions((prev) => [...prev, activeChallenge.misconceptionIndex!]);
        }

        if (hintCount < 3) {
          showNextHint();
        } else {
          setAnswerRevealed(true);
          setShowExplanation(true);
          speechManager.speak('Let us review the step-by-step physical explanation.');
          bktStateRef.current = bktUpdate(bktStateRef.current, false);

          const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
          const updatedSrs = sm2Update(srsItem, 1, 4000);
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem('srs_' + activeChallenge.nodeId, JSON.stringify(updatedSrs));
          }
        }
      }
      resetInactivityTimer();
    },
    [activeChallenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]
  );

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback(
    (targetId: string) => {
      if (!draggedItem) return;
      const isCorrect = activeChallenge.correctMapping?.[targetId] === draggedItem;
      if (isCorrect) {
        setDroppedLabels((prev) => ({ ...prev, [targetId]: draggedItem }));
        audioManager.play('drop-correct');
      } else {
        audioManager.play('drop-wrong');
      }
      setDraggedItem(null);
    },
    [draggedItem, activeChallenge]
  );

  const handleSortMove = useCallback(
    (fromIndex: number, toIndex: number) => {
      audioManager.play('pickup');
      setSortArrangement((prev) => {
        if (prev.length === 0 && activeChallenge.sortItems) {
          prev = activeChallenge.sortItems.map((_, i) => i);
        }
        const arr = [...prev];
        const [moved] = arr.splice(fromIndex, 1);
        arr.splice(toIndex, 0, moved);
        return arr;
      });
    },
    [activeChallenge]
  );

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : activeChallenge.sortItems?.map((_, i) => i) || [];
    handleAnswer(answer);
  }, [sortArrangement, activeChallenge, handleAnswer]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.header
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between pb-4 border-b border-slate-800 mb-6 gap-3"
      >
        <div className="flex items-center gap-3">
          <span className="p-3 bg-cyan-950/70 border border-cyan-800/80 rounded-2xl text-2xl shadow-inner" aria-hidden="true">
            {subjectConfig.emoji}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-widest font-bold text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800">
                ISC Class 12
              </span>
              <span className="text-xs text-slate-400 font-mono">10 Curricular Nodes</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">{title}</h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
              difficulty === 'foundation'
                ? 'bg-emerald-950/60 text-emerald-300 border-emerald-700'
                : difficulty === 'advanced'
                ? 'bg-rose-950/60 text-rose-300 border-rose-700'
                : 'bg-indigo-950/60 text-indigo-300 border-indigo-700'
            }`}
          >
            Tier: {difficulty}
          </motion.span>
          <span className="text-xs text-slate-400 font-medium">BKT Mastery: {masteryLevel}</span>
        </div>
      </motion.header>

      {/* ─── CANVAS MONITOR ─── */}
      <div className="relative w-full h-8 bg-slate-900/60 rounded-xl overflow-hidden border border-slate-800 mb-4">
        <canvas ref={canvasRef} width={900} height={32} className="w-full h-full block" />
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <span className="text-[10px] uppercase font-mono tracking-widest text-cyan-400/80">
            ⚡ Electrostatic Potential Monitor: Active Field Sensor
          </span>
        </div>
      </div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-indigo-950/70 via-slate-900 to-slate-950 rounded-2xl border border-indigo-800/60 shadow-lg">
            <h2 className="text-lg font-bold text-indigo-300 flex items-center gap-2">
              <span aria-hidden="true">🔬</span> {SCENARIO.title}
            </h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <div className="mt-3 p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-xs text-slate-400">
              <strong className="text-cyan-400 font-semibold">Laboratory Objective:</strong> {SCENARIO.context}
            </div>
          </div>

          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-1">
              Curiosity Hook • Pre-Exploration Question
            </span>
            <p className="text-white font-semibold text-base mb-4">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`p-4 text-left rounded-xl text-sm font-medium transition-all ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/80 border-2 border-emerald-500 text-emerald-200'
                      : discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-900/40 border border-slate-800 text-slate-500'
                      : 'bg-slate-800/70 hover:bg-slate-700/80 border border-slate-700 text-slate-200'
                  }`}
                >
                  <span className="font-mono text-cyan-400 mr-2">[{String.fromCharCode(65 + i)}]</span>
                  {discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex && <span className="text-emerald-400 font-bold mr-1">✓ </span>}
                  {discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex && <span className="text-rose-400 font-bold mr-1">✗ </span>}
                  {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-5 p-4 rounded-xl bg-slate-950 border border-slate-800">
                <p className={discoveryCorrect ? 'text-emerald-400 text-sm font-medium' : 'text-amber-400 text-sm font-medium'}>
                  {discoveryCorrect ? '✓ Spot on! Induction causes polarization.' : `ℹ️ ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <div className="mt-4 flex justify-end">
                  <motion.button
                    aria-label="Launch Interactive Labs"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={handleAdvanceToExploration}
                    className="px-6 py-2.5 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-cyan-950/50 flex items-center gap-2"
                  >
                    <span>Launch Interactive Labs</span> →
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE EXPLORATION ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex items-center justify-between bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                Step {currentSlide + 1} of {EXPLORATION_STEPS.length}:
              </span>
              <h2 className="text-sm sm:text-base font-bold text-white">{EXPLORATION_STEPS[currentSlide].title}</h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-mono">
                {EXPLORATION_STEPS[currentSlide].nodeId}
              </span>
            </div>
          </div>

          <p className="text-amber-300 text-sm font-medium px-1 flex items-center gap-2">
            <span aria-hidden="true">👉</span> {EXPLORATION_STEPS[currentSlide].instruction}
          </p>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="p-5 bg-slate-900 rounded-3xl border border-slate-800 shadow-inner"
            >
              {/* LAB 1 */}
              {currentSlide === 0 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <svg viewBox="0 0 400 220" className="w-full bg-slate-950 rounded-2xl border border-slate-800" aria-label="Quantisation demonstration with charged conducting spheres">
                      <defs>
                        <radialGradient id="posGlow" cx="50%" cy="50%" r="50%">
                          <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.8" />
                          <stop offset="100%" stopColor="#881337" stopOpacity="0.1" />
                        </radialGradient>
                        <radialGradient id="negGlow" cx="50%" cy="50%" r="50%">
                          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                          <stop offset="100%" stopColor="#0c4a6e" stopOpacity="0.1" />
                        </radialGradient>
                      </defs>

                      <circle cx="120" cy="110" r="50" fill="url(#posGlow)" stroke="#f43f5e" strokeWidth="2" />
                      <text x="120" y="105" textAnchor="middle" fill="#fda4af" fontSize="12" fontWeight="bold">Sphere A (Lost e⁻)</text>
                      <text x="120" y="125" textAnchor="middle" fill="#ffffff" fontSize="14" fontWeight="black">
                        +{calculatedCharge.microCoulombs.toFixed(2)} μC
                      </text>

                      <circle cx="280" cy="110" r="50" fill="url(#negGlow)" stroke="#38bdf8" strokeWidth="2" />
                      <text x="280" y="105" textAnchor="middle" fill="#bae6fd" fontSize="12" fontWeight="bold">Sphere B (Gained e⁻)</text>
                      <text x="280" y="125" textAnchor="middle" fill="#ffffff" fontSize="14" fontWeight="black">
                        -{calculatedCharge.microCoulombs.toFixed(2)} μC
                      </text>

                      <path d="M 175 110 L 225 110" stroke="#38bdf8" strokeWidth="3" strokeDasharray="4,4" />
                      <text x="200" y="95" textAnchor="middle" fill="#38bdf8" fontSize="10" fontWeight="bold">
                        {electronCount} × 10¹² e⁻ Transfer
                      </text>
                      <text x="200" y="195" textAnchor="middle" fill="#94a3b8" fontSize="11">
                        System Net Charge: +Q + (-Q) = 0 C (Conserved)
                      </text>
                    </svg>

                    <div className="space-y-4">
                      <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                        <label htmlFor="electron-slider" className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                          Electron Pump Transfer (n): {electronCount} × 10¹² electrons
                        </label>
                        <input
                          id="electron-slider"
                          aria-label="Electron Pump Slider"
                          type="range"
                          min={1}
                          max={20}
                          step={1}
                          value={electronCount}
                          onChange={(e) => handleElectronPumpChange(Number(e.target.value))}
                          className="w-full accent-cyan-500 cursor-pointer"
                        />
                      </div>

                      <div className="p-4 bg-cyan-950/40 border border-cyan-800/60 rounded-2xl space-y-2">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-300">Quantisation Calculus:</h3>
                        <p className="text-xs text-slate-300 font-mono">Q = ± n × e</p>
                        <p className="text-xs text-slate-300 font-mono">
                          Q = ({electronCount} × 10¹²) × (1.6 × 10⁻¹⁹ C) = <span className="text-cyan-400 font-bold">{calculatedCharge.coulombs.toExponential(2)} C</span>
                        </p>
                        <p className="text-xs text-emerald-400 font-medium">✓ Guaranteed integer packet multiples only</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* LAB 2 */}
              {currentSlide === 1 && (
                <div className="space-y-6">
                  {!predictionMade && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-indigo-950/60 border border-indigo-700/70 rounded-2xl">
                      <p className="text-white text-sm font-semibold mb-3">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            aria-label={`Prediction Option: ${opt}`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handlePrediction()}
                            className="p-2.5 text-left rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <svg viewBox="0 0 400 220" className="w-full bg-slate-950 rounded-2xl border border-slate-800" aria-label="Coulomb force vectors diagram">
                      <circle cx="100" cy="110" r="22" fill={coulombQ1 >= 0 ? '#f43f5e' : '#38bdf8'} />
                      <text x="100" y="115" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">
                        {coulombQ1 > 0 ? `+${coulombQ1}` : coulombQ1} μC
                      </text>

                      <circle cx={100 + coulombDistance * 600} cy="110" r="22" fill={coulombQ2 >= 0 ? '#f43f5e' : '#38bdf8'} />
                      <text x={100 + coulombDistance * 600} y="115" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">
                        {coulombQ2 > 0 ? `+${coulombQ2}` : coulombQ2} μC
                      </text>

                      {calculatedCoulombForce.isRepulsive ? (
                        <>
                          <line x1="75" y1="110" x2="30" y2="110" stroke="#fbbf24" strokeWidth="4" />
                          <polygon points="30,105 20,110 30,115" fill="#fbbf24" />
                          <text x="45" y="95" fill="#fbbf24" fontSize="10" fontWeight="bold">F₂₁</text>

                          <line
                            x1={125 + coulombDistance * 600}
                            y1="110"
                            x2={170 + coulombDistance * 600}
                            y2="110"
                            stroke="#fbbf24"
                            strokeWidth="4"
                          />
                          <polygon
                            points={`${170 + coulombDistance * 600},105 ${180 + coulombDistance * 600},110 ${170 + coulombDistance * 600},115`}
                            fill="#fbbf24"
                          />
                          <text x={145 + coulombDistance * 600} y="95" fill="#fbbf24" fontSize="10" fontWeight="bold">F₁₂</text>
                        </>
                      ) : (
                        <>
                          <line x1="125" y1="110" x2="165" y2="110" stroke="#34d399" strokeWidth="4" />
                          <polygon points="165,105 175,110 165,115" fill="#34d399" />
                          <text x="145" y="95" fill="#34d399" fontSize="10" fontWeight="bold">F₂₁</text>

                          <line
                            x1={75 + coulombDistance * 600}
                            y1="110"
                            x2={35 + coulombDistance * 600}
                            y2="110"
                            stroke="#34d399"
                            strokeWidth="4"
                          />
                          <polygon
                            points={`${35 + coulombDistance * 600},105 ${25 + coulombDistance * 600},110 ${35 + coulombDistance * 600},115`}
                            fill="#34d399"
                          />
                          <text x={45 + coulombDistance * 600} y="95" fill="#34d399" fontSize="10" fontWeight="bold">F₁₂</text>
                        </>
                      )}

                      <line x1="100" y1="170" x2={100 + coulombDistance * 600} y2="170" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3,3" />
                      <text x={100 + (coulombDistance * 600) / 2} y="190" textAnchor="middle" fill="#94a3b8" fontSize="11">
                        r = {coulombDistance.toFixed(2)} m (Medium: {selectedSubstance}, ε_r = {dielectricConst})
                      </text>
                    </svg>

                    <div className="space-y-3">
                      <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                        <label htmlFor="dist-slider" className="text-xs font-bold text-slate-400 block mb-1">
                          Distance r: {coulombDistance.toFixed(2)} m
                        </label>
                        <input
                          id="dist-slider"
                          aria-label="Separation Distance Slider"
                          type="range"
                          min={0.08}
                          max={0.4}
                          step={0.01}
                          value={coulombDistance}
                          onChange={(e) => handleCoulombDistanceChange(Number(e.target.value))}
                          className="w-full accent-cyan-500 cursor-pointer"
                        />
                      </div>

                      <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                        <label className="text-xs font-bold text-slate-400 block mb-2">Dielectric Medium (ε_r):</label>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { name: 'Vacuum/Air', er: 1 },
                            { name: 'Mica/Glass', er: 6 },
                            { name: 'Pure Water', er: 80 },
                          ].map((med) => (
                            <motion.button
                              key={med.name}
                              aria-label={`Set medium to ${med.name}`}
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                              onClick={() => handleDielectricChange(med.er, med.name)}
                              className={`p-2 rounded-lg text-xs font-bold ${
                                dielectricConst === med.er ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-300'
                              }`}
                            >
                              {med.name} (ε={med.er})
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-400 uppercase">Calculated Force |F|:</span>
                        <span className="text-base font-black text-amber-400 font-mono">{calculatedCoulombForce.formatted}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* LAB 3 */}
              {currentSlide === 2 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <div className="space-y-2">
                      <svg
                        viewBox="0 0 400 300"
                        onMouseMove={handleProbeDrag}
                        className="w-full bg-slate-950 rounded-2xl border border-slate-800 cursor-crosshair"
                        aria-label="Superposition plane with test probe"
                      >
                        <circle cx={sourceQ1.x} cy={sourceQ1.y} r="18" fill="#f43f5e" />
                        <text x={sourceQ1.x} y={sourceQ1.y + 4} textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">+4μC</text>

                        <circle cx={sourceQ2.x} cy={sourceQ2.y} r="18" fill="#38bdf8" />
                        <text x={sourceQ2.x} y={sourceQ2.y + 4} textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">-4μC</text>

                        <text x="200" y="25" textAnchor="middle" fill="#64748b" fontSize="10">
                          [ Move cursor/touch to place test charge probe q₀ ]
                        </text>

                        <circle cx={probePos.x} cy={probePos.y} r="10" fill="#fbbf24" stroke="#ffffff" strokeWidth="2" />
                        <text x={probePos.x} y={probePos.y - 14} textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">q₀</text>

                        <g transform={`translate(${probePos.x}, ${probePos.y}) rotate(${probeFieldVector.angle})`}>
                          <line x1="0" y1="0" x2="45" y2="0" stroke="#a855f7" strokeWidth="4" />
                          <polygon points="45,-5 55,0 45,5" fill="#a855f7" />
                        </g>
                      </svg>
                    </div>

                    <div className="space-y-3">
                      <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                        <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Superposition at Probe (x={probePos.x}, y={probePos.y}):</h3>
                        <div className="flex justify-between text-xs text-slate-300">
                          <span>Net Intensity |E_net|:</span>
                          <span className="font-mono text-purple-400 font-bold">{probeFieldVector.formatted}</span>
                        </div>
                        <div className="flex justify-between text-xs text-slate-300">
                          <span>Vector Orientation θ:</span>
                          <span className="font-mono text-white font-bold">{probeFieldVector.angle.toFixed(1)}°</span>
                        </div>
                        <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-800">
                          E_net = E₁ + E₂ (Added as vector components)
                        </div>
                      </div>

                      {!observationAnswered && (
                        <div className="p-4 bg-indigo-950/60 border border-indigo-700/60 rounded-2xl">
                          <p className="text-xs font-semibold text-white mb-2">{OBSERVATION_QUESTIONS[0].question}</p>
                          <div className="space-y-1.5">
                            {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                              <motion.button
                                key={i}
                                aria-label={`Observation Option: ${opt}`}
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                onClick={() => handleObservation(i)}
                                className="w-full text-left p-2 rounded-lg bg-slate-800 text-slate-200 text-xs"
                              >
                                {opt}
                              </motion.button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* LAB 4 */}
              {currentSlide === 3 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <svg viewBox="0 0 400 240" className="w-full bg-slate-950 rounded-2xl border border-slate-800" aria-label="Dipole electric field lines">
                      <circle cx="170" cy="120" r="14" fill="#38bdf8" />
                      <text x="170" y="124" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">-q</text>

                      <circle cx="230" cy="120" r="14" fill="#f43f5e" />
                      <text x="230" y="124" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">+q</text>

                      <line x1="170" y1="95" x2="230" y2="95" stroke="#34d399" strokeWidth="3" />
                      <polygon points="230,90 240,95 230,100" fill="#34d399" />
                      <text x="200" y="85" textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="bold">p = q(2a) →</text>

                      {dipoleTrack === 'axial' ? (
                        <>
                          <line x1="200" y1="120" x2="350" y2="120" stroke="#94a3b8" strokeDasharray="3,3" />
                          <circle cx="340" cy="120" r="8" fill="#fbbf24" />
                          <text x="340" y="105" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">P_axial</text>
                          <line x1="340" y1="120" x2="390" y2="120" stroke="#f59e0b" strokeWidth="4" />
                          <polygon points="390,115 400,120 390,125" fill="#f59e0b" />
                          <text x="370" y="140" fill="#f59e0b" fontSize="10" fontWeight="bold">E_axial || p</text>
                        </>
                      ) : (
                        <>
                          <line x1="200" y1="120" x2="200" y2="35" stroke="#94a3b8" strokeDasharray="3,3" />
                          <circle cx="200" cy="40" r="8" fill="#fbbf24" />
                          <text x="200" y="25" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">P_equatorial</text>
                          <line x1="200" y1="40" x2="150" y2="40" stroke="#ec4899" strokeWidth="4" />
                          <polygon points="150,35 140,40 150,45" fill="#ec4899" />
                          <text x="170" y="60" fill="#ec4899" fontSize="10" fontWeight="bold">E_equatorial ⇚ -p</text>
                        </>
                      )}
                    </svg>

                    <div className="space-y-4">
                      <div className="flex gap-2">
                        <motion.button
                          aria-label="Select Axial Line Track"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setDipoleTrack('axial')}
                          className={`flex-1 py-2.5 rounded-xl font-bold text-xs ${
                            dipoleTrack === 'axial' ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-300'
                          }`}
                        >
                          Axial Line (End-On)
                        </motion.button>
                        <motion.button
                          aria-label="Select Equatorial Line Track"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setDipoleTrack('equatorial')}
                          className={`flex-1 py-2.5 rounded-xl font-bold text-xs ${
                            dipoleTrack === 'equatorial' ? 'bg-pink-600 text-white' : 'bg-slate-800 text-slate-300'
                          }`}
                        >
                          Equatorial (Broad-Side-On)
                        </motion.button>
                      </div>

                      <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                        <div className="flex justify-between text-xs text-slate-300">
                          <span>E_axial (2kp/r³):</span>
                          <span className="font-mono text-amber-400 font-bold">{(dipolePhysics.E_axial / 1e3).toFixed(1)} kN/C</span>
                        </div>
                        <div className="flex justify-between text-xs text-slate-300">
                          <span>E_equatorial (kp/r³):</span>
                          <span className="font-mono text-pink-400 font-bold">{(dipolePhysics.E_equatorial / 1e3).toFixed(1)} kN/C</span>
                        </div>
                        <div className="pt-2 border-t border-slate-800 text-xs font-bold text-emerald-400">
                          Ratio E_axial / E_equatorial = Exactly 2.0 (Falls off as 1/r³)
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* LAB 5 */}
              {currentSlide === 4 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <svg viewBox="0 0 400 240" className="w-full bg-slate-950 rounded-2xl border border-slate-800" aria-label="Dipole torque in uniform field">
                      {[40, 80, 120, 160, 200].map((y) => (
                        <g key={y}>
                          <line x1="20" y1={y} x2="380" y2={y} stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.4" />
                          <polygon points="380,y-3 388,y 380,y+3" fill="#38bdf8" fillOpacity="0.6" />
                        </g>
                      ))}

                      {(() => {
                        const cx = 200;
                        const cy = 120;
                        const len = 60;
                        const rad = (dipoleAngle * Math.PI) / 180;
                        const x1 = cx - len * Math.cos(rad);
                        const y1 = cy - len * Math.sin(rad);
                        const x2 = cx + len * Math.cos(rad);
                        const y2 = cy + len * Math.sin(rad);
                        return (
                          <g>
                            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#cbd5e1" strokeWidth="4" />
                            <circle cx={x1} cy={y1} r="14" fill="#38bdf8" />
                            <text x={x1} y={y1 + 4} textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">-q</text>
                            <line x1={x1} y1={y1} x2={x1 - 35} y2={y1} stroke="#38bdf8" strokeWidth="3" />
                            <polygon points={`${x1 - 35},${y1 - 4} ${x1 - 45},${y1} ${x1 - 35},${y1 + 4}`} fill="#38bdf8" />

                            <circle cx={x2} cy={y2} r="14" fill="#f43f5e" />
                            <text x={x2} y={y2 + 4} textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">+q</text>
                            <line x1={x2} y1={y2} x2={x2 + 35} y2={y2} stroke="#f43f5e" strokeWidth="3" />
                            <polygon points={`${x2 + 35},${y2 - 4} ${x2 + 45},${y2} ${x2 + 35},${y2 + 4}`} fill="#f43f5e" />
                          </g>
                        );
                      })()}
                    </svg>

                    <div className="space-y-4">
                      <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                        <label htmlFor="dipole-slider" className="text-xs font-bold text-slate-400 block mb-2">
                          Dipole Angle θ with E: {dipoleAngle}°
                        </label>
                        <input
                          id="dipole-slider"
                          aria-label="Dipole Angle Slider"
                          type="range"
                          min={0}
                          max={180}
                          step={5}
                          value={dipoleAngle}
                          onChange={(e) => handleDipoleAngleChange(Number(e.target.value))}
                          className="w-full accent-cyan-500 cursor-pointer"
                        />
                      </div>

                      <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                        <div className="flex justify-between text-xs text-slate-300">
                          <span>Net Force F_net:</span>
                          <span className="font-mono text-emerald-400 font-bold">0.00 N (Zero Translation)</span>
                        </div>
                        <div className="flex justify-between text-xs text-slate-300">
                          <span>Torque τ = pE sin θ:</span>
                          <span className="font-mono text-cyan-400 font-bold">{dipolePhysics.torqueFormatted}</span>
                        </div>
                        <div className="flex justify-between text-xs text-slate-300">
                          <span>Potential Energy U = -pE cos θ:</span>
                          <span className="font-mono text-purple-400 font-bold">{dipolePhysics.energyFormatted}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-between pt-2">
            <motion.button
              aria-label="Previous Lab"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setCurrentSlide((s) => Math.max(0, s - 1))}
              disabled={currentSlide === 0}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs disabled:opacity-40"
            >
              ← Previous Lab
            </motion.button>

            <div className="flex gap-1.5">
              {EXPLORATION_STEPS.map((_, i) => (
                <div
                  key={i}
                  className={`h-2 rounded-full transition-all ${
                    currentSlide === i ? 'w-6 bg-cyan-400' : 'w-2 bg-slate-800'
                  }`}
                />
              ))}
            </div>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                aria-label="Next Lab"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setCurrentSlide((s) => s + 1)}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                aria-label="Enter Sandbox Mode"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg"
              >
                Enter Sandbox Mode →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: FREE SANDBOX PLAY ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-cyan-300">Free Exploration Sandbox</h2>
              <p className="text-xs text-slate-400">Tweak any electrostatic parameter freely with no scoring or timer pressure.</p>
            </div>
            <motion.button
              aria-label="Proceed to Challenges"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleAdvanceToChallenge}
              className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white font-bold text-xs rounded-xl shadow-lg"
            >
              I am Ready for Challenges! →
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
              <label htmlFor="q1-sandbox" className="text-xs font-bold text-slate-400">Charge Q₁: {coulombQ1} μC</label>
              <input id="q1-sandbox" aria-label="Charge Q1 Slider" type="range" min={-10} max={10} step={1} value={coulombQ1} onChange={(e) => setCoulombQ1(Number(e.target.value))} className="w-full accent-cyan-500" />
              <label htmlFor="q2-sandbox" className="text-xs font-bold text-slate-400">Charge Q₂: {coulombQ2} μC</label>
              <input id="q2-sandbox" aria-label="Charge Q2 Slider" type="range" min={-10} max={10} step={1} value={coulombQ2} onChange={(e) => setCoulombQ2(Number(e.target.value))} className="w-full accent-cyan-500" />
            </div>

            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
              <label htmlFor="r-sandbox" className="text-xs font-bold text-slate-400">Separation r: {coulombDistance.toFixed(2)} m</label>
              <input id="r-sandbox" aria-label="Separation Distance Sandbox Slider" type="range" min={0.05} max={0.5} step={0.01} value={coulombDistance} onChange={(e) => setCoulombDistance(Number(e.target.value))} className="w-full accent-cyan-500" />
              <div className="text-xs text-amber-400 font-mono mt-3">Force: {calculatedCoulombForce.formatted} ({calculatedCoulombForce.isRepulsive ? 'Repulsion' : 'Attraction'})</div>
            </div>

            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
              <label htmlFor="angle-sandbox" className="text-xs font-bold text-slate-400">Dipole Angle: {dipoleAngle}°</label>
              <input id="angle-sandbox" aria-label="Dipole Angle Sandbox Slider" type="range" min={0} max={180} step={5} value={dipoleAngle} onChange={(e) => setDipoleAngle(Number(e.target.value))} className="w-full accent-cyan-500" />
              <div className="text-xs text-purple-400 font-mono mt-3">Torque: {dipolePhysics.torqueFormatted}</div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGE STAGE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs uppercase font-bold text-cyan-400 tracking-wider">
                Question {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <span className="ml-2 text-xs font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                Competency: {activeChallenge.competencyLevel}
              </span>
            </div>
            <div className="text-xs font-bold text-slate-300">
              Score: <span className="text-emerald-400">{scoreBreakdown.correct}</span> / {scoreBreakdown.total}
            </div>
          </div>

          <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-emerald-500"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
            />
          </div>

          {(activeChallenge.type === 'classify' || activeChallenge.type === 'distinguish' || activeChallenge.type === 'match') && (
            <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
              <p className="text-white font-semibold text-base leading-relaxed">{activeChallenge.question}</p>

              <div className="space-y-3">
                {activeChallenge.options?.map((opt, i) => (
                  <motion.button
                    key={i}
                    aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={wrongShake ? { duration: 0.4 } : {}}
                    onClick={() => handleAnswer(i)}
                    disabled={showExplanation || answerRevealed}
                    className={`w-full text-left p-4 rounded-xl text-sm font-medium transition-all ${
                      wrongFlash
                        ? 'bg-rose-950/70 border-2 border-rose-500 text-rose-200'
                        : showExplanation && i === activeChallenge.correctIndex
                        ? 'bg-emerald-950/80 border-2 border-emerald-500 text-emerald-200 shadow-lg shadow-emerald-950/50'
                        : 'bg-slate-800/80 hover:bg-slate-700/90 border border-slate-700 text-slate-200'
                    }`}
                  >
                    <span className="font-mono text-cyan-400 mr-2">[{String.fromCharCode(65 + i)}]</span>
                    {showExplanation && i === activeChallenge.correctIndex && <span className="text-emerald-400 font-bold mr-1">✓ </span>}
                    {opt}
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {activeChallenge.type === 'drag-label' && (
            <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
              <p className="text-white font-semibold text-base">{activeChallenge.question}</p>

              <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                {activeChallenge.dragItems?.map((item, i) => (
                  <motion.div
                    key={i}
                    role="button"
                    tabIndex={0}
                    aria-label={`Draggable item: ${item.label}`}
                    draggable
                    onDragStart={() => handleDragStart(item.label)}
                    whileHover={{ scale: 1.04 }}
                    className="px-3 py-1.5 bg-indigo-700 text-white rounded-lg text-xs font-bold cursor-grab active:cursor-grabbing shadow"
                  >
                    {item.label}
                  </motion.div>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {['slot_1d', 'slot_2d', 'slot_3d'].map((slotId, i) => (
                  <div
                    key={slotId}
                    aria-label={`Drop slot for ${i === 0 ? '1D Line' : i === 1 ? '2D Surface' : '3D Volume'}`}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDragDrop(slotId)}
                    className="p-4 bg-slate-950 rounded-xl border-2 border-dashed border-slate-700 flex flex-col items-center justify-center min-h-[100px] text-center"
                  >
                    <span className="text-[11px] font-bold text-slate-500 uppercase mb-1">
                      {i === 0 ? '1D Line' : i === 1 ? '2D Surface' : '3D Volume'}
                    </span>
                    <span className="text-xs font-bold text-cyan-400">
                      {droppedLabels[slotId] ? `✓ ${droppedLabels[slotId]}` : 'Drop Density Here'}
                    </span>
                  </div>
                ))}
              </div>

              <motion.button
                aria-label="Check Density Mappings"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleAnswer(droppedLabels)}
                className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs rounded-xl"
              >
                Check Density Mappings
              </motion.button>
            </div>
          )}

          {activeChallenge.type === 'drag-sort' && (
            <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
              <p className="text-white font-semibold text-base">{activeChallenge.question}</p>

              <div className="space-y-2">
                {(sortArrangement.length === activeChallenge.sortItems?.length
                  ? sortArrangement.map((idx) => activeChallenge.sortItems![idx])
                  : activeChallenge.sortItems
                )?.map((item, idx) => (
                  <motion.div
                    key={idx}
                    role="button"
                    tabIndex={0}
                    aria-label={`Sortable step ${idx + 1}: ${item}`}
                    draggable
                    onDragStart={() => setDraggedItem(String(idx))}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => {
                      const from = parseInt(draggedItem || '0');
                      handleSortMove(from, idx);
                    }}
                    whileHover={{ scale: 1.01 }}
                    className="p-3.5 bg-slate-800 rounded-xl border border-slate-700 text-slate-200 text-xs font-medium cursor-grab flex items-center gap-2"
                  >
                    <span className="p-1 bg-slate-900 text-cyan-400 font-mono rounded text-[10px] font-bold">
                      #{idx + 1}
                    </span>
                    {item}
                  </motion.div>
                ))}
              </div>

              <motion.button
                aria-label="Verify Chronological Order"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleSortSubmit}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl"
              >
                Verify Chronological Order
              </motion.button>
            </div>
          )}

          {activeChallenge.type === 'numeric' && (
            <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
              <p className="text-white font-semibold text-base">{activeChallenge.question}</p>

              <div className="flex items-center gap-3 max-w-md">
                <input
                  aria-label="Numeric magnitude input"
                  type="number"
                  step={0.01}
                  value={numericInput}
                  onChange={(e) => setNumericInput(e.target.value)}
                  placeholder="Enter numeric magnitude"
                  className="flex-1 p-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-cyan-500"
                />
                <span className="text-sm font-bold text-cyan-400">{activeChallenge.unit}</span>
                <motion.button
                  aria-label="Submit Value"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(numericInput)}
                  className="px-5 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs rounded-xl"
                >
                  Submit Value
                </motion.button>
              </div>
            </div>
          )}

          {activeChallenge.type === 'construct' && (
            <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
              <p className="text-white font-semibold text-base">{activeChallenge.question}</p>
              <p className="text-xs text-slate-400">{activeChallenge.validationHint}</p>

              <div className="flex flex-wrap gap-2">
                {activeChallenge.availableParts?.map((part, i) => (
                  <motion.button
                    key={i}
                    aria-label={`Add part ${part}`}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setConstructParts((prev) => [...prev, part])}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-cyan-300 rounded-lg text-xs font-mono font-bold"
                  >
                    + {part}
                  </motion.button>
                ))}
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[60px] flex flex-wrap items-center gap-2">
                {constructParts.map((p, i) => (
                  <span key={i} className="px-2.5 py-1 bg-indigo-900/80 border border-indigo-700 rounded text-xs font-mono text-white flex items-center gap-1">
                    {p}
                    <button aria-label={`Remove part ${p}`} onClick={() => setConstructParts((prev) => prev.filter((_, idx) => idx !== i))} className="text-rose-400 hover:text-rose-300">✕</button>
                  </span>
                ))}
                {constructParts.length === 0 && <span className="text-xs text-slate-600">Click blocks above to construct the derivation</span>}
              </div>

              <motion.button
                aria-label="Validate Formula Construct"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleAnswer(constructParts.join(' '))}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl"
              >
                Validate Formula Construct
              </motion.button>
            </div>
          )}

          {showExplanation && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-6 bg-gradient-to-br from-indigo-950/70 to-slate-900 rounded-2xl border border-indigo-700 space-y-4">
              <h3 className="text-sm font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-2">
                <span aria-hidden="true">📘</span> Step-by-Step Rigorous Physics Solution:
              </h3>

              <div className="space-y-2">
                {activeChallenge.explanation.split('. ').filter((s) => s.trim().length > 0).slice(0, revealedSteps + 1).map((sentence, idx) => (
                  <motion.p key={idx} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                    <span className="font-bold text-cyan-400 mr-1.5">Step {idx + 1}:</span>
                    {sentence}{!sentence.endsWith('.') && '.'}
                  </motion.p>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2">
                {revealedSteps < activeChallenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 ? (
                  <motion.button
                    aria-label="Reveal Next Step"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setRevealedSteps((s) => s + 1)}
                    className="px-4 py-2 bg-indigo-700 hover:bg-indigo-600 text-white text-xs font-bold rounded-lg"
                  >
                    Reveal Next Step →
                  </motion.button>
                ) : (
                  <motion.button
                    aria-label="Next Question or Finalize"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={handleNextChallenge}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-950/50"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Laboratory Assessment →' : 'Next Question →'}
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION & REAL-WORLD SYNTHESIS ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-emerald-950/80 via-slate-900 to-slate-950 rounded-3xl border border-emerald-700/80 text-center space-y-3">
            <h2 className="text-2xl font-black text-white">Electrostatics Mastery Attained!</h2>
            
            {/* MOTIVATIONAL FEEDBACK */}
            <div className="text-lg font-extrabold text-amber-300">
              {errors === 0
                ? 'PERFECT SCORE!'
                : errors >= 1 && errors <= 3
                ? 'Great work!'
                : errors >= 4 && errors <= 7
                ? 'Good effort!'
                : 'Do not give up — You WILL get this!'}
            </div>

            <p className="text-base text-emerald-300 font-bold">
              Final Score: {Math.max(0, 100 - errors * 5)}% • Mastery Level: {masteryLevel.toUpperCase()}
            </p>
            <p className="text-xs text-slate-400 max-w-xl mx-auto">
              {errors === 0
                ? 'Flawless execution! You demonstrated comprehensive mastery of charge quantisation, Coulomb superposition, continuous charge distributions, and dipole dynamics.'
                : 'Excellent diagnostic effort. Review your misconception profile below to solidify ISC board exam preparation.'}
            </p>
          </div>

          {/* REFLECTION SECTION */}
          <div className="p-6 bg-slate-900/90 rounded-2xl border border-indigo-700/60 space-y-4">
            <h3 className="text-sm font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-2">
              <span aria-hidden="true">🤔</span> Post-Simulation Reflections
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <p className="text-xs font-bold text-cyan-400">1. Key Surprise</p>
                <p className="text-xs text-slate-300">What was the most surprising thing you learned?</p>
              </div>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <p className="text-xs font-bold text-indigo-400">2. Conceptual Framing</p>
                <p className="text-xs text-slate-300">How would you explain this to a friend?</p>
              </div>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <p className="text-xs font-bold text-emerald-400">3. Practical Application</p>
                <p className="text-xs text-slate-300">Where in real life might you use this?</p>
              </div>
            </div>
          </div>

          {/* Misconception Gaps Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-6 bg-rose-950/40 rounded-2xl border border-rose-800 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 uppercase tracking-wider flex items-center gap-2">
                <span aria-hidden="true">⚠️</span> Target Areas for Revision:
              </h3>
              {hitMisconceptions.map((idx) => {
                const item = misconceptions?.[idx];
                if (!item) return null;
                return (
                  <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
                    <p className="text-rose-400 font-bold">✗ Misconception: {item.misconception}</p>
                    <p className="text-emerald-400 font-medium">✓ Physical Truth: {item.correction}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Spaced Repetition Notification */}
          <div className="p-4 bg-amber-950/40 border border-amber-700/60 rounded-2xl text-xs text-slate-300 flex items-center justify-between">
            <div>
              <span className="font-bold text-amber-300 block">Spaced Repetition (SM-2):</span>
              Next scheduled conceptual review in {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}.
            </div>
            <span className="text-lg" aria-hidden="true">📅</span>
          </div>

          {/* Real-World Activity Arc */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-2">
              <span aria-hidden="true">🏭</span> {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="space-y-1.5 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((st, i) => (
                <div key={i} className="text-xs text-slate-400 flex items-start gap-2">
                  <span className="font-mono text-cyan-400 font-bold">{i + 1}.</span>
                  <span>{st}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── SIMULATION ENGINE NOTIFICATIONS & FX ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Accomplished!" onComplete={() => setShowSuccess(false)} />}
      {showSparkles && <SparkleBurst x={0} y={0} onComplete={() => setShowSparkles(false)} />}
    </div>
  );
}

export default C12_PhysicsElectricChargestypesSim;