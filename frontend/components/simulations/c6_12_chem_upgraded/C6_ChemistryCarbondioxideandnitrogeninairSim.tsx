'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, masteryProb } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ==========================================
// TYPES & INTERFACES
// ==========================================

type NodeId = 'c6_chem_017' | 'c6_chem_018' | 'c6_chem_019';

type DifficultyTier = 'foundation' | 'standard' | 'advanced';

interface SIMProps {
  onComplete?: (score: number) => void;
  initialNodeId?: NodeId;
}

interface Misconception {
  id: string;
  statement: string;
  correction: string;
  explanation: string;
}

interface DiagnosticQuestion {
  id: string;
  nodeId: NodeId;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface Challenge {
  id: string;
  nodeId: NodeId;
  type: 'mcq' | 'drag-sort' | 'numeric' | 'match' | 'fill-blank';
  difficulty: DifficultyTier;
  competencyLevel: string;
  question: string;
  options?: string[];
  correctIndex?: number;
  correctAnswer?: string | number;
  matchPairs?: { left: string; right: string }[];
  sortItems?: string[];
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
}

interface Lab1State {
  jarVolume: number; // in mL, total air volume in bell jar
  candleLit: boolean;
  timeElapsed: number; // in seconds
  oxygenLeft: number; // percentage
  nitrogenLeft: number; // percentage
  co2Produced: number; // percentage
  waterLevelRise: number; // percentage of jar filled
}

interface Lab2State {
  gasType: 'CO2' | 'N2' | 'O2' | 'Air';
  bubbleRate: number; // bubbles per sec
  limewaterStatus: 'clear' | 'milky' | 'clear_excess';
  splintStatus: 'burning' | 'extinguished' | 'glowing_brighter';
  co2VolumeBubbled: number; // mL
  densityPourAngle: number; // degrees
  candleExtinguishedByPour: boolean;
}

interface Lab3State {
  sparkVoltage: number; // kV
  lightningActive: boolean;
  rhizobiumActive: boolean;
  fertilizerAdded: number; // mg
  soilNitratePpm: number;
  plantGrowthCm: number;
  nitrogenGasPpm: number;
}

interface Lab4State {
  photosynthesisRate: number; // 0 - 100
  respirationRate: number; // 0 - 100
  deforestationLevel: number; // 0 - 100
  fossilFuelCombustion: number; // 0 - 100
  co2ConcentrationPpm: number; // baseline 415 ppm
  globalTempOffset: number; // delta °C
}

interface Lab5State {
  metal: 'Mg' | 'Cu' | 'Fe';
  gasInJar: 'CO2' | 'N2' | 'O2';
  isBurning: boolean;
  productFormed: string;
  residueColor: string;
}

// ==========================================
// MANDATORY SECTIONS & CONSTANTS
// ==========================================

const ALL_NODE_IDS: NodeId[] = ['c6_chem_017', 'c6_chem_018', 'c6_chem_019'];

const SCENARIO = {
  title: 'Royal Atmospheric Chemistry Laboratory',
  intro: 'Welcome, Junior Atmospheric Scientist! You have been appointed to investigate the mysterious composition of Earth’s atmosphere.',
  context: 'Using precision gas jars, pneumatic troughs, electric sparks, and limewater titrations, you will isolate Carbon Dioxide and Nitrogen, analyze their reactions, and discover how biological and physical cycles maintain life on Earth.',
};

const DISCOVERY_QUESTION = {
  question: 'If Nitrogen makes up 78% of air and does not support burning, why doesn’t a burning candle immediately go out in normal room air?',
  options: [
    'Nitrogen turns into Oxygen when exposed to heat',
    'Oxygen (21%) is sufficiently concentrated and chemically reactive enough to sustain combustion despite Nitrogen dilution',
    'Nitrogen actively reacts with candle wax to form a flammable flame shield',
    'Air contains hidden hydrogen gas that keeps the candle flame alive',
  ],
  correctIndex: 1,
  hintAfter: 'Nitrogen acts as an atmospheric diluent, slowing combustion down so that burning is controllable rather than explosive!',
};

const DEFAULT_PROPS = {
  initialTab: 'discovery',
};

const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Bell Jar Combustion & Atmospheric Components',
    instruction: 'Burn a candle inside an inverted bell jar sitting over a water trough. Observe O2 consumption and the 1/5th rise in water level.',
    interactionType: 'bell-jar-combustion',
    nodeId: 'c6_chem_019' as NodeId,
  },
  {
    title: 'Lab 2: Carbon Dioxide Chemical Identification & Density',
    instruction: 'Bubble CO2 through limewater to observe precipitation (milky CaCO3) and subsequent clearing (Ca(HCO3)2). Test flame extinction and density pouring.',
    interactionType: 'co2-limewater-density',
    nodeId: 'c6_chem_017' as NodeId,
  },
  {
    title: 'Lab 3: Nitrogen Fixation & Lightning Chemistry',
    instruction: 'Simulate high-voltage lightning sparks to synthesize NO/NO2 and activate Rhizobium root bacteria to convert inert atmospheric N2 into soluble soil nitrates.',
    interactionType: 'nitrogen-fixation-lightning',
    nodeId: 'c6_chem_018' as NodeId,
  },
  {
    title: 'Lab 4: Carbon Cycle & Global Gaseous Balance',
    instruction: 'Manipulate rates of photosynthesis, respiration, fossil fuel burning, and deforestation. Track CO2 ppm equilibrium live.',
    interactionType: 'carbon-cycle-balance',
    nodeId: 'c6_chem_019' as NodeId,
  },
  {
    title: 'Lab 5: High-Temperature Metals in CO2 & N2',
    instruction: 'Burn bright Magnesium ribbon inside closed jars of Carbon Dioxide and Nitrogen gas to synthesize Magnesium Oxide, Carbon, and Magnesium Nitride.',
    interactionType: 'magnesium-gas-jar-reactivity',
    nodeId: 'c6_chem_017' as NodeId,
  },
];

const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: What will happen when Carbon Dioxide is continuously bubbled into limewater for a prolonged period after it turns milky?',
    options: [
      'The milky precipitate will turn bright green',
      'The milky solution will clear up again as soluble Calcium Bicarbonate forms',
      'The flask will explode due to pressure build-up',
      'Solid Calcium Carbonate will permanently harden like concrete',
    ],
    correctIndex: 1,
    verifyInstruction: 'Go to Lab 2 and bubble CO2 continuously beyond 100 mL to observe the limewater become clear again!',
    nodeId: 'c6_chem_017' as NodeId,
  },
  {
    question: 'Predict: Can burning Magnesium ribbon continue to burn inside a gas jar filled entirely with pure Carbon Dioxide gas?',
    options: [
      'No, because Carbon Dioxide is a universal flame extinguisher',
      'Yes, because Magnesium has a high affinity for oxygen and strips oxygen from CO2, leaving black carbon deposits',
      'Yes, but only if Nitrogen gas is added as a catalyst',
      'No, because Magnesium reacts explosively with CO2 to form pure Argon',
    ],
    correctIndex: 1,
    verifyInstruction: 'Go to Lab 5 and ignite Magnesium inside the CO2 gas jar!',
    nodeId: 'c6_chem_017' as NodeId,
  },
];

const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe about the water level inside the bell jar as the candle extinguishes during the burning experiment?',
    observableOptions: [
      'Water rises by approximately 1/5th (21%) of the bell jar volume, replacing the consumed Oxygen gas',
      'Water drops completely to the bottom of the pneumatic trough',
      'Water turns dark purple due to dissolved Nitrogen',
      'Water level does not change at all',
    ],
    correctIndex: 0,
    nodeId: 'c6_chem_019' as NodeId,
  },
  {
    question: 'What do you observe when burning Magnesium ribbon is introduced into a jar of pure Nitrogen gas?',
    observableOptions: [
      'It immediately extinguishes with no reaction',
      'It burns with a green flame forming black soot',
      'It continues to burn with a yellow-white glow forming greenish-yellow Magnesium Nitride (Mg3N2)',
      'It liquidates into metallic mercury',
    ],
    correctIndex: 2,
    nodeId: 'c6_chem_018' as NodeId,
  },
];

const REAL_WORLD_ACTIVITY = {
  title: 'Atmospheric Gas Separation & Industrial Lime Softening Task',
  description: 'In industrial gas plants and water treatment facilities, chemical engineers rely on fractional distillation of liquid air and lime-water precipitation chemistry to produce pure industrial gases and softened municipal water.',
  steps: [
    'Step 1: Cool atmospheric air down to -200°C under high pressure to liquefy it.',
    'Step 2: Warm liquid air in a fractional distillation column; Nitrogen boils off first at -196°C, leaving Oxygen behind at -183°C.',
    'Step 3: Scrub trace CO2 from industrial effluent gases using limewater titration: Ca(OH)2(aq) + CO2(g) → CaCO3(s) + H2O(l).',
    'Step 4: Calculate mass of Carbon Dioxide captured when 74.1 g of Calcium Hydroxide reacts completely: yields exactly 100.1 g of insoluble CaCO3 precipitate!',
  ],
};

const MISCONCEPTIONS: Misconception[] = [
  {
    id: 'misc_1',
    statement: 'Air is a chemical compound made of bonded atmospheric elements.',
    correction: 'Air is a heterogeneous/homogeneous MIXTURE of gases that retain their individual chemical properties.',
    explanation: 'Components of air like N2, O2, CO2, and Argon can be physically separated without breaking covalent chemical bonds.',
  },
  {
    id: 'misc_2',
    statement: 'Carbon Dioxide is the main component of Earth’s atmosphere.',
    correction: 'Carbon Dioxide constitutes only ~0.04% (415 ppm) of dry air by volume.',
    explanation: 'Nitrogen (78%) and Oxygen (21%) make up 99% of the atmosphere. Even argon (0.93%) is far more abundant than CO2.',
  },
  {
    id: 'misc_3',
    statement: 'Nitrogen in the air can be directly absorbed and used by plants through their leaves.',
    correction: 'Plants cannot absorb elemental N2 gas directly through stomata.',
    explanation: 'Atmospheric Nitrogen must be "fixed" into soluble nitrates (NO3-) by nitrogen-fixing bacteria (Rhizobium) or lightning before plant roots can absorb it.',
  },
  {
    id: 'misc_4',
    statement: 'Carbon Dioxide extinguishes ALL fires under ALL chemical conditions.',
    correction: 'Strong reducing agents like burning Magnesium ribbon can burn in CO2 by stripping its oxygen.',
    explanation: '2Mg + CO2 → 2MgO + C. Magnesium heat is high enough to reduce CO2 into carbon metal/soot.',
  },
  {
    id: 'misc_5',
    statement: 'Limewater remains permanently milky no matter how much CO2 gas is bubbled into it.',
    correction: 'Excess CO2 converts insoluble CaCO3 into soluble Calcium Bicarbonate Ca(HCO3)2, turning the solution clear again.',
    explanation: 'CaCO3(s) + H2O(l) + CO2(g) → Ca(HCO3)2(aq).',
  },
  {
    id: 'misc_6',
    statement: 'Nitrogen gas is highly explosive and reactive at room temperature.',
    correction: 'Nitrogen (N≡N) is extremely unreactive and inert at normal room temperatures.',
    explanation: 'The triple covalent bond between two nitrogen atoms requires huge energy (like high heat or lightning sparks) to break.',
  },
];

const DIAGNOSTIC_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: 'diag_1',
    nodeId: 'c6_chem_019',
    question: 'Why is air classified as a mixture rather than a compound?',
    options: [
      'It has a fixed boiling point and chemical formula',
      'Its components can be separated by physical methods like fractional distillation and retain their properties',
      'It burns with a red flame when exposed to sodium',
      'It cannot be dissolved in liquid water',
    ],
    correctIndex: 1,
    explanation: 'Air components retain individual properties and vary in ratio depending on location/humidity, proving it is a mixture.',
  },
  {
    id: 'diag_2',
    nodeId: 'c6_chem_017',
    question: 'Which chemical reagent is used as a qualitative lab test for Carbon Dioxide gas?',
    options: [
      'Concentrated Hydrochloric Acid',
      'Clear Lime Water (Calcium Hydroxide Solution)',
      'Copper Sulfate Solution',
      'Potassium Permanganate',
    ],
    correctIndex: 1,
    explanation: 'Lime water turns milky white due to formation of insoluble Calcium Carbonate precipitate.',
  },
  {
    id: 'diag_3',
    nodeId: 'c6_chem_018',
    question: 'What percentage of clean dry air by volume is composed of Nitrogen gas?',
    options: ['21%', '0.04%', '78%', '50%'],
    correctIndex: 2,
    explanation: 'Nitrogen makes up approximately 78% of Earth dry atmosphere by volume.',
  },
  {
    id: 'diag_4',
    nodeId: 'c6_chem_017',
    question: 'What happens when Carbon Dioxide is poured over a burning candle in a beaker test?',
    options: [
      'The flame grows twice as large',
      'The flame goes out because CO2 is denser than air and does not support combustion',
      'The flame explodes into yellow sparks',
      'The candle instantly freezes into ice',
    ],
    correctIndex: 1,
    explanation: 'CO2 is ~1.5x denser than air and suffocates the flame by displacing oxygen.',
  },
  {
    id: 'diag_5',
    nodeId: 'c6_chem_018',
    question: 'Which organisms live in the root nodules of leguminous plants to fix atmospheric nitrogen?',
    options: ['Amoeba', 'Rhizobium bacteria', 'Yeast cells', 'Penicillium fungi'],
    correctIndex: 1,
    explanation: 'Rhizobium bacteria convert inert N2 gas into nitrates that enrich soil fertility.',
  },
  {
    id: 'diag_6',
    nodeId: 'c6_chem_019',
    question: 'In the bell jar burning candle experiment over water, why does water rise inside the jar?',
    options: [
      'Water expands when heated by the candle flame',
      'Oxygen gas (~21%) is consumed during burning, creating a lower pressure inside the jar',
      'Nitrogen gas dissolves into liquid water instantly',
      'Glass jar shrinks under atmospheric pressure',
    ],
    correctIndex: 1,
    explanation: 'As Oxygen is consumed and CO2 dissolves slightly, internal pressure drops and external atmospheric pressure pushes water up ~1/5th volume.',
  },
  {
    id: 'diag_7',
    nodeId: 'c6_chem_017',
    question: 'What is the correct chemical formula for Calcium Bicarbonate formed when excess CO2 is added to limewater?',
    options: ['CaCO3', 'Ca(HCO3)2', 'CaO', 'Ca(OH)2'],
    correctIndex: 1,
    explanation: 'Soluble Calcium Bicarbonate has the chemical formula Ca(HCO3)2.',
  },
  {
    id: 'diag_8',
    nodeId: 'c6_chem_018',
    question: 'What product is formed when Magnesium burns in pure Nitrogen gas?',
    options: ['Magnesium Oxide (MgO)', 'Magnesium Nitride (Mg3N2)', 'Magnesium Carbonate (MgCO3)', 'Magnesium Nitrate (Mg(NO3)2)'],
    correctIndex: 1,
    explanation: '3 Mg + N2 → Mg3N2 (Magnesium Nitride), a yellowish-green solid.',
  },
];

const CHALLENGES: Challenge[] = [
  // FOUNDATION TIER (7 challenges)
  {
    id: 'f1',
    nodeId: 'c6_chem_017',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'What is the chemical formula of Carbon Dioxide?',
    options: ['CO', 'CO2', 'C2O', 'CO3'],
    correctIndex: 1,
    explanation: 'Carbon Dioxide consists of one carbon atom covalently bonded to two oxygen atoms (CO2).',
    hints: ['Count the atoms: one carbon, two oxygen atoms.', 'The prefix "di-" means two.', 'Formula is CO2.'],
  },
  {
    id: 'f2',
    nodeId: 'c6_chem_017',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'What effect does Carbon Dioxide have on a burning wooden splint?',
    options: ['Relights glowing splint', 'Burns with a pop sound', 'Extinguishes the flame', 'Turns flame blue'],
    correctIndex: 2,
    explanation: 'CO2 does not support combustion and is denser than air, so it extinguishes a burning splint.',
    hints: ['Think of fire extinguishers.', 'Does CO2 fuel or suppress flame?', 'It extinguishes the flame.'],
  },
  {
    id: 'f3',
    nodeId: 'c6_chem_018',
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'What percentage by volume of dry atmospheric air is Nitrogen gas? (Enter whole number)',
    correctAnswer: 78,
    explanation: 'Nitrogen gas accounts for approximately 78% of Earth dry air composition by volume.',
    hints: ['It is nearly four-fifths of the air.', 'It is between 70 and 80 percent.', 'Enter 78.'],
  },
  {
    id: 'f4',
    nodeId: 'c6_chem_018',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'Which of the following physical properties correctly describes pure Nitrogen gas?',
    options: [
      'Pungent smell and blue color',
      'Colorless, odorless, neutral gas insoluble in water',
      'Heavy red gas with suffocating odor',
      'Sweet smelling green gas',
    ],
    correctIndex: 1,
    explanation: 'Nitrogen is a colorless, odorless, tasteless, non-toxic, and relatively insoluble gas.',
    hints: ['Look around you: can you see or smell nitrogen in air?', 'It has no color or smell.', 'Choose colorless, odorless, neutral gas.'],
  },
  {
    id: 'f5',
    nodeId: 'c6_chem_019',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'What is the approximate percentage of Oxygen gas in dry atmospheric air?',
    options: ['78%', '21%', '0.04%', '1%'],
    correctIndex: 1,
    explanation: 'Oxygen gas accounts for about 21% (approximately 1/5th) of clean dry air.',
    hints: ['It is about 1/5th of the atmosphere.', ' Nitrogen is 78%, so oxygen is about...', '21%.'],
  },
  {
    id: 'f6',
    nodeId: 'c6_chem_017',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'What is the chemical name of the limewater solution used to test for Carbon Dioxide?',
    options: ['Calcium Carbonate', 'Calcium Hydroxide', 'Calcium Chloride', 'Calcium Oxide'],
    correctIndex: 1,
    explanation: 'Lime water is a dilute aqueous solution of Calcium Hydroxide, Ca(OH)2.',
    hints: ['It is an aqueous alkali containing hydroxide ions.', 'Formula Ca(OH)2.', 'Calcium Hydroxide.'],
  },
  {
    id: 'f7',
    nodeId: 'c6_chem_019',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'Why is air described as a mixture rather than a pure chemical compound?',
    options: ['Because it burns easily', 'Because its components retain individual properties and can be varied in ratio', 'Because it is transparent', 'Because it has a fixed melting point'],
    correctIndex: 1,
    explanation: 'Air components retain their distinct chemical identities and can be separated physically.',
    hints: ['Can you separate nitrogen and oxygen physically?', 'Does air composition change slightly in cities vs forests?', 'Its components retain properties and ratios vary.'],
  },

  // STANDARD TIER (8 challenges)
  {
    id: 's1',
    nodeId: 'c6_chem_017',
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'Which chemical reaction equation represents limewater turning milky when CO2 is bubbled into it?',
    options: [
      'CaO + CO2 → CaCO3',
      'Ca(OH)2 + CO2 → CaCO3 + H2O',
      'CaCO3 + H2O + CO2 → Ca(HCO3)2',
      'CaCl2 + CO2 → CaCO3 + Cl2',
    ],
    correctIndex: 1,
    explanation: 'Calcium hydroxide solution reacts with carbon dioxide gas to yield insoluble calcium carbonate precipitate and water.',
    hints: ['Limewater is Ca(OH)2.', 'The insoluble product is CaCO3.', 'Ca(OH)2 + CO2 → CaCO3 + H2O.'],
  },
  {
    id: 's2',
    nodeId: 'c6_chem_017',
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'Why does milky limewater become clear again when excess Carbon Dioxide is continuously bubbled through it?',
    options: [
      'The white precipitate evaporates into gas',
      'Insoluble Calcium Carbonate converts into soluble Calcium Bicarbonate [Ca(HCO3)2]',
      'Carbon dioxide neutralizes the water into pure alcohol',
      'Calcium breaks down into elemental metallic calcium',
    ],
    correctIndex: 1,
    explanation: 'CaCO3(s) + H2O(l) + CO2(g) → Ca(HCO3)2(aq). Calcium bicarbonate is soluble in water.',
    hints: ['Solubility increases when bicarbonate forms.', 'Think of Ca(HCO3)2.', 'Insoluble CaCO3 turns into soluble Ca(HCO3)2.'],
  },
  {
    id: 's3',
    nodeId: 'c6_chem_018',
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'How do Rhizobium bacteria in leguminous root nodules contribute to the Nitrogen Cycle?',
    options: [
      'They release toxic chlorine gas into roots',
      'They convert atmospheric N2 gas into soluble nitrates that plants absorb',
      'They break down plant roots into pure carbon',
      'They absorb water from atmosphere directly',
    ],
    correctIndex: 1,
    explanation: 'Rhizobium perform biological nitrogen fixation, turning unreactive N2 into bioavailable nitrates.',
    hints: ['Plants cannot consume N2 gas directly.', 'Bacteria turn gaseous nitrogen into soil nutrients.', 'Convert N2 into soluble nitrates.'],
  },
  {
    id: 's4',
    nodeId: 'c6_chem_018',
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'During high-voltage lightning discharges in the atmosphere, what initial chemical reaction occurs between atmospheric gases?',
    options: [
      'CO2 + H2O → H2CO3',
      'N2 + O2 → 2NO (Nitric Oxide)',
      '2N2 + O2 → 2N2O',
      'N2 + 3H2 → 2NH3',
    ],
    correctIndex: 1,
    explanation: 'Extreme electric arc heat causes inert N2 and O2 to combine: N2 + O2 → 2NO.',
    hints: ['Nitrogen and Oxygen combine under intense heat.', 'Forms Nitric Oxide gas (NO).', 'N2 + O2 → 2NO.'],
  },
  {
    id: 's5',
    nodeId: 'c6_chem_019',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'In a bell jar experiment with 500 mL total air volume, approximately how many mL of water will rise inside the jar after all Oxygen is consumed by a burning candle?',
    correctAnswer: 105,
    explanation: 'Oxygen occupies ~21% of total air volume. 21% of 500 mL = 105 mL rise.',
    hints: ['Calculate 21% of 500.', '500 multiplied by 0.21.', '105 mL.'],
  },
  {
    id: 's6',
    nodeId: 'c6_chem_017',
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'Carbon dioxide is collected in laboratory apparatus by upward displacement of air. Why?',
    options: [
      'Because CO2 is lighter than air',
      'Because CO2 is about 1.5 times denser than air and settles at the bottom',
      'Because CO2 reacts instantly with glass',
      'Because CO2 is highly flammable',
    ],
    correctIndex: 1,
    explanation: 'CO2 has a molar mass of ~44 g/mol while air is ~29 g/mol. CO2 is denser and displaces lighter air upward.',
    hints: ['Compare molar mass of CO2 (44) to air (~29).', 'Dense gases sink.', 'CO2 is ~1.5x denser than air.'],
  },
  {
    id: 's7',
    nodeId: 'c6_chem_018',
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'What is formed when Magnesium metal ribbon burns in a jar filled with Nitrogen gas?',
    options: ['Magnesium Oxide (MgO)', 'Magnesium Nitride (Mg3N2)', 'Magnesium Hydride (MgH2)', 'Magnesium Carbonate (MgCO3)'],
    correctIndex: 1,
    explanation: '3Mg + N2 → Mg3N2 (Magnesium Nitride).',
    hints: ['Magnesium + Nitrogen gas.', 'Nitride ion has -3 charge, Mg has +2.', 'Mg3N2.'],
  },
  {
    id: 's8',
    nodeId: 'c6_chem_019',
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'Order the steps of fractional distillation of liquid air from top (first step) to bottom (final separation):',
    sortItems: [
      'Filter air to remove dust, water vapor, and CO2',
      'Compress and cool air down to -200°C to turn it liquid',
      'Pump liquid air into fractionating column',
      'Nitrogen boils off first at -196°C and is collected at top',
      'Liquid Oxygen remains at bottom and boils at -183°C',
    ],
    explanation: 'Air scrubbing → Liquefaction (-200°C) → Distillation column → N2 collection (-196°C) → O2 collection (-183°C).',
    hints: [
      'Start by cleaning atmospheric air.',
      'Cool down to -200°C to liquefy.',
      'Nitrogen has lower boiling point (-196°C) so it boils off first.',
    ],
  },

  // ADVANCED TIER (7 challenges)
  {
    id: 'a1',
    nodeId: 'c6_chem_017',
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'Why does burning Magnesium ribbon continue to burn when placed in a gas jar of Carbon Dioxide, despite CO2 being a fire extinguisher?',
    options: [
      'Magnesium produces nuclear radiation that breaks CO2',
      'Magnesium has an extremely high affinity for oxygen and strips oxygen from CO2, producing MgO and carbon specks',
      'CO2 turns into pure Oxygen when exposed to bright light',
      'Magnesium reacts with trace nitrogen in the glass jar',
    ],
    correctIndex: 1,
    explanation: '2Mg + CO2 → 2MgO + C. Magnesium heat is high enough to reduce carbon dioxide, leaving black soot (carbon) on jar walls.',
    hints: ['Mg is a strong reducing agent.', 'It strips oxygen atoms from CO2.', 'Forms Magnesium Oxide and free Carbon specks.'],
  },
  {
    id: 'a2',
    nodeId: 'c6_chem_019',
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'If global photosynthesis consumes 120 Gigatons of Carbon/year while respiration produces 118 Gigatons and fossil fuel burning adds 8 Gigatons, what is the net annual change in atmospheric Carbon (in Gigatons)?',
    correctAnswer: 6,
    explanation: 'Net change = Production - Consumption = (118 + 8) - 120 = 126 - 120 = +6 Gigatons of Carbon accumulation per year.',
    hints: ['Sum all carbon sources: Respiration (118) + Fossil fuels (8) = 126.', 'Subtract sink: Photosynthesis (120).', '126 - 120 = 6.'],
  },
  {
    id: 'a3',
    nodeId: 'c6_chem_018',
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'Synthesis',
    question: 'Sequence the complete Nitrogen Cycle pathways starting from atmospheric N2 to plant absorption and return to air:',
    sortItems: [
      'Atmospheric Nitrogen (N2) fixed by Rhizobium in leguminous root nodules',
      'Nitrogen converted into ammonium and soluble nitrates (NO3-) in soil',
      'Plant roots absorb nitrates to synthesize plant proteins',
      'Animals consume plant protein and produce nitrogenous wastes (urea/ammonia)',
      'Denitrifying bacteria break down soil nitrates and release N2 gas back into atmosphere',
    ],
    explanation: 'Fixation → Nitrification → Assimilation → Waste/Decomposition → Denitrification back to atmosphere.',
    hints: [
      'Start with fixation of N2 gas.',
      'Plants assimilate nitrates into plant proteins.',
      'Denitrifying bacteria return N2 gas to atmosphere at the end.',
    ],
  },
  {
    id: 'a4',
    nodeId: 'c6_chem_017',
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Synthesis',
    question: 'In the laboratory preparation of Carbon Dioxide using Kipp Apparatus or Woulfe Bottle, why is dilute Hydrochloric Acid preferred over dilute Sulfuric Acid with marble chips (CaCO3)?',
    options: [
      'Sulfuric acid creates explosive hydrogen gas',
      'Sulfuric acid forms insoluble Calcium Sulfate (CaSO4) coating on marble chips, stopping the reaction prematurely',
      'Hydrochloric acid is much cheaper and smells like flowers',
      'Sulfuric acid neutralizes CO2 into liquid water',
    ],
    correctIndex: 1,
    explanation: 'CaCO3 + H2SO4 → CaSO4(s) + H2O + CO2. Insoluble CaSO4 coats the marble chips and prevents further acid attack.',
    hints: ['Think about solubility of Calcium Sulfate (CaSO4).', 'An insoluble coating forms on marble chips.', 'It stops further acid from reaching marble.'],
  },
  {
    id: 'a5',
    nodeId: 'c6_chem_019',
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'What is the physical mechanism by which Carbon Dioxide contributes to the natural Greenhouse Effect?',
    options: [
      'CO2 absorbs shortwave UV radiation from the sun and reflects it',
      'CO2 molecules absorb re-radiated longwave infrared thermal energy from Earth surface and trap heat',
      'CO2 undergoes nuclear fission releasing thermal energy',
      'CO2 reacts with atmospheric nitrogen to produce heat sparks',
    ],
    correctIndex: 1,
    explanation: 'CO2 molecules absorb infrared (IR) thermal radiation emitted by Earth and re-emit it in all directions, trapping heat in troposphere.',
    hints: ['Visible light passes through atmosphere.', 'Earth absorbs visible light and re-emits thermal Infrared (IR).', 'CO2 absorbs longwave IR radiation.'],
  },
  {
    id: 'a6',
    nodeId: 'c6_chem_018',
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Application',
    question: 'Why is pure Nitrogen gas used as an inert flushing atmosphere in food packaging (e.g., crisp bags)?',
    options: [
      'It makes the chips taste like salt',
      'It displaces Oxygen gas, preventing oxidative rancidity of fats and crushing during transport',
      'It chemically freezes chips into ice',
      'It turns potato starch into sugar',
    ],
    correctIndex: 1,
    explanation: 'Nitrogen is chemically unreactive and displaces O2, preventing rancidity (lipid oxidation) and cushioning snacks.',
    hints: ['Oxygen causes fats to go rancid.', 'Nitrogen is chemically inert.', 'Displaces O2 to prevent oxidation and provides cushion.'],
  },
  {
    id: 'a7',
    nodeId: 'c6_chem_019',
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Synthesis',
    question: 'When phosphorus is burned inside a bell jar standing over water, white fumes of P2O5 form and dissolve in water. What is the resulting pH of the solution?',
    options: ['pH = 7 (Neutral)', 'pH < 7 (Acidic due to Phosphoric acid formation)', 'pH > 10 (Strongly basic)', 'pH = 14 (Corrosive alkali)'],
    correctIndex: 1,
    explanation: 'P4 + 5O2 → 2P2O5. P2O5 + 3H2O → 2H3PO4 (Phosphoric Acid). Non-metal oxides are acidic in nature.',
    hints: ['Non-metallic oxides are acidic.', 'Phosphorus oxide dissolves in water to form Phosphoric Acid (H3PO4).', 'pH is acidic (< 7).'],
  },
];

// ==========================================
// CUSTOM SVG DIAGRAM COMPONENTS
// ==========================================

const AirCompositionPieChart: React.FC<{ activeSlice: string; onSelectSlice: (name: string) => void }> = ({ activeSlice, onSelectSlice }) => {
  return (
    <div className="flex flex-col items-center bg-slate-900/80 p-4 rounded-xl border border-slate-700 shadow-xl">
      <h4 className="text-amber-400 font-bold text-sm mb-2 uppercase tracking-wide">Atmospheric Gas Proportion Breakdown</h4>
      <svg viewBox="0 0 320 240" className="w-full max-w-xs h-48 drop-shadow-md">
        {/* Nitrogen Slice 78% (approx 280.8 degrees) */}
        <path
          d="M 160 120 L 160 20 A 100 100 0 1 1 65 152 Z"
          fill={activeSlice === 'Nitrogen' ? '#3b82f6' : '#1e40af'}
          stroke="#60a5fa"
          strokeWidth={activeSlice === 'Nitrogen' ? 3 : 1}
          className="cursor-pointer transition-all hover:opacity-90"
          onClick={() => onSelectSlice('Nitrogen')}
        />
        {/* Oxygen Slice 21% (approx 75.6 degrees) */}
        <path
          d="M 160 120 L 65 152 A 100 100 0 0 1 154 20.02 Z"
          fill={activeSlice === 'Oxygen' ? '#ef4444' : '#991b1b'}
          stroke="#f87171"
          strokeWidth={activeSlice === 'Oxygen' ? 3 : 1}
          className="cursor-pointer transition-all hover:opacity-90"
          onClick={() => onSelectSlice('Oxygen')}
        />
        {/* Argon & CO2 Slices ~1% combined */}
        <circle
          cx="160"
          cy="120"
          r="12"
          fill={activeSlice === 'CO2' ? '#10b981' : '#047857'}
          stroke="#34d399"
          strokeWidth="2"
          className="cursor-pointer transition-all hover:scale-110"
          onClick={() => onSelectSlice('CO2')}
        />

        {/* Labels */}
        <text x="210" y="90" fill="#93c5fd" fontSize="12" fontWeight="bold">N₂ (78%)</text>
        <text x="80" y="80" fill="#fca5a5" fontSize="12" fontWeight="bold">O₂ (21%)</text>
        <text x="160" y="124" fill="#ffffff" fontSize="9" textAnchor="middle" fontWeight="bold">CO₂</text>
      </svg>
      <div className="flex gap-4 mt-2 text-xs">
        <button onClick={() => onSelectSlice('Nitrogen')} className={`px-2 py-1 rounded border ${activeSlice === 'Nitrogen' ? 'bg-blue-600 text-white border-blue-400' : 'bg-slate-800 text-blue-300 border-slate-700'}`}>Nitrogen 78%</button>
        <button onClick={() => onSelectSlice('Oxygen')} className={`px-2 py-1 rounded border ${activeSlice === 'Oxygen' ? 'bg-red-600 text-white border-red-400' : 'bg-slate-800 text-red-300 border-slate-700'}`}>Oxygen 21%</button>
        <button onClick={() => onSelectSlice('CO2')} className={`px-2 py-1 rounded border ${activeSlice === 'CO2' ? 'bg-emerald-600 text-white border-emerald-400' : 'bg-slate-800 text-emerald-300 border-slate-700'}`}>CO₂ 0.04%</button>
      </div>
    </div>
  );
};

const LimewaterReactionDiagram: React.FC<{ status: 'clear' | 'milky' | 'clear_excess'; gasVolume: number }> = ({ status, gasVolume }) => {
  return (
    <div className="flex flex-col items-center bg-slate-900/90 p-4 rounded-xl border border-slate-700">
      <h4 className="text-cyan-400 font-bold text-sm mb-2">Lime Water Titration Reaction Setup</h4>
      <svg viewBox="0 0 300 220" className="w-full max-w-xs h-48">
        {/* Delivery Tube */}
        <path d="M 90 30 L 90 140 L 150 140 L 150 170" fill="none" stroke="#94a3b8" strokeWidth="4" />
        {/* Bubbles animation inside tube */}
        {gasVolume > 0 && (
          <g>
            <circle cx="90" cy="80" r="3" fill="#67e8f9" className="animate-ping" />
            <circle cx="150" cy="155" r="4" fill="#67e8f9" className="animate-bounce" />
          </g>
        )}

        {/* Flask Glassware */}
        <path d="M 120 110 L 180 110 L 210 190 A 10 10 0 0 1 200 200 L 100 200 A 10 10 0 0 1 90 190 Z" fill="none" stroke="#e2e8f0" strokeWidth="3" />

        {/* Solution Level & Turbidity */}
        <path
          d="M 95 150 L 205 150 L 200 190 A 10 10 0 0 1 190 198 L 110 198 A 10 10 0 0 1 100 190 Z"
          fill={
            status === 'clear'
              ? 'rgba(56, 189, 248, 0.25)'
              : status === 'milky'
              ? 'rgba(255, 255, 255, 0.85)'
              : 'rgba(186, 230, 253, 0.4)'
          }
          className="transition-colors duration-700"
        />

        {/* Precipitate Specks if milky */}
        {status === 'milky' && (
          <g fill="#ffffff">
            <circle cx="130" cy="170" r="2" />
            <circle cx="150" cy="180" r="2.5" />
            <circle cx="170" cy="165" r="2" />
            <circle cx="140" cy="190" r="3" />
            <circle cx="160" cy="175" r="2" />
          </g>
        )}

        {/* Chemical Equation Text */}
        <text x="150" y="25" fill="#f8fafc" fontSize="10" textAnchor="middle" fontWeight="bold">CO₂ Gas Delivery</text>
        <text x="150" y="215" fill="#38bdf8" fontSize="10" textAnchor="middle">
          {status === 'clear' && 'Ca(OH)₂ (aq) [Clear solution]'}
          {status === 'milky' && 'CaCO₃ (s) Precipitate [Milky Turbid]'}
          {status === 'clear_excess' && 'Ca(HCO₃)₂ (aq) [Soluble Bicarbonate]'}
        </text>
      </svg>
    </div>
  );
};

const NitrogenCycleDiagram: React.FC<{ sparkActive: boolean; rhizobiumActive: boolean }> = ({ sparkActive, rhizobiumActive }) => {
  return (
    <div className="flex flex-col items-center bg-slate-900/90 p-4 rounded-xl border border-slate-700">
      <h4 className="text-indigo-400 font-bold text-sm mb-2">Biogeochemical Nitrogen Cycle Sim</h4>
      <svg viewBox="0 0 340 220" className="w-full max-w-sm h-48">
        {/* Sky */}
        <rect x="0" y="0" width="340" height="130" fill="#0f172a" rx="8" />
        <text x="170" y="25" fill="#818cf8" fontSize="12" fontWeight="bold" textAnchor="middle">Atmospheric N₂ Gas (78%)</text>

        {/* Lightning Bolt */}
        {sparkActive && (
          <polygon points="170,30 155,70 165,70 150,110 180,60 168,60" fill="#facc15" stroke="#fef08a" strokeWidth="1" className="animate-pulse" />
        )}

        {/* Ground Soil */}
        <rect x="0" y="130" width="340" height="90" fill="#331e11" rx="4" />
        <path d="M 0 130 Q 80 120 170 130 T 340 130 L 340 220 L 0 220 Z" fill="#451a03" />

        {/* Plant / Legumes */}
        <path d="M 80 130 Q 75 100 85 80 Q 95 100 90 130" stroke="#22c55e" strokeWidth="4" fill="none" />
        <circle cx="85" cy="75" r="10" fill="#4ade80" />

        {/* Root Nodules */}
        <circle cx="82" cy="145" r="5" fill={rhizobiumActive ? '#38bdf8' : '#78716c'} className={rhizobiumActive ? 'animate-ping' : ''} />
        <circle cx="88" cy="155" r="6" fill={rhizobiumActive ? '#38bdf8' : '#78716c'} />
        <text x="98" y="152" fill="#e0f2fe" fontSize="9">Rhizobium Nodules</text>

        {/* Nitrates in soil */}
        <g fill="#a7f3d0" fontSize="10" fontWeight="bold">
          <text x="210" y="160">Soil NO₃⁻ (Nitrates)</text>
          <text x="210" y="180">Plant Protein Synthesis</text>
        </g>
      </svg>
    </div>
  );
};

const CarbonCycleDiagram: React.FC<{ photo: number; resp: number; fossil: number }> = ({ photo, resp, fossil }) => {
  return (
    <div className="flex flex-col items-center bg-slate-900/90 p-4 rounded-xl border border-slate-700">
      <h4 className="text-emerald-400 font-bold text-sm mb-2">Global Carbon Cycle Balance Visualizer</h4>
      <svg viewBox="0 0 340 220" className="w-full max-w-sm h-48">
        {/* Sun */}
        <circle cx="40" cy="40" r="20" fill="#fbbf24" />

        {/* Atmosphere box */}
        <rect x="100" y="15" width="140" height="40" rx="8" fill="#1e293b" stroke="#34d399" strokeWidth="2" />
        <text x="170" y="40" fill="#6ee7b7" fontSize="12" fontWeight="bold" textAnchor="middle">Atmospheric CO₂</text>

        {/* Green Tree (Photosynthesis sink) */}
        <path d="M 50 160 L 50 120 L 30 120 L 60 70 L 90 120 L 70 120 L 70 160 Z" fill="#15803d" />
        {/* Photosynthesis Arrow pointing down */}
        <path d="M 120 60 L 70 95" stroke="#22c55e" strokeWidth={Math.max(1, photo / 20)} markerEnd="url(#arrow)" />
        <text x="80" y="65" fill="#4ade80" fontSize="9" fontWeight="bold">Photosynthesis (-)</text>

        {/* Factory / Fossil fuels */}
        <rect x="250" y="110" width="50" height="50" fill="#475569" />
        <path d="M 260 110 L 260 80 L 275 80 L 275 110" fill="#334155" />
        {/* Fossil combustion arrow pointing up */}
        <path d="M 270 75 L 220 58" stroke="#ef4444" strokeWidth={Math.max(1, fossil / 20)} />
        <text x="240" y="65" fill="#fca5a5" fontSize="9" fontWeight="bold">Combustion (+)</text>

        {/* Respiration Arrow pointing up */}
        <path d="M 140 130 L 155 65" stroke="#f59e0b" strokeWidth={Math.max(1, resp / 20)} />
        <text x="175" y="100" fill="#fde047" fontSize="9" fontWeight="bold">Respiration (+)</text>

        {/* Soil Ground */}
        <rect x="0" y="160" width="340" height="60" fill="#1f2937" />
      </svg>
    </div>
  );
};

const BellJarExperimentDiagram: React.FC<{ waterLevel: number; candleLit: boolean }> = ({ waterLevel, candleLit }) => {
  return (
    <div className="flex flex-col items-center bg-slate-900/90 p-4 rounded-xl border border-slate-700">
      <h4 className="text-amber-300 font-bold text-sm mb-2">Pneumatic Trough & Bell Jar Experiment</h4>
      <svg viewBox="0 0 300 230" className="w-full max-w-xs h-52">
        {/* Pneumatic Trough Container */}
        <rect x="30" y="160" width="240" height="60" fill="#0284c7" fillOpacity="0.4" stroke="#38bdf8" strokeWidth="2" rx="4" />

        {/* Trough Water level outside jar */}
        <rect x="30" y="170" width="240" height="50" fill="#0369a1" fillOpacity="0.6" />

        {/* Bell Jar Envelope */}
        <path d="M 90 180 L 90 60 A 60 60 0 0 1 210 60 L 210 180 Z" fill="rgba(255,255,255,0.08)" stroke="#cbd5e1" strokeWidth="3" />

        {/* Water Level Rise inside Bell Jar */}
        {waterLevel > 0 && (
          <path
            d={`M 91 180 L 91 ${180 - waterLevel * 1.2} L 209 ${180 - waterLevel * 1.2} L 209 180 Z`}
            fill="rgba(14, 165, 233, 0.7)"
            className="transition-all duration-500"
          />
        )}

        {/* Beehive shelf base */}
        <rect x="120" y="150" width="60" height="20" fill="#64748b" rx="2" />

        {/* Candle */}
        <rect x="143" y="115" width="14" height="35" fill="#fef08a" />
        {candleLit ? (
          <path d="M 150 115 Q 155 102 150 95 Q 145 102 150 115 Z" fill="#f97316" className="animate-pulse" />
        ) : (
          <line x1="150" y1="115" x2="150" y2="110" stroke="#475569" strokeWidth="2" />
        )}

        {/* Volume markings on Bell Jar */}
        <g stroke="#94a3b8" strokeWidth="1" fontSize="8" fill="#cbd5e1">
          <line x1="205" y1="155" x2="215" y2="155" />
          <text x="220" y="158">1/5 (21% O₂)</text>
          <line x1="205" y1="130" x2="215" y2="130" strokeDasharray="2,2" />
          <text x="220" y="133">4/5 (N₂)</text>
        </g>
      </svg>
    </div>
  );
};

const MagnesiumJarDiagram: React.FC<{ gas: string; burning: boolean; product: string }> = ({ gas, burning, product }) => {
  return (
    <div className="flex flex-col items-center bg-slate-900/90 p-4 rounded-xl border border-slate-700">
      <h4 className="text-yellow-400 font-bold text-sm mb-2">Magnesium Reactivity in Isolated Gas Jar</h4>
      <svg viewBox="0 0 280 220" className="w-full max-w-xs h-48">
        {/* Gas Jar outline */}
        <rect x="80" y="40" width="120" height="150" rx="8" fill="rgba(255,255,255,0.05)" stroke="#94a3b8" strokeWidth="3" />
        <rect x="70" y="30" width="140" height="10" rx="2" fill="#64748b" />

        {/* Gas Label */}
        <text x="140" y="75" fill="#a5f3fc" fontSize="14" fontWeight="bold" textAnchor="middle">Pure {gas}</text>

        {/* Deflagrating Spoon with Magnesium Ribbon */}
        <path d="M 140 30 L 140 120" stroke="#cbd5e1" strokeWidth="3" />
        <circle cx="140" cy="125" r="8" fill="#94a3b8" />

        {/* Intense Burning Spark */}
        {burning && (
          <g>
            <circle cx="140" cy="125" r="18" fill="#ffffff" className="animate-ping" />
            <circle cx="140" cy="125" r="12" fill="#fef08a" />
            {gas === 'CO2' && <circle cx="130" cy="140" r="3" fill="#1e293b" />}
            {gas === 'CO2' && <circle cx="150" cy="145" r="4" fill="#1e293b" />}
          </g>
        )}

        {/* Product Status */}
        <text x="140" y="208" fill="#facc15" fontSize="11" textAnchor="middle" fontWeight="bold">
          {product || 'Insert Burning Mg Ribbon'}
        </text>
      </svg>
    </div>
  );
};

// ==========================================
// MAIN COMPONENT EXPORT
// ==========================================

export default function C6_ChemistryCarbondioxideandnitrogeninairSim({
  onComplete,
  initialNodeId = 'c6_chem_017',
}: SIMProps) {
  // Navigation & Tab State
  const [activeTab, setActiveTab] = useState<'discovery' | 'lab' | 'challenges' | 'summary'>(DEFAULT_PROPS.initialTab as 'discovery' | 'lab' | 'challenges' | 'summary');
  const [activeLabIndex, setActiveLabIndex] = useState<number>(0);
  const [currentNodeId, setCurrentNodeId] = useState<NodeId>(initialNodeId);

  // Audio / Speech & Hints
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHint, setCurrentHint] = useState<string>('');
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);

  // Discovery & Verification State
  const [selectedDiscoveryOpt, setSelectedDiscoveryOpt] = useState<number | null>(null);
  const [discoverySubmitted, setDiscoverySubmitted] = useState<boolean>(false);
  const [predictionAnswers, setPredictionAnswers] = useState<Record<number, number>>({});
  const [observationAnswers, setObservationAnswers] = useState<Record<number, number>>({});

  // Challenge Engine State
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState<number>(0);
  const [userMcqAnswer, setUserMcqAnswer] = useState<number | null>(null);
  const [userNumericAnswer, setUserNumericAnswer] = useState<string>('');
  const [userSortOrder, setUserSortOrder] = useState<string[]>([]);
  const [challengeFeedback, setChallengeFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);
  const [score, setScore] = useState<number>(0);

  // Lab Interactive States
  const [lab1, setLab1] = useState<Lab1State>({
    jarVolume: 500,
    candleLit: false,
    timeElapsed: 0,
    oxygenLeft: 21,
    nitrogenLeft: 78,
    co2Produced: 0.04,
    waterLevelRise: 0,
  });

  const [lab2, setLab2] = useState<Lab2State>({
    gasType: 'CO2',
    bubbleRate: 2,
    limewaterStatus: 'clear',
    splintStatus: 'burning',
    co2VolumeBubbled: 0,
    densityPourAngle: 0,
    candleExtinguishedByPour: false,
  });

  const [lab3, setLab3] = useState<Lab3State>({
    sparkVoltage: 0,
    lightningActive: false,
    rhizobiumActive: false,
    fertilizerAdded: 0,
    soilNitratePpm: 15,
    plantGrowthCm: 5,
    nitrogenGasPpm: 780000,
  });

  const [lab4, setLab4] = useState<Lab4State>({
    photosynthesisRate: 50,
    respirationRate: 50,
    deforestationLevel: 20,
    fossilFuelCombustion: 30,
    co2ConcentrationPpm: 415,
    globalTempOffset: 0.8,
  });

  const [lab5, setLab5] = useState<Lab5State>({
    metal: 'Mg',
    gasInJar: 'CO2',
    isBurning: false,
    productFormed: '',
    residueColor: '',
  });

  const [pieSlice, setPieSlice] = useState<string>('Nitrogen');

  // SRS & BKT Tracking Stores
  const [bktMap, setBktMap] = useState<Record<NodeId, ReturnType<typeof createBKTState>>>(() => ({
    c6_chem_017: createBKTState(),
    c6_chem_018: createBKTState(),
    c6_chem_019: createBKTState(),
  }));

  const [srsMap, setSrsMap] = useState<Record<string, ReturnType<typeof createReviewItem>>>(() => {
    const initialMap: Record<string, ReturnType<typeof createReviewItem>> = {};
    CHALLENGES.forEach((c) => {
      initialMap[c.id] = createReviewItem(c.id);
    });
    return initialMap;
  });

  // Auto Hint Inactivity Timer
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const resetInactivityTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      const activeChallenge = CHALLENGES[currentChallengeIndex];
      if (activeChallenge && activeTab === 'challenges') {
        setCurrentHint(activeChallenge.hints[0]);
        setShowHint(true);
        audioManager.play('hint');
      }
    }, 12000);
  }, [currentChallengeIndex, activeTab]);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [resetInactivityTimer, currentChallengeIndex, activeTab]);

  // Handle Bell Jar Timer in Lab 1
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (lab1.candleLit && lab1.oxygenLeft > 0) {
      interval = setInterval(() => {
        setLab1((prev) => {
          const nextO2 = Math.max(0, prev.oxygenLeft - 2.5);
          const nextRise = ((21 - nextO2) / 21) * 21; // Max rise 21%
          const isFinished = nextO2 === 0;

          if (isFinished) {
            audioManager.play('pop');
            speechManager.speak('Oxygen completely consumed. Flame extinguished!');
          }

          return {
            ...prev,
            oxygenLeft: nextO2,
            waterLevelRise: nextRise,
            candleLit: !isFinished,
            timeElapsed: prev.timeElapsed + 1,
            co2Produced: Math.min(2.0, prev.co2Produced + 0.2),
          };
        });
      }, 500);
    }
    return () => clearInterval(interval);
  }, [lab1.candleLit, lab1.oxygenLeft]);

  // Handle Lab 4 Carbon Cycle updates
  useEffect(() => {
    const netCarbon = lab4.respirationRate * 0.4 + lab4.fossilFuelCombustion * 0.8 + lab4.deforestationLevel * 0.5 - lab4.photosynthesisRate * 0.9;
    const newPpm = Math.max(300, Math.round(415 + netCarbon * 2));
    const newTemp = parseFloat(((newPpm - 350) * 0.008).toFixed(2));
    setLab4((prev) => ({
      ...prev,
      co2ConcentrationPpm: newPpm,
      globalTempOffset: newTemp,
    }));
  }, [lab4.photosynthesisRate, lab4.respirationRate, lab4.deforestationLevel, lab4.fossilFuelCombustion]);

  // Initialize sortable order when challenge changes
  useEffect(() => {
    const activeChallenge = CHALLENGES[currentChallengeIndex];
    if (activeChallenge && activeChallenge.type === 'drag-sort' && activeChallenge.sortItems) {
      setUserSortOrder([...activeChallenge.sortItems].sort(() => Math.random() - 0.5));
    }
    setUserMcqAnswer(null);
    setUserNumericAnswer('');
    setChallengeFeedback(null);
    setShowHint(false);
  }, [currentChallengeIndex]);

  // Sound triggers on tab changes
  const handleTabSwitch = (tab: 'discovery' | 'lab' | 'challenges' | 'summary') => {
    audioManager.play('swoop');
    setActiveTab(tab);
    if (tab === 'lab') {
      speechManager.speak('Interactive Chemistry Laboratory active. Choose an experiment step.');
    }
  };

  // Lab 1 Controls
  const toggleCandle = () => {
    audioManager.play('tap');
    if (!lab1.candleLit && lab1.oxygenLeft <= 0) {
      // Reset bell jar
      setLab1({
        jarVolume: 500,
        candleLit: true,
        timeElapsed: 0,
        oxygenLeft: 21,
        nitrogenLeft: 78,
        co2Produced: 0.04,
        waterLevelRise: 0,
      });
      speechManager.speak('Bell jar reset over pneumatic trough. Candle lit.');
    } else {
      setLab1((prev) => ({ ...prev, candleLit: !prev.candleLit }));
    }
  };

  // Lab 2 Controls (CO2 Limewater)
  const addCO2Bubbles = (amount: number) => {
    audioManager.play('pop');
    setLab2((prev) => {
      const newVol = prev.co2VolumeBubbled + amount;
      let status: 'clear' | 'milky' | 'clear_excess' = 'clear';
      if (newVol >= 20 && newVol <= 100) {
        status = 'milky';
      } else if (newVol > 100) {
        status = 'clear_excess';
      }
      return {
        ...prev,
        co2VolumeBubbled: newVol,
        limewaterStatus: status,
      };
    });
  };

  const pourGasOnCandle = () => {
    audioManager.play('whoosh');
    setLab2((prev) => {
      const extinguished = prev.gasType === 'CO2';
      if (extinguished) {
        audioManager.play('success');
        speechManager.speak('Carbon dioxide is denser than air and poured directly over the flame, extinguishing it!');
      } else {
        audioManager.play('error');
      }
      return {
        ...prev,
        densityPourAngle: 45,
        candleExtinguishedByPour: extinguished,
      };
    });
  };

  // Lab 3 Controls (Lightning & Rhizobium)
  const triggerLightningSpark = () => {
    audioManager.play('sparkle');
    setLab3((prev) => ({
      ...prev,
      sparkVoltage: 50,
      lightningActive: true,
      soilNitratePpm: prev.soilNitratePpm + 25,
      plantGrowthCm: prev.plantGrowthCm + 4,
    }));
    speechManager.speak('High voltage electrical spark synthesized nitric oxide from atmospheric nitrogen and oxygen!');
    setTimeout(() => {
      setLab3((prev) => ({ ...prev, lightningActive: false }));
    }, 1500);
  };

  const toggleRhizobium = () => {
    audioManager.play('chime');
    setLab3((prev) => {
      const active = !prev.rhizobiumActive;
      return {
        ...prev,
        rhizobiumActive: active,
        soilNitratePpm: active ? prev.soilNitratePpm + 40 : prev.soilNitratePpm - 20,
        plantGrowthCm: active ? prev.plantGrowthCm + 8 : prev.plantGrowthCm - 4,
      };
    });
  };

  // Lab 5 Controls (Magnesium Burning)
  const igniteMagnesiumInJar = () => {
    audioManager.play('sparkle');
    setLab5((prev) => ({ ...prev, isBurning: true }));
    setTimeout(() => {
      setLab5((prev) => {
        let product = '';
        let residue = '';
        if (prev.gasInJar === 'CO2') {
          product = '2MgO (White) + C (Black Specks)';
          residue = 'White powder with black carbon specks';
          speechManager.speak('Magnesium burned intensely in CO2, forming white Magnesium Oxide and black Carbon soot!');
        } else if (prev.gasInJar === 'N2') {
          product = 'Mg3N2 (Yellowish Magnesium Nitride)';
          residue = 'Greenish-yellow solid powder';
          speechManager.speak('Magnesium reacted with pure Nitrogen to form Magnesium Nitride!');
        } else {
          product = '2MgO (Pure White Powder)';
          residue = 'Dazzling white ash';
        }
        return {
          ...prev,
          isBurning: false,
          productFormed: product,
          residueColor: residue,
        };
      });
    }, 2000);
  };

  // Discovery Question Submit Handler
  const handleDiscoverySubmit = () => {
    if (selectedDiscoveryOpt === null) return;
    setDiscoverySubmitted(true);
    if (selectedDiscoveryOpt === DISCOVERY_QUESTION.correctIndex) {
      audioManager.play('celebration');
      speechManager.speak('Correct discovery! Nitrogen slows down oxidation without stopping life.');
    } else {
      audioManager.play('error');
    }
  };

  // Challenge Submission Handler
  const handleChallengeSubmit = () => {
    const activeChallenge = CHALLENGES[currentChallengeIndex];
    if (!activeChallenge) return;

    let isCorrect = false;

    if (activeChallenge.type === 'mcq') {
      isCorrect = userMcqAnswer === activeChallenge.correctIndex;
    } else if (activeChallenge.type === 'numeric') {
      const val = parseFloat(userNumericAnswer);
      isCorrect = val === Number(activeChallenge.correctAnswer);
    } else if (activeChallenge.type === 'drag-sort') {
      isCorrect = JSON.stringify(userSortOrder) === JSON.stringify(activeChallenge.sortItems);
    }

    // Sound and voice feedback
    if (isCorrect) {
      audioManager.play('success');
      setShowSparkle(true);
      setTimeout(() => setShowSparkle(false), 1000);
      setChallengeFeedback({
        isCorrect: true,
        message: 'Excellent chemical analysis! Correct answer.',
      });
      setScore((prev) => prev + (activeChallenge.difficulty === 'foundation' ? 10 : activeChallenge.difficulty === 'standard' ? 20 : 30));

      // BKT & SRS Updates
      const activeNode = activeChallenge.nodeId;
      setBktMap((prev) => ({
        ...prev,
        [activeNode]: bktUpdate(prev[activeNode], true),
      }));

      setSrsMap((prev) => ({
        ...prev,
        [activeChallenge.id]: sm2Update(prev[activeChallenge.id], 5),
      }));

      if (currentChallengeIndex === CHALLENGES.length - 1) {
        setShowSuccess(true);
        setShowConfetti(true);
        audioManager.play('celebration');
        speechManager.speak('Mastery assessment complete! Outstanding performance in atmospheric chemistry.');
        recordGameScore('C6_ChemistryCarbondioxideandnitrogeninairSim', score + 30);
        if (onComplete) onComplete(score + 30);
      }
    } else {
      audioManager.play('error');
      setChallengeFeedback({
        isCorrect: false,
        message: `Not quite. ${activeChallenge.hints[0]}`,
      });

      const activeNode = activeChallenge.nodeId;
      setBktMap((prev) => ({
        ...prev,
        [activeNode]: bktUpdate(prev[activeNode], false),
      }));

      setSrsMap((prev) => ({
        ...prev,
        [activeChallenge.id]: sm2Update(prev[activeChallenge.id], 2),
      }));
    }
  };

  // Move Sortable Items Up / Down
  const moveSortItem = (index: number, direction: 'up' | 'down') => {
    audioManager.play('tap');
    const newOrder = [...userSortOrder];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= newOrder.length) return;
    const temp = newOrder[index];
    newOrder[index] = newOrder[targetIdx];
    newOrder[targetIdx] = temp;
    setUserSortOrder(newOrder);
  };

  // Calculate current node mastery percentage
  const nodeMasteryScores = useMemo(() => {
    return {
      c6_chem_017: Math.round(masteryProb(bktMap.c6_chem_017) * 100),
      c6_chem_018: Math.round(masteryProb(bktMap.c6_chem_018) * 100),
      c6_chem_019: Math.round(masteryProb(bktMap.c6_chem_019) * 100),
    };
  }, [bktMap]);

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 font-sans p-4 md:p-8 flex flex-col items-center select-none">
      {/* HEADER BAR */}
      <header className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-between border-b border-slate-800 pb-4 mb-6 gap-4">
        <div>
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">ICSE Class 6 Chemistry • Atmospheric Science</span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Carbon Dioxide & Nitrogen in Air
          </h1>
        </div>

        {/* Node Mastery Badges */}
        <div className="flex flex-wrap gap-2">
          <div className="bg-slate-900 border border-slate-700 px-3 py-1.5 rounded-lg flex flex-col items-center">
            <span className="text-[10px] text-slate-400 font-mono">c6_chem_017 (CO₂)</span>
            <span className="text-sm font-bold text-emerald-400">{nodeMasteryScores.c6_chem_017}%</span>
          </div>
          <div className="bg-slate-900 border border-slate-700 px-3 py-1.5 rounded-lg flex flex-col items-center">
            <span className="text-[10px] text-slate-400 font-mono">c6_chem_018 (N₂)</span>
            <span className="text-sm font-bold text-indigo-400">{nodeMasteryScores.c6_chem_018}%</span>
          </div>
          <div className="bg-slate-900 border border-slate-700 px-3 py-1.5 rounded-lg flex flex-col items-center">
            <span className="text-[10px] text-slate-400 font-mono">c6_chem_019 (Air Bal)</span>
            <span className="text-sm font-bold text-cyan-400">{nodeMasteryScores.c6_chem_019}%</span>
          </div>
        </div>
      </header>

      {/* NAVIGATION TABS */}
      <nav className="w-full max-w-6xl flex justify-center bg-slate-900/80 p-1.5 rounded-xl border border-slate-800 mb-6 gap-2">
        <button
          onClick={() => handleTabSwitch('discovery')}
          className={`flex-1 py-2 px-4 rounded-lg font-bold text-sm transition-all ${
            activeTab === 'discovery' ? 'bg-amber-500 text-slate-950 shadow-lg' : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          1. Discovery Scenario
        </button>
        <button
          onClick={() => handleTabSwitch('lab')}
          className={`flex-1 py-2 px-4 rounded-lg font-bold text-sm transition-all ${
            activeTab === 'lab' ? 'bg-cyan-500 text-slate-950 shadow-lg' : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          2. Interactive Lab (5 Sims)
        </button>
        <button
          onClick={() => handleTabSwitch('challenges')}
          className={`flex-1 py-2 px-4 rounded-lg font-bold text-sm transition-all ${
            activeTab === 'challenges' ? 'bg-indigo-500 text-slate-950 shadow-lg' : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          3. Challenges (22+)
        </button>
        <button
          onClick={() => handleTabSwitch('summary')}
          className={`flex-1 py-2 px-4 rounded-lg font-bold text-sm transition-all ${
            activeTab === 'summary' ? 'bg-emerald-500 text-slate-950 shadow-lg' : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          4. Real-World & Misconceptions
        </button>
      </nav>

      {/* TAB 1: DISCOVERY & SCENARIO */}
      {activeTab === 'discovery' && (
        <section className="w-full max-w-6xl flex flex-col gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            <h2 className="text-xl font-bold text-amber-400 mb-2">{SCENARIO.title}</h2>
            <p className="text-slate-300 leading-relaxed mb-4">{SCENARIO.intro}</p>
            <p className="text-slate-400 text-sm italic bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
              {SCENARIO.context}
            </p>
          </div>

          {/* DISCOVERY QUESTION CARD */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Initial Hypothesis Challenge</span>
            <h3 className="text-lg font-semibold text-white mt-1 mb-4">{DISCOVERY_QUESTION.question}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              {DISCOVERY_QUESTION.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    audioManager.play('tap');
                    setSelectedDiscoveryOpt(idx);
                  }}
                  className={`p-4 rounded-xl text-left text-sm border transition-all ${
                    selectedDiscoveryOpt === idx
                      ? 'bg-amber-500/20 border-amber-400 text-amber-200'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <span className="font-bold mr-2">{String.fromCharCode(65 + idx)}.</span> {opt}
                </button>
              ))}
            </div>

            <button
              onClick={handleDiscoverySubmit}
              disabled={selectedDiscoveryOpt === null}
              className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold rounded-xl transition-all shadow-lg"
            >
              Submit Preconception Answer
            </button>

            {discoverySubmitted && (
              <div
                className={`mt-4 p-4 rounded-xl border text-sm ${
                  selectedDiscoveryOpt === DISCOVERY_QUESTION.correctIndex
                    ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                    : 'bg-amber-950/60 border-amber-500 text-amber-200'
                }`}
              >
                <p className="font-bold mb-1">
                  {selectedDiscoveryOpt === DISCOVERY_QUESTION.correctIndex ? 'Correct Analysis!' : 'Scientific Insight:'}
                </p>
                <p>{DISCOVERY_QUESTION.hintAfter}</p>
              </div>
            )}
          </div>

          {/* PREDICTION QUESTIONS SECTION */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-4">Predictive Thinking Exercises</h3>
            <div className="flex flex-col gap-6">
              {PREDICTION_QUESTIONS.map((pred, idx) => (
                <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <p className="text-sm font-semibold text-indigo-300 mb-3">{pred.question}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                    {pred.options.map((opt, oIdx) => (
                      <button
                        key={oIdx}
                        onClick={() => {
                          audioManager.play('tap');
                          setPredictionAnswers((prev) => ({ ...prev, [idx]: oIdx }));
                        }}
                        className={`p-2.5 text-xs rounded-lg border text-left transition-all ${
                          predictionAnswers[idx] === oIdx
                            ? 'bg-indigo-600/30 border-indigo-400 text-indigo-200 font-bold'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  {predictionAnswers[idx] !== undefined && (
                    <div className="text-xs bg-slate-900 p-2.5 rounded border border-slate-800 text-emerald-300">
                      <span className="font-bold">Verification Hint: </span>
                      {pred.verifyInstruction}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* TAB 2: INTERACTIVE LAB (5 SUB-LABS) */}
      {activeTab === 'lab' && (
        <section className="w-full max-w-6xl flex flex-col gap-6">
          {/* Sub-Lab Selector Bar */}
          <div className="flex flex-wrap gap-2 bg-slate-900 p-2 rounded-xl border border-slate-800">
            {EXPLORATION_STEPS.map((step, idx) => (
              <button
                key={idx}
                onClick={() => {
                  audioManager.play('tap');
                  setActiveLabIndex(idx);
                  setCurrentNodeId(step.nodeId);
                }}
                className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeLabIndex === idx
                    ? 'bg-cyan-500 text-slate-950 shadow-md'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                Lab {idx + 1}
              </button>
            ))}
          </div>

          {/* Current Lab Title & Instruction */}
          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
            <h3 className="text-md font-bold text-cyan-400">{EXPLORATION_STEPS[activeLabIndex].title}</h3>
            <p className="text-xs text-slate-300 mt-1">{EXPLORATION_STEPS[activeLabIndex].instruction}</p>
          </div>

          {/* SUB-LAB 1: BELL JAR & COMBUSTION */}
          {activeLabIndex === 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <BellJarExperimentDiagram waterLevel={lab1.waterLevelRise} candleLit={lab1.candleLit} />
              <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 flex flex-col justify-between">
                <div>
                  <h4 className="text-white font-bold text-sm mb-4">Combustion Simulation Controls</h4>
                  <div className="space-y-3 text-xs mb-6">
                    <div className="flex justify-between bg-slate-950 p-2.5 rounded border border-slate-800">
                      <span className="text-slate-400">Oxygen Gas Level (O₂):</span>
                      <span className="font-mono font-bold text-red-400">{lab1.oxygenLeft.toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between bg-slate-950 p-2.5 rounded border border-slate-800">
                      <span className="text-slate-400">Nitrogen Gas Level (N₂):</span>
                      <span className="font-mono font-bold text-blue-400">{lab1.nitrogenLeft}%</span>
                    </div>
                    <div className="flex justify-between bg-slate-950 p-2.5 rounded border border-slate-800">
                      <span className="text-slate-400">Water Level Rise in Jar:</span>
                      <span className="font-mono font-bold text-cyan-400">{lab1.waterLevelRise.toFixed(1)}% (Approx 1/5th)</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={toggleCandle}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl transition-all shadow-lg"
                >
                  {lab1.candleLit ? 'Extinguish Flame' : lab1.oxygenLeft <= 0 ? 'Reset Bell Jar & Relight' : 'Light Candle in Jar'}
                </button>
              </div>
            </div>
          )}

          {/* SUB-LAB 2: CO2 LIMEWATER & DENSITY */}
          {activeLabIndex === 1 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <LimewaterReactionDiagram status={lab2.limewaterStatus} gasVolume={lab2.co2VolumeBubbled} />
              <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 flex flex-col justify-between">
                <div>
                  <h4 className="text-white font-bold text-sm mb-3">CO₂ Gas Delivery & Density Pouring</h4>
                  <div className="space-y-3 mb-4 text-xs">
                    <div className="flex justify-between bg-slate-950 p-2.5 rounded border border-slate-800">
                      <span className="text-slate-400">CO₂ Volume Bubbled:</span>
                      <span className="font-mono font-bold text-emerald-400">{lab2.co2VolumeBubbled} mL</span>
                    </div>
                    <div className="flex justify-between bg-slate-950 p-2.5 rounded border border-slate-800">
                      <span className="text-slate-400">Limewater Status:</span>
                      <span className="font-mono font-bold text-cyan-300 uppercase">{lab2.limewaterStatus}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 mb-4">
                    <button
                      onClick={() => addCO2Bubbles(30)}
                      className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-300 font-semibold text-xs rounded border border-slate-700"
                    >
                      Bubble +30 mL CO₂
                    </button>
                    <button
                      onClick={() => addCO2Bubbles(100)}
                      className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-emerald-300 font-semibold text-xs rounded border border-slate-700"
                    >
                      Bubble Excess (+100 mL)
                    </button>
                  </div>
                </div>

                <div className="border-t border-slate-800 pt-4">
                  <p className="text-xs text-slate-400 mb-2 font-bold">Density Test: Pour Gas Over Candle</p>
                  <div className="flex gap-2">
                    <select
                      value={lab2.gasType}
                      onChange={(e) => setLab2((prev) => ({ ...prev, gasType: e.target.value as 'CO2' | 'N2' | 'O2' | 'Air' }))}
                      className="bg-slate-950 border border-slate-800 text-xs rounded p-2 text-white"
                    >
                      <option value="CO2">Carbon Dioxide (CO₂)</option>
                      <option value="N2">Nitrogen (N₂)</option>
                      <option value="O2">Oxygen (O₂)</option>
                    </select>
                    <button
                      onClick={pourGasOnCandle}
                      className="flex-1 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs rounded transition-all"
                    >
                      Pour Gas Out of Jar
                    </button>
                  </div>
                  {lab2.candleExtinguishedByPour && (
                    <p className="text-xs text-emerald-400 mt-2 font-semibold">
                      ✓ Flame Extinguished! Proves CO₂ is denser than air.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* SUB-LAB 3: NITROGEN FIXATION & LIGHTNING */}
          {activeLabIndex === 2 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <NitrogenCycleDiagram sparkActive={lab3.lightningActive} rhizobiumActive={lab3.rhizobiumActive} />
              <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 flex flex-col justify-between">
                <div>
                  <h4 className="text-white font-bold text-sm mb-4">Atmospheric & Biological Fixation Controls</h4>
                  <div className="space-y-3 text-xs mb-6">
                    <div className="flex justify-between bg-slate-950 p-2.5 rounded border border-slate-800">
                      <span className="text-slate-400">Soil Nitrate (NO₃⁻) Concentration:</span>
                      <span className="font-mono font-bold text-indigo-300">{lab3.soilNitratePpm} PPM</span>
                    </div>
                    <div className="flex justify-between bg-slate-950 p-2.5 rounded border border-slate-800">
                      <span className="text-slate-400">Estimated Plant Growth:</span>
                      <span className="font-mono font-bold text-emerald-400">{lab3.plantGrowthCm} cm</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <button
                    onClick={triggerLightningSpark}
                    className="py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-2"
                  >
                    ⚡ Trigger 50kV Lightning Arc (N₂ + O₂ → 2NO)
                  </button>
                  <button
                    onClick={toggleRhizobium}
                    className={`py-2.5 font-bold rounded-xl text-xs transition-all border ${
                      lab3.rhizobiumActive
                        ? 'bg-indigo-600 text-white border-indigo-400'
                        : 'bg-slate-950 text-indigo-300 border-indigo-800 hover:bg-slate-800'
                    }`}
                  >
                    {lab3.rhizobiumActive ? 'Disable Rhizobium Nodules' : 'Activate Root Rhizobium Bacteria'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* SUB-LAB 4: CARBON CYCLE BALANCE */}
          {activeLabIndex === 3 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <CarbonCycleDiagram
                photo={lab4.photosynthesisRate}
                resp={lab4.respirationRate}
                fossil={lab4.fossilFuelCombustion}
              />
              <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                <h4 className="text-white font-bold text-sm mb-4">Atmospheric Equilibrium Sliders</h4>
                <div className="space-y-4 text-xs mb-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-emerald-400 font-semibold">Photosynthesis Rate (CO₂ Sink)</span>
                      <span className="font-mono text-slate-300">{lab4.photosynthesisRate}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={lab4.photosynthesisRate}
                      onChange={(e) => setLab4((prev) => ({ ...prev, photosynthesisRate: Number(e.target.value) }))}
                      className="w-full accent-emerald-500"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-amber-400 font-semibold">Fossil Fuel Burning (CO₂ Source)</span>
                      <span className="font-mono text-slate-300">{lab4.fossilFuelCombustion}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={lab4.fossilFuelCombustion}
                      onChange={(e) => setLab4((prev) => ({ ...prev, fossilFuelCombustion: Number(e.target.value) }))}
                      className="w-full accent-amber-500"
                    />
                  </div>
                </div>

                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs flex justify-between items-center">
                  <div>
                    <span className="text-slate-400 block">CO₂ Concentration:</span>
                    <span className="font-mono font-bold text-emerald-400 text-sm">{lab4.co2ConcentrationPpm} PPM</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Temp Offset:</span>
                    <span className="font-mono font-bold text-red-400 text-sm">+{lab4.globalTempOffset} °C</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SUB-LAB 5: MAGNESIUM REACTIVITY IN GASES */}
          {activeLabIndex === 4 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <MagnesiumJarDiagram
                gas={lab5.gasInJar}
                burning={lab5.isBurning}
                product={lab5.productFormed}
              />
              <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 flex flex-col justify-between">
                <div>
                  <h4 className="text-white font-bold text-sm mb-4">Select Atmosphere for Burning Metal</h4>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {(['CO2', 'N2', 'O2'] as const).map((g) => (
                      <button
                        key={g}
                        onClick={() => {
                          audioManager.play('tap');
                          setLab5((prev) => ({ ...prev, gasInJar: g, productFormed: '' }));
                        }}
                        className={`py-2 rounded-lg text-xs font-bold border ${
                          lab5.gasInJar === g
                            ? 'bg-amber-500 text-slate-950 border-amber-400'
                            : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        {g} Jar
                      </button>
                    ))}
                  </div>
                  {lab5.residueColor && (
                    <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs mb-4">
                      <span className="text-slate-400 block">Observed Residue:</span>
                      <span className="font-semibold text-amber-300">{lab5.residueColor}</span>
                    </div>
                  )}
                </div>
                <button
                  onClick={igniteMagnesiumInJar}
                  disabled={lab5.isBurning}
                  className="w-full py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl transition-all shadow-lg text-xs"
                >
                  Lower Ignited Magnesium Ribbon into Jar
                </button>
              </div>
            </div>
          )}

          {/* OBSERVATION QUESTIONS RENDER */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-4">Lab Empirical Observation Check</h3>
            <div className="flex flex-col gap-6">
              {OBSERVATION_QUESTIONS.map((obs, idx) => (
                <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <p className="text-sm font-semibold text-cyan-300 mb-3">{obs.question}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {obs.observableOptions.map((opt, oIdx) => (
                      <button
                        key={oIdx}
                        onClick={() => {
                          audioManager.play('tap');
                          setObservationAnswers((prev) => ({ ...prev, [idx]: oIdx }));
                        }}
                        className={`p-2.5 text-xs rounded-lg border text-left transition-all ${
                          observationAnswers[idx] === oIdx
                            ? oIdx === obs.correctIndex
                              ? 'bg-emerald-950 border-emerald-500 text-emerald-200 font-bold'
                              : 'bg-red-950 border-red-500 text-red-200'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
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
        </section>
      )}

      {/* TAB 3: 22+ PROGRESSIVE CHALLENGES */}
      {activeTab === 'challenges' && (
        <section className="w-full max-w-4xl flex flex-col gap-6">
          {/* Progress & Difficulty Header */}
          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex justify-between items-center">
            <div>
              <span className="text-xs text-slate-400">Challenge {currentChallengeIndex + 1} of {CHALLENGES.length}</span>
              <div className="flex items-center gap-2 mt-1">
                <span
                  className={`text-xs px-2 py-0.5 rounded font-bold uppercase ${
                    CHALLENGES[currentChallengeIndex].difficulty === 'foundation'
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                      : CHALLENGES[currentChallengeIndex].difficulty === 'standard'
                      ? 'bg-amber-950 text-amber-400 border border-amber-800'
                      : 'bg-red-950 text-red-400 border border-red-800'
                  }`}
                >
                  {CHALLENGES[currentChallengeIndex].difficulty}
                </span>
                <span className="text-xs text-slate-300 font-semibold">{CHALLENGES[currentChallengeIndex].competencyLevel}</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400 block">Accumulated Points</span>
              <span className="font-mono font-bold text-lg text-amber-400">{score} PTS</span>
            </div>
          </div>

          {/* MAIN CHALLENGE CARD */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-6 leading-relaxed">
              {CHALLENGES[currentChallengeIndex].question}
            </h3>

            {/* MCQ TYPE */}
            {CHALLENGES[currentChallengeIndex].type === 'mcq' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                {CHALLENGES[currentChallengeIndex].options?.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      audioManager.play('tap');
                      setUserMcqAnswer(idx);
                    }}
                    className={`p-4 rounded-xl text-left text-sm border transition-all ${
                      userMcqAnswer === idx
                        ? 'bg-indigo-600/30 border-indigo-400 text-white font-semibold'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span className="font-bold mr-2 text-indigo-400">{String.fromCharCode(65 + idx)}.</span> {opt}
                  </button>
                ))}
              </div>
            )}

            {/* NUMERIC TYPE */}
            {CHALLENGES[currentChallengeIndex].type === 'numeric' && (
              <div className="mb-6">
                <label className="block text-xs text-slate-400 mb-2">Type your numeric answer below:</label>
                <input
                  type="number"
                  value={userNumericAnswer}
                  onChange={(e) => setUserNumericAnswer(e.target.value)}
                  placeholder="Enter number..."
                  className="w-full md:w-64 p-3 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono text-lg focus:outline-none focus:border-indigo-500"
                />
              </div>
            )}

            {/* DRAG-SORT TYPE */}
            {CHALLENGES[currentChallengeIndex].type === 'drag-sort' && (
              <div className="flex flex-col gap-2 mb-6">
                <span className="text-xs text-slate-400 mb-2">Reorder items into correct chronological sequence:</span>
                {userSortOrder.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs">
                    <span className="text-slate-200 font-medium">
                      <span className="text-indigo-400 font-bold mr-2">{idx + 1}.</span> {item}
                    </span>
                    <div className="flex gap-1">
                      <button
                        onClick={() => moveSortItem(idx, 'up')}
                        disabled={idx === 0}
                        className="p-1 px-2.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 rounded text-slate-300"
                      >
                        ▲
                      </button>
                      <button
                        onClick={() => moveSortItem(idx, 'down')}
                        disabled={idx === userSortOrder.length - 1}
                        className="p-1 px-2.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 rounded text-slate-300"
                      >
                        ▼
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* FEEDBACK DISPLAY */}
            {challengeFeedback && (
              <div
                className={`p-4 rounded-xl border text-sm mb-6 ${
                  challengeFeedback.isCorrect
                    ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                    : 'bg-red-950/60 border-red-500 text-red-200'
                }`}
              >
                <p className="font-bold">{challengeFeedback.isCorrect ? '✓ Correct!' : '✗ Incorrect'}</p>
                <p className="mt-1">{challengeFeedback.message}</p>
                <p className="mt-2 text-xs italic text-slate-300">{CHALLENGES[currentChallengeIndex].explanation}</p>
              </div>
            )}

            {/* ACTION BUTTONS */}
            <div className="flex justify-between items-center pt-4 border-t border-slate-800">
              <button
                onClick={() => {
                  const h = CHALLENGES[currentChallengeIndex].hints;
                  setCurrentHint(h[0]);
                  setShowHint(true);
                  audioManager.play('hint');
                }}
                className="text-xs text-amber-400 hover:underline font-semibold"
              >
                💡 Request Hint
              </button>

              <div className="flex gap-3">
                <button
                  onClick={handleChallengeSubmit}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg transition-all text-sm"
                >
                  Verify Answer
                </button>

                {currentChallengeIndex < CHALLENGES.length - 1 && (
                  <button
                    onClick={() => {
                      audioManager.play('swoop');
                      setCurrentChallengeIndex((prev) => prev + 1);
                    }}
                    className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl transition-all text-sm"
                  >
                    Next Challenge →
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* TAB 4: REAL-WORLD & MISCONCEPTIONS */}
      {activeTab === 'summary' && (
        <section className="w-full max-w-6xl flex flex-col gap-6">
          {/* REAL-WORLD ACTIVITY */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Industrial Chemistry Application</span>
            <h3 className="text-xl font-bold text-white mt-1 mb-2">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-slate-300 text-sm mb-4 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex gap-3 items-start">
                  <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <p className="text-xs text-slate-300 leading-normal">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* MISCONCEPTIONS GRID */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-4">Common Chemistry Misconceptions Cleared</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MISCONCEPTIONS.map((misc) => (
                <div key={misc.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold text-red-400 block mb-1">Myth: "{misc.statement}"</span>
                    <p className="text-xs font-bold text-emerald-400 mb-2">Fact: {misc.correction}</p>
                    <p className="text-xs text-slate-400 leading-relaxed">{misc.explanation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* DIAGNOSTIC RECAP TABLE */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-4">Diagnostic Concept Review Questions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {DIAGNOSTIC_QUESTIONS.map((dq) => (
                <div key={dq.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs">
                  <p className="font-semibold text-cyan-300 mb-2">{dq.question}</p>
                  <p className="text-slate-300 mb-1">
                    <span className="font-bold text-emerald-400">Correct Answer: </span>
                    {dq.options[dq.correctIndex]}
                  </p>
                  <p className="text-slate-500 text-[11px] italic">{dq.explanation}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* MANDATORY SIM ENGINE FEEDBACK OVERLAYS */}
      <HintBubble show={showHint} text={currentHint} />
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccess} text="Atmospheric Chemistry Mastery Completed!" />
      <SparkleBurst show={showSparkle} x={400} y={300} />
    </div>
  );
}