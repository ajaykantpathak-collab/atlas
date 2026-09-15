'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  audioManager,
  speechManager,
  Confetti,
  SuccessBanner,
  HintBubble,
  SparkleBurst
} from '../../../lib/sim-engine';
import type { SoundEffect } from '../../../lib/sim-engine/types';
import { createReviewItem, sm2Update, SRSItem } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, BKTState } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';
import {
  Atom,
  Flame,
  Zap,
  Activity,
  Compass,
  Layers,
  Award,
  ChevronRight,
  HelpCircle,
  RotateCcw,
  Volume2,
  VolumeX,
  CheckCircle2,
  XCircle,
  BarChart2,
  Sparkles,
  Info,
  Beaker,
  Eye,
  TrendingUp,
  Cpu,
  Droplets,
  Radio,
  BookOpen,
  Sliders,
  Check,
  ArrowRight,
  ShieldAlert,
  Play,
  Pause
} from 'lucide-react';

// ==========================================
// CONSTANTS & NODE DEFINITIONS
// ==========================================

const ALL_NODE_IDS = [
  'c12_chem_051',
  'c12_chem_052',
  'c12_chem_053',
  'c12_chem_054',
  'c12_chem_055',
  'c12_chem_056',
  'c12_chem_057',
  'c12_chem_058',
  'c12_chem_059',
  'c12_chem_060'
] as const;

type NodeId = typeof ALL_NODE_IDS[number];

// ==========================================
// MANDATORY SECTIONS
// ==========================================

const SCENARIO = {
  title: 'ISC Transition Metals Advanced Dynamics Lab',
  intro: 'Welcome to the High-Precision Spectroscopy and Electrochemistry Laboratory at the CISCE Advanced Science Research Center. As lead inorganic chemist, you will analyze the physical, magnetic, optical, and catalytic properties of the 3d transition metal series.',
  context: 'You will manipulate electronic configurations, measure ionization energies, observe d-d crystal field absorption, quantify spin-only magnetic moments, and synthesize interstitial alloys to solve critical industrial problems.'
};

const DISCOVERY_QUESTION = {
  question: 'Why does Zinc (Zn, Z=30) have a lower melting point (419°C) and enthalpy of atomization (126 kJ/mol) than Chromium (Cr, Z=24, MP 1907°C), despite Zinc having a higher atomic mass and greater nuclear charge?',
  options: [
    'Zinc forms weak ionic bonds in solid metallic state while Chromium forms covalent networks.',
    'Zinc has a fully filled 3d10 4s2 configuration, so d-electrons do not participate in metallic bonding, whereas Chromium has max unpaired electrons (3d5 4s1) contributing strong d-d overlapping.',
    'Zinc undergoes rapid lattice oxidation under ambient room pressure.',
    'Chromium possesses a smaller nuclear charge which allows outer 4s electrons to expand freely into giant delocalized metallic clouds.'
  ],
  correctIndex: 1,
  hintAfter: 'Zinc has no unpaired 3d electrons (3d10). Metallic bond strength in d-block elements depends heavily on the participation of (n-1)d unpaired electrons in metallic lattice binding.'
};

const DEFAULT_PROPS = {
  initialNodeId: 'c12_chem_051' as NodeId
};

const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Ground Configuration & Cation Ionization',
    instruction: 'Select any 3d metal from Sc to Zn. Remove electrons sequentially to observe why 4s electrons are lost before 3d electrons during cation formation.',
    interactionType: 'configuration_builder',
    nodeId: 'c12_chem_051'
  },
  {
    title: 'Lab 2: Periodic Trend Curves (Radii, IE, Atomization Enthalpy)',
    instruction: 'Toggle between Atomic Radius, Ionization Energies (1st, 2nd, 3rd), and Atomization Enthalpy to identify anomalous inflection points at Cr, Mn, and Zn.',
    interactionType: 'trend_analyzer',
    nodeId: 'c12_chem_053'
  },
  {
    title: 'Lab 3: Variable Oxidation States & Reduction Potentials',
    instruction: 'Explore oxidation state stability matrices and observe how E°(M²⁺/M) and E°(M³⁺/M²⁺) correlate with half-filled (d5) and fully-filled (d10) stability.',
    interactionType: 'redox_matrix',
    nodeId: 'c12_chem_055'
  },
  {
    title: 'Lab 4: Magnetic Moment & d-d Transition Color Spectrophotometer',
    instruction: 'Adjust crystal field splitting energy (Δo) and select d-electron counts to measure magnetic moment μ = √(n(n+2)) BM and complementary liquid solution color.',
    interactionType: 'spectroscopy_lab',
    nodeId: 'c12_chem_058'
  },
  {
    title: 'Lab 5: Catalysis Mechanism & Interstitial Lattice Simulator',
    instruction: 'Insert small non-metal atoms (H, C, N) into interstitial transition metal spaces and track mechanical hardness, conductivity, and catalytic activation paths.',
    interactionType: 'catalysis_interstitial',
    nodeId: 'c12_chem_059'
  }
];

const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: What will happen to the third ionization energy of Manganese (Mn, Z=25, 3d5 4s2) compared to Iron (Fe, Z=26, 3d6 4s2)?',
    options: [
      'Mn will have a lower 3rd IE than Fe because Mn is lighter.',
      'Mn will have a significantly higher 3rd IE than Fe because removing the 3rd electron breaks a stable, half-filled 3d5 shell.',
      'Both Mn and Fe will have identical 3rd IE values because both lose 4s electrons first.',
      'Fe will have a higher 3rd IE because Fe has more protons attracting outer orbitals.'
    ],
    correctIndex: 1,
    verifyInstruction: 'Open Lab 2 in the exploration tab, toggle to "3rd Ionization Energy", and compare the peak at Mn (3248 kJ/mol) versus Fe (2957 kJ/mol).',
    nodeId: 'c12_chem_054'
  },
  {
    question: 'Predict: Aqueous Cu⁺ ions are unstable and undergo disproportionation into Cu²⁺(aq) and Cu(s). Why is Cu²⁺(aq) more stable than Cu⁺(aq) in aqueous solution despite Cu²⁺ requiring extra ionization energy?',
    options: [
      'Cu²⁺ forms covalent bonds with oxygen in water.',
      'The hydration enthalpy released by small, highly charged Cu²⁺(aq) far compensates for the second ionization energy of Cu.',
      'Cu⁺ is insoluble in water and immediately precipitates without undergoing redox.',
      'Cu²⁺ has a completely filled d10 configuration in water while Cu⁺ is d9.'
    ],
    correctIndex: 1,
    verifyInstruction: 'Open Lab 3 in the exploration tab, select Copper (Cu), and inspect the aqueous hydration enthalpy versus 2nd ionization energy balance.',
    nodeId: 'c12_chem_056'
  }
];

const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice about the atomic radii across the 3d series from Sc (164 pm) to Zn (137 pm)?',
    observableOptions: [
      'It decreases rapidly and continuously in a linear straight line all the way to Zinc.',
      'It decreases initially from Sc to Cr, stays nearly constant from Fe to Ni, and slightly increases at Zn.',
      'It increases continuously because electrons are added to higher quantum shells.',
      'It fluctuates wildly without any identifiable physical pattern.'
    ],
    correctIndex: 1,
    nodeId: 'c12_chem_053'
  },
  {
    question: 'What happens when light passes through aqueous Ti³⁺ [Ti(H₂O)₆]³⁺ (d¹ configuration)?',
    observableOptions: [
      'It absorbs yellow-green light, promoting its single 3d electron from t₂g to e_g, transmitting a vibrant purple color.',
      'It absorbs UV light and emits bright red fluorescence without d-d excitation.',
      'It absorbs no light and remains completely colorless because d¹ ions cannot interact with photons.',
      'It turns dark brown due to metal-to-ligand charge transfer.'
    ],
    correctIndex: 0,
    nodeId: 'c12_chem_058'
  }
];

const REAL_WORLD_ACTIVITY = {
  title: 'Industrial Synthesis & Analysis of Titanium-Carbide Interstitial Super-Alloy',
  description: 'As a metallurgy specialist at an aerospace manufacturing facility, engineer a high-performance turbine blade material by trapping Carbon atoms into Titanium interstitial crystal gaps.',
  steps: [
    'Measure pure Titanium metallic unit cell density and hardness index (Vickers scale ~160 HV).',
    'Diffractive diffusion: Heat Ti lattice to 1200°C under carbon gas to embed carbon atoms (radius 77 pm) into octahedral voids without altering the metallic close-packed host geometry.',
    'Analyze resulting Titanium Carbide (TiC): Observe dramatic hardness increase to 2800 HV while maintaining high electrical conductivity.',
    'Verify chemical inertness and elevated melting point (3160°C) suited for extreme thermal environments in jet engines.'
  ]
};

// ==========================================
// ELEMENT DATA DATABASE (3d SERIES)
// ==========================================

interface ElementData {
  symbol: string;
  name: string;
  z: number;
  configGround: string;
  config3d: number;
  config4s: number;
  atomicRadius: number; // pm
  ionicRadiusM2: number; // pm
  enthalpyAtomization: number; // kJ/mol
  meltingPoint: number; // C
  ie1: number; // kJ/mol
  ie2: number;
  ie3: number;
  oxStates: number[];
  principalOx: number[];
  e0M2M: number; // V
  e0M3M2: number | null; // V
  colorM2: string;
  colorM2Hex: string;
  colorM3: string;
  colorM3Hex: string;
  unpairedM2: number;
  unpairedM3: number;
}

const ELEMENTS_3D: ElementData[] = [
  {
    symbol: 'Sc',
    name: 'Scandium',
    z: 21,
    configGround: '[Ar] 3d¹ 4s²',
    config3d: 1,
    config4s: 2,
    atomicRadius: 164,
    ionicRadiusM2: 0, // M2+ not stable
    enthalpyAtomization: 326,
    meltingPoint: 1541,
    ie1: 631,
    ie2: 1235,
    ie3: 2389,
    oxStates: [3],
    principalOx: [3],
    e0M2M: -1.63,
    e0M3M2: null,
    colorM2: 'N/A',
    colorM2Hex: '#e2e8f0',
    colorM3: 'Colorless (d⁰)',
    colorM3Hex: '#f8fafc',
    unpairedM2: 1,
    unpairedM3: 0
  },
  {
    symbol: 'Ti',
    name: 'Titanium',
    z: 22,
    configGround: '[Ar] 3d² 4s²',
    config3d: 2,
    config4s: 2,
    atomicRadius: 147,
    ionicRadiusM2: 86,
    enthalpyAtomization: 473,
    meltingPoint: 1668,
    ie1: 658,
    ie2: 1310,
    ie3: 2652,
    oxStates: [2, 3, 4],
    principalOx: [4],
    e0M2M: -1.63,
    e0M3M2: -0.37,
    colorM2: 'Mushroom / Grey',
    colorM2Hex: '#cbd5e1',
    colorM3: 'Purple (d¹)',
    colorM3Hex: '#a855f7',
    unpairedM2: 2,
    unpairedM3: 1
  },
  {
    symbol: 'V',
    name: 'Vanadium',
    z: 23,
    configGround: '[Ar] 3d³ 4s²',
    config3d: 3,
    config4s: 2,
    atomicRadius: 135,
    ionicRadiusM2: 79,
    enthalpyAtomization: 515,
    meltingPoint: 1910,
    ie1: 650,
    ie2: 1414,
    ie3: 2833,
    oxStates: [2, 3, 4, 5],
    principalOx: [5],
    e0M2M: -1.18,
    e0M3M2: -0.26,
    colorM2: 'Violet (d³)',
    colorM2Hex: '#7e22ce',
    colorM3: 'Green (d²)',
    colorM3Hex: '#22c55e',
    unpairedM2: 3,
    unpairedM3: 2
  },
  {
    symbol: 'Cr',
    name: 'Chromium',
    z: 24,
    configGround: '[Ar] 3d⁵ 4s¹',
    config3d: 5,
    config4s: 1,
    atomicRadius: 129,
    ionicRadiusM2: 82,
    enthalpyAtomization: 397,
    meltingPoint: 1907,
    ie1: 653,
    ie2: 1592,
    ie3: 2987,
    oxStates: [2, 3, 4, 5, 6],
    principalOx: [3, 6],
    e0M2M: -0.91,
    e0M3M2: -0.41,
    colorM2: 'Blue (d⁴)',
    colorM2Hex: '#3b82f6',
    colorM3: 'Violet / Green (d³)',
    colorM3Hex: '#16a34a',
    unpairedM2: 4,
    unpairedM3: 3
  },
  {
    symbol: 'Mn',
    name: 'Manganese',
    z: 25,
    configGround: '[Ar] 3d⁵ 4s²',
    config3d: 5,
    config4s: 2,
    atomicRadius: 137,
    ionicRadiusM2: 83,
    enthalpyAtomization: 281,
    meltingPoint: 1246,
    ie1: 717,
    ie2: 1509,
    ie3: 3248,
    oxStates: [2, 3, 4, 5, 6, 7],
    principalOx: [2, 7],
    e0M2M: -1.18,
    e0M3M2: +1.57,
    colorM2: 'Pale Pink (d⁵)',
    colorM2Hex: '#fbcfe8',
    colorM3: 'Violet (d⁴)',
    colorM3Hex: '#9333ea',
    unpairedM2: 5,
    unpairedM3: 4
  },
  {
    symbol: 'Fe',
    name: 'Iron',
    z: 26,
    configGround: '[Ar] 3d⁶ 4s²',
    config3d: 6,
    config4s: 2,
    atomicRadius: 126,
    ionicRadiusM2: 78,
    enthalpyAtomization: 416,
    meltingPoint: 1538,
    ie1: 759,
    ie2: 1561,
    ie3: 2957,
    oxStates: [2, 3, 4, 6],
    principalOx: [2, 3],
    e0M2M: -0.44,
    e0M3M2: +0.77,
    colorM2: 'Pale Green (d⁶)',
    colorM2Hex: '#86efac',
    colorM3: 'Yellow / Brown (d⁵)',
    colorM3Hex: '#d97706',
    unpairedM2: 4,
    unpairedM3: 5
  },
  {
    symbol: 'Co',
    name: 'Cobalt',
    z: 27,
    configGround: '[Ar] 3d⁷ 4s²',
    config3d: 7,
    config4s: 2,
    atomicRadius: 125,
    ionicRadiusM2: 75,
    enthalpyAtomization: 425,
    meltingPoint: 1495,
    ie1: 760,
    ie2: 1646,
    ie3: 3232,
    oxStates: [2, 3, 4],
    principalOx: [2, 3],
    e0M2M: -0.28,
    e0M3M2: +1.97,
    colorM2: 'Pink / Red (d⁷)',
    colorM2Hex: '#f43f5e',
    colorM3: 'Blue (d⁶)',
    colorM3Hex: '#2563eb',
    unpairedM2: 3,
    unpairedM3: 4
  },
  {
    symbol: 'Ni',
    name: 'Nickel',
    z: 28,
    configGround: '[Ar] 3d⁸ 4s²',
    config3d: 8,
    config4s: 2,
    atomicRadius: 125,
    ionicRadiusM2: 69,
    enthalpyAtomization: 430,
    meltingPoint: 1455,
    ie1: 737,
    ie2: 1753,
    ie3: 3393,
    oxStates: [2, 3, 4],
    principalOx: [2],
    e0M2M: -0.25,
    e0M3M2: null,
    colorM2: 'Emerald Green (d⁸)',
    colorM2Hex: '#10b981',
    colorM3: 'Grey (d⁷)',
    colorM3Hex: '#64748b',
    unpairedM2: 2,
    unpairedM3: 3
  },
  {
    symbol: 'Cu',
    name: 'Copper',
    z: 29,
    configGround: '[Ar] 3d¹⁰ 4s¹',
    config3d: 10,
    config4s: 1,
    atomicRadius: 128,
    ionicRadiusM2: 73,
    enthalpyAtomization: 339,
    meltingPoint: 1085,
    ie1: 745,
    ie2: 1958,
    ie3: 3554,
    oxStates: [1, 2],
    principalOx: [2],
    e0M2M: +0.34,
    e0M3M2: null,
    colorM2: 'Sky Blue (d⁹)',
    colorM2Hex: '#0284c7',
    colorM3: 'N/A',
    colorM3Hex: '#e2e8f0',
    unpairedM2: 1,
    unpairedM3: 2
  },
  {
    symbol: 'Zn',
    name: 'Zinc',
    z: 30,
    configGround: '[Ar] 3d¹⁰ 4s²',
    config3d: 10,
    config4s: 2,
    atomicRadius: 137,
    ionicRadiusM2: 74,
    enthalpyAtomization: 126,
    meltingPoint: 419,
    ie1: 906,
    ie2: 1733,
    ie3: 3833,
    oxStates: [2],
    principalOx: [2],
    e0M2M: -0.76,
    e0M3M2: null,
    colorM2: 'Colorless (d¹⁰)',
    colorM2Hex: '#f8fafc',
    colorM3: 'N/A',
    colorM3Hex: '#e2e8f0',
    unpairedM2: 0,
    unpairedM3: 1
  }
];

// ==========================================
// MISCONCEPTIONS & DIAGNOSTIC QUESTIONS
// ==========================================

const MISCONCEPTIONS = [
  {
    title: 'Atomic Radius Decreases Continuously Across 3d Series',
    misconception: 'Students believe atomic radii decrease linearly from Sc to Zn like main group elements.',
    correction: 'Initial decrease occurs due to increasing nuclear charge, but in the middle (Fe to Ni) screening by added d-electrons balances nuclear pull. At Zn, electron-electron repulsions in the fully filled d10 shell cause a small size increase.',
    nodeId: 'c12_chem_053'
  },
  {
    title: '3d Electrons Lost Before 4s Electrons',
    misconception: 'Students assume 3d electrons are lost first because 3d fills after 4s.',
    correction: 'When transition metal cations form, 4s electrons are lost FIRST. Once 3d orbitals are occupied, effective nuclear charge drops the 3d energy level below 4s, making 4s the valence electrons.',
    nodeId: 'c12_chem_054'
  },
  {
    title: 'All Transition Metals Reach Max Oxidation State Equal to Valence Electrons',
    misconception: 'Students think every element up to Zn can lose all (n-1)d and ns electrons.',
    correction: 'Only elements up to Manganese (Mn, +7) achieve maximum oxidation state equal to all valence electrons (3d5 4s2). Beyond Mn, d-electrons pair up and bond energies become insufficiently high to offset ionization.',
    nodeId: 'c12_chem_055'
  },
  {
    title: 'Catalytic Activity Is Purely Physical Surface Adsorption',
    misconception: 'Students assume transition metals act as catalysts solely by physical surface area.',
    correction: 'Primary catalytic activity stems from variable oxidation states forming active reactive intermediates and d-orbital electron donor-acceptor complexes with reactant molecules.',
    nodeId: 'c12_chem_059'
  },
  {
    title: 'Third Ionization Energy Increases Smoothly Across the Period',
    misconception: 'Students believe IE3 increases uniformly without spikes.',
    correction: 'IE3 exhibits sharp spikes at Mn (3d5 4s2 -> 3d4) and Zn (3d10 4s2 -> 3d9) because breaking half-filled d5 or fully-filled d10 configurations requires immense thermodynamic energy.',
    nodeId: 'c12_chem_054'
  },
  {
    title: 'Zn, Cd, Hg Are Typical Transition Metals',
    misconception: 'Students assume group 12 elements (Zn, Cd, Hg) have characteristic transition metal properties.',
    correction: 'Zn, Cd, Hg have completely filled d-orbitals (d10) in ground state and common oxidation states, so they do NOT exhibit typical properties like variable valency, color, or strong paramagnetism.',
    nodeId: 'c12_chem_051'
  }
];

const DIAGNOSTIC_QUESTIONS = [
  {
    id: 'diag_1',
    question: 'Which element in the 3d series exhibits the maximum enthalpy of atomization and why?',
    options: [
      'Zinc, because it has the highest atomic mass.',
      'Vanadium / Chromium, because of the high number of unpaired d-electrons leading to strong interatomic metallic binding.',
      'Scandium, because it has the lowest atomic number.',
      'Manganese, because it has a half-filled 3d5 shell.'
    ],
    correctIndex: 1,
    explanation: 'Enthalpy of atomization depends on the number of unpaired d-electrons participating in metallic bonding. V (515 kJ/mol) and Cr (397 kJ/mol) have large numbers of unpaired electrons.',
    nodeId: 'c12_chem_052'
  },
  {
    id: 'diag_2',
    question: 'Calculate the spin-only magnetic moment (μ) of a Mn²⁺ ion (Z=25).',
    options: [
      '1.73 BM',
      '3.87 BM',
      '5.92 BM',
      '0.00 BM'
    ],
    correctIndex: 2,
    explanation: 'Mn²⁺ has electron configuration [Ar] 3d⁵. Number of unpaired electrons n = 5. μ = √(n(n+2)) = √(5 × 7) = √35 ≈ 5.92 BM.',
    nodeId: 'c12_chem_057'
  },
  {
    id: 'diag_3',
    question: 'Why is E°(Mn³⁺/Mn²⁺) highly positive (+1.57 V) compared to E°(Fe³⁺/Fe²⁺) (+0.77 V)?',
    options: [
      'Mn²⁺ has a stable half-filled 3d⁵ configuration, making reduction of Mn³⁺ to Mn²⁺ highly favorable.',
      'Fe³⁺ is unstable in water and immediately oxidizes.',
      'Mn³⁺ has a fully filled d10 orbital.',
      'Iron has a greater nuclear charge than Manganese.'
    ],
    correctIndex: 0,
    explanation: 'Mn²⁺ is d⁵ (extra stable half-filled). Removing an electron from Mn²⁺ to form Mn³⁺ breaks d⁵, so Mn³⁺ acts as a strong oxidizing agent (E° = +1.57 V).',
    nodeId: 'c12_chem_056'
  },
  {
    id: 'diag_4',
    question: 'Which of the following aqueous ions is completely colorless?',
    options: [
      'Cu²⁺(aq)',
      'Fe³⁺(aq)',
      'Sc³⁺(aq)',
      'Cr³⁺(aq)'
    ],
    correctIndex: 2,
    explanation: 'Sc³⁺ has electron configuration [Ar] 3d⁰ (empty d-orbitals). No d-d transition is possible, rendering Sc³⁺ colorless in water.',
    nodeId: 'c12_chem_058'
  },
  {
    id: 'diag_5',
    question: 'What structural feature allows interstitial compounds like TiC or FeH to retain metallic conductivity?',
    options: [
      'Small atoms occupy interstitial voids without altering host metal band structure or mobile electron cloud.',
      'Covalent bonds replace all metallic bonds in the host crystal.',
      'Small non-metal atoms remove all free electrons.',
      'The crystal lattice transitions into an amorphous liquid state.'
    ],
    correctIndex: 0,
    explanation: 'Small guest atoms (H, C, N) enter interstitial sites without disrupting the metallic bonding network, preserving electrical conductivity while increasing mechanical hardness.',
    nodeId: 'c12_chem_060'
  },
  {
    id: 'diag_6',
    question: 'In the Contact Process, how does V₂O₅ act as a catalyst for the oxidation of SO₂ to SO₃?',
    options: [
      'By changing its oxidation state between V⁺⁵ and V⁺⁴ to provide an intermediate energy pathway.',
      'By dissolving SO₂ gas into liquid sulfuric acid.',
      'By absorbing heat energy from the surrounding furnace.',
      'By increasing the pressure of the reaction chamber.'
    ],
    correctIndex: 0,
    explanation: 'V₂O₅ oxidizes SO₂ to SO₃ while being reduced to V₂O₄ (V⁺⁴). V₂O₄ is subsequently re-oxidized by O₂ back to V₂O₅ (V⁺⁵).',
    nodeId: 'c12_chem_059'
  },
  {
    id: 'diag_7',
    question: 'What is the ground-state valence electron configuration of Chromium atom (Z=24)?',
    options: [
      '[Ar] 3d⁴ 4s²',
      '[Ar] 3d⁵ 4s¹',
      '[Ar] 3d⁶ 4s⁰',
      '[Ar] 3d³ 4s³'
    ],
    correctIndex: 1,
    explanation: 'Chromium exhibits an anomalous configuration [Ar] 3d⁵ 4s¹ because half-filled 3d⁵ subshell offers exceptional exchange energy and symmetry stability.',
    nodeId: 'c12_chem_051'
  },
  {
    id: 'diag_8',
    question: 'Why does Copper (Cu) show a positive standard reduction potential E°(Cu²⁺/Cu) = +0.34 V?',
    options: [
      'The high enthalpy of atomization and second ionization energy of Cu are not balanced by its hydration enthalpy.',
      'Copper cannot react with oxygen under standard temperature.',
      'Cu²⁺ has an unstable d⁹ configuration.',
      'Copper is a noble metal with zero ionization potential.'
    ],
    correctIndex: 0,
    explanation: 'The total energy required to transform Cu(s) into Cu²⁺(aq) (atomization + 1st IE + 2nd IE) is greater than the hydration energy released, making E° positive.',
    nodeId: 'c12_chem_056'
  }
];

// ==========================================
// 22 PROGRESSIVE CHALLENGES (TIERS 1, 2, 3)
// ==========================================

interface Challenge {
  id: string;
  nodeId: NodeId;
  type: 'multiple_choice' | 'numeric' | 'drag_sort' | 'classification';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: string;
  question: string;
  options?: string[];
  correctIndex?: number;
  correctAnswer?: number | string[];
  tolerance?: number;
  unit?: string;
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
  itemsToSort?: string[];
}

const CHALLENGES: Challenge[] = [
  // FOUNDATION (7)
  {
    id: 'c1',
    nodeId: 'c12_chem_051',
    type: 'multiple_choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall & Understanding',
    question: 'Which of the following transition elements has an anomalous ground-state valence electron configuration with 4s¹?',
    options: ['Titanium (Ti)', 'Chromium (Cr)', 'Manganese (Mn)', 'Iron (Fe)'],
    correctIndex: 1,
    explanation: 'Chromium (Z=24) has [Ar] 3d⁵ 4s¹ rather than [Ar] 3d⁴ 4s² due to extra stability of half-filled d-orbitals and exchange energy.',
    hints: [
      'Look for an element with atomic number 24.',
      'Half-filled d-subshells (3d⁵) provide special stability.',
      'Chromium promotes one 4s electron into the 3d subshell.'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'c2',
    nodeId: 'c12_chem_052',
    type: 'multiple_choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall & Analysis',
    question: 'Why does Zinc (Zn) have the lowest enthalpy of atomization (126 kJ/mol) in the 3d series?',
    options: [
      'Zinc has no unpaired d-electrons (3d¹⁰), resulting in weak metallic bonding.',
      'Zinc is a non-metal element.',
      'Zinc has a very small ionic charge.',
      'Zinc oxidizes immediately in solid phase.'
    ],
    correctIndex: 0,
    explanation: 'Atomization enthalpy depends on d-electron metallic overlap. Zn has a full 3d¹⁰ shell, so d-electrons do not participate in metallic lattice bonding.',
    hints: [
      'Consider the electron configuration of Zinc [Ar] 3d¹⁰ 4s².',
      'Are there any unpaired d-electrons in Zn?',
      'Without unpaired d-electrons, interatomic metallic binding is minimal.'
    ]
  },
  {
    id: 'c3',
    nodeId: 'c12_chem_053',
    type: 'multiple_choice',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'What trend is observed in the atomic radii of 3d elements at the end of the series (from Cu to Zn)?',
    options: [
      'It continues to decrease sharply.',
      'It stays completely frozen at 100 pm.',
      'It shows a slight increase due to electron-electron repulsions in the fully filled d-shell.',
      'It drops to zero.'
    ],
    correctIndex: 2,
    explanation: 'At the end of the 3d series, electron-electron repulsions among paired electrons in the 3d¹⁰ shell exceed the nuclear pull, causing a slight increase in radius (Cu = 128 pm, Zn = 137 pm).',
    hints: [
      'Check the radius of Cu (128 pm) vs Zn (137 pm).',
      'What happens when 10 electrons are packed into the 3d subshell?',
      'Inter-electronic repulsion pushes the valence shell outward.'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'c4',
    nodeId: 'c12_chem_054',
    type: 'multiple_choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'When Iron (Fe: [Ar] 3d⁶ 4s²) forms the Fe²⁺ ion, which electrons are removed first?',
    options: ['Two 3d electrons', 'Two 4s electrons', 'One 3d and one 4s electron', 'Two 3p electrons'],
    correctIndex: 1,
    explanation: '4s electrons are always ionized before 3d electrons because upon occupancy, effective nuclear charge drops 3d below 4s, making 4s the outermost electrons.',
    hints: [
      'Recall which subshell forms the outermost boundary of the atom.',
      'Ionization energy removes valence electrons first.',
      '4s electrons have higher quantum number n=4.'
    ],
    misconceptionIndex: 1
  },
  {
    id: 'c5',
    nodeId: 'c12_chem_055',
    type: 'multiple_choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'What is the maximum oxidation state exhibited by Manganese (Mn, Z=25)?',
    options: ['+4', '+5', '+6', '+7'],
    correctIndex: 3,
    explanation: 'Manganese can lose or share all 7 valence electrons (3d⁵ 4s²), reaching a maximum oxidation state of +7 (e.g., in KMnO₄).',
    hints: [
      'Count total valence electrons in [Ar] 3d⁵ 4s².',
      '5 d-electrons + 2 s-electrons = total valence capacity.',
      'KMnO₄ contains Mn in this top oxidation state.'
    ]
  },
  {
    id: 'c6',
    nodeId: 'c12_chem_057',
    type: 'multiple_choice',
    difficulty: 'foundation',
    competencyLevel: 'Formula Application',
    question: 'What is the standard unit used to express spin-only magnetic moment (μ)?',
    options: ['Tesla (T)', 'Bohr Magneton (BM)', 'Debye (D)', 'Joules per Tesla (J/T)'],
    correctIndex: 1,
    explanation: 'Spin-only magnetic moment is calculated as μ = √(n(n+2)) and expressed in units of Bohr Magneton (BM).',
    hints: [
      'The abbreviation is BM.',
      'Named after Niels Bohr.',
      'Bohr Magneton measures atomic magnetic dipoles.'
    ]
  },
  {
    id: 'c7',
    nodeId: 'c12_chem_058',
    type: 'multiple_choice',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'What fundamental electronic phenomenon is responsible for color in transition metal complexes?',
    options: [
      'Nuclear decay emission',
      'd-d electron transition between split t₂g and e_g orbital energy levels',
      'Loss of 4s valence electrons into surrounding solvent',
      'Rotational vibrations of water ligands'
    ],
    correctIndex: 1,
    explanation: 'Ligands split 3d orbitals into t₂g and e_g levels. Absorption of visible light promotes an electron from lower to higher d-orbitals (d-d transition), giving rise to complementary transmitted color.',
    hints: [
      'Think about crystal field theory splitting d-orbitals.',
      'Electrons absorb visible wavelengths to jump between d sub-levels.',
      'This process is called a d-d transition.'
    ]
  },

  // STANDARD (8)
  {
    id: 'c8',
    nodeId: 'c12_chem_054',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Application & Calculation',
    question: 'Calculate the spin-only magnetic moment (in BM) of a Fe³⁺ ion (Z=26). (Round to 2 decimal places)',
    correctAnswer: 5.92,
    tolerance: 0.05,
    unit: 'BM',
    explanation: 'Fe is [Ar] 3d⁶ 4s². Fe³⁺ has lost 2 4s and 1 3d electron -> [Ar] 3d⁵. Unpaired electrons n = 5. μ = √(5 × 7) = √35 ≈ 5.92 BM.',
    hints: [
      'Write configuration of Fe³⁺: [Ar] 3d⁵.',
      'Determine unpaired electrons n: 5.',
      'Apply formula μ = √(5(5+2)) = √35.'
    ]
  },
  {
    id: 'c9',
    nodeId: 'c12_chem_056',
    type: 'multiple_choice',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'Why is E°(Cu²⁺/Cu) positive (+0.34 V), making Copper incapable of liberating H₂ gas from dilute acids?',
    options: [
      'Copper has a negative hydration enthalpy.',
      'High energy required to transform Cu(s) into Cu²⁺(aq) (atomization + IE1 + IE2) is NOT balanced by its hydration energy.',
      'Copper atoms absorb hydrogen gas permanently.',
      'Cu²⁺ undergoes spontaneous reduction to Cu⁺ in acid.'
    ],
    correctIndex: 1,
    explanation: 'The sum of atomization enthalpy and high 1st + 2nd ionization energies for Cu is higher than its hydration enthalpy in water, leading to a positive E°.',
    hints: [
      'Consider the thermodynamic cycle: Sublimation + Ionization vs Hydration.',
      'IE2 of Cu (1958 kJ/mol) is very high.',
      'Hydration enthalpy cannot cover the high total excitation energy.'
    ],
    misconceptionIndex: 2
  },
  {
    id: 'c10',
    nodeId: 'c12_chem_058',
    type: 'multiple_choice',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'Which pair of aqueous ions are both completely colorless in solution?',
    options: ['Cu²⁺ and Fe²⁺', 'Ti³⁺ and V³⁺', 'Sc³⁺ and Zn²⁺', 'Cr³⁺ and Mn²⁺'],
    correctIndex: 2,
    explanation: 'Sc³⁺ has d⁰ configuration and Zn²⁺ has d¹⁰ configuration. Neither ion can undergo d-d electronic transitions, making both colorless.',
    hints: [
      'Color requires d-d transition with 1 to 9 d-electrons.',
      'd⁰ (empty) and d¹⁰ (fully filled) have no available d-d transitions.',
      'Check Scandium(III) and Zinc(II).'
    ]
  },
  {
    id: 'c11',
    nodeId: 'c12_chem_059',
    type: 'multiple_choice',
    difficulty: 'standard',
    competencyLevel: 'Understanding',
    question: 'What is the chief chemical mechanism behind the catalytic efficiency of transition metals like Fe and V₂O₅?',
    options: [
      'Their ability to change oxidation states and form flexible reactive intermediate compounds.',
      'Their high boiling point that heats reactant molecules.',
      'Their ability to emit gamma radiation.',
      'Their permanent magnetic force that pulls gas molecules together.'
    ],
    correctIndex: 0,
    explanation: 'Transition metals act as effective catalysts primarily because of variable oxidation states that facilitate electron transfer and formation of intermediate pathways with lower activation energy.',
    hints: [
      'Is catalysis only physical adsorption?',
      'Transition metals readily switch valency (e.g., Fe²⁺ ↔ Fe³⁺ or V⁺⁵ ↔ V⁺⁴).',
      'This allows lower activation energy intermediate routes.'
    ],
    misconceptionIndex: 3
  },
  {
    id: 'c12',
    nodeId: 'c12_chem_060',
    type: 'multiple_choice',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'Which of the following is NOT a property of interstitial compounds formed by 3d metals with H, C, or N?',
    options: [
      'They have very high melting points, higher than parent metals.',
      'They are extremely hard (e.g., TiC approaches diamond hardness).',
      'They lose metallic conductivity completely and become electrical insulators.',
      'They retain metallic conductivity.'
    ],
    correctIndex: 2,
    explanation: 'Interstitial compounds retain metallic conductivity while gaining extreme hardness, rigidity, high melting points, and chemical inertness.',
    hints: [
      'Do interstitial carbon/nitrogen atoms destroy the delocalized electron sea?',
      'No, metallic electrical transport remains intact.',
      'Find the incorrect statement about electrical insulation.'
    ]
  },
  {
    id: 'c13',
    nodeId: 'c12_chem_060',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'To form a solid-solution alloy, the atomic radii of two transition metals should not differ by more than what percentage (Hume-Rothery rule)?',
    correctAnswer: 15,
    tolerance: 1,
    unit: '%',
    explanation: 'According to Hume-Rothery criteria, metals form substitutional alloys easily if their atomic radii differ by less than ~15%.',
    hints: [
      'Recall the Hume-Rothery size rule percentage.',
      'It is a double-digit number between 10% and 20%.',
      'The standard threshold is 15%.'
    ]
  },
  {
    id: 'c14',
    nodeId: 'c12_chem_055',
    type: 'multiple_choice',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'Why is Fe³⁺ (aq) more stable than Fe²⁺ (aq) in atmospheric oxygen?',
    options: [
      'Fe³⁺ has a half-filled 3d⁵ configuration which is exceptionally stable.',
      'Fe²⁺ has a smaller effective nuclear charge.',
      'Fe³⁺ forms gas bubbles in water.',
      'Fe²⁺ has an empty d-shell.'
    ],
    correctIndex: 0,
    explanation: 'Fe³⁺ has configuration [Ar] 3d⁵ (half-filled d-shell), providing high exchange energy and thermodynamic stability compared to Fe²⁺ ([Ar] 3d⁶).',
    hints: [
      'Write electron configurations: Fe²⁺ is 3d⁶, Fe³⁺ is 3d⁵.',
      '3d⁵ represents a symmetric, half-filled shell.',
      'Half-filled subshells possess extra thermodynamic stability.'
    ]
  },
  {
    id: 'c15',
    nodeId: 'c12_chem_054',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Data Analysis',
    question: 'Calculate the spin-only magnetic moment (in BM) of a Cr³⁺ ion (Z=24). (Round to 2 decimal places)',
    correctAnswer: 3.87,
    tolerance: 0.05,
    unit: 'BM',
    explanation: 'Cr is [Ar] 3d⁵ 4s¹. Cr³⁺ is [Ar] 3d³. Number of unpaired electrons n = 3. μ = √(3 × 5) = √15 ≈ 3.87 BM.',
    hints: [
      'Cr³⁺ configuration is [Ar] 3d³.',
      'Unpaired d-electrons n = 3.',
      'μ = √(3 × 5) = √15 = 3.87 BM.'
    ]
  },

  // ADVANCED (7)
  {
    id: 'c16',
    nodeId: 'c12_chem_056',
    type: 'multiple_choice',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation & Synthesis',
    question: 'Why does Manganese exhibit an abnormally negative E°(Mn²⁺/Mn = -1.18 V) compared to its neighbors Cr (-0.91 V) and Fe (-0.44 V)?',
    options: [
      'High stability of the half-filled 3d⁵ shell in Mn²⁺ makes the Mn²⁺ state thermodynamically favored.',
      'Mn metal has an extremely high enthalpy of hydration.',
      'Mn²⁺ is easily reduced to Mn⁺¹ in water.',
      'Mn has the lowest 1st ionization energy in the period.'
    ],
    correctIndex: 0,
    explanation: 'Mn²⁺ possesses a half-filled 3d⁵ configuration. The extra stability of d⁵ lowers the energy of Mn²⁺, making the reduction of Mn²⁺ to Mn(s) difficult and resulting in a strongly negative E°.',
    hints: [
      'Look at the electron configuration of Mn²⁺ vs Mn(s).',
      'Mn²⁺ is [Ar] 3d⁵.',
      'Extra stabilization energy of d⁵ makes formation of Mn²⁺ highly exothermic.'
    ]
  },
  {
    id: 'c17',
    nodeId: 'c12_chem_058',
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Spectroscopic Calculation',
    question: 'An aqueous solution of [Ti(H₂O)₆]³⁺ absorbs light at a peak wavelength λ = 498 nm. Calculate the crystal field splitting energy Δo in kJ/mol. (hc = 1.986 × 10⁻²⁵ J·m, N_A = 6.022 × 10²³ mol⁻¹). (Round to nearest whole number)',
    correctAnswer: 240,
    tolerance: 5,
    unit: 'kJ/mol',
    explanation: 'E = (h × c) / λ = (1.986 × 10⁻²⁵) / (498 × 10⁻⁹ m) = 3.988 × 10⁻¹⁹ J/photon. Multiply by N_A = 240,150 J/mol ≈ 240 kJ/mol.',
    hints: [
      'Use E = (h × c) / λ for a single photon energy in Joules.',
      'Convert wavelength 498 nm into meters (498 × 10⁻⁹ m).',
      'Multiply by Avogadro number N_A and convert J to kJ.'
    ]
  },
  {
    id: 'c18',
    nodeId: 'c12_chem_055',
    type: 'multiple_choice',
    difficulty: 'advanced',
    competencyLevel: 'Evaluative Synthesis',
    question: 'Transition elements display highest oxidation states when bonded to Fluorine and Oxygen (e.g. V₂O₅, CrO₄²⁻, KMnO₄). Why are high oxidation states stabilized predominantly by Oxygen over Fluorine?',
    options: [
      'Oxygen is more electronegative than Fluorine.',
      'Oxygen can form multiple pπ-dπ bonds with transition metals, whereas Fluorine forms only single σ bonds.',
      'Fluorine atoms are too small to surround transition metals.',
      'Oxygen acts as a reducing ligand at high temperatures.'
    ],
    correctIndex: 1,
    explanation: 'Besides high electronegativity, Oxygen has the unique capability to form multiple pπ-dπ double bonds with transition metal d-orbitals, stabilizing high oxidation states like Mn⁺⁷ in MnO₄⁻.',
    hints: [
      'Consider the bonding capacity of Oxygen (valency 2) vs Fluorine (valency 1).',
      'Oxygen forms double bonds involving d-orbitals.',
      'This pπ-dπ multiple bonding stabilizes high positive charges.'
    ]
  },
  {
    id: 'c19',
    nodeId: 'c12_chem_056',
    type: 'multiple_choice',
    difficulty: 'advanced',
    competencyLevel: 'Thermodynamic Evaluation',
    question: 'Given E°(Cu⁺/Cu) = +0.52 V and E°(Cu²⁺/Cu⁺) = +0.15 V, calculate E° for the disproportionation reaction: 2 Cu⁺(aq) → Cu²⁺(aq) + Cu(s).',
    options: ['+0.37 V', '-0.37 V', '+0.67 V', '-0.67 V'],
    correctIndex: 0,
    explanation: 'For disproportionation, E°_cell = E°_reduction (Cu⁺/Cu) - E°_oxidation (Cu²⁺/Cu⁺) = +0.52 V - (+0.15 V) = +0.37 V. Since E°_cell > 0, disproportionation is spontaneous.',
    hints: [
      'Half-rxn 1 (reduction): Cu⁺ + e⁻ → Cu (E° = +0.52 V).',
      'Half-rxn 2 (oxidation): Cu⁺ → Cu²⁺ + e⁻ (E° = -0.15 V).',
      'E°_cell = +0.52 V - 0.15 V = +0.37 V.'
    ]
  },
  {
    id: 'c20',
    nodeId: 'c12_chem_054',
    type: 'drag_sort',
    difficulty: 'advanced',
    competencyLevel: 'Order & Prioritization',
    question: 'Drag and sort the following elements in DECREASING order of their Third Ionization Energy (IE3): Zn, Mn, Co, Fe.',
    itemsToSort: ['Zinc (Zn)', 'Manganese (Mn)', 'Cobalt (Co)', 'Iron (Fe)'],
    correctAnswer: ['Zinc (Zn)', 'Manganese (Mn)', 'Cobalt (Co)', 'Iron (Fe)'],
    explanation: 'IE3 values: Zn (3833 kJ/mol - breaking d10) > Mn (3248 kJ/mol - breaking d5) > Co (3232 kJ/mol) > Fe (2957 kJ/mol - producing stable d5).',
    hints: [
      'Zinc has the highest IE3 because removing a 3rd e⁻ disrupts stable d10.',
      'Manganese is second highest because it breaks half-filled d5.',
      'Iron has the lowest IE3 because losing the 3rd e⁻ forms stable d5.'
    ]
  },
  {
    id: 'c21',
    nodeId: 'c12_chem_059',
    type: 'multiple_choice',
    difficulty: 'advanced',
    competencyLevel: 'Mechanism Analysis',
    question: 'In the homogeneous catalytic reaction between Iodide (I⁻) and Persulfate (S₂O₈²⁻) ions, Fe³⁺ acts as a effective catalyst. What is the fundamental reason Fe³⁺ speeds up this reaction?',
    options: [
      'Fe³⁺ reacts with water to form acidic conditions.',
      'Fe³⁺ reduces electrostatic repulsion between two negative ions (I⁻ and S₂O₈²⁻) by converting the single step into two favorable cation-anion steps using Fe³⁺/Fe²⁺ redox cycling.',
      'Fe³⁺ precipitates I₂ out of solution continuously.',
      'Fe³⁺ absorbs infrared light from solution.'
    ],
    correctIndex: 1,
    explanation: 'Reaction between two anions (I⁻ and S₂O₈²⁻) has high activation energy due to electrostatic repulsion. Fe³⁺ oxidizes I⁻ to I₂ while becoming Fe²⁺, and S₂O₈²⁻ re-oxidizes Fe²⁺ to Fe³⁺.',
    hints: [
      'Both reactant species (I⁻ and S₂O₈²⁻) carry negative charge.',
      'Direct collision is hindered by strong electrostatic repulsion.',
      'Fe³⁺ cation bridges electron transfer through variable oxidation states.'
    ]
  },
  {
    id: 'c22',
    nodeId: 'c12_chem_060',
    type: 'multiple_choice',
    difficulty: 'advanced',
    competencyLevel: 'Materials Science Synthesis',
    question: 'Steel is an interstitial alloy of Iron containing up to 1.5% Carbon. How does the presence of interstitial Carbon atoms dramatically increase the tensile strength and hardness of Iron?',
    options: [
      'Carbon atoms melt the iron crystal into liquid metal.',
      'Small Carbon atoms occupy interstitial spaces, trapping dislocation planes and preventing metal crystal layers from slipping past each other.',
      'Carbon forms ionic bonds that weaken the metallic structure.',
      'Carbon replaces Iron atoms in regular substitutional lattice sites.'
    ],
    correctIndex: 1,
    explanation: 'Interstitial carbon atoms fit into octahedral voids, creating local strain fields that pin slip planes and prevent lattice dislocation movement, resulting in immense structural hardness.',
    hints: [
      'Think about slip planes and dislocation movements in metals.',
      'Guest carbon atoms fill empty gaps between iron atoms.',
      'This mechanically locks crystal planes against shearing forces.'
    ]
  }
];

// ==========================================
// CUSTOM SVG DIAGRAM COMPONENTS
// ==========================================

// Diagram 1: Interactive Trend Curves for 3d Series
const PeriodicTrendGraphSVG: React.FC<{
  metric: 'radius' | 'ie1' | 'ie2' | 'ie3' | 'atomization' | 'e0';
  highlightedElement: string;
  onSelectElement: (sym: string) => void;
}> = ({ metric, highlightedElement, onSelectElement }) => {
  const width = 680;
  const height = 260;
  const padding = 50;

  const getValue = (el: ElementData): number => {
    switch (metric) {
      case 'radius': return el.atomicRadius;
      case 'ie1': return el.ie1;
      case 'ie2': return el.ie2;
      case 'ie3': return el.ie3;
      case 'atomization': return el.enthalpyAtomization;
      case 'e0': return el.e0M2M;
    }
  };

  const values = ELEMENTS_3D.map(getValue);
  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);

  const getX = (idx: number) => padding + (idx * (width - 2 * padding)) / (ELEMENTS_3D.length - 1);
  const getY = (val: number) => height - padding - ((val - minVal) / (maxVal - minVal || 1)) * (height - 2 * padding);

  const points = ELEMENTS_3D.map((el, idx) => `${getX(idx)},${getY(getValue(el))}`).join(' ');

  const getMetricLabel = () => {
    switch (metric) {
      case 'radius': return 'Atomic Radius (pm)';
      case 'ie1': return '1st Ionization Energy (kJ/mol)';
      case 'ie2': return '2nd Ionization Energy (kJ/mol)';
      case 'ie3': return '3rd Ionization Energy (kJ/mol)';
      case 'atomization': return 'Enthalpy of Atomization (kJ/mol)';
      case 'e0': return 'Standard Reduction Potential E°(M²⁺/M) [V]';
    }
  };

  return (
    <div className="w-full bg-slate-900 p-4 rounded-xl border border-slate-800 shadow-inner overflow-x-auto">
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-sm font-semibold text-cyan-400 flex items-center gap-2">
          <TrendingUp className="w-4 h-4" /> 3d Periodic Trend Graph: {getMetricLabel()}
        </h4>
        <span className="text-xs text-slate-400">Click any node to inspect element details</span>
      </div>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
          const y = height - padding - ratio * (height - 2 * padding);
          const val = (minVal + ratio * (maxVal - minVal)).toFixed(metric === 'e0' ? 2 : 0);
          return (
            <g key={i}>
              <line x1={padding} y1={y} x2={width - padding} y2={y} stroke="#334155" strokeDasharray="3 3" strokeWidth="1" />
              <text x={padding - 8} y={y + 4} fill="#94a3b8" fontSize="10" textAnchor="end">
                {val}
              </text>
            </g>
          );
        })}

        {/* Trend Polyline */}
        <polyline fill="none" stroke="#38bdf8" strokeWidth="3" points={points} />

        {/* Data points */}
        {ELEMENTS_3D.map((el, idx) => {
          const cx = getX(idx);
          const cy = getY(getValue(el));
          const isSelected = el.symbol === highlightedElement;

          return (
            <g key={el.symbol} onClick={() => onSelectElement(el.symbol)} className="cursor-pointer group">
              <circle
                cx={cx}
                cy={cy}
                r={isSelected ? 8 : 5}
                fill={isSelected ? '#f59e0b' : '#0284c7'}
                stroke="#ffffff"
                strokeWidth={isSelected ? 2.5 : 1.5}
                className="transition-all duration-300 group-hover:r-8 group-hover:fill-amber-400"
              />
              <text
                x={cx}
                y={height - padding + 18}
                fill={isSelected ? '#f59e0b' : '#cbd5e1'}
                fontSize="11"
                fontWeight={isSelected ? 'bold' : 'normal'}
                textAnchor="middle"
              >
                {el.symbol}
              </text>
              <text
                x={cx}
                y={cy - 10}
                fill="#38bdf8"
                fontSize="9"
                textAnchor="middle"
                className="opacity-0 group-hover:opacity-100 transition-opacity fill-cyan-300"
              >
                {getValue(el)}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

// Diagram 2: Crystal Field Splitting & Solution Color SVG
const CrystalFieldDiagramSVG: React.FC<{
  dCount: number;
  deltaO: number; // Crystal field splitting energy
  colorHex: string;
  ionName: string;
}> = ({ dCount, deltaO, colorHex, ionName }) => {
  // Octahedral splitting: t2g (3 lower), eg (2 upper)
  const t2gCapacity = 3;
  const egCapacity = 2;

  // Simple High-Spin filling logic for 3d series default
  const t2gElectrons = Math.min(dCount, 3) + Math.max(0, dCount - 5);
  const egElectrons = Math.max(0, Math.min(2, dCount - 3)) + Math.max(0, dCount - 8);

  return (
    <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex flex-col md:flex-row items-center gap-6">
      <div className="flex-1 w-full">
        <h4 className="text-sm font-semibold text-purple-400 mb-2 flex items-center gap-2">
          <Layers className="w-4 h-4" /> Crystal Field Splitting (Octahedral Field Δₒ)
        </h4>
        <svg viewBox="0 0 320 200" className="w-full h-auto bg-slate-950 rounded-lg p-2">
          {/* Degenerate d-orbitals baseline */}
          <text x="20" y="180" fill="#64748b" fontSize="10">Free Ion 3d</text>
          {[0, 1, 2, 3, 4].map(i => (
            <rect key={i} x={15 + i * 22} y="145" width="18" height="22" fill="none" stroke="#475569" strokeWidth="1.5" />
          ))}

          {/* e_g orbitals (higher energy) */}
          <text x="230" y="45" fill="#f43f5e" fontSize="11" fontWeight="bold">e_g (d_x²-y², d_z²)</text>
          {[0, 1].map(i => (
            <g key={i}>
              <rect x={220 + i * 28} y="55" width="22" height="26" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
              {/* Render e_g electrons */}
              {egElectrons > i && (
                <path d={`M ${226 + i * 28} 74 L ${226 + i * 28} 60 L ${223 + i * 28} 63`} stroke="#a855f7" strokeWidth="2.5" fill="none" />
              )}
              {egElectrons > i + 2 && (
                <path d={`M ${236 + i * 28} 62 L ${236 + i * 28} 76 L ${239 + i * 28} 73`} stroke="#ec4899" strokeWidth="2.5" fill="none" />
              )}
            </g>
          ))}

          {/* Δₒ Energy Gap Arrow */}
          <line x1="180" y1="68" x2="180" y2="128" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 3" />
          <polygon points="180,63 176,71 184,71" fill="#f59e0b" />
          <polygon points="180,133 176,125 184,125" fill="#f59e0b" />
          <text x="188" y="102" fill="#f59e0b" fontSize="11" fontWeight="bold">Δₒ = {deltaO} kJ</text>

          {/* t_2g orbitals (lower energy) */}
          <text x="220" y="165" fill="#38bdf8" fontSize="11" fontWeight="bold">t₂g (d_xy, d_yz, d_xz)</text>
          {[0, 1, 2].map(i => (
            <g key={i}>
              <rect x={210 + i * 28} y="115" width="22" height="26" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
              {/* Render t2g electrons */}
              {t2gElectrons > i && (
                <path d={`M ${216 + i * 28} 134 L ${216 + i * 28} 120 L ${213 + i * 28} 123`} stroke="#38bdf8" strokeWidth="2.5" fill="none" />
              )}
              {t2gElectrons > i + 3 && (
                <path d={`M ${226 + i * 28} 122 L ${226 + i * 28} 136 L ${229 + i * 28} 133`} stroke="#f43f5e" strokeWidth="2.5" fill="none" />
              )}
            </g>
          ))}
        </svg>
      </div>

      {/* Aqueous Beaker Color Simulation */}
      <div className="flex flex-col items-center justify-center p-3 bg-slate-950 rounded-xl border border-slate-800 min-w-[160px]">
        <span className="text-xs text-slate-400 mb-1">Observed Color</span>
        <div className="relative w-20 h-28 border-2 border-slate-600 border-t-0 rounded-b-2xl overflow-hidden bg-slate-900/50 flex items-end justify-center shadow-lg">
          <div
            className="w-full transition-all duration-700 ease-in-out opacity-85 flex items-center justify-center"
            style={{
              height: '75%',
              backgroundColor: colorHex === '#f8fafc' ? 'rgba(255,255,255,0.08)' : colorHex,
              boxShadow: `0 0 20px ${colorHex}`
            }}
          >
            {/* Bubble animations inside liquid */}
            <div className="w-2 h-2 rounded-full bg-white/30 animate-ping" />
          </div>
          <span className="absolute bottom-2 text-[10px] font-bold text-slate-900 bg-white/80 px-1 rounded backdrop-blur-xs">
            {ionName}
          </span>
        </div>
        <span className="text-xs font-semibold text-slate-200 mt-2 text-center">{colorHex === '#f8fafc' ? 'Colorless' : ionName}</span>
      </div>
    </div>
  );
};

// Diagram 3: Magnetic Dipole Alignment & Spin-Only Visualizer
const MagneticMomentVisualizerSVG: React.FC<{
  unpairedCount: number;
  elementSymbol: string;
  ionCharge: string;
}> = ({ unpairedCount, elementSymbol, ionCharge }) => {
  const mu = Math.sqrt(unpairedCount * (unpairedCount + 2)).toFixed(2);

  return (
    <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
      <div className="flex justify-between items-center mb-3">
        <h4 className="text-sm font-semibold text-amber-400 flex items-center gap-2">
          <Radio className="w-4 h-4" /> Magnetic Dipole Alignment & Spin Moment: {elementSymbol}{ionCharge}
        </h4>
        <span className="text-xs px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-mono">
          μ = {mu} BM
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Orbital Spin Boxes */}
        <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
          <span className="text-xs text-slate-400 block mb-2">3d Orbital Occupation (Hund's Rule)</span>
          <div className="flex gap-2 justify-center">
            {[0, 1, 2, 3, 4].map(boxIdx => {
              // High spin filling
              const hasFirst = unpairedCount > boxIdx;
              const hasSecond = unpairedCount > boxIdx + 5;

              return (
                <div key={boxIdx} className="w-10 h-12 border-2 border-slate-700 bg-slate-900 rounded flex items-center justify-center gap-1">
                  {hasFirst && (
                    <span className="text-amber-400 text-lg font-bold">↑</span>
                  )}
                  {hasSecond && (
                    <span className="text-rose-400 text-lg font-bold">↓</span>
                  )}
                </div>
              );
            })}
          </div>
          <div className="text-center mt-2 text-xs text-slate-300">
            Unpaired Electrons (<span className="text-amber-400 font-bold">n</span>) = {unpairedCount}
          </div>
        </div>

        {/* Dipole Field Alignment */}
        <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex flex-col justify-center items-center">
          <span className="text-xs text-slate-400 mb-2">External Magnetic Field Effect (B-Field)</span>
          <div className="flex items-center gap-3">
            <div className="px-2 py-3 bg-red-900/40 border border-red-600 rounded text-red-400 text-xs font-bold">N</div>
            <div className="flex gap-2">
              {Array.from({ length: Math.max(1, unpairedCount) }).map((_, i) => (
                <div key={i} className="flex flex-col items-center animate-bounce" style={{ animationDelay: `${i * 150}ms` }}>
                  <div className="w-2 h-6 bg-amber-400 rounded-full flex items-start justify-center pt-0.5">
                    <div className="w-1 h-1 bg-slate-950 rounded-full" />
                  </div>
                  <span className="text-[9px] text-amber-300 font-mono mt-0.5">m_s</span>
                </div>
              ))}
            </div>
            <div className="px-2 py-3 bg-blue-900/40 border border-blue-600 rounded text-blue-400 text-xs font-bold">S</div>
          </div>
          <p className="text-[11px] text-slate-400 mt-2 text-center">
            {unpairedCount > 0 ? 'Paramagnetic: Strongly attracted into magnetic gradient.' : 'Diamagnetic: Weakly repelled by external field.'}
          </p>
        </div>
      </div>
    </div>
  );
};

// Diagram 4: Interstitial Crystal Lattice & Void Simulator
const InterstitialLatticeSVG: React.FC<{
  guestAtom: 'H' | 'C' | 'N';
  packingDensity: number;
}> = ({ guestAtom, packingDensity }) => {
  const getGuestRadius = () => {
    switch (guestAtom) {
      case 'H': return 6;
      case 'C': return 10;
      case 'N': return 9;
    }
  };

  const getGuestColor = () => {
    switch (guestAtom) {
      case 'H': return '#38bdf8';
      case 'C': return '#f59e0b';
      case 'N': return '#a855f7';
    }
  };

  const radius = getGuestRadius();
  const color = getGuestColor();

  // Host metal grid positions (Close packed 4x3)
  const hostAtoms = [
    { x: 50, y: 40 }, { x: 130, y: 40 }, { x: 210, y: 40 }, { x: 290, y: 40 },
    { x: 50, y: 120 }, { x: 130, y: 120 }, { x: 210, y: 120 }, { x: 290, y: 120 },
    { x: 50, y: 200 }, { x: 130, y: 200 }, { x: 210, y: 200 }, { x: 290, y: 200 }
  ];

  // Interstitial voids (Octahedral / tetrahedral gap centers)
  const voids = [
    { x: 90, y: 80 }, { x: 170, y: 80 }, { x: 250, y: 80 },
    { x: 90, y: 160 }, { x: 170, y: 160 }, { x: 250, y: 160 }
  ];

  const activeVoidCount = Math.floor((packingDensity / 100) * voids.length);

  return (
    <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-sm font-semibold text-emerald-400 flex items-center gap-2">
          <Cpu className="w-4 h-4" /> Interstitial Crystal Void Accommodation ({guestAtom} Guest Atoms)
        </h4>
        <span className="text-xs text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
          Hardness Index: {160 + activeVoidCount * 400} HV
        </span>
      </div>

      <svg viewBox="0 0 340 240" className="w-full h-auto bg-slate-950 rounded-lg">
        {/* Host Metallic Delocalized Sea Backdrop */}
        <rect x="20" y="20" width="300" height="200" fill="#0284c7" opacity="0.05" rx="10" />

        {/* Host Metal Atoms (Large spheres) */}
        {hostAtoms.map((pos, idx) => (
          <g key={idx}>
            <circle cx={pos.x} cy={pos.y} r="32" fill="url(#metalGrad)" stroke="#38bdf8" strokeWidth="1.5" opacity="0.85" />
            <text x={pos.x} y={pos.y + 4} fill="#e0f2fe" fontSize="10" fontWeight="bold" textAnchor="middle">
              Ti
            </text>
          </g>
        ))}

        {/* Interstitial Guest Non-Metal Atoms in Voids */}
        {voids.slice(0, activeVoidCount).map((v, i) => (
          <g key={i} className="animate-pulse">
            <circle cx={v.x} cy={v.y} r={radius} fill={color} stroke="#ffffff" strokeWidth="1.5" />
            <text x={v.x} y={v.y + 3} fill="#0f172a" fontSize="8" fontWeight="bold" textAnchor="middle">
              {guestAtom}
            </text>
          </g>
        ))}

        {/* SVG Gradients */}
        <defs>
          <radialGradient id="metalGrad" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0369a1" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
};

// ==========================================
// MAIN COMPONENT CLASS
// ==========================================

export default function C12_ChemistryTransitionmetalstrendsSim() {
  // State variables
  const [activeTab, setActiveTab] = useState<'discovery' | 'lab' | 'challenges' | 'summary'>('discovery');
  const [currentLabStep, setCurrentLabStep] = useState<number>(0);

  // Selected element in Lab
  const [selectedElementSymbol, setSelectedElementSymbol] = useState<string>('Cr');
  const [selectedMetric, setSelectedMetric] = useState<'radius' | 'ie1' | 'ie2' | 'ie3' | 'atomization' | 'e0'>('radius');
  const [cationCharge, setCationCharge] = useState<number>(0);

  // Challenge mode states
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [numericAnswer, setNumericAnswer] = useState<string>('');
  const [sortedItems, setSortedItems] = useState<string[]>([]);
  const [challengeFeedback, setChallengeFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);
  const [challengeScore, setChallengeScore] = useState<number>(0);
  const [completedChallenges, setCompletedChallenges] = useState<Set<string>>(new Set());

  // Discovery/Prediction Q states
  const [discoveryAnswered, setDiscoveryAnswered] = useState<boolean>(false);
  const [discoverySelected, setDiscoverySelected] = useState<number | null>(null);
  const [predictionAnswers, setPredictionAnswers] = useState<Record<number, number>>({});
  const [observationAnswers, setObservationAnswers] = useState<Record<number, number>>({});

  // BKT and SRS tracking states
  const [bktStates, setBktStates] = useState<Record<string, BKTState>>(() => {
    const initial: Record<string, BKTState> = {};
    ALL_NODE_IDS.forEach(id => {
      initial[id] = createBKTState();
    });
    return initial;
  });

  const [srsItems, setSrsItems] = useState<Record<string, SRSItem>>(() => {
    const initial: Record<string, SRSItem> = {};
    ALL_NODE_IDS.forEach(id => {
      initial[id] = createReviewItem(id);
    });
    return initial;
  });

  // Visual effects & audio/speech states
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHintText, setCurrentHintText] = useState<string>('');
  const [muted, setMuted] = useState<boolean>(false);

  // Interstitial guest atom lab state
  const [interstitialGuest, setInterstitialGuest] = useState<'H' | 'C' | 'N'>('C');
  const [interstitialDensity, setInterstitialDensity] = useState<number>(60);

  // Auto-hint timer reference
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Current active element object derived
  const currentElement = useMemo(() => {
    return ELEMENTS_3D.find(e => e.symbol === selectedElementSymbol) || ELEMENTS_3D[3]; // Cr default
  }, [selectedElementSymbol]);

  // Reset inactivity hint timer
  const resetInactivityTimer = () => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    setShowHint(false);
    inactivityTimerRef.current = setTimeout(() => {
      if (activeTab === 'challenges') {
        const c = CHALLENGES[currentChallengeIndex];
        setCurrentHintText(c.hints[0]);
        setShowHint(true);
        audioManager.play('hint');
      }
    }, 12000);
  };

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [activeTab, currentChallengeIndex]);

  // Audio helper
  const playSound = (sound: SoundEffect) => {
    if (!muted) {
      audioManager.play(sound);
    }
  };

  // Speak voice prompt
  const speakPrompt = (text: string) => {
    if (!muted) {
      speechManager.speak(text);
    }
  };

  // Handle Discovery Question selection
  const handleDiscoverySubmit = (idx: number) => {
    setDiscoverySelected(idx);
    setDiscoveryAnswered(true);
    if (idx === DISCOVERY_QUESTION.correctIndex) {
      playSound('success');
      speakPrompt('Spot on! Zinc lacks unpaired 3d electrons, leading to weak metallic bonding.');
    } else {
      playSound('error');
      speakPrompt('Not quite. Consider the number of unpaired 3d electrons in Zinc versus Chromium.');
    }
  };

  // Handle Challenge Answer Submission
  const handleChallengeSubmit = () => {
    const challenge = CHALLENGES[currentChallengeIndex];
    let isCorrect = false;

    if (challenge.type === 'multiple_choice') {
      isCorrect = selectedOption === challenge.correctIndex;
    } else if (challenge.type === 'numeric') {
      const parsed = parseFloat(numericAnswer);
      if (!isNaN(parsed) && challenge.correctAnswer !== undefined && challenge.tolerance !== undefined) {
        isCorrect = Math.abs(parsed - (challenge.correctAnswer as number)) <= challenge.tolerance;
      }
    } else if (challenge.type === 'drag_sort') {
      const target = challenge.correctAnswer as string[];
      isCorrect = JSON.stringify(sortedItems) === JSON.stringify(target);
    }

    // Update BKT & SRS
    const prevBKT = bktStates[challenge.nodeId] || createBKTState();
    const updatedBKT = bktUpdate(prevBKT, isCorrect);
    setBktStates(prev => ({ ...prev, [challenge.nodeId]: updatedBKT }));

    const prevSRS = srsItems[challenge.nodeId] || createReviewItem(challenge.nodeId);
    const updatedSRS = sm2Update(prevSRS, isCorrect ? 5 : 2);
    setSrsItems(prev => ({ ...prev, [challenge.nodeId]: updatedSRS }));

    if (isCorrect) {
      playSound('drop-correct');
      setShowSparkle(true);
      setShowSuccessBanner(true);
      setTimeout(() => setShowSuccessBanner(false), 2500);

      setChallengeFeedback({
        isCorrect: true,
        text: `Correct! ${challenge.explanation}`
      });

      if (!completedChallenges.has(challenge.id)) {
        setCompletedChallenges(prev => new Set(prev).add(challenge.id));
        setChallengeScore(prev => prev + 10);
      }

      speakPrompt('Excellent understanding of transition metal trends!');
    } else {
      playSound('drop-wrong');
      setChallengeFeedback({
        isCorrect: false,
        text: `Incorrect. ${challenge.explanation}`
      });
      speakPrompt('Review the electronic configuration and thermodynamic factors involved.');
    }

    // Check overall completion
    if (completedChallenges.size + 1 >= CHALLENGES.length) {
      setShowConfetti(true);
      playSound('celebration');
      recordGameScore('c12_chem_051', challengeScore + 10);
    }
  };

  // Next Challenge Navigation
  const handleNextChallenge = () => {
    setSelectedOption(null);
    setNumericAnswer('');
    setChallengeFeedback(null);
    setShowSparkle(false);

    if (currentChallengeIndex < CHALLENGES.length - 1) {
      setCurrentChallengeIndex(prev => prev + 1);
      const nextC = CHALLENGES[currentChallengeIndex + 1];
      if (nextC.type === 'drag_sort' && nextC.itemsToSort) {
        // Shuffle items for drag sort
        setSortedItems([...nextC.itemsToSort].sort(() => Math.random() - 0.5));
      }
    }
  };

  // Compute calculated magnetic moment for cation
  const calculatedMagneticMoment = useMemo(() => {
    let dElectrons = currentElement.config3d;
    let sElectrons = currentElement.config4s;

    let remainingRemovals = cationCharge;

    // First remove from 4s
    const sRemoved = Math.min(sElectrons, remainingRemovals);
    sElectrons -= sRemoved;
    remainingRemovals -= sRemoved;

    // Next remove from 3d
    const dRemoved = Math.min(dElectrons, remainingRemovals);
    dElectrons -= dRemoved;

    // Calculate unpaired electrons according to Hund's rule
    let unpaired = 0;
    if (dElectrons <= 5) {
      unpaired = dElectrons;
    } else {
      unpaired = 10 - dElectrons;
    }

    const mu = Math.sqrt(unpaired * (unpaired + 2));
    return { dElectrons, sElectrons, unpaired, mu: mu.toFixed(2) };
  }, [currentElement, cationCharge]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased selection:bg-cyan-500 selection:text-slate-950">
      {/* Top Header Bar */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-40 px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-tr from-cyan-600 to-blue-600 rounded-lg shadow-lg">
            <Atom className="w-6 h-6 text-white animate-spin-slow" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-300 to-purple-400">
              ISC Class 12 Transition Metal Dynamics
            </h1>
            <p className="text-xs text-slate-400">CISCE Curriculum • 3d Series Trends & Electronic Structure</p>
          </div>
        </div>

        {/* Global Controls & Score */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-full border border-slate-700">
            <Award className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-semibold text-slate-200">Lab Score:</span>
            <span className="text-xs font-bold text-amber-400">{challengeScore} pts</span>
          </div>

          <button
            onClick={() => setMuted(!muted)}
            className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 text-slate-300 transition"
            title={muted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="border-b border-slate-800 bg-slate-900/50 px-4 flex gap-2 overflow-x-auto">
        <button
          onClick={() => { setActiveTab('discovery'); playSound('tap'); }}
          className={`px-4 py-3 text-sm font-medium border-b-2 flex items-center gap-2 transition whitespace-nowrap ${
            activeTab === 'discovery'
              ? 'border-cyan-400 text-cyan-400 bg-cyan-950/30'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Compass className="w-4 h-4" /> 1. Scenario & Discovery
        </button>

        <button
          onClick={() => { setActiveTab('lab'); playSound('tap'); }}
          className={`px-4 py-3 text-sm font-medium border-b-2 flex items-center gap-2 transition whitespace-nowrap ${
            activeTab === 'lab'
              ? 'border-cyan-400 text-cyan-400 bg-cyan-950/30'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Beaker className="w-4 h-4" /> 2. Interactive Labs ({EXPLORATION_STEPS.length})
        </button>

        <button
          onClick={() => { setActiveTab('challenges'); playSound('tap'); }}
          className={`px-4 py-3 text-sm font-medium border-b-2 flex items-center gap-2 transition whitespace-nowrap ${
            activeTab === 'challenges'
              ? 'border-cyan-400 text-cyan-400 bg-cyan-950/30'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Zap className="w-4 h-4" /> 3. Challenges ({CHALLENGES.length})
        </button>

        <button
          onClick={() => { setActiveTab('summary'); playSound('tap'); }}
          className={`px-4 py-3 text-sm font-medium border-b-2 flex items-center gap-2 transition whitespace-nowrap ${
            activeTab === 'summary'
              ? 'border-cyan-400 text-cyan-400 bg-cyan-950/30'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <BookOpen className="w-4 h-4" /> 4. Summary & Industrial Application
        </button>
      </nav>

      {/* MAIN CONTENT CANVAS AREA */}
      <main className="flex-1 p-4 md:p-6 max-w-7xl mx-auto w-full space-y-6">

        {/* TAB 1: DISCOVERY & NARRATIVE SCENARIO */}
        {activeTab === 'discovery' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Context Card */}
            <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950 p-6 rounded-2xl border border-cyan-800/40 shadow-xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-cyan-500/20 text-cyan-400 rounded-lg">
                  <Activity className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-cyan-300">{SCENARIO.title}</h2>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">{SCENARIO.intro}</p>
              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-xs text-cyan-200 flex items-center gap-2">
                <Info className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{SCENARIO.context}</span>
              </div>
            </div>

            {/* Discovery Core Question */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-lg space-y-4">
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
                <Sparkles className="w-4 h-4" /> Initial Preconception Investigation
              </div>
              <h3 className="text-base font-medium text-slate-100">{DISCOVERY_QUESTION.question}</h3>

              <div className="grid grid-cols-1 gap-3 pt-2">
                {DISCOVERY_QUESTION.options.map((opt, idx) => {
                  const isSelected = discoverySelected === idx;
                  const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;

                  return (
                    <button
                      key={idx}
                      onClick={() => handleDiscoverySubmit(idx)}
                      disabled={discoveryAnswered}
                      className={`p-4 rounded-xl text-left text-sm transition-all flex items-start gap-3 border ${
                        discoveryAnswered
                          ? isCorrect
                            ? 'bg-emerald-950/50 border-emerald-500 text-emerald-200'
                            : isSelected
                            ? 'bg-rose-950/50 border-rose-500 text-rose-200'
                            : 'bg-slate-950/40 border-slate-800 text-slate-500'
                          : 'bg-slate-950 hover:bg-slate-800 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <span className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold shrink-0">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="leading-snug">{opt}</span>
                    </button>
                  );
                })}
              </div>

              {discoveryAnswered && (
                <div className="p-4 bg-amber-950/30 border border-amber-800/50 rounded-xl text-xs text-amber-200 flex items-start gap-3 animate-fadeIn">
                  <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-bold block mb-1">Key Insight:</strong>
                    {DISCOVERY_QUESTION.hintAfter}
                  </div>
                </div>
              )}
            </div>

            {/* Prediction Questions Section */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-lg space-y-4">
              <h3 className="text-md font-bold text-slate-200 flex items-center gap-2">
                <Eye className="w-5 h-5 text-cyan-400" /> Interactive Lab Predictions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {PREDICTION_QUESTIONS.map((pq, qIdx) => (
                  <div key={qIdx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
                    <div>
                      <p className="text-xs font-semibold text-cyan-400 mb-2">Prediction #{qIdx + 1}</p>
                      <p className="text-xs text-slate-200 mb-3">{pq.question}</p>

                      <div className="space-y-2">
                        {pq.options.map((opt, oIdx) => (
                          <button
                            key={oIdx}
                            onClick={() => {
                              setPredictionAnswers(prev => ({ ...prev, [qIdx]: oIdx }));
                              playSound('tap');
                            }}
                            className={`w-full text-left p-2 rounded text-xs border transition ${
                              predictionAnswers[qIdx] === oIdx
                                ? 'bg-cyan-950 border-cyan-500 text-cyan-200'
                                : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center gap-1.5">
                      <Sliders className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{pq.verifyInstruction}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: INTERACTIVE EXPLORATION LABS */}
        {activeTab === 'lab' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Lab Module Selector Sub-bar */}
            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 flex items-center gap-2 overflow-x-auto">
              {EXPLORATION_STEPS.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCurrentLabStep(idx);
                    playSound('tap');
                    speakPrompt(step.title);
                  }}
                  className={`px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition flex items-center gap-2 ${
                    currentLabStep === idx
                      ? 'bg-cyan-600 text-white shadow-md'
                      : 'bg-slate-950 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  }`}
                >
                  <span className="w-4 h-4 rounded-full bg-slate-900/40 flex items-center justify-center text-[10px] font-bold">
                    {idx + 1}
                  </span>
                  {step.title}
                </button>
              ))}
            </div>

            {/* Instruction Banner */}
            <div className="bg-cyan-950/40 border border-cyan-800/50 p-3 rounded-xl flex items-center gap-3 text-xs text-cyan-200">
              <Info className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>{EXPLORATION_STEPS[currentLabStep].instruction}</span>
            </div>

            {/* Element Quick Selector Strip */}
            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
              <span className="text-xs font-semibold text-slate-400 block mb-2">Select 3d Transition Element:</span>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {ELEMENTS_3D.map(el => {
                  const isSelected = el.symbol === selectedElementSymbol;
                  return (
                    <button
                      key={el.symbol}
                      onClick={() => {
                        setSelectedElementSymbol(el.symbol);
                        playSound('tap');
                      }}
                      className={`px-3 py-2 rounded-lg text-xs font-bold transition flex flex-col items-center min-w-[50px] ${
                        isSelected
                          ? 'bg-amber-500 text-slate-950 shadow-lg scale-105'
                          : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
                      }`}
                    >
                      <span className="text-sm">{el.symbol}</span>
                      <span className="text-[9px] opacity-75">{el.z}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dynamic Interactive Lab Module Switcher */}
            {currentLabStep === 0 && (
              /* LAB 1: Ground Configuration & Cation Ionization */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4">
                  <h3 className="text-sm font-bold text-cyan-400 flex items-center gap-2">
                    <Atom className="w-4 h-4" /> Valence Subshell Electronic Configuration
                  </h3>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400">Element Name:</span>
                      <span className="font-bold text-slate-100">{currentElement.name} (Z = {currentElement.z})</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400">Ground State Config:</span>
                      <span className="font-mono text-cyan-300 font-bold">{currentElement.configGround}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400">Ion State:</span>
                      <span className="font-bold text-amber-400">
                        {cationCharge === 0 ? 'Neutral Atom M⁰' : `${currentElement.symbol}${cationCharge}+`}
                      </span>
                    </div>
                  </div>

                  {/* Cation Control Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-slate-300">
                      <span>Sequentially Ionize Electrons:</span>
                      <span className="font-bold text-amber-400">+{cationCharge} Charge</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="4"
                      value={cationCharge}
                      onChange={e => {
                        setCationCharge(parseInt(e.target.value));
                        playSound('pop');
                      }}
                      className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500">
                      <span>Neutral (M⁰)</span>
                      <span>M⁺¹</span>
                      <span>M⁺²</span>
                      <span>M⁺³</span>
                      <span>M⁺⁴</span>
                    </div>
                  </div>

                  {/* Removals Explanation Box */}
                  <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1">
                    <span className="text-amber-400 font-bold block">Ionization Subshell Removal Order:</span>
                    <p>
                      Remaining 4s electrons: <strong className="text-cyan-300">{calculatedMagneticMoment.sElectrons}</strong> |
                      Remaining 3d electrons: <strong className="text-cyan-300">{calculatedMagneticMoment.dElectrons}</strong>
                    </p>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Notice that 4s electrons are removed completely BEFORE any 3d electrons are touched.
                    </p>
                  </div>
                </div>

                <MagneticMomentVisualizerSVG
                  unpairedCount={calculatedMagneticMoment.unpaired}
                  elementSymbol={currentElement.symbol}
                  ionCharge={cationCharge > 0 ? `${cationCharge}+` : ''}
                />
              </div>
            )}

            {currentLabStep === 1 && (
              /* LAB 2: Periodic Trend Curves (Radii, IE, Atomization) */
              <div className="space-y-4">
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {[
                    { id: 'radius', label: 'Atomic Radius (pm)' },
                    { id: 'ie1', label: '1st Ionization Energy' },
                    { id: 'ie2', label: '2nd Ionization Energy' },
                    { id: 'ie3', label: '3rd Ionization Energy' },
                    { id: 'atomization', label: 'Enthalpy of Atomization' },
                    { id: 'e0', label: 'E°(M²⁺/M) Potential' }
                  ].map(m => (
                    <button
                      key={m.id}
                      onClick={() => {
                        setSelectedMetric(m.id as any);
                        playSound('tap');
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                        selectedMetric === m.id
                          ? 'bg-cyan-500 text-slate-950 font-bold'
                          : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>

                <PeriodicTrendGraphSVG
                  metric={selectedMetric}
                  highlightedElement={selectedElementSymbol}
                  onSelectElement={sym => setSelectedElementSymbol(sym)}
                />

                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <span className="text-slate-400 block mb-1">Atomic Radius:</span>
                    <strong className="text-cyan-300 text-sm">{currentElement.atomicRadius} pm</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-1">3rd Ionization Energy:</span>
                    <strong className="text-cyan-300 text-sm">{currentElement.ie3} kJ/mol</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-1">Atomization Enthalpy:</span>
                    <strong className="text-cyan-300 text-sm">{currentElement.enthalpyAtomization} kJ/mol</strong>
                  </div>
                </div>
              </div>
            )}

            {currentLabStep === 2 && (
              /* LAB 3: Oxidation States Matrix & Reduction Potentials */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4">
                  <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2">
                    <Zap className="w-4 h-4" /> Variable Oxidation States Matrix
                  </h3>
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-xs text-slate-400 block mb-2">Exhibited Oxidation States for {currentElement.name}:</span>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5, 6, 7].map(st => {
                        const exists = currentElement.oxStates.includes(st);
                        const isPrincipal = currentElement.principalOx.includes(st);

                        return (
                          <div
                            key={st}
                            className={`w-8 h-10 rounded-lg flex items-center justify-center font-bold text-sm border transition ${
                              exists
                                ? isPrincipal
                                  ? 'bg-amber-500 border-amber-400 text-slate-950 shadow-md'
                                  : 'bg-cyan-950 border-cyan-700 text-cyan-300'
                                : 'bg-slate-950/40 border-slate-900 text-slate-700'
                            }`}
                          >
                            +{st}
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex gap-4 text-[10px] text-slate-400 mt-3">
                      <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-amber-500 rounded" /> Principal / Stable</span>
                      <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-cyan-950 border border-cyan-700 rounded" /> Secondary</span>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">E°(M²⁺/M) Potential:</span>
                      <span className="font-bold text-cyan-300">{currentElement.e0M2M} V</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">E°(M³⁺/M²⁺) Potential:</span>
                      <span className="font-bold text-purple-300">
                        {currentElement.e0M3M2 !== null ? `${currentElement.e0M3M2} V` : 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-3">
                  <h3 className="text-sm font-bold text-cyan-400">Aqueous Hydration vs Ionization Energy Balance</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Standard electrode potentials reflect the thermodynamic cycle:
                    <br />
                    <code className="text-cyan-300 font-mono text-[11px] block my-2 p-2 bg-slate-950 rounded">
                      M(s) + Δ_at H° → M(g) + IE₁ + IE₂ → M²⁺(g) + Δ_hyd H° → M²⁺(aq)
                    </code>
                    If total excitation enthalpy exceeds hydration release, E° becomes positive (e.g. Cu²⁺ = +0.34 V).
                  </p>
                </div>
              </div>
            )}

            {currentLabStep === 3 && (
              /* LAB 4: Spectroscopy & Color Simulator */
              <div className="space-y-4">
                <CrystalFieldDiagramSVG
                  dCount={currentElement.config3d}
                  deltaO={220}
                  colorHex={currentElement.colorM2Hex}
                  ionName={`${currentElement.symbol}²⁺`}
                />
              </div>
            )}

            {currentLabStep === 4 && (
              /* LAB 5: Catalysis Mechanism & Interstitial Simulator */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4">
                  <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                    <Sliders className="w-4 h-4" /> Interstitial Guest Controls
                  </h3>

                  <div className="space-y-2">
                    <span className="text-xs text-slate-400">Select Interstitial Guest Atom:</span>
                    <div className="flex gap-2">
                      {(['H', 'C', 'N'] as const).map(guest => (
                        <button
                          key={guest}
                          onClick={() => {
                            setInterstitialGuest(guest);
                            playSound('tap');
                          }}
                          className={`px-4 py-2 rounded-lg text-xs font-bold border transition ${
                            interstitialGuest === guest
                              ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                              : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          {guest === 'H' ? 'Hydrogen (H)' : guest === 'C' ? 'Carbon (C)' : 'Nitrogen (N)'}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-slate-300">
                      <span>Interstitial Filling Density:</span>
                      <span className="font-bold text-emerald-400">{interstitialDensity}% Voids Occupied</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      step="15"
                      value={interstitialDensity}
                      onChange={e => {
                        setInterstitialDensity(parseInt(e.target.value));
                        playSound('pop');
                      }}
                      className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                    />
                  </div>
                </div>

                <InterstitialLatticeSVG
                  guestAtom={interstitialGuest}
                  packingDensity={interstitialDensity}
                />
              </div>
            )}

            {/* Observation Questions Section */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-lg space-y-4 mt-6">
              <h3 className="text-md font-bold text-slate-200 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" /> Lab Observations Check
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {OBSERVATION_QUESTIONS.map((oq, oIdx) => (
                  <div key={oIdx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                    <p className="text-xs font-semibold text-slate-200">{oq.question}</p>
                    <div className="space-y-2">
                      {oq.observableOptions.map((opt, optIdx) => (
                        <button
                          key={optIdx}
                          onClick={() => {
                            setObservationAnswers(prev => ({ ...prev, [oIdx]: optIdx }));
                            playSound('tap');
                          }}
                          className={`w-full text-left p-2.5 rounded text-xs border transition ${
                            observationAnswers[oIdx] === optIdx
                              ? optIdx === oq.correctIndex
                                ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
                                : 'bg-rose-950 border-rose-500 text-rose-200'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
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
        )}

        {/* TAB 3: PROGRESSIVE CHALLENGES (22 CHALLENGES) */}
        {activeTab === 'challenges' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Challenge Progress Header */}
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex flex-wrap justify-between items-center gap-4">
              <div>
                <span className="text-xs text-slate-400 block">Challenge Mode</span>
                <h3 className="text-sm font-bold text-cyan-400">
                  Question {currentChallengeIndex + 1} of {CHALLENGES.length}
                </h3>
              </div>

              {/* Tier Indicator */}
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${
                  CHALLENGES[currentChallengeIndex].difficulty === 'foundation'
                    ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                    : CHALLENGES[currentChallengeIndex].difficulty === 'standard'
                    ? 'bg-amber-950 text-amber-400 border-amber-800'
                    : 'bg-purple-950 text-purple-400 border-purple-800'
                }`}>
                  {CHALLENGES[currentChallengeIndex].difficulty.toUpperCase()} TIER
                </span>
                <span className="text-xs text-slate-400">
                  ({CHALLENGES[currentChallengeIndex].competencyLevel})
                </span>
              </div>
            </div>

            {/* Active Challenge Card */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-6">
              <p className="text-base font-medium text-slate-100 leading-relaxed">
                {CHALLENGES[currentChallengeIndex].question}
              </p>

              {/* Challenge Type Input Renderers */}
              {CHALLENGES[currentChallengeIndex].type === 'multiple_choice' && (
                <div className="grid grid-cols-1 gap-3">
                  {CHALLENGES[currentChallengeIndex].options?.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedOption(idx);
                        playSound('tap');
                      }}
                      className={`p-4 rounded-xl text-left text-sm transition flex items-center gap-3 border ${
                        selectedOption === idx
                          ? 'bg-cyan-950 border-cyan-500 text-cyan-200'
                          : 'bg-slate-950 hover:bg-slate-800 border-slate-800 text-slate-300'
                      }`}
                    >
                      <span className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold shrink-0">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{opt}</span>
                    </button>
                  ))}
                </div>
              )}

              {CHALLENGES[currentChallengeIndex].type === 'numeric' && (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      step="any"
                      placeholder="Enter numerical answer..."
                      value={numericAnswer}
                      onChange={e => setNumericAnswer(e.target.value)}
                      className="px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm font-mono text-cyan-300 focus:border-cyan-500 outline-none w-full max-w-xs"
                    />
                    <span className="text-xs text-slate-400 font-semibold">
                      {CHALLENGES[currentChallengeIndex].unit}
                    </span>
                  </div>
                </div>
              )}

              {CHALLENGES[currentChallengeIndex].type === 'drag_sort' && (
                <div className="space-y-3">
                  <p className="text-xs text-slate-400">Click items to re-order sequence from FIRST to LAST:</p>
                  <div className="flex flex-col gap-2">
                    {sortedItems.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between text-xs text-slate-200"
                      >
                        <span className="font-bold text-cyan-400 mr-2">{idx + 1}.</span>
                        <span className="flex-1">{item}</span>
                        <div className="flex gap-1">
                          {idx > 0 && (
                            <button
                              onClick={() => {
                                const copy = [...sortedItems];
                                const temp = copy[idx - 1];
                                copy[idx - 1] = copy[idx];
                                copy[idx] = temp;
                                setSortedItems(copy);
                                playSound('tap');
                              }}
                              className="px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded text-[10px]"
                            >
                              ↑
                            </button>
                          )}
                          {idx < sortedItems.length - 1 && (
                            <button
                              onClick={() => {
                                const copy = [...sortedItems];
                                const temp = copy[idx + 1];
                                copy[idx + 1] = copy[idx];
                                copy[idx] = temp;
                                setSortedItems(copy);
                                playSound('tap');
                              }}
                              className="px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded text-[10px]"
                            >
                              ↓
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                <button
                  onClick={() => {
                    setCurrentHintText(CHALLENGES[currentChallengeIndex].hints[0]);
                    setShowHint(true);
                    playSound('hint');
                  }}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-lg flex items-center gap-1.5 transition"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-amber-400" /> Request Hint
                </button>

                {!challengeFeedback ? (
                  <button
                    onClick={handleChallengeSubmit}
                    disabled={
                      CHALLENGES[currentChallengeIndex].type === 'multiple_choice' && selectedOption === null
                    }
                    className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg transition disabled:opacity-50"
                  >
                    Submit Answer
                  </button>
                ) : (
                  <button
                    onClick={handleNextChallenge}
                    className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg transition flex items-center gap-2"
                  >
                    Next Challenge <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Challenge Feedback Banner */}
              {challengeFeedback && (
                <div
                  className={`p-4 rounded-xl border text-xs leading-relaxed animate-fadeIn ${
                    challengeFeedback.isCorrect
                      ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                      : 'bg-rose-950/60 border-rose-500 text-rose-200'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold mb-1">
                    {challengeFeedback.isCorrect ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-400" />
                    )}
                    {challengeFeedback.isCorrect ? 'Challenge Solved!' : 'Incorrect Solution'}
                  </div>
                  {challengeFeedback.text}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: SUMMARY & REAL WORLD INDUSTRIAL EXTENSION */}
        {activeTab === 'summary' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Real World Activity Card */}
            <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950 p-6 rounded-2xl border border-emerald-800/40 shadow-xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg">
                  <Flame className="w-5 h-5" />
                </div>
                <h2 className="text-lg font-bold text-emerald-300">{REAL_WORLD_ACTIVITY.title}</h2>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>

              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Industrial Process Protocol:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {REAL_WORLD_ACTIVITY.steps.map((step, sIdx) => (
                    <div key={sIdx} className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center justify-center text-[10px] font-bold shrink-0">
                        {sIdx + 1}
                      </span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Misconception Matrix */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-md font-bold text-slate-100 flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-amber-400" /> Common Misconceptions & Clarifications
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MISCONCEPTIONS.map((m, idx) => (
                  <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                    <h4 className="text-xs font-bold text-amber-400">{m.title}</h4>
                    <p className="text-[11px] text-rose-300 bg-rose-950/30 p-2 rounded border border-rose-900/40">
                      <strong>Misconception:</strong> {m.misconception}
                    </p>
                    <p className="text-[11px] text-emerald-300 bg-emerald-950/30 p-2 rounded border border-emerald-900/40">
                      <strong>Correction:</strong> {m.correction}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </main>

      {/* FEEDBACK OVERLAYS */}
      <HintBubble show={showHint} text={currentHintText} />
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccessBanner} text="Challenge Completed Successfully!" />
      <SparkleBurst show={showSparkle} x={400} y={300} />
    </div>
  );
}