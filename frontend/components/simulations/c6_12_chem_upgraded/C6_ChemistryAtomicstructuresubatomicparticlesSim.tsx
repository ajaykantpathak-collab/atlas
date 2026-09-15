'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, masteryProb } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ==========================================
// NODE DEFINITIONS & CONSTANTS
// ==========================================
export const ALL_NODE_IDS = [
  'c6_chem_009',
  'c6_chem_010',
  'c6_chem_011',
  'c6_chem_012',
  'c6_chem_013',
  'c6_chem_014',
  'c6_chem_015',
  'c6_chem_016',
] as const;

export type NodeId = typeof ALL_NODE_IDS[number];

export interface NodeInfo {
  id: NodeId;
  title: string;
  summary: string;
  eli5: string;
  icseTopic: string;
}

export const NODE_DETAILS: Record<NodeId, NodeInfo> = {
  c6_chem_009: {
    id: 'c6_chem_009',
    title: 'Matter and Its Building Blocks',
    summary: 'Matter is composed of extremely tiny indivisible units called atoms, which join together to form molecules.',
    eli5: 'Everything around you is like a huge LEGO build. Atoms are the tiny indivisible bricks, and molecules are small sets of bricks snapped together!',
    icseTopic: 'Matter - Constituent particles (Atoms and Molecules)',
  },
  c6_chem_010: {
    id: 'c6_chem_010',
    title: "Dalton's Atomic Theory",
    summary: "John Dalton proposed that atoms are hard, solid, indivisible spheres. Modern science modified this to reveal internal subatomic structures.",
    eli5: "John Dalton thought atoms were tiny billiard balls that could never be broken. Later scientists opened the billiard balls and found smaller parts inside!",
    icseTopic: "Dalton's Atomic Theory & Historical Evolution",
  },
  c6_chem_011: {
    id: 'c6_chem_011',
    title: 'Discovery & Properties of Electrons',
    summary: 'Discovered by J.J. Thomson in cathode rays. Electrons carry a negative charge (-1) and have a negligible relative mass (~1/1836 amu).',
    eli5: 'Electrons are tiny negatively charged sparks flying around the atom. They weigh almost nothing compared to the atom\'s center!',
    icseTopic: 'Subatomic Particles - Electron (Discovery by Thomson, Charge & Mass)',
  },
  c6_chem_012: {
    id: 'c6_chem_012',
    title: 'Discovery & Properties of Protons',
    summary: 'Discovered via canal rays / Goldstein & Rutherford. Protons carry a positive charge (+1) and have a relative mass of 1 amu.',
    eli5: 'Protons are heavy, positively charged powerhouses living inside the central core (nucleus) of the atom.',
    icseTopic: 'Subatomic Particles - Proton (Discovery by Rutherford/Goldstein, Charge & Mass)',
  },
  c6_chem_013: {
    id: 'c6_chem_013',
    title: 'Discovery & Properties of Neutrons',
    summary: 'Discovered by James Chadwick (1932). Neutrons carry no charge (neutral, 0) and have a relative mass of 1 amu.',
    eli5: 'Neutrons are heavy neutral buddies in the nucleus that help keep the positively charged protons from pushing each other away!',
    icseTopic: 'Subatomic Particles - Neutron (Discovery by Chadwick, Mass & Neutrality)',
  },
  c6_chem_014: {
    id: 'c6_chem_014',
    title: 'Atomic Structure & Electron Shells',
    summary: 'An atom consists of a dense central nucleus (protons + neutrons) surrounded by electron energy levels / shells (K, L, M, N).',
    eli5: 'The atom is like a solar system! The heavy nucleus is the Sun, and electrons zoom around in circular tracks called shells (K, L, M, N).',
    icseTopic: 'Structure of Atom - Nucleus, Nucleons, and Bohr Shell Model',
  },
  c6_chem_015: {
    id: 'c6_chem_015',
    title: 'Atomic Number (Z) and Mass Number (A)',
    summary: 'Atomic Number Z = number of protons. Mass Number A = Protons (Z) + Neutrons (N). Number of Neutrons N = A - Z.',
    eli5: 'Z is the atom\'s ID number (number of protons). A is the heavy weight count (protons + neutrons). Subtract Z from A to get neutrons!',
    icseTopic: 'Atomic Number (Z) and Mass Number (A) Calculations',
  },
  c6_chem_016: {
    id: 'c6_chem_016',
    title: 'Bohr-Bury Electronic Configuration',
    summary: 'Electrons fill shells according to the 2n² rule: K (max 2), L (max 8), M (max 18/8 for first 20 elements), N (max 32).',
    eli5: 'Electrons seat themselves in rows! Row 1 (K shell) holds 2, Row 2 (L shell) holds 8, Row 3 (M shell) fills up step by step!',
    icseTopic: 'Bohr-Bury Scheme & Electronic Configuration of First 20 Elements',
  },
};

// ==========================================
// MANDATORY SECTION 1: SCENARIO
// ==========================================
const SCENARIO = {
  title: 'ICSE Subatomic Quantum Chemistry Lab',
  intro: 'Welcome to the High-Precision Atomic Particle Research Laboratory! You are tasked with analyzing atomic structures, uncovering subatomic particles with discharge tubes and gold foil scattering, and building elements from Hydrogen to Calcium.',
  context: 'Investigate how J.J. Thomson, Ernest Rutherford, and Niels Bohr unraveled the secrets of the atom. You will assemble custom atoms, observe deflection of cathode rays and alpha particles, and determine electronic configurations following Bohr-Bury rules.',
};

// ==========================================
// MANDATORY SECTION 2: DISCOVERY QUESTION
// ==========================================
const DISCOVERY_QUESTION = {
  question: 'If the central nucleus contains over 99.9% of an atom\'s mass, why doesn\'t the atom collapse under the immense gravitational or electromagnetic forces of its subatomic particles?',
  options: [
    'Electrons travel in empty space at high speeds in quantized energy levels, keeping them from falling into the positive nucleus.',
    'Atoms are packed completely solid with dense gel that prevents subatomic movement.',
    'Neutrons neutralize gravitational pull so particles stay completely stationary.',
    'Electrons have positive charges that repel the nucleus away into deep space.',
  ],
  correctIndex: 0,
  hintAfter: 'Electrons move rapidly in localized energy shells outside the tiny central nucleus, creating a vast region of mostly empty space!',
};

// ==========================================
// MANDATORY SECTION 3: EXPLORATION STEPS (5 Labs)
// ==========================================
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Thomson\'s Cathode Ray Tube',
    instruction: 'Apply electric fields (+ and - plates) to observe cathode ray deflection and prove electrons carry a negative charge.',
    interactionType: 'cathode-ray-experiment',
    nodeId: 'c6_chem_011',
  },
  {
    title: 'Lab 2: Rutherford\'s Gold Foil Alpha Scattering',
    instruction: 'Fire positive alpha particles at gold foil atoms to discover the tiny dense positive nucleus and vast empty space.',
    interactionType: 'rutherford-scattering',
    nodeId: 'c6_chem_012',
  },
  {
    title: 'Lab 3: Subatomic Particle Weighing & Nucleus Builder',
    instruction: 'Add protons, neutrons, and electrons to observe how atomic mass (A) and atomic number (Z) change dynamically.',
    interactionType: 'subatomic-builder',
    nodeId: 'c6_chem_015',
  },
  {
    title: 'Lab 4: Bohr Shell Configuration Workbench',
    instruction: 'Distribute electrons into K, L, M, and N shells using the 2n² rule to build stable electronic configurations.',
    interactionType: 'shell-configurator',
    nodeId: 'c6_chem_016',
  },
  {
    title: 'Lab 5: Periodic Element Identifier & Isotope Lab',
    instruction: 'Synthesize elements Z=1 to Z=20, calculate neutron counts (A - Z), and compare isotopes with equal Z but different A.',
    interactionType: 'element-synthesizer',
    nodeId: 'c6_chem_014',
  },
];

// ==========================================
// MANDATORY SECTION 4: PREDICTION QUESTIONS
// ==========================================
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: What will happen to high-energy positively charged alpha particles when directed at a thin metal foil during Rutherford\'s experiment?',
    options: [
      'All alpha particles will bounce straight backward into the emitter.',
      'Most alpha particles pass straight through un-deflected, while a tiny fraction bounce back at large angles.',
      'All alpha particles turn into negative electrons upon contact with the foil.',
      'The foil absorbs all alpha particles completely with zero deflection or penetration.',
    ],
    correctIndex: 1,
    verifyInstruction: 'Run Lab 2 (Rutherford Scattering) to observe most particles passing through empty space and rare nucleus bounces!',
    nodeId: 'c6_chem_012',
  },
  {
    question: 'Predict: If an atom has an Atomic Number Z = 11 (Sodium) and a Mass Number A = 23, how many neutrons reside in its nucleus?',
    options: [
      '11 neutrons',
      '23 neutrons',
      '12 neutrons',
      '34 neutrons',
    ],
    correctIndex: 2,
    verifyInstruction: 'Use the formula Neutrons N = Mass Number (A) - Atomic Number (Z): 23 - 11 = 12.',
    nodeId: 'c6_chem_015',
  },
];

// ==========================================
// MANDATORY SECTION 5: OBSERVATION QUESTIONS
// ==========================================
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe about electron beam path when positive and negative voltage plates are turned on in the Cathode Ray Tube?',
    observableOptions: [
      'The ray bends upward toward the positive plate, demonstrating electrons carry negative charge.',
      'The ray bends downward toward the negative plate.',
      'The ray disappears completely when electric voltage is applied.',
      'The ray turns into heavy neutral particles that drop straight to the floor.',
    ],
    correctIndex: 0,
    nodeId: 'c6_chem_011',
  },
  {
    question: 'What happens when you add electrons beyond 2 in the K-shell of a Bohr atom model?',
    observableOptions: [
      'The K-shell expands infinitely to fit 100 electrons.',
      'The extra electron is forced into the next higher energy level (L-shell) due to the 2n² limit (2 × 1² = 2).',
      'The atom explodes and loses all its protons.',
      'The electron transforms into a neutron in the nucleus.',
    ],
    correctIndex: 1,
    nodeId: 'c6_chem_016',
  },
];

// ==========================================
// MANDATORY SECTION 6: REAL WORLD ACTIVITY
// ==========================================
const REAL_WORLD_ACTIVITY = {
  title: 'Mass Spectrometry & Nuclear Industry Particle Analysis',
  description: 'Industrial analytical chemists use mass spectrometers and atomic particle detectors to identify unknown chemical elements in food, forensic samples, and nuclear fuel rods by calculating mass numbers (A) and atomic numbers (Z).',
  steps: [
    'Step 1: Extract an unknown sample from an environmental water source.',
    'Step 2: Ionize the sample to separate electrons and measure atomic number Z = 17 (Chlorine).',
    'Step 3: Measure total nuclear mass: Sample A1 = 35 amu (18 neutrons), Sample A2 = 37 amu (20 neutrons).',
    'Step 4: Conclude that the sample contains natural isotopes of Chlorine (Cl-35 and Cl-37) with electronic configuration 2, 8, 7.',
  ],
};

// ==========================================
// EXISTING MISCONCEPTIONS (Preserved & Expanded)
// ==========================================
export interface Misconception {
  id: string;
  misconception: string;
  correction: string;
}

export const MISCONCEPTIONS: Misconception[] = [
  {
    id: 'misc_1',
    misconception: 'Atoms Are Solid Spheres with No Internal Parts',
    correction: 'Dalton originally proposed indivisible spheres, but Thomson, Rutherford, and Chadwick proved atoms consist of protons, neutrons, and electrons around a dense central nucleus.',
  },
  {
    id: 'misc_2',
    misconception: 'Atoms Are Completely Filled with No Empty Space',
    correction: 'An atom is almost entirely empty space! If the central nucleus were the size of a marble in a stadium, the electrons would be orbiting around the outer stands.',
  },
  {
    id: 'misc_3',
    misconception: 'Protons, Neutrons, and Electrons Have Equal Mass',
    correction: 'Protons and neutrons have nearly equal mass (~1 amu), whereas an electron is extremely light (~1/1836 amu), contributing negligibly to atomic mass.',
  },
  {
    id: 'misc_4',
    misconception: 'Dalton Theory Proves Atoms Can Never Be Divided',
    correction: 'Modern chemistry modified Dalton\'s theory: nuclear reactions can split atoms into subatomic particles, and atoms can lose or gain electrons.',
  },
  {
    id: 'misc_5',
    misconception: 'Electrons Orbit Nucleus Exactly Like Planets Around Sun',
    correction: 'While solar planetary models introduce shells, electrons actually exist in 3D probability clouds across discrete energy levels (K, L, M, N).',
  },
  {
    id: 'misc_6',
    misconception: 'Atomic Number Z equals total particles inside the nucleus',
    correction: 'Atomic Number Z is strictly the number of PROTONS in the nucleus. Mass Number A is the sum of protons AND neutrons.',
  },
];

// ==========================================
// DIAGNOSTIC QUESTIONS (8 Items)
// ==========================================
export interface DiagnosticQuestion {
  id: string;
  nodeId: NodeId;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const DIAGNOSTIC_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: 'diag_1',
    nodeId: 'c6_chem_009',
    question: 'Which of the following best defines an atom in ICSE Chemistry?',
    options: [
      'The smallest particle of an element that can take part in a chemical reaction.',
      'A large visible particle made of multiple compounds.',
      'A liquid drop containing dissolved mineral salts.',
      'A light ray emitted from incandescent bulbs.',
    ],
    correctIndex: 0,
    explanation: 'An atom is the smallest unit of an element that retains its chemical properties and participates in chemical reactions.',
  },
  {
    id: 'diag_2',
    nodeId: 'c6_chem_010',
    question: 'Which scientist formulated the early Atomic Theory stating atoms are indivisible units of matter?',
    options: ['Ernest Rutherford', 'John Dalton', 'J.J. Thomson', 'James Chadwick'],
    correctIndex: 1,
    explanation: 'John Dalton proposed Dalton\'s Atomic Theory in 1808.',
  },
  {
    id: 'diag_3',
    nodeId: 'c6_chem_011',
    question: 'What is the electrical charge and relative mass of an electron?',
    options: [
      'Charge = -1, Mass = ~1/1836 amu',
      'Charge = +1, Mass = 1 amu',
      'Charge = 0, Mass = 1 amu',
      'Charge = +2, Mass = 4 amu',
    ],
    correctIndex: 0,
    explanation: 'Electrons have a single negative charge (-1) and a relative mass of approximately 1/1836 of a proton.',
  },
  {
    id: 'diag_4',
    nodeId: 'c6_chem_012',
    question: 'What major discovery resulted from Rutherford\'s Gold Foil Experiment?',
    options: [
      'Discovery of the dense positively charged central nucleus',
      'Discovery of electron energy shells',
      'Discovery of neutrons in 1932',
      'Proof that atoms are solid billiard balls',
    ],
    correctIndex: 0,
    explanation: 'Rutherford deduced that positive charge and mass are concentrated in a tiny central nucleus because a few alpha particles bounced straight back.',
  },
  {
    id: 'diag_5',
    nodeId: 'c6_chem_013',
    question: 'Which subatomic particle has no electrical charge and resides in the nucleus?',
    options: ['Electron', 'Proton', 'Neutron', 'Positron'],
    correctIndex: 2,
    explanation: 'Neutrons were discovered by James Chadwick in 1932 as neutral particles in the nucleus with mass equal to 1 amu.',
  },
  {
    id: 'diag_6',
    nodeId: 'c6_chem_014',
    question: 'What subatomic particles make up the "nucleons" within an atom\'s nucleus?',
    options: [
      'Protons and Electrons',
      'Protons and Neutrons',
      'Neutrons and Electrons',
      'Electrons only',
    ],
    correctIndex: 1,
    explanation: 'Protons and neutrons reside inside the nucleus and are collectively referred to as nucleons.',
  },
  {
    id: 'diag_7',
    nodeId: 'c6_chem_015',
    question: 'An atom of Carbon has Atomic Number Z = 6 and Mass Number A = 12. How many neutrons does it have?',
    options: ['6 neutrons', '12 neutrons', '18 neutrons', '0 neutrons'],
    correctIndex: 0,
    explanation: 'Number of neutrons N = Mass Number (A) - Atomic Number (Z) = 12 - 6 = 6.',
  },
  {
    id: 'diag_8',
    nodeId: 'c6_chem_016',
    question: 'According to the Bohr-Bury scheme, what is the maximum number of electrons that can be held in the K shell (n=1)?',
    options: ['8 electrons', '2 electrons', '18 electrons', '32 electrons'],
    correctIndex: 1,
    explanation: 'Using the formula 2n² for n=1: 2(1)² = 2 electrons max in the K shell.',
  },
];

// ==========================================
// ELEMENT DATA (Z=1 to Z=20)
// ==========================================
export interface ElementInfo {
  z: number;
  name: string;
  symbol: string;
  a: number;
  protons: number;
  neutrons: number;
  electrons: number;
  shells: [number, number, number, number]; // K, L, M, N
  category: 'Nonmetal' | 'Noble Gas' | 'Alkali Metal' | 'Alkaline Earth Metal' | 'Metalloid' | 'Halogen';
  icseFact: string;
}

export const ELEMENTS_DATA: ElementInfo[] = [
  { z: 1, name: 'Hydrogen', symbol: 'H', a: 1, protons: 1, neutrons: 0, electrons: 1, shells: [1, 0, 0, 0], category: 'Nonmetal', icseFact: 'Lightest element; only common atom without neutrons.' },
  { z: 2, name: 'Helium', symbol: 'He', a: 4, protons: 2, neutrons: 2, electrons: 2, shells: [2, 0, 0, 0], category: 'Noble Gas', icseFact: 'Has a duplet stable shell configuration in K shell.' },
  { z: 3, name: 'Lithium', symbol: 'Li', a: 7, protons: 3, neutrons: 4, electrons: 3, shells: [2, 1, 0, 0], category: 'Alkali Metal', icseFact: 'Lightest metal; starts the L-shell electron filling.' },
  { z: 4, name: 'Beryllium', symbol: 'Be', a: 9, protons: 4, neutrons: 5, electrons: 4, shells: [2, 2, 0, 0], category: 'Alkaline Earth Metal', icseFact: 'Group 2 metal with 2 valence electrons.' },
  { z: 5, name: 'Boron', symbol: 'B', a: 11, protons: 5, neutrons: 6, electrons: 5, shells: [2, 3, 0, 0], category: 'Metalloid', icseFact: 'Metalloid element used in heat-resistant glassware.' },
  { z: 6, name: 'Carbon', symbol: 'C', a: 12, protons: 6, neutrons: 6, electrons: 6, shells: [2, 4, 0, 0], category: 'Nonmetal', icseFact: 'Basis of organic chemistry; tetravalent with 4 outer electrons.' },
  { z: 7, name: 'Nitrogen', symbol: 'N', a: 14, protons: 7, neutrons: 7, electrons: 7, shells: [2, 5, 0, 0], category: 'Nonmetal', icseFact: 'Makes up 78% of Earth atmosphere by volume.' },
  { z: 8, name: 'Oxygen', symbol: 'O', a: 16, protons: 8, neutrons: 8, electrons: 8, shells: [2, 6, 0, 0], category: 'Nonmetal', icseFact: 'Essential for respiration; needs 2 electrons to complete octet.' },
  { z: 9, name: 'Fluorine', symbol: 'F', a: 19, protons: 9, neutrons: 10, electrons: 9, shells: [2, 7, 0, 0], category: 'Halogen', icseFact: 'Most electronegative halogen; 7 valence electrons.' },
  { z: 10, name: 'Neon', symbol: 'Ne', a: 20, protons: 10, neutrons: 10, electrons: 10, shells: [2, 8, 0, 0], category: 'Noble Gas', icseFact: 'Inert noble gas with a complete stable octet in L shell.' },
  { z: 11, name: 'Sodium', symbol: 'Na', a: 23, protons: 11, neutrons: 12, electrons: 11, shells: [2, 8, 1, 0], category: 'Alkali Metal', icseFact: 'Highly reactive metal; starts filling the M shell.' },
  { z: 12, name: 'Magnesium', symbol: 'Mg', a: 24, protons: 12, neutrons: 12, electrons: 12, shells: [2, 8, 2, 0], category: 'Alkaline Earth Metal', icseFact: 'Burns with a bright white flame to form Magnesium Oxide.' },
  { z: 13, name: 'Aluminium', symbol: 'Al', a: 27, protons: 13, neutrons: 14, electrons: 13, shells: [2, 8, 3, 0], category: 'Nonmetal', icseFact: 'Abundant metal with 3 valence electrons in M shell.' },
  { z: 14, name: 'Silicon', symbol: 'Si', a: 28, protons: 14, neutrons: 14, electrons: 14, shells: [2, 8, 4, 0], category: 'Metalloid', icseFact: 'Key semiconductor material used in microchips.' },
  { z: 15, name: 'Phosphorus', symbol: 'P', a: 31, protons: 15, neutrons: 16, electrons: 15, shells: [2, 8, 5, 0], category: 'Nonmetal', icseFact: 'Nonmetal stored under water; 5 valence electrons.' },
  { z: 16, name: 'Sulfur', symbol: 'S', a: 32, protons: 16, neutrons: 16, electrons: 16, shells: [2, 8, 6, 0], category: 'Nonmetal', icseFact: 'Yellow crystalline solid nonmetal with configuration 2,8,6.' },
  { z: 17, name: 'Chlorine', symbol: 'Cl', a: 35, protons: 17, neutrons: 18, electrons: 17, shells: [2, 8, 7, 0], category: 'Halogen', icseFact: 'Greenish-yellow gas halogen with 7 outer electrons.' },
  { z: 18, name: 'Argon', symbol: 'Ar', a: 40, protons: 18, neutrons: 22, electrons: 18, shells: [2, 8, 8, 0], category: 'Noble Gas', icseFact: 'Inert gas filling bulbs; complete octet in M shell.' },
  { z: 19, name: 'Potassium', symbol: 'K', a: 39, protons: 19, neutrons: 20, electrons: 19, shells: [2, 8, 8, 1], category: 'Alkali Metal', icseFact: 'Starts filling the N shell with 1 valence electron.' },
  { z: 20, name: 'Calcium', symbol: 'Ca', a: 40, protons: 20, neutrons: 20, electrons: 20, shells: [2, 8, 8, 2], category: 'Alkaline Earth Metal', icseFact: 'Essential mineral for bones; 2 electrons in N shell.' },
];

// ==========================================
// 22+ Progressive Challenges (Foundation, Standard, Advanced)
// ==========================================
export interface Challenge {
  id: string;
  nodeId: NodeId;
  type: 'multiple-choice' | 'numeric' | 'fill-blank' | 'drag-label' | 'config-builder';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: 'recall' | 'understanding' | 'application' | 'analysis' | 'evaluation';
  question: string;
  options?: string[];
  correctIndex?: number;
  correctAnswer?: string | number;
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
  targetZ?: number;
}

export const CHALLENGES: Challenge[] = [
  // --- FOUNDATION TIER (7 Challenges) ---
  {
    id: 'ch_1',
    nodeId: 'c6_chem_009',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'According to fundamental chemistry principles, what is the smallest indivisible unit of an element that retains its identity in a chemical reaction?',
    options: ['Molecule', 'Atom', 'Compound', 'Electron Cloud'],
    correctIndex: 1,
    explanation: 'An atom is defined as the smallest constituent particle of matter that uniquely defines a chemical element.',
    hints: ['Think of the fundamental building block of elements.', 'It comes from the Greek word "atomos" meaning indivisible.', 'Molecules are combinations of these!'],
  },
  {
    id: 'ch_2',
    nodeId: 'c6_chem_010',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which historical atomic model compared atoms to hard, solid, featureless spheres like billiard balls?',
    options: ["Rutherford's Planetary Model", "Dalton's Atomic Theory", "Thomson's Plum Pudding Model", "Bohr's Shell Model"],
    correctIndex: 1,
    explanation: "John Dalton proposed in 1808 that atoms were hard, solid, indivisible spheres without internal subatomic parts.",
    hints: ['Who proposed atomic theory in 1808?', 'This model did not have protons or electrons yet.', 'It was proposed by John Dalton.'],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_3',
    nodeId: 'c6_chem_011',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Who discovered the electron through experiments with Cathode Ray Discharge Tubes?',
    options: ['James Chadwick', 'Ernest Rutherford', 'J.J. Thomson', 'Niels Bohr'],
    correctIndex: 2,
    explanation: 'J.J. Thomson discovered negative cathode ray particles in 1897 and named them electrons.',
    hints: ['He proposed the Plum Pudding model.', 'Initials J.J.', 'He worked with cathode ray tubes.'],
  },
  {
    id: 'ch_4',
    nodeId: 'c6_chem_012',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the electrical charge and mass of a proton relative to an electron?',
    options: [
      'Charge = +1, Mass = 1 amu (~1836 times heavier than electron)',
      'Charge = -1, Mass = 0 amu',
      'Charge = 0, Mass = 1 amu',
      'Charge = +2, Mass = 4 amu',
    ],
    correctIndex: 0,
    explanation: 'A proton has a positive charge (+1) and a relative mass of 1 atomic mass unit (amu).',
    hints: ['Protons are positive (+).', 'Protons reside in the heavy central nucleus.', 'Mass is approximately 1 amu.'],
  },
  {
    id: 'ch_5',
    nodeId: 'c6_chem_013',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which subatomic particle was discovered by James Chadwick in 1932 with no electric charge?',
    options: ['Positron', 'Proton', 'Neutron', 'Electron'],
    correctIndex: 2,
    explanation: 'James Chadwick discovered the neutral neutron, which resides in the nucleus alongside protons.',
    hints: ['Think of the word "neutral".', 'Discovered in 1932.', 'It adds mass to the nucleus without changing charge.'],
  },
  {
    id: 'ch_6',
    nodeId: 'c6_chem_014',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'The dense region at the center of an atom containing protons and neutrons is called the:',
    options: ['Electron cloud', 'Nucleus', 'Outer shell', 'Cathode'],
    correctIndex: 1,
    explanation: 'The nucleus is the extremely small, high-density core at the center of an atom holding all nucleons.',
    hints: ['It holds protons and neutrons.', 'Rutherford discovered it.', 'It contains over 99.9% of the atom\'s mass.'],
  },
  {
    id: 'ch_7',
    nodeId: 'c6_chem_015',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'The Atomic Number (Z) of a neutral atom is always equal to the number of:',
    options: ['Neutrons only', 'Protons in its nucleus', 'Protons + Neutrons', 'Neutrons + Electrons'],
    correctIndex: 1,
    explanation: 'Atomic Number Z is strictly equal to the number of protons in the nucleus of an atom.',
    hints: ['Z defines the identity of the element.', 'It equals the number of protons.', 'In a neutral atom, it also equals electrons!'],
  },

  // --- STANDARD TIER (8 Challenges) ---
  {
    id: 'ch_8',
    nodeId: 'c6_chem_016',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Using Bohr-Bury rule 2n², calculate the maximum capacity of electrons allowed in the L shell (where n = 2).',
    correctAnswer: 8,
    explanation: 'For shell n = 2 (L shell), maximum capacity = 2 × (2)² = 2 × 4 = 8 electrons.',
    hints: ['Formula is 2n².', 'n = 2 for L shell.', '2 × 2² = 2 × 4 = ?'],
  },
  {
    id: 'ch_9',
    nodeId: 'c6_chem_015',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'An atom of Carbon-14 has Mass Number A = 14 and Atomic Number Z = 6. How many neutrons are in its nucleus?',
    correctAnswer: 8,
    explanation: 'Number of neutrons N = Mass Number (A) - Atomic Number (Z) = 14 - 6 = 8 neutrons.',
    hints: ['Formula is N = A - Z.', 'A = 14, Z = 6.', '14 - 6 = ?'],
  },
  {
    id: 'ch_10',
    nodeId: 'c6_chem_011',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'In Thomson\'s Cathode Ray experiment, why did the ray deflect towards the positively charged electric plate?',
    options: [
      'Because opposite electrical charges attract each other, proving cathode rays consist of negative particles.',
      'Because like charges attract each other.',
      'Because light rays always refract towards positive glass.',
      'Because neutrons pushed the ray upwards.',
    ],
    correctIndex: 0,
    explanation: 'Opposite charges attract. Deflection towards the positive plate proved cathode ray particles (electrons) carry a negative charge.',
    hints: ['What charge attracts positive?', 'Opposite charges attract.', 'Cathode ray particles are negative.'],
  },
  {
    id: 'ch_11',
    nodeId: 'c6_chem_012',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'During Rutherford\'s Gold Foil Experiment, why did a tiny fraction (1 in 20,000) of alpha particles bounce directly back?',
    options: [
      'They hit the massive, concentrated, positively charged nucleus head-on.',
      'They collided with light negative electrons.',
      'They were repelled by empty space.',
      'The gold foil turned into lead upon impact.',
    ],
    correctIndex: 0,
    explanation: 'Large deflection/rebound occurred only when positive alpha particles hit the concentrated positive central nucleus.',
    hints: ['Alpha particles are positive (+).', 'Like charges repel strongly.', 'The nucleus is dense and positive!'],
  },
  {
    id: 'ch_12',
    nodeId: 'c6_chem_016',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'What is the correct electronic configuration of Sodium (Na), which has Atomic Number Z = 11?',
    options: ['2, 8, 1', '2, 9', '2, 8, 8, 1', '11, 0, 0'],
    correctIndex: 0,
    explanation: 'Sodium Z = 11 fills K shell with 2, L shell with 8, and the remaining 1 electron enters the M shell (2, 8, 1).',
    hints: ['K shell max 2.', 'L shell max 8.', 'Remaining 1 goes to M shell.'],
  },
  {
    id: 'ch_13',
    nodeId: 'c6_chem_015',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'If a neutral atom has 17 electrons and 18 neutrons, what are its Atomic Number (Z) and Mass Number (A)?',
    options: [
      'Z = 17, A = 35 (Chlorine)',
      'Z = 18, A = 35 (Argon)',
      'Z = 35, A = 17',
      'Z = 17, A = 18',
    ],
    correctIndex: 0,
    explanation: 'In neutral atom, Protons = Electrons = 17 (so Z = 17). Mass A = Protons (17) + Neutrons (18) = 35.',
    hints: ['Z = Protons = Electrons in neutral atom.', 'A = Protons + Neutrons.', '17 + 18 = 35.'],
  },
  {
    id: 'ch_14',
    nodeId: 'c6_chem_014',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'What are the shell principal quantum labels designated by Niels Bohr starting from the innermost shell outward?',
    options: ['K, L, M, N', 'A, B, C, D', '1, 4, 9, 16', 'Alpha, Beta, Gamma, Delta'],
    correctIndex: 0,
    explanation: 'Bohr designated energy levels outwards from the nucleus as K (n=1), L (n=2), M (n=3), and N (n=4).',
    hints: ['Starts with letter K.', 'Alphabetical order after K: K, L, M, N.', 'Innermost is K.'],
  },
  {
    id: 'ch_15',
    nodeId: 'c6_chem_013',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'An isotope of Oxygen has Mass Number A = 18 and Atomic Number Z = 8. Calculate how many neutrons reside in its nucleus.',
    correctAnswer: 10,
    explanation: 'Neutrons N = Mass Number A (18) - Atomic Number Z (8) = 10 neutrons.',
    hints: ['Use N = A - Z.', '18 - 8 = ?', 'Subtract Z from A.'],
  },

  // --- ADVANCED TIER (7+ Challenges) ---
  {
    id: 'ch_16',
    nodeId: 'c6_chem_016',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Potassium has Atomic Number Z = 19. Why is its electronic configuration written as 2, 8, 8, 1 instead of 2, 8, 9?',
    options: [
      'The Bohr-Bury octet rule states the outermost shell cannot hold more than 8 electrons before a new shell starts.',
      'The M shell can only ever hold a total of 8 electrons in all elements.',
      'Electrons repel each other so hard that 9 is a prime number.',
      'Potassium loses an electron immediately to become 2, 8, 8.',
    ],
    correctIndex: 0,
    explanation: 'According to the Bohr-Bury rules, the outermost valence shell cannot accommodate more than 8 electrons, so the 19th electron enters the N shell.',
    hints: ['Think of the maximum valence electron limit (octet rule).', 'Outer shell cap is 8 electrons.', 'Rule requires starting the N shell.'],
  },
  {
    id: 'ch_17',
    nodeId: 'c6_chem_015',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Atoms with the SAME Atomic Number (Z) but DIFFERENT Mass Numbers (A) due to different neutron counts are called:',
    options: ['Isotopes', 'Isobars', 'Isotones', 'Allotropes'],
    correctIndex: 0,
    explanation: 'Isotopes are atoms of the same element (same Z = same protons) with different numbers of neutrons (different A).',
    hints: ['Same element, different mass.', 'Carbon-12 and Carbon-14 are examples.', 'They are called Isotopes.'],
  },
  {
    id: 'ch_18',
    nodeId: 'c6_chem_014',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'If the diameter of an atomic nucleus is roughly 10⁻¹⁵ meters and the atomic diameter is 10⁻¹⁰ meters, what ratio of space is empty?',
    options: ['Over 99.99999999999%', '50%', '10%', 'Exactly 0%'],
    correctIndex: 0,
    explanation: 'The volume ratio of atom to nucleus is (10⁻¹⁰ / 10⁻¹⁵)³ = 10¹⁵ (1 trillion to 1). Atoms are practically 99.99999999999% empty space!',
    hints: ['Cube the diameter ratio to compare volume.', 'Nucleus volume is 1 trillionth of the atom!', 'Virtually all of it is empty space.'],
  },
  {
    id: 'ch_19',
    nodeId: 'c6_chem_016',
    type: 'config-builder',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Configure Calcium (Z = 20): Select the correct distribution of 20 electrons into K, L, M, and N shells.',
    options: ['2, 8, 8, 2', '2, 8, 10, 0', '2, 10, 8, 0', '2, 8, 9, 1'],
    correctIndex: 0,
    targetZ: 20,
    explanation: 'Calcium Z=20 fills: K=2, L=8, M=8, N=2 following octet stability rules.',
    hints: ['K=2', 'L=8', 'M=8, N=2'],
  },
  {
    id: 'ch_20',
    nodeId: 'c6_chem_011',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'If an electric field plate is removed and a magnetic field is applied perpendicular to a cathode ray beam, what happens?',
    options: [
      'The cathode ray deflects in a circular direction according to electromagnetic force on moving negative charges.',
      'The ray stops completely.',
      'The ray turns green and absorbs heat.',
      'No deflection occurs because magnets only affect protons.',
    ],
    correctIndex: 0,
    explanation: 'Cathode rays are moving electrons (charged particles). A magnetic field exerts a Lorentz force perpendicular to velocity, deflecting the beam.',
    hints: ['Moving charges experience force in magnetic fields.', 'Electrons are negative moving charges.', 'Beam deflects sideways.'],
  },
  {
    id: 'ch_21',
    nodeId: 'c6_chem_012',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Which flaw in Rutherford\'s planetary atomic model was resolved by Niels Bohr\'s quantum energy shell postulate?',
    options: [
      'Accelerating charged electrons in planetary orbits should continuously radiate energy and spiral into the nucleus.',
      'Rutherford forgot that electrons have positive charge.',
      'Rutherford claimed neutrons weighed zero amu.',
      'Rutherford stated atoms were solid lead balls.',
    ],
    correctIndex: 0,
    explanation: 'Classical electrodynamics predicted revolving electrons would lose energy continuously and collapse into the nucleus. Bohr proposed stationary discrete non-radiating shells.',
    hints: ['According to physics, moving charge radiates energy.', 'Why wouldn\'t the electron crash into the nucleus?', 'Bohr quantized the electron orbits!'],
  },
  {
    id: 'ch_22',
    nodeId: 'c6_chem_015',
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A neutral ion of element Argon has Mass Number A = 40 and contains 22 neutrons. What is its Atomic Number Z?',
    correctAnswer: 18,
    explanation: 'Atomic Number Z = Mass Number (A) - Neutrons (N) = 40 - 22 = 18.',
    hints: ['Z = A - N', '40 - 22 = ?', 'Argon is element 18.'],
  },
];

// ==========================================
// DEFAULT PROPS INTERFACE
// ==========================================
export interface C6_ChemistryAtomicstructuresubatomicparticlesSimProps {
  onComplete?: (score: number) => void;
  initialTab?: 'discovery' | 'lab' | 'builder' | 'challenges' | 'summary';
}

// ==========================================
// SVG DIAGRAM COMPONENTS
// ==========================================

// Diagram 1: Cathode Ray Tube Simulation SVG
const CathodeRayTubeSVG: React.FC<{ voltage: number; electricField: number }> = ({ voltage, electricField }) => {
  // Deflection calculation
  const deflectionY = electricField * 1.5;
  const beamPath = `M 80 120 Q 240 120, 360 ${120 - deflectionY}`;

  return (
    <svg viewBox="0 0 440 240" className="w-full h-auto bg-slate-950 rounded-xl border border-cyan-500/30 shadow-2xl">
      <defs>
        <linearGradient id="glassGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.1" />
          <stop offset="50%" stopColor="#0284c7" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.2" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Discharge Tube Glass Envelope */}
      <path d="M 40 90 L 140 90 L 320 50 L 390 50 C 410 50 410 190 390 190 L 320 190 L 140 150 L 40 150 Z"
        fill="url(#glassGrad)" stroke="#38bdf8" strokeWidth="2" />

      {/* Cathode (-) */}
      <rect x="50" y="95" width="10" height="50" fill="#ef4444" rx="2" />
      <text x="55" y="85" fill="#ef4444" fontSize="12" fontWeight="bold" textAnchor="middle">Cathode (-)</text>

      {/* Anode (+) with aperture */}
      <rect x="130" y="95" width="8" height="20" fill="#22c55e" rx="1" />
      <rect x="130" y="125" width="8" height="20" fill="#22c55e" rx="1" />
      <text x="134" y="85" fill="#22c55e" fontSize="12" fontWeight="bold" textAnchor="middle">Anode (+)</text>

      {/* Electric Field Plates */}
      {/* Top Positive Plate */}
      <rect x="220" y="65" width="80" height="10" fill={electricField > 0 ? '#ef4444' : '#64748b'} rx="3" />
      <text x="260" y="58" fill="#ef4444" fontSize="11" textAnchor="middle" fontWeight="bold">
        {electricField > 0 ? '+ Electric Plate' : 'Plate Neutral'}
      </text>

      {/* Bottom Negative Plate */}
      <rect x="220" y="165" width="80" height="10" fill={electricField > 0 ? '#3b82f6' : '#64748b'} rx="3" />
      <text x="260" y="190" fill="#3b82f6" fontSize="11" textAnchor="middle" fontWeight="bold">
        {electricField > 0 ? '- Electric Plate' : 'Plate Neutral'}
      </text>

      {/* High Voltage Source Wires */}
      <path d="M 55 145 L 55 210 L 134 210 L 134 145" stroke="#e2e8f0" strokeWidth="2" fill="none" strokeDasharray="4 2" />
      <rect x="75" y="195" width="40" height="25" fill="#1e293b" stroke="#e2e8f0" rx="4" />
      <text x="95" y="212" fill="#facc15" fontSize="10" textAnchor="middle" fontWeight="bold">{voltage} V</text>

      {/* Fluorescent Screen at End */}
      <path d="M 390 60 L 390 180" stroke="#4ade80" strokeWidth="6" strokeLinecap="round" />
      <text x="405" y="125" fill="#4ade80" fontSize="10" fontWeight="bold">Zinc Sulfide Screen</text>

      {/* Electron Beam */}
      <path d={beamPath} fill="none" stroke="#22d3ee" strokeWidth="4" filter="url(#glow)" />
      
      {/* Moving Electrons */}
      <circle cx="160" cy="120" r="3" fill="#ffffff" />
      <circle cx="210" cy="120" r="3" fill="#ffffff" />
      <circle cx="280" cy={120 - deflectionY * 0.6} r="3" fill="#ffffff" />
      <circle cx="340" cy={120 - deflectionY * 0.9} r="3" fill="#ffffff" />

      {/* Impact Glow */}
      <circle cx="390" cy={120 - deflectionY} r="7" fill="#4ade80" opacity="0.8" filter="url(#glow)" />
    </svg>
  );
};

// Diagram 2: Rutherford Gold Foil Alpha Particle Scattering SVG
const RutherfordGoldFoilSVG: React.FC<{ particleCount: number }> = () => {
  return (
    <svg viewBox="0 0 460 260" className="w-full h-auto bg-slate-950 rounded-xl border border-amber-500/30 shadow-2xl">
      <defs>
        <radialGradient id="goldAtomGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
          <stop offset="70%" stopColor="#d97706" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#78350f" stopOpacity="0.0" />
        </radialGradient>
        <filter id="alphaGlow">
          <feGaussianBlur stdDeviation="2" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Title */}
      <text x="230" y="22" fill="#fbbf24" fontSize="13" textAnchor="middle" fontWeight="bold">
        Rutherford Alpha Particle (α²⁺) Scattering Model
      </text>

      {/* Alpha Ray Source Emitter */}
      <rect x="20" y="100" width="45" height="60" fill="#334155" stroke="#94a3b8" strokeWidth="2" rx="4" />
      <circle cx="42" cy="130" r="8" fill="#ef4444" />
      <text x="42" y="178" fill="#ef4444" fontSize="10" textAnchor="middle" fontWeight="bold">Radium Source (α)</text>

      {/* Slit Collimator */}
      <rect x="95" y="80" width="8" height="40" fill="#64748b" />
      <rect x="95" y="140" width="8" height="40" fill="#64748b" />

      {/* Gold Foil Target */}
      <rect x="230" y="50" width="6" height="160" fill="#fbbf24" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="233" y="225" fill="#fbbf24" fontSize="11" textAnchor="middle" fontWeight="bold">Thin Gold Foil (100nm)</text>

      {/* Gold Atoms Matrix overlay */}
      <circle cx="233" cy="80" r="22" fill="url(#goldAtomGrad)" stroke="#fbbf24" strokeDasharray="2 2" />
      <circle cx="233" cy="80" r="4" fill="#ef4444" /> {/* Gold Nucleus 1 */}
      
      <circle cx="233" cy="130" r="22" fill="url(#goldAtomGrad)" stroke="#fbbf24" strokeDasharray="2 2" />
      <circle cx="233" cy="130" r="5" fill="#ef4444" /> {/* Gold Nucleus 2 (Center Impact) */}

      <circle cx="233" cy="180" r="22" fill="url(#goldAtomGrad)" stroke="#fbbf24" strokeDasharray="2 2" />
      <circle cx="233" cy="180" r="4" fill="#ef4444" /> {/* Gold Nucleus 3 */}

      {/* Circular ZnS Detector Screen */}
      <path d="M 170 40 A 130 130 0 1 1 170 220" stroke="#22c55e" strokeWidth="4" fill="none" strokeDasharray="6 3" />
      <text x="360" y="45" fill="#22c55e" fontSize="10" fontWeight="bold">Detecting Screen</text>

      {/* Trajectories of Alpha Particles */}
      {/* Trajectory 1: Straight through empty space */}
      <path d="M 50 115 L 233 115 L 390 115" stroke="#38bdf8" strokeWidth="2" opacity="0.8" />
      {/* Trajectory 2: Slightly deflected */}
      <path d="M 50 122 L 225 124 Q 235 125, 370 80" stroke="#38bdf8" strokeWidth="2" opacity="0.8" />
      {/* Trajectory 3: Direct Head-on Collision -> Rebound Large Angle */}
      <path d="M 50 130 L 228 130 Q 231 130, 140 200" stroke="#f43f5e" strokeWidth="2.5" filter="url(#alphaGlow)" />
      {/* Trajectory 4: Straight through bottom */}
      <path d="M 50 145 L 233 145 L 390 145" stroke="#38bdf8" strokeWidth="2" opacity="0.8" />

      {/* Legend Callouts */}
      <text x="310" y="90" fill="#38bdf8" fontSize="9">99.9% Pass Straight (Empty Space)</text>
      <text x="110" y="215" fill="#f43f5e" fontSize="9" fontWeight="bold">0.01% Bounce Back (Dense + Nucleus)</text>
    </svg>
  );
};

// Diagram 3: Dynamic Interactive Bohr Model SVG
const BohrAtomModelSVG: React.FC<{ element: ElementInfo }> = ({ element }) => {
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setAngle((prev) => (prev + 2) % 360);
    }, 40);
    return () => clearInterval(timer);
  }, []);

  const shellRadii = [45, 75, 105, 135]; // K, L, M, N radii in SVG units
  const shellColors = ['#38bdf8', '#a855f7', '#f59e0b', '#10b981'];

  return (
    <svg viewBox="0 0 340 340" className="w-full h-auto bg-slate-900 rounded-xl border border-cyan-500/40 shadow-2xl">
      <defs>
        <radialGradient id="nucleusGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ef4444" stopOpacity="1" />
          <stop offset="60%" stopColor="#dc2626" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#991b1b" stopOpacity="0.2" />
        </radialGradient>
      </defs>

      {/* Center Group */}
      <g transform="translate(170, 170)">
        {/* Render Bohr Shells */}
        {element.shells.map((count, sIdx) => {
          if (count === 0) return null;
          const r = shellRadii[sIdx];
          const color = shellColors[sIdx];
          const shellNames = ['K', 'L', 'M', 'N'];

          return (
            <g key={`shell-${sIdx}`}>
              {/* Shell Orbit Path */}
              <circle cx="0" cy="0" r={r} fill="none" stroke={color} strokeWidth="1.5" strokeDasharray="4 3" opacity="0.6" />
              <text x={r + 4} y="-4" fill={color} fontSize="10" fontWeight="bold">
                {shellNames[sIdx]} ({count}e⁻)
              </text>

              {/* Render Electrons on Shell Orbit */}
              {Array.from({ length: count }).map((_, eIdx) => {
                const stepAngle = (360 / count) * eIdx;
                // Alternate orbit speeds/directions
                const dir = sIdx % 2 === 0 ? 1 : -1;
                const currentAngleDeg = stepAngle + angle * dir * (1 + sIdx * 0.3);
                const rad = (currentAngleDeg * Math.PI) / 180;
                const ex = r * Math.cos(rad);
                const ey = r * Math.sin(rad);

                return (
                  <g key={`e-${sIdx}-${eIdx}`}>
                    <circle cx={ex} cy={ey} r="5" fill="#ffffff" stroke={color} strokeWidth="2" />
                    <circle cx={ex} cy={ey} r="2" fill="#0284c7" />
                  </g>
                );
              })}
            </g>
          );
        })}

        {/* Central Nucleus */}
        <circle cx="0" cy="0" r="24" fill="url(#nucleusGlow)" stroke="#f87171" strokeWidth="2" />

        {/* Nucleus Content Info */}
        <text x="0" y="-4" fill="#ffffff" fontSize="10" textAnchor="middle" fontWeight="bold">
          {element.protons} P⁺
        </text>
        <text x="0" y="10" fill="#fca5a5" fontSize="10" textAnchor="middle" fontWeight="bold">
          {element.neutrons} N⁰
        </text>
      </g>

      {/* Element Symbol Overlay */}
      <rect x="12" y="12" width="70" height="55" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" rx="6" />
      <text x="24" y="32" fill="#94a3b8" fontSize="10" fontWeight="bold">A={element.a}</text>
      <text x="47" y="52" fill="#38bdf8" fontSize="20" fontWeight="extrabold" textAnchor="middle">{element.symbol}</text>
      <text x="24" y="62" fill="#94a3b8" fontSize="10" fontWeight="bold">Z={element.z}</text>
    </svg>
  );
};

// Diagram 4: Subatomic Particles Comparison Chart SVG
const SubatomicParticlesComparisonSVG: React.FC = () => {
  return (
    <svg viewBox="0 0 460 180" className="w-full h-auto bg-slate-900 rounded-xl border border-slate-700 shadow-xl p-2">
      <rect x="10" y="10" width="440" height="160" fill="#0f172a" rx="8" />

      {/* Headers */}
      <text x="30" y="35" fill="#94a3b8" fontSize="11" fontWeight="bold">Particle</text>
      <text x="120" y="35" fill="#94a3b8" fontSize="11" fontWeight="bold">Discoverer</text>
      <text x="230" y="35" fill="#94a3b8" fontSize="11" fontWeight="bold">Charge</text>
      <text x="310" y="35" fill="#94a3b8" fontSize="11" fontWeight="bold">Rel. Mass</text>
      <text x="390" y="35" fill="#94a3b8" fontSize="11" fontWeight="bold">Location</text>

      <line x1="20" y1="45" x2="440" y2="45" stroke="#334155" strokeWidth="1" />

      {/* Electron */}
      <circle cx="35" cy="65" r="7" fill="#38bdf8" />
      <text x="33" y="69" fill="#0f172a" fontSize="10" fontWeight="bold">e⁻</text>
      <text x="52" y="69" fill="#e2e8f0" fontSize="11" fontWeight="bold">Electron</text>
      <text x="120" y="69" fill="#cbd5e1" fontSize="11">J.J. Thomson (1897)</text>
      <text x="230" y="69" fill="#38bdf8" fontSize="11" fontWeight="bold">-1 (Negative)</text>
      <text x="310" y="69" fill="#cbd5e1" fontSize="11">1/1836 amu</text>
      <text x="390" y="69" fill="#cbd5e1" fontSize="11">Shells</text>

      <line x1="20" y1="85" x2="440" y2="85" stroke="#1e293b" strokeWidth="1" />

      {/* Proton */}
      <circle cx="35" cy="105" r="8" fill="#ef4444" />
      <text x="31" y="109" fill="#ffffff" fontSize="10" fontWeight="bold">p⁺</text>
      <text x="52" y="109" fill="#e2e8f0" fontSize="11" fontWeight="bold">Proton</text>
      <text x="120" y="109" fill="#cbd5e1" fontSize="11">E. Rutherford (1919)</text>
      <text x="230" y="109" fill="#ef4444" fontSize="11" fontWeight="bold">+1 (Positive)</text>
      <text x="310" y="109" fill="#cbd5e1" fontSize="11">1 amu</text>
      <text x="390" y="109" fill="#cbd5e1" fontSize="11">Nucleus</text>

      <line x1="20" y1="125" x2="440" y2="125" stroke="#1e293b" strokeWidth="1" />

      {/* Neutron */}
      <circle cx="35" cy="145" r="8" fill="#94a3b8" />
      <text x="31" y="149" fill="#0f172a" fontSize="10" fontWeight="bold">n⁰</text>
      <text x="52" y="149" fill="#e2e8f0" fontSize="11" fontWeight="bold">Neutron</text>
      <text x="120" y="149" fill="#cbd5e1" fontSize="11">J. Chadwick (1932)</text>
      <text x="230" y="149" fill="#94a3b8" fontSize="11" fontWeight="bold">0 (Neutral)</text>
      <text x="310" y="149" fill="#cbd5e1" fontSize="11">1 amu</text>
      <text x="390" y="149" fill="#cbd5e1" fontSize="11">Nucleus</text>
    </svg>
  );
};

// ==========================================
// MAIN INTERACTIVE SIMULATION COMPONENT
// ==========================================
export const C6_ChemistryAtomicstructuresubatomicparticlesSim: React.FC<
  C6_ChemistryAtomicstructuresubatomicparticlesSimProps
> = ({ onComplete, initialTab = 'discovery' }) => {
  // Navigation & State
  const [activeTab, setActiveTab] = useState<'discovery' | 'lab' | 'builder' | 'challenges' | 'summary'>(initialTab);
  const [selectedLabIndex, setSelectedLabIndex] = useState<number>(0);

  // Lab 1: Cathode Ray Tube State
  const [crtVoltage, setCrtVoltage] = useState<number>(5000);
  const [electricField, setElectricField] = useState<number>(0); // -10 to +10

  // Lab 2 & 3: Atomic Builder State
  const [protons, setProtons] = useState<number>(6); // Default Carbon
  const [neutrons, setNeutrons] = useState<number>(6);
  const [electrons, setElectrons] = useState<number>(6);

  // Lab 4: Bohr Shell Filling State
  const [kShellInput, setKShellInput] = useState<number>(2);
  const [lShellInput, setLShellInput] = useState<number>(4);
  const [mShellInput, setMShellInput] = useState<number>(0);
  const [nShellInput, setNShellInput] = useState<number>(0);

  // Challenges State
  const [currentChallengeIdx, setCurrentChallengeIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [numericAnswer, setNumericAnswer] = useState<string>('');
  const [challengeFeedback, setChallengeFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);
  const [score, setScore] = useState<number>(0);
  const [completedChallenges, setCompletedChallenges] = useState<Set<string>>(new Set());

  // Discovery / Prediction & Observation States
  const [discoveryAnswered, setDiscoveryAnswered] = useState<boolean>(false);
  const [discoverySelected, setDiscoverySelected] = useState<number | null>(null);
  const [predictionAnswers, setPredictionAnswers] = useState<Record<number, number>>({});
  const [observationAnswers, setObservationAnswers] = useState<Record<number, number>>({});

  // Feedback components trigger states
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHint, setCurrentHint] = useState<string>('');

  // Auto-hint timer reference
  const hintTimerRef = useRef<NodeJS.Timeout | null>(null);

  // BKT State Tracking Map for all 8 ICSE Nodes
  const [bktStates, setBktStates] = useState<Record<NodeId, ReturnType<typeof createBKTState>>>(() => {
    const initial: Record<string, ReturnType<typeof createBKTState>> = {};
    ALL_NODE_IDS.forEach((id) => {
      initial[id] = createBKTState(id);
    });
    return initial as Record<NodeId, ReturnType<typeof createBKTState>>;
  });

  // SM2 Spaced Repetition Item Store
  const [sm2Items, setSm2Items] = useState<Record<string, ReturnType<typeof createReviewItem>>>(() => {
    const initial: Record<string, ReturnType<typeof createReviewItem>> = {};
    CHALLENGES.forEach((c) => {
      initial[c.id] = createReviewItem(c.id);
    });
    return initial;
  });

  // Derived current Element derived from active protons
  const currentElement = useMemo(() => {
    const found = ELEMENTS_DATA.find((e) => e.z === protons);
    if (found) return found;
    return {
      z: protons,
      name: `Custom Element-${protons}`,
      symbol: `E${protons}`,
      a: protons + neutrons,
      protons: protons,
      neutrons: neutrons,
      electrons: electrons,
      shells: [Math.min(2, electrons), Math.min(8, Math.max(0, electrons - 2)), Math.min(8, Math.max(0, electrons - 10)), Math.max(0, electrons - 18)] as [number, number, number, number],
      category: 'Nonmetal' as const,
      icseFact: 'Custom synthesized isotope balance.',
    };
  }, [protons, neutrons, electrons]);

  // Reset hint timer on activity
  const resetHintTimer = useCallback(() => {
    if (hintTimerRef.current) clearTimeout(hintTimerRef.current);
    setShowHint(false);

    hintTimerRef.current = setTimeout(() => {
      const activeChallenge = CHALLENGES[currentChallengeIdx];
      if (activeTab === 'challenges' && activeChallenge) {
        setCurrentHint(activeChallenge.hints[0]);
        setShowHint(true);
        audioManager.play('hint');
      }
    }, 10000);
  }, [activeTab, currentChallengeIdx]);

  useEffect(() => {
    resetHintTimer();
    return () => {
      if (hintTimerRef.current) clearTimeout(hintTimerRef.current);
    };
  }, [resetHintTimer, activeTab, currentChallengeIdx]);

  // Handle Discovery Question Answer
  const handleDiscoverySubmit = (index: number) => {
    setDiscoverySelected(index);
    setDiscoveryAnswered(true);
    if (index === DISCOVERY_QUESTION.correctIndex) {
      audioManager.play('celebration');
      speechManager.speak("Excellent! Electrons move rapidly in empty space energy shells around the dense nucleus!");
      setShowSparkle(true);
    } else {
      audioManager.play('error');
      speechManager.speak("Not quite. Consider where electrons live and how much empty space surrounds the nucleus.");
    }
  };

  // Handle Challenge Submission
  const handleChallengeSubmit = () => {
    const challenge = CHALLENGES[currentChallengeIdx];
    let isCorrect = false;

    if (challenge.type === 'numeric') {
      const numVal = parseFloat(numericAnswer.trim());
      if (!isNaN(numVal) && numVal === challenge.correctAnswer) {
        isCorrect = true;
      }
    } else if (challenge.type === 'config-builder') {
      if (selectedOption === challenge.correctIndex) {
        isCorrect = true;
      }
    } else {
      if (selectedOption === challenge.correctIndex) {
        isCorrect = true;
      }
    }

    // Sound and Speech Feedback
    if (isCorrect) {
      audioManager.play('success');
      speechManager.speak("Correct answer! Great subatomic mastery.");
      setShowSparkle(true);
      setShowConfetti(true);
      setChallengeFeedback({ isCorrect: true, message: `Correct! ${challenge.explanation}` });

      if (!completedChallenges.has(challenge.id)) {
        setCompletedChallenges((prev) => new Set(prev).add(challenge.id));
        setScore((prev) => prev + 10);
      }
    } else {
      audioManager.play('error');
      speechManager.speak("That is incorrect. Review the hints or check the subatomic principles.");
      setChallengeFeedback({
        isCorrect: false,
        message: `Incorrect. ${challenge.explanation}`,
      });
    }

    // BKT and SM2 Updates
    const oldBkt = bktStates[challenge.nodeId];
    const newBkt = bktUpdate(oldBkt, isCorrect);
    setBktStates((prev) => ({ ...prev, [challenge.nodeId]: newBkt }));

    const oldSm2 = sm2Items[challenge.id];
    const newSm2 = sm2Update(oldSm2, isCorrect ? 5 : 2);
    setSm2Items((prev) => ({ ...prev, [challenge.id]: newSm2 }));

    // Record total mastery
    recordGameScore(challenge.nodeId, isCorrect ? 100 : 0);
  };

  // Move to next challenge
  const handleNextChallenge = () => {
    setChallengeFeedback(null);
    setSelectedOption(null);
    setNumericAnswer('');
    setShowConfetti(false);
    setShowSuccessBanner(false);

    if (currentChallengeIdx < CHALLENGES.length - 1) {
      setCurrentChallengeIdx((prev) => prev + 1);
    } else {
      // Completed all challenges
      audioManager.play('celebration');
      setShowSuccessBanner(true);
      speechManager.speak("Congratulations! You have completed all subatomic chemistry challenges!");
      if (onComplete) onComplete(score);
    }
  };

  // Synchronize proton change with neutral electrons default
  const handleProtonChange = (delta: number) => {
    audioManager.play('tap');
    setProtons((prev) => {
      const nextP = Math.max(1, Math.min(20, prev + delta));
      setElectrons(nextP); // Keep neutral atom
      return nextP;
    });
  };

  const handleNeutronChange = (delta: number) => {
    audioManager.play('tap');
    setNeutrons((prev) => Math.max(0, Math.min(30, prev + delta)));
  };

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 select-none">
      {/* Top Banner Navigation */}
      <header className="max-w-7xl mx-auto bg-slate-900/90 border border-slate-800 rounded-2xl p-4 mb-6 shadow-2xl backdrop-blur-md">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-cyan-500/20 border border-cyan-400/40 rounded-xl text-cyan-400">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L5.6 15.12a2 2 0 00-1.022.547l-1.4 1.402a2 2 0 001.414 3.414h18.816a2 2 0 001.414-3.414l-1.4-1.402z" />
                <circle cx="12" cy="9" r="4" strokeWidth="2" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">
                ICSE Atomic Structure & Subatomic Particles
              </h1>
              <p className="text-xs text-slate-400">Class 6 Chemistry • Dalton, Thomson, Rutherford & Bohr Models</p>
            </div>
          </div>

          {/* Tab Navigation Buttons */}
          <nav className="flex flex-wrap gap-2">
            {(['discovery', 'lab', 'builder', 'challenges', 'summary'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  audioManager.play('tap');
                  setActiveTab(tab);
                }}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25 scale-105'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 hover:text-white'
                }`}
              >
                {tab === 'discovery' && '1. Discovery'}
                {tab === 'lab' && '2. Core Labs'}
                {tab === 'builder' && '3. Atomic Builder'}
                {tab === 'challenges' && `4. Challenges (${score} pts)`}
                {tab === 'summary' && '5. ICSE Summary'}
              </button>
            ))}
          </nav>
        </div>

        {/* BKT Mastery Tracker across the 8 Syllabus Nodes */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {ALL_NODE_IDS.map((nodeId) => {
            const mastery = masteryProb(bktStates[nodeId]);
            const pct = Math.round(mastery * 100);
            return (
              <div key={nodeId} className="bg-slate-950/60 p-2 rounded-lg border border-slate-800 text-center">
                <div className="text-[10px] text-slate-400 font-mono truncate">{nodeId}</div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-cyan-400 to-emerald-400 h-full transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <div className="text-[10px] font-bold text-cyan-400 mt-0.5">{pct}%</div>
              </div>
            );
          })}
        </div>
      </header>

      {/* TAB CONTENT AREAS */}

      {/* TAB 1: DISCOVERY NARRATIVE & PREDICTION */}
      {activeTab === 'discovery' && (
        <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
          <section className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h2 className="text-xl font-bold text-cyan-400 mb-3">{SCENARIO.title}</h2>
            <p className="text-sm text-slate-300 mb-4 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-sm text-slate-400 mb-6 leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800">
              {SCENARIO.context}
            </p>

            {/* Subatomic Particles Comparison Graphic */}
            <div className="mb-6">
              <h3 className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-2">Subatomic Overview</h3>
              <SubatomicParticlesComparisonSVG />
            </div>

            {/* Discovery Counterintuitive Question */}
            <div className="bg-slate-950/90 border border-cyan-500/30 rounded-xl p-5">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Discovery Quest</span>
              <h3 className="text-base font-semibold text-white mt-1 mb-4">{DISCOVERY_QUESTION.question}</h3>

              <div className="space-y-3">
                {DISCOVERY_QUESTION.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleDiscoverySubmit(idx)}
                    className={`w-full text-left p-3.5 rounded-xl text-xs sm:text-sm border transition-all ${
                      discoverySelected === idx
                        ? idx === DISCOVERY_QUESTION.correctIndex
                          ? 'bg-emerald-500/20 border-emerald-500 text-emerald-200'
                          : 'bg-rose-500/20 border-rose-500 text-rose-200'
                        : 'bg-slate-900 border-slate-800 hover:border-cyan-500/50 text-slate-300'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>

              {discoveryAnswered && (
                <div className="mt-4 p-4 bg-cyan-950/40 border border-cyan-500/40 rounded-xl text-xs text-cyan-200">
                  <span className="font-bold">Key Insight: </span>
                  {DISCOVERY_QUESTION.hintAfter}
                </div>
              )}
            </div>
          </section>

          {/* Prediction Questions Column */}
          <section className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h3 className="text-base font-bold text-cyan-400 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                Prediction Hypotheses
              </h3>

              <div className="space-y-6">
                {PREDICTION_QUESTIONS.map((pq, qIdx) => (
                  <div key={qIdx} className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <p className="text-xs font-semibold text-slate-200 mb-3">{pq.question}</p>
                    <div className="space-y-2">
                      {pq.options.map((opt, oIdx) => (
                        <button
                          key={oIdx}
                          onClick={() => {
                            audioManager.play('tap');
                            setPredictionAnswers((prev) => ({ ...prev, [qIdx]: oIdx }));
                          }}
                          className={`w-full text-left p-2.5 rounded-lg text-xs border transition-all ${
                            predictionAnswers[qIdx] === oIdx
                              ? oIdx === pq.correctIndex
                                ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold'
                                : 'bg-rose-500/20 border-rose-500 text-rose-300'
                              : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-400'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                    {predictionAnswers[qIdx] !== undefined && (
                      <p className="mt-3 text-[11px] text-cyan-400 bg-cyan-950/30 p-2.5 rounded-lg border border-cyan-800/40">
                        🔍 <strong>Verification Method:</strong> {pq.verifyInstruction}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      )}

      {/* TAB 2: 5 CORE EXPLORATION LABS */}
      {activeTab === 'lab' && (
        <main className="max-w-7xl mx-auto space-y-6">
          {/* Lab Selector Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {EXPLORATION_STEPS.map((step, idx) => (
              <button
                key={idx}
                onClick={() => {
                  audioManager.play('tap');
                  setSelectedLabIndex(idx);
                }}
                className={`p-3 rounded-xl border text-left transition-all ${
                  selectedLabIndex === idx
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-lg shadow-cyan-500/10'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <div className="text-[10px] font-bold text-cyan-500 uppercase tracking-wider">{step.nodeId}</div>
                <div className="text-xs font-bold mt-1 line-clamp-1">{step.title}</div>
              </button>
            ))}
          </div>

          {/* Interactive Lab Display Container */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-2xl">
            <div className="mb-4">
              <h2 className="text-lg font-bold text-white">{EXPLORATION_STEPS[selectedLabIndex].title}</h2>
              <p className="text-xs text-slate-400 mt-1">{EXPLORATION_STEPS[selectedLabIndex].instruction}</p>
            </div>

            {/* LAB 1: Cathode Ray Tube */}
            {selectedLabIndex === 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-8">
                  <CathodeRayTubeSVG voltage={crtVoltage} electricField={electricField} />
                </div>
                <div className="lg:col-span-4 bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-6">
                  <h3 className="text-sm font-bold text-cyan-400">Discharge Tube Controls</h3>

                  <div>
                    <label className="text-xs text-slate-300 flex justify-between font-semibold mb-2">
                      <span>High Discharge Voltage:</span>
                      <span className="text-cyan-400">{crtVoltage} V</span>
                    </label>
                    <input
                      type="range"
                      min="1000"
                      max="10000"
                      step="500"
                      value={crtVoltage}
                      onChange={(e) => setCrtVoltage(Number(e.target.value))}
                      className="w-full accent-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-300 flex justify-between font-semibold mb-2">
                      <span>Electric Deflection Field:</span>
                      <span className="text-cyan-400">{electricField > 0 ? `+${electricField}` : electricField}</span>
                    </label>
                    <input
                      type="range"
                      min="-20"
                      max="20"
                      step="2"
                      value={electricField}
                      onChange={(e) => setElectricField(Number(e.target.value))}
                      className="w-full accent-cyan-400"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                      <span>Attract Down (-)</span>
                      <span>Neutral</span>
                      <span>Attract Up (+)</span>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
                    <strong className="text-cyan-400">ICSE Observation:</strong> When voltage exceeds 5000V, green glowing rays travel from Cathode to Anode. Turning on the upper (+) plate bends the beam upward, proving electrons carry negative charge!
                  </div>
                </div>
              </div>
            )}

            {/* LAB 2: Rutherford Scattering */}
            {selectedLabIndex === 1 && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-8">
                  <RutherfordGoldFoilSVG particleCount={20} />
                </div>
                <div className="lg:col-span-4 bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
                  <h3 className="text-sm font-bold text-amber-400">Rutherford Scattering Analysis</h3>
                  <div className="space-y-3 text-xs text-slate-300">
                    <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                      <span className="font-bold text-sky-400">1. Most Particles (&gt;99.9%):</span> Pass straight without any deflection.
                      <p className="text-[11px] text-slate-400 mt-1">Conclusion: Atom is composed almost entirely of empty space.</p>
                    </div>
                    <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                      <span className="font-bold text-amber-400">2. Small Deflections:</span> Particles pass close to positive charge.
                      <p className="text-[11px] text-slate-400 mt-1">Conclusion: Central charge is positive (protons).</p>
                    </div>
                    <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                      <span className="font-bold text-rose-400">3. Direct Rebound (1 in 20,000):</span> Particles bounce straight backward.
                      <p className="text-[11px] text-slate-400 mt-1">Conclusion: The positive mass is concentrated in a tiny, heavy nucleus.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* LAB 3: Subatomic Particle Weighing */}
            {selectedLabIndex === 2 && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-6">
                  <BohrAtomModelSVG element={currentElement} />
                </div>
                <div className="lg:col-span-6 bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
                  <h3 className="text-sm font-bold text-cyan-400">Subatomic Nucleon Counter & Mass Calculator</h3>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-slate-900 rounded-xl border border-red-500/30">
                      <div className="text-[10px] text-slate-400">Protons (Z)</div>
                      <div className="text-2xl font-black text-red-400">{protons}</div>
                      <div className="flex gap-2 mt-2">
                        <button onClick={() => handleProtonChange(-1)} className="px-3 py-1 bg-slate-800 text-white rounded font-bold">-</button>
                        <button onClick={() => handleProtonChange(1)} className="px-3 py-1 bg-slate-800 text-white rounded font-bold">+</button>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-700">
                      <div className="text-[10px] text-slate-400">Neutrons (N)</div>
                      <div className="text-2xl font-black text-slate-300">{neutrons}</div>
                      <div className="flex gap-2 mt-2">
                        <button onClick={() => handleNeutronChange(-1)} className="px-3 py-1 bg-slate-800 text-white rounded font-bold">-</button>
                        <button onClick={() => handleNeutronChange(1)} className="px-3 py-1 bg-slate-800 text-white rounded font-bold">+</button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-cyan-950/40 border border-cyan-500/30 p-4 rounded-xl space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300">Atomic Number Z (Protons):</span>
                      <span className="font-bold text-cyan-400">{protons}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300">Mass Number A (Protons + Neutrons):</span>
                      <span className="font-bold text-cyan-400">{protons + neutrons} amu</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300">Net Electrical Charge:</span>
                      <span className="font-bold text-emerald-400">0 (Neutral Atom)</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* LAB 4: Bohr Shell Configuration */}
            {selectedLabIndex === 3 && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-6">
                  <BohrAtomModelSVG element={currentElement} />
                </div>
                <div className="lg:col-span-6 bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
                  <h3 className="text-sm font-bold text-purple-400">Bohr-Bury Electronic Shell Configuration</h3>
                  <p className="text-xs text-slate-400">Formula: Maximum electron capacity = 2n²</p>

                  <div className="space-y-3">
                    <div className="p-3 bg-slate-900 rounded-lg flex justify-between items-center border border-cyan-500/30">
                      <div>
                        <span className="text-xs font-bold text-cyan-400">K Shell (n=1)</span>
                        <div className="text-[10px] text-slate-500">Max capacity: 2e⁻</div>
                      </div>
                      <span className="text-base font-black text-cyan-300">{currentElement.shells[0]}</span>
                    </div>

                    <div className="p-3 bg-slate-900 rounded-lg flex justify-between items-center border border-purple-500/30">
                      <div>
                        <span className="text-xs font-bold text-purple-400">L Shell (n=2)</span>
                        <div className="text-[10px] text-slate-500">Max capacity: 8e⁻</div>
                      </div>
                      <span className="text-base font-black text-purple-300">{currentElement.shells[1]}</span>
                    </div>

                    <div className="p-3 bg-slate-900 rounded-lg flex justify-between items-center border border-amber-500/30">
                      <div>
                        <span className="text-xs font-bold text-amber-400">M Shell (n=3)</span>
                        <div className="text-[10px] text-slate-500">Max capacity: 8e⁻ (for elements 1-20)</div>
                      </div>
                      <span className="text-base font-black text-amber-300">{currentElement.shells[2]}</span>
                    </div>

                    <div className="p-3 bg-slate-900 rounded-lg flex justify-between items-center border border-emerald-500/30">
                      <div>
                        <span className="text-xs font-bold text-emerald-400">N Shell (n=4)</span>
                        <div className="text-[10px] text-slate-500">Max capacity: 2e⁻ (for Ca Z=20)</div>
                      </div>
                      <span className="text-base font-black text-emerald-300">{currentElement.shells[3]}</span>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-xl text-xs text-slate-300">
                    <span className="font-bold text-cyan-400">Config: </span>
                    {currentElement.shells.filter(s => s > 0).join(', ')}
                  </div>
                </div>
              </div>
            )}

            {/* LAB 5: Periodic Element Synthesizer */}
            {selectedLabIndex === 4 && (
              <div className="space-y-6">
                <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
                  {ELEMENTS_DATA.map((elem) => (
                    <button
                      key={elem.z}
                      onClick={() => {
                        audioManager.play('tap');
                        setProtons(elem.z);
                        setNeutrons(elem.neutrons);
                        setElectrons(elem.z);
                      }}
                      className={`p-2 rounded-lg border text-center transition-all ${
                        protons === elem.z
                          ? 'bg-cyan-500 border-cyan-300 text-slate-950 font-extrabold scale-110 shadow-lg'
                          : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-cyan-500/50'
                      }`}
                    >
                      <div className="text-[9px] opacity-70">{elem.z}</div>
                      <div className="text-sm font-black">{elem.symbol}</div>
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-xl border border-slate-800">
                  <BohrAtomModelSVG element={currentElement} />
                  <div className="space-y-4 text-xs">
                    <h3 className="text-base font-bold text-cyan-400">{currentElement.name} ({currentElement.symbol})</h3>
                    <div className="p-3 bg-slate-900 rounded-lg space-y-1 text-slate-300">
                      <div><strong>Category:</strong> {currentElement.category}</div>
                      <div><strong>Atomic Number (Z):</strong> {currentElement.z}</div>
                      <div><strong>Mass Number (A):</strong> {currentElement.a}</div>
                      <div><strong>Electronic Config:</strong> {currentElement.shells.filter(s=>s>0).join(', ')}</div>
                    </div>
                    <div className="p-3 bg-cyan-950/40 border border-cyan-500/30 rounded-lg text-cyan-200">
                      💡 <strong>ICSE Syllabus Note:</strong> {currentElement.icseFact}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* OBSERVATION QUESTIONS SECTION */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <h3 className="text-base font-bold text-cyan-400 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Lab Observations Check
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {OBSERVATION_QUESTIONS.map((oq, oIdx) => (
                <div key={oIdx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                  <p className="text-xs font-semibold text-slate-200">{oq.question}</p>
                  <div className="space-y-2">
                    {oq.observableOptions.map((opt, optIdx) => (
                      <button
                        key={optIdx}
                        onClick={() => {
                          audioManager.play('tap');
                          setObservationAnswers((prev) => ({ ...prev, [oIdx]: optIdx }));
                        }}
                        className={`w-full text-left p-2.5 rounded-lg text-xs border transition-all ${
                          observationAnswers[oIdx] === optIdx
                            ? optIdx === oq.correctIndex
                              ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold'
                              : 'bg-rose-500/20 border-rose-500 text-rose-300'
                            : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-400'
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
        </main>
      )}

      {/* TAB 3: CUSTOM ATOMIC BUILDER WORKBENCH */}
      {activeTab === 'builder' && (
        <main className="max-w-7xl mx-auto bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-2xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-bold text-cyan-400">Subatomic Particle Builder Workbench</h2>
              <p className="text-xs text-slate-400">Synthesize customized atoms by manipulating Protons, Neutrons, and Electrons.</p>
            </div>
            <div className="px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs font-bold text-cyan-400">
              Element: {currentElement.name} ({currentElement.symbol})
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6">
              <BohrAtomModelSVG element={currentElement} />
            </div>

            <div className="lg:col-span-6 space-y-6 bg-slate-950 p-6 rounded-xl border border-slate-800">
              {/* Protons Controls */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-red-400">Protons (P⁺) - Atomic Number Z</span>
                  <span className="text-red-400">{protons}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={protons}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setProtons(val);
                    setElectrons(val);
                  }}
                  className="w-full accent-red-500"
                />
              </div>

              {/* Neutrons Controls */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-300">Neutrons (N⁰) - Mass Number Modifier</span>
                  <span className="text-slate-300">{neutrons}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="25"
                  value={neutrons}
                  onChange={(e) => setNeutrons(Number(e.target.value))}
                  className="w-full accent-slate-400"
                />
              </div>

              {/* Summary Calculations Card */}
              <div className="p-4 bg-slate-900 rounded-xl border border-cyan-500/30 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Atomic Number (Z):</span>
                  <span className="font-mono font-bold text-cyan-400">{protons}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Mass Number (A = Z + N):</span>
                  <span className="font-mono font-bold text-cyan-400">{protons + neutrons} amu</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Bohr Electronic Shells:</span>
                  <span className="font-mono font-bold text-purple-400">{currentElement.shells.filter(s=>s>0).join(', ')}</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* TAB 4: 22+ CHALLENGES */}
      {activeTab === 'challenges' && (
        <main className="max-w-4xl mx-auto bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-2xl relative">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800">
            <div>
              <span className="text-[10px] uppercase tracking-widest font-extrabold text-cyan-400">
                Challenge {currentChallengeIdx + 1} of {CHALLENGES.length}
              </span>
              <h2 className="text-lg font-bold text-white mt-1">
                Node: {CHALLENGES[currentChallengeIdx].nodeId}
              </h2>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                CHALLENGES[currentChallengeIdx].difficulty === 'foundation'
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : CHALLENGES[currentChallengeIdx].difficulty === 'standard'
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
              }`}>
                {CHALLENGES[currentChallengeIdx].difficulty}
              </span>
            </div>
          </div>

          {/* Question Display */}
          <div className="mb-6">
            <p className="text-sm sm:text-base font-semibold text-slate-100 leading-relaxed">
              {CHALLENGES[currentChallengeIdx].question}
            </p>
          </div>

          {/* Input Types */}
          {CHALLENGES[currentChallengeIdx].type === 'numeric' ? (
            <div className="mb-6">
              <input
                type="number"
                placeholder="Enter numerical answer..."
                value={numericAnswer}
                onChange={(e) => setNumericAnswer(e.target.value)}
                className="w-full p-4 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono text-base focus:border-cyan-500 outline-none"
              />
            </div>
          ) : (
            <div className="space-y-3 mb-6">
              {CHALLENGES[currentChallengeIdx].options?.map((opt, oIdx) => (
                <button
                  key={oIdx}
                  onClick={() => {
                    audioManager.play('tap');
                    setSelectedOption(oIdx);
                  }}
                  className={`w-full text-left p-4 rounded-xl text-xs sm:text-sm border transition-all ${
                    selectedOption === oIdx
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 font-bold shadow-md'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <span className="inline-block w-6 text-slate-500 font-mono">{String.fromCharCode(65 + oIdx)}.</span>
                  {opt}
                </button>
              ))}
            </div>
          )}

          {/* Submit & Navigation Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <button
              onClick={() => {
                audioManager.play('hint');
                setShowHint(!showHint);
                setCurrentHint(CHALLENGES[currentChallengeIdx].hints[0]);
              }}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold"
            >
              💡 Need Hint?
            </button>

            {!challengeFeedback ? (
              <button
                onClick={handleChallengeSubmit}
                disabled={selectedOption === null && numericAnswer.trim() === ''}
                className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl text-xs sm:text-sm font-bold shadow-lg shadow-cyan-500/20 disabled:opacity-40"
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={handleNextChallenge}
                className="px-6 py-2.5 bg-emerald-500 text-slate-950 rounded-xl text-xs sm:text-sm font-black shadow-lg shadow-emerald-500/20"
              >
                Next Challenge →
              </button>
            )}
          </div>

          {/* Feedback Card */}
          {challengeFeedback && (
            <div className={`mt-6 p-4 rounded-xl border text-xs leading-relaxed ${
              challengeFeedback.isCorrect
                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                : 'bg-rose-950/40 border-rose-500/40 text-rose-200'
            }`}>
              <div className="font-bold mb-1">{challengeFeedback.isCorrect ? '✅ Excellent!' : '❌ Not Quite'}</div>
              {challengeFeedback.message}
            </div>
          )}
        </main>
      )}

      {/* TAB 5: ICSE SUMMARY & REAL WORLD ACTIVITY */}
      {activeTab === 'summary' && (
        <main className="max-w-7xl mx-auto space-y-6">
          {/* Real World Activity Container */}
          <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h2 className="text-xl font-bold text-cyan-400 mb-2">{REAL_WORLD_ACTIVITY.title}</h2>
            <p className="text-sm text-slate-300 mb-6">{REAL_WORLD_ACTIVITY.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {REAL_WORLD_ACTIVITY.steps.map((step, sIdx) => (
                <div key={sIdx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-300">
                  <div className="text-cyan-400 font-bold mb-1">Step {sIdx + 1}</div>
                  {step}
                </div>
              ))}
            </div>
          </section>

          {/* Misconceptions Clarification */}
          <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h3 className="text-base font-bold text-cyan-400 mb-4">ICSE Chemistry Common Misconceptions</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MISCONCEPTIONS.map((misc) => (
                <div key={misc.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                  <div className="text-rose-400 font-bold">❌ Misconception: {misc.misconception}</div>
                  <div className="text-emerald-300">✅ ICSE Fact: {misc.correction}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Node Mastery Breakdown Summary Table */}
          <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h3 className="text-base font-bold text-cyan-400 mb-4">Syllabus Node Mastery Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ALL_NODE_IDS.map((nodeId) => {
                const info = NODE_DETAILS[nodeId];
                const mastery = masteryProb(bktStates[nodeId]);
                const pct = Math.round(mastery * 100);

                return (
                  <div key={nodeId} className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-cyan-400 font-bold">{nodeId}</span>
                      <span className="font-bold text-emerald-400">{pct}% Mastery</span>
                    </div>
                    <div className="font-semibold text-slate-200">{info.title}</div>
                    <p className="text-slate-400 text-[11px]">{info.summary}</p>
                  </div>
                );
              })}
            </div>
          </section>
        </main>
      )}

      {/* FEEDBACK OVERLAYS */}
      <HintBubble show={showHint} text={currentHint} />
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccessBanner} text="All Subatomic Challenges Completed!" />
      <SparkleBurst show={showSparkle} x={400} y={300} />
    </div>
  );
};

export default C6_ChemistryAtomicstructuresubatomicparticlesSim;