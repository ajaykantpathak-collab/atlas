'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, masteryProb } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ==========================================
// CONSTANTS & NODE DEFINITIONS
// ==========================================
const ALL_NODE_IDS = [
  'c9_chem_001',
  'c9_chem_002',
  'c9_chem_003',
  'c9_chem_004',
  'c9_chem_005',
  'c9_chem_006',
  'c9_chem_007',
  'c9_chem_008',
  'c9_chem_009',
  'c9_chem_010',
] as const;

type NodeId = typeof ALL_NODE_IDS[number];

// ==========================================
// MANDATORY SECTION 1: SCENARIO
// ==========================================
const SCENARIO = {
  title: 'IUPAC Chemical Symbol & Formula Laboratory',
  intro: 'Welcome to the Central Nomenclature Bureau! As a Junior Chemical Inspector for ICSE Standards, your mission is to master the universal language of chemistry—from ancient Latin root names to precision chemical formulas.',
  context: 'You will investigate how chemical symbols prevent dangerous lab mix-ups (like confusing Cobalt Co with Carbon Monoxide CO), analyze atomic nuclide symbols, balance valencies with the criss-cross method, and decipher complex radicals.',
};

// ==========================================
// MANDATORY SECTION 2: DISCOVERY QUESTION
// ==========================================
const DISCOVERY_QUESTION = {
  question: 'In a sealed gas cylinder marked "CO", a technician claims it contains pure Cobalt. Is this label correct?',
  options: [
    'Yes, CO is the standard two-letter chemical symbol for Cobalt.',
    'No, CO stands for Carbon Monoxide (a compound), while Cobalt is written Co.',
    'Yes, chemical symbols can be written in all uppercase letters without changing meaning.',
    'No, Cobalt is represented by the symbol Cb, while CO is Copper Oxide.'
  ],
  correctIndex: 1,
  hintAfter: 'According to IUPAC standards, the second letter of an element symbol MUST be lowercase. Writing two capital letters (CO) signifies a compound of Carbon (C) and Oxygen (O).',
};

// ==========================================
// DATA TYPES & ELEMENT KNOWLEDGE BASE
// ==========================================
interface ElementInfo {
  id: string;
  name: string;
  latinName?: string;
  symbol: string;
  atomicNumber: number;
  massNumber: number;
  valency: number[];
  category: 'metal' | 'nonmetal' | 'metalloid' | 'noble_gas';
  derivation: 'English' | 'Latin' | 'German' | 'Systematic';
  daltonSymbol: string;
  electronConfig: number[];
  description: string;
}

const ELEMENT_DATABASE: ElementInfo[] = [
  { id: 'H', name: 'Hydrogen', symbol: 'H', atomicNumber: 1, massNumber: 1, valency: [1], category: 'nonmetal', derivation: 'English', daltonSymbol: '⚪', electronConfig: [1], description: 'Lightest element, forms diatomic H₂ gas.' },
  { id: 'He', name: 'Helium', symbol: 'He', atomicNumber: 2, massNumber: 4, valency: [0], category: 'noble_gas', derivation: 'English', daltonSymbol: 'Ⓚ', electronConfig: [2], description: 'Unreactive noble gas with complete duplet.' },
  { id: 'C', name: 'Carbon', symbol: 'C', atomicNumber: 6, massNumber: 12, valency: [4], category: 'nonmetal', derivation: 'English', daltonSymbol: '⚫', electronConfig: [2, 4], description: 'Tetravalent basis of organic life.' },
  { id: 'N', name: 'Nitrogen', symbol: 'N', atomicNumber: 7, massNumber: 14, valency: [3], category: 'nonmetal', derivation: 'English', daltonSymbol: '⊘', electronConfig: [2, 5], description: 'Diatomic N₂ gas forming 78% of Earth atmosphere.' },
  { id: 'O', name: 'Oxygen', symbol: 'O', atomicNumber: 8, massNumber: 16, valency: [2], category: 'nonmetal', derivation: 'English', daltonSymbol: '⭕', electronConfig: [2, 6], description: 'Essential diatomic O₂ gas for respiration.' },
  { id: 'Na', name: 'Sodium', latinName: 'Natrium', symbol: 'Na', atomicNumber: 11, massNumber: 23, valency: [1], category: 'metal', derivation: 'Latin', daltonSymbol: 'Ⓢ', electronConfig: [2, 8, 1], description: 'Highly reactive alkali metal derived from Latin Natrium.' },
  { id: 'Mg', name: 'Magnesium', symbol: 'Mg', atomicNumber: 12, massNumber: 24, valency: [2], category: 'metal', derivation: 'English', daltonSymbol: 'Ⓞ', electronConfig: [2, 8, 2], description: 'Alkaline earth metal burning with dazzling white flame.' },
  { id: 'Al', name: 'Aluminium', symbol: 'Al', atomicNumber: 13, massNumber: 27, valency: [3], category: 'metal', derivation: 'English', daltonSymbol: 'Ⓐ', electronConfig: [2, 8, 3], description: 'Trivalent lightweight metal.' },
  { id: 'K', name: 'Potassium', latinName: 'Kalium', symbol: 'K', atomicNumber: 19, massNumber: 39, valency: [1], category: 'metal', derivation: 'Latin', daltonSymbol: 'Ⓟ', electronConfig: [2, 8, 8, 1], description: 'Soft alkali metal derived from Latin Kalium.' },
  { id: 'Ca', name: 'Calcium', symbol: 'Ca', atomicNumber: 20, massNumber: 40, valency: [2], category: 'metal', derivation: 'English', daltonSymbol: 'Ⓒ', electronConfig: [2, 8, 8, 2], description: 'Essential mineral for bones and shells.' },
  { id: 'Fe', name: 'Iron', latinName: 'Ferrum', symbol: 'Fe', atomicNumber: 26, massNumber: 56, valency: [2, 3], category: 'metal', derivation: 'Latin', daltonSymbol: 'Ⓘ', electronConfig: [2, 8, 14, 2], description: 'Shows variable valency: Ferrous (2) and Ferric (3).' },
  { id: 'Cu', name: 'Copper', latinName: 'Cuprum', symbol: 'Cu', atomicNumber: 29, massNumber: 64, valency: [1, 2], category: 'metal', derivation: 'Latin', daltonSymbol: 'Ⓒ', electronConfig: [2, 8, 18, 1], description: 'Exhibits Cuprous (1) and Cupric (2) states.' },
  { id: 'Ag', name: 'Silver', latinName: 'Argentum', symbol: 'Ag', atomicNumber: 47, massNumber: 108, valency: [1], category: 'metal', derivation: 'Latin', daltonSymbol: 'Ⓢ', electronConfig: [2, 8, 18, 18, 1], description: 'Precious metal derived from Latin Argentum.' },
  { id: 'Au', name: 'Gold', latinName: 'Aurum', symbol: 'Au', atomicNumber: 79, massNumber: 197, valency: [1, 3], category: 'metal', derivation: 'Latin', daltonSymbol: 'Ⓖ', electronConfig: [2, 8, 18, 32, 18, 1], description: 'Lustrous noble metal derived from Latin Aurum (shining dawn).' },
  { id: 'Hg', name: 'Mercury', latinName: 'Hydrargyrum', symbol: 'Hg', atomicNumber: 80, massNumber: 201, valency: [1, 2], category: 'metal', derivation: 'Latin', daltonSymbol: '☿', electronConfig: [2, 8, 18, 32, 18, 2], description: 'Liquid metal derived from Greek/Latin Hydrargyrum (liquid silver).' },
  { id: 'Pb', name: 'Lead', latinName: 'Plumbum', symbol: 'Pb', atomicNumber: 82, massNumber: 207, valency: [2, 4], category: 'metal', derivation: 'Latin', daltonSymbol: 'Ⓛ', electronConfig: [2, 8, 18, 32, 18, 4], description: 'Heavy metal derived from Latin Plumbum (plumbing).' },
  { id: 'Sn', name: 'Tin', latinName: 'Stannum', symbol: 'Sn', atomicNumber: 50, massNumber: 119, valency: [2, 4], category: 'metal', derivation: 'Latin', daltonSymbol: 'Ⓣ', electronConfig: [2, 8, 18, 18, 4], description: 'Derived from Latin Stannum, forms Stannous (2) & Stannic (4).' },
  { id: 'Sb', name: 'Antimony', latinName: 'Stibium', symbol: 'Sb', atomicNumber: 51, massNumber: 122, valency: [3, 5], category: 'metalloid', derivation: 'Latin', daltonSymbol: 'Ⓢ', electronConfig: [2, 8, 18, 18, 5], description: 'Metalloid derived from Latin Stibium.' },
  { id: 'W', name: 'Tungsten', latinName: 'Wolfram', symbol: 'W', atomicNumber: 74, massNumber: 184, valency: [6], category: 'metal', derivation: 'German', daltonSymbol: 'Ⓦ', electronConfig: [2, 8, 18, 32, 12, 2], description: 'High melting point metal derived from German Wolfram.' },
];

interface PolyatomicRadical {
  id: string;
  name: string;
  formula: string;
  charge: number;
  type: 'cation' | 'anion';
  structure: string;
}

const RADICALS: PolyatomicRadical[] = [
  { id: 'NH4', name: 'Ammonium', formula: 'NH₄⁺', charge: 1, type: 'cation', structure: '1 Nitrogen, 4 Hydrogen atoms' },
  { id: 'OH', name: 'Hydroxide', formula: 'OH⁻', charge: -1, type: 'anion', structure: '1 Oxygen, 1 Hydrogen atom' },
  { id: 'NO3', name: 'Nitrate', formula: 'NO₃⁻', charge: -1, type: 'anion', structure: '1 Nitrogen, 3 Oxygen atoms' },
  { id: 'HCO3', name: 'Bicarbonate (Hydrogen Carbonate)', formula: 'HCO₃⁻', charge: -1, type: 'anion', structure: '1 H, 1 C, 3 O atoms' },
  { id: 'CO3', name: 'Carbonate', formula: 'CO₃²⁻', charge: -2, type: 'anion', structure: '1 Carbon, 3 Oxygen atoms' },
  { id: 'SO4', name: 'Sulfate', formula: 'SO₄²⁻', charge: -2, type: 'anion', structure: '1 Sulfur, 4 Oxygen atoms' },
  { id: 'PO4', name: 'Phosphate', formula: 'PO₄³⁻', charge: -3, type: 'anion', structure: '1 Phosphorus, 4 Oxygen atoms' },
];

// DEFAULT PROPS / CONSTANTS
const DEFAULT_PROPS = {
  initialNodeId: 'c9_chem_001' as NodeId,
  autoStart: true,
};

// ==========================================
// MANDATORY SECTION 3: EXPLORATION STEPS (5 Labs)
// ==========================================
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Symbol Capitalization & History Lab',
    instruction: 'Compare John Dalton pictorial symbols with Jöns Jacob Berzelius letter symbols. Practice typing element symbols with correct uppercase/lowercase rules and observe compound vs element confusion (e.g., CO vs Co).',
    interactionType: 'case_formatter',
    nodeId: 'c9_chem_001',
  },
  {
    title: 'Lab 2: Latin Name Rosetta Stone',
    instruction: 'Explore elements whose modern symbols originate from Latin or German names (e.g., Sodium/Natrium -> Na, Lead/Plumbum -> Pb, Gold/Aurum -> Au). Match modern symbols to their classical roots.',
    interactionType: 'latin_origin_decoder',
    nodeId: 'c9_chem_004',
  },
  {
    title: 'Lab 3: Nuclide & Diatomic Molecule Inspector',
    instruction: 'Adjust atomic number (Z), mass number (A), and atomic count to see how chemical symbols display isotopes, ionic charges, and diatomic state (e.g., single atom O vs diatomic molecule O₂).',
    interactionType: 'nuclide_inspector',
    nodeId: 'c9_chem_005',
  },
  {
    title: 'Lab 4: Valency & Polyatomic Radical Analyzer',
    instruction: 'Examine valence electrons, variable valency (Fe²⁺/Fe³⁺), and multi-atom radical ions (SO₄²⁻, NH₄⁺) to understand their combining power.',
    interactionType: 'valency_radical_studio',
    nodeId: 'c9_chem_007',
  },
  {
    title: 'Lab 5: Interactive Criss-Cross Formula Synthesizer',
    instruction: 'Combine cations and anions using the Criss-Cross valency rule. Observe how subscript numbers are calculated, simplified, and surrounded by parentheses when radicals are multiplied.',
    interactionType: 'criss_cross_builder',
    nodeId: 'c9_chem_009',
  },
];

// ==========================================
// MANDATORY SECTION 4: PREDICTION QUESTIONS
// ==========================================
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If an element has a Latin name "Stannum" and forms a compound with Chlorine (valency 1) where Stannum exhibits a valency of 4, what will be its chemical symbol and formula?',
    options: [
      'St and StCl₄',
      'Sn and SnCl₄',
      'Sb and SbCl₄',
      'St and Sn₄Cl'
    ],
    correctIndex: 1,
    verifyInstruction: 'Select Tin (Stannum) in Lab 2 and build its chloride formula in Lab 5 to verify.',
    nodeId: 'c9_chem_004',
  },
  {
    question: 'Predict: What is the correct empirical formula formed when Calcium (valency 2) reacts with the Phosphate radical (PO₄, valency 3)?',
    options: [
      'CaPO₄',
      'Ca₃PO₄₂',
      'Ca₃(PO₄)₂',
      'Ca₂(PO₄)₃'
    ],
    correctIndex: 2,
    verifyInstruction: 'Use the Criss-Cross Formula Synthesizer in Lab 5 with Ca²⁺ and PO₄³⁻.',
    nodeId: 'c9_chem_009',
  },
];

// ==========================================
// MANDATORY SECTION 5: OBSERVATION QUESTIONS
// ==========================================
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice when both letters of a symbol like "co" or "Co" are typed as capital "CO"?',
    observableOptions: [
      'It represents two atoms of Cobalt.',
      'It represents Carbon Monoxide (a compound of Carbon & Oxygen), not Cobalt.',
      'The atomic mass doubles.',
      'The IUPAC system permits both CO and Co for Cobalt.'
    ],
    correctIndex: 1,
    nodeId: 'c9_chem_002',
  },
  {
    question: 'What happens to the valency subscripts in the formula for Calcium Oxide (Ca²⁺ and O²⁻) during the criss-cross process?',
    observableOptions: [
      'The formula becomes Ca₂O₂ and remains unreduced.',
      'The valencies cross over and simplify to a 1:1 ratio, resulting in CaO.',
      'Calcium takes a subscript of 4 while Oxygen takes 0.',
      'The charges disappear without affecting subscripts.'
    ],
    correctIndex: 1,
    nodeId: 'c9_chem_009',
  },
];

// ==========================================
// MANDATORY SECTION 6: REAL WORLD ACTIVITY
// ==========================================
const REAL_WORLD_ACTIVITY = {
  title: 'Industrial Chemical Reagent Inventory Audit',
  description: 'As a chemical quality engineer, you are auditing safety storage barrels in a semiconductor manufacturing facility. Damaged labels can lead to catastrophic hazardous reactions.',
  steps: [
    'Inspect barrel tag marked "NAOH": Correct capitalization to "NaOH" (Sodium Hydroxide) following IUPAC single-letter & two-letter capitalization rules.',
    'Verify tank label "FE2(SO4)3": Identify Iron(III) Sulfate created from Ferric ion (Fe³⁺) and Sulfate radical (SO₄²⁻). Confirm valence balance: 2 × (+3) = +6 and 3 × (-2) = -6.',
    'Audit heavy metal storage labeled "HYDRARGYRUM": Cross-reference symbol Hg (Mercury, Z=80) derived from liquid silver.',
    'Report formula discrepancy on bottle marked "CACO3": Re-label as "CaCO₃" (Calcium Carbonate) with proper subscript notation for polyatomic carbonate radical.',
  ],
};

// ==========================================
// EXISTING & EXPANDED MISCONCEPTIONS
// ==========================================
const MISCONCEPTIONS = [
  {
    title: 'Capitalization ambiguity',
    misconception: 'Chemical symbols can be written using all capital letters.',
    correction: 'According to IUPAC rules, the first letter is ALWAYS uppercase and the second letter MUST be lowercase. Writing both in uppercase creates a compound (e.g., CO = Carbon Monoxide vs Co = Cobalt).',
    nodeId: 'c9_chem_002',
  },
  {
    title: 'English name origin assumption',
    misconception: 'Element symbols are always derived from their English names.',
    correction: 'Many key elements derive symbols from Latin (Na from Natrium, K from Kalium, Fe from Ferrum, Pb from Plumbum) or German (W from Wolfram).',
    nodeId: 'c9_chem_004',
  },
  {
    title: 'Symbol equals valency myth',
    misconception: 'An element symbol indicates its combining capacity directly.',
    correction: 'A symbol represents one atom of an element. Valency is determined by valence electron interactions and is written separately as charge or subscript in compounds.',
    nodeId: 'c9_chem_007',
  },
  {
    title: 'Diatomic symbol confusion',
    misconception: 'Symbols of diatomic elements must always include subscript numbers (e.g. symbol of oxygen is O₂).',
    correction: 'The atomic symbol of oxygen is simply O. O₂ represents the molecular formula of elemental oxygen gas containing two bonded atoms.',
    nodeId: 'c9_chem_006',
  },
  {
    title: 'Regional symbol variation belief',
    misconception: 'Chemical symbols vary across different countries and languages.',
    correction: 'IUPAC standardizes chemical symbols universally across the world regardless of local translation of element names.',
    nodeId: 'c9_chem_010',
  },
  {
    title: 'Parentheses in polyatomic formulas',
    misconception: 'Parentheses around radicals are optional when taking multiple units in a formula.',
    correction: 'Parentheses are strictly required when a polyatomic radical has a subscript greater than 1 (e.g., Ca(OH)₂ vs CaOH₂). CaOH₂ incorrectly means 1 Ca, 1 O, 2 H.',
    nodeId: 'c9_chem_008',
  },
];

// ==========================================
// MANDATORY SECTION 7: 22+ CHALLENGES (3 TIERS)
// ==========================================
export interface Challenge {
  id: string;
  nodeId: NodeId;
  type: 'mcq' | 'matching' | 'formula_builder' | 'text_input';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: string;
  question: string;
  options?: string[];
  correctIndex?: number;
  correctAnswer?: string;
  formulaTarget?: { cation: string; anion: string; cationValency: number; anionValency: number; correctFormula: string };
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
}

const CHALLENGES: Challenge[] = [
  // --- FOUNDATION TIER (7 Challenges) ---
  {
    id: 'ch_01',
    nodeId: 'c9_chem_001',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Recall & Understanding',
    question: 'Who introduced the modern chemical symbol notation system based on initial letters of element names?',
    options: ['John Dalton', 'Jöns Jacob Berzelius', 'Antoine Lavoisier', 'Dmitri Mendeleev'],
    correctIndex: 1,
    explanation: 'Jöns Jacob Berzelius proposed using the first letter (or first letter plus another letter) of the Latin/English element name to represent chemical elements.',
    hints: ['Dalton used pictorial circles with symbols inside.', 'Berzelius revolutionized chemical notation in 1813.', 'The Swedish chemist simplified communication for modern chemistry.'],
  },
  {
    id: 'ch_02',
    nodeId: 'c9_chem_002',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Rule Application',
    question: 'Which of the following follows IUPAC standard capitalization for the chemical symbol of Calcium?',
    options: ['CA', 'ca', 'Ca', 'cA'],
    correctIndex: 2,
    explanation: 'IUPAC capitalization rules dictate that the first letter is uppercase and the second letter is lowercase: Ca.',
    hints: ['First letter MUST be capital.', 'Second letter MUST be lowercase.', 'Combined: C + a = Ca.'],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_03',
    nodeId: 'c9_chem_003',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Symbol Identification',
    question: 'Which element symbol is derived directly from its English name using two letters?',
    options: ['Na (Sodium)', 'He (Helium)', 'Fe (Iron)', 'K (Potassium)'],
    correctIndex: 1,
    explanation: 'Helium (He) is derived directly from its English name. Sodium (Na=Natrium), Iron (Fe=Ferrum), and Potassium (K=Kalium) derive from Latin.',
    hints: ['Look for the element whose symbol matches its English spelling.', 'Sodium comes from Natrium.', 'Helium uses H + e.'],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_04',
    nodeId: 'c9_chem_004',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Latin Root Identification',
    question: 'What is the Latin name from which the chemical symbol "Fe" for Iron is derived?',
    options: ['Ferrum', 'Plumbum', 'Natrium', 'Kalium'],
    correctIndex: 0,
    explanation: 'The symbol Fe comes from the Latin name "Ferrum".',
    hints: ['Think of ferrous and ferric ions.', 'Plumbum is Lead.', 'Ferrum gives Fe.'],
  },
  {
    id: 'ch_05',
    nodeId: 'c9_chem_005',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Nuclide Notation',
    question: 'In standard atomic notation ₁₁²³Na, what does the subscript 11 represent?',
    options: ['Mass Number (A)', 'Atomic Number (Z) / Proton Count', 'Number of Neutrons', 'Valency of Sodium'],
    correctIndex: 1,
    explanation: 'The subscript Z on the lower left of an element symbol represents the Atomic Number (number of protons).',
    hints: ['Subscript is on the bottom left.', 'Mass number is on top.', 'Atomic number equals proton number.'],
  },
  {
    id: 'ch_06',
    nodeId: 'c9_chem_006',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Diatomic Symbol Clarity',
    question: 'What is the correct chemical SYMBOL for the element Hydrogen (as distinct from its gas molecule)?',
    options: ['H₂', 'H', 'H⁺', '2H'],
    correctIndex: 1,
    explanation: 'The chemical symbol for the element Hydrogen is H. H₂ represents a diatomic molecule of hydrogen gas.',
    hints: ['An element symbol represents a single atom.', 'Subscript 2 indicates a diatomic molecule.', 'The symbol itself is just one letter.'],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_07',
    nodeId: 'c9_chem_007',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Valency Definition',
    question: 'What does the valency of an element measure?',
    options: ['The total weight of the nucleus', 'The combining capacity of an atom with other atoms', 'The physical density at STP', 'The atomic radius in picometers'],
    correctIndex: 1,
    explanation: 'Valency represents the combining capacity of an atom, determined by how many electrons it gains, loses, or shares to achieve a stable octet/duplet.',
    hints: ['It is related to bond formation.', 'Think of combining power.', 'Octet rule achievement.'],
    misconceptionIndex: 2,
  },

  // --- STANDARD TIER (8 Challenges) ---
  {
    id: 'ch_08',
    nodeId: 'c9_chem_002',
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Distinguishing Compounds vs Elements',
    question: 'Distinguish between the notations "NO" and "No":',
    options: [
      'NO is Nobelium; No is Nitrogen Oxide',
      'NO is a compound (Nitrogen Monoxide); No is the element Nobelium',
      'Both represent Nitrogen Oxide in different IUPAC editions',
      'NO is Nitrous Oxide; No is Nonium'
    ],
    correctIndex: 1,
    explanation: 'NO features two capital letters representing two elements (Nitrogen & Oxygen forming Nitrogen Monoxide), whereas No is the element Nobelium (atomic number 102).',
    hints: ['Check capitalization of both letters.', 'Two capitals = compound.', 'Capital + lowercase = single element.'],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_09',
    nodeId: 'c9_chem_004',
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Latin Root Matching',
    question: 'Which Latin name-symbol pair is INCORRECTLY matched?',
    options: ['Plumbum -> Pb', 'Stannum -> Sn', 'Kalium -> K', 'Hydrargyrum -> Hg', 'Stibium -> Sb', 'Aurum -> Ag'],
    correctIndex: 5,
    explanation: 'Aurum gives the symbol Au (Gold). Ag comes from Argentum (Silver).',
    hints: ['Aurum is Gold (Au).', 'Argentum is Silver (Ag).', 'Identify the mismatched pair.'],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_10',
    nodeId: 'c9_chem_008',
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Radical Identification',
    question: 'What is the formula and charge of the Ammonium radical?',
    options: ['NH₃ with charge 0', 'NH₄⁺ with charge +1', 'NO₃⁻ with charge -1', 'NH₄²⁺ with charge +2'],
    correctIndex: 1,
    explanation: 'The Ammonium radical is NH₄⁺, a polyatomic cation with a charge of +1.',
    hints: ['Ammonium is a polyatomic positive ion (cation).', 'It contains 1 Nitrogen and 4 Hydrogens.', 'Charge is +1.'],
  },
  {
    id: 'ch_11',
    nodeId: 'c9_chem_007',
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Variable Valency Naming',
    question: 'Iron forms two common cations: Fe²⁺ and Fe³⁺. According to IUPAC classical naming, Fe²⁺ is named:',
    options: ['Ferric ion', 'Ferrous ion', 'Iron(III) ion', 'Ferride ion'],
    correctIndex: 1,
    explanation: 'The lower valency state (+2) ends in "-ous" (Ferrous), while the higher valency state (+3) ends in "-ic" (Ferric).',
    hints: ['Lower valency gets -ous.', 'Higher valency gets -ic.', 'Fe²⁺ has lower charge than Fe³⁺.'],
  },
  {
    id: 'ch_12',
    nodeId: 'c9_chem_009',
    type: 'formula_builder',
    difficulty: 'standard',
    competencyLevel: 'Formula Writing',
    question: 'Construct the empirical chemical formula for Aluminium Oxide using Aluminium (valency 3) and Oxygen (valency 2).',
    formulaTarget: { cation: 'Al', anion: 'O', cationValency: 3, anionValency: 2, correctFormula: 'Al₂O₃' },
    explanation: 'By the criss-cross rule: Al³⁺ and O²⁻ exchange valency numbers as subscripts -> Al₂O₃.',
    hints: ['Cross the valency of Al (3) to O.', 'Cross the valency of O (2) to Al.', 'Combine as Al₂O₃.'],
  },
  {
    id: 'ch_13',
    nodeId: 'c9_chem_005',
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Isotope Nuclide Calculation',
    question: 'An atom is represented as ₁���³⁷Cl. How many neutrons are present in its nucleus?',
    options: ['17', '37', '20', '54'],
    correctIndex: 2,
    explanation: 'Number of neutrons = Mass Number (A) - Atomic Number (Z) = 37 - 17 = 20.',
    hints: ['Neutrons = Mass Number minus Atomic Number.', 'A = 37, Z = 17.', '37 - 17 = 20.'],
  },
  {
    id: 'ch_14',
    nodeId: 'c9_chem_010',
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Systematic IUPAC Naming',
    question: 'What is the temporary IUPAC systematic symbol for an element with atomic number 114 before its official naming (Flerovium)?',
    options: ['Uuh', 'Uuq', 'Uun', 'Uut'],
    correctIndex: 1,
    explanation: 'Atomic number 114: 1 (Un) + 1 (Un) + 4 (Quadium) = Ununquadium, symbol Uuq.',
    hints: ['Un = 1, Quad = 4.', '114 becomes Un-un-quadium.', 'Symbol uses first letters: U-u-q.'],
  },
  {
    id: 'ch_15',
    nodeId: 'c9_chem_008',
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Polyatomic Formula Writing',
    question: 'Why is Calcium Hydroxide correctly written as Ca(OH)₂ rather than CaOH₂?',
    options: ['CaOH₂ means 2 Calcium atoms and 1 Hydroxide ion.', 'Ca(OH)₂ indicates that the subscript 2 multiplies the ENTIRE hydroxide radical (both O and H).', 'Parentheses are added only for aesthetic clarity.', 'CaOH₂ represents Calcium Hydrosulfide.'],
    correctIndex: 1,
    explanation: 'Parentheses around a polyatomic radical ensure that the subscript applies to all constituent atoms of the radical (1 Ca, 2 O, 2 H).',
    hints: ['Without parentheses, 2 applies only to Hydrogen.', 'Ca(OH)₂ has 2 Oxygen and 2 Hydrogen atoms.', 'Radicals act as a single unit.'],
    misconceptionIndex: 5,
  },

  // --- ADVANCED TIER (7 Challenges) ---
  {
    id: 'ch_16',
    nodeId: 'c9_chem_009',
    type: 'formula_builder',
    difficulty: 'advanced',
    competencyLevel: 'Complex Polyatomic Synthesis',
    question: 'Construct the correct empirical formula for Ammonium Sulfate using Ammonium (NH₄⁺, valency 1) and Sulfate (SO₄²⁻, valency 2).',
    formulaTarget: { cation: 'NH₄', anion: 'SO₄', cationValency: 1, anionValency: 2, correctFormula: '(NH₄)₂SO₄' },
    explanation: 'Criss-cross: NH₄⁺ (valency 1) and SO₄²⁻ (valency 2). Cross 2 to NH₄ -> (NH₄)₂; cross 1 to SO₄ -> SO₄. Result: (NH₄)₂SO₄.',
    hints: ['Ammonium needs a subscript of 2.', 'Because NH₄ is a radical, place it in parentheses: (NH₄)₂.', 'Sulfate subscript is 1, so no parentheses needed: SO₄.'],
    misconceptionIndex: 5,
  },
  {
    id: 'ch_17',
    nodeId: 'c9_chem_009',
    type: 'formula_builder',
    difficulty: 'advanced',
    competencyLevel: 'Variable Valency Criss-Cross',
    question: 'Construct the chemical formula for Ferric Carbonate (Iron valency = 3, Carbonate CO₃ valency = 2).',
    formulaTarget: { cation: 'Fe', anion: 'CO₃', cationValency: 3, anionValency: 2, correctFormula: 'Fe₂(CO₃)₃' },
    explanation: 'Ferric indicates Fe³⁺ (valency 3). Carbonate is CO₃²⁻ (valency 2). Criss-crossing yields Fe₂(CO₃)₃.',
    hints: ['Ferric means Fe has valency 3.', 'Carbonate has valency 2.', 'Cross valencies to get Fe₂(CO₃)₃.'],
  },
  {
    id: 'ch_18',
    nodeId: 'c9_chem_007',
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Subscript Reduction Principle',
    question: 'When Magnesium (valency 2) reacts with Carbonate (valency 2), why is the formula MgCO₃ and not Mg₂(CO₃)₂?',
    options: [
      'Empirical formulas must show the simplest whole-number ratio of ions (2:2 reduces to 1:1).',
      'Magnesium loses one of its valence electrons upon bonding.',
      'Carbonate automatically cancels all subscripts.',
      'Valency 2 cannot form subscripts higher than 1.'
    ],
    correctIndex: 0,
    explanation: 'Chemical formulas of ionic compounds represent the simplest whole-number mole ratio of ions. Ratios like 2:2 are simplified to 1:1 (MgCO₃).',
    hints: ['Think of simplifying fractions.', '2:2 ratio reduces to 1:1.', 'Simplest ratio is the empirical rule.'],
  },
  {
    id: 'ch_19',
    nodeId: 'c9_chem_004',
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Etymological Analysis',
    question: 'Which sequence of element symbols corresponds to the Latin names: Kalium, Wolfram, Stibium, Hydrargyrum?',
    options: ['K, W, Sb, Hg', 'P, W, St, Hy', 'K, Tm, Sb, Ag', 'Ka, Wo, St, Hg'],
    correctIndex: 0,
    explanation: 'Kalium = K, Wolfram = W (German/Latinized), Stibium = Sb, Hydrargyrum = Hg.',
    hints: ['Kalium is K.', 'Wolfram is W.', 'Stibium is Sb, Hydrargyrum is Hg.'],
  },
  {
    id: 'ch_20',
    nodeId: 'c9_chem_006',
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Polyatomic Molecular Distinction',
    question: 'Phosphorus exists as a P₄ tetra-atomic molecule and Sulfur exists as an S₈ octa-atomic molecule. What is the atomicity of Sulfur in S₈?',
    options: ['4', '2', '8', '16'],
    correctIndex: 2,
    explanation: 'Atomicity is the total number of atoms present in one molecule of an element. For S₈, the atomicity is 8.',
    hints: ['Atomicity is indicated by the subscript.', 'S₈ has subscript 8.', 'Therefore atomicity = 8.'],
  },
  {
    id: 'ch_21',
    nodeId: 'c9_chem_008',
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Compound Valency Evaluation',
    question: 'In the compound Cu₂O, what is the oxidation state / valency of Copper?',
    options: ['+2 (Cupric)', '+1 (Cuprous)', '+3', '0'],
    correctIndex: 1,
    explanation: 'Since Oxygen has a valency of 2, 2 Copper atoms combine with 1 Oxygen atom (Cu₂O). Each Copper atom contributes valency 1, making it Cuprous (Cu⁺).',
    hints: ['Oxygen valency is 2.', 'Two Cu atoms balance 1 Oxygen (valency 2).', '2 × (Cu valency) = 2 -> Cu valency = 1 (Cuprous).'],
  },
  {
    id: 'ch_22',
    nodeId: 'c9_chem_010',
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Universal Nomenclature Validation',
    question: 'Why does IUPAC mandate global standardization of chemical symbols across all international languages?',
    options: [
      'To prevent industrial misinterpretation, ensure uniform scientific publication, and maintain safety in chemical trade globally.',
      'To enforce the usage of English alphabet over all other scripts.',
      'To reduce the number of known elements in periodic tables.',
      'To enable automatic translation software to work without chemical databases.'
    ],
    correctIndex: 0,
    explanation: 'Standardized IUPAC symbols guarantee that scientists, doctors, and engineers worldwide recognize identical chemical substances regardless of language differences.',
    hints: ['Focus on safety, clarity, and universal scientific harmony.', 'Universal trade and research rely on one chemical alphabet.', 'Option A captures this comprehensive mandate.'],
    misconceptionIndex: 4,
  },
];

// ==========================================
// MANDATORY SECTION 8: CUSTOM SVG DIAGRAMS
// ==========================================

// Diagram 1: Nuclide & Atomic Inspector SVG
const AtomicStructureDiagram: React.FC<{
  protons: number;
  neutrons: number;
  electrons: number;
  symbol: string;
  massNumber: number;
  charge: number;
}> = ({ protons, neutrons, electrons, symbol, massNumber, charge }) => {
  return (
    <div className="flex flex-col items-center bg-slate-900 p-4 rounded-xl border border-slate-700 shadow-xl">
      <div className="text-xs font-mono text-cyan-400 mb-2">DYNAMIC NUCLIDE SCHEMATIC</div>
      <svg width="280" height="220" viewBox="0 0 280 220" className="overflow-visible">
        {/* Outer Shell Orbitals */}
        <circle cx="140" cy="110" r="85" fill="none" stroke="#334155" strokeWidth="1.5" strokeDasharray="4 4" />
        <circle cx="140" cy="110" r="55" fill="none" stroke="#475569" strokeWidth="1.5" strokeDasharray="3 3" />
        
        {/* Nucleus Glow */}
        <circle cx="140" cy="110" r="32" fill="url(#nucleusGlow)" opacity="0.8" />
        <defs>
          <radialGradient id="nucleusGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
          </radialGradient>
        </defs>

        {/* Nucleus Core Particles */}
        {Array.from({ length: Math.min(protons, 12) }).map((_, i) => {
          const angle = (i * 2 * Math.PI) / Math.min(protons, 12);
          const rx = 140 + 12 * Math.cos(angle);
          const ry = 110 + 12 * Math.sin(angle);
          return <circle key={`p-${i}`} cx={rx} cy={ry} r="6" fill="#ef4444" stroke="#991b1b" strokeWidth="1" />;
        })}
        {Array.from({ length: Math.min(neutrons, 12) }).map((_, i) => {
          const angle = (i * 2 * Math.PI) / Math.min(neutrons, 12) + 0.5;
          const rx = 140 + 14 * Math.cos(angle);
          const ry = 110 + 14 * Math.sin(angle);
          return <circle key={`n-${i}`} cx={rx} cy={ry} r="6" fill="#64748b" stroke="#334155" strokeWidth="1" />;
        })}

        {/* Electrons in K Shell (max 2) */}
        {Array.from({ length: Math.min(electrons, 2) }).map((_, i) => {
          const angle = (i * Math.PI) + (Date.now() / 2000);
          const ex = 140 + 55 * Math.cos(angle);
          const ey = 110 + 55 * Math.sin(angle);
          return (
            <g key={`e1-${i}`}>
              <circle cx={ex} cy={ey} r="5" fill="#38bdf8" stroke="#0284c7" strokeWidth="1" />
              <circle cx={ex} cy={ey} r="8" fill="none" stroke="#38bdf8" strokeWidth="0.5" opacity="0.5" />
            </g>
          );
        })}

        {/* Electrons in L Shell (max 8) */}
        {Array.from({ length: Math.max(0, Math.min(electrons - 2, 8)) }).map((_, i) => {
          const count = Math.min(electrons - 2, 8);
          const angle = (i * 2 * Math.PI) / count - (Date.now() / 3000);
          const ex = 140 + 85 * Math.cos(angle);
          const ey = 110 + 85 * Math.sin(angle);
          return (
            <g key={`e2-${i}`}>
              <circle cx={ex} cy={ey} r="5" fill="#a855f7" stroke="#7e22ce" strokeWidth="1" />
            </g>
          );
        })}

        {/* Symbol Label Card overlay */}
        <rect x="15" y="15" width="70" height="70" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
        <text x="22" y="32" fontSize="12" fill="#94a3b8" fontWeight="bold">{massNumber}</text>
        <text x="22" y="75" fontSize="12" fill="#94a3b8" fontWeight="bold">{protons}</text>
        <text x="45" y="58" fontSize="26" fill="#f8fafc" fontWeight="extrabold" textAnchor="middle">{symbol}</text>
        {charge !== 0 && (
          <text x="73" y="32" fontSize="11" fill={charge > 0 ? '#4ade80' : '#f87171'} fontWeight="bold">
            {charge > 0 ? `+${charge}` : charge}
          </text>
        )}
      </svg>

      <div className="flex gap-4 text-xs mt-2 text-slate-300 font-mono">
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-red-500"></span> Protons: {protons}</span>
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-slate-500"></span> Neutrons: {neutrons}</span>
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-sky-400"></span> Electrons: {electrons}</span>
      </div>
    </div>
  );
};

// Diagram 2: Criss-Cross Visualizer SVG
const CrissCrossDiagram: React.FC<{
  cation: string;
  cationValency: number;
  anion: string;
  anionValency: number;
  resultFormula: string;
}> = ({ cation, cationValency, anion, anionValency, resultFormula }) => {
  return (
    <div className="flex flex-col items-center bg-slate-900 p-5 rounded-xl border border-cyan-800/50 shadow-2xl my-3">
      <div className="text-xs font-mono text-cyan-300 mb-3 tracking-widest uppercase">IUPAC Criss-Cross Valency Exchange</div>
      <svg width="340" height="180" viewBox="0 0 340 180" className="overflow-visible">
        {/* Cation Box */}
        <g transform="translate(40, 20)">
          <rect x="0" y="0" width="80" height="60" rx="10" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
          <text x="40" y="38" fontSize="22" fill="#a5b4fc" fontWeight="bold" textAnchor="middle">{cation}</text>
          {/* Valency SuperScript Badge */}
          <circle cx="70" cy="12" r="14" fill="#4338ca" stroke="#818cf8" strokeWidth="1.5" />
          <text x="70" y="16" fontSize="12" fill="#ffffff" fontWeight="bold" textAnchor="middle">+{cationValency}</text>
        </g>

        {/* Anion Box */}
        <g transform="translate(220, 20)">
          <rect x="0" y="0" width="80" height="60" rx="10" fill="#311042" stroke="#d946ef" strokeWidth="2" />
          <text x="40" y="38" fontSize="22" fill="#f0abfc" fontWeight="bold" textAnchor="middle">{anion}</text>
          {/* Valency SuperScript Badge */}
          <circle cx="70" cy="12" r="14" fill="#a21caf" stroke="#f0abfc" strokeWidth="1.5" />
          <text x="70" y="16" fontSize="12" fill="#ffffff" fontWeight="bold" textAnchor="middle">-{anionValency}</text>
        </g>

        {/* Dynamic Criss-Cross Arrows */}
        <path d="M 110 32 C 140 32, 200 130, 235 130" fill="none" stroke="#6366f1" strokeWidth="3" strokeDasharray="5 5" markerEnd="url(#arrowBlue)" />
        <path d="M 230 32 C 200 32, 140 130, 105 130" fill="none" stroke="#d946ef" strokeWidth="3" strokeDasharray="5 5" markerEnd="url(#arrowPink)" />

        <defs>
          <marker id="arrowBlue" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#6366f1" />
          </marker>
          <marker id="arrowPink" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#d946ef" />
          </marker>
        </defs>

        {/* Result Formula Box */}
        <g transform="translate(70, 115)">
          <rect x="0" y="0" width="200" height="50" rx="12" fill="#0f172a" stroke="#06b6d4" strokeWidth="2" />
          <text x="100" y="33" fontSize="24" fill="#38bdf8" fontWeight="extrabold" textAnchor="middle" letterSpacing="1">
            {resultFormula}
          </text>
        </g>
      </svg>
      <div className="text-xs text-slate-400 mt-2 text-center max-w-sm">
        Valencies cross over to become lower subscripts. Common factors are reduced to simplest whole number ratio.
      </div>
    </div>
  );
};

// Diagram 3: Historical Dalton vs Berzelius Comparison SVG
const DaltonVsBerzeliusDiagram: React.FC = () => {
  return (
    <div className="bg-slate-900/90 p-4 rounded-xl border border-amber-600/30 shadow-lg my-2">
      <div className="text-xs font-mono text-amber-400 mb-2 text-center">NOTATION EVOLUTION: DALTON vs BERZELIUS</div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-center">
          <span className="text-xs font-semibold text-amber-300 block mb-2">John Dalton (1808) Pictorial</span>
          <div className="flex justify-center items-center gap-3 text-2xl text-amber-200">
            <span title="Hydrogen">⚪</span>
            <span title="Carbon">⚫</span>
            <span title="Oxygen">⭕</span>
            <span title="Sulfur">⨁</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">Cumbersome to draw, non-standardized globally, difficult to print.</p>
        </div>

        <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-center">
          <span className="text-xs font-semibold text-emerald-300 block mb-2">Jöns Berzelius (1813) Alphabetical</span>
          <div className="flex justify-center items-center gap-3 font-mono font-bold text-xl text-emerald-400">
            <span className="px-2 py-1 bg-slate-900 border border-emerald-500/40 rounded">H</span>
            <span className="px-2 py-1 bg-slate-900 border border-emerald-500/40 rounded">C</span>
            <span className="px-2 py-1 bg-slate-900 border border-emerald-500/40 rounded">O</span>
            <span className="px-2 py-1 bg-slate-900 border border-emerald-500/40 rounded">S</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">Adopted by IUPAC. Universal alphabet system based on element names.</p>
        </div>
      </div>
    </div>
  );
};

// Diagram 4: Polyatomic Radical Ball-and-Stick SVG
const PolyatomicRadicalDiagram: React.FC<{ radicalId: string }> = ({ radicalId }) => {
  const radical = RADICALS.find(r => r.id === radicalId) || RADICALS[4]; // default CO3
  return (
    <div className="flex flex-col items-center bg-slate-950 p-4 rounded-xl border border-indigo-700/50">
      <div className="text-xs font-mono text-indigo-300 mb-2 uppercase tracking-wide">
        Radical Structure: {radical.name} ({radical.formula})
      </div>
      <svg width="240" height="150" viewBox="0 0 240 150">
        {/* Render different 2D layout based on radical */}
        {radical.id === 'SO4' && (
          <g transform="translate(120, 75)">
            {/* Bonds */}
            <line x1="0" y1="0" x2="-45" y2="-35" stroke="#94a3b8" strokeWidth="4" />
            <line x1="0" y1="0" x2="45" y2="-35" stroke="#94a3b8" strokeWidth="4" />
            <line x1="0" y1="0" x2="-35" y2="45" stroke="#94a3b8" strokeWidth="4" />
            <line x1="0" y1="0" x2="35" y2="45" stroke="#94a3b8" strokeWidth="4" />
            {/* Center Sulfur */}
            <circle cx="0" cy="0" r="22" fill="#eab308" stroke="#ca8a04" strokeWidth="2" />
            <text x="0" y="6" fill="#1e293b" fontSize="14" fontWeight="bold" textAnchor="middle">S</text>
            {/* 4 Oxygens */}
            <circle cx="-45" cy="-35" r="16" fill="#ef4444" stroke="#b91c1c" strokeWidth="2" />
            <text x="-45" y="-30" fill="#fff" fontSize="12" fontWeight="bold" textAnchor="middle">O</text>
            <circle cx="45" cy="-35" r="16" fill="#ef4444" stroke="#b91c1c" strokeWidth="2" />
            <text x="45" y="-30" fill="#fff" fontSize="12" fontWeight="bold" textAnchor="middle">O</text>
            <circle cx="-35" cy="45" r="16" fill="#ef4444" stroke="#b91c1c" strokeWidth="2" />
            <text x="-35" y="50" fill="#fff" fontSize="12" fontWeight="bold" textAnchor="middle">O</text>
            <circle cx="35" cy="45" r="16" fill="#ef4444" stroke="#b91c1c" strokeWidth="2" />
            <text x="35" y="50" fill="#fff" fontSize="12" fontWeight="bold" textAnchor="middle">O</text>
          </g>
        )}

        {radical.id === 'NH4' && (
          <g transform="translate(120, 75)">
            <line x1="0" y1="0" x2="0" y2="-45" stroke="#94a3b8" strokeWidth="4" />
            <line x1="0" y1="0" x2="-40" y2="30" stroke="#94a3b8" strokeWidth="4" />
            <line x1="0" y1="0" x2="40" y2="30" stroke="#94a3b8" strokeWidth="4" />
            <line x1="0" y1="0" x2="0" y2="40" stroke="#94a3b8" strokeWidth="4" />
            <circle cx="0" cy="0" r="22" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="2" />
            <text x="0" y="6" fill="#fff" fontSize="14" fontWeight="bold" textAnchor="middle">N</text>
            <circle cx="0" cy="-45" r="14" fill="#38bdf8" />
            <text x="0" y="-40" fill="#0f172a" fontSize="11" fontWeight="bold" textAnchor="middle">H</text>
            <circle cx="-40" cy="30" r="14" fill="#38bdf8" />
            <text x="-40" y="34" fill="#0f172a" fontSize="11" fontWeight="bold" textAnchor="middle">H</text>
            <circle cx="40" cy="30" r="14" fill="#38bdf8" />
            <text x="40" y="34" fill="#0f172a" fontSize="11" fontWeight="bold" textAnchor="middle">H</text>
            <circle cx="0" cy="40" r="14" fill="#38bdf8" />
            <text x="0" y="44" fill="#0f172a" fontSize="11" fontWeight="bold" textAnchor="middle">H</text>
          </g>
        )}

        {(radical.id !== 'SO4' && radical.id !== 'NH4') && (
          <g transform="translate(120, 75)">
            <line x1="0" y1="0" x2="0" y2="-40" stroke="#94a3b8" strokeWidth="4" />
            <line x1="0" y1="0" x2="-40" y2="30" stroke="#94a3b8" strokeWidth="4" />
            <line x1="0" y1="0" x2="40" y2="30" stroke="#94a3b8" strokeWidth="4" />
            <circle cx="0" cy="0" r="22" fill="#6366f1" stroke="#4338ca" strokeWidth="2" />
            <text x="0" y="6" fill="#fff" fontSize="14" fontWeight="bold" textAnchor="middle">
              {radical.id === 'CO3' ? 'C' : radical.id === 'NO3' ? 'N' : 'O'}
            </text>
            <circle cx="0" cy="-40" r="15" fill="#ef4444" />
            <text x="0" y="-35" fill="#fff" fontSize="11" fontWeight="bold" textAnchor="middle">O</text>
            <circle cx="-40" cy="30" r="15" fill="#ef4444" />
            <text x="-40" y="35" fill="#fff" fontSize="11" fontWeight="bold" textAnchor="middle">O</text>
            <circle cx="40" cy="30" r="15" fill="#ef4444" />
            <text x="40" y="35" fill="#fff" fontSize="11" fontWeight="bold" textAnchor="middle">O</text>
          </g>
        )}
      </svg>
      <div className="text-xs text-indigo-200 mt-1 font-mono">
        Net Radical Charge: <span className="text-pink-400 font-bold">{radical.charge > 0 ? `+${radical.charge}` : radical.charge}</span> | Structure: {radical.structure}
      </div>
    </div>
  );
};

// ==========================================
// MAIN COMPONENT CLASS
// ==========================================
export const C9_ChemistrySymbolsofelementsSim: React.FC<{
  initialNodeId?: NodeId;
  onComplete?: (score: number) => void;
}> = ({ initialNodeId = DEFAULT_PROPS.initialNodeId, onComplete }) => {
  // Navigation State
  const [activeTab, setActiveTab] = useState<'discovery' | 'lab' | 'challenges' | 'summary'>('discovery');
  const [activeLabStep, setActiveLabStep] = useState<number>(0);

  // Discovery State
  const [discoverySelected, setDiscoverySelected] = useState<number | null>(null);
  const [discoverySubmitted, setDiscoverySubmitted] = useState<boolean>(false);

  // Audio / Speech State tracking
  const [speechActive, setSpeechActive] = useState<boolean>(false);

  // BKT & SRS State
  const [bktStateMap, setBktStateMap] = useState<Record<string, ReturnType<typeof createBKTState>>>(() => {
    const map: Record<string, ReturnType<typeof createBKTState>> = {};
    ALL_NODE_IDS.forEach((id) => {
      map[id] = createBKTState();
    });
    return map;
  });

  const [reviewItems, setReviewItems] = useState<Record<string, ReturnType<typeof createReviewItem>>>(() => {
    const map: Record<string, ReturnType<typeof createReviewItem>> = {};
    ALL_NODE_IDS.forEach((id) => {
      map[id] = createReviewItem(id);
    });
    return map;
  });

  // Challenges State
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState<number>(0);
  const [challengeSelectedOption, setChallengeSelectedOption] = useState<number | null>(null);
  const [formulaInputCation, setFormulaInputCation] = useState<string>('');
  const [formulaInputAnion, setFormulaInputAnion] = useState<string>('');
  const [challengeSubmitted, setChallengeSubmitted] = useState<boolean>(false);
  const [challengeFeedback, setChallengeFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);
  const [score, setScore] = useState<number>(0);
  const [completedChallenges, setCompletedChallenges] = useState<Set<string>>(new Set());

  // Interactive Lab State
  // Lab 1: Case Formatter
  const [typedInput, setTypedInput] = useState<string>('co');
  // Lab 2: Latin origin search
  const [selectedLatinElement, setSelectedLatinElement] = useState<ElementInfo>(
    ELEMENT_DATABASE.find(e => e.id === 'Na')!
  );
  // Lab 3: Nuclide Inspector
  const [nuclideProtons, setNuclideProtons] = useState<number>(11);
  const [nuclideNeutrons, setNuclideNeutrons] = useState<number>(12);
  const [nuclideElectrons, setNuclideElectrons] = useState<number>(11);
  const [nuclideSymbol, setNuclideSymbol] = useState<string>('Na');
  // Lab 4: Valency / Radical
  const [selectedRadicalId, setSelectedRadicalId] = useState<string>('SO4');
  // Lab 5: Criss-Cross Synth
  const [selectedCation, setSelectedCation] = useState<{ symbol: string; valency: number }>({ symbol: 'Al', valency: 3 });
  const [selectedAnion, setSelectedAnion] = useState<{ symbol: string; valency: number }>({ symbol: 'O', valency: 2 });

  // UI Feedback Flags
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [sparkleCoords, setSparkleCoords] = useState<{ x: number; y: number }>({ x: 400, y: 300 });
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHint, setCurrentHint] = useState<string>('');

  // Auto Hint Inactivity Timer
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const resetInactivityTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setShowHint(false);
    timerRef.current = setTimeout(() => {
      const currentCh = CHALLENGES[currentChallengeIndex];
      if (currentCh && !challengeSubmitted) {
        setCurrentHint(currentCh.hints[0]);
        setShowHint(true);
        audioManager.play('hint');
      }
    }, 10000); // 10s auto hint
  }, [currentChallengeIndex, challengeSubmitted]);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [resetInactivityTimer, activeTab, currentChallengeIndex]);

  // Initial Welcome Speech
  useEffect(() => {
    speechManager.speak('Welcome to the ICSE Chemical Symbols and IUPAC Nomenclature Simulator!');
  }, []);

  // Compute Overall Mastery
  const overallMastery = useMemo(() => {
    const total = ALL_NODE_IDS.reduce((acc, id) => {
      return acc + masteryProb(bktStateMap[id]);
    }, 0);
    return Math.round((total / ALL_NODE_IDS.length) * 100);
  }, [bktStateMap]);

  // Handle Tab Switch
  const handleTabChange = (tab: 'discovery' | 'lab' | 'challenges' | 'summary') => {
    audioManager.play('swoop');
    setActiveTab(tab);
    if (tab === 'lab') {
      speechManager.speak('Entering the Interactive Chemistry Exploration Lab.');
    } else if (tab === 'challenges') {
      speechManager.speak('Challenge Mode Activated. Test your IUPAC knowledge across 22 challenges.');
    } else if (tab === 'summary') {
      speechManager.speak('Review your mastery dashboard and real-world industrial audit activity.');
    }
  };

  // Discovery Question Logic
  const handleDiscoverySubmit = () => {
    if (discoverySelected === null) return;
    setDiscoverySubmitted(true);
    if (discoverySelected === DISCOVERY_QUESTION.correctIndex) {
      audioManager.play('celebration');
      speechManager.speak('Correct! Writing both letters in uppercase turns an element into a chemical compound.');
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    } else {
      audioManager.play('error');
      speechManager.speak('Not quite. Remember that IUPAC requires the second letter of an element symbol to be lowercase.');
    }
  };

  // Challenge Handling Logic
  const handleChallengeAnswer = (optionIdx?: number, customFormula?: string) => {
    resetInactivityTimer();
    const currentCh = CHALLENGES[currentChallengeIndex];
    let isCorrect = false;

    if (currentCh.type === 'mcq' && optionIdx !== undefined) {
      isCorrect = optionIdx === currentCh.correctIndex;
    } else if (currentCh.type === 'formula_builder' && currentCh.formulaTarget) {
      const formattedInput = (customFormula || `${formulaInputCation}${formulaInputAnion}`).trim();
      isCorrect = formattedInput === currentCh.formulaTarget.correctFormula;
    }

    setChallengeSubmitted(true);

    // BKT and SRS Update
    const prevBkt = bktStateMap[currentCh.nodeId] || createBKTState();
    const nextBkt = bktUpdate(prevBkt, isCorrect);
    setBktStateMap(prev => ({ ...prev, [currentCh.nodeId]: nextBkt }));

    const prevSrs = reviewItems[currentCh.nodeId] || createReviewItem(currentCh.nodeId);
    const nextSrs = sm2Update(prevSrs, isCorrect ? 5 : 2);
    setReviewItems(prev => ({ ...prev, [currentCh.nodeId]: nextSrs }));

    if (isCorrect) {
      audioManager.play('success');
      audioManager.play('sparkle');
      setShowSparkle(true);
      setShowSuccessBanner(true);
      setTimeout(() => setShowSuccessBanner(false), 2500);

      if (!completedChallenges.has(currentCh.id)) {
        setScore(prev => prev + 10);
        setCompletedChallenges(prev => new Set(prev).add(currentCh.id));
      }

      setChallengeFeedback({
        isCorrect: true,
        message: `Outstanding! ${currentCh.explanation}`,
      });
      speechManager.speak('Excellent job! You correctly applied the IUPAC chemical rule.');
    } else {
      audioManager.play('error');
      setChallengeFeedback({
        isCorrect: false,
        message: `Incorrect. ${currentCh.explanation}`,
      });
      speechManager.speak('That answer is incorrect. Review the IUPAC rule breakdown.');
    }
  };

  const handleNextChallenge = () => {
    audioManager.play('pop');
    setChallengeSubmitted(false);
    setChallengeSelectedOption(null);
    setFormulaInputCation('');
    setFormulaInputAnion('');
    setChallengeFeedback(null);
    setShowHint(false);

    if (currentChallengeIndex < CHALLENGES.length - 1) {
      setCurrentChallengeIndex(prev => prev + 1);
    } else {
      // Finished all challenges
      audioManager.play('celebration');
      speechManager.speak('Congratulations! You have completed all chemical symbol challenges!');
      setShowConfetti(true);
      recordGameScore('symbols_of_elements_c9', score, 220);
      if (onComplete) onComplete(score);
    }
  };

  // Helper for formatting Criss-Cross Formula Output
  const computeCrissCrossFormula = (catSymbol: string, catVal: number, anSymbol: string, anVal: number) => {
    // Simplify ratio
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
    const factor = gcd(catVal, anVal);
    const subCat = anVal / factor;
    const subAn = catVal / factor;

    // Check if radical needs parentheses
    const isPolyatomicCation = catSymbol.includes('NH₄');
    const isPolyatomicAnion = ['SO₄', 'NO₃', 'CO₃', 'PO₄', 'HCO₃', 'OH'].includes(anSymbol);

    let catFormatted = catSymbol;
    if (subCat > 1 && isPolyatomicCation) {
      catFormatted = `(${catSymbol})`;
    }

    let anFormatted = anSymbol;
    if (subAn > 1 && isPolyatomicAnion) {
      anFormatted = `(${anSymbol})`;
    }

    const catSubStr = subCat > 1 ? toSubscript(subCat) : '';
    const anSubStr = subAn > 1 ? toSubscript(subAn) : '';

    return `${catFormatted}${catSubStr}${anFormatted}${anSubStr}`;
  };

  const toSubscript = (num: number) => {
    const subDigits: Record<string, string> = {
      '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄', '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉'
    };
    return num.toString().split('').map(d => subDigits[d] || d).join('');
  };

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 flex flex-col justify-between relative overflow-x-hidden">
      {/* Visual Feedback Overlays */}
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccessBanner} text="IUPAC Mastery Challenge Cleared!" />
      <SparkleBurst show={showSparkle} x={sparkleCoords.x} y={sparkleCoords.y} />
      <HintBubble show={showHint} text={currentHint} />

      {/* TOP HEADER & NAVIGATION BAR */}
      <header className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 mb-4 shadow-xl flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-cyan-500/30">
            🧪
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
              {SCENARIO.title}
            </h1>
            <p className="text-xs text-slate-400 font-medium">CISCE / ICSE Class 9 Chemistry • Topic: Symbols of Elements</p>
          </div>
        </div>

        {/* Global Score & Mastery Gauge */}
        <div className="flex items-center gap-6 bg-slate-950/80 px-4 py-2 rounded-xl border border-slate-800">
          <div className="text-center">
            <span className="text-[10px] text-slate-400 font-mono uppercase tracking-widest block">Score</span>
            <span className="text-lg font-black text-emerald-400">{score} XP</span>
          </div>
          <div className="w-px h-8 bg-slate-800" />
          <div className="text-center">
            <span className="text-[10px] text-slate-400 font-mono uppercase tracking-widest block">BKT Mastery</span>
            <span className="text-lg font-black text-cyan-400">{overallMastery}%</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800">
          <button
            onClick={() => handleTabChange('discovery')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'discovery'
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🔍 Discovery
          </button>
          <button
            onClick={() => handleTabChange('lab')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'lab'
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🥼 Interactive Lab
          </button>
          <button
            onClick={() => handleTabChange('challenges')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'challenges'
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🏆 Challenges ({currentChallengeIndex + 1}/22)
          </button>
          <button
            onClick={() => handleTabChange('summary')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'summary'
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            ��� Summary
          </button>
        </nav>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="w-full flex-grow">
        {/* ================= TAB 1: DISCOVERY ================= */}
        {activeTab === 'discovery' && (
          <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
            {/* Context & Scenario Banner */}
            <div className="bg-gradient-to-br from-slate-900 to-indigo-950 p-6 rounded-2xl border border-indigo-800/50 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10 text-9xl font-serif text-cyan-400 select-none pointer-events-none">
                IUPAC
              </div>
              <h2 className="text-xl font-bold text-cyan-300 mb-2 flex items-center gap-2">
                <span>📋</span> Mission Briefing: IUPAC Chemical Inspection
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                {SCENARIO.intro}
              </p>
              <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 text-xs text-slate-300">
                <strong className="text-indigo-400">Context: </strong> {SCENARIO.context}
              </div>
            </div>

            {/* Historical Diagram Section */}
            <DaltonVsBerzeliusDiagram />

            {/* Mandatory Discovery Question */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2.5 py-1 bg-amber-500/20 text-amber-300 text-xs font-bold rounded-full border border-amber-500/30">
                  PRE-INSPECTION TEST
                </span>
                <span className="text-xs text-slate-400 font-mono">Node ID: c9_chem_002</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-4">
                {DISCOVERY_QUESTION.question}
              </h3>

              <div className="space-y-3 mb-6">
                {DISCOVERY_QUESTION.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      audioManager.play('tap');
                      setDiscoverySelected(idx);
                    }}
                    disabled={discoverySubmitted}
                    className={`w-full text-left p-4 rounded-xl border transition-all text-sm font-medium ${
                      discoverySelected === idx
                        ? 'bg-cyan-950/80 border-cyan-500 text-cyan-200 shadow-md shadow-cyan-500/10'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span className="inline-block w-6 h-6 rounded-full bg-slate-800 text-slate-400 text-xs font-bold text-center leading-6 mr-3">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    {opt}
                  </button>
                ))}
              </div>

              {!discoverySubmitted ? (
                <button
                  onClick={handleDiscoverySubmit}
                  disabled={discoverySelected === null}
                  className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold rounded-xl disabled:opacity-50 transition-all shadow-lg shadow-cyan-500/20"
                >
                  Confirm Answer
                </button>
              ) : (
                <div className={`p-4 rounded-xl border text-sm ${
                  discoverySelected === DISCOVERY_QUESTION.correctIndex
                    ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                    : 'bg-rose-950/60 border-rose-500 text-rose-200'
                }`}>
                  <p className="font-bold mb-1">
                    {discoverySelected === DISCOVERY_QUESTION.correctIndex ? 'Correct Analysis!' : 'Inspection Note:'}
                  </p>
                  <p>{DISCOVERY_QUESTION.hintAfter}</p>
                  <button
                    onClick={() => handleTabChange('lab')}
                    className="mt-4 px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold rounded-lg transition-all"
                  >
                    Proceed to Interactive Exploration Labs ➔
                  </button>
                </div>
              )}
            </div>

            {/* MANDATORY PREDICTION QUESTIONS RENDERING */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
              <h3 className="text-md font-bold text-cyan-300 flex items-center gap-2">
                <span>🔮</span> Prediction Challenges (.map rendered)
              </h3>
              {PREDICTION_QUESTIONS.map((pq, idx) => (
                <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="text-xs font-mono text-cyan-400 mb-1">Prediction #{idx + 1} ({pq.nodeId})</div>
                  <p className="text-sm text-slate-200 font-semibold mb-3">{pq.question}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                    {pq.options.map((opt, oIdx) => (
                      <div key={oIdx} className="p-2.5 bg-slate-900 rounded-lg text-xs text-slate-300 border border-slate-800">
                        <strong className="text-cyan-400 mr-2">{String.fromCharCode(65 + oIdx)}.</strong> {opt}
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-amber-300/80 italic">Verification: {pq.verifyInstruction}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 2: INTERACTIVE LAB ================= */}
        {activeTab === 'lab' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Exploration Lab Step Selector (.map rendered as MANDATORY) */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
              {EXPLORATION_STEPS.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    audioManager.play('tap');
                    setActiveLabStep(idx);
                  }}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    activeLabStep === idx
                      ? 'bg-gradient-to-b from-cyan-900/60 to-slate-900 border-cyan-500 text-white shadow-lg'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest mb-1">
                    Step {idx + 1}
                  </div>
                  <div className="text-xs font-bold line-clamp-2">{step.title}</div>
                </button>
              ))}
            </div>

            {/* Step Description Card */}
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-start gap-3">
              <span className="text-xl">💡</span>
              <div>
                <strong className="text-cyan-300 font-bold">{EXPLORATION_STEPS[activeLabStep].title}: </strong>
                {EXPLORATION_STEPS[activeLabStep].instruction}
              </div>
            </div>

            {/* LAB STEP INTERACTION IMPLEMENTATIONS */}
            {activeLabStep === 0 && (
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-6">
                <h3 className="text-lg font-bold text-cyan-300">Lab 1: IUPAC Capitalization & Case Formatter</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <label className="text-xs font-mono text-slate-400 block">
                      Type Chemical Symbol or Compound (e.g., "co", "Co", "CO", "na", "Na"):
                    </label>
                    <input
                      type="text"
                      value={typedInput}
                      onChange={(e) => {
                        audioManager.play('tap');
                        setTypedInput(e.target.value);
                      }}
                      className="w-full p-4 bg-slate-950 border border-slate-700 rounded-xl text-2xl font-mono text-cyan-300 uppercase tracking-widest focus:border-cyan-500 outline-none"
                      maxLength={4}
                    />

                    <div className="flex gap-2">
                      {['co', 'Co', 'CO', 'na', 'Na', 'FE', 'Fe'].map(preset => (
                        <button
                          key={preset}
                          onClick={() => {
                            audioManager.play('pop');
                            setTypedInput(preset);
                          }}
                          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-200 rounded-lg"
                        >
                          {preset}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Dynamic Inspection Output */}
                  <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
                    <div className="text-xs font-mono text-cyan-400">IUPAC VALIDATOR ANALYSIS</div>
                    {typedInput.toUpperCase() === 'CO' ? (
                      typedInput === 'Co' ? (
                        <div className="text-emerald-400 space-y-2">
                          <p className="font-bold text-lg">✅ Valid IUPAC Symbol: Cobalt (Co)</p>
                          <p className="text-xs text-slate-300">
                            Capital 'C' + lowercase 'o' represents one atom of the transition metal Cobalt (Atomic No: 27).
                          </p>
                        </div>
                      ) : (
                        <div className="text-amber-400 space-y-2">
                          <p className="font-bold text-lg">⚠️ Chemical Compound: Carbon Monoxide (CO)</p>
                          <p className="text-xs text-slate-300">
                            Both letters are UPPERCASE! Capital 'C' (Carbon) + Capital 'O' (Oxygen) forms a toxic diatomic gas molecule, NOT Cobalt!
                          </p>
                        </div>
                      )
                    ) : typedInput.toUpperCase() === 'NA' ? (
                      typedInput === 'Na' ? (
                        <div className="text-emerald-400 space-y-2">
                          <p className="font-bold text-lg">✅ Valid IUPAC Symbol: Sodium (Na)</p>
                          <p className="text-xs text-slate-300">
                            Derived from Latin name <em>Natrium</em>. Capital N, lowercase a.
                          </p>
                        </div>
                      ) : (
                        <div className="text-rose-400 space-y-2">
                          <p className="font-bold text-lg">❌ Invalid Symbol Formatting ("{typedInput}")</p>
                          <p className="text-xs text-slate-300">
                            IUPAC requires the second letter to be lowercase ('Na').
                          </p>
                        </div>
                      )
                    ) : (
                      <div className="text-slate-400 text-xs">
                        Type a symbol above to analyze capitalization rules.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeLabStep === 1 && (
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-6">
                <h3 className="text-lg font-bold text-cyan-300">Lab 2: Classical Latin & Origin Rosetta Stone</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {ELEMENT_DATABASE.filter(e => e.derivation === 'Latin' || e.derivation === 'German').map(elem => (
                    <button
                      key={elem.id}
                      onClick={() => {
                        audioManager.play('pickup');
                        setSelectedLatinElement(elem);
                      }}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        selectedLatinElement.id === elem.id
                          ? 'bg-indigo-950/80 border-indigo-500 shadow-lg'
                          : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-2xl font-black font-mono text-cyan-300">{elem.symbol}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
                          Z = {elem.atomicNumber}
                        </span>
                      </div>
                      <div className="text-sm font-bold text-white">{elem.name}</div>
                      <div className="text-xs text-indigo-300 italic font-mono">Latin: {elem.latinName}</div>
                    </button>
                  ))}
                </div>

                {/* Detailed Rosetta Card */}
                <div className="bg-slate-950 p-6 rounded-xl border border-indigo-800/60 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="space-y-2">
                    <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest">SELECTED ELEMENT ETYMOLOGY</span>
                    <h4 className="text-2xl font-black text-white">{selectedLatinElement.name} ({selectedLatinElement.symbol})</h4>
                    <p className="text-sm text-cyan-300 font-mono">
                      Classical Root: <strong className="text-indigo-300">{selectedLatinElement.latinName || selectedLatinElement.name}</strong>
                    </p>
                    <p className="text-xs text-slate-300 max-w-lg">{selectedLatinElement.description}</p>
                  </div>
                  <div className="w-24 h-24 rounded-2xl bg-slate-900 border-2 border-indigo-500 flex flex-col items-center justify-center text-center shadow-xl">
                    <span className="text-3xl font-black font-mono text-indigo-300">{selectedLatinElement.symbol}</span>
                    <span className="text-[10px] text-slate-400 font-mono mt-1">Z = {selectedLatinElement.atomicNumber}</span>
                  </div>
                </div>
              </div>
            )}

            {activeLabStep === 2 && (
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-6">
                <h3 className="text-lg font-bold text-cyan-300">Lab 3: Nuclide & Diatomic Molecule Inspector</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <AtomicStructureDiagram
                    protons={nuclideProtons}
                    neutrons={nuclideNeutrons}
                    electrons={nuclideElectrons}
                    symbol={nuclideSymbol}
                    massNumber={nuclideProtons + nuclideNeutrons}
                    charge={nuclideProtons - nuclideElectrons}
                  />

                  <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
                    <div className="text-xs font-mono text-cyan-400">NUCLIDE CONTROLS</div>
                    
                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>Protons (Z = Atomic Number): {nuclideProtons}</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="20"
                        value={nuclideProtons}
                        onChange={(e) => {
                          audioManager.play('count');
                          const p = parseInt(e.target.value);
                          setNuclideProtons(p);
                          setNuclideElectrons(p);
                          const el = ELEMENT_DATABASE.find(item => item.atomicNumber === p);
                          if (el) setNuclideSymbol(el.symbol);
                        }}
                        className="w-full accent-cyan-500"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>Neutrons (N): {nuclideNeutrons}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="25"
                        value={nuclideNeutrons}
                        onChange={(e) => {
                          audioManager.play('count');
                          setNuclideNeutrons(parseInt(e.target.value));
                        }}
                        className="w-full accent-slate-500"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>Electrons (Ionization): {nuclideElectrons}</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="20"
                        value={nuclideElectrons}
                        onChange={(e) => {
                          audioManager.play('count');
                          setNuclideElectrons(parseInt(e.target.value));
                        }}
                        className="w-full accent-purple-500"
                      />
                    </div>

                    <div className="pt-2 border-t border-slate-800 text-xs text-slate-300">
                      <strong>Diatomic Gas Note:</strong> Elemental Oxygen symbol is <span className="font-mono text-cyan-400">O</span>, but room-temperature oxygen gas forms the diatomic molecule <span className="font-mono text-emerald-400">O₂</span> (2 bonded atoms).
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeLabStep === 3 && (
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-6">
                <h3 className="text-lg font-bold text-cyan-300">Lab 4: Valency & Polyatomic Radical Studio</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {RADICALS.map(rad => (
                    <button
                      key={rad.id}
                      onClick={() => {
                        audioManager.play('pickup');
                        setSelectedRadicalId(rad.id);
                      }}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        selectedRadicalId === rad.id
                          ? 'bg-indigo-950 border-indigo-500 text-white shadow-md'
                          : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="font-mono font-bold text-lg text-cyan-300">{rad.formula}</div>
                      <div className="text-xs font-semibold">{rad.name}</div>
                      <div className="text-[10px] text-slate-400 mt-1">Valency: {Math.abs(rad.charge)}</div>
                    </button>
                  ))}
                </div>

                <PolyatomicRadicalDiagram radicalId={selectedRadicalId} />
              </div>
            )}

            {activeLabStep === 4 && (
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-6">
                <h3 className="text-lg font-bold text-cyan-300">Lab 5: Interactive Criss-Cross Formula Synthesizer</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Cation Selection */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-indigo-800/50 space-y-3">
                    <label className="text-xs font-mono text-indigo-300 block font-bold">SELECT CATION (+ Ion):</label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { symbol: 'Na', valency: 1 },
                        { symbol: 'Ca', valency: 2 },
                        { symbol: 'Al', valency: 3 },
                        { symbol: 'Fe', valency: 3 },
                        { symbol: 'NH₄', valency: 1 },
                      ].map(cat => (
                        <button
                          key={cat.symbol}
                          onClick={() => {
                            audioManager.play('balance');
                            setSelectedCation(cat);
                          }}
                          className={`p-2.5 rounded-lg border font-mono text-xs text-center font-bold ${
                            selectedCation.symbol === cat.symbol
                              ? 'bg-indigo-600 text-white border-indigo-400'
                              : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          {cat.symbol} (Val: +{cat.valency})
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Anion Selection */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-pink-800/50 space-y-3">
                    <label className="text-xs font-mono text-pink-300 block font-bold">SELECT ANION (- Ion):</label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { symbol: 'Cl', valency: 1 },
                        { symbol: 'O', valency: 2 },
                        { symbol: 'SO₄', valency: 2 },
                        { symbol: 'PO₄', valency: 3 },
                        { symbol: 'OH', valency: 1 },
                      ].map(an => (
                        <button
                          key={an.symbol}
                          onClick={() => {
                            audioManager.play('balance');
                            setSelectedAnion(an);
                          }}
                          className={`p-2.5 rounded-lg border font-mono text-xs text-center font-bold ${
                            selectedAnion.symbol === an.symbol
                              ? 'bg-pink-600 text-white border-pink-400'
                              : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          {an.symbol} (Val: -{an.valency})
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Criss-Cross Diagram Output */}
                <CrissCrossDiagram
                  cation={selectedCation.symbol}
                  cationValency={selectedCation.valency}
                  anion={selectedAnion.symbol}
                  anionValency={selectedAnion.valency}
                  resultFormula={computeCrissCrossFormula(
                    selectedCation.symbol,
                    selectedCation.valency,
                    selectedAnion.symbol,
                    selectedAnion.valency
                  )}
                />
              </div>
            )}

            {/* MANDATORY OBSERVATION QUESTIONS RENDERING */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
              <h3 className="text-md font-bold text-cyan-300 flex items-center gap-2">
                <span>👁️</span> Lab Observation Checks (.map rendered)
              </h3>
              {OBSERVATION_QUESTIONS.map((oq, idx) => (
                <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="text-xs font-mono text-cyan-400 mb-1">Observation #{idx + 1} ({oq.nodeId})</div>
                  <p className="text-sm text-slate-200 font-semibold mb-3">{oq.question}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {oq.observableOptions.map((opt, oIdx) => (
                      <div
                        key={oIdx}
                        className={`p-2.5 rounded-lg text-xs border ${
                          oIdx === oq.correctIndex
                            ? 'bg-emerald-950/40 border-emerald-600/60 text-emerald-200'
                            : 'bg-slate-900 border-slate-800 text-slate-400'
                        }`}
                      >
                        <strong className="mr-2">{String.fromCharCode(65 + oIdx)}.</strong> {opt}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 3: CHALLENGES ================= */}
        {activeTab === 'challenges' && (
          <div className="max-w-3xl mx-auto space-y-6 animate-fadeIn">
            {/* Challenge Header & Progress Bar */}
            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex justify-between items-center">
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block">
                  CHALLENGE {currentChallengeIndex + 1} OF {CHALLENGES.length}
                </span>
                <span className="text-xs text-slate-400">
                  Difficulty: <strong className="text-amber-400 capitalize">{CHALLENGES[currentChallengeIndex].difficulty}</strong> | {CHALLENGES[currentChallengeIndex].competencyLevel}
                </span>
              </div>
              <div className="w-32 bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full transition-all duration-300"
                  style={{ width: `${((currentChallengeIndex + 1) / CHALLENGES.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Challenge Main Box */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-6">
              <div className="flex justify-between items-start">
                <span className="px-3 py-1 bg-cyan-950 text-cyan-300 text-xs font-mono rounded-full border border-cyan-800">
                  {CHALLENGES[currentChallengeIndex].nodeId}
                </span>
                <button
                  onClick={() => {
                    audioManager.play('hint');
                    setCurrentHint(CHALLENGES[currentChallengeIndex].hints[0]);
                    setShowHint(true);
                  }}
                  className="text-xs text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1"
                >
                  💡 Request Hint
                </button>
              </div>

              <h3 className="text-lg font-bold text-white leading-snug">
                {CHALLENGES[currentChallengeIndex].question}
              </h3>

              {/* MCQ Options Rendering */}
              {CHALLENGES[currentChallengeIndex].type === 'mcq' && CHALLENGES[currentChallengeIndex].options && (
                <div className="space-y-3">
                  {CHALLENGES[currentChallengeIndex].options!.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        audioManager.play('tap');
                        setChallengeSelectedOption(idx);
                      }}
                      disabled={challengeSubmitted}
                      className={`w-full text-left p-4 rounded-xl border transition-all text-sm font-medium ${
                        challengeSelectedOption === idx
                          ? 'bg-cyan-950/80 border-cyan-500 text-cyan-200'
                          : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <span className="inline-block w-6 h-6 rounded-full bg-slate-800 text-slate-400 text-xs font-bold text-center leading-6 mr-3">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      {opt}
                    </button>
                  ))}
                </div>
              )}

              {/* Formula Builder Interactive Input */}
              {CHALLENGES[currentChallengeIndex].type === 'formula_builder' && (
                <div className="space-y-4 bg-slate-950 p-5 rounded-xl border border-slate-800">
                  <label className="text-xs font-mono text-cyan-400 block">
                    TYPE EMPIRICAL CHEMICAL FORMULA (e.g. Al2O3, (NH4)2SO4, Fe2(CO3)3):
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={formulaInputCation}
                      onChange={(e) => setFormulaInputCation(e.target.value)}
                      placeholder="Type formula string..."
                      disabled={challengeSubmitted}
                      className="flex-grow p-3 bg-slate-900 border border-slate-700 rounded-xl font-mono text-lg text-cyan-300 outline-none focus:border-cyan-500"
                    />
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Tip: Use normal numbers for subscripts (e.g. Al2O3 or (NH4)2SO4).
                  </p>
                </div>
              )}

              {/* Action & Feedback Buttons */}
              {!challengeSubmitted ? (
                <button
                  onClick={() => handleChallengeAnswer(challengeSelectedOption ?? undefined)}
                  disabled={
                    CHALLENGES[currentChallengeIndex].type === 'mcq'
                      ? challengeSelectedOption === null
                      : formulaInputCation.trim() === ''
                  }
                  className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold rounded-xl disabled:opacity-50 transition-all shadow-lg shadow-cyan-500/20"
                >
                  Submit Challenge Answer
                </button>
              ) : (
                <div className="space-y-4">
                  <div className={`p-4 rounded-xl border text-sm ${
                    challengeFeedback?.isCorrect
                      ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                      : 'bg-rose-950/60 border-rose-500 text-rose-200'
                  }`}>
                    <p className="font-bold mb-1">{challengeFeedback?.isCorrect ? 'Correct!' : 'Review Feedback:'}</p>
                    <p>{challengeFeedback?.message}</p>
                  </div>

                  <button
                    onClick={handleNextChallenge}
                    className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold rounded-xl transition-all shadow-lg"
                  >
                    {currentChallengeIndex < CHALLENGES.length - 1 ? 'Next Challenge ➔' : 'Complete All Challenges 🏆'}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= TAB 4: SUMMARY & REAL WORLD ================= */}
        {activeTab === 'summary' && (
          <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
            {/* Mastery Grid Dashboard */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
              <h3 className="text-lg font-bold text-cyan-300 flex items-center gap-2">
                <span>📊</span> ICSE Topic Mastery Matrix (BKT & SM-2 SRS Tracked)
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {ALL_NODE_IDS.map(nodeId => {
                  const bkt = bktStateMap[nodeId] || createBKTState();
                  const mast = Math.round(masteryProb(bkt) * 100);
                  return (
                    <div key={nodeId} className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
                      <div className="text-[10px] font-mono text-slate-400">{nodeId}</div>
                      <div className="text-lg font-black text-cyan-400 my-1">{mast}%</div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-cyan-500 h-full" style={{ width: `${mast}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* MANDATORY REAL-WORLD ACTIVITY RENDERING */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-indigo-950 text-indigo-300 font-mono text-xs rounded-full border border-indigo-800">
                  REAL WORLD EXTENSION
                </span>
                <h3 className="text-lg font-bold text-white">{REAL_WORLD_ACTIVITY.title}</h3>
              </div>
              <p className="text-sm text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>

              <div className="space-y-3 pt-2">
                {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                  <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-cyan-900 text-cyan-300 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <p className="text-xs text-slate-200 leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Preserved Misconceptions & Corrections Section */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
              <h3 className="text-lg font-bold text-amber-300 flex items-center gap-2">
                <span>⚠️</span> Key Misconceptions & IUPAC Corrections
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MISCONCEPTIONS.map((m, idx) => (
                  <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                    <span className="text-xs font-mono text-amber-400 block">{m.title} ({m.nodeId})</span>
                    <p className="text-xs text-rose-300">
                      <strong>Misconception: </strong>"{m.misconception}"
                    </p>
                    <p className="text-xs text-emerald-300">
                      <strong>Correction: </strong>{m.correction}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="w-full text-center text-xs text-slate-400 py-4 mt-8 border-t border-slate-900">
        CISCE Class 9 Chemistry Standard • IUPAC Chemical Symbols & Formula Engineering Module
      </footer>
    </div>
  );
};

export default C9_ChemistrySymbolsofelementsSim;