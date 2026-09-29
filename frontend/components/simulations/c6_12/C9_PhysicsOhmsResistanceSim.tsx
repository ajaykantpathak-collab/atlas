'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS ───
const NODE_C9_PHY_041 = 'c9_phy_041'; // Ohm's law and resistance
const NODE_C9_PHY_042 = 'c9_phy_042'; // Electric circuits (symbols, cells, circuit diagrams)
const NODE_C9_PHY_043 = 'c9_phy_043'; // Induced magnetism
const NODE_C9_PHY_044 = 'c9_phy_044'; // Earth's magnetic field and neutral points
const NODE_C9_PHY_045 = 'c9_phy_045'; // Work, energy and machine efficiency
const NODE_C9_PHY_046 = 'c9_phy_046'; // Levers - torque, equilibrium, and VR
const NODE_C9_PHY_047 = 'c9_phy_047'; // Elasticity - stress and strain
const NODE_C9_PHY_048 = 'c9_phy_048'; // Surface tension and capillary action

const ALL_NODE_IDS = [
  NODE_C9_PHY_041,
  NODE_C9_PHY_042,
  NODE_C9_PHY_043,
  NODE_C9_PHY_044,
  NODE_C9_PHY_045,
  NODE_C9_PHY_046,
  NODE_C9_PHY_047,
  NODE_C9_PHY_048,
];

// ─── NARRATIVE SCENARIO HOOK ───
const SCENARIO = {
  title: 'The Mumbai Maker Lab Diagnostic',
  intro: 'You are the chief apprentice at the National Science Centre Maker Lab in Mumbai. A thunderstorm has tripped experimental rigs across 4 physics labs: the Power Electronics bench, the Magnetics chamber, the Mechanics gantry, and the Fluids & Materials station.',
  context: 'Calibrate circuits with Ohm\'s Law, neutralize stray magnetic fields, balance heavy load cranes, and test material elasticity before the annual ICSE State Exhibition opens!',
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question: 'In an electric water heater running on 220 V in an Indian home, if you double the resistance of the nichrome coil while keeping voltage constant, what happens to the electric current flowing through it?',
  options: [
    'The current doubles because more resistance pushes more electrons.',
    'The current is halved because resistance opposes electric flow (I = V/R).',
    'The current remains exactly unchanged because the voltage source is 220 V.',
    'The current drops to zero immediately as the wire behaves as an insulator.',
  ],
  correctIndex: 1,
  hintAfter: 'Remember Ohm\'s Law: Current equals Voltage divided by Resistance (I = V/R). High opposition means less flow!',
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

// ─── 24 PROGRESSIVE CHALLENGES (NEP 2020 / CISCE ALIGNED) ───
const CHALLENGES: Challenge[] = [
  // 1. Ohm's Law - Foundation (Recall)
  {
    id: 'ch_01',
    nodeId: NODE_C9_PHY_041,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'According to Ohm\'s law, under what essential physical condition is the potential difference (V) directly proportional to current (I)?',
    options: [
      'Provided the atmospheric pressure steadily increases.',
      'Provided the physical conditions, especially temperature, remain constant.',
      'Only when alternating current (AC) of 50 Hz frequency is supplied.',
      'Only when the conductor is insulated inside a vacuum chamber.',
    ],
    correctIndex: 1,
    explanation: 'Ohm\'s law states that V is directly proportional to I provided physical conditions like temperature remain constant. Resistance changes with temperature in real conductors.',
    hints: [
      'Think about what factor causes metal atoms to vibrate faster and scatter electrons.',
      'Temperature affects conductor resistance heavily.',
      'The law explicitly requires physical conditions (mainly temperature) to remain unchanged.',
    ],
    misconceptionIndex: 0,
  },
  // 2. Ohm's Law - Standard (Application)
  {
    id: 'ch_02',
    nodeId: NODE_C9_PHY_041,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'An electric iron connected to the Indian standard 220 V mains supply draws a current of 1.1 A. Calculate the resistance of its heating coil in ohms (Ω).',
    correctAnswer: 200,
    tolerance: 1,
    unit: 'Ω',
    explanation: 'Using Ohm\'s law: R = V / I. Substituting the values: R = 220 V / 1.1 A = 200 Ω.',
    hints: [
      'Rearrange V = I × R to solve for R.',
      'R = V / I.',
      'Divide 220 by 1.1 to find R = 200 Ω.',
    ],
    misconceptionIndex: 1,
  },
  // 3. Circuits - Foundation (Understanding / Drag-label)
  {
    id: 'ch_03',
    nodeId: NODE_C9_PHY_042,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag the correct instrument labels to their corresponding connection topology on the test bench diagram.',
    dragItems: [
      { label: 'Ammeter (Series)', targetId: 'meter_series' },
      { label: 'Voltmeter (Parallel)', targetId: 'meter_parallel' },
      { label: 'Plug Key (Control)', targetId: 'switch_pos' },
    ],
    correctMapping: {
      meter_series: 'Ammeter (Series)',
      meter_parallel: 'Voltmeter (Parallel)',
      switch_pos: 'Plug Key (Control)',
    },
    explanation: 'An ammeter has very low resistance and must be connected in series. A voltmeter has high resistance and must be in parallel across the component.',
    hints: [
      'The meter in the direct line of current is in series.',
      'The meter connected across both terminals of the load resistor is in parallel.',
      'Ammeter goes in series; Voltmeter goes in parallel across the load.',
    ],
    misconceptionIndex: 1,
  },
  // 4. Circuits - Standard (Analysis)
  {
    id: 'ch_04',
    nodeId: NODE_C9_PHY_042,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'What is the primary difference between a Galvanometer and an Ammeter in a laboratory setup?',
    options: [
      'A galvanometer measures voltage, while an ammeter measures resistance.',
      'A galvanometer detects small currents and indicates direction, while an ammeter directly measures current magnitude.',
      'A galvanometer is only used with AC current, whereas an ammeter works with DC only.',
      'A galvanometer has infinite resistance and is always connected in parallel.',
    ],
    correctIndex: 1,
    explanation: 'A galvanometer detects the presence and direction of minute currents (deflecting left or right). An ammeter is a modified galvanometer (with a low-resistance shunt) calibrated to measure large current magnitudes.',
    hints: [
      'Consider which instrument has a zero in the center of its scale.',
      'One detects polarity and micro-currents; the other reads amperes directly.',
      'Galvanometers detect tiny currents and direction; Ammeters measure current magnitude in Amperes.',
    ],
  },
  // 5. Induced Magnetism - Foundation (Recall)
  {
    id: 'ch_05',
    nodeId: NODE_C9_PHY_043,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'When the North pole of a strong bar magnet is brought close to an unmagnetised soft iron bar without touching it, what polarity is developed at the near end?',
    options: [
      'North pole by magnetic repulsion.',
      'South pole by magnetic induction.',
      'Both North and South simultaneously.',
      'No polarity because the objects do not physically touch.',
    ],
    correctIndex: 1,
    explanation: 'Induced magnetism creates an OPPOSITE pole at the nearer end (South pole facing the North pole of the inducing magnet) and a similar pole at the farther end.',
    hints: [
      'Recall the rule: opposite poles attract.',
      'For attraction to occur, what pole must be created near the North pole?',
      'The near end acquires an opposite polarity: South pole.',
    ],
    misconceptionIndex: 0,
  },
  // 6. Induced Magnetism - Standard (Evaluation)
  {
    id: 'ch_06',
    nodeId: NODE_C9_PHY_043,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'Why is soft iron preferred over hard steel for making the core of temporary electromagnets in cranes and relays?',
    options: [
      'Soft iron retains magnetism permanently for years after current stops.',
      'Soft iron is easily magnetised by induction and loses its magnetism almost instantly when the field is removed.',
      'Soft iron has zero electrical resistance and does not produce heat.',
      'Steel cannot be magnetised under any circumstances.',
    ],
    correctIndex: 1,
    explanation: 'Soft iron has high magnetic permeability and low retentivity; it magnetises quickly and demagnetises immediately when the external magnetic influence ceases.',
    hints: [
      'Consider what a crane must do when dropping scrap iron.',
      'It must release the magnetic hold immediately when switched off.',
      'Soft iron loses its induced magnetism quickly, making it the ideal temporary magnet.',
    ],
  },
  // 7. Earth\'s Magnetic Field - Foundation (Recall)
  {
    id: 'ch_07',
    nodeId: NODE_C9_PHY_044,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Magnetically speaking, what pole of Earth\'s internal fictitious magnet lies near the geographic North Pole?',
    options: [
      'Magnetic North Pole',
      'Magnetic South Pole',
      'Magnetic Neutral Axis',
      'Geomagnetic Equator',
    ],
    correctIndex: 1,
    explanation: 'The Earth\'s magnetic pole located in northern Canada (near geographic North) is magnetically a South pole. This is why the North-seeking pole of a compass is attracted toward it.',
    hints: [
      'Opposite poles attract: North seeks what kind of pole?',
      'The North pointer of a compass is a magnetic North pole.',
      'It is attracted to a magnetic South pole located near Earth\'s geographic North.',
    ],
    misconceptionIndex: 0,
  },
  // 8. Earth\'s Magnetic Field - Advanced (Analysis)
  {
    id: 'ch_08',
    nodeId: NODE_C9_PHY_044,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A bar magnet is placed on a table with its North pole pointing towards geographic North. Where do the neutral points (resultant magnetic field = 0) lie?',
    options: [
      'On the axial line (North and South of the magnet).',
      'On the broadside-on (equatorial) line (East and West of the magnet).',
      'Directly at the geometric centre inside the bar magnet.',
      'At infinity only.',
    ],
    correctIndex: 1,
    explanation: 'When N points North, the magnet\'s field on the equatorial line is directed Southward, perfectly opposing the horizontal component of Earth\'s field (directed Northward), creating neutral points on the equatorial line.',
    hints: [
      'Draw the magnetic field lines of the bar magnet outside the magnet (N to S).',
      'On the equatorial line, the bar magnet\'s field points from N towards S (Southward).',
      'Earth\'s horizontal field points Northward. They cancel out on the equatorial line (East & West).',
    ],
  },
  // 9. Work & Energy - Foundation (Application)
  {
    id: 'ch_09',
    nodeId: NODE_C9_PHY_045,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'A dock worker at Jawaharlal Nehru Port pushes a crate with a horizontal force of 80 N through a displacement of 15 m in the direction of force. Calculate work done in Joules (J).',
    correctAnswer: 1200,
    tolerance: 0,
    unit: 'J',
    explanation: 'Work W = Force × Displacement = 80 N × 15 m = 1200 J.',
    hints: [
      'Use the fundamental definition: W = F × s.',
      'Multiply 80 N by 15 m.',
      '80 × 15 = 1200 J.',
    ],
  },
  // 10. Work & Energy - Standard (Application)
  {
    id: 'ch_10',
    nodeId: NODE_C9_PHY_045,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Calculate the Kinetic Energy in Joules of a 4 kg drone cruising at a steady velocity of 5 m/s.',
    correctAnswer: 50,
    tolerance: 0,
    unit: 'J',
    explanation: 'KE = 1/2 × m × v² = 0.5 × 4 kg × (5 m/s)² = 0.5 × 4 × 25 = 50 J.',
    hints: [
      'Formula for kinetic energy is KE = (1/2) m v².',
      'Square the speed first: 5² = 25.',
      '0.5 × 4 × 25 = 50 J.',
    ],
  },
  // 11. Machine Efficiency - Advanced (Evaluation)
  {
    id: 'ch_11',
    nodeId: NODE_C9_PHY_045,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A motor delivers 600 J of useful work lifting water to an overhead tank while consuming 750 J of electrical energy. Calculate machine efficiency as a percentage (%).',
    correctAnswer: 80,
    tolerance: 0.5,
    unit: '%',
    explanation: 'Efficiency η = (Useful Work Output / Total Work Input) × 100% = (600 J / 750 J) × 100% = 80%.',
    hints: [
      'Efficiency = (Output / Input) × 100.',
      'Divide 600 by 750.',
      '600 / 750 = 0.80 -> 80%.',
    ],
  },
  // 12. Levers - Foundation (Understanding)
  {
    id: 'ch_12',
    nodeId: NODE_C9_PHY_046,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'A wheelbarrow carries heavy bricks with the load situated between the wheel axle (fulcrum) and the handles (effort). Which class of lever is this?',
    options: [
      'Class I Lever',
      'Class II Lever',
      'Class III Lever',
      'Class IV Compound Lever',
    ],
    correctIndex: 1,
    explanation: 'In a Class II lever, the Load lies between the Fulcrum and the Effort (F-L-E). Mechanical Advantage is always greater than 1.',
    hints: [
      'Identify what is in the middle: Fulcrum, Load, or Effort?',
      'Load in the middle = Class II.',
      'Wheelbarrows, nutcrackers, and bottle openers are Class II levers.',
    ],
  },
  // 13. Levers - Standard (Application / Principle of Moments)
  {
    id: 'ch_13',
    nodeId: NODE_C9_PHY_046,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A uniform metre rule balances horizontally on a knife-edge at the 50 cm mark. A load of 40 gf is suspended at the 10 cm mark. What weight (in gf) must be hung at the 90 cm mark to maintain equilibrium?',
    correctAnswer: 40,
    tolerance: 0,
    unit: 'gf',
    explanation: 'Anticlockwise moment = 40 gf × (50 - 10) cm = 40 × 40 = 1600 gf·cm. Clockwise arm = 90 - 50 = 40 cm. Effort W = 1600 / 40 = 40 gf.',
    hints: [
      'Principle of moments: Anticlockwise Torque = Clockwise Torque.',
      'Distance of 40 gf load from 50 cm pivot is 40 cm.',
      'Distance of unknown weight from 50 cm pivot is also (90 - 50) = 40 cm. Hence weight = 40 gf.',
    ],
  },
  // 14. Levers - Advanced (Analysis / Drag-sort)
  {
    id: 'ch_14',
    nodeId: NODE_C9_PHY_046,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Sort the three classes of levers in order of their characteristic Mechanical Advantage (MA): [MA < 1 always] -> [MA can be <, =, or > 1] -> [MA > 1 always].',
    sortItems: [
      'Class III (Effort in middle, e.g., human forearm, sugar tongs)',
      'Class I (Fulcrum in middle, e.g., seesaw, crowbar, scissors)',
      'Class II (Load in middle, e.g., wheelbarrow, nutcracker)',
    ],
    correctOrder: [0, 1, 2],
    explanation: 'Class III always has MA < 1 (speed multiplier). Class I can have MA < 1, = 1, or > 1 depending on fulcrum position. Class II always has MA > 1 (force multiplier).',
    hints: [
      'Class III levers always sacrifice force for distance (MA < 1).',
      'Class I levers depend on where the pivot is set.',
      'Class II levers always have the effort arm longer than the load arm (MA > 1).',
    ],
  },
  // 15. Elasticity - Foundation (Recall)
  {
    id: 'ch_15',
    nodeId: NODE_C9_PHY_047,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the fundamental distinction between elastic deformation and plastic deformation?',
    options: [
      'Elastic deformation occurs in gases, while plastic deformation occurs only in metals.',
      'Elastic deformation is reversible upon removing the deforming force; plastic deformation is permanent.',
      'Elastic deformation produces no restoring force whatsoever.',
      'Plastic deformation always increases the density of the substance tenfold.',
    ],
    correctIndex: 1,
    explanation: 'Elastic deformation is completely reversible when external stress is released. Plastic deformation causes permanent slippage of atomic planes, retaining the altered shape.',
    hints: [
      'Think of a rubber band vs modelling clay (Plasticine).',
      'One snaps back, the other stays deformed.',
      'Elastic = reversible; Plastic = permanent.',
    ],
  },
  // 16. Elasticity - Standard (Application)
  {
    id: 'ch_16',
    nodeId: NODE_C9_PHY_047,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A steel elevator cable of original length 40.0 m stretches by 0.08 m under load. Compute the longitudinal strain produced in the cable (dimensionless).',
    correctAnswer: 0.002,
    tolerance: 0.0001,
    unit: '',
    explanation: 'Strain ε = ΔL / L = 0.08 m / 40.0 m = 0.002. Strain is a pure ratio and has NO units.',
    hints: [
      'Strain = Change in length (ΔL) / Original length (L).',
      'Divide 0.08 by 40.',
      '0.08 / 40 = 0.002 (no units).',
    ],
    misconceptionIndex: 2,
  },
  // 17. Elasticity - Advanced (Evaluation)
  {
    id: 'ch_17',
    nodeId: NODE_C9_PHY_047,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'In physics, why is structural steel considered MORE elastic than vulcanised rubber?',
    options: [
      'Because rubber snaps into pieces instantly when stretched.',
      'Because steel develops a vastly higher restoring force and requires much higher stress for a given strain (higher Young\'s modulus).',
      'Because rubber is an insulator and steel conducts heat.',
      'Because steel can stretch to five times its original length without yielding.',
    ],
    correctIndex: 1,
    explanation: 'In scientific physics, elasticity measures resistance to deformation and the magnitude of restoring force developed. Steel requires immense stress for a tiny strain (Young\'s modulus ~ 200 GPa vs Rubber ~ 0.01 GPa).',
    hints: [
      'Do not use the everyday colloquial meaning of "stretchy".',
      'Elasticity in physics means how strongly the material pulls back and resists strain.',
      'Steel has a vastly higher Young\'s modulus and restoring force than rubber.',
    ],
    misconceptionIndex: 2,
  },
  // 18. Surface Tension - Foundation (Recall)
  {
    id: 'ch_18',
    nodeId: NODE_C9_PHY_048,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Why do free liquid raindrops and tiny mercury beads naturally assume a spherical shape?',
    options: [
      'Atmospheric pressure compresses them equally from all sides.',
      'Surface tension acts to minimise the surface area for a given volume, and a sphere has the minimum surface area.',
      'Gravity pulls all liquid molecules into a central core.',
      'The liquid molecules repel each other violently.',
    ],
    correctIndex: 1,
    explanation: 'Surface tension arises from cohesive intermolecular attraction, pulling surface molecules inward. A sphere has the minimum surface area for a given volume, minimising surface energy.',
    hints: [
      'Think about geometric shapes and surface area.',
      'Cohesive forces pull surface molecules inward to contract the surface.',
      'A sphere possesses the smallest surface area for any given volume.',
    ],
  },
  // 19. Surface Tension - Standard (Understanding)
  {
    id: 'ch_19',
    nodeId: NODE_C9_PHY_048,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'A pond skater insect walks across still lake water. If a few drops of detergent are added nearby, what happens to the insect and why?',
    options: [
      'The insect floats higher because detergent increases liquid density.',
      'The insect immediately sinks because detergent is a surfactant that weakens cohesive bonds and reduces surface tension.',
      'The insect glides twice as fast due to reduced friction.',
      'The water freezes instantly beneath the insect\'s feet.',
    ],
    correctIndex: 1,
    explanation: 'Detergents are surfactants that insert between water molecules, sharply reducing cohesive forces and lowering surface tension so the elastic surface "skin" can no longer support the insect.',
    hints: [
      'Detergents weaken water\'s cohesive force.',
      'What holds the insect up: density or surface tension?',
      'Reduced surface tension destroys the supporting film, causing the insect to sink.',
    ],
    misconceptionIndex: 1,
  },
  // 20. Capillary Action - Advanced (Analysis)
  {
    id: 'ch_20',
    nodeId: NODE_C9_PHY_048,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'When clean glass capillary tubes are dipped into Water vs Mercury, water rises with a concave meniscus, but mercury is depressed with a convex meniscus. What explains this difference?',
    options: [
      'Water is lighter than air, while mercury is heavier than glass.',
      'In water-glass, Adhesive forces > Cohesive forces (wets glass). In mercury-glass, Cohesive forces > Adhesive forces (does not wet glass).',
      'Water conducts electricity while mercury behaves as a dielectric.',
      'Mercury evaporates rapidly, creating a vacuum above the tube.',
    ],
    correctIndex: 1,
    explanation: 'Capillary rise occurs when adhesion (liquid-solid) exceeds cohesion (liquid-liquid), causing wetting and a concave meniscus. Capillary depression occurs when cohesion exceeds adhesion.',
    hints: [
      'Compare Cohesion (liquid to liquid) with Adhesion (liquid to glass wall).',
      'Water loves glass (wets it -> adhesion wins -> concave rise).',
      'Mercury loves itself more than glass (cohesion wins -> convex depression).',
    ],
  },
  // 21. Ohm\'s Law - Advanced (Creativity / Construct)
  {
    id: 'ch_21',
    nodeId: NODE_C9_PHY_041,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Construct the algebraic formula chain to determine total power dissipation in a resistor given only Voltage (V) and Resistance (R).',
    availableParts: ['P =', 'V × I', 'and since I = V/R', '=> P = V² / R', '=> P = I² × R²'],
    targetState: 'P = V × I and since I = V/R => P = V² / R',
    validationHint: 'Combine electric power definition P = V × I with Ohm\'s Law substitution for I.',
    explanation: 'Starting with P = V × I, substitute I = V/R from Ohm\'s law: P = V × (V/R) = V² / R.',
    hints: [
      'Begin with P = V × I.',
      'Substitute I with V/R from Ohm\'s Law.',
      'Combine them to get P = V² / R.',
    ],
  },
  // 22. Work-Energy Principle - Advanced (Creativity / Construct)
  {
    id: 'ch_22',
    nodeId: NODE_C9_PHY_045,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Construct the Work-Energy Theorem relation from work done by net force to final and initial kinetic energies.',
    availableParts: ['W_net =', 'ΔKE', '=', '1/2 m v²', '-', '1/2 m u²', '+ mgh'],
    targetState: 'W_net = ΔKE = 1/2 m v² - 1/2 m u²',
    validationHint: 'Show that net work done equals the change in kinetic energy.',
    explanation: 'The Work-Energy Theorem states that Net Work Done (W_net) equals the change in kinetic energy: ΔKE = 1/2mv² - 1/2mu².',
    hints: [
      'Start with W_net = ΔKE.',
      'Express ΔKE as Final KE minus Initial KE.',
      'Order: W_net = ΔKE = 1/2 m v² - 1/2 m u²',
    ],
  },
  // 23. Magnetic Field Lines - Standard (Recall)
  {
    id: 'ch_23',
    nodeId: NODE_C9_PHY_044,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'recall',
    question: 'Why is it physically impossible for two magnetic field lines to ever intersect each other?',
    options: [
      'Because magnetic lines are made of like charges that repel.',
      'Because at the point of intersection, a compass needle would have to point in two different directions at the same time, which is impossible.',
      'Because field lines only exist in 2D space.',
      'Because the magnetic field becomes infinite at cross-points.',
    ],
    correctIndex: 1,
    explanation: 'The tangent to a magnetic field line gives the unique direction of the magnetic field at that point. If two lines intersected, the resultant field would have two directions at one point, which is physically impossible.',
    hints: [
      'Think about placing a compass needle exactly at the intersection point.',
      'Can a compass needle point in two directions at once?',
      'No point can have two different resultant field directions.',
    ],
  },
  // 24. Capillary Action in Plants - Standard (Application)
  {
    id: 'ch_24',
    nodeId: NODE_C9_PHY_048,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'How do tall banyan and neem trees in India draw water from soil up into their leaves through microscopic xylem vessels without mechanical pumps?',
    options: [
      'By continuous magnetic repulsion in the tree trunk.',
      'Through capillary action enabled by high adhesive attraction between water and cellulose walls, aided by transpiration pull.',
      'Through nuclear fission occurring in tree roots.',
      'By creating an absolute vacuum in the upper leaves.',
    ],
    correctIndex: 1,
    explanation: 'The microscopic diameter of xylem vessels allows capillary action (strong adhesion to vessel walls + cohesion of water molecules) to draw water upward against gravity.',
    hints: [
      'Think about very narrow tubes and adhesive forces.',
      'Water adheres strongly to cellulose walls in plant capillaries.',
      'Capillary action inside xylem vessels draws water upward.',
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
  nodeId: NODE_C9_PHY_041,
  title: "ICSE Class 9 Physics: Ohm's Law, Circuits, Mechanics & Fluids",
  definition:
    'Ohm\'s law states that potential difference V is proportional to current I at constant physical conditions (V = IR). Elasticity, torque, magnetic fields, work-energy, and surface phenomena govern basic physics interactions.',
  eli5: 'Think of voltage as the water push, current as water flow, and resistance as pipe narrowness. Physics also explores why seesaws balance, how magnets pull across space, why steel springs snap back, and why raindrops stay round.',
  misconceptions: [
    {
      misconception: "Ohm's law holds unconditionally under all temperature and electrical changes.",
      correction: "Ohm's law applies ONLY when temperature and other physical conditions remain constant. Resistance rises with temperature in metallic conductors.",
    },
    {
      misconception: 'An ammeter and voltmeter can be interchanged in an electric circuit without consequence.',
      correction: 'Ammeters have near-zero resistance and MUST be connected in series. Voltmeters have very high resistance and MUST be placed in parallel.',
    },
    {
      misconception: 'Rubber is scientifically more elastic than steel because it stretches further with less effort.',
      correction: 'In physics, elasticity is the capacity to develop restoring force and resist deformation (measured by Young\'s Modulus). Steel is far more elastic than rubber.',
    },
    {
      misconception: 'Insects walk on water because water is denser than the insect body.',
      correction: 'Pond skaters walk on water due to surface tension (cohesive forces forming an elastic surface "skin"), not buoyancy or density.',
    },
    {
      misconception: 'A machine can reach or exceed 100% efficiency if sufficiently lubricated.',
      correction: 'Real machines always lose some energy to friction, heat, and sound, keeping useful efficiency strictly below 100%.',
    },
  ],
  diagnosticQuestions: [
    {
      question: 'What is the SI unit of electric resistance?',
      options: ['Volt', 'Ampere', 'Ohm (Ω)', 'Joule'],
      correctIndex: 2,
    },
    {
      question: 'How must an ammeter be connected to measure current through a lamp?',
      options: ['In parallel with the lamp', 'In series with the lamp', 'Across the battery terminals only', 'Anywhere in the room'],
      correctIndex: 1,
    },
    {
      question: 'What is the work done when a 10 N force produces zero displacement?',
      options: ['10 J', '0 J', '100 J', '1 J'],
      correctIndex: 1,
    },
    {
      question: 'Which class of lever always has Mechanical Advantage (MA) greater than 1?',
      options: ['Class I', 'Class II', 'Class III', 'Class IV'],
      correctIndex: 1,
    },
    {
      question: 'What is the unit of strain in SI units?',
      options: ['Pascal (Pa)', 'Newton per metre (N/m)', 'Metre (m)', 'Dimensionless (No unit)'],
      correctIndex: 3,
    },
    {
      question: 'What causes the surface tension of a liquid?',
      options: ['Adhesive forces with air', 'Cohesive forces between liquid molecules', 'Gravitational pull only', 'Atmospheric pressure'],
      correctIndex: 1,
    },
    {
      question: 'At a magnetic neutral point, what is the resultant magnetic field?',
      options: ['Double Earth\'s field', 'Infinite', 'Zero', 'Negative 1 Tesla'],
      correctIndex: 2,
    },
    {
      question: 'What happens to surface tension when water temperature increases?',
      options: ['Increases', 'Decreases', 'Remains constant', 'Becomes infinite'],
      correctIndex: 1,
    },
  ],
  masteryCriteria: 'Mastery is achieved when a student applies Ohm\'s Law, calculates mechanical moments, analyses magnetic neutral points, and evaluates material elasticity accurately.',
};

// ─── EXPLORATION STEPS (5 Interactive Learning Labs) ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Ohm\'s Law & Resistance Explorer',
    instruction: 'Adjust the Voltage and Resistance sliders to observe real-time electron drift and ammeter readout.',
    interactionType: 'slider-observe',
    nodeId: NODE_C9_PHY_041,
  },
  {
    title: 'Lab 2: Circuit Workbench (Series & Parallel Meters)',
    instruction: 'Toggle key switch and swap meter positions to examine current flow and potential difference.',
    interactionType: 'click-parts',
    nodeId: NODE_C9_PHY_042,
  },
  {
    title: 'Lab 3: Magnetic Domain Alignment & Neutral Points',
    instruction: 'Slide the Bar Magnet closer to the soft iron core to observe induced domains and field cancellation.',
    interactionType: 'slider-observe',
    nodeId: NODE_C9_PHY_043,
  },
  {
    title: 'Lab 4: The Principle of Moments (Lever Seesaw)',
    instruction: 'Shift weights along the lever arm to achieve rotational equilibrium (Torque Clockwise = Torque Anticlockwise).',
    interactionType: 'drag-position',
    nodeId: NODE_C9_PHY_046,
  },
  {
    title: 'Lab 5: Surface Tension & Capillary Action',
    instruction: 'Adjust capillary radius and add surfactant (soap) to inspect liquid rise and meniscus geometry.',
    interactionType: 'slider-observe',
    nodeId: NODE_C9_PHY_048,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'If you maintain a constant 12 V battery but increase the resistor from 2 Ω to 6 Ω, predict the new current:',
    options: ['Current rises from 6 A to 18 A', 'Current drops from 6 A to 2 A', 'Current stays at 6 A', 'Current drops to 0.5 A'],
    correctIndex: 1,
    verifyInstruction: 'Adjust the Resistance slider from 2 Ω to 6 Ω on the Ohm\'s Law bench and check the ammeter reading!',
    nodeId: NODE_C9_PHY_041,
  },
  {
    question: 'Predict: What happens to the water level inside a glass capillary tube if you make the tube twice as narrow?',
    options: [
      'Water rises higher because narrower tubes create greater perimeter-to-weight ratio for adhesive lift.',
      'Water level drops because less water can enter the tube.',
      'Water level stays completely unchanged.',
      'Water turns into mercury instantly.',
    ],
    correctIndex: 0,
    verifyInstruction: 'Move the capillary tube radius slider to a smaller value in Lab 5 and observe the meniscus climb!',
    nodeId: NODE_C9_PHY_048,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What happens to the rate of electron drift inside the resistor as you increase Voltage (V)?',
    observableOptions: [
      'Electrons drift much faster as electric field strength and push increase.',
      'Electrons stop moving completely.',
      'Electrons reverse direction toward the negative terminal.',
      'Electrons double their mass.',
    ],
    correctIndex: 0,
    nodeId: NODE_C9_PHY_041,
  },
  {
    question: 'When the lever fulcrum is moved closer to a 100 N heavy load, what do you observe about the required effort force on the other side?',
    observableOptions: [
      'Required effort decreases significantly because the effort arm becomes relatively longer.',
      'Required effort increases to infinity.',
      'The seesaw stops obeying torque principles.',
      'Load weight increases automatically.',
    ],
    correctIndex: 0,
    nodeId: NODE_C9_PHY_046,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Home Energy & Mechanics Audit',
  description: 'Apply your physics skills to inspect everyday electrical and mechanical appliances in your household or school lab.',
  steps: [
    'Inspect the rating plate on an electric kettle or geyser (e.g., 220 V, 1500 W) and calculate its operational coil resistance: R = V² / P.',
    'Test a pair of kitchen scissors or pliers: identify the fulcrum screw, the load cut-point, and measure the mechanical advantage (Effort arm ÷ Load arm).',
    'Carefully float a clean stainless steel sewing needle on the surface of a bowl of water using a piece of tissue paper. Touch a drop of dish soap to the water and observe the needle sink immediately as surface tension collapses!',
    'Record your observations and calculations in your ICSE Physics Practical Journal.',
  ],
};

function C9_PhysicsOhmsResistanceSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C9_PHY_041,
  title = DEFAULT_PROPS.title || "ICSE Class 9 Physics: Ohm's Law & Mechanics",
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions || [],
  misconceptions = DEFAULT_PROPS.misconceptions || [],
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['physics'] || { name: 'Physics', emoji: '⚡', color: 'blue' };

  // Phase flow: discovery -> explore -> sandbox -> challenge -> complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // ─── BRILLIANT-STYLE INTERACTIVE STATES ───
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Lab 1 (Ohm's Law) State
  const [simVoltage, setSimVoltage] = useState(12); // Volts
  const [simResistance, setSimResistance] = useState(4); // Ohms
  const simCurrent = useMemo(() => {
    return simResistance > 0 ? Number((simVoltage / simResistance).toFixed(2)) : 0;
  }, [simVoltage, simResistance]);

  // Lab 2 (Circuits) State
  const [circuitClosed, setCircuitClosed] = useState(true);
  const [rheostatResistance, setRheostatResistance] = useState(6);

  // Lab 3 (Magnetism) State
  const [magnetDistance, setMagnetDistance] = useState(25); // cm
  const [domainAlignment, setDomainAlignment] = useState(50); // %

  // Lab 4 (Levers / Moments) State
  const [leverLeftWeight, setLeverLeftWeight] = useState(40); // N
  const [leverLeftDistance, setLeverLeftDistance] = useState(30); // cm
  const [leverRightDistance, setLeverRightDistance] = useState(40); // cm
  const leverRightWeightNeeded = useMemo(() => {
    return leverRightDistance > 0 ? Number(((leverLeftWeight * leverLeftDistance) / leverRightDistance).toFixed(1)) : 0;
  }, [leverLeftWeight, leverLeftDistance, leverRightDistance]);
  const [leverRightWeightActual, setLeverRightWeightActual] = useState(30);

  // Lab 5 (Fluids & Surface Tension) State
  const [capillaryRadius, setCapillaryRadius] = useState(0.8); // mm
  const [hasSurfactant, setHasSurfactant] = useState(false);
  const capillaryHeight = useMemo(() => {
    const baseTension = hasSurfactant ? 0.025 : 0.073; // N/m
    const density = 1000;
    const g = 9.8;
    const r = (capillaryRadius / 1000);
    const h = (2 * baseTension) / (density * g * r);
    return Number((h * 1000).toFixed(1)); // in mm
  }, [capillaryRadius, hasSurfactant]);

  // Adaptive difficulty & SRS
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
  const [selectedWrongOption, setSelectedWrongOption] = useState<number | null>(null);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Drag & Sort states
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
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Reflection responses
  const [reflectionAnswers, setReflectionAnswers] = useState({
    surprising: '',
    explain: '',
    realLife: '',
  });

  // BKT Ref
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── FILTER CHALLENGES BY DIFFICULTY ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
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

  // ─── ADAPT DIFFICULTY ON BKT UPDATE ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDiff =
      mastery === 'not-started' || mastery === 'beginner'
        ? 'foundation'
        : mastery === 'developing'
        ? 'standard'
        : 'advanced';

    setDifficulty(prev => {
      if (prev !== newDiff) {
        setCurrentChallenge(0);
        return newDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── 2D CANVAS ANIMATION (CIRCUIT ELECTRON DRIFT) ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let offset = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw wire path
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 14;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.rect(30, 20, canvas.width - 60, canvas.height - 40);
      ctx.stroke();

      // Inner wire core
      ctx.strokeStyle = circuitClosed ? '#1e293b' : '#0f172a';
      ctx.lineWidth = 8;
      ctx.stroke();

      if (circuitClosed && simCurrent > 0) {
        // Animate drifting electrons
        offset = (offset + simCurrent * 1.2) % 40;
        ctx.fillStyle = '#38bdf8';
        const totalPerimeter = 2 * (canvas.width - 60 + canvas.height - 40);

        for (let p = 0; p < totalPerimeter; p += 35) {
          const currentPos = (p + offset) % totalPerimeter;
          let x = 30;
          let y = 20;
          const w = canvas.width - 60;
          const h = canvas.height - 40;

          if (currentPos < w) {
            x = 30 + currentPos;
            y = 20;
          } else if (currentPos < w + h) {
            x = 30 + w;
            y = 20 + (currentPos - w);
          } else if (currentPos < 2 * w + h) {
            x = 30 + w - (currentPos - (w + h));
            y = 20 + h;
          } else {
            x = 30;
            y = 20 + h - (currentPos - (2 * w + h));
          }

          ctx.beginPath();
          ctx.arc(x, y, 4, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [circuitClosed, simCurrent]);

  // ─── USECALLBACK HANDLERS ───
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge.hints && challenge.hints[nextLevel - 1]) {
      const hintMsg = challenge.hints[nextLevel - 1];
      setCurrentHint(hintMsg);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(hintMsg);
    } else {
      setAnswerRevealed(true);
      setShowExplanation(true);
      speechManager.speak('Let us review the step-by-step scientific solution.');
    }
  }, [hintCount, challenge]);

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Excellent scientific intuition!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive labs. Explore the physical variables directly!');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Enjoy free experimentation on the multi-bench!');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('chime');
    speechManager.speak('Starting challenge mode. Apply your physics concepts!');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction locked in! Now manipulate the slider to test your hypothesis.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Accurate observation!' : 'Look closely at the electron motion.');
  }, []);

  const handleVoltageChange = useCallback((v: number) => {
    setSimVoltage(v);
    audioManager.play('count');
  }, []);

  const handleResistanceChange = useCallback((r: number) => {
    setSimResistance(r);
    audioManager.play('count');
  }, []);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback(
    (targetId: string) => {
      if (!draggedItem) return;
      const isCorrect = challenge.correctMapping?.[targetId] === draggedItem;
      if (isCorrect) {
        setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
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
      setSortArrangement(prev => {
        if (prev.length === 0 && challenge.sortItems) {
          prev = challenge.sortItems.map((_, i) => i);
        }
        const arr = [...prev];
        const [moved] = arr.splice(fromIndex, 1);
        arr.splice(toIndex, 0, moved);
        return arr;
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
    speechManager.speak(`Diagnostic complete! Your final physics score is ${finalScore} percent.`);
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
    setSelectedWrongOption(null);
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
        isCorrect = Math.abs(numVal - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
      } else if (challenge.type === 'construct') {
        isCorrect = answer === challenge.targetState;
      }

      if (isCorrect) {
        setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct analysis! That matches physical principles.');
        setShowConfetti(true);
        setShowExplanation(true);
        bktStateRef.current = bktUpdate(bktStateRef.current, true);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 5, 3000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
        }
      } else {
        audioManager.play('drop-wrong');
        audioManager.play('error');
        setErrors(e => e + 1);
        setWrongShake(true);
        setWrongFlash(true);
        if (typeof answer === 'number') {
          setSelectedWrongOption(answer);
        }
        setTimeout(() => {
          setWrongShake(false);
          setSelectedWrongOption(null);
        }, 500);
        setTimeout(() => setWrongFlash(false), 800);

        if (challenge.misconceptionIndex !== undefined && !hitMisconceptions.includes(challenge.misconceptionIndex)) {
          setHitMisconceptions(prev => [...prev, challenge.misconceptionIndex!]);
        }

        if (hintCount < 3) {
          showNextHint();
        } else {
          setAnswerRevealed(true);
          setShowExplanation(true);
          speechManager.speak('Let us study the complete derivation together.');
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
    [challenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]
  );

  // Clean timer on unmount
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.header
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between pb-4 mb-6 border-b border-slate-800 gap-4"
      >
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 15, scale: 1.1 }}
            className="w-12 h-12 rounded-2xl bg-gold-600/20 border border-gold-500/40 flex items-center justify-center text-2xl shadow-inner"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <h1 className="text-xl md:text-2xl font-black tracking-tight text-white">{title}</h1>
            <p className="text-xs text-gold-400 font-medium">CISCE Class 9 Physics • ICSE 2026 Focus</p>
          </div>
        </div>

        {/* Phase Pill Navigation */}
        <div className="flex items-center gap-2 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800">
          {(['discovery', 'explore', 'sandbox', 'challenge'] as const).map(p => (
            <motion.span
              key={p}
              whileHover={{ scale: 1.05 }}
              className={`px-3 py-1 rounded-xl text-xs font-bold uppercase transition-colors ${
                phase === p ? 'bg-gold-600 text-white shadow' : 'text-slate-400'
              }`}
            >
              {p}
            </motion.span>
          ))}
        </div>
      </motion.header>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <motion.div
            initial={{ scale: 0.98 }}
            animate={{ scale: 1 }}
            className="p-5 bg-gradient-to-br from-gold-950/60 to-slate-900/80 rounded-2xl border border-gold-800/40"
          >
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-gold-500/20 text-gold-300 border border-gold-400/30 uppercase tracking-wider">
              Diagnostic Scenario
            </span>
            <h2 className="text-xl font-bold text-gold-200 mt-2">{SCENARIO.title}</h2>
            <p className="text-sm text-slate-300 mt-1 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-slate-400 mt-2 italic">{SCENARIO.context}</p>
          </motion.div>

          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800">
            <h3 className="text-base md:text-lg font-semibold text-white mb-4 leading-snug">
              🤔 Discovery Question: {DISCOVERY_QUESTION.question}
            </h3>

            <div className="space-y-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01, x: 4 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className="w-full text-left p-4 rounded-xl text-sm font-medium transition-all bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-slate-700/50 flex items-start gap-3"
                  aria-label={`Option ${i + 1}: ${opt}`}
                >
                  <span className="w-6 h-6 rounded-lg bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-300 shrink-0 mt-0.5">
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span>{opt}</span>
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-5 pt-4 border-t border-slate-800">
                <p className={`text-sm font-semibold mb-4 ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {discoveryCorrect
                    ? '✓ Spot on! Current is inversely proportional to resistance (I = V/R).'
                    : `✗ ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-3 bg-gradient-to-r from-gold-600 to-gold-600 hover:from-gold-500 hover:to-gold-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-gold-500/25 flex items-center gap-2"
                >
                  Enter Interactive Discovery Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE EXPLORATION LABS ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-gold-400">
              Lab Station {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>
            <div className="flex gap-1.5">
              {EXPLORATION_STEPS.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentSlide ? 'w-6 bg-gold-500' : 'w-2 bg-slate-700'
                  }`}
                />
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-5 md:p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4"
            >
              <div>
                <h3 className="text-lg md:text-xl font-bold text-gold-300">{EXPLORATION_STEPS[currentSlide].title}</h3>
                <p className="text-amber-400 text-xs md:text-sm mt-1 font-medium">
                  👉 {EXPLORATION_STEPS[currentSlide].instruction}
                </p>
              </div>

              {/* ─── LAB 1: OHM\'S LAW & CIRCUIT SIMULATION ─── */}
              {currentSlide === 0 && (
                <div className="space-y-4">
                  {/* Predict-then-check block */}
                  {!predictionMade && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-gold-950/40 rounded-xl border border-gold-700/50 space-y-2"
                    >
                      <p className="text-sm font-semibold text-gold-200">
                        ⚡ Quick Prediction: {PREDICTION_QUESTIONS[0].question}
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handlePrediction(i)}
                            className="p-2.5 text-xs text-left bg-slate-800/90 hover:bg-slate-700 rounded-lg text-slate-200 border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {predictionMade && !predictionVerified && (
                    <p className="text-xs text-amber-300 bg-amber-950/40 p-2.5 rounded-lg border border-amber-700/40">
                      🎯 {PREDICTION_QUESTIONS[0].verifyInstruction}
                    </p>
                  )}

                  {/* Visual Simulation Canvas & Schematics */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2 bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center justify-center relative">
                      <canvas ref={canvasRef} width={420} height={160} className="w-full max-w-md h-40" />

                      <div className="absolute top-4 left-4 bg-slate-900/90 px-3 py-1.5 rounded-lg border border-slate-700 text-xs">
                        <span className="text-slate-400">Potential Diff (V): </span>
                        <span className="font-mono text-emerald-400 font-bold">{simVoltage} V</span>
                      </div>

                      <div className="absolute top-4 right-4 bg-slate-900/90 px-3 py-1.5 rounded-lg border border-slate-700 text-xs">
                        <span className="text-slate-400">Current (I): </span>
                        <span className="font-mono text-gold-400 font-bold">{simCurrent} A</span>
                      </div>

                      <div className="absolute bottom-4 bg-slate-900/90 px-4 py-1.5 rounded-lg border border-slate-700 text-xs text-center">
                        <span className="text-slate-400">Coil Resistance (R): </span>
                        <span className="font-mono text-amber-400 font-bold">{simResistance} Ω</span>
                      </div>
                    </div>

                    {/* Sliders Control Panel */}
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-4">
                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>DC Voltage (V):</span>
                          <span className="font-bold text-emerald-400">{simVoltage} V</span>
                        </div>
                        <input
                          type="range"
                          min={2}
                          max={36}
                          step={2}
                          value={simVoltage}
                          onChange={e => handleVoltageChange(Number(e.target.value))}
                          className="w-full accent-emerald-500 cursor-pointer"
                          aria-label="Adjust DC Voltage"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>Nichrome Resistance (R):</span>
                          <span className="font-bold text-amber-400">{simResistance} Ω</span>
                        </div>
                        <input
                          type="range"
                          min={1}
                          max={18}
                          step={1}
                          value={simResistance}
                          onChange={e => handleResistanceChange(Number(e.target.value))}
                          className="w-full accent-amber-500 cursor-pointer"
                          aria-label="Adjust Resistance"
                        />
                      </div>

                      <div className="p-2.5 bg-gold-950/30 rounded-lg border border-gold-800/40 text-xs text-gold-200">
                        <p className="font-semibold">Ohm\'s Law Formula:</p>
                        <p className="font-mono mt-0.5">I = V / R = {simVoltage} / {simResistance} = {simCurrent} A</p>
                      </div>
                    </div>
                  </div>

                  {/* Observation Question */}
                  {!observationAnswered && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 bg-slate-800/60 rounded-xl border border-slate-700 space-y-2"
                    >
                      <p className="text-xs md:text-sm font-semibold text-slate-200">
                        🔍 Observation Check: {OBSERVATION_QUESTIONS[0].question}
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handleObservation(i)}
                            className="p-2 text-left bg-slate-900 rounded-lg text-xs text-slate-300 hover:bg-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              )}

              {/* ─── LAB 2: CIRCUIT SCHEMATICS & METERS ─── */}
              {currentSlide === 1 && (
                <div className="space-y-4">
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col items-center">
                    <svg viewBox="0 0 500 220" className="w-full max-w-xl">
                      {/* Outer Wire Loop */}
                      <rect x="50" y="30" width="400" height="150" rx="10" fill="none" stroke="#475569" strokeWidth="4" />

                      {/* DC Battery Symbol */}
                      <g transform="translate(70, 105)">
                        <line x1="0" y1="-25" x2="0" y2="25" stroke="#38bdf8" strokeWidth="4" />
                        <line x1="12" y1="-12" x2="12" y2="12" stroke="#ef4444" strokeWidth="6" />
                        <text x="-15" y="-15" fill="#38bdf8" fontSize="12" fontWeight="bold">+</text>
                        <text x="20" y="-15" fill="#ef4444" fontSize="12" fontWeight="bold">-</text>
                        <text x="-5" y="40" fill="#94a3b8" fontSize="10">Cell (DC)</text>
                      </g>

                      {/* Switch / Plug Key */}
                      <g transform="translate(230, 20)">
                        <circle cx="0" cy="10" r="4" fill="#38bdf8" />
                        <circle cx="40" cy="10" r="4" fill="#38bdf8" />
                        <motion.line
                          x1="0"
                          y1="10"
                          x2={circuitClosed ? 40 : 30}
                          y2={circuitClosed ? 10 : -10}
                          stroke="#38bdf8"
                          strokeWidth="4"
                          animate={{ y2: circuitClosed ? 10 : -10 }}
                        />
                        <text x="5" y="-15" fill="#94a3b8" fontSize="10">Plug Key (K)</text>
                      </g>

                      {/* Ammeter in Series */}
                      <g transform="translate(430, 105)">
                        <circle cx="10" cy="0" r="18" fill="#1e293b" stroke="#3b82f6" strokeWidth="3" />
                        <text x="10" y="5" textAnchor="middle" fill="#38bdf8" fontSize="12" fontWeight="bold">A</text>
                        <text x="35" y="5" fill="#94a3b8" fontSize="10">Series</text>
                      </g>

                      {/* Resistor with Voltmeter in Parallel */}
                      <g transform="translate(230, 180)">
                        {/* Resistor Zigzag */}
                        <path d="M -40 0 L -30 -10 L -10 10 L 10 -10 L 30 10 L 40 0" fill="none" stroke="#f59e0b" strokeWidth="4" />
                        <text x="0" y="25" textAnchor="middle" fill="#f59e0b" fontSize="11">Resistor (R)</text>

                        {/* Voltmeter Parallel Loop */}
                        <path d="M -40 0 L -40 -35 L -18 -35 M 18 -35 L 40 -35 L 40 0" fill="none" stroke="#22c55e" strokeWidth="2" strokeDasharray="4 2" />
                        <circle cx="0" cy="-35" r="16" fill="#1e293b" stroke="#22c55e" strokeWidth="2" />
                        <text x="0" y="-30" textAnchor="middle" fill="#22c55e" fontSize="11" fontWeight="bold">V</text>
                        <text x="0" y="-55" textAnchor="middle" fill="#94a3b8" fontSize="10">Parallel</text>
                      </g>
                    </svg>

                    <div className="flex gap-4 mt-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setCircuitClosed(!circuitClosed);
                          audioManager.play('tap');
                        }}
                        className={`px-4 py-2 rounded-xl text-xs font-bold ${
                          circuitClosed ? 'bg-amber-600 text-white' : 'bg-emerald-600 text-white'
                        }`}
                      >
                        {circuitClosed ? 'Open Plug Key' : 'Close Plug Key'}
                      </motion.button>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 3: INDUCED MAGNETISM & NEUTRAL POINTS ─── */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col items-center">
                    <svg viewBox="0 0 460 200" className="w-full max-w-lg">
                      {/* Earth's Uniform Field Lines (Northward) */}
                      <g stroke="#334155" strokeWidth="1.5" strokeDasharray="3 3">
                        <line x1="40" y1="180" x2="40" y2="20" />
                        <line x1="140" y1="180" x2="140" y2="20" />
                        <line x1="240" y1="180" x2="240" y2="20" />
                        <line x1="340" y1="180" x2="340" y2="20" />
                        <line x1="420" y1="180" x2="420" y2="20" />
                      </g>
                      <text x="40" y="15" fill="#64748b" fontSize="10">Earth Field H (North)</text>

                      {/* Bar Magnet */}
                      <g transform="translate(160, 80)">
                        <rect x="0" y="0" width="60" height="36" rx="4" fill="#ef4444" />
                        <text x="30" y="22" textAnchor="middle" fill="white" fontWeight="bold" fontSize="14">N</text>
                        <rect x="60" y="0" width="60" height="36" rx="4" fill="#3b82f6" />
                        <text x="90" y="22" textAnchor="middle" fill="white" fontWeight="bold" fontSize="14">S</text>
                        <text x="60" y="-8" textAnchor="middle" fill="#cbd5e1" fontSize="11">Inducing Bar Magnet</text>
                      </g>

                      {/* Soft Iron Bar (Under Induction) */}
                      <g transform={`translate(${300 + (magnetDistance - 25) * 2}, 80)`}>
                        <rect x="0" y="0" width="80" height="36" rx="4" fill="#475569" stroke="#94a3b8" strokeWidth="2" />
                        <text x="18" y="22" textAnchor="middle" fill="#60a5fa" fontWeight="bold" fontSize="13">S\'</text>
                        <text x="62" y="22" textAnchor="middle" fill="#f87171" fontWeight="bold" fontSize="13">N\'</text>
                        <text x="40" y="50" textAnchor="middle" fill="#cbd5e1" fontSize="10">Soft Iron (Induced)</text>
                      </g>

                      {/* Neutral Point Markers on Equatorial Line */}
                      <g transform="translate(220, 30)">
                        <circle cx="0" cy="0" r="7" fill="#fbbf24" opacity="0.8" />
                        <text x="12" y="4" fill="#fbbf24" fontSize="10" fontWeight="bold">Neutral Point (X₁)</text>
                      </g>
                      <g transform="translate(220, 165)">
                        <circle cx="0" cy="0" r="7" fill="#fbbf24" opacity="0.8" />
                        <text x="12" y="4" fill="#fbbf24" fontSize="10" fontWeight="bold">Neutral Point (X₂)</text>
                      </g>
                    </svg>

                    <div className="w-full max-w-sm mt-3">
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>Magnet Proximity:</span>
                        <span className="font-bold text-gold-400">{magnetDistance} cm</span>
                      </div>
                      <input
                        type="range"
                        min={10}
                        max={40}
                        value={magnetDistance}
                        onChange={e => {
                          setMagnetDistance(Number(e.target.value));
                          audioManager.play('pop');
                        }}
                        className="w-full accent-gold-500"
                        aria-label="Adjust Magnet Proximity"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 4: LEVER EQUILIBRIUM & PRINCIPLE OF MOMENTS ─── */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col items-center">
                    <svg viewBox="0 0 480 180" className="w-full max-w-md">
                      {/* Lever Beam */}
                      <line x1="40" y1="90" x2="440" y2="90" stroke="#94a3b8" strokeWidth="8" strokeLinecap="round" />

                      {/* Fulcrum Triangle */}
                      <polygon points="240,90 225,130 255,130" fill="#38bdf8" />
                      <text x="240" y="145" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">Fulcrum (F)</text>

                      {/* Left Load (Anticlockwise) */}
                      <g transform={`translate(${240 - leverLeftDistance * 4}, 90)`}>
                        <line x1="0" y1="0" x2="0" y2="35" stroke="#ef4444" strokeWidth="3" />
                        <rect x="-18" y="35" width="36" height="24" rx="4" fill="#ef4444" />
                        <text x="0" y="52" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">{leverLeftWeight} N</text>
                      </g>

                      {/* Right Effort (Clockwise) */}
                      <g transform={`translate(${240 + leverRightDistance * 4}, 90)`}>
                        <line x1="0" y1="0" x2="0" y2="35" stroke="#22c55e" strokeWidth="3" />
                        <rect x="-18" y="35" width="36" height="24" rx="4" fill="#22c55e" />
                        <text x="0" y="52" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">{leverRightWeightActual} N</text>
                      </g>
                    </svg>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-3">
                      <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-xs space-y-1">
                        <p className="text-red-300 font-semibold">Anticlockwise Torque:</p>
                        <p className="font-mono">{leverLeftWeight} N × {leverLeftDistance} cm = {leverLeftWeight * leverLeftDistance} N·cm</p>
                      </div>
                      <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-xs space-y-1">
                        <p className="text-emerald-300 font-semibold">Clockwise Torque:</p>
                        <p className="font-mono">{leverRightWeightActual} N × {leverRightDistance} cm = {leverRightWeightActual * leverRightDistance} N·cm</p>
                      </div>
                    </div>

                    <div className="w-full grid grid-cols-2 gap-4 mt-3">
                      <div>
                        <span className="text-xs text-slate-400">Right Effort Distance: {leverRightDistance} cm</span>
                        <input
                          type="range"
                          min={10}
                          max={48}
                          value={leverRightDistance}
                          onChange={e => setLeverRightDistance(Number(e.target.value))}
                          className="w-full accent-emerald-500"
                        />
                      </div>
                      <div>
                        <span className="text-xs text-slate-400">Right Load: {leverRightWeightActual} N</span>
                        <input
                          type="range"
                          min={10}
                          max={80}
                          value={leverRightWeightActual}
                          onChange={e => setLeverRightWeightActual(Number(e.target.value))}
                          className="w-full accent-emerald-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 5: SURFACE TENSION & CAPILLARY RISE ─── */}
              {currentSlide === 4 && (
                <div className="space-y-4">
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col items-center">
                    <svg viewBox="0 0 380 200" className="w-full max-w-sm">
                      {/* Water Trough */}
                      <rect x="50" y="120" width="280" height="60" rx="6" fill="#0284c7" opacity="0.4" />
                      <line x1="50" y1="120" x2="330" y2="120" stroke="#38bdf8" strokeWidth="3" />

                      {/* Capillary Glass Tube */}
                      <g transform="translate(170, 20)">
                        <rect x="0" y="0" width="40" height="150" fill="none" stroke="#e2e8f0" strokeWidth="3" />
                        {/* Meniscus Liquid Column */}
                        <motion.rect
                          x="3"
                          y={100 - capillaryHeight * 2}
                          width="34"
                          height={50 + capillaryHeight * 2}
                          fill="#38bdf8"
                          opacity="0.7"
                          animate={{ y: Math.max(10, 100 - capillaryHeight * 2), height: Math.min(140, 50 + capillaryHeight * 2) }}
                        />
                        {/* Concave Meniscus Curve */}
                        <path
                          d={`M 3 ${Math.max(10, 100 - capillaryHeight * 2)} Q 20 ${Math.max(16, 106 - capillaryHeight * 2)} 37 ${Math.max(10, 100 - capillaryHeight * 2)}`}
                          fill="none"
                          stroke="#bae6fd"
                          strokeWidth="2"
                        />
                      </g>
                      <text x="240" y="60" fill="#38bdf8" fontSize="11" fontWeight="bold">h = {capillaryHeight} mm</text>
                      <text x="240" y="75" fill="#94a3b8" fontSize="9">(Capillary Rise)</text>
                    </svg>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-3">
                      <div>
                        <span className="text-xs text-slate-300">Capillary Radius (r): {capillaryRadius} mm</span>
                        <input
                          type="range"
                          min={0.3}
                          max={2.0}
                          step={0.1}
                          value={capillaryRadius}
                          onChange={e => setCapillaryRadius(Number(e.target.value))}
                          className="w-full accent-gold-400"
                        />
                      </div>
                      <div className="flex items-center justify-between p-2 bg-slate-900 rounded-lg border border-slate-800">
                        <span className="text-xs text-slate-300">Add Soap (Surfactant):</span>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setHasSurfactant(!hasSurfactant);
                            audioManager.play('pop');
                          }}
                          className={`px-3 py-1 rounded-lg text-xs font-bold ${
                            hasSurfactant ? 'bg-amber-600 text-white' : 'bg-slate-700 text-slate-300'
                          }`}
                        >
                          {hasSurfactant ? 'Surfactant Active' : 'Pure Water'}
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center pt-2">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                setCurrentSlide(s => Math.max(0, s - 1));
                audioManager.play('tap');
              }}
              disabled={currentSlide === 0}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-sm font-semibold disabled:opacity-40"
            >
              ← Previous Lab
            </motion.button>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => {
                  setCurrentSlide(s => s + 1);
                  audioManager.play('whoosh');
                }}
                className="px-5 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-gold-500/20"
              >
                Next Lab Station →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-emerald-500/20"
              >
                Enter Sandbox Mode →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: FREE PLAY SANDBOX ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-5 bg-gradient-to-r from-emerald-950/40 to-slate-900 rounded-2xl border border-emerald-800/40">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 uppercase">
              Free Multi-Bench Exploration
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Experimental Sandbox</h2>
            <p className="text-xs md:text-sm text-slate-300 mt-1">
              Test all physical parameters without grading pressure. Verify formulas across mechanics, circuits, and fluid tension!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
              <h4 className="text-sm font-bold text-gold-300">⚡ Dynamic Ohm\'s Law Simulator</h4>
              <div className="flex justify-between text-xs text-slate-300">
                <span>Voltage: {simVoltage} V</span>
                <span>Current: {simCurrent} A</span>
              </div>
              <input
                type="range"
                min={2}
                max={48}
                value={simVoltage}
                onChange={e => handleVoltageChange(Number(e.target.value))}
                className="w-full accent-gold-500"
              />
              <div className="flex justify-between text-xs text-slate-300">
                <span>Resistance: {simResistance} Ω</span>
                <span>Power (V²/R): {simResistance > 0 ? ((simVoltage * simVoltage) / simResistance).toFixed(1) : 0} W</span>
              </div>
              <input
                type="range"
                min={1}
                max={24}
                value={simResistance}
                onChange={e => handleResistanceChange(Number(e.target.value))}
                className="w-full accent-amber-500"
              />
            </div>

            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
              <h4 className="text-sm font-bold text-emerald-300">⚖️ Lever Moments Calculator</h4>
              <p className="text-xs text-slate-300">
                Load: {leverLeftWeight} N at {leverLeftDistance} cm. Effort Arm: {leverRightDistance} cm.
              </p>
              <div className="p-2.5 bg-slate-950 rounded-lg text-xs font-mono text-emerald-400 border border-slate-800">
                Effort needed for balance = (L × dL) / dE = {leverRightWeightNeeded} N
              </div>
              <input
                type="range"
                min={10}
                max={60}
                value={leverRightDistance}
                onChange={e => setLeverRightDistance(Number(e.target.value))}
                className="w-full accent-emerald-500"
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleAdvanceToChallenge}
            className="w-full py-3.5 bg-gradient-to-r from-gold-600 to-gold-600 hover:from-gold-500 hover:to-gold-500 text-white rounded-xl font-black text-sm shadow-xl shadow-gold-500/25 flex items-center justify-center gap-2"
          >
            Ready for Challenges (NEP 2020 Competency Assessment) →
          </motion.button>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGE ASSESSMENT MODE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Challenge Header & Badges */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <motion.span
                key={difficulty}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                  difficulty === 'foundation'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : difficulty === 'standard'
                    ? 'bg-gold-500/20 text-gold-300 border border-gold-500/30'
                    : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                }`}
              >
                {difficulty}
              </motion.span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gold-500/20 text-gold-300 border border-gold-500/30 uppercase">
                {challenge.competencyLevel}
              </span>
            </div>

            <span className="text-xs text-slate-400">
              Mastery: <strong className="text-gold-400 uppercase">{masteryLevel}</strong>
            </span>
          </div>

          {/* Progress Bar */}
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-gold-500 via-gold-500 to-emerald-500"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <div className="text-xs text-gold-300 mt-1">
            📅 SM-2 Spaced Repetition: review in {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'} to strengthen your memory.
          </div>

          {/* ─── MCQ CHALLENGES ─── */}
          {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') &&
            challenge.options && (
              <div className="space-y-4">
                <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                  <p className="text-base md:text-lg font-semibold text-white leading-snug">{challenge.question}</p>
                </div>

                <div className="space-y-2.5">
                  {challenge.options.map((opt, i) => {
                    const isWrongSelection = selectedWrongOption === i;
                    const isCorrectAnswer = showExplanation && i === challenge.correctIndex;

                    return (
                      <motion.button
                        key={i}
                        animate={isWrongSelection ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                        transition={{ duration: 0.4 }}
                        whileHover={{ scale: 1.01, x: 4 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => handleAnswer(i)}
                        disabled={showExplanation || answerRevealed}
                        className={`w-full text-left p-4 rounded-xl text-sm font-medium transition-all border flex items-start gap-3 ${
                          isCorrectAnswer
                            ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                            : isWrongSelection
                            ? 'bg-rose-950/70 border-rose-500 text-rose-200'
                            : 'bg-slate-900 hover:bg-slate-800/80 text-slate-200 border-slate-800'
                        }`}
                        aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                      >
                        <span className="w-6 h-6 rounded-lg bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-300 shrink-0 mt-0.5">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span>{opt}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            )}

          {/* ─── DRAG-LABEL CHALLENGE ─── */}
          {challenge.type === 'drag-label' && challenge.dragItems && (
            <div className="space-y-4">
              <p className="text-base font-semibold text-white">{challenge.question}</p>
              <div className="flex flex-wrap gap-2">
                {challenge.dragItems.map((item, idx) => (
                  <motion.div
                    key={idx}
                    draggable
                    onDragStart={() => handleDragStart(item.label)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-3.5 py-2 bg-gold-600/30 hover:bg-gold-600/50 border border-gold-500/50 text-gold-200 rounded-xl text-xs font-bold cursor-grab shadow"
                    role="button"
                    aria-label={`Draggable ${item.label}`}
                  >
                    ⋮⋮ {item.label}
                  </motion.div>
                ))}
              </div>

              {/* Target Drop Board */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                {Object.keys(challenge.correctMapping || {}).map(targetId => (
                  <div
                    key={targetId}
                    onDragOver={e => e.preventDefault()}
                    onDrop={() => handleDragDrop(targetId)}
                    className="p-4 bg-slate-900 rounded-xl border-2 border-dashed border-slate-700 min-h-[90px] flex flex-col justify-center items-center text-center transition-colors hover:border-gold-500"
                  >
                    <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">
                      {targetId.replace('_', ' ')}
                    </span>
                    <span className="text-sm font-bold text-emerald-400">
                      {droppedLabels[targetId] || 'Drop Label Here'}
                    </span>
                  </div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => handleAnswer(droppedLabels)}
                className="px-5 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold"
              >
                Verify Component Wiring
              </motion.button>
            </div>
          )}

          {/* ─── DRAG-SORT CHALLENGE ��── */}
          {challenge.type === 'drag-sort' && challenge.sortItems && (
            <div className="space-y-4">
              <p className="text-base font-semibold text-white">{challenge.question}</p>
              <div className="space-y-2">
                {(sortArrangement.length === challenge.sortItems.length
                  ? sortArrangement.map(idx => challenge.sortItems![idx])
                  : challenge.sortItems
                ).map((item, displayIdx) => (
                  <motion.div
                    key={displayIdx}
                    draggable
                    onDragStart={() => setDraggedItem(String(displayIdx))}
                    onDragOver={e => e.preventDefault()}
                    onDrop={() => {
                      const fromIdx = parseInt(draggedItem || '0');
                      handleSortMove(fromIdx, displayIdx);
                    }}
                    whileHover={{ scale: 1.01 }}
                    className="p-3.5 bg-slate-900 rounded-xl border border-slate-700 text-xs md:text-sm text-slate-200 cursor-grab flex items-center gap-3"
                    role="button"
                    aria-label={`Sort item ${displayIdx + 1}`}
                  >
                    <span className="w-6 h-6 rounded-lg bg-gold-600/30 text-gold-300 flex items-center justify-center font-bold text-xs shrink-0">
                      {displayIdx + 1}
                    </span>
                    <span>{item}</span>
                  </motion.div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => {
                  const ans =
                    sortArrangement.length > 0
                      ? sortArrangement
                      : challenge.sortItems?.map((_, i) => i) || [];
                  handleAnswer(ans);
                }}
                className="px-5 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold"
              >
                Submit Sorted Sequence
              </motion.button>
            </div>
          )}

          {/* ─── NUMERIC CHALLENGE ─── */}
          {challenge.type === 'numeric' && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                <p className="text-base md:text-lg font-semibold text-white leading-snug">{challenge.question}</p>
              </div>

              <div className="flex items-center gap-3">
                <motion.input
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  type="number"
                  step="any"
                  value={numericInput}
                  onChange={e => setNumericInput(e.target.value)}
                  placeholder="Enter numeric value"
                  className={`px-4 py-3 bg-slate-900 border rounded-xl text-white font-mono text-base focus:outline-none focus:border-gold-500 w-48 ${
                    wrongFlash ? 'border-rose-500' : 'border-slate-700'
                  }`}
                  aria-label="Numeric answer input"
                />
                <span className="text-base font-bold text-slate-300">{challenge.unit}</span>
                <motion.button
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handleAnswer(numericInput)}
                  disabled={!numericInput || showExplanation}
                  className="px-6 py-3 bg-gold-600 hover:bg-gold-500 text-white rounded-xl font-bold text-sm disabled:opacity-40"
                >
                  Verify Answer
                </motion.button>
              </div>
            </div>
          )}

          {/* ─── CONSTRUCT CHALLENGE ─── */}
          {challenge.type === 'construct' && challenge.availableParts && (
            <div className="space-y-4">
              <p className="text-base font-semibold text-white">{challenge.question}</p>
              <p className="text-xs text-slate-400">{challenge.validationHint}</p>

              <div className="flex flex-wrap gap-2">
                {challenge.availableParts.map((part, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setConstructParts(prev => [...prev, part]);
                      audioManager.play('tap');
                    }}
                    className="px-3 py-1.5 bg-gold-950 border border-gold-700 text-gold-200 rounded-lg text-xs font-mono"
                  >
                    + {part}
                  </motion.button>
                ))}
              </div>

              <motion.div
                animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                transition={{ duration: 0.4 }}
                className={`p-4 bg-slate-900 rounded-xl border min-h-[60px] flex flex-wrap gap-2 items-center ${
                  wrongFlash ? 'border-rose-500' : 'border-slate-800'
                }`}
              >
                {constructParts.map((p, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 bg-gold-900/60 border border-gold-600 rounded-lg text-xs text-gold-200 font-mono flex items-center gap-1.5"
                  >
                    {p}
                    <button
                      onClick={() => setConstructParts(prev => prev.filter((_, i) => i !== idx))}
                      className="text-rose-400 hover:text-rose-200 font-bold ml-1"
                    >
                      ✕
                    </button>
                  </span>
                ))}
                {constructParts.length === 0 && <span className="text-xs text-slate-500">Assemble parts above...</span>}
              </motion.div>

              <motion.button
                animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                transition={{ duration: 0.4 }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => handleAnswer(constructParts.join(' '))}
                disabled={constructParts.length === 0 || showExplanation}
                className="px-5 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold"
              >
                Validate Construction
              </motion.button>
            </div>
          )}

          {/* ─── PROGRESSIVE DISCLOSURE EXPLANATION ─── */}
          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 bg-gradient-to-br from-amber-950/40 to-slate-900 rounded-2xl border border-amber-700/50 space-y-3"
            >
              <h4 className="text-sm font-bold text-amber-300">💡 Step-by-Step Scientific Derivation:</h4>

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
                      className="text-xs md:text-sm text-amber-100 leading-relaxed"
                    >
                      <strong className="text-amber-400">Step {sIdx + 1}:</strong> {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}
              </div>

              {revealedSteps <
                challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    setRevealedSteps(s => s + 1);
                    audioManager.play('tap');
                  }}
                  className="px-4 py-2 bg-amber-800 hover:bg-amber-700 text-white rounded-xl text-xs font-bold"
                >
                  Show Next Step →
                </motion.button>
              )}

              {revealedSteps >=
                challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleNextChallenge}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-black shadow-lg shadow-emerald-500/20"
                >
                  {currentChallenge + 1 >= filteredChallenges.length ? 'Complete Diagnostic →' : 'Next Challenge →'}
                </motion.button>
              )}
            </motion.div>
          )}
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION & REAL-WORLD LAB REPORT ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-gold-950/80 via-slate-900 to-emerald-950/80 rounded-3xl border border-gold-700/50 text-center space-y-3">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 12 }}
              className="w-16 h-16 mx-auto bg-emerald-500/20 border border-emerald-400/40 rounded-full flex items-center justify-center text-3xl"
            >
              🏆
            </motion.div>
            <h2 className="text-2xl md:text-3xl font-black text-white">Diagnostic Certified!</h2>
            <p className="text-sm text-slate-300 max-w-lg mx-auto">
              Your overall diagnostic score: <strong className="text-emerald-400 font-mono text-lg">{Math.max(0, 100 - errors * 5)}%</strong>
            </p>
            <p className="text-xs text-gold-300 font-medium">Adaptive Mastery Tier: {masteryLevel.toUpperCase()}</p>
          </div>

          {/* Personalized Motivational Feedback */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 text-center space-y-2">
            <span className="text-lg md:text-xl font-black text-amber-400 block tracking-wide">
              {errors === 0
                ? 'PERFECT SCORE!'
                : errors <= 3
                ? 'Great work!'
                : errors <= 7
                ? 'Good effort!'
                : 'Do not give up — You WILL get this!'}
            </span>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed max-w-2xl mx-auto">
              {errors === 0
                ? 'Outstanding performance! You have mastered ICSE Class 9 Ohm\'s Law, Circuit Conventions, Magnetic Neutral Points, Lever Equilibrium, and Fluid Surface Phenomena.'
                : errors <= 3
                ? 'Great analytical skills! Minor slips occurred in unit conversions or moment equations, but your conceptual grasp is robust.'
                : errors <= 7
                ? 'Solid effort! Review the misconception table and practice numerical rearrangements of V = IR and the Principle of Moments.'
                : 'Keep practicing! Review the fundamentals of Ohm\'s law, magnetic induction, and equilibrium to build your physics mastery.'}
            </p>
          </div>

          {/* Misconception Diagnostic Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-4 bg-rose-950/30 rounded-2xl border border-rose-800/40 space-y-3">
              <h4 className="text-sm font-bold text-rose-300">⚠️ Your Concept Clarifications:</h4>
              <div className="space-y-2">
                {hitMisconceptions.map((mIdx, i) => {
                  const m = misconceptions[mIdx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-900/90 rounded-xl border border-rose-900/50 text-xs">
                      <p className="text-rose-300 font-semibold">❌ Misconception: {m.misconception}</p>
                      <p className="text-emerald-300 mt-1 font-medium">✓ Physical Truth: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Reflection Section */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-gold-300 flex items-center gap-2">
              <span>🤔</span> Reflection & Conceptual Synthesis
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  What was the most surprising thing you learned?
                </label>
                <input
                  type="text"
                  value={reflectionAnswers.surprising}
                  onChange={e => setReflectionAnswers({ ...reflectionAnswers, surprising: e.target.value })}
                  placeholder="e.g., Why steel is scientifically more elastic than rubber..."
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-gold-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  How would you explain this to a friend?
                </label>
                <input
                  type="text"
                  value={reflectionAnswers.explain}
                  onChange={e => setReflectionAnswers({ ...reflectionAnswers, explain: e.target.value })}
                  placeholder="e.g., Voltage is electrical pressure pushing electrons through resistance..."
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-gold-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Where in real life might you use this?
                </label>
                <input
                  type="text"
                  value={reflectionAnswers.realLife}
                  onChange={e => setReflectionAnswers({ ...reflectionAnswers, realLife: e.target.value })}
                  placeholder="e.g., Sizing heating elements or balancing levers in mechanical tools..."
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-gold-500"
                />
              </div>
            </div>
          </div>

          {/* Spaced Repetition Schedule */}
          <div className="p-4 bg-amber-950/30 rounded-2xl border border-amber-800/40 text-xs text-slate-300">
            <h4 className="font-bold text-amber-300 mb-1">📅 Spaced Repetition Review (SM-2):</h4>
            <p>
              Next concept refresher scheduled in{' '}
              <strong className="text-amber-300 font-bold">
                {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}
              </strong>
              . Revisiting builds long-term synaptic retention!
            </p>
          </div>

          {/* Real World Activity */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-base font-bold text-gold-300">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-2 text-xs text-slate-400">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-gold-600/20 text-gold-300 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
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
      {showSuccess && <SuccessBanner message="Mastery Level Upgraded!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C9_PhysicsOhmsResistanceSim;