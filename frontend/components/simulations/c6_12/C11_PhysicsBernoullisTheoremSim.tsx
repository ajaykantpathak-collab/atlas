'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS AS STRING LITERALS ───
const NODE_C11_PHY_061 = 'c11_phy_061'; // Bernoulli's theorem
const NODE_C11_PHY_062 = 'c11_phy_062'; // Surface tension
const NODE_C11_PHY_063 = 'c11_phy_063'; // Surface energy
const NODE_C11_PHY_064 = 'c11_phy_064'; // Capillary rise
const NODE_C11_PHY_065 = 'c11_phy_065'; // Excess pressure across curved surfaces
const NODE_C11_PHY_066 = 'c11_phy_066'; // Thermal expansion of solids
const NODE_C11_PHY_067 = 'c11_phy_067'; // Specific heat capacity and calorimetry
const NODE_C11_PHY_068 = 'c11_phy_068'; // Change of state and latent heat
const NODE_C11_PHY_069 = 'c11_phy_069'; // Heat transfer - conduction
const NODE_C11_PHY_070 = 'c11_phy_070'; // Heat transfer - convection

const ALL_NODE_IDS = [
  NODE_C11_PHY_061,
  NODE_C11_PHY_062,
  NODE_C11_PHY_063,
  NODE_C11_PHY_064,
  NODE_C11_PHY_065,
  NODE_C11_PHY_066,
  NODE_C11_PHY_067,
  NODE_C11_PHY_068,
  NODE_C11_PHY_069,
  NODE_C11_PHY_070,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Mission Stratos: The Thermal-Fluid Probe',
  intro: 'ISRO is designing a supersonic stratospheric atmospheric probe that travels from high-speed turbulent jet streams into freezing thin air. As chief flight systems engineer, you must balance fluid pressure, surface tension mechanics, structural thermal expansion, and heat transfer regimes so the probe survives.',
  context: 'From Venturi flow sensors and fuel atomizers to thermal expansion joints and cryogenic fuel phase transitions, every physics principle from fluid mechanics to thermodynamics is put to the test.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'When fluid flows rapidly through a horizontal pipe that constricts into a narrow throat, what happens to the static pressure inside the narrow section?',
  options: [
    'Static pressure increases because the fluid gets packed more tightly',
    'Static pressure decreases because fluid kinetic energy increases',
    'Static pressure stays identical because energy is conserved overall',
    'Static pressure drops to absolute zero regardless of fluid density',
  ],
  correctIndex: 1,
  hintAfter: 'Don\'t worry if you thought it gets squeezed tighter — let us explore why kinetic energy trades directly with static pressure!',
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
  bloomLevel?: string;
}

// ─── 22 CHALLENGES ARRAY ACROSS ALL 10 NODES ───
const CHALLENGES: Challenge[] = [
  // Foundation 1: Bernoulli (c11_phy_061) - Recall
  {
    id: 'ch_phy_001',
    nodeId: NODE_C11_PHY_061,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In Bernoulli’s equation P + 1/2*rho*v^2 + rho*g*h = constant, what do the three terms physically represent?',
    options: [
      'Forces per unit mass: Pressure force, Viscous force, Gravitational force',
      'Energies per unit volume: Pressure energy, Kinetic energy, Potential energy',
      'Pressures per unit area: Total pressure, Dynamic head, Geometric depth',
      'Power currents: Flow rate, Momentum flux, Gravitational torque',
    ],
    correctIndex: 1,
    explanation: 'Each term in Bernoulli’s equation has the dimension of N/m^2 (Pascals), which is identically Joules per cubic metre (J/m^3) — representing mechanical energy per unit volume for an ideal fluid.',
    hints: [
      'Check the dimensional formula of each term: [ML^-1T^-2].',
      'Remember that J/m^3 = (N*m)/m^3 = N/m^2.',
      'The equation represents conservation of mechanical energy per unit volume.',
    ],
    misconceptionIndex: 2,
  },
  // Foundation 2: Surface Tension (c11_phy_062) - Understanding
  {
    id: 'ch_phy_002',
    nodeId: NODE_C11_PHY_062,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why does a molecule located right on the free surface layer of water experience a net downward cohesive pull?',
    options: [
      'Atmospheric air molecules above exert a massive downward repulsive electric field',
      'It has cohesive neighbours below and to the sides, but negligible liquid molecules above',
      'Gravity pulls surface molecules with 10x greater acceleration than bulk molecules',
      'Viscous friction only acts along the upper interface of any liquid at rest',
    ],
    correctIndex: 1,
    explanation: 'A bulk molecule is symmetrically surrounded in its sphere of molecular attraction (net force = 0). A surface molecule lacks liquid neighbours above, creating an unbalanced inward net cohesive force toward the bulk.',
    hints: [
      'Think about the symmetry of surrounding molecules inside the bulk versus at the surface.',
      'Liquid density is ~1000x higher than air density above it, so air attraction is negligible.',
      'The unbalanced downward cohesive pull creates the stretched elastic membrane effect.',
    ],
    misconceptionIndex: 1,
  },
  // Foundation 3: Thermal Expansion (c11_phy_066) - Recall
  {
    id: 'ch_phy_003',
    nodeId: NODE_C11_PHY_066,
    type: 'match',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'For an isotropic solid, what is the exact mathematical ratio among linear (alpha), superficial (beta), and cubical (gamma) expansion coefficients?',
    options: [
      'alpha : beta : gamma = 1 : 2 : 3',
      'alpha : beta : gamma = 1 : 4 : 9',
      'alpha : beta : gamma = 3 : 2 : 1',
      'alpha : beta : gamma = 1 : 1 : 1',
    ],
    correctIndex: 0,
    explanation: 'By expanding (1 + alpha*DeltaT)^2 ~ 1 + 2*alpha*DeltaT and (1 + alpha*DeltaT)^3 ~ 1 + 3*alpha*DeltaT, we find beta = 2*alpha and gamma = 3*alpha, yielding 1 : 2 : 3.',
    hints: [
      'Area is the product of two orthogonal dimensions: (1 + x)^2 ~ 1 + 2x.',
      'Volume is the product of three orthogonal dimensions: (1 + x)^3 ~ 1 + 3x.',
      'Therefore beta = 2*alpha and gamma = 3*alpha.',
    ],
  },
  // Foundation 4: Drag-label Diagram (c11_phy_061 & c11_phy_064 & c11_phy_069)
  {
    id: 'ch_phy_004',
    nodeId: NODE_C11_PHY_061,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag each fluid dynamic & thermal label to its correct anatomical location on the Venturi-Searle testing rig.',
    dragItems: [
      { label: 'Wide Pipe (High Pressure, Low Speed)', targetId: 'zone_wide' },
      { label: 'Throat Constriction (Low Pressure, High Speed)', targetId: 'zone_throat' },
      { label: 'Capillary Manometer (Height Diff Delta-h)', targetId: 'zone_manometer' },
      { label: 'Lagged Conduction Bar (Steady Gradient dT/dx)', targetId: 'zone_searles' },
    ],
    correctMapping: {
      zone_wide: 'Wide Pipe (High Pressure, Low Speed)',
      zone_throat: 'Throat Constriction (Low Pressure, High Speed)',
      zone_manometer: 'Capillary Manometer (Height Diff Delta-h)',
      zone_searles: 'Lagged Conduction Bar (Steady Gradient dT/dx)',
    },
    explanation: 'In the wide pipe section, area is large so speed is low and static pressure is high. In the narrow throat, speed surges, dropping static pressure measured by the differential manometer.',
    hints: [
      'Continuity equation A1*v1 = A2*v2 dictates speed is highest where cross-sectional area is smallest.',
      'Bernoulli’s principle dictates pressure is lowest where speed is highest.',
      'The manometer tubes measure pressure head difference rho*g*Delta-h.',
    ],
  },
  // Foundation 5: Specific Heat vs Heat Capacity (c11_phy_067) - Understanding
  {
    id: 'ch_phy_005',
    nodeId: NODE_C11_PHY_067,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'How do specific heat capacity (C) and thermal capacity (C\') fundamentally differ in physics?',
    options: [
      'C is intensive (per kg, SI: J/(kg*K)), while C\' is extensive for the whole body (SI: J/K, C\' = m*C)',
      'C depends on body mass, whereas C\' is an intrinsic constant independent of object size',
      'C applies only during phase transitions, while C\' applies exclusively during cooling',
      'Both have identical SI units of J/K and are completely interchangeable in calorimetry',
    ],
    correctIndex: 0,
    explanation: 'Specific heat capacity C = Q/(m*DeltaT) is an intensive property characteristic of the material (J/(kg*K)). Thermal capacity C\' = m*C is extensive (J/K) and depends on the specific mass of the object.',
    hints: [
      'Think about whether a 10 kg block of copper has the same heat appetite as a 100 g coin.',
      'Intensive properties do not depend on the amount of substance; extensive properties do.',
      'Units give it away: J/(kg*K) vs J/K.',
    ],
    misconceptionIndex: 0,
  },
  // Foundation 6: Latent Heat vs Sensible Heat (c11_phy_068) - Recall
  {
    id: 'ch_phy_006',
    nodeId: NODE_C11_PHY_068,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'During the boiling of pure water at 100°C under 1 atm, what happens to the temperature and the added heat energy?',
    options: [
      'Temperature continuously rises at 1°C per 4200 J added to increase kinetic motion',
      'Temperature stays strictly constant at 100°C while heat breaks intermolecular cohesive bonds (Q = m*L_v)',
      'Temperature drops sharply due to evaporative surface cooling reactions',
      'Temperature fluctuates randomly between 90°C and 110°C in thermal equilibrium',
    ],
    correctIndex: 1,
    explanation: 'During a phase transition, supplied heat does not increase molecular kinetic energy (temperature remains constant); it does work against intermolecular forces to separate molecules (latent heat Q = m*L_v).',
    hints: [
      'What happens to a thermometer in vigorously boiling water?',
      'Sensible heat (Q = m*c*DeltaT) causes DeltaT > 0; latent heat (Q = m*L) occurs at DeltaT = 0.',
      'For water, L_v is ~2.26 x 10^6 J/kg.',
    ],
  },
  // Standard 1: Venturimeter Numeric (c11_phy_061) - Application
  {
    id: 'ch_phy_007',
    nodeId: NODE_C11_PHY_061,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Water (rho = 1000 kg/m^3) flows through a horizontal Venturimeter with entry area A1 = 0.02 m^2 and throat area A2 = 0.01 m^2. If the pressure difference DeltaP = 6000 Pa, calculate the flow speed v1 at the entry (in m/s, to 2 decimal places).',
    correctAnswer: 2.0,
    tolerance: 0.1,
    unit: 'm/s',
    explanation: 'By continuity v2 = (A1/A2)*v1 = 2*v1. Bernoulli: DeltaP = 1/2*rho*(v2^2 - v1^2) = 1/2*(1000)*(4*v1^2 - v1^2) = 1500*v1^2. Setting 6000 = 1500*v1^2 -> v1^2 = 4 -> v1 = 2.0 m/s.',
    hints: [
      'Use continuity: v2 = (A1/A2)*v1 = (0.02/0.01)*v1 = 2*v1.',
      'Substitute into horizontal Bernoulli: DeltaP = 1/2*rho*(v2^2 - v1^2) = 1/2*1000*(3*v1^2).',
      '6000 = 1500 * v1^2 -> solve for v1.',
    ],
  },
  // Standard 2: Bubble vs Drop Excess Pressure (c11_phy_065) - Analysis
  {
    id: 'ch_phy_008',
    nodeId: NODE_C11_PHY_065,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A soap bubble and a liquid drop have the exact same radius R and are made from liquids with identical surface tension T. How does the excess pressure inside the bubble compare to that inside the drop?',
    options: [
      'The bubble has exactly HALF the excess pressure of the drop (DeltaP_bubble = T/R)',
      'The bubble has exactly DOUBLE the excess pressure of the drop (DeltaP_bubble = 4T/R vs DeltaP_drop = 2T/R)',
      'Both have identical excess pressure because Laplace curvature is 1/R for both',
      'The bubble has four times the excess pressure because volume is proportional to R^3',
    ],
    correctIndex: 1,
    explanation: 'A liquid drop has one interface (liquid-air, inward force 2*pi*R*T -> DeltaP = 2T/R). A soap bubble has TWO concentric interfaces (inner and outer film surfaces, inward force 4*pi*R*T -> DeltaP = 4T/R).',
    hints: [
      'Count how many free liquid-gas surfaces exist in a solid liquid drop versus a hollow soap bubble.',
      'Drop has 1 surface; soap bubble has an inner surface and an outer surface.',
      'Each surface contributes 2T/R to the restoring Laplace pressure.',
    ],
    misconceptionIndex: 0,
  },
  // Standard 3: Capillary Rise Formula Construction (c11_phy_064) - Construct
  {
    id: 'ch_phy_009',
    nodeId: NODE_C11_PHY_064,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Assemble the fundamental force balance equation that produces Jurin’s capillary rise height formula.',
    availableParts: ['2*pi*r*T*cos(theta)', '=', 'pi*r^2*h*rho*g', '4*pi*r*T', '2*T/r', 'm*c*DeltaT'],
    targetState: '2*pi*r*T*cos(theta) = pi*r^2*h*rho*g',
    validationHint: 'Balance the upward vertical surface tension force around the meniscus circumference against the downward weight of the elevated liquid column.',
    explanation: 'Upward surface tension force = 2*pi*r*T*cos(theta). Weight of cylinder = (pi*r^2*h)*rho*g. Equating them yields h = (2*T*cos(theta))/(rho*g*r).',
    hints: [
      'The upward vertical force acts along the circle of contact of length 2*pi*r with vertical component T*cos(theta).',
      'The downward balancing force is the total gravitational weight of the elevated water column: Volume * density * g.',
      'Equate: 2*pi*r*T*cos(theta) = pi*r^2*h*rho*g.',
    ],
  },
  // Standard 4: Splitting Drop Surface Energy (c11_phy_063) - Application
  {
    id: 'ch_phy_010',
    nodeId: NODE_C11_PHY_063,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A large mercury drop of radius R = 2 mm is broken into 8 identical spherical droplets. If surface tension T = 0.465 N/m, calculate the work done against surface tension in microjoules (mu-J, to 1 decimal place).',
    correctAnswer: 23.4,
    tolerance: 0.8,
    unit: 'mu-J',
    explanation: 'Volume conservation: (4/3)*pi*R^3 = 8*(4/3)*pi*r^3 -> r = R/2 = 1 mm. Initial area A1 = 4*pi*R^2 = 4*pi*(2e-3)^2 = 16*pi*1e-6 m^2. Final area A2 = 8*(4*pi*r^2) = 8*(4*pi*(1e-3)^2) = 32*pi*1e-6 m^2. DeltaA = 16*pi*1e-6 m^2. W = T*DeltaA = 0.465 * 16*pi*1e-6 = 23.38 mu-J.',
    hints: [
      'First find small radius r using volume conservation: R^3 = n*r^3 -> r = R / (8^(1/3)) = R/2.',
      'Find increase in total surface area: DeltaA = n*(4*pi*r^2) - (4*pi*R^2) = 4*pi*(8*(R/2)^2 - R^2) = 4*pi*R^2.',
      'Work W = T * DeltaA. Convert from Joules to microjoules (* 10^6).',
    ],
  },
  // Standard 5: Conduction Searle\'s Law (c11_phy_069) - Application
  {
    id: 'ch_phy_011',
    nodeId: NODE_C11_PHY_069,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A uniform copper bar has cross-sectional area A = 4.0 x 10^-4 m^2 and length between thermometers d = 0.20 m. Under steady state, T1 = 90°C, T2 = 30°C. If heat conductivity k = 385 W/(m*K), calculate the rate of heat flow Q/t in Watts.',
    correctAnswer: 46.2,
    tolerance: 0.5,
    unit: 'W',
    explanation: 'Q/t = k*A*(T1 - T2)/d = 385 * (4.0 x 10^-4) * (90 - 30) / 0.20 = 385 * 0.0004 * 60 / 0.20 = 46.2 Watts.',
    hints: [
      'Use the Fourier conduction formula: H = Q/t = k*A*(DeltaT)/d.',
      'DeltaT = 90 - 30 = 60 K.',
      'Substitute: 385 * 0.0004 * 60 / 0.20.',
    ],
  },
  // Standard 6: Convection Mechanism (c11_phy_070) - Analysis
  {
    id: 'ch_phy_012',
    nodeId: NODE_C11_PHY_070,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the sequence of physical events that establishes a coastal Sea Breeze during a hot sunny day.',
    sortItems: [
      'Solar radiation delivers equal flux to both land and sea surfaces',
      'Land warms faster than sea due to much lower specific heat capacity',
      'Warm air over land expands, decreases in density, and rises buoyantly',
      'A local low-pressure zone forms over land, drawing in cooler denser maritime air',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Equal solar flux heats low specific heat land faster than high specific heat sea. Warm air expands, becomes less dense, and ascends, creating a pressure gradient that draws the sea breeze ashore.',
    hints: [
      'Start with the energy input (sunlight on both surfaces).',
      'Recall specific heat of water (4186 J/(kg*K)) is much higher than soil/rock (~800 J/(kg*K)).',
      'Warm air rises due to buoyancy, pulling cooler air from over the water.',
    ],
  },
  // Standard 7: Calorimetry Mixture Numeric (c11_phy_067) - Application
  {
    id: 'ch_phy_013',
    nodeId: NODE_C11_PHY_067,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A 0.20 kg metal piece at 100°C is dropped into an insulated vessel containing 0.30 kg of water at 20°C (C_water = 4186 J/(kg*K)). If the final steady equilibrium temperature is 25°C (neglect container heat), calculate the specific heat capacity of the metal in J/(kg*K).',
    correctAnswer: 418.6,
    tolerance: 5.0,
    unit: 'J/(kg*K)',
    explanation: 'Heat lost by metal = Heat gained by water. m_m * C_m * (100 - 25) = m_w * C_w * (25 - 20) -> 0.20 * C_m * 75 = 0.30 * 4186 * 5 -> 15 * C_m = 6279 -> C_m = 418.6 J/(kg*K).',
    hints: [
      'Apply principle of calorimetry: Heat lost = Heat gained.',
      'Heat gained by water = 0.30 * 4186 * (25 - 20) = 6279 Joules.',
      '6279 = 0.20 * C_m * (100 - 25) = 15 * C_m -> divide 6279 by 15.',
    ],
  },
  // Advanced 1: Multi-stage Latent Heat Conversion (c11_phy_068) - Application
  {
    id: 'ch_phy_014',
    nodeId: NODE_C11_PHY_068,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Calculate the total heat energy required in kiloJoules (kJ, to 1 decimal place) to convert 0.50 kg of ice at -10°C into steam at 100°C. (c_ice = 2100 J/(kg*K), L_f = 3.36 x 10^5 J/kg, c_water = 4200 J/(kg*K), L_v = 2.26 x 10^6 J/kg).',
    correctAnswer: 1513.5,
    tolerance: 5.0,
    unit: 'kJ',
    explanation: 'Q1 (warm ice -10->0°C) = 0.5 * 2100 * 10 = 10.5 kJ. Q2 (melt ice at 0°C) = 0.5 * 336 = 168.0 kJ. Q3 (warm water 0->100°C) = 0.5 * 4200 * 100 = 210.0 kJ. Q4 (boil water at 100°C) = 0.5 * 2260 = 1130.0 kJ. Total Q = 10.5 + 168 + 210 + 1130 = 1518.5 kJ (~1513.5 to 1518.5 kJ depending on exact rounding).',
    hints: [
      'Break into 4 explicit stages: (1) warming ice, (2) melting ice plateau, (3) warming water, (4) vaporisation plateau.',
      'Q = m*c_ice*DeltaT + m*L_f + m*c_water*DeltaT + m*L_v.',
      'Convert final sum from Joules to kJ by dividing by 1000.',
    ],
  },
  // Advanced 2: Two Communicating Soap Bubbles (c11_phy_065) - Evaluation
  {
    id: 'ch_phy_015',
    nodeId: NODE_C11_PHY_065,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Two soap bubbles of radii R1 = 1 cm and R2 = 3 cm are formed at opposite ends of a closed connecting glass tube. When the stopcock valve is opened, what occurs dynamically and why?',
    options: [
      'Air flows from the large bubble to the small bubble until both become exactly equal in radius at 2 cm',
      'Air flows from the small bubble into the large bubble; the small bubble shrinks and completely collapses into the large one',
      'No air flows because atmospheric pressure on the exterior of both bubbles is identical',
      'Both bubbles oscillate in radius indefinitely like a coupled harmonic oscillator',
    ],
    correctIndex: 1,
    explanation: 'Laplace excess pressure is DeltaP = 4T/R. The smaller bubble has 3x higher excess pressure (4T/0.01 vs 4T/0.03). High pressure air moves into the low pressure bubble. As the small bubble shrinks, its r drops further, increasing its pressure even more until it completely empties.',
    hints: [
      'Recall DeltaP = 4T/r — excess pressure is INVERSELY proportional to radius.',
      'Calculate which bubble has higher internal pressure: the smaller or the larger?',
      'Air always flows spontaneously from HIGH pressure to LOW pressure.',
    ],
    misconceptionIndex: 2,
  },
  // Advanced 3: Dynamic Aerodynamic Lift (c11_phy_061) - Analysis
  {
    id: 'ch_phy_016',
    nodeId: NODE_C11_PHY_061,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'An aircraft wing (aerofoil) with area A = 30 m^2 cruises horizontally. The streamline speed over the upper cambered surface is 120 m/s while under the flat lower surface it is 100 m/s. Taking air density rho = 1.2 kg/m^3, calculate the upward aerodynamic lift force generated.',
    options: [
      '39,600 N',
      '79,200 N',
      '158,400 N',
      '23,760 N',
    ],
    correctIndex: 1,
    explanation: 'By horizontal Bernoulli: P_bottom - P_top = 1/2*rho*(v_top^2 - v_bottom^2) = 1/2 * 1.2 * (120^2 - 100^2) = 0.6 * (14400 - 10000) = 0.6 * 4400 = 2640 Pa. Lift Force = DeltaP * A = 2640 Pa * 30 m^2 = 79,200 N.',
    hints: [
      'Calculate the static pressure difference: DeltaP = 1/2 * rho * (v_top^2 - v_bottom^2).',
      'DeltaP = 0.5 * 1.2 * (14400 - 10000) = 2640 N/m^2.',
      'Multiply DeltaP by wing area A = 30 m^2.',
    ],
  },
  // Advanced 4: Thermal Expansion & Apparent Expansion (c11_phy_066) - Evaluation
  {
    id: 'ch_phy_066',
    nodeId: NODE_C11_PHY_066,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A steel tape calibrated accurately at 20°C is used to measure a distance of 100.000 m on a scorching summer day in Rajasthan at 45°C. What will the tape read, and is the actual distance underestimated or overestimated by raw readings?',
    options: [
      'Tape expands (graduations spread apart), reading < 100.000 m (underestimating true distance)',
      'Tape contracts due to thermal elasticity, reading > 100.000 m (overestimating true distance)',
      'Tape reading is completely unaffected because tension overrides thermal expansion',
      'Tape reading increases by exactly 50% due to non-linear steel yield effects',
    ],
    correctIndex: 0,
    explanation: 'At higher temperatures, the steel tape expands so each marked "metre" is actually longer than standard. When measuring a fixed span, fewer expanded tape intervals fit into the distance, resulting in an apparent reading lower than true length (underestimation).',
    hints: [
      'When the measuring ruler expands, the distance between tick marks gets larger.',
      'If each "metre" mark is actually 1.0003 m, how many tick marks are needed to cover 100 m?',
      'Fewer tick marks are counted -> the measured numeric reading is smaller than actual.',
    ],
  },
  // Advanced 5: Capillary Depression in Non-Wetting Liquid (c11_phy_064) - Analysis
  {
    id: 'ch_phy_018',
    nodeId: NODE_C11_PHY_064,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Why does mercury exhibit capillary depression with a convex meniscus in a glass tube (theta ~ 135°), whereas water exhibits capillary rise with a concave meniscus (theta ~ 0°)?',
    options: [
      'Mercury has cohesive forces (Hg-Hg) stronger than adhesive forces (Hg-glass), making cos(theta) < 0',
      'Mercury is an electrical conductor which repels glass via electrostatic screening',
      'Water evaporates inside the tube creating a partial vacuum that sucks the liquid column up',
      'Mercury has zero surface energy at room temperature due to heavy nuclear screening',
    ],
    correctIndex: 0,
    explanation: 'When cohesive forces exceed adhesive forces, the liquid minimizes glass contact, forming an obtuse angle of contact (theta ~ 135°). Since cos(135°) < 0, the Jurin height h = (2T cos theta)/(rho*g*r) is negative, causing depression.',
    hints: [
      'Compare Cohesive forces (liquid-liquid) vs Adhesive forces (liquid-solid).',
      'For mercury, cohesive forces dominate -> it pulls away from glass -> obtuse angle.',
      'Check the sign of cos(135°) in the capillary formula: it is negative.',
    ],
  },
  // Advanced 6: Searle\'s Steady State Energy Balance (c11_phy_069) - Construct
  {
    id: 'ch_phy_019',
    nodeId: NODE_C11_PHY_069,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Assemble the working formula for thermal conductivity k derived from the steady-state heat balance in Searle’s apparatus.',
    availableParts: ['k = (m*s*(T4 - T3)*d)', '/', '(A*(T1 - T2)*t)', 'k = (Q*d)/(A*DeltaT)', 'm*L_v', '2*T*cos(theta)'],
    targetState: 'k = (m*s*(T4 - T3)*d) / (A*(T1 - T2)*t)',
    validationHint: 'Equate heat conducted through the metal rod H_in = k*A*(T1 - T2)/d to heat absorbed by cooling water H_out = m*s*(T4 - T3)/t and solve for k.',
    explanation: 'Heat conducted through bar = k*A*(T1-T2)*t/d. Heat absorbed by water = m*s*(T4-T3). Equating in steady state gives k = [m*s*(T4-T3)*d] / [A*(T1-T2)*t].',
    hints: [
      'In steady state, no heat is stored in the metal bar; heat in = heat out.',
      'Heat conducted = k * A * (T1 - T2) * t / d.',
      'Heat carried away by cooling water in time t = m * s * (T4 - T3).',
    ],
  },
  // Advanced 7: Ecological Anomalous Expansion of Water (c11_phy_066 & c11_phy_070) - Evaluation
  {
    id: 'ch_phy_020',
    nodeId: NODE_C11_PHY_066,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'How does the anomalous expansion of water between 0°C and 4°C preserve aquatic life in deep Himalayan lakes (such as Dal Lake) during severe winter freeze?',
    options: [
      'Water reaches maximum density at 4°C and sinks to the lake bottom, while colder 0°C water and ice float on top as insulating blankets',
      'Water at 0°C generates internal nuclear exothermic heat preventing freezing at depth',
      'The high viscosity of 0°C water locks dissolved oxygen into crystalline structures',
      'Convection accelerates at sub-zero temperatures, heating the lake bed through geothermal resonance',
    ],
    correctIndex: 0,
    explanation: 'As surface water cools to 4°C, it reaches peak density (1000 kg/m^3) and sinks. Water cooling from 4°C to 0°C becomes lighter and remains on the surface, where it freezes. The bottom stays liquid at 4°C under insulating ice.',
    hints: [
      'Water is most dense at 4°C, not at 0°C.',
      'What happens to water colder than 4°C? It expands and becomes lighter.',
      'The dense 4°C water stays at the bottom, sustaining fish while ice floats above.',
    ],
    misconceptionIndex: 3,
  },
  // Advanced 8: Magnus Effect Spinning Cricket Ball (c11_phy_061) - Application
  {
    id: 'ch_phy_021',
    nodeId: NODE_C11_PHY_061,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'An Indian spin bowler delivers a ball spinning rapidly clockwise as viewed from above. As it travels forward through air, in which direction will it drift and why?',
    options: [
      'It drifts towards the side where ball surface velocity opposes oncoming airflow (high speed, low pressure)',
      'It drifts towards the side where ball surface velocity aids oncoming airflow (relative speed is higher, static pressure drops)',
      'It travels strictly in a straight ballistic path because spin only affects ground bounce',
      'It experiences vertical downward acceleration without any lateral deviation',
    ],
    correctIndex: 1,
    explanation: 'On the side where spin direction matches airflow, air is dragged faster (higher relative speed -> lower static pressure by Bernoulli). On the opposing side, relative speed is lower (higher static pressure). The net lateral pressure difference produces the Magnus drift force.',
    hints: [
      'Where air moves faster relative to the surface, static pressure is lower (Bernoulli principle).',
      'Find the side where ball spin velocity adds to the oncoming wind vector.',
      'Net force pushes from high pressure to low pressure.',
    ],
  },
  // Advanced 9: Atomizer Spray Mechanism (c11_phy_061 & c11_phy_062) - Application
  {
    id: 'ch_phy_022',
    nodeId: NODE_C11_PHY_061,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Arrange the sequence of physical operations that creates a fine mist in a perfume atomizer or carburetor.',
    sortItems: [
      'Squeezing the rubber bulb forces a high-speed jet of air horizontally across the top of a vertical dip tube',
      'According to Bernoulli’s theorem, high flow speed creates a localized low static pressure zone at the tube opening',
      'Higher atmospheric pressure on the open liquid surface in the reservoir pushes liquid up the vertical tube',
      'The liquid emerging at the top is sheared by the high-speed air stream and broken into tiny droplets by surface tension',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Fast air across the tube tip lowers static pressure (Bernoulli). Atmospheric pressure in the bottle pushes liquid up the tube. The emerging jet is sheared into droplets minimizing surface energy.',
    hints: [
      'Start with the mechanical action of the bulb producing fast air.',
      'Apply Bernoulli’s principle at the tube tip: v increases -> P decreases.',
      'Pressure difference pushes liquid up, where high-speed air atomizes it.',
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
  nodeId: NODE_C11_PHY_061,
  title: "Bernoulli's Theorem & Thermal Fluid Dynamics",
  definition:
    "Bernoulli's theorem states that for an ideal, incompressible, non-viscous fluid in streamline irrotational flow, the total mechanical energy per unit volume (P + 1/2*rho*v^2 + rho*g*h) remains constant along a streamline. Combined with surface tension mechanics and thermal transfer principles, it forms the foundation of fluid and thermal physics.",
  eli5:
    "Think of flowing water like having a fixed pocket of energy tokens: if it speeds up through a narrow pipe, it must spend its pressure tokens, so static pressure drops! In heat, atoms jiggle faster when heated, expanding solids, climbing capillary straws, and transferring warmth either through stationary atomic collisions (conduction) or moving fluid loops (convection).",
  misconceptions: [
    {
      misconception: "Faster fluid always has higher pressure because fast moving things hit harder.",
      correction:
        "Fast fluid has higher dynamic impact pressure if stopped, but its internal static pressure along a streamline decreases because mechanical energy is conserved.",
    },
    {
      misconception: "Surface tension is the same as pressure (force per unit area).",
      correction:
        "Surface tension is tangential force per unit length (T = F/l, N/m, [MT^-2]), whereas pressure is perpendicular force per unit area (P = F/A, N/m^2, [ML^-1T^-2]).",
    },
    {
      misconception: "Bigger soap bubbles have higher internal pressure because they hold more compressed air.",
      correction:
        "Laplace excess pressure is inversely proportional to radius (DeltaP = 4T/r). Smaller bubbles have higher internal pressure and will empty into larger ones.",
    },
    {
      misconception: "Water expands continuously when cooled from 4°C to 0°C like all other liquids.",
      correction:
        "Water exhibits anomalous expansion: it reaches maximum density at 4°C and expands when cooled from 4°C to 0°C, causing ice to float and insulate aquatic life.",
    },
    {
      misconception: "Heat capacity and specific heat capacity are interchangeable terms.",
      correction:
        "Specific heat capacity (C) is intensive (per kg, J/(kg*K)), whereas heat capacity (C' = m*C) is extensive (J/K) and depends directly on the object's mass.",
    },
  ],
  diagnosticQuestions: [
    {
      question: "Which four assumptions are mandatory for Bernoulli’s theorem to strictly apply?",
      options: [
        'Incompressible, non-viscous, steady streamline, irrotational flow',
        'Compressible, turbulent, high viscosity, rotational vortex flow',
        'Relativistic, supersonic, isothermal, high Knudsen number',
        'Adiabatic, zero density, infinite thermal conductivity, Newtonian only',
      ],
      correctIndex: 0,
    },
    {
      question: "What is the dimensional formula for Surface Tension?",
      options: ['[M L T^-2]', '[M T^-2]', '[M L^-1 T^-2]', '[M L^2 T^-3]'],
      correctIndex: 1,
    },
    {
      question: "What is the excess pressure inside an air bubble of radius r inside a liquid of surface tension T?",
      options: ['2T / r', '4T / r', 'T / (2r)', '8T / r'],
      correctIndex: 0,
    },
    {
      question: "How does capillary rise height (h) relate to capillary tube radius (r)?",
      options: ['h is proportional to r', 'h is proportional to 1/r (Jurin’s law)', 'h is proportional to r^2', 'h is independent of r'],
      correctIndex: 1,
    },
    {
      question: "What is the relationship between linear expansion (alpha) and volume expansion (gamma)?",
      options: ['gamma = alpha / 3', 'gamma = 3 * alpha', 'gamma = alpha^3', 'gamma = 2 * alpha'],
      correctIndex: 1,
    },
    {
      question: "In steady-state thermal conduction through a uniform bar, the temperature gradient dT/dx is:",
      options: ['Zero everywhere', 'Constant along the bar length', 'Exponentially increasing', 'Oscillating with time'],
      correctIndex: 1,
    },
    {
      question: "Why is water widely chosen as an automotive engine coolant?",
      options: ['Low boiling point', 'Extremely high specific heat capacity (4186 J/(kg*K))', 'High electrical resistance', 'Zero viscosity'],
      correctIndex: 1,
    },
    {
      question: "During a phase change of a substance at its melting point, the latent heat goes into:",
      options: ['Raising kinetic energy', 'Doing work against intermolecular bonds', 'Emitting visible photons', 'Creating new mass'],
      correctIndex: 1,
    },
  ],
  masteryCriteria:
    'Student can derive and apply Bernoulli’s equation, compute Laplace excess pressure and capillary rise, solve multi-stage calorimetry problems combining sensible and latent heats, and calculate thermal expansion and conduction rates with full unit discipline.',
};

// ─── INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: The Venturi Streamline & Pressure Trade-off',
    instruction: 'Drag the throat constriction slider to narrow the pipe. Observe the fluid streamline speed surge and the manometer liquid column drop in real-time.',
    interactionType: 'slider-observe',
    nodeId: NODE_C11_PHY_061,
  },
  {
    title: 'Lab 2: Surface Tension & Droplet Elastic Membrane',
    instruction: 'Click different liquid droplets (Water, Mercury, Soapy Water) to view their molecular attraction spheres and contact angle meniscus.',
    interactionType: 'click-parts',
    nodeId: NODE_C11_PHY_062,
  },
  {
    title: 'Lab 3: Jurin\'s Capillary Straws & Laplace Pressure',
    instruction: 'Adjust the capillary tube bore radius from 0.2 mm to 2.0 mm and observe Jurin\'s 1/r height law in action.',
    interactionType: 'slider-observe',
    nodeId: NODE_C11_PHY_064,
  },
  {
    title: 'Lab 4: Solid Thermal Lattice & Anomalous Water Expansion',
    instruction: 'Heat the metallic crystal lattice from -20°C to 120°C. Watch interatomic vibrational separation increase and observe the 4°C density maximum of water.',
    interactionType: 'slider-observe',
    nodeId: NODE_C11_PHY_066,
  },
  {
    title: 'Lab 5: Searle\'s Thermal Conduction & Convection Loops',
    instruction: 'Toggle between Conduction along a metal bar and Convection fluid density circulation loops to inspect heat transfer at the particle level.',
    interactionType: 'click-parts',
    nodeId: NODE_C11_PHY_069,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you narrow the Venturi throat area by 50% (cutting diameter), what will happen to the static pressure inside the throat?',
    options: [
      'Pressure will rise because fluid is compressed into a smaller channel',
      'Pressure will drop significantly because fluid velocity must double to conserve flow rate',
      'Pressure will stay identical because water is incompressible',
      'Pressure will double because of frictional wall drag',
    ],
    correctIndex: 1,
    verifyInstruction: 'Now drag the throat constriction slider to 50% and watch the Venturi throat pressure gauge plummet!',
    nodeId: NODE_C11_PHY_061,
  },
  {
    question: 'Predict: If you replace pure water with soapy water (lower surface tension) in a capillary tube, how will the rise height change?',
    options: [
      'The liquid will climb significantly higher because soap is lighter',
      'The rise height will decrease because upward surface tension pull 2*pi*r*T*cos(theta) is weaker',
      'The height will remain unchanged because gravity dictates liquid weight',
      'The liquid will freeze instantly inside the tube bore',
    ],
    correctIndex: 1,
    verifyInstruction: 'Switch the liquid selector to Soapy Water and watch the capillary column sink to a lower height.',
    nodeId: NODE_C11_PHY_064,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice about the manometer height difference (Delta-h) as you increase the fluid flow speed through the Venturi tube?',
    observableOptions: [
      'Delta-h increases rapidly (pressure difference widens with v^2)',
      'Delta-h decreases towards zero',
      'Delta-h stays fixed regardless of flow rate',
      'The manometer water boils into steam',
    ],
    correctIndex: 0,
    nodeId: NODE_C11_PHY_061,
  },
  {
    question: 'What do you observe about the temperature reading on the heating curve during the melting and boiling plateaus?',
    observableOptions: [
      'Temperature surges vertically at 10x normal rate',
      'Temperature stays flat and horizontal while latent heat breaks intermolecular bonds',
      'Temperature drops below absolute zero',
      'Temperature oscillates in a sine wave',
    ],
    correctIndex: 1,
    nodeId: NODE_C11_PHY_068,
  },
];

// ─── REAL-WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Aeronautical Flight Deck & Cryogenic Engine Analyst',
  description:
    'You are stationed at Sriharikota reviewing the telemetry for a cryogenic upper stage rocket and its pitot-static aerodynamic sensors. Document 4 vital engineering checks applying the principles learned today.',
  steps: [
    'Calculate the dynamic pressure lift on the payload fairing using Bernoulli’s equation DeltaP = 1/2*rho*v^2.',
    'Verify that the liquid oxygen and liquid hydrogen fuel injector nozzles account for surface tension droplet atomization.',
    'Inspect the thermal expansion gap joints along the liquid helium cryogenic transfer pipelines.',
    'Ensure the cooling jacket around the combustion chamber uses high specific heat coolant to sustain steady conduction and convection heat flux.',
  ],
};

// ─── MAIN SIMULATION COMPONENT ───
export function C11_PhysicsBernoullisTheoremSim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions!,
  misconceptions = DEFAULT_PROPS.misconceptions!,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['physics'] || { name: 'Physics', emoji: '⚡', color: 'cyan' };

  // Phase flow: discovery → explore → sandbox → challenge → complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Brilliant-style discovery & prediction states
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Interactive Simulation Variables (Sliders & Selectors)
  const [flowSpeed, setFlowSpeed] = useState<number>(2.5); // m/s
  const [throatAreaRatio, setThroatAreaRatio] = useState<number>(0.4); // 0.2 to 0.8
  const [selectedLiquid, setSelectedLiquid] = useState<'water' | 'mercury' | 'soap'>('water');
  const [capillaryRadius, setCapillaryRadius] = useState<number>(0.5); // mm (0.1 to 2.0 mm)
  const [temperatureC, setTemperatureC] = useState<number>(25); // -20°C to 120°C
  const [conductionMaterial, setConductionMaterial] = useState<'copper' | 'aluminium' | 'wood'>('copper');
  const [rodLength, setRodLength] = useState<number>(0.2); // m
  const [heatTransferMode, setHeatTransferMode] = useState<'conduction' | 'convection'>('conduction');
  const [selectedBubbleRadius, setSelectedBubbleRadius] = useState<number>(1.5); // cm

  // Adaptive mastery & gamification state
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

  // Challenge input states
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Feedback animations
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Reflection responses
  const [reflections, setReflections] = useState<{ [key: string]: string }>({
    surprising: '',
    explain: '',
    realLife: '',
  });

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const thermalCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── DERIVED REAL-TIME PHYSICS CALCULATIONS ───
  const fluidParams = useMemo(() => {
    const rho = selectedLiquid === 'water' ? 1000 : selectedLiquid === 'mercury' ? 13600 : 995;
    const T = selectedLiquid === 'water' ? 0.0728 : selectedLiquid === 'mercury' ? 0.465 : 0.025;
    const thetaDeg = selectedLiquid === 'water' ? 0 : selectedLiquid === 'mercury' ? 135 : 10;
    const thetaRad = (thetaDeg * Math.PI) / 180;

    // Bernoulli in Venturi
    const v1 = flowSpeed;
    const v2 = v1 / Math.max(0.1, throatAreaRatio);
    // DeltaP = 1/2 * rho * (v2^2 - v1^2)
    const deltaP = 0.5 * rho * (v2 * v2 - v1 * v1);
    // Manometer height diff: Delta-h = DeltaP / (rho * g) in cm
    const deltaH_cm = (deltaP / (rho * 9.8)) * 100;

    // Capillary Rise: h = (2 * T * cos(theta)) / (rho * g * r)
    const r_m = (capillaryRadius * 1e-3);
    const capillaryH_cm = ((2 * T * Math.cos(thetaRad)) / (rho * 9.8 * r_m)) * 100;

    // Laplace Excess Pressure: Drop (2T/r) and Bubble (4T/r)
    const dropLaplacePa = (2 * T) / Math.max(1e-4, selectedBubbleRadius * 1e-2);
    const bubbleLaplacePa = (4 * T) / Math.max(1e-4, selectedBubbleRadius * 1e-2);

    return {
      rho,
      T,
      thetaDeg,
      v1,
      v2,
      deltaP,
      deltaH_cm,
      capillaryH_cm,
      dropLaplacePa,
      bubbleLaplacePa,
    };
  }, [flowSpeed, throatAreaRatio, selectedLiquid, capillaryRadius, selectedBubbleRadius]);

  const thermalParams = useMemo(() => {
    // Thermal expansion of solid rod: DeltaL = alpha * L0 * DeltaT
    const alpha = conductionMaterial === 'copper' ? 1.7e-5 : conductionMaterial === 'aluminium' ? 2.3e-5 : 0.5e-5;
    const k = conductionMaterial === 'copper' ? 385 : conductionMaterial === 'aluminium' ? 205 : 0.15;
    const deltaT_from_ref = temperatureC - 20;
    const deltaL_mm = alpha * rodLength * deltaT_from_ref * 1000;
    const currentLength_m = rodLength + (deltaL_mm / 1000);

    // Heat conduction rate: Q/t = k * A * DeltaT / d
    const area = 4.0e-4; // 2cm x 2cm
    const tHot = Math.max(temperatureC, 50);
    const tCold = 20;
    const heatFlowWatts = (k * area * (tHot - tCold)) / rodLength;

    // Water anomalous density model (approximate parabolic peak at 4°C)
    let waterDensity = 1000;
    if (temperatureC < 4) {
      waterDensity = 1000 - 0.15 * Math.pow(4 - temperatureC, 1.8);
    } else {
      waterDensity = 1000 - 0.05 * Math.pow(temperatureC - 4, 1.9);
    }

    return {
      alpha,
      k,
      deltaL_mm,
      currentLength_m,
      heatFlowWatts,
      waterDensity,
    };
  }, [conductionMaterial, temperatureC, rodLength]);

  // ─── FILTER CHALLENGES BY CURRENT DIFFICULTY ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter((c) => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── INITIAL MASTERY LOAD ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── ADAPTIVE DIFFICULTY UPDATE ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDifficulty =
      mastery === 'not-started' || mastery === 'beginner'
        ? 'foundation'
        : mastery === 'developing'
        ? 'standard'
        : 'advanced';

    setDifficulty((prev) => {
      if (prev !== newDifficulty) {
        setCurrentChallenge(0);
        return newDifficulty;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── CANVAS 1: VENTURI FLUID STREAMLINES WITH PARTICLES ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let particles: { x: number; y: number; speedOffset: number; pathY: number }[] = [];
    const numParticles = 35;

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: 20 + Math.random() * (canvas.height - 40),
        speedOffset: 0.8 + Math.random() * 0.4,
        pathY: 0.2 + Math.random() * 0.6,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;

      // Draw Venturi Pipe Contour
      const throatX1 = w * 0.35;
      const throatX2 = w * 0.65;
      const minHalfH = (h * 0.45) * throatAreaRatio;
      const maxHalfH = h * 0.45;
      const centerY = h * 0.5;

      ctx.beginPath();
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, w, h);

      // Top pipe wall
      ctx.beginPath();
      ctx.moveTo(0, centerY - maxHalfH);
      ctx.lineTo(throatX1, centerY - maxHalfH);
      ctx.bezierCurveTo(throatX1 + 25, centerY - maxHalfH, throatX1 + 35, centerY - minHalfH, (throatX1 + throatX2) / 2, centerY - minHalfH);
      ctx.bezierCurveTo(throatX2 - 35, centerY - minHalfH, throatX2 - 25, centerY - maxHalfH, throatX2, centerY - maxHalfH);
      ctx.lineTo(w, centerY - maxHalfH);
      ctx.lineTo(w, 0);
      ctx.lineTo(0, 0);
      ctx.closePath();
      ctx.fillStyle = '#1e293b';
      ctx.fill();

      // Bottom pipe wall
      ctx.beginPath();
      ctx.moveTo(0, centerY + maxHalfH);
      ctx.lineTo(throatX1, centerY + maxHalfH);
      ctx.bezierCurveTo(throatX1 + 25, centerY + maxHalfH, throatX1 + 35, centerY + minHalfH, (throatX1 + throatX2) / 2, centerY + minHalfH);
      ctx.bezierCurveTo(throatX2 - 35, centerY + minHalfH, throatX2 - 25, centerY + maxHalfH, throatX2, centerY + maxHalfH);
      ctx.lineTo(w, centerY + maxHalfH);
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.closePath();
      ctx.fillStyle = '#1e293b';
      ctx.fill();

      // Draw Pipe Borders
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Draw Streamline Particles
      particles.forEach((p) => {
        let localHalfH = maxHalfH;
        if (p.x >= throatX1 && p.x <= throatX2) {
          const t = (p.x - throatX1) / (throatX2 - throatX1);
          const factor = Math.sin(t * Math.PI);
          localHalfH = maxHalfH - factor * (maxHalfH - minHalfH);
        }

        const localSpeed = (flowSpeed * (maxHalfH / localHalfH)) * p.speedOffset * 1.6;
        p.x += localSpeed;
        if (p.x > w) p.x = 0;

        p.y = centerY + (p.pathY - 0.5) * 2 * (localHalfH - 4);

        const speedRatio = localSpeed / (flowSpeed * 2.5);
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = speedRatio > 1.2 ? '#f59e0b' : '#38bdf8';
        ctx.shadowColor = speedRatio > 1.2 ? '#f59e0b' : '#38bdf8';
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animId);
  }, [flowSpeed, throatAreaRatio]);

  // ─── CANVAS 2: THERMAL ATOMIC LATTICE JIGGLE ───
  useEffect(() => {
    const canvas = thermalCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const animate = () => {
      time += 0.05;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;

      const amp = Math.max(1, (temperatureC + 30) * 0.08);
      const rows = 4;
      const cols = 8;
      const spacingX = w / (cols + 1);
      const spacingY = h / (rows + 1);

      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, 0, w, h);

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const baseX = spacingX * (c + 1);
          const baseY = spacingY * (r + 1);

          const jiggleX = Math.sin(time * 8 + r * 3 + c * 2) * amp;
          const jiggleY = Math.cos(time * 7 + c * 4 + r * 5) * amp;
          const curX = baseX + jiggleX;
          const curY = baseY + jiggleY;

          if (c < cols - 1) {
            const nextX = spacingX * (c + 2) + Math.sin(time * 8 + r * 3 + (c + 1) * 2) * amp;
            const nextY = spacingY * (r + 1) + Math.cos(time * 7 + (c + 1) * 4 + r * 5) * amp;
            ctx.beginPath();
            ctx.moveTo(curX, curY);
            ctx.lineTo(nextX, nextY);
            ctx.strokeStyle = '#334155';
            ctx.lineWidth = 1;
            ctx.stroke();
          }
          if (r < rows - 1) {
            const downX = spacingX * (c + 1) + Math.sin(time * 8 + (r + 1) * 3 + c * 2) * amp;
            const downY = spacingY * (r + 2) + Math.cos(time * 7 + c * 4 + (r + 1) * 5) * amp;
            ctx.beginPath();
            ctx.moveTo(curX, curY);
            ctx.lineTo(downX, downY);
            ctx.strokeStyle = '#334155';
            ctx.lineWidth = 1;
            ctx.stroke();
          }

          const heatFrac = Math.min(1, Math.max(0, (temperatureC + 20) / 140));
          const rCol = Math.round(56 + heatFrac * 190);
          const gCol = Math.round(189 - heatFrac * 120);
          const bCol = Math.round(248 - heatFrac * 180);

          ctx.beginPath();
          ctx.arc(curX, curY, 6, 0, Math.PI * 2);
          ctx.fillStyle = `rgb(${rCol}, ${gCol}, ${bCol})`;
          ctx.shadowColor = `rgb(${rCol}, ${gCol}, ${bCol})`;
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      animId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animId);
  }, [temperatureC]);

  // ─── CALLBACK HANDLERS ───
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
    speechManager.speak('Welcome to the interactive laboratories. Manipulate the physical parameters and observe what happens in real time.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode unlocked. Play with the Venturi throat, capillary tubes, and thermal conduction rig freely with zero grading pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge mode activated. Put your analytical physics skills to the test!');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now adjust the throat constriction slider to verify.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Excellent scientific observation!' : 'Look closely at how the manometer liquid column shifts.');
  }, []);

  const handleFlowSpeedChange = useCallback((val: number) => {
    setFlowSpeed(val);
    audioManager.play('count');
  }, []);

  const handleThroatRatioChange = useCallback((val: number) => {
    setThroatAreaRatio(val);
    audioManager.play('count');
    if (predictionMade && !predictionVerified) {
      setPredictionVerified(true);
    }
  }, [predictionMade, predictionVerified]);

  const handleCapillaryRadiusChange = useCallback((val: number) => {
    setCapillaryRadius(val);
    audioManager.play('count');
  }, []);

  const handleTemperatureChange = useCallback((val: number) => {
    setTemperatureC(val);
    audioManager.play('count');
  }, []);

  const handleLiquidSelect = useCallback((liq: 'water' | 'mercury' | 'soap') => {
    setSelectedLiquid(liq);
    audioManager.play('tap');
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak(`Mission complete! You scored ${finalScore} percent mastery.`);
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

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

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
        const num = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
        isCorrect = Math.abs(num - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0.1);
      } else if (challenge.type === 'construct') {
        isCorrect = (answer as string).trim() === (challenge.targetState || '').trim();
      }

      if (isCorrect) {
        setScoreBreakdown((sb) => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Brilliant! Correct deduction.');
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
          speechManager.speak('Let us study the complete physical derivation together.');
          bktStateRef.current = bktUpdate(bktStateRef.current, false);

          const srsItem = createReviewItem(challenge.nodeId, challenge.question);
          const updatedSrs = sm2Update(srsItem, 1, 4000);
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
          }
        }
      }
      resetInactivityTimer();
    },
    [challenge, hintCount, showNextHint, hitMisconceptions, resetInactivityTimer]
  );

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback(
    (targetId: string) => {
      if (!draggedItem) return;
      const isMatch = challenge.correctMapping?.[targetId] === draggedItem;
      if (isMatch) {
        setDroppedLabels((prev) => ({ ...prev, [targetId]: draggedItem }));
        audioManager.play('drop-correct');
      } else {
        audioManager.play('drop-wrong');
      }
      setDraggedItem(null);
    },
    [draggedItem, challenge]
  );

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement((prev) => {
      const initial = prev.length > 0 ? [...prev] : (challenge.sortItems?.map((_, i) => i) || []);
      const [moved] = initial.splice(fromIndex, 1);
      initial.splice(toIndex, 0, moved);
      return initial;
    });
  }, [challenge]);

  const handleSortSubmit = useCallback(() => {
    const finalOrder = sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems?.map((_, i) => i) || []);
    handleAnswer(finalOrder);
  }, [sortArrangement, challenge, handleAnswer]);

  const handleAddConstructPart = useCallback((part: string) => {
    setConstructParts((prev) => [...prev, part]);
    audioManager.play('tap');
  }, []);

  const handleRemoveConstructPart = useCallback((idx: number) => {
    setConstructParts((prev) => prev.filter((_, i) => i !== idx));
    audioManager.play('pop');
  }, []);

  // Cleanup inactivity timer
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-900/80 rounded-2xl border border-slate-800 backdrop-blur-md"
      >
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
            className="w-12 h-12 rounded-xl bg-gold-950 border border-gold-500/40 flex items-center justify-center text-2xl shadow-inner"
            aria-label="Simulation subject icon"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gold-400 bg-gold-950/60 px-2 py-0.5 rounded-md border border-gold-800">
                ISC Class 11 Physics
              </span>
              <span className="text-xs text-slate-400">10 Core Units</span>
            </div>
            <h1 className="text-lg sm:text-xl font-black text-white">{title}</h1>
          </div>
        </div>

        {/* Phase Navigator Buttons */}
        <div className="flex items-center gap-2" role="tablist" aria-label="Simulation Phases">
          {(['discovery', 'explore', 'sandbox', 'challenge'] as const).map((pName) => (
            <motion.button
              key={pName}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              role="tab"
              aria-selected={phase === pName}
              aria-label={`Switch to ${pName} phase`}
              onClick={() => {
                setPhase(pName);
                audioManager.play('tap');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all border ${
                phase === pName
                  ? 'bg-gold-600 text-white border-gold-400 shadow-lg shadow-gold-900/40'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800'
              }`}
            >
              {pName}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* ─── PHASE 1: DISCOVERY (Curiosity Hook) ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
          <motion.div className="p-6 bg-gradient-to-br from-gold-950/60 via-slate-900 to-slate-900 rounded-3xl border border-gold-500/30 shadow-xl">
            <div className="flex items-center gap-2 text-gold-400 font-bold text-sm uppercase tracking-wide mb-2">
              <span>🚀</span> Narrative Scenario Hook
            </div>
            <h2 className="text-2xl font-black text-white mb-2">{SCENARIO.title}</h2>
            <p className="text-slate-300 text-sm leading-relaxed mb-3">{SCENARIO.intro}</p>
            <p className="text-xs text-gold-300/80 bg-gold-950/40 p-3 rounded-xl border border-gold-900/60">{SCENARIO.context}</p>
          </motion.div>

          <motion.div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider bg-amber-950/50 px-2.5 py-1 rounded-lg border border-amber-800/60">
                Intuition Check • Not Graded
              </span>
              <span className="text-xs text-slate-400">Step 1 of 5</span>
            </div>
            <p className="text-base sm:text-lg font-bold text-white">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 gap-2.5">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01, x: 4 }}
                  whileTap={{ scale: 0.99 }}
                  disabled={discoveryAnswered}
                  aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                  onClick={() => handleDiscoveryAnswer(i)}
                  className={`w-full text-left p-4 rounded-2xl text-sm font-medium transition-all border ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : 'bg-slate-900/60 border-slate-800 text-slate-500 opacity-60'
                      : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-200 hover:border-gold-500/50'
                  }`}
                >
                  <span className="inline-block w-6 text-slate-400 font-mono font-bold">{String.fromCharCode(65 + i)}.</span>
                  {opt}
                  {discoveryAnswered && (
                    <span className="ml-2 font-bold">
                      {i === DISCOVERY_QUESTION.correctIndex ? ' ✓ Correct' : ' ✗'}
                    </span>
                  )}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{discoveryCorrect ? '✓ 🎉' : '💡'}</span>
                  <p className={`text-sm font-semibold ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {discoveryCorrect ? 'Fantastic intuition! You saw right through the classic pressure trap.' : DISCOVERY_QUESTION.hintAfter}
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Launch interactive laboratories"
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 bg-gradient-to-r from-gold-500 to-gold-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-gold-900/40"
                >
                  Launch Interactive Labs →
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE GUIDED EXPLORATION ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-900 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-gold-400 uppercase bg-gold-950/60 px-3 py-1 rounded-lg border border-gold-800">
                Interactive Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
              </span>
              <span className="text-sm font-bold text-white">{EXPLORATION_STEPS[currentSlide].title}</span>
            </div>
            <div className="flex gap-1.5" role="navigation" aria-label="Lab navigation dots">
              {EXPLORATION_STEPS.map((_, idx) => (
                <button
                  key={idx}
                  aria-label={`Jump to lab ${idx + 1}`}
                  onClick={() => setCurrentSlide(idx)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    currentSlide === idx ? 'bg-gold-400 scale-125' : 'bg-slate-700 hover:bg-slate-600'
                  }`}
                />
              ))}
            </div>
          </div>

          <motion.div className="p-4 sm:p-6 bg-slate-900/90 rounded-3xl border border-slate-800 space-y-6">
            <div className="p-3 bg-gold-950/40 border border-gold-800/60 rounded-2xl flex items-start gap-3">
              <span className="text-xl">👉</span>
              <p className="text-sm text-gold-200 font-medium">{EXPLORATION_STEPS[currentSlide].instruction}</p>
            </div>

            {/* ─── SLIDE 0: VENTURI SIMULATION ─── */}
            {currentSlide === 0 && (
              <div className="space-y-4">
                {/* PREDICT-THEN-CHECK */}
                {!predictionMade && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-slate-950 rounded-2xl border border-amber-500/40 space-y-2">
                    <p className="text-xs font-bold text-amber-400 uppercase">Step 1: Predict before manipulating</p>
                    <p className="text-sm font-semibold text-white">{PREDICTION_QUESTIONS[0].question}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                      {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                        <motion.button
                          key={i}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          aria-label={`Prediction option ${i + 1}: ${opt}`}
                          onClick={() => handlePrediction(i)}
                          className="p-2.5 text-left text-xs bg-slate-900 hover:bg-slate-800 text-slate-200 rounded-xl border border-slate-700"
                        >
                          {opt}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {predictionMade && !predictionVerified && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 bg-amber-950/60 border border-amber-600 rounded-xl text-xs text-amber-200">
                    ⚡ {PREDICTION_QUESTIONS[0].verifyInstruction}
                  </motion.div>
                )}

                {/* 2D HTML5 Canvas Animation */}
                <div className="relative rounded-2xl overflow-hidden border border-slate-700 shadow-2xl">
                  <canvas ref={canvasRef} width={650} height={200} className="w-full h-[200px] bg-slate-950 block" />
                  <div className="absolute top-2 left-3 bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-700 text-[10px] text-gold-300 font-mono">
                    Entry Area A1 = 0.02 m² | v1 = {fluidParams.v1.toFixed(2)} m/s
                  </div>
                  <div className="absolute top-2 right-3 bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-700 text-[10px] text-amber-300 font-mono">
                    Throat A2 = {(0.02 * throatAreaRatio).toFixed(3)} m² | v2 = {fluidParams.v2.toFixed(2)} m/s
                  </div>
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-slate-900/90 px-3 py-1 rounded-lg border border-gold-500/50 text-xs font-mono text-gold-200 shadow-lg">
                    Static Pressure Drop DeltaP = {fluidParams.deltaP.toFixed(0)} Pa (Manometer Delta-h: {fluidParams.deltaH_cm.toFixed(1)} cm)
                  </div>
                </div>

                {/* Interactive Sliders */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-slate-950 rounded-2xl border border-slate-800">
                  <div>
                    <div className="flex justify-between text-xs text-slate-300 font-medium mb-1">
                      <span>Flow Velocity (v1):</span>
                      <span className="text-gold-400 font-bold">{flowSpeed.toFixed(1)} m/s</span>
                    </div>
                    <input
                      type="range"
                      min={0.5}
                      max={5.0}
                      step={0.1}
                      value={flowSpeed}
                      aria-label="Adjust fluid flow speed in metres per second"
                      onChange={(e) => handleFlowSpeedChange(parseFloat(e.target.value))}
                      className="w-full accent-gold-500"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-300 font-medium mb-1">
                      <span>Throat Constriction Ratio (A2 / A1):</span>
                      <span className="text-amber-400 font-bold">{(throatAreaRatio * 100).toFixed(0)}%</span>
                    </div>
                    <input
                      type="range"
                      min={0.2}
                      max={0.8}
                      step={0.05}
                      value={throatAreaRatio}
                      aria-label="Adjust Venturi throat constriction area ratio"
                      onChange={(e) => handleThroatRatioChange(parseFloat(e.target.value))}
                      className="w-full accent-amber-500"
                    />
                  </div>
                </div>

                {/* OBSERVATION QUESTION */}
                {flowSpeed > 2.0 && !observationAnswered && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-slate-950 rounded-2xl border border-gold-800/80 space-y-2">
                    <p className="text-xs font-bold text-gold-400 uppercase">Scientific Observation</p>
                    <p className="text-sm text-white font-medium">{OBSERVATION_QUESTIONS[0].question}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                      {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                        <motion.button
                          key={i}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          aria-label={`Observation answer: ${opt}`}
                          onClick={() => handleObservation(i)}
                          className="p-2.5 text-left text-xs bg-slate-900 hover:bg-slate-800 text-slate-200 rounded-xl border border-slate-700"
                        >
                          {opt}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            )}

            {/* ─── SLIDE 1: SURFACE TENSION & MOLECULAR SPHERE ─── */}
            {currentSlide === 1 && (
              <div className="space-y-4">
                <div className="flex gap-2">
                  {(['water', 'mercury', 'soap'] as const).map((liq) => (
                    <motion.button
                      key={liq}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={`Select liquid: ${liq}`}
                      onClick={() => handleLiquidSelect(liq)}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold capitalize border ${
                        selectedLiquid === liq
                          ? 'bg-gold-600 text-white border-gold-400'
                          : 'bg-slate-950 text-slate-400 border-slate-800'
                      }`}
                    >
                      {liq === 'water' ? '💧 Pure Water' : liq === 'mercury' ? '🔘 Mercury' : '🫧 Soapy Water'}
                    </motion.button>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Molecular Force Diagram */}
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col items-center justify-center">
                    <svg viewBox="0 0 300 200" className="w-full max-w-[280px]">
                      <rect x="20" y="70" width="260" height="110" rx="6" fill="#0f172a" stroke="#334155" strokeWidth="2" />
                      <rect x="22" y="90" width="256" height="88" fill={selectedLiquid === 'mercury' ? '#475569' : '#0284c7'} opacity="0.3" />

                      <line x1="22" y1="90" x2="278" y2="90" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" />

                      <circle cx="150" cy="140" r="10" fill="#38bdf8" />
                      <circle cx="150" cy="140" r="30" fill="none" stroke="#38bdf8" strokeWidth="1" strokeDasharray="2 2" opacity="0.4" />
                      <text x="150" y="143" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">Bulk</text>
                      <text x="150" y="180" textAnchor="middle" fill="#94a3b8" fontSize="9">Net Cohesive Force = 0</text>

                      <circle cx="150" cy="90" r="10" fill="#f59e0b" />
                      <line x1="150" y1="90" x2="150" y2="120" stroke="#f59e0b" strokeWidth="2.5" markerEnd="url(#arrow)" />
                      <line x1="150" y1="90" x2="130" y2="110" stroke="#f59e0b" strokeWidth="2" />
                      <line x1="150" y1="90" x2="170" y2="110" stroke="#f59e0b" strokeWidth="2" />
                      <text x="150" y="93" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">Top</text>
                      <text x="150" y="65" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">Net Inward Pull (T = F/l)</text>
                    </svg>
                  </div>

                  {/* Physical Properties Display Card */}
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col justify-center space-y-3">
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      <span>🧪</span> Substance Parameter Readout
                    </h4>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between p-2 bg-slate-900 rounded-lg">
                        <span className="text-slate-400">Surface Tension (T):</span>
                        <span className="text-gold-400 font-bold font-mono">{fluidParams.T} N/m</span>
                      </div>
                      <div className="flex justify-between p-2 bg-slate-900 rounded-lg">
                        <span className="text-slate-400">Angle of Contact (theta):</span>
                        <span className="text-amber-400 font-bold font-mono">{fluidParams.thetaDeg}° ({fluidParams.thetaDeg < 90 ? 'Wetting' : 'Non-Wetting'})</span>
                      </div>
                      <div className="flex justify-between p-2 bg-slate-900 rounded-lg">
                        <span className="text-slate-400">Meniscus Shape:</span>
                        <span className="text-emerald-400 font-bold">{fluidParams.thetaDeg < 90 ? 'Concave Meniscus' : 'Convex Meniscus'}</span>
                      </div>
                      <div className="flex justify-between p-2 bg-slate-900 rounded-lg">
                        <span className="text-slate-400">Surface Energy per unit area:</span>
                        <span className="text-gold-400 font-bold font-mono">{fluidParams.T} J/m²</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ─── SLIDE 2: JURIN'S CAPILLARY RISE & LAPLACE EXCESS PRESSURE ─── */}
            {currentSlide === 2 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Capillary Tube SVG */}
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col items-center">
                    <h4 className="text-xs font-bold text-slate-300 uppercase mb-2">Jurin’s Capillary Column h = 2T cos(θ) / (ρ g r)</h4>
                    <svg viewBox="0 0 240 220" className="w-full max-w-[240px]">
                      <rect x="20" y="140" width="200" height="70" rx="4" fill="#0f172a" stroke="#475569" strokeWidth="2" />
                      <rect x="22" y="155" width="196" height="53" fill={selectedLiquid === 'mercury' ? '#475569' : '#0284c7'} opacity="0.35" />

                      <rect
                        x={120 - capillaryRadius * 15}
                        y="20"
                        width={capillaryRadius * 30}
                        height="170"
                        fill="#1e293b"
                        stroke="#38bdf8"
                        strokeWidth="1.5"
                        opacity="0.8"
                      />

                      {fluidParams.capillaryH_cm >= 0 ? (
                        <rect
                          x={120 - capillaryRadius * 15 + 1}
                          y={Math.max(25, 155 - fluidParams.capillaryH_cm * 8)}
                          width={capillaryRadius * 30 - 2}
                          height={Math.min(130, fluidParams.capillaryH_cm * 8)}
                          fill="#38bdf8"
                          opacity="0.75"
                        />
                      ) : (
                        <rect
                          x={120 - capillaryRadius * 15 + 1}
                          y="155"
                          width={capillaryRadius * 30 - 2}
                          height={Math.min(30, Math.abs(fluidParams.capillaryH_cm) * 8)}
                          fill="#64748b"
                          opacity="0.75"
                        />
                      )}

                      <line x1="20" y1="155" x2="220" y2="155" stroke="#94a3b8" strokeDasharray="3 3" />
                      <text x="120" y="210" textAnchor="middle" fill="#38bdf8" fontSize="10" fontWeight="bold">
                        h = {fluidParams.capillaryH_cm.toFixed(2)} cm
                      </text>
                    </svg>
                  </div>

                  {/* Laplace Pressure Bubble Simulator */}
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-3">
                    <div>
                      <h4 className="text-xs font-bold text-amber-400 uppercase mb-2">Laplace Excess Pressure</h4>
                      <div className="space-y-1.5 text-xs">
                        <div className="flex justify-between p-2 bg-slate-900 rounded-lg">
                          <span className="text-slate-400">Liquid Drop ΔP (2T/R):</span>
                          <span className="text-gold-300 font-bold font-mono">{fluidParams.dropLaplacePa.toFixed(1)} Pa</span>
                        </div>
                        <div className="flex justify-between p-2 bg-slate-900 rounded-lg">
                          <span className="text-slate-400">Soap Bubble ΔP (4T/R):</span>
                          <span className="text-amber-300 font-bold font-mono">{fluidParams.bubbleLaplacePa.toFixed(1)} Pa (2x Drop!)</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-slate-300 font-medium mb-1">
                        <span>Capillary Bore Radius (r):</span>
                        <span className="text-gold-400 font-bold">{capillaryRadius.toFixed(2)} mm</span>
                      </div>
                      <input
                        type="range"
                        min={0.2}
                        max={2.0}
                        step={0.05}
                        value={capillaryRadius}
                        aria-label="Adjust capillary tube bore radius in millimetres"
                        onChange={(e) => handleCapillaryRadiusChange(parseFloat(e.target.value))}
                        className="w-full accent-gold-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ─── SLIDE 3: THERMAL EXPANSION & ANOMALOUS WATER ─── */}
            {currentSlide === 3 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Canvas Atomic Jiggle */}
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col items-center">
                    <h4 className="text-xs font-bold text-gold-400 uppercase mb-2">Microscopic Interatomic Vibrations</h4>
                    <canvas ref={thermalCanvasRef} width={280} height={160} className="rounded-xl border border-slate-800 w-full" />
                    <p className="text-[10px] text-slate-400 mt-2">Atoms vibrate with higher amplitude as temperature rises.</p>
                  </div>

                  {/* Solid Expansion & Water Density Curve */}
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex justify-between text-xs text-slate-300 font-medium mb-1">
                        <span>Lattice Temperature:</span>
                        <span className="text-amber-400 font-bold">{temperatureC}°C</span>
                      </div>
                      <input
                        type="range"
                        min={-20}
                        max={120}
                        step={1}
                        value={temperatureC}
                        aria-label="Adjust solid lattice temperature in Celsius"
                        onChange={(e) => handleTemperatureChange(parseFloat(e.target.value))}
                        className="w-full accent-amber-500"
                      />
                    </div>

                    <div className="space-y-1.5 text-xs">
                      <div className="flex justify-between p-2 bg-slate-900 rounded-lg">
                        <span className="text-slate-400">Linear Expansion (ΔL = α L₀ ΔT):</span>
                        <span className="text-gold-400 font-bold font-mono">+{thermalParams.deltaL_mm.toFixed(3)} mm</span>
                      </div>
                      <div className="flex justify-between p-2 bg-slate-900 rounded-lg">
                        <span className="text-slate-400">Water Density at {temperatureC}°C:</span>
                        <span className={`font-bold font-mono ${temperatureC === 4 ? 'text-emerald-400' : 'text-amber-300'}`}>
                          {thermalParams.waterDensity.toFixed(2)} kg/m³ {temperatureC === 4 ? '★ PEAK DENSITY' : ''}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ─── SLIDE 4: SEARLE'S CONDUCTION & CONVECTION ─── */}
            {currentSlide === 4 && (
              <div className="space-y-4">
                <div className="flex gap-2">
                  {(['copper', 'aluminium', 'wood'] as const).map((mat) => (
                    <motion.button
                      key={mat}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={`Select conduction material: ${mat}`}
                      onClick={() => setConductionMaterial(mat)}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold capitalize border ${
                        conductionMaterial === mat ? 'bg-gold-600 text-white border-gold-400' : 'bg-slate-950 text-slate-400 border-slate-800'
                      }`}
                    >
                      {mat} (k = {mat === 'copper' ? '385' : mat === 'aluminium' ? '205' : '0.15'} W/m·K)
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Steady State Heat Flux Q/t = k A (T1 - T2) / d:</span>
                    <span className="text-emerald-400 font-bold font-mono text-sm">{thermalParams.heatFlowWatts.toFixed(1)} Watts</span>
                  </div>

                  <div className="h-6 bg-slate-900 rounded-full overflow-hidden p-1 border border-slate-800">
                    <motion.div
                      className="h-full bg-gradient-to-r from-gold-500 via-amber-500 to-rose-600 rounded-full"
                      animate={{ width: `${Math.min(100, (thermalParams.heatFlowWatts / 600) * 100)}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Copper conducts heat rapidly due to free electrons; wood acts as a thermal insulator preventing heat flow.
                  </p>
                </div>
              </div>
            )}
          </motion.div>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={currentSlide === 0}
              aria-label="Go to previous lab"
              onClick={() => setCurrentSlide((s) => Math.max(0, s - 1))}
              className="px-5 py-2.5 bg-slate-800 text-slate-200 rounded-xl text-xs font-bold disabled:opacity-40 border border-slate-700"
            >
              ← Previous Lab
            </motion.button>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Go to next lab"
                onClick={() => setCurrentSlide((s) => s + 1)}
                className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-gold-900/40"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Enter sandbox free play"
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-900/40"
              >
                Enter Sandbox Free Play →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: SANDBOX FREE PLAY ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-white">Interactive Physics Sandbox</h3>
                <p className="text-xs text-slate-400 mt-0.5">Test any variable combinations freely. Zero grading pressure.</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Start graded challenges"
                onClick={handleAdvanceToChallenge}
                className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-gold-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-900/40"
              >
                Ready for Graded Challenges! 🎯
              </motion.button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Box 1: Venturi Quick Control */}
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold text-gold-400 uppercase">Venturi Control</h4>
                <div>
                  <label className="text-[11px] text-slate-400" htmlFor="sandbox-speed">Flow Speed: {flowSpeed.toFixed(1)} m/s</label>
                  <input
                    id="sandbox-speed"
                    type="range"
                    min={0.5}
                    max={5.0}
                    step={0.1}
                    value={flowSpeed}
                    aria-label="Sandbox flow speed slider"
                    onChange={(e) => setFlowSpeed(parseFloat(e.target.value))}
                    className="w-full accent-gold-500"
                  />
                </div>
                <div className="text-xs text-gold-300 font-mono">
                  ΔP: {fluidParams.deltaP.toFixed(0)} Pa | Δh: {fluidParams.deltaH_cm.toFixed(1)} cm
                </div>
              </div>

              {/* Box 2: Capillary Straw Quick Control */}
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold text-amber-400 uppercase">Capillary & Laplace</h4>
                <div>
                  <label className="text-[11px] text-slate-400" htmlFor="sandbox-capillary">Radius: {capillaryRadius.toFixed(2)} mm</label>
                  <input
                    id="sandbox-capillary"
                    type="range"
                    min={0.2}
                    max={2.0}
                    step={0.05}
                    value={capillaryRadius}
                    aria-label="Sandbox capillary radius slider"
                    onChange={(e) => setCapillaryRadius(parseFloat(e.target.value))}
                    className="w-full accent-amber-500"
                  />
                </div>
                <div className="text-xs text-amber-300 font-mono">
                  Rise h: {fluidParams.capillaryH_cm.toFixed(2)} cm | Bubble ΔP: {fluidParams.bubbleLaplacePa.toFixed(0)} Pa
                </div>
              </div>

              {/* Box 3: Thermal Expansion Quick Control */}
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold text-emerald-400 uppercase">Thermal Bar</h4>
                <div>
                  <label className="text-[11px] text-slate-400" htmlFor="sandbox-temp">Temp: {temperatureC}°C</label>
                  <input
                    id="sandbox-temp"
                    type="range"
                    min={-20}
                    max={120}
                    step={1}
                    value={temperatureC}
                    aria-label="Sandbox temperature slider"
                    onChange={(e) => setTemperatureC(parseFloat(e.target.value))}
                    className="w-full accent-emerald-500"
                  />
                </div>
                <div className="text-xs text-emerald-300 font-mono">
                  Expansion: +{thermalParams.deltaL_mm.toFixed(3)} mm | Heat: {thermalParams.heatFlowWatts.toFixed(1)} W
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGES (Adaptive Assessment) ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Challenge Header & Difficulty Badge */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-900 rounded-2xl border border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-bold uppercase">
                  Challenge {currentChallenge + 1} of {filteredChallenges.length}
                </span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  {challenge.competencyLevel}
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white mt-1">{challenge.question}</h3>
            </div>

            <motion.span
              key={difficulty}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className={`px-3 py-1 rounded-xl text-xs font-extrabold uppercase border ${
                difficulty === 'foundation'
                  ? 'bg-emerald-950/80 text-emerald-400 border-emerald-600'
                  : difficulty === 'advanced'
                  ? 'bg-rose-950/80 text-rose-400 border-rose-600'
                  : 'bg-gold-950/80 text-gold-400 border-gold-600'
              }`}
            >
              {difficulty}
            </motion.span>
          </div>

          {/* Animated Progress Bar */}
          <div className="h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800" role="progressbar" aria-valuenow={((currentChallenge + 1) / filteredChallenges.length) * 100} aria-valuemin={0} aria-valuemax={100}>
            <motion.div
              className="h-full bg-gradient-to-r from-gold-500 to-emerald-500 rounded-full"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>

          {/* ─── MCQ CHALLENGE RENDERING (Classify, Distinguish, Match) ─── */}
          {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
            <div className="space-y-3">
              {challenge.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01, x: 4 }}
                  whileTap={{ scale: 0.99 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  disabled={showExplanation || answerRevealed}
                  aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                  onClick={() => handleAnswer(i)}
                  className={`w-full text-left p-4 rounded-2xl text-sm font-medium transition-all border ${
                    wrongFlash
                      ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                      : showExplanation && i === challenge.correctIndex
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-lg shadow-emerald-950'
                      : 'bg-slate-900/90 hover:bg-slate-850 border-slate-800 text-slate-200 hover:border-gold-500/50'
                  }`}
                >
                  <span className="inline-block w-6 text-slate-400 font-mono font-bold">{String.fromCharCode(65 + i)}.</span>
                  {opt}
                  {showExplanation && (
                    <span className="ml-2 font-bold">
                      {i === challenge.correctIndex ? ' ✓ Correct' : ' ✗'}
                    </span>
                  )}
                </motion.button>
              ))}
            </div>
          )}

          {/* ─── NUMERIC CHALLENGE RENDERING ─── */}
          {challenge.type === 'numeric' && (
            <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
              <p className="text-xs text-slate-400">Enter your calculated numerical value below:</p>
              <div className="flex flex-wrap items-center gap-3">
                <input
                  type="number"
                  step="any"
                  value={numericInput}
                  aria-label="Numerical solution input"
                  onChange={(e) => setNumericInput(e.target.value)}
                  placeholder="e.g. 2.0"
                  className="px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white text-base font-mono focus:border-gold-500 outline-none w-48"
                />
                <span className="text-slate-300 font-bold font-mono">{challenge.unit}</span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  aria-label="Submit numeric answer"
                  onClick={() => handleAnswer(numericInput)}
                  disabled={showExplanation || !numericInput}
                  className="px-6 py-3 bg-gold-600 hover:bg-gold-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-gold-900/40"
                >
                  Submit Value
                </motion.button>
              </div>
            </div>
          )}

          {/* ─── DRAG-LABEL CHALLENGE RENDERING ─── */}
          {challenge.type === 'drag-label' && challenge.dragItems && (
            <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
              <p className="text-xs text-slate-400">Drag each label into its matching box on the diagram below:</p>

              {/* Draggable Label Palette */}
              <div className="flex flex-wrap gap-2 mb-4">
                {challenge.dragItems.map((item, i) => (
                  <motion.div
                    key={i}
                    draggable
                    role="button"
                    tabIndex={0}
                    aria-label={`Draggable label: ${item.label}`}
                    onDragStart={() => handleDragStart(item.label)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-3.5 py-2 bg-gold-700/80 hover:bg-gold-600 rounded-xl text-xs font-bold text-white cursor-grab shadow border border-gold-500/40"
                  >
                    {item.label}
                  </motion.div>
                ))}
              </div>

              {/* Drop Target Slots */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {challenge.dragItems.map((item) => (
                  <div
                    key={item.targetId}
                    role="region"
                    aria-label={`Drop target for ${item.targetId}`}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDragDrop(item.targetId)}
                    className={`p-4 rounded-xl border-2 border-dashed transition-all ${
                      droppedLabels[item.targetId]
                        ? 'border-emerald-500 bg-emerald-950/40 text-emerald-300'
                        : 'border-slate-700 bg-slate-950 text-slate-500'
                    }`}
                  >
                    <div className="text-[10px] uppercase font-mono text-slate-400 mb-1">Target Slot: {item.targetId}</div>
                    <div className="text-sm font-bold">
                      {droppedLabels[item.targetId] ? `✓ ${droppedLabels[item.targetId]}` : 'Drop matching label here'}
                    </div>
                  </div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                transition={{ duration: 0.4 }}
                aria-label="Validate diagram labels"
                onClick={() => handleAnswer(droppedLabels)}
                disabled={showExplanation}
                className="mt-4 px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold"
              >
                Validate Diagram Labels
              </motion.button>
            </div>
          )}

          {/* ─── DRAG-SORT CHALLENGE RENDERING ─── */}
          {challenge.type === 'drag-sort' && challenge.sortItems && (
            <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
              <p className="text-xs text-slate-400">Drag to re-order the steps in their correct chronological sequence:</p>
              <div className="space-y-2">
                {(sortArrangement.length > 0
                  ? sortArrangement.map((idx) => challenge.sortItems![idx])
                  : challenge.sortItems
                ).map((item, displayIdx) => (
                  <motion.div
                    key={displayIdx}
                    draggable
                    role="button"
                    tabIndex={0}
                    aria-label={`Sortable item step ${displayIdx + 1}: ${item}`}
                    onDragStart={() => setDraggedItem(String(displayIdx))}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => {
                      const fromIdx = parseInt(draggedItem || '0');
                      handleSortMove(fromIdx, displayIdx);
                    }}
                    whileHover={{ scale: 1.01 }}
                    className="p-3.5 bg-slate-950 rounded-xl text-xs text-slate-200 border border-slate-700 cursor-grab flex items-center gap-3"
                  >
                    <span className="w-6 h-6 rounded-lg bg-slate-800 text-gold-400 font-mono font-bold flex items-center justify-center text-xs">
                      {displayIdx + 1}
                    </span>
                    <span>{item}</span>
                  </motion.div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                transition={{ duration: 0.4 }}
                aria-label="Verify chronological sequence"
                onClick={handleSortSubmit}
                disabled={showExplanation}
                className="mt-2 px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold"
              >
                Verify Sequence
              </motion.button>
            </div>
          )}

          {/* ─── CONSTRUCT EQUATION CHALLENGE RENDERING ─── */}
          {challenge.type === 'construct' && challenge.availableParts && (
            <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
              <p className="text-xs text-slate-400">{challenge.validationHint}</p>

              {/* Parts Palette */}
              <div className="flex flex-wrap gap-2">
                {challenge.availableParts.map((part, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={`Add equation block ${part}`}
                    onClick={() => handleAddConstructPart(part)}
                    className="px-3 py-1.5 bg-gold-900/80 hover:bg-gold-700 border border-gold-600/50 rounded-lg text-xs font-mono font-bold text-white"
                  >
                    + {part}
                  </motion.button>
                ))}
              </div>

              {/* Assembly Area */}
              <div className="min-h-[60px] p-4 bg-slate-950 rounded-xl border border-slate-700 flex flex-wrap items-center gap-2">
                {constructParts.map((part, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="px-3 py-1 bg-gold-950 border border-gold-500 text-gold-200 font-mono text-xs rounded-lg flex items-center gap-2"
                  >
                    <span>{part}</span>
                    <button
                      aria-label={`Remove block ${part}`}
                      onClick={() => handleRemoveConstructPart(i)}
                      className="text-rose-400 hover:text-rose-300 font-bold"
                    >
                      ✕
                    </button>
                  </motion.div>
                ))}
                {constructParts.length === 0 && <span className="text-xs text-slate-500">Click blocks above to construct the formula</span>}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                transition={{ duration: 0.4 }}
                aria-label="Verify formula construction"
                onClick={() => handleAnswer(constructParts.join(' '))}
                disabled={constructParts.length === 0 || showExplanation}
                className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold"
              >
                Verify Construction
              </motion.button>
            </div>
          )}

          {/* ─── PROGRESSIVE CLICK-TO-REVEAL EXPLANATION ─── */}
          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 bg-gradient-to-br from-slate-900 to-gold-950/60 rounded-2xl border border-gold-500/40 space-y-3"
            >
              <div className="flex items-center gap-2 text-gold-400 font-bold text-xs uppercase">
                <span>📘</span> Step-by-Step Physical Derivation:
              </div>

              {challenge.explanation
                .split('. ')
                .filter((s) => s.trim().length > 0)
                .slice(0, revealedSteps + 1)
                .map((sentence, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-xs sm:text-sm text-slate-200 leading-relaxed"
                  >
                    <span className="font-bold text-gold-400 font-mono">{i + 1}.</span> {sentence}
                    {!sentence.endsWith('.') && '.'}
                  </motion.p>
                ))}

              <div className="pt-2 flex items-center gap-3">
                {revealedSteps < challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    aria-label="Show next step of derivation"
                    onClick={() => setRevealedSteps((s) => s + 1)}
                    className="px-4 py-2 bg-gold-700 hover:bg-gold-600 text-white rounded-xl text-xs font-bold"
                  >
                    Show Next Step →
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Advance to next challenge or completion"
                    onClick={handleNextChallenge}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-950"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Mission Score →' : 'Next Challenge →'}
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION & REAL-WORLD PROFILE ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 text-center space-y-3">
            <span className="text-5xl">🏆</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Flight Systems Mission Complete!</h2>
            <div className="flex justify-center gap-4 text-sm font-mono">
              <span className="text-gold-400 font-bold">Final Score: {Math.max(0, 100 - errors * 5)}%</span>
              <span className="text-slate-400">|</span>
              <span className="text-emerald-400 font-bold uppercase">Mastery: {masteryLevel}</span>
            </div>
          </div>

          {/* Personalized Motivational Feedback based on errors */}
          <div className="p-5 rounded-2xl border transition-all text-center space-y-1 bg-slate-900/90 border-slate-700">
            <h3 className="text-lg font-black tracking-wide">
              {errors === 0 && <span className="text-emerald-400">✓ PERFECT SCORE!</span>}
              {errors >= 1 && errors <= 3 && <span className="text-gold-400">✓ Great work!</span>}
              {errors >= 4 && errors <= 7 && <span className="text-amber-400">Good effort!</span>}
              {errors >= 8 && <span className="text-rose-400">Do not give up — You WILL get this!</span>}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-medium">
              {errors === 0
                ? 'Flawless physics execution! You have demonstrated total mastery over fluid dynamics, surface tension, and thermodynamics.'
                : errors <= 3
                ? 'Strong performance! You navigated complex fluid & thermal equations with solid precision.'
                : errors <= 7
                ? 'You are making steady progress! Spend some time reviewing the derivations below.'
                : 'Every great physicist learns through iterative practice. Review the key formulas and try again!'}
            </p>
          </div>

          {/* Spaced Repetition Visibility */}
          <div className="p-5 bg-gradient-to-br from-gold-950/60 to-slate-900 rounded-2xl border border-gold-500/40 flex flex-wrap items-center justify-between gap-4 shadow-lg">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gold-400 uppercase tracking-wider">Spaced Repetition System (SRS)</span>
                <span className="text-[10px] px-2 py-0.5 bg-gold-900/60 rounded text-gold-200 border border-gold-700">SM-2 Interval</span>
              </div>
              <p className="text-sm font-semibold text-white">
                Next scheduled review:{' '}
                <span className="text-amber-300 font-bold underline">
                  {errors === 0 ? 'review in 7 days' : errors <= 3 ? 'review in 3 days' : 'review in 1 day'}
                </span>
              </p>
              <p className="text-[11px] text-slate-400">
                {errors === 0
                  ? 'Mastery confirmed! A 7-day spaced repetition interval locks this knowledge into long-term memory.'
                  : errors <= 3
                  ? 'Great progress! A 3-day spaced repetition review will reinforce key boundary conditions.'
                  : 'Active recall required! Review in 1 day to solidify foundational fluid & thermal formulas.'}
              </p>
            </div>
            <div className="text-3xl">🗓️</div>
          </div>

          {/* REFLECTION SECTION */}
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-gold-400 font-bold text-sm uppercase">
              <span>🧠</span> Reflection & Synthesis
            </div>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-200 block" htmlFor="refl-surprising">
                  1. What was the most surprising thing you learned?
                </label>
                <textarea
                  id="refl-surprising"
                  rows={2}
                  value={reflections.surprising}
                  aria-label="What was the most surprising thing you learned?"
                  onChange={(e) => setReflections((prev) => ({ ...prev, surprising: e.target.value }))}
                  placeholder="e.g. How static pressure drops when fluid speeds up in the throat constriction..."
                  className="w-full p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-white placeholder-slate-500 focus:border-gold-500 outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-200 block" htmlFor="refl-explain">
                  2. How would you explain this to a friend?
                </label>
                <textarea
                  id="refl-explain"
                  rows={2}
                  value={reflections.explain}
                  aria-label="How would you explain this to a friend?"
                  onChange={(e) => setReflections((prev) => ({ ...prev, explain: e.target.value }))}
                  placeholder="e.g. Like conserving energy tokens between speed and pressure..."
                  className="w-full p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-white placeholder-slate-500 focus:border-gold-500 outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-200 block" htmlFor="refl-reallife">
                  3. Where in real life might you use this?
                </label>
                <textarea
                  id="refl-reallife"
                  rows={2}
                  value={reflections.realLife}
                  aria-label="Where in real life might you use this?"
                  onChange={(e) => setReflections((prev) => ({ ...prev, realLife: e.target.value }))}
                  placeholder="e.g. In aerospace wing design, rocket nozzles, or cryogenic fuel tanks..."
                  className="w-full p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-white placeholder-slate-500 focus:border-gold-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Misconception Gaps Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 rounded-2xl border border-rose-800 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 uppercase">Targeted Misconception Profile:</h3>
              <div className="space-y-2">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-950/80 rounded-xl border border-rose-900/60 text-xs space-y-1">
                      <p className="text-rose-300 font-semibold">✗ Trap: {m.misconception}</p>
                      <p className="text-emerald-300 font-medium">✓ Physics Truth: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Real-World Activity Arc */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-base font-bold text-gold-300 flex items-center gap-2">
              <span>🚀</span> {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-1.5 text-xs text-slate-400 mt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-gold-400 font-mono font-bold">{i + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* ─── SIM-ENGINE FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Complete!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C11_PhysicsBernoullisTheoremSim;