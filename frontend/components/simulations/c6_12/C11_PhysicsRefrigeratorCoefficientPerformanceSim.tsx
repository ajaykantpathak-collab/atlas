'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── REQUIRED NODE CONSTANTS ───
const NODE_C11_PHY_101 = 'c11_phy_101'; // Refrigerator and coefficient of performance
const NODE_C11_PHY_102 = 'c11_phy_102'; // SHM of spring-mass systems
const NODE_C11_PHY_103 = 'c11_phy_103'; // Rolling motion (pure rolling & slipping)
const NODE_C11_PHY_104 = 'c11_phy_104'; // Two-dimensional collisions (oblique impact)
const NODE_C11_PHY_105 = 'c11_phy_105'; // Torricelli's theorem and velocity of efflux
const NODE_C11_PHY_106 = 'c11_phy_106'; // Non-inertial frames and pseudo force
const NODE_C11_PHY_107 = 'c11_phy_107'; // Law of limiting factors (Blackman's law)

const ALL_NODE_IDS = [
  NODE_C11_PHY_101,
  NODE_C11_PHY_102,
  NODE_C11_PHY_103,
  NODE_C11_PHY_104,
  NODE_C11_PHY_105,
  NODE_C11_PHY_106,
  NODE_C11_PHY_107,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'ISRO Cryogenic & Advanced Mechanics Research Laboratory',
  intro: 'Welcome, Lead Physicist. You are stationed at the Vikram Sarabhai Space Centre (VSSC) in Thiruvananthapuram. Your mission is to calibrate the cryogenic thermal management units, tune harmonic dampeners, formulate satellite docking collision trajectories, verify propellant tank efflux velocities, analyze non-inertial frame payloads, and simulate limiting factor kinetics for bioregenerative life support systems.',
  context: 'The deep-space propulsion simulator requires rigorous validation across classical thermodynamics, harmonic mechanics, rigid body dynamics, fluid dynamics, and non-inertial reference systems.',
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question: 'If a cryogenic refrigerator extracts 600 J of thermal energy from an internal cold chamber at 250 K while the compressor consumes only 100 J of electrical work, what is its Coefficient of Performance (COP, α), and is COP > 1 thermodynamically possible?',
  options: [
    'COP = 0.17 (Impossible to exceed 1.0 due to the First Law of Thermodynamics)',
    'COP = 6.0 (Yes, COP can easily exceed 1.0 because heat extracted can exceed paid electrical work without violating energy conservation)',
    'COP = 0.83 (Limited strictly by the Carnot heat engine thermal efficiency ceiling)',
    'COP = 5.0 (Work must be subtracted from heat extracted rather than divided)',
  ],
  correctIndex: 1,
  hintAfter: 'Unlike thermal efficiency (Work Output / Heat Input < 1), the Coefficient of Performance is defined as (Heat Extracted / Work Input) and can routinely exceed 1.0 without violating the First or Second Law of Thermodynamics!',
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

// ─── 26 MULTI-CONCEPT CHALLENGES (Foundation, Standard, Advanced) ───
const CHALLENGES: Challenge[] = [
  // ─── FOUNDATION ───
  {
    id: 'ch_01',
    nodeId: NODE_C11_PHY_101,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the correct fundamental thermodynamic definition of the Coefficient of Performance (COP, α) for a refrigerator?',
    options: [
      'α = W / Q₁ (Work done divided by total heat rejected)',
      'α = Q₂ / W = Q₂ / (Q₁ - Q₂)',
      'α = 1 - (T₂ / T₁)',
      'α = (Q₁ + Q₂) / W',
    ],
    correctIndex: 1,
    explanation: 'The Coefficient of Performance (COP, α) is the ratio of useful refrigeration effect (heat extracted from the cold reservoir, Q₂) to the external work input consumed (W). By energy conservation (First Law), Q₁ = Q₂ + W, so W = Q₁ - Q₂, giving α = Q₂ / (Q₁ - Q₂).',
    hints: [
      'COP represents what you get (cooling) divided by what you pay for (electrical work).',
      'The heat extracted from the cold reservoir is designated as Q₂ and compressor work as W.',
      'Recall that α = Q₂ / W where W = Q₁ - Q₂.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_02',
    nodeId: NODE_C11_PHY_101,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag each thermodynamic energy term to its corresponding stage in the refrigeration cycle diagram.',
    dragItems: [
      { label: 'Q₂ (Heat In from Cold Chamber)', targetId: 'box_cold' },
      { label: 'W (Compressor Work Input)', targetId: 'box_work' },
      { label: 'Q₁ (Heat Rejected to Ambient)', targetId: 'box_hot' },
    ],
    correctMapping: {
      box_cold: 'Q₂ (Heat In from Cold Chamber)',
      box_work: 'W (Compressor Work Input)',
      box_hot: 'Q₁ (Heat Rejected to Ambient)',
    },
    explanation: 'Heat Q₂ enters the working fluid from the cold interior evaporator coils. External work W is supplied via the mechanical compressor. The total thermal energy Q₁ = Q₂ + W is discharged into the warmer ambient surroundings via condenser coils.',
    hints: [
      'The cold storage space yields heat Q₂ into the working substance.',
      'The electric compressor injects mechanical work W to drive thermal transfer uphill.',
      'The external environment receives the combined sum Q₁ = Q₂ + W.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_03',
    nodeId: NODE_C11_PHY_102,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'A mass m hangs vertically from an ideal massless spring of stiffness k in a uniform gravitational field g. How does gravity affect the oscillation period T?',
    options: [
      'T increases because downward gravity adds a continuous accelerating force mg.',
      'T decreases because gravity increases the frequency of oscillation.',
      'T remains exactly 2π√(m/k) because gravity only displaces the equilibrium position by x₀ = mg/k.',
      'T becomes dependent on the initial oscillation amplitude.',
    ],
    correctIndex: 2,
    explanation: 'Gravity introduces a constant downward force mg which shifts the static equilibrium position downward by x₀ = mg/k. When displaced by an additional distance y from this new equilibrium, the net restoring force is F_net = mg - k(x₀ + y) = -ky. Because d²y/dt² = -(k/m)y, the time period remains T = 2π√(m/k), completely independent of g.',
    hints: [
      'Does a constant force like mg alter the spring stiffness slope dF/dy?',
      'At equilibrium, the spring tension kx₀ balances mg exactly.',
      'The differential equation of motion about equilibrium is m(d²y/dt²) + ky = 0.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_04',
    nodeId: NODE_C11_PHY_103,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'In pure rolling motion without slipping on a horizontal planar surface, what is the instantaneous linear velocity of the contact point?',
    options: [
      'v = v_cm directed forward',
      'v = 2 v_cm directed forward',
      'v = 0 (instantaneously at rest relative to the supporting surface)',
      'v = Rω directed backward',
    ],
    correctIndex: 2,
    explanation: 'In pure rolling, the forward translational velocity of the center of mass (v_cm) is exactly cancelled at the bottom contact point by the backward tangential rotational velocity (Rω). Because v_cm = Rω, v_contact = v_cm - Rω = 0. Therefore, the contact point is instantaneously stationary relative to the ground, meaning static friction does zero work.',
    hints: [
      'The body translates forward with v_cm and rotates clockwise with angular speed ω.',
      'At the bottom contact point, clockwise rotation moves backward with speed Rω.',
      'Since v_cm = Rω for no slipping, the forward and backward velocity vectors sum to zero.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_05',
    nodeId: NODE_C11_PHY_105,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'Water flows out of an open liquid tank through a small orifice situated 5.0 m below the free surface. Calculate the velocity of efflux in m/s (use g = 9.8 m/s²).',
    correctAnswer: 9.9,
    tolerance: 0.2,
    unit: 'm/s',
    explanation: 'By Torricelli\'s theorem derived from Bernoulli\'s equation for an open reservoir, the velocity of efflux is v = √(2gh) = √(2 × 9.8 × 5.0) = √98 ≈ 9.899 m/s ≈ 9.9 m/s.',
    hints: [
      'Apply Torricelli\'s formula: v = √(2gh).',
      'Substitute g = 9.8 m/s² and h = 5.0 m.',
      'Evaluate √(2 × 9.8 × 5.0) = √(98) ≈ 9.9 m/s.',
    ],
    misconceptionIndex: 5,
  },
  {
    id: 'ch_06',
    nodeId: NODE_C11_PHY_106,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In a reference frame translating with linear acceleration a_frame, what is the magnitude and direction of the pseudo (fictitious) force acting on an object of mass m?',
    options: [
      'F_pseudo = +m a_frame in the exact direction of the frame acceleration',
      'F_pseudo = -m a_frame directed opposite to the frame acceleration',
      'F_pseudo = m(g + a_frame) directed strictly downward',
      'F_pseudo = 0 because forces must always arise from physical interaction agents',
    ],
    correctIndex: 1,
    explanation: 'To apply Newton\'s Second Law in a non-inertial reference frame, an inertial observer correction force F_pseudo = -m a_frame must be introduced. This pseudo force acts on every mass element in the direction opposite to the frame acceleration vector.',
    hints: [
      'When a vehicle accelerates forward, in which direction do passengers feel pushed?',
      'Passengers experience a backward inertial push opposite to acceleration.',
      'Hence, the pseudo force vector is F_pseudo = -m a_frame.',
    ],
    misconceptionIndex: 6,
  },
  {
    id: 'ch_07',
    nodeId: NODE_C11_PHY_107,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: "According to Blackman's Law of Limiting Factors (1905), what dictates the overall rate of a multi-variable biochemical or physical process?",
    options: [
      'The arithmetic mean of all environmental variables interacting simultaneously.',
      'The variable present in the highest abundance relative to system requirements.',
      'The single factor present in the most deficient quantity relative to its requirement (the bottleneck factor).',
      'The mathematical product of all interacting physical parameters.',
    ],
    correctIndex: 2,
    explanation: 'Blackman\'s Law states that when a process depends on multiple independent factors, its rate is governed by the factor operating at the minimum pace relative to its optimum. Mathematically, Rate = min{R₁(f₁), R₂(f₂), ..., Rₙ(fₙ)}. The slowest kinetic step establishes the maximum upper threshold.',
    hints: [
      'Consider the classic analogy of the weakest link in a chain.',
      'If light intensity is abundant but CO₂ concentration is zero, what is the process rate?',
      'The factor in shortest supply acts as the pace-limiting bottleneck.',
    ],
    misconceptionIndex: 7,
  },

  // ─── STANDARD ───
  {
    id: 'ch_08',
    nodeId: NODE_C11_PHY_101,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A Carnot cryogenic refrigerator maintains -23°C (250 K) internally while exhausting heat into an ambient lab at 27°C (300 K). What is its ideal Carnot COP (α)?',
    correctAnswer: 5.0,
    tolerance: 0.1,
    unit: 'dimensionless',
    explanation: 'The theoretical maximum Carnot COP for a refrigerator is α = T₂ / (T₁ - T₂). Here T₂ = 250 K and T₁ = 300 K. Therefore, α = 250 / (300 - 250) = 250 / 50 = 5.0.',
    hints: [
      'Verify that temperatures are expressed in Kelvin: T₂ = 250 K and T₁ = 300 K.',
      'Use the Carnot COP formula: α = T₂ / (T₁ - T₂).',
      'Compute: 250 / (300 - 250) = 250 / 50 = 5.0.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_09',
    nodeId: NODE_C11_PHY_101,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A Carnot heat engine operating between two fixed thermal reservoirs has an efficiency η = 0.20 (20%). If this engine is operated in reverse as a Carnot refrigerator between the same reservoirs, what is its COP (α)?',
    options: [
      'α = 0.80',
      'α = 4.0',
      'α = 5.0',
      'α = 0.25',
    ],
    correctIndex: 1,
    explanation: 'The fundamental thermodynamic relationship connecting Carnot engine efficiency η and Carnot refrigerator COP α across identical reservoirs is α = (1 - η) / η. Substituting η = 0.20 yields α = (1 - 0.20) / 0.20 = 0.80 / 0.20 = 4.0.',
    hints: [
      'Recall that η = (T₁ - T₂) / T₁ and α = T₂ / (T₁ - T₂).',
      'Notice that 1/η = T₁ / (T₁ - T₂) = 1 + T₂ / (T₁ - T₂) = 1 + α.',
      'Hence α = (1/η) - 1 = (1 / 0.20) - 1 = 5 - 1 = 4.0.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_10',
    nodeId: NODE_C11_PHY_102,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Two identical ideal springs, each of stiffness k = 200 N/m, are connected in SERIES to a mass m = 2 kg. What is the oscillation time period T in seconds? (Take π ≈ 3.1416)',
    correctAnswer: 0.89,
    tolerance: 0.05,
    unit: 's',
    explanation: 'For two springs in series, 1/k_eff = 1/k₁ + 1/k₂ = 1/200 + 1/200 = 2/200, so k_eff = 100 N/m. The oscillation period is T = 2π√(m/k_eff) = 2π√(2 / 100) = 2π√(0.02) = 2π × 0.14142 ≈ 0.8886 s ≈ 0.89 s.',
    hints: [
      'Calculate the series effective spring stiffness: 1/k_eff = 1/k + 1/k ⇒ k_eff = k / 2.',
      'Substitute k = 200 N/m to find k_eff = 100 N/m.',
      'Evaluate T = 2π√(2 / 100) ≈ 2 × 3.1416 × 0.1414 ≈ 0.89 s.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_11',
    nodeId: NODE_C11_PHY_103,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange these four rigid bodies in order of their linear acceleration down an inclined plane during pure rolling (FASTEST acceleration to SLOWEST acceleration):',
    sortItems: [
      'Solid Sphere (k²/R² = 2/5 = 0.40)',
      'Solid Disc (k²/R² = 1/2 = 0.50)',
      'Hollow Spherical Shell (k²/R² = 2/3 ≈ 0.67)',
      'Thin Circular Ring / Hoop (k²/R² = 1.00)',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'For pure rolling down an incline of angle θ, linear acceleration is a = g sinθ / (1 + k²/R²). A smaller value of the dimensionless rotational inertia factor k²/R² diverts less gravitational potential energy into rotational kinetic energy, leaving more for translational acceleration. Since 0.40 < 0.50 < 0.67 < 1.00, the acceleration hierarchy is Solid Sphere (5/7 g sinθ ≈ 0.71) > Disc (2/3 g sinθ ≈ 0.67) > Hollow Sphere (3/5 g sinθ = 0.60) > Ring (1/2 g sinθ = 0.50).',
    hints: [
      'Use the pure rolling acceleration relation: a = g sinθ / (1 + k²/R²).',
      'The smallest k²/R² fraction yields the largest linear acceleration.',
      'Compare: 0.40 (Solid Sphere) < 0.50 (Disc) < 0.67 (Hollow Sphere) < 1.00 (Ring).',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_12',
    nodeId: NODE_C11_PHY_104,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'In an elastic two-dimensional oblique collision (coefficient of restitution e = 1) between two identical smooth spheres where one sphere is initially at rest, what is the angle between their post-collision velocity vectors?',
    options: [
      '0° (they move collinearly parallel)',
      '45°',
      '90° (they scatter perpendicularly at right angles)',
      '180° (they bounce directly backward along the impact line)',
    ],
    correctIndex: 2,
    explanation: 'Along the common tangent of smooth spheres, no impulsive forces act, so sphere 1 retains its initial tangential velocity (v₁ₜ = u₁ₜ) while sphere 2 has zero tangential velocity (v₂ₜ = 0). Along the normal line of impact, identical masses undergo a 1D elastic collision, completely swapping normal components: v₁ₙ = 0 and v₂ₙ = u₁ₙ. Consequently, vector v₁ is entirely tangential while vector v₂ is entirely normal. Because the tangent and normal lines are perpendicular, v₁ · v₂ = 0 and the scattering angle is exactly 90°.',
    hints: [
      'Tangential momentum is conserved independently for each smooth sphere.',
      'Along the normal line of impact, equal masses swap normal velocity components in an elastic collision.',
      'Sphere 1 moves purely along the tangent line, Sphere 2 moves purely along the normal line; these axes are perpendicular (90°).',
    ],
    misconceptionIndex: 8,
  },
  {
    id: 'ch_13',
    nodeId: NODE_C11_PHY_105,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A vertical cylindrical liquid container of total height H rests on a flat floor. An orifice is punctured at depth h below the free liquid surface. At what depth h does the emerging horizontal liquid jet attain its MAXIMUM horizontal range R on the floor?',
    options: [
      'h = H (at the base, where efflux velocity is maximum)',
      'h = H / 2 (midway along the liquid column height)',
      'h = H / 4',
      'h = 3H / 4',
    ],
    correctIndex: 1,
    explanation: 'Efflux velocity is v = √(2gh) and the vertical height of the hole above the floor is (H - h). The time of flight before hitting the ground is t = √(2(H - h) / g). The horizontal range is R = v × t = √(2gh) × √(2(H - h)/g) = 2√(h(H - h)). To maximize R(h), we maximize the quadratic f(h) = hH - h². Taking df/dh = H - 2h = 0 yields h = H / 2, producing maximum range R_max = H.',
    hints: [
      'Efflux speed increases with depth h, but time of free fall decreases with remaining height (H - h).',
      'Range formula: R = 2√(h(H - h)).',
      'The symmetric product h(H - h) reaches its absolute maximum when both factors are equal: h = H - h ⇒ h = H / 2.',
    ],
    misconceptionIndex: 5,
  },
  {
    id: 'ch_14',
    nodeId: NODE_C11_PHY_106,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'An ISRO payload engineer of mass m = 70 kg stands on a precision force scale inside a rocket capsule accelerating vertically upward at a = 14.0 m/s². What is the scale reading in Newtons? (Use g = 9.8 m/s²)',
    correctAnswer: 1666,
    tolerance: 10,
    unit: 'N',
    explanation: 'In the non-inertial frame of the upwardly accelerating rocket, a downward pseudo force F_pseudo = -ma acts on the engineer. The upward normal contact force from the scale is N = mg + ma = m(g + a) = 70 × (9.8 + 14.0) = 70 × 23.8 = 1666 N.',
    hints: [
      'In an upward accelerating reference frame, apparent weight is given by N = m(g + a).',
      'Calculate the effective acceleration: g + a = 9.8 + 14.0 = 23.8 m/s².',
      'Multiply by passenger mass: 70 kg × 23.8 m/s² = 1666 N.',
    ],
    misconceptionIndex: 6,
  },

  // ─── ADVANCED ───
  {
    id: 'ch_15',
    nodeId: NODE_C11_PHY_101,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A cryogenic refrigerator with a COP of α = 4.0 extracts 1200 J of heat from its cold chamber during a cycle. What total thermal energy Q₁ (in Joules) is exhausted into the high-temperature environment?',
    correctAnswer: 1500,
    tolerance: 10,
    unit: 'J',
    explanation: 'By definition of COP, α = Q₂ / W. Rearranging for compressor work: W = Q₂ / α = 1200 / 4.0 = 300 J. By the First Law of Thermodynamics, heat rejected Q₁ = Q₂ + W = 1200 J + 300 J = 1500 J.',
    hints: [
      'Find the external compressor work input using W = Q₂ / α.',
      'W = 1200 J / 4.0 = 300 J.',
      'Apply First Law energy conservation: Q₁ = Q₂ + W = 1200 + 300 = 1500 J.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_16',
    nodeId: NODE_C11_PHY_102,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Construct the exact angular frequency formula for a mass m suspended from a spring of stiffness k when the string passes over a massive pulley of moment of inertia I and radius R.',
    availableParts: ['ω =', '√[', 'k', '/', '(', 'm', '+', 'I/R²', ')', ']'],
    targetState: 'ω = √[ k / ( m + I/R² ) ]',
    validationHint: 'The massive pulley adds an equivalent rotational inertia term I/R² to the linear mass in the denominator.',
    explanation: 'Using total mechanical energy conservation: E = 1/2 k x² + 1/2 m v² + 1/2 I ω_pulley². Because the string rolls without slipping over the pulley, v = R ω_pulley, so E = 1/2 k x² + 1/2 (m + I/R²) v². Differentiating with respect to time yields (m + I/R²) a + kx = 0, giving angular frequency ω = √[k / (m + I/R²)].',
    hints: [
      'The expression begins with ω = √[ ... ]',
      'The restoring stiffness term k appears in the numerator.',
      'The effective inertia in the denominator is the sum of translational mass and pulley equivalent mass (m + I/R²).',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_17',
    nodeId: NODE_C11_PHY_103,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A solid uniform sphere (mass 2 kg, radius 0.1 m) is launched along a rough horizontal floor with initial translational speed v₀ = 7.0 m/s and zero initial spin (ω₀ = 0). If the kinetic friction coefficient is μ_k = 0.20 and g = 10 m/s², calculate the steady pure rolling speed v_cm in m/s.',
    correctAnswer: 5.0,
    tolerance: 0.1,
    unit: 'm/s',
    explanation: 'Kinetic friction f_k = μ_k m g acts backward, decelerating translation: a = -μ_k g = -2 m/s² ⇒ v(t) = 7 - 2t. Kinetic friction creates forward torque τ = f_k R, producing angular acceleration: α = (μ_k m g R) / (2/5 m R²) = (5 μ_k g) / (2 R) = (5 × 2) / (2 × 0.1) = 50 rad/s² ⇒ ω(t) = 50t. Pure rolling begins when v(t) = R ω(t) ⇒ 7 - 2t = 0.1(50t) = 5t ⇒ 7t = 7 ⇒ t = 1.0 s. At t = 1.0 s, v_cm = 7 - 2(1.0) = 5.0 m/s. (Alternatively, angular momentum conservation about ground point: m v₀ R = m v R + I ω = m v R + 2/5 m R² (v/R) = 7/5 m v R ⇒ v = 5/7 v₀ = 5/7 × 7 = 5.0 m/s).',
    hints: [
      'Write translational velocity vs time: v(t) = v₀ - μ_k g t.',
      'Write rotational angular speed vs time: ω(t) = [(5 μ_k g) / (2 R)] t.',
      'Equate v(t) = R ω(t) to solve for slip duration t = 1.0 s, then find v(1.0).',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_18',
    nodeId: NODE_C11_PHY_104,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A 2.0 kg sphere traveling at 20.0 m/s collides obliquely with a stationary 3.0 kg sphere. The line of impact is oriented at 60° to the incoming velocity vector. If the coefficient of restitution is e = 0.50, compute the total kinetic energy dissipated (lost) in Joules.',
    correctAnswer: 45.0,
    tolerance: 2.0,
    unit: 'J',
    explanation: 'Decompose the initial velocity: normal component u₁ₙ = 20 cos 60° = 10.0 m/s; tangential component u₁ₜ = 20 sin 60° = 10√3 m/s. For smooth spheres, tangential velocity is unaffected and incurs zero energy loss. Kinetic energy loss occurs entirely along the normal line of impact: ΔK = 1/2 × [m₁ m₂ / (m₁ + m₂)] × (u₁ₙ - u₂ₙ)² × (1 - e²) = 1/2 × [2 × 3 / (2 + 3)] × (10.0 - 0)² × (1 - 0.50²) = 1/2 × (6/5) × 100 × (1 - 0.25) = 0.6 × 100 × 0.75 = 45.0 J.',
    hints: [
      'Resolve incoming velocity along the normal line of impact: u₁ₙ = 20 cos 60° = 10 m/s.',
      'Tangential velocity undergoes zero kinetic energy dissipation.',
      'Apply reduced mass formula for 1D normal impact: ΔK = (1/2) μ (u₁ₙ)² (1 - e²), where μ = (2 × 3)/(2 + 3) = 1.2 kg.',
    ],
    misconceptionIndex: 8,
  },
  {
    id: 'ch_19',
    nodeId: NODE_C11_PHY_105,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A sealed fuel tank is filled with liquid of density ρ to depth h under an internal pressurization gauge overpressure P_gauge = P_inside - P_atm. What is the efflux velocity through a small nozzle at the tank base discharging into atmospheric pressure P_atm?',
    options: [
      'v = √(2gh)',
      'v = √[ 2gh + 2(P_inside - P_atm) / ρ ]',
      'v = √[ 2gh - 2 P_atm / ρ ]',
      'v = 2gh + (P_inside / ρ)',
    ],
    correctIndex: 1,
    explanation: 'Applying Bernoulli\'s equation between the top liquid surface (point 1) and the exit orifice (point 2): P_inside + ρgh + 1/2 ρ v₁² = P_atm + 0 + 1/2 ρ v₂². Since the surface area is much larger than the nozzle (A₁ >> A₂), v₁ ≈ 0. Thus: P_inside - P_atm + ρgh = 1/2 ρ v₂² ⇒ v₂² = 2gh + 2(P_inside - P_atm)/ρ ⇒ v = √[ 2gh + 2(P_inside - P_atm) / ρ ].',
    hints: [
      'Write Bernoulli\'s equation: P_top + ρgh = P_exit + 1/2 ρ v².',
      'Note that P_top = P_inside and P_exit = P_atm.',
      'Rearrange terms to isolate efflux velocity v on one side.',
    ],
    misconceptionIndex: 5,
  },
  {
    id: 'ch_20',
    nodeId: NODE_C11_PHY_106,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why do atmospheric tropical cyclones rotate counter-clockwise in the Northern Hemisphere and clockwise in the Southern Hemisphere?',
    options: [
      'Because of Earth\'s geomagnetic dipole field interacting with charged ionic cloud particles.',
      'Because the Coriolis pseudo force F_cor = -2m(ω × v_rel) deflects air moving toward low-pressure centers to the right in the North and to the left in the South.',
      'Because centrifugal pseudo force reverses direction across the equator.',
      'Because gravitational acceleration g varies with latitude due to Earth\'s equatorial bulge.',
    ],
    correctIndex: 1,
    explanation: 'In a rotating reference frame, moving masses experience the Coriolis pseudo force F_cor = -2m(ω × v_rel). Because Earth rotates from west to east (angular velocity vector points out of the North Pole), air moving toward a central low-pressure zone in the Northern Hemisphere is deflected to its right, establishing a counter-clockwise cyclone. In the Southern Hemisphere, the deflection is to the left, creating clockwise rotation.',
    hints: [
      'The Coriolis force acts on any mass possessing relative velocity within a rotating frame.',
      'Vector formulation: F_cor = -2m(ω × v_rel).',
      'In the Northern Hemisphere, rightward deflection around a low-pressure core generates counter-clockwise circulation.',
    ],
    misconceptionIndex: 6,
  },
  {
    id: 'ch_21',
    nodeId: NODE_C11_PHY_107,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'In a space habitat bioreactor, photosynthesis rate is measured as light intensity increases. At 2500 lux, the rate plateaus at 14 units. Increasing CO₂ from 0.03% to 0.08% lifts the rate to 26 units. Further raising temperature from 20°C to 30°C elevates it to 38 units. Which variable was limiting at the FIRST plateau?',
    options: [
      'Light intensity',
      'CO₂ concentration',
      'Temperature',
      'Enzyme ribulose-1,5-bisphosphate carboxylase concentration',
    ],
    correctIndex: 1,
    explanation: 'By Blackman\'s Law of Limiting Factors, because increasing light intensity beyond 2500 lux caused no change in rate (the plateau), light was no longer limiting. The fact that immediately raising CO₂ concentration lifted the plateau rate from 14 to 26 units proves definitively that CO₂ was the rate-limiting bottleneck factor at that juncture.',
    hints: [
      'If increasing a variable produces no rate increase, that variable is in excess and NOT limiting.',
      'The specific parameter whose increase unlocks a higher plateau rate is the limiting factor.',
      'Raising CO₂ unlocked the higher rate of 26 units.',
    ],
    misconceptionIndex: 7,
  },
  {
    id: 'ch_22',
    nodeId: NODE_C11_PHY_101,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'What happens to the Coefficient of Performance (COP) of a domestic refrigerator during hot summer months compared to winter?',
    options: [
      'COP increases because the ambient air conducts heat faster.',
      'COP decreases because the larger temperature difference (T₁ - T₂) forces the compressor to supply more work per Joule of heat extracted.',
      'COP remains constant because the interior setpoint temperature does not change.',
      'COP becomes negative due to thermal expansion of the refrigerant gas.',
    ],
    correctIndex: 1,
    explanation: 'Carnot COP is α = T₂ / (T₁ - T₂). In summer, room temperature T₁ rises, increasing the denominator (T₁ - T₂). Consequently, COP drops, requiring the electrical compressor to consume significantly more work W to pump each Joule of heat Q₂.',
    hints: [
      'Examine the denominator in α = T₂ / (T₁ - T₂).',
      'As ambient temperature T₁ increases, does (T₁ - T₂) increase or decrease?',
      'A larger temperature difference reduces the COP.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_23',
    nodeId: NODE_C11_PHY_102,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'If a spring-mass oscillator with stiffness k and mass m is cut exactly in half and one half is attached to the same mass m, what is the new oscillation frequency f\' relative to the original frequency f?',
    options: [
      'f\' = f / 2',
      'f\' = f / √2',
      'f\' = √2 × f',
      'f\' = 2f',
    ],
    correctIndex: 2,
    explanation: 'The spring constant of a spring is inversely proportional to its length (k ∝ 1/L). Cutting the spring in half doubles its stiffness: k\' = 2k. Since frequency is f = (1/2π)√(k/m), the new frequency is f\' = (1/2π)√(2k/m) = √2 × f ≈ 1.414 f.',
    hints: [
      'Recall how spring stiffness scales with length: k × L = constant.',
      'Halving the length doubles the spring constant: k\' = 2k.',
      'Since f ∝ √k, f\' = √(2k/m) = √2 × f.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_24',
    nodeId: NODE_C11_PHY_103,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A uniform wheel rolls without slipping up a rough incline. In which direction does the static friction force act on the wheel?',
    options: [
      'Downward along the incline, opposing translational motion.',
      'Upward along the incline, providing torque to oppose the reduction in angular velocity.',
      'Perpendicular to the incline surface.',
      'Zero, because static friction only acts when accelerating downhill.',
    ],
    correctIndex: 1,
    explanation: 'As the wheel moves uphill, gravity component mg sinθ decelerates translation (reducing v_cm). For pure rolling (v_cm = Rω), angular velocity ω must decrease at the matching rate α = a_cm / R. Gravity acts through the center of mass and produces zero torque about the center. Static friction f_s must act UP the incline to exert a counter-torque τ = f_s R that slows down the clockwise rotation. (Net translational force is mg sinθ - f_s downward).',
    hints: [
      'Gravity decelerates the center of mass, so v_cm decreases.',
      'To maintain v_cm = Rω, the rotation ω must also decrease.',
      'Gravity exerts zero torque about the center of mass, so static friction must provide the counter-clockwise torque to decelerate rotation: it must point up the incline.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_25',
    nodeId: NODE_C11_PHY_104,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In any two-dimensional collision between smooth spherical bodies, along which line does the impulsive contact force act?',
    options: [
      'Along the common tangent line at the point of contact.',
      'Along the common normal line joining the centers of mass at impact.',
      'Along the bisector of the two initial velocity vectors.',
      'Along the direction of the heavier object\'s initial momentum.',
    ],
    correctIndex: 1,
    explanation: 'For smooth (frictionless) spheres, contact forces can only be exerted perpendicular to the tangent plane at contact. Therefore, the impulsive force acts strictly along the common normal line (the line joining the sphere centers). Tangential momentum for each individual sphere is strictly conserved.',
    hints: [
      'Smooth surfaces cannot exert shear/tangential forces.',
      'Contact forces are normal contact forces.',
      'The normal vector connects the centers of the two spheres.',
    ],
    misconceptionIndex: 8,
  },
  {
    id: 'ch_26',
    nodeId: NODE_C11_PHY_105,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A large open reservoir of depth H = 8.0 m has an orifice opened at depth h = 2.0 m below the surface. What is the horizontal landing distance R (in meters) of the water jet on the ground plane at the base of the reservoir?',
    correctAnswer: 6.93,
    tolerance: 0.15,
    unit: 'm',
    explanation: 'Efflux velocity is v = √(2gh) = √(2 × 9.8 × 2.0) = √39.2 ≈ 6.261 m/s. The vertical distance to the ground is H - h = 8.0 - 2.0 = 6.0 m. Time of flight is t = √(2(H - h)/g) = √(2 × 6.0 / 9.8) = √(12/9.8) ≈ 1.107 s. Horizontal range R = v × t = 2√(h(H - h)) = 2√(2.0 × 6.0) = 2√12 = 4√3 ≈ 6.928 m ≈ 6.93 m.',
    hints: [
      'Use the horizontal range formula for efflux: R = 2√(h(H - h)).',
      'Substitute h = 2.0 m and H - h = 6.0 m.',
      'Calculate: R = 2√(2.0 × 6.0) = 2√12 = 4√3 ≈ 6.93 m.',
    ],
    misconceptionIndex: 5,
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
  nodeId: NODE_C11_PHY_101,
  title: 'Refrigerator & Coefficient of Performance (and Class 11 Mechanics Suite)',
  definition: 'A refrigerator is a reversed heat engine extracting heat Q₂ from a cold space with work input W, rejecting Q₁ = Q₂ + W to the surroundings. Performance is measured by COP α = Q₂/W = T₂/(T₁ - T₂).',
  eli5: 'Think of heat like water at the bottom of a hill (cold inside). A pump (compressor) uses electricity (work W) to push heat water up to the kitchen (hot outside). COP is how much water you lifted divided by how much electricity you paid for.',
  misconceptions: [
    { misconception: 'COP must be less than 1.0, just like thermal efficiency.', correction: 'COP = Q₂/W can easily exceed 1.0 (often 3 to 6) because work only compensates for the temperature gradient.' },
    { misconception: 'You can plug Celsius temperatures directly into Carnot COP formulas.', correction: 'Carnot thermodynamic formulas require absolute temperatures in Kelvin: T(K) = T(°C) + 273.15.' },
    { misconception: 'A vertical spring oscillates with a slower period than a horizontal spring due to gravity.', correction: 'Gravity only shifts the static equilibrium position by mg/k; the oscillation period T = 2π√(m/k) is completely unchanged.' },
    { misconception: 'Static friction always does negative mechanical work in pure rolling.', correction: 'In pure rolling, the instantaneous point of contact is at rest; static friction does zero net mechanical work.' },
    { misconception: 'Torricelli efflux velocity depends on the density of the liquid.', correction: 'In Torricelli\'s formula v = √(2gh), liquid density ρ cancels out entirely from Bernoulli\'s equation.' },
    { misconception: 'Pseudo forces are physical interaction forces with action-reaction pairs.', correction: 'Pseudo forces are fictitious coordinate transformation artifacts introduced to apply Newton\'s laws in accelerating non-inertial frames.' },
    { misconception: 'When multiple factors are deficient, all factors limit the rate simultaneously.', correction: 'By Blackman\'s Law, the single most deficient factor forms the kinetic bottleneck plateau.' },
    { misconception: 'In 2D oblique collisions, momentum is conserved in any arbitrary direction.', correction: 'Individual tangential momentum is conserved for each smooth sphere, but normal momentum is exchanged.' },
  ],
  diagnosticQuestions: [
    { question: 'What is the COP of an ideal Carnot refrigerator operating between 260 K and 300 K?', options: ['6.5', '0.86', '1.15', '5.0'], correctIndex: 0 },
    { question: 'If a spring-mass oscillator has period T on Earth, what is its period in an elevator accelerating upward at 2 m/s²?', options: ['T (unchanged)', 'T √(g/(g+a))', 'T √(1 + a/g)', '0'], correctIndex: 0 },
    { question: 'A solid sphere and a disc of equal mass roll down an incline without slipping. Which wins?', options: ['Solid sphere', 'Solid disc', 'Tie', 'Depends on radius'], correctIndex: 0 },
    { question: 'What is the velocity of efflux from an orifice at depth h in an open tank?', options: ['√(2gh)', '2gh', '√(gh)', 'gh/2'], correctIndex: 0 },
    { question: 'Centrifugal force is:', options: ['A real force forming an action-reaction pair with centripetal force', 'A pseudo force observed only in a rotating reference frame', 'A gravitational anomaly', 'Equal to m v / r'], correctIndex: 1 },
    { question: 'If Carnot engine efficiency is 50%, the COP of the corresponding refrigerator is:', options: ['1.0', '2.0', '0.5', '3.0'], correctIndex: 0 },
    { question: 'When a moving smooth sphere strikes an identical stationary sphere elastically in 2D, the scattering angle is:', options: ['90°', '45°', '180°', '60°'], correctIndex: 0 },
    { question: 'In Blackman\'s law, if increasing light does NOT increase photosynthesis rate, what is true?', options: ['Light is NOT the limiting factor', 'Light IS the limiting factor', 'Photosynthesis has permanently stopped', 'Temperature is at absolute zero'], correctIndex: 0 },
  ],
  masteryCriteria: 'Student understands COP energy balance, spring-mass SHM, pure rolling kinematics, 2D collisions, Torricelli efflux, non-inertial pseudo forces, and Blackman rate limiting laws.',
};

// ─── EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: '1. Refrigerator Thermodynamics & COP Lab',
    instruction: 'Adjust Cold Chamber T₂ and Room T₁ to observe heat extraction Q₂, compressor work W, and COP α in real-time.',
    nodeId: NODE_C11_PHY_101,
  },
  {
    title: '2. Spring-Mass Harmonic Oscillator Dynamics',
    instruction: 'Adjust mass m and spring constant k. Observe how gravity shifts static equilibrium while period T = 2π√(m/k) remains invariant.',
    nodeId: NODE_C11_PHY_102,
  },
  {
    title: '3. Pure Rolling vs Slipping Incline Dynamics',
    instruction: 'Select body geometry (Sphere, Disc, Ring) and incline angle θ. Observe rotational vs translational KE partitioning.',
    nodeId: NODE_C11_PHY_103,
  },
  {
    title: '4. Torricelli Efflux Jet & Trajectory Range',
    instruction: 'Slide the orifice depth h. Observe the horizontal trajectory range R = 2√(h(H - h)) reaching its theoretical maximum at h = H/2.',
    nodeId: NODE_C11_PHY_105,
  },
  {
    title: '5. Non-Inertial Reference Frame & Pseudo Forces',
    instruction: 'Vary elevator acceleration a (upward, downward, freefall). Observe the apparent weight scale reading N = m(g ± a).',
    nodeId: NODE_C11_PHY_106,
  },
];

// ─── PREDICTION & OBSERVATION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you lower the cold chamber temperature T₂ from 260 K down to 220 K (while the room remains at 300 K), what will happen to the Carnot COP?',
    options: [
      'COP increases (cooling becomes easier)',
      'COP decreases (the compressor must do significantly more work to pump heat across the wider temperature span)',
      'COP remains unchanged',
      'COP becomes negative',
    ],
    correctIndex: 1,
    verifyInstruction: 'Now slide T₂ down to 220 K on the thermal control panel and observe the Carnot COP decrease from 6.50 to 2.75!',
  },
  {
    question: 'Predict: If an orifice is moved from near the surface (h = 0.5 m) down to mid-depth (h = 2.5 m in a 5.0 m tank), what happens to the landing range R?',
    options: [
      'Range R decreases because the remaining free-fall height is smaller',
      'Range R increases to its maximum possible value at mid-depth h = H/2',
      'Range R remains identical at all depths',
      'Range drops immediately to zero',
    ],
    correctIndex: 1,
    verifyInstruction: 'Adjust the orifice slider to h = 2.5 m (H/2) and watch the jet reach its maximum horizontal range R = H = 5.0 m!',
  },
];

const OBSERVATION_QUESTIONS = [
  {
    question: 'Observation Check: What happens to the required compressor work W as the temperature gap (T₁ - T₂) approaches zero?',
    observableOptions: [
      'Work W approaches zero, making the COP approach infinity',
      'Work W shoots to infinity',
      'Work W becomes negative and violates the Second Law',
      'Temperature difference has no influence on compressor work',
    ],
    correctIndex: 0,
  },
  {
    question: 'Observation Check: In pure rolling down an incline, why does the solid sphere always beat the thin ring of equal mass?',
    observableOptions: [
      'The ring experiences more air resistance',
      'The sphere has a lower rotational inertia ratio (k²/R² = 0.40 vs 1.00), diverting less potential energy into rotation and more into linear translation',
      'The sphere experiences higher static friction force',
      'All rolling objects accelerate at g sinθ regardless of shape',
    ],
    correctIndex: 1,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Engineering Mission: Thermal & Mechanical Space Station Design',
  description: 'Design the life support cryogenic cooling loop, docking dampening springs, and propellant efflux system for the Bharatiya Antariksh Station (BAS).',
  steps: [
    'Calculate the COP of the cryogenic coolant circuit operating between 200 K internal payload loop and 320 K solar radiative panel.',
    'Tune the docking spring-damper so the astronaut airlock experiences a natural period T < 1.2 s for a 500 kg docking pod.',
    'Verify that pressurized coolant tanks maintain safe efflux velocity without cavitation using Torricelli gauge adjustments.',
  ],
};

// ─── REFLECTION QUESTIONS ───
const REFLECTION_QUESTIONS = [
  {
    id: 'ref_1',
    prompt: 'What was the most surprising thing you learned about refrigerator COP or rolling mechanics?',
    placeholder: 'E.g., I was surprised that COP can easily exceed 1.0, or that gravity does not alter a vertical spring\'s period...',
  },
  {
    id: 'ref_2',
    prompt: 'How would you explain the concept of pseudo forces in an accelerating elevator to a friend?',
    placeholder: 'E.g., Pseudo force is an apparent inertial push opposite to the elevator\'s acceleration that makes you feel heavier or lighter...',
  },
  {
    id: 'ref_3',
    prompt: 'Where in real life or engineering might you use Torricelli\'s theorem or Blackman\'s law of limiting factors?',
    placeholder: 'E.g., Torricelli for fuel tank discharge nozzles, Blackman\'s law for optimizing agricultural greenhouse yields...',
  },
];

// ─── MAIN COMPONENT ───
export function C11_PhysicsRefrigeratorCoefficientPerformanceSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C11_PHY_101,
  title = DEFAULT_PROPS.title || 'Thermodynamics & Physics Simulation Lab',
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete,
}: Props = DEFAULT_PROPS) {

  const subjectConfig = SUBJECT_CONFIG['physics'] || { name: 'Physics', emoji: '⚡', color: 'cyan' };

  // Phase flow: discovery -> explore -> sandbox -> challenge -> complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Brilliant.org style exploration states
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Adaptive difficulty & scoring
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Escalating hints state
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Drag & drop / input states
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Discovery state
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Reflection responses state
  const [reflectionAnswers, setReflectionAnswers] = useState<Record<string, string>>({});
  const [reflectionsSubmitted, setReflectionsSubmitted] = useState(false);

  // Feedback animations
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // ─── RICH INTERACTIVE SIMULATION VARIABLES ───
  // 1. Refrigerator Lab
  const [tempColdK, setTempColdK] = useState(260); // T₂ in K (-13°C)
  const [tempHotK, setTempHotK] = useState(300);   // T₁ in K (27°C)
  const [heatExtractedQ2, setHeatExtractedQ2] = useState(1000); // Joules

  // 2. Spring-Mass Lab
  const [springMass, setSpringMass] = useState(2.0); // kg
  const [springStiffness, setSpringStiffness] = useState(100); // N/m
  const [springDisplacement, setSpringDisplacement] = useState(0.1); // m

  // 3. Rolling Incline Lab
  const [inclineAngleDeg, setInclineAngleDeg] = useState(30); // deg
  const [rollingShape, setRollingShape] = useState<'sphere' | 'disc' | 'ring'>('sphere');

  // 4. Torricelli Efflux Lab
  const [tankHeight, setTankHeight] = useState(5.0); // m
  const [orificeDepth, setOrificeDepth] = useState(2.5); // m

  // 5. Non-Inertial Elevator Lab
  const [elevatorMass, setElevatorMass] = useState(60); // kg
  const [elevatorAccel, setElevatorAccel] = useState(2.0); // m/s² (+ up, - down)

  // BKT Ref
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const animCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── DERIVED VALUES ───
  const copCarnot = useMemo(() => {
    const deltaT = Math.max(1, tempHotK - tempColdK);
    return Number((tempColdK / deltaT).toFixed(2));
  }, [tempColdK, tempHotK]);

  const workInputRequired = useMemo(() => {
    return Number((heatExtractedQ2 / copCarnot).toFixed(1));
  }, [heatExtractedQ2, copCarnot]);

  const heatRejectedQ1 = useMemo(() => {
    return Number((heatExtractedQ2 + workInputRequired).toFixed(1));
  }, [heatExtractedQ2, workInputRequired]);

  const shmPeriod = useMemo(() => {
    return Number((2 * Math.PI * Math.sqrt(springMass / springStiffness)).toFixed(3));
  }, [springMass, springStiffness]);

  const shmFrequency = useMemo(() => {
    return Number((1 / shmPeriod).toFixed(2));
  }, [shmPeriod]);

  const rollingAccel = useMemo(() => {
    const rad = (inclineAngleDeg * Math.PI) / 180;
    const g = 9.8;
    const k2_R2 = rollingShape === 'sphere' ? 0.4 : rollingShape === 'disc' ? 0.5 : 1.0;
    return Number(((g * Math.sin(rad)) / (1 + k2_R2)).toFixed(2));
  }, [inclineAngleDeg, rollingShape]);

  const effluxVelocity = useMemo(() => {
    return Number(Math.sqrt(2 * 9.8 * orificeDepth).toFixed(2));
  }, [orificeDepth]);

  const effluxRange = useMemo(() => {
    const heightAboveGround = Math.max(0, tankHeight - orificeDepth);
    return Number((2 * Math.sqrt(orificeDepth * heightAboveGround)).toFixed(2));
  }, [tankHeight, orificeDepth]);

  const apparentWeight = useMemo(() => {
    return Number((elevatorMass * (9.8 + elevatorAccel)).toFixed(1));
  }, [elevatorMass, elevatorAccel]);

  // Adaptive difficulty filtering
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── MOUNT MASTERY CHECK ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT MASTERY ADAPTATION ───
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

  // ─── 2D CANVAS OSCILLATION & TRAJECTORY ANIMATION ───
  useEffect(() => {
    const canvas = animCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const render = () => {
      t += 0.03;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (currentSlide === 0 || phase === 'challenge') {
        // Thermodynamic Cycle Waveform
        ctx.strokeStyle = '#06b6d4';
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let x = 0; x < canvas.width; x++) {
          const y = canvas.height / 2 + Math.sin(x * 0.04 + t * 2) * 12 * (copCarnot / 5);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        ctx.fillStyle = '#94a3b8';
        ctx.font = '11px sans-serif';
        ctx.fillText(`COP: ${copCarnot} | Q₂: ${heatExtractedQ2}J | W: ${workInputRequired}J | Q₁: ${heatRejectedQ1}J`, 10, 18);
      } else if (currentSlide === 1) {
        // Spring Mass Oscillation
        const omega = 2 * Math.PI * shmFrequency;
        const xDisp = Math.cos(omega * t) * 40;
        const centerX = canvas.width / 2 + xDisp;

        ctx.strokeStyle = '#64748b';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(20, canvas.height / 2);
        for (let x = 20; x < centerX - 15; x += 8) {
          const y = canvas.height / 2 + ((x % 16 === 0) ? -8 : 8);
          ctx.lineTo(x, y);
        }
        ctx.lineTo(centerX - 15, canvas.height / 2);
        ctx.stroke();

        // Mass Block
        ctx.fillStyle = '#38bdf8';
        ctx.fillRect(centerX - 15, canvas.height / 2 - 15, 30, 30);
        ctx.fillStyle = '#0f172a';
        ctx.font = 'bold 10px sans-serif';
        ctx.fillText(`${springMass}kg`, centerX - 12, canvas.height / 2 + 4);
      } else if (currentSlide === 3) {
        // Efflux Parabolic Trajectory
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2;
        ctx.beginPath();
        const startX = 30;
        const startY = 15;
        ctx.moveTo(startX, startY);
        for (let px = 0; px < effluxRange * 35; px += 2) {
          const py = startY + (0.5 * 9.8 * Math.pow(px / (effluxVelocity * 15), 2)) * 8;
          if (py > canvas.height - 5) break;
          ctx.lineTo(startX + px, py);
        }
        ctx.stroke();
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [currentSlide, phase, copCarnot, heatExtractedQ2, workInputRequired, heatRejectedQ1, shmFrequency, springMass, effluxVelocity, effluxRange]);

  // ─── CALLBACKS ───
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

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding prediction!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive physics laboratory. Experiment with the apparatus!');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free play mode. Test any parameter without grading pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Entering structured competency challenges. Good luck!');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction locked! Now verify by interacting with the simulation.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Superb scientific observation!' : 'Look closer at how the values transform.');
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

  const handleSortMove = useCallback((fromIdx: number, toIdx: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      const base = prev.length === challenge.sortItems?.length ? prev : challenge.sortItems?.map((_, i) => i) || [];
      const arr = [...base];
      const [moved] = arr.splice(fromIdx, 1);
      arr.splice(toIdx, 0, moved);
      return arr;
    });
  }, [challenge]);

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems?.map((_, i) => i) || []);
    const isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctOrder);
    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('success');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);
    } else {
      audioManager.play('error');
      setErrors(e => e + 1);
      setWrongShake(true);
      setWrongFlash(true);
      setTimeout(() => setWrongShake(false), 500);
      setTimeout(() => setWrongFlash(false), 800);
      if (hintCount < 3) showNextHint();
      else {
        setAnswerRevealed(true);
        setShowExplanation(true);
        bktStateRef.current = bktUpdate(bktStateRef.current, false);
      }
    }
  }, [sortArrangement, challenge, hintCount, showNextHint]);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Simulation suite completed! Excellent engineering analysis.');
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

    if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
      isCorrect = answer === challenge.correctIndex;
    } else if (challenge.type === 'drag-label') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctMapping);
    } else if (challenge.type === 'numeric') {
      const numAnswer = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
      isCorrect = Math.abs(numAnswer - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
    } else if (challenge.type === 'construct') {
      isCorrect = (answer as string).trim() === challenge.targetState;
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('success');
      speechManager.speak('Spot on! Excellent physics reasoning.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3000);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
      }
    } else {
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
        speechManager.speak('Let us review the step-by-step physical principles.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 3000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]);

  const handleAddConstructPart = useCallback((part: string) => {
    setConstructParts(prev => [...prev, part]);
    audioManager.play('tap');
  }, []);

  const handleRemoveConstructPart = useCallback((index: number) => {
    setConstructParts(prev => prev.filter((_, i) => i !== index));
    audioManager.play('pop');
  }, []);

  const handleNextSlide = useCallback(() => {
    setCurrentSlide(s => Math.min(EXPLORATION_STEPS.length - 1, s + 1));
    audioManager.play('whoosh');
  }, []);

  const handlePrevSlide = useCallback(() => {
    setCurrentSlide(s => Math.max(0, s - 1));
    audioManager.play('whoosh');
  }, []);

  // Cleanup timers
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── MOTIVATIONAL FEEDBACK MESSAGE ───
  const getMotivationalFeedback = (errs: number) => {
    if (errs === 0) return 'PERFECT SCORE!';
    if (errs >= 1 && errs <= 3) return 'Great work!';
    if (errs >= 4 && errs <= 7) return 'Good effort!';
    return 'Do not give up — You WILL get this!';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-gold-900/50 shadow-2xl font-sans"
    >
      {/* ─── HEADER ─── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-wrap items-center justify-between pb-4 border-b border-slate-800 gap-3"
      >
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.95 }}
            className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-gold-600 to-gold-600 flex items-center justify-center text-2xl shadow-lg shadow-gold-500/20"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <span className="text-xs font-semibold tracking-wider text-gold-400 uppercase">Class 11 ISC Physics</span>
            <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">{title}</h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            className={`text-xs px-3 py-1 rounded-full font-bold border uppercase ${
              difficulty === 'foundation'
                ? 'bg-emerald-950/70 border-emerald-500 text-emerald-400'
                : difficulty === 'advanced'
                ? 'bg-rose-950/70 border-rose-500 text-rose-400'
                : 'bg-gold-950/70 border-gold-500 text-gold-400'
            }`}
          >
            {difficulty} Tier
          </motion.span>
          <motion.span
            whileHover={{ scale: 1.05 }}
            className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-300 font-mono"
          >
            Mastery: {masteryLevel}
          </motion.span>
        </div>
      </motion.div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      <AnimatePresence mode="wait">
        {phase === 'discovery' && (
          <motion.div
            key="discovery"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="mt-6 space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-5 rounded-2xl bg-gradient-to-br from-gold-950/60 to-slate-900 border border-gold-800/60"
            >
              <h2 className="text-lg font-bold text-gold-300 flex items-center gap-2">
                <span>🚀</span> {SCENARIO.title}
              </h2>
              <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
              <p className="text-xs text-gold-200/70 mt-2 font-mono">{SCENARIO.context}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4"
            >
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Curiosity Discovery Challenge</span>
              <p className="text-base font-semibold text-white">{DISCOVERY_QUESTION.question}</p>

              <div className="space-y-2">
                {DISCOVERY_QUESTION.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    disabled={discoveryAnswered}
                    onClick={() => handleDiscoveryAnswer(i)}
                    className="w-full text-left p-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 text-slate-200 text-sm transition-all"
                  >
                    <span className="font-mono text-gold-400 mr-2 font-bold">{String.fromCharCode(65 + i)}.</span> {opt}
                  </motion.button>
                ))}
              </div>

              {discoveryAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="pt-3 border-t border-slate-800"
                >
                  <p className={`text-sm mb-4 font-medium ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {discoveryCorrect ? '✓ Exactly right! COP is not bounded by 1.0.' : `💡 ${DISCOVERY_QUESTION.hintAfter}`}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToExploration}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-white font-bold text-sm shadow-lg shadow-gold-500/25"
                  >
                    Enter Interactive Laboratory →
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── PHASE 2: INTERACTIVE GUIDED EXPLORATION ─── */}
      <AnimatePresence mode="wait">
        {phase === 'explore' && (
          <motion.div
            key="explore"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-6 space-y-5"
          >
            <motion.div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gold-400 tracking-wider uppercase">
                Lab Station {currentSlide + 1} of {EXPLORATION_STEPS.length}
              </span>
              <div className="flex gap-1">
                {EXPLORATION_STEPS.map((_, idx) => (
                  <motion.div
                    key={idx}
                    animate={{ scale: idx === currentSlide ? 1.1 : 1 }}
                    className={`h-1.5 w-6 rounded-full transition-all ${
                      idx === currentSlide ? 'bg-gold-400' : 'bg-slate-800'
                    }`}
                  />
                ))}
              </div>
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-5 md:p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4"
              >
                <div>
                  <h2 className="text-lg font-bold text-gold-300">{EXPLORATION_STEPS[currentSlide].title}</h2>
                  <p className="text-sm text-slate-300 mt-1">{EXPLORATION_STEPS[currentSlide].instruction}</p>
                </div>

                {/* Dynamic 2D Visual Canvas Banner */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-xl bg-slate-950 p-2 border border-slate-800/80 overflow-hidden"
                >
                  <canvas ref={animCanvasRef} width={750} height={70} className="w-full h-16 block" />
                </motion.div>

                {/* SLIDE 0: REFRIGERATOR LAB WITH SVG DIAGRAM 1 */}
                {currentSlide === 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800"
                    >
                      <span className="text-xs font-bold text-gold-400 uppercase">Thermodynamic Controls</span>

                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>Cold Chamber T₂ (Freezer)</span>
                          <span className="font-mono text-gold-400">{tempColdK} K ({tempColdK - 273}°C)</span>
                        </div>
                        <input
                          type="range"
                          min={200}
                          max={280}
                          value={tempColdK}
                          onChange={e => setTempColdK(Number(e.target.value))}
                          className="w-full accent-gold-400 cursor-pointer"
                          aria-label="Set cold temperature T2 in Kelvin"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>Room Temperature T₁ (Hot)</span>
                          <span className="font-mono text-rose-400">{tempHotK} K ({tempHotK - 273}°C)</span>
                        </div>
                        <input
                          type="range"
                          min={290}
                          max={350}
                          value={tempHotK}
                          onChange={e => setTempHotK(Number(e.target.value))}
                          className="w-full accent-rose-400 cursor-pointer"
                          aria-label="Set hot temperature T1 in Kelvin"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>Heat Extracted Q₂</span>
                          <span className="font-mono text-emerald-400">{heatExtractedQ2} J</span>
                        </div>
                        <input
                          type="range"
                          min={200}
                          max={3000}
                          step={100}
                          value={heatExtractedQ2}
                          onChange={e => setHeatExtractedQ2(Number(e.target.value))}
                          className="w-full accent-emerald-400 cursor-pointer"
                          aria-label="Set heat extracted Q2"
                        />
                      </div>
                    </motion.div>

                    {/* TOPIC SVG 1: REFRIGERATOR ENERGY FLOW DIAGRAM */}
                    <motion.div
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 flex flex-col justify-between"
                    >
                      <svg viewBox="0 0 320 200" className="w-full h-auto">
                        <defs>
                          <marker id="arrow-amber" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                            <path d="M0,0 L0,6 L6,3 z" fill="#f59e0b" />
                          </marker>
                          <marker id="arrow-rose" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                            <path d="M0,0 L0,6 L6,3 z" fill="#f43f5e" />
                          </marker>
                          <marker id="arrow-green" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                            <path d="M0,0 L0,6 L6,3 z" fill="#10b981" />
                          </marker>
                        </defs>

                        {/* Hot Reservoir */}
                        <rect x="20" y="10" width="280" height="35" rx="6" fill="#881337" stroke="#e11d48" strokeWidth="1.5" />
                        <text x="160" y="32" textAnchor="middle" fill="#ffe4e6" fontSize="12" fontWeight="bold">
                          HOT SINK T₁ = {tempHotK} K (Exhausts Q₁ = {heatRejectedQ1} J)
                        </text>

                        {/* Working Substance Cycle Circle */}
                        <circle cx="160" cy="100" r="30" fill="#0f172a" stroke="#06b6d4" strokeWidth="2.5" />
                        <text x="160" y="97" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">REF CYCLE</text>
                        <text x="160" y="112" textAnchor="middle" fill="#a5f3fc" fontSize="10">α = {copCarnot}</text>

                        {/* Work In Arrow */}
                        <line x1="20" y1="100" x2="125" y2="100" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrow-amber)" />
                        <text x="70" y="90" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">W = {workInputRequired} J In</text>

                        {/* Cold to Engine Arrow */}
                        <line x1="160" y1="155" x2="160" y2="135" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrow-green)" />
                        <text x="195" y="148" textAnchor="middle" fill="#34d399" fontSize="10">Q₂ = {heatExtractedQ2} J</text>

                        {/* Engine to Hot Arrow */}
                        <line x1="160" y1="70" x2="160" y2="48" stroke="#f43f5e" strokeWidth="3" markerEnd="url(#arrow-rose)" />
                        <text x="195" y="62" textAnchor="middle" fill="#fb7185" fontSize="10">Q₁ = {heatRejectedQ1} J</text>

                        {/* Cold Reservoir */}
                        <rect x="20" y="155" width="280" height="35" rx="6" fill="#064e3b" stroke="#059669" strokeWidth="1.5" />
                        <text x="160" y="177" textAnchor="middle" fill="#d1fae5" fontSize="12" fontWeight="bold">
                          COLD SOURCE T₂ = {tempColdK} K (Supplies Q₂)
                        </text>
                      </svg>

                      <div className="mt-2 text-center text-xs text-gold-300 font-mono bg-gold-950/40 p-2 rounded-lg border border-gold-800/40">
                        Carnot Formula: α = T₂ / (T₁ - T₂) = {tempColdK} / {tempHotK - tempColdK} = <span className="font-bold text-amber-300">{copCarnot}</span>
                      </div>
                    </motion.div>
                  </div>
                )}

                {/* SLIDE 1: SHM SPRING MASS LAB WITH SVG DIAGRAM 2 */}
                {currentSlide === 1 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800"
                    >
                      <span className="text-xs font-bold text-gold-400 uppercase">Oscillator Parameters</span>

                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>Mass (m)</span>
                          <span className="font-mono text-gold-400">{springMass} kg</span>
                        </div>
                        <input
                          type="range"
                          min={0.5}
                          max={10.0}
                          step={0.5}
                          value={springMass}
                          onChange={e => setSpringMass(Number(e.target.value))}
                          className="w-full accent-gold-400"
                          aria-label="Set mass in kg"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>Spring Constant (k)</span>
                          <span className="font-mono text-emerald-400">{springStiffness} N/m</span>
                        </div>
                        <input
                          type="range"
                          min={20}
                          max={400}
                          step={10}
                          value={springStiffness}
                          onChange={e => setSpringStiffness(Number(e.target.value))}
                          className="w-full accent-emerald-400"
                          aria-label="Set spring stiffness in N/m"
                        />
                      </div>

                      <div className="p-3 bg-slate-900 rounded-lg text-xs space-y-1 font-mono text-slate-300">
                        <p>Time Period T = 2π√(m/k) = <span className="text-gold-400 font-bold">{shmPeriod} s</span></p>
                        <p>Angular Frequency ω = √(k/m) = <span className="text-emerald-400 font-bold">{(2 * Math.PI / shmPeriod).toFixed(2)} rad/s</span></p>
                        <p>Static Gravity Sag x₀ = mg/k = <span className="text-amber-400 font-bold">{((springMass * 9.8) / springStiffness).toFixed(3)} m</span></p>
                      </div>
                    </motion.div>

                    {/* TOPIC SVG 2: SHM FREE BODY DIAGRAM & EQUILIBRIUM */}
                    <motion.div
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 flex flex-col justify-between"
                    >
                      <svg viewBox="0 0 320 200" className="w-full h-auto">
                        {/* Rigid Ceiling */}
                        <rect x="30" y="10" width="260" height="10" fill="#334155" stroke="#475569" strokeWidth="1" />
                        <line x1="30" y1="10" x2="290" y2="10" stroke="#94a3b8" strokeWidth="2" />

                        {/* Unloaded vs Loaded Springs */}
                        {/* State A: Unloaded */}
                        <line x1="80" y1="20" x2="80" y2="35" stroke="#64748b" strokeWidth="2" />
                        <path d="M 80 35 L 75 40 L 85 45 L 75 50 L 85 55 L 75 60 L 85 65 L 80 70" fill="none" stroke="#64748b" strokeWidth="2" />
                        <line x1="80" y1="70" x2="80" y2="85" stroke="#64748b" strokeWidth="2" />
                        <text x="80" y="105" textAnchor="middle" fill="#94a3b8" fontSize="10">Unstretched</text>

                        {/* State B: Loaded Equilibrium */}
                        <line x1="160" y1="20" x2="160" y2="35" stroke="#38bdf8" strokeWidth="2" />
                        <path d="M 160 35 L 152 42 L 168 49 L 152 56 L 168 63 L 152 70 L 168 77 L 160 84" fill="none" stroke="#38bdf8" strokeWidth="2" />
                        <line x1="160" y1="84" x2="160" y2="95" stroke="#38bdf8" strokeWidth="2" />
                        <rect x="145" y="95" width="30" height="25" rx="4" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.5" />
                        <text x="160" y="112" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">{springMass}kg</text>
                        <text x="160" y="135" textAnchor="middle" fill="#38bdf8" fontSize="10">Equilibrium: x₀ = mg/k</text>

                        {/* State C: Displaced SHM Mode */}
                        <line x1="240" y1="20" x2="240" y2="35" stroke="#10b981" strokeWidth="2" />
                        <path d="M 240 35 L 230 44 L 250 53 L 230 62 L 250 71 L 230 80 L 250 89 L 240 98" fill="none" stroke="#10b981" strokeWidth="2" />
                        <line x1="240" y1="98" x2="240" y2="120" stroke="#10b981" strokeWidth="2" />
                        <rect x="225" y="120" width="30" height="25" rx="4" fill="#059669" stroke="#34d399" strokeWidth="1.5" />
                        <text x="240" y="137" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">{springMass}kg</text>

                        {/* Restoring Force Vector */}
                        <line x1="270" y1="130" x2="270" y2="105" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow-amber)" />
                        <text x="275" y="118" fill="#fbbf24" fontSize="9" fontWeight="bold">F_rest = -ky</text>
                        <text x="240" y="160" textAnchor="middle" fill="#34d399" fontSize="10">Displaced: y</text>

                        {/* Horizontal baseline */}
                        <line x1="30" y1="175" x2="290" y2="175" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" />
                        <text x="160" y="190" textAnchor="middle" fill="#a5f3fc" fontSize="10" fontWeight="bold">
                          Period T = 2π√(m/k) = {shmPeriod} s (Independent of g!)
                        </text>
                      </svg>
                    </motion.div>
                  </div>
                )}

                {/* SLIDE 2: ROLLING MOTION LAB WITH SVG DIAGRAM 3 */}
                {currentSlide === 2 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800"
                    >
                      <span className="text-xs font-bold text-gold-400 uppercase">Incline & Body Selector</span>

                      <div className="flex gap-2">
                        {(['sphere', 'disc', 'ring'] as const).map(shape => (
                          <motion.button
                            key={shape}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setRollingShape(shape)}
                            className={`flex-1 py-2 rounded-lg text-xs font-bold uppercase transition-all ${
                              rollingShape === shape
                                ? 'bg-gold-600 text-white shadow-md'
                                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                            }`}
                          >
                            {shape}
                          </motion.button>
                        ))}
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>Incline Angle θ</span>
                          <span className="font-mono text-gold-400">{inclineAngleDeg}°</span>
                        </div>
                        <input
                          type="range"
                          min={10}
                          max={60}
                          value={inclineAngleDeg}
                          onChange={e => setInclineAngleDeg(Number(e.target.value))}
                          className="w-full accent-gold-400"
                          aria-label="Set incline angle in degrees"
                        />
                      </div>

                      <div className="p-3 bg-slate-900 rounded-lg text-xs font-mono space-y-1">
                        <p>Rotational Factor k²/R² = {rollingShape === 'sphere' ? '2/5 (0.40)' : rollingShape === 'disc' ? '1/2 (0.50)' : '1.00'}</p>
                        <p>Pure Rolling a = g sinθ / (1 + k²/R²) = <span className="text-amber-300 font-bold">{rollingAccel} m/s²</span></p>
                        <p>Frictionless Sliding a = g sinθ = {(9.8 * Math.sin((inclineAngleDeg * Math.PI) / 180)).toFixed(2)} m/s²</p>
                      </div>
                    </motion.div>

                    {/* TOPIC SVG 3: PURE ROLLING VELOCITY VECTORS & INCLINE KINEMATICS */}
                    <motion.div
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 flex flex-col justify-between"
                    >
                      <svg viewBox="0 0 320 200" className="w-full h-auto">
                        {/* Incline Wedge */}
                        <polygon points="30,170 290,170 290,70" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />
                        <text x="60" y="165" fill="#94a3b8" fontSize="10" fontWeight="bold">θ = {inclineAngleDeg}°</text>

                        {/* Rolling Wheel on Incline */}
                        <circle cx="180" cy="95" r="30" fill="#0f172a" stroke="#06b6d4" strokeWidth="2.5" />
                        <circle cx="180" cy="95" r="4" fill="#38bdf8" />

                        {/* Velocity Vectors on Wheel */}
                        {/* Center of Mass Velocity */}
                        <line x1="180" y1="95" x2="220" y2="75" stroke="#10b981" strokeWidth="2.5" markerEnd="url(#arrow-green)" />
                        <text x="215" y="65" fill="#34d399" fontSize="10" fontWeight="bold">v_cm = Rω</text>

                        {/* Top Point Velocity (2 v_cm) */}
                        <line x1="167" y1="68" x2="235" y2="35" stroke="#38bdf8" strokeWidth="2.5" markerEnd="url(#arrow-green)" />
                        <text x="205" y="30" fill="#7dd3fc" fontSize="9" fontWeight="bold">v_top = 2 v_cm</text>

                        {/* Bottom Point Contact (v = 0) */}
                        <circle cx="193" cy="122" r="3.5" fill="#f43f5e" />
                        <text x="195" y="142" fill="#fda4af" fontSize="9" fontWeight="bold">v_contact = 0 (Static Friction W = 0)</text>

                        {/* Angular Velocity Arc */}
                        <path d="M 170 70 A 25 25 0 0 1 205 95" fill="none" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#arrow-amber)" />
                        <text x="185" y="80" fill="#fbbf24" fontSize="9" fontWeight="bold">ω</text>

                        {/* Acceleration display */}
                        <rect x="20" y="10" width="280" height="22" rx="4" fill="#042f2e" stroke="#0d9488" strokeWidth="1" />
                        <text x="160" y="25" textAnchor="middle" fill="#5eead4" fontSize="10" fontWeight="bold">
                          {rollingShape.toUpperCase()}: a = {rollingAccel} m/s² | KE = ½mv² + ½Iω²
                        </text>
                      </svg>
                    </motion.div>
                  </div>
                )}

                {/* SLIDE 3: TORRICELLI TANK LAB WITH SVG DIAGRAM 4 */}
                {currentSlide === 3 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800"
                    >
                      <span className="text-xs font-bold text-gold-400 uppercase">Efflux Tank Parameters</span>

                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>Orifice Depth h below surface</span>
                          <span className="font-mono text-gold-400">{orificeDepth} m</span>
                        </div>
                        <input
                          type="range"
                          min={0.2}
                          max={tankHeight - 0.2}
                          step={0.1}
                          value={orificeDepth}
                          onChange={e => setOrificeDepth(Number(e.target.value))}
                          className="w-full accent-gold-400"
                          aria-label="Set orifice depth in meters"
                        />
                      </div>

                      <div className="p-3 bg-slate-900 rounded-lg text-xs font-mono space-y-1">
                        <p>Total Tank Height H = {tankHeight} m</p>
                        <p>Efflux Velocity v = √(2gh) = <span className="text-gold-300 font-bold">{effluxVelocity} m/s</span></p>
                        <p>Horizontal Range R = 2√(h(H - h)) = <span className="text-amber-300 font-bold">{effluxRange} m</span></p>
                        <p className="text-emerald-400">Max Range occurs at h = H/2 = {(tankHeight / 2).toFixed(1)} m (R_max = {tankHeight} m)</p>
                      </div>
                    </motion.div>

                    {/* TOPIC SVG 4: TORRICELLI LIQUID EFFLUX JET & TRAJECTORY */}
                    <motion.div
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 flex flex-col justify-between"
                    >
                      <svg viewBox="0 0 320 200" className="w-full h-auto">
                        {/* Tank Body */}
                        <rect x="30" y="20" width="80" height="150" fill="#0f172a" stroke="#0ea5e9" strokeWidth="2" />

                        {/* Liquid Fill */}
                        <rect x="31" y="40" width="78" height="129" fill="#0369a1" fillOpacity="0.4" />
                        <line x1="31" y1="40" x2="109" y2="40" stroke="#38bdf8" strokeWidth="2" />
                        <text x="70" y="35" textAnchor="middle" fill="#7dd3fc" fontSize="9">Surface P_atm</text>

                        {/* Orifice */}
                        {(() => {
                          const orificeY = 40 + (orificeDepth / tankHeight) * 125;
                          const fallHeight = 170 - orificeY;
                          const rScaled = (effluxRange / 5.0) * 160;
                          return (
                            <g>
                              {/* Orifice hole */}
                              <circle cx="110" cy={orificeY} r="3" fill="#f59e0b" />
                              <line x1="110" y1={orificeY} x2="135" y2={orificeY} stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrow-green)" />
                              <text x="140" y={orificeY - 4} fill="#5eead4" fontSize="8" fontWeight="bold">v = {effluxVelocity} m/s</text>

                              {/* Depth Indicator */}
                              <line x1="20" y1="40" x2="20" y2={orificeY} stroke="#fbbf24" strokeWidth="1.5" />
                              <text x="15" y={(40 + orificeY) / 2} textAnchor="end" fill="#fbbf24" fontSize="8">h={orificeDepth}m</text>

                              {/* Parabolic Jet Curve */}
                              <path
                                d={`M 110 ${orificeY} Q ${110 + rScaled * 0.5} ${orificeY} ${110 + rScaled} 170`}
                                fill="none"
                                stroke="#38bdf8"
                                strokeWidth="2.5"
                              />

                              {/* Landing marker on ground */}
                              <circle cx={110 + rScaled} cy="170" r="4" fill="#10b981" />
                              <line x1="110" y1="180" x2={110 + rScaled} y2="180" stroke="#10b981" strokeWidth="2" />
                              <text x={110 + rScaled / 2} y="193" textAnchor="middle" fill="#34d399" fontSize="9" fontWeight="bold">
                                Range R = {effluxRange} m
                              </text>
                            </g>
                          );
                        })()}

                        {/* Ground plane */}
                        <line x1="20" y1="170" x2="300" y2="170" stroke="#64748b" strokeWidth="2" />
                      </svg>
                    </motion.div>
                  </div>
                )}

                {/* SLIDE 4: NON-INERTIAL FRAMES */}
                {currentSlide === 4 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800"
                    >
                      <span className="text-xs font-bold text-gold-400 uppercase">Elevator Simulation</span>

                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>Frame Acceleration a (+ Up / - Down)</span>
                          <span className="font-mono text-gold-400">{elevatorAccel > 0 ? `+${elevatorAccel}` : elevatorAccel} m/s²</span>
                        </div>
                        <input
                          type="range"
                          min={-9.8}
                          max={10.0}
                          step={0.5}
                          value={elevatorAccel}
                          onChange={e => setElevatorAccel(Number(e.target.value))}
                          className="w-full accent-gold-400"
                          aria-label="Set elevator acceleration in m/s^2"
                        />
                      </div>

                      <div className="p-3 bg-slate-900 rounded-lg text-xs font-mono space-y-1">
                        <p>Passenger Mass m = {elevatorMass} kg</p>
                        <p>Pseudo Force F_p = -m a = {(-elevatorMass * elevatorAccel).toFixed(1)} N</p>
                        <p className="text-base font-bold text-amber-300">Apparent Weight N = m(g + a) = {apparentWeight} N</p>
                        <p className="text-slate-400 text-[11px]">In free fall (a = -9.8 m/s²), apparent weight = 0 N (Weightlessness).</p>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 text-xs space-y-2 flex flex-col justify-center"
                    >
                      <p className="text-gold-300 font-bold">Non-Inertial Frame Transformations:</p>
                      <p className="text-slate-300">1. Linear: Apply fictitious force F_pseudo = -m a_frame opposite to the reference frame acceleration.</p>
                      <p className="text-slate-300">2. Rotating Frame: Centrifugal F_cf = m ω² r directed radially outward from the axis of rotation.</p>
                      <p className="text-slate-300">3. Moving Object in Rotating Frame: Coriolis F_cor = -2m(ω × v_rel).</p>
                    </motion.div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Controls */}
            <div className="flex items-center justify-between pt-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={currentSlide === 0}
                onClick={handlePrevSlide}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:opacity-40 text-xs font-bold"
              >
                ← Previous Lab
              </motion.button>

              <span className="text-xs text-slate-500 font-mono">Step {currentSlide + 1} / {EXPLORATION_STEPS.length}</span>

              {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNextSlide}
                  className="px-5 py-2 rounded-xl bg-gold-600 text-white text-xs font-bold shadow-md shadow-gold-600/20"
                >
                  Next Lab →
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToSandbox}
                  className="px-6 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow-md shadow-emerald-600/20"
                >
                  Free Exploration Sandbox →
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── PHASE 3: SANDBOX / FREE PLAY ─── */}
      <AnimatePresence mode="wait">
        {phase === 'sandbox' && (
          <motion.div
            key="sandbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-6 space-y-5"
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-2xl bg-gold-950/40 border border-gold-800/50 flex justify-between items-center"
            >
              <div>
                <h2 className="text-base font-bold text-gold-300">Unrestricted Physics Sandbox</h2>
                <p className="text-xs text-slate-400">Tweak all variables freely without scoring or time limits.</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-xs shadow-lg shadow-emerald-500/20"
              >
                Ready for Challenges! →
              </motion.button>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3"
              >
                <span className="text-xs font-bold text-gold-400 uppercase">Thermodynamic Heat Pump</span>
                <div className="flex justify-between text-xs">
                  <span>Freezer T₂: {tempColdK} K</span>
                  <span>Room T₁: {tempHotK} K</span>
                </div>
                <input
                  type="range"
                  min={200}
                  max={280}
                  value={tempColdK}
                  onChange={e => setTempColdK(Number(e.target.value))}
                  className="w-full accent-gold-400"
                  aria-label="Freezer temperature T2"
                />
                <div className="p-2 bg-slate-950 rounded text-xs font-mono flex justify-between">
                  <span>Carnot COP: <strong className="text-gold-300">{copCarnot}</strong></span>
                  <span>Work for 1kJ Q₂: <strong className="text-amber-300">{workInputRequired} J</strong></span>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.01 }}
                className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3"
              >
                <span className="text-xs font-bold text-emerald-400 uppercase">Torricelli Efflux Jet</span>
                <div className="flex justify-between text-xs">
                  <span>Depth h: {orificeDepth} m</span>
                  <span>Efflux Velocity: {effluxVelocity} m/s</span>
                </div>
                <input
                  type="range"
                  min={0.2}
                  max={4.8}
                  step={0.1}
                  value={orificeDepth}
                  onChange={e => setOrificeDepth(Number(e.target.value))}
                  className="w-full accent-emerald-400"
                  aria-label="Orifice depth in meters"
                />
                <div className="p-2 bg-slate-950 rounded text-xs font-mono flex justify-between">
                  <span>Horizontal Range: <strong className="text-emerald-300">{effluxRange} m</strong></span>
                  <span>Max Possible: <strong>{tankHeight} m</strong></span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── PHASE 4: STRUCTURED COMPETENCY CHALLENGES ─── */}
      <AnimatePresence mode="wait">
        {phase === 'challenge' && (
          <motion.div
            key="challenge"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-6 space-y-5"
          >
            {/* Progress Bar & Badges */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-medium text-slate-400">
                <span>Challenge {currentChallenge + 1} of {filteredChallenges.length}</span>
                <span className="capitalize text-gold-400 font-bold tracking-wide">
                  NEP Competency: {challenge.competencyLevel}
                </span>
              </div>
              <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-gold-500 to-gold-600 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            {/* Question Card */}
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-5 md:p-6 rounded-2xl bg-slate-900 border transition-colors ${
                wrongFlash
                  ? 'bg-rose-950/60 border-rose-500'
                  : 'border-slate-800'
              }`}
            >
              <div className="flex items-center gap-2 mb-3">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded bg-slate-800 text-slate-300 uppercase"
                >
                  {challenge.type}
                </motion.span>
                <span className="text-[11px] font-mono text-slate-500">{challenge.nodeId}</span>
              </div>

              <p className="text-base md:text-lg font-semibold text-white leading-relaxed mb-4">
                {challenge.question}
              </p>

              {/* MCQ OPTIONS */}
              {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
                <div className="space-y-2.5">
                  {challenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={wrongShake ? { duration: 0.4 } : {}}
                      disabled={showExplanation || answerRevealed}
                      onClick={() => handleAnswer(i)}
                      className={`w-full text-left p-3.5 rounded-xl text-sm border transition-all ${
                        showExplanation && i === challenge.correctIndex
                          ? 'bg-emerald-900/60 border-emerald-500 text-emerald-200'
                          : 'bg-slate-800/80 hover:bg-slate-700/80 border-slate-700/60 text-slate-200'
                      }`}
                    >
                      <span className="font-mono text-gold-400 font-bold mr-2">{String.fromCharCode(65 + i)}.</span>
                      {opt}
                    </motion.button>
                  ))}
                </div>
              )}

              {/* DRAG-LABEL CHALLENGE */}
              {challenge.type === 'drag-label' && challenge.dragItems && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-xs text-slate-400 w-full mb-1">Draggable Energy Blocks:</span>
                    {challenge.dragItems.map((item, idx) => (
                      <motion.div
                        key={idx}
                        draggable
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onDragStart={() => handleDragStart(item.label)}
                        className="px-3 py-1.5 rounded-lg bg-gold-700 hover:bg-gold-600 text-white text-xs font-bold cursor-grab active:cursor-grabbing shadow"
                      >
                        {item.label}
                      </motion.div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {['box_hot', 'box_work', 'box_cold'].map(boxId => (
                      <motion.div
                        key={boxId}
                        onDragOver={e => e.preventDefault()}
                        onDrop={() => handleDragDrop(boxId)}
                        whileHover={{ scale: 1.02 }}
                        className={`p-4 rounded-xl border-2 border-dashed min-h-[90px] flex flex-col justify-center items-center text-center text-xs transition-colors ${
                          droppedLabels[boxId]
                            ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300 font-bold'
                            : 'bg-slate-950/50 border-slate-700 text-slate-500'
                        }`}
                      >
                        <span className="text-[10px] uppercase font-mono mb-1">{boxId.replace('box_', 'Target: ')}</span>
                        {droppedLabels[boxId] || 'Drop component here'}
                      </motion.div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(droppedLabels)}
                    disabled={showExplanation}
                    className="px-5 py-2.5 rounded-xl bg-gold-600 text-white font-bold text-xs"
                  >
                    Verify Thermal Labels →
                  </motion.button>
                </div>
              )}

              {/* DRAG-SORT CHALLENGE */}
              {challenge.type === 'drag-sort' && challenge.sortItems && (
                <div className="space-y-3">
                  <span className="text-xs text-slate-400">Drag items to rearrange into correct sequence:</span>
                  <div className="space-y-2">
                    {(sortArrangement.length === challenge.sortItems.length
                      ? sortArrangement.map(idx => challenge.sortItems![idx])
                      : challenge.sortItems
                    ).map((item, displayIdx) => (
                      <motion.div
                        key={displayIdx}
                        draggable
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        onDragStart={() => setDraggedItem(String(displayIdx))}
                        onDragOver={e => e.preventDefault()}
                        onDrop={() => {
                          const fromIdx = parseInt(draggedItem || '0');
                          handleSortMove(fromIdx, displayIdx);
                        }}
                        className="p-3 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold cursor-grab flex items-center gap-3"
                      >
                        <span className="w-5 h-5 rounded-full bg-gold-900 text-gold-300 flex items-center justify-center font-mono">
                          {displayIdx + 1}
                        </span>
                        {item}
                      </motion.div>
                    ))}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSortSubmit}
                    disabled={showExplanation}
                    className="px-5 py-2.5 rounded-xl bg-gold-600 text-white font-bold text-xs"
                  >
                    Submit Order →
                  </motion.button>
                </div>
              )}

              {/* NUMERIC CHALLENGE */}
              {challenge.type === 'numeric' && (
                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      step="any"
                      value={numericInput}
                      onChange={e => setNumericInput(e.target.value)}
                      placeholder="Enter numeric value..."
                      className="px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-gold-500 w-48 font-mono"
                      aria-label="Enter calculated numeric answer"
                    />
                    <span className="text-xs text-slate-400 font-mono">{challenge.unit}</span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAnswer(numericInput)}
                      disabled={showExplanation || !numericInput}
                      className="px-5 py-2.5 rounded-xl bg-gold-600 text-white font-bold text-xs shadow-md shadow-gold-600/20"
                    >
                      Check Answer →
                    </motion.button>
                  </div>
                </div>
              )}

              {/* CONSTRUCT CHALLENGE */}
              {challenge.type === 'construct' && challenge.availableParts && (
                <div className="space-y-4 pt-2">
                  <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-xs text-slate-400 w-full mb-1">Equation Building Blocks:</span>
                    {challenge.availableParts.map((part, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAddConstructPart(part)}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-gold-300 font-mono text-xs font-bold border border-slate-700"
                      >
                        + {part}
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 min-h-[60px] flex flex-wrap gap-2 items-center">
                    {constructParts.map((part, i) => (
                      <motion.span
                        key={i}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleRemoveConstructPart(i)}
                        className="px-2.5 py-1 rounded bg-gold-900/60 border border-gold-500 text-gold-200 font-mono text-xs cursor-pointer hover:bg-rose-900/60 transition-colors"
                        title="Click to remove"
                      >
                        {part} ×
                      </motion.span>
                    ))}
                    {constructParts.length === 0 && (
                      <span className="text-xs text-slate-500 font-mono">Assemble formula here...</span>
                    )}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(constructParts.join(' '))}
                    disabled={showExplanation || constructParts.length === 0}
                    className="px-5 py-2.5 rounded-xl bg-gold-600 text-white font-bold text-xs"
                  >
                    Verify Constructed Formula →
                  </motion.button>
                </div>
              )}

              {/* EXPLANATION & PROGRESSIVE DISCLOSURE */}
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-5 p-4 rounded-xl bg-gold-950/40 border border-gold-800/60 space-y-3"
                >
                  <div className="flex items-center gap-2 text-gold-300 font-bold text-xs uppercase tracking-wider">
                    <span>📘</span> Step-by-Step Physical Explanation
                  </div>

                  <div className="space-y-2">
                    {challenge.explanation
                      .split('. ')
                      .filter(s => s.trim().length > 0)
                      .slice(0, revealedSteps + 1)
                      .map((sentence, sIdx) => (
                        <motion.p
                          key={sIdx}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="text-xs text-slate-200 leading-relaxed font-sans"
                        >
                          <span className="font-bold text-gold-400 font-mono">{sIdx + 1}.</span> {sentence}
                          {!sentence.endsWith('.') && '.'}
                        </motion.p>
                      ))}
                  </div>

                  {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-3 py-1.5 rounded-lg bg-gold-800/70 hover:bg-gold-700 text-gold-100 text-xs font-bold"
                    >
                      Reveal Next Reasoning Step ↓
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-xs shadow-md shadow-emerald-500/20"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Master Lab Assessment →' : 'Proceed to Next Challenge →'}
                    </motion.button>
                  )}
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── PHASE 5: COMPLETION, MOTIVATIONAL FEEDBACK & REFLECTION ─── */}
      <AnimatePresence mode="wait">
        {phase === 'complete' && (
          <motion.div
            key="complete"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="mt-6 space-y-6"
          >
            {/* Completion Hero Banner */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-gold-950 to-gold-950 border border-gold-700/50 text-center space-y-2"
            >
              <span className="text-4xl">🏆</span>
              <h2 className="text-2xl font-bold text-white">ISC Physics Mastery Achieved!</h2>
              <p className="text-sm text-gold-300">
                Final Competency Score: <strong className="text-white text-base">{Math.max(0, 100 - errors * 5)}%</strong> ({scoreBreakdown.correct} of {scoreBreakdown.total} challenges correct)
              </p>
            </motion.div>

            {/* REQUIRED MOTIVATIONAL FEEDBACK */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className={`p-4 rounded-xl border text-center font-bold text-sm tracking-wide ${
                errors === 0
                  ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300'
                  : errors <= 3
                  ? 'bg-gold-950/60 border-gold-500 text-gold-300'
                  : errors <= 7
                  ? 'bg-amber-950/60 border-amber-500 text-amber-300'
                  : 'bg-rose-950/60 border-rose-500 text-rose-300'
              }`}
            >
              <span className="text-lg mr-2">
                {errors === 0 ? '🌟' : errors <= 3 ? '🚀' : errors <= 7 ? '💪' : '🌱'}
              </span>
              {getMotivationalFeedback(errors)}
            </motion.div>

            {/* REQUIRED REFLECTION SECTION */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4"
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">🧠</span>
                <div>
                  <h3 className="text-sm font-bold text-gold-300 uppercase tracking-wider">Conceptual Reflection</h3>
                  <p className="text-xs text-slate-400">Synthesize your insights to lock in deep understanding.</p>
                </div>
              </div>

              <div className="space-y-4">
                {REFLECTION_QUESTIONS.map(rq => (
                  <div key={rq.id} className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-200 block">
                      {rq.prompt}
                    </label>
                    <textarea
                      rows={2}
                      value={reflectionAnswers[rq.id] || ''}
                      onChange={e => setReflectionAnswers(prev => ({ ...prev, [rq.id]: e.target.value }))}
                      placeholder={rq.placeholder}
                      disabled={reflectionsSubmitted}
                      className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-gold-500"
                    />
                  </div>
                ))}
              </div>

              {!reflectionsSubmitted ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setReflectionsSubmitted(true);
                    audioManager.play('success');
                    speechManager.speak('Great reflections! Self-explanation cements neural connections.');
                  }}
                  className="px-5 py-2 rounded-xl bg-gold-600 hover:bg-gold-500 text-white font-bold text-xs shadow-md shadow-gold-600/20"
                >
                  Save Reflection Insights →
                </motion.button>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5"
                >
                  <span>✓</span> Reflection notes recorded to your study profile!
                </motion.div>
              )}
            </motion.div>

            {/* Misconception Review */}
            {hitMisconceptions.length > 0 && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="p-5 rounded-xl bg-rose-950/40 border border-rose-800 space-y-3"
              >
                <span className="text-xs font-bold text-rose-300 uppercase">Targeted Conceptual Corrections</span>
                <div className="space-y-2">
                  {hitMisconceptions.map(idx => {
                    const m = misconceptions?.[idx];
                    if (!m) return null;
                    return (
                      <motion.div
                        key={idx}
                        whileHover={{ scale: 1.01 }}
                        className="p-3 bg-slate-900 rounded-lg text-xs space-y-1"
                      >
                        <p className="text-rose-400 font-bold">❌ Misconception: {m.misconception}</p>
                        <p className="text-emerald-300 font-medium">✓ Physical Truth: {m.correction}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Spaced Repetition Schedule */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="p-4 rounded-xl bg-amber-950/40 border border-amber-800 text-xs text-amber-200 space-y-1"
            >
              <span className="font-bold uppercase tracking-wider text-amber-300">SM-2 Spaced Repetition Active</span>
              <p>
                Your next review session for these nodes is scheduled in{' '}
                <strong>{errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}</strong> to lock in long-term retention.
              </p>
            </motion.div>

            {/* Real World Activity */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3"
            >
              <h3 className="text-sm font-bold text-gold-300 flex items-center gap-2">
                <span>🛰️</span> {REAL_WORLD_ACTIVITY.title}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
              <ul className="space-y-1.5 text-xs text-slate-400">
                {REAL_WORLD_ACTIVITY.steps.map((st, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="font-mono text-gold-400">{i + 1}.</span> {st}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── FLOATING FEEDBACK NOTIFICATIONS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Mastery Unit Completed!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </motion.div>
  );
}

export default C11_PhysicsRefrigeratorCoefficientPerformanceSim;