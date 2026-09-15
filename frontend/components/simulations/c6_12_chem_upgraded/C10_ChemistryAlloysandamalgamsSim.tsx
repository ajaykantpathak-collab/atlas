'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  Atom,
  Flame,
  Shield,
  Zap,
  Sparkles,
  Award,
  BookOpen,
  HelpCircle,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Play,
  Pause,
  Layers,
  Scale,
  TestTube,
  Microscope,
  Info,
  Volume2,
  VolumeX,
  ChevronRight,
  ChevronLeft,
  RefreshCw,
  Sliders,
  Eye,
  TrendingUp,
  Beaker,
  Compass,
  AlertTriangle,
  Lightbulb,
  Check
} from 'lucide-react';

import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import type { SoundEffect } from '../../../lib/sim-engine/types';
import { createReviewItem, sm2Update, SRSItem } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, BKTState, masteryProb } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ==========================================
// NODE IDS & METADATA
// ==========================================
const ALL_NODE_IDS = [
  'c10_chem_051',
  'c10_chem_052',
  'c10_chem_053',
  'c10_chem_054',
  'c10_chem_055',
  'c10_chem_056',
  'c10_chem_057',
  'c10_chem_058',
  'c10_chem_059',
  'c10_chem_060'
] as const;

type NodeId = typeof ALL_NODE_IDS[number];

// ==========================================
// SCENARIO & EXPLORATION DATA
// ==========================================
const SCENARIO = {
  title: 'Metallurgical Design & Alloy Innovation Lab',
  intro: 'Welcome to the High-Precision Metallurgical Testing & Synthesis Facility! As senior materials chemist, you have been tasked with formulating specialized alloys and amalgams for structural engineering, dental restoration, aerospace hulls, and precision electronics.',
  context: 'In this simulation, you will manipulate atomic lattice structures, adjust constituent metal mass percentages, observe thermal eutectic melting behaviors, test mechanical layer shear resistance under load, and evaluate resistance to electrochemical oxidation.'
};

const DISCOVERY_QUESTION = {
  question: 'Why does adding soft, malleable Tin (melting point 232°C) to soft Lead (melting point 327°C) produce Solder, which melts at a LOWER temperature (183°C) than either pure element?',
  options: [
    'Tin and Lead chemically react to form covalent bonds that absorb ambient thermal energy.',
    'Disrupting the uniform metallic crystal lattice weakens intermolecular symmetry, requiring less kinetic energy to disrupt structural alignment.',
    'Lead atoms evaporate upon contact with tin, leaving empty vacuums that cool the solid solution.',
    'Tin atoms expand and push lead atoms into a higher energy quantum state that freezes at room temperature.'
  ],
  correctIndex: 1,
  hintAfter: 'Alloying disrupts the orderly arrangement of atoms in a pure metal lattice. Foreign atoms break spatial symmetry, lowering the cohesion energy needed to melt the matrix!'
};

const DEFAULT_PROPS = {
  initialNodeId: 'c10_chem_051',
  devMode: false
};

const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Atomic Lattice Disruption & Deformation',
    instruction: 'Select between Substitutional (Brass/Bronze) and Interstitial (Steel) lattice modes. Apply mechanical load slider to observe how foreign solute atoms block lattice layer slippage (dislocation pinning).',
    interactionType: 'lattice-slip-simulator',
    nodeId: 'c10_chem_053'
  },
  {
    title: 'Lab 2: Thermal Eutectic & Melting Point Profiling',
    instruction: 'Adjust the ratio of Lead (Pb) to Tin (Sn). Heat the crucible to determine the exact Eutectic Composition (62% Sn / 38% Pb) that exhibits the lowest melting point for electrical solder.',
    interactionType: 'eutectic-melting-chamber',
    nodeId: 'c10_chem_057'
  },
  {
    title: 'Lab 3: Copper Alloys & Corrosion Protection Dynamics',
    instruction: 'Formulate Brass (Cu + Zn) vs Bronze (Cu + Sn). Subject both samples to acidic atmospheric spray to measure oxide passivation film stability and tensile strength.',
    interactionType: 'copper-alloy-chamber',
    nodeId: 'c10_chem_054'
  },
  {
    title: 'Lab 4: Amalgam Amalgamation & Mercury Matrix Lab',
    instruction: 'Mix Liquid Mercury (Hg) with Silver (Ag), Tin (Sn), and Sodium (Na). Observe matrix solidification, amalgam expansion, and reactivity without forming permanent chemical bonds.',
    interactionType: 'amalgam-reaction-vat',
    nodeId: 'c10_chem_058'
  },
  {
    title: 'Lab 5: Gold Carat Purity & Lightweight Aerospace Formulations',
    instruction: 'Analyze 24K vs 22K/18K Gold and Duralumin/Magnalium formulations. Calculate density, hardness (Vickers rating), and structural strength-to-weight ratios.',
    interactionType: 'gold-and-aero-analyzer',
    nodeId: 'c10_chem_059'
  }
];

const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: What happens to the electrical conductivity of pure Copper when it is converted into Brass by adding 30% Zinc?',
    options: [
      'Electrical conductivity increases because Zinc donates additional free valence electrons.',
      'Electrical conductivity decreases significantly because foreign zinc atoms scatter electron wavefunctions.',
      'Electrical conductivity remains exactly the same because both are metallic conductors.',
      'Electrical conductivity drops to zero, turning Brass into an electrical insulator.'
    ],
    correctIndex: 1,
    verifyInstruction: 'Verify in Lab 3 by testing the electrical resistance meter on pure Cu vs Brass alloy.',
    nodeId: 'c10_chem_052'
  },
  {
    question: 'Predict: Why is Carbon added in small amounts (0.1% - 1.5%) to iron to make Steel, rather than in large amounts (> 4%)?',
    options: [
      'Excess carbon makes the iron hyper-elastic like rubber.',
      'Excess carbon forms excessive brittle cementite (Fe3C) flakes, making the alloy extremely brittle and prone to fracturing.',
      'Excess carbon lowers the density of iron, causing it to float on liquid water.',
      'Excess carbon turns the iron into pure synthetic diamond instantly at room temperature.'
    ],
    correctIndex: 1,
    verifyInstruction: 'Verify in Lab 1 by increasing Carbon content past 2% and testing impact toughness.',
    nodeId: 'c10_chem_056'
  }
];

const OBSERVATION_QUESTIONS = [
  {
    question: 'Observation: What do you notice about atom movement during shearing stress in pure iron vs interstitial carbon steel?',
    observableOptions: [
      'Pure iron layers slide smoothly past one another; interstitial carbon atoms block planes and prevent layer sliding.',
      'Carbon atoms slide faster than iron atoms, lubricating the crystal lattice.',
      'Iron atoms evaporate when mechanical shear force is applied.',
      'Pure iron breaks instantly while carbon steel flows like a thick viscous liquid.'
    ],
    correctIndex: 0,
    nodeId: 'c10_chem_053'
  },
  {
    question: 'Observation: What happens when Mercury (liquid metal at 25°C) is alloyed with Silver metal powder?',
    observableOptions: [
      'A chemical gas explosion occurs releasing chlorine gas.',
      'Mercury dissolves silver into a plastic/paste matrix that hardens into a dense solid amalgam over time.',
      'The mixture stays dynamic liquid mercury indefinitely without any change in consistency.',
      'Silver turns into pure gold through transmutation.'
    ],
    correctIndex: 1,
    nodeId: 'c10_chem_058'
  }
];

const REAL_WORLD_ACTIVITY = {
  title: 'Industrial Quality Assay: Aircraft Fuselage & Electrical Solder Verification',
  description: 'Apply your metallurgical expertise to verify structural alloys for an aerospace engineering plant and a micro-electronics assembly cleanroom.',
  steps: [
    'Step 1: Calculate the density of 18 Carat Gold jewellery containing 75% Gold, 15% Silver, and 10% Copper.',
    'Step 2: Determine the optimal Eutectic Solder ratio (63% Sn / 37% Pb) for soldering delicate printed circuit boards without heat damage.',
    'Step 3: Evaluate Duralumin (95% Al, 4% Cu, 0.5% Mg, 0.5% Mn) heat treatment yield strength for aircraft wing spars.',
    'Step 4: Verify Stainless Steel chromium passivation layer (>12% Cr) under salt spray corrosion chamber limits.'
  ]
};

// ==========================================
// MISCONCEPTIONS DATA
// ==========================================
const MISCONCEPTIONS = [
  {
    id: 'misc_01',
    misconception: 'Amalgams Are Always Liquid Mixtures Containing Mercury',
    correction: 'An amalgam is simply an alloy formed by combining mercury with one or more metals. While mercury is liquid, dental silver amalgam and sodium amalgam solidify or form paste/solid matrices at room temperature.',
    nodeId: 'c10_chem_058'
  },
  {
    id: 'misc_02',
    misconception: 'Brass and Bronze Have the Exact Same Metal Composition',
    correction: 'Brass is specifically an alloy of Copper + Zinc (Cu + Zn), while Bronze is an alloy of Copper + Tin (Cu + Sn). Zinc gives brass high malleability and acoustic resonance; tin gives bronze corrosion resistance and hardness.',
    nodeId: 'c10_chem_054'
  },
  {
    id: 'misc_03',
    misconception: 'Alloys Always Have Higher Melting Points Than Constituent Metals',
    correction: 'Alloying disrupts the orderly metallic lattice, reducing cohesive energy. Most alloys (e.g., solder) melt at significantly lower temperatures than their constituent pure metals.',
    nodeId: 'c10_chem_052'
  },
  {
    id: 'misc_04',
    misconception: 'Alloys Are Chemical Compounds Formed by Fixed Chemical Bonds',
    correction: 'Alloys are homogeneous solid solutions or physical mixtures, not chemical compounds. They retain elemental chemical characteristics and can vary continuously in constituent percentages.',
    nodeId: 'c10_chem_051'
  },
  {
    id: 'misc_05',
    misconception: 'Interstitial Alloys Form by Replacing Host Metal Atoms Directly',
    correction: 'In substitutional alloys (like brass), solute atoms replace host lattice atoms directly. In interstitial alloys (like carbon in steel), tiny atoms fit into inter-atomic void spaces (interstices) without replacing host metal atoms.',
    nodeId: 'c10_chem_053'
  },
  {
    id: 'misc_06',
    misconception: '24 Carat Gold is Best Suited for Making Daily Wear Jewelry',
    correction: '24 Carat gold is 100% pure gold and is extremely soft and easily deformed. It must be alloyed with copper or silver (e.g., 22K or 18K) to gain hardness for durable jewellery.',
    nodeId: 'c10_chem_059'
  }
];

// ==========================================
// CHALLENGES (23 QUESTIONS ACROSS 3 TIERS)
// ==========================================
export interface Challenge {
  id: string;
  nodeId: NodeId;
  type: 'mcq' | 'numeric' | 'classification' | 'drag-sort';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: string;
  question: string;
  options?: string[];
  correctIndex?: number;
  correctAnswer?: number;
  tolerance?: number;
  unit?: string;
  categories?: string[];
  itemsToClassify?: Array<{ item: string; categoryIndex: number }>;
  itemsToSort?: string[];
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
}

const CHALLENGES: Challenge[] = [
  // --- FOUNDATION TIER (7 Challenges) ---
  {
    id: 'ch_01',
    nodeId: 'c10_chem_051',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Recall & Definition',
    question: 'Which statement accurately describes the true nature of an alloy?',
    options: [
      'A chemical compound formed by fixed ionic bonds between two metals',
      'A homogeneous solid solution or mixture of two or more metals, or a metal and non-metal',
      'A heterogeneous physical mixture of un-melted metal filings suspended in plastic',
      'A liquid solution created exclusively through aqueous acid reaction'
    ],
    correctIndex: 1,
    explanation: 'An alloy is a homogeneous mixture (solid solution) of two or more elements, at least one of which is a metal. Elements retain their physical mixing nature without fixed stoichiometric chemical bonding.',
    hints: [
      'Think about whether alloys have fixed chemical formulas like H2O or variable percentage mixtures.',
      'Are the components chemically bonded into a new substance or dissolved uniformly in solid phase?',
      'Alloys are homogeneous solid solutions.'
    ],
    misconceptionIndex: 3
  },
  {
    id: 'ch_02',
    nodeId: 'c10_chem_054',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Composition Recall',
    question: 'Brass is a widely used alloy primarily composed of which two elements?',
    options: [
      'Copper (Cu) and Tin (Sn)',
      'Copper (Cu) and Zinc (Zn)',
      'Iron (Fe) and Carbon (C)',
      'Aluminium (Al) and Magnesium (Mg)'
    ],
    correctIndex: 1,
    explanation: 'Brass is an alloy consisting primarily of Copper (60-80%) and Zinc (20-40%). (Copper + Tin produces Bronze).',
    hints: [
      'Remember the phrase: "Brass has Z in it, but Zinc is spelled with Z".',
      'Bronze contains Tin (Sn), while Brass contains Zinc (Zn).',
      'Brass = Copper + Zinc.'
    ],
    misconceptionIndex: 1
  },
  {
    id: 'ch_03',
    nodeId: 'c10_chem_058',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Definition & Terminology',
    question: 'What constituent element MUST be present in any alloy classified as an "Amalgam"?',
    options: ['Gold (Au)', 'Mercury (Hg)', 'Silver (Ag)', 'Lead (Pb)'],
    correctIndex: 1,
    explanation: 'An amalgam is defined specifically as an alloy formed between Mercury (Hg) and one or more other metals.',
    hints: [
      'Which metal is liquid at room temperature (25°C)?',
      'Amalgams are formed when liquid Mercury dissolves other metals.',
      'The key required element is Mercury (Hg).'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'ch_04',
    nodeId: 'c10_chem_057',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Property & Composition Identification',
    question: 'Solder, used extensively for joining electrical wiring, consists of which pair of metals?',
    options: [
      'Copper and Zinc',
      'Lead and Tin',
      'Iron and Nickel',
      'Aluminium and Copper'
    ],
    correctIndex: 1,
    explanation: 'Solder is an alloy of Lead (Pb) and Tin (Sn) (typically ~50% Pb and ~50% Sn or eutectic 37% Pb / 63% Sn), valued for its low melting point.',
    hints: [
      'Think of heavy soft metals with low melting points.',
      'Chemical symbols Pb and Sn.',
      'Solder = Lead (Pb) + Tin (Sn).'
    ],
    misconceptionIndex: 2
  },
  {
    id: 'ch_05',
    nodeId: 'c10_chem_059',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Purity Scale Understanding',
    question: 'What percentage of pure gold is present in 24 Carat (24K) gold?',
    options: ['75.0%', '91.6%', '99.9% - 100%', '50.0%'],
    correctIndex: 2,
    explanation: '24 Carat gold represents 100% pure gold (24 parts out of 24 parts pure gold).',
    hints: [
      'Carat scale for gold purity is measured out of 24 parts.',
      '24/24 equals 100%.',
      '24 Carat is 100% pure gold.'
    ],
    misconceptionIndex: 5
  },
  {
    id: 'ch_06',
    nodeId: 'c10_chem_056',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Corrosion Chemistry',
    question: 'Which key transition metal element is added to Steel to manufacture Stainless Steel, rendering it resistant to rusting?',
    options: ['Zinc (Zn)', 'Chromium (Cr)', 'Mercury (Hg)', 'Tin (Sn)'],
    correctIndex: 1,
    explanation: 'Chromium (typically at least 11-12%) is added to steel to form a tough, self-healing invisible surface oxide layer (Cr2O3) that stops atmospheric corrosion.',
    hints: [
      'This element forms a protective passive oxide layer.',
      'Its symbol is Cr.',
      'Chromium gives stainless steel its shine and rust resistance.'
    ],
    misconceptionIndex: 3
  },
  {
    id: 'ch_07',
    nodeId: 'c10_chem_055',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Lightweight Alloys',
    question: 'Duralumin is an alloy containing ~95% Aluminium. Which alloying metal is added in ~4% to give it high tensile strength for aircraft bodies?',
    options: ['Mercury (Hg)', 'Copper (Cu)', 'Lead (Pb)', 'Gold (Au)'],
    correctIndex: 1,
    explanation: 'Duralumin is composed of Aluminium (95%), Copper (4%), Manganese (0.5%), and Magnesium (0.5%). Copper forms precipitate hardening phases (Al2Cu) that dramatically increase strength.',
    hints: [
      'This metal is famous for its reddish color and high electrical conductivity.',
      'Its symbol is Cu.',
      'Copper is added to aluminium to form Duralumin.'
    ],
    misconceptionIndex: 1
  },

  // --- STANDARD TIER (8 Challenges) ---
  {
    id: 'ch_08',
    nodeId: 'c10_chem_053',
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Lattice Structural Mechanics',
    question: 'What distinguishes an Interstitial Alloy from a Substitutional Alloy at the atomic scale?',
    options: [
      'In interstitial alloys, solute atoms are much smaller and fit into gaps (interstices) between host atoms; in substitutional alloys, solute atoms replace host atoms in lattice sites.',
      'In interstitial alloys, host atoms evaporate leaving large gas bubbles inside the solid metal matrix.',
      'Substitutional alloys only form between metals and non-metals, while interstitial alloys only form between liquids.',
      'Interstitial alloys contain liquid mercury, whereas substitutional alloys contain molten lead.'
    ],
    correctIndex: 0,
    explanation: 'Substitutional alloys form when solute atoms have similar atomic radii to host metal atoms (diff <= 15%) and replace them in lattice positions. Interstitial alloys form when solute atoms (like Carbon in Iron) are small enough to sit in interstitial void spaces.',
    hints: [
      'Consider atomic size differences between host metal and solute elements.',
      'Substitute means replace; interstitial means inside empty gaps between lattice spheres.',
      'Carbon in iron sits inside interstitial void gaps.'
    ],
    misconceptionIndex: 4
  },
  {
    id: 'ch_09',
    nodeId: 'c10_chem_057',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Quantitative Purity Analysis',
    question: 'Calculate the mass of pure Gold (in grams) present in a 20 gram ring made of 18 Carat (18K) gold.',
    correctAnswer: 15,
    tolerance: 0.1,
    unit: 'grams',
    explanation: '18 Carat gold contains (18 / 24) = 75% pure gold by mass. For a 20 gram ring: Mass of Gold = 0.75 * 20g = 15.0 grams.',
    hints: [
      'Calculate the fraction of gold: 18 out of 24.',
      'Multiply (18/24) or 0.75 by total mass (20g).',
      '0.75 * 20 = 15 grams.'
    ],
    misconceptionIndex: 5
  },
  {
    id: 'ch_10',
    nodeId: 'c10_chem_052',
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Mechanical Dislocation Theory',
    question: 'Why is an alloy generally harder and stronger than its pure constituent metals?',
    options: [
      'The different sizes of foreign constituent atoms disrupt the regular crystal lattice layers, blocking dislocation planes from sliding past each other.',
      'Alloys form magnetic fields that pull adjacent atoms closer together.',
      'The pure constituent metals lose electrons and become weightless.',
      'Alloying converts metallic bonds into covalent diamond bonds throughout the sample.'
    ],
    correctIndex: 0,
    explanation: 'In pure metals, uniform rows of identical atoms slide easily past one another under mechanical stress. Foreign solute atoms disrupt lattice regularity, pinning slip planes and increasing yield strength.',
    hints: [
      'Think about how uniform layers slide vs irregular layers with foreign spheres.',
      'Dislocation pinning prevents metal layers from slipping easily.',
      'Atom size mismatch distorts lattice planes.'
    ],
    misconceptionIndex: 2
  },
  {
    id: 'ch_11',
    nodeId: 'c10_chem_055',
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Industrial Alloy Selection',
    question: 'Magnalium (Aluminium + Magnesium) is preferred over pure Aluminium for making physical laboratory balances and scientific instruments because:',
    options: [
      'It is much heavier than pure aluminium and resists gravity.',
      'It is lighter, harder, more durable, and far more resistant to chemical corrosion than pure Al.',
      'It is transparent and allows light to pass through internal gears.',
      'It melts at room temperature for easy casting.'
    ],
    correctIndex: 1,
    explanation: 'Magnalium contains 90-95% Al and 5-10% Mg. It is lighter than pure Al, has high tensile strength, and resists corrosion, making it ideal for precision instruments and balances.',
    hints: [
      'Think about lightness combined with structural rigidity.',
      'Magnesium reduces density while increasing strength.',
      'Magnalium provides high strength-to-weight ratio and corrosion resistance.'
    ],
    misconceptionIndex: 1
  },
  {
    id: 'ch_12',
    nodeId: 'c10_chem_058',
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Reactivity Analysis',
    question: 'Why is Sodium Amalgam (Na/Hg) frequently used as a controlled reducing agent in organic chemistry reactions instead of pure Sodium metal?',
    options: [
      'Sodium amalgam is explosive upon contact with air, accelerating reaction rate.',
      'Mercury moderates the extreme chemical reactivity of sodium, allowing smooth, controlled hydrogen generation without violent hydrolysis.',
      'Sodium amalgam contains no active sodium metal.',
      'Mercury acts as a permanent fuel that ignites under water.'
    ],
    correctIndex: 1,
    explanation: 'Pure Sodium reacts violently with water/moisture. Alloying Sodium with Mercury forms Sodium Amalgam, which lowers the thermodynamic activity of sodium, enabling smooth, controlled chemical reduction.',
    hints: [
      'Pure Sodium reacts violently with water.',
      'Mercury dilutes sodium atoms and slows down reactivity.',
      'Amalgamation moderates reaction rates safely.'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'ch_13',
    nodeId: 'c10_chem_054',
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Acoustic & Engineering Properties',
    question: 'Why is Brass (Cu + Zn) chosen for crafting musical instruments like trumpets and bells rather than Bronze (Cu + Sn)?',
    options: [
      'Brass is extremely soft and dissolves in saliva.',
      'Brass possesses superior acoustic resonance, high workability/malleability, and low internal sonic friction.',
      'Bronze is magnetic and attracts iron dust during concerts.',
      'Brass is 100 times lighter than air.'
    ],
    correctIndex: 1,
    explanation: 'Brass exhibits high acoustic resonance, excellent acoustic damping properties, and high malleability for cold-working into complex horn shapes.',
    hints: [
      'Consider acoustic resonance and ease of shaping into horn bells.',
      'Zinc gives copper greater acoustic ring and malleability.',
      'Brass has optimal acoustic and shaping properties.'
    ],
    misconceptionIndex: 1
  },
  {
    id: 'ch_14',
    nodeId: 'c10_chem_056',
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Structural Metallurgy',
    question: 'What is the role of Nickel (Ni) in Stainless Steel (Fe + Cr + Ni + C)?',
    options: [
      'To make steel rust rapidly when exposed to saltwater',
      'To stabilize the austenitic crystal phase, improving ductility, toughness, and non-magnetic qualities',
      'To lower the melting point of steel to 50°C',
      'To increase carbon concentration up to 50%'
    ],
    correctIndex: 1,
    explanation: 'Nickel stabilizes the Face-Centered Cubic (FCC / Austenitic) structure in stainless steel, imparting superior ductility, low-temperature toughness, and corrosion resistance.',
    hints: [
      'Nickel affects the crystal symmetry (Austenitic phase).',
      'It enhances ductility and impact resistance.',
      'Nickel stabilizes FCC lattice structure.'
    ],
    misconceptionIndex: 3
  },
  {
    id: 'ch_15',
    nodeId: 'c10_chem_060',
    type: 'classification',
    difficulty: 'standard',
    competencyLevel: 'Metallurgical Taxonomy',
    question: 'Classify each named alloy into its primary Base Metal category:',
    categories: ['Copper Alloys', 'Aluminium Alloys', 'Iron Alloys'],
    itemsToClassify: [
      { item: 'Brass (Cu + Zn)', categoryIndex: 0 },
      { item: 'Duralumin (Al + Cu + Mg + Mn)', categoryIndex: 1 },
      { item: 'Stainless Steel (Fe + Cr + Ni)', categoryIndex: 2 },
      { item: 'Bronze (Cu + Sn)', categoryIndex: 0 },
      { item: 'Magnalium (Al + Mg)', categoryIndex: 1 },
      { item: 'Invar / Carbon Steel (Fe + C)', categoryIndex: 2 }
    ],
    explanation: 'Brass and Bronze are Copper-base; Duralumin and Magnalium are Aluminium-base; Stainless Steel and Carbon Steel are Iron-base.',
    hints: [
      'Cu = Copper base, Al = Aluminium base, Fe = Iron base.',
      'Match constituent symbols to base metals.',
      'Check primary percentages.'
    ],
    misconceptionIndex: 1
  },

  // --- ADVANCED TIER (8 Challenges) ---
  {
    id: 'ch_16',
    nodeId: 'c10_chem_057',
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Eutectic Thermodynamics',
    question: 'In a binary Lead-Tin Phase Diagram, the eutectic composition is 63% Tin and 37% Lead. If pure Tin melts at 232°C and pure Lead melts at 327°C, the eutectic melting point of Solder drops to 183°C. What is the temperature reduction (°C) compared to pure Lead?',
    correctAnswer: 144,
    tolerance: 0.5,
    unit: '°C',
    explanation: 'Melting point reduction = Pure Lead Melting Point (327°C) - Eutectic Solder Melting Point (183°C) = 144°C.',
    hints: [
      'Subtract Eutectic temperature (183°C) from pure Lead temperature (327°C).',
      '327 - 183 = ?',
      'The difference is 144°C.'
    ],
    misconceptionIndex: 2
  },
  {
    id: 'ch_17',
    nodeId: 'c10_chem_058',
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Chemical Bonding & Solid Solution Physics',
    question: 'Dental silver amalgam (Ag-Sn-Cu alloyed with Hg) undergoes setting expansion/contraction during matrix crystallization. What phase transition causes setting and hardening?',
    options: [
      'Formation of intermetallic silver-mercury (Ag2Hg3 / γ1 phase) and tin-mercury (Sn7-8Hg / γ2 phase) solid solution crystal networks.',
      'Spontaneous combustion of mercury vapor forming solid mercury oxide gas.',
      'Complete oxidation of silver into silver nitrate solution.',
      'Radioactive decay of silver isotopes into liquid mercury.'
    ],
    correctIndex: 0,
    explanation: 'When liquid Hg is triturated with Ag-Sn alloy powder, mercury dissolves the surface of Ag-Sn particles forming gamma-1 (Ag2Hg3) and gamma-2 (Sn7Hg) intermetallic solid phases that interlock and solidify.',
    hints: [
      'Look for intermetallic solid solution phases (gamma phases).',
      'Mercury reacts with Ag and Sn to form interlocking crystal grains.',
      'Solidification occurs via Ag2Hg3 crystal growth.'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'ch_18',
    nodeId: 'c10_chem_059',
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Quantitative Alloy Composition',
    question: 'A metallurgist needs to prepare 100 grams of 22 Carat (22K) gold alloy using pure 24K gold and pure copper. How many grams of pure Copper must be added?',
    correctAnswer: 8.33,
    tolerance: 0.2,
    unit: 'grams',
    explanation: '22K gold contains (22 / 24) = 91.67% Gold and (2 / 24) = 8.33% alloying metal (Copper). In a 100g sample, mass of Copper = 8.33 grams.',
    hints: [
      'Fraction of non-gold metal in 22K gold is 2/24.',
      '(2 / 24) * 100 = 8.333 grams.',
      'Result is 8.33g.'
    ],
    misconceptionIndex: 5
  },
  {
    id: 'ch_19',
    nodeId: 'c10_chem_053',
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Hume-Rothery Rules & Phase Equilibrium',
    question: 'According to Hume-Rothery rules, which conditions MUST be satisfied for two metals to form a continuous substitutional solid solution across all concentration ranges?',
    options: [
      'Atomic radius difference < 15%, identical crystal structure, similar electronegativity, and same valency.',
      'One metal must be liquid mercury and the other must be gaseous nitrogen.',
      'Atomic radius difference > 50% and completely opposite valence states.',
      'Both metals must have zero thermal conductivity at room temperature.'
    ],
    correctIndex: 0,
    explanation: 'Hume-Rothery rules state that complete solid solubility requires matching atomic radii (<15% diff), identical crystal lattice symmetry (e.g., FCC-FCC), similar electronegativities, and identical valency.',
    hints: [
      'Look for the atomic radius rule (<15%) and matching crystal structure.',
      'Substitutional lattice replacement requires structural similarity.',
      'Matching radius, crystal structure, and valence.'
    ],
    misconceptionIndex: 4
  },
  {
    id: 'ch_20',
    nodeId: 'c10_chem_056',
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'Process Optimization',
    question: 'Rank the following iron/steel alloys in ORDER OF INCREASING Carbon Content percentage:',
    itemsToSort: [
      'Wrought Iron (< 0.08% C)',
      'Mild Steel (0.15% - 0.25% C)',
      'High Carbon Tool Steel (0.60% - 1.5% C)',
      'Cast Iron (2.5% - 4.5% C)'
    ],
    explanation: 'Wrought Iron has the lowest carbon (<0.08%), followed by Mild Steel (~0.2%), High Carbon Steel (~1%), and Cast Iron with highest carbon content (2.5-4.5%).',
    hints: [
      'Wrought iron is almost pure iron.',
      'Cast iron has the highest carbon content (brittle).',
      'Order: Wrought Iron -> Mild Steel -> High Carbon Steel -> Cast Iron.'
    ],
    misconceptionIndex: 4
  },
  {
    id: 'ch_21',
    nodeId: 'c10_chem_055',
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Precipitation Hardening Mechanics',
    question: 'Duralumin gains exceptional strength through a thermal process known as "Age Hardening" (Precipitation Hardening). What microstructural mechanism occurs during age hardening?',
    options: [
      'Sub-microscopic CuAl2 intermetallic particles precipitate out of solid solution, pinning dislocations within the aluminium crystal matrix.',
      'Aluminium atoms evaporate, leaving hollow tube structures that act like carbon nanotubes.',
      'Magnesium reacts with air to form liquid water drops inside the alloy.',
      'The alloy decomposes into pure liquid copper and aluminium powder.'
    ],
    correctIndex: 0,
    explanation: 'Heat treatment creates a supersaturated solid solution. During aging, tiny finely dispersed CuAl2 (theta phase) precipitates form, acting as obstacles that pin dislocation movement.',
    hints: [
      'Look for fine CuAl2 precipitate particles pinning dislocations.',
      'Precipitation blocks slip planes inside aluminium lattice.',
      'CuAl2 particles pin lattice dislocations.'
    ],
    misconceptionIndex: 4
  },
  {
    id: 'ch_22',
    nodeId: 'c10_chem_060',
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Electrochemical Oxidation Dynamics',
    question: 'Why does Bronze (Cu + Sn) offer superior resistance to marine corrosion compared to pure Copper and Brass in saltwater environments?',
    options: [
      'Tin forms a tenacious, impermeable protective passive film of Stannic Oxide (SnO2) on the surface that resists chloride ion penetration.',
      'Bronze generates a continuous electrical spark that disintegrates salt water.',
      'Salt dissolved in seawater dissolves bronze back into pure gold.',
      'Tin dissolves completely in water, leaving copper to react with hydrogen.'
    ],
    correctIndex: 0,
    explanation: 'Tin oxidizes to form a dense, adherent Stannic Oxide (SnO2) barrier layer that prevents chloride ions from penetrating and corroding the underlying copper matrix.',
    hints: [
      'Look for the protective passive SnO2 oxide layer.',
      'Tin oxides resist chloride attack in marine environments.',
      'SnO2 passive film resists marine salt corrosion.'
    ],
    misconceptionIndex: 1
  },
  {
    id: 'ch_23',
    nodeId: 'c10_chem_051',
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Metallurgical Density Calculation',
    question: 'An alloy is made by mixing 70g of Copper (density 8.96 g/cm³) and 30g of Zinc (density 7.14 g/cm³). Assuming ideal solid solution mixing without volume change, calculate the theoretical density of the Brass alloy in g/cm³.',
    correctAnswer: 8.33,
    tolerance: 0.1,
    unit: 'g/cm³',
    explanation: 'Total mass = 100g. Volume Cu = 70 / 8.96 = 7.8125 cm³. Volume Zn = 30 / 7.14 = 4.2017 cm³. Total Volume = 12.0142 cm³. Density = 100g / 12.0142 cm³ = 8.323 g/cm³ ~ 8.33 g/cm³.',
    hints: [
      'Calculate volume of Cu = 70 / 8.96.',
      'Calculate volume of Zn = 30 / 7.14.',
      'Total Mass / Total Volume = 100 / (7.8125 + 4.2017) = 8.33 g/cm³.'
    ],
    misconceptionIndex: 3
  }
];

// ==========================================
// TOPIC SPECIFIC CUSTOM SVG DIAGRAMS
// ==========================================

// Diagram 1: Lattice Structures (Substitutional vs Interstitial)
const LatticeDiagram: React.FC<{ mode: 'substitutional' | 'interstitial' | 'pure'; shearing: boolean }> = ({ mode, shearing }) => {
  const rows = 4;
  const cols = 6;
  const radius = 18;

  return (
    <svg viewBox="0 0 400 240" className="w-full h-auto bg-slate-900 rounded-xl shadow-lg border border-slate-800">
      <defs>
        <radialGradient id="hostAtomGrad" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#1e40af" />
        </radialGradient>
        <radialGradient id="substAtomGrad" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#facc15" />
          <stop offset="100%" stopColor="#a16207" />
        </radialGradient>
        <radialGradient id="interstAtomGrad" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#991b1b" />
        </radialGradient>
        <linearGradient id="shearArrow" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#818cf8" />
        </linearGradient>
      </defs>

      {/* Grid Lines / Slip Planes */}
      <line x1="30" y1="120" x2="370" y2="120" stroke="#475569" strokeWidth="2" strokeDasharray="4,4" />
      <text x="365" y="115" fill="#94a3b8" fontSize="10" textAnchor="end">Slip Plane</text>

      {/* Shearing Force Vectors */}
      {shearing && (
        <g>
          <path d="M 40 25 L 140 25 M 130 18 L 140 25 L 130 32" stroke="url(#shearArrow)" strokeWidth="4" fill="none" className="animate-pulse" />
          <text x="40" y="18" fill="#38bdf8" fontSize="11" fontWeight="bold">Shear Stress τ</text>
          <path d="M 360 215 L 260 215 M 270 208 L 260 215 L 270 222" stroke="url(#shearArrow)" strokeWidth="4" fill="none" className="animate-pulse" />
        </g>
      )}

      {/* Lattice Atoms */}
      {Array.from({ length: rows }).map((_, r) => {
        const rowOffset = shearing && r < 2 ? 18 : 0;
        return Array.from({ length: cols }).map((_, c) => {
          const cx = 55 + c * 58 + rowOffset;
          const cy = 45 + r * 50;
          const isSubstPos = mode === 'substitutional' && ( (r === 1 && c === 2) || (r === 2 && c === 4) );

          return (
            <g key={`atom-${r}-${c}`}>
              <circle
                cx={cx}
                cy={cy}
                r={radius}
                fill={isSubstPos ? "url(#substAtomGrad)" : "url(#hostAtomGrad)"}
                stroke={isSubstPos ? "#fde047" : "#93c5fd"}
                strokeWidth="1.5"
                className="transition-all duration-300"
              />
              <text x={cx} y={cy + 4} fill="#ffffff" fontSize="10" textAnchor="middle" fontWeight="bold" opacity="0.8">
                {isSubstPos ? "Zn" : "Cu"}
              </text>
            </g>
          );
        });
      })}

      {/* Interstitial Atoms in Void Spaces */}
      {mode === 'interstitial' && (
        <>
          <g className="animate-bounce" style={{ animationDuration: '3s' }}>
            <circle cx="142" cy="70" r="9" fill="url(#interstAtomGrad)" stroke="#fca5a5" strokeWidth="1.5" />
            <text x="142" y="73" fill="#ffffff" fontSize="8" textAnchor="middle" fontWeight="bold">C</text>
          </g>
          <g className="animate-bounce" style={{ animationDuration: '2.5s' }}>
            <circle cx="258" cy="120" r="9" fill="url(#interstAtomGrad)" stroke="#fca5a5" strokeWidth="1.5" />
            <text x="258" y="123" fill="#ffffff" fontSize="8" textAnchor="middle" fontWeight="bold">C</text>
          </g>
          <g className="animate-bounce" style={{ animationDuration: '3.2s' }}>
            <circle cx="200" cy="170" r="9" fill="url(#interstAtomGrad)" stroke="#fca5a5" strokeWidth="1.5" />
            <text x="200" y="173" fill="#ffffff" fontSize="8" textAnchor="middle" fontWeight="bold">C</text>
          </g>
        </>
      )}

      {/* Annotation */}
      <rect x="15" y="195" width="370" height="35" rx="6" fill="#0f172a" stroke="#334155" />
      <text x="200" y="217" fill="#e2e8f0" fontSize="11" textAnchor="middle">
        {mode === 'pure' && 'Pure Metal Lattice: Uniform layers slide easily (Low Hardness)'}
        {mode === 'substitutional' && 'Substitutional Alloy: Foreign atoms distort lattice planes (High Hardness)'}
        {mode === 'interstitial' && 'Interstitial Alloy: Small Carbon atoms pin interstitial voids (High Tensile Strength)'}
      </text>
    </svg>
  );
};

// Diagram 2: Eutectic Phase & Melting Curve
const EutecticDiagram: React.FC<{ pbRatio: number; temperature: number }> = ({ pbRatio, temperature }) => {
  const snRatio = 100 - pbRatio;
  // Eutectic point at 63% Sn (37% Pb) = 183°C
  const eutecticSn = 63;
  const currentMeltingPt = useMemo(() => {
    if (snRatio <= eutecticSn) {
      return 327 - (snRatio / eutecticSn) * (327 - 183);
    } else {
      return 183 + ((snRatio - eutecticSn) / (100 - eutecticSn)) * (232 - 183);
    }
  }, [snRatio]);

  const isLiquid = temperature >= currentMeltingPt;

  // Path for phase diagram
  const pathD = "M 40,40 L 191,150 L 360,110 L 360,180 L 40,180 Z";

  const currentX = 40 + (snRatio / 100) * 320;
  const currentY = 40 + ((currentMeltingPt - 183) / (327 - 183)) * 110;

  return (
    <svg viewBox="0 0 400 240" className="w-full h-auto bg-slate-900 rounded-xl border border-slate-800 shadow-lg">
      <defs>
        <linearGradient id="liquidGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f97316" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#ef4444" stopOpacity="0.4" />
        </linearGradient>
      </defs>

      <text x="200" y="22" fill="#f8fafc" fontSize="12" fontWeight="bold" textAnchor="middle">
        Lead-Tin (Pb-Sn) Binary Eutectic Phase Equilibrium
      </text>

      {/* Axes */}
      <line x1="40" y1="40" x2="40" y2="180" stroke="#64748b" strokeWidth="2" />
      <line x1="40" y1="180" x2="360" y2="180" stroke="#64748b" strokeWidth="2" />

      {/* Labels */}
      <text x="25" y="45" fill="#94a3b8" fontSize="9">327°C (Pb)</text>
      <text x="25" y="115" fill="#94a3b8" fontSize="9">232°C (Sn)</text>
      <text x="25" y="155" fill="#38bdf8" fontSize="9" fontWeight="bold">183°C (Eutectic)</text>

      <text x="40" y="195" fill="#94a3b8" fontSize="9" textAnchor="middle">100% Pb</text>
      <text x="191" y="195" fill="#38bdf8" fontSize="9" fontWeight="bold" textAnchor="middle">63% Sn / 37% Pb</text>
      <text x="360" y="195" fill="#94a3b8" fontSize="9" textAnchor="middle">100% Sn</text>

      {/* Liquidus Lines */}
      <path d="M 40,40 Q 120,110 191,150 Q 270,130 360,110" fill="none" stroke="#f59e0b" strokeWidth="3" />
      {/* Solidus Line */}
      <line x1="40" y1="150" x2="360" y2="150" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3,3" />

      {/* Eutectic Point Marker */}
      <circle cx="191" cy="150" r="5" fill="#38bdf8" stroke="#ffffff" strokeWidth="1.5" />
      <text x="191" y="140" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">Eutectic Pt (183°C)</text>

      {/* Current Operating Point */}
      <circle cx={currentX} cy={currentY} r="7" fill={isLiquid ? "#ef4444" : "#22c55e"} stroke="#ffffff" strokeWidth="2" className="animate-ping" />
      <circle cx={currentX} cy={currentY} r="6" fill={isLiquid ? "#ef4444" : "#22c55e"} stroke="#ffffff" strokeWidth="2" />

      {/* Status Box */}
      <rect x="40" y="205" width="320" height="28" rx="4" fill="#0f172a" stroke="#334155" />
      <text x="200" y="223" fill="#e2e8f0" fontSize="11" textAnchor="middle">
        Comp: {snRatio.toFixed(0)}% Sn / {pbRatio.toFixed(0)}% Pb | Liquidus Temp: {currentMeltingPt.toFixed(1)}°C | State: {isLiquid ? 'MOLTEN LIQUID' : 'SOLID MATRIX'}
      </text>
    </svg>
  );
};

// Diagram 3: Amalgam Reaction & Mercury Matrix
const AmalgamDiagram: React.FC<{ mercuryPct: number; isTriturated: boolean }> = ({ mercuryPct, isTriturated }) => {
  return (
    <svg viewBox="0 0 400 240" className="w-full h-auto bg-slate-900 rounded-xl border border-slate-800 shadow-lg">
      <defs>
        <radialGradient id="hgGlobe" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#e2e8f0" />
          <stop offset="50%" stopColor="#94a3b8" />
          <stop offset="100%" stopColor="#334155" />
        </radialGradient>
        <radialGradient id="agParticle" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#0369a1" />
        </radialGradient>
      </defs>

      <text x="200" y="22" fill="#f8fafc" fontSize="12" fontWeight="bold" textAnchor="middle">
        Dental Silver Amalgam Trituration & Matrix Formation (Ag-Sn + Hg)
      </text>

      {!isTriturated ? (
        <g>
          {/* Unmixed Liquid Hg Globules */}
          <circle cx="120" cy="110" r={15 + mercuryPct * 0.2} fill="url(#hgGlobe)" stroke="#cbd5e1" strokeWidth="2" />
          <circle cx="160" cy="140" r={12 + mercuryPct * 0.15} fill="url(#hgGlobe)" stroke="#cbd5e1" strokeWidth="2" />
          <text x="140" y="175" fill="#cbd5e1" fontSize="11" fontWeight="bold" textAnchor="middle">Liquid Mercury (Hg)</text>

          {/* Alloy Powder Particles */}
          <circle cx="270" cy="100" r="22" fill="url(#agParticle)" stroke="#7dd3fc" strokeWidth="2" />
          <circle cx="310" cy="135" r="18" fill="url(#agParticle)" stroke="#7dd3fc" strokeWidth="2" />
          <circle cx="250" cy="145" r="16" fill="url(#agParticle)" stroke="#7dd3fc" strokeWidth="2" />
          <text x="275" y="175" fill="#7dd3fc" fontSize="11" fontWeight="bold" textAnchor="middle">Ag-Sn Alloy Powder</text>

          <path d="M 190 120 L 220 120" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrow)" />
          <text x="205" y="110" fill="#f59e0b" fontSize="10" textAnchor="middle">Mix</text>
        </g>
      ) : (
        <g>
          {/* Interlocking Gamma Phases */}
          <rect x="70" y="50" width="260" height="130" rx="12" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />

          {/* Core Unreacted Ag-Sn Gamma Particles */}
          <circle cx="130" cy="95" r="20" fill="url(#agParticle)" stroke="#0284c7" strokeWidth="2" />
          <text x="130" y="99" fill="#ffffff" fontSize="9" textAnchor="middle" fontWeight="bold">Ag3Sn (γ)</text>

          <circle cx="270" cy="125" r="22" fill="url(#agParticle)" stroke="#0284c7" strokeWidth="2" />
          <text x="270" y="129" fill="#ffffff" fontSize="9" textAnchor="middle" fontWeight="bold">Ag3Sn (γ)</text>

          {/* Gamma-1 Matrix (Ag2Hg3) Interlocking Crystals */}
          <path d="M 150,95 L 210,80 L 250,125 L 180,140 Z" fill="#475569" fillOpacity="0.7" stroke="#94a3b8" strokeWidth="2" />
          <text x="200" y="110" fill="#f8fafc" fontSize="10" textAnchor="middle" fontWeight="bold">γ1 Phase (Ag2Hg3 Matrix)</text>

          {/* Gamma-2 Phase (Sn7Hg) */}
          <circle cx="190" cy="155" r="12" fill="#64748b" stroke="#cbd5e1" strokeWidth="1.5" />
          <text x="190" y="158" fill="#ffffff" fontSize="8" textAnchor="middle">γ2 (Sn7Hg)</text>

          <text x="200" y="198" fill="#4ade80" fontSize="11" fontWeight="bold" textAnchor="middle">
            Solidified Interlocking Amalgam Network Formed
          </text>
        </g>
      )}

      <rect x="20" y="205" width="360" height="25" rx="4" fill="#0f172a" stroke="#334155" />
      <text x="200" y="222" fill="#94a3b8" fontSize="10" textAnchor="middle">
        {isTriturated ? 'Physical solid solution created without chemical compound decomposition.' : 'Click Triturate to start high-speed mechanical amalgamation.'}
      </text>
    </svg>
  );
};

// Diagram 4: Gold Carat Purity Scale
const GoldCaratDiagram: React.FC<{ carat: number }> = ({ carat }) => {
  const goldPct = (carat / 24) * 100;
  const alloyPct = 100 - goldPct;

  return (
    <svg viewBox="0 0 400 220" className="w-full h-auto bg-slate-900 rounded-xl border border-slate-800 shadow-lg">
      <text x="200" y="22" fill="#f8fafc" fontSize="12" fontWeight="bold" textAnchor="middle">
        Gold Carat Purity & Structural Hardness Balance
      </text>

      {/* Carat Arc / Bar Gauge */}
      <rect x="40" y="55" width="320" height="30" rx="15" fill="#1e293b" stroke="#334155" strokeWidth="2" />
      <rect x="40" y="55" width={(goldPct / 100) * 320} height="30" rx="15" fill="url(#goldGrad)" />

      <defs>
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#eab308" />
          <stop offset="100%" stopColor="#facc15" />
        </linearGradient>
      </defs>

      {/* Carat Markers */}
      <text x="40" y="102" fill="#94a3b8" fontSize="9" textAnchor="middle">0K (0%)</text>
      <text x="200" y="102" fill="#eab308" fontSize="10" fontWeight="bold" textAnchor="middle">18K (75%)</text>
      <text x="293" y="102" fill="#eab308" fontSize="10" fontWeight="bold" textAnchor="middle">22K (91.7%)</text>
      <text x="360" y="102" fill="#facc15" fontSize="10" fontWeight="bold" textAnchor="middle">24K (100%)</text>

      {/* Hardness vs Malleability Profile */}
      <g transform="translate(40, 120)">
        <rect x="0" y="0" width="150" height="60" rx="8" fill="#0f172a" stroke="#eab308" strokeWidth="1" />
        <text x="75" y="20" fill="#facc15" fontSize="10" fontWeight="bold" textAnchor="middle">Gold Content</text>
        <text x="75" y="42" fill="#ffffff" fontSize="16" fontWeight="bold" textAnchor="middle">{goldPct.toFixed(1)}%</text>

        <rect x="170" y="0" width="150" height="60" rx="8" fill="#0f172a" stroke="#38bdf8" strokeWidth="1" />
        <text x="245" y="20" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">Alloying Metal (Cu/Ag)</text>
        <text x="245" y="42" fill="#ffffff" fontSize="16" fontWeight="bold" textAnchor="middle">{alloyPct.toFixed(1)}%</text>
      </g>

      <text x="200" y="205" fill="#cbd5e1" fontSize="10" textAnchor="middle">
        {carat === 24 ? '24K: 100% Pure Gold. Extremely soft, easily bent/scratched (Unsuitable for rings).' : `${carat}K Gold: Alloyed with Cu/Ag for Vickers hardness & durability.`}
      </text>
    </svg>
  );
};


// ==========================================
// MAIN COMPONENT CLASS
// ==========================================
export default function C10_ChemistryAlloysandamalgamsSim({
  initialNodeId = 'c10_chem_051',
  onComplete,
  devMode = false
}: {
  initialNodeId?: string;
  onComplete?: (score: number) => void;
  devMode?: boolean;
}) {
  // Navigation & Tab State
  const [activeTab, setActiveTab] = useState<'discovery' | 'lab' | 'challenges' | 'misconceptions' | 'summary'>('discovery');
  const [activeExplorationIndex, setActiveExplorationIndex] = useState<number>(0);

  // Audio / Speech Toggles
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [speechEnabled, setSpeechEnabled] = useState<boolean>(true);

  // BKT Mastery & SRS Tracking
  const [bktStates, setBktStates] = useState<Record<NodeId, BKTState>>(() => {
    const initial: Record<string, BKTState> = {};
    ALL_NODE_IDS.forEach(id => {
      initial[id] = createBKTState(id);
    });
    return initial as Record<NodeId, BKTState>;
  });

  const [srsItems, setSrsItems] = useState<Record<string, SRSItem>>(() => {
    const initial: Record<string, SRSItem> = {};
    CHALLENGES.forEach(c => {
      initial[c.id] = createReviewItem(c.id);
    });
    return initial;
  });

  // Discovery Question State
  const [discoverySelected, setDiscoverySelected] = useState<number | null>(null);
  const [discoverySubmitted, setDiscoverySubmitted] = useState<boolean>(false);

  // Interactive Lab State Variables
  const [latticeMode, setLatticeMode] = useState<'pure' | 'substitutional' | 'interstitial'>('substitutional');
  const [latticeShear, setLatticeShear] = useState<boolean>(false);

  const [leadRatio, setLeadRatio] = useState<number>(37); // 37% Pb / 63% Sn = Eutectic
  const [crucibleTemp, setCrucibleTemp] = useState<number>(150);

  const [brassZincPct, setBrassZincPct] = useState<number>(30);
  const [acidCorrosionTest, setAcidCorrosionTest] = useState<boolean>(false);
  const [corrosionTime, setCorrosionTime] = useState<number>(0);

  const [mercuryPct, setMercuryPct] = useState<number>(50);
  const [isTriturated, setIsTriturated] = useState<boolean>(false);

  const [goldCarat, setGoldCarat] = useState<number>(18);

  // Predictions & Observations States
  const [predictionAnswers, setPredictionAnswers] = useState<Record<number, number>>({});
  const [observationAnswers, setObservationAnswers] = useState<Record<number, number>>({});

  // Challenge Engine State
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [numericInput, setNumericInput] = useState<string>('');
  const [classificationAnswers, setClassificationAnswers] = useState<Record<number, number>>({});
  const [dragSortedItems, setDragSortedItems] = useState<string[]>([]);

  const [challengeFeedback, setChallengeFeedback] = useState<{
    submitted: boolean;
    isCorrect: boolean;
    explanation: string;
  } | null>(null);

  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);

  // FX & Hints
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHintIndex, setCurrentHintIndex] = useState<number>(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Sound helper wrapper
  const playFx = useCallback((sound: SoundEffect) => {
    if (soundEnabled) {
      audioManager.play(sound);
    }
  }, [soundEnabled]);

  const speakText = useCallback((text: string) => {
    if (speechEnabled) {
      speechManager.speak(text);
    }
  }, [speechEnabled]);

  // Current active challenge
  const currentChallenge = CHALLENGES[currentChallengeIndex];

  // Initialize drag sort items when challenge changes
  useEffect(() => {
    if (currentChallenge && currentChallenge.type === 'drag-sort' && currentChallenge.itemsToSort) {
      // Shuffle slightly for initial state
      setDragSortedItems([...currentChallenge.itemsToSort].sort(() => Math.random() - 0.5));
    } else {
      setDragSortedItems([]);
    }
    setSelectedOption(null);
    setNumericInput('');
    setClassificationAnswers({});
    setChallengeFeedback(null);
    setShowHint(false);
    setCurrentHintIndex(0);
  }, [currentChallengeIndex, currentChallenge]);

  // Inactivity Hint Timer (10s)
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (activeTab === 'challenges' && !challengeFeedback?.submitted) {
      timerRef.current = setTimeout(() => {
        setShowHint(true);
        playFx('hint');
      }, 10000);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [activeTab, currentChallengeIndex, challengeFeedback, playFx]);

  // Handle Discovery Question Submit
  const handleDiscoverySubmit = (index: number) => {
    setDiscoverySelected(index);
    setDiscoverySubmitted(true);
    const isCorrect = index === DISCOVERY_QUESTION.correctIndex;
    if (isCorrect) {
      playFx('success');
      speakText('Correct discovery! Alloying disrupts spatial crystal symmetry, lowering cohesive energy!');
    } else {
      playFx('error');
      speakText('Not quite. Review the hint on atomic crystal disruption!');
    }
  };

  // Challenge Option Submit
  const handleSubmitChallenge = () => {
    if (!currentChallenge) return;

    let isCorrect = false;

    if (currentChallenge.type === 'mcq') {
      if (selectedOption === null) return;
      isCorrect = selectedOption === currentChallenge.correctIndex;
    } else if (currentChallenge.type === 'numeric') {
      const val = parseFloat(numericInput);
      if (isNaN(val)) return;
      const target = currentChallenge.correctAnswer ?? 0;
      const tol = currentChallenge.tolerance ?? 0.1;
      isCorrect = Math.abs(val - target) <= tol;
    } else if (currentChallenge.type === 'classification') {
      if (!currentChallenge.itemsToClassify) return;
      isCorrect = currentChallenge.itemsToClassify.every(
        (item, idx) => classificationAnswers[idx] === item.categoryIndex
      );
    } else if (currentChallenge.type === 'drag-sort') {
      if (!currentChallenge.itemsToSort) return;
      isCorrect = dragSortedItems.every(
        (item, idx) => item === currentChallenge.itemsToSort![idx]
      );
    }

    // BKT & SRS update
    const nodeId = currentChallenge.nodeId;
    const oldBkt = bktStates[nodeId] || createBKTState(nodeId);
    const updatedBkt = bktUpdate(oldBkt, isCorrect);
    setBktStates(prev => ({ ...prev, [nodeId]: updatedBkt }));

    const oldSrs = srsItems[currentChallenge.id] || createReviewItem(currentChallenge.id);
    const updatedSrs = sm2Update(oldSrs, isCorrect ? 5 : 1);
    setSrsItems(prev => ({ ...prev, [currentChallenge.id]: updatedSrs }));

    if (isCorrect) {
      playFx('sparkle');
      setShowSparkle(true);
      setTimeout(() => setShowSparkle(false), 1200);
      setScore(prev => prev + 10);
      setStreak(prev => prev + 1);
      if (streak + 1 >= 3) {
        setShowConfetti(true);
        playFx('celebration');
        setTimeout(() => setShowConfetti(false), 2500);
      }
      speakText('Excellent answer! Correct.');
    } else {
      playFx('error');
      setStreak(0);
      speakText('Incorrect. Read the explanation below.');
    }

    setChallengeFeedback({
      submitted: true,
      isCorrect,
      explanation: currentChallenge.explanation
    });
  };

  const handleNextChallenge = () => {
    if (currentChallengeIndex < CHALLENGES.length - 1) {
      setCurrentChallengeIndex(prev => prev + 1);
      playFx('whoosh');
    } else {
      // Completed all challenges
      recordGameScore('c10_chem_alloys', score + 20);
      setShowSuccessBanner(true);
      playFx('celebration');
      speakText('Congratulations! You have mastered Alloys and Amalgams!');
      if (onComplete) {
        onComplete(score + 20);
      }
    }
  };

  // Overall Mastery Calculation
  const averageMastery = useMemo(() => {
    const vals = ALL_NODE_IDS.map(id => masteryProb(bktStates[id]));
    const sum = vals.reduce((a, b) => a + b, 0);
    return Math.round((sum / vals.length) * 100);
  }, [bktStates]);

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 font-sans p-2 sm:p-4 md:p-6 select-none">
      {/* HEADER BAR */}
      <header className="max-w-7xl mx-auto bg-slate-900/90 backdrop-blur border border-slate-800 rounded-2xl p-4 mb-6 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-amber-500 to-amber-700 rounded-xl shadow-lg">
            <Atom className="w-8 h-8 text-slate-950 animate-spin" style={{ animationDuration: '12s' }} />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold bg-gradient-to-r from-amber-400 via-amber-200 to-yellow-500 bg-clip-text text-transparent">
              ICSE Class 10 Chemistry: Alloys & Amalgams
            </h1>
            <p className="text-xs text-slate-400">Class 10 Chemistry • ICSE Curriculum • Interactive Simulator</p>
          </div>
        </div>

        {/* Global Controls & Score Stats */}
        <div className="flex items-center gap-4 flex-wrap justify-end">
          <div className="bg-slate-800/80 px-4 py-2 rounded-xl border border-slate-700 flex items-center gap-3">
            <div className="flex items-center gap-1 text-amber-400 font-bold text-sm">
              <Award className="w-4 h-4" /> Score: {score}
            </div>
            <div className="w-px h-4 bg-slate-700" />
            <div className="flex items-center gap-1 text-emerald-400 font-bold text-sm">
              <TrendingUp className="w-4 h-4" /> Mastery: {averageMastery}%
            </div>
            <div className="w-px h-4 bg-slate-700" />
            <div className="flex items-center gap-1 text-orange-400 font-bold text-sm">
              <Flame className="w-4 h-4" /> Streak: {streak}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-slate-300 transition-colors"
              title="Toggle Sound FX"
            >
              {soundEnabled ? <Volume2 className="w-5 h-5 text-amber-400" /> : <VolumeX className="w-5 h-5 text-slate-500" />}
            </button>
            <button
              onClick={() => setSpeechEnabled(!speechEnabled)}
              className="p-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-slate-300 transition-colors"
              title="Toggle Voice Readout"
            >
              <BookOpen className={`w-5 h-5 ${speechEnabled ? 'text-emerald-400' : 'text-slate-500'}`} />
            </button>
          </div>
        </div>
      </header>

      {/* NAVIGATION TABS */}
      <nav className="max-w-7xl mx-auto mb-6 flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {[
          { id: 'discovery', label: '1. Discovery Portal', icon: Compass },
          { id: 'lab', label: '2. Interactive Lab', icon: Beaker },
          { id: 'challenges', label: '3. Challenge Suite (23)', icon: Award },
          { id: 'misconceptions', label: '4. Common Misconceptions', icon: AlertTriangle },
          { id: 'summary', label: '5. Summary & Real-World', icon: Layers }
        ].map(tab => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                playFx('tap');
              }}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all whitespace-nowrap ${
                active
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-lg shadow-amber-500/20 font-bold'
                  : 'bg-slate-900/80 hover:bg-slate-800 text-slate-400 border border-slate-800'
              }`}
            >
              <Icon className={`w-4 h-4 ${active ? 'text-slate-950' : 'text-slate-400'}`} />
              {tab.label}
            </button>
          );
        })}
      </nav>

      {/* MAIN CONTENT AREA */}
      <main className="max-w-7xl mx-auto">
        {/* TAB 1: DISCOVERY PORTAL */}
        {activeTab === 'discovery' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
              <h2 className="text-2xl font-bold text-amber-400 mb-3 flex items-center gap-2">
                <Compass className="w-6 h-6 text-amber-400" /> Scenario Context
              </h2>
              <p className="text-slate-300 text-lg leading-relaxed mb-4">{SCENARIO.intro}</p>
              <p className="text-slate-400 text-base leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
                {SCENARIO.context}
              </p>
            </div>

            {/* Counterintuitive Discovery Question */}
            <div className="bg-slate-900 border border-amber-500/30 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="w-6 h-6 text-amber-400 animate-pulse" />
                <h3 className="text-xl font-bold text-slate-100">Discovery Hypothesis Challenge</h3>
              </div>
              <p className="text-slate-200 text-lg font-medium mb-6">{DISCOVERY_QUESTION.question}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {DISCOVERY_QUESTION.options.map((option, idx) => {
                  const isSelected = discoverySelected === idx;
                  const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
                  let btnStyle = "bg-slate-800/80 hover:bg-slate-750 text-slate-200 border-slate-700";
                  if (discoverySubmitted) {
                    if (isCorrect) btnStyle = "bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold";
                    else if (isSelected) btnStyle = "bg-rose-950/80 border-rose-500 text-rose-200";
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleDiscoverySubmit(idx)}
                      disabled={discoverySubmitted}
                      className={`p-4 rounded-xl border text-left transition-all text-sm leading-relaxed flex items-start gap-3 ${btnStyle}`}
                    >
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-xs font-bold text-amber-400">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{option}</span>
                    </button>
                  );
                })}
              </div>

              {discoverySubmitted && (
                <div className="bg-amber-950/40 border border-amber-500/40 rounded-xl p-4 text-amber-200 text-sm flex items-start gap-3">
                  <Info className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold mb-1">Metallurgical Insight:</p>
                    <p>{DISCOVERY_QUESTION.hintAfter}</p>
                  </div>
                </div>
              )}
            </div>

            {/* PREDICTION QUESTIONS PREVIEW */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h3 className="text-xl font-bold text-slate-100 mb-4 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-amber-400" /> Interactive Predictions
              </h3>
              <div className="space-y-6">
                {PREDICTION_QUESTIONS.map((pred, pIdx) => (
                  <div key={pIdx} className="bg-slate-950 p-5 rounded-xl border border-slate-800">
                    <p className="font-semibold text-slate-200 mb-3">{pred.question}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                      {pred.options.map((opt, oIdx) => {
                        const sel = predictionAnswers[pIdx] === oIdx;
                        return (
                          <button
                            key={oIdx}
                            onClick={() => {
                              setPredictionAnswers(prev => ({ ...prev, [pIdx]: oIdx }));
                              playFx('pop');
                            }}
                            className={`p-3 rounded-lg border text-xs text-left transition-colors ${
                              sel
                                ? 'bg-amber-500/20 border-amber-500 text-amber-200 font-bold'
                                : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                    <p className="text-xs text-amber-400/80 italic">💡 {pred.verifyInstruction}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: INTERACTIVE LABS */}
        {activeTab === 'lab' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Exploration Selector */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl flex gap-2 overflow-x-auto scrollbar-none">
              {EXPLORATION_STEPS.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveExplorationIndex(idx);
                    playFx('tap');
                  }}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                    activeExplorationIndex === idx
                      ? 'bg-amber-500 border-amber-400 text-slate-950 shadow-md'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {step.title}
                </button>
              ))}
            </div>

            {/* Instruction Card */}
            <div className="bg-slate-900 border border-amber-500/20 rounded-2xl p-5 shadow-xl flex items-center gap-4">
              <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/30">
                <Microscope className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h3 className="font-bold text-amber-400 text-sm">
                  {EXPLORATION_STEPS[activeExplorationIndex].title}
                </h3>
                <p className="text-slate-300 text-sm">
                  {EXPLORATION_STEPS[activeExplorationIndex].instruction}
                </p>
              </div>
            </div>

            {/* ACTIVE LAB INTERACTIVE MODULES */}
            {activeExplorationIndex === 0 && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                  <LatticeDiagram mode={latticeMode} shearing={latticeShear} />
                  <div className="flex flex-wrap gap-3 justify-center">
                    <button
                      onClick={() => setLatticeMode('pure')}
                      className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                        latticeMode === 'pure' ? 'bg-amber-500 text-slate-950 border-amber-400' : 'bg-slate-800 text-slate-300 border-slate-700'
                      }`}
                    >
                      Pure Metal Lattice
                    </button>
                    <button
                      onClick={() => setLatticeMode('substitutional')}
                      className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                        latticeMode === 'substitutional' ? 'bg-amber-500 text-slate-950 border-amber-400' : 'bg-slate-800 text-slate-300 border-slate-700'
                      }`}
                    >
                      Substitutional Alloy (Brass)
                    </button>
                    <button
                      onClick={() => setLatticeMode('interstitial')}
                      className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                        latticeMode === 'interstitial' ? 'bg-amber-500 text-slate-950 border-amber-400' : 'bg-slate-800 text-slate-300 border-slate-700'
                      }`}
                    >
                      Interstitial Alloy (Steel)
                    </button>
                  </div>
                </div>

                <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-amber-400 text-sm mb-2">Lattice Stress Controls</h4>
                    <p className="text-xs text-slate-400 mb-4">
                      Apply shearing force to simulate dislocation layer movement under physical load.
                    </p>
                    <button
                      onClick={() => {
                        setLatticeShear(!latticeShear);
                        playFx(latticeShear ? 'whoosh' : 'pop');
                      }}
                      className="w-full py-3 bg-gradient-to-r from-sky-500 to-blue-600 font-bold text-slate-950 rounded-xl shadow-lg hover:from-sky-400 hover:to-blue-500 transition-all text-xs"
                    >
                      {latticeShear ? 'RELEASE SHEAR STRESS' : 'APPLY MECHANICAL LOAD'}
                    </button>
                  </div>

                  <div className="space-y-2 text-xs bg-slate-900 p-4 rounded-lg border border-slate-800">
                    <div className="flex justify-between text-slate-300">
                      <span>Slippage Resistance:</span>
                      <span className="font-bold text-amber-400">
                        {latticeMode === 'pure' ? 'Low (20 MPa)' : latticeMode === 'substitutional' ? 'High (180 MPa)' : 'Very High (450 MPa)'}
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Dislocation Pinning:</span>
                      <span className="font-bold text-amber-400">
                        {latticeMode === 'pure' ? 'None' : 'Solute Mismatch'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeExplorationIndex === 1 && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                  <EutecticDiagram pbRatio={leadRatio} temperature={crucibleTemp} />
                </div>

                <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-5">
                  <h4 className="font-bold text-amber-400 text-sm">Crucible Controls</h4>

                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-2">
                      <span>Lead (Pb) Ratio:</span>
                      <span className="font-bold text-amber-400">{leadRatio}% Pb ({100 - leadRatio}% Sn)</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={leadRatio}
                      onChange={e => setLeadRatio(Number(e.target.value))}
                      className="w-full accent-amber-500"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                      <span>100% Sn</span>
                      <span>Eutectic (37% Pb)</span>
                      <span>100% Pb</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-2">
                      <span>Crucible Temperature:</span>
                      <span className="font-bold text-rose-400">{crucibleTemp}°C</span>
                    </div>
                    <input
                      type="range"
                      min="100"
                      max="350"
                      value={crucibleTemp}
                      onChange={e => setCrucibleTemp(Number(e.target.value))}
                      className="w-full accent-rose-500"
                    />
                  </div>

                  <button
                    onClick={() => {
                      setLeadRatio(37);
                      setCrucibleTemp(185);
                      playFx('chime');
                    }}
                    className="w-full py-2 bg-slate-800 hover:bg-slate-750 text-amber-400 border border-slate-700 rounded-lg text-xs font-bold"
                  >
                    Set Eutectic Composition (37% Pb / 63% Sn)
                  </button>
                </div>
              </div>
            )}

            {activeExplorationIndex === 2 && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-bold text-amber-400 text-sm">Copper Alloy Formulator (Brass vs Bronze)</h4>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-4">
                    <div>
                      <label className="text-xs text-slate-300 font-semibold mb-1 block">Zinc Content in Copper (Brass): {brassZincPct}%</label>
                      <input
                        type="range"
                        min="5"
                        max="45"
                        value={brassZincPct}
                        onChange={e => setBrassZincPct(Number(e.target.value))}
                        className="w-full accent-amber-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                        <span className="text-slate-400 block mb-1">Tensile Strength:</span>
                        <span className="text-amber-400 font-bold text-sm">{(300 + brassZincPct * 4).toFixed(0)} MPa</span>
                      </div>
                      <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                        <span className="text-slate-400 block mb-1">Acoustic Ring Index:</span>
                        <span className="text-emerald-400 font-bold text-sm">{(80 + brassZincPct * 0.5).toFixed(0)} dB</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-emerald-400 text-sm mb-2">Salt Spray Acid Corrosion Chamber</h4>
                    <p className="text-xs text-slate-400 mb-4">
                      Test oxide film stability under marine exposure.
                    </p>
                    <button
                      onClick={() => {
                        setAcidCorrosionTest(!acidCorrosionTest);
                        if (!acidCorrosionTest) {
                          setCorrosionTime(0);
                          playFx('whoosh');
                        }
                      }}
                      className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 font-bold text-slate-950 rounded-xl text-xs shadow-lg"
                    >
                      {acidCorrosionTest ? 'STOP CORROSION SPRAY' : 'ACTIVATE ACID SALT SPRAY'}
                    </button>
                  </div>

                  <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-xs text-slate-300 space-y-1 mt-4">
                    <div>Status: <span className="text-emerald-400 font-bold">{acidCorrosionTest ? 'SPRAYING SODIUM CHLORIDE ACID ATMOSPHERE' : 'IDLE'}</span></div>
                    <div>Oxide Passivation: <span className="text-amber-400 font-bold">Stable SnO2 / ZnO Shield Formed</span></div>
                  </div>
                </div>
              </div>
            )}

            {activeExplorationIndex === 3 && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <AmalgamDiagram mercuryPct={mercuryPct} isTriturated={isTriturated} />
                </div>

                <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-amber-400 text-sm">Amalgam Triturator Controls</h4>

                  <div>
                    <label className="text-xs text-slate-300 font-semibold mb-1 block">Mercury Proportion: {mercuryPct}%</label>
                    <input
                      type="range"
                      min="20"
                      max="70"
                      value={mercuryPct}
                      onChange={e => setMercuryPct(Number(e.target.value))}
                      disabled={isTriturated}
                      className="w-full accent-cyan-500"
                    />
                  </div>

                  <button
                    onClick={() => {
                      setIsTriturated(!isTriturated);
                      playFx('chime');
                    }}
                    className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 font-bold text-slate-950 rounded-xl text-xs shadow-lg"
                  >
                    {isTriturated ? 'RESET POWDER MIXTURE' : 'TRITURATE (HIGH SPEED MIXING)'}
                  </button>

                  <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-lg border border-slate-800">
                    <p className="font-bold text-slate-200 mb-1">Key Observation:</p>
                    <p>No covalent chemical reaction occurs; liquid mercury dissolves silver and tin into an interlocking intermetallic crystal matrix that hardens in 5 minutes.</p>
                  </div>
                </div>
              </div>
            )}

            {activeExplorationIndex === 4 && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <GoldCaratDiagram carat={goldCarat} />
                </div>

                <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-amber-400 text-sm">Carat Purity Selector</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {[24, 22, 18, 14, 10].map(c => (
                      <button
                        key={c}
                        onClick={() => {
                          setGoldCarat(c);
                          playFx('pop');
                        }}
                        className={`p-2.5 rounded-lg text-xs font-bold border transition-all ${
                          goldCarat === c
                            ? 'bg-amber-500 text-slate-950 border-amber-400'
                            : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
                        }`}
                      >
                        {c} Carat ({((c / 24) * 100).toFixed(0)}%)
                      </button>
                    ))}
                  </div>

                  <div className="text-xs bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-1">
                    <div className="text-slate-400">Vickers Hardness: <span className="text-amber-400 font-bold">{goldCarat === 24 ? '25 HV (Very Soft)' : goldCarat === 22 ? '80 HV (Durable)' : '140 HV (High Hardness)'}</span></div>
                    <div className="text-slate-400">Recommended Use: <span className="text-emerald-400 font-bold">{goldCarat === 24 ? 'Bullion Bars / Investment' : 'Fine Daily Jewellery'}</span></div>
                  </div>
                </div>
              </div>
            )}

            {/* OBSERVATION QUESTIONS */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h3 className="text-xl font-bold text-slate-100 mb-4 flex items-center gap-2">
                <Eye className="w-5 h-5 text-amber-400" /> Lab Observation Checkpoint
              </h3>
              <div className="space-y-6">
                {OBSERVATION_QUESTIONS.map((obs, oIdx) => (
                  <div key={oIdx} className="bg-slate-950 p-5 rounded-xl border border-slate-800">
                    <p className="font-semibold text-slate-200 mb-3">{obs.question}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {obs.observableOptions.map((opt, optIdx) => {
                        const sel = observationAnswers[oIdx] === optIdx;
                        const isCorrect = optIdx === obs.correctIndex;
                        return (
                          <button
                            key={optIdx}
                            onClick={() => {
                              setObservationAnswers(prev => ({ ...prev, [oIdx]: optIdx }));
                              playFx('tap');
                            }}
                            className={`p-3 rounded-lg border text-xs text-left transition-colors ${
                              sel
                                ? isCorrect
                                  ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold'
                                  : 'bg-rose-950/80 border-rose-500 text-rose-200'
                                : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CHALLENGES */}
        {activeTab === 'challenges' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Challenge Header Status */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs text-amber-400 font-bold uppercase tracking-wider mb-1">
                  <span>Challenge {currentChallengeIndex + 1} of {CHALLENGES.length}</span>
                  <span>•</span>
                  <span className="capitalize">{currentChallenge.difficulty} Tier</span>
                  <span>•</span>
                  <span>{currentChallenge.competencyLevel}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-100">
                  Concept Node: <span className="text-amber-400 font-mono">{currentChallenge.nodeId}</span>
                </h3>
              </div>

              {/* Step Dots */}
              <div className="flex gap-1 max-w-full overflow-x-auto pb-1 scrollbar-none">
                {CHALLENGES.map((ch, idx) => (
                  <div
                    key={ch.id}
                    className={`w-3 h-3 rounded-full flex-shrink-0 transition-all ${
                      idx === currentChallengeIndex
                        ? 'bg-amber-400 ring-2 ring-amber-400/50 scale-125'
                        : idx < currentChallengeIndex
                        ? 'bg-emerald-500'
                        : 'bg-slate-800'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Challenge Main Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative">
              <p className="text-slate-100 text-lg font-medium leading-relaxed mb-6">
                {currentChallenge.question}
              </p>

              {/* MCQ QUESTION TYPE */}
              {currentChallenge.type === 'mcq' && currentChallenge.options && (
                <div className="grid grid-cols-1 gap-3 mb-6">
                  {currentChallenge.options.map((opt, idx) => {
                    const isSelected = selectedOption === idx;
                    let btnStyle = "bg-slate-950 hover:bg-slate-800 text-slate-200 border-slate-800";
                    if (challengeFeedback?.submitted) {
                      if (idx === currentChallenge.correctIndex) {
                        btnStyle = "bg-emerald-950/90 border-emerald-500 text-emerald-200 font-bold";
                      } else if (isSelected) {
                        btnStyle = "bg-rose-950/90 border-rose-500 text-rose-200";
                      }
                    } else if (isSelected) {
                      btnStyle = "bg-amber-500/20 border-amber-500 text-amber-200 font-bold";
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => {
                          if (!challengeFeedback?.submitted) {
                            setSelectedOption(idx);
                            playFx('tap');
                          }
                        }}
                        disabled={challengeFeedback?.submitted}
                        className={`p-4 rounded-xl border text-left text-sm transition-all flex items-start gap-3 ${btnStyle}`}
                      >
                        <span className="w-6 h-6 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-xs font-bold text-amber-400 flex-shrink-0">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{opt}</span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* NUMERIC QUESTION TYPE */}
              {currentChallenge.type === 'numeric' && (
                <div className="mb-6 space-y-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      step="any"
                      placeholder="Enter numerical answer..."
                      value={numericInput}
                      onChange={e => setNumericInput(e.target.value)}
                      disabled={challengeFeedback?.submitted}
                      className="bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 text-base focus:border-amber-500 focus:outline-none w-64"
                    />
                    <span className="text-slate-400 font-semibold text-sm">{currentChallenge.unit}</span>
                  </div>
                </div>
              )}

              {/* CLASSIFICATION TYPE */}
              {currentChallenge.type === 'classification' && currentChallenge.itemsToClassify && (
                <div className="space-y-4 mb-6">
                  {currentChallenge.itemsToClassify.map((itemObj, iIdx) => (
                    <div key={iIdx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
                      <span className="text-sm font-semibold text-slate-200">{itemObj.item}</span>
                      <div className="flex gap-2">
                        {currentChallenge.categories?.map((cat, cIdx) => (
                          <button
                            key={cIdx}
                            onClick={() => {
                              if (!challengeFeedback?.submitted) {
                                setClassificationAnswers(prev => ({ ...prev, [iIdx]: cIdx }));
                                playFx('pop');
                              }
                            }}
                            disabled={challengeFeedback?.submitted}
                            className={`px-3 py-2 rounded-lg text-xs font-bold border transition-all ${
                              classificationAnswers[iIdx] === cIdx
                                ? 'bg-amber-500 text-slate-950 border-amber-400'
                                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
                            }`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* DRAG SORT TYPE */}
              {currentChallenge.type === 'drag-sort' && (
                <div className="space-y-3 mb-6">
                  <p className="text-xs text-amber-400 mb-2">Click items in order or adjust ranking:</p>
                  {dragSortedItems.map((item, idx) => (
                    <div key={idx} className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
                      <span className="text-sm font-semibold text-slate-200">{idx + 1}. {item}</span>
                      <div className="flex gap-1">
                        <button
                          onClick={() => {
                            if (idx > 0 && !challengeFeedback?.submitted) {
                              const newArr = [...dragSortedItems];
                              [newArr[idx - 1], newArr[idx]] = [newArr[idx], newArr[idx - 1]];
                              setDragSortedItems(newArr);
                              playFx('swoop');
                            }
                          }}
                          disabled={idx === 0 || challengeFeedback?.submitted}
                          className="px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded text-xs text-slate-300 disabled:opacity-30"
                        >
                          ▲
                        </button>
                        <button
                          onClick={() => {
                            if (idx < dragSortedItems.length - 1 && !challengeFeedback?.submitted) {
                              const newArr = [...dragSortedItems];
                              [newArr[idx], newArr[idx + 1]] = [newArr[idx + 1], newArr[idx]];
                              setDragSortedItems(newArr);
                              playFx('swoop');
                            }
                          }}
                          disabled={idx === dragSortedItems.length - 1 || challengeFeedback?.submitted}
                          className="px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded text-xs text-slate-300 disabled:opacity-30"
                        >
                          ▼
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* SUBMIT BUTTON */}
              {!challengeFeedback?.submitted ? (
                <button
                  onClick={handleSubmitChallenge}
                  className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-xl text-base shadow-xl transition-all"
                >
                  Submit Challenge Answer
                </button>
              ) : (
                <div className="space-y-4 animate-fadeIn">
                  <div className={`p-4 rounded-xl border flex items-start gap-3 ${
                    challengeFeedback.isCorrect ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200' : 'bg-rose-950/80 border-rose-500 text-rose-200'
                  }`}>
                    {challengeFeedback.isCorrect ? <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" /> : <XCircle className="w-6 h-6 text-rose-400 flex-shrink-0 mt-0.5" />}
                    <div>
                      <p className="font-bold mb-1">{challengeFeedback.isCorrect ? 'Correct Answer!' : 'Incorrect Solution'}</p>
                      <p className="text-sm leading-relaxed">{challengeFeedback.explanation}</p>
                    </div>
                  </div>

                  <button
                    onClick={handleNextChallenge}
                    className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold rounded-xl text-base shadow-xl transition-all flex items-center justify-center gap-2"
                  >
                    <span>Next Challenge</span>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: MISCONCEPTIONS */}
        {activeTab === 'misconceptions' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h2 className="text-2xl font-bold text-amber-400 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-amber-400" /> Key Misconceptions Clarified
              </h2>
              <p className="text-slate-400 text-sm mb-6">
                Common errors made by students regarding alloys, amalgams, composition, and crystal structures.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {MISCONCEPTIONS.map(m => (
                  <div key={m.id} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                    <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                      <XCircle className="w-5 h-5" /> Misconception
                    </div>
                    <p className="text-slate-200 text-sm font-semibold">{m.misconception}</p>

                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm pt-2 border-t border-slate-800">
                      <CheckCircle2 className="w-5 h-5" /> Scientifically Correct Fact
                    </div>
                    <p className="text-slate-300 text-xs leading-relaxed">{m.correction}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: SUMMARY & REAL WORLD */}
        {activeTab === 'summary' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Real World Activity */}
            <div className="bg-slate-900 border border-amber-500/30 rounded-2xl p-6 shadow-xl">
              <h2 className="text-2xl font-bold text-amber-400 mb-2 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-amber-400" /> {REAL_WORLD_ACTIVITY.title}
              </h2>
              <p className="text-slate-300 text-sm mb-6">{REAL_WORLD_ACTIVITY.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                  <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center flex-shrink-0">
                      {idx + 1}
                    </div>
                    <p className="text-slate-300 text-xs leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Node Mastery Grid */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h3 className="text-xl font-bold text-slate-100 mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" /> Topic Mastery Matrix
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
                {ALL_NODE_IDS.map(nodeId => {
                  const m = Math.round(masteryProb(bktStates[nodeId]) * 100);
                  return (
                    <div key={nodeId} className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
                      <p className="text-[10px] text-slate-400 font-mono mb-1">{nodeId}</p>
                      <div className="text-lg font-bold text-amber-400">{m}%</div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                        <div className="bg-amber-500 h-full transition-all duration-500" style={{ width: `${m}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* FEEDBACK OVERLAYS */}
      <HintBubble show={showHint} text={currentChallenge?.hints[currentHintIndex] || 'Reflect on atomic packing and layer slipping!'} />
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccessBanner} text="Simulation & Challenge Mastered!" />
      <SparkleBurst show={showSparkle} x={400} y={300} />
    </div>
  );
}