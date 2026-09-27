'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update, ReviewItem } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, BKTState, masteryProb } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ==========================================
// NODE DEFINITIONS & DATA STRUCTURES
// ==========================================

const ALL_NODE_IDS = [
  'c7_chem_009',
  'c7_chem_010',
  'c7_chem_011',
  'c7_chem_012',
  'c7_chem_013',
  'c7_chem_014',
  'c7_chem_015',
  'c7_chem_016',
] as const;

export interface SimProps {
  onComplete?: (score: number) => void;
  initialNodeId?: string;
}

const DEFAULT_PROPS: SimProps = {
  onComplete: undefined,
  initialNodeId: 'c7_chem_009',
};

// --- SCENARIO ---
const SCENARIO = {
  title: 'Rutherford & Bohr Atomic Precision Laboratory',
  intro: 'Welcome to the CISCE Advanced Quantum & Atomic Structure Research Facility. As senior lab investigator, you will assemble atoms from fundamental subatomic particles, manipulate electron shell energy levels, synthesize isotopes, and construct ions.',
  context: 'You will manipulate protons, neutrons, and electrons to uncover how nuclear charge determines element identity, how mass number is calculated, how Bohr energy levels (K, L, M) fill up, and how valence electrons govern chemical behavior and ion formation.',
};

// --- DISCOVERY QUESTION ---
const DISCOVERY_QUESTION = {
  question: 'If an atom of Carbon has 6 protons and 6 neutrons, what happens to its chemical identity and mass if you add 1 extra neutron to its nucleus?',
  options: [
    'It turns into Nitrogen (element #7) because its mass increases.',
    'It remains Carbon, but becomes a heavier isotope (Carbon-13).',
    'It turns into a negatively charged Carbon anion (-1 charge).',
    'It undergoes immediate radioactive explosion and dissolves completely.',
  ],
  correctIndex: 1,
  hintAfter: 'Chemical identity is determined EXCLUSIVELY by the number of protons (Atomic Number Z). Adding a neutron increases the atomic mass (A) without altering the atomic number or element identity!',
};

// --- EXPLORATION STEPS ---
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Fundamental Particle Balancer',
    instruction: 'Adjust the Proton count from 1 to 18 in the interactive core. Observe how changing Protons changes the Element Name, atomic number (Z), and nuclear positive charge.',
    interactionType: 'proton-adjust',
    nodeId: 'c7_chem_009',
  },
  {
    title: 'Lab 2: Mass Number & Nuclear Mass Explorer',
    instruction: 'Add Neutrons to your nucleus. Compare the Mass Number (A = Z + N) against the total subatomic mass. Notice how electrons contribute negligible mass.',
    interactionType: 'neutron-adjust',
    nodeId: 'c7_chem_011',
  },
  {
    title: 'Lab 3: Bohr Shell Configuration Engine (2n² Rule)',
    instruction: 'Distribute electrons across K shell (max 2), L shell (max 8), and M shell (max 8). Observe how electrons fill inner shells before populating outer energy levels.',
    interactionType: 'electron-distribution',
    nodeId: 'c7_chem_013',
  },
  {
    title: 'Lab 4: Valency & Valence Shell Predictor',
    instruction: 'Examine the outermost electron shell (valence shell). Predict and test the valency (combining capacity) for Sodium (2,8,1), Oxygen (2,6), and Chlorine (2,8,7).',
    interactionType: 'valency-testing',
    nodeId: 'c7_chem_014',
  },
  {
    title: 'Lab 5: Isotope & Ion Synthesis Chamber',
    instruction: 'Create cations (by removing valence electrons) and anions (by adding electrons). Synthesize isotopes of Hydrogen (Protium, Deuterium, Tritium) and Carbon (C-12, C-14).',
    interactionType: 'ion-isotope-synthesis',
    nodeId: 'c7_chem_016',
  },
];

// --- PREDICTION QUESTIONS ---
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: An atom has 11 protons, 12 neutrons, and 10 electrons. What is its net electric charge and identity?',
    options: [
      'Neutral Sodium atom (Na)',
      'Sodium cation with a +1 charge (Na⁺)',
      'Magnesium anion with a -1 charge (Mg⁻)',
      'Neutral Magnesium atom (Mg)',
    ],
    correctIndex: 1,
    verifyInstruction: 'Set Protons=11, Neutrons=12, Electrons=10 in the Lab visualizer to verify the net charge meter.',
    nodeId: 'c7_chem_016',
  },
  {
    question: 'Predict: What is the maximum electron capacity of the second shell (L shell) according to the 2n² formula?',
    options: ['2 electrons', '8 electrons', '18 electrons', '32 electrons'],
    correctIndex: 1,
    verifyInstruction: 'Use the Bohr Shell visualizer to fill the L shell (n=2) and observe when it becomes completely full.',
    nodeId: 'c7_chem_013',
  },
];

// --- OBSERVATION QUESTIONS ---
const OBSERVATION_QUESTIONS = [
  {
    question: 'When you increase the number of neutrons in a Carbon atom from 6 to 8 while keeping protons at 6:',
    observableOptions: [
      'The atomic number increases from 6 to 8.',
      'The atomic mass increases from 12 to 14, but chemical element remains Carbon.',
      'The electron shells expand and lose 2 valence electrons.',
      'The atom transforms into Oxygen-14.',
    ],
    correctIndex: 1,
    nodeId: 'c7_chem_015',
  },
  {
    question: 'When a neutral Chlorine atom (17 protons, 17 electrons) gains 1 electron in its outer M shell:',
    observableOptions: [
      'Its valency becomes +1 and it becomes an Argon atom.',
      'It becomes a positively charged cation (Cl⁺).',
      'It achieves a stable octet (8 outer electrons) and forms a chloride anion (Cl⁻).',
      'Its mass number increases by 17 units.',
    ],
    correctIndex: 2,
    nodeId: 'c7_chem_016',
  },
];

// --- REAL WORLD ACTIVITY ---
const REAL_WORLD_ACTIVITY = {
  title: 'Industrial & Forensic Atomic Spectroscopy Analysis',
  description: 'In archaeological carbon dating and smoke detector fabrication, understanding subatomic particle composition, isotope ratios, and ion formation is vital.',
  steps: [
    'Step 1: Calculate Carbon-14 ratio in an ancient timber artifact (Protons=6, Neutrons=8). Mass Number A = 14.',
    'Step 2: Determine Americium-241 ionisation current in a fire detector by tracking alpha emission (loss of 2 protons and 2 neutrons).',
    'Step 3: Analyze Sodium chloride (NaCl) ionic bonding: Na loses 1 electron to form Na⁺ (2,8 configuration), Cl gains 1 electron to form Cl⁻ (2,8,8 configuration).',
    'Step 4: Verify isotopic stability in nuclear medicine using Fluorine-18 positron emission tomography (PET scanning).',
  ],
};

// --- MISCONCEPTIONS ---
const MISCONCEPTIONS = [
  {
    id: 'misc_01',
    misconception: 'Electrons and Protons Have Equal Mass in Neutral Atoms',
    correction: 'While an atom is neutral because a proton +1 charge balances an electron -1 charge, their masses differ by a factor of 1840! Protons and neutrons account for nearly 99.9% of atomic mass.',
    nodeIds: ['c7_chem_009', 'c7_chem_011'],
  },
  {
    id: 'misc_02',
    misconception: 'Atomic Number Represents Total Subatomic Particles',
    correction: 'Atomic Number (Z) is strictly defined ONLY as the number of protons in the nucleus. Total subatomic particle count equals Protons + Neutrons + Electrons.',
    nodeIds: ['c7_chem_010'],
  },
  {
    id: 'misc_03',
    misconception: 'Isotopes Are Completely Different Chemical Elements',
    correction: 'Isotopes are atoms of the EXACT SAME element with equal proton numbers but different neutron numbers. They have virtually identical chemical properties.',
    nodeIds: ['c7_chem_015'],
  },
  {
    id: 'misc_04',
    misconception: 'Electron Shells Can Accommodate Any Random Number of Electrons',
    correction: 'Electrons fill specific shell energy levels following strict rules: 2n² formula (K=2, L=8, M=18). Lower inner shells must fill before outer shells populate.',
    nodeIds: ['c7_chem_013'],
  },
  {
    id: 'misc_05',
    misconception: 'Neutrons Carry an Electric Charge to Help Balance Atoms',
    correction: 'Neutrons carry zero electric charge (neutral). Electrical balance is achieved solely between positively charged protons and negatively charged electrons.',
    nodeIds: ['c7_chem_009', 'c7_chem_012'],
  },
  {
    id: 'misc_06',
    misconception: 'Valency is Always Equal to the Total Number of Valence Electrons',
    correction: 'For elements with 1 to 4 valence electrons, valency equals valence electrons. For elements with 5 to 7 valence electrons, valency equals (8 - valence electrons).',
    nodeIds: ['c7_chem_014'],
  },
];

// --- ELEMENT DATA TABLE (Z = 1 to 18) ---
export interface ElementData {
  z: number;
  symbol: string;
  name: string;
  standardNeutrons: number;
  k: number;
  l: number;
  m: number;
  valenceElectrons: number;
  valency: number;
  category: string;
}

const ELEMENT_TABLE: Record<number, ElementData> = {
  1: { z: 1, symbol: 'H', name: 'Hydrogen', standardNeutrons: 0, k: 1, l: 0, m: 0, valenceElectrons: 1, valency: 1, category: 'Non-metal' },
  2: { z: 2, symbol: 'He', name: 'Helium', standardNeutrons: 2, k: 2, l: 0, m: 0, valenceElectrons: 2, valency: 0, category: 'Noble Gas' },
  3: { z: 3, symbol: 'Li', name: 'Lithium', standardNeutrons: 4, k: 2, l: 1, m: 0, valenceElectrons: 1, valency: 1, category: 'Alkali Metal' },
  4: { z: 4, symbol: 'Be', name: 'Beryllium', standardNeutrons: 5, k: 2, l: 2, m: 0, valenceElectrons: 2, valency: 2, category: 'Alkaline Earth Metal' },
  5: { z: 5, symbol: 'B', name: 'Boron', standardNeutrons: 6, k: 2, l: 3, m: 0, valenceElectrons: 3, valency: 3, category: 'Metalloid' },
  6: { z: 6, symbol: 'C', name: 'Carbon', standardNeutrons: 6, k: 2, l: 4, m: 0, valenceElectrons: 4, valency: 4, category: 'Non-metal' },
  7: { z: 7, symbol: 'N', name: 'Nitrogen', standardNeutrons: 7, k: 2, l: 5, m: 0, valenceElectrons: 5, valency: 3, category: 'Non-metal' },
  8: { z: 8, symbol: 'O', name: 'Oxygen', standardNeutrons: 8, k: 2, l: 6, m: 0, valenceElectrons: 6, valency: 2, category: 'Non-metal' },
  9: { z: 9, symbol: 'F', name: 'Fluorine', standardNeutrons: 10, k: 2, l: 7, m: 0, valenceElectrons: 7, valency: 1, category: 'Halogen' },
  10: { z: 10, symbol: 'Ne', name: 'Neon', standardNeutrons: 10, k: 2, l: 8, m: 0, valenceElectrons: 8, valency: 0, category: 'Noble Gas' },
  11: { z: 11, symbol: 'Na', name: 'Sodium', standardNeutrons: 12, k: 2, l: 8, m: 1, valenceElectrons: 1, valency: 1, category: 'Alkali Metal' },
  12: { z: 12, symbol: 'Mg', name: 'Magnesium', standardNeutrons: 12, k: 2, l: 8, m: 2, valenceElectrons: 2, valency: 2, category: 'Alkaline Earth Metal' },
  13: { z: 13, symbol: 'Al', name: 'Aluminium', standardNeutrons: 14, k: 2, l: 8, m: 3, valenceElectrons: 3, valency: 3, category: 'Metal' },
  14: { z: 14, symbol: 'Si', name: 'Silicon', standardNeutrons: 14, k: 2, l: 8, m: 4, valenceElectrons: 4, valency: 4, category: 'Metalloid' },
  15: { z: 15, symbol: 'P', name: 'Phosphorus', standardNeutrons: 16, k: 2, l: 8, m: 5, valenceElectrons: 5, valency: 3, category: 'Non-metal' },
  16: { z: 16, symbol: 'S', name: 'Sulphur', standardNeutrons: 16, k: 2, l: 8, m: 6, valenceElectrons: 6, valency: 2, category: 'Non-metal' },
  17: { z: 17, symbol: 'Cl', name: 'Chlorine', standardNeutrons: 18, k: 2, l: 8, m: 7, valenceElectrons: 7, valency: 1, category: 'Halogen' },
  18: { z: 18, symbol: 'Ar', name: 'Argon', standardNeutrons: 22, k: 2, l: 8, m: 8, valenceElectrons: 8, valency: 0, category: 'Noble Gas' },
};

// --- Helper: Calculate Electron Distribution ---
function calculateShellDistribution(eCount: number): { k: number; l: number; m: number } {
  let rem = eCount;
  const k = Math.min(rem, 2);
  rem -= k;
  const l = Math.min(rem, 8);
  rem -= l;
  const m = Math.min(rem, 8);
  return { k, l, m };
}

// --- CHALLENGE INTERFACE ---
export interface Challenge {
  id: string;
  nodeId: string;
  type: 'mcq' | 'numeric' | 'build';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: 'recall' | 'understanding' | 'application' | 'analysis' | 'evaluation' | 'creativity';
  question: string;
  options?: string[];
  correctIndex?: number;
  correctAnswer?: number | string;
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
  targetAtom?: { protons: number; neutrons: number; electrons: number };
}

// --- 23 COMPREHENSIVE CHALLENGES ---
const CHALLENGES: Challenge[] = [
  // FOUNDATION TIER (7 challenges)
  {
    id: 'ch_01',
    nodeId: 'c7_chem_009',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which subatomic particle resides inside the nucleus and carries a unit positive (+1) charge?',
    options: ['Electron', 'Proton', 'Neutron', 'Photon'],
    correctIndex: 1,
    explanation: 'Protons reside in the central nucleus of an atom and carry a relative charge of +1.',
    hints: ['Think of the particle whose name starts with "P" like positive.', 'It is in the nucleus alongside neutrons.', 'The proton has +1 unit electrical charge.'],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_02',
    nodeId: 'c7_chem_009',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the relative mass of an electron compared to a proton?',
    options: ['Equal (1 u)', 'Twice as heavy (2 u)', 'Negligible (~1/1840 u)', '100 times heavier'],
    correctIndex: 2,
    explanation: 'An electron has an extremely small mass (~1/1840 of a proton mass), which is considered negligible in atomic mass calculations.',
    hints: ['Electrons are extremely light particles orbiting far from the nucleus.', 'They contribute almost no weight to the atom.', 'It takes about 1840 electrons to match the mass of 1 proton.'],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_03',
    nodeId: 'c7_chem_010',
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'An atom of Carbon has 6 protons, 6 neutrons, and 6 electrons. What is its Atomic Number (Z)?',
    correctAnswer: 6,
    explanation: 'Atomic Number (Z) is equal to the number of protons in the nucleus (Z = 6).',
    hints: ['Atomic number Z is defined strictly by proton count.', 'Look at the number of protons given in the prompt.', 'Z = 6 protons.'],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_04',
    nodeId: 'c7_chem_011',
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'An atom of Nitrogen has 7 protons and 7 neutrons. What is its Mass Number (A)?',
    correctAnswer: 14,
    explanation: 'Mass Number (A) = Protons (Z) + Neutrons (N) = 7 + 7 = 14.',
    hints: ['Mass number A is the total count of nucleons (protons + neutrons).', 'Add 7 protons + 7 neutrons.', '7 + 7 = 14.'],
  },
  {
    id: 'ch_05',
    nodeId: 'c7_chem_012',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why is an atom electrically neutral as a whole?',
    options: [
      'Because neutrons cancel out the charge of protons.',
      'Because the number of positive protons equals the number of negative electrons.',
      'Because electrons reside inside the nucleus.',
      'Because atomic nuclei contain zero charge.',
    ],
    correctIndex: 1,
    explanation: 'An atom is neutral because the positive charge of protons (+Z) is balanced by the negative charge of electrons (-Z).',
    hints: ['Protons are +1 and electrons are -1.', 'Neutrons have zero charge.', 'Equal numbers of + and - produce a net charge of zero.'],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_06',
    nodeId: 'c7_chem_010',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which subatomic particle uniquely determines the chemical identity of an element?',
    options: ['Neutron count', 'Electron count in K shell only', 'Proton count (Atomic Number Z)', 'Mass number A'],
    correctIndex: 2,
    explanation: 'The number of protons (Atomic Number Z) uniquely identifies an element. Changing proton count changes the element itself.',
    hints: ['If you change this particle, Carbon turns into Nitrogen or Oxygen.', 'It is the definition of Atomic Number Z.', 'Protons determine element identity.'],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_07',
    nodeId: 'c7_chem_011',
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'A Chlorine nucleus has Atomic Number Z = 17 and Mass Number A = 35. How many neutrons (N) are inside this nucleus?',
    correctAnswer: 18,
    explanation: 'Neutrons (N) = Mass Number (A) - Atomic Number (Z) = 35 - 17 = 18.',
    hints: ['Formula: A = Z + N, so N = A - Z.', 'Subtract Atomic Number (17) from Mass Number (35).', '35 - 17 = 18.'],
  },

  // STANDARD TIER (8 challenges)
  {
    id: 'ch_08',
    nodeId: 'c7_chem_013',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'According to the Bohr 2n² formula, what is the maximum number of electrons that can be accommodated in the second shell (L shell, n=2)?',
    correctAnswer: 8,
    explanation: 'Maximum capacity = 2n² = 2 × (2)² = 2 × 4 = 8 electrons.',
    hints: ['Use the formula 2 × n².', 'For L shell, n = 2.', '2 × (2^2) = 2 × 4 = 8.'],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_09',
    nodeId: 'c7_chem_013',
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'What is the electronic configuration of a Sodium atom (Atomic Number Z = 11)?',
    options: ['2, 8, 1', '2, 9', '3, 8', '2, 5, 4'],
    correctIndex: 0,
    explanation: 'Sodium has 11 electrons: K shell holds 2, L shell holds 8, M shell holds remaining 1. Configuration is 2, 8, 1.',
    hints: ['First shell K holds max 2.', 'Second shell L holds max 8.', 'Remaining 1 goes to M shell: 2, 8, 1.'],
  },
  {
    id: 'ch_10',
    nodeId: 'c7_chem_014',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Oxygen has Atomic Number Z = 8. Its electronic configuration is 2, 6. What is its valency?',
    correctAnswer: 2,
    explanation: 'Oxygen has 6 valence electrons. Since valence electrons > 4, Valency = 8 - 6 = 2.',
    hints: ['Valence electrons = 6.', 'When valence electrons exceed 4, Valency = 8 - valence electrons.', '8 - 6 = 2.'],
    misconceptionIndex: 5,
  },
  {
    id: 'ch_11',
    nodeId: 'c7_chem_014',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Aluminium has Atomic Number Z = 13 (configuration 2, 8, 3). What is its valency?',
    correctAnswer: 3,
    explanation: 'Aluminium has 3 valence electrons. For 1 to 4 valence electrons, valency equals the number of valence electrons (Valency = 3).',
    hints: ['Valence electrons = 3 in outermost shell.', 'Since 3 <= 4, valency equals valence electrons directly.', 'Valency = 3.'],
  },
  {
    id: 'ch_12',
    nodeId: 'c7_chem_015',
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Carbon-12 and Carbon-14 are isotopes of carbon. In what subatomic feature do they differ?',
    options: [
      'Carbon-14 has 2 extra protons in its nucleus.',
      'Carbon-14 has 2 extra neutrons in its nucleus.',
      'Carbon-14 has 2 extra outer electrons.',
      'Carbon-14 has a completely different chemical valency.',
    ],
    correctIndex: 1,
    explanation: 'Isotopes have the exact same proton count (Z=6 for carbon) but different neutron counts. C-12 has 6 neutrons, C-14 has 8 neutrons (2 extra).',
    hints: ['Isotopes share the same atomic number Z (protons).', 'Mass difference comes from neutrons in the nucleus.', 'Carbon-14 has 14 - 6 = 8 neutrons.'],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_13',
    nodeId: 'c7_chem_016',
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'When a Magnesium atom (Z = 12, configuration 2, 8, 2) loses its 2 valence electrons, what ion is formed?',
    options: ['Magnesium anion with -2 charge (Mg²⁻)', 'Magnesium cation with +2 charge (Mg²⁺)', 'Neutral Neon atom', 'Magnesium cation with +1 charge (Mg⁺)'],
    correctIndex: 1,
    explanation: 'Losing 2 negative electrons leaves 12 positive protons and 10 negative electrons, producing a net charge of +2 (Mg²⁺ cation).',
    hints: ['Losing negative electrons makes the atom overall positive.', '12 protons (+12) and 10 electrons (-10) gives +2.', 'Formed ion is Mg²⁺ cation.'],
  },
  {
    id: 'ch_14',
    nodeId: 'c7_chem_013',
    type: 'build',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Build a neutral Carbon atom in the lab engine! Set Protons = 6, Neutrons = 6, and Electrons = 6.',
    targetAtom: { protons: 6, neutrons: 6, electrons: 6 },
    explanation: 'Carbon-12 neutral atom has 6 protons, 6 neutrons, and 6 electrons with electronic configuration (2, 4).',
    hints: ['Set Proton slider to 6.', 'Set Neutron slider to 6.', 'Set Electron slider to 6.'],
  },
  {
    id: 'ch_15',
    nodeId: 'c7_chem_015',
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Which set of hydrogen atoms correctly represents Protium, Deuterium, and Tritium?',
    options: [
      'Protium (0 neutrons), Deuterium (1 neutron), Tritium (2 neutrons)',
      'Protium (1 proton), Deuterium (2 protons), Tritium (3 protons)',
      'Protium (1 electron), Deuterium (2 electrons), Tritium (3 electrons)',
      'Protium (0 protons), Deuterium (1 proton), Tritium (2 protons)',
    ],
    correctIndex: 0,
    explanation: 'All three hydrogen isotopes have 1 proton (Z=1). Protium has 0 neutrons (A=1), Deuterium has 1 neutron (A=2), Tritium has 2 neutrons (A=3).',
    hints: ['All isotopes of Hydrogen MUST have exactly 1 proton.', 'They differ only in neutron count.', 'Protium=0, Deuterium=1, Tritium=2 neutrons.'],
  },

  // ADVANCED TIER (8 challenges)
  {
    id: 'ch_16',
    nodeId: 'c7_chem_016',
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A Oxide anion (O²⁻) has 8 protons and 8 neutrons. How many total electrons does this ion possess?',
    correctAnswer: 10,
    explanation: 'A neutral Oxygen atom has 8 electrons. The O²⁻ anion has gained 2 extra electrons to achieve a stable octet, so total electrons = 8 + 2 = 10.',
    hints: ['Neutral Oxygen has 8 protons and 8 electrons.', 'Anion with charge -2 has gained 2 electrons.', '8 + 2 = 10 electrons.'],
  },
  {
    id: 'ch_17',
    nodeId: 'c7_chem_014',
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'An element X has Atomic Number Z = 16. What is its valency?',
    correctAnswer: 2,
    explanation: 'Electronic configuration of Z=16 (Sulphur) is 2, 8, 6. Valence electrons = 6. Valency = 8 - 6 = 2.',
    hints: ['Distribute 16 electrons: K=2, L=8, M=6.', 'Valence shell has 6 electrons.', 'Valency = 8 - 6 = 2.'],
  },
  {
    id: 'ch_18',
    nodeId: 'c7_chem_016',
    type: 'build',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Synthesize a Chloride anion (Cl⁻) in the simulator! Set Protons = 17, Neutrons = 18, and Electrons = 18.',
    targetAtom: { protons: 17, neutrons: 18, electrons: 18 },
    explanation: 'Chlorine atom (Z=17) gains 1 electron to become Cl⁻ anion with 18 electrons (configuration 2, 8, 8, achieving noble gas stability).',
    hints: ['Set Protons to 17 (Chlorine).', 'Set Neutrons to 18 (Mass A=35).', 'Set Electrons to 18 (1 extra electron for -1 charge).'],
  },
  {
    id: 'ch_19',
    nodeId: 'c7_chem_015',
    type: 'build',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Synthesize the heavy hydrogen isotope Deuterium! Set Protons = 1, Neutrons = 1, and Electrons = 1.',
    targetAtom: { protons: 1, neutrons: 1, electrons: 1 },
    explanation: 'Deuterium (²H) is an isotope of hydrogen containing 1 proton, 1 neutron, and 1 electron (Mass Number A = 2).',
    hints: ['Protons = 1 (Hydrogen family).', 'Neutrons = 1 (Mass number A=2).', 'Electrons = 1 (Neutral atom).'],
  },
  {
    id: 'ch_20',
    nodeId: 'c7_chem_013',
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why do Argon (Z=18: 2,8,8) and Neon (Z=10: 2,8) exhibit zero chemical valency and zero reactivity?',
    options: [
      'Because they possess zero protons in their central nucleus.',
      'Because their outermost shell is completely filled (octet rule achieved), making them exceptionally stable.',
      'Because their mass numbers are equal to zero.',
      'Because they lose all their electrons during chemical combinations.',
    ],
    correctIndex: 1,
    explanation: 'Atoms with a completely filled outermost shell (duplet for Helium, octet of 8 electrons for Neon and Argon) are chemically inert and have valency = 0.',
    hints: ['Look at the valence electron counts (8 electrons).', 'An octet in the valence shell represents maximum stability.', 'They do not need to gain, lose, or share electrons.'],
  },
  {
    id: 'ch_21',
    nodeId: 'c7_chem_016',
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Compare Na⁺ cation (Z=11, 10 electrons) and Ne neutral atom (Z=10, 10 electrons). They are called "isoelectronic". How do they differ?',
    options: [
      'They have different numbers of electrons in their L shell.',
      'They have different nuclear charges (Na⁺ has 11 protons, Ne has 10 protons) and net charges (+1 vs 0).',
      'Na⁺ is a noble gas while Ne is an alkali metal ion.',
      'They have identical chemical properties in chemical reactions.',
    ],
    correctIndex: 1,
    explanation: 'Isoelectronic species have identical electron configurations (2,8) but different proton counts (Z=11 vs Z=10), causing different net electrical charges.',
    hints: ['Count protons for Sodium (11) and Neon (10).', 'Compare net electric charge: Na⁺ is +1, Ne is 0.', 'Different nuclear charge means different chemical behavior.'],
  },
  {
    id: 'ch_22',
    nodeId: 'c7_chem_014',
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'An element forms a cation with charge +3 by losing all 3 valence electrons, leaving an electronic configuration of 2, 8. What is the Atomic Number Z of this element?',
    correctAnswer: 13,
    explanation: 'The cation has 10 electrons (2,8) after losing 3 electrons. The neutral atom had 10 + 3 = 13 electrons, so Atomic Number Z = 13 (Aluminium).',
    hints: ['Count electrons in the ion: 2 + 8 = 10 electrons.', 'Add back the 3 lost electrons: 10 + 3 = 13.', 'Atomic Number Z = 13 (Aluminium).'],
  },
  {
    id: 'ch_23',
    nodeId: 'c7_chem_011',
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'An isotope of Calcium has Mass Number A = 40 and contains 20 neutrons. What is the total subatomic particle count (Protons + Neutrons + Electrons) in a neutral atom of this isotope?',
    correctAnswer: 60,
    explanation: 'Protons Z = A - N = 40 - 20 = 20. In neutral atom, Electrons = Protons = 20. Total particles = 20 Protons + 20 Neutrons + 20 Electrons = 60.',
    hints: ['Calculate protons Z = 40 - 20 = 20.', 'In neutral atom, electrons = 20.', 'Total = 20 protons + 20 neutrons + 20 electrons = 60.'],
  },
];

// ==========================================
// SVG VISUAL DIAGRAM COMPONENTS
// ==========================================

// SVG 1: Detailed Atomic Structure Diagram
const AtomStructureSVG: React.FC<{ protons: number; neutrons: number; electrons: number }> = ({ protons, neutrons, electrons }) => {
  const { k, l, m } = calculateShellDistribution(electrons);
  const element = ELEMENT_TABLE[Math.min(Math.max(protons, 1), 18)] || ELEMENT_TABLE[1];

  return (
    <svg viewBox="0 0 500 450" className="w-full h-auto bg-slate-900 rounded-xl shadow-2xl border border-slate-700">
      <defs>
        <radialGradient id="nucleusGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#d97706" stopOpacity="0.1" />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Grid background */}
      <pattern id="gridPattern" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
      </pattern>
      <rect width="500" height="450" fill="url(#gridPattern)" />

      {/* Title Header */}
      <text x="250" y="28" textAnchor="middle" fill="#38bdf8" className="text-sm font-bold tracking-widest uppercase">
        Bohr Atomic Model Visualizer
      </text>

      {/* Shell Orbits */}
      {k > 0 && (
        <circle cx="250" cy="225" r="70" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="4,4" className="opacity-60" />
      )}
      {l > 0 && (
        <circle cx="250" cy="225" r="120" fill="none" stroke="#818cf8" strokeWidth="1.5" strokeDasharray="4,4" className="opacity-60" />
      )}
      {m > 0 && (
        <circle cx="250" cy="225" r="170" fill="none" stroke="#c084fc" strokeWidth="1.5" strokeDasharray="4,4" className="opacity-60" />
      )}

      {/* Shell Labels */}
      {k > 0 && <text x="250" y="148" fill="#38bdf8" fontSize="11" textAnchor="middle" fontWeight="bold">K Shell (n=1)</text>}
      {l > 0 && <text x="250" y="98" fill="#818cf8" fontSize="11" textAnchor="middle" fontWeight="bold">L Shell (n=2)</text>}
      {m > 0 && <text x="250" y="48" fill="#c084fc" fontSize="11" textAnchor="middle" fontWeight="bold">M Shell (n=3)</text>}

      {/* Nucleus Area */}
      <circle cx="250" cy="225" r="42" fill="url(#nucleusGlow)" stroke="#f59e0b" strokeWidth="2" filter="url(#glow)" />

      {/* Protons and Neutrons clustered in nucleus */}
      <g transform="translate(250, 225)">
        <circle cx="-10" cy="-10" r="11" fill="#ef4444" stroke="#991b1b" strokeWidth="1.5" />
        <text x="-10" y="-6" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">p+</text>

        <circle cx="10" cy="-8" r="11" fill="#94a3b8" stroke="#475569" strokeWidth="1.5" />
        <text x="10" y="-4" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">n⁰</text>

        <circle cx="-5" cy="12" r="11" fill="#ef4444" stroke="#991b1b" strokeWidth="1.5" />
        <text x="-5" y="16" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">p+</text>

        <circle cx="12" cy="10" r="11" fill="#94a3b8" stroke="#475569" strokeWidth="1.5" />
        <text x="12" y="14" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">n⁰</text>

        {/* Central Element Symbol */}
        <rect x="-24" y="-12" width="48" height="24" rx="6" fill="rgba(15, 23, 42, 0.85)" stroke="#f59e0b" strokeWidth="1" />
        <text x="0" y="4" fill="#fbbf24" fontSize="14" fontWeight="extrabold" textAnchor="middle">{element.symbol}</text>
      </g>

      {/* Orbiting Electrons */}
      {/* K-shell electrons (radius 70) */}
      {Array.from({ length: k }).map((_, idx) => {
        const angle = (idx * (360 / Math.max(k, 1)) - 90) * (Math.PI / 180);
        const ex = 250 + 70 * Math.cos(angle);
        const ey = 225 + 70 * Math.sin(angle);
        return (
          <g key={`k-e-${idx}`}>
            <circle cx={ex} cy={ey} r="8" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.5" filter="url(#glow)" />
            <text x={ex} y={ey + 3} fill="#0f172a" fontSize="10" fontWeight="extrabold" textAnchor="middle">-</text>
          </g>
        );
      })}

      {/* L-shell electrons (radius 120) */}
      {Array.from({ length: l }).map((_, idx) => {
        const angle = (idx * (360 / Math.max(l, 1)) - 90) * (Math.PI / 180);
        const ex = 250 + 120 * Math.cos(angle);
        const ey = 225 + 120 * Math.sin(angle);
        return (
          <g key={`l-e-${idx}`}>
            <circle cx={ex} cy={ey} r="8" fill="#818cf8" stroke="#4f46e5" strokeWidth="1.5" filter="url(#glow)" />
            <text x={ex} y={ey + 3} fill="#0f172a" fontSize="10" fontWeight="extrabold" textAnchor="middle">-</text>
          </g>
        );
      })}

      {/* M-shell electrons (radius 170) */}
      {Array.from({ length: m }).map((_, idx) => {
        const angle = (idx * (360 / Math.max(m, 1)) - 90) * (Math.PI / 180);
        const ex = 250 + 170 * Math.cos(angle);
        const ey = 225 + 170 * Math.sin(angle);
        return (
          <g key={`m-e-${idx}`}>
            <circle cx={ex} cy={ey} r="8" fill="#c084fc" stroke="#9333ea" strokeWidth="1.5" filter="url(#glow)" />
            <text x={ex} y={ey + 3} fill="#0f172a" fontSize="10" fontWeight="extrabold" textAnchor="middle">-</text>
          </g>
        );
      })}

      {/* Bottom Info HUD */}
      <g transform="translate(20, 390)">
        <rect width="460" height="48" rx="8" fill="rgba(15, 23, 42, 0.9)" stroke="#334155" strokeWidth="1" />
        <text x="15" y="22" fill="#ef4444" fontSize="12" fontWeight="bold">Protons (Z): {protons}</text>
        <text x="130" y="22" fill="#94a3b8" fontSize="12" fontWeight="bold">Neutrons (N): {neutrons}</text>
        <text x="250" y="22" fill="#38bdf8" fontSize="12" fontWeight="bold">Electrons: {electrons}</text>
        <text x="365" y="22" fill="#fbbf24" fontSize="12" fontWeight="bold">Mass (A): {protons + neutrons}</text>

        <text x="15" y="40" fill="#a7f3d0" fontSize="11" fontWeight="medium">Config: ({k}, {l}, {m})</text>
        <text x="130" y="40" fill="#f472b6" fontSize="11" fontWeight="medium">
          Valency: {element.valency}
        </text>
        <text x="250" y="40" fill="#e2e8f0" fontSize="11" fontWeight="medium">
          Charge: {protons - electrons > 0 ? `+${protons - electrons} (Cation)` : protons - electrons < 0 ? `${protons - electrons} (Anion)` : '0 (Neutral)'}
        </text>
      </g>
    </svg>
  );
};

// SVG 2: Bohr Shell Configuration Chart (2n² Rule)
const BohrShellConfigSVG: React.FC = () => {
  return (
    <svg viewBox="0 0 500 300" className="w-full h-auto bg-slate-900 rounded-xl border border-slate-700 shadow-lg">
      <text x="250" y="28" fill="#38bdf8" fontSize="14" fontWeight="bold" textAnchor="middle">
        Bohr Energy Levels & Electron Capacity Formula (2n²)
      </text>

      {/* Shell rows */}
      <g transform="translate(30, 50)">
        {/* K Shell */}
        <rect x="0" y="10" width="440" height="45" rx="6" fill="rgba(56, 189, 248, 0.1)" stroke="#38bdf8" strokeWidth="1.5" />
        <text x="15" y="38" fill="#38bdf8" fontSize="14" fontWeight="bold">K Shell (n = 1)</text>
        <text x="170" y="38" fill="#e2e8f0" fontSize="13">2 × (1)² = <tspan fill="#38bdf8" fontWeight="bold">2 Electrons Max</tspan></text>
        <circle cx="380" cy="32" r="8" fill="#38bdf8" />
        <circle cx="400" cy="32" r="8" fill="#38bdf8" />

        {/* L Shell */}
        <rect x="0" y="65" width="440" height="45" rx="6" fill="rgba(129, 140, 248, 0.1)" stroke="#818cf8" strokeWidth="1.5" />
        <text x="15" y="93" fill="#818cf8" fontSize="14" fontWeight="bold">L Shell (n = 2)</text>
        <text x="170" y="93" fill="#e2e8f0" fontSize="13">2 × (2)² = <tspan fill="#818cf8" fontWeight="bold">8 Electrons Max</tspan></text>
        <g transform="translate(350, 87)">
          {Array.from({ length: 8 }).map((_, i) => (
            <circle key={i} cx={i * 10} cy="0" r="4" fill="#818cf8" />
          ))}
        </g>

        {/* M Shell */}
        <rect x="0" y="120" width="440" height="45" rx="6" fill="rgba(192, 132, 252, 0.1)" stroke="#c084fc" strokeWidth="1.5" />
        <text x="15" y="148" fill="#c084fc" fontSize="14" fontWeight="bold">M Shell (n = 3)</text>
        <text x="170" y="148" fill="#e2e8f0" fontSize="13">2 × (3)² = <tspan fill="#c084fc" fontWeight="bold">18 Electrons Max</tspan> (8 for Z≤18)</text>

        {/* N Shell */}
        <rect x="0" y="175" width="440" height="45" rx="6" fill="rgba(244, 114, 182, 0.1)" stroke="#f472b6" strokeWidth="1.5" />
        <text x="15" y="203" fill="#f472b6" fontSize="14" fontWeight="bold">N Shell (n = 4)</text>
        <text x="170" y="203" fill="#e2e8f0" fontSize="13">2 × (4)² = <tspan fill="#f472b6" fontWeight="bold">32 Electrons Max</tspan></text>
      </g>
    </svg>
  );
};

// SVG 3: Isotope Comparison Visualizer
const IsotopeComparisonSVG: React.FC = () => {
  return (
    <svg viewBox="0 0 500 240" className="w-full h-auto bg-slate-900 rounded-xl border border-slate-700 shadow-lg">
      <text x="250" y="24" fill="#f59e0b" fontSize="14" fontWeight="bold" textAnchor="middle">
        Isotopes of Hydrogen (Same Z = 1, Different Mass A)
      </text>

      {/* Protium */}
      <g transform="translate(20, 45)">
        <rect width="140" height="175" rx="8" fill="rgba(30, 41, 59, 0.8)" stroke="#38bdf8" strokeWidth="1.5" />
        <text x="70" y="25" fill="#38bdf8" fontSize="14" fontWeight="bold" textAnchor="middle">Protium (¹H)</text>
        <circle cx="70" cy="80" r="35" fill="none" stroke="#38bdf8" strokeDasharray="3,3" />
        <circle cx="70" cy="80" r="14" fill="#ef4444" />
        <text x="70" y="84" fill="#fff" fontSize="10" fontWeight="bold" textAnchor="middle">1 p+</text>
        <circle cx="105" cy="80" r="5" fill="#38bdf8" />
        <text x="70" y="135" fill="#e2e8f0" fontSize="11" textAnchor="middle">Protons: 1</text>
        <text x="70" y="150" fill="#94a3b8" fontSize="11" textAnchor="middle">Neutrons: 0</text>
        <text x="70" y="165" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle">Mass A = 1</text>
      </g>

      {/* Deuterium */}
      <g transform="translate(180, 45)">
        <rect width="140" height="175" rx="8" fill="rgba(30, 41, 59, 0.8)" stroke="#818cf8" strokeWidth="1.5" />
        <text x="70" y="25" fill="#818cf8" fontSize="14" fontWeight="bold" textAnchor="middle">Deuterium (²H)</text>
        <circle cx="70" cy="80" r="35" fill="none" stroke="#818cf8" strokeDasharray="3,3" />
        <circle cx="63" cy="80" r="12" fill="#ef4444" />
        <text x="63" y="84" fill="#fff" fontSize="9" fontWeight="bold" textAnchor="middle">p+</text>
        <circle cx="77" cy="80" r="12" fill="#94a3b8" />
        <text x="77" y="84" fill="#fff" fontSize="9" fontWeight="bold" textAnchor="middle">n⁰</text>
        <circle cx="105" cy="80" r="5" fill="#818cf8" />
        <text x="70" y="135" fill="#e2e8f0" fontSize="11" textAnchor="middle">Protons: 1</text>
        <text x="70" y="150" fill="#94a3b8" fontSize="11" textAnchor="middle">Neutrons: 1</text>
        <text x="70" y="165" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle">Mass A = 2</text>
      </g>

      {/* Tritium */}
      <g transform="translate(340, 45)">
        <rect width="140" height="175" rx="8" fill="rgba(30, 41, 59, 0.8)" stroke="#c084fc" strokeWidth="1.5" />
        <text x="70" y="25" fill="#c084fc" fontSize="14" fontWeight="bold" textAnchor="middle">Tritium (³H)</text>
        <circle cx="70" cy="80" r="35" fill="none" stroke="#c084fc" strokeDasharray="3,3" />
        <circle cx="62" cy="74" r="10" fill="#ef4444" />
        <text x="62" y="77" fill="#fff" fontSize="8" fontWeight="bold" textAnchor="middle">p+</text>
        <circle cx="78" cy="74" r="10" fill="#94a3b8" />
        <text x="78" y="77" fill="#fff" fontSize="8" fontWeight="bold" textAnchor="middle">n⁰</text>
        <circle cx="70" cy="88" r="10" fill="#94a3b8" />
        <text x="70" y="91" fill="#fff" fontSize="8" fontWeight="bold" textAnchor="middle">n⁰</text>
        <circle cx="105" cy="80" r="5" fill="#c084fc" />
        <text x="70" y="135" fill="#e2e8f0" fontSize="11" textAnchor="middle">Protons: 1</text>
        <text x="70" y="150" fill="#94a3b8" fontSize="11" textAnchor="middle">Neutrons: 2</text>
        <text x="70" y="165" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle">Mass A = 3</text>
      </g>
    </svg>
  );
};

// ==========================================
// ANIMATED CANVAS COMPONENT
// ==========================================

const AnimatedAtomCanvas: React.FC<{
  protons: number;
  neutrons: number;
  electrons: number;
}> = ({ protons, neutrons, electrons }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let angle = 0;

    const render = () => {
      angle += 0.02;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Draw Orbit Shells
      const { k, l, m } = calculateShellDistribution(electrons);
      const shells = [
        { radius: 60, count: k, color: '#38bdf8', speed: 1 },
        { radius: 105, count: l, color: '#818cf8', speed: -0.7 },
        { radius: 150, count: m, color: '#c084fc', speed: 0.5 },
      ];

      shells.forEach((shell) => {
        if (shell.count === 0) return;

        // Draw Shell Circle
        ctx.beginPath();
        ctx.arc(cx, cy, shell.radius, 0, Math.PI * 2);
        ctx.strokeStyle = shell.color + '44';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.setLineDash([]);

        // Draw Orbiting Electrons
        for (let i = 0; i < shell.count; i++) {
          const eAngle = angle * shell.speed + (i * Math.PI * 2) / shell.count;
          const ex = cx + shell.radius * Math.cos(eAngle);
          const ey = cy + shell.radius * Math.sin(eAngle);

          // Glow
          ctx.beginPath();
          ctx.arc(ex, ey, 9, 0, Math.PI * 2);
          ctx.fillStyle = shell.color + '33';
          ctx.fill();

          // Core Electron
          ctx.beginPath();
          ctx.arc(ex, ey, 6, 0, Math.PI * 2);
          ctx.fillStyle = shell.color;
          ctx.fill();
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 1;
          ctx.stroke();

          // Minus sign
          ctx.fillStyle = '#0f172a';
          ctx.font = 'bold 9px sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('-', ex, ey);
        }
      });

      // Draw Nucleus Glow
      ctx.beginPath();
      ctx.arc(cx, cy, 32, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(245, 158, 11, 0.25)';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(cx, cy, 22, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(239, 68, 68, 0.85)';
      ctx.fill();

      // Protons / Neutrons count overlay inside nucleus
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${protons}p⁺ ${neutrons}n⁰`, cx, cy);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [protons, neutrons, electrons]);

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={360}
      className="w-full h-auto bg-slate-950 rounded-xl border border-slate-800 shadow-inner"
    />
  );
};

// ==========================================
// MAIN COMPONENT CLASS
// ==========================================

export const C7_ChemistryAtomicstructureelectronsprotonsneutronsSim: React.FC<SimProps> = ({
  onComplete,
  initialNodeId = 'c7_chem_009',
}) => {
  // Tab Navigation State
  const [activeTab, setActiveTab] = useState<'discovery' | 'lab' | 'challenges' | 'summary'>('discovery');

  // Interactive Lab State
  const [protons, setProtons] = useState<number>(6);
  const [neutrons, setNeutrons] = useState<number>(6);
  const [electrons, setElectrons] = useState<number>(6);

  // Discovery / Prediction / Observation State
  const [discoverySelected, setDiscoverySelected] = useState<number | null>(null);
  const [discoverySubmitted, setDiscoverySubmitted] = useState<boolean>(false);
  const [predictionAnswers, setPredictionAnswers] = useState<Record<number, number>>({});
  const [observationAnswers, setObservationAnswers] = useState<Record<number, number>>({});

  // Challenge Engine State
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState<number>(0);
  const [selectedMcqIndex, setSelectedMcqIndex] = useState<number | null>(null);
  const [numericInput, setNumericInput] = useState<string>('');
  const [challengeFeedback, setChallengeFeedback] = useState<{ isCorrect: boolean; msg: string } | null>(null);
  const [hintsUsedCount, setHintsUsedCount] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [completedChallengeIds, setCompletedChallengeIds] = useState<Set<string>>(new Set());

  // Mastery & SRS State tracking
  const [bktStates, setBktStates] = useState<Record<string, BKTState>>(() => {
    const initial: Record<string, BKTState> = {};
    ALL_NODE_IDS.forEach((id) => {
      initial[id] = createBKTState();
    });
    return initial;
  });

  const [srsItems, setSrsItems] = useState<Record<string, ReviewItem>>(() => {
    const initial: Record<string, ReviewItem> = {};
    ALL_NODE_IDS.forEach((id) => {
      initial[id] = createReviewItem(id);
    });
    return initial;
  });

  // UI FX State
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);

  // Auto-hint Timer Ref
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Current Element Computed Properties
  const currentElement = useMemo(() => {
    return ELEMENT_TABLE[protons] || {
      z: protons,
      symbol: 'X',
      name: 'Unknown Element',
      standardNeutrons: protons,
      k: 0,
      l: 0,
      m: 0,
      valenceElectrons: 0,
      valency: 0,
      category: 'Unclassified',
    };
  }, [protons]);

  const massNumber = useMemo(() => protons + neutrons, [protons, neutrons]);
  const netCharge = useMemo(() => protons - electrons, [protons, electrons]);
  const shellDist = useMemo(() => calculateShellDistribution(electrons), [electrons]);

  // Handle Tab Switch
  const handleTabChange = (tab: 'discovery' | 'lab' | 'challenges' | 'summary') => {
    audioManager.play('whoosh');
    setActiveTab(tab);
    if (tab === 'lab') {
      speechManager.speak('Welcome to the interactive Atomic Laboratory. Adjust protons, neutrons, and electrons to observe atomic behavior.');
    } else if (tab === 'challenges') {
      speechManager.speak('Challenge Mode activated. Solve ICSE standard problems to master atomic structure.');
    }
  };

  // Reset Inactivity Timer
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    setShowHint(false);
    inactivityTimerRef.current = setTimeout(() => {
      setShowHint(true);
      audioManager.play('hint');
    }, 12000);
  }, []);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [currentChallengeIndex, activeTab, resetInactivityTimer]);

  // Current Challenge Data
  const activeChallenge = CHALLENGES[currentChallengeIndex];

  // Helper: Update BKT & SRS upon challenge attempt
  const processAnswerSubmission = (isCorrect: boolean, nodeId: string) => {
    // Audio FX
    if (isCorrect) {
      audioManager.play('drop-correct');
      audioManager.play('sparkle');
      setShowSparkle(true);
      setTimeout(() => setShowSparkle(false), 1500);
    } else {
      audioManager.play('drop-wrong');
    }

    // BKT Update
    const currentBKT = bktStates[nodeId] || createBKTState();
    const updatedBKT = bktUpdate(currentBKT, isCorrect);
    setBktStates((prev) => ({ ...prev, [nodeId]: updatedBKT }));

    // SRS Update
    const currentSRS = srsItems[nodeId] || createReviewItem(nodeId);
    const quality = isCorrect ? (hintsUsedCount === 0 ? 5 : 3) : 1;
    const updatedSRS = sm2Update(currentSRS, quality);
    setSrsItems((prev) => ({ ...prev, [nodeId]: updatedSRS }));

    // Mastery Store
    const masteryVal = masteryProb(updatedBKT);
    recordGameScore(nodeId, Math.round(masteryVal * 100));
  };

  // Submit MCQ Challenge
  const handleMcqSubmit = () => {
    if (selectedMcqIndex === null) return;
    const isCorrect = selectedMcqIndex === activeChallenge.correctIndex;

    processAnswerSubmission(isCorrect, activeChallenge.nodeId);

    if (isCorrect) {
      setChallengeFeedback({ isCorrect: true, msg: 'Correct! Excellent understanding of subatomic physics!' });
      speechManager.speak('Correct answer! Excellent job.');
      setCompletedChallengeIds((prev) => new Set(prev).add(activeChallenge.id));
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
    } else {
      setChallengeFeedback({ isCorrect: false, msg: `Incorrect. ${activeChallenge.explanation}` });
      speechManager.speak('That is incorrect. Review the hint and try again.');
    }
  };

  // Submit Numeric Challenge
  const handleNumericSubmit = () => {
    const parsedVal = parseFloat(numericInput.trim());
    if (isNaN(parsedVal)) return;
    const isCorrect = Math.abs(parsedVal - Number(activeChallenge.correctAnswer)) < 0.01;

    processAnswerSubmission(isCorrect, activeChallenge.nodeId);

    if (isCorrect) {
      setChallengeFeedback({ isCorrect: true, msg: 'Spot on! Correct numerical calculation!' });
      speechManager.speak('Spot on! Excellent math calculation.');
      setCompletedChallengeIds((prev) => new Set(prev).add(activeChallenge.id));
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
    } else {
      setChallengeFeedback({ isCorrect: false, msg: `Incorrect calculation. ${activeChallenge.explanation}` });
      speechManager.speak('Incorrect calculation. Check your values.');
    }
  };

  // Submit Lab Build Challenge
  const handleBuildVerify = () => {
    if (!activeChallenge.targetAtom) return;
    const target = activeChallenge.targetAtom;
    const isCorrect =
      protons === target.protons && neutrons === target.neutrons && electrons === target.electrons;

    processAnswerSubmission(isCorrect, activeChallenge.nodeId);

    if (isCorrect) {
      setChallengeFeedback({ isCorrect: true, msg: 'Target atom assembled perfectly in the lab core!' });
      speechManager.speak('Target atom constructed successfully!');
      setCompletedChallengeIds((prev) => new Set(prev).add(activeChallenge.id));
      setShowSuccessBanner(true);
      audioManager.play('celebration');
      setTimeout(() => setShowSuccessBanner(false), 2500);
    } else {
      setChallengeFeedback({
        isCorrect: false,
        msg: `Atom configuration mismatch. Target requires Protons=${target.protons}, Neutrons=${target.neutrons}, Electrons=${target.electrons}. Yours is Protons=${protons}, Neutrons=${neutrons}, Electrons=${electrons}.`,
      });
      audioManager.play('error');
    }
  };

  // Advance Challenge
  const handleNextChallenge = () => {
    audioManager.play('whoosh');
    setChallengeFeedback(null);
    setSelectedMcqIndex(null);
    setNumericInput('');
    setHintsUsedCount(0);
    setShowHint(false);

    if (currentChallengeIndex < CHALLENGES.length - 1) {
      setCurrentChallengeIndex((prev) => prev + 1);
    } else {
      // Completed all challenges
      audioManager.play('celebration');
      speechManager.speak('Congratulations! You have completed all ICSE Atomic Structure Challenges!');
      if (onComplete) {
        const totalScore = Math.round((completedChallengeIds.size / CHALLENGES.length) * 100);
        onComplete(totalScore);
      }
      setActiveTab('summary');
    }
  };

  // Calculate Overall Simulation Progress Score
  const overallProgressScore = useMemo(() => {
    return Math.round((completedChallengeIds.size / CHALLENGES.length) * 100);
  }, [completedChallengeIds]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-3 md:p-6 font-sans">
      {/* GLOBAL FEEDBACK OVERLAYS */}
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccessBanner} text="Atomic Master Achievement Unlocked!" />
      <SparkleBurst show={showSparkle} x={400} y={300} />

      {/* TOP HEADER NAVIGATION */}
      <header className="max-w-7xl mx-auto mb-6 bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-black text-xl">
            ⚛️
          </div>
          <div>
            <h1 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-300 to-amber-300">
              ICSE Atomic Structure Master Lab
            </h1>
            <p className="text-xs text-slate-400 font-medium">Class 7 Chemistry • Nodes c7_chem_009 to c7_chem_016</p>
          </div>
        </div>

        {/* TAB BUTTONS */}
        <nav className="flex items-center gap-1 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
          {(['discovery', 'lab', 'challenges', 'summary'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all uppercase tracking-wider ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              {tab === 'discovery' && '🔍 Discovery'}
              {tab === 'lab' && '🧪 Atomic Lab'}
              {tab === 'challenges' && `🎯 Challenges (${completedChallengeIds.size}/${CHALLENGES.length})`}
              {tab === 'summary' && '📊 Mastery'}
            </button>
          ))}
        </nav>

        {/* PROGRESS METER */}
        <div className="flex items-center gap-3 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
          <div className="text-right">
            <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Lab Mastery</div>
            <div className="text-sm font-extrabold text-amber-400">{overallProgressScore}%</div>
          </div>
          <div className="w-16 bg-slate-800 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-amber-500 to-emerald-400 h-full transition-all duration-500"
              style={{ width: `${overallProgressScore}%` }}
            />
          </div>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="max-w-7xl mx-auto">
        {/* ================= TAB 1: DISCOVERY ================= */}
        {activeTab === 'discovery' && (
          <div className="space-y-6">
            {/* Scenario Intro Card */}
            <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider mb-2">
                <span>🔬 Laboratory Scenario</span>
              </div>
              <h2 className="text-2xl font-extrabold text-white mb-3">{SCENARIO.title}</h2>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">{SCENARIO.intro}</p>
              <div className="p-4 bg-slate-950/70 rounded-xl border border-slate-800 text-xs text-sky-300 leading-relaxed">
                <strong className="text-sky-400">Context: </strong>
                {SCENARIO.context}
              </div>
            </div>

            {/* Counterintuitive Discovery Question */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-sky-400">Core Discovery Pre-Test</h3>
                <span className="text-xs bg-sky-950 text-sky-300 px-2.5 py-1 rounded-full border border-sky-800 font-semibold">
                  Preconception Challenge
                </span>
              </div>
              <p className="text-slate-200 text-base font-medium">{DISCOVERY_QUESTION.question}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {DISCOVERY_QUESTION.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      audioManager.play('tap');
                      setDiscoverySelected(idx);
                    }}
                    className={`p-4 rounded-xl border text-left text-sm font-medium transition-all ${
                      discoverySelected === idx
                        ? 'border-sky-500 bg-sky-950/50 text-white shadow-md'
                        : 'border-slate-800 bg-slate-950/50 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span className="font-extrabold text-sky-400 mr-2">{String.fromCharCode(65 + idx)}.</span>
                    {opt}
                  </button>
                ))}
              </div>

              {!discoverySubmitted ? (
                <button
                  disabled={discoverySelected === null}
                  onClick={() => {
                    if (discoverySelected === null) return;
                    setDiscoverySubmitted(true);
                    if (discoverySelected === DISCOVERY_QUESTION.correctIndex) {
                      audioManager.play('drop-correct');
                      speechManager.speak('Correct discovery insight!');
                    } else {
                      audioManager.play('drop-wrong');
                    }
                  }}
                  className="w-full py-3 bg-gradient-to-r from-sky-500 to-indigo-600 rounded-xl text-white font-bold text-sm disabled:opacity-50 hover:opacity-90 shadow-lg transition-all"
                >
                  Verify Discovery Answer
                </button>
              ) : (
                <div
                  className={`p-4 rounded-xl border text-sm leading-relaxed ${
                    discoverySelected === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/40 border-emerald-800 text-emerald-200'
                      : 'bg-amber-950/40 border-amber-800 text-amber-200'
                  }`}
                >
                  <p className="font-bold mb-1">
                    {discoverySelected === DISCOVERY_QUESTION.correctIndex ? '🎉 Excellent Insight!' : '💡 Key Concept:'}
                  </p>
                  <p>{DISCOVERY_QUESTION.hintAfter}</p>
                </div>
              )}
            </div>

            {/* PREDICTION QUESTIONS LIST */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              <h3 className="text-lg font-bold text-indigo-400 flex items-center gap-2">
                <span>🔮 Theoretical Predictions</span>
              </h3>
              {PREDICTION_QUESTIONS.map((pred, pIdx) => (
                <div key={pIdx} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                  <p className="text-sm font-semibold text-slate-200">{pred.question}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {pred.options.map((opt, oIdx) => (
                      <button
                        key={oIdx}
                        onClick={() => {
                          audioManager.play('tap');
                          setPredictionAnswers((prev) => ({ ...prev, [pIdx]: oIdx }));
                        }}
                        className={`p-3 rounded-lg border text-xs font-medium text-left ${
                          predictionAnswers[pIdx] === oIdx
                            ? 'border-indigo-500 bg-indigo-950/60 text-white'
                            : 'border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  {predictionAnswers[pIdx] !== undefined && (
                    <div className="text-xs text-sky-400 bg-sky-950/30 p-2.5 rounded-lg border border-sky-900">
                      <strong>Verification Guide: </strong> {pred.verifyInstruction}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Static Visual Overview Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <BohrShellConfigSVG />
              <IsotopeComparisonSVG />
            </div>
          </div>
        )}

        {/* ================= TAB 2: INTERACTIVE LAB ================= */}
        {activeTab === 'lab' && (
          <div className="space-y-6">
            {/* Interactive Control & Canvas Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Controls (5 cols) */}
              <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="text-base font-extrabold text-amber-400">Particle Synthesizer Controls</h3>
                  <button
                    onClick={() => {
                      audioManager.play('pop');
                      setProtons(6);
                      setNeutrons(6);
                      setElectrons(6);
                    }}
                    className="px-3 py-1 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-semibold text-slate-300"
                  >
                    Reset (Carbon-12)
                  </button>
                </div>

                {/* Slider 1: Protons */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span className="text-red-400 flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span>
                      Protons (Atomic Number Z): {protons}
                    </span>
                    <span className="text-slate-400">Charge +{protons}</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="18"
                    value={protons}
                    onChange={(e) => {
                      audioManager.play('tap');
                      setProtons(parseInt(e.target.value));
                    }}
                    className="w-full accent-red-500 bg-slate-950 h-2 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Slider 2: Neutrons */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span className="text-slate-300 flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-slate-400 inline-block"></span>
                      Neutrons (N): {neutrons}
                    </span>
                    <span className="text-slate-400">Neutral 0</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="22"
                    value={neutrons}
                    onChange={(e) => {
                      audioManager.play('tap');
                      setNeutrons(parseInt(e.target.value));
                    }}
                    className="w-full accent-slate-400 bg-slate-950 h-2 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Slider 3: Electrons */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span className="text-sky-400 flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-sky-400 inline-block"></span>
                      Electrons: {electrons}
                    </span>
                    <span className="text-slate-400">Charge -{electrons}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="18"
                    value={electrons}
                    onChange={(e) => {
                      audioManager.play('tap');
                      setElectrons(parseInt(e.target.value));
                    }}
                    className="w-full accent-sky-400 bg-slate-950 h-2 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Chemical Data Summary Panel */}
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
                  <div className="flex justify-between items-center text-slate-300">
                    <span>Element Name:</span>
                    <span className="font-extrabold text-amber-400 text-sm">
                      {currentElement.name} ({currentElement.symbol})
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-slate-300">
                    <span>Category:</span>
                    <span className="font-semibold text-slate-200">{currentElement.category}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-300">
                    <span>Mass Number (A = Z + N):</span>
                    <span className="font-bold text-amber-300">{massNumber} u</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-300">
                    <span>Electron Configuration:</span>
                    <span className="font-bold text-sky-300">
                      ({shellDist.k}, {shellDist.l}, {shellDist.m})
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-slate-300">
                    <span>Valence Electrons:</span>
                    <span className="font-bold text-purple-300">
                      {shellDist.m > 0 ? shellDist.m : shellDist.l > 0 ? shellDist.l : shellDist.k}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-slate-300">
                    <span>Combining Valency:</span>
                    <span className="font-extrabold text-emerald-400 text-sm">{currentElement.valency}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-300">
                    <span>Net Electrical Charge:</span>
                    <span
                      className={`font-bold ${
                        netCharge > 0 ? 'text-red-400' : netCharge < 0 ? 'text-sky-400' : 'text-emerald-400'
                      }`}
                    >
                      {netCharge > 0 ? `+${netCharge} (Cation)` : netCharge < 0 ? `${netCharge} (Anion)` : '0 (Neutral)'}
                    </span>
                  </div>
                </div>

                {/* Quick Preset Buttons */}
                <div className="space-y-2">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Quick Presets:</div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <button
                      onClick={() => {
                        setProtons(1);
                        setNeutrons(0);
                        setElectrons(1);
                        audioManager.play('tap');
                      }}
                      className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sky-300 font-semibold"
                    >
                      Protium (¹H)
                    </button>
                    <button
                      onClick={() => {
                        setProtons(11);
                        setNeutrons(12);
                        setElectrons(11);
                        audioManager.play('tap');
                      }}
                      className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sky-300 font-semibold"
                    >
                      Sodium (Na)
                    </button>
                    <button
                      onClick={() => {
                        setProtons(17);
                        setNeutrons(18);
                        setElectrons(18);
                        audioManager.play('tap');
                      }}
                      className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sky-300 font-semibold"
                    >
                      Cl⁻ Ion
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: Visualizer & Canvas (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                <AtomStructureSVG protons={protons} neutrons={neutrons} electrons={electrons} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <AnimatedAtomCanvas protons={protons} neutrons={neutrons} electrons={electrons} />
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
                    <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">Live Particle Mass Breakdown</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Proton mass ≈ 1 u. Neutron mass ≈ 1 u. Electron mass ≈ 0.00054 u (negligible).
                    </p>
                    <div className="space-y-1.5 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Proton Mass Contribution:</span>
                        <span className="text-red-400 font-bold">{protons} u</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Neutron Mass Contribution:</span>
                        <span className="text-slate-300 font-bold">{neutrons} u</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Electron Mass Contribution:</span>
                        <span className="text-sky-400 font-bold">{(electrons * 0.00054).toFixed(4)} u</span>
                      </div>
                      <hr className="border-slate-800" />
                      <div className="flex justify-between font-extrabold text-amber-300">
                        <span>Total Nuclear Mass:</span>
                        <span>{protons + neutrons} u</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* EXPLORATION STEPS GUIDED LAB RENDER */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <h3 className="text-lg font-bold text-sky-400 flex items-center gap-2">
                <span>🧪 Guided Exploration Tasks</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {EXPLORATION_STEPS.map((step, sIdx) => (
                  <div key={sIdx} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <span className="text-[10px] font-extrabold text-indigo-400 uppercase tracking-widest">
                      Step {sIdx + 1}
                    </span>
                    <h4 className="text-sm font-bold text-white">{step.title}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">{step.instruction}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* OBSERVATION QUESTIONS */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              <h3 className="text-lg font-bold text-emerald-400">👁️ Lab Observations & Empirical Findings</h3>
              {OBSERVATION_QUESTIONS.map((obs, oIdx) => (
                <div key={oIdx} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                  <p className="text-sm font-semibold text-slate-200">{obs.question}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {obs.observableOptions.map((opt, optIdx) => (
                      <button
                        key={optIdx}
                        onClick={() => {
                          audioManager.play('tap');
                          setObservationAnswers((prev) => ({ ...prev, [oIdx]: optIdx }));
                        }}
                        className={`p-3 rounded-lg border text-xs text-left font-medium ${
                          observationAnswers[oIdx] === optIdx
                            ? optIdx === obs.correctIndex
                              ? 'border-emerald-500 bg-emerald-950/60 text-emerald-200'
                              : 'border-amber-500 bg-amber-950/60 text-amber-200'
                            : 'border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-700'
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

        {/* ================= TAB 3: CHALLENGES ================= */}
        {activeTab === 'challenges' && (
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Challenge Header Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">
                    Challenge {currentChallengeIndex + 1} of {CHALLENGES.length}
                  </span>
                  <h3 className="text-xl font-extrabold text-white mt-1">{activeChallenge.question}</h3>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      activeChallenge.difficulty === 'foundation'
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        : activeChallenge.difficulty === 'standard'
                        ? 'bg-amber-950 text-amber-400 border border-amber-800'
                        : 'bg-rose-950 text-rose-400 border border-rose-800'
                    }`}
                  >
                    {activeChallenge.difficulty}
                  </span>
                  <span className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-xs font-bold border border-slate-700">
                    {activeChallenge.competencyLevel}
                  </span>
                </div>
              </div>

              {/* HINT BUBBLE COMPONENT */}
              <HintBubble show={showHint} text={activeChallenge.hints[Math.min(hintsUsedCount, 2)]} />

              {!showHint && (
                <button
                  onClick={() => {
                    audioManager.play('hint');
                    setHintsUsedCount((prev) => Math.min(prev + 1, 2));
                    setShowHint(true);
                  }}
                  className="text-xs font-bold text-amber-400 hover:underline flex items-center gap-1"
                >
                  💡 Need a Hint? ({3 - hintsUsedCount} remaining)
                </button>
              )}

              {/* CHALLENGE INPUT TYPE RENDERERS */}
              {/* Type 1: MCQ */}
              {activeChallenge.type === 'mcq' && activeChallenge.options && (
                <div className="grid grid-cols-1 gap-3 pt-2">
                  {activeChallenge.options.map((optionText, oIdx) => (
                    <button
                      key={oIdx}
                      onClick={() => {
                        audioManager.play('tap');
                        setSelectedMcqIndex(oIdx);
                      }}
                      className={`p-4 rounded-xl border text-left text-sm font-semibold transition-all ${
                        selectedMcqIndex === oIdx
                          ? 'border-indigo-500 bg-indigo-950/60 text-white shadow-lg'
                          : 'border-slate-800 bg-slate-950/40 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <span className="text-indigo-400 font-extrabold mr-3">{String.fromCharCode(65 + oIdx)}.</span>
                      {optionText}
                    </button>
                  ))}
                  <button
                    disabled={selectedMcqIndex === null}
                    onClick={handleMcqSubmit}
                    className="mt-3 w-full py-3.5 bg-gradient-to-r from-indigo-500 to-sky-500 rounded-xl text-white font-bold text-sm disabled:opacity-50 hover:opacity-90 transition-all shadow-lg"
                  >
                    Submit Response
                  </button>
                </div>
              )}

              {/* Type 2: Numeric */}
              {activeChallenge.type === 'numeric' && (
                <div className="space-y-4 pt-2">
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      value={numericInput}
                      onChange={(e) => setNumericInput(e.target.value)}
                      placeholder="Enter numerical answer..."
                      className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white font-bold focus:outline-none focus:border-indigo-500"
                    />
                    <button
                      disabled={numericInput.trim() === ''}
                      onClick={handleNumericSubmit}
                      className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-sky-500 rounded-xl text-white font-bold text-sm disabled:opacity-50 hover:opacity-90 shadow-lg"
                    >
                      Check Answer
                    </button>
                  </div>
                </div>
              )}

              {/* Type 3: Build Atom in Lab */}
              {activeChallenge.type === 'build' && activeChallenge.targetAtom && (
                <div className="space-y-4 pt-2">
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                    <p className="text-xs text-sky-300">
                      Use the interactive atomic sliders below or switch to the <strong>Atomic Lab</strong> tab to align
                      the parameters:
                    </p>
                    <div className="grid grid-cols-3 gap-3 text-center text-xs font-bold">
                      <div className="p-2 bg-slate-900 rounded-lg border border-red-900 text-red-400">
                        Protons: {protons}
                      </div>
                      <div className="p-2 bg-slate-900 rounded-lg border border-slate-700 text-slate-300">
                        Neutrons: {neutrons}
                      </div>
                      <div className="p-2 bg-slate-900 rounded-lg border border-sky-900 text-sky-400">
                        Electrons: {electrons}
                      </div>
                    </div>
                  </div>

                  <AtomStructureSVG protons={protons} neutrons={neutrons} electrons={electrons} />

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="text-[10px] text-red-400 font-bold uppercase">Protons ({protons})</label>
                      <input
                        type="range"
                        min="1"
                        max="18"
                        value={protons}
                        onChange={(e) => setProtons(parseInt(e.target.value))}
                        className="w-full accent-red-500"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-300 font-bold uppercase">Neutrons ({neutrons})</label>
                      <input
                        type="range"
                        min="0"
                        max="22"
                        value={neutrons}
                        onChange={(e) => setNeutrons(parseInt(e.target.value))}
                        className="w-full accent-slate-400"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-sky-400 font-bold uppercase">Electrons ({electrons})</label>
                      <input
                        type="range"
                        min="0"
                        max="18"
                        value={electrons}
                        onChange={(e) => setElectrons(parseInt(e.target.value))}
                        className="w-full accent-sky-400"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleBuildVerify}
                    className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl text-white font-bold text-sm hover:opacity-90 shadow-lg"
                  >
                    Verify Atom Construction
                  </button>
                </div>
              )}

              {/* Challenge Feedback Alert */}
              {challengeFeedback && (
                <div
                  className={`p-4 rounded-xl border space-y-3 ${
                    challengeFeedback.isCorrect
                      ? 'bg-emerald-950/60 border-emerald-800 text-emerald-200'
                      : 'bg-rose-950/60 border-rose-800 text-rose-200'
                  }`}
                >
                  <p className="font-extrabold text-sm">{challengeFeedback.msg}</p>
                  <button
                    onClick={handleNextChallenge}
                    className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-bold text-xs border border-slate-700 shadow-md"
                  >
                    {currentChallengeIndex < CHALLENGES.length - 1 ? 'Next Challenge ➔' : 'View Final Mastery Summary 📊'}
                  </button>
                </div>
              )}
            </div>

            {/* Challenge Sequence Stepper */}
            <div className="flex items-center justify-center gap-1.5 flex-wrap">
              {CHALLENGES.map((ch, idx) => (
                <button
                  key={ch.id}
                  onClick={() => {
                    audioManager.play('tap');
                    setCurrentChallengeIndex(idx);
                    setChallengeFeedback(null);
                  }}
                  className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                    idx === currentChallengeIndex
                      ? 'bg-indigo-500 text-white ring-2 ring-indigo-300'
                      : completedChallengeIds.has(ch.id)
                      ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-700'
                      : 'bg-slate-900 text-slate-500 border border-slate-800'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 4: SUMMARY & MASTERY ================= */}
        {activeTab === 'summary' && (
          <div className="space-y-6">
            {/* Overall Mastery Header */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <h2 className="text-2xl font-black text-amber-400">Atomic Physics & Chemistry Mastery Report</h2>
              <p className="text-slate-300 text-sm">
                Comprehensive BKT (Bayesian Knowledge Tracing) and SM-2 Spaced Repetition analysis across all 8 learning nodes.
              </p>

              {/* Node Breakdown Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                {ALL_NODE_IDS.map((nodeId) => {
                  const bkt = bktStates[nodeId] || createBKTState();
                  const mastery = Math.round(masteryProb(bkt) * 100);
                  const nodeTitle = SUBJECT_CONFIG[nodeId]?.name || nodeId;

                  return (
                    <div key={nodeId} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">{nodeId}</span>
                        <span className="text-xs font-extrabold text-emerald-400">{mastery}%</span>
                      </div>
                      <p className="text-xs font-bold text-slate-200 line-clamp-2">{nodeTitle}</p>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-emerald-400 h-full transition-all duration-500"
                          style={{ width: `${mastery}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* REAL WORLD EXTENSION ACTIVITY */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <h3 className="text-lg font-bold text-sky-400 flex items-center gap-2">
                <span>🌐 Real-World Application Task</span>
              </h3>
              <h4 className="text-base font-extrabold text-white">{REAL_WORLD_ACTIVITY.title}</h4>
              <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                  <div key={idx} className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300">
                    <strong className="text-amber-400 block mb-1">Step {idx + 1}:</strong>
                    {step}
                  </div>
                ))}
              </div>
            </div>

            {/* COMMON MISCONCEPTIONS CORRECTION */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <h3 className="text-lg font-bold text-rose-400">⚠️ Common Misconceptions & Clarifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MISCONCEPTIONS.map((misc) => (
                  <div key={misc.id} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <p className="text-xs font-bold text-rose-400">❌ Misconception: "{misc.misconception}"</p>
                    <p className="text-xs text-emerald-300 leading-relaxed">
                      <strong>✅ Scientific Fact:</strong> {misc.correction}
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

export default C7_ChemistryAtomicstructureelectronsprotonsneutronsSim;