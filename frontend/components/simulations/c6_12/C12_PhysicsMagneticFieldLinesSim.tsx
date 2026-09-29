'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── ISC CLASS 12 PHYSICS NODE CONSTANTS ───
const NODE_C12_PHY_051 = 'c12_phy_051'; // Magnetic field lines and properties
const NODE_C12_PHY_052 = 'c12_phy_052'; // Diamagnetic substances
const NODE_C12_PHY_053 = 'c12_phy_053'; // Paramagnetic substances
const NODE_C12_PHY_054 = 'c12_phy_054'; // Ferromagnetic substances
const NODE_C12_PHY_055 = 'c12_phy_055'; // Electromagnets and permanent magnets
const NODE_C12_PHY_056 = 'c12_phy_056'; // Magnetic flux
const NODE_C12_PHY_057 = 'c12_phy_057'; // Faraday's laws of electromagnetic induction
const NODE_C12_PHY_058 = 'c12_phy_058'; // Lenz's law
const NODE_C12_PHY_059 = 'c12_phy_059'; // Eddy currents
const NODE_C12_PHY_060 = 'c12_phy_060'; // Motional emf (epsilon = Blv)

const ALL_NODE_IDS = [
  NODE_C12_PHY_051,
  NODE_C12_PHY_052,
  NODE_C12_PHY_053,
  NODE_C12_PHY_054,
  NODE_C12_PHY_055,
  NODE_C12_PHY_056,
  NODE_C12_PHY_057,
  NODE_C12_PHY_058,
  NODE_C12_PHY_059,
  NODE_C12_PHY_060,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Mission: The Vande Bharat Mag-Braking & Induction Grid',
  intro: 'You are the chief electrical systems engineer designing the next-generation Vande Bharat express train induction and regenerative braking suite. The train relies on electromagnetic flux dynamics, motional EMF generators, and eddy current retarders to halt safely without mechanical wear.',
  context: 'To calibrate these high-speed systems, you must investigate magnetic field lines, classify magnetic alloys, harness Faraday-Lenz induction, and engineer low-loss laminated cores.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'If an ultra-strong neodymium magnet is dropped down a vertical, non-magnetic pure copper pipe, what happens to its fall?',
  options: [
    'It falls faster than in air due to magnetic gravitational attraction',
    'It falls normally at 9.8 m/s² because copper is non-magnetic',
    'It floats down in slow motion due to upward opposing magnetic forces from induced eddy currents',
    'It stops permanently halfway down and gets welded to the copper'
  ],
  correctIndex: 2,
  hintAfter: 'Even though copper is not ferromagnetic, changing magnetic flux induces swirling currents (Lenz’s Law) that push upward against gravity! Let’s explore the deep physics behind this.',
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

// ─── 22 COMPREHENSIVE CHALLENGES ───
const CHALLENGES: Challenge[] = [
  // 1. Foundation - Recall (c12_phy_051)
  {
    id: 'ch_01',
    nodeId: NODE_C12_PHY_051,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Why do magnetic field lines always form continuous closed loops, unlike electrostatic field lines?',
    options: [
      'Magnetic fields possess infinite energy',
      'Isolated magnetic monopoles do not exist in nature',
      'Magnets only operate in two dimensions',
      'The permeability of vacuum is non-zero'
    ],
    correctIndex: 1,
    explanation: 'Magnetic field lines form continuous closed loops (running N to S outside and S to N inside the magnet) because isolated magnetic monopoles do not exist in nature. In contrast, electric field lines originate on positive charges and terminate on negative charges.',
    hints: [
      'Think about what happens when you cut a bar magnet in half.',
      'Do single magnetic charges (isolated N or S poles) exist?',
      'Because monopoles do not exist, magnetic field lines cannot have starting or ending points.'
    ],
    misconceptionIndex: 0
  },
  // 2. Foundation - Drag-label on Magnetic Dipole (c12_phy_051)
  {
    id: 'ch_02',
    nodeId: NODE_C12_PHY_051,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag the field positions and direction labels to their proper locations around the bar magnet dipole.',
    dragItems: [
      { label: 'End-On (Axial) Pos: B = 2B₀', targetId: 'target_axial' },
      { label: 'Broadside-On (Equatorial): B = B₀', targetId: 'target_equatorial' },
      { label: 'Internal Field: S → N', targetId: 'target_internal' },
      { label: 'External Field: N → S', targetId: 'target_external' },
    ],
    correctMapping: {
      target_axial: 'End-On (Axial) Pos: B = 2B₀',
      target_equatorial: 'Broadside-On (Equatorial): B = B₀',
      target_internal: 'Internal Field: S → N',
      target_external: 'External Field: N → S',
    },
    explanation: 'At equal distance r from a short dipole, the axial (end-on) field is exactly twice the broadside-on (equatorial) field: B_end = 2 × B_broad. Outside the magnet lines run N to S, while inside they run S to N.',
    hints: [
      'The axial position lies along the line connecting the poles.',
      'The broadside-on position lies on the perpendicular bisector.',
      'Inside the magnet, lines travel backwards from South to North to close the loops.'
    ],
    misconceptionIndex: 1
  },
  // 3. Foundation - Understanding (c12_phy_052)
  {
    id: 'ch_03',
    nodeId: NODE_C12_PHY_052,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'A thin rod of Bismuth is suspended horizontally in a strong magnetic field between pole pieces. What is its equilibrium orientation?',
    options: [
      'It aligns parallel to the magnetic field lines',
      'It sets itself perpendicular to the magnetic field lines',
      'It continuously spins at high frequency',
      'It aligns at an angle of exactly 45° to the field'
    ],
    correctIndex: 1,
    explanation: 'Bismuth is diamagnetic (χ < 0, μ_r < 1). The applied field induces an opposing magnetic dipole moment, leading to weak repulsion. The rod minimises its energy by setting its length perpendicular to the field lines.',
    hints: [
      'Recall whether diamagnetic substances are attracted or repelled by a magnetic field.',
      'Diamagnetic materials acquire an induced magnetisation opposite to the external field.',
      'To escape the strongest field region, the rod sets itself perpendicular.'
    ],
    misconceptionIndex: 2
  },
  // 4. Standard - Application (c12_phy_056)
  {
    id: 'ch_04',
    nodeId: NODE_C12_PHY_056,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A square solar-panel tracking loop of area 0.25 m² is bathed in a uniform magnetic field of 0.8 T. If the normal to the loop makes an angle θ = 60° with the field lines, calculate the magnetic flux through the loop in milliwebers (mWb).',
    correctAnswer: 100,
    tolerance: 2,
    unit: 'mWb',
    explanation: 'Φ = B · A = B A cos(θ) = 0.8 T × 0.25 m² × cos(60°) = 0.20 × 0.5 = 0.10 Wb = 100 mWb.',
    hints: [
      'Recall the formula for magnetic flux: Φ = B A cos(θ).',
      'cos(60°) = 0.5.',
      'Convert the result from Weber (Wb) to milliwebers (mWb) by multiplying by 1000: 0.1 Wb = 100 mWb.'
    ],
    misconceptionIndex: 1
  },
  // 5. Standard - Analysis (c12_phy_053 & c12_phy_054)
  {
    id: 'ch_05',
    nodeId: NODE_C12_PHY_053,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'How does magnetic susceptibility (χ) behave when temperature (T) increases for Paramagnetic vs Diamagnetic materials?',
    options: [
      'Paramagnetic χ decreases as 1/T (Curie’s Law); Diamagnetic χ remains completely independent of temperature',
      'Both decrease linearly as 1/T due to domain breakdown',
      'Paramagnetic χ increases with temperature; Diamagnetic χ drops to zero at Curie temperature',
      'Both remain constant regardless of temperature changes'
    ],
    correctIndex: 0,
    explanation: 'Paramagnetism arises from permanent atomic dipoles randomised by thermal agitation, obeying Curie’s law (χ = C/T). Diamagnetism arises from induced electron orbital changes (Lenz’s law at atomic scale) with no permanent dipoles, making it temperature-independent.',
    hints: [
      'Do diamagnetic atoms have permanent magnetic dipoles?',
      'Since diamagnetic atoms have m = 0, thermal vibrations do not disorient any pre-existing dipole.',
      'Paramagnets follow Curie’s law: χ = C/T.'
    ],
    misconceptionIndex: 1
  },
  // 6. Standard - Construct formula (c12_phy_057)
  {
    id: 'ch_06',
    nodeId: NODE_C12_PHY_057,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Construct Faraday’s Second Law of Electromagnetic Induction for a multi-turn coil from the given components.',
    availableParts: ['ε =', '-N', '(dΦ/dt)', '+N', 'B · l · v', 'I · R'],
    targetState: 'ε = -N (dΦ/dt)',
    validationHint: 'Combine the induced EMF symbol, negative sign with turn count N, and rate of change of flux.',
    explanation: 'Faraday’s 2nd Law states that the magnitude of induced EMF is proportional to the rate of change of magnetic flux linkage: ε = -N (dΦ/dt). The negative sign represents Lenz’s Law.',
    hints: [
      'Start with the EMF term: ε =',
      'Include the turn multiplier and the negative sign: -N',
      'Attach the time derivative of flux: (dΦ/dt)'
    ],
    misconceptionIndex: 3
  },
  // 7. Foundation - Recall (c12_phy_055)
  {
    id: 'ch_07',
    nodeId: NODE_C12_PHY_055,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Why is soft iron exclusively preferred over hardened steel for the core of an AC transformer?',
    options: [
      'Soft iron has high retentivity and very low coercive force, giving a narrow hysteresis loop with minimal energy loss',
      'Soft iron acts as an electrical insulator preventing all currents',
      'Soft iron permanently locks in magnetism so it never changes',
      'Hardened steel has zero coercive force and would melt under DC'
    ],
    correctIndex: 0,
    explanation: 'Transformer cores cycle through the B-H loop 50 times per second (in India). Soft iron has high permeability, high retentivity, but crucially very low coercivity, resulting in a narrow hysteresis loop and minimal energy dissipation as heat.',
    hints: [
      'What does the area enclosed by a B-H hysteresis loop represent?',
      'The loop area equals energy lost per unit volume per cycle.',
      'Soft iron easily demagnetises because of low coercive force.'
    ],
    misconceptionIndex: 0
  },
  // 8. Standard - Drag-sort (c12_phy_058)
  {
    id: 'ch_08',
    nodeId: NODE_C12_PHY_058,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the sequence of physical events when the North pole of a magnet is pushed rapidly towards a closed conducting loop.',
    sortItems: [
      'Approaching North pole increases magnetic flux through the loop (dΦ/dt > 0)',
      'Induced EMF drives current in the loop according to Faraday’s law',
      'By Lenz’s law, induced current creates a magnetic field pointing opposite to the increase',
      'Near face of loop develops North polarity and exerts a repulsive mechanical force opposing the motion',
      'Mechanical work done against repulsion is converted into Joule electrical energy'
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'Increasing flux induces an anticlockwise current (viewed from magnet) creating an induced North pole. This repels the incoming magnet, ensuring energy conservation (work done = electrical energy dissipated).',
    hints: [
      'The process begins with the physical approach changing flux.',
      'Next, EMF and current are induced in the loop.',
      'Lenz’s law determines the opposing polarity (North facing North).',
      'Mechanical work balances electrical energy.'
    ],
    misconceptionIndex: 0
  },
  // 9. Standard - Application (c12_phy_060)
  {
    id: 'ch_09',
    nodeId: NODE_C12_PHY_060,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'An Indian Railways train axle of length l = 1.5 m travels horizontally at v = 40 m/s through the vertical component of Earth’s magnetic field B = 4.0 × 10⁻⁵ T. What is the motional EMF induced across the axle in millivolts (mV)?',
    correctAnswer: 2.4,
    tolerance: 0.1,
    unit: 'mV',
    explanation: 'ε = B · l · v = (4.0 × 10⁻⁵ T) × (1.5 m) × (40 m/s) = 2.4 × 10⁻³ V = 2.4 mV.',
    hints: [
      'Use the motional EMF formula: ε = B l v.',
      'Multiply: 4.0e-5 × 1.5 × 40 = 2.4 × 10⁻³ V.',
      'Convert Volts to millivolts: 2.4 × 10⁻³ V = 2.4 mV.'
    ],
    misconceptionIndex: 0
  },
  // 10. Advanced - Analysis / Evaluation (c12_phy_059)
  {
    id: 'ch_10',
    nodeId: NODE_C12_PHY_059,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A copper plate with slots cut into it swings between electromagnet poles, while a solid copper plate stops almost instantaneously. Why do slots reduce electromagnetic damping?',
    options: [
      'Slots break large continuous eddy current loops, increasing resistance and drastically cutting I²R retarding forces',
      'Slots eliminate all magnetic flux from penetrating the copper',
      'Slots convert the copper from diamagnetic to ferromagnetic',
      'Slots increase the mass of the pendulum, increasing its momentum'
    ],
    correctIndex: 0,
    explanation: 'Cutting slots breaks the large bulk conducting loops into tiny narrow paths. This raises effective resistance to circulating eddy currents, drastically reducing the induced current magnitude and the resultant Lenz retarding force.',
    hints: [
      'What path do eddy currents take in a solid sheet?',
      'How does cutting slots alter the length and cross-section of conducting pathways?',
      'Higher resistance means smaller induced currents and weaker braking torque.'
    ],
    misconceptionIndex: 1
  },
  // 11. Foundation - Classify (c12_phy_054)
  {
    id: 'ch_11',
    nodeId: NODE_C12_PHY_054,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What happens to a ferromagnetic iron specimen when heated past its Curie Temperature (Tc ≈ 1043 K)?',
    options: [
      'It undergoes a phase transition and becomes paramagnetic, obeying χ = C/(T - Tc)',
      'It becomes strongly diamagnetic and repels all magnetic fields',
      'It converts permanently into a superconductor with zero resistance',
      'Its magnetic susceptibility becomes negative and infinite'
    ],
    correctIndex: 0,
    explanation: 'Above the Curie temperature Tc, intense thermal agitation completely destroys the spontaneous domain alignment. The material transitions from ferromagnetic to paramagnetic.',
    hints: [
      'Thermal energy randomises aligned magnetic domains.',
      'Does it turn diamagnetic or paramagnetic?',
      'The atomic dipoles still exist but lose their collective domain coupling.'
    ],
    misconceptionIndex: 1
  },
  // 12. Standard - Match pairs (c12_phy_052, 053, 054)
  {
    id: 'ch_12',
    nodeId: NODE_C12_PHY_054,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Match each magnetic substance category to its characteristic susceptibility (χ) and relative permeability (μ_r).',
    dragItems: [
      { label: 'Diamagnetic: χ < 0 (small), μ_r < 1', targetId: 'box_dia' },
      { label: 'Paramagnetic: χ > 0 (small), μ_r > 1', targetId: 'box_para' },
      { label: 'Ferromagnetic: χ >> 1 (10³–10⁵), μ_r >> 1', targetId: 'box_ferro' },
      { label: 'Vacuum: χ = 0, μ_r = 1', targetId: 'box_vac' },
    ],
    correctMapping: {
      box_dia: 'Diamagnetic: χ < 0 (small), μ_r < 1',
      box_para: 'Paramagnetic: χ > 0 (small), μ_r > 1',
      box_ferro: 'Ferromagnetic: χ >> 1 (10³–10⁵), μ_r >> 1',
      box_vac: 'Vacuum: χ = 0, μ_r = 1',
    },
    explanation: 'Diamagnets: χ ≈ -10⁻⁵, μ_r = 1 + χ < 1. Paramagnets: χ ≈ +10⁻⁴, μ_r > 1. Ferromagnets: χ ≈ 10³–10⁵, μ_r >> 1. Vacuum: χ = 0, μ_r = 1.',
    hints: [
      'Remember: μ_r = 1 + χ.',
      'Negative χ means μ_r is slightly less than 1.',
      'Ferromagnets have enormous positive susceptibility due to domain alignment.'
    ],
    misconceptionIndex: 1
  },
  // 13. Advanced - Application & Numeric (c12_phy_060)
  {
    id: 'ch_13',
    nodeId: NODE_C12_PHY_060,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A conducting rod of length 0.5 m slides at v = 6 m/s on frictionless rails across a 0.4 T magnetic field. If the closed loop has a total resistance R = 3 Ω, what is the mechanical power (in Watts) required to keep the rod moving at constant speed?',
    correctAnswer: 0.48,
    tolerance: 0.02,
    unit: 'W',
    explanation: 'ε = B l v = 0.4 × 0.5 × 6 = 1.2 V. Power P = ε² / R = (1.2)² / 3 = 1.44 / 3 = 0.48 W. By conservation of energy, P_mech = P_electrical.',
    hints: [
      'First calculate the motional EMF: ε = B l v.',
      'ε = 0.4 × 0.5 × 6 = 1.2 V.',
      'Power dissipated is P = ε² / R = (1.2)² / 3.'
    ],
    misconceptionIndex: 2
  },
  // 14. Advanced - Evaluation / Competency (c12_phy_058)
  {
    id: 'ch_14',
    nodeId: NODE_C12_PHY_058,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'If Lenz’s law had a positive sign (ε = +dΦ/dt) instead of negative, what catastrophic violation of physical law would occur?',
    options: [
      'Perpetual self-acceleration creating infinite kinetic & electrical energy from zero work input (violates Conservation of Energy)',
      'Total annihilation of electric charge violating conservation of charge',
      'Speed of light would become zero in all mediums',
      'Gravitational constant would instantly reverse sign'
    ],
    correctIndex: 0,
    explanation: 'If ε = +dΦ/dt, an approaching magnet would induce an attractive pole pulling it in faster, causing further flux increase and runaway acceleration without external work — generating infinite energy from nothing.',
    hints: [
      'Consider what happens if the induced pole attracts an approaching magnet.',
      'The magnet would accelerate on its own, inducing even more current.',
      'This runaway cycle violates the First Law of Thermodynamics (Conservation of Energy).'
    ],
    misconceptionIndex: 2
  },
  // 15. Standard - Application (c12_phy_057)
  {
    id: 'ch_15',
    nodeId: NODE_C12_PHY_057,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A search coil with N = 200 turns and area A = 0.01 m² is pulled completely out of a uniform field of B = 1.5 T to zero field in Δt = 0.05 s. What is the average magnitude of induced EMF (in Volts)?',
    correctAnswer: 6,
    tolerance: 0.1,
    unit: 'V',
    explanation: '|ε| = N · (ΔΦ / Δt) = N · (B · A / Δt) = 200 × (1.5 × 0.01) / 0.05 = 200 × 0.015 / 0.05 = 3.0 / 0.05 = 6.0 V.',
    hints: [
      'Initial flux per turn Φ_i = B · A = 1.5 × 0.01 = 0.015 Wb.',
      'ΔΦ = 0.015 Wb across Δt = 0.05 s.',
      'Multiply the single turn EMF (0.3 V) by N = 200 turns.'
    ],
    misconceptionIndex: 2
  },
  // 16. Foundation - Recall (c12_phy_059)
  {
    id: 'ch_16',
    nodeId: NODE_C12_PHY_059,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following technological devices relies on MAXIMISING eddy currents rather than minimising them?',
    options: [
      'Induction melting furnace and dead-beat galvanometer damping',
      'Step-up AC power transformer core',
      'High-efficiency DC electric motor armature',
      'Audio frequency transmission line cables'
    ],
    correctIndex: 0,
    explanation: 'Induction furnaces deliberately generate huge eddy currents to melt scrap metals rapidly via Joule heating (I²R), while dead-beat galvanometers use eddy current damping in their aluminium frames to halt oscillations instantly.',
    hints: [
      'Where do we want strong heating or electromagnetic braking from circulating currents?',
      'Transformers and motors seek to minimise eddy currents by lamination.',
      'Industrial metal melting uses high-frequency AC to heat bulk conductors.'
    ],
    misconceptionIndex: 2
  },
  // 17. Advanced - Competency Analysis (c12_phy_055)
  {
    id: 'ch_17',
    nodeId: NODE_C12_PHY_055,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A student claims: "Because Alnico has higher retentivity than steel, it is also ideal for making an electromagnet core." Evaluate this claim.',
    options: [
      'Incorrect: Alnico has high coercive force, making it difficult to demagnetise on demand, making it ideal for permanent magnets but terrible for electromagnets',
      'Correct: High retentivity is the only property required for any magnetic device',
      'Incorrect: Alnico is a diamagnetic gas and cannot hold flux',
      'Correct: Alnico demagnetises instantly when current ceases'
    ],
    correctIndex: 0,
    explanation: 'An electromagnet core MUST demagnetise immediately when current is cut off — requiring LOW coercivity (like soft iron). Alnico has HIGH coercivity, locking in magnetism permanently, making it great for permanent magnets but completely unsuitable for electromagnets.',
    hints: [
      'What must happen to an electromagnet when the power switch is opened?',
      'Can a crane release scrap iron if the core remains permanently magnetised?',
      'High coercivity resists demagnetisation.'
    ],
    misconceptionIndex: 0
  },
  // 18. Advanced - Creativity / Design (c12_phy_060)
  {
    id: 'ch_18',
    nodeId: NODE_C12_PHY_060,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Assemble the 4-step chain explaining Motional EMF via microscopic Lorentz force equilibrium.',
    availableParts: [
      'Magnetic force F_m = q(v × B) drives electrons to one end',
      'Charge separation builds internal electric field E',
      'Electrostatic force qE opposes magnetic force qvB',
      'Equilibrium reached when E = vB, yielding potential ε = E · l = B l v'
    ],
    targetState: 'Magnetic force F_m = q(v × B) drives electrons to one end Charge separation builds internal electric field E Electrostatic force qE opposes magnetic force qvB Equilibrium reached when E = vB, yielding potential ε = E · l = B l v',
    validationHint: 'Follow the cause-and-effect chain from Lorentz force to charge buildup, electric field balance, and final EMF.',
    explanation: 'As a conductor moves through B, Lorentz force q(v × B) drifts free electrons. The resulting charge separation creates an opposing electric field E until qE = qvB (E = vB). The potential difference is ε = E · l = Blv.',
    hints: [
      'Step 1: Electrons feel Lorentz force F_m = q(v × B).',
      'Step 2: Charge accumulates at the ends creating field E.',
      'Step 3: Force balance qE = qvB.',
      'Step 4: Voltage is field times length: ε = Blv.'
    ],
    misconceptionIndex: 0
  },
  // 19. Standard - Application (c12_phy_056)
  {
    id: 'ch_19',
    nodeId: NODE_C12_PHY_056,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A flat circular coil is rotated at constant angular speed in a uniform magnetic field. At which orientation is the magnetic flux maximum, and when is the induced EMF maximum?',
    options: [
      'Flux is max when coil plane is perpendicular to B (θ = 0°); Induced EMF is max when coil plane is parallel to B (θ = 90°)',
      'Both Flux and induced EMF peak simultaneously when coil plane is perpendicular to B',
      'Flux is max when parallel; EMF is max when perpendicular',
      'Both Flux and EMF remain constant throughout rotation'
    ],
    correctIndex: 0,
    explanation: 'Magnetic flux is Φ = B A cos(ωt). Induced EMF is ε = -dΦ/dt = B A ω sin(ωt). When flux is maximum (cos = 1, θ = 0°), its rate of change is zero (EMF = 0). When flux is zero (cos = 0, θ = 90°), flux changes fastest (EMF is maximum).',
    hints: [
      'Recall that EMF is the time derivative of flux: ε = -dΦ/dt.',
      'The derivative of cosine is negative sine.',
      'When a function is at its peak (flat slope), its derivative is zero.'
    ],
    misconceptionIndex: 1
  },
  // 20. Advanced - Application (c12_phy_051)
  {
    id: 'ch_20',
    nodeId: NODE_C12_PHY_051,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A short bar magnet of magnetic moment M = 2.0 A·m² produces an axial (end-on) magnetic field B_axial = 4.0 × 10⁻⁴ T at distance r. What is the equatorial (broadside-on) field B_equatorial at the exact same distance r in microteslas (μT)?',
    correctAnswer: 200,
    tolerance: 5,
    unit: 'μT',
    explanation: 'For a short dipole at equal distance r: B_equatorial = (1/2) · B_axial = 0.5 × (4.0 × 10⁻⁴ T) = 2.0 × 10⁻⁴ T = 200 μT.',
    hints: [
      'Recall the ratio B_axial / B_equatorial for a dipole at distance r.',
      'B_axial = 2 · B_equatorial.',
      'Divide 4.0 × 10⁻⁴ T by 2 = 2.0 × 10⁻⁴ T = 200 μT.'
    ],
    misconceptionIndex: 1
  },
  // 21. Advanced - Evaluation (c12_phy_057)
  {
    id: 'ch_21',
    nodeId: NODE_C12_PHY_057,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A superconducting closed ring is placed in a magnetic field. When the external field is increased, what happens to the total magnetic flux threading the ring?',
    options: [
      'The total flux remains perfectly constant because induced lossless supercurrents generate an opposing field that exactly cancels any flux change',
      'The total flux instantly doubles due to zero electrical resistance',
      'The superconductor explodes due to infinite magnetic flux accumulation',
      'The supercurrent immediately drops to zero after 1 millisecond'
    ],
    correctIndex: 0,
    explanation: 'In a zero-resistance superconductor, ε = I · R = 0. Since ε = -dΦ_total/dt = 0, the total flux linked with a superconducting circuit is strictly conserved (Flux Freezing Theorem). Induced persistent currents completely cancel any external change.',
    hints: [
      'What is the electrical resistance R of a superconductor?',
      'Since V = IR and R = 0, the total voltage around the loop is zero.',
      'If ε = -dΦ/dt = 0, what does that say about Φ(t)?'
    ],
    misconceptionIndex: 0
  },
  // 22. Standard - Drag-sort (c12_phy_059)
  {
    id: 'ch_22',
    nodeId: NODE_C12_PHY_059,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Order the engineering steps to design an ultra-efficient laminated transformer core for Indian 50 Hz power grids.',
    sortItems: [
      'Select high-permeability soft iron or silicon steel to minimise hysteresis loss',
      'Slice the solid core into thin sheets (laminae) parallel to magnetic flux lines',
      'Coat each lamina with an insulating varnish or oxide film',
      'Clamp laminae tightly into a composite core, forcing eddy currents into high-resistance micro-loops',
      'Wind primary and secondary coils around the core with high coupling'
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'High-μ silicon steel reduces hysteresis area. Slicing and varnishing breaks transverse conductive planes, forcing eddy currents into tiny paths of high electrical resistance, slashing I²R core heat.',
    hints: [
      'Start with material selection (silicon steel).',
      'Proceed with geometric slicing parallel to flux.',
      'Insulate the sheets with varnish.',
      'Assemble and clamp the stack.'
    ],
    misconceptionIndex: 1
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

// ─── DEFAULT PROPS ───
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C12_PHY_051,
  title: 'Electromagnetic Field Lines, Materials & Induction Suite',
  definition: 'Magnetic field lines form continuous closed loops without monopoles. Magnetic materials classify into Diamagnetic (χ < 0), Paramagnetic (χ > 0 small), and Ferromagnetic (χ >> 1). Faraday’s and Lenz’s laws dictate that changing magnetic flux generates an opposing EMF (ε = -N dΦ/dt), driving eddy currents and motional EMF (ε = Blv).',
  eli5: 'Think of magnetic lines like continuous endless racetracks without starting or ending gates. Magnets push shy materials (diamagnets), gently pull curious ones (paramagnets), and snap hard onto friendly ones (ferromagnets). When magnets move near metal loops, nature fights the movement by generating opposing electric whirlpools!',
  misconceptions: [
    {
      misconception: 'Magnetic field lines start at North and terminate at South poles.',
      correction: 'Field lines form continuous closed loops; outside they run N to S, but inside they continue from S to N because monopoles do not exist.'
    },
    {
      misconception: 'Diamagnetic substances are strongly repelled and possess a Curie temperature.',
      correction: 'Diamagnetic repulsion is extremely weak (χ ≈ -10⁻⁵) and independent of temperature; Curie temperature applies solely to ferromagnetic phase transitions.'
    },
    {
      misconception: 'A large static magnetic field inside a coil produces a continuous induced current.',
      correction: 'Faraday’s law requires a changing flux (dΦ/dt ≠ 0). A static 100 Tesla field induces zero EMF because no flux change occurs.'
    },
    {
      misconception: 'Lenz’s law opposes the magnetic field itself rather than the CHANGE in flux.',
      correction: 'Induced currents oppose the change in flux (dΦ/dt). If flux is decreasing, induced currents produce magnetic fields in the same direction to support it.'
    },
    {
      misconception: 'Laminating a transformer core reduces the total magnetic flux.',
      correction: 'Lamination leaves magnetic flux unchanged along the core length while breaking transverse electrical paths to suppress eddy currents.'
    }
  ],
  diagnosticQuestions: [
    { question: 'What is the divergence of the magnetic field vector (∇ · B) according to Gauss’s law for magnetism?', options: ['Zero (no magnetic monopoles)', 'Equal to magnetic charge density', 'Proportional to current density', 'Infinite at the pole tips'], correctIndex: 0 },
    { question: 'Which substance is strongly diamagnetic at room temperature?', options: ['Bismuth', 'Soft Iron', 'Aluminium', 'Nickel'], correctIndex: 0 },
    { question: 'What is the relative permeability of a superconductor in the Meissner state?', options: ['μ_r = 0 (perfect diamagnetism, χ = -1)', 'μ_r = 1000', 'μ_r = 1.0003', 'μ_r = infinity'], correctIndex: 0 },
    { question: 'Curie’s Law states that paramagnetic susceptibility χ varies with absolute temperature T as:', options: ['χ ∝ 1/T', 'χ ∝ T²', 'χ ∝ e^(T)', 'χ is independent of T'], correctIndex: 0 },
    { question: 'What is the SI unit of magnetic flux linkage NΦ?', options: ['Weber (Wb) or Volt-second (V·s)', 'Tesla (T)', 'Henry (H)', 'Ampere per metre (A/m)'], correctIndex: 0 },
    { question: 'The area enclosed by a material’s B-H hysteresis loop directly represents:', options: ['Energy loss per unit volume per magnetization cycle', 'Mechanical tensile strength', 'Electrical resistance of the wire', 'Resonant frequency of the coil'], correctIndex: 0 },
    { question: 'What rule gives the direction of induced current for a conductor moving across a field (motional EMF)?', options: ['Fleming’s Right-Hand Rule', 'Fleming’s Left-Hand Rule', 'Maxwell’s Corkscrew Rule', 'Biot-Savart Right-Hand Palm Rule'], correctIndex: 0 },
    { question: 'If the velocity of a sliding conductor in a uniform field is doubled, the power dissipated in the circuit:', options: ['Quadruples (P ∝ v²)', 'Doubles (P ∝ v)', 'Remains unchanged', 'Halves'], correctIndex: 0 }
  ],
  masteryCriteria: 'Mastery is achieved when the student understands magnetic field line geometry, material classifications (Dia/Para/Ferro), flux calculations, Faraday-Lenz induction, and motional EMF mechanics.',
};

// ─── EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Dipole Field Lines & Axial vs Equatorial Fields',
    instruction: 'Drag the field test probe along the axial and equatorial axes. Observe how the field strength and vector directions change in real time.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_PHY_051,
  },
  {
    title: 'Magnetic Material Classifier & Temperature Oven',
    instruction: 'Place Bismuth, Aluminium, and Iron between strong magnetic poles. Heat the furnace above 1043 K to witness the Curie phase transition.',
    interactionType: 'click-parts',
    nodeId: NODE_C12_PHY_054,
  },
  {
    title: 'Magnetic Flux & Angular Orientation Lab',
    instruction: 'Rotate the search coil angle (θ) and adjust the magnetic field strength (B). Watch the live dot product calculation Φ = B A cos(θ).',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_PHY_056,
  },
  {
    title: 'Faraday-Lenz Coil & Falling Magnet Induction',
    instruction: 'Move the bar magnet velocity slider through the coil. Observe the induced EMF spike and opposing Lenz magnetic polarity.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_PHY_058,
  },
  {
    title: 'Motional EMF Rail & Eddy Current Retarder',
    instruction: 'Slide the conducting rod across the U-rails. Toggle between solid plate and slotted plate to compare electromagnetic braking force.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_PHY_060,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you double the speed (v → 2v) of a sliding rod across magnetic rails, what happens to the required mechanical driving power?',
    options: ['Power doubles (2×)', 'Power quadruples (4×)', 'Power stays constant', 'Power drops to half (0.5×)'],
    correctIndex: 1,
    verifyInstruction: 'Drag the rail velocity slider from 2 m/s to 4 m/s and inspect the live mechanical power readout below!',
    nodeId: NODE_C12_PHY_060,
  },
  {
    question: 'Predict: If you heat a strongly magnetic soft iron nail past 800°C (1073 K) with a blowtorch, what will happen to its magnetic attraction?',
    options: ['It becomes 10× stronger magnet', 'It permanently loses strong attraction and becomes weakly paramagnetic', 'It becomes a superconductor', 'It explodes with blue light'],
    correctIndex: 1,
    verifyInstruction: 'Use the Material Lab temperature slider to heat Iron past 1043 K (Curie point) and observe the domain alignment gauge collapse!',
    nodeId: NODE_C12_PHY_054,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice about the axial (end-on) field strength compared to the equatorial (broadside-on) field at the same radius r in the simulation?',
    observableOptions: [
      'Axial field is exactly twice the equatorial field (B_axial = 2 × B_equatorial)',
      'Equatorial field is twice the axial field',
      'Both fields are exactly equal at all distances',
      'Axial field points perpendicular to the magnet dipole axis'
    ],
    correctIndex: 0,
    nodeId: NODE_C12_PHY_051,
  },
  {
    question: 'When the coil angle θ reaches 90° (plane of coil parallel to B lines), what does the flux meter show?',
    observableOptions: [
      'Maximum flux (Φ = BA)',
      'Zero flux (Φ = 0 Wb) because field lines graze the surface without piercing it',
      'Negative infinite flux',
      'Fluctuating random flux'
    ],
    correctIndex: 1,
    nodeId: NODE_C12_PHY_056,
  },
];

// ─── REAL-WORLD CAPSTONE ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Vande Bharat High-Speed Eddy Braking Deployment',
  description: 'Apply the physics of motional EMF and eddy currents to calculate braking deceleration for a 400-tonne Vande Bharat rake travelling at 160 km/h (44.4 m/s) using trackside electromagnets.',
  steps: [
    'Measure initial kinetic energy: E_k = 1/2 · m · v² ≈ 394 MegaJoules',
    'Energise trackside electromagnets to create a 0.8 Tesla transverse magnetic field across the copper track brake shoes',
    'Calculate initial motional EMF in each 0.6 m wide braking shoe: ε = Blv ≈ 21.3 Volts',
    'Calculate eddy current retarding drag force F = (B² l² v) / R to safely stop the rake without friction wear or wheel lockup'
  ],
};

const REVIEW_INTERVAL_DAYS = [1, 3, 7, 14, 30, 90];

// ─── MAIN SIMULATION COMPONENT ───
export default function C12_PhysicsMagneticFieldLinesSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C12_PHY_051,
  title = DEFAULT_PROPS.title || 'Electromagnetic Induction & Materials',
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['physics'] || { name: 'Physics', emoji: '⚡', color: 'indigo' };

  // Phase flow: discovery → explore → sandbox → challenge → complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Discovery State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Predict & Observe State
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Interactive Exploration & Sandbox Sliders
  const [probeDistance, setProbeDistance] = useState(10); // cm
  const [probeAxis, setProbeAxis] = useState<'axial' | 'equatorial'>('axial');
  const [selectedMaterial, setSelectedMaterial] = useState<'bismuth' | 'aluminium' | 'iron'>('iron');
  const [materialTemp, setMaterialTemp] = useState(300); // Kelvin (300 to 1200 K)
  const [coilAngleDeg, setCoilAngleDeg] = useState(0); // 0 to 90 deg
  const [magFieldB, setMagFieldB] = useState(0.5); // Tesla (0.1 to 2.0 T)
  const [magnetVelocity, setMagnetVelocity] = useState(0); // -10 to +10 m/s
  const [coilTurnsN, setCoilTurnsN] = useState(100);
  const [railVelocity, setRailVelocity] = useState(2.0); // m/s (0 to 10 m/s)
  const [railResistance, setRailResistance] = useState(2.0); // Ohms (0.5 to 10 Ohms)
  const [railLength, setRailLength] = useState(0.5); // Metres
  const [isSlottedPlate, setIsSlottedPlate] = useState(false);

  // Challenge and Adaptive State
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  // Feedback & Animation State
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Drag & Sort & Input State
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // BKT Ref & Inactivity Timer Ref
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Filter challenges according to BKT difficulty
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const activeChallenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // Motivational message helper
  const motivationalMessage = useMemo(() => {
    if (errors === 0) return 'PERFECT SCORE!';
    if (errors <= 3) return 'Great work!';
    if (errors <= 7) return 'Good effort!';
    return 'Do not give up — You WILL get this!';
  }, [errors]);

  // ─── MOUNT MASTERY LOAD ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── ADAPT DIFFICULTY ON BKT CHANGES ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDiff = (mastery === 'not-started' || mastery === 'beginner')
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

  // ─── 2D CANVAS ANIMATION (Field Lines & Induction Eddy Whirlpools) ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId: number;
    let frame = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw background magnetic flux gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#090d16');
      gradient.addColorStop(1, '#0f172a');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw dynamic flux lines
      ctx.lineWidth = 1.5;
      for (let i = 0; i < 6; i++) {
        const yOffset = 30 + i * 28;
        const wave = Math.sin((frame * 0.04) + i) * 6;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(99, 102, 241, ${0.2 + (i % 3) * 0.25})`;
        ctx.moveTo(10, yOffset + wave);
        ctx.bezierCurveTo(canvas.width * 0.35, yOffset - 15 + wave, canvas.width * 0.65, yOffset + 15 + wave, canvas.width - 10, yOffset + wave);
        ctx.stroke();

        // Arrow heads moving across
        const arrowX = (frame * 2 + i * 60) % (canvas.width - 40) + 20;
        ctx.fillStyle = '#818cf8';
        ctx.beginPath();
        ctx.arc(arrowX, yOffset + wave, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw active mode text
      ctx.fillStyle = '#cbd5e1';
      ctx.font = 'bold 11px system-ui';
      ctx.fillText(`⚡ SIMULATION ENGINE: B = ${(magFieldB).toFixed(2)} T | v = ${railVelocity.toFixed(1)} m/s`, 12, 18);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [magFieldB, railVelocity]);

  // ─── MEMOISED EVENT HANDLERS (useCallback) ───
  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Excellent physical intuition! Changing flux induces opposing eddy currents.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Let us explore the core principles of magnetic field lines, flux, and induction.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Enter the free exploration sandbox. Manipulate magnetic fields and velocity sliders freely!');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Prepare for competency and board-level challenges. Good luck!');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now test the interactive controls to check.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Spot on observation!' : 'Look closer at the numerical readouts on the meter.');
  }, []);

  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && activeChallenge.hints && activeChallenge.hints[nextLevel - 1]) {
      const hintMsg = activeChallenge.hints[nextLevel - 1];
      setCurrentHint(hintMsg);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(hintMsg);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
      speechManager.speak('Let us inspect the step-by-step physical solution.');
    }
  }, [hintCount, activeChallenge]);

  const handleCompleteSimulation = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak(`Congratulations! You completed the electromagnetic suite with a score of ${finalScore} percent.`);
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
      handleCompleteSimulation();
    } else {
      setCurrentChallenge(c => c + 1);
      audioManager.play('whoosh');
    }
  }, [currentChallenge, filteredChallenges.length, handleCompleteSimulation]);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    const isCorrect = activeChallenge.correctMapping?.[targetId] === draggedItem;
    if (isCorrect) {
      setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
      audioManager.play('drop-correct');
    } else {
      audioManager.play('drop-wrong');
      setWrongShake(true);
      setTimeout(() => setWrongShake(false), 500);
    }
    setDraggedItem(null);
  }, [draggedItem, activeChallenge]);

  const handleSortMove = useCallback((fromIdx: number, toIdx: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      const base = prev.length === activeChallenge.sortItems?.length ? [...prev] : (activeChallenge.sortItems?.map((_, i) => i) || []);
      const [moved] = base.splice(fromIdx, 1);
      base.splice(toIdx, 0, moved);
      return base;
    });
  }, [activeChallenge]);

  const handleAnswer = useCallback((ans: number | Record<string, string> | number[] | string) => {
    let isCorrect = false;

    if (activeChallenge.type === 'classify' || activeChallenge.type === 'distinguish' || activeChallenge.type === 'match') {
      isCorrect = ans === activeChallenge.correctIndex;
    } else if (activeChallenge.type === 'drag-label') {
      isCorrect = JSON.stringify(ans) === JSON.stringify(activeChallenge.correctMapping);
    } else if (activeChallenge.type === 'drag-sort') {
      isCorrect = JSON.stringify(ans) === JSON.stringify(activeChallenge.correctOrder);
    } else if (activeChallenge.type === 'numeric') {
      const numVal = typeof ans === 'string' ? parseFloat(ans) : (ans as number);
      isCorrect = Math.abs(numVal - (activeChallenge.correctAnswer || 0)) <= (activeChallenge.tolerance || 0.05);
    } else if (activeChallenge.type === 'construct') {
      isCorrect = (ans as string).trim() === (activeChallenge.targetState || '').trim();
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('success');
      audioManager.play('sparkle');
      speechManager.speak('Correct! Outstanding scientific reasoning.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3500);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(`srs_${activeChallenge.nodeId}`, JSON.stringify(updatedSrs));
        localStorage.setItem(`mastery_${activeChallenge.nodeId}`, JSON.stringify(bktStateRef.current));
      }
    } else {
      audioManager.play('error');
      setErrors(e => e + 1);
      setWrongShake(true);
      setWrongFlash(true);
      setTimeout(() => setWrongShake(false), 500);
      setTimeout(() => setWrongFlash(false), 800);

      if (activeChallenge.misconceptionIndex !== undefined && !hitMisconceptions.includes(activeChallenge.misconceptionIndex)) {
        setHitMisconceptions(prev => [...prev, activeChallenge.misconceptionIndex!]);
      }

      if (hintCount < 3) {
        showNextHint();
      } else {
        setAnswerRevealed(true);
        setShowExplanation(true);
        speechManager.speak('Hints exhausted. Review the detailed solution.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);
        const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`srs_${activeChallenge.nodeId}`, JSON.stringify(updatedSrs));
        }
      }
    }
  }, [activeChallenge, hintCount, showNextHint, hitMisconceptions]);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  // Handle user interaction tracking for timer reset
  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [resetInactivityTimer]);

  // Derived physics calculations
  const calculatedDipoleField = useMemo(() => {
    const rMetres = probeDistance / 100;
    const mDipole = 1.0; // A m^2
    const mu0_4pi = 1e-7;
    if (probeAxis === 'axial') {
      return (mu0_4pi * 2 * mDipole) / Math.pow(rMetres, 3); // Tesla
    } else {
      return (mu0_4pi * mDipole) / Math.pow(rMetres, 3); // Tesla
    }
  }, [probeDistance, probeAxis]);

  const calculatedMagneticFlux = useMemo(() => {
    const area = 0.05; // m^2
    const thetaRad = (coilAngleDeg * Math.PI) / 180;
    return magFieldB * area * Math.cos(thetaRad); // Wb
  }, [coilAngleDeg, magFieldB]);

  const calculatedFaradayEMF = useMemo(() => {
    // Induced EMF = N * B * A * (v / coil_length)
    const area = 0.02; // m^2
    return -coilTurnsN * magFieldB * area * (magnetVelocity / 0.1); // Volts
  }, [coilTurnsN, magFieldB, magnetVelocity]);

  const calculatedMotionalEMF = useMemo(() => {
    return magFieldB * railLength * railVelocity; // Volts
  }, [magFieldB, railLength, railVelocity]);

  const calculatedRailPower = useMemo(() => {
    const current = calculatedMotionalEMF / railResistance;
    return Math.pow(calculatedMotionalEMF, 2) / railResistance; // Watts
  }, [calculatedMotionalEMF, railResistance]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800"
      >
        <div className="flex items-center gap-3">
          <motion.div 
            whileHover={{ rotate: 15, scale: 1.1 }}
            className="w-12 h-12 rounded-2xl bg-gold-600/20 border border-gold-500/30 flex items-center justify-center text-2xl shadow-inner"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-gold-400 bg-gold-950/60 px-2.5 py-0.5 rounded-full border border-gold-800/60">
                ISC Class 12 Physics (Science)
              </span>
              <span className="text-xs text-slate-400">NEP 2020 Competency Aligned</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">{title}</h1>
          </div>
        </div>

        {/* Phase / Difficulty Pill */}
        <div className="flex items-center gap-3">
          {phase === 'challenge' && (
            <motion.span
              key={difficulty}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider border shadow-sm ${
                difficulty === 'foundation'
                  ? 'bg-emerald-950/80 text-emerald-300 border-emerald-700'
                  : difficulty === 'advanced'
                  ? 'bg-rose-950/80 text-rose-300 border-rose-700'
                  : 'bg-gold-950/80 text-gold-300 border-gold-700'
              }`}
            >
              Tier: {difficulty}
            </motion.span>
          )}
          <div className="text-right">
            <span className="text-xs text-slate-400 block">Mastery Score</span>
            <span className="text-sm font-extrabold text-amber-400">{Math.max(0, 100 - errors * 5)}%</span>
          </div>
        </div>
      </motion.header>

      {/* ─── PHASE 1: NARRATIVE & DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="mt-6 space-y-6"
        >
          {/* Mission Scenario Banner */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-gold-950/60 via-slate-900 to-slate-900 border border-gold-800/50 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />
            <h2 className="text-lg font-bold text-gold-300 flex items-center gap-2">
              <span>🚅</span> {SCENARIO.title}
            </h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <div className="mt-4 p-3 bg-slate-950/70 rounded-xl border border-slate-800 text-xs text-gold-200">
              <strong>Operational Goal:</strong> {SCENARIO.context}
            </div>
          </div>

          {/* Curiosity Discovery Question */}
          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-amber-400 text-sm font-semibold">
              <span>🤔</span> Discovery Challenge: Predict the Phenomenon
            </div>
            <p className="text-white font-medium text-base">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  aria-label={`Select option ${i + 1}: ${opt}`}
                  className={`p-4 text-left rounded-xl text-sm font-medium transition-all border ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-lg shadow-emerald-950/40'
                      : discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-900 border-slate-800 text-slate-500 opacity-60'
                      : 'bg-slate-800/80 hover:bg-slate-750 border-slate-700 text-slate-200 hover:border-gold-500'
                  }`}
                >
                  <span className="font-bold mr-2 text-gold-400">{String.fromCharCode(65 + i)}.</span> {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3"
              >
                <p className={`text-sm leading-relaxed ${discoveryCorrect ? 'text-emerald-300 font-semibold' : 'text-amber-300'}`}>
                  {discoveryCorrect ? '✓ Spot on! ' : '💡 Key Insight: '}
                  {DISCOVERY_QUESTION.hintAfter}
                </p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAdvanceToExploration}
                  aria-label="Proceed to interactive exploration lab"
                  className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-gold-600/30 flex items-center gap-2"
                >
                  Launch Interactive Physics Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: GUIDED INTERACTIVE EXPLORATION (BRILLIANT-STYLE) ─── */}
      {phase === 'explore' && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 space-y-6"
        >
          {/* Top Step Navigator */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-900 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              {EXPLORATION_STEPS.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                    currentSlide === idx
                      ? 'bg-gold-600 text-white shadow-md'
                      : 'bg-slate-800 text-slate-400 hover:bg-slate-750'
                  }`}
                >
                  {idx + 1}. {step.title.split(' ')[0]}
                </button>
              ))}
            </div>
            <span className="text-xs font-semibold text-slate-400">
              Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-6"
            >
              <div>
                <h3 className="text-lg font-bold text-gold-300 flex items-center gap-2">
                  <span>🔬</span> {EXPLORATION_STEPS[currentSlide].title}
                </h3>
                <p className="text-xs sm:text-sm text-amber-300 mt-1 font-medium">
                  👉 {EXPLORATION_STEPS[currentSlide].instruction}
                </p>
              </div>

              {/* ─── EXPLORATION LAB 0: DIPOLE FIELD LINES & AXIAL VS EQUATORIAL ─── */}
              {currentSlide === 0 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* SVG Visualization */}
                    <div className="lg:col-span-7 bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col items-center justify-center relative min-h-[260px]">
                      <svg viewBox="0 0 500 300" className="w-full h-auto">
                        {/* Magnetic Field Line Loops */}
                        <path d="M 290 150 C 370 70, 130 70, 210 150" fill="none" stroke="#6366f1" strokeWidth="2" strokeDasharray="4 2" />
                        <path d="M 290 150 C 430 20, 70 20, 210 150" fill="none" stroke="#6366f1" strokeWidth="1.5" strokeOpacity="0.7" />
                        <path d="M 290 150 C 370 230, 130 230, 210 150" fill="none" stroke="#6366f1" strokeWidth="2" strokeDasharray="4 2" />
                        <path d="M 290 150 C 430 280, 70 280, 210 150" fill="none" stroke="#6366f1" strokeWidth="1.5" strokeOpacity="0.7" />

                        {/* Arrows indicating N->S outside and S->N inside */}
                        <polygon points="250,90 245,95 255,95" fill="#818cf8" />
                        <polygon points="250,210 245,205 255,205" fill="#818cf8" />
                        <line x1="210" y1="150" x2="290" y2="150" stroke="#38bdf8" strokeWidth="3" markerEnd="url(#arrow)" />

                        {/* Bar Magnet */}
                        <g>
                          {/* South Pole (Blue) */}
                          <rect x="210" y="135" width="40" height="30" rx="4" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="2" />
                          <text x="230" y="154" fill="white" fontSize="13" fontWeight="bold" textAnchor="middle">S</text>
                          {/* North Pole (Red) */}
                          <rect x="250" y="135" width="40" height="30" rx="4" fill="#991b1b" stroke="#ef4444" strokeWidth="2" />
                          <text x="270" y="154" fill="white" fontSize="13" fontWeight="bold" textAnchor="middle">N</text>
                        </g>

                        {/* Probe Position */}
                        {probeAxis === 'axial' ? (
                          <g>
                            <circle cx={250 + probeDistance * 15} cy="150" r="10" fill="#f59e0b" stroke="white" strokeWidth="2" />
                            <text x={250 + probeDistance * 15} y="132" fill="#f59e0b" fontSize="10" fontWeight="bold" textAnchor="middle">Probe (Axial)</text>
                            <line x1={250 + probeDistance * 15} y1="150" x2={250 + probeDistance * 15 + 25} y2="150" stroke="#f59e0b" strokeWidth="2.5" />
                          </g>
                        ) : (
                          <g>
                            <circle cx="250" cy={150 - probeDistance * 10} r="10" fill="#f59e0b" stroke="white" strokeWidth="2" />
                            <text x="250" y={150 - probeDistance * 10 - 14} fill="#f59e0b" fontSize="10" fontWeight="bold" textAnchor="middle">Probe (Equatorial)</text>
                            <line x1="250" y1={150 - probeDistance * 10} x2="215" y2={150 - probeDistance * 10} stroke="#f59e0b" strokeWidth="2.5" />
                          </g>
                        )}
                      </svg>
                    </div>

                    {/* Controls & Math Output */}
                    <div className="lg:col-span-5 bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setProbeAxis('axial')}
                          className={`flex-1 py-2 text-xs font-bold rounded-xl border ${
                            probeAxis === 'axial'
                              ? 'bg-gold-600 border-gold-500 text-white'
                              : 'bg-slate-800 border-slate-700 text-slate-300'
                          }`}
                        >
                          End-On (Axial) Axis
                        </button>
                        <button
                          onClick={() => setProbeAxis('equatorial')}
                          className={`flex-1 py-2 text-xs font-bold rounded-xl border ${
                            probeAxis === 'equatorial'
                              ? 'bg-gold-600 border-gold-500 text-white'
                              : 'bg-slate-800 border-slate-700 text-slate-300'
                          }`}
                        >
                          Broadside (Equatorial)
                        </button>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>Probe Distance (r):</span>
                          <span className="font-bold text-amber-400">{probeDistance} cm</span>
                        </div>
                        <input
                          type="range"
                          min={5}
                          max={15}
                          value={probeDistance}
                          onChange={(e) => setProbeDistance(Number(e.target.value))}
                          className="w-full accent-gold-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                        />
                      </div>

                      <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                        <span className="text-xs text-slate-400 font-semibold block uppercase">Real-Time Field Readout</span>
                        <div className="text-xl font-extrabold text-white">
                          B = {(calculatedDipoleField * 1e6).toFixed(1)} <span className="text-sm font-normal text-slate-400">μT (microteslas)</span>
                        </div>
                        <div className="text-xs text-gold-300 font-mono">
                          {probeAxis === 'axial'
                            ? 'B_end = (μ₀/4π) · (2m / r³) [Along dipole moment]'
                            : 'B_broad = (μ₀/4π) · (m / r³) [Opposite to dipole moment]'}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Observation hook */}
                  {!observationAnswered && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-gold-950/40 rounded-2xl border border-gold-800/60 space-y-3">
                      <p className="text-sm font-semibold text-white">🔎 Scientific Observation Question:</p>
                      <p className="text-xs text-gold-200">{OBSERVATION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                        {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                          <button
                            key={i}
                            onClick={() => handleObservation(i)}
                            className="p-2.5 text-left text-xs bg-slate-800 hover:bg-slate-750 border border-slate-700 rounded-xl text-slate-200 hover:border-gold-400 transition"
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              )}

              {/* ─── EXPLORATION LAB 1: MATERIAL CLASSIFICATION & CURIE TRANSITION ─── */}
              {currentSlide === 1 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Visual Stage */}
                    <div className="lg:col-span-7 bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col items-center justify-center relative min-h-[260px]">
                      <div className="flex items-center justify-between w-full max-w-md mb-6">
                        {/* North Pole */}
                        <div className="w-20 h-28 bg-red-900 border-2 border-red-500 rounded-r-2xl flex items-center justify-center text-white font-black text-xl shadow-lg">
                          N
                        </div>

                        {/* Specimen */}
                        <motion.div
                          animate={{
                            rotate: selectedMaterial === 'bismuth' ? 90 : 0,
                            scale: selectedMaterial === 'iron' && materialTemp < 1043 ? [1, 1.05, 1] : 1,
                            backgroundColor: selectedMaterial === 'bismuth' ? '#38bdf8' : selectedMaterial === 'aluminium' ? '#a78bfa' : '#f97316'
                          }}
                          transition={{ duration: 0.5 }}
                          className="w-24 h-10 rounded-lg shadow-2xl flex flex-col items-center justify-center text-slate-950 font-black text-xs border-2 border-white"
                        >
                          <span>{selectedMaterial.toUpperCase()}</span>
                          <span className="text-[10px] font-medium opacity-80">
                            {selectedMaterial === 'iron' && materialTemp >= 1043 ? '(Paramagnetic phase)' : ''}
                          </span>
                        </motion.div>

                        {/* South Pole */}
                        <div className="w-20 h-28 bg-gold-900 border-2 border-gold-500 rounded-l-2xl flex items-center justify-center text-white font-black text-xl shadow-lg">
                          S
                        </div>
                      </div>

                      <div className="text-xs text-center text-slate-400">
                        {selectedMaterial === 'bismuth'
                          ? '⚡ Diamagnetic Bismuth: Induced M opposes B → Aligns PERPENDICULAR (weakly repelled).'
                          : selectedMaterial === 'aluminium'
                          ? '⚡ Paramagnetic Aluminium: Permanent dipoles weakly align along B → Aligns PARALLEL.'
                          : materialTemp >= 1043
                          ? '🔥 Above Curie Temp (1043 K): Thermal energy destroys domains → Becomes PARAMAGNETIC!'
                          : '⚡ Ferromagnetic Iron: Domain alignment locks in → Enormous attraction (χ ≈ 5000).'}
                      </div>
                    </div>

                    {/* Controls & Temperature Slider */}
                    <div className="lg:col-span-5 bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-4">
                      <div className="flex gap-2">
                        {(['bismuth', 'aluminium', 'iron'] as const).map((mat) => (
                          <button
                            key={mat}
                            onClick={() => setSelectedMaterial(mat)}
                            className={`flex-1 py-2 text-xs font-bold rounded-xl border capitalize ${
                              selectedMaterial === mat
                                ? 'bg-gold-600 border-gold-500 text-white'
                                : 'bg-slate-800 border-slate-700 text-slate-300'
                            }`}
                          >
                            {mat}
                          </button>
                        ))}
                      </div>

                      {selectedMaterial === 'iron' && (
                        <div className="space-y-2 p-3 bg-slate-900 rounded-xl border border-slate-800">
                          <div className="flex justify-between text-xs text-slate-300">
                            <span>Furnace Temp (T):</span>
                            <span className={`font-bold ${materialTemp >= 1043 ? 'text-rose-400' : 'text-amber-400'}`}>
                              {materialTemp} K {materialTemp >= 1043 ? '(> Tc: Curie Point)' : ''}
                            </span>
                          </div>
                          <input
                            type="range"
                            min={300}
                            max={1200}
                            step={10}
                            value={materialTemp}
                            onChange={(e) => setMaterialTemp(Number(e.target.value))}
                            className="w-full accent-rose-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                          />
                        </div>
                      )}

                      <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                        <span className="text-xs text-slate-400 font-semibold block uppercase">Properties Summary</span>
                        <div className="text-xs text-slate-300 space-y-1">
                          <p><strong>Susceptibility (χ):</strong> {selectedMaterial === 'bismuth' ? '-1.66 × 10⁻⁴' : selectedMaterial === 'aluminium' ? '+2.2 × 10⁻⁵' : materialTemp >= 1043 ? '+1.2 × 10⁻⁴ (Paramagnetic)' : '+4,500'}</p>
                          <p><strong>Relative Permeability (μ_r):</strong> {selectedMaterial === 'bismuth' ? '0.99983 (< 1)' : selectedMaterial === 'aluminium' ? '1.00002 (> 1)' : materialTemp >= 1043 ? '1.00012' : '4,501 (>> 1)'}</p>
                          <p><strong>Temperature Depend.:</strong> {selectedMaterial === 'bismuth' ? 'Completely Independent' : 'Follows Curie’s Law (χ ∝ 1/T)'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── EXPLORATION LAB 2: MAGNETIC FLUX & ROTATION ─── */}
              {currentSlide === 2 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* SVG 3D Representation */}
                    <div className="lg:col-span-7 bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col items-center justify-center min-h-[260px]">
                      <svg viewBox="0 0 400 240" className="w-full h-auto">
                        {/* Uniform Magnetic Field Lines */}
                        {[-60, -20, 20, 60].map((y, i) => (
                          <g key={i}>
                            <line x1="40" y1={120 + y} x2="360" y2={120 + y} stroke="#6366f1" strokeWidth="2" strokeDasharray="6 3" />
                            <polygon points={`360,${120 + y} 350,${116 + y} 350,${124 + y}`} fill="#818cf8" />
                          </g>
                        ))}

                        {/* Rotating Coil Plane */}
                        <g transform={`translate(200, 120) rotate(${coilAngleDeg})`}>
                          <rect x="-60" y="-40" width="120" height="80" rx="6" fill="#1e293b" fillOpacity="0.8" stroke="#f59e0b" strokeWidth="3" />
                          {/* Area vector normal */}
                          <line x1="0" y1="0" x2="0" y2="-70" stroke="#22c55e" strokeWidth="2.5" />
                          <polygon points="0,-75 -5,-65 5,-65" fill="#22c55e" />
                          <text x="10" y="-60" fill="#22c55e" fontSize="11" fontWeight="bold">Area Vector A (Normal)</text>
                        </g>

                        <text x="200" y="225" fill="#94a3b8" fontSize="11" textAnchor="middle">
                          Angle θ = {coilAngleDeg}° (between Field B and Surface Normal A)
                        </text>
                      </svg>
                    </div>

                    {/* Controls & Flux Gauge */}
                    <div className="lg:col-span-5 bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-4">
                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>Coil Angle (θ):</span>
                          <span className="font-bold text-amber-400">{coilAngleDeg}°</span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={90}
                          value={coilAngleDeg}
                          onChange={(e) => setCoilAngleDeg(Number(e.target.value))}
                          className="w-full accent-amber-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>Magnetic Field B:</span>
                          <span className="font-bold text-gold-400">{magFieldB} Tesla</span>
                        </div>
                        <input
                          type="range"
                          min={0.1}
                          max={2.0}
                          step={0.1}
                          value={magFieldB}
                          onChange={(e) => setMagFieldB(Number(e.target.value))}
                          className="w-full accent-gold-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                        />
                      </div>

                      <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                        <span className="text-xs text-slate-400 font-semibold block uppercase">Magnetic Flux Result</span>
                        <div className="text-2xl font-black text-white">
                          Φ = {(calculatedMagneticFlux * 1000).toFixed(1)} <span className="text-sm font-normal text-slate-400">mWb</span>
                        </div>
                        <div className="text-xs text-gold-300 font-mono">
                          Φ = B · A · cos(θ) = {magFieldB} × 0.05 × cos({coilAngleDeg}°)
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── EXPLORATION LAB 3: FARADAY-LENZ INDUCTION COIL ─── */}
              {currentSlide === 3 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Visual Coil & Galvanometer */}
                    <div className="lg:col-span-7 bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col items-center justify-center min-h-[260px] relative">
                      <svg viewBox="0 0 450 240" className="w-full h-auto">
                        {/* Solenoid Loops */}
                        <g stroke="#f59e0b" strokeWidth="4" fill="none">
                          {[160, 190, 220, 250, 280].map((x, i) => (
                            <ellipse key={i} cx={x} cy="120" rx="14" ry="45" />
                          ))}
                        </g>

                        {/* Moving Bar Magnet */}
                        <g transform={`translate(${100 + magnetVelocity * 7}, 105)`}>
                          <rect x="0" y="0" width="35" height="30" rx="3" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="2" />
                          <text x="17" y="20" fill="white" fontSize="12" fontWeight="bold" textAnchor="middle">S</text>
                          <rect x="35" y="0" width="35" height="30" rx="3" fill="#991b1b" stroke="#ef4444" strokeWidth="2" />
                          <text x="52" y="20" fill="white" fontSize="12" fontWeight="bold" textAnchor="middle">N</text>
                        </g>

                        {/* Galvanometer Dial */}
                        <g transform="translate(220, 200)">
                          <circle cx="0" cy="0" r="28" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
                          <line x1="0" y1="0" x2={Math.min(22, Math.max(-22, calculatedFaradayEMF * 10))} y2="-18" stroke="#ef4444" strokeWidth="2.5" />
                          <circle cx="0" cy="0" r="3" fill="#f8fafc" />
                          <text x="0" y="16" fill="#94a3b8" fontSize="8" textAnchor="middle">GALVANOMETER</text>
                        </g>
                      </svg>
                    </div>

                    {/* Controls & Live EMF */}
                    <div className="lg:col-span-5 bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-4">
                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>Magnet Velocity (v):</span>
                          <span className="font-bold text-amber-400">{magnetVelocity} m/s</span>
                        </div>
                        <input
                          type="range"
                          min={-10}
                          max={10}
                          value={magnetVelocity}
                          onChange={(e) => setMagnetVelocity(Number(e.target.value))}
                          className="w-full accent-amber-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                        />
                        <span className="text-[10px] text-slate-500">Slide left/right to push or pull magnet</span>
                      </div>

                      <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                        <span className="text-xs text-slate-400 font-semibold block uppercase">Induced EMF (Faraday-Lenz)</span>
                        <div className="text-2xl font-black text-white">
                          ε = {calculatedFaradayEMF.toFixed(2)} <span className="text-sm font-normal text-slate-400">Volts</span>
                        </div>
                        <div className="text-xs text-amber-300">
                          {magnetVelocity > 0
                            ? '⚡ N-pole approaching: Near face becomes N-pole (repulsion). Deflection Right.'
                            : magnetVelocity < 0
                            ? '⚡ N-pole withdrawing: Near face becomes S-pole (attraction). Deflection Left.'
                            : 'Static Magnet (v = 0): dΦ/dt = 0 → Zero induced EMF.'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── EXPLORATION LAB 4: MOTIONAL EMF & EDDY CURRENT BRAKING ─── */}
              {currentSlide === 4 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Visual Rail Scene */}
                    <div className="lg:col-span-7 bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col items-center justify-center min-h-[260px]">
                      <svg viewBox="0 0 450 220" className="w-full h-auto">
                        {/* Magnetic Field Crosses (Into page) */}
                        {[-50, 0, 50].map((y, i) => (
                          <g key={i}>
                            {[80, 140, 200, 260, 320, 380].map((x, j) => (
                              <text key={j} x={x} y={110 + y} fill="#4338ca" fontSize="16" fontWeight="bold" textAnchor="middle">×</text>
                            ))}
                          </g>
                        ))}

                        {/* Conducting U-Rails */}
                        <path d="M 60 60 L 400 60 M 60 160 L 400 160 M 60 60 L 60 160" fill="none" stroke="#64748b" strokeWidth="6" strokeLinecap="round" />
                        <rect x="50" y="95" width="20" height="30" fill="#334155" rx="3" />
                        <text x="60" y="115" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">R</text>

                        {/* Sliding Rod */}
                        <g transform={`translate(${120 + railVelocity * 20}, 45)`}>
                          <rect x="0" y="0" width="16" height="130" rx="4" fill="#f59e0b" stroke="#b45309" strokeWidth="2" />
                          <text x="8" y="70" fill="#78350f" fontSize="10" fontWeight="bold" textAnchor="middle" transform="rotate(-90 8 70)">ROD (l = 0.5m)</text>
                          <line x1="8" y1="65" x2="35" y2="65" stroke="#ef4444" strokeWidth="3" markerEnd="url(#arrow)" />
                          <text x="40" y="68" fill="#ef4444" fontSize="11" fontWeight="bold">v</text>
                        </g>
                      </svg>
                    </div>

                    {/* Controls & Power Output */}
                    <div className="lg:col-span-5 bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-4">
                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>Sliding Velocity (v):</span>
                          <span className="font-bold text-amber-400">{railVelocity.toFixed(1)} m/s</span>
                        </div>
                        <input
                          type="range"
                          min={0.5}
                          max={8.0}
                          step={0.5}
                          value={railVelocity}
                          onChange={(e) => setRailVelocity(Number(e.target.value))}
                          className="w-full accent-amber-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                        />
                      </div>

                      <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                        <span className="text-xs text-slate-400 font-semibold block uppercase">Motional EMF & Power Dissipated</span>
                        <div className="text-xl font-black text-white">
                          ε = {calculatedMotionalEMF.toFixed(2)} V | P = {calculatedRailPower.toFixed(2)} W
                        </div>
                        <div className="text-xs text-gold-300 font-mono">
                          ε = B · l · v | P = (B l v)² / R (Quadratic in velocity!)
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
                  disabled={currentSlide === 0}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-bold disabled:opacity-40"
                >
                  ← Previous Lab
                </motion.button>

                {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentSlide(s => s + 1)}
                    className="px-5 py-2 rounded-xl bg-gold-600 hover:bg-gold-500 text-white text-xs font-bold"
                  >
                    Next Lab →
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToSandbox}
                    className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black shadow-lg shadow-emerald-600/30"
                  >
                    Enter Free Sandbox Mode →
                  </motion.button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}

      {/* ─── PHASE 3: FREE PLAY SANDBOX (NO GRADING) ─── */}
      {phase === 'sandbox' && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 space-y-6"
        >
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-gold-300">🎮 Interactive Physics Sandbox</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Adjust variables simultaneously without test pressure. Observe how motional EMF, magnetic flux, and power change together.
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-emerald-600/30"
              >
                Ready for Challenges! →
              </motion.button>
            </div>

            {/* Combined Interactive Sandbox Panel */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                <span className="text-xs font-bold text-gold-400 uppercase">1. Field Intensity</span>
                <input
                  type="range"
                  min={0.1}
                  max={2.0}
                  step={0.1}
                  value={magFieldB}
                  onChange={(e) => setMagFieldB(Number(e.target.value))}
                  className="w-full accent-gold-500"
                />
                <div className="text-sm font-bold text-white">B = {magFieldB} T</div>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                <span className="text-xs font-bold text-amber-400 uppercase">2. Conductor Velocity</span>
                <input
                  type="range"
                  min={1}
                  max={12}
                  value={railVelocity}
                  onChange={(e) => setRailVelocity(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
                <div className="text-sm font-bold text-white">v = {railVelocity} m/s</div>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                <span className="text-xs font-bold text-emerald-400 uppercase">3. Loop Resistance</span>
                <input
                  type="range"
                  min={0.5}
                  max={5}
                  step={0.5}
                  value={railResistance}
                  onChange={(e) => setRailResistance(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
                <div className="text-sm font-bold text-white">R = {railResistance} Ω</div>
              </div>
            </div>

            {/* Real time 2D Canvas Display */}
            <div className="rounded-2xl overflow-hidden border border-slate-800">
              <canvas ref={canvasRef} width={800} height={180} className="w-full h-auto block" />
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: STRUCTURED CHALLENGES & ESCALATING HINTS ─── */}
      {phase === 'challenge' && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 space-y-6"
        >
          {/* Challenge Top Bar */}
          <div className="flex items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase text-gold-400 tracking-wider">
                Question {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <h2 className="text-base sm:text-lg font-bold text-white mt-0.5">
                Competency: <span className="capitalize text-amber-300">{activeChallenge.competencyLevel}</span>
              </h2>
            </div>

            {/* Progress Pill */}
            <div className="w-32 sm:w-48 bg-slate-800 h-2.5 rounded-full overflow-hidden border border-slate-700">
              <motion.div
                className="h-full bg-gradient-to-r from-gold-500 to-emerald-400"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Challenge Card */}
          <motion.div
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
            transition={{ duration: 0.4 }}
            className={`p-6 bg-slate-900 rounded-3xl border transition-all duration-300 space-y-6 ${
              wrongFlash
                ? 'bg-rose-950/70 border-rose-500'
                : 'border-slate-800'
            }`}
          >
            <p className="text-base sm:text-lg font-medium text-slate-100 leading-relaxed">
              {activeChallenge.question}
            </p>

            {/* 1. MCQ TYPE (classify, distinguish, match) */}
            {(activeChallenge.type === 'classify' || activeChallenge.type === 'distinguish' || activeChallenge.type === 'match') && activeChallenge.options && (
              <div className="grid grid-cols-1 gap-3">
                {activeChallenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => handleAnswer(i)}
                    disabled={showExplanation}
                    aria-label={`Option ${i + 1}: ${opt}`}
                    className={`p-4 rounded-2xl text-left text-sm font-medium border transition-all ${
                      showExplanation && i === activeChallenge.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : showExplanation && i !== activeChallenge.correctIndex
                        ? 'bg-slate-950 border-slate-800 text-slate-500'
                        : 'bg-slate-800/80 hover:bg-slate-750 border-slate-700 text-slate-200 hover:border-gold-500'
                    }`}
                  >
                    <span className="font-bold mr-2 text-gold-400">{String.fromCharCode(65 + i)}.</span>
                    {opt}
                  </motion.button>
                ))}
              </div>
            )}

            {/* 2. DRAG-LABEL TYPE */}
            {activeChallenge.type === 'drag-label' && activeChallenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-2xl border border-slate-800">
                  {activeChallenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3.5 py-2 bg-gold-700 hover:bg-gold-600 rounded-xl text-xs font-bold text-white cursor-grab shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Object.keys(activeChallenge.correctMapping || {}).map((targetKey) => (
                    <div
                      key={targetKey}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(targetKey)}
                      className={`p-4 rounded-2xl border-2 border-dashed min-h-[70px] flex items-center justify-center text-xs font-medium text-center ${
                        droppedLabels[targetKey]
                          ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300'
                          : 'bg-slate-950 border-slate-700 text-slate-400'
                      }`}
                    >
                      {droppedLabels[targetKey] || `Drop target for [${targetKey.replace('_', ' ')}]`}
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation}
                  className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white font-bold text-xs rounded-xl shadow"
                >
                  Verify All Targets
                </motion.button>
              </div>
            )}

            {/* 3. DRAG-SORT TYPE */}
            {activeChallenge.type === 'drag-sort' && activeChallenge.sortItems && (
              <div className="space-y-3">
                {(sortArrangement.length === activeChallenge.sortItems.length
                  ? sortArrangement.map(idx => activeChallenge.sortItems![idx])
                  : activeChallenge.sortItems
                ).map((item, displayIdx) => (
                  <motion.div
                    key={displayIdx}
                    draggable
                    onDragStart={() => setDraggedItem(String(displayIdx))}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => {
                      const from = parseInt(draggedItem || '0');
                      handleSortMove(from, displayIdx);
                    }}
                    whileHover={{ scale: 1.01 }}
                    className="p-3.5 bg-slate-800 border border-slate-700 rounded-xl text-xs sm:text-sm text-slate-200 cursor-grab flex items-center gap-3"
                  >
                    <span className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center font-bold text-gold-400 text-xs">
                      {displayIdx + 1}
                    </span>
                    <span>{item}</span>
                  </motion.div>
                ))}

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(sortArrangement.length ? sortArrangement : activeChallenge.sortItems!.map((_, i) => i))}
                  disabled={showExplanation}
                  className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white font-bold text-xs rounded-xl shadow"
                >
                  Submit Ordered Sequence
                </motion.button>
              </div>
            )}

            {/* 4. NUMERIC INPUT TYPE */}
            {activeChallenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    step="any"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter calculated numerical value"
                    className="px-4 py-3 bg-slate-950 border border-slate-700 rounded-2xl text-white text-sm font-medium focus:border-gold-500 outline-none w-64"
                  />
                  <span className="text-sm font-bold text-slate-400">{activeChallenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-6 py-3 bg-gold-600 hover:bg-gold-500 text-white text-xs font-bold rounded-2xl shadow"
                  >
                    Check Answer
                  </motion.button>
                </div>
              </div>
            )}

            {/* 5. CONSTRUCT TYPE */}
            {activeChallenge.type === 'construct' && activeChallenge.availableParts && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-2xl border border-slate-800">
                  {activeChallenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3 py-1.5 bg-gold-800 hover:bg-gold-700 rounded-lg text-xs font-bold text-white"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 min-h-[60px] flex flex-wrap items-center gap-2">
                  {constructParts.map((part, idx) => (
                    <span key={idx} className="px-3 py-1 bg-gold-900/80 border border-gold-600 rounded-lg text-xs font-bold text-gold-200 flex items-center gap-1.5">
                      {part}
                      <button onClick={() => setConstructParts(prev => prev.filter((_, i) => i !== idx))} className="text-rose-400 font-bold ml-1">×</button>
                    </span>
                  ))}
                  {constructParts.length === 0 && <span className="text-xs text-slate-500">Click elements above to assemble formula or reasoning chain</span>}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white font-bold text-xs rounded-xl shadow"
                >
                  Verify Construction
                </motion.button>
              </div>
            )}

            {/* Step-by-Step Progressive Disclosure Explanation */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-5 rounded-2xl bg-amber-950/40 border border-amber-700/60 space-y-4"
              >
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <span>💡</span> Step-by-Step Physical Analysis
                </div>

                <div className="space-y-2">
                  {activeChallenge.explanation.split('. ').filter(s => s.trim().length > 0).slice(0, revealedSteps + 1).map((sentence, sIdx) => (
                    <motion.p
                      key={sIdx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs sm:text-sm text-amber-200/90 leading-relaxed"
                    >
                      <strong className="text-amber-400 font-bold">{sIdx + 1}.</strong> {sentence}{!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}
                </div>

                <div className="flex items-center gap-3 pt-2">
                  {revealedSteps < activeChallenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-4 py-2 bg-amber-700/80 hover:bg-amber-600 text-white rounded-xl text-xs font-bold"
                    >
                      Reveal Next Step →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black shadow-lg shadow-emerald-600/30"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finish Simulation →' : 'Proceed to Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION & MASTERY PROFILE ─── */}
      {phase === 'complete' && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-6 space-y-6"
        >
          <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-3xl">
              🏆
            </div>
            <h2 className="text-2xl font-black text-white">Electromagnetic Suite Completed!</h2>

            {/* Motivational Feedback */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-gold-950 via-slate-900 to-gold-950 border border-gold-700/60 max-w-md mx-auto">
              <span className="text-xs uppercase tracking-wider text-gold-400 font-bold block mb-1">Performance Assessment</span>
              <p className={`text-xl font-extrabold ${errors === 0 ? 'text-emerald-400' : errors <= 3 ? 'text-gold-300' : errors <= 7 ? 'text-amber-400' : 'text-rose-400'}`}>
                {motivationalMessage}
              </p>
              <p className="text-xs text-slate-400 mt-1">Total errors encountered: {errors}</p>
            </div>

            <p className="text-slate-300 text-sm max-w-lg mx-auto">
              You have investigated magnetic field lines, material classifications, Faraday-Lenz induction, and motional EMF mechanics.
            </p>

            <div className="flex justify-center gap-6 pt-2">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 min-w-[120px]">
                <span className="text-xs text-slate-400 block">Final Score</span>
                <span className="text-2xl font-black text-emerald-400">{Math.max(0, 100 - errors * 5)}%</span>
              </div>
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 min-w-[120px]">
                <span className="text-xs text-slate-400 block">BKT Mastery Tier</span>
                <span className="text-2xl font-black text-gold-400 capitalize">{masteryLevel}</span>
              </div>
            </div>
          </div>

          {/* Reflection Section */}
          <div className="p-6 bg-slate-900/90 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-gold-300 flex items-center gap-2">
              <span>💭</span> Deep Concept Reflection
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800/80 space-y-2">
                <p className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                  <span>💡</span> What was the most surprising thing you learned?
                </p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Consider how Lenz&apos;s law opposes flux changes rather than the field itself, or how non-magnetic copper strongly retards falling neodymium magnets through eddy currents.
                </p>
              </div>
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800/80 space-y-2">
                <p className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                  <span>🗣️</span> How would you explain this to a friend?
                </p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Think of magnetic field lines as continuous uninterrupted racetracks, and induction as nature&apos;s inertial resistance to shifting magnetic flux.
                </p>
              </div>
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800/80 space-y-2">
                <p className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                  <span>🌍</span> Where in real life might you use this?
                </p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Everywhere in modern transport and energy: Vande Bharat regenerative brakes, Maglev propulsion, laminated transformer cores, and induction cooktops!
                </p>
              </div>
            </div>
          </div>

          {/* Misconception Diagnostic Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-6 bg-rose-950/40 rounded-3xl border border-rose-800/60 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                <span>⚠️</span> Personalised Misconception Diagnostics
              </h3>
              <div className="space-y-3 pt-1">
                {hitMisconceptions.map((mIdx, idx) => {
                  const m = misconceptions?.[mIdx];
                  if (!m) return null;
                  return (
                    <div key={idx} className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                      <p className="text-xs font-bold text-rose-400">❌ Misconception: {m.misconception}</p>
                      <p className="text-xs text-emerald-300">✓ Physical Fact: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Real-World Capstone Scenario Completion */}
          <div className="p-6 bg-gold-950/40 rounded-3xl border border-gold-800/60 space-y-3">
            <h3 className="text-sm font-bold text-gold-300 flex items-center gap-2">
              <span>🚆</span> {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-1.5 pt-1">
              {REAL_WORLD_ACTIVITY.steps.map((st, i) => (
                <li key={i} className="text-xs text-slate-400 flex items-start gap-2">
                  <span className="font-bold text-gold-400">{i + 1}.</span> {st}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* ─── PLATFORM OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Module Mastery Achieved!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}