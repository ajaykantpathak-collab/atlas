'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, masteryProb } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS ───
const NODE_C9_PHY_001 = 'c9_phy_cbse_001'; // Matter as collection of atoms
const NODE_C9_PHY_002 = 'c9_phy_cbse_002'; // Ancient atomic theory
const NODE_C9_PHY_003 = 'c9_phy_cbse_003'; // Dalton atomic theory
const NODE_C9_PHY_004 = 'c9_phy_cbse_004'; // Discovery of subatomic particles - Electron
const NODE_C9_PHY_005 = 'c9_phy_cbse_005'; // Discovery of Proton
const NODE_C9_PHY_006 = 'c9_phy_cbse_006'; // Discovery of Neutron
const NODE_C9_PHY_007 = 'c9_phy_cbse_007'; // Thomson model
const NODE_C9_PHY_008 = 'c9_phy_cbse_008'; // Rutherford alpha particle scattering
const NODE_C9_PHY_009 = 'c9_phy_cbse_009'; // Rutherford nuclear model & limitations
const NODE_C9_PHY_010 = 'c9_phy_cbse_010'; // Bohr model of atom
const NODE_C9_PHY_011 = 'c9_phy_cbse_011'; // Subatomic particles properties
const NODE_C9_PHY_012 = 'c9_phy_cbse_012'; // Electronic configuration & Bohr-Bury scheme
const NODE_C9_PHY_013 = 'c9_phy_cbse_013'; // Valency and valence electrons
const NODE_C9_PHY_014 = 'c9_phy_cbse_014'; // Atomic number (Z)
const NODE_C9_PHY_015 = 'c9_phy_cbse_015'; // Mass number (A)
const NODE_C9_PHY_016 = 'c9_phy_cbse_016'; // Representation of an element
const NODE_C9_PHY_017 = 'c9_phy_cbse_017'; // Isotopes & applications
const NODE_C9_PHY_018 = 'c9_phy_cbse_018'; // Isobars
const NODE_C9_PHY_019 = 'c9_phy_cbse_019'; // Fractional atomic mass

const ALL_NODE_IDS = [
  NODE_C9_PHY_001,
  NODE_C9_PHY_002,
  NODE_C9_PHY_003,
  NODE_C9_PHY_004,
  NODE_C9_PHY_005,
  NODE_C9_PHY_006,
  NODE_C9_PHY_007,
  NODE_C9_PHY_008,
  NODE_C9_PHY_009,
  NODE_C9_PHY_010,
  NODE_C9_PHY_011,
  NODE_C9_PHY_012,
  NODE_C9_PHY_013,
  NODE_C9_PHY_014,
  NODE_C9_PHY_015,
  NODE_C9_PHY_016,
  NODE_C9_PHY_017,
  NODE_C9_PHY_018,
  NODE_C9_PHY_019,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Mission: The Subatomic Quantum Analyzer',
  intro: 'Welcome to the High Energy Physics & Quantum Diagnostics Lab. An unknown cosmic sample has arrived at our lab, and its elemental isotopes must be identified through subatomic probing. You will fire alpha particles at gold foil, calibrate cathode ray tubes, construct electron shell configurations, analyze isotopes, and unlock the fundamental architecture of matter.',
  context: 'Explore how human understanding evolved from indivisible spheres (Dalton) to pudding models (Thomson), planetary trajectories (Rutherford), quantized orbits (Bohr), and isotope mass balances.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'When Rutherford fired positively charged alpha particles (He²⁺) at a super-thin gold foil (1000 atoms thick), what did he expect based on Thomson\'s Plum Pudding model, and what actually happened?',
  options: [
    'Expected all particles to bounce back; in reality, all particles passed straight through with zero interaction.',
    'Expected minor deflections everywhere; in reality, most passed straight through, but 1 in 20,000 rebounded backwards at huge angles!',
    'Expected alpha particles to stick inside the gold atom matrix and turn gold into lead.',
    'Expected alpha particles to lose their charge and turn into light waves.',
  ],
  correctIndex: 1,
  hintAfter: 'Thomson thought positive charge was spread thinly like pudding. Rutherford was astounded when a tiny dense nucleus caused extreme backward scattering!',
};

// ─── ELEMENT DATABASE FOR INTERACTIVE LAB ───
interface ElementData {
  z: number;
  symbol: string;
  name: string;
  massNum: number;
  protons: number;
  neutrons: number;
  electrons: number;
  shells: number[];
  valency: number;
  category: string;
}

const ELEMENT_DATABASE: ElementData[] = [
  { z: 1, symbol: 'H', name: 'Hydrogen', massNum: 1, protons: 1, neutrons: 0, electrons: 1, shells: [1], valency: 1, category: 'Non-metal' },
  { z: 2, symbol: 'He', name: 'Helium', massNum: 4, protons: 2, neutrons: 2, electrons: 2, shells: [2], valency: 0, category: 'Noble Gas' },
  { z: 3, symbol: 'Li', name: 'Lithium', massNum: 7, protons: 3, neutrons: 4, electrons: 3, shells: [2, 1], valency: 1, category: 'Alkali Metal' },
  { z: 4, symbol: 'Be', name: 'Beryllium', massNum: 9, protons: 4, neutrons: 5, electrons: 4, shells: [2, 2], valency: 2, category: 'Alkaline Earth' },
  { z: 5, symbol: 'B', name: 'Boron', massNum: 11, protons: 5, neutrons: 6, electrons: 5, shells: [2, 3], valency: 3, category: 'Metalloid' },
  { z: 6, symbol: 'C', name: 'Carbon', massNum: 12, protons: 6, neutrons: 6, electrons: 6, shells: [2, 4], valency: 4, category: 'Non-metal' },
  { z: 7, symbol: 'N', name: 'Nitrogen', massNum: 14, protons: 7, neutrons: 7, electrons: 7, shells: [2, 5], valency: 3, category: 'Non-metal' },
  { z: 8, symbol: 'O', name: 'Oxygen', massNum: 16, protons: 8, neutrons: 8, electrons: 8, shells: [2, 6], valency: 2, category: 'Non-metal' },
  { z: 9, symbol: 'F', name: 'Fluorine', massNum: 19, protons: 9, neutrons: 10, electrons: 9, shells: [2, 7], valency: 1, category: 'Halogen' },
  { z: 10, symbol: 'Ne', name: 'Neon', massNum: 20, protons: 10, neutrons: 10, electrons: 10, shells: [2, 8], valency: 0, category: 'Noble Gas' },
  { z: 11, symbol: 'Na', name: 'Sodium', massNum: 23, protons: 11, neutrons: 12, electrons: 11, shells: [2, 8, 1], valency: 1, category: 'Alkali Metal' },
  { z: 12, symbol: 'Mg', name: 'Magnesium', massNum: 24, protons: 12, neutrons: 12, electrons: 12, shells: [2, 8, 2], valency: 2, category: 'Alkaline Earth' },
  { z: 13, symbol: 'Al', name: 'Aluminium', massNum: 27, protons: 13, neutrons: 14, electrons: 13, shells: [2, 8, 3], valency: 3, category: 'Metal' },
  { z: 14, symbol: 'Si', name: 'Silicon', massNum: 28, protons: 14, neutrons: 14, electrons: 14, shells: [2, 8, 4], valency: 4, category: 'Metalloid' },
  { z: 15, symbol: 'P', name: 'Phosphorus', massNum: 31, protons: 15, neutrons: 16, electrons: 15, shells: [2, 8, 5], valency: 3, category: 'Non-metal' },
  { z: 16, symbol: 'S', name: 'Sulphur', massNum: 32, protons: 16, neutrons: 16, electrons: 16, shells: [2, 8, 6], valency: 2, category: 'Non-metal' },
  { z: 17, symbol: 'Cl', name: 'Chlorine', massNum: 35, protons: 17, neutrons: 18, electrons: 17, shells: [2, 8, 7], valency: 1, category: 'Halogen' },
  { z: 18, symbol: 'Ar', name: 'Argon', massNum: 40, protons: 18, neutrons: 22, electrons: 18, shells: [2, 8, 8], valency: 0, category: 'Noble Gas' },
  { z: 19, symbol: 'K', name: 'Potassium', massNum: 39, protons: 19, neutrons: 20, electrons: 19, shells: [2, 8, 8, 1], valency: 1, category: 'Alkali Metal' },
  { z: 20, symbol: 'Ca', name: 'Calcium', massNum: 40, protons: 20, neutrons: 20, electrons: 20, shells: [2, 8, 8, 2], valency: 2, category: 'Alkaline Earth' },
];

// ─── TEACHING SLIDES ───
interface TeachingSlide {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  formula?: string;
  keyPoints: string[];
  graphicType: 'ancient_dalton' | 'thomson_crt' | 'rutherford_scattering' | 'bohr_orbits' | 'isotopes_isobars';
}

const TEACHING_SLIDES: TeachingSlide[] = [
  {
    id: 'slide_1',
    title: '1. Ancient Philosophy & Dalton\'s Atomic Theory',
    subtitle: 'From Maharishi Kanada\'s Parmanu to John Dalton\'s Indivisible Sphere',
    content: 'Ancient Indian philosopher Maharishi Kanada proposed that matter consists of indivisible particles called "Parmanu". In 1808, John Dalton formalized this into scientific atomic theory.',
    keyPoints: [
      'All matter is made up of extremely small indivisible particles called atoms.',
      'Atoms of a given element are identical in mass and chemical properties.',
      'Atoms combine in simple whole-number ratios to form compounds.',
      'Atoms are neither created nor destroyed during a chemical reaction (Law of Conservation of Mass).',
    ],
    graphicType: 'ancient_dalton',
  },
  {
    id: 'slide_2',
    title: '2. Cathode Rays & Thomson\'s Watermelon Model',
    subtitle: 'Discovery of the Electron ($e^-$) and Plum Pudding Paradigm',
    content: 'J.J. Thomson (1897) discovered subatomic negative particles called electrons using Cathode Ray Discharge Tubes. Eugen Goldstein discovered positive rays (Anode rays / Canal rays) containing protons.',
    formula: 'e/m = 1.76 \\times 10^{11} \\text{ C/kg}',
    keyPoints: [
      'Electron: charge = -1.6 x 10⁻¹⁹ C, mass = 9.1 x 10⁻³¹ kg (1/1840 of hydrogen atom).',
      'Thomson Model: An atom resembles a watermelon where positive charge is spread uniformly, and negative electrons are embedded like seeds.',
      'Limitation: Failed to explain why alpha particles deflect at large angles.',
    ],
    graphicType: 'thomson_crt',
  },
  {
    id: 'slide_3',
    title: '3. Rutherford\'s Gold Foil Alpha Scattering Experiment',
    subtitle: 'Discovering the Dense Positive Nucleus',
    content: 'Rutherford bombarded a 1000-atom thick gold foil with fast-moving alpha particles ($He^{2+}$). Most passed through unhindered, but 1 in 20,000 bounced straight back!',
    formula: 'F_{Coulomb} = \\frac{k \\cdot (2e) \\cdot (Ze)}{r^2}',
    keyPoints: [
      'Most space inside an atom is empty (99.999% empty space).',
      'All positive charge and almost all mass is concentrated in a tiny nucleus at the center.',
      'Nucleus radius (~10⁻¹⁵ m) is 100,000 times smaller than atom radius (~10⁻¹⁰ m).',
      'Limitation: Accelerating revolving electrons should emit radiation, lose energy, and spiral into nucleus within 10⁻⁸ seconds (Atom instability paradox!).',
    ],
    graphicType: 'rutherford_scattering',
  },
  {
    id: 'slide_4',
    title: '4. Bohr\'s Model & Subatomic Particles',
    subtitle: 'Quantized Discrete Energy Orbits and James Chadwick\'s Neutron',
    content: 'Neils Bohr saved atomic physics by introducing quantized orbits where electrons do NOT radiate energy while revolving. In 1932, James Chadwick discovered neutral particles in the nucleus called Neutrons ($n^0$).',
    formula: '2n^2 \\quad (\\text{Max electrons per shell: } K=2, L=8, M=18, N=32)',
    keyPoints: [
      'Electrons revolve only in special discrete non-radiating orbits (shells K, L, M, N... or n=1, 2, 3, 4...).',
      'Energy is absorbed/emitted only when electron jumps between discrete shells.',
      'Proton ($p^+$): mass = 1 u, charge = +1. Neutron ($n^0$): mass = 1 u, charge = 0.',
      'Valency: Combine capacity determined by valence shell electrons (Octet Rule: max 8 electrons in outermost shell).',
    ],
    graphicType: 'bohr_orbits',
  },
  {
    id: 'slide_5',
    title: '5. Atomic Representation, Isotopes & Isobars',
    subtitle: 'Atomic Number ($Z$), Mass Number ($A$), and Isotopic Applications',
    content: 'An element is represented as $_Z^A X$. Isotopes have same $Z$ but different $A$. Isobars have same mass number $A$ but different atomic number $Z$.',
    formula: '\\text{Average Mass} = \\sum (\\text{Isotope Mass} \\times \\text{Fractional Abundance})',
    keyPoints: [
      'Atomic Number ($Z$) = number of protons = number of electrons in neutral atom.',
      'Mass Number ($A$) = Protons ($Z$) + Neutrons ($N$). Therefore $N = A - Z$.',
      'Isotopes of Hydrogen: Protium ($_1^1H$), Deuterium ($_1^2H$), Tritium ($_1^3H$).',
      'Chlorine: $^{35}_{17}Cl$ (75%) and $^{37}_{17}Cl$ (25%) yield average atomic mass = 35.5 u.',
      'Applications: Uranium-235 (Nuclear fuel), Cobalt-60 (Cancer radiotherapy), Iodine-131 (Goitre treatment).',
    ],
    graphicType: 'isotopes_isobars',
  },
];

// ─── CHALLENGE INTERFACE ───
interface Challenge {
  id: string;
  nodeId: string;
  type: 'mcq' | 'numeric' | 'matching' | 'drag_sort' | 'fill_blank';
  difficulty: 'foundation' | 'standard' | 'advanced';
  question: string;
  options?: string[];
  correctIndex?: number;
  correctAnswer?: number;
  tolerance?: number;
  unit?: string;
  matchingPairs?: { left: string; right: string }[];
  sortItems?: string[];
  correctOrder?: number[];
  explanation: string;
  hints: string[];
}

const CHALLENGES: Challenge[] = [
  {
    id: 'ch_01_dalton',
    nodeId: NODE_C9_PHY_003,
    type: 'mcq',
    difficulty: 'foundation',
    question: 'Which statement directly aligns with John Dalton\'s Atomic Theory?',
    options: [
      'Atoms consist of a dense positive nucleus surrounded by revolving electrons.',
      'Atoms are indivisible, indestructible building blocks, and all atoms of a given element are identical in mass.',
      'Atoms lose mass continuously by emitting electromagnetic wave packets.',
      'Atoms can be broken down into quarks during low-energy chemical reactions.',
    ],
    correctIndex: 1,
    explanation: 'Dalton proposed that atoms are hard, indivisible spheres. Subatomic particles (electrons, protons, neutrons) were discovered later.',
    hints: ['Think back to early 1800s before subatomic particles were discovered.', 'Dalton believed the atom was the ultimate smallest particle of matter.'],
  },
  {
    id: 'ch_02_subatomic_properties',
    nodeId: NODE_C9_PHY_011,
    type: 'mcq',
    difficulty: 'foundation',
    question: 'Compare the relative charges and approximate mass ratio of an Electron, Proton, and Neutron.',
    options: [
      'Electron (-1, 1/1840 u), Proton (+1, 1 u), Neutron (0, 1 u)',
      'Electron (0, 1 u), Proton (+1, 1/1840 u), Neutron (-1, 1 u)',
      'Electron (-1, 1 u), Proton (+1, 1 u), Neutron (0, 0 u)',
      'Electron (+1, 1/1840 u), Proton (-1, 1 u), Neutron (0, 1 u)',
    ],
    correctIndex: 0,
    explanation: 'Electrons have unit negative charge and negligible mass (~1/1840 u). Protons (+1) and neutrons (0) each weigh approximately 1 u.',
    hints: ['Which particle is almost massless compared to the nucleus particles?', 'Protons and neutrons reside in the nucleus.'],
  },
  {
    id: 'ch_03_rutherford_deflection',
    nodeId: NODE_C9_PHY_008,
    type: 'mcq',
    difficulty: 'standard',
    question: 'In Rutherford\'s experiment, why did a tiny fraction (~1 in 20,000) of alpha particles rebound backwards at angles greater than 90°?',
    options: [
      'They collided with light negative electrons moving at high speeds.',
      'They suffered strong electrostatic repulsion from a highly concentrated, dense positive mass (nucleus).',
      'They were absorbed by air molecules between the gold foil and zinc sulfide screen.',
      'They bounced off gold atom orbits due to friction.',
    ],
    correctIndex: 1,
    explanation: 'Alpha particles carry +2e positive charge. Rebounding at huge angles requires a concentrated positive nucleus carrying massive positive charge.',
    hints: ['Like charges repel! Alpha particles are positive.', 'Where is all the mass and positive charge concentrated?'],
  },
  {
    id: 'ch_04_rutherford_limitation',
    nodeId: NODE_C9_PHY_009,
    type: 'mcq',
    difficulty: 'standard',
    question: 'What was the fatal flaw in Rutherford\'s nuclear model according to classical electromagnetic theory?',
    options: [
      'It could not explain why alpha particles carry a +2 charge.',
      'An accelerating charged electron must continuously radiate energy, causing it to spiral into the nucleus and collapse the atom.',
      'It predicted that neutrons would decay into protons inside gold foil.',
      'It stated that electrons are stationary inside the nucleus.',
    ],
    correctIndex: 1,
    explanation: 'Maxwell\'s electrodynamics states an accelerating charge continuously radiates energy. Rutherford\'s orbiting electron should lose energy and spiral into the nucleus within ~10⁻⁸ seconds.',
    hints: ['Objects moving in circular orbits undergo continuous acceleration.', 'Accelerating charges emit radiation energy.'],
  },
  {
    id: 'ch_05_bohr_rules',
    nodeId: NODE_C9_PHY_010,
    type: 'mcq',
    difficulty: 'standard',
    question: 'How did Niels Bohr resolve the atomic instability paradox in Rutherford\'s model?',
    options: [
      'By postulating that electrons revolve in stationary non-radiating discrete orbits (shells).',
      'By claiming electrons do not carry electrical charge when orbiting.',
      'By showing that protons neutralise electron radiation completely.',
      'By proving that electrons exist only inside the nucleus.',
    ],
    correctIndex: 0,
    explanation: 'Bohr postulated that while revolving in discrete stationary orbits (K, L, M, N), electrons do not radiate energy. Radiation occurs only during orbital transitions.',
    hints: ['Discrete orbits means quantized non-radiating states.', 'Electrons emit photons only when changing shell levels.'],
  },
  {
    id: 'ch_06_electron_config_na',
    nodeId: NODE_C9_PHY_012,
    type: 'mcq',
    difficulty: 'foundation',
    question: 'Sodium has atomic number Z = 11. What is its electronic configuration according to the Bohr-Bury scheme?',
    options: [
      '2, 9',
      '2, 8, 1',
      '2, 7, 2',
      '8, 2, 1',
    ],
    correctIndex: 1,
    explanation: 'Maximum capacity of K shell = 2 x 1² = 2. L shell = 2 x 2² = 8. The remaining 1 electron goes to the M shell -> (2, 8, 1).',
    hints: ['K shell holds max 2.', 'L shell holds max 8.', 'Remaining electron goes to M shell.'],
  },
  {
    id: 'ch_07_valency_calc',
    nodeId: NODE_C9_PHY_013,
    type: 'numeric',
    difficulty: 'standard',
    question: 'An atom of Sulphur has atomic number Z = 16. What is its combining capacity (valency)?',
    correctAnswer: 2,
    tolerance: 0,
    unit: '',
    explanation: 'Electronic configuration of Sulphur (Z=16) is 2, 8, 6. Outer valence electrons = 6. To achieve octet (8), it gains 2 electrons. Valency = 8 - 6 = 2.',
    hints: ['Write configuration: K=2, L=8, M=6.', 'Valency for valence > 4 is (8 - valence electrons).'],
  },
  {
    id: 'ch_08_neutrons_calc',
    nodeId: NODE_C9_PHY_015,
    type: 'numeric',
    difficulty: 'foundation',
    question: 'An atom is represented as $^{27}_{13}\\text{Al}$. Calculate the number of neutrons in this Aluminium nucleus.',
    correctAnswer: 14,
    tolerance: 0,
    unit: 'neutrons',
    explanation: 'Mass Number A = 27, Atomic Number Z = 13. Neutrons N = A - Z = 27 - 13 = 14.',
    hints: ['Formula: Mass Number (A) = Protons (Z) + Neutrons (N).', 'N = 27 - 13.'],
  },
  {
    id: 'ch_09_fractional_mass_cl',
    nodeId: NODE_C9_PHY_019,
    type: 'numeric',
    difficulty: 'advanced',
    question: 'Naturally occurring Chlorine consists of 75% $^{35}_{17}\\text{Cl}$ and 25% $^{37}_{17}\\text{Cl}$. Calculate its average atomic mass in unified mass units (u).',
    correctAnswer: 35.5,
    tolerance: 0.1,
    unit: 'u',
    explanation: 'Average Atomic Mass = (35 x 75/100) + (37 x 25/100) = (2625 + 925)/100 = 3550/100 = 35.5 u.',
    hints: ['Multiply isotope mass by percentage fraction.', '35 * 0.75 + 37 * 0.25.'],
  },
  {
    id: 'ch_10_isobars_distinction',
    nodeId: NODE_C9_PHY_018,
    type: 'mcq',
    difficulty: 'standard',
    question: 'Calcium ($^{40}_{20}\\text{Ca}$) and Argon ($^{40}_{18}\\text{Ar}$) are examples of:',
    options: [
      'Isotopes, because they have different atomic numbers.',
      'Isobars, because they have the same mass number (A = 40) but different atomic numbers (Z).',
      'Allotropes, because they share the same physical state.',
      'Isomers, because they have identical chemical reactivity.',
    ],
    correctIndex: 1,
    explanation: 'Isobars are atoms of different chemical elements having the same mass number (A) but different atomic numbers (Z).',
    hints: ['Look at top mass number A = 40 for both.', 'Elements with same A but different Z are Isobars.'],
  },
  {
    id: 'ch_11_isotope_application',
    nodeId: NODE_C9_PHY_017,
    type: 'mcq',
    difficulty: 'standard',
    question: 'Which radioisotope is used in the medical treatment of Goitre (swelling of thyroid gland)?',
    options: [
      'Uranium-235',
      'Cobalt-60',
      'Iodine-131',
      'Carbon-14',
    ],
    correctIndex: 2,
    explanation: 'Iodine-131 isotope is specifically used in the medical treatment and imaging of goitre and thyroid diseases.',
    hints: ['Which element is essential for thyroid hormone production?', 'Iodine deficiency causes goitre!'],
  },
  {
    id: 'ch_12_bohr_bury_2n2',
    nodeId: NODE_C9_PHY_012,
    type: 'numeric',
    difficulty: 'foundation',
    question: 'According to the Bohr-Bury formula $2n^2$, what is the maximum electron capacity of the M shell (where principal quantum number n = 3)?',
    correctAnswer: 18,
    tolerance: 0,
    unit: 'electrons',
    explanation: 'Max capacity = 2 x n² = 2 x 3² = 2 x 9 = 18 electrons.',
    hints: ['n = 3 for M shell.', 'Calculate 2 * 3 * 3.'],
  },
];

// ─── MISCONCEPTIONS CHECKLIST ───
const MISCONCEPTIONS_CHECKLIST = [
  {
    id: 'misc_1',
    misconception: 'Atoms are continuous solid spheres with no empty space.',
    correction: 'Rutherford proved atoms are 99.999% empty space; almost all mass resides in a tiny nucleus at the center.',
  },
  {
    id: 'misc_2',
    misconception: 'Electrons lose energy continuously and fall into the nucleus.',
    correction: 'Bohr established that electrons reside in discrete non-radiating stationary orbits and only exchange energy during orbital quantum jumps.',
  },
  {
    id: 'misc_3',
    misconception: 'Valency is always equal to the number of valence electrons.',
    correction: 'Valency equals valence electrons for 1, 2, 3, 4; but for 5, 6, 7 valence electrons, valency is (8 - valence electrons).',
  },
  {
    id: 'misc_4',
    misconception: 'Isotopes have different chemical properties.',
    correction: 'Isotopes have identical atomic numbers (Z) and electron configurations, so their chemical properties are virtually identical; only mass/nuclear properties differ.',
  },
  {
    id: 'misc_5',
    misconception: 'Atomic mass of an element must always be a whole number.',
    correction: 'Elements in nature exist as isotopic mixtures; fractional atomic masses (e.g. Chlorine = 35.5 u) arise from weighted isotopic abundance averages.',
  },
];

// ─── MAIN COMPONENT ───
const C9_PhysicsJourneyInsideAtomCBSESim: React.FC = () => {
  // State: Tab & Navigation
  const [activeTab, setActiveTab] = useState<'guided' | 'lab_rutherford_bohr' | 'lab_isotopes' | 'challenges' | 'misconceptions'>('guided');
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);

  // Discovery Question State
  const [discoverySelected, setDiscoverySelected] = useState<number | null>(null);
  const [discoverySubmitted, setDiscoverySubmitted] = useState<boolean>(false);

  // Rutherford Canvas Controls
  const [alphaEnergy, setAlphaEnergy] = useState<number>(50); // MeV scale proxy
  const [impactParameter, setImpactParameter] = useState<number>(20); // offset
  const [nucleusZ, setNucleusZ] = useState<number>(79); // Gold = 79
  const [isFiringAlpha, setIsFiringAlpha] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Bohr Builder Selected Element State
  const [selectedZ, setSelectedZ] = useState<number>(6); // Default Carbon
  const [photonEmitting, setPhotonEmitting] = useState<boolean>(false);

  // Challenges State
  const [currentChallengeIdx, setCurrentChallengeIdx] = useState<number>(0);
  const [selectedMcqOption, setSelectedMcqOption] = useState<number | null>(null);
  const [numericAnswer, setNumericAnswer] = useState<string>('');
  const [challengeFeedback, setChallengeFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);
  const [completedChallenges, setCompletedChallenges] = useState<Record<string, boolean>>({});

  // Gamification & SRS/BKT State
  const [score, setScore] = useState<number>(0);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [sparklePos, setSparklePos] = useState<{ x: number; y: number }>({ x: 400, y: 300 });

  // BKT state per node
  const [bktStates, setBktStates] = useState<Record<string, ReturnType<typeof createBKTState>>>(() => {
    const initial: Record<string, ReturnType<typeof createBKTState>> = {};
    ALL_NODE_IDS.forEach((id) => {
      initial[id] = createBKTState();
    });
    return initial;
  });

  // Auto hint trigger state
  const [showHint, setShowHint] = useState<boolean>(false);
  const [hintText, setHintText] = useState<string>('');
  const activityTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Sound toggle
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Calculate overall BKT Mastery
  const overallMastery = useMemo(() => {
    let sum = 0;
    ALL_NODE_IDS.forEach((id) => {
      sum += masteryProb(bktStates[id].pKnown);
    });
    return sum / ALL_NODE_IDS.length;
  }, [bktStates]);

  // Inactivity auto-hint logic
  const resetInactivityTimer = useCallback(() => {
    if (activityTimerRef.current) clearTimeout(activityTimerRef.current);
    setShowHint(false);
    activityTimerRef.current = setTimeout(() => {
      setHintText('Need a nudge? Adjust the physical sliders or read the key points to unlock the pattern!');
      setShowHint(true);
      if (soundEnabled) audioManager.play('hint');
    }, 10000);
  }, [soundEnabled]);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (activityTimerRef.current) clearTimeout(activityTimerRef.current);
    };
  }, [activeTab, currentSlideIndex, currentChallengeIdx, resetInactivityTimer]);

  // Handler for Discovery Question
  const handleDiscoverySubmit = () => {
    if (discoverySelected === null) return;
    setDiscoverySubmitted(true);
    const isCorrect = discoverySelected === DISCOVERY_QUESTION.correctIndex;
    if (isCorrect) {
      if (soundEnabled) audioManager.play('celebration');
      speechManager.speak('Brilliant observation! Rutherford was completely astonished when alpha particles rebounded!');
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    } else {
      if (soundEnabled) audioManager.play('error');
      speechManager.speak('Not quite. Rutherford noticed that 1 in 20,000 bounced back directly!');
    }
  };

  // Rutherford Simulation Canvas Animation Loop
  useEffect(() => {
    if (activeTab !== 'lab_rutherford_bohr') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let alphaParticles: { x: number; y: number; vx: number; vy: number; path: { x: number; y: number }[] }[] = [];

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const launchParticles = () => {
      alphaParticles = [];
      const numLines = 9;
      for (let i = 0; i < numLines; i++) {
        const offset = (i - Math.floor(numLines / 2)) * 18 + (impactParameter - 20);
        alphaParticles.push({
          x: 20,
          y: centerY + offset,
          vx: (alphaEnergy / 50) * 4.5,
          vy: 0,
          path: [],
        });
      }
    };

    launchParticles();

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw Grid Background
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw Nucleus
      const nucleusRadius = 12 + (nucleusZ / 79) * 8;
      const gradient = ctx.createRadialGradient(centerX, centerY, 2, centerX, centerY, nucleusRadius * 2);
      gradient.addColorStop(0, '#f59e0b');
      gradient.addColorStop(0.5, '#ef4444');
      gradient.addColorStop(1, 'rgba(239, 68, 68, 0)');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, nucleusRadius * 2.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#fef08a';
      ctx.beginPath();
      ctx.arc(centerX, centerY, nucleusRadius, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#78350f';
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`+${nucleusZ}e`, centerX, centerY);

      // Repulsion Constant
      const k = (nucleusZ / 79) * 3500;

      // Update & Draw Alpha Particles
      alphaParticles.forEach((p) => {
        p.path.push({ x: p.x, y: p.y });
        if (p.path.length > 80) p.path.shift();

        // Calculate electrostatic repulsion force
        const dx = p.x - centerX;
        const dy = p.y - centerY;
        const distSq = dx * dx + dy * dy;
        const dist = Math.sqrt(distSq);

        if (dist > 5) {
          const force = k / Math.max(distSq, 100);
          const ax = (force * (dx / dist)) / 2;
          const ay = (force * (dy / dist)) / 2;

          p.vx += ax;
          p.vy += ay;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Draw particle trail
        if (p.path.length > 1) {
          ctx.beginPath();
          ctx.moveTo(p.path[0].x, p.path[0].y);
          for (let i = 1; i < p.path.length; i++) {
            ctx.lineTo(p.path[i].x, p.path[i].y);
          }
          ctx.strokeStyle = 'rgba(56, 189, 248, 0.6)';
          ctx.lineWidth = 2.5;
          ctx.stroke();
        }

        // Draw particle head
        ctx.fillStyle = '#38bdf8';
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
        ctx.fill();
      });

      // Respawn particles when they leave boundary
      if (alphaParticles.every((p) => p.x < 0 || p.x > canvas.width || p.y < 0 || p.y > canvas.height)) {
        launchParticles();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeTab, alphaEnergy, impactParameter, nucleusZ]);

  // Current Element Helper for Bohr Model Sandbox
  const currentElemData = useMemo(() => {
    return ELEMENT_DATABASE.find((e) => e.z === selectedZ) || ELEMENT_DATABASE[5];
  }, [selectedZ]);

  // Trigger Bohr photon jump effect
  const handleTriggerPhoton = () => {
    setPhotonEmitting(true);
    if (soundEnabled) audioManager.play('sparkle');
    speechManager.speak(`Quantum photon emitted! Electron returned to ground state in atom ${currentElemData.name}.`);
    setTimeout(() => setPhotonEmitting(false), 1800);
  };

  // Submit Answer for Challenge
  const handleChallengeSubmit = () => {
    const ch = CHALLENGES[currentChallengeIdx];
    let isCorrect = false;

    if (ch.type === 'mcq') {
      isCorrect = selectedMcqOption === ch.correctIndex;
    } else if (ch.type === 'numeric') {
      const val = parseFloat(numericAnswer);
      if (!isNaN(val) && ch.correctAnswer !== undefined) {
        const tol = ch.tolerance || 0;
        isCorrect = Math.abs(val - ch.correctAnswer) <= tol;
      }
    }

    // Update SRS & BKT
    const srsItem = createReviewItem(ch.nodeId, 'Physics');
    const updatedSrs = sm2Update(srsItem, isCorrect ? 5 : 1, 0);

    setBktStates((prev) => {
      const updated = { ...prev };
      updated[ch.nodeId] = bktUpdate(prev[ch.nodeId], isCorrect);
      return updated;
    });

    if (isCorrect) {
      if (soundEnabled) audioManager.play('drop-correct');
      speechManager.speak('Correct analysis! Outstanding mastery of subatomic physics.');
      setChallengeFeedback({ isCorrect: true, text: 'Spot on! ' + ch.explanation });
      setScore((s) => s + 100);
      setCompletedChallenges((prev) => ({ ...prev, [ch.id]: true }));
      setShowSuccessBanner(true);
      setShowSparkle(true);
      setTimeout(() => {
        setShowSuccessBanner(false);
        setShowSparkle(false);
      }, 2500);
    } else {
      if (soundEnabled) audioManager.play('drop-wrong');
      speechManager.speak('Not quite right. Review the explanation and try again.');
      setChallengeFeedback({ isCorrect: false, text: 'Review: ' + ch.explanation });
    }

    // Record score overall
    recordGameScore(ALL_NODE_IDS, score + (isCorrect ? 100 : 0));
  };

  // Next Challenge Navigation
  const handleNextChallenge = () => {
    setSelectedMcqOption(null);
    setNumericAnswer('');
    setChallengeFeedback(null);
    if (currentChallengeIdx < CHALLENGES.length - 1) {
      setCurrentChallengeIdx((prev) => prev + 1);
      if (soundEnabled) audioManager.play('swoop');
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col items-center justify-start p-2 sm:p-4 md:p-6 select-none">
      <HintBubble show={showHint} text={hintText} />
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccessBanner} text="Subatomic Diagnostic Mastered!" />
      <SparkleBurst show={showSparkle} x={sparklePos.x} y={sparklePos.y} />

      {/* TOP NAV BAR */}
      <header className="w-full max-w-6xl bg-slate-900/90 border border-slate-800 backdrop-blur rounded-xl p-3 sm:p-4 mb-4 flex flex-wrap items-center justify-between gap-3 shadow-2xl">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-gold-500 to-gold-600 flex items-center justify-center text-white font-black text-xl shadow-lg">
            ⚛
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-gold-400 via-gold-300 to-purple-400 bg-clip-text text-transparent">
              Journey Inside the Atom
            </h1>
            <p className="text-xs text-slate-400">Class 9 CBSE Physics • Science Payload Diagnostics</p>
          </div>
        </div>

        {/* METRICS & CONTROLS */}
        <div className="flex items-center space-x-4 flex-wrap gap-2">
          {/* BKT Mastery Meter */}
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">Mastery</span>
            <div className="flex items-center space-x-2">
              <div className="w-24 h-2.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-gold-400 transition-all duration-500"
                  style={{ width: `${Math.round(overallMastery * 100)}%` }}
                />
              </div>
              <span className="text-xs font-mono font-bold text-gold-300">{Math.round(overallMastery * 100)}%</span>
            </div>
          </div>

          {/* Score Badge */}
          <div className="bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700 flex items-center space-x-2">
            <span className="text-amber-400 text-sm">★</span>
            <span className="text-sm font-mono font-bold text-amber-300">{score}</span>
          </div>

          {/* Audio Toggle */}
          <button
            onClick={() => {
              setSoundEnabled(!soundEnabled);
              if (!soundEnabled) audioManager.play('pop');
            }}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 transition-colors"
            title={soundEnabled ? 'Mute Sound' : 'Enable Sound'}
          >
            {soundEnabled ? '🔊' : '🔇'}
          </button>
        </div>
      </header>

      {/* TAB NAVIGATION */}
      <nav className="w-full max-w-6xl flex flex-wrap gap-2 mb-4">
        {[
          { id: 'guided', label: '📖 Concept Discovery', icon: '🔍' },
          { id: 'lab_rutherford_bohr', label: '⚡ Rutherford & Bohr Lab', icon: '🎯' },
          { id: 'lab_isotopes', label: '⚖️ Isotopes & Isobars', icon: '🧪' },
          { id: 'challenges', label: '🎯 Quantum Challenges', icon: '🏆' },
          { id: 'misconceptions', label: '💡 Misconception Check', icon: '🧠' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id as any);
              if (soundEnabled) audioManager.play('tap');
            }}
            className={`px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all duration-200 flex items-center space-x-2 ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-gold-600 to-gold-600 text-white shadow-lg shadow-gold-900/30 border border-gold-400/30'
                : 'bg-slate-900/60 hover:bg-slate-800/80 text-slate-400 border border-slate-800'
            }`}
          >
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>

      {/* MAIN CONTENT AREA */}
      <main className="w-full max-w-6xl bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-2xl min-h-[580px] flex flex-col">
        {/* TAB 1: GUIDED CONCEPT DISCOVERY */}
        {activeTab === 'guided' && (
          <div className="flex flex-col space-y-6">
            {/* Mission Briefing Banner */}
            <div className="bg-gradient-to-r from-gold-950/80 via-slate-900 to-gold-950/80 border border-gold-800/50 rounded-xl p-4">
              <h2 className="text-base sm:text-lg font-bold text-gold-300 mb-1">{SCENARIO.title}</h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{SCENARIO.intro}</p>
            </div>

            {/* PREDICT-BEFORE-LEARN DISCOVERY QUESTION */}
            {!discoverySubmitted ? (
              <div className="bg-slate-900 border border-amber-500/30 rounded-xl p-5 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 px-3 py-1 bg-amber-500/20 text-amber-300 text-[10px] font-bold rounded-bl-lg uppercase tracking-wider">
                  Predictive Challenge
                </div>
                <h3 className="text-sm sm:text-base font-bold text-slate-100 mb-3 flex items-center space-x-2">
                  <span>🧠</span>
                  <span>{DISCOVERY_QUESTION.question}</span>
                </h3>

                <div className="space-y-2.5 my-4">
                  {DISCOVERY_QUESTION.options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setDiscoverySelected(idx);
                        if (soundEnabled) audioManager.play('tap');
                      }}
                      className={`w-full text-left p-3 rounded-lg text-xs sm:text-sm border transition-all ${
                        discoverySelected === idx
                          ? 'bg-gold-950/80 border-gold-400 text-gold-200'
                          : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <span className="font-bold mr-2 text-gold-400">{String.fromCharCode(65 + idx)}.</span>
                      {opt}
                    </button>
                  ))}
                </div>

                <button
                  disabled={discoverySelected === null}
                  onClick={handleDiscoverySubmit}
                  className={`px-5 py-2.5 rounded-lg font-bold text-xs sm:text-sm transition-all ${
                    discoverySelected !== null
                      ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg cursor-pointer'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  Verify Prediction
                </button>
              </div>
            ) : (
              <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-xl p-4 flex items-start space-x-3">
                <span className="text-2xl">💡</span>
                <div>
                  <h4 className="font-bold text-emerald-300 text-sm">Rutherford Scattering Discovery</h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    Rutherford described the rebound as "as incredible as if you fired a 15-inch shell at a piece of tissue paper and it came back and hit you!"
                  </p>
                </div>
              </div>
            )}

            {/* INTERACTIVE TEACHING SLIDES */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-mono text-gold-400 font-semibold uppercase tracking-wider">
                    Slide {currentSlideIndex + 1} of {TEACHING_SLIDES.length}
                  </span>
                  <div className="flex space-x-1">
                    {TEACHING_SLIDES.map((_, i) => (
                      <div
                        key={i}
                        onClick={() => setCurrentSlideIndex(i)}
                        className={`h-1.5 rounded-full cursor-pointer transition-all ${
                          i === currentSlideIndex ? 'w-6 bg-gold-400' : 'w-2 bg-slate-700'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-100 mb-1">
                  {TEACHING_SLIDES[currentSlideIndex].title}
                </h3>
                <p className="text-xs text-gold-300 font-medium mb-3">
                  {TEACHING_SLIDES[currentSlideIndex].subtitle}
                </p>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  {TEACHING_SLIDES[currentSlideIndex].content}
                </p>

                {/* VISUAL SCHEMATIC RENDERING FOR SLIDE */}
                <div className="my-4 p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col items-center justify-center min-h-[160px]">
                  {TEACHING_SLIDES[currentSlideIndex].graphicType === 'ancient_dalton' && (
                    <div className="flex items-center space-x-8">
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-700 to-amber-500 border-2 border-amber-300 shadow-lg shadow-amber-900/50 flex items-center justify-center text-xs font-bold text-amber-100">
                          Parmanu
                        </div>
                        <span className="text-[10px] text-slate-400 mt-2">Kanada (600 BCE)</span>
                      </div>
                      <span className="text-slate-500 font-bold">➔</span>
                      <div className="flex flex-col items-center">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-slate-600 to-slate-400 border-2 border-slate-300 shadow-lg flex items-center justify-center text-xs font-bold text-slate-100">
                          Solid Sphere
                        </div>
                        <span className="text-[10px] text-slate-400 mt-2">Dalton (1808)</span>
                      </div>
                    </div>
                  )}

                  {TEACHING_SLIDES[currentSlideIndex].graphicType === 'thomson_crt' && (
                    <div className="w-full flex flex-col items-center">
                      <svg className="w-full max-w-md h-28" viewBox="0 0 300 100">
                        {/* CRT Tube */}
                        <rect x="20" y="30" width="220" height="40" rx="5" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
                        <line x1="10" y1="50" x2="30" y2="50" stroke="#ef4444" strokeWidth="4" />
                        <line x1="230" y1="50" x2="250" y2="50" stroke="#3b82f6" strokeWidth="4" />
                        {/* Cathode Ray Beam */}
                        <line x1="30" y1="50" x2="230" y2="50" stroke="#22c55e" strokeWidth="3" strokeDasharray="5,3" />
                        {/* Electric Plates */}
                        <rect x="110" y="15" width="40" height="8" fill="#ef4444" rx="2" />
                        <text x="130" y="10" fill="#ef4444" fontSize="10" textAnchor="middle">+</text>
                        <rect x="110" y="77" width="40" height="8" fill="#3b82f6" rx="2" />
                        <text x="130" y="94" fill="#3b82f6" fontSize="10" textAnchor="middle">-</text>
                      </svg>
                      <span className="text-[11px] text-emerald-400 font-mono mt-1">
                        Cathode Rays deflect towards Positive Plate ➔ Proves Electrons are Negative ($e^-$)
                      </span>
                    </div>
                  )}

                  {TEACHING_SLIDES[currentSlideIndex].graphicType === 'rutherford_scattering' && (
                    <div className="flex flex-col items-center">
                      <div className="relative w-48 h-28 border border-slate-800 rounded-lg bg-slate-950 flex items-center justify-center overflow-hidden">
                        <div className="w-6 h-6 rounded-full bg-red-500 shadow-lg shadow-red-500/50 flex items-center justify-center text-[9px] font-bold text-white z-10">
                          +Ze
                        </div>
                        {/* Deflected trajectories */}
                        <svg className="absolute inset-0 w-full h-full">
                          <path d="M 10 20 L 190 20" stroke="#38bdf8" strokeWidth="2" fill="none" />
                          <path d="M 10 50 Q 80 50 150 10" stroke="#38bdf8" strokeWidth="2" fill="none" />
                          <path d="M 10 54 Q 90 54 10 90" stroke="#f59e0b" strokeWidth="2.5" fill="none" />
                          <path d="M 10 80 L 190 80" stroke="#38bdf8" strokeWidth="2" fill="none" />
                        </svg>
                      </div>
                      <span className="text-[11px] text-amber-300 font-mono mt-1">
                        1 in 20,000 Alpha particles deflected by huge angles (&gt;90°)
                      </span>
                    </div>
                  )}

                  {TEACHING_SLIDES[currentSlideIndex].graphicType === 'bohr_orbits' && (
                    <div className="flex items-center space-x-6">
                      <svg className="w-32 h-32" viewBox="0 0 120 120">
                        <circle cx="60" cy="60" r="10" fill="#ef4444" />
                        <circle cx="60" cy="60" r="25" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3,3" />
                        <circle cx="60" cy="60" r="42" fill="none" stroke="#818cf8" strokeWidth="1.5" strokeDasharray="3,3" />
                        <circle cx="60" cy="60" r="55" fill="none" stroke="#c084fc" strokeWidth="1.5" strokeDasharray="3,3" />
                        <circle cx="85" cy="60" r="3" fill="#38bdf8" />
                        <circle cx="60" cy="18" r="3" fill="#818cf8" />
                      </svg>
                      <div className="text-xs space-y-1 font-mono text-slate-300">
                        <div>K Shell (n=1): Max 2 e⁻</div>
                        <div>L Shell (n=2): Max 8 e⁻</div>
                        <div>M Shell (n=3): Max 18 e⁻</div>
                        <div>N Shell (n=4): Max 32 e⁻</div>
                      </div>
                    </div>
                  )}

                  {TEACHING_SLIDES[currentSlideIndex].graphicType === 'isotopes_isobars' && (
                    <div className="grid grid-cols-2 gap-4 w-full text-xs">
                      <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800 text-center">
                        <div className="font-bold text-gold-300 mb-1">Isotopes (Same Z)</div>
                        <div className="text-slate-200 font-mono">
                          ¹H (Protium) | ²H (Deuterium) | ³H (Tritium)
                        </div>
                      </div>
                      <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800 text-center">
                        <div className="font-bold text-purple-300 mb-1">Isobars (Same A)</div>
                        <div className="text-slate-200 font-mono">
                          ⁴⁰₁₈Ar and ⁴⁰₂₀Ca
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Key Points */}
                <div className="space-y-1.5 my-3">
                  {TEACHING_SLIDES[currentSlideIndex].keyPoints.map((pt, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-xs text-slate-300">
                      <span className="text-gold-400 font-bold">•</span>
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                <button
                  disabled={currentSlideIndex === 0}
                  onClick={() => {
                    setCurrentSlideIndex((prev) => prev - 1);
                    if (soundEnabled) audioManager.play('tap');
                  }}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
                    currentSlideIndex === 0
                      ? 'bg-slate-800 text-slate-600 cursor-not-allowed'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                  }`}
                >
                  ← Previous Concept
                </button>

                <button
                  onClick={() => {
                    if (currentSlideIndex < TEACHING_SLIDES.length - 1) {
                      setCurrentSlideIndex((prev) => prev + 1);
                      if (soundEnabled) audioManager.play('tap');
                    } else {
                      setActiveTab('lab_rutherford_bohr');
                      if (soundEnabled) audioManager.play('celebration');
                    }
                  }}
                  className="px-5 py-2 rounded-lg bg-gradient-to-r from-gold-500 to-gold-600 text-white font-bold text-xs shadow-lg hover:from-gold-400 hover:to-gold-500 transition-all"
                >
                  {currentSlideIndex < TEACHING_SLIDES.length - 1 ? 'Next Concept →' : 'Enter Rutherford & Bohr Lab 🚀'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: RUTHERFORD & BOHR INTERACTIVE SIMULATION LAB */}
        {activeTab === 'lab_rutherford_bohr' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* SIMULATION 1: RUTHERFORD ALPHA SCATTERING CANVAS */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-bold text-amber-300 flex items-center space-x-2">
                    <span>🎯</span>
                    <span>1. Rutherford Alpha Scattering Chamber</span>
                  </h3>
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-mono">
                    Coulomb Repulsion Simulation
                  </span>
                </div>

                <div className="relative w-full h-64 bg-slate-950 rounded-xl border border-slate-800 overflow-hidden mb-4">
                  <canvas ref={canvasRef} width={480} height={256} className="w-full h-full block" />
                </div>

                {/* SLIDERS FOR RUTHERFORD */}
                <div className="space-y-3 bg-slate-950 p-3 rounded-xl border border-slate-800/80">
                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-1">
                      <span>Nucleus Charge ($Z$):</span>
                      <span className="font-mono text-gold-300 font-bold">
                        {nucleusZ} ({nucleusZ === 79 ? 'Gold Au' : nucleusZ === 29 ? 'Copper Cu' : nucleusZ === 13 ? 'Aluminium Al' : 'Custom'})
                      </span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="90"
                      value={nucleusZ}
                      onChange={(e) => {
                        setNucleusZ(Number(e.target.value));
                        if (soundEnabled) audioManager.play('swoop');
                      }}
                      className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-gold-400"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-1">
                      <span>Alpha Beam Kinetic Energy:</span>
                      <span className="font-mono text-amber-300 font-bold">{alphaEnergy} MeV</span>
                    </div>
                    <input
                      type="range"
                      min="20"
                      max="100"
                      value={alphaEnergy}
                      onChange={(e) => {
                        setAlphaEnergy(Number(e.target.value));
                        if (soundEnabled) audioManager.play('swoop');
                      }}
                      className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-1">
                      <span>Impact Parameter Offset ($b$):</span>
                      <span className="font-mono text-purple-300 font-bold">{impactParameter} pm</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="40"
                      value={impactParameter}
                      onChange={(e) => {
                        setImpactParameter(Number(e.target.value));
                        if (soundEnabled) audioManager.play('swoop');
                      }}
                      className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-400"
                    />
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 mt-3 leading-relaxed italic">
                Observe how alpha particles closest to the nucleus experience massive force F ∝ Z/r² and bend backward!
              </p>
            </div>

            {/* SIMULATION 2: BOHR ATOMIC STRUCTURE & SHELL BUILDER */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-bold text-gold-300 flex items-center space-x-2">
                    <span>⚛️</span>
                    <span>2. Bohr Quantum Shell Sandbox</span>
                  </h3>
                  <span className="text-[10px] bg-gold-500/20 text-gold-300 px-2 py-0.5 rounded font-mono">
                    Elements 1 to 20
                  </span>
                </div>

                {/* Element Picker Bar */}
                <div className="flex items-center space-x-2 overflow-x-auto pb-2 mb-3 scrollbar-thin">
                  {ELEMENT_DATABASE.map((elem) => (
                    <button
                      key={elem.z}
                      onClick={() => {
                        setSelectedZ(elem.z);
                        if (soundEnabled) audioManager.play('pop');
                      }}
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all shrink-0 ${
                        selectedZ === elem.z
                          ? 'bg-gold-500 text-slate-950 shadow-md shadow-gold-500/40'
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                      }`}
                    >
                      {elem.symbol} <span className="text-[9px] opacity-75">({elem.z})</span>
                    </button>
                  ))}
                </div>

                {/* Bohr SVG Render */}
                <div className="relative w-full h-64 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-center overflow-hidden">
                  <svg className="w-full h-full" viewBox="-120 -120 240 240">
                    {/* Shell Orbits */}
                    {currentElemData.shells.map((count, shellIdx) => {
                      const radius = 30 + shellIdx * 25;
                      const shellNames = ['K', 'L', 'M', 'N'];
                      return (
                        <g key={shellIdx}>
                          <circle cx="0" cy="0" r={radius} fill="none" stroke="#334155" strokeWidth="1.5" strokeDasharray="4,4" />
                          <text x={radius + 4} y="-4" fill="#64748b" fontSize="8" fontFamily="monospace">
                            {shellNames[shellIdx]} (n={shellIdx + 1})
                          </text>
                          {/* Revolving Electrons */}
                          {Array.from({ length: count }).map((_, eIdx) => {
                            const angle = (2 * Math.PI * eIdx) / count;
                            const ex = radius * Math.cos(angle);
                            const ey = radius * Math.sin(angle);
                            return (
                              <g key={eIdx}>
                                <circle cx={ex} cy={ey} r="5" fill="#38bdf8" />
                                <circle cx={ex} cy={ey} r="2" fill="#ffffff" />
                              </g>
                            );
                          })}
                        </g>
                      );
                    })}

                    {/* Central Nucleus */}
                    <circle cx="0" cy="0" r="18" fill="#ef4444" />
                    <text x="0" y="-2" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">
                      {currentElemData.protons}p⁺
                    </text>
                    <text x="0" y="8" fill="#fef08a" fontSize="8" textAnchor="middle">
                      {currentElemData.neutrons}n⁰
                    </text>

                    {/* Photon Emission Wave Effect */}
                    {photonEmitting && (
                      <motion.path
                        d="M 30 0 Q 50 -20 70 0 T 110 0"
                        stroke="#f59e0b"
                        strokeWidth="3"
                        fill="none"
                        initial={{ opacity: 0, pathLength: 0 }}
                        animate={{ opacity: [0, 1, 0], pathLength: 1 }}
                        transition={{ duration: 1.5 }}
                      />
                    )}
                  </svg>
                </div>

                {/* Readout stats */}
                <div className="grid grid-cols-2 gap-2 my-3 text-xs">
                  <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
                    <span className="text-slate-400 text-[10px]">Config: </span>
                    <span className="font-mono text-gold-300 font-bold">{currentElemData.shells.join(', ')}</span>
                  </div>
                  <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
                    <span className="text-slate-400 text-[10px]">Valency: </span>
                    <span className="font-mono text-emerald-300 font-bold">{currentElemData.valency}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleTriggerPhoton}
                className="w-full py-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-bold text-xs rounded-lg shadow-md transition-all flex items-center justify-center space-x-2"
              >
                <span>✨ Trigger Quantum Orbital Photon Emission</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: ISOTOPES & ISOBARS LAB */}
        {activeTab === 'lab_isotopes' && (
          <div className="flex flex-col space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
              <h3 className="text-base font-bold text-gold-300 mb-2 flex items-center space-x-2">
                <span>🧪</span>
                <span>Fractional Average Atomic Mass Calculator</span>
              </h3>
              <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                Most chemical elements exist as isotopic mixtures. Calculate how weighted natural abundance percentages produce fractional atomic masses like Chlorine (35.5 u).
              </p>

              {/* Chlorine Abundance Calculator Sandbox */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Isotope Distribution</h4>
                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-1">
                      <span>³⁵₁₇Cl Abundance:</span>
                      <span className="font-mono text-gold-300 font-bold">75%</span>
                    </div>
                    <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden flex">
                      <div className="h-full bg-gold-500" style={{ width: '75%' }} />
                      <div className="h-full bg-purple-500" style={{ width: '25%' }} />
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                      <span className="text-gold-400 font-semibold">35 u (75%)</span>
                      <span className="text-purple-400 font-semibold">37 u (25%)</span>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs text-slate-300 font-mono space-y-1">
                    <div>Mass = (35 × 75/100) + (37 × 25/100)</div>
                    <div>Mass = 26.25 + 9.25</div>
                    <div className="text-emerald-400 font-bold text-sm">Average Mass = 35.5 u</div>
                  </div>
                </div>

                <div className="flex flex-col justify-between space-y-3">
                  <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Critical Applications of Radioisotopes</h4>
                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center space-x-3">
                      <span className="text-lg">⚛️</span>
                      <div>
                        <div className="font-bold text-amber-300">Uranium-235 (²³⁵U)</div>
                        <div className="text-[11px] text-slate-400">Nuclear reactor fuel & energy production</div>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center space-x-3">
                      <span className="text-lg">🩺</span>
                      <div>
                        <div className="font-bold text-gold-300">Cobalt-60 (⁶⁰Co)</div>
                        <div className="text-[11px] text-slate-400">Gamma radiotherapy for cancer treatment</div>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center space-x-3">
                      <span className="text-lg">💊</span>
                      <div>
                        <div className="font-bold text-emerald-300">Iodine-131 (¹³¹I)</div>
                        <div className="text-[11px] text-slate-400">Medical diagnostic and treatment of Goitre</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: QUANTUM PRACTICE CHALLENGES */}
        {activeTab === 'challenges' && (
          <div className="flex flex-col space-y-6">
            {/* Progress Bar for Challenges */}
            <div className="flex items-center justify-between bg-slate-900 p-3 rounded-xl border border-slate-800">
              <span className="text-xs font-mono text-gold-300 font-bold">
                Challenge {currentChallengeIdx + 1} of {CHALLENGES.length}
              </span>
              <div className="flex space-x-1.5">
                {CHALLENGES.map((ch, idx) => (
                  <div
                    key={ch.id}
                    className={`w-3 h-3 rounded-full transition-all ${
                      completedChallenges[ch.id]
                        ? 'bg-emerald-400 shadow-sm shadow-emerald-400'
                        : idx === currentChallengeIdx
                        ? 'bg-gold-400 ring-2 ring-gold-300/50'
                        : 'bg-slate-800'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Current Challenge Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col justify-between min-h-[380px]">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 uppercase tracking-wider">
                    Difficulty: {CHALLENGES[currentChallengeIdx].difficulty}
                  </span>
                  <span className="text-xs text-amber-400 font-mono font-bold">+100 PTS</span>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-slate-100 mb-4 leading-relaxed">
                  {CHALLENGES[currentChallengeIdx].question}
                </h3>

                {/* MCQ Answer Options */}
                {CHALLENGES[currentChallengeIdx].type === 'mcq' && (
                  <div className="space-y-2.5 my-4">
                    {CHALLENGES[currentChallengeIdx].options?.map((opt, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setSelectedMcqOption(idx);
                          if (soundEnabled) audioManager.play('tap');
                        }}
                        className={`w-full text-left p-3 rounded-xl text-xs sm:text-sm border transition-all ${
                          selectedMcqOption === idx
                            ? 'bg-gold-950/80 border-gold-400 text-gold-200 shadow-md'
                            : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        <span className="font-bold mr-2 text-gold-400">{String.fromCharCode(65 + idx)}.</span>
                        {opt}
                      </button>
                    ))}
                  </div>
                )}

                {/* Numeric Input */}
                {CHALLENGES[currentChallengeIdx].type === 'numeric' && (
                  <div className="my-6 max-w-xs">
                    <label className="block text-xs text-slate-400 mb-2">Enter numerical value:</label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        step="any"
                        value={numericAnswer}
                        onChange={(e) => setNumericAnswer(e.target.value)}
                        placeholder="e.g. 14"
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-100 font-mono text-sm focus:outline-none focus:border-gold-400"
                      />
                      {CHALLENGES[currentChallengeIdx].unit && (
                        <span className="text-xs font-mono text-gold-300 font-bold">
                          {CHALLENGES[currentChallengeIdx].unit}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Feedback Box */}
                {challengeFeedback && (
                  <div
                    className={`p-4 rounded-xl border my-4 text-xs sm:text-sm leading-relaxed ${
                      challengeFeedback.isCorrect
                        ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-200'
                        : 'bg-rose-950/60 border-rose-500/50 text-rose-200'
                    }`}
                  >
                    {challengeFeedback.text}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                <button
                  onClick={() => {
                    setHintText(CHALLENGES[currentChallengeIdx].hints[0]);
                    setShowHint(true);
                    if (soundEnabled) audioManager.play('hint');
                  }}
                  className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center space-x-1"
                >
                  <span>💡 Need a hint?</span>
                </button>

                {!challengeFeedback ? (
                  <button
                    onClick={handleChallengeSubmit}
                    disabled={
                      CHALLENGES[currentChallengeIdx].type === 'mcq'
                        ? selectedMcqOption === null
                        : numericAnswer.trim() === ''
                    }
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-white font-bold text-xs sm:text-sm shadow-lg hover:from-gold-400 hover:to-gold-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Submit Answer
                  </button>
                ) : (
                  <button
                    onClick={handleNextChallenge}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-xs sm:text-sm shadow-lg hover:from-emerald-400 hover:to-teal-500 transition-all"
                  >
                    Next Challenge →
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: MISCONCEPTIONS DIAGNOSTIC CHECKLIST */}
        {activeTab === 'misconceptions' && (
          <div className="flex flex-col space-y-4">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <h3 className="text-base font-bold text-gold-300 mb-1">Common Subatomic Misconceptions</h3>
              <p className="text-xs text-slate-400 mb-4">
                Review these essential physics distinctions to prevent exam traps!
              </p>

              <div className="space-y-3">
                {MISCONCEPTIONS_CHECKLIST.map((item, idx) => (
                  <div key={item.id} className="p-3.5 bg-slate-950 rounded-xl border border-slate-800/80 space-y-1.5">
                    <div className="flex items-center space-x-2 text-xs font-bold text-rose-400">
                      <span>❌ Common Fallacy:</span>
                      <span>{item.misconception}</span>
                    </div>
                    <div className="flex items-start space-x-2 text-xs text-emerald-300 pl-4 border-l-2 border-emerald-500/50">
                      <span className="font-bold">✓ Physics Reality:</span>
                      <span className="text-slate-300">{item.correction}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="w-full max-w-6xl mt-4 py-3 text-center text-xs text-slate-500 border-t border-slate-800/60">
        NCERT Class 9 Physics • Chapter 4: Structure of the Atom • Interactive Physics Simulation Payload
      </footer>
    </div>
  );
};

export default C9_PhysicsJourneyInsideAtomCBSESim;