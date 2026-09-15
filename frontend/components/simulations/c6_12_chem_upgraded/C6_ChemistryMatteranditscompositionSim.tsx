'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import type { SoundEffect } from '../../../lib/sim-engine/types';
import { createReviewItem, sm2Update, ReviewItem } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, BKTState, masteryProb } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ==========================================
// 1. NODE IDS & METADATA
// ==========================================

const ALL_NODE_IDS = [
  'c6_chem_001',
  'c6_chem_002',
  'c6_chem_003',
  'c6_chem_004',
  'c6_chem_005',
  'c6_chem_006',
  'c6_chem_007',
  'c6_chem_008',
] as const;

type NodeId = typeof ALL_NODE_IDS[number];

interface NodeMetadata {
  id: NodeId;
  title: string;
  definition: string;
  eli5: string;
}

const NODE_ENRICHMENT: Record<NodeId, NodeMetadata> = {
  c6_chem_001: {
    id: 'c6_chem_001',
    title: 'Definition of Matter',
    definition: 'Matter is anything that occupies space, has mass, and can be perceived by our senses.',
    eli5: 'Everything around you that you can touch, weigh, or put in a container is matter—from rocks to water to air!',
  },
  c6_chem_002: {
    id: 'c6_chem_002',
    title: 'Characteristics of Matter',
    definition: 'Matter is made up of extremely tiny particles that possess mass, occupy volume, and have spaces between them.',
    eli5: 'Matter has two main superpowers: it takes up room (volume) and it has weight (mass). It is built of tiny moving dots!',
  },
  c6_chem_003: {
    id: 'c6_chem_003',
    title: 'States of Matter',
    definition: 'Matter exists in three primary physical states—Solid, Liquid, and Gas—distinguished by shape, volume, and compressibility.',
    eli5: 'Solids hold their shape, liquids flow to fill the bottom of a glass, and gases expand to fill every corner of a balloon!',
  },
  c6_chem_004: {
    id: 'c6_chem_004',
    title: 'Intermolecular Space & Attraction',
    definition: 'The space between molecules is called intermolecular space, and the attractive force holding them together is intermolecular force of attraction.',
    eli5: 'Think of particles like kids playing: solids hold hands tightly (strong force, tiny space), liquids hold thumbs (medium), and gases run freely (weak force, big space).',
  },
  c6_chem_005: {
    id: 'c6_chem_005',
    title: 'Composition of Matter: Atoms & Molecules',
    definition: 'The fundamental building blocks of matter are atoms, which can exist independently or combine to form molecules.',
    eli5: 'Atoms are single Lego bricks. Molecules are small structures built by clicking Lego bricks together!',
  },
  c6_chem_006: {
    id: 'c6_chem_006',
    title: 'Elements, Compounds & Mixtures',
    definition: 'Elements consist of only one type of atom. Compounds contain two or more elements chemically combined in fixed ratios. Mixtures contain two or more substances physically blended.',
    eli5: 'An element is pure gold. A compound is water (hydrogen bonded with oxygen). A mixture is fruit salad—you can pick out the pieces!',
  },
  c6_chem_007: {
    id: 'c6_chem_007',
    title: 'Physical vs Chemical Changes & State Transitions',
    definition: 'Physical changes (e.g., state change) alter physical appearance without changing chemical composition. Chemical changes create new substances.',
    eli5: 'Melting ice to water is physical (still H2O!). Burning paper into ash is chemical (you made brand-new stuff!).',
  },
  c6_chem_008: {
    id: 'c6_chem_008',
    title: 'Conservation of Mass & Granular Solids vs Liquids',
    definition: 'Mass is neither created nor destroyed during physical or chemical changes. Fine granular solids remain solids despite flowing collectively.',
    eli5: 'When you dissolve salt in water, the total weight on the scale stays identical! Sand flows like liquid, but each grain is a tiny hard solid.',
  },
};

// ==========================================
// 2. MANDATORY DATA STRUCTURES
// ==========================================

const SCENARIO = {
  title: 'The Royal CISCE Molecular & Matter Investigation Lab',
  intro: 'Welcome, Junior Chemist! You have been appointed Lead Researcher at the CISCE Matter Investigation Facility. Your mission is to explore the invisible world of particles, test the laws of mass, and crack the mystery of physical vs chemical changes.',
  context: 'You will interact with high-tech lab equipment: particle accelerators, mass balance scales, dissolution chambers, and thermal phase burners. Prepare to discover how matter behaves at the microscopic level!',
};

const DISCOVERY_QUESTION = {
  question: 'If you inflate a deflated latex balloon with invisible air gas, what will happen to the mass measured on an ultra-precise digital scale?',
  options: [
    'The mass stays exactly the same because air has zero mass.',
    'The balloon becomes lighter because air floats upwards.',
    'The inflated balloon becomes heavier because air possesses mass.',
    'The balloon becomes weightless due to air pressure counteracting gravity.',
  ],
  correctIndex: 2,
  hintAfter: 'Even though air is invisible and floats around us, air molecules have actual mass! Adding billions of gas molecules increases total mass.',
};

const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Kinetic Molecular Dynamics Simulator',
    instruction: 'Adjust the thermal slider to warm up particles. Observe how heat alters particle spacing (intermolecular space) and speed.',
    interactionType: 'particle-dynamics',
    nodeId: 'c6_chem_004' as NodeId,
  },
  {
    title: 'Lab 2: Gas Mass & Density Lever Balance',
    instruction: 'Place a deflated balloon on one side of the digital scale and an inflated balloon on the other to test if gases have weight.',
    interactionType: 'gas-mass-balance',
    nodeId: 'c6_chem_002' as NodeId,
  },
  {
    title: 'Lab 3: Dissolution & Mass Conservation Chamber',
    instruction: 'Add 15g of sugar into 100g of pure water. Measure the total mass on the digital scale before and after dissolution.',
    interactionType: 'mass-conservation',
    nodeId: 'c6_chem_008' as NodeId,
  },
  {
    title: 'Lab 4: Atomic Synthesizer: Elements, Compounds & Mixtures',
    instruction: 'Assemble pure Hydrogen (element), Water H₂O (compound), and Air/Salt Water (mixture) to observe how atoms bind or mix.',
    interactionType: 'element-compound-mixture',
    nodeId: 'c6_chem_006' as NodeId,
  },
  {
    title: 'Lab 5: Thermal Phase Interconversion Chamber',
    instruction: 'Heat ice at -10°C up to steam at 110°C. Track the plateau phase changes on the temperature vs kinetic energy graph.',
    interactionType: 'phase-transition',
    nodeId: 'c6_chem_007' as NodeId,
  },
];

const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: When fine granulated table salt is poured into a cylinder, it takes the shape of the container. Does this make salt a liquid?',
    options: [
      'Yes, because anything that flows and takes container shape is a liquid.',
      'No, because each individual salt granule keeps its fixed shape and volume.',
      'Yes, because salt particles dissolve into liquid form when poured.',
      'No, but salt turns into a gas when poured quickly.',
    ],
    correctIndex: 1,
    verifyInstruction: 'Test granular flow vs single-particle behavior in Lab 2 to verify!',
    nodeId: 'c6_chem_003' as NodeId,
  },
  {
    question: 'Predict: When 20g of salt is dissolved completely in 100g of water in a sealed flask, what will the final total mass be?',
    options: [
      '100g, because dissolved salt disappears into zero mass.',
      '120g, because mass is conserved during physical dissolution.',
      '80g, because salt breaks down into energy.',
      '140g, because water molecules expand when salt is added.',
    ],
    correctIndex: 1,
    verifyInstruction: 'Use the Mass Conservation Scale in Lab 3 to test your prediction!',
    nodeId: 'c6_chem_008' as NodeId,
  },
];

const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice about particle motion when temperature rises from Solid state to Gas state?',
    observableOptions: [
      'Particles stop moving entirely.',
      'Particles move faster, collide harder, and intermolecular space increases dramatically.',
      'Particles shrink in individual size while staying in fixed positions.',
      'Particles change chemical identity into different atoms.',
    ],
    correctIndex: 1,
    nodeId: 'c6_chem_004' as NodeId,
  },
  {
    question: 'What happens to constituent element properties when Hydrogen gas and Oxygen gas chemically react to form Water (H₂O)?',
    observableOptions: [
      'Water burns like hydrogen and supports combustion like oxygen.',
      'Original gas properties are lost; water extinguishes fire and has completely unique compound properties.',
      'Water acts as a physical mixture of two floating gases.',
      'Hydrogen atoms disappear leaving only oxygen.',
    ],
    correctIndex: 1,
    nodeId: 'c6_chem_006' as NodeId,
  },
];

const REAL_WORLD_ACTIVITY = {
  title: 'Industrial Quality Control: Testing Soda Carbonation & Salt Dissolution',
  description: 'In a beverage bottling plant, chemists must accurately control gas mass dissolution, liquid volumes, and thermal stability to prevent carbonated drinks from bursting or losing fizz.',
  steps: [
    'Step 1: Weigh a sealed 500 mL soda bottle on a precision scale. Initial Mass = 535.40 grams.',
    'Step 2: Carefully uncap the bottle to allow CO₂ gas to escape completely into the atmosphere.',
    'Step 3: Reweigh the flat soda bottle on the digital balance. Final Mass = 533.20 grams.',
    'Step 4: Calculate mass of escaped CO₂ gas: 535.40g - 533.20g = 2.20g. Conclusion: CO₂ gas has measurable mass!',
  ],
};

// ==========================================
// 3. MISCONCEPTIONS DATA
// ==========================================

interface Misconception {
  id: string;
  misconception: string;
  correction: string;
}

const MISCONCEPTIONS: Misconception[] = [
  {
    id: 'misc_001',
    misconception: 'Gases Do Not Have Any Mass or Weight',
    correction: 'Air and all gases are matter, meaning they possess mass and occupy space. An inflated balloon weighs measurably more than an empty deflated balloon.',
  },
  {
    id: 'misc_002',
    misconception: 'Fine Powders and Granules Are Liquids',
    correction: 'Granules of salt, sugar, or sand are small individual solids. Each grain maintains a fixed shape and volume. Collective pouring is just millions of tiny solids tumbling.',
  },
  {
    id: 'misc_003',
    misconception: 'Dissolved Substances Disappear and Stop Existing',
    correction: 'Dissolving is a physical change where solid particles separate and intermingle with liquid molecules. Total mass is strictly conserved.',
  },
  {
    id: 'misc_004',
    misconception: 'Compounds Retain Properties of Their Constituent Elements',
    correction: 'In a chemical compound, atoms bond chemically in fixed ratios. Constituent elements lose their original properties (e.g., explosive H₂ gas + fire-supporting O₂ gas → water H₂O which extinguishes fire!).',
  },
  {
    id: 'misc_005',
    misconception: 'Changes of State Are Chemical Changes',
    correction: 'Melting, freezing, boiling, and condensation are physical changes. The chemical molecule (H₂O) remains identical; only thermal kinetic energy and spacing change.',
  },
  {
    id: 'misc_006',
    misconception: 'Particles Expand in Size When Heated',
    correction: 'Individual atoms/molecules do NOT swell or expand. Heating increases kinetic speed and intermolecular distance, causing bulk expansion.',
  },
];

// ==========================================
// 4. DIAGNOSTIC QUESTIONS
// ==========================================

interface DiagnosticQuestion {
  id: string;
  nodeId: NodeId;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const DIAGNOSTIC_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: 'diag_1',
    nodeId: 'c6_chem_001',
    question: 'Which of the following fulfills the scientific definition of matter?',
    options: ['Sunlight', 'Sound of a bell', 'Air in a football', 'Love and friendship'],
    correctIndex: 2,
    explanation: 'Air has mass and occupies space, making it matter. Light, sound, and emotions are forms of energy or feelings without mass/volume.',
  },
  {
    id: 'diag_2',
    nodeId: 'c6_chem_002',
    question: 'What are the two mandatory characteristics that define all matter?',
    options: ['Color and smell', 'Mass and volume (occupying space)', 'Hardness and transparency', 'Heat and electricity'],
    correctIndex: 1,
    explanation: 'All matter must possess mass and occupy volume (space).',
  },
  {
    id: 'diag_3',
    nodeId: 'c6_chem_003',
    question: 'Which state of matter has a fixed volume but NO fixed shape?',
    options: ['Solid', 'Liquid', 'Gas', 'Plasma'],
    correctIndex: 1,
    explanation: 'Liquids have a definite volume, but take the shape of whichever container holds them.',
  },
  {
    id: 'diag_4',
    nodeId: 'c6_chem_004',
    question: 'How do intermolecular forces in solids compare to those in gases?',
    options: [
      'Solids have extremely strong attractive forces; gases have negligible attractive forces.',
      'Solids have zero attractive forces; gases have maximum forces.',
      'Both have identical intermolecular forces.',
      'Gases have strong forces that pull particles into fixed positions.',
    ],
    correctIndex: 0,
    explanation: 'Solids have very strong intermolecular attraction keeping particles bound closely in rigid positions.',
  },
  {
    id: 'diag_5',
    nodeId: 'c6_chem_005',
    question: 'What is the smallest unit of an element that retains all chemical properties of that element?',
    options: ['Molecule', 'Atom', 'Electron', 'Mixture'],
    correctIndex: 1,
    explanation: 'An atom is the fundamental basic particle of an element.',
  },
  {
    id: 'diag_6',
    nodeId: 'c6_chem_006',
    question: 'Which substance is classified as a pure chemical compound?',
    options: ['Air', 'Pure Water (H₂O)', 'Tap water with dissolved minerals', 'Iron filings and sulfur mixture'],
    correctIndex: 1,
    explanation: 'Pure water (H₂O) consists of hydrogen and oxygen chemically combined in a fixed 2:1 ratio.',
  },
  {
    id: 'diag_7',
    nodeId: 'c6_chem_007',
    question: 'Why is the melting of wax considered a physical change, whereas burning wax is a chemical change?',
    options: [
      'Melting produces a new chemical substance; burning does not.',
      'Melting is reversible without forming new chemical substances; burning produces new gases and smoke.',
      'Melting releases atomic energy; burning does not.',
      'Both are chemical changes.',
    ],
    correctIndex: 1,
    explanation: 'Melting is a phase change (wax remains wax molecules). Burning breaks chemical bonds to form CO₂ and water vapor.',
  },
  {
    id: 'diag_8',
    nodeId: 'c6_chem_008',
    question: 'If 10g of ice melts inside a tightly sealed container, what happens to the total mass?',
    options: ['Mass increases to 12g', 'Mass decreases to 8g', 'Mass remains exactly 10g', 'Mass becomes zero'],
    correctIndex: 2,
    explanation: 'According to the Law of Conservation of Mass, phase change alters state but total mass stays identical.',
  },
];

// ==========================================
// 5. 22+ CHALLENGES ARRAY (3 TIERS)
// ==========================================

export interface Challenge {
  id: string;
  nodeId: NodeId;
  type: 'multiple-choice' | 'drag-sort' | 'numeric' | 'matching';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: string;
  question: string;
  options?: string[];
  correctIndex?: number;
  correctAnswer?: number | string;
  matchingPairs?: Array<{ left: string; right: string }>;
  sortingItems?: string[];
  correctOrder?: string[];
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
}

const CHALLENGES: Challenge[] = [
  // --- FOUNDATION TIER (7 Challenges) ---
  {
    id: 'c_f1',
    nodeId: 'c6_chem_001',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall & Classification',
    question: 'Which of the following items is scientifically classified as MATTER?',
    options: ['A beam of sunlight', 'A bottle of oxygen gas', 'The sound of music', 'Heat from a radiator'],
    correctIndex: 1,
    explanation: 'Oxygen gas has measurable mass and occupies volume inside the bottle. Sunlight, sound, and heat are energy forms.',
    hints: ['Matter must have mass and take up space.', 'Can you trap gas inside a container and weigh it?', 'Energy forms like heat or sound have no mass.'],
    misconceptionIndex: 0,
  },
  {
    id: 'c_f2',
    nodeId: 'c6_chem_002',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Understanding Properties',
    question: 'A student claims that gases do not count as matter because air is invisible. How should you correct this student?',
    options: ['Gases are liquid drops, not matter.', 'Air has mass and takes up volume, which can be proven by weighing an inflated balloon.', 'Gases only become matter when frozen into solids.', 'Gases are energy waves.'],
    correctIndex: 1,
    explanation: 'Air molecules have weight and volume. Pumping air into a balloon adds measurable mass on a balance scale.',
    hints: ['Think about what happens to an empty balloon when inflated.', 'Does air fill space inside a syringe?', 'Visibility is not a requirement for matter.'],
    misconceptionIndex: 0,
  },
  {
    id: 'c_f3',
    nodeId: 'c6_chem_003',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'State Identification',
    question: 'Which state of matter has a definite shape and a definite volume?',
    options: ['Liquid', 'Gas', 'Solid', 'Plasma'],
    correctIndex: 2,
    explanation: 'Solids maintain a rigid shape and fixed volume because their particles are held in fixed positions by strong intermolecular forces.',
    hints: ['Think of an ice cube or a copper block.', 'Does a brick change shape when put in a bowl?', 'Particle positions are fixed in solids.'],
  },
  {
    id: 'c_f4',
    nodeId: 'c6_chem_004',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Intermolecular Force Recall',
    question: 'In which state of matter is the intermolecular space the GREATEST?',
    options: ['Solid', 'Liquid', 'Gas', 'All states have equal space'],
    correctIndex: 2,
    explanation: 'Gases have negligible intermolecular attraction, allowing particles to spread far apart, resulting in maximum intermolecular space.',
    hints: ['Where are particles farthest apart?', 'Solids are tightly packed.', 'Gases expand to fill any room.'],
  },
  {
    id: 'c_f5',
    nodeId: 'c6_chem_005',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Atomic Building Blocks',
    question: 'What is a chemical structure composed of two or more atoms bound together called?',
    options: ['An atom', 'A molecule', 'An electron', 'A proton'],
    correctIndex: 1,
    explanation: 'A molecule is formed when two or more atoms (of the same or different elements) combine chemically.',
    hints: ['Single Lego brick = atom.', 'Connected Lego bricks = molecule.', 'Water H₂O is a classic example.'],
  },
  {
    id: 'c_f6',
    nodeId: 'c6_chem_006',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Pure vs Mixed Matter',
    question: 'Oxygen gas (O₂) consists solely of oxygen atoms. How is Oxygen gas classified?',
    options: ['Element', 'Compound', 'Heterogeneous mixture', 'Solution'],
    correctIndex: 0,
    explanation: 'An element is a pure substance made up of only one kind of atom.',
    hints: ['Does O₂ contain any other element besides Oxygen?', 'Substances made of 1 atom type are elements.', 'Compounds require different elements.'],
  },
  {
    id: 'c_f7',
    nodeId: 'c6_chem_007',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Physical Change Identification',
    question: 'Which process represents a PHYSICAL change of matter?',
    options: ['Rusting of an iron nail', 'Melting of ice into water', 'Burning a piece of wood', 'Souring of milk'],
    correctIndex: 1,
    explanation: 'Melting ice is a physical change because water molecules (H₂O) remain unchanged during the phase transition.',
    hints: ['In physical changes, no new substance is formed.', 'Ice and liquid water both have the chemical formula H₂O.', 'Rusting creates a brand-new oxide compound.'],
    misconceptionIndex: 4,
  },

  // --- STANDARD TIER (8 Challenges) ---
  {
    id: 'c_s1',
    nodeId: 'c6_chem_008',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Quantitative Mass Conservation',
    question: 'A chemist dissolves 25 grams of pure sugar in 150 grams of water inside a sealed beaker. What is the total mass of the sugar solution in grams?',
    correctAnswer: 175,
    explanation: 'Mass is conserved during dissolution: 25g + 150g = 175g. Sugar particles spread between water molecules without loss of mass.',
    hints: ['Add mass of solute to mass of solvent.', 'Does mass disappear when sugar dissolves?', '25 + 150 = ?'],
    misconceptionIndex: 2,
  },
  {
    id: 'c_s2',
    nodeId: 'c6_chem_003',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Granular Solid Analysis',
    question: 'Why is fine granulated sand classified as a SOLID even though it can be poured like water?',
    options: [
      'Sand becomes a liquid when poured.',
      'Each individual sand grain retains a fixed shape and volume.',
      'Sand grains evaporate rapidly when heated.',
      'Sand particles have zero intermolecular force.',
    ],
    correctIndex: 1,
    explanation: 'Granular substances flow due to collective movement of individual solid grains. Each grain maintains fixed solid properties.',
    hints: ['Look at a single grain of sand under a microscope.', 'Does one grain change shape in a cup?', 'Granules are micro-solids.'],
    misconceptionIndex: 1,
  },
  {
    id: 'c_s3',
    nodeId: 'c6_chem_004',
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'Intermolecular Force Ranking',
    question: 'Arrange the three states of matter in order of INCREASING intermolecular space (from smallest space to largest space):',
    sortingItems: ['Gas (Steam)', 'Solid (Ice)', 'Liquid (Water)'],
    correctOrder: ['Solid (Ice)', 'Liquid (Water)', 'Gas (Steam)'],
    explanation: 'Solids have the smallest intermolecular space, liquids have moderate space, and gases have the largest space.',
    hints: ['Which state packs particles closest together?', 'Which state allows particles to float far apart?', 'Order: Closest -> Medium -> Farthest.'],
  },
  {
    id: 'c_s4',
    nodeId: 'c6_chem_006',
    type: 'matching',
    difficulty: 'standard',
    competencyLevel: 'Substance Classification',
    question: 'Match each chemical sample to its correct category of matter:',
    matchingPairs: [
      { left: 'Gold Bar (Au)', right: 'Element' },
      { left: 'Pure Water (H₂O)', right: 'Compound' },
      { left: 'Air in Room', right: 'Mixture' },
    ],
    explanation: 'Gold contains 1 atom type (Element). Water contains bonded H and O atoms (Compound). Air contains unbonded N₂, O₂, CO₂, Ar (Mixture).',
    hints: ['1 atom type = Element.', 'Different atoms chemically combined = Compound.', 'Physical blend of different substances = Mixture.'],
  },
  {
    id: 'c_s5',
    nodeId: 'c6_chem_007',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Thermal Kinetic Behavior',
    question: 'When a liquid is heated to its boiling point, what happens to the energy and distance of its molecules?',
    options: [
      'Molecules shrink in size and stop moving.',
      'Kinetic energy increases and molecules overcome intermolecular attractions to become widely separated gas.',
      'Molecules fuse into heavier solid particles.',
      'Chemical bonds inside the molecules break to form free hydrogen atoms.',
    ],
    correctIndex: 1,
    explanation: 'Heating supplies thermal energy, increasing kinetic motion until particles break attractive intermolecular forces and transition to gas.',
    hints: ['Heat gives particles more speed (kinetic energy).', 'Fast moving particles pull away from each other.', 'Phase change is physical, not chemical bond breaking.'],
    misconceptionIndex: 5,
  },
  {
    id: 'c_s6',
    nodeId: 'c6_chem_006',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Compound Property Loss',
    question: 'Hydrogen is a combustible gas and Oxygen supports combustion. Why does Water (H₂O) extinguish fires?',
    options: [
      'Water contains extra nitrogen that smother flames.',
      'When hydrogen and oxygen combine chemically to form a compound, they lose their original properties.',
      'Water is a physical mixture where hydrogen floats away.',
      'Oxygen changes into carbon dioxide inside water.',
    ],
    correctIndex: 1,
    explanation: 'Compounds possess unique chemical properties distinct from the elements that formed them due to chemical bonding.',
    hints: ['Chemical reaction creates a completely new substance.', 'Compound properties are DIFFERENT from element properties.', 'H₂O is neither H₂ nor O₂ gas.'],
    misconceptionIndex: 3,
  },
  {
    id: 'c_s7',
    nodeId: 'c6_chem_008',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Phase Change Conservation Mass',
    question: 'A sealed glass flask contains 250 grams of ice cubes. The flask is warmed until all ice melts into liquid water. What is the mass of the liquid water in grams?',
    correctAnswer: 250,
    explanation: 'Phase change is a physical process. No atoms enter or leave the sealed flask, so mass remains exactly 250 grams.',
    hints: ['Is mass gained or lost when ice turns to water?', 'Sealed flask means no matter escapes.', 'Mass stays the same.'],
    misconceptionIndex: 4,
  },
  {
    id: 'c_s8',
    nodeId: 'c6_chem_002',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Compressibility Analysis',
    question: 'Why can air inside a bicycle pump be easily compressed, while water inside a syringe cannot?',
    options: [
      'Air particles are soft, while water particles are hard solid spheres.',
      'Gas particles have huge intermolecular spaces that can be pushed closer together.',
      'Water molecules destroy each other when compressed.',
      'Air has no mass so it shrinks easily.',
    ],
    correctIndex: 1,
    explanation: 'Gases have large intermolecular spaces, making them highly compressible. Liquids already have tightly packed particles with minimal empty space.',
    hints: ['Think about space between particles.', 'Gas particles have plenty of empty space between them.', 'Liquids are almost incompressible.'],
  },

  // --- ADVANCED TIER (7 Challenges) ---
  {
    id: 'c_a1',
    nodeId: 'c6_chem_006',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Mixture vs Compound Distinction',
    question: 'Iron filings and Sulfur powder are mixed together in Dish A. Iron filings and Sulfur powder are heated strongly in Dish B until a black solid (Iron Sulfide) forms. Which dish contains a COMPOUND?',
    options: [
      'Dish A, because two substances are present.',
      'Dish B, because a chemical reaction joined Iron and Sulfur into a new substance (FeS) with new properties.',
      'Both Dish A and Dish B.',
      'Neither dish, both are mixtures.',
    ],
    correctIndex: 1,
    explanation: 'Dish A is a physical mixture (iron can be separated with a magnet). Dish B underwent chemical bonding to form Iron Sulfide (FeS), a compound non-magnetic in nature.',
    hints: ['Can you separate iron with a magnet from Dish A?', 'Heating caused chemical bonding in Dish B.', 'FeS is a compound.'],
  },
  {
    id: 'c_a2',
    nodeId: 'c6_chem_008',
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Complex Mass Conservation Calculation',
    question: 'In an experiment, 12g of Carbon reacts completely with 32g of Oxygen gas in a closed combustion chamber. What is the precise mass of Carbon Dioxide gas produced in grams?',
    correctAnswer: 44,
    explanation: 'Law of Conservation of Mass: Mass of reactants = Mass of products. 12g + 32g = 44g of CO₂.',
    hints: ['Reactant mass = Product mass.', '12 + 32 = ?', 'No atoms escape the closed chamber.'],
  },
  {
    id: 'c_a3',
    nodeId: 'c6_chem_004',
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'Kinetic Theory Sequence',
    question: 'Order the steps describing what happens to particle motion when Ice (-10°C) transforms into Steam (110°C):',
    sortingItems: [
      'Thermal energy breaks rigid crystal lattice of ice; particles begin sliding (Liquid water at 0°C).',
      'Solid particles vibrate faster in fixed positions as temperature rises from -10°C to 0°C.',
      'Molecules gain extreme kinetic speed, break attractive forces completely, and fly freely as steam.',
      'Liquid water absorbs heat, increasing particle kinetic speed up to 100°C.',
    ],
    correctOrder: [
      'Solid particles vibrate faster in fixed positions as temperature rises from -10°C to 0°C.',
      'Thermal energy breaks rigid crystal lattice of ice; particles begin sliding (Liquid water at 0°C).',
      'Liquid water absorbs heat, increasing particle kinetic speed up to 100°C.',
      'Molecules gain extreme kinetic speed, break attractive forces completely, and fly freely as steam.',
    ],
    explanation: 'Heating increases kinetic vibration -> latent heat melts ice -> liquid heats up -> latent heat of vaporization transforms liquid to free steam gas.',
    hints: ['Start with solid ice vibrating.', 'Next comes melting to liquid.', 'Then liquid warms up.', 'Finally boiling to gas.'],
  },
  {
    id: 'c_a4',
    nodeId: 'c6_chem_007',
    type: 'matching',
    difficulty: 'advanced',
    competencyLevel: 'Phase Transition Terminology',
    question: 'Match each phase transition term with its accurate physical description:',
    matchingPairs: [
      { left: 'Sublimation', right: 'Direct change from Solid to Gas (e.g., Dry Ice / Camphor)' },
      { left: 'Condensation', right: 'Change from Gas to Liquid upon cooling' },
      { left: 'Deposition', right: 'Direct change from Gas to Solid (e.g., Frost formation)' },
    ],
    explanation: 'Sublimation skips liquid phase (solid -> gas). Condensation turns gas -> liquid. Deposition skips liquid phase (gas -> solid).',
    hints: ['Camphor / Dry Ice undergoes Sublimation.', 'Water drops on a cold mirror = Condensation.', 'Frost formation directly from vapor = Deposition.'],
  },
  {
    id: 'c_a5',
    nodeId: 'c6_chem_005',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Molecular Architecture Analysis',
    question: 'A chemical sample contains molecules made of 2 Hydrogen atoms and 1 Oxygen atom (H₂O). Which statement is TRUE?',
    options: [
      'It is a triatomic molecule of a compound.',
      'It is a diatomic molecule of an element.',
      'It is a heterogeneous mixture of hydrogen gas bubbles and liquid oxygen.',
      'It contains 3 different elements.',
    ],
    correctIndex: 0,
    explanation: 'H₂O contains 3 total atoms (2 H + 1 O = triatomic) of two different elements, making it a compound molecule.',
    hints: ['Count total atoms: 2 H + 1 O = 3 atoms (triatomic).', 'Contains different elements, so it is a compound.', 'Triatomic compound molecule.'],
  },
  {
    id: 'c_a6',
    nodeId: 'c6_chem_001',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Critical Thinking on Non-Matter',
    question: 'Why are magnetic fields, light, and vacuum NOT considered matter?',
    options: [
      'Because they are invisible to the naked eye.',
      'Because they lack mass and do not occupy volume in space.',
      'Because they only exist at absolute zero temperature.',
      'Because they consist of neutrons without protons.',
    ],
    correctIndex: 1,
    explanation: 'By scientific definition, matter MUST possess mass and occupy space. Fields, vacuum, and electromagnetic radiation lack rest mass and volume.',
    hints: ['What are the two mandatory criteria for matter?', 'Do radio waves have weight on a digital balance scale?', 'Lacking mass and volume excludes them from being matter.'],
  },
  {
    id: 'c_a7',
    nodeId: 'c6_chem_008',
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Law of Conservation Application',
    question: 'In a dissolution tank, 40g of salt is dissolved in 200g of water. If 10g of water evaporates due to heat, what is the final mass of the salt solution in grams?',
    correctAnswer: 230,
    explanation: 'Initial total mass = 40g + 200g = 240g. Evaporated water mass loss = 10g. Remaining mass = 240g - 10g = 230g.',
    hints: ['First find total initial mass (40 + 200 = 240g).', 'Evaporation removes 10g of water vapor.', '240 - 10 = ?'],
  },
];

// ==========================================
// 6. TOPIC-SPECIFIC SVG DIAGRAM COMPONENTS
// ==========================================

const IntermolecularSpaceDiagram: React.FC<{ state: 'solid' | 'liquid' | 'gas' }> = ({ state }) => {
  return (
    <svg viewBox="0 0 320 200" className="w-full h-48 bg-slate-900 rounded-xl border border-slate-700 shadow-inner">
      <defs>
        <radialGradient id="atomGrad" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#0284c7" />
        </radialGradient>
        <radialGradient id="atomGradGas" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#f43f5e" />
          <stop offset="100%" stopColor="#be123c" />
        </radialGradient>
        <radialGradient id="atomGradLiq" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#d97706" />
        </radialGradient>
      </defs>

      <rect x="10" y="10" width="300" height="180" rx="10" fill="none" stroke="#475569" strokeDasharray="4,4" />
      <text x="20" y="30" fill="#94a3b8" fontSize="12" className="font-mono">
        STATE: {state.toUpperCase()}
      </text>

      {state === 'solid' && (
        <g>
          {Array.from({ length: 4 }).map((_, row) =>
            Array.from({ length: 5 }).map((_, col) => {
              const cx = 80 + col * 38;
              const cy = 60 + row * 35;
              return (
                <g key={`s-${row}-${col}`}>
                  <circle cx={cx} cy={cy} r="16" fill="url(#atomGrad)" stroke="#7dd3fc" strokeWidth="1.5" />
                  {col < 4 && <line x1={cx + 16} y1={cy} x2={cx + 22} y2={cy} stroke="#38bdf8" strokeWidth="2" opacity="0.6" />}
                  {row < 3 && <line x1={cx} y1={cy + 16} x2={cx} y2={cy + 19} stroke="#38bdf8" strokeWidth="2" opacity="0.6" />}
                </g>
              );
            })
          )}
          <text x="160" y="180" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">
            Strong Attractive Force • Tiny Intermolecular Space
          </text>
        </g>
      )}

      {state === 'liquid' && (
        <g>
          {[
            { x: 70, y: 130 }, { x: 105, y: 140 }, { x: 140, y: 125 }, { x: 175, y: 145 }, { x: 210, y: 135 },
            { x: 85, y: 95 }, { x: 125, y: 90 }, { x: 165, y: 100 }, { x: 200, y: 88 },
            { x: 110, y: 60 }, { x: 155, y: 55 }, { x: 190, y: 65 }
          ].map((pos, idx) => (
            <g key={`l-${idx}`}>
              <circle cx={pos.x} cy={pos.y} r="15" fill="url(#atomGradLiq)" stroke="#fde047" strokeWidth="1.5" />
              <path d={`M ${pos.x - 5} ${pos.y - 18} Q ${pos.x} ${pos.y - 22} ${pos.x + 5} ${pos.y - 18}`} stroke="#fde047" strokeWidth="1" fill="none" opacity="0.7" />
            </g>
          ))}
          <text x="160" y="180" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">
            Moderate Force • Medium Intermolecular Space (Flows)
          </text>
        </g>
      )}

      {state === 'gas' && (
        <g>
          {[
            { x: 40, y: 40, vx: 12, vy: 8 },
            { x: 260, y: 50, vx: -15, vy: 10 },
            { x: 150, y: 90, vx: 8, vy: -14 },
            { x: 70, y: 150, vx: 14, vy: -12 },
            { x: 240, y: 140, vx: -10, vy: -10 },
          ].map((pos, idx) => (
            <g key={`g-${idx}`}>
              <line x1={pos.x} y1={pos.y} x2={pos.x - pos.vx * 1.5} y2={pos.y - pos.vy * 1.5} stroke="#f43f5e" strokeWidth="2" opacity="0.5" strokeDasharray="2,2" />
              <circle cx={pos.x} cy={pos.y} r="14" fill="url(#atomGradGas)" stroke="#fda4af" strokeWidth="1.5" />
            </g>
          ))}
          <text x="160" y="180" textAnchor="middle" fill="#f43f5e" fontSize="11" fontWeight="bold">
            Negligible Force • Large Intermolecular Space (Free Motion)
          </text>
        </g>
      )}
    </svg>
  );
};

const ElementCompoundMixtureDiagram: React.FC = () => {
  return (
    <svg viewBox="0 0 450 180" className="w-full h-44 bg-slate-900 rounded-xl border border-slate-700 p-2">
      {/* Box 1: Element */}
      <g transform="translate(10, 10)">
        <rect x="0" y="0" width="130" height="150" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="1.5" />
        <text x="65" y="24" textAnchor="middle" fill="#60a5fa" fontSize="12" fontWeight="bold">ELEMENT</text>
        <circle cx="45" cy="60" r="14" fill="#3b82f6" />
        <circle cx="85" cy="60" r="14" fill="#3b82f6" />
        <circle cx="45" cy="110" r="14" fill="#3b82f6" />
        <circle cx="85" cy="110" r="14" fill="#3b82f6" />
        <text x="65" y="142" textAnchor="middle" fill="#94a3b8" fontSize="10">Single type of atom (e.g. Pure Fe)</text>
      </g>

      {/* Box 2: Compound */}
      <g transform="translate(160, 10)">
        <rect x="0" y="0" width="130" height="150" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
        <text x="65" y="24" textAnchor="middle" fill="#34d399" fontSize="12" fontWeight="bold">COMPOUND</text>
        {/* H2O molecule 1 */}
        <circle cx="65" cy="60" r="12" fill="#ef4444" />
        <circle cx="53" cy="70" r="7" fill="#f8fafc" />
        <circle cx="77" cy="70" r="7" fill="#f8fafc" />
        {/* H2O molecule 2 */}
        <circle cx="65" cy="105" r="12" fill="#ef4444" />
        <circle cx="53" cy="115" r="7" fill="#f8fafc" />
        <circle cx="77" cy="115" r="7" fill="#f8fafc" />
        <text x="65" y="142" textAnchor="middle" fill="#94a3b8" fontSize="10">Chemically bonded in fixed ratio (H₂O)</text>
      </g>

      {/* Box 3: Mixture */}
      <g transform="translate(310, 10)">
        <rect x="0" y="0" width="130" height="150" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
        <text x="65" y="24" textAnchor="middle" fill="#fbbf24" fontSize="12" fontWeight="bold">MIXTURE</text>
        <circle cx="35" cy="55" r="12" fill="#3b82f6" />
        <circle cx="95" cy="65" r="10" fill="#ef4444" />
        <circle cx="83" cy="73" r="6" fill="#f8fafc" />
        <rect x="30" y="100" width="16" height="16" rx="3" fill="#a855f7" />
        <circle cx="85" cy="115" r="12" fill="#3b82f6" />
        <text x="65" y="142" textAnchor="middle" fill="#94a3b8" fontSize="10">Physically blended, no fixed ratio</text>
      </g>
    </svg>
  );
};

const StateChangeDiagram: React.FC = () => {
  return (
    <svg viewBox="0 0 400 200" className="w-full h-48 bg-slate-900 rounded-xl border border-slate-700 p-2">
      {/* Triangle layout */}
      <polygon points="200,30 60,160 340,160" fill="none" stroke="#475569" strokeWidth="2" strokeDasharray="4,4" />

      {/* States */}
      {/* Gas Top */}
      <g transform="translate(200, 30)">
        <circle cx="0" cy="0" r="24" fill="#be123c" stroke="#f43f5e" strokeWidth="2" />
        <text x="0" y="4" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">GAS</text>
      </g>

      {/* Solid Left */}
      <g transform="translate(60, 160)">
        <circle cx="0" cy="0" r="24" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" />
        <text x="0" y="4" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">SOLID</text>
      </g>

      {/* Liquid Right */}
      <g transform="translate(340, 160)">
        <circle cx="0" cy="0" r="24" fill="#d97706" stroke="#fbbf24" strokeWidth="2" />
        <text x="0" y="4" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">LIQUID</text>
      </g>

      {/* Arrows and Labels */}
      {/* Solid to Liquid: Melting */}
      <path d="M 90 150 L 310 150" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#arrow)" />
      <text x="200" y="143" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">Melting (+Heat)</text>

      {/* Liquid to Solid: Freezing */}
      <path d="M 310 170 L 90 170" stroke="#38bdf8" strokeWidth="2" />
      <text x="200" y="182" textAnchor="middle" fill="#38bdf8" fontSize="10">Freezing (-Heat)</text>

      {/* Liquid to Gas: Evaporation */}
      <path d="M 330 140 L 215 45" stroke="#f43f5e" strokeWidth="2" />
      <text x="290" y="85" fill="#f43f5e" fontSize="10" fontWeight="bold">Vaporization</text>

      {/* Gas to Liquid: Condensation */}
      <path d="M 190 45 L 75 140" stroke="#38bdf8" strokeWidth="2" />
      <text x="100" y="85" fill="#38bdf8" fontSize="10" fontWeight="bold">Sublimation</text>
    </svg>
  );
};

const GasMassBalanceDiagram: React.FC<{ deflatedWeight: number; inflatedWeight: number }> = ({
  deflatedWeight,
  inflatedWeight,
}) => {
  const diff = inflatedWeight - deflatedWeight;
  const isTilted = diff > 0.1;

  return (
    <svg viewBox="0 0 400 200" className="w-full h-48 bg-slate-900 rounded-xl border border-slate-700 p-2">
      {/* Base */}
      <polygon points="200,170 180,190 220,190" fill="#64748b" />
      <rect x="196" y="90" width="8" height="80" fill="#475569" />

      {/* Lever Beam */}
      <g transform={`rotate(${isTilted ? 8 : 0}, 200, 90)`} className="transition-transform duration-500">
        <rect x="50" y="87" width="300" height="6" fill="#94a3b8" rx="3" />

        {/* Left Pan - Deflated Balloon */}
        <g transform="translate(60, 90)">
          <line x1="0" y1="0" x2="0" y2="40" stroke="#cbd5e1" strokeWidth="1.5" />
          <path d="M -25 40 Q 0 55 25 40 Z" fill="#334155" stroke="#94a3b8" />
          {/* Deflated balloon shape */}
          <path d="M -10 32 Q 0 25 10 32 Q 5 40 -10 32" fill="#ec4899" opacity="0.8" />
          <text x="0" y="68" textAnchor="middle" fill="#ec4899" fontSize="10" fontWeight="bold">Deflated ({deflatedWeight.toFixed(2)}g)</text>
        </g>

        {/* Right Pan - Inflated Balloon */}
        <g transform="translate(340, 90)">
          <line x1="0" y1="0" x2="0" y2="40" stroke="#cbd5e1" strokeWidth="1.5" />
          <path d="M -25 40 Q 0 55 25 40 Z" fill="#334155" stroke="#94a3b8" />
          {/* Inflated balloon shape */}
          <ellipse cx="0" cy="22" rx="18" ry="22" fill="#ec4899" />
          <polygon points="0,44 -4,48 4,48" fill="#be185d" />
          <text x="0" y="68" textAnchor="middle" fill="#f472b6" fontSize="10" fontWeight="bold">Inflated ({inflatedWeight.toFixed(2)}g)</text>
        </g>
      </g>

      {/* Digital Scale Readout */}
      <rect x="140" y="10" width="120" height="35" rx="6" fill="#0f172a" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="200" y="32" textAnchor="middle" fill="#38bdf8" fontFamily="monospace" fontSize="14" fontWeight="bold">
        Δ Mass: +{diff.toFixed(2)}g
      </text>
    </svg>
  );
};

// ==========================================
// 7. CANVAS INTERACTIVE PARTICLE SIMULATOR
// ==========================================

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

const ParticleCanvas: React.FC<{ temperature: number; state: 'solid' | 'liquid' | 'gas' }> = ({
  temperature,
  state,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const width = canvas.width;
    const height = canvas.height;

    // Create particles based on state
    const particleCount = state === 'solid' ? 36 : state === 'liquid' ? 28 : 16;
    const particles: Particle[] = [];

    const baseSpeed = state === 'solid' ? 0.3 : state === 'liquid' ? 1.5 : 4.5;
    const tempMultiplier = temperature / 50;

    if (state === 'solid') {
      const rows = 6;
      const cols = 6;
      const startX = width / 2 - (cols * 22) / 2;
      const startY = height / 2 - (rows * 22) / 2;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          particles.push({
            x: startX + c * 22,
            y: startY + r * 22,
            vx: (Math.random() - 0.5) * baseSpeed * tempMultiplier,
            vy: (Math.random() - 0.5) * baseSpeed * tempMultiplier,
            radius: 8,
            color: '#38bdf8',
          });
        }
      }
    } else {
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * (width - 40) + 20,
          y: state === 'liquid' ? height - 30 - Math.random() * (height * 0.5) : Math.random() * (height - 40) + 20,
          vx: (Math.random() - 0.5) * baseSpeed * tempMultiplier * 2,
          vy: (Math.random() - 0.5) * baseSpeed * tempMultiplier * 2,
          radius: 8,
          color: state === 'liquid' ? '#fbbf24' : '#f43f5e',
        });
      }
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw container boundary
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      ctx.strokeRect(10, 10, width - 20, height - 20);
      ctx.setLineDash([]);

      particles.forEach((p) => {
        // Update position
        if (state === 'solid') {
          // Jiggle around original lattice point
          p.x += (Math.random() - 0.5) * tempMultiplier * 0.8;
          p.y += (Math.random() - 0.5) * tempMultiplier * 0.8;
        } else {
          p.x += p.vx;
          p.y += p.vy;

          // Bounce walls
          if (p.x - p.radius < 15 || p.x + p.radius > width - 15) p.vx *= -1;
          if (p.y - p.radius < 15 || p.y + p.radius > height - 15) p.vy *= -1;

          // Liquid container floor constraint
          if (state === 'liquid' && p.y < height * 0.35) {
            p.vy += 0.2; // gravity pull back down
          }
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Draw intermolecular force bonds for solids
        if (state === 'solid') {
          particles.forEach((other) => {
            const dx = other.x - p.x;
            const dy = other.y - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist > 0 && dist < 26) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(other.x, other.y);
              ctx.strokeStyle = 'rgba(56, 189, 248, 0.3)';
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          });
        }
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [temperature, state]);

  return (
    <canvas
      ref={canvasRef}
      width={380}
      height={220}
      className="w-full h-52 bg-slate-950 rounded-xl border border-slate-800 shadow-2xl"
    />
  );
};

// ==========================================
// 8. MAIN COMPONENT DEFINITION
// ==========================================

interface C6_ChemistryMatteranditscompositionSimProps {
  onComplete?: (score: number) => void;
  initialTab?: 'discovery' | 'lab' | 'challenges' | 'summary';
}

export const C6_ChemistryMatteranditscompositionSim: React.FC<C6_ChemistryMatteranditscompositionSimProps> = ({
  onComplete,
  initialTab = 'discovery',
}) => {
  // --- STATE ENGINE ---
  const [activeTab, setActiveTab] = useState<'discovery' | 'lab' | 'challenges' | 'summary'>(initialTab);

  // Discovery State
  const [discoveryAnswer, setDiscoveryAnswer] = useState<number | null>(null);
  const [discoveryCompleted, setDiscoveryCompleted] = useState(false);
  const [predictionAnswers, setPredictionAnswers] = useState<Record<number, number>>({});

  // Interactive Lab State
  const [activeLabIndex, setActiveLabIndex] = useState(0);
  const [labTemp, setLabTemp] = useState(25);
  const [labState, setLabState] = useState<'solid' | 'liquid' | 'gas'>('liquid');
  const [inflatedBalloons, setInflatedBalloons] = useState(0);
  const [sugarSoluteGrams, setSugarSoluteGrams] = useState(0);
  const [waterSolventGrams] = useState(100);
  const [builderAtoms, setBuilderAtoms] = useState<{ id: string; type: 'H' | 'O' | 'Fe' | 'S' }[]>([]);
  const [builtCompound, setBuiltCompound] = useState<string>('Empty');
  const [heatingTemp, setHeatingTemp] = useState(-10);
  const [observationAnswers, setObservationAnswers] = useState<Record<number, number>>({});

  // Challenges Engine State
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [userMCQChoice, setUserMCQChoice] = useState<number | null>(null);
  const [userNumericInput, setUserNumericInput] = useState<string>('');
  const [userSortingOrder, setUserSortingOrder] = useState<string[]>([]);
  const [userMatchingState, setUserMatchingState] = useState<Record<string, string>>({});
  const [challengeFeedback, setChallengeFeedback] = useState<{
    submitted: boolean;
    isCorrect: boolean;
    message: string;
  } | null>(null);

  // Feedback FX State
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 400, y: 300 });
  const [showHint, setShowHint] = useState(false);
  const [currentHintText, setCurrentHintText] = useState('');

  // BKT & SM2 Mastery State
  const [bktStates, setBktStates] = useState<Record<NodeId, BKTState>>(() => {
    const initial: Record<string, BKTState> = {};
    ALL_NODE_IDS.forEach((id) => {
      initial[id] = createBKTState();
    });
    return initial as Record<NodeId, BKTState>;
  });

  const [srsItems, setSrsItems] = useState<Record<string, ReviewItem>>(() => {
    const initial: Record<string, ReviewItem> = {};
    CHALLENGES.forEach((c) => {
      initial[c.id] = createReviewItem(c.id);
    });
    return initial;
  });

  const [totalScore, setTotalScore] = useState(0);
  const [completedChallengesCount, setCompletedChallengesCount] = useState(0);

  // Auto-hint Ref Timer
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  // --- AUDIO & SPEECH HELPER CALLS ---
  const triggerAudio = useCallback((type: SoundEffect) => {
    audioManager.play(type);
  }, []);

  const triggerSpeech = useCallback((text: string) => {
    speechManager.speak(text);
  }, []);

  // Sync sorting items when challenge changes
  useEffect(() => {
    const currentC = CHALLENGES[currentChallengeIndex];
    if (currentC && currentC.type === 'drag-sort' && currentC.sortingItems) {
      setUserSortingOrder([...currentC.sortingItems].sort(() => Math.random() - 0.5));
    }
    if (currentC && currentC.type === 'matching' && currentC.matchingPairs) {
      setUserMatchingState({});
    }
    setUserMCQChoice(null);
    setUserNumericInput('');
    setChallengeFeedback(null);
    setShowHint(false);
  }, [currentChallengeIndex]);

  // Inactivity auto-hint trigger
  useEffect(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (!challengeFeedback?.submitted && activeTab === 'challenges') {
        const c = CHALLENGES[currentChallengeIndex];
        setCurrentHintText(`Auto Hint: ${c.hints[0]}`);
        setShowHint(true);
        triggerAudio('hint');
      }
    }, 12000);

    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [currentChallengeIndex, challengeFeedback, activeTab, triggerAudio]);

  // Tab Speech Trigger
  const handleTabChange = (tab: 'discovery' | 'lab' | 'challenges' | 'summary') => {
    triggerAudio('whoosh');
    setActiveTab(tab);
    if (tab === 'discovery') triggerSpeech('Welcome to the Discovery Phase. Test your intuition on Matter!');
    if (tab === 'lab') triggerSpeech('Entering the Interactive Chemistry Simulation Lab.');
    if (tab === 'challenges') triggerSpeech('Beginning the CISCE Challenge Evaluation.');
    if (tab === 'summary') triggerSpeech('Reviewing your overall Mastery and Real-World Applications.');
  };

  // --- DISCOVERY LOGIC ---
  const handleDiscoverySubmit = (idx: number) => {
    setDiscoveryAnswer(idx);
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    if (isCorrect) {
      triggerAudio('celebration');
      triggerSpeech('Brilliant discovery! Air gas possesses actual mass.');
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    } else {
      triggerAudio('error');
      triggerSpeech('Not quite. Remember that invisible gas particles still have weight!');
    }
    setDiscoveryCompleted(true);
  };

  // --- LAB SIMULATOR LOGIC ---
  const handleTempSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setLabTemp(val);
    triggerAudio('tap');
    if (val < 0) setLabState('solid');
    else if (val >= 0 && val < 100) setLabState('liquid');
    else setLabState('gas');
  };

  const handleAddBalloon = () => {
    triggerAudio('pop');
    setInflatedBalloons((prev) => (prev < 3 ? prev + 1 : 0));
  };

  const handleAddSugar = (grams: number) => {
    triggerAudio('count');
    setSugarSoluteGrams((prev) => Math.min(60, prev + grams));
  };

  const handleAddAtomToBuilder = (type: 'H' | 'O' | 'Fe' | 'S') => {
    triggerAudio('pickup');
    const newAtoms = [...builderAtoms, { id: `${type}_${Date.now()}_${Math.random()}`, type }];
    setBuilderAtoms(newAtoms);

    // Evaluate built chemical structure
    const counts = newAtoms.reduce((acc, a) => {
      acc[a.type] = (acc[a.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    if (counts['H'] === 2 && counts['O'] === 1 && newAtoms.length === 3) {
      setBuiltCompound('Water Molecule (H₂O) - Compound!');
      triggerAudio('chime');
    } else if (counts['H'] === 2 && newAtoms.length === 2) {
      setBuiltCompound('Hydrogen Gas (H₂) - Element Molecule!');
      triggerAudio('sparkle');
    } else if (counts['Fe'] === 1 && counts['S'] === 1 && newAtoms.length === 2) {
      setBuiltCompound('Iron Sulfide (FeS) - Chemical Compound!');
      triggerAudio('chime');
    } else {
      setBuiltCompound('Unbound Mixture of Atoms');
    }
  };

  // --- CHALLENGE EVALUATION ENGINE ---
  const handleChallengeSubmit = () => {
    const currentC = CHALLENGES[currentChallengeIndex];
    let isCorrect = false;

    if (currentC.type === 'multiple-choice') {
      isCorrect = userMCQChoice === currentC.correctIndex;
    } else if (currentC.type === 'numeric') {
      const val = parseFloat(userNumericInput);
      isCorrect = !isNaN(val) && Math.abs(val - (currentC.correctAnswer as number)) < 0.1;
    } else if (currentC.type === 'drag-sort') {
      isCorrect = JSON.stringify(userSortingOrder) === JSON.stringify(currentC.correctOrder);
    } else if (currentC.type === 'matching') {
      isCorrect = currentC.matchingPairs!.every(
        (pair) => userMatchingState[pair.left] === pair.right
      );
    }

    // BKT & SM2 Updates
    const oldBkt = bktStates[currentC.nodeId];
    const newBkt = bktUpdate(oldBkt, isCorrect);
    setBktStates((prev) => ({ ...prev, [currentC.nodeId]: newBkt }));

    const oldSrs = srsItems[currentC.id];
    const newSrs = sm2Update(oldSrs, isCorrect ? 5 : 2);
    setSrsItems((prev) => ({ ...prev, [currentC.id]: newSrs }));

    if (isCorrect) {
      triggerAudio('success');
      triggerAudio('sparkle');
      triggerSpeech('Correct! Excellent chemical reasoning.');
      setShowSuccessBanner(true);
      setShowSparkle(true);
      setSparklePos({ x: window.innerWidth / 2, y: 300 });
      setTotalScore((prev) => prev + (currentC.difficulty === 'foundation' ? 10 : currentC.difficulty === 'standard' ? 15 : 20));
      setCompletedChallengesCount((prev) => prev + 1);
      setTimeout(() => {
        setShowSuccessBanner(false);
        setShowSparkle(false);
      }, 2500);

      setChallengeFeedback({
        submitted: true,
        isCorrect: true,
        message: `Great job! ${currentC.explanation}`,
      });
    } else {
      triggerAudio('error');
      triggerSpeech('That answer is incorrect. Let us review the concept.');
      setChallengeFeedback({
        submitted: true,
        isCorrect: false,
        message: `Incorrect. ${currentC.explanation}`,
      });
    }
  };

  const handleNextChallenge = () => {
    triggerAudio('swoop');
    if (currentChallengeIndex < CHALLENGES.length - 1) {
      setCurrentChallengeIndex((prev) => prev + 1);
    } else {
      // Finished all challenges
      triggerAudio('celebration');
      triggerSpeech('Congratulations! You have completed all CISCE Matter Challenges!');
      setShowConfetti(true);
      recordGameScore('c6_chem_matter', totalScore);
      if (onComplete) onComplete(totalScore);
      setActiveTab('summary');
    }
  };

  // Overall Mastery Calculation
  const overallMasteryPercent = useMemo(() => {
    const masteries = ALL_NODE_IDS.map((id) => masteryProb(bktStates[id]));
    const avg = masteries.reduce((a, b) => a + b, 0) / masteries.length;
    return Math.round(avg * 100);
  }, [bktStates]);

  const currentChallenge = CHALLENGES[currentChallengeIndex];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 md:p-8 select-none">
      {/* GLOBAL FX COMPONENTS */}
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccessBanner} text="Challenge Mastered!" />
      <SparkleBurst show={showSparkle} x={sparklePos.x} y={sparklePos.y} />
      <HintBubble show={showHint} text={currentHintText} />

      {/* TOP HEADER & MASTERY BAR */}
      <header className="max-w-6xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              ICSE Class 6 Chemistry
            </span>
            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono font-bold px-3 py-1 rounded-full">
              Score: {totalScore} pts
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-2 tracking-tight">
            Matter & Its Composition
          </h1>
          <p className="text-slate-400 text-sm mt-1">{SCENARIO.title}</p>
        </div>

        {/* BKT Mastery Indicator */}
        <div className="w-full md:w-64 bg-slate-950 border border-slate-800 p-3 rounded-xl">
          <div className="flex justify-between items-center text-xs mb-1 font-mono">
            <span className="text-slate-400">BKT Concept Mastery:</span>
            <span className="text-sky-400 font-bold">{overallMasteryPercent}%</span>
          </div>
          <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-sky-500 to-emerald-400 transition-all duration-500"
              style={{ width: `${overallMasteryPercent}%` }}
            />
          </div>
        </div>
      </header>

      {/* TABS NAVIGATION */}
      <nav className="max-w-6xl mx-auto flex gap-2 mb-6 border-b border-slate-800 pb-2">
        {(
          [
            { id: 'discovery', label: '1. Discovery & Hypotheses' },
            { id: 'lab', label: '2. Interactive Lab' },
            { id: 'challenges', label: `3. Challenges (${completedChallengesCount}/${CHALLENGES.length})` },
            { id: 'summary', label: '4. Real-World & Mastery' },
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/30 border border-sky-400'
                : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* TAB CONTENT AREA */}
      <main className="max-w-6xl mx-auto">
        {/* ========================================== */}
        {/* TAB 1: DISCOVERY & HYPOTHESES             */}
        {/* ========================================== */}
        {activeTab === 'discovery' && (
          <div className="space-y-6">
            {/* Lab Context Box */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-lg">
              <h2 className="text-xl font-bold text-sky-400 mb-2">Scenario Context</h2>
              <p className="text-slate-300 leading-relaxed text-sm">{SCENARIO.intro}</p>
              <p className="text-slate-400 leading-relaxed text-sm mt-2">{SCENARIO.context}</p>
            </div>

            {/* Discovery Question Card */}
            <div className="bg-slate-900 border border-sky-500/30 p-6 rounded-2xl shadow-xl">
              <span className="text-xs font-mono font-bold text-sky-400 uppercase tracking-widest">
                Discovery Pre-Check
              </span>
              <h3 className="text-lg font-bold text-white mt-1 mb-4">{DISCOVERY_QUESTION.question}</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                {DISCOVERY_QUESTION.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleDiscoverySubmit(idx)}
                    disabled={discoveryCompleted}
                    className={`p-4 rounded-xl text-left text-sm transition-all border ${
                      discoveryAnswer === idx
                        ? idx === DISCOVERY_QUESTION.correctIndex
                          ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-semibold'
                          : 'bg-rose-950/60 border-rose-500 text-rose-200'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span className="font-mono font-bold mr-2">{String.fromCharCode(65 + idx)}.</span>
                    {opt}
                  </button>
                ))}
              </div>

              {discoveryCompleted && (
                <div className="mt-4 p-4 bg-slate-950 border border-sky-500/30 rounded-xl text-sm text-sky-200">
                  <span className="font-bold text-sky-400">Scientific Truth: </span>
                  {DISCOVERY_QUESTION.hintAfter}
                </div>
              )}
            </div>

            {/* Prediction Questions (Mandatory Render) */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-lg">
              <h3 className="text-lg font-bold text-slate-200 mb-4">Hypothesis Prediction Questions</h3>
              <div className="space-y-6">
                {PREDICTION_QUESTIONS.map((pq, pqIdx) => (
                  <div key={pqIdx} className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
                    <p className="font-medium text-slate-200 mb-3 text-sm">{pq.question}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {pq.options.map((opt, oIdx) => (
                        <button
                          key={oIdx}
                          onClick={() => {
                            triggerAudio('tap');
                            setPredictionAnswers((prev) => ({ ...prev, [pqIdx]: oIdx }));
                          }}
                          className={`p-3 rounded-lg text-xs text-left border transition-all ${
                            predictionAnswers[pqIdx] === oIdx
                              ? oIdx === pq.correctIndex
                                ? 'bg-emerald-900/50 border-emerald-500 text-emerald-200'
                                : 'bg-rose-900/50 border-rose-500 text-rose-200'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                    {predictionAnswers[pqIdx] !== undefined && (
                      <p className="mt-2 text-xs font-mono text-sky-400">{pq.verifyInstruction}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* TAB 2: INTERACTIVE LABS                   */}
        {/* ========================================== */}
        {activeTab === 'lab' && (
          <div className="space-y-6">
            {/* Exploration Steps Navigation (Mandatory Array Render) */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {EXPLORATION_STEPS.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    triggerAudio('tap');
                    setActiveLabIndex(idx);
                  }}
                  className={`p-3 rounded-xl border text-xs font-semibold text-left transition-all ${
                    activeLabIndex === idx
                      ? 'bg-sky-600 border-sky-400 text-white shadow-lg shadow-sky-600/20'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  <div className="text-[10px] font-mono text-sky-300 uppercase">Lab {idx + 1}</div>
                  <div className="truncate mt-0.5">{step.title.split(':')[1] || step.title}</div>
                </button>
              ))}
            </div>

            {/* Active Lab Card */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {EXPLORATION_STEPS[activeLabIndex].title}
                  </h3>
                  <p className="text-slate-400 text-sm mt-1">
                    {EXPLORATION_STEPS[activeLabIndex].instruction}
                  </p>
                </div>
                <span className="text-xs font-mono bg-slate-800 border border-slate-700 px-3 py-1 rounded-full text-slate-300">
                  Node: {EXPLORATION_STEPS[activeLabIndex].nodeId}
                </span>
              </div>

              {/* Lab 1: Kinetic Particle Simulator */}
              {activeLabIndex === 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <div>
                    <ParticleCanvas temperature={labTemp} state={labState} />
                  </div>
                  <div className="space-y-4">
                    <IntermolecularSpaceDiagram state={labState} />

                    <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
                      <label className="block text-xs font-mono text-slate-400 mb-2">
                        Thermal Kinetic Controller: {labTemp}°C (State: {labState.toUpperCase()})
                      </label>
                      <input
                        type="range"
                        min="-20"
                        max="120"
                        value={labTemp}
                        onChange={handleTempSliderChange}
                        className="w-full accent-sky-500 cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                        <span>-20°C (Solid Ice)</span>
                        <span>50°C (Liquid Water)</span>
                        <span>120°C (Gas Steam)</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Lab 2: Gas Mass & Balance Scale */}
              {activeLabIndex === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <div>
                    <GasMassBalanceDiagram
                      deflatedWeight={2.5}
                      inflatedWeight={2.5 + inflatedBalloons * 0.45}
                    />
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
                      <h4 className="font-bold text-sky-400 text-sm mb-2">Gas Mass Experiment Controls</h4>
                      <p className="text-xs text-slate-400 mb-4">
                        Pump air molecules into the right balloon to test whether invisible gases add mass to the balance scale.
                      </p>
                      <div className="flex gap-3">
                        <button
                          onClick={handleAddBalloon}
                          className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-xs font-bold transition-all"
                        >
                          Pump Air (+0.45g CO₂/O₂/N₂)
                        </button>
                        <button
                          onClick={() => setInflatedBalloons(0)}
                          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-bold"
                        >
                          Reset Scale
                        </button>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs space-y-2">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Deflated Latex Mass:</span>
                        <span className="font-mono text-slate-200">2.50 g</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Air Gas Added:</span>
                        <span className="font-mono text-sky-400">{(inflatedBalloons * 0.45).toFixed(2)} g</span>
                      </div>
                      <div className="flex justify-between font-bold border-t border-slate-800 pt-2 text-emerald-400">
                        <span>Total Inflated Mass:</span>
                        <span className="font-mono">{(2.5 + inflatedBalloons * 0.45).toFixed(2)} g</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Lab 3: Dissolution & Mass Conservation Scale */}
              {activeLabIndex === 2 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <div className="bg-slate-950 border border-slate-800 p-6 rounded-xl flex flex-col items-center justify-center min-h-[220px]">
                    <div className="w-32 h-40 border-2 border-sky-500/50 rounded-b-2xl relative overflow-hidden bg-slate-900">
                      {/* Water Liquid */}
                      <div
                        className="absolute bottom-0 w-full bg-sky-500/30 transition-all duration-300"
                        style={{ height: `${60 + sugarSoluteGrams * 0.3}%` }}
                      >
                        {/* Solute Dots */}
                        {Array.from({ length: sugarSoluteGrams }).map((_, i) => (
                          <div
                            key={i}
                            className="absolute w-1.5 h-1.5 bg-amber-300 rounded-full animate-pulse"
                            style={{
                              left: `${(i * 17) % 85 + 5}%`,
                              top: `${(i * 11) % 70 + 10}%`,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="mt-4 font-mono text-sm text-emerald-400 font-bold bg-slate-900 border border-emerald-500/30 px-4 py-2 rounded-lg">
                      Digital Scale Mass: {waterSolventGrams + sugarSoluteGrams}.00 grams
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
                      <h4 className="font-bold text-sky-400 text-sm mb-2">Mass Conservation Controls</h4>
                      <p className="text-xs text-slate-400 mb-4">
                        Add granulated sugar into 100g of pure water. Watch the mass increase exact g by g!
                      </p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleAddSugar(10)}
                          className="px-3 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-xs font-bold"
                        >
                          +10g Sugar
                        </button>
                        <button
                          onClick={() => handleAddSugar(25)}
                          className="px-3 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-xs font-bold"
                        >
                          +25g Sugar
                        </button>
                        <button
                          onClick={() => setSugarSoluteGrams(0)}
                          className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-bold"
                        >
                          Clear
                        </button>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs space-y-2">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Pure Water Solvent:</span>
                        <span className="font-mono text-slate-200">{waterSolventGrams} g</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Sugar Solute Dissolved:</span>
                        <span className="font-mono text-amber-400">{sugarSoluteGrams} g</span>
                      </div>
                      <div className="flex justify-between font-bold border-t border-slate-800 pt-2 text-emerald-400">
                        <span>Total Solution Mass (Conserved):</span>
                        <span className="font-mono">{waterSolventGrams + sugarSoluteGrams} g</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Lab 4: Atomic Synthesizer (Element / Compound / Mixture) */}
              {activeLabIndex === 3 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <div>
                    <ElementCompoundMixtureDiagram />
                    <div className="mt-4 p-4 bg-slate-950 border border-slate-800 rounded-xl text-center">
                      <div className="text-xs text-slate-400 font-mono">Synthesizer Canvas:</div>
                      <div className="text-sm font-bold text-emerald-400 mt-1">{builtCompound}</div>
                      <div className="flex flex-wrap gap-2 justify-center mt-3">
                        {builderAtoms.map((a) => (
                          <span
                            key={a.id}
                            className={`px-3 py-1 rounded-full text-xs font-bold ${
                              a.type === 'H'
                                ? 'bg-slate-200 text-slate-900'
                                : a.type === 'O'
                                ? 'bg-red-500 text-white'
                                : a.type === 'Fe'
                                ? 'bg-blue-600 text-white'
                                : 'bg-yellow-500 text-slate-900'
                            }`}
                          >
                            {a.type} Atom
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
                      <h4 className="font-bold text-sky-400 text-sm mb-2">Atomic Assembly Bench</h4>
                      <p className="text-xs text-slate-400 mb-4">
                        Click atoms to assemble elements, compounds, or physical mixtures.
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => handleAddAtomToBuilder('H')}
                          className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-bold"
                        >
                          + Hydrogen (H)
                        </button>
                        <button
                          onClick={() => handleAddAtomToBuilder('O')}
                          className="px-3 py-2 bg-rose-900/50 border border-rose-500/40 text-rose-200 rounded-lg text-xs font-bold hover:bg-rose-800/50"
                        >
                          + Oxygen (O)
                        </button>
                        <button
                          onClick={() => handleAddAtomToBuilder('Fe')}
                          className="px-3 py-2 bg-blue-900/50 border border-blue-500/40 text-blue-200 rounded-lg text-xs font-bold hover:bg-blue-800/50"
                        >
                          + Iron (Fe)
                        </button>
                        <button
                          onClick={() => handleAddAtomToBuilder('S')}
                          className="px-3 py-2 bg-amber-900/50 border border-amber-500/40 text-amber-200 rounded-lg text-xs font-bold hover:bg-amber-800/50"
                        >
                          + Sulfur (S)
                        </button>
                      </div>
                      <button
                        onClick={() => {
                          triggerAudio('tap');
                          setBuilderAtoms([]);
                          setBuiltCompound('Empty');
                        }}
                        className="w-full mt-3 px-3 py-2 bg-slate-900 border border-slate-800 text-slate-400 rounded-lg text-xs font-bold hover:text-white"
                      >
                        Clear Synthesizer
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Lab 5: Thermal Phase Burner */}
              {activeLabIndex === 4 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <div>
                    <StateChangeDiagram />
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
                      <h4 className="font-bold text-sky-400 text-sm mb-2">Phase Transition Heat Chamber</h4>
                      <p className="text-xs text-slate-400 mb-3">
                        Control thermal energy from -20°C up to 120°C to observe phase boundaries.
                      </p>
                      <div className="flex gap-2 mb-3">
                        <button
                          onClick={() => setHeatingTemp(-10)}
                          className="px-3 py-1.5 bg-blue-600 text-white rounded text-xs font-bold"
                        >
                          Ice (-10°C)
                        </button>
                        <button
                          onClick={() => setHeatingTemp(0)}
                          className="px-3 py-1.5 bg-cyan-600 text-white rounded text-xs font-bold"
                        >
                          Melting Point (0°C)
                        </button>
                        <button
                          onClick={() => setHeatingTemp(50)}
                          className="px-3 py-1.5 bg-amber-600 text-white rounded text-xs font-bold"
                        >
                          Water (50°C)
                        </button>
                        <button
                          onClick={() => setHeatingTemp(100)}
                          className="px-3 py-1.5 bg-rose-600 text-white rounded text-xs font-bold"
                        >
                          Boiling (100°C)
                        </button>
                      </div>
                      <div className="text-xs font-mono text-slate-300">
                        Selected Temperature: <span className="text-sky-400 font-bold">{heatingTemp}°C</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Observation Questions (Mandatory Render) */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-lg">
              <h3 className="text-lg font-bold text-slate-200 mb-4">Lab Observation Questions</h3>
              <div className="space-y-6">
                {OBSERVATION_QUESTIONS.map((oq, oqIdx) => (
                  <div key={oqIdx} className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
                    <p className="font-medium text-slate-200 mb-3 text-sm">{oq.question}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {oq.observableOptions.map((opt, oIdx) => (
                        <button
                          key={oIdx}
                          onClick={() => {
                            triggerAudio('tap');
                            setObservationAnswers((prev) => ({ ...prev, [oqIdx]: oIdx }));
                          }}
                          className={`p-3 rounded-lg text-xs text-left border transition-all ${
                            observationAnswers[oqIdx] === oIdx
                              ? oIdx === oq.correctIndex
                                ? 'bg-emerald-900/50 border-emerald-500 text-emerald-200'
                                : 'bg-rose-900/50 border-rose-500 text-rose-200'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
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

        {/* ========================================== */}
        {/* TAB 3: 22+ CHALLENGES EVALUATION ENGINE     */}
        {/* ========================================== */}
        {activeTab === 'challenges' && (
          <div className="space-y-6">
            {/* Challenge Progress Header */}
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-sky-400 bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/20">
                  Challenge {currentChallengeIndex + 1} of {CHALLENGES.length}
                </span>
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full uppercase border ${
                    currentChallenge.difficulty === 'foundation'
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                      : currentChallenge.difficulty === 'standard'
                      ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                      : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                  }`}
                >
                  {currentChallenge.difficulty} Tier
                </span>
              </div>
              <div className="text-xs font-mono text-slate-400">
                Competency: <span className="text-slate-200 font-semibold">{currentChallenge.competencyLevel}</span>
              </div>
            </div>

            {/* Main Challenge Card */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
              <h3 className="text-lg font-bold text-white mb-4">{currentChallenge.question}</h3>

              {/* Type 1: Multiple Choice */}
              {currentChallenge.type === 'multiple-choice' && currentChallenge.options && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                  {currentChallenge.options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        triggerAudio('tap');
                        setUserMCQChoice(idx);
                      }}
                      disabled={challengeFeedback?.submitted}
                      className={`p-4 rounded-xl text-left text-sm border transition-all ${
                        userMCQChoice === idx
                          ? 'bg-sky-600 border-sky-400 text-white font-semibold'
                          : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <span className="font-mono font-bold mr-2">{String.fromCharCode(65 + idx)}.</span>
                      {opt}
                    </button>
                  ))}
                </div>
              )}

              {/* Type 2: Numeric */}
              {currentChallenge.type === 'numeric' && (
                <div className="mb-6">
                  <label className="block text-xs font-mono text-slate-400 mb-2">
                    Enter your calculated numerical value:
                  </label>
                  <input
                    type="number"
                    value={userNumericInput}
                    onChange={(e) => setUserNumericInput(e.target.value)}
                    disabled={challengeFeedback?.submitted}
                    placeholder="e.g. 175"
                    className="w-full md:w-64 p-3 bg-slate-950 border border-slate-800 rounded-xl font-mono text-white focus:border-sky-500 outline-none"
                  />
                </div>
              )}

              {/* Type 3: Drag Sort */}
              {currentChallenge.type === 'drag-sort' && (
                <div className="mb-6 space-y-2">
                  <p className="text-xs text-slate-400 font-mono mb-2">
                    Click items to swap order into the correct sequence:
                  </p>
                  {userSortingOrder.map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        if (challengeFeedback?.submitted) return;
                        triggerAudio('tap');
                        // Simple swap logic with next item for interactive sorting
                        const nextIdx = (idx + 1) % userSortingOrder.length;
                        const copy = [...userSortingOrder];
                        const temp = copy[idx];
                        copy[idx] = copy[nextIdx];
                        copy[nextIdx] = temp;
                        setUserSortingOrder(copy);
                      }}
                      className="p-3 bg-slate-950 border border-slate-800 hover:border-sky-500 rounded-xl cursor-pointer text-sm font-medium flex justify-between items-center"
                    >
                      <span>
                        <span className="font-mono text-sky-400 font-bold mr-2">{idx + 1}.</span>
                        {item}
                      </span>
                      <span className="text-xs font-mono text-slate-500">⇄ Tap to Swap</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Type 4: Matching */}
              {currentChallenge.type === 'matching' && currentChallenge.matchingPairs && (
                <div className="mb-6 space-y-3">
                  {currentChallenge.matchingPairs.map((pair, pIdx) => (
                    <div key={pIdx} className="grid grid-cols-1 md:grid-cols-2 gap-3 items-center">
                      <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-sm font-semibold text-slate-200">
                        {pair.left}
                      </div>
                      <select
                        value={userMatchingState[pair.left] || ''}
                        onChange={(e) => {
                          triggerAudio('tap');
                          setUserMatchingState({
                            ...userMatchingState,
                            [pair.left]: e.target.value,
                          });
                        }}
                        disabled={challengeFeedback?.submitted}
                        className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-sky-300 outline-none focus:border-sky-500"
                      >
                        <option value="">-- Select Category Match --</option>
                        {currentChallenge.matchingPairs!.map((m, mIdx) => (
                          <option key={mIdx} value={m.right}>
                            {m.right}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              )}

              {/* Action Buttons & Feedback */}
              {!challengeFeedback?.submitted ? (
                <div className="flex gap-3">
                  <button
                    onClick={handleChallengeSubmit}
                    className="px-6 py-3 bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-sky-600/30 transition-all"
                  >
                    Submit Answer
                  </button>
                  <button
                    onClick={() => {
                      triggerAudio('hint');
                      setCurrentHintText(currentChallenge.hints[0]);
                      setShowHint(true);
                    }}
                    className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-bold rounded-xl"
                  >
                    Need Hint?
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div
                    className={`p-4 rounded-xl text-sm border ${
                      challengeFeedback.isCorrect
                        ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                        : 'bg-rose-950/60 border-rose-500 text-rose-200'
                    }`}
                  >
                    {challengeFeedback.message}
                  </div>
                  <button
                    onClick={handleNextChallenge}
                    className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-600/30 transition-all"
                  >
                    Next Challenge →
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* TAB 4: REAL-WORLD & MASTERY SUMMARY       */}
        {/* ========================================== */}
        {activeTab === 'summary' && (
          <div className="space-y-6">
            {/* Real World Activity (Mandatory Render) */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
              <span className="text-xs font-mono font-bold text-sky-400 uppercase tracking-widest">
                Industrial Application
              </span>
              <h3 className="text-xl font-bold text-white mt-1 mb-2">{REAL_WORLD_ACTIVITY.title}</h3>
              <p className="text-slate-300 text-sm mb-4 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {REAL_WORLD_ACTIVITY.steps.map((step, sIdx) => (
                  <div key={sIdx} className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs">
                    <span className="font-mono text-sky-400 font-bold block mb-1">Process Step {sIdx + 1}</span>
                    <span className="text-slate-300">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mastery Grid Across All 8 ICSE Nodes */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
              <h3 className="text-lg font-bold text-white mb-4">Node-by-Node Competency Mastery</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {ALL_NODE_IDS.map((nodeId) => {
                  const meta = NODE_ENRICHMENT[nodeId];
                  const masterLvl = Math.round(masteryProb(bktStates[nodeId]) * 100);
                  return (
                    <div key={nodeId} className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                      <div className="text-[10px] font-mono text-slate-500 uppercase">{nodeId}</div>
                      <div className="text-xs font-bold text-slate-200 line-clamp-1">{meta.title}</div>
                      <div className="flex justify-between items-center text-xs font-mono">
                        <span className="text-slate-400">Mastery:</span>
                        <span className="text-sky-400 font-bold">{masterLvl}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-sky-500 transition-all duration-300"
                          style={{ width: `${masterLvl}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Misconception Clearing Section */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
              <h3 className="text-lg font-bold text-amber-400 mb-4">Chemical Misconceptions Corrected</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MISCONCEPTIONS.map((misc) => (
                  <div key={misc.id} className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                    <div className="text-xs font-bold text-rose-400">Myth: "{misc.misconception}"</div>
                    <div className="text-xs text-slate-300 leading-relaxed">
                      <span className="text-emerald-400 font-bold">Correction: </span>
                      {misc.correction}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default C6_ChemistryMatteranditscompositionSim;