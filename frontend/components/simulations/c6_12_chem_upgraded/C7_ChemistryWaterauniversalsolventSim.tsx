'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update, ReviewItem } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, BKTState } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ==========================================
// CONSTANTS & NODE DEFINITIONS
// ==========================================

const ALL_NODE_IDS = ['c7_chem_017', 'c7_chem_018', 'c7_chem_019', 'c7_chem_020'] as const;
type NodeId = typeof ALL_NODE_IDS[number];

const NODE_INFO: Record<NodeId, { title: string; desc: string; color: string }> = {
  c7_chem_017: {
    title: 'Universal Solvent & Molecular Dipoles',
    desc: 'Understand polar dissolution, hydration shells, and why water dissolves more substances than any other liquid.',
    color: '#3B82F6',
  },
  c7_chem_018: {
    title: 'Solubility & Saturation Factors',
    desc: 'Explore solute-solvent interactions, saturated vs unsaturated solutions, and temperature/pressure curves.',
    color: '#10B981',
  },
  c7_chem_019: {
    title: 'Hard vs Soft Water Chemistry',
    desc: 'Investigate calcium and magnesium salts, lather formation, temporary vs permanent hardness, and removal.',
    color: '#8B5CF6',
  },
  c7_chem_020: {
    title: 'Water Purification & Distillation',
    desc: 'Master multi-stage filtration, boiling, chlorination, reverse osmosis, and pure vs potable water standard.',
    color: '#EC4899',
  },
};

// ==========================================
// MANDATORY SECTION 1: SCENARIO
// ==========================================

const SCENARIO = {
  title: 'AquaPure Research & Environmental Water Chemistry Lab',
  intro: 'Welcome to the AquaPure Analytical Laboratory! You have been appointed as Lead Water Chemist to investigate the unique chemical behavior of water, test global water samples, and design clean purification systems for municipal supplies.',
  context: 'Through interactive simulations, you will analyze molecular dipole interactions, measure solute dissolution rates at varying temperatures, distinguish temporary from permanent hard water, and engineer multi-stage purification columns.',
};

// ==========================================
// MANDATORY SECTION 2: DISCOVERY QUESTION
// ==========================================

const DISCOVERY_QUESTION = {
  question: 'Why is liquid water called the "Universal Solvent" despite failing to dissolve cooking oil, petrol, or sand?',
  options: [
    'It dissolves every solid, liquid, and gas known to human science without exception.',
    'It dissolves a wider variety and larger total number of substances than any other liquid due to its polar molecular structure.',
    'It converts all dissolved solids into liquid water through a chemical melting process.',
    'It only dissolves substances when heated to its exact boiling point of 100°C.',
  ],
  correctIndex: 1,
  hintAfter: 'Water is polar (O is δ-, H is δ+), allowing it to pull apart ionic lattices and polar covalent molecules, though non-polar oils lack charges to interact with water dipoles.',
};

// ==========================================
// MANDATORY SECTION 3: EXPLORATION STEPS
// ==========================================

const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Molecular Polar Dissolution & Hydration Shells',
    instruction: 'Toggle between NaCl (Ionic) and Cooking Oil (Non-Polar). Adjust the molecular dipole display to see oxygen (δ-) and hydrogen (δ+) ends hydrate salt ions.',
    interactionType: 'polar-dissolution-visualizer',
    nodeId: 'c7_chem_017' as NodeId,
  },
  {
    title: 'Lab 2: Saturation Chamber & Solubility Temperature Curves',
    instruction: 'Select a solute (KNO₃, NaCl, CuSO₄), adjust temperature from 0°C to 100°C, add solute grams, and observe crystal precipitation vs complete dissolution.',
    interactionType: 'solubility-temperature-chamber',
    nodeId: 'c7_chem_018' as NodeId,
  },
  {
    title: 'Lab 3: Hard Water Soap Lather & Scum Titration',
    instruction: 'Compare Soft Water, Temporary Hard Water [Ca(HCO₃)₂], and Permanent Hard Water (MgSO₄). Add soap drops, boil the sample, or add Washing Soda to measure lather height.',
    interactionType: 'hard-water-soap-tester',
    nodeId: 'c7_chem_019' as NodeId,
  },
  {
    title: 'Lab 4: Multi-Stage Water Purification Column',
    instruction: 'Build a multi-stage water filter with Sedimentation, Sand, Charcoal, Boiling, Chlorination, and Reverse Osmosis (RO) to transform muddy river water into 100% pure potable water.',
    interactionType: 'purification-column-builder',
    nodeId: 'c7_chem_020' as NodeId,
  },
  {
    title: 'Lab 5: Industrial Distillation & Potable Water Analyzer',
    instruction: 'Operate the Liebig Condenser distillation apparatus, heat salt solution to 100°C, collect pure distillate, and test TDS (Total Dissolved Solids) and electrical conductivity.',
    interactionType: 'distillation-tds-analyzer',
    nodeId: 'c7_chem_020' as NodeId,
  },
];

// ==========================================
// MANDATORY SECTION 4: PREDICTION QUESTIONS
// ==========================================

const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: What happens to the solubility of potassium nitrate (KNO₃) in water when the liquid temperature increases from 20°C to 80°C?',
    options: [
      'Solubility decreases significantly, causing instant crystal precipitation.',
      'Solubility increases dramatically, allowing more than three times as much solid to dissolve.',
      'Solubility stays completely unchanged because temperature does not affect solids.',
      'The solute turns into gas and escapes from the beaker.',
    ],
    correctIndex: 1,
    verifyInstruction: 'In Lab 2, select KNO₃, set temperature to 80°C, and observe the steep rise in the solubility graph!',
    nodeId: 'c7_chem_018' as NodeId,
  },
  {
    question: 'Predict: If temporary hard water containing dissolved calcium hydrogen carbonate [Ca(HCO₃)₂] is boiled, what will form in the flask?',
    options: [
      'Insoluble calcium carbonate (CaCO₃) white precipitate scale, releasing carbon dioxide gas.',
      'Pure calcium metal floating on top of the liquid.',
      'Strong hydrochloric acid solution.',
      'Permanent hard water containing dissolved calcium sulphate.',
    ],
    correctIndex: 0,
    verifyInstruction: 'In Lab 3, select Temporary Hard Water, click "Boil Sample", and observe the white precipitating scum!',
    nodeId: 'c7_chem_019' as NodeId,
  },
];

// ==========================================
// MANDATORY SECTION 5: OBSERVATION QUESTIONS
// ==========================================

const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice about how water molecules orient themselves around a positively charged Sodium ion (Na⁺)?',
    observableOptions: [
      'The partial negative Oxygen atoms (δ-) point directly inward toward the positive Sodium ion.',
      'The partial positive Hydrogen atoms (δ+) point directly inward toward the positive Sodium ion.',
      'Water molecules stay far away and form a rigid cage around negative ions only.',
      'Water molecules decompose into oxygen gas immediately upon touching Sodium.',
    ],
    correctIndex: 0,
    nodeId: 'c7_chem_017' as NodeId,
  },
  {
    question: 'What happens when soap is added to permanent hard water containing Magnesium Sulphate (MgSO₄) without chemical treatment?',
    observableOptions: [
      'Thick persistent soapy foam lather forms effortlessly with just one drop of soap.',
      'Soap reacts with Mg²⁺ ions forming a grey insoluble precipitate (scum) with zero lather until ions are precipitated.',
      'The liquid freezes into ice instantly.',
      'The water becomes completely distilled and loses all conductivity.',
    ],
    correctIndex: 1,
    nodeId: 'c7_chem_019' as NodeId,
  },
];

// ==========================================
// MANDATORY SECTION 6: REAL WORLD ACTIVITY
// ==========================================

const REAL_WORLD_ACTIVITY = {
  title: 'Municipal Water Quality Audit & Treatment Design',
  description: 'As a public health engineer, you are tasked with analyzing raw river water supplied to a town of 50,000 residents and engineering an economical purification plant.',
  steps: [
    'Step 1: Test raw river sample — Initial Turbidity = 120 NTU, Bacterial Count = 4500 CFU/mL, Hardness = 280 mg/L Ca(HCO₃)₂ (Temporary Hardness).',
    'Step 2: Design Primary Sedimentation & Coagulation using Alum [Al₂(SO₄)₃] to drop turbidity from 120 NTU down to 5 NTU.',
    'Step 3: Run Rapid Sand Filtration & Activated Charcoal adsorption to remove micro-particles and odor, reducing turbidity to 0.4 NTU.',
    'Step 4: Treat temporary hardness with Slaked Lime [Ca(OH)₂] precipitation or thermal boiling, and add Chlorine (0.5 ppm) to ensure 0 CFU/mL pathogens before pipe distribution.',
  ],
};

// ==========================================
// EXPANDED MISCONCEPTIONS (6 ITEMS)
// ==========================================

const MISCONCEPTIONS = [
  {
    id: 'misc_universal_solvent',
    misconception: 'Water as a universal solvent can dissolve absolutely every substance without exception.',
    correction: 'Water is called a universal solvent because it dissolves more substances than any other liquid, but non-polar substances like oil, wax, and sand are insoluble due to molecular polarity mismatch.',
  },
  {
    id: 'misc_hard_water_touch',
    misconception: 'Hard water is physically hard to touch or contains ice chunks.',
    correction: 'Hard water is liquid water containing high concentrations of dissolved mineral ions (Ca²⁺ and Mg²⁺). It feels identical to touch but forms scum instead of soap lather.',
  },
  {
    id: 'misc_dissolving_vs_melting',
    misconception: 'Dissolving a solid in water is identical to melting it with heat.',
    correction: 'Melting is a single-substance phase transition caused by heat breakdown of solid bonds. Dissolving is a physical mixture process where solvent molecules break solute solute forces and surround solute particles.',
  },
  {
    id: 'misc_clear_water_pure',
    misconception: 'Clear and transparent water is always pure, safe, and distilled drinking water.',
    correction: 'Water can look crystal clear while harboring invisible dissolved heavy metals (arsenic, lead), toxic chemical fertilizers, or invisible pathogenic bacteria.',
  },
  {
    id: 'misc_boiling_purifies_all',
    misconception: 'Boiling polluted water removes all types of harmful contaminants completely.',
    correction: 'Boiling kills living microorganisms (bacteria, viruses, parasites) but cannot remove dissolved toxic chemicals, heavy metals, or nitrates, which actually concentrate as steam leaves.',
  },
  {
    id: 'misc_distilled_vs_potable',
    misconception: 'Distilled water is the healthiest drinking water for long-term daily consumption.',
    correction: 'Pure distilled water lacks essential dissolved minerals (Ca²⁺, Mg²⁺, K⁺, HCO₃⁻) needed by the human body and tastes flat. Potable water should be clean and biologically safe with healthy mineral content.',
  },
];

// ==========================================
// DIAGNOSTIC QUESTIONS (8 ITEMS)
// ==========================================

const DIAGNOSTIC_QUESTIONS = [
  {
    id: 'diag_1',
    nodeId: 'c7_chem_017' as NodeId,
    question: 'What structural property gives water molecules their high electric dipole moment?',
    options: [
      'Linear molecular shape with equal sharing of electrons between H and O atoms.',
      'Bent V-shape geometry (104.5°) with high electronegativity of oxygen attracting bonding electrons.',
      'Triple covalent bond between hydrogen atoms.',
      'Complete transfer of electrons producing free metallic ions.',
    ],
    correctIndex: 1,
    explanation: 'Oxygen is highly electronegative and pulls shared electrons closer, giving Oxygen a partial negative charge (δ-) and Hydrogens partial positive charges (δ+) in a bent non-linear shape.',
  },
  {
    id: 'diag_2',
    nodeId: 'c7_chem_017' as NodeId,
    question: 'Why does sodium chloride (NaCl) readily dissolve in water?',
    options: [
      'Water reacts chemically with NaCl to produce sodium hydroxide gas.',
      'Water dipoles break the ionic lattice through ion-dipole attractions, forming protective hydration shells around Na⁺ and Cl⁻.',
      'NaCl melts at room temperature when immersed in any fluid.',
      'Salt molecules evaporate into air above the beaker.',
    ],
    correctIndex: 1,
    explanation: 'The negative oxygen ends of H₂O attract Na⁺ cations, while positive hydrogen ends attract Cl⁻ anions, overcoming the ionic lattice energy.',
  },
  {
    id: 'diag_3',
    nodeId: 'c7_chem_018' as NodeId,
    question: 'What defines a "saturated solution" at a specific temperature?',
    options: [
      'A solution where solute crystals freeze into solid ice.',
      'A solution that contains maximum dissolved solute, such that no more solute can dissolve at that temperature.',
      'A solution containing equal volumes of oil and water.',
      'A solution that has been boiled until all water evaporates.',
    ],
    correctIndex: 1,
    explanation: 'A saturated solution holds maximum solute at dynamic equilibrium where rate of dissolution equals rate of crystallization at a fixed temperature.',
  },
  {
    id: 'diag_4',
    nodeId: 'c7_chem_018' as NodeId,
    question: 'How does increasing temperature generally affect the solubility of most solid solutes in liquid water?',
    options: [
      'Solubility decreases to zero for all solids.',
      'Solubility increases because thermal energy increases kinetic motion and solvent particle spacing.',
      'Solubility drops by 50% for every 10°C rise.',
      'Solubility changes only when pressure is increased to 100 atm.',
    ],
    correctIndex: 1,
    explanation: 'Higher kinetic energy breaks solute crystal lattices more easily, increasing solid solubility for most salts like KNO₃ and CuSO₄.',
  },
  {
    id: 'diag_5',
    nodeId: 'c7_chem_019' as NodeId,
    question: 'Which chemical compound is responsible for temporary hardness in water?',
    options: [
      'Calcium Hydrogen Carbonate [Ca(HCO₃)₂]',
      'Calcium Sulphate [CaSO₄]',
      'Magnesium Chloride [MgCl₂]',
      'Sodium Chloride [NaCl]',
    ],
    correctIndex: 0,
    explanation: 'Bicarbonates of calcium and magnesium [Ca(HCO₃)₂ and Mg(HCO₃)₂] cause temporary hardness because they decompose upon boiling to form insoluble carbonates.',
  },
  {
    id: 'diag_6',
    nodeId: 'c7_chem_019' as NodeId,
    question: 'Why can permanent hard water NOT be softened by simple boiling?',
    options: [
      'Permanent hardness is caused by dissolved sulphates and chlorides of Ca and Mg, which do not decompose when heated.',
      'Boiling turns hard water into solid stone.',
      'Permanent hard water contains zero dissolved minerals.',
      'Boiling increases the concentration of soap in the water.',
    ],
    correctIndex: 0,
    explanation: 'CaSO₄, MgSO₄, CaCl₂, and MgCl₂ remain soluble upon heating; removing them requires chemical precipitation (e.g. Washing Soda Na₂CO₃) or ion exchange.',
  },
  {
    id: 'diag_7',
    nodeId: 'c7_chem_020' as NodeId,
    question: 'What primary role does Activated Charcoal play in a multi-stage water treatment column?',
    options: [
      'It kills 100% of virus particles through high thermal heat.',
      'It adsorbs organic impurities, foul odors, unpleasant taste, and residual chlorine molecules on its porous surface.',
      'It dissolves calcium minerals to turn soft water hard.',
      'It filters out large stones through physical sieving only.',
    ],
    correctIndex: 1,
    explanation: 'Activated charcoal has massive surface area that adsorbs dissolved organic compounds, chlorine, and taste/odor molecules.',
  },
  {
    id: 'diag_8',
    nodeId: 'c7_chem_020' as NodeId,
    question: 'How does Reverse Osmosis (RO) purify water compared to ordinary sand filtration?',
    options: [
      'RO uses a semi-permeable membrane under high pressure to force water through pores small enough to block dissolved salts and heavy metals.',
      'RO heats water to 500°C to turn it into plasma.',
      'RO uses gravity settling to drop heavy sand particles.',
      'RO freezes water and removes top ice crystals.',
    ],
    correctIndex: 0,
    explanation: 'RO forces water against osmotic pressure through microscopic synthetic pores (approx 0.0001 micron), filtering out dissolved mineral ions and microorganisms.',
  },
];

// ==========================================
// 22 PROGRESSIVE CHALLENGES (TIERS 1, 2, 3)
// ==========================================

interface Challenge {
  id: string;
  nodeId: NodeId;
  type: 'mcq' | 'matching' | 'numeric' | 'drag-sort';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: string;
  question: string;
  options?: string[];
  correctIndex?: number;
  correctAnswer?: number | string;
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
}

const CHALLENGES: Challenge[] = [
  // --- TIER 1: FOUNDATION (7 Challenges) ---
  {
    id: 'c1',
    nodeId: 'c7_chem_017',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Recall & Identification',
    question: 'Which chemical term describes a liquid capable of dissolving another substance to form a uniform homogeneous mixture?',
    options: ['Solute', 'Solvent', 'Precipitate', 'Suspension'],
    correctIndex: 1,
    explanation: 'A solvent is the dissolving medium (like water), whereas the solute is the substance being dissolved (like salt or sugar).',
    hints: ['Think of what water represents in a sugar solution.', 'It is the bulk fluid doing the dissolving work.', 'Solvent dissolves solute.'],
    misconceptionIndex: 0,
  },
  {
    id: 'c2',
    nodeId: 'c7_chem_017',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Molecular Understanding',
    question: 'What is the partial charge present on the Oxygen atom in a polar water molecule (H₂O)?',
    options: ['Partial positive (δ+)', 'Partial negative (δ-)', 'Zero net charge (neutral)', 'Full +2 ionic charge'],
    correctIndex: 1,
    explanation: 'Oxygen attracts shared covalent electrons more strongly than Hydrogen due to higher electronegativity, creating a partial negative charge (δ-).',
    hints: ['Oxygen is electronegative.', 'Electrons carry negative charge.', 'Oxygen pulls shared electrons closer, becoming partial negative (δ-).'],
  },
  {
    id: 'c3',
    nodeId: 'c7_chem_018',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Concept Recall',
    question: 'What type of solution is formed when no more solute can dissolve in the solvent at a given room temperature?',
    options: ['Unsaturated solution', 'Super-unsaturated solution', 'Saturated solution', 'Dilute gas solution'],
    correctIndex: 2,
    explanation: 'A saturated solution contains the maximum possible quantity of dissolved solute at a specific temperature.',
    hints: ['The solution has reached its maximum holding capacity.', 'Adding another crystal will cause it to sink without dissolving.', 'Saturated.'],
  },
  {
    id: 'c4',
    nodeId: 'c7_chem_019',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Observation & Hardness',
    question: 'What happens when soap is added to soft water (like rain water or distilled water)?',
    options: ['Scum forms instantly without any foam', 'Rich, abundant lather (foam) forms easily', 'Water turns solid black', 'Water boils spontaneously'],
    correctIndex: 1,
    explanation: 'Soft water lacks dissolved calcium and magnesium ions, allowing soap (sodium stearate) to produce rich lather easily.',
    hints: ['Soft water does not waste soap.', 'Think about washing hands with distilled water.', 'It lathers quickly and abundantly.'],
    misconceptionIndex: 1,
  },
  {
    id: 'c5',
    nodeId: 'c7_chem_019',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Chemical Formula Recall',
    question: 'Which metal cations are primarily responsible for causing hardness in natural ground water?',
    options: ['Na⁺ and K⁺', 'Ca²⁺ and Mg²⁺', 'Fe³⁺ and Cu²⁺', 'Al³⁺ and Zn²⁺'],
    correctIndex: 1,
    explanation: 'Calcium (Ca²⁺) and Magnesium (Mg²⁺) ions form insoluble precipitates with soap molecules, causing water hardness.',
    hints: ['These elements belong to Group 2 of the periodic table.', 'Calcium and Magnesium are key mineral salts in limestone and dolomite.', 'Ca²⁺ and Mg²⁺.'],
  },
  {
    id: 'c6',
    nodeId: 'c7_chem_020',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Purification Techniques',
    question: 'Which water purification method reliably kills pathogenic bacteria and viruses by thermal denaturation?',
    options: ['Simple Paper Filtration', 'Sedimentation', 'Boiling water for 10-15 minutes', 'Sieving through wire mesh'],
    correctIndex: 2,
    explanation: 'Boiling water at 100°C denatures micro-organism proteins, effectively killing bacteria, viruses, and cysts.',
    hints: ['Heat breaks bacterial cell membranes.', '100°C liquid boil.', 'Boiling.'],
    misconceptionIndex: 4,
  },
  {
    id: 'c7',
    nodeId: 'c7_chem_020',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Chemical Disinfection',
    question: 'Which halogen chemical agent is added in small controlled doses (0.2 - 0.5 ppm) to municipal drinking water to kill micro-organisms?',
    options: ['Iodine crystals', 'Chlorine gas / Bleach', 'Fluorine liquid', 'Helium gas'],
    correctIndex: 1,
    explanation: 'Chlorination uses chlorine or hypochlorite to disinfect public water supplies and prevent waterborne diseases like cholera and typhoid.',
    hints: ['It is commonly used in swimming pools.', 'Symbol Cl.', 'Chlorine.'],
  },

  // --- TIER 2: STANDARD (8 Challenges) ---
  {
    id: 'c8',
    nodeId: 'c7_chem_017',
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Solubility Analysis',
    question: 'Why do non-polar liquids like vegetable oil or petrol fail to dissolve in liquid water?',
    options: ['Oil molecules are too small to fit inside water atoms.', 'Water molecules attract each other strongly via hydrogen bonding and polar forces, squeezing out non-polar oil molecules.', 'Oil chemically converts water into solid stone.', 'Oil has a pH of 14 which neutralizes water.'],
    correctIndex: 1,
    explanation: 'Like dissolves like: Polar water molecules attract polar/ionic solutes. Non-polar oil cannot break strong water-water hydrogen bonds.',
    hints: ['Remember the principle "Like Dissolves Like".', 'Oil molecules lack partial electric charges (δ+ / δ-).', 'Water molecules prefer bonding with other polar water molecules.'],
    misconceptionIndex: 0,
  },
  {
    id: 'c9',
    nodeId: 'c7_chem_018',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Solubility Calculation',
    question: 'If 36 grams of NaCl dissolve in 100 g of water at 20°C to form a saturated solution, how many grams of NaCl are required to saturate 250 g of water at 20°C?',
    correctAnswer: 90,
    explanation: 'Solubility = (Mass of Solute / Mass of Solvent) × 100. So mass required = (36 / 100) × 250 = 90 grams.',
    hints: ['Multiply 36 by 2.5.', '36 g per 100 g means 3.6 g per 10 g.', '36 * 2.5 = 90.'],
  },
  {
    id: 'c10',
    nodeId: 'c7_chem_018',
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Crystallization & Temperature',
    question: 'A hot saturated solution of KNO₃ at 70°C contains 138 g of solute per 100 g water. When cooled to 20°C (solubility = 32 g/100g water), what will be observed?',
    options: ['All 138 g of KNO₃ will evaporate into air.', '106 g of KNO₃ will precipitate out as pure solid crystals.', 'The liquid volume will double.', 'The solution will remain completely unsaturated.'],
    correctIndex: 1,
    explanation: 'Precipitated mass = Solute at 70°C - Solute at 20°C = 138 g - 32 g = 106 g of crystals.',
    hints: ['Subtract solubility at 20°C from solubility at 70°C.', '138 - 32 = ?', '106 grams of solid crystals deposit.'],
  },
  {
    id: 'c11',
    nodeId: 'c7_chem_019',
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Chemical Equations of Hardness',
    question: 'What solid chemical precipitate causes scale formation inside tea kettles when temporary hard water is boiled?',
    options: ['Ca(HCO₃)₂ (Soluble)', 'CaCO₃ (Insoluble Calcium Carbonate)', 'NaCl (Common Salt)', 'CaSO�� (Calcium Sulphate)'],
    correctIndex: 1,
    explanation: 'Thermal decomposition reaction: Ca(HCO₃)₂ (aq) → CaCO₃ (s)↓ + H₂O (l) + CO₂ (g)↑. Insoluble CaCO₃ forms white scale.',
    hints: ['Bicarbonate breaks down when heated.', 'Carbonate salt is insoluble in water.', 'CaCO₃ precipitate.'],
  },
  {
    id: 'c12',
    nodeId: 'c7_chem_019',
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Chemical Hardness Removal',
    question: 'Which chemical compound is added to permanent hard water to remove Mg²⁺ and Ca²⁺ ions by forming insoluble carbonate precipitates?',
    options: ['Sodium Chloride (Table Salt)', 'Washing Soda [Na₂CO₃·10H₂O]', 'Vinegar [CH₃COOH]', 'Hydrochloric Acid [HCl]'],
    correctIndex: 1,
    explanation: 'Na₂CO₃ provides CO₃²⁻ ions: Ca²⁺ + CO₃²⁻ → CaCO₃↓ and Mg²⁺ + CO₃²⁻ → MgCO₃↓, effectively removing hardness.',
    hints: ['It is commonly used in laundry detergent additives.', 'Formula Na₂CO₃.', 'Washing Soda.'],
  },
  {
    id: 'c13',
    nodeId: 'c7_chem_020',
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Distillation Chemistry',
    question: 'In a laboratory Liebig condenser setup, what two physical phase changes occur sequentially to produce pure distilled water?',
    options: ['Freezing followed by Sublimation', 'Vaporization (Boiling) followed by Condensation', 'Melting followed by Dissolution', 'Oxidation followed by Reduction'],
    correctIndex: 1,
    explanation: 'Water boils into steam (Vaporization) leaving non-volatile salts behind, and the cool condenser turns steam back into liquid water (Condensation).',
    hints: ['Liquid turns to gas, then gas turns back to pure liquid.', 'Boiling creates steam, cooling creates distillate droplets.', 'Vaporization then Condensation.'],
  },
  {
    id: 'c14',
    nodeId: 'c7_chem_020',
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Potable vs Distilled Water',
    question: 'Why is 100% pure distilled water generally considered flat-tasting and unsuitable as sole drinking water for humans long-term?',
    options: ['It contains lethal doses of heavy metals.', 'It lacks essential dissolved minerals (Ca, Mg, electrolytes) that give natural drinking water its fresh taste and dietary nutrients.', 'It has a temperature of 200°C.', 'It cannot dissolve inside human blood.'],
    correctIndex: 1,
    explanation: 'Potable drinking water requires balanced essential minerals (TDS ~ 100-300 ppm). Pure distilled water lacks minerals and tastes flat.',
    hints: ['Distillation removes ALL dissolved minerals along with impurities.', 'Human body needs dietary electrolytes in drinking water.', 'Lacks essential dissolved minerals.'],
    misconceptionIndex: 5,
  },
  {
    id: 'c15',
    nodeId: 'c7_chem_018',
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Gas Solubility & Pressure',
    question: 'According to Henry\'s Law, how does increasing gas pressure above a liquid (such as CO₂ in carbonated soda bottles) affect gas solubility?',
    options: ['Gas solubility decreases to zero.', 'Gas solubility increases proportionally with pressure.', 'Gas turns into solid rock.', 'Pressure has zero impact on gas solubility.'],
    correctIndex: 1,
    explanation: 'Higher gas pressure forces more gas molecules to dissolve into the liquid solvent. When soda cans open, pressure drops and CO₂ fizzes out.',
    hints: ['Think of opening a sealed carbonated beverage bottle.', 'Sealed bottle high pressure keeps gas dissolved.', 'Solubility increases with pressure.'],
  },

  // --- TIER 3: ADVANCED (7 Challenges) ---
  {
    id: 'c16',
    nodeId: 'c7_chem_017',
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Hydration Shell Dynamics',
    question: 'When copper sulphate (CuSO₄) dissolves in water, blue hydrated ions [Cu(H₂O)₆]²⁺ are formed. Which specific atom of the water molecule directly forms coordinate covalent bonds with the central Cu²⁺ ion?',
    options: ['Hydrogen atom via its partial positive charge', 'Oxygen atom via its lone pairs of electrons', 'Sulphur atom from water', 'Copper atom from water'],
    correctIndex: 1,
    explanation: 'Oxygen has unshared electron pairs (lone pairs) and a partial negative charge (δ-), which donate electron density to the vacant d-orbitals of Cu²⁺.',
    hints: ['Consider which atom in water has unshared pairs of electrons.', 'Oxygen is electro-negative.', 'Oxygen lone pairs bond with positive metal cations.'],
  },
  {
    id: 'c17',
    nodeId: 'c7_chem_018',
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Supersaturated Concentration',
    question: 'At 80°C, 100 g of water dissolves 170 g of Sodium Acetate. If the solution is slowly cooled to 20°C without disturbance, keeping all 170 g dissolved in a supersaturated state (normal solubility at 20°C is 46 g/100g), how many grams of excess solute will instantly crystallize when a seed crystal is added?',
    correctAnswer: 124,
    explanation: 'Excess solute crystallizing = Total dissolved in supersaturated state - Saturated capacity at 20°C = 170 g - 46 g = 124 g.',
    hints: ['Subtract 46 from 170.', '170 - 46 = ?', '124 g of crystals.'],
  },
  {
    id: 'c18',
    nodeId: 'c7_chem_019',
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Soap Reaction Stoichiometry',
    question: 'When soap (Sodium Stearate: C₁₇H₃₅COONa) is added to hard water containing Calcium Chloride (CaCl₂), what is the chemical formula of the insoluble curd/scum precipitate formed?',
    options: ['(C₁₇H₃₅COO)₂Ca', 'CaCO₃', 'NaCl', 'C₁₇H₃₅COOH'],
    correctIndex: 0,
    explanation: 'Reaction: 2 C₁₇H₃₅COONa (aq) + CaCl₂ (aq) → (C₁₇H₃₅COO)₂Ca (s)↓ + 2 NaCl (aq). The insoluble calcium stearate is scum.',
    hints: ['Ca²⁺ has a +2 charge, so it pairs with two stearate anions (C₁₇H₃₅COO⁻).', '(C₁₇H₃₅COO)₂Ca.', 'Calcium Stearate curd.'],
  },
  {
    id: 'c19',
    nodeId: 'c7_chem_019',
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Ion Exchange Softening',
    question: 'Modern industrial water softeners use Synthetic Resin Columns loaded with Na⁺ ions (e.g. Zeolite / Permutit). How does this column soften permanent hard water containing MgSO₄?',
    options: ['It heats the water to 1000°C instantly.', 'It exchanges Mg²⁺ ions from water for Na⁺ ions on the resin, leaving soluble non-hardening sodium sulphate in water.', 'It converts Mg²⁺ into heavy uranium atoms.', 'It destroys all water molecules.'],
    correctIndex: 1,
    explanation: 'Ion-exchange resin traps divalent Ca²⁺ and Mg²�� ions and releases non-hardening Na⁺ ions into the effluent water.',
    hints: ['Divalent ions (Mg²⁺) stick to resin while releasing monovalent Na⁺.', 'Sodium salts do not cause hardness or soap scum.', 'Exchanges Mg²⁺ for Na⁺ ions.'],
  },
  {
    id: 'c20',
    nodeId: 'c7_chem_020',
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Advanced Membrane Physics',
    question: 'In Reverse Osmosis (RO) plants, hydraulic pressure applied to concentrated saltwater must exceed which natural thermodynamic property to force pure water through the semi-permeable membrane?',
    options: ['Atmospheric pressure', 'Osmotic pressure of the solution', 'Vapor pressure of liquid mercury', 'Surface tension of oil'],
    correctIndex: 1,
    explanation: 'Natural osmosis moves solvent from low to high solute concentration. Reverse osmosis requires applying external pressure exceeding the solution\'s Osmotic Pressure.',
    hints: ['Osmosis is the natural flow toward higher salt concentration.', 'RO reverses this natural flow by applying high pressure.', 'Osmotic Pressure.'],
  },
  {
    id: 'c21',
    nodeId: 'c7_chem_020',
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Multi-stage Water Engineering',
    question: 'Why is Alum [Potassium Aluminium Sulphate, KAl(SO₄)₂·12H₂O] added during the "Coagulation & Flocculation" stage of municipal water treatment plants?',
    options: ['To add pleasant strawberry flavor to drinking water.', 'Al³⁺ ions neutralize negative charges on suspended colloidal clay particles, causing them to clump into heavy flocs that settle easily.', 'To turn liquid water into ice.', 'To generate high voltage electricity.'],
    correctIndex: 1,
    explanation: 'Colloidal clay particles carry negative surface charges that prevent them from settling. Al³⁺ neutralizes charges, forming heavy settling flocs.',
    hints: ['Clay particles repel each other due to negative charges.', 'Al³⁺ neutralizes repulsion.', 'Coagulation forms settling flocs.'],
  },
  {
    id: 'c22',
    nodeId: 'c7_chem_018',
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Anomalous Solubility Curves',
    question: 'Unlike most salts, Cerium Sulphate [Ce₂(SO₄)₃] exhibits retrograde solubility: its solubility DECREASES as water temperature rises from 0°C to 100°C. What thermodynamic feature explains this?',
    options: ['Dissolution of Cerium Sulphate in water is strongly EXOTHERMIC (releases heat energy).', 'Cerium Sulphate melts into gold at 50°C.', 'Water turns into steam at 0°C in cerium solutions.', 'Cerium atoms lose all electrons.'],
    correctIndex: 0,
    explanation: 'According to Le Chatelier\'s principle, for an exothermic dissolution process (Heat released), adding thermal energy drives the equilibrium backward, decreasing solubility.',
    hints: ['Think of Le Chatelier\'s principle for exothermic reactions.', 'Heat is a product of exothermic dissolving.', 'Exothermic dissolution.'],
  },
];

// ==========================================
// MANDATORY SECTION 8: CUSTOM SVG DIAGRAMS
// ==========================================

const WaterMoleculeDipoleSVG: React.FC<{ activeTab?: string }> = () => (
  <svg viewBox="0 0 500 300" className="w-full h-auto bg-slate-900 rounded-xl shadow-lg border border-slate-700">
    <defs>
      <radialGradient id="oxyGrad" cx="35%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#EF4444" />
        <stop offset="100%" stopColor="#991B1B" />
      </radialGradient>
      <radialGradient id="hydGrad" cx="35%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#38BDF8" />
        <stop offset="100%" stopColor="#0284C7" />
      </radialGradient>
      <radialGradient id="naGrad" cx="35%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#B45309" />
      </radialGradient>
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>

    {/* Background Grid */}
    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#334155" strokeWidth="0.5" />
    </pattern>
    <rect width="500" height="300" fill="url(#grid)" opacity="0.4" />

    {/* Title */}
    <text x="250" y="30" textAnchor="middle" fill="#38BDF8" fontSize="16" fontWeight="bold">
      Polar Structure of Water & Ion-Dipole Hydration Shell
    </text>

    {/* Central Na+ Ion */}
    <g transform="translate(250, 160)">
      <circle r="28" fill="url(#naGrad)" filter="url(#glow)" />
      <text x="0" y="6" textAnchor="middle" fill="#FFFFFF" fontSize="16" fontWeight="bold">Na⁺</text>
    </g>

    {/* Water Molecule 1 Top */}
    <g transform="translate(250, 75)">
      {/* Bonds */}
      <line x1="0" y1="0" x2="-35" y2="-25" stroke="#94A3B8" strokeWidth="4" />
      <line x1="0" y1="0" x2="35" y2="-25" stroke="#94A3B8" strokeWidth="4" />
      {/* Oxygen pointing δ- toward Na+ */}
      <circle cx="0" cy="0" r="20" fill="url(#oxyGrad)" />
      <text x="0" y="4" textAnchor="middle" fill="#FFF" fontSize="11" fontWeight="bold">O (δ⁻)</text>
      {/* Hydrogens pointing away */}
      <circle cx="-35" cy="-25" r="12" fill="url(#hydGrad)" />
      <text x="-35" y="-22" textAnchor="middle" fill="#FFF" fontSize="9">H (δ⁺)</text>
      <circle cx="35" cy="-25" r="12" fill="url(#hydGrad)" />
      <text x="35" y="-22" textAnchor="middle" fill="#FFF" fontSize="9">H (δ⁺)</text>
    </g>

    {/* Water Molecule 2 Left */}
    <g transform="translate(160, 160)">
      <line x1="0" y1="0" x2="-25" y2="-35" stroke="#94A3B8" strokeWidth="4" />
      <line x1="0" y1="0" x2="-25" y2="35" stroke="#94A3B8" strokeWidth="4" />
      <circle cx="0" cy="0" r="20" fill="url(#oxyGrad)" />
      <text x="0" y="4" textAnchor="middle" fill="#FFF" fontSize="11" fontWeight="bold">O (δ⁻)</text>
      <circle cx="-25" cy="-35" r="12" fill="url(#hydGrad)" />
      <text x="-25" y="-32" textAnchor="middle" fill="#FFF" fontSize="9">H</text>
      <circle cx="-25" cy="35" r="12" fill="url(#hydGrad)" />
      <text x="-25" y="38" textAnchor="middle" fill="#FFF" fontSize="9">H</text>
    </g>

    {/* Water Molecule 3 Right */}
    <g transform="translate(340, 160)">
      <line x1="0" y1="0" x2="25" y2="-35" stroke="#94A3B8" strokeWidth="4" />
      <line x1="0" y1="0" x2="25" y2="35" stroke="#94A3B8" strokeWidth="4" />
      <circle cx="0" cy="0" r="20" fill="url(#oxyGrad)" />
      <text x="0" y="4" textAnchor="middle" fill="#FFF" fontSize="11" fontWeight="bold">O (δ⁻)</text>
      <circle cx="25" cy="-35" r="12" fill="url(#hydGrad)" />
      <text x="25" y="-32" textAnchor="middle" fill="#FFF" fontSize="9">H</text>
      <circle cx="25" cy="35" r="12" fill="url(#hydGrad)" />
      <text x="25" y="38" textAnchor="middle" fill="#FFF" fontSize="9">H</text>
    </g>

    {/* Water Molecule 4 Bottom */}
    <g transform="translate(250, 245)">
      <line x1="0" y1="0" x2="-35" y2="25" stroke="#94A3B8" strokeWidth="4" />
      <line x1="0" y1="0" x2="35" y2="25" stroke="#94A3B8" strokeWidth="4" />
      <circle cx="0" cy="0" r="20" fill="url(#oxyGrad)" />
      <text x="0" y="4" textAnchor="middle" fill="#FFF" fontSize="11" fontWeight="bold">O (δ⁻)</text>
      <circle cx="-35" cy="25" r="12" fill="url(#hydGrad)" />
      <text x="-35" y="28" textAnchor="middle" fill="#FFF" fontSize="9">H</text>
      <circle cx="35" cy="25" r="12" fill="url(#hydGrad)" />
      <text x="35" y="28" textAnchor="middle" fill="#FFF" fontSize="9">H</text>
    </g>

    {/* Electrostatic Force Lines */}
    <line x1="250" y1="132" x2="250" y2="95" stroke="#EF4444" strokeWidth="2" strokeDasharray="4 3" />
    <line x1="222" y1="160" x2="180" y2="160" stroke="#EF4444" strokeWidth="2" strokeDasharray="4 3" />
    <line x1="278" y1="160" x2="320" y2="160" stroke="#EF4444" strokeWidth="2" strokeDasharray="4 3" />
    <line x1="250" y1="188" x2="250" y2="225" stroke="#EF4444" strokeWidth="2" strokeDasharray="4 3" />

    {/* Explanation callout */}
    <rect x="15" y="250" width="180" height="40" rx="6" fill="#1E293B" stroke="#475569" />
    <text x="25" y="267" fill="#F8FAFC" fontSize="10" fontWeight="bold">Ion-Dipole Attraction:</text>
    <text x="25" y="282" fill="#94A3B8" fontSize="9">O (δ⁻) attracts positive Na⁺ ion</text>
  </svg>
);

const SolubilityCurveGraphSVG: React.FC<{ temp: number; selectedSolute: string }> = ({ temp, selectedSolute }) => {
  // Map graph coordinates: X (0 to 100°C) -> 60 to 440, Y (0 to 150g/100g water) -> 250 to 40
  const getX = (t: number) => 60 + (t / 100) * 380;
  const getY = (g: number) => 250 - (g / 150) * 210;

  // Solubility curves equations
  const kno3Path = Array.from({ length: 101 }, (_, t) => {
    const sol = 13 + 0.4 * t + 0.012 * t * t;
    return `${t === 0 ? 'M' : 'L'} ${getX(t)} ${getY(Math.min(150, sol))}`;
  }).join(' ');

  const naclPath = Array.from({ length: 101 }, (_, t) => {
    const sol = 35.7 + 0.04 * t;
    return `${t === 0 ? 'M' : 'L'} ${getX(t)} ${getY(sol)}`;
  }).join(' ');

  const cuso4Path = Array.from({ length: 101 }, (_, t) => {
    const sol = 14 + 0.6 * t + 0.002 * t * t;
    return `${t === 0 ? 'M' : 'L'} ${getX(t)} ${getY(Math.min(150, sol))}`;
  }).join(' ');

  const currentSolubility = useMemo(() => {
    if (selectedSolute === 'KNO3') return 13 + 0.4 * temp + 0.012 * temp * temp;
    if (selectedSolute === 'CuSO4') return 14 + 0.6 * temp + 0.002 * temp * temp;
    return 35.7 + 0.04 * temp;
  }, [temp, selectedSolute]);

  return (
    <svg viewBox="0 0 500 300" className="w-full h-auto bg-slate-900 rounded-xl shadow-lg border border-slate-700">
      <text x="250" y="25" textAnchor="middle" fill="#10B981" fontSize="15" fontWeight="bold">
        Solubility Curves (g Solute / 100 g H₂O vs Temperature °C)
      </text>

      {/* Grid Lines */}
      {[0, 25, 50, 75, 100].map((t) => (
        <g key={`x-${t}`}>
          <line x1={getX(t)} y1={40} x2={getX(t)} y2={250} stroke="#334155" strokeDasharray="3 3" />
          <text x={getX(t)} y={268} textAnchor="middle" fill="#94A3B8" fontSize="10">{t}°C</text>
        </g>
      ))}

      {[0, 30, 60, 90, 120, 150].map((g) => (
        <g key={`y-${g}`}>
          <line x1={60} y1={getY(g)} x2={440} y2={getY(g)} stroke="#334155" strokeDasharray="3 3" />
          <text x={52} y={getY(g) + 3} textAnchor="end" fill="#94A3B8" fontSize="10">{g}g</text>
        </g>
      ))}

      {/* Axis Lines */}
      <line x1="60" y1="250" x2="440" y2="250" stroke="#64748B" strokeWidth="2" />
      <line x1="60" y1="40" x2="60" y2="250" stroke="#64748B" strokeWidth="2" />

      {/* Paths */}
      <path d={kno3Path} fill="none" stroke={selectedSolute === 'KNO3' ? '#EC4899' : '#475569'} strokeWidth={selectedSolute === 'KNO3' ? 3.5 : 1.5} />
      <path d={naclPath} fill="none" stroke={selectedSolute === 'NaCl' ? '#3B82F6' : '#475569'} strokeWidth={selectedSolute === 'NaCl' ? 3.5 : 1.5} />
      <path d={cuso4Path} fill="none" stroke={selectedSolute === 'CuSO4' ? '#10B981' : '#475569'} strokeWidth={selectedSolute === 'CuSO4' ? 3.5 : 1.5} />

      {/* Current Temperature Vertical Marker */}
      <line x1={getX(temp)} y1={40} x2={getX(temp)} y2={250} stroke="#F59E0B" strokeWidth="2" />
      <circle cx={getX(temp)} cy={getY(Math.min(150, currentSolubility))} r="6" fill="#F59E0B" />

      {/* Legend */}
      <g transform="translate(320, 50)">
        <rect width="115" height="65" fill="#1E293B" rx="4" stroke="#475569" />
        <line x1="10" y1="15" x2="30" y2="15" stroke="#EC4899" strokeWidth="3" />
        <text x="35" y="18" fill="#F8FAFC" fontSize="10">KNO₃ (Steep)</text>
        <line x1="10" y1="35" x2="30" y2="35" stroke="#3B82F6" strokeWidth="3" />
        <text x="35" y="38" fill="#F8FAFC" fontSize="10">NaCl (Flat)</text>
        <line x1="10" y1="53" x2="30" y2="53" stroke="#10B981" strokeWidth="3" />
        <text x="35" y="56" fill="#F8FAFC" fontSize="10">CuSO₄ (Mod)</text>
      </g>
    </svg>
  );
};

const HardWaterSoapDiagramSVG: React.FC<{ waterType: string; isBoiled: boolean; addedSoda: boolean }> = ({ waterType, isBoiled, addedSoda }) => {
  const isSoft = waterType === 'soft' || isBoiled && waterType === 'temporary' || addedSoda;

  return (
    <svg viewBox="0 0 500 280" className="w-full h-auto bg-slate-900 rounded-xl shadow-lg border border-slate-700">
      <text x="250" y="25" textAnchor="middle" fill="#8B5CF6" fontSize="15" fontWeight="bold">
        Hard Water Chemistry & Soap Lather vs Scum Reaction
      </text>

      {/* Beaker Left: Soft / Softened Water */}
      <g transform="translate(80, 50)">
        <rect x="0" y="40" width="130" height="150" fill="none" stroke="#94A3B8" strokeWidth="3" rx="4" />
        <rect x="4" y="90" width="122" height="96" fill="#0284C7" opacity="0.4" />
        {isSoft ? (
          <>
            {/* Lather Foam Layer */}
            <rect x="4" y="65" width="122" height="25" fill="#F8FAFC" opacity="0.9" rx="4" />
            <circle cx="20" cy="75" r="8" fill="#E2E8F0" />
            <circle cx="45" cy="72" r="10" fill="#FFFFFF" />
            <circle cx="75" cy="76" r="9" fill="#E2E8F0" />
            <circle cx="105" cy="73" r="11" fill="#FFFFFF" />
            <text x="65" y="150" textAnchor="middle" fill="#38BDF8" fontSize="12" fontWeight="bold">Rich Lather Foam</text>
          </>
        ) : (
          <>
            {/* Scum Precipitate Layer */}
            <path d="M 4 175 Q 35 160 65 178 Q 95 160 126 175 L 126 186 L 4 186 Z" fill="#CBD5E1" opacity="0.8" />
            <text x="65" y="140" textAnchor="middle" fill="#F87171" fontSize="11" fontWeight="bold">Insoluble Scum Curd</text>
            <text x="65" y="155" textAnchor="middle" fill="#CBD5E1" fontSize="9">(Ca/Mg Stearate)</text>
          </>
        )}
        <text x="65" y="215" textAnchor="middle" fill="#F8FAFC" fontSize="12" fontWeight="bold">
          {isSoft ? 'Soft / Softened' : 'Hard Water'}
        </text>
      </g>

      {/* Chemical Equation Box Right */}
      <g transform="translate(240, 50)">
        <rect width="230" height="180" fill="#1E293B" rx="8" stroke="#475569" />
        <text x="115" y="25" textAnchor="middle" fill="#F59E0B" fontSize="12" fontWeight="bold">Chemical Reaction</text>
        
        {waterType === 'temporary' && !isBoiled && !addedSoda && (
          <g transform="translate(15, 45)">
            <text x="0" y="15" fill="#38BDF8" fontSize="10" fontWeight="bold">Temporary Hardness:</text>
            <text x="0" y="32" fill="#F8FAFC" fontSize="10">Contains Ca(HCO₃)₂</text>
            <text x="0" y="55" fill="#10B981" fontSize="10" fontWeight="bold">Action: Heat to Boil</text>
            <text x="0" y="72" fill="#CBD5E1" fontSize="9">Ca(HCO₃)₂ → CaCO₃↓ + H₂O + CO₂↑</text>
            <text x="0" y="95" fill="#38BDF8" fontSize="9">Precipitates solid scale!</text>
          </g>
        )}

        {waterType === 'permanent' && !addedSoda && (
          <g transform="translate(15, 45)">
            <text x="0" y="15" fill="#F87171" fontSize="10" fontWeight="bold">Permanent Hardness:</text>
            <text x="0" y="32" fill="#F8FAFC" fontSize="10">Contains CaSO₄ / MgCl₂</text>
            <text x="0" y="55" fill="#10B981" fontSize="10" fontWeight="bold">Action: Add Washing Soda</text>
            <text x="0" y="72" fill="#CBD5E1" fontSize="9">Ca²⁺ + Na₂CO₃ → CaCO₃↓ + 2Na⁺</text>
            <text x="0" y="95" fill="#38BDF8" fontSize="9">Softens water chemically!</text>
          </g>
        )}

        {waterType === 'soft' && (
          <g transform="translate(15, 45)">
            <text x="0" y="15" fill="#10B981" fontSize="10" fontWeight="bold">Soft Water (Zero Hardness):</text>
            <text x="0" y="35" fill="#F8FAFC" fontSize="10">No Ca²⁺ or Mg²⁺ ions</text>
            <text x="0" y="60" fill="#CBD5E1" fontSize="10">Soap + H₂O → Immediate Foam</text>
            <text x="0" y="85" fill="#38BDF8" fontSize="9">High soap cleaning efficiency!</text>
          </g>
        )}

        {(isBoiled || addedSoda) && (
          <g transform="translate(15, 45)">
            <text x="0" y="15" fill="#10B981" fontSize="11" fontWeight="bold">Water Successfully Softened!</text>
            <text x="0" y="38" fill="#F8FAFC" fontSize="10">Divalent ions precipitated out.</text>
            <text x="0" y="62" fill="#CBD5E1" fontSize="9">Soap now forms lather without</text>
            <text x="0" y="76" fill="#CBD5E1" fontSize="9">wasting soap as scum.</text>
          </g>
        )}
      </g>
    </svg>
  );
};

const MultiStagePurificationSVG: React.FC<{ stagesActive: Record<string, boolean> }> = ({ stagesActive }) => (
  <svg viewBox="0 0 500 280" className="w-full h-auto bg-slate-900 rounded-xl shadow-lg border border-slate-700">
    <text x="250" y="25" textAnchor="middle" fill="#EC4899" fontSize="15" fontWeight="bold">
      Multi-Stage Municipal Water Treatment Flowchart
    </text>

    {/* Stage 1: Sedimentation */}
    <g transform="translate(20, 50)">
      <rect width="80" height="90" fill={stagesActive.sedimentation ? '#1E293B' : '#0F172A'} stroke={stagesActive.sedimentation ? '#3B82F6' : '#334155'} strokeWidth="2" rx="6" />
      <text x="40" y="20" textAnchor="middle" fill="#F8FAFC" fontSize="10" fontWeight="bold">1. Sediment</text>
      <rect x="10" y="65" width="60" height="15" fill="#78350F" opacity="0.7" />
      <text x="40" y="50" textAnchor="middle" fill="#94A3B8" fontSize="8">Gravel/Mud</text>
    </g>

    <path d="M 100 95 L 120 95" stroke="#38BDF8" strokeWidth="3" markerEnd="url(#arrow)" />

    {/* Stage 2: Coagulation & Sand Filter */}
    <g transform="translate(120, 50)">
      <rect width="80" height="90" fill={stagesActive.sandFilter ? '#1E293B' : '#0F172A'} stroke={stagesActive.sandFilter ? '#10B981' : '#334155'} strokeWidth="2" rx="6" />
      <text x="40" y="20" textAnchor="middle" fill="#F8FAFC" fontSize="10" fontWeight="bold">2. Sand Filter</text>
      <rect x="10" y="35" width="60" height="12" fill="#FDE047" opacity="0.6" />
      <rect x="10" y="47" width="60" height="15" fill="#94A3B8" opacity="0.6" />
      <rect x="10" y="62" width="60" height="18" fill="#475569" opacity="0.6" />
      <text x="40" y="86" textAnchor="middle" fill="#CBD5E1" fontSize="7">Sand & Coarse</text>
    </g>

    <path d="M 200 95 L 220 95" stroke="#38BDF8" strokeWidth="3" />

    {/* Stage 3: Charcoal Adsorption */}
    <g transform="translate(220, 50)">
      <rect width="80" height="90" fill={stagesActive.charcoal ? '#1E293B' : '#0F172A'} stroke={stagesActive.charcoal ? '#F59E0B' : '#334155'} strokeWidth="2" rx="6" />
      <text x="40" y="20" textAnchor="middle" fill="#F8FAFC" fontSize="10" fontWeight="bold">3. Charcoal</text>
      <rect x="10" y="35" width="60" height="45" fill="#000000" opacity="0.8" />
      <text x="40" y="60" textAnchor="middle" fill="#F8FAFC" fontSize="8">Carbon Filter</text>
    </g>

    <path d="M 300 95 L 320 95" stroke="#38BDF8" strokeWidth="3" />

    {/* Stage 4: RO / Boiling */}
    <g transform="translate(320, 50)">
      <rect width="80" height="90" fill={stagesActive.ro ? '#1E293B' : '#0F172A'} stroke={stagesActive.ro ? '#8B5CF6' : '#334155'} strokeWidth="2" rx="6" />
      <text x="40" y="20" textAnchor="middle" fill="#F8FAFC" fontSize="10" fontWeight="bold">4. RO Membrane</text>
      <line x1="40" y1="35" x2="40" y2="80" stroke="#8B5CF6" strokeWidth="3" strokeDasharray="2 2" />
      <text x="22" y="55" fill="#38BDF8" fontSize="7">Pressur</text>
      <text x="50" y="55" fill="#10B981" fontSize="7">Pure H₂O</text>
    </g>

    <path d="M 400 95 L 420 95" stroke="#38BDF8" strokeWidth="3" />

    {/* Stage 5: Chlorination & Pure Tank */}
    <g transform="translate(420, 50)">
      <rect width="65" height="90" fill={stagesActive.chlorination ? '#1E293B' : '#0F172A'} stroke={stagesActive.chlorination ? '#EC4899' : '#334155'} strokeWidth="2" rx="6" />
      <text x="32" y="20" textAnchor="middle" fill="#F8FAFC" fontSize="9" fontWeight="bold">5. Chlorination</text>
      <rect x="8" y="40" width="49" height="40" fill="#06B6D4" opacity="0.6" />
      <text x="32" y="62" textAnchor="middle" fill="#FFF" fontSize="10" fontWeight="bold">Cl₂</text>
    </g>

    {/* Bottom Water Purity Gauge */}
    <rect x="40" y="165" width="420" height="85" fill="#1E293B" rx="8" stroke="#475569" />
    <text x="60" y="190" fill="#F8FAFC" fontSize="12" fontWeight="bold">Water Quality Status:</text>
    
    <g transform="translate(60, 205)">
      <text x="0" y="0" fill="#94A3B8" fontSize="10">Turbidity: <tspan fill={stagesActive.sandFilter ? '#10B981' : '#F87171'}>{stagesActive.sandFilter ? '0.2 NTU (Clean)' : '120 NTU (Muddy)'}</tspan></text>
      <text x="180" y="0" fill="#94A3B8" fontSize="10">Odor/Color: <tspan fill={stagesActive.charcoal ? '#10B981' : '#F87171'}>{stagesActive.charcoal ? 'Crystal Clear' : 'Foul / Organic'}</tspan></text>
      <text x="0" y="22" fill="#94A3B8" fontSize="10">TDS Minerals: <tspan fill={stagesActive.ro ? '#10B981' : '#F59E0B'}>{stagesActive.ro ? '25 ppm (Low)' : '450 ppm (High)'}</tspan></text>
      <text x="180" y="22" fill="#94A3B8" fontSize="10">Bacteria Count: <tspan fill={stagesActive.chlorination ? '#10B981' : '#F87171'}>{stagesActive.chlorination ? '0 CFU/mL (Safe)' : '4,500 CFU/mL (Toxic)'}</tspan></text>
    </g>
  </svg>
);

// ==========================================
// MAIN COMPONENT CLASS
// ==========================================

export default function C7_ChemistryWaterauniversalsolventSim({
  onComplete,
}: {
  onComplete?: (score: number) => void;
}) {
  // Navigation tabs
  const [activeTab, setActiveTab] = useState<'discovery' | 'lab' | 'challenges' | 'summary'>('discovery');

  // Interactive Lab 1 (Dipole) State
  const [lab1Substance, setLab1Substance] = useState<'nacl' | 'oil'>('nacl');
  const [showDipoles, setShowDipoles] = useState<boolean>(true);

  // Interactive Lab 2 (Solubility) State
  const [lab2Solute, setLab2Solute] = useState<'KNO3' | 'NaCl' | 'CuSO4'>('KNO3');
  const [lab2Temp, setLab2Temp] = useState<number>(20);
  const [addedGrams, setAddedGrams] = useState<number>(40);

  // Interactive Lab 3 (Hard Water) State
  const [lab3WaterType, setLab3WaterType] = useState<'soft' | 'temporary' | 'permanent'>('temporary');
  const [lab3Boiled, setLab3Boiled] = useState<boolean>(false);
  const [lab3AddedSoda, setLab3AddedSoda] = useState<boolean>(false);
  const [lab3SoapDrops, setLab3SoapDrops] = useState<number>(1);

  // Interactive Lab 4 (Purification) State
  const [purifyStages, setPurifyStages] = useState({
    sedimentation: false,
    sandFilter: false,
    charcoal: false,
    ro: false,
    chlorination: false,
  });

  // Challenges Engine State
  const [currentChallengeIdx, setCurrentChallengeIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [numericInput, setNumericInput] = useState<string>('');
  const [challengeCompleted, setChallengeCompleted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHintIdx, setCurrentHintIdx] = useState<number>(0);

  // Feedback FX states
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [hintText, setHintText] = useState<string>('');

  // Diagnostic / Prediction / Observation State
  const [predictionAnswers, setPredictionAnswers] = useState<Record<number, number>>({});
  const [observationAnswers, setObservationAnswers] = useState<Record<number, number>>({});
  const [discoverySelected, setDiscoverySelected] = useState<number | null>(null);

  // SRS and BKT State Tracking
  const [bktStates, setBktStates] = useState<Record<NodeId, BKTState>>(() => {
    const initial: Record<string, BKTState> = {};
    ALL_NODE_IDS.forEach((id) => {
      initial[id] = createBKTState();
    });
    return initial as Record<NodeId, BKTState>;
  });

  const [srsItems, setSrsItems] = useState<Record<string, ReviewItem>>(() => {
    const initial: Record<string, ReviewItem> = {};
    CHALLENGES.forEach((c) => {
      initial[c.id] = createReviewItem(c.id);
    });
    return initial;
  });

  // Auto-hint Ref Timer
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (activeTab === 'challenges' && !challengeCompleted) {
        setShowHint(true);
        const c = CHALLENGES[currentChallengeIdx];
        setHintText(c.hints[currentHintIdx]);
        audioManager.play('hint');
        speechManager.speak('Here is a hint to help you solve this chemistry question.');
      }
    }, 12000);
  }, [activeTab, challengeCompleted, currentChallengeIdx, currentHintIdx]);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [resetInactivityTimer, selectedOption, numericInput, currentChallengeIdx]);

  // Current Challenge handle
  const currentChallenge = CHALLENGES[currentChallengeIdx];

  // Particle Canvas Animation Engine for Dissolution Lab
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (activeTab !== 'lab') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      type: 'H2O' | 'Na' | 'Cl' | 'Oil';
      angle: number;
    }> = [];

    // Populate particles based on lab 1 selection
    const initParticles = () => {
      particles = [];
      for (let i = 0; i < 25; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5,
          type: 'H2O',
          angle: Math.random() * Math.PI * 2,
        });
      }

      if (lab1Substance === 'nacl') {
        for (let i = 0; i < 8; i++) {
          particles.push({
            x: 180 + Math.random() * 40,
            y: 120 + Math.random() * 40,
            vx: (Math.random() - 0.5) * 0.8,
            vy: (Math.random() - 0.5) * 0.8,
            type: 'Na',
            angle: 0,
          });
          particles.push({
            x: 180 + Math.random() * 40,
            y: 120 + Math.random() * 40,
            vx: (Math.random() - 0.5) * 0.8,
            vy: (Math.random() - 0.5) * 0.8,
            type: 'Cl',
            angle: 0,
          });
        }
      } else {
        for (let i = 0; i < 12; i++) {
          particles.push({
            x: Math.random() * canvas.width,
            y: 20 + Math.random() * 30, // Oil floats on top
            vx: (Math.random() - 0.5) * 0.5,
            vy: 0,
            type: 'Oil',
            angle: 0,
          });
        }
      }
    };

    initParticles();

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw Background Fluid
      ctx.fillStyle = '#0F172A';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw Particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 10 || p.x > canvas.width - 10) p.vx *= -1;
        if (p.y < 10 || p.y > canvas.height - 10) p.vy *= -1;

        if (p.type === 'H2O') {
          // Oxygen red circle
          ctx.beginPath();
          ctx.arc(p.x, p.y, 7, 0, Math.PI * 2);
          ctx.fillStyle = '#EF4444';
          ctx.fill();

          // Hydrogen blue ears
          ctx.beginPath();
          ctx.arc(p.x - 6, p.y - 6, 4, 0, Math.PI * 2);
          ctx.arc(p.x + 6, p.y - 6, 4, 0, Math.PI * 2);
          ctx.fillStyle = '#38BDF8';
          ctx.fill();
        } else if (p.type === 'Na') {
          ctx.beginPath();
          ctx.arc(p.x, p.y, 9, 0, Math.PI * 2);
          ctx.fillStyle = '#F59E0B';
          ctx.fill();
          ctx.fillStyle = '#FFF';
          ctx.font = '9px sans-serif';
          ctx.fillText('Na+', p.x - 7, p.y + 3);
        } else if (p.type === 'Cl') {
          ctx.beginPath();
          ctx.arc(p.x, p.y, 11, 0, Math.PI * 2);
          ctx.fillStyle = '#10B981';
          ctx.fill();
          ctx.fillStyle = '#FFF';
          ctx.font = '9px sans-serif';
          ctx.fillText('Cl-', p.x - 5, p.y + 3);
        } else if (p.type === 'Oil') {
          ctx.beginPath();
          ctx.arc(p.x, p.y, 12, 0, Math.PI * 2);
          ctx.fillStyle = '#EAB308';
          ctx.fill();
          ctx.fillStyle = '#000';
          ctx.font = '8px sans-serif';
          ctx.fillText('Oil', p.x - 6, p.y + 3);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeTab, lab1Substance]);

  // Handle Challenge Answer Verification
  const handleVerifyAnswer = (userChoice?: number | string) => {
    let isCorrect = false;
    const c = CHALLENGES[currentChallengeIdx];

    if (c.type === 'mcq') {
      isCorrect = userChoice === c.correctIndex;
    } else if (c.type === 'numeric') {
      const num = parseFloat(numericInput);
      isCorrect = Math.abs(num - Number(c.correctAnswer)) < 0.5;
    }

    // BKT and SM2 update
    const nodeId = c.nodeId;
    const updatedBKT = bktUpdate(bktStates[nodeId], isCorrect);
    setBktStates((prev) => ({ ...prev, [nodeId]: updatedBKT }));

    const updatedSRS = sm2Update(srsItems[c.id], isCorrect ? 5 : 1);
    setSrsItems((prev) => ({ ...prev, [c.id]: updatedSRS }));

    if (isCorrect) {
      audioManager.play('drop-correct');
      audioManager.play('sparkle');
      setShowSparkle(true);
      setShowSuccess(true);
      setScore((prev) => prev + 10);
      speechManager.speak('Excellent chemistry logic! That is completely correct.');

      setTimeout(() => {
        setShowSuccess(false);
        setShowSparkle(false);
      }, 2000);

      setChallengeCompleted(true);
    } else {
      audioManager.play('drop-wrong');
      audioManager.play('error');
      speechManager.speak('Not quite right. Let us examine the chemical mechanism.');
      setShowHint(true);
      setHintText(c.hints[0]);
    }
  };

  const handleNextChallenge = () => {
    if (currentChallengeIdx < CHALLENGES.length - 1) {
      setCurrentChallengeIdx((prev) => prev + 1);
      setSelectedOption(null);
      setNumericInput('');
      setChallengeCompleted(false);
      setShowHint(false);
      setCurrentHintIdx(0);
      audioManager.play('whoosh');
    } else {
      // Finished all challenges
      audioManager.play('celebration');
      setShowConfetti(true);
      const totalScore = Math.round((score / (CHALLENGES.length * 10)) * 100);
      recordGameScore('c7_chem_water_solvent', totalScore);
      if (onComplete) onComplete(totalScore);
    }
  };

  // Calculate dynamic overall mastery
  const overallMastery = useMemo(() => {
    let sum = 0;
    ALL_NODE_IDS.forEach((id) => {
      sum += bktStates[id].pKnown;
    });
    return Math.round((sum / ALL_NODE_IDS.length) * 100);
  }, [bktStates]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 md:p-8">
      {/* HEADER BAR */}
      <header className="max-w-7xl mx-auto mb-8 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Class 7 ICSE Chemistry
            </span>
            <span className="text-slate-400 text-sm font-semibold">Node Set: c7_chem_017-020</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-2">
            Water: The Universal Solvent & Purification Chemistry
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Master polar dissolution, solubility dynamics, water hardness, and industrial purification columns.
          </p>
        </div>

        {/* Global Mastery & Progress Meter */}
        <div className="flex items-center gap-6 bg-slate-800/80 px-5 py-3 rounded-xl stroke-slate-700">
          <div>
            <div className="text-xs text-slate-400 font-semibold uppercase">Overall Mastery</div>
            <div className="text-2xl font-black text-emerald-400">{overallMastery}%</div>
          </div>
          <div className="w-24 bg-slate-700 h-3 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full transition-all duration-500" style={{ width: `${overallMastery}%` }} />
          </div>
        </div>
      </header>

      {/* NAVIGATION TABS */}
      <div className="max-w-7xl mx-auto mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => {
            setActiveTab('discovery');
            audioManager.play('tap');
          }}
          className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
            activeTab === 'discovery' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
          }`}
        >
          🔬 1. Discovery & Scenario
        </button>
        <button
          onClick={() => {
            setActiveTab('lab');
            audioManager.play('tap');
          }}
          className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
            activeTab === 'lab' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/30' : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
          }`}
        >
          🧪 2. Interactive Exploration Labs (5)
        </button>
        <button
          onClick={() => {
            setActiveTab('challenges');
            audioManager.play('tap');
          }}
          className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
            activeTab === 'challenges' ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30' : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
          }`}
        >
          🎯 3. Guided Challenges ({CHALLENGES.length})
        </button>
        <button
          onClick={() => {
            setActiveTab('summary');
            audioManager.play('tap');
          }}
          className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
            activeTab === 'summary' ? 'bg-pink-600 text-white shadow-lg shadow-pink-500/30' : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
          }`}
        >
          🌐 4. Summary & Real World Lab
        </button>
      </div>

      {/* ========================================== */}
      {/* TAB 1: DISCOVERY & SCENARIO */}
      {/* ========================================== */}
      {activeTab === 'discovery' && (
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Scenario Banner */}
          <div className="bg-gradient-to-r from-blue-900/40 via-slate-900 to-indigo-900/40 border border-blue-800/50 p-6 rounded-2xl shadow-xl">
            <h2 className="text-xl font-bold text-blue-300 mb-2">📋 Scenario: {SCENARIO.title}</h2>
            <p className="text-slate-200 text-base leading-relaxed mb-3">{SCENARIO.intro}</p>
            <p className="text-slate-400 text-sm italic">{SCENARIO.context}</p>
          </div>

          {/* Discovery Question Card */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
            <span className="bg-amber-500/20 text-amber-300 text-xs font-bold px-3 py-1 rounded-full uppercase">
              Initial Hypothesis Challenge
            </span>
            <h3 className="text-lg font-bold text-white mt-3 mb-4">{DISCOVERY_QUESTION.question}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              {DISCOVERY_QUESTION.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setDiscoverySelected(idx);
                    audioManager.play('tap');
                  }}
                  className={`p-4 rounded-xl border text-left text-sm transition-all ${
                    discoverySelected === idx
                      ? idx === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : 'bg-rose-950/80 border-rose-500 text-rose-200'
                      : 'bg-slate-800/60 border-slate-700 hover:bg-slate-800 text-slate-300'
                  }`}
                >
                  <span className="font-bold mr-2">{String.fromCharCode(65 + idx)}.</span> {opt}
                </button>
              ))}
            </div>

            {discoverySelected !== null && (
              <div
                className={`p-4 rounded-xl border text-sm ${
                  discoverySelected === DISCOVERY_QUESTION.correctIndex
                    ? 'bg-emerald-900/30 border-emerald-700 text-emerald-300'
                    : 'bg-amber-900/30 border-amber-700 text-amber-300'
                }`}
              >
                <div className="font-bold mb-1">
                  {discoverySelected === DISCOVERY_QUESTION.correctIndex ? '✅ Spot on!' : '💡 Key Insight:'}
                </div>
                {DISCOVERY_QUESTION.hintAfter}
              </div>
            )}
          </div>

          {/* Render Prediction Questions (Mandatory Render) */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
            <h3 className="text-lg font-bold text-purple-300 mb-4">🔮 Predict Lab Outcomes</h3>
            <div className="space-y-6">
              {PREDICTION_QUESTIONS.map((pq, qIdx) => (
                <div key={qIdx} className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                  <p className="text-white font-semibold text-sm mb-3">{pq.question}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                    {pq.options.map((opt, oIdx) => (
                      <button
                        key={oIdx}
                        onClick={() => {
                          setPredictionAnswers((prev) => ({ ...prev, [qIdx]: oIdx }));
                          audioManager.play('tap');
                        }}
                        className={`p-3 rounded-lg border text-xs text-left transition-all ${
                          predictionAnswers[qIdx] === oIdx
                            ? oIdx === pq.correctIndex
                              ? 'bg-emerald-900/60 border-emerald-500 text-emerald-200'
                              : 'bg-rose-900/60 border-rose-500 text-rose-200'
                            : 'bg-slate-900 border-slate-700 hover:bg-slate-800 text-slate-300'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  {predictionAnswers[qIdx] !== undefined && (
                    <div className="text-xs text-blue-300 bg-blue-950/50 p-2.5 rounded border border-blue-800">
                      🔍 <strong>Verification Instruction:</strong> {pq.verifyInstruction}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* SVG Diagram 1 Render */}
          <WaterMoleculeDipoleSVG activeTab={activeTab} />
        </div>
      )}

      {/* ========================================== */}
      {/* TAB 2: INTERACTIVE EXPLORATION LABS (5 LABS) */}
      {/* ========================================== */}
      {activeTab === 'lab' && (
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Render EXPLORATION_STEPS mapping header */}
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
            <h2 className="text-lg font-bold text-emerald-400 mb-3">🧪 5 Interactive Laboratory Modules</h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
              {EXPLORATION_STEPS.map((step, idx) => (
                <div key={idx} className="bg-slate-800 p-3 rounded-xl border border-slate-700 text-xs">
                  <div className="font-bold text-emerald-300 mb-1">{step.title}</div>
                  <div className="text-slate-400 text-[11px] leading-tight">{step.instruction}</div>
                </div>
              ))}
            </div>
          </div>

          {/* LAB 1: POLAR DISSOLUTION VISUALIZER */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
              <div>
                <span className="bg-blue-500/20 text-blue-300 text-xs font-bold px-3 py-1 rounded-full">Lab 1</span>
                <h3 className="text-xl font-bold text-white mt-1">Molecular Dipole & Particle Simulator</h3>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setLab1Substance('nacl');
                    audioManager.play('pop');
                  }}
                  className={`px-4 py-2 rounded-lg text-xs font-bold ${
                    lab1Substance === 'nacl' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  NaCl (Ionic Salt)
                </button>
                <button
                  onClick={() => {
                    setLab1Substance('oil');
                    audioManager.play('pop');
                  }}
                  className={`px-4 py-2 rounded-lg text-xs font-bold ${
                    lab1Substance === 'oil' ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  Cooking Oil (Non-Polar)
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div>
                <canvas ref={canvasRef} width={420} height={240} className="w-full rounded-xl border border-slate-700 shadow-inner" />
              </div>
              <div className="space-y-4">
                <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 text-sm">
                  <h4 className="font-bold text-blue-300 mb-2">Molecular Interaction Insight:</h4>
                  {lab1Substance === 'nacl' ? (
                    <p className="text-slate-300 text-xs leading-relaxed">
                      Water molecules are permanent dipoles. Oxygen attracts positive Sodium ions (Na⁺) while Hydrogens surround negative Chloride ions (Cl⁻). This forms hydration shells that break the NaCl crystal lattice apart!
                    </p>
                  ) : (
                    <p className="text-slate-300 text-xs leading-relaxed">
                      Cooking oil molecules are non-polar hydrocarbon chains with no electric charges. Water molecules prefer bonding with each other via strong hydrogen bonds, squeezing the oil up to float on top!
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* LAB 2: SOLUBILITY & SATURATION CHAMBER */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
              <div>
                <span className="bg-emerald-500/20 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full">Lab 2</span>
                <h3 className="text-xl font-bold text-white mt-1">Solubility & Saturation Temperature Chamber</h3>
              </div>
              <div className="flex gap-2">
                {(['KNO3', 'NaCl', 'CuSO4'] as const).map((sol) => (
                  <button
                    key={sol}
                    onClick={() => {
                      setLab2Solute(sol);
                      audioManager.play('pop');
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                      lab2Solute === sol ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {sol}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <SolubilityCurveGraphSVG temp={lab2Temp} selectedSolute={lab2Solute} />

              <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700 space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-300 flex justify-between mb-1">
                    <span>Water Temperature:</span>
                    <span className="text-amber-400 font-extrabold">{lab2Temp}°C</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={lab2Temp}
                    onChange={(e) => {
                      setLab2Temp(Number(e.target.value));
                      audioManager.play('swoop');
                    }}
                    className="w-full accent-amber-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 flex justify-between mb-1">
                    <span>Solute Mass Added (in 100g Water):</span>
                    <span className="text-emerald-400 font-extrabold">{addedGrams} g</span>
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="150"
                    value={addedGrams}
                    onChange={(e) => {
                      setAddedGrams(Number(e.target.value));
                      audioManager.play('swoop');
                    }}
                    className="w-full accent-emerald-500"
                  />
                </div>

                {/* Calculation Summary Box */}
                {(() => {
                  const maxSol =
                    lab2Solute === 'KNO3'
                      ? 13 + 0.4 * lab2Temp + 0.012 * lab2Temp * lab2Temp
                      : lab2Solute === 'CuSO4'
                      ? 14 + 0.6 * lab2Temp + 0.002 * lab2Temp * lab2Temp
                      : 35.7 + 0.04 * lab2Temp;

                  const isSaturated = addedGrams >= maxSol;
                  const undissolved = Math.max(0, addedGrams - maxSol);

                  return (
                    <div className="p-4 rounded-xl border bg-slate-900 border-slate-700 text-xs space-y-2">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Max Solubility at {lab2Temp}°C:</span>
                        <span className="font-bold text-white">{maxSol.toFixed(1)} g / 100g H₂O</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Solution State:</span>
                        <span className={`font-bold ${isSaturated ? 'text-amber-400' : 'text-emerald-400'}`}>
                          {isSaturated ? 'SATURATED (Excess Crystals)' : 'UNSATURATED (Fully Dissolved)'}
                        </span>
                      </div>
                      {isSaturated && (
                        <div className="flex justify-between text-rose-300">
                          <span>Undissolved Solid Precipitate:</span>
                          <span className="font-extrabold">{undissolved.toFixed(1)} g</span>
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>

          {/* LAB 3: HARD WATER SOAP LATHER & TITRATION */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
              <div>
                <span className="bg-purple-500/20 text-purple-300 text-xs font-bold px-3 py-1 rounded-full">Lab 3</span>
                <h3 className="text-xl font-bold text-white mt-1">Hardness & Soap Lather Reaction Simulator</h3>
              </div>
              <div className="flex gap-2">
                {(['soft', 'temporary', 'permanent'] as const).map((wt) => (
                  <button
                    key={wt}
                    onClick={() => {
                      setLab3WaterType(wt);
                      setLab3Boiled(false);
                      setLab3AddedSoda(false);
                      audioManager.play('pop');
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize ${
                      lab3WaterType === wt ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {wt} Water
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <HardWaterSoapDiagramSVG waterType={lab3WaterType} isBoiled={lab3Boiled} addedSoda={lab3AddedSoda} />

              <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700 space-y-4">
                <h4 className="font-bold text-purple-300 text-sm">Treatment Controls & Action:</h4>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => {
                      setLab3Boiled(true);
                      audioManager.play('chime');
                    }}
                    className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-xs font-bold"
                  >
                    🔥 Boil Sample (100°C)
                  </button>
                  <button
                    onClick={() => {
                      setLab3AddedSoda(true);
                      audioManager.play('chime');
                    }}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold"
                  >
                    🧪 Add Washing Soda (Na₂CO₃)
                  </button>
                  <button
                    onClick={() => {
                      setLab3Boiled(false);
                      setLab3AddedSoda(false);
                      audioManager.play('whoosh');
                    }}
                    className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg text-xs font-bold"
                  >
                    🔄 Reset Sample
                  </button>
                </div>

                <div className="p-4 bg-slate-900 rounded-xl border border-slate-700 text-xs text-slate-300 space-y-2">
                  <p>
                    <strong>Current Water Type:</strong> <span className="text-purple-300 font-bold capitalize">{lab3WaterType}</span>
                  </p>
                  <p>
                    <strong>Boil Treatment Applied:</strong> {lab3Boiled ? 'YES (Decomposed Ca(HCO₃)₂)' : 'NO'}
                  </p>
                  <p>
                    <strong>Washing Soda Added:</strong> {lab3AddedSoda ? 'YES (Precipitated Divalent Ions)' : 'NO'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* LAB 4 & 5: PURIFICATION COLUMN & DISTILLATION */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <div>
                <span className="bg-pink-500/20 text-pink-300 text-xs font-bold px-3 py-1 rounded-full">Labs 4 & 5</span>
                <h3 className="text-xl font-bold text-white mt-1">Multi-Stage Purification & Distillation Engine</h3>
              </div>
            </div>

            <MultiStagePurificationSVG stagesActive={purifyStages} />

            <div className="mt-6 flex flex-wrap justify-between items-center gap-3 bg-slate-800/80 p-4 rounded-xl border border-slate-700">
              <span className="text-xs font-bold text-slate-300">Toggle Treatment Modules:</span>
              <div className="flex flex-wrap gap-2">
                {Object.keys(purifyStages).map((stg) => {
                  const key = stg as keyof typeof purifyStages;
                  return (
                    <button
                      key={key}
                      onClick={() => {
                        setPurifyStages((prev) => ({ ...prev, [key]: !prev[key] }));
                        audioManager.play('tap');
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                        purifyStages[key] ? 'bg-pink-600 text-white' : 'bg-slate-900 text-slate-400 border border-slate-700'
                      }`}
                    >
                      {key}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Render Observation Questions (Mandatory Render) */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
            <h3 className="text-lg font-bold text-emerald-300 mb-4">👁️ Direct Laboratory Observations</h3>
            <div className="space-y-6">
              {OBSERVATION_QUESTIONS.map((oq, idx) => (
                <div key={idx} className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                  <p className="text-white font-semibold text-sm mb-3">{oq.question}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {oq.observableOptions.map((opt, oIdx) => (
                      <button
                        key={oIdx}
                        onClick={() => {
                          setObservationAnswers((prev) => ({ ...prev, [idx]: oIdx }));
                          audioManager.play('tap');
                        }}
                        className={`p-3 rounded-lg border text-xs text-left transition-all ${
                          observationAnswers[idx] === oIdx
                            ? oIdx === oq.correctIndex
                              ? 'bg-emerald-900/60 border-emerald-500 text-emerald-200'
                              : 'bg-rose-900/60 border-rose-500 text-rose-200'
                            : 'bg-slate-900 border-slate-700 hover:bg-slate-800 text-slate-300'
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
        </div>
      )}

      {/* ========================================== */}
      {/* TAB 3: GUIDED CHALLENGES (22 QUESTIONS) */}
      {/* ========================================== */}
      {activeTab === 'challenges' && (
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Progress Header */}
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-lg flex justify-between items-center">
            <div>
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">
                Challenge {currentChallengeIdx + 1} of {CHALLENGES.length}
              </span>
              <h3 className="text-lg font-bold text-white mt-1">
                Tier: <span className="capitalize text-amber-400">{currentChallenge.difficulty}</span> | {currentChallenge.competencyLevel}
              </h3>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400">Score</span>
              <div className="text-2xl font-black text-purple-400">{score} pts</div>
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-6">
            <p className="text-white text-base font-semibold leading-relaxed">{currentChallenge.question}</p>

            {/* MCQ Options */}
            {currentChallenge.type === 'mcq' && currentChallenge.options && (
              <div className="grid grid-cols-1 gap-3">
                {currentChallenge.options.map((opt, idx) => (
                  <button
                    key={idx}
                    disabled={challengeCompleted}
                    onClick={() => {
                      setSelectedOption(idx);
                      audioManager.play('tap');
                    }}
                    className={`p-4 rounded-xl border text-left text-sm transition-all ${
                      selectedOption === idx
                        ? 'bg-purple-900/60 border-purple-500 text-white font-bold'
                        : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span className="font-extrabold mr-3 text-purple-400">{String.fromCharCode(65 + idx)}.</span>
                    {opt}
                  </button>
                ))}
              </div>
            )}

            {/* Numeric Input */}
            {currentChallenge.type === 'numeric' && (
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-400">Enter Numeric Answer:</label>
                <input
                  type="number"
                  value={numericInput}
                  onChange={(e) => setNumericInput(e.target.value)}
                  placeholder="e.g. 90"
                  className="w-full bg-slate-800 border border-slate-700 text-white text-lg font-bold p-3 rounded-xl focus:outline-none focus:border-purple-500"
                />
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-between items-center pt-4 stroke-slate-800 border-t border-slate-800">
              <button
                onClick={() => {
                  setShowHint(true);
                  setHintText(currentChallenge.hints[currentHintIdx]);
                  setCurrentHintIdx((prev) => (prev + 1) % currentChallenge.hints.length);
                  audioManager.play('hint');
                }}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-bold rounded-lg transition-all"
              >
                💡 Hint ({currentHintIdx + 1}/3)
              </button>

              {!challengeCompleted ? (
                <button
                  onClick={() => handleVerifyAnswer(selectedOption ?? undefined)}
                  className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white text-sm font-extrabold rounded-xl shadow-lg shadow-purple-600/30 transition-all"
                >
                  Submit Answer
                </button>
              ) : (
                <button
                  onClick={handleNextChallenge}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-extrabold rounded-xl shadow-lg shadow-emerald-600/30 transition-all"
                >
                  Next Challenge ➔
                </button>
              )}
            </div>

            {/* Explanation Box */}
            {challengeCompleted && (
              <div className="p-4 bg-emerald-950/50 border border-emerald-800 rounded-xl text-xs text-emerald-200">
                <strong>Explanation:</strong> {currentChallenge.explanation}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* TAB 4: SUMMARY & REAL WORLD LAB */}
      {/* ========================================== */}
      {activeTab === 'summary' && (
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Real World Activity Card */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
            <span className="bg-pink-500/20 text-pink-300 text-xs font-bold px-3 py-1 rounded-full uppercase">
              Real-World Chemistry Task
            </span>
            <h2 className="text-xl font-bold text-white mt-2 mb-2">{REAL_WORLD_ACTIVITY.title}</h2>
            <p className="text-slate-300 text-sm mb-4 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>

            <div className="space-y-3">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <div key={idx} className="bg-slate-800/60 p-3.5 rounded-xl border border-slate-700 text-xs text-slate-200 flex items-start gap-3">
                  <span className="bg-pink-600 text-white font-bold px-2 py-0.5 rounded text-[10px]">{idx + 1}</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Misconceptions Corrected Grid */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
            <h3 className="text-lg font-bold text-amber-300 mb-4">🧠 Misconceptions Corrected in this Unit</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MISCONCEPTIONS.map((m) => (
                <div key={m.id} className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 text-xs space-y-2">
                  <div className="text-rose-400 font-bold">❌ Common Belief: "{m.misconception}"</div>
                  <div className="text-emerald-300">✅ Chemical Reality: {m.correction}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Diagnostic Review Grid */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
            <h3 className="text-lg font-bold text-blue-300 mb-4">📝 Diagnostic Knowledge Check ({DIAGNOSTIC_QUESTIONS.length})</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {DIAGNOSTIC_QUESTIONS.map((dq) => (
                <div key={dq.id} className="bg-slate-800/40 p-4 rounded-xl border border-slate-700 text-xs space-y-2">
                  <div className="text-white font-bold">{dq.question}</div>
                  <div className="text-emerald-400 font-medium">Correct: {dq.options[dq.correctIndex]}</div>
                  <div className="text-slate-400 italic text-[11px]">{dq.explanation}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* MANDATORY FEEDBACK COMPONENTS IN JSX */}
      {/* ========================================== */}
      <HintBubble show={showHint} text={hintText} />
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccess} text="Challenge Completed Successfully!" />
      <SparkleBurst show={showSparkle} x={400} y={300} />
    </div>
  );
}