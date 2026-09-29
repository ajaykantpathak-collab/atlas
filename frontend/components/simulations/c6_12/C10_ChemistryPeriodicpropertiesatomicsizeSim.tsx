'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, masteryProb } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

interface Misconception {
  id: string;
  title: string;
  description: string;
  correction: string;
}

// ==========================================
// CONSTANTS & NODE IDS
// ==========================================

const ALL_NODE_IDS = [
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
  // CBSE chapter node ids covered by the board-depth drill bank below
  'c10_chem_cbse_05_001',
  'c10_chem_cbse_05_002',
  'c10_chem_cbse_05_003',
  'c10_chem_cbse_05_004',
  'c10_chem_cbse_05_009',
  'c10_chem_cbse_05_010',
] as const;

type NodeId = typeof ALL_NODE_IDS[number];

// Data types
interface ElementInfo {
  z: number;
  symbol: string;
  name: string;
  period: number;
  group: number;
  shells: number[];
  radius: number; // in pm
  metallic: 'high' | 'medium' | 'low' | 'non-metal';
  ip: number; // kJ/mol
  ea: number; // kJ/mol
  en: number; // Pauling scale
  category: 'alkali' | 'alkaline' | 'halogen' | 'noble' | 'nonmetal' | 'metalloid' | 'metal' | 'transition';
}

const PERIODIC_TABLE_DATA: ElementInfo[] = [
  { z: 1, symbol: 'H', name: 'Hydrogen', period: 1, group: 1, shells: [1], radius: 37, metallic: 'non-metal', ip: 1312, ea: 73, en: 2.2, category: 'nonmetal' },
  { z: 2, symbol: 'He', name: 'Helium', period: 1, group: 18, shells: [2], radius: 31, metallic: 'non-metal', ip: 2372, ea: 0, en: 0, category: 'noble' },
  { z: 3, symbol: 'Li', name: 'Lithium', period: 2, group: 1, shells: [2, 1], radius: 152, metallic: 'high', ip: 520, ea: 60, en: 1.0, category: 'alkali' },
  { z: 4, symbol: 'Be', name: 'Beryllium', period: 2, group: 2, shells: [2, 2], radius: 112, metallic: 'medium', ip: 899, ea: 0, en: 1.5, category: 'alkaline' },
  { z: 5, symbol: 'B', name: 'Boron', period: 2, group: 13, shells: [2, 3], radius: 85, metallic: 'low', ip: 801, ea: 27, en: 2.0, category: 'metalloid' },
  { z: 6, symbol: 'C', name: 'Carbon', period: 2, group: 14, shells: [2, 4], radius: 77, metallic: 'non-metal', ip: 1086, ea: 122, en: 2.5, category: 'nonmetal' },
  { z: 7, symbol: 'N', name: 'Nitrogen', period: 2, group: 15, shells: [2, 5], radius: 75, metallic: 'non-metal', ip: 1402, ea: 7, en: 3.0, category: 'nonmetal' },
  { z: 8, symbol: 'O', name: 'Oxygen', period: 2, group: 16, shells: [2, 6], radius: 73, metallic: 'non-metal', ip: 1314, ea: 141, en: 3.5, category: 'nonmetal' },
  { z: 9, symbol: 'F', name: 'Fluorine', period: 2, group: 17, shells: [2, 7], radius: 71, metallic: 'non-metal', ip: 1681, ea: 328, en: 4.0, category: 'halogen' },
  { z: 10, symbol: 'Ne', name: 'Neon', period: 2, group: 18, shells: [2, 8], radius: 69, metallic: 'non-metal', ip: 2081, ea: 0, en: 0, category: 'noble' },
  { z: 11, symbol: 'Na', name: 'Sodium', period: 3, group: 1, shells: [2, 8, 1], radius: 186, metallic: 'high', ip: 496, ea: 53, en: 0.9, category: 'alkali' },
  { z: 12, symbol: 'Mg', name: 'Magnesium', period: 3, group: 2, shells: [2, 8, 2], radius: 160, metallic: 'medium', ip: 738, ea: 0, en: 1.2, category: 'alkaline' },
  { z: 13, symbol: 'Al', name: 'Aluminium', period: 3, group: 13, shells: [2, 8, 3], radius: 143, metallic: 'medium', ip: 578, ea: 43, en: 1.5, category: 'metal' },
  { z: 14, symbol: 'Si', name: 'Silicon', period: 3, group: 14, shells: [2, 8, 4], radius: 118, metallic: 'low', ip: 787, ea: 134, en: 1.8, category: 'metalloid' },
  { z: 15, symbol: 'P', name: 'Phosphorus', period: 3, group: 15, shells: [2, 8, 5], radius: 106, metallic: 'non-metal', ip: 1012, ea: 72, en: 2.1, category: 'nonmetal' },
  { z: 16, symbol: 'S', name: 'Sulphur', period: 3, group: 16, shells: [2, 8, 6], radius: 105, metallic: 'non-metal', ip: 1000, ea: 200, en: 2.5, category: 'nonmetal' },
  { z: 17, symbol: 'Cl', name: 'Chlorine', period: 3, group: 17, shells: [2, 8, 7], radius: 100, metallic: 'non-metal', ip: 1251, ea: 349, en: 3.0, category: 'halogen' },
  { z: 18, symbol: 'Ar', name: 'Argon', period: 3, group: 18, shells: [2, 8, 8], radius: 98, metallic: 'non-metal', ip: 1520, ea: 0, en: 0, category: 'noble' },
  { z: 19, symbol: 'K', name: 'Potassium', period: 4, group: 1, shells: [2, 8, 8, 1], radius: 231, metallic: 'high', ip: 419, ea: 48, en: 0.8, category: 'alkali' },
  { z: 20, symbol: 'Ca', name: 'Calcium', period: 4, group: 2, shells: [2, 8, 8, 2], radius: 197, metallic: 'medium', ip: 590, ea: 2, en: 1.0, category: 'alkaline' },
  { z: 35, symbol: 'Br', name: 'Bromine', period: 4, group: 17, shells: [2, 8, 18, 7], radius: 114, metallic: 'non-metal', ip: 1140, ea: 325, en: 2.8, category: 'halogen' },
  { z: 36, symbol: 'Kr', name: 'Krypton', period: 4, group: 18, shells: [2, 8, 18, 8], radius: 112, metallic: 'non-metal', ip: 1351, ea: 0, en: 0, category: 'noble' }
];

interface CompoundData {
  id: string;
  name: string;
  formula: string;
  type: 'electrovalent' | 'covalent';
  atoms: { symbol: string; count: number; valence: number; isMetal: boolean }[];
  description: string;
  dotStructureSvg: string;
}

const COMPOUND_PRESETS: CompoundData[] = [
  {
    id: 'nacl',
    name: 'Sodium Chloride',
    formula: 'NaCl',
    type: 'electrovalent',
    atoms: [
      { symbol: 'Na', count: 1, valence: 1, isMetal: true },
      { symbol: 'Cl', count: 1, valence: 7, isMetal: false }
    ],
    description: '1 electron transferred from Na (2,8,1) to Cl (2,8,7), forming Na+ and Cl-.',
    dotStructureSvg: '[Na]+ [ :Cl: ]-'
  },
  {
    id: 'mgcl2',
    name: 'Magnesium Chloride',
    formula: 'MgCl₂',
    type: 'electrovalent',
    atoms: [
      { symbol: 'Mg', count: 1, valence: 2, isMetal: true },
      { symbol: 'Cl', count: 2, valence: 7, isMetal: false }
    ],
    description: 'Mg (2,8,2) transfers 1 electron to each of two Cl (2,8,7) atoms, forming Mg²⁺ and 2 Cl⁻.',
    dotStructureSvg: '[Mg]²⁺ 2[ :Cl: ]⁻'
  },
  {
    id: 'cao',
    name: 'Calcium Oxide',
    formula: 'CaO',
    type: 'electrovalent',
    atoms: [
      { symbol: 'Ca', count: 1, valence: 2, isMetal: true },
      { symbol: 'O', count: 1, valence: 6, isMetal: false }
    ],
    description: 'Ca (2,8,8,2) transfers 2 electrons to O (2,6), forming Ca²⁺ and O²⁻.',
    dotStructureSvg: '[Ca]²⁺ [ :O: ]²⁻'
  },
  {
    id: 'h2',
    name: 'Hydrogen Gas',
    formula: 'H₂',
    type: 'covalent',
    atoms: [{ symbol: 'H', count: 2, valence: 1, isMetal: false }],
    description: 'Single covalent bond: 1 shared electron pair between two H atoms (duplet rule).',
    dotStructureSvg: 'H : H  (H - H)'
  },
  {
    id: 'o2',
    name: 'Oxygen Gas',
    formula: 'O₂',
    type: 'covalent',
    atoms: [{ symbol: 'O', count: 2, valence: 6, isMetal: false }],
    description: 'Double covalent bond: 2 shared electron pairs between two O atoms (octet rule).',
    dotStructureSvg: ':O::O:  (O = O)'
  },
  {
    id: 'n2',
    name: 'Nitrogen Gas',
    formula: 'N₂',
    type: 'covalent',
    atoms: [{ symbol: 'N', count: 2, valence: 5, isMetal: false }],
    description: 'Triple covalent bond: 3 shared electron pairs between two N atoms (octet rule).',
    dotStructureSvg: ':N:::N:  (N ≡ N)'
  },
  {
    id: 'ch4',
    name: 'Methane',
    formula: 'CH₄',
    type: 'covalent',
    atoms: [
      { symbol: 'C', count: 1, valence: 4, isMetal: false },
      { symbol: 'H', count: 4, valence: 1, isMetal: false }
    ],
    description: '4 single covalent bonds: C shares 1 pair with each of 4 H atoms.',
    dotStructureSvg: 'H - C(H)₂ - H'
  }
];

// ==========================================
// TEACHING SLIDES & CHALLENGES DATA
// ==========================================

interface VisualSlide {
  id: string;
  title: string;
  nodeId: NodeId;
  summary: string;
  detail: string;
  analogy: string;
  misconception: string;
  activeProperty: 'radius' | 'metallic' | 'ip' | 'ea' | 'en';
}

const SLIDES: VisualSlide[] = [
  {
    id: 'slide_1',
    title: '1. Atomic Size Trends (Period & Group)',
    nodeId: 'c10_chem_001',
    summary: 'Across a Period: Atomic size decreases. Down a Group: Atomic size increases.',
    detail: 'Across Period 3 (Na 186 pm -> Cl 100 pm), nuclear charge increases with same shell count (3 shells), pulling electrons tighter. Down Group 1 (Li 152 pm -> Cs 262 pm), a new shell is added at each step, pushing electrons farther out despite higher Z.',
    analogy: 'Balloon magnet: More magnet pull with same layers shrinks balloon (across period). Adding extra layer balloons it up (down group).',
    misconception: 'Adding electrons across a period does NOT make the atom bigger, because they enter the SAME shell while nuclear charge increases!',
    activeProperty: 'radius'
  },
  {
    id: 'slide_2',
    title: '2. Metallic Character & Ionisation Potential',
    nodeId: 'c10_chem_002',
    summary: 'Metallic character = tendency to lose electrons. Ionisation Potential (IP) = energy to remove outermost electron.',
    detail: 'Metals (left side, large size) have low IP and lose electrons easily (high metallic character). Non-metals (right side, small size) hold electrons tightly (high IP) and resist electron loss. IP increases across a period and decreases down a group.',
    analogy: 'Holding a puppy: Near your chest (small atom, top-right), it takes huge energy to snatch (high IP). Far at arm length (large atom, bottom-left), it slides away easily (low IP).',
    misconception: 'IP is always endothermic (requires energy input). High IP means electron is hard to remove, NOT easy.',
    activeProperty: 'ip'
  },
  {
    id: 'slide_3',
    title: '3. Electron Affinity & Electronegativity',
    nodeId: 'c10_chem_004',
    summary: 'Electron Affinity (EA) = energy released when gaining an electron. Electronegativity (EN) = pull on shared bond pair.',
    detail: 'Non-metals eagerly capture electrons (high EA) and pull shared electrons in covalent bonds strongly (high EN). Fluorine is the most electronegative element (4.0). Note: Chlorine has slightly higher EA than Fluorine due to Fluorines extreme compact shell repulsion.',
    analogy: 'Tug-of-war for shared electrons in a bond. The smaller, proton-rich atom pulls the rope harder!',
    misconception: 'Electronegativity applies to bonded atoms in covalent molecules, whereas Electron Affinity applies to isolated gaseous atoms!',
    activeProperty: 'en'
  },
  {
    id: 'slide_4',
    title: '4. Periodicity & Detailed Study of Period 4',
    nodeId: 'c10_chem_007',
    summary: 'Periodicity repeats every octave because valence electron configurations repeat. Period 4 starts K (2,8,8,1) and Ca (2,8,8,2).',
    detail: 'Potassium (K, Z=19) is an alkali metal with 1 valence electron in shell 4. Calcium (Ca, Z=20) is an alkaline earth metal with 2 valence electrons. Ca is smaller than K (197 pm vs 231 pm) due to +20 vs +19 nuclear charge.',
    analogy: 'Keyboard octaves: Every 8th element plays the same chemical chord because the outer shell count resets!',
    misconception: 'Calcium is smaller than potassium despite having MORE total electrons, because nuclear charge (+20) pulls 4 shells tighter than +19.',
    activeProperty: 'metallic'
  },
  {
    id: 'slide_5',
    title: '5. Bonding: Electrovalent vs Covalent Dot Structures',
    nodeId: 'c10_chem_008',
    summary: 'Electrovalent = complete electron transfer (Metal -> Non-metal). Covalent = electron pair sharing between Non-metals.',
    detail: 'Electrovalent compounds (NaCl, MgCl₂, CaO) form cations & anions held by strong electrostatic forces -> high melting points, conduct when molten/aqueous. Covalent compounds (H₂, O₂, N₂, CH₄) share 1, 2, or 3 electron pairs (single, double, triple bonds).',
    analogy: 'Ionic = complete gift of electron coin. Covalent = joint ownership of shared electron coins.',
    misconception: 'Solid NaCl does NOT conduct electricity because ions are locked in fixed lattice points. It conducts ONLY when melted or dissolved in water!',
    activeProperty: 'radius'
  }
];

interface Challenge {
  id: number;
  nodeId: NodeId;
  title: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  hint: string;
}

const CHALLENGES: Challenge[] = [
  {
    id: 1,
    nodeId: 'c10_chem_001',
    title: 'Atomic Size Trend across Period 3',
    question: 'Compare Sodium (Na, Z=11) and Chlorine (Cl, Z=17), both in Period 3. Which atom has a LARGER atomic radius and why?',
    options: [
      'Cl is larger because it has more electrons (17 > 11).',
      'Na is larger because it has fewer protons (+11 vs +17), so its 3 electron shells are pulled less tightly.',
      'Both are equal size because both have 3 electron shells.',
      'Cl is larger because Period 3 elements expand from left to right.'
    ],
    correctIndex: 1,
    explanation: 'Correct! Both Na and Cl have 3 shells (K,L,M). Chlorine has 17 protons exerting a much stronger inward pull than Sodium (+11), shrinking chlorine to 100 pm compared to Na (186 pm).',
    hint: 'Think about nuclear charge (+11 vs +17) with constant shell count (3 shells).'
  },
  {
    id: 2,
    nodeId: 'c10_chem_002',
    title: 'Metallic Character Down Group 1',
    question: 'Why is Potassium (K, Z=19) MORE metallic than Lithium (Li, Z=3)?',
    options: [
      'K has a smaller atomic size, holding its outer electron tighter.',
      'K has 4 electron shells; its outer electron is farther from the nucleus and lost more easily.',
      'Li has a higher nuclear charge than K.',
      'Li loses electrons faster because it is lighter.'
    ],
    correctIndex: 1,
    explanation: 'Spot on! Metallic character is the tendency to lose electrons. K has 4 shells (Li has 2), so the valence electron in K is farther away and heavily shielded, making it super easy to lose!',
    hint: 'Metallic character increases down a group as atomic size and shell count increase.'
  },
  {
    id: 3,
    nodeId: 'c10_chem_003',
    title: 'Ionisation Potential of Noble Gases',
    question: 'Argon (Ar, Z=18) sits at the end of Period 3. Why does Argon have the HIGHEST Ionisation Potential in Period 3?',
    options: [
      'It has 3 incomplete shells that readily accept electrons.',
      'It has a stable completed octet (2,8,8), requiring huge energy to remove an electron.',
      'It readily loses its 8 outer electrons to become a noble cation.',
      'Its atomic radius is the largest in Period 3.'
    ],
    correctIndex: 1,
    explanation: 'Exactly! Noble gases have completely filled valence shells (duplet/octet). Removing an electron breaks a stable octet, requiring massive energy input (high IP).',
    hint: 'Ionisation potential measures energy required to REMOVE an electron from a stable shell.'
  },
  {
    id: 4,
    nodeId: 'c10_chem_004',
    title: 'Electron Affinity Anomaly (F vs Cl)',
    question: 'Why does Chlorine (Cl) have a slightly HIGHER Electron Affinity than Fluorine (F), despite Fluorine being smaller?',
    options: [
      'Fluorine has a smaller nuclear charge than chlorine.',
      'Fluorine’s 2nd shell is extremely compact, causing strong electron-electron repulsion on the incoming electron.',
      'Chlorine is a metal while Fluorine is a non-metal.',
      'Fluorine already has a completed octet.'
    ],
    correctIndex: 1,
    explanation: 'Brilliant deduction! Fluorine is so small (shell 2) that adding an extra electron causes strong inter-electronic repulsion, slightly reducing energy release compared to Chlorine (shell 3).',
    hint: 'Consider electron-electron repulsion in the tiny 2nd shell of Fluorine.'
  },
  {
    id: 5,
    nodeId: 'c10_chem_005',
    title: 'Electronegativity Champion',
    question: 'Which element in the entire periodic table has the highest Electronegativity (4.0 on Pauling Scale)?',
    options: ['Sodium (Na)', 'Oxygen (O)', 'Fluorine (F)', 'Caesium (Cs)'],
    correctIndex: 2,
    explanation: 'Correct! Fluorine (top right halogen) has the highest electronegativity (4.0), exerting the strongest pull on shared electron pairs in covalent bonds.',
    hint: 'Look at the top right non-metal halogen in Period 2.'
  },
  {
    id: 6,
    nodeId: 'c10_chem_006',
    title: 'Basis of Modern Periodicity',
    question: 'What fundamental property determines the periodic repetition of physical and chemical properties of elements?',
    options: [
      'Atomic Mass (Mendeleev Law)',
      'Number of Neutrons',
      'Atomic Number (Z), which dictates the valence electron configuration',
      'Total density of the nucleus'
    ],
    correctIndex: 2,
    explanation: 'Precisely! Moseley showed that Atomic Number (protons) dictates electron arrangement in shells, causing chemical properties to repeat periodically.',
    hint: 'Atomic number = number of protons = electron configuration in shells.'
  },
  {
    id: 7,
    nodeId: 'c10_chem_007',
    title: 'Period 4 Comparison: K vs Ca',
    question: 'Which statement accurately compares Potassium (K, Z=19) and Calcium (Ca, Z=20) in Period 4?',
    options: [
      'Potassium is smaller than Calcium because K has fewer protons.',
      'Calcium forms Ca⁺¹ while Potassium forms K⁺².',
      'Calcium is smaller than Potassium and has a higher Ionisation Potential.',
      'Both have 3 electron shells.'
    ],
    correctIndex: 2,
    explanation: 'Spot on! Ca (Z=20) has a higher nuclear charge than K (Z=19) across 4 shells. This pulls Ca’s cloud tighter (smaller radius) and makes its outer 2 electrons harder to remove (higher IP).',
    hint: 'Across Period 4 from K to Ca: nuclear charge increases, size shrinks, IP increases.'
  },
  {
    id: 8,
    nodeId: 'c10_chem_008',
    title: 'Electrovalent Lewis Dot Structure of MgCl₂',
    question: 'In the electron dot representation of Magnesium Chloride (MgCl₂), how are electrons transferred?',
    options: [
      'Mg shares 2 electron pairs equally with 1 Chlorine atom.',
      'Mg (2,8,2) transfers 1 valence electron to each of two Cl (2,8,7) atoms, forming Mg²⁺ and 2 [ :Cl: ]⁻.',
      'Cl transfers 1 electron to Mg, forming Mg⁻ and Cl⁺.',
      'Two Mg atoms transfer 1 electron each to one Cl atom.'
    ],
    correctIndex: 1,
    explanation: 'Correct! Mg (metal with 2 valence e⁻) donates 1 e⁻ to first Cl and 1 e⁻ to second Cl, satisfying octets for all three ions!',
    hint: 'Mg has 2 valence electrons; each Cl needs 1 electron to reach 8.'
  },
  {
    id: 9,
    nodeId: 'c10_chem_009',
    title: 'Electrical Conductivity of Ionic Solids',
    question: 'Why does solid Sodium Chloride (NaCl) NOT conduct electricity, whereas molten NaCl conducts readily?',
    options: [
      'Solid NaCl contains no ions.',
      'In solid state, Na⁺ and Cl⁻ ions are tightly locked in fixed lattice positions and cannot move.',
      'Molten NaCl contains free electrons while solid NaCl does not.',
      'Water is required to create positive and negative charges.'
    ],
    correctIndex: 1,
    explanation: 'Exact! Electrical conduction requires MOBILE charge carriers. In solid lattice, ions cannot move. When melted or dissolved, ions break free and carry current.',
    hint: 'Ions exist in both states, but are they free to move in a rigid solid lattice?'
  },
  {
    id: 10,
    nodeId: 'c10_chem_010',
    title: 'Covalent Bonding in Nitrogen Gas (N₂)',
    question: 'Each Nitrogen atom (Z=7) has 5 valence electrons (2,5). How many electron pairs are shared in an N₂ molecule?',
    options: [
      '1 shared pair (Single bond)',
      '2 shared pairs (Double bond)',
      '3 shared pairs (Triple bond, :N ≡ N:)',
      '4 shared pairs'
    ],
    correctIndex: 2,
    explanation: 'Awesome! Each Nitrogen needs 3 electrons to complete its octet (5 + 3 = 8). They share 3 pairs of electrons, forming a strong triple covalent bond!',
    hint: 'How many electrons does N (2,5) need to complete 8?'
  },
  // ─── Class 10 board-depth additions: periodic-classification diagnostics ───
  {
    id: 101,
    nodeId: 'c10_chem_cbse_05_001',
    title: 'Dobereiner\'s Triads: S, Se, Te',
    question: 'Sulphur (atomic mass 32), selenium (79) and tellurium (128) show similar properties. What does Dobereiner\'s law of triads predict about selenium\'s mass, and why?',
    options: [
      'The middle element\'s mass is roughly the AVERAGE of the first and third: (32 + 128)/2 = 80 ≈ 79 -- so Se sits correctly in the middle of the triad',
      'The masses must be identical in a triad',
      'The middle element\'s mass is their sum (160)',
      'Triads only applied to metals, so this is invalid'
    ],
    correctIndex: 0,
    explanation: 'Dobereiner (1817): group elements in threes by similar properties; the atomic mass of the middle element approximates the mean of the other two (Li-Na-K: 7, 23, 39; Ca-Sr-Ba: 40, 88, 137). S-Se-Te gives 80 vs the actual 79 -- a textbook triad. The limitation: Dobereiner found only a handful of triads among the elements known then.',
    hint: 'Add the first and third masses, divide by two, compare with the middle.'
  },
  {
    id: 102,
    nodeId: 'c10_chem_cbse_05_002',
    title: 'Newlands\' Octaves: the Co-Ni Slot',
    question: 'Why did Newlands place cobalt and nickel in the SAME slot, and what does that reveal about his assumption? How did his law improve on Dobereiner?',
    options: [
      'Their atomic masses were nearly equal (about 59), and his law arranged elements strictly by ascending atomic mass -- so equal masses shared a slot; he assumed NO element could be discovered between them. Unlike Dobereiner\'s handful of triads, Newlands arranged ALL known elements',
      'Cobalt and nickel are the same element in two forms',
      'Newlands arranged elements by colour, not mass',
      'The octave law needed no assumptions about undiscovered elements'
    ],
    correctIndex: 0,
    explanation: 'Newlands (1866): every eighth element repeats properties, like musical octaves -- but counting starts only from hydrogen, and the law works up to calcium. Placing Co and Ni together (same mass, different properties!) exposed the flaw of mass-ordering. Improvement over Dobereiner: a single organising rule for all 56 known elements instead of isolated triads; limitation: no gaps for future elements, and heavier elements broke the octave rhythm.',
    hint: 'What single number decided Newlands\' table order?'
  },
  {
    id: 103,
    nodeId: 'c10_chem_cbse_05_003',
    title: 'Mendeleev\'s Predictions: Eka-silicon and Beryllium',
    question: 'Mendeleev left a gap below silicon (eka-silicon) in Group IV. What did his system let him predict, and how did he correct beryllium\'s atomic mass from 13.5 to 9.0?',
    options: [
      'He predicted the missing element\'s properties (density about 5.5 g/cm3, valency 4, formula of its oxide EO2) -- germanium matched in 1886; for beryllium, atomic mass = equivalent weight x valency = 4.5 x 2 = 9.0, and valency 2 fits Group II better than the wrong 13.5',
      'He predicted only the element\'s colour',
      'He changed beryllium\'s mass to make the table look neater with no chemical reasoning',
      'Eka-silicon turned out to be gallium'
    ],
    correctIndex: 0,
    explanation: 'Mendeleev\'s two masterstrokes: (1) GAPS -- leaving room for undiscovered elements and predicting their properties from neighbours (eka-aluminium = gallium, 1875; eka-silicon = germanium, 1886); (2) CORRECTIONS -- atomic mass = equivalent weight x valency fixed Be (and indium, gold). Design 5 element cards (symbol, mass, density, formula of oxide/chloride, valency) and "predict" the missing card from its vertical neighbours -- exactly Mendeleev\'s method. Evaluate the isotope objection: "gaps solve the isotope problem" is FALSE -- isotopes (same element, different mass) broke mass-ordering completely and led to Moseley\'s atomic-number basis.',
    hint: 'Vertical neighbours whisper the properties of the missing element.'
  },
  {
    id: 104,
    nodeId: 'c10_chem_cbse_05_009',
    title: 'Metallic Character Experiment: Mg, Al, Zn/Fe ordering',
    question: 'Design an experiment with dilute hydrochloric acid to compare the metallic character of magnesium, aluminium and iron (or zinc). What observations order them?',
    options: [
      'Add equal-sized cleaned pieces to equal volumes of the same dilute HCl: the faster, hotter hydrogen fizzing marks the MORE metallic (more reactive) element -- expected order Mg (vigorous) > Al (slow at first, oxide coat) > Fe (gentle)',
      'Taste each metal in acid to rank sweetness',
      'Metallic character is measured by weighing the ribbon',
      'All metals react identically with dilute HCl'
    ],
    correctIndex: 0,
    explanation: 'Metallic character = tendency to lose electrons = reactivity with acids (Mg + 2HCl -> MgCl2 + H2, fastest; Al is masked by its protective oxide layer until scratched; Fe bubbles gently). Trend: metallic character INCREASES down a group and DECREASES across a period -- Na beats Mg, Mg beats Al.',
    hint: 'One variable: the metal. Rate of hydrogen bubbles ranks electron-donating power.'
  },
  {
    id: 105,
    nodeId: 'c10_chem_cbse_05_010',
    title: 'Three Unlabelled Oxides: MgO, Al2O3, SO3',
    question: 'You have three unlabelled solid oxides: MgO, Al2O3 and SO3. Design a laboratory test that distinguishes a BASIC oxide, an AMPHOTERIC oxide and an ACIDIC oxide.',
    options: [
      'Shake each with water and test with litmus: the MgO suspension turns red litmus BLUE (basic -- Mg(OH)2 forms); SO3 solution turns blue litmus RED (acidic -- H2SO4 forms); Al2O3 is the leftover, reacting with BOTH dilute HCl and NaOH (amphoteric), while MgO reacts only with acid and SO3 only with base',
      'Heat all three and watch the flame colours change',
      'All three oxides are basic',
      'Magnetism separates the three oxides'
    ],
    correctIndex: 0,
    explanation: 'Oxide character across a period: Na2O strongly basic -> MgO basic -> Al2O3 AMPHOTERIC (Al2O3 + 6HCl -> 2AlCl3 + 3H2O and Al2O3 + 2NaOH -> 2NaAlO2 + H2O) -> SiO2 weakly acidic -> SO3 strongly acidic (SO3 + H2O -> H2SO4). Metallic character falls across the period, so oxide basicity falls with it -- the same trend seen from two angles.',
    hint: 'Litmus sorts acid from base; the oxide that eats BOTH acid and alkali is amphoteric.'
  }
];

const MISCONCEPTIONS_CHECKLIST: Misconception[] = [
  {
    id: "misc_1",
    title: "Atomic size increases across a period with increasing atomic number",
    description: "Students often believe that adding more protons and electrons across a period makes the atom heavier and physically larger. They assume that a higher atomic number automatically leads to a larger atomic radius.",
    correction: "Across a period, valence electrons are added to the same shell while the number of protons in the nucleus increases. This higher nuclear charge increases the effective nuclear charge ($Z_{eff}$), pulling the valence shell closer to the nucleus and causing atomic size to decrease from left to right.",
  },
  {
    id: "misc_2",
    title: "Cations are larger than their neutral parent atoms",
    description: "Students frequently think that forming a cation increases atomic size because of changes in electron repulsion or positive charge expansion. Some assume the size remains unchanged because the element's identity stays the same.",
    correction: "A cation is always smaller than its neutral parent atom. The loss of valence electrons often results in the complete removal of the outermost shell. Furthermore, the remaining electrons experience a greater effective nuclear charge per electron, pulling them tighter toward the nucleus.",
  },
  {
    id: "misc_3",
    title: "Effective nuclear charge is identical to total nuclear charge",
    description: "Students often assume valence electrons experience the full attractive pull of all protons present in the nucleus. They ignore the shielding effect caused by inner-shell electrons.",
    correction: "Inner shell electrons shield outer valence electrons from the full positive charge of the nucleus. The effective nuclear charge ($Z_{eff}$) is the net positive charge experienced by an electron, which is equal to the total nuclear charge minus the shielding constant ($Z_{eff} = Z - S$). Therefore, valence electrons feel a smaller pull than the total nuclear charge.",
  },
  {
    id: "misc_4",
    title: "Isoelectronic ions have identical radii due to equal electrons",
    description: "Students believe that since isoelectronic species possess the same number of electrons and identical electronic configurations, their ionic sizes must be equal. They overlook the effect of differing numbers of protons in their nuclei.",
    correction: "Although isoelectronic ions have the same number of electrons, their nuclear charges differ based on their atomic numbers. An ion with more protons exerts a stronger attractive force on the same set of electrons, drawing them closer. Consequently, species with higher atomic numbers in an isoelectronic series have smaller ionic radii.",
  },
  {
    id: "misc_5",
    title: "Atomic size decreases down a group from increasing nuclear charge",
    description: "Students sometimes reason that because atomic number increases substantially down a group, the larger positive nuclear charge pulls electrons closer, shrinking the atom. They prioritize nuclear charge over energy levels.",
    correction: "Moving down a group, a completely new principal energy level (shell) is added at each successive element. The increase in distance caused by adding electron shells far outweighs the pull from the increasing nuclear charge. As a result, the atomic radius consistently increases down a group.",
  },
];

// ==========================================
// MAIN COMPONENT
// ==========================================

export default function C10_ChemistryPeriodicpropertiesatomicsizeSim({
  onComplete
}: {
  onComplete?: (score: number) => void;
}) {
  // Tab Navigation State
  const [activeTab, setActiveTab] = useState<'explore' | 'predict' | 'slides' | 'challenges' | 'summary'>('explore');

  // Interactive Sandbox state
  const [selectedZ, setSelectedZ] = useState<number>(11); // Sodium by default
  const [activePropertyTrend, setActivePropertyTrend] = useState<'radius' | 'metallic' | 'ip' | 'ea' | 'en'>('radius');
  const [selectedCompound, setSelectedCompound] = useState<string>('nacl');

  // Predict state (Discovery question)
  const [predictionAnswer, setPredictionAnswer] = useState<number | null>(null);
  const [predictionFeedback, setPredictionFeedback] = useState<string>('');

  // Slides State
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);

  // Challenge State
  const [challengeIndex, setChallengeIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [challengeFeedback, setChallengeFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<{ show: boolean; x: number; y: number }>({ show: false, x: 0, y: 0 });

  // Score & BKT Tracker
  const [score, setScore] = useState<number>(0);
  const [bktMasteryMap, setBktMasteryMap] = useState<Record<NodeId, number>>(() => {
    const initial: Partial<Record<NodeId, number>> = {};
    ALL_NODE_IDS.forEach((id) => {
      const state = createBKTState();
      initial[id] = getMasteryLevel(state);
    });
    return initial as Record<NodeId, number>;
  });

  // Timer for inactivity hint trigger
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Initial audio welcome call
    audioManager.play('whoosh');
  }, []);

  // Helper to get element object by Z
  const activeElement = useMemo(() => {
    return PERIODIC_TABLE_DATA.find((el) => el.z === selectedZ) || PERIODIC_TABLE_DATA[10]; // Na default
  }, [selectedZ]);

  // Selected compound helper
  const activeCompoundObj = useMemo(() => {
    return COMPOUND_PRESETS.find((c) => c.id === selectedCompound) || COMPOUND_PRESETS[0];
  }, [selectedCompound]);

  // Handler for element selection
  const handleSelectElement = (z: number) => {
    audioManager.play('pop');
    setSelectedZ(z);
    const el = PERIODIC_TABLE_DATA.find((e) => e.z === z);
    if (el) {
      speechManager.speak(`${el.name}, Atomic number ${el.z}. Configuration ${el.shells.join(', ')}.`);
    }
  };

  // Handler for predict step
  const handlePredictSubmit = (index: number) => {
    setPredictionAnswer(index);
    if (index === 1) {
      audioManager.play('success');
      speechManager.speak('Great prediction! As nuclear charge increases across a period, atomic size shrinks.');
      setPredictionFeedback('Correct! Moving left-to-right across Period 3, protons increase from +11 to +17 with 3 shells, pulling electrons closer and shrinking the radius.');
    } else {
      audioManager.play('error');
      speechManager.speak('Not quite. Remember that nuclear charge pulls electrons inward.');
      setPredictionFeedback('Incorrect. Even though electrons are added across a period, they enter the SAME shell while nuclear charge increases, shrinking the atom!');
    }
  };

  // Slide Change Handler
  const handleNextSlide = () => {
    if (currentSlideIndex < SLIDES.length - 1) {
      audioManager.play('swoop');
      const nextIdx = currentSlideIndex + 1;
      setCurrentSlideIndex(nextIdx);
      setActivePropertyTrend(SLIDES[nextIdx].activeProperty);
      speechManager.speak(SLIDES[nextIdx].title);
    }
  };

  const handlePrevSlide = () => {
    if (currentSlideIndex > 0) {
      audioManager.play('swoop');
      const prevIdx = currentSlideIndex - 1;
      setCurrentSlideIndex(prevIdx);
      setActivePropertyTrend(SLIDES[prevIdx].activeProperty);
    }
  };

  // Challenge Option Submit
  const handleChallengeSubmit = (optIndex: number, event: React.MouseEvent<HTMLButtonElement>) => {
    if (challengeFeedback !== null) return; // already answered

    setSelectedOption(optIndex);
    const currentCh = CHALLENGES[challengeIndex];
    const isCorrect = optIndex === currentCh.correctIndex;

    const rect = event.currentTarget.getBoundingClientRect();
    setShowSparkle({ show: true, x: rect.left + rect.width / 2, y: rect.top });
    setTimeout(() => setShowSparkle({ show: false, x: 0, y: 0 }), 1000);

    // Update BKT & SRS
    const nodeId = currentCh.nodeId;
    const oldBkt = createBKTState();
    const newBkt = bktUpdate(oldBkt, isCorrect);
    const masteryVal = masteryProb(newBkt);
    setBktMasteryMap((prev) => ({ ...prev, [nodeId]: masteryVal }));

    const srsItem = createReviewItem(nodeId, 'Chemistry');
    sm2Update(srsItem, isCorrect ? 4 : 1, 0);
    recordGameScore([nodeId], isCorrect ? 100 : 30);

    if (isCorrect) {
      audioManager.play('drop-correct');
      audioManager.play('chime');
      speechManager.speak('Correct! Excellent chemical reasoning.');
      setScore((s) => s + 10);
      setChallengeFeedback({ isCorrect: true, text: currentCh.explanation });
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2500);
    } else {
      audioManager.play('drop-wrong');
      speechManager.speak('Incorrect. Review the nuclear charge and shell trends.');
      setChallengeFeedback({ isCorrect: false, text: currentCh.explanation });
    }
  };

  const handleNextChallenge = () => {
    audioManager.play('whoosh');
    if (challengeIndex < CHALLENGES.length - 1) {
      setChallengeIndex((c) => c + 1);
      setSelectedOption(null);
      setChallengeFeedback(null);
      setShowHint(false);
    } else {
      // Completed all challenges
      audioManager.play('celebration');
      speechManager.speak('Congratulations! You have completed the Periodic Properties and Bonding Laboratory!');
      setActiveTab('summary');
      if (onComplete) onComplete(score + 10);
    }
  };

  // Dynamic Color Helper for elements based on trend
  const getElementColor = (el: ElementInfo): string => {
    if (activePropertyTrend === 'radius') {
      // Radius scale 30 to 260
      const ratio = Math.min(1, Math.max(0, (el.radius - 35) / 225));
      return `rgba(59, 130, 246, ${0.25 + ratio * 0.75})`;
    } else if (activePropertyTrend === 'ip') {
      // IP scale 400 to 2400
      const ratio = Math.min(1, Math.max(0, (el.ip - 400) / 2000));
      return `rgba(239, 68, 68, ${0.25 + ratio * 0.75})`;
    } else if (activePropertyTrend === 'en') {
      // EN scale 0 to 4.0
      const ratio = Math.min(1, Math.max(0, el.en / 4.0));
      return `rgba(16, 185, 129, ${0.25 + ratio * 0.75})`;
    } else if (activePropertyTrend === 'metallic') {
      if (el.metallic === 'high') return 'rgba(245, 158, 11, 0.8)';
      if (el.metallic === 'medium') return 'rgba(245, 158, 11, 0.5)';
      if (el.metallic === 'low') return 'rgba(245, 158, 11, 0.3)';
      return 'rgba(107, 114, 128, 0.4)';
    } else {
      // EA
      const ratio = Math.min(1, Math.max(0, el.ea / 350));
      return `rgba(168, 85, 247, ${0.2 + ratio * 0.8})`;
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 font-sans p-3 md:p-6 flex flex-col items-center select-none">
      {/* Visual Feedback Overlays */}
      <Confetti show={showConfetti} />
      <SparkleBurst show={showSparkle.show} x={showSparkle.x} y={showSparkle.y} />

      {/* HEADER SECTION */}
      <header className="w-full max-w-6xl mb-4 flex flex-col md:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider bg-gold-900/60 text-gold-300 px-2.5 py-1 rounded-full border border-gold-700/50">
              ICSE Class 10 Chemistry
            </span>
            <span className="text-xs text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
              Interactive Lab
            </span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-white mt-1">
            Periodic Properties & Chemical Bonding
          </h1>
        </div>

        {/* Tab Selector Buttons */}
        <nav className="flex flex-wrap items-center gap-1.5 bg-slate-900 p-1.5 rounded-xl border border-slate-800">
          <button
            onClick={() => {
              audioManager.play('tap');
              setActiveTab('explore');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'explore' ? 'bg-gold-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            🔬 Explore Lab
          </button>
          <button
            onClick={() => {
              audioManager.play('tap');
              setActiveTab('predict');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'predict' ? 'bg-purple-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            ❓ Predict Trend
          </button>
          <button
            onClick={() => {
              audioManager.play('tap');
              setActiveTab('slides');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'slides' ? 'bg-gold-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            📚 Lessons ({SLIDES.length})
          </button>
          <button
            onClick={() => {
              audioManager.play('tap');
              setActiveTab('challenges');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'challenges' ? 'bg-amber-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            🎯 Challenges ({CHALLENGES.length})
          </button>
          <button
            onClick={() => {
              audioManager.play('tap');
              setActiveTab('summary');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'summary' ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            📊 Mastery
          </button>
        </nav>
      </header>

      {/* MAIN CONTENT CANVAS AREA */}
      <main className="w-full max-w-6xl flex-1 flex flex-col gap-4">
        {/* TAB 1: EXPLORE LAB */}
        {activeTab === 'explore' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Left Column: Interactive Periodic Grid & Trend Heatmap Controls */}
            <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex flex-col gap-4 shadow-xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h2 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                  <span>🗺️ Periodic Table Heatmap & Selection</span>
                </h2>
                {/* Trend Switcher */}
                <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
                  <button
                    onClick={() => {
                      audioManager.play('tap');
                      setActivePropertyTrend('radius');
                    }}
                    className={`px-2 py-1 rounded text-[11px] font-medium transition ${
                      activePropertyTrend === 'radius' ? 'bg-gold-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Size (pm)
                  </button>
                  <button
                    onClick={() => {
                      audioManager.play('tap');
                      setActivePropertyTrend('ip');
                    }}
                    className={`px-2 py-1 rounded text-[11px] font-medium transition ${
                      activePropertyTrend === 'ip' ? 'bg-red-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    IP (kJ/mol)
                  </button>
                  <button
                    onClick={() => {
                      audioManager.play('tap');
                      setActivePropertyTrend('en');
                    }}
                    className={`px-2 py-1 rounded text-[11px] font-medium transition ${
                      activePropertyTrend === 'en' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    EN (Pauling)
                  </button>
                  <button
                    onClick={() => {
                      audioManager.play('tap');
                      setActivePropertyTrend('metallic');
                    }}
                    className={`px-2 py-1 rounded text-[11px] font-medium transition ${
                      activePropertyTrend === 'metallic' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Metallic
                  </button>
                </div>
              </div>

              {/* Trend Arrow Headers */}
              <div className="relative w-full bg-slate-950/60 p-2 rounded-xl border border-slate-800 text-xs">
                <div className="flex items-center justify-between text-slate-400 font-mono text-[11px] mb-1">
                  <span>← Group 1 (Alkali)</span>
                  <span className="text-gold-400 font-semibold">Across Period: Size Decreases ↓ | IP & EN Increase ↑</span>
                  <span>Group 18 (Noble) →</span>
                </div>
                {/* Visual Periodic Table Grid */}
                <div className="grid grid-cols-8 gap-1.5 my-2">
                  {PERIODIC_TABLE_DATA.map((el) => {
                    const isSelected = el.z === selectedZ;
                    const bgColor = getElementColor(el);
                    return (
                      <motion.button
                        key={el.z}
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleSelectElement(el.z)}
                        style={{ backgroundColor: bgColor }}
                        className={`aspect-square rounded-lg flex flex-col items-center justify-center p-1 border text-center transition-all ${
                          isSelected ? 'border-yellow-400 ring-2 ring-yellow-400/50 shadow-lg scale-105 z-10' : 'border-slate-700/60 hover:border-slate-400'
                        }`}
                      >
                        <span className="text-[10px] opacity-7 font-mono">{el.z}</span>
                        <span className="text-sm font-extrabold text-white leading-none">{el.symbol}</span>
                        <span className="text-[9px] mt-0.5 opacity-9 font-mono">
                          {activePropertyTrend === 'radius' && `${el.radius}pm`}
                          {activePropertyTrend === 'ip' && `${el.ip}`}
                          {activePropertyTrend === 'en' && `${el.en}`}
                          {activePropertyTrend === 'metallic' && el.metallic.substring(0, 3)}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
                <div className="text-[10px] text-slate-400 text-center font-mono mt-1">
                  Click any element tile above to visualize its Bohr shells and nucleus below!
                </div>
              </div>

              {/* Bohr Shell Visualizer for Selected Element */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center relative overflow-hidden">
                <div className="absolute top-2 left-3 text-xs text-slate-400 font-mono">
                  Bohr Model: <span className="text-yellow-400 font-bold">{activeElement.name} ({activeElement.symbol})</span>
                </div>
                <div className="absolute top-2 right-3 text-xs text-slate-400 font-mono">
                  Configuration: <span className="text-emerald-400 font-bold">{activeElement.shells.join(' , ')}</span>
                </div>

                <svg className="w-64 h-64 my-2" viewBox="-120 -120 240 240">
                  {/* Nucleus */}
                  <circle cx="0" cy="0" r="18" className="fill-red-600 stroke-red-400 stroke-2" />
                  <text x="0" y="4" textAnchor="middle" fill="white" className="text-[10px] font-bold font-mono">
                    +{activeElement.z}p
                  </text>

                  {/* Concentric Shells & Orbiting Electrons */}
                  {activeElement.shells.map((count, shellIdx) => {
                    const radius = 35 + shellIdx * 22;
                    return (
                      <g key={shellIdx}>
                        {/* Shell Ring */}
                        <circle cx="0" cy="0" r={radius} fill="none" className="stroke-slate-700 stroke-1 stroke-dasharray-2" />
                        <text x={radius + 3} y="4" fill="#64748b" className="text-[8px] font-mono">
                          {['K', 'L', 'M', 'N'][shellIdx]}
                        </text>

                        {/* Electrons on shell */}
                        {Array.from({ length: count }).map((_, eIdx) => {
                          const angle = (2 * Math.PI * eIdx) / count;
                          const ex = radius * Math.cos(angle);
                          const ey = radius * Math.sin(angle);
                          return (
                            <motion.circle
                              key={eIdx}
                              animate={{
                                cx: [ex, radius * Math.cos(angle + Math.PI / 6), ex],
                                cy: [ey, radius * Math.sin(angle + Math.PI / 6), ey]
                              }}
                              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                              r="4"
                              className="fill-gold-400 stroke-gold-200 stroke-1 shadow-glow"
                            />
                          );
                        })}
                      </g>
                    );
                  })}
                </svg>

                {/* Element Stats Summary Grid */}
                <div className="grid grid-cols-4 gap-2 w-full text-center text-xs mt-1 bg-slate-900/80 p-2 rounded-lg border border-slate-800 font-mono">
                  <div className="p-1">
                    <span className="text-[10px] text-slate-400 block">Radius</span>
                    <span className="text-gold-400 font-bold">{activeElement.radius} pm</span>
                  </div>
                  <div className="p-1">
                    <span className="text-[10px] text-slate-400 block">Ionisation Pot.</span>
                    <span className="text-red-400 font-bold">{activeElement.ip} kJ/mol</span>
                  </div>
                  <div className="p-1">
                    <span className="text-[10px] text-slate-400 block">Electroneg.</span>
                    <span className="text-emerald-400 font-bold">{activeElement.en}</span>
                  </div>
                  <div className="p-1">
                    <span className="text-[10px] text-slate-400 block">Metallic</span>
                    <span className="text-amber-400 font-bold capitalize">{activeElement.metallic}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Bonding Lewis Dot Lab */}
            <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex flex-col gap-4 shadow-xl">
              <div className="border-b border-slate-800 pb-2">
                <h2 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                  <span>⚛️ Chemical Bonding & Lewis Dot Simulator</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Select a required ICSE Class 10 compound to inspect electron dot structures!
                </p>
              </div>

              {/* Compound Selector Pills */}
              <div className="flex flex-wrap gap-1.5">
                {COMPOUND_PRESETS.map((comp) => (
                  <button
                    key={comp.id}
                    onClick={() => {
                      audioManager.play('tap');
                      setSelectedCompound(comp.id);
                      speechManager.speak(`${comp.name}, formula ${comp.formula}. ${comp.type} compound.`);
                    }}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold font-mono border transition ${
                      selectedCompound === comp.id
                        ? comp.type === 'electrovalent'
                          ? 'bg-amber-600/90 text-white border-amber-400 shadow-md'
                          : 'bg-gold-600/90 text-white border-gold-400 shadow-md'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    {comp.formula}
                  </button>
                ))}
              </div>

              {/* Display Active Compound Lewis Dot Box */}
              <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl flex flex-col items-center justify-between flex-1 gap-3">
                <div className="w-full flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-bold font-mono">{activeCompoundObj.name} ({activeCompoundObj.formula})</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      activeCompoundObj.type === 'electrovalent'
                        ? 'bg-amber-950 text-amber-300 border border-amber-800'
                        : 'bg-gold-950 text-gold-300 border border-gold-800'
                    }`}
                  >
                    {activeCompoundObj.type}
                  </span>
                </div>

                {/* Simulated Electron Dot Graphic SVG */}
                <div className="w-full py-6 bg-slate-900/50 rounded-lg border border-slate-800/80 flex flex-col items-center justify-center">
                  <div className="text-xl md:text-2xl font-mono font-bold tracking-widest text-emerald-300 drop-shadow-md">
                    {activeCompoundObj.dotStructureSvg}
                  </div>
                  <div className="mt-3 text-[11px] text-slate-400 font-mono px-4 text-center">
                    {activeCompoundObj.description}
                  </div>
                </div>

                {/* Key Properties Comparison Box */}
                <div className="w-full bg-slate-900 p-3 rounded-lg border border-slate-800 text-xs">
                  <span className="text-slate-400 font-semibold block mb-1">
                    Characteristic Properties of {activeCompoundObj.type === 'electrovalent' ? 'Electrovalent Compounds' : 'Covalent Compounds'}:
                  </span>
                  <ul className="text-[11px] text-slate-300 space-y-1 list-disc list-inside font-mono">
                    {activeCompoundObj.type === 'electrovalent' ? (
                      <>
                        <li>High Melting & Boiling Points (strong ionic electrostatic lattice).</li>
                        <li>Soluble in water (polar), insoluble in non-polar solvents.</li>
                        <li>Conducts electricity ONLY in molten state or aqueous solution!</li>
                      </>
                    ) : (
                      <>
                        <li>Low Melting & Boiling Points (weak intermolecular forces).</li>
                        <li>Insoluble in water, soluble in organic (non-polar) solvents.</li>
                        <li>Non-conductors of electricity (no free mobile ions).</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PREDICT / DISCOVERY QUESTION */}
        {activeTab === 'predict' && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl max-w-3xl mx-auto flex flex-col gap-5">
            <div className="border-b border-slate-800 pb-3">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider font-mono">
                Predict Before Learning
              </span>
              <h2 className="text-lg font-bold text-white mt-1">
                The Atomic Size Paradox across Period 3
              </h2>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              Consider Sodium (Na, Z=11) with 11 protons and 11 electrons, and Chlorine (Cl, Z=17) with 17 protons and 17 electrons. Both elements are in Period 3 and have exactly 3 electron shells (K, L, M).
              <br /><br />
              <strong className="text-yellow-400">Question:</strong> What happens to the atomic radius as you move from Sodium to Chlorine across Period 3?
            </p>

            {/* Options */}
            <div className="flex flex-col gap-3 my-2">
              <button
                onClick={() => handlePredictSubmit(0)}
                className={`w-full text-left p-3.5 rounded-xl border font-medium text-xs transition ${
                  predictionAnswer === 0
                    ? 'bg-purple-900/50 border-purple-500 text-white'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-600 text-slate-300'
                }`}
              >
                A) Atomic size INCREASES because chlorine has 6 more electrons making the atom heavier and bulkier.
              </button>
              <button
                onClick={() => handlePredictSubmit(1)}
                className={`w-full text-left p-3.5 rounded-xl border font-medium text-xs transition ${
                  predictionAnswer === 1
                    ? 'bg-purple-900/50 border-purple-500 text-white'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-600 text-slate-300'
                }`}
              >
                B) Atomic size DECREASES because nuclear charge increases (+17 vs +11) pulling the same 3 shells tighter.
              </button>
              <button
                onClick={() => handlePredictSubmit(2)}
                className={`w-full text-left p-3.5 rounded-xl border font-medium text-xs transition ${
                  predictionAnswer === 2
                    ? 'bg-purple-900/50 border-purple-500 text-white'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-600 text-slate-300'
                }`}
              >
                C) Atomic size stays EXACTLY THE SAME because both atoms have 3 electron shells.
              </button>
            </div>

            {/* Feedback Box */}
            {predictionFeedback && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-xl border text-xs font-mono leading-relaxed ${
                  predictionAnswer === 1 ? 'bg-emerald-950/80 border-emerald-700 text-emerald-200' : 'bg-red-950/80 border-red-700 text-red-200'
                }`}
              >
                {predictionFeedback}
              </motion.div>
            )}

            <div className="flex justify-end mt-2">
              <button
                onClick={() => {
                  audioManager.play('tap');
                  setActiveTab('slides');
                }}
                className="px-4 py-2 bg-gold-600 hover:bg-gold-500 text-white text-xs font-bold rounded-lg transition"
              >
                Proceed to Visual Lessons →
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: VISUAL TEACHING SLIDES */}
        {activeTab === 'slides' && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col gap-4">
            {/* Slide Progress bar */}
            <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
              <div
                className="bg-gold-500 h-full transition-all duration-300"
                style={{ width: `${((currentSlideIndex + 1) / SLIDES.length) * 100}%` }}
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-gold-400 font-semibold">
                Lesson {currentSlideIndex + 1} of {SLIDES.length} (Node ID: {SLIDES[currentSlideIndex].nodeId})
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Topic: Periodic Trends & Bonding
              </span>
            </div>

            {/* Slide Title & Main Card */}
            <div className="bg-slate-950 border border-slate-800 p-5 rounded-xl flex flex-col gap-4">
              <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-2">
                {SLIDES[currentSlideIndex].title}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Visual Diagram Representation */}
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex flex-col items-center justify-center min-h-[180px]">
                  <div className="text-center font-mono text-xs text-gold-300 mb-2 font-bold">
                    Key Concept Illustration
                  </div>
                  <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 w-full text-center text-xs text-slate-300 font-mono">
                    {SLIDES[currentSlideIndex].summary}
                  </div>
                </div>

                {/* Detailed Explanation */}
                <div className="flex flex-col justify-between text-xs space-y-3">
                  <div>
                    <h3 className="font-bold text-slate-300 text-sm mb-1">Detailed Explanation:</h3>
                    <p className="text-slate-400 leading-relaxed font-sans">
                      {SLIDES[currentSlideIndex].detail}
                    </p>
                  </div>

                  <div className="bg-amber-950/40 border border-amber-800/60 p-2.5 rounded-lg text-amber-200">
                    <span className="font-bold text-amber-400 block mb-0.5">💡 ELI5 Analogy:</span>
                    {SLIDES[currentSlideIndex].analogy}
                  </div>

                  <div className="bg-red-950/40 border border-red-800/60 p-2.5 rounded-lg text-red-200">
                    <span className="font-bold text-red-400 block mb-0.5">⚠️ Common Misconception:</span>
                    {SLIDES[currentSlideIndex].misconception}
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
              <button
                onClick={handlePrevSlide}
                disabled={currentSlideIndex === 0}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition ${
                  currentSlideIndex === 0
                    ? 'bg-slate-950 text-slate-600 border border-slate-900 cursor-not-allowed'
                    : 'bg-slate-800 text-white hover:bg-slate-700'
                }`}
              >
                ← Previous Lesson
              </button>
              {currentSlideIndex < SLIDES.length - 1 ? (
                <button
                  onClick={handleNextSlide}
                  className="px-5 py-2 bg-gold-600 hover:bg-gold-500 text-white text-xs font-bold rounded-lg transition"
                >
                  Next Lesson →
                </button>
              ) : (
                <button
                  onClick={() => {
                    audioManager.play('tap');
                    setActiveTab('challenges');
                  }}
                  className="px-5 py-2 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-lg transition"
                >
                  Start Challenges 🎯
                </button>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: INTERACTIVE CHALLENGES */}
        {activeTab === 'challenges' && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col gap-4 max-w-4xl mx-auto w-full">
            {/* Challenge Header & Progress Bar */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-mono text-amber-400 uppercase tracking-wider">
                  Challenge {challengeIndex + 1} of {CHALLENGES.length}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  Node ID: <code className="text-emerald-400">{CHALLENGES[challengeIndex].nodeId}</code> | Score: <span className="text-yellow-400 font-bold">{score}</span>
                </span>
              </div>
              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="bg-amber-500 h-full transition-all duration-300"
                  style={{ width: `${((challengeIndex + 1) / CHALLENGES.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Card */}
            <div className="bg-slate-950 border border-slate-800 p-5 rounded-xl flex flex-col gap-4">
              <h3 className="text-base font-bold text-white">
                {CHALLENGES[challengeIndex].title}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-sans">
                {CHALLENGES[challengeIndex].question}
              </p>

              {/* Options */}
              <div className="grid grid-cols-1 gap-2.5 my-1">
                {CHALLENGES[challengeIndex].options.map((opt, oIdx) => {
                  const isSelected = selectedOption === oIdx;
                  const isCorrect = oIdx === CHALLENGES[challengeIndex].correctIndex;

                  let btnStyle = 'bg-slate-900 border-slate-800 text-slate-200 hover:border-slate-600';
                  if (challengeFeedback !== null) {
                    if (isCorrect) btnStyle = 'bg-emerald-950/90 border-emerald-500 text-emerald-200 font-semibold';
                    else if (isSelected) btnStyle = 'bg-red-950/90 border-red-500 text-red-200';
                  }

                  return (
                    <motion.button
                      key={oIdx}
                      whileHover={{ scale: challengeFeedback ? 1 : 1.01 }}
                      whileTap={{ scale: challengeFeedback ? 1 : 0.98 }}
                      onClick={(e) => handleChallengeSubmit(oIdx, e)}
                      disabled={challengeFeedback !== null}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs leading-normal transition-all ${btnStyle}`}
                    >
                      <span className="font-mono font-bold mr-2 text-slate-400">
                        {['A', 'B', 'C', 'D'][oIdx]}.
                      </span>
                      {opt}
                    </motion.button>
                  );
                })}
              </div>

              {/* Hint Bubble & Toggle */}
              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={() => {
                    audioManager.play('hint');
                    setShowHint(!showHint);
                  }}
                  className="text-xs text-amber-400 hover:text-amber-300 font-mono underline flex items-center gap-1"
                >
                  💡 {showHint ? 'Hide Hint' : 'Show Hint'}
                </button>
              </div>

              <HintBubble show={showHint} text={CHALLENGES[challengeIndex].hint} />

              {/* Explanation & Next Button */}
              {challengeFeedback && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-xl border text-xs font-sans leading-relaxed flex flex-col gap-3 ${
                    challengeFeedback.isCorrect ? 'bg-emerald-950/80 border-emerald-700 text-emerald-200' : 'bg-red-950/80 border-red-700 text-red-200'
                  }`}
                >
                  <div>
                    <strong className="block mb-1 font-bold text-sm">
                      {challengeFeedback.isCorrect ? '🎉 Correct Explanation:' : '❌ Incorrect Explanation:'}
                    </strong>
                    {challengeFeedback.text}
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={handleNextChallenge}
                      className="px-5 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-lg text-xs transition shadow-lg"
                    >
                      {challengeIndex < CHALLENGES.length - 1 ? 'Next Challenge →' : 'View Final Mastery 📊'}
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        )}

        {/* TAB 5: BKT MASTERY SUMMARY */}
        {activeTab === 'summary' && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col gap-6 max-w-4xl mx-auto w-full">
            <div className="text-center border-b border-slate-800 pb-4">
              <SuccessBanner show={true} text="Laboratory & Assessment Completed!" />
              <h2 className="text-xl font-bold text-white mt-3">ICSE Class 10 Chemistry Mastery Report</h2>
              <p className="text-xs text-slate-400 font-mono mt-1">
                Total Score Accumulated: <span className="text-yellow-400 font-bold text-sm">{score} pts</span>
              </p>
            </div>

            {/* BKT Mastery Grid per Node ID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {ALL_NODE_IDS.map((id) => {
                const nodeTitleMap: Record<NodeId, string> = {
                  'c10_chem_001': 'Periodic properties - atomic size',
                  'c10_chem_002': 'Metallic & non-metallic character',
                  'c10_chem_003': 'Ionisation potential',
                  'c10_chem_004': 'Electron affinity',
                  'c10_chem_005': 'Electronegativity',
                  'c10_chem_006': 'Periodicity on basis of Z',
                  'c10_chem_007': 'Detailed study of Period 4',
                  'c10_chem_008': 'Electrovalent bonding - dot structure',
                  'c10_chem_009': 'Properties of electrovalent compounds',
                  'c10_chem_010': 'Covalent bonding - dot structure'
                };

                const masteryVal = bktMasteryMap[id] || 0.5;
                const percentage = Math.round(masteryVal * 100);

                return (
                  <div key={id} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex flex-col gap-2">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-300 font-bold">{nodeTitleMap[id]}</span>
                      <span className="text-emerald-400 font-bold">{percentage}%</span>
                    </div>
                    <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                      <div
                        className="bg-emerald-500 h-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">Node ID: {id}</span>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-center gap-4 pt-2">
              <button
                onClick={() => {
                  audioManager.play('tap');
                  setChallengeIndex(0);
                  setSelectedOption(null);
                  setChallengeFeedback(null);
                  setActiveTab('challenges');
                }}
                className="px-6 py-2.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-xl transition shadow-lg"
              >
                🔄 Retry Challenges
              </button>
              <button
                onClick={() => {
                  audioManager.play('tap');
                  setActiveTab('explore');
                }}
                className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white text-xs font-bold rounded-xl transition shadow-lg"
              >
                🔬 Return to Lab Sandbox
              </button>
            </div>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="w-full max-w-6xl mt-6 border-t border-slate-800/80 pt-3 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 font-mono gap-2">
        <span>Brilliant.org Quality ICSE Chemistry Interactive Engine</span>
        <span>Covers Nodes: c10_chem_001 to c10_chem_010</span>
      </footer>
      {/* Misconception Checklist */}
      <div className="text-left space-y-3 pt-4 border-t border-slate-800 mt-6">
        <h3 className="text-sm font-bold text-amber-300">Common Misconception Checklist:</h3>
        <div className="grid grid-cols-1 gap-2">
          {MISCONCEPTIONS_CHECKLIST.map((m) => (
            <div key={m.id} className="bg-slate-950 border border-slate-800 p-3 rounded-lg text-xs space-y-1">
              <div className="font-bold text-rose-400">{m.title}</div>
              <div className="text-slate-400">{m.description}</div>
              <div className="text-emerald-300 font-medium">✓ Correction: {m.correction}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Default export statement required
// [dup-export removed] export default C10_ChemistryPeriodicpropertiesatomicsizeSim;