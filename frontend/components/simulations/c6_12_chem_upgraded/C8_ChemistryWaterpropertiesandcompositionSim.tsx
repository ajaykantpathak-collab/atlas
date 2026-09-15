'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update, SRSItem } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, BKTState } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// --- NODE IDENTIFIERS ---
const NODE_017 = 'c8_chem_017'; // Physical properties & anomalous expansion of water
const NODE_018 = 'c8_chem_018'; // Composition of water & electrolysis
const NODE_019 = 'c8_chem_019'; // Chemical reactions of water & hydrate chemistry
const NODE_020 = 'c8_chem_020'; // Hardness of water & purification processes
const ALL_NODE_IDS = [NODE_017, NODE_018, NODE_019, NODE_020] as const;

type NodeId = typeof ALL_NODE_IDS[number];

// --- INTERFACES & TYPES ---
interface Challenge {
  id: string;
  nodeId: NodeId;
  type: 'multiple-choice' | 'numeric' | 'drag-label' | 'equation-balance';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: string;
  question: string;
  options?: string[];
  correctIndex?: number;
  correctAnswer?: number | string;
  tolerance?: number;
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
}

interface Misconception {
  id: string;
  title: string;
  misconception: string;
  correction: string;
  nodeId: NodeId;
}

interface DefaultProps {
  onComplete?: (score: number) => void;
  initialNodeId?: NodeId;
}

// --- MANDATORY SECTION 1: SCENARIO ---
const SCENARIO = {
  title: 'AquaLab ICSE: Water Properties, Electrolysis & Purification Chamber',
  intro: 'Welcome to the ICSE Advanced Aqueous Chemistry Laboratory! Water (H₂O) is not just a daily necessity—it is a unique chemical compound with extraordinary physical anomalies, precise electrochemical decomposition ratios, diverse chemical reactivities, and complex ionic hardness behaviors.',
  context: 'In this simulation, you will analyze water from its molecular polar structure to its anomalous density behavior at 4°C, perform quantitative electrolysis in a Hofmann voltameter, investigate metal and non-metal oxide reactions, and engineer industrial water softening columns.'
};

// --- MANDATORY SECTION 2: DISCOVERY QUESTION ---
const DISCOVERY_QUESTION = {
  question: 'When 100 cm³ of liquid water at 4°C is frozen completely into ice at 0°C, what happens to its total mass and its total volume?',
  options: [
    'Mass increases and volume increases because solid state is always heavier',
    'Mass remains constant but volume increases by about 9%, reducing its density',
    'Mass decreases and volume decreases because cold molecules contract',
    'Both mass and volume remain completely unchanged'
  ],
  correctIndex: 1,
  hintAfter: 'Water expands upon freezing due to an open hexagonal hydrogen-bonded crystal lattice, causing density to drop from 1.00 g/cm³ to ~0.917 g/cm³ while mass is strictly conserved!'
};

// --- MANDATORY SECTION 3: EXPLORATION STEPS ---
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Anomalous Thermal Expansion & Density Curve',
    instruction: 'Adjust the water temperature slider from -5°C to 15°C. Observe the molecular lattice transition, volume changes, and density peak precisely at 4°C.',
    interactionType: 'temperature-density-slider',
    nodeId: NODE_017,
  },
  {
    title: 'Lab 2: Quantitative Electrolysis (Hofmann Voltameter)',
    instruction: 'Apply electric current through acidified water. Track gas volume accumulation at the cathode (H₂) and anode (O₂), confirming the 2:1 stoichiometric volume ratio.',
    interactionType: 'electrolysis-voltage-timer',
    nodeId: NODE_018,
  },
  {
    title: 'Lab 3: Reactivity of Water with Metals & Oxides',
    instruction: 'Add various substances (Sodium, Calcium, Iron, Carbon Dioxide, Sulfur Dioxide) into water. Observe pH indicator shifts, gas evolution, and thermal changes.',
    interactionType: 'reaction-chamber-selector',
    nodeId: NODE_019,
  },
  {
    title: 'Lab 4: Water Hardness & Softening Chemistry',
    instruction: 'Test soap lathering efficiency in Hard Water vs Soft Water. Treat samples with Boiling, Washing Soda (Na₂CO₃), and Synthetic Ion-Exchange Resin.',
    interactionType: 'hardness-purification-bench',
    nodeId: NODE_020,
  },
  {
    title: 'Lab 5: Polar Molecular Dipole & Hydrogen Bonding Lattice',
    instruction: 'Rotate the 3D H₂O molecule, adjust electric field polarity, and observe dipole orientation along with intermolecular hydrogen bond networks.',
    interactionType: 'molecular-dipole-viewer',
    nodeId: NODE_017,
  },
];

// --- MANDATORY SECTION 4: PREDICTION QUESTIONS ---
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If 60 cm³ of Hydrogen gas is collected at the Cathode during electrolysis, what volume of Oxygen gas will collect simultaneously at the Anode under identical temperature and pressure?',
    options: ['120 cm³', '60 cm³', '30 cm³', '15 cm³'],
    correctIndex: 2,
    verifyInstruction: 'Run Lab 2 (Electrolysis) until Cathode gas reaches 60 cm³ and measure the Anode gas level.',
    nodeId: NODE_018,
  },
  {
    question: 'Predict: What will happen to the pH indicator when Carbon Dioxide (CO₂) gas is bubbled into pure neutral water (pH 7.0)?',
    options: [
      'pH increases above 10.0 (turns dark violet/alkaline)',
      'pH decreases to ~5.5 (turns reddish-orange/acidic due to H₂CO₃ formation)',
      'pH remains exactly at 7.0 because CO₂ is insoluble in water',
      'pH drops to 1.0 forming concentrated Hydrochloric Acid'
    ],
    correctIndex: 1,
    verifyInstruction: 'Select CO₂ in Lab 3 (Reactivity) and check the real-time pH meter reading.',
    nodeId: NODE_019,
  },
];

// --- MANDATORY SECTION 5: OBSERVATION QUESTIONS ---
const OBSERVATION_QUESTIONS = [
  {
    question: 'What happens to the density of water as it is cooled from 10°C down to 0°C?',
    observableOptions: [
      'Density increases continuously all the way to 0°C',
      'Density increases down to 4°C, reaches maximum (1.000 g/cm³), then decreases from 4°C to 0°C',
      'Density drops sharply at 10°C and stays constant',
      'Density remains zero until water freezes'
    ],
    correctIndex: 1,
    nodeId: NODE_017,
  },
  {
    question: 'When temporary hard water containing Calcium Bicarbonate [Ca(HCO₃)₂] is boiled, what visible change occurs in the flask?',
    observableOptions: [
      'No change occurs; temporary hardness cannot be removed by heating',
      'A white precipitate of Calcium Carbonate (CaCO₃) forms as scale while CO₂ gas escapes',
      'Heavy brown fumes of Nitrogen Dioxide gas are evolved',
      'The liquid separates into two immiscible oil-like layers'
    ],
    correctIndex: 1,
    nodeId: NODE_020,
  },
];

// --- MANDATORY SECTION 6: REAL WORLD ACTIVITY ---
const REAL_WORLD_ACTIVITY = {
  title: 'Industrial Boiler Water Treatment & Municipal Electrolysis Analysis',
  description: 'In thermal power plants and green hydrogen production facilities, water quality and electrolysis stoichiometry directly determine operating safety and yield. Unfiltered hard water causes catastrophic boiler scale formation, while electrolysis efficiency dictates clean energy output.',
  steps: [
    'Step 1: Calculate the volume of Hydrogen generated by an industrial electrolyzer producing 250 m³ of pure Oxygen gas per hour. (Using 2:1 stoichiometry: 250 m³ O₂ × 2 = 500 m³ H₂/hr).',
    'Step 2: Determine total hardness in a 500 mL industrial feedwater sample requiring 15 mL of 0.01 M EDTA titrant, corresponding to 150 ppm CaCO₃ equivalent (Hard water category).',
    'Step 3: Select the appropriate softening sequence: Pass water through a dual-bed cation exchanger (R-Na) to replace Ca²⁺ and Mg²⁺ with Na⁺ ions prior to boiler entry.',
    'Step 4: Verify boiler feedwater specifications: Ensure total hardness is < 1 ppm to prevent thermal insulation scale deposition on heat transfer tubes.'
  ]
};

// --- MISCONCEPTIONS DATA ---
const MISCONCEPTIONS: Misconception[] = [
  {
    id: 'misc_01',
    title: 'Ice Density Fallacy',
    misconception: 'Ice is denser than liquid water because it is solid.',
    correction: 'Water exhibits anomalous expansion. Due to hydrogen bonding, ice forms an open cage-like hexagonal crystal lattice with greater volume and lower density (~0.917 g/cm³) than liquid water (1.000 g/cm³ at 4°C).',
    nodeId: NODE_017,
  },
  {
    id: 'misc_02',
    title: 'Boiling vs Chemical Decomposition',
    misconception: 'Boiling water breaks chemical covalent bonds to form H₂ and O₂ gases.',
    correction: 'Boiling is a physical state change that overcomes weak intermolecular hydrogen bonds, converting liquid H₂O into steam (gaseous H₂O). Breaking O-H covalent bonds requires chemical electrolysis or extreme pyrolytic temperatures (>2000°C).',
    nodeId: NODE_017,
  },
  {
    id: 'misc_03',
    title: 'Electrolysis Volume Equivalence',
    misconception: 'Electrolysis yields equal volumes of hydrogen and oxygen gas because both are gases.',
    correction: 'The chemical formula H₂O has an atomic ratio of 2:1. Electro-decomposition yields 2 volumes of Hydrogen gas at the Cathode for every 1 volume of Oxygen gas at the Anode (2H₂O → 2H₂ + O₂).',
    nodeId: NODE_018,
  },
  {
    id: 'misc_04',
    title: 'Water Combustibility Myth',
    misconception: 'Water should burn easily because it contains flammable hydrogen and oxygen which supports burning.',
    correction: 'Water is a compound with distinct properties from its constituent elements. It is the chemical combustion product of hydrogen burning in oxygen; since hydrogen is already fully oxidized in H₂O, water cannot burn.',
    nodeId: NODE_019,
  },
  {
    id: 'misc_05',
    title: 'Universal Fixed Boiling Point',
    misconception: 'Water always boils at 100°C under all circumstances.',
    correction: 'Pure water boils at 100°C only at standard atmospheric pressure (1 atm / 760 mmHg). Boiling point decreases at high altitudes (lower pressure) and increases when non-volatile solutes (e.g., NaCl) are dissolved.',
    nodeId: NODE_017,
  },
  {
    id: 'misc_06',
    title: 'Permanent Hardness Boiling Myth',
    misconception: 'All hard water can be made soft simply by prolonged boiling.',
    correction: 'Boiling only decomposes temporary hardness caused by soluble bicarbonates [Ca(HCO₃)₂]. Permanent hardness caused by sulfates and chlorides (MgSO₄, CaCl₂) remains unchanged by boiling and requires washing soda or ion exchange.',
    nodeId: NODE_020,
  },
];

// --- CHALLENGES DATA (22 COMPREHENSIVE ICSE CLASS 8 LEVEL QUESTIONS) ---
const CHALLENGES: Challenge[] = [
  // --- FOUNDATION TIER (7 Questions) ---
  {
    id: 'c_f1',
    nodeId: NODE_017,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'At what temperature does pure liquid water reach its MAXIMUM density?',
    options: ['0°C', '4°C', '100°C', '-4°C'],
    correctIndex: 1,
    explanation: 'Water exhibits anomalous expansion and reaches its maximum density of 1.000 g/cm³ precisely at 4°C.',
    hints: ['Think about the temperature at which aquatic life survives under frozen lakes.', 'It is slightly above freezing (0°C).', 'The exact value is 4°C.'],
    misconceptionIndex: 0
  },
  {
    id: 'c_f2',
    nodeId: NODE_018,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'During the electrolysis of water, what is the ratio by VOLUME of Hydrogen gas to Oxygen gas collected?',
    options: ['1 : 1', '1 : 2', '2 : 1', '8 : 1'],
    correctIndex: 2,
    explanation: 'The chemical formula H₂O consists of 2 hydrogen atoms for every 1 oxygen atom, producing a 2:1 volume ratio during electrolysis.',
    hints: ['Look at the subscript numbers in H₂O.', 'Hydrogen is H₂ and Oxygen is O.', 'Volume ratio matches atomic ratio: 2 volumes of H₂ to 1 volume of O₂.'],
    misconceptionIndex: 2
  },
  {
    id: 'c_f3',
    nodeId: NODE_018,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'At which electrode is Hydrogen gas liberated during the electrolysis of acidified water?',
    options: ['Anode (+)', 'Cathode (-)', 'Voltameter switch', 'Neutral reference point'],
    correctIndex: 1,
    explanation: 'Hydrogen ions (H⁺) are positively charged cations; during electrolysis, they migrate to the negatively charged Cathode where they gain electrons to form H₂ gas.',
    hints: ['Hydrogen forms positive H⁺ ions in acid solution.', 'Opposites attract: positive ions move to the negative electrode.', 'The negative electrode is called the Cathode.'],
  },
  {
    id: 'c_f4',
    nodeId: NODE_020,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'Which chemical compound is responsible for TEMPORARY hardness in water?',
    options: ['Calcium Sulfate [CaSO₄]', 'Magnesium Chloride [MgCl₂]', 'Calcium Hydrogen Carbonate [Ca(HCO₃)₂]', 'Sodium Chloride [NaCl]'],
    correctIndex: 2,
    explanation: 'Temporary hardness is caused by dissolved hydrogen carbonates (bicarbonates) of calcium and magnesium, which decompose easily upon heating.',
    hints: ['It contains bicarbonate ions (HCO₃⁻).', 'Sulfates and chlorides cause permanent hardness.', 'Look for Calcium Hydrogen Carbonate.'],
    misconceptionIndex: 5
  },
  {
    id: 'c_f5',
    nodeId: NODE_017,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'Why does adding dilute Sulfuric Acid (H₂SO₄) make pure water conduct electricity during electrolysis?',
    options: ['Pure water contains no H₂O molecules', 'Pure water is a very weak electrolyte with negligible free ions; acid provides abundant mobile H⁺ and SO₄²⁻ ions', 'Acid reacts with glass to release electrons', 'Acid turns water into hydrogen gas automatically'],
    correctIndex: 1,
    explanation: 'Pure water dissociates extremely poorly into ions. Dilute acid acts as a catalyst/electrolyte by providing mobile ions to conduct electrical current.',
    hints: ['Pure water is a non-conductor / poor conductor.', 'Electrolysis requires free mobile ions.', 'Acid ionizes completely into H⁺ and SO₄²⁻ ions.'],
  },
  {
    id: 'c_f6',
    nodeId: NODE_019,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'What gas is evolved when Sodium metal reacts vigorously with cold water?',
    options: ['Oxygen (O₂)', 'Hydrogen (H₂)', 'Carbon Dioxide (CO₂)', 'Nitrogen (N₂)'],
    correctIndex: 1,
    explanation: '2Na + 2H₂O → 2NaOH + H₂↑. Sodium reacts exothermically with cold water releasing hydrogen gas.',
    hints: ['It is a flammable gas that burns with a pop sound.', 'Sodium displaces hydrogen from water.', 'The formula of the gas is H₂.'],
  },
  {
    id: 'c_f7',
    nodeId: NODE_019,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'Copper sulfate crystals are blue due to water of crystallization (CuSO₄·5H₂O). What color do they turn when heated strongly?',
    options: ['Dark Green', 'White (Anhydrous CuSO₄)', 'Bright Yellow', 'Deep Purple'],
    correctIndex: 1,
    explanation: 'Heating drives off the 5 water molecules of crystallization, transforming blue hydrated copper sulfate into white anhydrous copper sulfate powder.',
    hints: ['Losing water changes the crystal geometry.', 'Hydrated is blue; anhydrous is non-colored/white.', 'The blue color disappears completely.'],
  },

  // --- STANDARD TIER (8 Questions) ---
  {
    id: 'c_s1',
    nodeId: NODE_018,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'If 50 cm³ of Hydrogen gas is collected at the cathode during water electrolysis, how many cm³ of Oxygen gas are collected at the anode under identical conditions?',
    correctAnswer: 25,
    tolerance: 0.5,
    explanation: 'Since the volumetric ratio of H₂ : O₂ is 2 : 1, Oxygen volume = 50 cm³ ÷ 2 = 25 cm³.',
    hints: ['Remember the 2:1 stoichiometric volume ratio.', 'Hydrogen volume is double the Oxygen volume.', 'Divide 50 by 2.'],
  },
  {
    id: 'c_s2',
    nodeId: NODE_020,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'A water sample does NOT form lather with soap initially, but after BOILING and filtering, it lathers easily. What type of hardness was present?',
    options: ['Permanent Hardness only', 'Temporary Hardness only', 'Both Permanent and Non-ionic Hardness', 'Saline Salt Hardness'],
    correctIndex: 1,
    explanation: 'Boiling decomposes soluble bicarbonates into insoluble carbonates [Ca(HCO₃)₂ → CaCO₃↓ + H₂O + CO₂↑], removing temporary hardness.',
    hints: ['Boiling removes hardness caused by bicarbonates.', 'If boiling solved the issue completely, it was temporary.', 'Permanent hardness cannot be removed by simple boiling.'],
    misconceptionIndex: 5
  },
  {
    id: 'c_s3',
    nodeId: NODE_019,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'Which of the following acidic oxides reacts with water to form Sulfurous Acid (H₂SO₃)?',
    options: ['Sulfur Trioxide (SO₃)', 'Sulfur Dioxide (SO₂)', 'Carbon Monoxide (CO)', 'Nitric Oxide (NO)'],
    correctIndex: 1,
    explanation: 'SO₂ + H₂O → H₂SO₃ (Sulfurous acid). SO₃ reacts with water to form Sulfuric acid (H₂SO₄).',
    hints: ['Pay attention to oxidation state: sulfurous acid is H₂SO₃, not H₂SO₄.', 'Matching oxide formula: SO₂ gives H₂SO₃.', 'SO₃ gives H₂SO₄.'],
  },
  {
    id: 'c_s4',
    nodeId: NODE_017,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'Why does ice float on top of liquid water in lakes during harsh winter conditions?',
    options: ['Air bubbles are trapped inside ice making it heavy', 'Ice has an open cage-like crystal structure due to hydrogen bonding, making its density lower than water at 0°C', 'Liquid water pushes ice upward due to magnetic forces', 'Ice contains high amounts of dissolved salt'],
    correctIndex: 1,
    explanation: 'Below 4°C, water molecules organize into a hexagonal crystal lattice with tetrahedral hydrogen bonds, creating empty space that expands volume and lowers density below 1.0 g/cm³.',
    hints: ['Think about molecular spacing in ice crystals vs liquid.', 'Hydrogen bonds hold H₂O molecules further apart in solid ice.', 'Lower density causes ice to float.'],
    misconceptionIndex: 0
  },
  {
    id: 'c_s5',
    nodeId: NODE_020,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'Which chemical reagent is added to permanently hard water containing MgSO₄ to precipitate out Magnesium ions as carbonate?',
    options: ['Sodium Chloride (NaCl)', 'Washing Soda (Na₂CO₃)', 'Hydrochloric Acid (HCl)', 'Copper Sulfate (CuSO₄)'],
    correctIndex: 1,
    explanation: 'Na₂CO₃ + MgSO₄ → MgCO₃↓ + Na₂SO₄. Washing soda precipitates dissolved Mg²⁺ and Ca²⁺ ions as insoluble carbonates.',
    hints: ['It is commonly known as Washing Soda.', 'It supplies Carbonate ions (CO₃²⁻).', 'Formula is Na₂CO₃.'],
  },
  {
    id: 'c_s6',
    nodeId: NODE_017,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'Calculate the percentage by mass of Hydrogen in a pure water molecule (H₂O). (Atomic masses: H = 1, O = 16)',
    correctAnswer: 11.11,
    tolerance: 0.2,
    explanation: 'Molar mass of H₂O = (2 × 1) + 16 = 18 g/mol. % Hydrogen = (2 / 18) × 100 = 11.11%.',
    hints: ['Total mass of H₂O = 18.', 'Mass of 2 Hydrogen atoms = 2.', 'Percentage = (2 / 18) * 100.'],
  },
  {
    id: 'c_s7',
    nodeId: NODE_019,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'When steam is passed over RED-HOT IRON filings, what solid product and gas are formed?',
    options: ['FeO and Oxygen gas', 'Fe₂O₃ and Hydrogen gas', 'Fe₃O₄ (Ferroso-ferric oxide) and Hydrogen gas', 'FeOH and Carbon dioxide'],
    correctIndex: 2,
    explanation: '3Fe + 4H₂O (steam) ⇌ Fe₃O₄ + 4H₂↑. Reversible reaction yielding magnetic oxide of iron (Fe₃O₄) and hydrogen gas.',
    hints: ['Iron forms mixed oxide Fe₃O₄ (triferric tetroxide / ferroso-ferric oxide).', 'Hydrogen gas is liberated.', '3Fe + 4H₂O → Fe₃O₄ + 4H₂.'],
  },
  {
    id: 'c_s8',
    nodeId: NODE_020,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Understanding',
    question: 'In an ion-exchange resin softner, synthetic cation exchange resins replace Ca²⁺ and Mg²⁺ ions in hard water with which harmless ions?',
    options: ['Heavy Lead ions (Pb²⁺)', 'Sodium ions (Na⁺) or Hydrogen ions (H⁺)', 'Chloride ions (Cl⁻)', 'Sulfate ions (SO₄²⁻)'],
    correctIndex: 1,
    explanation: 'Cation exchange resins (R-Na or R-H) exchange their mobile Na⁺ or H⁺ cations for the divalent scale-forming Ca²⁺ and Mg²⁺ cations in hard water.',
    hints: ['Resins must release single positive cations to balance charge.', 'Common softening resins release Na⁺.', 'Sodium salts do not form soap scum.'],
  },

  // --- ADVANCED TIER (7 Questions) ---
  {
    id: 'c_a1',
    nodeId: NODE_018,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'During complete electrolysis of 36 grams of pure water (H₂O), what mass in grams of Oxygen gas (O₂) is generated at the anode? (H=1, O=16)',
    correctAnswer: 32,
    tolerance: 0.1,
    explanation: '2H₂O (36 g) → 2H₂ (4 g) + O₂ (32 g). 36 g of H₂O contains 32 g of Oxygen and 4 g of Hydrogen.',
    hints: ['Molar mass of H₂O = 18 g/mol. 36 g = 2 moles of H₂O.', '2 moles H₂O produces 1 mole O₂.', '1 mole O₂ = 32 grams.'],
  },
  {
    id: 'c_a2',
    nodeId: NODE_020,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'A 1-Liter hard water sample contains 0.162 grams of Calcium Bicarbonate [Ca(HCO₃)₂]. Express this hardness in parts per million (ppm) of CaCO₃ equivalent. (Molar mass Ca(HCO₃)₂ = 162 g/mol, CaCO₃ = 100 g/mol)',
    correctAnswer: 100,
    tolerance: 1.0,
    explanation: 'Moles of Ca(HCO₃)₂ = 0.162 / 162 = 0.001 mol. Equivalent mass of CaCO₃ = 0.001 mol × 100 g/mol = 0.100 g in 1 L (1000 g water). Hardness = (0.100 g / 1000 g) × 10⁶ = 100 ppm.',
    hints: ['Convert 0.162 g Ca(HCO₃)₂ to moles: 0.162 / 162 = 0.001 mol.', 'Multiply moles by molar mass of CaCO₃ (100 g/mol) = 0.100 g.', 'ppm = mg per Liter. 0.100 g = 100 mg/L = 100 ppm.'],
  },
  {
    id: 'c_a3',
    nodeId: NODE_019,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Synthesis',
    question: 'A student heats 25.0 g of hydrated Copper Sulfate crystals (CuSO₄·5H₂O) until all water of crystallization is driven off. What is the mass of the dry anhydrous CuSO₄ remaining? (Molar masses: CuSO₄ = 160 g/mol, H₂O = 18 g/mol, hydrate = 250 g/mol)',
    options: ['16.0 g', '9.0 g', '20.0 g', '12.5 g'],
    correctIndex: 0,
    explanation: 'Hydrate mass fraction of CuSO₄ = 160 / 250 = 0.64. Anhydrous mass = 25.0 g × 0.64 = 16.0 g. (Loss of 5H₂O = 9.0 g).',
    hints: ['CuSO₄ fraction in hydrate is 160 / (160 + 5×18) = 160 / 250 = 64%.', 'Multiply 25.0 g by 0.64.', '25.0 × 0.64 = 16.0 g.'],
  },
  {
    id: 'c_a4',
    nodeId: NODE_017,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'Why does a high specific heat capacity of water (4.184 J/g°C) play a vital ecological role on Earth?',
    options: ['It causes water to freeze instantly when temperature drops', 'It enables oceans to absorb massive thermal energy with minimal temperature fluctuation, moderating planetary climate', 'It makes water decompose into H₂ and O₂ under sunlight', 'It prevents salt from dissolving in sea water'],
    correctIndex: 1,
    explanation: 'Water requires significant thermal energy to change temperature due to extensive hydrogen bonding. This high specific heat capacity acts as a global thermal buffer.',
    hints: ['Specific heat measures energy needed to raise temperature.', 'High specific heat means slow temperature change.', 'Oceans store thermal energy and stabilize Earth climate.'],
  },
  {
    id: 'c_a5',
    nodeId: NODE_019,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Synthesis',
    question: 'Which sequence of reactions represents the industrial production of Nitric Acid from Nitrogen Oxide non-metallic oxides and water?',
    options: ['N₂ + H₂O → NH₃ + O₂', '2NO₂ + H₂O → HNO₂ + HNO₃, followed by 3HNO₂ → HNO₃ + 2NO + H₂O', 'NaNO₃ + H₂O → NaOH + HNO₃', 'N₂O + H₂O → 2HNO'],
    correctIndex: 1,
    explanation: 'Nitrogen dioxide (NO₂) dissolves in water forming nitrous and nitric acids; nitrous acid decomposes further to yield concentrated nitric acid and NO gas.',
    hints: ['NO₂ is an acidic oxide anhydride.', 'It dissolves in water forming a mixture of HNO₂ and HNO₃.', 'Option containing 2NO₂ + H₂O → HNO₂ + HNO₃.'],
  },
  {
    id: 'c_a6',
    nodeId: NODE_020,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'Permutit process uses artificial Zeolite (Sodium Aluminum Silicate, Na₂Al₂Si₂O₈·xH₂O) for water softening. How is exhausted Permutit resin REGENERATED after long use?',
    options: ['By washing with concentrated Sulfuric Acid', 'By boiling in pure distilled water for 5 hours', 'By soaking in a concentrated 10% Sodium Chloride (brine) solution', 'By treating with Chlorine gas'],
    correctIndex: 2,
    explanation: 'Exhausted zeolite (Ca-Zeolite) is treated with concentrated NaCl (brine), forcing high concentration Na⁺ ions to displace Ca²⁺ ions and restore Na-Zeolite.',
    hints: ['Regeneration requires supplying abundant Na⁺ ions.', 'Common table salt solution is used.', 'Brine (10% NaCl) reloads the resin.'],
  },
  {
    id: 'c_a7',
    nodeId: NODE_018,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Synthesis',
    question: 'In a modified electrolysis experiment using pure Copper electrodes instead of Platinum/Carbon in dilute H₂SO₄, what happens at the ANODE?',
    options: ['Oxygen gas evolves normally', 'Copper anode oxidizes and dissolves into solution as Cu²⁺ ions (Cu → Cu²⁺ + 2e⁻)', 'Hydrogen gas evolves at the anode', 'Copper oxide powder precipitates instantly'],
    correctIndex: 1,
    explanation: 'Active metallic copper anodes oxidize preferentially over hydroxide/sulfate ions, dissolving into solution: Cu(s) → Cu²⁺(aq) + 2e⁻.',
    hints: ['Copper is an active electrode, not inert like platinum.', 'Active anodes oxidize themselves.', 'The copper electrode dissolves as Cu²⁺.'],
  },
];

// --- CUSTOM SVG DIAGRAM COMPONENTS ---

// Diagram 1: Anomalous Density & Water Molecule Polar Structure
const AnomalousExpansionSVG: React.FC<{ temp: number }> = ({ temp }) => {
  // Density curve approximation
  const points = [];
  for (let t = -5; t <= 15; t += 0.5) {
    let d = 0;
    if (t < 0) {
      d = 0.917; // Ice
    } else {
      // Peak at 4°C
      d = 1.0 - Math.pow(t - 4, 2) * 0.00015;
    }
    const x = 50 + (t + 5) * 15;
    const y = 200 - (d - 0.90) * 1200;
    points.push(`${x},${y}`);
  }

  const currentX = 50 + (temp + 5) * 15;
  const currentDensity = temp < 0 ? 0.917 : 1.0 - Math.pow(temp - 4, 2) * 0.00015;
  const currentY = 200 - (currentDensity - 0.90) * 1200;

  return (
    <svg viewBox="0 0 400 240" className="w-full h-auto bg-slate-900 rounded-lg p-2 border border-slate-700 shadow-inner">
      <defs>
        <linearGradient id="gridGlow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#0284c7" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      {/* Title */}
      <text x="200" y="20" fill="#38bdf8" textAnchor="middle" className="text-xs font-bold tracking-widest uppercase">
        Water Anomalous Thermal Expansion & Density Curve
      </text>

      {/* Axes */}
      <line x1="40" y1="210" x2="380" y2="210" stroke="#64748b" strokeWidth="2" />
      <line x1="40" y1="30" x2="40" y2="210" stroke="#64748b" strokeWidth="2" />

      {/* Axis Labels */}
      <text x="210" y="235" fill="#94a3b8" className="text-[10px]" textAnchor="middle">Temperature (°C)</text>
      <text x="15" y="120" fill="#94a3b8" className="text-[10px]" textAnchor="middle" transform="rotate(-90 15 120)">Density (g/cm³)</text>

      {/* Curve */}
      <polyline fill="none" stroke="#0ea5e9" strokeWidth="3" points={points.join(' ')} />

      {/* Peak marker at 4°C */}
      <line x1="185" y1="30" x2="185" y2="210" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4 4" />
      <text x="185" y="45" fill="#f59e0b" className="text-[9px] font-bold" textAnchor="middle">Max Density at 4°C (1.000 g/cm³)</text>

      {/* Current point tracking indicator */}
      <circle cx={currentX} cy={currentY} r="6" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
      <text x={currentX > 300 ? currentX - 50 : currentX + 10} y={currentY - 10} fill="#f87171" className="text-[10px] font-mono font-bold">
        {temp}°C: {currentDensity.toFixed(4)} g/cm³
      </text>

      {/* Temp markings */}
      {[-5, 0, 4, 10, 15].map((t) => (
        <g key={t} transform={`translate(${50 + (t + 5) * 15}, 210)`}>
          <line y2="5" stroke="#64748b" strokeWidth="1.5" />
          <text y="16" fill="#cbd5e1" className="text-[9px]" textAnchor="middle">{t}°C</text>
        </g>
      ))}
    </svg>
  );
};

// Diagram 2: Hofmann Voltameter Electrolysis Apparatus
const HofmannVoltameterSVG: React.FC<{ h2Vol: number; o2Vol: number; isRunning: boolean }> = ({ h2Vol, o2Vol, isRunning }) => {
  const maxCap = 50; // max cm3
  const h2Height = (h2Vol / maxCap) * 110;
  const o2Height = (o2Vol / maxCap) * 110;

  return (
    <svg viewBox="0 0 400 300" className="w-full h-auto bg-slate-950 rounded-lg p-2 border border-slate-800 shadow-2xl">
      <defs>
        <radialGradient id="bubbleGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#38bdf8" />
        </radialGradient>
      </defs>

      <text x="200" y="22" fill="#e2e8f0" textAnchor="middle" className="text-xs font-bold uppercase tracking-wider">
        Hofmann Voltameter (Water Electrolysis)
      </text>

      {/* Voltameter Glass Outer Frame */}
      {/* Left Tube (Cathode H2) */}
      <rect x="90" y="50" width="40" height="180" rx="5" fill="#1e293b" stroke="#475569" strokeWidth="3" />
      {/* Right Tube (Anode O2) */}
      <rect x="270" y="50" width="40" height="180" rx="5" fill="#1e293b" stroke="#475569" strokeWidth="3" />
      {/* Central Reservoir Tube */}
      <rect x="180" y="40" width="40" height="190" rx="5" fill="#1e293b" stroke="#475569" strokeWidth="3" />
      {/* Connecting Bottom Tube */}
      <rect x="90" y="200" width="220" height="30" rx="3" fill="#1e293b" stroke="#475569" strokeWidth="3" />

      {/* Acidified Water Fluid (Blue Tint) */}
      {/* Left Liquid */}
      <rect x="93" y={53 + h2Height} width="34" height={174 - h2Height} fill="#0284c7" opacity="0.65" />
      {/* Right Liquid */}
      <rect x="273" y={53 + o2Height} width="34" height={174 - o2Height} fill="#0284c7" opacity="0.65" />
      {/* Central Liquid */}
      <rect x="183" y="43" width="34" height={184} fill="#0284c7" opacity="0.65" />
      {/* Bottom Liquid */}
      <rect x="93" y="203" width="214" height="24" fill="#0284c7" opacity="0.65" />

      {/* Gas Collection Spaces */}
      {/* H2 Gas Space */}
      <rect x="93" y="53" width="34" height={h2Height} fill="#38bdf8" opacity="0.25" />
      {/* O2 Gas Space */}
      <rect x="273" y="53" width="34" height={o2Height} fill="#e0f2fe" opacity="0.25" />

      {/* Electrodes */}
      {/* Cathode Platinum Foil (-) */}
      <rect x="105" y="180" width="10" height="35" fill="#94a3b8" stroke="#f1f5f9" strokeWidth="1" />
      {/* Anode Platinum Foil (+) */}
      <rect x="285" y="180" width="10" height="35" fill="#94a3b8" stroke="#f1f5f9" strokeWidth="1" />

      {/* Animated Bubbles */}
      {isRunning && (
        <g>
          {/* Cathode H2 bubbles (More rapid, 2x ratio) */}
          <circle cx="107" cy="170" r="3" fill="url(#bubbleGlow)" className="animate-ping" />
          <circle cx="113" cy="150" r="4" fill="url(#bubbleGlow)" className="animate-bounce" />
          <circle cx="109" cy="120" r="3" fill="url(#bubbleGlow)" />
          {/* Anode O2 bubbles */}
          <circle cx="288" cy="165" r="3.5" fill="url(#bubbleGlow)" className="animate-ping" />
          <circle cx="292" cy="135" r="3" fill="url(#bubbleGlow)" />
        </g>
      )}

      {/* Circuit Wiring */}
      <path d="M 110 215 L 110 260 L 160 260" stroke="#ef4444" strokeWidth="3" fill="none" />
      <path d="M 290 215 L 290 260 L 240 260" stroke="#22c55e" strokeWidth="3" fill="none" />
      {/* DC Battery Symbol */}
      <rect x="160" y="248" width="80" height="24" rx="4" fill="#0f172a" stroke="#64748b" strokeWidth="2" />
      <text x="200" y="264" fill="#f87171" className="text-[11px] font-bold" textAnchor="middle">
        DC POWER [CATHODE (-) | ANODE (+)]
      </text>

      {/* Labels & Dynamic Gas Volumes */}
      <g transform="translate(60, 100)">
        <text x="25" y="-10" fill="#38bdf8" className="text-[11px] font-bold" textAnchor="end">CATHODE (-)</text>
        <text x="25" y="10" fill="#67e8f9" className="text-[12px] font-mono font-bold" textAnchor="end">H₂: {h2Vol.toFixed(1)} cm³</text>
      </g>
      <g transform="translate(340, 100)">
        <text x="-25" y="-10" fill="#4ade80" className="text-[11px] font-bold" textAnchor="start">ANODE (+)</text>
        <text x="-25" y="10" fill="#86efac" className="text-[12px] font-mono font-bold" textAnchor="start">O₂: {o2Vol.toFixed(1)} cm³</text>
      </g>

      {/* Stoichiometric Ratio Tag */}
      <rect x="130" y="275" width="140" height="20" rx="10" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1" />
      <text x="200" y="289" fill="#a5b4fc" className="text-[10px] font-bold tracking-wider" textAnchor="middle">
        VOLUMETRIC RATIO (H₂ : O₂) = 2 : 1
      </text>
    </svg>
  );
};

// Diagram 3: Chemical Reactivity & pH Indicator Lab Visualizer
const ReactivityLabSVG: React.FC<{ reactionType: string; ph: number; gasEvolved: string }> = ({ reactionType, ph, gasEvolved }) => {
  // Determine solution color based on pH
  const getPhColor = (val: number) => {
    if (val < 3) return '#ef4444'; // strong acid
    if (val < 6) return '#f97316'; // weak acid
    if (val === 7) return '#22c55e'; // neutral
    if (val < 11) return '#3b82f6'; // weak base
    return '#8b5cf6'; // strong base
  };

  return (
    <svg viewBox="0 0 400 240" className="w-full h-auto bg-slate-900 rounded-lg p-2 border border-slate-800 shadow-lg">
      <text x="200" y="20" fill="#f3f4f6" textAnchor="middle" className="text-xs font-bold uppercase tracking-wider">
        Chemical Reaction & Universal Indicator Visualizer
      </text>

      {/* Reaction Flask */}
      <path d="M 170 60 L 230 60 L 240 100 L 290 190 A 20 20 0 0 1 270 210 L 130 210 A 20 20 0 0 1 110 190 L 160 100 Z"
            fill="#1e293b" stroke="#64748b" strokeWidth="3" />

      {/* Liquid Contents */}
      <path d="M 140 160 L 260 160 L 285 195 A 10 10 0 0 1 270 208 L 130 208 A 10 10 0 0 1 115 195 Z"
            fill={getPhColor(ph)} opacity="0.75" />

      {/* Bubbles / Reactant Particles */}
      {gasEvolved !== 'None' && (
        <g className="animate-pulse">
          <circle cx="180" cy="140" r="6" fill="#ffffff" opacity="0.8" />
          <circle cx="220" cy="120" r="8" fill="#ffffff" opacity="0.8" />
          <circle cx="200" cy="90" r="5" fill="#ffffff" opacity="0.8" />
          <text x="200" y="75" fill="#fbbf24" className="text-[11px] font-bold" textAnchor="middle">
            {gasEvolved} ↑
          </text>
        </g>
      )}

      {/* pH Meter Display */}
      <rect x="20" y="40" width="110" height="70" rx="6" fill="#0f172a" stroke="#334155" strokeWidth="2" />
      <text x="75" y="60" fill="#94a3b8" className="text-[10px]" textAnchor="middle">pH MONITOR</text>
      <text x="75" y="88" fill={getPhColor(ph)} className="text-xl font-mono font-bold" textAnchor="middle">
        {ph.toFixed(1)}
      </text>
      <text x="75" y="103" fill="#cbd5e1" className="text-[9px]" textAnchor="middle">
        {ph < 7 ? 'ACIDIC' : ph > 7 ? 'ALKALINE / BASIC' : 'NEUTRAL'}
      </text>

      {/* Reaction Summary Box */}
      <rect x="260" y="40" width="125" height="120" rx="6" fill="#0f172a" stroke="#334155" strokeWidth="2" />
      <text x="322" y="58" fill="#38bdf8" className="text-[10px] font-bold" textAnchor="middle">ACTIVE SYSTEM</text>
      <text x="322" y="80" fill="#e2e8f0" className="text-[11px] font-semibold" textAnchor="middle">{reactionType}</text>
      <line x1="270" y1="90" x2="375" y2="90" stroke="#334155" strokeWidth="1" />
      <text x="270" y="110" fill="#94a3b8" className="text-[9px]">Gas: <tspan fill="#f59e0b" className="font-bold">{gasEvolved}</tspan></text>
      <text x="270" y="130" fill="#94a3b8" className="text-[9px]">Indicator: <tspan fill={getPhColor(ph)} className="font-bold">{ph < 6 ? 'Red/Orange' : ph > 8 ? 'Blue/Violet' : 'Green'}</tspan></text>
    </svg>
  );
};

// Diagram 4: Ion-Exchange Water Softening Column
const IonExchangeColumnSVG: React.FC<{ isSoftened: boolean; mode: string }> = ({ isSoftened, mode }) => {
  return (
    <svg viewBox="0 0 400 240" className="w-full h-auto bg-slate-950 rounded-lg p-2 border border-slate-800 shadow-xl">
      <text x="200" y="20" fill="#38bdf8" textAnchor="middle" className="text-xs font-bold uppercase tracking-wider">
        Industrial Synthetic Ion-Exchange Resin Column
      </text>

      {/* Column Tube */}
      <rect x="150" y="40" width="100" height="160" rx="8" fill="#1e293b" stroke="#475569" strokeWidth="3" />

      {/* Resin Bed Particles */}
      <g>
        {Array.from({ length: 24 }).map((_, i) => {
          const cx = 165 + (i % 5) * 18;
          const cy = 70 + Math.floor(i / 5) * 22;
          return (
            <circle key={i} cx={cx} cy={cy} r="7" fill="#f59e0b" stroke="#b45309" strokeWidth="1.5" />
          );
        })}
      </g>

      {/* Inflow Water (Top) */}
      <path d="M 200 15 L 200 40" stroke="#38bdf8" strokeWidth="4" markerEnd="url(#arrow)" />
      <text x="200" y="12" fill="#94a3b8" className="text-[9px] font-bold" textAnchor="middle">INFLOW (Hard Water: Ca²⁺, Mg²⁺)</text>

      {/* Outflow Water (Bottom) */}
      <path d="M 200 200 L 200 225" stroke={isSoftened ? "#4ade80" : "#f87171"} strokeWidth="4" />
      <text x="200" y="236" fill={isSoftened ? "#4ade80" : "#f87171"} className="text-[10px] font-bold" textAnchor="middle">
        OUTFLOW ({isSoftened ? 'SOFTENED WATER (Na⁺)' : 'UNTREATED HARD WATER'})
      </text>

      {/* Mode Tag */}
      <rect x="15" y="40" width="120" height="70" rx="6" fill="#0f172a" stroke="#334155" opacity="0.9" />
      <text x="75" y="58" fill="#a5b4fc" className="text-[10px] font-bold" textAnchor="middle">TREATMENT METHOD</text>
      <text x="75" y="80" fill="#ffffff" className="text-[11px] font-bold" textAnchor="middle">{mode}</text>
      <text x="75" y="98" fill="#38bdf8" className="text-[9px]" textAnchor="middle">{isSoftened ? 'Hardness Removed' : 'High Hardness'}</text>

      {/* Chemical Exchange Equation Note */}
      <rect x="265" y="40" width="120" height="90" rx="6" fill="#0f172a" stroke="#334155" opacity="0.9" />
      <text x="325" y="58" fill="#fbbf24" className="text-[9px] font-bold" textAnchor="middle">RESIN MECHANISM</text>
      <text x="325" y="76" fill="#cbd5e1" className="text-[8px]" textAnchor="middle">R-Na₂ + Ca²⁺ →</text>
      <text x="325" y="90" fill="#cbd5e1" className="text-[8px]" textAnchor="middle">R-Ca + 2Na⁺</text>
      <text x="325" y="112" fill="#4ade80" className="text-[8px] font-semibold" textAnchor="middle">No Scale Formation</text>
    </svg>
  );
};

// --- MAIN COMPONENT ---
export const C8_ChemistryWaterpropertiesandcompositionSim: React.FC<DefaultProps> = ({
  onComplete,
  initialNodeId = NODE_017
}) => {
  // Navigation & Tab State
  const [activeTab, setActiveTab] = useState<'scenario' | 'discovery' | 'exploration' | 'challenges' | 'summary'>('scenario');

  // Discovery State
  const [selectedDiscoveryOpt, setSelectedDiscoveryOpt] = useState<number | null>(null);
  const [discoverySubmitted, setDiscoverySubmitted] = useState<boolean>(false);

  // Exploration Lab States
  const [activeLabIndex, setActiveLabIndex] = useState<number>(0);
  // Lab 1: Temp & Density
  const [labTemp, setLabTemp] = useState<number>(4);
  // Lab 2: Electrolysis
  const [voltameterVoltage, setVoltameterVoltage] = useState<number>(12);
  const [electrolysisTime, setElectrolysisTime] = useState<number>(0);
  const [isElectrolysisRunning, setIsElectrolysisRunning] = useState<boolean>(false);
  // Lab 3: Chemical Reactivity
  const [selectedReactant, setSelectedReactant] = useState<string>('Na');
  // Lab 4: Water Hardness & Softening
  const [waterSampleType, setWaterSampleType] = useState<'distilled' | 'tempHard' | 'permHard'>('tempHard');
  const [softeningMethod, setSofteningMethod] = useState<'none' | 'boiling' | 'washingSoda' | 'ionExchange'>('none');
  // Lab 5: Molecular Model Dipole Angle
  const [moleculeAngle, setMoleculeAngle] = useState<number>(104.5);

  // Prediction & Observation QA States
  const [predictionAnswers, setPredictionAnswers] = useState<(number | null)[]>([null, null]);
  const [predictionSubmitted, setPredictionSubmitted] = useState<boolean[]>([false, false]);
  const [observationAnswers, setObservationAnswers] = useState<(number | null)[]>([null, null]);
  const [observationSubmitted, setObservationSubmitted] = useState<boolean[]>([false, false]);

  // Challenges Engine State
  const [currentChallengeIdx, setCurrentChallengeIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [numericAnswer, setNumericAnswer] = useState<string>('');
  const [challengeFeedback, setChallengeFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);
  const [challengeCompleted, setChallengeCompleted] = useState<boolean[]>(new Array(CHALLENGES.length).fill(false));
  const [hintLevel, setHintLevel] = useState<number>(0);

  // Engine Feedback Effects
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [sparklePos, setSparklePos] = useState<{ x: number; y: number }>({ x: 400, y: 300 });

  // BKT & Spaced Repetition Mastery Store
  const [bktStates, setBktStates] = useState<Record<NodeId, BKTState>>(() => {
    const initial: Record<string, BKTState> = {};
    ALL_NODE_IDS.forEach((node) => {
      initial[node] = createBKTState();
    });
    return initial as Record<NodeId, BKTState>;
  });

  const [srsItems, setSrsItems] = useState<Record<string, SRSItem>>(() => {
    const initial: Record<string, SRSItem> = {};
    CHALLENGES.forEach((c) => {
      initial[c.id] = createReviewItem(c.id);
    });
    return initial;
  });

  // Inactivity Hint Timer (Auto hint after 10s)
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (activeTab === 'challenges' && hintLevel < 3) {
        audioManager.play('hint');
        speechManager.speak('Need a hint? Check the guided prompt on screen.');
      }
    }, 10000);
  }, [activeTab, hintLevel]);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [currentChallengeIdx, resetInactivityTimer]);

  // Electrolysis Animation Timer
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isElectrolysisRunning) {
      interval = setInterval(() => {
        setElectrolysisTime((prev) => prev + 0.2 * (voltameterVoltage / 12));
      }, 200);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isElectrolysisRunning, voltameterVoltage]);

  // Derived Electrolysis Volumes
  const h2Volume = useMemo(() => Math.min(50, electrolysisTime * 1.0), [electrolysisTime]);
  const o2Volume = useMemo(() => Math.min(25, electrolysisTime * 0.5), [electrolysisTime]);

  // Reactivity Lab Parameters
  const getReactivityDetails = (reactant: string) => {
    switch (reactant) {
      case 'Na':
        return { ph: 13.0, gas: 'Hydrogen (H₂)', text: 'Vigorous exothermic reaction: 2Na + 2H₂O → 2NaOH + H₂↑' };
      case 'Ca':
        return { ph: 11.5, gas: 'Hydrogen (H₂)', text: 'Moderate reaction forming cloudy Lime Water: Ca + 2H₂O → Ca(OH)₂ + H₂↑' };
      case 'Fe':
        return { ph: 7.0, gas: 'Hydrogen (Steam only)', text: 'Reactivity only with red-hot steam: 3Fe + 4H₂O ⇌ Fe₃O₄ + 4H₂↑' };
      case 'CO2':
        return { ph: 5.5, gas: 'None', text: 'Dissolves to form weak unstable acid: CO₂ + H₂O ⇌ H₂CO₃ (Carbonic Acid)' };
      case 'SO2':
        return { ph: 3.0, gas: 'None', text: 'Forms acidic sulfurous acid solution: SO₂ + H₂O → H₂SO₃' };
      case 'CaO':
        return { ph: 12.5, gas: 'None', text: 'Slaking of quicklime with intense heat: CaO + H₂O → Ca(OH)₂' };
      default:
        return { ph: 7.0, gas: 'None', text: 'Neutral unreacted distilled water.' };
    }
  };
  const reactivityInfo = useMemo(() => getReactivityDetails(selectedReactant), [selectedReactant]);

  // Hardness & Lathering Calculation
  const isHardnessRemoved = useMemo(() => {
    if (waterSampleType === 'distilled') return true;
    if (waterSampleType === 'tempHard') {
      return softeningMethod === 'boiling' || softeningMethod === 'washingSoda' || softeningMethod === 'ionExchange';
    }
    if (waterSampleType === 'permHard') {
      return softeningMethod === 'washingSoda' || softeningMethod === 'ionExchange';
    }
    return false;
  }, [waterSampleType, softeningMethod]);

  // Handlers for Challenge Submission
  const handleChallengeSubmit = () => {
    const ch = CHALLENGES[currentChallengeIdx];
    let isCorrect = false;

    if (ch.type === 'multiple-choice') {
      isCorrect = selectedOption === ch.correctIndex;
    } else if (ch.type === 'numeric') {
      const val = parseFloat(numericAnswer);
      if (!isNaN(val) && ch.correctAnswer !== undefined) {
        const tol = ch.tolerance || 0.1;
        isCorrect = Math.abs(val - (ch.correctAnswer as number)) <= tol;
      }
    }

    // Update BKT & SRS
    const currentBkt = bktStates[ch.nodeId];
    const updatedBkt = bktUpdate(currentBkt, isCorrect);
    setBktStates((prev) => ({ ...prev, [ch.nodeId]: updatedBkt }));

    const currentSrs = srsItems[ch.id];
    const updatedSrs = sm2Update(currentSrs, isCorrect ? 5 : 1);
    setSrsItems((prev) => ({ ...prev, [ch.id]: updatedSrs }));

    if (isCorrect) {
      audioManager.play('drop-correct');
      speechManager.speak('Excellent work! Your chemical analysis is correct.');
      setChallengeFeedback({ isCorrect: true, text: `Correct! ${ch.explanation}` });
      setShowSparkle(true);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);

      const updatedComp = [...challengeCompleted];
      updatedComp[currentChallengeIdx] = true;
      setChallengeCompleted(updatedComp);

      // Check overall completion
      const completedCount = updatedComp.filter(Boolean).length;
      if (completedCount === CHALLENGES.length) {
        setShowConfetti(true);
        audioManager.play('celebration');
        const finalScore = Math.round((completedCount / CHALLENGES.length) * 100);
        recordGameScore('c8_chem_water_sim', finalScore);
        if (onComplete) onComplete(finalScore);
      }
    } else {
      audioManager.play('drop-wrong');
      speechManager.speak('That is not quite right. Review the hints or reaction equations.');
      setChallengeFeedback({ isCorrect: false, text: `Incorrect. ${ch.explanation}` });
    }
  };

  const handleNextChallenge = () => {
    setSelectedOption(null);
    setNumericAnswer('');
    setChallengeFeedback(null);
    setHintLevel(0);
    setCurrentChallengeIdx((prev) => (prev + 1) % CHALLENGES.length);
  };

  // Sound trigger helper for tab navigation
  const navigateTab = (tab: typeof activeTab) => {
    audioManager.play('whoosh');
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-sky-500 selection:text-white pb-12">
      {/* HEADER BAR */}
      <header className="bg-slate-900/90 border-b border-slate-800 backdrop-blur-md sticky top-0 z-40 px-4 py-3 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center font-bold text-lg text-white shadow-lg">
              H₂O
            </div>
            <div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-sky-400 to-indigo-300 bg-clip-text text-transparent">
                ICSE Class 8 Chemistry: Water Properties & Composition
              </h1>
              <p className="text-xs text-slate-400">Node Codes: c8_chem_017, c8_chem_018, c8_chem_019, c8_chem_020</p>
            </div>
          </div>

          {/* Tab Navigation */}
          <nav className="flex space-x-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => navigateTab('scenario')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${activeTab === 'scenario' ? 'bg-sky-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
            >
              Scenario
            </button>
            <button
              onClick={() => navigateTab('discovery')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${activeTab === 'discovery' ? 'bg-sky-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
            >
              Discovery
            </button>
            <button
              onClick={() => navigateTab('exploration')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${activeTab === 'exploration' ? 'bg-sky-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
            >
              Interactive Labs ({EXPLORATION_STEPS.length})
            </button>
            <button
              onClick={() => navigateTab('challenges')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${activeTab === 'challenges' ? 'bg-sky-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
            >
              Challenges ({CHALLENGES.length})
            </button>
            <button
              onClick={() => navigateTab('summary')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${activeTab === 'summary' ? 'bg-sky-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
            >
              Real World & Mastery
            </button>
          </nav>
        </div>
      </header>

      {/* FEEDBACK OVERLAYS */}
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccess} text="Challenge Solved Successfully!" />
      <SparkleBurst show={showSparkle} x={sparklePos.x} y={sparklePos.y} />

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 mt-6 flex-1 w-full">

        {/* --- TAB 1: SCENARIO --- */}
        {activeTab === 'scenario' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <span className="px-3 py-1 bg-sky-950 text-sky-400 border border-sky-800/60 rounded-full text-xs font-semibold uppercase tracking-wide">
                Lab Environment Overview
              </span>
              <h2 className="text-2xl font-bold text-white mt-2">{SCENARIO.title}</h2>
            </div>
            <p className="text-slate-300 leading-relaxed text-base">{SCENARIO.intro}</p>
            <p className="text-slate-400 leading-relaxed text-sm bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              <strong className="text-sky-400">Context: </strong>{SCENARIO.context}
            </p>

            {/* Topic Badges */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
              <div className="p-4 bg-slate-950/80 rounded-xl border border-sky-900/40">
                <div className="text-sky-400 font-bold text-sm mb-1">c8_chem_017</div>
                <div className="text-white font-semibold text-sm">Physical Properties</div>
                <p className="text-slate-400 text-xs mt-1">Anomalous density at 4°C, universal solvent action, high specific heat capacity.</p>
              </div>
              <div className="p-4 bg-slate-950/80 rounded-xl border border-indigo-900/40">
                <div className="text-indigo-400 font-bold text-sm mb-1">c8_chem_018</div>
                <div className="text-white font-semibold text-sm">Water Composition</div>
                <p className="text-slate-400 text-xs mt-1">Electrolysis volumetric 2:1 ratio (H₂:O₂), Hofmann voltameter, electrode reactions.</p>
              </div>
              <div className="p-4 bg-slate-950/80 rounded-xl border border-emerald-900/40">
                <div className="text-emerald-400 font-bold text-sm mb-1">c8_chem_019</div>
                <div className="text-white font-semibold text-sm">Chemical Reactions</div>
                <p className="text-slate-400 text-xs mt-1">Reaction with metals, acidic/basic oxides, hydrates & water of crystallization.</p>
              </div>
              <div className="p-4 bg-slate-950/80 rounded-xl border border-amber-900/40">
                <div className="text-amber-400 font-bold text-sm mb-1">c8_chem_020</div>
                <div className="text-white font-semibold text-sm">Hardness & Softening</div>
                <p className="text-slate-400 text-xs mt-1">Temporary vs permanent hardness, boiling, washing soda, ion-exchange resin.</p>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={() => navigateTab('discovery')}
                className="px-6 py-3 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-bold rounded-xl shadow-lg hover:brightness-110 transition-all"
              >
                Proceed to Discovery Challenge →
              </button>
            </div>
          </div>
        )}

        {/* --- TAB 2: DISCOVERY & PREDICTION --- */}
        {activeTab === 'discovery' && (
          <div className="space-y-6">
            {/* Core Discovery Question */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
                <span>⚡ Key Preconception Check</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{DISCOVERY_QUESTION.question}</h3>

              <div className="grid grid-cols-1 gap-3 mb-4">
                {DISCOVERY_QUESTION.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      audioManager.play('tap');
                      setSelectedDiscoveryOpt(idx);
                    }}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      selectedDiscoveryOpt === idx
                        ? 'bg-sky-950/80 border-sky-500 text-white ring-2 ring-sky-500/30'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="w-6 h-6 rounded-full bg-slate-800 text-slate-300 text-xs flex items-center justify-center font-bold">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{opt}</span>
                    </div>
                  </button>
                ))}
              </div>

              {!discoverySubmitted ? (
                <button
                  disabled={selectedDiscoveryOpt === null}
                  onClick={() => {
                    setDiscoverySubmitted(true);
                    if (selectedDiscoveryOpt === DISCOVERY_QUESTION.correctIndex) {
                      audioManager.play('sparkle');
                      speechManager.speak('Correct prediction! Water volume expands upon freezing while mass stays constant.');
                    } else {
                      audioManager.play('error');
                    }
                  }}
                  className="px-6 py-2.5 bg-sky-600 disabled:opacity-50 text-white font-bold rounded-xl hover:bg-sky-500 transition-all"
                >
                  Verify Discovery Answer
                </button>
              ) : (
                <div className={`p-4 rounded-xl border ${selectedDiscoveryOpt === DISCOVERY_QUESTION.correctIndex ? 'bg-emerald-950/60 border-emerald-800 text-emerald-200' : 'bg-amber-950/60 border-amber-800 text-amber-200'}`}>
                  <p className="font-bold text-sm mb-1">
                    {selectedDiscoveryOpt === DISCOVERY_QUESTION.correctIndex ? 'Correct Understanding!' : 'Surprising Insight!'}
                  </p>
                  <p className="text-xs leading-relaxed">{DISCOVERY_QUESTION.hintAfter}</p>
                </div>
              )}
            </div>

            {/* MANDATORY PREDICTION QUESTIONS SECTION */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
              <h3 className="text-lg font-bold text-sky-400 border-b border-slate-800 pb-2">
                Laboratory Hypothesis Predictions ({PREDICTION_QUESTIONS.length})
              </h3>
              {PREDICTION_QUESTIONS.map((pred, pIdx) => (
                <div key={pIdx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex justify-between items-center text-xs text-slate-400">
                    <span className="font-semibold text-slate-300">Prediction #{pIdx + 1}</span>
                    <span className="font-mono text-sky-400">{pred.nodeId}</span>
                  </div>
                  <p className="text-white text-sm font-medium">{pred.question}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {pred.options.map((opt, oIdx) => (
                      <button
                        key={oIdx}
                        onClick={() => {
                          audioManager.play('tap');
                          const updated = [...predictionAnswers];
                          updated[pIdx] = oIdx;
                          setPredictionAnswers(updated);
                        }}
                        className={`p-3 rounded-lg border text-xs text-left transition-all ${
                          predictionAnswers[pIdx] === oIdx
                            ? 'bg-indigo-950 border-indigo-500 text-white font-semibold'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>

                  {!predictionSubmitted[pIdx] ? (
                    <button
                      disabled={predictionAnswers[pIdx] === null}
                      onClick={() => {
                        const updated = [...predictionSubmitted];
                        updated[pIdx] = true;
                        setPredictionSubmitted(updated);
                        if (predictionAnswers[pIdx] === pred.correctIndex) {
                          audioManager.play('drop-correct');
                        } else {
                          audioManager.play('drop-wrong');
                        }
                      }}
                      className="px-4 py-1.5 bg-indigo-600 disabled:opacity-50 text-white text-xs font-bold rounded-lg hover:bg-indigo-500 transition-all"
                    >
                      Check Prediction #{pIdx + 1}
                    </button>
                  ) : (
                    <div className="text-xs p-3 rounded-lg bg-slate-900 border border-slate-700">
                      <p className={`font-bold ${predictionAnswers[pIdx] === pred.correctIndex ? 'text-emerald-400' : 'text-amber-400'}`}>
                        {predictionAnswers[pIdx] === pred.correctIndex ? 'Hypothesis Confirmed!' : 'Hypothesis Re-evaluated.'}
                      </p>
                      <p className="text-slate-400 mt-1">Verification method: {pred.verifyInstruction}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- TAB 3: EXPLORATION LABS --- */}
        {activeTab === 'exploration' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Exploration Selector Panel */}
            <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-3">
              <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-2">Select Interactive Lab</h3>
              {EXPLORATION_STEPS.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    audioManager.play('whoosh');
                    setActiveLabIndex(idx);
                  }}
                  className={`w-full p-3 rounded-xl border text-left transition-all ${
                    activeLabIndex === idx
                      ? 'bg-sky-950 border-sky-500 text-white shadow-lg'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-sky-400">{step.nodeId}</span>
                    <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-400">Lab {idx + 1}</span>
                  </div>
                  <p className="text-xs font-semibold text-white mt-1">{step.title}</p>
                </button>
              ))}

              {/* OBSERVATION QUESTIONS MANDATORY SECTION */}
              <div className="mt-6 pt-4 border-t border-slate-800 space-y-4">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">Lab Observations ({OBSERVATION_QUESTIONS.length})</h4>
                {OBSERVATION_QUESTIONS.map((obs, obIdx) => (
                  <div key={obIdx} className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
                    <p className="text-xs text-slate-300 font-medium">{obs.question}</p>
                    <div className="space-y-1">
                      {obs.observableOptions.map((opt, oIdx) => (
                        <button
                          key={oIdx}
                          onClick={() => {
                            audioManager.play('tap');
                            const updated = [...observationAnswers];
                            updated[obIdx] = oIdx;
                            setObservationAnswers(updated);
                          }}
                          className={`w-full p-2 text-left text-[11px] rounded border ${
                            observationAnswers[obIdx] === oIdx
                              ? 'bg-amber-950 border-amber-500 text-white font-semibold'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                    {!observationSubmitted[obIdx] ? (
                      <button
                        disabled={observationAnswers[obIdx] === null}
                        onClick={() => {
                          const updated = [...observationSubmitted];
                          updated[obIdx] = true;
                          setObservationSubmitted(updated);
                          if (observationAnswers[obIdx] === obs.correctIndex) {
                            audioManager.play('drop-correct');
                          } else {
                            audioManager.play('drop-wrong');
                          }
                        }}
                        className="w-full py-1 bg-amber-600 disabled:opacity-50 text-white text-[11px] font-bold rounded"
                      >
                        Submit Observation #{obIdx + 1}
                      </button>
                    ) : (
                      <p className={`text-[10px] font-bold ${observationAnswers[obIdx] === obs.correctIndex ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {observationAnswers[obIdx] === obs.correctIndex ? '✓ Correct Observation' : '✗ Needs Re-observation'}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Lab Visualizer Stage */}
            <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                  <h3 className="text-lg font-bold text-white">{EXPLORATION_STEPS[activeLabIndex].title}</h3>
                  <span className="px-3 py-1 bg-sky-950 text-sky-400 border border-sky-800 text-xs font-mono font-bold rounded-full">
                    {EXPLORATION_STEPS[activeLabIndex].nodeId}
                  </span>
                </div>
                <p className="text-xs text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800 mb-4">
                  {EXPLORATION_STEPS[activeLabIndex].instruction}
                </p>

                {/* LAB 1: Anomalous Density */}
                {activeLabIndex === 0 && (
                  <div className="space-y-4">
                    <AnomalousExpansionSVG temp={labTemp} />
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                      <div className="flex justify-between items-center text-xs font-semibold">
                        <span className="text-slate-400">Temperature Control: <strong className="text-sky-400">{labTemp}°C</strong></span>
                        <span className="text-amber-400">{labTemp === 4 ? '★ MAXIMUM DENSITY STATE (1.000 g/cm³)' : labTemp < 0 ? 'ICE CRYSTAL LATTICE' : 'LIQUID WATER'}</span>
                      </div>
                      <input
                        type="range"
                        min="-5"
                        max="15"
                        step="0.5"
                        value={labTemp}
                        onChange={(e) => {
                          audioManager.play('tap');
                          setLabTemp(parseFloat(e.target.value));
                        }}
                        className="w-full accent-sky-500 cursor-pointer"
                      />
                      <div className="text-[11px] text-slate-400 leading-normal">
                        <strong>Molecular Mechanism:</strong> Between 0°C and 4°C, hydrogen bonds contract open hexagonal ice cages into close-packed liquid clusters. Above 4°C, normal thermal expansion dominates.
                      </div>
                    </div>
                  </div>
                )}

                {/* LAB 2: Hofmann Voltameter Electrolysis */}
                {activeLabIndex === 1 && (
                  <div className="space-y-4">
                    <HofmannVoltameterSVG h2Vol={h2Volume} o2Vol={o2Volume} isRunning={isElectrolysisRunning} />
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => {
                            audioManager.play('pop');
                            setIsElectrolysisRunning(!isElectrolysisRunning);
                          }}
                          className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                            isElectrolysisRunning ? 'bg-amber-600 hover:bg-amber-500 text-white' : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                          }`}
                        >
                          {isElectrolysisRunning ? 'PAUSE CURRENT' : 'START ELECTROLYSIS'}
                        </button>
                        <button
                          onClick={() => {
                            audioManager.play('whoosh');
                            setIsElectrolysisRunning(false);
                            setElectrolysisTime(0);
                          }}
                          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl"
                        >
                          RESET CELL
                        </button>
                      </div>

                      <div className="flex items-center space-x-2 text-xs">
                        <span className="text-slate-400">Voltage:</span>
                        {[6, 12, 24].map((v) => (
                          <button
                            key={v}
                            onClick={() => {
                              audioManager.play('tap');
                              setVoltameterVoltage(v);
                            }}
                            className={`px-3 py-1 rounded text-xs font-mono font-bold ${
                              voltameterVoltage === v ? 'bg-sky-600 text-white' : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            {v}V
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* LAB 3: Chemical Reactivity & pH Indicator */}
                {activeLabIndex === 2 && (
                  <div className="space-y-4">
                    <ReactivityLabSVG reactionType={selectedReactant} ph={reactivityInfo.ph} gasEvolved={reactivityInfo.gas} />
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Select Reactant to Mix with H₂O:</span>
                      <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                        {['Na', 'Ca', 'Fe', 'CO2', 'SO2', 'CaO'].map((sub) => (
                          <button
                            key={sub}
                            onClick={() => {
                              audioManager.play('pop');
                              setSelectedReactant(sub);
                            }}
                            className={`p-2.5 rounded-xl border text-xs font-bold transition-all ${
                              selectedReactant === sub
                                ? 'bg-sky-600 border-sky-400 text-white ring-2 ring-sky-400/30'
                                : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                            }`}
                          >
                            {sub}
                          </button>
                        ))}
                      </div>
                      <p className="text-xs text-slate-300 font-mono bg-slate-900 p-3 rounded-lg border border-slate-800">
                        {reactivityInfo.text}
                      </p>
                    </div>
                  </div>
                )}

                {/* LAB 4: Water Hardness & Softening */}
                {activeLabIndex === 3 && (
                  <div className="space-y-4">
                    <IonExchangeColumnSVG isSoftened={isHardnessRemoved} mode={softeningMethod.toUpperCase()} />
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <span className="text-xs font-bold text-slate-400 uppercase">1. Water Sample:</span>
                        <div className="flex flex-col gap-2 mt-2">
                          {[
                            { id: 'distilled', label: 'Distilled Soft Water (Pure H₂O)' },
                            { id: 'tempHard', label: 'Temporary Hard Water [Ca(HCO₃)₂]' },
                            { id: 'permHard', label: 'Permanent Hard Water [MgSO₄]' }
                          ].map((samp) => (
                            <button
                              key={samp.id}
                              onClick={() => {
                                audioManager.play('tap');
                                setWaterSampleType(samp.id as typeof waterSampleType);
                              }}
                              className={`p-2 rounded text-xs text-left border ${
                                waterSampleType === samp.id ? 'bg-sky-950 border-sky-500 text-sky-200 font-bold' : 'bg-slate-900 border-slate-800 text-slate-400'
                              }`}
                            >
                              {samp.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <span className="text-xs font-bold text-slate-400 uppercase">2. Softening Treatment:</span>
                        <div className="flex flex-col gap-2 mt-2">
                          {[
                            { id: 'none', label: 'Untreated (Raw)' },
                            { id: 'boiling', label: 'Thermal Boiling' },
                            { id: 'washingSoda', label: 'Washing Soda (Na₂CO₃)' },
                            { id: 'ionExchange', label: 'Synthetic Ion-Exchange Resin' }
                          ].map((m) => (
                            <button
                              key={m.id}
                              onClick={() => {
                                audioManager.play('tap');
                                setSofteningMethod(m.id as typeof softeningMethod);
                              }}
                              className={`p-2 rounded text-xs text-left border ${
                                softeningMethod === m.id ? 'bg-indigo-950 border-indigo-500 text-indigo-200 font-bold' : 'bg-slate-900 border-slate-800 text-slate-400'
                              }`}
                            >
                              {m.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* LAB 5: Molecular Model Dipole Angle */}
                {activeLabIndex === 4 && (
                  <div className="space-y-4">
                    <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex flex-col items-center justify-center">
                      <svg viewBox="0 0 300 200" className="w-64 h-44">
                        {/* Oxygen Atom */}
                        <circle cx="150" cy="80" r="32" fill="#ef4444" stroke="#dc2626" strokeWidth="3" />
                        <text x="150" y="85" fill="#ffffff" className="text-sm font-bold" textAnchor="middle">O (δ⁻)</text>

                        {/* Hydrogen Atoms */}
                        {/* Left H */}
                        <line x1="150" y1="80" x2="80" y2="150" stroke="#94a3b8" strokeWidth="6" />
                        <circle cx="80" cy="150" r="20" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
                        <text x="80" y="154" fill="#ffffff" className="text-xs font-bold" textAnchor="middle">H (δ⁺)</text>

                        {/* Right H */}
                        <line x1="150" y1="80" x2="220" y2="150" stroke="#94a3b8" strokeWidth="6" />
                        <circle cx="220" cy="150" r="20" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
                        <text x="220" y="154" fill="#ffffff" className="text-xs font-bold" textAnchor="middle">H (δ⁺)</text>

                        {/* Bond Angle Arc */}
                        <path d="M 110 110 A 45 45 0 0 1 190 110" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 3" />
                        <text x="150" y="130" fill="#f59e0b" className="text-xs font-bold" textAnchor="middle">
                          {moleculeAngle}°
                        </text>
                      </svg>
                      <div className="mt-4 text-center space-y-2">
                        <span className="text-xs font-bold text-slate-300">Bend Angle: 104.5° (sp³ hybridization with 2 lone pairs)</span>
                        <p className="text-[11px] text-slate-400 max-w-md">
                          The bent molecular geometry and strong electronegativity difference between Oxygen and Hydrogen give water its strong polar dipole moment, making it the universal solvent.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* --- TAB 4: CHALLENGES (22 QUESTIONS) --- */}
        {activeTab === 'challenges' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
            {/* Challenge Progress Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                    CHALLENGES[currentChallengeIdx].difficulty === 'foundation' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                    CHALLENGES[currentChallengeIdx].difficulty === 'standard' ? 'bg-sky-950 text-sky-400 border border-sky-800' :
                    'bg-purple-950 text-purple-400 border border-purple-800'
                  }`}>
                    {CHALLENGES[currentChallengeIdx].difficulty} Tier
                  </span>
                  <span className="text-xs text-slate-400">Node: <strong className="text-slate-200">{CHALLENGES[currentChallengeIdx].nodeId}</strong></span>
                  <span className="text-xs text-slate-400">| Competency: <strong className="text-slate-200">{CHALLENGES[currentChallengeIdx].competencyLevel}</strong></span>
                </div>
                <h3 className="text-lg font-bold text-white mt-1">
                  Challenge {currentChallengeIdx + 1} of {CHALLENGES.length}
                </h3>
              </div>

              {/* Progress Dots */}
              <div className="flex items-center space-x-1 flex-wrap max-w-xs">
                {CHALLENGES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      audioManager.play('tap');
                      setCurrentChallengeIdx(i);
                      setSelectedOption(null);
                      setNumericAnswer('');
                      setChallengeFeedback(null);
                      setHintLevel(0);
                    }}
                    className={`w-4 h-4 rounded-full text-[9px] font-mono flex items-center justify-center transition-all ${
                      i === currentChallengeIdx
                        ? 'bg-sky-500 text-white ring-2 ring-sky-400 scale-110'
                        : challengeCompleted[i]
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-800 text-slate-500 hover:bg-slate-700'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Question Box */}
            <div className="space-y-4">
              <p className="text-white text-base font-semibold leading-relaxed">
                {CHALLENGES[currentChallengeIdx].question}
              </p>

              {/* Multiple Choice Options */}
              {CHALLENGES[currentChallengeIdx].type === 'multiple-choice' && (
                <div className="grid grid-cols-1 gap-3">
                  {CHALLENGES[currentChallengeIdx].options?.map((opt, oIdx) => (
                    <button
                      key={oIdx}
                      onClick={() => {
                        audioManager.play('tap');
                        setSelectedOption(oIdx);
                      }}
                      className={`p-4 rounded-xl border text-left text-sm transition-all ${
                        selectedOption === oIdx
                          ? 'bg-sky-950 border-sky-500 text-white ring-2 ring-sky-500/30 font-medium'
                          : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="w-6 h-6 rounded-full bg-slate-800 text-slate-400 text-xs flex items-center justify-center font-bold">
                          {String.fromCharCode(65 + oIdx)}
                        </span>
                        <span>{opt}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Numeric Input */}
              {CHALLENGES[currentChallengeIdx].type === 'numeric' && (
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                  <label className="text-xs text-slate-400 font-semibold block">Enter Calculated Answer:</label>
                  <input
                    type="number"
                    step="any"
                    value={numericAnswer}
                    onChange={(e) => setNumericAnswer(e.target.value)}
                    placeholder="Type numeric value..."
                    className="w-full max-w-xs bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white font-mono text-base focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none"
                  />
                </div>
              )}

              {/* Action Buttons & Feedback */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex items-center space-x-2">
                  <button
                    disabled={selectedOption === null && numericAnswer.trim() === ''}
                    onClick={handleChallengeSubmit}
                    className="px-6 py-2.5 bg-sky-600 disabled:opacity-40 text-white font-bold rounded-xl hover:bg-sky-500 transition-all shadow-md"
                  >
                    Submit Answer
                  </button>
                  <button
                    onClick={() => {
                      if (hintLevel < 3) {
                        audioManager.play('hint');
                        setHintLevel((prev) => prev + 1);
                      }
                    }}
                    className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl"
                  >
                    Hint ({hintLevel}/3)
                  </button>
                </div>

                {challengeCompleted[currentChallengeIdx] && (
                  <button
                    onClick={handleNextChallenge}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-md transition-all"
                  >
                    Next Challenge →
                  </button>
                )}
              </div>

              {/* Hint Bubble Display */}
              {hintLevel > 0 && (
                <HintBubble
                  show={true}
                  text={CHALLENGES[currentChallengeIdx].hints[hintLevel - 1]}
                />
              )}

              {/* Result Banner */}
              {challengeFeedback && (
                <div className={`p-4 rounded-xl border text-sm leading-relaxed ${
                  challengeFeedback.isCorrect
                    ? 'bg-emerald-950/70 border-emerald-800 text-emerald-200'
                    : 'bg-rose-950/70 border-rose-800 text-rose-200'
                }`}>
                  <strong>{challengeFeedback.isCorrect ? '✓ Evaluation Result: ' : '✗ Re-check Strategy: '}</strong>
                  {challengeFeedback.text}
                </div>
              )}
            </div>
          </div>
        )}

        {/* --- TAB 5: REAL WORLD & MASTERY SUMMARY --- */}
        {activeTab === 'summary' && (
          <div className="space-y-6">
            {/* MANDATORY REAL WORLD ACTIVITY SECTION */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
              <div className="flex items-center space-x-2 text-sky-400 text-xs font-bold uppercase tracking-wider">
                <span>🌐 Applied Industrial Chemistry Case Study</span>
              </div>
              <h3 className="text-xl font-bold text-white">{REAL_WORLD_ACTIVITY.title}</h3>
              <p className="text-slate-300 text-sm leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {REAL_WORLD_ACTIVITY.steps.map((step, sIdx) => (
                  <div key={sIdx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-xs font-bold text-sky-400 uppercase">Phase {sIdx + 1}</span>
                    <p className="text-slate-300 text-xs leading-normal">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* MISCONCEPTIONS REVIEW GRID */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-2">
                Curated ICSE Misconceptions & Corrections ({MISCONCEPTIONS.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MISCONCEPTIONS.map((misc) => (
                  <div key={misc.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-amber-400">{misc.title}</span>
                      <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-400">{misc.nodeId}</span>
                    </div>
                    <p className="text-xs text-rose-300 font-semibold">❌ Misconception: "{misc.misconception}"</p>
                    <p className="text-xs text-emerald-300">✓ Scientific Fact: {misc.correction}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* BKT & SM2 MASTERY SUMMARY */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-2">
                Node Mastery Analytics (Bayesian Knowledge Tracing)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {ALL_NODE_IDS.map((node) => {
                  const level = getMasteryLevel(bktStates[node]);
                  const prob = (bktStates[node].pKnown * 100).toFixed(0);
                  return (
                    <div key={node} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                      <span className="text-xs font-bold text-sky-400">{node}</span>
                      <div className="flex justify-between items-baseline">
                        <span className="text-xl font-bold text-white">{prob}%</span>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                          level === 'mastered' ? 'bg-emerald-950 text-emerald-400' :
                          level === 'proficient' ? 'bg-sky-950 text-sky-400' : 'bg-amber-950 text-amber-400'
                        }`}>
                          {level}
                        </span>
                      </div>
                      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div className="bg-gradient-to-r from-sky-500 to-emerald-400 h-full transition-all" style={{ width: `${prob}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default C8_ChemistryWaterpropertiesandcompositionSim;