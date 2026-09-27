'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, masteryProb } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ==========================================
// NODE IDS & CONSTANTS
// ==========================================
const ALL_NODE_IDS = [
  'c10_chem_071',
  'c10_chem_072',
  'c10_chem_073',
  'c10_chem_074',
  'c10_chem_075',
  'c10_chem_076',
  'c10_chem_077',
  'c10_chem_078',
  'c10_chem_079',
  'c10_chem_080',
] as const;

type NodeId = typeof ALL_NODE_IDS[number];

// ==========================================
// SCENARIO DEFINITION
// ==========================================
const SCENARIO = {
  title: 'Organic Chemistry Lab: Alkanes - Structure, Preparation & Reactions',
  intro: 'Welcome to the ICSE Senior Synthetic Organic Chemistry Laboratory. You have been appointed Lead Organic Synthesist to investigate the homologous series of alkanes, master their laboratory preparations, and analyze their chemical transformations.',
  context: 'In this interactive simulation, you will construct alkane molecules from methane to octane, assemble real-time glass apparatus for soda lime decarboxylation, run Wurtz coupling and catalytic hydrogenation reactions, and control photochemical halogenation and combustion chambers under safe, simulated conditions.',
};

// ==========================================
// DISCOVERY QUESTION
// ==========================================
const DISCOVERY_QUESTION = {
  question: 'When heating Sodium Acetate (CH₃COONa) with Soda Lime (NaOH + CaO) to synthesize Methane gas, why is Quicklime (CaO) added when it does not chemically react with Sodium Acetate?',
  options: [
    'CaO acts as a homogeneous liquid catalyst that lowers the activation energy of C-C cleavage.',
    'CaO is deliquescent and absorbs moisture, keeping NaOH dry and preventing the hard glass tube from fusing/cracking.',
    'CaO oxidizes the sodium salt to form carbon dioxide gas directly without sodium carbonate byproduct.',
    'CaO increases the density of the gas so it can be collected by upward displacement of air.',
  ],
  correctIndex: 1,
  hintAfter: 'Soda lime is a mixture of NaOH and CaO. NaOH is extremely hygroscopic and attacks glass at high temperatures. CaO keeps it dry and porous!',
};

// ==========================================
// EXPLORATION STEPS (MANDATORY 5 LAB STEPS)
// ==========================================
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Alkane Homologous Series & Structure Builder',
    instruction: 'Adjust the carbon number (n = 1 to 8) to observe formula changes (CₙH₂ₙ₊₂), molecular geometry, boiling point trends, and physical state transitions.',
    interactionType: 'molecular-builder',
    nodeId: 'c10_chem_071',
  },
  {
    title: 'Lab 2: Decarboxylation Apparatus & Methane/Ethane Synthesis',
    instruction: 'Assemble the heating apparatus, select Sodium Acetate or Sodium Propionate with Soda Lime, control the Bunsen burner flame, and collect gas by water displacement.',
    interactionType: 'decarboxylation-synth',
    nodeId: 'c10_chem_074',
  },
  {
    title: 'Lab 3: Wurtz Reaction & Alkyl Halide Reduction Chamber',
    interactionType: 'wurtz-reduction',
    instruction: 'React alkyl halides with metallic Sodium in dry ether or reduce them using Zn/HCl couple. Analyze why methane cannot be prepared via Wurtz coupling.',
    nodeId: 'c10_chem_076',
  },
  {
    title: 'Lab 4: Catalytic Hydrogenation Reactor',
    instruction: 'Pass alkenes (Ethene) or alkynes (Ethyne) over Nickel/Platinum catalysts with Hydrogen gas at high temperature to synthesize Saturated Alkanes.',
    interactionType: 'hydrogenation-reactor',
    nodeId: 'c10_chem_078',
  },
  {
    title: 'Lab 5: Halogenation & Combustion Control Chamber',
    instruction: 'Vary UV light intensity for photochemical substitution of methane (CH₄ → CH₃Cl → CH₂Cl₂ → CHCl₃ → CCl₄) and test complete vs incomplete combustion with air stoichiometry.',
    interactionType: 'halogenation-combustion',
    nodeId: 'c10_chem_079',
  },
];

// ==========================================
// PREDICTION QUESTIONS (MANDATORY)
// ==========================================
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you react a 1:1 mixture of Methyl Iodide (CH₃I) and Ethyl Iodide (C₂H₅I) with Sodium metal in dry ether (Wurtz Reaction), how many distinct alkane products will form in the reaction vessel?',
    options: [
      'Exactly 1 alkane (Propane)',
      'Exactly 2 alkanes (Ethane and Butane)',
      'A mixture of 3 alkanes (Ethane, Propane, and Butane)',
      '4 alkanes including Methane',
    ],
    correctIndex: 2,
    verifyInstruction: 'Go to Lab 3 (Wurtz Reaction), select the mixed alkyl halide option, and observe the self-coupling and cross-coupling product analysis chart.',
    nodeId: 'c10_chem_076',
  },
  {
    question: 'Predict: What happens when Methane gas is mixed with Chlorine gas in a 1:1 volume ratio and exposed to DIRECT sunlight instead of diffused sunlight?',
    options: [
      'Chloromethane (CH₃Cl) is formed smoothly without any side reaction.',
      'An explosive reaction occurs yielding Carbon soot and Hydrogen Chloride gas (C + 4HCl).',
      'No reaction occurs because direct UV rays destroy the reactants.',
      'Carbon tetrachloride (CCl₄) precipitates as a solid powder immediately.',
    ],
    correctIndex: 1,
    verifyInstruction: 'In Lab 5 (Halogenation Chamber), slide the UV Light Intensity to "Direct Sunlight" and trigger the reaction pulse.',
    nodeId: 'c10_chem_079',
  },
];

// ==========================================
// OBSERVATION QUESTIONS (MANDATORY)
// ==========================================
const OBSERVATION_QUESTIONS = [
  {
    question: 'Observation: Why is Methane gas collected over water by downward displacement of water in laboratory preparation?',
    observableOptions: [
      'Methane reacts violently with air oxygen at room temperature.',
      'Methane is virtually insoluble in water and slightly lighter than air.',
      'Water dissolves impurities like Carbon Monoxide completely.',
      'Methane condenses into liquid water layer for easier volumetric measurement.',
    ],
    correctIndex: 1,
    nodeId: 'c10_chem_074',
  },
  {
    question: 'Observation: As you increase the number of Carbon atoms in straight-chain alkanes from C₁ to C₈, what trend is observed in their boiling points?',
    observableOptions: [
      'Boiling point decreases uniformly due to steric hindrance.',
      'Boiling point increases steadily due to stronger intermolecular Van der Waals forces with increased molecular mass.',
      'Boiling point remains constant at 100°C for all liquid alkanes.',
      'Boiling point fluctuates unpredictably based on hydrogen bonding strength.',
    ],
    correctIndex: 1,
    nodeId: 'c10_chem_073',
  },
];

// ==========================================
// REAL-WORLD ACTIVITY (MANDATORY)
// ==========================================
const REAL_WORLD_ACTIVITY = {
  title: 'Industrial Bio-Gas Purification & CNG Quality Assessment',
  description: 'As a Chemical Process Engineer at a renewable energy refinery, you are tasked with purifying raw biogas (60% CH₄, 35% CO₂, 5% moisture/H₂S) into Bio-CNG (>95% CH₄) for vehicular fuel standards.',
  steps: [
    'Step 1: Calculate the molar mass of raw biogas mixture vs purified Methane fuel (CH₄ = 16.04 g/mol).',
    'Step 2: Calculate the theoretical volume of O₂ required for complete combustion of 100 m³ of purified CH₄ (CH₄ + 2O₂ → CO₂ + 2H₂O). Result: 200 m³ of pure O₂ (or 1000 m³ of dry air).',
    'Step 3: Analyze energy yield: Complete combustion yields 891 kJ/mol without toxic CO or soot formation.',
    'Step 4: Formulate quality report confirming compliance with ICSE & IS-16087 vehicular gas emission benchmarks.',
  ],
};

// ==========================================
// MISCONCEPTIONS (PRESERVE & EXPAND)
// ==========================================
const MISCONCEPTIONS = [
  {
    id: 'misc_01',
    nodeId: 'c10_chem_071',
    misconception: 'General formula CₙH₂ₙ₊₂ applies to all saturated hydrocarbons including cyclic ones.',
    correction: 'CₙH₂ₙ₊₂ applies ONLY to open-chain (acyclic) alkanes. Cycloalkanes have the general formula CₙH₂ₙ because forming a ring structure requires removing two hydrogen atoms.',
  },
  {
    id: 'misc_02',
    nodeId: 'c10_chem_076',
    misconception: 'Wurtz reaction can efficiently prepare Methane gas and odd-carbon alkanes like Propane.',
    correction: 'Methane CANNOT be prepared by Wurtz reaction because coupling two alkyl halides yields at least 2 carbons (R-R). Preparing odd-carbon alkanes via Wurtz gives a mixture of 3 alkanes with similar boiling points that are very difficult to separate.',
  },
  {
    id: 'misc_03',
    nodeId: 'c10_chem_074',
    misconception: 'Soda lime decarboxylation produces an alkane with the same number of carbon atoms as the parent sodium carboxylic acid salt.',
    correction: 'Decarboxylation removes the -COONa group as Na₂CO₃. Therefore, the resulting alkane ALWAYS contains one less carbon atom than the parent carboxylate salt (Cₙ → Cₙ₋₁).',
  },
  {
    id: 'misc_04',
    nodeId: 'c10_chem_078',
    misconception: 'Catalytic hydrogenation cleaves C-C single bonds to break higher alkanes down into methane.',
    correction: 'Catalytic hydrogenation only adds hydrogen across C=C double bonds or C≡C triple bonds to saturate the molecule. It does NOT cleave C-C single bonds.',
  },
  {
    id: 'misc_05',
    nodeId: 'c10_chem_080',
    misconception: 'Burning any alkane always yields carbon dioxide and water vapor regardless of air supply.',
    correction: 'Complete combustion (CO₂ + H₂O) occurs ONLY in excess oxygen. Limited oxygen leads to incomplete combustion producing poisonous Carbon Monoxide (CO) or soot (Carbon powder).',
  },
  {
    id: 'misc_06',
    nodeId: 'c10_chem_077',
    misconception: 'Reduction of alkyl halides using Zn/HCl adds halogen to the hydrocarbon chain.',
    correction: 'Reduction removes the halogen atom and replaces it with a Hydrogen atom (R-X + 2[H] → R-H + HX), converting the alkyl halide into an alkane.',
  },
];

// ==========================================
// 22 PROGRESSIVE CHALLENGES (TIER 1, TIER 2, TIER 3)
// ==========================================
export interface Challenge {
  id: string;
  nodeId: NodeId;
  type: 'recall' | 'understanding' | 'application' | 'analysis' | 'evaluation' | 'creativity';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: string;
  question: string;
  options?: string[];
  correctIndex?: number;
  correctAnswer?: string | number;
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
}

const CHALLENGES: Challenge[] = [
  // --- TIER 1: FOUNDATION (7 Challenges) ---
  {
    id: 'c_01',
    nodeId: 'c10_chem_071',
    type: 'recall',
    difficulty: 'foundation',
    competencyLevel: 'Formula Identification',
    question: 'What is the molecular formula of an open-chain alkane containing 5 Carbon atoms (Pentane)?',
    options: ['C₅H₁₀', 'C₅H₁₂', 'C₅H₈', 'C₅H₁₄'],
    correctIndex: 1,
    explanation: 'Using the general formula CₙH₂ₙ₊₂ for n = 5: C₅H₂₍₅₎₊₂ = C₅H₁₂.',
    hints: ['Apply the alkane general formula CₙH₂ₙ₊₂.', 'Substitute n = 5.', '2(5) + 2 = 12.'],
    misconceptionIndex: 0,
  },
  {
    id: 'c_02',
    nodeId: 'c10_chem_072',
    type: 'understanding',
    difficulty: 'foundation',
    competencyLevel: 'Homologous Series Properties',
    question: 'In the homologous series of straight-chain alkanes, by how much does each successive member differ from the previous member in molecular mass?',
    options: ['12 atomic mass units (-CH₂-)', '14 atomic mass units (-CH₂-)', '16 atomic mass units (-CH₄-)', '2 atomic mass units (-H₂-)'],
    correctIndex: 1,
    explanation: 'Successive members of a homologous series differ by a -CH₂- group, which corresponds to 12 (C) + 2(1) (H) = 14 amu.',
    hints: ['Identify the constant repeating group in homologous series.', 'What is the atomic mass of Carbon (12) + 2 Hydrogens (2)?', '12 + 2 = 14 amu.'],
  },
  {
    id: 'c_03',
    nodeId: 'c10_chem_073',
    type: 'recall',
    difficulty: 'foundation',
    competencyLevel: 'Physical State Classification',
    question: 'Which of the following alkanes exist as liquids at standard room temperature (25°C)?',
    options: ['Methane (CH₄) to Butane (C₄H₁₀)', 'Pentane (C₅H₁₂) to Heptadecane (C₁₇H₃₆)', 'Octadecane (C₁₈H₃₈) and higher', 'All alkanes are gases at room temperature'],
    correctIndex: 1,
    explanation: 'C₁ to C₄ are gases; C₅ to C₁₇ are liquids; C₁₈ and above are waxy solids at room temperature.',
    hints: ['Recall the physical state breakdown for alkanes.', 'First four members (C1-C4) are gases.', 'Pentane (C5) up to C17 are volatile liquids.'],
  },
  {
    id: 'c_04',
    nodeId: 'c10_chem_074',
    type: 'recall',
    difficulty: 'foundation',
    competencyLevel: 'Lab Preparation of Methane',
    question: 'Which chemical mixture is heated in a hard glass test tube to prepare Methane gas in the laboratory?',
    options: ['Sodium Ethanoate + Soda Lime (NaOH + CaO)', 'Sodium Propionate + Quicklime', 'Methanol + Concentrated H₂SO₄', 'Calcium Carbide + Water'],
    correctIndex: 0,
    explanation: 'Sodium Ethanoate (Sodium Acetate, CH₃COONa) heated with Soda Lime (NaOH + CaO) undergoes decarboxylation to yield Methane gas.',
    hints: ['Decarboxylation removes CO₂ from a sodium salt of ethanoic acid.', 'Sodium acetate has 2 carbons and gives 1 carbon alkane.', 'Soda lime is NaOH mixed with CaO.'],
    misconceptionIndex: 2,
  },
  {
    id: 'c_05',
    nodeId: 'c10_chem_075',
    type: 'understanding',
    difficulty: 'foundation',
    competencyLevel: 'Lab Preparation of Ethane',
    question: 'To prepare Ethane (C₂H₆) gas by decarboxylation, which sodium salt of carboxylic acid must be heated with Soda Lime?',
    options: ['Sodium Methanoate (HCOONa)', 'Sodium Ethanoate (CH₃COONa)', 'Sodium Propionate (C₂H₅COONa)', 'Sodium Butanoate (C₃H₇COONa)'],
    correctIndex: 2,
    explanation: 'Decarboxylation yields an alkane with ONE LESS carbon atom than the salt. To get Ethane (2 carbons), we must start with Sodium Propionate (3 carbons: C₂H₅COONa).',
    hints: ['The product alkane always has (n - 1) carbons.', 'Ethane has 2 carbons.', 'So the reactant sodium salt must have 2 + 1 = 3 carbons.'],
    misconceptionIndex: 2,
  },
  {
    id: 'c_06',
    nodeId: 'c10_chem_076',
    type: 'recall',
    difficulty: 'foundation',
    competencyLevel: 'Wurtz Reaction Basics',
    question: 'What reagents are required for the Wurtz reaction to synthesize symmetrical alkanes?',
    options: ['Alkyl halide + Metallic Sodium in dry ether', 'Alkyl halide + Aqueous NaOH', 'Carboxylic acid + Soda lime', 'Alkene + Hydrogen gas over Nickel catalyst'],
    correctIndex: 0,
    explanation: 'The Wurtz reaction involves reacting two alkyl halide molecules (R-X) with metallic Sodium in dry ether solution: 2R-X + 2Na → R-R + 2NaX.',
    hints: ['Wurtz reaction uses an alkali metal.', 'It couples two alkyl groups.', 'The reaction medium must be dry ether to prevent sodium reacting violently with water.'],
  },
  {
    id: 'c_07',
    nodeId: 'c10_chem_077',
    type: 'recall',
    difficulty: 'foundation',
    competencyLevel: 'Reduction of Alkyl Halides',
    question: 'When Methyl Iodide (CH₃I) is reduced using nascent hydrogen [H] generated by Zn/HCl, what organic product is formed?',
    options: ['Ethane (C₂H₆)', 'Methane (CH₄)', 'Iodoform (CHI₃)', 'Methanol (CH₃OH)'],
    correctIndex: 1,
    explanation: 'CH₃I + 2[H] → CH₄ + HI. Nascent hydrogen generated by Zn/HCl replaces the iodine atom with hydrogen, forming methane.',
    hints: ['Reduction adds Hydrogen and removes Halogen.', 'CH₃I has 1 carbon.', 'Replacing I with H yields CH₄.'],
    misconceptionIndex: 5,
  },

  // --- TIER 2: STANDARD (8 Challenges) ---
  {
    id: 'c_08',
    nodeId: 'c10_chem_078',
    type: 'application',
    difficulty: 'standard',
    competencyLevel: 'Catalytic Hydrogenation',
    question: 'Ethyne (C₂H₂) is converted to Ethane (C₂H₆) by catalytic hydrogenation. How many moles of Hydrogen gas (H₂) are required per mole of Ethyne for complete saturation?',
    options: ['1 mole of H₂', '2 moles of H₂', '3 moles of H₂', '4 moles of H₂'],
    correctIndex: 1,
    explanation: 'Ethyne contains a C≡C triple bond (2 pi bonds). Each pi bond requires 1 mole of H₂ to break and saturate. Thus, C₂H₂ + 2H₂ → C₂H₆.',
    hints: ['Count the number of pi bonds in Ethyne (HC≡CH).', 'A triple bond has 1 sigma bond and 2 pi bonds.', 'Each pi bond requires 1 molecule of H₂.'],
  },
  {
    id: 'c_09',
    nodeId: 'c10_chem_079',
    type: 'application',
    difficulty: 'standard',
    competencyLevel: 'Photochemical Substitution',
    question: 'When Methane reacts with excess Chlorine in DIFFUSED sunlight, what is the final organic product after step-by-step substitution?',
    options: ['Chloromethane (CH₃Cl)', 'Dichloromethane (CH₂Cl₂)', 'Trichloromethane / Chloroform (CHCl₃)', 'Tetrachloromethane / Carbon Tetrachloride (CCl₄)'],
    correctIndex: 3,
    explanation: 'With excess chlorine in diffused sunlight, substitution proceeds sequentially through CH₃Cl, CH₂Cl₂, CHCl₃, to fully substituted CCCl₄ (Carbon tetrachloride).',
    hints: ['Diffused sunlight allows stepwise free-radical halogenation.', 'Excess chlorine ensures all 4 Hydrogen atoms are replaced.', 'The fully substituted alkane derivative has 4 chlorine atoms.'],
  },
  {
    id: 'c_10',
    nodeId: 'c10_chem_080',
    type: 'application',
    difficulty: 'standard',
    competencyLevel: 'Combustion Stoichiometry',
    question: 'According to the balanced equation for complete combustion: CH₄ + 2O₂ → CO₂ + 2H₂O, what volume of pure Oxygen gas is needed to burn 15 cm³ of Methane completely?',
    options: ['15 cm³', '30 cm³', '45 cm³', '60 cm³'],
    correctIndex: 1,
    explanation: 'By Gay-Lussac\'s Law of combining volumes, 1 volume of CH₄ reacts with 2 volumes of O₂. Therefore, 15 cm³ CH₄ requires 15 × 2 = 30 cm³ of O₂.',
    hints: ['Check the stoichiometric coefficient ratio of CH₄ : O₂.', 'The ratio is 1 : 2.', 'Multiply 15 cm³ by 2.'],
  },
  {
    id: 'c_11',
    nodeId: 'c10_chem_074',
    type: 'analysis',
    difficulty: 'standard',
    competencyLevel: 'Reagent Analysis in Preparation',
    question: 'Why is quicklime (CaO) added to solid Sodium Hydroxide (NaOH) to form Soda Lime in the lab preparation of methane?',
    options: ['CaO speeds up the reaction by acting as an oxidizing agent.', 'CaO is non-deliquescent and prevents NaOH from absorbing moisture and fusing with the glass apparatus.', 'CaO reacts with methane gas to purify it from water vapor.', 'CaO decreases the ignition temperature of methane.'],
    correctIndex: 1,
    explanation: 'NaOH is extremely hygroscopic (deliquescent) and attacks glass tube material when heated. CaO keeps the reagent dry and prevents the glass tube from fusing or breaking.',
    hints: ['NaOH readily absorbs moisture from the atmosphere.', 'Heating wet NaOH attacks glass (silicates).', 'CaO absorbs moisture and keeps soda lime dry.'],
  },
  {
    id: 'c_12',
    nodeId: 'c10_chem_076',
    type: 'analysis',
    difficulty: 'standard',
    competencyLevel: 'Wurtz Synthetic Limitations',
    question: 'Why is Wurtz reaction NOT suitable for synthesizing Methane (CH₄)?',
    options: ['Methane reacts violently with dry ether.', 'Wurtz reaction requires coupling two alkyl radicals, so the lowest possible alkane produced is Ethane (C₂H₆).', 'Sodium metal reduces methane to carbon soot.', 'Alkyl halides do not react with sodium metal at room temperature.'],
    correctIndex: 1,
    explanation: 'Wurtz reaction joins two alkyl groups (R + R → R-R). The smallest alkyl group is methyl (-CH₃), so coupling gives CH₃-CH₃ (Ethane, 2 carbons). Methane (1 carbon) cannot be formed.',
    hints: ['Look at the mechanism R-X + 2Na + X-R → R-R.', 'What is the minimum carbon count of R-R if R has at least 1 carbon?', '1 + 1 = 2 carbons.'],
    misconceptionIndex: 1,
  },
  {
    id: 'c_13',
    nodeId: 'c10_chem_072',
    type: 'analysis',
    difficulty: 'standard',
    competencyLevel: 'Isomerism in Alkanes',
    question: 'How many structural chain isomers exist for the alkane Pentane (C₅H₁₂)?',
    options: ['2 isomers (n-pentane, isopentane)', '3 isomers (n-pentane, isopentane, neopentane)', '4 isomers', '5 isomers'],
    correctIndex: 1,
    explanation: 'Pentane has 3 structural isomers: 1) n-pentane [CH₃-CH₂-CH₂-CH₂-CH₃], 2) Isopentane / 2-methylbutane [CH₃-CH(CH₃)-CH₂-CH₃], and 3) Neopentane / 2,2-dimethylpropane [C(CH₃)₄].',
    hints: ['Draw straight chain: 5 carbons.', 'Draw 4-carbon chain with 1 methyl branch.', 'Draw 3-carbon chain with 2 methyl branches on central carbon.'],
  },
  {
    id: 'c_14',
    nodeId: 'c10_chem_080',
    type: 'understanding',
    difficulty: 'standard',
    competencyLevel: 'Incomplete Combustion Hazards',
    question: 'What hazardous, odorless gas is produced during incomplete combustion of alkanes in a restricted supply of oxygen?',
    options: ['Carbon Dioxide (CO₂)', 'Carbon Monoxide (CO)', 'Sulfur Dioxide (SO₂)', 'Methane (CH₄)'],
    correctIndex: 1,
    explanation: 'In limited O₂ supply, incomplete combustion occurs: 2CH₄ + 3O₂ → 2CO + 4H₂O. Carbon monoxide is toxic, colorless, and odorless.',
    hints: ['Complete combustion gives CO₂.', 'Incomplete combustion with limited oxygen gives a poisonous monoxide.', 'It binds irreversibly to hemoglobin.'],
    misconceptionIndex: 4,
  },
  {
    id: 'c_15',
    nodeId: 'c10_chem_073',
    type: 'analysis',
    difficulty: 'standard',
    competencyLevel: 'Boiling Point & Branching Correlation',
    question: 'Comparing n-pentane and neopentane (both C₅H₁₂), why does neopentane have a significantly LOWER boiling point (9.5°C) than n-pentane (36°C)?',
    options: ['Neopentane is an unsaturated hydrocarbon.', 'Branching renders neopentane more spherical, reducing surface area and weakening intermolecular Van der Waals forces.', 'Neopentane contains polar C-H bonds.', 'n-pentane forms intermolecular hydrogen bonds.'],
    correctIndex: 1,
    explanation: 'Branching makes the molecule compact/spherical. Compact molecules have smaller surface contact area, reducing the strength of London dispersion (Van der Waals) forces.',
    hints: ['Consider the shape of a straight chain vs a branched sphere.', 'Surface contact area is maximum in straight chains.', 'Weaker attraction = lower boiling point.'],
  },

  // --- TIER 3: ADVANCED (7 Challenges) ---
  {
    id: 'c_16',
    nodeId: 'c10_chem_076',
    type: 'evaluation',
    difficulty: 'advanced',
    competencyLevel: 'Multi-Product Wurtz Evaluation',
    question: 'If a mixture of Bromoethane (C₂H₅Br) and Bromomethane (CH₃Br) is treated with Sodium in dry ether, which mixture of alkanes will be formed?',
    options: ['Only Propane (C₃H₈)', 'Ethane (C₂H₆) and Butane (C₄H₁₀) only', 'Ethane (C₂H₆), Propane (C₃H₈), and Butane (C₄H₁₀)', 'Methane, Ethane, and Propane'],
    correctIndex: 2,
    explanation: 'Self-coupling of CH₃-Br gives Ethane (C₂H₆). Self-coupling of C₂H₅-Br gives Butane (C₄H₁₀). Cross-coupling of CH₃-Br + C₂H₅-Br gives Propane (C₃H₈).',
    hints: ['List self-coupling of CH₃ radicals.', 'List self-coupling of C₂H₅ radicals.', 'List cross-coupling of CH₃ + C₂H₅ radicals.'],
    misconceptionIndex: 1,
  },
  {
    id: 'c_17',
    nodeId: 'c10_chem_074',
    type: 'evaluation',
    difficulty: 'advanced',
    competencyLevel: 'Quantitative Reaction Stoichiometry',
    question: 'Calculate the mass of anhydrous Sodium Acetate (CH₃COONa, molar mass = 82 g/mol) needed to produce 5.6 dm³ (Liters) of Methane gas at STP (molar volume = 22.4 dm³).',
    options: ['10.25 g', '20.50 g', '41.00 g', '82.00 g'],
    correctIndex: 1,
    explanation: 'Moles of CH₄ needed = 5.6 / 22.4 = 0.25 mol. From equation CH₃COONa + NaOH → CH₄ + Na₂CO₃, 1 mol salt gives 1 mol CH₄. Mass of salt = 0.25 mol × 82 g/mol = 20.50 g.',
    hints: ['Find moles of CH₄: Volume / 22.4 = 5.6 / 22.4 = 0.25 mol.', '1 mol sodium acetate produces 1 mol methane.', 'Mass = 0.25 × 82 = ?'],
  },
  {
    id: 'c_18',
    nodeId: 'c10_chem_079',
    type: 'evaluation',
    difficulty: 'advanced',
    competencyLevel: 'Free Radical Reaction Mechanism',
    question: 'In the photochemical chlorination of methane, which step represents a PROPAGATION step in the free radical chain reaction?',
    options: ['Cl₂ + hν → 2 Cl•', 'CH₄ + Cl• → •CH₃ + HCl', '•CH₃ + Cl• → CH₃Cl', 'Cl• + Cl• → Cl₂'],
    correctIndex: 1,
    explanation: 'Propagation consumes a radical and generates a new radical: CH₄ + Cl• → •CH₃ + HCl (and •CH₃ + Cl₂ → CH₃Cl + Cl•). Option A is initiation; C and D are termination.',
    hints: ['Initiation generates radicals from neutral molecules.', 'Propagation uses a radical and produces a NEW radical.', 'Termination combines two radicals into a neutral molecule.'],
  },
  {
    id: 'c_19',
    nodeId: 'c10_chem_074',
    type: 'creativity',
    difficulty: 'advanced',
    competencyLevel: 'Apparatus Safety & Design Analysis',
    question: 'During the lab synthesis of Methane, why must the delivery tube be removed from the water trough BEFORE turning off the Bunsen burner flame?',
    options: ['To prevent methane gas from dissolving in water.', 'To prevent water from being sucked back into the hot glass tube, which would cause it to crack violently.', 'To allow remaining air to flush the tube.', 'To increase the temperature of the collection jar.'],
    correctIndex: 1,
    explanation: 'If heating stops while the tube is submerged, cooling gas contracts creating a partial vacuum. Cold water is sucked back into the hot glass tube, cracking it violently.',
    hints: ['Think about thermal contraction when gas cools down.', 'What creates a vacuum inside the test tube?', 'What happens when cold water meets hot glass?'],
  },
  {
    id: 'c_20',
    nodeId: 'c10_chem_078',
    type: 'evaluation',
    difficulty: 'advanced',
    competencyLevel: 'Saturated vs Unsaturated Synthesis',
    question: 'Comparing Sabatier-Senderens reaction (catalytic hydrogenation) using Nickel catalyst vs Platinum catalyst, which statement is ACCURATE?',
    options: ['Nickel requires heating to ~200-300°C, whereas Platinum/Palladium catalyst can operate effectively at room temperature.', 'Platinum operates only at 600°C under high pressure.', 'Nickel cleaves single bonds while Platinum preserves double bonds.', 'Both catalysts require liquid ammonia medium.'],
    correctIndex: 0,
    explanation: 'Raney Nickel requires elevated temperature (200-300°C) for hydrogenation, whereas finely divided Platinum (Pt) or Palladium (Pd) functions efficiently at room temperature.',
    hints: ['Finely divided noble metals (Pt, Pd) are much more active catalysts.', 'Nickel is cheaper but requires heat (200-300°C).', 'Pt works at ambient room temperature.'],
  },
  {
    id: 'c_21',
    nodeId: 'c10_chem_074',
    type: 'creativity',
    difficulty: 'advanced',
    competencyLevel: 'Decarboxylation Anomalies',
    question: 'If Sodium Formate (HCOONa) is heated with Soda Lime instead of Sodium Acetate, what inorganic/gas product is collected instead of an alkane?',
    options: ['Methane (CH₄)', 'Hydrogen gas (H₂)', 'Carbon Monoxide (CO)', 'Formaldehyde (HCHO)'],
    correctIndex: 1,
    explanation: 'Sodium formate decarboxylation yields Hydrogen gas: HCOONa + NaOH → Na₂CO₃ + H₂. No carbon remains in the organic radical, so H₂ is produced.',
    hints: ['Sodium formate has 1 carbon (HCOO-).', 'Decarboxylation removes 1 carbon atom as Na₂CO₃.', 'Carbons remaining = 1 - 1 = 0. The remaining atom is H.'],
  },
  {
    id: 'c_22',
    nodeId: 'c10_chem_073',
    type: 'evaluation',
    difficulty: 'advanced',
    competencyLevel: 'Density & Solubility Analysis',
    question: 'Alkanes are insoluble in water but highly soluble in organic solvents like carbon tetrachloride (CCl₄) or benzene. What explains this solubility behavior?',
    options: ['Alkanes are non-polar molecules and follow the "like dissolves like" principle with non-polar solvents.', 'Alkanes form strong hydrogen bonds with CCl₄.', 'Alkanes ionize into alkyl ions in organic solvents.', 'Water molecules are smaller than alkane molecules.'],
    correctIndex: 0,
    explanation: 'Alkanes contain C-C and C-H bonds with almost zero electronegativity difference, rendering them non-polar. They dissolve in non-polar organic solvents, not polar water.',
    hints: ['Recall the golden rule of solubility: "Like dissolves like".', 'Are C-H bonds polar or non-polar?', 'Water is strongly polar with hydrogen bonding.'],
  },
];

// ==========================================
// SVG DIAGRAM 1: ALKANE MOLECULE BUILDER SVG
// ==========================================
const AlkaneMoleculeSVG: React.FC<{ carbonCount: number }> = ({ carbonCount }) => {
  const cRadius = 22;
  const hRadius = 14;
  const spacingX = 70;
  const startX = 60;
  const centerY = 110;

  return (
    <svg className="w-full h-64 bg-slate-900 rounded-xl border border-slate-700 shadow-inner" viewBox="0 0 650 220">
      <defs>
        <radialGradient id="carbonGrad" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#475569" />
          <stop offset="50%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#0f172a" />
        </radialGradient>
        <radialGradient id="hydrogenGrad" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="70%" stopColor="#cbd5e1" />
          <stop offset="100%" stopColor="#94a3b8" />
        </radialGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Grid lines background */}
      <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
      </pattern>
      <rect width="650" height="220" fill="url(#grid)" />

      {/* Render Bonds First */}
      {Array.from({ length: carbonCount }).map((_, i) => {
        const cx = startX + i * spacingX;
        return (
          <g key={`bonds-${i}`}>
            {/* Horizontal C-C bond */}
            {i < carbonCount - 1 && (
              <line
                x1={cx + cRadius}
                y1={centerY}
                x2={cx + spacingX - cRadius}
                y2={centerY}
                stroke="#64748b"
                strokeWidth="6"
                strokeLinecap="round"
              />
            )}
            {/* Top C-H bond */}
            <line x1={cx} y1={centerY - cRadius} x2={cx} y2={centerY - 55 + hRadius} stroke="#475569" strokeWidth="4" />
            {/* Bottom C-H bond */}
            <line x1={cx} y1={centerY + cRadius} x2={cx} y2={centerY + 55 - hRadius} stroke="#475569" strokeWidth="4" />
            {/* Left C-H bond for first carbon */}
            {i === 0 && (
              <line x1={cx - cRadius} y1={centerY} x2={cx - 50 + hRadius} y2={centerY} stroke="#475569" strokeWidth="4" />
            )}
            {/* Right C-H bond for last carbon */}
            {i === carbonCount - 1 && (
              <line x1={cx + cRadius} y1={centerY} x2={cx + 50 - hRadius} y2={centerY} stroke="#475569" strokeWidth="4" />
            )}
          </g>
        );
      })}

      {/* Render Atoms */}
      {Array.from({ length: carbonCount }).map((_, i) => {
        const cx = startX + i * spacingX;
        return (
          <g key={`atoms-${i}`}>
            {/* Top Hydrogen */}
            <circle cx={cx} cy={centerY - 55} r={hRadius} fill="url(#hydrogenGrad)" stroke="#64748b" strokeWidth="1.5" />
            <text x={cx} y={centerY - 51} fill="#0f172a" fontSize="12" fontWeight="bold" textAnchor="middle">H</text>

            {/* Bottom Hydrogen */}
            <circle cx={cx} cy={centerY + 55} r={hRadius} fill="url(#hydrogenGrad)" stroke="#64748b" strokeWidth="1.5" />
            <text x={cx} y={centerY + 59} fill="#0f172a" fontSize="12" fontWeight="bold" textAnchor="middle">H</text>

            {/* Left Hydrogen for end */}
            {i === 0 && (
              <>
                <circle cx={cx - 50} cy={centerY} r={hRadius} fill="url(#hydrogenGrad)" stroke="#64748b" strokeWidth="1.5" />
                <text x={cx - 50} y={centerY + 4} fill="#0f172a" fontSize="12" fontWeight="bold" textAnchor="middle">H</text>
              </>
            )}

            {/* Right Hydrogen for end */}
            {i === carbonCount - 1 && (
              <>
                <circle cx={cx + 50} cy={centerY} r={hRadius} fill="url(#hydrogenGrad)" stroke="#64748b" strokeWidth="1.5" />
                <text x={cx + 50} y={centerY + 4} fill="#0f172a" fontSize="12" fontWeight="bold" textAnchor="middle">H</text>
              </>
            )}

            {/* Carbon Atom */}
            <circle cx={cx} cy={centerY} r={cRadius} fill="url(#carbonGrad)" stroke="#38bdf8" strokeWidth="2.5" filter="url(#glow)" />
            <text x={cx} y={centerY + 5} fill="#38bdf8" fontSize="16" fontWeight="bold" textAnchor="middle">C</text>
          </g>
        );
      })}

      {/* Molecular Info Badge */}
      <rect x="470" y="15" width="165" height="60" rx="8" fill="rgba(15, 23, 42, 0.85)" stroke="#38bdf8" strokeWidth="1.5" />
      <text x="480" y="38" fill="#e2e8f0" fontSize="13" fontWeight="bold">Formula: C{carbonCount}H{2 * carbonCount + 2}</text>
      <text x="480" y="58" fill="#94a3b8" fontSize="11">Mass: {(carbonCount * 12.011 + (2 * carbonCount + 2) * 1.008).toFixed(2)} g/mol</text>
    </svg>
  );
};

// ==========================================
// SVG DIAGRAM 2: DECARBOXYLATION APPARATUS SVG
// ==========================================
const DecarboxylationApparatusSVG: React.FC<{ isHeating: boolean; reactant: 'acetate' | 'propionate'; gasBubbles: number }> = ({
  isHeating,
  reactant,
  gasBubbles,
}) => {
  return (
    <svg className="w-full h-80 bg-slate-950 rounded-xl border border-slate-800 shadow-2xl overflow-hidden" viewBox="0 0 700 320">
      <defs>
        <linearGradient id="glassGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(255,255,255,0.2)" />
          <stop offset="30%" stopColor="rgba(255,255,255,0.05)" />
          <stop offset="70%" stopColor="rgba(255,255,255,0.05)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.25)" />
        </linearGradient>
        <linearGradient id="flameGrad" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="50%" stopColor="#f97316" />
          <stop offset="90%" stopColor="#eab308" />
          <stop offset="100%" stopColor="#38bdf8" />
        </linearGradient>
      </defs>

      {/* Stand Base & Rod */}
      <rect x="80" y="280" width="160" height="15" fill="#334155" rx="3" />
      <rect x="150" y="60" width="12" height="220" fill="#475569" />

      {/* Clamp */}
      <rect x="150" y="110" width="60" height="10" fill="#64748b" rx="2" />
      <circle cx="156" cy="115" r="5" fill="#1e293b" />

      {/* Hard Glass Test Tube (Slanted) */}
      <g transform="rotate(12, 160, 120)">
        {/* Reactant mixture solid */}
        <rect x="160" y="105" width="120" height="30" fill="#e2e8f0" opacity="0.85" rx="5" />
        <path d="M 160 105 Q 220 100 280 105 L 280 135 L 160 135 Z" fill="#cbd5e1" opacity="0.6" />
        <text x="180" y="125" fill="#0f172a" fontSize="10" fontWeight="bold">
          {reactant === 'acetate' ? 'CH₃COONa + Soda Lime' : 'C₂H₅COONa + Soda Lime'}
        </text>

        {/* Tube glass boundary */}
        <path d="M 160 100 L 310 100 A 15 15 0 0 1 310 140 L 160 140 Z" fill="url(#glassGrad)" stroke="#38bdf8" strokeWidth="2" />
        {/* Rubber Cork */}
        <rect x="148" y="98" width="15" height="44" fill="#78350f" rx="2" />
      </g>

      {/* Delivery Glass Tube */}
      <path d="M 152 118 L 100 118 L 100 240 L 450 240 L 450 220" fill="none" stroke="#67e8f9" strokeWidth="5" strokeLinecap="round" opacity="0.85" />
      <path d="M 152 118 L 100 118 L 100 240 L 450 240 L 450 220" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.9" />

      {/* Bunsen Burner */}
      <rect x="230" y="220" width="30" height="60" fill="#475569" />
      <rect x="220" y="275" width="50" height="10" fill="#1e293b" rx="2" />
      {isHeating && (
        <g>
          <path d="M 235 220 Q 245 150 255 220 Z" fill="url(#flameGrad)" className="animate-pulse" />
          <path d="M 240 220 Q 245 170 250 220 Z" fill="#38bdf8" opacity="0.8" />
        </g>
      )}

      {/* Water Trough */}
      <rect x="380" y="200" width="220" height="80" rx="8" fill="rgba(14, 165, 233, 0.2)" stroke="#38bdf8" strokeWidth="2" />
      <rect x="385" y="215" width="210" height="60" fill="rgba(56, 189, 248, 0.35)" />
      <text x="440" y="265" fill="#bae6fd" fontSize="11" fontWeight="bold">Water Trough</text>

      {/* Gas Jar (Inverted over beehive shelf) */}
      <rect x="420" y="110" width="60" height="110" fill="url(#glassGrad)" stroke="#7dd3fc" strokeWidth="2" rx="4" />
      {/* Beehive Shelf Stand */}
      <rect x="410" y="215" width="80" height="15" fill="#475569" rx="2" />

      {/* Gas Collection Zone in Gas Jar */}
      {isHeating && (
        <rect x="422" y="112" width="56" height="45" fill="rgba(56, 189, 248, 0.4)" rx="2" className="transition-all duration-500" />
      )}
      <text x="450" y="135" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">
        {isHeating ? (reactant === 'acetate' ? 'CH₄ Gas' : 'C₂H₆ Gas') : 'Inverted Jar'}
      </text>

      {/* Animated Gas Bubbles inside water */}
      {isHeating &&
        Array.from({ length: 6 }).map((_, i) => (
          <circle
            key={i}
            cx={445 + (i % 3) * 8}
            cy={210 - ((gasBubbles * 15 + i * 20) % 80)}
            r={3 + (i % 3)}
            fill="#7dd3fc"
            opacity="0.8"
            className="animate-bounce"
          />
        ))}

      {/* Equation Label */}
      <rect x="20" y="20" width="360" height="40" rx="6" fill="#0f172a" stroke="#334155" />
      <text x="35" y="45" fill="#38bdf8" fontSize="13" fontFamily="monospace" fontWeight="bold">
        {reactant === 'acetate'
          ? 'CH₃COONa + NaOH —(CaO, Δ)→ CH₄↑ + Na₂CO₃'
          : 'C₂H₅COONa + NaOH —(CaO, Δ)→ C₂H₆↑ + Na₂CO₃'}
      </text>
    </svg>
  );
};

// ==========================================
// SVG DIAGRAM 3: WURTZ & REACTION SCHEMATIC SVG
// ==========================================
const WurtzReactionSVG: React.FC<{ alkyl1: string; alkyl2: string; isReacting: boolean }> = ({ alkyl1, alkyl2, isReacting }) => {
  return (
    <svg className="w-full h-64 bg-slate-900 rounded-xl border border-slate-700 shadow-lg p-2" viewBox="0 0 650 200">
      <rect width="650" height="200" fill="#0f172a" rx="10" />

      {/* Left Reactant Box */}
      <g transform="translate(30, 40)">
        <rect width="160" height="120" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
        <text x="80" y="30" fill="#93c5fd" fontSize="14" fontWeight="bold" textAnchor="middle">Alkyl Halide 1</text>
        <circle cx="80" cy="70" r="25" fill="#2563eb" />
        <text x="80" y="75" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">{alkyl1}</text>
      </g>

      {/* Plus Sign */}
      <text x="210" y="110" fill="#e2e8f0" fontSize="24" fontWeight="bold">+</text>

      {/* Sodium Metal Box */}
      <g transform="translate(240, 40)">
        <rect width="110" height="120" rx="8" fill="#1e293b" stroke="#eab308" strokeWidth="2" />
        <text x="55" y="30" fill="#fde047" fontSize="14" fontWeight="bold" textAnchor="middle">Reagent</text>
        <rect x="30" y="50" width="50" height="40" rx="4" fill="#ca8a04" />
        <text x="55" y="75" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">2 Na</text>
        <text x="55" y="105" fill="#94a3b8" fontSize="10" textAnchor="middle">in Dry Ether</text>
      </g>

      {/* Plus Sign */}
      <text x="370" y="110" fill="#e2e8f0" fontSize="24" fontWeight="bold">+</text>

      {/* Right Reactant Box */}
      <g transform="translate(400, 40)">
        <rect width="160" height="120" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
        <text x="80" y="30" fill="#93c5fd" fontSize="14" fontWeight="bold" textAnchor="middle">Alkyl Halide 2</text>
        <circle cx="80" cy="70" r="25" fill="#2563eb" />
        <text x="80" y="75" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">{alkyl2}</text>
      </g>

      {/* Animated Coupling Arrow */}
      {isReacting && (
        <path d="M 190 100 Q 325 170 460 100" fill="none" stroke="#22c55e" strokeWidth="4" strokeDasharray="6,6" className="animate-pulse" />
      )}
    </svg>
  );
};

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function C10_ChemistryAlkanesgeneralformulaandpreparationSim() {
  // State for Navigation & Learning Engine
  const [activeTab, setActiveTab] = useState<'discovery' | 'lab' | 'challenges' | 'summary'>('discovery');
  const [activeLabIndex, setActiveLabIndex] = useState<number>(0);

  // Discovery State
  const [selectedDiscoveryOpt, setSelectedDiscoveryOpt] = useState<number | null>(null);
  const [discoverySubmitted, setDiscoverySubmitted] = useState<boolean>(false);

  // Challenge Engine State
  const [currentChallengeIdx, setCurrentChallengeIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [challengeAnswered, setChallengeAnswered] = useState<boolean>(false);
  const [userScore, setUserScore] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHintIdx, setCurrentHintIdx] = useState<number>(0);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);

  // SRS & BKT Integration State
  const [bktStates, setBktStates] = useState<Record<NodeId, ReturnType<typeof createBKTState>>>(() => {
    const initial: Record<string, ReturnType<typeof createBKTState>> = {};
    ALL_NODE_IDS.forEach((id) => {
      initial[id] = createBKTState();
    });
    return initial as Record<NodeId, ReturnType<typeof createBKTState>>;
  });

  const [srsItems, setSrsItems] = useState<Record<NodeId, ReturnType<typeof createReviewItem>>>(() => {
    const initial: Record<string, ReturnType<typeof createReviewItem>> = {};
    ALL_NODE_IDS.forEach((id) => {
      initial[id] = createReviewItem(id);
    });
    return initial as Record<NodeId, ReturnType<typeof createReviewItem>>;
  });

  // Lab Interactive Variables
  // Lab 1: Alkane Molecular Builder
  const [carbonCount, setCarbonCount] = useState<number>(3); // Propane by default

  // Lab 2: Soda Lime Decarboxylation
  const [decarbReactant, setDecarbReactant] = useState<'acetate' | 'propionate'>('acetate');
  const [isHeatingDecarb, setIsHeatingDecarb] = useState<boolean>(false);
  const [bubbleCounter, setBubbleCounter] = useState<number>(0);

  // Lab 3: Wurtz & Reduction
  const [wurtzAlkyl1, setWurtzAlkyl1] = useState<string>('CH₃I');
  const [wurtzAlkyl2, setWurtzAlkyl2] = useState<string>('CH₃I');
  const [isWurtzReacting, setIsWurtzReacting] = useState<boolean>(false);
  const [reductionReagent, setReductionReagent] = useState<'Zn/HCl' | 'Zn-Cu/Alcohol'>('Zn/HCl');

  // Lab 4: Hydrogenation Reactor
  const [unsaturatedReactant, setUnsaturatedReactant] = useState<'ethene' | 'ethyne'>('ethene');
  const [catalyst, setCatalyst] = useState<'Ni' | 'Pt' | 'Pd'>('Ni');
  const [tempCelsius, setTempCelsius] = useState<number>(250);
  const [isHydrogenating, setIsHydrogenating] = useState<boolean>(false);

  // Lab 5: Halogenation & Combustion
  const [lightCondition, setLightCondition] = useState<'dark' | 'diffused' | 'direct'>('diffused');
  const [o2Ratio, setO2Ratio] = useState<number>(2); // 2:1 stoichiometric for CH4
  const [reactionLog, setReactionLog] = useState<string[]>([]);

  // Timer Ref for Auto-Hint after 10s
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!challengeAnswered && activeTab === 'challenges') {
      timerRef.current = setTimeout(() => {
        setShowHint(true);
        audioManager.play('hint');
      }, 10000);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentChallengeIdx, challengeAnswered, activeTab]);

  // Bubble animation timer for decarb
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isHeatingDecarb) {
      interval = setInterval(() => {
        setBubbleCounter((prev) => prev + 1);
      }, 300);
    }
    return () => clearInterval(interval);
  }, [isHeatingDecarb]);

  // Handle Discovery Option Submit
  const handleDiscoverySubmit = (idx: number) => {
    setSelectedDiscoveryOpt(idx);
    setDiscoverySubmitted(true);
    if (idx === DISCOVERY_QUESTION.correctIndex) {
      audioManager.play('success');
      speechManager.speak('Correct! Quicklime keeps sodium hydroxide dry and prevents glass breakage.');
      setShowSparkle(true);
    } else {
      audioManager.play('error');
      speechManager.speak('Not quite. Consider the hygroscopic nature of solid sodium hydroxide.');
    }
  };

  // Handle Challenge Answer
  const handleAnswerSubmit = (optionIdx: number) => {
    if (challengeAnswered) return;
    setSelectedOption(optionIdx);
    setChallengeAnswered(true);

    const currentChallenge = CHALLENGES[currentChallengeIdx];
    const isCorrect = optionIdx === currentChallenge.correctIndex;

    // Update BKT
    const updatedBKT = bktUpdate(bktStates[currentChallenge.nodeId], isCorrect);
    setBktStates((prev) => ({ ...prev, [currentChallenge.nodeId]: updatedBKT }));

    // Update SRS
    const updatedSRS = sm2Update(srsItems[currentChallenge.nodeId], isCorrect ? 5 : 1);
    setSrsItems((prev) => ({ ...prev, [currentChallenge.nodeId]: updatedSRS }));

    if (isCorrect) {
      setUserScore((prev) => prev + 10);
      audioManager.play('drop-correct');
      speechManager.speak('Excellent analysis!');
      setShowSuccess(true);
      setShowSparkle(true);
      if (currentChallengeIdx === CHALLENGES.length - 1) {
        setShowConfetti(true);
        audioManager.play('celebration');
        recordGameScore('c10_chem_alkanes', userScore + 10);
      }
    } else {
      audioManager.play('drop-wrong');
      speechManager.speak('That answer is incorrect. Review the detailed explanation below.');
    }
  };

  const nextChallenge = () => {
    if (currentChallengeIdx < CHALLENGES.length - 1) {
      setCurrentChallengeIdx((prev) => prev + 1);
      setSelectedOption(null);
      setChallengeAnswered(false);
      setShowHint(false);
      setCurrentHintIdx(0);
      setShowSuccess(false);
      setShowSparkle(false);
    }
  };

  const prevChallenge = () => {
    if (currentChallengeIdx > 0) {
      setCurrentChallengeIdx((prev) => prev - 1);
      setSelectedOption(null);
      setChallengeAnswered(false);
      setShowHint(false);
      setCurrentHintIdx(0);
      setShowSuccess(false);
      setShowSparkle(false);
    }
  };

  // Lab 3 Wurtz Result Generator
  const getWurtzProductText = () => {
    if (wurtzAlkyl1 === 'CH₃I' && wurtzAlkyl2 === 'CH₃I') {
      return { formula: 'C₂H₆ (Ethane)', yield: 'High Yield (Symmetrical coupling)' };
    } else if (wurtzAlkyl1 === 'C₂H₅Br' && wurtzAlkyl2 === 'C₂H₅Br') {
      return { formula: 'C₄H₁₀ (Butane)', yield: 'High Yield (Symmetrical coupling)' };
    } else {
      return {
        formula: 'Mixture: Ethane (C₂H₆) + Propane (C₃H₈) + Butane (C₄H₁₀)',
        yield: 'Low Yield of Propane (Difficult fractional distillation separation)',
      };
    }
  };

  // Lab 5 Reaction Run Handler
  const triggerHalogenationOrCombustion = (type: 'halogenation' | 'combustion') => {
    audioManager.play('whoosh');
    if (type === 'halogenation') {
      if (lightCondition === 'dark') {
        setReactionLog((prev) => ['[DARK]: No reaction occurs in absolute darkness. Free radicals require UV light.', ...prev]);
      } else if (lightCondition === 'diffused') {
        setReactionLog((prev) => [
          '[DIFFUSED LIGHT]: Stepwise Substitution Occurs:',
          '1. CH₄ + Cl₂ → CH₃Cl + HCl (Chloromethane)',
          '2. CH₃Cl + Cl₂ → CH₂Cl₂ + HCl (Dichloromethane)',
          '3. CH₂Cl₂ + Cl₂ → CHCl₃ + HCl (Chloroform)',
          '4. CHCl₃ + Cl₂ → CCl₄ + HCl (Carbon Tetrachloride)',
          ...prev,
        ]);
      } else {
        setReactionLog((prev) => [
          '[DIRECT SUNLIGHT - EXPLOSIVE]: CH₄ + 2Cl₂ —(Direct UV)→ C(s) + 4HCl(g)',
          'Violent, explosive reaction yielding black Carbon soot and toxic HCl fumes!',
          ...prev,
        ]);
      }
    } else {
      if (o2Ratio >= 2.0) {
        setReactionLog((prev) => [
          `[COMPLETE COMBUSTION (O₂ Ratio ${o2Ratio}:1)]: CH₄ + 2O₂ → CO₂ + 2H₂O + 891 kJ`,
          'Clear blue flame. Non-polluting carbon dioxide gas and water vapor produced.',
          ...prev,
        ]);
      } else if (o2Ratio >= 1.5) {
        setReactionLog((prev) => [
          `[INCOMPLETE COMBUSTION (O₂ Ratio ${o2Ratio}:1)]: 2CH₄ + 3O₂ → 2CO + 4H₂O`,
          'WARNING: Poisonous Carbon Monoxide (CO) gas generated due to limited oxygen!',
          ...prev,
        ]);
      } else {
        setReactionLog((prev) => [
          `[SEVERE INCOMPLETE COMBUSTION (O₂ Ratio ${o2Ratio}:1)]: CH₄ + O₂ → C(s) + 2H₂O`,
          'Yellow smoky flame producing black carbon soot particles (lamp black).',
          ...prev,
        ]);
      }
    }
  };

  // Alkane Homologous Series Computed Properties
  const alkaneInfo = useMemo(() => {
    const names = ['Methane', 'Ethane', 'Propane', 'Butane', 'Pentane', 'Hexane', 'Heptane', 'Octane'];
    const name = names[carbonCount - 1];
    const formula = `C${carbonCount}H${2 * carbonCount + 2}`;
    const bp = -161.5 + (carbonCount - 1) * 42; // Approximation curve
    const state = carbonCount <= 4 ? 'Gas (Gaseous Alkane)' : 'Liquid (Volatile Liquid Alkane)';
    return { name, formula, bp: bp.toFixed(1), state };
  }, [carbonCount]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 md:p-8 select-none">
      {/* Visual Banners */}
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccess} text="Correct Answer! Mastery Level Increased." />
      <SparkleBurst show={showSparkle} x={400} y={200} />

      {/* Top Header & Navigation */}
      <header className="max-w-7xl mx-auto mb-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-cyan-950 text-cyan-400 border border-cyan-700 rounded-full text-xs font-bold uppercase tracking-wider">
              ICSE Class 10 Chemistry
            </span>
            <span className="px-3 py-1 bg-amber-950 text-amber-400 border border-amber-700 rounded-full text-xs font-bold uppercase tracking-wider">
              Organic Chemistry
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-2 tracking-tight">
            Alkanes: General Formula, Isomerism & Laboratory Preparation
          </h1>
          <p className="text-slate-400 text-sm mt-1">Interactive Simulation & Adaptive Mastery Engine</p>
        </div>

        {/* Tab Selector */}
        <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 gap-2">
          <button
            onClick={() => {
              setActiveTab('discovery');
              audioManager.play('tap');
            }}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'discovery' ? 'bg-cyan-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
            }`}
          >
            1. Lab Context & Discovery
          </button>
          <button
            onClick={() => {
              setActiveTab('lab');
              audioManager.play('tap');
            }}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'lab' ? 'bg-cyan-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
            }`}
          >
            2. Interactive Workbench
          </button>
          <button
            onClick={() => {
              setActiveTab('challenges');
              audioManager.play('tap');
            }}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'challenges' ? 'bg-cyan-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
            }`}
          >
            3. Adaptive Challenges ({userScore} pts)
          </button>
          <button
            onClick={() => {
              setActiveTab('summary');
              audioManager.play('tap');
            }}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'summary' ? 'bg-cyan-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
            }`}
          >
            4. Mastery Summary & SRS
          </button>
        </div>
      </header>

      {/* Main Body Grid */}
      <main className="max-w-7xl mx-auto">
        {/* ========================================== */}
        {/* TAB 1: DISCOVERY & SCENARIO               */}
        {/* ========================================== */}
        {activeTab === 'discovery' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-bold text-cyan-400 mb-2">{SCENARIO.title}</h2>
              <p className="text-slate-300 leading-relaxed mb-4">{SCENARIO.intro}</p>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-slate-400 text-sm">
                <strong className="text-white">Lab Context: </strong>
                {SCENARIO.context}
              </div>
            </div>

            {/* Discovery Question Card */}
            <div className="bg-slate-900 border border-cyan-900/40 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-3 h-3 rounded-full bg-cyan-500 animate-ping"></span>
                <h3 className="text-lg font-bold text-white">Pre-Lab Discovery Challenge</h3>
              </div>
              <p className="text-slate-200 text-base font-medium mb-6">{DISCOVERY_QUESTION.question}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {DISCOVERY_QUESTION.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleDiscoverySubmit(idx)}
                    disabled={discoverySubmitted}
                    className={`p-4 rounded-xl text-left border text-sm font-medium transition-all ${
                      selectedDiscoveryOpt === idx
                        ? idx === DISCOVERY_QUESTION.correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                          : 'bg-rose-950/80 border-rose-500 text-rose-200'
                        : 'bg-slate-950 border-slate-800 hover:border-cyan-700 text-slate-300'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-cyan-400 shrink-0">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{option}</span>
                    </div>
                  </button>
                ))}
              </div>

              {discoverySubmitted && (
                <div className="bg-cyan-950/50 border border-cyan-800 rounded-xl p-4 text-cyan-200 text-sm animate-fade-in">
                  <strong className="font-bold">Mechanism Hint: </strong>
                  {DISCOVERY_QUESTION.hintAfter}
                </div>
              )}
            </div>

            {/* Prediction Questions Section */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-bold text-white mb-4">Lab Hypotheses & Predictions</h3>
              <div className="space-y-6">
                {PREDICTION_QUESTIONS.map((pq, idx) => (
                  <div key={idx} className="bg-slate-950 p-5 rounded-xl border border-slate-800">
                    <h4 className="font-semibold text-cyan-300 mb-3">{pq.question}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                      {pq.options.map((opt, oIdx) => (
                        <div
                          key={oIdx}
                          className={`p-3 rounded-lg border text-xs ${
                            oIdx === pq.correctIndex
                              ? 'bg-emerald-950/40 border-emerald-800 text-emerald-300'
                              : 'bg-slate-900 border-slate-800 text-slate-400'
                          }`}
                        >
                          {opt}
                        </div>
                      ))}
                    </div>
                    <p className="text-slate-400 text-xs italic">Verification Protocol: {pq.verifyInstruction}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* TAB 2: INTERACTIVE WORKBENCH (5 LAB STEPS) */}
        {/* ========================================== */}
        {activeTab === 'lab' && (
          <div className="space-y-6">
            {/* Exploration Lab Step Selector */}
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {EXPLORATION_STEPS.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveLabIndex(idx);
                    audioManager.play('tap');
                  }}
                  className={`p-3 rounded-xl border text-left text-xs font-bold transition-all ${
                    activeLabIndex === idx
                      ? 'bg-cyan-600 border-cyan-400 text-white shadow-lg'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="text-cyan-300 text-[10px] uppercase mb-1">Step {idx + 1}</div>
                  <div className="truncate">{step.title.split(':')[1] || step.title}</div>
                </button>
              ))}
            </div>

            {/* Instruction Banner */}
            <div className="bg-slate-900 border border-cyan-800/50 rounded-xl p-4 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-cyan-300 text-sm">{EXPLORATION_STEPS[activeLabIndex].title}</h3>
                <p className="text-slate-300 text-xs mt-0.5">{EXPLORATION_STEPS[activeLabIndex].instruction}</p>
              </div>
              <span className="text-xs px-2.5 py-1 bg-slate-800 rounded-md border border-slate-700 text-cyan-400 font-mono">
                Node: {EXPLORATION_STEPS[activeLabIndex].nodeId}
              </span>
            </div>

            {/* LAB 1: HOMOLOGOUS SERIES & MOLECULAR BUILDER */}
            {activeLabIndex === 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                  <AlkaneMoleculeSVG carbonCount={carbonCount} />

                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                    <label className="flex justify-between text-sm font-bold text-white mb-2">
                      <span>Carbon Chain Length (n): {carbonCount}</span>
                      <span className="text-cyan-400">{alkaneInfo.name}</span>
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="8"
                      value={carbonCount}
                      onChange={(e) => {
                        setCarbonCount(parseInt(e.target.value));
                        audioManager.play('pop');
                      }}
                      className="w-full accent-cyan-500 bg-slate-800 rounded-lg cursor-pointer h-2"
                    />
                    <div className="flex justify-between text-xs text-slate-500 mt-2 font-mono">
                      <span>C1 (Methane)</span>
                      <span>C4 (Butane)</span>
                      <span>C8 (Octane)</span>
                    </div>
                  </div>
                </div>

                {/* Analytical Card */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
                  <h4 className="font-bold text-white border-b border-slate-800 pb-2">Homologous Properties</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Formula:</span>
                      <span className="font-mono font-bold text-cyan-400">{alkaneInfo.formula}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">State at 25°C:</span>
                      <span className="font-semibold text-amber-400">{alkaneInfo.state}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Est. Boiling Pt:</span>
                      <span className="font-mono text-emerald-400">{alkaneInfo.bp} °C</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Difference from prev:</span>
                      <span className="font-mono text-slate-200">-CH₂- (14 amu)</span>
                    </div>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs text-slate-400">
                    <strong>Rule: </strong> Straight-chain alkanes follow CₙH₂ₙ₊₂. Boiling point increases with molecular weight due to growing London dispersion forces.
                  </div>
                </div>
              </div>
            )}

            {/* LAB 2: DECARBOXYLATION SYNTHESIS */}
            {activeLabIndex === 1 && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                  <DecarboxylationApparatusSVG isHeating={isHeatingDecarb} reactant={decarbReactant} gasBubbles={bubbleCounter} />

                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-wrap gap-4 justify-between items-center">
                    <div className="flex items-center gap-3">
                      <label className="text-xs font-bold text-slate-400 uppercase">Reactant Salt:</label>
                      <select
                        value={decarbReactant}
                        onChange={(e) => {
                          setDecarbReactant(e.target.value as 'acetate' | 'propionate');
                          setIsHeatingDecarb(false);
                          audioManager.play('pop');
                        }}
                        className="bg-slate-950 border border-slate-700 text-cyan-400 font-bold text-sm rounded-lg px-3 py-2"
                      >
                        <option value="acetate">Sodium Acetate (CH₃COONa) → Methane</option>
                        <option value="propionate">Sodium Propionate (C₂H₅COONa) → Ethane</option>
                      </select>
                    </div>

                    <button
                      onClick={() => {
                        setIsHeatingDecarb(!isHeatingDecarb);
                        audioManager.play(isHeatingDecarb ? 'whoosh' : 'sparkle');
                      }}
                      className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${
                        isHeatingDecarb
                          ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg'
                          : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg'
                      }`}
                    >
                      {isHeatingDecarb ? 'Extinguish Flame' : 'Ignite Bunsen Burner'}
                    </button>
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
                  <h4 className="font-bold text-white border-b border-slate-800 pb-2">Reaction Parameters</h4>
                  <div className="space-y-3 text-xs">
                    <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                      <div className="text-slate-400">Soda Lime Composition:</div>
                      <div className="text-cyan-400 font-mono font-bold mt-1">NaOH + CaO (Quicklime)</div>
                    </div>
                    <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                      <div className="text-slate-400">Gas Collection Method:</div>
                      <div className="text-emerald-400 font-semibold mt-1">Downward displacement of water</div>
                    </div>
                    <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                      <div className="text-slate-400">Carbon Atom Loss (n - 1):</div>
                      <div className="text-amber-400 font-semibold mt-1">
                        {decarbReactant === 'acetate' ? '2 Carbons Salt → 1 Carbon Methane' : '3 Carbons Salt → 2 Carbons Ethane'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* LAB 3: WURTZ REACTION & REDUCTION */}
            {activeLabIndex === 2 && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                  <WurtzReactionSVG alkyl1={wurtzAlkyl1} alkyl2={wurtzAlkyl2} isReacting={isWurtzReacting} />

                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-slate-400 uppercase">Alkyl Halide 1:</label>
                        <select
                          value={wurtzAlkyl1}
                          onChange={(e) => setWurtzAlkyl1(e.target.value)}
                          className="w-full mt-1 bg-slate-950 border border-slate-700 text-white rounded-lg p-2 text-sm"
                        >
                          <option value="CH₃I">Methyl Iodide (CH₃I)</option>
                          <option value="C₂H₅Br">Ethyl Bromide (C₂H₅Br)</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-400 uppercase">Alkyl Halide 2:</label>
                        <select
                          value={wurtzAlkyl2}
                          onChange={(e) => setWurtzAlkyl2(e.target.value)}
                          className="w-full mt-1 bg-slate-950 border border-slate-700 text-white rounded-lg p-2 text-sm"
                        >
                          <option value="CH₃I">Methyl Iodide (CH₃I)</option>
                          <option value="C₂H₅Br">Ethyl Bromide (C₂H₅Br)</option>
                        </select>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setIsWurtzReacting(true);
                        audioManager.play('balance');
                        setTimeout(() => setIsWurtzReacting(false), 2000);
                      }}
                      className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2.5 rounded-xl transition-all shadow-lg"
                    >
                      Trigger Wurtz Coupling Reaction
                    </button>
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
                  <h4 className="font-bold text-white border-b border-slate-800 pb-2">Coupling Yield Analysis</h4>
                  <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs">
                    <div className="text-slate-400">Main Product Formula:</div>
                    <div className="text-cyan-400 font-mono font-bold mt-1">{getWurtzProductText().formula}</div>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs">
                    <div className="text-slate-400">Yield Quality:</div>
                    <div className="text-amber-400 font-semibold mt-1">{getWurtzProductText().yield}</div>
                  </div>
                  <div className="p-3 bg-rose-950/40 border border-rose-800 rounded-lg text-xs text-rose-300">
                    <strong>Wurtz Limitation: </strong> Methane (CH₄) cannot be produced via Wurtz coupling because coupling requires joining two alkyl radicals (R-R).
                  </div>
                </div>
              </div>
            )}

            {/* LAB 4: CATALYTIC HYDROGENATION */}
            {activeLabIndex === 3 && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
                  <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 text-center">
                    <div className="text-xs uppercase text-slate-400 font-bold tracking-wider mb-2">Reactor Catalytic Chamber</div>
                    <div className="text-2xl font-mono font-bold text-cyan-400 mb-4">
                      {unsaturatedReactant === 'ethene' ? 'CH₂=CH₂ + H₂' : 'HC≡CH + 2H₂'} —({catalyst}, {tempCelsius}°C)→ C₂H₆ (Ethane)
                    </div>
                    <div className="flex justify-center gap-4">
                      <span className="px-3 py-1 bg-slate-800 text-emerald-400 rounded-full text-xs border border-emerald-800">
                        Bonding: Unsaturated → Saturated Alkane
                      </span>
                      <span className="px-3 py-1 bg-slate-800 text-amber-400 rounded-full text-xs border border-amber-800">
                        Catalyst Bed: {catalyst} Active
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-400 uppercase">Reactant:</label>
                      <select
                        value={unsaturatedReactant}
                        onChange={(e) => setUnsaturatedReactant(e.target.value as 'ethene' | 'ethyne')}
                        className="w-full mt-1 bg-slate-950 border border-slate-700 text-white rounded-lg p-2 text-sm"
                      >
                        <option value="ethene">Ethene (C₂H₄, Double Bond)</option>
                        <option value="ethyne">Ethyne (C₂H₂, Triple Bond)</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-400 uppercase">Catalyst:</label>
                      <select
                        value={catalyst}
                        onChange={(e) => setCatalyst(e.target.value as 'Ni' | 'Pt' | 'Pd')}
                        className="w-full mt-1 bg-slate-950 border border-slate-700 text-white rounded-lg p-2 text-sm"
                      >
                        <option value="Ni">Nickel (Ni) [200-300°C]</option>
                        <option value="Pt">Platinum (Pt) [Room Temp]</option>
                        <option value="Pd">Palladium (Pd) [Room Temp]</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-400 uppercase">Temp: {tempCelsius}°C</label>
                      <input
                        type="range"
                        min="25"
                        max="350"
                        value={tempCelsius}
                        onChange={(e) => setTempCelsius(parseInt(e.target.value))}
                        className="w-full mt-3 accent-cyan-500"
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setIsHydrogenating(true);
                      audioManager.play('chime');
                      setTimeout(() => setIsHydrogenating(false), 1500);
                    }}
                    className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg"
                  >
                    Inject Hydrogen Gas & Heat Reactor
                  </button>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
                  <h4 className="font-bold text-white border-b border-slate-800 pb-2">Reaction Insights</h4>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    Sabatier-Senderens Reaction converts unsaturated hydrocarbons (alkenes & alkynes) into saturated alkanes by adding H₂ across C=C or C≡C bonds.
                  </p>
                  <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs text-cyan-300">
                    Stoichiometry: Ethyne (triple bond) requires <strong>2 moles</strong> of H₂ per mole of hydrocarbon!
                  </div>
                </div>
              </div>
            )}

            {/* LAB 5: HALOGENATION & COMBUSTION */}
            {activeLabIndex === 4 && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
                    <h4 className="font-bold text-white">Halogenation & Combustion Control Console</h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Halogenation light slider */}
                      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                        <label className="text-xs font-bold text-slate-400 uppercase block mb-2">
                          Light Condition: <span className="text-cyan-400">{lightCondition.toUpperCase()}</span>
                        </label>
                        <div className="flex gap-2">
                          {(['dark', 'diffused', 'direct'] as const).map((mode) => (
                            <button
                              key={mode}
                              onClick={() => setLightCondition(mode)}
                              className={`flex-1 py-1.5 rounded text-xs font-bold border transition-all ${
                                lightCondition === mode
                                  ? 'bg-cyan-600 border-cyan-400 text-white'
                                  : 'bg-slate-900 border-slate-800 text-slate-400'
                              }`}
                            >
                              {mode}
                            </button>
                          ))}
                        </div>
                        <button
                          onClick={() => triggerHalogenationOrCombustion('halogenation')}
                          className="w-full mt-3 bg-cyan-700 hover:bg-cyan-600 text-white text-xs font-bold py-2 rounded-lg"
                        >
                          Run Halogenation (CH₄ + Cl₂)
                        </button>
                      </div>

                      {/* Combustion O2 Slider */}
                      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                        <label className="text-xs font-bold text-slate-400 uppercase block mb-2">
                          O₂ Ratio per CH₄: <span className="text-amber-400">{o2Ratio.toFixed(1)} : 1</span>
                        </label>
                        <input
                          type="range"
                          min="0.5"
                          max="3.0"
                          step="0.5"
                          value={o2Ratio}
                          onChange={(e) => setO2Ratio(parseFloat(e.target.value))}
                          className="w-full accent-amber-500 mb-2"
                        />
                        <button
                          onClick={() => triggerHalogenationOrCombustion('combustion')}
                          className="w-full bg-amber-700 hover:bg-amber-600 text-white text-xs font-bold py-2 rounded-lg"
                        >
                          Trigger Combustion Chamber
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Log Console */}
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs text-slate-300 h-48 overflow-y-auto space-y-1 shadow-inner">
                    <div className="text-slate-500 font-bold border-b border-slate-800 pb-1 mb-2">--- REACTION LOG ---</div>
                    {reactionLog.length === 0 && <div className="text-slate-600 italic">No reaction triggered yet.</div>}
                    {reactionLog.map((log, i) => (
                      <div key={i} className="leading-relaxed">
                        {log}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
                  <h4 className="font-bold text-white border-b border-slate-800 pb-2">Observation Checklist</h4>
                  <div className="space-y-4">
                    {OBSERVATION_QUESTIONS.map((oq, idx) => (
                      <div key={idx} className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs">
                        <div className="text-cyan-300 font-semibold mb-2">{oq.question}</div>
                        <div className="text-slate-400 italic">
                          Correct Observation: {oq.observableOptions[oq.correctIndex]}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================== */}
        {/* TAB 3: ADAPTIVE CHALLENGES ENGINE (22 CARDS) */}
        {/* ========================================== */}
        {activeTab === 'challenges' && (
          <div className="space-y-6">
            {/* Challenge Progress Header */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-wrap justify-between items-center gap-4">
              <div>
                <span className="text-xs uppercase text-slate-400 font-bold">
                  Challenge {currentChallengeIdx + 1} of {CHALLENGES.length}
                </span>
                <h3 className="text-lg font-bold text-white">
                  Tier:{' '}
                  <span
                    className={
                      CHALLENGES[currentChallengeIdx].difficulty === 'foundation'
                        ? 'text-emerald-400'
                        : CHALLENGES[currentChallengeIdx].difficulty === 'standard'
                        ? 'text-amber-400'
                        : 'text-rose-400'
                    }
                  >
                    {CHALLENGES[currentChallengeIdx].difficulty.toUpperCase()}
                  </span>{' '}
                  ({CHALLENGES[currentChallengeIdx].competencyLevel})
                </h3>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-cyan-400 font-mono">Score: {userScore} pts</span>
                <button
                  onClick={prevChallenge}
                  disabled={currentChallengeIdx === 0}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs font-bold rounded-lg text-slate-300"
                >
                  Prev
                </button>
                <button
                  onClick={nextChallenge}
                  disabled={currentChallengeIdx === CHALLENGES.length - 1}
                  className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 text-xs font-bold rounded-lg text-white"
                >
                  Next
                </button>
              </div>
            </div>

            {/* Active Challenge Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              <p className="text-base font-semibold text-slate-100 leading-relaxed">
                {CHALLENGES[currentChallengeIdx].question}
              </p>

              {/* Options */}
              <div className="grid grid-cols-1 gap-3">
                {CHALLENGES[currentChallengeIdx].options?.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswerSubmit(idx)}
                    disabled={challengeAnswered}
                    className={`p-4 rounded-xl text-left border text-sm font-medium transition-all ${
                      selectedOption === idx
                        ? idx === CHALLENGES[currentChallengeIdx].correctIndex
                          ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
                          : 'bg-rose-950 border-rose-500 text-rose-200'
                        : challengeAnswered && idx === CHALLENGES[currentChallengeIdx].correctIndex
                        ? 'bg-emerald-950/60 border-emerald-600 text-emerald-300'
                        : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-cyan-400">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{option}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Hint Bubble Component Integration */}
              <HintBubble show={showHint} text={CHALLENGES[currentChallengeIdx].hints[currentHintIdx]} />

              {/* Action Bar */}
              <div className="flex flex-wrap items-center justify-between border-t border-slate-800 pt-4 gap-3">
                <button
                  onClick={() => {
                    setShowHint(true);
                    setCurrentHintIdx((prev) => (prev + 1) % 3);
                    audioManager.play('hint');
                  }}
                  className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
                >
                  💡 Request Hint ({currentHintIdx + 1}/3)
                </button>

                {challengeAnswered && (
                  <div className="text-xs text-slate-400 italic">
                    Node Ref: <span className="text-cyan-400 font-mono">{CHALLENGES[currentChallengeIdx].nodeId}</span>
                  </div>
                )}
              </div>

              {/* Detailed Explanation Banner */}
              {challengeAnswered && (
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs text-slate-300 space-y-2 animate-fade-in">
                  <div className="font-bold text-cyan-400 text-sm">Detailed Explanation:</div>
                  <p>{CHALLENGES[currentChallengeIdx].explanation}</p>

                  {CHALLENGES[currentChallengeIdx].misconceptionIndex !== undefined && (
                    <div className="mt-2 p-3 bg-amber-950/40 border border-amber-800/60 rounded-lg text-amber-200">
                      <strong>Misconception Alert: </strong>
                      {MISCONCEPTIONS[CHALLENGES[currentChallengeIdx].misconceptionIndex!].misconception}{' '}
                      <br />
                      <span className="text-slate-300">
                        {MISCONCEPTIONS[CHALLENGES[currentChallengeIdx].misconceptionIndex!].correction}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* TAB 4: MASTERY SUMMARY & REAL WORLD      */}
        {/* ========================================== */}
        {activeTab === 'summary' && (
          <div className="space-y-6">
            {/* Real World Activity Section */}
            <div className="bg-slate-900 border border-cyan-800/60 rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-bold text-cyan-400 mb-2">{REAL_WORLD_ACTIVITY.title}</h3>
              <p className="text-slate-300 text-sm mb-4">{REAL_WORLD_ACTIVITY.description}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                  <div key={idx} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs text-slate-300">
                    {step}
                  </div>
                ))}
              </div>
            </div>

            {/* BKT & Node Mastery Breakdown Grid */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3">
                Concept Mastery Tracker (Bayesian Knowledge Tracing)
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {ALL_NODE_IDS.map((nodeId) => {
                  const bkt = bktStates[nodeId];
                  const mastery = masteryProb(bkt);
                  return (
                    <div key={nodeId} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between space-y-2">
                      <div>
                        <div className="text-[10px] font-mono text-cyan-400 uppercase">{nodeId}</div>
                        <div className="text-xs font-bold text-slate-200 line-clamp-2 mt-1">
                          {nodeId}
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-[11px] font-semibold text-slate-400 mb-1">
                          <span>Mastery:</span>
                          <span className="text-emerald-400 font-mono">{(mastery * 100).toFixed(0)}%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: `${mastery * 100}%` }} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Misconceptions Reference Library */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3">
                Key Organic Chemistry Misconceptions Cleared
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MISCONCEPTIONS.map((item) => (
                  <div key={item.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs space-y-2">
                    <div className="text-rose-400 font-bold">❌ Misconception: {item.misconception}</div>
                    <div className="text-emerald-300">✅ ICSE Fact: {item.correction}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}