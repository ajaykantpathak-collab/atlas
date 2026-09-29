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

// Node ID Constants
const NODE_C8_CHEM_009 = 'c8_chem_009'; // Chemical equations - balancing
const NODE_C8_CHEM_010 = 'c8_chem_010'; // Chemical reactions - types revisited
const NODE_C8_CHEM_011 = 'c8_chem_011'; // Combination reactions
const NODE_C8_CHEM_012 = 'c8_chem_012'; // Decomposition reactions
const NODE_C8_CHEM_013 = 'c8_chem_013'; // Displacement reactions
const NODE_C8_CHEM_014 = 'c8_chem_014'; // Double displacement reactions
const NODE_C8_CHEM_015 = 'c8_chem_015'; // Reactivity series of metals
const NODE_C8_CHEM_016 = 'c8_chem_016'; // Hydrogen - preparation and properties

const ALL_NODE_IDS = [
  NODE_C8_CHEM_009,
  NODE_C8_CHEM_010,
  NODE_C8_CHEM_011,
  NODE_C8_CHEM_012,
  NODE_C8_CHEM_013,
  NODE_C8_CHEM_014,
  NODE_C8_CHEM_015,
  NODE_C8_CHEM_016
];

// Data Interfaces
interface AtomCount {
  [elementSymbol: string]: number;
}

interface ReactionDef {
  id: string;
  name: string;
  type: 'combination' | 'decomposition' | 'displacement' | 'double_displacement';
  nodeId: string;
  unbalancedStr: string;
  balancedStr: string;
  reactants: { formula: string; defaultCoef: number; targetCoef: number; atoms: AtomCount; color: string }[];
  products: { formula: string; defaultCoef: number; targetCoef: number; atoms: AtomCount; color: string }[];
  description: string;
  observation: string;
  condition?: string;
}

interface MetalReactivity {
  symbol: string;
  name: string;
  rank: number; // 1 = highest
  waterReaction: string;
  acidReaction: string;
  color: string;
}

interface Challenge {
  id: number;
  nodeId: string;
  title: string;
  prompt: string;
  type: 'mcq' | 'balance' | 'predict_displacement' | 'classify';
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
  misconceptionId?: string;
  hint: string;
}

// Reactivity Series Data (ICSE Class 8)
const REACTIVITY_SERIES: MetalReactivity[] = [
  { symbol: 'K', name: 'Potassium', rank: 1, waterReaction: 'Reacts violently with cold water, catches fire', acidReaction: 'Explosive reaction', color: '#ec4899' },
  { symbol: 'Na', name: 'Sodium', rank: 2, waterReaction: 'Reacts vigorously with cold water, darts on surface', acidReaction: 'Explosive reaction', color: '#f43f5e' },
  { symbol: 'Ca', name: 'Calcium', rank: 3, waterReaction: 'Reacts steadily with cold water, turns milky', acidReaction: 'Vigorous reaction', color: '#fb923c' },
  { symbol: 'Mg', name: 'Magnesium', rank: 4, waterReaction: 'Very slow with cold water, burns in steam', acidReaction: 'Rapid effervescence', color: '#facc15' },
  { symbol: 'Al', name: 'Aluminium', rank: 5, waterReaction: 'Reacts only with steam when heated', acidReaction: 'Moderate reaction', color: '#a3e635' },
  { symbol: 'Zn', name: 'Zinc', rank: 6, waterReaction: 'Reacts with steam when red hot', acidReaction: 'Steady effervescence (Lab prep H2)', color: '#34d399' },
  { symbol: 'Fe', name: 'Iron', rank: 7, waterReaction: 'Reacts with steam only when heated strongly', acidReaction: 'Slow reaction with dilute acid', color: '#38bdf8' },
  { symbol: 'Pb', name: 'Lead', rank: 8, waterReaction: 'No reaction with water', acidReaction: 'Very slow, forms insoluble coating', color: '#818cf8' },
  { symbol: 'Cu', name: 'Copper', rank: 9, waterReaction: 'No reaction with water or steam', acidReaction: 'No reaction with dilute acids', color: '#f97316' },
  { symbol: 'Ag', name: 'Silver', rank: 10, waterReaction: 'No reaction', acidReaction: 'No reaction', color: '#94a3b8' },
  { symbol: 'Au', name: 'Gold', rank: 11, waterReaction: 'No reaction', acidReaction: 'No reaction', color: '#eab308' }
];

// Prescribed Reactions Database
const SIM_REACTIONS: ReactionDef[] = [
  {
    id: 'comb_water',
    name: 'Formation of Water',
    type: 'combination',
    nodeId: NODE_C8_CHEM_011,
    unbalancedStr: 'H₂ + O₂ → H₂O',
    balancedStr: '2H₂ + O₂ → 2H₂O',
    reactants: [
      { formula: 'H₂', defaultCoef: 1, targetCoef: 2, atoms: { H: 2 }, color: '#38bdf8' },
      { formula: 'O₂', defaultCoef: 1, targetCoef: 1, atoms: { O: 2 }, color: '#ef4444' }
    ],
    products: [
      { formula: 'H₂O', defaultCoef: 1, targetCoef: 2, atoms: { H: 2, O: 1 }, color: '#06b6d4' }
    ],
    description: 'Hydrogen gas combines with oxygen gas to form water molecules.',
    observation: 'Pop sound on ignition, liquid droplets condense on cool surface.'
  },
  {
    id: 'comb_mg',
    name: 'Burning of Magnesium',
    type: 'combination',
    nodeId: NODE_C8_CHEM_011,
    unbalancedStr: 'Mg + O₂ → MgO',
    balancedStr: '2Mg + O₂ → 2MgO',
    reactants: [
      { formula: 'Mg', defaultCoef: 1, targetCoef: 2, atoms: { Mg: 1 }, color: '#facc15' },
      { formula: 'O₂', defaultCoef: 1, targetCoef: 1, atoms: { O: 2 }, color: '#ef4444' }
    ],
    products: [
      { formula: 'MgO', defaultCoef: 1, targetCoef: 2, atoms: { Mg: 1, O: 1 }, color: '#e2e8f0' }
    ],
    description: 'Magnesium ribbon burns in oxygen with a dazzling white flame.',
    observation: 'Dazzling white light, white powder ash of Magnesium Oxide formed.'
  },
  {
    id: 'decomp_caco3',
    name: 'Thermal Decomposition of Limestone',
    type: 'decomposition',
    nodeId: NODE_C8_CHEM_012,
    unbalancedStr: 'CaCO₃ → CaO + CO₂',
    balancedStr: 'CaCO₃ → CaO + CO₂',
    condition: 'Heat (Δ)',
    reactants: [
      { formula: 'CaCO₃', defaultCoef: 1, targetCoef: 1, atoms: { Ca: 1, C: 1, O: 3 }, color: '#fb923c' }
    ],
    products: [
      { formula: 'CaO', defaultCoef: 1, targetCoef: 1, atoms: { Ca: 1, O: 1 }, color: '#e2e8f0' },
      { formula: 'CO₂', defaultCoef: 1, targetCoef: 1, atoms: { C: 1, O: 2 }, color: '#94a3b8' }
    ],
    description: 'Calcium carbonate breaks down into quicklime and carbon dioxide gas when heated strongly.',
    observation: 'White solid residue (CaO) remains, evolved gas turns limewater milky.'
  },
  {
    id: 'decomp_h2o',
    name: 'Electrolysis of Water',
    type: 'decomposition',
    nodeId: NODE_C8_CHEM_012,
    unbalancedStr: 'H₂O → H₂ + O₂',
    balancedStr: '2H₂O → 2H₂ + O₂',
    condition: 'Electricity',
    reactants: [
      { formula: 'H₂O', defaultCoef: 1, targetCoef: 2, atoms: { H: 2, O: 1 }, color: '#06b6d4' }
    ],
    products: [
      { formula: 'H₂', defaultCoef: 1, targetCoef: 2, atoms: { H: 2 }, color: '#38bdf8' },
      { formula: 'O₂', defaultCoef: 1, targetCoef: 1, atoms: { O: 2 }, color: '#ef4444' }
    ],
    description: 'Electric current splits water into hydrogen gas at the cathode and oxygen at the anode in a 2:1 volume ratio.',
    observation: 'Bubbles formed at electrodes; hydrogen gas volume is double the oxygen volume.'
  },
  {
    id: 'disp_zn_cuso4',
    name: 'Zinc Displaces Copper',
    type: 'displacement',
    nodeId: NODE_C8_CHEM_013,
    unbalancedStr: 'Zn + CuSO₄ → ZnSO₄ + Cu',
    balancedStr: 'Zn + CuSO₄ → ZnSO₄ + Cu',
    reactants: [
      { formula: 'Zn', defaultCoef: 1, targetCoef: 1, atoms: { Zn: 1 }, color: '#34d399' },
      { formula: 'CuSO₄', defaultCoef: 1, targetCoef: 1, atoms: { Cu: 1, S: 1, O: 4 }, color: '#2563eb' }
    ],
    products: [
      { formula: 'ZnSO₄', defaultCoef: 1, targetCoef: 1, atoms: { Zn: 1, S: 1, O: 4 }, color: '#cbd5e1' },
      { formula: 'Cu', defaultCoef: 1, targetCoef: 1, atoms: { Cu: 1 }, color: '#b45309' }
    ],
    description: 'More reactive Zinc displaces Copper from blue Copper Sulphate solution.',
    observation: 'Blue solution fades to colourless; reddish-brown copper deposits on zinc.'
  },
  {
    id: 'disp_zn_hcl',
    name: 'Lab Prep of Hydrogen (Zn + HCl)',
    type: 'displacement',
    nodeId: NODE_C8_CHEM_016,
    unbalancedStr: 'Zn + HCl → ZnCl₂ + H₂',
    balancedStr: 'Zn + 2HCl → ZnCl₂ + H₂',
    reactants: [
      { formula: 'Zn', defaultCoef: 1, targetCoef: 1, atoms: { Zn: 1 }, color: '#34d399' },
      { formula: 'HCl', defaultCoef: 1, targetCoef: 2, atoms: { H: 1, Cl: 1 }, color: '#a855f7' }
    ],
    products: [
      { formula: 'ZnCl₂', defaultCoef: 1, targetCoef: 1, atoms: { Zn: 1, Cl: 2 }, color: '#94a3b8' },
      { formula: 'H₂', defaultCoef: 1, targetCoef: 1, atoms: { H: 2 }, color: '#38bdf8' }
    ],
    description: 'Zinc granules react with dilute hydrochloric acid in Woulfe bottle to produce Hydrogen gas.',
    observation: 'Brisk effervescence of colourless gas; burns with characteristic POP sound.'
  },
  {
    id: 'ddisp_agno3_nacl',
    name: 'Precipitation of Silver Chloride',
    type: 'double_displacement',
    nodeId: NODE_C8_CHEM_014,
    unbalancedStr: 'AgNO₃ + NaCl → AgCl↓ + NaNO₃',
    balancedStr: 'AgNO₃ + NaCl → AgCl + NaNO₃',
    reactants: [
      { formula: 'AgNO₃', defaultCoef: 1, targetCoef: 1, atoms: { Ag: 1, N: 1, O: 3 }, color: '#64748b' },
      { formula: 'NaCl', defaultCoef: 1, targetCoef: 1, atoms: { Na: 1, Cl: 1 }, color: '#38bdf8' }
    ],
    products: [
      { formula: 'AgCl', defaultCoef: 1, targetCoef: 1, atoms: { Ag: 1, Cl: 1 }, color: '#f8fafc' },
      { formula: 'NaNO₃', defaultCoef: 1, targetCoef: 1, atoms: { Na: 1, N: 1, O: 3 }, color: '#a855f7' }
    ],
    description: 'Silver Nitrate and Sodium Chloride solutions swap ions to form insoluble curd-white Silver Chloride precipitate.',
    observation: 'Immediate formation of insoluble white precipitate of AgCl.'
  },
  {
    id: 'ddisp_bacl2_na2so4',
    name: 'Precipitation of Barium Sulphate',
    type: 'double_displacement',
    nodeId: NODE_C8_CHEM_014,
    unbalancedStr: 'BaCl₂ + Na₂SO₄ → BaSO₄↓ + NaCl',
    balancedStr: 'BaCl₂ + Na₂SO₄ → BaSO₄ + 2NaCl',
    reactants: [
      { formula: 'BaCl₂', defaultCoef: 1, targetCoef: 1, atoms: { Ba: 1, Cl: 2 }, color: '#475569' },
      { formula: 'Na₂SO₄', defaultCoef: 1, targetCoef: 1, atoms: { Na: 2, S: 1, O: 4 }, color: '#0284c7' }
    ],
    products: [
      { formula: 'BaSO₄', defaultCoef: 1, targetCoef: 1, atoms: { Ba: 1, S: 1, O: 4 }, color: '#ffffff' },
      { formula: 'NaCl', defaultCoef: 1, targetCoef: 2, atoms: { Na: 1, Cl: 1 }, color: '#38bdf8' }
    ],
    description: 'Barium Chloride and Sodium Sulphate undergo ion exchange forming white precipitate of BaSO₄.',
    observation: 'Dense white precipitate of Barium Sulphate forms instantly.'
  }
];

// Progressive Challenges Database
const CHALLENGES: Challenge[] = [
  {
    id: 1,
    nodeId: NODE_C8_CHEM_009,
    title: 'Law of Conservation of Mass',
    prompt: 'When balancing H₂ + O₂ → H₂O, why CANNOT you change the subscript in H₂O to H₂O₂ to balance the oxygen atoms?',
    type: 'mcq',
    options: [
      'H₂O₂ is a completely different chemical compound (Hydrogen Peroxide) with different properties.',
      'Subscripts can only be changed for metals, not non-metals.',
      'Subscripts can be changed only if we heat the solution.',
      'The law of conservation of mass allows subscript changes if coefficients are kept 1.'
    ],
    correctAnswer: 0,
    explanation: 'Changing subscripts alters the chemical identity of the compound! You must only adjust coefficients in front of formulas.',
    hint: 'Think about what H₂O vs H₂O₂ is. One is drinking water, the other is hair bleach/disinfectant!',
    misconceptionId: 'subscript_change_err'
  },
  {
    id: 2,
    nodeId: NODE_C8_CHEM_009,
    title: 'Balancing Burning of Magnesium',
    prompt: 'Balance the chemical equation: __ Mg + __ O₂ → __ MgO',
    type: 'balance',
    correctAnswer: '2,1,2',
    explanation: '2Mg + O₂ → 2MgO has 2 Magnesium atoms and 2 Oxygen atoms on both reactant and product sides.',
    hint: 'O₂ has 2 Oxygen atoms on left. So you need 2 MgO on right, which in turn requires 2 Mg on left.'
  },
  {
    id: 3,
    nodeId: NODE_C8_CHEM_010,
    title: 'Reaction Classification',
    prompt: 'In a lime kiln, limestone breaks down under intense heat: CaCO₃ → CaO + CO₂. What type of reaction is this?',
    type: 'classify',
    options: ['Combination', 'Decomposition', 'Displacement', 'Double Displacement'],
    correctAnswer: 1,
    explanation: 'A single reactant (CaCO₃) breaks down into two simpler substances (CaO and CO₂). Pattern: AB → A + B.',
    hint: 'Notice there is only ONE reactant on the left side.'
  },
  {
    id: 4,
    nodeId: NODE_C8_CHEM_011,
    title: 'Combination Synthesis',
    prompt: 'When quicklime (CaO) is added to water in an exothermic process: CaO + H₂O → Ca(OH)₂. How many products are formed?',
    type: 'mcq',
    options: [
      'Exactly 1 product (Calcium Hydroxide / Slaked lime)',
      '2 products (Calcium and Hydrogen gas)',
      '3 products (Calcium, Oxygen and Water)',
      'No products, it is only a physical solution'
    ],
    correctAnswer: 0,
    explanation: 'Combination reactions (A + B → AB) always produce exactly ONE single product.',
    hint: 'Look at the right hand side of CaO + H₂O → Ca(OH)₂.'
  },
  {
    id: 5,
    nodeId: NODE_C8_CHEM_015,
    title: 'Reactivity Series Prediction',
    prompt: 'A student dips a Copper (Cu) wire into a beaker containing Zinc Sulphate (ZnSO₄) solution. What will be observed?',
    type: 'predict_displacement',
    options: [
      'No reaction occurs; solution remains clear and wire unchanged.',
      'Copper displaces Zinc, forming blue Copper Sulphate solution.',
      'Zinc metal coats the copper wire immediately.',
      'Hydrogen gas bubbles rapidly off the wire.'
    ],
    correctAnswer: 0,
    explanation: 'Copper is LOWER than Zinc in the reactivity series (Zn > Cu). A less reactive metal cannot displace a more reactive metal from its salt solution!',
    hint: 'Check the Reactivity Series ladder! Is Cu above or below Zn?'
  },
  {
    id: 6,
    nodeId: NODE_C8_CHEM_013,
    title: 'Displacement Reaction',
    prompt: 'An iron nail is placed in blue Copper Sulphate solution: Fe + CuSO₄ → FeSO₄ + Cu. What observation proves displacement occurred?',
    type: 'mcq',
    options: [
      'The blue colour fades to light green and a reddish-brown copper deposit forms on the iron nail.',
      'The solution turns dark purple and bubbles of gas are evolved.',
      'The iron nail dissolves completely into a gas.',
      'A white insoluble precipitate of Iron Chloride settles at the bottom.'
    ],
    correctAnswer: 0,
    explanation: 'Fe displaces Cu because Fe > Cu. Blue CuSO₄ solution becomes light green FeSO₄, while reddish-brown Cu metal deposits on the nail.',
    hint: 'Iron(II) sulphate in water is light green, and copper metal is reddish-brown.'
  },
  {
    id: 7,
    nodeId: NODE_C8_CHEM_014,
    title: 'Double Displacement Precipitate',
    prompt: 'When colourless Silver Nitrate (AgNO₃) solution is mixed with colourless Sodium Chloride (NaCl) solution, what is the precipitate formed?',
    type: 'mcq',
    options: [
      'Curd-white Silver Chloride (AgCl↓)',
      'Yellow Lead Iodide (PbI₂)',
      'Blue Copper Hydroxide (Cu(OH)₂)',
      'Brown Sodium Nitrate (NaNO₃)'
    ],
    correctAnswer: 0,
    explanation: 'Ag⁺ and Na⁺ swap anion partners: Ag⁺ + Cl⁻ → AgCl (white insoluble precipitate), while NaNO₃ remains dissolved.',
    hint: 'Which silver compound is insoluble in water?'
  },
  {
    id: 8,
    nodeId: NODE_C8_CHEM_016,
    title: 'Hydrogen Lab Preparation & Test',
    prompt: 'Why is Hydrogen gas collected by DOWNWARD DISPLACEMENT OF WATER in the laboratory Woulfe bottle set-up?',
    type: 'mcq',
    options: [
      'Hydrogen is practically insoluble in water and is much lighter than air.',
      'Hydrogen is heavier than water and sinks to the bottom.',
      'Hydrogen reacts violently with air so it must be submerged.',
      'Water absorbs all impurities from hydrogen gas.'
    ],
    correctAnswer: 0,
    explanation: 'Hydrogen is almost insoluble in water and has lowest density (vapour density = 1). Downward displacement of water prevents gas escaping into air.',
    hint: 'Consider both its solubility in water and its weight relative to air.'
  }
];

// Concept Visual Interactive Teaching Slides
const TEACHING_SLIDES = [
  {
    id: 'slide_balancing',
    nodeId: NODE_C8_CHEM_009,
    title: '1. Law of Conservation of Mass & Balancing',
    content: 'Matter can neither be created nor destroyed in a chemical reaction. The total number of atoms of each element on the reactant side (left) MUST equal the product side (right).',
    subtext: 'Rule: Adjust ONLY the large numbers in front (coefficients). NEVER change small subscript numbers!',
    formula: '2H₂ + O₂ → 2H₂O',
    analogy: 'Imagine a balance scale: 4 Hydrogen atoms & 2 Oxygen atoms on the left perfectly balance 4 Hydrogen atoms & 2 Oxygen atoms on the right.'
  },
  {
    id: 'slide_types',
    nodeId: NODE_C8_CHEM_010,
    title: '2. The Four Fundamental Reaction Types',
    content: 'All chemical transformations follow clear atomic rearrangement patterns:',
    subtext: '• Combination: A + B → AB\n• Decomposition: AB → A + B\n• Displacement: A + BC → AC + B\n• Double Displacement: AB + CD → AD + CB',
    analogy: 'Think of dancing couples: merging into one pair, splitting apart, kicking out a partner, or swapping partners!'
  },
  {
    id: 'slide_combination',
    nodeId: NODE_C8_CHEM_011,
    title: '3. Combination (Synthesis) Reactions',
    content: 'Two or more elements/compounds unite to form EXACTLY ONE single new product.',
    formula: 'Fe + S —(Heat)→ FeS',
    subtext: 'Notice: Grey magnetic Iron filings and yellow non-magnetic Sulphur powder combine upon heating to form a dark non-magnetic compound (Iron Sulphide).',
    analogy: 'Two separate puzzle pieces snap together into one single block.'
  },
  {
    id: 'slide_decomposition',
    nodeId: NODE_C8_CHEM_012,
    title: '4. Decomposition Reactions & Energy',
    content: 'A single compound breaks down into two or more simpler substances when supplied with energy.',
    subtext: '• Thermal (Heat): CaCO₃ → CaO + CO₂\n• Electrolytic (Electricity): 2H₂O → 2H₂ + O₂\n• Photolytic (Light): 2AgCl → 2Ag + Cl₂',
    analogy: 'A tall Lego building falling apart into individual bricks when hit with energy.'
  },
  {
    id: 'slide_reactivity',
    nodeId: NODE_C8_CHEM_013,
    title: '5. Reactivity Series & Displacement',
    content: 'A more reactive metal displaces a less reactive metal from its salt solution.',
    formula: 'Zn + CuSO₄ → ZnSO₄ + Cu',
    subtext: 'Reactivity Ladder: K > Na > Ca > Mg > Al > Zn > Fe > Pb > Cu > Ag > Au',
    analogy: 'A stronger player taking the spot of a weaker player on the sports team.'
  },
  {
    id: 'slide_double_disp',
    nodeId: NODE_C8_CHEM_014,
    title: '6. Double Displacement & Precipitates',
    content: 'Positive and negative ions of two aqueous compounds swap partners (AB + CD → AD + CB).',
    formula: 'BaCl₂ (aq) + Na₂SO₄ (aq) → BaSO₄ (s)↓ + 2NaCl (aq)',
    subtext: 'If one product is insoluble in water, it precipitates out as a solid (marked with ↓).',
    analogy: 'Two dancing couples swapping partners simultaneously on the dance floor.'
  },
  {
    id: 'slide_hydrogen',
    nodeId: NODE_C8_CHEM_016,
    title: '7. Hydrogen Gas: Lab Preparation & Tests',
    content: 'Prepared in a Woulfe bottle by reacting granulated Zinc with dilute HCl or H₂SO₄.',
    formula: 'Zn + 2HCl → ZnCl₂ + H₂↑',
    subtext: '• Collection: Downward displacement of water (insoluble & lighter than air).\n• Identification: POP test with a burning wooden splint!\n• Chemical Property: Reducing agent (CuO + H₂ → Cu + H₂O).',
    analogy: 'Hydrogen acts like an oxygen magnet, pulling oxygen away from hot metal oxides!'
  }
];

// Scenario Narrative
const SCENARIO = {
  title: 'ICSE Chemistry Lab Masterclass',
  subtitle: 'Master Equations, Reaction Types, Reactivity & Hydrogen Gas',
  welcomeText: 'Welcome to the Virtual Chemistry Laboratory! Step into the shoes of a lead chemist. Conduct experiments, balance atomic scales, test metal reactivity, and unlock mastery over chemical equations.'
};

const MISCONCEPTIONS_CHECKLIST: Misconception[] = [
  {
    id: "misc_1",
    title: "Changing Subscripts in Formulas to Balance Chemical Equations",
    description: "Students often alter the subscript numbers inside a chemical formula to balance atoms on both sides of an equation. They believe subscript numbers can be freely adjusted just like coefficients.",
    correction: "Subscripts define the fixed chemical identity and composition of a specific compound, so changing them alters the substance entirely. To balance a chemical equation correctly, students must only place whole-number coefficients in front of the chemical formulas. This ensures atom counts are equalized without changing the actual chemical species involved.",
  },
  {
    id: "misc_2",
    title: "Mass Is Lost When Reactions Produce Gas Products",
    description: "Students frequently believe that the Law of Conservation of Mass is violated when a reaction produces a gas and the remaining mixture weighs less. They assume that mass disappears during gaseous reactions.",
    correction: "According to the Law of Conservation of Mass, matter can neither be created nor destroyed during a chemical reaction. When gas escapes into the surroundings from an open container, its mass is simply lost to the air, not destroyed. If the reaction is carried out in a sealed vessel, the total mass of reactants and products remains identical.",
  },
  {
    id: "misc_3",
    title: "Coefficients Apply Only to the Immediately Adjacent Element",
    description: "Students often assume a coefficient placed in front of a chemical formula multiplies only the first atom or symbol. For example, they interpret 2H2O as having four hydrogens but only one oxygen atom.",
    correction: "A coefficient written before a formula acts as a multiplier for every atom present in that entire molecule or formula unit. For example, 2H2O represents two complete water molecules, containing a total of four hydrogen atoms and two oxygen atoms. Understanding this distributive property is essential for accurately counting atoms during equation balancing.",
  },
  {
    id: "misc_4",
    title: "Equal Number of Molecules Required on Both Sides",
    description: "Students often confuse the conservation of atoms with a conservation of total molecules, expecting equal molecule counts on reactant and product sides. They believe an equation with two reactant molecules must yield exactly two product molecules.",
    correction: "The Law of Conservation of Mass dictates that the total number of each type of atom must remain equal before and after a reaction. Molecules, however, break apart and rearrange into entirely new combinations, meaning the total number of molecules can change. Balancing focuses strictly on conserving individual atoms, not the total molecule count.",
  },
  {
    id: "misc_5",
    title: "The Reaction Arrow Functions as a Mathematical Equals Sign",
    description: "Students frequently view the reaction arrow (→) as a standard mathematical equals sign (=) indicating simple numeric equality. They assume reactants and products are interchangeable substances on either side.",
    correction: "The reaction arrow in a chemical equation represents a directional transformation from starting materials (reactants) into new substances (products). It indicates the pathway and direction in which a chemical change proceeds, rather than a reversible mathematical equivalence. Using an equals sign obscures the fundamental concept that reactants undergo a chemical conversion.",
  },
];

export default function C8_ChemistryChemicalequationsbalancingSim() {
  // Navigation & View Mode
  const [activeTab, setActiveTab] = useState<'slides' | 'lab' | 'ladder' | 'hydrogen' | 'challenges'>('slides');
  const [currentSlideIdx, setCurrentSlideIdx] = useState(0);
  const [currentChallengeIdx, setCurrentChallengeIdx] = useState(0);

  // Lab Simulation State
  const [selectedReactionId, setSelectedReactionId] = useState<string>('comb_water');
  const [coefs, setCoefs] = useState<{ [key: string]: number }>({ 'H₂': 1, 'O₂': 1, 'H₂O': 1 });
  const [isReactionAnimated, setIsReactionAnimated] = useState(false);

  // Reactivity Ladder Interactive State
  const [draggedMetal, setDraggedMetal] = useState<MetalReactivity | null>(null);
  const [selectedSolution, setSelectedSolution] = useState<'CuSO4' | 'FeSO4' | 'ZnSO4' | 'HCl'>('CuSO4');
  const [displacementResult, setDisplacementResult] = useState<string | null>(null);

  // Hydrogen Woulfe Bottle Lab State
  const [h2Acid, setH2Acid] = useState<'HCl' | 'H2SO4'>('HCl');
  const [h2Metal, setH2Metal] = useState<'Zn' | 'Cu' | 'Mg'>('Zn');
  const [isGasGenerating, setIsGasGenerating] = useState(false);
  const [gasVolume, setGasVolume] = useState(0);
  const [testedPop, setTestedPop] = useState(false);
  const [reducedCuO, setReducedCuO] = useState(false);

  // User Answers & Mastery Systems
  const [challengeAnswers, setChallengeAnswers] = useState<{ [id: number]: any }>({});
  const [challengeFeedback, setChallengeFeedback] = useState<{ [id: number]: { isCorrect: boolean; text: string } }>({});
  const [score, setScore] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // BKT Mastery Tracking State
  const [bktMap, setBktMap] = useState<{ [nodeId: string]: any }>(() => {
    const initial: { [n: string]: any } = {};
    ALL_NODE_IDS.forEach(id => {
      initial[id] = createBKTState();
    });
    return initial;
  });

  const selectedReaction = useMemo(() => {
    return SIM_REACTIONS.find(r => r.id === selectedReactionId) || SIM_REACTIONS[0];
  }, [selectedReactionId]);

  // Reset Coefs when switching reaction
  useEffect(() => {
    const initial: { [key: string]: number } = {};
    selectedReaction.reactants.forEach(r => { initial[r.formula] = r.defaultCoef; });
    selectedReaction.products.forEach(p => { initial[p.formula] = p.defaultCoef; });
    setCoefs(initial);
    setIsReactionAnimated(false);
  }, [selectedReaction]);

  // Calculate Atom Balance Scale
  const atomCounts = useMemo(() => {
    const left: AtomCount = {};
    const right: AtomCount = {};

    selectedReaction.reactants.forEach(r => {
      const multiplier = coefs[r.formula] || 1;
      Object.entries(r.atoms).forEach(([elem, count]) => {
        left[elem] = (left[elem] || 0) + count * multiplier;
      });
    });

    selectedReaction.products.forEach(p => {
      const multiplier = coefs[p.formula] || 1;
      Object.entries(p.atoms).forEach(([elem, count]) => {
        right[elem] = (right[elem] || 0) + count * multiplier;
      });
    });

    return { left, right };
  }, [selectedReaction, coefs]);

  const isBalanced = useMemo(() => {
    const allElements = new Set([...Object.keys(atomCounts.left), ...Object.keys(atomCounts.right)]);
    for (let elem of Array.from(allElements)) {
      if ((atomCounts.left[elem] || 0) !== (atomCounts.right[elem] || 0)) {
        return false;
      }
    }
    return true;
  }, [atomCounts]);

  // Trigger sound when equation balances
  useEffect(() => {
    if (isBalanced) {
      audioManager.play('balance');
      speechManager.speak('Equation is balanced! The atom counts on left and right sides are equal.');
    }
  }, [isBalanced]);

  // Handle Coefficient Adjustment
  const handleCoefChange = (formula: string, delta: number) => {
    audioManager.play('tap');
    setCoefs(prev => {
      const current = prev[formula] || 1;
      const next = Math.max(1, Math.min(6, current + delta));
      return { ...prev, [formula]: next };
    });
  };

  // Run Visual Reaction Animation
  const triggerReactionAnim = () => {
    if (!isBalanced) {
      audioManager.play('error');
      speechManager.speak('Balance the equation first before initiating the chemical reaction!');
      return;
    }
    audioManager.play('whoosh');
    setIsReactionAnimated(true);
    setTimeout(() => {
      audioManager.play('pop');
      setShowSparkle(true);
      setTimeout(() => setShowSparkle(false), 1500);
    }, 1000);
  };

  // Reactivity Displacement Simulation Logic
  const handleTestDisplacement = (metalSymbol: string) => {
    audioManager.play('tap');
    const metal = REACTIVITY_SERIES.find(m => m.symbol === metalSymbol);
    if (!metal) return;

    if (selectedSolution === 'HCl') {
      if (metal.rank <= 8) { // Metals above Hydrogen (K to Pb)
        const text = `${metal.name} is above Hydrogen in reactivity (Rank ${metal.rank}). It displaces Hydrogen from HCl: ${metal.symbol} + 2HCl → ${metal.symbol}Cl₂ + H₂↑. ${metal.acidReaction}`;
        setDisplacementResult(text);
        audioManager.play('success');
        speechManager.speak(`${metal.name} displaces Hydrogen from the acid! Effervescence observed.`);
      } else {
        const text = `${metal.name} is BELOW Hydrogen in the reactivity series (Rank ${metal.rank}). NO REACTION occurs with dilute hydrochloric acid!`;
        setDisplacementResult(text);
        audioManager.play('error');
        speechManager.speak(`No reaction! ${metal.name} is less reactive than hydrogen.`);
      }
      return;
    }

    // Salt Solutions (CuSO4, FeSO4, ZnSO4)
    let targetMetalRank = 9; // Cu
    let targetMetalName = 'Copper';
    if (selectedSolution === 'FeSO4') { targetMetalRank = 7; targetMetalName = 'Iron'; }
    if (selectedSolution === 'ZnSO4') { targetMetalRank = 6; targetMetalName = 'Zinc'; }

    if (metal.rank < targetMetalRank) {
      const text = `DISPLACEMENT OCCURS! ${metal.name} (Rank ${metal.rank}) is more reactive than ${targetMetalName} (Rank ${targetMetalRank}). ${metal.name} displaces ${targetMetalName} from its solution!`;
      setDisplacementResult(text);
      audioManager.play('drop-correct');
      speechManager.speak(`Displacement successful! ${metal.name} displaces ${targetMetalName}.`);
    } else {
      const text = `NO REACTION! ${metal.name} (Rank ${metal.rank}) is LESS reactive than ${targetMetalName} (Rank ${targetMetalRank}). It cannot displace ${targetMetalName}!`;
      setDisplacementResult(text);
      audioManager.play('drop-wrong');
      speechManager.speak(`No reaction! ${metal.name} cannot displace ${targetMetalName}.`);
    }
  };

  // Hydrogen Lab Generation
  const handleStartH2Gen = () => {
    if (h2Metal === 'Cu') {
      audioManager.play('error');
      setDisplacementResult('Copper is below Hydrogen in the reactivity series! No hydrogen gas produced.');
      speechManager.speak('Copper cannot displace hydrogen from dilute acids!');
      return;
    }
    audioManager.play('whoosh');
    setIsGasGenerating(true);
    setGasVolume(0);
    setTestedPop(false);
    setReducedCuO(false);

    let current = 0;
    const interval = setInterval(() => {
      current += 20;
      setGasVolume(current);
      audioManager.play('count');
      if (current >= 100) {
        clearInterval(interval);
        setIsGasGenerating(false);
        audioManager.play('success');
        speechManager.speak('Gas jar is filled with Hydrogen gas by downward displacement of water!');
      }
    }, 600);
  };

  const handlePopTest = () => {
    if (gasVolume < 100) return;
    audioManager.play('pop');
    setTestedPop(true);
    setShowSparkle(true);
    setTimeout(() => setShowSparkle(false), 1200);
    speechManager.speak('POP! Hydrogen gas burns with a characteristic pop sound!');
  };

  const handleCuOReduction = () => {
    if (gasVolume < 100) return;
    audioManager.play('sparkle');
    setReducedCuO(true);
    setShowSparkle(true);
    setTimeout(() => setShowSparkle(false), 1500);
    speechManager.speak('Reduction complete! Black Copper Oxide is reduced to reddish brown Copper metal by Hydrogen gas!');
  };

  // Challenge Handling
  const handleSelectOption = (challengeId: number, optionIdx: number) => {
    audioManager.play('tap');
    setChallengeAnswers(prev => ({ ...prev, [challengeId]: optionIdx }));
  };

  const handleBalanceInput = (challengeId: number, val: string) => {
    setChallengeAnswers(prev => ({ ...prev, [challengeId]: val }));
  };

  const submitChallenge = (challenge: Challenge) => {
    const userAns = challengeAnswers[challenge.id];
    let isCorrect = false;

    if (challenge.type === 'balance') {
      const cleaned = String(userAns || '').replace(/\s+/g, '');
      isCorrect = (cleaned === challenge.correctAnswer);
    } else {
      isCorrect = (userAns === challenge.correctAnswer);
    }

    if (isCorrect) {
      audioManager.play('success');
      audioManager.play('chime');
      setScore(prev => prev + 15);
      setChallengeFeedback(prev => ({
        ...prev,
        [challenge.id]: { isCorrect: true, text: `Correct! ${challenge.explanation}` }
      }));
      speechManager.speak('Excellent job! You answered correctly.');

      // BKT update
      setBktMap(prev => {
        const nodeState = prev[challenge.nodeId] || createBKTState();
        const updated = bktUpdate(nodeState, true);
        const _reviewItem = createReviewItem('C8_ChemistryChemical', 'challenge');
        sm2Update(_reviewItem, 4, 0);
        recordGameScore(challenge.nodeId, updated.pKnown);
        return { ...prev, [challenge.nodeId]: updated };
      });

      if (currentChallengeIdx === CHALLENGES.length - 1) {
        setShowConfetti(true);
        setShowSuccessBanner(true);
        audioManager.play('celebration');
        speechManager.speak('Congratulations! You have completed all ICSE Chemistry Lab Challenges!');
      }
    } else {
      audioManager.play('error');
      setChallengeFeedback(prev => ({
        ...prev,
        [challenge.id]: { isCorrect: false, text: `Incorrect. ${challenge.explanation}` }
      }));
      speechManager.speak('Not quite right. Review the explanation and try again!');

      // BKT update on failure
      setBktMap(prev => {
        const nodeState = prev[challenge.nodeId] || createBKTState();
        const updated = bktUpdate(nodeState, false);
        recordGameScore(challenge.nodeId, updated.pKnown);
        return { ...prev, [challenge.nodeId]: updated };
      });
    }
  };

  // Overall Mastery Level calculation
  const overallMastery = useMemo(() => {
    let totalP = 0;
    ALL_NODE_IDS.forEach(id => {
      totalP += bktMap[id]?.pKnown || 0.1;
    });
    return Math.round((totalP / ALL_NODE_IDS.length) * 100);
  }, [bktMap]);

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col p-3 md:p-6 select-none">
      {/* Equation Balancing SVG Visual */}
      <svg width={400} height={100} className="mx-auto mb-4 rounded-lg shadow-inner">
        <rect width={400} height={100} fill="#0f172a" rx={8} />
        <text x={200} y={20} textAnchor="middle" fill="#64748b" fontSize={10}>Balancing Chemical Equations</text>
        <text x={60} y={50} textAnchor="middle" fill="#06b6d4" fontSize={12} fontWeight="bold">2H₂</text>
        <text x={60} y={68} textAnchor="middle" fill="#06b6d4" fontSize={8}>Reactant</text>
        <text x={110} y={50} textAnchor="middle" fill="#94a3b8" fontSize={14}>+</text>
        <text x={160} y={50} textAnchor="middle" fill="#8b5cf6" fontSize={12} fontWeight="bold">O₂</text>
        <text x={160} y={68} textAnchor="middle" fill="#8b5cf6" fontSize={8}>Reactant</text>
        <line x1={200} y1={45} x2={230} y2={45} stroke="#f59e0b" strokeWidth={2} markerEnd="url(#eqarrow)" />
        <text x={215} y={35} textAnchor="middle" fill="#f59e0b" fontSize={8}>react</text>
        <text x={290} y={50} textAnchor="middle" fill="#10b981" fontSize={12} fontWeight="bold">2H₂O</text>
        <text x={290} y={68} textAnchor="middle" fill="#10b981" fontSize={8}>Product</text>
        <text x={200} y={90} textAnchor="middle" fill="#64748b" fontSize={8}>Atoms: H=4, O=2 on both sides ✓</text>
        <defs>
          <marker id="eqarrow" markerWidth={8} markerHeight={8} refX={6} refY={3} orient="auto">
            <path d="M0,0 L6,3 L0,6" fill="#f59e0b" />
          </marker>
        </defs>
      </svg>
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccessBanner} text="Chemistry Mastery Achieved!" />
      <SparkleBurst show={showSparkle} x={500} y={300} />

      {/* Header Banner */}
      <header className="w-full bg-slate-900/90 border border-slate-800 rounded-2xl p-4 mb-4 backdrop-blur shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-gold-500 to-gold-600 flex items-center justify-center text-2xl shadow-lg shadow-gold-500/20">
            🧪
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-gold-400 via-gold-300 to-gold-300 bg-clip-text text-transparent">
              {SCENARIO.title}
            </h1>
            <p className="text-xs text-slate-400 font-medium">{SCENARIO.subtitle} • Class 8 ICSE</p>
          </div>
        </div>

        {/* Global Mastery Stats */}
        <div className="flex items-center gap-4 bg-slate-950/70 border border-slate-800 px-4 py-2 rounded-xl">
          <div className="text-right">
            <div className="text-xs text-slate-400 font-semibold">Mastery Score</div>
            <div className="text-lg font-bold text-gold-400">{overallMastery}%</div>
          </div>
          <div className="w-12 h-12 rounded-full border-4 border-gold-500/30 border-t-gold-400 flex items-center justify-center text-xs font-bold text-slate-200">
            {score} pts
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="flex flex-wrap items-center gap-2 mb-6">
        {[
          { id: 'slides', label: '📖 Concept Slides', icon: '💡' },
          { id: 'lab', label: '⚖️ Reaction Balancer', icon: '🔬' },
          { id: 'ladder', label: '⚡ Reactivity Ladder', icon: '🪜' },
          { id: 'hydrogen', label: '🫧 Hydrogen Woulfe Lab', icon: '🧪' },
          { id: 'challenges', label: '🎯 Mastery Arena', icon: '🏆' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => {
              audioManager.play('tap');
              setActiveTab(tab.id as any);
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-gold-500 text-slate-950 shadow-lg shadow-gold-500/25 scale-[1.02]'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-850'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* TAB CONTENT 1: CONCEPT SLIDES */}
      {activeTab === 'slides' && (
        <div className="flex-1 flex flex-col gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex-1 flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlideIdx}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gold-950 text-gold-400 border border-gold-800">
                    Node: {TEACHING_SLIDES[currentSlideIdx].nodeId}
                  </span>
                  <span className="text-xs text-slate-400">
                    Slide {currentSlideIdx + 1} of {TEACHING_SLIDES.length}
                  </span>
                </div>

                <h2 className="text-2xl font-bold text-slate-100">
                  {TEACHING_SLIDES[currentSlideIdx].title}
                </h2>

                <p className="text-slate-300 text-base leading-relaxed">
                  {TEACHING_SLIDES[currentSlideIdx].content}
                </p>

                {TEACHING_SLIDES[currentSlideIdx].formula && (
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-center font-mono text-xl font-bold text-gold-300 shadow-inner">
                    {TEACHING_SLIDES[currentSlideIdx].formula}
                  </div>
                )}

                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-850 space-y-2">
                  <div className="text-xs font-semibold text-gold-400 uppercase tracking-wider">Key Takeaways & Details</div>
                  <div className="text-sm text-slate-300 whitespace-pre-line leading-relaxed">
                    {TEACHING_SLIDES[currentSlideIdx].subtext}
                  </div>
                </div>

                <div className="p-4 bg-gold-950/30 border border-gold-900/50 rounded-xl flex items-start gap-3">
                  <span className="text-2xl">🧠</span>
                  <div>
                    <h4 className="text-xs font-bold text-gold-300 uppercase">ELI5 Analogy</h4>
                    <p className="text-sm text-gold-200 mt-0.5">
                      {TEACHING_SLIDES[currentSlideIdx].analogy}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Slide Control Bar */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-800">
              <button
                disabled={currentSlideIdx === 0}
                onClick={() => {
                  audioManager.play('tap');
                  setCurrentSlideIdx(prev => prev - 1);
                }}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-700 font-semibold text-sm"
              >
                ← Previous
              </button>

              <div className="flex gap-1.5">
                {TEACHING_SLIDES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      audioManager.play('tap');
                      setCurrentSlideIdx(idx);
                    }}
                    className={`w-3 h-3 rounded-full transition-all ${
                      idx === currentSlideIdx ? 'bg-gold-400 w-6' : 'bg-slate-700'
                    }`}
                  />
                ))}
              </div>

              <button
                disabled={currentSlideIdx === TEACHING_SLIDES.length - 1}
                onClick={() => {
                  audioManager.play('tap');
                  setCurrentSlideIdx(prev => prev + 1);
                }}
                className="px-4 py-2 rounded-xl bg-gold-500 text-slate-950 font-semibold text-sm hover:bg-gold-400 disabled:opacity-40"
              >
                Next Slide →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 2: REACTION BALANCER LAB */}
      {activeTab === 'lab' && (
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Reaction Selector & Info */}
          <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between shadow-xl">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <span>🧪</span> Select Chemical Reaction
              </h3>

              <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
                {SIM_REACTIONS.map(rxn => (
                  <button
                    key={rxn.id}
                    onClick={() => {
                      audioManager.play('tap');
                      setSelectedReactionId(rxn.id);
                    }}
                    className={`w-full text-left p-3 rounded-xl border transition-all ${
                      selectedReactionId === rxn.id
                        ? 'bg-gold-950/70 border-gold-500 text-slate-100 shadow-md'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm">{rxn.name}</span>
                      <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-800 text-gold-300">
                        {rxn.type.replace('_', ' ')}
                      </span>
                    </div>
                    <div className="text-xs font-mono text-slate-400 mt-1">{rxn.unbalancedStr}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-850 space-y-2 mt-4">
              <div className="text-xs font-semibold text-gold-400 uppercase">Reaction Observation</div>
              <p className="text-xs text-slate-300">{selectedReaction.observation}</p>
              {selectedReaction.condition && (
                <div className="text-xs text-amber-400 font-mono mt-1">Condition: {selectedReaction.condition}</div>
              )}
            </div>
          </div>

          {/* Balance Scale Visualizer & Coefficient Controls */}
          <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between shadow-xl">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-100">{selectedReaction.name}</h2>
                  <p className="text-xs text-slate-400">{selectedReaction.description}</p>
                </div>
                <div className={`px-4 py-1.5 rounded-full text-xs font-bold border ${
                  isBalanced
                    ? 'bg-emerald-950 border-emerald-500 text-emerald-400'
                    : 'bg-rose-950 border-rose-800 text-rose-400'
                }`}>
                  {isBalanced ? '✓ EQUATION BALANCED' : '⚠️ UNBALANCED ATOMS'}
                </div>
              </div>

              {/* Equation Drag / Coef Adjusters */}
              <div className="flex flex-wrap items-center justify-center gap-4 py-4 bg-slate-950 rounded-2xl border border-slate-850 p-4">
                {/* Reactants */}
                {selectedReaction.reactants.map((r, idx) => (
                  <React.Fragment key={r.formula}>
                    {idx > 0 && <span className="text-2xl font-bold text-slate-500">+</span>}
                    <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-xl p-2 shadow-md">
                      <div className="flex flex-col items-center">
                        <button
                          onClick={() => handleCoefChange(r.formula, 1)}
                          className="w-7 h-7 bg-slate-800 rounded hover:bg-gold-600 text-slate-200 font-bold text-sm"
                        >
                          ▲
                        </button>
                        <span className="text-xl font-bold text-gold-400 my-1 font-mono">
                          {coefs[r.formula] || 1}
                        </span>
                        <button
                          onClick={() => handleCoefChange(r.formula, -1)}
                          className="w-7 h-7 bg-slate-800 rounded hover:bg-gold-600 text-slate-200 font-bold text-sm"
                        >
                          ▼
                        </button>
                      </div>
                      <span className="text-2xl font-mono font-bold text-slate-100 px-2">{r.formula}</span>
                    </div>
                  </React.Fragment>
                ))}

                <span className="text-2xl font-bold text-gold-400 font-mono">→</span>

                {/* Products */}
                {selectedReaction.products.map((p, idx) => (
                  <React.Fragment key={p.formula}>
                    {idx > 0 && <span className="text-2xl font-bold text-slate-500">+</span>}
                    <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-xl p-2 shadow-md">
                      <div className="flex flex-col items-center">
                        <button
                          onClick={() => handleCoefChange(p.formula, 1)}
                          className="w-7 h-7 bg-slate-800 rounded hover:bg-gold-600 text-slate-200 font-bold text-sm"
                        >
                          ▲
                        </button>
                        <span className="text-xl font-bold text-gold-400 my-1 font-mono">
                          {coefs[p.formula] || 1}
                        </span>
                        <button
                          onClick={() => handleCoefChange(p.formula, -1)}
                          className="w-7 h-7 bg-slate-800 rounded hover:bg-gold-600 text-slate-200 font-bold text-sm"
                        >
                          ▼
                        </button>
                      </div>
                      <span className="text-2xl font-mono font-bold text-slate-100 px-2">{p.formula}</span>
                    </div>
                  </React.Fragment>
                ))}
              </div>

              {/* Atom Count Comparison Scale */}
              <div className="bg-slate-950 border border-slate-850 rounded-2xl p-4 space-y-3">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider text-center">
                  Atom Count Verification (Law of Conservation of Mass)
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Left Side */}
                  <div className="bg-slate-900/80 rounded-xl p-3 border border-slate-800">
                    <div className="text-xs font-bold text-gold-400 border-b border-slate-800 pb-1 mb-2">Reactants (Left Side)</div>
                    <div className="space-y-1">
                      {Object.entries(atomCounts.left).map(([elem, count]) => {
                        const rightCount = atomCounts.right[elem] || 0;
                        const matches = count === rightCount;
                        return (
                          <div key={elem} className="flex justify-between items-center text-sm font-mono">
                            <span className="text-slate-300">{elem}:</span>
                            <span className={`font-bold px-2 py-0.5 rounded ${matches ? 'bg-emerald-950 text-emerald-400' : 'bg-rose-950 text-rose-400'}`}>
                              {count} atoms
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right Side */}
                  <div className="bg-slate-900/80 rounded-xl p-3 border border-slate-800">
                    <div className="text-xs font-bold text-gold-400 border-b border-slate-800 pb-1 mb-2">Products (Right Side)</div>
                    <div className="space-y-1">
                      {Object.entries(atomCounts.right).map(([elem, count]) => {
                        const leftCount = atomCounts.left[elem] || 0;
                        const matches = count === leftCount;
                        return (
                          <div key={elem} className="flex justify-between items-center text-sm font-mono">
                            <span className="text-slate-300">{elem}:</span>
                            <span className={`font-bold px-2 py-0.5 rounded ${matches ? 'bg-emerald-950 text-emerald-400' : 'bg-rose-950 text-rose-400'}`}>
                              {count} atoms
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Run Reaction Trigger */}
            <div className="pt-6 border-t border-slate-800 flex justify-end">
              <button
                onClick={triggerReactionAnim}
                disabled={!isBalanced}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-slate-950 font-bold hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-gold-500/20"
              >
                �� Run Chemical Reaction
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 3: REACTIVITY LADDER INTERACTIVE */}
      {activeTab === 'ladder' && (
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Reactivity Ladder Column */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-100 mb-1 flex items-center gap-2">
                <span>🪜</span> ICSE Metal Reactivity Series
              </h3>
              <p className="text-xs text-slate-400 mb-4">Ranked from Most Reactive (top) to Least Reactive (bottom)</p>

              <div className="space-y-1.5 max-h-[460px] overflow-y-auto pr-1">
                {REACTIVITY_SERIES.map((m) => (
                  <div
                    key={m.symbol}
                    onClick={() => handleTestDisplacement(m.symbol)}
                    className="flex items-center justify-between p-2.5 bg-slate-950 border border-slate-800 hover:border-gold-500 rounded-xl cursor-pointer transition-all hover:scale-[1.01]"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-slate-800 text-slate-300 text-xs font-bold flex items-center justify-center font-mono">
                        {m.rank}
                      </span>
                      <span className="font-bold text-sm text-slate-200" style={{ color: m.color }}>
                        {m.name} ({m.symbol})
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 bg-slate-900 px-2 py-1 rounded">
                      Tap to Test
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Test Solution Bench */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-slate-100">Displacement Testing Bench</h2>

              {/* Solution Selector */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-400 uppercase">Select Solution in Beaker:</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {[
                    { id: 'CuSO4', name: 'CuSO₄ (Blue)', target: 'Copper' },
                    { id: 'FeSO4', name: 'FeSO₄ (Green)', target: 'Iron' },
                    { id: 'ZnSO4', name: 'ZnSO₄ (Clear)', target: 'Zinc' },
                    { id: 'HCl', name: 'Dilute HCl', target: 'Hydrogen' }
                  ].map(sol => (
                    <button
                      key={sol.id}
                      onClick={() => {
                        audioManager.play('tap');
                        setSelectedSolution(sol.id as any);
                        setDisplacementResult(null);
                      }}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        selectedSolution === sol.id
                          ? 'bg-gold-950 border-gold-500 text-gold-300 font-bold'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <div className="text-sm font-mono">{sol.name}</div>
                      <div className="text-[10px] text-slate-400 mt-1">Displace {sol.target}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Displacement Visual Graphic */}
              <div className="bg-slate-950 border border-slate-850 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[220px]">
                <div className="relative w-32 h-40 border-b-4 border-x-4 border-slate-700 rounded-b-3xl bg-gold-900/30 overflow-hidden flex items-end justify-center">
                  <motion.div
                    animate={{ height: ['50%', '55%', '50%'] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className={`w-full ${
                      selectedSolution === 'CuSO4' ? 'bg-gold-600/70' :
                      selectedSolution === 'FeSO4' ? 'bg-emerald-600/60' : 'bg-gold-400/30'
                    }`}
                  />
                  <div className="absolute top-4 text-xs font-mono font-bold text-slate-200 bg-slate-900/80 px-2 py-0.5 rounded">
                    {selectedSolution}
                  </div>
                </div>

                {displacementResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-4 rounded-xl bg-slate-900 border border-slate-800 text-center max-w-md text-sm text-slate-200"
                  >
                    {displacementResult}
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 4: HYDROGEN WOULFE BOTTLE LAB */}
      {activeTab === 'hydrogen' && (
        <div className="flex-1 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-800 pb-4 gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                  <span>🫧</span> Laboratory Preparation & Properties of Hydrogen Gas
                </h2>
                <p className="text-xs text-slate-400">Node c8_chem_016: Zn + 2HCl → ZnCl₂ + H₂↑</p>
              </div>

              {/* Metal & Acid Selectors */}
              <div className="flex items-center gap-3">
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">Metal</span>
                  <select
                    value={h2Metal}
                    onChange={(e) => setH2Metal(e.target.value as any)}
                    className="bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-lg p-2 font-semibold"
                  >
                    <option value="Zn">Zinc Granules (Optimal)</option>
                    <option value="Mg">Magnesium Ribbon (Vigorous)</option>
                    <option value="Cu">Copper Turnings (No Reaction)</option>
                  </select>
                </div>

                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">Dilute Acid</span>
                  <select
                    value={h2Acid}
                    onChange={(e) => setH2Acid(e.target.value as any)}
                    className="bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-lg p-2 font-semibold"
                  >
                    <option value="HCl">Dilute HCl</option>
                    <option value="H2SO4">Dilute H₂SO₄</option>
                  </select>
                </div>

                <button
                  onClick={handleStartH2Gen}
                  disabled={isGasGenerating}
                  className="px-4 py-2 mt-4 rounded-xl bg-gold-500 text-slate-950 font-bold text-xs hover:bg-gold-400 disabled:opacity-40 shadow-md shadow-gold-500/20"
                >
                  {isGasGenerating ? 'Generating...' : '▶ Start Reaction'}
                </button>
              </div>
            </div>

            {/* Woulfe Bottle Visual Apparatus */}
            <div className="bg-slate-950 border border-slate-850 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Apparatus Visual */}
              <div className="md:col-span-7 flex flex-col items-center justify-center bg-slate-900/60 rounded-xl p-4 min-h-[260px]">
                <div className="flex items-end gap-6">
                  {/* Woulfe Bottle */}
                  <div className="relative w-28 h-36 border-2 border-slate-600 rounded-b-2xl bg-gold-950/30 flex flex-col items-center justify-end p-2">
                    <div className="text-[10px] text-slate-400 font-mono absolute top-2">Woulfe Bottle</div>
                    {/* Metal Granules */}
                    <div className="w-full flex justify-center gap-1 mb-1">
                      <div className="w-3 h-3 rounded-full bg-slate-400" />
                      <div className="w-3 h-3 rounded-full bg-slate-400" />
                      <div className="w-3 h-3 rounded-full bg-slate-400" />
                    </div>
                    {/* Bubbles */}
                    {isGasGenerating && (
                      <motion.div
                        animate={{ y: [-5, -40], opacity: [1, 0] }}
                        transition={{ repeat: Infinity, duration: 0.8 }}
                        className="w-2 h-2 rounded-full bg-gold-300"
                      />
                    )}
                  </div>

                  {/* Delivery Tube */}
                  <div className="w-12 h-1 bg-slate-600 mb-16" />

                  {/* Gas Jar over Water */}
                  <div className="relative w-24 h-40 border-2 border-slate-600 rounded-t-2xl bg-slate-900 flex flex-col items-center justify-between p-2">
                    <div className="text-[10px] text-gold-300 font-mono">Inverted Gas Jar</div>
                    {/* Water Level */}
                    <div
                      className="w-full bg-gold-600/40 transition-all duration-300 rounded-b-xl"
                      style={{ height: `${100 - gasVolume}%` }}
                    />
                    <div className="text-[10px] text-slate-400">
                      H₂ Gas: {gasVolume}%
                    </div>
                  </div>
                </div>
              </div>

              {/* Lab Test Actions */}
              <div className="md:col-span-5 flex flex-col justify-center space-y-4">
                <h4 className="text-sm font-bold text-slate-200 uppercase">Chemical Property Tests</h4>

                <button
                  onClick={handlePopTest}
                  disabled={gasVolume < 100}
                  className="p-3 rounded-xl bg-amber-950/60 border border-amber-800 text-amber-300 font-semibold text-xs text-left hover:bg-amber-900/60 disabled:opacity-30 transition-all"
                >
                  🔥 1. Perform POP Test (Combustion)
                  <p className="text-[10px] text-amber-400/80 mt-1">
                    {testedPop ? '✓ POP sound confirmed! H₂ burns with pale blue flame.' : 'Bring lighted splinter to gas jar mouth.'}
                  </p>
                </button>

                <button
                  onClick={handleCuOReduction}
                  disabled={gasVolume < 100}
                  className="p-3 rounded-xl bg-gold-950/60 border border-gold-800 text-gold-300 font-semibold text-xs text-left hover:bg-gold-900/60 disabled:opacity-30 transition-all"
                >
                  🧱 2. Reduction of CuO (CuO + H₂ → Cu + H₂O)
                  <p className="text-[10px] text-gold-400/80 mt-1">
                    {reducedCuO ? '✓ Black CuO reduced to reddish-brown Copper metal!' : 'Pass dry H₂ gas over heated black Copper Oxide.'}
                  </p>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 5: MASTERY CHALLENGES */}
      {activeTab === 'challenges' && (
        <div className="flex-1 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                  <span>🎯</span> ICSE Class 8 Mastery Challenges
                </h2>
                <p className="text-xs text-slate-400">Node: {CHALLENGES[currentChallengeIdx].nodeId}</p>
              </div>
              <div className="text-xs font-semibold text-gold-400 bg-slate-950 px-3 py-1.5 rounded-full border border-slate-800">
                Challenge {currentChallengeIdx + 1} of {CHALLENGES.length}
              </div>
            </div>

            {/* Current Challenge Card */}
            <div className="bg-slate-950 border border-slate-850 rounded-2xl p-6 space-y-5">
              <h3 className="text-lg font-bold text-slate-100">
                {CHALLENGES[currentChallengeIdx].title}
              </h3>

              <p className="text-slate-300 text-sm leading-relaxed">
                {CHALLENGES[currentChallengeIdx].prompt}
              </p>

              {/* Challenge Inputs */}
              {CHALLENGES[currentChallengeIdx].type === 'balance' ? (
                <div className="space-y-3">
                  <label className="text-xs text-slate-400 font-semibold">
                    Enter Coefficients separated by commas (e.g. 2,1,2):
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 2,1,2"
                    value={challengeAnswers[CHALLENGES[currentChallengeIdx].id] || ''}
                    onChange={(e) => handleBalanceInput(CHALLENGES[currentChallengeIdx].id, e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-gold-300 font-mono font-bold text-sm focus:outline-none focus:border-gold-500"
                  />
                </div>
              ) : (
                <div className="space-y-2">
                  {CHALLENGES[currentChallengeIdx].options?.map((opt, optIdx) => (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectOption(CHALLENGES[currentChallengeIdx].id, optIdx)}
                      className={`w-full text-left p-3.5 rounded-xl border text-sm transition-all ${
                        challengeAnswers[CHALLENGES[currentChallengeIdx].id] === optIdx
                          ? 'bg-gold-950 border-gold-500 text-gold-200 font-semibold'
                          : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <span className="font-mono text-gold-400 mr-2">{String.fromCharCode(65 + optIdx)}.</span>
                      {opt}
                    </button>
                  ))}
                </div>
              )}

              {/* Feedback Alert */}
              {challengeFeedback[CHALLENGES[currentChallengeIdx].id] && (
                <div className={`p-4 rounded-xl border text-xs leading-relaxed ${
                  challengeFeedback[CHALLENGES[currentChallengeIdx].id].isCorrect
                    ? 'bg-emerald-950/70 border-emerald-800 text-emerald-300'
                    : 'bg-rose-950/70 border-rose-800 text-rose-300'
                }`}>
                  {challengeFeedback[CHALLENGES[currentChallengeIdx].id].text}
                </div>
              )}
            </div>
          </div>

          {/* Controls Bar */}
          <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
            <button
              disabled={currentChallengeIdx === 0}
              onClick={() => {
                audioManager.play('tap');
                setCurrentChallengeIdx(prev => prev - 1);
              }}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold text-sm disabled:opacity-40"
            >
              ← Previous
            </button>

            <button
              onClick={() => submitChallenge(CHALLENGES[currentChallengeIdx])}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-slate-950 font-bold text-sm shadow-md hover:brightness-110"
            >
              Submit Answer
            </button>

            <button
              disabled={currentChallengeIdx === CHALLENGES.length - 1}
              onClick={() => {
                audioManager.play('tap');
                setCurrentChallengeIdx(prev => prev + 1);
              }}
              className="px-4 py-2 rounded-xl bg-gold-500 text-slate-950 font-semibold text-sm disabled:opacity-40"
            >
              Next Challenge →
            </button>
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
    </div>
  );
}