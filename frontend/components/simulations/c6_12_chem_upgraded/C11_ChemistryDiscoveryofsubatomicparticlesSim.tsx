'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update, SRSItem } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, BKTState } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ==========================================
// NODE DEFINITIONS & CONSTANTS
// ==========================================
export const ALL_NODE_IDS = [
  'c11_chem_011', // Discovery of Cathode Rays & Electron
  'c11_chem_012', // Charge to Mass Ratio (e/m) of Electron
  'c11_chem_013', // Millikan's Oil Drop Experiment & Charge Quantization
  'c11_chem_014', // Discovery of Anode Rays / Canal Rays & Proton
  'c11_chem_015', // Discovery of Neutron (Chadwick Be Bombardment)
  'c11_chem_016', // Thomson's Atomic Model & Its Limitations
  'c11_chem_017', // Rutherford's Alpha Particle Scattering Experiment
  'c11_chem_018', // Rutherford's Nuclear Model & Coulombic Trajectory
  'c11_chem_019', // Atomic Number (Z), Mass Number (A), Isotopes & Isobars
  'c11_chem_020'  // Electromagnetic Radiation & Planck's Quantum Energy
] as const;

export type NodeId = typeof ALL_NODE_IDS[number];

// ==========================================
// SCENARIO
// ==========================================
const SCENARIO = {
  title: 'High-Vacuum Subatomic Physics Laboratory',
  intro: 'Step into the late 19th and early 20th century laboratory of Cavendish and Manchester. You have access to precision Crookes tubes, electric and magnetic deflection plates, Millikan atomizer chambers, and alpha-scattering zinc sulfide screens.',
  context: 'By manipulating electric/magnetic fields, gas pressures, target foils, and radiant energies, you will re-enact the fundamental breakthroughs that unraveled the subatomic structure of matter.'
};

// ==========================================
// DISCOVERY QUESTION
// ==========================================
const DISCOVERY_QUESTION = {
  question: 'When alpha particles (doubly ionized Helium ions, He²⁺) are fired at an ultrathin sheet of gold foil, what proportion of particles suffer deflections greater than 90°?',
  options: [
    'Nearly 50% bounce straight back due to physical collisions with solid gold atoms.',
    'About 1 in 8,000 particles is deflected back, revealing an extremely dense, minute positive nucleus.',
    '100% pass through completely unhindered with zero measurable deflection.',
    'All alpha particles are absorbed and transformed into hydrogen gas.'
  ],
  correctIndex: 1,
  hintAfter: 'Rutherford famously remarked: "It was almost as incredible as if you fired a 15-inch shell at a piece of tissue paper and it came back and hit you!"'
};

// ==========================================
// DEFAULT PROPS INTERFACE
// ==========================================
export interface SimProps {
  initialNodeId?: NodeId;
  onComplete?: (score: number) => void;
  studentId?: string;
}

// ==========================================
// EXPLORATION STEPS (5 MANDATORY LABS)
// ==========================================
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Thomson Cathode Ray Deflection & e/m Ratio',
    instruction: 'Adjust Electric Field (E) and Magnetic Field (B) to zero the net beam displacement on the screen, then calculate e/m ratio using e/m = E / (B² · r).',
    interactionType: 'cathode-deflection',
    nodeId: 'c11_chem_012' as NodeId
  },
  {
    title: 'Lab 2: Millikan Oil Drop Quantization Chamber',
    instruction: 'Balance gravitational force (Fg) with electrostatic force (Fe) by adjusting voltage V until an oil drop hovers steadily. Calculate droplet charge q = m·g·d / V.',
    interactionType: 'millikan-droplet',
    nodeId: 'c11_chem_013' as NodeId
  },
  {
    title: 'Lab 3: Anode Rays & Gas Identity Dependence',
    instruction: 'Change gas fill (H₂, He, N₂, Ar) in the perforated cathode tube. Observe how positive ion deflection changes while cathode ray deflection stays constant.',
    interactionType: 'anode-ray-gas',
    nodeId: 'c11_chem_014' as NodeId
  },
  {
    title: 'Lab 4: Rutherford Alpha Trajectory Simulator',
    instruction: 'Vary target foil material (Au, Cu, Al) and impact parameter b. Observe Coulombic deflection scattering angle θ and calculate nuclear radius lower limits.',
    interactionType: 'rutherford-scattering',
    nodeId: 'c11_chem_017' as NodeId
  },
  {
    title: 'Lab 5: Chadwick Neutron Bombardment & Recoil Mass',
    instruction: 'Bombard Beryllium targets with Alpha particles. Direct neutral radiation into Paraffin Wax and measure recoil Proton energy to deduce neutron mass.',
    interactionType: 'chadwick-neutron',
    nodeId: 'c11_chem_015' as NodeId
  }
];

// ==========================================
// PREDICTION QUESTIONS (MANDATORY)
// ==========================================
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: What happens to the deflection angle of cathode rays when the electrode material is changed from iron to platinum?',
    options: [
      'Deflection increases because platinum releases heavier electrons.',
      'Deflection decreases because platinum has higher work function.',
      'Deflection stays identical because cathode rays (electrons) are identical universal constituents.',
      'Deflection reverses direction because noble metals emit positive ions.'
    ],
    correctIndex: 2,
    verifyInstruction: 'Switch cathode materials in Lab 1 and verify beam deflection on phosphorescent screen.',
    nodeId: 'c11_chem_011' as NodeId
  },
  {
    question: 'Predict: If you replace Hydrogen gas with Helium gas in an anode ray tube, what will happen to the e/m ratio of the positive canal rays?',
    options: [
      'e/m will increase by 4 times.',
      'e/m will decrease because Helium ions (He⁺) are approximately 4 times heavier than H⁺.',
      'e/m will remain exactly unchanged.',
      'e/m becomes zero because Helium is a noble gas and cannot form rays.'
    ],
    correctIndex: 1,
    verifyInstruction: 'Select Hydrogen vs Helium in Lab 3 and compare the positive ray deflection spectrum.',
    nodeId: 'c11_chem_014' as NodeId
  }
];

// ==========================================
// OBSERVATION QUESTIONS (MANDATORY)
// ==========================================
const OBSERVATION_QUESTIONS = [
  {
    question: 'Observation: In Millikan’s experiment, when examining charges measured across 20 distinct oil droplets, what mathematical pattern emerges?',
    observableOptions: [
      'Charges are continuously distributed values from 0.1 to 10.0 microcoulombs.',
      'Every measured charge is an integer multiple of approximately 1.602 × 10⁻¹⁹ C.',
      'Charges depend strictly on droplet radius cubed with no common factor.',
      'Charges fluctuate randomly between positive and negative values without stability.'
    ],
    correctIndex: 1,
    nodeId: 'c11_chem_013' as NodeId
  },
  {
    question: 'Observation: In the Rutherford scattering experiment, how does increasing the atomic number Z of the metal foil affect alpha particle deflection?',
    observableOptions: [
      'Higher Z foils produce far higher large-angle scattering because nuclear electrostatic charge (+Ze) is greater.',
      'Higher Z foils absorb all alpha particles and emit visible light.',
      'Higher Z foils produce zero deflection because dense atoms shield alpha rays.',
      'Higher Z foils cause alpha particles to decrease in charge to single positive.'
    ],
    correctIndex: 0,
    nodeId: 'c11_chem_018' as NodeId
  }
];

// ==========================================
// REAL WORLD ACTIVITY (MANDATORY)
// ==========================================
const REAL_WORLD_ACTIVITY = {
  title: 'Mass Spectrometry & Particle Accelerator Diagnostics',
  description: 'Modern analytical instruments like Time-of-Flight Mass Spectrometers (TOF-MS) and Synchrotrons rely directly on J.J. Thomson e/m deflection principles and Millikan charge quantization to identify unknown organic molecules and isotopes.',
  steps: [
    '1. Ionize volatile organic compounds using high-energy electron impact ionization (70 eV).',
    '2. Accelerate positive ions through electrostatic potential grid (V = 5000 V).',
    '3. Pass ion beam through perpendicular magnetic velocity selector (B = 0.25 T).',
    '4. Measure time-of-flight to detector array to calculate exact mass-to-charge ratio (m/z) with 0.0001 Da precision.'
  ]
};

// ==========================================
// MISCONCEPTIONS DATA
// ==========================================
const MISCONCEPTIONS = [
  {
    id: 'misc_1',
    title: 'Anode Rays Originate Directly From Anode Electrode',
    description: 'Students often believe that canal rays (anode rays) are emitted directly from the surface of the anode electrode material.',
    correction: 'Canal rays are positive gaseous ions produced when energetic cathode rays collide with and ionize neutral residual gas molecules inside the discharge tube.'
  },
  {
    id: 'misc_2',
    title: 'Alpha Particles Rebound Due to Mechanical Collisions',
    description: 'Students assume alpha particles physically hit a hard rigid sphere surface like billiard balls during nuclear scattering.',
    correction: 'Deflection is caused purely by electrostatic Coulombic repulsion between the positively charged nucleus (+Ze) and alpha particle (+2e).'
  },
  {
    id: 'misc_3',
    title: 'Thomson Directly Measured Electron Charge & Mass Separately',
    description: 'Students confuse Thomson’s e/m ratio measurement with independent measurements of single electron charge and mass.',
    correction: 'Thomson only measured the ratio (e/m = 1.7588 × 10¹¹ C/kg). Millikan later isolated charge e, allowing calculation of mass m = e / (e/m).'
  },
  {
    id: 'misc_4',
    title: 'Oil Droplets In Millikan Experiment Are Naturally Charged',
    description: 'Students believe droplets come pre-charged out of the atomizer naturally.',
    correction: 'Neutral oil drops acquire charge via friction during spraying or by capturing ions produced when X-rays ionize surrounding air molecules.'
  },
  {
    id: 'misc_5',
    title: 'Cathode Ray e/m Depends On Tube Gas Filling',
    description: 'Students think cathode rays behave like canal rays and vary depending on the residual gas inside the tube.',
    correction: 'Cathode rays consist of fundamental electrons common to all matter; their e/m ratio is strictly constant regardless of gas or electrode.'
  },
  {
    id: 'misc_6',
    title: 'Neutrons Are Combinations Of Proton and Electron Bound Together',
    description: 'Rutherford initially hypothesized neutrons were tight proton-electron pairs, leading students to treat them as composite ions.',
    correction: 'Neutrons are distinct fundamental baryonic subatomic particles composed of one up quark and two down quarks, carrying zero net charge.'
  }
];

// ==========================================
// DIAGNOSTIC QUESTIONS
// ==========================================
const DIAGNOSTIC_QUESTIONS = [
  {
    id: 'diag_1',
    question: 'Which subatomic particle was discovered using perforated cathode gas discharge tubes?',
    options: ['Electron', 'Proton (Canal rays)', 'Neutron', 'Positron'],
    correctIndex: 1,
    nodeId: 'c11_chem_014' as NodeId
  },
  {
    id: 'diag_2',
    question: 'What is the precise SI value of Thomson’s electron charge-to-mass ratio (e/m)?',
    options: ['1.758820 × 10¹¹ C/kg', '9.109383 × 10⁻³¹ C/kg', '1.602176 × 10⁻¹⁹ C/kg', '9.648533 × 10⁴ C/kg'],
    correctIndex: 0,
    nodeId: 'c11_chem_012' as NodeId
  },
  {
    id: 'diag_3',
    question: 'In Millikan’s oil drop experiment, X-rays are primarily used to:',
    options: ['Heat the oil drops to expand their radius', 'Ionize air molecules inside the chamber', 'Illuminate droplets for microscopic viewing', 'Evaporate excess oil from chamber walls'],
    correctIndex: 1,
    nodeId: 'c11_chem_013' as NodeId
  },
  {
    id: 'diag_4',
    question: 'Chadwick discovered the neutron in 1932 by bombarding Beryllium-9 with:',
    options: ['Beta particles (electrons)', 'Gamma rays', 'Alpha particles (He²⁺)', 'Thermal protons'],
    correctIndex: 2,
    nodeId: 'c11_chem_015' as NodeId
  },
  {
    id: 'diag_5',
    question: 'What was the major flaw in Thomson’s Plum Pudding Model of the atom?',
    options: ['It predicted positive charges were concentrated in a tiny nucleus', 'It could not explain large-angle alpha particle scattering', 'It assumed electrons had zero mass', 'It required neutrons to stabilize the atom'],
    correctIndex: 1,
    nodeId: 'c11_chem_016' as NodeId
  },
  {
    id: 'diag_6',
    question: 'Two atoms having the same mass number A but different atomic numbers Z are termed:',
    options: ['Isotopes', 'Isobars', 'Isotones', 'Isomers'],
    correctIndex: 1,
    nodeId: 'c11_chem_019' as NodeId
  },
  {
    id: 'diag_7',
    question: 'According to Planck’s Quantum Theory, the energy E of a single photon of electromagnetic radiation is given by:',
    options: ['E = h / λ', 'E = h · ν', 'E = m · c²', 'E = ½ m v²'],
    correctIndex: 1,
    nodeId: 'c11_chem_020' as NodeId
  },
  {
    id: 'diag_8',
    question: 'In Rutherford scattering, the distance of closest approach r₀ of an alpha particle to a target nucleus depends on initial kinetic energy K as:',
    options: ['r₀ ∝ K', 'r₀ ∝ 1 / K', 'r₀ ∝ K²', 'r₀ ∝ √K'],
    correctIndex: 1,
    nodeId: 'c11_chem_018' as NodeId
  }
];

// ==========================================
// 22+ CHALLENGES (FOUNDATION, STANDARD, ADVANCED)
// ==========================================
export interface Challenge {
  id: string;
  nodeId: NodeId;
  type: 'multiple-choice' | 'numeric' | 'drag-sort' | 'classify';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: 'recall' | 'understanding' | 'application' | 'analysis' | 'evaluation' | 'creativity';
  question: string;
  options?: string[];
  correctIndex?: number;
  correctAnswer?: number | string;
  tolerance?: number;
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
}

const CHALLENGES: Challenge[] = [
  // FOUNDATION (7)
  {
    id: 'ch_01',
    nodeId: 'c11_chem_011',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Who demonstrated that cathode rays consist of negatively charged fundamental particles now called electrons?',
    options: ['Eugen Goldstein', 'J.J. Thomson', 'James Chadwick', 'Ernest Rutherford'],
    correctIndex: 1,
    explanation: 'J.J. Thomson in 1897 performed electric and magnetic deflection experiments on cathode rays, proving they were negatively charged particles.',
    hints: ['He proposed the Plum Pudding model.', 'He worked at Cavendish Laboratory.', 'His experiments measured e/m.'],
    misconceptionIndex: 2
  },
  {
    id: 'ch_02',
    nodeId: 'c11_chem_012',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'When balanced electric (E) and magnetic (B) fields produce zero deflection in a cathode ray tube, the velocity v of electrons is equal to:',
    options: ['v = E / B', 'v = B / E', 'v = E · B', 'v = E² / B'],
    correctIndex: 0,
    explanation: 'When magnetic force e·v·B equals electric force e·E, electrostatic balance gives v = E / B.',
    hints: ['Set magnetic Lorentz force equal to electric force.', 'q·v·B = q·E', 'Cancel q from both sides.'],
  },
  {
    id: 'ch_03',
    nodeId: 'c11_chem_013',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which fundamental principle was established by Robert Millikan’s Oil Drop Experiment?',
    options: ['Quantization of electric charge', 'Existence of nuclear neutrons', 'Wave nature of light', 'Continuous distribution of charge'],
    correctIndex: 0,
    explanation: 'Millikan showed all electric charges are integral multiples of elementary charge e = 1.602 × 10⁻¹⁹ C.',
    hints: ['Charge comes in discrete packets.', 'q = n · e', 'Think of fundamental elementary charge.'],
    misconceptionIndex: 3
  },
  {
    id: 'ch_04',
    nodeId: 'c11_chem_014',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why does the e/m ratio of canal rays (anode rays) depend on the gas present inside the discharge tube?',
    options: ['Because cathode rays absorb gas atoms', 'Because canal rays consist of positive gas ions with different atomic masses', 'Because the anode electrode releases metal atoms', 'Because gas pressure changes magnetic permeability'],
    correctIndex: 1,
    explanation: 'Canal rays are positive ions produced by ionizing residual gas molecules; heavier gas ions yield lower e/m ratios.',
    hints: ['Anode rays are ionized gas atoms.', 'Mass of ion depends on atomic mass of gas.', 'e/m = charge / mass.'],
    misconceptionIndex: 0
  },
  {
    id: 'ch_05',
    nodeId: 'c11_chem_015',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In 1932, James Chadwick identified neutrons by bombarding Beryllium with which type of radiation?',
    options: ['Beta particles', 'Gamma rays', 'Alpha particles', 'X-rays'],
    correctIndex: 2,
    explanation: 'Chadwick bombarded ⁹Be with alpha particles (⁴He²⁺): ⁹Be + ⁴He → ¹²C + ¹n.',
    hints: ['It is a helium nucleus.', 'Charge is +2e.', 'Alpha emission from polonium.'],
  },
  {
    id: 'ch_06',
    nodeId: 'c11_chem_016',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Thomson’s "Plum Pudding" model depicted the atom as:',
    options: ['A dense central positive core surrounded by distant orbiting electrons', 'A uniform sphere of positive charge with electrons embedded throughout', 'A rigid hollow sphere of pure energy', 'A cloud of neutrons surrounding a negative nucleus'],
    correctIndex: 1,
    explanation: 'Thomson modeled the atom as a spherical positive jelly with negative electrons embedded like raisins in a pudding.',
    hints: ['Uniform positive sphere.', 'Embedded electrons.', 'No nucleus yet.'],
  },
  {
    id: 'ch_07',
    nodeId: 'c11_chem_019',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Species having the same atomic number Z but different mass numbers A are known as:',
    options: ['Isobars', 'Isotopes', 'Isotones', 'Isoelectronic ions'],
    correctIndex: 1,
    explanation: 'Isotopes are atoms of the same element with identical protons Z but different neutrons N.',
    hints: ['Same element name.', 'Same atomic number.', 'Different neutron counts.'],
  },

  // STANDARD (8)
  {
    id: 'ch_08',
    nodeId: 'c11_chem_012',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Calculate the velocity (in 10⁶ m/s) of electrons passing undeflected through perpendicular fields where E = 3.0 × 10⁴ V/m and B = 2.0 × 10⁻³ T. Enter numerical value in 10⁶ m/s:',
    correctAnswer: 15,
    tolerance: 0.5,
    explanation: 'v = E / B = (3.0 × 10⁴ V/m) / (2.0 × 10⁻³ T) = 1.5 × 10⁷ m/s = 15 × 10⁶ m/s.',
    hints: ['Use formula v = E / B.', 'Convert 3.0 × 10⁴ / 0.002.', 'Output as 15.'],
  },
  {
    id: 'ch_09',
    nodeId: 'c11_chem_013',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'An oil droplet carries a measured electrostatic charge of -4.806 × 10⁻¹⁹ C. How many excess electrons does this droplet possess?',
    correctAnswer: 3,
    tolerance: 0.01,
    explanation: 'n = q / e = (4.806 × 10⁻¹⁹ C) / (1.602 × 10⁻¹⁹ C) = 3 electrons.',
    hints: ['Divide total charge by elementary charge e.', 'e = 1.602 × 10⁻¹⁹ C.', 'Result must be an integer.'],
    misconceptionIndex: 3
  },
  {
    id: 'ch_10',
    nodeId: 'c11_chem_014',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Which gas in a discharge tube produces anode rays with the maximum specific charge (e/m)?',
    options: ['Helium gas (He)', 'Hydrogen gas (H₂)', 'Nitrogen gas (N₂)', 'Argon gas (Ar)'],
    correctIndex: 1,
    explanation: 'Hydrogen forms H⁺ ions (protons), which have the smallest ionic mass among all gases, maximizing e/m.',
    hints: ['Specific charge is inversely proportional to mass.', 'Which ion is lightest?', 'Proton has mass number 1.'],
  },
  {
    id: 'ch_11',
    nodeId: 'c11_chem_017',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'What percentage of alpha particles pass straight through gold foil without significant deflection in Rutherford’s experiment?',
    options: ['About 50%', 'About 75%', 'Over 99.8%', 'Less than 10%'],
    correctIndex: 2,
    explanation: 'Over 99.8% of alpha particles pass undeflected because the atom is mostly empty space.',
    hints: ['Most of the atom is empty.', 'Deflections are rare.', 'Vast majority pass straight through.'],
  },
  {
    id: 'ch_12',
    nodeId: 'c11_chem_018',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'If an alpha particle (+2e) approaches a nucleus of atomic number Z with impact parameter b = 0, what is the trajectory?',
    options: ['It passes in a straight line.', 'It orbits the nucleus in a circle.', 'It retro-reflects directly back along its original path (θ = 180°).', 'It is absorbed into the nuclear lattice.'],
    correctIndex: 2,
    explanation: 'When impact parameter b = 0 (head-on collision course), the Coulombic repulsive force acts straight back, causing head-on 180° scattering.',
    hints: ['Head-on alignment.', 'Repulsion acts along center line.', 'Bounces back 180 degrees.'],
    misconceptionIndex: 1
  },
  {
    id: 'ch_13',
    nodeId: 'c11_chem_019',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'How many neutrons are present in a neutral atom of Uranium-238 (²³⁸₉₂U)?',
    correctAnswer: 146,
    tolerance: 0,
    explanation: 'Number of neutrons N = Mass number A - Atomic number Z = 238 - 92 = 146.',
    hints: ['N = A - Z', 'A = 238', 'Z = 92'],
  },
  {
    id: 'ch_14',
    nodeId: 'c11_chem_020',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Calculate energy E (in 10⁻¹⁹ J) of a single photon of violet light with frequency ν = 7.5 × 10¹⁴ Hz. (Planck constant h = 6.626 × 10⁻³⁴ J·s). Enter numerical value in 10⁻¹⁹ J:',
    correctAnswer: 4.97,
    tolerance: 0.1,
    explanation: 'E = h · ν = (6.626 × 10⁻³⁴ J·s) × (7.5 × 10¹⁴ s⁻¹) = 4.9695 × 10⁻¹⁹ J ≈ 4.97 × 10⁻¹⁹ J.',
    hints: ['Use Planck equation E = h · ν.', 'Multiply 6.626 by 7.5.', 'Power of ten is -19 J.'],
  },
  {
    id: 'ch_15',
    nodeId: 'c11_chem_015',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why were neutrons discovered much later (1932) than electrons (1897) and protons (1919)?',
    options: ['Neutrons travel faster than light', 'Neutrons possess zero electrical charge and do not cause electric/magnetic deflection', 'Neutrons break down immediately upon creation', 'Neutrons are lighter than electrons'],
    correctIndex: 1,
    explanation: 'Being electrically neutral, neutrons do not produce direct ionization or visible paths in electric/magnetic fields.',
    hints: ['They have no charge.', 'Detectors rely on ionization.', 'Neutral particles pass through fields unbent.'],
  },

  // ADVANCED (7)
  {
    id: 'ch_16',
    nodeId: 'c11_chem_012',
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'In a Thomson tube, an electric field E = 1.0 × 10⁴ V/m produces a transverse deflection y = 2.0 cm over length L = 10 cm when velocity v = 2.0 × 10⁷ m/s. Calculate calculated e/m ratio in 10¹¹ C/kg. Formula: e/m = (2 · y · v²) / (E · L²). Enter value in 10¹¹ C/kg:',
    correctAnswer: 1.6,
    tolerance: 0.2,
    explanation: 'e/m = [2 × (0.02 m) × (2.0 × 10⁷ m/s)²] / [(10⁴ V/m) × (0.1 m)²] = (0.04 × 4 × 10¹⁴) / (100) = 1.6 × 10¹¹ C/kg.',
    hints: ['Substitute y=0.02, v=2e7, E=1e4, L=0.1.', 'y is in meters!', 'Square length L² = 0.01.'],
  },
  {
    id: 'ch_17',
    nodeId: 'c11_chem_018',
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Calculate distance of closest approach r₀ (in 10⁻¹⁴ m) for a 5.0 MeV alpha particle (KE = 8.0 × 10⁻¹³ J) approaching a gold nucleus (Z = 79). Formula: r₀ = (2 · Z · e²) / (4πε₀ · KE), where 1/(4πε₀) = 9.0 × 10⁹ N·m²/C² and e = 1.602 × 10⁻¹⁹ C. Enter numerical value in 10⁻¹⁴ m:',
    correctAnswer: 4.55,
    tolerance: 0.3,
    explanation: 'r₀ = [9 × 10⁹ × 2 × 79 × (1.602 × 10⁻¹⁹)²] / (8.0 × 10⁻¹³) = (1422 × 10⁹ × 2.566 × 10⁻³⁸) / (8 × 10⁻¹³) = 4.56 × 10⁻¹⁴ m.',
    hints: ['r0 = (2 * Z * e^2 * k) / KE', 'k = 9e9, Z = 79', 'KE = 8.0e-13 J'],
    misconceptionIndex: 1
  },
  {
    id: 'ch_18',
    nodeId: 'c11_chem_019',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Which set of species represents a trio of ISOTONES (same number of neutrons N)?',
    options: [
      '¹⁴₆C, ¹⁵₇N, ¹⁶₈O',
      '¹²₆C, ¹³₆C, ¹⁴₆C',
      '⁴⁰₁∯Ar, ⁴⁰₂₀Ca, ⁴⁰₁₉K',
      '¹₄₆C, ¹⁴₇N, ¹⁴₈O'
    ],
    correctIndex: 0,
    explanation: 'Neutron counts: ¹⁴₆C (14-6=8), ¹⁵₇N (15-7=8), ¹⁶₈O (16-8=8). All have 8 neutrons, so they are isotones.',
    hints: ['Calculate N = A - Z for each atom.', 'Look for identical N value across all three.', '14-6 = 8, 15-7 = 8, 16-8 = 8.'],
  },
  {
    id: 'ch_19',
    nodeId: 'c11_chem_020',
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A 100-Watt laser emits light with wavelength λ = 600 nm (ν = 5.0 × 10¹⁴ Hz). How many photons are emitted per second? (Enter value in 10²⁰ photons/s):',
    correctAnswer: 3.02,
    tolerance: 0.2,
    explanation: 'E_photon = h·ν = 6.626 × 10⁻³⁴ × 5.0 × 10¹⁴ = 3.313 × 10⁻¹⁹ J. Photons/s = Power / E_photon = 100 / (3.313 × 10⁻¹⁹) = 3.018 × 10²⁰ photons/s.',
    hints: ['Calculate single photon energy first E = h·ν.', 'Divide 100 Joules by photon energy.', 'Value is around 3 × 10²⁰.'],
  },
  {
    id: 'ch_20',
    nodeId: 'c11_chem_013',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'In a modified Millikan experiment, four drops are recorded with charges: 3.2 × 10⁻¹⁹ C, 4.8 × 10⁻¹⁹ C, 6.4 × 10⁻¹⁹ C, and 9.6 × 10⁻¹⁹ C. What is the greatest common divisor (quantized elementary charge e) implied by these data?',
    options: ['1.6 × 10⁻¹⁹ C', '3.2 × 10⁻¹⁹ C', '0.8 × 10⁻¹⁹ C', '4.8 × 10⁻¹⁹ C'],
    correctIndex: 0,
    explanation: 'The greatest common factor is 1.6 × 10⁻¹⁹ C (multiples: 2, 3, 4, 6).',
    hints: ['Find the largest number that divides into all 4 charges.', '3.2 = 2 × 1.6', '4.8 = 3 × 1.6'],
  },
  {
    id: 'ch_21',
    nodeId: 'c11_chem_017',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'According to classical electrodynamics (Larmor formula), why was Rutherford’s planetary atomic model unstable?',
    options: [
      'Accelerating orbiting electrons must continuously radiate electromagnetic energy and spiral into the nucleus within 10⁻¹⁰ seconds.',
      'Electrons would collide with neutrons due to gravitational force.',
      'Positive nuclei would decay into alpha particles spontaneously.',
      'Electrons would gain infinite mass at speed of light.'
    ],
    correctIndex: 0,
    explanation: 'Classical electrodynamics states any accelerating charge emits radiation, causing the electron to lose kinetic energy and collapse into the nucleus.',
    hints: ['Accelerated charges radiate energy.', 'Loss of energy causes orbit to shrink.', 'Classical physics predicts nuclear collapse.'],
  },
  {
    id: 'ch_22',
    nodeId: 'c11_chem_015',
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'In Chadwick’s experiment, a neutron collides elastically head-on with a stationary proton (mass m_p ≈ m_n). What fraction of the neutron’s initial kinetic energy is transferred to the recoil proton?',
    correctAnswer: 1.0,
    tolerance: 0.05,
    explanation: 'For equal masses in a head-on elastic collision, 100% (fraction = 1.0) of kinetic energy is transferred from incident particle to target particle.',
    hints: ['Think of equal mass billiard balls colliding head-on.', 'The moving ball comes to a complete stop.', 'Target ball takes all kinetic energy.'],
  }
];

// ==========================================
// SVG DIAGRAM 1: CATHODE RAY & e/m APPARATUS
// ==========================================
const CathodeRayTubeSVG: React.FC<{
  voltage: number;
  eField: number;
  mField: number;
  gasType: string;
}> = ({ voltage, eField, mField, gasType }) => {
  // Calculate beam deflection path
  const netForce = eField - mField * 1.5;
  const defY = Math.max(-60, Math.min(60, netForce * 12));
  const pathD = `M 80 120 Q 220 120, 360 ${120 + defY}`;

  return (
    <svg viewBox="0 0 450 240" className="w-full h-auto bg-slate-900 rounded-lg border border-slate-700 shadow-inner">
      <defs>
        <radialGradient id="screenGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#22c55e" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="glassTube" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.15" />
          <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.2" />
        </linearGradient>
      </defs>

      {/* Discharge Tube Glass Outer Outline */}
      <path
        d="M 40 90 L 150 90 C 220 90, 260 60, 360 60 L 380 60 L 380 180 L 360 180 C 260 180, 220 150, 150 150 L 40 150 Z"
        fill="url(#glassTube)"
        stroke="#0284c7"
        strokeWidth="2.5"
      />

      {/* Cathode (- Electrode) */}
      <rect x="50" y="95" width="8" height="50" fill="#cbd5e1" stroke="#64748b" strokeWidth="1.5" />
      <text x="54" y="85" fill="#f87171" fontSize="12" fontWeight="bold" textAnchor="middle">- Cathode</text>

      {/* Anode (+ Collimator Electrode with hole) */}
      <rect x="130" y="95" width="8" height="20" fill="#fbbf24" />
      <rect x="130" y="125" width="8" height="20" fill="#fbbf24" />
      <text x="134" y="85" fill="#60a5fa" fontSize="12" fontWeight="bold" textAnchor="middle">+ Anode</text>

      {/* High Voltage Connection Wire */}
      <path d="M 54 145 L 54 210 L 134 210 L 134 145" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 2" />
      <rect x="75" y="198" width="38" height="24" rx="4" fill="#1e293b" stroke="#f59e0b" />
      <text x="94" y="214" fill="#f59e0b" fontSize="10" textAnchor="middle" fontWeight="bold">{voltage} kV</text>

      {/* Electric Deflection Plates */}
      <rect x="200" y="70" width="80" height="8" fill="#ef4444" rx="2" />
      <text x="240" y="65" fill="#ef4444" fontSize="10" textAnchor="middle">+ Plate (E={eField}kV/m)</text>
      <rect x="200" y="162" width="80" height="8" fill="#3b82f6" rx="2" />
      <text x="240" y="183" fill="#3b82f6" fontSize="10" textAnchor="middle">- Plate</text>

      {/* Magnetic Helmholtz Coil Visual Indicator */}
      <circle cx="240" cy="120" r="38" fill="none" stroke="#a855f7" strokeWidth="2" strokeDasharray="3 3" opacity="0.7" />
      <text x="240" y="124" fill="#c084fc" fontSize="10" textAnchor="middle">B Field: {mField} mT</text>

      {/* Cathode Ray Beam */}
      <path d={pathD} fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" />
      <circle cx={360} cy={120 + defY} r="6" fill="#4ade80" />
      <circle cx={360} cy={120 + defY} r="14" fill="url(#screenGlow)" />

      {/* Phosphorescent Screen */}
      <line x1="370" y1="50" x2="370" y2="190" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" />
      <text x="410" y="124" fill="#4ade80" fontSize="11" textAnchor="middle">Screen</text>
      <text x="410" y="140" fill="#94a3b8" fontSize="9" textAnchor="middle">Y: {(-defY / 10).toFixed(1)} cm</text>

      {/* Gas Ionization Indicator */}
      <text x="180" y="225" fill="#38bdf8" fontSize="11" fontWeight="bold">Gas Fill: {gasType}</text>
    </svg>
  );
};

// ==========================================
// SVG DIAGRAM 2: MILLIKAN OIL DROP APPARATUS
// ==========================================
const MillikanApparatusSVG: React.FC<{
  plateVoltage: number;
  dropRadius: number;
  dropletCharge: number;
  xRayOn: boolean;
}> = ({ plateVoltage, dropRadius, dropletCharge, xRayOn }) => {
  // Balance calculations: Fg down, Fe up
  const gravity = dropRadius * dropRadius * 0.08;
  const electric = dropletCharge * (plateVoltage / 1000) * 0.12;
  const netForce = electric - gravity; // positive means moving up
  const motionY = Math.max(-30, Math.min(30, netForce * 5));

  return (
    <svg viewBox="0 0 450 240" className="w-full h-auto bg-slate-900 rounded-lg border border-slate-700 shadow-inner">
      <defs>
        <radialGradient id="atomizerSpray" cx="0%" cy="50%" r="100%">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Chamber Outline */}
      <rect x="50" y="30" width="350" height="180" fill="#0f172a" stroke="#475569" strokeWidth="3" rx="8" />

      {/* Top Positive Plate */}
      <rect x="90" y="60" width="270" height="12" fill="#ef4444" rx="2" />
      {/* Hole in top plate */}
      <rect x="220" y="60" width="10" height="12" fill="#0f172a" />
      <text x="225" y="52" fill="#f87171" fontSize="11" fontWeight="bold" textAnchor="middle">+ Positive Plate (+{plateVoltage} V)</text>

      {/* Bottom Grounded Plate */}
      <rect x="90" y="170" width="270" height="12" fill="#3b82f6" rx="2" />
      <text x="225" y="198" fill="#60a5fa" fontSize="11" fontWeight="bold" textAnchor="middle">- Grounded Plate (0 V)</text>

      {/* Atomizer Nozzle */}
      <path d="M 20 70 L 60 65 L 60 75 Z" fill="#94a3b8" />
      <path d="M 60 67 Q 140 68, 220 65" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 3" />
      <text x="35" y="58" fill="#cbd5e1" fontSize="10">Atomizer</text>

      {/* X-Ray Source */}
      {xRayOn && (
        <g>
          <path d="M 390 115 L 320 115" stroke="#a855f7" strokeWidth="3" strokeDasharray="4 2" />
          <polygon points="320,110 310,115 320,120" fill="#c084fc" />
          <text x="410" y="110" fill="#c084fc" fontSize="10" textAnchor="middle">X-Ray Ionizer</text>
        </g>
      )}

      {/* Microscope Viewfinder Circle */}
      <circle cx="225" cy="115" r="45" fill="#0284c7" fillOpacity="0.1" stroke="#38bdf8" strokeWidth="2" />
      <line x1="180" y1="115" x2="270" y2="115" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="2 2" />
      <line x1="225" y1="70" x2="225" y2="160" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="2 2" />

      {/* Droplet in Chamber */}
      <circle cx="225" cy={115 - motionY} r={Math.max(3, dropRadius * 1.5)} fill="#f59e0b" stroke="#fef08a" strokeWidth="1.5" />

      {/* Force Vectors */}
      {/* Gravity vector (Down) */}
      <line x1="225" y1={115 - motionY} x2="225" y2={115 - motionY + gravity * 15} stroke="#ef4444" strokeWidth="2" strokeDasharray="2 1" />
      <text x="240" y={115 - motionY + gravity * 10} fill="#ef4444" fontSize="10">Fg</text>

      {/* Electrostatic Vector (Up) */}
      <line x1="225" y1={115 - motionY} x2="225" y2={115 - motionY - electric * 15} stroke="#22c55e" strokeWidth="2" />
      <text x="240" y={115 - motionY - electric * 10} fill="#22c55e" fontSize="10">Fe</text>

      {/* Status Banner */}
      <text x="225" y="225" fill="#e2e8f0" fontSize="11" textAnchor="middle" fontWeight="bold">
        {Math.abs(netForce) < 0.2 ? '⚡ HOVER BALANCED (Fe = Fg)' : netForce > 0 ? '⬆ RISING (Fe > Fg)' : '⬇ FALLING (Fg > Fe)'}
      </text>
    </svg>
  );
};

// ==========================================
// SVG DIAGRAM 3: RUTHERFORD SCATTERING APPARATUS
// ==========================================
const RutherfordScatteringSVG: React.FC<{
  foilMaterial: string;
  impactParam: number;
  alphaSpeed: number;
}> = ({ foilMaterial, impactParam, alphaSpeed }) => {
  const ZVal = foilMaterial === 'Gold (Au)' ? 79 : foilMaterial === 'Copper (Cu)' ? 29 : 13;
  // Calculate scattering trajectory angle based on Z and impact parameter b
  const scatterAngle = Math.min(170, Math.max(5, (ZVal * 8) / (impactParam * alphaSpeed + 0.1)));

  // Trajectory path generator
  const angleRad = (scatterAngle * Math.PI) / 180;
  const endX = 220 + Math.cos(angleRad) * 120;
  const endY = 120 - Math.sin(angleRad) * 120;

  return (
    <svg viewBox="0 0 450 240" className="w-full h-auto bg-slate-900 rounded-lg border border-slate-700 shadow-inner">
      {/* Alpha Particle Source Box */}
      <rect x="30" y="95" width="50" height="50" fill="#334155" stroke="#64748b" strokeWidth="2" rx="4" />
      <circle cx="55" cy="120" r="10" fill="#dc2626" />
      <text x="55" y="124" fill="#ffffff" fontSize="9" textAnchor="middle" fontWeight="bold">226Ra</text>
      <text x="55" y="160" fill="#94a3b8" fontSize="10" textAnchor="middle">Alpha Source</text>

      {/* Lead Collimator Slit */}
      <rect x="110" y="60" width="12" height="45" fill="#475569" />
      <rect x="110" y="135" width="12" height="45" fill="#475569" />

      {/* Circular ZnS Detector Screen */}
      <circle cx="220" cy="120" r="95" fill="none" stroke="#22c55e" strokeWidth="2" strokeDasharray="4 4" opacity="0.6" />
      <text x="220" y="20" fill="#4ade80" fontSize="10" textAnchor="middle">ZnS Phosphorescent Detector Screen</text>

      {/* Gold Target Foil in Center */}
      <rect x="218" y="70" width="4" height="100" fill="#f59e0b" stroke="#fbbf24" strokeWidth="1" />
      <text x="220" y="60" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle">{foilMaterial} Target Foil</text>

      {/* Incoming Alpha Beam */}
      <line x1="65" y1="120" x2="218" y2={120 + impactParam * 4} stroke="#ef4444" strokeWidth="2.5" />

      {/* Deflected Alpha Beam Trajectory */}
      <path
        d={`M 65 ${120 + impactParam * 4} L 218 ${120 + impactParam * 4} Q 230 ${120 + impactParam * 4}, ${endX} ${endY}`}
        fill="none"
        stroke="#f43f5e"
        strokeWidth="2.5"
        strokeDasharray="2 2"
      />

      {/* Scintillation Flash Spot on Screen */}
      <circle cx={endX} cy={endY} r="5" fill="#facc15" />
      <circle cx={endX} cy={endY} r="10" fill="#facc15" opacity="0.4" />

      {/* Angle Notation */}
      <text x="320" y="40" fill="#fef08a" fontSize="12" fontWeight="bold">
        Scattering Angle θ = {scatterAngle.toFixed(1)}°
      </text>
      <text x="320" y="60" fill="#cbd5e1" fontSize="10">
        Impact Parameter b = {impactParam} pm
      </text>
      <text x="320" y="78" fill="#cbd5e1" fontSize="10">
        Nuclear Charge Z = +{ZVal}e
      </text>
    </svg>
  );
};

// ==========================================
// MAIN COMPONENT
// ==========================================
export const C11_ChemistryDiscoveryofsubatomicparticlesSim: React.FC<SimProps> = ({
  initialNodeId = 'c11_chem_011',
  onComplete,
  studentId = 'student_default'
}) => {
  // Tab State
  const [activeTab, setActiveTab] = useState<'discovery' | 'lab' | 'challenges' | 'summary'>('discovery');
  const [activeLabIndex, setActiveLabIndex] = useState<number>(0);

  // Active Chemistry Concepts Node
  const [currentNodeId, setCurrentNodeId] = useState<NodeId>(initialNodeId);

  // SRS & BKT State
  const [bktStateMap, setBktStateMap] = useState<Record<string, BKTState>>(() => {
    const initialMap: Record<string, BKTState> = {};
    ALL_NODE_IDS.forEach(id => {
      initialMap[id] = createBKTState();
    });
    return initialMap;
  });

  const [srsItems, setSrsItems] = useState<Record<string, SRSItem>>(() => {
    const initialMap: Record<string, SRSItem> = {};
    ALL_NODE_IDS.forEach(id => {
      initialMap[id] = createReviewItem(id);
    });
    return initialMap;
  });

  // Discovery Question State
  const [selectedDiscoveryOption, setSelectedDiscoveryOption] = useState<number | null>(null);
  const [discoverySubmitted, setDiscoverySubmitted] = useState<boolean>(false);

  // Lab Interactive Controls State
  // Lab 1: Cathode Tube
  const [voltage, setVoltage] = useState<number>(10); // kV
  const [eField, setEField] = useState<number>(3.0); // kV/m
  const [mField, setMField] = useState<number>(2.0); // mT
  const [cathodeGas, setCathodeGas] = useState<string>('Residual Air');

  // Lab 2: Millikan
  const [millikanVoltage, setMillikanVoltage] = useState<number>(1500); // V
  const [dropRadius, setDropRadius] = useState<number>(4); // µm
  const [dropletCharge, setDropletCharge] = useState<number>(3); // x 1.6e-19 C
  const [xRayOn, setXRayOn] = useState<boolean>(true);

  // Lab 3: Anode Rays
  const [anodeGas, setAnodeGas] = useState<string>('Hydrogen (H₂)');

  // Lab 4: Rutherford
  const [foilMaterial, setFoilMaterial] = useState<string>('Gold (Au)');
  const [impactParam, setImpactParam] = useState<number>(3); // pm
  const [alphaSpeed, setAlphaSpeed] = useState<number>(2.0); // x 10^7 m/s

  // Lab 5: Chadwick
  const [paraffinDistance, setParaffinDistance] = useState<number>(10); // cm
  const [protonCount, setProtonCount] = useState<number>(1420); // counts/min

  // Observation & Prediction States
  const [predictionAnswers, setPredictionAnswers] = useState<Record<number, number>>({});
  const [observationAnswers, setObservationAnswers] = useState<Record<number, number>>({});

  // Challenge Mode State
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState<number>(0);
  const [challengeAnswers, setChallengeAnswers] = useState<Record<string, unknown>>({});
  const [numericInputs, setNumericInputs] = useState<Record<string, string>>({});
  const [challengeFeedback, setChallengeFeedback] = useState<Record<string, boolean | null>>({});

  // UI Feedback Flags
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [sparklePos, setSparklePos] = useState<{ x: number; y: number }>({ x: 400, y: 300 });
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHint, setCurrentHint] = useState<string>('');

  // Diagnostic Quiz State
  const [diagnosticAnswers, setDiagnosticAnswers] = useState<Record<string, number>>({});
  const [diagnosticSubmitted, setDiagnosticSubmitted] = useState<boolean>(false);

  // Inactivity Timer for Auto-Hint
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      const activeChallenge = CHALLENGES[currentChallengeIndex];
      if (activeChallenge && activeTab === 'challenges') {
        setCurrentHint(activeChallenge.hints[0]);
        setShowHint(true);
        audioManager.play('hint');
      }
    }, 12000);
  }, [currentChallengeIndex, activeTab]);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [resetInactivityTimer, currentChallengeIndex, activeTab]);

  // Handle Discovery Submission
  const handleDiscoverySubmit = () => {
    setDiscoverySubmitted(true);
    if (selectedDiscoveryOption === DISCOVERY_QUESTION.correctIndex) {
      audioManager.play('celebration');
      speechManager.speak('Excellent discovery intuition! Rutherford scattering proved the nuclear structure of atoms.');
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    } else {
      audioManager.play('error');
      speechManager.speak('Not quite. Review the alpha scattering intuition.');
    }
  };

  // Challenge Answer Handlers
  const handleChallengeSubmit = (challenge: Challenge) => {
    let isCorrect = false;

    if (challenge.type === 'multiple-choice') {
      const selected = challengeAnswers[challenge.id] as number;
      isCorrect = selected === challenge.correctIndex;
    } else if (challenge.type === 'numeric') {
      const val = parseFloat(numericInputs[challenge.id] || '');
      const expected = challenge.correctAnswer as number;
      const tol = challenge.tolerance || 0.1;
      isCorrect = !isNaN(val) && Math.abs(val - expected) <= tol;
    }

    setChallengeFeedback(prev => ({ ...prev, [challenge.id]: isCorrect }));

    // Update BKT & SRS
    const currentBKT = bktStateMap[challenge.nodeId] || createBKTState();
    const updatedBKT = bktUpdate(currentBKT, isCorrect);
    setBktStateMap(prev => ({ ...prev, [challenge.nodeId]: updatedBKT }));

    const currentSRS = srsItems[challenge.nodeId] || createReviewItem(challenge.nodeId);
    const updatedSRS = sm2Update(currentSRS, isCorrect ? 5 : 1);
    setSrsItems(prev => ({ ...prev, [challenge.nodeId]: updatedSRS }));

    if (isCorrect) {
      audioManager.play('drop-correct');
      speechManager.speak('Correct analysis! Outstanding work.');
      setShowSparkle(true);
      setSparklePos({ x: window.innerWidth / 2, y: window.innerHeight / 3 });
      setTimeout(() => setShowSparkle(false), 2000);
    } else {
      audioManager.play('drop-wrong');
      speechManager.speak('Incorrect calculation. Review the hint and try again.');
    }
  };

  // Next Challenge Navigation
  const handleNextChallenge = () => {
    if (currentChallengeIndex < CHALLENGES.length - 1) {
      setCurrentChallengeIndex(prev => prev + 1);
      audioManager.play('whoosh');
    } else {
      // Calculate total overall score
      let correctCount = 0;
      CHALLENGES.forEach(c => {
        if (challengeFeedback[c.id] === true) correctCount++;
      });
      const finalScore = Math.round((correctCount / CHALLENGES.length) * 100);
      recordGameScore('discovery_subatomic_particles', finalScore);

      if (onComplete) onComplete(finalScore);
      audioManager.play('celebration');
      speechManager.speak(`Congratulations! You completed all challenges with a score of ${finalScore} percent.`);
      setShowSuccessBanner(true);
      setActiveTab('summary');
    }
  };

  // Diagnostic Scoring
  const handleDiagnosticSubmit = () => {
    setDiagnosticSubmitted(true);
    let correct = 0;
    DIAGNOSTIC_QUESTIONS.forEach(q => {
      if (diagnosticAnswers[q.id] === q.correctIndex) correct++;
    });
    audioManager.play(correct >= 6 ? 'celebration' : 'chime');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      {/* HEADER SECTION */}
      <header className="max-w-6xl mx-auto mb-8 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-gold-400 uppercase mb-2">
              <span>ISC Class 11 Chemistry</span>
              <span>•</span>
              <span>Chapter 2: Subatomic Structure</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Discovery of Subatomic Particles
            </h1>
            <p className="text-slate-400 mt-2 text-sm max-w-2xl">
              Cathode rays, electron charge-to-mass ratio, Millikan charge quantization, canal rays, neutron scattering, and Rutherford nuclear Coulomb trajectories.
            </p>
          </div>

          {/* TAB NAVIGATION BUTTONS */}
          <div className="flex flex-wrap gap-2 bg-slate-800 p-1.5 rounded-xl border border-slate-700">
            {[
              { id: 'discovery', label: '1. Concept Discovery' },
              { id: 'lab', label: '2. Virtual Lab' },
              { id: 'challenges', label: '3. Challenges (22)' },
              { id: 'summary', label: '4. Diagnostics & Summary' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as typeof activeTab);
                  audioManager.play('tap');
                }}
                className={`px-4 py-2 rounded-lg font-semibold text-xs transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-gold-500 text-white shadow-lg shadow-gold-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* MAIN CONTENT AREA BY TAB */}
      <main className="max-w-6xl mx-auto">
        {/* ========================================== */}
        {/* TAB 1: DISCOVERY & SCENARIO               */}
        {/* ========================================== */}
        {activeTab === 'discovery' && (
          <div className="space-y-8">
            {/* SCENARIO CARD */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
              <div className="flex items-center gap-3 text-amber-400 mb-4">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
                <h2 className="text-xl font-bold">{SCENARIO.title}</h2>
              </div>
              <p className="text-slate-300 leading-relaxed mb-4">{SCENARIO.intro}</p>
              <p className="text-slate-400 text-sm leading-relaxed">{SCENARIO.context}</p>
            </div>

            {/* DISCOVERY QUESTION CARD */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
              <h3 className="text-lg font-bold text-gold-400 mb-4 flex items-center gap-2">
                <span>💡 Discovery Challenge</span>
              </h3>
              <p className="text-slate-200 text-base mb-6 font-medium">{DISCOVERY_QUESTION.question}</p>

              <div className="space-y-3 mb-6">
                {DISCOVERY_QUESTION.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedDiscoveryOption(idx);
                      audioManager.play('tap');
                    }}
                    disabled={discoverySubmitted}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-start gap-3 ${
                      selectedDiscoveryOption === idx
                        ? 'bg-gold-500/10 border-gold-500 text-gold-200'
                        : 'bg-slate-800/50 border-slate-700/60 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="text-sm">{opt}</span>
                  </button>
                ))}
              </div>

              {!discoverySubmitted ? (
                <button
                  onClick={handleDiscoverySubmit}
                  disabled={selectedDiscoveryOption === null}
                  className="w-full py-3 bg-gold-500 hover:bg-gold-400 disabled:opacity-50 text-white font-bold rounded-xl transition-all shadow-lg shadow-gold-500/20"
                >
                  Confirm Discovery Intuition
                </button>
              ) : (
                <div className="p-4 bg-gold-950/60 border border-gold-800 rounded-xl">
                  <p className="text-gold-300 text-sm font-semibold mb-1">Historical Context:</p>
                  <p className="text-slate-300 text-xs leading-relaxed">{DISCOVERY_QUESTION.hintAfter}</p>
                </div>
              )}
            </div>

            {/* MANDATORY PREDICTION QUESTIONS */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl space-y-6">
              <h3 className="text-lg font-bold text-amber-400 flex items-center gap-2">
                <span>🔮 Lab Predictions</span>
              </h3>

              {PREDICTION_QUESTIONS.map((pq, index) => (
                <div key={index} className="p-5 bg-slate-800/40 border border-slate-700/60 rounded-xl space-y-3">
                  <p className="text-slate-200 font-medium text-sm">{pq.question}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {pq.options.map((opt, oIdx) => (
                      <button
                        key={oIdx}
                        onClick={() => {
                          setPredictionAnswers(prev => ({ ...prev, [index]: oIdx }));
                          audioManager.play('tap');
                        }}
                        className={`p-3 rounded-lg border text-xs text-left transition-all ${
                          predictionAnswers[index] === oIdx
                            ? 'bg-amber-500/20 border-amber-500 text-amber-200'
                            : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  {predictionAnswers[index] !== undefined && (
                    <p className="text-xs text-amber-400/90 italic mt-2">
                      💡 How to verify: {pq.verifyInstruction}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* TAB 2: VIRTUAL LAB & INTERACTIVE SIMS      */}
        {/* ========================================== */}
        {activeTab === 'lab' && (
          <div className="space-y-8">
            {/* LAB SELECTOR BAR */}
            <div className="flex overflow-x-auto gap-3 pb-2 scrollbar-thin">
              {EXPLORATION_STEPS.map((lab, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setActiveLabIndex(index);
                    audioManager.play('whoosh');
                  }}
                  className={`px-4 py-3 rounded-xl border text-left shrink-0 transition-all ${
                    activeLabIndex === index
                      ? 'bg-gold-500/20 border-gold-500 text-gold-200 shadow-md'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="text-xs font-bold uppercase tracking-wider text-gold-400 mb-1">
                    Lab Step {index + 1}
                  </div>
                  <div className="text-sm font-semibold">{lab.title}</div>
                </button>
              ))}
            </div>

            {/* LAB STEP DETAILS & INTERACTIVE CANVAS */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* INTERACTION CONTROLS PANEL */}
              <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {EXPLORATION_STEPS[activeLabIndex].title}
                  </h3>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    {EXPLORATION_STEPS[activeLabIndex].instruction}
                  </p>
                </div>

                {/* LAB 1 CONTROLS */}
                {activeLabIndex === 0 && (
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>Anode Accelerator Potential (V)</span>
                        <span className="font-mono text-gold-400">{voltage} kV</span>
                      </div>
                      <input
                        type="range"
                        min="2"
                        max="25"
                        value={voltage}
                        onChange={e => setVoltage(Number(e.target.value))}
                        className="w-full accent-gold-500"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>Electric Field (E)</span>
                        <span className="font-mono text-red-400">{eField} kV/m</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="10"
                        step="0.5"
                        value={eField}
                        onChange={e => setEField(Number(e.target.value))}
                        className="w-full accent-red-500"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>Helmholtz Magnetic Field (B)</span>
                        <span className="font-mono text-purple-400">{mField} mT</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="5"
                        step="0.2"
                        value={mField}
                        onChange={e => setMField(Number(e.target.value))}
                        className="w-full accent-purple-500"
                      />
                    </div>

                    {/* Calculated e/m Display */}
                    <div className="p-4 bg-slate-800/60 rounded-xl border border-slate-700/80 font-mono text-xs space-y-1">
                      <div className="text-slate-400">Undeflected Velocity v = E / B:</div>
                      <div className="text-emerald-400 font-bold text-sm">
                        {mField > 0 ? `${((eField * 1e3) / (mField * 1e-3) / 1e6).toFixed(2)} × 10⁶ m/s` : '∞ (B=0)'}
                      </div>
                      <div className="text-slate-400 pt-1">Derived e/m Ratio:</div>
                      <div className="text-gold-300 font-bold">1.7588 × 10¹¹ C/kg (Constant)</div>
                    </div>
                  </div>
                )}

                {/* LAB 2 CONTROLS */}
                {activeLabIndex === 1 && (
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>Chamber Plate Voltage (V)</span>
                        <span className="font-mono text-gold-400">{millikanVoltage} V</span>
                      </div>
                      <input
                        type="range"
                        min="500"
                        max="3000"
                        step="50"
                        value={millikanVoltage}
                        onChange={e => setMillikanVoltage(Number(e.target.value))}
                        className="w-full accent-gold-500"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>Oil Droplet Radius (r)</span>
                        <span className="font-mono text-amber-400">{dropRadius} µm</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="8"
                        value={dropRadius}
                        onChange={e => setDropRadius(Number(e.target.value))}
                        className="w-full accent-amber-500"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>Ion Charge Multiple (n · e)</span>
                        <span className="font-mono text-emerald-400">{dropletCharge} e</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="6"
                        value={dropletCharge}
                        onChange={e => setDropletCharge(Number(e.target.value))}
                        className="w-full accent-emerald-500"
                      />
                    </div>

                    <div className="flex items-center justify-between p-3 bg-slate-800 rounded-xl">
                      <span className="text-xs text-slate-300">X-Ray Ionizer Beam</span>
                      <button
                        onClick={() => setXRayOn(!xRayOn)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold ${
                          xRayOn ? 'bg-purple-600 text-white' : 'bg-slate-700 text-slate-400'
                        }`}
                      >
                        {xRayOn ? 'ACTIVE' : 'OFF'}
                      </button>
                    </div>
                  </div>
                )}

                {/* LAB 3 CONTROLS */}
                {activeLabIndex === 2 && (
                  <div className="space-y-4">
                    <label className="block text-xs font-semibold text-slate-300 mb-2">
                      Select Residual Gas Fill:
                    </label>
                    {['Hydrogen (H₂)', 'Helium (He)', 'Nitrogen (N₂)', 'Argon (Ar)'].map((gas, gIdx) => (
                      <button
                        key={gIdx}
                        onClick={() => setAnodeGas(gas)}
                        className={`w-full p-3 rounded-xl border text-left text-xs font-semibold transition-all ${
                          anodeGas === gas
                            ? 'bg-gold-500/20 border-gold-500 text-gold-200'
                            : 'bg-slate-800 border-slate-700 text-slate-300'
                        }`}
                      >
                        {gas}
                      </button>
                    ))}
                    <div className="p-3 bg-slate-800/80 rounded-xl text-xs space-y-1">
                      <div className="text-slate-400">Canal Ray Ion:</div>
                      <div className="text-amber-400 font-bold">
                        {anodeGas.includes('Hydrogen') ? 'H⁺ (Proton, m = 1.0 u)' : anodeGas.includes('Helium') ? 'He⁺ (m = 4.0 u)' : anodeGas.includes('Nitrogen') ? 'N⁺ (m = 14.0 u)' : 'Ar⁺ (m = 39.9 u)'}
                      </div>
                      <div className="text-slate-400 pt-1">Ion Specific Charge (e/m):</div>
                      <div className="text-emerald-400 font-bold">
                        {anodeGas.includes('Hydrogen') ? '9.58 × 10⁷ C/kg (MAXIMUM)' : anodeGas.includes('Helium') ? '2.41 × 10⁷ C/kg' : anodeGas.includes('Nitrogen') ? '6.84 × 10⁶ C/kg' : '2.40 × 10⁶ C/kg'}
                      </div>
                    </div>
                  </div>
                )}

                {/* LAB 4 CONTROLS */}
                {activeLabIndex === 3 && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-2">Target Foil Element:</label>
                      <div className="grid grid-cols-3 gap-2">
                        {['Gold (Au)', 'Copper (Cu)', 'Aluminum (Al)'].map(m => (
                          <button
                            key={m}
                            onClick={() => setFoilMaterial(m)}
                            className={`p-2 rounded-lg border text-xs font-bold ${
                              foilMaterial === m ? 'bg-amber-500/20 border-amber-500 text-amber-200' : 'bg-slate-800 border-slate-700 text-slate-400'
                            }`}
                          >
                            {m.split(' ')[0]}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>Impact Parameter (b)</span>
                        <span className="font-mono text-gold-400">{impactParam} pm</span>
                      </div>
                      <input
                        type="range"
                        min="0.5"
                        max="10"
                        step="0.5"
                        value={impactParam}
                        onChange={e => setImpactParam(Number(e.target.value))}
                        className="w-full accent-gold-500"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>Alpha Speed (v₀)</span>
                        <span className="font-mono text-red-400">{alphaSpeed} × 10⁷ m/s</span>
                      </div>
                      <input
                        type="range"
                        min="1.0"
                        max="3.0"
                        step="0.2"
                        value={alphaSpeed}
                        onChange={e => setAlphaSpeed(Number(e.target.value))}
                        className="w-full accent-red-500"
                      />
                    </div>
                  </div>
                )}

                {/* LAB 5 CONTROLS */}
                {activeLabIndex === 4 && (
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>Paraffin Block Distance</span>
                        <span className="font-mono text-gold-400">{paraffinDistance} cm</span>
                      </div>
                      <input
                        type="range"
                        min="2"
                        max="30"
                        value={paraffinDistance}
                        onChange={e => {
                          setParaffinDistance(Number(e.target.value));
                          setProtonCount(Math.round(20000 / (Number(e.target.value) + 2)));
                        }}
                        className="w-full accent-gold-500"
                      />
                    </div>

                    <div className="p-4 bg-slate-800 rounded-xl space-y-2">
                      <div className="text-xs text-slate-400">Ionization Counter Reading:</div>
                      <div className="text-2xl font-mono font-bold text-emerald-400">
                        {protonCount} Recoil Protons / min
                      </div>
                      <p className="text-[11px] text-slate-400 leading-tight">
                        Neutral beryllium radiation (neutrons) knocks high-velocity protons out of paraffin hydrogen molecules through elastic collisions.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* VISUAL DIAGRAM DISPLAY PANEL */}
              <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-center items-center">
                {activeLabIndex === 0 && (
                  <CathodeRayTubeSVG voltage={voltage} eField={eField} mField={mField} gasType={cathodeGas} />
                )}
                {activeLabIndex === 1 && (
                  <MillikanApparatusSVG plateVoltage={millikanVoltage} dropRadius={dropRadius} dropletCharge={dropletCharge} xRayOn={xRayOn} />
                )}
                {activeLabIndex === 2 && (
                  <CathodeRayTubeSVG voltage={12} eField={2.5} mField={1.2} gasType={anodeGas} />
                )}
                {activeLabIndex === 3 && (
                  <RutherfordScatteringSVG foilMaterial={foilMaterial} impactParam={impactParam} alphaSpeed={alphaSpeed} />
                )}
                {activeLabIndex === 4 && (
                  <div className="w-full p-6 bg-slate-950 rounded-xl border border-slate-800 text-center space-y-4">
                    <div className="text-sm font-bold text-gold-400">Chadwick Neutron Bombardment Chamber</div>
                    <div className="flex items-center justify-between gap-2 p-4 bg-slate-900 rounded-lg">
                      <div className="p-3 bg-red-900/40 border border-red-700 rounded-lg text-xs font-bold text-red-300">
                        Alpha Beam (⁴He²⁺)
                      </div>
                      <div className="text-slate-500">➔</div>
                      <div className="p-3 bg-emerald-900/40 border border-emerald-700 rounded-lg text-xs font-bold text-emerald-300">
                        ⁹Be Target
                      </div>
                      <div className="text-slate-500">➔</div>
                      <div className="p-3 bg-purple-900/40 border border-purple-700 rounded-lg text-xs font-bold text-purple-300">
                        Neutron Beam (¹n)
                      </div>
                      <div className="text-slate-500">➔</div>
                      <div className="p-3 bg-amber-900/40 border border-amber-700 rounded-lg text-xs font-bold text-amber-300">
                        Paraffin Wax (H)
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* MANDATORY OBSERVATION QUESTIONS */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl space-y-6">
              <h3 className="text-lg font-bold text-emerald-400 flex items-center gap-2">
                <span>👁 Lab Observations</span>
              </h3>

              {OBSERVATION_QUESTIONS.map((obs, idx) => (
                <div key={idx} className="p-5 bg-slate-800/40 border border-slate-700/60 rounded-xl space-y-3">
                  <p className="text-slate-200 font-medium text-sm">{obs.question}</p>
                  <div className="space-y-2">
                    {obs.observableOptions.map((opt, oIdx) => (
                      <button
                        key={oIdx}
                        onClick={() => {
                          setObservationAnswers(prev => ({ ...prev, [idx]: oIdx }));
                          audioManager.play('tap');
                        }}
                        className={`w-full text-left p-3 rounded-lg border text-xs transition-all ${
                          observationAnswers[idx] === oIdx
                            ? 'bg-emerald-500/20 border-emerald-500 text-emerald-200'
                            : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
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
        )}

        {/* ========================================== */}
        {/* TAB 3: 22 PROGRESSIVE CHALLENGES          */}
        {/* ========================================== */}
        {activeTab === 'challenges' && (
          <div className="space-y-6">
            {/* PROGRESS TRACKER BAR */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-400">Challenge</span>
                <span className="px-3 py-1 bg-gold-500/20 border border-gold-500 text-gold-300 font-mono text-xs font-bold rounded-full">
                  {currentChallengeIndex + 1} of {CHALLENGES.length}
                </span>
                <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider ${
                  CHALLENGES[currentChallengeIndex].difficulty === 'foundation'
                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                    : CHALLENGES[currentChallengeIndex].difficulty === 'standard'
                    ? 'bg-amber-950 text-amber-400 border border-amber-800'
                    : 'bg-rose-950 text-rose-400 border border-rose-800'
                }`}>
                  {CHALLENGES[currentChallengeIndex].difficulty}
                </span>
              </div>

              {/* HINT BUTTON */}
              <button
                onClick={() => {
                  const c = CHALLENGES[currentChallengeIndex];
                  setCurrentHint(c.hints[0]);
                  setShowHint(true);
                  audioManager.play('hint');
                }}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-bold rounded-lg border border-slate-700 transition-all flex items-center gap-1.5"
              >
                <span>💡 Hint</span>
              </button>
            </div>

            {/* ACTIVE CHALLENGE CARD */}
            {(() => {
              const challenge = CHALLENGES[currentChallengeIndex];
              const isCorrect = challengeFeedback[challenge.id] === true;
              const isSubmitted = challengeFeedback[challenge.id] !== undefined;

              return (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl space-y-6">
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-gold-400 uppercase tracking-widest">
                      Competency: {challenge.competencyLevel}
                    </span>
                    <h3 className="text-lg md:text-xl font-bold text-white leading-relaxed">
                      {challenge.question}
                    </h3>
                  </div>

                  {/* MULTIPLE CHOICE TYPE */}
                  {challenge.type === 'multiple-choice' && challenge.options && (
                    <div className="space-y-3">
                      {challenge.options.map((opt, oIdx) => (
                        <button
                          key={oIdx}
                          onClick={() => {
                            setChallengeAnswers(prev => ({ ...prev, [challenge.id]: oIdx }));
                            audioManager.play('tap');
                          }}
                          disabled={isSubmitted}
                          className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3 ${
                            challengeAnswers[challenge.id] === oIdx
                              ? 'bg-gold-500/15 border-gold-500 text-gold-200'
                              : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800'
                          }`}
                        >
                          <span className="w-6 h-6 rounded-full bg-slate-700 text-xs font-bold flex items-center justify-center shrink-0">
                            {String.fromCharCode(65 + oIdx)}
                          </span>
                          <span className="text-sm font-medium">{opt}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* NUMERIC TYPE */}
                  {challenge.type === 'numeric' && (
                    <div className="space-y-3">
                      <label className="block text-xs text-slate-400 font-semibold">
                        Enter Calculated Value:
                      </label>
                      <input
                        type="number"
                        step="any"
                        placeholder="Type numerical answer..."
                        value={numericInputs[challenge.id] || ''}
                        onChange={e => setNumericInputs({ ...numericInputs, [challenge.id]: e.target.value })}
                        disabled={isSubmitted}
                        className="w-full max-w-xs p-3 bg-slate-950 border border-slate-700 rounded-xl font-mono text-emerald-400 text-lg focus:border-gold-500 focus:outline-none"
                      />
                    </div>
                  )}

                  {/* SUBMIT / NEXT BUTTONS */}
                  {!isSubmitted ? (
                    <button
                      onClick={() => handleChallengeSubmit(challenge)}
                      className="w-full py-3.5 bg-gold-500 hover:bg-gold-400 text-white font-bold rounded-xl shadow-lg shadow-gold-500/25 transition-all"
                    >
                      Check Answer
                    </button>
                  ) : (
                    <div className="space-y-4 pt-2">
                      <div className={`p-4 rounded-xl border ${
                        isCorrect ? 'bg-emerald-950/60 border-emerald-700 text-emerald-300' : 'bg-rose-950/60 border-rose-700 text-rose-300'
                      }`}>
                        <div className="font-bold text-sm mb-1">
                          {isCorrect ? '✓ Correct Answer!' : '✗ Incorrect Answer'}
                        </div>
                        <p className="text-xs leading-relaxed opacity-90">{challenge.explanation}</p>
                      </div>

                      <button
                        onClick={handleNextChallenge}
                        className="w-full py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl border border-slate-700 transition-all flex items-center justify-center gap-2"
                      >
                        <span>Next Challenge</span>
                        <span>➔</span>
                      </button>
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        )}

        {/* ========================================== */}
        {/* TAB 4: DIAGNOSTICS & SUMMARY              */}
        {/* ========================================== */}
        {activeTab === 'summary' && (
          <div className="space-y-8">
            {/* REAL WORLD ACTIVITY SECTION */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl space-y-4">
              <div className="flex items-center gap-2 text-gold-400 font-bold text-lg">
                <span>🚀 Real-World Extension Activity</span>
              </div>
              <h3 className="text-xl font-extrabold text-white">{REAL_WORLD_ACTIVITY.title}</h3>
              <p className="text-slate-300 text-sm leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
              <div className="space-y-2 pt-2">
                {REAL_WORLD_ACTIVITY.steps.map((step, sIdx) => (
                  <div key={sIdx} className="p-3 bg-slate-800/60 rounded-lg text-xs text-slate-300 font-mono">
                    {step}
                  </div>
                ))}
              </div>
            </div>

            {/* MISCONCEPTIONS REVIEW */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl space-y-4">
              <h3 className="text-lg font-bold text-amber-400 flex items-center gap-2">
                <span>⚠️ Common Misconceptions & Corrections</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MISCONCEPTIONS.map((m, idx) => (
                  <div key={idx} className="p-4 bg-slate-800/40 border border-slate-700/60 rounded-xl space-y-2">
                    <div className="text-amber-300 font-bold text-xs">{m.title}</div>
                    <p className="text-slate-400 text-xs italic">"{m.description}"</p>
                    <p className="text-emerald-300 text-xs font-medium pt-1 border-t border-slate-700/60">
                      ✓ Correction: {m.correction}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* DIAGNOSTIC QUIZ */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl space-y-6">
              <h3 className="text-lg font-bold text-purple-400 flex items-center gap-2">
                <span>📝 Final Diagnostic Assessment</span>
              </h3>

              <div className="space-y-6">
                {DIAGNOSTIC_QUESTIONS.map((dq, dIdx) => (
                  <div key={dIdx} className="p-4 bg-slate-800/30 border border-slate-700/50 rounded-xl space-y-3">
                    <p className="text-slate-200 text-xs font-semibold">{dIdx + 1}. {dq.question}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {dq.options.map((opt, oIdx) => (
                        <button
                          key={oIdx}
                          onClick={() => {
                            setDiagnosticAnswers(prev => ({ ...prev, [dq.id]: oIdx }));
                            audioManager.play('tap');
                          }}
                          disabled={diagnosticSubmitted}
                          className={`p-2.5 rounded-lg border text-xs text-left transition-all ${
                            diagnosticAnswers[dq.id] === oIdx
                              ? 'bg-purple-500/20 border-purple-500 text-purple-200'
                              : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {!diagnosticSubmitted ? (
                <button
                  onClick={handleDiagnosticSubmit}
                  className="w-full py-3.5 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl shadow-lg transition-all"
                >
                  Submit Diagnostic Quiz
                </button>
              ) : (
                <div className="p-4 bg-purple-950/60 border border-purple-800 rounded-xl text-center space-y-1">
                  <div className="text-purple-300 font-bold text-sm">Diagnostic Completed!</div>
                  <p className="text-slate-300 text-xs">
                    Score:{' '}
                    {
                      DIAGNOSTIC_QUESTIONS.filter(q => diagnosticAnswers[q.id] === q.correctIndex).length
                    }{' '}
                    / {DIAGNOSTIC_QUESTIONS.length} Correct
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* FEEDBACK OVERLAY COMPONENTS */}
      <HintBubble show={showHint} text={currentHint} onClose={() => setShowHint(false)} />
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccessBanner} text="Subatomic Discovery Module Complete!" />
      <SparkleBurst show={showSparkle} x={sparklePos.x} y={sparklePos.y} />
    </div>
  );
};

export default C11_ChemistryDiscoveryofsubatomicparticlesSim;