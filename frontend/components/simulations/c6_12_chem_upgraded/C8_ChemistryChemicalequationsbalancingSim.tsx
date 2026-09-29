'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  Play,
  RotateCcw,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  Award,
  BookOpen,
  ArrowRight,
  Scale,
  Zap,
  Flame,
  Atom,
  ChevronRight,
  RefreshCw,
  Eye,
  Check,
  Volume2,
  TrendingUp,
  Target,
  FileText,
  Layers,
  AlertTriangle,
  Lightbulb
} from 'lucide-react';

import {
  audioManager,
  speechManager,
  Confetti,
  SuccessBanner,
  HintBubble,
  SparkleBurst
} from '../../../lib/sim-engine';
import type { SoundEffect } from '../../../lib/sim-engine/types';
import { createReviewItem, sm2Update, ReviewItem } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, BKTState } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// -----------------------------------------------------------------------------
// NODE DEFINITIONS & CONSTANTS
// -----------------------------------------------------------------------------
export const NODE_IDS = {
  LAW_CONSERVATION_MASS: 'c8_chem_009',
  CHEMICAL_EQUATION_ANATOMY: 'c8_chem_010',
  COEFFICIENTS_VS_SUBSCRIPTS: 'c8_chem_011',
  ATOM_COUNTING_RULES: 'c8_chem_012',
  BALANCING_METHOD_INSPECTION: 'c8_chem_013',
  STATE_SYMBOLS_CONDITIONS: 'c8_chem_014',
  TYPES_OF_REACTIONS_BALANCING: 'c8_chem_015',
  STOICHIOMETRIC_INTERPRETATION: 'c8_chem_016',
} as const;

export const ALL_NODE_IDS = [
  'c8_chem_009',
  'c8_chem_010',
  'c8_chem_011',
  'c8_chem_012',
  'c8_chem_013',
  'c8_chem_014',
  'c8_chem_015',
  'c8_chem_016',
];

// -----------------------------------------------------------------------------
// SECTION 1: SCENARIO
// -----------------------------------------------------------------------------
const SCENARIO = {
  title: 'ICSE Royal Chemical Synthesis Laboratory',
  intro: 'Welcome, Junior Chemist! You have been appointed to oversee the reaction chambers at the Royal Institute of Chemistry. Unbalanced chemical equations lead to catastrophic pressure build-ups and hazardous chemical spills in our reactors.',
  context: 'Your mission is to master the Law of Conservation of Mass by balancing chemical equations, adjusting stoichiometric coefficients, analyzing subatomic atom tallies, and verifying molecular transformations without altering molecular identities.',
};

// -----------------------------------------------------------------------------
// SECTION 2: DISCOVERY_QUESTION
// -----------------------------------------------------------------------------
const DISCOVERY_QUESTION = {
  question: 'When 12g of solid wood burns completely in an open oxygen atmosphere to leave only 1g of ash, what happened to the remaining 11g of mass?',
  options: [
    'The 11g of mass was destroyed by high-temperature thermal combustion energy.',
    'The 11g of mass escaped into the surrounding atmosphere as gaseous CO₂ and H₂O vapor.',
    'The 11g of mass converted directly into photons of light and heat kinetic energy.',
    'The mass reading is incorrect because solids lose mass naturally when heated.'
  ],
  correctIndex: 1,
  hintAfter: 'According to Antoine Lavoisier\'s Law of Conservation of Mass, matter cannot be created or destroyed in a chemical reaction. Gaseous products escape into open air, but their mass exists in the surroundings!',
};

// -----------------------------------------------------------------------------
// DEFAULT PROPS
// -----------------------------------------------------------------------------
interface ComponentProps {
  onComplete?: (score: number) => void;
  initialNodeId?: string;
}

// -----------------------------------------------------------------------------
// SECTION 3: EXPLORATION_STEPS
// -----------------------------------------------------------------------------
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Water Synthesis & Mass Balance',
    instruction: 'Adjust the coefficients for H₂ and O₂ until the atom count balance scale reaches equilibrium for both Hydrogen and Oxygen.',
    interactionType: 'coefficient-adjust-water',
    nodeId: 'c8_chem_009',
  },
  {
    title: 'Lab 2: Ammonia Synthesis (Haber Process)',
    instruction: 'Balance N₂ + H₂ → NH₃. Notice how changing the coefficient of NH₃ multiplies both Nitrogen and Hydrogen atoms simultaneously.',
    interactionType: 'coefficient-distributive-ammonia',
    nodeId: 'c8_chem_010',
  },
  {
    title: 'Lab 3: Methane Combustion & Polyatomic Counting',
    instruction: 'Balance CH₄ + O₂ → CO₂ + H₂O. Observe how oxygen atoms are distributed across two different product molecules.',
    interactionType: 'combustion-multi-product',
    nodeId: 'c8_chem_011',
  },
  {
    title: 'Lab 4: Metal Oxidation (Rust Formation)',
    instruction: 'Balance Fe + O₂ ��� Fe₂O₃. Practice balancing reactions with odd and even subscript combinations using least common multiples.',
    interactionType: 'even-odd-balancing',
    nodeId: 'c8_chem_012',
  },
  {
    title: 'Lab 5: State Symbols & Reaction Conditions',
    instruction: 'Include state symbols (s, l, g, aq) and heat symbols (Δ) to transform balanced chemical formulas into complete chemical equations.',
    interactionType: 'state-symbol-assembly',
    nodeId: 'c8_chem_014',
  },
];

// -----------------------------------------------------------------------------
// SECTION 4: PREDICTION_QUESTIONS
// -----------------------------------------------------------------------------
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you change the subscript of water from H₂O to H₂O₂ to balance an equation, what happens chemically?',
    options: [
      'The reaction speeds up because extra oxygen is added.',
      'You change neutral drinking water into hydrogen peroxide, a toxic corrosive bleaching agent.',
      'The atom count balances and the chemical identity remains identical.',
      'The law of conservation of mass is violated instantly.'
    ],
    correctIndex: 1,
    verifyInstruction: 'Subscripts define chemical identity! Changing subscripts changes the compound itself.',
    nodeId: 'c8_chem_011',
  },
  {
    question: 'Predict: In the balanced equation 2Al + 6HCl → 2AlCl₃ + 3H₂, how many total Chlorine atoms are present on the reactant side?',
    options: [
      '2 Chlorine atoms',
      '3 Chlorine atoms',
      '6 Chlorine atoms',
      '12 Chlorine atoms'
    ],
    correctIndex: 2,
    verifyInstruction: 'Multiply the coefficient (6) by the subscript of Cl in HCl (1): 6 × 1 = 6 Chlorine atoms.',
    nodeId: 'c8_chem_012',
  },
];

// -----------------------------------------------------------------------------
// SECTION 5: OBSERVATION_QUESTIONS
// -----------------------------------------------------------------------------
const OBSERVATION_QUESTIONS: { question: string; options: string[]; observableOptions?: string[]; correctIndex: number; nodeId: string }[] = [
  {
    question: 'What do you notice about the total number of MOLECULES before and after balancing N₂ + 3H₂ → 2NH₃?',
    options: [
      'Total molecules remain equal (4 reactants = 4 products).',
      'Total molecules decrease from 4 reactant molecules to 2 product molecules, yet total ATOMS remain exactly 8 on both sides.',
      'Total atoms decrease while total molecules increase.',
      'Mass increases because 2 molecules weigh more than 4 molecules.'
    ],
    correctIndex: 1,
    nodeId: 'c8_chem_009',
  },
  {
    question: 'What happens to the atom counter scale when the coefficient in front of 3Ca(NO₃)₂ is increased from 1 to 3?',
    options: [
      'Calcium increases to 3, Nitrogen increases to 6, Oxygen increases to 18.',
      'Calcium increases to 3, Nitrogen remains 2, Oxygen increases to 6.',
      'Only Calcium increases to 3 while (NO₃)₂ remains unchanged.',
      'Calcium increases to 3, Nitrogen increases to 3, Oxygen increases to 6.'
    ],
    correctIndex: 0,
    nodeId: 'c8_chem_012',
  },
];

// -----------------------------------------------------------------------------
// SECTION 6: REAL_WORLD_ACTIVITY
// -----------------------------------------------------------------------------
const REAL_WORLD_ACTIVITY = {
  title: 'Industrial Ammonia Fertilizer Production (Haber-Bosch Plant)',
  description: 'As the Chief Chemical Engineer at an agricultural fertilizer plant, you must calculate precise reactant gas mass ratios for industrial ammonia synthesis to prevent chemical waste and explosion risk.',
  steps: [
    'Step 1: Write and balance the synthesis reaction equation: N₂(g) + 3H₂(g) → 2NH₃(g).',
    'Step 2: Determine molar masses: N₂ = 28 g/mol, H₂ = 2 g/mol, NH₃ = 17 g/mol.',
    'Step 3: Calculate mass balance: (1 × 28g N₂) + (3 × 2g H₂) = 34g reactants → Yields (2 × 17g) = 34g NH₃ product.',
    'Step 4: Verify Conservation of Mass: 34g Reactants = 34g Products. Specify reactor operating pressure (200 atm) and catalyst (Fe/Al₂O₃).'
  ],
};

// -----------------------------------------------------------------------------
// MISCONCEPTIONS MATRIX
// -----------------------------------------------------------------------------
const MISCONCEPTIONS = [
  {
    id: 'misc_subscript_alteration',
    misconception: 'Changing Subscripts to Balance Equations',
    description: 'Students often alter subscript numbers inside a chemical formula (e.g., changing H₂O to H₂O₂) to balance atoms.',
    correction: 'Subscripts define fixed chemical identity. To balance, place whole-number coefficients in front of chemical formulas.',
    nodeId: 'c8_chem_011'
  },
  {
    id: 'misc_mass_lost_gas',
    misconception: 'Mass Is Lost When Reactions Produce Gas',
    description: 'Believing mass disappears when gas escapes from open test tubes during effervescence.',
    correction: 'Mass is conserved. Gas escaping into open air retains its mass. In closed vessels, total mass stays identical.',
    nodeId: 'c8_chem_009'
  },
  {
    id: 'misc_coefficient_first_atom_only',
    misconception: 'Coefficients Apply Only to Immediately Adjacent Element',
    description: 'Interpreting 2H₂O as having 4 Hydrogens but only 1 Oxygen atom.',
    correction: 'A coefficient distributes across the entire formula unit: 2H₂O = (2×2)=4 H atoms and (2×1)=2 O atoms.',
    nodeId: 'c8_chem_012'
  },
  {
    id: 'misc_molecule_conservation',
    misconception: 'Equal Number of Molecules Required on Both Sides',
    description: 'Expecting reactant molecule count to equal product molecule count.',
    correction: 'Mass conservation guarantees ATOM conservation. Molecules rearrange and their total count can increase, decrease, or stay the same.',
    nodeId: 'c8_chem_009'
  },
  {
    id: 'misc_arrow_equals_sign',
    misconception: 'Reaction Arrow Functions as a Mathematical Equals Sign',
    description: 'Viewing the reaction arrow (→) as a simple algebraic static equality.',
    correction: 'The reaction arrow represents a directional chemical transformation converting reactants into chemically distinct products.',
    nodeId: 'c8_chem_010'
  },
  {
    id: 'misc_parentheses_multiplication',
    misconception: 'Ignoring Parentheses in Polyatomic Formula Multiplication',
    description: 'Counting Ca(OH)₂ as 1 Ca, 1 O, and 2 H atoms.',
    correction: 'Subscripts outside parentheses multiply every atom inside: Ca(OH)₂ contains 1 Ca, 2 O, and 2 H atoms.',
    nodeId: 'c8_chem_012'
  }
];

// -----------------------------------------------------------------------------
// INTERACTION DATA & EQUATION DATASETS
// -----------------------------------------------------------------------------
interface ElementCount {
  [symbol: string]: number;
}

interface ReactantProductSpecies {
  formula: string;
  name: string;
  stateSymbol: 's' | 'l' | 'g' | 'aq';
  composition: ElementCount;
  color: string;
}

export interface InteractiveEquation {
  id: string;
  title: string;
  description: string;
  reactants: ReactantProductSpecies[];
  products: ReactantProductSpecies[];
  correctCoefficients: number[]; // Reactants followed by products
  nodeId: string;
  difficulty: 'foundation' | 'standard' | 'advanced';
  hints: string[];
}

const EQUATION_DATASET: InteractiveEquation[] = [
  {
    id: 'eq_water',
    title: 'Synthesis of Water',
    description: 'Hydrogen gas reacts with oxygen gas to produce liquid water.',
    reactants: [
      { formula: 'H₂', name: 'Hydrogen Gas', stateSymbol: 'g', composition: { H: 2 }, color: '#3B82F6' },
      { formula: 'O₂', name: 'Oxygen Gas', stateSymbol: 'g', composition: { O: 2 }, color: '#EF4444' }
    ],
    products: [
      { formula: 'H₂O', name: 'Water', stateSymbol: 'l', composition: { H: 2, O: 1 }, color: '#06B6D4' }
    ],
    correctCoefficients: [2, 1, 2],
    nodeId: 'c8_chem_013',
    difficulty: 'foundation',
    hints: [
      'Notice oxygen has 2 atoms on the left but only 1 on the right.',
      'Try placing a coefficient of 2 in front of H₂O on the product side.',
      'Now you have 4 H on the right, so adjust H₂ on the left to 2!'
    ]
  },
  {
    id: 'eq_ammonia',
    title: 'Haber Process (Ammonia Synthesis)',
    description: 'Nitrogen gas reacts with hydrogen gas to yield ammonia gas.',
    reactants: [
      { formula: 'N₂', name: 'Nitrogen Gas', stateSymbol: 'g', composition: { N: 2 }, color: '#8B5CF6' },
      { formula: 'H₂', name: 'Hydrogen Gas', stateSymbol: 'g', composition: { H: 2 }, color: '#3B82F6' }
    ],
    products: [
      { formula: 'NH₃', name: 'Ammonia', stateSymbol: 'g', composition: { N: 1, H: 3 }, color: '#10B981' }
    ],
    correctCoefficients: [1, 3, 2],
    nodeId: 'c8_chem_013',
    difficulty: 'foundation',
    hints: [
      'Balance Nitrogen first: 2 N on the left means you need 2 NH₃ on the right.',
      'With 2 NH₃, you now have 2 × 3 = 6 Hydrogen atoms on the right side.',
      'Set the coefficient of H₂ to 3 to get 6 Hydrogens on the left!'
    ]
  },
  {
    id: 'eq_methane_combustion',
    title: 'Combustion of Methane Gas',
    description: 'Methane burns in oxygen to form carbon dioxide and water vapor.',
    reactants: [
      { formula: 'CH₄', name: 'Methane', stateSymbol: 'g', composition: { C: 1, H: 4 }, color: '#F59E0B' },
      { formula: 'O₂', name: 'Oxygen Gas', stateSymbol: 'g', composition: { O: 2 }, color: '#EF4444' }
    ],
    products: [
      { formula: 'CO₂', name: 'Carbon Dioxide', stateSymbol: 'g', composition: { C: 1, O: 2 }, color: '#6B7280' },
      { formula: 'H₂O', name: 'Water Vapor', stateSymbol: 'g', composition: { H: 2, O: 1 }, color: '#06B6D4' }
    ],
    correctCoefficients: [1, 2, 1, 2],
    nodeId: 'c8_chem_015',
    difficulty: 'standard',
    hints: [
      'Carbon is already balanced (1 on each side).',
      'Balance Hydrogen next: 4 H in CH₄ requires 2 H₂O on the product side.',
      'Count total O on the right (2 in CO₂ + 2 in 2H₂O = 4 O). Place coefficient 2 in front of O₂.'
    ]
  },
  {
    id: 'eq_iron_rusting',
    title: 'Oxidation of Iron (Rusting)',
    description: 'Solid iron metal reacts with atmospheric oxygen to form iron(III) oxide.',
    reactants: [
      { formula: 'Fe', name: 'Iron Metal', stateSymbol: 's', composition: { Fe: 1 }, color: '#D97706' },
      { formula: 'O₂', name: 'Oxygen Gas', stateSymbol: 'g', composition: { O: 2 }, color: '#EF4444' }
    ],
    products: [
      { formula: 'Fe₂O₃', name: 'Iron(III) Oxide', stateSymbol: 's', composition: { Fe: 2, O: 3 }, color: '#991B1B' }
    ],
    correctCoefficients: [4, 3, 2],
    nodeId: 'c8_chem_013',
    difficulty: 'standard',
    hints: [
      'Look at Oxygen: O₂ has 2 atoms, Fe₂O₃ has 3 atoms. The least common multiple of 2 and 3 is 6.',
      'To get 6 O atoms, use 3 O₂ on the left and 2 Fe₂O₃ on the right.',
      'Now balance Iron: 2 Fe₂O₃ contains 4 Fe atoms. Place coefficient 4 in front of Fe!'
    ]
  },
  {
    id: 'eq_aluminum_acid',
    title: 'Aluminum Reaction with Hydrochloric Acid',
    description: 'Aluminum metal dissolves in hydrochloric acid producing aluminum chloride and hydrogen gas.',
    reactants: [
      { formula: 'Al', name: 'Aluminum Metal', stateSymbol: 's', composition: { Al: 1 }, color: '#9CA3AF' },
      { formula: 'HCl', name: 'Hydrochloric Acid', stateSymbol: 'aq', composition: { H: 1, Cl: 1 }, color: '#84CC16' }
    ],
    products: [
      { formula: 'AlCl₃', name: 'Aluminum Chloride', stateSymbol: 'aq', composition: { Al: 1, Cl: 3 }, color: '#14B8A6' },
      { formula: 'H₂', name: 'Hydrogen Gas', stateSymbol: 'g', composition: { H: 2 }, color: '#3B82F6' }
    ],
    correctCoefficients: [2, 6, 2, 3],
    nodeId: 'c8_chem_015',
    difficulty: 'advanced',
    hints: [
      'Notice Cl comes in 3s in AlCl₃, while H comes in 2s in H₂. The LCM for H and Cl is 6.',
      'Set HCl coefficient to 6. That gives 6 H and 6 Cl.',
      '6 Cl needs 2 AlCl₃. 6 H needs 3 H₂. 2 AlCl₃ needs 2 Al.'
    ]
  },
  {
    id: 'eq_calcium_carbonate',
    title: 'Limestone Acid Decomposition',
    description: 'Calcium carbonate reacts with aqueous hydrochloric acid to produce calcium chloride, carbon dioxide, and water.',
    reactants: [
      { formula: 'CaCO₃', name: 'Calcium Carbonate', stateSymbol: 's', composition: { Ca: 1, C: 1, O: 3 }, color: '#E5E7EB' },
      { formula: 'HCl', name: 'Hydrochloric Acid', stateSymbol: 'aq', composition: { H: 1, Cl: 1 }, color: '#84CC16' }
    ],
    products: [
      { formula: 'CaCl₂', name: 'Calcium Chloride', stateSymbol: 'aq', composition: { Ca: 1, Cl: 2 }, color: '#6366F1' },
      { formula: 'CO₂', name: 'Carbon Dioxide', stateSymbol: 'g', composition: { C: 1, O: 2 }, color: '#6B7280' },
      { formula: 'H₂O', name: 'Water', stateSymbol: 'l', composition: { H: 2, O: 1 }, color: '#06B6D4' }
    ],
    correctCoefficients: [1, 2, 1, 1, 1],
    nodeId: 'c8_chem_016',
    difficulty: 'advanced',
    hints: [
      'Count Calcium: 1 on left, 1 on right. Balanced.',
      'Look at Chlorine: 2 in CaCl₂ on product side. Place coefficient 2 in front of HCl.',
      'Verify H, C, O counts: 2 H, 1 C, 3 O on both sides!'
    ]
  }
];

// -----------------------------------------------------------------------------
// SECTION 7: CHALLENGES ARRAY (24 items across 3 tiers)
// -----------------------------------------------------------------------------
export interface Challenge {
  id: string;
  nodeId: string;
  type: 'multiple-choice' | 'coefficient-input' | 'drag-sort' | 'true-false';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: string;
  question: string;
  options?: string[];
  correctIndex?: number;
  correctAnswer?: string; // for numeric or string comparison
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
}

const CHALLENGES: Challenge[] = [
  // FOUNDATION (7)
  {
    id: 'chal_01',
    nodeId: 'c8_chem_009',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'Who formulated the fundamental Law of Conservation of Mass in chemical reactions?',
    options: ['John Dalton', 'Antoine Lavoisier', 'Dmitri Mendeleev', 'Robert Boyle'],
    correctIndex: 1,
    explanation: 'Antoine Lavoisier demonstrated through meticulous closed-container experiments that mass is conserved in chemical reactions.',
    hints: [
      'He is known as the father of modern chemistry.',
      'French chemist from the 18th century.',
      'His name starts with L: Antoine Lavoisier.'
    ]
  },
  {
    id: 'chal_02',
    nodeId: 'c8_chem_010',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'In the chemical formula 3H₂O, what does the number "3" represent?',
    options: ['Subscript', 'Coefficient', 'Atomic Number', 'Oxidation State'],
    correctIndex: 1,
    explanation: 'The number placed directly in front of a formula is a coefficient, specifying the relative number of complete formula units.',
    hints: [
      'Subscripts are smaller numbers written lower down.',
      'It multiplies the whole molecule.',
      'It is called a coefficient.'
    ],
    misconceptionIndex: 2
  },
  {
    id: 'chal_03',
    nodeId: 'c8_chem_011',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'Why must you NEVER alter subscripts when balancing a chemical equation?',
    options: [
      'Subscripts make the reaction equation look untidy.',
      'Altering subscripts changes the chemical identity and properties of the substance.',
      'Subscripts are fixed by international legal decree.',
      'Subscripts only apply to liquid state substances.'
    ],
    correctIndex: 1,
    explanation: 'Subscripts define chemical identity. Changing H₂O to H₂O₂ turns drinking water into corrosive hydrogen peroxide!',
    hints: [
      'Think about what H₂O vs H₂O₂ means.',
      'Subscripts dictate chemical identity.',
      'Changing subscripts alters the compound entirely.'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'chal_04',
    nodeId: 'c8_chem_010',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'In a chemical equation, what do the substances written on the left side of the arrow represent?',
    options: ['Products', 'Catalysts', 'Reactants', 'Precipitates'],
    correctIndex: 2,
    explanation: 'Reactants are the starting substances placed on the left side of the reaction arrow.',
    hints: [
      'They react together at the start.',
      'Left side = Reactants.',
      'Right side = Products.'
    ]
  },
  {
    id: 'chal_05',
    nodeId: 'c8_chem_012',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Application',
    question: 'How many total Oxygen atoms are present in 2 molecules of Calcium Nitrate: 2Ca(NO₃)₂?',
    options: ['6 Oxygen atoms', '12 Oxygen atoms', '3 Oxygen atoms', '8 Oxygen atoms'],
    correctIndex: 1,
    explanation: 'In 2Ca(NO₃)₂: Coefficient (2) × Subscript inside (3) × Subscript outside (2) = 2 × 3 × 2 = 12 Oxygen atoms.',
    hints: [
      'Inside parentheses NO₃ has 3 O atoms.',
      'Outside subscript 2 doubles it to 6 O atoms per molecule.',
      'Coefficient 2 doubles 6 to 12 Oxygen atoms total.'
    ],
    misconceptionIndex: 5
  },
  {
    id: 'chal_06',
    nodeId: 'c8_chem_014',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'Which state symbol represents a chemical substance dissolved in water?',
    options: ['(s)', '(l)', '(g)', '(aq)'],
    correctIndex: 3,
    explanation: '(aq) stands for aqueous, meaning dissolved in water.',
    hints: [
      'Aqua means water in Latin.',
      'Short form of aqueous.',
      'The symbol is (aq).'
    ]
  },
  {
    id: 'chal_07',
    nodeId: 'c8_chem_009',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'When magnesium ribbon burns in air, the white ash (MgO) formed weighs MORE than the initial magnesium ribbon. Does this violate mass conservation?',
    options: [
      'Yes, mass was created out of light energy.',
      'No, because atmospheric oxygen gas reacted and combined into the solid MgO mass.',
      'Yes, because magnesium atoms duplicated during heating.',
      'No, because ash is naturally denser than pure metal.'
    ],
    correctIndex: 1,
    explanation: 'Oxygen gas from air reacted with Mg: 2Mg(s) + O₂(g) → 2MgO(s). The added mass equals the mass of oxygen gas consumed.',
    hints: [
      'What gas in the air combined with Magnesium?',
      'Oxygen gas reacted from surrounding air.',
      'Mass of Mg + Mass of O₂ = Mass of MgO.'
    ],
    misconceptionIndex: 1
  },

  // STANDARD (8)
  {
    id: 'chal_08',
    nodeId: 'c8_chem_013',
    type: 'coefficient-input',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'What is the coefficient of H₂ when balancing: __ N₂ + __ H₂ → 2 NH₃ ?',
    correctAnswer: '3',
    explanation: '2 NH₃ contains 6 H atoms. To match 6 H atoms on the left, we need 3 H₂ molecules (3 × 2 = 6).',
    hints: [
      'Product side has 2 molecules of NH₃.',
      'Total H on product side = 2 × 3 = 6 H atoms.',
      'Left side has H₂. 6 divided by 2 is 3.'
    ]
  },
  {
    id: 'chal_09',
    nodeId: 'c8_chem_013',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'Which set of coefficients correctly balances: __ H₂ + __ O₂ → __ H₂O ?',
    options: ['1, 1, 1', '2, 1, 2', '2, 2, 2', '1, 2, 2'],
    correctIndex: 1,
    explanation: '2H₂ + 1O₂ → 2H₂O yields 4 H and 2 O atoms on both sides of the equation.',
    hints: [
      'Oxygen has 2 atoms on left (O₂), but 1 in H₂O.',
      'You need 2 H₂O on the right.',
      '2 H₂O needs 2 H₂ on the left. So 2, 1, 2.'
    ]
  },
  {
    id: 'chal_10',
    nodeId: 'c8_chem_012',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'Count the total number of atoms in 3 molecules of Aluminium Sulphate: 3Al₂(SO₄)₃.',
    options: ['51 atoms', '45 atoms', '34 atoms', '63 atoms'],
    correctIndex: 0,
    explanation: 'Per molecule: 2 Al + 3 S + 12 O = 17 atoms. For 3 molecules: 3 × 17 = 51 total atoms!',
    hints: [
      'Count atoms in one Al₂(SO₄)₃ unit first.',
      'Al=2, S=3, O=12 → 2+3+12 = 17 atoms.',
      'Multiply by coefficient 3: 3 × 17 = 51 atoms.'
    ]
  },
  {
    id: 'chal_11',
    nodeId: 'c8_chem_015',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'Balance the methane combustion equation: CH₄ + __ O₂ → CO₂ + __ H₂O. What are the oxygen and water coefficients?',
    options: ['O₂ = 1, H₂O = 2', 'O₂ = 2, H₂O = 2', 'O₂ = 2, H₂O = 1', 'O₂ = 3, H₂O = 2'],
    correctIndex: 1,
    explanation: 'CH₄ + 2O₂ → CO₂ + 2H₂O gives 1 C, 4 H, and 4 O on both sides.',
    hints: [
      '4 H in CH₄ requires 2 H₂O on product side.',
      'Total O on product side = 2 (in CO₂) + 2 (in 2H₂O) = 4 O.',
      '4 O atoms requires 2 O₂ molecules.'
    ]
  },
  {
    id: 'chal_12',
    nodeId: 'c8_chem_014',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Understanding',
    question: 'What does the Greek symbol Delta (Δ) written above a reaction arrow signify?',
    options: [
      'The reaction requires a light catalyst.',
      'The reaction requires thermal energy (heat) to be supplied.',
      'The reaction takes place at 0°C freezing point.',
      'The reaction is reversible under high pressure.'
    ],
    correctIndex: 1,
    explanation: 'The uppercase delta symbol (Δ) above the arrow denotes heating the reactants.',
    hints: [
      'Think of thermal delta T.',
      'It represents heat input.',
      'Heat added to reactants.'
    ]
  },
  {
    id: 'chal_13',
    nodeId: 'c8_chem_016',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'According to stoichiometry, how many moles of Oxygen gas are needed to react completely with 4 moles of Iron to form Fe₂O₃?',
    options: ['2 moles O₂', '3 moles O₂', '4 moles O₂', '6 moles O₂'],
    correctIndex: 1,
    explanation: 'From the balanced equation 4Fe + 3O₂ → 2Fe₂O₃, 4 moles of Fe react with exactly 3 moles of O₂.',
    hints: [
      'Check balanced equation: 4Fe + 3O₂ → 2Fe₂O₃.',
      'The stoichiometric ratio of Fe : O₂ is 4 : 3.',
      '4 moles of Fe requires 3 moles of O₂.'
    ]
  },
  {
    id: 'chal_14',
    nodeId: 'c8_chem_013',
    type: 'coefficient-input',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'What coefficient is needed for HCl in: Mg + __ HCl → MgCl₂ + H₂ ?',
    correctAnswer: '2',
    explanation: 'MgCl₂ contains 2 Cl and H₂ contains 2 H. Placing coefficient 2 in front of HCl balances both H and Cl.',
    hints: [
      'Product side has 2 Chlorine atoms (MgCl₂) and 2 Hydrogen atoms (H₂).',
      'Reactant side has single HCl.',
      'Coefficient must be 2.'
    ]
  },
  {
    id: 'chal_15',
    nodeId: 'c8_chem_009',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'If 100g of CaCO₃ completely decomposes into 56g of solid CaO and CO₂ gas, what mass of CO₂ gas was evolved?',
    options: ['56g', '44g', '100g', '156g'],
    correctIndex: 1,
    explanation: 'By Law of Conservation of Mass: Mass of CaCO₃ = Mass of CaO + Mass of CO₂. 100g - 56g = 44g of CO₂ gas.',
    hints: [
      'Reactant Mass = Product Mass 1 + Product Mass 2.',
      '100g = 56g + CO₂ mass.',
      '100 - 56 = 44g.'
    ]
  },

  // ADVANCED (9)
  {
    id: 'chal_16',
    nodeId: 'c8_chem_013',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'What is the sum of all coefficients in the fully balanced equation: __ Al + __ HCl → __ AlCl₃ + __ H₂ ?',
    options: ['10', '13', '12', '15'],
    correctIndex: 1,
    explanation: 'Balanced equation: 2Al + 6HCl → 2AlCl₃ + 3H₂. Sum of coefficients = 2 + 6 + 2 + 3 = 13.',
    hints: [
      'Balance equation first: 2 Al + 6 HCl → 2 AlCl₃ + 3 H₂.',
      'Add the coefficients: 2 + 6 + 2 + 3.',
      'Sum equals 13.'
    ]
  },
  {
    id: 'chal_17',
    nodeId: 'c8_chem_015',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'Balance propane combustion: C₃H₈ + __ O₂ → 3 CO₂ + 4 H₂O. What is the coefficient for O₂?',
    options: ['4', '5', '7', '10'],
    correctIndex: 1,
    explanation: 'Products have (3×2) + (4×1) = 6 + 4 = 10 Oxygen atoms. 10 O atoms divided by 2 (O₂) = 5 O₂ molecules.',
    hints: [
      'Count total Oxygen atoms on product side: 3 CO₂ = 6 O, 4 H₂O = 4 O.',
      'Total product O atoms = 10.',
      'Oxygen gas is O₂, so coefficient = 10 / 2 = 5.'
    ]
  },
  {
    id: 'chal_18',
    nodeId: 'c8_chem_016',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'When Potassium Chlorate thermal decomposition is balanced: 2 KClO₃ → 2 KCl + __ O₂, how many liters of O₂ gas at STP are produced from 2 moles of KClO₃?',
    options: ['22.4 L', '44.8 L', '67.2 L', '11.2 L'],
    correctIndex: 2,
    explanation: '2 KClO₃ yields 3 moles of O₂. At STP, 1 mole of gas = 22.4 L. 3 moles × 22.4 L/mol = 67.2 Liters of O₂!',
    hints: [
      'Balance KClO₃: 2 KClO₃ → 2 KCl + 3 O₂.',
      '3 moles of O₂ gas are produced.',
      'At STP, 1 mole = 22.4 L. 3 × 22.4 = 67.2 L.'
    ]
  },
  {
    id: 'chal_19',
    nodeId: 'c8_chem_012',
    type: 'coefficient-input',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'Calculate total Nitrogen atoms present in 4 molecules of Lead(II) Nitrate: 4 Pb(NO₃)₂.',
    correctAnswer: '8',
    explanation: 'Each Pb(NO₃)₂ has 2 N atoms. 4 molecules × 2 N = 8 Nitrogen atoms.',
    hints: [
      'Subscript outside (NO₃)₂ is 2, giving 2 N per molecule.',
      'Coefficient in front is 4.',
      '4 × 2 = 8 Nitrogen atoms.'
    ]
  },
  {
    id: 'chal_20',
    nodeId: 'c8_chem_013',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Synthesis',
    question: 'Which step should be performed FIRST when balancing complex organic hydrocarbon combustion reactions?',
    options: [
      'Balance Oxygen atoms first.',
      'Balance Carbon atoms first, followed by Hydrogen, leaving free element Oxygen for last.',
      'Change subscripts of products to match reactants.',
      'Multiply all formulas by 0.5.'
    ],
    correctIndex: 1,
    explanation: 'Rule of thumb: Balance Carbon first, then Hydrogen, and leave elemental Oxygen (O₂) for last since adjusting O₂ does not disrupt C or H.',
    hints: [
      'Leave free elements like O₂ for the final step.',
      'Start with Carbon, then Hydrogen.',
      'C → H → O.'
    ]
  },
  {
    id: 'chal_21',
    nodeId: 'c8_chem_014',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'Identify the complete balanced equation including correct state symbols for limestone decomposition when heated:',
    options: [
      'CaCO₃(s) --(Δ)--> CaO(s) + CO₂(g)',
      'CaCO₃(aq) --(Δ)--> CaO(l) + CO₂(aq)',
      '2CaCO₃(s) --> 2CaO(s) + 3CO₂(g)',
      'CaCO₃(g) --(Δ)--> CaO(s) + CO₂(l)'
    ],
    correctIndex: 0,
    explanation: 'Solid calcium carbonate decomposes upon heating (Δ) into solid quicklime (CaO) and carbon dioxide gas (CO₂).',
    hints: [
      'Limestone is a solid: (s).',
      'Quicklime is solid (s) and CO₂ is a gas (g).',
      'Heating requires the delta symbol Δ.'
    ]
  },
  {
    id: 'chal_22',
    nodeId: 'c8_chem_016',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Synthesis',
    question: 'If 4 moles of Na react completely with water: 2Na + 2H₂O → 2NaOH + H₂, how many moles of H₂ gas are produced?',
    options: ['1 mole', '2 moles', '4 moles', '0.5 moles'],
    correctIndex: 1,
    explanation: 'From ratio 2 Na : 1 H₂, 4 moles of Na will yield (4 / 2) × 1 = 2 moles of H₂ gas.',
    hints: [
      'Ratio of Na to H₂ is 2 : 1.',
      'If 2 moles Na gives 1 mole H₂...',
      'Then 4 moles Na will yield 2 moles H₂.'
    ]
  },
  {
    id: 'chal_23',
    nodeId: 'c8_chem_011',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Analysis',
    question: 'What is wrong with writing H₂ + O → H₂O as a chemical equation for water synthesis?',
    options: [
      'Elemental oxygen exists as diatomic O₂ gas in nature, not single isolated O atoms.',
      'Water formula is H₃O, not H₂O.',
      'Hydrogen exists as single H atoms.',
      'Nothing is wrong, it is perfectly balanced.'
    ],
    correctIndex: 0,
    explanation: 'Oxygen is a diatomic gas (O₂). Writing atomic O violates chemical reality for natural elemental states.',
    hints: [
      'Think of seven diatomic elements (H₂, N₂, O₂, F₂, Cl₂, Br₂, I₂).',
      'Oxygen gas molecules are diatomic: O₂.',
      'Atomic O does not exist standardly in atmosphere.'
    ]
  },
  {
    id: 'chal_24',
    nodeId: 'c8_chem_009',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'In a sealed rigid steel cylinder, 12g Carbon reacts with 32g Oxygen gas to form 44g CO₂ gas. What happens to total cylinder mass after reaction?',
    options: [
      'Mass decreases because gas pressure compresses atoms.',
      'Mass increases because CO₂ gas is heavier than elemental oxygen.',
      'Total mass remains exactly 44g + container weight due to Conservation of Mass.',
      'Mass drops to zero because chemical bonds store energy.'
    ],
    correctIndex: 2,
    explanation: 'In a sealed vessel, matter cannot enter or leave. Reactants (12g + 32g = 44g) equal Product (44g). Total vessel mass is strictly conserved.',
    hints: [
      'Container is sealed.',
      '12g + 32g = 44g.',
      'Mass before = Mass after.'
    ]
  }
];

// -----------------------------------------------------------------------------
// SECTION 8: CUSTOM SVG DIAGRAM COMPONENTS
// -----------------------------------------------------------------------------

// 1. Interactive Balance Scale Diagram
const AtomBalanceScaleSVG: React.FC<{
  leftAtoms: ElementCount;
  rightAtoms: ElementCount;
  isBalanced: boolean;
}> = ({ leftAtoms, rightAtoms, isBalanced }) => {
  const elements = useMemo(() => {
    const keys = new Set([...Object.keys(leftAtoms), ...Object.keys(rightAtoms)]);
    return Array.from(keys);
  }, [leftAtoms, rightAtoms]);

  let totalLeft = 0;
  let totalRight = 0;
  elements.forEach(el => {
    totalLeft += leftAtoms[el] || 0;
    totalRight += rightAtoms[el] || 0;
  });

  const tiltAngle = isBalanced
    ? 0
    : Math.max(-15, Math.min(15, (totalRight - totalLeft) * 3));

  return (
    <div className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 flex flex-col items-center">
      <div className="flex items-center gap-2 mb-2 text-sm font-semibold text-slate-300">
        <Scale className={`w-5 h-5 ${isBalanced ? 'text-emerald-400' : 'text-amber-400'}`} />
        <span>Atomic Conservation Scale</span>
        <span className={`ml-2 px-2 py-0.5 rounded text-xs font-bold ${isBalanced ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
          {isBalanced ? 'BALANCED (MASS CONSERVED)' : 'UNBALANCED'}
        </span>
      </div>

      <svg viewBox="0 0 500 220" className="w-full h-48 drop-shadow-md overflow-visible">
        {/* Fulcrum base */}
        <polygon points="250,140 220,200 280,200" fill="#334155" stroke="#475569" strokeWidth="2" />
        <circle cx="250" cy="140" r="8" fill="#64748B" />

        {/* Dynamic Rotating Beam */}
        <g transform={`rotate(${tiltAngle}, 250, 140)`} className="transition-transform duration-500 ease-out">
          {/* Main Beam */}
          <line x1="60" y1="140" x2="440" y2="140" stroke="#94A3B8" strokeWidth="6" strokeLinecap="round" />

          {/* Left Pan Chains & Bowl */}
          <g transform="translate(60, 140)">
            <line x1="0" y1="0" x2="-30" y2="40" stroke="#64748B" strokeWidth="2" />
            <line x1="0" y1="0" x2="30" y2="40" stroke="#64748B" strokeWidth="2" />
            <path d="M -45 40 Q 0 65 45 40 Z" fill="#1E293B" stroke="#64748B" strokeWidth="2" />
            {/* Left Pan Text & Atoms preview */}
            <text x="0" y="55" textAnchor="middle" fill="#38BDF8" className="text-xs font-bold" transform={`rotate(${-tiltAngle}, 0, 55)`}>
              Reactant Atoms: {totalLeft}
            </text>
          </g>

          {/* Right Pan Chains & Bowl */}
          <g transform="translate(440, 140)">
            <line x1="0" y1="0" x2="-30" y2="40" stroke="#64748B" strokeWidth="2" />
            <line x1="0" y1="0" x2="30" y2="40" stroke="#64748B" strokeWidth="2" />
            <path d="M -45 40 Q 0 65 45 40 Z" fill="#1E293B" stroke="#64748B" strokeWidth="2" />
            {/* Right Pan Text */}
            <text x="0" y="55" textAnchor="middle" fill="#F43F5E" className="text-xs font-bold" transform={`rotate(${-tiltAngle}, 0, 55)`}>
              Product Atoms: {totalRight}
            </text>
          </g>
        </g>
      </svg>
    </div>
  );
};

// 2. Molecule Structural SVG Visualizer
const MolecularVisualizerSVG: React.FC<{
  formula: string;
  count: number;
  color: string;
}> = ({ formula, count, color }) => {
  const getAtomLayout = (form: string) => {
    switch (form) {
      case 'H₂':
        return [
          { symbol: 'H', x: 25, y: 30, r: 12, c: '#E2E8F0' },
          { symbol: 'H', x: 55, y: 30, r: 12, c: '#E2E8F0' }
        ];
      case 'O₂':
        return [
          { symbol: 'O', x: 25, y: 30, r: 15, c: '#EF4444' },
          { symbol: 'O', x: 55, y: 30, r: 15, c: '#EF4444' }
        ];
      case 'N₂':
        return [
          { symbol: 'N', x: 25, y: 30, r: 15, c: '#8B5CF6' },
          { symbol: 'N', x: 55, y: 30, r: 15, c: '#8B5CF6' }
        ];
      case 'H₂O':
        return [
          { symbol: 'O', x: 40, y: 25, r: 16, c: '#EF4444' },
          { symbol: 'H', x: 20, y: 45, r: 11, c: '#E2E8F0' },
          { symbol: 'H', x: 60, y: 45, r: 11, c: '#E2E8F0' }
        ];
      case 'NH₃':
        return [
          { symbol: 'N', x: 40, y: 25, r: 16, c: '#8B5CF6' },
          { symbol: 'H', x: 18, y: 48, r: 10, c: '#E2E8F0' },
          { symbol: 'H', x: 40, y: 52, r: 10, c: '#E2E8F0' },
          { symbol: 'H', x: 62, y: 48, r: 10, c: '#E2E8F0' }
        ];
      case 'CH₄':
        return [
          { symbol: 'C', x: 40, y: 35, r: 16, c: '#475569' },
          { symbol: 'H', x: 40, y: 12, r: 10, c: '#E2E8F0' },
          { symbol: 'H', x: 16, y: 35, r: 10, c: '#E2E8F0' },
          { symbol: 'H', x: 64, y: 35, r: 10, c: '#E2E8F0' },
          { symbol: 'H', x: 40, y: 58, r: 10, c: '#E2E8F0' }
        ];
      case 'CO₂':
        return [
          { symbol: 'C', x: 40, y: 35, r: 16, c: '#475569' },
          { symbol: 'O', x: 14, y: 35, r: 14, c: '#EF4444' },
          { symbol: 'O', x: 66, y: 35, r: 14, c: '#EF4444' }
        ];
      case 'Fe':
        return [{ symbol: 'Fe', x: 40, y: 35, r: 18, c: '#D97706' }];
      case 'Fe₂O₃':
        return [
          { symbol: 'Fe', x: 25, y: 35, r: 16, c: '#D97706' },
          { symbol: 'Fe', x: 55, y: 35, r: 16, c: '#D97706' },
          { symbol: 'O', x: 12, y: 18, r: 12, c: '#EF4444' },
          { symbol: 'O', x: 40, y: 15, r: 12, c: '#EF4444' },
          { symbol: 'O', x: 68, y: 18, r: 12, c: '#EF4444' }
        ];
      default:
        return [{ symbol: formula, x: 40, y: 35, r: 18, c: color }];
    }
  };

  const atoms = getAtomLayout(formula);

  return (
    <div className="flex flex-wrap gap-2 items-center justify-center p-2 bg-slate-950/60 rounded-lg border border-slate-800 min-h-[90px]">
      {Array.from({ length: Math.min(count, 8) }).map((_, idx) => (
        <div key={idx} className="relative group transition-transform hover:scale-110">
          <svg width="80" height="70" viewBox="0 0 80 70">
            {/* Draw connecting lines for molecules */}
            {atoms.length > 1 && atoms.map((atom, i) => {
              if (i === 0) return null;
              return (
                <line
                  key={`line-${i}`}
                  x1={atoms[0].x}
                  y1={atoms[0].y}
                  x2={atom.x}
                  y2={atom.y}
                  stroke="#94A3B8"
                  strokeWidth="3"
                />
              );
            })}
            {/* Draw Atom Circles */}
            {atoms.map((atom, i) => (
              <g key={`atom-${i}`}>
                <circle
                  cx={atom.x}
                  cy={atom.y}
                  r={atom.r}
                  fill={atom.c}
                  stroke="#0F172A"
                  strokeWidth="1.5"
                />
                <text
                  x={atom.x}
                  y={atom.y + 4}
                  textAnchor="middle"
                  fill={atom.c === '#E2E8F0' ? '#0F172A' : '#FFFFFF'}
                  fontSize="10"
                  fontWeight="bold"
                >
                  {atom.symbol}
                </text>
              </g>
            ))}
          </svg>
        </div>
      ))}
      {count > 8 && (
        <span className="text-xs font-bold text-slate-400 self-center">
          + {count - 8} more...
        </span>
      )}
    </div>
  );
};

// 3. Energy Reaction Pathway SVG
const ReactionEnergyPathwaySVG: React.FC = () => (
  <div className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4">
    <div className="flex items-center gap-2 mb-2 text-sm font-semibold text-slate-300">
      <Flame className="w-4 h-4 text-amber-400" />
      <span>Reaction Energy & Bond Rearrangement Profile</span>
    </div>
    <svg viewBox="0 0 400 160" className="w-full h-36">
      <line x1="40" y1="140" x2="380" y2="140" stroke="#475569" strokeWidth="2" />
      <line x1="40" y1="20" x2="40" y2="140" stroke="#475569" strokeWidth="2" />
      <text x="25" y="80" fill="#94A3B8" fontSize="10" transform="rotate(-90,25,80)" textAnchor="middle">Energy (kJ)</text>
      <text x="210" y="155" fill="#94A3B8" fontSize="10" textAnchor="middle">Reaction Coordinate →</text>

      {/* Exothermic Reaction Curve */}
      <path
        d="M 40 90 Q 120 90 160 30 Q 200 130 380 120"
        fill="none"
        stroke="#F59E0B"
        strokeWidth="3"
        strokeDasharray="4 2"
      />
      {/* Activation Energy Peak Indicator */}
      <line x1="160" y1="30" x2="160" y2="90" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="2 2" />
      <text x="165" y="60" fill="#EF4444" fontSize="9" fontWeight="bold">Activation Energy (Eₐ)</text>

      {/* Reactants and Products labels */}
      <circle cx="60" cy="90" r="4" fill="#38BDF8" />
      <text x="60" y="80" fill="#38BDF8" fontSize="10" fontWeight="bold" textAnchor="middle">Reactants</text>
      <text x="60" y="105" fill="#64748B" fontSize="8" textAnchor="middle">Bonds Break</text>

      <circle cx="350" cy="120" r="4" fill="#10B981" />
      <text x="350" y="110" fill="#10B981" fontSize="10" fontWeight="bold" textAnchor="middle">Products</text>
      <text x="350" y="135" fill="#64748B" fontSize="8" textAnchor="middle">Bonds Form</text>
    </svg>
  </div>
);

// 4. State Symbols Diagram SVG
const StateSymbolsDiagramSVG: React.FC = () => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full">
    <div className="bg-slate-900 border border-slate-700 rounded-lg p-3 text-center">
      <div className="inline-block px-2.5 py-1 rounded bg-amber-500/20 text-amber-400 font-mono font-bold text-sm mb-1">
        (s) Solid
      </div>
      <p className="text-xs text-slate-400">Fixed shape & volume. Packed atomic lattice.</p>
    </div>
    <div className="bg-slate-900 border border-slate-700 rounded-lg p-3 text-center">
      <div className="inline-block px-2.5 py-1 rounded bg-gold-500/20 text-gold-400 font-mono font-bold text-sm mb-1">
        (l) Liquid
      </div>
      <p className="text-xs text-slate-400">Fluid pure liquid state (e.g., pure H₂O).</p>
    </div>
    <div className="bg-slate-900 border border-slate-700 rounded-lg p-3 text-center">
      <div className="inline-block px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 font-mono font-bold text-sm mb-1">
        (g) Gas
      </div>
      <p className="text-xs text-slate-400">Free energetic molecules in vapor phase.</p>
    </div>
    <div className="bg-slate-900 border border-slate-700 rounded-lg p-3 text-center">
      <div className="inline-block px-2.5 py-1 rounded bg-purple-500/20 text-purple-400 font-mono font-bold text-sm mb-1">
        (aq) Aqueous
      </div>
      <p className="text-xs text-slate-400">Substance dissolved uniformly in water solution.</p>
    </div>
  </div>
);

// -----------------------------------------------------------------------------
// SECTION 8.5: CANVAS PARTICLE SIMULATOR
// -----------------------------------------------------------------------------
const AtomParticleCanvas: React.FC<{
  coefficients: number[];
  equation: InteractiveEquation;
}> = ({ coefficients, equation }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      color: string;
      radius: number;
      label: string;
    }> = [];

    // Initialize particles based on coefficients
    equation.reactants.forEach((species, idx) => {
      const coeff = coefficients[idx] || 1;
      for (let i = 0; i < coeff * 3; i++) {
        particles.push({
          x: Math.random() * (canvas.width / 2 - 40) + 20,
          y: Math.random() * (canvas.height - 40) + 20,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          color: species.color,
          radius: 8,
          label: species.formula
        });
      }
    });

    equation.products.forEach((species, idx) => {
      const coeff = coefficients[equation.reactants.length + idx] || 1;
      for (let i = 0; i < coeff * 3; i++) {
        particles.push({
          x: Math.random() * (canvas.width / 2 - 40) + canvas.width / 2 + 20,
          y: Math.random() * (canvas.height - 40) + 20,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          color: species.color,
          radius: 10,
          label: species.formula
        });
      }
    });

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw Center Dividing Catalyst Barrier
      ctx.strokeStyle = '#334155';
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2, 0);
      ctx.lineTo(canvas.width / 2, canvas.height);
      ctx.stroke();
      ctx.setLineDash([]);

      // Labels
      ctx.fillStyle = '#64748B';
      ctx.font = '10px sans-serif';
      ctx.fillText('REACTANT CHAMBER', 10, 15);
      ctx.fillText('PRODUCT CHAMBER', canvas.width / 2 + 10, 15);

      // Animate Particles
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x - p.radius < 0 || p.x + p.radius > canvas.width) p.vx *= -1;
        if (p.y - p.radius < 0 || p.y + p.radius > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        ctx.strokeStyle = '#0F172A';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 8px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(p.label, p.x, p.y + 3);
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [coefficients, equation]);

  return (
    <div className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 flex flex-col items-center">
      <div className="flex items-center justify-between w-full mb-2">
        <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
          <Zap className="w-3.5 h-3.5 text-gold-400" /> Kinetic Collision & Atom Rearrangement Chamber
        </span>
        <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
          Live Kinetic Model
        </span>
      </div>
      <canvas
        ref={canvasRef}
        width={460}
        height={130}
        className="w-full h-32 rounded-lg bg-slate-900/80 border border-slate-800"
      />
    </div>
  );
};

// -----------------------------------------------------------------------------
// MAIN COMPONENT
// -----------------------------------------------------------------------------
const C8_ChemistryChemicalequationsbalancingSim: React.FC<ComponentProps> = ({
  onComplete,
  initialNodeId
}) => {
  // ---------------------------------------------------------------------------
  // STATE MANAGEMENT
  // ---------------------------------------------------------------------------
  const [activeTab, setActiveTab] = useState<'discovery' | 'lab' | 'challenges' | 'summary'>('discovery');
  const [selectedEqIndex, setSelectedEqIndex] = useState<number>(0);

  const currentEquation = EQUATION_DATASET[selectedEqIndex];

  // Coefficients state for current interactive equation
  const [coefficients, setCoefficients] = useState<number[]>(() => {
    const totalSpecies = currentEquation.reactants.length + currentEquation.products.length;
    return Array(totalSpecies).fill(1);
  });

  // Lab step active index
  const [activeLabStep, setActiveLabStep] = useState<number>(0);

  // Discovery State
  const [discoverySelected, setDiscoverySelected] = useState<number | null>(null);
  const [discoverySubmitted, setDiscoverySubmitted] = useState<boolean>(false);
  const [predictionAnswers, setPredictionAnswers] = useState<(number | null)[]>([null, null]);
  const [predictionSubmitted, setPredictionSubmitted] = useState<boolean[]>([false, false]);

  // Observation State
  const [observationAnswers, setObservationAnswers] = useState<(number | null)[]>([null, null]);
  const [observationSubmitted, setObservationSubmitted] = useState<boolean[]>([false, false]);

  // Challenges State
  const [currentChallengeIdx, setCurrentChallengeIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [textAnswer, setTextAnswer] = useState<string>('');
  const [challengeSubmitted, setChallengeSubmitted] = useState<boolean>(false);
  const [challengeFeedback, setChallengeFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);

  // Global Progress & BKT State
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [completedChallenges, setCompletedChallenges] = useState<Set<string>>(new Set());

  // SRS Review Items
  const [srsItems, setSrsItems] = useState<Record<string, ReviewItem>>(() => {
    const initial: Record<string, ReviewItem> = {};
    ALL_NODE_IDS.forEach(nodeId => {
      initial[nodeId] = createReviewItem(nodeId);
    });
    return initial;
  });

  // BKT States
  const [bktStates, setBktStates] = useState<Record<string, BKTState>>(() => {
    const initial: Record<string, BKTState> = {};
    ALL_NODE_IDS.forEach(nodeId => {
      initial[nodeId] = createBKTState(nodeId);
    });
    return initial;
  });

  // UI Visual Effects State
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHintText, setCurrentHintText] = useState<string>('');

  // Auto-hint timer reference
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Reset coefficients when equation changes
  useEffect(() => {
    const totalSpecies = currentEquation.reactants.length + currentEquation.products.length;
    setCoefficients(Array(totalSpecies).fill(1));
  }, [selectedEqIndex, currentEquation]);

  // Speech helper trigger
  const triggerSpeech = useCallback((text: string) => {
    speechManager.speak(text);
  }, []);

  // Audio helper trigger
  const triggerAudio = useCallback((sound: SoundEffect) => {
    audioManager.play(sound);
  }, []);

  // Auto hint 10s timer
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      if (activeTab === 'challenges' && !challengeSubmitted) {
        setShowHint(true);
        const activeChal = CHALLENGES[currentChallengeIdx];
        setCurrentHintText(activeChal.hints[0]);
        triggerAudio('hint');
      }
    }, 12000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [activeTab, currentChallengeIdx, challengeSubmitted, triggerAudio]);

  // ---------------------------------------------------------------------------
  // COMPUTED ATOM TALLIES FOR WORKBENCH
  // ---------------------------------------------------------------------------
  const { leftTally, rightTally, isBalanced } = useMemo(() => {
    const left: ElementCount = {};
    const right: ElementCount = {};

    // Reactants tally
    currentEquation.reactants.forEach((species, idx) => {
      const coeff = coefficients[idx] || 1;
      Object.entries(species.composition).forEach(([elem, count]) => {
        left[elem] = (left[elem] || 0) + count * coeff;
      });
    });

    // Products tally
    currentEquation.products.forEach((species, idx) => {
      const coeff = coefficients[currentEquation.reactants.length + idx] || 1;
      Object.entries(species.composition).forEach(([elem, count]) => {
        right[elem] = (right[elem] || 0) + count * coeff;
      });
    });

    // Check balancing equality
    const allElements = new Set([...Object.keys(left), ...Object.keys(right)]);
    let balanced = true;
    allElements.forEach(elem => {
      if ((left[elem] || 0) !== (right[elem] || 0)) {
        balanced = false;
      }
    });

    return { leftTally: left, rightTally: right, isBalanced: balanced };
  }, [coefficients, currentEquation]);

  // Handle coefficient stepper change
  const handleCoefficientChange = (index: number, delta: number) => {
    triggerAudio('count');
    setCoefficients(prev => {
      const next = [...prev];
      const newVal = Math.max(1, Math.min(10, next[index] + delta));
      next[index] = newVal;
      return next;
    });
  };

  // ---------------------------------------------------------------------------
  // HANDLERS: DISCOVERY & PREDICTIONS
  // ---------------------------------------------------------------------------
  const handleDiscoverySubmit = () => {
    if (discoverySelected === null) return;
    setDiscoverySubmitted(true);
    const isCorrect = discoverySelected === DISCOVERY_QUESTION.correctIndex;
    if (isCorrect) {
      triggerAudio('celebration');
      triggerSpeech('Excellent observation! Mass is conserved even when invisible gas is produced.');
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    } else {
      triggerAudio('error');
      triggerSpeech('Not quite! Remember Antoine Lavoisier\'s Law of Conservation of Mass.');
    }
  };

  const handlePredictionSubmit = (index: number) => {
    if (predictionAnswers[index] === null) return;
    const nextSubmitted = [...predictionSubmitted];
    nextSubmitted[index] = true;
    setPredictionSubmitted(nextSubmitted);

    const isCorrect = predictionAnswers[index] === PREDICTION_QUESTIONS[index].correctIndex;
    if (isCorrect) {
      triggerAudio('success');
      triggerSpeech('Correct prediction!');
    } else {
      triggerAudio('error');
    }
  };

  const handleObservationSubmit = (index: number) => {
    if (observationAnswers[index] === null) return;
    const nextSubmitted = [...observationSubmitted];
    nextSubmitted[index] = true;
    setObservationSubmitted(nextSubmitted);

    const isCorrect = observationAnswers[index] === OBSERVATION_QUESTIONS[index].correctIndex;
    if (isCorrect) {
      triggerAudio('success');
      triggerSpeech('Great scientific observation!');
    } else {
      triggerAudio('error');
    }
  };

  // ---------------------------------------------------------------------------
  // HANDLERS: CHALLENGES & BKT UPDATES
  // ---------------------------------------------------------------------------
  const handleChallengeSubmit = () => {
    if (challengeSubmitted) return;

    const chal = CHALLENGES[currentChallengeIdx];
    let isCorrect = false;

    if (chal.type === 'multiple-choice') {
      isCorrect = selectedOption === chal.correctIndex;
    } else if (chal.type === 'coefficient-input') {
      isCorrect = textAnswer.trim() === chal.correctAnswer;
    }

    setChallengeSubmitted(true);

    // BKT & SRS Update
    const currentBkt = bktStates[chal.nodeId] || createBKTState(chal.nodeId);
    const updatedBkt = bktUpdate(currentBkt, isCorrect);
    setBktStates(prev => ({ ...prev, [chal.nodeId]: updatedBkt }));

    const currentSrs = srsItems[chal.nodeId] || createReviewItem(chal.nodeId);
    const updatedSrs = sm2Update(currentSrs, isCorrect ? 5 : 2);
    setSrsItems(prev => ({ ...prev, [chal.nodeId]: updatedSrs }));

    if (isCorrect) {
      triggerAudio('success');
      triggerAudio('pop');
      triggerSpeech('Outstanding answer! Keep going.');
      setScore(prev => prev + 10);
      setStreak(prev => prev + 1);
      setCompletedChallenges(prev => new Set(prev).add(chal.id));
      setChallengeFeedback({ isCorrect: true, message: 'Correct! ' + chal.explanation });
      setShowSparkle(true);
      setTimeout(() => setShowSparkle(false), 2000);
    } else {
      triggerAudio('error');
      triggerSpeech('That is incorrect. Review the atomic composition concept.');
      setStreak(0);
      setChallengeFeedback({ isCorrect: false, message: 'Incorrect. ' + chal.explanation });
    }
  };

  const nextChallenge = () => {
    setChallengeSubmitted(false);
    setSelectedOption(null);
    setTextAnswer('');
    setChallengeFeedback(null);
    setShowHint(false);

    if (currentChallengeIdx < CHALLENGES.length - 1) {
      setCurrentChallengeIdx(prev => prev + 1);
      triggerAudio('tap');
    } else {
      // Completed all challenges
      triggerAudio('celebration');
      triggerSpeech('Congratulations! You have mastered balancing chemical equations!');
      setShowConfetti(true);
      setShowSuccess(true);
      if (onComplete) onComplete(score);
    }
  };

  // Calculate Overall Masteries
  const overallMastery = useMemo(() => {
    let sum = 0;
    ALL_NODE_IDS.forEach(id => {
      sum += bktStates[id]?.pKnown || 0.1;
    });
    return Math.round((sum / ALL_NODE_IDS.length) * 100);
  }, [bktStates]);

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 font-sans p-4 md:p-8 flex flex-col items-center">
      {/* Visual Feedback Overlays */}
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccess} text="Simulation & Mastery Complete!" />
      <SparkleBurst show={showSparkle} x={400} y={300} />

      {/* HEADER BAR */}
      <header className="w-full max-w-6xl bg-slate-900/90 border border-slate-800 rounded-2xl p-5 mb-6 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gold-500/10 border border-gold-500/30 rounded-xl">
            <Atom className="w-8 h-8 text-gold-400 animate-spin-slow" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-black bg-gradient-to-r from-gold-400 via-gold-400 to-gold-400 bg-clip-text text-transparent">
              Chemical Equations & Balancing
            </h1>
            <p className="text-xs text-slate-400">ICSE Class 8 Chemistry • Stoichiometry Workbench</p>
          </div>
        </div>

        {/* Global Progress Indicators */}
        <div className="flex items-center gap-4">
          <div className="bg-slate-950 px-4 py-2 rounded-xl border border-slate-800 flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <div className="text-left">
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Mastery</div>
              <div className="text-sm font-black text-amber-400">{overallMastery}%</div>
            </div>
          </div>

          <div className="bg-slate-950 px-4 py-2 rounded-xl border border-slate-800 flex items-center gap-2">
            <Zap className="w-5 h-5 text-emerald-400" />
            <div className="text-left">
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Score / Streak</div>
              <div className="text-sm font-black text-emerald-400">{score} pts ({streak}🔥)</div>
            </div>
          </div>
        </div>
      </header>

      {/* NAVIGATION TABS */}
      <nav className="w-full max-w-6xl flex gap-2 mb-6 bg-slate-900/60 p-1.5 rounded-xl border border-slate-800 overflow-x-auto">
        <button
          onClick={() => { setActiveTab('discovery'); triggerAudio('tap'); }}
          className={`flex-1 min-w-[130px] py-2.5 px-4 rounded-lg font-semibold text-xs transition-all flex items-center justify-center gap-2 ${
            activeTab === 'discovery' ? 'bg-gold-500 text-slate-950 shadow-lg font-bold' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <Lightbulb className="w-4 h-4" /> 1. Discovery & Scenario
        </button>

        <button
          onClick={() => { setActiveTab('lab'); triggerAudio('tap'); }}
          className={`flex-1 min-w-[130px] py-2.5 px-4 rounded-lg font-semibold text-xs transition-all flex items-center justify-center gap-2 ${
            activeTab === 'lab' ? 'bg-gold-500 text-slate-950 shadow-lg font-bold' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <FlaskIcon className="w-4 h-4" /> 2. Interactive Lab
        </button>

        <button
          onClick={() => { setActiveTab('challenges'); triggerAudio('tap'); }}
          className={`flex-1 min-w-[130px] py-2.5 px-4 rounded-lg font-semibold text-xs transition-all flex items-center justify-center gap-2 ${
            activeTab === 'challenges' ? 'bg-gold-500 text-slate-950 shadow-lg font-bold' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <Target className="w-4 h-4" /> 3. Challenges ({completedChallenges.size}/{CHALLENGES.length})
        </button>

        <button
          onClick={() => { setActiveTab('summary'); triggerAudio('tap'); }}
          className={`flex-1 min-w-[130px] py-2.5 px-4 rounded-lg font-semibold text-xs transition-all flex items-center justify-center gap-2 ${
            activeTab === 'summary' ? 'bg-gold-500 text-slate-950 shadow-lg font-bold' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <FileText className="w-4 h-4" /> 4. Summary & SRS
        </button>
      </nav>

      {/* TAB CONTENT AREAS */}
      <main className="w-full max-w-6xl">
        {/* TAB 1: DISCOVERY & SCENARIO */}
        {activeTab === 'discovery' && (
          <div className="space-y-6">
            {/* Scenario Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="w-6 h-6 text-gold-400" />
                <h2 className="text-xl font-bold text-slate-100">{SCENARIO.title}</h2>
              </div>
              <p className="text-sm text-slate-300 mb-3 leading-relaxed">{SCENARIO.intro}</p>
              <p className="text-sm text-slate-400 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
                <strong className="text-gold-400">Mission Briefing:</strong> {SCENARIO.context}
              </p>
            </div>

            {/* Discovery Question Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <h3 className="text-lg font-bold text-slate-100">Discovery Inquiry</h3>
              </div>
              <p className="text-base text-slate-200 font-medium mb-4">{DISCOVERY_QUESTION.question}</p>

              <div className="space-y-3 mb-4">
                {DISCOVERY_QUESTION.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => { setDiscoverySelected(idx); triggerAudio('tap'); }}
                    disabled={discoverySubmitted}
                    className={`w-full text-left p-4 rounded-xl text-sm transition-all border ${
                      discoverySelected === idx
                        ? 'bg-gold-500/20 border-gold-500 text-gold-200'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800/60'
                    }`}
                  >
                    <span className="font-bold mr-2">{String.fromCharCode(65 + idx)}.</span> {opt}
                  </button>
                ))}
              </div>

              {!discoverySubmitted ? (
                <button
                  onClick={handleDiscoverySubmit}
                  disabled={discoverySelected === null}
                  className="px-6 py-3 bg-gold-500 text-slate-950 font-bold rounded-xl hover:bg-gold-400 transition-colors disabled:opacity-50"
                >
                  Submit Answer
                </button>
              ) : (
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 mt-4">
                  <div className={`font-bold text-sm mb-1 ${discoverySelected === DISCOVERY_QUESTION.correctIndex ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {discoverySelected === DISCOVERY_QUESTION.correctIndex ? '✓ Correct Discovery!' : '✗ Misconception Detected!'}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{DISCOVERY_QUESTION.hintAfter}</p>
                </div>
              )}
            </div>

            {/* Prediction Questions Section */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-slate-100 mb-4 flex items-center gap-2">
                <Eye className="w-5 h-5 text-gold-400" /> Pre-Lab Predictions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {PREDICTION_QUESTIONS.map((pq, idx) => (
                  <div key={idx} className="bg-slate-950 p-5 rounded-xl border border-slate-800 flex flex-col justify-between">
                    <div>
                      <div className="text-xs font-bold text-gold-400 mb-2">PREDICTION #{idx + 1}</div>
                      <p className="text-sm font-semibold text-slate-200 mb-3">{pq.question}</p>
                      <div className="space-y-2 mb-4">
                        {pq.options.map((opt, oIdx) => (
                          <button
                            key={oIdx}
                            onClick={() => {
                              const next = [...predictionAnswers];
                              next[idx] = oIdx;
                              setPredictionAnswers(next);
                              triggerAudio('tap');
                            }}
                            disabled={predictionSubmitted[idx]}
                            className={`w-full text-left p-2.5 rounded-lg text-xs border ${
                              predictionAnswers[idx] === oIdx
                                ? 'bg-gold-500/20 border-gold-500 text-gold-200'
                                : 'bg-slate-900 border-slate-800 text-slate-300'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    {!predictionSubmitted[idx] ? (
                      <button
                        onClick={() => handlePredictionSubmit(idx)}
                        disabled={predictionAnswers[idx] === null}
                        className="w-full py-2 bg-gold-600 text-white font-semibold text-xs rounded-lg hover:bg-gold-500 disabled:opacity-50"
                      >
                        Verify Prediction
                      </button>
                    ) : (
                      <div className="p-3 bg-slate-900 rounded-lg text-xs border border-slate-800 text-slate-300">
                        <strong className="text-emerald-400">Scientific Concept: </strong> {pq.verifyInstruction}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: INTERACTIVE LAB WORKBENCH */}
        {activeTab === 'lab' && (
          <div className="space-y-6">
            {/* Exploration Lab Step Guide Banner */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="px-3 py-1 bg-gold-500/20 text-gold-400 font-bold rounded-lg text-xs">
                  Lab Step {activeLabStep + 1} of 5
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-100">{EXPLORATION_STEPS[activeLabStep].title}</h3>
                  <p className="text-xs text-slate-400">{EXPLORATION_STEPS[activeLabStep].instruction}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setActiveLabStep(prev => Math.max(0, prev - 1));
                    setSelectedEqIndex(Math.max(0, activeLabStep - 1));
                    triggerAudio('tap');
                  }}
                  disabled={activeLabStep === 0}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold disabled:opacity-40"
                >
                  Previous Lab
                </button>
                <button
                  onClick={() => {
                    setActiveLabStep(prev => Math.min(EXPLORATION_STEPS.length - 1, prev + 1));
                    setSelectedEqIndex(Math.min(EQUATION_DATASET.length - 1, activeLabStep + 1));
                    triggerAudio('tap');
                  }}
                  disabled={activeLabStep === EXPLORATION_STEPS.length - 1}
                  className="px-3 py-1.5 bg-gold-500 hover:bg-gold-400 text-slate-950 rounded-lg text-xs font-bold disabled:opacity-40"
                >
                  Next Lab Step
                </button>
              </div>
            </div>

            {/* Main Interactive Workbench Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              {/* Equation Selection Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-400">Active Preset Equation:</span>
                  <select
                    value={selectedEqIndex}
                    onChange={(e) => {
                      setSelectedEqIndex(Number(e.target.value));
                      triggerAudio('tap');
                    }}
                    className="bg-slate-950 border border-slate-700 text-gold-400 font-bold text-xs rounded-lg px-3 py-2 outline-none"
                  >
                    {EQUATION_DATASET.map((eq, i) => (
                      <option key={eq.id} value={i}>
                        {i + 1}. {eq.title} ({eq.difficulty})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const total = currentEquation.reactants.length + currentEquation.products.length;
                      setCoefficients(Array(total).fill(1));
                      triggerAudio('tap');
                    }}
                    className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-200 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Reset Coefficients
                  </button>
                </div>
              </div>

              {/* Dynamic Equation Stepper Interface */}
              <div className="mb-8">
                <p className="text-xs text-slate-400 mb-3 text-center">Adjust whole-number coefficients using steppers below to equalize total atom count:</p>
                
                <div className="flex flex-wrap items-center justify-center gap-4 bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-inner">
                  {/* Reactants Steppers */}
                  {currentEquation.reactants.map((species, i) => (
                    <React.Fragment key={`r-${i}`}>
                      {i > 0 && <span className="text-xl font-bold text-slate-500">+</span>}
                      <div className="flex flex-col items-center gap-2 bg-slate-900 p-3 rounded-xl border border-slate-800">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleCoefficientChange(i, -1)}
                            className="w-7 h-7 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded flex items-center justify-center transition"
                          >
                            -
                          </button>
                          <span className="w-8 text-center text-lg font-black text-gold-400 font-mono">
                            {coefficients[i]}
                          </span>
                          <button
                            onClick={() => handleCoefficientChange(i, 1)}
                            className="w-7 h-7 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded flex items-center justify-center transition"
                          >
                            +
                          </button>
                        </div>
                        <div className="text-sm font-bold text-slate-100 flex items-center gap-1 font-mono">
                          {species.formula} <span className="text-[10px] text-slate-400">({species.stateSymbol})</span>
                        </div>
                        <MolecularVisualizerSVG formula={species.formula} count={coefficients[i]} color={species.color} />
                      </div>
                    </React.Fragment>
                  ))}

                  {/* Reaction Arrow */}
                  <div className="flex flex-col items-center px-2">
                    <ArrowRight className="w-8 h-8 text-gold-400 animate-pulse" />
                    <span className="text-[10px] font-bold text-gold-400">YIELDS</span>
                  </div>

                  {/* Products Steppers */}
                  {currentEquation.products.map((species, i) => {
                    const globalIdx = currentEquation.reactants.length + i;
                    return (
                      <React.Fragment key={`p-${i}`}>
                        {i > 0 && <span className="text-xl font-bold text-slate-500">+</span>}
                        <div className="flex flex-col items-center gap-2 bg-slate-900 p-3 rounded-xl border border-slate-800">
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleCoefficientChange(globalIdx, -1)}
                              className="w-7 h-7 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded flex items-center justify-center transition"
                            >
                              -
                            </button>
                            <span className="w-8 text-center text-lg font-black text-emerald-400 font-mono">
                              {coefficients[globalIdx]}
                            </span>
                            <button
                              onClick={() => handleCoefficientChange(globalIdx, 1)}
                              className="w-7 h-7 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded flex items-center justify-center transition"
                            >
                              +
                            </button>
                          </div>
                          <div className="text-sm font-bold text-slate-100 flex items-center gap-1 font-mono">
                            {species.formula} <span className="text-[10px] text-slate-400">({species.stateSymbol})</span>
                          </div>
                          <MolecularVisualizerSVG formula={species.formula} count={coefficients[globalIdx]} color={species.color} />
                        </div>
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>

              {/* Status Banner */}
              <div className={`p-4 rounded-xl mb-6 border flex items-center justify-between ${
                isBalanced
                  ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300'
                  : 'bg-amber-950/40 border-amber-500/40 text-amber-300'
              }`}>
                <div className="flex items-center gap-3">
                  {isBalanced ? <CheckCircle2 className="w-6 h-6 text-emerald-400" /> : <AlertTriangle className="w-6 h-6 text-amber-400" />}
                  <div>
                    <div className="font-bold text-sm">
                      {isBalanced ? '✓ Equation Perfectly Balanced!' : 'Equation Unbalanced'}
                    </div>
                    <p className="text-xs opacity-80">
                      {isBalanced
                        ? 'Law of Conservation of Mass satisfied! Every single atom is accounted for.'
                        : 'Atom count on reactant side does not match product side. Keep adjusting coefficients.'}
                    </p>
                  </div>
                </div>
                {isBalanced && (
                  <button
                    onClick={() => {
                      triggerAudio('celebration');
                      setShowConfetti(true);
                      setTimeout(() => setShowConfetti(false), 2500);
                    }}
                    className="px-4 py-2 bg-emerald-500 text-slate-950 font-bold rounded-lg text-xs hover:bg-emerald-400 transition"
                  >
                    Celebrate Balance 🎉
                  </button>
                )}
              </div>

              {/* Balance Scale Component */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <AtomBalanceScaleSVG leftAtoms={leftTally} rightAtoms={rightTally} isBalanced={isBalanced} />
                <AtomParticleCanvas coefficients={coefficients} equation={currentEquation} />
              </div>

              {/* Atom Count Comparison Matrix Table */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Live Atomic Inventory Matrix</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400 font-semibold">
                        <th className="pb-2">Element Symbol</th>
                        <th className="pb-2 text-gold-400">Reactant Side Total</th>
                        <th className="pb-2 text-emerald-400">Product Side Total</th>
                        <th className="pb-2">Conservation Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 font-mono">
                      {Array.from(new Set([...Object.keys(leftTally), ...Object.keys(rightTally)])).map((elem) => {
                        const lCount = leftTally[elem] || 0;
                        const rCount = rightTally[elem] || 0;
                        const match = lCount === rCount;
                        return (
                          <tr key={elem} className="hover:bg-slate-900/40">
                            <td className="py-2.5 font-bold text-slate-200">{elem}</td>
                            <td className="py-2.5 text-gold-400 font-bold">{lCount} atoms</td>
                            <td className="py-2.5 text-emerald-400 font-bold">{rCount} atoms</td>
                            <td className="py-2.5">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${match ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                                {match ? 'EQUAL ✓' : 'UNBALANCED ✗'}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Lab Observation Questions Container */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-slate-100 mb-4 flex items-center gap-2">
                <Eye className="w-5 h-5 text-emerald-400" /> Lab Observations & Insights
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {OBSERVATION_QUESTIONS.map((oq, idx) => (
                  <div key={idx} className="bg-slate-950 p-5 rounded-xl border border-slate-800 flex flex-col justify-between">
                    <div>
                      <div className="text-xs font-bold text-emerald-400 mb-2">OBSERVATION #{idx + 1}</div>
                      <p className="text-sm font-semibold text-slate-200 mb-3">{oq.question}</p>
                      <div className="space-y-2 mb-4">
                        {(oq.observableOptions ?? oq.options).map((opt, oIdx) => (
                          <button
                            key={oIdx}
                            onClick={() => {
                              const next = [...observationAnswers];
                              next[idx] = oIdx;
                              setObservationAnswers(next);
                              triggerAudio('tap');
                            }}
                            disabled={observationSubmitted[idx]}
                            className={`w-full text-left p-2.5 rounded-lg text-xs border ${
                              observationAnswers[idx] === oIdx
                                ? 'bg-emerald-500/20 border-emerald-500 text-emerald-200'
                                : 'bg-slate-900 border-slate-800 text-slate-300'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    {!observationSubmitted[idx] ? (
                      <button
                        onClick={() => handleObservationSubmit(idx)}
                        disabled={observationAnswers[idx] === null}
                        className="w-full py-2 bg-emerald-600 text-white font-semibold text-xs rounded-lg hover:bg-emerald-500 disabled:opacity-50"
                      >
                        Submit Observation
                      </button>
                    ) : (
                      <div className="p-3 bg-slate-900 rounded-lg text-xs border border-slate-800 text-emerald-400 font-bold">
                        ✓ Observation Recorded!
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Render Additional Graphics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ReactionEnergyPathwaySVG />
              <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 flex flex-col justify-between">
                <h4 className="text-sm font-semibold text-slate-300 mb-2">State Symbols Guide</h4>
                <StateSymbolsDiagramSVG />
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: PROGRESSIVE CHALLENGES (24 items across 3 tiers) */}
        {activeTab === 'challenges' && (
          <div className="space-y-6">
            {/* Challenge Progress Header */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Challenge {currentChallengeIdx + 1} of {CHALLENGES.length}
                </div>
                <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded text-xs font-bold ${
                    CHALLENGES[currentChallengeIdx].difficulty === 'foundation'
                      ? 'bg-gold-500/20 text-gold-400 border border-gold-500/30'
                      : CHALLENGES[currentChallengeIdx].difficulty === 'standard'
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                  }`}>
                    {CHALLENGES[currentChallengeIdx].difficulty.toUpperCase()}
                  </span>
                  <span>Competency: {CHALLENGES[currentChallengeIdx].competencyLevel}</span>
                </h3>
              </div>

              {/* Progress Bar */}
              <div className="w-full md:w-64 bg-slate-950 h-3 rounded-full border border-slate-800 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-gold-500 to-gold-500 h-full transition-all duration-300"
                  style={{ width: `${((currentChallengeIdx + 1) / CHALLENGES.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Active Challenge Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative">
              <p className="text-lg font-bold text-slate-100 mb-6">
                {CHALLENGES[currentChallengeIdx].question}
              </p>

              {/* Multiple Choice Options */}
              {CHALLENGES[currentChallengeIdx].type === 'multiple-choice' && CHALLENGES[currentChallengeIdx].options && (
                <div className="space-y-3 mb-6">
                  {CHALLENGES[currentChallengeIdx].options!.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedOption(idx);
                        triggerAudio('tap');
                      }}
                      disabled={challengeSubmitted}
                      className={`w-full text-left p-4 rounded-xl text-sm transition-all border ${
                        selectedOption === idx
                          ? 'bg-gold-500/20 border-gold-500 text-gold-200 shadow-md'
                          : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800/60'
                      }`}
                    >
                      <span className="font-bold mr-3 text-gold-400">{String.fromCharCode(65 + idx)}.</span>
                      {option}
                    </button>
                  ))}
                </div>
              )}

              {/* Numeric / Coefficient Input */}
              {CHALLENGES[currentChallengeIdx].type === 'coefficient-input' && (
                <div className="mb-6">
                  <label className="block text-xs font-bold text-slate-400 mb-2">
                    Enter Exact Whole Number Coefficient Answer:
                  </label>
                  <input
                    type="text"
                    value={textAnswer}
                    onChange={(e) => setTextAnswer(e.target.value)}
                    disabled={challengeSubmitted}
                    placeholder="e.g., 3"
                    className="w-full md:w-48 bg-slate-950 border border-slate-700 text-slate-100 font-mono text-lg rounded-xl p-3 outline-none focus:border-gold-500"
                  />
                </div>
              )}

              {/* Feedback Alert Banner */}
              {challengeFeedback && (
                <div className={`p-4 rounded-xl mb-6 border ${
                  challengeFeedback.isCorrect ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300' : 'bg-rose-950/60 border-rose-500/50 text-rose-300'
                }`}>
                  <div className="font-bold text-sm mb-1">
                    {challengeFeedback.isCorrect ? '✓ Excellent Job!' : '✗ Needs Revision'}
                  </div>
                  <p className="text-xs leading-relaxed opacity-90">{challengeFeedback.message}</p>
                </div>
              )}

              {/* Action Button Controls */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <button
                  onClick={() => {
                    setShowHint(true);
                    setCurrentHintText(CHALLENGES[currentChallengeIdx].hints[0]);
                    triggerAudio('hint');
                  }}
                  className="flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 bg-amber-500/10 border border-amber-500/30 px-3.5 py-2 rounded-lg"
                >
                  <HelpCircle className="w-4 h-4" /> Need Hint?
                </button>

                {!challengeSubmitted ? (
                  <button
                    onClick={handleChallengeSubmit}
                    disabled={selectedOption === null && textAnswer.trim() === ''}
                    className="px-6 py-2.5 bg-gold-500 hover:bg-gold-400 text-slate-950 font-bold rounded-xl transition disabled:opacity-40"
                  >
                    Submit Response
                  </button>
                ) : (
                  <button
                    onClick={nextChallenge}
                    className="flex items-center gap-2 px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white font-bold rounded-xl transition shadow-lg"
                  >
                    <span>Next Challenge</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Render Hint Bubble UI */}
              <HintBubble show={showHint} text={currentHintText} />
            </div>
          </div>
        )}

        {/* TAB 4: SUMMARY & SRS REVIEW */}
        {activeTab === 'summary' && (
          <div className="space-y-6">
            {/* Real World Application Activity Container */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <Flame className="w-6 h-6 text-amber-400" />
                <h3 className="text-xl font-bold text-slate-100">{REAL_WORLD_ACTIVITY.title}</h3>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
              
              <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
                <h4 className="text-xs font-bold text-gold-400 uppercase tracking-wider">Industrial Operating Steps:</h4>
                {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs text-slate-300">
                    <span className="w-5 h-5 bg-gold-500/20 text-gold-400 font-bold rounded-full flex items-center justify-center flex-shrink-0 text-[10px]">
                      {idx + 1}
                    </span>
                    <p className="leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Node Mastery & BKT Breakdown Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-slate-100 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-gold-400" /> BKT Skill Node Mastery Breakdown
              </h3>
              <div className="space-y-3">
                {ALL_NODE_IDS.map(nodeId => {
                  const bkt = bktStates[nodeId] || createBKTState(nodeId);
                  const masteryPercent = Math.round(bkt.pKnown * 100);
                  const level = getMasteryLevel(bkt.pKnown);
                  return (
                    <div key={nodeId} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-mono font-bold text-slate-300">{nodeId}</div>
                        <div className="text-[10px] text-slate-400 capitalize">{nodeId.replace(/_/g, ' ')}</div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-32 bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-800">
                          <div className="bg-gold-500 h-full transition-all" style={{ width: `${masteryPercent}%` }} />
                        </div>
                        <span className="text-xs font-bold text-gold-400 w-12 text-right">{masteryPercent}%</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300">{level}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Misconception Correction Matrix */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-slate-100 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-400" /> Chemistry Misconceptions & Corrections Matrix
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MISCONCEPTIONS.map(m => (
                  <div key={m.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div className="text-xs font-bold text-amber-400 mb-1">MISCONCEPTIONS: {m.misconception}</div>
                    <p className="text-xs text-rose-300 mb-2 leading-relaxed font-mono">"{m.description}"</p>
                    <div className="text-[11px] text-emerald-300 bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-500/30">
                      <strong className="text-emerald-400">Scientific Truth: </strong>{m.correction}
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

// Helper Flask Icon
const FlaskIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 3h6M10 3v5l-4.5 9A2 2 0 007.3 20h9.4a2 2 0 001.8-3L14 8V3" />
  </svg>
);

export default C8_ChemistryChemicalequationsbalancingSim;