'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, masteryProb } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ==========================================
// 1. NODE DEFINITIONS & CONSTANTS
// ==========================================
const NODE_SINGLE = 'c9_chem_031';
const NODE_DOUBLE = 'c9_chem_032';
const NODE_TRIPLE = 'c9_chem_033';
const NODE_LEWIS = 'c9_chem_034';
const NODE_POLARITY = 'c9_chem_035';
const NODE_DATIVE = 'c9_chem_036';
const NODE_PROPERTIES = 'c9_chem_037';
const NODE_GIANT_VS_SIMPLE = 'c9_chem_038';
const NODE_VSEPR = 'c9_chem_039';
const NODE_BOND_ENERGY = 'c9_chem_040';

const ALL_NODE_IDS = [
  NODE_SINGLE,
  NODE_DOUBLE,
  NODE_TRIPLE,
  NODE_LEWIS,
  NODE_POLARITY,
  NODE_DATIVE,
  NODE_PROPERTIES,
  NODE_GIANT_VS_SIMPLE,
  NODE_VSEPR,
  NODE_BOND_ENERGY,
] as const;

// ==========================================
// 2. SCENARIO & CURRICULUM DATA
// ==========================================
const SCENARIO = {
  title: 'Quantum Valence & Molecular Bonding Laboratory',
  intro: 'Welcome to the CISCE Advanced Molecular Chemistry Lab. As a lead research scientist, your mission is to investigate how non-metal atoms share electrons to construct single, double, triple, and coordinate covalent bonds.',
  context: 'You will design dot-and-cross Lewis diagrams, manipulate electronegativity gradients to observe bond polarity, synthesize dative ions like ammonium and hydronium, and test physical properties like electrical conductivity and melting points across simple molecular and giant lattice structures.',
};

const DISCOVERY_QUESTION = {
  question: 'When liquid water (H2O) boils into steam at 100°C, what actually happens at the atomic and molecular level?',
  options: [
    'The strong covalent O-H bonds break, turning water into H2 and O2 gases.',
    'Only weak intermolecular hydrogen bonds break while strong intramolecular covalent O-H bonds remain intact.',
    'Water molecules lose valence electrons and dissociate into full H+ and OH- ions.',
    'The oxygen atom shifts from sp3 hybridization into a linear triple bond arrangement.'
  ],
  correctIndex: 1,
  hintAfter: 'Boiling is a phase change! High thermal energy overcomes weak forces between H2O molecules, leaving the O-H covalent bonds inside each molecule unbroken.',
};

const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Shared Electron Orbital Overlap & Lewis Dot Building',
    instruction: 'Drag valence electrons between hydrogen, chlorine, oxygen, and carbon atoms to construct stable single, double, and triple covalent bonds following the Octet Rule.',
    interactionType: 'lewis_builder',
    nodeId: NODE_SINGLE,
  },
  {
    title: 'Lab 2: Electronegativity & Polar vs Non-Polar Dipoles',
    instruction: 'Adjust the electronegativity slider of two bonded atoms to observe the shift in shared electron density, partial charges (δ+ / δ-), and net molecular dipole vector.',
    interactionType: 'polarity_simulator',
    nodeId: NODE_POLARITY,
  },
  {
    title: 'Lab 3: Coordinate (Dative) Covalent Bond Formation',
    instruction: 'Pair a ammonia (NH3) molecule with a lone pair to an electron-deficient hydrogen ion (H+) to synthesize the ammonium ion (NH4+).',
    interactionType: 'dative_bonding',
    nodeId: NODE_DATIVE,
  },
  {
    title: 'Lab 4: Molecular Geometry & VSEPR Lone-Pair Repulsion',
    instruction: 'Toggle lone pairs and bonding pairs on central atoms (CH4, NH3, H2O) to measure bond angle distortion caused by electron pair repulsion.',
    interactionType: 'vsepr_geometry',
    nodeId: NODE_VSEPR,
  },
  {
    title: 'Lab 5: Physical Properties & Lattice vs Simple Structures',
    instruction: 'Apply heat and voltage to simple covalent crystals (Ice, Sugar) vs giant network structures (Diamond, Quartz, Graphite) to test melting point and electrical conductivity.',
    interactionType: 'property_tester',
    nodeId: NODE_PROPERTIES,
  },
];

const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: Nitrogen gas (N2) forms a triple bond between two nitrogen atoms. How will its bond energy and bond length compare to oxygen gas (O2, double bond)?',
    options: [
      'N2 will have a shorter bond length and higher bond energy than O2.',
      'N2 will have a longer bond length and higher bond energy than O2.',
      'N2 will have a shorter bond length and lower bond energy than O2.',
      'N2 will have identical bond length and energy because both are diatomic non-metals.'
    ],
    correctIndex: 0,
    verifyInstruction: 'Check Lab 1 & Lab 4 molecular database parameters for N2 vs O2 bond properties.',
    nodeId: NODE_BOND_ENERGY,
  },
  {
    question: 'Predict: Why does graphite conduct electricity while diamond (both pure carbon allotropes) acts as an electrical insulator?',
    options: [
      'Graphite contains metallic bonds while diamond is entirely ionic.',
      'In graphite, each carbon bonds to 3 atoms leaving 1 delocalized electron per atom; in diamond, all 4 valence electrons form localized single covalent bonds.',
      'Diamond has a simple molecular structure with low density.',
      'Graphite absorbs hydrogen ions from the atmosphere to carry charge.'
    ],
    correctIndex: 1,
    verifyInstruction: 'Conduct the lattice structure conductivity test in Lab 5 for Graphite vs Diamond.',
    nodeId: NODE_GIANT_VS_SIMPLE,
  },
];

const OBSERVATION_QUESTIONS = [
  {
    question: 'Observation: In the H2O molecule, why is the H-O-H bond angle 104.5° instead of the standard 109.5° tetrahedral angle seen in methane (CH4)?',
    observableOptions: [
      'The 2 lone pairs on Oxygen exert stronger electrostatic repulsion on bonding pairs, pushing the O-H bonds closer together.',
      'Hydrogen atoms attract each other through strong covalent bonds.',
      'Oxygen loses 2 valence electrons into the nucleus.',
      'The bond length increases, pulling hydrogen atoms closer.'
    ],
    correctIndex: 0,
    nodeId: NODE_VSEPR,
  },
  {
    question: 'Observation: What defines the coordinate (dative) bond formed when Ammonia (NH3) reacts with a Hydrogen ion (H+) to yield NH4+?',
    observableOptions: [
      'Both electrons in the shared bond pair are provided exclusively by the Nitrogen atom lone pair.',
      'The H+ ion transfers an electron to Nitrogen.',
      'Nitrogen and Hydrogen transfer electrons to form an ionic salt.',
      'The bond is twice as long as a standard single covalent bond.'
    ],
    correctIndex: 0,
    nodeId: NODE_DATIVE,
  },
];

const REAL_WORLD_ACTIVITY = {
  title: 'Industrial Semiconductor & Catalyst Engineering',
  description: 'Apply principles of covalent bonding, bond enthalpy, and giant crystal lattices to evaluate synthetic materials for high-temperature turbine blades and solar cells.',
  steps: [
    'Step 1: Calculate total valence electron count for Silicon Carbide (SiC) and Silicon Dioxide (SiO2).',
    'Step 2: Analyze crystal lattice geometry: SiC forms a giant 3D covalent network analogous to diamond with sp3 tetrahedral geometry.',
    'Step 3: Compare bond dissociation energies: Si-C (435 kJ/mol) vs C-C (347 kJ/mol) to determine thermal tolerance.',
    'Step 4: Formulate industrial recommendation: Select Silicon Carbide for extreme heat and high voltage applications due to ultra-strong covalent lattice binding.',
  ],
};

const MISCONCEPTIONS = [
  {
    title: 'Covalent Transfer Confusion',
    misconception: 'Covalent bonds involve full transfer of electrons between atoms.',
    correction: 'In covalent bonding, non-metal atoms share pairs of valence electrons to achieve a noble gas octet. No full electron loss or gain occurs.',
    nodeId: NODE_SINGLE,
  },
  {
    title: 'Double Bond Linear Strength Myth',
    misconception: 'Double covalent bonds are exactly twice as strong as single bonds.',
    correction: 'A double bond consists of one strong sigma (σ) bond and one weaker pi (π) bond. Because π overlaps are less efficient, a double bond is stronger than a single bond, but less than double its strength.',
    nodeId: NODE_DOUBLE,
  },
  {
    title: 'Lewis Structure Ownership Error',
    misconception: 'Shared electrons in Lewis structures belong entirely to the more electronegative atom.',
    correction: 'Shared electrons count towards the valence shell octets of BOTH participating atoms, even in polar covalent bonds.',
    nodeId: NODE_LEWIS,
  },
  {
    title: 'Polarity vs Ionic Charge',
    misconception: 'Polar covalent molecules contain discrete positive and negative ions.',
    correction: 'Polarity causes small partial charges (δ+ and δ-) due to unequal sharing. The overall molecule remains electrically neutral and non-ionic.',
    nodeId: NODE_POLARITY,
  },
  {
    title: 'Phase Change Bond Destruction',
    misconception: 'Covalent intramolecular bonds break when simple covalent compounds melt or boil.',
    correction: 'Phase changes overcome weak intermolecular forces (Van der Waals / Hydrogen bonds). Strong intramolecular covalent bonds within molecules stay intact.',
    nodeId: NODE_PROPERTIES,
  },
  {
    title: 'Dative Bond Distinctness',
    misconception: 'A coordinate bond remains fundamentally different from a standard covalent bond once formed.',
    correction: 'Once formed, a coordinate covalent bond is completely identical in length, strength, and chemical properties to any standard single covalent bond.',
    nodeId: NODE_DATIVE,
  },
];

// ==========================================
// 3. DETAILED MOLECULE DATABASE
// ==========================================
interface AtomPosition {
  symbol: string;
  x: number;
  y: number;
  valence: number;
  electronegativity: number;
  lonePairs: number;
}

interface MoleculeData {
  id: string;
  name: string;
  formula: string;
  type: 'single' | 'double' | 'triple' | 'dative' | 'giant';
  nodeId: string;
  atoms: AtomPosition[];
  bondOrder: number;
  bondEnergy: number; // kJ/mol
  bondLength: number; // pm
  vseprShape: string;
  bondAngle: number;
  isPolar: boolean;
  electronegativityDiff: number;
  meltingPoint: number; // °C
  conductivity: string;
  description: string;
  lewisDots: { x: number; y: number; isShared: boolean; owner: string }[];
}

const MOLECULE_DATABASE: MoleculeData[] = [
  {
    id: 'h2',
    name: 'Hydrogen Gas',
    formula: 'H₂',
    type: 'single',
    nodeId: NODE_SINGLE,
    atoms: [
      { symbol: 'H', x: -60, y: 0, valence: 1, electronegativity: 2.20, lonePairs: 0 },
      { symbol: 'H', x: 60, y: 0, valence: 1, electronegativity: 2.20, lonePairs: 0 },
    ],
    bondOrder: 1,
    bondEnergy: 436,
    bondLength: 74,
    vseprShape: 'Linear',
    bondAngle: 180,
    isPolar: false,
    electronegativityDiff: 0.0,
    meltingPoint: -259.1,
    conductivity: 'Non-conductive',
    description: 'Single covalent bond (H-H) formed by 1 shared electron pair. Duplet rule satisfied.',
    lewisDots: [
      { x: -15, y: 0, isShared: true, owner: 'H1' },
      { x: 15, y: 0, isShared: true, owner: 'H2' },
    ],
  },
  {
    id: 'cl2',
    name: 'Chlorine Gas',
    formula: 'Cl₂',
    type: 'single',
    nodeId: NODE_SINGLE,
    atoms: [
      { symbol: 'Cl', x: -70, y: 0, valence: 7, electronegativity: 3.16, lonePairs: 3 },
      { symbol: 'Cl', x: 70, y: 0, valence: 7, electronegativity: 3.16, lonePairs: 3 },
    ],
    bondOrder: 1,
    bondEnergy: 242,
    bondLength: 198,
    vseprShape: 'Linear',
    bondAngle: 180,
    isPolar: false,
    electronegativityDiff: 0.0,
    meltingPoint: -101.5,
    conductivity: 'Non-conductive',
    description: 'Single covalent bond between chlorine atoms. Each Cl has 3 lone pairs.',
    lewisDots: [
      { x: -15, y: -5, isShared: true, owner: 'Cl1' },
      { x: 15, y: 5, isShared: true, owner: 'Cl2' },
    ],
  },
  {
    id: 'hcl',
    name: 'Hydrogen Chloride',
    formula: 'HCl',
    type: 'single',
    nodeId: NODE_POLARITY,
    atoms: [
      { symbol: 'H', x: -65, y: 0, valence: 1, electronegativity: 2.20, lonePairs: 0 },
      { symbol: 'Cl', x: 65, y: 0, valence: 7, electronegativity: 3.16, lonePairs: 3 },
    ],
    bondOrder: 1,
    bondEnergy: 431,
    bondLength: 127,
    vseprShape: 'Linear',
    bondAngle: 180,
    isPolar: true,
    electronegativityDiff: 0.96,
    meltingPoint: -114.2,
    conductivity: 'Conducts when dissolved in H2O (ionization)',
    description: 'Polar single covalent bond. Electron pair pulled towards Chlorine (δ-).',
    lewisDots: [
      { x: -10, y: 0, isShared: true, owner: 'H' },
      { x: 10, y: 0, isShared: true, owner: 'Cl' },
    ],
  },
  {
    id: 'o2',
    name: 'Oxygen Gas',
    formula: 'O₂',
    type: 'double',
    nodeId: NODE_DOUBLE,
    atoms: [
      { symbol: 'O', x: -60, y: 0, valence: 6, electronegativity: 3.44, lonePairs: 2 },
      { symbol: 'O', x: 60, y: 0, valence: 6, electronegativity: 3.44, lonePairs: 2 },
    ],
    bondOrder: 2,
    bondEnergy: 498,
    bondLength: 121,
    vseprShape: 'Linear',
    bondAngle: 180,
    isPolar: false,
    electronegativityDiff: 0.0,
    meltingPoint: -218.8,
    conductivity: 'Non-conductive',
    description: 'Double covalent bond (O=O) sharing 2 pairs of valence electrons (1 σ, 1 π bond).',
    lewisDots: [
      { x: -12, y: -10, isShared: true, owner: 'O1' },
      { x: 12, y: -10, isShared: true, owner: 'O2' },
      { x: -12, y: 10, isShared: true, owner: 'O1' },
      { x: 12, y: 10, isShared: true, owner: 'O2' },
    ],
  },
  {
    id: 'n2',
    name: 'Nitrogen Gas',
    formula: 'N₂',
    type: 'triple',
    nodeId: NODE_TRIPLE,
    atoms: [
      { symbol: 'N', x: -55, y: 0, valence: 5, electronegativity: 3.04, lonePairs: 1 },
      { symbol: 'N', x: 55, y: 0, valence: 5, electronegativity: 3.04, lonePairs: 1 },
    ],
    bondOrder: 3,
    bondEnergy: 945,
    bondLength: 110,
    vseprShape: 'Linear',
    bondAngle: 180,
    isPolar: false,
    electronegativityDiff: 0.0,
    meltingPoint: -210.0,
    conductivity: 'Non-conductive',
    description: 'Triple covalent bond (N≡N) sharing 3 pairs of electrons (1 σ, 2 π bonds). Very inert.',
    lewisDots: [
      { x: -12, y: -14, isShared: true, owner: 'N1' },
      { x: 12, y: -14, isShared: true, owner: 'N2' },
      { x: -12, y: 0, isShared: true, owner: 'N1' },
      { x: 12, y: 0, isShared: true, owner: 'N2' },
      { x: -12, y: 14, isShared: true, owner: 'N1' },
      { x: 12, y: 14, isShared: true, owner: 'N2' },
    ],
  },
  {
    id: 'ch4',
    name: 'Methane',
    formula: 'CH₄',
    type: 'single',
    nodeId: NODE_VSEPR,
    atoms: [
      { symbol: 'C', x: 0, y: 0, valence: 4, electronegativity: 2.55, lonePairs: 0 },
      { symbol: 'H', x: 0, y: -75, valence: 1, electronegativity: 2.20, lonePairs: 0 },
      { symbol: 'H', x: -70, y: 35, valence: 1, electronegativity: 2.20, lonePairs: 0 },
      { symbol: 'H', x: 70, y: 35, valence: 1, electronegativity: 2.20, lonePairs: 0 },
      { symbol: 'H', x: 0, y: 75, valence: 1, electronegativity: 2.20, lonePairs: 0 },
    ],
    bondOrder: 1,
    bondEnergy: 414,
    bondLength: 109,
    vseprShape: 'Tetrahedral',
    bondAngle: 109.5,
    isPolar: false,
    electronegativityDiff: 0.35,
    meltingPoint: -182.5,
    conductivity: 'Non-conductive',
    description: '4 single C-H covalent bonds. Symmetrical tetrahedral arrangement cancels micro-dipoles.',
    lewisDots: [],
  },
  {
    id: 'nh3',
    name: 'Ammonia',
    formula: 'NH₃',
    type: 'single',
    nodeId: NODE_VSEPR,
    atoms: [
      { symbol: 'N', x: 0, y: -10, valence: 5, electronegativity: 3.04, lonePairs: 1 },
      { symbol: 'H', x: -65, y: 50, valence: 1, electronegativity: 2.20, lonePairs: 0 },
      { symbol: 'H', x: 0, y: 75, valence: 1, electronegativity: 2.20, lonePairs: 0 },
      { symbol: 'H', x: 65, y: 50, valence: 1, electronegativity: 2.20, lonePairs: 0 },
    ],
    bondOrder: 1,
    bondEnergy: 391,
    bondLength: 101,
    vseprShape: 'Trigonal Pyramidal',
    bondAngle: 107.0,
    isPolar: true,
    electronegativityDiff: 0.84,
    meltingPoint: -77.7,
    conductivity: 'Weakly conductive in aqueous solution',
    description: '3 bonding pairs + 1 lone pair on Nitrogen. Lone pair repels bonding pairs to 107°.',
    lewisDots: [],
  },
  {
    id: 'h2o',
    name: 'Water',
    formula: 'H₂O',
    type: 'single',
    nodeId: NODE_VSEPR,
    atoms: [
      { symbol: 'O', x: 0, y: -15, valence: 6, electronegativity: 3.44, lonePairs: 2 },
      { symbol: 'H', x: -60, y: 45, valence: 1, electronegativity: 2.20, lonePairs: 0 },
      { symbol: 'H', x: 60, y: 45, valence: 1, electronegativity: 2.20, lonePairs: 0 },
    ],
    bondOrder: 1,
    bondEnergy: 464,
    bondLength: 96,
    vseprShape: 'Bent / V-shaped',
    bondAngle: 104.5,
    isPolar: true,
    electronegativityDiff: 1.24,
    meltingPoint: 0.0,
    conductivity: 'Pure water non-conductive; ionizes weakly',
    description: '2 bonding pairs + 2 lone pairs on Oxygen. Strong lone pair-lone pair repulsion compresses bond angle to 104.5°.',
    lewisDots: [],
  },
  {
    id: 'nh4_plus',
    name: 'Ammonium Ion',
    formula: 'NH₄⁺',
    type: 'dative',
    nodeId: NODE_DATIVE,
    atoms: [
      { symbol: 'N', x: 0, y: 0, valence: 5, electronegativity: 3.04, lonePairs: 0 },
      { symbol: 'H', x: 0, y: -70, valence: 1, electronegativity: 2.20, lonePairs: 0 },
      { symbol: 'H', x: -70, y: 0, valence: 1, electronegativity: 2.20, lonePairs: 0 },
      { symbol: 'H', x: 70, y: 0, valence: 1, electronegativity: 2.20, lonePairs: 0 },
      { symbol: 'H⁺', x: 0, y: 70, valence: 0, electronegativity: 2.20, lonePairs: 0 },
    ],
    bondOrder: 1,
    bondEnergy: 391,
    bondLength: 101,
    vseprShape: 'Tetrahedral',
    bondAngle: 109.5,
    isPolar: false,
    electronegativityDiff: 0.84,
    meltingPoint: 337.8, // decomposes (salt)
    conductivity: 'Conducts in molten/solution state',
    description: '3 standard single covalent bonds + 1 coordinate (dative) bond from N lone pair to H⁺.',
    lewisDots: [],
  },
  {
    id: 'h3o_plus',
    name: 'Hydronium Ion',
    formula: 'H₃O⁺',
    type: 'dative',
    nodeId: NODE_DATIVE,
    atoms: [
      { symbol: 'O', x: 0, y: -10, valence: 6, electronegativity: 3.44, lonePairs: 1 },
      { symbol: 'H', x: -55, y: 45, valence: 1, electronegativity: 2.20, lonePairs: 0 },
      { symbol: 'H', x: 55, y: 45, valence: 1, electronegativity: 2.20, lonePairs: 0 },
      { symbol: 'H⁺', x: 0, y: -65, valence: 0, electronegativity: 2.20, lonePairs: 0 },
    ],
    bondOrder: 1,
    bondEnergy: 464,
    bondLength: 97,
    vseprShape: 'Trigonal Pyramidal',
    bondAngle: 107.0,
    isPolar: true,
    electronegativityDiff: 1.24,
    meltingPoint: -15.0,
    conductivity: 'High ionic conductivity in aqueous acid',
    description: 'Oxygen shares one of its two lone pairs with an empty 1s orbital of H⁺ to form a dative bond.',
    lewisDots: [],
  },
  {
    id: 'diamond',
    name: 'Diamond (Carbon Allotrope)',
    formula: 'C (Giant Network)',
    type: 'giant',
    nodeId: NODE_GIANT_VS_SIMPLE,
    atoms: [
      { symbol: 'C', x: 0, y: 0, valence: 4, electronegativity: 2.55, lonePairs: 0 },
    ],
    bondOrder: 1,
    bondEnergy: 347,
    bondLength: 154,
    vseprShape: '3D Tetrahedral Network',
    bondAngle: 109.5,
    isPolar: false,
    electronegativityDiff: 0.0,
    meltingPoint: 3550.0,
    conductivity: 'Insulator (No free mobile electrons)',
    description: 'Continuous 3D network of carbon atoms each tetrahedrally bonded to 4 carbon atoms. Extremely hard.',
    lewisDots: [],
  },
  {
    id: 'graphite',
    name: 'Graphite (Carbon Allotrope)',
    formula: 'C (Layered Network)',
    type: 'giant',
    nodeId: NODE_GIANT_VS_SIMPLE,
    atoms: [
      { symbol: 'C', x: 0, y: 0, valence: 4, electronegativity: 2.55, lonePairs: 0 },
    ],
    bondOrder: 1.33,
    bondEnergy: 420,
    bondLength: 142,
    vseprShape: 'Hexagonal 2D Layers',
    bondAngle: 120.0,
    isPolar: false,
    electronegativityDiff: 0.0,
    meltingPoint: 3652.0,
    conductivity: 'Good electrical conductor along layers (delocalized π electrons)',
    description: 'Planar hexagonal sheets of sp2 carbon. 1 free delocalized valence electron per carbon atom enables electrical conduction.',
    lewisDots: [],
  },
];

// ==========================================
// 4. 24 PROGRESSIVE CHALLENGES (3 TIERS)
// ==========================================
interface Challenge {
  id: string;
  nodeId: string;
  type: 'multiple_choice' | 'classify' | 'drag_sort' | 'numeric' | 'identification';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: string;
  question: string;
  options?: string[];
  correctIndex?: number;
  correctAnswer?: number | string;
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
}

const CHALLENGES: Challenge[] = [
  // --- FOUNDATION TIER (1 - 8) ---
  {
    id: 'c1',
    nodeId: NODE_SINGLE,
    type: 'multiple_choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall & Understanding',
    question: 'How many pairs of shared electrons are present in a single covalent bond?',
    options: ['1 shared pair (2 electrons)', '2 shared pairs (4 electrons)', '3 shared pairs (6 electrons)', '0 shared pairs (electron transfer)'],
    correctIndex: 0,
    explanation: 'A single covalent bond is formed by mutual sharing of ONE pair of electrons (2 valence electrons) between two non-metal atoms.',
    hints: [
      'Think of H2 or Cl2 molecule.',
      'Single bond = 1 line = 1 pair of electrons.',
      '1 pair consists of exactly 2 electrons.'
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'c2',
    nodeId: NODE_DOUBLE,
    type: 'multiple_choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall & Understanding',
    question: 'Which of the following molecules contains a double covalent bond?',
    options: ['Hydrogen gas (H2)', 'Oxygen gas (O2)', 'Nitrogen gas (N2)', 'Methane (CH4)'],
    correctIndex: 1,
    explanation: 'Oxygen (O2) shares two pairs of valence electrons (4 electrons total) to form a double covalent bond (O=O) so both oxygen atoms attain an octet.',
    hints: [
      'Oxygen has 6 valence electrons and needs 2 more.',
      'Two oxygen atoms share 2 pairs of electrons.',
      'O2 has double bonds, whereas N2 has triple bonds.'
    ],
  },
  {
    id: 'c3',
    nodeId: NODE_TRIPLE,
    type: 'multiple_choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall & Understanding',
    question: 'In a Nitrogen molecule (N2), how many total valence electrons are shared between the two nitrogen nuclei?',
    options: ['2 electrons', '4 electrons', '6 electrons', '8 electrons'],
    correctIndex: 2,
    explanation: 'Nitrogen gas (N2) features a triple covalent bond (N≡N). A triple bond consists of 3 shared pairs, equaling 6 shared electrons.',
    hints: [
      'Nitrogen needs 3 electrons to complete its octet (5 + 3 = 8).',
      'Each Nitrogen contributes 3 electrons to the central overlap.',
      '3 pairs × 2 electrons = 6 shared electrons.'
    ],
  },
  {
    id: 'c4',
    nodeId: NODE_LEWIS,
    type: 'multiple_choice',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'What do the dots and crosses represent in a Lewis dot-and-cross diagram?',
    options: [
      'Protons in the nucleus',
      'Valence electrons belonging to different participating atoms',
      'Neutrons transferred during bonding',
      'Alpha particles emitted during radioactive decay'
    ],
    correctIndex: 1,
    explanation: 'Dots and crosses are visual symbols used to distinguish the origin of valence electrons contributed by different atoms forming covalent bonds.',
    hints: [
      'Only outer shell electrons participate in chemical bonding.',
      'One atom electrons are drawn as dots; the other atom as crosses.',
      'They represent valence electrons.'
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'c5',
    nodeId: NODE_POLARITY,
    type: 'multiple_choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'A covalent bond between two atoms with IDENTICAL electronegativities (such as Cl-Cl) is classified as:',
    options: ['Non-polar covalent', 'Polar covalent', 'Coordinate dative', 'Electrovalent ionic'],
    correctIndex: 0,
    explanation: 'When electronegativity difference ΔEN = 0, shared electrons are held equally between both nuclei, resulting in a non-polar covalent bond.',
    hints: [
      'Identical atoms exert equal pull on shared electrons.',
      'Equal pull means symmetrical electron density distribution.',
      'Symmetrical distribution = non-polar.'
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'c6',
    nodeId: NODE_DATIVE,
    type: 'multiple_choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall & Understanding',
    question: 'What is a necessary condition for an atom to form a coordinate (dative) covalent bond with an electron-deficient species?',
    options: [
      'The donor atom must possess at least one unshared lone pair of valence electrons.',
      'The donor atom must lose all inner shell electrons.',
      'Both atoms must have identical atomic numbers.',
      'The donor atom must be a alkali metal ion.'
    ],
    correctIndex: 0,
    explanation: 'A coordinate bond requires a donor atom containing an unshared lone pair of electrons to donate both electrons to an empty orbital of an acceptor atom.',
    hints: [
      'Think of Nitrogen in Ammonia (NH3).',
      'Nitrogen has 1 unshared pair of electrons (lone pair).',
      'It shares this lone pair with H+ to form NH4+.'
    ],
    misconceptionIndex: 5,
  },
  {
    id: 'c7',
    nodeId: NODE_PROPERTIES,
    type: 'multiple_choice',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'Why do simple covalent molecular compounds like CH4 and H2O generally have low melting and boiling points?',
    options: [
      'Their covalent bonds are extremely weak and easy to snap.',
      'Intermolecular forces between discrete molecules are weak and require little thermal energy to overcome.',
      'Their valence electrons immediately turn into free ions.',
      'They contain zero valence electrons.'
    ],
    correctIndex: 1,
    explanation: 'Melting or boiling simple covalent substances only requires breaking weak intermolecular forces (Van der Waals/H-bonds). Strong intramolecular covalent bonds inside molecules remain intact.',
    hints: [
      'Distinguish between intramolecular bonds and intermolecular forces.',
      'Covalent bonds inside H2O do NOT break during boiling.',
      'Only weak forces holding adjacent H2O molecules together are overcome.'
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'c8',
    nodeId: NODE_GIANT_VS_SIMPLE,
    type: 'multiple_choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'Which of the following is a giant 3D network covalent structure with an extremely high melting point (~3550°C)?',
    options: ['Water ice (H2O)', 'Carbon dioxide (CO2)', 'Diamond (C)', 'Methane (CH4)'],
    correctIndex: 2,
    explanation: 'Diamond is a giant covalent crystal lattice where every carbon atom is tetrahedrally bonded to 4 other carbons by strong covalent bonds extending throughout the lattice.',
    hints: [
      'Look for a pure carbon allotrope known as the hardest natural substance.',
      'Ice, CO2, and CH4 are simple molecular covalent substances.',
      'Diamond is a giant network.'
    ],
  },

  // --- STANDARD TIER (9 - 16) ---
  {
    id: 'c9',
    nodeId: NODE_VSEPR,
    type: 'multiple_choice',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'According to VSEPR theory, why is the bond angle in Water (104.5°) smaller than that in Methane (109.5°)?',
    options: [
      'Oxygen has a smaller atomic mass than Carbon.',
      'Water has 2 lone pairs on Oxygen which exert greater repulsion on bonding pairs than bond pair-bond pair repulsion in CH4.',
      'Methane contains polar bonds while water is non-polar.',
      'Hydrogen atoms in water repel each other with magnetic force.'
    ],
    correctIndex: 1,
    explanation: 'Lone pair-lone pair repulsion > lone pair-bond pair repulsion > bond pair-bond pair repulsion. Water has 2 lone pairs on Oxygen, compressing the H-O-H angle from 109.5° down to 104.5°.',
    hints: [
      'Count lone pairs on the central atom: Carbon in CH4 has 0 lone pairs; Oxygen in H2O has 2 lone pairs.',
      'Lone pairs occupy more space and push bonding pairs closer together.',
      'Greater lone pair repulsion reduces the bond angle.'
    ],
  },
  {
    id: 'c10',
    nodeId: NODE_POLARITY,
    type: 'multiple_choice',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'Carbon dioxide (CO2) contains two polar C=O bonds (ΔEN = 0.89), yet CO2 is a NON-POLAR molecule. Why?',
    options: [
      'Carbon transfers its electrons completely to oxygen.',
      'The molecule has a linear symmetric geometry (O=C=O) so the two equal bond dipoles point in opposite directions and cancel out.',
      'Oxygen loses its electronegativity when forming double bonds.',
      'The double bonds turn into single ionic bonds.'
    ],
    correctIndex: 1,
    explanation: 'Molecular polarity depends on shape! In linear O=C=O, dipole vectors point in exactly opposite directions (180°), canceling the net dipole moment to zero.',
    hints: [
      'Draw the 3D molecular shape of CO2: linear O=C=O.',
      'Each C=O bond is polar, pulling electrons toward Oxygen.',
      'Two equal and opposite vectors cancel each other out.'
    ],
  },
  {
    id: 'c11',
    nodeId: NODE_DATIVE,
    type: 'multiple_choice',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'In the formation of a Hydronium ion (H3O+) from H2O and H+, which atom acts as the Lewis base (electron pair donor)?',
    options: ['Hydrogen ion (H+)', 'Oxygen atom in H2O', 'Hydrogen atom in H2O', 'Hydronium nucleus'],
    correctIndex: 1,
    explanation: 'A Lewis base is an electron pair donor. Oxygen in H2O has 2 lone pairs and donates one pair to the electron-deficient H+ ion (Lewis acid).',
    hints: [
      'Lewis base = electron pair donor; Lewis acid = electron pair acceptor.',
      'H+ has 0 electrons (empty orbital).',
      'Oxygen in H2O has unshared lone pairs to donate.'
    ],
  },
  {
    id: 'c12',
    nodeId: NODE_BOND_ENERGY,
    type: 'multiple_choice',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'Rank the C-C carbon-carbon bond lengths in Ethane (C2H6, single), Ethylene (C2H4, double), and Acetylene (C2H2, triple) from SHORTEST to LONGEST:',
    options: [
      'Acetylene (triple) < Ethylene (double) < Ethane (single)',
      'Ethane (single) < Ethylene (double) < Acetylene (triple)',
      'Ethylene (double) < Ethane (single) < Acetylene (triple)',
      'All three have identical carbon-carbon bond lengths.'
    ],
    correctIndex: 0,
    explanation: 'As bond order increases (single → double → triple), more shared electron pairs pull the two carbon nuclei closer together. Triple bonds are shortest (~120 pm) and single bonds are longest (~154 pm).',
    hints: [
      'Higher bond order means stronger electrostatic attraction pulling nuclei together.',
      'Triple bonds share 6 electrons, pulling atoms tightest.',
      'Triple (shortest) < Double < Single (longest).'
    ],
  },
  {
    id: 'c13',
    nodeId: NODE_LEWIS,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'Calculate the total number of VALENCE ELECTRONS that must be drawn in the complete Lewis structure of a Nitrate ion (NO3-). (N=5, O=6, charge=-1)',
    correctAnswer: 24,
    explanation: 'Valence calculation: Nitrogen (5) + 3 × Oxygen (3 × 6 = 18) + 1 extra electron for the -1 negative charge = 5 + 18 + 1 = 24 valence electrons.',
    hints: [
      'Add nitrogen valence electrons (5) to 3 × oxygen valence electrons (18).',
      'Add 1 additional electron for the negative ionic charge.',
      '5 + 18 + 1 = 24.'
    ],
  },
  {
    id: 'c14',
    nodeId: NODE_GIANT_VS_SIMPLE,
    type: 'multiple_choice',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'Silicon dioxide (SiO2 / Quartz) has a very high melting point (~1710°C) and does not conduct electricity. What type of bonding structure does it possess?',
    options: ['Simple molecular covalent', 'Giant network covalent lattice', 'Electrovalent ionic crystal', 'Metallic lattice'],
    correctIndex: 1,
    explanation: 'SiO2 forms a giant 3D covalent network structure where every Silicon atom is covalently bonded to 4 Oxygen atoms, requiring enormous thermal energy to break strong covalent bonds throughout.',
    hints: [
      'Think of sand and quartz.',
      'It has high melting point like Diamond.',
      'Covalent bonds extend in 3D network.'
    ],
  },
  {
    id: 'c15',
    nodeId: NODE_SINGLE,
    type: 'multiple_choice',
    difficulty: 'standard',
    competencyLevel: 'Understanding',
    question: 'How many SINGLE covalent bonds are present in one molecule of Methane (CH4)?',
    options: ['1', '2', '3', '4'],
    correctIndex: 3,
    explanation: 'Carbon has 4 valence electrons and forms 4 single covalent C-H bonds with four separate hydrogen atoms to complete its octet.',
    hints: [
      'Carbon needs 4 electrons to complete 8.',
      'Each H atom provides 1 electron.',
      '4 hydrogen atoms form 4 single C-H bonds.'
    ],
  },
  {
    id: 'c16',
    nodeId: NODE_BOND_ENERGY,
    type: 'multiple_choice',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'Why is the bond dissociation energy of a double bond (O=O, 498 kJ/mol) LESS than double the energy of a single bond (O-O, ~146 kJ/mol × 2 = 292 kJ/mol)?',
    options: [
      'A double bond consists of one strong σ bond and one weaker π bond due to side-by-side orbital overlap.',
      'Oxygen atoms lose protons when double bonding.',
      'Double bonds contain electrovalent ionic components.',
      'Single bonds are immune to thermal dissociation.'
    ],
    correctIndex: 0,
    explanation: 'Sigma (σ) bonds form by head-on orbital overlap and are strong. Pi (π) bonds form by lateral side-by-side overlap, which is less effective and weaker, so double bond strength is not a simple integer multiple.',
    hints: [
      'Single bond = 1 sigma bond.',
      'Double bond = 1 sigma bond + 1 pi bond.',
      'Pi bonds have less orbital overlap efficiency than sigma bonds.'
    ],
    misconceptionIndex: 1,
  },

  // --- ADVANCED TIER (17 - 24) ---
  {
    id: 'c17',
    nodeId: NODE_VSEPR,
    type: 'multiple_choice',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'Predict the VSEPR electron pair geometry and actual molecular shape of the Hydronium ion (H3O+).',
    options: [
      'Electron geometry: Tetrahedral; Molecular shape: Trigonal Pyramidal (1 lone pair, 3 bonding pairs)',
      'Electron geometry: Trigonal Planar; Molecular shape: Linear',
      'Electron geometry: Octahedral; Molecular shape: Square Planar',
      'Electron geometry: Bent; Molecular shape: Tetrahedral'
    ],
    correctIndex: 0,
    explanation: 'Oxygen in H3O+ has 4 electron domains (3 bonding pairs + 1 lone pair), giving a tetrahedral electron pair geometry and a trigonal pyramidal molecular geometry (approx 107° bond angle).',
    hints: [
      'Oxygen valence = 6 - 1 (for charge) = 5 electrons. 3 bonded to H = 3 pairs + 1 lone pair = 4 domains.',
      '4 domains = Tetrahedral electron arrangement.',
      '3 bonding pairs + 1 lone pair = Trigonal Pyramidal shape.'
    ],
  },
  {
    id: 'c18',
    nodeId: NODE_POLARITY,
    type: 'multiple_choice',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'Consider Trichloromethane (Chloroform, CHCl3) and Carbon Tetrachloride (CCl4). Explain why CCl4 is non-polar while CHCl3 is strongly polar.',
    options: [
      'CCl4 has symmetrical tetrahedral arrangement of 4 identical C-Cl bond dipoles that cancel to zero; CHCl3 has asymmetric C-H vs C-Cl dipoles that do not cancel.',
      'CCl4 is ionic while CHCl3 is covalent.',
      'Chlorine atoms in CCl4 have zero electronegativity.',
      'CHCl3 forms giant 3D covalent sheets.'
    ],
    correctIndex: 0,
    explanation: 'In CCl4, four identical C-Cl dipoles symmetrically cancel out in 3D tetrahedral space (net dipole = 0). In CHCl3, the C-H bond dipole differs from the three C-Cl dipoles, creating a net dipole moment towards the Cl atoms.',
    hints: [
      'Check symmetry! CCl4 has 4 identical bonds pointing tetrahedrally.',
      'CHCl3 replaces one Cl with H.',
      'Asymmetrical dipole distribution yields a net polar molecule.'
    ],
  },
  {
    id: 'c19',
    nodeId: NODE_DATIVE,
    type: 'multiple_choice',
    difficulty: 'advanced',
    competencyLevel: 'Analysis & Synthesis',
    question: 'Once the coordinate bond is formed in Ammonium (NH4+), how does it compare to the other three standard single covalent N-H bonds in terms of bond length and strength?',
    options: [
      'It is weaker and longer than the other three bonds.',
      'It is stronger and shorter than the other three bonds.',
      'It becomes completely indistinguishable from the other three single covalent bonds in length, strength, and properties.',
      'It constantly oscillates between an ionic bond and a double bond.'
    ],
    correctIndex: 2,
    explanation: 'Once formed, electron density delocalizes equally across all 4 N-H bonds. All four N-H bonds in NH4+ are identical in bond length (101 pm), bond energy (391 kJ/mol), and chemical behavior.',
    hints: [
      'Electrons are identical once in the bonding orbital.',
      'The origin of the electron pair (one atom vs both atoms) leaves no signature.',
      'All 4 N-H bonds in NH4+ are equivalent.'
    ],
    misconceptionIndex: 5,
  },
  {
    id: 'c20',
    nodeId: NODE_GIANT_VS_SIMPLE,
    type: 'multiple_choice',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'Graphite is soft and used as a lubricant, whereas Diamond is the hardest known natural substance. What structural feature accounts for this contrast?',
    options: [
      'Graphite has weak Van der Waals forces between its 2D covalent layers allowing layers to slide; Diamond has a rigid 3D continuous network of covalent bonds.',
      'Diamond contains ionic bonds while Graphite is pure metallic.',
      'Graphite atoms have 2 valence electrons while Diamond has 8.',
      'Diamond dissolves in water to form liquid carbon.'
    ],
    correctIndex: 0,
    explanation: 'Graphite consists of 2D hexagonal sheets bound by strong covalent bonds within layers, but weak intermolecular forces between layers, allowing sheets to slip. Diamond has strong 3D sp3 covalent bonding throughout.',
    hints: [
      'Compare 2D layered network vs 3D tetrahedral network.',
      'Layers in graphite can slide past one another because of weak inter-layer forces.',
      'Diamond has 3D covalent crosslinking in all directions.'
    ],
  },
  {
    id: 'c21',
    nodeId: NODE_BOND_ENERGY,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Application & Calculation',
    question: 'Estimate the net enthalpy change ΔH (in kJ/mol) for the gas phase synthesis of Ammonia: N2 + 3H2 → 2NH3. (Bond energies: N≡N = 945 kJ/mol, H-H = 436 kJ/mol, N-H = 391 kJ/mol). Enter the numeric value only (use negative sign for exothermic).',
    correctAnswer: -93,
    explanation: 'Bonds broken: 1 × N≡N (945) + 3 × H-H (3 × 436 = 1308) = +2253 kJ/mol. Bonds formed: 2 × 3 N-H = 6 × N-H (6 × 391 = 2346 kJ/mol). ΔH = Bonds broken - Bonds formed = 2253 - 2346 = -93 kJ/mol.',
    hints: [
      'Calculate energy to break reactants: 945 + 3(436) = 2253 kJ.',
      'Calculate energy released forming products: 2 molecules of NH3 have 6 N-H bonds → 6 × 391 = 2346 kJ.',
      'ΔH = Reactants broken - Products formed = 2253 - 2346 = -93 kJ/mol.'
    ],
  },
  {
    id: 'c22',
    nodeId: NODE_LEWIS,
    type: 'multiple_choice',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'Which of the following species EXCEEDS the octet rule (expanded octet with 10 or 12 valence electrons on the central atom)?',
    options: ['Sulfur Hexafluoride (SF6)', 'Methane (CH4)', 'Ammonia (NH3)', 'Water (H2O)'],
    correctIndex: 0,
    explanation: 'Sulfur in SF6 uses d-orbitals in period 3 to accommodate 6 bonding pairs (12 valence electrons around Sulfur), expanding its octet beyond 8.',
    hints: [
      'Period 3 elements (like Sulfur, Phosphorus) can expand their octets beyond 8 electrons.',
      'SF6 has 6 fluorine atoms single-bonded to central Sulfur.',
      '6 bonds × 2 electrons = 12 valence electrons on Sulfur.'
    ],
  },
  {
    id: 'c23',
    nodeId: NODE_PROPERTIES,
    type: 'multiple_choice',
    difficulty: 'advanced',
    competencyLevel: 'Analysis',
    question: 'Why does liquid hydrogen chloride (pure HCl) NOT conduct electricity, whereas aqueous hydrochloric acid (HCl in H2O) is a strong electrical conductor?',
    options: [
      'Pure HCl consists of neutral covalent molecules without mobile ions; in water, HCl reacts protolytically to form hydronium (H3O+) and chloride (Cl-) mobile ions.',
      'Water transfers electrons into pure HCl to create metallic bonds.',
      'Pure HCl is an ionic solid at room temperature.',
      'Hydrochloric acid absorbs free electrons directly from atmospheric nitrogen.'
    ],
    correctIndex: 0,
    explanation: 'Covalent compounds lack mobile charge carriers. When HCl gas dissolves in water, polar H2O molecules cause ionisation: HCl + H2O → H3O+ + Cl-. The free mobile ions enable electrical conduction.',
    hints: [
      'Electrical conduction requires mobile charged particles (ions or delocalized electrons).',
      'Pure covalent HCl has no free ions.',
      'Water ionizes HCl into mobile H3O+ and Cl- ions.'
    ],
  },
  {
    id: 'c24',
    nodeId: NODE_VSEPR,
    type: 'multiple_choice',
    difficulty: 'advanced',
    competencyLevel: 'Synthesis',
    question: 'Predict the molecular geometry of Carbon Monoxide (CO) and identify the bonding contribution of Oxygen to Carbon.',
    options: [
      'Linear; 2 standard covalent bonds + 1 coordinate (dative) bond donated by Oxygen to Carbon',
      'Bent 104.5°; 3 single covalent bonds',
      'Tetrahedral; 4 double bonds',
      'Trigonal planar; 1 ionic bond'
    ],
    correctIndex: 0,
    explanation: 'In CO (:C≡O:), both atoms achieve octets via a triple bond consisting of 2 standard shared pairs plus 1 coordinate bond where Oxygen donates its lone pair into Carbon empty orbital.',
    hints: [
      'Carbon has 4 valence electrons; Oxygen has 6.',
      'To reach 8 each, 6 electrons must be shared (triple bond).',
      '2 electrons come from Carbon, 4 come from Oxygen (1 coordinate bond).'
    ],
  },
];

// ==========================================
// 5. CUSTOM SVG VISUALIZERS
// ==========================================

/** Lewis & Atomic Overlap SVG Diagram */
const LewisStructureSVG: React.FC<{
  molecule: MoleculeData;
  userSharedPairs?: number;
}> = ({ molecule, userSharedPairs }) => {
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse((p) => (p + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const rad = (pulse * Math.PI) / 180;
  const glowOpacity = 0.5 + 0.3 * Math.sin(rad);

  return (
    <div className="relative w-full h-72 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-center overflow-hidden shadow-inner p-4">
      <svg viewBox="-200 -120 400 240" className="w-full h-full">
        <defs>
          <radialGradient id="atomGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="electronGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#facc15" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#eab308" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="bondGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="50%" stopColor="#f43f5e" />
            <stop offset="100%" stopColor="#818cf8" />
          </linearGradient>
        </defs>

        {/* Orbitals Overlap circles */}
        {molecule.atoms.map((atom, idx) => (
          <g key={`orbit-${idx}`}>
            <circle
              cx={atom.x}
              cy={atom.y}
              r={52}
              fill="none"
              stroke="#0284c7"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              opacity={0.6}
            />
            <circle
              cx={atom.x}
              cy={atom.y}
              r={52}
              fill="url(#atomGlow)"
              opacity={glowOpacity}
            />
          </g>
        ))}

        {/* Bond lines for double / triple / single */}
        {molecule.atoms.length === 2 && (
          <g>
            {Array.from({ length: molecule.bondOrder }).map((_, bIdx) => {
              const offset = (bIdx - (molecule.bondOrder - 1) / 2) * 12;
              return (
                <line
                  key={`bond-${bIdx}`}
                  x1={molecule.atoms[0].x}
                  y1={molecule.atoms[0].y + offset}
                  x2={molecule.atoms[1].x}
                  y2={molecule.atoms[1].y + offset}
                  stroke="url(#bondGrad)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              );
            })}
          </g>
        )}

        {/* Central & Outer Atom Nodes */}
        {molecule.atoms.map((atom, idx) => (
          <g key={`atom-${idx}`} transform={`translate(${atom.x}, ${atom.y})`}>
            <circle r={24} fill="#0f172a" stroke="#38bdf8" strokeWidth="2.5" />
            <text
              x="0"
              y="6"
              fill="#f8fafc"
              fontSize="18"
              fontWeight="bold"
              textAnchor="middle"
            >
              {atom.symbol}
            </text>
            <text
              x="0"
              y="-28"
              fill="#94a3b8"
              fontSize="10"
              textAnchor="middle"
            >
              EN: {atom.electronegativity}
            </text>
          </g>
        ))}

        {/* Shared Valence Electrons Animation */}
        {molecule.lewisDots.map((dot, dIdx) => {
          const oscX = Math.sin(rad * 2 + dIdx) * 3;
          const oscY = Math.cos(rad * 2 + dIdx) * 3;
          return (
            <g key={`dot-${dIdx}`} transform={`translate(${dot.x + oscX}, ${dot.y + oscY})`}>
              <circle r={5} fill="url(#electronGlow)" />
              <circle r={2.5} fill="#ffffff" />
            </g>
          );
        })}

        {/* Non-bonding Lone Pairs rendering */}
        {molecule.atoms.map((atom, idx) => {
          if (atom.lonePairs <= 0) return null;
          const lpElements = [];
          for (let lp = 0; lp < atom.lonePairs; lp++) {
            const angle = (lp * (360 / atom.lonePairs) * Math.PI) / 180;
            const lpx = atom.x + Math.cos(angle) * 38;
            const lpy = atom.y + Math.sin(angle) * 38;
            lpElements.push(
              <g key={`lp-${idx}-${lp}`}>
                <circle cx={lpx - 4} cy={lpy} r={3} fill="#facc15" />
                <circle cx={lpx + 4} cy={lpy} r={3} fill="#facc15" />
              </g>
            );
          }
          return <g key={`lps-${idx}`}>{lpElements}</g>;
        })}

        {/* Partial Charges for Polar bonds */}
        {molecule.isPolar && (
          <g>
            <text x={molecule.atoms[0].x} y={molecule.atoms[0].y + 45} fill="#f43f5e" fontSize="14" fontWeight="bold" textAnchor="middle">
              δ{molecule.atoms[0].electronegativity > molecule.atoms[1].electronegativity ? '-' : '+'}
            </text>
            <text x={molecule.atoms[1].x} y={molecule.atoms[1].y + 45} fill="#38bdf8" fontSize="14" fontWeight="bold" textAnchor="middle">
              δ{molecule.atoms[1].electronegativity > molecule.atoms[0].electronegativity ? '-' : '+'}
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};

/** VSEPR Geometry 3D SVG Visualizer */
const VSEPRGeometrySVG: React.FC<{
  molecule: MoleculeData;
}> = ({ molecule }) => {
  return (
    <div className="relative w-full h-72 bg-slate-950 rounded-xl border border-slate-800 flex flex-col items-center justify-center p-4">
      <svg viewBox="-180 -120 360 240" className="w-full h-full">
        {/* Title / Info Overlay */}
        <text x="0" y="-95" fill="#38bdf8" fontSize="14" fontWeight="bold" textAnchor="middle">
          {molecule.name} ({molecule.formula}) — VSEPR Geometry: {molecule.vseprShape}
        </text>

        {/* Angle Arc */}
        <path
          d="M -40 20 A 45 45 0 0 1 40 20"
          fill="none"
          stroke="#f59e0b"
          strokeWidth="2"
          strokeDasharray="3 3"
        />
        <text x="0" y="-5" fill="#f59e0b" fontSize="13" fontWeight="bold" textAnchor="middle">
          {molecule.bondAngle}°
        </text>

        {/* Central Atom */}
        {molecule.atoms.map((atom, idx) => (
          <g key={`vsepr-atom-${idx}`} transform={`translate(${atom.x}, ${atom.y})`}>
            {/* Bond vectors connecting back to central atom index 0 */}
            {idx > 0 && (
              <line
                x1={-atom.x}
                y1={-atom.y}
                x2={0}
                y2={0}
                stroke="#64748b"
                strokeWidth="4"
              />
            )}
            <circle
              r={idx === 0 ? 26 : 18}
              fill={idx === 0 ? '#1e293b' : '#334155'}
              stroke={idx === 0 ? '#38bdf8' : '#cbd5e1'}
              strokeWidth="2.5"
            />
            <text
              x="0"
              y="5"
              fill="#f8fafc"
              fontSize={idx === 0 ? '16' : '12'}
              fontWeight="bold"
              textAnchor="middle"
            >
              {atom.symbol}
            </text>
          </g>
        ))}

        {/* Dipole Moment Vector (if polar) */}
        {molecule.isPolar && (
          <g transform="translate(0, 80)">
            <line x1="-30" y1="0" x2="30" y2="0" stroke="#f43f5e" strokeWidth="3" markerEnd="url(#arrow)" />
            <line x1="-30" y1="-6" x2="-30" y2="6" stroke="#f43f5e" strokeWidth="2" />
            <text x="0" y="20" fill="#f43f5e" fontSize="11" textAnchor="middle" fontWeight="bold">
              Net Dipole Vector (μ &gt; 0)
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};

/** Coordinate / Dative Bonding SVG Visualizer */
const CoordinateBondSVG: React.FC<{
  ionType: 'nh4' | 'h3o';
}> = ({ ionType }) => {
  const isNH4 = ionType === 'nh4';

  return (
    <div className="relative w-full h-72 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-center p-4">
      <svg viewBox="-200 -120 400 240" className="w-full h-full">
        <text x="0" y="-90" fill="#a855f7" fontSize="14" fontWeight="bold" textAnchor="middle">
          {isNH4 ? 'Ammonium Ion (NH₄⁺) Dative Bonding' : 'Hydronium Ion (H₃O⁺) Dative Bonding'}
        </text>

        {/* Central Atom */}
        <g transform="translate(0,0)">
          <circle r={30} fill="#1e1b4b" stroke="#a855f7" strokeWidth="3" />
          <text x="0" y="6" fill="#f8fafc" fontSize="20" fontWeight="bold" textAnchor="middle">
            {isNH4 ? 'N' : 'O'}
          </text>
        </g>

        {/* Standard Single Covalent Bonds */}
        <line x1="0" y1="0" x2="-70" y2="-40" stroke="#38bdf8" strokeWidth="3" />
        <line x1="0" y1="0" x2="70" y2="-40" stroke="#38bdf8" strokeWidth="3" />
        <line x1="0" y1="0" x2="0" y2="70" stroke="#38bdf8" strokeWidth="3" />

        {/* Standard H atoms */}
        <g transform="translate(-70, -40)">
          <circle r={18} fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
          <text x="0" y="5" fill="#f8fafc" fontSize="12" textAnchor="middle">H</text>
        </g>
        <g transform="translate(70, -40)">
          <circle r={18} fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
          <text x="0" y="5" fill="#f8fafc" fontSize="12" textAnchor="middle">H</text>
        </g>
        <g transform="translate(0, 70)">
          <circle r={18} fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
          <text x="0" y="5" fill="#f8fafc" fontSize="12" textAnchor="middle">H</text>
        </g>

        {/* Coordinate Dative Bond Arrow (Donated Lone Pair) */}
        <g transform="translate(0, -65)">
          {/* Animated Arrow */}
          <line x1="0" y1="35" x2="0" y2="-10" stroke="#c084fc" strokeWidth="4" strokeDasharray="4 2" />
          <polygon points="0,-18 -7,-5 7,-5" fill="#c084fc" />

          {/* Acceptor H+ Ion */}
          <circle r={20} fill="#581c87" stroke="#c084fc" strokeWidth="2.5" />
          <text x="0" y="5" fill="#f8fafc" fontSize="14" fontWeight="bold" textAnchor="middle">H⁺</text>

          {/* Callout Label */}
          <text x="80" y="5" fill="#c084fc" fontSize="11" fontWeight="bold">
            ← Dative Bond (Donor: {isNH4 ? 'N' : 'O'} Lone Pair)
          </text>
        </g>

        {/* Whole Ion Bracket Charge */}
        <path d="M -130 -90 L -150 -90 L -150 90 L -130 90" fill="none" stroke="#a855f7" strokeWidth="2.5" />
        <path d="M 130 -90 L 150 -90 L 150 90 L 130 90" fill="none" stroke="#a855f7" strokeWidth="2.5" />
        <text x="165" y="-75" fill="#a855f7" fontSize="24" fontWeight="bold">+</text>
      </svg>
    </div>
  );
};

/** Lattice Structure comparison SVG (Diamond vs Simple Covalent Ice) */
const LatticeStructureSVG: React.FC<{
  mode: 'simple' | 'giant';
}> = ({ mode }) => {
  return (
    <div className="relative w-full h-72 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-center p-4">
      <svg viewBox="-200 -120 400 240" className="w-full h-full">
        {mode === 'giant' ? (
          <g>
            <text x="0" y="-95" fill="#10b981" fontSize="14" fontWeight="bold" textAnchor="middle">
              Diamond Giant 3D Network Covalent Lattice
            </text>
            {/* 3D Lattice Network Representation */}
            {[-80, 0, 80].map((x, xi) =>
              [-40, 20, 60].map((y, yi) => (
                <g key={`giant-node-${xi}-${yi}`}>
                  <line x1={x} y1={y} x2={x + 30} y2={y - 30} stroke="#10b981" strokeWidth="2" />
                  <line x1={x} y1={y} x2={x - 30} y2={y - 30} stroke="#10b981" strokeWidth="2" />
                  <circle cx={x} cy={y} r={12} fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                  <text cx={x} cy={y + 4} fill="#f8fafc" fontSize="9" textAnchor="middle">C</text>
                </g>
              ))
            )}
            <text x="0" y="105" fill="#a7f3d0" fontSize="11" textAnchor="middle">
              Continuous C-C covalent bonds throughout lattice. Melting point &gt; 3500°C.
            </text>
          </g>
        ) : (
          <g>
            <text x="0" y="-95" fill="#38bdf8" fontSize="14" fontWeight="bold" textAnchor="middle">
              Ice / Sugar Simple Molecular Structure
            </text>
            {/* Isolated Molecules with weak dotted Intermolecular lines */}
            <g transform="translate(-100, -20)">
              <circle cx="0" cy="0" r="16" fill="#0284c7" />
              <circle cx="-18" cy="18" r="8" fill="#e0f2fe" />
              <circle cx="18" cy="18" r="8" fill="#e0f2fe" />
              <text x="0" y="4" fill="#ffffff" fontSize="10" textAnchor="middle">H₂O</text>
            </g>
            <g transform="translate(100, -20)">
              <circle cx="0" cy="0" r="16" fill="#0284c7" />
              <circle cx="-18" cy="18" r="8" fill="#e0f2fe" />
              <circle cx="18" cy="18" r="8" fill="#e0f2fe" />
              <text x="0" y="4" fill="#ffffff" fontSize="10" textAnchor="middle">H₂O</text>
            </g>
            <g transform="translate(0, 50)">
              <circle cx="0" cy="0" r="16" fill="#0284c7" />
              <circle cx="-18" cy="18" r="8" fill="#e0f2fe" />
              <circle cx="18" cy="18" r="8" fill="#e0f2fe" />
              <text x="0" y="4" fill="#ffffff" fontSize="10" textAnchor="middle">H₂O</text>
            </g>

            {/* Intermolecular dotted forces */}
            <line x1="-80" y1="-20" x2="-20" y2="50" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4 4" />
            <line x1="80" y1="-20" x2="20" y2="50" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4 4" />

            <text x="0" y="20" fill="#f43f5e" fontSize="11" textAnchor="middle" fontWeight="bold">
              Weak Intermolecular Hydrogen Bonds (Break easily on heating)
            </text>
            <text x="0" y="105" fill="#93c5fd" fontSize="11" textAnchor="middle">
              Intramolecular O-H covalent bonds stay intact during melting/boiling!
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};

/** Interactive Conductivity & Thermal Property Test Canvas */
const PropertyTestCanvas: React.FC<{
  sample: 'h2o_pure' | 'hcl_soln' | 'diamond' | 'graphite';
  temperature: number;
  voltageOn: boolean;
}> = ({ sample, temperature, voltageOn }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let particleOffset = 0;

    const render = () => {
      particleOffset = (particleOffset + 2) % 100;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background Beaker / Apparatus
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Beaker container
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 4;
      ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);

      // Solution / Solid fill
      if (sample === 'h2o_pure') {
        ctx.fillStyle = 'rgba(56, 189, 248, 0.2)';
        ctx.fillRect(44, 100, canvas.width - 88, canvas.height - 144);
      } else if (sample === 'hcl_soln') {
        ctx.fillStyle = 'rgba(168, 85, 247, 0.25)';
        ctx.fillRect(44, 100, canvas.width - 88, canvas.height - 144);
      } else if (sample === 'diamond') {
        ctx.fillStyle = 'rgba(241, 245, 249, 0.15)';
        ctx.fillRect(100, 80, canvas.width - 200, canvas.height - 120);
      } else if (sample === 'graphite') {
        ctx.fillStyle = 'rgba(51, 65, 85, 0.8)';
        ctx.fillRect(100, 80, canvas.width - 200, canvas.height - 120);
      }

      // Heat Effect (Bubbles or thermal vibration)
      if (temperature > 50) {
        ctx.fillStyle = 'rgba(244, 63, 94, 0.4)';
        for (let i = 0; i < 15; i++) {
          const bx = 60 + ((i * 37 + particleOffset * 3) % (canvas.width - 120));
          const by = canvas.height - 50 - ((i * 19 + particleOffset * 4) % (canvas.height - 120));
          ctx.beginPath();
          ctx.arc(bx, by, 3 + (i % 4), 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Electrodes & Circuit
      ctx.fillStyle = '#94a3b8';
      ctx.fillRect(80, 20, 16, 120);
      ctx.fillRect(canvas.width - 96, 20, 16, 120);

      // Wires to Bulb
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(88, 20);
      ctx.lineTo(88, 10);
      ctx.lineTo(canvas.width / 2 - 20, 10);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(canvas.width - 88, 20);
      ctx.lineTo(canvas.width - 88, 10);
      ctx.lineTo(canvas.width / 2 + 20, 10);
      ctx.stroke();

      // Light Bulb Test
      const conducts =
        voltageOn && (sample === 'hcl_soln' || sample === 'graphite');

      ctx.beginPath();
      ctx.arc(canvas.width / 2, 10, 14, 0, Math.PI * 2);
      ctx.fillStyle = conducts ? '#facc15' : '#334155';
      ctx.fill();
      ctx.strokeStyle = '#e2e8f0';
      ctx.stroke();

      if (conducts) {
        // Bulb Glow Lines
        ctx.strokeStyle = '#fef08a';
        ctx.lineWidth = 2;
        for (let a = 0; a < 360; a += 45) {
          const rad = (a * Math.PI) / 180;
          ctx.beginPath();
          ctx.moveTo(canvas.width / 2 + Math.cos(rad) * 18, 10 + Math.sin(rad) * 18);
          ctx.lineTo(canvas.width / 2 + Math.cos(rad) * 26, 10 + Math.sin(rad) * 26);
          ctx.stroke();
        }
      }

      // Mobile Ions flow if conducts
      if (conducts && sample === 'hcl_soln') {
        ctx.fillStyle = '#38bdf8';
        for (let i = 0; i < 8; i++) {
          const ix = 90 + ((i * 30 + particleOffset * 2) % (canvas.width - 180));
          ctx.beginPath();
          ctx.arc(ix, 130 + Math.sin(i + particleOffset * 0.1) * 20, 5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [sample, temperature, voltageOn]);

  return (
    <canvas
      ref={canvasRef}
      width={440}
      height={240}
      className="w-full h-64 bg-slate-950 rounded-xl border border-slate-800 shadow-inner"
    />
  );
};

// ==========================================
// 6. MAIN COMPONENT DEFINITION
// ==========================================
export default function C9_ChemistryCovalentbondingSim() {
  // Navigation & Lab State
  const [activeTab, setActiveTab] = useState<'discovery' | 'lab' | 'challenges' | 'summary'>('discovery');
  const [selectedLabIndex, setSelectedLabIndex] = useState<number>(0);
  const [selectedMoleculeId, setSelectedMoleculeId] = useState<string>('h2');
  const [electronegativityA, setElectronegativityA] = useState<number>(2.2);
  const [electronegativityB, setElectronegativityB] = useState<number>(3.5);
  const [propSample, setPropSample] = useState<'h2o_pure' | 'hcl_soln' | 'diamond' | 'graphite'>('h2o_pure');
  const [testTemp, setTestTemp] = useState<number>(25);
  const [voltageOn, setVoltageOn] = useState<boolean>(false);
  const [latticeMode, setLatticeMode] = useState<'simple' | 'giant'>('giant');
  const [dativeIon, setDativeIon] = useState<'nh4' | 'h3o'>('nh4');

  // Interactive Questioning States
  const [discoverySelected, setDiscoverySelected] = useState<number | null>(null);
  const [discoverySubmitted, setDiscoverySubmitted] = useState<boolean>(false);
  const [predictionAnswers, setPredictionAnswers] = useState<Record<number, number>>({});
  const [observationAnswers, setObservationAnswers] = useState<Record<number, number>>({});

  // Challenge & Gamification State
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [numericAnswer, setNumericAnswer] = useState<string>('');
  const [challengeAnswered, setChallengeAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [activeTier, setActiveTier] = useState<'foundation' | 'standard' | 'advanced'>('foundation');

  // Feedback Component Controls
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHintIndex, setCurrentHintIndex] = useState<number>(0);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);

  // Inactivity Timer Hook
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Mastery & SRS Integration Maps
  const [bktStates, setBktStates] = useState<Record<string, ReturnType<typeof createBKTState>>>(() => {
    const initial: Record<string, ReturnType<typeof createBKTState>> = {};
    ALL_NODE_IDS.forEach((id) => {
      initial[id] = createBKTState();
    });
    return initial;
  });

  const [srsItems, setSrsItems] = useState<Record<string, ReturnType<typeof createReviewItem>>>(() => {
    const initial: Record<string, ReturnType<typeof createReviewItem>> = {};
    ALL_NODE_IDS.forEach((id) => {
      initial[id] = createReviewItem(id);
    });
    return initial;
  });

  // Current active molecule object lookup
  const activeMolecule = useMemo(() => {
    return MOLECULE_DATABASE.find((m) => m.id === selectedMoleculeId) || MOLECULE_DATABASE[0];
  }, [selectedMoleculeId]);

  // Filter challenges by difficulty tier
  const filteredChallenges = useMemo(() => {
    return CHALLENGES.filter((c) => c.difficulty === activeTier);
  }, [activeTier]);

  const currentChallenge = filteredChallenges[currentChallengeIndex] || filteredChallenges[0];

  // Auto-hint trigger on 10 sec inactivity
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    setShowHint(false);
    inactivityTimerRef.current = setTimeout(() => {
      setShowHint(true);
      audioManager.play('hint');
      speechManager.speak('Here is a hint to help you solve this bonding problem.');
    }, 10000);
  }, []);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [currentChallengeIndex, activeTab, resetInactivityTimer]);

  // Initial greeting sound/speech
  useEffect(() => {
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the CISCE Covalent Bonding Lab. Explore molecular overlap, polarity, and giant lattices.');
  }, []);

  // Handle Discovery Question Submit
  const handleDiscoverySubmit = (optIndex: number) => {
    setDiscoverySelected(optIndex);
    setDiscoverySubmitted(true);
    if (optIndex === DISCOVERY_QUESTION.correctIndex) {
      audioManager.play('success');
      speechManager.speak('Correct! Boiling liquid water breaks weak intermolecular forces, not strong covalent bonds.');
    } else {
      audioManager.play('error');
      speechManager.speak('Not quite. Keep in mind that boiling is a physical phase change.');
    }
  };

  // Handle Challenge Option Click
  const handleAnswerSubmit = () => {
    if (challengeAnswered) return;

    let correct = false;
    if (currentChallenge.type === 'numeric') {
      const parsed = parseFloat(numericAnswer.trim());
      correct = Math.abs(parsed - (currentChallenge.correctAnswer as number)) < 0.1;
    } else {
      correct = selectedOption === currentChallenge.correctIndex;
    }

    setChallengeAnswered(true);
    setIsCorrect(correct);

    // Update BKT & SRS
    const nodeId = currentChallenge.nodeId;
    const prevBKT = bktStates[nodeId] || createBKTState();
    const updatedBKT = bktUpdate(prevBKT, correct);
    setBktStates((prev) => ({ ...prev, [nodeId]: updatedBKT }));

    const prevSRS = srsItems[nodeId] || createReviewItem(nodeId);
    const updatedSRS = sm2Update(prevSRS, correct ? 5 : 1);
    setSrsItems((prev) => ({ ...prev, [nodeId]: updatedSRS }));

    if (correct) {
      setScore((s) => s + (activeTier === 'foundation' ? 10 : activeTier === 'standard' ? 20 : 30));
      setStreak((st) => st + 1);
      audioManager.play('drop-correct');
      audioManager.play('sparkle');
      setShowSparkle(true);
      if (streak + 1 >= 3) {
        setShowConfetti(true);
        audioManager.play('celebration');
        speechManager.speak('Outstanding streak! You are mastering covalent structures.');
      } else {
        speechManager.speak('Excellent work! That is correct.');
      }
      setShowSuccess(true);
    } else {
      setStreak(0);
      audioManager.play('drop-wrong');
      audioManager.play('error');
      speechManager.speak('That is incorrect. Review the hints and orbital structures.');
    }
  };

  const handleNextChallenge = () => {
    setChallengeAnswered(false);
    setSelectedOption(null);
    setNumericAnswer('');
    setShowSuccess(false);
    setShowSparkle(false);
    setShowConfetti(false);
    if (currentChallengeIndex + 1 < filteredChallenges.length) {
      setCurrentChallengeIndex((prev) => prev + 1);
    } else {
      // Completed current tier
      audioManager.play('chime');
      speechManager.speak(`Tier completed! Recording overall performance score.`);
      const totalScore = score + 50;
      setScore(totalScore);
      recordGameScore(totalScore);
    }
  };

  // Electronegativity Difference Delta Calculation
  const deltaEN = useMemo(() => {
    return Math.abs(electronegativityA - electronegativityB).toFixed(2);
  }, [electronegativityA, electronegativityB]);

  const polarityClass = useMemo(() => {
    const diff = parseFloat(deltaEN);
    if (diff < 0.4) return { text: 'Non-Polar Covalent', color: 'text-emerald-400' };
    if (diff <= 1.7) return { text: 'Polar Covalent (δ+ / δ-)', color: 'text-amber-400' };
    return { text: 'Predominantly Ionic Character (> 1.7)', color: 'text-rose-400' };
  }, [deltaEN]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 md:p-8 flex flex-col items-center">
      {/* Header Bar */}
      <header className="w-full max-w-6xl mb-6 flex flex-col md:flex-row justify-between items-center bg-slate-900 border border-slate-800 rounded-2xl p-4 md:px-8 shadow-2xl">
        <div className="flex items-center space-x-3 mb-4 md:mb-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-xl shadow-lg text-white">
            ⚛️
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Covalent Bonding & Molecular Geometry
            </h1>
            <p className="text-xs text-slate-400">ICSE Class 9 Chemistry • Nodes c9_chem_031 - c9_chem_040</p>
          </div>
        </div>

        {/* Stats & Score Indicators */}
        <div className="flex items-center space-x-6 bg-slate-950 px-5 py-2.5 rounded-xl border border-slate-800">
          <div className="text-center">
            <span className="text-xs text-slate-400 block font-semibold uppercase">Score</span>
            <span className="text-lg font-black text-cyan-400">{score}</span>
          </div>
          <div className="h-8 w-px bg-slate-800" />
          <div className="text-center">
            <span className="text-xs text-slate-400 block font-semibold uppercase">Streak</span>
            <span className="text-lg font-black text-amber-400">{streak} 🔥</span>
          </div>
          <div className="h-8 w-px bg-slate-800" />
          <div className="text-center">
            <span className="text-xs text-slate-400 block font-semibold uppercase">Mastery</span>
            <span className="text-lg font-black text-emerald-400">
              {Math.round(
                (Object.values(bktStates).reduce((acc, curr) => acc + masteryProb(curr), 0) /
                  ALL_NODE_IDS.length) *
                  100
              )}
              %
            </span>
          </div>
        </div>
      </header>

      {/* Main Tab Navigation */}
      <nav className="w-full max-w-6xl mb-6 flex space-x-2 bg-slate-900/80 p-1.5 rounded-xl border border-slate-800">
        <button
          onClick={() => {
            setActiveTab('discovery');
            audioManager.play('tap');
          }}
          className={`flex-1 py-2.5 rounded-lg font-bold text-sm transition-all ${
            activeTab === 'discovery'
              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          🔍 1. Discovery & Scenario
        </button>
        <button
          onClick={() => {
            setActiveTab('lab');
            audioManager.play('tap');
          }}
          className={`flex-1 py-2.5 rounded-lg font-bold text-sm transition-all ${
            activeTab === 'lab'
              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          🧪 2. Interactive Labs ({EXPLORATION_STEPS.length})
        </button>
        <button
          onClick={() => {
            setActiveTab('challenges');
            audioManager.play('tap');
          }}
          className={`flex-1 py-2.5 rounded-lg font-bold text-sm transition-all ${
            activeTab === 'challenges'
              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          🏆 3. Practice Challenges (24)
        </button>
        <button
          onClick={() => {
            setActiveTab('summary');
            audioManager.play('tap');
          }}
          className={`flex-1 py-2.5 rounded-lg font-bold text-sm transition-all ${
            activeTab === 'summary'
              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          📊 4. Real-World & Mastery
        </button>
      </nav>

      {/* TAB 1: DISCOVERY & SCENARIO */}
      {activeTab === 'discovery' && (
        <main className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-6">
          <section className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
            <div>
              <span className="inline-block px-3 py-1 bg-cyan-950 text-cyan-400 border border-cyan-800 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                Lab Context
              </span>
              <h2 className="text-2xl font-bold mb-3 text-white">{SCENARIO.title}</h2>
              <p className="text-slate-300 leading-relaxed mb-4">{SCENARIO.intro}</p>
              <p className="text-slate-400 leading-relaxed text-sm mb-6">{SCENARIO.context}</p>

              {/* Preconception Discovery Question */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 mb-4">
                <h3 className="text-base font-bold text-cyan-300 mb-3">
                  Pre-Lab Concept Check: {DISCOVERY_QUESTION.question}
                </h3>
                <div className="space-y-2 mb-4">
                  {DISCOVERY_QUESTION.options.map((option, idx) => (
                    <button
                      key={`disc-opt-${idx}`}
                      onClick={() => handleDiscoverySubmit(idx)}
                      disabled={discoverySubmitted}
                      className={`w-full text-left p-3.5 rounded-xl border text-sm font-medium transition-all ${
                        discoverySelected === idx
                          ? idx === DISCOVERY_QUESTION.correctIndex
                            ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                            : 'bg-rose-950/70 border-rose-500 text-rose-200'
                          : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300'
                      }`}
                    >
                      <span className="font-bold mr-2">{String.fromCharCode(65 + idx)}.</span>
                      {option}
                    </button>
                  ))}
                </div>

                {discoverySubmitted && (
                  <div className="bg-cyan-950/50 border border-cyan-800 rounded-lg p-3 text-xs text-cyan-200">
                    💡 <strong>Insight:</strong> {DISCOVERY_QUESTION.hintAfter}
                  </div>
                )}
              </div>
            </div>

            {/* Prediction Questions Array Renderer */}
            <div className="mt-4 pt-4 border-t border-slate-800">
              <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-3">
                Hypothesis Predictions ({PREDICTION_QUESTIONS.length})
              </h3>
              <div className="space-y-4">
                {PREDICTION_QUESTIONS.map((pred, idx) => (
                  <div key={`pred-q-${idx}`} className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                    <p className="text-xs font-bold text-amber-400 mb-2">{pred.question}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
                      {pred.options.map((opt, oIdx) => (
                        <button
                          key={`pred-opt-${idx}-${oIdx}`}
                          onClick={() => {
                            setPredictionAnswers((prev) => ({ ...prev, [idx]: oIdx }));
                            audioManager.play('tap');
                          }}
                          className={`text-left p-2 rounded text-xs border ${
                            predictionAnswers[idx] === oIdx
                              ? oIdx === pred.correctIndex
                                ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
                                : 'bg-rose-950 border-rose-500 text-rose-200'
                              : 'bg-slate-900 border-slate-800 text-slate-400'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                    <p className="text-[10px] text-slate-500 italic">🔍 How to verify: {pred.verifyInstruction}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Side Panel: Node Breakdown & Curriculum Map */}
          <aside className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
            <div>
              <h3 className="text-base font-bold text-white mb-4 flex items-center">
                <span className="mr-2 text-cyan-400">📚</span> Covered ICSE Concepts
              </h3>
              <ul className="space-y-2.5 text-xs text-slate-300 mb-6">
                <li className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 flex justify-between">
                  <span>c9_chem_031 Single Covalent Bond (H2, Cl2, CH4)</span>
                  <span className="text-cyan-400 font-bold">100%</span>
                </li>
                <li className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 flex justify-between">
                  <span>c9_chem_032 Double Bond Overlap (O2, CO2)</span>
                  <span className="text-cyan-400 font-bold">100%</span>
                </li>
                <li className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 flex justify-between">
                  <span>c9_chem_033 Triple Bond Inertness (N2, C2H2)</span>
                  <span className="text-cyan-400 font-bold">100%</span>
                </li>
                <li className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 flex justify-between">
                  <span>c9_chem_034 Lewis Dot & Cross Diagrams</span>
                  <span className="text-cyan-400 font-bold">100%</span>
                </li>
                <li className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 flex justify-between">
                  <span>c9_chem_035 Electronegativity & Polarity</span>
                  <span className="text-cyan-400 font-bold">100%</span>
                </li>
                <li className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 flex justify-between">
                  <span>c9_chem_036 Coordinate (Dative) Bonds</span>
                  <span className="text-cyan-400 font-bold">100%</span>
                </li>
                <li className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 flex justify-between">
                  <span>c9_chem_037 Covalent Physical Properties</span>
                  <span className="text-cyan-400 font-bold">100%</span>
                </li>
                <li className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 flex justify-between">
                  <span>c9_chem_038 Giant vs Simple Lattices</span>
                  <span className="text-cyan-400 font-bold">100%</span>
                </li>
                <li className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 flex justify-between">
                  <span>c9_chem_039 VSEPR Geometry & Shapes</span>
                  <span className="text-cyan-400 font-bold">100%</span>
                </li>
                <li className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 flex justify-between">
                  <span>c9_chem_040 Bond Length & Energy Trends</span>
                  <span className="text-cyan-400 font-bold">100%</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => {
                setActiveTab('lab');
                audioManager.play('swoop');
              }}
              className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-sm rounded-xl shadow-lg hover:brightness-110 transition-all text-center"
            >
              Enter Interactive Lab Modules →
            </button>
          </aside>
        </main>
      )}

      {/* TAB 2: INTERACTIVE LABS */}
      {activeTab === 'lab' && (
        <main className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lab Step Controls Header */}
          <div className="lg:col-span-3 bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl flex flex-wrap gap-2">
            {EXPLORATION_STEPS.map((step, idx) => (
              <button
                key={`lab-step-btn-${idx}`}
                onClick={() => {
                  setSelectedLabIndex(idx);
                  audioManager.play('tap');
                }}
                className={`flex-1 min-w-[180px] py-2.5 px-3 rounded-xl border text-xs font-bold transition-all text-left ${
                  selectedLabIndex === idx
                    ? 'bg-cyan-950 border-cyan-500 text-cyan-300 shadow-md'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="text-[10px] uppercase text-slate-500">Step {idx + 1}</div>
                <div className="truncate">{step.title}</div>
              </button>
            ))}
          </div>

          {/* Main Visualizer Workspace */}
          <section className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-white">{EXPLORATION_STEPS[selectedLabIndex].title}</h3>
                <span className="text-xs px-2.5 py-1 bg-slate-800 text-cyan-400 rounded-full font-mono">
                  Node: {EXPLORATION_STEPS[selectedLabIndex].nodeId}
                </span>
              </div>
              <p className="text-xs text-slate-300 mb-6 bg-slate-950 p-3 rounded-xl border border-slate-800">
                👉 <strong>Instruction:</strong> {EXPLORATION_STEPS[selectedLabIndex].instruction}
              </p>

              {/* DYNAMIC SUB-LAB INTERFACES */}

              {/* SUB-LAB 0: Lewis Structure & Molecule Selector */}
              {selectedLabIndex === 0 && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {MOLECULE_DATABASE.filter((m) => m.type !== 'giant').map((m) => (
                      <button
                        key={`mol-select-${m.id}`}
                        onClick={() => {
                          setSelectedMoleculeId(m.id);
                          audioManager.play('pop');
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${
                          selectedMoleculeId === m.id
                            ? 'bg-cyan-500 text-slate-950 border-cyan-300'
                            : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        {m.name} ({m.formula})
                      </button>
                    ))}
                  </div>
                  <LewisStructureSVG molecule={activeMolecule} />
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                    <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                      <span className="text-slate-400 block text-[10px]">Bond Order</span>
                      <span className="font-bold text-cyan-400 text-sm">{activeMolecule.bondOrder}</span>
                    </div>
                    <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                      <span className="text-slate-400 block text-[10px]">Bond Energy</span>
                      <span className="font-bold text-amber-400 text-sm">{activeMolecule.bondEnergy} kJ/mol</span>
                    </div>
                    <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                      <span className="text-slate-400 block text-[10px]">Bond Length</span>
                      <span className="font-bold text-emerald-400 text-sm">{activeMolecule.bondLength} pm</span>
                    </div>
                    <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                      <span className="text-slate-400 block text-[10px]">Polarity</span>
                      <span className="font-bold text-rose-400 text-sm">{activeMolecule.isPolar ? 'Polar' : 'Non-Polar'}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* SUB-LAB 1: Electronegativity & Dipole Calculator */}
              {selectedLabIndex === 1 && (
                <div className="space-y-4">
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-4">
                    <div>
                      <div className="flex justify-between text-xs font-bold mb-1">
                        <span>Atom A Electronegativity (Pauling Scale)</span>
                        <span className="text-cyan-400">{electronegativityA}</span>
                      </div>
                      <input
                        type="range"
                        min="0.7"
                        max="4.0"
                        step="0.1"
                        value={electronegativityA}
                        onChange={(e) => setElectronegativityA(parseFloat(e.target.value))}
                        className="w-full accent-cyan-500 cursor-pointer"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs font-bold mb-1">
                        <span>Atom B Electronegativity (Pauling Scale)</span>
                        <span className="text-cyan-400">{electronegativityB}</span>
                      </div>
                      <input
                        type="range"
                        min="0.7"
                        max="4.0"
                        step="0.1"
                        value={electronegativityB}
                        onChange={(e) => setElectronegativityB(parseFloat(e.target.value))}
                        className="w-full accent-cyan-500 cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center">
                    <span className="text-xs text-slate-400 block uppercase font-bold">Electronegativity Difference (ΔEN)</span>
                    <span className="text-3xl font-black text-cyan-400 my-1 block">{deltaEN}</span>
                    <span className={`text-sm font-bold ${polarityClass.color}`}>{polarityClass.text}</span>
                  </div>
                </div>
              )}

              {/* SUB-LAB 2: Dative Bonding Synthesis */}
              {selectedLabIndex === 2 && (
                <div className="space-y-4">
                  <div className="flex justify-center space-x-3 mb-2">
                    <button
                      onClick={() => {
                        setDativeIon('nh4');
                        audioManager.play('pop');
                      }}
                      className={`px-4 py-2 rounded-xl text-xs font-bold border ${
                        dativeIon === 'nh4'
                          ? 'bg-purple-600 text-white border-purple-400'
                          : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                    >
                      Ammonium Ion (NH₄⁺)
                    </button>
                    <button
                      onClick={() => {
                        setDativeIon('h3o');
                        audioManager.play('pop');
                      }}
                      className={`px-4 py-2 rounded-xl text-xs font-bold border ${
                        dativeIon === 'h3o'
                          ? 'bg-purple-600 text-white border-purple-400'
                          : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                    >
                      Hydronium Ion (H₃O⁺)
                    </button>
                  </div>
                  <CoordinateBondSVG ionType={dativeIon} />
                </div>
              )}

              {/* SUB-LAB 3: VSEPR Molecular Geometry */}
              {selectedLabIndex === 3 && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {['ch4', 'nh3', 'h2o'].map((id) => {
                      const m = MOLECULE_DATABASE.find((mol) => mol.id === id)!;
                      return (
                        <button
                          key={`vsepr-btn-${id}`}
                          onClick={() => {
                            setSelectedMoleculeId(id);
                            audioManager.play('pop');
                          }}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${
                            selectedMoleculeId === id
                              ? 'bg-amber-500 text-slate-950 border-amber-300'
                              : 'bg-slate-950 border-slate-800 text-slate-300'
                          }`}
                        >
                          {m.name} ({m.formula})
                        </button>
                      );
                    })}
                  </div>
                  <VSEPRGeometrySVG molecule={activeMolecule} />
                </div>
              )}

              {/* SUB-LAB 4: Physical Property & Lattice Tester */}
              {selectedLabIndex === 4 && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2 mb-2">
                    <button
                      onClick={() => setPropSample('h2o_pure')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${
                        propSample === 'h2o_pure'
                          ? 'bg-cyan-500 text-slate-950'
                          : 'bg-slate-950 border-slate-800 text-slate-300'
                      }`}
                    >
                      Pure Water (Simple)
                    </button>
                    <button
                      onClick={() => setPropSample('hcl_soln')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${
                        propSample === 'hcl_soln'
                          ? 'bg-cyan-500 text-slate-950'
                          : 'bg-slate-950 border-slate-800 text-slate-300'
                      }`}
                    >
                      Hydrochloric Acid (Ionized)
                    </button>
                    <button
                      onClick={() => setPropSample('diamond')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${
                        propSample === 'diamond'
                          ? 'bg-cyan-500 text-slate-950'
                          : 'bg-slate-950 border-slate-800 text-slate-300'
                      }`}
                    >
                      Diamond (Giant)
                    </button>
                    <button
                      onClick={() => setPropSample('graphite')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${
                        propSample === 'graphite'
                          ? 'bg-cyan-500 text-slate-950'
                          : 'bg-slate-950 border-slate-800 text-slate-300'
                      }`}
                    >
                      Graphite (Giant delocalized)
                    </button>
                  </div>

                  <PropertyTestCanvas sample={propSample} temperature={testTemp} voltageOn={voltageOn} />

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                      <div className="flex justify-between text-xs font-bold mb-1">
                        <span>Thermal Heater Slider</span>
                        <span className="text-amber-400">{testTemp}°C</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="200"
                        value={testTemp}
                        onChange={(e) => setTestTemp(parseInt(e.target.value))}
                        className="w-full accent-amber-500 cursor-pointer"
                      />
                    </div>
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
                      <span className="text-xs font-bold">Conductivity Circuit</span>
                      <button
                        onClick={() => {
                          setVoltageOn(!voltageOn);
                          audioManager.play('tap');
                        }}
                        className={`px-4 py-1.5 rounded-lg text-xs font-bold ${
                          voltageOn ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {voltageOn ? 'POWER ON' : 'POWER OFF'}
                      </button>
                    </div>
                  </div>

                  {/* Toggle Giant vs Simple Lattice SVG */}
                  <div className="pt-2">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-bold text-slate-300">Lattice Visualizer View:</span>
                      <div className="space-x-2">
                        <button
                          onClick={() => setLatticeMode('simple')}
                          className={`px-2.5 py-1 rounded text-xs font-bold ${
                            latticeMode === 'simple' ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          Simple Molecular
                        </button>
                        <button
                          onClick={() => setLatticeMode('giant')}
                          className={`px-2.5 py-1 rounded text-xs font-bold ${
                            latticeMode === 'giant' ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          Giant 3D Network
                        </button>
                      </div>
                    </div>
                    <LatticeStructureSVG mode={latticeMode} />
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Right Column: Observation Questions & Real-Time Log */}
          <aside className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
            <div>
              <h3 className="text-base font-bold text-white mb-3 flex items-center">
                <span className="mr-2 text-amber-400">👁️</span> Observation Checkpoint
              </h3>

              {/* Observation Questions Array Renderer */}
              <div className="space-y-4 mb-6">
                {OBSERVATION_QUESTIONS.map((obs, idx) => (
                  <div key={`obs-q-${idx}`} className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                    <p className="text-xs font-bold text-slate-200 mb-2">{obs.question}</p>
                    <div className="space-y-1.5">
                      {obs.observableOptions.map((opt, oIdx) => (
                        <button
                          key={`obs-opt-${idx}-${oIdx}`}
                          onClick={() => {
                            setObservationAnswers((prev) => ({ ...prev, [idx]: oIdx }));
                            if (oIdx === obs.correctIndex) {
                              audioManager.play('drop-correct');
                            } else {
                              audioManager.play('drop-wrong');
                            }
                          }}
                          className={`w-full text-left p-2 rounded text-xs border ${
                            observationAnswers[idx] === oIdx
                              ? oIdx === obs.correctIndex
                                ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
                                : 'bg-rose-950 border-rose-500 text-rose-200'
                              : 'bg-slate-900 border-slate-800 text-slate-400'
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

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Structure Quick Fact</h4>
              <p className="text-xs text-slate-300 leading-relaxed">{activeMolecule.description}</p>
            </div>
          </aside>
        </main>
      )}

      {/* TAB 3: PRACTICE CHALLENGES (24 CHALLENGES) */}
      {activeTab === 'challenges' && (
        <main className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-6">
          <section className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
            <div>
              {/* Difficulty Tier Selector */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex space-x-2">
                  {(['foundation', 'standard', 'advanced'] as const).map((tier) => (
                    <button
                      key={`tier-btn-${tier}`}
                      onClick={() => {
                        setActiveTier(tier);
                        setCurrentChallengeIndex(0);
                        setChallengeAnswered(false);
                        setSelectedOption(null);
                        setNumericAnswer('');
                        audioManager.play('tap');
                      }}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                        activeTier === tier
                          ? 'bg-cyan-500 text-slate-950 shadow-md'
                          : 'bg-slate-950 border border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      {tier} ({CHALLENGES.filter((c) => c.difficulty === tier).length})
                    </button>
                  ))}
                </div>
                <span className="text-xs font-mono text-slate-400">
                  Question {currentChallengeIndex + 1} of {filteredChallenges.length}
                </span>
              </div>

              {/* Question Banner */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 mb-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-slate-800 text-cyan-400 border border-slate-700">
                    {currentChallenge.competencyLevel}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">Node: {currentChallenge.nodeId}</span>
                </div>
                <h3 className="text-base md:text-lg font-bold text-slate-100 leading-snug">
                  {currentChallenge.question}
                </h3>
              </div>

              {/* Multiple Choice Answers */}
              {currentChallenge.type !== 'numeric' && currentChallenge.options && (
                <div className="space-y-3 mb-6">
                  {currentChallenge.options.map((option, idx) => (
                    <button
                      key={`challenge-opt-${idx}`}
                      onClick={() => {
                        if (!challengeAnswered) {
                          setSelectedOption(idx);
                          audioManager.play('tap');
                        }
                      }}
                      disabled={challengeAnswered}
                      className={`w-full text-left p-4 rounded-xl border text-sm font-medium transition-all ${
                        selectedOption === idx
                          ? challengeAnswered
                            ? idx === currentChallenge.correctIndex
                              ? 'bg-emerald-950/80 border-emerald-500 text-emerald-100'
                              : 'bg-rose-950/80 border-rose-500 text-rose-100'
                            : 'bg-cyan-950/80 border-cyan-500 text-cyan-100'
                          : challengeAnswered && idx === currentChallenge.correctIndex
                          ? 'bg-emerald-950/40 border-emerald-600 text-emerald-200'
                          : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300'
                      }`}
                    >
                      <span className="font-bold mr-3">{String.fromCharCode(65 + idx)}.</span>
                      {option}
                    </button>
                  ))}
                </div>
              )}

              {/* Numeric Answer Input */}
              {currentChallenge.type === 'numeric' && (
                <div className="mb-6">
                  <label className="block text-xs font-bold text-slate-400 mb-2 uppercase">Enter Numerical Solution:</label>
                  <input
                    type="number"
                    value={numericAnswer}
                    onChange={(e) => setNumericAnswer(e.target.value)}
                    disabled={challengeAnswered}
                    placeholder="e.g. 24 or -93"
                    className="w-full p-4 bg-slate-950 border border-slate-800 rounded-xl text-lg font-mono text-cyan-400 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              )}

              {/* Explanation Box */}
              {challengeAnswered && (
                <div
                  className={`p-4 rounded-xl border text-xs leading-relaxed mb-4 ${
                    isCorrect ? 'bg-emerald-950/50 border-emerald-800 text-emerald-200' : 'bg-rose-950/50 border-rose-800 text-rose-200'
                  }`}
                >
                  <strong className="block text-sm font-bold mb-1">{isCorrect ? '✅ Correct Explanation:' : '❌ Correct Answer Explanation:'}</strong>
                  {currentChallenge.explanation}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 pt-4 border-t border-slate-800">
              {!challengeAnswered ? (
                <button
                  onClick={handleAnswerSubmit}
                  disabled={selectedOption === null && !numericAnswer.trim()}
                  className="flex-1 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 disabled:opacity-50 text-white font-bold text-sm rounded-xl shadow-lg hover:brightness-110 transition-all"
                >
                  Submit Answer →
                </button>
              ) : (
                <button
                  onClick={handleNextChallenge}
                  className="flex-1 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-sm rounded-xl shadow-lg hover:brightness-110 transition-all"
                >
                  {currentChallengeIndex + 1 < filteredChallenges.length ? 'Next Question →' : 'Complete Tier 🎉'}
                </button>
              )}
            </div>
          </section>

          {/* Side Panel: Hints & Misconceptions Warning */}
          <aside className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-base font-bold text-white flex items-center">
                  <span className="mr-2 text-yellow-400">💡</span> Intelligent Hints
                </h3>
                <button
                  onClick={() => {
                    setShowHint(!showHint);
                    audioManager.play('hint');
                  }}
                  className="text-xs text-cyan-400 underline font-semibold"
                >
                  {showHint ? 'Hide Hint' : 'Show Hint'}
                </button>
              </div>

              {showHint && (
                <div className="bg-slate-950 border border-amber-900/50 rounded-xl p-4 mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-bold text-amber-400 uppercase">Hint Step {currentHintIndex + 1} of 3</span>
                    <div className="space-x-1">
                      {[0, 1, 2].map((hIdx) => (
                        <button
                          key={`hint-dot-${hIdx}`}
                          onClick={() => setCurrentHintIndex(hIdx)}
                          className={`w-2 h-2 rounded-full ${currentHintIndex === hIdx ? 'bg-amber-400' : 'bg-slate-700'}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-amber-200 leading-relaxed">
                    {currentChallenge.hints[currentHintIndex]}
                  </p>
                </div>
              )}

              {/* Misconception Alert Box */}
              {currentChallenge.misconceptionIndex !== undefined && (
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                  <span className="text-[10px] uppercase font-bold text-rose-400 block mb-1">
                    ⚠️ Common Misconception Alert
                  </span>
                  <h4 className="text-xs font-bold text-slate-200 mb-1">
                    {MISCONCEPTIONS[currentChallenge.misconceptionIndex].title}
                  </h4>
                  <p className="text-[11px] text-slate-400 leading-normal">
                    {MISCONCEPTIONS[currentChallenge.misconceptionIndex].misconception}
                  </p>
                </div>
              )}
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 mt-6 text-center">
              <span className="text-xs text-slate-400 block mb-1">Tier Mastery Progress</span>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-cyan-400 h-full transition-all duration-300"
                  style={{
                    width: `${((currentChallengeIndex + (challengeAnswered ? 1 : 0)) / filteredChallenges.length) * 100}%`,
                  }}
                />
              </div>
            </div>
          </aside>
        </main>
      )}

      {/* TAB 4: REAL-WORLD & MASTERY SUMMARY */}
      {activeTab === 'summary' && (
        <main className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Industrial Real-World Activity */}
          <section className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
            <div>
              <span className="inline-block px-3 py-1 bg-emerald-950 text-emerald-400 border border-emerald-800 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                Industrial Case Study & Synthesis
              </span>
              <h2 className="text-2xl font-bold mb-3 text-white">{REAL_WORLD_ACTIVITY.title}</h2>
              <p className="text-slate-300 text-xs md:text-sm leading-relaxed mb-6">{REAL_WORLD_ACTIVITY.description}</p>

              <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 mb-6">
                <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider">Guided Synthesis Protocol</h3>
                {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                  <div key={`rw-step-${idx}`} className="flex items-start space-x-3 text-xs text-slate-300">
                    <span className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-cyan-400 flex-shrink-0">
                      {idx + 1}
                    </span>
                    <p className="mt-1 leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>

              {/* Misconceptions Checklist Review */}
              <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-3">
                Key Misconception Corrections ({MISCONCEPTIONS.length})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {MISCONCEPTIONS.map((misc, idx) => (
                  <div key={`misc-card-${idx}`} className="bg-slate-950 border border-slate-800 rounded-xl p-3.5">
                    <span className="text-[10px] font-bold text-rose-400 uppercase block mb-1">{misc.title}</span>
                    <p className="text-[11px] text-slate-300 font-semibold mb-1">❌ "{misc.misconception}"</p>
                    <p className="text-[11px] text-emerald-300 leading-normal">✅ {misc.correction}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Node Mastery Breakdown Panel */}
          <aside className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
            <div>
              <h3 className="text-base font-bold text-white mb-4 flex items-center">
                <span className="mr-2 text-cyan-400">📈</span> Bayesian Knowledge Tracing
              </h3>
              <div className="space-y-3 mb-6">
                {ALL_NODE_IDS.map((nodeId) => {
                  const bkt = bktStates[nodeId] || createBKTState();
                  const prob = masteryProb(bkt);
                  const pct = Math.round(prob * 100);
                  return (
                    <div key={`bkt-meter-${nodeId}`} className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                      <div className="flex justify-between items-center text-xs mb-1.5">
                        <span className="font-mono text-slate-300">{nodeId}</span>
                        <span className="font-bold text-cyan-400">{pct}%</span>
                      </div>
                      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full transition-all duration-500"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              onClick={() => {
                setActiveTab('challenges');
                audioManager.play('tap');
              }}
              className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs rounded-xl shadow-lg hover:brightness-110 transition-all text-center"
            >
              Retake Practice Challenges →
            </button>
          </aside>
        </main>
      )}

      {/* FEEDBACK OVERLAYS */}
      <HintBubble show={showHint} text={CHALLENGES[currentChallengeIndex]?.hints[currentHintIndex] || 'Recall valence rules.'} />
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccess} text="Challenge Mastered!" />
      <SparkleBurst show={showSparkle} x={400} y={300} />
    </div>
  );
}