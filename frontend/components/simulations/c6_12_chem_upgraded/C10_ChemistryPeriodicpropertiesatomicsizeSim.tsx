'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ==========================================
// TYPE DEFINITIONS & INTERFACES
// ==========================================

export type NodeId =
  | 'c10_chem_001'
  | 'c10_chem_002'
  | 'c10_chem_003'
  | 'c10_chem_004'
  | 'c10_chem_005'
  | 'c10_chem_006'
  | 'c10_chem_007'
  | 'c10_chem_008'
  | 'c10_chem_009'
  | 'c10_chem_010';

export interface BKTState {
  pKnown: number;
  pLearn?: number;
  pSlip?: number;
  pGuess?: number;
}

export interface ElementData {
  symbol: string;
  name: string;
  z: number;
  period: number;
  group: number;
  atomicRadius: number; // in pm
  ionicRadius?: number; // in pm
  ionSymbol?: string;
  ionCharge?: number;
  electronConfig: number[]; // electrons per shell e.g. [2, 8, 1]
  valency: number;
  shieldingConstant: number; // Slater approx S
  zEff: number; // Z - S
  type: 'metal' | 'nonmetal' | 'metalloid' | 'noble';
  color: string;
}

export interface IsoelectronicSpecies {
  symbol: string;
  protons: number;
  electrons: number;
  charge: number;
  ionicRadius: number; // in pm
  configStr: string;
}

export interface ExplorationStep {
  title: string;
  instruction: string;
  interactionType: string;
  nodeId: NodeId;
}

export interface PredictionQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  verifyInstruction: string;
  nodeId: NodeId;
}

export interface ObservationQuestion {
  question: string;
  observableOptions: string[];
  correctIndex: number;
  nodeId: NodeId;
}

export interface Misconception {
  id: string;
  nodeId: NodeId;
  title: string;
  description: string;
  correction: string;
}

export interface Challenge {
  id: string;
  nodeId: NodeId;
  type: 'mcq' | 'sort' | 'numeric' | 'classify';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: 'recall' | 'understanding' | 'application' | 'analysis' | 'evaluation' | 'creativity';
  question: string;
  options?: string[];
  correctIndex?: number;
  correctAnswer?: number | string;
  sortItems?: string[];
  correctOrder?: string[];
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
}

// ==========================================
// CONSTANTS & NODE IDS
// ==========================================

const ALL_NODE_IDS: NodeId[] = [
  'c10_chem_001',
  'c10_chem_002',
  'c10_chem_003',
  'c10_chem_004',
  'c10_chem_005',
  'c10_chem_006',
  'c10_chem_007',
  'c10_chem_008',
  'c10_chem_009',
  'c10_chem_010',
];

// Section 1: SCENARIO
const SCENARIO = {
  title: 'X-Ray Crystallography & Atomic Architecture Workbench',
  intro: 'Welcome to the High-Precision Atomic Structure & Periodic Trends Laboratory! As a chemical physicist at the Atomic Metrology Institute, you are tasked with analyzing the spatial dimensions of atoms and ions using state-of-the-art electron density probes.',
  context: 'You will manipulate nuclear charges, observe shell collapses upon ionization, calculate Effective Nuclear Charge ($Z_{eff}$), and evaluate periodic trends across periods and groups to solve structural chemistry challenges.',
};

// Section 2: DISCOVERY_QUESTION
const DISCOVERY_QUESTION = {
  question: 'As you move from Sodium ($Z=11$) to Chlorine ($Z=17$) across Period 3, 6 extra protons and 6 extra electrons are added. How does the physical size of the neutral atom change?',
  options: [
    'The atom gets larger because adding 6 more electrons requires more physical space.',
    'The atom stays the same size because protons and electrons cancel out equally.',
    'The atom gets significantly smaller because the higher positive nuclear pull shrinks the shell radius.',
    'The atom expands initially then contracts abruptly at Group 15.',
  ],
  correctIndex: 2,
  hintAfter: 'Counterintuitively, adding subatomic particles across a period decreases atomic volume! Because electrons go into the SAME outer shell, the increased nuclear charge ($Z$) pulls the entire shell inward tighter.',
};

// Section 3: EXPLORATION_STEPS
const EXPLORATION_STEPS: ExplorationStep[] = [
  {
    title: 'Lab 1: Period Trend Visualizer & Shell Pull',
    instruction: 'Select Period 2 or Period 3 elements. Slide across the period from Group 1 to Group 17. Observe how the increasing nuclear charge ($Z$) increases $Z_{eff}$ and pulls the valence shell closer, shrinking atomic radius.',
    interactionType: 'period-slider-lab',
    nodeId: 'c10_chem_002',
  },
  {
    title: 'Lab 2: Group Trend Explorer & Energy Levels',
    instruction: 'Traverse down Group 1 (Alkali Metals) or Group 17 (Halogens). Observe how adding new principal quantum shells ($n=1, 2, 3, 4...$) dramatically increases atomic size despite increasing total nuclear charge.',
    interactionType: 'group-stack-lab',
    nodeId: 'c10_chem_004',
  },
  {
    title: 'Lab 3: Cation vs Anion Ionization Workbench',
    instruction: 'Take neutral Lithium, Sodium, and Chlorine atoms. Strip away valence electrons to form cations ($Li^+, Na^+$) or add electrons to form anions ($Cl^-$). Compare neutral atomic radius vs ionic radius.',
    interactionType: 'ionization-workbench',
    nodeId: 'c10_chem_005',
  },
  {
    title: 'Lab 4: Isoelectronic Series Comparator',
    instruction: 'Examine the $N^{3-}, O^{2-}, F^-, Ne, Na^+, Mg^{2+}, Al^{3+}$ series (all 10 electrons). Adjust nuclear charge $Z$ from 7 to 13 and observe how proton count inversely dictates ionic radius.',
    interactionType: 'isoelectronic-slider',
    nodeId: 'c10_chem_007',
  },
  {
    title: 'Lab 5: Slater Shielding Effect & Z_eff Calculator',
    instruction: 'Adjust core shell electron count ($S$) versus total atomic number ($Z$). Calculate Effective Nuclear Charge $Z_{eff} = Z - S$ and observe shell shielding efficiency in Period 2 vs Period 3.',
    interactionType: 'zeff-shielding-lab',
    nodeId: 'c10_chem_003',
  },
];

// Section 4: PREDICTION_QUESTIONS
const PREDICTION_QUESTIONS: PredictionQuestion[] = [
  {
    question: 'Predict: If an atom of Potassium ($K, Z=19$) loses its outer $4s^1$ electron to form $K^+$, what will happen to its radius?',
    options: [
      'The radius will increase due to excess positive charge expanding the cloud.',
      'The radius will decrease by nearly 50% because an entire outer shell ($n=4$) is removed and $Z_{eff}$ increases for remaining electrons.',
      'The radius remains exactly the same because the nucleus did not change.',
      'The radius doubles because potassium is a reactive alkali metal.',
    ],
    correctIndex: 1,
    verifyInstruction: 'In Lab 3, select Potassium ($K$), click "Ionize to Cation", and compare the $n=4$ vs $n=3$ electron shell radius.',
    nodeId: 'c10_chem_005',
  },
  {
    question: 'Predict: Among the isoelectronic species $O^{2-}, F^-, Na^+,$ and $Mg^{2+}$, which species has the SMALLEST ionic radius?',
    options: [
      '$O^{2-}$ (8 protons pulling 10 electrons)',
      '$F^-$ (9 protons pulling 10 electrons)',
      '$Na^+$ (11 protons pulling 10 electrons)',
      '$Mg^{2+}$ (12 protons pulling 10 electrons)',
    ],
    correctIndex: 3,
    verifyInstruction: 'In Lab 4, set the isoelectronic series view and sort species by proton count ($Z$). Notice how $Mg^{2+}$ ($Z=12$) pulls the 10 electrons closest to the nucleus.',
    nodeId: 'c10_chem_007',
  },
];

// Section 5: OBSERVATION_QUESTIONS
const OBSERVATION_QUESTIONS: ObservationQuestion[] = [
  {
    question: 'What do you observe about the Effective Nuclear Charge ($Z_{eff}$) as you move from Lithium ($Z=3$) to Fluorine ($Z=9$) in Period 2?',
    observableOptions: [
      '$Z_{eff}$ stays constant at +1 throughout the period.',
      '$Z_{eff}$ increases steadily from +1.3 to +5.2, drawing the valence shell significantly closer.',
      '$Z_{eff}$ drops to zero at Fluorine because Fluorine is highly electronegative.',
      '$Z_{eff}$ fluctuates randomly depending on valence spin.',
    ],
    correctIndex: 1,
    nodeId: 'c10_chem_003',
  },
  {
    question: 'What happens to the radius when a neutral Chlorine atom ($Cl, r=99\\text{ pm}$) gains an electron to become a Chloride ion ($Cl^-, r=181\\text{ pm}$)?',
    observableOptions: [
      'The radius shrinks because extra negative charge contracts the nucleus.',
      'The radius increases dramatically because inter-electronic repulsions expand the valence cloud while nuclear charge remains constant ($Z=17$).',
      'The radius stays at 99 pm because no new shell was added.',
      'The radius drops to zero as the electron neutralizes the charge.',
    ],
    correctIndex: 1,
    nodeId: 'c10_chem_006',
  },
];

// Section 6: REAL_WORLD_ACTIVITY
const REAL_WORLD_ACTIVITY = {
  title: 'Materials Engineering: Designing Solid-State Battery Electrolytes & Semiconductor Doping',
  description: 'In modern semiconductor lithography and lithium-ion battery design, lattice constant stability depends directly on ionic radii. You are designing a solid-state electrolyte by substituting $Na^+$ ($102\\text{ pm}$) into a crystal lattice with $K^+$ ($138\\text{ pm}$) and analyzing lattice strain.',
  steps: [
    'Step 1: Determine parent atomic and ionic radii using X-ray diffraction metrology ($K^+ = 138\\text{ pm}, Na^+ = 102\\text{ pm}, Li^+ = 76\\text{ pm}$).',
    'Step 2: Calculate percentage radius reduction upon cation formation for Sodium ($Na\\text{ atom } = 186\\text{ pm} \\rightarrow Na^+ = 102\\text{ pm}$, a 45.1% reduction).',
    'Step 3: Analyze inter-electronic repulsion expansion in Anionic dopants ($F\\text{ atom } = 64\\text{ pm} \\rightarrow F^- = 133\\text{ pm}$, a 107.8% size increase).',
    'Step 4: Select optimal dopant ion based on matching radii tolerances within $\\pm 5\\%$ to prevent lattice fracturing during thermal cycling.',
  ],
};

// MISCONCEPTIONS (Expanded to 6)
const MISCONCEPTIONS: Misconception[] = [
  {
    id: 'misc_001',
    nodeId: 'c10_chem_002',
    title: 'Atomic size increases across a period due to higher atomic number',
    description: 'Students often believe that adding more protons and electrons across a period makes the atom heavier and physically larger.',
    correction: 'Across a period, valence electrons enter the SAME shell while nuclear charge increases. This increases Effective Nuclear Charge ($Z_{eff}$), pulling the valence shell closer and DECREASING atomic radius from left to right.',
  },
  {
    id: 'misc_002',
    nodeId: 'c10_chem_005',
    title: 'Cations are larger than neutral parent atoms',
    description: 'Students frequently think forming a positive ion expands size due to positive charge expansion or identity retention.',
    correction: 'A cation is ALWAYS smaller than its neutral parent atom. Valence electron loss often strips the outermost shell completely, and the remaining electrons feel a greater $Z_{eff}$ per electron.',
  },
  {
    id: 'misc_003',
    nodeId: 'c10_chem_003',
    title: 'Effective nuclear charge is identical to total nuclear charge',
    description: 'Students assume valence electrons experience the full positive charge of all protons in the nucleus.',
    correction: 'Inner-shell electrons shield outer electrons from the total positive charge. Effective nuclear charge is $Z_{eff} = Z - S$, which is strictly less than $Z$.',
  },
  {
    id: 'misc_004',
    nodeId: 'c10_chem_007',
    title: 'Isoelectronic ions have identical radii',
    description: 'Students believe species with identical electron counts ($N^{3-}, O^{2-}, F^-, Na^+, Mg^{2+}, Al^{3+}$) must have equal radii.',
    correction: 'Although electron count is identical (10 $e^-$), proton count ($Z$) differs! Higher nuclear charge exerts a stronger attraction on the 10 electrons, shrinking the ion.',
  },
  {
    id: 'misc_005',
    nodeId: 'c10_chem_004',
    title: 'Atomic size decreases down a group due to massive nuclear charge',
    description: 'Students reason that because nuclear charge increases down a group ($Z=3 \\rightarrow 11 \\rightarrow 19$), the pull shrinks the atom.',
    correction: 'Moving down a group adds a whole NEW principal quantum shell ($n=2, 3, 4...$). The increased shell distance completely outweighs the nuclear charge pull, making atoms larger down a group.',
  },
  {
    id: 'misc_006',
    nodeId: 'c10_chem_006',
    title: 'Anions shrink because electrons push inwards',
    description: 'Students assume adding an electron to an atom squeezes the cloud tighter.',
    correction: 'Adding an electron increases inter-electronic repulsions within the valence shell and decreases the effective nuclear pull per electron, expanding the electron cloud ($r(Cl^-) > r(Cl)$).',
  },
];

// PERIODIC DATA TABLE
const PERIODIC_DATABASE: Record<string, ElementData> = {
  Li: { symbol: 'Li', name: 'Lithium', z: 3, period: 2, group: 1, atomicRadius: 152, ionicRadius: 76, ionSymbol: 'Li⁺', ionCharge: 1, electronConfig: [2, 1], valency: 1, shieldingConstant: 1.7, zEff: 1.3, type: 'metal', color: '#ff6b6b' },
  Be: { symbol: 'Be', name: 'Beryllium', z: 4, period: 2, group: 2, atomicRadius: 112, ionicRadius: 45, ionSymbol: 'Be²⁺', ionCharge: 2, electronConfig: [2, 2], valency: 2, shieldingConstant: 2.05, zEff: 1.95, type: 'metal', color: '#4ecdc4' },
  B:  { symbol: 'B',  name: 'Boron', z: 5, period: 2, group: 13, atomicRadius: 88, ionicRadius: 27, ionSymbol: 'B³⁺', ionCharge: 3, electronConfig: [2, 3], valency: 3, shieldingConstant: 2.4, zEff: 2.6, type: 'metalloid', color: '#ffe66d' },
  C:  { symbol: 'C',  name: 'Carbon', z: 6, period: 2, group: 14, atomicRadius: 77, ionicRadius: 16, ionSymbol: 'C⁴⁺', ionCharge: 4, electronConfig: [2, 4], valency: 4, shieldingConstant: 2.75, zEff: 3.25, type: 'nonmetal', color: '#1a535c' },
  N:  { symbol: 'N',  name: 'Nitrogen', z: 7, period: 2, group: 15, atomicRadius: 75, ionicRadius: 171, ionSymbol: 'N³⁻', ionCharge: -3, electronConfig: [2, 5], valency: 3, shieldingConstant: 3.1, zEff: 3.9, type: 'nonmetal', color: '#457b9d' },
  O:  { symbol: 'O',  name: 'Oxygen', z: 8, period: 2, group: 16, atomicRadius: 73, ionicRadius: 140, ionSymbol: 'O²⁻', ionCharge: -2, electronConfig: [2, 6], valency: 2, shieldingConstant: 3.45, zEff: 4.55, type: 'nonmetal', color: '#e63946' },
  F:  { symbol: 'F',  name: 'Fluorine', z: 9, period: 2, group: 17, atomicRadius: 71, ionicRadius: 133, ionSymbol: 'F⁻', ionCharge: -1, electronConfig: [2, 7], valency: 1, shieldingConstant: 3.8, zEff: 5.2, type: 'nonmetal', color: '#a8dede' },
  Ne: { symbol: 'Ne', name: 'Neon', z: 10, period: 2, group: 18, atomicRadius: 69, ionicRadius: 69, ionSymbol: 'Ne', ionCharge: 0, electronConfig: [2, 8], valency: 0, shieldingConstant: 4.15, zEff: 5.85, type: 'noble', color: '#b5e2fa' },
  
  Na: { symbol: 'Na', name: 'Sodium', z: 11, period: 3, group: 1, atomicRadius: 186, ionicRadius: 102, ionSymbol: 'Na⁺', ionCharge: 1, electronConfig: [2, 8, 1], valency: 1, shieldingConstant: 8.8, zEff: 2.2, type: 'metal', color: '#ff9f1c' },
  Mg: { symbol: 'Mg', name: 'Magnesium', z: 12, period: 3, group: 2, atomicRadius: 160, ionicRadius: 72, ionSymbol: 'Mg²⁺', ionCharge: 2, electronConfig: [2, 8, 2], valency: 2, shieldingConstant: 9.15, zEff: 2.85, type: 'metal', color: '#2ec4b6' },
  Al: { symbol: 'Al', name: 'Aluminium', z: 13, period: 3, group: 13, atomicRadius: 143, ionicRadius: 54, ionSymbol: 'Al³⁺', ionCharge: 3, electronConfig: [2, 8, 3], valency: 3, shieldingConstant: 9.5, zEff: 3.5, type: 'metal', color: '#e71d36' },
  Si: { symbol: 'Si', name: 'Silicon', z: 14, period: 3, group: 14, atomicRadius: 118, ionicRadius: 40, ionSymbol: 'Si⁴⁺', ionCharge: 4, electronConfig: [2, 8, 4], valency: 4, shieldingConstant: 9.85, zEff: 4.15, type: 'metalloid', color: '#ff9f1c' },
  P:  { symbol: 'P',  name: 'Phosphorus', z: 15, period: 3, group: 15, atomicRadius: 110, ionicRadius: 212, ionSymbol: 'P³⁻', ionCharge: -3, electronConfig: [2, 8, 5], valency: 3, shieldingConstant: 10.2, zEff: 4.8, type: 'nonmetal', color: '#9b5de5' },
  S:  { symbol: 'S',  name: 'Sulfur', z: 16, period: 3, group: 16, atomicRadius: 103, ionicRadius: 184, ionSymbol: 'S²⁻', ionCharge: -2, electronConfig: [2, 8, 6], valency: 2, shieldingConstant: 10.55, zEff: 5.45, type: 'nonmetal', color: '#f15bb5' },
  Cl: { symbol: 'Cl', name: 'Chlorine', z: 17, period: 3, group: 17, atomicRadius: 99, ionicRadius: 181, ionSymbol: 'Cl⁻', ionCharge: -1, electronConfig: [2, 8, 7], valency: 1, shieldingConstant: 10.9, zEff: 6.1, type: 'nonmetal', color: '#00bbf9' },
  Ar: { symbol: 'Ar', name: 'Argon', z: 18, period: 3, group: 18, atomicRadius: 97, ionicRadius: 97, ionSymbol: 'Ar', ionCharge: 0, electronConfig: [2, 8, 8], valency: 0, shieldingConstant: 11.25, zEff: 6.75, type: 'noble', color: '#00f5d4' },

  K:  { symbol: 'K',  name: 'Potassium', z: 19, period: 4, group: 1, atomicRadius: 227, ionicRadius: 138, ionSymbol: 'K⁺', ionCharge: 1, electronConfig: [2, 8, 8, 1], valency: 1, shieldingConstant: 16.8, zEff: 2.2, type: 'metal', color: '#80b918' },
  Ca: { symbol: 'Ca', name: 'Calcium', z: 20, period: 4, group: 2, atomicRadius: 197, ionicRadius: 100, ionSymbol: 'Ca²⁺', ionCharge: 2, electronConfig: [2, 8, 8, 2], valency: 2, shieldingConstant: 17.15, zEff: 2.85, type: 'metal', color: '#55a630' },
  Br: { symbol: 'Br', name: 'Bromine', z: 35, period: 4, group: 17, atomicRadius: 114, ionicRadius: 196, ionSymbol: 'Br⁻', ionCharge: -1, electronConfig: [2, 8, 18, 7], valency: 1, shieldingConstant: 27.4, zEff: 7.6, type: 'nonmetal', color: '#aacc00' },
  Rb: { symbol: 'Rb', name: 'Rubidium', z: 37, period: 5, group: 1, atomicRadius: 248, ionicRadius: 152, ionSymbol: 'Rb⁺', ionCharge: 1, electronConfig: [2, 8, 18, 8, 1], valency: 1, shieldingConstant: 34.8, zEff: 2.2, type: 'metal', color: '#bfd200' },
  Cs: { symbol: 'Cs', name: 'Caesium', z: 55, period: 6, group: 1, atomicRadius: 265, ionicRadius: 167, ionSymbol: 'Cs⁺', ionCharge: 1, electronConfig: [2, 8, 18, 18, 8, 1], valency: 1, shieldingConstant: 52.8, zEff: 2.2, type: 'metal', color: '#d4d700' },
};

const ISOELECTRONIC_SERIES_10: IsoelectronicSpecies[] = [
  { symbol: 'N³⁻', protons: 7, electrons: 10, charge: -3, ionicRadius: 171, configStr: '1s² 2s² 2p⁶' },
  { symbol: 'O²⁻', protons: 8, electrons: 10, charge: -2, ionicRadius: 140, configStr: '1s² 2s² 2p⁶' },
  { symbol: 'F⁻', protons: 9, electrons: 10, charge: -1, ionicRadius: 133, configStr: '1s² 2s² 2p⁶' },
  { symbol: 'Ne', protons: 10, electrons: 10, charge: 0, ionicRadius: 69, configStr: '1s² 2s² 2p⁶' },
  { symbol: 'Na⁺', protons: 11, electrons: 10, charge: 1, ionicRadius: 102, configStr: '1s² 2s² 2p⁶' },
  { symbol: 'Mg²⁺', protons: 12, electrons: 10, charge: 2, ionicRadius: 72, configStr: '1s² 2s² 2p⁶' },
  { symbol: 'Al³⁺', protons: 13, electrons: 10, charge: 3, ionicRadius: 54, configStr: '1s² 2s² 2p⁶' },
];

// Section 7: CHALLENGES ARRAY (22 Progressive Challenges)
const CHALLENGES: Challenge[] = [
  // FOUNDATION TIER (1 - 7)
  {
    id: 'c1',
    nodeId: 'c10_chem_001',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Define Atomic Radius as understood in modern chemical metrology.',
    options: [
      'The exact distance to the farthest stationary electron in an isolated atom.',
      'One half of the distance between the nuclei of two covalently bonded homonuclear atoms.',
      'The total circumference of the outer shell electron path.',
      'The mass of the nucleus divided by the total electron volume.',
    ],
    correctIndex: 1,
    explanation: 'Atomic radius (specifically covalent radius) is defined as half the distance between the nuclei of two identical bonded atoms.',
    hints: [
      'Think about how atoms bond in diatomic molecules like Cl₂ or H₂.',
      'Electrons exist in probability clouds, so we measure inter-nuclear distance.',
      'Divide the bond length between identical atoms by 2.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'c2',
    nodeId: 'c10_chem_002',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'How does atomic radius change as you move from left to right across Period 3 (Na to Cl)?',
    options: [
      'Atomic radius consistently increases due to higher electron count.',
      'Atomic radius decreases because increasing nuclear charge pulls the same shell closer.',
      'Atomic radius remains completely constant across the entire period.',
      'Atomic radius decreases first then doubles at Phosphorus.',
    ],
    correctIndex: 1,
    explanation: 'Across a period, nuclear charge ($Z$) increases while electrons enter the same shell. $Z_{eff}$ increases, pulling the shell inward and shrinking atomic size.',
    hints: [
      'Does the number of electron shells change across a period?',
      'More protons pull the valence shell stronger.',
      'Higher Effective Nuclear Charge = smaller radius.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'c3',
    nodeId: 'c10_chem_004',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the principal cause for the trend in atomic size down Group 1 (Li to Cs)?',
    options: [
      'Increased nuclear magnetic pulse pushes outer electrons away.',
      'Addition of successive principal energy levels (electron shells).',
      'Decrease in total proton count.',
      'Electron spin cancellation in the inner core.',
    ],
    correctIndex: 1,
    explanation: 'Down a group, a new principal quantum shell ($n=2 \\rightarrow n=3 \\rightarrow n=4$) is added for each element, increasing atomic radius.',
    hints: [
      'Look at the electron shell configurations: Li is [2,1], Na is [2,8,1], K is [2,8,8,1].',
      'Each step down adds a whole new energy shell layer.',
      'New shells increase the physical distance from nucleus to valence electron.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'c4',
    nodeId: 'c10_chem_005',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'How does the radius of a sodium cation ($Na^+$) compare to its neutral parent sodium atom ($Na$)?',
    options: [
      '$Na^+$ is larger because positive charge pushes electrons outward.',
      '$Na^+$ is smaller because losing an electron removes the outermost shell ($n=3$) and increases $Z_{eff}$ per electron.',
      '$Na^+$ and $Na$ have identical radii of 186 pm.',
      '$Na^+$ is zero size.',
    ],
    correctIndex: 1,
    explanation: '$Na$ ([2,8,1], $r=186\\text{ pm}$) loses its $3s$ electron to form $Na^+$ ([2,8], $r=102\\text{ pm}$). Shell removal and higher $Z_{eff}$ make cations smaller than parent atoms.',
    hints: [
      'How many shells does Na have vs Na⁺?',
      'Na has 3 shells [2,8,1]; Na⁺ has only 2 shells [2,8].',
      'Loss of an electron reduces shell count and electron-electron repulsion.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'c5',
    nodeId: 'c10_chem_006',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why is a chloride anion ($Cl^-$) larger than a neutral chlorine atom ($Cl$)?',
    options: [
      'Adding an electron increases inter-electronic repulsion, expanding the electron cloud over the fixed nuclear charge ($Z=17$).',
      'The nucleus loses protons when forming an anion.',
      'The added electron occupies a brand new $n=4$ shell.',
      'Chlorine shrinks when it gains electrons.',
    ],
    correctIndex: 0,
    explanation: 'In $Cl^-$ (18 $e^-$), 17 protons pull 18 electrons. Increased electron-electron repulsion expands the shell volume from 99 pm ($Cl$) to 181 pm ($Cl^-$).',
    hints: [
      'Does proton count change when forming an anion? No, $Z=17$.',
      'More electrons in the same shell repel each other more.',
      '17 protons pulling 18 electrons = weaker pull per electron.',
    ],
    misconceptionIndex: 5,
  },
  {
    id: 'c6',
    nodeId: 'c10_chem_003',
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'Calculate the Effective Nuclear Charge ($Z_{eff}$) for a Lithium valence electron ($Z=3$), given a shielding constant $S = 1.70$.',
    correctAnswer: 1.3,
    explanation: 'Formula: $Z_{eff} = Z - S = 3 - 1.70 = 1.30$.',
    hints: [
      'Use the formula Z_eff = Z - S.',
      'Atomic number of Lithium Z = 3.',
      'Subtract 1.70 from 3.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'c7',
    nodeId: 'c10_chem_008',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which electron shell provides the most effective shielding/screening for valence electrons?',
    options: [
      'Valence shell electrons shield other valence electrons most effectively.',
      'Inner core closed shells ($1s, 2s, 2p$) shield outer electrons most effectively.',
      'Unoccupied outer subshells shield the nucleus.',
      'All electrons provide 100% equal shielding regardless of orbital location.',
    ],
    correctIndex: 1,
    explanation: 'Inner core electrons lie between the nucleus and valence shell, screening the positive nuclear charge most effectively (Slater contribution = 0.85 to 1.00).',
    hints: [
      'Where are core electrons located relative to the valence shell?',
      'Core electrons stand directly between positive nucleus and valence shell.',
      'Inner electrons screen outer electrons from nuclear pull.',
    ],
  },

  // STANDARD TIER (8 - 15)
  {
    id: 'c8',
    nodeId: 'c10_chem_007',
    type: 'sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the following isoelectronic species in order of INCREASING ionic radius (smallest first): $Mg^{2+}, Na^+, F^-, O^{2-}$.',
    sortItems: ['$O^{2-}$', '$Na^+$', '$Mg^{2+}$', '$F^-$'],
    correctOrder: ['$Mg^{2+}$', '$Na^+$', '$F^-$', '$O^{2-}$'],
    explanation: 'For isoelectronic species (all 10 $e^-$), radius decreases as nuclear charge increases: $Mg^{2+} (Z=12) < Na^+ (Z=11) < F^- (Z=9) < O^{2-} (Z=8)$.',
    hints: [
      'Check proton count Z for each: Mg=12, Na=11, F=9, O=8.',
      'Higher proton count = stronger attraction = smaller radius.',
      'Smallest is Mg²⁺ (12 protons), largest is O²⁻ (8 protons).',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'c9',
    nodeId: 'c10_chem_002',
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Compare the atomic radii of Sodium ($Na, Z=11, 186\\text{ pm}$) and Magnesium ($Mg, Z=12, 160\\text{ pm}$). Why is $Mg$ smaller than $Na$?',
    options: [
      'Magnesium has fewer electron shells than Sodium.',
      'Magnesium has a higher nuclear charge ($Z=12$) with electrons in the same shell ($n=3$), producing higher $Z_{eff}$ ($2.85$ vs $2.20$).',
      'Sodium is a non-metal whereas Magnesium is a metal.',
      'Magnesium nucleus repels its electrons more.',
    ],
    correctIndex: 1,
    explanation: 'Both Na and Mg have 3 electron shells ($n=3$). Mg has 12 protons pulling valence electrons vs Na with 11 protons, increasing $Z_{eff}$ and shrinking Mg.',
    hints: [
      'Check their period: both Na and Mg are in Period 3.',
      'Both have 3 electron shells.',
      'Mg has 12 protons while Na has 11 protons.',
    ],
  },
  {
    id: 'c10',
    nodeId: 'c10_chem_003',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Calculate $Z_{eff}$ for Fluorine ($Z=9$) if inner core shell shielding $S = 3.80$.',
    correctAnswer: 5.2,
    explanation: '$Z_{eff} = Z - S = 9 - 3.80 = 5.20$. High $Z_{eff}$ explains Fluorine\'s tiny radius (71 pm).',
    hints: [
      'Z for Fluorine is 9.',
      'Subtract S = 3.80 from 9.',
      '9 - 3.8 = 5.2.',
    ],
  },
  {
    id: 'c11',
    nodeId: 'c10_chem_005',
    type: 'sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange species of Sodium in order of DECREASING size (largest first): $Na, Na^+$.',
    sortItems: ['$Na^+$', '$Na$'],
    correctOrder: ['$Na$', '$Na^+$'],
    explanation: 'Neutral $Na$ (186 pm) is significantly larger than cation $Na^+$ (102 pm) due to loss of the outer $3s$ shell.',
    hints: [
      'Cations are always smaller than neutral parent atoms.',
      'Na atom has 3 shells; Na⁺ has 2 shells.',
      'Largest is neutral Na.',
    ],
  },
  {
    id: 'c12',
    nodeId: 'c10_chem_006',
    type: 'sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange species of Chlorine in order of INCREASING size (smallest first): $Cl^-, Cl$.',
    sortItems: ['$Cl^-$', '$Cl$'],
    correctOrder: ['$Cl$', '$Cl^-$'],
    explanation: 'Neutral $Cl$ (99 pm) is smaller than anion $Cl^-$ (181 pm) due to electron-electron repulsion expanding the valence shell.',
    hints: [
      'Anions are always larger than neutral parent atoms.',
      'Cl atom has 17 e⁻; Cl⁻ has 18 e⁻.',
      'Smallest is neutral Cl.',
    ],
  },
  {
    id: 'c13',
    nodeId: 'c10_chem_010',
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Which element in Period 2 has the LARGEST atomic radius?',
    options: ['Fluorine ($F$)', 'Lithium ($Li$)', 'Neon ($Ne$)', 'Carbon ($C$)'],
    correctIndex: 1,
    explanation: 'Atomic size decreases across Period 2 from left to right. Lithium (Group 1) has the lowest $Z_{eff}$ in Period 2, giving it the largest radius (152 pm).',
    hints: [
      'Atomic size decreases from left to right across a period.',
      'The element furthest to the left in Period 2 has the largest radius.',
      'Group 1 element of Period 2 is Lithium.',
    ],
  },
  {
    id: 'c14',
    nodeId: 'c10_chem_008',
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why does Potassium ($K, r=227\\text{ pm}$) have a larger atomic radius than Sodium ($Na, r=186\\text{ pm}$), despite $K$ having 8 more positive protons?',
    options: [
      'Potassium has fewer protons than Sodium.',
      'The extra core electron shell ($n=4$ vs $n=3$) shields the valence electron and places it at a much greater average distance, outweighing nuclear attraction.',
      'Sodium electrons orbit at relativistic speeds.',
      'Potassium is a noble gas.',
    ],
    correctIndex: 1,
    explanation: 'Adding a principal energy shell ($n=4$) increases spatial extent and core shielding, overwhelming the pull of 8 additional protons.',
    hints: [
      'Compare quantum numbers n for Na (n=3) and K (n=4).',
      'Addition of an entire shell dominates over nuclear charge increase.',
      'Distance increases with n².',
    ],
  },
  {
    id: 'c15',
    nodeId: 'c10_chem_009',
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'What happens to atomic radius across the 3d transition metal series (Scandium to Copper)?',
    options: [
      'Atomic radius drops to zero instantly.',
      'Atomic radius remains relatively constant or decreases very slowly because electrons are added to an inner $(n-1)d$ subshell, which shields outer $4s$ electrons efficiently.',
      'Atomic radius increases by 500% at Iron.',
      'Atomic radius oscillates wildly between 10 pm and 1000 pm.',
    ],
    correctIndex: 1,
    explanation: 'In transition metals, electrons enter inner $(d)$ orbitals. Inner $d$-electrons shield outer $s$-electrons, making the decrease in atomic radius across transition series very gradual.',
    hints: [
      'Where are electrons added in transition series? In the inner (n-1)d subshell.',
      'Inner d-electrons shield the outer 4s electrons.',
      'The net increase in Z_eff is small, so radius changes very slowly.',
    ],
  },

  // ADVANCED TIER (16 - 22)
  {
    id: 'c16',
    nodeId: 'c10_chem_007',
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Given the isoelectronic series $N^{3-}, O^{2-}, F^-, Na^+, Mg^{2+}, Al^{3+}$, if $Al^{3+}$ ($Z=13$) has an ionic radius of $54\\text{ pm}$ and $N^{3-}$ ($Z=7$) has an ionic radius of $171\\text{ pm}$, calculate the ratio of ionic radius $r(N^{3-}) / r(Al^{3+})$ rounded to 2 decimal places.',
    correctAnswer: 3.17,
    explanation: 'Ratio = $171 / 54 = 3.1666... \\approx 3.17$. Demonstrates the strong inverse dependence of radius on nuclear charge for equal electron clouds.',
    hints: [
      'Divide 171 by 54.',
      '171 / 54 = 3.1666...',
      'Round to two decimal places: 3.17.',
    ],
  },
  {
    id: 'c17',
    nodeId: 'c10_chem_003',
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Using Slater\'s rules simplified, for Sodium ($Z=11, [1s^2 2s^2 2p^6 3s^1]$), the 10 inner core electrons provide shielding $S = 8.80$. Calculate $Z_{eff}$ for the $3s$ valence electron.',
    correctAnswer: 2.2,
    explanation: '$Z_{eff} = Z - S = 11 - 8.80 = 2.20$.',
    hints: [
      'Z = 11 for Sodium.',
      'S = 8.80.',
      'Z_eff = 11 - 8.80 = 2.20.',
    ],
  },
  {
    id: 'c18',
    nodeId: 'c10_chem_001',
    type: 'sort',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Order the following elements in DECREASING atomic radius (largest first): $K, Na, Mg, Cl, F$.',
    sortItems: ['$Cl$', '$Na$', '$F$', '$K$', '$Mg$'],
    correctOrder: ['$K$', '$Na$', '$Mg$', '$Cl$', '$F$'],
    explanation: 'Trends combined: Group 1 down ($K > Na > Mg$). Across Period 3 ($Na > Mg > Cl$). Across Period 2 ($Cl > F$). Order: $K (227) > Na (186) > Mg (160) > Cl (99) > F (71)$.',
    hints: [
      'K has 4 shells (largest).',
      'Na, Mg, Cl have 3 shells; Na > Mg > Cl across Period 3.',
      'F has 2 shells (smallest).',
    ],
  },
  {
    id: 'c19',
    nodeId: 'c10_chem_005',
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'An unknown element $X$ forms a stable cation $X^{2+}$ with an ionic radius of $72\\text{ pm}$. Its neutral atom $X$ has an atomic radius of $160\\text{ pm}$ and electron configuration $[2, 8, 2]$. Identify element $X$.',
    options: ['Sodium ($Na$)', 'Magnesium ($Mg$)', 'Calcium ($Ca$)', 'Aluminium ($Al$)'],
    correctIndex: 1,
    explanation: 'Electron configuration [2, 8, 2] corresponds to $Z = 2 + 8 + 2 = 12$, which is Magnesium ($Mg$). $Mg^{2+}$ has radius 72 pm.',
    hints: [
      'Count total electrons in neutral atom: 2 + 8 + 2 = 12.',
      'Atomic number Z = 12.',
      'Element 12 in periodic table is Magnesium.',
    ],
  },
  {
    id: 'c20',
    nodeId: 'c10_chem_006',
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Why is the radius of $S^{2-}$ ($184\\text{ pm}$) significantly larger than the radius of $Cl^-$ ($181\\text{ pm}$), even though both ions are isoelectronic with Argon (18 electrons)?',
    options: [
      'Sulfur has a lower nuclear charge ($Z=16$) than Chlorine ($Z=17$), so 16 protons exert less attractive pull on 18 electrons than 17 protons do.',
      'Sulfur has an extra energy shell compared to Chlorine.',
      'Chlorine is a gas while Sulfur is a solid at room temp.',
      'S²⁻ has 20 electrons instead of 18.',
    ],
    correctIndex: 0,
    explanation: 'Both $S^{2-}$ and $Cl^-$ have 18 electrons ([2,8,8]). $S^{2-}$ has $Z=16$ protons pulling 18 electrons, while $Cl^-$ has $Z=17$ protons. Fewer protons = weaker pull = larger radius.',
    hints: [
      'Check nuclear charges Z: Sulfur Z=16, Chlorine Z=17.',
      'Both have 18 electrons.',
      'Fewer protons pulling 18 electrons allows the cloud to expand.',
    ],
  },
  {
    id: 'c21',
    nodeId: 'c10_chem_007',
    type: 'sort',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Arrange the following species in INCREASING order of size: $Ca^{2+}, K^+, Ar, Cl^-, S^{2-}$.',
    sortItems: ['$S^{2-}$', '$Ar$', '$K^+$', '$Ca^{2+}$', '$Cl^-$'],
    correctOrder: ['$Ca^{2+}$', '$K^+$', '$Ar$', '$Cl^-$', '$S^{2-}$'],
    explanation: 'Isoelectronic series with 18 electrons. Protons: $Ca^{2+}(20) > K^+(19) > Ar(18) > Cl^-(17) > S^{2-}(16)$. Size is inverse to proton count: $Ca^{2+} < K^+ < Ar < Cl^- < S^{2-}$.',
    hints: [
      'All species have 18 electrons.',
      'Compare proton numbers: Ca=20, K=19, Ar=18, Cl=17, S=16.',
      'Highest proton count gives smallest radius.',
    ],
  },
  {
    id: 'c22',
    nodeId: 'c10_chem_010',
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Predict the relative atomic radius of Rubidium ($Rb, Z=37$) compared to Potassium ($K, Z=19$) and Caesium ($Cs, Z=55$).',
    options: [
      '$r(Rb)$ is smaller than $r(K)$.',
      '$r(K) < r(Rb) < r(Cs)$ because atomic radius increases down Group 1 ($227\\text{ pm} < 248\\text{ pm} < 265\\text{ pm}$).',
      '$r(Rb)$ is larger than $r(Cs)$.',
      'All Group 1 elements have identical atomic radii.',
    ],
    correctIndex: 1,
    explanation: 'Down Group 1: $K (n=4, 227\\text{ pm}) < Rb (n=5, 248\\text{ pm}) < Cs (n=6, 265\\text{ pm})$. Each step adds a quantum shell.',
    hints: [
      'Group 1 order: K (Period 4), Rb (Period 5), Cs (Period 6).',
      'Atomic radius strictly increases down a group.',
      'Rb lies between K and Cs.',
    ],
  },
];

// ==========================================
// SVG DIAGRAM COMPONENTS (Section 8)
// ==========================================

// Diagram 1: Atomic Radius definition & shell contraction
const AtomicRadiusDiagram: React.FC<{ element: ElementData; isIon?: boolean }> = ({ element, isIon = false }) => {
  const radiusPm = isIon && element.ionicRadius ? element.ionicRadius : element.atomicRadius;
  // Map pm to visual pixels (scale approx 0.8 px per pm)
  const visualRadius = Math.max(30, Math.min(140, radiusPm * 0.55));
  const numShells = isIon && element.ionCharge && element.ionCharge > 0 
    ? element.electronConfig.length - 1 
    : element.electronConfig.length;

  return (
    <svg width="340" height="320" className="mx-auto bg-slate-900/90 rounded-xl border border-slate-700 shadow-inner">
      <defs>
        <radialGradient id="nucleusGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ff4d4d" />
          <stop offset="100%" stopColor="#990000" />
        </radialGradient>
        <radialGradient id="cloudGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={element.color} stopOpacity="0.6" />
          <stop offset="70%" stopColor={element.color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={element.color} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Grid background */}
      <pattern id="gridPattern" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#334155" strokeWidth="0.5" />
      </pattern>
      <rect width="340" height="320" fill="url(#gridPattern)" />

      <g transform="translate(170, 160)">
        {/* Electron cloud gradient */}
        <circle r={visualRadius} fill="url(#cloudGrad)" />

        {/* Energy shells */}
        {Array.from({ length: numShells }).map((_, i) => {
          const shellR = ((i + 1) / numShells) * visualRadius;
          return (
            <circle
              key={i}
              r={shellR}
              fill="none"
              stroke="#64748b"
              strokeWidth="1.5"
              strokeDasharray={i === numShells - 1 ? 'none' : '4 4'}
            />
          );
        })}

        {/* Electrons orbiting */}
        {Array.from({ length: numShells }).map((_, shellIdx) => {
          const shellR = ((shellIdx + 1) / numShells) * visualRadius;
          const eCount = element.electronConfig[shellIdx] || 2;
          return Array.from({ length: eCount }).map((_, eIdx) => {
            const angle = (eIdx / eCount) * 2 * Math.PI;
            const ex = shellR * Math.cos(angle);
            const ey = shellR * Math.sin(angle);
            return (
              <g key={`${shellIdx}-${eIdx}`}>
                <circle cx={ex} cy={ey} r="5" fill="#38bdf8" stroke="#ffffff" strokeWidth="1" />
                <circle cx={ex} cy={ey} r="8" fill="#38bdf8" opacity="0.3" className="animate-ping" />
              </g>
            );
          });
        })}

        {/* Nucleus */}
        <circle r="18" fill="url(#nucleusGrad)" stroke="#ff9999" strokeWidth="2" />
        <text x="0" y="-3" textAnchor="middle" fill="#ffffff" className="font-bold text-xs">
          {element.z}+
        </text>
        <text x="0" y="9" textAnchor="middle" fill="#fed7aa" className="text-[9px] font-semibold">
          {element.symbol}
        </text>

        {/* Radius dimension line */}
        <line x1="0" y1="0" x2={visualRadius} y2="0" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 3" />
        <circle cx={visualRadius} cy="0" r="4" fill="#f59e0b" />
        
        <g transform={`translate(${visualRadius / 2}, -10)`}>
          <rect x="-35" y="-12" width="70" height="18" rx="4" fill="#0f172a" stroke="#f59e0b" strokeWidth="1" />
          <text x="0" y="0" textAnchor="middle" fill="#fbbf24" className="text-xs font-bold font-mono">
            {radiusPm} pm
          </text>
        </g>
      </g>

      {/* Legend & Title */}
      <text x="15" y="25" fill="#e2e8f0" className="text-sm font-bold">
        {element.name} ({isIon ? element.ionSymbol || element.symbol : element.symbol})
      </text>
      <text x="15" y="42" fill="#94a3b8" className="text-xs">
        {isIon ? `Ionic Radius: ${radiusPm} pm` : `Covalent Radius: ${radiusPm} pm`} | Z = {element.z}
      </text>
    </svg>
  );
};

// Diagram 2: Effective Nuclear Charge & Slater Shielding Diagram
const EffectiveNuclearChargeDiagram: React.FC<{ z: number; shielding: number; zEff: number; symbol: string }> = ({
  z,
  shielding,
  zEff,
  symbol,
}) => {
  return (
    <svg width="340" height="260" className="mx-auto bg-slate-900/90 rounded-xl border border-slate-700 p-2 shadow-inner">
      <defs>
        <linearGradient id="pullGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
      </defs>

      <text x="170" y="22" textAnchor="middle" fill="#38bdf8" className="font-bold text-sm">
        Slater Shielding Model: Z_eff = Z - S
      </text>

      {/* Nucleus */}
      <circle cx="60" cy="130" r="28" fill="#dc2626" stroke="#fca5a5" strokeWidth="2" />
      <text x="60" y="126" textAnchor="middle" fill="#ffffff" className="font-extrabold text-xs">
        Nucleus
      </text>
      <text x="60" y="140" textAnchor="middle" fill="#fee2e2" className="text-[11px] font-mono">
        Z = +{z}
      </text>

      {/* Inner Core Shielding Barrier */}
      <g transform="translate(140, 60)">
        <rect x="0" y="0" width="24" height="140" rx="12" fill="#334155" stroke="#94a3b8" strokeWidth="2" />
        <text x="12" y="-10" textAnchor="middle" fill="#cbd5e1" className="text-[10px] font-bold">
          Core Shield (S = {shielding.toFixed(2)})
        </text>
        {/* Core electrons icons */}
        <circle cx="12" cy="30" r="6" fill="#64748b" />
        <circle cx="12" cy="70" r="6" fill="#64748b" />
        <circle cx="12" cy="110" r="6" fill="#64748b" />
      </g>

      {/* Outer Valence Electron */}
      <circle cx="280" cy="130" r="12" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" />
      <text x="280" y="134" textAnchor="middle" fill="#ffffff" className="font-bold text-[10px]">
        e⁻
      </text>
      <text x="280" y="158" textAnchor="middle" fill="#7dd3fc" className="text-[10px] font-bold">
        Valence shell
      </text>

      {/* Force Vectors */}
      {/* Full Nuclear Pull (Attenuated) */}
      <path d="M 88 120 L 138 120" stroke="#ef4444" strokeWidth="4" markerEnd="url(#arrow)" />
      <text x="113" y="112" textAnchor="middle" fill="#fca5a5" className="text-[9px] font-mono font-bold">
        + {z} Pull
      </text>

      {/* Net Effective Pull Passing Shield */}
      <path d="M 164 130 L 266 130" stroke="#22c55e" strokeWidth="4" strokeDasharray="4 2" />
      <polygon points="266,125 276,130 266,135" fill="#22c55e" />

      <g transform="translate(215, 110)">
        <rect x="-35" y="-12" width="70" height="18" rx="4" fill="#14532d" stroke="#22c55e" strokeWidth="1" />
        <text x="0" y="0" textAnchor="middle" fill="#86efac" className="text-xs font-mono font-bold">
          Z_eff = +{zEff.toFixed(2)}
        </text>
      </g>
    </svg>
  );
};

// Diagram 3: Isoelectronic Series Comparison Bar Chart
const IsoelectronicSeriesDiagram: React.FC<{ selectedSymbol: string; onSelect: (sym: string) => void }> = ({
  selectedSymbol,
  onSelect,
}) => {
  const maxRadius = 180;
  return (
    <svg width="340" height="280" className="mx-auto bg-slate-900/90 rounded-xl border border-slate-700 p-2 shadow-inner">
      <text x="170" y="20" textAnchor="middle" fill="#38bdf8" className="font-bold text-sm">
        Isoelectronic Series (10 e⁻ Cloud: 1s² 2s² 2p⁶)
      </text>
      <text x="170" y="36" textAnchor="middle" fill="#94a3b8" className="text-xs">
        Notice: Higher Protons (Z) = Smaller Ionic Radius
      </text>

      {ISOELECTRONIC_SERIES_10.map((item, idx) => {
        const barHeight = (item.ionicRadius / maxRadius) * 160;
        const x = 20 + idx * 44;
        const y = 220 - barHeight;
        const isSelected = item.symbol === selectedSymbol;

        return (
          <g key={item.symbol} onClick={() => onSelect(item.symbol)} className="cursor-pointer group">
            {/* Bar */}
            <rect
              x={x}
              y={y}
              width="32"
              height={barHeight}
              rx="4"
              fill={isSelected ? '#f59e0b' : item.charge < 0 ? '#ef4444' : item.charge > 0 ? '#3b82f6' : '#10b981'}
              opacity={isSelected ? 1 : 0.75}
              stroke={isSelected ? '#ffffff' : 'none'}
              strokeWidth="2"
              className="transition-all duration-300 hover:opacity-100"
            />

            {/* Value text above bar */}
            <text x={x + 16} y={y - 6} textAnchor="middle" fill="#ffffff" className="text-[10px] font-mono font-bold">
              {item.ionicRadius}pm
            </text>

            {/* Label below axis */}
            <text x={x + 16} y="238" textAnchor="middle" fill="#f8fafc" className="text-xs font-bold">
              {item.symbol}
            </text>
            <text x={x + 16} y="252" textAnchor="middle" fill="#94a3b8" className="text-[9px] font-mono">
              Z={item.protons}
            </text>
          </g>
        );
      })}

      <line x1="15" y1="220" x2="325" y2="220" stroke="#475569" strokeWidth="2" />
    </svg>
  );
};

// ==========================================
// MAIN COMPONENT CLASS
// ==========================================

export const C10_ChemistryPeriodicpropertiesatomicsizeSim: React.FC<{
  onComplete?: (score: number) => void;
}> = ({ onComplete }) => {
  // Tab State: 'discovery' | 'lab' | 'challenges' | 'summary'
  const [activeTab, setActiveTab] = useState<'discovery' | 'lab' | 'challenges' | 'summary'>('discovery');

  // Discovery Question State
  const [discoverySelected, setDiscoverySelected] = useState<number | null>(null);
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);

  // Lab Exploration State
  const [selectedElementKey, setSelectedElementKey] = useState<string>('Na');
  const [activeLabStepIndex, setActiveLabStepIndex] = useState<number>(0);
  const [ionMode, setIonMode] = useState<'atom' | 'cation' | 'anion'>('atom');
  const [selectedIsoSymbol, setSelectedIsoSymbol] = useState<string>('Na⁺');
  const [customProtons, setCustomProtons] = useState<number>(11);
  const [customShielding, setCustomShielding] = useState<number>(8.8);

  // Predictions State
  const [predAnswers, setPredAnswers] = useState<Record<number, number>>({});
  const [predSubmitted, setPredSubmitted] = useState<Record<number, boolean>>({});

  // Observations State
  const [obsAnswers, setObsAnswers] = useState<Record<number, number>>({});
  const [obsSubmitted, setObsSubmitted] = useState<Record<number, boolean>>({});

  // Challenge Engine State
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState<number>(0);
  const [challengeAnswers, setChallengeAnswers] = useState<Record<string, unknown>>({});
  const [challengeFeedback, setChallengeFeedback] = useState<Record<string, 'correct' | 'wrong' | null>>({});
  const [sortedOrder, setSortedOrder] = useState<string[]>([]);
  const [numericInput, setNumericInput] = useState<string>('');
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHintIndex, setCurrentHintIndex] = useState<number>(0);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [sparklePos, setSparklePos] = useState({ x: 400, y: 300 });

  // BKT & SRS Tracking State
  const [bktStates, setBktStates] = useState<Record<NodeId, BKTState>>(() => {
    const initial: Record<string, BKTState> = {};
    ALL_NODE_IDS.forEach((nodeId) => {
      initial[nodeId] = createBKTState();
    });
    return initial as Record<NodeId, BKTState>;
  });

  // Timer for 10s inactivity auto-hint
  const hintTimerRef = useRef<NodeJS.Timeout | null>(null);

  const resetHintTimer = useCallback(() => {
    if (hintTimerRef.current) clearTimeout(hintTimerRef.current);
    setShowHint(false);
    hintTimerRef.current = setTimeout(() => {
      setShowHint(true);
      audioManager.play('hint');
    }, 10000); // 10s auto-hint
  }, []);

  useEffect(() => {
    resetHintTimer();
    return () => {
      if (hintTimerRef.current) clearTimeout(hintTimerRef.current);
    };
  }, [currentChallengeIndex, activeTab, resetHintTimer]);

  const currentElement = PERIODIC_DATABASE[selectedElementKey] || PERIODIC_DATABASE['Na'];
  const currentChallenge = CHALLENGES[currentChallengeIndex];

  // Voice narration setup on tab switch
  useEffect(() => {
    if (activeTab === 'discovery') {
      speechManager.speak('Welcome to the Periodic Properties and Atomic Size Simulation. Explore how atomic radii change across periods and down groups.');
    } else if (activeTab === 'lab') {
      speechManager.speak('Interactive Metrology Workbench active. Select elements, observe orbital shell contraction, and test ionization radii.');
    } else if (activeTab === 'challenges') {
      speechManager.speak('Challenge Mode initiated. Test your understanding across 22 progressive problem tiers.');
    } else if (activeTab === 'summary') {
      speechManager.speak('Congratulations on completing the laboratory module! Review your mastery scores and real-world application activity.');
    }
  }, [activeTab]);

  // Handle Discovery Question Answer
  const handleDiscoverySubmit = (idx: number) => {
    setDiscoverySelected(idx);
    setDiscoveryAnswered(true);
    if (idx === DISCOVERY_QUESTION.correctIndex) {
      audioManager.play('success');
      speechManager.speak('Correct! Adding protons across a period increases effective nuclear charge, pulling shells closer and shrinking the atom.');
    } else {
      audioManager.play('error');
      speechManager.speak('Not quite. Think about how nuclear pull changes when protons are added to the nucleus.');
    }
  };

  // Handle Prediction Submission
  const handlePredictionSubmit = (predIdx: number, optionIdx: number) => {
    setPredAnswers((prev) => ({ ...prev, [predIdx]: optionIdx }));
    setPredSubmitted((prev) => ({ ...prev, [predIdx]: true }));
    const isCorrect = optionIdx === PREDICTION_QUESTIONS[predIdx].correctIndex;
    if (isCorrect) {
      audioManager.play('drop-correct');
    } else {
      audioManager.play('drop-wrong');
    }
  };

  // Handle Observation Submission
  const handleObservationSubmit = (obsIdx: number, optionIdx: number) => {
    setObsAnswers((prev) => ({ ...prev, [obsIdx]: optionIdx }));
    setObsSubmitted((prev) => ({ ...prev, [obsIdx]: true }));
    const isCorrect = optionIdx === OBSERVATION_QUESTIONS[obsIdx].correctIndex;
    if (isCorrect) {
      audioManager.play('chime');
    } else {
      audioManager.play('error');
    }
  };

  // Initialize sort array when challenge changes
  useEffect(() => {
    if (currentChallenge && currentChallenge.type === 'sort' && currentChallenge.sortItems) {
      setSortedOrder([...currentChallenge.sortItems]);
    }
    setNumericInput('');
  }, [currentChallengeIndex, currentChallenge]);

  // Handle Challenge Answer Evaluation
  const handleChallengeSubmit = (userAnswer: unknown) => {
    if (!currentChallenge) return;
    resetHintTimer();

    let isCorrect = false;
    if (currentChallenge.type === 'mcq') {
      isCorrect = userAnswer === currentChallenge.correctIndex;
    } else if (currentChallenge.type === 'numeric') {
      const numVal = parseFloat(userAnswer as string);
      const expected = currentChallenge.correctAnswer as number;
      isCorrect = Math.abs(numVal - expected) < 0.05;
    } else if (currentChallenge.type === 'sort') {
      const userArr = userAnswer as string[];
      isCorrect = JSON.stringify(userArr) === JSON.stringify(currentChallenge.correctOrder);
    }

    // Sound and Visual Feedback
    if (isCorrect) {
      audioManager.play('sparkle');
      setShowSparkle(true);
      setShowSuccess(true);
      speechManager.speak('Excellent work! Answer verified.');
      setTimeout(() => setShowSuccess(false), 2500);
    } else {
      audioManager.play('error');
      speechManager.speak('That answer is incorrect. Review the hint bubble or try adjusting your parameters.');
    }

    setChallengeFeedback((prev) => ({
      ...prev,
      [currentChallenge.id]: isCorrect ? 'correct' : 'wrong',
    }));
    setChallengeAnswers((prev) => ({
      ...prev,
      [currentChallenge.id]: userAnswer,
    }));

    // Update BKT State for current node
    const nodeId = currentChallenge.nodeId;
    setBktStates((prev) => {
      const updatedNodeState = bktUpdate(prev[nodeId], isCorrect);
      return { ...prev, [nodeId]: updatedNodeState };
    });

    // Update SRS Item
    const srsItem = createReviewItem(currentChallenge.id);
    sm2Update(srsItem, isCorrect ? 5 : 2);
  };

  // Calculate Overall Simulation Progress & Mastery
  const completedCount = Object.values(challengeFeedback).filter((v) => v === 'correct').length;
  const overallMasteryScore = Math.round((completedCount / CHALLENGES.length) * 100);

  useEffect(() => {
    if (completedCount === CHALLENGES.length) {
      setShowConfetti(true);
      audioManager.play('celebration');
      speechManager.speak('Mastery achieved! You have successfully mastered all 22 periodic properties challenges!');
      if (onComplete) {
        onComplete(100);
      }
      recordGameScore('c10_chem_001', 100);
    }
  }, [completedCount, onComplete]);

  // Drag-and-drop / array reorder for sort items
  const moveSortItem = (fromIdx: number, toIdx: number) => {
    audioManager.play('pickup');
    const newArr = [...sortedOrder];
    const [moved] = newArr.splice(fromIdx, 1);
    newArr.splice(toIdx, 0, moved);
    setSortedOrder(newArr);
  };

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950 flex flex-col">
      {/* Visual Feedback Overlays */}
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccess} text="Challenge Mastered!" />
      <SparkleBurst show={showSparkle} x={sparklePos.x} y={sparklePos.y} />

      {/* HEADER BAR */}
      <header className="w-full bg-slate-900/90 backdrop-blur border-b border-slate-800 px-6 py-4 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-40 shadow-lg">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center font-black text-slate-950 text-xl shadow-lg">
            r
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-100 tracking-tight">
              ICSE Class 10 Chemistry: Periodic Properties & Atomic Size Trends
            </h1>
            <p className="text-xs text-amber-400 font-mono">
              Nodes Covered: c10_chem_001 – c10_chem_010 | Atomic & Ionic Radii Metrology
            </p>
          </div>
        </div>

        {/* Progress & Tab Switcher */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2 bg-slate-800/80 px-4 py-2 rounded-lg border border-slate-700">
            <span className="text-xs text-slate-400 uppercase font-mono">Mastery:</span>
            <span className="text-sm font-bold text-amber-400 font-mono">{overallMasteryScore}%</span>
            <div className="w-24 bg-slate-700 h-2 rounded-full overflow-hidden ml-2">
              <div
                className="bg-gradient-to-r from-amber-500 to-emerald-400 h-full transition-all duration-500"
                style={{ width: `${overallMasteryScore}%` }}
              />
            </div>
          </div>

          <div className="flex bg-slate-800 rounded-lg p-1 border border-slate-700">
            {(['discovery', 'lab', 'challenges', 'summary'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  audioManager.play('tap');
                  setActiveTab(tab);
                }}
                className={`px-4 py-1.5 rounded-md text-xs font-semibold capitalize transition-all ${
                  activeTab === tab
                    ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER CONTENT */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 space-y-6">
        {/* TAB 1: DISCOVERY & SCENARIO */}
        {activeTab === 'discovery' && (
          <div className="space-y-6 animate-fadeIn">
            {/* SCENARIO CARD */}
            <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/40 p-6 rounded-2xl border border-slate-800 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/30 text-amber-400">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-amber-400 mb-2">{SCENARIO.title}</h2>
                  <p className="text-slate-300 leading-relaxed mb-3">{SCENARIO.intro}</p>
                  <p className="text-slate-400 text-sm italic">{SCENARIO.context}</p>
                </div>
              </div>
            </div>

            {/* DISCOVERY QUESTION CARD */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 bg-amber-500/20 text-amber-400 text-xs font-bold rounded-full font-mono uppercase">
                  Discovery Challenge
                </span>
                <span className="text-xs text-slate-400">c10_chem_002</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-100">{DISCOVERY_QUESTION.question}</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                {DISCOVERY_QUESTION.options.map((option, idx) => {
                  const isSelected = discoverySelected === idx;
                  const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
                  let btnStyle = 'bg-slate-800/80 border-slate-700 hover:border-amber-500 text-slate-200';
                  if (discoveryAnswered) {
                    if (isCorrect) btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-semibold';
                    else if (isSelected) btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-200';
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleDiscoverySubmit(idx)}
                      disabled={discoveryAnswered}
                      className={`p-4 rounded-xl border text-left text-sm transition-all duration-200 ${btnStyle}`}
                    >
                      <div className="flex items-start space-x-3">
                        <span className="w-6 h-6 rounded-full bg-slate-700/50 text-slate-300 flex items-center justify-center text-xs font-bold font-mono">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="flex-1">{option}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {discoveryAnswered && (
                <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-200 text-sm animate-fadeIn">
                  <p className="font-semibold text-amber-400 mb-1">Laboratory Insight:</p>
                  <p>{DISCOVERY_QUESTION.hintAfter}</p>
                </div>
              )}
            </div>

            {/* PREDICTION QUESTIONS SECTION */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-6">
              <h3 className="text-lg font-bold text-slate-100 flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-cyan-400" />
                <span>Pre-Experiment Predictions (Mandatory Verification)</span>
              </h3>

              {PREDICTION_QUESTIONS.map((pq, pIdx) => (
                <div key={pIdx} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                  <p className="text-sm font-medium text-slate-200">
                    <span className="text-cyan-400 font-mono font-bold">Prediction {pIdx + 1}:</span> {pq.question}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {pq.options.map((opt, oIdx) => {
                      const isSel = predAnswers[pIdx] === oIdx;
                      const isSubmitted = predSubmitted[pIdx];
                      const isCorrect = oIdx === pq.correctIndex;
                      let style = 'bg-slate-900 border-slate-700 text-slate-300 hover:border-cyan-500';
                      if (isSubmitted) {
                        if (isCorrect) style = 'bg-emerald-950 border-emerald-500 text-emerald-200';
                        else if (isSel) style = 'bg-rose-950 border-rose-500 text-rose-200';
                      }
                      return (
                        <button
                          key={oIdx}
                          onClick={() => handlePredictionSubmit(pIdx, oIdx)}
                          disabled={isSubmitted}
                          className={`p-3 text-xs rounded-lg border text-left transition-all ${style}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {predSubmitted[pIdx] && (
                    <p className="text-xs text-cyan-300 italic bg-cyan-950/40 p-2.5 rounded border border-cyan-800/40">
                      <strong>Verification Guide:</strong> {pq.verifyInstruction}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: INTERACTIVE CHEMISTRY LAB */}
        {activeTab === 'lab' && (
          <div className="space-y-6 animate-fadeIn">
            {/* EXPLORATION STEPS SELECTOR */}
            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-3 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
                {EXPLORATION_STEPS.map((step, sIdx) => (
                  <button
                    key={sIdx}
                    onClick={() => {
                      audioManager.play('tap');
                      setActiveLabStepIndex(sIdx);
                    }}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                      activeLabStepIndex === sIdx
                        ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold shadow-md'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-500'
                    }`}
                  >
                    Lab Step {sIdx + 1}: {step.title.split(':')[1] || step.title}
                  </button>
                ))}
              </div>
              <span className="text-xs text-slate-400 font-mono">Node: {EXPLORATION_STEPS[activeLabStepIndex].nodeId}</span>
            </div>

            {/* LAB INSTRUCTION BOX */}
            <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-200 text-xs md:text-sm flex items-start space-x-3">
              <div className="p-1.5 bg-amber-500/20 rounded text-amber-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <strong className="text-amber-400">{EXPLORATION_STEPS[activeLabStepIndex].title}</strong>
                <p className="mt-1 text-slate-300">{EXPLORATION_STEPS[activeLabStepIndex].instruction}</p>
              </div>
            </div>

            {/* INTERACTIVE WORKBENCH PANEL */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* LEFT CONTROLS (5 cols) */}
              <div className="lg:col-span-5 bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-5 shadow-xl">
                <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider font-mono">
                  Metrology Controls & Element Picker
                </h3>

                {/* Element Picker Grid (Period 2 & 3) */}
                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-2">Period 2 Elements (Li to Ne):</label>
                  <div className="grid grid-cols-4 gap-2">
                    {['Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne'].map((sym) => (
                      <button
                        key={sym}
                        onClick={() => {
                          audioManager.play('pop');
                          setSelectedElementKey(sym);
                        }}
                        className={`p-2 rounded-lg text-xs font-bold border font-mono transition-all ${
                          selectedElementKey === sym
                            ? 'bg-amber-500 text-slate-950 border-white shadow-lg scale-105'
                            : 'bg-slate-800 text-slate-200 border-slate-700 hover:border-amber-400'
                        }`}
                      >
                        {sym} ({PERIODIC_DATABASE[sym].z})
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-2">Period 3 Elements (Na to Ar):</label>
                  <div className="grid grid-cols-4 gap-2">
                    {['Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl', 'Ar'].map((sym) => (
                      <button
                        key={sym}
                        onClick={() => {
                          audioManager.play('pop');
                          setSelectedElementKey(sym);
                        }}
                        className={`p-2 rounded-lg text-xs font-bold border font-mono transition-all ${
                          selectedElementKey === sym
                            ? 'bg-amber-500 text-slate-950 border-white shadow-lg scale-105'
                            : 'bg-slate-800 text-slate-200 border-slate-700 hover:border-amber-400'
                        }`}
                      >
                        {sym} ({PERIODIC_DATABASE[sym].z})
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-2">Group 1 & 17 Down Trend Samples:</label>
                  <div className="grid grid-cols-4 gap-2">
                    {['K', 'Ca', 'Br', 'Rb', 'Cs'].map((sym) => (
                      <button
                        key={sym}
                        onClick={() => {
                          audioManager.play('pop');
                          setSelectedElementKey(sym);
                        }}
                        className={`p-2 rounded-lg text-xs font-bold border font-mono transition-all ${
                          selectedElementKey === sym
                            ? 'bg-amber-500 text-slate-950 border-white shadow-lg scale-105'
                            : 'bg-slate-800 text-slate-200 border-slate-700 hover:border-amber-400'
                        }`}
                      >
                        {sym} ({PERIODIC_DATABASE[sym].z})
                      </button>
                    ))}
                  </div>
                </div>

                {/* Ionization State Toggle */}
                <div className="pt-2 border-t border-slate-800">
                  <label className="text-xs font-semibold text-slate-400 block mb-2">Ionization State:</label>
                  <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
                    <button
                      onClick={() => {
                        audioManager.play('whoosh');
                        setIonMode('atom');
                      }}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        ionMode === 'atom' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Neutral Atom
                    </button>
                    <button
                      onClick={() => {
                        audioManager.play('swoop');
                        setIonMode('cation');
                      }}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        ionMode === 'cation' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Cation (+e⁻ loss)
                    </button>
                    <button
                      onClick={() => {
                        audioManager.play('swoop');
                        setIonMode('anion');
                      }}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        ionMode === 'anion' ? 'bg-rose-600 text-white shadow' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Anion (+e⁻ gain)
                    </button>
                  </div>
                </div>

                {/* Slater Custom Calculator Sliders */}
                <div className="pt-2 border-t border-slate-800 space-y-3">
                  <h4 className="text-xs font-bold text-slate-300">{"Custom Slater Shielding Simulator ($Z_{eff} = Z - S$)"}</h4>
                  <div>
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>Nuclear Charge ($Z$): {customProtons}</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="36"
                      value={customProtons}
                      onChange={(e) => setCustomProtons(parseInt(e.target.value))}
                      className="w-full accent-amber-500 bg-slate-800 rounded-lg cursor-pointer"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>Shielding Constant ($S$): {customShielding.toFixed(2)}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="30"
                      step="0.1"
                      value={customShielding}
                      onChange={(e) => setCustomShielding(parseFloat(e.target.value))}
                      className="w-full accent-cyan-500 bg-slate-800 rounded-lg cursor-pointer"
                    />
                  </div>
                  <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-center font-mono">
                    <span className="text-xs text-slate-400">Effective Nuclear Charge: </span>
                    <span className="text-base font-bold text-amber-400 font-mono">
                      Z_eff = {(customProtons - customShielding).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* RIGHT VISUALIZERS (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                {/* SVG Visualizer Container */}
                <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 shadow-xl space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h3 className="text-sm font-bold text-slate-200">Live Electron Cloud & Radius Visualizer</h3>
                    <span className="text-xs text-amber-400 font-mono font-bold">
                      {currentElement.name} | Period {currentElement.period}, Group {currentElement.group}
                    </span>
                  </div>

                  {/* Render Diagrams depending on Lab step or user selection */}
                  {activeLabStepIndex === 3 ? (
                    <IsoelectronicSeriesDiagram
                      selectedSymbol={selectedIsoSymbol}
                      onSelect={(sym) => setSelectedIsoSymbol(sym)}
                    />
                  ) : activeLabStepIndex === 4 ? (
                    <EffectiveNuclearChargeDiagram
                      z={customProtons}
                      shielding={customShielding}
                      zEff={customProtons - customShielding}
                      symbol={currentElement.symbol}
                    />
                  ) : (
                    <AtomicRadiusDiagram element={currentElement} isIon={ionMode !== 'atom'} />
                  )}

                  {/* ELEMENT DATA CARDS */}
                  <div className="grid grid-cols-3 gap-3 pt-2">
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center">
                      <p className="text-[10px] text-slate-400 uppercase font-mono">Atomic Radius</p>
                      <p className="text-lg font-bold text-amber-400 font-mono">{currentElement.atomicRadius} pm</p>
                    </div>
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center">
                      <p className="text-[10px] text-slate-400 uppercase font-mono">Ionic Radius</p>
                      <p className="text-lg font-bold text-cyan-400 font-mono">
                        {currentElement.ionicRadius ? `${currentElement.ionicRadius} pm` : 'N/A'}
                      </p>
                    </div>
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center">
                      <p className="text-[10px] text-slate-400 uppercase font-mono">Slater Z_eff</p>
                      <p className="text-lg font-bold text-emerald-400 font-mono">+{currentElement.zEff.toFixed(2)}</p>
                    </div>
                  </div>
                </div>

                {/* OBSERVATION QUESTIONS BOX */}
                <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-xl space-y-4">
                  <h4 className="text-sm font-bold text-amber-400 font-mono uppercase">
                    Interactive Lab Observation Checks
                  </h4>
                  {OBSERVATION_QUESTIONS.map((oq, oIdx) => (
                    <div key={oIdx} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                      <p className="text-xs md:text-sm font-medium text-slate-200">
                        <span className="text-amber-400 font-mono font-bold">Obs {oIdx + 1}:</span> {oq.question}
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {oq.observableOptions.map((opt, optIdx) => {
                          const isSel = obsAnswers[oIdx] === optIdx;
                          const isSub = obsSubmitted[oIdx];
                          const isCorr = optIdx === oq.correctIndex;
                          let style = 'bg-slate-900 stroke-slate-700 text-slate-300 hover:border-amber-500';
                          if (isSub) {
                            if (isCorr) style = 'bg-emerald-950 border-emerald-500 text-emerald-200 font-semibold';
                            else if (isSel) style = 'bg-rose-950 border-rose-500 text-rose-200';
                          }
                          return (
                            <button
                              key={optIdx}
                              onClick={() => handleObservationSubmit(oIdx, optIdx)}
                              disabled={isSub}
                              className={`p-2.5 text-xs rounded-lg border text-left transition-all ${style}`}
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
          </div>
        )}

        {/* TAB 3: CHALLENGES TIER ENGINE (22 Progressive Challenges) */}
        {activeTab === 'challenges' && (
          <div className="space-y-6 animate-fadeIn">
            {/* CHALLENGE HEADER & NAV */}
            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <span className="px-3 py-1 bg-amber-500 text-slate-950 font-black text-xs rounded-full font-mono uppercase">
                  Challenge {currentChallengeIndex + 1} of {CHALLENGES.length}
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase font-mono ${
                    currentChallenge.difficulty === 'foundation'
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                      : currentChallenge.difficulty === 'standard'
                      ? 'bg-amber-950 text-amber-400 border border-amber-800'
                      : 'bg-purple-950 text-purple-400 border border-purple-800'
                  }`}
                >
                  {currentChallenge.difficulty} | {currentChallenge.competencyLevel}
                </span>
                <span className="text-xs text-slate-400 font-mono hidden md:inline">Node: {currentChallenge.nodeId}</span>
              </div>

              {/* Challenge Selector Dropdown */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    if (currentChallengeIndex > 0) {
                      audioManager.play('tap');
                      setCurrentChallengeIndex(currentChallengeIndex - 1);
                    }
                  }}
                  disabled={currentChallengeIndex === 0}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 rounded-lg text-xs font-semibold"
                >
                  ← Prev
                </button>
                <select
                  value={currentChallengeIndex}
                  onChange={(e) => {
                    audioManager.play('tap');
                    setCurrentChallengeIndex(parseInt(e.target.value));
                  }}
                  className="bg-slate-950 border border-slate-700 text-amber-400 text-xs rounded-lg px-2 py-1.5 font-mono"
                >
                  {CHALLENGES.map((ch, idx) => (
                    <option key={ch.id} value={idx}>
                      C{idx + 1}: {ch.difficulty.toUpperCase()} ({ch.nodeId})
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => {
                    if (currentChallengeIndex < CHALLENGES.length - 1) {
                      audioManager.play('tap');
                      setCurrentChallengeIndex(currentChallengeIndex + 1);
                    }
                  }}
                  disabled={currentChallengeIndex === CHALLENGES.length - 1}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 rounded-lg text-xs font-semibold"
                >
                  Next →
                </button>
              </div>
            </div>

            {/* MAIN CHALLENGE CARD */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-6">
              <h3 className="text-base md:text-lg font-bold text-slate-100 leading-relaxed">
                {currentChallenge.question}
              </h3>

              {/* HINT BUBBLE COMPONENT INTEGRATION */}
              <HintBubble
                show={showHint}
                text={currentChallenge.hints[currentHintIndex]}
              />
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    audioManager.play('hint');
                    setShowHint(!showHint);
                  }}
                  className="text-xs text-amber-400 hover:underline flex items-center space-x-1"
                >
                  <span>💡 {showHint ? 'Hide Hint' : 'Show Hint'}</span>
                </button>
                {showHint && (
                  <button
                    onClick={() => {
                      audioManager.play('tap');
                      setCurrentHintIndex((prev) => (prev + 1) % currentChallenge.hints.length);
                    }}
                    className="text-xs text-slate-400 hover:text-white"
                  >
                    (Next Hint {currentHintIndex + 1}/3)
                  </button>
                )}
              </div>

              {/* RENDER QUESTION INTERACTION TYPE */}

              {/* TYPE 1: MCQ */}
              {currentChallenge.type === 'mcq' && currentChallenge.options && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  {currentChallenge.options.map((option, optIdx) => {
                    const isAnswered = challengeFeedback[currentChallenge.id] !== undefined;
                    const isSelected = challengeAnswers[currentChallenge.id] === optIdx;
                    const isCorrectOpt = optIdx === currentChallenge.correctIndex;

                    let btnStyle = 'bg-slate-950 border-slate-800 hover:border-amber-500 text-slate-200';
                    if (isAnswered) {
                      if (isCorrectOpt) btnStyle = 'bg-emerald-950 border-emerald-500 text-emerald-200 font-semibold';
                      else if (isSelected) btnStyle = 'bg-rose-950 border-rose-500 text-rose-200';
                    }

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleChallengeSubmit(optIdx)}
                        className={`p-4 rounded-xl border text-left text-sm transition-all duration-200 ${btnStyle}`}
                      >
                        <div className="flex items-start space-x-3">
                          <span className="w-6 h-6 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center text-xs font-bold font-mono">
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span className="flex-1">{option}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* TYPE 2: NUMERIC INPUT */}
              {currentChallenge.type === 'numeric' && (
                <div className="space-y-4 max-w-md">
                  <label className="text-xs font-semibold text-slate-400 block">Enter numerical answer (pm or Z_eff value):</label>
                  <div className="flex space-x-3">
                    <input
                      type="number"
                      step="any"
                      value={numericInput}
                      onChange={(e) => setNumericInput(e.target.value)}
                      placeholder="e.g. 1.3 or 102"
                      className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 font-mono text-sm focus:outline-none focus:border-amber-500"
                    />
                    <button
                      onClick={() => handleChallengeSubmit(numericInput)}
                      className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm rounded-xl transition-all"
                    >
                      Verify
                    </button>
                  </div>
                </div>
              )}

              {/* TYPE 3: SORT / ORDERING */}
              {currentChallenge.type === 'sort' && currentChallenge.sortItems && (
                <div className="space-y-4">
                  <p className="text-xs text-slate-400">
                    Use ↑ and ↓ arrows to arrange items in the required sequence:
                  </p>
                  <div className="space-y-2 max-w-lg">
                    {sortedOrder.map((item, idx) => (
                      <div
                        key={item}
                        className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between"
                      >
                        <span className="text-sm font-bold font-mono text-amber-400">
                          {idx + 1}. {item}
                        </span>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => idx > 0 && moveSortItem(idx, idx - 1)}
                            disabled={idx === 0}
                            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30 rounded text-xs"
                          >
                            ▲ Up
                          </button>
                          <button
                            onClick={() => idx < sortedOrder.length - 1 && moveSortItem(idx, idx + 1)}
                            disabled={idx === sortedOrder.length - 1}
                            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30 rounded text-xs"
                          >
                            ▼ Down
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => handleChallengeSubmit(sortedOrder)}
                    className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm rounded-xl transition-all"
                  >
                    Submit Order
                  </button>
                </div>
              )}

              {/* FEEDBACK & EXPLANATION DISPLAY */}
              {challengeFeedback[currentChallenge.id] && (
                <div
                  className={`p-4 rounded-xl border text-sm space-y-2 animate-fadeIn ${
                    challengeFeedback[currentChallenge.id] === 'correct'
                      ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-200'
                      : 'bg-rose-950/80 border-rose-500/50 text-rose-200'
                  }`}
                >
                  <div className="flex items-center space-x-2 font-bold">
                    <span>
                      {challengeFeedback[currentChallenge.id] === 'correct' ? '✅ Correct Answer!' : '❌ Incorrect'}
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed">{currentChallenge.explanation}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: SUMMARY, MASTERY REPORT & REAL-WORLD ACTIVITY */}
        {activeTab === 'summary' && (
          <div className="space-y-6 animate-fadeIn">
            {/* MASTERY SCORE OVERVIEW */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 bg-slate-950 rounded-xl border border-slate-800 text-center flex flex-col items-center justify-center">
                <span className="text-xs text-slate-400 uppercase font-mono">Total Score</span>
                <span className="text-4xl font-extrabold text-amber-400 font-mono mt-1">{overallMasteryScore}%</span>
                <span className="text-xs text-slate-500 mt-1">22 Challenges Mastered</span>
              </div>
              <div className="p-5 bg-slate-950 rounded-xl border border-slate-800 text-center flex flex-col items-center justify-center">
                <span className="text-xs text-slate-400 uppercase font-mono">BKT Knowledge State</span>
                <span className="text-2xl font-bold text-emerald-400 font-mono mt-1">High Mastery</span>
                <span className="text-xs text-slate-500 mt-1">c10_chem_001 to c10_chem_010</span>
              </div>
              <div className="p-5 bg-slate-950 rounded-xl border border-slate-800 text-center flex flex-col items-center justify-center">
                <span className="text-xs text-slate-400 uppercase font-mono">Spaced Repetition (SM-2)</span>
                <span className="text-2xl font-bold text-cyan-400 font-mono mt-1">Interval: 3 Days</span>
                <span className="text-xs text-slate-500 mt-1">Next Review Scheduled</span>
              </div>
            </div>

            {/* REAL-WORLD ACTIVITY SECTION */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-100">{REAL_WORLD_ACTIVITY.title}</h3>
                  <p className="text-xs text-slate-400">{REAL_WORLD_ACTIVITY.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                {REAL_WORLD_ACTIVITY.steps.map((stepStr, stepIdx) => (
                  <div key={stepIdx} className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
                    {stepStr}
                  </div>
                ))}
              </div>
            </div>

            {/* MISCONCEPTIONS CARDS */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
              <h3 className="text-lg font-bold text-amber-400 flex items-center space-x-2">
                <span>⚠️ Common ICSE Misconceptions & Clarifications</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MISCONCEPTIONS.map((misc) => (
                  <div key={misc.id} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <span className="text-[10px] font-mono font-bold text-amber-500 uppercase">
                      {misc.nodeId}
                    </span>
                    <h4 className="text-xs font-bold text-rose-400">{misc.title}</h4>
                    <p className="text-[11px] text-slate-400">{misc.description}</p>
                    <p className="text-xs text-emerald-300 bg-emerald-950/40 p-2.5 rounded border border-emerald-800/40 mt-1">
                      <strong>Correction:</strong> {misc.correction}
                    </p>
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

export default C10_ChemistryPeriodicpropertiesatomicsizeSim;