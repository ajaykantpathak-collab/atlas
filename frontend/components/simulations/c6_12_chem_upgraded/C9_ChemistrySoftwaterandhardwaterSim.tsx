'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Sparkles,
  Beaker,
  Flame,
  Droplets,
  Layers,
  Calculator,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  Volume2,
  VolumeX,
  Award,
  BookOpen,
  ArrowRight,
  ShieldAlert,
  Zap,
  Check,
  ChevronRight,
  Activity,
  Filter,
  RefreshCw,
  Info,
  TrendingDown,
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
import { createReviewItem, sm2Update, SRSItem } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, BKTState, masteryProb } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';

// ==========================================
// CONSTANTS & NODE DEFINITIONS (ICSE CLASS 9)
// ==========================================
const NODE_021 = 'c9_chem_021'; // Soft Water vs Hard Water definition & soap lathering
const NODE_022 = 'c9_chem_022'; // Soap vs Synthetic Detergents & Scum formation (Calcium/Magnesium stearate)
const NODE_023 = 'c9_chem_023'; // Causes of Hardness: Calcium & Magnesium soluble salts
const NODE_024 = 'c9_chem_024'; // Temporary Hardness: Ca(HCO3)2 & Mg(HCO3)2
const NODE_025 = 'c9_chem_025'; // Permanent Hardness: Chlorides & Sulfates (CaCl2, CaSO4, MgCl2, MgSO4)
const NODE_026 = 'c9_chem_026'; // Disadvantages of Hard Water: Soap waste, Boiler Scale, Fuel loss, Pipe clogging
const NODE_027 = 'c9_chem_027'; // Removal of Temporary Hardness: Boiling & Clark's Lime Process
const NODE_028 = 'c9_chem_028'; // Removal of Permanent Hardness: Washing Soda (Na2CO3) Process
const NODE_029 = 'c9_chem_029'; // Removal of Hardness: Permutit / Ion Exchange Resin Process & Regeneration
const NODE_030 = 'c9_chem_030'; // Degree of Hardness & EDTA Titration Calculations (ppm CaCO3 eq)

const ALL_NODE_IDS = [
  NODE_021, NODE_022, NODE_023, NODE_024, NODE_025,
  NODE_026, NODE_027, NODE_028, NODE_029, NODE_030
];

const NODE_TITLES: Record<string, string> = {
  [NODE_021]: 'Soft Water vs Hard Water Fundamentals',
  [NODE_022]: 'Soap Action & Scum Formation Chemistry',
  [NODE_023]: 'Chemical Salts Causing Hardness',
  [NODE_024]: 'Temporary Hardness & Hydrogen Carbonates',
  [NODE_025]: 'Permanent Hardness: Chlorides & Sulfates',
  [NODE_026]: 'Industrial & Domestic Impact of Hard Water',
  [NODE_027]: 'Thermal Decomposition & Clark\'s Lime Process',
  [NODE_028]: 'Washing Soda Treatment Method',
  [NODE_029]: 'Ion Exchange & Permutit Zeolite Softening',
  [NODE_030]: 'Hardness Measurement & EDTA Titration Math'
};

// ==========================================
// MANDATORY SECTION 1: SCENARIO
// ==========================================
const SCENARIO = {
  title: 'Water Hardness Analysis & Industrial Softening Laboratory',
  intro: 'Welcome to the Central Environmental & Industrial Chemistry Testing Facility! You have been appointed as Lead Chemical Analyst to inspect municipal water samples, prevent catastrophic boiler scale in thermal power plants, and operate high-capacity ion-exchange water treatment systems.',
  context: 'In this simulation, you will analyze soft and hard water samples, investigate scum formation with soap, perform thermal decomposition of temporary hardness, execute Clark\'s lime treatment, precipitate permanent hardness with washing soda, operate Permutit ion-exchange resins, and calculate water hardness in ppm via EDTA micro-titration.'
};

// ==========================================
// MANDATORY SECTION 2: DISCOVERY QUESTION
// ==========================================
const DISCOVERY_QUESTION = {
  question: 'When hard water containing calcium hydrogen carbonate is boiled in an electric kettle, a thick white crust forms on the heating element and the water produces abundant lather with soap afterwards. What chemical transformation occurred during boiling?',
  options: [
    'Boiling destroyed the soap molecules, allowing calcium to dissolve completely without forming scum.',
    'Soluble calcium hydrogen carbonate thermally decomposed into insoluble calcium carbonate precipitate, removing Ca²⁺ ions from solution.',
    'Boiling converted calcium sulfate into soluble sodium chloride by evaporation.',
    'Water molecules evaporated, leaving behind pure liquid calcium that reacts with air to form soap.'
  ],
  correctIndex: 1,
  hintAfter: 'Boiling converts soluble bicarbonate Ca(HCO₃)₂ into insoluble carbonate CaCO₃ precipitate (boiler scale). Because Ca²⁺ leaves the liquid solution as solid scale, the remaining water is softened!'
};

// ==========================================
// MANDATORY SECTION 3: EXPLORATION STEPS
// ==========================================
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Lathering Test & Scum Quantification',
    instruction: 'Select water samples (Distilled, Rain, Well, Mineral) and incrementally add soap solution while stirring. Measure the height of lather produced and observe insoluble scum precipitation.',
    interactionType: 'lather-test',
    nodeId: NODE_021,
  },
  {
    title: 'Lab 2: Thermal Decomposition & Clark\'s Lime Method',
    instruction: 'Heat temporary hard water samples to decompose bicarbonate salts, or add precise stoichiometric amounts of slaked lime Ca(OH)₂. Monitor pH, precipitate formation, and remaining Ca²⁺ concentration.',
    interactionType: 'boiling-clark',
    nodeId: NODE_027,
  },
  {
    title: 'Lab 3: Washing Soda (Na₂CO₃) Softening Reaction',
    instruction: 'Treat permanent hard water containing CaCl₂ and MgSO₄ with washing soda. Observe double displacement reactions forming insoluble CaCO₃ and MgCO₃ curds.',
    interactionType: 'washing-soda',
    nodeId: NODE_028,
  },
  {
    title: 'Lab 4: Ion-Exchange Permutit Resin Column',
    instruction: 'Pass hard water through a hydrated sodium aluminum silicate (Zeolite/Permutit) column. Track Na⁺ for Ca²⁺/Mg²⁺ ion exchange, exhaustion of resin, and brine (10% NaCl) regeneration.',
    interactionType: 'ion-exchange',
    nodeId: NODE_029,
  },
  {
    title: 'Lab 5: EDTA Titration & Hardness Calculation (ppm)',
    instruction: 'Perform an automated EDTA micro-titration with Eriochrome Black T (EBT) indicator at pH 10 buffer. Determine total hardness in parts per million (ppm) of equivalent CaCO₃.',
    interactionType: 'edta-titration',
    nodeId: NODE_030,
  },
];

// ==========================================
// MANDATORY SECTION 4: PREDICTION QUESTIONS
// ==========================================
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you take a sample of water containing dissolved MgSO₄ (permanent hardness) and boil it vigorously for 15 minutes, how will its lathering ability with ordinary soap change?',
    options: [
      'It will form abundant lather immediately because boiling removes all forms of hardness.',
      'It will still fail to produce lather readily and will form white scum, because boiling does not remove sulfate hardness.',
      'It will turn into distilled water because sulfates evaporate as gas.',
      'It will turn basic and decompose soap into fatty acids.'
    ],
    correctIndex: 1,
    verifyInstruction: 'Test MgSO₄ water sample in Lab 2 after boiling: observe that Mg²⁺ concentration remains unchanged and scum still forms with soap!',
    nodeId: NODE_025,
  },
  {
    question: 'Predict: What happens to the electrical conductivity and total sodium ion concentration of hard water when it is passed through a fresh Sodium-Permutit (Na₂-Zeolite) column?',
    options: [
      'Conductivity drops to absolute zero because all ions are physically trapped.',
      'Sodium ion concentration increases while Ca²⁺/Mg²⁺ concentration drops to near zero, maintaining electrical neutrality.',
      'Calcium ions are converted into hydrogen gas while sodium ions evaporate.',
      'The resin turns into solid scale and blocks water flow permanently.'
    ],
    correctIndex: 1,
    verifyInstruction: 'Pass sample through Lab 4 resin column: check the live ion meter showing Na⁺ rising while Ca²⁺ falls to 0 ppm!',
    nodeId: NODE_029,
  },
];

// ==========================================
// MANDATORY SECTION 5: OBSERVATION QUESTIONS
// ==========================================
const OBSERVATION_QUESTIONS = [
  {
    question: 'Observation: When soap solution (sodium stearate C₁₇H₃₅COONa) was added to well water, white curdy precipitate formed instead of lather. What is the chemical formula of this scum precipitate?',
    observableOptions: [
      '(C₁₇H₃₅COO)₂Ca and (C₁₇H₃₅COO)₂Mg',
      'CaCO₃ and MgCO₃',
      'NaCl and Na₂SO₄',
      'Ca(OH)₂ and Mg(OH)₂'
    ],
    correctIndex: 0,
    nodeId: NODE_022,
  },
  {
    question: 'Observation: During Clark\'s process, adding excess slaked lime Ca(OH)₂ beyond the stoichiometric requirement caused the water to become hard again! Why did excess lime increase hardness?',
    observableOptions: [
      'Excess Ca(OH)₂ introduces unreacted Ca²⁺ ions into the water, restoring calcium hardness.',
      'Lime reacts with water to form sulfuric acid.',
      'Lime absorbs all lather from the solution.',
      'Lime converts soft sodium ions into insoluble magnesium ions.'
    ],
    correctIndex: 0,
    nodeId: NODE_027,
  },
];

// ==========================================
// MANDATORY SECTION 6: REAL WORLD ACTIVITY
// ==========================================
const REAL_WORLD_ACTIVITY = {
  title: 'Thermal Power Station Boiler Water Treatment & Scale Prevention',
  description: 'In a 500 MW thermal power plant, high-pressure boilers heat thousands of liters of river water to generate steam at 540°C. Untreated raw water contains 250 ppm of Ca(HCO₃)₂ and 120 ppm of MgSO₄. As a plant chemical engineer, calculate chemical dosages and cost to prevent catastrophic boiler explosion.',
  steps: [
    'Step 1: Determine total water throughput: 100,000 Liters per hour.',
    'Step 2: Calculate daily temporary hardness as CaCO₃ equivalent: 250 ppm Ca(HCO₃)₂ = 250 × (100 / 162) = 154.3 ppm CaCO₃ eq. Daily mass of Ca(HCO₃)₂ = 600 kg.',
    'Step 3: Calculate required Lime Ca(OH)₂ mass for Clark\'s treatment: Ca(HCO₃)₂ + Ca(OH)₂ → 2CaCO₃ ↓ + 2H₂O. 162 g bicarbonate requires 74 g lime. Lime required per day = 274.1 kg.',
    'Step 4: Calculate Washing Soda Na₂CO₃ required for 120 ppm MgSO₄ permanent hardness: MgSO₄ + Na₂CO₃ → MgCO₃ ↓ + Na₂SO₄. 120 g MgSO₄ (MW 120.3) requires 106 g Na₂CO₃. Mass required per day = 253.8 kg.',
    'Step 5: Inspect post-treatment water via EDTA titration: hardness must be < 5 ppm to ensure zero boiler scale build-up and maximum thermal efficiency.'
  ]
};

// ==========================================
// MISCONCEPTIONS (PRESERVE & EXPAND)
// ==========================================
const MISCONCEPTIONS = [
  {
    id: 'misc-1',
    title: 'Boiling Removes All Hardness Completely',
    misconception: 'Students often believe that simply boiling water converts both temporary and permanent hard water into soft water.',
    correction: 'Boiling only removes temporary hardness by decomposing soluble hydrogen carbonates into insoluble carbonates. Permanent hardness (chlorides and sulfates) remains unchanged upon boiling.'
  },
  {
    id: 'misc-2',
    title: 'Scum is Dirt Removed From Clothes',
    misconception: 'Students frequently confuse the white curdy precipitate (scum) with dirt being washed off clothes.',
    correction: 'Scum is an insoluble calcium/magnesium stearate salt formed when soap reacts with hardness ions. It wastes soap and impairs cleaning.'
  },
  {
    id: 'misc-3',
    title: 'Boiler Scale Shields and Insulates Water Pipes',
    misconception: 'Students think scale layer strengthens metal pipe walls.',
    correction: 'Boiler scale is a poor thermal conductor, causing extreme heat loss, localized overheating, pipe blistering, and boiler explosions.'
  },
  {
    id: 'misc-4',
    title: 'Ion Exchange Resins Filter Ions Mechanically',
    misconception: 'Students imagine zeolites physically trap minerals like a fine sieve.',
    correction: 'Ion exchange is a reversible chemical displacement process where Ca²⁺/Mg²⁺ ions exchange with Na⁺/H⁺ ions on resin matrix surface.'
  },
  {
    id: 'misc-5',
    title: 'Soft Water Is Pure Distilled Water',
    misconception: 'Students equate soft water with pure H₂O free of all ions.',
    correction: 'Soft water lacks Ca²⁺ and Mg²⁺, but still contains soluble salts like NaCl or NaHCO₃.'
  },
  {
    id: 'misc-6',
    title: 'Detergents Form Scum Just Like Soap',
    misconception: 'Students assume synthetic detergents produce scum in hard water.',
    correction: 'Synthetic detergents (alkyl benzene sulfonates) form soluble calcium and magnesium salts, thus lathering freely without scum.'
  }
];

// ==========================================
// DIAGNOSTIC QUESTIONS
// ==========================================
const DIAGNOSTIC_QUESTIONS = [
  {
    id: 'diag-1',
    nodeId: NODE_021,
    question: 'Which of the following water samples produces lather immediately with minimal soap?',
    options: ['Rain water / Distilled water', 'Deep borehole well water', 'Sea water', 'Mineral river water'],
    correctIndex: 0,
    explanation: 'Rain water and distilled water are soft water free of calcium and magnesium salts.'
  },
  {
    id: 'diag-2',
    nodeId: NODE_022,
    question: 'Why do synthetic detergents work effectively in hard water while soaps fail?',
    options: [
      'Detergent calcium and magnesium salts are water-soluble.',
      'Detergents contain no chemical bonds.',
      'Detergents neutralize calcium into sodium gas.',
      'Detergents freeze the hard water.'
    ],
    correctIndex: 0,
    explanation: 'Calcium and magnesium alkyl sulfonates are soluble in water, so no scum is formed.'
  },
  {
    id: 'diag-3',
    nodeId: NODE_023,
    question: 'Which pair of cations is primarily responsible for water hardness?',
    options: ['Na⁺ and K⁺', 'Ca²⁺ and Mg²⁺', 'Fe³⁺ and Cu²⁺', 'NH₄⁺ and H⁺'],
    correctIndex: 1,
    explanation: 'Hardness is caused by dissolved Ca²⁺ and Mg²⁺ cations.'
  },
  {
    id: 'diag-4',
    nodeId: NODE_024,
    question: 'Temporary hardness is caused by dissolved:',
    options: ['Calcium & magnesium hydrogen carbonates', 'Calcium & magnesium chlorides', 'Sodium carbonates', 'Magnesium sulfates'],
    correctIndex: 0,
    explanation: 'Ca(HCO₃)₂ and Mg(HCO₃)₂ cause temporary hardness.'
  },
  {
    id: 'diag-5',
    nodeId: NODE_025,
    question: 'Which salt compound produces permanent hardness in water?',
    options: ['Ca(HCO₃)₂', 'MgSO₄', 'NaHCO₃', 'K₂SO₄'],
    correctIndex: 1,
    explanation: 'Sulfates and chlorides of Ca and Mg cause permanent hardness.'
  },
  {
    id: 'diag-6',
    nodeId: NODE_026,
    question: 'What is the main danger of boiler scale accumulation in high-pressure industrial boilers?',
    options: [
      'Overheating beneath scale leading to pipe bursting/explosions',
      'Water turning into soap',
      'Boiler becoming super-chilled',
      'Rust disappearing'
    ],
    correctIndex: 0,
    explanation: 'Scale acts as thermal insulator, causing boiler metal to overheat, weaken, and burst under pressure.'
  },
  {
    id: 'diag-7',
    nodeId: NODE_027,
    question: 'What chemical reagent is added in Clark\'s method to remove temporary hardness?',
    options: ['Calculated quantity of slaked lime Ca(OH)₂', 'Excess concentrated HCl', 'Sodium chloride brine', 'Copper sulfate'],
    correctIndex: 0,
    explanation: 'Clark\'s method uses calculated slaked lime Ca(OH)₂ to convert soluble bicarbonates to insoluble carbonates.'
  },
  {
    id: 'diag-8',
    nodeId: NODE_028,
    question: 'What is the chemical reaction when washing soda (Na₂CO₃) is added to hard water containing CaCl₂?',
    options: [
      'CaCl₂ + Na₂CO₃ → CaCO₃ ↓ + 2NaCl',
      'CaCl₂ + Na₂CO₃ → CaNa₂ + Cl₂CO₃',
      'CaCl₂ + Na₂CO₃ → Ca(OH)₂ + Na₂',
      'No chemical reaction occurs'
    ],
    correctIndex: 0,
    explanation: 'Double displacement forms insoluble calcium carbonate precipitate and soluble NaCl.'
  }
];

// ==========================================
// 22+ COMPREHENSIVE CHALLENGES
// ==========================================
interface Challenge {
  id: string;
  nodeId: string;
  tier: 'foundation' | 'standard' | 'advanced';
  type: 'multiple-choice' | 'numeric' | 'matching' | 'sequencing';
  question: string;
  options?: string[];
  correctIndex?: number;
  correctAnswer?: number;
  tolerance?: number;
  unit?: string;
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
}

const CHALLENGES: Challenge[] = [
  // --- FOUNDATION TIER (1-8) ---
  {
    id: 'c-1',
    nodeId: NODE_021,
    tier: 'foundation',
    type: 'multiple-choice',
    question: 'Water that forms ready and abundant lather with soap solution is known as:',
    options: ['Soft water', 'Temporary hard water', 'Permanent hard water', 'Heavy water'],
    correctIndex: 0,
    explanation: 'Soft water readily forms lather with soap because it lacks Ca²⁺ and Mg²⁺ ions.',
    hints: ['Think of rain water or distilled water.', 'It produces lather immediately without curd.', 'Lathering is easy when no hardness ions precipitate the soap.']
  },
  {
    id: 'c-2',
    nodeId: NODE_021,
    tier: 'foundation',
    type: 'multiple-choice',
    question: 'Hard water is defined as water which:',
    options: [
      'Does not form lather easily with soap and produces a white scum',
      'Freezes at 10°C',
      'Contains high concentration of dissolved oxygen gas',
      'Is completely toxic and undrinkable under any condition'
    ],
    correctIndex: 0,
    explanation: 'Hard water reacts with soap to form insoluble scum, consuming soap before lather appears.',
    hints: ['Recall what happens when washing clothes in well water.', 'Look for scum formation.', 'It wastes soap due to chemical precipitation.']
  },
  {
    id: 'c-3',
    nodeId: NODE_022,
    tier: 'foundation',
    type: 'multiple-choice',
    question: 'What chemical substance constitutes the white curdy precipitate ("scum") formed when soap is added to hard water containing Ca²⁺?',
    options: [
      'Calcium stearate (C₁₇H₃₅COO)₂Ca',
      'Sodium chloride NaCl',
      'Calcium carbonate CaCO₃',
      'Sodium stearate C₁₇H₃₅COONa'
    ],
    correctIndex: 0,
    explanation: 'Soap (sodium stearate) reacts with Ca²⁺ to precipitate insoluble calcium stearate.',
    hints: ['Soap anion is stearate C₁₇H₃₅COO⁻.', 'Calcium replaces sodium in the fatty acid salt.', 'The product is an insoluble calcium carboxylate.']
  },
  {
    id: 'c-4',
    nodeId: NODE_023,
    tier: 'foundation',
    type: 'multiple-choice',
    question: 'Which of the following salts dissolved in water DOES NOT cause hardness?',
    options: ['Sodium chloride (NaCl)', 'Calcium hydrogen carbonate Ca(HCO₃)₂', 'Magnesium sulfate (MgSO₄)', 'Calcium chloride (CaCl₂)'],
    correctIndex: 0,
    explanation: 'Sodium salts do not form insoluble scum with soap and do not cause hardness.',
    hints: ['Sodium ions form soluble soap salts.', 'Look for alkali metal vs alkaline earth metal.', 'Na⁺ salts remain soluble.']
  },
  {
    id: 'c-5',
    nodeId: NODE_024,
    tier: 'foundation',
    type: 'multiple-choice',
    question: 'Temporary hardness in water is caused by the presence of:',
    options: [
      'Hydrogen carbonates of calcium and magnesium',
      'Chlorides of calcium and magnesium',
      'Sulfates of sodium and potassium',
      'Nitrates of lead and copper'
    ],
    correctIndex: 0,
    explanation: 'Temporary hardness is exclusively caused by dissolved Ca(HCO₃)₂ and Mg(HCO₃)₂.',
    hints: ['These salts decompose upon simple boiling.', 'Think of hydrogen carbonates (bicarbonates).', 'Formula contains HCO₃⁻ ions.']
  },
  {
    id: 'c-6',
    nodeId: NODE_025,
    tier: 'foundation',
    type: 'multiple-choice',
    question: 'Permanent hardness in water is caused by:',
    options: [
      'Chlorides and sulfates of calcium and magnesium',
      'Hydrogen carbonates of calcium and magnesium',
      'Hydroxides of sodium and potassium',
      'Carbonates of ammonium'
    ],
    correctIndex: 0,
    explanation: 'Chlorides (CaCl₂, MgCl₂) and sulfates (CaSO₄, MgSO₄) cause permanent hardness.',
    hints: ['These salts do not decompose upon boiling.', 'Look for Cl⁻ and SO₄²⁻ anions.', 'Requires chemical treatment or ion exchange to remove.']
  },
  {
    id: 'c-7',
    nodeId: NODE_026,
    tier: 'foundation',
    type: 'multiple-choice',
    question: 'What is "boiler scale"?',
    options: [
      'Insoluble mineral deposit (CaCO₃, CaSO₄) forming an insulating layer inside steam boilers',
      'A device used to weigh boilers in power plants',
      'A protective zinc coating inside iron boilers',
      'Soap lather that sticks to kettle walls'
    ],
    correctIndex: 0,
    explanation: 'Boiler scale is an insoluble precipitate layer deposited on heating surfaces, reducing heat transfer.',
    hints: ['It forms when hard water is heated in boilers.', 'It acts as an unwanted insulator.', 'Composed of carbonates and sulfates.']
  },
  {
    id: 'c-8',
    nodeId: NODE_029,
    tier: 'foundation',
    type: 'multiple-choice',
    question: 'What is Permutit chemically?',
    options: [
      'Hydrated sodium aluminum silicate (Na₂Al₂Si₂O₈·xH₂O)',
      'Pure calcium carbonate',
      'Concentrated sulfuric acid',
      'Solid sodium hydroxide pellets'
    ],
    correctIndex: 0,
    explanation: 'Permutit (zeolite) is hydrated sodium aluminum silicate used in ion exchange.',
    hints: ['It contains exchangeable Na⁺ ions.', 'It is an inorganic cation exchanger.', 'Formula involves Na, Al, Si, O.']
  },

  // --- STANDARD TIER (9-16) ---
  {
    id: 'c-9',
    nodeId: NODE_027,
    tier: 'standard',
    type: 'multiple-choice',
    question: 'What chemical equation correctly represents the removal of temporary hardness by boiling?',
    options: [
      'Ca(HCO₃)₂ (aq) —heat→ CaCO₃ (s) ↓ + H₂O (l) + CO₂ (g) ↑',
      'CaSO₄ (aq) —heat→ CaO (s) + SO₃ (g)',
      'CaCl₂ (aq) —heat→ Ca (s) + Cl₂ (g)',
      'Ca(HCO₃)₂ (aq) —heat→ Ca (s) + 2HCO₃ (aq)'
    ],
    correctIndex: 0,
    explanation: 'Boiling decomposes soluble Ca(HCO₃)₂ into insoluble CaCO₃ precipitate, water, and CO₂ gas.',
    hints: ['Soluble bicarbonate turns into solid carbonate.', 'Carbon dioxide gas is evolved.', 'Precipitate settles down.']
  },
  {
    id: 'c-10',
    nodeId: NODE_027,
    tier: 'standard',
    type: 'multiple-choice',
    question: 'In Clark\'s process for removing temporary hardness, what is added to hard water?',
    options: [
      'Calculated amount of slaked lime Ca(OH)₂',
      'Excess sodium hydroxide NaOH',
      'Hydrochloric acid HCl',
      'Ammonium hydroxide NH₄OH'
    ],
    correctIndex: 0,
    explanation: 'Clark\'s process adds a calculated stoichiometric quantity of Ca(OH)₂ to convert bicarbonates into insoluble carbonates.',
    hints: ['Slaked lime is used.', 'Must be added in exact calculated amount.', 'Excess lime re-introduces hardness.']
  },
  {
    id: 'c-11',
    nodeId: NODE_028,
    tier: 'standard',
    type: 'multiple-choice',
    question: 'When washing soda Na₂CO₃ is added to permanent hard water containing MgSO₄, what reaction occurs?',
    options: [
      'MgSO₄ + Na₂CO₃ → MgCO₃ ↓ + Na₂SO₄',
      'MgSO₄ + Na₂CO₃ → MgNa₂ + SO₄CO₃',
      'MgSO₄ + Na₂CO₃ → Mg(OH)₂ + Na₂SO₃',
      'No reaction occurs because sulfate is permanent'
    ],
    correctIndex: 0,
    explanation: 'Washing soda undergoes double displacement: Mg²⁺ precipitates as MgCO₃ curd while soluble Na₂SO₄ stays in solution.',
    hints: ['Carbonate replaces sulfate.', 'Insoluble magnesium carbonate precipitates.', 'Sodium sulfate remains soluble.']
  },
  {
    id: 'c-12',
    nodeId: NODE_029,
    tier: 'standard',
    type: 'multiple-choice',
    question: 'How is an exhausted Permutit (Zeolite) ion-exchange bed regenerated after it becomes saturated with Ca²⁺ and Mg²⁺ ions?',
    options: [
      'By washing with concentrated (10%) Sodium Chloride (NaCl) brine solution',
      'By heating the resin bed to 800°C',
      'By passing pure distilled water in reverse',
      'By adding concentrated nitric acid'
    ],
    correctIndex: 0,
    explanation: 'Concentrated NaCl brine forces high concentration Na⁺ ions to replace trapped Ca²⁺/Mg²⁺ ions, restoring Na-Permutit.',
    hints: ['Uses common salt (brine).', 'Reversible ion exchange driven by high Na⁺ concentration.', 'Calcium/magnesium chlorides are washed away in effluent.']
  },
  {
    id: 'c-13',
    nodeId: NODE_026,
    tier: 'standard',
    type: 'multiple-choice',
    question: 'Why does boiler scale cause excessive fuel consumption in power stations?',
    options: [
      'Scale has very low thermal conductivity (acts as heat insulator), requiring much more fuel to boil water',
      'Scale absorbs coal and burns it without releasing heat',
      'Scale converts water into carbon dioxide gas directly',
      'Scale increases water density so high pressure pumps stop'
    ],
    correctIndex: 0,
    explanation: 'Scale is a poor conductor of heat. A 15 mm layer of scale can increase fuel consumption by over 50%.',
    hints: ['Think of thermal conductivity.', 'Heat cannot easily pass through mineral scale.', 'More heat is lost in flue gases.']
  },
  {
    id: 'c-14',
    nodeId: NODE_022,
    tier: 'standard',
    type: 'multiple-choice',
    question: 'Why do synthetic detergents (e.g., sodium lauryl sulfate) lather effectively in hard water while ordinary soaps fail?',
    options: [
      'Their calcium and magnesium salts are soluble in water',
      'They do not react with water at all',
      'They destroy calcium atoms by nuclear reaction',
      'They contain pure sodium carbonate powder'
    ],
    correctIndex: 0,
    explanation: 'Calcium and magnesium salts of synthetic sulfonate detergents are soluble, so no precipitate (scum) is formed.',
    hints: ['Check the solubility of calcium sulfonates.', 'No solid scum curds form.', 'Detergent remains available for cleansing action.']
  },
  {
    id: 'c-15',
    nodeId: NODE_030,
    tier: 'numeric',
    question: 'A water sample contains 16.2 mg of Ca(HCO₃)₂ per Liter of water. Calculate its temporary hardness expressed in ppm (parts per million) of equivalent CaCO₃. (Molar mass of Ca(HCO₃)₂ = 162 g/mol, CaCO₃ = 100 g/mol)',
    correctAnswer: 10,
    tolerance: 0.5,
    unit: 'ppm',
    explanation: '162 mg Ca(HCO₃)₂ ≡ 100 mg CaCO₃. Therefore 16.2 mg/L Ca(HCO₃)₂ = 10.0 mg/L CaCO₃ eq = 10 ppm.',
    hints: ['Formula: Hardness (ppm) = (Mass of salt / Molar mass of salt) × Molar mass of CaCO₃.', '(16.2 / 162) × 100 = 10 ppm.', '1 mg/L in water = 1 ppm.']
  },
  {
    id: 'c-16',
    nodeId: NODE_030,
    tier: 'standard',
    type: 'multiple-choice',
    question: 'In EDTA titration for total hardness, what indicator is used and what is the color change at the endpoint at pH 10?',
    options: [
      'Eriochrome Black T (EBT); Wine Red to Pure Blue',
      'Phenolphthalein; Colorless to Pink',
      'Methyl Orange; Red to Yellow',
      'Starch; Blue to Colorless'
    ],
    correctIndex: 0,
    explanation: 'EBT indicator forms a wine-red complex with Ca²⁺/Mg²⁺. When EDTA chelates all metal ions at endpoint, free EBT turns pure blue.',
    hints: ['Indicator abbreviation is EBT.', 'Starts wine-red when metal ions are present.', 'Turns pure blue when free of metal ions.']
  },

  // --- ADVANCED TIER (17-24) ---
  {
    id: 'c-17',
    nodeId: NODE_030,
    tier: 'advanced',
    type: 'numeric',
    question: 'A 100 mL sample of hard water required 15.0 mL of 0.01 M EDTA solution for complete titration using EBT indicator. Calculate the total hardness in ppm of equivalent CaCO₃. (Molar mass of CaCO₃ = 100 g/mol)',
    correctAnswer: 150,
    tolerance: 2.0,
    unit: 'ppm',
    explanation: 'Moles EDTA = 0.015 L × 0.01 M = 1.5×10⁻⁴ mol. Equivalent CaCO₃ = 1.5×10⁻⁴ mol × 100 g/mol = 0.015 g = 15 mg. Hardness = (15 mg / 0.1 L) = 150 ppm.',
    hints: ['Moles EDTA = Molarity × Volume (in L).', '1 mole EDTA binds 1 mole Ca²⁺ ≡ 1 mole CaCO₃.', 'Convert mass in mg to mg/L (ppm).']
  },
  {
    id: 'c-18',
    nodeId: NODE_027,
    tier: 'advanced',
    type: 'multiple-choice',
    question: 'Why does adding an excess of slaked lime Ca(OH)₂ beyond the required stoichiometric amount in Clark\'s process cause INCREASED hardness in water?',
    options: [
      'Unreacted Ca(OH)₂ dissolves in water, introducing free Ca²⁺ ions and OH⁻ ions, thereby increasing hardness',
      'Excess lime reacts with water to form calcium sulfate',
      'Lime converts soft sodium ions into calcium ions',
      'Lime decomposes water into hydrogen gas'
    ],
    correctIndex: 0,
    explanation: 'Ca(OH)₂ is slightly soluble in water. Any excess lime added beyond bicarbonate stoichiometry remains dissolved as Ca²⁺ ions, creating artificial calcium hardness.',
    hints: ['Slaked lime contains calcium Ca²⁺ ions.', 'Once all HCO₃⁻ is precipitated, extra Ca(OH)₂ stays in solution.', 'Extra Ca²⁺ ions mean extra hardness!']
  },
  {
    id: 'c-19',
    nodeId: NODE_028,
    tier: 'advanced',
    type: 'numeric',
    question: 'Calculate the mass (in grams) of pure Washing Soda (Na₂CO₃, MW = 106 g/mol) required to completely remove permanent hardness from 1000 Liters of water containing 111 mg/L of CaCl₂ (MW = 111 g/mol).',
    correctAnswer: 106,
    tolerance: 1.0,
    unit: 'g',
    explanation: 'Reaction: CaCl₂ + Na₂CO₃ → CaCO₃ ↓ + 2NaCl. 111 g CaCl₂ requires 106 g Na₂CO₃. Concentration = 111 mg/L = 0.111 g/L. Total CaCl₂ in 1000 L = 111 g. Requires exactly 106 g Na₂CO₃.',
    hints: ['Find total grams of CaCl₂ in 1000 L: 0.111 g/L × 1000 L = 111 g.', 'Stochiometry is 1 : 1 mole ratio.', '111 g CaCl₂ = 1 mole, requires 1 mole (106 g) Na₂CO₃.']
  },
  {
    id: 'c-20',
    nodeId: NODE_029,
    tier: 'advanced',
    type: 'multiple-choice',
    question: 'In modern synthetic ion exchange softening, how is completely demineralized (deionized) water produced for high-pressure boilers?',
    options: [
      'By passing water through a Cation Exchange Resin (H⁺-form) followed by an Anion Exchange Resin (OH⁻-form)',
      'By boiling water three times in a copper vessel',
      'By adding high concentration of table salt (NaCl)',
      'By filtering water through sand and charcoal beds'
    ],
    correctIndex: 0,
    explanation: 'Cation exchange replaces all cations with H⁺; anion exchange replaces all anions with OH⁻. H⁺ + OH⁻ combine to form pure H₂O.',
    hints: ['Two columns are used.', 'Cations swap for H⁺, anions swap for OH⁻.', 'H⁺ + OH⁻ = H₂O (Demineralized Water).']
  },
  {
    id: 'c-21',
    nodeId: NODE_026,
    tier: 'advanced',
    type: 'multiple-choice',
    question: 'Consider the reaction inside a boiler: Mg(HCO₃)₂ —heat→ Mg(OH)₂ ↓ + 2CO₂ ↑. Why does magnesium precipitate as hydroxide Mg(OH)₂ rather than carbonate MgCO₃ during boiling?',
    options: [
      'MgCO₃ is slightly soluble and hydrolyzes at high temperature to form the far less soluble Mg(OH)₂ precipitate',
      'Magnesium cannot form carbonate salts',
      'Carbonate ions evaporate at 100°C',
      'Hydroxide ions are formed by coal combustion'
    ],
    correctIndex: 0,
    explanation: 'MgCO₃ is more soluble than CaCO₃. At high boiling temperatures, MgCO₃ undergoes thermal hydrolysis into extremely insoluble Mg(OH)₂.',
    hints: ['Check the solubility products Ksp of MgCO₃ vs Mg(OH)₂.', 'High temperature favors hydrolysis of MgCO₃.', 'Mg(OH)₂ is extremely insoluble in hot water.']
  },
  {
    id: 'c-22',
    nodeId: NODE_030,
    tier: 'advanced',
    type: 'numeric',
    question: 'A 50 mL water sample containing both temporary and permanent hardness required 20 mL of 0.01 M EDTA. Another 50 mL sample was boiled, filtered, and then required 8 mL of 0.01 M EDTA. Calculate the TEMPORARY hardness of the original sample in ppm CaCO₃ eq.',
    correctAnswer: 240,
    tolerance: 5.0,
    unit: 'ppm',
    explanation: 'Total Hardness = (20 mL × 0.01 × 100 × 1000) / 50 = 400 ppm. Permanent Hardness (after boiling) = (8 mL × 0.01 × 100 × 1000) / 50 = 160 ppm. Temporary Hardness = Total - Permanent = 400 - 160 = 240 ppm.',
    hints: ['Total Hardness = 20 mL EDTA equivalent.', 'Permanent Hardness (remains after boiling) = 8 mL EDTA equivalent.', 'Temporary Hardness = Total - Permanent = 12 mL EDTA equivalent.', '(12 × 0.01 × 100 × 1000) / 50 = 240 ppm.']
  },
  {
    id: 'c-23',
    nodeId: NODE_029,
    tier: 'advanced',
    type: 'numeric',
    question: 'An ion-exchange permutit column has a capacity of 5.0 grams of Ca²⁺ exchange. How many Liters of hard water containing 100 ppm of Ca²⁺ ions (100 mg/L) can be completely softened before regeneration is necessary?',
    correctAnswer: 50,
    tolerance: 1.0,
    unit: 'Liters',
    explanation: 'Capacity = 5.0 g = 5000 mg of Ca²⁺. Concentration = 100 mg/L. Volume = 5000 mg / 100 mg/L = 50 Liters.',
    hints: ['5.0 g = 5000 mg.', 'Volume = Total capacity in mg / concentration in mg/L.', '5000 / 100 = 50 L.']
  },
  {
    id: 'c-24',
    nodeId: NODE_025,
    tier: 'advanced',
    type: 'multiple-choice',
    question: 'Why does CaSO₄ cause scale formation in boilers even though it is moderately soluble at room temperature?',
    options: [
      'CaSO₄ exhibits retrograde solubility: its solubility decreases as temperature increases, causing precipitation on hot boiler walls',
      'CaSO₄ reacts with water to form iron oxide',
      'CaSO₄ freezes when heated',
      'CaSO₄ converts into gas under high pressure'
    ],
    correctIndex: 0,
    explanation: 'CaSO₄ has retrograde solubility. As boiler water gets hotter, CaSO₄ becomes less soluble and crystallizes directly onto the hottest metal surfaces as hard scale.',
    hints: ['Retrograde solubility means solubility drops with rising temperature.', 'Hotter metal surfaces cause immediate precipitation.', 'Forms dense, rock-hard calcium sulfate scale.']
  }
];

// ==========================================
// TOPIC SPECIFIC SVG DIAGRAM COMPONENTS
// ==========================================

// Diagram 1: Soap vs Scum Molecular Mechanism SVG
const SoapScumSvgDiagram: React.FC<{ activeTab?: string }> = () => {
  return (
    <div className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 shadow-xl">
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-emerald-400 font-bold text-sm flex items-center gap-2">
          <Beaker className="w-4 h-4" /> Soap Action & Scum Formation Chemistry
        </h4>
        <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
          Molecular View
        </span>
      </div>
      <svg viewBox="0 0 600 240" className="w-full h-auto">
        <defs>
          <linearGradient id="waterGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0.9" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Water background */}
        <rect x="10" y="10" width="580" height="220" rx="10" fill="url(#waterGrad)" stroke="#334155" strokeWidth="2" />

        {/* Left Side: Soft Water (Lather) */}
        <g transform="translate(20, 20)">
          <rect x="0" y="0" width="260" height="200" rx="8" fill="#0f172a" stroke="#1e293b" />
          <text x="130" y="24" textAnchor="middle" fill="#38bdf8" className="font-bold text-xs">
            SOFT WATER (No Ca²⁺ / Mg²⁺)
          </text>
          {/* Soap Micelles & Lather */}
          <g transform="translate(130, 70)">
            <circle cx="0" cy="0" r="35" fill="none" stroke="#38bdf8" strokeDasharray="4 2" />
            {/* Hydrophobic tails pointing inward */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((ang, i) => {
              const rad = (ang * Math.PI) / 180;
              const x1 = Math.cos(rad) * 35;
              const y1 = Math.sin(rad) * 35;
              const x2 = Math.cos(rad) * 12;
              const y2 = Math.sin(rad) * 12;
              return (
                <g key={i}>
                  <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#f59e0b" strokeWidth="2" />
                  <circle cx={x1} cy={y1} r="5" fill="#ef4444" />
                </g>
              );
            })}
            <circle cx="0" cy="0" r="10" fill="#3b82f6" opacity="0.5" />
            <text x="0" y="4" textAnchor="middle" fill="#ffffff" className="text-[9px] font-semibold">Dirt</text>
          </g>
          {/* Bubbles on top */}
          <circle cx="80" cy="140" r="14" fill="#38bdf8" opacity="0.3" stroke="#38bdf8" strokeWidth="1.5" />
          <circle cx="110" cy="155" r="18" fill="#38bdf8" opacity="0.3" stroke="#38bdf8" strokeWidth="1.5" />
          <circle cx="145" cy="142" r="15" fill="#38bdf8" opacity="0.3" stroke="#38bdf8" strokeWidth="1.5" />
          <text x="130" y="185" textAnchor="middle" fill="#4ade80" className="text-[11px] font-bold">
            ✓ Abundant Foam & Lather
          </text>
        </g>

        {/* Right Side: Hard Water (Scum) */}
        <g transform="translate(320, 20)">
          <rect x="0" y="0" width="260" height="200" rx="8" fill="#0f172a" stroke="#1e293b" />
          <text x="130" y="24" textAnchor="middle" fill="#f43f5e" className="font-bold text-xs">
            HARD WATER (Contains Ca²⁺ / Mg²⁺)
          </text>
          {/* Scum Precipitate Clumps */}
          <g transform="translate(130, 85)">
            {/* Calcium Stearate curd aggregate */}
            <path d="M-40,-10 Q-20,-30 0,-15 Q20,-35 40,-10 Q55,10 30,30 Q0,40 -35,25 Z" fill="#e2e8f0" opacity="0.8" stroke="#cbd5e1" strokeWidth="2" />
            <circle cx="-15" cy="-5" r="7" fill="#ef4444" />
            <circle cx="15" cy="5" r="7" fill="#ef4444" />
            <circle cx="0" cy="-15" r="8" fill="#a855f7" filter="url(#glow)" />
            <text x="0" y="-12" textAnchor="middle" fill="#ffffff" className="text-[9px] font-bold">Ca²⁺</text>
            <text x="0" y="18" textAnchor="middle" fill="#1e293b" className="text-[10px] font-black">
              SCUM CURD
            </text>
          </g>
          <text x="130" y="160" textAnchor="middle" fill="#94a3b8" className="text-[10px]">
            2 C₁₇H₃₅COO⁻ + Ca²⁺ → (C₁₇H₃₅COO)₂Ca ↓
          </text>
          <text x="130" y="185" textAnchor="middle" fill="#f43f5e" className="text-[11px] font-bold">
            ✗ Soap Wasted as Insoluble Scum
          </text>
        </g>
      </svg>
    </div>
  );
};

// Diagram 2: Permutit Ion Exchange Process SVG
const PermutitSvgDiagram: React.FC = () => {
  return (
    <div className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 shadow-xl">
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-cyan-400 font-bold text-sm flex items-center gap-2">
          <Filter className="w-4 h-4" /> Zeolite / Permutit Ion-Exchange Softener Column
        </h4>
        <span className="text-xs bg-slate-800 text-cyan-300 px-2 py-0.5 rounded border border-slate-700">
          Na₂-Zeolite Bed
        </span>
      </div>
      <svg viewBox="0 0 600 220" className="w-full h-auto">
        {/* Column Shell */}
        <rect x="200" y="10" width="200" height="200" rx="12" fill="#0284c7" fillOpacity="0.1" stroke="#38bdf8" strokeWidth="2" />

        {/* Top Water Inflow */}
        <path d="M 280 0 L 280 20 M 320 0 L 320 20" stroke="#38bdf8" strokeWidth="4" />
        <text x="300" y="12" textAnchor="middle" fill="#38bdf8" className="text-[10px] font-bold">
          HARD WATER IN (Ca²⁺, Mg²⁺)
        </text>

        {/* Resin Bed Matrix */}
        <rect x="210" y="50" width="180" height="110" rx="6" fill="#1e293b" stroke="#334155" />
        {/* Resin Beads with Na+ / Ca2+ */}
        {[
          { cx: 230, cy: 70, c: '#eab308', lbl: 'Na⁺' },
          { cx: 270, cy: 70, c: '#a855f7', lbl: 'Ca²⁺' },
          { cx: 310, cy: 70, c: '#eab308', lbl: 'Na⁺' },
          { cx: 350, cy: 70, c: '#a855f7', lbl: 'Mg²⁺' },
          { cx: 250, cy: 105, c: '#a855f7', lbl: 'Ca²⁺' },
          { cx: 290, cy: 105, c: '#eab308', lbl: 'Na⁺' },
          { cx: 330, cy: 105, c: '#eab308', lbl: 'Na⁺' },
          { cx: 370, cy: 105, c: '#a855f7', lbl: 'Ca²⁺' },
          { cx: 230, cy: 140, c: '#eab308', lbl: 'Na⁺' },
          { cx: 270, cy: 140, c: '#eab308', lbl: 'Na⁺' },
          { cx: 310, cy: 140, c: '#a855f7', lbl: 'Ca²⁺' },
          { cx: 350, cy: 140, c: '#eab308', lbl: 'Na⁺' }
        ].map((item, idx) => (
          <g key={idx}>
            <circle cx={item.cx} cy={item.cy} r="14" fill="#0f172a" stroke={item.c} strokeWidth="2" />
            <circle cx={item.cx} cy={item.cy} r="10" fill={item.c} opacity="0.8" />
            <text x={item.cx} y={item.cy + 3} textAnchor="middle" fill="#ffffff" className="text-[9px] font-bold">
              {item.lbl}
            </text>
          </g>
        ))}

        {/* Chemical Equation overlay */}
        <rect x="20" y="60" width="160" height="90" rx="6" fill="#0f172a" stroke="#334155" />
        <text x="100" y="80" textAnchor="middle" fill="#e2e8f0" className="text-[10px] font-bold">EXCHANGE REACTION</text>
        <text x="100" y="100" textAnchor="middle" fill="#38bdf8" className="text-[9px]">Na₂Ze + Ca²⁺ →</text>
        <text x="100" y="118" textAnchor="middle" fill="#4ade80" className="text-[9px]">CaZe + 2Na⁺</text>
        <text x="100" y="138" textAnchor="middle" fill="#eab308" className="text-[9px] font-medium">Reversible with 10% NaCl</text>

        {/* Regenerant Inflow / Outflow Labels */}
        <g transform="translate(420, 60)">
          <rect x="0" y="0" width="160" height="90" rx="6" fill="#0f172a" stroke="#334155" />
          <text x="80" y="22" textAnchor="middle" fill="#f59e0b" className="text-[10px] font-bold">BRINE REGENERATION</text>
          <text x="80" y="45" textAnchor="middle" fill="#cbd5e1" className="text-[9px]">CaZe + 2NaCl (conc.)</text>
          <text x="80" y="62" textAnchor="middle" fill="#cbd5e1" className="text-[9px]">↓</text>
          <text x="80" y="78" textAnchor="middle" fill="#eab308" className="text-[9px] font-bold">Na₂Ze + CaCl₂ (washed out)</text>
        </g>

        {/* Bottom Soft Water Outflow */}
        <path d="M 280 180 L 280 210 M 320 180 L 320 210" stroke="#4ade80" strokeWidth="4" />
        <text x="300" y="215" textAnchor="middle" fill="#4ade80" className="text-[10px] font-bold">
          SOFTENED WATER OUT (Na⁺ ions, 0 ppm Ca²⁺)
        </text>
      </svg>
    </div>
  );
};

// Diagram 3: Industrial Boiler Scale & Heat Loss Visualizer SVG
const BoilerScaleSvgDiagram: React.FC = () => {
  return (
    <div className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 shadow-xl">
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-amber-400 font-bold text-sm flex items-center gap-2">
          <Flame className="w-4 h-4" /> Boiler Scale Thermal Resistance & Overheating Danger
        </h4>
        <span className="text-xs bg-amber-950 text-amber-300 px-2 py-0.5 rounded border border-amber-800">
          Industrial Hazards
        </span>
      </div>
      <svg viewBox="0 0 600 200" className="w-full h-auto">
        {/* Metal Tube Wall Cross Section */}
        <g transform="translate(40, 30)">
          {/* Flame below */}
          <path d="M 40 140 Q 50 110 60 140 Q 70 100 80 140 Q 90 110 100 140 Z" fill="#f97316" />
          <path d="M 180 140 Q 190 110 200 140 Q 210 100 220 140 Q 230 110 240 140 Z" fill="#ef4444" />
          <text x="150" y="160" textAnchor="middle" fill="#f97316" className="text-[11px] font-bold">
            High Temperature Furnace Flames (900°C)
          </text>

          {/* Boiler Steel Tube Layer */}
          <rect x="20" y="70" width="260" height="25" fill="#475569" stroke="#94a3b8" strokeWidth="1.5" />
          <text x="150" y="87" textAnchor="middle" fill="#ffffff" className="text-[10px] font-semibold">
            Boiler Steel Pipe Wall
          </text>

          {/* Insulating Scale Layer */}
          <rect x="20" y="45" width="260" height="25" fill="#d97706" stroke="#b45309" strokeWidth="1.5" strokeDasharray="3 2" />
          <text x="150" y="62" textAnchor="middle" fill="#fef3c7" className="text-[10px] font-bold">
            Thick Boiler Scale Deposit (CaCO₃ / CaSO₄)
          </text>

          {/* Water Inside */}
          <rect x="20" y="10" width="260" height="35" fill="#0284c7" opacity="0.4" />
          <text x="150" y="32" textAnchor="middle" fill="#38bdf8" className="text-[10px] font-bold">
            Boiler Water (Inefficient Heating)
          </text>

          {/* Heat Flow Arrows blocked */}
          <line x1="70" y1="120" x2="70" y2="72" stroke="#ef4444" strokeWidth="3" markerEnd="url(#arrow)" />
          <line x1="70" y1="45" x2="70" y2="20" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="2 2" />

          <line x1="230" y1="120" x2="230" y2="72" stroke="#ef4444" strokeWidth="3" />
          <line x1="230" y1="45" x2="230" y2="20" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="2 2" />
        </g>

        {/* Diagnostic Text Box */}
        <g transform="translate(360, 30)">
          <rect x="0" y="0" width="210" height="135" rx="8" fill="#0f172a" stroke="#334155" />
          <text x="105" y="24" textAnchor="middle" fill="#f43f5e" className="text-[11px] font-bold">CONSEQUENCES</text>
          <text x="15" y="48" fill="#cbd5e1" className="text-[9px]">1. 50%+ Thermal Energy Wasted</text>
          <text x="15" y="68" fill="#cbd5e1" className="text-[9px]">2. Metal Overheating & Blistering</text>
          <text x="15" y="88" fill="#cbd5e1" className="text-[9px]">3. Pipe Corrosion Under Scale</text>
          <text x="15" y="108" fill="#f43f5e" className="text-[9px] font-bold">4. Explosive Boiler Shell Rupture</text>
        </g>
      </svg>
    </div>
  );
};

// Canvas Animated Particle Model Component
const IonDynamicsCanvas: React.FC<{ activeTab: string }> = ({ activeTab }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const width = canvas.width;
    const height = canvas.height;

    // Particles array
    const particles = Array.from({ length: 30 }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5,
      type: i % 3 === 0 ? 'Ca2+' : i % 3 === 1 ? 'Mg2+' : 'Soap-',
      radius: i % 3 === 2 ? 6 : 4
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Gradient background
      const grad = ctx.createLinearGradient(0, 0, 0, height);
      grad.addColorStop(0, '#0f172a');
      grad.addColorStop(1, '#1e293b');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Update and draw particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 10 || p.x > width - 10) p.vx *= -1;
        if (p.y < 10 || p.y > height - 10) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

        if (p.type === 'Ca2+') {
          ctx.fillStyle = '#a855f7'; // Purple
          ctx.shadowColor = '#a855f7';
        } else if (p.type === 'Mg2+') {
          ctx.fillStyle = '#ec4899'; // Pink
          ctx.shadowColor = '#ec4899';
        } else {
          ctx.fillStyle = '#38bdf8'; // Blue soap
          ctx.shadowColor = '#38bdf8';
        }
        ctx.shadowBlur = 6;
        ctx.fill();

        // Draw label
        ctx.fillStyle = '#ffffff';
        ctx.font = '8px sans-serif';
        ctx.fillText(p.type, p.x - 7, p.y + 3);
      });

      // Draw reaction links when soap and Ca2+ collide
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 45 && ((p1.type === 'Soap-' && p2.type !== 'Soap-') || (p2.type === 'Soap-' && p1.type !== 'Soap-'))) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = 'rgba(239, 68, 68, 0.6)'; // Red scum bond
            ctx.lineWidth = 1.5;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [activeTab]);

  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-900 shadow-inner">
      <div className="absolute top-2 left-3 z-10 text-[11px] font-bold text-slate-300 flex items-center gap-1.5 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700">
        <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
        Live Kinetic Ion & Scum Micro-Simulation
      </div>
      <canvas ref={canvasRef} width={600} height={140} className="w-full h-[140px] block" />
    </div>
  );
};

// ==========================================
// MAIN INTERACTIVE SIMULATION COMPONENT
// ==========================================
export interface C9_ChemistrySoftwaterandhardwaterSimProps {
  onComplete?: (score: number) => void;
  initialMastery?: number;
}

const C9_ChemistrySoftwaterandhardwaterSim: React.FC<C9_ChemistrySoftwaterandhardwaterSimProps> = ({
  onComplete,
  initialMastery = 0.2
}) => {
  // Navigation Tabs State
  const [activeTab, setActiveTab] = useState<'discovery' | 'lab' | 'challenges' | 'summary'>('discovery');

  // Interactive Lab State (5 exploration steps)
  const [currentLabStep, setCurrentLabStep] = useState<number>(0);

  // Lab 1: Lathering Test
  const [lab1WaterType, setLab1WaterType] = useState<'distilled' | 'rain' | 'tap' | 'well' | 'sea'>('well');
  const [lab1SoapDrops, setLab1SoapDrops] = useState<number>(2);
  const [lab1UseDetergent, setLab1UseDetergent] = useState<boolean>(false);
  const [lab1Stirring, setLab1Stirring] = useState<boolean>(false);

  // Lab 2: Boiling & Clark's Process
  const [lab2Temperature, setLab2Temperature] = useState<number>(25);
  const [lab2LimeAdded, setLab2LimeAdded] = useState<number>(0); // mg/L Ca(OH)2

  // Lab 3: Washing Soda
  const [lab3Na2CO3Added, setLab3Na2CO3Added] = useState<number>(0); // mg/L

  // Lab 4: Permutit Resin Column
  const [lab4ResinCapacity, setLab4ResinCapacity] = useState<number>(100); // 100% fresh
  const [lab4VolumePassed, setLab4VolumePassed] = useState<number>(0); // Liters
  const [lab4HardnessInput, setLab4HardnessInput] = useState<number>(300); // ppm

  // Lab 5: EDTA Titration
  const [lab5EdtaVolume, setLab5EdtaVolume] = useState<number>(0); // mL added
  const [lab5TitrationDone, setLab5TitrationDone] = useState<boolean>(false);

  // Discovery / Predictions / Observations UI states
  const [discoverySelected, setDiscoverySelected] = useState<number | null>(null);
  const [discoverySubmitted, setDiscoverySubmitted] = useState<boolean>(false);

  const [predictionAnswers, setPredictionAnswers] = useState<(number | null)[]>([null, null]);
  const [predictionSubmitted, setPredictionSubmitted] = useState<boolean[]>([false, false]);

  const [observationAnswers, setObservationAnswers] = useState<(number | null)[]>([null, null]);
  const [observationSubmitted, setObservationSubmitted] = useState<boolean[]>([false, false]);

  // Challenges State
  const [currentChallengeIdx, setCurrentChallengeIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [numericAnswer, setNumericAnswer] = useState<string>('');
  const [challengeSubmitted, setChallengeSubmitted] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  // SRS & BKT Mastery Engine State
  const [bktStates, setBktStates] = useState<Record<string, BKTState>>(() => {
    const init: Record<string, BKTState> = {};
    ALL_NODE_IDS.forEach((id) => {
      init[id] = createBKTState(initialMastery);
    });
    return init;
  });

  const [srsItems, setSrsItems] = useState<Record<string, SRSItem>>(() => {
    const init: Record<string, SRSItem> = {};
    CHALLENGES.forEach((c) => {
      init[c.id] = createReviewItem(c.id);
    });
    return init;
  });

  const [userScore, setUserScore] = useState<number>(0);
  const [completedChallengesCount, setCompletedChallengesCount] = useState<number>(0);

  // UI Feedback States
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [sparklePos, setSparklePos] = useState({ x: 400, y: 300 });
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHintText, setCurrentHintText] = useState<string>('');
  const [soundMuted, setSoundMuted] = useState<boolean>(false);

  // Auto-hint timer
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  const currentChallenge = CHALLENGES[currentChallengeIdx];

  // Helper sound wrapper
  const playAudio = (soundName: SoundEffect) => {
    if (!soundMuted) {
      audioManager.play(soundName);
    }
  };

  const speakText = (text: string) => {
    if (!soundMuted) {
      speechManager.speak(text);
    }
  };

  // Reset inactivity hint timer
  const resetInactivityTimer = () => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (activeTab === 'challenges' && !challengeSubmitted) {
        setShowHint(true);
        setCurrentHintText(currentChallenge.hints[0] || 'Think carefully about the chemical ions in solution.');
        playAudio('hint');
      }
    }, 12000);
  };

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [currentChallengeIdx, activeTab, challengeSubmitted]);

  // Calculate Overall Mastery across 10 nodes
  const overallMastery = useMemo(() => {
    let sum = 0;
    ALL_NODE_IDS.forEach((id) => {
      sum += masteryProb(bktStates[id]);
    });
    return Math.round((sum / ALL_NODE_IDS.length) * 100);
  }, [bktStates]);

  // Derived Lab 1 Calculations
  const lab1Data = useMemo(() => {
    const hardnessMap = {
      distilled: 0,
      rain: 5,
      tap: 120,
      well: 320,
      sea: 1500
    };
    const hardness = hardnessMap[lab1WaterType];
    if (lab1UseDetergent) {
      const latherHeight = Math.min(10, lab1SoapDrops * 0.8);
      return { hardness, latherHeight, scumMass: 0, soapWasted: 0 };
    }
    const requiredSoapToSoft = hardness / 25; // drops needed to react with Ca2+
    const netSoapForLather = Math.max(0, lab1SoapDrops - requiredSoapToSoft);
    const latherHeight = Math.min(10, netSoapForLather * 0.7);
    const scumMass = Math.min(hardness, lab1SoapDrops * 15);
    return { hardness, latherHeight, scumMass, soapWasted: Math.min(lab1SoapDrops, requiredSoapToSoft) };
  }, [lab1WaterType, lab1SoapDrops, lab1UseDetergent]);

  // Derived Lab 2 Calculations (Boiling / Clark's Process)
  const lab2Data = useMemo(() => {
    // Initial Ca(HCO3)2 = 250 ppm
    const tempFactor = Math.min(1, Math.max(0, (lab2Temperature - 30) / 70));
    const decomposedByBoiling = 250 * tempFactor;

    // Clark's lime stoichiometry: 250 ppm Ca(HCO3)2 requires 114 ppm Ca(OH)2
    let limeUsed = Math.min(250, lab2LimeAdded * (250 / 114));
    let remainingHardness = Math.max(0, 250 - decomposedByBoiling - limeUsed);

    // Excess lime adds Ca2+ back!
    if (lab2LimeAdded > 114 && decomposedByBoiling < 200) {
      const excessLime = lab2LimeAdded - 114;
      remainingHardness += excessLime * 1.35; // Excess Ca2+ from lime
    }

    const pptFormed = 250 - Math.min(250, remainingHardness);
    return { remainingHardness: Math.round(remainingHardness), pptFormed: Math.round(pptFormed) };
  }, [lab2Temperature, lab2LimeAdded]);

  // Derived Lab 3 Calculations (Washing Soda)
  const lab3Data = useMemo(() => {
    // Initial Permanent Hardness (CaCl2 + MgSO4) = 300 ppm
    // Reaction ratio: 300 ppm hardness requires ~286 mg/L Na2CO3
    const reacted = Math.min(300, lab3Na2CO3Added * (300 / 286));
    const remainingHardness = Math.max(0, 300 - reacted);
    const curdPrecipitate = reacted * 0.95;
    return { remainingHardness: Math.round(remainingHardness), curdPrecipitate: Math.round(curdPrecipitate) };
  }, [lab3Na2CO3Added]);

  // Derived Lab 4 Calculations (Permutit Ion Exchange)
  const lab4Data = useMemo(() => {
    // Each L of water passed at lab4HardnessInput reduces capacity
    const capacityLost = (lab4VolumePassed * lab4HardnessInput) / 200; // % loss
    const remainingCap = Math.max(0, 100 - capacityLost);
    const treatedHardness = remainingCap > 0 ? 0 : lab4HardnessInput * 0.9;
    return { remainingCap: Math.round(remainingCap), treatedHardness: Math.round(treatedHardness) };
  }, [lab4VolumePassed, lab4HardnessInput]);

  // Derived Lab 5 Calculations (EDTA Titration)
  const lab5Data = useMemo(() => {
    // Endpoint at 15.0 mL for 150 ppm sample (50 mL water)
    const trueEndpoint = 15.0;
    const isEndpointReached = lab5EdtaVolume >= trueEndpoint;
    const calculatedPpm = Math.round((lab5EdtaVolume * 0.01 * 100 * 1000) / 50);
    return { isEndpointReached, calculatedPpm, trueEndpoint };
  }, [lab5EdtaVolume]);

  // Handle Discovery Question Answer
  const handleDiscoverySubmit = (idx: number) => {
    setDiscoverySelected(idx);
    setDiscoverySubmitted(true);
    if (idx === DISCOVERY_QUESTION.correctIndex) {
      playAudio('success');
      setShowSparkle(true);
      speakText('Correct! Boiling decomposes soluble bicarbonates into insoluble calcium carbonate precipitate.');
    } else {
      playAudio('error');
      speakText('Not quite. Consider what happens to soluble bicarbonates when heated.');
    }
  };

  // Handle Challenge Option Click
  const handleAnswerChallenge = () => {
    resetInactivityTimer();
    let correct = false;

    if (currentChallenge.type === 'multiple-choice') {
      if (selectedOption === currentChallenge.correctIndex) {
        correct = true;
      }
    } else if (currentChallenge.type === 'numeric') {
      const val = parseFloat(numericAnswer);
      if (!isNaN(val) && Math.abs(val - (currentChallenge.correctAnswer || 0)) <= (currentChallenge.tolerance || 0.1)) {
        correct = true;
      }
    }

    setIsCorrect(correct);
    setChallengeSubmitted(true);

    // Update BKT & SRS
    const nodeId = currentChallenge.nodeId;
    const currentBkt = bktStates[nodeId];
    const updatedBkt = bktUpdate(currentBkt, correct);
    setBktStates((prev) => ({ ...prev, [nodeId]: updatedBkt }));

    const currentSrs = srsItems[currentChallenge.id];
    const updatedSrs = sm2Update(currentSrs, correct ? 5 : 2);
    setSrsItems((prev) => ({ ...prev, [currentChallenge.id]: updatedSrs }));

    if (correct) {
      playAudio('drop-correct');
      playAudio('sparkle');
      setShowSparkle(true);
      setUserScore((prev) => prev + (currentChallenge.tier === 'foundation' ? 10 : currentChallenge.tier === 'standard' ? 20 : 30));
      setCompletedChallengesCount((prev) => prev + 1);
      speakText('Excellent deduction! You got it right.');
    } else {
      playAudio('drop-wrong');
      speakText('That answer is incorrect. Review the hint or explanation.');
    }
  };

  // Next Challenge Navigation
  const handleNextChallenge = () => {
    setSelectedOption(null);
    setNumericAnswer('');
    setChallengeSubmitted(false);
    setIsCorrect(null);
    setShowHint(false);

    if (currentChallengeIdx < CHALLENGES.length - 1) {
      setCurrentChallengeIdx((prev) => prev + 1);
      playAudio('whoosh');
    } else {
      // Completed all challenges!
      playAudio('celebration');
      setShowConfetti(true);
      setShowSuccessBanner(true);
      recordGameScore('soft-water-hard-water-sim', userScore);
      if (onComplete) {
        onComplete(userScore);
      }
      speakText('Congratulations! You have mastered Water Hardness & Softening Chemistry!');
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 font-sans p-3 md:p-6 flex flex-col gap-6 selection:bg-cyan-500 selection:text-slate-950">
      {/* UI Overlay Effects */}
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccessBanner} text="Complete Hard Water Mastery Achieved!" />
      <HintBubble show={showHint} text={currentHintText} />
      <SparkleBurst show={showSparkle} x={sparklePos.x} y={sparklePos.y} />

      {/* TOP HEADER BAR */}
      <header className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 md:p-6 shadow-2xl flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl text-slate-950 shadow-lg shadow-cyan-500/20">
            <Droplets className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                ICSE Class 9 Chemistry
              </span>
              <span className="text-xs font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                Mastery: {overallMastery}%
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-black tracking-tight text-white mt-1">
              Soft Water & Hard Water Simulation Lab
            </h1>
          </div>
        </div>

        {/* Global Controls & Score */}
        <div className="flex items-center gap-3">
          <div className="bg-slate-800/80 px-4 py-2 rounded-xl border border-slate-700 flex items-center gap-3">
            <Award className="w-5 h-5 text-amber-400" />
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-bold">Total Score</div>
              <div className="text-lg font-black text-amber-400">{userScore} pts</div>
            </div>
          </div>

          <button
            onClick={() => setSoundMuted(!soundMuted)}
            className="p-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl border border-slate-700 transition"
            title={soundMuted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {soundMuted ? <VolumeX className="w-5 h-5 text-rose-400" /> : <Volume2 className="w-5 h-5 text-cyan-400" />}
          </button>
        </div>
      </header>

      {/* NAVIGATION TABS */}
      <nav className="flex flex-wrap gap-2 border-b border-slate-800 pb-2">
        {[
          { id: 'discovery', label: '1. Discovery & Concept', icon: Lightbulb },
          { id: 'lab', label: '2. Interactive Softening Labs', icon: Beaker },
          { id: 'challenges', label: `3. Challenge Arena (${currentChallengeIdx + 1}/${CHALLENGES.length})`, icon: Zap },
          { id: 'summary', label: '4. Node Mastery & Real World', icon: BookOpen }
        ].map((tab) => {
          const IconComponent = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as typeof activeTab);
                playAudio('tap');
                speakText(`Switched to ${tab.label}`);
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-600/20'
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <IconComponent className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              {tab.label}
            </button>
          );
        })}
      </nav>

      {/* ========================================== */}
      {/* TAB 1: DISCOVERY & SCENARIO */}
      {/* ========================================== */}
      {activeTab === 'discovery' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Scenario & Context Card */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-cyan-950 text-cyan-400 rounded-lg border border-cyan-800">
                  <Activity className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">{SCENARIO.title}</h3>
              </div>
              <p className="text-slate-300 leading-relaxed mb-4 text-sm">{SCENARIO.intro}</p>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-400 leading-relaxed">
                <strong className="text-cyan-400 block mb-1">YOUR LAB MISSION:</strong>
                {SCENARIO.context}
              </div>
            </div>

            {/* Discovery Question Section */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-2.5 py-0.5 rounded bg-amber-950 text-amber-400 text-xs font-bold border border-amber-800">
                  DISCOVERY CHALLENGE
                </span>
                <h3 className="text-base font-bold text-white">Preconception & Chemical Reaction Test</h3>
              </div>
              <p className="text-sm font-semibold text-slate-200 mb-4">{DISCOVERY_QUESTION.question}</p>

              <div className="space-y-3 mb-6">
                {DISCOVERY_QUESTION.options.map((opt, i) => {
                  const isSel = discoverySelected === i;
                  const isCorrectOpt = i === DISCOVERY_QUESTION.correctIndex;
                  let btnStyle = 'bg-slate-800/80 border-slate-700 hover:border-slate-500 text-slate-200';
                  if (discoverySubmitted) {
                    if (isCorrectOpt) btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-semibold';
                    else if (isSel) btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-200';
                  }

                  return (
                    <button
                      key={i}
                      disabled={discoverySubmitted}
                      onClick={() => handleDiscoverySubmit(i)}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs md:text-sm transition flex items-start gap-3 ${btnStyle}`}
                    >
                      <span className="w-6 h-6 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>

              {discoverySubmitted && (
                <div className="p-4 bg-cyan-950/50 border border-cyan-800 rounded-xl text-xs text-cyan-200 flex items-start gap-3">
                  <Info className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-bold text-cyan-300 mb-1">Scientific Explanation:</strong>
                    {DISCOVERY_QUESTION.hintAfter}
                  </div>
                </div>
              )}
            </div>

            {/* Prediction Questions (Mandatory Render) */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-cyan-400" /> Interactive Predictions
              </h3>
              <div className="space-y-6">
                {PREDICTION_QUESTIONS.map((pred, pIdx) => (
                  <div key={pIdx} className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <p className="text-xs font-bold text-slate-300 mb-3">{pred.question}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                      {pred.options.map((opt, oIdx) => (
                        <button
                          key={oIdx}
                          onClick={() => {
                            const newAns = [...predictionAnswers];
                            newAns[pIdx] = oIdx;
                            setPredictionAnswers(newAns);
                            const newSub = [...predictionSubmitted];
                            newSub[pIdx] = true;
                            setPredictionSubmitted(newSub);
                            playAudio(oIdx === pred.correctIndex ? 'success' : 'error');
                          }}
                          className={`p-2.5 rounded-lg border text-xs text-left transition ${
                            predictionAnswers[pIdx] === oIdx
                              ? oIdx === pred.correctIndex
                                ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
                                : 'bg-rose-950 border-rose-500 text-rose-200'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                    {predictionSubmitted[pIdx] && (
                      <p className="text-[11px] text-cyan-400 font-mono bg-cyan-950/40 p-2 rounded border border-cyan-900">
                        🔍 <strong>Verification Instruction:</strong> {pred.verifyInstruction}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Visual Models */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <IonDynamicsCanvas activeTab={activeTab} />
            <SoapScumSvgDiagram activeTab={activeTab} />
            <BoilerScaleSvgDiagram />
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* TAB 2: INTERACTIVE SOFTENING LABS */}
      {/* ========================================== */}
      {activeTab === 'lab' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Lab Step Selector Sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider px-1">
              Select Exploration Lab
            </h3>
            {EXPLORATION_STEPS.map((step, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentLabStep(idx);
                  playAudio('tap');
                  speakText(step.title);
                }}
                className={`w-full text-left p-4 rounded-xl border transition-all flex flex-col gap-1 ${
                  currentLabStep === idx
                    ? 'bg-gradient-to-r from-cyan-950 to-slate-900 border-cyan-500 shadow-lg shadow-cyan-950/50'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-850 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold ${currentLabStep === idx ? 'text-cyan-400' : 'text-slate-500'}`}>
                    LAB 0{idx + 1}
                  </span>
                  <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded font-mono">
                    {step.nodeId}
                  </span>
                </div>
                <div className={`text-sm font-bold ${currentLabStep === idx ? 'text-white' : 'text-slate-300'}`}>
                  {step.title}
                </div>
              </button>
            ))}

            {/* Observation Questions (Mandatory Render) */}
            <div className="mt-4 bg-slate-900 border border-slate-800 rounded-xl p-4">
              <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-3">
                Lab Observation Checkpoints
              </h4>
              <div className="space-y-4">
                {OBSERVATION_QUESTIONS.map((obs, oIdx) => (
                  <div key={oIdx} className="text-xs space-y-2">
                    <p className="font-semibold text-slate-300">{obs.question}</p>
                    <div className="space-y-1">
                      {obs.observableOptions.map((opt, optIdx) => (
                        <button
                          key={optIdx}
                          onClick={() => {
                            const newObs = [...observationAnswers];
                            newObs[oIdx] = optIdx;
                            setObservationAnswers(newObs);
                            const newSub = [...observationSubmitted];
                            newSub[oIdx] = true;
                            setObservationSubmitted(newSub);
                            playAudio(optIdx === obs.correctIndex ? 'success' : 'error');
                          }}
                          className={`w-full text-left p-2 rounded border text-[11px] transition ${
                            observationAnswers[oIdx] === optIdx
                              ? optIdx === obs.correctIndex
                                ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                                : 'bg-rose-950 border-rose-500 text-rose-300'
                              : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
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

          {/* Interactive Lab Workspace */}
          <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl flex flex-col gap-6">
            <div>
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                {EXPLORATION_STEPS[currentLabStep].nodeId} — Interactive Experiment
              </span>
              <h2 className="text-xl font-black text-white mt-1">
                {EXPLORATION_STEPS[currentLabStep].title}
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                {EXPLORATION_STEPS[currentLabStep].instruction}
              </p>
            </div>

            {/* LAB 1: LATHER & SCUM LAB */}
            {currentLabStep === 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-2">Select Water Sample Source:</label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: 'distilled', label: 'Distilled Water' },
                        { id: 'rain', label: 'Rain Water' },
                        { id: 'tap', label: 'Tap Water' },
                        { id: 'well', label: 'Borewell Water' },
                        { id: 'sea', label: 'Sea Water' }
                      ].map((w) => (
                        <button
                          key={w.id}
                          onClick={() => setLab1WaterType(w.id as typeof lab1WaterType)}
                          className={`p-2 rounded-lg text-xs font-semibold border transition ${
                            lab1WaterType === w.id
                              ? 'bg-cyan-950 border-cyan-500 text-cyan-300'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          {w.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className="text-slate-300">Soap Drops Added:</span>
                      <span className="text-cyan-400">{lab1SoapDrops} drops</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="20"
                      value={lab1SoapDrops}
                      onChange={(e) => setLab1SoapDrops(parseInt(e.target.value))}
                      className="w-full accent-cyan-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs font-bold text-slate-300">Use Synthetic Detergent instead of Soap:</span>
                    <button
                      onClick={() => setLab1UseDetergent(!lab1UseDetergent)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition ${
                        lab1UseDetergent
                          ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                          : 'bg-slate-900 border-slate-800 text-slate-400'
                      }`}
                    >
                      {lab1UseDetergent ? 'Detergent Active' : 'Ordinary Soap'}
                    </button>
                  </div>
                </div>

                {/* Animated Test Tube SVG */}
                <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex flex-col items-center justify-center relative min-h-[220px]">
                  <svg viewBox="0 0 120 200" className="w-28 h-48">
                    {/* Glass Test Tube Outer */}
                    <path d="M 30 10 L 30 160 Q 30 185 60 185 Q 90 185 90 160 L 90 10" fill="none" stroke="#64748b" strokeWidth="4" />
                    
                    {/* Water Layer */}
                    <path d="M 32 80 L 32 160 Q 32 183 60 183 Q 88 183 88 160 L 88 80 Z" fill="#0284c7" opacity="0.4" />

                    {/* Scum Precipitate Layer (if hard water & soap) */}
                    {lab1Data.scumMass > 0 && (
                      <path d="M 32 75 Q 60 85 88 75 L 88 90 Q 60 98 32 90 Z" fill="#e2e8f0" opacity="0.9" />
                    )}

                    {/* Foam/Lather Layer */}
                    {lab1Data.latherHeight > 0 && (
                      <rect
                        x="32"
                        y={75 - lab1Data.latherHeight * 5}
                        width="56"
                        height={lab1Data.latherHeight * 5}
                        fill="#f8fafc"
                        opacity="0.85"
                        rx="4"
                      />
                    )}
                  </svg>

                  <div className="mt-3 text-center space-y-1">
                    <div className="text-xs text-slate-400">
                      Hardness: <strong className="text-cyan-300">{lab1Data.hardness} ppm</strong>
                    </div>
                    <div className="text-xs text-slate-400">
                      Lather Height: <strong className="text-emerald-400">{lab1Data.latherHeight.toFixed(1)} cm</strong>
                    </div>
                    <div className="text-xs text-slate-400">
                      Scum Curd Precipitated: <strong className="text-rose-400">{lab1Data.scumMass} mg</strong>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* LAB 2: BOILING & CLARK'S LIME LAB */}
            {currentLabStep === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-5 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className="text-slate-300">Water Heating Temperature:</span>
                      <span className="text-amber-400">{lab2Temperature}°C</span>
                    </div>
                    <input
                      type="range"
                      min="25"
                      max="100"
                      value={lab2Temperature}
                      onChange={(e) => setLab2Temperature(parseInt(e.target.value))}
                      className="w-full accent-amber-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className="text-slate-300">Clark's Lime Ca(OH)₂ Added:</span>
                      <span className="text-cyan-400">{lab2LimeAdded} mg/L</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="250"
                      value={lab2LimeAdded}
                      onChange={(e) => setLab2LimeAdded(parseInt(e.target.value))}
                      className="w-full accent-cyan-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                    />
                  </div>

                  <div className="p-3 bg-slate-900 rounded-lg text-xs space-y-1 font-mono">
                    <div className="text-amber-300">Ca(HCO₃)₂ —heat→ CaCO₃ ↓ + H₂O + CO₂ ↑</div>
                    <div className="text-cyan-300">Ca(HCO₃)₂ + Ca(OH)₂ → 2CaCO₃ ↓ + 2H₂O</div>
                  </div>
                </div>

                <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex flex-col items-center justify-center min-h-[220px]">
                  <div className="relative w-36 h-36 flex items-center justify-center">
                    {/* Flask Outline */}
                    <div className="w-32 h-32 rounded-full border-4 border-slate-700 bg-cyan-950/30 overflow-hidden relative">
                      {/* Thermal bubbles if boiling */}
                      {lab2Temperature > 70 && (
                        <div className="absolute inset-0 flex items-center justify-center gap-2 animate-bounce opacity-70">
                          <span className="w-2 h-2 bg-white rounded-full" />
                          <span className="w-3 h-3 bg-white rounded-full" />
                        </div>
                      )}
                      {/* CaCO3 precipitate at bottom */}
                      {lab2Data.pptFormed > 0 && (
                        <div
                          className="absolute bottom-0 inset-x-0 bg-slate-200"
                          style={{ height: `${Math.min(40, lab2Data.pptFormed / 6)}px` }}
                        />
                      )}
                    </div>
                  </div>
                  <div className="mt-4 text-center space-y-1">
                    <div className="text-xs text-slate-400">
                      Remaining Ca²⁺ Hardness: <strong className="text-emerald-400">{lab2Data.remainingHardness} ppm</strong>
                    </div>
                    <div className="text-xs text-slate-400">
                      CaCO₃ Scale Precipitated: <strong className="text-slate-200">{lab2Data.pptFormed} mg/L</strong>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* LAB 3: WASHING SODA TREATMENT */}
            {currentLabStep === 2 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="text-xs text-slate-300">
                    Target: Permanent Hard Water (CaCl₂ & MgSO₄ = 300 ppm)
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className="text-slate-300">Washing Soda (Na₂CO₃) Dosage:</span>
                      <span className="text-cyan-400">{lab3Na2CO3Added} mg/L</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="400"
                      value={lab3Na2CO3Added}
                      onChange={(e) => setLab3Na2CO3Added(parseInt(e.target.value))}
                      className="w-full accent-cyan-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                    />
                  </div>

                  <div className="p-3 bg-slate-900 rounded-lg text-xs space-y-1 font-mono text-cyan-300">
                    <div>CaCl₂ + Na₂CO₃ → CaCO₃ ↓ + 2NaCl</div>
                    <div>MgSO₄ + Na₂CO₃ → MgCO₃ ↓ + Na₂SO₄</div>
                  </div>
                </div>

                <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex flex-col items-center justify-center min-h-[220px]">
                  <div className="w-full max-w-[200px] h-36 border-2 border-slate-700 bg-slate-900 rounded-lg relative overflow-hidden flex flex-col justify-end">
                    <div className="w-full bg-cyan-900/50 flex-1 relative">
                      {lab3Data.curdPrecipitate > 0 && (
                        <div
                          className="w-full bg-slate-100 transition-all duration-300"
                          style={{ height: `${Math.min(50, lab3Data.curdPrecipitate / 6)}px` }}
                        />
                      )}
                    </div>
                  </div>
                  <div className="mt-4 text-center space-y-1">
                    <div className="text-xs text-slate-400">
                      Remaining Permanent Hardness: <strong className="text-rose-400">{lab3Data.remainingHardness} ppm</strong>
                    </div>
                    <div className="text-xs text-slate-400">
                      Carbonate Curd Formed: <strong className="text-cyan-300">{lab3Data.curdPrecipitate} mg/L</strong>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* LAB 4: PERMUTIT ION EXCHANGE */}
            {currentLabStep === 3 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className="text-slate-300">Hard Water Volume Passed:</span>
                      <span className="text-cyan-400">{lab4VolumePassed} Liters</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={lab4VolumePassed}
                      onChange={(e) => setLab4VolumePassed(parseInt(e.target.value))}
                      className="w-full accent-cyan-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                    />
                  </div>

                  <button
                    onClick={() => {
                      setLab4VolumePassed(0);
                      playAudio('chime');
                      speakText('Resin bed regenerated with 10% sodium chloride brine.');
                    }}
                    className="w-full py-2 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs rounded-lg transition flex items-center justify-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" /> Regenerate Column with 10% NaCl Brine
                  </button>
                </div>

                <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex flex-col items-center justify-center min-h-[220px]">
                  <div className="w-full max-w-[200px] space-y-2">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-slate-400">Resin Capacity:</span>
                      <span className={lab4Data.remainingCap > 20 ? 'text-emerald-400' : 'text-rose-400'}>
                        {lab4Data.remainingCap}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-800 h-4 rounded-full overflow-hidden border border-slate-700">
                      <div
                        className={`h-full transition-all duration-300 ${
                          lab4Data.remainingCap > 20 ? 'bg-cyan-500' : 'bg-rose-500 animate-pulse'
                        }`}
                        style={{ width: `${lab4Data.remainingCap}%` }}
                      />
                    </div>
                    <div className="pt-3 text-center text-xs text-slate-300">
                      Treated Effluent Hardness:{' '}
                      <strong className={lab4Data.treatedHardness === 0 ? 'text-emerald-400 font-black' : 'text-rose-400 font-black'}>
                        {lab4Data.treatedHardness} ppm
                      </strong>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* LAB 5: EDTA TITRATION */}
            {currentLabStep === 4 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="text-xs text-slate-300">
                    Sample: 50 mL Water Sample at pH 10 Buffer with EBT Indicator
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className="text-slate-300">Burette 0.01M EDTA Added:</span>
                      <span className="text-cyan-400">{lab5EdtaVolume.toFixed(1)} mL</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="25"
                      step="0.5"
                      value={lab5EdtaVolume}
                      onChange={(e) => setLab5EdtaVolume(parseFloat(e.target.value))}
                      className="w-full accent-cyan-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                    />
                  </div>

                  <div className="p-3 bg-slate-900 rounded-lg text-xs space-y-1 font-mono">
                    <div className="text-slate-400">Formula: Hardness (ppm) =</div>
                    <div className="text-cyan-300">(V_EDTA × M_EDTA × 100 × 1000) / V_sample</div>
                  </div>
                </div>

                <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex flex-col items-center justify-center min-h-[220px]">
                  <div className="w-24 h-24 rounded-full border-4 stroke-slate-700 flex items-center justify-center transition-colors duration-500 shadow-xl"
                       style={{ backgroundColor: lab5Data.isEndpointReached ? '#0284c7' : '#9f1239' }}>
                    <span className="text-xs font-bold text-white text-center">
                      {lab5Data.isEndpointReached ? 'Pure Blue (Endpoint)' : 'Wine Red (Metal Complex)'}
                    </span>
                  </div>
                  <div className="mt-4 text-center text-xs space-y-1">
                    <div className="text-slate-400">
                      Calculated Total Hardness: <strong className="text-cyan-300 font-bold">{lab5Data.calculatedPpm} ppm CaCO₃ eq</strong>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* TAB 3: CHALLENGE ARENA */}
      {/* ========================================== */}
      {activeTab === 'challenges' && (
        <div className="max-w-4xl mx-auto w-full space-y-6">
          {/* Progress Header */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className={`px-2.5 py-1 rounded text-xs font-black uppercase border ${
                currentChallenge.tier === 'foundation'
                  ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                  : currentChallenge.tier === 'standard'
                  ? 'bg-cyan-950 text-cyan-400 border-cyan-800'
                  : 'bg-purple-950 text-purple-400 border-purple-800'
              }`}>
                {currentChallenge.tier} Tier
              </span>
              <span className="text-xs font-mono text-slate-400">
                Node: <strong>{currentChallenge.nodeId}</strong>
              </span>
            </div>
            <div className="text-xs font-bold text-slate-400">
              Challenge {currentChallengeIdx + 1} of {CHALLENGES.length}
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl space-y-6">
            <h2 className="text-lg md:text-xl font-bold text-white leading-snug">
              {currentChallenge.question}
            </h2>

            {/* Multiple Choice Options */}
            {currentChallenge.type === 'multiple-choice' && currentChallenge.options && (
              <div className="space-y-3">
                {currentChallenge.options.map((optionText, idx) => {
                  let btnStyle = 'bg-slate-950 border-slate-800 text-slate-200 hover:border-cyan-500';
                  if (challengeSubmitted) {
                    if (idx === currentChallenge.correctIndex) {
                      btnStyle = 'bg-emerald-950 border-emerald-500 text-emerald-200 font-bold';
                    } else if (idx === selectedOption) {
                      btnStyle = 'bg-rose-950 border-rose-500 text-rose-200';
                    }
                  } else if (selectedOption === idx) {
                    btnStyle = 'bg-cyan-950 border-cyan-500 text-cyan-200';
                  }

                  return (
                    <button
                      key={idx}
                      disabled={challengeSubmitted}
                      onClick={() => {
                        setSelectedOption(idx);
                        playAudio('tap');
                      }}
                      className={`w-full text-left p-4 rounded-xl border transition flex items-center gap-4 text-sm ${btnStyle}`}
                    >
                      <span className="w-7 h-7 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-xs font-bold shrink-0">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{optionText}</span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Numeric Input Option */}
            {currentChallenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    disabled={challengeSubmitted}
                    value={numericAnswer}
                    onChange={(e) => setNumericAnswer(e.target.value)}
                    placeholder="Enter numerical value..."
                    className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono text-base focus:outline-none focus:border-cyan-500 w-full max-w-xs"
                  />
                  <span className="text-sm font-bold text-cyan-400">{currentChallenge.unit}</span>
                </div>
              </div>
            )}

            {/* Submit & Navigation Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                onClick={() => {
                  setShowHint(true);
                  setCurrentHintText(currentChallenge.hints[0] || 'Consider the chemical displacement kinetics.');
                  playAudio('hint');
                }}
                className="text-xs font-bold text-slate-400 hover:text-cyan-400 flex items-center gap-1.5 transition"
              >
                <HelpCircle className="w-4 h-4" /> Need Hint?
              </button>

              {!challengeSubmitted ? (
                <button
                  onClick={handleAnswerChallenge}
                  disabled={selectedOption === null && numericAnswer.trim() === ''}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black rounded-xl transition shadow-lg disabled:opacity-50"
                >
                  Submit Answer
                </button>
              ) : (
                <button
                  onClick={handleNextChallenge}
                  className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl transition shadow-lg flex items-center gap-2"
                >
                  Continue Next <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Explanation box after submission */}
            {challengeSubmitted && (
              <div className={`p-4 rounded-xl border text-xs leading-relaxed ${
                isCorrect ? 'bg-emerald-950/60 border-emerald-800 text-emerald-200' : 'bg-rose-950/60 border-rose-800 text-rose-200'
              }`}>
                <strong className="block font-bold mb-1">
                  {isCorrect ? 'Correct Explanation:' : 'Incorrect. Detailed Solution:'}
                </strong>
                {currentChallenge.explanation}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* TAB 4: SUMMARY & REAL-WORLD EXTENSION */}
      {/* ========================================== */}
      {activeTab === 'summary' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Node Mastery Breakdown */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" /> Syllabus Node Mastery Breakdown (10/10 Nodes)
              </h3>
              <div className="space-y-3">
                {ALL_NODE_IDS.map((nodeId) => {
                  const m = Math.round(masteryProb(bktStates[nodeId]) * 100);
                  return (
                    <div key={nodeId} className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-slate-200">{NODE_TITLES[nodeId]}</span>
                        <span className="font-mono font-bold text-cyan-400">{m}%</span>
                      </div>
                      <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                        <div
                          className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full transition-all duration-500"
                          style={{ width: `${m}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Misconceptions Clarification */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-rose-400" /> Key Misconceptions Corrected
              </h3>
              <div className="space-y-4">
                {MISCONCEPTIONS.map((misc) => (
                  <div key={misc.id} className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-2">
                    <div className="font-bold text-rose-400">❌ Myth: {misc.misconception}</div>
                    <div className="text-emerald-300 font-medium">✓ Reality: {misc.correction}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Real World Activity (Mandatory Render) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-400" /> Industrial Case Study Activity
              </h3>
              <h4 className="text-sm font-bold text-cyan-400 mb-2">{REAL_WORLD_ACTIVITY.title}</h4>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">{REAL_WORLD_ACTIVITY.description}</p>
              <div className="space-y-3">
                {REAL_WORLD_ACTIVITY.steps.map((stepStr, sIdx) => (
                  <div key={sIdx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed font-mono">
                    {stepStr}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default C9_ChemistrySoftwaterandhardwaterSim;