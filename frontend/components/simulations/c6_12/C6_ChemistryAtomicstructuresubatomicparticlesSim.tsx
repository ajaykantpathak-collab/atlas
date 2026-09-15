"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

interface Misconception {
  id: string;
  title: string;
  description: string;
  correction: string;
}

// ==========================================
// CONSTANTS & NODE DEFINITIONS
// ==========================================

const NODE_IDS = {
  ATOMIC_STRUCTURE: 'c6_chem_009',
  ATOMIC_MASS_NUM: 'c6_chem_010',
  ELEMENT_SYMBOLS: 'c6_chem_011',
  COMPOUND_FORMULAE: 'c6_chem_012',
  METALS_PROPERTIES: 'c6_chem_013',
  NON_METALS_CORROSION: 'c6_chem_014',
  AIR_COMPOSITION: 'c6_chem_015',
  OXYGEN_ROLE: 'c6_chem_016',
} as const;

const ALL_NODE_IDS = [
  'c6_chem_009',
  'c6_chem_010',
  'c6_chem_011',
  'c6_chem_012',
  'c6_chem_013',
  'c6_chem_014',
  'c6_chem_015',
  'c6_chem_016',
] as const;

// ==========================================
// INTERFACES & TYPES
// ==========================================

interface ElementData {
  z: number;
  symbol: string;
  name: string;
  latinName?: string;
  mass: number;
  valency: number;
  group: number;
  category: 'metal' | 'non-metal' | 'metalloid' | 'noble-gas';
  protons: number;
  neutrons: number;
  electrons: number;
}

interface CompoundData {
  formula: string;
  name: string;
  elements: { symbol: string; count: number }[];
  valenciesUsed: string;
  description: string;
}

interface SlideData {
  id: string;
  nodeId: string;
  title: string;
  subtitle: string;
  content: string;
  keyTakeaway: string;
  interactiveType: 'atom' | 'symbol' | 'formula' | 'material' | 'air' | 'oxygen';
  interactiveData?: any;
}

interface ChallengeOption {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
}

interface Challenge {
  id: string;
  nodeId: string;
  question: string;
  type: 'mcq' | 'builder' | 'match' | 'calculation';
  options: ChallengeOption[];
  hint: string;
  misconceptionId?: string;
  data?: any;
}

// ==========================================
// DATABASE OF CHEMISTRY DATA
// ==========================================

const ELEMENTS: ElementData[] = [
  { z: 1, symbol: 'H', name: 'Hydrogen', mass: 1, valency: 1, group: 1, category: 'non-metal', protons: 1, neutrons: 0, electrons: 1 },
  { z: 2, symbol: 'He', name: 'Helium', mass: 4, valency: 0, group: 18, category: 'noble-gas', protons: 2, neutrons: 2, electrons: 2 },
  { z: 3, symbol: 'Li', name: 'Lithium', mass: 7, valency: 1, group: 1, category: 'metal', protons: 3, neutrons: 4, electrons: 3 },
  { z: 4, symbol: 'Be', name: 'Beryllium', mass: 9, valency: 2, group: 2, category: 'metal', protons: 4, neutrons: 5, electrons: 4 },
  { z: 5, symbol: 'B', name: 'Boron', mass: 11, valency: 3, group: 13, category: 'metalloid', protons: 5, neutrons: 6, electrons: 5 },
  { z: 6, symbol: 'C', name: 'Carbon', mass: 12, valency: 4, group: 14, category: 'non-metal', protons: 6, neutrons: 6, electrons: 6 },
  { z: 7, symbol: 'N', name: 'Nitrogen', mass: 14, valency: 3, group: 15, category: 'non-metal', protons: 7, neutrons: 7, electrons: 7 },
  { z: 8, symbol: 'O', name: 'Oxygen', mass: 16, valency: 2, group: 16, category: 'non-metal', protons: 8, neutrons: 8, electrons: 8 },
  { z: 9, symbol: 'F', name: 'Fluorine', mass: 19, valency: 1, group: 17, category: 'non-metal', protons: 9, neutrons: 10, electrons: 9 },
  { z: 10, symbol: 'Ne', name: 'Neon', mass: 20, valency: 0, group: 18, category: 'noble-gas', protons: 10, neutrons: 10, electrons: 10 },
  { z: 11, symbol: 'Na', name: 'Sodium', latinName: 'Natrium', mass: 23, valency: 1, group: 1, category: 'metal', protons: 11, neutrons: 12, electrons: 11 },
  { z: 12, symbol: 'Mg', name: 'Magnesium', mass: 24, valency: 2, group: 2, category: 'metal', protons: 12, neutrons: 12, electrons: 12 },
  { z: 13, symbol: 'Al', name: 'Aluminium', mass: 27, valency: 3, group: 13, category: 'metal', protons: 13, neutrons: 14, electrons: 13 },
  { z: 14, symbol: 'Si', name: 'Silicon', mass: 28, valency: 4, group: 14, category: 'metalloid', protons: 14, neutrons: 14, electrons: 14 },
  { z: 15, symbol: 'P', name: 'Phosphorus', mass: 31, valency: 3, group: 15, category: 'non-metal', protons: 15, neutrons: 16, electrons: 15 },
  { z: 16, symbol: 'S', name: 'Sulphur', mass: 32, valency: 2, group: 16, category: 'non-metal', protons: 16, neutrons: 16, electrons: 16 },
  { z: 17, symbol: 'Cl', name: 'Chlorine', mass: 35, valency: 1, group: 17, category: 'non-metal', protons: 17, neutrons: 18, electrons: 17 },
  { z: 18, symbol: 'Ar', name: 'Argon', mass: 40, valency: 0, group: 18, category: 'noble-gas', protons: 18, neutrons: 22, electrons: 18 },
  { z: 19, symbol: 'K', name: 'Potassium', latinName: 'Kalium', mass: 39, valency: 1, group: 1, category: 'metal', protons: 19, neutrons: 20, electrons: 19 },
  { z: 20, symbol: 'Ca', name: 'Calcium', mass: 40, valency: 2, group: 2, category: 'metal', protons: 20, neutrons: 20, electrons: 20 },
  { z: 26, symbol: 'Fe', name: 'Iron', latinName: 'Ferrum', mass: 56, valency: 2, group: 8, category: 'metal', protons: 26, neutrons: 30, electrons: 26 },
  { z: 29, symbol: 'Cu', name: 'Copper', latinName: 'Cuprum', mass: 64, valency: 2, group: 11, category: 'metal', protons: 29, neutrons: 35, electrons: 29 },
  { z: 30, symbol: 'Zn', name: 'Zinc', mass: 65, valency: 2, group: 12, category: 'metal', protons: 30, neutrons: 35, electrons: 30 },
  { z: 79, symbol: 'Au', name: 'Gold', latinName: 'Aurum', mass: 197, valency: 1, group: 11, category: 'metal', protons: 79, neutrons: 118, electrons: 79 },
  { z: 47, symbol: 'Ag', name: 'Silver', latinName: 'Argentum', mass: 108, valency: 1, group: 11, category: 'metal', protons: 47, neutrons: 61, electrons: 47 },
  { z: 32, symbol: 'Ge', name: 'Germanium', mass: 73, valency: 4, group: 14, category: 'metalloid', protons: 32, neutrons: 41, electrons: 32 },
  { z: 74, symbol: 'W', name: 'Tungsten', latinName: 'Wolfram', mass: 184, valency: 6, group: 6, category: 'metalloid', protons: 74, neutrons: 110, electrons: 74 },
  { z: 51, symbol: 'Sb', name: 'Antimony', latinName: 'Stibium', mass: 122, valency: 3, group: 15, category: 'metalloid', protons: 51, neutrons: 71, electrons: 51 },
];

const COMPOUNDS: CompoundData[] = [
  { formula: 'H2O', name: 'Water', elements: [{ symbol: 'H', count: 2 }, { symbol: 'O', count: 1 }], valenciesUsed: 'H=1, O=2', description: 'Universal solvent; 2 Hydrogen atoms + 1 Oxygen atom.' },
  { formula: 'NaCl', name: 'Sodium Chloride (Common Salt)', elements: [{ symbol: 'Na', count: 1 }, { symbol: 'Cl', count: 1 }], valenciesUsed: 'Na=1, Cl=1', description: 'Common edible salt mined or harvested from sea water.' },
  { formula: 'CaO', name: 'Calcium Oxide (Quicklime)', elements: [{ symbol: 'Ca', count: 1 }, { symbol: 'O', count: 1 }], valenciesUsed: 'Ca=2, O=2', description: 'Reacts vigorously with water to form slaked lime, giving off heat.' },
  { formula: 'CO2', name: 'Carbon Dioxide', elements: [{ symbol: 'C', count: 1 }, { symbol: 'O', count: 2 }], valenciesUsed: 'C=4, O=2', description: 'Gas used by green plants in photosynthesis; turns limewater milky.' },
  { formula: 'CH4', name: 'Methane', elements: [{ symbol: 'C', count: 1 }, { symbol: 'H', count: 4 }], valenciesUsed: 'C=4, H=1', description: 'Main constituent of natural gas; carbon forms 4 single bonds.' },
  { formula: 'NH3', name: 'Ammonia', elements: [{ symbol: 'N', count: 1 }, { symbol: 'H', count: 3 }], valenciesUsed: 'N=3, H=1', description: 'Pungent gas used in fertilizers; Nitrogen valency is 3.' },
];

// ==========================================
// TEACHING SLIDES DATA
// ==========================================

const SLIDES: SlideData[] = [
  {
    id: 'slide_009',
    nodeId: 'c6_chem_009',
    title: '1. Subatomic Particles & Atomic Architecture',
    subtitle: 'The tiny engine inside all matter',
    content: 'An atom is made of three subatomic particles: Positively charged Protons and neutral Neutrons in the central Nucleus, surrounded by negatively charged Electrons orbiting in shells. An atom is neutral because Protons equal Electrons.',
    keyTakeaway: 'Protons (+1, Nucleus) | Neutrons (0, Nucleus) | Electrons (-1, Outer Shells)',
    interactiveType: 'atom',
    interactiveData: { defaultZ: 11 }, // Sodium
  },
  {
    id: 'slide_010',
    nodeId: 'c6_chem_010',
    title: '2. Atomic Number & Mass Number',
    subtitle: 'The chemical identity card of an element',
    content: 'Atomic Number (Z) is the number of Protons in the nucleus. Mass Number (A) is the total count of Protons + Neutrons. You can easily find Neutrons by subtracting: Neutrons = Mass Number - Atomic Number.',
    keyTakeaway: 'Atomic Number = Protons | Mass Number = Protons + Neutrons | Neutrons = A - Z',
    interactiveType: 'atom',
    interactiveData: { defaultZ: 12 }, // Magnesium
  },
  {
    id: 'slide_011',
    nodeId: 'c6_chem_011',
    title: '3. Language of Chemistry - Element Symbols',
    subtitle: 'International chemical shorthand',
    content: 'Chemists use 1 or 2 letter symbols. First letter is ALWAYS capital, second is ALWAYS lowercase (e.g., Co = Cobalt, but CO = Carbon Monoxide!). Many symbols come from Latin: Natrium → Na (Sodium), Ferrum → Fe (Iron), Kalium → K (Potassium), Aurum → Au (Gold).',
    keyTakeaway: 'Always capitalize first letter only! Historical symbols: Na, K, Fe, Cu, Au, Ag.',
    interactiveType: 'symbol',
  },
  {
    id: 'slide_012',
    nodeId: 'c6_chem_012',
    title: '4. Formulae of Compounds & Word Equations',
    subtitle: 'Combining hands and valencies',
    content: 'Valency is the combining capacity of an element (number of hands it holds). By crossing over valencies, we get compound formulae: Magnesium (valency 2) + Chlorine (valency 1) → Mg1Cl2 → MgCl2! Word equations describe changes: Reactants → Products.',
    keyTakeaway: 'Cross-over method balances valencies. Word equation uses arrow: A + B → C',
    interactiveType: 'formula',
  },
  {
    id: 'slide_013',
    nodeId: 'c6_chem_013',
    title: '5. Metals & Their Physical Character',
    subtitle: 'Lustrous, malleable, and conductive materials',
    content: 'Metals are shiny (lustrous), can be beaten into thin sheets (malleable), drawn into wires (ductile), conduct heat & electricity well, and produce a ringing sound when struck (sonorous). Examples: Iron (Fe), Copper (Cu), Aluminium (Al), Gold (Au).',
    keyTakeaway: 'Malleable = sheets | Ductile = wires | Conductive = allows current/heat | Sonorous = ringing sound',
    interactiveType: 'material',
    interactiveData: { defaultCategory: 'metal' },
  },
  {
    id: 'slide_014',
    nodeId: 'c6_chem_014',
    title: '6. Non-Metals, Metalloids & Corrosion',
    subtitle: 'The opposites, the border elements, and rusting',
    content: 'Non-metals are dull, brittle, and non-conductive (e.g., Coal/Carbon, Sulphur). Metalloids (Si, Ge, W, Sb) show mixed properties. Corrosion is metal wear-away; Rusting of Iron requires BOTH Moisture and Oxygen! Prevention: Painting, Oiling, Galvanization (Zinc coating).',
    keyTakeaway: 'Metalloids: Si, Ge, W, Sb | Rusting needs Moisture + Oxygen | Galvanization = Zinc coating on Iron',
    interactiveType: 'material',
    interactiveData: { defaultCategory: 'non-metal' },
  },
  {
    id: 'slide_015',
    nodeId: 'c6_chem_015',
    title: '7. Air - Composition & Physical Mixture',
    subtitle: 'Why air is a mixture and not a compound',
    content: 'Air is a mixture of 78% Nitrogen, 21% Oxygen, and ~1% minor gases (Argon, Carbon Dioxide, Water Vapour). Because concentrations of water vapour and CO2 change with location and season, air is a physical mixture whose components retain their individual properties.',
    keyTakeaway: '78% N2, 21% O2, 1% others | Variable composition = Physical Mixture',
    interactiveType: 'air',
  },
  {
    id: 'slide_016',
    nodeId: 'c6_chem_016',
    title: '8. Oxygen - Preparation & The Science of Burning',
    subtitle: 'Supporting life and energetic combustion',
    content: 'Oxygen is colourless, odourless, slightly soluble in water, and relights a glowing splint. Laboratory prep: Hydrogen Peroxide breaks down using Manganese Dioxide (MnO2) as a catalyst (speeds reaction without being consumed!). Burning Mg ribbon forms heavier MgO, while candle combustion produces CO2 and water vapour gases.',
    keyTakeaway: 'Glowing splint relights in O2 | MnO2 is a reusable catalyst | Burning Mg gains mass (binds O2)',
    interactiveType: 'oxygen',
  },
];

// ==========================================
// CHALLENGES DATA (10 Progressive Challenges)
// ==========================================

const CHALLENGES: Challenge[] = [
  {
    id: 'ch_1',
    nodeId: 'c6_chem_009',
    question: 'An atom of Sodium has 11 Protons, 12 Neutrons, and 11 Electrons. Where are these subatomic particles located and what are their charges?',
    type: 'mcq',
    hint: 'Protons and Neutrons reside in the central nucleus, while electrons orbit outside.',
    options: [
      { id: 'a', text: 'Protons (+1) & Neutrons (0) in Nucleus; Electrons (-1) in Outer Shells', isCorrect: true, explanation: 'Correct! Protons (+1) and Neutrons (0) form the dense nucleus, balanced by orbiting Electrons (-1).' },
      { id: 'b', text: 'Electrons (-1) & Protons (+1) in Nucleus; Neutrons (0) in Outer Shells', isCorrect: false, explanation: 'Electrons are much lighter and orbit outside the nucleus in shells.' },
      { id: 'c', text: 'All three subatomic particles float freely together in the nucleus', isCorrect: false, explanation: 'Electrons do not exist inside the atomic nucleus.' },
      { id: 'd', text: 'Neutrons (+1) in Nucleus; Protons (-1) in Outer Shells', isCorrect: false, explanation: 'Neutrons are neutral (0 charge) and protons have positive charge (+1).' },
    ],
  },
  {
    id: 'ch_2',
    nodeId: 'c6_chem_010',
    question: 'A sample of Sodium is represented as ²³Na with Atomic Number 11 and Mass Number 23. How many Neutrons are present in its nucleus?',
    type: 'calculation',
    hint: 'Use the formula: Neutrons = Mass Number (A) - Atomic Number (Z).',
    options: [
      { id: 'a', text: '12 Neutrons (23 - 11 = 12)', isCorrect: true, explanation: 'Spot on! Neutrons = Mass Number (23) - Atomic Number (11) = 12.' },
      { id: 'b', text: '23 Neutrons', isCorrect: false, explanation: '23 is the total Mass Number (Protons + Neutrons), not neutrons alone.' },
      { id: 'c', text: '11 Neutrons', isCorrect: false, explanation: '11 is the Atomic Number, which equals the count of Protons.' },
      { id: 'd', text: '34 Neutrons (23 + 11 = 34)', isCorrect: false, explanation: 'Do not add mass number and atomic number! Subtract them.' },
    ],
  },
  {
    id: 'ch_3',
    nodeId: 'c6_chem_011',
    question: 'Why is the chemical symbol for Sodium written as "Na" and Iron as "Fe", rather than "So" or "Ir"?',
    type: 'mcq',
    hint: 'Think about ancient Latin names used by early chemists!',
    options: [
      { id: 'a', text: 'Symbols come from Latin names: Natrium (Na) and Ferrum (Fe)', isCorrect: true, explanation: 'Excellent! Na comes from Natrium and Fe comes from Ferrum.' },
      { id: 'b', text: 'Na stands for "Natural Atomic" and Fe stands for "First Element"', isCorrect: false, explanation: 'Incorrect mnemonic origin.' },
      { id: 'c', text: 'Chemical symbols are chosen completely at random by computer algorithms', isCorrect: false, explanation: 'Symbols follow historical Latin or Greek names.' },
      { id: 'd', text: 'English names were banned in chemistry back in 1950', isCorrect: false, explanation: 'Many English names are used (H, C, O), but older elements keep Latin roots.' },
    ],
  },
  {
    id: 'ch_4',
    nodeId: 'c6_chem_012',
    question: 'Magnesium has a valency of 2 and Chlorine has a valency of 1. What is the correct formula for Magnesium Chloride formed by the cross-over method?',
    type: 'builder',
    hint: 'Cross the valencies: Mg receives subscript 1, Cl receives subscript 2.',
    options: [
      { id: 'a', text: 'MgCl₂', isCorrect: true, explanation: 'Correct! Mg(2) x Cl(1) cross over to give Mg₁Cl₂ which is written as MgCl₂.' },
      { id: 'b', text: 'Mg₂Cl', isCorrect: false, explanation: 'You swapped the subscripts! Mg has valency 2 so Cl gets the subscript 2.' },
      { id: 'c', text: 'MgCl', isCorrect: false, explanation: 'This ignores the valency of Magnesium (2).' },
      { id: 'd', text: 'Mg₂Cl₂', isCorrect: false, explanation: 'Subscripts must be simplified to the lowest whole number ratio.' },
    ],
  },
  {
    id: 'ch_5',
    nodeId: 'c6_chem_013',
    question: 'A blacksmith hammers a red-hot iron rod into a flat plate, while an electrician pulls copper into thin electrical cables. Which two properties of metals are demonstrated?',
    type: 'mcq',
    hint: 'Beaten into sheets = Malleability; Pulled into wires = Ductility.',
    options: [
      { id: 'a', text: 'Hammering = Malleability; Drawing into wires = Ductility', isCorrect: true, explanation: 'Perfect! Malleability allows flattening into sheets; Ductility allows drawing into thin wires.' },
      { id: 'b', text: 'Hammering = Ductility; Drawing into wires = Malleability', isCorrect: false, explanation: 'You reversed the definitions! Remember: Malleable = sheets, Ductile = wires.' },
      { id: 'c', text: 'Hammering = Sonority; Drawing into wires = Conductivity', isCorrect: false, explanation: 'Sonority is ringing sound when struck.' },
      { id: 'd', text: 'Hammering = Rusting; Drawing into wires = Corrosion', isCorrect: false, explanation: 'These are mechanical physical properties, not corrosion.' },
    ],
  },
  {
    id: 'ch_6',
    nodeId: 'c6_chem_014',
    question: 'In a laboratory experiment, three iron nails are tested: Nail A in dry air, Nail B in boiled water under oil, Nail C in moist air. Which nail will rust and why?',
    type: 'mcq',
    hint: 'Rusting requires BOTH oxygen and water vapor simultaneously.',
    options: [
      { id: 'a', text: 'Only Nail C rusts because rusting requires BOTH Moisture and Oxygen together', isCorrect: true, explanation: 'Spot on! Nail A lacks moisture; Nail B lacks oxygen (boiled water + oil seal).' },
      { id: 'b', text: 'Nail B rusts because water alone causes iron to rust', isCorrect: false, explanation: 'Water alone without dissolved oxygen will NOT cause rusting!' },
      { id: 'c', text: 'Nail A rusts because air alone causes iron to rust', isCorrect: false, explanation: 'Dry air without moisture cannot cause rusting.' },
      { id: 'd', text: 'All three nails rust at exactly the same speed', isCorrect: false, explanation: 'Rusting requires the combined action of water and oxygen.' },
    ],
  },
  {
    id: 'ch_7',
    nodeId: 'c6_chem_014',
    question: 'Which group of four elements are classified specifically as METALLOIDS in the Class 6 ICSE chemistry syllabus?',
    type: 'mcq',
    hint: 'Metalloids show intermediate properties between metals and non-metals.',
    options: [
      { id: 'a', text: 'Silicon (Si), Germanium (Ge), Tungsten (W), Antimony (Sb)', isCorrect: true, explanation: 'Correct! These 4 elements are designated as metalloids in the ICSE curriculum.' },
      { id: 'b', text: 'Iron (Fe), Copper (Cu), Aluminium (Al), Gold (Au)', isCorrect: false, explanation: 'These are all classic metals.' },
      { id: 'c', text: 'Carbon (C), Sulphur (S), Oxygen (O), Nitrogen (N)', isCorrect: false, explanation: 'These are all classic non-metals.' },
      { id: 'd', text: 'Helium (He), Neon (Ne), Argon (Ar), Krypton (Kr)', isCorrect: false, explanation: 'These are inert noble gases.' },
    ],
  },
  {
    id: 'ch_8',
    nodeId: 'c6_chem_015',
    question: 'Why is atmospheric Air classified as a PHYSICAL MIXTURE rather than a chemical compound?',
    type: 'mcq',
    hint: 'Think about whether water vapour percentage is the same in a desert vs a seaside coast!',
    options: [
      { id: 'a', text: 'Its components retain their properties and its composition varies by location & humidity', isCorrect: true, explanation: 'Correct! In mixtures, components keep their individual chemical identities and proportions can vary.' },
      { id: 'b', text: 'Because Nitrogen and Oxygen are chemically bonded with double bonds in air', isCorrect: false, explanation: 'Gases in air are uncombined floating molecules.' },
      { id: 'c', text: 'Because air always contains exactly 50% oxygen everywhere on Earth', isCorrect: false, explanation: 'Air contains ~21% oxygen and its minor components vary.' },
      { id: 'd', text: 'Because air cannot be separated by any physical method', isCorrect: false, explanation: 'Air can be physically liquefied and separated by fractional distillation.' },
    ],
  },
  {
    id: 'ch_9',
    nodeId: 'c6_chem_016',
    question: 'When a piece of Magnesium ribbon is burned in air, a white ash (Magnesium Oxide) is collected in a crucible. Why is the mass of the ash GREATER than the original ribbon?',
    type: 'mcq',
    hint: 'Where did the extra atoms in the white ash come from during burning?',
    options: [
      { id: 'a', text: 'Magnesium combined with Oxygen from the air to form MgO solid', isCorrect: true, explanation: 'Brilliant! Solid MgO contains the original Mg atoms plus bound Oxygen atoms from the air.' },
      { id: 'b', text: 'Heat adds mass to chemical elements when burned', isCorrect: false, explanation: 'Heat is energy, not matter, and has no weight.' },
      { id: 'c', text: 'Magnesium transformed into a heavier radioactive element', isCorrect: false, explanation: 'Burning is a standard chemical reaction, not nuclear transmutation!' },
      { id: 'd', text: 'The ash absorbed nitrogen and argon to double its size', isCorrect: false, explanation: 'Magnesium primarily reacts with oxygen during combustion in air.' },
    ],
  },
  {
    id: 'ch_10',
    nodeId: 'c6_chem_016',
    question: 'In the laboratory preparation of Oxygen from Hydrogen Peroxide, Manganese Dioxide (MnO₂) is added. What is the exact role of MnO₂?',
    type: 'mcq',
    hint: 'Does MnO2 get consumed in the reaction, or can it be filtered and reused?',
    options: [
      { id: 'a', text: 'It acts as a Catalyst: speeds up breakdown without being consumed', isCorrect: true, explanation: 'Correct! MnO₂ accelerates H₂O₂ decomposition into H₂O + O₂ and remains unchanged.' },
      { id: 'b', text: 'It is a reactant that burns up to produce pure Manganese gas', isCorrect: false, explanation: 'MnO₂ is not consumed in the reaction.' },
      { id: 'c', text: 'It absorbs oxygen gas so it can be collected in solid form', isCorrect: false, explanation: 'Oxygen gas bubbles out into the gas jar.' },
      { id: 'd', text: 'It cools down the reaction so it does not explode', isCorrect: false, explanation: 'Catalysts alter reaction rates, not serve as cooling agents.' },
    ],
  },
];

// ==========================================
// VISUAL ANIMATED COMPONENTS
// ==========================================

// 1. ATOM VISUALIZER (Protons, Neutrons, Electrons)
const AtomVisualizer: React.FC<{ element: ElementData }> = ({ element }) => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setRotation((prev) => (prev + 2) % 360);
    }, 30);
    return () => clearInterval(timer);
  }, []);

  // Compute shell electrons (2, 8, 8, 2 layout)
  const shells = useMemo(() => {
    let rem = element.electrons;
    const config: number[] = [];
    const capacity = [2, 8, 8, 2];
    for (const cap of capacity) {
      if (rem <= 0) break;
      const count = Math.min(rem, cap);
      config.push(count);
      rem -= count;
    }
    return config;
  }, [element.electrons]);

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-slate-900 rounded-2xl shadow-inner border border-slate-700">
      <div className="text-center mb-2">
        <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold">Atom Architecture</span>
        <h3 className="text-xl font-extrabold text-white">
          {element.name} ({element.symbol})
        </h3>
        <p className="text-xs text-slate-300">
          Z = {element.z} | Mass A = {element.mass} | Valency = {element.valency}
        </p>
      </div>

      <svg width="280" height="280" viewBox="0 0 280 280" className="overflow-visible">
        {/* Glow background */}
        <circle cx="140" cy="140" r="120" fill="url(#atomGlow)" opacity="0.15" />
        <defs>
          <radialGradient id="atomGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#000000" />
          </radialGradient>
        </defs>

        {/* Orbit Shells */}
        {shells.map((count, sIdx) => {
          const radius = 45 + sIdx * 30;
          return (
            <g key={`shell-${sIdx}`}>
              <circle
                cx="140"
                cy="140"
                r={radius}
                fill="none"
                stroke="#475569"
                strokeWidth="1.5"
                strokeDasharray="4 3"
              />
              {/* Electrons */}
              {Array.from({ length: count }).map((_, eIdx) => {
                const angle = (360 / count) * eIdx + (sIdx % 2 === 0 ? rotation : -rotation);
                const rad = (angle * Math.PI) / 180;
                const ex = 140 + radius * Math.cos(rad);
                const ey = 140 + radius * Math.sin(rad);
                return (
                  <g key={`e-${sIdx}-${eIdx}`}>
                    <circle cx={ex} cy={ey} r="6" fill="#38BDF8" className="shadow-lg" />
                    <circle cx={ex} cy={ey} r="2" fill="#FFFFFF" />
                  </g>
                );
              })}
            </g>
          );
        })}

        {/* Central Nucleus */}
        <g transform="translate(140, 140)">
          <circle cx="0" cy="0" r="24" fill="#1E293B" stroke="#F59E0B" strokeWidth="2.5" />
          {/* Protons & Neutrons clusters */}
          {Array.from({ length: Math.min(element.protons, 6) }).map((_, i) => {
            const a = (i * 60 * Math.PI) / 180;
            return <circle key={`p-${i}`} cx={8 * Math.cos(a)} cy={8 * Math.sin(a)} r="5" fill="#EF4444" />;
          })}
          {Array.from({ length: Math.min(element.neutrons, 6) }).map((_, i) => {
            const a = ((i * 60 + 30) * Math.PI) / 180;
            return <circle key={`n-${i}`} cx={9 * Math.cos(a)} cy={9 * Math.sin(a)} r="5" fill="#94A3B8" />;
          })}
          <text x="0" y="4" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold">
            {element.symbol}
          </text>
        </g>
      </svg>

      {/* Legend & Count pill */}
      <div className="flex gap-4 text-xs mt-2 bg-slate-800 px-3 py-1.5 rounded-full border border-slate-700">
        <span className="flex items-center gap-1 text-red-400 font-medium">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block"></span> Protons: {element.protons}
        </span>
        <span className="flex items-center gap-1 text-slate-300 font-medium">
          <span className="w-2.5 h-2.5 rounded-full bg-slate-400 inline-block"></span> Neutrons: {element.neutrons}
        </span>
        <span className="flex items-center gap-1 text-sky-400 font-medium">
          <span className="w-2.5 h-2.5 rounded-full bg-sky-400 inline-block"></span> Electrons: {element.electrons}
        </span>
      </div>
    </div>
  );
};

// 2. MATERIAL TESTER VISUALIZER (Metals, Non-metals, Metalloids, Corrosion)
const MaterialTesterVisualizer: React.FC<{ category: 'metal' | 'non-metal' | 'metalloid' }> = ({ category }) => {
  const [testMode, setTestMode] = useState<'hammer' | 'circuit' | 'rust'>('hammer');
  const [animating, setAnimating] = useState(false);
  const [resultText, setResultText] = useState('');

  const runTest = (mode: 'hammer' | 'circuit' | 'rust') => {
    setTestMode(mode);
    setAnimating(true);
    audioManager.play('tap');

    setTimeout(() => {
      setAnimating(false);
      if (mode === 'hammer') {
        if (category === 'metal') setResultText('FLATTENED! Metal is Malleable (forms thin sheet without cracking).');
        else if (category === 'non-metal') setResultText('SHATTERED! Non-metal is Brittle (crumbles into pieces).');
        else setResultText('SLIGHT FLEX & CHIP! Metalloid shows intermediate hardness.');
      } else if (mode === 'circuit') {
        if (category === 'metal') setResultText('BULB GLOWS BRIGHTLY! Good conductor of electricity.');
        else if (category === 'non-metal') setResultText('BULB STAYS DARK! Poor conductor (Insulator).');
        else setResultText('BULB GLOWS DIMLY! Semi-conductor behaviour (e.g., Silicon/Germanium).');
      } else {
        if (category === 'metal') setResultText('RUST / CORROSION FORMED! Requires Moisture (H2O) + Oxygen (O2).');
        else setResultText('NO CORROSION! Non-metals do not form rust oxides like Iron.');
      }
      audioManager.play('success');
    }, 1200);
  };

  return (
    <div className="flex flex-col items-center bg-slate-900 p-4 rounded-2xl border border-slate-700 text-white w-full">
      <div className="flex justify-between items-center w-full mb-3">
        <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">Virtual Material Testing Bench</span>
        <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase bg-slate-800 text-cyan-300 border border-slate-700">
          Sample: {category.toUpperCase()}
        </span>
      </div>

      {/* Test Buttons */}
      <div className="flex gap-2 mb-4 w-full justify-center">
        <button
          onClick={() => runTest('hammer')}
          className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
            testMode === 'hammer' ? 'bg-amber-500 text-slate-950 shadow-lg' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          🔨 Hammer (Malleability)
        </button>
        <button
          onClick={() => runTest('circuit')}
          className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
            testMode === 'circuit' ? 'bg-amber-500 text-slate-950 shadow-lg' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          💡 Electric Circuit
        </button>
        <button
          onClick={() => runTest('rust')}
          className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
            testMode === 'rust' ? 'bg-amber-500 text-slate-950 shadow-lg' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          💧 Water + O₂ (Rust Chamber)
        </button>
      </div>

      {/* Animation Viewport */}
      <div className="relative w-full h-44 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-center overflow-hidden">
        {testMode === 'hammer' && (
          <div className="relative flex flex-col items-center">
            {/* Hammer */}
            <motion.div
              animate={animating ? { rotate: [0, -35, 0], y: [0, -20, 10, 0] } : {}}
              transition={{ duration: 0.6, repeat: animating ? 2 : 0 }}
              className="text-4xl mb-2 origin-bottom-right"
            >
              🔨
            </motion.div>
            {/* Sample block */}
            <div
              className={`h-8 transition-all duration-500 rounded flex items-center justify-center font-bold text-xs ${
                category === 'metal'
                  ? animating
                    ? 'w-44 bg-amber-400 text-slate-950'
                    : 'w-24 bg-amber-500 text-slate-950'
                  : category === 'non-metal'
                  ? animating
                    ? 'w-16 bg-stone-600 text-stone-300 border-2 border-dashed border-red-500'
                    : 'w-24 bg-stone-700 text-stone-300'
                  : 'w-24 bg-cyan-700 text-cyan-100'
              }`}
            >
              {category === 'metal' ? 'Iron / Copper' : category === 'non-metal' ? 'Coal / Sulphur' : 'Silicon / Germanium'}
            </div>
          </div>
        )}

        {testMode === 'circuit' && (
          <div className="flex items-center gap-6">
            {/* Battery */}
            <div className="w-12 h-16 bg-slate-800 border-2 border-slate-600 rounded flex flex-col items-center justify-center text-[10px] font-bold text-amber-400">
              ⚡ 9V
            </div>
            {/* Wire line */}
            <div className="h-1 w-12 bg-amber-400"></div>
            {/* Sample block */}
            <div
              className={`px-3 py-2 rounded text-xs font-bold ${
                category === 'metal'
                  ? 'bg-amber-500 text-slate-950'
                  : category === 'non-metal'
                  ? 'bg-stone-700 text-stone-300'
                  : 'bg-cyan-700 text-cyan-100'
              }`}
            >
              Sample
            </div>
            {/* Wire line */}
            <div className="h-1 w-12 bg-amber-400"></div>
            {/* Light bulb */}
            <motion.div
              animate={
                category === 'metal'
                  ? { scale: [1, 1.2, 1], filter: ['brightness(1)', 'brightness(2)', 'brightness(1)'] }
                  : {}
              }
              transition={{ repeat: Infinity, duration: 1 }}
              className={`text-4xl ${category === 'metal' ? 'drop-shadow-[0_0_15px_rgba(251,191,36,0.9)]' : 'opacity-40'}`}
            >
              💡
            </motion.div>
          </div>
        )}

        {testMode === 'rust' && (
          <div className="flex flex-col items-center">
            <div className="flex gap-3 mb-2 text-xs text-sky-300 font-mono">
              <motion.span animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1 }}>
                💧 H₂O Moisture
              </motion.span>
              <motion.span animate={{ y: [5, 0, 5] }} transition={{ repeat: Infinity, duration: 1 }}>
                💨 O₂ Oxygen
              </motion.span>
            </div>
            <div
              className={`w-32 h-10 rounded flex items-center justify-center font-bold text-xs transition-colors duration-1000 ${
                category === 'metal' ? (animating ? 'bg-amber-800 text-orange-200 border-2 border-orange-600' : 'bg-slate-600 text-slate-200') : 'bg-stone-700 text-stone-300'
              }`}
            >
              {category === 'metal' ? (animating ? ' Rust (Fe₂O₃·xH₂O)' : 'Clean Iron Nail') : 'No Rusting'}
            </div>
          </div>
        )}
      </div>

      {/* Result banner */}
      {resultText && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 p-2 bg-slate-800 text-emerald-300 text-xs font-semibold rounded-lg text-center w-full border border-slate-700"
        >
          {resultText}
        </motion.div>
      )}
    </div>
  );
};

// 3. AIR COMPOSITION PIE CHART & GAS TESTER
const AirCompositionVisualizer: React.FC = () => {
  const [humidity, setHumidity] = useState(1); // 1% to 4%
  const [activeGas, setActiveGas] = useState<string | null>(null);

  const gasInfo: Record<string, { desc: string; test: string }> = {
    Nitrogen: { desc: '78% of air volume. Inactive gas; prevents rapid burning & supports plant growth via fertilizers.', test: 'Does not support combustion; turns non-reactive in normal conditions.' },
    Oxygen: { desc: '21% of air volume. Essential for cellular respiration & combustion.', test: 'Relights a glowing wooden splint!' },
    Argon: { desc: '0.93% noble gas. Completely chemically inert.', test: 'Used in electric light bulbs to prevent filament oxidation.' },
    CO2: { desc: '0.04% minor gas. Used by green plants in photosynthesis.', test: 'Turns clear limewater milky (calcium carbonate precipitate).' },
    WaterVapour: { desc: `Variable (${humidity}%). Decides humidity & weather rain.`, test: 'Turns blue anhydrous cobalt chloride paper to pink.' },
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-4 bg-slate-900 p-4 rounded-2xl border border-slate-700 text-white w-full">
      {/* Interactive Pie SVG */}
      <div className="flex flex-col items-center">
        <svg width="200" height="200" viewBox="0 0 200 200" className="cursor-pointer">
          {/* Nitrogen 78% (280.8 deg) */}
          <path
            d="M 100 100 L 100 10 A 90 90 0 1 1 14.5 127.8 Z"
            fill="#3B82F6"
            onClick={() => setActiveGas('Nitrogen')}
            className="hover:opacity-80 transition-opacity"
          />
          {/* Oxygen 21% (75.6 deg) */}
          <path
            d="M 100 100 L 14.5 127.8 A 90 90 0 0 1 94.3 10.1 Z"
            fill="#10B981"
            onClick={() => setActiveGas('Oxygen')}
            className="hover:opacity-80 transition-opacity"
          />
          {/* Others 1% */}
          <path
            d="M 100 100 L 94.3 10.1 A 90 90 0 0 1 100 10 Z"
            fill="#F59E0B"
            onClick={() => setActiveGas('CO2')}
            className="hover:opacity-80 transition-opacity"
          />
          <circle cx="100" cy="100" r="35" fill="#0F172A" />
          <text x="100" y="104" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold">
            AIR
          </text>
        </svg>

        <div className="flex gap-2 text-[10px] mt-2 font-bold">
          <span className="text-blue-400">■ N₂ (78%)</span>
          <span className="text-emerald-400">■ O₂ (21%)</span>
          <span className="text-amber-400">■ Minor (1%)</span>
        </div>
      </div>

      {/* Info & Humidity Slider */}
      <div className="flex-1 flex flex-col justify-between w-full">
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 min-h-[110px]">
          {activeGas ? (
            <div>
              <h4 className="text-sm font-bold text-cyan-400">{activeGas}</h4>
              <p className="text-xs text-slate-300 mt-1">{gasInfo[activeGas].desc}</p>
              <p className="text-[11px] text-amber-300 font-semibold mt-2">🧪 Test: {gasInfo[activeGas].test}</p>
            </div>
          ) : (
            <div className="text-xs text-slate-400 text-center py-4">
              👈 Click any slice of the air pie chart to explore its gas properties & diagnostic test!
            </div>
          )}
        </div>

        {/* Humidity control */}
        <div className="mt-3 bg-slate-800 p-2.5 rounded-xl border border-slate-700">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-slate-300 font-semibold">Simulate Humidity (Water Vapour):</span>
            <span className="text-cyan-400 font-bold">{humidity}% (Variable Component)</span>
          </div>
          <input
            type="range"
            min="1"
            max="4"
            step="1"
            value={humidity}
            onChange={(e) => setHumidity(Number(e.target.value))}
            className="w-full accent-cyan-400 cursor-pointer"
          />
          <p className="text-[10px] text-slate-400 mt-1">
            Note: Variable components like water vapour prove air is a <strong>Physical Mixture</strong>, not a compound!
          </p>
        </div>
      </div>
    </div>
  );
};

// 4. OXYGEN PREPARATION & COMBULSION BALANCER
const OxygenLabVisualizer: React.FC = () => {
  const [isPrepActive, setIsPrepActive] = useState(false);
  const [splintTested, setSplintTested] = useState(false);

  const startLabPrep = () => {
    setIsPrepActive(true);
    setSplintTested(false);
    audioManager.play('whoosh');
    speechManager.speak('Decomposing Hydrogen Peroxide with Manganese Dioxide catalyst to yield Oxygen gas!');

    setTimeout(() => {
      audioManager.play('sparkle');
    }, 2000);
  };

  const testSplint = () => {
    setSplintTested(true);
    audioManager.play('success');
    speechManager.speak('Glowing splint bursts into flame! Oxygen supports combustion.');
  };

  return (
    <div className="flex flex-col items-center bg-slate-900 p-4 rounded-2xl border border-slate-700 text-white w-full">
      <div className="flex justify-between items-center w-full mb-3">
        <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold">Oxygen Lab Prep Simulator</span>
        <span className="text-xs text-slate-400">2H₂O₂ (aq) ⎯MnO₂⎯→ 2H₂O (l) + O₂ (g)</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        {/* Lab Equipment View */}
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex flex-col items-center justify-center relative min-h-[160px]">
          {/* Flask & Bubbles */}
          <div className="relative flex flex-col items-center">
            {/* Oxygen Gas Jar */}
            <div className="w-16 h-24 border-2 border-slate-500 rounded-t-lg bg-slate-900/50 relative overflow-hidden flex flex-col justify-end items-center">
              {isPrepActive && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: '80%' }}
                  transition={{ duration: 2 }}
                  className="w-full bg-emerald-500/20 flex flex-col items-center justify-center"
                >
                  <span className="text-[10px] font-bold text-emerald-300">O₂ Gas</span>
                  {/* Floating bubbles */}
                  <motion.div
                    animate={{ y: [-10, -50] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="text-xs"
                  >
                    🫧🫧
                  </motion.div>
                </motion.div>
              )}
            </div>

            {/* Glowing Splint */}
            {splintTested && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-4 text-2xl drop-shadow-[0_0_12px_rgba(239,68,68,1)]"
              >
                🔥
              </motion.div>
            )}
          </div>

          <div className="flex gap-2 mt-3">
            <button
              onClick={startLabPrep}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-xs font-bold rounded-lg text-white transition-all shadow-md"
            >
              ⚗️ Add MnO₂ Catalyst
            </button>
            <button
              disabled={!isPrepActive}
              onClick={testSplint}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all shadow-md ${
                isPrepActive ? 'bg-amber-500 hover:bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-600 cursor-not-allowed'
              }`}
            >
              🪵 Test Glowing Splint
            </button>
          </div>
        </div>

        {/* Reaction Facts */}
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex flex-col justify-center text-xs space-y-2">
          <div className="p-2 bg-slate-900 rounded border border-slate-800">
            <span className="text-amber-400 font-bold">1. Catalyst (MnO₂):</span>
            <p className="text-slate-300">Speeds up breakdown of H₂O₂ without being used up. Recoverable & reusable!</p>
          </div>
          <div className="p-2 bg-slate-900 rounded border border-slate-800">
            <span className="text-emerald-400 font-bold">2. Combustion Mass Gain:</span>
            <p className="text-slate-300">Burning Mg ribbon produces Mg + O₂ → MgO (white ash). Ash is heavier than metal!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── MISCONCEPTIONS CHECKLIST ───
const MISCONCEPTIONS_CHECKLIST: Misconception[] = [
  {
    id: "misc_1",
    title: "Atoms Are Solid Spheres with No Internal Parts",
    description: "Students often believe that atoms are hard, indivisible, solid spheres similar to marbles or billiard balls. They think atoms have no internal components or subatomic particles inside them.",
    correction: "Dalton originally proposed that atoms were indivisible spheres, but later discoveries proved this concept incomplete. An atom actually consists of a central nucleus surrounded by tiny electrons moving around it. The nucleus itself is made up of smaller subatomic particles called protons and neutrons.",
  },
  {
    id: "misc_2",
    title: "Atoms Are Completely Filled with No Empty Space",
    description: "Students frequently assume that an atom is packed tightly with subatomic particles, leaving no open space inside. They imagine the inside of an atom as a dense, fully packed solid sphere.",
    correction: "In reality, an atom is composed almost entirely of empty space. The tiny nucleus occupies a minuscule volume at the center, while electrons move at relatively large distances around it. If the nucleus were the size of a marble, the entire atom would be larger than a football stadium.",
  },
  {
    id: "misc_3",
    title: "Protons Neutrons and Electrons Have Equal Mass",
    description: "Students often think all subatomic particles are equal in size and mass because they are all tiny components of an atom. They assume an electron weighs the same as a proton or neutron.",
    correction: "Protons and neutrons have nearly equal mass and account for almost all of an atom's weight. In contrast, an electron is extremely light, having roughly 1/1836th the mass of a proton. Because of this, the mass of electrons is considered negligible when calculating atomic mass.",
  },
  {
    id: "misc_4",
    title: "Dalton Theory Proves Atoms Can Never Be Divided",
    description: "Students often believe that John Dalton's original statement about atoms being ultimate indivisible units remains completely true today. They think it is physically impossible for an atom to be broken down.",
    correction: "Dalton's atomic theory was a major breakthrough, but modern chemistry has modified his postulate on indivisibility. Scientists discovered that atoms can be divided into subatomic particles such as protons, neutrons, and electrons. Furthermore, nuclear reactions are capable of splitting atomic nuclei into smaller fragments.",
  },
  {
    id: "misc_5",
    title: "Electrons Orbit Nucleus Exactly Like Planets Around Sun",
    description: "Students frequently picture electrons moving along fixed, rigid circular tracks around the nucleus, just like planets orbiting the Sun. They assume electrons follow strict, predictable 2D paths.",
    correction: "While the solar system analogy helps introduce atomic structure, electrons do not move along fixed two-dimensional tracks. Instead, electrons move extremely fast in three-dimensional regions called shells or energy levels around the nucleus. Modern atomic models describe these movements as clouds of electron probability rather than simple circular orbits.",
  },
];

// ==========================================
// MAIN COMPONENT
// ==========================================

export default function C6_ChemistryAtomicstructuresubatomicparticlesSim() {
  // Navigation & State
  const [activeTab, setActiveTab] = useState<'slides' | 'lab' | 'challenges'>('slides');
  const [currentSlideIdx, setCurrentSlideIdx] = useState(0);
  const [currentChallengeIdx, setCurrentChallengeIdx] = useState(0);
  const [selectedElement, setSelectedElement] = useState<ElementData>(ELEMENTS[10]); // Sodium
  const [labCategory, setLabCategory] = useState<'metal' | 'non-metal' | 'metalloid'>('metal');

  // Interactive challenge states
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);

  // SRS & BKT State tracking per node
  const [bktStateMap, setBktStateMap] = useState<Record<string, any>>(() => {
    const initial: Record<string, any> = {};
    ALL_NODE_IDS.forEach((id) => {
      initial[id] = createBKTState();
    });
    return initial;
  });

  const currentSlide = SLIDES[currentSlideIdx];
  const currentChallenge = CHALLENGES[currentChallengeIdx];

  // Auto-hint timer (10s inactivity)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (activeTab === 'challenges' && !isAnswerSubmitted) {
        setShowHint(true);
        audioManager.play('hint');
      }
    }, 10000);
    return () => clearTimeout(timer);
  }, [activeTab, currentChallengeIdx, isAnswerSubmitted]);

  // Next slide handler
  const handleNextSlide = () => {
    audioManager.play('swoop');
    if (currentSlideIdx < SLIDES.length - 1) {
      setCurrentSlideIdx((prev) => prev + 1);
    } else {
      setActiveTab('lab');
      speechManager.speak('Welcome to the Virtual Chemistry Laboratory! Explore atoms, materials, and air composition.');
    }
  };

  const handlePrevSlide = () => {
    audioManager.play('swoop');
    if (currentSlideIdx > 0) {
      setCurrentSlideIdx((prev) => prev - 1);
    }
  };

  // Challenge option select
  const handleOptionSelect = (optionId: string) => {
    if (isAnswerSubmitted) return;
    setSelectedOptionId(optionId);
    audioManager.play('pop');
  };

  // Submit challenge answer
  const handleSubmitAnswer = () => {
    if (!selectedOptionId || isAnswerSubmitted) return;

    setIsAnswerSubmitted(true);
    const selectedOpt = currentChallenge.options.find((o) => o.id === selectedOptionId);
    const isCorrect = !!selectedOpt?.isCorrect;

    // Update BKT & SRS
    const nodeId = currentChallenge.nodeId;
    const currentBKT = bktStateMap[nodeId] || createBKTState();
    const updatedBKT = bktUpdate(currentBKT, isCorrect);

    setBktStateMap((prev) => ({
      ...prev,
      [nodeId]: updatedBKT,
    }));

    // Record SRS item
    const reviewItem = createReviewItem(currentChallenge.id, nodeId);
    sm2Update(reviewItem, isCorrect ? 5 : 2);

    if (isCorrect) {
      audioManager.play('drop-correct');
      audioManager.play('chime');
      setScore((prev) => prev + 10);
      setStreak((prev) => prev + 1);
      setShowSparkle(true);
      speechManager.speak(selectedOpt?.explanation || 'Excellent job!');

      if (streak + 1 >= 3) {
        setShowConfetti(true);
        audioManager.play('celebration');
      }
    } else {
      audioManager.play('drop-wrong');
      setStreak(0);
      speechManager.speak(selectedOpt?.explanation || 'Not quite right. Review the key takeaway.');
    }

    // Save game score to local storage store
    recordGameScore(nodeId, isCorrect ? 10 : 0, 10);
  };

  // Next Challenge
  const handleNextChallenge = () => {
    setIsAnswerSubmitted(false);
    setSelectedOptionId(null);
    setShowHint(false);
    setShowSparkle(false);
    setShowConfetti(false);

    audioManager.play('swoop');
    if (currentChallengeIdx < CHALLENGES.length - 1) {
      setCurrentChallengeIdx((prev) => prev + 1);
    } else {
      setShowSuccess(true);
      audioManager.play('celebration');
      speechManager.speak('Congratulations! You have mastered Class 6 ICSE Chemistry atomic structures, elements, metals, air and oxygen!');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans select-none">
      {/* Visual Feedback Overlays */}
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccess} text="Unit Mastered! Chemistry Champion 🏆" />
      <SparkleBurst show={showSparkle} x={400} y={300} />

      {/* HEADER BAR */}
      <header className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex flex-wrap items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-xl">
            🧪
          </div>
          <div>
            <h1 className="text-base font-extrabold text-white leading-tight">Class 6 ICSE Chemistry</h1>
            <p className="text-xs text-slate-400">Atomic Structure, Elements, Compounds, Metals & Air</p>
          </div>
        </div>

        {/* Tab Navigation Pill */}
        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => {
              setActiveTab('slides');
              audioManager.play('tap');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'slides' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            📚 Learning Path
          </button>
          <button
            onClick={() => {
              setActiveTab('lab');
              audioManager.play('tap');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'lab' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            🔬 Virtual Lab
          </button>
          <button
            onClick={() => {
              setActiveTab('challenges');
              audioManager.play('tap');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'challenges' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            🎯 Master Challenges
          </button>
        </div>

        {/* Score & Streak counter */}
        <div className="flex items-center gap-3 text-xs font-bold">
          <span className="px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-amber-400">
            🔥 Streak: {streak}
          </span>
          <span className="px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-emerald-400">
            ⭐ Score: {score}
          </span>
        </div>
      </header>

      {/* NODE MASTERY BADGES BAR */}
      <div className="bg-slate-900/60 border-b border-slate-800/80 px-4 py-1.5 flex gap-2 overflow-x-auto text-[10px] scrollbar-none">
        {ALL_NODE_IDS.map((id) => {
          const bkt = bktStateMap[id] || createBKTState();
          const p = bkt.p_know;
          return (
            <div
              key={id}
              className={`px-2 py-0.5 rounded-full border flex items-center gap-1.5 shrink-0 ${
                p > 0.8
                  ? 'bg-emerald-950/60 text-emerald-300 border-emerald-700'
                  : p > 0.4
                  ? 'bg-amber-950/60 text-amber-300 border-amber-700'
                  : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}
            >
              <span className="font-mono">{id.replace('c6_chem_', '#')}</span>
              <span className="font-bold">{(p * 100).toFixed(0)}%</span>
            </div>
          );
        })}
      </div>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-4 flex flex-col justify-center">
        {/* TAB 1: TEACHING SLIDES */}
        {activeTab === 'slides' && (
          <div className="flex flex-col gap-4">
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-xl flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold">
                    Slide {currentSlideIdx + 1} of {SLIDES.length} • Node: {currentSlide.nodeId}
                  </span>
                  <h2 className="text-2xl font-black text-white mt-1">{currentSlide.title}</h2>
                  <p className="text-sm text-slate-400 font-medium">{currentSlide.subtitle}</p>
                </div>
              </div>

              {/* Dynamic Visual Area based on Interactive Type */}
              <div className="w-full my-2">
                {currentSlide.interactiveType === 'atom' && <AtomVisualizer element={selectedElement} />}
                {currentSlide.interactiveType === 'material' && (
                  <MaterialTesterVisualizer category={labCategory} />
                )}
                {currentSlide.interactiveType === 'air' && <AirCompositionVisualizer />}
                {currentSlide.interactiveType === 'oxygen' && <OxygenLabVisualizer />}
                {(currentSlide.interactiveType === 'symbol' || currentSlide.interactiveType === 'formula') && (
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-wrap gap-2 justify-center">
                    {ELEMENTS.slice(0, 12).map((el) => (
                      <button
                        key={el.symbol}
                        onClick={() => setSelectedElement(el)}
                        className={`p-2 rounded-xl border text-center transition-all ${
                          selectedElement.symbol === el.symbol
                            ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-bold scale-105'
                            : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="text-lg font-black">{el.symbol}</div>
                        <div className="text-[10px]">{el.name}</div>
                        {el.latinName && <div className="text-[9px] text-amber-300">({el.latinName})</div>}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Text walkthrough & Key takeaway */}
              <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
                {currentSlide.content}
              </p>

              <div className="bg-emerald-950/40 border border-emerald-800/60 p-3 rounded-xl flex items-center gap-3">
                <span className="text-xl">💡</span>
                <p className="text-xs text-emerald-300 font-semibold">{currentSlide.keyTakeaway}</p>
              </div>

              {/* Navigation Footer */}
              <div className="flex justify-between items-center pt-2 border-t border-slate-800">
                <button
                  disabled={currentSlideIdx === 0}
                  onClick={handlePrevSlide}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    currentSlideIdx === 0
                      ? 'bg-slate-800 text-slate-600 cursor-not-allowed'
                      : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                  }`}
                >
                  ◀ Previous
                </button>
                <div className="flex gap-1">
                  {SLIDES.map((_, i) => (
                    <div
                      key={i}
                      className={`h-2 rounded-full transition-all ${
                        i === currentSlideIdx ? 'w-6 bg-emerald-400' : 'w-2 bg-slate-800'
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={handleNextSlide}
                  className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-extrabold rounded-xl transition-all shadow-lg"
                >
                  {currentSlideIdx === SLIDES.length - 1 ? 'Go to Virtual Lab 🔬' : 'Next Concept ▶'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: VIRTUAL LAB */}
        {activeTab === 'lab' && (
          <div className="flex flex-col gap-4">
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 shadow-xl flex flex-col gap-4">
              <div className="flex flex-wrap justify-between items-center gap-2">
                <div>
                  <h2 className="text-xl font-extrabold text-white">Interactive Chemistry Workbench</h2>
                  <p className="text-xs text-slate-400">Manipulate elements, perform tests, build compounds</p>
                </div>

                {/* Sub-mode selector */}
                <div className="flex gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
                  <button
                    onClick={() => setLabCategory('metal')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                      labCategory === 'metal' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
                    }`}
                  >
                    Metals
                  </button>
                  <button
                    onClick={() => setLabCategory('non-metal')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                      labCategory === 'non-metal' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
                    }`}
                  >
                    Non-Metals
                  </button>
                  <button
                    onClick={() => setLabCategory('metalloid')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                      labCategory === 'metalloid' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
                    }`}
                  >
                    Metalloids
                  </button>
                </div>
              </div>

              {/* Element Selector Grid */}
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-2 block">
                  Select Element to Inspect Atom Structure:
                </span>
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                  {ELEMENTS.map((el) => (
                    <button
                      key={el.symbol}
                      onClick={() => {
                        setSelectedElement(el);
                        audioManager.play('tap');
                      }}
                      className={`px-3 py-2 rounded-xl border shrink-0 text-center transition-all ${
                        selectedElement.symbol === el.symbol
                          ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-bold scale-105'
                          : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="text-xs font-mono font-black">{el.symbol}</div>
                      <div className="text-[10px]">{el.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Atom & Tester visualizers grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AtomVisualizer element={selectedElement} />
                <MaterialTesterVisualizer category={labCategory} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AirCompositionVisualizer />
                <OxygenLabVisualizer />
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ADAPTIVE CHALLENGES */}
        {activeTab === 'challenges' && (
          <div className="flex flex-col gap-4">
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-xl flex flex-col gap-5">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <div>
                  <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold">
                    Challenge {currentChallengeIdx + 1} of {CHALLENGES.length} • Node: {currentChallenge.nodeId}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-1">{currentChallenge.question}</h3>
                </div>
              </div>

              {/* Options list */}
              <div className="grid grid-cols-1 gap-3">
                {currentChallenge.options.map((opt) => {
                  const isSelected = selectedOptionId === opt.id;
                  let btnStyle = 'bg-slate-950 text-slate-200 border-slate-800 hover:border-slate-700';

                  if (isAnswerSubmitted) {
                    if (opt.isCorrect) {
                      btnStyle = 'bg-emerald-950/80 text-emerald-200 border-emerald-500 ring-2 ring-emerald-500/50';
                    } else if (isSelected && !opt.isCorrect) {
                      btnStyle = 'bg-red-950/80 text-red-200 border-red-500 ring-2 ring-red-500/50';
                    }
                  } else if (isSelected) {
                    btnStyle = 'bg-slate-800 text-white border-amber-500 ring-2 ring-amber-500/50';
                  }

                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleOptionSelect(opt.id)}
                      className={`p-4 rounded-xl border text-left text-sm font-medium transition-all flex items-start gap-3 ${btnStyle}`}
                    >
                      <span className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        {opt.id.toUpperCase()}
                      </span>
                      <div className="flex-1">
                        <div>{opt.text}</div>
                        {isAnswerSubmitted && (isSelected || opt.isCorrect) && (
                          <div className="text-xs mt-2 text-slate-300 font-normal bg-slate-900/80 p-2 rounded border border-slate-800">
                            {opt.explanation}
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Hint Bubble */}
              <HintBubble show={showHint} text={currentChallenge.hint} />

              {/* Footer Actions */}
              <div className="flex justify-between items-center pt-3 border-t border-slate-800">
                <button
                  onClick={() => setShowHint((prev) => !prev)}
                  className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
                >
                  💡 {showHint ? 'Hide Hint' : 'Need a Hint?'}
                </button>

                {!isAnswerSubmitted ? (
                  <button
                    disabled={!selectedOptionId}
                    onClick={handleSubmitAnswer}
                    className={`px-6 py-2.5 rounded-xl text-xs font-black transition-all shadow-lg ${
                      selectedOptionId
                        ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
                        : 'bg-slate-800 text-slate-600 cursor-not-allowed'
                    }`}
                  >
                    Check Answer ✓
                  </button>
                ) : (
                  <button
                    onClick={handleNextChallenge}
                    className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black rounded-xl transition-all shadow-lg"
                  >
                    {currentChallengeIdx === CHALLENGES.length - 1 ? 'Finish Challenge 🏆' : 'Next Challenge ▶'}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

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
      </main>
    </div>
  );
}