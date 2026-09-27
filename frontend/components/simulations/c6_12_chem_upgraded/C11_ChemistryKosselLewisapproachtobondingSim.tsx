'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import type { SoundEffect } from '../../../lib/sim-engine/types';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, masteryProb } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ==========================================
// ALL NODE IDS
// ==========================================
const ALL_NODE_IDS = [
  'c11_chem_031', // Kossel-Lewis approach & Kössel's postulations
  'c11_chem_032', // Lewis symbols / Lewis dot structures
  'c11_chem_033', // Octet rule & Octet theory of chemical bonding
  'c11_chem_034', // Ionic / Electrovalent bonding & Lattice Enthalpy
  'c11_chem_035', // Covalent bonding & Lewis dot representations of molecules
  'c11_chem_036', // Formal Charge calculations & determination
  'c11_chem_037', // Limitations of Octet Rule (Incomplete, Odd-electron, Expanded)
  'c11_chem_038', // Resonance structures & Resonance hybrid concept
  'c11_chem_039', // Polarity of bonds, Electronegativity differences, Dipole Moment
  'c11_chem_040', // Fajan's Rules (Polarisation, Polarising Power, Polarisability)
];

// ==========================================
// SCENARIO & LAB SETUP
// ==========================================
const SCENARIO = {
  title: 'Quantum & Classical Chemical Bonding Workbench',
  intro: 'Welcome to the CISCE Advanced Chemical Bonding Research Facility. Here, you will explore how atoms interact, transfer, or share electrons to attain stability, calculate formal charges, analyze octet exceptions, evaluate resonance hybrids, and master Fajan\'s rules of covalent character in ionic compounds.',
  context: 'You will step into the shoes of W. Kossel and G.N. Lewis as you engineer ionic lattices, construct Lewis electron-dot structures, calculate molecular dipoles, and predict polarization effects using state-of-the-art interactive lab tools.',
};

const DISCOVERY_QUESTION = {
  question: 'Why does Carbon Dioxide (CO₂) have zero net dipole moment even though both of its carbon-oxygen bonds are strongly polar?',
  options: [
    'The carbon-oxygen bonds in CO₂ are actually non-polar due to equal electronegativity.',
    'CO₂ has a linear symmetric geometry, causing equal and opposite bond dipoles to cancel out vectorially.',
    'Carbon shares four pairs of electrons, which absorbs all electrical charge density.',
    'The lone pairs on both oxygen atoms rotate continuously, neutralizing the electric field.',
  ],
  correctIndex: 1,
  hintAfter: 'Dipole moment is a vector quantity! Geometry dictates whether individual bond dipoles reinforce or cancel each other out.',
};

// ==========================================
// EXPLORATION STEPS (MANDATORY)
// ==========================================
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Kossel Ionic Lattice & Born-Haber Energetics',
    instruction: 'Adjust cation and anion radii and charges to observe electron transfer and lattice enthalpy changes in ionic bonding.',
    interactionType: 'ionic-lattice-sim',
    nodeId: 'c11_chem_031',
  },
  {
    title: 'Lab 2: Lewis Dot Builder & Formal Charge Inspector',
    instruction: 'Select elements, pair valence electrons into bonds or lone pairs, and verify calculated formal charges ($FC = V - L - \\frac{1}{2}B$).',
    interactionType: 'lewis-dot-builder',
    nodeId: 'c11_chem_035',
  },
  {
    title: 'Lab 3: Octet Exception & Hypervalent Molecule Analyzer',
    instruction: 'Examine incomplete octets ($BF_3$), odd-electron species ($NO$), and expanded octets ($SF_6, PCl_5$).',
    interactionType: 'octet-exceptions',
    nodeId: 'c11_chem_037',
  },
  {
    title: 'Lab 4: Resonance Hybrid & Bond Order Workbench',
    instruction: 'Toggle between canonical forms of Ozone ($O_3$) and Carbonate ($CO_3^{2-}$) to see how electron delocalization yields fractional bond orders.',
    interactionType: 'resonance-hybrid',
    nodeId: 'c11_chem_038',
  },
  {
    title: 'Lab 5: Bond Dipole Vectors & Fajan Polarization',
    instruction: 'Vary electronegativity differences and polarising power to see bond vector cancellation and partial covalent character in ionic bonds.',
    interactionType: 'dipole-fajans',
    nodeId: 'c11_chem_040',
  },
];

// ==========================================
// PREDICTION QUESTIONS (MANDATORY)
// ==========================================
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: Between NF₃ and NH₃, which molecule will exhibit a higher net dipole moment, and why?',
    options: [
      'NF₃ has a higher dipole moment because Fluorine is the most electronegative element.',
      'NH₃ has a higher dipole moment because orbital dipoles of N-H bonds and the lone pair reinforce each other.',
      'Both have identical dipole moments because both are trigonal pyramidal with one lone pair.',
      'NF₃ has zero dipole moment due to symmetric cancelation.',
    ],
    correctIndex: 1,
    verifyInstruction: 'Go to Lab 5 and compare the dipole vectors of NH₃ and NF₃.',
    nodeId: 'c11_chem_039',
  },
  {
    question: 'Predict: Which halide will exhibit the HIGHEST covalent character according to Fajan\'s Rules?',
    options: [
      'NaCl',
      'MgCl₂',
      'AlCl₃',
      'SiCl₄',
    ],
    correctIndex: 3,
    verifyInstruction: 'Go to Lab 5 and increase cation charge while decreasing cation size to see polarization increase.',
    nodeId: 'c11_chem_040',
  },
];

// ==========================================
// OBSERVATION QUESTIONS (MANDATORY)
// ==========================================
const OBSERVATION_QUESTIONS: { question: string; options: string[]; observableOptions?: string[]; correctIndex: number; nodeId: string }[] = [
  {
    question: 'What do you notice about the oxygen-oxygen bond lengths in the resonance hybrid of Ozone (O₃)?',
    options: [
      'One O-O bond is strictly single (148 pm) and the other is strictly double (121 pm).',
      'Both O-O bonds are equal in length (128 pm), intermediate between single and double bonds.',
      'The bond lengths fluctuate rapidly back and forth between 121 pm and 148 pm.',
      'The central oxygen forms a triple bond with one oxygen atom.',
    ],
    correctIndex: 1,
    nodeId: 'c11_chem_038',
  },
  {
    question: 'What happens to the electron cloud of an anion when approached by a small, highly charged cation?',
    options: [
      'The electron cloud expands symmetrically away from the cation.',
      'The electron cloud becomes distorted and pulled towards the cation, introducing covalent character.',
      'The electron cloud splits into two separate lone pairs.',
      'No distortion occurs because ionic bonds are completely rigid.',
    ],
    correctIndex: 1,
    nodeId: 'c11_chem_040',
  },
];

// ==========================================
// REAL WORLD ACTIVITY (MANDATORY)
// ==========================================
const REAL_WORLD_ACTIVITY = {
  title: 'Industrial Synthesis & Molecular Engineering of Sulfur Hexafluoride (SF₆)',
  description: 'SF₆ is widely used as a gaseous dielectric insulator in high-voltage circuit breakers and transformers due to its exceptional chemical inertness and high dielectric strength. Engineers must understand its expanded octet, hypervalent S-F bonding, and non-polar nature to handle it safely.',
  steps: [
    'Analyze Sulfur (Group 16): Valence configuration [Ne] 3s² 3p⁴ 3d⁰. Sulfur promotes electrons into vacant 3d orbitals to form 6 equivalent covalent bonds.',
    'Construct the Lewis Structure: Sulfur serves as the central atom bonded to 6 Fluorine atoms, possessing 12 electrons in its outer shell (Expanded Octet).',
    'Calculate Formal Charge: FC(S) = 6 - 0 - 6 = 0; FC(F) = 7 - 6 - 1 = 0. All formal charges are zero, explaining high thermal stability.',
    'Evaluate Geometry & Dipole Moment: Octahedral arrangement (90° bond angles) ensures perfect 3D cancellation of polar S-F bonds, yielding net dipole μ = 0 D.',
  ],
};

// ==========================================
// MISCONCEPTIONS (PRESERVED & EXPANDED)
// ==========================================
const MISCONCEPTIONS = [
  {
    title: 'Octet Rule is Universally Obeyed by All Compounds',
    misconception: 'Students believe that every stable chemical compound must strictly have eight electrons in the valence shell of all constituent atoms.',
    correction: 'The octet rule is a useful rule of thumb, but it has several major exceptions in stable molecules. Compounds can have incomplete octets like BF₃, expanded octets like SF₆ and PCl₅, or odd numbers of valence electrons like NO. Molecular stability is determined by total energy minimization rather than a rigid requirement of eight electrons.',
    nodeId: 'c11_chem_037',
  },
  {
    title: 'Formal Charge Represents Actual Physical Charge on an Atom',
    misconception: 'Students assume that the formal charge calculated for an atom reflects its real partial charge or net electrical charge in a molecule.',
    correction: 'Formal charge is merely a theoretical bookkeeping tool that assumes equal sharing of bonding electrons regardless of electronegativity differences. It does not represent actual electron density or physical charge distribution on an atom in a real molecule. Instead, it helps chemists evaluate the relative stability of different plausible Lewis structures.',
    nodeId: 'c11_chem_036',
  },
  {
    title: 'Lewis Structures Depict the True 3D Molecular Geometry',
    misconception: 'Students often believe that the two-dimensional arrangement of electron pairs in a Lewis dot structure directly shows the real 3D shape of a molecule.',
    correction: 'Lewis dot structures are designed only to show atom connectivity and the distribution of valence electrons. They contain no intrinsic three-dimensional geometric information such as bond angles or spatial orientation. Predictions of actual molecular shapes require VSEPR theory or orbital hybridization models.',
    nodeId: 'c11_chem_035',
  },
  {
    title: 'Kossel and Lewis Proposed Identical Mechanisms for Bonding',
    misconception: 'Students frequently blend Kossel\'s and Lewis\'s concepts together, assuming both scientists described bonding solely through the sharing of electron pairs.',
    correction: 'Lewis proposed the concept of covalent bonding through the mutual sharing of valence electron pairs between atoms. In contrast, Kossel accounted for ionic (electrovalent) bonding based on the complete transfer of electrons between highly electropositive and electronegative elements. Together, their distinct concepts provided a unified framework for chemical bonding based on noble gas electron configurations.',
    nodeId: 'c11_chem_031',
  },
  {
    title: 'Chemical Bonds Are Strictly Purely Ionic or Purely Covalent',
    misconception: 'Students view chemical bonds as mutually exclusive categories, classifying a bond as either completely 100% ionic or 100% covalent.',
    correction: 'Chemical bonding exists on a continuous spectrum rather than in rigid, absolute categories. Covalent bonds between different atoms possess partial ionic character due to electronegativity differences, resulting in dipole moments. Conversely, ionic bonds display partial covalent character due to polarization effects described by Fajan\'s rules.',
    nodeId: 'c11_chem_040',
  },
  {
    title: 'Resonance Hybrids Rapidly Flip Between Canonical Structures',
    misconception: 'Students imagine that a resonance hybrid flips back and forth in real time between canonical resonance forms like a oscillating pendulum.',
    correction: 'A molecule existing as a resonance hybrid has a single, static electronic structure that is a weighted average of all contributing canonical Lewis structures. The individual canonical forms do not exist in real time; they are merely theoretical pencil-and-paper constructs used to represent delocalized electron density.',
    nodeId: 'c11_chem_038',
  },
];

// ==========================================
// INTERFACES & TYPES
// ==========================================
interface Challenge {
  id: string;
  nodeId: string;
  type: 'multiple-choice' | 'numeric' | 'drag-sort' | 'classification';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: string;
  question: string;
  options?: string[];
  correctIndex?: number;
  correctAnswer?: number;
  tolerance?: number;
  unit?: string;
  categories?: string[];
  items?: { text: string; category: string }[];
  sortItems?: string[];
  correctOrder?: number[];
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
}

// ==========================================
// 22+ COMPREHENSIVE CHALLENGES (ISC LEVEL)
// ==========================================
const CHALLENGES: Challenge[] = [
  // --- FOUNDATION (8 Challenges) ---
  {
    id: 'c1',
    nodeId: 'c11_chem_031',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall & Understanding',
    question: 'According to Walther Kössel\'s postulations on electrovalent bonding, which group of elements is most electropositive and tends to lose electrons to attain noble gas configurations?',
    options: [
      'Halogens (Group 17)',
      'Alkali metals (Group 1)',
      'Chalcogens (Group 16)',
      'Noble gases (Group 18)',
    ],
    correctIndex: 1,
    explanation: 'Alkali metals (Group 1) have low ionisation enthalpy and readily lose one electron to form stable unipositive cations with a noble gas electron configuration.',
    hints: [
      'Think about elements on the extreme left of the periodic table.',
      'These metals readily form M⁺ cations.',
      'Group 1 elements like Sodium and Potassium belong to this category.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'c2',
    nodeId: 'c11_chem_032',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall & Symbolism',
    question: 'What is the correct number of Lewis dots representing the valence electrons of a neutral Nitrogen atom (Atomic number Z = 7)?',
    options: ['3 dots', '5 dots', '7 dots', '2 dots'],
    correctIndex: 1,
    explanation: 'Nitrogen has electronic configuration 1s² 2s² 2p³. Its valence shell (n=2) contains 2 + 3 = 5 electrons, represented as 5 Lewis dots around the symbol N.',
    hints: [
      'Count electrons in the outermost quantum shell (n=2).',
      'Electronic configuration is 2, 5.',
      'Valence electrons = total electrons - core electrons.',
    ],
  },
  {
    id: 'c3',
    nodeId: 'c11_chem_033',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Conceptual Understanding',
    question: 'What is the fundamental driving force for chemical bonding according to the Lewis-Octet Theory?',
    options: [
      'To maximize total kinetic energy of constituent atoms',
      'To attain a stable outer shell octet (8 valence electrons) resembling noble gases',
      'To convert all potential energy into electrical current',
      'To expand atomic radii as much as possible',
    ],
    correctIndex: 1,
    explanation: 'Atoms bond by losing, gaining, or sharing electrons to complete their valence shell octet, achieving minimum potential energy similar to inert noble gases.',
    hints: [
      'Look for noble gas electronic stability.',
      'Octet refers to the magic number eight.',
      'Lowering of potential energy occurs when valence shell is filled.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'c4',
    nodeId: 'c11_chem_034',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Understanding & Factors',
    question: 'Which combination of energetics MOST favors the rapid formation of a stable ionic compound between a metal M and non-metal X?',
    options: [
      'High Ionisation Enthalpy of M, Low Electron Gain Enthalpy of X, Low Lattice Enthalpy',
      'Low Ionisation Enthalpy of M, High Negative Electron Gain Enthalpy of X, High Lattice Enthalpy',
      'High Ionisation Enthalpy of M, High Positive Electron Gain Enthalpy of X, Low Lattice Enthalpy',
      'Low Ionisation Enthalpy of M, Zero Electron Gain Enthalpy of X, Zero Lattice Enthalpy',
    ],
    correctIndex: 1,
    explanation: 'Low ionisation enthalpy makes cation formation easy, high negative electron gain enthalpy releases energy upon anion formation, and high lattice enthalpy stabilizes the crystal lattice.',
    hints: [
      'Low energy cost to remove electron from metal is preferred.',
      'Releasing energy during electron addition and lattice formation stabilizes the ionic crystal.',
      'Think: Low IE + High negative ΔegH + High ΔlatticeH.',
    ],
  },
  {
    id: 'c5',
    nodeId: 'c11_chem_035',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Lewis Structures',
    question: 'How many shared pairs of electrons (covalent bonds) exist between the two Nitrogen atoms in a Nitrogen molecule (N₂)?',
    options: ['1 shared pair (Single bond)', '2 shared pairs (Double bond)', '3 shared pairs (Triple bond)', '4 shared pairs (Quadruple bond)'],
    correctIndex: 2,
    explanation: 'Each Nitrogen atom needs 3 electrons to complete its octet. They share 3 pairs of electrons, forming a strong triple bond (:N≡N:).',
    hints: [
      'Each N atom has 5 valence electrons and needs 3 more.',
      '5 + 3 = 8 for each atom.',
      'Three pairs = 6 shared electrons total.',
    ],
  },
  {
    id: 'c6',
    nodeId: 'c11_chem_037',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Classification & Exceptions',
    question: 'Which of the following stable molecules is a classic example of an INCOMPLETE OCTET central atom?',
    options: ['SF₆', 'PCl₅', 'BF₃', 'CH₄'],
    correctIndex: 2,
    explanation: 'In BF₃, the central Boron atom is surrounded by only 6 valence electrons (3 single covalent bonds with F), forming an incomplete octet (electron-deficient molecule).',
    hints: [
      'Boron belongs to Group 13 with 3 valence electrons.',
      '3 single bonds give 3 × 2 = 6 valence electrons.',
      '6 electrons is less than 8 electrons.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'c7',
    nodeId: 'c11_chem_039',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Units & Definitions',
    question: 'What is the standard SI unit of Dipole Moment, and what is its conversion relation with Debye (D)?',
    options: [
      'Coulomb-meter (C m); 1 D = 3.33564 × 10⁻³⁰ C m',
      'Joule-mole (J mol⁻¹); 1 D = 1.602 × 10⁻¹⁹ J mol⁻¹',
      'Volt-meter (V m); 1 D = 8.854 × 10⁻¹² V m',
      'Newton-meter (N m); 1 D = 1.0 × 10⁻¹⁰ N m',
    ],
    correctIndex: 0,
    explanation: 'Dipole moment μ = electric charge (q) × distance (r). SI unit is Coulomb-meter (C m). 1 Debye (D) = 3.33564 × 10⁻³⁰ C m.',
    hints: [
      'Charge is in Coulombs, distance is in meters.',
      '1 D is approximately 3.33 × 10⁻³⁰ C m.',
      'Product of charge and separation vector.',
    ],
  },
  {
    id: 'c8',
    nodeId: 'c11_chem_040',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Fajan\'s Rules',
    question: 'According to Fajan\'s Rules, which cation property MOST increases its polarising power on an adjacent anion?',
    options: [
      'Large ionic radius and low positive charge',
      'Small ionic radius and high positive charge',
      'Large ionic radius and zero electrical charge',
      'Equal radius to noble gas atoms',
    ],
    correctIndex: 1,
    explanation: 'Polarising power (charge density = charge / radius) increases when a cation is small and carries a high positive charge density.',
    hints: [
      'Think of high electrostatic pull concentration.',
      'Smaller size concentrates the positive charge.',
      'High charge density pulls anion electron cloud strongly.',
    ],
    misconceptionIndex: 4,
  },

  // --- STANDARD (9 Challenges) ---
  {
    id: 'c9',
    nodeId: 'c11_chem_036',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Formal Charge Calculation',
    question: 'Calculate the formal charge on the central Oxygen atom in Ozone (O₃). Structure: Terminal O(1) with 2 lone pairs double-bonded to Central O(2) with 1 lone pair single-bonded to Terminal O(3) with 3 lone pairs.',
    correctAnswer: 1,
    tolerance: 0,
    unit: '',
    explanation: 'Central Oxygen O(2) has 6 valence electrons, 1 lone pair (2 non-bonding electrons L=2), and 3 shared pairs (6 bonding electrons B=6). Formal Charge = V - L - B/2 = 6 - 2 - (6/2) = +1.',
    hints: [
      'Formula: FC = Valence electrons - Non-bonding electrons - (Bonding electrons / 2)',
      'Valence electrons of Oxygen V = 6.',
      'Central oxygen has 1 lone pair (2 e⁻) and 3 bonds (6 shared e⁻): FC = 6 - 2 - 3 = +1.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'c10',
    nodeId: 'c11_chem_036',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Formal Charge Calculation',
    question: 'Calculate the formal charge on the Nitrogen atom in the ammonium cation (NH₄⁺).',
    correctAnswer: 1,
    tolerance: 0,
    unit: '',
    explanation: 'Nitrogen has V = 5 valence electrons. In NH₄⁺, Nitrogen has 0 lone pairs (L=0) and 4 single bonds (B=8). FC = 5 - 0 - (8/2) = +1.',
    hints: [
      'Valence electrons of N = 5.',
      'In NH₄⁺, N has 4 single bonds and 0 lone pairs.',
      'FC = 5 - 0 - 4 = +1.',
    ],
  },
  {
    id: 'c11',
    nodeId: 'c11_chem_037',
    type: 'classification',
    difficulty: 'standard',
    competencyLevel: 'Octet Rule Exceptions Categorization',
    question: 'Classify each given chemical species into its correct Octet Rule Exception category:',
    categories: ['Incomplete Octet', 'Odd-Electron Species', 'Expanded Octet'],
    items: [
      { text: 'BF₃', category: 'Incomplete Octet' },
      { text: 'NO₂', category: 'Odd-Electron Species' },
      { text: 'SF₆', category: 'Expanded Octet' },
      { text: 'PCl₅', category: 'Expanded Octet' },
      { text: 'BeCl₂', category: 'Incomplete Octet' },
      { text: 'NO', category: 'Odd-Electron Species' },
    ],
    explanation: 'BF₃ and BeCl₂ have fewer than 8 valence electrons (6 and 4 respectively). NO₂ and NO have odd numbers of total valence electrons (23 and 11). SF₆ and PCl₅ have 12 and 10 valence electrons around central atoms.',
    hints: [
      'BF₃ has 6 valence e⁻ on B.',
      'NO has 11 total valence e⁻ (5+6).',
      'SF₆ has 6 bonds = 12 valence e⁻.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'c12',
    nodeId: 'c11_chem_037',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Odd-Electron Molecules',
    question: 'Why are odd-electron molecules like Nitric Oxide (NO) and Nitrogen Dioxide (NO₂) highly reactive and paramagnetic?',
    options: [
      'They contain paired electrons in all orbitals.',
      'They possess an unpaired valence electron, making them unstable radicals prone to dimerization.',
      'Their bond angles are strictly 180° causing strong tension.',
      'They undergo instantaneous radioactive decay.',
    ],
    correctIndex: 1,
    explanation: 'Molecules with an odd total number of valence electrons (e.g. NO has 11, NO₂ has 23) cannot pair all electrons, leaving an unpaired radical electron that imparts paramagnetism and high reactivity.',
    hints: [
      'Count total valence electrons: N(5) + O(6) = 11.',
      'Unpaired electron causes magnetic attraction.',
      'They tend to dimerize (e.g., 2 NO₂ → N₂O₄) to pair up electrons.',
    ],
  },
  {
    id: 'c13',
    nodeId: 'c11_chem_038',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Resonance Hybrids',
    question: 'Experimental measurements show that both oxygen-oxygen bonds in Ozone (O₃) have an identical length of 128 pm. How does resonance theory explain this observation?',
    options: [
      'Ozone undergoes rapid single and double bond interconversion back and forth.',
      'The actual molecule is a resonance hybrid with delocalized π electrons and identical bond orders of 1.5.',
      'The oxygen atoms are bonded purely by ionic electrostatic attraction.',
      'One oxygen atom is removed leaving a symmetric O₂ molecule.',
    ],
    correctIndex: 1,
    explanation: 'Ozone is a single resonance hybrid blending two canonical forms. The π electron density is evenly distributed over both O-O bonds, giving equivalent bond orders of 1.5 and equal length 128 pm (between O-O single bond 148 pm and O=O double bond 121 pm).',
    hints: [
      'Average of single (1.0) and double (2.0) bond is (1 + 2)/2 = 1.5.',
      'Canonical forms are fictitious; the hybrid is static and intermediate.',
      'Delocalized π electrons spread over all three oxygen nuclei.',
    ],
    misconceptionIndex: 5,
  },
  {
    id: 'c14',
    nodeId: 'c11_chem_038',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Bond Order in Resonance Species',
    question: 'Calculate the Carbon-Oxygen bond order in the Carbonate anion (CO₃²⁻). (Total bonds divided by total resonating positions)',
    correctAnswer: 1.33,
    tolerance: 0.02,
    unit: '',
    explanation: 'Carbonate has 3 equivalent canonical resonance structures. Total number of C-O bonds across the 3 positions in any single structure is 4 (one double bond + two single bonds). Bond order = 4 bonds / 3 locations = 1.33.',
    hints: [
      'Sum of bond orders = 1 + 1 + 2 = 4 bonds.',
      'Number of canonical resonance sites = 3.',
      'Bond order = 4 / 3 ≈ 1.33.',
    ],
  },
  {
    id: 'c15',
    nodeId: 'c11_chem_039',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Vector Dipole Moment Comparison',
    question: 'Why is the net dipole moment of Ammonia (NH₃, μ = 1.47 D) significantly HIGHER than Nitrogen Trifluoride (NF₃, μ = 0.23 D), despite Fluorine being more electronegative than Hydrogen?',
    options: [
      'In NH₃, N-H bond dipoles oppose the lone pair dipole, whereas in NF₃ they reinforce it.',
      'In NH₃, N-H bond dipoles and the lone pair dipole act in the SAME general direction, whereas in NF₃ the N-F bond dipoles oppose the lone pair dipole.',
      'NH₃ is planar whereas NF₃ is tetrahedral.',
      'Fluorine atoms absorb the lone pair electron density completely.',
    ],
    correctIndex: 1,
    explanation: 'In NH₃, Nitrogen is more electronegative than H, so N-H dipoles point toward N (same direction as lone pair). In NF₃, F is more electronegative than N, so N-F dipoles point away from N, partially cancelling the lone pair dipole.',
    hints: [
      'Draw vector arrows for N-H vs N-F bonds.',
      'In NH₃: arrows point UP toward N and lone pair.',
      'In NF₃: arrows point DOWN toward F, opposing lone pair pointing UP.',
    ],
  },
  {
    id: 'c16',
    nodeId: 'c11_chem_039',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Molecular Geometry & Polarity',
    question: 'Which of the following molecules has polar individual bonds BUT zero net dipole moment (μ = 0 D) due to molecular symmetry?',
    options: ['H₂O', 'NH₃', 'BF₃', 'SO₂'],
    correctIndex: 2,
    explanation: 'BF₃ is trigonal planar (120° bond angles). The vector sum of three equal B-F bond dipoles pointing outwards at 120° to each other is exactly zero.',
    hints: [
      'Look for a highly symmetric planar geometry.',
      '120° vector sum of 3 equal vectors cancels to 0.',
      'Boron Trifluoride is trigonal planar.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'c17',
    nodeId: 'c11_chem_040',
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'Fajan\'s Rules Ranking',
    question: 'Arrange the following Group 1 alkali metal chlorides in ORDER OF INCREASING COVALENT CHARACTER (Least Covalent → Most Covalent):',
    sortItems: ['CsCl', 'KCl', 'NaCl', 'LiCl'],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Cation sizes follow Cs⁺ > K⁺ > Na⁺ > Li⁺. According to Fajan\'s rules, smaller cation radius increases polarising power, so Li⁺ distorts Cl⁻ electron cloud most, making LiCl the most covalent.',
    hints: [
      'Fajan\'s rule: Smaller cation → Greater polarising power → Greater covalent character.',
      'Cs⁺ is largest alkali metal cation (least polarising).',
      'Li⁺ is smallest alkali metal cation (most polarising).',
    ],
    misconceptionIndex: 4,
  },

  // --- ADVANCED (8 Challenges) ---
  {
    id: 'c18',
    nodeId: 'c11_chem_034',
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Born-Haber Cycle Calculation',
    question: 'Calculate the Lattice Enthalpy (ΔU_lattice in kJ/mol) of NaCl using the Born-Haber cycle data: Sublimation ΔH_sub = +108.7 kJ/mol, Bond Dissociation ΔH_diss = +242.0 kJ/mol (for ½ Cl₂), Ionisation ΔH_IE = +495.8 kJ/mol, Electron Gain ΔH_eg = -348.7 kJ/mol, and Heat of Formation ΔH_f = -411.2 kJ/mol.',
    correctAnswer: 788,
    tolerance: 5,
    unit: 'kJ/mol',
    explanation: 'ΔH_f = ΔH_sub + ½ ΔH_diss + ΔH_IE + ΔH_eg - ΔU_lattice. -411.2 = 108.7 + 121.0 + 495.8 - 348.7 - ΔU_lattice => -411.2 = 376.8 - ΔU_lattice => ΔU_lattice = 376.8 + 411.2 = +788 kJ/mol.',
    hints: [
      'Hess\'s Law equation: ΔH_f = ΔH_sub + ½ ΔH_diss(Cl₂) + ΔH_IE(Na) + ΔH_eg(Cl) - ΔU_lattice',
      '½ ΔH_diss = ½ × 242.0 = 121.0 kJ/mol.',
      'Sum of steps = 108.7 + 121.0 + 495.8 - 348.7 = +376.8 kJ/mol.',
      'Lattice Enthalpy ΔU_lattice = 376.8 - (-411.2) = 788 kJ/mol.',
    ],
  },
  {
    id: 'c19',
    nodeId: 'c11_chem_036',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Formal Charge Optimization',
    question: 'For Nitrous Oxide (N₂O), consider two candidate structures: Structure A [:N≡N⁺-O⁻:] and Structure B [:N⁻=N⁺=O:]. Why is Structure A chemically more stable and preferred?',
    options: [
      'Structure A places the negative formal charge on the more electronegative Oxygen atom.',
      'Structure B has zero formal charges on all atoms.',
      'Structure A has no formal charges anywhere.',
      'Structure B places positive charge on oxygen.',
    ],
    correctIndex: 0,
    explanation: 'In Structure A [:N≡N⁺-O⁻:], FC(terminal N)=0, FC(central N)=+1, FC(O)=-1. In Structure B [:N⁻=N⁺=O:], FC(terminal N)=-1, FC(central N)=+1, FC(O)=0. Placing negative formal charge on the more electronegative Oxygen atom (Structure A) minimizes overall energy.',
    hints: [
      'Calculate FC on Oxygen for both structures.',
      'Oxygen is more electronegative than Nitrogen (3.5 vs 3.0).',
      'Negative formal charge is preferred on electronegative atoms.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'c20',
    nodeId: 'c11_chem_040',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Pseudo-Noble Gas Configuration',
    question: 'Why does Cuprous Chloride (CuCl, melting point 426 °C) exhibit significantly higher covalent character than Sodium Chloride (NaCl, melting point 801 °C), despite Cu⁺ (0.96 Å) and Na⁺ (0.95 Å) having almost identical ionic radii?',
    options: [
      'Cu⁺ has an 18-electron pseudo-noble gas valence shell (3s² 3p⁶ 3d¹⁰) which shields nuclear charge less effectively than Na⁺ (8-electron 2s² 2p⁶ octet), resulting in greater polarising power.',
      'Na⁺ is much heavier than Cu⁺.',
      'Cu⁺ forms covalent bonds by losing d-orbital electrons to Cl⁻.',
      'NaCl has higher electronegativity difference because Na is in Period 3.',
    ],
    correctIndex: 0,
    explanation: 'Cations with pseudo-noble gas electronic configurations (18 valence electrons, e.g. Cu⁺: 3s² 3p⁶ 3d¹⁰) have higher polarising power than cations with noble gas configurations (8 electrons, e.g. Na⁺: 2s² 2p⁶) due to poor shielding of d-electrons, creating higher effective nuclear charge.',
    hints: [
      'Compare valence electron configurations: Na⁺ = [Ne] (8 e⁻) vs Cu⁺ = [Ar] 3d¹⁰ (18 e⁻).',
      'd-electrons shield nuclear charge poorly.',
      'Higher Z_eff on cation outer shell leads to much stronger anion polarization.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'c21',
    nodeId: 'c11_chem_038',
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Resonance Energy Analysis',
    question: 'The theoretical heat of hydrogenation of Benzene (assuming 3 localized isolated C=C double bonds) is -358.5 kJ/mol. The experimentally observed heat of hydrogenation of Benzene is -208.2 kJ/mol. Calculate the Resonance Stabilization Energy of Benzene in kJ/mol.',
    correctAnswer: 150.3,
    tolerance: 1.0,
    unit: 'kJ/mol',
    explanation: 'Resonance Energy = |Theoretical ΔH - Experimental ΔH| = |-358.5 - (-208.2)| = 150.3 kJ/mol. This extra stability is due to the complete delocalization of six π electrons over the aromatic ring.',
    hints: [
      'Resonance stabilization energy = Theoretical value - Experimental value.',
      'Theoretical ΔH = 3 × (-119.5) = -358.5 kJ/mol.',
      'Difference = 358.5 - 208.2 = 150.3 kJ/mol.',
    ],
  },
  {
    id: 'c22',
    nodeId: 'c11_chem_040',
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'Fajan\'s Rules & Physical Properties',
    question: 'Arrange the following iron and calcium chlorides in ORDER OF INCREASING MELTING POINT (Lowest Melting Point → Highest Melting Point):',
    sortItems: ['FeCl₃', 'FeCl₂', 'CaCl₂'],
    correctOrder: [0, 1, 2],
    explanation: 'Fe³⁺ has highest charge (+3) and smallest size → highest polarisation → most covalent → lowest melting point (FeCl₃ ~306°C). Fe²⁺ has +2 charge with pseudo-d shell → intermediate (FeCl₂ ~677°C). Ca²⁺ (+2) has noble gas configuration and larger size → most ionic → highest melting point (CaCl₂ ~772°C).',
    hints: [
      'More covalent character = Lower melting point.',
      'Highest cation charge (Fe³⁺) creates highest covalent character.',
      'Ca²⁺ (+2 noble gas octet) creates highest ionic character.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'c23',
    nodeId: 'c11_chem_039',
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Dipole Moment Vector Mechanics',
    question: 'A bent triatomic molecule AX₂ has two identical polar A-X bond dipoles of μ_bond = 1.50 D each. If the bond angle X-A-X is 120°, calculate the net molecular dipole moment μ_net in Debye. (Formula: μ_net = 2 × μ_bond × cos(θ/2))',
    correctAnswer: 1.50,
    tolerance: 0.05,
    unit: 'D',
    explanation: 'μ_net = 2 × 1.50 × cos(120°/2) = 3.00 × cos(60°) = 3.00 × 0.5 = 1.50 D.',
    hints: [
      'Half bond angle θ/2 = 60°.',
      'cos(60°) = 0.5.',
      'μ_net = 2 × 1.50 × 0.5 = 1.50 D.',
    ],
  },
  {
    id: 'c24',
    nodeId: 'c11_chem_037',
    type: 'classification',
    difficulty: 'advanced',
    competencyLevel: 'Valence Shell Expansion Analysis',
    question: 'Classify the following central elements based on whether they can undergo Octet Expansion using vacant d-orbitals:',
    categories: ['Can Expand Octet (Period 3+)', 'Cannot Expand Octet (Period 2)'],
    items: [
      { text: 'Phosphorus in PCl₅', category: 'Can Expand Octet (Period 3+)' },
      { text: 'Nitrogen in NF₅ (non-existent)', category: 'Cannot Expand Octet (Period 2)' },
      { text: 'Sulfur in SF₆', category: 'Can Expand Octet (Period 3+)' },
      { text: 'Boron in BF₆³⁻ (non-existent)', category: 'Cannot Expand Octet (Period 2)' },
      { text: 'Iodine in IF₇', category: 'Can Expand Octet (Period 3+)' },
      { text: 'Oxygen in OF₆ (non-existent)', category: 'Cannot Expand Octet (Period 2)' },
    ],
    explanation: 'Period 2 elements (N, B, O, C, F) have only 2s and 2p valence orbitals (maximum valence capacity = 8 electrons). Period 3 and higher elements (P, S, I, Cl) possess available d-orbitals (3d, 4d) and can expand their valence shells beyond 8 electrons.',
    hints: [
      'Second period elements have NO 2d orbitals!',
      'N, B, O cannot exceed 8 valence electrons.',
      'P, S, I belong to Period 3, 4, 5 and can use d orbitals.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'c25',
    nodeId: 'c11_chem_031',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Historical Synthesis Kossel vs Lewis',
    question: 'Which statement accurately synthesizes the distinct contributions of Walther Kössel and G.N. Lewis to chemical bonding theory (1916)?',
    options: [
      'Kössel explained electrovalent (ionic) bonding via complete electron transfer between electropositive alkali metals and electronegative halogens, while Lewis explained covalent bonding via shared electron pairs.',
      'Both scientists exclusively studied covalent single bonds in diatomic organic compounds.',
      'Lewis formulated lattice enthalpy equations, while Kössel discovered noble gas compounds.',
      'Kössel proved that all chemical bonds are 100% covalent without exception.',
    ],
    correctIndex: 0,
    explanation: 'Kössel focused on electrovalent bonding (electron transfer forming ions electrostatic lattice), whereas Lewis introduced the concept of shared electron pairs (covalent bonds) and Lewis dot notation.',
    hints: [
      'Kössel = Ions, Electron Transfer, Electrovalence.',
      'Lewis = Electron Sharing, Covalent Bonds, Dot Symbols.',
      'Together they established the Octet Theory of chemical bonding.',
    ],
    misconceptionIndex: 3,
  },
];

// ==========================================
// CUSTOM SVG DIAGRAM COMPONENTS
// ==========================================

// Diagram 1: Interactive Lewis Dot Viewer Component
const LewisDotDiagramSVG: React.FC<{
  element: string;
  valence: number;
  dots: number;
  charge?: number;
}> = ({ element, valence, dots, charge = 0 }) => {
  // Calculate positions around central text
  const positions = [
    { x: 100, y: 40 },  // Top 1
    { x: 112, y: 40 },  // Top 2
    { x: 160, y: 90 },  // Right 1
    { x: 160, y: 102 }, // Right 2
    { x: 100, y: 150 }, // Bottom 1
    { x: 112, y: 150 }, // Bottom 2
    { x: 40, y: 90 },   // Left 1
    { x: 40, y: 102 },  // Left 2
  ];

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-slate-900 rounded-xl border border-cyan-500/30 shadow-lg">
      <svg width="200" height="190" viewBox="0 0 200 190" className="overflow-visible">
        {/* Glow halo */}
        <circle cx="100" cy="95" r="55" fill="rgba(6, 182, 212, 0.08)" stroke="rgba(6, 182, 212, 0.2)" strokeDasharray="4,4" />
        
        {/* Element Symbol */}
        <text
          x="100"
          y="105"
          textAnchor="middle"
          className="fill-cyan-300 text-3xl font-extrabold tracking-wider font-mono select-none"
        >
          {element}
        </text>

        {/* Charge label if present */}
        {charge !== 0 && (
          <text x="145" y="65" className="fill-amber-400 text-base font-bold font-mono">
            {charge > 0 ? `+${charge}` : `${charge}`}
          </text>
        )}

        {/* Dots */}
        {positions.slice(0, Math.min(dots, 8)).map((pos, idx) => (
          <g key={idx}>
            <circle cx={pos.x} cy={pos.y} r="5.5" fill="#38bdf8" className="animate-pulse" />
            <circle cx={pos.x} cy={pos.y} r="7.5" fill="none" stroke="#0284c7" strokeWidth="1.5" />
          </g>
        ))}
      </svg>
      <div className="mt-2 text-xs font-mono text-cyan-200/80">
        Valence Electrons: <span className="text-amber-300 font-bold">{dots}</span> / {valence}
      </div>
    </div>
  );
};

// Diagram 2: Ionic Bond & Electron Transfer Simulation SVG
const IonicBondFormationSVG: React.FC<{
  metal: string;
  nonMetal: string;
  transferProgress: number; // 0 to 100
}> = ({ metal, nonMetal, transferProgress }) => {
  const eX = 100 + (transferProgress / 100) * 160;
  const eY = 100 - Math.sin((transferProgress / 100) * Math.PI) * 45;

  return (
    <div className="flex flex-col items-center p-4 bg-slate-950 rounded-xl border border-indigo-500/30">
      <svg width="360" height="200" viewBox="0 0 360 200">
        <defs>
          <linearGradient id="metalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#991b1b" />
          </linearGradient>
          <linearGradient id="nonMetalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#1e3a8a" />
          </linearGradient>
        </defs>

        {/* Cation / Metal Atom */}
        <g transform="translate(80, 100)">
          <circle r="42" fill="url(#metalGrad)" opacity="0.85" stroke="#f87171" strokeWidth="2" />
          <text x="0" y="8" textAnchor="middle" fill="#ffffff" className="font-bold text-xl font-mono">
            {metal}
          </text>
          {transferProgress > 80 && (
            <text x="25" y="-20" fill="#fca5a5" className="font-bold text-lg font-mono">+1</text>
          )}
        </g>

        {/* Electrostatic attraction wave when transferred */}
        {transferProgress > 90 && (
          <line x1="122" y1="100" x2="218" y2="100" stroke="#fbbf24" strokeWidth="3" strokeDasharray="6,4" className="animate-pulse" />
        )}

        {/* Anion / Non-metal Atom */}
        <g transform="translate(260, 100)">
          <circle r={ transferProgress > 80 ? 52 : 46 } fill="url(#nonMetalGrad)" opacity="0.85" stroke="#60a5fa" strokeWidth="2" className="transition-all duration-300" />
          <text x="0" y="8" textAnchor="middle" fill="#ffffff" className="font-bold text-xl font-mono">
            {nonMetal}
          </text>
          {transferProgress > 80 && (
            <text x="30" y="-25" fill="#93c5fd" className="font-bold text-lg font-mono">-1</text>
          )}
        </g>

        {/* Traveling Electron */}
        <circle cx={eX} cy={eY} r="7" fill="#fbbf24" className="shadow-lg">
          <animate attributeName="r" values="6;8;6" dur="1s" repeatCount="indefinite" />
        </circle>
        <text x={eX} y={eY - 12} textAnchor="middle" fill="#fef08a" className="text-xs font-mono font-bold">e⁻</text>
      </svg>
      <div className="text-xs text-indigo-200 mt-2 font-mono">
        {transferProgress < 100 ? `Kössel Electron Transfer: ${transferProgress.toFixed(0)}%` : 'Electrostatic Ionic Bond Established!'}
      </div>
    </div>
  );
};

// Diagram 3: Resonance Hybrid & Canonical Forms SVG
const ResonanceHybridSVG: React.FC<{
  structure: 'canonical1' | 'canonical2' | 'hybrid';
}> = ({ structure }) => {
  return (
    <div className="flex flex-col items-center p-4 bg-slate-900 rounded-xl border border-emerald-500/30">
      <svg width="340" height="200" viewBox="0 0 340 200">
        {/* Central Oxygen */}
        <circle cx="170" cy="60" r="28" fill="#10b981" opacity="0.9" />
        <text x="170" y="66" textAnchor="middle" fill="#fff" fontWeight="bold" fontSize="18" fontFamily="monospace">O</text>

        {/* Left Oxygen */}
        <circle cx="90" cy="150" r="28" fill="#059669" opacity="0.9" />
        <text x="90" y="156" textAnchor="middle" fill="#fff" fontWeight="bold" fontSize="18" fontFamily="monospace">O</text>

        {/* Right Oxygen */}
        <circle cx="250" cy="150" r="28" fill="#059669" opacity="0.9" />
        <text x="250" y="156" textAnchor="middle" fill="#fff" fontWeight="bold" fontSize="18" fontFamily="monospace">O</text>

        {/* Bonds depending on selected structure */}
        {structure === 'canonical1' && (
          <>
            {/* Left Double Bond */}
            <line x1="150" y1="78" x2="104" y2="132" stroke="#34d399" strokeWidth="5" />
            <line x1="158" y1="86" x2="112" y2="140" stroke="#34d399" strokeWidth="5" />
            {/* Right Single Bond */}
            <line x1="185" y1="78" x2="235" y2="132" stroke="#a7f3d0" strokeWidth="4" />
          </>
        )}

        {structure === 'canonical2' && (
          <>
            {/* Left Single Bond */}
            <line x1="155" y1="78" x2="105" y2="132" stroke="#a7f3d0" strokeWidth="4" />
            {/* Right Double Bond */}
            <line x1="190" y1="78" x2="236" y2="132" stroke="#34d399" strokeWidth="5" />
            <line x1="182" y1="86" x2="228" y2="140" stroke="#34d399" strokeWidth="5" />
          </>
        )}

        {structure === 'hybrid' && (
          <>
            {/* Solid single bonds */}
            <line x1="155" y1="78" x2="105" y2="132" stroke="#34d399" strokeWidth="4" />
            <line x1="185" y1="78" x2="235" y2="132" stroke="#34d399" strokeWidth="4" />
            {/* Dashed partial double bonds */}
            <line x1="148" y1="86" x2="98" y2="140" stroke="#fbbf24" strokeWidth="4" strokeDasharray="6,4" />
            <line x1="192" y1="86" x2="242" y2="140" stroke="#fbbf24" strokeWidth="4" strokeDasharray="6,4" />
            {/* Hybrid electron arc cloud */}
            <path d="M 90 120 Q 170 80 250 120" fill="none" stroke="#f59e0b" strokeWidth="3" strokeDasharray="4,4" />
          </>
        )}
      </svg>
      <div className="mt-2 text-xs font-mono text-emerald-300 font-bold">
        {structure === 'hybrid' ? 'Resonance Hybrid (Bond Order = 1.5, Equal Bond Length 128 pm)' : `Canonical Resonance Structure (${structure === 'canonical1' ? 'Form A' : 'Form B'})`}
      </div>
    </div>
  );
};

// Diagram 4: Fajan's Polarization Interactive SVG
const FajansPolarisationSVG: React.FC<{
  cationRadius: number; // 30 to 70
  cationCharge: number; // 1 to 3
  anionRadius: number;  // 50 to 90
}> = ({ cationRadius, cationCharge, anionRadius }) => {
  // Calculate distortion factor
  const polarisingPower = (cationCharge * 50) / cationRadius;
  const distortion = Math.min(polarisingPower * (anionRadius / 40) * 0.45, 45);

  return (
    <div className="flex flex-col items-center p-4 bg-slate-950 rounded-xl border border-purple-500/30">
      <svg width="360" height="200" viewBox="0 0 360 200">
        {/* Cation */}
        <g transform="translate(90, 100)">
          <circle r={cationRadius} fill="#ec4899" opacity="0.9" stroke="#f472b6" strokeWidth="2" />
          <text x="0" y="6" textAnchor="middle" fill="#fff" className="font-extrabold text-sm font-mono">
            M{cationCharge > 1 ? `${cationCharge}+` : '+'}
          </text>
        </g>

        {/* Distorted Anion Electron Cloud */}
        <g transform="translate(250, 100)">
          {/* Un-distorted outline preview */}
          <circle r={anionRadius} fill="none" stroke="rgba(168, 85, 247, 0.3)" strokeDasharray="4,4" />

          {/* Distorted ellipse representing electron cloud pulled leftward towards cation */}
          <ellipse
            cx={-distortion * 0.7}
            cy="0"
            rx={anionRadius + distortion * 0.4}
            ry={anionRadius - distortion * 0.25}
            fill="#8b5cf6"
            opacity="0.75"
            stroke="#a855f7"
            strokeWidth="2"
          />
          <text x={-distortion * 0.4} y="6" textAnchor="middle" fill="#fff" className="font-extrabold text-sm font-mono">
            X⁻
          </text>
        </g>

        {/* Polarization arrow overlay */}
        <path d="M 210 100 L 140 100" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrow)" />
      </svg>
      <div className="mt-2 text-xs font-mono text-purple-300">
        Polarisation Distortion: <span className="text-amber-400 font-bold">{distortion.toFixed(1)}%</span> → Covalent Character: <span className="text-emerald-400 font-bold">{(distortion * 1.8).toFixed(0)}%</span>
      </div>
    </div>
  );
};

// Diagram 5: Dipole Moment Vector Diagram SVG
const DipoleVectorSVG: React.FC<{
  molecule: 'CO2' | 'H2O' | 'NH3' | 'BF3';
}> = ({ molecule }) => {
  return (
    <div className="flex flex-col items-center p-4 bg-slate-900 rounded-xl border border-blue-500/30">
      <svg width="320" height="190" viewBox="0 0 320 190">
        <defs>
          <marker id="dipoleArrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#38bdf8" />
          </marker>
          <marker id="netDipoleArrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
          </marker>
        </defs>

        {molecule === 'CO2' && (
          <g transform="translate(160, 95)">
            {/* O=C=O Linear */}
            <circle cx="0" cy="0" r="22" fill="#475569" />
            <text x="0" y="6" textAnchor="middle" fill="#fff" fontWeight="bold">C</text>
            <circle cx="-90" cy="0" r="20" fill="#ef4444" />
            <text x="-90" y="6" textAnchor="middle" fill="#fff" fontWeight="bold">O</text>
            <circle cx="90" cy="0" r="20" fill="#ef4444" />
            <text x="90" y="6" textAnchor="middle" fill="#fff" fontWeight="bold">O</text>

            <line x1="-22" y1="-5" x2="-70" y2="-5" stroke="#94a3b8" strokeWidth="3" />
            <line x1="-22" y1="5" x2="-70" y2="5" stroke="#94a3b8" strokeWidth="3" />
            <line x1="22" y1="-5" x2="70" y2="-5" stroke="#94a3b8" strokeWidth="3" />
            <line x1="22" y1="5" x2="70" y2="5" stroke="#94a3b8" strokeWidth="3" />

            {/* Dipole vectors pointing towards Oxygen */}
            <line x1="-15" y1="-25" x2="-75" y2="-25" stroke="#38bdf8" strokeWidth="3" markerEnd="url(#dipoleArrow)" />
            <line x1="15" y1="-25" x2="75" y2="-25" stroke="#38bdf8" strokeWidth="3" markerEnd="url(#dipoleArrow)" />
            <text x="0" y="-45" textAnchor="middle" fill="#f59e0b" className="font-mono text-xs font-bold">Net μ = 0 D (Symmetric Cancellation)</text>
          </g>
        )}

        {molecule === 'H2O' && (
          <g transform="translate(160, 80)">
            {/* Oxygen center */}
            <circle cx="0" cy="0" r="24" fill="#ef4444" />
            <text x="0" y="6" textAnchor="middle" fill="#fff" fontWeight="bold">O</text>
            {/* Hydrogens */}
            <circle cx="-55" cy="55" r="16" fill="#3b82f6" />
            <text x="-55" y="60" textAnchor="middle" fill="#fff" fontWeight="bold">H</text>
            <circle cx="55" cy="55" r="16" fill="#3b82f6" />
            <text x="55" y="60" textAnchor="middle" fill="#fff" fontWeight="bold">H</text>

            <line x1="-16" y1="16" x2="-42" y2="42" stroke="#94a3b8" strokeWidth="3" />
            <line x1="16" y1="16" x2="42" y2="42" stroke="#94a3b8" strokeWidth="3" />

            {/* Bond dipoles pointing up toward Oxygen */}
            <line x1="-48" y1="36" x2="-20" y2="8" stroke="#38bdf8" strokeWidth="2.5" markerEnd="url(#dipoleArrow)" />
            <line x1="48" y1="36" x2="20" y2="8" stroke="#38bdf8" strokeWidth="2.5" markerEnd="url(#dipoleArrow)" />

            {/* Net dipole pointing straight UP */}
            <line x1="0" y1="30" x2="0" y2="-45" stroke="#f59e0b" strokeWidth="4" markerEnd="url(#netDipoleArrow)" />
            <text x="0" y="-55" textAnchor="middle" fill="#f59e0b" className="font-mono text-xs font-bold">Net μ = 1.85 D</text>
          </g>
        )}

        {molecule === 'BF3' && (
          <g transform="translate(160, 95)">
            <circle cx="0" cy="0" r="22" fill="#ec4899" />
            <text x="0" y="6" textAnchor="middle" fill="#fff" fontWeight="bold">B</text>
            
            <circle cx="0" cy="-65" r="18" fill="#10b981" />
            <text x="0" y="-60" textAnchor="middle" fill="#fff" fontWeight="bold">F</text>
            
            <circle cx="-56" cy="33" r="18" fill="#10b981" />
            <text x="-56" y="38" textAnchor="middle" fill="#fff" fontWeight="bold">F</text>
            
            <circle cx="56" cy="33" r="18" fill="#10b981" />
            <text x="56" y="38" textAnchor="middle" fill="#fff" fontWeight="bold">F</text>

            <line x1="0" y1="-22" x2="0" y2="-47" stroke="#94a3b8" strokeWidth="3" />
            <line x1="-19" y1="11" x2="-40" y2="24" stroke="#94a3b8" strokeWidth="3" />
            <line x1="19" y1="11" x2="40" y2="24" stroke="#94a3b8" strokeWidth="3" />

            <text x="0" y="75" textAnchor="middle" fill="#f59e0b" className="font-mono text-xs font-bold">Net μ = 0 D (120° Planar Cancellation)</text>
          </g>
        )}

        {molecule === 'NH3' && (
          <g transform="translate(160, 90)">
            <circle cx="0" cy="-15" r="24" fill="#8b5cf6" />
            <text x="0" y="-9" textAnchor="middle" fill="#fff" fontWeight="bold">N</text>

            {/* Lone pair */}
            <ellipse cx="0" cy="-48" rx="10" ry="14" fill="#a7f3d0" opacity="0.6" stroke="#34d399" />
            
            {/* Hydrogens */}
            <circle cx="-50" cy="40" r="15" fill="#3b82f6" />
            <text x="-50" y="44" textAnchor="middle" fill="#fff" fontWeight="bold">H</text>
            <circle cx="0" cy="55" r="15" fill="#3b82f6" />
            <text x="0" y="59" textAnchor="middle" fill="#fff" fontWeight="bold">H</text>
            <circle cx="50" cy="40" r="15" fill="#3b82f6" />
            <text x="50" y="44" textAnchor="middle" fill="#fff" fontWeight="bold">H</text>

            {/* Net Dipole straight UP */}
            <line x1="0" y1="20" x2="0" y2="-72" stroke="#f59e0b" strokeWidth="4" markerEnd="url(#netDipoleArrow)" />
            <text x="0" y="80" textAnchor="middle" fill="#f59e0b" className="font-mono text-xs font-bold">Net μ = 1.47 D (Lone pair & N-H reinforce)</text>
          </g>
        )}
      </svg>
      <div className="mt-1 text-xs font-mono text-cyan-300">
        Molecular Geometry & Vector Dipole Analysis
      </div>
    </div>
  );
};

// ==========================================
// MAIN COMPONENT DEFINITION
// ==========================================
export default function C11_ChemistryKosselLewisapproachtobondingSim({
  onComplete,
}: {
  onComplete?: (score: number) => void;
}) {
  // Tab State
  const [activeTab, setActiveTab] = useState<'discovery' | 'lab' | 'challenges' | 'summary'>('discovery');

  // Interactive Lab State
  const [selectedLabIndex, setSelectedLabIndex] = useState<number>(0);
  const [transferProgress, setTransferProgress] = useState<number>(50);
  const [selectedAtom, setSelectedAtom] = useState<string>('N');
  const [atomValenceDots, setAtomValenceDots] = useState<number>(5);
  const [resonanceForm, setResonanceForm] = useState<'canonical1' | 'canonical2' | 'hybrid'>('hybrid');
  const [fajanCationR, setFajanCationR] = useState<number>(45);
  const [fajanCationQ, setFajanCationQ] = useState<number>(2);
  const [fajanAnionR, setFajanAnionR] = useState<number>(70);
  const [dipoleMolecule, setDipoleMolecule] = useState<'CO2' | 'H2O' | 'NH3' | 'BF3'>('H2O');

  // Discovery & Exploration Form Answers
  const [discoverySelected, setDiscoverySelected] = useState<number | null>(null);
  const [discoverySubmitted, setDiscoverySubmitted] = useState<boolean>(false);
  const [predictionAnswers, setPredictionAnswers] = useState<Record<number, number>>({});
  const [observationAnswers, setObservationAnswers] = useState<Record<number, number>>({});

  // Challenge Engine State
  const [currentChallengeIdx, setCurrentChallengeIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [numericInput, setNumericInput] = useState<string>('');
  const [classificationState, setClassificationState] = useState<Record<string, string>>({});
  const [dragSortedItems, setDragSortedItems] = useState<string[]>([]);
  const [challengeSubmitted, setChallengeSubmitted] = useState<boolean>(false);
  const [challengeFeedback, setChallengeFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);

  // Gamification & Tracking State
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [bktStates, setBktStates] = useState<Record<string, { pKnown: number }>>(() => {
    const initial: Record<string, { pKnown: number }> = {};
    ALL_NODE_IDS.forEach((id) => {
      initial[id] = createBKTState();
    });
    return initial;
  });

  // UI Feedback Components State
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHint, setCurrentHint] = useState<string>('');
  const [sparklePos, setSparklePos] = useState<{ x: number; y: number }>({ x: 400, y: 300 });

  // Inactivity Hint Timer Ref
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Audio & Speech helper wrapper
  const playSound = (sound: SoundEffect) => {
    try {
      audioManager.play(sound);
    } catch {
      // Audio fallback
    }
  };

  const speakText = (text: string) => {
    try {
      speechManager.speak(text);
    } catch {
      // Speech fallback
    }
  };

  // Setup initial drag sort order when challenge changes
  const activeChallenge = CHALLENGES[currentChallengeIdx];

  useEffect(() => {
    if (activeChallenge.type === 'drag-sort' && activeChallenge.sortItems) {
      setDragSortedItems([...activeChallenge.sortItems]);
    } else {
      setDragSortedItems([]);
    }
    setSelectedOption(null);
    setNumericInput('');
    setClassificationState({});
    setChallengeSubmitted(false);
    setChallengeFeedback(null);
    setShowHint(false);
  }, [currentChallengeIdx, activeChallenge]);

  // Inactivity hint trigger after 10 seconds of no action
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    setShowHint(false);
    inactivityTimerRef.current = setTimeout(() => {
      if (!challengeSubmitted && activeChallenge) {
        setCurrentHint(activeChallenge.hints[0] || 'Take a closer look at the key chemical parameters.');
        setShowHint(true);
        playSound('hint');
        speakText('Here is a helpful chemistry hint for you.');
      }
    }, 12000);
  }, [challengeSubmitted, activeChallenge]);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [resetInactivityTimer, currentChallengeIdx, activeTab]);

  // Handle Discovery Submission
  const handleDiscoverySubmit = (idx: number) => {
    setDiscoverySelected(idx);
    setDiscoverySubmitted(true);
    if (idx === DISCOVERY_QUESTION.correctIndex) {
      playSound('success');
      speakText('Correct! Carbon dioxide has zero dipole moment due to its symmetrical linear geometry.');
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    } else {
      playSound('error');
      speakText('Not quite. Consider the vector cancelation of bond dipoles in linear molecules.');
    }
  };

  // Handle Challenge Answer Submission
  const handleChallengeSubmit = () => {
    resetInactivityTimer();
    let isCorrect = false;

    if (activeChallenge.type === 'multiple-choice') {
      if (selectedOption === activeChallenge.correctIndex) {
        isCorrect = true;
      }
    } else if (activeChallenge.type === 'numeric') {
      const val = parseFloat(numericInput);
      if (
        !isNaN(val) &&
        activeChallenge.correctAnswer !== undefined &&
        Math.abs(val - activeChallenge.correctAnswer) <= (activeChallenge.tolerance || 0.01)
      ) {
        isCorrect = true;
      }
    } else if (activeChallenge.type === 'classification') {
      if (activeChallenge.items) {
        isCorrect = activeChallenge.items.every(
          (item) => classificationState[item.text] === item.category
        );
      }
    } else if (activeChallenge.type === 'drag-sort') {
      if (activeChallenge.correctOrder && activeChallenge.sortItems) {
        const currentOrderIndices = dragSortedItems.map((item) =>
          activeChallenge.sortItems!.indexOf(item)
        );
        isCorrect = currentOrderIndices.every(
          (val, index) => val === activeChallenge.correctOrder![index]
        );
      }
    }

    setChallengeSubmitted(true);
    const updatedBkt = bktUpdate(bktStates[activeChallenge.nodeId] || createBKTState(), isCorrect);
    setBktStates((prev) => ({
      ...prev,
      [activeChallenge.nodeId]: updatedBkt,
    }));

    if (isCorrect) {
      playSound('success');
      playSound('sparkle');
      speakText('Outstanding! Your chemical reasoning is spot on.');
      setScore((prev) => prev + (activeChallenge.difficulty === 'advanced' ? 30 : activeChallenge.difficulty === 'standard' ? 20 : 10));
      setStreak((prev) => prev + 1);
      setChallengeFeedback({
        isCorrect: true,
        text: `Correct! ${activeChallenge.explanation}`,
      });
      setShowSuccessBanner(true);
      setShowSparkle(true);
      setSparklePos({ x: 450, y: 250 });
      setTimeout(() => {
        setShowSuccessBanner(false);
        setShowSparkle(false);
      }, 2500);
    } else {
      playSound('error');
      speakText('Incorrect. Review the detailed explanation to strengthen your concept.');
      setStreak(0);
      setChallengeFeedback({
        isCorrect: false,
        text: `Incorrect. ${activeChallenge.explanation}`,
      });
    }

    // Record SRS review item
    const reviewItem = createReviewItem(activeChallenge.id);
    sm2Update(reviewItem, isCorrect ? 5 : 2);
  };

  const handleNextChallenge = () => {
    if (currentChallengeIdx < CHALLENGES.length - 1) {
      setCurrentChallengeIdx((prev) => prev + 1);
      playSound('whoosh');
    } else {
      playSound('celebration');
      speakText('Congratulations! You have mastered the Kossel-Lewis chemical bonding simulation suite.');
      recordGameScore('c11_chem_kossel_lewis', score);
      if (onComplete) onComplete(score);
    }
  };

  // Drag & Sort Helper functions
  const moveSortItem = (index: number, direction: 'up' | 'down') => {
    playSound('pickup');
    const newItems = [...dragSortedItems];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex >= 0 && targetIndex < newItems.length) {
      const temp = newItems[index];
      newItems[index] = newItems[targetIndex];
      newItems[targetIndex] = temp;
      setDragSortedItems(newItems);
    }
  };

  // Calculate overall node mastery percentage
  const averageMastery = useMemo(() => {
    const keys = Object.keys(bktStates);
    if (keys.length === 0) return 0;
    const total = keys.reduce((acc, k) => acc + masteryProb(bktStates[k]), 0);
    return Math.round((total / keys.length) * 100);
  }, [bktStates]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 md:p-6 flex flex-col justify-between select-none">
      {/* Visual Feedback Overlays */}
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccessBanner} text="Challenge Mastered!" />
      <SparkleBurst show={showSparkle} x={sparklePos.x} y={sparklePos.y} />

      {/* HEADER BAR */}
      <header className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl mb-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-cyan-500/30">
            🧪
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-extrabold bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
              {SCENARIO.title}
            </h1>
            <p className="text-xs text-slate-400 font-medium">CISCE Class 11 Chemistry • Kossel-Lewis Bonding Theory</p>
          </div>
        </div>

        {/* Stats & Progress Pills */}
        <div className="flex items-center gap-3 flex-wrap justify-center">
          <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl px-3 py-1.5 flex items-center gap-2">
            <span className="text-xs text-slate-400 font-semibold">Mastery:</span>
            <span className="text-sm font-bold text-cyan-400 font-mono">{averageMastery}%</span>
          </div>
          <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl px-3 py-1.5 flex items-center gap-2">
            <span className="text-xs text-slate-400 font-semibold">Score:</span>
            <span className="text-sm font-bold text-amber-400 font-mono">{score}</span>
          </div>
          <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl px-3 py-1.5 flex items-center gap-2">
            <span className="text-xs text-slate-400 font-semibold">Streak:</span>
            <span className="text-sm font-bold text-emerald-400 font-mono">{streak} 🔥</span>
          </div>
        </div>
      </header>

      {/* NAVIGATION TABS */}
      <nav className="flex items-center justify-center gap-2 mb-6 bg-slate-900/60 p-1.5 rounded-2xl border border-slate-800">
        {[
          { id: 'discovery', label: '1. Discovery & Concept', icon: '💡' },
          { id: 'lab', label: '2. Interactive Lab Workbench', icon: '🔬' },
          { id: 'challenges', label: '3. ISC Practice Challenges', icon: '🎯' },
          { id: 'summary', label: '4. Misconceptions & Real World', icon: '📘' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              playSound('tap');
              setActiveTab(tab.id as any);
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-500/25'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>

      {/* MAIN CONTAINER CONTENT */}
      <main className="flex-grow">
        {/* ========================================== */}
        {/* TAB 1: DISCOVERY & CONCEPT                 */}
        {/* ========================================== */}
        {activeTab === 'discovery' && (
          <div className="space-y-6 max-w-5xl mx-auto animate-fadeIn">
            {/* Scenario Narrative Box */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
              <h2 className="text-xl font-bold text-cyan-300 mb-2 flex items-center gap-2">
                <span>🏛️</span> Lab Context & Historical Background
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">{SCENARIO.intro}</p>
              <p className="text-slate-400 text-xs italic bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                {SCENARIO.context}
              </p>
            </div>

            {/* Discovery Core Question */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <span className="text-xs font-bold text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full uppercase tracking-wider">
                Discovery Question
              </span>
              <h3 className="text-lg font-bold text-slate-100 mt-3 mb-4">{DISCOVERY_QUESTION.question}</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                {DISCOVERY_QUESTION.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleDiscoverySubmit(idx)}
                    disabled={discoverySubmitted}
                    className={`p-4 rounded-xl border text-left text-sm font-medium transition-all ${
                      discoverySubmitted
                        ? idx === DISCOVERY_QUESTION.correctIndex
                          ? 'bg-emerald-500/20 border-emerald-500 text-emerald-200'
                          : discoverySelected === idx
                          ? 'bg-rose-500/20 border-rose-500 text-rose-200'
                          : 'bg-slate-950 border-slate-800 text-slate-500'
                        : 'bg-slate-950 border-slate-800 text-slate-200 hover:border-cyan-500 hover:bg-slate-800/50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold shrink-0">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{opt}</span>
                    </div>
                  </button>
                ))}
              </div>

              {discoverySubmitted && (
                <div className="bg-cyan-950/40 border border-cyan-800/50 rounded-xl p-4 text-cyan-200 text-sm animate-fadeIn">
                  <div className="font-bold mb-1 flex items-center gap-2 text-cyan-300">
                    <span>💡</span> Chemist\'s Insight:
                  </div>
                  <p>{DISCOVERY_QUESTION.hintAfter}</p>
                </div>
              )}
            </div>

            {/* PREDICTION QUESTIONS SECTION */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-bold text-indigo-300 mb-4 flex items-center gap-2">
                <span>🔮</span> Prediction Challenges (Formulate Hypotheses)
              </h3>
              <div className="space-y-6">
                {PREDICTION_QUESTIONS.map((pq, pqIdx) => (
                  <div key={pqIdx} className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <p className="font-semibold text-slate-200 text-sm mb-3">{pq.question}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                      {pq.options.map((opt, oIdx) => {
                        const isSelected = predictionAnswers[pqIdx] === oIdx;
                        const isCorrect = oIdx === pq.correctIndex;
                        const answered = predictionAnswers[pqIdx] !== undefined;

                        return (
                          <button
                            key={oIdx}
                            onClick={() => {
                              playSound('tap');
                              setPredictionAnswers((prev) => ({ ...prev, [pqIdx]: oIdx }));
                              if (oIdx === pq.correctIndex) {
                                playSound('pop');
                              } else {
                                playSound('error');
                              }
                            }}
                            className={`p-3 rounded-lg border text-xs text-left transition-all ${
                              answered
                                ? isCorrect
                                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-200 font-bold'
                                  : isSelected
                                  ? 'bg-rose-500/20 border-rose-500 text-rose-200'
                                  : 'bg-slate-900 border-slate-800 text-slate-500'
                                : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-indigo-500'
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                    {predictionAnswers[pqIdx] !== undefined && (
                      <p className="text-xs text-indigo-300 bg-indigo-950/40 p-2 rounded border border-indigo-800/40">
                        🔍 <strong>How to verify:</strong> {pq.verifyInstruction}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* TAB 2: INTERACTIVE LAB WORKBENCH           */}
        {/* ========================================== */}
        {activeTab === 'lab' && (
          <div className="space-y-6 max-w-6xl mx-auto animate-fadeIn">
            {/* Exploration Steps Navigation Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
              {EXPLORATION_STEPS.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    playSound('tap');
                    setSelectedLabIndex(idx);
                  }}
                  className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                    selectedLabIndex === idx
                      ? 'bg-gradient-to-br from-cyan-900/60 to-blue-900/60 border-cyan-400 text-cyan-100 shadow-lg shadow-cyan-500/20'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                  }`}
                >
                  <span className="text-xs font-bold text-cyan-400 font-mono mb-1">LAB 0{idx + 1}</span>
                  <span className="text-xs font-semibold leading-snug">{step.title.replace(`Lab ${idx + 1}: `, '')}</span>
                </button>
              ))}
            </div>

            {/* Current Selected Lab Workspace */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
              <div className="mb-4 flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-cyan-300">{EXPLORATION_STEPS[selectedLabIndex].title}</h3>
                  <p className="text-xs text-slate-400 mt-1">{EXPLORATION_STEPS[selectedLabIndex].instruction}</p>
                </div>
                <span className="text-xs font-mono bg-slate-800 text-slate-300 px-3 py-1 rounded-full border border-slate-700 self-start md:self-auto">
                  Target Node: {EXPLORATION_STEPS[selectedLabIndex].nodeId}
                </span>
              </div>

              {/* DYNAMIC INTERACTIVE SIMULATORS */}
              {selectedLabIndex === 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                  <IonicBondFormationSVG metal="Na" nonMetal="Cl" transferProgress={transferProgress} />
                  <div className="space-y-4 bg-slate-950 p-5 rounded-xl border border-slate-800">
                    <h4 className="font-bold text-sm text-cyan-400">Kössel Ionic Transfer Controls</h4>
                    <div>
                      <label className="text-xs text-slate-300 font-semibold mb-2 block">
                        Electron Transfer Progress ({transferProgress}%):
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={transferProgress}
                        onChange={(e) => {
                          setTransferProgress(Number(e.target.value));
                          playSound('balance');
                        }}
                        className="w-full accent-cyan-400"
                      />
                    </div>
                    <div className="text-xs space-y-2 text-slate-300 bg-slate-900 p-3 rounded-lg border border-slate-800 font-mono">
                      <div>Na ([Ne] 3s¹) → Na⁺ ([Ne]) + e⁻</div>
                      <div>Cl ([Ne] 3s² 3p⁵) + e⁻ → Cl⁻ ([Ar])</div>
                      <div className="text-amber-400 font-bold mt-1">
                        Electrostatic Force F = (1 / 4πε₀) · (q₁ q₂ / r²)
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {selectedLabIndex === 1 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                  <LewisDotDiagramSVG
                    element={selectedAtom}
                    valence={atomValenceDots === 5 ? 5 : atomValenceDots === 6 ? 6 : 4}
                    dots={atomValenceDots}
                  />
                  <div className="space-y-4 bg-slate-950 p-5 rounded-xl border border-slate-800">
                    <h4 className="font-bold text-sm text-cyan-400">Lewis Symbol & Formal Charge Builder</h4>
                    <div className="flex gap-2">
                      {['C', 'N', 'O', 'F', 'Cl', 'S'].map((sym) => (
                        <button
                          key={sym}
                          onClick={() => {
                            playSound('tap');
                            setSelectedAtom(sym);
                            const valMap: Record<string, number> = { C: 4, N: 5, O: 6, F: 7, Cl: 7, S: 6 };
                            setAtomValenceDots(valMap[sym] || 5);
                          }}
                          className={`px-3 py-1.5 rounded-lg font-bold font-mono text-xs ${
                            selectedAtom === sym
                              ? 'bg-cyan-500 text-slate-950'
                              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                          }`}
                        >
                          {sym}
                        </button>
                      ))}
                    </div>
                    <div>
                      <label className="text-xs text-slate-300 block mb-1 font-semibold">
                        Valence Electron Count ({atomValenceDots}):
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="8"
                        value={atomValenceDots}
                        onChange={(e) => {
                          setAtomValenceDots(Number(e.target.value));
                          playSound('pop');
                        }}
                        className="w-full accent-cyan-400"
                      />
                    </div>
                    <div className="p-3 bg-slate-900 rounded-lg text-xs font-mono text-cyan-200 border border-cyan-800/40">
                      Formula: Formal Charge = V - L - ½ B
                    </div>
                  </div>
                </div>
              )}

              {selectedLabIndex === 2 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-slate-950 p-4 rounded-xl border border-rose-500/30">
                      <span className="text-xs font-bold text-rose-400 font-mono">EXCEPTION 1</span>
                      <h4 className="text-sm font-bold text-slate-100 mt-1">Incomplete Octet (BF₃)</h4>
                      <p className="text-xs text-slate-400 mt-2">
                        Central Boron atom surrounded by 3 electron pairs = 6 valence e⁻ (less than 8).
                      </p>
                    </div>
                    <div className="bg-slate-950 p-4 rounded-xl border border-amber-500/30">
                      <span className="text-xs font-bold text-amber-400 font-mono">EXCEPTION 2</span>
                      <h4 className="text-sm font-bold text-slate-100 mt-1">Odd-Electron Species (NO)</h4>
                      <p className="text-xs text-slate-400 mt-2">
                        Total valence e⁻ = 5 (N) + 6 (O) = 11 e⁻. Contains an unpaired radical electron.
                      </p>
                    </div>
                    <div className="bg-slate-950 p-4 rounded-xl border border-purple-500/30">
                      <span className="text-xs font-bold text-purple-400 font-mono">EXCEPTION 3</span>
                      <h4 className="text-sm font-bold text-slate-100 mt-1">Expanded Octet (SF₆)</h4>
                      <p className="text-xs text-slate-400 mt-2">
                        Central Sulfur bonded to 6 Fluorines using 3d orbitals = 12 valence e⁻.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {selectedLabIndex === 3 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                  <ResonanceHybridSVG structure={resonanceForm} />
                  <div className="space-y-4 bg-slate-950 p-5 rounded-xl border border-slate-800">
                    <h4 className="font-bold text-sm text-emerald-400">Resonance Hybrid Controller</h4>
                    <p className="text-xs text-slate-300">
                      Switch between hypothetical canonical Lewis structures and the actual true resonance hybrid of Ozone (O₃).
                    </p>
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => {
                          playSound('tap');
                          setResonanceForm('canonical1');
                        }}
                        className={`p-2.5 rounded-lg text-xs font-semibold text-left border ${
                          resonanceForm === 'canonical1'
                            ? 'bg-emerald-600/30 border-emerald-400 text-emerald-200'
                            : 'bg-slate-900 border-slate-800 text-slate-400'
                        }`}
                      >
                        Canonical Structure A (Double bond Left)
                      </button>
                      <button
                        onClick={() => {
                          playSound('tap');
                          setResonanceForm('canonical2');
                        }}
                        className={`p-2.5 rounded-lg text-xs font-semibold text-left border ${
                          resonanceForm === 'canonical2'
                            ? 'bg-emerald-600/30 border-emerald-400 text-emerald-200'
                            : 'bg-slate-900 border-slate-800 text-slate-400'
                        }`}
                      >
                        Canonical Structure B (Double bond Right)
                      </button>
                      <button
                        onClick={() => {
                          playSound('sparkle');
                          setResonanceForm('hybrid');
                        }}
                        className={`p-2.5 rounded-lg text-xs font-semibold text-left border ${
                          resonanceForm === 'hybrid'
                            ? 'bg-amber-500/30 border-amber-400 text-amber-200 font-bold'
                            : 'bg-slate-900 border-slate-800 text-slate-400'
                        }`}
                      >
                        ⭐ True Resonance Hybrid (Delocalized π Cloud)
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {selectedLabIndex === 4 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                  <FajansPolarisationSVG
                    cationRadius={fajanCationR}
                    cationCharge={fajanCationQ}
                    anionRadius={fajanAnionR}
                  />
                  <div className="space-y-4 bg-slate-950 p-5 rounded-xl border border-slate-800">
                    <h4 className="font-bold text-sm text-purple-400">Fajan\'s Rules Polarization Simulator</h4>
                    <div>
                      <label className="text-xs text-slate-300 block mb-1">Cation Radius r⁺ ({fajanCationR} pm):</label>
                      <input
                        type="range"
                        min="30"
                        max="70"
                        value={fajanCationR}
                        onChange={(e) => {
                          setFajanCationR(Number(e.target.value));
                          playSound('balance');
                        }}
                        className="w-full accent-purple-400"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-300 block mb-1">Cation Charge q⁺ (+{fajanCationQ}):</label>
                      <input
                        type="range"
                        min="1"
                        max="3"
                        value={fajanCationQ}
                        onChange={(e) => {
                          setFajanCationQ(Number(e.target.value));
                          playSound('pop');
                        }}
                        className="w-full accent-purple-400"
                      />
                    </div>
                    <div className="pt-2 border-t border-slate-800">
                      <label className="text-xs font-semibold text-cyan-300 block mb-2">Molecular Dipole Vector Viewer:</label>
                      <div className="grid grid-cols-4 gap-2">
                        {(['CO2', 'H2O', 'NH3', 'BF3'] as const).map((m) => (
                          <button
                            key={m}
                            onClick={() => {
                              playSound('tap');
                              setDipoleMolecule(m);
                            }}
                            className={`p-2 rounded font-mono font-bold text-xs ${
                              dipoleMolecule === m ? 'bg-cyan-500 text-slate-950' : 'bg-slate-900 text-slate-300'
                            }`}
                          >
                            {m}
                          </button>
                        ))}
                      </div>
                      <div className="mt-3">
                        <DipoleVectorSVG molecule={dipoleMolecule} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* OBSERVATION QUESTIONS SECTION */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-bold text-emerald-300 mb-4 flex items-center gap-2">
                <span>👁️</span> Empirical Observation Questions
              </h3>
              <div className="space-y-6">
                {OBSERVATION_QUESTIONS.map((oq, oqIdx) => (
                  <div key={oqIdx} className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <p className="font-semibold text-slate-200 text-sm mb-3">{oq.question}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {(oq.observableOptions ?? oq.options).map((opt, oIdx) => {
                        const isSelected = observationAnswers[oqIdx] === oIdx;
                        const isCorrect = oIdx === oq.correctIndex;
                        const answered = observationAnswers[oqIdx] !== undefined;

                        return (
                          <button
                            key={oIdx}
                            onClick={() => {
                              playSound('tap');
                              setObservationAnswers((prev) => ({ ...prev, [oqIdx]: oIdx }));
                              if (oIdx === oq.correctIndex) {
                                playSound('chime');
                              } else {
                                playSound('error');
                              }
                            }}
                            className={`p-3 rounded-lg border text-xs text-left transition-all ${
                              answered
                                ? isCorrect
                                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-200 font-bold'
                                  : isSelected
                                  ? 'bg-rose-500/20 border-rose-500 text-rose-200'
                                  : 'bg-slate-900 border-slate-800 text-slate-500'
                                : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-emerald-500'
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

        {/* ========================================== */}
        {/* TAB 3: ISC PRACTICE CHALLENGES            */}
        {/* ========================================== */}
        {activeTab === 'challenges' && (
          <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
            {/* Progress Header */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-3 py-1 rounded-full font-bold">
                  Challenge {currentChallengeIdx + 1} / {CHALLENGES.length}
                </span>
                <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                  activeChallenge.difficulty === 'foundation'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : activeChallenge.difficulty === 'standard'
                    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                }`}>
                  {activeChallenge.difficulty} Tier
                </span>
              </div>
              <span className="text-xs text-slate-400 font-mono">Node: {activeChallenge.nodeId}</span>
            </div>

            {/* Hint Bubble Component */}
            <HintBubble show={showHint} text={currentHint} />

            {/* Challenge Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl relative">
              <h3 className="text-lg font-bold text-slate-100 mb-2">{activeChallenge.question}</h3>
              <p className="text-xs text-slate-400 mb-6 font-mono">Competency: {activeChallenge.competencyLevel}</p>

              {/* MULTIPLE CHOICE TYPE */}
              {activeChallenge.type === 'multiple-choice' && activeChallenge.options && (
                <div className="grid grid-cols-1 gap-3 mb-6">
                  {activeChallenge.options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        if (!challengeSubmitted) {
                          playSound('tap');
                          setSelectedOption(idx);
                        }
                      }}
                      disabled={challengeSubmitted}
                      className={`p-4 rounded-xl border text-left text-sm transition-all flex items-center justify-between ${
                        selectedOption === idx
                          ? 'bg-cyan-600/20 border-cyan-400 text-cyan-100 font-semibold'
                          : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center font-mono text-xs font-bold">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{opt}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* NUMERIC INPUT TYPE */}
              {activeChallenge.type === 'numeric' && (
                <div className="mb-6 space-y-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      step="any"
                      value={numericInput}
                      onChange={(e) => setNumericInput(e.target.value)}
                      disabled={challengeSubmitted}
                      placeholder="Enter numerical answer..."
                      className="bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 font-mono text-base focus:outline-none focus:border-cyan-400 w-full md:w-64"
                    />
                    {activeChallenge.unit && (
                      <span className="text-slate-400 font-mono font-bold text-sm">{activeChallenge.unit}</span>
                    )}
                  </div>
                </div>
              )}

              {/* CLASSIFICATION TYPE */}
              {activeChallenge.type === 'classification' && activeChallenge.items && activeChallenge.categories && (
                <div className="mb-6 space-y-4">
                  {activeChallenge.items.map((item, idx) => (
                    <div key={idx} className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <span className="font-mono font-bold text-cyan-300 text-sm">{item.text}</span>
                      <div className="flex gap-2 flex-wrap">
                        {activeChallenge.categories!.map((cat) => (
                          <button
                            key={cat}
                            onClick={() => {
                              if (!challengeSubmitted) {
                                playSound('tap');
                                setClassificationState((prev) => ({ ...prev, [item.text]: cat }));
                              }
                            }}
                            disabled={challengeSubmitted}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                              classificationState[item.text] === cat
                                ? 'bg-cyan-500 text-slate-950 font-bold'
                                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
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
              {activeChallenge.type === 'drag-sort' && (
                <div className="mb-6 space-y-2">
                  <p className="text-xs text-slate-400 mb-3">Use the arrows to reorder items into the correct sequence:</p>
                  {dragSortedItems.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-950 border border-slate-800 p-3 rounded-xl flex items-center justify-between font-mono text-sm text-slate-200"
                    >
                      <span>{idx + 1}. {item}</span>
                      {!challengeSubmitted && (
                        <div className="flex gap-1">
                          <button
                            onClick={() => moveSortItem(idx, 'up')}
                            disabled={idx === 0}
                            className="w-8 h-8 rounded bg-slate-800 text-slate-300 disabled:opacity-30 hover:bg-slate-700 flex items-center justify-center font-bold"
                          >
                            ↑
                          </button>
                          <button
                            onClick={() => moveSortItem(idx, 'down')}
                            disabled={idx === dragSortedItems.length - 1}
                            className="w-8 h-8 rounded bg-slate-800 text-slate-300 disabled:opacity-30 hover:bg-slate-700 flex items-center justify-center font-bold"
                          >
                            ↓
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* SUBMISSION BUTTON & FEEDBACK */}
              {!challengeSubmitted ? (
                <button
                  onClick={handleChallengeSubmit}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-sm shadow-lg shadow-cyan-500/25 transition-all"
                >
                  Verify Answer
                </button>
              ) : (
                <div className="space-y-4">
                  {challengeFeedback && (
                    <div
                      className={`p-4 rounded-xl border text-sm leading-relaxed ${
                        challengeFeedback.isCorrect
                          ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                          : 'bg-rose-950/40 border-rose-500/50 text-rose-200'
                      }`}
                    >
                      <div className="font-bold mb-1 flex items-center gap-2">
                        {challengeFeedback.isCorrect ? '✅ Excellent!' : '❌ Review Needed'}
                      </div>
                      <p>{challengeFeedback.text}</p>
                    </div>
                  )}
                  <button
                    onClick={handleNextChallenge}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-emerald-500 hover:from-amber-400 hover:to-emerald-400 text-slate-950 font-extrabold text-sm shadow-lg shadow-emerald-500/25 transition-all"
                  >
                    {currentChallengeIdx < CHALLENGES.length - 1 ? 'Next Challenge →' : 'Complete Simulation Suite 🎉'}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* TAB 4: MISCONCEPTIONS & REAL WORLD        */}
        {/* ========================================== */}
        {activeTab === 'summary' && (
          <div className="space-y-8 max-w-5xl mx-auto animate-fadeIn">
            {/* REAL WORLD ACTIVITY SECTION (MANDATORY) */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <span className="text-xs font-bold text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full uppercase tracking-wider">
                Real-World Chemistry Application
              </span>
              <h3 className="text-xl font-extrabold text-cyan-300 mt-3 mb-2">{REAL_WORLD_ACTIVITY.title}</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">{REAL_WORLD_ACTIVITY.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                  <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-start gap-3">
                    <span className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 font-mono font-bold text-sm flex items-center justify-center shrink-0">
                      0{idx + 1}
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* EXPANDED MISCONCEPTIONS LIST */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-bold text-rose-300 mb-6 flex items-center gap-2">
                <span>⚠️</span> Common Chemical Bonding Misconceptions & Corrections
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {MISCONCEPTIONS.map((m, idx) => (
                  <div key={idx} className="bg-slate-950 p-5 rounded-xl border border-slate-800 flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-mono text-rose-400 font-bold mb-1 block">MISCONCEPTION #{idx + 1}</span>
                      <h4 className="font-bold text-slate-100 text-sm mb-2">{m.title}</h4>
                      <p className="text-xs text-rose-300/80 bg-rose-950/20 p-2.5 rounded-lg border border-rose-900/30 mb-3">
                        ❌ <em>"{m.misconception}"</em>
                      </p>
                      <p className="text-xs text-emerald-300/90 bg-emerald-950/20 p-2.5 rounded-lg border border-emerald-900/30">
                        ✅ <strong>Correction:</strong> {m.correction}
                      </p>
                    </div>
                    <span className="mt-3 text-[10px] font-mono text-slate-500 self-end">Target Node: {m.nodeId}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="mt-8 border-t border-slate-800 pt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
        <span>CISCE ISC Class 11 Chemistry • Interactive Learning Suite</span>
        <span>Covering Nodes: c11_chem_031 through c11_chem_040</span>
      </footer>
    </div>
  );
}